# Join Algorithms and Optimization

Join operations are often the most expensive component of SQL queries. Understanding how databases implement joins enables you to write queries that leverage efficient algorithms and avoid performance pitfalls. This guide covers the major join algorithms, when each is used, and how to influence join strategy selection.

## Join Algorithm Overview

Modern databases implement several join algorithms, each optimal for different data characteristics:

| Algorithm | Best For | Memory | Complexity |
|-----------|----------|--------|------------|
| Nested Loop | Small tables, indexed inner | Low | O(n × m) |
| Hash Join | Equality joins, large tables | High | O(n + m) |
| Merge Join | Pre-sorted data, equality | Medium | O(n log n + m log m) |
| Index Nested Loop | Indexed inner table | Low | O(n × log m) |

## Nested Loop Join

The simplest join algorithm iterates through both tables:

### Basic Nested Loop

```
Algorithm: Nested Loop Join
for each row r in outer table:
    for each row s in inner table:
        if join_condition(r, s):
            output (r, s)
```

**Characteristics**:
- Works with any join condition (equality, inequality, complex)
- No memory overhead for hash tables
- Optimal when outer table is small
- Terrible for large tables (O(n × m) comparisons)

**Execution Plan Indication**:
```
Nested Loop
  -> Seq Scan on orders o
  -> Seq Scan on customers c
        Filter: (c.customer_id = o.customer_id)
```

### Block Nested Loop

Optimization that processes blocks of tuples:

```
Algorithm: Block Nested Loop
for each block of rows R in outer table:
    for each block of rows S in inner table:
        for each r in R:
            for each s in S:
                if join_condition(r, s):
                    output (r, s)
```

**Benefits**:
- Reduces I/O by loading blocks
- Better cache utilization
- Still O(n × m) but with lower constant factor

## Index Nested Loop Join

Uses an index on the inner table for efficient lookups:

```
Algorithm: Index Nested Loop
for each row r in outer table:
    look up matching rows in inner table using index
    for each matching s:
        output (r, s)
```

**Execution Plan**:
```
Nested Loop
  -> Seq Scan on orders o
  -> Index Scan using customers_pkey on customers c
        Index Cond: (customer_id = o.customer_id)
```

**Performance**:
- O(n × log m) with B-tree index
- Excellent when outer table is small
- Requires index on join column of inner table

**When Optimizer Chooses This**:
```sql
-- Small outer table drives the join
SELECT c.name, COUNT(o.order_id)
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
WHERE o.order_date = '2024-01-15'  -- Filters to few orders
GROUP BY c.customer_id, c.name;
```

## Hash Join

Builds a hash table from one table, probes with the other:

### Algorithm

```
Algorithm: Hash Join
-- Build phase
for each row r in smaller table (build input):
    insert r into hash_table[hash(r.join_key)]

-- Probe phase
for each row s in larger table (probe input):
    for each r in hash_table[hash(s.join_key)]:
        if r.join_key = s.join_key:
            output (r, s)
```

**Execution Plan**:
```
Hash Join
  Hash Cond: (o.customer_id = c.customer_id)
  -> Seq Scan on orders o
  -> Hash
        -> Seq Scan on customers c
```

### Hash Join Characteristics

**Advantages**:
- O(n + m) average case
- Excellent for large table joins
- No sorting required
- Works well with equality joins

**Disadvantages**:
- Only works for equality conditions
- Requires memory for hash table
- If hash table exceeds memory, spills to disk (slower)

### Memory Considerations

```sql
-- PostgreSQL: Control hash join memory
SET work_mem = '256MB';  -- More memory for hash tables

-- Check if hash join spilled to disk
EXPLAIN (ANALYZE, BUFFERS)
SELECT ...
-- Look for: "Batches: 4" indicates disk spill
```

### Grace Hash Join (Hybrid)

For tables too large to fit in memory:

```
Algorithm: Grace Hash Join
-- Partition phase
partition both tables by hash(join_key) into N buckets
write partitions to disk

-- Join phase
for each partition i:
    load partition i from build table into hash table
    probe with partition i from probe table
```

## Merge Join (Sort-Merge Join)

Joins pre-sorted data by merging:

### Algorithm

```
Algorithm: Merge Join
sort outer table by join key (if not already sorted)
sort inner table by join key (if not already sorted)

r = first row of outer
s = first row of inner

while not end of either table:
    if r.key = s.key:
        output all matching combinations
        advance both
    else if r.key < s.key:
        advance outer
    else:
        advance inner
```

**Execution Plan**:
```
Merge Join
  Merge Cond: (o.customer_id = c.customer_id)
  -> Sort
        Sort Key: o.customer_id
        -> Seq Scan on orders o
  -> Sort
        Sort Key: c.customer_id
        -> Seq Scan on customers c
```

### Merge Join Characteristics

**Advantages**:
- O(n log n + m log m) with sorting
- O(n + m) if already sorted (e.g., index scan)
- Works well for large tables with ordering
- Good for range joins

**Disadvantages**:
- Requires sorting or sorted input
- Only for equality and inequality joins
- Sort can be expensive for large tables

**Optimal When**:
```sql
-- Data comes from index scans (already sorted)
SELECT o.*, c.name
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
ORDER BY o.customer_id;  -- Match join order to avoid extra sort
```

## Join Order Optimization

The optimizer must choose which table to process first:

### Importance of Join Order

For three tables A, B, C:
- (A ⋈ B) ⋈ C
- A ⋈ (B ⋈ C)
- (A ⋈ C) ⋈ B

Different orders can have vastly different costs.

### Cardinality-Based Ordering

**General principle**: Join smaller results first

```sql
-- Query joining three tables
SELECT *
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN products p ON o.product_id = p.product_id
WHERE c.country = 'USA'
  AND p.category = 'Electronics';

-- Optimizer might reorder to:
-- 1. Scan customers where country = 'USA' (small result)
-- 2. Join with orders (medium result)
-- 3. Join with products where category = 'Electronics'
```

### Controlling Join Order

```sql
-- PostgreSQL: Disable join reordering
SET join_collapse_limit = 1;  -- Use explicit order

-- Force specific order with STRAIGHT_JOIN (MySQL)
SELECT STRAIGHT_JOIN *
FROM small_table s
JOIN large_table l ON s.id = l.s_id;

-- Use CTEs to materialize intermediate results
WITH filtered_customers AS (
    SELECT * FROM customers WHERE country = 'USA'
)
SELECT * FROM filtered_customers fc
JOIN orders o ON fc.customer_id = o.customer_id;
```

## Semi-Join and Anti-Join

### Semi-Join (EXISTS)

Returns outer rows where a match exists in inner table:

```sql
-- Semi-join: customers with orders
SELECT c.*
FROM customers c
WHERE EXISTS (
    SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id
);
```

**Plan**:
```
Hash Semi Join
  Hash Cond: (c.customer_id = o.customer_id)
```

Semi-join stops after finding first match—more efficient than full join when you don't need inner table data.

### Anti-Join (NOT EXISTS)

Returns outer rows where no match exists:

```sql
-- Anti-join: customers without orders
SELECT c.*
FROM customers c
WHERE NOT EXISTS (
    SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id
);
```

**Plan**:
```
Hash Anti Join
  Hash Cond: (c.customer_id = o.customer_id)
```

## Join Optimization Tips

### Ensure Join Columns Are Indexed

```sql
-- Foreign key columns should be indexed
CREATE INDEX idx_orders_customer ON orders (customer_id);

-- Composite index if filtering with join
CREATE INDEX idx_orders_customer_date ON orders (customer_id, order_date);
```

### Match Data Types

```sql
-- Bad: Type mismatch causes implicit conversion
SELECT * FROM orders o
JOIN customers c ON o.customer_id = c.customer_id::TEXT;

-- Good: Matching types
SELECT * FROM orders o
JOIN customers c ON o.customer_id = c.customer_id;
```

### Reduce Data Before Joining

```sql
-- Suboptimal: Filter after join
SELECT c.name, o.total
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_date > '2024-01-01';

-- Better: Let optimizer push down predicate
-- (usually automatic, but sometimes helps to restructure)
SELECT c.name, o.total
FROM customers c
JOIN (
    SELECT * FROM orders WHERE order_date > '2024-01-01'
) o ON c.customer_id = o.customer_id;
```

### Analyze Join Performance

```sql
-- Check join method and row estimates
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT c.name, COUNT(*)
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.name;

-- Look for:
-- - Join method (Nested Loop, Hash, Merge)
-- - Estimated vs actual rows
-- - Buffer hits vs reads
```

Understanding join algorithms helps you write queries that the optimizer can execute efficiently and diagnose performance problems when they occur.
