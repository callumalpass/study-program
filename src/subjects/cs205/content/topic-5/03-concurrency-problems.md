# Concurrency Problems

When multiple transactions execute simultaneously, various anomalies can occur without proper concurrency control. Understanding these problems is crucial for designing correct database applications.

## Lost Update Problem

### Description

Two transactions read the same value and then update it based on the read value, causing one update to be lost.

### Example

```
Initial: Account.Balance = 1000

Time  T1 (Withdraw $200)      T2 (Withdraw $300)
----  ------------------      ------------------
t1    Read Balance → 1000
t2                            Read Balance → 1000
t3    Balance = 1000 - 200
t4    Write Balance = 800
t5                            Balance = 1000 - 300
t6                            Write Balance = 700

Final: Balance = 700 (should be 500!)
T1's update is lost
```

### Solutions

```sql
-- 1. Use atomic UPDATE
UPDATE Accounts SET Balance = Balance - 200 WHERE ID = 1;
-- Database handles read-modify-write atomically

-- 2. SELECT FOR UPDATE (pessimistic locking)
BEGIN;
SELECT Balance FROM Accounts WHERE ID = 1 FOR UPDATE;
-- Row locked, other transactions wait
UPDATE Accounts SET Balance = Balance - 200 WHERE ID = 1;
COMMIT;

-- 3. Optimistic locking with version
UPDATE Accounts
SET Balance = @newBalance, Version = Version + 1
WHERE ID = 1 AND Version = @originalVersion;
-- Check @@ROWCOUNT to detect conflict
```

## Dirty Read

### Description

A transaction reads data written by another transaction that has not yet committed.

### Example

```
Time  T1 (Transfer)           T2 (Check Balance)
----  ---------------         ------------------
t1    Begin
t2    Update A: 1000→900
t3                            Begin
t4                            Read A → 900 (uncommitted!)
t5    Update B: 500→600
t6    Rollback!
t7                            Read B → 500
t8                            Sum = 1400 (should be 1500)

T2 read T1's uncommitted (rolled back) value
```

### Prevention

```sql
-- Use READ COMMITTED or higher isolation level
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- With READ COMMITTED:
-- T2's read at t4 would either:
-- - Wait for T1 to commit/rollback, OR
-- - Read the committed value (1000)
```

### Impact

```
Dirty reads cause:
- Incorrect calculations based on phantom data
- Decisions made on data that never existed
- Reports showing impossible states

Acceptable only when:
- Speed >> accuracy (rare)
- Approximate results OK
- Data is append-only (no rollbacks)
```

## Non-Repeatable Read

### Description

A transaction reads the same row twice and gets different values because another transaction modified it between reads.

### Example

```
Time  T1 (Calculate Bonus)    T2 (Update Salary)
----  --------------------    ------------------
t1    Begin
t2    Select Salary → 50000
t3                            Begin
t4                            Update Salary = 60000
t5                            Commit
t6    Select Salary → 60000
t7    -- Different value!
t8    -- Bonus calculation inconsistent

T1 sees different values in same transaction
```

### Variations

```
-- Read Skew (special case)
Time  T1 (Read A and B)       T2 (Transfer A→B)
----  -----------------       ----------------
t1    Read A → 500
t2                            Update A = 400
t3                            Update B = 600
t4                            Commit
t5    Read B → 600
t6    -- Sum = 1100 (inconsistent snapshot)
```

### Prevention

```sql
-- Use REPEATABLE READ or higher
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

-- T1's reads will see consistent snapshot:
-- Either both pre-update or both post-update values
```

## Phantom Read

### Description

A transaction executes a query twice and gets different sets of rows because another transaction inserted or deleted rows.

### Example

```
Time  T1 (Count Pending)      T2 (Create Order)
----  ------------------      ----------------
t1    Begin
t2    Select Count(*) WHERE
      Status='Pending' → 10
t3                            Begin
t4                            Insert Order (Pending)
t5                            Commit
t6    Select Count(*) WHERE
      Status='Pending' → 11
t7    -- New row appeared!

A "phantom" row appeared between queries
```

### Phantom vs Non-Repeatable

```
Non-Repeatable Read:
- Same row, different value
- T1: SELECT * WHERE ID=1 → (1, 'A')
- T2: UPDATE SET Val='B' WHERE ID=1
- T1: SELECT * WHERE ID=1 → (1, 'B')

Phantom Read:
- Same query, different rows
- T1: SELECT * WHERE Category='X' → 5 rows
- T2: INSERT INTO (Category='X')
- T1: SELECT * WHERE Category='X' → 6 rows
```

### Prevention

```sql
-- Use SERIALIZABLE isolation
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

-- Or use explicit range locking
SELECT * FROM Orders
WHERE Status = 'Pending'
FOR UPDATE;  -- Locks range, prevents inserts
```

## Write Skew

### Description

Two transactions read overlapping data, make disjoint updates based on what they read, and create an inconsistent state.

### Example

```
Constraint: At least one doctor must be on call
Initial: Alice=OnCall, Bob=OnCall

Time  T1 (Alice off)          T2 (Bob off)
----  --------------          ------------
t1    Select * OnCall → 2
t2                            Select * OnCall → 2
t3    -- "2 on call, I can
      -- leave"
t4                            -- "2 on call, I can
                              -- leave"
t5    Update Alice = Off
t6                            Update Bob = Off
t7    Commit
t8                            Commit

Final: Both off! Constraint violated.
Neither transaction violated constraint individually.
```

### Prevention

```sql
-- 1. SERIALIZABLE isolation
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

-- 2. Explicit locking
SELECT * FROM DoctorSchedule WHERE OnCall = true FOR UPDATE;
-- Now T2 would wait for T1

-- 3. Database constraint
ALTER TABLE DoctorSchedule ADD CONSTRAINT min_oncall
CHECK (
    (SELECT COUNT(*) FROM DoctorSchedule WHERE OnCall = true) >= 1
);
```

## Read-Only Transaction Anomalies

### Snapshot Isolation Anomaly

```
Batch constraint: Sum of X and Y must remain constant

Initial: X=0, Y=0

T1: Write X=20
T2: Write Y=-10, X=X+10  (maintains invariant)
T3 (read-only): Read X, then Y

Execution order:
T1 starts, writes X=20, commits
T3 starts (snapshot at X=20, Y=0)
T2 starts, writes Y=-10, X=30, commits
T3 reads X=20, Y=0

T3 sees: X=20, Y=0 (Sum=20)
But invariant says Sum should be 0 or 10!

T3 saw T1's effect but not T2's related update.
```

### Prevention

```sql
-- Use SERIALIZABLE for read-only transactions too
START TRANSACTION ISOLATION LEVEL SERIALIZABLE READ ONLY;
```

## Summary of Anomalies

### Anomaly Matrix

```
Anomaly              | Cause               | Solution
---------------------|---------------------|--------------------
Lost Update          | Concurrent RMW      | Atomic ops, FOR UPDATE
Dirty Read           | Read uncommitted    | READ COMMITTED+
Non-Repeatable Read  | Concurrent update   | REPEATABLE READ+
Phantom Read         | Concurrent insert   | SERIALIZABLE
Write Skew           | Disjoint updates    | SERIALIZABLE, locks
```

### Isolation Level Coverage

```
Level            | Dirty | Non-Rep | Phantom | Write Skew
-----------------|-------|---------|---------|------------
READ UNCOMMITTED | No    | No      | No      | No
READ COMMITTED   | Yes   | No      | No      | No
REPEATABLE READ  | Yes   | Yes     | No*     | No
SERIALIZABLE     | Yes   | Yes     | Yes     | Yes

* MySQL's REPEATABLE READ prevents phantoms via gap locking
```

## Detecting Concurrency Issues

### Application-Level Detection

```python
# Optimistic locking pattern
def update_balance(account_id, amount):
    # Read current version
    row = db.query("SELECT balance, version FROM accounts WHERE id = ?",
                   account_id)

    new_balance = row.balance + amount

    # Try update with version check
    result = db.execute("""
        UPDATE accounts
        SET balance = ?, version = version + 1
        WHERE id = ? AND version = ?
    """, new_balance, account_id, row.version)

    if result.rows_affected == 0:
        raise ConcurrencyError("Account modified by another transaction")
```

### Database Monitoring

```sql
-- PostgreSQL: View locks
SELECT * FROM pg_locks WHERE NOT granted;

-- MySQL: View lock waits
SELECT * FROM information_schema.innodb_lock_waits;

-- SQL Server: Check for blocking
SELECT * FROM sys.dm_exec_requests WHERE blocking_session_id <> 0;
```

### Testing for Anomalies

```python
# Test for lost update
def test_lost_update():
    # Start with known value
    db.execute("UPDATE counter SET value = 0")

    # Run concurrent increments
    threads = [Thread(target=increment) for _ in range(100)]
    for t in threads: t.start()
    for t in threads: t.join()

    # Value should be 100 if no lost updates
    result = db.query("SELECT value FROM counter")
    assert result.value == 100
```

