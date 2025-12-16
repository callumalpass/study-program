# Thread Pools

Thread pools manage a collection of reusable worker threads to efficiently handle many tasks. This subtopic covers thread pool design, implementation, and benefits.

## Why Thread Pools?

Creating and destroying threads for each task is expensive:

```c
// Inefficient: Create/destroy thread per task
for (int i = 0; i < 10000; i++) {
    pthread_t t;
    pthread_create(&t, NULL, process_task, &tasks[i]);
    pthread_join(t, NULL);  // Wait for each task
}
// 10000 thread creations/destructions!
```

Thread pools solve this by:
- Pre-creating a fixed number of worker threads
- Reusing threads for multiple tasks
- Queuing tasks when all threads are busy

```
┌─────────────────────────────────────────────────────┐
│                    Thread Pool                       │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │              Task Queue                       │   │
│  │  [Task1] → [Task2] → [Task3] → [Task4] →     │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐       │
│  │Worker 1│ │Worker 2│ │Worker 3│ │Worker 4│       │
│  │  busy  │ │  idle  │ │  busy  │ │  idle  │       │
│  └────────┘ └────────┘ └────────┘ └────────┘       │
└─────────────────────────────────────────────────────┘
```

## Basic Thread Pool Implementation

```c
#include <pthread.h>
#include <stdlib.h>
#include <stdbool.h>

#define POOL_SIZE 4
#define QUEUE_SIZE 100

typedef struct {
    void (*function)(void*);
    void* argument;
} Task;

typedef struct {
    pthread_t threads[POOL_SIZE];
    Task queue[QUEUE_SIZE];
    int queue_head;
    int queue_tail;
    int queue_count;

    pthread_mutex_t mutex;
    pthread_cond_t not_empty;
    pthread_cond_t not_full;

    bool shutdown;
} ThreadPool;

ThreadPool pool;

void* worker_thread(void* arg) {
    while (1) {
        pthread_mutex_lock(&pool.mutex);

        // Wait for task or shutdown
        while (pool.queue_count == 0 && !pool.shutdown) {
            pthread_cond_wait(&pool.not_empty, &pool.mutex);
        }

        if (pool.shutdown && pool.queue_count == 0) {
            pthread_mutex_unlock(&pool.mutex);
            pthread_exit(NULL);
        }

        // Dequeue task
        Task task = pool.queue[pool.queue_head];
        pool.queue_head = (pool.queue_head + 1) % QUEUE_SIZE;
        pool.queue_count--;

        pthread_cond_signal(&pool.not_full);
        pthread_mutex_unlock(&pool.mutex);

        // Execute task
        task.function(task.argument);
    }
    return NULL;
}

void pool_init() {
    pool.queue_head = 0;
    pool.queue_tail = 0;
    pool.queue_count = 0;
    pool.shutdown = false;

    pthread_mutex_init(&pool.mutex, NULL);
    pthread_cond_init(&pool.not_empty, NULL);
    pthread_cond_init(&pool.not_full, NULL);

    for (int i = 0; i < POOL_SIZE; i++) {
        pthread_create(&pool.threads[i], NULL, worker_thread, NULL);
    }
}

void pool_submit(void (*function)(void*), void* arg) {
    pthread_mutex_lock(&pool.mutex);

    // Wait if queue is full
    while (pool.queue_count == QUEUE_SIZE) {
        pthread_cond_wait(&pool.not_full, &pool.mutex);
    }

    // Enqueue task
    pool.queue[pool.queue_tail].function = function;
    pool.queue[pool.queue_tail].argument = arg;
    pool.queue_tail = (pool.queue_tail + 1) % QUEUE_SIZE;
    pool.queue_count++;

    pthread_cond_signal(&pool.not_empty);
    pthread_mutex_unlock(&pool.mutex);
}

void pool_shutdown() {
    pthread_mutex_lock(&pool.mutex);
    pool.shutdown = true;
    pthread_cond_broadcast(&pool.not_empty);
    pthread_mutex_unlock(&pool.mutex);

    for (int i = 0; i < POOL_SIZE; i++) {
        pthread_join(pool.threads[i], NULL);
    }

    pthread_mutex_destroy(&pool.mutex);
    pthread_cond_destroy(&pool.not_empty);
    pthread_cond_destroy(&pool.not_full);
}
```

## Using the Thread Pool

```c
void process_item(void* arg) {
    int* item = (int*)arg;
    printf("Processing item %d\n", *item);
    // Simulate work
    usleep(100000);
    free(item);
}

int main() {
    pool_init();

    // Submit many tasks
    for (int i = 0; i < 100; i++) {
        int* item = malloc(sizeof(int));
        *item = i;
        pool_submit(process_item, item);
    }

    // Allow time for processing
    sleep(5);

    pool_shutdown();
    return 0;
}
```

## Pool Sizing Considerations

### CPU-Bound Tasks

For CPU-intensive tasks, match pool size to CPU cores:

```c
#include <unistd.h>

int get_optimal_pool_size() {
    int cpus = sysconf(_SC_NPROCESSORS_ONLN);
    return cpus;  // One thread per core
}
```

### I/O-Bound Tasks

For I/O-bound tasks, use more threads:

```c
int get_pool_size_for_io() {
    int cpus = sysconf(_SC_NPROCESSORS_ONLN);
    // N * (1 + wait_time/service_time)
    // Typically 2-10x CPU count for I/O bound
    return cpus * 4;
}
```

### Dynamic Sizing

Some pools adjust size based on load:

```c
typedef struct {
    int min_threads;
    int max_threads;
    int current_threads;
    int active_threads;
    // ...
} DynamicPool;

void maybe_add_thread(DynamicPool* pool) {
    if (pool->active_threads == pool->current_threads &&
        pool->current_threads < pool->max_threads) {
        // All threads busy, queue growing - add thread
        add_worker_thread(pool);
    }
}

void maybe_remove_thread(DynamicPool* pool) {
    if (pool->active_threads < pool->current_threads / 2 &&
        pool->current_threads > pool->min_threads) {
        // Less than half busy - remove idle thread
        remove_idle_thread(pool);
    }
}
```

## Work Stealing

Advanced thread pools use work stealing for load balancing:

```c
// Each worker has its own queue
typedef struct {
    Task* tasks;
    int head;  // For own dequeue (LIFO)
    int tail;  // For stealing (FIFO)
    pthread_mutex_t mutex;
} WorkQueue;

WorkQueue queues[POOL_SIZE];

Task* try_steal(int victim) {
    WorkQueue* q = &queues[victim];

    pthread_mutex_lock(&q->mutex);
    if (q->head > q->tail) {
        Task* task = &q->tasks[q->tail++];
        pthread_mutex_unlock(&q->mutex);
        return task;
    }
    pthread_mutex_unlock(&q->mutex);
    return NULL;
}

void* worker(void* arg) {
    int my_id = *(int*)arg;

    while (!shutdown) {
        Task* task = dequeue_own(&queues[my_id]);

        if (task == NULL) {
            // Try to steal from others
            for (int i = 0; i < POOL_SIZE; i++) {
                if (i != my_id) {
                    task = try_steal(i);
                    if (task) break;
                }
            }
        }

        if (task) {
            execute(task);
        } else {
            // Nothing to do, wait
            wait_for_work();
        }
    }
    return NULL;
}
```

## Future/Promise Pattern

Thread pools often return futures for task results:

```c
typedef struct {
    void* result;
    bool completed;
    pthread_mutex_t mutex;
    pthread_cond_t cond;
} Future;

Future* pool_submit_with_future(void* (*function)(void*), void* arg) {
    Future* future = malloc(sizeof(Future));
    future->completed = false;
    pthread_mutex_init(&future->mutex, NULL);
    pthread_cond_init(&future->cond, NULL);

    // Wrap function to set result
    TaskWithFuture* task = malloc(sizeof(TaskWithFuture));
    task->function = function;
    task->arg = arg;
    task->future = future;

    pool_submit(wrapper_function, task);
    return future;
}

void* future_get(Future* future) {
    pthread_mutex_lock(&future->mutex);
    while (!future->completed) {
        pthread_cond_wait(&future->cond, &future->mutex);
    }
    void* result = future->result;
    pthread_mutex_unlock(&future->mutex);
    return result;
}
```

## Benefits of Thread Pools

| Aspect | Per-Task Threads | Thread Pool |
|--------|------------------|-------------|
| Creation overhead | High | Amortized |
| Memory usage | Unbounded | Bounded |
| Response time | Inconsistent | More consistent |
| Resource management | Difficult | Centralized |
| Scalability | Poor | Good |

## Common Use Cases

1. **Web Servers**: Handle concurrent requests
2. **Database Connections**: Manage connection workers
3. **Batch Processing**: Process many items efficiently
4. **Event Handling**: Dispatch events to handlers

## Summary

Thread pools provide efficient task execution:
- Reuse threads to avoid creation/destruction overhead
- Queue tasks when workers are busy
- Size pool based on workload characteristics
- Work stealing improves load balancing
- Future/promise pattern for getting results
- Essential for high-performance concurrent applications
