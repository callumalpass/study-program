---
id: cs302-t6-concurrent
title: "Concurrent Servers"
order: 6
---

# Concurrent Server Architectures

## Why Concurrency?

A sequential server handles one client at a time:

```c
while (1) {
    client_fd = accept(server_fd, ...);
    handle_client(client_fd);  // Other clients wait
    close(client_fd);
}
```

This is unacceptable for most servers. Concurrent designs let multiple clients be served simultaneously.

## Process-per-Client

Fork a child process for each connection:

```c
while (1) {
    int client_fd = accept(server_fd, NULL, NULL);

    pid_t pid = fork();
    if (pid == 0) {
        // Child process
        close(server_fd);  // Child doesn't need listening socket
        handle_client(client_fd);
        close(client_fd);
        exit(0);
    } else {
        // Parent process
        close(client_fd);  // Parent doesn't need client socket
    }
}
```

**Advantages**:
- Simple to implement
- Process isolation—crash affects only one client
- Automatic resource cleanup on exit

**Disadvantages**:
- Fork overhead (though copy-on-write helps)
- Memory per process
- IPC needed for shared state
- Doesn't scale to many connections

## Zombie Process Handling

Child processes become zombies if parent doesn't wait:

```c
#include <signal.h>

void sigchld_handler(int sig) {
    while (waitpid(-1, NULL, WNOHANG) > 0);
}

int main() {
    signal(SIGCHLD, sigchld_handler);
    // Server loop...
}
```

Or use `SA_NOCLDWAIT`:
```c
struct sigaction sa;
sa.sa_handler = SIG_IGN;
sa.sa_flags = SA_NOCLDWAIT;
sigaction(SIGCHLD, &sa, NULL);
```

## Thread-per-Client

Create a thread for each connection:

```c
void *handle_client(void *arg) {
    int client_fd = *(int *)arg;
    free(arg);

    // Handle client...

    close(client_fd);
    return NULL;
}

int main() {
    while (1) {
        int client_fd = accept(server_fd, NULL, NULL);

        int *fd_ptr = malloc(sizeof(int));
        *fd_ptr = client_fd;

        pthread_t thread;
        pthread_create(&thread, NULL, handle_client, fd_ptr);
        pthread_detach(thread);  // Auto-cleanup when done
    }
}
```

**Advantages**:
- Lower overhead than processes
- Shared memory simplifies communication
- Familiar programming model

**Disadvantages**:
- Thread stack memory (~1MB default)
- Synchronization complexity
- Context switching overhead
- Limited scalability (thousands, not millions)

## Thread Pool

Pre-create threads that process connections from a queue:

```c
#define POOL_SIZE 10
#define QUEUE_SIZE 100

int client_queue[QUEUE_SIZE];
int queue_head = 0, queue_tail = 0;
pthread_mutex_t queue_lock = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t queue_cond = PTHREAD_COND_INITIALIZER;

void *worker(void *arg) {
    while (1) {
        pthread_mutex_lock(&queue_lock);
        while (queue_head == queue_tail) {
            pthread_cond_wait(&queue_cond, &queue_lock);
        }
        int client_fd = client_queue[queue_head];
        queue_head = (queue_head + 1) % QUEUE_SIZE;
        pthread_mutex_unlock(&queue_lock);

        handle_client(client_fd);
        close(client_fd);
    }
}

int main() {
    // Create worker threads
    pthread_t threads[POOL_SIZE];
    for (int i = 0; i < POOL_SIZE; i++) {
        pthread_create(&threads[i], NULL, worker, NULL);
    }

    // Accept and queue connections
    while (1) {
        int client_fd = accept(server_fd, NULL, NULL);

        pthread_mutex_lock(&queue_lock);
        client_queue[queue_tail] = client_fd;
        queue_tail = (queue_tail + 1) % QUEUE_SIZE;
        pthread_cond_signal(&queue_cond);
        pthread_mutex_unlock(&queue_lock);
    }
}
```

**Advantages**:
- Bounded resource usage
- Amortized thread creation overhead
- Better cache behavior

## Event-Driven (Reactor Pattern)

Single thread multiplexes all connections:

```c
while (1) {
    int nready = epoll_wait(epfd, events, MAX_EVENTS, -1);

    for (int i = 0; i < nready; i++) {
        int fd = events[i].data.fd;

        if (fd == server_fd) {
            accept_new_connection();
        } else if (events[i].events & EPOLLIN) {
            handle_read(fd);
        } else if (events[i].events & EPOLLOUT) {
            handle_write(fd);
        }
    }
}
```

**Advantages**:
- Excellent scalability (C10K problem solution)
- No synchronization needed
- Low memory overhead

**Disadvantages**:
- Complex programming model
- Must avoid blocking operations
- CPU-bound work blocks everything

## Event-Driven with Workers

Hybrid approach—event loop plus worker threads:

```
Main thread: epoll_wait, read/write non-blocking
Worker threads: Handle CPU-intensive tasks

Event loop → Queue request → Worker processes → Queue response → Event loop sends
```

This combines event-driven I/O efficiency with multi-core utilization.

## Comparison

| Architecture | Memory | Scalability | Complexity | Use Case |
|--------------|--------|-------------|------------|----------|
| Process-per-client | High | Low (~1K) | Low | Simple, isolated |
| Thread-per-client | Medium | Medium (~10K) | Medium | General purpose |
| Thread pool | Medium | Medium | Medium | Bounded resources |
| Event-driven | Low | High (~100K+) | High | High-connection count |
| Hybrid | Medium | Very High | High | Production servers |

## Real-World Examples

**Apache (prefork)**: Process-per-client
**Apache (worker)**: Thread pool
**nginx**: Event-driven + worker processes
**Node.js**: Event-driven + optional workers
**Go**: Goroutines (lightweight threads)

## Design Considerations

**CPU-bound vs I/O-bound**:
- I/O-bound: Event-driven excels
- CPU-bound: Need multiple threads/processes

**State management**:
- Processes: No shared state
- Threads: Shared memory (careful synchronization)
- Event-driven: All state in main thread

**Blocking operations**:
- Database queries, file I/O can block
- Use async versions or offload to workers

**Graceful shutdown**:
- Stop accepting new connections
- Complete existing requests
- Set timeout for stragglers
