import { CodingExercise } from '../../../../core/types';

export const cs205Topic5Exercises: CodingExercise[] = [
  {
    id: 'cs205-ex-5-1',
    subjectId: 'cs205',
    topicId: 'cs205-5',
    title: 'Basic Transaction',
    description: 'Write a transaction that transfers $100 from account 1 to account 2.',
    difficulty: 1,
    language: 'sql',
    starterCode: '-- Money transfer transaction\n',
    solution: 'BEGIN TRANSACTION;\n\nUPDATE Accounts SET Balance = Balance - 100 WHERE AccountID = 1;\nUPDATE Accounts SET Balance = Balance + 100 WHERE AccountID = 2;\n\nCOMMIT;',
    testCases: [
      { input: 'transaction', expectedOutput: 'Both updates or neither', isHidden: false, description: 'Atomic transfer' }
    ],
    hints: ['Use BEGIN and COMMIT.', 'Both updates should be in same transaction.']
  },
  {
    id: 'cs205-ex-5-2',
    subjectId: 'cs205',
    topicId: 'cs205-5',
    title: 'Conditional Rollback',
    description: 'Transfer money only if source account has sufficient balance, otherwise rollback.',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Transfer with balance check\n',
    solution: 'BEGIN TRANSACTION;\n\nDECLARE @balance DECIMAL(10,2);\nSELECT @balance = Balance FROM Accounts WHERE AccountID = 1;\n\nIF @balance >= 100\nBEGIN\n    UPDATE Accounts SET Balance = Balance - 100 WHERE AccountID = 1;\n    UPDATE Accounts SET Balance = Balance + 100 WHERE AccountID = 2;\n    COMMIT;\nEND\nELSE\nBEGIN\n    ROLLBACK;\n    RAISERROR(\'Insufficient funds\', 16, 1);\nEND',
    testCases: [
      { input: 'transaction', expectedOutput: 'Rollback if insufficient', isHidden: false, description: 'Conditional transaction' }
    ],
    hints: ['Check balance before transfer.', 'ROLLBACK undoes all changes.']
  },
  {
    id: 'cs205-ex-5-3',
    subjectId: 'cs205',
    topicId: 'cs205-5',
    title: 'Savepoint Usage',
    description: 'Create a transaction with savepoints to handle partial failures in order processing.',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Order processing with savepoints\n',
    solution: 'BEGIN TRANSACTION;\n\nINSERT INTO Orders (CustomerID, OrderDate) VALUES (1, CURRENT_DATE);\nSAVEPOINT order_created;\n\nBEGIN TRY\n    INSERT INTO OrderItems (OrderID, ProductID, Qty) VALUES (SCOPE_IDENTITY(), 1, 5);\n    INSERT INTO OrderItems (OrderID, ProductID, Qty) VALUES (SCOPE_IDENTITY(), 2, 3);\nEND TRY\nBEGIN CATCH\n    ROLLBACK TO SAVEPOINT order_created;\n    -- Log error, order still exists but no items\nEND CATCH\n\nCOMMIT;',
    testCases: [
      { input: 'transaction', expectedOutput: 'Partial rollback on error', isHidden: false, description: 'Savepoint handling' }
    ],
    hints: ['SAVEPOINT marks a point to return to.', 'ROLLBACK TO undoes to that point.']
  },
  {
    id: 'cs205-ex-5-4',
    subjectId: 'cs205',
    topicId: 'cs205-5',
    title: 'Identify Dirty Read',
    description: 'Given this schedule, identify which read is dirty:\nT1: Write(X=100); T2: Read(X); T1: Rollback;',
    difficulty: 1,
    language: 'sql',
    starterCode: '-- Dirty read analysis:\n-- ',
    solution: '-- Schedule:\n-- T1: Write(X=100)\n-- T2: Read(X) ← DIRTY READ!\n-- T1: Rollback\n\n-- T2 read X=100 which was never committed.\n-- After T1 rollback, X returns to original value.\n-- T2 used a value that "never existed" in consistent state.\n\n-- Prevention: Use READ COMMITTED or higher isolation level.',
    testCases: [
      { input: 'analysis', expectedOutput: 'T2 Read identified as dirty', isHidden: false, description: 'Dirty read identification' }
    ],
    hints: ['Dirty read = reading uncommitted data.', 'What happens when T1 rolls back?']
  },
  {
    id: 'cs205-ex-5-5',
    subjectId: 'cs205',
    topicId: 'cs205-5',
    title: 'Lost Update Scenario',
    description: 'Show how two concurrent transactions updating the same balance can lose an update.',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Lost update demonstration:\n-- ',
    solution: '-- Initial: Balance = 1000\n\n-- Time  T1 (Withdraw 200)     T2 (Withdraw 300)\n-- t1    Read Balance → 1000\n-- t2                           Read Balance → 1000\n-- t3    Balance = 1000-200\n-- t4    Write Balance = 800\n-- t5                           Balance = 1000-300\n-- t6                           Write Balance = 700\n\n-- Final: Balance = 700\n-- Expected: 1000 - 200 - 300 = 500\n-- T1\'s update is LOST!\n\n-- Fix: Use SELECT FOR UPDATE or atomic UPDATE',
    testCases: [
      { input: 'analysis', expectedOutput: 'Lost update shown', isHidden: false, description: 'Lost update' }
    ],
    hints: ['Both read before either writes.', 'Second write overwrites first.']
  },
  {
    id: 'cs205-ex-5-6',
    subjectId: 'cs205',
    topicId: 'cs205-5',
    title: 'Set Isolation Level',
    description: 'Write SQL to set SERIALIZABLE isolation level and explain when to use it.',
    difficulty: 1,
    language: 'sql',
    starterCode: '-- Set isolation level:\n',
    solution: 'SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;\n\n-- Or for specific transaction:\nBEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;\n\n-- Use SERIALIZABLE when:\n-- 1. Complete correctness is required\n-- 2. Financial transactions with constraints\n-- 3. Preventing all anomalies is critical\n-- 4. Can accept higher abort rate/lower concurrency\n\n-- Trade-off: Highest consistency, lowest concurrency',
    testCases: [
      { input: 'command', expectedOutput: 'Isolation level set', isHidden: false, description: 'Isolation level setting' }
    ],
    hints: ['SERIALIZABLE is the strictest level.', 'Consider the consistency vs performance trade-off.']
  },
  {
    id: 'cs205-ex-5-7',
    subjectId: 'cs205',
    topicId: 'cs205-5',
    title: 'Shared Lock Query',
    description: 'Write a SELECT with explicit shared lock to prevent updates during read.',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- SELECT with shared lock:\n',
    solution: '-- PostgreSQL:\nSELECT * FROM Accounts WHERE AccountID = 1 FOR SHARE;\n\n-- SQL Server:\nSELECT * FROM Accounts WITH (HOLDLOCK) WHERE AccountID = 1;\n\n-- This prevents other transactions from:\n-- - Acquiring exclusive lock\n-- - Updating or deleting the row\n\n-- But allows other shared locks (concurrent reads)',
    testCases: [
      { input: 'query', expectedOutput: 'Shared lock acquired', isHidden: false, description: 'Shared lock' }
    ],
    hints: ['FOR SHARE in PostgreSQL.', 'Shared locks allow concurrent reads.']
  },
  {
    id: 'cs205-ex-5-8',
    subjectId: 'cs205',
    topicId: 'cs205-5',
    title: 'Exclusive Lock Query',
    description: 'Write a SELECT with exclusive lock for updating balance (lock then update pattern).',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Lock then update:\n',
    solution: 'BEGIN TRANSACTION;\n\n-- Acquire exclusive lock\nSELECT Balance FROM Accounts WHERE AccountID = 1 FOR UPDATE;\n\n-- Now safely update\nUPDATE Accounts\nSET Balance = Balance - 100\nWHERE AccountID = 1;\n\nCOMMIT;\n\n-- FOR UPDATE prevents other transactions from reading\n-- or modifying until we commit/rollback',
    testCases: [
      { input: 'query', expectedOutput: 'Exclusive lock pattern', isHidden: false, description: 'Exclusive lock' }
    ],
    hints: ['FOR UPDATE gets exclusive lock.', 'Other transactions must wait.']
  },
  {
    id: 'cs205-ex-5-9',
    subjectId: 'cs205',
    topicId: 'cs205-5',
    title: 'Deadlock Detection',
    description: 'Identify the deadlock in this schedule and propose a solution.',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- T1: Lock(A), T2: Lock(B), T1: Request Lock(B), T2: Request Lock(A)\n-- ',
    solution: '-- Deadlock Analysis:\n-- T1 holds Lock(A), waiting for Lock(B)\n-- T2 holds Lock(B), waiting for Lock(A)\n-- Circular wait = DEADLOCK!\n\n-- Solutions:\n\n-- 1. Lock ordering (always lock in same order):\n-- Both T1 and T2 should: Lock(A) then Lock(B)\n\n-- 2. Lock timeout:\nSET LOCK_TIMEOUT 5000; -- 5 seconds\n\n-- 3. Deadlock detection by DBMS:\n-- DBMS detects cycle, aborts one transaction (victim)\n-- Application should retry the aborted transaction',
    testCases: [
      { input: 'analysis', expectedOutput: 'Deadlock identified and solved', isHidden: false, description: 'Deadlock handling' }
    ],
    hints: ['Look for circular wait.', 'Consistent lock ordering prevents deadlocks.']
  },
  {
    id: 'cs205-ex-5-10',
    subjectId: 'cs205',
    topicId: 'cs205-5',
    title: 'Phantom Read Scenario',
    description: 'Describe a phantom read scenario in an order system.',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Phantom read scenario:\n-- ',
    solution: '-- Scenario: Count pending orders\n\n-- T1: SELECT COUNT(*) FROM Orders WHERE Status=\'Pending\';\n--     Returns: 10\n\n-- T2: INSERT INTO Orders (Status) VALUES (\'Pending\');\n-- T2: COMMIT;\n\n-- T1: SELECT COUNT(*) FROM Orders WHERE Status=\'Pending\';\n--     Returns: 11  ← PHANTOM!\n\n-- T1 sees a "phantom" row that appeared between queries.\n\n-- Prevention:\n-- 1. Use SERIALIZABLE isolation\n-- 2. Use gap locking (MySQL InnoDB)\n-- 3. Predicate locking',
    testCases: [
      { input: 'scenario', expectedOutput: 'Phantom read demonstrated', isHidden: false, description: 'Phantom read' }
    ],
    hints: ['Phantom = new rows appearing.', 'Affects range queries.']
  },
  {
    id: 'cs205-ex-5-11',
    subjectId: 'cs205',
    topicId: 'cs205-5',
    title: 'Optimistic Locking',
    description: 'Implement optimistic locking using a version column.',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Optimistic locking implementation:\n',
    solution: '-- Table setup:\nALTER TABLE Products ADD Version INT DEFAULT 1;\n\n-- Read (no locks):\nSELECT ProductID, Name, Price, Version\nFROM Products WHERE ProductID = 1;\n-- Returns: (1, \'Widget\', 10.00, 5)\n\n-- Application makes changes...\n\n-- Update with version check:\nUPDATE Products\nSET Price = 12.00, Version = Version + 1\nWHERE ProductID = 1 AND Version = 5;\n\n-- Check result:\n-- IF @@ROWCOUNT = 0 THEN\n--   Conflict! Another transaction modified the row.\n--   Retry with fresh data.',
    testCases: [
      { input: 'implementation', expectedOutput: 'Optimistic locking pattern', isHidden: false, description: 'Optimistic locking' }
    ],
    hints: ['Version column tracks modifications.', 'Check version on update.']
  },
  {
    id: 'cs205-ex-5-12',
    subjectId: 'cs205',
    topicId: 'cs205-5',
    title: 'Two-Phase Locking',
    description: 'Show a 2PL schedule for two transactions accessing items A and B.',
    difficulty: 3,
    language: 'sql',
    starterCode: '-- 2PL schedule:\n-- ',
    solution: '-- 2PL: Growing phase (acquire), then Shrinking phase (release)\n\n-- T1: Transfer A→B\n-- T2: Read A and B\n\n-- 2PL Schedule:\n-- T1: Lock-X(A)     -- Growing\n-- T1: Read(A)\n-- T1: Write(A)\n-- T1: Lock-X(B)     -- Still growing\n-- T1: Read(B)\n-- T1: Write(B)\n-- T1: Unlock(A)     -- Shrinking begins\n-- T1: Unlock(B)\n\n-- T2: Lock-S(A)     -- Waits until T1 unlocks\n-- T2: Lock-S(B)\n-- T2: Read(A)\n-- T2: Read(B)\n-- T2: Unlock(A)\n-- T2: Unlock(B)\n\n-- Key: Once unlocking starts, no more locks acquired',
    testCases: [
      { input: 'schedule', expectedOutput: 'Valid 2PL schedule', isHidden: false, description: '2PL schedule' }
    ],
    hints: ['Growing: only acquire locks.', 'Shrinking: only release locks.']
  },
  {
    id: 'cs205-ex-5-13',
    subjectId: 'cs205',
    topicId: 'cs205-5',
    title: 'Write Skew',
    description: 'Demonstrate write skew with a doctor on-call constraint (at least 1 must be on-call).',
    difficulty: 3,
    language: 'sql',
    starterCode: '-- Write skew demonstration:\n-- ',
    solution: '-- Constraint: At least one doctor must be on-call\n-- Initial: Alice=OnCall, Bob=OnCall\n\n-- T1 (Alice going off):\n-- SELECT COUNT(*) FROM Doctors WHERE OnCall=true;\n-- Returns 2, OK to go off\n-- UPDATE Doctors SET OnCall=false WHERE Name=\'Alice\';\n\n-- T2 (Bob going off, concurrent):\n-- SELECT COUNT(*) FROM Doctors WHERE OnCall=true;\n-- Returns 2, OK to go off\n-- UPDATE Doctors SET OnCall=false WHERE Name=\'Bob\';\n\n-- Both commit: BOTH off-call!\n-- Constraint violated!\n\n-- Fix: SERIALIZABLE isolation or:\nSELECT * FROM Doctors WHERE OnCall=true FOR UPDATE;\n-- Lock all on-call doctors before deciding',
    testCases: [
      { input: 'analysis', expectedOutput: 'Write skew demonstrated', isHidden: false, description: 'Write skew' }
    ],
    hints: ['Each transaction passes check individually.', 'Combined result violates constraint.']
  },
  {
    id: 'cs205-ex-5-14',
    subjectId: 'cs205',
    topicId: 'cs205-5',
    title: 'ACID Verification',
    description: 'For each ACID property, show how it\'s ensured in a bank transfer.',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- ACID in bank transfer:\n-- ',
    solution: '-- Transfer $100 from A to B\n\nBEGIN TRANSACTION;\nUPDATE Accounts SET Balance = Balance - 100 WHERE ID = \'A\';\nUPDATE Accounts SET Balance = Balance + 100 WHERE ID = \'B\';\nCOMMIT;\n\n-- ATOMICITY: Both updates commit or both rollback.\n-- If second UPDATE fails, first is undone.\n\n-- CONSISTENCY: Balance constraints maintained.\n-- CHECK (Balance >= 0) prevents negative balance.\n-- Total money conserved.\n\n-- ISOLATION: Other transactions see either\n-- pre-transfer or post-transfer state, not partial.\n\n-- DURABILITY: After COMMIT, changes survive\n-- even if system crashes immediately after.',
    testCases: [
      { input: 'analysis', expectedOutput: 'All ACID properties explained', isHidden: false, description: 'ACID verification' }
    ],
    hints: ['Consider what each property guarantees.', 'What happens in failure scenarios?']
  },
  {
    id: 'cs205-ex-5-15',
    subjectId: 'cs205',
    topicId: 'cs205-5',
    title: 'Recovery Scenario',
    description: 'Given a log, determine which transactions need REDO and UNDO after crash.',
    difficulty: 3,
    language: 'sql',
    starterCode: '-- Log: [T1,Start] [T1,A,10→20] [T2,Start] [T2,B,50→30] [T1,Commit] [Crash]\n-- ',
    solution: '-- Log Analysis:\n-- [T1, Start]\n-- [T1, A, 10→20]\n-- [T2, Start]\n-- [T2, B, 50→30]\n-- [T1, Commit]\n-- [CRASH]\n\n-- T1: Started and Committed before crash\n--     → REDO (ensure committed changes on disk)\n\n-- T2: Started but NOT committed before crash\n--     → UNDO (rollback uncommitted changes)\n\n-- Recovery Process:\n-- 1. REDO T1: Set A = 20 (if not already)\n-- 2. UNDO T2: Set B = 50 (restore original)\n\n-- After recovery:\n-- A = 20 (T1 committed)\n-- B = 50 (T2 rolled back)',
    testCases: [
      { input: 'analysis', expectedOutput: 'REDO/UNDO identified', isHidden: false, description: 'Recovery analysis' }
    ],
    hints: ['Committed = REDO.', 'Uncommitted = UNDO.']
  },
  {
    id: 'cs205-ex-5-16',
    subjectId: 'cs205',
    topicId: 'cs205-5',
    title: 'Isolation Level Selection',
    description: 'For each scenario, recommend the appropriate isolation level.',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Isolation level recommendations:\n-- ',
    solution: '-- Scenarios:\n\n-- 1. Reading product catalog for display\n-- Recommendation: READ COMMITTED\n-- Reason: Dirty reads prevented, okay if data changes\n\n-- 2. Bank transfer between accounts\n-- Recommendation: SERIALIZABLE\n-- Reason: Must prevent all anomalies for financial integrity\n\n-- 3. Generating end-of-day report\n-- Recommendation: REPEATABLE READ\n-- Reason: Need consistent snapshot during report generation\n\n-- 4. Quick count of pending orders\n-- Recommendation: READ UNCOMMITTED\n-- Reason: Approximate count acceptable, maximum performance\n\n-- 5. Booking system (prevent double-booking)\n-- Recommendation: SERIALIZABLE\n-- Reason: Must prevent write skew/phantoms',
    testCases: [
      { input: 'analysis', expectedOutput: 'Appropriate levels selected', isHidden: false, description: 'Level selection' }
    ],
    hints: ['Higher isolation = more overhead.', 'Match level to consistency requirements.']
  }
];
