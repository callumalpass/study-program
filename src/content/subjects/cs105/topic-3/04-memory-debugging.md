# Memory Debugging Tools

Memory bugs are notoriously difficult to find. They often cause symptoms far from the actual bug, or work fine during testing but crash in production. Fortunately, powerful tools exist to detect these issues.

## Common Memory Bugs

Before exploring tools, let's review what we're detecting:

1. **Memory leaks**: Allocated memory never freed
2. **Use-after-free**: Accessing freed memory
3. **Double free**: Freeing the same memory twice
4. **Buffer overflow**: Writing past array bounds
5. **Uninitialized reads**: Reading before writing
6. **Invalid free**: Freeing non-heap memory

## Valgrind

Valgrind is the gold standard for memory debugging on Linux/macOS:

```bash
# Compile with debug info
gcc -g -o myprogram myprogram.c

# Run under Valgrind
valgrind --leak-check=full ./myprogram
```

### Detecting Memory Leaks

```c
// leak.c
#include <stdlib.h>

int main() {
    int *ptr = malloc(100 * sizeof(int));
    // Forgot to free!
    return 0;
}
```

Valgrind output:
```
==1234== HEAP SUMMARY:
==1234==     in use at exit: 400 bytes in 1 blocks
==1234==   total heap usage: 1 allocs, 0 frees, 400 bytes allocated
==1234==
==1234== 400 bytes in 1 blocks are definitely lost
==1234==    at 0x4C2AB80: malloc (in /usr/lib/valgrind/...)
==1234==    by 0x40052E: main (leak.c:5)
```

### Detecting Invalid Access

```c
// overflow.c
int main() {
    int *arr = malloc(5 * sizeof(int));
    arr[10] = 42;  // Buffer overflow!
    free(arr);
    return 0;
}
```

Valgrind catches it:
```
==1234== Invalid write of size 4
==1234==    at 0x400537: main (overflow.c:4)
==1234==  Address 0x51fc068 is 20 bytes after a block of size 20 alloc'd
```

### Detecting Use-After-Free

```c
// use_after_free.c
int main() {
    int *ptr = malloc(sizeof(int));
    *ptr = 42;
    free(ptr);
    printf("%d\n", *ptr);  // Use after free!
    return 0;
}
```

```
==1234== Invalid read of size 4
==1234==    at 0x400547: main (use_after_free.c:6)
==1234==  Address 0x51fc040 is 0 bytes inside a block of size 4 free'd
==1234==    at 0x4C2BDEC: free (in /usr/lib/valgrind/...)
==1234==    by 0x40053E: main (use_after_free.c:5)
```

## AddressSanitizer (ASan)

ASan is a faster alternative built into GCC and Clang:

```bash
# Compile with ASan
gcc -fsanitize=address -g -o myprogram myprogram.c

# Run normally - ASan is embedded in the program
./myprogram
```

ASan detects:
- Buffer overflows (heap, stack, global)
- Use-after-free
- Use-after-return
- Double free
- Memory leaks (with `-fsanitize=leak`)

### ASan Output Example

```c
int main() {
    int *arr = malloc(10 * sizeof(int));
    arr[10] = 5;  // Overflow
    return 0;
}
```

```
=================================================================
==1234==ERROR: AddressSanitizer: heap-buffer-overflow
WRITE of size 4 at 0x60200000001c thread T0
    #0 0x4005a7 in main test.c:3
    #1 0x7f123456 in __libc_start_main
```

## Valgrind vs ASan

| Aspect | Valgrind | ASan |
|--------|----------|------|
| Speed | 10-50x slower | 2x slower |
| Detection | More comprehensive | Faster detection |
| Setup | No recompilation | Requires recompile |
| Platform | Linux, macOS | GCC, Clang |

**Recommendation**: Use ASan during development, Valgrind for thorough testing.

## Manual Debugging Techniques

When tools aren't available, use these techniques:

### Wrapper Functions

```c
#include <stdio.h>
#include <stdlib.h>

void *debug_malloc(size_t size, const char *file, int line) {
    void *ptr = malloc(size);
    printf("MALLOC: %zu bytes at %p (%s:%d)\n", size, ptr, file, line);
    return ptr;
}

void debug_free(void *ptr, const char *file, int line) {
    printf("FREE: %p (%s:%d)\n", ptr, file, line);
    free(ptr);
}

#define malloc(size) debug_malloc(size, __FILE__, __LINE__)
#define free(ptr) debug_free(ptr, __FILE__, __LINE__)
```

### Canary Values

Detect buffer overflows with sentinel values:

```c
#define CANARY 0xDEADBEEF

typedef struct {
    unsigned int canary_start;
    int data[100];
    unsigned int canary_end;
} ProtectedArray;

void check_array(ProtectedArray *arr) {
    if (arr->canary_start != CANARY || arr->canary_end != CANARY) {
        fprintf(stderr, "Buffer overflow detected!\n");
        abort();
    }
}
```

### Poison Freed Memory

Fill freed memory with recognizable pattern:

```c
void safe_free(void **ptr, size_t size) {
    if (*ptr != NULL) {
        memset(*ptr, 0xDD, size);  // Poison with 0xDD
        free(*ptr);
        *ptr = NULL;
    }
}
```

If you see `0xDDDDDDDD` in debugger, you know it's freed memory.

## Best Practices

1. **Run tests under Valgrind/ASan regularly**
2. **Fix memory errors immediately** - they compound
3. **Use debug builds** with `-g` flag
4. **Test with different input sizes** to trigger edge cases
5. **Check CI/CD pipelines** can run memory checks

## Common Valgrind Flags

```bash
# Full leak check with origins
valgrind --leak-check=full --track-origins=yes ./program

# Generate suppressions for library issues
valgrind --gen-suppressions=all ./program

# Check child processes too
valgrind --trace-children=yes ./program
```

## Key Takeaways

- Use Valgrind or ASan - don't debug memory issues manually
- Compile with `-g` for meaningful error messages
- Fix ALL memory errors, even "harmless" ones
- ASan is faster for development; Valgrind is more thorough
- Memory bugs may not crash immediately - tools catch silent corruption
- Integrate memory checking into your test workflow

Memory debugging tools transform mysterious crashes into clear error messages with line numbers. They're essential for professional C development.
