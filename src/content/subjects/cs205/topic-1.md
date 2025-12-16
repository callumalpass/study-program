# Relational Model and ER Diagrams

The relational model provides a mathematical foundation for database systems, while Entity-Relationship diagrams offer an intuitive way to design databases before implementation.

## The Relational Model

### Historical Context

Edgar F. Codd introduced the relational model in 1970 at IBM, revolutionizing how we think about data storage. Before relational databases, systems used hierarchical or network models that required programmers to navigate complex pointer structures. The relational model's key insight was separating the logical view of data from its physical storage.

### Core Concepts

**Relations (Tables)**: A relation is a set of tuples (rows) with the same attributes (columns). Unlike arrays, relations are:
- Unordered (no first or last row)
- Have no duplicate rows
- Have attributes that are atomic (indivisible)

**Schema vs Instance**: The schema defines the structure (relation name and attributes with their domains), while an instance is the actual data at a particular time.

**Keys**: Attributes that uniquely identify tuples:
- **Superkey**: Any set of attributes that uniquely identifies rows
- **Candidate key**: Minimal superkey (no subset is also a superkey)
- **Primary key**: Chosen candidate key for the relation
- **Foreign key**: Attribute(s) that reference the primary key of another relation

### Relational Algebra

The theoretical query language with operations:
- **Selection (σ)**: Filter rows by condition
- **Projection (π)**: Select specific columns
- **Union (∪)**: Combine rows from two relations
- **Difference (-)**: Rows in first but not second relation
- **Cartesian Product (×)**: All combinations of rows
- **Join (⋈)**: Combine related rows from two relations

## Entity-Relationship Model

### Entities and Attributes

**Entities** are real-world objects or concepts that we want to model (Customer, Product, Order). **Attributes** describe properties of entities:
- **Simple**: Cannot be divided (Name)
- **Composite**: Can be divided (Address → Street, City, ZIP)
- **Derived**: Computed from other attributes (Age from BirthDate)
- **Multi-valued**: Can have multiple values (PhoneNumbers)

### Relationships

Relationships connect entities with:
- **Degree**: Number of participating entity sets (binary, ternary)
- **Cardinality**: How many entities can participate (1:1, 1:N, M:N)
- **Participation**: Total (every entity must participate) or partial

### ER Diagram Notation

- Rectangles: Entity sets
- Ellipses: Attributes
- Diamonds: Relationships
- Lines: Connect entities to relationships

## Mapping ER to Relations

### Strong Entities
Create a table with all simple attributes. Choose a primary key from candidate keys.

### Weak Entities
Include the primary key of the identifying (owner) entity as part of the composite primary key.

### Relationships
- **1:1**: Add foreign key to either table (preferring total participation side)
- **1:N**: Add foreign key to the "many" side
- **M:N**: Create a new junction table with foreign keys to both entities

### Multi-valued Attributes
Create a separate table with the primary key of the entity and the multi-valued attribute.

## Learning Objectives

By the end of this topic, you should be able to:
- Explain the components of the relational model
- Define keys and understand their importance
- Create ER diagrams from requirements
- Convert ER diagrams to relational schemas
- Apply relational algebra operations
