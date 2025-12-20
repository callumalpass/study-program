# Memory Management Best Practices

Writing safe, efficient memory management code requires discipline and good practices. This guide covers patterns and techniques used by professional C programmers.

## Ownership and Responsibility

### Clear Ownership Rules

Every allocated memory block should have exactly one owner responsible for freeing it.

```c
// BAD: Unclear ownership
char* get_greeting(const char* name) {
    char* msg = malloc(100);
    sprintf(msg, "Hello, %s!", name);
    return msg;  // Who frees this?
}

// GOOD: Document ownership
/**
 * Returns a greeting message.
 * Caller is responsible for freeing the returned string.
 */
char* get_greeting(const char* name) {
    char* msg = malloc(100);
    if (!msg) return NULL;
    sprintf(msg, "Hello, %s!", name);
    return msg;
}

// BETTER: Let caller provide buffer
void get_greeting(const char* name, char* buffer, size_t size) {
    snprintf(buffer, size, "Hello, %s!", name);
}
```

### Ownership Transfer

```c
typedef struct {
    char* name;  // Owns this memory
    int id;
} Person;

// Takes ownership of name (doesn't copy)
Person* person_create_take(char* name, int id) {
    Person* p = malloc(sizeof(Person));
    p->name = name;  // Takes ownership
    p->id = id;
    return p;
}

// Copies name (caller keeps ownership)
Person* person_create_copy(const char* name, int id) {
    Person* p = malloc(sizeof(Person));
    p->name = strdup(name);  // Makes copy
    p->id = id;
    return p;
}

void person_destroy(Person* p) {
    free(p->name);  // Free owned memory
    free(p);
}
```

## Defensive Allocation

### Always Check Allocation Results

```c
// BAD: No check
int* arr = malloc(n * sizeof(int));
arr[0] = 42;  // Crashes if malloc failed

// GOOD: Check and handle
int* arr = malloc(n * sizeof(int));
if (!arr) {
    fprintf(stderr, "Out of memory\n");
    return ERROR_NOMEM;
}
arr[0] = 42;
```

### Use Helper Functions

```c
void* safe_malloc(size_t size) {
    void* ptr = malloc(size);
    if (!ptr && size > 0) {
        fprintf(stderr, "Fatal: Out of memory (%zu bytes)\n", size);
        exit(EXIT_FAILURE);
    }
    return ptr;
}

void* safe_realloc(void* ptr, size_t size) {
    void* new_ptr = realloc(ptr, size);
    if (!new_ptr && size > 0) {
        fprintf(stderr, "Fatal: Out of memory (%zu bytes)\n", size);
        exit(EXIT_FAILURE);
    }
    return new_ptr;
}
```

### Check for Overflow

```c
// BAD: Can overflow
void* allocate_array(size_t count, size_t size) {
    return malloc(count * size);  // May wrap around!
}

// GOOD: Check for overflow
void* allocate_array(size_t count, size_t size) {
    if (count > 0 && size > SIZE_MAX / count) {
        return NULL;  // Would overflow
    }
    return malloc(count * size);
}

// BEST: Use calloc (handles overflow)
void* allocate_array(size_t count, size_t size) {
    return calloc(count, size);  // Safely multiplies
}
```

## Cleanup Patterns

### Single Exit Point

```c
int process_file(const char* filename) {
    int result = ERROR_GENERAL;
    FILE* f = NULL;
    char* buffer = NULL;

    f = fopen(filename, "r");
    if (!f) goto cleanup;

    buffer = malloc(BUFFER_SIZE);
    if (!buffer) goto cleanup;

    // Process...

    result = SUCCESS;

cleanup:
    free(buffer);
    if (f) fclose(f);
    return result;
}
```

### Resource Acquisition in Order

```c
// Acquire in order, release in reverse
int init_system() {
    if (init_a() != 0) return -1;
    if (init_b() != 0) { cleanup_a(); return -1; }
    if (init_c() != 0) { cleanup_b(); cleanup_a(); return -1; }
    return 0;
}

void shutdown_system() {
    cleanup_c();
    cleanup_b();
    cleanup_a();
}
```

## Null Pointer Safety

### Set Pointers to NULL After Free

```c
void safe_free(void** ptr) {
    if (ptr && *ptr) {
        free(*ptr);
        *ptr = NULL;
    }
}

// Usage
char* buffer = malloc(100);
// ...
safe_free((void**)&buffer);
// buffer is now NULL, double-free is safe
```

### Check Before Use

```c
typedef struct {
    int* data;
    size_t size;
} Array;

void array_set(Array* a, size_t index, int value) {
    if (!a || !a->data) return;  // Guard
    if (index >= a->size) return;
    a->data[index] = value;
}
```

## Memory Lifecycle Patterns

### Init/Destroy Pattern

```c
typedef struct {
    char* buffer;
    size_t capacity;
    size_t length;
} String;

int string_init(String* s, size_t initial_cap) {
    s->buffer = malloc(initial_cap);
    if (!s->buffer) return -1;
    s->capacity = initial_cap;
    s->length = 0;
    s->buffer[0] = '\0';
    return 0;
}

void string_destroy(String* s) {
    free(s->buffer);
    s->buffer = NULL;
    s->capacity = 0;
    s->length = 0;
}
```

### Create/Destroy Pattern

```c
String* string_create(size_t initial_cap) {
    String* s = malloc(sizeof(String));
    if (!s) return NULL;
    if (string_init(s, initial_cap) != 0) {
        free(s);
        return NULL;
    }
    return s;
}

void string_free(String* s) {
    if (s) {
        string_destroy(s);
        free(s);
    }
}
```

## Avoid Common Mistakes

### Off-by-One in Strings

```c
// BAD: Forgot null terminator
char* duplicate(const char* s) {
    size_t len = strlen(s);
    char* copy = malloc(len);  // BUG: need len+1
    strcpy(copy, s);
    return copy;
}

// GOOD: Account for null terminator
char* duplicate(const char* s) {
    size_t len = strlen(s) + 1;  // Include null
    char* copy = malloc(len);
    if (copy) memcpy(copy, s, len);
    return copy;
}
```

### Realloc Failure

```c
// BAD: Loses original pointer on failure
arr = realloc(arr, new_size);  // If fails, arr is NULL, leak!

// GOOD: Preserve original on failure
void* new_arr = realloc(arr, new_size);
if (!new_arr) {
    // Handle error, arr still valid
    return ERROR;
}
arr = new_arr;
```

### Sizeof Mistakes

```c
// BAD: Sizeof pointer, not array
int* arr = malloc(sizeof(arr) * 10);  // Only 40-80 bytes!

// GOOD: Sizeof dereferenced pointer
int* arr = malloc(sizeof(*arr) * 10);  // Correct: 40 bytes

// GOOD: Sizeof type
int* arr = malloc(sizeof(int) * 10);
```

## Testing and Debugging

### Use Memory Checkers

```bash
# Valgrind
valgrind --leak-check=full ./program

# AddressSanitizer
gcc -fsanitize=address -g program.c
./a.out
```

### Fill Patterns

```c
// Debug allocator: fill with patterns
void* debug_malloc(size_t size) {
    void* ptr = malloc(size);
    if (ptr) memset(ptr, 0xCD, size);  // Uninitialized pattern
    return ptr;
}

void debug_free(void* ptr, size_t size) {
    if (ptr) memset(ptr, 0xDD, size);  // Freed pattern
    free(ptr);
}
```

### Tracking Allocations

```c
#ifdef DEBUG
static size_t total_allocated = 0;
static size_t allocation_count = 0;

void* tracked_malloc(size_t size) {
    void* ptr = malloc(size);
    if (ptr) {
        total_allocated += size;
        allocation_count++;
    }
    return ptr;
}

void print_memory_stats() {
    printf("Allocations: %zu, Total bytes: %zu\n",
           allocation_count, total_allocated);
}
#endif
```

## Summary

Best practices for memory management:

1. **Clear ownership**: One owner per allocation
2. **Always check**: Verify allocation success
3. **Clean up properly**: Free in reverse order
4. **Use patterns**: Init/destroy, create/free
5. **Null after free**: Prevent dangling pointers
6. **Test thoroughly**: Use Valgrind, sanitizers
7. **Document**: State ownership in comments
8. **Be defensive**: Check pointers before use

Following these practices prevents most memory bugs and makes code easier to maintain.
