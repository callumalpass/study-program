---
id: cs205-t3-aggregation
title: "Advanced Aggregation"
order: 6
---

# Advanced Aggregation Techniques

While basic aggregation with GROUP BY covers most common use cases, SQL provides sophisticated aggregation capabilities for complex analytical queries. This guide explores advanced techniques including grouping sets, cube, rollup, and specialized aggregation patterns that enable powerful data summarization and analysis.

## Beyond Basic GROUP BY

Standard GROUP BY creates one group for each unique combination of grouping columns. Advanced aggregation allows multiple grouping levels in a single query.

### GROUPING SETS

GROUPING SETS allows you to specify exactly which groupings to compute:

```sql
SELECT
    Region,
    Category,
    SUM(Sales) AS TotalSales
FROM SalesData
GROUP BY GROUPING SETS (
    (Region, Category),  -- Group by both
    (Region),            -- Group by region only
    (Category),          -- Group by category only
    ()                   -- Grand total
);
```

Result includes rows for:
- Each Region + Category combination
- Subtotals for each Region (Category is NULL)
- Subtotals for each Category (Region is NULL)
- Grand total (both are NULL)

**Equivalent using UNION ALL (less efficient):**
```sql
SELECT Region, Category, SUM(Sales) FROM SalesData GROUP BY Region, Category
UNION ALL
SELECT Region, NULL, SUM(Sales) FROM SalesData GROUP BY Region
UNION ALL
SELECT NULL, Category, SUM(Sales) FROM SalesData GROUP BY Category
UNION ALL
SELECT NULL, NULL, SUM(Sales) FROM SalesData;
```

### ROLLUP

ROLLUP creates a hierarchical set of groupings, useful for subtotals in hierarchical dimensions:

```sql
SELECT
    Year,
    Quarter,
    Month,
    SUM(Revenue) AS TotalRevenue
FROM SalesData
GROUP BY ROLLUP (Year, Quarter, Month);
```

This produces:
- Year + Quarter + Month detail rows
- Year + Quarter subtotals
- Year totals
- Grand total

**ROLLUP order matters** - it creates a hierarchy from left to right:
```sql
-- Different hierarchies produce different results
GROUP BY ROLLUP (A, B, C)  -- Produces: (A,B,C), (A,B), (A), ()
GROUP BY ROLLUP (C, B, A)  -- Produces: (C,B,A), (C,B), (C), ()
```

### CUBE

CUBE generates all possible grouping combinations (the power set):

```sql
SELECT
    Region,
    Category,
    SUM(Sales) AS TotalSales
FROM SalesData
GROUP BY CUBE (Region, Category);
```

For two columns, this produces 2² = 4 groupings:
- (Region, Category)
- (Region)
- (Category)
- ()

For three columns (A, B, C), CUBE produces 2³ = 8 groupings.

### Partial ROLLUP and CUBE

Combine with regular GROUP BY columns:

```sql
SELECT
    Country,        -- Always grouped
    Region,
    ProductLine,
    SUM(Sales)
FROM SalesData
GROUP BY Country, ROLLUP (Region, ProductLine);
```

This produces subtotals within each Country, but not across countries.

## The GROUPING Function

When using GROUPING SETS, ROLLUP, or CUBE, distinguish between actual NULL values and NULL indicating a subtotal:

```sql
SELECT
    CASE WHEN GROUPING(Region) = 1 THEN 'All Regions' ELSE Region END AS Region,
    CASE WHEN GROUPING(Category) = 1 THEN 'All Categories' ELSE Category END AS Category,
    SUM(Sales) AS TotalSales
FROM SalesData
GROUP BY ROLLUP (Region, Category);
```

**GROUPING returns:**
- 0: Column is part of this grouping (real value or real NULL)
- 1: Column is aggregated (super-aggregate row)

### GROUPING_ID

Identify grouping combinations with a bit pattern:

```sql
SELECT
    GROUPING_ID(Region, Category) AS GroupLevel,
    Region,
    Category,
    SUM(Sales) AS TotalSales
FROM SalesData
GROUP BY CUBE (Region, Category)
ORDER BY GroupLevel;
```

| GroupLevel | Region | Category | Meaning |
|------------|--------|----------|---------|
| 0 | East | Books | Detail row |
| 1 | East | NULL | Region subtotal |
| 2 | NULL | Books | Category subtotal |
| 3 | NULL | NULL | Grand total |

## Conditional Aggregation

Compute multiple filtered aggregates in one pass through the data:

### Using CASE in Aggregates

```sql
SELECT
    ProductCategory,
    COUNT(*) AS TotalOrders,
    SUM(CASE WHEN Status = 'Completed' THEN 1 ELSE 0 END) AS CompletedOrders,
    SUM(CASE WHEN Status = 'Cancelled' THEN 1 ELSE 0 END) AS CancelledOrders,
    SUM(CASE WHEN Status = 'Pending' THEN Amount ELSE 0 END) AS PendingRevenue
FROM Orders
GROUP BY ProductCategory;
```

### Using FILTER Clause (PostgreSQL)

More elegant syntax for the same operation:

```sql
SELECT
    ProductCategory,
    COUNT(*) AS TotalOrders,
    COUNT(*) FILTER (WHERE Status = 'Completed') AS CompletedOrders,
    COUNT(*) FILTER (WHERE Status = 'Cancelled') AS CancelledOrders,
    SUM(Amount) FILTER (WHERE Status = 'Pending') AS PendingRevenue
FROM Orders
GROUP BY ProductCategory;
```

### Pivot-Like Queries

Transform rows to columns using conditional aggregation:

```sql
-- Sales by quarter as columns
SELECT
    ProductID,
    SUM(CASE WHEN Quarter = 1 THEN Amount ELSE 0 END) AS Q1,
    SUM(CASE WHEN Quarter = 2 THEN Amount ELSE 0 END) AS Q2,
    SUM(CASE WHEN Quarter = 3 THEN Amount ELSE 0 END) AS Q3,
    SUM(CASE WHEN Quarter = 4 THEN Amount ELSE 0 END) AS Q4
FROM QuarterlySales
GROUP BY ProductID;
```

## Statistical Aggregates

### Mode and Percentiles

```sql
SELECT
    Department,
    -- Median salary
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY Salary) AS MedianSalary,
    -- 90th percentile
    PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY Salary) AS P90Salary,
    -- Discrete percentile (actual value)
    PERCENTILE_DISC(0.5) WITHIN GROUP (ORDER BY Salary) AS MedianActual,
    -- Mode (PostgreSQL)
    MODE() WITHIN GROUP (ORDER BY JobTitle) AS MostCommonTitle
FROM Employees
GROUP BY Department;
```

### Correlation and Regression

```sql
SELECT
    -- Correlation coefficient
    CORR(Advertising, Sales) AS AdvertisingCorrelation,
    -- Linear regression slope and intercept
    REGR_SLOPE(Sales, Advertising) AS Slope,
    REGR_INTERCEPT(Sales, Advertising) AS Intercept,
    -- R-squared
    REGR_R2(Sales, Advertising) AS RSquared
FROM MonthlySalesData;
```

### Variance and Standard Deviation

```sql
SELECT
    ProductCategory,
    AVG(Price) AS AvgPrice,
    STDDEV_SAMP(Price) AS StdDevSample,    -- Sample std dev (n-1)
    STDDEV_POP(Price) AS StdDevPopulation, -- Population std dev (n)
    VAR_SAMP(Price) AS VarianceSample,
    VAR_POP(Price) AS VariancePopulation
FROM Products
GROUP BY ProductCategory;
```

## Array and JSON Aggregation

### Collecting Values into Arrays

```sql
-- Collect all products ordered by a customer
SELECT
    CustomerID,
    ARRAY_AGG(DISTINCT ProductID ORDER BY ProductID) AS ProductsOrdered,
    ARRAY_AGG(OrderDate ORDER BY OrderDate DESC)[1] AS MostRecentOrder
FROM Orders
GROUP BY CustomerID;
```

### JSON Aggregation

```sql
-- Build JSON array of objects
SELECT
    DepartmentID,
    JSON_AGG(
        JSON_BUILD_OBJECT(
            'id', EmployeeID,
            'name', Name,
            'salary', Salary
        ) ORDER BY Name
    ) AS Employees
FROM Employees
GROUP BY DepartmentID;

-- Build JSON object from key-value pairs
SELECT
    JSON_OBJECT_AGG(Setting, Value) AS Configuration
FROM SystemSettings;
```

## String Aggregation

### Concatenating Grouped Values

```sql
SELECT
    OrderID,
    STRING_AGG(ProductName, ', ' ORDER BY ProductName) AS Products,
    STRING_AGG(DISTINCT Category, '; ' ORDER BY Category) AS Categories
FROM OrderDetails
JOIN Products USING (ProductID)
GROUP BY OrderID;
```

### Hierarchical Path Construction

```sql
-- Build path strings for hierarchical data
WITH RECURSIVE CategoryPath AS (
    SELECT CategoryID, Name, Name AS Path
    FROM Categories WHERE ParentID IS NULL
    UNION ALL
    SELECT c.CategoryID, c.Name, p.Path || ' > ' || c.Name
    FROM Categories c
    JOIN CategoryPath p ON c.ParentID = p.CategoryID
)
SELECT * FROM CategoryPath;
```

## Top-N Per Group

A common analytical pattern using aggregation with window functions:

### Using Subquery with Aggregation

```sql
-- Top 3 products by sales in each category
SELECT *
FROM (
    SELECT
        Category,
        ProductName,
        TotalSales,
        ROW_NUMBER() OVER (PARTITION BY Category ORDER BY TotalSales DESC) AS Rank
    FROM (
        SELECT
            p.Category,
            p.ProductName,
            SUM(od.Quantity * od.UnitPrice) AS TotalSales
        FROM Products p
        JOIN OrderDetails od ON p.ProductID = od.ProductID
        GROUP BY p.Category, p.ProductName
    ) ProductSales
) RankedProducts
WHERE Rank <= 3;
```

### Using LATERAL Join (PostgreSQL)

```sql
SELECT c.Category, top.ProductName, top.TotalSales
FROM (SELECT DISTINCT Category FROM Products) c
CROSS JOIN LATERAL (
    SELECT p.ProductName, SUM(od.Quantity * od.UnitPrice) AS TotalSales
    FROM Products p
    JOIN OrderDetails od ON p.ProductID = od.ProductID
    WHERE p.Category = c.Category
    GROUP BY p.ProductName
    ORDER BY TotalSales DESC
    LIMIT 3
) top;
```

## Aggregate Performance Optimization

### Index Considerations

```sql
-- Index can help when filtering before aggregation
CREATE INDEX idx_orders_date_status ON Orders(OrderDate, Status);

SELECT Status, COUNT(*), SUM(Amount)
FROM Orders
WHERE OrderDate >= '2024-01-01'
GROUP BY Status;
```

### Pre-Aggregation

For very large datasets, consider materialized views:

```sql
CREATE MATERIALIZED VIEW DailySalesSummary AS
SELECT
    DATE_TRUNC('day', OrderDate) AS SaleDate,
    ProductCategory,
    COUNT(*) AS OrderCount,
    SUM(Amount) AS TotalAmount
FROM Orders
GROUP BY DATE_TRUNC('day', OrderDate), ProductCategory;

CREATE INDEX idx_daily_sales_date ON DailySalesSummary(SaleDate);

-- Refresh when needed
REFRESH MATERIALIZED VIEW DailySalesSummary;
```

### Approximate Aggregates

For very large datasets where exact counts aren't required:

```sql
-- PostgreSQL approximate distinct count (much faster for large tables)
SELECT COUNT(DISTINCT CustomerID) FROM Orders;  -- Exact but slow

-- Using HyperLogLog extension
SELECT hll_cardinality(hll_add_agg(hll_hash_integer(CustomerID)))
FROM Orders;  -- Approximate but fast
```

## Common Aggregation Patterns

### Running Totals with GROUP BY

```sql
SELECT
    Date,
    DailyTotal,
    SUM(DailyTotal) OVER (ORDER BY Date) AS RunningTotal
FROM (
    SELECT DATE_TRUNC('day', OrderDate) AS Date, SUM(Amount) AS DailyTotal
    FROM Orders
    GROUP BY DATE_TRUNC('day', OrderDate)
) DailyData
ORDER BY Date;
```

### Cumulative Distribution

```sql
SELECT
    ScoreRange,
    COUNT(*) AS Students,
    SUM(COUNT(*)) OVER (ORDER BY ScoreRange) AS CumulativeCount,
    ROUND(100.0 * SUM(COUNT(*)) OVER (ORDER BY ScoreRange) /
          SUM(COUNT(*)) OVER (), 2) AS CumulativePercent
FROM (
    SELECT
        FLOOR(Score / 10) * 10 || '-' || (FLOOR(Score / 10) * 10 + 9) AS ScoreRange
    FROM TestResults
) Ranges
GROUP BY ScoreRange
ORDER BY ScoreRange;
```

Advanced aggregation transforms SQL from a simple data retrieval language into a powerful analytical tool. By combining these techniques with window functions and CTEs, you can perform complex business intelligence queries directly in the database.
