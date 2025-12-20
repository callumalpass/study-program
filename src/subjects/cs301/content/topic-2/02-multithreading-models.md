---
id: cs301-t2-models
title: "Multithreading Models"
order: 2
---

# Multithreading Models

The relationship between user threads and kernel threads defines a multithreading model. This subtopic examines the three primary models and their tradeoffs.

## User Threads vs Kernel Threads

### User Threads

User threads are managed by a user-level thread library without kernel involvement:

```c
// User-level thread library (conceptual)
typedef struct {
    int id;
    void* stack;
    jmp_buf context;
    enum { READY, RUNNING, BLOCKED } state;
} UserThread;

UserThread* threads[MAX_THREADS];
int current_thread = 0;

void schedule() {
    int prev = current_thread;
    // Find next ready thread
    do {
        current_thread = (current_thread + 1) % num_threads;
    } while (threads[current_thread]->state != READY);

    // Context switch
    if (setjmp(threads[prev]->context) == 0) {
        longjmp(threads[current_thread]->context, 1);
    }
}
```

**Advantages**:
- Fast thread operations (no kernel mode switch)
- Customizable scheduling
- Portable across different operating systems

**Disadvantages**:
- One blocking call blocks entire process
- Cannot exploit multiple CPUs
- No preemption without explicit yields

### Kernel Threads

Kernel threads are managed directly by the operating system:

```c
// Linux creates kernel threads
#include <pthread.h>

// Each pthread maps to a kernel thread
pthread_t thread;
pthread_create(&thread, NULL, function, arg);

// Kernel sees and schedules the thread
```

**Advantages**:
- True parallelism on multiprocessors
- Blocking calls only block one thread
- Preemptive scheduling

**Disadvantages**:
- Slower thread operations (kernel mode switch)
- Limited by kernel resource constraints
- Less portable

## Many-to-One Model

Multiple user threads map to a single kernel thread:

```
User Space:
┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│ UT1 │ │ UT2 │ │ UT3 │ │ UT4 │
└──┬──┘ └──┬──┘ └──┬──┘ └──┬──┘
   │       │       │       │
   └───────┴───┬───┴───────┘
               │
          User Thread
          Library
               │
───────────────┼───────────────
               ↓
          ┌─────────┐
          │   KT    │
          │ (Kernel │
          │ Thread) │
          └─────────┘
Kernel Space
```

### Characteristics

- Thread management in user space (fast)
- Only one thread can access kernel at a time
- If one thread blocks in kernel, all block
- Cannot run threads in parallel on multiprocessor

### Example: Green Threads

Early Java used green threads:

```java
// Conceptual - old Java threading
class GreenThread extends Thread {
    // Thread library manages scheduling
    // JVM is single-threaded from kernel perspective
}
```

### Implementation Example

```c
// Many-to-one thread library
#include <ucontext.h>

#define MAX_THREADS 10
#define STACK_SIZE 8192

typedef struct {
    ucontext_t context;
    int finished;
} Thread;

Thread threads[MAX_THREADS];
int num_threads = 0;
int current = 0;
ucontext_t main_context;

void yield() {
    int prev = current;
    // Round-robin scheduling
    do {
        current = (current + 1) % num_threads;
    } while (threads[current].finished && current != prev);

    if (current != prev) {
        swapcontext(&threads[prev].context, &threads[current].context);
    }
}

int thread_create(void (*func)(void)) {
    Thread* t = &threads[num_threads];
    getcontext(&t->context);

    t->context.uc_stack.ss_sp = malloc(STACK_SIZE);
    t->context.uc_stack.ss_size = STACK_SIZE;
    t->context.uc_link = &main_context;
    t->finished = 0;

    makecontext(&t->context, func, 0);
    return num_threads++;
}
```

## One-to-One Model

Each user thread maps to a unique kernel thread:

```
User Space:
┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│ UT1 │ │ UT2 │ │ UT3 │ │ UT4 │
└──┬──┘ └──┬──┘ └──┬──┘ └──┬──┘
   │       │       │       │
───┼───────┼───────┼───────┼───
   ↓       ↓       ↓       ↓
┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│ KT1 │ │ KT2 │ │ KT3 │ │ KT4 │
└─────┘ └─────┘ └─────┘ └─────┘
Kernel Space
```

### Characteristics

- More concurrency than many-to-one
- One thread blocking doesn't affect others
- True parallel execution on multiprocessors
- Creating threads requires kernel call (overhead)
- Number of threads limited by kernel resources

### Examples

Modern implementations use one-to-one:
- Linux NPTL (Native POSIX Thread Library)
- Windows threads
- Modern macOS threads

```c
// Linux pthreads - one-to-one model
#include <pthread.h>
#include <unistd.h>
#include <sys/syscall.h>

void* thread_func(void* arg) {
    // Each pthread has corresponding kernel thread
    printf("User thread: %lu\n", pthread_self());
    printf("Kernel thread (LWP): %ld\n", syscall(SYS_gettid));
    return NULL;
}

int main() {
    pthread_t t1, t2;

    pthread_create(&t1, NULL, thread_func, NULL);
    pthread_create(&t2, NULL, thread_func, NULL);

    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
    return 0;
}
```

## Many-to-Many Model

Multiple user threads map to multiple kernel threads (M user threads to N kernel threads, where M ≥ N):

```
User Space:
┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│ UT1 │ │ UT2 │ │ UT3 │ │ UT4 │ │ UT5 │
└──┬──┘ └──┬──┘ └──┬──┘ └──┬──┘ └──┬──┘
   │       │       │       │       │
   └───┬───┴───┬───┴───┬───┴───┬───┘
       │       │       │       │
       │  User Thread Library  │
       │   (LWP Multiplexing)  │
       │       │       │       │
───────┼───────┼───────┼───────┼───────
       ↓       ↓       ↓       ↓
   ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
   │ KT1 │ │ KT2 │ │ KT3 │ │ KT4 │
   └─────┘ └─────┘ └─────┘ └─────┘
Kernel Space
```

### Characteristics

- Combines advantages of both models
- Create as many user threads as needed
- Kernel threads can run in parallel
- Blocking calls handled by scheduler
- Complex to implement

### Two-Level Model

Variation where specific user threads can be bound to kernel threads:

```c
// Solaris threads (conceptual)
thr_create(NULL, 0, func, arg,
           THR_BOUND,     // Bound: 1:1 mapping
           &tid);

thr_create(NULL, 0, func, arg,
           0,             // Unbound: M:N mapping
           &tid);
```

## Comparison

| Model | Parallelism | Blocking | Overhead | Complexity |
|-------|-------------|----------|----------|------------|
| Many-to-One | None | All block | Low | Low |
| One-to-One | Full | Individual | High | Low |
| Many-to-Many | Full | Individual | Medium | High |

## Modern Practice

Most systems use one-to-one due to:
- Simplicity of implementation
- Hardware improvements reducing kernel overhead
- Multicore processors requiring true parallelism
- Kernel optimizations (futexes, etc.)

```c
// Modern Linux - efficient one-to-one
#define _GNU_SOURCE
#include <pthread.h>
#include <sched.h>

void* cpu_intensive(void* arg) {
    // Can be scheduled on any CPU
    // Kernel handles load balancing
    while (!done) {
        compute();
    }
    return NULL;
}

int main() {
    int num_cpus = sysconf(_SC_NPROCESSORS_ONLN);
    pthread_t threads[num_cpus];

    for (int i = 0; i < num_cpus; i++) {
        pthread_create(&threads[i], NULL, cpu_intensive, NULL);
    }

    // True parallelism achieved
    for (int i = 0; i < num_cpus; i++) {
        pthread_join(threads[i], NULL);
    }
    return 0;
}
```

## Summary

Multithreading models define user-kernel thread relationship:
- Many-to-One: Fast but no parallelism or independent blocking
- One-to-One: Full parallelism but higher overhead per thread
- Many-to-Many: Flexible but complex to implement
- Modern systems favor one-to-one for simplicity and hardware support
- Choice affects scalability, responsiveness, and resource usage
