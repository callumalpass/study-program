# Synchronization

When multiple threads share data, chaos can ensue. One thread reads while another writes, values get lost, and programs produce wrong results. In this topic, you'll learn the tools to tame concurrent access: locks, semaphores, monitors, and condition variables.

**Learning Objectives:**
- Identify race conditions and critical sections in concurrent code
- Apply the three criteria for critical section solutions
- Implement mutual exclusion using mutexes and semaphores
- Solve classic synchronization problems
- Use condition variables for thread coordination
- Design monitor-based solutions

---

## Core Concepts

### The Race Condition Problem

A **race condition** occurs when the outcome depends on the timing of concurrent operations:

```c
// Shared counter
int counter = 0;

void* increment(void* arg) {
    for (int i = 0; i < 1000000; i++) {
        counter++;  // NOT ATOMIC!
    }
    return NULL;
}

// Two threads running increment()
// Expected: counter = 2,000,000
// Actual: counter < 2,000,000 (some increments lost)
```

**Why does this happen?** `counter++` is actually three operations:

```
Thread A               Thread B
─────────────────────────────────────────
load counter (0)
                       load counter (0)
add 1 (result: 1)
                       add 1 (result: 1)
store counter (1)
                       store counter (1)

Result: counter = 1, not 2!
```

### Critical Sections

A **critical section** is a code segment that accesses shared resources:

```c
// Entry section (acquire lock)
    // CRITICAL SECTION - access shared data
// Exit section (release lock)
// Remainder section
```

A correct solution must satisfy three properties:

1. **Mutual Exclusion**: Only one thread in the critical section at a time
2. **Progress**: If no thread is in CS, waiting threads can enter without delay
3. **Bounded Waiting**: Limit on how many times other threads can enter while one waits

### Hardware Support

Modern CPUs provide atomic instructions:

```c
// Test-and-Set (atomic)
bool test_and_set(bool* target) {
    bool old = *target;
    *target = true;
    return old;  // All happens atomically
}

// Compare-and-Swap (atomic)
bool compare_and_swap(int* ptr, int expected, int new_value) {
    if (*ptr == expected) {
        *ptr = new_value;
        return true;
    }
    return false;  // All happens atomically
}

// Simple spinlock using test-and-set
void acquire(bool* lock) {
    while (test_and_set(lock)) {
        // Busy wait (spin)
    }
}

void release(bool* lock) {
    *lock = false;
}
```

---

## Mutex Locks

A **mutex** (mutual exclusion) is the simplest synchronization primitive:

```c
#include <pthread.h>

pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
int shared_data = 0;

void* safe_increment(void* arg) {
    for (int i = 0; i < 1000000; i++) {
        pthread_mutex_lock(&lock);
        shared_data++;          // Critical section
        pthread_mutex_unlock(&lock);
    }
    return NULL;
}
```

### Mutex Operations

```c
// Initialize
pthread_mutex_t mutex;
pthread_mutex_init(&mutex, NULL);

// Or use static initializer
pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;

// Lock (blocks if already locked)
pthread_mutex_lock(&mutex);

// Try to lock (non-blocking)
if (pthread_mutex_trylock(&mutex) == 0) {
    // Got the lock
} else {
    // Lock held by another thread
}

// Unlock
pthread_mutex_unlock(&mutex);

// Destroy
pthread_mutex_destroy(&mutex);
```

### Mutex Best Practices

```c
// Always pair lock/unlock
pthread_mutex_lock(&mutex);
// ... critical section ...
pthread_mutex_unlock(&mutex);  // Don't forget!

// Handle errors that might skip unlock
pthread_mutex_lock(&mutex);
if (error_condition) {
    pthread_mutex_unlock(&mutex);  // Unlock before early return!
    return ERROR;
}
// ... rest of critical section ...
pthread_mutex_unlock(&mutex);
```

---

## Semaphores

A **semaphore** is an integer counter with two atomic operations:

- **wait(S)** (or P, down): Decrement S; if S < 0, block
- **signal(S)** (or V, up): Increment S; wake a blocked thread if any

```c
#include <semaphore.h>

sem_t sem;
sem_init(&sem, 0, 1);  // Initial value 1 (binary semaphore)

// Wait (decrement)
sem_wait(&sem);  // Blocks if value is 0

// Signal (increment)
sem_post(&sem);  // Wakes a waiting thread
```

### Binary Semaphore (Mutex Equivalent)

```c
sem_t mutex;
sem_init(&mutex, 0, 1);  // Value 1 = unlocked

void* worker(void* arg) {
    sem_wait(&mutex);    // Enter critical section
    // ... access shared resource ...
    sem_post(&mutex);    // Exit critical section
    return NULL;
}
```

### Counting Semaphore (Resource Pool)

```c
#define MAX_CONNECTIONS 5
sem_t conn_pool;
sem_init(&conn_pool, 0, MAX_CONNECTIONS);

void* handle_request(void* arg) {
    sem_wait(&conn_pool);  // Acquire connection (blocks if none)

    Connection* conn = get_connection();
    process_request(conn);
    release_connection(conn);

    sem_post(&conn_pool);  // Release connection
    return NULL;
}
```

### Semaphores for Signaling

```c
sem_t ready;
sem_init(&ready, 0, 0);  // Start at 0

void* producer(void* arg) {
    produce_data();
    sem_post(&ready);  // Signal: data is ready
    return NULL;
}

void* consumer(void* arg) {
    sem_wait(&ready);  // Wait until data ready
    consume_data();
    return NULL;
}
```

---

## Condition Variables

Condition variables let threads wait for specific conditions:

```c
pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t cond = PTHREAD_COND_INITIALIZER;
bool data_ready = false;

void* producer(void* arg) {
    pthread_mutex_lock(&mutex);
    produce_data();
    data_ready = true;
    pthread_cond_signal(&cond);  // Wake one waiter
    pthread_mutex_unlock(&mutex);
    return NULL;
}

void* consumer(void* arg) {
    pthread_mutex_lock(&mutex);
    while (!data_ready) {  // Always use while, not if!
        pthread_cond_wait(&cond, &mutex);
    }
    consume_data();
    pthread_mutex_unlock(&mutex);
    return NULL;
}
```

### Why Use `while` Instead of `if`?

```c
// WRONG - may miss spurious wakeups
if (!condition) {
    pthread_cond_wait(&cond, &mutex);
}

// CORRECT - re-check after waking
while (!condition) {
    pthread_cond_wait(&cond, &mutex);
}
```

**Spurious wakeups** can occur—always re-check the condition.

### Condition Variable Operations

```c
// Wait for condition (releases mutex while waiting)
pthread_cond_wait(&cond, &mutex);

// Wait with timeout
struct timespec timeout;
clock_gettime(CLOCK_REALTIME, &timeout);
timeout.tv_sec += 5;  // 5 second timeout
pthread_cond_timedwait(&cond, &mutex, &timeout);

// Signal one waiter
pthread_cond_signal(&cond);

// Signal all waiters
pthread_cond_broadcast(&cond);
```

---

## Classic Synchronization Problems

### Producer-Consumer (Bounded Buffer)

```c
#define BUFFER_SIZE 10

int buffer[BUFFER_SIZE];
int in = 0, out = 0, count = 0;

pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t not_full = PTHREAD_COND_INITIALIZER;
pthread_cond_t not_empty = PTHREAD_COND_INITIALIZER;

void* producer(void* arg) {
    while (true) {
        int item = produce();

        pthread_mutex_lock(&mutex);
        while (count == BUFFER_SIZE) {
            pthread_cond_wait(&not_full, &mutex);
        }

        buffer[in] = item;
        in = (in + 1) % BUFFER_SIZE;
        count++;

        pthread_cond_signal(&not_empty);
        pthread_mutex_unlock(&mutex);
    }
}

void* consumer(void* arg) {
    while (true) {
        pthread_mutex_lock(&mutex);
        while (count == 0) {
            pthread_cond_wait(&not_empty, &mutex);
        }

        int item = buffer[out];
        out = (out + 1) % BUFFER_SIZE;
        count--;

        pthread_cond_signal(&not_full);
        pthread_mutex_unlock(&mutex);

        consume(item);
    }
}
```

### Readers-Writers Problem

Multiple readers can access simultaneously, but writers need exclusive access:

```c
int read_count = 0;
pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;
pthread_mutex_t write_lock = PTHREAD_MUTEX_INITIALIZER;

void* reader(void* arg) {
    while (true) {
        pthread_mutex_lock(&mutex);
        read_count++;
        if (read_count == 1) {
            pthread_mutex_lock(&write_lock);  // First reader blocks writers
        }
        pthread_mutex_unlock(&mutex);

        // Read shared data (multiple readers OK)

        pthread_mutex_lock(&mutex);
        read_count--;
        if (read_count == 0) {
            pthread_mutex_unlock(&write_lock);  // Last reader releases
        }
        pthread_mutex_unlock(&mutex);
    }
}

void* writer(void* arg) {
    while (true) {
        pthread_mutex_lock(&write_lock);
        // Write shared data (exclusive access)
        pthread_mutex_unlock(&write_lock);
    }
}
```

**Note:** This solution favors readers—writers may starve.

### Dining Philosophers

Five philosophers sit at a table with five forks. Each needs two forks to eat:

```c
#define N 5
pthread_mutex_t forks[N];

void* philosopher(void* arg) {
    int id = *(int*)arg;
    int left = id;
    int right = (id + 1) % N;

    while (true) {
        think();

        // Prevent deadlock: one philosopher picks right first
        if (id == N - 1) {
            pthread_mutex_lock(&forks[right]);
            pthread_mutex_lock(&forks[left]);
        } else {
            pthread_mutex_lock(&forks[left]);
            pthread_mutex_lock(&forks[right]);
        }

        eat();

        pthread_mutex_unlock(&forks[left]);
        pthread_mutex_unlock(&forks[right]);
    }
}
```

---

## Common Mistakes and Debugging

### Mistake 1: Forgetting to Unlock

```c
// WRONG - lock never released on error
pthread_mutex_lock(&mutex);
if (error) {
    return ERROR;  // Mutex still held!
}
pthread_mutex_unlock(&mutex);

// CORRECT - always unlock
pthread_mutex_lock(&mutex);
if (error) {
    pthread_mutex_unlock(&mutex);
    return ERROR;
}
pthread_mutex_unlock(&mutex);
```

### Mistake 2: Using `if` Instead of `while`

```c
// WRONG - may proceed with false condition
pthread_mutex_lock(&mutex);
if (!ready) {
    pthread_cond_wait(&cond, &mutex);
}
// ready might be false due to spurious wakeup!

// CORRECT - always re-check
pthread_mutex_lock(&mutex);
while (!ready) {
    pthread_cond_wait(&cond, &mutex);
}
// ready is definitely true here
```

### Mistake 3: Signal Before Condition Change

```c
// WRONG - signal before setting condition
pthread_cond_signal(&cond);
ready = true;  // Waiter might check before this executes

// CORRECT - set condition, then signal
ready = true;
pthread_cond_signal(&cond);
```

### Mistake 4: Recursive Locking

```c
// WRONG - deadlock with regular mutex
pthread_mutex_lock(&mutex);
helper_function();  // Also tries to lock mutex!

// CORRECT - use recursive mutex if needed
pthread_mutexattr_t attr;
pthread_mutexattr_init(&attr);
pthread_mutexattr_settype(&attr, PTHREAD_MUTEX_RECURSIVE);
pthread_mutex_init(&mutex, &attr);
```

---

## Best Practices

1. **Keep critical sections short** - Hold locks for minimum time

2. **Lock at the right granularity:**
   - Coarse-grained: One lock for all data (simple but limits parallelism)
   - Fine-grained: Separate locks for separate data (complex but scalable)

3. **Acquire locks in consistent order** to prevent deadlock

4. **Prefer condition variables over busy-waiting:**
```c
// Bad - wastes CPU
while (!ready) { /* spin */ }

// Good - sleeps until signaled
while (!ready) { pthread_cond_wait(&cond, &mutex); }
```

5. **Use `pthread_cond_broadcast` when multiple threads might be waiting for same condition**

6. **Document lock ordering** when using multiple locks

7. **Consider lock-free alternatives** for high-contention scenarios

---

## Summary

You've learned the essential tools for synchronizing concurrent access:

- **Race Conditions**: Occur when shared data access isn't synchronized
- **Critical Section Requirements**: Mutual exclusion, progress, bounded waiting
- **Mutexes**: Simple binary locks for mutual exclusion
- **Semaphores**: Counting locks for signaling and resource management
- **Condition Variables**: Wait for specific conditions; always use with while loop
- **Classic Problems**: Producer-consumer, readers-writers, dining philosophers

**Key takeaways:**
- Race conditions cause subtle, hard-to-reproduce bugs
- Always protect shared data with appropriate synchronization
- Use `while`, not `if`, when waiting on conditions
- Design lock ordering to prevent deadlock

---

## Further Exploration

Ready to go deeper? Explore:
- Lock-free data structures using atomic operations
- Read-Copy-Update (RCU) in the Linux kernel
- Transactional memory concepts
- Thread sanitizers: `gcc -fsanitize=thread`
- Formal verification tools for concurrent code
