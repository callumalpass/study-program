# Normalization Practice

Applying normalization in real-world scenarios requires systematic analysis and practical judgment. This section presents worked examples and exercises.

## Systematic Normalization Process

### Step-by-Step Framework

```
1. Identify all attributes
2. Determine functional dependencies from business rules
3. Find candidate keys
4. Check current normal form
5. Decompose to desired normal form
6. Verify lossless join and dependency preservation
7. Validate with sample data
```

### Analysis Template

```
Relation: R(attributes)
FDs: list all dependencies
Keys: compute from FDs

1NF Check:
- Atomic values? [Yes/No]
- No repeating groups? [Yes/No]

2NF Check (if composite key):
- Partial dependencies? [List any]

3NF Check:
- Transitive dependencies? [List any]

BCNF Check:
- Non-key determinants? [List any]

Decomposition:
- [Steps to normalize]

Final Schema:
- [Normalized relations]
```

## Worked Example 1: University Database

### Initial Schema

```
StudentCourse(StudentID, StudentName, Major, CourseID, CourseName,
              Credits, InstructorID, InstructorName, Grade, Semester)

Business Rules:
- Each student has one major
- Each course has fixed credits
- Each course section (semester) has one instructor
- Student takes course once per semester
```

### Analysis

```
Functional Dependencies:
1. StudentID → StudentName, Major
2. CourseID → CourseName, Credits
3. InstructorID → InstructorName
4. {CourseID, Semester} → InstructorID
5. {StudentID, CourseID, Semester} → Grade

Candidate Keys:
{StudentID, CourseID, Semester}⁺ = all attributes
Key = {StudentID, CourseID, Semester}

Current Form:
1NF: Yes (all atomic)
2NF: No
  - StudentID → StudentName, Major (partial)
  - CourseID → CourseName, Credits (partial)
3NF: No (same partial deps, plus transitive via InstructorID)
BCNF: No
```

### Decomposition to BCNF

```
Step 1: Handle StudentID → StudentName, Major
Students(StudentID, StudentName, Major)
Remaining(StudentID, CourseID, CourseName, Credits,
          InstructorID, InstructorName, Grade, Semester)

Step 2: Handle CourseID → CourseName, Credits
Courses(CourseID, CourseName, Credits)
Remaining(StudentID, CourseID, InstructorID,
          InstructorName, Grade, Semester)

Step 3: Handle InstructorID → InstructorName
Instructors(InstructorID, InstructorName)
Remaining(StudentID, CourseID, InstructorID, Grade, Semester)

Step 4: Handle {CourseID, Semester} → InstructorID
CourseSections(CourseID, Semester, InstructorID)
Enrollment(StudentID, CourseID, Semester, Grade)

Final Schema (all BCNF):
Students(StudentID, StudentName, Major)
  Key: StudentID
Courses(CourseID, CourseName, Credits)
  Key: CourseID
Instructors(InstructorID, InstructorName)
  Key: InstructorID
CourseSections(CourseID, Semester, InstructorID)
  Key: {CourseID, Semester}
Enrollment(StudentID, CourseID, Semester, Grade)
  Key: {StudentID, CourseID, Semester}
```

### SQL Implementation

```sql
CREATE TABLE Students (
    StudentID INTEGER PRIMARY KEY,
    StudentName VARCHAR(100) NOT NULL,
    Major VARCHAR(50)
);

CREATE TABLE Courses (
    CourseID VARCHAR(10) PRIMARY KEY,
    CourseName VARCHAR(100) NOT NULL,
    Credits INTEGER NOT NULL CHECK (Credits > 0)
);

CREATE TABLE Instructors (
    InstructorID INTEGER PRIMARY KEY,
    InstructorName VARCHAR(100) NOT NULL
);

CREATE TABLE CourseSections (
    CourseID VARCHAR(10),
    Semester VARCHAR(20),
    InstructorID INTEGER NOT NULL,
    PRIMARY KEY (CourseID, Semester),
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID),
    FOREIGN KEY (InstructorID) REFERENCES Instructors(InstructorID)
);

CREATE TABLE Enrollment (
    StudentID INTEGER,
    CourseID VARCHAR(10),
    Semester VARCHAR(20),
    Grade CHAR(2),
    PRIMARY KEY (StudentID, CourseID, Semester),
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
    FOREIGN KEY (CourseID, Semester)
        REFERENCES CourseSections(CourseID, Semester)
);
```

## Worked Example 2: Order System

### Initial Schema

```
OrderDetails(OrderID, OrderDate, CustomerID, CustomerName,
             CustomerAddress, ProductID, ProductName, UnitPrice,
             Quantity, Discount, ShipperID, ShipperName)

Business Rules:
- Each order belongs to one customer
- Product prices are fixed (not order-specific)
- Discount may vary by order/product
- Each order uses one shipper
```

### Identify Dependencies

```
FDs:
OrderID → OrderDate, CustomerID, ShipperID
CustomerID → CustomerName, CustomerAddress
ProductID → ProductName, UnitPrice
ShipperID → ShipperName
{OrderID, ProductID} → Quantity, Discount

Key: {OrderID, ProductID}
```

### Normalize

```
Check 2NF:
Partial dependencies exist:
- OrderID → OrderDate, CustomerID, ShipperID
- ProductID → ProductName, UnitPrice

Check 3NF:
Transitive dependencies:
- OrderID → CustomerID → CustomerName
- OrderID → ShipperID → ShipperName

Decomposition:
Customers(CustomerID, CustomerName, CustomerAddress)
Products(ProductID, ProductName, UnitPrice)
Shippers(ShipperID, ShipperName)
Orders(OrderID, OrderDate, CustomerID, ShipperID)
OrderItems(OrderID, ProductID, Quantity, Discount)
```

### Verification

```
Lossless join?
Orders ⋈ OrderItems on OrderID
Result ⋈ Customers on CustomerID
Result ⋈ Products on ProductID
Result ⋈ Shippers on ShipperID
= Original relation ✓

Dependencies preserved?
- OrderID → OrderDate: In Orders ✓
- CustomerID → CustomerName: In Customers ✓
- ProductID → ProductName: In Products ✓
- ShipperID → ShipperName: In Shippers ✓
- {OrderID, ProductID} → Quantity: In OrderItems ✓
All preserved ✓
```

## Worked Example 3: BCNF vs 3NF Trade-off

### Schema

```
CourseTeacher(Course, Teacher, Text)

Semantics:
- Each course uses specific textbooks
- Each teacher teaches specific courses
- Each teacher uses one text for a course
- Multiple teachers can teach same course (different texts)

FDs:
{Course, Teacher} → Text
{Course, Text} → Teacher
```

### Analysis

```
Candidate Keys:
{Course, Teacher}⁺ = {Course, Teacher, Text} ✓
{Course, Text}⁺ = {Course, Text, Teacher} ✓

Both are candidate keys!

3NF Check:
For {Course, Teacher} → Text:
  LHS is superkey ✓
For {Course, Text} → Teacher:
  LHS is superkey ✓

Already in 3NF and BCNF!

No decomposition needed - the schema is optimal.
```

### Different Scenario

```
CourseInstructor(Student, Course, Instructor)

Semantics:
- Students enroll in courses
- Each course has one instructor
- Each instructor teaches one course

FDs:
{Student, Course} → Instructor
Instructor → Course

Candidate Keys:
{Student, Course}
{Student, Instructor}

3NF Check:
Instructor → Course: Course is part of candidate key ✓
3NF satisfied

BCNF Check:
Instructor → Course: Instructor not superkey ✗
BCNF violated

BCNF Decomposition:
R1(Instructor, Course)
R2(Student, Instructor)

Dependency Lost:
{Student, Course} → Instructor cannot be enforced locally
Must use trigger or application logic
```

## Practice Problems

### Problem 1

```
Normalize: Library(ISBN, Title, Author, Publisher, PublisherAddress,
                   MemberID, MemberName, BorrowDate, DueDate)

FDs:
ISBN → Title, Author, Publisher
Publisher → PublisherAddress
MemberID → MemberName
{ISBN, MemberID, BorrowDate} → DueDate

Task: Decompose to 3NF, then to BCNF. Compare results.
```

### Problem 2

```
Normalize: Project(ProjectID, ProjectName, EmpID, EmpName,
                   DeptID, DeptName, Hours)

FDs:
ProjectID → ProjectName
EmpID → EmpName, DeptID
DeptID → DeptName
{ProjectID, EmpID} → Hours

Task: Identify all violations and normalize.
```

### Problem 3

```
Given: R(A, B, C, D, E)
FDs: A → B, BC → D, D → E, E → A

Tasks:
1. Find all candidate keys
2. Determine highest normal form
3. Decompose to BCNF
4. Check if decomposition is dependency preserving
```

## Real-World Considerations

### When to Stop

```
Scenario: E-commerce product catalog

ProductInfo(ProductID, Name, Description, Price, CategoryID,
            CategoryName, BrandID, BrandName, SupplierID, SupplierName)

Technically should normalize to:
Products(ProductID, Name, Description, Price, CategoryID, BrandID, SupplierID)
Categories(CategoryID, CategoryName)
Brands(BrandID, BrandName)
Suppliers(SupplierID, SupplierName)

But consider:
- Product pages always show category/brand names
- Categories/brands rarely change
- 99% read, 1% write

Decision: Keep some denormalization for query performance
ProductInfo(ProductID, Name, ..., CategoryID, CategoryName, ...)
Plus normalized reference tables for consistency
```

### Handling Historical Data

```
Problem: OrderHistory needs prices at time of order

Normalized (wrong for history):
Orders references Products.Price
But Price changes over time!

Solution: Denormalize time-sensitive data
OrderItems(OrderID, ProductID, UnitPriceAtOrder, Quantity)

Not violating normalization - UnitPriceAtOrder is semantically
different from current price. It's the historical record.
```

### Multi-Valued Attributes

```
Problem: Employees have multiple skills

Violation approach:
Employee(EmpID, Name, Skill1, Skill2, Skill3)  -- NOT 1NF

Correct approach:
Employee(EmpID, Name)
EmployeeSkill(EmpID, Skill)  -- 1NF compliant
```

## Summary Checklist

```
Before finalizing schema:

□ All multi-valued attributes separated
□ All partial dependencies removed
□ All transitive dependencies removed
□ Determinants are all superkeys (BCNF)
□ Decomposition is lossless
□ Critical FDs are preserved (or have enforcement plan)
□ Performance implications considered
□ Historical data requirements addressed
□ Schema documented with FDs and keys
□ Sample data validated
```

