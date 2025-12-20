# Liveness and Synchronization Hazards

Liveness refers to the progress guarantees of concurrent programs. This subtopic covers deadlock, livelock, starvation, and priority inversion.

## Liveness Properties

A concurrent program has good **liveness** if it eventually makes progress. Violations include:

1. **Deadlock**: Threads blocked forever waiting for each other
2. **Livelock**: Threads running but making no progress
3. **Starvation**: Some threads never get resources

## Deadlock

### Four Necessary Conditions (Coffman Conditions)

All four must hold simultaneously for deadlock:

1. **Mutual Exclusion**: Resources held exclusively
2. **Hold and Wait**: Thread holds resources while waiting for others
3. **No Preemption**: Resources cannot be forcibly taken
4. **Circular Wait**: Circular chain of waiting threads

```
Thread A holds R1, waits for R2
Thread B holds R2, waits for R1

        ┌──────────┐
        │ Thread A │
        └────┬─────┘
    holds R1 │ ↑ waits for R2
             ↓ │
        ┌────┴─────┐
        │ Thread B │
        └──────────┘
    holds R2, waits for R1
```

### Deadlock Example

```c
pthread_mutex_t lock1 = PTHREAD_MUTEX_INITIALIZER;
pthread_mutex_t lock2 = PTHREAD_MUTEX_INITIALIZER;

void* thread_a(void* arg) {
    pthread_mutex_lock(&lock1);
    sleep(1);  // Increase chance of deadlock
    pthread_mutex_lock(&lock2);

    // Critical section

    pthread_mutex_unlock(&lock2);
    pthread_mutex_unlock(&lock1);
    return NULL;
}

void* thread_b(void* arg) {
    pthread_mutex_lock(&lock2);  // Opposite order!
    sleep(1);
    pthread_mutex_lock(&lock1);

    // Critical section

    pthread_mutex_unlock(&lock1);
    pthread_mutex_unlock(&lock2);
    return NULL;
}

// DEADLOCK: A holds lock1, waits for lock2
//           B holds lock2, waits for lock1
```

### Resource Allocation Graph

```
Processes: P1, P2
Resources: R1 (1 instance), R2 (1 instance)

Request edge: Pi → Rj (Pi requests Rj)
Assignment edge: Rj → Pi (Rj assigned to Pi)

    P1 ──→ R1 ──→ P2
    ↑             │
    └──── R2 ←────┘

Cycle = potential deadlock (definite if single instance resources)
```

## Deadlock Prevention

Negate one of the four conditions:

### Negate Mutual Exclusion

Make resources shareable when possible:
```c
// Instead of exclusive access
pthread_rwlock_rdlock(&rwlock);  // Multiple readers OK
```

### Negate Hold and Wait

Request all resources atomically:

```c
void request_all(pthread_mutex_t* locks[], int n) {
    pthread_mutex_lock(&global_lock);

    for (int i = 0; i < n; i++) {
        if (pthread_mutex_trylock(locks[i]) != 0) {
            // Release all acquired locks
            for (int j = 0; j < i; j++) {
                pthread_mutex_unlock(locks[j]);
            }
            pthread_mutex_unlock(&global_lock);
            return;  // Try again later
        }
    }

    pthread_mutex_unlock(&global_lock);
}
```

### Negate No Preemption

Allow resource preemption:

```c
void thread_function() {
    while (1) {
        pthread_mutex_lock(&lock1);

        if (pthread_mutex_trylock(&lock2) != 0) {
            // Can't get lock2, release lock1 and retry
            pthread_mutex_unlock(&lock1);
            sched_yield();  // Let other threads run
            continue;
        }

        // Got both locks
        break;
    }

    // Critical section

    pthread_mutex_unlock(&lock2);
    pthread_mutex_unlock(&lock1);
}
```

### Negate Circular Wait (Lock Ordering)

Impose total ordering on resources:

```c
pthread_mutex_t locks[10];

// Always acquire in order (by address or assigned number)
void acquire_locks(int lock_a, int lock_b) {
    if (lock_a < lock_b) {
        pthread_mutex_lock(&locks[lock_a]);
        pthread_mutex_lock(&locks[lock_b]);
    } else {
        pthread_mutex_lock(&locks[lock_b]);
        pthread_mutex_lock(&locks[lock_a]);
    }
}

// Better: use address comparison
void acquire_two(pthread_mutex_t* a, pthread_mutex_t* b) {
    if (a < b) {
        pthread_mutex_lock(a);
        pthread_mutex_lock(b);
    } else {
        pthread_mutex_lock(b);
        pthread_mutex_lock(a);
    }
}
```

## Deadlock Avoidance

Allow deadlock conditions but avoid unsafe states.

### Safe State

A state is **safe** if the system can allocate resources to each thread in some order and still avoid deadlock.

```
Available = 2
Thread A needs 3 more (has 1)
Thread B needs 1 more (has 2)
Thread C needs 4 more (has 1)

Safe sequence: B, A, C
B finishes → Available = 4
A finishes → Available = 8
C finishes → Done
```

### Banker's Algorithm

Before granting request, check if resulting state is safe:

```c
typedef struct {
    int available[M];           // Available resources
    int max[N][M];              // Maximum needs
    int allocation[N][M];       // Currently allocated
    int need[N][M];             // Remaining needs
} BankerState;

bool is_safe(BankerState* s) {
    int work[M];
    bool finish[N] = {false};

    memcpy(work, s->available, sizeof(work));

    while (1) {
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
                    // Thread i can finish
                    for (int j = 0; j < M; j++) {
                        work[j] += s->allocation[i][j];
                    }
                    finish[i] = true;
                    found = true;
                }
            }
        }

        if (!found) break;
    }

    // Safe if all threads can finish
    for (int i = 0; i < N; i++) {
        if (!finish[i]) return false;
    }
    return true;
}

bool request_resources(BankerState* s, int thread, int request[]) {
    // Check if request exceeds need
    for (int j = 0; j < M; j++) {
        if (request[j] > s->need[thread][j]) {
            return false;  // Error: exceeds declared max
        }
    }

    // Check if request can be granted
    for (int j = 0; j < M; j++) {
        if (request[j] > s->available[j]) {
            return false;  // Must wait
        }
    }

    // Try granting request
    for (int j = 0; j < M; j++) {
        s->available[j] -= request[j];
        s->allocation[thread][j] += request[j];
        s->need[thread][j] -= request[j];
    }

    if (is_safe(s)) {
        return true;  // Request granted
    }

    // Unsafe - rollback
    for (int j = 0; j < M; j++) {
        s->available[j] += request[j];
        s->allocation[thread][j] -= request[j];
        s->need[thread][j] += request[j];
    }

    return false;
}
```

## Deadlock Detection and Recovery

Allow deadlocks but detect and recover.

### Detection Algorithm

Similar to safety algorithm but for current state:

```c
bool detect_deadlock() {
    int work[M];
    bool finish[N];

    memcpy(work, available, sizeof(work));

    for (int i = 0; i < N; i++) {
        finish[i] = (allocation[i] == 0);  // No resources = can't be deadlocked
    }

    // Find processes that can complete
    // ...similar to safety algorithm

    // Any unfinished process is deadlocked
    for (int i = 0; i < N; i++) {
        if (!finish[i]) return true;
    }
    return false;
}
```

### Recovery Options

1. **Terminate processes**: Kill deadlocked processes
2. **Preempt resources**: Take resources from victims
3. **Rollback**: Restore to checkpoint before deadlock

## Livelock

Threads actively trying to resolve conflict but making no progress:

```c
void* thread_a(void* arg) {
    while (1) {
        pthread_mutex_lock(&lock1);

        if (pthread_mutex_trylock(&lock2) != 0) {
            pthread_mutex_unlock(&lock1);
            // Immediately retry - LIVELOCK!
            continue;
        }

        // Work
        break;
    }
}

// Both threads keep acquiring and releasing lock1
// Neither makes progress
```

### Livelock Solutions

```c
// Add random backoff
void* thread_with_backoff(void* arg) {
    int backoff = 1;

    while (1) {
        pthread_mutex_lock(&lock1);

        if (pthread_mutex_trylock(&lock2) != 0) {
            pthread_mutex_unlock(&lock1);

            // Randomized exponential backoff
            usleep(rand() % (backoff * 1000));
            backoff = min(backoff * 2, MAX_BACKOFF);
            continue;
        }

        break;
    }
}
```

## Starvation

Thread perpetually denied resources:

```c
// Writers starve in readers-preferred solution
void* reader(void* arg) {
    while (1) {
        // Readers keep arriving
        pthread_rwlock_rdlock(&rwlock);
        read_data();
        pthread_rwlock_unlock(&rwlock);
    }
}

void* writer(void* arg) {
    // Writer never gets access if readers constant
    pthread_rwlock_wrlock(&rwlock);  // Waits forever
    write_data();
    pthread_rwlock_unlock(&rwlock);
}
```

### Preventing Starvation

1. **Aging**: Increase priority of waiting threads
2. **Fair scheduling**: FIFO order for lock acquisition
3. **Bounded waiting**: Guarantee maximum wait time

## Priority Inversion

Low-priority thread blocks high-priority thread:

```
Priority: H > M > L

1. L acquires lock
2. H arrives, needs lock → blocks
3. M arrives, preempts L
4. M runs... L waits... H waits...

H blocked by M even though H > M!
```

### Solutions

**Priority Inheritance**: Boost L's priority to H while holding lock

```c
// Conceptual - requires OS support
void lock_with_inheritance(mutex_t* m) {
    if (m->held_by != NULL) {
        if (current->priority > m->held_by->priority) {
            m->held_by->priority = current->priority;
        }
    }
    acquire(m);
}
```

**Priority Ceiling**: Lock has ceiling = highest priority that uses it

## Summary

Liveness ensures concurrent programs make progress:
- **Deadlock**: Four conditions must hold; prevent by negating one
- **Lock ordering**: Simple and effective deadlock prevention
- **Banker's algorithm**: Avoidance through safe state checking
- **Livelock**: Active but no progress; use backoff
- **Starvation**: Use fair scheduling and aging
- **Priority inversion**: Use inheritance or ceiling protocols
- Detection and recovery possible but costly
- Prevention through careful design is preferred
