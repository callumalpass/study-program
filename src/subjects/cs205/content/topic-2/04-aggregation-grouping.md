# Aggregation and Grouping

Aggregate functions compute summary values across rows. Combined with GROUP BY, they enable powerful analytical queries.

## Aggregate Functions

### COUNT

```sql
-- Count all rows
SELECT COUNT(*) FROM Orders;

-- Count non-NULL values
SELECT COUNT(ShipDate) FROM Orders;  -- Excludes NULLs

-- Count distinct values
SELECT COUNT(DISTINCT CustomerID) FROM Orders;

-- Count with condition
SELECT COUNT(CASE WHEN Status = 'Shipped' THEN 1 END) AS ShippedCount
FROM Orders;
```

### SUM

```sql
-- Total of all values
SELECT SUM(Amount) AS TotalRevenue FROM Orders;

-- Sum with condition
SELECT SUM(CASE WHEN Category = 'Electronics' THEN Amount ELSE 0 END) AS ElectronicsRevenue
FROM Orders;

-- Sum ignores NULLs
SELECT SUM(Bonus) FROM Employees;  -- NULLs treated as 0
```

### AVG

```sql
-- Average value
SELECT AVG(Salary) AS AverageSalary FROM Employees;

-- Average ignores NULLs
SELECT AVG(Rating) FROM Products;  -- Only counts rows with ratings

-- Include NULLs as zeros
SELECT AVG(COALESCE(Bonus, 0)) FROM Employees;
```

### MIN and MAX

```sql
-- Minimum and maximum
SELECT MIN(Price), MAX(Price) FROM Products;
SELECT MIN(OrderDate), MAX(OrderDate) FROM Orders;
SELECT MIN(Name), MAX(Name) FROM Customers;  -- Alphabetical

-- Combined with other aggregates
SELECT
    COUNT(*) AS ProductCount,
    MIN(Price) AS LowestPrice,
    MAX(Price) AS HighestPrice,
    AVG(Price) AS AveragePrice
FROM Products;
```

### Statistical Functions

```sql
-- Standard deviation
SELECT STDDEV(Salary) FROM Employees;
SELECT STDDEV_POP(Salary) FROM Employees;  -- Population
SELECT STDDEV_SAMP(Salary) FROM Employees; -- Sample

-- Variance
SELECT VARIANCE(Salary) FROM Employees;
SELECT VAR_POP(Salary), VAR_SAMP(Salary) FROM Employees;
```

### String Aggregation

```sql
-- Concatenate values (syntax varies)

-- PostgreSQL
SELECT STRING_AGG(Name, ', ') FROM Products WHERE Category = 'Electronics';

-- MySQL
SELECT GROUP_CONCAT(Name SEPARATOR ', ') FROM Products WHERE Category = 'Electronics';

-- SQL Server
SELECT STRING_AGG(Name, ', ') FROM Products WHERE Category = 'Electronics';
```

## GROUP BY Clause

### Basic Grouping

```sql
-- Count orders per customer
SELECT CustomerID, COUNT(*) AS OrderCount
FROM Orders
GROUP BY CustomerID;

-- Average salary per department
SELECT DeptID, AVG(Salary) AS AvgSalary
FROM Employees
GROUP BY DeptID;

-- Total sales by category
SELECT Category, SUM(Price * Quantity) AS TotalSales
FROM OrderItems oi
JOIN Products p ON oi.ProductID = p.ProductID
GROUP BY Category;
```

### Multiple Grouping Columns

```sql
-- Sales by year and month
SELECT
    EXTRACT(YEAR FROM OrderDate) AS Year,
    EXTRACT(MONTH FROM OrderDate) AS Month,
    SUM(Amount) AS MonthlyRevenue
FROM Orders
GROUP BY EXTRACT(YEAR FROM OrderDate), EXTRACT(MONTH FROM OrderDate)
ORDER BY Year, Month;

-- Count by department and job title
SELECT DeptID, Title, COUNT(*) AS EmpCount
FROM Employees
GROUP BY DeptID, Title
ORDER BY DeptID, EmpCount DESC;
```

### GROUP BY Rules

All non-aggregated columns in SELECT must appear in GROUP BY:

```sql
-- Error: Name not in GROUP BY
SELECT DeptID, Name, AVG(Salary) FROM Employees GROUP BY DeptID;

-- Correct: Include Name in GROUP BY
SELECT DeptID, Name, AVG(Salary) FROM Employees GROUP BY DeptID, Name;

-- Or: Don't select Name
SELECT DeptID, AVG(Salary) FROM Employees GROUP BY DeptID;
```

### GROUP BY with Expressions

```sql
-- Group by calculated value
SELECT
    CASE
        WHEN Price < 50 THEN 'Budget'
        WHEN Price < 200 THEN 'Mid-range'
        ELSE 'Premium'
    END AS PriceRange,
    COUNT(*) AS ProductCount
FROM Products
GROUP BY CASE
    WHEN Price < 50 THEN 'Budget'
    WHEN Price < 200 THEN 'Mid-range'
    ELSE 'Premium'
END;

-- Group by date part
SELECT DATE_TRUNC('month', OrderDate) AS Month, SUM(Amount)
FROM Orders
GROUP BY DATE_TRUNC('month', OrderDate);
```

## HAVING Clause

### Filtering Groups

HAVING filters groups after aggregation (WHERE filters rows before):

```sql
-- Customers with more than 5 orders
SELECT CustomerID, COUNT(*) AS OrderCount
FROM Orders
GROUP BY CustomerID
HAVING COUNT(*) > 5;

-- Departments with average salary > 60000
SELECT DeptID, AVG(Salary) AS AvgSalary
FROM Employees
GROUP BY DeptID
HAVING AVG(Salary) > 60000;
```

### WHERE vs HAVING

```sql
-- WHERE: Filter rows before grouping
SELECT Category, AVG(Price) AS AvgPrice
FROM Products
WHERE InStock = TRUE  -- Filter before grouping
GROUP BY Category;

-- HAVING: Filter groups after grouping
SELECT Category, AVG(Price) AS AvgPrice
FROM Products
GROUP BY Category
HAVING AVG(Price) > 100;  -- Filter after grouping

-- Combined
SELECT Category, AVG(Price) AS AvgPrice
FROM Products
WHERE InStock = TRUE       -- Only in-stock products
GROUP BY Category
HAVING AVG(Price) > 100;   -- Only categories with avg > 100
```

### Complex HAVING Conditions

```sql
-- Multiple conditions
SELECT CustomerID, COUNT(*), SUM(Amount)
FROM Orders
GROUP BY CustomerID
HAVING COUNT(*) >= 5 AND SUM(Amount) > 1000;

-- Using aggregate in comparison
SELECT DeptID, AVG(Salary) AS AvgSalary
FROM Employees
GROUP BY DeptID
HAVING AVG(Salary) > (SELECT AVG(Salary) FROM Employees);
```

## Advanced Grouping

### ROLLUP

Generates subtotals and grand total:

```sql
SELECT
    COALESCE(Category, 'TOTAL') AS Category,
    COALESCE(CAST(Year AS VARCHAR), 'ALL') AS Year,
    SUM(Sales) AS TotalSales
FROM SalesData
GROUP BY ROLLUP(Category, Year);

-- Results:
-- Category    Year    TotalSales
-- Electronics 2023    50000
-- Electronics 2024    60000
-- Electronics ALL     110000      <- Subtotal for Electronics
-- Clothing    2023    30000
-- Clothing    2024    35000
-- Clothing    ALL     65000       <- Subtotal for Clothing
-- TOTAL       ALL     175000      <- Grand total
```

### CUBE

Generates all possible subtotals:

```sql
SELECT Category, Region, SUM(Sales)
FROM SalesData
GROUP BY CUBE(Category, Region);

-- Produces:
-- All combinations: (Category, Region), (Category), (Region), ()
```

### GROUPING SETS

Specify exact grouping combinations:

```sql
SELECT Category, Region, SUM(Sales)
FROM SalesData
GROUP BY GROUPING SETS (
    (Category, Region),  -- Group by both
    (Category),          -- Subtotal by category
    (Region),            -- Subtotal by region
    ()                   -- Grand total
);
```

### GROUPING Function

Identify which rows are subtotals:

```sql
SELECT
    CASE WHEN GROUPING(Category) = 1 THEN 'All Categories' ELSE Category END AS Category,
    CASE WHEN GROUPING(Region) = 1 THEN 'All Regions' ELSE Region END AS Region,
    SUM(Sales) AS TotalSales
FROM SalesData
GROUP BY ROLLUP(Category, Region);
```

## Practical Examples

### Top N Per Group

```sql
-- Top 3 products per category by sales
WITH RankedProducts AS (
    SELECT
        Category,
        ProductName,
        TotalSales,
        ROW_NUMBER() OVER (PARTITION BY Category ORDER BY TotalSales DESC) AS Rank
    FROM (
        SELECT p.Category, p.Name AS ProductName, SUM(oi.Quantity * oi.Price) AS TotalSales
        FROM Products p
        JOIN OrderItems oi ON p.ProductID = oi.ProductID
        GROUP BY p.Category, p.Name
    ) ProductSales
)
SELECT Category, ProductName, TotalSales
FROM RankedProducts
WHERE Rank <= 3;
```

### Running Totals

```sql
SELECT
    OrderDate,
    Amount,
    SUM(Amount) OVER (ORDER BY OrderDate) AS RunningTotal
FROM Orders;
```

### Percentage of Total

```sql
SELECT
    Category,
    SUM(Sales) AS CategorySales,
    ROUND(100.0 * SUM(Sales) / (SELECT SUM(Sales) FROM SalesData), 2) AS Percentage
FROM SalesData
GROUP BY Category;
```

### Year-over-Year Comparison

```sql
SELECT
    Category,
    SUM(CASE WHEN Year = 2023 THEN Sales END) AS Sales2023,
    SUM(CASE WHEN Year = 2024 THEN Sales END) AS Sales2024,
    ROUND(100.0 * (SUM(CASE WHEN Year = 2024 THEN Sales END) -
                   SUM(CASE WHEN Year = 2023 THEN Sales END)) /
                   NULLIF(SUM(CASE WHEN Year = 2023 THEN Sales END), 0), 2) AS GrowthPct
FROM SalesData
WHERE Year IN (2023, 2024)
GROUP BY Category;
```

## Common Mistakes

### Selecting Non-Grouped Columns

```sql
-- Error in standard SQL
SELECT CustomerID, Name, COUNT(*)
FROM Orders o
JOIN Customers c ON o.CustomerID = c.CustomerID
GROUP BY CustomerID;  -- Name not in GROUP BY

-- Fix: Add to GROUP BY or use aggregate
SELECT c.CustomerID, c.Name, COUNT(*)
FROM Orders o
JOIN Customers c ON o.CustomerID = c.CustomerID
GROUP BY c.CustomerID, c.Name;
```

### Using WHERE Instead of HAVING

```sql
-- Wrong: Can't use aggregate in WHERE
SELECT DeptID, AVG(Salary)
FROM Employees
WHERE AVG(Salary) > 50000  -- Error!
GROUP BY DeptID;

-- Correct: Use HAVING
SELECT DeptID, AVG(Salary)
FROM Employees
GROUP BY DeptID
HAVING AVG(Salary) > 50000;
```

### COUNT(*) vs COUNT(column)

```sql
-- COUNT(*) counts all rows including NULLs
SELECT COUNT(*) FROM Employees;  -- 100 rows

-- COUNT(column) excludes NULLs
SELECT COUNT(ManagerID) FROM Employees;  -- 95 (5 have NULL manager)
```

