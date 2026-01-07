# CPU Scheduling

How does your computer run dozens of programs simultaneously with only a few CPU cores? The answer is CPU scheduling. In this topic, you'll learn how operating systems decide which process runs when, exploring algorithms from simple FIFO to sophisticated multilevel feedback queues.

**Learning Objectives:**
- Explain scheduling criteria and performance metrics
- Implement and analyze FCFS, SJF, Round Robin, and Priority scheduling
- Calculate turnaround time, waiting time, and response time
- Compare preemptive vs non-preemptive scheduling
- Design multilevel queue and feedback queue schedulers
- Understand real-time scheduling constraints

---

## Core Concepts

### Why Scheduling Matters

CPU scheduling is essential because:
- Multiple processes compete for limited CPU cores
- Different processes have different needs (interactive vs batch)
- Poor scheduling leads to poor user experience
- Good scheduling maximizes system utilization

### Scheduling Criteria

Different metrics evaluate scheduling performance:

| Criterion | Definition | Goal |
|-----------|------------|------|
| **CPU Utilization** | Percentage of time CPU is busy | Maximize |
| **Throughput** | Processes completed per time unit | Maximize |
| **Turnaround Time** | Submission to completion | Minimize |
| **Waiting Time** | Time spent in ready queue | Minimize |
| **Response Time** | Submission to first output | Minimize |

```
Process Timeline:
─────────────────────────────────────────────────────→ time
     ↑              ↑                    ↑         ↑
  Submit         First                Running   Complete
              Response
     |←─ Response Time ─→|
     |←────────────── Turnaround Time ─────────────→|
     |← Wait →|← Run →|← Wait →|← Run →|← Wait →|
```

### Preemptive vs Non-Preemptive

**Non-preemptive (cooperative):**
- Process keeps CPU until it terminates or blocks
- Simpler to implement
- Can lead to poor response time

**Preemptive:**
- OS can interrupt running process
- Better response time
- Requires careful handling of shared data

```c
// Non-preemptive: process runs to completion
while (has_work) {
    do_computation();  // Cannot be interrupted
}

// Preemptive: timer interrupts execution
void timer_handler() {
    save_context(current);
    current = schedule();  // Pick next process
    restore_context(current);
}
```

---

## Scheduling Algorithms

### First-Come, First-Served (FCFS)

The simplest algorithm: processes run in arrival order.

```
Ready Queue: [P1, P2, P3]
             ↓
         CPU assigns to first in queue
```

**Example:**
```
Process  Burst Time  Arrival
P1       24          0
P2       3           0
P3       3           0

Gantt Chart (arrival order P1, P2, P3):
|     P1     |P2 |P3 |
0           24  27  30

Wait Times: P1=0, P2=24, P3=27
Average Wait: (0+24+27)/3 = 17
```

**Convoy Effect:** Short processes stuck behind long ones.

If P2 and P3 arrived first:
```
|P2 |P3 |     P1     |
0   3   6           30

Wait Times: P1=6, P2=0, P3=3
Average Wait: (6+0+3)/3 = 3  ← Much better!
```

### Shortest-Job-First (SJF)

Schedule the process with shortest burst time next.

```c
// Non-preemptive SJF
Process* select_next(Queue* ready) {
    Process* shortest = NULL;
    int min_burst = INT_MAX;

    for (Process* p : ready) {
        if (p->burst_time < min_burst) {
            min_burst = p->burst_time;
            shortest = p;
        }
    }
    return shortest;
}
```

**Example:**
```
Process  Burst Time  Arrival
P1       6           0
P2       8           0
P3       7           0
P4       3           0

Order by burst: P4(3), P1(6), P3(7), P2(8)

|P4 |  P1  |  P3   |   P2   |
0   3      9      16       24

Wait: P1=3, P2=16, P3=9, P4=0
Average: (3+16+9+0)/4 = 7
```

**Optimal for minimizing average wait time**, but:
- Requires knowing burst times in advance
- Can cause starvation of long jobs

### Shortest-Remaining-Time-First (SRTF)

Preemptive version of SJF: if a new process arrives with shorter remaining time, preempt current process.

```
Process  Burst  Arrival
P1       8      0
P2       4      1
P3       9      2
P4       5      3

Timeline:
Time 0: P1 starts (remaining: 8)
Time 1: P2 arrives (4 < 7), preempt P1
Time 2: P3 arrives (9 > 3), P2 continues
Time 3: P4 arrives (5 > 2), P2 continues
Time 5: P2 completes. Ready: P1(7), P3(9), P4(5)
        P4 starts (shortest remaining)
Time 10: P4 completes. Ready: P1(7), P3(9)
         P1 resumes (7 remaining)
Time 17: P1 completes
Time 17-26: P3 runs

|P1|   P2   |  P4   |    P1     |    P3     |
0  1       5      10         17          26
```

### Round Robin (RR)

Each process gets a fixed time quantum, then goes to back of queue.

```c
void round_robin(Queue* ready, int quantum) {
    while (!empty(ready)) {
        Process* p = dequeue(ready);
        int run_time = min(p->remaining, quantum);
        run(p, run_time);
        p->remaining -= run_time;

        if (p->remaining > 0) {
            enqueue(ready, p);  // Back of queue
        }
    }
}
```

**Example (quantum = 4):**
```
Process  Burst Time
P1       24
P2       3
P3       3

Round 1: P1(4), P2(3), P3(3) → P2 and P3 complete
Round 2-6: P1 runs remaining 20 in chunks of 4

|P1 |P2 |P3 |P1 |P1 |P1 |P1 |P1 |
0   4   7  10  14  18  22  26  30
```

**Time Quantum Trade-offs:**
- Too large → degrades to FCFS
- Too small → too much context switch overhead
- Rule of thumb: 80% of bursts should complete within one quantum

### Priority Scheduling

Each process has a priority; highest priority runs first.

```c
typedef struct {
    int pid;
    int priority;  // Lower number = higher priority
    int burst_time;
} Process;

Process* select_highest_priority(Queue* ready) {
    Process* best = NULL;
    for (Process* p : ready) {
        if (best == NULL || p->priority < best->priority) {
            best = p;
        }
    }
    return best;
}
```

**Starvation Problem:** Low-priority processes may never run.

**Solution - Aging:** Gradually increase priority of waiting processes.

```c
void age_processes(Queue* ready) {
    for (Process* p : ready) {
        p->wait_time++;
        if (p->wait_time % AGING_INTERVAL == 0) {
            p->priority--;  // Increase priority
        }
    }
}
```

### Multilevel Queue Scheduling

Different queues for different process types:

```
┌─────────────────────────────────┐
│    System Processes (highest)   │ ← Fixed priority
├─────────────────────────────────┤
│    Interactive Processes        │ ← Round Robin
├─────────────────────────────────┤
│    Interactive Editing          │
├─────────────────────────────────┤
│    Batch Processes              │ ← FCFS
├─────────────────────────────────┤
│    Student Processes (lowest)   │
└─────────────────────────────────┘
```

Processes are permanently assigned to a queue based on type.

### Multilevel Feedback Queue

Processes can move between queues based on behavior:

```
Queue 0 (highest): RR, quantum = 8
         │
         ↓ If uses full quantum
Queue 1: RR, quantum = 16
         │
         ↓ If uses full quantum
Queue 2 (lowest): FCFS

If process blocks before quantum expires → promote
If process uses full quantum → demote
```

**Behavior:**
- I/O-bound processes stay in high-priority queues
- CPU-bound processes sink to lower queues
- Adapts to process behavior automatically

---

## Common Patterns and Calculations

### Calculating Metrics

For each process, calculate:

```
Turnaround Time = Completion Time - Arrival Time
Waiting Time = Turnaround Time - Burst Time
Response Time = First Run Time - Arrival Time
```

**Example Calculation:**
```
Process  Arrival  Burst  Completion
P1       0        5      5
P2       1        3      10
P3       2        8      18

P1: Turnaround = 5-0 = 5, Wait = 5-5 = 0
P2: Turnaround = 10-1 = 9, Wait = 9-3 = 6
P3: Turnaround = 18-2 = 16, Wait = 16-8 = 8

Averages: Turnaround = 10, Wait = 4.67
```

### Gantt Chart Construction

1. List processes with arrival and burst times
2. At each time point, apply scheduling algorithm
3. Record which process runs and for how long
4. Mark completions

```
Time  Ready Queue    Decision           Running
0     [P1]           P1 arrives, runs   P1
1     [P1,P2]        P2 arrives         P1 (RR continues)
4     [P2,P1]        P1 quantum expires P2
...
```

---

## Common Mistakes and Debugging

### Mistake 1: Ignoring Arrival Times

```
// Wrong - assumes all arrive at time 0
sort_by_burst(processes);
run_in_order(processes);

// Correct - check arrival times
time = 0;
while (processes_remaining) {
    ready = get_arrived_processes(time);
    next = select_by_algorithm(ready);
    // ...
}
```

### Mistake 2: Preemption Timing

In SRTF, check for preemption only when new processes arrive:

```
// Wrong - checking every tick
for (time = 0; time < total; time++) {
    if (should_preempt()) { ... }  // Unnecessary
}

// Correct - check at arrivals
for each arrival_time:
    if (new_process.remaining < current.remaining) {
        preempt();
    }
```

### Mistake 3: Round Robin Queue Order

```
// Wrong - new arrivals jump ahead
if (p.remaining > 0) {
    queue.insert_front(p);  // Wrong!
}

// Correct - new arrivals go to back
if (p.remaining > 0) {
    queue.insert_back(p);
}
```

### Mistake 4: Forgetting Context Switch Overhead

```
// Simplified model ignores overhead
run(process, quantum);

// Realistic model includes it
context_switch_time = 0.1;
actual_run = quantum - context_switch_time;
run(process, actual_run);
```

---

## Best Practices

1. **Match algorithm to workload:**
   - Interactive systems: Round Robin or Multilevel Feedback
   - Batch processing: SJF
   - Real-time: Priority with deadlines

2. **Tune time quantum carefully:**
   - Measure typical burst times
   - Set quantum so 80% complete within one slice

3. **Prevent starvation:**
   - Use aging in priority systems
   - Use feedback queues that promote waiting processes

4. **Consider context switch cost:**
   - Factor overhead into quantum size decisions
   - Too small quantum = too much overhead

5. **Monitor and adapt:**
   - Track CPU utilization, wait times, throughput
   - Adjust parameters based on actual workload

---

## Summary

You've learned how operating systems schedule CPU time:

- **Scheduling Criteria**: Utilization, throughput, turnaround, waiting, response time
- **FCFS**: Simple but causes convoy effect
- **SJF/SRTF**: Optimal average wait but needs burst time prediction
- **Round Robin**: Fair, good for interactive systems
- **Priority**: Flexible but risks starvation (use aging)
- **Multilevel Feedback Queue**: Adapts to process behavior

**Key takeaways:**
- No single algorithm is best for all workloads
- Trade-offs exist between fairness, response time, and throughput
- Modern systems use multilevel feedback queues
- Always consider context switch overhead

---

## Further Exploration

Deepen your understanding:
- Explore Linux's Completely Fair Scheduler (CFS)
- Study real-time scheduling: Rate Monotonic, Earliest Deadline First
- Experiment with `/proc/[pid]/sched` to see Linux scheduling info
- Implement a scheduler simulator to compare algorithms
- Research proportional share scheduling and lottery scheduling
