# Mutex Locks

Mutex (mutual exclusion) locks are the simplest synchronization tools. This subtopic covers mutex concepts, implementation, and usage patterns.

## Mutex Concept

A **mutex** is a synchronization primitive that provides mutual exclusion to shared resources.

```c
// Basic mutex operations
mutex_lock(&mutex);     // Acquire lock (block if unavailable)
// Critical section
mutex_unlock(&mutex);   // Release lock
```

### Mutex Properties

1. **Binary state**: Locked or unlocked
2. **Ownership**: Only the thread that locked can unlock
3. **Blocking**: Threads wait if mutex is locked

```
Thread 1:    [lock]───[critical section]───[unlock]
Thread 2:         [lock]─────wait─────────[lock acquired]──[CS]──[unlock]
```

## Spinlock Implementation

A **spinlock** is a mutex where waiting threads "spin" (busy-wait):

```c
typedef struct {
    int flag;
} spinlock_t;

void spinlock_init(spinlock_t* lock) {
    lock->flag = 0;
}

void spinlock_acquire(spinlock_t* lock) {
    while (__sync_lock_test_and_set(&lock->flag, 1)) {
        // Spin until lock acquired
    }
}

void spinlock_release(spinlock_t* lock) {
    __sync_lock_release(&lock->flag);
}
```

### Spinlock with Pause Instruction

Reduce power consumption and improve performance:

```c
void spinlock_acquire(spinlock_t* lock) {
    while (__sync_lock_test_and_set(&lock->flag, 1)) {
        while (lock->flag) {
            __builtin_ia32_pause();  // CPU hint for spin-wait
        }
    }
}
```

### When to Use Spinlocks

**Good for:**
- Very short critical sections
- Multiprocessor systems
- Interrupt handlers (can't sleep)

**Bad for:**
- Long critical sections
- Single processor (wastes entire time slice)
- User-space applications (usually)

## Blocking Mutex Implementation

A **blocking mutex** puts waiting threads to sleep:

```c
typedef struct {
    int locked;
    queue_t wait_queue;
    spinlock_t guard;  // Protect internal state
} mutex_t;

void mutex_init(mutex_t* m) {
    m->locked = 0;
    queue_init(&m->wait_queue);
    spinlock_init(&m->guard);
}

void mutex_lock(mutex_t* m) {
    spinlock_acquire(&m->guard);

    if (m->locked) {
        // Add current thread to wait queue
        queue_add(&m->wait_queue, current_thread());
        spinlock_release(&m->guard);
        thread_sleep();  // Block
    } else {
        m->locked = 1;
        spinlock_release(&m->guard);
    }
}

void mutex_unlock(mutex_t* m) {
    spinlock_acquire(&m->guard);

    if (!queue_empty(&m->wait_queue)) {
        // Wake up first waiting thread
        thread_t* t = queue_remove(&m->wait_queue);
        thread_wakeup(t);
    } else {
        m->locked = 0;
    }

    spinlock_release(&m->guard);
}
```

## POSIX Mutex (pthread_mutex)

### Basic Usage

```c
#include <pthread.h>

pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;

void* thread_function(void* arg) {
    pthread_mutex_lock(&mutex);
    // Critical section
    pthread_mutex_unlock(&mutex);
    return NULL;
}
```

### Dynamic Initialization

```c
pthread_mutex_t mutex;
pthread_mutexattr_t attr;

pthread_mutexattr_init(&attr);
pthread_mutexattr_settype(&attr, PTHREAD_MUTEX_RECURSIVE);
pthread_mutex_init(&mutex, &attr);
pthread_mutexattr_destroy(&attr);

// Later...
pthread_mutex_destroy(&mutex);
```

### Mutex Types

```c
// Normal mutex - undefined behavior if:
// - Thread tries to relock
// - Thread unlocks mutex it doesn't own
pthread_mutexattr_settype(&attr, PTHREAD_MUTEX_NORMAL);

// Error-checking mutex - returns error instead of undefined behavior
pthread_mutexattr_settype(&attr, PTHREAD_MUTEX_ERRORCHECK);

// Recursive mutex - can be locked multiple times by same thread
pthread_mutexattr_settype(&attr, PTHREAD_MUTEX_RECURSIVE);
```

### Recursive Mutex

```c
pthread_mutex_t recursive_mutex;
pthread_mutexattr_t attr;

pthread_mutexattr_init(&attr);
pthread_mutexattr_settype(&attr, PTHREAD_MUTEX_RECURSIVE);
pthread_mutex_init(&recursive_mutex, &attr);

void function_a() {
    pthread_mutex_lock(&recursive_mutex);
    // Can call function_b which also locks
    function_b();
    pthread_mutex_unlock(&recursive_mutex);
}

void function_b() {
    pthread_mutex_lock(&recursive_mutex);  // Same thread - OK
    // Do something
    pthread_mutex_unlock(&recursive_mutex);
}
```

### Try Lock and Timed Lock

```c
// Non-blocking lock attempt
if (pthread_mutex_trylock(&mutex) == 0) {
    // Lock acquired
    pthread_mutex_unlock(&mutex);
} else {
    // Lock not available
}

// Timed lock attempt
struct timespec timeout;
clock_gettime(CLOCK_REALTIME, &timeout);
timeout.tv_sec += 5;  // 5 second timeout

if (pthread_mutex_timedlock(&mutex, &timeout) == 0) {
    // Lock acquired
    pthread_mutex_unlock(&mutex);
} else {
    // Timeout expired
}
```

## Mutex Usage Patterns

### Protecting Shared Data

```c
typedef struct {
    int balance;
    pthread_mutex_t lock;
} BankAccount;

void deposit(BankAccount* account, int amount) {
    pthread_mutex_lock(&account->lock);
    account->balance += amount;
    pthread_mutex_unlock(&account->lock);
}

void withdraw(BankAccount* account, int amount) {
    pthread_mutex_lock(&account->lock);
    if (account->balance >= amount) {
        account->balance -= amount;
    }
    pthread_mutex_unlock(&account->lock);
}
```

### RAII-Style Lock Guard (C++)

```cpp
#include <mutex>

std::mutex mtx;

void safe_function() {
    std::lock_guard<std::mutex> lock(mtx);
    // Critical section
    // Mutex automatically released when lock goes out of scope
}

void with_explicit_unlock() {
    std::unique_lock<std::mutex> lock(mtx);
    // Can manually unlock if needed
    lock.unlock();
    // Do non-critical work
    lock.lock();
    // Back in critical section
}
```

### Coarse-Grained vs Fine-Grained Locking

```c
// Coarse-grained: One lock for entire structure
typedef struct {
    int data[1000];
    pthread_mutex_t lock;
} CoarseArray;

void coarse_update(CoarseArray* arr, int index, int value) {
    pthread_mutex_lock(&arr->lock);
    arr->data[index] = value;
    pthread_mutex_unlock(&arr->lock);
}

// Fine-grained: Lock per element
typedef struct {
    int data[1000];
    pthread_mutex_t locks[1000];
} FineArray;

void fine_update(FineArray* arr, int index, int value) {
    pthread_mutex_lock(&arr->locks[index]);
    arr->data[index] = value;
    pthread_mutex_unlock(&arr->locks[index]);
}
```

Trade-offs:
- Coarse: Simpler, but limits concurrency
- Fine: More concurrency, but complex and memory overhead

## Common Mutex Errors

### Forgetting to Unlock

```c
void buggy_function(int condition) {
    pthread_mutex_lock(&mutex);

    if (condition) {
        return;  // BUG: Mutex not unlocked!
    }

    pthread_mutex_unlock(&mutex);
}

// Fixed version
void fixed_function(int condition) {
    pthread_mutex_lock(&mutex);

    if (condition) {
        pthread_mutex_unlock(&mutex);  // Always unlock
        return;
    }

    pthread_mutex_unlock(&mutex);
}
```

### Double Locking

```c
void thread_a() {
    pthread_mutex_lock(&mutex);
    pthread_mutex_lock(&mutex);  // Deadlock with normal mutex!
    pthread_mutex_unlock(&mutex);
    pthread_mutex_unlock(&mutex);
}
```

### Unlocking Mutex Not Owned

```c
// Thread 1
pthread_mutex_lock(&mutex);

// Thread 2
pthread_mutex_unlock(&mutex);  // Undefined behavior!
```

## Performance Considerations

### Adaptive Mutex

Combines spinning and blocking:

```c
void adaptive_mutex_lock(adaptive_mutex_t* m) {
    int spin_count = 0;

    while (spin_count < MAX_SPIN) {
        if (try_lock(m)) {
            return;  // Got lock
        }
        spin_count++;
    }

    // Fall back to blocking
    block_on_mutex(m);
}
```

### Lock Contention

```
Low contention:   Thread1 [lock]───[unlock]
                  Thread2           [lock]───[unlock]

High contention:  Thread1 [lock]───────────[unlock]
                  Thread2  [wait][wait][wait][lock]──[unlock]
                  Thread3   [wait][wait][wait][wait][lock]──
```

Reducing contention:
1. Keep critical sections short
2. Use fine-grained locking
3. Use lock-free algorithms when possible
4. Consider read-write locks for read-heavy workloads

## Summary

Mutex locks provide mutual exclusion for critical sections:
- Spinlocks busy-wait, good for short critical sections
- Blocking mutexes sleep, good for longer waits
- POSIX provides pthread_mutex with various types
- Recursive mutexes allow re-locking by same thread
- Proper usage requires always unlocking
- Lock granularity affects performance and complexity
- Adaptive approaches combine spinning and blocking
