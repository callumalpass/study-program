# Relational Algebra

Relational algebra is a procedural query language that forms the theoretical foundation for SQL. Understanding it helps you write better queries and optimize database operations.

## Fundamental Operations

Relational algebra has six fundamental operations. All other operations can be derived from these.

### Selection (σ)

Filters rows based on a condition (horizontal partitioning):

```
σ_condition(R)

Example:
Students = {(101, Alice, 3.5), (102, Bob, 2.8), (103, Carol, 3.9)}

σ_GPA>3.0(Students) = {(101, Alice, 3.5), (103, Carol, 3.9)}
```

**SQL equivalent**:
```sql
SELECT * FROM Students WHERE GPA > 3.0;
```

Conditions can use:
- Comparison: =, ≠, <, >, ≤, ≥
- Logical operators: AND (∧), OR (∨), NOT (¬)

```
σ_(GPA>3.0 ∧ Major='CS')(Students)
```

### Projection (π)

Selects specific columns (vertical partitioning):

```
π_attributes(R)

Example:
Students = {(101, Alice, 3.5), (102, Bob, 2.8)}

π_Name,GPA(Students) = {(Alice, 3.5), (Bob, 2.8)}
```

**SQL equivalent**:
```sql
SELECT Name, GPA FROM Students;
```

**Important**: Projection eliminates duplicates (relations are sets):
```
π_Major(Students) -- Returns distinct majors only
```

### Union (∪)

Combines tuples from two union-compatible relations:

```
R ∪ S

Union compatibility: Same number of attributes with compatible domains

Example:
CSStudents = {(101, Alice), (102, Bob)}
MathStudents = {(102, Bob), (103, Carol)}

CSStudents ∪ MathStudents = {(101, Alice), (102, Bob), (103, Carol)}
```

**SQL equivalent**:
```sql
SELECT * FROM CSStudents UNION SELECT * FROM MathStudents;
```

### Set Difference (−)

Tuples in first relation but not in second:

```
R − S

Example:
CSStudents − MathStudents = {(101, Alice)}
-- Students in CS but not in Math
```

**SQL equivalent**:
```sql
SELECT * FROM CSStudents EXCEPT SELECT * FROM MathStudents;
```

### Cartesian Product (×)

All combinations of tuples from two relations:

```
R × S

Example:
Students = {(1, Alice), (2, Bob)}
Courses = {(CS101, Intro), (CS201, Algo)}

Students × Courses = {
    (1, Alice, CS101, Intro),
    (1, Alice, CS201, Algo),
    (2, Bob, CS101, Intro),
    (2, Bob, CS201, Algo)
}
```

If R has n tuples and S has m tuples, R × S has n × m tuples.

**SQL equivalent**:
```sql
SELECT * FROM Students, Courses;  -- Implicit cross join
SELECT * FROM Students CROSS JOIN Courses;
```

### Rename (ρ)

Changes relation or attribute names:

```
ρ_NewName(R)           -- Rename relation
ρ_(A1,A2,...)(R)       -- Rename attributes
ρ_NewName(A1,A2,...)(R) -- Rename both

Example:
ρ_S(ID,StudentName)(Students)
-- Rename to S with attributes ID and StudentName
```

Useful for self-joins and resolving ambiguity.

## Derived Operations

### Intersection (∩)

Tuples in both relations:

```
R ∩ S = R − (R − S)

CSStudents ∩ MathStudents = {(102, Bob)}
-- Students in both CS and Math
```

**SQL equivalent**:
```sql
SELECT * FROM CSStudents INTERSECT SELECT * FROM MathStudents;
```

### Natural Join (⋈)

Combines relations on common attributes, eliminating duplicate columns:

```
R ⋈ S

Example:
Students(StudentID, Name, DeptID)
Departments(DeptID, DeptName)

Students ⋈ Departments -- Join on DeptID
```

Natural join steps:
1. Cartesian product
2. Select rows where common attributes are equal
3. Project to eliminate duplicate columns

**SQL equivalent**:
```sql
SELECT * FROM Students NATURAL JOIN Departments;
```

### Theta Join (⋈_θ)

Join with arbitrary condition:

```
R ⋈_θ S = σ_θ(R × S)

Example:
Employees ⋈_(Salary>ManagerSalary) Managers
```

### Equijoin

Theta join with equality condition (most common):

```
Students ⋈_(Students.DeptID=Departments.DeptID) Departments
```

**SQL equivalent**:
```sql
SELECT * FROM Students s JOIN Departments d ON s.DeptID = d.DeptID;
```

### Left/Right/Full Outer Join

Include non-matching tuples with NULLs:

```
Students ⟕ Departments  -- Left outer join
Students ⟖ Departments  -- Right outer join
Students ⟗ Departments  -- Full outer join
```

```sql
SELECT * FROM Students s LEFT JOIN Departments d ON s.DeptID = d.DeptID;
```

### Division (÷)

"For all" queries—tuples in R that are associated with all tuples in S:

```
R ÷ S

Example:
Enrollment(StudentID, CourseID)
RequiredCourses(CourseID)

Enrollment ÷ RequiredCourses
-- Students enrolled in ALL required courses
```

Division definition:
```
R(A, B) ÷ S(B) = π_A(R) − π_A((π_A(R) × S) − R)
```

**SQL equivalent**:
```sql
SELECT DISTINCT StudentID FROM Enrollment e1
WHERE NOT EXISTS (
    SELECT CourseID FROM RequiredCourses
    EXCEPT
    SELECT CourseID FROM Enrollment e2 WHERE e2.StudentID = e1.StudentID
);
```

## Query Examples

### Example 1: Simple Selection and Projection

Find names of students with GPA above 3.5:

```
π_Name(σ_GPA>3.5(Students))
```

```sql
SELECT Name FROM Students WHERE GPA > 3.5;
```

### Example 2: Join Query

Find names of students and their department names:

```
π_Name,DeptName(Students ⋈ Departments)
```

```sql
SELECT s.Name, d.DeptName
FROM Students s JOIN Departments d ON s.DeptID = d.DeptID;
```

### Example 3: Set Operation

Find students taking CS101 or CS201:

```
π_StudentID(σ_CourseID='CS101'(Enrollment)) ∪ π_StudentID(σ_CourseID='CS201'(Enrollment))
```

```sql
SELECT StudentID FROM Enrollment WHERE CourseID = 'CS101'
UNION
SELECT StudentID FROM Enrollment WHERE CourseID = 'CS201';
```

### Example 4: Self-Join

Find pairs of students in the same department:

```
ρ_S1(Students) ⋈_(S1.DeptID = S2.DeptID ∧ S1.ID < S2.ID) ρ_S2(Students)
```

```sql
SELECT S1.Name, S2.Name
FROM Students S1, Students S2
WHERE S1.DeptID = S2.DeptID AND S1.StudentID < S2.StudentID;
```

### Example 5: Division

Find students enrolled in all courses offered by the CS department:

```
(π_StudentID,CourseID(Enrollment)) ÷ (π_CourseID(σ_Dept='CS'(Courses)))
```

## Query Trees

Relational algebra expressions can be represented as trees:

```
Query: Find names of CS students with GPA > 3.0

        π_Name
           │
        σ_GPA>3.0
           │
        σ_Major='CS'
           │
        Students

Or optimized:
        π_Name
           │
     σ_GPA>3.0 ∧ Major='CS'
           │
        Students
```

Query optimizers transform these trees to find efficient execution plans.

## Algebraic Laws

### Selection Laws

**Cascade**: σ_c1 ∧ c2(R) = σ_c1(σ_c2(R))
**Commutative**: σ_c1(σ_c2(R)) = σ_c2(σ_c1(R))

### Projection Laws

**Cascade**: π_L1(π_L2(R)) = π_L1(R) if L1 ⊆ L2
**Selection-Projection**: π_L(σ_c(R)) = σ_c(π_L(R)) if c uses only L attributes

### Join Laws

**Commutative**: R ⋈ S = S ⋈ R
**Associative**: (R ⋈ S) ⋈ T = R ⋈ (S ⋈ T)

### Pushing Selection Down

σ_c(R ⋈ S) = (σ_c(R)) ⋈ S  (if c involves only R's attributes)

This optimization reduces the size of intermediate results.

## Relational Algebra vs SQL

| Relational Algebra | SQL |
|--------------------|-----|
| σ_condition(R) | WHERE condition |
| π_attributes(R) | SELECT attributes |
| R × S | FROM R, S or CROSS JOIN |
| R ⋈ S | JOIN or NATURAL JOIN |
| R ∪ S | UNION |
| R − S | EXCEPT |
| R ∩ S | INTERSECT |
| ρ_NewName(R) | AS NewName |

Understanding relational algebra helps you:
1. Write correct SQL queries
2. Understand query execution plans
3. Optimize database performance
4. Design better schemas

