---
id: cs205-t4-nf
title: "Normal Forms"
order: 2
---

# Normal Forms

Normal forms define levels of database schema quality. Each form eliminates specific types of redundancy and anomalies.

## First Normal Form (1NF)

### Requirements

1. All attributes contain only atomic (indivisible) values
2. No repeating groups or arrays
3. Each row is unique (has a primary key)

### Violations

```
-- NOT 1NF: Multi-valued attribute
Student(ID, Name, PhoneNumbers)
-- PhoneNumbers = "555-0100, 555-0101, 555-0102"

-- NOT 1NF: Repeating groups
Order(OrderID, Date, Item1, Qty1, Item2, Qty2, Item3, Qty3)
```

### Converting to 1NF

```sql
-- Multi-valued attribute solution
CREATE TABLE Students (
    StudentID INTEGER PRIMARY KEY,
    Name VARCHAR(100)
);

CREATE TABLE StudentPhones (
    StudentID INTEGER,
    PhoneNumber VARCHAR(20),
    PRIMARY KEY (StudentID, PhoneNumber),
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID)
);

-- Repeating groups solution
CREATE TABLE Orders (
    OrderID INTEGER PRIMARY KEY,
    OrderDate DATE
);

CREATE TABLE OrderItems (
    OrderID INTEGER,
    ItemID INTEGER,
    Quantity INTEGER,
    PRIMARY KEY (OrderID, ItemID),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);
```

## Second Normal Form (2NF)

### Requirements

1. Must be in 1NF
2. No partial dependencies on composite primary key

A **partial dependency** exists when a non-key attribute depends on only part of a composite key.

### Violation Example

```
OrderItems(OrderID, ProductID, Quantity, ProductName, ProductPrice)
Primary Key: {OrderID, ProductID}

FDs:
- {OrderID, ProductID} → Quantity  ✓ Full dependency
- ProductID → ProductName          ✗ Partial dependency
- ProductID → ProductPrice         ✗ Partial dependency

ProductName depends only on ProductID, not the full key.
```

### Converting to 2NF

```sql
-- Split into two tables
CREATE TABLE OrderItems (
    OrderID INTEGER,
    ProductID INTEGER,
    Quantity INTEGER,
    PRIMARY KEY (OrderID, ProductID)
);

CREATE TABLE Products (
    ProductID INTEGER PRIMARY KEY,
    ProductName VARCHAR(100),
    ProductPrice DECIMAL(10,2)
);
```

### 2NF with Simple Keys

Relations with single-attribute primary keys are automatically in 2NF (no partial dependencies possible).

## Third Normal Form (3NF)

### Requirements

1. Must be in 2NF
2. No transitive dependencies

A **transitive dependency** exists when: X → Y → Z, and Y is not a superkey.

### Violation Example

```
Employees(EmpID, Name, DeptID, DeptName, DeptLocation)
Primary Key: EmpID

FDs:
- EmpID → Name, DeptID, DeptName, DeptLocation
- DeptID → DeptName, DeptLocation

Transitive: EmpID → DeptID → DeptName
DeptName depends on EmpID through DeptID (non-key).
```

### Converting to 3NF

```sql
CREATE TABLE Employees (
    EmpID INTEGER PRIMARY KEY,
    Name VARCHAR(100),
    DeptID INTEGER,
    FOREIGN KEY (DeptID) REFERENCES Departments(DeptID)
);

CREATE TABLE Departments (
    DeptID INTEGER PRIMARY KEY,
    DeptName VARCHAR(50),
    DeptLocation VARCHAR(100)
);
```

### 3NF Definition (Formal)

For every non-trivial FD X → A:
- X is a superkey, OR
- A is part of some candidate key

## Boyce-Codd Normal Form (BCNF)

### Requirements

1. Must be in 3NF
2. For every non-trivial FD X → Y, X must be a superkey

BCNF is stricter than 3NF—it doesn't allow the exception for key attributes.

### Difference from 3NF

```
CourseInstructor(StudentID, CourseID, InstructorID)
Candidate keys: {StudentID, CourseID}

FDs:
- {StudentID, CourseID} → InstructorID
- InstructorID → CourseID  (instructor teaches one course)

In 3NF? Check InstructorID → CourseID:
- InstructorID is not a superkey
- CourseID is part of candidate key
- 3NF satisfied (exception applies)

In BCNF? No!
- InstructorID → CourseID where InstructorID is not superkey
- BCNF violated
```

### Converting to BCNF

```sql
-- Decompose based on violating FD
CREATE TABLE InstructorCourse (
    InstructorID INTEGER PRIMARY KEY,
    CourseID INTEGER
);

CREATE TABLE StudentInstructor (
    StudentID INTEGER,
    InstructorID INTEGER,
    PRIMARY KEY (StudentID, InstructorID)
);
```

### BCNF Caveats

Converting to BCNF may lose dependency preservation:

```
Original FD: {StudentID, CourseID} → InstructorID
After decomposition: Cannot be enforced without join
```

Trade-off: BCNF eliminates more redundancy but may sacrifice dependency preservation.

## Fourth Normal Form (4NF)

### Multi-Valued Dependencies

A multi-valued dependency X →→ Y exists when:
For each X value, there's a set of Y values independent of other attributes.

```
Employee(EmpID, Skill, Language)

If employee skills and languages are independent:
EmpID →→ Skill
EmpID →→ Language

Data anomaly:
EmpID  Skill     Language
1      Java      English
1      Java      French
1      Python    English
1      Python    French

Redundancy: Skills repeated for each language!
```

### Requirements

1. Must be in BCNF
2. No non-trivial multi-valued dependencies where X is not a superkey

### Converting to 4NF

```sql
CREATE TABLE EmployeeSkills (
    EmpID INTEGER,
    Skill VARCHAR(50),
    PRIMARY KEY (EmpID, Skill)
);

CREATE TABLE EmployeeLanguages (
    EmpID INTEGER,
    Language VARCHAR(50),
    PRIMARY KEY (EmpID, Language)
);
```

## Fifth Normal Form (5NF)

### Join Dependencies

A relation is in 5NF if it cannot be losslessly decomposed further.

5NF deals with cases where data must be reconstructed from three or more tables.

### Practical Impact

5NF violations are rare in practice. Most real-world databases are well-served by BCNF or 3NF.

## Summary Comparison

| Normal Form | Eliminates |
|-------------|------------|
| 1NF | Repeating groups, non-atomic values |
| 2NF | Partial dependencies |
| 3NF | Transitive dependencies |
| BCNF | All FD anomalies (determinant must be superkey) |
| 4NF | Multi-valued dependencies |
| 5NF | Join dependencies |

## Practical Guidelines

### When to Stop Normalizing

**3NF** is usually sufficient for:
- Typical OLTP systems
- Most business applications
- Good balance of integrity and performance

**BCNF** when:
- Data integrity is critical
- Unusual FD patterns exist

**Consider denormalization** when:
- Read performance is critical
- Data rarely changes
- Joins become too expensive

### Testing Normal Forms

```
1. List all FDs
2. Find all candidate keys
3. Check each normal form:
   - 1NF: Are all values atomic?
   - 2NF: Any partial dependencies? (composite keys)
   - 3NF: Any transitive dependencies?
   - BCNF: Is every determinant a superkey?
```

