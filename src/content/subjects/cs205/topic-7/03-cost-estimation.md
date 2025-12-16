# Cost Estimation

Query optimizers use cost models to choose between execution plans. Understanding cost estimation helps predict optimizer behavior and diagnose plan issues.

## Cost Model Fundamentals

### What Cost Represents

```
Cost is an abstract measure of resource consumption:
- I/O operations (disk reads/writes)
- CPU cycles (comparisons, calculations)
- Memory usage
- Network transfer (distributed systems)

Cost units are relative, not absolute time
Different databases use different scales
```

### Basic Cost Formula

```
Total Cost = I/O Cost + CPU Cost

I/O Cost = Pages Read × seq_page_cost
         + Pages Read Randomly × random_page_cost

CPU Cost = Tuples Processed × cpu_tuple_cost
         + Operations × cpu_operator_cost
```

### PostgreSQL Cost Parameters

```sql
-- View current settings
SHOW seq_page_cost;        -- Default: 1.0
SHOW random_page_cost;     -- Default: 4.0
SHOW cpu_tuple_cost;       -- Default: 0.01
SHOW cpu_index_tuple_cost; -- Default: 0.005
SHOW cpu_operator_cost;    -- Default: 0.0025

-- Sequential I/O is baseline (1.0)
-- Random I/O costs 4× sequential (spinning disk)
-- SSD systems often use random_page_cost = 1.1
```

## Statistics for Cost Estimation

### Table Statistics

```sql
-- PostgreSQL: View table statistics
SELECT
    relname,
    reltuples,    -- Estimated row count
    relpages,     -- Number of pages
    relallvisible -- Pages with all-visible tuples
FROM pg_class
WHERE relname = 'orders';

-- MySQL
SHOW TABLE STATUS LIKE 'orders';

-- SQL Server
SELECT
    object_name(object_id) AS TableName,
    rows,
    used_page_count
FROM sys.dm_db_partition_stats
WHERE object_name(object_id) = 'Orders';
```

### Column Statistics

```sql
-- PostgreSQL: Detailed column statistics
SELECT
    attname,
    null_frac,        -- Fraction of nulls
    n_distinct,       -- Distinct values (-1 = unique)
    most_common_vals, -- Most frequent values
    most_common_freqs,-- Their frequencies
    histogram_bounds  -- Value distribution
FROM pg_stats
WHERE tablename = 'orders' AND attname = 'status';

-- Example output:
-- null_frac: 0.0
-- n_distinct: 5
-- most_common_vals: {Completed,Pending,Shipped,Cancelled,Processing}
-- most_common_freqs: {0.45,0.25,0.15,0.10,0.05}
```

### Histograms

```
Histogram bins for numeric columns:

Value Range  | Frequency
-------------|----------
0-100        | 5%
100-200      | 15%
200-300      | 30%
300-400      | 25%
400-500      | 15%
500+         | 10%

Query: WHERE value BETWEEN 200 AND 400
Estimated: 30% + 25% = 55% of rows
```

## Selectivity Estimation

### Basic Selectivity

```
Selectivity = Fraction of rows matching predicate

Equality: selectivity = 1 / n_distinct
WHERE Status = 'Pending'
→ If 5 distinct statuses: 1/5 = 0.2 (20%)

Range: Use histogram
WHERE Amount > 500
→ From histogram: 10% of values > 500

NULL check: Use null_frac
WHERE ManagerID IS NULL
→ If null_frac = 0.15: selectivity = 0.15
```

### Combined Predicates

```
AND: Multiply selectivities (independence assumption)
WHERE A = 1 AND B = 2
→ sel(A=1) × sel(B=2) = 0.1 × 0.2 = 0.02

OR: Add selectivities, subtract overlap
WHERE A = 1 OR B = 2
→ sel(A=1) + sel(B=2) - sel(A=1) × sel(B=2)
→ 0.1 + 0.2 - 0.02 = 0.28

NOT: Complement
WHERE NOT (Status = 'Pending')
→ 1 - sel(Status = 'Pending') = 1 - 0.2 = 0.8
```

### Correlation Challenges

```
Independence assumption often wrong:

Table: Employees(State, City)
WHERE State = 'CA' AND City = 'Los Angeles'

Independent estimate: sel(CA) × sel(LA)
                    = 0.15 × 0.05 = 0.0075

But LA is only in CA!
Actual: sel(CA AND LA) = 0.05

Correlated columns cause misestimates
Modern optimizers track some correlations
```

## Join Cardinality Estimation

### Basic Join Estimation

```
R ⋈ S on R.A = S.A

Estimated rows = |R| × |S| / max(n_distinct(R.A), n_distinct(S.A))

Example:
Orders (100,000 rows, 10,000 distinct CustomerIDs)
Customers (10,000 rows, 10,000 distinct CustomerIDs)

Join estimate = 100,000 × 10,000 / 10,000 = 100,000 rows
```

### Foreign Key Joins

```
When FK relationship exists:
- Every Orders.CustomerID matches some Customers.CustomerID
- Result ≈ |Orders| (assuming no orphans)

Optimizer can recognize this pattern
More accurate than generic formula
```

### Multi-Way Joins

```
A ⋈ B ⋈ C

Intermediate cardinalities matter:

Option 1: (A ⋈ B) ⋈ C
- A ⋈ B produces X rows
- X ⋈ C produces final rows

Option 2: A ⋈ (B ⋈ C)
- B ⋈ C produces Y rows
- A ⋈ Y produces final rows

Choose order based on intermediate sizes
```

## Cost Estimation Examples

### Sequential Scan Cost

```
Table: Orders
Pages: 5,000
Rows: 500,000

Cost = Pages × seq_page_cost + Rows × cpu_tuple_cost
     = 5,000 × 1.0 + 500,000 × 0.01
     = 5,000 + 5,000
     = 10,000
```

### Index Scan Cost

```
Query: WHERE CustomerID = 123
Index: idx_customer (B-tree, height 3)
Matching rows: 50
Table pages to fetch: ~50 (assuming scattered)

Cost = Index traversal + Table fetches
     = 3 × random_page_cost + 50 × random_page_cost
     = 3 × 4.0 + 50 × 4.0
     = 12 + 200
     = 212

Much cheaper than seq scan (10,000) for selective queries
```

### Hash Join Cost

```
Build side: Customers (1,000 rows, 50 pages)
Probe side: Orders (500,000 rows, 5,000 pages)

Cost = Build side scan + Hash table construction + Probe scan

Build: 50 × seq_page_cost + 1,000 × cpu_tuple_cost = 60
Probe: 5,000 × seq_page_cost + 500,000 × cpu_tuple_cost = 10,000

Total ≈ 10,060
```

### Nested Loop Cost

```
Outer: Customers (1,000 rows)
Inner: Orders with index (50 rows per customer)

Cost = Outer scan + (Outer rows × Inner index lookup)
     = 50 × 1.0 + 1,000 × (3 × 4.0 + 50 × 0.01)
     = 50 + 1,000 × 12.5
     = 50 + 12,500
     = 12,550

Worse than hash join for this case
Better if outer is very small
```

## Optimizer Decisions

### Plan Selection Logic

```
Optimizer generates candidate plans:
Plan A: Seq Scan + Hash Join     Cost: 15,000
Plan B: Index Scan + Nested Loop Cost: 12,550
Plan C: Index Scan + Merge Join  Cost: 18,000

Selected: Plan B (lowest cost)

But costs are estimates—can be wrong!
```

### When Estimates Fail

```
Causes of bad estimates:
1. Stale statistics
2. Correlated columns
3. Skewed data distribution
4. Complex expressions
5. Functions hiding selectivity

Symptoms:
- Actual rows >> estimated rows
- Wrong join type chosen
- Excessive memory/time usage
```

### Forcing Better Plans

```sql
-- Update statistics
ANALYZE table_name;

-- PostgreSQL: Adjust statistics target
ALTER TABLE orders ALTER COLUMN status SET STATISTICS 1000;
ANALYZE orders;

-- Force join order
SET join_collapse_limit = 1;  -- Respect FROM order

-- Disable specific methods
SET enable_seqscan = off;
SET enable_hashjoin = off;

-- Hints (where supported)
SELECT /*+ INDEX(orders idx_date) */ * FROM orders;
```

## Cost Model Calibration

### Tuning Cost Parameters

```sql
-- For SSD storage, reduce random I/O cost
SET random_page_cost = 1.1;

-- For systems with more RAM (data cached)
SET effective_cache_size = '8GB';

-- For faster CPUs relative to I/O
SET cpu_tuple_cost = 0.001;

-- Test different settings
EXPLAIN ANALYZE SELECT ...;
-- Compare actual time vs cost
```

### Workload-Based Tuning

```
1. Identify representative queries
2. Run with default settings
3. Note actual vs estimated times
4. Adjust cost parameters
5. Verify improvement
6. Test across workload

Example calibration:
Query takes 100ms, cost = 10,000
If cost units should roughly equal ms:
Adjust parameters until cost ≈ 100
```

