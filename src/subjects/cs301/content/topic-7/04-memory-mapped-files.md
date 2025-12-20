---
id: cs301-t7-mmap
title: "Memory-Mapped Files"
order: 4
---

# Memory-Mapped Files

Memory-mapped files allow file I/O through memory operations. This subtopic covers mmap concepts, implementation, and use cases.

## Memory Mapping Concept

Map file contents directly into address space:

```
Traditional I/O:              Memory Mapped:
┌─────────────┐              ┌─────────────┐
│ Application │              │ Application │
└──────┬──────┘              └──────┬──────┘
       │ read()/write()            │ direct access
       ↓                           ↓
┌─────────────┐              ┌─────────────┐
│ User Buffer │              │ Virtual Mem │ ← File mapped here
└──────┬──────┘              └─────────────┘
       │ copy                      │
       ↓                           │
┌─────────────┐                    │
│ Page Cache  │                    │
└──────┬──────┘              ┌─────┴─────┐
       │                     │ Page Cache│
       ↓                     └───────────┘
┌─────────────┐
│    Disk     │
└─────────────┘
```

## mmap System Call

```c
#include <sys/mman.h>

void* mmap(
    void* addr,      // Suggested address (NULL = let kernel choose)
    size_t length,   // Size to map
    int prot,        // Protection (PROT_READ, PROT_WRITE, PROT_EXEC)
    int flags,       // MAP_SHARED, MAP_PRIVATE, MAP_ANONYMOUS
    int fd,          // File descriptor
    off_t offset     // Offset in file
);

int munmap(void* addr, size_t length);
```

### Basic Example

```c
#include <sys/mman.h>
#include <fcntl.h>
#include <unistd.h>

void read_file_mmap(const char* filename) {
    // Open file
    int fd = open(filename, O_RDONLY);
    if (fd < 0) {
        perror("open");
        return;
    }

    // Get file size
    off_t size = lseek(fd, 0, SEEK_END);
    lseek(fd, 0, SEEK_SET);

    // Map file
    char* data = mmap(NULL, size, PROT_READ, MAP_PRIVATE, fd, 0);
    if (data == MAP_FAILED) {
        perror("mmap");
        close(fd);
        return;
    }

    // Access file as memory
    for (off_t i = 0; i < size; i++) {
        printf("%c", data[i]);  // Just like array access!
    }

    // Cleanup
    munmap(data, size);
    close(fd);
}
```

## Mapping Flags

### MAP_SHARED vs MAP_PRIVATE

```c
// MAP_SHARED: Changes written back to file
// Multiple processes see same data
char* shared = mmap(NULL, size, PROT_READ | PROT_WRITE,
                    MAP_SHARED, fd, 0);
shared[0] = 'X';  // Written to file!

// MAP_PRIVATE: Copy-on-write
// Changes private to process
char* private = mmap(NULL, size, PROT_READ | PROT_WRITE,
                     MAP_PRIVATE, fd, 0);
private[0] = 'X';  // Only this process sees change
```

### MAP_ANONYMOUS

```c
// Anonymous mapping: Not backed by file
// Used for heap, stack allocation

void* memory = mmap(NULL, 4096, PROT_READ | PROT_WRITE,
                    MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);

// Like malloc, but page-aligned
// Can be shared with fork (MAP_SHARED)
```

## How Memory Mapping Works

### Page Fault on Access

```
1. Process accesses mapped address
2. Page not in memory → page fault
3. OS finds page in file
4. Allocates physical frame
5. Reads page from file into frame
6. Updates page table
7. Process continues

┌──────────────────────────────────────────┐
│ Virtual Memory                           │
│ ┌────┬────┬────┬────┬────┬────┐         │
│ │ P0 │ P1 │ P2 │ P3 │ P4 │ P5 │         │
│ └──┬─┴──┬─┴────┴──┬─┴────┴────┘         │
│    │    │         │                      │
│    ↓    ↓         ↓                      │
│   In   In      On disk                   │
│  memory        (not loaded)              │
└──────────────────────────────────────────┘
```

### Lazy Loading

```c
// Map large file
char* huge_file = mmap(NULL, 1GB, PROT_READ,
                       MAP_PRIVATE, fd, 0);

// Only accessed pages loaded
char first = huge_file[0];           // Page fault, load page 0
char middle = huge_file[500000000];  // Page fault, load that page

// Unused pages never loaded!
```

## Synchronization

### msync

Force changes to disk:

```c
// Ensure mapped changes written to file
int msync(void* addr, size_t length, int flags);

// MS_SYNC: Synchronous write (wait for completion)
msync(data, size, MS_SYNC);

// MS_ASYNC: Asynchronous write (return immediately)
msync(data, size, MS_ASYNC);

// MS_INVALIDATE: Invalidate cached pages
msync(data, size, MS_INVALIDATE);
```

### Write-Back

```c
// Changes to MAP_SHARED regions:
// 1. Modified in page cache
// 2. Eventually written by kernel (pdflush/writeback)
// 3. msync() forces immediate write

void modify_file(void* mapped, size_t offset, char* data, size_t len) {
    memcpy(mapped + offset, data, len);

    // Ensure durability
    msync(mapped + offset, len, MS_SYNC);
}
```

## Memory Mapping Use Cases

### 1. Large File Processing

```c
// Process large log file
void process_log(const char* filename) {
    int fd = open(filename, O_RDONLY);
    struct stat st;
    fstat(fd, &st);

    char* log = mmap(NULL, st.st_size, PROT_READ,
                     MAP_PRIVATE, fd, 0);

    // Process efficiently - only load needed pages
    char* line = log;
    while (line < log + st.st_size) {
        process_line(line);
        line = next_line(line);
    }

    munmap(log, st.st_size);
    close(fd);
}
```

### 2. Shared Memory IPC

```c
// Process A: Create shared mapping
int fd = shm_open("/myshm", O_CREAT | O_RDWR, 0644);
ftruncate(fd, 4096);
void* shared = mmap(NULL, 4096, PROT_READ | PROT_WRITE,
                    MAP_SHARED, fd, 0);

// Process B: Open same mapping
int fd = shm_open("/myshm", O_RDWR, 0);
void* shared = mmap(NULL, 4096, PROT_READ | PROT_WRITE,
                    MAP_SHARED, fd, 0);

// Both processes see same memory!
```

### 3. Memory-Mapped Database

```c
typedef struct {
    char* data;
    size_t size;
    int fd;
} MMapDB;

MMapDB* db_open(const char* path) {
    MMapDB* db = malloc(sizeof(MMapDB));
    db->fd = open(path, O_RDWR);

    struct stat st;
    fstat(db->fd, &st);
    db->size = st.st_size;

    db->data = mmap(NULL, db->size, PROT_READ | PROT_WRITE,
                    MAP_SHARED, db->fd, 0);

    return db;
}

// LMDB, SQLite (with mmap), etc. use this approach
```

### 4. Loading Executables

```c
// exec() uses mmap internally
// Code pages: MAP_PRIVATE | PROT_READ | PROT_EXEC
// Data pages: MAP_PRIVATE | PROT_READ | PROT_WRITE

// Shared libraries mapped MAP_PRIVATE
// Copy-on-write for efficient forking
```

## mmap vs read/write

### Advantages of mmap

```
1. No double buffering (kernel → user buffer)
2. Random access without seeking
3. Automatic page management
4. Shared mapping for IPC
5. Lazy loading of large files
```

### Disadvantages of mmap

```
1. Page faults have overhead
2. No fine-grained control over I/O
3. Can't easily handle I/O errors
4. TLB pressure for large mappings
5. Not suitable for all access patterns
```

### When to Use Each

```
Use mmap when:
- Random access pattern
- Multiple processes sharing
- Large files with sparse access
- Memory-like interface needed

Use read/write when:
- Sequential access
- Need to detect I/O errors
- Small files
- Need precise I/O control
```

## Advanced Topics

### madvise Hints

```c
// Give kernel hints about usage pattern
int madvise(void* addr, size_t length, int advice);

madvise(addr, len, MADV_SEQUENTIAL); // Sequential access
madvise(addr, len, MADV_RANDOM);     // Random access
madvise(addr, len, MADV_WILLNEED);   // Will need soon (prefetch)
madvise(addr, len, MADV_DONTNEED);   // Won't need (can discard)
```

### Huge Pages

```c
// Use huge pages for large mappings
void* huge = mmap(NULL, size, PROT_READ | PROT_WRITE,
                  MAP_PRIVATE | MAP_ANONYMOUS | MAP_HUGETLB,
                  -1, 0);

// 2MB or 1GB pages
// Fewer TLB entries needed
// Better for large datasets
```

## Summary

Memory-mapped files provide efficient file access:
- Map file contents into virtual address space
- Access file data like memory arrays
- Lazy loading via page faults
- MAP_SHARED for IPC and file updates
- MAP_PRIVATE for copy-on-write
- msync ensures durability
- Efficient for large files with random access
- Used by databases, executables, shared libraries
