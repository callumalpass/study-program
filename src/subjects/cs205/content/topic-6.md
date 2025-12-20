# Indexing and B-Trees

Indexes are critical for database performance, enabling fast data retrieval without scanning entire tables. B-trees are the most common index structure in relational databases.

## Why Indexes?

### The Problem

Without indexes, queries require full table scans:

```sql
SELECT * FROM Customers WHERE LastName = 'Smith';
-- Scans all 1 million rows to find matches
```

### The Solution

Indexes provide fast lookup paths:

```sql
CREATE INDEX idx_lastname ON Customers(LastName);
-- Now finds 'Smith' in milliseconds using tree traversal
```

### Trade-offs

**Benefits**:
- Faster SELECT queries
- Faster WHERE, JOIN, ORDER BY operations

**Costs**:
- Storage space for index structure
- Slower INSERT, UPDATE, DELETE (index maintenance)
- Memory usage for index buffers

## Index Types

### Primary Index

Built on the primary key, usually clustered (data physically sorted):

```sql
CREATE TABLE Students (
    StudentID INTEGER PRIMARY KEY,  -- Automatic primary index
    Name VARCHAR(100)
);
```

### Secondary Index

Built on non-key columns:

```sql
CREATE INDEX idx_name ON Students(Name);
CREATE INDEX idx_gpa ON Students(GPA);
```

### Unique Index

Enforces uniqueness:

```sql
CREATE UNIQUE INDEX idx_email ON Users(Email);
```

### Composite Index

Multiple columns:

```sql
CREATE INDEX idx_name_dept ON Employees(LastName, DeptID);
-- Useful for queries on (LastName) or (LastName, DeptID)
-- NOT useful for queries on just (DeptID)
```

### Covering Index

Includes all columns needed by a query:

```sql
CREATE INDEX idx_covering ON Orders(CustomerID) INCLUDE (OrderDate, Amount);
-- Query can be answered entirely from index without table access
```

## B-Tree Structure

### Properties

B-trees are balanced search trees optimized for disk access:

- All leaves at same depth
- Nodes contain multiple keys
- High fanout (many children per node)
- Self-balancing on insert/delete

### Node Structure

```
[ptr0 | key1 | ptr1 | key2 | ptr2 | ... | keyN | ptrN]

- Keys are sorted
- ptr_i points to subtree with keys between key_i and key_{i+1}
- Leaf nodes contain pointers to actual data
```

### Example B-Tree (Order 3)

```
              [50]
             /    \
       [25,30]    [60,80]
       /  |  \    /  |  \
    [10] [27][35] [55][65][90]
```

### B+ Tree Variant

Most databases use B+ trees:
- All data pointers in leaf nodes
- Leaf nodes linked for range scans
- Internal nodes only store keys

```
Internal:    [50]
            /    \
         [25]    [75]
          |       |
Leaves:  [10,20,25]→[30,40,50]→[60,75]→[80,90]
           ↓ ↓ ↓      ↓ ↓ ↓      ↓ ↓     ↓ ↓
         (data)    (data)    (data)   (data)
```

## B-Tree Operations

### Search

```
Search for key K:
1. Start at root
2. Find smallest key_i >= K
3. Follow ptr_i to child
4. Repeat until leaf
5. Check if K exists in leaf
```

Time: O(log_B N) where B is branching factor.

### Insert

```
Insert key K:
1. Search for appropriate leaf
2. Insert K in sorted order
3. If leaf overflows (too many keys):
   - Split into two nodes
   - Push middle key to parent
4. Propagate splits up if needed
```

### Delete

```
Delete key K:
1. Find and remove K from leaf
2. If leaf underflows (too few keys):
   - Borrow from sibling, or
   - Merge with sibling
3. Propagate changes up if needed
```

## Index Selection

### When to Create Indexes

**Good candidates**:
- Columns in WHERE clauses
- Columns in JOIN conditions
- Columns in ORDER BY
- Foreign key columns
- High-cardinality columns (many distinct values)

**Poor candidates**:
- Small tables (full scan is fast)
- Columns with few distinct values
- Frequently updated columns
- Columns rarely used in queries

### Query Analysis

```sql
EXPLAIN SELECT * FROM Orders WHERE CustomerID = 1001;

-- Shows execution plan:
-- Index Scan on idx_customer  (cost=...)
-- or
-- Seq Scan on Orders  (cost=...)  -- Full table scan
```

## Other Index Types

### Hash Index

O(1) lookup for equality queries only:

```sql
CREATE INDEX idx_hash ON Users USING HASH (UserID);
-- Fast: WHERE UserID = 123
-- Cannot: WHERE UserID > 100 (no range support)
```

### Bitmap Index

For low-cardinality columns (few distinct values):

```
Gender column: M or F
M: 10110010...
F: 01001101...

Query: WHERE Gender = 'M' AND Status = 'Active'
Result = M_bitmap AND Active_bitmap
```

### Full-Text Index

For text search:

```sql
CREATE FULLTEXT INDEX idx_content ON Articles(Content);
SELECT * FROM Articles WHERE MATCH(Content) AGAINST('database');
```

### Spatial Index

For geographic data (R-trees):

```sql
CREATE SPATIAL INDEX idx_location ON Stores(Location);
SELECT * FROM Stores WHERE ST_Distance(Location, Point(x, y)) < 1000;
```

## Index Maintenance

### Statistics

Database maintains statistics for query planning:

```sql
ANALYZE TABLE Orders;  -- Update statistics
```

### Rebuilding

Indexes degrade over time (fragmentation):

```sql
ALTER INDEX idx_customer REBUILD;
REINDEX TABLE Orders;
```

## Learning Objectives

By the end of this topic, you should be able to:
- Explain how indexes improve query performance
- Understand B-tree and B+ tree structure
- Create appropriate indexes for different queries
- Analyze query execution plans
- Make informed decisions about index trade-offs
