# First-Come First-Served and Shortest Job First

FCFS and SJF are fundamental scheduling algorithms. This subtopic covers their implementation, characteristics, and analysis.

## First-Come, First-Served (FCFS)

The simplest scheduling algorithm: processes are served in arrival order.

### FCFS Implementation

```c
typedef struct {
    int pid;
    int arrival_time;
    int burst_time;
    int completion_time;
    int waiting_time;
    int turnaround_time;
} Process;

void fcfs_schedule(Process* processes, int n) {
    // Sort by arrival time
    qsort(processes, n, sizeof(Process), compare_arrival);

    int current_time = 0;

    for (int i = 0; i < n; i++) {
        // If CPU is idle, advance to process arrival
        if (current_time < processes[i].arrival_time) {
            current_time = processes[i].arrival_time;
        }

        processes[i].completion_time = current_time + processes[i].burst_time;
        processes[i].turnaround_time = processes[i].completion_time - processes[i].arrival_time;
        processes[i].waiting_time = processes[i].turnaround_time - processes[i].burst_time;

        current_time = processes[i].completion_time;
    }
}
```

### FCFS Example

| Process | Arrival | Burst |
|---------|---------|-------|
| P1 | 0 | 24 |
| P2 | 1 | 3 |
| P3 | 2 | 3 |

Gantt Chart:
```
|-------- P1 --------|-- P2 --|-- P3 --|
0                   24       27       30
```

Results:
- P1: Wait = 0, Turnaround = 24
- P2: Wait = 23, Turnaround = 26
- P3: Wait = 25, Turnaround = 28
- Average Wait = 16, Average Turnaround = 26

### FCFS Characteristics

**Advantages:**
- Simple to implement
- No starvation
- Non-preemptive (good for batch)

**Disadvantages:**
- Convoy effect: Short processes wait for long ones
- Poor average waiting time
- Not suitable for time-sharing

## Shortest Job First (SJF)

Select the process with the smallest next CPU burst.

### Non-preemptive SJF

```c
void sjf_nonpreemptive(Process* processes, int n) {
    int completed = 0;
    int current_time = 0;
    bool* done = calloc(n, sizeof(bool));

    while (completed < n) {
        int shortest = -1;
        int min_burst = INT_MAX;

        // Find shortest job that has arrived
        for (int i = 0; i < n; i++) {
            if (!done[i] && processes[i].arrival_time <= current_time) {
                if (processes[i].burst_time < min_burst) {
                    min_burst = processes[i].burst_time;
                    shortest = i;
                }
            }
        }

        if (shortest == -1) {
            current_time++;  // CPU idle
            continue;
        }

        processes[shortest].completion_time = current_time + processes[shortest].burst_time;
        processes[shortest].turnaround_time =
            processes[shortest].completion_time - processes[shortest].arrival_time;
        processes[shortest].waiting_time =
            processes[shortest].turnaround_time - processes[shortest].burst_time;

        current_time = processes[shortest].completion_time;
        done[shortest] = true;
        completed++;
    }

    free(done);
}
```

### Non-preemptive SJF Example

| Process | Arrival | Burst |
|---------|---------|-------|
| P1 | 0 | 7 |
| P2 | 2 | 4 |
| P3 | 4 | 1 |
| P4 | 5 | 4 |

Gantt Chart:
```
|---- P1 ----|-- P3 --|---- P2 ----|---- P4 ----|
0            7        8           12           16
```

Results:
- P1: Wait = 0, Turnaround = 7
- P2: Wait = 6, Turnaround = 10
- P3: Wait = 3, Turnaround = 4
- P4: Wait = 7, Turnaround = 11
- Average Wait = 4, Average Turnaround = 8

### Shortest Remaining Time First (SRTF)

Preemptive version of SJF:

```c
void srtf_schedule(Process* processes, int n) {
    int* remaining = malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) {
        remaining[i] = processes[i].burst_time;
    }

    int completed = 0;
    int current_time = 0;
    int shortest = -1;

    while (completed < n) {
        int min_remaining = INT_MAX;
        shortest = -1;

        // Find process with shortest remaining time
        for (int i = 0; i < n; i++) {
            if (processes[i].arrival_time <= current_time &&
                remaining[i] > 0 &&
                remaining[i] < min_remaining) {
                min_remaining = remaining[i];
                shortest = i;
            }
        }

        if (shortest == -1) {
            current_time++;
            continue;
        }

        remaining[shortest]--;
        current_time++;

        if (remaining[shortest] == 0) {
            processes[shortest].completion_time = current_time;
            processes[shortest].turnaround_time =
                processes[shortest].completion_time - processes[shortest].arrival_time;
            processes[shortest].waiting_time =
                processes[shortest].turnaround_time - processes[shortest].burst_time;
            completed++;
        }
    }

    free(remaining);
}
```

### SRTF Example

| Process | Arrival | Burst |
|---------|---------|-------|
| P1 | 0 | 8 |
| P2 | 1 | 4 |
| P3 | 2 | 9 |
| P4 | 3 | 5 |

Gantt Chart:
```
|P1|-- P2 --|-- P4 --|---- P1 ----|---- P3 ----|
0  1        5       10           17           26
```

- At t=0: P1 starts (only arrived)
- At t=1: P2 arrives with burst 4 < remaining 7, preempts P1
- At t=5: P4 (burst 5) < P1 (remaining 7) and P3 (burst 9)
- At t=10: P1 (remaining 7) < P3 (remaining 9)
- At t=17: P3 runs

Results:
- Average Wait = 6.5, Average Turnaround = 13

## Burst Time Estimation

SJF requires knowing burst time in advance. Use exponential averaging:

```c
double estimate_next_burst(double actual_burst, double previous_estimate, double alpha) {
    // τ_{n+1} = α * t_n + (1 - α) * τ_n
    // α = weight for recent history (typically 0.5)
    return alpha * actual_burst + (1 - alpha) * previous_estimate;
}

// Example
double alpha = 0.5;
double estimate = 10;  // Initial guess

// After bursts: 6, 4, 6, 4, 13, 13, 13
// Estimates: 10, 8, 6, 6, 5, 9, 11, 12
```

## Comparison

| Metric | FCFS | SJF (Non-preemptive) | SRTF |
|--------|------|----------------------|------|
| Optimal for waiting time | No | Yes (if all arrive at once) | Yes |
| Starvation possible | No | Yes | Yes |
| Preemption overhead | None | None | Yes |
| Implementation | Simple | Moderate | Complex |
| Burst prediction | Not needed | Needed | Needed |

## Summary

FCFS and SJF represent fundamental scheduling approaches:
- FCFS is simple but suffers from convoy effect
- SJF minimizes average waiting time
- SRTF preempts for even shorter processes
- SJF requires burst time prediction
- Both non-preemptive versions are unsuitable for interactive systems
