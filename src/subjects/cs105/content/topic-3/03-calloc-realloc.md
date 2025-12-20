---
id: cs105-t3-calloc-realloc
title: "calloc and realloc"
order: 3
---

# calloc and realloc

Beyond `malloc`, C provides `calloc` for zero-initialized allocation and `realloc` for resizing existing allocations. These functions solve common memory management needs.

## calloc: Cleared Allocation

`calloc` allocates memory AND initializes it to zero:

```c
void *calloc(size_t count, size_t size);
```

- **count**: Number of elements
- **size**: Size of each element
- **Returns**: Pointer to zero-initialized memory, or NULL

```c
// Allocate array of 10 integers, all initialized to 0
int *arr = calloc(10, sizeof(int));

if (arr != NULL) {
    // arr[0] through arr[9] are all 0
    printf("%d\n", arr[5]);  // Prints 0
}
```

## malloc vs calloc

```c
// These allocate the same amount of memory:
int *a = malloc(10 * sizeof(int));   // Uninitialized (garbage)
int *b = calloc(10, sizeof(int));    // Initialized to 0

// With malloc, you must initialize manually:
if (a != NULL) {
    for (int i = 0; i < 10; i++) {
        a[i] = 0;
    }
}
// Or use memset:
memset(a, 0, 10 * sizeof(int));
```

**When to use calloc:**
- You need zero-initialized memory
- You're allocating arrays
- You want to avoid uninitialized value bugs

**When to use malloc:**
- You'll immediately overwrite all values anyway
- Performance critical (calloc is slightly slower)
- Allocating non-array data

## calloc for Structures

```c
typedef struct {
    int id;
    char name[50];
    double balance;
} Account;

// All fields initialized to 0/empty
Account *acc = calloc(1, sizeof(Account));
// acc->id = 0, acc->name = "", acc->balance = 0.0
```

## realloc: Resize Allocation

`realloc` changes the size of previously allocated memory:

```c
void *realloc(void *ptr, size_t new_size);
```

- **ptr**: Pointer to existing allocation (or NULL)
- **new_size**: New size in bytes
- **Returns**: Pointer to resized memory, or NULL on failure

```c
int *arr = malloc(5 * sizeof(int));
// arr can hold 5 ints

arr = realloc(arr, 10 * sizeof(int));
// arr can now hold 10 ints
// Original 5 values are preserved
```

## How realloc Works

realloc may:
1. **Extend in place**: If space available after the block
2. **Allocate new block**: Copy data, free old block
3. **Return NULL**: If allocation fails (original unchanged!)

```c
int *arr = malloc(100);
// Fill arr with data...

int *new_arr = realloc(arr, 200);
if (new_arr == NULL) {
    // Allocation failed!
    // arr is still valid and unchanged
    // Handle error...
} else {
    // Success - use new_arr
    // arr may or may not equal new_arr
    arr = new_arr;
}
```

## The realloc Pitfall

**WRONG**: Directly assigning realloc result:
```c
int *arr = malloc(100);
arr = realloc(arr, 200);  // DANGEROUS!
// If realloc fails, arr is NULL and original memory is LEAKED!
```

**CORRECT**: Use temporary pointer:
```c
int *arr = malloc(100);
int *temp = realloc(arr, 200);
if (temp == NULL) {
    // Handle error, arr still valid
    free(arr);
    return -1;
}
arr = temp;  // Safe to reassign
```

## Dynamic Array Growth Pattern

A common pattern for growing arrays:

```c
typedef struct {
    int *data;
    size_t size;      // Current number of elements
    size_t capacity;  // Allocated capacity
} DynamicArray;

int append(DynamicArray *arr, int value) {
    // Check if we need more space
    if (arr->size >= arr->capacity) {
        // Double the capacity
        size_t new_cap = arr->capacity == 0 ? 4 : arr->capacity * 2;
        int *new_data = realloc(arr->data, new_cap * sizeof(int));

        if (new_data == NULL) {
            return -1;  // Allocation failed
        }

        arr->data = new_data;
        arr->capacity = new_cap;
    }

    arr->data[arr->size++] = value;
    return 0;
}
```

## realloc Special Cases

**realloc(NULL, size)** acts like malloc:
```c
int *arr = NULL;
arr = realloc(arr, 10 * sizeof(int));  // Same as malloc
```

**realloc(ptr, 0)** behavior is implementation-defined:
```c
// DON'T DO THIS - undefined in some implementations
arr = realloc(arr, 0);  // May or may not free

// Instead, use free explicitly:
free(arr);
arr = NULL;
```

## Shrinking with realloc

realloc can shrink allocations:

```c
int *arr = malloc(1000 * sizeof(int));
// Only using first 100 elements...

int *smaller = realloc(arr, 100 * sizeof(int));
if (smaller != NULL) {
    arr = smaller;
    // Now only 100 elements allocated
}
```

## Memory Alignment

calloc and malloc return memory aligned for any data type:

```c
// These all work correctly:
int *i = malloc(sizeof(int));
double *d = malloc(sizeof(double));
struct Big *b = malloc(sizeof(struct Big));
```

## Practical Example: Reading Unknown-Size Input

```c
char *readLine(void) {
    size_t capacity = 16;
    size_t length = 0;
    char *buffer = malloc(capacity);

    if (buffer == NULL) return NULL;

    int c;
    while ((c = getchar()) != EOF && c != '\n') {
        if (length + 1 >= capacity) {
            capacity *= 2;
            char *new_buf = realloc(buffer, capacity);
            if (new_buf == NULL) {
                free(buffer);
                return NULL;
            }
            buffer = new_buf;
        }
        buffer[length++] = c;
    }

    buffer[length] = '\0';
    return buffer;  // Caller must free
}
```

## Summary Table

| Function | Initializes? | Use Case |
|----------|-------------|----------|
| malloc | No | General allocation |
| calloc | Yes (to 0) | Arrays, structures needing zero init |
| realloc | Preserves | Resizing existing allocations |

## Key Takeaways

- `calloc(count, size)` allocates and zero-initializes
- calloc is safer for arrays (avoids uninitialized reads)
- `realloc(ptr, new_size)` resizes allocations
- Always use a temp pointer with realloc to handle failure
- realloc(NULL, size) behaves like malloc
- Double capacity when growing arrays for efficiency
- realloc may move data to a new location

These three functions—malloc, calloc, and realloc—cover all dynamic memory allocation needs. Next, we'll explore memory debugging tools.
