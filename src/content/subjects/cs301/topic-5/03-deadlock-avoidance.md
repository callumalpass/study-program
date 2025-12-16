# Deadlock Avoidance

Deadlock avoidance uses additional information about resource usage to make safe allocation decisions. This subtopic covers safe states, the Banker's Algorithm, and resource allocation strategies.

## Avoidance vs Prevention

| Aspect | Prevention | Avoidance |
|--------|------------|-----------|
| Approach | Eliminate conditions | Avoid unsafe states |
| Knowledge | None required | Max resource needs |
| Runtime overhead | Low | High |
| Resource utilization | Low | Higher |
| Flexibility | Restrictive | Dynamic decisions |

## Safe State

### Definition

A state is **safe** if the system can allocate resources to each process in some order and avoid deadlock.

```
Safe state: ∃ safe sequence <P1, P2, ..., Pn>
where each Pi can get resources it needs from:
  - Currently available
  - Resources held by Pj (j < i) when Pj finishes
```

### Safe State Example

```
Resources: 12 instances total

Process | Max Need | Currently Holds
--------|----------|----------------
   P0   |    10    |       5
   P1   |     4    |       2
   P2   |     9    |       2

Available = 12 - (5 + 2 + 2) = 3

Safe sequence: <P1, P0, P2>
1. P1 can finish (needs 4-2=2, have 3) → Available = 3+2 = 5
2. P0 can finish (needs 10-5=5, have 5) → Available = 5+5 = 10
3. P2 can finish (needs 9-2=7, have 10) → Done
```

### Unsafe State Example

```
Resources: 12 instances total

Process | Max Need | Currently Holds
--------|----------|----------------
   P0   |    10    |       5
   P1   |     4    |       2
   P2   |     9    |       3

Available = 12 - (5 + 2 + 3) = 2

No safe sequence:
- P0 needs 5 more, only have 2
- P1 needs 2 more, can finish → Available = 4
- P0 still needs 5 (have 4) → stuck
- P2 needs 6 (have 4) → stuck

UNSAFE STATE (may lead to deadlock)
```

### Key Insight

```
Safe state → No deadlock guaranteed
Unsafe state → Deadlock possible (not certain)

   All states
   ┌─────────────────────────────┐
   │  Safe states                │
   │  ┌────────────────────┐     │
   │  │  No deadlock       │     │
   │  └────────────────────┘     │
   │                             │
   │  Unsafe states              │
   │  ┌────────────────────┐     │
   │  │   May deadlock     │     │
   │  │  ┌──────────────┐  │     │
   │  │  │  Deadlocked  │  │     │
   │  │  └──────────────┘  │     │
   │  └────────────────────┘     │
   └─────────────────────────────┘
```

## Safety Algorithm

### Single Resource Type

```c
#define N 5  // Number of processes

bool is_safe_single(int available, int max[], int allocation[]) {
    int work = available;
    bool finish[N] = {false};
    int need[N];

    // Calculate need
    for (int i = 0; i < N; i++) {
        need[i] = max[i] - allocation[i];
    }

    // Find process that can finish
    int count = 0;
    while (count < N) {
        bool found = false;

        for (int i = 0; i < N; i++) {
            if (!finish[i] && need[i] <= work) {
                // Process i can finish
                work += allocation[i];
                finish[i] = true;
                count++;
                found = true;
            }
        }

        if (!found) {
            return false;  // No process can proceed
        }
    }

    return true;  // All processes can finish
}
```

### Multiple Resource Types

```c
#define N 5   // Processes
#define M 3   // Resource types

typedef struct {
    int available[M];
    int max[N][M];
    int allocation[N][M];
    int need[N][M];
} BankerState;

void calculate_need(BankerState* s) {
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < M; j++) {
            s->need[i][j] = s->max[i][j] - s->allocation[i][j];
        }
    }
}

bool is_safe(BankerState* s) {
    int work[M];
    bool finish[N] = {false};

    memcpy(work, s->available, sizeof(work));

    while (true) {
        // Find process that can finish
        int found = -1;
        for (int i = 0; i < N; i++) {
            if (!finish[i]) {
                bool can_finish = true;
                for (int j = 0; j < M; j++) {
                    if (s->need[i][j] > work[j]) {
                        can_finish = false;
                        break;
                    }
                }
                if (can_finish) {
                    found = i;
                    break;
                }
            }
        }

        if (found == -1) {
            break;  // No process can proceed
        }

        // Process found can finish
        for (int j = 0; j < M; j++) {
            work[j] += s->allocation[found][j];
        }
        finish[found] = true;
    }

    // Check if all finished
    for (int i = 0; i < N; i++) {
        if (!finish[i]) return false;
    }
    return true;
}
```

## Banker's Algorithm

Dijkstra's algorithm for deadlock avoidance.

### Data Structures

```c
int available[M];        // Available instances of each resource
int max[N][M];           // Maximum demand of each process
int allocation[N][M];    // Currently allocated to each process
int need[N][M];          // Remaining need (max - allocation)
```

### Resource Request Algorithm

```c
bool request_resources(BankerState* s, int process_id, int request[]) {
    // Step 1: Check if request exceeds need
    for (int j = 0; j < M; j++) {
        if (request[j] > s->need[process_id][j]) {
            printf("Error: Process exceeded maximum claim\n");
            return false;
        }
    }

    // Step 2: Check if request exceeds available
    for (int j = 0; j < M; j++) {
        if (request[j] > s->available[j]) {
            // Process must wait
            return false;
        }
    }

    // Step 3: Pretend to allocate
    for (int j = 0; j < M; j++) {
        s->available[j] -= request[j];
        s->allocation[process_id][j] += request[j];
        s->need[process_id][j] -= request[j];
    }

    // Step 4: Check if resulting state is safe
    if (is_safe(s)) {
        return true;  // Request granted
    }

    // Step 5: Rollback - state is unsafe
    for (int j = 0; j < M; j++) {
        s->available[j] += request[j];
        s->allocation[process_id][j] -= request[j];
        s->need[process_id][j] += request[j];
    }

    return false;  // Request denied
}
```

### Complete Example

```c
// Initial state
// 3 resource types: A, B, C with totals (10, 5, 7)

int main() {
    BankerState state = {
        .available = {3, 3, 2},  // Currently available
        .max = {
            {7, 5, 3},  // P0
            {3, 2, 2},  // P1
            {9, 0, 2},  // P2
            {2, 2, 2},  // P3
            {4, 3, 3}   // P4
        },
        .allocation = {
            {0, 1, 0},  // P0
            {2, 0, 0},  // P1
            {3, 0, 2},  // P2
            {2, 1, 1},  // P3
            {0, 0, 2}   // P4
        }
    };

    calculate_need(&state);

    // Need matrix:
    // P0: {7-0, 5-1, 3-0} = {7, 4, 3}
    // P1: {3-2, 2-0, 2-0} = {1, 2, 2}
    // P2: {9-3, 0-0, 2-2} = {6, 0, 0}
    // P3: {2-2, 2-1, 2-1} = {0, 1, 1}
    // P4: {4-0, 3-0, 3-2} = {4, 3, 1}

    // Check if safe
    if (is_safe(&state)) {
        printf("System is in safe state\n");
        // Safe sequence: <P1, P3, P4, P2, P0>
    }

    // P1 requests (1, 0, 2)
    int request[] = {1, 0, 2};
    if (request_resources(&state, 1, request)) {
        printf("Request granted\n");
    } else {
        printf("Request denied or must wait\n");
    }

    return 0;
}
```

### Finding Safe Sequence

```c
void print_safe_sequence(BankerState* s) {
    int work[M];
    bool finish[N] = {false};
    int sequence[N];
    int seq_idx = 0;

    memcpy(work, s->available, sizeof(work));

    while (seq_idx < N) {
        bool found = false;

        for (int i = 0; i < N; i++) {
            if (!finish[i]) {
                bool can_finish = true;
                for (int j = 0; j < M; j++) {
                    if (s->need[i][j] > work[j]) {
                        can_finish = false;
                        break;
                    }
                }

                if (can_finish) {
                    for (int j = 0; j < M; j++) {
                        work[j] += s->allocation[i][j];
                    }
                    finish[i] = true;
                    sequence[seq_idx++] = i;
                    found = true;
                }
            }
        }

        if (!found) {
            printf("No safe sequence exists!\n");
            return;
        }
    }

    printf("Safe sequence: ");
    for (int i = 0; i < N; i++) {
        printf("P%d ", sequence[i]);
    }
    printf("\n");
}
```

## Resource Allocation Graph Algorithm

For single-instance resources, use claim edges.

### Claim Edge

```
Pi ····> Rj  (dashed): Pi may request Rj in future
Pi ───> Rj  (solid): Pi currently requesting Rj
Rj ───> Pi  (solid): Rj allocated to Pi
```

### Algorithm

```
1. When process declares max resources, add claim edges
2. When process requests: convert claim edge to request edge
3. Request granted only if no cycle would form
4. When resource released: convert assignment back to claim
```

### Cycle Detection

```c
bool would_create_cycle(Graph* g, int process, int resource) {
    // Temporarily add request edge
    add_edge(g, process, resource);

    // Check for cycle using DFS
    bool has_cycle = detect_cycle(g);

    // Remove temporary edge
    remove_edge(g, process, resource);

    return has_cycle;
}

bool can_grant_request(Graph* g, int process, int resource) {
    if (would_create_cycle(g, process, resource)) {
        return false;  // Would be unsafe
    }

    // Grant: convert claim to assignment
    convert_to_assignment(g, process, resource);
    return true;
}
```

## Complexity Analysis

```
Safety Algorithm:
  Time: O(m × n²)
  - m resource types
  - n processes
  - Need to scan n processes up to n times

Banker's Algorithm:
  Time: O(m × n²) per request

Graph Algorithm (single instance):
  Time: O(n²) for cycle detection
```

## Limitations of Avoidance

1. **Must know maximum needs**: Not always possible
2. **Processes must be independent**: No external synchronization
3. **Fixed number of resources**: Can't handle dynamic resources
4. **High overhead**: Safety check on every request
5. **Conservative**: May deny requests that wouldn't cause deadlock

## Summary

Deadlock avoidance makes dynamic allocation decisions:
- Safe state guarantees no deadlock
- Safety algorithm finds execution sequence
- Banker's Algorithm handles multiple resource types
- Graph algorithm for single-instance resources
- Requires maximum resource declarations upfront
- Trade-off: Better utilization than prevention, but higher overhead
- Not suitable for systems with unknown resource needs
