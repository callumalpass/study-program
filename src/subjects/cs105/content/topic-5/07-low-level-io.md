# Low-Level I/O

Beyond stdio buffered I/O, POSIX provides low-level file operations using file descriptors. These functions offer more control and are used in systems programming.

## File Descriptors

### Standard Descriptors

```c
#include <unistd.h>

// Predefined file descriptors
STDIN_FILENO   // 0 - standard input
STDOUT_FILENO  // 1 - standard output
STDERR_FILENO  // 2 - standard error
```

### Open and Close

```c
#include <fcntl.h>
#include <unistd.h>

// Open file
int fd = open("file.txt", O_RDONLY);
if (fd == -1) {
    perror("open failed");
    return -1;
}

// Close file
close(fd);
```

### Open Flags

```c
O_RDONLY    // Read only
O_WRONLY    // Write only
O_RDWR      // Read and write

// Combined with | :
O_CREAT     // Create if doesn't exist
O_TRUNC     // Truncate existing file
O_APPEND    // Append mode
O_EXCL      // Fail if exists (with O_CREAT)

// Example: create new file for writing
int fd = open("output.txt", O_WRONLY | O_CREAT | O_TRUNC, 0644);
```

### File Permissions

```c
// Third argument is mode (permissions) when creating
int fd = open("file.txt", O_WRONLY | O_CREAT, 0644);

// Permission bits:
// 0644 = rw-r--r--
// 0755 = rwxr-xr-x
// 0600 = rw-------
```

## Read and Write

### Basic Operations

```c
#include <unistd.h>

char buffer[1024];
ssize_t n;

// Read up to 1024 bytes
n = read(fd, buffer, sizeof(buffer));
if (n == -1) {
    perror("read failed");
} else if (n == 0) {
    printf("End of file\n");
} else {
    printf("Read %zd bytes\n", n);
}

// Write data
const char* data = "Hello, World!\n";
n = write(fd, data, strlen(data));
if (n == -1) {
    perror("write failed");
}
```

### Handling Partial Reads/Writes

```c
// read() may return fewer bytes than requested
ssize_t read_all(int fd, void* buf, size_t count) {
    size_t total = 0;
    char* ptr = buf;

    while (total < count) {
        ssize_t n = read(fd, ptr + total, count - total);
        if (n == -1) {
            if (errno == EINTR) continue;  // Interrupted
            return -1;  // Error
        }
        if (n == 0) break;  // EOF
        total += n;
    }
    return total;
}

// write() may write fewer bytes than requested
ssize_t write_all(int fd, const void* buf, size_t count) {
    size_t total = 0;
    const char* ptr = buf;

    while (total < count) {
        ssize_t n = write(fd, ptr + total, count - total);
        if (n == -1) {
            if (errno == EINTR) continue;
            return -1;
        }
        total += n;
    }
    return total;
}
```

## Seeking

### lseek

```c
#include <unistd.h>

// Seek to position
off_t pos = lseek(fd, 100, SEEK_SET);  // Offset 100 from start
lseek(fd, -50, SEEK_CUR);              // Back 50 from current
lseek(fd, 0, SEEK_END);                // Go to end

// Get current position
off_t current = lseek(fd, 0, SEEK_CUR);

// Get file size
off_t size = lseek(fd, 0, SEEK_END);
lseek(fd, 0, SEEK_SET);  // Return to start
```

## Duplicating File Descriptors

### dup and dup2

```c
// Duplicate descriptor
int fd2 = dup(fd);  // fd2 refers to same file

// Duplicate to specific number
dup2(fd, STDOUT_FILENO);  // Redirect stdout to fd
```

### Redirecting Output

```c
void redirect_stdout(const char* filename) {
    int fd = open(filename, O_WRONLY | O_CREAT | O_TRUNC, 0644);
    if (fd == -1) return;

    dup2(fd, STDOUT_FILENO);  // stdout -> file
    close(fd);  // Original fd no longer needed

    // Now printf goes to file
    printf("This goes to the file\n");
}
```

## Comparing stdio and POSIX

### Performance

```c
// Buffered I/O (stdio) - fewer system calls
FILE* f = fopen("file.txt", "r");
char c;
while ((c = fgetc(f)) != EOF) {
    // Each fgetc reads from buffer, not disk
    process(c);
}

// Unbuffered I/O (POSIX) - more system calls
int fd = open("file.txt", O_RDONLY);
char c;
while (read(fd, &c, 1) == 1) {
    // Each read is a system call!
    process(c);
}

// Better: read in chunks
char buf[4096];
ssize_t n;
while ((n = read(fd, buf, sizeof(buf))) > 0) {
    for (ssize_t i = 0; i < n; i++) {
        process(buf[i]);
    }
}
```

### Converting Between

```c
// FILE* to fd
FILE* f = fopen("file.txt", "r");
int fd = fileno(f);

// fd to FILE*
int fd = open("file.txt", O_RDONLY);
FILE* f = fdopen(fd, "r");
// Note: fclose(f) will also close fd
```

## Advanced Operations

### File Statistics

```c
#include <sys/stat.h>

struct stat st;
if (fstat(fd, &st) == 0) {
    printf("Size: %lld\n", (long long)st.st_size);
    printf("Mode: %o\n", st.st_mode & 0777);
    printf("Block size: %ld\n", st.st_blksize);
}
```

### Truncating Files

```c
// Set file size
ftruncate(fd, 1000);  // Truncate or extend to 1000 bytes
```

### Syncing to Disk

```c
fsync(fd);       // Flush to disk
fdatasync(fd);   // Flush data only (not metadata)
```

## Memory-Mapped I/O

### mmap

```c
#include <sys/mman.h>

// Map file into memory
void* ptr = mmap(NULL, size, PROT_READ | PROT_WRITE,
                 MAP_SHARED, fd, 0);
if (ptr == MAP_FAILED) {
    perror("mmap failed");
    return -1;
}

// Access file as memory
char* data = ptr;
data[0] = 'H';  // Writes to file

// Unmap when done
munmap(ptr, size);
```

### Benefits of mmap

- No explicit read/write calls
- Kernel handles caching
- Efficient for random access
- Shared memory between processes

## Error Handling

### errno

```c
#include <errno.h>
#include <string.h>

int fd = open("nonexistent.txt", O_RDONLY);
if (fd == -1) {
    printf("Error code: %d\n", errno);
    printf("Error message: %s\n", strerror(errno));
    perror("open");  // Prints "open: No such file or directory"
}
```

### Common Errors

```c
ENOENT  // No such file
EACCES  // Permission denied
EEXIST  // File exists (with O_EXCL)
EINTR   // Interrupted system call
EAGAIN  // Try again (non-blocking I/O)
ENOSPC  // No space left on device
```

## Summary

Low-level I/O provides:
- Direct system call access
- File descriptor manipulation
- Fine-grained control
- Memory mapping

Use when you need:
- Non-blocking I/O
- Descriptor redirection
- Memory-mapped files
- Maximum control

Use stdio for convenience; POSIX for control.
