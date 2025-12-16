# Implicit Threading

Implicit threading transfers thread management from programmers to compilers and runtime systems. This subtopic covers OpenMP, Grand Central Dispatch, and other implicit threading approaches.

## What is Implicit Threading?

In **explicit threading**, programmers manually create and manage threads:

```c
// Explicit: Programmer manages threads
pthread_t threads[4];
for (int i = 0; i < 4; i++) {
    pthread_create(&threads[i], NULL, worker, &data[i]);
}
for (int i = 0; i < 4; i++) {
    pthread_join(threads[i], NULL);
}
```

In **implicit threading**, the system handles thread management:

```c
// Implicit: System manages threads
#pragma omp parallel for
for (int i = 0; i < n; i++) {
    process(data[i]);
}
```

## OpenMP

OpenMP (Open Multi-Processing) provides compiler directives for parallel programming.

### Basic Parallel Region

```c
#include <omp.h>
#include <stdio.h>

int main() {
    #pragma omp parallel
    {
        int tid = omp_get_thread_num();
        int num = omp_get_num_threads();
        printf("Thread %d of %d\n", tid, num);
    }
    return 0;
}
// Compile: gcc -fopenmp program.c
```

### Parallel For Loop

```c
#include <omp.h>

void vector_add(double* a, double* b, double* c, int n) {
    #pragma omp parallel for
    for (int i = 0; i < n; i++) {
        c[i] = a[i] + b[i];
    }
}
```

### Loop Scheduling

```c
// Static: Equal chunks assigned at compile time
#pragma omp parallel for schedule(static)

// Static with chunk size
#pragma omp parallel for schedule(static, 100)

// Dynamic: Chunks assigned at runtime
#pragma omp parallel for schedule(dynamic)

// Guided: Decreasing chunk sizes
#pragma omp parallel for schedule(guided)

// Auto: Let compiler decide
#pragma omp parallel for schedule(auto)
```

### Reduction Operations

```c
#include <omp.h>

double sum_array(double* arr, int n) {
    double sum = 0.0;

    #pragma omp parallel for reduction(+:sum)
    for (int i = 0; i < n; i++) {
        sum += arr[i];
    }

    return sum;
}

// Other reductions: -, *, &, |, ^, &&, ||, max, min
```

### Sections for Different Tasks

```c
#pragma omp parallel sections
{
    #pragma omp section
    {
        // Task A
        process_input();
    }
    #pragma omp section
    {
        // Task B
        compute_results();
    }
    #pragma omp section
    {
        // Task C
        generate_report();
    }
}
```

### Data Sharing

```c
int shared_var = 0;

#pragma omp parallel
{
    int private_var;  // Each thread gets own copy

    #pragma omp for
    for (int i = 0; i < n; i++) {
        // Explicitly declare sharing
        #pragma omp atomic
        shared_var++;
    }
}

// Explicit clauses
#pragma omp parallel for private(x) shared(y) firstprivate(z)
```

### Synchronization

```c
#pragma omp parallel
{
    // Only one thread executes
    #pragma omp single
    {
        initialize();
    }

    // Barrier - all threads wait
    #pragma omp barrier

    // Critical section
    #pragma omp critical
    {
        shared_resource++;
    }

    // Atomic operation
    #pragma omp atomic
    counter++;
}
```

## Grand Central Dispatch (GCD)

Apple's GCD provides queue-based concurrency:

### Dispatch Queues

```c
#include <dispatch/dispatch.h>

// Serial queue - tasks execute one at a time
dispatch_queue_t serial = dispatch_queue_create("com.example.serial",
                                                 DISPATCH_QUEUE_SERIAL);

// Concurrent queue - tasks execute in parallel
dispatch_queue_t concurrent = dispatch_queue_create("com.example.concurrent",
                                                     DISPATCH_QUEUE_CONCURRENT);

// Global concurrent queue
dispatch_queue_t global = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);

// Main queue (UI thread)
dispatch_queue_t main = dispatch_get_main_queue();
```

### Dispatching Work

```c
// Asynchronous dispatch
dispatch_async(queue, ^{
    // Work executes on queue's thread
    process_data();
});

// Synchronous dispatch (blocks until complete)
dispatch_sync(queue, ^{
    critical_section();
});

// Dispatch after delay
dispatch_after(dispatch_time(DISPATCH_TIME_NOW, 2 * NSEC_PER_SEC),
               queue, ^{
    delayed_work();
});
```

### Dispatch Groups

```c
dispatch_group_t group = dispatch_group_create();
dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);

// Add tasks to group
dispatch_group_async(group, queue, ^{
    task1();
});

dispatch_group_async(group, queue, ^{
    task2();
});

// Wait for all tasks to complete
dispatch_group_wait(group, DISPATCH_TIME_FOREVER);

// Or notify when complete
dispatch_group_notify(group, dispatch_get_main_queue(), ^{
    all_tasks_done();
});
```

### Dispatch Apply (Parallel For)

```c
dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);

// Parallel for loop
dispatch_apply(100, queue, ^(size_t i) {
    process_element(i);
});
// Returns after all iterations complete
```

## Intel Threading Building Blocks (TBB)

C++ library for parallel programming:

```cpp
#include <tbb/parallel_for.h>
#include <tbb/blocked_range.h>

// Parallel for loop
tbb::parallel_for(tbb::blocked_range<size_t>(0, n),
    [&](const tbb::blocked_range<size_t>& r) {
        for (size_t i = r.begin(); i != r.end(); ++i) {
            process(data[i]);
        }
    });

// Parallel reduce
#include <tbb/parallel_reduce.h>

double sum = tbb::parallel_reduce(
    tbb::blocked_range<size_t>(0, n),
    0.0,
    [&](const tbb::blocked_range<size_t>& r, double init) {
        for (size_t i = r.begin(); i != r.end(); ++i) {
            init += data[i];
        }
        return init;
    },
    [](double x, double y) { return x + y; }
);
```

## Fork-Join Model

Common pattern in implicit threading:

```
Main Thread
    │
    ├──────────┬──────────┬──────────┐  Fork
    │          │          │          │
    ↓          ↓          ↓          ↓
 Worker 1  Worker 2  Worker 3  Worker 4
    │          │          │          │
    │          │          │          │
    └──────────┴──────────┴──────────┘  Join
    │
    ↓
Main Thread
```

```c
// OpenMP fork-join
#pragma omp parallel
{
    // Fork: threads created
    do_parallel_work();
}
// Join: threads synchronized

// Java Fork/Join (conceptual)
class MyTask extends RecursiveTask<Integer> {
    protected Integer compute() {
        if (small_enough) {
            return direct_compute();
        }
        MyTask left = new MyTask(left_half);
        MyTask right = new MyTask(right_half);
        left.fork();  // Async execute
        int rightResult = right.compute();  // Sync execute
        int leftResult = left.join();  // Wait
        return leftResult + rightResult;
    }
}
```

## Benefits of Implicit Threading

| Aspect | Explicit | Implicit |
|--------|----------|----------|
| Complexity | High | Low |
| Thread management | Manual | Automatic |
| Load balancing | Manual | Often automatic |
| Scalability | Requires rewrite | Often automatic |
| Portability | API-specific | Often higher |

## Choosing an Approach

- **OpenMP**: Scientific computing, loop parallelism
- **GCD**: macOS/iOS applications
- **TBB**: C++ applications, complex parallelism
- **Fork-Join**: Divide-and-conquer algorithms

## Summary

Implicit threading simplifies parallel programming:
- OpenMP uses compiler directives for parallel regions
- GCD provides queue-based task execution
- TBB offers C++ parallel algorithms
- Fork-join model enables recursive parallelism
- System handles thread creation and scheduling
- Programmer focuses on what to parallelize, not how
- Easier to write correct, scalable parallel code
