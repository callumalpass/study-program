---
id: cs205-t3-subqueries
title: "Subqueries"
order: 2
---

# Subqueries

Subqueries (nested queries) are queries within queries. They enable complex data retrieval by breaking problems into logical steps.

## Types of Subqueries

### Scalar Subqueries

Return a single value (one row, one column):

```sql
-- Compare to average
SELECT Name, Salary
FROM Employees
WHERE Salary > (SELECT AVG(Salary) FROM Employees);

-- Use in SELECT
SELECT
    Name,
    Salary,
    (SELECT AVG(Salary) FROM Employees) AS CompanyAvg,
    Salary - (SELECT AVG(Salary) FROM Employees) AS DiffFromAvg
FROM Employees;

-- Use in expressions
SELECT Name, Salary / (SELECT MAX(Salary) FROM Employees) AS SalaryRatio
FROM Employees;
```

### Row Subqueries

Return a single row with multiple columns:

```sql
-- Compare to multiple values
SELECT * FROM Products
WHERE (Category, Price) = (
    SELECT Category, MAX(Price)
    FROM Products
    WHERE Category = 'Electronics'
);

-- PostgreSQL: Return row type
SELECT * FROM Employees
WHERE (DeptID, Title) = (SELECT DeptID, Title FROM Employees WHERE EmpID = 101);
```

### Table Subqueries

Return multiple rows and columns:

```sql
-- Use with IN
SELECT * FROM Customers
WHERE CustomerID IN (SELECT CustomerID FROM Orders WHERE Total > 1000);

-- Use in FROM clause (derived table)
SELECT dept_stats.DeptID, dept_stats.AvgSalary
FROM (
    SELECT DeptID, AVG(Salary) AS AvgSalary
    FROM Employees
    GROUP BY DeptID
) AS dept_stats
WHERE dept_stats.AvgSalary > 60000;
```

## Subquery Locations

### WHERE Clause

Most common location:

```sql
-- With comparison operators
SELECT * FROM Products
WHERE Price > (SELECT AVG(Price) FROM Products);

-- With IN
SELECT * FROM Customers
WHERE CustomerID IN (SELECT DISTINCT CustomerID FROM Orders);

-- With NOT IN
SELECT * FROM Products
WHERE ProductID NOT IN (SELECT ProductID FROM OrderItems);
```

### FROM Clause (Derived Tables)

```sql
-- Create temporary table from subquery
SELECT c.Name, order_stats.TotalOrders, order_stats.TotalSpent
FROM Customers c
JOIN (
    SELECT CustomerID, COUNT(*) AS TotalOrders, SUM(Total) AS TotalSpent
    FROM Orders
    GROUP BY CustomerID
) AS order_stats ON c.CustomerID = order_stats.CustomerID;
```

### SELECT Clause (Scalar Subqueries)

```sql
SELECT
    p.Name,
    p.Price,
    (SELECT COUNT(*) FROM OrderItems WHERE ProductID = p.ProductID) AS TimesOrdered,
    (SELECT SUM(Quantity) FROM OrderItems WHERE ProductID = p.ProductID) AS TotalQuantity
FROM Products p;
```

### HAVING Clause

```sql
SELECT DeptID, AVG(Salary)
FROM Employees
GROUP BY DeptID
HAVING AVG(Salary) > (SELECT AVG(Salary) FROM Employees);
```

## Correlated Subqueries

Reference outer query—executed once per row:

```sql
-- Employees earning above their department average
SELECT e.Name, e.Salary, e.DeptID
FROM Employees e
WHERE e.Salary > (
    SELECT AVG(Salary)
    FROM Employees
    WHERE DeptID = e.DeptID  -- References outer query
);

-- Products with above-average price in their category
SELECT p.Name, p.Price, p.Category
FROM Products p
WHERE p.Price > (
    SELECT AVG(Price)
    FROM Products
    WHERE Category = p.Category
);
```

### Performance Note

Correlated subqueries can be slow—executed for each outer row. Consider rewriting as joins:

```sql
-- Correlated subquery (potentially slow)
SELECT e.Name, e.Salary
FROM Employees e
WHERE e.Salary > (SELECT AVG(Salary) FROM Employees WHERE DeptID = e.DeptID);

-- Rewritten as join (often faster)
SELECT e.Name, e.Salary
FROM Employees e
JOIN (
    SELECT DeptID, AVG(Salary) AS AvgSalary
    FROM Employees
    GROUP BY DeptID
) dept_avg ON e.DeptID = dept_avg.DeptID
WHERE e.Salary > dept_avg.AvgSalary;
```

## EXISTS and NOT EXISTS

Test for existence of rows:

```sql
-- Customers who have placed orders
SELECT * FROM Customers c
WHERE EXISTS (
    SELECT 1 FROM Orders o WHERE o.CustomerID = c.CustomerID
);

-- Customers who have NOT placed orders
SELECT * FROM Customers c
WHERE NOT EXISTS (
    SELECT 1 FROM Orders o WHERE o.CustomerID = c.CustomerID
);

-- Products in all orders (division operation)
SELECT * FROM Products p
WHERE NOT EXISTS (
    SELECT 1 FROM Orders o
    WHERE NOT EXISTS (
        SELECT 1 FROM OrderItems oi
        WHERE oi.OrderID = o.OrderID AND oi.ProductID = p.ProductID
    )
);
```

### EXISTS vs IN

```sql
-- EXISTS: Stops at first match (can be faster)
SELECT * FROM Customers c
WHERE EXISTS (SELECT 1 FROM Orders WHERE CustomerID = c.CustomerID);

-- IN: Collects all values first
SELECT * FROM Customers
WHERE CustomerID IN (SELECT CustomerID FROM Orders);

-- For large subquery results, EXISTS often performs better
-- For small subquery results, IN may be comparable or faster
```

### NULL Handling

```sql
-- IN with NULLs can be tricky
SELECT * FROM Products
WHERE ProductID NOT IN (SELECT ProductID FROM OrderItems);
-- If OrderItems.ProductID contains NULL, no rows returned!

-- EXISTS handles NULLs correctly
SELECT * FROM Products p
WHERE NOT EXISTS (SELECT 1 FROM OrderItems WHERE ProductID = p.ProductID);
```

## ALL and ANY/SOME

Compare to all or any value in subquery:

```sql
-- ALL: Condition must be true for all values
SELECT * FROM Products
WHERE Price > ALL (SELECT Price FROM Products WHERE Category = 'Budget');
-- Products priced higher than ALL budget products

-- ANY/SOME: Condition true for at least one value
SELECT * FROM Products
WHERE Price > ANY (SELECT Price FROM Products WHERE Category = 'Premium');
-- Products priced higher than at least one premium product
```

Common patterns:

```sql
-- Same as MAX
WHERE x > ALL (subquery)  ≡  WHERE x > (SELECT MAX(...) FROM ...)

-- Same as MIN
WHERE x < ALL (subquery)  ≡  WHERE x < (SELECT MIN(...) FROM ...)

-- Same as IN
WHERE x = ANY (subquery)  ≡  WHERE x IN (subquery)
```

## Nested Subqueries

Subqueries within subqueries:

```sql
-- Three levels deep
SELECT * FROM Products
WHERE Category IN (
    SELECT Category FROM Categories
    WHERE CategoryID IN (
        SELECT DISTINCT CategoryID FROM TopSellingProducts
    )
);

-- Simplify with CTEs when possible
WITH TopCategories AS (
    SELECT DISTINCT CategoryID FROM TopSellingProducts
),
CategoryNames AS (
    SELECT Category FROM Categories WHERE CategoryID IN (SELECT * FROM TopCategories)
)
SELECT * FROM Products WHERE Category IN (SELECT * FROM CategoryNames);
```

## Subqueries in UPDATE and DELETE

```sql
-- Update using subquery
UPDATE Employees
SET Salary = Salary * 1.10
WHERE DeptID IN (SELECT DeptID FROM Departments WHERE Performance = 'Excellent');

-- Delete using subquery
DELETE FROM Products
WHERE ProductID NOT IN (SELECT DISTINCT ProductID FROM OrderItems);

-- Correlated update
UPDATE Products p
SET Price = Price * 0.9
WHERE (SELECT SUM(Quantity) FROM OrderItems WHERE ProductID = p.ProductID) < 10;
```

## Subquery vs Join

Many subqueries can be rewritten as joins:

```sql
-- Subquery version
SELECT * FROM Customers
WHERE CustomerID IN (SELECT CustomerID FROM Orders WHERE Total > 500);

-- Join version (often same performance with optimizer)
SELECT DISTINCT c.*
FROM Customers c
JOIN Orders o ON c.CustomerID = o.CustomerID
WHERE o.Total > 500;

-- When to prefer subquery:
-- - More readable for simple conditions
-- - Need to avoid duplicates from multiple matches
-- - Testing for existence

-- When to prefer join:
-- - Need columns from both tables
-- - Multiple conditions across tables
-- - Performance (sometimes)
```

## Best Practices

1. **Keep subqueries simple**: Complex nested subqueries are hard to maintain
2. **Use CTEs for readability**: Break complex queries into named parts
3. **Consider alternatives**: Joins or window functions may be clearer
4. **Test performance**: Check execution plans for large datasets
5. **Handle NULLs carefully**: Especially with NOT IN

