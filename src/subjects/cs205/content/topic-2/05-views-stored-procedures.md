# Views and Stored Procedures

Views provide virtual tables based on queries, while stored procedures encapsulate reusable database logic. Both are essential for building maintainable database applications.

## Views

### What is a View?

A view is a virtual table defined by a query. It doesn't store data—it executes the underlying query when accessed.

```sql
CREATE VIEW ActiveCustomers AS
SELECT CustomerID, Name, Email, Phone
FROM Customers
WHERE Status = 'Active';

-- Use like a table
SELECT * FROM ActiveCustomers WHERE Name LIKE 'A%';
```

### Creating Views

```sql
-- Basic view
CREATE VIEW ProductSummary AS
SELECT Category, COUNT(*) AS ProductCount, AVG(Price) AS AvgPrice
FROM Products
GROUP BY Category;

-- View with joins
CREATE VIEW OrderDetails AS
SELECT
    o.OrderID,
    o.OrderDate,
    c.Name AS CustomerName,
    p.Name AS ProductName,
    oi.Quantity,
    oi.Price
FROM Orders o
JOIN Customers c ON o.CustomerID = c.CustomerID
JOIN OrderItems oi ON o.OrderID = oi.OrderID
JOIN Products p ON oi.ProductID = p.ProductID;

-- View with column aliases
CREATE VIEW EmployeeInfo (ID, FullName, Department, AnnualSalary) AS
SELECT EmpID, CONCAT(FirstName, ' ', LastName), DeptName, Salary * 12
FROM Employees e
JOIN Departments d ON e.DeptID = d.DeptID;
```

### View Benefits

**Simplification**: Hide complex queries
```sql
-- Instead of complex join every time
SELECT * FROM OrderDetails WHERE OrderDate > '2024-01-01';
```

**Security**: Restrict access to specific columns/rows
```sql
-- Users see only their own data
CREATE VIEW MyOrders AS
SELECT * FROM Orders WHERE CustomerID = CURRENT_USER_ID();
```

**Abstraction**: Insulate applications from schema changes
```sql
-- If table structure changes, update view definition
-- Application code using view doesn't change
```

### Modifying Views

```sql
-- Replace view definition
CREATE OR REPLACE VIEW ActiveCustomers AS
SELECT CustomerID, Name, Email, Phone, JoinDate
FROM Customers
WHERE Status = 'Active' AND JoinDate > '2020-01-01';

-- Alter view (some databases)
ALTER VIEW ActiveCustomers AS
SELECT CustomerID, Name, Email
FROM Customers
WHERE Status = 'Active';

-- Drop view
DROP VIEW ActiveCustomers;
DROP VIEW IF EXISTS ActiveCustomers;
```

### Updatable Views

Some views allow INSERT, UPDATE, DELETE:

```sql
-- Simple view is updatable
CREATE VIEW USCustomers AS
SELECT * FROM Customers WHERE Country = 'USA';

UPDATE USCustomers SET Phone = '555-0100' WHERE CustomerID = 1;
-- Actually updates Customers table

-- WITH CHECK OPTION prevents updates that would remove row from view
CREATE VIEW USCustomers AS
SELECT * FROM Customers WHERE Country = 'USA'
WITH CHECK OPTION;

UPDATE USCustomers SET Country = 'Canada' WHERE CustomerID = 1;
-- Error: Would remove row from view
```

**Views NOT updatable when they contain**:
- Aggregate functions
- DISTINCT
- GROUP BY / HAVING
- UNION
- Subqueries in SELECT
- Certain joins

### Materialized Views

Store query results physically (PostgreSQL, Oracle):

```sql
-- Create materialized view
CREATE MATERIALIZED VIEW MonthlySales AS
SELECT
    DATE_TRUNC('month', OrderDate) AS Month,
    SUM(Amount) AS TotalSales
FROM Orders
GROUP BY DATE_TRUNC('month', OrderDate);

-- Refresh when needed
REFRESH MATERIALIZED VIEW MonthlySales;

-- Refresh concurrently (no locking)
REFRESH MATERIALIZED VIEW CONCURRENTLY MonthlySales;
```

**Trade-offs**:
- Faster reads (pre-computed)
- Stale data (needs refresh)
- Storage space required

## Stored Procedures

### What is a Stored Procedure?

A stored procedure is a named block of SQL code stored in the database that can be executed repeatedly.

```sql
-- Create procedure (syntax varies by database)

-- MySQL
DELIMITER //
CREATE PROCEDURE GetCustomerOrders(IN custID INT)
BEGIN
    SELECT * FROM Orders WHERE CustomerID = custID;
END //
DELIMITER ;

-- PostgreSQL
CREATE OR REPLACE PROCEDURE GetCustomerOrders(custID INT)
LANGUAGE SQL
AS $$
    SELECT * FROM Orders WHERE CustomerID = custID;
$$;

-- SQL Server
CREATE PROCEDURE GetCustomerOrders @custID INT
AS
BEGIN
    SELECT * FROM Orders WHERE CustomerID = @custID;
END;
```

### Procedure Parameters

```sql
-- IN parameter (input)
CREATE PROCEDURE GetOrdersByStatus(IN status VARCHAR(20))
BEGIN
    SELECT * FROM Orders WHERE Status = status;
END;

-- OUT parameter (output)
CREATE PROCEDURE GetOrderCount(IN custID INT, OUT orderCount INT)
BEGIN
    SELECT COUNT(*) INTO orderCount FROM Orders WHERE CustomerID = custID;
END;

-- INOUT parameter (both)
CREATE PROCEDURE DoubleValue(INOUT val INT)
BEGIN
    SET val = val * 2;
END;
```

### Calling Procedures

```sql
-- MySQL
CALL GetCustomerOrders(1001);
CALL GetOrdersByStatus('Pending');

-- With OUT parameter
CALL GetOrderCount(1001, @count);
SELECT @count;

-- SQL Server
EXEC GetCustomerOrders @custID = 1001;
```

### Procedure Logic

```sql
-- Variables and control flow (MySQL)
CREATE PROCEDURE ProcessOrder(IN orderID INT)
BEGIN
    DECLARE orderTotal DECIMAL(10,2);
    DECLARE orderStatus VARCHAR(20);

    -- Calculate total
    SELECT SUM(Quantity * Price) INTO orderTotal
    FROM OrderItems WHERE OrderID = orderID;

    -- Determine status based on total
    IF orderTotal > 1000 THEN
        SET orderStatus = 'Priority';
    ELSEIF orderTotal > 100 THEN
        SET orderStatus = 'Standard';
    ELSE
        SET orderStatus = 'Economy';
    END IF;

    -- Update order
    UPDATE Orders SET Status = orderStatus, Total = orderTotal
    WHERE OrderID = orderID;
END;
```

### Loops

```sql
-- WHILE loop
CREATE PROCEDURE GenerateTestData(IN numRows INT)
BEGIN
    DECLARE i INT DEFAULT 1;
    WHILE i <= numRows DO
        INSERT INTO TestTable (ID, Value) VALUES (i, RAND());
        SET i = i + 1;
    END WHILE;
END;

-- Cursor loop
CREATE PROCEDURE ProcessAllOrders()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE ordID INT;
    DECLARE cur CURSOR FOR SELECT OrderID FROM Orders WHERE Status = 'New';
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN cur;

    read_loop: LOOP
        FETCH cur INTO ordID;
        IF done THEN
            LEAVE read_loop;
        END IF;
        CALL ProcessOrder(ordID);
    END LOOP;

    CLOSE cur;
END;
```

## Functions

### User-Defined Functions

Functions return a value and can be used in SQL expressions:

```sql
-- Scalar function
CREATE FUNCTION CalculateTax(amount DECIMAL(10,2))
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    RETURN amount * 0.08;
END;

-- Use in query
SELECT OrderID, Total, CalculateTax(Total) AS Tax FROM Orders;

-- Table-valued function (SQL Server)
CREATE FUNCTION GetCustomerOrders(@custID INT)
RETURNS TABLE
AS
RETURN (
    SELECT * FROM Orders WHERE CustomerID = @custID
);
```

### Functions vs Procedures

| Feature | Function | Procedure |
|---------|----------|-----------|
| Return value | Required | Optional |
| Use in SELECT | Yes | No |
| Modify data | Usually no | Yes |
| Transaction | No | Yes |
| Parameters | IN only | IN, OUT, INOUT |

## Triggers

### What is a Trigger?

A trigger automatically executes when a specified event occurs:

```sql
-- PostgreSQL trigger
CREATE OR REPLACE FUNCTION update_modified_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.ModifiedAt = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_update_timestamp
    BEFORE UPDATE ON Products
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_timestamp();
```

### Trigger Types

```sql
-- BEFORE trigger: Modify data before operation
CREATE TRIGGER validate_price
    BEFORE INSERT ON Products
    FOR EACH ROW
BEGIN
    IF NEW.Price < 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Price cannot be negative';
    END IF;
END;

-- AFTER trigger: React after operation
CREATE TRIGGER log_order_insert
    AFTER INSERT ON Orders
    FOR EACH ROW
BEGIN
    INSERT INTO OrderLog (OrderID, Action, Timestamp)
    VALUES (NEW.OrderID, 'INSERT', NOW());
END;

-- INSTEAD OF trigger: Replace operation (views)
CREATE TRIGGER instead_of_customer_view_insert
    INSTEAD OF INSERT ON CustomerView
    FOR EACH ROW
BEGIN
    INSERT INTO Customers (Name, Email) VALUES (NEW.Name, NEW.Email);
END;
```

### Trigger Use Cases

1. **Audit logging**: Track all changes
2. **Data validation**: Enforce complex rules
3. **Derived data**: Update calculated fields
4. **Cascading changes**: Update related tables
5. **Notification**: Alert external systems

### Trigger Cautions

- Can make debugging difficult
- May impact performance
- Can cause infinite loops (trigger fires trigger)
- Hidden business logic

## Best Practices

### Views

1. Use meaningful names describing the view's purpose
2. Document complex views with comments
3. Consider materialized views for expensive queries
4. Test view performance with EXPLAIN

### Stored Procedures

1. Keep procedures focused on single tasks
2. Use meaningful parameter names
3. Handle errors with proper exceptions
4. Document inputs, outputs, and side effects

### Triggers

1. Keep trigger logic simple and fast
2. Avoid triggers calling other triggers
3. Document trigger existence prominently
4. Consider alternatives (constraints, application logic)

