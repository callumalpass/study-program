---
id: cs205-t6-maintenance
title: "Index Maintenance"
order: 5
---

# Index Maintenance

Indexes require ongoing maintenance to remain effective. Understanding maintenance operations and their impact is essential for database administration.

## Index Degradation

### Causes of Fragmentation

```
Internal Fragmentation:
- Pages not fully utilized
- Free space within pages

External Fragmentation:
- Pages not physically contiguous
- Logical order differs from physical order

Causes:
1. Random inserts (non-sequential keys)
2. Updates that change index key values
3. Deletes leaving gaps
4. Page splits during growth
```

### Fragmentation Impact

```
Fragmented Index Effects:
- More pages to read for range scans
- More random I/O (non-sequential pages)
- Larger index footprint
- Slower query performance

Example:
Sequential scan: Read pages 1, 2, 3, 4, 5
Fragmented scan: Read pages 1, 47, 12, 89, 3

Fragmented = more disk seeks = slower
```

### Measuring Fragmentation

```sql
-- SQL Server
SELECT
    OBJECT_NAME(ps.object_id) AS TableName,
    i.name AS IndexName,
    ps.index_type_desc,
    ps.avg_fragmentation_in_percent,
    ps.page_count,
    ps.avg_page_space_used_in_percent
FROM sys.dm_db_index_physical_stats(
    DB_ID(), NULL, NULL, NULL, 'DETAILED') ps
JOIN sys.indexes i
    ON ps.object_id = i.object_id
    AND ps.index_id = i.index_id
WHERE ps.page_count > 1000;

-- PostgreSQL (requires pgstattuple extension)
CREATE EXTENSION pgstattuple;
SELECT * FROM pgstattuple('index_name');
```

## Rebuild Operations

### Full Index Rebuild

```sql
-- SQL Server
ALTER INDEX idx_name ON TableName REBUILD;

-- With options
ALTER INDEX ALL ON TableName REBUILD
WITH (
    FILLFACTOR = 80,
    SORT_IN_TEMPDB = ON,
    ONLINE = ON  -- Enterprise only
);

-- PostgreSQL
REINDEX INDEX idx_name;

-- MySQL
ALTER TABLE TableName DROP INDEX idx_name,
                      ADD INDEX idx_name (columns);
-- Or
OPTIMIZE TABLE TableName;
```

### Online vs Offline Rebuild

```
Offline Rebuild:
- Table locked during operation
- Faster execution
- No concurrent access
- Use during maintenance windows

Online Rebuild:
- Table accessible during rebuild
- Slower execution
- Uses more resources (maintains both versions)
- Available in Enterprise editions

-- SQL Server Online Rebuild
ALTER INDEX idx_name ON TableName REBUILD WITH (ONLINE = ON);

-- PostgreSQL Concurrent Reindex
REINDEX INDEX CONCURRENTLY idx_name;
```

### Rebuild Best Practices

```
When to Rebuild:
- Fragmentation > 30%
- After bulk operations
- After major deletes
- Regular schedule (weekly/monthly)

Considerations:
- Schedule during low-activity periods
- Monitor tempdb/temp tablespace
- Consider online options for 24/7 systems
- Test impact on production-like data
```

## Reorganize Operations

### Reorganize vs Rebuild

```
Reorganize:
- Defragments leaf level only
- Online operation
- Less resource intensive
- For moderate fragmentation (10-30%)

Rebuild:
- Complete reconstruction
- May be offline
- More resource intensive
- For severe fragmentation (>30%)
```

### Reorganize Syntax

```sql
-- SQL Server
ALTER INDEX idx_name ON TableName REORGANIZE;

-- Reorganize all indexes on table
ALTER INDEX ALL ON TableName REORGANIZE;

-- With large object compaction
ALTER INDEX idx_name ON TableName REORGANIZE
WITH (LOB_COMPACTION = ON);

-- PostgreSQL: VACUUM for similar effect
VACUUM VERBOSE TableName;

-- Plus analyze for statistics
VACUUM ANALYZE TableName;
```

## Statistics Maintenance

### Why Statistics Matter

```
Query optimizer uses statistics to:
- Estimate row counts
- Choose join algorithms
- Select index usage
- Order operations

Stale statistics → Poor execution plans → Slow queries
```

### Updating Statistics

```sql
-- SQL Server
UPDATE STATISTICS TableName;
UPDATE STATISTICS TableName idx_name;

-- With full scan (more accurate)
UPDATE STATISTICS TableName WITH FULLSCAN;

-- With sample
UPDATE STATISTICS TableName WITH SAMPLE 50 PERCENT;

-- PostgreSQL
ANALYZE TableName;
ANALYZE TableName(ColumnName);

-- MySQL
ANALYZE TABLE TableName;
```

### Auto-Statistics

```sql
-- SQL Server: Auto-update enabled by default
ALTER DATABASE MyDB SET AUTO_UPDATE_STATISTICS ON;

-- PostgreSQL: autovacuum handles statistics
-- Configure in postgresql.conf
autovacuum = on
autovacuum_analyze_threshold = 50
autovacuum_analyze_scale_factor = 0.1

-- Check last analyze time
SELECT relname, last_analyze, last_autoanalyze
FROM pg_stat_user_tables;
```

## Automated Maintenance

### Maintenance Plans

```sql
-- SQL Server: Create maintenance job
-- Using TSQL (simplified)
DECLARE @sql NVARCHAR(MAX);

SELECT @sql = STRING_AGG(
    'ALTER INDEX ' + QUOTENAME(i.name) +
    ' ON ' + QUOTENAME(OBJECT_SCHEMA_NAME(i.object_id)) +
    '.' + QUOTENAME(OBJECT_NAME(i.object_id)) +
    CASE
        WHEN ps.avg_fragmentation_in_percent > 30 THEN ' REBUILD'
        WHEN ps.avg_fragmentation_in_percent > 10 THEN ' REORGANIZE'
        ELSE ''
    END, ';' + CHAR(13))
FROM sys.indexes i
JOIN sys.dm_db_index_physical_stats(DB_ID(), NULL, NULL, NULL, 'LIMITED') ps
    ON i.object_id = ps.object_id AND i.index_id = ps.index_id
WHERE ps.avg_fragmentation_in_percent > 10
  AND ps.page_count > 1000;

EXEC sp_executesql @sql;
```

### PostgreSQL Autovacuum

```
Autovacuum automatically:
1. Reclaims dead tuple space (VACUUM)
2. Updates statistics (ANALYZE)
3. Prevents transaction ID wraparound

Configuration:
autovacuum = on
autovacuum_vacuum_threshold = 50
autovacuum_vacuum_scale_factor = 0.2
autovacuum_analyze_threshold = 50
autovacuum_analyze_scale_factor = 0.1

Monitor autovacuum:
SELECT * FROM pg_stat_user_tables
ORDER BY n_dead_tup DESC;
```

### Scheduling Considerations

```
Maintenance Schedule Factors:
1. Database activity patterns
   - Low activity: Nightly/weekly
   - 24/7 systems: Rolling maintenance

2. Table characteristics
   - Large tables: Less frequent, longer jobs
   - Heavily modified: More frequent

3. Resource availability
   - Maintenance uses CPU, I/O, tempdb
   - Plan for resource contention

Sample Schedule:
Daily:    Update statistics on high-churn tables
Weekly:   Reorganize moderately fragmented indexes
Monthly:  Rebuild heavily fragmented indexes
Quarterly: Full index review and cleanup
```

## Index Monitoring

### Usage Monitoring

```sql
-- PostgreSQL: Index usage stats
SELECT
    relname AS table_name,
    indexrelname AS index_name,
    idx_scan AS times_used,
    pg_size_pretty(pg_relation_size(indexrelid)) AS index_size
FROM pg_stat_user_indexes
ORDER BY idx_scan;

-- SQL Server: Index usage stats
SELECT
    OBJECT_NAME(i.object_id) AS TableName,
    i.name AS IndexName,
    us.user_seeks,
    us.user_scans,
    us.user_lookups,
    us.user_updates
FROM sys.indexes i
JOIN sys.dm_db_index_usage_stats us
    ON i.object_id = us.object_id
    AND i.index_id = us.index_id
WHERE us.database_id = DB_ID()
ORDER BY us.user_seeks + us.user_scans DESC;
```

### Identifying Unused Indexes

```sql
-- PostgreSQL: Unused indexes
SELECT
    indexrelname,
    idx_scan,
    pg_size_pretty(pg_relation_size(indexrelid)) AS size
FROM pg_stat_user_indexes
WHERE idx_scan = 0
  AND indexrelname NOT LIKE '%pkey%'
ORDER BY pg_relation_size(indexrelid) DESC;

-- SQL Server: Unused indexes
SELECT
    OBJECT_NAME(i.object_id) AS TableName,
    i.name AS IndexName,
    us.user_seeks + us.user_scans + us.user_lookups AS Reads,
    us.user_updates AS Writes
FROM sys.indexes i
LEFT JOIN sys.dm_db_index_usage_stats us
    ON i.object_id = us.object_id
    AND i.index_id = us.index_id
    AND us.database_id = DB_ID()
WHERE i.type > 0  -- Not heap
  AND ISNULL(us.user_seeks + us.user_scans + us.user_lookups, 0) = 0
  AND ISNULL(us.user_updates, 0) > 1000;
```

### Duplicate Index Detection

```sql
-- PostgreSQL: Find duplicate indexes
SELECT
    a.indexrelid::regclass AS index1,
    b.indexrelid::regclass AS index2,
    pg_size_pretty(pg_relation_size(a.indexrelid)) AS size
FROM pg_index a
JOIN pg_index b ON (
    a.indrelid = b.indrelid
    AND a.indexrelid > b.indexrelid
    AND a.indkey = b.indkey
);

-- SQL Server: Duplicate indexes
SELECT
    OBJECT_NAME(i1.object_id) AS TableName,
    i1.name AS Index1,
    i2.name AS Index2
FROM sys.indexes i1
JOIN sys.indexes i2
    ON i1.object_id = i2.object_id
    AND i1.index_id < i2.index_id
JOIN sys.index_columns ic1
    ON i1.object_id = ic1.object_id
    AND i1.index_id = ic1.index_id
JOIN sys.index_columns ic2
    ON i2.object_id = ic2.object_id
    AND i2.index_id = ic2.index_id
    AND ic1.column_id = ic2.column_id
    AND ic1.key_ordinal = ic2.key_ordinal
GROUP BY i1.object_id, i1.name, i2.name
HAVING COUNT(*) = (SELECT COUNT(*) FROM sys.index_columns WHERE object_id = i1.object_id AND index_id = i1.index_id);
```

## Maintenance Checklist

```
Regular Index Maintenance:

□ Monitor fragmentation levels
□ Rebuild/reorganize fragmented indexes
□ Update statistics after data changes
□ Review unused indexes for removal
□ Check for duplicate indexes
□ Monitor index size growth
□ Verify maintenance jobs completing
□ Review execution plans periodically
□ Document index changes
□ Test maintenance impact before production
```

