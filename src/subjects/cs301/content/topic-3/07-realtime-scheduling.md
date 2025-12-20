---
id: cs301-t3-realtime
title: "Real-Time Scheduling"
order: 7
---

# Real-Time Scheduling

Real-time systems have timing constraints that must be met. This subtopic covers real-time scheduling algorithms and analysis.

## Real-Time Systems

**Real-time systems** must complete tasks within specific time constraints:

- **Hard real-time**: Missing deadline = system failure (medical devices, flight control)
- **Soft real-time**: Missing deadline = degraded quality (video streaming, gaming)

## Real-Time Task Model

```c
typedef struct {
    int id;
    int period;           // Time between releases (periodic tasks)
    int deadline;         // Relative deadline
    int execution_time;   // Worst-case execution time (WCET)
    int release_time;     // Next release time
} RTTask;

// Utilization
double task_utilization(RTTask* task) {
    return (double)task->execution_time / task->period;
}

double total_utilization(RTTask* tasks, int n) {
    double sum = 0;
    for (int i = 0; i < n; i++) {
        sum += task_utilization(&tasks[i]);
    }
    return sum;  // Must be <= 1.0 for schedulability
}
```

## Rate Monotonic Scheduling (RMS)

Fixed-priority algorithm where priority is inversely proportional to period:

```c
// Shorter period = higher priority
void assign_rm_priorities(RTTask* tasks, int n) {
    // Sort by period (ascending)
    qsort(tasks, n, sizeof(RTTask), compare_period);

    for (int i = 0; i < n; i++) {
        tasks[i].priority = i;  // Lower number = higher priority
    }
}

RTTask* rm_select(RTTask* tasks, int n) {
    RTTask* highest = NULL;

    for (int i = 0; i < n; i++) {
        if (tasks[i].remaining > 0) {
            if (highest == NULL || tasks[i].priority < highest->priority) {
                highest = &tasks[i];
            }
        }
    }

    return highest;
}
```

### RMS Example

| Task | Period | Execution |
|------|--------|-----------|
| T1 | 20 | 5 |
| T2 | 50 | 10 |
| T3 | 100 | 20 |

Priorities: T1 > T2 > T3 (shorter period = higher priority)

```
Time: 0    5    20   25   50   55   70   75   100
      |T1  |    |T1  |    |T1  |T2  |    |T3  |
           |T2-------     |    |    |T3--|
                    |T3---|
```

### RMS Schedulability Test

Sufficient condition (not necessary):
```
U ≤ n(2^(1/n) - 1)

n=1: U ≤ 1.000
n=2: U ≤ 0.828
n=3: U ≤ 0.780
n→∞: U ≤ 0.693 (ln 2)
```

```c
bool rm_schedulable_sufficient(RTTask* tasks, int n) {
    double util = total_utilization(tasks, n);
    double bound = n * (pow(2.0, 1.0/n) - 1.0);
    return util <= bound;
}
```

## Earliest Deadline First (EDF)

Dynamic-priority algorithm: highest priority to task with nearest deadline:

```c
RTTask* edf_select(RTTask* tasks, int n, int current_time) {
    RTTask* earliest = NULL;
    int min_deadline = INT_MAX;

    for (int i = 0; i < n; i++) {
        if (tasks[i].remaining > 0) {
            int absolute_deadline = tasks[i].release_time + tasks[i].deadline;

            if (absolute_deadline < min_deadline) {
                min_deadline = absolute_deadline;
                earliest = &tasks[i];
            }
        }
    }

    return earliest;
}
```

### EDF Example

| Task | Period | Execution | Deadline |
|------|--------|-----------|----------|
| T1 | 50 | 25 | 50 |
| T2 | 80 | 35 | 80 |

```
Time: 0         25        50        60        80
      |---T1----|---T2----|----T1---|---T2----|
      deadline: 50        80        100       160
```

### EDF Schedulability

EDF is optimal for uniprocessors: can schedule any task set with U ≤ 1.0

```c
bool edf_schedulable(RTTask* tasks, int n) {
    return total_utilization(tasks, n) <= 1.0;
}
```

## RMS vs EDF Comparison

| Aspect | RMS | EDF |
|--------|-----|-----|
| Priority | Static (period-based) | Dynamic (deadline-based) |
| Optimality | Not optimal | Optimal |
| Utilization bound | ~69% (worst case) | 100% |
| Overhead | Lower | Higher |
| Predictability | More predictable | Less predictable |
| Implementation | Simpler | More complex |

## Priority Inversion

Lower-priority task blocks higher-priority task holding shared resource:

```
Priority: H > M > L

L acquires lock
H arrives, needs lock (blocked by L)
M arrives, preempts L
M runs... L waits... H waits...

H blocked by M even though H > M (priority inversion!)
```

### Priority Inheritance Protocol

```c
typedef struct {
    pthread_mutex_t mutex;
    int owner_priority;
    int original_priority;
} PIPMutex;

void pip_lock(PIPMutex* m, Task* current) {
    if (mutex_owned(m)) {
        Task* owner = get_owner(m);
        if (current->priority > owner->priority) {
            // Boost owner's priority
            owner->priority = current->priority;
        }
    }
    pthread_mutex_lock(&m->mutex);
    m->owner_priority = current->priority;
    m->original_priority = current->priority;
}

void pip_unlock(PIPMutex* m, Task* current) {
    // Restore original priority
    current->priority = m->original_priority;
    pthread_mutex_unlock(&m->mutex);
}
```

### Priority Ceiling Protocol

Each resource has a ceiling = highest priority of any task that uses it:

```c
typedef struct {
    pthread_mutex_t mutex;
    int ceiling;  // Highest priority task that uses this
} PCPMutex;

bool pcp_can_lock(PCPMutex* m, Task* current, PCPMutex** all_mutexes, int n) {
    int system_ceiling = 0;

    // Find highest ceiling of currently locked mutexes
    for (int i = 0; i < n; i++) {
        if (mutex_locked(all_mutexes[i]) && all_mutexes[i] != m) {
            if (all_mutexes[i]->ceiling > system_ceiling) {
                system_ceiling = all_mutexes[i]->ceiling;
            }
        }
    }

    // Can lock only if priority > system ceiling
    return current->priority > system_ceiling || owns_ceiling_mutex(current);
}
```

## Response Time Analysis

More precise than utilization tests:

```c
int response_time(RTTask* tasks, int n, int task_index) {
    RTTask* task = &tasks[task_index];
    int R = task->execution_time;  // Initial guess

    while (true) {
        int interference = 0;

        // Add interference from higher-priority tasks
        for (int i = 0; i < task_index; i++) {
            interference += ceil((double)R / tasks[i].period) * tasks[i].execution_time;
        }

        int R_new = task->execution_time + interference;

        if (R_new == R) {
            break;  // Converged
        }
        if (R_new > task->deadline) {
            return -1;  // Not schedulable
        }

        R = R_new;
    }

    return R;
}

bool response_time_schedulable(RTTask* tasks, int n) {
    // Tasks must be sorted by priority
    for (int i = 0; i < n; i++) {
        int R = response_time(tasks, n, i);
        if (R < 0 || R > tasks[i].deadline) {
            return false;
        }
    }
    return true;
}
```

## Linux Real-Time Scheduling

```c
#include <sched.h>

// Set real-time scheduling
void configure_realtime(pid_t pid, int policy, int priority) {
    struct sched_param param;
    param.sched_priority = priority;  // 1-99

    // SCHED_FIFO: Fixed priority, no time slicing
    // SCHED_RR: Fixed priority with round-robin
    sched_setscheduler(pid, policy, &param);
}

// Deadline scheduling (Linux 3.14+)
void configure_deadline(pid_t pid,
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

    syscall(SYS_sched_setattr, pid, &attr, 0);
}
```

## Summary

Real-time scheduling ensures timing requirements are met:
- Hard vs soft real-time have different failure modes
- RMS: simple, static priority based on period
- EDF: optimal, dynamic priority based on deadline
- Utilization tests provide quick schedulability checks
- Response time analysis gives precise results
- Priority inversion must be handled with protocols
- Modern OS provide real-time scheduling support
