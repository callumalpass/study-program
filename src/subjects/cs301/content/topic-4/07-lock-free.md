---
id: cs301-t4-lockfree
title: "Lock-Free Synchronization"
order: 7
---

# Lock-Free Synchronization

Lock-free programming uses atomic operations instead of locks for synchronization. This subtopic covers atomic operations, lock-free data structures, and memory ordering.

## Why Lock-Free?

Problems with locks:
1. **Deadlock**: Threads wait forever
2. **Priority inversion**: Low-priority blocks high-priority
3. **Convoying**: Threads pile up waiting for lock holder
4. **Overhead**: Context switches expensive

Lock-free guarantees:
- **Wait-free**: Every operation completes in finite steps
- **Lock-free**: System as a whole makes progress
- **Obstruction-free**: Progress guaranteed if run in isolation

## Atomic Operations

### Hardware Atomics

Modern CPUs provide atomic instructions:

```c
#include <stdatomic.h>

atomic_int counter = 0;

// Atomic load and store
int value = atomic_load(&counter);
atomic_store(&counter, 42);

// Atomic increment
atomic_fetch_add(&counter, 1);

// Compare-and-swap (CAS)
int expected = 5;
bool success = atomic_compare_exchange_strong(&counter, &expected, 10);
// If counter == 5, sets to 10, returns true
// Otherwise, expected = current value, returns false
```

### Compare-and-Swap (CAS)

The fundamental lock-free primitive:

```c
// Conceptually (executed atomically by hardware)
bool CAS(int* ptr, int expected, int new_value) {
    if (*ptr == expected) {
        *ptr = new_value;
        return true;
    }
    return false;
}
```

### CAS Loop Pattern

```c
void atomic_increment(atomic_int* counter) {
    int old_value;
    do {
        old_value = atomic_load(counter);
    } while (!atomic_compare_exchange_weak(counter, &old_value, old_value + 1));
}

// Or using fetch_add directly
atomic_fetch_add(counter, 1);
```

## Lock-Free Stack

### Using CAS

```c
typedef struct Node {
    int data;
    struct Node* next;
} Node;

typedef struct {
    _Atomic(Node*) head;
} LockFreeStack;

void stack_init(LockFreeStack* s) {
    atomic_store(&s->head, NULL);
}

void stack_push(LockFreeStack* s, int value) {
    Node* new_node = malloc(sizeof(Node));
    new_node->data = value;

    Node* old_head;
    do {
        old_head = atomic_load(&s->head);
        new_node->next = old_head;
    } while (!atomic_compare_exchange_weak(&s->head, &old_head, new_node));
}

bool stack_pop(LockFreeStack* s, int* value) {
    Node* old_head;
    Node* new_head;

    do {
        old_head = atomic_load(&s->head);
        if (old_head == NULL) {
            return false;  // Empty
        }
        new_head = old_head->next;
    } while (!atomic_compare_exchange_weak(&s->head, &old_head, new_head));

    *value = old_head->data;
    free(old_head);  // Caution: memory reclamation issues
    return true;
}
```

## ABA Problem

A subtle issue with CAS-based algorithms:

```
1. Thread A reads head = A (node at address 0x100)
2. Thread A is preempted
3. Thread B pops A, pops B, pushes new C at address 0x100
4. Thread A resumes, CAS sees head still = 0x100
5. CAS succeeds but stack structure is corrupted!
```

### Solutions to ABA

**1. Version Counter (Tagged Pointer)**

```c
typedef struct {
    Node* ptr;
    unsigned int tag;
} TaggedPointer;

typedef struct {
    _Atomic(TaggedPointer) head;
} LockFreeStack;

void stack_push(LockFreeStack* s, int value) {
    Node* new_node = malloc(sizeof(Node));
    new_node->data = value;

    TaggedPointer old_head, new_head;
    do {
        old_head = atomic_load(&s->head);
        new_node->next = old_head.ptr;
        new_head.ptr = new_node;
        new_head.tag = old_head.tag + 1;  // Increment version
    } while (!atomic_compare_exchange_weak(&s->head, &old_head, new_head));
}
```

**2. Hazard Pointers**

Threads announce which pointers they're using:

```c
#define MAX_THREADS 64
Node* hazard_pointers[MAX_THREADS];

void retire(Node* node) {
    // Don't free if any thread has hazard pointer to node
    for (int i = 0; i < MAX_THREADS; i++) {
        if (hazard_pointers[i] == node) {
            // Defer deletion
            add_to_retire_list(node);
            return;
        }
    }
    free(node);
}
```

**3. Epoch-Based Reclamation**

```c
atomic_int global_epoch = 0;
int thread_epoch[MAX_THREADS];
List* retire_lists[3];  // One per epoch

void enter_critical() {
    thread_epoch[tid] = atomic_load(&global_epoch);
}

void exit_critical() {
    thread_epoch[tid] = -1;  // Not in critical section
}

void try_advance_epoch() {
    int current = atomic_load(&global_epoch);

    // Check if all threads have seen current epoch
    for (int i = 0; i < MAX_THREADS; i++) {
        if (thread_epoch[i] >= 0 && thread_epoch[i] < current) {
            return;  // Thread still in old epoch
        }
    }

    // Safe to advance and free old epoch's nodes
    int old = (current + 2) % 3;
    free_all(retire_lists[old]);
    atomic_fetch_add(&global_epoch, 1);
}
```

## Lock-Free Queue

### Michael-Scott Queue

```c
typedef struct Node {
    int data;
    _Atomic(struct Node*) next;
} Node;

typedef struct {
    _Atomic(Node*) head;
    _Atomic(Node*) tail;
} LockFreeQueue;

void queue_init(LockFreeQueue* q) {
    Node* dummy = malloc(sizeof(Node));
    atomic_store(&dummy->next, NULL);
    atomic_store(&q->head, dummy);
    atomic_store(&q->tail, dummy);
}

void queue_enqueue(LockFreeQueue* q, int value) {
    Node* new_node = malloc(sizeof(Node));
    new_node->data = value;
    atomic_store(&new_node->next, NULL);

    Node* tail;
    Node* next;

    while (1) {
        tail = atomic_load(&q->tail);
        next = atomic_load(&tail->next);

        if (tail == atomic_load(&q->tail)) {
            if (next == NULL) {
                // Try to link new node
                if (atomic_compare_exchange_weak(&tail->next, &next, new_node)) {
                    // Success, try to update tail
                    atomic_compare_exchange_weak(&q->tail, &tail, new_node);
                    return;
                }
            } else {
                // Tail was behind, help advance it
                atomic_compare_exchange_weak(&q->tail, &tail, next);
            }
        }
    }
}

bool queue_dequeue(LockFreeQueue* q, int* value) {
    Node* head;
    Node* tail;
    Node* next;

    while (1) {
        head = atomic_load(&q->head);
        tail = atomic_load(&q->tail);
        next = atomic_load(&head->next);

        if (head == atomic_load(&q->head)) {
            if (head == tail) {
                if (next == NULL) {
                    return false;  // Empty
                }
                // Tail behind, help advance
                atomic_compare_exchange_weak(&q->tail, &tail, next);
            } else {
                *value = next->data;
                if (atomic_compare_exchange_weak(&q->head, &head, next)) {
                    free(head);  // Free old dummy
                    return true;
                }
            }
        }
    }
}
```

## Memory Ordering

Compilers and CPUs may reorder memory operations:

```c
int x = 0, y = 0;

// Thread 1          // Thread 2
x = 1;               y = 1;
r1 = y;              r2 = x;

// Possible: r1 = 0, r2 = 0 (due to reordering!)
```

### Memory Order Options

```c
// Sequential consistency (strongest, slowest)
atomic_store_explicit(&x, 1, memory_order_seq_cst);

// Release/Acquire (for synchronization)
atomic_store_explicit(&x, 1, memory_order_release);
atomic_load_explicit(&x, memory_order_acquire);

// Relaxed (no ordering guarantees)
atomic_store_explicit(&x, 1, memory_order_relaxed);
```

### Release-Acquire Pattern

```c
atomic_int ready = 0;
int data;

// Thread 1 (producer)
data = 42;
atomic_store_explicit(&ready, 1, memory_order_release);
// Everything before release is visible after acquire

// Thread 2 (consumer)
while (atomic_load_explicit(&ready, memory_order_acquire) == 0);
// Now data is guaranteed to be 42
printf("%d\n", data);
```

## Read-Copy-Update (RCU)

Linux kernel's lock-free technique for read-mostly data:

```c
// Conceptual RCU
struct Data {
    int value;
    // ...
};

_Atomic(struct Data*) global_data;

// Reader (very fast, no locks)
void read_data() {
    rcu_read_lock();
    struct Data* p = atomic_load(&global_data);
    // Use p->value
    rcu_read_unlock();
}

// Writer (serialized with other writers)
void update_data(int new_value) {
    struct Data* new = malloc(sizeof(struct Data));
    new->value = new_value;

    struct Data* old = atomic_exchange(&global_data, new);

    synchronize_rcu();  // Wait for all readers
    free(old);
}
```

## When to Use Lock-Free

**Good for:**
- Simple data structures (stack, queue, counter)
- Read-heavy workloads
- Real-time systems
- High-contention scenarios

**Bad for:**
- Complex operations
- Long transactions
- When lock overhead is acceptable
- Debugging (very hard to debug)

## Performance Comparison

```
Lock-based vs Lock-free (example measurements):

Low contention:
  Lock: 50ns per operation
  Lock-free: 30ns per operation

High contention (8 threads):
  Lock: 500ns per operation (convoy effect)
  Lock-free: 80ns per operation
```

## Summary

Lock-free synchronization offers performance benefits:
- Uses atomic CAS operations instead of locks
- Avoids deadlock, priority inversion, convoying
- ABA problem requires careful memory management
- Hazard pointers and epoch-based reclamation for safe memory freeing
- Memory ordering critical for correctness
- RCU efficient for read-mostly workloads
- More complex to implement correctly
- Best for simple structures under high contention
