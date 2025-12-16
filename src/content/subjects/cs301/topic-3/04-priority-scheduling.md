# Priority Scheduling

Priority scheduling assigns a priority to each process and schedules based on priority. This subtopic covers priority assignment, starvation, and aging.

## Priority Scheduling Concept

Each process is assigned a priority number. The CPU is allocated to the process with the highest priority.

```
Priority conventions:
- Lower number = higher priority (Unix/Linux)
- Higher number = higher priority (some systems)

Ready Queue by Priority:
Priority 1: [P3] [P7]      (highest)
Priority 2: [P1] [P5]
Priority 3: [P2] [P4] [P8] (lowest)
```

## Priority Scheduling Implementation

```c
typedef struct {
    int pid;
    int arrival_time;
    int burst_time;
    int priority;  // Lower = higher priority
    int completion_time;
    int waiting_time;
    int turnaround_time;
} Process;

void priority_nonpreemptive(Process* processes, int n) {
    bool* completed = calloc(n, sizeof(bool));
    int done = 0;
    int current_time = 0;

    while (done < n) {
        int highest = -1;
        int best_priority = INT_MAX;

        // Find highest priority ready process
        for (int i = 0; i < n; i++) {
            if (!completed[i] && processes[i].arrival_time <= current_time) {
                if (processes[i].priority < best_priority) {
                    best_priority = processes[i].priority;
                    highest = i;
                }
            }
        }

        if (highest == -1) {
            current_time++;
            continue;
        }

        // Execute process
        processes[highest].completion_time = current_time + processes[highest].burst_time;
        processes[highest].turnaround_time =
            processes[highest].completion_time - processes[highest].arrival_time;
        processes[highest].waiting_time =
            processes[highest].turnaround_time - processes[highest].burst_time;

        current_time = processes[highest].completion_time;
        completed[highest] = true;
        done++;
    }

    free(completed);
}
```

## Priority Scheduling Example

| Process | Arrival | Burst | Priority |
|---------|---------|-------|----------|
| P1 | 0 | 10 | 3 |
| P2 | 0 | 1 | 1 |
| P3 | 0 | 2 | 4 |
| P4 | 0 | 1 | 5 |
| P5 | 0 | 5 | 2 |

Non-preemptive (lower number = higher priority):

```
Gantt Chart:
|P2|-- P5 --|---- P1 ----|P3|P4|
0  1        6           16  18 19

Execution order: P2 → P5 → P1 → P3 → P4
```

Results:
| Process | Waiting | Turnaround |
|---------|---------|------------|
| P1 | 6 | 16 |
| P2 | 0 | 1 |
| P3 | 16 | 18 |
| P4 | 18 | 19 |
| P5 | 1 | 6 |

Average Waiting = 8.2

## Preemptive Priority Scheduling

```c
void priority_preemptive(Process* processes, int n) {
    int* remaining = malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) {
        remaining[i] = processes[i].burst_time;
    }

    int completed = 0;
    int current_time = 0;

    while (completed < n) {
        int highest = -1;
        int best_priority = INT_MAX;

        // Find highest priority process with remaining time
        for (int i = 0; i < n; i++) {
            if (processes[i].arrival_time <= current_time && remaining[i] > 0) {
                if (processes[i].priority < best_priority) {
                    best_priority = processes[i].priority;
                    highest = i;
                }
            }
        }

        if (highest == -1) {
            current_time++;
            continue;
        }

        // Execute for 1 time unit
        remaining[highest]--;
        current_time++;

        if (remaining[highest] == 0) {
            processes[highest].completion_time = current_time;
            processes[highest].turnaround_time =
                processes[highest].completion_time - processes[highest].arrival_time;
            processes[highest].waiting_time =
                processes[highest].turnaround_time - processes[highest].burst_time;
            completed++;
        }
    }

    free(remaining);
}
```

## Starvation Problem

Low-priority processes may never execute (indefinite blocking):

```
High Priority Process Stream:
Time 0:  P_high1 arrives (priority 1, burst 5)
Time 3:  P_high2 arrives (priority 1, burst 4)
Time 5:  P_high3 arrives (priority 1, burst 6)
...

P_low (priority 5) arrived at time 0
Result: P_low never runs - STARVATION
```

## Aging Solution

Aging gradually increases priority of waiting processes:

```c
typedef struct {
    int pid;
    int base_priority;
    int effective_priority;
    int wait_time;
} AgingProcess;

void apply_aging(AgingProcess* processes, int n, int age_threshold, int age_boost) {
    for (int i = 0; i < n; i++) {
        if (processes[i].wait_time >= age_threshold) {
            // Boost priority (lower number = higher priority)
            processes[i].effective_priority =
                max(1, processes[i].base_priority - age_boost);
            processes[i].wait_time = 0;  // Reset wait counter
        }
    }
}

void schedule_with_aging(AgingProcess* processes, int n) {
    int current_time = 0;

    while (has_processes()) {
        // Age all waiting processes
        for (int i = 0; i < n; i++) {
            if (is_waiting(processes[i])) {
                processes[i].wait_time++;
            }
        }

        // Apply aging every time unit
        apply_aging(processes, n, 10, 1);  // After 10 units, boost by 1

        // Select highest effective priority
        Process* selected = select_highest_priority(processes, n);
        execute(selected, 1);  // Execute for 1 unit
        current_time++;
    }
}
```

## Priority Assignment

### Static Priority

Assigned at process creation, doesn't change:

```c
// Based on process type
int assign_static_priority(ProcessType type) {
    switch (type) {
        case SYSTEM: return 0;       // Highest
        case INTERACTIVE: return 10;
        case BATCH: return 20;
        default: return 30;          // Lowest
    }
}
```

### Dynamic Priority

Changes based on behavior:

```c
// I/O-bound processes get higher priority
void update_priority(Process* p) {
    if (p->recent_io_time > p->recent_cpu_time) {
        // I/O bound - boost priority
        p->priority = max(1, p->priority - 1);
    } else {
        // CPU bound - lower priority
        p->priority = min(MAX_PRIORITY, p->priority + 1);
    }
}
```

## Multilevel Priority Queues

Combine priority with other algorithms:

```
Priority 0 (Highest):
    Queue: Round Robin, quantum=8
    │ System processes

Priority 1:
    Queue: Round Robin, quantum=16
    │ Interactive processes

Priority 2:
    Queue: FCFS
    │ Batch processes

Priority 3 (Lowest):
    Queue: FCFS
    │ Idle processes
```

```c
typedef struct {
    Queue queues[NUM_PRIORITY_LEVELS];
    int time_quantum[NUM_PRIORITY_LEVELS];
    SchedulingAlgorithm algorithm[NUM_PRIORITY_LEVELS];
} MultilevelPriorityQueue;

Process* select_next(MultilevelPriorityQueue* mpq) {
    // Check queues from highest priority
    for (int p = 0; p < NUM_PRIORITY_LEVELS; p++) {
        if (!is_empty(&mpq->queues[p])) {
            return dequeue(&mpq->queues[p]);
        }
    }
    return NULL;  // No ready process
}
```

## Real-World Priority Systems

### Unix/Linux Nice Values

```bash
# Nice values: -20 (highest) to +19 (lowest)
nice -n 10 ./program     # Lower priority
nice -n -5 ./program     # Higher priority (requires root)

# Change running process
renice -n 5 -p 1234
```

### Real-Time Priorities (Linux)

```c
#include <sched.h>

void set_realtime_priority(int priority) {
    struct sched_param param;
    param.sched_priority = priority;  // 1-99

    // SCHED_FIFO or SCHED_RR
    sched_setscheduler(0, SCHED_FIFO, &param);
}
```

## Summary

Priority scheduling provides differentiated service:
- Processes assigned priorities (static or dynamic)
- Higher priority processes run first
- Can be preemptive or non-preemptive
- Starvation is a significant problem
- Aging prevents indefinite blocking
- Often combined with other algorithms in multilevel systems
- Used extensively in real operating systems
