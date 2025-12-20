# File Buffering

Understanding buffering is crucial for efficient file I/O. Buffers reduce system calls by accumulating data before reading from or writing to files.

## Buffering Modes

### Three Buffering Types

```c
// Full buffering - buffer fills before I/O
setvbuf(file, buffer, _IOFBF, BUFSIZ);

// Line buffering - flush on newline
setvbuf(file, buffer, _IOLBF, BUFSIZ);

// No buffering - immediate I/O
setvbuf(file, NULL, _IONBF, 0);
```

### Default Behavior

- **stdout**: Line buffered (when connected to terminal)
- **stderr**: Unbuffered
- **Regular files**: Fully buffered

## Setting Buffer Mode

### setvbuf

```c
#include <stdio.h>

FILE* f = fopen("output.txt", "w");

// Full buffering with custom buffer
char buffer[8192];
setvbuf(f, buffer, _IOFBF, sizeof(buffer));

// Or let stdio allocate
setvbuf(f, NULL, _IOFBF, 8192);
```

### setbuf

```c
// Simplified interface
char buf[BUFSIZ];
setbuf(file, buf);     // Full buffering with buf
setbuf(file, NULL);    // Unbuffered
```

## Manual Flushing

### fflush

```c
printf("Processing...");
fflush(stdout);  // Force output before continuing

// Flush all output streams
fflush(NULL);
```

### When to Flush

1. Before reading input after writing
2. Before program termination
3. Before forking
4. For real-time logging

```c
void log_message(const char* msg) {
    FILE* log = fopen("app.log", "a");
    fprintf(log, "[%s] %s\n", timestamp(), msg);
    fflush(log);  // Ensure written immediately
    fclose(log);
}
```

## Buffer Sizes

### Choosing Buffer Size

```c
// System default
#include <stdio.h>
printf("BUFSIZ: %d\n", BUFSIZ);  // Often 8192

// Optimal: match filesystem block size
#include <sys/stat.h>
struct stat st;
stat("file.txt", &st);
printf("Block size: %ld\n", st.st_blksize);
```

### Performance Impact

```c
void copy_file_small_buffer(const char* src, const char* dst) {
    FILE* in = fopen(src, "rb");
    FILE* out = fopen(dst, "wb");

    char buffer[64];  // Small buffer - many system calls
    size_t n;
    while ((n = fread(buffer, 1, sizeof(buffer), in)) > 0) {
        fwrite(buffer, 1, n, out);
    }
    fclose(in);
    fclose(out);
}

void copy_file_large_buffer(const char* src, const char* dst) {
    FILE* in = fopen(src, "rb");
    FILE* out = fopen(dst, "wb");

    char buffer[65536];  // Large buffer - fewer system calls
    size_t n;
    while ((n = fread(buffer, 1, sizeof(buffer), in)) > 0) {
        fwrite(buffer, 1, n, out);
    }
    fclose(in);
    fclose(out);
}
```

## Line Buffering

### Interactive Output

```c
// For interactive programs, line buffering is appropriate
FILE* output = fopen("console.log", "w");
setvbuf(output, NULL, _IOLBF, 0);

// Each newline triggers flush
fprintf(output, "Step 1 complete\n");  // Flushed
fprintf(output, "Step 2 complete\n");  // Flushed
```

### User Feedback

```c
// Show progress without excessive flushing
for (int i = 0; i < 100; i++) {
    process_item(i);
    printf("Progress: %d%%\r", i + 1);
    fflush(stdout);  // Show progress immediately
}
printf("\nDone!\n");
```

## Unbuffered I/O

### When to Use

- Real-time logging
- Error messages
- Debugging output
- When data must be written immediately

```c
// Make stdout unbuffered
setvbuf(stdout, NULL, _IONBF, 0);

// Now every printf writes immediately
printf("Error: ");  // Written now
printf("something failed\n");  // Written now
```

### stderr Is Unbuffered

```c
// Error messages appear immediately
fprintf(stderr, "Error: file not found\n");
// No flush needed - stderr is unbuffered by default
```

## Mixed Read/Write

### Switching Directions

```c
FILE* f = fopen("data.txt", "r+");

// Read some data
char buffer[100];
fgets(buffer, sizeof(buffer), f);

// Before writing after reading: flush or seek
fseek(f, 0, SEEK_CUR);  // Or fflush(f);

// Now write
fputs("new data", f);

// Before reading after writing
fflush(f);  // Or seek
```

## Performance Tips

### Batch Operations

```c
// BAD: Many small writes
for (int i = 0; i < 1000; i++) {
    fprintf(f, "%d\n", data[i]);
    fflush(f);  // Don't flush in loop!
}

// GOOD: Let buffering work
for (int i = 0; i < 1000; i++) {
    fprintf(f, "%d\n", data[i]);
}
fflush(f);  // Flush once at end
```

### Large Transfers

```c
// Use large buffers for bulk data
#define COPY_BUFFER_SIZE (1024 * 1024)  // 1 MB

void fast_copy(FILE* src, FILE* dst) {
    char* buffer = malloc(COPY_BUFFER_SIZE);
    size_t n;

    while ((n = fread(buffer, 1, COPY_BUFFER_SIZE, src)) > 0) {
        fwrite(buffer, 1, n, dst);
    }

    free(buffer);
}
```

## Buffer Ownership

### Stack Buffer

```c
void process_file(const char* path) {
    FILE* f = fopen(path, "w");
    char buffer[8192];  // Stack allocated

    setvbuf(f, buffer, _IOFBF, sizeof(buffer));
    // ...
    fclose(f);  // Must close before function returns!
}  // buffer goes out of scope here
```

### Heap Buffer

```c
FILE* open_buffered_file(const char* path) {
    FILE* f = fopen(path, "w");
    char* buffer = malloc(65536);

    setvbuf(f, buffer, _IOFBF, 65536);
    // Caller responsible for closing and freeing
    return f;
}
```

## Summary

Buffering affects I/O performance and behavior:
- Full buffering for files
- Line buffering for interactive output
- No buffering for immediate output
- Use fflush() when needed
- Choose appropriate buffer sizes
- Be careful with mixed read/write operations
