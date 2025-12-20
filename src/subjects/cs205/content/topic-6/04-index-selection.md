# Index Selection

Choosing the right indexes requires analyzing query patterns, understanding costs, and balancing read and write performance. This is one of the most important skills in database tuning.

## Query Analysis

### Identifying Index Candidates

```sql
-- Examine WHERE clauses
SELECT * FROM Orders WHERE CustomerID = 123;
-- Candidate: CustomerID

SELECT * FROM Products WHERE Category = 'Electronics' AND Price < 500;
-- Candidates: Category, Price, or (Category, Price)

-- Examine JOIN conditions
SELECT * FROM Orders o
JOIN Customers c ON o.CustomerID = c.CustomerID;
-- Candidate: Orders.CustomerID (Customers.CustomerID likely has PK index)

-- Examine ORDER BY
SELECT * FROM Orders WHERE Status = 'Pending' ORDER BY OrderDate DESC;
-- Candidate: (Status, OrderDate) composite
```

### Query Workload Analysis

```sql
-- PostgreSQL: Identify slow queries
SELECT
    query,
    calls,
    total_time / 1000 as total_seconds,
    mean_time as avg_ms,
    rows
FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 20;

-- MySQL: Enable slow query log
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;  -- Queries over 1 second
```

### Selectivity Assessment

```sql
-- Check value distribution
SELECT
    Status,
    COUNT(*) as count,
    COUNT(*) * 100.0 / SUM(COUNT(*)) OVER() as percentage
FROM Orders
GROUP BY Status;

-- Result:
-- Status     | count    | percentage
-- Completed  | 950000   | 95%
-- Pending    | 40000    | 4%
-- Cancelled  | 10000    | 1%

-- Index on Status: Only useful for Pending/Cancelled queries
-- WHERE Status = 'Completed' likely better with table scan
```

## Cost-Benefit Analysis

### Index Benefit Estimation

```
Benefit factors:
1. Query frequency (queries/second using this index)
2. Rows scanned without index
3. Rows scanned with index
4. I/O cost reduction

Example calculation:
Without index: 1M row scan × 100 queries/day = 100M rows/day
With index: 100 rows × 100 queries/day = 10K rows/day
Improvement: 99.99% fewer rows scanned
```

### Index Cost Estimation

```
Cost factors:
1. Storage space
2. Insert overhead
3. Update overhead (if indexed column changes)
4. Delete overhead
5. Maintenance (rebuild/reorganize)

Example:
Table: 1M rows, 100K inserts/day
Index: 20 bytes per entry

Storage: 20 bytes × 1M = 20 MB
Daily insert overhead: 100K × log(1M) × time per entry
Update: If indexed column changes 10% = 10K extra operations
```

### Break-Even Analysis

```
Question: Is index worth it?

Scenario:
- SELECT queries: 1000/day, each saves 100ms with index
- INSERT queries: 50000/day, each costs 0.5ms with index

Benefit: 1000 × 100ms = 100,000ms = 100 seconds saved
Cost: 50000 × 0.5ms = 25,000ms = 25 seconds added

Net benefit: 75 seconds saved per day → Worth it!

Different scenario:
- SELECT queries: 10/day
- INSERT queries: 100000/day

Benefit: 10 × 100ms = 1 second
Cost: 100000 × 0.5ms = 50 seconds

Net: -49 seconds → NOT worth it!
```

## Index Design Strategies

### Column Order in Composite Indexes

```sql
-- Rule: Most selective column first? Not always!

-- Consider query patterns:
-- Q1: WHERE A = ? (100 times/day)
-- Q2: WHERE A = ? AND B = ? (1000 times/day)
-- Q3: WHERE B = ? (10 times/day)

-- Option 1: INDEX(A, B)
-- Covers Q1 fully, Q2 fully, Q3 not at all

-- Option 2: INDEX(B, A)
-- Covers Q2 fully, Q3 fully, Q1 not at all

-- Option 3: INDEX(A, B) + INDEX(B)
-- Covers all queries

-- Analysis: Q2 dominates, so INDEX(A, B) + INDEX(B) if Q3 important
```

### Covering Index Decision

```sql
-- Original query:
SELECT OrderID, OrderDate, Total
FROM Orders
WHERE CustomerID = 123
ORDER BY OrderDate DESC;

-- Option 1: Simple index
CREATE INDEX idx_customer ON Orders(CustomerID);
-- Index lookup + table fetch for other columns

-- Option 2: Covering index
CREATE INDEX idx_customer_covering ON Orders(CustomerID, OrderDate DESC)
INCLUDE (Total);
-- Index-only scan, no table fetch

-- Choose Option 2 if:
-- - Query runs frequently
-- - Table rows are wide (expensive to fetch)
-- - Included columns don't change often
```

### Partial Index Decision

```sql
-- Full index vs partial index

-- Scenario: 10M orders, 99% completed
SELECT * FROM Orders WHERE Status = 'Pending';

-- Option 1: Full index on Status
-- Size: 10M entries
-- Query: Still must filter 99% false positives

-- Option 2: Partial index
CREATE INDEX idx_pending ON Orders(OrderID)
WHERE Status = 'Pending';
-- Size: ~100K entries (1%)
-- Query: Direct match, no filtering

-- Partial index 100x smaller and faster!
```

## Index Maintenance

### Monitoring Index Health

```sql
-- PostgreSQL: Index usage statistics
SELECT
    schemaname,
    tablename,
    indexrelname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch,
    pg_size_pretty(pg_relation_size(indexrelid)) AS size
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;

-- Find unused indexes
SELECT indexrelname, idx_scan
FROM pg_stat_user_indexes
WHERE idx_scan = 0
  AND indexrelname NOT LIKE '%pkey';
```

### Index Fragmentation

```sql
-- SQL Server: Check fragmentation
SELECT
    OBJECT_NAME(ps.object_id) AS TableName,
    i.name AS IndexName,
    ps.avg_fragmentation_in_percent
FROM sys.dm_db_index_physical_stats(DB_ID(), NULL, NULL, NULL, 'LIMITED') ps
JOIN sys.indexes i ON ps.object_id = i.object_id AND ps.index_id = i.index_id
WHERE ps.avg_fragmentation_in_percent > 30;

-- PostgreSQL: Check bloat
SELECT
    schemaname, tablename, indexrelname,
    pg_size_pretty(pg_relation_size(indexrelid)) as index_size,
    idx_scan,
    idx_tup_read
FROM pg_stat_user_indexes
WHERE idx_scan = 0;
```

### Rebuild vs Reorganize

```sql
-- Rebuild (offline, full reconstruction)
ALTER INDEX idx_name ON TableName REBUILD;
-- Best for: Heavy fragmentation (>30%)
-- Downside: Locks table, resource intensive

-- Reorganize (online, incremental)
ALTER INDEX idx_name ON TableName REORGANIZE;
-- Best for: Moderate fragmentation (10-30%)
-- Upside: Online, less resource intensive

-- PostgreSQL: REINDEX
REINDEX INDEX idx_name;

-- Or concurrent (no locks)
REINDEX INDEX CONCURRENTLY idx_name;
```

## Index Recommendations

### Automated Tools

```sql
-- SQL Server: Missing Index DMVs
SELECT
    mig.index_handle,
    mid.statement AS table_name,
    mid.equality_columns,
    mid.inequality_columns,
    mid.included_columns,
    migs.avg_user_impact
FROM sys.dm_db_missing_index_groups mig
JOIN sys.dm_db_missing_index_details mid
    ON mig.index_handle = mid.index_handle
JOIN sys.dm_db_missing_index_group_stats migs
    ON mig.index_group_handle = migs.group_handle
ORDER BY migs.avg_user_impact DESC;

-- PostgreSQL: pg_qualstats extension
-- Tracks predicate usage
SELECT * FROM pg_qualstats;
```

### Manual Index Review Process

```
1. Identify high-frequency queries
   - Query logs, monitoring tools

2. Analyze execution plans
   - Look for table scans on large tables
   - Check estimated vs actual rows

3. Review existing indexes
   - Are they being used?
   - Can they be consolidated?

4. Design new indexes
   - Start minimal, add as needed
   - Consider composite for multi-column filters

5. Test with realistic data
   - Development data often differs from production
   - Index behavior changes with data distribution

6. Monitor after deployment
   - Verify index is used
   - Check write performance impact
```

## Common Index Mistakes

### Over-Indexing

```
Problem: Index on every column
Result: Slow writes, wasted space

Example:
CREATE INDEX idx_col1 ON Table(Col1);
CREATE INDEX idx_col2 ON Table(Col2);
CREATE INDEX idx_col3 ON Table(Col3);
CREATE INDEX idx_col4 ON Table(Col4);
...
CREATE INDEX idx_col20 ON Table(Col20);

Every INSERT updates 20 indexes!
```

### Wrong Column Order

```sql
-- Query: WHERE B = ? AND A = ?
CREATE INDEX idx ON Table(A, B);  -- Works but...
CREATE INDEX idx ON Table(B, A);  -- Better if B is more selective

-- Or if we also have:
-- Query: WHERE B = ?
-- Then (B, A) can serve both queries
```

### Ignoring Updates

```sql
-- Index on frequently updated column
CREATE INDEX idx_balance ON Accounts(Balance);

-- Every balance update = index update
-- If balances update constantly, major overhead

-- Consider: Is this index really needed?
-- Maybe balance range queries are rare
```

### Not Considering NULL

```sql
-- Many indexes don't include NULL values efficiently
CREATE INDEX idx_manager ON Employees(ManagerID);

-- Query for NULL may not use index:
SELECT * FROM Employees WHERE ManagerID IS NULL;

-- Solution: Partial index or different approach
CREATE INDEX idx_no_manager ON Employees(EmployeeID)
WHERE ManagerID IS NULL;
```

