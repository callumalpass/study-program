---
id: cs205-t2-dml
title: "Data Manipulation"
order: 3
---

# Data Manipulation: INSERT, UPDATE, DELETE

DML commands modify data in database tables. Understanding these operations is essential for maintaining and updating database content.

## INSERT Statement

### Single Row Insert

```sql
-- Specify all columns
INSERT INTO Employees (EmpID, FirstName, LastName, Email, Salary, DeptID)
VALUES (101, 'Alice', 'Johnson', 'alice@company.com', 75000, 10);

-- Rely on default values and auto-increment
INSERT INTO Employees (FirstName, LastName, Email, Salary, DeptID)
VALUES ('Bob', 'Smith', 'bob@company.com', 65000, 20);
```

### Column List Best Practices

Always specify column names:

```sql
-- Bad: Fragile if table structure changes
INSERT INTO Products VALUES (1, 'Widget', 29.99, 100);

-- Good: Explicit and maintainable
INSERT INTO Products (ProductID, Name, Price, Quantity)
VALUES (1, 'Widget', 29.99, 100);
```

### Multi-Row Insert

```sql
INSERT INTO Products (Name, Price, Category) VALUES
    ('Laptop', 999.99, 'Electronics'),
    ('Mouse', 29.99, 'Electronics'),
    ('Keyboard', 79.99, 'Electronics'),
    ('Monitor', 299.99, 'Electronics');
```

### INSERT with SELECT

Copy data from another table or query:

```sql
-- Copy all rows
INSERT INTO ProductArchive (ProductID, Name, Price, ArchivedDate)
SELECT ProductID, Name, Price, CURRENT_DATE
FROM Products
WHERE Discontinued = TRUE;

-- Aggregate and insert
INSERT INTO MonthlySales (Month, TotalSales)
SELECT DATE_TRUNC('month', OrderDate), SUM(Amount)
FROM Orders
GROUP BY DATE_TRUNC('month', OrderDate);
```

### INSERT with DEFAULT VALUES

```sql
-- Insert row with all defaults
INSERT INTO AuditLog DEFAULT VALUES;

-- Specify some values, use defaults for others
INSERT INTO Orders (CustomerID)
VALUES (1001);
-- OrderDate defaults to CURRENT_DATE, Status defaults to 'Pending'
```

### Handling Duplicates

```sql
-- INSERT OR IGNORE (SQLite)
INSERT OR IGNORE INTO Customers (CustomerID, Name) VALUES (1, 'Alice');

-- INSERT ... ON DUPLICATE KEY UPDATE (MySQL)
INSERT INTO Products (ProductID, Name, Price)
VALUES (1, 'Widget', 29.99)
ON DUPLICATE KEY UPDATE Price = VALUES(Price);

-- INSERT ... ON CONFLICT (PostgreSQL)
INSERT INTO Products (ProductID, Name, Price)
VALUES (1, 'Widget', 29.99)
ON CONFLICT (ProductID) DO UPDATE SET Price = EXCLUDED.Price;

-- MERGE statement (SQL Server, Oracle)
MERGE INTO Products AS target
USING (VALUES (1, 'Widget', 29.99)) AS source (ProductID, Name, Price)
ON target.ProductID = source.ProductID
WHEN MATCHED THEN UPDATE SET Price = source.Price
WHEN NOT MATCHED THEN INSERT VALUES (source.ProductID, source.Name, source.Price);
```

### Returning Inserted Values

```sql
-- PostgreSQL
INSERT INTO Employees (FirstName, LastName)
VALUES ('Alice', 'Johnson')
RETURNING EmpID, FirstName, LastName;

-- SQL Server
INSERT INTO Employees (FirstName, LastName)
OUTPUT inserted.EmpID, inserted.FirstName
VALUES ('Alice', 'Johnson');
```

## UPDATE Statement

### Basic UPDATE

```sql
-- Update single row
UPDATE Employees
SET Salary = 80000
WHERE EmpID = 101;

-- Update multiple columns
UPDATE Employees
SET Salary = 80000, DeptID = 20, Title = 'Senior Developer'
WHERE EmpID = 101;

-- Update all rows (careful!)
UPDATE Products
SET Price = Price * 1.10;  -- 10% price increase
```

### Conditional Updates

```sql
-- Update based on condition
UPDATE Employees
SET Salary = Salary * 1.05
WHERE DeptID = 10 AND HireDate < '2020-01-01';

-- Update with CASE
UPDATE Products
SET Price = CASE
    WHEN Category = 'Electronics' THEN Price * 1.10
    WHEN Category = 'Clothing' THEN Price * 1.05
    ELSE Price * 1.02
END;
```

### UPDATE with JOIN

```sql
-- Update based on related table (syntax varies)

-- MySQL
UPDATE Employees e
JOIN Departments d ON e.DeptID = d.DeptID
SET e.LocationID = d.LocationID
WHERE d.Name = 'Engineering';

-- PostgreSQL
UPDATE Employees
SET LocationID = d.LocationID
FROM Departments d
WHERE Employees.DeptID = d.DeptID AND d.Name = 'Engineering';

-- SQL Server
UPDATE e
SET e.LocationID = d.LocationID
FROM Employees e
JOIN Departments d ON e.DeptID = d.DeptID
WHERE d.Name = 'Engineering';
```

### UPDATE with Subquery

```sql
-- Set salary to department average
UPDATE Employees e
SET Salary = (
    SELECT AVG(Salary)
    FROM Employees
    WHERE DeptID = e.DeptID
);

-- Update based on existence
UPDATE Products
SET Featured = TRUE
WHERE ProductID IN (
    SELECT ProductID FROM OrderItems
    GROUP BY ProductID
    HAVING SUM(Quantity) > 100
);
```

### Limiting Updates

```sql
-- Update only first N rows (syntax varies)

-- MySQL
UPDATE Products SET Price = Price * 0.9 LIMIT 10;

-- PostgreSQL (using CTE)
WITH ToUpdate AS (
    SELECT ProductID FROM Products LIMIT 10
)
UPDATE Products SET Price = Price * 0.9
WHERE ProductID IN (SELECT ProductID FROM ToUpdate);
```

## DELETE Statement

### Basic DELETE

```sql
-- Delete specific rows
DELETE FROM Employees WHERE EmpID = 101;

-- Delete based on condition
DELETE FROM Orders WHERE OrderDate < '2020-01-01';

-- Delete all rows (careful!)
DELETE FROM TempTable;
```

### DELETE with JOIN

```sql
-- MySQL
DELETE o FROM Orders o
JOIN Customers c ON o.CustomerID = c.CustomerID
WHERE c.Status = 'Inactive';

-- PostgreSQL
DELETE FROM Orders
USING Customers
WHERE Orders.CustomerID = Customers.CustomerID
  AND Customers.Status = 'Inactive';

-- SQL Server
DELETE o FROM Orders o
JOIN Customers c ON o.CustomerID = c.CustomerID
WHERE c.Status = 'Inactive';
```

### DELETE with Subquery

```sql
-- Delete orders from inactive customers
DELETE FROM Orders
WHERE CustomerID IN (
    SELECT CustomerID FROM Customers WHERE Status = 'Inactive'
);

-- Delete products never ordered
DELETE FROM Products
WHERE ProductID NOT IN (
    SELECT DISTINCT ProductID FROM OrderItems
);
```

### Cascading Deletes

```sql
-- Defined in table creation
CREATE TABLE Orders (
    OrderID INTEGER PRIMARY KEY,
    CustomerID INTEGER REFERENCES Customers(CustomerID)
        ON DELETE CASCADE  -- Delete orders when customer deleted
);

-- Now deleting customer automatically deletes their orders
DELETE FROM Customers WHERE CustomerID = 1001;
```

### TRUNCATE vs DELETE

```sql
-- TRUNCATE: Fast, resets identity, no WHERE clause
TRUNCATE TABLE LogEntries;

-- DELETE: Slower, logged, can use WHERE
DELETE FROM LogEntries;
```

| Feature | DELETE | TRUNCATE |
|---------|--------|----------|
| Speed | Slower | Faster |
| WHERE clause | Yes | No |
| Triggers | Fires | Usually not |
| Transaction log | Full logging | Minimal |
| Identity reset | No | Yes |
| Rollback | Yes | Depends |

## Transaction Safety

### Wrapping in Transactions

```sql
BEGIN TRANSACTION;

UPDATE Accounts SET Balance = Balance - 100 WHERE AccountID = 'A';
UPDATE Accounts SET Balance = Balance + 100 WHERE AccountID = 'B';

-- Check results
SELECT * FROM Accounts WHERE AccountID IN ('A', 'B');

-- If correct
COMMIT;

-- If wrong
ROLLBACK;
```

### Testing Before Committing

```sql
-- See what would be deleted
SELECT * FROM Orders WHERE OrderDate < '2020-01-01';

-- If results look correct, then delete
DELETE FROM Orders WHERE OrderDate < '2020-01-01';
```

## Common Patterns

### Soft Delete

```sql
-- Instead of deleting, mark as deleted
ALTER TABLE Products ADD COLUMN IsDeleted BOOLEAN DEFAULT FALSE;

-- "Delete" by setting flag
UPDATE Products SET IsDeleted = TRUE WHERE ProductID = 1;

-- Filter out deleted items in queries
SELECT * FROM Products WHERE IsDeleted = FALSE;
```

### Audit Trail

```sql
-- Track changes
CREATE TABLE ProductAudit (
    AuditID SERIAL PRIMARY KEY,
    ProductID INTEGER,
    Action VARCHAR(10),
    OldPrice DECIMAL(10,2),
    NewPrice DECIMAL(10,2),
    ChangedBy VARCHAR(50),
    ChangedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger to log changes (PostgreSQL)
CREATE OR REPLACE FUNCTION log_product_changes()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO ProductAudit (ProductID, Action, OldPrice, NewPrice, ChangedBy)
    VALUES (NEW.ProductID, TG_OP, OLD.Price, NEW.Price, CURRENT_USER);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER product_audit_trigger
AFTER UPDATE ON Products
FOR EACH ROW EXECUTE FUNCTION log_product_changes();
```

### Upsert Pattern

```sql
-- Insert or update in one operation
INSERT INTO DailyStats (Date, PageViews, Visitors)
VALUES ('2024-01-15', 1000, 500)
ON CONFLICT (Date) DO UPDATE SET
    PageViews = DailyStats.PageViews + EXCLUDED.PageViews,
    Visitors = DailyStats.Visitors + EXCLUDED.Visitors;
```

## Performance Considerations

### Batch Operations

```sql
-- Instead of many single-row inserts
INSERT INTO Products VALUES (1, 'A', 10);
INSERT INTO Products VALUES (2, 'B', 20);
INSERT INTO Products VALUES (3, 'C', 30);

-- Use multi-row insert
INSERT INTO Products VALUES
    (1, 'A', 10),
    (2, 'B', 20),
    (3, 'C', 30);
```

### Index Impact

- INSERT: Slower with more indexes
- UPDATE: Slower if indexed columns change
- DELETE: Slower with more indexes

Consider disabling indexes for bulk operations, then rebuilding.

