---
id: cs205-t6-fundamentals
title: "Index Fundamentals"
order: 1
---

# Index Fundamentals

Indexes are auxiliary data structures that dramatically speed up data retrieval operations. Understanding when and how to use indexes is crucial for database performance.

## What is an Index?

### Basic Concept

```
An index is like a book's index:
- Maps search terms to locations
- Avoids scanning entire content
- Trades space for speed

Database Index:
- Maps column values to row locations
- Avoids full table scans
- Trades disk space and write speed for read speed
```

### Index Structure Overview

```
Table: Employees (1 million rows)
Index on: LastName

Without index:
  SELECT * FROM Employees WHERE LastName = 'Smith'
  → Scan all 1,000,000 rows
  → Check each LastName
  → ~1,000,000 comparisons

With index:
  → Lookup 'Smith' in index (B-tree)
  → Get row pointers directly
  → ~20 comparisons (log₂ n)
```

### Index Components

```
Index Entry = (Key Value, Pointer)

Key Value: Indexed column value(s)
Pointer: Physical location of row (RID, TID, etc.)

Example:
('Adams', Row 47532)
('Baker', Row 12891)
('Clark', Row 89234)
...
('Smith', Row 67123)
```

## Index Types

### B-Tree Index (Default)

```
Most common index type
Balanced tree structure
Good for: =, <, >, <=, >=, BETWEEN, LIKE 'prefix%'

         [M]
       /     \
    [D,H]    [R,V]
   /  |  \   / |  \
  A-C D-G H-L M-Q R-U V-Z

Each leaf contains pointers to actual rows
```

### Hash Index

```
Uses hash function to map keys to buckets
Only good for: = (equality)
Cannot use for: <, >, BETWEEN, ORDER BY

hash('Smith') → Bucket 47 → [Row pointers for 'Smith']

Fast O(1) lookup for exact matches
Not useful for range queries
```

### Bitmap Index

```
Bit vector for each distinct value
Good for: Low-cardinality columns (few distinct values)

Column: Status (3 values: Active, Inactive, Pending)

Row:      1 2 3 4 5 6 7 8
Active:   1 0 1 1 0 0 1 0
Inactive: 0 1 0 0 1 0 0 1
Pending:  0 0 0 0 0 1 0 0

WHERE Status = 'Active' → Use Active bitmap
WHERE Status IN ('Active', 'Pending') → OR bitmaps

Very space-efficient for low cardinality
Poor for high-cardinality or frequent updates
```

### Full-Text Index

```sql
-- For text searching
CREATE FULLTEXT INDEX idx_content ON Articles(Content);

-- Supports natural language queries
SELECT * FROM Articles
WHERE MATCH(Content) AGAINST('database optimization' IN NATURAL LANGUAGE MODE);

-- Handles: stemming, stopwords, relevance ranking
```

## Creating Indexes

### Basic Syntax

```sql
-- Single column index
CREATE INDEX idx_lastname ON Employees(LastName);

-- Unique index
CREATE UNIQUE INDEX idx_email ON Users(Email);

-- Composite index (multiple columns)
CREATE INDEX idx_name ON Employees(LastName, FirstName);

-- Drop index
DROP INDEX idx_lastname ON Employees;
```

### Index Options

```sql
-- PostgreSQL
CREATE INDEX idx_status ON Orders(Status)
WHERE Status = 'Pending';  -- Partial index

CREATE INDEX idx_name ON Employees(LastName)
INCLUDE (FirstName, Email);  -- Covering index

-- SQL Server
CREATE NONCLUSTERED INDEX idx_date ON Orders(OrderDate)
WITH (FILLFACTOR = 80);  -- Leave 20% space for inserts

-- MySQL
CREATE INDEX idx_name ON Employees(Name(10));  -- Prefix index
```

### Automatic Index Creation

```sql
-- PRIMARY KEY creates unique clustered index
CREATE TABLE Products (
    ProductID INT PRIMARY KEY,  -- Automatic index
    Name VARCHAR(100)
);

-- UNIQUE constraint creates unique index
ALTER TABLE Users ADD CONSTRAINT uq_email UNIQUE (Email);
-- Creates unique index automatically

-- FOREIGN KEY may create index (varies by DBMS)
ALTER TABLE Orders ADD FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID);
-- MySQL: Creates index automatically
-- PostgreSQL: Does not (manual creation recommended)
```

## Clustered vs Non-Clustered

### Clustered Index

```
Data rows physically stored in index order
Only one clustered index per table
Finding row by clustered key is fastest

CREATE CLUSTERED INDEX idx_id ON Orders(OrderID);

Table storage:
┌──────────────────────────────────────────┐
│ [OrderID=1] [OrderID=2] [OrderID=3] ...  │
│ (Rows stored in OrderID order)           │
└──────────────────────────────────────────┘

Benefits:
- Range scans on clustered key very fast
- Sequential reads
```

### Non-Clustered Index

```
Separate structure pointing to data rows
Multiple non-clustered indexes per table
Must follow pointer to get full row

CREATE NONCLUSTERED INDEX idx_customer ON Orders(CustomerID);

Index structure:
┌────────────────────────────┐
│ CustomerID | Row Pointer   │
│     1      |    → Row 47   │
│     1      |    → Row 123  │
│     2      |    → Row 89   │
└────────────────────────────┘

Each lookup requires:
1. Find in index
2. Follow pointer to heap/clustered index
```

### Comparison

```
                    | Clustered    | Non-Clustered
--------------------|--------------|---------------
Number per table    | 1            | Many
Data storage        | Sorted       | Separate
Range queries       | Excellent    | Good (requires lookups)
Point queries       | Good         | Good
Updates to key      | Expensive    | Moderate
```

## Index Selection Guidelines

### When to Create Indexes

```
Good candidates:
✓ Primary keys (automatic)
✓ Foreign keys (for joins)
✓ Frequently searched columns (WHERE)
✓ Join columns
✓ ORDER BY columns
✓ GROUP BY columns
✓ Columns with high selectivity

Poor candidates:
✗ Very small tables
✗ Columns rarely used in queries
✗ Columns with low selectivity (many duplicates)
✗ Frequently updated columns
✗ Very wide columns
```

### Selectivity Analysis

```sql
-- Check column selectivity
SELECT
    COUNT(DISTINCT Status) AS distinct_values,
    COUNT(*) AS total_rows,
    COUNT(DISTINCT Status) * 1.0 / COUNT(*) AS selectivity
FROM Orders;

-- High selectivity (close to 1): Good for index
-- Example: CustomerID with 100,000 customers / 1M orders = 0.1

-- Low selectivity (close to 0): Poor for index
-- Example: Status with 3 values / 1M orders = 0.000003
```

### Query Pattern Analysis

```sql
-- PostgreSQL: Find missing indexes
SELECT
    schemaname, tablename, attname,
    n_live_tup,
    seq_scan, idx_scan
FROM pg_stat_user_tables t
JOIN pg_stats s ON t.relname = s.tablename
WHERE seq_scan > idx_scan
  AND n_live_tup > 10000;
```

## Index Overhead

### Storage Cost

```sql
-- Check index sizes
-- PostgreSQL
SELECT
    indexname,
    pg_size_pretty(pg_relation_size(indexrelid)) AS size
FROM pg_stat_user_indexes
ORDER BY pg_relation_size(indexrelid) DESC;

-- SQL Server
SELECT
    i.name AS IndexName,
    SUM(ps.used_page_count) * 8 / 1024 AS IndexSizeMB
FROM sys.indexes i
JOIN sys.dm_db_partition_stats ps ON i.object_id = ps.object_id
GROUP BY i.name;
```

### Write Performance Impact

```
Each INSERT/UPDATE/DELETE must maintain all indexes

Without indexes:
  INSERT → Write 1 row to heap

With 5 indexes:
  INSERT → Write 1 row to heap
        → Update index 1 (B-tree rebalance?)
        → Update index 2
        → Update index 3
        → Update index 4
        → Update index 5

Rule of thumb:
- Each index adds ~10-30% overhead to writes
- Heavily indexed tables can be 5-10x slower to write
```

### Maintenance Requirements

```sql
-- Indexes fragment over time
-- Check fragmentation (SQL Server)
SELECT
    index_id,
    avg_fragmentation_in_percent
FROM sys.dm_db_index_physical_stats(DB_ID(), NULL, NULL, NULL, 'LIMITED');

-- Rebuild fragmented indexes
ALTER INDEX idx_name ON TableName REBUILD;

-- Or reorganize (less intrusive)
ALTER INDEX idx_name ON TableName REORGANIZE;

-- PostgreSQL: Reindex
REINDEX INDEX idx_name;

-- Vacuum and analyze
VACUUM ANALYZE table_name;
```

## Index Usage Verification

### Execution Plans

```sql
-- Check if query uses index
EXPLAIN SELECT * FROM Employees WHERE LastName = 'Smith';

-- Good: Index Seek / Index Scan
-- Bad: Table Scan / Seq Scan

-- PostgreSQL
EXPLAIN (ANALYZE, BUFFERS) SELECT ...;

-- MySQL
EXPLAIN SELECT ... \G

-- SQL Server
SET SHOWPLAN_ALL ON;
```

### Index Usage Statistics

```sql
-- PostgreSQL: Check index usage
SELECT
    indexrelname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;

-- Find unused indexes
SELECT indexrelname
FROM pg_stat_user_indexes
WHERE idx_scan = 0
  AND indexrelname NOT LIKE '%pkey%';
```

