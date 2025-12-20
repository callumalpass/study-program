---
id: cs205-t5-practical
title: "Practical Transaction Management"
order: 7
---

# Practical Transaction Management

Understanding transaction theory is essential, but applying it effectively in real applications requires practical knowledge of implementation patterns, common pitfalls, and performance optimization. This guide covers hands-on transaction management techniques for building robust database applications.

## Transaction Boundaries

### Choosing Transaction Scope

The scope of a transaction significantly impacts both correctness and performance:

**Too Narrow** (multiple independent transactions):
```python
# Bad: Data can become inconsistent between transactions
def transfer_funds(from_account, to_account, amount):
    # Transaction 1
    db.execute("UPDATE accounts SET balance = balance - ? WHERE id = ?",
               [amount, from_account])
    db.commit()

    # Application crash here leaves system inconsistent!

    # Transaction 2
    db.execute("UPDATE accounts SET balance = balance + ? WHERE id = ?",
               [amount, to_account])
    db.commit()
```

**Too Wide** (long-running transaction):
```python
# Bad: Holds locks too long, blocks other users
def process_monthly_report():
    db.begin()  # Start transaction

    # Process millions of records...
    for customer in get_all_customers():
        calculate_statistics(customer)
        update_summary_tables(customer)

    db.commit()  # Finally release locks after hours
```

**Just Right**:
```python
# Good: Atomic unit of work, minimal lock duration
def transfer_funds(from_account, to_account, amount):
    with db.transaction():
        # Verify sufficient funds
        balance = db.get_balance(from_account)
        if balance < amount:
            raise InsufficientFundsError()

        # Perform transfer
        db.execute("UPDATE accounts SET balance = balance - ? WHERE id = ?",
                   [amount, from_account])
        db.execute("UPDATE accounts SET balance = balance + ? WHERE id = ?",
                   [amount, to_account])

        # Log the transaction
        db.execute("INSERT INTO transfers (from_id, to_id, amount, date) VALUES (?, ?, ?, NOW())",
                   [from_account, to_account, amount])
    # Auto-commit on successful exit, rollback on exception
```

## Connection and Transaction Handling

### Connection Management Patterns

**Connection Pool Configuration**:
```python
# Python with SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.pool import QueuePool

engine = create_engine(
    'postgresql://user:pass@host/db',
    poolclass=QueuePool,
    pool_size=10,           # Maintained connections
    max_overflow=20,        # Extra connections allowed
    pool_timeout=30,        # Wait time for connection
    pool_recycle=3600,      # Recycle after 1 hour
    pool_pre_ping=True      # Verify connection before use
)
```

**Transaction Context Manager**:
```python
from contextlib import contextmanager

@contextmanager
def transaction_scope():
    connection = pool.get_connection()
    try:
        yield connection
        connection.commit()
    except Exception:
        connection.rollback()
        raise
    finally:
        pool.release_connection(connection)

# Usage
with transaction_scope() as conn:
    conn.execute("UPDATE ...")
    conn.execute("INSERT ...")
```

### Handling Transaction Failures

```python
import time
from random import uniform

def execute_with_retry(operation, max_attempts=3):
    """Execute operation with exponential backoff on serialization failures."""
    for attempt in range(max_attempts):
        try:
            with transaction_scope() as conn:
                return operation(conn)
        except SerializationError:
            if attempt == max_attempts - 1:
                raise
            # Exponential backoff with jitter
            sleep_time = (2 ** attempt) + uniform(0, 1)
            time.sleep(sleep_time)
        except DeadlockError:
            if attempt == max_attempts - 1:
                raise
            time.sleep(uniform(0.1, 0.5))  # Brief random delay

# Usage
def transfer(conn):
    conn.execute("UPDATE accounts SET balance = balance - 100 WHERE id = 1")
    conn.execute("UPDATE accounts SET balance = balance + 100 WHERE id = 2")

execute_with_retry(transfer)
```

## Savepoints and Partial Rollback

Savepoints enable fine-grained error handling within transactions:

```python
def process_batch_orders(orders):
    """Process orders, continuing on individual failures."""
    successful = []
    failed = []

    with transaction_scope() as conn:
        for order in orders:
            # Create savepoint before each order
            conn.execute("SAVEPOINT order_savepoint")

            try:
                process_single_order(conn, order)
                # Release savepoint on success (optional, frees resources)
                conn.execute("RELEASE SAVEPOINT order_savepoint")
                successful.append(order.id)
            except OrderProcessingError as e:
                # Rollback just this order, continue with others
                conn.execute("ROLLBACK TO SAVEPOINT order_savepoint")
                failed.append((order.id, str(e)))

        # Insert summary record
        conn.execute(
            "INSERT INTO batch_results (successful, failed, processed_at) VALUES (?, ?, NOW())",
            [len(successful), len(failed)]
        )

    return successful, failed
```

## Isolation Level Selection

### Choosing the Right Level

| Use Case | Recommended Level | Reason |
|----------|-------------------|--------|
| Read-only reports | READ COMMITTED | No write conflicts, good performance |
| Financial transactions | SERIALIZABLE | Must prevent all anomalies |
| Shopping cart updates | READ COMMITTED | Okay if user sees slightly stale data |
| Inventory management | REPEATABLE READ | Prevent lost updates |
| High-concurrency OLTP | READ COMMITTED | Best throughput |
| Data warehouse ETL | SERIALIZABLE | Ensure consistent snapshots |

### Setting Isolation Levels

```sql
-- Per-transaction
BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;
-- ... operations ...
COMMIT;

-- Per-session (PostgreSQL)
SET SESSION CHARACTERISTICS AS TRANSACTION ISOLATION LEVEL REPEATABLE READ;

-- Check current level
SHOW transaction_isolation;
```

### Application-Level Configuration

```python
# Python SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine('postgresql://...')

# Session factory with isolation level
Session = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=True
)

# Use specific isolation for critical operation
with engine.connect().execution_options(
    isolation_level="SERIALIZABLE"
) as conn:
    with conn.begin():
        # Critical operations here
        pass
```

## Optimistic vs Pessimistic Concurrency

### Optimistic Concurrency Control

Assume conflicts are rare; detect and handle them:

```python
def optimistic_update(conn, account_id, new_balance):
    """Update with version check for optimistic concurrency."""

    # Read current version
    row = conn.execute(
        "SELECT balance, version FROM accounts WHERE id = ?",
        [account_id]
    ).fetchone()

    current_version = row['version']

    # Attempt update with version check
    result = conn.execute("""
        UPDATE accounts
        SET balance = ?, version = version + 1
        WHERE id = ? AND version = ?
    """, [new_balance, account_id, current_version])

    if result.rowcount == 0:
        raise OptimisticLockError("Account was modified by another transaction")

    return True
```

### Pessimistic Concurrency Control

Lock resources upfront when conflicts are expected:

```python
def pessimistic_update(conn, account_id, amount):
    """Update with explicit locking for pessimistic concurrency."""

    # Lock the row immediately
    row = conn.execute(
        "SELECT balance FROM accounts WHERE id = ? FOR UPDATE",
        [account_id]
    ).fetchone()

    # Now we have exclusive access
    new_balance = row['balance'] + amount

    conn.execute(
        "UPDATE accounts SET balance = ? WHERE id = ?",
        [new_balance, account_id]
    )
```

### Choosing Between Approaches

| Factor | Optimistic | Pessimistic |
|--------|------------|-------------|
| Conflict frequency | Low | High |
| Transaction duration | Short | Any |
| Retry cost | Low | High |
| Lock contention | None | Possible |
| Implementation | Version columns | SELECT FOR UPDATE |

## Distributed Transaction Patterns

### Saga Pattern

For long-running transactions across services:

```python
class TransferSaga:
    """Saga for distributed fund transfer."""

    def __init__(self, from_account, to_account, amount):
        self.from_account = from_account
        self.to_account = to_account
        self.amount = amount
        self.state = 'INITIATED'

    def execute(self):
        try:
            # Step 1: Reserve funds
            self.state = 'RESERVING'
            reserve_id = self.reserve_funds()

            # Step 2: Credit destination
            self.state = 'CREDITING'
            self.credit_destination()

            # Step 3: Confirm reservation (release hold)
            self.state = 'CONFIRMING'
            self.confirm_reservation(reserve_id)

            self.state = 'COMPLETED'
        except Exception as e:
            self.compensate()
            raise

    def compensate(self):
        """Undo completed steps in reverse order."""
        if self.state == 'CREDITING':
            self.reverse_credit()
        if self.state in ('CREDITING', 'RESERVING'):
            self.cancel_reservation()
```

### Transactional Outbox Pattern

Ensure exactly-once message delivery:

```python
def place_order_with_outbox(conn, order_data):
    """Create order and queue event in single transaction."""
    with conn.begin():
        # Create order
        order_id = conn.execute(
            "INSERT INTO orders (customer_id, total) VALUES (?, ?) RETURNING id",
            [order_data['customer_id'], order_data['total']]
        ).fetchone()[0]

        # Write event to outbox (same transaction!)
        conn.execute("""
            INSERT INTO outbox (event_type, payload, created_at)
            VALUES (?, ?, NOW())
        """, ['OrderCreated', json.dumps({'order_id': order_id, **order_data})])

        return order_id

# Separate process polls outbox and publishes events
def process_outbox():
    """Poll outbox and publish events."""
    while True:
        with transaction_scope() as conn:
            events = conn.execute("""
                SELECT id, event_type, payload
                FROM outbox
                WHERE processed_at IS NULL
                ORDER BY created_at
                LIMIT 100
                FOR UPDATE SKIP LOCKED
            """).fetchall()

            for event in events:
                publish_to_message_queue(event['event_type'], event['payload'])
                conn.execute(
                    "UPDATE outbox SET processed_at = NOW() WHERE id = ?",
                    [event['id']]
                )

        time.sleep(1)
```

## Monitoring and Debugging

### Transaction Monitoring Queries

```sql
-- PostgreSQL: Active transactions
SELECT pid, xact_start, state, query
FROM pg_stat_activity
WHERE xact_start IS NOT NULL
ORDER BY xact_start;

-- Long-running transactions
SELECT pid, age(now(), xact_start) AS duration, query
FROM pg_stat_activity
WHERE xact_start IS NOT NULL
  AND age(now(), xact_start) > interval '5 minutes';

-- Lock waits
SELECT
    blocked.pid AS blocked_pid,
    blocked.query AS blocked_query,
    blocking.pid AS blocking_pid,
    blocking.query AS blocking_query
FROM pg_stat_activity blocked
JOIN pg_locks blocked_locks ON blocked.pid = blocked_locks.pid
JOIN pg_locks blocking_locks ON blocked_locks.locktype = blocking_locks.locktype
    AND blocked_locks.relation = blocking_locks.relation
    AND blocked_locks.pid != blocking_locks.pid
JOIN pg_stat_activity blocking ON blocking_locks.pid = blocking.pid
WHERE NOT blocked_locks.granted;
```

### Application-Level Logging

```python
import logging
import time

logger = logging.getLogger('transactions')

@contextmanager
def logged_transaction(description):
    """Transaction context with timing and logging."""
    start_time = time.time()
    transaction_id = generate_transaction_id()

    logger.info(f"[{transaction_id}] Starting: {description}")

    try:
        with transaction_scope() as conn:
            yield conn

        duration = time.time() - start_time
        logger.info(f"[{transaction_id}] Committed in {duration:.3f}s")
    except Exception as e:
        duration = time.time() - start_time
        logger.error(f"[{transaction_id}] Rolled back after {duration:.3f}s: {e}")
        raise
```

### Performance Tuning

Key transaction performance considerations:
1. **Keep transactions short**: Less lock contention
2. **Access objects in consistent order**: Prevents deadlocks
3. **Use appropriate isolation level**: Don't over-isolate
4. **Batch operations when possible**: Fewer round trips
5. **Monitor and alert on long transactions**: Prevent blocking issues

Practical transaction management combines theoretical knowledge with real-world patterns to build applications that are both correct and performant.
