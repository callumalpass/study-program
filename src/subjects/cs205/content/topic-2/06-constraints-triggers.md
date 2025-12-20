---
id: cs205-t2-constraints
title: "Constraints and Triggers"
order: 6
---

# SQL Constraints and Triggers

While basic SQL data manipulation forms the foundation of database operations, constraints and triggers provide the mechanisms for maintaining data integrity automatically. Constraints declare rules that data must follow, while triggers execute custom logic in response to database events. Together, they form a powerful system for enforcing business rules at the database level.

## Advanced Constraint Usage

Beyond the basic constraints covered earlier, SQL provides sophisticated mechanisms for enforcing complex rules.

### Deferrable Constraints

By default, constraints are checked immediately when a statement executes. Deferrable constraints allow checking to be postponed until the end of a transaction, which is essential for certain complex operations:

```sql
CREATE TABLE Employees (
    EmpID INTEGER PRIMARY KEY,
    ManagerID INTEGER,
    CONSTRAINT fk_manager FOREIGN KEY (ManagerID)
        REFERENCES Employees(EmpID)
        DEFERRABLE INITIALLY DEFERRED
);
```

With deferred checking, you can insert mutual references:

```sql
BEGIN;
    -- Alice manages Bob, Bob manages Alice (circular)
    INSERT INTO Employees (EmpID, ManagerID) VALUES (1, 2);
    INSERT INTO Employees (EmpID, ManagerID) VALUES (2, 1);
COMMIT;  -- Constraint checked here, both rows exist
```

Constraint modes:
- **NOT DEFERRABLE**: Always checked immediately (default)
- **DEFERRABLE INITIALLY IMMEDIATE**: Can be deferred, but starts immediate
- **DEFERRABLE INITIALLY DEFERRED**: Checked at transaction end by default

Changing deferral mode within a transaction:
```sql
SET CONSTRAINTS fk_manager DEFERRED;
SET CONSTRAINTS fk_manager IMMEDIATE;
SET CONSTRAINTS ALL DEFERRED;
```

### EXCLUDE Constraints (PostgreSQL)

EXCLUDE constraints prevent rows where a combination of columns would conflict according to specified operators:

```sql
-- Prevent overlapping date ranges for the same room
CREATE TABLE RoomBookings (
    BookingID SERIAL PRIMARY KEY,
    RoomID INTEGER,
    StartDate DATE,
    EndDate DATE,
    EXCLUDE USING gist (
        RoomID WITH =,
        daterange(StartDate, EndDate) WITH &&
    )
);
```

The `&&` operator checks for range overlap. This single constraint prevents double-booking without complex trigger logic.

### Assertion Constraints (SQL Standard)

The SQL standard defines assertions as constraints that can span multiple tables:

```sql
-- SQL Standard (not widely implemented)
CREATE ASSERTION total_salary_check
    CHECK (
        NOT EXISTS (
            SELECT DeptID FROM Employees
            GROUP BY DeptID
            HAVING SUM(Salary) > (
                SELECT Budget FROM Departments
                WHERE Departments.DeptID = Employees.DeptID
            )
        )
    );
```

Since most databases don't support assertions, use triggers to implement cross-table constraints.

## Trigger Fundamentals

Triggers are database objects that automatically execute in response to specific events on tables or views.

### Trigger Components

Every trigger has three essential components:

1. **Event**: What database operation activates the trigger (INSERT, UPDATE, DELETE)
2. **Timing**: When the trigger fires (BEFORE, AFTER, INSTEAD OF)
3. **Granularity**: Row-level or statement-level execution

```sql
CREATE TRIGGER trigger_name
{BEFORE | AFTER | INSTEAD OF}
{INSERT | UPDATE | DELETE}
ON table_name
[FOR EACH ROW | FOR EACH STATEMENT]
[WHEN (condition)]
EXECUTE FUNCTION function_name();
```

### Row-Level vs Statement-Level Triggers

**Row-level triggers** execute once for each affected row:

```sql
-- Fires for each row being inserted
CREATE TRIGGER audit_employee_insert
AFTER INSERT ON Employees
FOR EACH ROW
EXECUTE FUNCTION log_employee_change();
```

**Statement-level triggers** execute once per statement regardless of rows affected:

```sql
-- Fires once per INSERT statement
CREATE TRIGGER refresh_summary
AFTER INSERT ON Orders
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_order_summary();
```

### Accessing Row Data in Triggers

Row-level triggers can access the row data:

- **NEW**: The new row for INSERT/UPDATE operations
- **OLD**: The existing row for UPDATE/DELETE operations

```sql
CREATE OR REPLACE FUNCTION validate_salary_change()
RETURNS TRIGGER AS $$
BEGIN
    -- OLD is the row before update, NEW is the proposed new row
    IF NEW.Salary < OLD.Salary * 0.8 THEN
        RAISE EXCEPTION 'Salary cannot decrease by more than 20%%';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_salary_change
BEFORE UPDATE ON Employees
FOR EACH ROW
EXECUTE FUNCTION validate_salary_change();
```

## Common Trigger Use Cases

### Audit Logging

Track all changes to sensitive data:

```sql
CREATE TABLE EmployeeAudit (
    AuditID SERIAL PRIMARY KEY,
    EmpID INTEGER,
    Operation VARCHAR(10),
    OldValues JSONB,
    NewValues JSONB,
    ChangedBy VARCHAR(100),
    ChangedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION audit_employee_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO EmployeeAudit (EmpID, Operation, NewValues, ChangedBy)
        VALUES (NEW.EmpID, 'INSERT', to_jsonb(NEW), current_user);
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO EmployeeAudit (EmpID, Operation, OldValues, NewValues, ChangedBy)
        VALUES (NEW.EmpID, 'UPDATE', to_jsonb(OLD), to_jsonb(NEW), current_user);
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO EmployeeAudit (EmpID, Operation, OldValues, ChangedBy)
        VALUES (OLD.EmpID, 'DELETE', to_jsonb(OLD), current_user);
    END IF;
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER employee_audit
AFTER INSERT OR UPDATE OR DELETE ON Employees
FOR EACH ROW
EXECUTE FUNCTION audit_employee_changes();
```

### Automatic Timestamps

Automatically set creation and modification timestamps:

```sql
CREATE OR REPLACE FUNCTION set_timestamps()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        NEW.created_at = CURRENT_TIMESTAMP;
    END IF;
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER orders_timestamps
BEFORE INSERT OR UPDATE ON Orders
FOR EACH ROW
EXECUTE FUNCTION set_timestamps();
```

### Maintaining Derived Values

Keep calculated values in sync:

```sql
CREATE OR REPLACE FUNCTION update_order_total()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE Orders
    SET TotalAmount = (
        SELECT COALESCE(SUM(Quantity * UnitPrice), 0)
        FROM OrderItems
        WHERE OrderID = COALESCE(NEW.OrderID, OLD.OrderID)
    )
    WHERE OrderID = COALESCE(NEW.OrderID, OLD.OrderID);
    RETURN NULL;  -- AFTER trigger can return NULL
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER recalculate_order_total
AFTER INSERT OR UPDATE OR DELETE ON OrderItems
FOR EACH ROW
EXECUTE FUNCTION update_order_total();
```

### Enforcing Complex Business Rules

Implement rules that constraints cannot express:

```sql
CREATE OR REPLACE FUNCTION check_department_budget()
RETURNS TRIGGER AS $$
DECLARE
    dept_budget DECIMAL(12,2);
    total_salary DECIMAL(12,2);
BEGIN
    SELECT Budget INTO dept_budget
    FROM Departments
    WHERE DeptID = NEW.DeptID;

    SELECT COALESCE(SUM(Salary), 0) INTO total_salary
    FROM Employees
    WHERE DeptID = NEW.DeptID
      AND EmpID != COALESCE(OLD.EmpID, -1);  -- Exclude current row if UPDATE

    IF total_salary + NEW.Salary > dept_budget THEN
        RAISE EXCEPTION 'Salary exceeds department budget. Budget: %, Current Total: %, Proposed: %',
            dept_budget, total_salary, NEW.Salary;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_dept_budget
BEFORE INSERT OR UPDATE ON Employees
FOR EACH ROW
EXECUTE FUNCTION check_department_budget();
```

### Cascading Updates

Propagate changes across related tables:

```sql
CREATE OR REPLACE FUNCTION cascade_price_update()
RETURNS TRIGGER AS $$
BEGIN
    -- When product price changes, update pending order items
    UPDATE OrderItems
    SET UnitPrice = NEW.Price
    WHERE ProductID = NEW.ProductID
      AND OrderID IN (
          SELECT OrderID FROM Orders WHERE Status = 'Pending'
      );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER product_price_cascade
AFTER UPDATE OF Price ON Products
FOR EACH ROW
EXECUTE FUNCTION cascade_price_update();
```

## INSTEAD OF Triggers

INSTEAD OF triggers are used with views to make them updatable:

```sql
CREATE VIEW CustomerOrders AS
SELECT c.CustomerID, c.Name, o.OrderID, o.OrderDate, o.TotalAmount
FROM Customers c
JOIN Orders o ON c.CustomerID = o.CustomerID;

CREATE OR REPLACE FUNCTION customer_orders_insert()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert into Orders table only (customer must exist)
    INSERT INTO Orders (OrderID, CustomerID, OrderDate, TotalAmount)
    VALUES (NEW.OrderID, NEW.CustomerID, NEW.OrderDate, NEW.TotalAmount);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER insert_customer_order
INSTEAD OF INSERT ON CustomerOrders
FOR EACH ROW
EXECUTE FUNCTION customer_orders_insert();
```

## Trigger Ordering and Chaining

### Multiple Triggers on Same Event

When multiple triggers are defined for the same event, they execute in alphabetical order by name (in PostgreSQL). Plan trigger names accordingly:

```sql
CREATE TRIGGER a_validate_data ...    -- Runs first
CREATE TRIGGER b_transform_data ...   -- Runs second
CREATE TRIGGER c_audit_changes ...    -- Runs last
```

### Trigger Chaining

Triggers can cause cascading trigger execution:

```sql
-- Trigger on Orders might update OrderSummary
-- Which fires another trigger on OrderSummary
-- Be careful of infinite loops!
```

Prevent infinite recursion:
```sql
CREATE OR REPLACE FUNCTION safe_update()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if we're already in a trigger chain
    IF current_setting('app.in_trigger', true) = 'true' THEN
        RETURN NEW;
    END IF;

    PERFORM set_config('app.in_trigger', 'true', true);
    -- ... do work ...
    PERFORM set_config('app.in_trigger', 'false', true);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

## Performance Considerations

### Trigger Impact on Performance

Triggers add overhead to every affected operation:

```sql
-- Every INSERT now requires trigger execution
INSERT INTO Orders VALUES (...);  -- Baseline time + trigger time
```

**Minimize trigger impact:**
- Keep trigger logic simple and fast
- Avoid complex queries in row-level triggers
- Use statement-level triggers when row-level isn't needed
- Index tables accessed by trigger queries
- Consider batch processing instead of per-row triggers

### When to Use Triggers vs Application Logic

| Scenario | Recommendation |
|----------|----------------|
| Enforcing data integrity | Triggers (always enforced) |
| Audit logging | Triggers (captures all changes) |
| Complex business validation | Application logic (easier testing) |
| Sending notifications | Application logic (async handling) |
| Cross-database consistency | Triggers (database-level guarantee) |

## Debugging Triggers

### Viewing Trigger Definitions

```sql
-- PostgreSQL
SELECT tgname, tgrelid::regclass, pg_get_triggerdef(oid)
FROM pg_trigger
WHERE tgrelid = 'employees'::regclass;

-- MySQL
SHOW TRIGGERS LIKE 'employees';

-- SQL Server
SELECT name, definition
FROM sys.triggers t
JOIN sys.sql_modules m ON t.object_id = m.object_id;
```

### Testing Triggers

Test triggers with explicit transaction control:

```sql
BEGIN;
    INSERT INTO Employees (EmpID, Name, Salary, DeptID)
    VALUES (999, 'Test User', 100000, 1);

    -- Check if audit record was created
    SELECT * FROM EmployeeAudit WHERE EmpID = 999;
ROLLBACK;  -- Clean up test data
```

### Disabling Triggers

Temporarily disable triggers for maintenance:

```sql
-- PostgreSQL
ALTER TABLE Employees DISABLE TRIGGER ALL;
-- ... maintenance operations ...
ALTER TABLE Employees ENABLE TRIGGER ALL;

-- Disable specific trigger
ALTER TABLE Employees DISABLE TRIGGER employee_audit;
```

Triggers and constraints together form a comprehensive system for maintaining data integrity. Use constraints for declarative rules that can be expressed simply, and triggers for complex logic that requires procedural code. Always consider the performance implications and test thoroughly before deploying to production.
