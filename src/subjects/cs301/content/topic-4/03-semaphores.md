---
id: cs301-t4-semaphores
title: "Semaphores"
order: 3
---

# Semaphores

Semaphores are powerful synchronization primitives that generalize mutex locks. This subtopic covers semaphore concepts, types, implementation, and classic usage patterns.

## Semaphore Concept

A **semaphore** S is an integer variable accessed through two atomic operations:

```c
wait(S) {       // Also called P(), down(), or acquire()
    while (S <= 0);  // Wait
    S--;
}

signal(S) {     // Also called V(), up(), or release()
    S++;
}
```

Originally defined by Dijkstra in 1965 (P = proberen/test, V = verhogen/increment).

## Types of Semaphores

### Binary Semaphore (Mutex)

Value is 0 or 1, used for mutual exclusion:

```c
semaphore mutex = 1;

// Process 1             // Process 2
wait(mutex);            wait(mutex);
// critical section     // critical section
signal(mutex);          signal(mutex);
```

### Counting Semaphore

Value can be any non-negative integer, used to control access to resources with multiple instances:

```c
semaphore resources = N;  // N available resources

void use_resource() {
    wait(resources);      // Acquire one resource
    // Use resource
    signal(resources);    // Release resource
}
```

## Semaphore Implementation

### Busy-Wait Implementation

```c
typedef struct {
    int value;
    spinlock_t lock;
} semaphore_t;

void sem_init(semaphore_t* s, int initial) {
    s->value = initial;
    spinlock_init(&s->lock);
}

void sem_wait(semaphore_t* s) {
    while (1) {
        spinlock_acquire(&s->lock);
        if (s->value > 0) {
            s->value--;
            spinlock_release(&s->lock);
            return;
        }
        spinlock_release(&s->lock);
        // Keep trying (busy-wait)
    }
}

void sem_signal(semaphore_t* s) {
    spinlock_acquire(&s->lock);
    s->value++;
    spinlock_release(&s->lock);
}
```

### Blocking Implementation

```c
typedef struct {
    int value;
    queue_t waiting;
    spinlock_t lock;
} semaphore_t;

void sem_wait(semaphore_t* s) {
    spinlock_acquire(&s->lock);
    s->value--;

    if (s->value < 0) {
        // Add current thread to wait queue
        queue_add(&s->waiting, current_thread());
        spinlock_release(&s->lock);
        thread_block();
    } else {
        spinlock_release(&s->lock);
    }
}

void sem_signal(semaphore_t* s) {
    spinlock_acquire(&s->lock);
    s->value++;

    if (s->value <= 0) {
        // Wake up one waiting thread
        thread_t* t = queue_remove(&s->waiting);
        thread_wakeup(t);
    }

    spinlock_release(&s->lock);
}
```

Note: With blocking implementation, negative value = number of waiting threads.

## POSIX Semaphores

### Named Semaphores (Inter-Process)

```c
#include <semaphore.h>
#include <fcntl.h>

// Create/open named semaphore
sem_t* sem = sem_open("/my_semaphore", O_CREAT, 0644, 1);

sem_wait(sem);      // Decrement
// Critical section
sem_post(sem);      // Increment

sem_close(sem);
sem_unlink("/my_semaphore");
```

### Unnamed Semaphores (Thread-Local)

```c
#include <semaphore.h>

sem_t sem;

int main() {
    // 0 = shared between threads (not processes)
    // 1 = initial value
    sem_init(&sem, 0, 1);

    // Use semaphore
    sem_wait(&sem);
    // Critical section
    sem_post(&sem);

    sem_destroy(&sem);
    return 0;
}
```

### Non-Blocking and Timed Operations

```c
// Try wait (non-blocking)
if (sem_trywait(&sem) == 0) {
    // Semaphore acquired
    sem_post(&sem);
} else {
    // Would have blocked
}

// Timed wait
struct timespec timeout;
clock_gettime(CLOCK_REALTIME, &timeout);
timeout.tv_sec += 5;

if (sem_timedwait(&sem, &timeout) == 0) {
    // Acquired within timeout
    sem_post(&sem);
} else {
    // Timeout expired
}

// Get current value
int value;
sem_getvalue(&sem, &value);
printf("Semaphore value: %d\n", value);
```

## Semaphore Usage Patterns

### Mutual Exclusion

```c
sem_t mutex;
sem_init(&mutex, 0, 1);

void critical_section() {
    sem_wait(&mutex);
    // Only one thread at a time
    sem_post(&mutex);
}
```

### Resource Pool

```c
#define POOL_SIZE 10
sem_t pool;
resource_t resources[POOL_SIZE];

void init() {
    sem_init(&pool, 0, POOL_SIZE);
}

resource_t* get_resource() {
    sem_wait(&pool);  // Block if none available
    return allocate_from_pool();
}

void release_resource(resource_t* r) {
    return_to_pool(r);
    sem_post(&pool);
}
```

### Signaling/Synchronization

```c
sem_t ready;
sem_init(&ready, 0, 0);

// Thread A: Producer
void producer() {
    produce_data();
    sem_post(&ready);  // Signal data is ready
}

// Thread B: Consumer
void consumer() {
    sem_wait(&ready);  // Wait for data
    consume_data();
}
```

### Ordering Constraints

```c
sem_t s1, s2;
sem_init(&s1, 0, 0);
sem_init(&s2, 0, 0);

// Thread A
void thread_a() {
    do_A1();
    sem_post(&s1);    // A1 done
    sem_wait(&s2);    // Wait for B1
    do_A2();
}

// Thread B
void thread_b() {
    do_B1();
    sem_post(&s2);    // B1 done
    sem_wait(&s1);    // Wait for A1
    do_B2();
}

// Execution order: A1 and B1 can be parallel
//                  A2 happens after B1
//                  B2 happens after A1
```

### Bounded Buffer (Producer-Consumer)

```c
#define BUFFER_SIZE 10

int buffer[BUFFER_SIZE];
int in = 0, out = 0;

sem_t empty;    // Count of empty slots
sem_t full;     // Count of full slots
sem_t mutex;    // Mutual exclusion

void init() {
    sem_init(&empty, 0, BUFFER_SIZE);
    sem_init(&full, 0, 0);
    sem_init(&mutex, 0, 1);
}

void producer(int item) {
    sem_wait(&empty);     // Wait for empty slot
    sem_wait(&mutex);     // Enter critical section

    buffer[in] = item;
    in = (in + 1) % BUFFER_SIZE;

    sem_post(&mutex);     // Exit critical section
    sem_post(&full);      // Signal item available
}

int consumer() {
    sem_wait(&full);      // Wait for item
    sem_wait(&mutex);     // Enter critical section

    int item = buffer[out];
    out = (out + 1) % BUFFER_SIZE;

    sem_post(&mutex);     // Exit critical section
    sem_post(&empty);     // Signal slot available

    return item;
}
```

## Semaphore vs Mutex

| Aspect | Semaphore | Mutex |
|--------|-----------|-------|
| Value | Any non-negative | 0 or 1 |
| Ownership | No owner | Thread that locked |
| Release | Any thread can signal | Only owner can unlock |
| Use case | Signaling, resource counting | Mutual exclusion |
| Signal without wait | Valid (increases count) | Error |

## Common Semaphore Errors

### Incorrect Ordering

```c
// WRONG: Can cause deadlock
sem_wait(&mutex);
sem_wait(&empty);  // If buffer full, holds mutex forever!

// CORRECT: Wait for resource first
sem_wait(&empty);
sem_wait(&mutex);
```

### Forgetting to Signal

```c
void buggy_producer(int item) {
    sem_wait(&empty);
    sem_wait(&mutex);

    if (error_condition) {
        return;  // BUG: Semaphores not signaled!
    }

    buffer[in] = item;
    in = (in + 1) % BUFFER_SIZE;

    sem_post(&mutex);
    sem_post(&full);
}
```

### Double Wait/Signal

```c
// Thread accidentally waits twice
sem_wait(&sem);
sem_wait(&sem);  // Deadlock if binary semaphore!

// Or signals twice
sem_post(&sem);
sem_post(&sem);  // Counter semaphore > max intended
```

## Binary Semaphore vs Mutex

Although both can provide mutual exclusion, they have semantic differences:

```c
// Mutex: Same thread must lock and unlock
pthread_mutex_lock(&mutex);
// Only this thread can unlock
pthread_mutex_unlock(&mutex);

// Binary semaphore: Any thread can signal
sem_wait(&sem);
// Different thread can call sem_post(&sem)
```

Use cases:
- **Mutex**: Protecting critical sections
- **Binary semaphore**: Signaling between threads

## Summary

Semaphores are versatile synchronization primitives:
- Integer value with atomic wait/signal operations
- Binary semaphores (0/1) for mutual exclusion
- Counting semaphores for resource management
- wait() decrements and blocks if negative
- signal() increments and wakes waiting thread
- Classic patterns: producer-consumer, signaling, resource pools
- Order of semaphore operations matters for correctness
- Unlike mutexes, no ownership—any thread can signal
