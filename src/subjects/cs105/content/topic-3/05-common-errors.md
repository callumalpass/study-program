---
id: cs105-t3-errors
title: "Common Memory Errors"
order: 5
---

# Common Memory Management Errors

Memory errors are among the most challenging bugs to diagnose and fix. Understanding common patterns helps you avoid them and recognize them when they occur.

## Memory Leaks

Memory leaks occur when allocated memory is never freed:

### Lost Pointer

```c
void leak1() {
    int *ptr = malloc(100);
    ptr = malloc(200);  // Original 100 bytes leaked!
    free(ptr);
}
```

**Fix**: Free before reassigning:
```c
void noLeak() {
    int *ptr = malloc(100);
    free(ptr);
    ptr = malloc(200);
    free(ptr);
}
```

### Early Return

```c
int leak2(int x) {
    int *data = malloc(1000);

    if (x < 0) {
        return -1;  // Memory leaked!
    }

    // ... use data ...
    free(data);
    return 0;
}
```

**Fix**: Free before all returns:
```c
int noLeak2(int x) {
    int *data = malloc(1000);

    if (x < 0) {
        free(data);
        return -1;
    }

    // ... use data ...
    free(data);
    return 0;
}
```

### Exception-Like Flow

```c
int processFile(const char *name) {
    FILE *f = fopen(name, "r");
    if (!f) return -1;

    char *buffer = malloc(1000);
    if (!buffer) {
        // f is leaked!
        return -1;
    }

    // ...
}
```

**Fix**: Use goto for cleanup:
```c
int processFile(const char *name) {
    FILE *f = NULL;
    char *buffer = NULL;
    int result = -1;

    f = fopen(name, "r");
    if (!f) goto cleanup;

    buffer = malloc(1000);
    if (!buffer) goto cleanup;

    // ... process ...
    result = 0;

cleanup:
    free(buffer);
    if (f) fclose(f);
    return result;
}
```

## Use-After-Free

Accessing memory after it's been freed:

```c
int *ptr = malloc(sizeof(int));
*ptr = 42;
free(ptr);

// WRONG: ptr still holds the address but memory is invalid
printf("%d\n", *ptr);  // Undefined behavior!
*ptr = 100;            // Undefined behavior!
```

**Fix**: Nullify after free:
```c
free(ptr);
ptr = NULL;

// Now this is safe (though still wrong logically):
if (ptr != NULL) {
    printf("%d\n", *ptr);  // Won't execute
}
```

### Returning Freed Memory

```c
int *badFunction() {
    int *arr = malloc(10 * sizeof(int));
    // ... fill arr ...
    free(arr);
    return arr;  // Returns freed pointer!
}
```

## Double Free

Freeing the same memory twice:

```c
int *ptr = malloc(100);
free(ptr);
free(ptr);  // CRASH or heap corruption!
```

**Why it's dangerous**: The heap manager may have reused that memory for another allocation. Double free corrupts heap data structures.

**Fix**: Nullify after free:
```c
free(ptr);
ptr = NULL;
free(ptr);  // Safe: free(NULL) does nothing
```

### Hidden Double Free

```c
void process(int *data) {
    // ... use data ...
    free(data);  // Freed here
}

int main() {
    int *ptr = malloc(100);
    process(ptr);
    free(ptr);  // Double free!
}
```

**Fix**: Clear ownership - document who frees what.

## Buffer Overflow

Writing past allocated bounds:

### Heap Overflow

```c
int *arr = malloc(5 * sizeof(int));
for (int i = 0; i <= 5; i++) {  // Off-by-one: i <= 5 instead of i < 5
    arr[i] = i;  // arr[5] overflows!
}
```

### Stack Overflow

```c
char buffer[10];
strcpy(buffer, "This string is way too long!");  // Overflow!
```

**Fix**: Always check bounds:
```c
char buffer[10];
strncpy(buffer, input, sizeof(buffer) - 1);
buffer[sizeof(buffer) - 1] = '\0';
```

## Uninitialized Memory

Reading before writing:

```c
int *arr = malloc(10 * sizeof(int));
int sum = 0;
for (int i = 0; i < 10; i++) {
    sum += arr[i];  // Reading garbage!
}
```

**Fix**: Use calloc or initialize:
```c
int *arr = calloc(10, sizeof(int));  // Zero-initialized
// OR
int *arr = malloc(10 * sizeof(int));
memset(arr, 0, 10 * sizeof(int));
```

## Invalid Free

Freeing memory not from malloc:

```c
int x = 42;
free(&x);  // WRONG: x is on stack!

char *str = "Hello";
free(str);  // WRONG: string literal is in read-only memory!

int *arr = malloc(100);
free(arr + 5);  // WRONG: must free original pointer!
```

## Memory Corruption Symptoms

Memory bugs often cause symptoms elsewhere:

- **Crash in unrelated code**: Corrupted heap affects other allocations
- **Different behavior in debug/release**: Optimizer changes memory layout
- **Works sometimes, fails randomly**: Depends on heap state
- **Works with small data, fails with large**: Different allocation patterns

## Defensive Patterns

### Always Initialize

```c
int *ptr = NULL;  // Not garbage
int arr[100] = {0};  // All zeros
```

### Check Everything

```c
int *ptr = malloc(size);
if (ptr == NULL) {
    // Handle error
    return -1;
}
```

### Clear Ownership

```c
// Document who owns (and must free) each allocation
typedef struct {
    char *name;  // Owned: caller must free
    int id;
} Record;

// Or use consistent patterns:
Record *create_record(void);  // Returns owned pointer
void destroy_record(Record *r);  // Takes ownership
```

### Use Wrapper Functions

```c
void *safe_malloc(size_t size) {
    void *ptr = malloc(size);
    if (ptr == NULL && size > 0) {
        fprintf(stderr, "Out of memory!\n");
        exit(1);
    }
    return ptr;
}

void safe_free(void **ptr) {
    if (ptr && *ptr) {
        free(*ptr);
        *ptr = NULL;
    }
}
```

## Key Takeaways

- Memory leaks: always pair malloc with free
- Use-after-free: nullify pointers after freeing
- Double free: track ownership, nullify after free
- Buffer overflow: always check array bounds
- Uninitialized reads: use calloc or explicit initialization
- Invalid free: only free malloc/calloc/realloc results

These errors are why C is considered "dangerous" - but understanding them makes you a better programmer who writes more robust code in any language.
