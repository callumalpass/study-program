---
id: cs205-t5-acid
title: "ACID Properties"
order: 1
---

# ACID Properties

ACID properties define the fundamental guarantees that database transactions must provide. Understanding these properties is essential for building reliable data systems.

## What is a Transaction?

### Definition

A transaction is a logical unit of work that comprises one or more database operations executed as a single, indivisible unit.

```sql
-- Example transaction: Transfer money between accounts
BEGIN TRANSACTION;
    UPDATE Accounts SET Balance = Balance - 100 WHERE AccountID = 1;
    UPDATE Accounts SET Balance = Balance + 100 WHERE AccountID = 2;
COMMIT;

-- Either both updates succeed, or neither does
```

### Transaction States

```
           Active
             ↓
    ↙        ↓        ↘
Partially  Failed   Aborted
Committed    ↓         ↑
    ↓        ↓         |
    ↓      Aborted ----+
    ↓
 Committed
```

## Atomicity

### Definition

A transaction is an atomic unit of processing—it is either performed entirely or not at all.

### The "All or Nothing" Guarantee

```
Transaction: Transfer $500 from Account A to Account B

Operations:
1. Read balance of A
2. Subtract $500 from A
3. Write new balance to A
4. Read balance of B
5. Add $500 to B
6. Write new balance to B

Atomicity ensures:
- If step 3 succeeds but step 6 fails → rollback step 3
- Never have money "disappear" or "duplicate"
```

### Implementation: Write-Ahead Logging (WAL)

```
Basic WAL Protocol:
1. Before modifying data, write to log
2. Log record includes: old value, new value, transaction ID
3. On commit: flush log to disk
4. On crash: use log to undo incomplete transactions

Log Example:
[T1, Start]
[T1, Accounts, ID=1, Balance, Old=1000, New=500]
[T1, Accounts, ID=2, Balance, Old=500, New=1000]
[T1, Commit]
```

### Rollback Mechanism

```sql
BEGIN TRANSACTION;
    UPDATE Accounts SET Balance = Balance - 100 WHERE AccountID = 1;

    -- Check constraint violated
    IF (SELECT Balance FROM Accounts WHERE AccountID = 1) < 0 THEN
        ROLLBACK;  -- Undo the update
    ELSE
        UPDATE Accounts SET Balance = Balance + 100 WHERE AccountID = 2;
        COMMIT;
    END IF;
```

## Consistency

### Definition

A transaction must transform the database from one consistent state to another consistent state.

### Consistency Constraints

```sql
-- Database constraints that must hold:

-- 1. Entity integrity
PRIMARY KEY (AccountID)

-- 2. Referential integrity
FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)

-- 3. Domain constraints
Balance DECIMAL(10,2) CHECK (Balance >= 0)

-- 4. Business rules
-- Total money in system must remain constant (for transfers)
```

### Application-Level Consistency

```
Transaction: Place an order

Consistency rules:
1. Product must exist in inventory
2. Quantity available must be sufficient
3. Customer must be active
4. Order total must match items × prices

-- Application must verify before commit:
IF available_quantity >= ordered_quantity
   AND customer_status = 'Active'
   AND calculated_total = sum(items × prices)
THEN
   COMMIT
ELSE
   ROLLBACK
```

### Consistency vs Constraints

```
Database-level (automatic):
- Primary key uniqueness
- Foreign key references
- CHECK constraints
- NOT NULL

Application-level (programmer responsibility):
- Business logic rules
- Cross-table invariants
- Complex validations
```

## Isolation

### Definition

Each transaction should execute as if it were the only transaction in the system, unaware of other concurrent transactions.

### Concurrency Problems (Without Isolation)

```
Dirty Read:
T1: UPDATE Accounts SET Balance = 500 WHERE ID = 1;
T2: SELECT Balance FROM Accounts WHERE ID = 1;  -- Sees 500
T1: ROLLBACK;  -- Balance returns to original
T2: -- Used invalid value 500!

Non-Repeatable Read:
T1: SELECT Balance FROM Accounts WHERE ID = 1;  -- Gets 1000
T2: UPDATE Accounts SET Balance = 500 WHERE ID = 1; COMMIT;
T1: SELECT Balance FROM Accounts WHERE ID = 1;  -- Gets 500!
    -- Different value in same transaction

Phantom Read:
T1: SELECT COUNT(*) FROM Orders WHERE Status = 'Pending';  -- Gets 10
T2: INSERT INTO Orders (Status) VALUES ('Pending'); COMMIT;
T1: SELECT COUNT(*) FROM Orders WHERE Status = 'Pending';  -- Gets 11!
    -- New row appeared
```

### Serializability

```
Goal: Concurrent execution should be equivalent to some serial execution

Serial Schedule S1:    Serial Schedule S2:
T1 complete           T2 complete
then T2 complete      then T1 complete

Serializable schedule: Any concurrent execution that produces
the same result as S1 or S2
```

### Isolation Levels

```
Level               | Dirty Read | Non-Repeatable | Phantom
--------------------|------------|----------------|--------
READ UNCOMMITTED    | Possible   | Possible       | Possible
READ COMMITTED      | No         | Possible       | Possible
REPEATABLE READ     | No         | No             | Possible
SERIALIZABLE        | No         | No             | No
```

## Durability

### Definition

Once a transaction is committed, its effects are permanent and survive any subsequent system failures.

### Implementation Mechanisms

```
1. Write-Ahead Logging (WAL)
   - Log committed changes before confirming
   - On crash: replay log to restore committed state

2. Checkpointing
   - Periodically write all dirty pages to disk
   - Reduces recovery time

3. Redundancy
   - RAID storage
   - Replication to multiple nodes
```

### Recovery Process

```
After system crash:

1. Read transaction log
2. Identify:
   - Committed transactions not yet written to disk → REDO
   - Uncommitted transactions partially written → UNDO

REDO: Apply changes from committed transactions
UNDO: Reverse changes from uncommitted transactions

Result: Database in last consistent, committed state
```

### Durability vs Performance

```
Trade-off: Synchronous vs Asynchronous commit

Synchronous (safer):
- Wait for disk write confirmation
- Guaranteed durability
- Slower commits

Asynchronous (faster):
- Confirm commit before disk write
- Risk: lose recent commits on crash
- Much faster

PostgreSQL setting:
synchronous_commit = on   -- Safe, slower
synchronous_commit = off  -- Fast, small risk window
```

## ACID in Practice

### Checking Transaction Support

```sql
-- MySQL: Check storage engine (InnoDB supports ACID)
SHOW TABLE STATUS WHERE Name = 'accounts';

-- PostgreSQL: Always ACID compliant

-- SQLite: ACID with default settings
PRAGMA journal_mode;  -- Should be 'delete' or 'wal'
```

### Testing Atomicity

```sql
-- Deliberately cause failure to verify rollback
BEGIN TRANSACTION;
    UPDATE Accounts SET Balance = Balance - 100 WHERE ID = 1;
    UPDATE Accounts SET Balance = Balance + 100 WHERE ID = 999;  -- Non-existent
    -- Error occurs
COMMIT;

-- Verify first update was rolled back
SELECT Balance FROM Accounts WHERE ID = 1;  -- Should be unchanged
```

### Testing Durability

```
1. Start transaction
2. Commit
3. Kill database process immediately
4. Restart database
5. Verify committed data is present
```

## ACID Limitations

### Performance Cost

```
Full ACID compliance requires:
- Logging overhead
- Lock management
- Disk synchronization
- Buffer management

Trade-off spectrum:
High ACID ←→ High Performance

NoSQL databases often relax ACID for:
- Eventual consistency
- Higher throughput
- Better scalability
```

### BASE Alternative

```
For distributed systems, BASE model:

Basically Available:
- System always responds (possibly stale data)

Soft state:
- State may change without input (due to propagation)

Eventually consistent:
- Given time, all replicas converge

Use when:
- Availability > Consistency
- Scale is massive
- Temporary inconsistency acceptable
```

### CAP Theorem Context

```
Distributed systems can guarantee at most 2 of 3:
- Consistency
- Availability
- Partition tolerance

ACID databases prioritize Consistency
BASE systems prioritize Availability
```

