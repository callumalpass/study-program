# Keys and Constraints

Keys are fundamental to the relational model, enabling unique identification of rows and establishing relationships between tables. Constraints enforce data integrity rules.

## Types of Keys

### Superkeys

A superkey is any set of attributes that uniquely identifies tuples in a relation. Given a relation R with attributes {A, B, C, D}:

- If {A} is unique, then {A}, {A,B}, {A,C}, {A,B,C,D} are all superkeys
- Superkeys can contain "extra" attributes

```
Students(StudentID, SSN, Name, Email)

Superkeys:
- {StudentID}
- {SSN}
- {Email}
- {StudentID, SSN}
- {StudentID, Name}
- {StudentID, SSN, Name, Email}
- ... any set containing a unique identifier
```

### Candidate Keys

A candidate key is a minimal superkey—removing any attribute would make it no longer unique:

```
Students(StudentID, SSN, Name, Email)

Candidate keys (assuming unique):
- {StudentID}  -- Minimal
- {SSN}        -- Minimal
- {Email}      -- Minimal

NOT a candidate key:
- {StudentID, SSN}  -- Not minimal (StudentID alone is sufficient)
```

### Primary Key

The primary key is the chosen candidate key for a relation:

```sql
CREATE TABLE Students (
    StudentID INTEGER PRIMARY KEY,  -- Chosen candidate key
    SSN CHAR(11) UNIQUE,            -- Alternative key
    Email VARCHAR(100) UNIQUE,       -- Alternative key
    Name VARCHAR(100)
);
```

Primary key requirements:
- Must be unique across all rows
- Cannot contain NULL values (any attribute)
- Should be stable (rarely changed)
- Preferably minimal (few attributes)

### Foreign Keys

A foreign key is an attribute (or set of attributes) that references the primary key of another relation:

```sql
CREATE TABLE Enrollments (
    EnrollmentID INTEGER PRIMARY KEY,
    StudentID INTEGER REFERENCES Students(StudentID),
    CourseID INTEGER REFERENCES Courses(CourseID),
    Grade CHAR(1)
);
```

Foreign keys establish relationships and enforce referential integrity.

## Key Selection Guidelines

### Natural vs Surrogate Keys

**Natural keys** use real-world identifiers:
```sql
-- Natural key
CREATE TABLE Countries (
    CountryCode CHAR(2) PRIMARY KEY,  -- ISO code like 'US', 'GB'
    Name VARCHAR(100)
);
```

Advantages: Meaningful, self-documenting
Disadvantages: Can change, may be complex

**Surrogate keys** are system-generated:
```sql
-- Surrogate key
CREATE TABLE Countries (
    CountryID INTEGER PRIMARY KEY AUTO_INCREMENT,
    CountryCode CHAR(2) UNIQUE,
    Name VARCHAR(100)
);
```

Advantages: Stable, simple, efficient joins
Disadvantages: Meaningless, requires additional lookup

### Composite Keys

When no single attribute is unique, use multiple attributes:

```sql
CREATE TABLE OrderItems (
    OrderID INTEGER,
    ProductID INTEGER,
    Quantity INTEGER,
    Price DECIMAL(10,2),
    PRIMARY KEY (OrderID, ProductID),  -- Composite key
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);
```

## Integrity Constraints

### Entity Integrity Constraint

Ensures primary keys are never NULL and always unique:

```sql
-- This fails
INSERT INTO Students (StudentID, Name) VALUES (NULL, 'Alice');
-- Error: PRIMARY KEY cannot be NULL

-- This also fails (duplicate)
INSERT INTO Students (StudentID, Name) VALUES (101, 'Bob');
INSERT INTO Students (StudentID, Name) VALUES (101, 'Carol');
-- Error: Duplicate entry for PRIMARY KEY
```

### Referential Integrity Constraint

Foreign keys must reference existing primary keys or be NULL:

```sql
-- Setup
CREATE TABLE Departments (
    DeptID INTEGER PRIMARY KEY,
    Name VARCHAR(50)
);

CREATE TABLE Employees (
    EmpID INTEGER PRIMARY KEY,
    Name VARCHAR(100),
    DeptID INTEGER REFERENCES Departments(DeptID)
);

-- This fails (no department 999)
INSERT INTO Employees VALUES (1, 'Alice', 999);
-- Error: Foreign key constraint violation

-- This succeeds (NULL is allowed unless NOT NULL specified)
INSERT INTO Employees VALUES (2, 'Bob', NULL);
-- OK: Employee with no department
```

### Referential Actions

What happens when a referenced row is deleted or updated?

```sql
CREATE TABLE Employees (
    EmpID INTEGER PRIMARY KEY,
    Name VARCHAR(100),
    DeptID INTEGER,
    FOREIGN KEY (DeptID) REFERENCES Departments(DeptID)
        ON DELETE SET NULL      -- Set to NULL when department deleted
        ON UPDATE CASCADE       -- Update when department ID changes
);
```

Options:
- **CASCADE**: Propagate the change
- **SET NULL**: Set foreign key to NULL
- **SET DEFAULT**: Set to default value
- **RESTRICT**: Prevent the change
- **NO ACTION**: Similar to RESTRICT (check deferred)

### Domain Constraints

Restrict attribute values to their domain:

```sql
CREATE TABLE Products (
    ProductID INTEGER PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Price DECIMAL(10,2) CHECK (Price > 0),
    Quantity INTEGER DEFAULT 0 CHECK (Quantity >= 0),
    Category VARCHAR(20) CHECK (Category IN ('Electronics', 'Clothing', 'Food'))
);
```

### Semantic Constraints

Business rules that span multiple attributes or tables:

```sql
-- Check constraint across attributes
CREATE TABLE Orders (
    OrderID INTEGER PRIMARY KEY,
    OrderDate DATE,
    ShipDate DATE,
    CHECK (ShipDate >= OrderDate)  -- Ship after order
);

-- Trigger for complex constraints
CREATE TRIGGER CheckInventory
BEFORE INSERT ON OrderItems
FOR EACH ROW
BEGIN
    DECLARE avail INTEGER;
    SELECT Quantity INTO avail FROM Products WHERE ProductID = NEW.ProductID;
    IF NEW.Quantity > avail THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insufficient inventory';
    END IF;
END;
```

## Functional Dependencies

### Definition

A functional dependency X → Y means that for any two tuples t₁ and t₂:
If t₁[X] = t₂[X], then t₁[Y] = t₂[Y]

In other words: X determines Y, or Y depends on X.

```
StudentID → Name        -- Student ID determines name
StudentID → GPA         -- Student ID determines GPA
{OrderID, ProductID} → Quantity  -- Order+Product determines quantity
```

### Armstrong's Axioms

Rules for inferring functional dependencies:

**Reflexivity**: If Y ⊆ X, then X → Y
```
{StudentID, Name} → StudentID  -- Trivial
```

**Augmentation**: If X → Y, then XZ → YZ
```
StudentID → Name implies
{StudentID, CourseID} → {Name, CourseID}
```

**Transitivity**: If X → Y and Y → Z, then X → Z
```
StudentID → DeptID and DeptID → DeptName implies
StudentID → DeptName
```

### Closure of Attributes

The closure X⁺ is all attributes functionally determined by X:

```
Given FDs: A → B, B → C, AC → D

To find {A}⁺:
1. Start: {A}
2. Apply A → B: {A, B}
3. Apply B → C: {A, B, C}
4. Apply AC → D: {A, B, C, D}

{A}⁺ = {A, B, C, D}
```

### Key Identification

X is a superkey if X⁺ = all attributes:

```
Students(StudentID, SSN, Name, Email, DeptID)
FDs: StudentID → Name, Email, DeptID
     SSN → Name, Email, DeptID

{StudentID}⁺ = {StudentID, Name, Email, DeptID} ≠ all attributes
-- Not a superkey (missing SSN)

Adding: StudentID → SSN
{StudentID}⁺ = {StudentID, SSN, Name, Email, DeptID} = all
-- Now StudentID is a superkey
```

## Constraint Enforcement

### Timing

Constraints can be checked:
- **Immediate**: After each statement
- **Deferred**: At transaction commit

```sql
-- Deferred constraints for circular references
SET CONSTRAINTS ALL DEFERRED;

INSERT INTO Employees (EmpID, ManagerID) VALUES (1, 2);
INSERT INTO Employees (EmpID, ManagerID) VALUES (2, 1);

COMMIT;  -- Constraints checked here
```

### Performance Considerations

Constraints have costs:
- UNIQUE/PRIMARY KEY: Requires index lookup on insert/update
- FOREIGN KEY: Requires lookup in referenced table
- CHECK: Evaluated on insert/update

Balance integrity against performance, but prefer constraints over application-level checks for critical rules.

