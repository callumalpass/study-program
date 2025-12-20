---
id: cs301-t2-pthreads
title: "Pthreads Library"
order: 3
---

# POSIX Threads (Pthreads)

Pthreads is the standard threading API for Unix-like systems. This subtopic covers thread creation, management, and synchronization using the pthreads library.

## Introduction to Pthreads

POSIX Threads (pthreads) is a standardized C language threading API defined by IEEE POSIX 1003.1c. It provides:

- Thread creation and termination
- Thread synchronization primitives
- Thread-specific data
- Thread scheduling

```c
// Compile with -pthread flag
// gcc -pthread program.c -o program

#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
```

## Thread Creation

### Basic Thread Creation

```c
#include <pthread.h>
#include <stdio.h>
#include <unistd.h>

void* thread_function(void* arg) {
    int* num = (int*)arg;
    printf("Thread received: %d\n", *num);

    // Thread work
    sleep(1);

    printf("Thread finishing\n");
    return NULL;
}

int main() {
    pthread_t thread;
    int arg = 42;

    // Create thread
    int result = pthread_create(&thread, NULL, thread_function, &arg);
    if (result != 0) {
        perror("pthread_create");
        return 1;
    }

    printf("Main thread continues\n");

    // Wait for thread to complete
    pthread_join(thread, NULL);

    printf("Thread has finished\n");
    return 0;
}
```

### pthread_create Parameters

```c
int pthread_create(
    pthread_t *thread,          // Thread identifier (output)
    const pthread_attr_t *attr, // Thread attributes (NULL for default)
    void *(*start_routine)(void*), // Function to execute
    void *arg                   // Argument to function
);
```

## Thread Termination

### Returning from Thread Function

```c
void* thread_func(void* arg) {
    int* result = malloc(sizeof(int));
    *result = 42;
    return result;  // Thread terminates, returns value
}
```

### Using pthread_exit

```c
void* thread_func(void* arg) {
    // Can exit from anywhere in the thread
    if (error_condition) {
        pthread_exit(NULL);  // Terminate thread
    }

    int* result = malloc(sizeof(int));
    *result = 100;
    pthread_exit(result);  // Same as return
}
```

### Getting Return Value

```c
int main() {
    pthread_t thread;
    void* ret_val;

    pthread_create(&thread, NULL, thread_func, NULL);

    // Wait and get return value
    pthread_join(thread, &ret_val);

    if (ret_val != NULL) {
        int* result = (int*)ret_val;
        printf("Thread returned: %d\n", *result);
        free(result);
    }

    return 0;
}
```

## Thread Joining and Detaching

### Joining Threads

```c
// Wait for specific thread
pthread_t threads[5];
for (int i = 0; i < 5; i++) {
    pthread_create(&threads[i], NULL, worker, NULL);
}

// Join all threads
for (int i = 0; i < 5; i++) {
    pthread_join(threads[i], NULL);
}
```

### Detached Threads

```c
// Method 1: Detach after creation
pthread_t thread;
pthread_create(&thread, NULL, func, NULL);
pthread_detach(thread);  // Thread resources freed on termination

// Method 2: Create as detached
pthread_attr_t attr;
pthread_attr_init(&attr);
pthread_attr_setdetachstate(&attr, PTHREAD_CREATE_DETACHED);

pthread_create(&thread, &attr, func, NULL);
pthread_attr_destroy(&attr);
```

## Thread Attributes

```c
pthread_attr_t attr;

// Initialize attributes
pthread_attr_init(&attr);

// Set detach state
pthread_attr_setdetachstate(&attr, PTHREAD_CREATE_JOINABLE);
// or PTHREAD_CREATE_DETACHED

// Set stack size
pthread_attr_setstacksize(&attr, 2 * 1024 * 1024);  // 2 MB

// Set scheduling policy
pthread_attr_setschedpolicy(&attr, SCHED_FIFO);

// Set scheduling priority
struct sched_param param;
param.sched_priority = 50;
pthread_attr_setschedparam(&attr, &param);

// Create thread with attributes
pthread_t thread;
pthread_create(&thread, &attr, func, NULL);

// Clean up attributes
pthread_attr_destroy(&attr);
```

## Passing Arguments

### Single Argument

```c
void* print_number(void* arg) {
    int num = *(int*)arg;
    printf("%d\n", num);
    return NULL;
}

int main() {
    int value = 42;
    pthread_t t;
    pthread_create(&t, NULL, print_number, &value);
    pthread_join(t, NULL);
    return 0;
}
```

### Multiple Arguments

```c
typedef struct {
    int id;
    char* message;
    double value;
} ThreadArgs;

void* thread_func(void* arg) {
    ThreadArgs* args = (ThreadArgs*)arg;
    printf("Thread %d: %s (%.2f)\n",
           args->id, args->message, args->value);
    return NULL;
}

int main() {
    pthread_t threads[3];
    ThreadArgs args[3] = {
        {1, "First", 1.1},
        {2, "Second", 2.2},
        {3, "Third", 3.3}
    };

    for (int i = 0; i < 3; i++) {
        pthread_create(&threads[i], NULL, thread_func, &args[i]);
    }

    for (int i = 0; i < 3; i++) {
        pthread_join(threads[i], NULL);
    }
    return 0;
}
```

### Avoiding Common Pitfalls

```c
// WRONG: Variable changes before thread reads it
for (int i = 0; i < 5; i++) {
    pthread_create(&threads[i], NULL, func, &i);  // Bug!
}

// CORRECT: Each thread gets own copy
int* args[5];
for (int i = 0; i < 5; i++) {
    args[i] = malloc(sizeof(int));
    *args[i] = i;
    pthread_create(&threads[i], NULL, func, args[i]);
}
```

## Thread Cancellation

```c
void* cancelable_func(void* arg) {
    // Enable cancellation
    pthread_setcancelstate(PTHREAD_CANCEL_ENABLE, NULL);
    pthread_setcanceltype(PTHREAD_CANCEL_DEFERRED, NULL);

    while (1) {
        // Check for cancellation at cancellation points
        pthread_testcancel();
        do_work();
    }
    return NULL;
}

int main() {
    pthread_t thread;
    pthread_create(&thread, NULL, cancelable_func, NULL);

    sleep(5);

    // Request cancellation
    pthread_cancel(thread);

    // Wait for thread to finish
    void* result;
    pthread_join(thread, &result);

    if (result == PTHREAD_CANCELED) {
        printf("Thread was canceled\n");
    }

    return 0;
}
```

### Cleanup Handlers

```c
void cleanup(void* arg) {
    printf("Cleanup: %s\n", (char*)arg);
    // Free resources, release locks, etc.
}

void* thread_func(void* arg) {
    pthread_cleanup_push(cleanup, "First handler");
    pthread_cleanup_push(cleanup, "Second handler");

    // Do work that might be canceled

    pthread_cleanup_pop(1);  // Execute handler
    pthread_cleanup_pop(0);  // Don't execute

    return NULL;
}
```

## Thread-Specific Data

```c
pthread_key_t key;

void destructor(void* value) {
    free(value);
}

void* thread_func(void* arg) {
    // Set thread-specific data
    int* data = malloc(sizeof(int));
    *data = *(int*)arg;
    pthread_setspecific(key, data);

    // Later, retrieve it
    int* my_data = pthread_getspecific(key);
    printf("Thread %d has data: %d\n", *(int*)arg, *my_data);

    return NULL;
}

int main() {
    // Create key with destructor
    pthread_key_create(&key, destructor);

    pthread_t threads[3];
    int ids[3] = {1, 2, 3};

    for (int i = 0; i < 3; i++) {
        pthread_create(&threads[i], NULL, thread_func, &ids[i]);
    }

    for (int i = 0; i < 3; i++) {
        pthread_join(threads[i], NULL);
    }

    pthread_key_delete(key);
    return 0;
}
```

## Summary

Pthreads provides comprehensive threading support:
- pthread_create/join/detach for lifecycle management
- Attributes for customizing thread behavior
- Safe argument passing requires careful memory management
- Cancellation with cleanup handlers for resource management
- Thread-specific data for per-thread storage
- Standard API works across Unix-like systems
