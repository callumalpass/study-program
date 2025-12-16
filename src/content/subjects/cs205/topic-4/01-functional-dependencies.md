# Functional Dependencies

Functional dependencies (FDs) are constraints that describe relationships between attributes. They form the foundation of normalization theory.

## Definition

A functional dependency X → Y means: if two tuples have the same values for attributes X, they must have the same values for attributes Y.

```
X → Y
"X determines Y" or "Y is functionally dependent on X"
```

### Examples

```
StudentID → StudentName
-- Same StudentID always has same StudentName

{CourseID, Semester} → InstructorID
-- Same course in same semester has same instructor

EmployeeID → {Name, DeptID, Salary}
-- Employee ID determines all employee attributes
```

### Formal Definition

For relation R with attributes X and Y:

X → Y holds in R if and only if:
For all tuples t₁, t₂ in R: if t₁[X] = t₂[X] then t₁[Y] = t₂[Y]

## Identifying Functional Dependencies

### From Business Rules

```
Business Rule: "Each order is placed by exactly one customer"
FD: OrderID → CustomerID

Business Rule: "An employee can only belong to one department"
FD: EmployeeID → DeptID

Business Rule: "Product prices are determined by product, not by order"
FD: ProductID → Price
```

### From Data Analysis

```
StudentCourse(StudentID, CourseID, Semester, Grade, InstructorID)

Analyze: Can the same (StudentID, CourseID, Semester) have different grades?
If no: {StudentID, CourseID, Semester} → Grade

Analyze: Does InstructorID depend on StudentID?
If no: StudentID ↛ InstructorID (not a dependency)
```

### Common Patterns

```
-- Primary key determines all attributes
PK → all other attributes

-- Foreign key determines attributes of referenced table
FK → referenced attributes (via join)

-- Derived attributes
{BirthDate} → Age (computed)

-- Natural dependencies
ZipCode → {City, State}
ISBN → {Title, Author, Publisher}
```

## Trivial Dependencies

A dependency X → Y is **trivial** if Y ⊆ X:

```
{StudentID, Name} → StudentID     -- Trivial
{A, B, C} → {A, B}                -- Trivial
StudentID → StudentID             -- Trivial
```

Trivial dependencies always hold and aren't interesting for normalization.

## Closure of Attributes

The **closure** X⁺ is the set of all attributes functionally determined by X.

### Computing Closure

```
Algorithm:
1. Start with X⁺ = X
2. For each FD: A → B where A ⊆ X⁺
   Add B to X⁺
3. Repeat until no change
```

### Example

```
Relation: R(A, B, C, D, E)
FDs: A → B, B → C, CD → E, E → A

Find {A}⁺:
1. Start: {A}⁺ = {A}
2. A → B applies: {A}⁺ = {A, B}
3. B → C applies: {A}⁺ = {A, B, C}
4. No more FDs apply with just {A, B, C}
5. {A}⁺ = {A, B, C}

Find {A, D}⁺:
1. Start: {A, D}⁺ = {A, D}
2. A → B: {A, D}⁺ = {A, B, D}
3. B → C: {A, D}⁺ = {A, B, C, D}
4. CD → E: {A, D}⁺ = {A, B, C, D, E}
5. E → A: already have A
6. {A, D}⁺ = {A, B, C, D, E} = all attributes
```

### Using Closure

**Key identification**: X is a superkey if X⁺ = all attributes

```
From example above:
{A}⁺ = {A, B, C} ≠ all → A is not a key
{A, D}⁺ = {A, B, C, D, E} = all → {A, D} is a superkey
```

## Armstrong's Axioms

Three inference rules for deriving all implied FDs:

### Reflexivity (Trivial)

If Y ⊆ X, then X → Y

```
{A, B, C} → {A, B}
{A, B} → A
```

### Augmentation

If X → Y, then XZ → YZ

```
Given: A → B
Then: AC → BC, AD → BD, ABC → BC, etc.
```

### Transitivity

If X → Y and Y → Z, then X → Z

```
Given: A → B and B → C
Then: A → C
```

### Derived Rules

From the axioms, we can derive:

**Union**: If X → Y and X → Z, then X → YZ
**Decomposition**: If X → YZ, then X → Y and X → Z
**Pseudotransitivity**: If X → Y and WY → Z, then WX → Z

## Minimal Cover (Canonical Cover)

A minimal set of FDs equivalent to the original set:

### Properties

1. Every RHS has single attribute
2. No redundant FDs
3. No redundant attributes on LHS

### Algorithm

```
1. Decompose: Split RHS to single attributes
   A → BC becomes A → B, A → C

2. Remove redundant FDs:
   For each FD X → A:
   - Remove it temporarily
   - If A ∈ X⁺ using remaining FDs, it's redundant

3. Remove redundant LHS attributes:
   For each FD XY → A:
   - If A ∈ X⁺, then Y is redundant (keep X → A)
```

### Example

```
Given: A → BC, B → C, AB → C, AC → D

Step 1 - Decompose:
A → B, A → C, B → C, AB → C, AC → D

Step 2 - Remove redundant FDs:
- A → C: Remove, check if C ∈ {A}⁺
  {A}⁺ = {A, B} using A → B
  {A}⁺ = {A, B, C} using B → C
  Yes, C is in closure, so A → C is redundant

- AB → C: Remove, check if C ∈ {A,B}⁺
  Already know B → C, so yes, redundant

Remaining: A → B, B → C, AC → D

Step 3 - Remove redundant LHS attributes:
- AC → D: Check if C is redundant
  Is D ∈ {A}⁺? {A}⁺ = {A, B, C}, no D
  C is not redundant

Minimal cover: {A → B, B → C, AC → D}
```

## Dependency Preservation

When decomposing a relation, we want to preserve all FDs:

```
R(A, B, C) with FDs: A → B, B → C

Decompose to: R1(A, B) and R2(B, C)

Check: Can we enforce both FDs?
- A → B: Yes, within R1
- B → C: Yes, within R2

FDs are preserved!
```

### Non-Preserved Example

```
R(A, B, C) with FDs: A → B, AC → B

Decompose to: R1(A, B) and R2(A, C)

Check:
- A → B: Yes, within R1
- AC → B: No! A and C are in R2, B is in R1
  Must join to check this constraint

FD not preserved (requires join to enforce)
```

## Practical Applications

### Schema Design

```sql
-- Bad: Redundant data from FD violation
Orders(OrderID, CustomerID, CustomerName, CustomerAddress)
-- CustomerID → CustomerName, CustomerAddress
-- Customer info repeated in every order

-- Good: Normalize based on FDs
Orders(OrderID, CustomerID)
Customers(CustomerID, CustomerName, CustomerAddress)
```

### Constraint Enforcement

```sql
-- FD: ZipCode → City
-- Enforce with separate table or check constraint

CREATE TABLE ZipCodes (
    ZipCode CHAR(5) PRIMARY KEY,
    City VARCHAR(100) NOT NULL
);

CREATE TABLE Addresses (
    AddressID INTEGER PRIMARY KEY,
    Street VARCHAR(200),
    ZipCode CHAR(5) REFERENCES ZipCodes(ZipCode)
    -- City derived from ZipCode via join
);
```

