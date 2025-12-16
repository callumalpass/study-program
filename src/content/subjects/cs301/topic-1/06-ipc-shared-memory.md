# Interprocess Communication: Shared Memory

Shared memory allows multiple processes to access the same memory region, enabling fast data exchange. This subtopic covers shared memory mechanisms and their implementation.

## Overview of IPC

**Interprocess Communication (IPC)** enables processes to exchange data and coordinate activities. There are two fundamental models:

1. **Shared Memory**: Processes share a memory region
2. **Message Passing**: Processes exchange messages through the kernel

```
Shared Memory Model:
┌─────────────┐         ┌─────────────┐
│  Process A  │         │  Process B  │
│             │         │             │
│  ┌───────┐  │         │  ┌───────┐  │
│  │ Local │  │         │  │ Local │  │
│  └───────┘  │         │  └───────┘  │
│      │      │         │      │      │
└──────┼──────┘         └──────┼──────┘
       │                       │
       │    ┌───────────┐      │
       └───→│  Shared   │←─────┘
            │  Memory   │
            └───────────┘
```

## POSIX Shared Memory

### Creating Shared Memory

```c
#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>
#include <string.h>

#define SHM_NAME "/my_shm"
#define SHM_SIZE 4096

// Writer process
int main() {
    // Create shared memory object
    int fd = shm_open(SHM_NAME, O_CREAT | O_RDWR, 0666);
    if (fd == -1) {
        perror("shm_open");
        return 1;
    }

    // Set size
    if (ftruncate(fd, SHM_SIZE) == -1) {
        perror("ftruncate");
        return 1;
    }

    // Map into address space
    void *ptr = mmap(NULL, SHM_SIZE,
                     PROT_READ | PROT_WRITE,
                     MAP_SHARED, fd, 0);
    if (ptr == MAP_FAILED) {
        perror("mmap");
        return 1;
    }

    // Write data
    sprintf(ptr, "Hello from writer process!");

    printf("Written to shared memory\n");

    // Cleanup
    munmap(ptr, SHM_SIZE);
    close(fd);

    return 0;
}
```

### Reading Shared Memory

```c
// Reader process
int main() {
    // Open existing shared memory
    int fd = shm_open(SHM_NAME, O_RDONLY, 0666);
    if (fd == -1) {
        perror("shm_open");
        return 1;
    }

    // Map into address space
    void *ptr = mmap(NULL, SHM_SIZE,
                     PROT_READ,
                     MAP_SHARED, fd, 0);
    if (ptr == MAP_FAILED) {
        perror("mmap");
        return 1;
    }

    // Read data
    printf("Read from shared memory: %s\n", (char *)ptr);

    // Cleanup
    munmap(ptr, SHM_SIZE);
    close(fd);

    // Remove shared memory object
    shm_unlink(SHM_NAME);

    return 0;
}
```

## System V Shared Memory

Older but still widely used API:

```c
#include <sys/ipc.h>
#include <sys/shm.h>
#include <stdio.h>
#include <string.h>

#define SHM_KEY 1234
#define SHM_SIZE 4096

// Create and attach
int main() {
    // Create shared memory segment
    int shmid = shmget(SHM_KEY, SHM_SIZE,
                       IPC_CREAT | 0666);
    if (shmid == -1) {
        perror("shmget");
        return 1;
    }

    // Attach to address space
    char *ptr = shmat(shmid, NULL, 0);
    if (ptr == (char *)-1) {
        perror("shmat");
        return 1;
    }

    // Use shared memory
    strcpy(ptr, "Hello via System V!");

    // Detach
    shmdt(ptr);

    // Remove segment (when done)
    // shmctl(shmid, IPC_RMID, NULL);

    return 0;
}
```

### System V Commands

```bash
# List shared memory segments
ipcs -m

# Remove a segment
ipcrm -m <shmid>

# Get detailed info
ipcs -m -i <shmid>
```

## Synchronization with Shared Memory

Shared memory requires explicit synchronization:

### Using Semaphores

```c
#include <semaphore.h>
#include <sys/mman.h>
#include <fcntl.h>

typedef struct {
    sem_t mutex;
    int counter;
    char data[1024];
} SharedData;

int main() {
    // Create shared memory
    int fd = shm_open("/sync_shm", O_CREAT | O_RDWR, 0666);
    ftruncate(fd, sizeof(SharedData));

    SharedData *shared = mmap(NULL, sizeof(SharedData),
                              PROT_READ | PROT_WRITE,
                              MAP_SHARED, fd, 0);

    // Initialize semaphore (first process only)
    sem_init(&shared->mutex, 1, 1);  // 1 = shared between processes

    // Critical section
    sem_wait(&shared->mutex);
    shared->counter++;
    strcpy(shared->data, "Updated!");
    sem_post(&shared->mutex);

    return 0;
}
```

### Using Mutex in Shared Memory

```c
#include <pthread.h>
#include <sys/mman.h>

typedef struct {
    pthread_mutex_t mutex;
    int value;
} SharedCounter;

void initialize_shared_mutex(SharedCounter *sc) {
    pthread_mutexattr_t attr;
    pthread_mutexattr_init(&attr);
    pthread_mutexattr_setpshared(&attr, PTHREAD_PROCESS_SHARED);

    pthread_mutex_init(&sc->mutex, &attr);
    pthread_mutexattr_destroy(&attr);
}

void increment(SharedCounter *sc) {
    pthread_mutex_lock(&sc->mutex);
    sc->value++;
    pthread_mutex_unlock(&sc->mutex);
}
```

## Producer-Consumer with Shared Memory

Classic example using shared memory:

```c
#define BUFFER_SIZE 10

typedef struct {
    sem_t empty;      // Count of empty slots
    sem_t full;       // Count of filled slots
    sem_t mutex;      // Mutual exclusion
    int buffer[BUFFER_SIZE];
    int in;           // Next write position
    int out;          // Next read position
} SharedBuffer;

// Producer
void producer(SharedBuffer *sb) {
    while (1) {
        int item = produce_item();

        sem_wait(&sb->empty);     // Wait for empty slot
        sem_wait(&sb->mutex);     // Enter critical section

        sb->buffer[sb->in] = item;
        sb->in = (sb->in + 1) % BUFFER_SIZE;

        sem_post(&sb->mutex);     // Leave critical section
        sem_post(&sb->full);      // Signal item available
    }
}

// Consumer
void consumer(SharedBuffer *sb) {
    while (1) {
        sem_wait(&sb->full);      // Wait for item
        sem_wait(&sb->mutex);     // Enter critical section

        int item = sb->buffer[sb->out];
        sb->out = (sb->out + 1) % BUFFER_SIZE;

        sem_post(&sb->mutex);     // Leave critical section
        sem_post(&sb->empty);     // Signal empty slot

        consume_item(item);
    }
}
```

## Memory-Mapped Files

Files can be mapped into memory for IPC:

```c
#include <sys/mman.h>
#include <fcntl.h>

int main() {
    // Create/open file
    int fd = open("data.bin", O_RDWR | O_CREAT, 0666);
    ftruncate(fd, 4096);

    // Map file into memory
    void *ptr = mmap(NULL, 4096,
                     PROT_READ | PROT_WRITE,
                     MAP_SHARED, fd, 0);

    // Write to memory = write to file
    strcpy(ptr, "Data persisted to file!");

    // Sync to disk
    msync(ptr, 4096, MS_SYNC);

    munmap(ptr, 4096);
    close(fd);

    return 0;
}
```

## Advantages and Disadvantages

### Advantages

- **Speed**: No kernel involvement after setup
- **Efficiency**: Large data transfers without copying
- **Flexibility**: Any data structure can be shared

### Disadvantages

- **Complexity**: Requires explicit synchronization
- **Same machine**: Only works for local processes
- **Protection**: Harder to enforce access control
- **Debugging**: Race conditions are difficult to debug

## Shared Memory vs Message Passing

| Aspect | Shared Memory | Message Passing |
|--------|---------------|-----------------|
| Speed | Faster (no copying) | Slower (kernel copy) |
| Sync | Manual | Built into API |
| Network | Local only | Can be networked |
| Complexity | Higher | Lower |
| Safety | Less safe | More safe |

## Summary

Shared memory is a powerful IPC mechanism:
- POSIX and System V provide different APIs
- Memory can be shared between unrelated processes
- Synchronization (semaphores, mutexes) is essential
- Memory-mapped files provide persistence
- Fast but requires careful coordination
- Best for large data transfers on same machine
