---
id: cs105-t5-errors
title: "File I/O Error Handling"
order: 3
---

# File I/O Error Handling

Robust programs must handle file operations that can fail. Network drives disconnect, permissions change, disks fill up. Proper error handling prevents crashes and data loss.

## Common Failure Points

1. **fopen fails**: File doesn't exist, no permission, too many open files
2. **Read/write fails**: Disk full, I/O error, file truncated
3. **Seek fails**: Invalid position, file not seekable
4. **Close fails**: Rare but possible (write errors on flush)

## Checking fopen

Always check if `fopen` returns NULL:

```c
FILE *file = fopen("config.txt", "r");
if (file == NULL) {
    perror("Cannot open config.txt");
    return -1;
}
```

### The perror Function

`perror` prints a description of the last error:

```c
FILE *file = fopen("nonexistent.txt", "r");
if (file == NULL) {
    perror("Error");
    // Output: "Error: No such file or directory"
}
```

### errno Variable

The global `errno` contains the error code:

```c
#include <errno.h>
#include <string.h>

FILE *file = fopen("test.txt", "r");
if (file == NULL) {
    printf("Error code: %d\n", errno);
    printf("Error message: %s\n", strerror(errno));
}
```

Common errno values:
- `ENOENT`: No such file or directory
- `EACCES`: Permission denied
- `EEXIST`: File exists (when creating with "x" flag)
- `ENOMEM`: Out of memory
- `ENOSPC`: No space left on device

## Checking Read/Write Operations

### fread/fwrite Return Values

Check the return value against expected count:

```c
int data[100];
size_t count = fread(data, sizeof(int), 100, file);

if (count < 100) {
    if (feof(file)) {
        printf("Reached end of file after %zu items\n", count);
    } else if (ferror(file)) {
        perror("Read error");
    }
}
```

### fgetc and EOF

```c
int ch;
while ((ch = fgetc(file)) != EOF) {
    // Process character
}

if (ferror(file)) {
    perror("Error while reading");
}
```

### fgets and NULL

```c
char line[256];
while (fgets(line, sizeof(line), file) != NULL) {
    // Process line
}

if (!feof(file)) {
    // Didn't reach EOF - must be an error
    perror("Read error");
}
```

## Error Detection Functions

### ferror: Check for Errors

```c
if (ferror(file)) {
    printf("An error occurred\n");
}
```

### feof: Check for End of File

```c
if (feof(file)) {
    printf("Reached end of file\n");
}
```

### clearerr: Reset Error Flags

```c
clearerr(file);  // Clear both error and EOF flags
```

## Checking fclose

`fclose` can fail (e.g., pending write errors):

```c
if (fclose(file) != 0) {
    perror("Error closing file");
    // Data may not be saved!
}
```

## Robust File Operations Pattern

```c
int processFile(const char *filename) {
    FILE *file = fopen(filename, "r");
    if (file == NULL) {
        perror(filename);
        return -1;
    }

    char buffer[1024];
    int result = 0;

    while (fgets(buffer, sizeof(buffer), file) != NULL) {
        // Process buffer
    }

    if (ferror(file)) {
        perror("Error reading");
        result = -1;
    }

    if (fclose(file) != 0) {
        perror("Error closing");
        result = -1;
    }

    return result;
}
```

## Safe Writing Pattern

Ensure data is actually written:

```c
int saveData(const char *filename, const int *data, size_t count) {
    FILE *file = fopen(filename, "wb");
    if (file == NULL) {
        perror(filename);
        return -1;
    }

    size_t written = fwrite(data, sizeof(int), count, file);
    if (written != count) {
        perror("Write error");
        fclose(file);
        return -1;
    }

    // Flush to ensure data reaches disk
    if (fflush(file) != 0) {
        perror("Flush error");
        fclose(file);
        return -1;
    }

    if (fclose(file) != 0) {
        perror("Close error");
        return -1;
    }

    return 0;
}
```

## Atomic File Updates

Prevent data corruption during updates:

```c
int updateFile(const char *filename) {
    char tempname[256];
    snprintf(tempname, sizeof(tempname), "%s.tmp", filename);

    // Write to temporary file
    FILE *temp = fopen(tempname, "wb");
    if (temp == NULL) {
        perror("Cannot create temp file");
        return -1;
    }

    // Write data to temp file...

    if (fclose(temp) != 0) {
        perror("Error closing temp file");
        remove(tempname);
        return -1;
    }

    // Atomic rename
    if (rename(tempname, filename) != 0) {
        perror("Error renaming file");
        remove(tempname);
        return -1;
    }

    return 0;
}
```

## Cleanup on Error

Use goto for cleanup in complex operations:

```c
int complexOperation(const char *input, const char *output) {
    FILE *fin = NULL;
    FILE *fout = NULL;
    char *buffer = NULL;
    int result = -1;

    fin = fopen(input, "rb");
    if (fin == NULL) {
        perror(input);
        goto cleanup;
    }

    fout = fopen(output, "wb");
    if (fout == NULL) {
        perror(output);
        goto cleanup;
    }

    buffer = malloc(4096);
    if (buffer == NULL) {
        perror("malloc");
        goto cleanup;
    }

    // Do work...

    result = 0;  // Success

cleanup:
    free(buffer);
    if (fout) fclose(fout);
    if (fin) fclose(fin);
    return result;
}
```

## Key Takeaways

- Always check `fopen` return value
- Use `perror` for human-readable error messages
- Check return values of `fread`/`fwrite` against expected counts
- Use `ferror` to detect I/O errors
- Use `feof` to detect end of file
- Even `fclose` can fail—check it for important files
- Use temporary files for atomic updates
- Clean up all resources on error paths

Proper error handling is what separates professional code from hobbyist code. It's extra work but prevents data loss and mysterious failures.
