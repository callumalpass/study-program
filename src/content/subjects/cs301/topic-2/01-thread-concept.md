# Thread Concept

Threads are the basic unit of CPU utilization within a process. This subtopic introduces threads, their benefits, and comparison with processes.

## What is a Thread?

A **thread** (or lightweight process) is a basic unit of CPU utilization consisting of:
- Thread ID
- Program counter
- Register set
- Stack

Threads belonging to the same process share:
- Code section
- Data section
- Open files
- Signals

```
Single-threaded Process:        Multithreaded Process:
┌─────────────────────┐        ┌─────────────────────┐
│    Code Section     │        │    Code Section     │
├─────────────────────┤        ├─────────────────────┤
│    Data Section     │        │    Data Section     │
├─────────────────────┤        ├──────┬──────┬──────┤
│ Registers │ Stack   │        │Stack1│Stack2│Stack3│
│     PC    │         │        │ Reg1 │ Reg2 │ Reg3 │
└───────────┴─────────┘        │ PC1  │ PC2  │ PC3  │
                               └──────┴──────┴──────┘
    One thread                    Three threads
```

## Thread vs Process

| Aspect | Process | Thread |
|--------|---------|--------|
| Address space | Own address space | Shared with other threads |
| Creation time | Slower (memory allocation) | Faster (share parent's memory) |
| Communication | IPC required | Direct memory access |
| Context switch | Expensive (TLB flush) | Cheaper (same address space) |
| Crash | Isolated | Affects entire process |
| Resources | Own file descriptors | Shared file descriptors |

```c
// Creating a process
pid_t pid = fork();  // Duplicates entire address space

// Creating a thread
pthread_t thread;
pthread_create(&thread, NULL, function, arg);  // Shares address space
```

## Benefits of Multithreading

### 1. Responsiveness

User interface remains responsive while background tasks execute:

```c
void* background_task(void* arg) {
    // Long computation or I/O
    process_large_file();
    return NULL;
}

int main() {
    pthread_t worker;
    pthread_create(&worker, NULL, background_task, NULL);

    // Main thread continues handling user input
    while (running) {
        handle_user_input();
        update_display();
    }

    pthread_join(worker, NULL);
    return 0;
}
```

### 2. Resource Sharing

Threads naturally share process resources:

```c
// Shared data - no IPC needed
int shared_counter = 0;
pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;

void* increment(void* arg) {
    for (int i = 0; i < 100000; i++) {
        pthread_mutex_lock(&mutex);
        shared_counter++;
        pthread_mutex_unlock(&mutex);
    }
    return NULL;
}
```

### 3. Economy

Thread operations are more economical than process operations:

```
Operation          | Process    | Thread
-------------------|------------|--------
Creation           | ~10 ms     | ~0.1 ms
Context switch     | ~1000 μs   | ~1 μs
Memory overhead    | ~10 MB     | ~1 MB
```

### 4. Scalability

Threads can run in parallel on multiprocessor systems:

```c
// Parallel computation
void* compute_chunk(void* arg) {
    int chunk = *(int*)arg;
    int start = chunk * CHUNK_SIZE;
    int end = start + CHUNK_SIZE;

    for (int i = start; i < end; i++) {
        results[i] = expensive_computation(data[i]);
    }
    return NULL;
}

int main() {
    pthread_t threads[NUM_CPUS];
    int chunk_ids[NUM_CPUS];

    // Create threads for each CPU
    for (int i = 0; i < NUM_CPUS; i++) {
        chunk_ids[i] = i;
        pthread_create(&threads[i], NULL, compute_chunk, &chunk_ids[i]);
    }

    // Wait for all to complete
    for (int i = 0; i < NUM_CPUS; i++) {
        pthread_join(threads[i], NULL);
    }
    return 0;
}
```

## Challenges of Multithreading

### Race Conditions

```c
// Unsafe: race condition
int counter = 0;

void* unsafe_increment(void* arg) {
    for (int i = 0; i < 1000000; i++) {
        counter++;  // Not atomic!
        // Read counter, increment, write back can interleave
    }
    return NULL;
}

// Result: counter < 2000000 (some increments lost)
```

### Deadlock

```c
pthread_mutex_t mutex_a, mutex_b;

void* thread1(void* arg) {
    pthread_mutex_lock(&mutex_a);
    sleep(1);
    pthread_mutex_lock(&mutex_b);  // Waits for thread2
    // ...
}

void* thread2(void* arg) {
    pthread_mutex_lock(&mutex_b);
    sleep(1);
    pthread_mutex_lock(&mutex_a);  // Waits for thread1
    // DEADLOCK!
}
```

### Data Races

```c
// Data race: concurrent access without synchronization
int data = 0;

void* writer(void* arg) {
    data = 42;  // Write
    return NULL;
}

void* reader(void* arg) {
    printf("%d\n", data);  // Read - undefined value
    return NULL;
}
```

## Thread States

Similar to processes, threads have states:

```
       ┌─────────────────────────────────┐
       │                                 │
       ↓              ready              │
   ┌───────┐    ┌───────────────────┐    │
   │  New  │───→│      Ready        │────┤
   └───────┘    └─────────┬─────────┘    │
                          │              │
              dispatched  │              │ preempted
                          ↓              │
                    ┌───────────┐        │
                    │  Running  │────────┘
                    └─────┬─────┘
                          │
             ┌────────────┼────────────┐
             │            │            │
       exit  │      wait  │      block │
             ↓            ↓            ↓
       ┌──────────┐  ┌─────────┐  ┌─────────┐
       │Terminated│  │ Joined  │  │ Blocked │
       └──────────┘  └─────────┘  └─────────┘
```

## Thread Types

### User-Level Threads

Managed by thread library, kernel unaware:
- Fast creation and context switch
- One blocking call blocks all threads
- Cannot utilize multiple processors

### Kernel-Level Threads

Managed directly by OS kernel:
- Kernel schedules threads individually
- One blocking thread doesn't block others
- Can run on multiple processors
- More overhead

### Hybrid (M:N)

Multiple user threads map to multiple kernel threads:
- Balance of flexibility and performance
- Complex to implement

## Thread Identification

```c
#include <pthread.h>
#include <stdio.h>

void* thread_function(void* arg) {
    pthread_t tid = pthread_self();
    printf("Thread ID: %lu\n", (unsigned long)tid);
    return NULL;
}

int main() {
    pthread_t thread;
    pthread_create(&thread, NULL, thread_function, NULL);

    printf("Main thread ID: %lu\n", (unsigned long)pthread_self());
    printf("Created thread ID: %lu\n", (unsigned long)thread);

    pthread_join(thread, NULL);
    return 0;
}
```

## Summary

Threads provide lightweight concurrency within a process:
- Share address space but have own registers and stack
- Faster to create and switch than processes
- Enable responsiveness, resource sharing, and parallelism
- Introduce synchronization challenges (races, deadlocks)
- Can be user-level, kernel-level, or hybrid
- Fundamental to modern application development
