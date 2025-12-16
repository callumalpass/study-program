# Classic Synchronization Problems

Classic synchronization problems illustrate common concurrency challenges and their solutions. This subtopic covers the producer-consumer, readers-writers, and dining philosophers problems.

## Producer-Consumer Problem

Also called the bounded-buffer problem. Producers generate data; consumers use it.

### Problem Description

```
Producer → [Buffer (size N)] → Consumer

Constraints:
1. Producer must wait if buffer is full
2. Consumer must wait if buffer is empty
3. Only one process accesses buffer at a time
```

### Solution with Semaphores

```c
#define N 10
int buffer[N];
int in = 0, out = 0;

sem_t empty;   // Empty slots available
sem_t full;    // Items available
sem_t mutex;   // Buffer access

void init() {
    sem_init(&empty, 0, N);
    sem_init(&full, 0, 0);
    sem_init(&mutex, 0, 1);
}

void* producer(void* arg) {
    while (1) {
        int item = produce_item();

        sem_wait(&empty);     // Wait for empty slot
        sem_wait(&mutex);     // Lock buffer

        buffer[in] = item;
        in = (in + 1) % N;

        sem_post(&mutex);     // Unlock buffer
        sem_post(&full);      // Signal item available
    }
}

void* consumer(void* arg) {
    while (1) {
        sem_wait(&full);      // Wait for item
        sem_wait(&mutex);     // Lock buffer

        int item = buffer[out];
        out = (out + 1) % N;

        sem_post(&mutex);     // Unlock buffer
        sem_post(&empty);     // Signal slot available

        consume_item(item);
    }
}
```

### Multiple Producers and Consumers

```c
// Same solution works!
// Semaphores handle coordination automatically

int main() {
    pthread_t prod[3], cons[2];

    init();

    for (int i = 0; i < 3; i++)
        pthread_create(&prod[i], NULL, producer, NULL);
    for (int i = 0; i < 2; i++)
        pthread_create(&cons[i], NULL, consumer, NULL);

    // ...
}
```

## Readers-Writers Problem

Multiple readers can read simultaneously, but writers need exclusive access.

### Problem Variants

1. **First readers-writers**: No reader waits unless writer has access (readers preferred)
2. **Second readers-writers**: Writer gets access ASAP (writers preferred)
3. **Third readers-writers**: No starvation for either

### First Readers-Writers Solution

```c
int read_count = 0;       // Active readers
sem_t mutex;              // Protect read_count
sem_t resource;           // Access to shared resource

void init() {
    sem_init(&mutex, 0, 1);
    sem_init(&resource, 0, 1);
}

void* reader(void* arg) {
    while (1) {
        sem_wait(&mutex);
        read_count++;
        if (read_count == 1) {
            sem_wait(&resource);  // First reader locks resource
        }
        sem_post(&mutex);

        // Read shared data
        read_data();

        sem_wait(&mutex);
        read_count--;
        if (read_count == 0) {
            sem_post(&resource);  // Last reader unlocks resource
        }
        sem_post(&mutex);
    }
}

void* writer(void* arg) {
    while (1) {
        sem_wait(&resource);  // Exclusive access

        // Write shared data
        write_data();

        sem_post(&resource);
    }
}
```

**Problem**: Writers can starve if readers keep arriving.

### Writers-Preferred Solution

```c
int read_count = 0;
int write_count = 0;
sem_t read_mutex;       // Protect read_count
sem_t write_mutex;      // Protect write_count
sem_t read_try;         // Reader entry control
sem_t resource;         // Actual resource

void init() {
    sem_init(&read_mutex, 0, 1);
    sem_init(&write_mutex, 0, 1);
    sem_init(&read_try, 0, 1);
    sem_init(&resource, 0, 1);
}

void* reader(void* arg) {
    while (1) {
        sem_wait(&read_try);      // Check if writer waiting
        sem_wait(&read_mutex);
        read_count++;
        if (read_count == 1) {
            sem_wait(&resource);
        }
        sem_post(&read_mutex);
        sem_post(&read_try);

        read_data();

        sem_wait(&read_mutex);
        read_count--;
        if (read_count == 0) {
            sem_post(&resource);
        }
        sem_post(&read_mutex);
    }
}

void* writer(void* arg) {
    while (1) {
        sem_wait(&write_mutex);
        write_count++;
        if (write_count == 1) {
            sem_wait(&read_try);  // Block new readers
        }
        sem_post(&write_mutex);

        sem_wait(&resource);
        write_data();
        sem_post(&resource);

        sem_wait(&write_mutex);
        write_count--;
        if (write_count == 0) {
            sem_post(&read_try);  // Allow readers again
        }
        sem_post(&write_mutex);
    }
}
```

### Read-Write Lock (Modern Solution)

```c
#include <pthread.h>

pthread_rwlock_t rwlock = PTHREAD_RWLOCK_INITIALIZER;

void* reader(void* arg) {
    pthread_rwlock_rdlock(&rwlock);
    read_data();
    pthread_rwlock_unlock(&rwlock);
}

void* writer(void* arg) {
    pthread_rwlock_wrlock(&rwlock);
    write_data();
    pthread_rwlock_unlock(&rwlock);
}
```

## Dining Philosophers Problem

Five philosophers sit at a round table. Each needs two forks to eat. Illustrates resource allocation and deadlock.

```
          P0
       F0    F4
     P1        P4
       F1    F3
         P2-P3
          F2

Philosophers: P0, P1, P2, P3, P4
Forks: F0, F1, F2, F3, F4
Pi needs forks Fi and F(i+1)%5
```

### Naive Solution (Deadlock!)

```c
sem_t forks[5];

void init() {
    for (int i = 0; i < 5; i++)
        sem_init(&forks[i], 0, 1);
}

void* philosopher(void* arg) {
    int id = *(int*)arg;
    int left = id;
    int right = (id + 1) % 5;

    while (1) {
        think();

        sem_wait(&forks[left]);   // Pick up left fork
        sem_wait(&forks[right]);  // Pick up right fork

        eat();

        sem_post(&forks[left]);
        sem_post(&forks[right]);
    }
}

// DEADLOCK: All philosophers pick up left fork simultaneously!
```

### Solution 1: Limit Diners

```c
sem_t forks[5];
sem_t room;  // Only 4 philosophers can try at once

void init() {
    for (int i = 0; i < 5; i++)
        sem_init(&forks[i], 0, 1);
    sem_init(&room, 0, 4);  // At most 4 philosophers
}

void* philosopher(void* arg) {
    int id = *(int*)arg;

    while (1) {
        think();

        sem_wait(&room);          // Enter room
        sem_wait(&forks[id]);     // Pick up left
        sem_wait(&forks[(id+1)%5]); // Pick up right

        eat();

        sem_post(&forks[(id+1)%5]);
        sem_post(&forks[id]);
        sem_post(&room);          // Leave room
    }
}
```

### Solution 2: Asymmetric

```c
void* philosopher(void* arg) {
    int id = *(int*)arg;
    int left = id;
    int right = (id + 1) % 5;

    while (1) {
        think();

        if (id % 2 == 0) {
            // Even philosophers: pick up left first
            sem_wait(&forks[left]);
            sem_wait(&forks[right]);
        } else {
            // Odd philosophers: pick up right first
            sem_wait(&forks[right]);
            sem_wait(&forks[left]);
        }

        eat();

        sem_post(&forks[left]);
        sem_post(&forks[right]);
    }
}
```

### Solution 3: Resource Hierarchy

```c
void* philosopher(void* arg) {
    int id = *(int*)arg;
    int first = min(id, (id + 1) % 5);
    int second = max(id, (id + 1) % 5);

    while (1) {
        think();

        // Always pick up lower-numbered fork first
        sem_wait(&forks[first]);
        sem_wait(&forks[second]);

        eat();

        sem_post(&forks[second]);
        sem_post(&forks[first]);
    }
}
```

### Solution 4: Chandy/Misra

More complex but allows concurrent eating:

```c
typedef enum { THINKING, HUNGRY, EATING } state_t;
state_t state[5];
sem_t self[5];    // Philosopher can eat
sem_t mutex;

void test(int id) {
    if (state[id] == HUNGRY &&
        state[(id + 4) % 5] != EATING &&
        state[(id + 1) % 5] != EATING) {
        state[id] = EATING;
        sem_post(&self[id]);
    }
}

void pickup(int id) {
    sem_wait(&mutex);
    state[id] = HUNGRY;
    test(id);
    sem_post(&mutex);
    sem_wait(&self[id]);
}

void putdown(int id) {
    sem_wait(&mutex);
    state[id] = THINKING;
    test((id + 4) % 5);  // Test left neighbor
    test((id + 1) % 5);  // Test right neighbor
    sem_post(&mutex);
}

void* philosopher(void* arg) {
    int id = *(int*)arg;

    while (1) {
        think();
        pickup(id);
        eat();
        putdown(id);
    }
}
```

## Sleeping Barber Problem

A barber sleeps when no customers. Customers wait if barber busy, leave if no chairs.

```c
#define CHAIRS 5

sem_t customers;      // Waiting customers
sem_t barber;         // Barber availability
sem_t mutex;          // Protect waiting count
int waiting = 0;      // Customers waiting

void* barber_thread(void* arg) {
    while (1) {
        sem_wait(&customers);  // Sleep if no customers
        sem_wait(&mutex);
        waiting--;
        sem_post(&barber);     // Barber ready
        sem_post(&mutex);

        cut_hair();
    }
}

void* customer_thread(void* arg) {
    sem_wait(&mutex);

    if (waiting < CHAIRS) {
        waiting++;
        sem_post(&customers);  // Wake barber if sleeping
        sem_post(&mutex);
        sem_wait(&barber);     // Wait for barber
        get_haircut();
    } else {
        sem_post(&mutex);      // No chair, leave
    }

    return NULL;
}
```

## Cigarette Smokers Problem

Three smokers, each has one ingredient. An agent puts two random ingredients on table.

```c
// Ingredients: tobacco, paper, match
// Smoker 0 has tobacco (needs paper, match)
// Smoker 1 has paper (needs tobacco, match)
// Smoker 2 has match (needs tobacco, paper)

sem_t agent;
sem_t smoker[3];

void* agent_thread(void* arg) {
    while (1) {
        sem_wait(&agent);
        int r = rand() % 3;

        // Put two ingredients (wake smoker who has third)
        sem_post(&smoker[r]);
    }
}

void* smoker_thread(void* arg) {
    int id = *(int*)arg;

    while (1) {
        sem_wait(&smoker[id]);
        make_cigarette();
        sem_post(&agent);
        smoke();
    }
}
```

## Summary

Classic synchronization problems teach important concepts:
- **Producer-Consumer**: Buffer coordination with counting semaphores
- **Readers-Writers**: Balancing concurrent reads vs exclusive writes
- **Dining Philosophers**: Deadlock prevention strategies
- **Sleeping Barber**: Condition synchronization
- Solutions demonstrate semaphore usage patterns
- Real systems use these patterns for databases, queues, resource allocation
- Understanding these problems is essential for concurrent programming
