# Specialized Index Types

While B-tree indexes handle most indexing needs, specialized index types offer superior performance for specific data types and query patterns. Understanding when to use these alternatives enables you to optimize databases for diverse workloads including full-text search, geospatial queries, and JSON document access.

## Hash Indexes

Hash indexes provide O(1) lookup for equality comparisons.

### Structure and Operation

```
Hash Index Architecture:
┌────────────────────────────────────────┐
│ Hash Function: h(key) → bucket number  │
└────────────────────────────────────────┘

Bucket 0: [(key1, ptr1), (key5, ptr5), ...]
Bucket 1: [(key2, ptr2), (key8, ptr8), ...]
Bucket 2: [(key3, ptr3), (key6, ptr6), ...]
...
Bucket N: [(key4, ptr4), (key7, ptr7), ...]
```

### Creating Hash Indexes

```sql
-- PostgreSQL
CREATE INDEX idx_users_email_hash
ON Users USING HASH (email);

-- PostgreSQL 10+ hash indexes are WAL-logged and crash-safe
```

### Hash Index Trade-offs

**Advantages**:
- Constant-time lookup for exact matches
- Smaller than B-tree for same data
- No comparison ordering overhead

**Limitations**:
- Only supports equality (=) operations
- Cannot support range queries (<, >, BETWEEN)
- Cannot support ORDER BY
- Cannot support LIKE patterns
- Some databases: not crash-safe

**Use Cases**:
```sql
-- Good for hash index:
SELECT * FROM sessions WHERE session_id = 'abc123';
SELECT * FROM users WHERE email = 'user@example.com';

-- Cannot use hash index:
SELECT * FROM orders WHERE order_date > '2024-01-01';
SELECT * FROM products ORDER BY name;
```

## Full-Text Indexes

Full-text indexes enable efficient text search beyond simple pattern matching.

### GIN (Generalized Inverted Index)

```sql
-- PostgreSQL: Create GIN index for full-text search
CREATE INDEX idx_articles_content_gin
ON Articles USING GIN (to_tsvector('english', content));

-- Create index on tsvector column
ALTER TABLE Articles ADD COLUMN content_tsv tsvector;
UPDATE Articles SET content_tsv = to_tsvector('english', content);
CREATE INDEX idx_articles_tsv ON Articles USING GIN (content_tsv);

-- Create trigger to maintain tsvector
CREATE TRIGGER update_content_tsv
BEFORE INSERT OR UPDATE ON Articles
FOR EACH ROW
EXECUTE FUNCTION tsvector_update_trigger(content_tsv, 'english', content);
```

### Full-Text Search Queries

```sql
-- Basic text search
SELECT title, content
FROM Articles
WHERE to_tsvector('english', content) @@ to_tsquery('english', 'database & optimization');

-- With ranking
SELECT title, ts_rank(content_tsv, query) AS rank
FROM Articles, to_tsquery('english', 'database | index') query
WHERE content_tsv @@ query
ORDER BY rank DESC
LIMIT 10;

-- Phrase search
SELECT * FROM Articles
WHERE content_tsv @@ phraseto_tsquery('english', 'query optimization');
```

### Full-Text Index Features

**Language support**:
- Stemming (running → run)
- Stop word removal (the, a, is)
- Accent normalization
- Multiple language dictionaries

**Query capabilities**:
- AND (&), OR (|), NOT (!)
- Phrase matching
- Prefix matching (optim:*)
- Proximity search

## GiST (Generalized Search Tree)

GiST indexes support complex data types with custom search strategies.

### Geospatial Indexing

```sql
-- PostGIS spatial index
CREATE INDEX idx_locations_geom
ON Locations USING GiST (geom);

-- Spatial queries using index
SELECT name, ST_Distance(geom, ST_MakePoint(-73.9857, 40.7484)) AS distance
FROM Locations
WHERE ST_DWithin(geom, ST_MakePoint(-73.9857, 40.7484), 1000)  -- within 1km
ORDER BY distance;

-- Bounding box queries
SELECT * FROM Locations
WHERE geom && ST_MakeEnvelope(-74.0, 40.7, -73.9, 40.8, 4326);
```

### Range Type Indexing

```sql
-- Index for range types
CREATE INDEX idx_bookings_period
ON Bookings USING GiST (booking_period);

-- Overlap query (uses index)
SELECT * FROM Bookings
WHERE booking_period && daterange('2024-01-01', '2024-01-15');

-- Contains query
SELECT * FROM Bookings
WHERE booking_period @> '2024-01-10'::date;
```

### GiST vs GIN Comparison

| Feature | GiST | GIN |
|---------|------|-----|
| Build time | Faster | Slower |
| Query time | Slower | Faster |
| Update time | Faster | Slower |
| Index size | Smaller | Larger |
| Lossy | Can be lossy | Never lossy |
| Best for | Geometry, ranges | Full-text, arrays |

## BRIN (Block Range Index)

BRIN indexes work well for naturally ordered data with minimal storage.

### Structure

```
BRIN Index Structure:
┌──────────────────────────────────────────────┐
│ Stores min/max values per block range        │
│ Block Range 1: min=1, max=128               │
│ Block Range 2: min=129, max=256             │
│ Block Range 3: min=257, max=384             │
└──────────────────────────────────────────────┘
```

### Creating BRIN Indexes

```sql
-- Ideal for timestamp columns in append-only tables
CREATE INDEX idx_logs_timestamp_brin
ON Logs USING BRIN (created_at);

-- Specify pages per range (default 128)
CREATE INDEX idx_logs_timestamp_brin
ON Logs USING BRIN (created_at) WITH (pages_per_range = 32);
```

### BRIN Effectiveness

**Works best when**:
- Data has natural ordering (time-series)
- Table is append-only or mostly append
- Table is very large
- Storage is a concern

**Works poorly when**:
- Data is randomly distributed
- Frequent updates change ordering
- High selectivity required

```sql
-- Good BRIN candidate (time-series data)
CREATE TABLE sensor_readings (
    id SERIAL PRIMARY KEY,
    sensor_id INTEGER,
    reading NUMERIC,
    recorded_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_readings_time_brin ON sensor_readings USING BRIN (recorded_at);

-- Query uses BRIN efficiently
SELECT * FROM sensor_readings
WHERE recorded_at BETWEEN '2024-01-01' AND '2024-01-02';
```

### BRIN vs B-tree Size

```sql
-- Compare index sizes
SELECT
    indexname,
    pg_size_pretty(pg_relation_size(indexname::regclass)) AS size
FROM pg_indexes
WHERE tablename = 'logs';

-- Typical results for 100M row table:
-- B-tree: 2.1 GB
-- BRIN:   128 KB
```

## Partial Indexes

Index only rows matching a condition:

```sql
-- Index only active users
CREATE INDEX idx_users_active_email
ON Users (email)
WHERE status = 'active';

-- Index only recent orders
CREATE INDEX idx_orders_recent
ON Orders (customer_id, order_date)
WHERE order_date > '2024-01-01';

-- Index only non-null values
CREATE INDEX idx_products_discount
ON Products (discount_percent)
WHERE discount_percent IS NOT NULL;
```

### Benefits

- Smaller index size
- Faster index maintenance
- Better cache utilization
- More targeted optimization

## Expression Indexes

Index computed values:

```sql
-- Index on lowercase email
CREATE INDEX idx_users_email_lower
ON Users (LOWER(email));

-- Queries must use same expression
SELECT * FROM Users WHERE LOWER(email) = 'user@example.com';

-- Index on extracted JSON field
CREATE INDEX idx_settings_theme
ON UserSettings ((data->>'theme'));

-- Index on date part
CREATE INDEX idx_orders_year_month
ON Orders (DATE_TRUNC('month', order_date));
```

## Covering Indexes (Index-Only Scans)

Include non-key columns in index:

```sql
-- PostgreSQL INCLUDE clause
CREATE INDEX idx_orders_customer_covering
ON Orders (customer_id)
INCLUDE (order_date, total_amount, status);

-- Query can be satisfied from index only
SELECT order_date, total_amount, status
FROM Orders
WHERE customer_id = 123;
```

### Covering Index Trade-offs

**Advantages**:
- Eliminates table access (heap fetches)
- Faster queries for included columns
- Reduces I/O significantly

**Disadvantages**:
- Larger index
- More maintenance overhead
- Only useful for specific query patterns

## Bloom Filters

Probabilistic structure for multi-column equality:

```sql
-- PostgreSQL bloom extension
CREATE EXTENSION bloom;

-- Create bloom index
CREATE INDEX idx_items_bloom
ON Items USING bloom (col1, col2, col3, col4)
WITH (length=80, col1=2, col2=2, col3=4, col4=4);

-- Effective for: WHERE col1 = ? AND col3 = ?
-- Any combination of columns in the index
```

### Bloom Index Characteristics

- Very compact
- No false negatives (never misses matches)
- May have false positives (extra checks needed)
- Works well for low-selectivity filters

## Index Selection Strategy

Choose index type based on query patterns:

| Query Type | Best Index |
|------------|------------|
| Equality (=) | Hash or B-tree |
| Range (<, >, BETWEEN) | B-tree |
| Full-text search | GIN |
| Geometric/spatial | GiST |
| Time-series | BRIN |
| JSON fields | GIN or B-tree (expressions) |
| Array containment | GIN |
| Multi-column OR | Bloom |

Understanding these specialized indexes enables you to optimize for diverse workloads beyond what traditional B-tree indexes can efficiently handle.
