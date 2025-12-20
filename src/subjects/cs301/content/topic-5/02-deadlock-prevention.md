---
id: cs301-t5-prevention
title: "Deadlock Prevention"
order: 2
---

# Deadlock Prevention

Deadlock prevention ensures that at least one of the four necessary conditions cannot hold. This subtopic covers methods to prevent each condition.

## Prevention Strategy

To prevent deadlock, we must ensure that at least one necessary condition never occurs:

1. Mutual Exclusion
2. Hold and Wait
3. No Preemption
4. Circular Wait

## Preventing Mutual Exclusion

### The Challenge

Some resources are inherently non-shareable:
- Printers (simultaneous use corrupts output)
- Mutex locks (by definition)

### When Possible

Make resources shareable when possible:

```c
// Instead of exclusive file lock
flock(fd, LOCK_EX);  // Exclusive

// Use shared lock when appropriate
flock(fd, LOCK_SH);  // Shared - multiple readers OK
```

### Read-Write Locks

```c
pthread_rwlock_t rwlock;

// Multiple readers can hold simultaneously
pthread_rwlock_rdlock(&rwlock);
// Read operations
pthread_rwlock_unlock(&rwlock);

// Writers still exclusive
pthread_rwlock_wrlock(&rwlock);
// Write operations
pthread_rwlock_unlock(&rwlock);
```

### Limitations

Cannot eliminate mutual exclusion for:
- Printers, tape drives
- Any write operations to shared data
- Hardware resources

**Conclusion**: Not practical for many resources.

## Preventing Hold and Wait

### Method 1: Request All Resources at Once

Process must request all resources before execution.

```c
// Bad: Hold and wait
lock(A);
// ... do work ...
lock(B);  // May deadlock if another holds B and wants A

// Good: Request all at once
if (try_lock_both(A, B)) {
    // Got both locks
    // ... do work ...
    unlock(A);
    unlock(B);
} else {
    // Couldn't get both, try again later
}
```

### Implementation

```c
typedef struct {
    pthread_mutex_t* locks;
    int count;
    pthread_mutex_t alloc_mutex;
} ResourceManager;

bool request_all(ResourceManager* rm, int* resources, int n) {
    pthread_mutex_lock(&rm->alloc_mutex);

    // Try to acquire all
    for (int i = 0; i < n; i++) {
        if (pthread_mutex_trylock(&rm->locks[resources[i]]) != 0) {
            // Failed, release what we got
            for (int j = 0; j < i; j++) {
                pthread_mutex_unlock(&rm->locks[resources[j]]);
            }
            pthread_mutex_unlock(&rm->alloc_mutex);
            return false;
        }
    }

    pthread_mutex_unlock(&rm->alloc_mutex);
    return true;
}
```

### Method 2: Release Before Requesting

Process must release all resources before requesting new ones.

```c
void process_work() {
    // Phase 1: Need resources A and B
    lock(A);
    lock(B);
    // ... use A and B ...
    unlock(A);
    unlock(B);

    // Must release before requesting different resources
    // Phase 2: Need resource C
    lock(C);
    // ... use C ...
    unlock(C);
}
```

### Disadvantages

1. **Low resource utilization**: Resources held but not used
2. **Starvation**: Process may never get all resources together
3. **Impractical**: Often don't know all resources needed upfront

```
Process needs resources over time:
Time 0: Need A
Time 1: Need A, B
Time 2: Need B
Time 3: Need C

All-at-once: Hold A, B, C entire time (wasteful)
```

## Preventing No Preemption

### Method: Allow Preemption

If a process holding resources requests another that cannot be immediately allocated, release all held resources.

```c
void request_with_preemption(Resource r) {
    while (1) {
        lock_all_current();

        if (try_acquire(r)) {
            return;  // Got all resources
        }

        // Can't get r, release all and retry
        release_all_current();
        wait_random_time();  // Avoid livelock
    }
}
```

### Implementation Example

```c
bool try_lock_preemptive(pthread_mutex_t** held, int n_held,
                         pthread_mutex_t* wanted) {
    if (pthread_mutex_trylock(wanted) == 0) {
        return true;  // Got it
    }

    // Can't get wanted, release all held
    for (int i = 0; i < n_held; i++) {
        pthread_mutex_unlock(held[i]);
    }

    // Wait and retry
    sched_yield();
    return false;
}
```

### When Applicable

Works well for resources whose state can be easily saved and restored:
- CPU registers
- Memory pages
- Database transactions (rollback)

### When Not Applicable

Resources that cannot be preempted:
- Printers mid-job
- Tape drives
- Some hardware devices

## Preventing Circular Wait

### Method: Total Ordering

Impose a total ordering on all resource types. Processes must request resources in order.

```c
// Resource ordering: lock1 < lock2 < lock3 < lock4
// Always acquire in increasing order

// Bad: Can cause circular wait
lock(lock3);
lock(lock1);  // Violates order!

// Good: Follows ordering
lock(lock1);
lock(lock3);
```

### Implementation

```c
#define NUM_LOCKS 10
pthread_mutex_t locks[NUM_LOCKS];

// Lock ID is the ordering
void acquire_multiple(int* lock_ids, int n) {
    // Sort lock IDs
    qsort(lock_ids, n, sizeof(int), compare_int);

    // Acquire in order
    for (int i = 0; i < n; i++) {
        pthread_mutex_lock(&locks[lock_ids[i]]);
    }
}

void release_multiple(int* lock_ids, int n) {
    // Release in reverse order (good practice)
    for (int i = n - 1; i >= 0; i--) {
        pthread_mutex_unlock(&locks[lock_ids[i]]);
    }
}
```

### Using Memory Addresses

```c
void lock_two(pthread_mutex_t* a, pthread_mutex_t* b) {
    if (a < b) {
        pthread_mutex_lock(a);
        pthread_mutex_lock(b);
    } else if (a > b) {
        pthread_mutex_lock(b);
        pthread_mutex_lock(a);
    } else {
        // Same lock
        pthread_mutex_lock(a);
    }
}

void unlock_two(pthread_mutex_t* a, pthread_mutex_t* b) {
    pthread_mutex_unlock(a);
    if (a != b) {
        pthread_mutex_unlock(b);
    }
}
```

### Why It Works

```
If all processes request in order 1 < 2 < 3:

P1 holds 1, wants 2: OK, gets 2
P2 holds 2, wants 3: OK, gets 3
P3 holds 3, wants 1: CANNOT happen!
                     (would have requested 1 first)

No circular wait possible.
```

### Proof by Contradiction

Assume circular wait exists with ordering:
```
P1 holds Ri, waits for Rj
P2 holds Rj, waits for Rk
...
Pn holds Rm, waits for Ri
```

By ordering rule: Ri < Rj < Rk < ... < Rm < Ri

This means Ri < Ri, which is a contradiction.

### Practical Application

```c
// Database lock hierarchy
typedef enum {
    TABLE_LOCK = 1,
    PAGE_LOCK = 2,
    ROW_LOCK = 3
} LockLevel;

// Must acquire in order: TABLE < PAGE < ROW
void update_row(Table* t, int page, int row) {
    lock_table(t);
    lock_page(t, page);
    lock_row(t, page, row);

    // ... update ...

    unlock_row(t, page, row);
    unlock_page(t, page);
    unlock_table(t);
}
```

## Comparison of Prevention Methods

| Condition | Prevention Method | Practicality |
|-----------|-------------------|--------------|
| Mutual Exclusion | Make shareable | Limited |
| Hold and Wait | Request all at once | Impractical |
| No Preemption | Allow preemption | Limited |
| Circular Wait | Impose ordering | **Most practical** |

## Lock Ordering in Practice

### Linux Kernel Lock Ordering

```c
/* From Linux documentation:
 *
 * Lock ordering:
 * 1. IRQ locks
 * 2. Spinlocks
 * 3. Semaphores
 * 4. Mutexes
 *
 * Never acquire #1 while holding #4
 */
```

### Lock Ordering Tools

```c
// lockdep in Linux kernel
// Automatically detects lock ordering violations

// Run with CONFIG_LOCKDEP enabled
// Warns at runtime:
// "possible circular locking dependency detected"
```

## Summary

Deadlock prevention eliminates necessary conditions:
- **Mutual Exclusion**: Hard to prevent, use sharing when possible
- **Hold and Wait**: Request all at once (impractical, low utilization)
- **No Preemption**: Release and retry (works for some resources)
- **Circular Wait**: Lock ordering (most practical approach)
- Lock ordering is widely used in practice
- Use memory addresses or assigned IDs for ordering
- Tools like lockdep can verify ordering at runtime
- Trade-off: Prevention overhead vs deadlock risk
