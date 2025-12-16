# Process Scheduling Queues

Process scheduling involves managing multiple queues that hold processes in various states. This subtopic explores scheduling queues, schedulers, and their interactions.

## Scheduling Queues

The operating system maintains several queues to manage processes:

### Ready Queue

The **ready queue** contains all processes residing in main memory that are ready and waiting to execute. Implemented as a linked list with the queue header containing pointers to the first and last PCBs.

```
Ready Queue:
Head → [PCB7] → [PCB3] → [PCB15] → [PCB2] → Tail
        ↑
    Next to run
```

### Device Queues

Each I/O device has a **device queue** (or wait queue) containing processes waiting for that particular device:

```
Disk Queue:      [PCB4] → [PCB9] → [PCB12] → NULL
Keyboard Queue:  [PCB5] → NULL
Network Queue:   [PCB8] → [PCB1] → [PCB11] → NULL
```

### Job Queue

In batch systems, the **job queue** contains all processes in the system, including those waiting on secondary storage.

## Queue Diagram

```
                    ┌──────────────┐
                    │   Ready      │
      ┌────────────→│   Queue      │──────────────┐
      │             └──────────────┘              │
      │                                           ↓
      │                                       ┌───────┐
      │                                       │  CPU  │
      │                                       └───┬───┘
      │                                           │
      │         ┌─────────────────────────────────┼───────────────┐
      │         │                                 │               │
      │         ↓                                 ↓               ↓
      │   ┌───────────┐                   ┌───────────┐   ┌───────────┐
      │   │  I/O      │                   │  time     │   │  fork a   │
      │   │  request  │                   │  slice    │   │  child    │
      │   └─────┬─────┘                   │  expired  │   └─────┬─────┘
      │         │                         └─────┬─────┘         │
      │         ↓                               │               ↓
      │   ┌───────────┐                         │        ┌───────────┐
      │   │  I/O      │                         │        │  child    │
      │   │  Queue    │                         │        │ executes  │
      │   └─────┬─────┘                         │        └─────┬─────┘
      │         │                               │               │
      │    I/O  │                               │     wait for  │
      │ complete│                               │     interrupt │
      │         │                               │               │
      └─────────┴───────────────────────────────┴───────────────┘
```

## Types of Schedulers

### Long-Term Scheduler (Job Scheduler)

The **long-term scheduler** selects processes from the job pool (on disk) and loads them into memory for execution.

Characteristics:
- Controls the **degree of multiprogramming** (number of processes in memory)
- Invoked infrequently (seconds to minutes)
- Can afford to take time selecting processes
- Should balance CPU-bound and I/O-bound processes

```c
// Conceptual long-term scheduler
void long_term_scheduler() {
    while (1) {
        if (memory_available() && jobs_waiting()) {
            Job *job = select_from_job_queue();
            Process *p = create_process(job);
            add_to_ready_queue(p);
        }
        sleep(LONG_TERM_INTERVAL);
    }
}
```

### Short-Term Scheduler (CPU Scheduler)

The **short-term scheduler** selects from processes in the ready queue and allocates the CPU to one of them.

Characteristics:
- Invoked very frequently (every few milliseconds)
- Must be extremely fast
- Directly affects system responsiveness
- Implements scheduling algorithms (FCFS, SJF, RR, etc.)

```c
// Conceptual short-term scheduler
Process* short_term_scheduler() {
    Process *next = NULL;

    switch (scheduling_algorithm) {
        case FCFS:
            next = ready_queue_dequeue();
            break;
        case ROUND_ROBIN:
            next = ready_queue_dequeue();
            set_timer(time_quantum);
            break;
        case PRIORITY:
            next = get_highest_priority();
            break;
    }

    return next;
}
```

### Medium-Term Scheduler

The **medium-term scheduler** temporarily removes processes from memory (swapping) to reduce the degree of multiprogramming.

```
                     swap out
    Ready Queue  ←────────────────→  Swap Space
                     swap in             (Disk)
```

Reasons for swapping:
- Memory pressure (not enough physical memory)
- Process has been waiting too long
- Higher priority process needs memory
- Interactive process being de-prioritized

## Scheduler Comparison

| Scheduler | Frequency | Speed | Purpose |
|-----------|-----------|-------|---------|
| Long-term | Minutes | Slow OK | Admit processes |
| Short-term | Milliseconds | Must be fast | Select for CPU |
| Medium-term | Seconds | Moderate | Manage memory |

## Process Mix

The long-term scheduler should maintain a good **process mix**:

**CPU-bound processes**: Spend most time computing, rarely do I/O
- Example: Scientific computing, video encoding
- If too many: I/O devices idle, poor responsiveness

**I/O-bound processes**: Spend most time waiting for I/O
- Example: Interactive programs, web servers
- If too many: CPU idle, wasted processing capacity

Ideal mix keeps both CPU and I/O devices busy.

## Queue Implementation

### Linked List Queue

```c
typedef struct QueueNode {
    PCB *process;
    struct QueueNode *next;
} QueueNode;

typedef struct {
    QueueNode *head;
    QueueNode *tail;
    int count;
} ProcessQueue;

void enqueue(ProcessQueue *q, PCB *p) {
    QueueNode *node = malloc(sizeof(QueueNode));
    node->process = p;
    node->next = NULL;

    if (q->tail == NULL) {
        q->head = q->tail = node;
    } else {
        q->tail->next = node;
        q->tail = node;
    }
    q->count++;
}

PCB* dequeue(ProcessQueue *q) {
    if (q->head == NULL) return NULL;

    QueueNode *node = q->head;
    PCB *p = node->process;
    q->head = node->next;

    if (q->head == NULL) {
        q->tail = NULL;
    }

    free(node);
    q->count--;
    return p;
}
```

### Priority Queue (Heap-based)

For priority scheduling:

```c
typedef struct {
    PCB *processes[MAX_PROCESSES];
    int size;
} PriorityQueue;

void pq_insert(PriorityQueue *pq, PCB *p) {
    int i = pq->size++;
    pq->processes[i] = p;

    // Bubble up
    while (i > 0) {
        int parent = (i - 1) / 2;
        if (pq->processes[i]->priority <= pq->processes[parent]->priority)
            break;
        swap(&pq->processes[i], &pq->processes[parent]);
        i = parent;
    }
}

PCB* pq_extract_max(PriorityQueue *pq) {
    if (pq->size == 0) return NULL;

    PCB *max = pq->processes[0];
    pq->processes[0] = pq->processes[--pq->size];

    // Heapify down
    heapify(pq, 0);
    return max;
}
```

## Multilevel Queues

Modern systems often use **multilevel queues**:

```
┌─────────────────────────────────┐  Highest Priority
│  System Processes               │
├─────────────────────────────────┤
│  Interactive Processes          │
├─────────────────────────────────┤
│  Interactive Editing Processes  │
├─────────────────────────────────┤
│  Batch Processes                │
├─────────────────────────────────┤
│  Student Processes              │  Lowest Priority
└─────────────────────────────────┘
```

Each queue may have its own scheduling algorithm.

## Summary

Process scheduling queues are fundamental to operating system operation:
- Ready queue holds processes waiting for CPU
- Device queues hold processes waiting for I/O
- Long-term scheduler controls multiprogramming degree
- Short-term scheduler rapidly allocates CPU
- Medium-term scheduler manages memory through swapping
- Proper process mix keeps system resources utilized
- Queue implementation affects scheduling performance
