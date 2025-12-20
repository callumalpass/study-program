---
id: cs301-t5-examples
title: "Deadlock Examples"
order: 7
---

# Deadlock Examples and Case Studies

Understanding deadlock through real examples helps recognize and prevent it. This subtopic covers classic examples, real-world incidents, and debugging techniques.

## Classic Examples

### The Dining Philosophers

Five philosophers, five forks, circular dependency:

```c
// Deadlock-prone version
void philosopher(int id) {
    int left = id;
    int right = (id + 1) % 5;

    while (1) {
        think();
        pthread_mutex_lock(&forks[left]);   // All grab left
        pthread_mutex_lock(&forks[right]);  // All wait for right
        eat();                              // DEADLOCK!
        pthread_mutex_unlock(&forks[right]);
        pthread_mutex_unlock(&forks[left]);
    }
}

// Fixed: Lock ordering
void philosopher_fixed(int id) {
    int first = min(id, (id + 1) % 5);
    int second = max(id, (id + 1) % 5);

    while (1) {
        think();
        pthread_mutex_lock(&forks[first]);
        pthread_mutex_lock(&forks[second]);
        eat();
        pthread_mutex_unlock(&forks[second]);
        pthread_mutex_unlock(&forks[first]);
    }
}
```

### Bank Transfer

Classic double-lock scenario:

```c
// Deadlock-prone
void transfer(Account* from, Account* to, int amount) {
    pthread_mutex_lock(&from->lock);
    pthread_mutex_lock(&to->lock);
    from->balance -= amount;
    to->balance += amount;
    pthread_mutex_unlock(&to->lock);
    pthread_mutex_unlock(&from->lock);
}

// Thread 1: transfer(A, B, 100)
// Thread 2: transfer(B, A, 50)
// DEADLOCK!

// Fixed: Consistent ordering by account number
void transfer_fixed(Account* from, Account* to, int amount) {
    Account* first = (from->id < to->id) ? from : to;
    Account* second = (from->id < to->id) ? to : from;

    pthread_mutex_lock(&first->lock);
    pthread_mutex_lock(&second->lock);

    from->balance -= amount;
    to->balance += amount;

    pthread_mutex_unlock(&second->lock);
    pthread_mutex_unlock(&first->lock);
}
```

### Reader-Writer Lock Upgrade

```c
// Deadlock when trying to upgrade read lock to write
void process_data(rwlock_t* lock, Data* data) {
    rwlock_rdlock(lock);

    if (needs_modification(data)) {
        // DEADLOCK: Can't upgrade while holding read lock
        // Other readers may also be waiting to upgrade
        rwlock_wrlock(lock);  // BLOCKS FOREVER
        modify(data);
        rwlock_unlock(lock);
    }

    rwlock_unlock(lock);
}

// Fixed: Release read lock first
void process_data_fixed(rwlock_t* lock, Data* data) {
    bool need_write = false;

    rwlock_rdlock(lock);
    if (needs_modification(data)) {
        need_write = true;
    }
    rwlock_unlock(lock);

    if (need_write) {
        rwlock_wrlock(lock);
        // Re-check condition after acquiring write lock
        if (needs_modification(data)) {
            modify(data);
        }
        rwlock_unlock(lock);
    }
}
```

## Real-World Incidents

### Mars Pathfinder (1997)

Priority inversion causing system resets:

```
Scenario:
1. Low-priority task holds shared mutex
2. High-priority task needs mutex, blocks
3. Medium-priority tasks preempt low-priority task
4. High-priority task (watchdog) times out
5. System resets

Fix: Priority inheritance protocol
```

### Database Deadlock

```sql
-- Transaction 1
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
-- Waits...
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- Transaction 2
BEGIN;
UPDATE accounts SET balance = balance - 50 WHERE id = 2;
-- Waits...
UPDATE accounts SET balance = balance + 50 WHERE id = 1;

-- DEADLOCK!
-- Database detects and rolls back one transaction
```

### File System Deadlock

```c
// Process A                    // Process B
open("/tmp/file1", O_RDWR);    open("/tmp/file2", O_RDWR);
flock(fd1, LOCK_EX);           flock(fd2, LOCK_EX);
// Has file1, wants file2       // Has file2, wants file1
flock(fd2, LOCK_EX);           flock(fd1, LOCK_EX);
// DEADLOCK!
```

## Code Patterns That Cause Deadlock

### Nested Lock Acquisition

```c
// BAD: Inconsistent lock order
void function_a() {
    pthread_mutex_lock(&lock1);
    pthread_mutex_lock(&lock2);
    // ...
    pthread_mutex_unlock(&lock2);
    pthread_mutex_unlock(&lock1);
}

void function_b() {
    pthread_mutex_lock(&lock2);  // Different order!
    pthread_mutex_lock(&lock1);
    // ...
    pthread_mutex_unlock(&lock1);
    pthread_mutex_unlock(&lock2);
}
```

### Lock in Callback

```c
// BAD: Lock held while calling user callback
void process_item(Item* item, void (*callback)(Item*)) {
    pthread_mutex_lock(&global_lock);

    // Callback might try to acquire global_lock!
    callback(item);  // POTENTIAL DEADLOCK

    pthread_mutex_unlock(&global_lock);
}

// BETTER: Release lock before callback
void process_item_fixed(Item* item, void (*callback)(Item*)) {
    pthread_mutex_lock(&global_lock);
    Item copy = *item;
    pthread_mutex_unlock(&global_lock);

    callback(&copy);
}
```

### Condition Variable Deadlock

```c
// BAD: Wrong lock for condition variable
pthread_mutex_t mutex1, mutex2;
pthread_cond_t cond;

void waiter() {
    pthread_mutex_lock(&mutex1);
    pthread_cond_wait(&cond, &mutex2);  // WRONG MUTEX!
    pthread_mutex_unlock(&mutex1);
}

void signaler() {
    pthread_mutex_lock(&mutex2);
    pthread_cond_signal(&cond);
    pthread_mutex_unlock(&mutex2);
}
// Undefined behavior, potential deadlock
```

## Debugging Deadlocks

### GDB Deadlock Analysis

```bash
# Attach to hung process
gdb -p <pid>

# Show all threads
(gdb) info threads

# Get backtrace for each thread
(gdb) thread apply all bt

# Example output showing deadlock:
# Thread 2:
#   pthread_mutex_lock() <- waiting
#   function_a()
#
# Thread 3:
#   pthread_mutex_lock() <- waiting
#   function_b()
```

### Using pstack/gstack

```bash
# Show stack traces of all threads
pstack <pid>

# Output:
# Thread 2 (Thread 0x7f... (LWP 12345)):
# #0  __lll_lock_wait () at ...
# #1  pthread_mutex_lock ()
# #2  function_a ()
```

### Thread Sanitizer (TSan)

```bash
# Compile with TSan
gcc -fsanitize=thread -g program.c -o program

# Run and detect issues
./program

# TSan output for potential deadlock:
# WARNING: ThreadSanitizer: lock-order-inversion (potential deadlock)
#   Cycle in lock order graph:
#   Mutex M1 acquired here:
#     #0 pthread_mutex_lock
#     #1 function_a
#   Mutex M2 acquired here:
#     #0 pthread_mutex_lock
#     #1 function_a
#   ...
```

### Helgrind (Valgrind)

```bash
# Run with Helgrind
valgrind --tool=helgrind ./program

# Output:
# Thread #2: lock order "0x..." before "0x..." violated
# Observed order was: first M1 then M2
# Required order was: first M2 then M1
```

## Writing Deadlock Tests

### Stress Test

```c
#define NUM_THREADS 10
#define ITERATIONS 100000

void* stress_test(void* arg) {
    for (int i = 0; i < ITERATIONS; i++) {
        Account* a = &accounts[rand() % NUM_ACCOUNTS];
        Account* b = &accounts[rand() % NUM_ACCOUNTS];
        if (a != b) {
            transfer(a, b, rand() % 100);
        }
    }
    return NULL;
}

void run_stress_test() {
    pthread_t threads[NUM_THREADS];

    for (int i = 0; i < NUM_THREADS; i++) {
        pthread_create(&threads[i], NULL, stress_test, NULL);
    }

    // With timeout to detect hangs
    struct timespec timeout;
    clock_gettime(CLOCK_REALTIME, &timeout);
    timeout.tv_sec += 30;

    for (int i = 0; i < NUM_THREADS; i++) {
        int result = pthread_timedjoin_np(threads[i], NULL, &timeout);
        if (result == ETIMEDOUT) {
            printf("DEADLOCK DETECTED!\n");
            // Dump thread stacks
            exit(1);
        }
    }
}
```

### Controlled Race Condition

```c
// Force specific interleaving to trigger deadlock
pthread_barrier_t barrier;

void* thread_a(void* arg) {
    pthread_mutex_lock(&lock1);
    pthread_barrier_wait(&barrier);  // Sync point
    pthread_mutex_lock(&lock2);
    // ...
}

void* thread_b(void* arg) {
    pthread_mutex_lock(&lock2);
    pthread_barrier_wait(&barrier);  // Both reach here
    pthread_mutex_lock(&lock1);      // Both try cross-lock
    // ...
}

// This WILL deadlock due to forced interleaving
```

## Deadlock Analysis Checklist

```
□ Identify all locks/resources in the system
□ Document lock ordering requirements
□ Check for nested lock acquisition
□ Verify callbacks don't reacquire locks
□ Review condition variable usage
□ Test with thread sanitizers
□ Run stress tests with timeouts
□ Add deadlock detection in production
□ Document and enforce lock hierarchy
□ Consider lock-free alternatives
```

## Prevention Patterns

### Lock Hierarchy

```c
// Define hierarchy levels
typedef enum {
    LEVEL_GLOBAL = 0,
    LEVEL_MODULE = 1,
    LEVEL_OBJECT = 2
} LockLevel;

typedef struct {
    pthread_mutex_t mutex;
    LockLevel level;
} HierarchicalLock;

__thread int current_level = -1;

void hierarchical_lock(HierarchicalLock* lock) {
    assert(lock->level > current_level);
    pthread_mutex_lock(&lock->mutex);
    current_level = lock->level;
}
```

### RAII Lock Guard (C++)

```cpp
class LockGuard {
    std::mutex& m;
public:
    LockGuard(std::mutex& mutex) : m(mutex) {
        m.lock();
    }
    ~LockGuard() {
        m.unlock();  // Always releases, even on exception
    }
};

void safe_function() {
    LockGuard guard(mutex);
    // Work...
}  // Lock automatically released
```

## Summary

Deadlock examples teach recognition and prevention:
- Classic problems (dining philosophers, bank transfer) illustrate patterns
- Real incidents show consequences (Mars Pathfinder)
- Common patterns: nested locks, callbacks, lock upgrade
- Tools: GDB, pstack, TSan, Helgrind
- Testing: stress tests with timeouts
- Prevention: lock ordering, hierarchy, RAII
- Document lock dependencies explicitly
- Use sanitizers during development
- Consider lock-free alternatives when appropriate
