# Deadlock

Picture this: Thread A holds Lock 1 and needs Lock 2. Thread B holds Lock 2 and needs Lock 1. Neither can proceed—they're stuck forever. This is deadlock, and in this topic, you'll learn to recognize, prevent, avoid, detect, and recover from it.

**Learning Objectives:**
- Identify the four necessary conditions for deadlock
- Construct and analyze resource allocation graphs
- Apply deadlock prevention techniques
- Implement the Banker's Algorithm for deadlock avoidance
- Design deadlock detection algorithms
- Evaluate recovery strategies and their trade-offs

---

## Core Concepts

### What is Deadlock?

A **deadlock** is a situation where a set of processes are blocked indefinitely, each waiting for a resource held by another process in the set.

```
    Thread A                Thread B
    ────────                ────────
    holds Lock 1            holds Lock 2
    wants Lock 2            wants Lock 1
         │                       │
         └───── waiting for ─────┘
              (circular wait)
```

Real-world analogy: Two cars meet on a narrow bridge from opposite directions. Neither can move forward, neither will back up.

### The Four Necessary Conditions

For deadlock to occur, ALL four conditions must hold simultaneously:

**1. Mutual Exclusion**
- At least one resource must be non-shareable
- Only one process can use the resource at a time

**2. Hold and Wait**
- A process holds at least one resource
- AND waits to acquire additional resources held by others

**3. No Preemption**
- Resources cannot be forcibly taken from a process
- Must be released voluntarily

**4. Circular Wait**
- A cycle exists in the wait graph
- P1 → P2 → P3 → ... → Pn → P1

```c
// Example creating all four conditions
pthread_mutex_t lock_a, lock_b;

void* thread_1(void* arg) {
    pthread_mutex_lock(&lock_a);    // Hold lock_a
    sleep(1);                        // Increase chance of interleaving
    pthread_mutex_lock(&lock_b);    // Wait for lock_b → DEADLOCK
    // ...
}

void* thread_2(void* arg) {
    pthread_mutex_lock(&lock_b);    // Hold lock_b
    sleep(1);
    pthread_mutex_lock(&lock_a);    // Wait for lock_a → DEADLOCK
    // ...
}
```

---

## Resource Allocation Graphs

Visual representation of resource allocation and requests:

```
Symbols:
  ○ Process (circle)
  ▢ Resource (square with dots for instances)
  → Request edge: process → resource (process wants resource)
  → Assignment edge: resource → process (process holds resource)

Example - No Deadlock:
    ○ P1 ──→ ▢ R1 ●    P1 wants R1
                  │
                  ↓
             ○ P2        P2 holds R1

Example - Deadlock:
    ○ P1 ←── ▢ R1 ●    P1 holds R1
    │
    ↓
    ▢ R2 ● ──→ ○ P2    P1 wants R2, P2 holds R2
         ↑         │
         └─────────┘    P2 wants R1 (circular wait!)
```

### Detecting Cycles

If the graph contains a cycle:
- With single-instance resources: **Deadlock exists**
- With multi-instance resources: **Deadlock may exist** (need further analysis)

```c
// Graph structure for deadlock detection
typedef struct {
    int num_processes;
    int num_resources;
    int** allocation;   // allocation[i][j] = units of j held by i
    int** request;      // request[i][j] = units of j requested by i
    int* available;     // available[j] = free units of resource j
} ResourceGraph;
```

---

## Deadlock Prevention

Prevent deadlock by ensuring at least one necessary condition cannot hold:

### 1. Attack Mutual Exclusion

Make resources shareable where possible:
- Use read-write locks instead of exclusive locks
- Use lock-free data structures

```c
// Instead of exclusive lock
pthread_mutex_lock(&mutex);

// Use read-write lock when possible
pthread_rwlock_rdlock(&rwlock);  // Multiple readers OK
```

Limited applicability—many resources must be exclusive.

### 2. Attack Hold and Wait

Require processes to request all resources at once:

```c
// WRONG - Hold and wait
pthread_mutex_lock(&lock_a);
// ... do work ...
pthread_mutex_lock(&lock_b);  // Wait while holding lock_a

// CORRECT - Request all at once
request_all_or_none(lock_a, lock_b);
// Either get both or neither
```

Drawbacks:
- Low resource utilization
- Must know all resources in advance
- May cause starvation

### 3. Attack No Preemption

Allow resources to be taken away:

```c
// If can't get all resources, release what you have
if (pthread_mutex_trylock(&lock_b) != 0) {
    pthread_mutex_unlock(&lock_a);  // Release and retry
    return RETRY;
}
```

Only works for resources whose state can be saved (CPU registers, memory pages).

### 4. Attack Circular Wait (Most Practical)

Impose a total ordering on resources and require locks be acquired in order:

```c
// Assign numbers to all locks
#define LOCK_A_ORDER 1
#define LOCK_B_ORDER 2
#define LOCK_C_ORDER 3

// ALWAYS acquire in ascending order
void acquire_locks() {
    pthread_mutex_lock(&lock_a);  // Order 1
    pthread_mutex_lock(&lock_b);  // Order 2
    pthread_mutex_lock(&lock_c);  // Order 3
}

// Release in reverse order (good practice)
void release_locks() {
    pthread_mutex_unlock(&lock_c);
    pthread_mutex_unlock(&lock_b);
    pthread_mutex_unlock(&lock_a);
}
```

This is the most commonly used prevention technique.

---

## Deadlock Avoidance

Allow the first three conditions, but carefully avoid circular wait through dynamic analysis.

### Safe State

A state is **safe** if the system can allocate resources to each process in some order and avoid deadlock.

```
Safe state → No deadlock (guaranteed)
Unsafe state → Deadlock is possible (not guaranteed)
Deadlock → Unsafe state

Safe states ⊃ States without deadlock
```

### The Banker's Algorithm

Named after a banker who never allocates cash such that they can't satisfy all customers.

**Data Structures:**
```c
int n;  // Number of processes
int m;  // Number of resource types

int available[m];      // Available instances of each resource
int max[n][m];         // Maximum demand of each process
int allocation[n][m];  // Currently allocated to each process
int need[n][m];        // Remaining need (max - allocation)
```

**Safety Algorithm:**
```c
bool is_safe() {
    int work[m];
    bool finish[n];

    // Initialize
    for (int i = 0; i < m; i++) work[i] = available[i];
    for (int i = 0; i < n; i++) finish[i] = false;

    // Find process that can complete
    while (true) {
        bool found = false;
        for (int i = 0; i < n; i++) {
            if (!finish[i] && need[i] <= work) {
                // Process i can complete
                for (int j = 0; j < m; j++)
                    work[j] += allocation[i][j];
                finish[i] = true;
                found = true;
            }
        }
        if (!found) break;
    }

    // Safe if all processes can complete
    for (int i = 0; i < n; i++)
        if (!finish[i]) return false;
    return true;
}
```

**Resource Request Algorithm:**
```c
bool request_resources(int process_id, int request[]) {
    // Check if request is valid
    if (request > need[process_id])
        return false;  // Error: exceeded maximum claim

    if (request > available)
        return false;  // Must wait

    // Tentatively allocate
    for (int j = 0; j < m; j++) {
        available[j] -= request[j];
        allocation[process_id][j] += request[j];
        need[process_id][j] -= request[j];
    }

    // Check if still safe
    if (is_safe()) {
        return true;  // Grant request
    } else {
        // Rollback
        for (int j = 0; j < m; j++) {
            available[j] += request[j];
            allocation[process_id][j] -= request[j];
            need[process_id][j] += request[j];
        }
        return false;  // Deny request
    }
}
```

**Example:**
```
5 processes (P0-P4), 3 resource types (A, B, C)
Available: [3, 3, 2]

       Allocation    Max        Need
       A  B  C    A  B  C    A  B  C
P0     0  1  0    7  5  3    7  4  3
P1     2  0  0    3  2  2    1  2  2
P2     3  0  2    9  0  2    6  0  0
P3     2  1  1    2  2  2    0  1  1
P4     0  0  2    4  3  3    4  3  1

Safe sequence exists: P1, P3, P4, P2, P0
```

---

## Deadlock Detection

Allow deadlocks to occur, then detect and recover.

### Detection Algorithm

Similar to safety algorithm, but uses actual requests instead of maximum:

```c
bool detect_deadlock() {
    int work[m];
    bool finish[n];

    for (int i = 0; i < m; i++) work[i] = available[i];

    // Initially, processes with no allocation are "finished"
    for (int i = 0; i < n; i++)
        finish[i] = (sum(allocation[i]) == 0);

    while (true) {
        bool found = false;
        for (int i = 0; i < n; i++) {
            if (!finish[i] && request[i] <= work) {
                for (int j = 0; j < m; j++)
                    work[j] += allocation[i][j];
                finish[i] = true;
                found = true;
            }
        }
        if (!found) break;
    }

    // Deadlock if any process not finished
    for (int i = 0; i < n; i++)
        if (!finish[i]) return true;
    return false;
}
```

### When to Run Detection?

- **On each resource request**: High overhead, immediate detection
- **Periodically**: Lower overhead, delayed detection
- **When CPU utilization drops**: Good heuristic for deadlock

---

## Deadlock Recovery

Once detected, recover by breaking the cycle:

### Process Termination

**Abort all deadlocked processes:**
- Simple but expensive
- Loses all work in progress

**Abort one at a time until cycle broken:**
- Choose victim based on priority, resources held, time executed
- Re-run detection after each termination

```c
void recover_by_termination() {
    while (detect_deadlock()) {
        Process* victim = select_victim();  // Lowest priority, etc.
        terminate(victim);
        release_resources(victim);
    }
}
```

### Resource Preemption

Take resources from a process and give to another:

**Selecting victim:**
- Minimize cost (resources held, time executed, priority)

**Rollback:**
- Return process to safe state
- May require checkpointing

**Starvation:**
- Ensure a process isn't always selected as victim
- Include number of rollbacks in cost function

```c
void recover_by_preemption() {
    while (detect_deadlock()) {
        Resource* r = select_resource_to_preempt();
        Process* victim = r->holder;

        rollback(victim);  // Restore to checkpoint
        grant_resource(r, waiting_process);
    }
}
```

---

## Common Patterns and Best Practices

### Lock Ordering

The most practical prevention technique:

```c
// Define a global lock order
enum LockOrder { DB_LOCK = 1, CACHE_LOCK = 2, LOG_LOCK = 3 };

// Always acquire in order
void safe_transaction() {
    pthread_mutex_lock(&db_lock);      // First
    pthread_mutex_lock(&cache_lock);   // Second
    pthread_mutex_lock(&log_lock);     // Third

    // ... do work ...

    pthread_mutex_unlock(&log_lock);
    pthread_mutex_unlock(&cache_lock);
    pthread_mutex_unlock(&db_lock);
}
```

### Try-Lock with Backoff

```c
bool try_acquire_both(pthread_mutex_t* a, pthread_mutex_t* b) {
    while (true) {
        pthread_mutex_lock(a);
        if (pthread_mutex_trylock(b) == 0) {
            return true;  // Got both
        }
        pthread_mutex_unlock(a);  // Release and retry
        usleep(random_backoff());
    }
}
```

### Lock Timeout

```c
int lock_with_timeout(pthread_mutex_t* mutex, int timeout_ms) {
    struct timespec ts;
    clock_gettime(CLOCK_REALTIME, &ts);
    ts.tv_sec += timeout_ms / 1000;
    ts.tv_nsec += (timeout_ms % 1000) * 1000000;

    return pthread_mutex_timedlock(mutex, &ts);
}
```

---

## Common Mistakes

### Mistake 1: Inconsistent Lock Ordering

```c
// Thread 1           // Thread 2
lock(A);              lock(B);  // WRONG - different order
lock(B);              lock(A);
// DEADLOCK!

// CORRECT - same order in all threads
lock(A);              lock(A);
lock(B);              lock(B);
```

### Mistake 2: Hidden Lock Dependencies

```c
void function_a() {
    lock(A);
    function_b();  // Hidden: function_b locks B
    unlock(A);
}

void function_c() {
    lock(B);
    function_d();  // Hidden: function_d locks A
    unlock(B);
}
// Deadlock can occur if A calls B in one path, B calls A in another
```

### Mistake 3: Lock in Callback

```c
void register_callback(callback_t cb) {
    lock(mutex);
    callbacks.push(cb);  // cb might try to lock mutex!
    unlock(mutex);
}

// SAFER: Release lock before callback
void notify_callbacks() {
    lock(mutex);
    local_copy = callbacks;
    unlock(mutex);

    for (cb in local_copy) {
        cb();  // Called without lock held
    }
}
```

---

## Summary

You've learned how to handle deadlocks in concurrent systems:

- **Four Conditions**: Mutual exclusion, hold & wait, no preemption, circular wait
- **Resource Allocation Graphs**: Visual deadlock detection (cycle = deadlock)
- **Prevention**: Break one condition (usually circular wait via lock ordering)
- **Avoidance**: Banker's Algorithm ensures safe states
- **Detection**: Periodically check for deadlock
- **Recovery**: Terminate processes or preempt resources

**Key takeaways:**
- Prevention via lock ordering is the most practical approach
- Trade-off exists: prevention/avoidance restrict concurrency, detection allows more but needs recovery
- Most general-purpose OSes ignore deadlocks (assume they're rare)

---

## Further Exploration

Deepen your understanding:
- Study wait-die and wound-wait schemes in databases
- Explore lock-free and wait-free data structures
- Learn about priority inversion and priority inheritance
- Investigate watchdog timers for deadlock recovery
- Research formal verification tools for detecting potential deadlocks
