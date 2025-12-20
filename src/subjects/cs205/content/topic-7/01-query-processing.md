# Query Processing

Query processing transforms SQL statements into efficient execution plans. Understanding this pipeline is fundamental to query optimization.

## Query Processing Pipeline

### Overview

```
SQL Query
    ↓
┌─────────────────┐
│     Parser      │  Syntax validation, parse tree
└────────┬────────┘
         ↓
┌─────────────────┐
│   Translator    │  Relational algebra expression
└────────┬────────┘
         ↓
┌─────────────────┐
│   Optimizer     │  Choose execution strategy
└────────┬────────┘
         ↓
┌─────────────────┐
│Execution Engine │  Execute and return results
└─────────────────┘
```

### Parsing Phase

```sql
-- Input SQL
SELECT Name, Salary FROM Employees WHERE DeptID = 10;

-- Parser checks:
-- 1. Lexical analysis (tokenization)
--    [SELECT][Name][,][Salary][FROM][Employees][WHERE][DeptID][=][10]

-- 2. Syntax validation
--    Valid SQL grammar

-- 3. Semantic validation
--    Table Employees exists
--    Columns Name, Salary, DeptID exist

-- Output: Parse tree
```

### Parse Tree Structure

```
         SELECT
        /   |   \
    ATTRS  FROM  WHERE
    /   \    |      |
  Name Salary Employees  =
                        / \
                    DeptID 10
```

## Relational Algebra Translation

### Basic Operations

```
SQL → Relational Algebra

SELECT a, b FROM R WHERE c = 5
→ π_a,b(σ_c=5(R))

SELECT * FROM R, S WHERE R.x = S.x
→ σ_R.x=S.x(R × S)
or
→ R ⋈_R.x=S.x S

SELECT a, SUM(b) FROM R GROUP BY a
→ γ_a,SUM(b)(R)
```

### Query Tree

```sql
SELECT E.Name, D.DeptName
FROM Employees E
JOIN Departments D ON E.DeptID = D.DeptID
WHERE D.Location = 'NYC';

-- Relational algebra tree:
        π_Name,DeptName
              |
        ⋈_DeptID
         /      \
    Employees  σ_Location='NYC'
                    |
               Departments
```

### Algebra Equivalences

```
Selection pushdown:
σ_c(R ⋈ S) = σ_c(R) ⋈ S  (if c only references R)

Projection pushdown:
π_a(R ⋈ S) = π_a(π_a,join_attrs(R) ⋈ π_a,join_attrs(S))

Join commutativity:
R ⋈ S = S ⋈ R

Join associativity:
(R ⋈ S) ⋈ T = R ⋈ (S ⋈ T)
```

## Query Execution Engines

### Iterator Model (Volcano)

```
Each operator implements:
- Open(): Initialize
- GetNext(): Return one tuple
- Close(): Cleanup

-- Pull-based execution
Root calls GetNext() on children recursively

Example execution:
Project.GetNext()
  → Join.GetNext()
      → Scan(Employees).GetNext() → tuple
      → Scan(Departments).GetNext() → tuple
      → return joined tuple
  → return projected tuple
```

### Vectorized Execution

```
Process batches (vectors) instead of single tuples

Traditional:
for each tuple:
    process(tuple)

Vectorized:
for each batch of 1000 tuples:
    process_batch(batch)

Benefits:
- Better CPU cache utilization
- SIMD operations
- Reduced function call overhead
```

### Compiled Execution

```
Generate specialized code for query

Instead of interpreting operators:
- Generate machine code for specific query
- Compile and execute

Used by: HyPer, MemSQL, modern PostgreSQL JIT

Benefit: Eliminates operator interpretation overhead
```

## Physical Operators

### Scan Operators

```
Table Scan (Sequential Scan):
- Read all pages of table
- O(n) where n = pages
- Good for: Large result sets, no index

Index Scan:
- Use index to find qualifying rows
- Then fetch from table
- Good for: Selective queries

Index-Only Scan:
- Read only from index
- No table access needed
- Good for: Covered queries

Bitmap Scan:
- Build bitmap of matching row IDs
- Then fetch in physical order
- Good for: Multiple index conditions
```

### Join Operators

```
Nested Loop Join:
for each tuple r in R:
    for each tuple s in S:
        if join_condition(r, s):
            output (r, s)
Cost: O(|R| × |S|)
Best for: Small tables, indexed inner

Hash Join:
1. Build hash table on smaller relation
2. Probe with larger relation
Cost: O(|R| + |S|)
Best for: Equality joins, no index

Merge Join:
1. Sort both relations on join key
2. Merge sorted streams
Cost: O(|R|log|R| + |S|log|S|)
Best for: Already sorted data, range joins
```

### Other Operators

```
Sort:
- External merge sort for large data
- Uses temp space

Aggregate:
- Hash aggregation (unsorted)
- Sort-based aggregation

Unique/Distinct:
- Hash-based deduplication
- Sort-based deduplication

Limit:
- Stop after N tuples
- Can enable early termination optimization
```

## Pipelining vs Materialization

### Pipelined Execution

```
Tuples flow through operators without storing

SELECT * FROM R WHERE a > 10 ORDER BY b LIMIT 5;

Non-blocking operators (can pipeline):
- Scan, Filter, Project, Join (with some conditions)

Blocking operators (must materialize):
- Sort (needs all input)
- Hash build (needs all input)
- Aggregation (needs all groups)
```

### Materialization Points

```
Query:
SELECT D.Name, AVG(E.Salary)
FROM Employees E
JOIN Departments D ON E.DeptID = D.DeptID
GROUP BY D.Name
ORDER BY AVG(E.Salary) DESC;

Materialization needed at:
1. Hash table for join (one side)
2. Aggregation result
3. Sort for ORDER BY

Pipeline where possible:
- Scan → Filter → Join probe → Aggregate
```

## Query Execution Example

### Sample Query

```sql
SELECT c.Name, COUNT(*) as OrderCount
FROM Customers c
JOIN Orders o ON c.CustomerID = o.CustomerID
WHERE o.OrderDate >= '2024-01-01'
GROUP BY c.Name
HAVING COUNT(*) > 5
ORDER BY OrderCount DESC
LIMIT 10;
```

### Execution Plan

```
Limit (10 rows)
    ↓
Sort (by OrderCount DESC)
    ↓
Filter (count > 5)
    ↓
HashAggregate (GROUP BY c.Name, COUNT(*))
    ↓
Hash Join (c.CustomerID = o.CustomerID)
    /                    \
Seq Scan              Index Scan
(Customers)           (Orders, idx_date)
                      Filter: date >= '2024-01-01'
```

### Execution Flow

```
1. Index scan Orders where date >= '2024-01-01'
   → Stream of order tuples

2. Build hash table on Customers

3. Probe hash table with order CustomerIDs
   → Stream of joined tuples

4. Feed into hash aggregation
   → Groups by Name, counts

5. Filter groups with count > 5

6. Sort by count descending

7. Return first 10 rows
```

## Parallel Query Execution

### Intra-Query Parallelism

```
Single query uses multiple CPUs/threads

Strategies:
1. Parallel scan: Multiple workers scan different pages
2. Parallel join: Partition data across workers
3. Parallel aggregation: Partial aggregates merged

Example (PostgreSQL):
Gather (3 workers)
    → Partial HashAggregate
        → Parallel Seq Scan on large_table
```

### Exchange Operators

```
Redistribute data between parallel workers

Types:
- Gather: Collect from all workers to one
- Redistribute: Hash partition to different workers
- Broadcast: Send all data to all workers

Example join parallelization:
Worker 1: R partition 1 ⋈ S partition 1
Worker 2: R partition 2 ⋈ S partition 2
...
Gather all results
```

### Parallelism Considerations

```
Good parallelism candidates:
- Large table scans
- CPU-intensive aggregations
- Multiple independent operations

Poor candidates:
- Small tables (overhead > benefit)
- Already I/O bound
- High coordination cost operations

-- PostgreSQL parallel settings
SET max_parallel_workers_per_gather = 4;
SET parallel_tuple_cost = 0.1;
SET parallel_setup_cost = 1000;
```

