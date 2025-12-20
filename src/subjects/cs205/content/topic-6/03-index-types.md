# Index Types

Different index types optimize for different query patterns. Choosing the right index type is crucial for database performance.

## Composite Indexes

### Definition and Structure

```sql
-- Composite index on multiple columns
CREATE INDEX idx_name_date ON Employees(LastName, FirstName, HireDate);

-- Stored as concatenated key:
-- (LastName, FirstName, HireDate) → Row pointer
```

### Column Order Matters

```sql
CREATE INDEX idx_a_b_c ON Table(A, B, C);

-- Index can be used for:
WHERE A = ?                      -- ✓ Uses index
WHERE A = ? AND B = ?            -- ✓ Uses index
WHERE A = ? AND B = ? AND C = ?  -- ✓ Uses index (full match)
WHERE A = ? AND C = ?            -- ✓ Partial (A only)
WHERE B = ?                      -- ✗ Cannot use (A not specified)
WHERE B = ? AND C = ?            -- ✗ Cannot use
WHERE C = ?                      -- ✗ Cannot use

-- Leftmost prefix rule
```

### Designing Composite Indexes

```sql
-- Query patterns:
-- 1. WHERE Status = 'Active' ORDER BY CreatedDate DESC
-- 2. WHERE Status = 'Active' AND CustomerID = ?
-- 3. WHERE CustomerID = ?

-- Good composite index design:
CREATE INDEX idx_status_customer_date ON Orders(Status, CustomerID, CreatedDate);

-- Covers queries 1 and 2 well
-- Query 3 needs separate index on CustomerID
```

### Index Intersection

```sql
-- Some databases can combine multiple indexes
-- (Index Intersection / Bitmap AND)

CREATE INDEX idx_status ON Orders(Status);
CREATE INDEX idx_region ON Orders(Region);

-- Query:
SELECT * FROM Orders WHERE Status = 'Pending' AND Region = 'West';

-- Execution might:
-- 1. Get row IDs from idx_status where Status='Pending'
-- 2. Get row IDs from idx_region where Region='West'
-- 3. Intersect the sets
-- 4. Fetch matching rows
```

## Covering Indexes

### Concept

```sql
-- A covering index contains all columns needed by a query
-- No table access required (index-only scan)

CREATE INDEX idx_covering ON Orders(CustomerID, Status, Total);

-- This query is "covered":
SELECT Status, Total FROM Orders WHERE CustomerID = 123;
-- All data from index, no table lookup!
```

### INCLUDE Clause

```sql
-- Include columns not in search but in SELECT
CREATE INDEX idx_customer ON Orders(CustomerID)
INCLUDE (OrderDate, Total, Status);

-- Equivalent to covering for:
SELECT OrderDate, Total FROM Orders WHERE CustomerID = 123;

-- Included columns:
-- - Not in index key (not sorted)
-- - Stored in leaf nodes only
-- - Reduce index size vs full composite
```

### When to Use

```
Covering index benefits:
✓ Eliminates random I/O to table
✓ Significant speedup for frequent queries
✓ Works well with narrow result sets

Costs:
✗ Larger index size
✗ More maintenance overhead
✗ Index includes change = index update

Best for:
- Frequently executed queries
- Queries returning few columns
- Columns that don't change often
```

## Partial Indexes

### Definition

```sql
-- Index only a subset of rows
CREATE INDEX idx_pending ON Orders(OrderDate)
WHERE Status = 'Pending';

-- Only indexes orders where Status = 'Pending'
-- Much smaller than full index
```

### Use Cases

```sql
-- 1. Active records only
CREATE INDEX idx_active_users ON Users(Email)
WHERE IsActive = true;

-- 2. Non-null values
CREATE INDEX idx_manager ON Employees(DepartmentID)
WHERE ManagerID IS NOT NULL;

-- 3. Recent data
CREATE INDEX idx_recent_orders ON Orders(CustomerID)
WHERE OrderDate >= '2024-01-01';
```

### Benefits

```
Partial index advantages:
- Smaller size (fewer entries)
- Faster maintenance
- More efficient for filtered queries

Example:
Orders table: 10 million rows
Pending orders: 10,000 rows (0.1%)

Full index on Status: 10M entries
Partial index WHERE Status='Pending': 10K entries
99.9% space savings!
```

## Function-Based Indexes

### Expression Indexes

```sql
-- Index on computed expression
CREATE INDEX idx_lower_email ON Users(LOWER(Email));

-- Now this query uses the index:
SELECT * FROM Users WHERE LOWER(Email) = 'john@example.com';

-- Without this index, LOWER() forces table scan
```

### Common Patterns

```sql
-- Date part extraction
CREATE INDEX idx_order_year ON Orders(EXTRACT(YEAR FROM OrderDate));
-- Query: WHERE EXTRACT(YEAR FROM OrderDate) = 2024

-- JSON path (PostgreSQL)
CREATE INDEX idx_json_name ON Documents((Data->>'name'));
-- Query: WHERE Data->>'name' = 'ProductA'

-- Computed column
CREATE INDEX idx_fullname ON Employees((FirstName || ' ' || LastName));
-- Query: WHERE FirstName || ' ' || LastName = 'John Smith'
```

### Considerations

```
Function-based index requirements:
- Function must be deterministic
- Same input always produces same output
- No side effects

NOT indexable:
- RANDOM()
- NOW() / CURRENT_TIMESTAMP
- Functions reading external state
```

## Spatial Indexes

### R-Tree Index

```sql
-- For geographic/spatial data
CREATE INDEX idx_location ON Stores USING GIST(Location);

-- Supports spatial queries:
SELECT * FROM Stores
WHERE ST_DWithin(Location, ST_MakePoint(-122.4, 37.8), 5000);
-- Stores within 5km of point

-- Also supports:
-- - ST_Contains, ST_Intersects
-- - Nearest neighbor queries
-- - Bounding box searches
```

### Geohash Indexes

```sql
-- Alternative: Geohash-based indexing
-- Converts 2D coordinates to 1D string
-- Can use regular B-tree

-- PostgreSQL with PostGIS
CREATE INDEX idx_geohash ON Locations(ST_GeoHash(geom, 8));
```

## GIN and GiST Indexes

### GIN (Generalized Inverted Index)

```sql
-- For composite values: arrays, full-text, JSON

-- Array containment
CREATE INDEX idx_tags ON Articles USING GIN(Tags);
SELECT * FROM Articles WHERE Tags @> ARRAY['database', 'sql'];

-- Full-text search
CREATE INDEX idx_search ON Documents USING GIN(to_tsvector('english', Content));
SELECT * FROM Documents
WHERE to_tsvector('english', Content) @@ to_tsquery('database & performance');

-- JSON containment
CREATE INDEX idx_json ON Events USING GIN(Properties);
SELECT * FROM Events WHERE Properties @> '{"type": "click"}';
```

### GiST (Generalized Search Tree)

```sql
-- For complex data types with custom operators

-- Range types
CREATE INDEX idx_period ON Reservations USING GIST(DateRange);
SELECT * FROM Reservations WHERE DateRange && '[2024-01-01, 2024-01-31]';

-- Geometric data
CREATE INDEX idx_box ON Shapes USING GIST(BoundingBox);

-- Nearest neighbor
SELECT * FROM Places
ORDER BY Location <-> ST_MakePoint(-122.4, 37.8)
LIMIT 10;
```

## Filtered/Conditional Indexes (SQL Server)

```sql
-- SQL Server syntax for partial indexes
CREATE NONCLUSTERED INDEX idx_active_high_value
ON Customers(CustomerID, TotalPurchases)
WHERE IsActive = 1 AND TotalPurchases > 10000;

-- Only indexes high-value active customers
-- Small, focused index
```

## Columnstore Indexes

### Structure

```sql
-- SQL Server / PostgreSQL columnar
CREATE COLUMNSTORE INDEX idx_sales_columnstore ON Sales;

-- Stores data by column, not row
-- Row storage: [ID1,Date1,Amt1][ID2,Date2,Amt2]...
-- Column storage: [ID1,ID2,...][Date1,Date2,...][Amt1,Amt2,...]

-- Highly compressed
-- Excellent for analytics/aggregations
```

### When to Use

```
Columnstore benefits:
✓ Analytics queries (SUM, AVG, COUNT)
✓ Scanning many rows, few columns
✓ Data compression (10-100x)
✓ Batch processing

Not ideal for:
✗ Point lookups by ID
✗ Many small updates
✗ OLTP workloads
✗ Queries needing all columns
```

## Index Type Selection Guide

```
Query Pattern           | Recommended Index Type
------------------------|------------------------
Exact match            | B-tree (default)
Range queries          | B-tree
Pattern matching       | B-tree (prefix), GIN (full-text)
Array contains         | GIN
JSON queries           | GIN or GiST
Spatial queries        | GiST (R-tree)
Low cardinality        | Bitmap (if available)
Analytics aggregates   | Columnstore
Partial data           | Partial/Filtered index
Computed expressions   | Function-based index
```

