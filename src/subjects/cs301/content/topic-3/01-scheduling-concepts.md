---
id: cs301-t3-concepts
title: "Scheduling Concepts"
order: 1
---

# CPU Scheduling Concepts

CPU scheduling determines which process runs when multiple processes are ready. This subtopic introduces scheduling criteria, objectives, and fundamental concepts.

## The Need for Scheduling

In a multiprogramming system, multiple processes compete for the CPU. The scheduler decides which process gets the CPU and for how long.

### CPU-I/O Burst Cycle

Process execution alternates between CPU and I/O bursts:

```
    CPU burst    I/O wait    CPU burst    I/O wait    CPU burst
    ├──────────┤├──────────┤├──────────┤├──────────┤├──────────┤
      5 ms        10 ms        3 ms        15 ms        2 ms
```

**CPU-bound processes**: Long CPU bursts, few I/O bursts (scientific computing)
**I/O-bound processes**: Short CPU bursts, many I/O bursts (interactive applications)

## Scheduling Criteria

Different scheduling algorithms optimize for different metrics:

### CPU Utilization

Keep the CPU as busy as possible:
- Ideal: 100% utilization
- Typical: 40-90%

```
CPU Utilization = (CPU busy time) / (Total time) × 100%
```

### Throughput

Number of processes completed per time unit:

```
Throughput = (Number of processes completed) / (Total time)
```

### Turnaround Time

Total time from submission to completion:

```
Turnaround Time = Completion Time - Arrival Time
                = Waiting Time + Burst Time
```

### Waiting Time

Time spent in the ready queue:

```
Waiting Time = Turnaround Time - Burst Time
             = Time in ready queue
```

### Response Time

Time from submission to first response (important for interactive systems):

```
Response Time = First CPU access - Arrival Time
```

## Scheduling Objectives

Conflicting objectives require trade-offs:

| Goal | Metric | Priority |
|------|--------|----------|
| Maximize | CPU utilization | Batch systems |
| Maximize | Throughput | Batch systems |
| Minimize | Turnaround time | All systems |
| Minimize | Waiting time | All systems |
| Minimize | Response time | Interactive systems |

## Preemptive vs Non-preemptive

### Non-preemptive (Cooperative)

Process runs until it:
- Terminates
- Blocks (I/O, wait)
- Voluntarily yields

```c
// Non-preemptive: Process controls when to give up CPU
while (has_work) {
    do_work();
}
// Only releases CPU when done or blocked
```

### Preemptive

OS can interrupt running process:
- Timer interrupt (time slice expired)
- Higher priority process arrives
- Process returns from I/O

```c
// Preemptive: OS can interrupt at any time
while (has_work) {
    do_work();  // May be interrupted here
}
```

## The Scheduler

### Types of Schedulers

**Long-term scheduler**: Admits processes into the system
**Short-term scheduler (CPU scheduler)**: Selects from ready queue
**Medium-term scheduler**: Swaps processes in/out of memory

### Dispatcher

The dispatcher gives CPU control to selected process:

1. Context switch
2. Switch to user mode
3. Jump to proper location in user program

**Dispatch latency**: Time to stop one process and start another

## Scheduling Queues

Processes move between queues:

```
Job Queue: All processes in system

Ready Queue: Processes waiting for CPU
    Head → [P1] → [P3] → [P5] → Tail

Device Queues: Processes waiting for I/O
    Disk:    [P2] → [P7]
    Network: [P4]
```

## Calculating Metrics Example

Given processes:
| Process | Arrival | Burst |
|---------|---------|-------|
| P1 | 0 | 5 |
| P2 | 1 | 3 |
| P3 | 2 | 8 |
| P4 | 3 | 6 |

With FCFS scheduling:
```
Timeline: |--P1--|--P2--|--P3--|--P4--|
          0     5     8     16    22

P1: Turnaround = 5-0 = 5, Waiting = 0
P2: Turnaround = 8-1 = 7, Waiting = 4
P3: Turnaround = 16-2 = 14, Waiting = 6
P4: Turnaround = 22-3 = 19, Waiting = 13

Average Turnaround = (5+7+14+19)/4 = 11.25
Average Waiting = (0+4+6+13)/4 = 5.75
```

## Summary

CPU scheduling is fundamental to multiprogramming:
- Multiple criteria must be balanced
- Preemptive vs non-preemptive affects responsiveness
- Different systems prioritize different metrics
- Scheduler works with dispatcher to execute decisions
- Understanding metrics is essential for algorithm evaluation
