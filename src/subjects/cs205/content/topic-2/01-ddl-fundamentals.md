# Data Definition Language Fundamentals

DDL commands define and modify database structure. Understanding DDL is essential for creating well-designed schemas that enforce data integrity.

## CREATE TABLE

### Basic Syntax

```sql
CREATE TABLE table_name (
    column1 datatype [constraints],
    column2 datatype [constraints],
    ...
    [table_constraints]
);
```

### Complete Example

```sql
CREATE TABLE Employees (
    EmpID INTEGER PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) UNIQUE,
    HireDate DATE DEFAULT CURRENT_DATE,
    Salary DECIMAL(10,2) CHECK (Salary > 0),
    DeptID INTEGER,
    ManagerID INTEGER,
    FOREIGN KEY (DeptID) REFERENCES Departments(DeptID),
    FOREIGN KEY (ManagerID) REFERENCES Employees(EmpID)
);
```

## Data Types

### Numeric Types

```sql
-- Exact integers
SMALLINT        -- 2 bytes, -32,768 to 32,767
INTEGER (INT)   -- 4 bytes, ~±2 billion
BIGINT          -- 8 bytes, ~±9 quintillion

-- Exact decimals
DECIMAL(p,s)    -- p total digits, s after decimal
NUMERIC(p,s)    -- Same as DECIMAL

-- Approximate
REAL            -- 4 bytes, ~7 decimal digits precision
DOUBLE PRECISION -- 8 bytes, ~15 decimal digits
FLOAT(n)        -- Variable precision
```

**Example usage**:
```sql
Price DECIMAL(10,2),     -- Up to 99,999,999.99
Quantity INTEGER,
InterestRate DECIMAL(5,4) -- 0.0000 to 9.9999
```

### Character Types

```sql
CHAR(n)         -- Fixed-length, padded with spaces
VARCHAR(n)      -- Variable-length, up to n characters
TEXT            -- Unlimited length (implementation varies)
```

**When to use each**:
```sql
-- CHAR: Fixed-length codes
StateCode CHAR(2),       -- 'CA', 'NY'
CountryCode CHAR(3),     -- 'USA', 'GBR'

-- VARCHAR: Variable-length strings
Name VARCHAR(100),
Description VARCHAR(500),

-- TEXT: Large text content
ArticleBody TEXT
```

### Date and Time Types

```sql
DATE            -- Date only: '2024-01-15'
TIME            -- Time only: '14:30:00'
TIMESTAMP       -- Date + Time: '2024-01-15 14:30:00'
INTERVAL        -- Duration: '3 days', '2 hours'
```

**Example usage**:
```sql
BirthDate DATE,
StartTime TIME,
CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
Duration INTERVAL
```

### Other Types

```sql
BOOLEAN         -- TRUE, FALSE, NULL
BLOB            -- Binary Large Object
JSON            -- JSON data (PostgreSQL, MySQL)
UUID            -- Universally Unique Identifier
ARRAY           -- Array type (PostgreSQL)
```

## Column Constraints

### NOT NULL

Value must be provided:

```sql
CREATE TABLE Products (
    ProductID INTEGER PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,  -- Required
    Description TEXT             -- Optional (NULL allowed)
);

-- Insert without Name fails
INSERT INTO Products (ProductID) VALUES (1);  -- Error!
```

### UNIQUE

No duplicate values (NULLs may be allowed):

```sql
CREATE TABLE Users (
    UserID INTEGER PRIMARY KEY,
    Email VARCHAR(100) UNIQUE,      -- No duplicate emails
    Phone VARCHAR(20) UNIQUE        -- No duplicate phones
);

-- Composite unique
CREATE TABLE Enrollment (
    StudentID INTEGER,
    CourseID INTEGER,
    UNIQUE (StudentID, CourseID)    -- Combination must be unique
);
```

### PRIMARY KEY

Unique identifier for rows (NOT NULL + UNIQUE):

```sql
-- Single column
CREATE TABLE Customers (
    CustomerID INTEGER PRIMARY KEY,
    Name VARCHAR(100)
);

-- Composite primary key
CREATE TABLE OrderItems (
    OrderID INTEGER,
    ProductID INTEGER,
    Quantity INTEGER,
    PRIMARY KEY (OrderID, ProductID)
);

-- Auto-increment (database-specific)
CREATE TABLE Products (
    ProductID INTEGER PRIMARY KEY AUTO_INCREMENT,  -- MySQL
    -- ProductID SERIAL PRIMARY KEY,              -- PostgreSQL
    Name VARCHAR(100)
);
```

### FOREIGN KEY

Reference to another table's primary key:

```sql
CREATE TABLE Orders (
    OrderID INTEGER PRIMARY KEY,
    CustomerID INTEGER,
    OrderDate DATE,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

-- With referential actions
CREATE TABLE OrderItems (
    ItemID INTEGER PRIMARY KEY,
    OrderID INTEGER,
    ProductID INTEGER,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
        ON DELETE CASCADE           -- Delete items when order deleted
        ON UPDATE CASCADE,          -- Update if OrderID changes
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
        ON DELETE RESTRICT          -- Prevent product deletion if referenced
);
```

### CHECK

Custom validation rules:

```sql
CREATE TABLE Employees (
    EmpID INTEGER PRIMARY KEY,
    Age INTEGER CHECK (Age >= 18 AND Age <= 100),
    Salary DECIMAL(10,2) CHECK (Salary > 0),
    StartDate DATE,
    EndDate DATE,
    CHECK (EndDate IS NULL OR EndDate > StartDate)
);
```

### DEFAULT

Automatic value when not specified:

```sql
CREATE TABLE Orders (
    OrderID INTEGER PRIMARY KEY,
    OrderDate DATE DEFAULT CURRENT_DATE,
    Status VARCHAR(20) DEFAULT 'Pending',
    Quantity INTEGER DEFAULT 1
);

INSERT INTO Orders (OrderID) VALUES (1);
-- OrderDate = today, Status = 'Pending', Quantity = 1
```

## ALTER TABLE

### Add Column

```sql
ALTER TABLE Employees ADD COLUMN MiddleName VARCHAR(50);
ALTER TABLE Employees ADD COLUMN Bonus DECIMAL(10,2) DEFAULT 0;
```

### Drop Column

```sql
ALTER TABLE Employees DROP COLUMN MiddleName;
```

### Modify Column

```sql
-- Change data type (syntax varies by database)
ALTER TABLE Employees ALTER COLUMN Salary TYPE DECIMAL(12,2);  -- PostgreSQL
ALTER TABLE Employees MODIFY Salary DECIMAL(12,2);             -- MySQL

-- Add/drop NOT NULL
ALTER TABLE Employees ALTER COLUMN Email SET NOT NULL;
ALTER TABLE Employees ALTER COLUMN Email DROP NOT NULL;
```

### Add/Drop Constraints

```sql
-- Add constraint
ALTER TABLE Employees ADD CONSTRAINT chk_salary CHECK (Salary > 0);
ALTER TABLE Employees ADD CONSTRAINT fk_dept
    FOREIGN KEY (DeptID) REFERENCES Departments(DeptID);

-- Drop constraint
ALTER TABLE Employees DROP CONSTRAINT chk_salary;
```

### Rename

```sql
-- Rename table
ALTER TABLE Employees RENAME TO Staff;

-- Rename column
ALTER TABLE Staff RENAME COLUMN EmpID TO StaffID;
```

## DROP and TRUNCATE

### DROP TABLE

Remove table and all data:

```sql
DROP TABLE TempData;

-- Only if exists (prevents error)
DROP TABLE IF EXISTS TempData;

-- Drop with dependent objects (PostgreSQL)
DROP TABLE Departments CASCADE;
```

### TRUNCATE TABLE

Remove all rows quickly (no logging):

```sql
TRUNCATE TABLE LogEntries;

-- Faster than DELETE FROM LogEntries;
-- Cannot have WHERE clause
-- Resets auto-increment counters
```

## Schema Management

### CREATE SCHEMA

Organize tables into namespaces:

```sql
CREATE SCHEMA sales;
CREATE SCHEMA inventory;

CREATE TABLE sales.Orders (...);
CREATE TABLE inventory.Products (...);

SELECT * FROM sales.Orders;
```

### Temporary Tables

Tables that exist only for the session:

```sql
CREATE TEMPORARY TABLE TempResults (
    ID INTEGER,
    Value DECIMAL(10,2)
);

-- Automatically dropped when session ends
```

## Best Practices

### Naming Conventions

```sql
-- Tables: PascalCase or snake_case, plural
CREATE TABLE Customers ...
CREATE TABLE customer_orders ...

-- Columns: camelCase or snake_case
CustomerID, customer_id
FirstName, first_name

-- Constraints: descriptive names
CONSTRAINT pk_customers PRIMARY KEY (CustomerID),
CONSTRAINT fk_orders_customers FOREIGN KEY ...
CONSTRAINT chk_positive_price CHECK (Price > 0)
```

### Data Type Selection

1. Use smallest type that fits your data
2. Use INTEGER for IDs unless you need BIGINT
3. Use DECIMAL for money (not FLOAT)
4. Use VARCHAR with reasonable limits
5. Use DATE/TIMESTAMP appropriately

### Constraint Guidelines

1. Always define PRIMARY KEY
2. Add FOREIGN KEY for all relationships
3. Use NOT NULL unless NULL is meaningful
4. Add CHECK constraints for business rules
5. Consider performance impact of constraints

