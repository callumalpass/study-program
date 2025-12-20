---
id: cs301-t7-thrashing
title: "Thrashing and Working Sets"
order: 3
---

# Thrashing and Working Sets

Thrashing occurs when a system spends more time paging than executing. This subtopic covers thrashing causes, detection, and prevention through working set management.

## What is Thrashing?

System spends excessive time swapping pages:

```
Normal operation:
CPU: ████████████████████████████████████
I/O: ███     ███         ███     ███

Thrashing:
CPU: ██    ██    ██    ██    ██    ██
I/O: ██████████████████████████████████

CPU utilization drops dramatically!
```

### Thrashing Scenario

```
1. Process needs more pages than available frames
2. Page fault → evict needed page
3. Soon need evicted page → another fault
4. Repeat endlessly

Process A evicts B's page
Process B evicts A's page
Both constantly page faulting
```

## Causes of Thrashing

### Degree of Multiprogramming

```
CPU Utilization
     │
100% │
     │        ╱╲
     │       ╱  ╲
 50% │      ╱    ╲
     │     ╱      ╲
     │    ╱        ╲
  0% │───╱──────────╲───────────
     └──────────────────────────→
        Degree of Multiprogramming

Too few processes: CPU idle waiting for I/O
Too many processes: Thrashing!
```

### Memory Overcommitment

```
Total working sets > Physical memory

Process A needs: 50 pages
Process B needs: 40 pages
Process C needs: 30 pages
Total needed: 120 pages

Available frames: 80

Result: Constant page faults
```

## Locality Model

Programs exhibit locality of reference:

### Types of Locality

```
Temporal: Recently accessed → likely accessed again
  Example: Loop variables

Spatial: Nearby addresses → likely accessed
  Example: Array traversal

Working Set: Active pages at any time
  Changes as program moves between phases
```

### Locality Visualization

```
Pages Accessed
     │     Phase 1      Phase 2      Phase 3
     │    ┌────────┐   ┌────────┐   ┌────────┐
 100 │    │ ░░░░░░ │   │        │   │        │
  80 │    │ ░░░░░░ │   │        │   │        │
  60 │    │        │   │ ░░░░░░ │   │        │
  40 │    │        │   │ ░░░░░░ │   │ ░░░░░░ │
  20 │    │        │   │        │   │ ░░░░░░ │
     │    └────────┘   └────────┘   └────────┘
     └────────────────────────────────────────→
                        Time

Each phase has different working set
```

## Working Set Model

### Definition

Working set W(t, Δ) = pages referenced in time window Δ

```
Reference string: 1 2 3 4 1 2 5 1 2 3 4 5

At t=10 with Δ=5:
References: 5 1 2 3 4
Working set = {1, 2, 3, 4, 5}
|WS| = 5
```

### Working Set Size

```c
typedef struct {
    int* pages;
    int* last_access;
    int count;
} WorkingSet;

int calculate_ws_size(WorkingSet* ws, int current_time, int delta) {
    int size = 0;

    for (int i = 0; i < ws->count; i++) {
        if (current_time - ws->last_access[i] <= delta) {
            size++;
        }
    }

    return size;
}
```

### Working Set Page Replacement

```c
void working_set_replacement(Process* p, int delta, int current_time) {
    for (int i = 0; i < p->num_pages; i++) {
        if (p->page_table[i].present) {
            int age = current_time - p->page_table[i].last_access;

            if (age > delta) {
                // Page not in working set, evict
                evict_page(p, i);
            }
        }
    }
}
```

## Preventing Thrashing

### Working Set Strategy

```
D = Σ |WSi| = Total demand (sum of all working sets)

If D > available frames:
  Suspend some processes

Maintain:
  D ≤ available frames
```

### Implementation

```c
#define MAX_MULTIPROGRAMMING 100

void maintain_working_sets() {
    int total_demand = 0;
    int available = get_free_frames();

    for (int i = 0; i < num_processes; i++) {
        total_demand += processes[i].working_set_size;
    }

    while (total_demand > available) {
        // Suspend process with largest working set
        Process* victim = select_suspend_victim();
        suspend_process(victim);
        total_demand -= victim->working_set_size;
    }
}

Process* select_suspend_victim() {
    Process* victim = NULL;
    int lowest_priority = INT_MAX;

    for (int i = 0; i < num_processes; i++) {
        if (!processes[i].suspended &&
            processes[i].priority < lowest_priority) {
            lowest_priority = processes[i].priority;
            victim = &processes[i];
        }
    }

    return victim;
}
```

### Page Fault Frequency (PFF)

Monitor fault rate to detect thrashing:

```c
#define UPPER_THRESHOLD 0.5   // faults per 1000 refs
#define LOWER_THRESHOLD 0.1

void check_page_fault_frequency(Process* p) {
    double fault_rate = (double)p->recent_faults / p->recent_refs;

    if (fault_rate > UPPER_THRESHOLD) {
        // Process needs more frames
        allocate_more_frames(p);

        if (!frames_available()) {
            // Can't give more, suspend another process
            suspend_lowest_priority();
        }
    } else if (fault_rate < LOWER_THRESHOLD) {
        // Process has too many frames
        reclaim_frames(p);
    }
}
```

### PFF Visualization

```
Page Fault Rate
     │
     │    ╲
High │     ╲
     │      ╲   Process needs more frames
     │   ────────────── Upper threshold
     │         ╲
     │          ╲
     │   ────────────── Lower threshold
Low  │             ╲    Can reclaim frames
     │              ╲
     │───────────────────────────────────→
                   Frames Allocated
```

## Frame Allocation

### Equal Allocation

```
100 frames, 5 processes
Each process gets: 100/5 = 20 frames

Simple but ignores different needs
```

### Proportional Allocation

```c
void proportional_allocation(Process* processes, int n,
                            int total_frames) {
    int total_size = 0;

    for (int i = 0; i < n; i++) {
        total_size += processes[i].virtual_size;
    }

    for (int i = 0; i < n; i++) {
        double proportion = (double)processes[i].virtual_size / total_size;
        processes[i].frames = (int)(proportion * total_frames);
    }
}
```

### Priority-Based Allocation

```c
void priority_allocation(Process* processes, int n,
                        int total_frames) {
    int total_priority = 0;

    for (int i = 0; i < n; i++) {
        total_priority += processes[i].priority;
    }

    for (int i = 0; i < n; i++) {
        double proportion = (double)processes[i].priority / total_priority;
        processes[i].frames = (int)(proportion * total_frames);
    }
}
```

## Global vs Local Replacement

### Global Replacement

Any frame can be taken:
```c
Frame* global_replace() {
    // Select victim from any process
    return select_global_victim();
}

// Pros: Better overall utilization
// Cons: Process can't control its fault rate
```

### Local Replacement

Only take from same process:
```c
Frame* local_replace(Process* p) {
    // Select victim only from p's frames
    return select_local_victim(p);
}

// Pros: Predictable performance
// Cons: May waste frames
```

## Detecting Thrashing

### System Monitoring

```bash
# Linux: Watch paging activity
vmstat 1

# Output columns:
# si: Swap in (KB/s)
# so: Swap out (KB/s)
# bi: Blocks in (I/O)
# bo: Blocks out

# High si/so with low CPU = thrashing!
```

### Programmatic Detection

```c
typedef struct {
    int cpu_utilization;
    int page_fault_rate;
    int swap_activity;
} SystemMetrics;

bool detect_thrashing(SystemMetrics* m) {
    // Low CPU + High paging = thrashing
    if (m->cpu_utilization < 30 &&
        m->page_fault_rate > 1000 &&
        m->swap_activity > 10000) {
        return true;
    }
    return false;
}

void respond_to_thrashing() {
    // Options:
    // 1. Reduce multiprogramming
    suspend_processes();

    // 2. Increase memory (add RAM/swap)
    // 3. Kill memory-hungry processes
    // 4. Use larger page size
}
```

## Memory Pressure

### Linux Memory Management

```bash
# View memory pressure
cat /proc/meminfo

# Memory pressure statistics (cgroups v2)
cat /sys/fs/cgroup/memory.pressure

# OOM score for process
cat /proc/<pid>/oom_score
```

### Responding to Pressure

```c
// Linux kernel memory pressure levels
enum {
    MEMORY_PRESSURE_LOW,      // Some pressure
    MEMORY_PRESSURE_MEDIUM,   // Moderate pressure
    MEMORY_PRESSURE_CRITICAL  // Severe pressure (OOM possible)
};

void handle_memory_pressure(int level) {
    switch (level) {
        case MEMORY_PRESSURE_LOW:
            // Start background reclaim
            wake_up_kswapd();
            break;

        case MEMORY_PRESSURE_MEDIUM:
            // Aggressive reclaim
            direct_reclaim();
            break;

        case MEMORY_PRESSURE_CRITICAL:
            // OOM killer may activate
            invoke_oom_killer_if_needed();
            break;
    }
}
```

## Summary

Thrashing severely impacts system performance:
- Caused by insufficient frames for working sets
- Working set model captures locality of reference
- PFF monitors and adjusts allocation dynamically
- Prevention better than cure
- Global vs local replacement affects behavior
- Modern systems monitor and respond to memory pressure
- Balance between multiprogramming and memory needs
