---
id: cs205-t7-tuning
title: "Performance Tuning"
order: 5
---

# Performance Tuning

Database performance tuning combines query optimization, schema design, and system configuration. A systematic approach identifies and resolves bottlenecks effectively.

## Performance Tuning Process

### Systematic Approach

```
1. Measure baseline performance
2. Identify bottlenecks
3. Analyze root causes
4. Implement changes
5. Verify improvements
6. Document and monitor

Don't guess—measure!
```

### Performance Metrics

```
Key metrics to track:
- Query response time (latency)
- Queries per second (throughput)
- Resource utilization (CPU, I/O, memory)
- Wait statistics
- Lock contention
- Cache hit ratios

Tools:
- EXPLAIN ANALYZE
- pg_stat_statements
- sys.dm_exec_query_stats
- Performance Schema (MySQL)
```

## Query-Level Tuning

### Identify Slow Queries

```sql
-- PostgreSQL: Top queries by total time
SELECT
    substring(query, 1, 50) AS query_snippet,
    calls,
    round(total_exec_time::numeric, 2) AS total_ms,
    round(mean_exec_time::numeric, 2) AS avg_ms,
    rows
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 10;

-- MySQL: Enable slow query log
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;

-- SQL Server: Query store
SELECT TOP 10
    q.query_id,
    qt.query_sql_text,
    rs.avg_duration / 1000 AS avg_duration_ms,
    rs.count_executions
FROM sys.query_store_query q
JOIN sys.query_store_query_text qt ON q.query_text_id = qt.query_text_id
JOIN sys.query_store_plan p ON q.query_id = p.query_id
JOIN sys.query_store_runtime_stats rs ON p.plan_id = rs.plan_id
ORDER BY rs.avg_duration DESC;
```

### Analyze Execution Plan

```sql
-- Check for common issues
EXPLAIN (ANALYZE, BUFFERS) SELECT ...;

Red flags to look for:
- Seq Scan on large tables (missing index?)
- High actual vs estimated rows (stale stats?)
- Nested Loop with large inner (wrong join type?)
- Sort with disk spill (increase work_mem?)
- Hash batch disk spill (increase work_mem?)
```

### Query Optimization Checklist

```
□ Index exists for WHERE columns
□ Index exists for JOIN columns
□ Statistics are current
□ Covering index possible
□ Subqueries can be unnested
□ Functions not blocking index use
□ Proper data types used
□ N+1 query pattern avoided
□ LIMIT used when applicable
□ Unnecessary columns not selected
```

## Index Tuning

### Index Analysis

```sql
-- Find missing indexes (SQL Server)
SELECT
    mid.statement AS table_name,
    mid.equality_columns,
    mid.inequality_columns,
    mid.included_columns,
    migs.avg_user_impact
FROM sys.dm_db_missing_index_details mid
JOIN sys.dm_db_missing_index_groups mig ON mid.index_handle = mig.index_handle
JOIN sys.dm_db_missing_index_group_stats migs ON mig.index_group_handle = migs.group_handle
WHERE migs.avg_user_impact > 80
ORDER BY migs.avg_user_impact DESC;

-- Find unused indexes (PostgreSQL)
SELECT
    schemaname || '.' || relname AS table,
    indexrelname AS index,
    pg_size_pretty(pg_relation_size(indexrelid)) AS size,
    idx_scan AS times_used
FROM pg_stat_user_indexes
WHERE idx_scan = 0
ORDER BY pg_relation_size(indexrelid) DESC;
```

### Index Strategy

```
1. Primary key: Clustered/unique index (automatic)

2. Foreign keys: Always index for join performance

3. WHERE columns:
   - High selectivity → B-tree index
   - Low selectivity → Consider partial index

4. ORDER BY columns:
   - Match index order to avoid sorts

5. Composite indexes:
   - Most selective column first
   - Or leftmost column most queried

6. Remove:
   - Unused indexes (waste write resources)
   - Duplicate indexes
   - Redundant indexes (A,B covers A)
```

## Memory Configuration

### Buffer Pool / Shared Buffers

```sql
-- PostgreSQL
shared_buffers = '4GB'  -- 25% of RAM typical
effective_cache_size = '12GB'  -- 75% of RAM

-- MySQL
innodb_buffer_pool_size = 12G  -- 70-80% of RAM

-- Check buffer cache hit ratio
-- PostgreSQL
SELECT
    sum(heap_blks_hit) / (sum(heap_blks_hit) + sum(heap_blks_read)) AS ratio
FROM pg_statio_user_tables;
-- Should be > 0.99 for OLTP
```

### Work Memory

```sql
-- PostgreSQL: Memory for sorts, hashes
SET work_mem = '256MB';  -- Per operation!

-- Careful: 100 concurrent queries × 256MB = 25GB

-- Check for disk spills
EXPLAIN (ANALYZE, BUFFERS) SELECT ...;
-- Look for: Sort Method: external merge  Disk: 50000kB
-- Increase work_mem if seeing disk spills
```

### Connection Pool Sizing

```
Too few connections: Requests queue, latency increases
Too many connections: Context switching, memory pressure

Formula (PostgreSQL):
max_connections = (core_count * 2) + effective_spindle_count

For SSD systems: Often 100-200 connections sufficient
Use connection pooler (PgBouncer, ProxySQL) for more
```

## I/O Optimization

### Disk Layout

```
Separate physical drives for:
- Data files
- Transaction log / WAL
- Temp tablespace
- Backups

Benefits:
- Parallel I/O
- Isolation of workloads
- Predictable performance
```

### Sequential vs Random I/O

```
Sequential I/O: Reading consecutive blocks
- Table scans, large result sets
- HDDs: 100-200 MB/s
- SSDs: 500+ MB/s

Random I/O: Reading scattered blocks
- Index lookups, OLTP workloads
- HDDs: 100-200 IOPS
- SSDs: 10,000+ IOPS

Optimization:
- Use SSD for random workloads
- Batch random operations (bitmap scans)
- Increase buffer pool for frequently accessed data
```

### Read-Ahead and Caching

```sql
-- PostgreSQL: Sequential scan optimization
SET effective_io_concurrency = 200;  -- For SSDs

-- OS-level: Read-ahead
echo 256 > /sys/block/sda/queue/read_ahead_kb

-- Database caching strategy
-- Hot data in buffer pool
-- Warm data in OS cache
-- Cold data on disk
```

## Concurrency Tuning

### Lock Analysis

```sql
-- PostgreSQL: View current locks
SELECT
    pg_stat_activity.pid,
    pg_stat_activity.query,
    pg_locks.mode,
    pg_locks.granted
FROM pg_locks
JOIN pg_stat_activity ON pg_locks.pid = pg_stat_activity.pid
WHERE NOT pg_locks.granted;

-- MySQL: InnoDB locks
SELECT * FROM performance_schema.data_locks;

-- SQL Server: Blocking queries
SELECT
    blocking_session_id,
    session_id,
    wait_type,
    wait_time
FROM sys.dm_exec_requests
WHERE blocking_session_id != 0;
```

### Reducing Contention

```
1. Shorten transaction duration
   - Do calculations outside transaction
   - Batch operations appropriately

2. Access resources in consistent order
   - Prevents deadlocks
   - Document ordering conventions

3. Use appropriate isolation level
   - READ COMMITTED for most OLTP
   - SERIALIZABLE only when needed

4. Consider optimistic locking
   - For read-mostly workloads
   - Retry on conflict
```

## Monitoring and Alerting

### Key Dashboards

```sql
-- Connection monitoring
SELECT count(*), state FROM pg_stat_activity GROUP BY state;

-- Cache hit ratio
SELECT
    'index' AS type,
    sum(idx_blks_hit) / nullif(sum(idx_blks_hit + idx_blks_read), 0) AS ratio
FROM pg_statio_user_indexes
UNION ALL
SELECT
    'table',
    sum(heap_blks_hit) / nullif(sum(heap_blks_hit + heap_blks_read), 0)
FROM pg_statio_user_tables;

-- Wait events
SELECT wait_event_type, wait_event, count(*)
FROM pg_stat_activity
WHERE state = 'active'
GROUP BY 1, 2
ORDER BY 3 DESC;
```

### Alert Thresholds

```
Typical alert thresholds:

Query response time > 5 seconds
CPU utilization > 80% sustained
Memory utilization > 90%
Disk I/O latency > 20ms
Connection count > 80% of max
Replication lag > 1 minute
Lock wait time > 30 seconds
Cache hit ratio < 95%
```

## Performance Tuning Patterns

### Read-Heavy Optimization

```
For OLAP/Reporting workloads:
- Add read replicas
- Materialized views for complex queries
- Columnar storage for analytics
- Relaxed isolation level
- Batch queries to reduce connections
```

### Write-Heavy Optimization

```
For OLTP workloads:
- Minimize indexes (each adds write overhead)
- Batch inserts (bulk operations)
- Asynchronous commits (if durability allows)
- Partition large tables
- Archive historical data
```

### Mixed Workload

```
Separate read and write paths:
- Primary for writes
- Replicas for reads
- Different connection pools
- Query routing based on type

Or time-based separation:
- OLTP during business hours
- Reporting during off-hours
- Maintenance windows overnight
```

## Troubleshooting Checklist

```
When performance degrades:

□ Check for blocking queries
□ Review recent schema changes
□ Verify statistics are current
□ Check disk space and I/O
□ Monitor memory pressure
□ Review recent code deployments
□ Check for data growth
□ Verify backup jobs not interfering
□ Review execution plans for regression
□ Check for parameter sniffing issues
```

