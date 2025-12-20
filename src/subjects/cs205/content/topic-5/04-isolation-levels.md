---
id: cs205-t5-isolation
title: "Isolation Levels"
order: 4
---

# Isolation Levels

SQL defines four standard isolation levels that balance concurrency with consistency. Each level provides different guarantees about transaction visibility.

## READ UNCOMMITTED

### Behavior

The lowest isolation level. Transactions can see uncommitted changes from other transactions.

```sql
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

-- T1
BEGIN;
UPDATE Products SET Price = 100 WHERE ID = 1;
-- Not committed yet

-- T2 (READ UNCOMMITTED)
SELECT Price FROM Products WHERE ID = 1;
-- Returns 100 (dirty read!)

-- T1
ROLLBACK;
-- T2 used a value that never really existed
```

### Use Cases

```
Appropriate when:
- Approximate counts are acceptable
- Reading log tables (append-only)
- Performance >> accuracy
- Data warehouse pre-aggregation

Example:
-- Quick estimate of table size
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
SELECT COUNT(*) FROM LargeTable;  -- Fast, approximate
```

### Implementation

```
No read locks acquired
Writes still acquire locks (prevent lost updates)
Minimal overhead
Maximum concurrency

Behavior summary:
- Dirty reads: Allowed
- Non-repeatable reads: Allowed
- Phantoms: Allowed
```

## READ COMMITTED

### Behavior

Transactions only see committed data. This is the default in most databases.

```sql
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- T1
BEGIN;
UPDATE Accounts SET Balance = 500 WHERE ID = 1;
-- Not committed

-- T2 (READ COMMITTED)
SELECT Balance FROM Accounts WHERE ID = 1;
-- Returns original value (not 500)
-- Or waits for T1 to commit/rollback

-- T1
COMMIT;

-- T2
SELECT Balance FROM Accounts WHERE ID = 1;
-- Now returns 500
```

### Non-Repeatable Read Example

```sql
-- T1 (READ COMMITTED)
BEGIN;
SELECT Balance FROM Accounts WHERE ID = 1;  -- Returns 1000

-- T2
UPDATE Accounts SET Balance = 500 WHERE ID = 1;
COMMIT;

-- T1 (same transaction)
SELECT Balance FROM Accounts WHERE ID = 1;  -- Returns 500!
-- Different value in same transaction
COMMIT;
```

### Implementation Details

```
PostgreSQL:
- Each statement sees snapshot at statement start
- Within transaction, different statements may see different data

Oracle:
- Same as PostgreSQL (statement-level snapshot)

SQL Server:
- Read locks released immediately after read
- No statement-level snapshot by default
- Can enable READ_COMMITTED_SNAPSHOT for MVCC behavior
```

### Practical Implications

```sql
-- Problem: TOC/TOU (Time of Check/Time of Use)
BEGIN;
SELECT Quantity FROM Inventory WHERE ProductID = 1;
-- Returns 10
-- Another transaction reduces to 5
UPDATE Inventory
SET Quantity = Quantity - 8
WHERE ProductID = 1;
-- Quantity now -3! (invalid)
COMMIT;

-- Solution: Use single atomic statement
UPDATE Inventory
SET Quantity = Quantity - 8
WHERE ProductID = 1 AND Quantity >= 8;
-- Check @@ROWCOUNT to verify success
```

## REPEATABLE READ

### Behavior

Guarantees same row returns same value on re-read within a transaction.

```sql
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

-- T1
BEGIN;
SELECT Balance FROM Accounts WHERE ID = 1;  -- Returns 1000

-- T2 (tries to update)
UPDATE Accounts SET Balance = 500 WHERE ID = 1;
-- Blocked (or conflict detected in MVCC)

-- T1
SELECT Balance FROM Accounts WHERE ID = 1;  -- Still 1000
COMMIT;

-- Now T2 can proceed
```

### Phantom Still Possible

```sql
-- T1 (REPEATABLE READ)
BEGIN;
SELECT COUNT(*) FROM Orders WHERE Status = 'Pending';  -- Returns 10

-- T2
INSERT INTO Orders (Status) VALUES ('Pending');
COMMIT;

-- T1
SELECT COUNT(*) FROM Orders WHERE Status = 'Pending';  -- Returns 11
-- New row appeared (phantom)
COMMIT;
```

### MySQL Specialty

```sql
-- MySQL's REPEATABLE READ actually prevents phantoms!
-- Uses gap locking to prevent inserts in query ranges

-- T1 (MySQL REPEATABLE READ)
BEGIN;
SELECT * FROM Orders WHERE OrderDate BETWEEN '2024-01-01' AND '2024-01-31'
FOR UPDATE;
-- Locks the range, not just existing rows

-- T2
INSERT INTO Orders (OrderDate) VALUES ('2024-01-15');
-- Blocked! Gap lock prevents insert

-- T1
SELECT * FROM Orders WHERE OrderDate BETWEEN '2024-01-01' AND '2024-01-31';
-- Same results, no phantom
COMMIT;
```

### Snapshot Isolation

```sql
-- PostgreSQL/Oracle implement via MVCC snapshots

-- T1 starts transaction
-- Snapshot taken: all committed data as of T1's start

-- Any changes by other transactions invisible to T1
-- T1 sees consistent snapshot throughout

-- PostgreSQL:
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
-- Creates transaction-level snapshot
```

## SERIALIZABLE

### Behavior

The highest isolation level. Transactions execute as if they were serial (one after another).

```sql
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

-- Guarantees:
-- - No dirty reads
-- - No non-repeatable reads
-- - No phantom reads
-- - No write skew
-- - Result equivalent to some serial execution
```

### Implementation Approaches

```
1. Two-Phase Locking (2PL):
   - Acquire all locks before any releases
   - Shared locks for reads, exclusive for writes
   - Range locks for queries
   - High contention, blocking

2. Serializable Snapshot Isolation (SSI):
   - MVCC with conflict detection
   - Tracks read/write dependencies
   - Aborts transaction on detected conflict
   - Better concurrency than 2PL

PostgreSQL uses SSI
MySQL uses gap locking (2PL-like)
```

### Write Skew Prevention

```sql
-- SERIALIZABLE prevents write skew

-- Doctor on-call example
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

-- T1
BEGIN;
SELECT COUNT(*) FROM Doctors WHERE OnCall = true;  -- Returns 2
UPDATE Doctors SET OnCall = false WHERE DoctorID = 1;
COMMIT;

-- T2 (concurrent)
BEGIN;
SELECT COUNT(*) FROM Doctors WHERE OnCall = true;  -- Returns 2
UPDATE Doctors SET OnCall = false WHERE DoctorID = 2;
-- CONFLICT! T2 will be aborted
-- Must retry with new snapshot
```

### Serialization Failure Handling

```sql
-- PostgreSQL: Be prepared for serialization failures
DO $$
DECLARE
    retry_count INT := 0;
BEGIN
    LOOP
        BEGIN
            -- Transaction logic here
            PERFORM do_critical_operation();
            RETURN;
        EXCEPTION
            WHEN serialization_failure THEN
                retry_count := retry_count + 1;
                IF retry_count >= 3 THEN
                    RAISE;  -- Give up after 3 retries
                END IF;
                -- Will retry with new snapshot
        END;
    END LOOP;
END $$;
```

## Choosing Isolation Levels

### Decision Framework

```
Question 1: Can you tolerate dirty reads?
  Yes → READ UNCOMMITTED (rare)
  No → Continue

Question 2: Can same query return different values?
  Yes → READ COMMITTED (default, usually fine)
  No → Continue

Question 3: Can new rows appear in range queries?
  Yes → REPEATABLE READ
  No → SERIALIZABLE
```

### By Use Case

```
OLTP (Web applications):
- Default: READ COMMITTED
- Money transfers: SERIALIZABLE or explicit locking

Reporting:
- READ COMMITTED usually sufficient
- Long reports: Consider REPEATABLE READ for consistency

Batch processing:
- READ COMMITTED with optimistic locking
- Retry logic for conflicts

Critical operations:
- SERIALIZABLE when correctness essential
- Accept higher abort rate
```

### Performance Comparison

```
Level              | Read Perf | Write Perf | Concurrency | Correctness
-------------------|-----------|------------|-------------|------------
READ UNCOMMITTED   | Highest   | High       | Highest     | Lowest
READ COMMITTED     | High      | High       | High        | Good
REPEATABLE READ    | Medium    | Medium     | Medium      | Better
SERIALIZABLE       | Lower     | Lower      | Lowest      | Highest
```

## Database-Specific Behaviors

### PostgreSQL

```sql
-- Only three levels (READ UNCOMMITTED = READ COMMITTED)
-- Uses MVCC for all levels
-- SERIALIZABLE uses SSI (abort-based, not blocking)

-- Check current level
SHOW default_transaction_isolation;

-- Session level
SET SESSION CHARACTERISTICS AS TRANSACTION ISOLATION LEVEL SERIALIZABLE;

-- Transaction level
BEGIN ISOLATION LEVEL REPEATABLE READ;
```

### MySQL/InnoDB

```sql
-- All four levels supported
-- Uses locking (not pure MVCC)
-- REPEATABLE READ prevents phantoms via gap locks

-- Check current level
SELECT @@transaction_isolation;

-- Set globally
SET GLOBAL transaction_isolation = 'SERIALIZABLE';

-- Set for session
SET SESSION transaction_isolation = 'READ-COMMITTED';
```

### SQL Server

```sql
-- All four levels plus SNAPSHOT
-- READ COMMITTED can use row versioning

-- Enable snapshot isolation for database
ALTER DATABASE MyDB SET ALLOW_SNAPSHOT_ISOLATION ON;
ALTER DATABASE MyDB SET READ_COMMITTED_SNAPSHOT ON;

-- Use snapshot
SET TRANSACTION ISOLATION LEVEL SNAPSHOT;
```

## Isolation Level Summary

```
READ UNCOMMITTED:
  Sees: All data including uncommitted
  Use: Rarely, only for approximations

READ COMMITTED:
  Sees: Only committed data
  Use: Default for most applications

REPEATABLE READ:
  Sees: Consistent snapshot of read rows
  Use: When same-row consistency needed

SERIALIZABLE:
  Sees: Consistent snapshot, prevents all anomalies
  Use: Critical correctness requirements
```

