---
id: cs205-t7-optimizer
title: "Query Optimizer Internals"
order: 7
---

# Query Optimizer Internals

The query optimizer transforms SQL statements into efficient execution plans by exploring alternative strategies and estimating their costs. Understanding optimizer internals helps you write queries that optimize well, interpret execution plans accurately, and troubleshoot performance issues when the optimizer makes suboptimal choices.

## Optimizer Architecture

### Query Processing Pipeline

```
SQL Query
    ↓
[Parser] → Parse Tree
    ↓
[Analyzer] → Annotated Parse Tree (with types, resolved names)
    ↓
[Rewriter] → Rewritten Query Tree (view expansion, rule application)
    ↓
[Optimizer] → Execution Plan
    ↓
[Executor] → Results
```

### Optimizer Responsibilities

The optimizer must decide:
1. **Access paths**: How to read each table (scan, index)
2. **Join order**: Which tables to join first
3. **Join algorithms**: Nested loop, hash, merge
4. **Parallelism**: How to parallelize operations
5. **Materialization**: When to store intermediate results

## Cost Model Components

### Cost Factors

The optimizer estimates costs based on:

**I/O Costs**:
- Sequential page reads (cheap)
- Random page reads (expensive)
- Page writes for sorting/hashing

**CPU Costs**:
- Tuple processing
- Expression evaluation
- Comparison operations
- Aggregation

**Memory Costs**:
- Hash table size
- Sort buffers
- Intermediate result storage

### PostgreSQL Cost Parameters

```sql
-- View current cost parameters
SHOW seq_page_cost;        -- Cost of sequential read (1.0)
SHOW random_page_cost;     -- Cost of random read (4.0)
SHOW cpu_tuple_cost;       -- Per-tuple processing (0.01)
SHOW cpu_index_tuple_cost; -- Per-index-tuple processing (0.005)
SHOW cpu_operator_cost;    -- Per-operator execution (0.0025)
SHOW effective_cache_size; -- Estimated OS cache size

-- Adjust for SSD storage (random I/O is cheaper)
SET random_page_cost = 1.1;  -- Close to sequential for SSD
```

### Cost Calculation Example

```
Sequential Scan Cost:
  cost = (disk_pages × seq_page_cost) + (rows × cpu_tuple_cost)

Index Scan Cost:
  cost = (index_pages × random_page_cost) +
         (matching_tuples × cpu_index_tuple_cost) +
         (heap_fetches × random_page_cost) +
         (rows × cpu_tuple_cost)
```

## Statistics and Cardinality Estimation

### Table Statistics

The optimizer relies on statistics to estimate selectivity:

```sql
-- PostgreSQL: View table statistics
SELECT
    attname AS column,
    n_distinct,       -- Number of distinct values
    null_frac,        -- Fraction of NULLs
    avg_width,        -- Average column width in bytes
    correlation       -- Physical vs logical ordering (-1 to 1)
FROM pg_stats
WHERE tablename = 'orders';

-- View most common values
SELECT
    attname,
    most_common_vals,
    most_common_freqs
FROM pg_stats
WHERE tablename = 'orders' AND attname = 'status';
```

### Histogram Statistics

For range queries, the optimizer uses histograms:

```sql
-- View histogram boundaries
SELECT
    attname,
    histogram_bounds
FROM pg_stats
WHERE tablename = 'orders' AND attname = 'total_amount';

-- Example output:
-- histogram_bounds: {0, 50, 100, 200, 500, 1000, 5000, 10000}
-- Each bucket contains approximately equal number of rows
```

### Updating Statistics

```sql
-- PostgreSQL: Analyze specific table
ANALYZE orders;

-- Analyze with sampling for large tables
ANALYZE (VERBOSE) orders;

-- Set statistics target for specific column
ALTER TABLE orders ALTER COLUMN customer_id SET STATISTICS 1000;
ANALYZE orders;

-- MySQL: Update statistics
ANALYZE TABLE orders;
```

### Cardinality Estimation Challenges

**Correlated Columns**:
```sql
-- Optimizer assumes independence
SELECT * FROM products
WHERE category = 'Electronics' AND subcategory = 'Smartphones';

-- But these are correlated! Estimate may be too low.
-- PostgreSQL 10+ can use extended statistics:
CREATE STATISTICS stats_products_category
ON category, subcategory FROM products;
ANALYZE products;
```

**Skewed Data**:
```sql
-- If 90% of orders have status='Complete'
SELECT * FROM orders WHERE status = 'Pending';

-- Optimizer needs accurate frequency statistics
-- Most common values statistics help here
```

## Plan Enumeration and Selection

### Search Space

For N tables, the number of possible join orders is:
- N! permutations
- 2^(N-1) different tree shapes

With N=10 tables, billions of possible plans exist.

### Dynamic Programming Approach

Most optimizers use dynamic programming:

```
1. Generate optimal plans for single tables
2. Generate optimal plans for pairs of tables
3. Generate optimal plans for triplets using pair results
4. Continue until all tables are included

Key insight: Optimal plan for N tables uses optimal
subplan for (N-1) tables + one additional table
```

### Join Order Heuristics

When search space is too large:

```sql
-- PostgreSQL: Limit search for complex queries
SET geqo_threshold = 12;  -- Use genetic algorithm above 12 tables
SET join_collapse_limit = 8;  -- Don't reorder explicit joins beyond 8

-- Force optimizer to follow explicit join order
SET join_collapse_limit = 1;
SELECT * FROM a JOIN b ON ... JOIN c ON ...;
```

## Execution Plan Analysis

### Understanding EXPLAIN Output

```sql
EXPLAIN (ANALYZE, BUFFERS, TIMING, FORMAT TEXT)
SELECT c.name, COUNT(*)
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE c.country = 'USA'
GROUP BY c.customer_id, c.name;
```

**Key Plan Elements**:
```
HashAggregate  (cost=1250.00..1260.00 rows=1000 width=36)
                        ↑ estimated   ↑ estimated  ↑ estimated
               (actual time=45.2..46.1 rows=850 loops=1)
                        ↑ actual      ↑ actual   ↑ iterations
  Group Key: c.customer_id, c.name
  Buffers: shared hit=1200 read=50
                    ↑ cache  ↑ disk reads
  ->  Hash Join  (cost=125.00..1100.00 rows=10000 width=36)
        Hash Cond: (o.customer_id = c.customer_id)
        ->  Seq Scan on orders o (...)
        ->  Hash (...)
              ->  Seq Scan on customers c (...)
                    Filter: (country = 'USA')
```

### Identifying Problems

**Row Estimate Errors**:
```
Nested Loop (cost=... rows=10) (actual... rows=100000)
                         ↑                      ↑
                     Expected             Actual (10000x off!)
```

This indicates stale statistics or correlation issues.

**Inefficient Scan**:
```
Seq Scan on large_table (cost=0..50000 rows=1000000)
  Filter: (id = 123)
  Rows Removed by Filter: 999999
```

Should use index scan instead.

### Using EXPLAIN Effectively

```sql
-- Basic plan
EXPLAIN SELECT ...;

-- With actual execution (runs query!)
EXPLAIN ANALYZE SELECT ...;

-- With memory usage
EXPLAIN (ANALYZE, BUFFERS) SELECT ...;

-- JSON format for programmatic analysis
EXPLAIN (FORMAT JSON) SELECT ...;

-- Include all options
EXPLAIN (ANALYZE, BUFFERS, TIMING, VERBOSE, FORMAT TEXT) SELECT ...;
```

## Influencing the Optimizer

### Query Hints

Some databases support hints to guide optimization:

```sql
-- Oracle hints
SELECT /*+ INDEX(orders idx_orders_date) */ *
FROM orders WHERE order_date > '2024-01-01';

-- MySQL hints
SELECT * FROM orders USE INDEX (idx_orders_date)
WHERE order_date > '2024-01-01';

-- PostgreSQL: No direct hints, but can disable options
SET enable_seqscan = OFF;
SET enable_hashjoin = OFF;
```

### Query Restructuring

Rewrite queries to help the optimizer:

```sql
-- Original: Optimizer might not push predicate
SELECT * FROM orders
WHERE customer_id IN (SELECT customer_id FROM vip_customers);

-- Rewritten: More explicit join
SELECT o.* FROM orders o
JOIN vip_customers v ON o.customer_id = v.customer_id;

-- Using CTE to force materialization
WITH filtered_orders AS MATERIALIZED (
    SELECT * FROM orders WHERE order_date > '2024-01-01'
)
SELECT * FROM filtered_orders WHERE status = 'Complete';
```

### Configuration Tuning

```sql
-- Increase memory for complex operations
SET work_mem = '256MB';  -- Per-operation memory

-- Adjust parallelism
SET max_parallel_workers_per_gather = 4;
SET parallel_tuple_cost = 0.01;

-- Adjust cost parameters for hardware
SET random_page_cost = 1.1;  -- SSD
SET effective_cache_size = '8GB';  -- Available memory
```

## Adaptive Query Optimization

Modern optimizers can adjust during execution:

### Adaptive Plans

```
1. Optimizer creates plan with checkpoints
2. At runtime, collect actual statistics
3. If estimates were wrong, adapt plan
4. Possible adaptations:
   - Switch from nested loop to hash join
   - Choose different indexes
   - Adjust parallelism
```

### Feedback Loops

```sql
-- PostgreSQL: pg_stat_statements for query analysis
SELECT
    query,
    calls,
    mean_time,
    stddev_time
FROM pg_stat_statements
WHERE query LIKE '%orders%'
ORDER BY total_time DESC;

-- Use historical data to improve future estimates
```

## Debugging Optimizer Choices

### When Optimizer Chooses Wrong

1. **Check statistics**: Are they current?
2. **Check row estimates**: Are they accurate?
3. **Check cost parameters**: Do they match hardware?
4. **Check data distribution**: Any unusual patterns?

```sql
-- Compare estimated vs actual
EXPLAIN ANALYZE SELECT ...;

-- Look for: "rows=X" vs "actual rows=Y"
-- Large discrepancies indicate estimation problems

-- Update statistics
ANALYZE tablename;

-- Force replan
DISCARD PLANS;  -- PostgreSQL
```

### Creating Reproducible Test Cases

```sql
-- Export query and statistics
pg_dump --table=orders --schema-only mydb > schema.sql
SELECT * FROM pg_stats WHERE tablename = 'orders' \g stats.txt

-- Include in bug reports:
-- 1. Schema definition
-- 2. Statistics
-- 3. Query
-- 4. EXPLAIN ANALYZE output
-- 5. Configuration parameters
```

Understanding optimizer internals transforms you from a query writer to a query engineer who can systematically diagnose and resolve performance issues.
