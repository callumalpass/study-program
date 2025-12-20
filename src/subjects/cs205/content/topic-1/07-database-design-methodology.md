---
id: cs205-t1-methodology
title: "Database Design Methodology"
order: 7
---

# Database Design Methodology

Database design is a systematic process of creating a logical and physical structure for storing and managing data. A well-designed database ensures data integrity, minimizes redundancy, supports efficient queries, and adapts to changing business requirements. This comprehensive guide covers the complete database design lifecycle from requirements gathering through implementation.

## The Database Design Lifecycle

Database design follows a structured methodology with distinct phases:

### Phase 1: Requirements Analysis

The first and most critical phase involves understanding what data needs to be stored and how it will be used:

**Information Gathering Techniques:**
- **Stakeholder interviews**: Meet with end users, managers, and domain experts
- **Document analysis**: Review existing forms, reports, and documentation
- **Observation**: Watch current processes to understand data flow
- **Existing system analysis**: Examine legacy databases and applications

**Deliverables from Requirements Analysis:**
- List of entities and their attributes
- Business rules governing data
- Data volume estimates (current and projected)
- Access patterns (who needs what data, how often)
- Performance requirements (response time expectations)
- Security and privacy requirements

**Example Requirements Document Excerpt:**

```
Entity: Customer
- Must store name, email, phone, address
- Email must be unique
- Customer can have multiple addresses (billing, shipping)
- Customer may have multiple phone numbers
- Must track customer since date

Business Rules:
- Every order must have a customer
- Customer cannot be deleted if they have pending orders
- Customers can be marked inactive but not removed
```

### Phase 2: Conceptual Design

Conceptual design creates a high-level model of the data independent of any specific database system. The primary output is an Entity-Relationship (ER) Diagram:

**Steps in Conceptual Design:**

1. **Identify entities**: Find the main objects/concepts
2. **Identify relationships**: Determine how entities relate
3. **Identify attributes**: List properties of each entity
4. **Determine keys**: Find candidate and primary keys
5. **Define cardinalities**: Specify relationship multiplicities
6. **Document constraints**: Record business rules

**Entity Identification Guidelines:**

Look for nouns in requirements that represent:
- Physical objects (Product, Building, Vehicle)
- Conceptual objects (Account, Course, Project)
- Events (Order, Payment, Enrollment)
- Roles (Customer, Employee, Student)

**Attribute Identification Guidelines:**

For each entity, identify properties that:
- Are atomic (cannot be decomposed usefully)
- Belong to that entity specifically
- Need to be stored (not derived)
- Have values that can vary independently

### Phase 3: Logical Design

Logical design transforms the conceptual model into a relational schema:

**ER-to-Relational Mapping Rules:**

1. **Strong Entity → Table**
```
Entity: Employee(EmpID, Name, HireDate, Salary)
↓
CREATE TABLE Employee (
    EmpID INTEGER PRIMARY KEY,
    Name VARCHAR(100),
    HireDate DATE,
    Salary DECIMAL(10,2)
);
```

2. **Weak Entity → Table with Composite Key**
```
Weak Entity: Dependent (Name, Relationship) depends on Employee
↓
CREATE TABLE Dependent (
    EmpID INTEGER,
    DependentName VARCHAR(100),
    Relationship VARCHAR(50),
    PRIMARY KEY (EmpID, DependentName),
    FOREIGN KEY (EmpID) REFERENCES Employee(EmpID)
);
```

3. **1:N Relationship → Foreign Key on N-side**
```
Employee works_in Department (many employees, one department)
↓
CREATE TABLE Employee (
    EmpID INTEGER PRIMARY KEY,
    Name VARCHAR(100),
    DeptID INTEGER REFERENCES Department(DeptID)
);
```

4. **M:N Relationship → Junction Table**
```
Student enrolls_in Course (many-to-many)
↓
CREATE TABLE Enrollment (
    StudentID INTEGER REFERENCES Student(StudentID),
    CourseID INTEGER REFERENCES Course(CourseID),
    EnrollDate DATE,
    Grade CHAR(2),
    PRIMARY KEY (StudentID, CourseID)
);
```

5. **1:1 Relationship → Foreign Key with UNIQUE**
```
Employee manages Department (one manager per department)
↓
CREATE TABLE Department (
    DeptID INTEGER PRIMARY KEY,
    Name VARCHAR(100),
    ManagerID INTEGER UNIQUE REFERENCES Employee(EmpID)
);
```

**Normalization:**

Apply normalization to eliminate redundancy:
- Ensure each table is in at least 3NF
- Consider BCNF for critical tables
- Document any intentional denormalization

### Phase 4: Physical Design

Physical design optimizes the logical schema for a specific DBMS:

**Physical Design Decisions:**

1. **Index Design**
```sql
-- Index for frequent lookups
CREATE INDEX idx_employee_dept ON Employee(DeptID);

-- Covering index for common query
CREATE INDEX idx_order_customer_date
ON Orders(CustomerID, OrderDate)
INCLUDE (TotalAmount);
```

2. **Data Type Selection**
```sql
-- Choose appropriate types for storage efficiency
CREATE TABLE Products (
    ProductID SERIAL PRIMARY KEY,    -- Auto-increment
    SKU CHAR(10),                    -- Fixed-length code
    Name VARCHAR(200),               -- Variable-length string
    Price NUMERIC(10,2),             -- Exact decimal
    Weight REAL,                     -- Approximate decimal
    Active BOOLEAN,                  -- True/false
    CreatedAt TIMESTAMPTZ            -- Timestamp with timezone
);
```

3. **Partitioning Strategy**
```sql
-- Partition large table by date range
CREATE TABLE Orders (
    OrderID INTEGER,
    OrderDate DATE,
    CustomerID INTEGER,
    TotalAmount DECIMAL(12,2)
) PARTITION BY RANGE (OrderDate);

CREATE TABLE Orders_2023 PARTITION OF Orders
    FOR VALUES FROM ('2023-01-01') TO ('2024-01-01');

CREATE TABLE Orders_2024 PARTITION OF Orders
    FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');
```

4. **Storage Parameters**
```sql
-- PostgreSQL tablespace assignment
CREATE TABLE Archives (
    ArchiveID INTEGER PRIMARY KEY,
    Data BYTEA
) TABLESPACE slow_storage;
```

## Design Patterns and Best Practices

### Surrogate Keys vs Natural Keys

**Surrogate Keys** (artificial identifiers):
```sql
CREATE TABLE Customers (
    CustomerID SERIAL PRIMARY KEY,  -- Surrogate
    SSN CHAR(11) UNIQUE,            -- Natural
    Name VARCHAR(100)
);
```

Pros: Stable, compact, system-controlled
Cons: Meaningless, requires joins for display

**Natural Keys** (business identifiers):
```sql
CREATE TABLE Countries (
    CountryCode CHAR(2) PRIMARY KEY,  -- Natural (ISO code)
    Name VARCHAR(100)
);
```

Pros: Meaningful, reduces joins
Cons: May change, potentially large, business-dependent

**Recommendation**: Use surrogate keys by default, natural keys only when:
- The natural key is truly immutable (country codes, ISBN)
- The natural key is already compact
- Joins with the key are frequent in queries

### Handling Temporal Data

Many applications need to track how data changes over time:

**Current State Only:**
```sql
CREATE TABLE EmployeeSalary (
    EmpID INTEGER PRIMARY KEY,
    Salary DECIMAL(12,2),
    LastModified TIMESTAMP
);
```

**Full History (Type 2 SCD):**
```sql
CREATE TABLE EmployeeSalaryHistory (
    EmpID INTEGER,
    Salary DECIMAL(12,2),
    EffectiveFrom DATE,
    EffectiveTo DATE,
    IsCurrent BOOLEAN,
    PRIMARY KEY (EmpID, EffectiveFrom)
);

-- Query current salary
SELECT * FROM EmployeeSalaryHistory
WHERE EmpID = 100 AND IsCurrent = TRUE;

-- Query salary at a point in time
SELECT * FROM EmployeeSalaryHistory
WHERE EmpID = 100
  AND EffectiveFrom <= '2023-06-15'
  AND (EffectiveTo IS NULL OR EffectiveTo > '2023-06-15');
```

### Hierarchical Data

Representing tree structures in relational databases:

**Adjacency List** (simple parent reference):
```sql
CREATE TABLE Categories (
    CategoryID INTEGER PRIMARY KEY,
    Name VARCHAR(100),
    ParentID INTEGER REFERENCES Categories(CategoryID)
);
```

**Nested Sets** (left/right boundaries):
```sql
CREATE TABLE Categories (
    CategoryID INTEGER PRIMARY KEY,
    Name VARCHAR(100),
    LeftBound INTEGER,
    RightBound INTEGER
);

-- All descendants of category with left=2, right=11
SELECT * FROM Categories
WHERE LeftBound > 2 AND RightBound < 11;
```

**Materialized Path:**
```sql
CREATE TABLE Categories (
    CategoryID INTEGER PRIMARY KEY,
    Name VARCHAR(100),
    Path VARCHAR(500)  -- e.g., '/1/5/23/'
);

-- All descendants
SELECT * FROM Categories
WHERE Path LIKE '/1/5/%';
```

### Polymorphic Associations

When different entity types can relate to the same entity:

**Separate Foreign Keys:**
```sql
CREATE TABLE Comments (
    CommentID INTEGER PRIMARY KEY,
    Content TEXT,
    ArticleID INTEGER REFERENCES Articles(ArticleID),
    ProductID INTEGER REFERENCES Products(ProductID),
    CHECK (
        (ArticleID IS NOT NULL AND ProductID IS NULL) OR
        (ArticleID IS NULL AND ProductID IS NOT NULL)
    )
);
```

**Single Table Inheritance:**
```sql
CREATE TABLE Commentables (
    ID INTEGER PRIMARY KEY,
    Type VARCHAR(20),  -- 'Article' or 'Product'
    -- Common fields
);

CREATE TABLE Comments (
    CommentID INTEGER PRIMARY KEY,
    Content TEXT,
    CommentableID INTEGER REFERENCES Commentables(ID)
);
```

## Documentation and Standards

### Schema Documentation

Maintain comprehensive documentation:

```sql
-- Use COMMENT statements (PostgreSQL)
COMMENT ON TABLE Customers IS
    'Stores customer master data including contact information';

COMMENT ON COLUMN Customers.CustomerID IS
    'Unique customer identifier, auto-generated';

COMMENT ON COLUMN Customers.CreditLimit IS
    'Maximum credit in USD, NULL means no credit';
```

### Naming Conventions

Establish and follow naming standards:

**Table Names:**
- Use PascalCase or snake_case consistently
- Use singular nouns (Customer, not Customers)
- Use meaningful names (OrderLineItems, not OLI)

**Column Names:**
- Use consistent casing
- Primary key: TableNameID (CustomerID)
- Foreign key: Referenced table name (DepartmentID)
- Boolean: Use is/has prefix (IsActive, HasShipped)

**Constraints:**
- Primary key: pk_tablename
- Foreign key: fk_table_reftable
- Unique: uq_table_columns
- Check: chk_table_description
- Index: idx_table_columns

### Data Dictionary

Maintain a data dictionary documenting:

| Table | Column | Type | Nullable | Description | Example |
|-------|--------|------|----------|-------------|---------|
| Customer | CustomerID | INT | NO | Primary key | 10045 |
| Customer | Name | VARCHAR(100) | NO | Full legal name | "John Smith" |
| Customer | CreditLimit | DECIMAL(12,2) | YES | Max credit USD | 5000.00 |

## Validation and Review

Before finalizing a design:

**Validation Checklist:**
- [ ] Every entity has a primary key
- [ ] All relationships are properly represented
- [ ] Foreign key constraints enforce referential integrity
- [ ] Schema is normalized to at least 3NF
- [ ] Required fields have NOT NULL constraints
- [ ] CHECK constraints enforce business rules
- [ ] Indexes support expected query patterns
- [ ] Naming conventions are consistent
- [ ] Documentation is complete

**Review Process:**
1. Peer review by another database designer
2. Review by application developers (usability)
3. Review by DBAs (performance, operations)
4. Review by business stakeholders (completeness)

## Iterative Refinement

Database design is iterative. Expect to revise based on:
- New requirements discovered during development
- Performance issues identified in testing
- Changes in business rules
- Scaling requirements as data grows

Document all changes and maintain version control of schema files.
