# Monitors

Monitors are high-level synchronization constructs that encapsulate shared data and operations. This subtopic covers monitor concepts, condition variables, and implementation.

## Monitor Concept

A **monitor** is an abstract data type that encapsulates:
- Shared data (private)
- Operations on that data (public methods)
- Synchronization for mutual exclusion

```
┌─────────────────────────────────────┐
│           Monitor                   │
│  ┌─────────────────────────────┐   │
│  │     Shared Variables        │   │
│  │     (private)               │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │     Procedures              │   │
│  │     procedure_1()           │   │
│  │     procedure_2()           │   │
│  │     ...                     │   │
│  └─────────────────────────────┘   │
│                                     │
│  Entry Queue: [P1][P2][P3]         │
└─────────────────────────────────────┘
```

### Key Properties

1. **Mutual Exclusion**: Only one thread can be active in the monitor at a time
2. **Encapsulation**: Shared data only accessible through monitor procedures
3. **Automatic locking**: Entry/exit handled by monitor, not programmer

## Pseudocode Monitor Syntax

```
monitor BankAccount {
    // Private shared data
    int balance;

    // Public procedures
    procedure deposit(int amount) {
        balance += amount;
    }

    procedure withdraw(int amount) {
        if (balance >= amount) {
            balance -= amount;
        }
    }

    procedure getBalance() returns int {
        return balance;
    }
}
```

## Condition Variables

Monitors use **condition variables** for synchronization beyond mutual exclusion.

### Operations

```c
condition x;

x.wait();    // Release monitor lock and sleep
             // Reacquire lock when awakened

x.signal();  // Wake up one waiting thread

x.broadcast(); // Wake up all waiting threads
```

### Signal Semantics

When signal() is called, who runs next?

**Hoare semantics**: Signaling thread immediately gives up monitor to awakened thread
```
Thread A signals → Thread B runs → Thread A resumes later
```

**Mesa semantics**: Signaling thread continues; awakened thread added to entry queue
```
Thread A signals → Thread A continues → Thread B runs eventually
```

Most implementations (including pthreads) use Mesa semantics.

## Monitor with Condition Variables

### Bounded Buffer Example

```
monitor BoundedBuffer {
    int buffer[N];
    int count = 0;
    int in = 0, out = 0;

    condition not_full;
    condition not_empty;

    procedure insert(int item) {
        while (count == N) {
            not_full.wait();
        }
        buffer[in] = item;
        in = (in + 1) % N;
        count++;
        not_empty.signal();
    }

    procedure remove() returns int {
        while (count == 0) {
            not_empty.wait();
        }
        int item = buffer[out];
        out = (out + 1) % N;
        count--;
        not_full.signal();
        return item;
    }
}
```

## pthread Implementation

### POSIX Condition Variables

```c
#include <pthread.h>

pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t cond = PTHREAD_COND_INITIALIZER;

// Wait on condition
pthread_mutex_lock(&mutex);
while (!condition_met) {
    pthread_cond_wait(&cond, &mutex);  // Atomically unlocks and waits
}
// condition_met is true
pthread_mutex_unlock(&mutex);

// Signal condition
pthread_mutex_lock(&mutex);
condition_met = true;
pthread_cond_signal(&cond);  // Wake one waiter
pthread_mutex_unlock(&mutex);
```

### Why While Loop, Not If?

```c
// WRONG - race condition with Mesa semantics
pthread_mutex_lock(&mutex);
if (!condition) {
    pthread_cond_wait(&cond, &mutex);
}
// Condition might be false again!
// Another thread could have changed it
pthread_mutex_unlock(&mutex);

// CORRECT - always recheck condition
pthread_mutex_lock(&mutex);
while (!condition) {
    pthread_cond_wait(&cond, &mutex);
}
// Condition is definitely true
pthread_mutex_unlock(&mutex);
```

### Bounded Buffer with pthreads

```c
#define N 10

typedef struct {
    int buffer[N];
    int count;
    int in, out;
    pthread_mutex_t mutex;
    pthread_cond_t not_full;
    pthread_cond_t not_empty;
} BoundedBuffer;

void buffer_init(BoundedBuffer* b) {
    b->count = 0;
    b->in = b->out = 0;
    pthread_mutex_init(&b->mutex, NULL);
    pthread_cond_init(&b->not_full, NULL);
    pthread_cond_init(&b->not_empty, NULL);
}

void buffer_insert(BoundedBuffer* b, int item) {
    pthread_mutex_lock(&b->mutex);

    while (b->count == N) {
        pthread_cond_wait(&b->not_full, &b->mutex);
    }

    b->buffer[b->in] = item;
    b->in = (b->in + 1) % N;
    b->count++;

    pthread_cond_signal(&b->not_empty);
    pthread_mutex_unlock(&b->mutex);
}

int buffer_remove(BoundedBuffer* b) {
    pthread_mutex_lock(&b->mutex);

    while (b->count == 0) {
        pthread_cond_wait(&b->not_empty, &b->mutex);
    }

    int item = b->buffer[b->out];
    b->out = (b->out + 1) % N;
    b->count--;

    pthread_cond_signal(&b->not_full);
    pthread_mutex_unlock(&b->mutex);

    return item;
}

void buffer_destroy(BoundedBuffer* b) {
    pthread_mutex_destroy(&b->mutex);
    pthread_cond_destroy(&b->not_full);
    pthread_cond_destroy(&b->not_empty);
}
```

### Broadcast Example

```c
typedef struct {
    int done;
    pthread_mutex_t mutex;
    pthread_cond_t cond;
} Barrier;

void barrier_init(Barrier* b) {
    b->done = 0;
    pthread_mutex_init(&b->mutex, NULL);
    pthread_cond_init(&b->cond, NULL);
}

void barrier_wait(Barrier* b, int threshold, int* count) {
    pthread_mutex_lock(&b->mutex);

    (*count)++;

    if (*count == threshold) {
        b->done = 1;
        pthread_cond_broadcast(&b->cond);  // Wake ALL waiters
    } else {
        while (!b->done) {
            pthread_cond_wait(&b->cond, &b->mutex);
        }
    }

    pthread_mutex_unlock(&b->mutex);
}
```

## Readers-Writers with Monitor

```c
typedef struct {
    int readers;
    int writers;
    int waiting_writers;
    pthread_mutex_t mutex;
    pthread_cond_t can_read;
    pthread_cond_t can_write;
} RWLock;

void rwlock_init(RWLock* rw) {
    rw->readers = 0;
    rw->writers = 0;
    rw->waiting_writers = 0;
    pthread_mutex_init(&rw->mutex, NULL);
    pthread_cond_init(&rw->can_read, NULL);
    pthread_cond_init(&rw->can_write, NULL);
}

void rwlock_read_lock(RWLock* rw) {
    pthread_mutex_lock(&rw->mutex);

    // Wait if writer active or writers waiting (prevents writer starvation)
    while (rw->writers > 0 || rw->waiting_writers > 0) {
        pthread_cond_wait(&rw->can_read, &rw->mutex);
    }

    rw->readers++;
    pthread_mutex_unlock(&rw->mutex);
}

void rwlock_read_unlock(RWLock* rw) {
    pthread_mutex_lock(&rw->mutex);
    rw->readers--;

    if (rw->readers == 0) {
        pthread_cond_signal(&rw->can_write);
    }

    pthread_mutex_unlock(&rw->mutex);
}

void rwlock_write_lock(RWLock* rw) {
    pthread_mutex_lock(&rw->mutex);
    rw->waiting_writers++;

    while (rw->readers > 0 || rw->writers > 0) {
        pthread_cond_wait(&rw->can_write, &rw->mutex);
    }

    rw->waiting_writers--;
    rw->writers++;
    pthread_mutex_unlock(&rw->mutex);
}

void rwlock_write_unlock(RWLock* rw) {
    pthread_mutex_lock(&rw->mutex);
    rw->writers--;

    // Prefer waiting writers
    if (rw->waiting_writers > 0) {
        pthread_cond_signal(&rw->can_write);
    } else {
        pthread_cond_broadcast(&rw->can_read);
    }

    pthread_mutex_unlock(&rw->mutex);
}
```

## Java Monitors

Java has built-in monitor support:

```java
public class BoundedBuffer {
    private int[] buffer = new int[N];
    private int count = 0;
    private int in = 0, out = 0;

    public synchronized void insert(int item) throws InterruptedException {
        while (count == N) {
            wait();  // Release lock and wait
        }
        buffer[in] = item;
        in = (in + 1) % N;
        count++;
        notifyAll();  // Wake all waiters
    }

    public synchronized int remove() throws InterruptedException {
        while (count == 0) {
            wait();
        }
        int item = buffer[out];
        out = (out + 1) % N;
        count--;
        notifyAll();
        return item;
    }
}
```

## Monitor vs Semaphore

| Aspect | Monitor | Semaphore |
|--------|---------|-----------|
| Abstraction | High-level | Low-level |
| Mutual exclusion | Automatic | Manual |
| Condition sync | Condition variables | Counter-based |
| Encapsulation | Built-in | None |
| Error-prone | Less | More |
| Language support | Often built-in | Library |

## Common Pitfalls

### Nested Monitor Problem

```c
// Monitor A calls procedure in Monitor B
// Thread holds lock on A, waits for B
// Another thread in B tries to call A
// DEADLOCK!

// Solution: Release outer monitor before calling inner
```

### Forgetting to Signal

```c
void procedure() {
    pthread_mutex_lock(&mutex);

    if (some_condition) {
        pthread_mutex_unlock(&mutex);
        return;  // Forgot to signal waiters!
    }

    pthread_cond_signal(&cond);
    pthread_mutex_unlock(&mutex);
}
```

### Using If Instead of While

```c
// Mesa semantics requires while loop
while (!condition) {  // NOT: if (!condition)
    pthread_cond_wait(&cond, &mutex);
}
```

## Summary

Monitors provide structured synchronization:
- Encapsulate shared data with operations
- Automatic mutual exclusion for procedures
- Condition variables for complex synchronization
- Mesa semantics (pthread): always use while loop
- Built into many languages (Java synchronized)
- Higher-level and safer than raw semaphores
- Watch for nested monitor deadlocks
- Condition variables need associated mutex
