# Transactions and ACID Properties

Transactions ensure database operations are reliable even in the presence of failures and concurrent access. Understanding ACID properties is essential for building robust applications.

## What is a Transaction?

A transaction is a logical unit of work consisting of one or more database operations that must succeed or fail as a whole.

```sql
-- Transfer $100 from account A to account B
BEGIN TRANSACTION;
    UPDATE Accounts SET Balance = Balance - 100 WHERE AccountID = 'A';
    UPDATE Accounts SET Balance = Balance + 100 WHERE AccountID = 'B';
COMMIT;
```

Either both operations succeed, or neither does.

## ACID Properties

### Atomicity

**All or nothing**: Either all operations in a transaction complete, or none do.

If a failure occurs mid-transaction, the database rolls back to its pre-transaction state.

```sql
BEGIN TRANSACTION;
    DELETE FROM OrderItems WHERE OrderID = 1001;
    DELETE FROM Orders WHERE OrderID = 1001;  -- Fails here?
    -- Roll back: OrderItems deletion is undone
ROLLBACK;  -- or automatic on failure
```

### Consistency

Transactions move the database from one valid state to another. All constraints must be satisfied after a transaction completes.

```sql
-- Constraint: Account balance >= 0
BEGIN TRANSACTION;
    UPDATE Accounts SET Balance = Balance - 1000 WHERE AccountID = 'A';
    -- If this would make Balance < 0, transaction fails
COMMIT;
```

### Isolation

Concurrent transactions don't interfere with each other. Each transaction sees a consistent snapshot of the database.

Without isolation:
```
Transaction 1:              Transaction 2:
READ Balance = 100
                           READ Balance = 100
Balance = Balance - 50
WRITE Balance = 50
                           Balance = Balance - 30
                           WRITE Balance = 70  -- Lost update!
```

### Durability

Once a transaction commits, its changes persist even through system failures.

Implemented through:
- Write-ahead logging (WAL)
- Checkpoints
- Transaction logs
- Battery-backed caches

## Transaction Control

### SQL Commands

```sql
BEGIN TRANSACTION;  -- or START TRANSACTION
    -- operations
COMMIT;             -- Make changes permanent

BEGIN TRANSACTION;
    -- operations
ROLLBACK;           -- Undo all changes

SAVEPOINT sp1;
    -- operations
ROLLBACK TO sp1;    -- Undo to savepoint
```

### Autocommit

Many systems auto-commit each statement by default:

```sql
SET AUTOCOMMIT = OFF;  -- Require explicit COMMIT
UPDATE Products SET Price = Price * 1.1;
COMMIT;  -- Now required
```

## Concurrency Problems

### Lost Update

Two transactions read and write the same data:
```
T1: Read X=100, Write X=150
T2: Read X=100, Write X=200
Result: T1's update is lost
```

### Dirty Read

Read uncommitted data that may be rolled back:
```
T1: Write X=200 (uncommitted)
T2: Read X=200
T1: ROLLBACK (X is really 100)
T2 has read invalid data
```

### Non-repeatable Read

Same query returns different results within a transaction:
```
T1: Read X=100
T2: Write X=200, COMMIT
T1: Read X=200  -- Different from first read!
```

### Phantom Read

New rows appear in repeated queries:
```
T1: SELECT * WHERE Price < 100 (finds 5 rows)
T2: INSERT row with Price=50, COMMIT
T1: SELECT * WHERE Price < 100 (finds 6 rows!)
```

## Isolation Levels

### READ UNCOMMITTED

Allows dirty reads. Rarely used.

### READ COMMITTED

Prevents dirty reads. Each statement sees committed data at statement start.

### REPEATABLE READ

Prevents dirty and non-repeatable reads. Rows read are locked.

### SERIALIZABLE

Prevents all anomalies. Transactions execute as if serial.

```sql
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
BEGIN TRANSACTION;
    -- operations
COMMIT;
```

### Trade-offs

Higher isolation = fewer anomalies but lower concurrency.

| Level | Dirty Read | Non-repeatable | Phantom |
|-------|------------|----------------|---------|
| READ UNCOMMITTED | Possible | Possible | Possible |
| READ COMMITTED | Prevented | Possible | Possible |
| REPEATABLE READ | Prevented | Prevented | Possible |
| SERIALIZABLE | Prevented | Prevented | Prevented |

## Locking

### Lock Types

- **Shared (S)**: For reading, multiple transactions can hold
- **Exclusive (X)**: For writing, only one transaction can hold

### Lock Granularity

- Row-level: Most concurrent, highest overhead
- Page-level: Middle ground
- Table-level: Least concurrent, lowest overhead

### Two-Phase Locking (2PL)

1. **Growing phase**: Acquire locks, no releases
2. **Shrinking phase**: Release locks, no acquires

Guarantees serializability.

## Deadlock

Two transactions waiting for each other:

```
T1: Lock A, waiting for B
T2: Lock B, waiting for A
```

**Detection**: Build wait-for graph, detect cycles.

**Prevention**: Lock ordering, timeouts.

**Resolution**: Abort one transaction (victim selection).

## Learning Objectives

By the end of this topic, you should be able to:
- Explain the ACID properties
- Use transaction control commands
- Identify concurrency problems
- Choose appropriate isolation levels
- Understand locking mechanisms and deadlocks
