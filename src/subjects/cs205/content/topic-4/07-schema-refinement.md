---
id: cs205-t4-refinement
title: "Schema Refinement"
order: 7
---

# Schema Refinement and Database Design Quality

Schema refinement is the iterative process of improving database designs to enhance data integrity, reduce redundancy, and improve maintainability. While normalization provides systematic decomposition rules, schema refinement encompasses broader design quality considerations including naming conventions, constraint specification, and practical trade-offs.

## Design Quality Metrics

A well-designed database schema exhibits several key qualities:

### Data Integrity

The schema should prevent invalid data states:

```sql
-- Good: Explicit constraints prevent invalid data
CREATE TABLE Orders (
    OrderID INTEGER PRIMARY KEY,
    CustomerID INTEGER NOT NULL REFERENCES Customers(CustomerID),
    OrderDate DATE NOT NULL DEFAULT CURRENT_DATE,
    Status VARCHAR(20) NOT NULL DEFAULT 'Pending'
        CHECK (Status IN ('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled')),
    TotalAmount DECIMAL(12,2) CHECK (TotalAmount >= 0)
);

-- Bad: Relies on application to enforce rules
CREATE TABLE Orders (
    OrderID INTEGER PRIMARY KEY,
    CustomerID INTEGER,
    OrderDate VARCHAR(50),
    Status VARCHAR(100),
    TotalAmount DECIMAL(12,2)
);
```

### Minimal Redundancy

Each fact should be stored exactly once:

```sql
-- Bad: Customer name repeated in every order
CREATE TABLE Orders (
    OrderID INTEGER PRIMARY KEY,
    CustomerID INTEGER,
    CustomerName VARCHAR(100),  -- Redundant!
    CustomerEmail VARCHAR(255), -- Redundant!
    OrderDate DATE
);

-- Good: Reference customer table
CREATE TABLE Orders (
    OrderID INTEGER PRIMARY KEY,
    CustomerID INTEGER REFERENCES Customers(CustomerID),
    OrderDate DATE
);
```

### Appropriate Granularity

Tables should represent coherent concepts:

```sql
-- Too coarse: Multiple concepts in one table
CREATE TABLE EmployeeData (
    EmpID INTEGER PRIMARY KEY,
    Name VARCHAR(100),
    DepartmentName VARCHAR(100),
    DepartmentBudget DECIMAL(12,2),
    ManagerName VARCHAR(100),
    ProjectName VARCHAR(100),
    ProjectDeadline DATE
);

-- Better: Separate cohesive entities
CREATE TABLE Employees (EmpID, Name, DepartmentID, ManagerID);
CREATE TABLE Departments (DepartmentID, Name, Budget);
CREATE TABLE Projects (ProjectID, Name, Deadline);
CREATE TABLE EmployeeProjects (EmpID, ProjectID);
```

## Systematic Schema Review

### Anomaly Detection

Check for modification anomalies:

**Update Anomaly Test**:
```sql
-- If updating department name requires multiple row updates,
-- you likely have an update anomaly
UPDATE Orders SET CustomerName = 'New Name'
WHERE CustomerID = 123;  -- Should this update multiple rows?
```

**Delete Anomaly Test**:
```sql
-- Does deleting a record lose other important information?
DELETE FROM Orders WHERE OrderID = 1;
-- Does this delete the only record of a customer or product?
```

**Insert Anomaly Test**:
```sql
-- Can you insert all meaningful data independently?
-- Bad: Can't add a department without an employee
INSERT INTO EmployeeData (DepartmentName, DepartmentBudget)
VALUES ('New Dept', 100000);  -- Fails if EmpID is required
```

### Dependency Analysis

Document all functional dependencies:

```sql
/*
Table: OrderDetails
Attributes: OrderID, ProductID, Quantity, UnitPrice, ProductName, Category

Functional Dependencies:
  {OrderID, ProductID} → Quantity, UnitPrice
  ProductID → ProductName, Category

Analysis:
  - ProductName, Category depend only on ProductID (partial dependency)
  - Violates 2NF if {OrderID, ProductID} is the key
  - Solution: Move ProductName, Category to Products table
*/
```

## Refinement Patterns

### Vertical Partitioning

Split a table by columns when some columns are accessed together frequently:

```sql
-- Original: All columns in one table
CREATE TABLE Customers (
    CustomerID INTEGER PRIMARY KEY,
    Name VARCHAR(100),
    Email VARCHAR(255),
    Phone VARCHAR(20),
    CreditLimit DECIMAL(12,2),
    CreditRating CHAR(1),
    InternalNotes TEXT,
    LastReviewDate DATE,
    -- Many more columns...
);

-- Refined: Frequently accessed vs. rarely accessed
CREATE TABLE Customers (
    CustomerID INTEGER PRIMARY KEY,
    Name VARCHAR(100),
    Email VARCHAR(255),
    Phone VARCHAR(20)
);

CREATE TABLE CustomerCredit (
    CustomerID INTEGER PRIMARY KEY REFERENCES Customers(CustomerID),
    CreditLimit DECIMAL(12,2),
    CreditRating CHAR(1),
    InternalNotes TEXT,
    LastReviewDate DATE
);
```

### Horizontal Partitioning

Split a table by rows for scalability:

```sql
-- Partition orders by date
CREATE TABLE Orders (
    OrderID INTEGER,
    CustomerID INTEGER,
    OrderDate DATE,
    TotalAmount DECIMAL(12,2)
) PARTITION BY RANGE (OrderDate);

CREATE TABLE Orders_2023 PARTITION OF Orders
    FOR VALUES FROM ('2023-01-01') TO ('2024-01-01');

CREATE TABLE Orders_2024 PARTITION OF Orders
    FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');
```

### Surrogate Key Introduction

Replace complex natural keys with simple surrogates:

```sql
-- Before: Composite natural key
CREATE TABLE OrderItems (
    OrderDate DATE,
    OrderSequence INTEGER,
    CustomerID INTEGER,
    ProductSKU VARCHAR(20),
    Quantity INTEGER,
    PRIMARY KEY (OrderDate, OrderSequence, CustomerID, ProductSKU)
);

-- After: Surrogate keys
CREATE TABLE Orders (
    OrderID SERIAL PRIMARY KEY,
    OrderDate DATE,
    CustomerID INTEGER REFERENCES Customers(CustomerID)
);

CREATE TABLE OrderItems (
    ItemID SERIAL PRIMARY KEY,
    OrderID INTEGER REFERENCES Orders(OrderID),
    ProductID INTEGER REFERENCES Products(ProductID),
    Quantity INTEGER
);
```

## Constraint Refinement

### Explicit vs. Implicit Constraints

Make all business rules explicit in the schema:

```sql
-- Implicit: Price should be positive (not enforced)
Price DECIMAL(10,2)

-- Explicit: Constraint enforces rule
Price DECIMAL(10,2) CHECK (Price > 0)

-- Even better: Named constraint for clarity
Price DECIMAL(10,2) CONSTRAINT chk_product_price_positive CHECK (Price > 0)
```

### Default Value Strategy

Use defaults to simplify inserts and enforce standards:

```sql
CREATE TABLE AuditLog (
    LogID SERIAL PRIMARY KEY,
    EventType VARCHAR(50) NOT NULL,
    EventData JSONB,
    CreatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CreatedBy VARCHAR(100) NOT NULL DEFAULT CURRENT_USER,
    IsProcessed BOOLEAN NOT NULL DEFAULT FALSE
);

-- Inserts only need to specify required data
INSERT INTO AuditLog (EventType, EventData)
VALUES ('LOGIN', '{"user": "alice"}');
```

### Cascade Policies

Define referential actions explicitly:

```sql
CREATE TABLE OrderItems (
    ItemID SERIAL PRIMARY KEY,
    OrderID INTEGER NOT NULL REFERENCES Orders(OrderID)
        ON DELETE CASCADE    -- Delete items when order deleted
        ON UPDATE CASCADE,   -- Update FK if order ID changes
    ProductID INTEGER NOT NULL REFERENCES Products(ProductID)
        ON DELETE RESTRICT   -- Prevent deleting products with orders
        ON UPDATE CASCADE
);
```

## Documentation Standards

### Inline Documentation

```sql
-- Table-level comment
COMMENT ON TABLE Customers IS
    'Master customer records. One row per unique customer account.';

-- Column-level comments
COMMENT ON COLUMN Customers.CustomerID IS
    'Unique identifier (surrogate key). Never reused.';

COMMENT ON COLUMN Customers.CreditLimit IS
    'Maximum outstanding balance in USD. NULL means no credit.';
```

### Data Dictionary Maintenance

Maintain a living document describing:

| Schema | Table | Column | Type | Nullable | Default | Description |
|--------|-------|--------|------|----------|---------|-------------|
| sales | orders | order_id | INT | NO | auto | Primary key, never reused |
| sales | orders | status | VARCHAR(20) | NO | 'Pending' | Current order state |
| sales | orders | total | DECIMAL(12,2) | YES | NULL | Calculated, includes tax |

### Constraint Documentation

```sql
/*
Constraint: chk_employee_salary_range
Table: Employees
Rule: Salary must be between $25,000 and $500,000
Reason: Prevents data entry errors, aligns with company policy
Created: 2024-01-15
Modified: Never
*/
ALTER TABLE Employees
ADD CONSTRAINT chk_employee_salary_range
CHECK (Salary BETWEEN 25000 AND 500000);
```

## Iterative Refinement Process

### Step 1: Initial Design Review

```
[ ] All entities have clear, singular purpose
[ ] All attributes belong to their table
[ ] Primary keys are stable and minimal
[ ] Foreign keys reference existing tables
[ ] No calculated values stored (unless performance requires)
```

### Step 2: Normalization Check

```
[ ] First Normal Form: Atomic values, primary key
[ ] Second Normal Form: No partial dependencies
[ ] Third Normal Form: No transitive dependencies
[ ] BCNF: All determinants are superkeys
[ ] Document any intentional denormalization
```

### Step 3: Constraint Audit

```
[ ] NOT NULL on required columns
[ ] CHECK constraints for domain rules
[ ] UNIQUE constraints for alternate keys
[ ] Foreign keys for all relationships
[ ] Default values where appropriate
[ ] Cascading rules specified
```

### Step 4: Performance Review

```
[ ] Indexes planned for common queries
[ ] Partitioning considered for large tables
[ ] Denormalization justified where used
[ ] Data types optimized for storage
```

### Step 5: Documentation Check

```
[ ] Table purpose documented
[ ] Non-obvious columns explained
[ ] Constraints have clear names
[ ] Data dictionary updated
[ ] Change history maintained
```

## Common Refinement Anti-Patterns

### Over-Normalization

Breaking down data too much can hurt performance:

```sql
-- Over-normalized: Separate table for each address component
CREATE TABLE Streets (StreetID, StreetName);
CREATE TABLE Cities (CityID, CityName);
CREATE TABLE States (StateID, StateName);
CREATE TABLE Addresses (AddressID, StreetID, CityID, StateID, ZIP);

-- Practical: Keep address components together
CREATE TABLE Addresses (
    AddressID INTEGER PRIMARY KEY,
    Street VARCHAR(200),
    City VARCHAR(100),
    State CHAR(2),
    ZIP VARCHAR(10)
);
```

### Under-Normalization

Keeping too much together causes anomalies:

```sql
-- Under-normalized: Product info repeated in orders
CREATE TABLE Orders (
    OrderID, CustomerID, ProductID,
    ProductName, ProductCategory, ProductPrice,  -- Redundant!
    Quantity, LineTotal
);
```

### Generic Schemas

Over-flexible designs sacrifice integrity:

```sql
-- Anti-pattern: Entity-Attribute-Value (EAV)
CREATE TABLE EntityAttributes (
    EntityID INTEGER,
    AttributeName VARCHAR(100),
    AttributeValue TEXT,
    PRIMARY KEY (EntityID, AttributeName)
);

-- Better: Explicit typed columns
CREATE TABLE Products (
    ProductID INTEGER PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Price DECIMAL(10,2) CHECK (Price > 0),
    Weight DECIMAL(8,2) CHECK (Weight > 0)
);
```

Schema refinement is an ongoing process. Regular reviews, especially when requirements change, ensure the database continues to serve applications efficiently while maintaining data quality. The goal is a schema that is normalized enough to prevent anomalies but practical enough to support efficient operations.
