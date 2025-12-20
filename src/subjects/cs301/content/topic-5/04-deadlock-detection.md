# Deadlock Detection

Deadlock detection allows deadlocks to occur but detects them when they happen. This subtopic covers detection algorithms for single and multiple instance resources.

## Detection Strategy

Unlike prevention and avoidance, detection:
- Does not restrict resource allocation
- Periodically checks for deadlock
- Takes recovery action when detected

```
┌──────────────────────────────────────┐
│           System Running             │
│                                      │
│    Allocate         Detect           │
│    resources ───────► deadlock       │
│    freely            periodically    │
│                          │           │
│                          ↓           │
│                      Recover         │
│                      if found        │
└──────────────────────────────────────┘
```

## Single Instance Resources

### Wait-For Graph

Derived from resource allocation graph by removing resource nodes.

```
Resource Allocation Graph:        Wait-For Graph:
     P1                              P1
     │                               │
     ↓                               ↓
    [R1]───→ P2                      P2
              │                      │
              ↓                      ↓
            [R2]───→ P3              P3
                      │              │
                      ↓              ↓
                    [R3]───→ P1      P1

Pi waits for Pj if Pi requests resource held by Pj
```

### Cycle Detection

```c
#define N 10  // Number of processes

typedef struct {
    int adj[N][N];  // adj[i][j] = 1 if Pi waits for Pj
    int n;          // Number of processes
} WaitForGraph;

bool dfs(WaitForGraph* g, int node, bool* visited, bool* rec_stack) {
    visited[node] = true;
    rec_stack[node] = true;

    for (int i = 0; i < g->n; i++) {
        if (g->adj[node][i]) {
            if (!visited[i]) {
                if (dfs(g, i, visited, rec_stack)) {
                    return true;  // Cycle found
                }
            } else if (rec_stack[i]) {
                return true;  // Back edge = cycle
            }
        }
    }

    rec_stack[node] = false;
    return false;
}

bool detect_deadlock_single(WaitForGraph* g) {
    bool visited[N] = {false};
    bool rec_stack[N] = {false};

    for (int i = 0; i < g->n; i++) {
        if (!visited[i]) {
            if (dfs(g, i, visited, rec_stack)) {
                return true;  // Deadlock detected
            }
        }
    }

    return false;
}
```

### Finding Deadlocked Processes

```c
void find_deadlocked(WaitForGraph* g, bool* deadlocked) {
    bool can_finish[N];

    // Initially, processes with no outgoing edges can finish
    for (int i = 0; i < g->n; i++) {
        can_finish[i] = true;
        for (int j = 0; j < g->n; j++) {
            if (g->adj[i][j]) {
                can_finish[i] = false;
                break;
            }
        }
    }

    // Propagate: if all waited-for processes can finish, I can finish
    bool changed = true;
    while (changed) {
        changed = false;
        for (int i = 0; i < g->n; i++) {
            if (!can_finish[i]) {
                bool all_can = true;
                for (int j = 0; j < g->n; j++) {
                    if (g->adj[i][j] && !can_finish[j]) {
                        all_can = false;
                        break;
                    }
                }
                if (all_can) {
                    can_finish[i] = true;
                    changed = true;
                }
            }
        }
    }

    // Processes that cannot finish are deadlocked
    for (int i = 0; i < g->n; i++) {
        deadlocked[i] = !can_finish[i];
    }
}
```

## Multiple Instance Resources

### Detection Algorithm

Similar to safety algorithm but for detecting existing deadlock.

```c
#define N 5   // Processes
#define M 3   // Resource types

typedef struct {
    int available[M];
    int allocation[N][M];
    int request[N][M];  // Current requests (not max)
} DetectionState;

bool detect_deadlock_multi(DetectionState* s, bool* deadlocked) {
    int work[M];
    bool finish[N];

    // Initialize
    memcpy(work, s->available, sizeof(work));

    // Process with no allocated resources cannot be in deadlock
    for (int i = 0; i < N; i++) {
        finish[i] = true;
        for (int j = 0; j < M; j++) {
            if (s->allocation[i][j] > 0) {
                finish[i] = false;
                break;
            }
        }
    }

    // Find processes that can complete
    bool changed = true;
    while (changed) {
        changed = false;

        for (int i = 0; i < N; i++) {
            if (!finish[i]) {
                // Check if request can be satisfied
                bool can_satisfy = true;
                for (int j = 0; j < M; j++) {
                    if (s->request[i][j] > work[j]) {
                        can_satisfy = false;
                        break;
                    }
                }

                if (can_satisfy) {
                    // Process i can finish
                    for (int j = 0; j < M; j++) {
                        work[j] += s->allocation[i][j];
                    }
                    finish[i] = true;
                    changed = true;
                }
            }
        }
    }

    // Processes that couldn't finish are deadlocked
    bool deadlock_exists = false;
    for (int i = 0; i < N; i++) {
        deadlocked[i] = !finish[i];
        if (!finish[i]) {
            deadlock_exists = true;
        }
    }

    return deadlock_exists;
}
```

### Example

```
Available: (0, 0, 0)

Process | Allocation | Request
--------|------------|--------
   P0   | (0, 1, 0)  | (0, 0, 0)
   P1   | (2, 0, 0)  | (2, 0, 2)
   P2   | (3, 0, 3)  | (0, 0, 0)
   P3   | (2, 1, 1)  | (1, 0, 0)
   P4   | (0, 0, 2)  | (0, 0, 2)

Analysis:
1. P0 can finish (request ≤ available): work = (0,1,0)
2. P2 can finish (no request): work = (3,1,3)
3. P3 can finish (request 1,0,0 ≤ work): work = (5,2,4)
4. P1 can finish (request 2,0,2 ≤ work): work = (7,2,4)
5. P4 can finish (request 0,0,2 ≤ work): All done

No deadlock.

Now change P2's request to (0, 0, 1):
Available still (0, 0, 0)

1. P0 can finish: work = (0,1,0)
2. No one else can complete!
   - P2 needs (0,0,1), have (0,1,0) - no
   - P1 needs (2,0,2), have (0,1,0) - no
   - etc.

Deadlock: P1, P2, P3, P4 are deadlocked
```

## When to Run Detection

### Frequency Trade-offs

```
Run frequently:
+ Detect deadlock quickly
+ Minimize affected processes
- High overhead

Run infrequently:
+ Low overhead
- More processes may be affected
- Harder to determine cause
```

### Detection Triggers

```c
typedef enum {
    PERIODIC,           // Every N time units
    ON_REQUEST_FAIL,    // When request cannot be satisfied
    UTILIZATION_BASED   // When utilization drops
} DetectionTrigger;

void schedule_detection(DetectionTrigger trigger) {
    switch (trigger) {
        case PERIODIC:
            // Run every 1 minute
            while (1) {
                sleep(60);
                if (detect_deadlock()) {
                    recover_from_deadlock();
                }
            }
            break;

        case ON_REQUEST_FAIL:
            // Called when process blocks on resource
            if (detect_deadlock()) {
                recover_from_deadlock();
            }
            break;

        case UTILIZATION_BASED:
            // Run when CPU < 40% for extended period
            if (cpu_utilization() < 0.4) {
                if (detect_deadlock()) {
                    recover_from_deadlock();
                }
            }
            break;
    }
}
```

## Complexity Analysis

### Single Instance

```
Wait-for graph cycle detection:
Time: O(n²)
Space: O(n²) for graph
```

### Multiple Instance

```
Detection algorithm:
Time: O(m × n²)
  - m resource types
  - Must potentially check all n processes
  - Each check examines m resources
Space: O(m × n) for matrices
```

## Real System Detection

### Linux Kernel: lockdep

```c
// Linux kernel lock dependency checking
// Detects potential deadlocks at runtime

// Configuration
CONFIG_PROVE_LOCKING=y
CONFIG_LOCKDEP=y

// Kernel output on deadlock detection:
// ======================================================
// [ INFO: possible circular locking dependency detected ]
// ------------------------------------------------------
// process/1234 is trying to acquire lock:
//  (lock_A){+.+.}, at: function_x+0x30/0x50
// but task is already holding lock:
//  (lock_B){+.+.}, at: function_y+0x20/0x40
// which lock already depends on the new lock.
```

### Database Deadlock Detection

```sql
-- MySQL deadlock detection
SHOW ENGINE INNODB STATUS;

-- PostgreSQL
SELECT * FROM pg_locks WHERE NOT granted;

-- SQL Server
SELECT * FROM sys.dm_tran_locks
WHERE request_status = 'WAIT';
```

### Java Thread Dump

```java
// JVM can detect deadlocked threads
ThreadMXBean threadBean = ManagementFactory.getThreadMXBean();
long[] deadlockedThreads = threadBean.findDeadlockedThreads();

if (deadlockedThreads != null) {
    ThreadInfo[] infos = threadBean.getThreadInfo(deadlockedThreads);
    for (ThreadInfo info : infos) {
        System.out.println("Deadlocked: " + info.getThreadName());
    }
}
```

## Building Detection Into Applications

```c
typedef struct {
    pthread_mutex_t lock;
    int owner_tid;
    int waiting_tids[MAX_WAITERS];
    int num_waiting;
} TrackedMutex;

void tracked_lock(TrackedMutex* m) {
    register_waiting(m);

    if (check_for_cycle()) {
        handle_potential_deadlock();
    }

    pthread_mutex_lock(&m->lock);
    m->owner_tid = gettid();
    unregister_waiting(m);
}

void tracked_unlock(TrackedMutex* m) {
    m->owner_tid = -1;
    pthread_mutex_unlock(&m->lock);
}
```

## Summary

Deadlock detection identifies deadlocks after they occur:
- Single instance: Cycle detection in wait-for graph O(n²)
- Multiple instance: Matrix-based algorithm O(m×n²)
- Detection frequency is a trade-off
- Can trigger on request failure or periodically
- Real systems: lockdep (Linux), database detectors
- Detection alone isn't enough—need recovery strategy
- Less restrictive than prevention/avoidance
- Best when deadlocks are rare and recovery is cheap
