# Practical Deadlock Handling

Real systems use combined strategies for deadlock handling. This subtopic covers practical approaches in operating systems, databases, and applications.

## The Ostrich Algorithm

Most general-purpose operating systems ignore deadlock:

```
Philosophy:
- Deadlocks are rare in practice
- Prevention/avoidance overhead not worth it
- Detection overhead significant
- Just reboot if system hangs

Used by: Linux, Windows, macOS (for most resources)
```

### Justification

```
Cost-Benefit Analysis:

Deadlock probability: ~0.001% of runtime
Prevention cost: ~5% performance overhead
Detection cost: ~2% overhead

If uptime value = $1000/hour
Prevention cost = $50/hour always
Deadlock cost = $10/hour (occasional reboot)

Prevention not justified!
```

## Linux Approach

### Different Strategies for Different Resources

```c
// CPU: Preemptive scheduling (no deadlock)
// Memory: No deadlock (single allocator)
// Files: Application responsibility
// Mutex/locks: lockdep for detection (debug builds)
```

### Kernel lockdep

```c
// Enable in kernel config
CONFIG_PROVE_LOCKING=y
CONFIG_DEBUG_LOCK_ALLOC=y

// Runtime detection of potential deadlocks
// Based on lock ordering violations

// Example output:
/*
======================================================
[ INFO: possible circular locking dependency detected ]
5.4.0-42-generic #46-Ubuntu
------------------------------------------------------
process/1234 is trying to acquire lock:
 (&mm->mmap_sem){++++}, at: __do_page_fault+0x1bc/0x4b0

but task is already holding lock:
 (&mm->mmap_sem){++++}, at: do_wp_page+0x2a7/0x7f0

which lock already depends on the new lock.
*/
```

### OOM Killer (Indirect Deadlock Handling)

```c
// When memory exhausted, kill processes
// Prevents memory-related deadlocks

// /proc/[pid]/oom_score - likelihood of being killed
// /proc/[pid]/oom_adj - adjustment (-17 to 15)

// Protect critical process:
echo -17 > /proc/$$/oom_adj
```

## Database Deadlock Handling

Databases actively detect and resolve deadlocks:

### MySQL/InnoDB

```sql
-- InnoDB automatically detects row-level lock deadlocks
-- Uses wait-for graph with ~1 second detection interval

-- When detected, one transaction is rolled back
-- ERROR 1213 (40001): Deadlock found when trying to get lock

-- View recent deadlocks:
SHOW ENGINE INNODB STATUS;

-- Configure timeout:
SET innodb_lock_wait_timeout = 50;  -- seconds
```

### PostgreSQL

```sql
-- Uses timeout-based detection
-- deadlock_timeout parameter (default 1s)

-- When timeout expires, runs detection
-- Rolls back transaction that detected

-- Configuration:
SET deadlock_timeout = '1s';

-- Log deadlocks:
SET log_lock_waits = on;
```

### SQL Server

```sql
-- Continuous deadlock detection
-- Chooses victim based on transaction cost

-- Set priority (lower = more likely victim):
SET DEADLOCK_PRIORITY LOW;
SET DEADLOCK_PRIORITY NORMAL;
SET DEADLOCK_PRIORITY HIGH;
SET DEADLOCK_PRIORITY -10;  -- Range: -10 to 10

-- Application should catch and retry:
BEGIN TRY
    BEGIN TRANSACTION;
    -- SQL operations
    COMMIT;
END TRY
BEGIN CATCH
    IF ERROR_NUMBER() = 1205  -- Deadlock
        ROLLBACK;
        -- Retry transaction
END CATCH
```

## Application-Level Strategies

### Lock Ordering Convention

```c
// Company-wide convention:
// All locks ordered by memory address

void safe_transfer(Account* from, Account* to, int amount) {
    // Order by address
    Account* first = (from < to) ? from : to;
    Account* second = (from < to) ? to : from;

    pthread_mutex_lock(&first->lock);
    pthread_mutex_lock(&second->lock);

    from->balance -= amount;
    to->balance += amount;

    pthread_mutex_unlock(&second->lock);
    pthread_mutex_unlock(&first->lock);
}
```

### Try-Lock with Backoff

```c
bool try_transfer(Account* from, Account* to, int amount,
                  int max_attempts) {
    for (int attempt = 0; attempt < max_attempts; attempt++) {
        if (pthread_mutex_trylock(&from->lock) == 0) {
            if (pthread_mutex_trylock(&to->lock) == 0) {
                // Got both locks
                from->balance -= amount;
                to->balance += amount;
                pthread_mutex_unlock(&to->lock);
                pthread_mutex_unlock(&from->lock);
                return true;
            }
            pthread_mutex_unlock(&from->lock);
        }

        // Exponential backoff with jitter
        int delay = (1 << attempt) + rand() % 100;
        usleep(delay * 1000);
    }

    return false;  // Failed after max attempts
}
```

### Timeout-Based Acquisition

```c
bool lock_with_timeout(pthread_mutex_t* mutex, int timeout_ms) {
    struct timespec ts;
    clock_gettime(CLOCK_REALTIME, &ts);
    ts.tv_sec += timeout_ms / 1000;
    ts.tv_nsec += (timeout_ms % 1000) * 1000000;

    if (ts.tv_nsec >= 1000000000) {
        ts.tv_sec++;
        ts.tv_nsec -= 1000000000;
    }

    return pthread_mutex_timedlock(mutex, &ts) == 0;
}

void safe_operation(Resource* r1, Resource* r2) {
    while (1) {
        if (lock_with_timeout(&r1->lock, 100)) {
            if (lock_with_timeout(&r2->lock, 100)) {
                // Success
                do_work(r1, r2);
                pthread_mutex_unlock(&r2->lock);
                pthread_mutex_unlock(&r1->lock);
                return;
            }
            pthread_mutex_unlock(&r1->lock);
        }
        // Backoff before retry
        usleep(rand() % 10000);
    }
}
```

## Distributed Deadlock

### Challenge

```
Node A holds resource on Node A
Node A waits for resource on Node B
Node B holds resource on Node B
Node B waits for resource on Node A

Detection requires global view!
```

### Centralized Detection

```c
// Coordinator collects wait-for information
typedef struct {
    int node_id;
    int process_id;
    int waiting_for_node;
    int waiting_for_process;
} WaitInfo;

void coordinator_detect() {
    // Collect from all nodes
    WaitInfo* all_waits = collect_from_all_nodes();

    // Build global wait-for graph
    build_global_graph(all_waits);

    // Run cycle detection
    if (detect_cycle()) {
        select_and_abort_victim();
    }
}
```

### Edge Chasing

```c
// Distributed algorithm - no coordinator
// Probes follow wait-for edges

typedef struct {
    int initiator;      // Who started probe
    int sender;         // Who sent this
    int receiver;       // Who receives this
} Probe;

void on_receive_probe(Probe* p) {
    if (p->initiator == my_id) {
        // Probe came back - DEADLOCK!
        abort_self();
        return;
    }

    // Forward probe along my wait edges
    if (I_am_waiting) {
        Probe forward = {
            .initiator = p->initiator,
            .sender = my_id,
            .receiver = who_I_wait_for
        };
        send_probe(&forward);
    }
}
```

## Deadlock in Concurrent Data Structures

### Lock-Free Alternatives

```c
// Instead of lock-based queue (deadlock risk)
// Use lock-free queue

typedef struct Node {
    void* data;
    _Atomic(struct Node*) next;
} Node;

typedef struct {
    _Atomic(Node*) head;
    _Atomic(Node*) tail;
} LockFreeQueue;

void enqueue(LockFreeQueue* q, void* data) {
    Node* node = malloc(sizeof(Node));
    node->data = data;
    atomic_store(&node->next, NULL);

    Node* tail;
    while (1) {
        tail = atomic_load(&q->tail);
        Node* next = atomic_load(&tail->next);

        if (tail == atomic_load(&q->tail)) {
            if (next == NULL) {
                if (atomic_compare_exchange_weak(&tail->next,
                                                  &next, node)) {
                    atomic_compare_exchange_weak(&q->tail,
                                                  &tail, node);
                    return;
                }
            } else {
                atomic_compare_exchange_weak(&q->tail, &tail, next);
            }
        }
    }
}
```

### Transactional Memory

```c
// Software transactional memory (STM)
// Automatic deadlock freedom through retry

void transfer(Account* from, Account* to, int amount) {
    __transaction_atomic {
        from->balance -= amount;
        to->balance += amount;
    }
    // STM runtime handles conflicts
    // No explicit locking needed
}
```

## Best Practices Summary

```
1. Use lock ordering when possible
2. Prefer try-lock with timeout over blocking
3. Use deadlock detection for databases
4. Consider lock-free alternatives
5. Document lock dependencies
6. Use tools (lockdep, TSan) in development
7. Keep critical sections short
8. Avoid nested locks when possible
9. Use higher-level abstractions (monitors, STM)
10. Test with stress testing and Helgrind/TSan
```

## Summary

Practical deadlock handling varies by context:
- **General OS**: Often ignored (ostrich algorithm)
- **Databases**: Active detection and rollback
- **Applications**: Prevention through conventions
- Lock ordering is simple and effective
- Try-lock with backoff handles dynamic situations
- Distributed systems need special algorithms
- Lock-free structures avoid the problem entirely
- Modern tools help detect issues during development
- Balance overhead against deadlock risk
