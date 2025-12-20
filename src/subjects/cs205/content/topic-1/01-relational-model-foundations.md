---
id: cs205-t1-foundations
title: "Relational Model Foundations"
order: 1
---

# Relational Model Foundations

The relational model is the theoretical foundation upon which modern database systems are built. Understanding its mathematical underpinnings helps you design better databases and write more efficient queries.

## Mathematical Foundation

### Set Theory Basis

The relational model is grounded in set theory and first-order predicate logic. A relation is mathematically defined as a subset of the Cartesian product of domains:

```
R ⊆ D₁ × D₂ × ... × Dₙ
```

Where each Dᵢ is a domain (set of allowed values) for attribute Aᵢ.

**Example**: For a Students relation:
- D₁ = {integers} (StudentID)
- D₂ = {strings} (Name)
- D₃ = {dates} (BirthDate)

A tuple like (101, "Alice", 2000-05-15) is an element of this relation.

### Properties of Relations

**Degree (Arity)**: The number of attributes in a relation. A relation with n attributes has degree n.

**Cardinality**: The number of tuples (rows) in a relation. Unlike degree, cardinality changes as data is added or removed.

**Atomicity**: Each attribute value must be atomic (indivisible). This is the First Normal Form requirement. Arrays, lists, or nested structures violate atomicity.

```
-- Violates atomicity
Student(ID, Name, PhoneNumbers:[555-0100, 555-0101])

-- Proper relational representation
Student(ID, Name)
StudentPhone(StudentID, PhoneNumber)
```

## Domains and Data Types

### What is a Domain?

A domain is a set of atomic values that defines what values an attribute can hold. In SQL, domains map to data types like INTEGER, VARCHAR, DATE, etc.

```sql
-- Domain constraints
CREATE DOMAIN GradeType AS CHAR(1)
    CHECK (VALUE IN ('A', 'B', 'C', 'D', 'F'));

CREATE TABLE Enrollments (
    StudentID INTEGER,
    CourseID INTEGER,
    Grade GradeType  -- Uses the domain
);
```

### Domain Constraints

Domains implicitly constrain what operations make sense:
- Comparing dates with dates (meaningful)
- Adding student IDs (usually meaningless)
- Concatenating strings (sometimes meaningful)

## NULL Values

### The Three-Valued Logic Problem

NULL represents missing or unknown information, introducing three-valued logic:
- TRUE
- FALSE
- UNKNOWN

Any comparison with NULL yields UNKNOWN:
```sql
SELECT * FROM Students WHERE Age > 20;  -- Students with NULL age excluded
SELECT * FROM Students WHERE Age <= 20; -- Also excludes NULL ages
```

### NULL Handling

```sql
-- Check for NULL explicitly
SELECT * FROM Students WHERE Age IS NULL;

-- COALESCE provides default values
SELECT Name, COALESCE(Age, 0) as Age FROM Students;

-- NULLIF creates NULLs conditionally
SELECT NULLIF(Score, -1) as Score FROM Tests;  -- Treat -1 as NULL
```

## Relation Schema vs Instance

### Schema (Intension)

The schema defines the structure—it's the relation's "type":
- Relation name
- Attribute names
- Domain for each attribute
- Constraints

```
Students(StudentID: INTEGER, Name: VARCHAR(100), GPA: DECIMAL(3,2))
```

The schema is relatively static and defined at design time.

### Instance (Extension)

The instance is the actual data at a particular moment:

| StudentID | Name | GPA |
|-----------|------|-----|
| 101 | Alice | 3.75 |
| 102 | Bob | 3.20 |
| 103 | Carol | 3.90 |

The instance changes with every INSERT, UPDATE, or DELETE.

## Integrity Constraints

### Entity Integrity

Every relation must have a primary key, and primary key values:
- Cannot be NULL (any attribute in the key)
- Must be unique across all tuples

This ensures every tuple is identifiable.

### Referential Integrity

Foreign keys must reference existing primary keys or be NULL:

```sql
CREATE TABLE Orders (
    OrderID INTEGER PRIMARY KEY,
    CustomerID INTEGER REFERENCES Customers(CustomerID),
    OrderDate DATE
);

-- This fails if CustomerID 999 doesn't exist
INSERT INTO Orders VALUES (1, 999, '2024-01-15');  -- Error!
```

### Domain Integrity

Values must be within their defined domains:

```sql
CREATE TABLE Products (
    ProductID INTEGER PRIMARY KEY,
    Price DECIMAL(10,2) CHECK (Price >= 0),  -- Domain constraint
    Quantity INTEGER CHECK (Quantity >= 0)
);
```

## Relation Operations

### Fundamental Operations

Relations are closed under operations—operations on relations produce relations:

**Selection (σ)**: Filters rows
```
σ_GPA>3.5(Students) → Students with GPA above 3.5
```

**Projection (π)**: Selects columns
```
π_Name,GPA(Students) → Only Name and GPA columns
```

**Rename (ρ)**: Changes relation or attribute names
```
ρ_S(StudentID,StudentName)(Students) → Renamed relation
```

### Derived Operations

Built from fundamental operations:

**Natural Join (⋈)**: Combines relations on common attributes
```
Students ⋈ Enrollments → Students with their enrollments
```

**Theta Join**: Join with arbitrary condition
```
Students ⋈_Students.ID=Enrollments.StudentID Enrollments
```

## Codd's Twelve Rules

Edgar Codd proposed twelve rules (actually thirteen, 0-12) for relational databases:

1. **Information Rule**: All information in a database must be represented as values in tables
2. **Guaranteed Access**: Every value must be accessible via table name, column name, and primary key
3. **Systematic NULL Treatment**: NULL values must be handled consistently
4. **Active Online Catalog**: Database description should be stored in the same way as ordinary data
5. **Comprehensive Data Sublanguage**: The system must support a relational language with data definition, manipulation, and constraints

The remaining rules cover views, insert/update/delete capabilities, physical data independence, logical data independence, integrity independence, distribution independence, and non-subversion.

## Practical Implications

### Why Relations Matter

Understanding the relational model helps you:

1. **Design better schemas**: Knowing the theory behind normalization prevents data anomalies

2. **Write better queries**: Understanding relational algebra makes complex SQL more intuitive

3. **Debug problems**: When queries return unexpected results, understanding the model helps identify the issue

4. **Evaluate new technologies**: NoSQL databases often sacrifice relational properties—understanding what's lost helps make informed decisions

### Relational vs Other Models

| Model | Data Structure | Relationships | Query Language |
|-------|---------------|---------------|----------------|
| Relational | Tables | Foreign keys | SQL |
| Document | JSON/BSON docs | Embedded/refs | MongoDB Query |
| Graph | Nodes/edges | Explicit edges | Cypher/Gremlin |
| Key-Value | Key→Value pairs | None built-in | GET/PUT |

The relational model remains dominant for structured data with complex relationships and transactions.

