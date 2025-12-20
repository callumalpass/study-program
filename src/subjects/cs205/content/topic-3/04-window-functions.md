---
id: cs205-t3-window
title: "Window Functions"
order: 4
---

# Window Functions

Window functions perform calculations across rows related to the current row without collapsing results like GROUP BY. They enable powerful analytics queries.

## Window Function Basics

### Syntax Structure

```sql
function_name(arguments) OVER (
    [PARTITION BY columns]
    [ORDER BY columns]
    [frame_clause]
)
```

### Simple Example

```sql
-- Compare each employee's salary to department average
SELECT
    Name,
    DeptID,
    Salary,
    AVG(Salary) OVER (PARTITION BY DeptID) AS DeptAvgSalary
FROM Employees;

-- Each row shows individual + aggregate without collapsing
```

### Window vs GROUP BY

```sql
-- GROUP BY: Collapses rows
SELECT DeptID, AVG(Salary)
FROM Employees
GROUP BY DeptID;
-- Returns one row per department

-- Window: Keeps all rows
SELECT Name, DeptID, Salary, AVG(Salary) OVER (PARTITION BY DeptID)
FROM Employees;
-- Returns all employees with their department's average
```

## PARTITION BY

Divides rows into groups for the window function:

```sql
-- Rank within each department
SELECT
    Name,
    DeptID,
    Salary,
    RANK() OVER (PARTITION BY DeptID ORDER BY Salary DESC) AS DeptRank
FROM Employees;

-- Multiple partitions
SELECT
    Region,
    Year,
    Sales,
    SUM(Sales) OVER (PARTITION BY Region) AS RegionTotal,
    SUM(Sales) OVER (PARTITION BY Year) AS YearTotal
FROM SalesData;
```

Without PARTITION BY, the entire result set is one partition:

```sql
-- Company-wide rank
SELECT Name, Salary, RANK() OVER (ORDER BY Salary DESC) AS CompanyRank
FROM Employees;
```

## ORDER BY in Windows

Determines the order for ranking and frame calculations:

```sql
-- Running total
SELECT
    OrderDate,
    Amount,
    SUM(Amount) OVER (ORDER BY OrderDate) AS RunningTotal
FROM Orders;

-- Order within partition
SELECT
    DeptID,
    HireDate,
    Name,
    ROW_NUMBER() OVER (PARTITION BY DeptID ORDER BY HireDate) AS SeniorityRank
FROM Employees;
```

## Ranking Functions

### ROW_NUMBER()

Unique sequential number for each row:

```sql
SELECT
    Name,
    Salary,
    ROW_NUMBER() OVER (ORDER BY Salary DESC) AS RowNum
FROM Employees;
-- Result: 1, 2, 3, 4, 5... (no ties)
```

### RANK()

Same rank for ties, gaps after ties:

```sql
SELECT
    Name,
    Salary,
    RANK() OVER (ORDER BY Salary DESC) AS Rank
FROM Employees;
-- If two employees tie for 2nd: 1, 2, 2, 4, 5...
```

### DENSE_RANK()

Same rank for ties, no gaps:

```sql
SELECT
    Name,
    Salary,
    DENSE_RANK() OVER (ORDER BY Salary DESC) AS DenseRank
FROM Employees;
-- If two employees tie for 2nd: 1, 2, 2, 3, 4...
```

### NTILE(n)

Divides rows into n equal groups:

```sql
SELECT
    Name,
    Salary,
    NTILE(4) OVER (ORDER BY Salary DESC) AS Quartile
FROM Employees;
-- Divides into 4 groups: 1, 1, 1, 2, 2, 2, 3, 3, 4, 4...
```

### Comparison

```sql
SELECT
    Name,
    Salary,
    ROW_NUMBER() OVER (ORDER BY Salary DESC) AS RowNum,
    RANK() OVER (ORDER BY Salary DESC) AS Rank,
    DENSE_RANK() OVER (ORDER BY Salary DESC) AS DenseRank
FROM Employees;

-- Salary: 100, 100, 90, 80
-- ROW_NUMBER: 1, 2, 3, 4
-- RANK: 1, 1, 3, 4
-- DENSE_RANK: 1, 1, 2, 3
```

## Aggregate Window Functions

Standard aggregates work as window functions:

```sql
SELECT
    Name,
    DeptID,
    Salary,
    SUM(Salary) OVER (PARTITION BY DeptID) AS DeptTotal,
    AVG(Salary) OVER (PARTITION BY DeptID) AS DeptAvg,
    COUNT(*) OVER (PARTITION BY DeptID) AS DeptCount,
    MIN(Salary) OVER (PARTITION BY DeptID) AS DeptMin,
    MAX(Salary) OVER (PARTITION BY DeptID) AS DeptMax
FROM Employees;
```

### Running Calculations

With ORDER BY, aggregates become cumulative:

```sql
SELECT
    OrderDate,
    Amount,
    SUM(Amount) OVER (ORDER BY OrderDate) AS RunningTotal,
    AVG(Amount) OVER (ORDER BY OrderDate) AS RunningAvg,
    COUNT(*) OVER (ORDER BY OrderDate) AS CumulativeCount
FROM Orders;
```

## Value Functions

### LAG and LEAD

Access previous/next row values:

```sql
SELECT
    OrderDate,
    Amount,
    LAG(Amount, 1) OVER (ORDER BY OrderDate) AS PrevAmount,
    LEAD(Amount, 1) OVER (ORDER BY OrderDate) AS NextAmount,
    Amount - LAG(Amount, 1) OVER (ORDER BY OrderDate) AS DayOverDayChange
FROM Orders;

-- With default for first/last
LAG(Amount, 1, 0) OVER (ORDER BY OrderDate)  -- Default to 0 if no previous
```

### FIRST_VALUE and LAST_VALUE

First/last value in the window:

```sql
SELECT
    Name,
    DeptID,
    Salary,
    FIRST_VALUE(Name) OVER (PARTITION BY DeptID ORDER BY Salary DESC) AS HighestPaid,
    LAST_VALUE(Name) OVER (
        PARTITION BY DeptID
        ORDER BY Salary DESC
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS LowestPaid
FROM Employees;
```

### NTH_VALUE

Get the nth value:

```sql
SELECT
    Name,
    DeptID,
    Salary,
    NTH_VALUE(Name, 2) OVER (
        PARTITION BY DeptID
        ORDER BY Salary DESC
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS SecondHighestPaid
FROM Employees;
```

## Frame Clauses

Define exactly which rows to include in the window:

### Syntax

```sql
{ROWS | RANGE | GROUPS} BETWEEN frame_start AND frame_end

frame_start/frame_end:
  UNBOUNDED PRECEDING  -- First row of partition
  n PRECEDING          -- n rows before current
  CURRENT ROW          -- Current row
  n FOLLOWING          -- n rows after current
  UNBOUNDED FOLLOWING  -- Last row of partition
```

### ROWS Frame

Physical rows:

```sql
-- 3-day moving average
SELECT
    Date,
    Sales,
    AVG(Sales) OVER (
        ORDER BY Date
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ) AS MovingAvg3Day
FROM DailySales;

-- 5-row centered average
AVG(Sales) OVER (
    ORDER BY Date
    ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING
)
```

### RANGE Frame

Logical range based on ORDER BY value:

```sql
-- Sum of all rows with same date
SUM(Amount) OVER (
    ORDER BY OrderDate
    RANGE BETWEEN CURRENT ROW AND CURRENT ROW
)

-- Sum within 7 days
SUM(Amount) OVER (
    ORDER BY OrderDate
    RANGE BETWEEN INTERVAL '7' DAY PRECEDING AND CURRENT ROW
)
```

### Default Frames

```sql
-- Without ORDER BY: entire partition
SUM(x) OVER (PARTITION BY y)
-- Equivalent to: RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING

-- With ORDER BY: up to current row
SUM(x) OVER (PARTITION BY y ORDER BY z)
-- Equivalent to: RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
```

## Named Windows

Reuse window definitions:

```sql
SELECT
    Name,
    DeptID,
    Salary,
    SUM(Salary) OVER dept_window AS DeptTotal,
    AVG(Salary) OVER dept_window AS DeptAvg,
    RANK() OVER (dept_window ORDER BY Salary DESC) AS DeptRank
FROM Employees
WINDOW dept_window AS (PARTITION BY DeptID);
```

## Practical Examples

### Top N Per Group

```sql
-- Top 3 products per category
WITH RankedProducts AS (
    SELECT
        Category,
        ProductName,
        Sales,
        ROW_NUMBER() OVER (PARTITION BY Category ORDER BY Sales DESC) AS Rank
    FROM Products
)
SELECT * FROM RankedProducts WHERE Rank <= 3;
```

### Year-over-Year Growth

```sql
SELECT
    Year,
    Revenue,
    LAG(Revenue) OVER (ORDER BY Year) AS PrevYearRevenue,
    ROUND(100.0 * (Revenue - LAG(Revenue) OVER (ORDER BY Year)) /
          LAG(Revenue) OVER (ORDER BY Year), 2) AS GrowthPct
FROM AnnualRevenue;
```

### Percentile Calculation

```sql
SELECT
    Name,
    Salary,
    PERCENT_RANK() OVER (ORDER BY Salary) AS PercentRank,
    CUME_DIST() OVER (ORDER BY Salary) AS CumulativeDistribution
FROM Employees;
```

### Gap Analysis

```sql
-- Find gaps in sequential data
SELECT
    ID,
    LEAD(ID) OVER (ORDER BY ID) AS NextID,
    LEAD(ID) OVER (ORDER BY ID) - ID AS Gap
FROM Records
HAVING Gap > 1;
```

