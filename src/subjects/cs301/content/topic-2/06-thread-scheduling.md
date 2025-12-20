# Thread Scheduling

Operating systems schedule threads for execution on available CPUs. This subtopic covers thread scheduling policies, priorities, and affinity.

## Thread Scheduling Concepts

### Scheduling Scope

**Process Contention Scope (PCS)**: User-level threads compete within the same process (many-to-one/many-to-many models):

```c
// PCS: Thread library schedules user threads onto LWPs
// Kernel unaware of user thread count
```

**System Contention Scope (SCS)**: Threads compete system-wide for CPU time (one-to-one model):

```c
// SCS: Kernel schedules all threads directly
// Standard in Linux pthreads
pthread_attr_setscope(&attr, PTHREAD_SCOPE_SYSTEM);
```

## Linux Thread Scheduling

### Scheduling Policies

Linux supports multiple scheduling policies:

```c
#include <sched.h>

// SCHED_OTHER (SCHED_NORMAL): Default time-sharing
// SCHED_FIFO: Real-time first-in-first-out
// SCHED_RR: Real-time round-robin
// SCHED_BATCH: CPU-intensive batch processing
// SCHED_IDLE: Very low priority background tasks
// SCHED_DEADLINE: Deadline-based real-time
```

### Setting Scheduling Policy

```c
#include <pthread.h>
#include <sched.h>

void set_thread_policy(pthread_t thread, int policy, int priority) {
    struct sched_param param;
    param.sched_priority = priority;

    int result = pthread_setschedparam(thread, policy, &param);
    if (result != 0) {
        perror("pthread_setschedparam");
    }
}

// Create thread with specific policy
void create_realtime_thread(pthread_t* thread,
                            void* (*func)(void*), void* arg) {
    pthread_attr_t attr;
    struct sched_param param;

    pthread_attr_init(&attr);

    // Set to real-time FIFO
    pthread_attr_setschedpolicy(&attr, SCHED_FIFO);
    param.sched_priority = 50;  // 1-99 for real-time
    pthread_attr_setschedparam(&attr, &param);

    // Must inherit scheduling attributes
    pthread_attr_setinheritsched(&attr, PTHREAD_EXPLICIT_SCHED);

    pthread_create(thread, &attr, func, arg);
    pthread_attr_destroy(&attr);
}
```

## Thread Priorities

### Priority Ranges

```c
int get_priority_range(int policy) {
    int min = sched_get_priority_min(policy);
    int max = sched_get_priority_max(policy);

    printf("Policy %d: priority range %d to %d\n",
           policy, min, max);
    return max - min;
}

// SCHED_OTHER: priority 0 (uses nice values instead)
// SCHED_FIFO: typically 1-99
// SCHED_RR: typically 1-99
```

### Nice Values

For SCHED_OTHER, use nice values (-20 to +19):

```c
#include <sys/resource.h>

void set_nice_value(int nice_val) {
    // Lower nice = higher priority
    // -20 = highest priority, +19 = lowest
    if (nice(nice_val) == -1 && errno != 0) {
        perror("nice");
    }
}

// Or use setpriority for any thread
void set_thread_priority(pid_t tid, int nice_val) {
    if (setpriority(PRIO_PROCESS, tid, nice_val) == -1) {
        perror("setpriority");
    }
}
```

## CPU Affinity

CPU affinity binds threads to specific processors:

### Setting Affinity

```c
#define _GNU_SOURCE
#include <sched.h>
#include <pthread.h>

void bind_to_cpu(pthread_t thread, int cpu) {
    cpu_set_t cpuset;
    CPU_ZERO(&cpuset);
    CPU_SET(cpu, &cpuset);

    int result = pthread_setaffinity_np(thread,
                                        sizeof(cpuset),
                                        &cpuset);
    if (result != 0) {
        perror("pthread_setaffinity_np");
    }
}

// Bind to multiple CPUs
void bind_to_cpus(pthread_t thread, int* cpus, int count) {
    cpu_set_t cpuset;
    CPU_ZERO(&cpuset);

    for (int i = 0; i < count; i++) {
        CPU_SET(cpus[i], &cpuset);
    }

    pthread_setaffinity_np(thread, sizeof(cpuset), &cpuset);
}
```

### Getting Affinity

```c
void print_affinity(pthread_t thread) {
    cpu_set_t cpuset;
    CPU_ZERO(&cpuset);

    pthread_getaffinity_np(thread, sizeof(cpuset), &cpuset);

    printf("Thread affinity: ");
    int num_cpus = sysconf(_SC_NPROCESSORS_ONLN);
    for (int i = 0; i < num_cpus; i++) {
        if (CPU_ISSET(i, &cpuset)) {
            printf("%d ", i);
        }
    }
    printf("\n");
}
```

### When to Use Affinity

```c
// Good use: Reduce cache misses
// Each thread processes its own data on specific CPU
void* worker(void* arg) {
    int cpu = *(int*)arg;
    bind_to_cpu(pthread_self(), cpu);

    // Process data that fits in this CPU's cache
    process_local_data(cpu);
    return NULL;
}

// Good use: Real-time with isolated CPUs
// Reserve CPUs for critical threads
void setup_realtime_thread(int dedicated_cpu) {
    pthread_t rt_thread;
    create_realtime_thread(&rt_thread, critical_work, NULL);
    bind_to_cpu(rt_thread, dedicated_cpu);
}
```

## Real-Time Scheduling

### SCHED_FIFO

First-in-first-out without time slicing:

```c
// FIFO thread runs until it:
// 1. Blocks (I/O, mutex, etc.)
// 2. Yields (sched_yield())
// 3. Is preempted by higher priority thread

void* fifo_thread(void* arg) {
    // Runs continuously until done or blocked
    while (!finished) {
        do_work();
        if (should_yield) {
            sched_yield();  // Let other same-priority threads run
        }
    }
    return NULL;
}
```

### SCHED_RR

Round-robin with time quantum:

```c
// RR threads get time slices
// Same priority threads take turns

void* rr_thread(void* arg) {
    // Will be preempted after time quantum
    // Then moved to end of queue for its priority
    while (!finished) {
        do_work();
    }
    return NULL;
}
```

### SCHED_DEADLINE

Earliest deadline first scheduling:

```c
#include <linux/sched.h>

struct sched_attr {
    uint32_t size;
    uint32_t sched_policy;
    uint64_t sched_flags;
    int32_t sched_nice;
    uint32_t sched_priority;
    uint64_t sched_runtime;   // Execution time
    uint64_t sched_deadline;  // Deadline
    uint64_t sched_period;    // Period
};

void set_deadline_policy(pid_t tid,
                         uint64_t runtime_ns,
                         uint64_t deadline_ns,
                         uint64_t period_ns) {
    struct sched_attr attr = {
        .size = sizeof(attr),
        .sched_policy = SCHED_DEADLINE,
        .sched_runtime = runtime_ns,
        .sched_deadline = deadline_ns,
        .sched_period = period_ns
    };

    syscall(SYS_sched_setattr, tid, &attr, 0);
}
```

## Thread Scheduling Example

```c
#define _GNU_SOURCE
#include <pthread.h>
#include <sched.h>
#include <stdio.h>
#include <unistd.h>

void* low_priority_work(void* arg) {
    printf("Low priority thread running on CPU %d\n", sched_getcpu());
    for (int i = 0; i < 5; i++) {
        printf("Low: iteration %d\n", i);
        usleep(100000);
    }
    return NULL;
}

void* high_priority_work(void* arg) {
    printf("High priority thread running on CPU %d\n", sched_getcpu());
    for (int i = 0; i < 5; i++) {
        printf("High: iteration %d\n", i);
        usleep(100000);
    }
    return NULL;
}

int main() {
    pthread_t low_thread, high_thread;
    pthread_attr_t attr;
    struct sched_param param;

    // Create low priority thread
    pthread_attr_init(&attr);
    pthread_attr_setschedpolicy(&attr, SCHED_RR);
    param.sched_priority = 10;
    pthread_attr_setschedparam(&attr, &param);
    pthread_attr_setinheritsched(&attr, PTHREAD_EXPLICIT_SCHED);
    pthread_create(&low_thread, &attr, low_priority_work, NULL);

    // Create high priority thread
    param.sched_priority = 50;
    pthread_attr_setschedparam(&attr, &param);
    pthread_create(&high_thread, &attr, high_priority_work, NULL);

    pthread_attr_destroy(&attr);

    pthread_join(low_thread, NULL);
    pthread_join(high_thread, NULL);

    return 0;
}
```

## Scheduling Analysis

```c
#include <time.h>

void measure_scheduling_latency() {
    struct timespec start, end;

    clock_gettime(CLOCK_MONOTONIC, &start);
    sched_yield();  // Voluntarily give up CPU
    clock_gettime(CLOCK_MONOTONIC, &end);

    long latency_ns = (end.tv_sec - start.tv_sec) * 1000000000L +
                      (end.tv_nsec - start.tv_nsec);

    printf("Scheduling latency: %ld ns\n", latency_ns);
}
```

## Summary

Thread scheduling controls how threads share CPU time:
- Linux provides multiple scheduling policies (SCHED_OTHER, FIFO, RR, DEADLINE)
- Priorities determine which threads run first
- CPU affinity can bind threads to specific processors
- Real-time policies provide guaranteed scheduling for time-critical tasks
- Choose scheduling based on workload characteristics
- Root privileges often required for real-time scheduling
