---
id: cs205-t7-rewriting
title: "Query Rewriting"
order: 4
---

# Query Rewriting

Query rewriting transforms queries into equivalent but more efficient forms. Both the optimizer and developers can apply rewriting techniques.

## Predicate Pushdown

### Concept

```
Move predicates (WHERE conditions) as close to data sources as possible.

Before:
SELECT * FROM (
    SELECT * FROM Orders JOIN Customers ON ...
) WHERE Status = 'Pending';

After (pushed down):
SELECT * FROM
    (SELECT * FROM Orders WHERE Status = 'Pending')
    JOIN Customers ON ...;

Filters fewer rows earlier → less data through pipeline
```

### Examples

```sql
-- Original: Filter after join
SELECT o.*, c.Name
FROM Orders o
JOIN Customers c ON o.CustomerID = c.CustomerID
WHERE o.OrderDate > '2024-01-01';

-- Rewritten: Filter before join
SELECT o.*, c.Name
FROM (SELECT * FROM Orders WHERE OrderDate > '2024-01-01') o
JOIN Customers c ON o.CustomerID = c.CustomerID;

-- Most optimizers do this automatically
-- Important for views and subqueries that might not
```

### View Expansion with Pushdown

```sql
-- View definition
CREATE VIEW RecentOrders AS
SELECT * FROM Orders WHERE OrderDate > '2024-01-01';

-- Query using view
SELECT * FROM RecentOrders WHERE Status = 'Pending';

-- After view expansion and pushdown:
SELECT * FROM Orders
WHERE OrderDate > '2024-01-01' AND Status = 'Pending';
-- Both predicates applied together
```

## Projection Pushdown

### Concept

```
Request only needed columns from lower operators.

Before:
SELECT Name FROM (SELECT * FROM Employees);

After:
SELECT Name FROM (SELECT Name FROM Employees);

Benefits:
- Less I/O (don't read unnecessary columns)
- Less memory (smaller tuples)
- Enables index-only scans
```

### Covering Index Enablement

```sql
-- Original query
SELECT CustomerID, OrderDate FROM Orders WHERE Status = 'Pending';

-- Without projection pushdown:
-- Must read full rows from table

-- With projection pushdown + covering index:
CREATE INDEX idx_status_covering ON Orders(Status) INCLUDE (CustomerID, OrderDate);
-- Index-only scan possible!
```

## Subquery Unnesting

### Correlated Subquery Problem

```sql
-- Correlated subquery (executes once per outer row)
SELECT *
FROM Employees e
WHERE Salary > (
    SELECT AVG(Salary)
    FROM Employees
    WHERE DeptID = e.DeptID
);

-- For each employee: recalculate department average
-- Very inefficient!
```

### Unnested (Decorrelated)

```sql
-- Rewritten with join
SELECT e.*
FROM Employees e
JOIN (
    SELECT DeptID, AVG(Salary) AS AvgSalary
    FROM Employees
    GROUP BY DeptID
) dept_avg ON e.DeptID = dept_avg.DeptID
WHERE e.Salary > dept_avg.AvgSalary;

-- Aggregation computed once, then joined
-- Much more efficient
```

### EXISTS to JOIN

```sql
-- EXISTS subquery
SELECT c.*
FROM Customers c
WHERE EXISTS (
    SELECT 1 FROM Orders o
    WHERE o.CustomerID = c.CustomerID
    AND o.Total > 1000
);

-- Rewritten as semi-join
SELECT DISTINCT c.*
FROM Customers c
JOIN Orders o ON c.CustomerID = o.CustomerID
WHERE o.Total > 1000;

-- Or optimizer may use semi-join internally
```

### IN to JOIN

```sql
-- IN subquery
SELECT * FROM Products
WHERE CategoryID IN (SELECT CategoryID FROM ActiveCategories);

-- Rewritten as join
SELECT DISTINCT p.*
FROM Products p
JOIN ActiveCategories ac ON p.CategoryID = ac.CategoryID;
```

## Join Elimination

### Redundant Join Removal

```sql
-- Join that doesn't contribute to result
SELECT o.OrderID, o.Total
FROM Orders o
JOIN Customers c ON o.CustomerID = c.CustomerID;
-- Customers columns not used!

-- If FK constraint guarantees match exists:
SELECT o.OrderID, o.Total FROM Orders o;
-- Join eliminated!

-- Conditions for elimination:
-- 1. Join result columns not referenced
-- 2. Join doesn't filter rows (FK/PK constraint)
-- 3. Join doesn't duplicate rows (unique key)
```

### View Join Elimination

```sql
-- View with "kitchen sink" joins
CREATE VIEW CustomerOrderView AS
SELECT c.*, o.*, p.*, s.*
FROM Customers c
JOIN Orders o ON c.CustomerID = o.CustomerID
JOIN OrderItems i ON o.OrderID = i.OrderID
JOIN Products p ON i.ProductID = p.ProductID
LEFT JOIN Suppliers s ON p.SupplierID = s.SupplierID;

-- Query only needs customer info
SELECT CustomerName FROM CustomerOrderView WHERE CustomerID = 1;

-- Smart optimizer eliminates unnecessary joins
SELECT CustomerName FROM Customers WHERE CustomerID = 1;
```

## Constant Folding

### Compile-Time Evaluation

```sql
-- Before
SELECT * FROM Orders WHERE 1 = 1;
-- After
SELECT * FROM Orders;  -- Always true, remove predicate

-- Before
SELECT * FROM Orders WHERE 1 = 0;
-- After
-- Returns empty result immediately

-- Before
SELECT * FROM Orders WHERE OrderDate > '2024-01-01' + INTERVAL '30 days';
-- After
SELECT * FROM Orders WHERE OrderDate > '2024-01-31';
```

### Expression Simplification

```sql
-- Before
SELECT * FROM Products WHERE Price * 1 > 100;
-- After
SELECT * FROM Products WHERE Price > 100;

-- Before
SELECT * FROM Items WHERE Quantity + 0 = 5;
-- After
SELECT * FROM Items WHERE Quantity = 5;

-- Before
SELECT COALESCE(Name, Name) FROM Products;
-- After
SELECT Name FROM Products;
```

## Predicate Transformation

### Boolean Optimization

```sql
-- De Morgan's Law application
WHERE NOT (A = 1 OR B = 2)
-- Transforms to:
WHERE A != 1 AND B != 2

-- Contradiction elimination
WHERE Status = 'Active' AND Status = 'Inactive'
-- Transforms to:
WHERE FALSE  -- Empty result
```

### Range Consolidation

```sql
-- Before
WHERE Price > 100 AND Price > 200
-- After
WHERE Price > 200

-- Before
WHERE Date >= '2024-01-01' AND Date <= '2024-12-31'
-- After
WHERE Date BETWEEN '2024-01-01' AND '2024-12-31'
```

### LIKE Optimization

```sql
-- Prefix pattern: Can use index
WHERE Name LIKE 'John%'
-- Converts to range: Name >= 'John' AND Name < 'Joho'

-- Suffix pattern: Cannot use B-tree index
WHERE Name LIKE '%son'
-- Requires full scan or specialized index (trigram)
```

## Group By Optimization

### Grouping Simplification

```sql
-- Redundant grouping columns
SELECT DeptID, DeptName, COUNT(*)
FROM Employees
GROUP BY DeptID, DeptName;

-- If DeptID → DeptName (functional dependency):
SELECT DeptID, DeptName, COUNT(*)
FROM Employees
GROUP BY DeptID;  -- DeptName derived
```

### Group By Pushdown

```sql
-- Original
SELECT c.Region, SUM(o.Total)
FROM Customers c
JOIN Orders o ON c.CustomerID = o.CustomerID
GROUP BY c.Region;

-- Pushed down (partial aggregation)
SELECT c.Region, SUM(order_totals.CustomerTotal)
FROM Customers c
JOIN (
    SELECT CustomerID, SUM(Total) AS CustomerTotal
    FROM Orders
    GROUP BY CustomerID
) order_totals ON c.CustomerID = order_totals.CustomerID
GROUP BY c.Region;

-- Pre-aggregate before join reduces intermediate rows
```

## UNION Optimization

### UNION to UNION ALL

```sql
-- If we know no duplicates exist:
SELECT CustomerID FROM ActiveCustomers
UNION
SELECT CustomerID FROM PremiumCustomers;

-- Can be rewritten as (if sets are disjoint):
SELECT CustomerID FROM ActiveCustomers
UNION ALL
SELECT CustomerID FROM PremiumCustomers;

-- UNION ALL avoids expensive sort/distinct operation
```

### Predicate into UNION

```sql
-- Before
SELECT * FROM (
    SELECT * FROM Orders2023
    UNION ALL
    SELECT * FROM Orders2024
) all_orders
WHERE Status = 'Pending';

-- After
SELECT * FROM Orders2023 WHERE Status = 'Pending'
UNION ALL
SELECT * FROM Orders2024 WHERE Status = 'Pending';

-- Filters applied to each branch separately
```

## Manual Rewriting Tips

```sql
-- 1. Replace NOT IN with NOT EXISTS (NULL-safe)
WHERE CustomerID NOT IN (SELECT CustomerID FROM Blacklist)
-- Better:
WHERE NOT EXISTS (SELECT 1 FROM Blacklist b WHERE b.CustomerID = c.CustomerID)

-- 2. Replace DISTINCT with EXISTS (for semi-join)
SELECT DISTINCT c.* FROM Customers c JOIN Orders o ...
-- Better:
SELECT c.* FROM Customers c WHERE EXISTS (SELECT 1 FROM Orders o ...)

-- 3. Avoid functions on indexed columns
WHERE YEAR(OrderDate) = 2024
-- Better:
WHERE OrderDate >= '2024-01-01' AND OrderDate < '2025-01-01'

-- 4. Use UNION ALL when possible
-- Only use UNION when deduplication is actually needed
```

