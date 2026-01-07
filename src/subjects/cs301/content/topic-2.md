# Threads and Concurrency

Threads enable programs to perform multiple tasks simultaneously within a single process. In this topic, you'll learn how threads differ from processes, how to create multithreaded programs, and the challenges of concurrent programming.

**Learning Objectives:**
- Distinguish between threads and processes
- Explain the benefits and challenges of multithreading
- Implement multithreaded programs using POSIX threads (pthreads)
- Compare user-level, kernel-level, and hybrid threading models
- Design effective thread pool architectures
- Identify and prevent common concurrency bugs

---

## Core Concepts

### What is a Thread?

A **thread** is the smallest unit of CPU execution. While a process is an independent execution environment, threads are lightweight execution units that share a process's resources.

```
Single-threaded Process:           Multithreaded Process:
┌─────────────────────────┐       ┌─────────────────────────┐
│      Code Section       │       │      Code Section       │
├─────────────────────────┤       ├─────────────────────────┤
│      Data Section       │       │      Data Section       │
├─────────────────────────┤       ├────────┬────────┬───────┤
│  Registers   │  Stack   │       │ Stack1 │ Stack2 │ Stack3│
│    PC        │          │       │  Reg1  │  Reg2  │  Reg3 │
└──────────────┴──────────┘       │  PC1   │  PC2   │  PC3  │
                                  └────────┴────────┴───────┘
       One execution unit              Three execution units
```

Each thread has its own:
- Thread ID
- Program counter
- Register set
- Stack

Threads share:
- Code section
- Data section (global variables)
- Open files and file descriptors
- Signal handlers

### Thread vs Process

| Aspect | Process | Thread |
|--------|---------|--------|
| Address space | Separate | Shared |
| Creation cost | ~10ms | ~0.1ms |
| Context switch | ~1000μs | ~1μs |
| Memory overhead | ~10MB | ~1MB |
| Communication | IPC required | Direct memory |
| Isolation | Crash is isolated | Crash affects all threads |

```c
// Process creation - duplicates entire address space
pid_t pid = fork();

// Thread creation - shares address space
pthread_t thread;
pthread_create(&thread, NULL, function, arg);
```

### Benefits of Multithreading

**1. Responsiveness** - Keep UI responsive while doing background work:
```c
void* download_file(void* url) {
    // Long network operation
    fetch_from_network((char*)url);
    return NULL;
}

// Main thread stays responsive
pthread_create(&worker, NULL, download_file, url);
while (running) {
    handle_user_input();  // Never blocked by download
}
```

**2. Resource Sharing** - Threads naturally share process memory:
```c
int shared_data[1000];  // All threads can access

void* worker(void* arg) {
    shared_data[thread_id] = result;  // Direct access
    return NULL;
}
```

**3. Economy** - Thread operations are lightweight:
```c
// Creating 100 threads uses ~100MB
// Creating 100 processes uses ~1GB
```

**4. Scalability** - Leverage multiple CPU cores:
```c
#define NUM_CORES 8
pthread_t threads[NUM_CORES];
for (int i = 0; i < NUM_CORES; i++) {
    pthread_create(&threads[i], NULL, compute, &chunk[i]);
}
```

---

## Working with Pthreads

### Creating Threads

```c
#include <pthread.h>
#include <stdio.h>

void* thread_function(void* arg) {
    int id = *(int*)arg;
    printf("Thread %d running\n", id);
    return NULL;
}

int main() {
    pthread_t threads[3];
    int ids[3] = {1, 2, 3};

    for (int i = 0; i < 3; i++) {
        pthread_create(&threads[i], NULL, thread_function, &ids[i]);
    }

    for (int i = 0; i < 3; i++) {
        pthread_join(threads[i], NULL);
    }

    printf("All threads completed\n");
    return 0;
}
```

Compile with: `gcc -pthread program.c -o program`

### Thread Lifecycle

```c
pthread_t thread;

// 1. Create thread
int result = pthread_create(&thread, NULL, function, arg);
if (result != 0) {
    perror("Thread creation failed");
}

// 2. Thread executes function...

// 3. Wait for completion and get return value
void* return_value;
pthread_join(thread, &return_value);

// Alternative: Detach (no join needed)
pthread_detach(thread);
```

### Passing Data to Threads

```c
// Single value
int value = 42;
pthread_create(&thread, NULL, func, &value);

// Multiple values via struct
typedef struct {
    int id;
    char* name;
    double weight;
} ThreadArgs;

ThreadArgs args = {1, "worker", 3.14};
pthread_create(&thread, NULL, func, &args);

// In thread function
void* func(void* arg) {
    ThreadArgs* a = (ThreadArgs*)arg;
    printf("%d: %s (%.2f)\n", a->id, a->name, a->weight);
    return NULL;
}
```

### Returning Data from Threads

```c
void* compute(void* arg) {
    int* result = malloc(sizeof(int));
    *result = 42;
    return result;  // Return pointer to heap
}

int main() {
    pthread_t thread;
    pthread_create(&thread, NULL, compute, NULL);

    void* retval;
    pthread_join(thread, &retval);

    int* result = (int*)retval;
    printf("Result: %d\n", *result);
    free(result);
}
```

---

## Threading Models

### User-Level Threads

Managed entirely in user space by a thread library:

```
┌─────────────────────────────────────┐
│           User Space                │
│  ┌───────────────────────────────┐  │
│  │     Thread Library            │  │
│  │  ┌─────┐ ┌─────┐ ┌─────┐     │  │
│  │  │ T1  │ │ T2  │ │ T3  │     │  │
│  │  └─────┘ └─────┘ └─────┘     │  │
│  └───────────────────────────────┘  │
├─────────────────────────────────────┤
│           Kernel Space              │
│       ┌─────────────────┐           │
│       │  Single Kernel  │           │
│       │     Thread      │           │
│       └─────────────────┘           │
└─────────────────────────────────────┘
```

**Advantages:** Fast context switch, no kernel involvement
**Disadvantages:** One blocking call blocks all threads, can't use multiple CPUs

### Kernel-Level Threads

Managed directly by the operating system:

```
┌─────────────────────────────────────┐
│           User Space                │
│     ┌─────┐ ┌─────┐ ┌─────┐        │
│     │ T1  │ │ T2  │ │ T3  │        │
│     └──┬──┘ └──┬──┘ └──┬──┘        │
├────────┼───────┼───────┼────────────┤
│        ↓       ↓       ↓            │
│     ┌─────┐ ┌─────┐ ┌─────┐        │
│     │ KT1 │ │ KT2 │ │ KT3 │        │
│     └─────┘ └─────┘ └─────┘        │
│           Kernel Space              │
└─────────────────────────────────────┘
```

**Advantages:** True parallelism, blocking doesn't affect other threads
**Disadvantages:** Slower creation, higher overhead

### Hybrid Model (M:N)

Maps M user threads to N kernel threads:

```c
// User code sees M threads
pthread_create(&t1, ...);
pthread_create(&t2, ...);
pthread_create(&t3, ...);
pthread_create(&t4, ...);

// Kernel manages N threads (e.g., 2)
// Thread library multiplexes M onto N
```

Modern systems (Linux, macOS) typically use 1:1 model with optimizations.

---

## Thread Pools

### Why Use Thread Pools?

Creating threads is expensive. Thread pools maintain a set of reusable threads:

```c
#include <pthread.h>
#include <stdbool.h>

#define POOL_SIZE 4
#define QUEUE_SIZE 100

typedef struct {
    void (*function)(void*);
    void* arg;
} Task;

typedef struct {
    pthread_t workers[POOL_SIZE];
    Task queue[QUEUE_SIZE];
    int queue_head, queue_tail;
    pthread_mutex_t mutex;
    pthread_cond_t has_work;
    bool shutdown;
} ThreadPool;

void* worker(void* arg) {
    ThreadPool* pool = (ThreadPool*)arg;
    while (true) {
        pthread_mutex_lock(&pool->mutex);
        while (pool->queue_head == pool->queue_tail && !pool->shutdown) {
            pthread_cond_wait(&pool->has_work, &pool->mutex);
        }
        if (pool->shutdown) {
            pthread_mutex_unlock(&pool->mutex);
            break;
        }
        Task task = pool->queue[pool->queue_head++];
        pthread_mutex_unlock(&pool->mutex);

        task.function(task.arg);  // Execute task
    }
    return NULL;
}
```

### Thread Pool Benefits

1. **Reduced overhead**: Threads are reused, not created/destroyed per task
2. **Resource control**: Limit concurrent threads to prevent overload
3. **Improved latency**: Pre-created threads handle tasks immediately

---

## Common Patterns and Idioms

### Producer-Consumer Pattern

```c
#define BUFFER_SIZE 10
int buffer[BUFFER_SIZE];
int count = 0;
pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t not_empty = PTHREAD_COND_INITIALIZER;
pthread_cond_t not_full = PTHREAD_COND_INITIALIZER;

void* producer(void* arg) {
    for (int i = 0; i < 100; i++) {
        pthread_mutex_lock(&mutex);
        while (count == BUFFER_SIZE) {
            pthread_cond_wait(&not_full, &mutex);
        }
        buffer[count++] = produce_item();
        pthread_cond_signal(&not_empty);
        pthread_mutex_unlock(&mutex);
    }
    return NULL;
}

void* consumer(void* arg) {
    while (true) {
        pthread_mutex_lock(&mutex);
        while (count == 0) {
            pthread_cond_wait(&not_empty, &mutex);
        }
        int item = buffer[--count];
        pthread_cond_signal(&not_full);
        pthread_mutex_unlock(&mutex);
        consume_item(item);
    }
    return NULL;
}
```

### Fork-Join Pattern

```c
void parallel_sum(int* array, int n, int* result) {
    if (n < THRESHOLD) {
        *result = sequential_sum(array, n);
        return;
    }

    pthread_t thread;
    int left_result, right_result;

    // Fork: create thread for left half
    pthread_create(&thread, NULL, sum_worker,
                   &(SumArgs){array, n/2, &left_result});

    // This thread handles right half
    parallel_sum(array + n/2, n - n/2, &right_result);

    // Join: wait for left half
    pthread_join(thread, NULL);

    *result = left_result + right_result;
}
```

---

## Common Mistakes and Debugging

### Mistake 1: Race Conditions

```c
// Wrong - race condition
int counter = 0;
void* increment(void* arg) {
    for (int i = 0; i < 1000000; i++) {
        counter++;  // Not atomic!
    }
    return NULL;
}
// Two threads: expect 2,000,000, get less

// Correct - use mutex
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
void* safe_increment(void* arg) {
    for (int i = 0; i < 1000000; i++) {
        pthread_mutex_lock(&lock);
        counter++;
        pthread_mutex_unlock(&lock);
    }
    return NULL;
}
```

### Mistake 2: Passing Stack Variables

```c
// Wrong - variable goes out of scope
for (int i = 0; i < 5; i++) {
    pthread_create(&threads[i], NULL, func, &i);
    // All threads see same (or garbage) value!
}

// Correct - use array or heap allocation
int ids[5] = {0, 1, 2, 3, 4};
for (int i = 0; i < 5; i++) {
    pthread_create(&threads[i], NULL, func, &ids[i]);
}
```

### Mistake 3: Forgetting to Join

```c
// Wrong - program exits before threads finish
int main() {
    pthread_t thread;
    pthread_create(&thread, NULL, long_task, NULL);
    return 0;  // Main exits, threads killed!
}

// Correct - wait for threads
int main() {
    pthread_t thread;
    pthread_create(&thread, NULL, long_task, NULL);
    pthread_join(thread, NULL);  // Wait for completion
    return 0;
}
```

### Mistake 4: Deadlock

```c
// Wrong - circular wait
void* thread1(void*) {
    pthread_mutex_lock(&mutex_a);
    pthread_mutex_lock(&mutex_b);  // Waits for thread2
    // ...
}
void* thread2(void*) {
    pthread_mutex_lock(&mutex_b);
    pthread_mutex_lock(&mutex_a);  // Waits for thread1
    // DEADLOCK!
}

// Correct - consistent lock ordering
void* thread1(void*) {
    pthread_mutex_lock(&mutex_a);  // Always lock A first
    pthread_mutex_lock(&mutex_b);
    // ...
}
void* thread2(void*) {
    pthread_mutex_lock(&mutex_a);  // Same order
    pthread_mutex_lock(&mutex_b);
    // ...
}
```

---

## Best Practices

1. **Minimize shared state** - Less sharing means fewer synchronization issues

2. **Prefer immutable data** - Read-only data doesn't need synchronization

3. **Use thread pools** - Avoid creating threads repeatedly for short tasks

4. **Lock ordering** - Always acquire multiple locks in consistent order

5. **Keep critical sections short** - Hold locks for minimum time

6. **Prefer condition variables** over busy-waiting:
```c
// Wrong - busy wait
while (!condition) { /* spin */ }

// Correct - condition variable
pthread_mutex_lock(&mutex);
while (!condition) {
    pthread_cond_wait(&cond, &mutex);
}
pthread_mutex_unlock(&mutex);
```

7. **Use thread-safe libraries** or protect library calls with mutexes

---

## Summary

You've learned the fundamentals of threads and concurrent programming:

- **Threads vs Processes**: Threads share memory, processes don't
- **Benefits**: Responsiveness, resource sharing, economy, scalability
- **Pthreads API**: Create, join, detach threads; pass and return data
- **Threading Models**: User-level (fast), kernel-level (parallel), hybrid
- **Thread Pools**: Reuse threads for better performance
- **Common Bugs**: Race conditions, deadlocks, memory issues

**Key takeaways:**
- Threads are lightweight but share memory, requiring careful synchronization
- Use mutexes and condition variables to protect shared data
- Thread pools improve performance for many short tasks
- Always acquire locks in consistent order to prevent deadlock

---

## Further Exploration

Ready to go deeper? Explore:
- Thread sanitizers: `gcc -fsanitize=thread` to detect races
- Lock-free data structures using atomic operations
- Compare `pthread_spinlock_t` vs `pthread_mutex_t` performance
- Study OpenMP for simplified parallel programming
- Explore async/await patterns in higher-level languages
