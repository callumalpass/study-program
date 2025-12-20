---
id: cs205-t5-recovery
title: "Transaction Recovery"
order: 6
---

# Transaction Recovery and Logging

Database recovery mechanisms ensure durability and consistency even when systems fail. Understanding how databases use logging and checkpointing to recover from crashes is essential for database administrators and developers who need to ensure data reliability. This guide covers the principles and techniques that make transaction recovery possible.

## The Recovery Problem

Databases face several failure scenarios:

### Types of Failures

**Transaction Failures**:
- Logical errors (division by zero, constraint violation)
- Deadlock detection and victim selection
- Application-initiated rollback

**System Failures**:
- Operating system crash
- Power failure
- Hardware malfunction
- Database process termination

**Media Failures**:
- Disk corruption or crash
- Storage system failure
- Physical damage to storage devices

### Recovery Requirements

The recovery system must ensure:
1. **Atomicity**: Uncommitted transactions are completely undone
2. **Durability**: Committed transactions persist despite failures
3. **Consistency**: Database returns to a consistent state after recovery

## Write-Ahead Logging (WAL)

The foundation of most recovery systems is Write-Ahead Logging.

### WAL Protocol

The WAL rule states: **Before modifying any data page on disk, the log record describing the change must be written to stable storage.**

```
Transaction Execution:
1. Begin transaction
2. Write log record: <START T1>
3. For each modification:
   a. Write log record: <T1, PageID, Offset, OldValue, NewValue>
   b. Modify data in buffer pool (not yet on disk)
4. When ready to commit:
   a. Write log record: <COMMIT T1>
   b. Flush log to disk (force log)
   c. Transaction is now durable
5. Later: Modified data pages written to disk (at any time)
```

### Log Record Types

A typical log contains several record types:

```
<START T1>                           -- Transaction start
<T1, Orders, 5, Offset=100, Old=50, New=75>  -- Data modification
<COMMIT T1>                          -- Transaction committed
<ABORT T1>                           -- Transaction aborted
<CHECKPOINT>                         -- System checkpoint
<END T1>                             -- Transaction completely done
```

### Log Structure

```
LSN | TransID | Type     | PageID | Offset | Before | After | PrevLSN
----+----------|----------|--------|--------|--------|-------|--------
101 | T1       | START    | -      | -      | -      | -     | -
102 | T1       | UPDATE   | P5     | 100    | 50     | 75    | 101
103 | T2       | START    | -      | -      | -      | -     | -
104 | T2       | UPDATE   | P3     | 200    | 'ABC'  | 'XYZ' | 103
105 | T1       | COMMIT   | -      | -      | -      | -     | 102
106 | T2       | UPDATE   | P7     | 50     | 100    | 150   | 104
--- CRASH OCCURS HERE ---
```

## ARIES Recovery Algorithm

ARIES (Algorithms for Recovery and Isolation Exploiting Semantics) is the most widely used recovery algorithm.

### ARIES Principles

1. **Write-Ahead Logging**: Log before data modification
2. **Repeating History During Redo**: Reconstruct state at crash
3. **Logging Changes During Undo**: Log compensation records

### Three-Phase Recovery

**Phase 1: Analysis**
Scan log from last checkpoint to end:
- Identify active transactions at crash (to undo)
- Identify dirty pages (to redo)
- Build transaction table and dirty page table

```
Analysis Phase:
- Start from checkpoint record
- Read forward through log
- Track active transactions
- Track dirty pages
Result:
- List of transactions to undo
- List of pages potentially needing redo
```

**Phase 2: Redo**
Repeat history from earliest dirty page LSN:
- Reapply all changes (committed and uncommitted)
- Restore database to exact state at crash

```
Redo Phase:
For each log record from RedoLSN to end:
  If record is UPDATE:
    If page LSN < record LSN:  -- Page doesn't have this change
      Reapply the change
      Update page LSN
```

**Phase 3: Undo**
Roll back uncommitted transactions:
- Process undo list in reverse order
- Write Compensation Log Records (CLRs)

```
Undo Phase:
While undo list is not empty:
  Find record with highest LSN in undo list
  If it's an UPDATE:
    Generate CLR (compensation log record)
    Undo the change
    Write CLR to log
  If it's a START:
    Write ABORT record
    Remove transaction from undo list
```

## Checkpointing

Checkpoints reduce recovery time by recording a consistent state.

### Checkpoint Types

**Sharp (Quiescent) Checkpoint**:
1. Stop accepting new transactions
2. Wait for active transactions to complete
3. Flush all dirty pages to disk
4. Write checkpoint record
5. Resume normal operation

**Fuzzy Checkpoint** (used in practice):
1. Don't stop transaction processing
2. Write BEGIN_CHECKPOINT record
3. Record dirty page table and transaction table
4. Write END_CHECKPOINT record
5. Continue normal operation

```sql
-- PostgreSQL: Force checkpoint
CHECKPOINT;

-- MySQL: Similar concept with flush
FLUSH TABLES WITH READ LOCK;
```

### Checkpoint Frequency

Trade-off considerations:
- **Frequent checkpoints**: Shorter recovery time, but more I/O overhead
- **Infrequent checkpoints**: Less overhead, but longer recovery time

Typical policy: Checkpoint every N minutes or after M megabytes of log generated.

## Recovery Implementation Details

### Buffer Pool Management

The buffer pool manager coordinates with recovery:

```
Page States:
- Clean: Same as on disk
- Dirty: Modified in memory, not yet on disk
- Pinned: Cannot be evicted (in use by transaction)

Page Header Information:
- PageLSN: LSN of last log record that modified this page
- RecLSN: LSN of first change after last write to disk
```

### Force and Steal Policies

**Force Policy**: Write dirty pages at commit
- Simplifies recovery (committed = on disk)
- Hurts performance (every commit writes all pages)

**No-Force Policy** (common): Defer writes
- Better performance
- Requires redo during recovery

**Steal Policy**: Allow uncommitted pages to disk
- Better buffer pool utilization
- Requires undo during recovery

**No-Steal Policy**: Keep uncommitted pages in memory
- Simplifies recovery
- May limit transaction size

Most systems use **No-Force + Steal** with WAL.

### Log Buffer Management

```
Log Buffer Operation:
1. Transaction writes log record to log buffer
2. Log records accumulate in memory
3. Force log buffer to disk when:
   - Transaction commits (must force)
   - Log buffer fills up
   - Periodic flush timer
   - Checkpoint requested
```

## Compensation Log Records (CLRs)

CLRs record undo actions, enabling crash recovery during recovery:

```
Original Log:
<T1, UPDATE, P5, 100, 50, 75>  -- Changed 50 to 75

CLR (during undo):
<CLR, T1, P5, 100, 75, 50, UndoNextLSN=100>  -- Undoing: 75 back to 50
```

CLR structure:
- Indicates this is an undo operation
- Points to the previous log record (UndoNextLSN)
- CLRs themselves are never undone

## Distributed Recovery

In distributed databases, recovery coordinates across nodes:

### Two-Phase Commit Recovery

If coordinator crashes during 2PC:
1. Recovery reads coordinator log
2. Find in-doubt transactions
3. Consult participants for status
4. Complete or abort as appropriate

If participant crashes:
1. Recovery reads participant log
2. For each in-doubt transaction, ask coordinator
3. Apply coordinator's decision

### Global Recovery Protocol

```
1. Each node performs local recovery (ARIES)
2. Coordinator requests status of distributed transactions
3. Participants report PREPARED or ABORTED
4. Coordinator makes final decision
5. Participants complete commit or abort
```

## Performance Optimization

### Group Commit

Batch multiple commits to reduce I/O:

```
Without Group Commit:
  T1 commit → flush log → return
  T2 commit → flush log → return
  T3 commit → flush log → return
  3 disk writes

With Group Commit:
  T1 commit → queue
  T2 commit → queue
  T3 commit → queue
  Periodic: flush all → return
  1 disk write
```

### Log Compression

Reduce log size for better performance:
- Dictionary encoding for repeated values
- Run-length encoding for sequential updates
- Not storing unchanged columns

### Asynchronous Checkpointing

Spread checkpoint I/O over time:
- Write dirty pages gradually between checkpoints
- Less I/O spike during checkpoint
- Maintains recovery time benefits

## Monitoring and Tuning

### Key Metrics

```sql
-- PostgreSQL: Check WAL location
SELECT pg_current_wal_lsn();

-- Check for long-running transactions (block checkpoint progress)
SELECT pid, age(now(), xact_start), query
FROM pg_stat_activity
WHERE xact_start IS NOT NULL
ORDER BY xact_start;

-- WAL file count
SELECT count(*) FROM pg_ls_waldir();
```

### Recovery Time Estimation

Recovery time depends on:
1. Time since last checkpoint (more log to process)
2. Number of dirty pages (more redo)
3. Number of uncommitted transactions (more undo)
4. Disk I/O speed

Formula approximation:
```
RecoveryTime ≈ (LogSize / DiskReadSpeed) +
               (DirtyPages × PageSize / DiskWriteSpeed) +
               (UndoOperations × AvgUndoTime)
```

Understanding transaction recovery ensures you can design systems that maintain data integrity through any failure scenario and tune recovery performance for your specific requirements.
