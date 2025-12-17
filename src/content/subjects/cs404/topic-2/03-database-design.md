# Database Design

## Introduction

Database design is the process of defining the structure, storage, and relationships of your application's data. A well-designed database ensures data integrity, supports efficient queries, scales gracefully, and makes your application logic cleaner. Poor database design leads to data inconsistencies, performance problems, and complex application code working around structural issues.

For capstone projects, database design is often underestimated but critical. The database schema you define early influences every other part of your application. Investing time upfront in thoughtful database design prevents painful refactoring later.

## Learning Objectives

By the end of this lesson, you will be able to:

- Design normalized database schemas
- Create entity-relationship diagrams (ERDs)
- Choose appropriate data types and constraints
- Define relationships between entities
- Apply indexing strategies for performance
- Handle common design patterns (users, timestamps, soft deletes)
- Make trade-offs between normalization and denormalization
- Plan for data migration and schema evolution

## Relational Database Fundamentals

### Entities and Relationships

**Entity:** A distinct object or concept (User, Activity, Goal)

**Attributes:** Properties of an entity (User: email, name, created_at)

**Relationships:** How entities connect
- One-to-One (User ↔ Profile)
- One-to-Many (User → Activities)  
- Many-to-Many (Users ↔ Goals via junction table)

### Keys

**Primary Key:** Uniquely identifies each record
\`\`\`sql
id UUID PRIMARY KEY DEFAULT gen_random_uuid()
\`\`\`

**Foreign Key:** References primary key in another table
\`\`\`sql
user_id UUID REFERENCES users(id)
\`\`\`

**Composite Key:** Multiple columns form unique identifier
\`\`\`sql
PRIMARY KEY (user_id, activity_id)
\`\`\`

### Normalization

**First Normal Form (1NF):**
- Atomic values (no lists in single column)
- Each row unique
- Each column contains only one type of data

**Second Normal Form (2NF):**
- Meets 1NF
- No partial dependencies on composite keys

**Third Normal Form (3NF):**
- Meets 2NF
- No transitive dependencies
- Non-key columns depend only on primary key

**Practical Application:**
For most capstone projects, aim for 3NF. It balances data integrity with simplicity.

## Schema Design Process

### Step 1: Identify Entities

List the nouns in your requirements:

**EcoTracker Example:**
- User
- Activity
- Goal
- EmissionFactor
- Recommendation

### Step 2: Define Attributes

For each entity, list its properties:

**User:**
- id (UUID)
- email (string, unique)
- password_hash (string)
- name (string)
- preferences (JSON)
- created_at (timestamp)
- updated_at (timestamp)

**Activity:**
- id (UUID)
- user_id (UUID, foreign key)
- category (enum)
- activity_type (string)
- quantity (decimal)
- unit (string)
- carbon_kg (decimal)
- activity_date (date)
- notes (text, optional)
- created_at (timestamp)
- updated_at (timestamp)

### Step 3: Determine Relationships

**User → Activity (One-to-Many):**
- A user can have many activities
- Each activity belongs to one user

**User ↔ Goal (One-to-Many):**
- A user can set multiple goals
- Each goal belongs to one user

**Activity → EmissionFactor (Many-to-One):**
- Many activities reference same emission factor
- Each activity uses one emission factor

### Step 4: Create ERD

\`\`\`mermaid
erDiagram
    USER ||--o{ ACTIVITY : logs
    USER ||--o{ GOAL : sets
    ACTIVITY }o--|| EMISSION_FACTOR : uses
    
    USER {
        uuid id PK
        string email UK
        string password_hash
        string name
        json preferences
        timestamp created_at
        timestamp updated_at
    }
    
    ACTIVITY {
        uuid id PK
        uuid user_id FK
        string category
        string activity_type
        decimal quantity
        string unit
        decimal carbon_kg
        date activity_date
        text notes
        timestamp created_at
        timestamp updated_at
    }
    
    GOAL {
        uuid id PK
        uuid user_id FK
        string category
        decimal target_reduction_pct
        date start_date
        date end_date
        boolean achieved
        timestamp created_at
        timestamp updated_at
    }
    
    EMISSION_FACTOR {
        uuid id PK
        string category
        string activity_type
        decimal kg_co2_per_unit
        string unit
        string source
        date last_updated
    }
```

### Step 5: Define Constraints

**Data Integrity Constraints:**

\`\`\`sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

CREATE TABLE activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL,
    activity_type VARCHAR(100) NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL CHECK (quantity > 0),
    unit VARCHAR(20) NOT NULL,
    carbon_kg DECIMAL(10, 2) NOT NULL CHECK (carbon_kg >= 0),
    activity_date DATE NOT NULL DEFAULT CURRENT_DATE,
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT valid_category CHECK (category IN ('transportation', 'energy', 'food', 'waste', 'purchases'))
);
\`\`\`

## Common Design Patterns

### Timestamps

Always include created_at and updated_at:

\`\`\`sql
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
\`\`\`

**With trigger for auto-update:**
\`\`\`sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at 
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
\`\`\`

### Soft Deletes

Keep records instead of deleting:

\`\`\`sql
deleted_at TIMESTAMP NULL,

-- Query only active records
SELECT * FROM users WHERE deleted_at IS NULL;

-- "Delete" a user
UPDATE users SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1;
\`\`\`

**Pros:** Can recover data, audit trail
**Cons:** Complicates queries, takes more space

### UUID vs. Auto-Increment IDs

**Auto-Increment (SERIAL):**
\`\`\`sql
id SERIAL PRIMARY KEY
\`\`\`
- Pros: Simple, predictable, smaller size
- Cons: Reveals record count, not globally unique

**UUID:**
\`\`\`sql
id UUID PRIMARY KEY DEFAULT gen_random_uuid()
\`\`\`
- Pros: Globally unique, harder to guess, distributed systems friendly
- Cons: Larger size, less human-readable

**Recommendation for Capstone:** Use UUIDs for better security and professional practice.

### Enums vs. String vs. Reference Tables

**Database Enum:**
\`\`\`sql
CREATE TYPE activity_category AS ENUM ('transportation', 'energy', 'food', 'waste', 'purchases');
ALTER TABLE activities ADD COLUMN category activity_category;
\`\`\`

**String with CHECK:**
\`\`\`sql
category VARCHAR(50) CHECK (category IN ('transportation', 'energy', 'food', 'waste', 'purchases'))
\`\`\`

**Reference Table:**
\`\`\`sql
CREATE TABLE categories (
    id UUID PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

ALTER TABLE activities ADD COLUMN category_id UUID REFERENCES categories(id);
\`\`\`

**Decision Guide:**
- Few, stable values → Enum or CHECK constraint
- Many values or frequently changing → Reference table
- App-level validation only → String without constraint (not recommended)

### JSON Columns

Modern databases support JSON:

\`\`\`sql
preferences JSONB DEFAULT '{}'
\`\`\`

**When to use:**
- Flexible, variable structure
- Don't need to query individual fields often
- User-specific settings

**When NOT to use:**
- Frequently queried fields
- Need strong typing
- Require foreign key relationships

**Example:**
\`\`\`sql
-- Good use: user preferences
preferences JSONB DEFAULT '{"theme": "light", "notifications": true}'

-- Bad use: storing related entities
-- Don't do this:
activities JSONB  -- Should be separate table
\`\`\`

## Indexing Strategy

### When to Add Indexes

**Always index:**
- Primary keys (automatic)
- Foreign keys
- Columns in WHERE clauses
- Columns in JOIN conditions
- Columns in ORDER BY

**Example:**
\`\`\`sql
-- Foreign key index
CREATE INDEX idx_activities_user_id ON activities(user_id);

-- Date range queries
CREATE INDEX idx_activities_date ON activities(activity_date);

-- Composite index for common query
CREATE INDEX idx_activities_user_date ON activities(user_id, activity_date DESC);

-- Unique constraint (creates index)
CREATE UNIQUE INDEX idx_users_email ON users(email);
\`\`\`

### Index Trade-offs

**Pros:**
- Faster queries
- Enforces uniqueness

**Cons:**
- Slower writes
- Takes disk space
- Maintenance overhead

**Rule of thumb:** Index based on actual query patterns, not speculation.

### Full-Text Search

For search functionality:

\`\`\`sql
-- Add tsvector column
ALTER TABLE activities ADD COLUMN search_vector tsvector;

-- Populate it
UPDATE activities 
SET search_vector = to_tsvector('english', coalesce(activity_type, '') || ' ' || coalesce(notes, ''));

-- Create GIN index
CREATE INDEX idx_activities_search ON activities USING GIN(search_vector);

-- Search query
SELECT * FROM activities 
WHERE search_vector @@ to_tsquery('english', 'driving');
\`\`\`

## Schema Migration

### Migration Tools

**Prisma:**
\`\`\`bash
npx prisma migrate dev --name add_goals_table
\`\`\`

**TypeORM:**
\`\`\`bash
npm run typeorm migration:generate -- -n AddGoalsTable
npm run typeorm migration:run
\`\`\`

**Knex:**
\`\`\`bash
npx knex migrate:make add_goals_table
npx knex migrate:latest
\`\`\`

### Migration Best Practices

**1. Always use migrations (never manual SQL in production)**

**2. Make migrations reversible:**
\`\`\`javascript
exports.up = function(knex) {
  return knex.schema.createTable('goals', table => {
    table.uuid('id').primary();
    // ...
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('goals');
};
\`\`\`

**3. Test migrations on copy of production data**

**4. Migrations should be small and focused:**
- ✓ Good: One migration adds goals table
- ✗ Bad: One migration restructures entire database

**5. Never edit existing migrations in production**
- Create new migration instead

## Complete Schema Example

\`\`\`sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    preferences JSONB DEFAULT '{}',
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    
    CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Activities table
CREATE TABLE activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL,
    activity_type VARCHAR(100) NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL CHECK (quantity > 0),
    unit VARCHAR(20) NOT NULL,
    carbon_kg DECIMAL(10, 2) NOT NULL CHECK (carbon_kg >= 0),
    activity_date DATE NOT NULL DEFAULT CURRENT_DATE,
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT valid_category CHECK (category IN ('transportation', 'energy', 'food', 'waste', 'purchases'))
);

CREATE INDEX idx_activities_user_id ON activities(user_id);
CREATE INDEX idx_activities_date ON activities(activity_date DESC);
CREATE INDEX idx_activities_category ON activities(category);
CREATE INDEX idx_activities_user_date ON activities(user_id, activity_date DESC);

-- Goals table
CREATE TABLE goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL,
    target_reduction_pct DECIMAL(5, 2) NOT NULL CHECK (target_reduction_pct BETWEEN 0 AND 100),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    achieved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT valid_date_range CHECK (end_date > start_date),
    CONSTRAINT valid_category CHECK (category IN ('transportation', 'energy', 'food', 'waste', 'purchases'))
);

CREATE INDEX idx_goals_user_id ON goals(user_id);
CREATE INDEX idx_goals_dates ON goals(start_date, end_date);

-- Emission factors table
CREATE TABLE emission_factors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(50) NOT NULL,
    activity_type VARCHAR(100) NOT NULL,
    kg_co2_per_unit DECIMAL(10, 4) NOT NULL CHECK (kg_co2_per_unit >= 0),
    unit VARCHAR(20) NOT NULL,
    source VARCHAR(255),
    last_updated DATE NOT NULL DEFAULT CURRENT_DATE,
    
    UNIQUE(category, activity_type, unit)
);

CREATE INDEX idx_emission_factors_category ON emission_factors(category);

-- Update timestamp triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON activities
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_goals_updated_at BEFORE UPDATE ON goals
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
\`\`\`

## Common Database Design Mistakes

### Mistake 1: No Foreign Keys

**Bad:**
\`\`\`sql
CREATE TABLE activities (
    id UUID PRIMARY KEY,
    user_id UUID  -- No constraint
);
\`\`\`

**Good:**
\`\`\`sql
CREATE TABLE activities (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
);
\`\`\`

### Mistake 2: Using VARCHAR for everything

**Bad:**
\`\`\`sql
created_at VARCHAR(255)  -- Should be TIMESTAMP
is_active VARCHAR(10)     -- Should be BOOLEAN
quantity VARCHAR(50)      -- Should be DECIMAL
\`\`\`

**Good:** Use appropriate data types

### Mistake 3: No Indexes on Foreign Keys

Always index foreign keys for join performance.

### Mistake 4: Storing Computed Values

**Bad:**
\`\`\`sql
total_carbon DECIMAL -- Stored, must be kept in sync
\`\`\`

**Good:**
\`\`\`sql
-- Compute in query
SELECT SUM(carbon_kg) as total_carbon FROM activities WHERE user_id = $1;
\`\`\`

**Exception:** Denormalization for performance after profiling shows need.

### Mistake 5: Generic Column Names

**Bad:**
\`\`\`sql
CREATE TABLE activities (
    type VARCHAR(50),  -- activity_type is clearer
    date DATE,         -- activity_date is clearer
    value DECIMAL      -- quantity is clearer
);
\`\`\`

## Database Design Checklist

### Schema Design
- [ ] All entities identified
- [ ] Attributes defined with appropriate data types
- [ ] Relationships defined
- [ ] ERD created
- [ ] Normalization level appropriate (usually 3NF)
- [ ] Primary keys defined (UUID recommended)
- [ ] Foreign keys defined with proper constraints
- [ ] ON DELETE behavior specified

### Data Integrity
- [ ] NOT NULL constraints on required fields
- [ ] UNIQUE constraints where needed
- [ ] CHECK constraints for validation
- [ ] Default values specified
- [ ] Timestamp columns (created_at, updated_at)
- [ ] Email/data format validation

### Performance
- [ ] Indexes on foreign keys
- [ ] Indexes on frequently queried columns
- [ ] Indexes on JOIN and WHERE clause columns
- [ ] Composite indexes for common query patterns
- [ ] Full-text search indexes if needed

### Maintainability
- [ ] Migration system in place
- [ ] Migration files version controlled
- [ ] Rollback migrations defined
- [ ] Schema documentation
- [ ] Naming conventions consistent

## Summary

Database design is foundational to your application's success. Invest time upfront to:
- Model your domain accurately with entities and relationships
- Apply normalization to avoid data anomalies
- Define proper constraints for data integrity  
- Add indexes for query performance
- Use migrations for schema evolution

For capstone projects, aim for a solid 3NF design with UUID primary keys, proper foreign key constraints, timestamps, and strategic indexing. Avoid over-engineering (you probably don't need sharding), but don't under-engineer either (skipping foreign keys will hurt you).

Document your schema with an ERD and explain your design decisions. A well-designed database demonstrates systems thinking and engineering discipline—valuable skills beyond the capstone.

## Additional Resources

- "Database Design for Mere Mortals" by Michael Hernandez
- PostgreSQL documentation: postgresql.org/docs
- dbdiagram.io - ERD tool
- Prisma Schema Reference
- "Seven Databases in Seven Weeks"
- Database normalization tutorial: studytonight.com/dbms
