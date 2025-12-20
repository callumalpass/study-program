# Execution Plans

Execution plans reveal how the database executes queries. Reading and understanding plans is essential for performance troubleshooting.

## Viewing Execution Plans

### EXPLAIN Command

```sql
-- Basic plan (no execution)
EXPLAIN SELECT * FROM Orders WHERE CustomerID = 123;

-- Plan with execution statistics
EXPLAIN ANALYZE SELECT * FROM Orders WHERE CustomerID = 123;

-- PostgreSQL: Detailed output
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT * FROM Orders WHERE CustomerID = 123;

-- MySQL
EXPLAIN SELECT * FROM Orders WHERE CustomerID = 123;
EXPLAIN FORMAT=JSON SELECT ...;

-- SQL Server
SET SHOWPLAN_TEXT ON;
-- or graphical plan in SSMS
```

### Plan Output Formats

```sql
-- PostgreSQL text format
EXPLAIN SELECT * FROM Employees WHERE DeptID = 10;

Seq Scan on employees  (cost=0.00..12.50 rows=5 width=44)
  Filter: (deptid = 10)

-- JSON format (more detail)
EXPLAIN (FORMAT JSON) SELECT ...;

-- XML format
EXPLAIN (FORMAT XML) SELECT ...;
```

## Reading Plan Components

### Cost Estimates

```
Seq Scan on orders  (cost=0.00..1250.00 rows=50000 width=100)
                         │        │        │        │
                   startup cost    │    estimated    │
                              total cost    rows    row width

startup cost: Time before first row returned
total cost: Time for all rows (in arbitrary units)
rows: Estimated row count
width: Average row size in bytes
```

### Actual vs Estimated

```sql
EXPLAIN ANALYZE SELECT * FROM Orders WHERE Status = 'Pending';

Seq Scan on orders  (cost=0.00..1250.00 rows=50 width=100)
                    (actual time=0.015..15.234 rows=4823 loops=1)
                              │          │        │        │
                         first row   total time  actual  iterations
                            time                  rows

-- rows=50 estimated vs rows=4823 actual
-- Significant misestimate! Statistics may be stale
```

### Plan Node Types

```
Common Scan Nodes:
- Seq Scan: Sequential table scan
- Index Scan: Index lookup + table fetch
- Index Only Scan: Index-only (covering)
- Bitmap Index Scan: Build row bitmap from index
- Bitmap Heap Scan: Fetch rows from bitmap

Common Join Nodes:
- Nested Loop: For each outer row, scan inner
- Hash Join: Build hash table, probe
- Merge Join: Merge sorted inputs

Other Nodes:
- Sort: External/in-memory sort
- Aggregate: Grouping/aggregation
- Limit: Row count limit
- Gather: Parallel worker collection
```

## Plan Analysis

### Sequential Scan Analysis

```sql
EXPLAIN ANALYZE SELECT * FROM Orders WHERE Total > 1000;

Seq Scan on orders  (cost=0.00..22500.00 rows=75000 width=100)
                    (actual time=0.020..145.234 rows=78234 loops=1)
  Filter: (total > 1000)
  Rows Removed by Filter: 921766

-- Questions to ask:
-- 1. Is there an index on Total? Should there be?
-- 2. How many rows match? (78234/1000000 = 7.8%)
-- 3. At 7.8% selectivity, index might help
```

### Index Scan Analysis

```sql
EXPLAIN ANALYZE SELECT * FROM Orders WHERE CustomerID = 123;

Index Scan using idx_customer on orders
    (cost=0.43..8.45 rows=1 width=100)
    (actual time=0.025..0.030 rows=5 loops=1)
  Index Cond: (customerid = 123)

-- Very efficient:
-- - Low cost (8.45 vs potentially thousands)
-- - Index condition pushed down
-- - Few rows returned
```

### Join Analysis

```sql
EXPLAIN ANALYZE
SELECT c.Name, o.OrderDate
FROM Customers c
JOIN Orders o ON c.CustomerID = o.CustomerID;

Hash Join  (cost=14.00..2500.00 rows=100000 width=50)
           (actual time=1.234..89.456 rows=100000 loops=1)
  Hash Cond: (o.customerid = c.customerid)
  -> Seq Scan on orders o
       (cost=0.00..2000.00 rows=100000 width=16)
       (actual time=0.010..25.000 rows=100000 loops=1)
  -> Hash
       (cost=10.00..10.00 rows=400 width=42)
       (actual time=0.500..0.500 rows=400 loops=1)
     -> Seq Scan on customers c
          (cost=0.00..10.00 rows=400 width=42)
          (actual time=0.005..0.200 rows=400 loops=1)
```

**Visualized as a tree**:

```mermaid
graph TD
    Root["Hash Join<br/>cost=14..2500<br/>rows=100000"]

    Root --> Orders["Seq Scan on orders<br/>cost=0..2000<br/>rows=100000"]

    Root --> Hash["Hash<br/>cost=10..10<br/>rows=400"]

    Hash --> Customers["Seq Scan on customers<br/>cost=0..10<br/>rows=400"]

    style Root fill:#ffe8e8
    style Hash fill:#fff4e1
    style Orders fill:#e1f5ff
    style Customers fill:#e1f5ff
```

**Reading the tree**:
1. Start at bottom: Scan customers (400 rows) and orders (100,000 rows)
2. Build hash table from customers (smaller table)
3. Probe hash table with orders
4. Result: 100,000 matched rows

## Common Plan Patterns

### Good Patterns

**Index Seek + Key Lookup**:

```mermaid
graph TD
    Result["Return rows"] --> IndexScan["Index Scan using idx_customer<br/>Index Cond: customerid = 123"]

    style Result fill:#e8f5e9
    style IndexScan fill:#e1f5ff
```

**Index Only Scan (covering index)**:

```mermaid
graph TD
    Result["Return rows"] --> IndexOnly["Index Only Scan<br/>using idx_covering<br/>Index Cond: status = 'Pending'<br/>✓ No table access needed"]

    style Result fill:#e8f5e9
    style IndexOnly fill:#e1f5ff
```

**Efficient Hash Join**:

```mermaid
graph TD
    Join["Hash Join"] --> Small["Index Scan<br/>(small table builds hash)"]
    Join --> Large["Seq Scan<br/>(large table probes)"]

    style Join fill:#e8f5e9
    style Small fill:#e1f5ff
    style Large fill:#fff4e1
```

### Warning Patterns

**Filter after Seq Scan** (missing index?):

```mermaid
graph TD
    Result["Return 1000 rows"] --> Filter["Filter: status = 'Active'<br/>⚠ Rows Removed: 999000"]
    Filter --> Scan["Seq Scan on large_table<br/>⚠ 1000000 rows scanned"]

    style Result fill:#e8f5e9
    style Filter fill:#ffe8e8
    style Scan fill:#ffe8e8
```

**Nested Loop with large inner** (inefficient):

```mermaid
graph TD
    Loop["Nested Loop<br/>⚠ rows=1000000"] --> Outer["Seq Scan on outer_table<br/>rows=10000"]
    Loop --> Inner["Seq Scan on inner_table<br/>⚠ rows=100<br/>⚠ Executed 10000 times!"]

    style Loop fill:#ffe8e8
    style Outer fill:#fff4e1
    style Inner fill:#ffe8e8
```

**Sort on large dataset** (memory spill):

```mermaid
graph TD
    Result["Return sorted rows"] --> Sort["Sort<br/>⚠ external merge<br/>⚠ Disk: 50000kB<br/>⚠ Spilled to disk!"]
    Sort --> Scan["Seq Scan"]

    style Result fill:#e8f5e9
    style Sort fill:#ffe8e8
    style Scan fill:#fff4e1
```

### Performance Red Flags

**Watch for these warning signs**:

```mermaid
graph TD
    subgraph "Red Flags"
        RF1["1. Large estimate mismatch<br/>estimated=100, actual=50000<br/>→ Update statistics!"]
        RF2["2. Unexpected Seq Scans<br/>→ Missing index?"]
        RF3["3. High loops count<br/>→ Change join algorithm"]
        RF4["4. Disk sorts<br/>→ Increase work_mem"]
        RF5["5. Many bitmap rechecks<br/>→ Index not selective"]
    end

    style RF1 fill:#ffe8e8
    style RF2 fill:#ffe8e8
    style RF3 fill:#ffe8e8
    style RF4 fill:#ffe8e8
    style RF5 fill:#ffe8e8
```

**Common issues and solutions**:

| **Issue** | **Symptom** | **Solution** |
|-----------|-------------|--------------|
| Stale statistics | Estimate mismatch | Run `ANALYZE` |
| Missing index | Seq Scan on large table | Create appropriate index |
| Wrong join type | Nested loop with large inner | Force hash/merge join |
| Memory pressure | External sort | Increase `work_mem` |
| Non-selective index | Bitmap recheck | Consider composite index |

## EXPLAIN Options

### PostgreSQL Options

```sql
-- ANALYZE: Actually execute query
EXPLAIN ANALYZE SELECT ...;

-- BUFFERS: Show buffer cache hits/misses
EXPLAIN (ANALYZE, BUFFERS) SELECT ...;
-- Output: Buffers: shared hit=100 read=50

-- TIMING: Include timing (default with ANALYZE)
EXPLAIN (ANALYZE, TIMING OFF) SELECT ...;

-- VERBOSE: Show output columns, table aliases
EXPLAIN VERBOSE SELECT ...;

-- COSTS: Show cost estimates (default ON)
EXPLAIN (COSTS OFF) SELECT ...;

-- SETTINGS: Show non-default settings
EXPLAIN (SETTINGS) SELECT ...;
```

### MySQL Options

```sql
-- Basic explain
EXPLAIN SELECT ...;

-- Extended information
EXPLAIN EXTENDED SELECT ...;

-- JSON format (more detail)
EXPLAIN FORMAT=JSON SELECT ...;

-- Analyze (MySQL 8.0+)
EXPLAIN ANALYZE SELECT ...;
```

### SQL Server Options

```sql
-- Estimated plan (no execution)
SET SHOWPLAN_TEXT ON;
SET SHOWPLAN_ALL ON;
SET SHOWPLAN_XML ON;

-- Actual plan (with execution)
SET STATISTICS PROFILE ON;
SET STATISTICS XML ON;

-- Live query statistics
-- Available in SSMS
```

## Plan Caching

### Query Plan Cache

```sql
-- PostgreSQL: View cached plans
SELECT * FROM pg_prepared_statements;

-- SQL Server: View plan cache
SELECT
    cp.plan_handle,
    st.text AS query_text,
    cp.usecounts,
    cp.size_in_bytes
FROM sys.dm_exec_cached_plans cp
CROSS APPLY sys.dm_exec_sql_text(cp.plan_handle) st;
```

### Parameter Sniffing

```sql
-- Problem: Plan optimized for first parameter value

-- First call: CustomerID = 1 (1000 orders)
-- Plan chosen: Hash Join

-- Later call: CustomerID = 999999 (5 orders)
-- Same plan used: Hash Join (overkill!)

-- Solutions:
-- 1. OPTION (RECOMPILE)
SELECT * FROM Orders WHERE CustomerID = @id OPTION (RECOMPILE);

-- 2. OPTIMIZE FOR hint
SELECT * FROM Orders WHERE CustomerID = @id
OPTION (OPTIMIZE FOR (@id = 1));

-- 3. Plan guides
```

## Practical Plan Reading

### Step-by-Step Analysis

**How to read execution plan trees**:
1. Start from bottom (data sources)
2. Move up through transformations
3. Note row count changes at each step
4. Check estimated vs actual

**Example analysis**:

```mermaid
graph TD
    L["Limit<br/>rows=10<br/>✓ Final result"] --> S["Sort<br/>rows=4823<br/>? In memory?"]
    S --> J["Hash Join<br/>rows=4823<br/>Many rows joined"]
    J --> C["Seq Scan customers<br/>rows=1000<br/>? OK for small table"]
    J --> O["Index Scan orders<br/>rows=4823<br/>✓ Index used"]

    style L fill:#e8f5e9
    style S fill:#fff4e1
    style J fill:#fff4e1
    style C fill:#ffe8e8
    style O fill:#e1f5ff
```

**Questions to ask**:
- Why seq scan on customers? → Probably OK, small table (1000 rows)
- Is 4823 orders expected? → Check estimate vs actual
- Sort on 4823 rows → In memory or spilled to disk?
- Could we add `ORDER BY` to index to avoid sort?

### Documentation Template

```
Query: [Description]
Execution Time: X ms
Rows Returned: Y

Plan Summary:
- Primary access path: [Index/Seq scan on table]
- Join type: [Hash/Nested/Merge]
- Major operations: [Sort, Aggregate, etc.]

Bottlenecks Identified:
- [Description of slow operations]

Recommendations:
- [Index suggestions]
- [Query rewrites]
- [Configuration changes]
```

