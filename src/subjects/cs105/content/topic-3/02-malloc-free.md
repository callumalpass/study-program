---
id: cs105-t3-malloc-free
title: "malloc and free"
order: 2
---

# malloc and free

The `malloc` and `free` functions are the foundation of dynamic memory management in C. They give you explicit control over heap allocation but require careful handling to avoid memory bugs.

## malloc: Memory Allocation

`malloc` allocates a block of memory and returns a pointer to it:

```c
#include <stdlib.h>

void *malloc(size_t size);
```

- **size**: Number of bytes to allocate
- **Returns**: Pointer to allocated memory, or NULL if allocation fails

```c
int *ptr = malloc(sizeof(int));     // Allocate space for one int
if (ptr == NULL) {
    printf("Allocation failed!\n");
    return -1;
}
*ptr = 42;
```

## Always Check for NULL

`malloc` returns `NULL` if it can't allocate memory:

```c
int *arr = malloc(1000000000 * sizeof(int));  // Huge request

if (arr == NULL) {
    fprintf(stderr, "Out of memory!\n");
    exit(1);
}

// Safe to use arr here
```

Never assume allocation succeeds. In real programs, handle failures gracefully.

## Allocating Arrays

For arrays, multiply element count by element size:

```c
int n = 100;
int *arr = malloc(n * sizeof(int));

if (arr != NULL) {
    for (int i = 0; i < n; i++) {
        arr[i] = i * 2;  // Use like a regular array
    }
}
```

**Best practice**: Use `sizeof` with the variable, not the type:

```c
int *ptr = malloc(sizeof(*ptr));      // Preferred: works if type changes
int *ptr = malloc(sizeof(int));       // Also works, but less flexible
```

## free: Releasing Memory

`free` returns allocated memory to the system:

```c
void free(void *ptr);
```

```c
int *data = malloc(100 * sizeof(int));
// ... use data ...
free(data);  // Return memory to system
```

**Rules for free:**
1. Only free memory allocated by malloc/calloc/realloc
2. Only free each block once
3. Don't use memory after freeing it

## Common malloc/free Patterns

**Basic allocation cycle:**
```c
// 1. Allocate
int *arr = malloc(10 * sizeof(int));

// 2. Check
if (arr == NULL) {
    return -1;
}

// 3. Use
for (int i = 0; i < 10; i++) {
    arr[i] = i;
}

// 4. Free
free(arr);
arr = NULL;  // Optional but recommended
```

**Allocating structures:**
```c
typedef struct {
    char name[50];
    int age;
} Person;

Person *p = malloc(sizeof(Person));
if (p) {
    strcpy(p->name, "Alice");
    p->age = 30;
    // ...
    free(p);
}
```

## The void* Type

`malloc` returns `void*`, which can be assigned to any pointer type:

```c
int *ip = malloc(sizeof(int));      // No cast needed in C
char *cp = malloc(100);
double *dp = malloc(sizeof(double));
```

In C, explicit casting is optional (but required in C++):

```c
int *ptr = (int*)malloc(sizeof(int));  // Explicit cast (C++ style)
int *ptr = malloc(sizeof(int));         // No cast (preferred in C)
```

## Memory Initialization

`malloc` does NOT initialize memory—it contains garbage:

```c
int *arr = malloc(5 * sizeof(int));
// arr[0], arr[1], etc. contain GARBAGE!

// Must initialize before reading
for (int i = 0; i < 5; i++) {
    arr[i] = 0;
}
```

Use `calloc` for zero-initialized memory (covered next section).

## Freeing NULL

Freeing NULL is safe—it does nothing:

```c
int *ptr = NULL;
free(ptr);    // Safe: no operation
free(NULL);   // Also safe
```

This enables defensive patterns:

```c
void cleanup(int *ptr) {
    free(ptr);  // Safe even if ptr is NULL
}
```

## Setting Pointers to NULL After Free

Prevents use-after-free bugs:

```c
int *data = malloc(100);
// ... use data ...
free(data);
data = NULL;  // Now safe

// Later...
if (data != NULL) {
    // Won't execute - prevents use-after-free
}
```

## Allocating Multi-dimensional Arrays

**Method 1: Array of pointers**
```c
int rows = 3, cols = 4;

int **matrix = malloc(rows * sizeof(int*));
for (int i = 0; i < rows; i++) {
    matrix[i] = malloc(cols * sizeof(int));
}

// Use: matrix[i][j]

// Free in reverse order:
for (int i = 0; i < rows; i++) {
    free(matrix[i]);
}
free(matrix);
```

**Method 2: Single contiguous block**
```c
int rows = 3, cols = 4;
int *matrix = malloc(rows * cols * sizeof(int));

// Use: matrix[i * cols + j]

free(matrix);  // Single free
```

## Error Handling Patterns

**Early return:**
```c
int *processData(int size) {
    int *data = malloc(size * sizeof(int));
    if (data == NULL) {
        return NULL;
    }
    // Process...
    return data;
}
```

**Goto cleanup:**
```c
int complexFunction() {
    int *a = malloc(100);
    if (!a) goto cleanup;

    int *b = malloc(200);
    if (!b) goto cleanup_a;

    // Use a and b...

    free(b);
cleanup_a:
    free(a);
cleanup:
    return -1;
}
```

## Key Takeaways

- `malloc(size)` allocates size bytes on the heap
- Always check if malloc returns NULL
- `free(ptr)` releases allocated memory
- Only free memory once; only free what malloc/calloc/realloc allocated
- malloc doesn't initialize memory (contains garbage)
- Set pointers to NULL after freeing
- Use `sizeof(*ptr)` for safer, more maintainable code

Proper malloc/free usage is fundamental to C programming. Next, we'll explore calloc and realloc for more allocation options.
