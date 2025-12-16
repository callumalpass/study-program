# Integrity Constraints in Relational Databases

Integrity constraints are rules that ensure the accuracy, consistency, and reliability of data stored in a relational database. These constraints form a critical part of database design and are enforced by the database management system (DBMS) to prevent invalid data from being entered into the database. Understanding and properly implementing integrity constraints is essential for maintaining data quality and preventing anomalies that could compromise the integrity of your data.

## Types of Integrity Constraints

Database systems support several categories of integrity constraints, each serving a specific purpose in maintaining data quality:

### Domain Constraints

Domain constraints specify the valid set of values that an attribute can take. Every attribute in a relation must be defined over a domain, and any value assigned to that attribute must come from that domain:

```sql
CREATE TABLE Products (
    ProductID INTEGER,
    Name VARCHAR(100),
    Price DECIMAL(10,2) CHECK (Price >= 0),
    Quantity INTEGER CHECK (Quantity >= 0),
    Category VARCHAR(50)
);
```

The `CHECK` constraint ensures that Price and Quantity cannot be negative. Domain constraints also include data types themselves - an INTEGER column cannot contain text values.

Common domain constraint types:
- **Data type restrictions**: INTEGER, VARCHAR, DATE, etc.
- **Length restrictions**: VARCHAR(100) limits string length
- **Range restrictions**: CHECK (age BETWEEN 0 AND 150)
- **Pattern restrictions**: CHECK (email LIKE '%@%.%')
- **Enumeration**: CHECK (status IN ('Active', 'Inactive', 'Pending'))

### Entity Integrity Constraint

Entity integrity ensures that each row in a table is uniquely identifiable. This is enforced through the **primary key constraint**, which requires:

1. **Uniqueness**: No two rows can have the same primary key value
2. **Not Null**: Primary key columns cannot contain NULL values

```sql
CREATE TABLE Employees (
    EmployeeID INTEGER PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Department VARCHAR(50)
);
```

The primary key uniquely identifies each employee. Attempting to insert a duplicate EmployeeID or a NULL value will result in an error:

```sql
-- This will fail - duplicate primary key
INSERT INTO Employees VALUES (1, 'John', 'Sales');
INSERT INTO Employees VALUES (1, 'Jane', 'HR'); -- Error!

-- This will fail - NULL primary key
INSERT INTO Employees VALUES (NULL, 'Bob', 'IT'); -- Error!
```

### Referential Integrity Constraint

Referential integrity ensures that relationships between tables remain consistent. It is enforced through **foreign key constraints**, which require that a foreign key value must either:

1. Match an existing primary key value in the referenced table, OR
2. Be NULL (if NULLs are allowed)

```sql
CREATE TABLE Departments (
    DeptID INTEGER PRIMARY KEY,
    DeptName VARCHAR(100)
);

CREATE TABLE Employees (
    EmpID INTEGER PRIMARY KEY,
    Name VARCHAR(100),
    DeptID INTEGER REFERENCES Departments(DeptID)
);
```

The foreign key ensures that every employee must belong to an existing department:

```sql
-- This works - department 1 exists
INSERT INTO Departments VALUES (1, 'Engineering');
INSERT INTO Employees VALUES (100, 'Alice', 1);

-- This fails - department 99 doesn't exist
INSERT INTO Employees VALUES (101, 'Bob', 99); -- Error!
```

## Referential Actions

When a referenced row is updated or deleted, the DBMS can take various actions. These **referential actions** determine how to handle the dependent rows:

### ON DELETE Actions

```sql
CREATE TABLE OrderItems (
    ItemID INTEGER PRIMARY KEY,
    OrderID INTEGER REFERENCES Orders(OrderID)
        ON DELETE CASCADE,
    ProductID INTEGER,
    Quantity INTEGER
);
```

Available actions:
- **CASCADE**: Delete dependent rows when the parent is deleted
- **SET NULL**: Set foreign key to NULL when parent is deleted
- **SET DEFAULT**: Set foreign key to its default value
- **RESTRICT**: Prevent deletion if dependent rows exist (default)
- **NO ACTION**: Similar to RESTRICT, but checked at transaction end

### ON UPDATE Actions

```sql
CREATE TABLE Enrollments (
    StudentID INTEGER REFERENCES Students(StudentID)
        ON UPDATE CASCADE,
    CourseID INTEGER REFERENCES Courses(CourseID)
        ON UPDATE CASCADE,
    PRIMARY KEY (StudentID, CourseID)
);
```

When a student's ID is updated, the CASCADE action automatically updates all enrollment records to maintain consistency.

### Choosing the Right Action

Consider the semantics of your data:

| Scenario | Recommended Action |
|----------|-------------------|
| Order items when order is deleted | CASCADE (items have no meaning without order) |
| Orders when customer is deleted | SET NULL or RESTRICT (orders may have historical value) |
| Employee's manager when manager leaves | SET NULL (employee still exists) |
| Audit logs referencing deleted users | NO ACTION (preserve historical record) |

## NOT NULL Constraint

The NOT NULL constraint ensures that a column cannot contain NULL values:

```sql
CREATE TABLE Customers (
    CustomerID INTEGER PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Phone VARCHAR(20)  -- NULL is allowed here
);
```

Use NOT NULL when:
- The attribute is essential for the entity (e.g., a person's name)
- The business logic requires a value (e.g., order total)
- The column participates in a primary key

## UNIQUE Constraint

The UNIQUE constraint ensures that all values in a column (or combination of columns) are distinct:

```sql
CREATE TABLE Users (
    UserID INTEGER PRIMARY KEY,
    Username VARCHAR(50) UNIQUE,
    Email VARCHAR(255) UNIQUE,
    Phone VARCHAR(20) UNIQUE
);
```

Difference from PRIMARY KEY:
- A table can have multiple UNIQUE constraints
- UNIQUE allows NULL values (usually one NULL per column)
- PRIMARY KEY is conceptually the main identifier

### Composite Unique Constraints

```sql
CREATE TABLE CourseSchedule (
    ScheduleID INTEGER PRIMARY KEY,
    Room VARCHAR(20),
    TimeSlot INTEGER,
    DayOfWeek INTEGER,
    UNIQUE (Room, TimeSlot, DayOfWeek)
);
```

This ensures no two classes are scheduled in the same room at the same time on the same day.

## CHECK Constraints

CHECK constraints enforce complex domain rules that go beyond simple data types:

### Single-Column Checks

```sql
CREATE TABLE Products (
    ProductID INTEGER PRIMARY KEY,
    Price DECIMAL(10,2) CHECK (Price > 0),
    DiscountPercent INTEGER CHECK (DiscountPercent BETWEEN 0 AND 100),
    Status VARCHAR(20) CHECK (Status IN ('Active', 'Discontinued', 'Coming Soon'))
);
```

### Multi-Column Checks

```sql
CREATE TABLE Orders (
    OrderID INTEGER PRIMARY KEY,
    OrderDate DATE,
    ShipDate DATE,
    CHECK (ShipDate >= OrderDate),
    StartPrice DECIMAL(10,2),
    FinalPrice DECIMAL(10,2),
    CHECK (FinalPrice <= StartPrice)  -- No price increases!
);
```

### Complex Business Rules

```sql
CREATE TABLE Employees (
    EmpID INTEGER PRIMARY KEY,
    Salary DECIMAL(12,2),
    Commission DECIMAL(12,2),
    EmployeeType VARCHAR(20),
    CHECK (
        (EmployeeType = 'Sales' AND Commission IS NOT NULL) OR
        (EmployeeType != 'Sales' AND Commission IS NULL)
    )
);
```

This ensures only sales employees have commission values.

## DEFAULT Constraints

DEFAULT constraints provide automatic values when no value is specified:

```sql
CREATE TABLE Orders (
    OrderID INTEGER PRIMARY KEY,
    CustomerID INTEGER REFERENCES Customers(CustomerID),
    OrderDate DATE DEFAULT CURRENT_DATE,
    Status VARCHAR(20) DEFAULT 'Pending',
    ShipCost DECIMAL(10,2) DEFAULT 0.00
);

-- Defaults are applied automatically
INSERT INTO Orders (OrderID, CustomerID) VALUES (1, 100);
-- Result: OrderDate = today, Status = 'Pending', ShipCost = 0.00
```

Default values can be:
- Literal values: DEFAULT 0, DEFAULT 'Unknown'
- System values: DEFAULT CURRENT_DATE, DEFAULT CURRENT_USER
- Expressions: DEFAULT (CURRENT_DATE + INTERVAL '7 days')

## Constraint Naming and Management

Named constraints are easier to modify and troubleshoot:

```sql
CREATE TABLE Employees (
    EmpID INTEGER CONSTRAINT pk_employees PRIMARY KEY,
    Email VARCHAR(255) CONSTRAINT uq_emp_email UNIQUE,
    Salary DECIMAL(12,2) CONSTRAINT chk_salary_positive CHECK (Salary > 0),
    DeptID INTEGER CONSTRAINT fk_emp_dept REFERENCES Departments(DeptID)
);
```

### Adding Constraints to Existing Tables

```sql
ALTER TABLE Products
ADD CONSTRAINT chk_price_positive CHECK (Price > 0);

ALTER TABLE Orders
ADD CONSTRAINT fk_orders_customer
FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID);
```

### Removing Constraints

```sql
ALTER TABLE Products
DROP CONSTRAINT chk_price_positive;
```

### Disabling and Enabling Constraints

Some databases allow temporarily disabling constraints for bulk operations:

```sql
-- PostgreSQL
ALTER TABLE Orders DISABLE TRIGGER ALL;
-- ... bulk load ...
ALTER TABLE Orders ENABLE TRIGGER ALL;

-- SQL Server
ALTER TABLE Orders NOCHECK CONSTRAINT fk_orders_customer;
-- ... bulk load ...
ALTER TABLE Orders CHECK CONSTRAINT fk_orders_customer;
```

## Constraint Violations and Error Handling

When a constraint is violated, the DBMS raises an error and the operation is rolled back:

```sql
-- Handling constraint violations in application code
BEGIN TRANSACTION;
    INSERT INTO Orders (OrderID, CustomerID, OrderDate)
    VALUES (100, 999, '2024-01-15');
    -- If CustomerID 999 doesn't exist, this fails
COMMIT;
-- If insert failed, transaction is rolled back
```

Common constraint violation errors:
- Primary key violation: Duplicate key value
- Foreign key violation: Referenced row not found
- Check constraint violation: Value doesn't satisfy condition
- Not null violation: NULL value in NOT NULL column

## Performance Considerations

Constraints have performance implications:

**Benefits:**
- Constraints allow the query optimizer to make assumptions
- The DBMS can use constraints for query rewriting
- Data quality is guaranteed at the database level

**Costs:**
- Every INSERT/UPDATE is checked against constraints
- Foreign keys require lookups in referenced tables
- Complex CHECK constraints add validation overhead

**Best practices:**
- Use constraints for data integrity, not for optional business rules
- Index foreign key columns for faster lookups
- Consider deferred constraint checking for batch operations
- Balance constraint complexity with performance needs

## Declarative vs Procedural Integrity

Constraints provide **declarative integrity**—you specify *what* must be true, and the DBMS enforces it. The alternative is **procedural integrity** using triggers and application code:

| Aspect | Declarative (Constraints) | Procedural (Triggers/Code) |
|--------|---------------------------|---------------------------|
| Simplicity | Simple to declare | More complex to implement |
| Performance | Optimized by DBMS | May have overhead |
| Flexibility | Limited to constraint types | Unlimited logic possible |
| Enforcement | Always enforced | Can be bypassed |
| Portability | Standard SQL | Database-specific |

Best practice: Use declarative constraints when possible, and triggers only for complex rules that constraints cannot express.
