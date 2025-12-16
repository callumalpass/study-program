# Index Design Strategies

Effective index design balances query performance against maintenance overhead. This guide provides systematic approaches for analyzing query workloads, designing optimal index configurations, and managing indexes throughout the application lifecycle.

## Workload Analysis

### Identifying Index Candidates

Before creating indexes, understand your workload:

**Query Pattern Analysis**:
```sql
-- PostgreSQL: Find most expensive queries
SELECT
    calls,
    total_time / 1000 AS total_seconds,
    mean_time AS avg_ms,
    query
FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 20;

-- Find queries causing sequential scans on large tables
SELECT
    relname AS table_name,
    seq_scan AS sequential_scans,
    seq_tup_read AS rows_scanned,
    idx_scan AS index_scans
FROM pg_stat_user_tables
WHERE seq_scan > 0
ORDER BY seq_tup_read DESC;
```

**Capture Query Patterns**:
```
High-Value Index Candidates:
1. WHERE clauses with equality conditions
2. JOIN conditions
3. ORDER BY columns (especially with LIMIT)
4. GROUP BY columns
5. Columns in frequently-run queries
```

### Query Frequency and Impact

Prioritize indexes based on query importance:

| Query Type | Frequency | Impact | Index Priority |
|------------|-----------|--------|----------------|
| User login | 1000/min | High | Critical |
| Dashboard load | 500/min | High | Critical |
| Search | 100/min | Medium | High |
| Admin report | 10/day | Low | Medium |
| Yearly audit | 1/year | Low | Low |

## Index Design Principles

### The Equality-Range-Sort-Project Rule

Order index columns by:
1. **Equality** columns first (WHERE col = value)
2. **Range** columns second (WHERE col > value)
3. **Sort** columns third (ORDER BY col)
4. **Project** columns last (SELECT col - for covering)

```sql
-- Query:
SELECT name, email
FROM users
WHERE department = 'Engineering'   -- Equality
  AND hire_date > '2020-01-01'     -- Range
ORDER BY salary DESC;              -- Sort

-- Optimal index:
CREATE INDEX idx_users_optimal
ON users (department, hire_date, salary)
INCLUDE (name, email);
```

### Selectivity Considerations

High-selectivity columns (many distinct values) benefit more from indexing:

```sql
-- Check selectivity
SELECT
    attname AS column_name,
    n_distinct,
    most_common_vals,
    most_common_freqs
FROM pg_stats
WHERE tablename = 'orders';

-- High selectivity: customer_id (many unique values) - Good index candidate
-- Low selectivity: status (few values like 'Pending', 'Complete') - Poor alone
```

**Composite Index Strategy**:
```sql
-- Low selectivity column alone: sequential scan likely
CREATE INDEX idx_orders_status ON orders (status);  -- Often not useful

-- Combined with high-selectivity: useful
CREATE INDEX idx_orders_customer_status ON orders (customer_id, status);
```

### Index Consolidation

Fewer broader indexes often beat many narrow indexes:

```sql
-- Instead of:
CREATE INDEX idx_orders_customer ON orders (customer_id);
CREATE INDEX idx_orders_customer_date ON orders (customer_id, order_date);
CREATE INDEX idx_orders_customer_status ON orders (customer_id, status);

-- Consider:
CREATE INDEX idx_orders_customer_date_status
ON orders (customer_id, order_date, status);

-- This single index can support:
-- WHERE customer_id = ?
-- WHERE customer_id = ? AND order_date > ?
-- WHERE customer_id = ? AND order_date > ? AND status = ?
```

## Common Design Patterns

### Lookup Table Pattern

For reference tables with frequent lookups:

```sql
-- Status codes, categories, types
CREATE TABLE order_statuses (
    status_id SERIAL PRIMARY KEY,
    status_code VARCHAR(20) UNIQUE,
    description TEXT
);

-- Index for both lookup directions
-- Primary key (status_id) already indexed
CREATE INDEX idx_statuses_code ON order_statuses (status_code);
```

### Foreign Key Pattern

Always index foreign key columns:

```sql
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(customer_id),
    product_id INTEGER REFERENCES products(product_id)
);

-- Essential for JOIN performance and referential integrity checks
CREATE INDEX idx_orders_customer ON orders (customer_id);
CREATE INDEX idx_orders_product ON orders (product_id);
```

### Time-Series Pattern

Optimize for time-based queries:

```sql
CREATE TABLE events (
    event_id BIGSERIAL PRIMARY KEY,
    user_id INTEGER,
    event_type VARCHAR(50),
    event_data JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Primary time-based access
CREATE INDEX idx_events_time ON events (created_at DESC);

-- User activity over time
CREATE INDEX idx_events_user_time ON events (user_id, created_at DESC);

-- Event type analysis
CREATE INDEX idx_events_type_time ON events (event_type, created_at DESC)
WHERE event_type IN ('purchase', 'signup', 'upgrade');
```

### Search Pattern

Optimize for filtering and sorting:

```sql
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(200),
    category_id INTEGER,
    price DECIMAL(10,2),
    rating DECIMAL(2,1),
    created_at TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- Category browsing with price sort
CREATE INDEX idx_products_category_price
ON products (category_id, price)
WHERE is_active = true;

-- Top-rated products
CREATE INDEX idx_products_rating
ON products (rating DESC, created_at DESC)
WHERE is_active = true AND rating >= 4.0;

-- Price range search within category
CREATE INDEX idx_products_category_price_rating
ON products (category_id, price, rating DESC)
WHERE is_active = true;
```

## Index Impact Assessment

### Before Creating Indexes

Estimate the impact:

```sql
-- Check table size and row count
SELECT
    relname AS table_name,
    pg_size_pretty(pg_relation_size(relid)) AS table_size,
    n_live_tup AS row_count
FROM pg_stat_user_tables
WHERE relname = 'orders';

-- Estimate index size (rough: 10-30% of indexed columns)
-- Index on INTEGER: ~24 bytes per row (8 byte tuple header + 8 byte key + 8 byte pointer)
-- 1M rows × 24 bytes ≈ 24 MB
```

### After Creating Indexes

Validate effectiveness:

```sql
-- Check if index is being used
SELECT
    indexrelname AS index_name,
    idx_scan AS times_used,
    idx_tup_read AS tuples_returned,
    idx_tup_fetch AS tuples_fetched
FROM pg_stat_user_indexes
WHERE relname = 'orders';

-- Compare query plans
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM orders
WHERE customer_id = 123 AND order_date > '2024-01-01';
```

## Maintenance Strategies

### Index Health Monitoring

```sql
-- Check index bloat (PostgreSQL)
SELECT
    schemaname,
    tablename,
    indexname,
    pg_size_pretty(pg_relation_size(indexrelid)) AS index_size,
    idx_scan AS scans
FROM pg_stat_user_indexes
ORDER BY pg_relation_size(indexrelid) DESC;

-- Find unused indexes
SELECT
    schemaname || '.' || relname AS table,
    indexrelname AS index,
    pg_size_pretty(pg_relation_size(i.indexrelid)) AS index_size,
    idx_scan AS times_used
FROM pg_stat_user_indexes ui
JOIN pg_index i ON ui.indexrelid = i.indexrelid
WHERE NOT i.indisunique  -- Exclude unique constraints
  AND idx_scan < 50      -- Used fewer than 50 times
ORDER BY pg_relation_size(i.indexrelid) DESC;
```

### Rebuild Strategy

Schedule maintenance based on table volatility:

```sql
-- PostgreSQL: REINDEX
REINDEX INDEX idx_orders_customer;

-- Concurrent rebuild (no blocking)
REINDEX INDEX CONCURRENTLY idx_orders_customer;

-- MySQL: Optimize table (rebuilds all indexes)
OPTIMIZE TABLE orders;

-- SQL Server: Reorganize (light) vs Rebuild (heavy)
ALTER INDEX idx_orders_customer ON orders REORGANIZE;
ALTER INDEX idx_orders_customer ON orders REBUILD;
```

### Automated Maintenance Schedule

```
Index Maintenance Schedule:
┌─────────────────┬────────────────────┬───────────────┐
│ Table Type      │ Maintenance Action │ Frequency     │
├─────────────────┼────────────────────┼───────────────┤
│ High-volume     │ Reorganize         │ Daily         │
│ OLTP            │ Rebuild            │ Weekly        │
├─────────────────┼────────────────────┼───────────────┤
│ Medium-volume   │ Reorganize         │ Weekly        │
│                 │ Rebuild            │ Monthly       │
├─────────────────┼────────────────────┼───────────────┤
│ Low-volume      │ Reorganize         │ Monthly       │
│ Reference       │ Rebuild            │ Quarterly     │
└─────────────────┴────────────────────┴───────────────┘
```

## Anti-Patterns to Avoid

### Over-Indexing

**Problem**: Too many indexes slow writes and waste space
```sql
-- Anti-pattern: Index every column
CREATE INDEX idx_users_name ON users (name);
CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_users_phone ON users (phone);
CREATE INDEX idx_users_address ON users (address);
CREATE INDEX idx_users_created ON users (created_at);
-- ... continues for every column
```

**Solution**: Create indexes based on actual query patterns, remove unused indexes.

### Duplicate Indexes

**Problem**: Redundant indexes from overlapping prefixes
```sql
-- Redundant:
CREATE INDEX idx1 ON orders (customer_id);
CREATE INDEX idx2 ON orders (customer_id, order_date);
-- idx2 can serve queries that idx1 serves
```

**Solution**: Remove the narrower index.

### Wrong Column Order

**Problem**: Column order doesn't match query patterns
```sql
-- Query pattern:
WHERE order_date > '2024-01-01' AND customer_id = 123

-- Wrong order (range column first):
CREATE INDEX idx_wrong ON orders (order_date, customer_id);

-- Correct order (equality first):
CREATE INDEX idx_correct ON orders (customer_id, order_date);
```

### Indexing Low-Selectivity Columns Alone

**Problem**: Index on column with few distinct values
```sql
-- Boolean or status column alone:
CREATE INDEX idx_active ON users (is_active);
-- When 90% of users are active, this rarely helps
```

**Solution**: Combine with higher-selectivity columns or use partial index.

## Documentation and Governance

### Index Documentation

Maintain index documentation:

```sql
-- PostgreSQL: Add comments
COMMENT ON INDEX idx_orders_customer IS
    'Supports: customer order history queries, FK lookups
     Created: 2024-01-15
     Query: SELECT * FROM orders WHERE customer_id = ?';
```

### Index Change Control

Before modifying production indexes:
1. Test on representative data
2. Measure query performance before/after
3. Schedule during low-traffic periods
4. Monitor after deployment
5. Have rollback plan ready

Systematic index design ensures databases perform well under real-world workloads while avoiding the pitfalls of over-indexing and poor maintenance.
