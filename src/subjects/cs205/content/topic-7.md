# Query Optimization

Query optimization transforms SQL queries into efficient execution plans. Understanding how databases optimize queries helps you write better SQL and diagnose performance issues.

## Query Processing Overview

### Stages

1. **Parsing**: Check syntax, build parse tree
2. **Semantic Analysis**: Validate tables, columns, types
3. **Query Rewriting**: Apply transformations
4. **Plan Generation**: Create candidate execution plans
5. **Cost Estimation**: Estimate cost of each plan
6. **Plan Selection**: Choose lowest-cost plan
7. **Execution**: Run the selected plan

### Query Plans

A query plan specifies:
- Which indexes to use
- Join order and methods
- Data access paths
- Intermediate result handling

## Execution Plans

### Reading EXPLAIN Output

```sql
EXPLAIN SELECT * FROM Orders o
JOIN Customers c ON o.CustomerID = c.CustomerID
WHERE c.Country = 'USA';

-- Example output:
-- Hash Join (cost=100..500)
--   Hash Cond: (o.customerid = c.customerid)
--   -> Seq Scan on orders o (cost=0..200)
--   -> Hash (cost=50..50)
--        -> Index Scan on idx_country (cost=0..50)
--             Index Cond: (country = 'USA')
```

### Key Metrics

- **Cost**: Estimated units of work
- **Rows**: Estimated output rows
- **Width**: Average row size in bytes
- **Actual time**: Real execution time (EXPLAIN ANALYZE)

### Access Methods

**Sequential Scan**: Read all rows
```
Seq Scan on Orders (cost=0..1000 rows=50000)
```

**Index Scan**: Use index to find rows
```
Index Scan using idx_customer (cost=0..50 rows=100)
```

**Index Only Scan**: Answer from index without table access
```
Index Only Scan using idx_covering (cost=0..30 rows=100)
```

**Bitmap Scan**: Build bitmap from index, then fetch
```
Bitmap Heap Scan on Orders
  -> Bitmap Index Scan on idx_status
```

## Join Algorithms

### Nested Loop Join

For each row in outer table, scan inner table:

```
for each row r1 in R:
    for each row r2 in S:
        if r1.key == r2.key:
            output (r1, r2)
```

Cost: O(|R| × |S|)
Best for: Small tables, indexed inner table

### Hash Join

Build hash table on smaller relation, probe with larger:

```
# Build phase
for each row r in R:
    hash_table[r.key] = r

# Probe phase
for each row s in S:
    if s.key in hash_table:
        output (hash_table[s.key], s)
```

Cost: O(|R| + |S|)
Best for: Large tables, equality joins

### Sort-Merge Join

Sort both relations, merge:

```
sort R by join key
sort S by join key
merge R and S outputting matches
```

Cost: O(|R| log |R| + |S| log |S|)
Best for: Pre-sorted data, range joins

### Join Selection

| Join Type | Best When |
|-----------|-----------|
| Nested Loop | Small outer, indexed inner |
| Hash Join | Large tables, no index |
| Sort-Merge | Already sorted, range conditions |

## Cost Estimation

### Statistics

Database maintains statistics:
- **Table cardinality**: Number of rows
- **Column cardinality**: Distinct values
- **Histograms**: Value distribution
- **Index statistics**: Depth, selectivity

```sql
-- Update statistics
ANALYZE TABLE Orders;

-- View statistics
SELECT * FROM pg_stats WHERE tablename = 'orders';
```

### Selectivity

Fraction of rows that satisfy a predicate:

```
selectivity(Age > 50) = (100 - 50) / 100 = 0.5  -- uniform assumption
selectivity(Country = 'USA') = 1 / distinct_countries  -- equality
```

### Cost Formulas

Simplified models:
```
SeqScan cost = pages_in_table × seq_page_cost
IndexScan cost = index_pages + matching_rows × random_page_cost
Join cost = outer_cost + inner_cost + matching_rows × per_row_cost
```

## Query Rewriting

### Predicate Pushdown

Move filters as early as possible:

```sql
-- Before
SELECT * FROM (SELECT * FROM Orders JOIN Customers ON ...) t
WHERE t.Country = 'USA';

-- After
SELECT * FROM Orders
JOIN (SELECT * FROM Customers WHERE Country = 'USA') c ON ...
```

### View Merging

Inline views into main query:

```sql
-- View definition
CREATE VIEW USACustomers AS SELECT * FROM Customers WHERE Country = 'USA';

-- Query
SELECT * FROM Orders o JOIN USACustomers c ON o.CustomerID = c.CustomerID;

-- Merged
SELECT * FROM Orders o JOIN Customers c ON o.CustomerID = c.CustomerID
WHERE c.Country = 'USA';
```

### Subquery Unnesting

Convert subqueries to joins:

```sql
-- Before
SELECT * FROM Orders WHERE CustomerID IN (SELECT CustomerID FROM Customers WHERE Country = 'USA');

-- After
SELECT DISTINCT o.* FROM Orders o
JOIN Customers c ON o.CustomerID = c.CustomerID
WHERE c.Country = 'USA';
```

## Performance Tuning

### Writing Efficient Queries

1. **Select only needed columns**
```sql
-- Bad
SELECT * FROM Orders WHERE CustomerID = 1;
-- Good
SELECT OrderID, OrderDate, Amount FROM Orders WHERE CustomerID = 1;
```

2. **Use appropriate indexes**
```sql
-- Ensure index exists on filter columns
CREATE INDEX idx_customer ON Orders(CustomerID);
```

3. **Avoid functions on indexed columns**
```sql
-- Bad (can't use index)
SELECT * FROM Orders WHERE YEAR(OrderDate) = 2024;
-- Good
SELECT * FROM Orders WHERE OrderDate >= '2024-01-01' AND OrderDate < '2025-01-01';
```

4. **Use EXISTS instead of IN for large subqueries**
```sql
-- Potentially slow
SELECT * FROM Orders WHERE CustomerID IN (SELECT CustomerID FROM LargeTable);
-- Often faster
SELECT * FROM Orders o WHERE EXISTS (SELECT 1 FROM LargeTable l WHERE l.CustomerID = o.CustomerID);
```

### Index Hints

Force specific index usage:

```sql
-- MySQL
SELECT * FROM Orders USE INDEX (idx_date) WHERE OrderDate > '2024-01-01';

-- PostgreSQL (less common)
SET enable_seqscan = OFF;
```

### Query Caching

Many databases cache query results:

```sql
-- MySQL query cache (deprecated in 8.0)
SELECT SQL_CACHE * FROM Products;

-- Application-level caching often more effective
```

## Learning Objectives

By the end of this topic, you should be able to:
- Read and interpret query execution plans
- Understand join algorithms and when each is used
- Explain how cost estimation works
- Apply query rewriting techniques
- Diagnose and fix slow queries
