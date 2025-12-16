# Denormalization

Denormalization is the deliberate introduction of redundancy into a database design to improve read performance. Understanding when and how to denormalize is crucial for practical database design.

## Why Denormalize

### Performance Trade-offs

```
Normalized Design:
+ Minimal redundancy
+ Easy updates (one place)
+ Data consistency guaranteed
- Complex queries (many joins)
- Slower reads
- More disk seeks

Denormalized Design:
+ Faster reads (fewer joins)
+ Simpler queries
+ Better for reporting
- Data redundancy
- Update anomalies risk
- More storage space
```

### When to Consider Denormalization

```
Good candidates:
1. Read-heavy workloads (OLAP, reporting)
2. Stable data that rarely changes
3. Frequently accessed computed values
4. Query patterns that always join same tables
5. Performance bottlenecks from joins

Poor candidates:
1. Write-heavy workloads (OLTP)
2. Frequently changing data
3. Critical financial/legal data
4. Tables with complex update patterns
```

## Denormalization Techniques

### Duplicating Columns

```sql
-- Normalized: Customer name only in Customers table
SELECT o.OrderID, c.Name, o.Total
FROM Orders o
JOIN Customers c ON o.CustomerID = c.CustomerID;

-- Denormalized: Copy name to Orders
ALTER TABLE Orders ADD CustomerName VARCHAR(100);

-- Update procedure
UPDATE Orders o
SET CustomerName = (
    SELECT Name FROM Customers c
    WHERE c.CustomerID = o.CustomerID
);

-- Now simple query:
SELECT OrderID, CustomerName, Total FROM Orders;
```

### Pre-Computed Aggregates

```sql
-- Normalized: Calculate on demand
SELECT CustomerID, COUNT(*), SUM(Total)
FROM Orders
GROUP BY CustomerID;  -- Slow for large tables

-- Denormalized: Store aggregates
ALTER TABLE Customers ADD
    OrderCount INTEGER DEFAULT 0,
    TotalSpent DECIMAL(12,2) DEFAULT 0;

-- Maintain via triggers
CREATE TRIGGER UpdateCustomerStats
AFTER INSERT ON Orders
FOR EACH ROW
BEGIN
    UPDATE Customers
    SET OrderCount = OrderCount + 1,
        TotalSpent = TotalSpent + NEW.Total
    WHERE CustomerID = NEW.CustomerID;
END;
```

### Materialized Views

```sql
-- Create materialized view for reporting
CREATE MATERIALIZED VIEW SalesSummary AS
SELECT
    p.Category,
    DATE_TRUNC('month', o.OrderDate) AS Month,
    SUM(oi.Quantity * oi.Price) AS Revenue,
    COUNT(DISTINCT o.OrderID) AS OrderCount
FROM Orders o
JOIN OrderItems oi ON o.OrderID = oi.OrderID
JOIN Products p ON oi.ProductID = p.ProductID
GROUP BY p.Category, DATE_TRUNC('month', o.OrderDate);

-- Refresh periodically
REFRESH MATERIALIZED VIEW SalesSummary;
```

### Horizontal Denormalization

```sql
-- Normalized: Separate address table
Addresses(AddressID, CustomerID, Type, Street, City, State, Zip)

-- Denormalized: Embed common addresses
Customers(
    CustomerID,
    Name,
    -- Billing address embedded
    BillStreet, BillCity, BillState, BillZip,
    -- Shipping address embedded
    ShipStreet, ShipCity, ShipState, ShipZip
);
```

### Vertical Denormalization

```sql
-- Normalized: All employee data in one table
Employees(EmpID, Name, Email, Phone, Address, Resume, Photo)

-- Denormalized: Separate hot and cold data
Employees_Core(EmpID, Name, Email, Phone);
Employees_Extended(EmpID, Address, Resume, Photo);

-- Core table stays in memory, faster queries
```

## Summary Tables

### Design Pattern

```sql
-- Fact table (normalized)
Sales(SaleID, ProductID, CustomerID, Date, Quantity, Amount)

-- Summary tables (denormalized)
DailySales(Date, TotalAmount, TotalQuantity, OrderCount);
ProductSales(ProductID, TotalAmount, TotalQuantity, LastSaleDate);
MonthlySalesByRegion(Month, Region, TotalAmount, OrderCount);
```

### Maintenance Strategies

```sql
-- 1. Trigger-based (real-time)
CREATE TRIGGER UpdateDailySales
AFTER INSERT ON Sales
FOR EACH ROW
BEGIN
    INSERT INTO DailySales (Date, TotalAmount, TotalQuantity, OrderCount)
    VALUES (NEW.Date, NEW.Amount, NEW.Quantity, 1)
    ON CONFLICT (Date) DO UPDATE
    SET TotalAmount = DailySales.TotalAmount + NEW.Amount,
        TotalQuantity = DailySales.TotalQuantity + NEW.Quantity,
        OrderCount = DailySales.OrderCount + 1;
END;

-- 2. Batch update (periodic)
-- Run nightly job
TRUNCATE DailySales;
INSERT INTO DailySales
SELECT Date, SUM(Amount), SUM(Quantity), COUNT(*)
FROM Sales
GROUP BY Date;

-- 3. Incremental update
-- Track last processed
INSERT INTO DailySales
SELECT Date, SUM(Amount), SUM(Quantity), COUNT(*)
FROM Sales
WHERE SaleID > @LastProcessedID
GROUP BY Date
ON CONFLICT DO UPDATE...;
```

## Maintaining Data Consistency

### Trigger Approach

```sql
-- Denormalized column: Orders.CustomerName
-- Must update when Customers.Name changes

CREATE TRIGGER SyncCustomerName
AFTER UPDATE OF Name ON Customers
FOR EACH ROW
BEGIN
    UPDATE Orders
    SET CustomerName = NEW.Name
    WHERE CustomerID = NEW.CustomerID;
END;
```

### Application Layer

```python
# Service layer maintains consistency
class CustomerService:
    def update_name(self, customer_id, new_name):
        with transaction():
            # Update source
            db.execute(
                "UPDATE Customers SET Name = ? WHERE CustomerID = ?",
                new_name, customer_id
            )
            # Update denormalized copies
            db.execute(
                "UPDATE Orders SET CustomerName = ? WHERE CustomerID = ?",
                new_name, customer_id
            )
```

### Eventual Consistency

```sql
-- For high-volume systems, accept temporary inconsistency

-- 1. Queue updates
INSERT INTO UpdateQueue (TableName, RecordID, UpdateType)
VALUES ('Orders', @CustomerID, 'SyncName');

-- 2. Background process
WHILE EXISTS (SELECT 1 FROM UpdateQueue)
BEGIN
    -- Process queue in batches
    UPDATE Orders o
    SET CustomerName = (SELECT Name FROM Customers WHERE CustomerID = o.CustomerID)
    WHERE CustomerID IN (
        SELECT TOP 1000 RecordID FROM UpdateQueue WHERE TableName = 'Orders'
    );

    DELETE FROM UpdateQueue WHERE ...;
END;
```

## Denormalization Patterns

### One-to-One Merge

```sql
-- Before: Two tables
Users(UserID, Username, Email)
UserProfiles(UserID, Bio, AvatarURL, Settings)

-- After: Merged (if always accessed together)
Users(UserID, Username, Email, Bio, AvatarURL, Settings)
```

### Caching Foreign Keys

```sql
-- Normalized: Must join through OrderItems
SELECT o.OrderID, p.ProductName
FROM Orders o
JOIN OrderItems oi ON o.OrderID = oi.OrderID
JOIN Products p ON oi.ProductID = p.ProductID;

-- Denormalized: Add redundant FK
OrderItems(OrderItemID, OrderID, ProductID, ProductName, Quantity)
```

### Star Schema (Data Warehouse)

```sql
-- Fact table with denormalized dimensions
CREATE TABLE FactSales (
    SaleKey SERIAL PRIMARY KEY,
    DateKey INTEGER,
    ProductKey INTEGER,
    CustomerKey INTEGER,
    -- Denormalized attributes for query performance
    ProductCategory VARCHAR(50),
    CustomerRegion VARCHAR(50),
    SaleYear INTEGER,
    SaleMonth INTEGER,
    -- Measures
    Quantity INTEGER,
    Amount DECIMAL(12,2)
);
```

## Measuring Denormalization Impact

### Before/After Analysis

```sql
-- Measure query performance
EXPLAIN ANALYZE SELECT ...;  -- Before denormalization
EXPLAIN ANALYZE SELECT ...;  -- After denormalization

-- Storage impact
SELECT
    table_name,
    pg_size_pretty(pg_total_relation_size(table_name::regclass))
FROM information_schema.tables
WHERE table_schema = 'public';
```

### Monitoring Consistency

```sql
-- Detect inconsistencies in denormalized data
SELECT o.OrderID, o.CustomerName AS Denorm, c.Name AS Source
FROM Orders o
JOIN Customers c ON o.CustomerID = c.CustomerID
WHERE o.CustomerName != c.Name;

-- Alert if count > 0
```

### Update Overhead

```sql
-- Measure trigger overhead
-- Before: Direct update time
-- After: Update + trigger cascade time

-- Monitor trigger execution
SELECT tgname, tgenabled, tgisinternal
FROM pg_trigger
WHERE tgrelid = 'customers'::regclass;
```

## Best Practices

### Documentation

```
For each denormalization:

1. Document the source of truth
   "CustomerName in Orders is copied from Customers.Name"

2. Document update mechanism
   "Maintained by trigger SyncCustomerName"

3. Document why
   "Reduces join for Order listing, saves 50ms per query"

4. Document risks
   "Temporary inconsistency possible during bulk updates"
```

### Selective Denormalization

```
Don't denormalize everything. Target:

1. Hottest queries (90th percentile frequency)
2. Slowest queries (90th percentile duration)
3. Most expensive queries (CPU/IO heavy)

Use query analysis:
SELECT query, calls, mean_time, total_time
FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 20;
```

### Reversibility

```sql
-- Design for easy removal of denormalization

-- Keep original normalized structure intact
-- Denormalized data is clearly marked
-- Can revert by:
--   1. Dropping denormalized columns
--   2. Removing triggers
--   3. Updating queries

-- Never remove the source of truth!
```

## Common Pitfalls

### Over-Denormalization

```
Problem: Adding redundant data everywhere
Result: Maintenance nightmare, inconsistency bugs

Rule: Denormalize only what you measure needs it
```

### Ignoring Update Patterns

```
Problem: Denormalize frequently-changing data
Result: Heavy update overhead, lock contention

Rule: Analyze write patterns before denormalizing
```

### Missing Synchronization

```
Problem: No mechanism to update redundant data
Result: Permanent data inconsistency

Rule: Every denormalization needs maintenance strategy
```

