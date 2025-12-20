---
id: cs205-t1-mapping
title: "ER to Relational Mapping"
order: 4
---

# ER to Relational Mapping

Converting an ER diagram to a relational schema requires systematic rules. Each ER construct maps to specific relational structures while preserving semantics and constraints.

## Mapping Strong Entities

### Basic Rule

Each strong entity becomes a table with:
- All simple attributes as columns
- The key attribute(s) as primary key

```
ER Diagram:
    _______
   | Name  |
   |StudentID|  (underlined = key)
   | GPA   |
   ┌───────────┐
   │  Student  │
   └───────────┘

Relational Schema:
CREATE TABLE Student (
    StudentID INTEGER PRIMARY KEY,
    Name VARCHAR(100),
    GPA DECIMAL(3,2)
);
```

### Composite Attributes

Flatten composite attributes into simple attributes:

```
ER:              Relational:
   Street        CREATE TABLE Student (
   City            StudentID INT PRIMARY KEY,
   ZIP              Name VARCHAR(100),
                    Street VARCHAR(100),    -- Flattened
Address             City VARCHAR(50),       -- Address
   │                ZIP VARCHAR(10)         -- components
Student          );
```

Alternative: Create a separate Address table if addresses are shared.

### Multi-valued Attributes

Create a separate table:

```
ER:
PhoneNumbers (multi-valued) connected to Student

Relational:
CREATE TABLE Student (
    StudentID INTEGER PRIMARY KEY,
    Name VARCHAR(100)
);

CREATE TABLE StudentPhone (
    StudentID INTEGER,
    PhoneNumber VARCHAR(20),
    PRIMARY KEY (StudentID, PhoneNumber),
    FOREIGN KEY (StudentID) REFERENCES Student(StudentID)
);
```

### Derived Attributes

Usually not stored—computed when needed:

```sql
-- Age is derived from BirthDate
-- Option 1: Don't store, compute in query
SELECT Name, TIMESTAMPDIFF(YEAR, BirthDate, CURDATE()) AS Age
FROM Student;

-- Option 2: Store for performance (with triggers to maintain)
CREATE TABLE Student (
    StudentID INTEGER PRIMARY KEY,
    Name VARCHAR(100),
    BirthDate DATE,
    Age INTEGER -- Maintained by trigger
);
```

## Mapping Weak Entities

Weak entities need their owner's key to form a composite primary key:

```
ER:
┌───────────┐          ┌═══════════════┐
│ Employee  │══════════║   Dependent   ║
└───────────┘  Has     └═══════════════┘
   EmpID             DependentName, Relationship

Relational:
CREATE TABLE Employee (
    EmpID INTEGER PRIMARY KEY,
    Name VARCHAR(100)
);

CREATE TABLE Dependent (
    EmpID INTEGER,
    DependentName VARCHAR(100),
    Relationship VARCHAR(20),
    PRIMARY KEY (EmpID, DependentName),  -- Composite key
    FOREIGN KEY (EmpID) REFERENCES Employee(EmpID)
        ON DELETE CASCADE  -- Dependents deleted with employee
);
```

## Mapping Relationships

### Binary 1:1 Relationships

Three options—choose based on participation:

**Option 1**: Foreign key on either side (both partial)
```sql
-- Employee 1:1 Passport
CREATE TABLE Employee (
    EmpID INTEGER PRIMARY KEY,
    Name VARCHAR(100)
);

CREATE TABLE Passport (
    PassportNo VARCHAR(20) PRIMARY KEY,
    IssueDate DATE,
    EmpID INTEGER UNIQUE,  -- 1:1 enforced by UNIQUE
    FOREIGN KEY (EmpID) REFERENCES Employee(EmpID)
);
```

**Option 2**: Foreign key on total participation side
```sql
-- If every employee MUST have a workspace
CREATE TABLE Employee (
    EmpID INTEGER PRIMARY KEY,
    Name VARCHAR(100),
    WorkspaceID INTEGER NOT NULL UNIQUE,  -- Total participation
    FOREIGN KEY (WorkspaceID) REFERENCES Workspace(WorkspaceID)
);
```

**Option 3**: Merge into single table (both total)
```sql
-- If both sides have total participation
CREATE TABLE EmployeePassport (
    EmpID INTEGER PRIMARY KEY,
    Name VARCHAR(100),
    PassportNo VARCHAR(20) NOT NULL UNIQUE,
    IssueDate DATE
);
```

### Binary 1:N Relationships

Foreign key goes on the "many" side:

```
ER:
Department 1───────N Employee
            Works_In

Relational:
CREATE TABLE Department (
    DeptID INTEGER PRIMARY KEY,
    DeptName VARCHAR(50)
);

CREATE TABLE Employee (
    EmpID INTEGER PRIMARY KEY,
    Name VARCHAR(100),
    DeptID INTEGER,  -- FK on "many" side
    FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
);
```

If total participation on many side:
```sql
DeptID INTEGER NOT NULL,  -- Every employee must be in a department
```

### Binary M:N Relationships

Create a junction (bridge) table:

```
ER:
Student M───Enrolls───N Course
              │
            Grade

Relational:
CREATE TABLE Student (
    StudentID INTEGER PRIMARY KEY,
    Name VARCHAR(100)
);

CREATE TABLE Course (
    CourseID INTEGER PRIMARY KEY,
    Title VARCHAR(100)
);

CREATE TABLE Enrollment (
    StudentID INTEGER,
    CourseID INTEGER,
    Grade CHAR(1),  -- Relationship attribute
    PRIMARY KEY (StudentID, CourseID),
    FOREIGN KEY (StudentID) REFERENCES Student(StudentID),
    FOREIGN KEY (CourseID) REFERENCES Course(CourseID)
);
```

### Ternary and Higher-Degree Relationships

Create a table with foreign keys to all participating entities:

```
ER:
Supplier ──┬── Supplies ──┬── Part
           │              │
           └────Project───┘

Relational:
CREATE TABLE Supplies (
    SupplierID INTEGER,
    ProjectID INTEGER,
    PartID INTEGER,
    Quantity INTEGER,
    PRIMARY KEY (SupplierID, ProjectID, PartID),
    FOREIGN KEY (SupplierID) REFERENCES Supplier(SupplierID),
    FOREIGN KEY (ProjectID) REFERENCES Project(ProjectID),
    FOREIGN KEY (PartID) REFERENCES Part(PartID)
);
```

### Unary (Recursive) Relationships

Self-referencing foreign key:

```
ER:
Employee ──Manages──○ (reflexive 1:N)

Relational:
CREATE TABLE Employee (
    EmpID INTEGER PRIMARY KEY,
    Name VARCHAR(100),
    ManagerID INTEGER,  -- Self-reference
    FOREIGN KEY (ManagerID) REFERENCES Employee(EmpID)
);
```

For M:N recursive (e.g., "is friend of"):
```sql
CREATE TABLE Friendship (
    PersonID1 INTEGER,
    PersonID2 INTEGER,
    Since DATE,
    PRIMARY KEY (PersonID1, PersonID2),
    FOREIGN KEY (PersonID1) REFERENCES Person(PersonID),
    FOREIGN KEY (PersonID2) REFERENCES Person(PersonID),
    CHECK (PersonID1 < PersonID2)  -- Avoid duplicate pairs
);
```

## Mapping Specialization/Generalization

### Option 1: Single Table with Type Discriminator

```sql
-- All entities in one table
CREATE TABLE Person (
    PersonID INTEGER PRIMARY KEY,
    Name VARCHAR(100),
    PersonType VARCHAR(20),  -- 'Student', 'Employee', 'Both'
    -- Student attributes (NULL for non-students)
    Major VARCHAR(50),
    GPA DECIMAL(3,2),
    -- Employee attributes (NULL for non-employees)
    Salary DECIMAL(10,2),
    HireDate DATE
);
```

Pros: Simple queries, no joins needed
Cons: Many NULLs, harder to enforce subclass constraints

### Option 2: Separate Tables for Each Class

```sql
-- Superclass table
CREATE TABLE Person (
    PersonID INTEGER PRIMARY KEY,
    Name VARCHAR(100)
);

-- Subclass tables
CREATE TABLE Student (
    PersonID INTEGER PRIMARY KEY,
    Major VARCHAR(50),
    GPA DECIMAL(3,2),
    FOREIGN KEY (PersonID) REFERENCES Person(PersonID)
);

CREATE TABLE Employee (
    PersonID INTEGER PRIMARY KEY,
    Salary DECIMAL(10,2),
    HireDate DATE,
    FOREIGN KEY (PersonID) REFERENCES Person(PersonID)
);
```

Pros: Clean separation, enforces constraints
Cons: Requires joins to get complete information

### Option 3: Separate Tables, No Superclass Table

```sql
-- Only subclass tables (for total, disjoint specialization)
CREATE TABLE Student (
    PersonID INTEGER PRIMARY KEY,
    Name VARCHAR(100),  -- Repeated from superclass
    Major VARCHAR(50),
    GPA DECIMAL(3,2)
);

CREATE TABLE Employee (
    PersonID INTEGER PRIMARY KEY,
    Name VARCHAR(100),  -- Repeated from superclass
    Salary DECIMAL(10,2),
    HireDate DATE
);
```

Pros: No joins for subclass queries
Cons: Redundancy, harder to query "all persons"

## Mapping Aggregation

Treat the aggregation as an entity in the higher-level relationship:

```
ER:
Project ──Works_On── Employee
              │
              └── Monitors ── Manager

Relational:
CREATE TABLE Works_On (
    ProjectID INTEGER,
    EmpID INTEGER,
    Hours INTEGER,
    PRIMARY KEY (ProjectID, EmpID),
    FOREIGN KEY (ProjectID) REFERENCES Project(ProjectID),
    FOREIGN KEY (EmpID) REFERENCES Employee(EmpID)
);

CREATE TABLE Monitors (
    ProjectID INTEGER,
    EmpID INTEGER,
    ManagerID INTEGER,
    PRIMARY KEY (ProjectID, EmpID, ManagerID),
    FOREIGN KEY (ProjectID, EmpID) REFERENCES Works_On(ProjectID, EmpID),
    FOREIGN KEY (ManagerID) REFERENCES Manager(ManagerID)
);
```

## Common Pitfalls

### Not Normalizing After Mapping

The mapping rules may produce unnormalized tables. Always check for:
- Redundancy
- Update anomalies
- Insertion anomalies
- Deletion anomalies

### Incorrect Cardinality Mapping

```
-- WRONG: M:N mapped with single FK
CREATE TABLE Student (
    StudentID INTEGER PRIMARY KEY,
    CourseID INTEGER  -- Can only enroll in ONE course!
);

-- CORRECT: Junction table for M:N
CREATE TABLE Enrollment (
    StudentID INTEGER,
    CourseID INTEGER,
    PRIMARY KEY (StudentID, CourseID)
);
```

### Missing Participation Constraints

```sql
-- If every employee MUST be in a department:
DeptID INTEGER NOT NULL,  -- Don't forget NOT NULL

-- If every department MUST have at least one employee:
-- Cannot be enforced with just foreign keys
-- Requires triggers or application logic
```

