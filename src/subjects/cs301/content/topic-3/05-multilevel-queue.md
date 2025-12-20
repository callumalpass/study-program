---
id: cs301-t3-multilevel
title: "Multilevel Queue"
order: 5
---

# Multilevel Queue Scheduling

Multilevel queue scheduling partitions processes into separate queues with different scheduling algorithms. This subtopic covers multilevel and multilevel feedback queue scheduling.

## Multilevel Queue Scheduling

Processes are permanently assigned to queues based on properties:

```
┌─────────────────────────────────────────┐
│  System Processes       RR, q=2         │ ← Highest Priority
├─────────────────────────────────────────┤
│  Interactive Processes  RR, q=10        │
├─────────────────────────────────────────┤
│  Batch Processes        FCFS            │
├─────────────────────────────────────────┤
│  Student Processes      FCFS            │ ← Lowest Priority
└─────────────────────────────────────────┘
```

### Implementation

```c
typedef enum {
    SYSTEM_QUEUE = 0,
    INTERACTIVE_QUEUE,
    BATCH_QUEUE,
    IDLE_QUEUE,
    NUM_QUEUES
} QueueType;

typedef struct {
    Queue queues[NUM_QUEUES];
    int time_slice[NUM_QUEUES];
    int (*schedule_func[NUM_QUEUES])(Queue*);
} MultilevelQueue;

void mlq_init(MultilevelQueue* mlq) {
    // System: RR with small quantum
    mlq->time_slice[SYSTEM_QUEUE] = 2;
    mlq->schedule_func[SYSTEM_QUEUE] = round_robin_select;

    // Interactive: RR with larger quantum
    mlq->time_slice[INTERACTIVE_QUEUE] = 10;
    mlq->schedule_func[INTERACTIVE_QUEUE] = round_robin_select;

    // Batch: FCFS
    mlq->time_slice[BATCH_QUEUE] = 0;  // Run to completion
    mlq->schedule_func[BATCH_QUEUE] = fcfs_select;

    // Idle: FCFS
    mlq->time_slice[IDLE_QUEUE] = 0;
    mlq->schedule_func[IDLE_QUEUE] = fcfs_select;
}

Process* mlq_select(MultilevelQueue* mlq) {
    // Check queues in priority order
    for (int q = 0; q < NUM_QUEUES; q++) {
        if (!queue_empty(&mlq->queues[q])) {
            return mlq->schedule_func[q](&mlq->queues[q]);
        }
    }
    return NULL;
}
```

### Scheduling Between Queues

**Fixed Priority**: Higher queues always have priority
```c
// Lower queues may starve
Process* fixed_priority_select(MultilevelQueue* mlq) {
    for (int q = 0; q < NUM_QUEUES; q++) {
        Process* p = dequeue_ready(&mlq->queues[q]);
        if (p) return p;
    }
    return NULL;
}
```

**Time Slicing Between Queues**: Each queue gets CPU percentage
```c
// Example: System 50%, Interactive 30%, Batch 15%, Idle 5%
int queue_time_allocation[NUM_QUEUES] = {50, 30, 15, 5};

void time_slice_scheduling(MultilevelQueue* mlq) {
    int total_time = 100;  // 100 time units per cycle

    for (int q = 0; q < NUM_QUEUES; q++) {
        int allocated = queue_time_allocation[q];
        int used = 0;

        while (used < allocated && !queue_empty(&mlq->queues[q])) {
            Process* p = dequeue(&mlq->queues[q]);
            int exec_time = min(mlq->time_slice[q], allocated - used);
            execute(p, exec_time);
            used += exec_time;

            if (p->remaining > 0) {
                enqueue(&mlq->queues[q], p);
            }
        }
    }
}
```

## Multilevel Feedback Queue (MLFQ)

Unlike basic multilevel queues, MLFQ allows processes to move between queues based on behavior.

```
Queue 0: RR, quantum=8   ← New processes start here
    │
    │ Uses full quantum
    ↓
Queue 1: RR, quantum=16
    │
    │ Uses full quantum
    ↓
Queue 2: FCFS            ← CPU-bound processes end up here
```

### MLFQ Rules

1. If Priority(A) > Priority(B), A runs
2. If Priority(A) = Priority(B), run in RR
3. New processes start at highest priority
4. If process uses entire time slice, move to lower queue
5. If process gives up CPU before quantum, stay at current level

### MLFQ Implementation

```c
typedef struct {
    int pid;
    int remaining_time;
    int current_queue;
    int allotment_remaining;  // Time left at current level
} MLFQProcess;

typedef struct {
    Queue queues[3];
    int quantum[3];      // {8, 16, infinite}
    int allotment[3];    // Time before demotion
} MLFQ;

void mlfq_init(MLFQ* mlfq) {
    mlfq->quantum[0] = 8;
    mlfq->quantum[1] = 16;
    mlfq->quantum[2] = 0;  // FCFS

    mlfq->allotment[0] = 8;
    mlfq->allotment[1] = 16;
    mlfq->allotment[2] = INT_MAX;  // No limit
}

void mlfq_add_process(MLFQ* mlfq, MLFQProcess* p) {
    p->current_queue = 0;  // Start at highest priority
    p->allotment_remaining = mlfq->allotment[0];
    enqueue(&mlfq->queues[0], p);
}

void mlfq_tick(MLFQ* mlfq, MLFQProcess* running) {
    running->remaining_time--;
    running->allotment_remaining--;

    if (running->remaining_time == 0) {
        // Process complete
        return;
    }

    if (running->allotment_remaining == 0) {
        // Used up allotment, demote
        int q = running->current_queue;
        if (q < 2) {
            running->current_queue = q + 1;
            running->allotment_remaining = mlfq->allotment[q + 1];
        }
        enqueue(&mlfq->queues[running->current_queue], running);
    }
}
```

### MLFQ Example

Process P with burst = 40:

```
Queue 0 (quantum=8):
  P runs for 8 units → demoted to Queue 1

Queue 1 (quantum=16):
  P runs for 16 units → demoted to Queue 2

Queue 2 (FCFS):
  P runs for remaining 16 units → completes

Total: 8 + 16 + 16 = 40 units
```

### Gaming Prevention

Processes might game the system by relinquishing CPU just before quantum expires:

```c
// Gaming: Process sleeps for 1μs before quantum expires
// to maintain high priority

// Solution: Track total CPU time at each level
void mlfq_track_allotment(MLFQ* mlfq, MLFQProcess* p, int time_used) {
    p->total_time_at_level += time_used;

    if (p->total_time_at_level >= mlfq->allotment[p->current_queue]) {
        // Demote regardless of how time was used
        demote(mlfq, p);
    }
}
```

### Priority Boost

Prevent starvation by periodically boosting all processes:

```c
void mlfq_priority_boost(MLFQ* mlfq) {
    // Move all processes to Queue 0
    for (int q = 1; q < 3; q++) {
        while (!queue_empty(&mlfq->queues[q])) {
            MLFQProcess* p = dequeue(&mlfq->queues[q]);
            p->current_queue = 0;
            p->allotment_remaining = mlfq->allotment[0];
            enqueue(&mlfq->queues[0], p);
        }
    }
}

// Call periodically
void mlfq_scheduler(MLFQ* mlfq) {
    static int ticks = 0;
    const int BOOST_PERIOD = 1000;

    ticks++;
    if (ticks >= BOOST_PERIOD) {
        mlfq_priority_boost(mlfq);
        ticks = 0;
    }

    // Regular scheduling...
}
```

## MLFQ in Practice

### BSD Unix

Original BSD 4.3 MLFQ:
- 32 priority levels
- Processes move based on CPU usage
- Priority recalculated every second

### Linux CFS

Linux uses Completely Fair Scheduler (different approach but similar goals):
- Red-black tree of processes
- Virtual runtime determines scheduling
- Achieves fairness without explicit queues

## Comparison

| Feature | Multilevel Queue | MLFQ |
|---------|------------------|------|
| Queue movement | None | Dynamic |
| Starvation | Possible | Prevented by boost |
| Adaptability | None | Adapts to behavior |
| Complexity | Lower | Higher |
| Gaming | Not an issue | Must be prevented |

## Summary

Multilevel queue scheduling provides differentiated service:
- Basic MLQ: Fixed queue assignment based on process type
- MLFQ: Dynamic queue movement based on behavior
- MLFQ adapts to process characteristics automatically
- Gaming and starvation must be addressed in MLFQ
- Modern systems use variations of these concepts
- Balance complexity with fairness and efficiency
