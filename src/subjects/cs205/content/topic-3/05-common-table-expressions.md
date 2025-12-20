---
id: cs205-t3-cte
title: "Common Table Expressions"
order: 5
---

# Common Table Expressions (CTEs)

CTEs provide a way to define temporary named result sets within a query. They improve readability, enable recursion, and can simplify complex queries.

## Basic CTE Syntax

```sql
WITH cte_name AS (
    SELECT ...
)
SELECT * FROM cte_name;
```

### Simple Example

```sql
-- Without CTE
SELECT * FROM (
    SELECT DeptID, AVG(Salary) AS AvgSalary
    FROM Employees
    GROUP BY DeptID
) dept_stats
WHERE AvgSalary > 50000;

-- With CTE (more readable)
WITH DeptStats AS (
    SELECT DeptID, AVG(Salary) AS AvgSalary
    FROM Employees
    GROUP BY DeptID
)
SELECT * FROM DeptStats WHERE AvgSalary > 50000;
```

## Multiple CTEs

Chain multiple CTEs separated by commas:

```sql
WITH
CustomerOrders AS (
    SELECT CustomerID, COUNT(*) AS OrderCount, SUM(Total) AS TotalSpent
    FROM Orders
    GROUP BY CustomerID
),
CustomerCategories AS (
    SELECT
        CustomerID,
        OrderCount,
        TotalSpent,
        CASE
            WHEN TotalSpent > 10000 THEN 'Platinum'
            WHEN TotalSpent > 5000 THEN 'Gold'
            WHEN TotalSpent > 1000 THEN 'Silver'
            ELSE 'Bronze'
        END AS Category
    FROM CustomerOrders
)
SELECT c.Name, cc.Category, cc.TotalSpent
FROM Customers c
JOIN CustomerCategories cc ON c.CustomerID = cc.CustomerID
ORDER BY cc.TotalSpent DESC;
```

### Referencing Previous CTEs

Each CTE can reference previously defined CTEs:

```sql
WITH
Sales2023 AS (
    SELECT ProductID, SUM(Quantity) AS Qty2023
    FROM OrderItems
    WHERE YEAR(OrderDate) = 2023
    GROUP BY ProductID
),
Sales2024 AS (
    SELECT ProductID, SUM(Quantity) AS Qty2024
    FROM OrderItems
    WHERE YEAR(OrderDate) = 2024
    GROUP BY ProductID
),
SalesComparison AS (
    SELECT
        COALESCE(s23.ProductID, s24.ProductID) AS ProductID,
        COALESCE(s23.Qty2023, 0) AS Qty2023,
        COALESCE(s24.Qty2024, 0) AS Qty2024
    FROM Sales2023 s23
    FULL OUTER JOIN Sales2024 s24 ON s23.ProductID = s24.ProductID
)
SELECT
    p.Name,
    sc.Qty2023,
    sc.Qty2024,
    sc.Qty2024 - sc.Qty2023 AS Change
FROM Products p
JOIN SalesComparison sc ON p.ProductID = sc.ProductID
ORDER BY Change DESC;
```

## Recursive CTEs

Enable hierarchical and graph traversal queries:

### Syntax

```sql
WITH RECURSIVE cte_name AS (
    -- Anchor member (base case)
    SELECT ...

    UNION ALL

    -- Recursive member (references cte_name)
    SELECT ...
    FROM cte_name
    WHERE termination_condition
)
SELECT * FROM cte_name;
```

### Employee Hierarchy

```sql
WITH RECURSIVE OrgChart AS (
    -- Anchor: Top-level employees (no manager)
    SELECT
        EmpID,
        Name,
        ManagerID,
        1 AS Level,
        Name AS Path
    FROM Employees
    WHERE ManagerID IS NULL

    UNION ALL

    -- Recursive: Employees with managers in the CTE
    SELECT
        e.EmpID,
        e.Name,
        e.ManagerID,
        oc.Level + 1,
        oc.Path || ' > ' || e.Name
    FROM Employees e
    JOIN OrgChart oc ON e.ManagerID = oc.EmpID
)
SELECT * FROM OrgChart ORDER BY Level, Name;
```

### Bill of Materials (BOM)

```sql
-- Parts that make up a product
WITH RECURSIVE BOM AS (
    -- Base product
    SELECT
        ProductID,
        ComponentID,
        Quantity,
        1 AS Level
    FROM ProductComponents
    WHERE ProductID = 1001

    UNION ALL

    -- Components of components
    SELECT
        pc.ProductID,
        pc.ComponentID,
        bom.Quantity * pc.Quantity,
        bom.Level + 1
    FROM ProductComponents pc
    JOIN BOM bom ON pc.ProductID = bom.ComponentID
)
SELECT
    c.Name AS Component,
    SUM(bom.Quantity) AS TotalQuantity
FROM BOM bom
JOIN Components c ON bom.ComponentID = c.ComponentID
GROUP BY c.Name;
```

### Graph Traversal

```sql
-- Find all paths between two nodes
WITH RECURSIVE Paths AS (
    SELECT
        StartNode AS CurrentNode,
        EndNode,
        ARRAY[StartNode, EndNode] AS Path,
        1 AS Length
    FROM Edges
    WHERE StartNode = 'A'

    UNION ALL

    SELECT
        p.CurrentNode,
        e.EndNode,
        p.Path || e.EndNode,
        p.Length + 1
    FROM Paths p
    JOIN Edges e ON p.EndNode = e.StartNode
    WHERE NOT e.EndNode = ANY(p.Path)  -- Prevent cycles
      AND p.Length < 10                 -- Limit depth
)
SELECT * FROM Paths WHERE EndNode = 'Z';
```

### Number Sequences

```sql
-- Generate numbers 1 to 100
WITH RECURSIVE Numbers AS (
    SELECT 1 AS n
    UNION ALL
    SELECT n + 1 FROM Numbers WHERE n < 100
)
SELECT * FROM Numbers;

-- Generate date range
WITH RECURSIVE DateRange AS (
    SELECT DATE '2024-01-01' AS Date
    UNION ALL
    SELECT Date + INTERVAL '1 day'
    FROM DateRange
    WHERE Date < DATE '2024-12-31'
)
SELECT * FROM DateRange;
```

## CTE Best Practices

### Readability

```sql
-- Break complex queries into logical steps
WITH
-- Step 1: Get active customers
ActiveCustomers AS (
    SELECT CustomerID, Name
    FROM Customers
    WHERE Status = 'Active'
),
-- Step 2: Calculate customer metrics
CustomerMetrics AS (
    SELECT
        c.CustomerID,
        c.Name,
        COUNT(o.OrderID) AS OrderCount,
        SUM(o.Total) AS TotalSpent
    FROM ActiveCustomers c
    LEFT JOIN Orders o ON c.CustomerID = o.CustomerID
    GROUP BY c.CustomerID, c.Name
),
-- Step 3: Rank customers
RankedCustomers AS (
    SELECT *,
        RANK() OVER (ORDER BY TotalSpent DESC) AS SpendingRank
    FROM CustomerMetrics
)
-- Final: Select top customers
SELECT * FROM RankedCustomers WHERE SpendingRank <= 10;
```

### Performance Considerations

CTEs may be materialized or inlined depending on the database:

```sql
-- Some databases materialize CTEs (computed once)
-- Others inline them (substituted into main query)

-- Force materialization (PostgreSQL)
WITH CustomerStats AS MATERIALIZED (
    SELECT CustomerID, SUM(Total) AS TotalSpent
    FROM Orders
    GROUP BY CustomerID
)
SELECT * FROM CustomerStats WHERE TotalSpent > 1000;

-- Hint: If CTE is used once, optimizer often inlines it
-- If used multiple times, may benefit from materialization
```

### Recursion Limits

```sql
-- Prevent infinite loops
-- PostgreSQL
SET max_recursive_iterations = 1000;

-- Or use explicit depth limit
WITH RECURSIVE Tree AS (
    SELECT id, parent_id, 0 AS depth FROM nodes WHERE parent_id IS NULL
    UNION ALL
    SELECT n.id, n.parent_id, t.depth + 1
    FROM nodes n
    JOIN Tree t ON n.parent_id = t.id
    WHERE t.depth < 100  -- Explicit limit
)
SELECT * FROM Tree;
```

## CTE vs Subquery

```sql
-- Subquery (inline)
SELECT *
FROM (
    SELECT CustomerID, SUM(Total) AS TotalSpent
    FROM Orders
    GROUP BY CustomerID
) AS CustomerTotals
WHERE TotalSpent > 1000;

-- CTE (named, reusable)
WITH CustomerTotals AS (
    SELECT CustomerID, SUM(Total) AS TotalSpent
    FROM Orders
    GROUP BY CustomerID
)
SELECT * FROM CustomerTotals WHERE TotalSpent > 1000;
```

**Advantages of CTEs**:
- More readable for complex queries
- Can be referenced multiple times
- Support recursion
- Self-documenting with meaningful names

**When subqueries may be better**:
- Simple, single-use cases
- When you need correlated subqueries
- Some databases optimize subqueries differently

## CTE with DML

CTEs can be used with INSERT, UPDATE, DELETE:

```sql
-- Insert from CTE
WITH NewCustomers AS (
    SELECT * FROM StagingCustomers WHERE CreatedDate > '2024-01-01'
)
INSERT INTO Customers (Name, Email)
SELECT Name, Email FROM NewCustomers;

-- Update using CTE
WITH HighValueCustomers AS (
    SELECT CustomerID FROM Orders GROUP BY CustomerID HAVING SUM(Total) > 10000
)
UPDATE Customers
SET Tier = 'Premium'
WHERE CustomerID IN (SELECT CustomerID FROM HighValueCustomers);

-- Delete using CTE
WITH OldOrders AS (
    SELECT OrderID FROM Orders WHERE OrderDate < '2020-01-01'
)
DELETE FROM OrderItems
WHERE OrderID IN (SELECT OrderID FROM OldOrders);
```

## CTE with Returning Clause

```sql
-- PostgreSQL: Use CTE with RETURNING
WITH DeletedOrders AS (
    DELETE FROM Orders
    WHERE OrderDate < '2020-01-01'
    RETURNING *
)
INSERT INTO ArchivedOrders SELECT * FROM DeletedOrders;
```

