# SQL Functions and Expressions

SQL provides a rich set of built-in functions and expression capabilities for transforming, calculating, and manipulating data within queries. Mastering these functions enables you to perform complex data operations directly in the database, often more efficiently than processing data in application code. This guide covers the major categories of SQL functions and how to use them effectively.

## Scalar Functions Overview

Scalar functions operate on individual values and return a single result. They can be used in SELECT lists, WHERE clauses, ORDER BY clauses, and anywhere an expression is allowed.

## String Functions

String manipulation is one of the most common operations in database queries.

### Basic String Operations

```sql
-- Length of a string
SELECT LENGTH('Database');  -- Returns 8
SELECT CHAR_LENGTH('Database');  -- Also 8, same as LENGTH

-- Concatenation
SELECT 'Hello' || ' ' || 'World';  -- PostgreSQL/Oracle
SELECT CONCAT('Hello', ' ', 'World');  -- Standard SQL
SELECT 'Hello' + ' ' + 'World';  -- SQL Server

-- Concatenation with separator
SELECT CONCAT_WS(', ', 'Alice', 'Bob', 'Charlie');
-- Returns: 'Alice, Bob, Charlie'
```

### Case Conversion

```sql
SELECT UPPER('hello');  -- 'HELLO'
SELECT LOWER('HELLO');  -- 'hello'
SELECT INITCAP('hello world');  -- 'Hello World' (PostgreSQL)
```

### Substring Operations

```sql
-- Extract substring
SELECT SUBSTRING('Database Systems', 1, 4);  -- 'Data'
SELECT SUBSTRING('Database Systems' FROM 1 FOR 4);  -- SQL standard syntax

-- Left and right portions
SELECT LEFT('Database', 4);   -- 'Data'
SELECT RIGHT('Database', 4);  -- 'base'
```

### Trimming and Padding

```sql
-- Remove leading/trailing whitespace
SELECT TRIM('  hello  ');      -- 'hello'
SELECT LTRIM('  hello');       -- 'hello'
SELECT RTRIM('hello  ');       -- 'hello'

-- Remove specific characters
SELECT TRIM(BOTH 'x' FROM 'xxxhelloxxx');  -- 'hello'
SELECT TRIM(LEADING '0' FROM '000123');    -- '123'

-- Padding
SELECT LPAD('42', 5, '0');     -- '00042'
SELECT RPAD('End', 10, '.');   -- 'End.......'
```

### Search and Replace

```sql
-- Find position of substring
SELECT POSITION('base' IN 'Database');  -- 5
SELECT STRPOS('Database', 'base');      -- PostgreSQL: 5

-- Replace occurrences
SELECT REPLACE('Hello World', 'World', 'SQL');
-- Returns: 'Hello SQL'

-- Translate characters (PostgreSQL)
SELECT TRANSLATE('12345', '123', 'abc');
-- Returns: 'abc45'
```

### Pattern Matching

```sql
-- LIKE patterns
SELECT * FROM Products WHERE Name LIKE 'A%';      -- Starts with A
SELECT * FROM Products WHERE Name LIKE '%book%';  -- Contains 'book'
SELECT * FROM Products WHERE Code LIKE '___-__';  -- Pattern with _ wildcard

-- Case-insensitive matching (PostgreSQL)
SELECT * FROM Products WHERE Name ILIKE 'apple%';

-- Regular expressions (PostgreSQL)
SELECT * FROM Products WHERE Name ~ '^[A-Z]{3}-\d{4}$';

-- Regular expressions (MySQL)
SELECT * FROM Products WHERE Name REGEXP '^[A-Z]{3}-[0-9]{4}$';
```

### String Aggregation

```sql
-- Concatenate values from multiple rows
SELECT DeptID, STRING_AGG(Name, ', ' ORDER BY Name) AS Employees
FROM Employees
GROUP BY DeptID;

-- MySQL equivalent
SELECT DeptID, GROUP_CONCAT(Name ORDER BY Name SEPARATOR ', ')
FROM Employees
GROUP BY DeptID;
```

## Numeric Functions

### Basic Math Operations

```sql
-- Arithmetic operators
SELECT 10 + 5;   -- 15
SELECT 10 - 5;   -- 5
SELECT 10 * 5;   -- 50
SELECT 10 / 3;   -- 3 (integer division) or 3.333... (depends on types)
SELECT 10 % 3;   -- 1 (modulo)
SELECT 10 ^ 2;   -- 100 (PostgreSQL exponent)
SELECT POWER(10, 2);  -- 100 (standard)
```

### Rounding and Truncation

```sql
-- Round to nearest integer
SELECT ROUND(3.7);     -- 4
SELECT ROUND(3.3);     -- 3

-- Round to decimal places
SELECT ROUND(3.14159, 2);  -- 3.14

-- Always round up
SELECT CEILING(3.1);   -- 4
SELECT CEIL(3.1);      -- 4

-- Always round down
SELECT FLOOR(3.9);     -- 3

-- Truncate without rounding
SELECT TRUNC(3.789, 2);  -- 3.78 (PostgreSQL)
SELECT TRUNCATE(3.789, 2);  -- MySQL
```

### Mathematical Functions

```sql
-- Absolute value
SELECT ABS(-42);  -- 42

-- Square root
SELECT SQRT(16);  -- 4

-- Natural logarithm and exponential
SELECT LN(10);        -- 2.302...
SELECT LOG(10);       -- Natural log (PostgreSQL) or log base 10 (MySQL)
SELECT LOG10(100);    -- 2
SELECT EXP(1);        -- 2.718... (e)

-- Trigonometric functions
SELECT SIN(0);        -- 0
SELECT COS(0);        -- 1
SELECT TAN(0);        -- 0
SELECT PI();          -- 3.14159...

-- Sign function
SELECT SIGN(-5);  -- -1
SELECT SIGN(0);   -- 0
SELECT SIGN(5);   -- 1
```

### Random Numbers

```sql
-- Random float between 0 and 1
SELECT RANDOM();      -- PostgreSQL
SELECT RAND();        -- MySQL

-- Random integer in range
SELECT FLOOR(RANDOM() * 100) + 1;  -- 1 to 100
```

## Date and Time Functions

### Current Date and Time

```sql
-- Current date and time
SELECT CURRENT_DATE;       -- 2024-01-15
SELECT CURRENT_TIME;       -- 14:30:25
SELECT CURRENT_TIMESTAMP;  -- 2024-01-15 14:30:25.123456
SELECT NOW();              -- Same as CURRENT_TIMESTAMP

-- PostgreSQL specifics
SELECT CURRENT_DATE AT TIME ZONE 'UTC';
```

### Date Construction and Extraction

```sql
-- Construct a date
SELECT DATE '2024-01-15';
SELECT MAKE_DATE(2024, 1, 15);  -- PostgreSQL

-- Extract components
SELECT EXTRACT(YEAR FROM '2024-01-15'::DATE);   -- 2024
SELECT EXTRACT(MONTH FROM '2024-01-15'::DATE);  -- 1
SELECT EXTRACT(DAY FROM '2024-01-15'::DATE);    -- 15
SELECT EXTRACT(DOW FROM '2024-01-15'::DATE);    -- 1 (Monday, 0=Sunday)
SELECT EXTRACT(WEEK FROM '2024-01-15'::DATE);   -- 3

-- Short form (PostgreSQL)
SELECT DATE_PART('year', '2024-01-15'::DATE);
```

### Date Arithmetic

```sql
-- Add/subtract intervals
SELECT DATE '2024-01-15' + INTERVAL '1 month';
SELECT CURRENT_DATE - INTERVAL '7 days';
SELECT CURRENT_TIMESTAMP + INTERVAL '2 hours 30 minutes';

-- Difference between dates
SELECT DATE '2024-12-31' - DATE '2024-01-01';  -- 365 (days)
SELECT AGE('2024-01-15'::DATE, '2000-06-20'::DATE);
-- Returns: 23 years 6 mons 25 days

-- Date truncation
SELECT DATE_TRUNC('month', TIMESTAMP '2024-01-15 14:30:00');
-- Returns: 2024-01-01 00:00:00
SELECT DATE_TRUNC('hour', CURRENT_TIMESTAMP);
```

### Formatting Dates

```sql
-- Convert to string with format
SELECT TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD');     -- 2024-01-15
SELECT TO_CHAR(CURRENT_DATE, 'Month DD, YYYY'); -- January 15, 2024
SELECT TO_CHAR(CURRENT_DATE, 'Day');            -- Monday
SELECT TO_CHAR(CURRENT_TIMESTAMP, 'HH24:MI:SS'); -- 14:30:25

-- Parse string to date
SELECT TO_DATE('15-Jan-2024', 'DD-Mon-YYYY');
SELECT TO_TIMESTAMP('2024-01-15 14:30:00', 'YYYY-MM-DD HH24:MI:SS');
```

## Conditional Expressions

### CASE Expression

```sql
-- Simple CASE
SELECT Name,
       CASE Status
           WHEN 'A' THEN 'Active'
           WHEN 'I' THEN 'Inactive'
           WHEN 'P' THEN 'Pending'
           ELSE 'Unknown'
       END AS StatusText
FROM Customers;

-- Searched CASE
SELECT Name, Salary,
       CASE
           WHEN Salary >= 100000 THEN 'Executive'
           WHEN Salary >= 75000 THEN 'Senior'
           WHEN Salary >= 50000 THEN 'Mid-Level'
           ELSE 'Junior'
       END AS Level
FROM Employees;
```

### COALESCE and NULL Handling

```sql
-- Return first non-null value
SELECT COALESCE(Phone, Mobile, 'No Contact') AS ContactNumber
FROM Customers;

-- NULLIF - returns NULL if values are equal
SELECT NULLIF(Quantity, 0);  -- Avoids division by zero
SELECT Total / NULLIF(Quantity, 0);

-- PostgreSQL: NVL equivalent
SELECT COALESCE(Commission, 0) AS Commission
FROM Employees;
```

### GREATEST and LEAST

```sql
-- Find maximum of multiple values
SELECT GREATEST(10, 20, 5, 15);  -- 20

-- Find minimum of multiple values
SELECT LEAST(10, 20, 5, 15);  -- 5

-- Practical use: ensure value is within bounds
SELECT GREATEST(0, LEAST(100, score)) AS BoundedScore
FROM TestResults;
```

### IIF and Shorthand Conditionals

```sql
-- SQL Server IIF
SELECT IIF(Quantity > 100, 'Bulk', 'Regular') AS OrderType
FROM Orders;

-- PostgreSQL: Boolean expressions in arithmetic
SELECT 1 + (IsVIP::INT * 10) AS BonusMultiplier
FROM Customers;
```

## Type Conversion Functions

### CAST and Type Coercion

```sql
-- Standard CAST
SELECT CAST('123' AS INTEGER);
SELECT CAST(123 AS VARCHAR(10));
SELECT CAST('2024-01-15' AS DATE);

-- PostgreSQL shorthand
SELECT '123'::INTEGER;
SELECT 123::TEXT;
SELECT '2024-01-15'::DATE;

-- Convert numbers to formatted strings
SELECT TO_CHAR(1234567.89, '9,999,999.99');  -- ' 1,234,567.89'
SELECT TO_CHAR(0.15, '999%');  -- '  15%'
```

## Aggregate Functions with Advanced Options

### Beyond Basic Aggregates

```sql
-- Array aggregation
SELECT DeptID, ARRAY_AGG(Name ORDER BY Name) AS Employees
FROM Employees
GROUP BY DeptID;

-- JSON aggregation
SELECT DeptID, JSON_AGG(
    JSON_BUILD_OBJECT('name', Name, 'salary', Salary)
) AS EmployeeData
FROM Employees
GROUP BY DeptID;

-- Statistical aggregates
SELECT
    AVG(Salary) AS Mean,
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY Salary) AS Median,
    STDDEV(Salary) AS StdDev,
    VARIANCE(Salary) AS Variance
FROM Employees;
```

### FILTER Clause (PostgreSQL)

```sql
-- Conditional aggregation
SELECT
    COUNT(*) AS TotalOrders,
    COUNT(*) FILTER (WHERE Status = 'Completed') AS CompletedOrders,
    SUM(Amount) FILTER (WHERE OrderDate > '2024-01-01') AS RecentTotal
FROM Orders;
```

## User-Defined Functions

Create custom functions for reusable logic:

```sql
-- Simple scalar function
CREATE OR REPLACE FUNCTION calculate_tax(price NUMERIC, rate NUMERIC)
RETURNS NUMERIC AS $$
BEGIN
    RETURN ROUND(price * rate, 2);
END;
$$ LANGUAGE plpgsql;

-- Usage
SELECT Name, Price, calculate_tax(Price, 0.08) AS Tax
FROM Products;

-- Function with default parameter
CREATE OR REPLACE FUNCTION greet(name TEXT, greeting TEXT DEFAULT 'Hello')
RETURNS TEXT AS $$
BEGIN
    RETURN greeting || ', ' || name || '!';
END;
$$ LANGUAGE plpgsql;

SELECT greet('Alice');           -- 'Hello, Alice!'
SELECT greet('Bob', 'Welcome');  -- 'Welcome, Bob!'
```

### Table-Returning Functions

```sql
CREATE OR REPLACE FUNCTION get_department_stats(dept_id INTEGER)
RETURNS TABLE(metric TEXT, value NUMERIC) AS $$
BEGIN
    RETURN QUERY
    SELECT 'Employee Count'::TEXT, COUNT(*)::NUMERIC
    FROM Employees WHERE DeptID = dept_id
    UNION ALL
    SELECT 'Avg Salary', AVG(Salary)
    FROM Employees WHERE DeptID = dept_id
    UNION ALL
    SELECT 'Max Salary', MAX(Salary)
    FROM Employees WHERE DeptID = dept_id;
END;
$$ LANGUAGE plpgsql;

-- Usage
SELECT * FROM get_department_stats(5);
```

## Performance Tips for Functions

1. **Use built-in functions over custom**: Built-in functions are highly optimized
2. **Avoid functions in WHERE clauses on indexed columns**: They prevent index usage
3. **Use IMMUTABLE/STABLE/VOLATILE correctly**: Helps optimizer make decisions
4. **Consider SQL functions over PL/pgSQL**: SQL functions can be inlined

```sql
-- Marking function as immutable allows caching
CREATE FUNCTION calculate_hash(val TEXT)
RETURNS TEXT AS $$
    SELECT md5(val);
$$ LANGUAGE SQL IMMUTABLE;
```

Understanding SQL's rich function library enables you to perform complex data transformations efficiently within the database, reducing data transfer and leveraging the database engine's optimization capabilities.
