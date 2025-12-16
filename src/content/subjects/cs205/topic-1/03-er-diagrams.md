# Entity-Relationship Diagrams

Entity-Relationship (ER) diagrams provide a visual way to design databases at a conceptual level before committing to a specific relational schema. They capture entities, attributes, and relationships in an intuitive graphical notation.

## Entities and Entity Sets

### Entity Concept

An **entity** is a "thing" in the real world that can be distinctly identified:
- Physical objects: Products, Buildings, Vehicles
- Conceptual objects: Courses, Departments, Projects
- Events: Payments, Orders, Appointments

An **entity set** is a collection of similar entities (analogous to a class in OOP):
- All customers form the Customer entity set
- All products form the Product entity set

### Entity Set Notation

In ER diagrams, entity sets are represented by rectangles:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Student   │     │   Course    │     │   Faculty   │
└─────────────┘     └─────────────┘     └─────────────┘
```

### Strong vs Weak Entities

**Strong entities** can exist independently and have their own primary key:
```
┌─────────────┐
│  Employee   │  -- Has EmployeeID as key
└─────────────┘
```

**Weak entities** depend on another entity for identification:
```
┌═════════════┐
║  Dependent  ║  -- Needs EmployeeID + DependentName
└═════════════┘
(Double rectangle indicates weak entity)
```

A dependent (child/spouse for benefits) cannot exist without an employee.

## Attributes

### Simple Attributes

Atomic values that cannot be divided further:

```
        ┌─────────────┐
     ○──│   Student   │
   Name └─────────────┘
```

### Composite Attributes

Can be divided into smaller parts:

```
        ○ Street
        │
   ○────┼ Address
   │    │
   │    ○ City
   │    │
   │    ○ ZIP
   │
   └─────────────┐
        │ Student │
        └─────────┘
```

### Multi-valued Attributes

Can have multiple values for a single entity:

```
        ⊙──┐
    Phone  │
           │  Student  │
           └───────────┘
(Double ellipse indicates multi-valued)
```

### Derived Attributes

Computed from other attributes:

```
        ┌───┐
        │ ○ │ Age (derived from BirthDate)
        └─┬─┘
          │
   ○──────┤
 BirthDate│
          │  Student  │
          └───────────┘
(Dashed ellipse indicates derived)
```

### Key Attributes

Attributes that uniquely identify entities are underlined:

```
        ○ StudentID (underlined: ___________)
        │            StudentID
        │
        ○ Name
        │
   ┌────┴────────┐
   │   Student   │
   └─────────────┘
```

## Relationships

### Relationship Sets

A **relationship** is an association between entities:

```
┌──────────┐         ┌──────────┐
│ Student  │──Works──│ Project  │
└──────────┘   On    └──────────┘
```

### Relationship Notation

Relationships are shown as diamonds:

```
┌──────────┐     ◇─────────────◇     ┌──────────┐
│ Student  │─────│   Enrolls   │─────│  Course  │
└──────────┘     ◇─────────────◇     └──────────┘
```

### Relationship Attributes

Relationships can have their own attributes:

```
                    ○ Grade
                    │
┌──────────┐     ◇──┴──────────◇     ┌──────────┐
│ Student  │─────│   Enrolls   │─────│  Course  │
└──────────┘     ◇─────────────◇     └──────────┘
```

### Relationship Degree

**Binary**: Two entity sets (most common)
```
Student ──Enrolls── Course
```

**Ternary**: Three entity sets
```
Supplier ──Supplies── Part
           │
           └── Project
```

**Unary (Recursive)**: Same entity set
```
Employee ──Manages── Employee
```

## Cardinality Constraints

### One-to-One (1:1)

Each entity on one side associates with at most one entity on the other:

```
┌──────────┐  1        1  ┌──────────┐
│ Employee │──────────────│ Passport │
└──────────┘              └──────────┘

Each employee has one passport, each passport belongs to one employee.
```

### One-to-Many (1:N)

Each entity on one side can associate with many on the other:

```
┌──────────┐  1        N  ┌──────────┐
│Department│──────────────│ Employee │
└──────────┘              └──────────┘

One department has many employees, each employee in one department.
```

### Many-to-Many (M:N)

Entities on both sides can associate with many:

```
┌──────────┐  M        N  ┌──────────┐
│ Student  │──────────────│  Course  │
└──────────┘              └──────────┘

Students take many courses, courses have many students.
```

### Chen Notation

Original ER notation by Peter Chen:
- `1` or `N` written on relationship lines
- Single line for optional participation
- Double line for mandatory participation

### Crow's Foot Notation

More detailed cardinality:
```
──┼──────────○<   Zero or many
──┼──────────│<   One or many
──○──────────○<   Zero or one / Zero or many
──│──────────│<   Exactly one / One or many
```

## Participation Constraints

### Total Participation

Every entity must participate in the relationship (double line):

```
┌──────────┐             ┌──────────┐
│ Employee │════◇════════│Department│
└──────────┘  Works      └──────────┘
              In

Every employee must work in a department.
```

### Partial Participation

Entities may or may not participate (single line):

```
┌──────────┐             ┌──────────┐
│ Employee │────◇────────│ Project  │
└──────────┘  Works      └──────────┘
              On

Not every employee works on a project.
```

## Specialization and Generalization

### Inheritance (IS-A Relationship)

Specialization creates subclasses:

```
           ┌──────────┐
           │  Person  │
           └────┬─────┘
                │
           ╱────┴────╲
          ○
         ╱ ╲
        ╱   ╲
┌──────────┐  ┌──────────┐
│ Student  │  │ Employee │
└──────────┘  └──────────┘
```

### Disjoint vs Overlapping

**Disjoint (d)**: Entity belongs to at most one subclass
- A person is either a student OR an employee

**Overlapping (o)**: Entity can belong to multiple subclasses
- A person can be both a student AND an employee

### Total vs Partial Specialization

**Total**: Every superclass entity must be in some subclass
- Every person must be either student or employee

**Partial**: Superclass entities need not be in any subclass
- A person might be neither student nor employee

## Design Best Practices

### Entity vs Attribute

Use an entity when:
- It has its own attributes
- It participates in relationships
- Multiple entities might share the same value

Use an attribute when:
- It's a simple descriptive property
- It's single-valued and belongs to one entity

```
BAD:  Student has attribute "DepartmentName"
GOOD: Department is an entity, Student has relationship to Department
```

### Entity vs Relationship

Sometimes what appears as an entity is really a relationship:

```
-- Enrollment as relationship (if just connecting student-course)
Student ──Enrolls── Course

-- Enrollment as entity (if it has own identity, e.g., drop/add tracking)
Student ──Has── Enrollment ──For── Course
```

### Naming Conventions

- Entity names: Singular nouns (Student, not Students)
- Relationship names: Verbs or verb phrases (Enrolls, Works_For)
- Attribute names: Descriptive nouns (BirthDate, not BD)

