---
id: cs205-t2-select
title: "SELECT Queries"
order: 2
---

# SELECT Query Fundamentals

The SELECT statement retrieves data from database tables. Mastering SELECT is essential for working with relational databases.

## Basic SELECT Syntax

### Complete Structure

```sql
SELECT [DISTINCT] columns
FROM table
[WHERE condition]
[GROUP BY columns]
[HAVING condition]
[ORDER BY columns]
[LIMIT n [OFFSET m]];
```

### Simple Queries

```sql
-- All columns
SELECT * FROM Employees;

-- Specific columns
SELECT FirstName, LastName, Salary FROM Employees;

-- With alias
SELECT FirstName AS "First Name", LastName AS "Last Name" FROM Employees;

-- Computed columns
SELECT FirstName, LastName, Salary, Salary * 12 AS AnnualSalary FROM Employees;
```

## Column Selection

### Selecting All Columns

```sql
SELECT * FROM Products;
```

**Caution**: Avoid `SELECT *` in production code:
- Returns unnecessary data
- Breaks if table structure changes
- Hides which columns are actually needed

### Selecting Specific Columns

```sql
SELECT ProductID, Name, Price FROM Products;
```

### Column Aliases

```sql
-- Using AS keyword
SELECT FirstName AS "First Name", Salary AS "Annual Compensation" FROM Employees;

-- Without AS (some databases)
SELECT FirstName "First Name" FROM Employees;

-- Aliases for computed columns
SELECT Price * Quantity AS TotalValue FROM OrderItems;
```

### Expressions and Functions

```sql
SELECT
    Name,
    Price,
    Price * 0.9 AS DiscountedPrice,
    UPPER(Name) AS UpperName,
    LENGTH(Description) AS DescLength,
    ROUND(Price, 0) AS RoundedPrice
FROM Products;
```

### DISTINCT

Remove duplicate rows:

```sql
-- All unique cities
SELECT DISTINCT City FROM Customers;

-- Unique combinations
SELECT DISTINCT City, State FROM Customers;

-- Count distinct values
SELECT COUNT(DISTINCT Category) FROM Products;
```

## WHERE Clause

### Comparison Operators

```sql
SELECT * FROM Products WHERE Price > 100;
SELECT * FROM Products WHERE Price >= 100;
SELECT * FROM Products WHERE Price < 50;
SELECT * FROM Products WHERE Price <= 50;
SELECT * FROM Products WHERE Category = 'Electronics';
SELECT * FROM Products WHERE Category <> 'Electronics';  -- Not equal
SELECT * FROM Products WHERE Category != 'Electronics';  -- Also not equal
```

### Logical Operators

```sql
-- AND: Both conditions must be true
SELECT * FROM Products WHERE Category = 'Electronics' AND Price < 500;

-- OR: Either condition can be true
SELECT * FROM Products WHERE Category = 'Electronics' OR Category = 'Computers';

-- NOT: Negate condition
SELECT * FROM Products WHERE NOT Category = 'Electronics';

-- Complex combinations (use parentheses)
SELECT * FROM Products
WHERE (Category = 'Electronics' OR Category = 'Computers')
  AND Price < 500;
```

### BETWEEN

Range check (inclusive):

```sql
SELECT * FROM Products WHERE Price BETWEEN 100 AND 500;
-- Equivalent to: Price >= 100 AND Price <= 500

SELECT * FROM Orders WHERE OrderDate BETWEEN '2024-01-01' AND '2024-12-31';
```

### IN

Match any value in list:

```sql
SELECT * FROM Products WHERE Category IN ('Electronics', 'Computers', 'Phones');
-- Equivalent to: Category = 'Electronics' OR Category = 'Computers' OR Category = 'Phones'

SELECT * FROM Customers WHERE CustomerID IN (SELECT CustomerID FROM VIPCustomers);
```

### LIKE

Pattern matching:

```sql
-- % matches zero or more characters
SELECT * FROM Products WHERE Name LIKE 'Phone%';     -- Starts with 'Phone'
SELECT * FROM Products WHERE Name LIKE '%Phone';     -- Ends with 'Phone'
SELECT * FROM Products WHERE Name LIKE '%Phone%';    -- Contains 'Phone'

-- _ matches exactly one character
SELECT * FROM Products WHERE SKU LIKE 'A___';        -- A followed by 3 characters
SELECT * FROM Products WHERE Name LIKE '_a%';        -- Second character is 'a'

-- Escape special characters
SELECT * FROM Products WHERE Name LIKE '10\% off' ESCAPE '\';
```

### NULL Handling

```sql
-- Check for NULL (NOT =)
SELECT * FROM Employees WHERE ManagerID IS NULL;
SELECT * FROM Employees WHERE ManagerID IS NOT NULL;

-- COALESCE: First non-NULL value
SELECT Name, COALESCE(Phone, Email, 'No Contact') AS Contact FROM Customers;

-- NULLIF: Return NULL if equal
SELECT NULLIF(Discount, 0) AS EffectiveDiscount FROM Orders;
```

## ORDER BY

### Basic Sorting

```sql
-- Ascending (default)
SELECT * FROM Products ORDER BY Price;
SELECT * FROM Products ORDER BY Price ASC;

-- Descending
SELECT * FROM Products ORDER BY Price DESC;

-- Multiple columns
SELECT * FROM Employees ORDER BY DeptID ASC, Salary DESC;

-- By column position
SELECT Name, Price FROM Products ORDER BY 2;  -- Order by Price (2nd column)
```

### NULL Ordering

```sql
-- NULLs first or last (database-specific)
SELECT * FROM Employees ORDER BY ManagerID NULLS FIRST;
SELECT * FROM Employees ORDER BY ManagerID NULLS LAST;
```

### Expression Ordering

```sql
SELECT Name, Price, Quantity FROM Products ORDER BY Price * Quantity DESC;
SELECT * FROM Employees ORDER BY YEAR(HireDate), LastName;
```

## LIMIT and OFFSET

### Basic Limiting

```sql
-- First 10 rows
SELECT * FROM Products ORDER BY Price DESC LIMIT 10;

-- MySQL/PostgreSQL syntax
SELECT * FROM Products LIMIT 10;

-- SQL Server syntax
SELECT TOP 10 * FROM Products;

-- Oracle syntax
SELECT * FROM Products WHERE ROWNUM <= 10;
```

### Pagination

```sql
-- Page 1: rows 1-10
SELECT * FROM Products ORDER BY ProductID LIMIT 10 OFFSET 0;

-- Page 2: rows 11-20
SELECT * FROM Products ORDER BY ProductID LIMIT 10 OFFSET 10;

-- Page 3: rows 21-30
SELECT * FROM Products ORDER BY ProductID LIMIT 10 OFFSET 20;

-- General formula: LIMIT page_size OFFSET (page_number - 1) * page_size
```

## String Functions

```sql
SELECT
    UPPER(Name) AS UpperName,           -- Convert to uppercase
    LOWER(Name) AS LowerName,           -- Convert to lowercase
    LENGTH(Name) AS NameLength,         -- String length
    TRIM(Name) AS TrimmedName,          -- Remove leading/trailing spaces
    LTRIM(Name), RTRIM(Name),           -- Left/right trim
    SUBSTRING(Name, 1, 5) AS First5,    -- Extract substring
    CONCAT(FirstName, ' ', LastName),   -- Concatenate strings
    REPLACE(Name, 'old', 'new'),        -- Replace substring
    LEFT(Name, 3), RIGHT(Name, 3)       -- First/last n characters
FROM Employees;
```

## Date Functions

```sql
SELECT
    CURRENT_DATE,                        -- Today's date
    CURRENT_TIMESTAMP,                   -- Current date and time
    EXTRACT(YEAR FROM HireDate),         -- Extract year
    EXTRACT(MONTH FROM HireDate),        -- Extract month
    DATE_ADD(HireDate, INTERVAL 1 YEAR), -- Add time
    DATEDIFF(CURRENT_DATE, HireDate),    -- Difference in days
    DATE_FORMAT(HireDate, '%Y-%m-%d')    -- Format date
FROM Employees;
```

## Numeric Functions

```sql
SELECT
    ROUND(Price, 2),        -- Round to 2 decimal places
    CEIL(Price),            -- Round up
    FLOOR(Price),           -- Round down
    ABS(Balance),           -- Absolute value
    MOD(Quantity, 10),      -- Modulo
    POWER(Base, Exponent),  -- Exponentiation
    SQRT(Value)             -- Square root
FROM Calculations;
```

## CASE Expressions

### Simple CASE

```sql
SELECT Name, Category,
    CASE Category
        WHEN 'Electronics' THEN 'Tech'
        WHEN 'Clothing' THEN 'Fashion'
        WHEN 'Food' THEN 'Grocery'
        ELSE 'Other'
    END AS CategoryGroup
FROM Products;
```

### Searched CASE

```sql
SELECT Name, Price,
    CASE
        WHEN Price < 10 THEN 'Budget'
        WHEN Price < 50 THEN 'Mid-range'
        WHEN Price < 100 THEN 'Premium'
        ELSE 'Luxury'
    END AS PriceCategory
FROM Products;
```

### CASE in ORDER BY

```sql
SELECT * FROM Tasks
ORDER BY
    CASE Priority
        WHEN 'High' THEN 1
        WHEN 'Medium' THEN 2
        WHEN 'Low' THEN 3
        ELSE 4
    END;
```

## Query Execution Order

Understanding execution order helps write correct queries:

1. **FROM**: Identify source tables
2. **WHERE**: Filter rows
3. **GROUP BY**: Group rows
4. **HAVING**: Filter groups
5. **SELECT**: Choose columns
6. **DISTINCT**: Remove duplicates
7. **ORDER BY**: Sort results
8. **LIMIT/OFFSET**: Limit results

```sql
-- This works because WHERE is evaluated before SELECT
SELECT Name, Price * 0.9 AS DiscountedPrice
FROM Products
WHERE Price > 100;  -- Can't use DiscountedPrice here

-- This works because ORDER BY is evaluated after SELECT
SELECT Name, Price * 0.9 AS DiscountedPrice
FROM Products
ORDER BY DiscountedPrice;  -- Can use alias here
```

