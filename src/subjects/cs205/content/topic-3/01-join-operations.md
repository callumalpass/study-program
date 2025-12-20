# Join Operations in Depth

Joins combine rows from multiple tables based on related columns. Mastering joins is essential for working with normalized databases.

## Join Fundamentals

### Why Joins?

Normalized databases split data across tables to eliminate redundancy. Joins reconnect this data:

```sql
-- Customers and Orders are separate tables
-- Join to see customer names with their orders
SELECT c.Name, o.OrderDate, o.Total
FROM Customers c
JOIN Orders o ON c.CustomerID = o.CustomerID;
```

### Join Syntax

Two equivalent syntaxes:

```sql
-- ANSI SQL-92 syntax (preferred)
SELECT * FROM Customers c
JOIN Orders o ON c.CustomerID = o.CustomerID;

-- Old comma-syntax (avoid)
SELECT * FROM Customers c, Orders o
WHERE c.CustomerID = o.CustomerID;
```

## Inner Join

Returns only rows with matches in both tables:

```sql
SELECT
    c.CustomerID,
    c.Name,
    o.OrderID,
    o.OrderDate
FROM Customers c
INNER JOIN Orders o ON c.CustomerID = o.CustomerID;

-- Customers without orders: NOT included
-- Orders without customers: NOT included (shouldn't happen with FK)
```

### Multiple Join Conditions

```sql
SELECT *
FROM TableA a
JOIN TableB b ON a.Key1 = b.Key1 AND a.Key2 = b.Key2;

-- With additional filter
SELECT *
FROM Employees e
JOIN Departments d ON e.DeptID = d.DeptID AND d.Status = 'Active';
```

### Joining Multiple Tables

```sql
SELECT
    c.Name AS Customer,
    o.OrderID,
    p.Name AS Product,
    oi.Quantity
FROM Customers c
JOIN Orders o ON c.CustomerID = o.CustomerID
JOIN OrderItems oi ON o.OrderID = oi.OrderID
JOIN Products p ON oi.ProductID = p.ProductID;
```

## Outer Joins

### Left Outer Join

Returns all rows from left table, with NULLs for non-matches:

```sql
SELECT c.Name, o.OrderID, o.OrderDate
FROM Customers c
LEFT JOIN Orders o ON c.CustomerID = o.CustomerID;

-- All customers appear
-- Customers without orders have NULL for OrderID, OrderDate
```

Finding rows without matches:

```sql
-- Customers who never ordered
SELECT c.Name
FROM Customers c
LEFT JOIN Orders o ON c.CustomerID = o.CustomerID
WHERE o.OrderID IS NULL;
```

### Right Outer Join

Returns all rows from right table:

```sql
SELECT e.Name, d.DeptName
FROM Employees e
RIGHT JOIN Departments d ON e.DeptID = d.DeptID;

-- All departments appear
-- Departments without employees have NULL for employee columns
```

### Full Outer Join

Returns all rows from both tables:

```sql
SELECT c.Name, o.OrderID
FROM Customers c
FULL OUTER JOIN Orders o ON c.CustomerID = o.CustomerID;

-- All customers appear (even without orders)
-- All orders appear (even orphaned ones)
```

Note: MySQL doesn't support FULL OUTER JOIN directly—simulate with UNION:

```sql
SELECT c.Name, o.OrderID
FROM Customers c
LEFT JOIN Orders o ON c.CustomerID = o.CustomerID
UNION
SELECT c.Name, o.OrderID
FROM Customers c
RIGHT JOIN Orders o ON c.CustomerID = o.CustomerID;
```

## Cross Join

Cartesian product of all rows:

```sql
SELECT * FROM Colors
CROSS JOIN Sizes;

-- If Colors has 5 rows and Sizes has 4 rows
-- Result has 5 × 4 = 20 rows

-- Useful for generating combinations
SELECT
    d.Date,
    p.ProductID,
    COALESCE(s.Quantity, 0) AS QuantitySold
FROM Dates d
CROSS JOIN Products p
LEFT JOIN Sales s ON d.Date = s.SaleDate AND p.ProductID = s.ProductID;
```

## Self Join

Join a table to itself:

```sql
-- Employees and their managers
SELECT
    e.Name AS Employee,
    m.Name AS Manager
FROM Employees e
LEFT JOIN Employees m ON e.ManagerID = m.EmpID;

-- Colleagues in same department
SELECT DISTINCT
    e1.Name AS Employee1,
    e2.Name AS Employee2
FROM Employees e1
JOIN Employees e2 ON e1.DeptID = e2.DeptID AND e1.EmpID < e2.EmpID;
```

## Natural Join

Automatically joins on columns with same name:

```sql
SELECT * FROM Customers NATURAL JOIN Orders;

-- Equivalent to:
SELECT * FROM Customers c
JOIN Orders o ON c.CustomerID = o.CustomerID;

-- Caution: Can join on unintended columns
-- If both tables have 'Name' column, it joins on that too!
```

## Using Clause

Join on columns with same name explicitly:

```sql
SELECT * FROM Customers
JOIN Orders USING (CustomerID);

-- Cleaner than ON when column names match
-- Column appears once in result (unlike ON)
```

## Join Optimization

### Join Order

The optimizer chooses join order, but you can influence it:

```sql
-- Filter before joining (usually done automatically)
SELECT *
FROM (SELECT * FROM Orders WHERE OrderDate > '2024-01-01') o
JOIN Customers c ON o.CustomerID = c.CustomerID;
```

### Index Usage

Ensure join columns are indexed:

```sql
CREATE INDEX idx_orders_customer ON Orders(CustomerID);

-- Now joins on CustomerID use index
```

### Join Algorithms

The database chooses among:
- **Nested Loop**: Good for small tables, indexed joins
- **Hash Join**: Good for large tables, equality joins
- **Sort-Merge Join**: Good for sorted data, range joins

## Common Patterns

### Many-to-Many Through Junction Table

```sql
-- Students <-> Courses through Enrollments
SELECT s.Name, c.Title, e.Grade
FROM Students s
JOIN Enrollments e ON s.StudentID = e.StudentID
JOIN Courses c ON e.CourseID = c.CourseID;
```

### Hierarchical Data

```sql
-- Multi-level hierarchy with recursive CTE
WITH RECURSIVE OrgTree AS (
    SELECT EmpID, Name, ManagerID, 1 as Level
    FROM Employees WHERE ManagerID IS NULL

    UNION ALL

    SELECT e.EmpID, e.Name, e.ManagerID, t.Level + 1
    FROM Employees e
    JOIN OrgTree t ON e.ManagerID = t.EmpID
)
SELECT * FROM OrgTree ORDER BY Level;
```

### Finding Missing Relationships

```sql
-- Products never ordered
SELECT p.ProductID, p.Name
FROM Products p
LEFT JOIN OrderItems oi ON p.ProductID = oi.ProductID
WHERE oi.ProductID IS NULL;

-- Customers without recent orders
SELECT c.CustomerID, c.Name
FROM Customers c
LEFT JOIN Orders o ON c.CustomerID = o.CustomerID
    AND o.OrderDate > DATE_SUB(CURRENT_DATE, INTERVAL 1 YEAR)
WHERE o.OrderID IS NULL;
```

## Join Pitfalls

### Cartesian Product by Mistake

```sql
-- Missing join condition creates huge result
SELECT * FROM Orders, OrderItems;  -- WRONG!

-- Fix: Add join condition
SELECT * FROM Orders o
JOIN OrderItems oi ON o.OrderID = oi.OrderID;
```

### Multiple Matches Causing Duplication

```sql
-- If customer has multiple orders, customer data repeats
SELECT c.*, o.*
FROM Customers c
JOIN Orders o ON c.CustomerID = o.CustomerID;

-- If you only want customer data once, aggregate
SELECT c.*, COUNT(o.OrderID) AS OrderCount
FROM Customers c
LEFT JOIN Orders o ON c.CustomerID = o.CustomerID
GROUP BY c.CustomerID;
```

### Null Handling in Joins

```sql
-- NULL values never match in joins
-- Customer with NULL RegionID won't match any region
SELECT c.Name, r.RegionName
FROM Customers c
JOIN Regions r ON c.RegionID = r.RegionID;  -- NULLs excluded

-- To include NULLs:
SELECT c.Name, r.RegionName
FROM Customers c
LEFT JOIN Regions r ON c.RegionID = r.RegionID;
```

