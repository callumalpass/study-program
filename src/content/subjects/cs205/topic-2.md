# SQL Fundamentals

Structured Query Language (SQL) is the standard language for interacting with relational databases. This topic covers the essential SQL commands for creating, querying, and manipulating data.

## SQL Overview

### SQL Categories

SQL commands are divided into sublanguages:

**DDL (Data Definition Language)**: Schema operations
- CREATE, ALTER, DROP, TRUNCATE

**DML (Data Manipulation Language)**: Data operations
- SELECT, INSERT, UPDATE, DELETE

**DCL (Data Control Language)**: Access control
- GRANT, REVOKE

**TCL (Transaction Control Language)**: Transaction management
- COMMIT, ROLLBACK, SAVEPOINT

### SQL Characteristics

- Declarative: Specify what you want, not how to get it
- Set-based: Operates on sets of rows
- Case-insensitive keywords (convention: UPPERCASE)
- Statements end with semicolon

## Data Definition Language

### Creating Tables

```sql
CREATE TABLE Students (
    StudentID INTEGER PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE,
    GPA DECIMAL(3,2) CHECK (GPA >= 0 AND GPA <= 4.0),
    DeptID INTEGER REFERENCES Departments(DeptID),
    EnrollDate DATE DEFAULT CURRENT_DATE
);
```

### Data Types

Common SQL data types:
- **INTEGER, BIGINT**: Whole numbers
- **DECIMAL(p,s), NUMERIC**: Exact decimal (p digits, s after point)
- **FLOAT, DOUBLE**: Approximate floating point
- **CHAR(n)**: Fixed-length string
- **VARCHAR(n)**: Variable-length string
- **TEXT**: Large text
- **DATE, TIME, TIMESTAMP**: Temporal types
- **BOOLEAN**: True/false

### Constraints

- **PRIMARY KEY**: Unique, not null identifier
- **FOREIGN KEY**: References another table
- **UNIQUE**: No duplicate values
- **NOT NULL**: Value required
- **CHECK**: Custom condition
- **DEFAULT**: Default value

## Basic Queries

### SELECT Statement Structure

```sql
SELECT column1, column2, ...
FROM table_name
WHERE condition
ORDER BY column
LIMIT n;
```

### Filtering with WHERE

```sql
SELECT Name, GPA FROM Students WHERE GPA > 3.5;
SELECT * FROM Students WHERE Major = 'CS' AND Year >= 3;
SELECT * FROM Products WHERE Price BETWEEN 10 AND 50;
SELECT * FROM Customers WHERE Name LIKE 'A%';  -- Starts with A
SELECT * FROM Orders WHERE Status IN ('Pending', 'Processing');
SELECT * FROM Employees WHERE ManagerID IS NULL;
```

### Sorting and Limiting

```sql
SELECT * FROM Students ORDER BY GPA DESC, Name ASC;
SELECT * FROM Products ORDER BY Price DESC LIMIT 10;
SELECT * FROM Students ORDER BY GPA DESC LIMIT 10 OFFSET 5;  -- Skip first 5
```

## Data Manipulation

### INSERT

```sql
-- Single row
INSERT INTO Students (StudentID, Name, GPA) VALUES (101, 'Alice', 3.5);

-- Multiple rows
INSERT INTO Students (StudentID, Name, GPA) VALUES
    (102, 'Bob', 3.2),
    (103, 'Carol', 3.8);

-- Insert from query
INSERT INTO Honors (StudentID, Name)
SELECT StudentID, Name FROM Students WHERE GPA > 3.7;
```

### UPDATE

```sql
UPDATE Students SET GPA = 3.6 WHERE StudentID = 101;
UPDATE Products SET Price = Price * 1.1 WHERE Category = 'Electronics';
UPDATE Employees SET DeptID = 5 WHERE DeptID IS NULL;
```

### DELETE

```sql
DELETE FROM Students WHERE StudentID = 101;
DELETE FROM Orders WHERE OrderDate < '2023-01-01';
DELETE FROM TempTable;  -- Delete all rows
```

## Aggregate Functions

### Basic Aggregates

```sql
SELECT COUNT(*) FROM Students;                    -- Count rows
SELECT COUNT(DISTINCT Major) FROM Students;       -- Count unique values
SELECT AVG(GPA) FROM Students;                    -- Average
SELECT SUM(Amount) FROM Orders;                   -- Sum
SELECT MIN(Price), MAX(Price) FROM Products;      -- Min/Max
```

### GROUP BY

```sql
SELECT Major, COUNT(*), AVG(GPA)
FROM Students
GROUP BY Major;

SELECT DeptID, Year, AVG(Salary)
FROM Employees
GROUP BY DeptID, Year;
```

### HAVING

Filter groups (applied after GROUP BY):

```sql
SELECT Major, AVG(GPA) as AvgGPA
FROM Students
GROUP BY Major
HAVING AVG(GPA) > 3.5;
```

## Learning Objectives

By the end of this topic, you should be able to:
- Create tables with appropriate constraints
- Write SELECT queries with filtering and sorting
- Perform INSERT, UPDATE, and DELETE operations
- Use aggregate functions with GROUP BY
- Understand the difference between WHERE and HAVING
