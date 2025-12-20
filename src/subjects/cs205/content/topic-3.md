# Advanced SQL Queries

Building on SQL fundamentals, advanced queries enable complex data retrieval through joins, subqueries, set operations, and window functions.

## Join Operations

### Inner Join

Returns rows with matches in both tables:

```sql
SELECT s.Name, d.DeptName
FROM Students s
INNER JOIN Departments d ON s.DeptID = d.DeptID;
```

Only students with a department and departments with students appear.

### Left Outer Join

Returns all rows from left table, with NULLs for non-matches:

```sql
SELECT s.Name, d.DeptName
FROM Students s
LEFT JOIN Departments d ON s.DeptID = d.DeptID;
```

All students appear, even those without a department.

### Right Outer Join

Returns all rows from right table:

```sql
SELECT s.Name, d.DeptName
FROM Students s
RIGHT JOIN Departments d ON s.DeptID = d.DeptID;
```

### Full Outer Join

Returns all rows from both tables:

```sql
SELECT s.Name, d.DeptName
FROM Students s
FULL OUTER JOIN Departments d ON s.DeptID = d.DeptID;
```

### Self Join

Join a table to itself:

```sql
SELECT e.Name AS Employee, m.Name AS Manager
FROM Employees e
LEFT JOIN Employees m ON e.ManagerID = m.EmpID;
```

### Multiple Joins

```sql
SELECT s.Name, c.Title, e.Grade
FROM Students s
JOIN Enrollments e ON s.StudentID = e.StudentID
JOIN Courses c ON e.CourseID = c.CourseID;
```

## Subqueries

### Scalar Subqueries

Return a single value:

```sql
SELECT Name, GPA,
       (SELECT AVG(GPA) FROM Students) AS AvgGPA
FROM Students;

SELECT * FROM Students
WHERE GPA > (SELECT AVG(GPA) FROM Students);
```

### Table Subqueries

Return a table used with IN, EXISTS, or FROM:

```sql
-- IN subquery
SELECT * FROM Students
WHERE DeptID IN (SELECT DeptID FROM Departments WHERE Budget > 100000);

-- EXISTS subquery
SELECT * FROM Departments d
WHERE EXISTS (SELECT 1 FROM Students s WHERE s.DeptID = d.DeptID);

-- Derived table (FROM clause)
SELECT DeptName, StudentCount
FROM (
    SELECT DeptID, COUNT(*) AS StudentCount
    FROM Students
    GROUP BY DeptID
) counts
JOIN Departments d ON counts.DeptID = d.DeptID;
```

### Correlated Subqueries

Reference outer query in subquery:

```sql
SELECT s.Name, s.GPA
FROM Students s
WHERE s.GPA > (
    SELECT AVG(s2.GPA)
    FROM Students s2
    WHERE s2.DeptID = s.DeptID
);
```

## Set Operations

### UNION

Combine results, removing duplicates:

```sql
SELECT Name FROM Students
UNION
SELECT Name FROM Alumni;
```

### UNION ALL

Combine results, keeping duplicates:

```sql
SELECT Name FROM Students
UNION ALL
SELECT Name FROM Alumni;
```

### INTERSECT

Rows in both results:

```sql
SELECT StudentID FROM CSStudents
INTERSECT
SELECT StudentID FROM MathStudents;
```

### EXCEPT

Rows in first but not second:

```sql
SELECT StudentID FROM CSStudents
EXCEPT
SELECT StudentID FROM MathStudents;
```

## Window Functions

### Basic Syntax

```sql
SELECT Name, DeptID, Salary,
       AVG(Salary) OVER (PARTITION BY DeptID) AS DeptAvg,
       SUM(Salary) OVER (PARTITION BY DeptID) AS DeptTotal
FROM Employees;
```

### Ranking Functions

```sql
SELECT Name, Salary,
       ROW_NUMBER() OVER (ORDER BY Salary DESC) AS RowNum,
       RANK() OVER (ORDER BY Salary DESC) AS Rank,
       DENSE_RANK() OVER (ORDER BY Salary DESC) AS DenseRank
FROM Employees;
```

### Running Totals

```sql
SELECT OrderDate, Amount,
       SUM(Amount) OVER (ORDER BY OrderDate) AS RunningTotal
FROM Orders;
```

## Common Table Expressions (CTEs)

```sql
WITH DeptStats AS (
    SELECT DeptID, AVG(Salary) AS AvgSalary
    FROM Employees
    GROUP BY DeptID
)
SELECT e.Name, e.Salary, d.AvgSalary
FROM Employees e
JOIN DeptStats d ON e.DeptID = d.DeptID
WHERE e.Salary > d.AvgSalary;
```

### Recursive CTEs

```sql
WITH RECURSIVE OrgChart AS (
    SELECT EmpID, Name, ManagerID, 1 AS Level
    FROM Employees
    WHERE ManagerID IS NULL

    UNION ALL

    SELECT e.EmpID, e.Name, e.ManagerID, o.Level + 1
    FROM Employees e
    JOIN OrgChart o ON e.ManagerID = o.EmpID
)
SELECT * FROM OrgChart ORDER BY Level;
```

## Learning Objectives

By the end of this topic, you should be able to:
- Write queries using different join types
- Use subqueries in SELECT, FROM, and WHERE clauses
- Apply set operations (UNION, INTERSECT, EXCEPT)
- Use window functions for analytics
- Create and use Common Table Expressions
