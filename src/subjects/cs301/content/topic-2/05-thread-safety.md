---
id: cs301-t2-safety
title: "Thread Safety"
order: 5
---

# Thread Safety

Thread safety ensures correct behavior when multiple threads access shared resources. This subtopic covers thread-safe programming techniques and common patterns.

## What is Thread Safety?

A function or data structure is **thread-safe** if it behaves correctly when accessed from multiple threads concurrently, without requiring external synchronization.

### Non-Thread-Safe Code

```c
// NOT thread-safe
int counter = 0;

void increment() {
    counter++;  // Race condition!
    // Expands to: tmp = counter; tmp++; counter = tmp;
}

// Two threads calling increment() might:
// Thread 1: tmp = 0
// Thread 2: tmp = 0
// Thread 1: counter = 1
// Thread 2: counter = 1  // Lost update!
```

### Thread-Safe Version

```c
#include <pthread.h>

int counter = 0;
pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;

void increment() {
    pthread_mutex_lock(&mutex);
    counter++;
    pthread_mutex_unlock(&mutex);
}
```

## Categories of Thread Safety

### 1. Reentrant Functions

A **reentrant** function can be interrupted and called again (re-entered) before the previous call completes:

```c
// Reentrant: uses only local variables
int reentrant_square(int x) {
    int result = x * x;  // Local variable
    return result;
}

// NOT reentrant: uses static variable
int not_reentrant() {
    static int call_count = 0;  // Shared state
    return ++call_count;
}
```

### 2. Thread-Safe Functions

Thread-safe functions can be called from multiple threads but may use locking:

```c
// Thread-safe via locking
pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;
int shared_value = 0;

int thread_safe_increment() {
    pthread_mutex_lock(&mutex);
    int result = ++shared_value;
    pthread_mutex_unlock(&mutex);
    return result;
}
```

### 3. Lock-Free Functions

Lock-free functions use atomic operations instead of locks:

```c
#include <stdatomic.h>

atomic_int counter = 0;

void lock_free_increment() {
    atomic_fetch_add(&counter, 1);
}
```

## Making Code Thread-Safe

### Strategy 1: Avoid Shared State

```c
// Bad: Shared state
static char* buffer;

char* bad_format(int n) {
    sprintf(buffer, "%d", n);
    return buffer;
}

// Good: Caller provides buffer
void good_format(int n, char* buffer, size_t size) {
    snprintf(buffer, size, "%d", n);
}

// Good: Thread-local storage
__thread char tls_buffer[100];

char* tls_format(int n) {
    sprintf(tls_buffer, "%d", n);
    return tls_buffer;
}
```

### Strategy 2: Protect Shared State

```c
typedef struct {
    int* data;
    size_t size;
    size_t capacity;
    pthread_mutex_t mutex;
} ThreadSafeVector;

void tsv_push(ThreadSafeVector* v, int value) {
    pthread_mutex_lock(&v->mutex);

    if (v->size >= v->capacity) {
        v->capacity *= 2;
        v->data = realloc(v->data, v->capacity * sizeof(int));
    }
    v->data[v->size++] = value;

    pthread_mutex_unlock(&v->mutex);
}

int tsv_get(ThreadSafeVector* v, size_t index) {
    pthread_mutex_lock(&v->mutex);

    int value = -1;
    if (index < v->size) {
        value = v->data[index];
    }

    pthread_mutex_unlock(&v->mutex);
    return value;
}
```

### Strategy 3: Use Atomic Operations

```c
#include <stdatomic.h>

// Simple counter
atomic_int visitors = 0;

void count_visitor() {
    atomic_fetch_add(&visitors, 1);
}

// Compare-and-swap for more complex operations
atomic_int head = 0;

bool push_lock_free(int value, int* stack, int* top) {
    int old_top, new_top;
    do {
        old_top = atomic_load(top);
        new_top = old_top + 1;
        stack[new_top] = value;
    } while (!atomic_compare_exchange_weak(top, &old_top, new_top));
    return true;
}
```

### Strategy 4: Immutable Data

```c
// Immutable struct - inherently thread-safe
typedef struct {
    const int x;
    const int y;
    const char* name;
} ImmutablePoint;

ImmutablePoint* create_point(int x, int y, const char* name) {
    ImmutablePoint* p = malloc(sizeof(ImmutablePoint));
    // Use memcpy to initialize const fields
    int temp_x = x;
    int temp_y = y;
    memcpy((void*)&p->x, &temp_x, sizeof(int));
    memcpy((void*)&p->y, &temp_y, sizeof(int));
    memcpy((void*)&p->name, &name, sizeof(char*));
    return p;
}

// Safe to read from any thread - no mutation possible
```

## Thread-Safe Design Patterns

### Monitor Pattern

```c
typedef struct {
    int value;
    pthread_mutex_t mutex;
    pthread_cond_t cond;
} Monitor;

void monitor_wait(Monitor* m, bool (*predicate)(Monitor*)) {
    pthread_mutex_lock(&m->mutex);
    while (!predicate(m)) {
        pthread_cond_wait(&m->cond, &m->mutex);
    }
    pthread_mutex_unlock(&m->mutex);
}

void monitor_notify(Monitor* m) {
    pthread_mutex_lock(&m->mutex);
    pthread_cond_signal(&m->cond);
    pthread_mutex_unlock(&m->mutex);
}
```

### Read-Write Lock Pattern

```c
#include <pthread.h>

typedef struct {
    int* data;
    size_t size;
    pthread_rwlock_t lock;
} ReadHeavyData;

int read_data(ReadHeavyData* d, size_t index) {
    pthread_rwlock_rdlock(&d->lock);  // Multiple readers OK
    int value = d->data[index];
    pthread_rwlock_unlock(&d->lock);
    return value;
}

void write_data(ReadHeavyData* d, size_t index, int value) {
    pthread_rwlock_wrlock(&d->lock);  // Exclusive access
    d->data[index] = value;
    pthread_rwlock_unlock(&d->lock);
}
```

### Double-Checked Locking

```c
pthread_mutex_t init_mutex = PTHREAD_MUTEX_INITIALIZER;
atomic_int initialized = 0;
Resource* resource = NULL;

Resource* get_resource() {
    if (atomic_load(&initialized) == 0) {
        pthread_mutex_lock(&init_mutex);
        if (atomic_load(&initialized) == 0) {
            resource = create_resource();
            atomic_store(&initialized, 1);
        }
        pthread_mutex_unlock(&init_mutex);
    }
    return resource;
}
```

## Common Thread-Safety Pitfalls

### Returning Pointers to Internal Data

```c
// UNSAFE: Returns pointer to internal buffer
char* unsafe_get_name(Object* obj) {
    return obj->name;  // Other thread might modify!
}

// SAFE: Return copy
char* safe_get_name(Object* obj) {
    pthread_mutex_lock(&obj->mutex);
    char* copy = strdup(obj->name);
    pthread_mutex_unlock(&obj->mutex);
    return copy;  // Caller must free
}
```

### Time-of-Check to Time-of-Use (TOCTOU)

```c
// UNSAFE: Check and use are not atomic
if (balance >= amount) {      // Check
    // Another thread might modify balance here!
    balance -= amount;         // Use
}

// SAFE: Atomic operation
pthread_mutex_lock(&mutex);
if (balance >= amount) {
    balance -= amount;
}
pthread_mutex_unlock(&mutex);
```

### Non-Atomic Compound Operations

```c
// UNSAFE: Two separate atomic ops
if (atomic_load(&count) > 0) {
    atomic_fetch_sub(&count, 1);  // Race window!
}

// SAFE: Single atomic operation
int old_count;
do {
    old_count = atomic_load(&count);
    if (old_count <= 0) break;
} while (!atomic_compare_exchange_weak(&count, &old_count, old_count - 1));
```

## Testing Thread Safety

```c
// Stress test with many threads
#define NUM_THREADS 100
#define OPS_PER_THREAD 10000

void* stress_test(void* arg) {
    for (int i = 0; i < OPS_PER_THREAD; i++) {
        increment();
    }
    return NULL;
}

int main() {
    pthread_t threads[NUM_THREADS];

    for (int i = 0; i < NUM_THREADS; i++) {
        pthread_create(&threads[i], NULL, stress_test, NULL);
    }

    for (int i = 0; i < NUM_THREADS; i++) {
        pthread_join(threads[i], NULL);
    }

    // Expected: counter == NUM_THREADS * OPS_PER_THREAD
    printf("Counter: %d (expected %d)\n",
           counter, NUM_THREADS * OPS_PER_THREAD);
    return 0;
}
```

## Summary

Thread safety requires careful design:
- Identify shared state and protect it
- Use mutexes, atomic operations, or immutability
- Avoid returning references to internal state
- Watch for TOCTOU and compound operation races
- Test with stress tests and tools like ThreadSanitizer
- Choose the right level of safety for your needs
