# Normalization Theory

Normalization is the process of organizing database tables to reduce redundancy and dependency. Understanding normalization helps prevent data anomalies and ensures data integrity.

## Why Normalize?

### Data Anomalies

Poor schema design leads to anomalies:

**Update Anomaly**: Same information stored multiple times must be updated everywhere.
```
StudentCourse(StudentID, StudentName, CourseID, CourseName, InstructorID, InstructorName)

Changing instructor name requires updating many rows.
```

**Insert Anomaly**: Cannot insert data without other unrelated data.
```
Cannot add a new instructor without assigning them to a course.
```

**Delete Anomaly**: Deleting data causes unintended loss of other data.
```
Deleting the last student in a course loses the course information.
```

### Benefits of Normalization

- Eliminates redundant data
- Ensures data consistency
- Simplifies data modification
- Reduces storage space
- Improves query performance (often)

## Functional Dependencies

### Definition

X → Y means: if two rows have the same X values, they must have the same Y values.

```
StudentID → StudentName  (StudentID determines StudentName)
{CourseID, Semester} → InstructorID  (Course+Semester determines Instructor)
```

### Trivial Dependencies

X → Y is trivial if Y ⊆ X:
```
{StudentID, Name} → StudentID  (trivial)
```

### Closure

X⁺ is the set of all attributes determined by X:
```
Given: A → B, B → C
{A}⁺ = {A, B, C}
```

## Normal Forms

### First Normal Form (1NF)

All attributes must be atomic (no repeating groups or arrays).

**Not 1NF**:
```
Student(ID, Name, PhoneNumbers)  -- PhoneNumbers is a list
```

**1NF**:
```
Student(ID, Name)
StudentPhone(ID, PhoneNumber)
```

### Second Normal Form (2NF)

1NF + no partial dependencies on composite keys.

**Not 2NF**:
```
OrderItem(OrderID, ProductID, Quantity, ProductName)
-- ProductName depends only on ProductID, not the full key
```

**2NF**:
```
OrderItem(OrderID, ProductID, Quantity)
Product(ProductID, ProductName)
```

### Third Normal Form (3NF)

2NF + no transitive dependencies.

**Not 3NF**:
```
Employee(EmpID, DeptID, DeptName)
-- DeptName depends on DeptID, not directly on EmpID
```

**3NF**:
```
Employee(EmpID, DeptID)
Department(DeptID, DeptName)
```

### Boyce-Codd Normal Form (BCNF)

For every FD X → Y, X must be a superkey.

BCNF is stricter than 3NF. Most 3NF schemas are also BCNF.

### Fourth Normal Form (4NF)

Eliminates multi-valued dependencies.

### Fifth Normal Form (5NF)

Eliminates join dependencies.

## Normalization Process

### Step 1: Identify Functional Dependencies

Analyze business rules to find all FDs.

### Step 2: Find Candidate Keys

Use closure to identify all candidate keys.

### Step 3: Check Normal Forms

Determine current normal form by checking violations.

### Step 4: Decompose

Split tables to eliminate violations while preserving:
- **Lossless join**: Can reconstruct original data
- **Dependency preservation**: All FDs can still be enforced

## Denormalization

Sometimes intentionally violate normal forms for performance:
- Reduce joins in read-heavy workloads
- Store computed values
- Create summary tables

Trade-off: Performance vs. data integrity (requires careful maintenance).

## Learning Objectives

By the end of this topic, you should be able to:
- Identify functional dependencies
- Recognize and fix data anomalies
- Normalize tables to 3NF and BCNF
- Understand the trade-offs of normalization
- Make informed denormalization decisions
