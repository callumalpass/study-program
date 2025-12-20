---
id: cs205-t3-patterns
title: "Query Patterns"
order: 7
---

# Common SQL Query Patterns

Every database developer encounters recurring query challenges that follow predictable patterns. Mastering these common patterns provides a toolkit for solving typical data retrieval problems efficiently. This guide covers essential query patterns that appear frequently in real-world database applications.

## Existence Checking Patterns

### Finding Records That Match Another Set

Three approaches with different performance characteristics:

**Using IN Subquery:**
```sql
-- Find customers who have placed orders
SELECT *
FROM Customers
WHERE CustomerID IN (SELECT DISTINCT CustomerID FROM Orders);
```

**Using EXISTS:**
```sql
-- Generally more efficient for large datasets
SELECT *
FROM Customers c
WHERE EXISTS (
    SELECT 1 FROM Orders o
    WHERE o.CustomerID = c.CustomerID
);
```

**Using JOIN:**
```sql
SELECT DISTINCT c.*
FROM Customers c
JOIN Orders o ON c.CustomerID = o.CustomerID;
```

### Finding Records That Don't Match (Anti-Join)

**Using NOT IN:**
```sql
-- Caution: NULL values in subquery cause unexpected results
SELECT *
FROM Products
WHERE ProductID NOT IN (
    SELECT ProductID FROM OrderItems WHERE ProductID IS NOT NULL
);
```

**Using NOT EXISTS (safer):**
```sql
SELECT *
FROM Products p
WHERE NOT EXISTS (
    SELECT 1 FROM OrderItems oi
    WHERE oi.ProductID = p.ProductID
);
```

**Using LEFT JOIN with NULL check:**
```sql
SELECT p.*
FROM Products p
LEFT JOIN OrderItems oi ON p.ProductID = oi.ProductID
WHERE oi.ProductID IS NULL;
```

## Set Comparison Patterns

### All vs Any Comparisons

```sql
-- Products priced higher than ALL products in category 'Electronics'
SELECT *
FROM Products
WHERE Price > ALL (
    SELECT Price FROM Products WHERE Category = 'Electronics'
);

-- Products priced higher than ANY (at least one) product in 'Electronics'
SELECT *
FROM Products
WHERE Price > ANY (
    SELECT Price FROM Products WHERE Category = 'Electronics'
);
```

### Division - "For All" Queries

Find entities related to ALL items in another set:

```sql
-- Students enrolled in ALL required courses
WITH RequiredCourses AS (
    SELECT CourseID FROM Courses WHERE IsRequired = TRUE
)
SELECT s.StudentID, s.Name
FROM Students s
WHERE NOT EXISTS (
    SELECT CourseID FROM RequiredCourses
    EXCEPT
    SELECT CourseID FROM Enrollments e
    WHERE e.StudentID = s.StudentID
);
```

Alternative using COUNT:
```sql
SELECT s.StudentID, s.Name
FROM Students s
JOIN Enrollments e ON s.StudentID = e.StudentID
JOIN Courses c ON e.CourseID = c.CourseID AND c.IsRequired = TRUE
GROUP BY s.StudentID, s.Name
HAVING COUNT(DISTINCT e.CourseID) = (
    SELECT COUNT(*) FROM Courses WHERE IsRequired = TRUE
);
```

## Gap and Island Detection

### Finding Gaps in Sequences

```sql
-- Find missing OrderIDs in a sequence
WITH OrderSequence AS (
    SELECT OrderID,
           LEAD(OrderID) OVER (ORDER BY OrderID) AS NextOrderID
    FROM Orders
)
SELECT OrderID + 1 AS GapStart,
       NextOrderID - 1 AS GapEnd
FROM OrderSequence
WHERE NextOrderID - OrderID > 1;
```

### Finding Islands (Consecutive Groups)

```sql
-- Group consecutive dates of activity
WITH ActivityGroups AS (
    SELECT
        UserID,
        ActivityDate,
        ActivityDate - CAST(
            ROW_NUMBER() OVER (PARTITION BY UserID ORDER BY ActivityDate)
            AS INTEGER
        ) AS GroupID
    FROM UserActivity
)
SELECT
    UserID,
    MIN(ActivityDate) AS StartDate,
    MAX(ActivityDate) AS EndDate,
    COUNT(*) AS ConsecutiveDays
FROM ActivityGroups
GROUP BY UserID, GroupID
ORDER BY UserID, StartDate;
```

## Duplicate Handling

### Finding Duplicate Records

```sql
-- Find duplicate emails
SELECT Email, COUNT(*) AS Occurrences
FROM Customers
GROUP BY Email
HAVING COUNT(*) > 1;

-- Show all records with duplicates
SELECT *
FROM Customers
WHERE Email IN (
    SELECT Email FROM Customers
    GROUP BY Email
    HAVING COUNT(*) > 1
)
ORDER BY Email;
```

### Keeping One Record, Removing Duplicates

```sql
-- Delete duplicates keeping lowest ID
DELETE FROM Customers
WHERE CustomerID NOT IN (
    SELECT MIN(CustomerID)
    FROM Customers
    GROUP BY Email
);

-- Using window functions (more control)
WITH RankedDuplicates AS (
    SELECT CustomerID,
           ROW_NUMBER() OVER (PARTITION BY Email ORDER BY CustomerID) AS rn
    FROM Customers
)
DELETE FROM Customers
WHERE CustomerID IN (
    SELECT CustomerID FROM RankedDuplicates WHERE rn > 1
);
```

## Running and Moving Calculations

### Running Totals

```sql
SELECT
    OrderDate,
    Amount,
    SUM(Amount) OVER (ORDER BY OrderDate) AS RunningTotal,
    SUM(Amount) OVER (
        ORDER BY OrderDate
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS RunningTotalExplicit
FROM Orders
ORDER BY OrderDate;
```

### Moving Averages

```sql
SELECT
    Date,
    StockPrice,
    AVG(StockPrice) OVER (
        ORDER BY Date
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) AS SevenDayMovingAvg,
    AVG(StockPrice) OVER (
        ORDER BY Date
        ROWS BETWEEN 29 PRECEDING AND CURRENT ROW
    ) AS ThirtyDayMovingAvg
FROM StockPrices;
```

### Year-Over-Year Comparison

```sql
SELECT
    EXTRACT(YEAR FROM OrderDate) AS Year,
    EXTRACT(MONTH FROM OrderDate) AS Month,
    SUM(Amount) AS Revenue,
    LAG(SUM(Amount)) OVER (
        PARTITION BY EXTRACT(MONTH FROM OrderDate)
        ORDER BY EXTRACT(YEAR FROM OrderDate)
    ) AS PrevYearRevenue,
    ROUND(100.0 * (SUM(Amount) - LAG(SUM(Amount)) OVER (
        PARTITION BY EXTRACT(MONTH FROM OrderDate)
        ORDER BY EXTRACT(YEAR FROM OrderDate)
    )) / NULLIF(LAG(SUM(Amount)) OVER (
        PARTITION BY EXTRACT(MONTH FROM OrderDate)
        ORDER BY EXTRACT(YEAR FROM OrderDate)
    ), 0), 2) AS YoYGrowthPct
FROM Orders
GROUP BY EXTRACT(YEAR FROM OrderDate), EXTRACT(MONTH FROM OrderDate)
ORDER BY Year, Month;
```

## Hierarchical Query Patterns

### Recursive Traversal

```sql
-- Employee hierarchy
WITH RECURSIVE EmployeeTree AS (
    -- Anchor: top-level managers
    SELECT EmpID, Name, ManagerID, 1 AS Level, Name::TEXT AS Path
    FROM Employees
    WHERE ManagerID IS NULL

    UNION ALL

    -- Recursive: employees under current level
    SELECT e.EmpID, e.Name, e.ManagerID, t.Level + 1, t.Path || ' > ' || e.Name
    FROM Employees e
    JOIN EmployeeTree t ON e.ManagerID = t.EmpID
)
SELECT * FROM EmployeeTree ORDER BY Path;
```

### Tree Aggregation

```sql
-- Sum sales for each node including all descendants
WITH RECURSIVE CategoryTree AS (
    SELECT CategoryID, Name, ParentID, CategoryID AS RootID
    FROM Categories

    UNION ALL

    SELECT c.CategoryID, c.Name, c.ParentID, t.RootID
    FROM Categories c
    JOIN CategoryTree t ON c.ParentID = t.CategoryID
)
SELECT
    c.CategoryID,
    c.Name,
    SUM(COALESCE(p.Sales, 0)) AS TotalSales
FROM Categories c
LEFT JOIN CategoryTree ct ON ct.RootID = c.CategoryID
LEFT JOIN Products p ON p.CategoryID = ct.CategoryID
GROUP BY c.CategoryID, c.Name;
```

## Pagination Patterns

### Offset-Based Pagination

```sql
-- Page 3 with 20 items per page
SELECT *
FROM Products
ORDER BY ProductID
LIMIT 20 OFFSET 40;  -- Skip first 40 (pages 1 and 2)
```

**Problem**: Performance degrades with large offsets.

### Keyset Pagination (Seek Method)

```sql
-- More efficient for large datasets
-- Page 1
SELECT * FROM Products
ORDER BY ProductID
LIMIT 20;

-- Next page (after ProductID 20)
SELECT * FROM Products
WHERE ProductID > 20
ORDER BY ProductID
LIMIT 20;
```

### Pagination with Total Count

```sql
SELECT *,
       COUNT(*) OVER() AS TotalCount
FROM Products
WHERE Category = 'Electronics'
ORDER BY ProductID
LIMIT 20 OFFSET 0;
```

## Pivoting and Unpivoting

### Row to Column (Pivot)

```sql
-- Monthly sales as columns
SELECT
    ProductID,
    MAX(CASE WHEN Month = 1 THEN Sales END) AS Jan,
    MAX(CASE WHEN Month = 2 THEN Sales END) AS Feb,
    MAX(CASE WHEN Month = 3 THEN Sales END) AS Mar
    -- ... continue for other months
FROM MonthlySales
GROUP BY ProductID;
```

### Column to Row (Unpivot)

```sql
-- Convert quarterly columns to rows
SELECT ProductID, 'Q1' AS Quarter, Q1 AS Sales FROM QuarterlySales WHERE Q1 IS NOT NULL
UNION ALL
SELECT ProductID, 'Q2', Q2 FROM QuarterlySales WHERE Q2 IS NOT NULL
UNION ALL
SELECT ProductID, 'Q3', Q3 FROM QuarterlySales WHERE Q3 IS NOT NULL
UNION ALL
SELECT ProductID, 'Q4', Q4 FROM QuarterlySales WHERE Q4 IS NOT NULL;

-- Using LATERAL (PostgreSQL)
SELECT qs.ProductID, x.Quarter, x.Sales
FROM QuarterlySales qs
CROSS JOIN LATERAL (
    VALUES ('Q1', Q1), ('Q2', Q2), ('Q3', Q3), ('Q4', Q4)
) AS x(Quarter, Sales)
WHERE x.Sales IS NOT NULL;
```

## Conditional Logic Patterns

### Default Values and Fallbacks

```sql
SELECT
    CustomerID,
    COALESCE(PreferredName, FirstName, 'Guest') AS DisplayName,
    COALESCE(MobilePhone, HomePhone, WorkPhone, 'No Phone') AS ContactPhone
FROM Customers;
```

### Multiple Conditions as Rows

```sql
-- Check multiple conditions, return those that fail
SELECT CustomerID, 'Missing Email' AS ValidationError
FROM Customers WHERE Email IS NULL
UNION ALL
SELECT CustomerID, 'Missing Phone'
FROM Customers WHERE Phone IS NULL
UNION ALL
SELECT CustomerID, 'Invalid Status'
FROM Customers WHERE Status NOT IN ('Active', 'Pending', 'Inactive');
```

## Sampling Patterns

### Random Sample

```sql
-- Approximately 10% sample
SELECT * FROM LargeTable
WHERE RANDOM() < 0.1;

-- Exactly N random rows (PostgreSQL)
SELECT * FROM LargeTable
ORDER BY RANDOM()
LIMIT 100;

-- More efficient for very large tables
SELECT * FROM LargeTable TABLESAMPLE SYSTEM(10);  -- 10% of pages
```

### Stratified Sample

```sql
-- Sample from each category proportionally
WITH Sampled AS (
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY Category ORDER BY RANDOM()) AS rn,
           COUNT(*) OVER (PARTITION BY Category) AS CategoryCount
    FROM Products
)
SELECT *
FROM Sampled
WHERE rn <= GREATEST(1, CategoryCount * 0.1);  -- At least 1 per category
```

## Data Quality Patterns

### Finding Orphaned Records

```sql
-- Orders referencing non-existent customers
SELECT o.*
FROM Orders o
LEFT JOIN Customers c ON o.CustomerID = c.CustomerID
WHERE c.CustomerID IS NULL;
```

### Checking Referential Integrity

```sql
-- Find all foreign key violations (before enabling constraints)
SELECT 'Orders->Customers' AS Relationship, COUNT(*) AS Violations
FROM Orders o
LEFT JOIN Customers c ON o.CustomerID = c.CustomerID
WHERE c.CustomerID IS NULL
UNION ALL
SELECT 'OrderItems->Products', COUNT(*)
FROM OrderItems oi
LEFT JOIN Products p ON oi.ProductID = p.ProductID
WHERE p.ProductID IS NULL;
```

These patterns form the foundation of practical SQL development. By recognizing which pattern applies to your problem, you can quickly construct efficient queries that solve common data challenges.
