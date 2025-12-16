# Multiprocessor Scheduling

Scheduling for systems with multiple processors presents unique challenges. This subtopic covers symmetric multiprocessing, load balancing, and processor affinity.

## Multiprocessor Architectures

### Asymmetric Multiprocessing (AMP)

One master processor handles scheduling and I/O; others execute user code:

```
┌───────────────┐
│    Master     │ ← OS scheduling, I/O
│   Processor   │
└───────────────┘
        │
        ├───────────────┬───────────────┐
        ↓               ↓               ↓
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│    Slave 1    │ │    Slave 2    │ │    Slave 3    │
└───────────────┘ └───────────────┘ └───────────────┘
```

### Symmetric Multiprocessing (SMP)

All processors are equals, each runs scheduler independently:

```
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│   CPU 0       │ │   CPU 1       │ │   CPU 2       │
│  Scheduler    │ │  Scheduler    │ │  Scheduler    │
└───────────────┘ └───────────────┘ └───────────────┘
        │               │               │
        └───────────────┴───────────────┘
                        │
               ┌────────────────┐
               │  Shared Memory │
               │  Ready Queue   │
               └────────────────┘
```

## SMP Scheduling Approaches

### Common Ready Queue

All processors share a single ready queue:

```c
typedef struct {
    Queue ready_queue;
    pthread_spinlock_t lock;
} SharedQueue;

Process* get_next_process(SharedQueue* sq) {
    pthread_spin_lock(&sq->lock);
    Process* p = dequeue(&sq->ready_queue);
    pthread_spin_unlock(&sq->lock);
    return p;
}

// Problem: Lock contention with many CPUs
```

### Per-Processor Queues

Each processor has its own ready queue:

```c
typedef struct {
    Queue ready_queue;
    pthread_spinlock_t lock;
    int cpu_id;
} CPUQueue;

CPUQueue cpu_queues[NUM_CPUS];

Process* get_next_process(int cpu) {
    pthread_spin_lock(&cpu_queues[cpu].lock);
    Process* p = dequeue(&cpu_queues[cpu].ready_queue);
    pthread_spin_unlock(&cpu_queues[cpu].lock);
    return p;
}
```

## Load Balancing

With per-processor queues, must balance load across CPUs:

### Push Migration

Periodic task checks load and moves processes:

```c
void push_migration() {
    int max_load = 0, min_load = INT_MAX;
    int max_cpu = -1, min_cpu = -1;

    // Find most and least loaded CPUs
    for (int i = 0; i < NUM_CPUS; i++) {
        int load = queue_length(&cpu_queues[i].ready_queue);
        if (load > max_load) { max_load = load; max_cpu = i; }
        if (load < min_load) { min_load = load; min_cpu = i; }
    }

    // Move processes if imbalance exceeds threshold
    if (max_load - min_load > IMBALANCE_THRESHOLD) {
        Process* p = steal_from(&cpu_queues[max_cpu]);
        if (p) {
            add_to(&cpu_queues[min_cpu], p);
        }
    }
}

// Run periodically
void load_balancer_thread() {
    while (running) {
        sleep_ms(BALANCE_INTERVAL);
        push_migration();
    }
}
```

### Pull Migration (Work Stealing)

Idle CPUs steal work from busy CPUs:

```c
Process* find_work(int my_cpu) {
    // First check own queue
    Process* p = dequeue(&cpu_queues[my_cpu].ready_queue);
    if (p) return p;

    // Steal from other CPUs
    for (int i = 0; i < NUM_CPUS; i++) {
        if (i == my_cpu) continue;

        if (queue_length(&cpu_queues[i].ready_queue) > 1) {
            p = steal_from(&cpu_queues[i]);
            if (p) return p;
        }
    }

    return NULL;  // No work available
}
```

## Processor Affinity

Keeping processes on the same CPU improves cache performance.

### Soft Affinity

OS tries to keep process on same CPU but may move it:

```c
typedef struct {
    int pid;
    int preferred_cpu;
    int last_cpu;
} Process;

int select_cpu(Process* p) {
    // Try preferred/last CPU first
    if (cpu_available(p->preferred_cpu)) {
        return p->preferred_cpu;
    }

    // Fall back to any available CPU
    return find_available_cpu();
}
```

### Hard Affinity

Process restricted to specific CPUs:

```c
#define _GNU_SOURCE
#include <sched.h>

void set_affinity(pid_t pid, int cpu) {
    cpu_set_t cpuset;
    CPU_ZERO(&cpuset);
    CPU_SET(cpu, &cpuset);

    sched_setaffinity(pid, sizeof(cpuset), &cpuset);
}

// Allow process on CPUs 0 and 1 only
void set_affinity_mask(pid_t pid) {
    cpu_set_t cpuset;
    CPU_ZERO(&cpuset);
    CPU_SET(0, &cpuset);
    CPU_SET(1, &cpuset);

    sched_setaffinity(pid, sizeof(cpuset), &cpuset);
}
```

## NUMA Considerations

Non-Uniform Memory Access (NUMA) systems have varying memory access times:

```
┌─────────────┐                     ┌─────────────┐
│   Node 0    │                     │   Node 1    │
│  ┌───────┐  │                     │  ┌───────┐  │
│  │ CPU 0 │  │                     │  │ CPU 2 │  │
│  │ CPU 1 │  │←─── Interconnect ──→│  │ CPU 3 │  │
│  └───────┘  │                     │  └───────┘  │
│  ┌───────┐  │                     │  ┌───────┐  │
│  │Memory │  │                     │  │Memory │  │
│  └───────┘  │                     │  └───────┘  │
└─────────────┘                     └─────────────┘

Local access: ~100 cycles
Remote access: ~300 cycles
```

### NUMA-Aware Scheduling

```c
typedef struct {
    int pid;
    int home_node;  // Where process memory allocated
} NUMAProcess;

int select_cpu_numa(NUMAProcess* p) {
    // Prefer CPUs on same NUMA node as process memory
    int home = p->home_node;

    for (int cpu : cpus_in_node[home]) {
        if (cpu_available(cpu)) {
            return cpu;
        }
    }

    // Fall back to other nodes
    for (int node = 0; node < NUM_NODES; node++) {
        if (node == home) continue;
        for (int cpu : cpus_in_node[node]) {
            if (cpu_available(cpu)) {
                return cpu;
            }
        }
    }

    return -1;
}
```

## Heterogeneous Multiprocessing

Modern systems may have different CPU types:

```
┌─────────────────────────────────────┐
│  Big Cores (Performance)            │
│  ┌──────┐ ┌──────┐                  │
│  │Core 0│ │Core 1│                  │
│  └──────┘ └──────┘                  │
├─────────────────────────────────────┤
│  Little Cores (Efficiency)          │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐│
│  │Core 2│ │Core 3│ │Core 4│ │Core 5││
│  └──────┘ └──────┘ └──────┘ └──────┘│
└─────────────────────────────────────┘
```

### Heterogeneous Scheduling

```c
typedef enum { PERFORMANCE, EFFICIENCY } CoreType;

CoreType classify_process(Process* p) {
    if (p->is_foreground || p->cpu_intensive) {
        return PERFORMANCE;  // Run on big cores
    }
    return EFFICIENCY;  // Run on little cores
}

int select_heterogeneous_cpu(Process* p) {
    CoreType type = classify_process(p);

    if (type == PERFORMANCE) {
        // Try big cores first
        for (int cpu : big_cores) {
            if (cpu_available(cpu)) return cpu;
        }
    }

    // Fall back or efficiency preference
    for (int cpu : little_cores) {
        if (cpu_available(cpu)) return cpu;
    }

    return any_available_cpu();
}
```

## Linux SMP Scheduling

Linux uses per-CPU run queues with periodic load balancing:

```c
// Simplified Linux scheduling concepts
struct rq {
    spinlock_t lock;
    struct cfs_rq cfs;      // Completely Fair Scheduler
    struct rt_rq rt;        // Real-time scheduler
    struct task_struct *curr;
};

DEFINE_PER_CPU(struct rq, runqueues);

// Load balancing domains
// CPU → SMT siblings → Core → Package → NUMA node → System
```

## Summary

Multiprocessor scheduling adds complexity:
- SMP allows all CPUs to participate in scheduling
- Per-CPU queues reduce contention but require balancing
- Load balancing through push/pull migration
- Processor affinity improves cache performance
- NUMA requires memory-aware scheduling
- Heterogeneous systems need workload matching
- Trade-offs between fairness, locality, and load balance
