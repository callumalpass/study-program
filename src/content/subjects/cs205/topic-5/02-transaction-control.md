# Transaction Control

Transaction control statements allow explicit management of transaction boundaries and behavior. Mastering these commands is essential for database programming.

## Basic Transaction Commands

### BEGIN/START TRANSACTION

```sql
-- Standard SQL
START TRANSACTION;

-- Also common
BEGIN TRANSACTION;
BEGIN WORK;
BEGIN;  -- PostgreSQL shorthand

-- With options
START TRANSACTION READ ONLY;
START TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```

### COMMIT

```sql
-- Make all changes permanent
BEGIN;
    INSERT INTO Orders (CustomerID, Total) VALUES (1, 99.99);
    INSERT INTO OrderItems (OrderID, ProductID) VALUES (LASTVAL(), 5);
COMMIT;

-- Alternative syntax
COMMIT WORK;
COMMIT TRANSACTION;
```

### ROLLBACK

```sql
-- Undo all changes since BEGIN
BEGIN;
    DELETE FROM Orders WHERE OrderDate < '2020-01-01';
    -- Oops, wrong date!
ROLLBACK;

-- Data unchanged
```

## Savepoints

### Creating Savepoints

```sql
BEGIN;
    INSERT INTO Customers (Name) VALUES ('Alice');
    SAVEPOINT customer_added;

    INSERT INTO Orders (CustomerID) VALUES (LASTVAL());
    SAVEPOINT order_added;

    INSERT INTO OrderItems (OrderID, ProductID) VALUES (LASTVAL(), 999);
    -- Error: Product 999 doesn't exist

ROLLBACK TO SAVEPOINT order_added;
-- Customer and Order preserved, OrderItem rolled back

COMMIT;
```

### Savepoint Operations

```sql
-- Create savepoint
SAVEPOINT my_savepoint;

-- Roll back to savepoint (keeps savepoint)
ROLLBACK TO SAVEPOINT my_savepoint;

-- Release savepoint (delete it, keep changes)
RELEASE SAVEPOINT my_savepoint;

-- Nested savepoints
SAVEPOINT sp1;
    -- operations
    SAVEPOINT sp2;
        -- more operations
    ROLLBACK TO sp2;  -- Undo sp2 operations
    -- sp1 still exists
ROLLBACK TO sp1;  -- Undo everything since sp1
```

### Practical Savepoint Usage

```sql
-- Batch processing with error handling
BEGIN;
DECLARE @processed INT = 0;

FOR record IN SELECT * FROM StagingData LOOP
    SAVEPOINT before_record;

    BEGIN
        INSERT INTO TargetTable ...;
        @processed = @processed + 1;
    EXCEPTION WHEN OTHERS THEN
        ROLLBACK TO SAVEPOINT before_record;
        INSERT INTO ErrorLog (RecordID, Error) VALUES (...);
    END;
END LOOP;

COMMIT;
-- Valid records committed, errors logged
```

## Autocommit Mode

### Understanding Autocommit

```sql
-- Default behavior in many systems: each statement is a transaction
INSERT INTO Log (Message) VALUES ('Entry 1');  -- Auto-committed
INSERT INTO Log (Message) VALUES ('Entry 2');  -- Auto-committed

-- Explicit transaction disables autocommit temporarily
BEGIN;
    INSERT INTO Log (Message) VALUES ('Entry 3');
    INSERT INTO Log (Message) VALUES ('Entry 4');
COMMIT;  -- Both committed together
```

### Controlling Autocommit

```sql
-- MySQL
SET autocommit = 0;  -- Disable (must explicit COMMIT)
SET autocommit = 1;  -- Enable (default)

-- PostgreSQL (session level)
-- Autocommit is always on; use BEGIN/COMMIT for explicit transactions

-- SQL Server
SET IMPLICIT_TRANSACTIONS ON;   -- Disable autocommit
SET IMPLICIT_TRANSACTIONS OFF;  -- Enable autocommit
```

### Best Practices

```sql
-- Prefer explicit transactions for multi-statement operations

-- Bad: Relies on autocommit
UPDATE Inventory SET Quantity = Quantity - 1 WHERE ProductID = 1;
INSERT INTO OrderItems (ProductID, Quantity) VALUES (1, 1);
-- If second fails, inventory already decremented!

-- Good: Explicit transaction
BEGIN;
    UPDATE Inventory SET Quantity = Quantity - 1 WHERE ProductID = 1;
    INSERT INTO OrderItems (ProductID, Quantity) VALUES (1, 1);
COMMIT;
-- Both succeed or both fail
```

## Transaction Modes

### Read-Only Transactions

```sql
-- Declare transaction will only read
START TRANSACTION READ ONLY;

SELECT * FROM Accounts;
SELECT * FROM Transactions;

-- Cannot modify:
-- UPDATE Accounts SET Balance = 0;  -- Error!

COMMIT;

-- Benefits:
-- - Can run on read replicas
-- - No write locks needed
-- - May get optimized execution
```

### Read-Write Transactions

```sql
-- Default mode: can both read and write
START TRANSACTION READ WRITE;

SELECT Balance FROM Accounts WHERE ID = 1;
UPDATE Accounts SET Balance = Balance - 100 WHERE ID = 1;

COMMIT;
```

### Deferrable Transactions

```sql
-- PostgreSQL: Delay start until safe snapshot available
START TRANSACTION ISOLATION LEVEL SERIALIZABLE READ ONLY DEFERRABLE;

-- May wait before starting, but:
-- - Guaranteed not to be rolled back due to serialization conflicts
-- - Good for long-running reports
```

## Error Handling

### Try-Catch Pattern (SQL Server)

```sql
BEGIN TRY
    BEGIN TRANSACTION;

    UPDATE Accounts SET Balance = Balance - 100 WHERE ID = 1;

    IF @@ROWCOUNT = 0
        THROW 50001, 'Account not found', 1;

    UPDATE Accounts SET Balance = Balance + 100 WHERE ID = 2;

    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK TRANSACTION;

    INSERT INTO ErrorLog (ErrorMessage, ErrorTime)
    VALUES (ERROR_MESSAGE(), GETDATE());

    THROW;  -- Re-raise the error
END CATCH;
```

### Exception Handling (PostgreSQL)

```sql
DO $$
BEGIN
    BEGIN
        INSERT INTO Accounts (ID, Balance) VALUES (1, 1000);
    EXCEPTION
        WHEN unique_violation THEN
            RAISE NOTICE 'Account already exists';
        WHEN check_violation THEN
            RAISE NOTICE 'Invalid balance';
        WHEN OTHERS THEN
            RAISE NOTICE 'Error: %', SQLERRM;
    END;
END $$;
```

### Transaction State Checking

```sql
-- SQL Server
SELECT @@TRANCOUNT;  -- Number of active transactions
SELECT XACT_STATE();  -- -1=uncommittable, 0=none, 1=active

-- PostgreSQL
SELECT txid_current();  -- Current transaction ID
-- Can use in application code to check if in transaction

-- MySQL
SELECT @@autocommit;
SELECT CONNECTION_ID();
```

## Nested Transactions

### Simulated Nesting with Savepoints

```sql
-- Most databases don't support true nested transactions
-- Use savepoints instead

CREATE PROCEDURE ProcessOrder(OrderID INT)
AS
BEGIN
    -- Outer transaction must exist
    SAVEPOINT order_processing;

    BEGIN TRY
        -- Process order items
        EXEC ProcessOrderItems @OrderID;

        -- Update inventory
        EXEC UpdateInventory @OrderID;

        -- All succeeded
    END TRY
    BEGIN CATCH
        ROLLBACK TO SAVEPOINT order_processing;
        THROW;
    END CATCH;
END;
```

### Transaction Counting

```sql
-- SQL Server tracks nesting level
BEGIN TRANSACTION;  -- @@TRANCOUNT = 1
    BEGIN TRANSACTION;  -- @@TRANCOUNT = 2
        BEGIN TRANSACTION;  -- @@TRANCOUNT = 3
        COMMIT;  -- @@TRANCOUNT = 2
    COMMIT;  -- @@TRANCOUNT = 1
COMMIT;  -- @@TRANCOUNT = 0, actually commits

-- Important: Only final COMMIT actually commits
-- Any ROLLBACK rolls back everything
```

## Distributed Transactions

### Two-Phase Commit (2PC)

```
Phase 1: Prepare
  Coordinator → All participants: "Prepare to commit"
  Each participant: Log changes, respond "Ready" or "Abort"

Phase 2: Commit/Abort
  If all Ready:
    Coordinator → All: "Commit"
  Else:
    Coordinator → All: "Abort"
```

### XA Transactions

```sql
-- SQL syntax varies by database

-- Start XA transaction
XA START 'transaction_id';

-- Execute statements
UPDATE Accounts SET Balance = Balance - 100 WHERE ID = 1;

-- End (prepare for 2PC)
XA END 'transaction_id';

-- Prepare
XA PREPARE 'transaction_id';

-- Commit (after all participants prepared)
XA COMMIT 'transaction_id';
```

### Linked Server Transactions (SQL Server)

```sql
-- Distributed transaction across linked servers
BEGIN DISTRIBUTED TRANSACTION;

UPDATE LocalDB.dbo.Accounts SET Balance = Balance - 100 WHERE ID = 1;
UPDATE RemoteServer.RemoteDB.dbo.Accounts SET Balance = Balance + 100 WHERE ID = 1;

COMMIT;
-- Uses MS DTC (Distributed Transaction Coordinator)
```

## Transaction Best Practices

### Keep Transactions Short

```sql
-- Bad: Long-running transaction holds locks
BEGIN;
SELECT * FROM LargeTable;  -- Takes 10 minutes
-- Other transactions blocked for 10 minutes!
COMMIT;

-- Better: Batch processing
FOR batch IN SELECT * FROM LargeTable LIMIT 1000 OFFSET @offset LOOP
    BEGIN;
    PROCESS(batch);
    COMMIT;
END LOOP;
```

### Avoid User Interaction

```sql
-- Bad: Waiting for user during transaction
BEGIN;
SELECT * FROM Orders WHERE ID = 1 FOR UPDATE;
-- Wait for user to review... (seconds/minutes)
-- All other access to this row blocked!
UPDATE Orders SET Status = 'Approved' WHERE ID = 1;
COMMIT;

-- Better: Optimistic locking
SELECT *, Version FROM Orders WHERE ID = 1;
-- User reviews (no locks held)
UPDATE Orders SET Status = 'Approved', Version = Version + 1
WHERE ID = 1 AND Version = @original_version;
IF @@ROWCOUNT = 0 THEN
    -- Concurrent modification detected
END IF;
```

### Consistent Ordering

```sql
-- Prevent deadlocks with consistent lock order

-- Bad: T1 locks A then B; T2 locks B then A → deadlock
-- T1: UPDATE A; UPDATE B;
-- T2: UPDATE B; UPDATE A;

-- Good: Always lock in same order (alphabetical, by ID, etc.)
-- T1: UPDATE A; UPDATE B;
-- T2: UPDATE A; UPDATE B;
```

