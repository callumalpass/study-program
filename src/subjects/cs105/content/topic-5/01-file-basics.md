---
id: cs105-t5-basics
title: "File I/O Basics"
order: 1
---

# File I/O Basics

File Input/Output enables programs to persist data beyond program execution. C provides powerful, low-level file operations through the standard library's `stdio.h`.

## Opening Files

Use `fopen` to open a file:

```c
#include <stdio.h>

FILE *fopen(const char *filename, const char *mode);
```

```c
FILE *file = fopen("data.txt", "r");
if (file == NULL) {
    printf("Error opening file!\n");
    return 1;
}
// Use file...
fclose(file);
```

**Always check if fopen succeeds!** It returns `NULL` on failure.

## File Modes

| Mode | Description |
|------|-------------|
| `"r"` | Read (file must exist) |
| `"w"` | Write (creates or truncates) |
| `"a"` | Append (creates if needed) |
| `"r+"` | Read and write (file must exist) |
| `"w+"` | Read and write (creates or truncates) |
| `"a+"` | Read and append (creates if needed) |

Add `b` for binary mode: `"rb"`, `"wb"`, `"ab"`, etc.

## Closing Files

Always close files when done:

```c
fclose(file);
```

Why closing matters:
- Flushes buffered data to disk
- Releases system resources
- Prevents data corruption

## The FILE Pointer

`FILE *` is an opaque pointer to a file structure that tracks:
- Current position in file
- Buffering state
- Error and end-of-file flags
- Read/write mode

## Standard Streams

C provides three pre-opened streams:

```c
stdin   // Standard input (keyboard)
stdout  // Standard output (screen)
stderr  // Standard error (screen, unbuffered)
```

These are `FILE *` pointers you can use with file functions:

```c
fprintf(stdout, "Hello\n");  // Same as printf
fprintf(stderr, "Error!\n"); // Error output
```

## Reading Characters: fgetc

Read one character at a time:

```c
int fgetc(FILE *stream);  // Returns int (for EOF)
```

```c
FILE *file = fopen("input.txt", "r");
if (file) {
    int ch;
    while ((ch = fgetc(file)) != EOF) {
        putchar(ch);
    }
    fclose(file);
}
```

`fgetc` returns `int` to distinguish `EOF` (-1) from valid character 255.

## Writing Characters: fputc

Write one character:

```c
int fputc(int ch, FILE *stream);
```

```c
FILE *file = fopen("output.txt", "w");
if (file) {
    fputc('H', file);
    fputc('i', file);
    fputc('\n', file);
    fclose(file);
}
```

## Reading Lines: fgets

Read a line (up to newline or limit):

```c
char *fgets(char *str, int n, FILE *stream);
```

```c
char buffer[100];
FILE *file = fopen("data.txt", "r");

if (file) {
    while (fgets(buffer, sizeof(buffer), file) != NULL) {
        printf("%s", buffer);  // buffer includes '\n'
    }
    fclose(file);
}
```

**Important**: `fgets` includes the newline in the buffer if there's room.

### Removing Trailing Newline

```c
char line[100];
fgets(line, sizeof(line), file);

// Remove newline
size_t len = strlen(line);
if (len > 0 && line[len-1] == '\n') {
    line[len-1] = '\0';
}
```

## Writing Strings: fputs

Write a string (without automatic newline):

```c
int fputs(const char *str, FILE *stream);
```

```c
FILE *file = fopen("output.txt", "w");
if (file) {
    fputs("Line 1\n", file);
    fputs("Line 2\n", file);
    fclose(file);
}
```

## Formatted I/O: fprintf and fscanf

Like `printf` and `scanf`, but for files:

```c
fprintf(file, "Name: %s, Age: %d\n", name, age);

fscanf(file, "%s %d", name, &age);
```

### Writing Formatted Data

```c
FILE *file = fopen("students.txt", "w");
if (file) {
    fprintf(file, "Alice 3.8\n");
    fprintf(file, "Bob 3.5\n");
    fprintf(file, "Charlie 3.9\n");
    fclose(file);
}
```

### Reading Formatted Data

```c
FILE *file = fopen("students.txt", "r");
if (file) {
    char name[50];
    float gpa;

    while (fscanf(file, "%s %f", name, &gpa) == 2) {
        printf("%s: %.1f\n", name, gpa);
    }
    fclose(file);
}
```

## Error Checking Pattern

```c
FILE *file = fopen("data.txt", "r");
if (file == NULL) {
    perror("Error opening file");
    return 1;
}

// Process file...

if (ferror(file)) {
    perror("Error reading file");
}

fclose(file);
```

`perror` prints a description of the last error.

## Complete Example: Copy a File

```c
#include <stdio.h>

int main() {
    FILE *src = fopen("source.txt", "r");
    if (src == NULL) {
        perror("Cannot open source");
        return 1;
    }

    FILE *dst = fopen("dest.txt", "w");
    if (dst == NULL) {
        perror("Cannot open destination");
        fclose(src);
        return 1;
    }

    int ch;
    while ((ch = fgetc(src)) != EOF) {
        fputc(ch, dst);
    }

    fclose(src);
    fclose(dst);

    printf("File copied successfully\n");
    return 0;
}
```

## Key Takeaways

- `fopen` opens files; always check for NULL
- Mode strings control read/write/append behavior
- Always `fclose` to flush buffers and release resources
- `fgetc` returns int to handle EOF properly
- `fgets` is safer than gets (deprecated)
- `fprintf`/`fscanf` provide formatted file I/O
- Check errors with `ferror` and `perror`

File I/O is essential for creating useful programs. Next, we'll explore binary file operations.
