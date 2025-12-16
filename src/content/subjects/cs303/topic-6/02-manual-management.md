# Manual Memory Management

Manual memory management places the responsibility for allocating and deallocating memory directly in the hands of the programmer. While this approach offers maximum control and performance, it also introduces significant complexity and potential for errors. Understanding manual memory management is crucial for systems programming and provides insight into what automatic memory management systems must handle.

## The malloc/free Model

The C standard library provides the classic manual memory management interface:

```c
void* malloc(size_t size);    // Allocate size bytes
void* calloc(size_t n, size_t size);  // Allocate and zero-initialize
void* realloc(void* ptr, size_t size);  // Resize allocation
void free(void* ptr);          // Deallocate memory
```

Basic usage:
```c
// Allocate single integer
int* num = (int*)malloc(sizeof(int));
*num = 42;
free(num);

// Allocate array
int* arr = (int*)malloc(100 * sizeof(int));
for (int i = 0; i < 100; i++) {
    arr[i] = i;
}
free(arr);

// Allocate structure
typedef struct {
    int id;
    char name[50];
} Person;

Person* p = (Person*)malloc(sizeof(Person));
p->id = 1;
strcpy(p->name, "Alice");
free(p);
```

The discipline is simple: every `malloc` must have a corresponding `free`. However, determining when to free is often complex in real programs.

## Common Manual Memory Errors

Manual management is error-prone. Understanding common mistakes is essential:

**Memory Leaks**: Forgetting to free allocated memory. The memory remains allocated but is no longer accessible.

```c
void leak_example() {
    int* data = malloc(1000 * sizeof(int));
    // use data
    // Forgot to free(data)!
}  // data pointer lost, memory leaked

// Called 1000 times leaks 4MB!
```

Memory leaks accumulate over time, eventually exhausting available memory. Long-running programs like servers must be leak-free.

**Double Free**: Freeing the same memory twice causes corruption or crashes.

```c
int* ptr = malloc(sizeof(int));
free(ptr);
free(ptr);  // ERROR: double free!
```

The second `free` corrupts the allocator's internal data structures, often causing crashes later in seemingly unrelated code.

**Use After Free**: Accessing memory after it's been freed.

```c
int* ptr = malloc(sizeof(int));
*ptr = 42;
free(ptr);
int x = *ptr;  // ERROR: use after free!
```

The freed memory might be reallocated for something else, causing subtle data corruption. Or it might cause an immediate crash. Both are bad.

**Dangling Pointers**: Multiple pointers to same memory, one frees it.

```c
int* ptr1 = malloc(sizeof(int));
int* ptr2 = ptr1;  // Both point to same memory
free(ptr1);
*ptr2 = 42;  // ERROR: use after free via dangling pointer!
```

Tracking all aliases is difficult in complex programs.

**Invalid Free**: Freeing memory not allocated with malloc/calloc.

```c
int stack_var = 42;
free(&stack_var);  // ERROR: freeing stack memory!

int* ptr = malloc(100 * sizeof(int));
free(ptr + 10);  // ERROR: freeing middle of allocation!
```

Only pointers returned by `malloc`/`calloc`/`realloc` can be freed.

## Ownership and Responsibility

The fundamental question in manual memory management is: **who owns this memory and is responsible for freeing it?**

**Single Owner**: One component owns the memory and must free it.

```c
// Function allocates, caller owns
char* create_string() {
    char* str = malloc(100);
    strcpy(str, "Hello");
    return str;  // Caller must free!
}

void use_string() {
    char* s = create_string();
    printf("%s\n", s);
    free(s);  // Caller's responsibility
}
```

**Caller Provides**: Caller allocates, owns, and frees memory.

```c
// Caller provides buffer
void fill_buffer(char* buffer, size_t size) {
    strncpy(buffer, "Data", size);
}

void use_buffer() {
    char buffer[100];
    fill_buffer(buffer, sizeof(buffer));
    // No free needed - stack allocated
}
```

**Transfer Ownership**: Ownership passes from one component to another.

```c
// Takes ownership and will free
void consume_data(int* data) {
    // use data
    free(data);  // Function now owns and frees
}

void transfer() {
    int* arr = malloc(100 * sizeof(int));
    consume_data(arr);  // Ownership transferred
    // Don't free arr - no longer own it!
}
```

**Shared Ownership**: Multiple components need access. Who frees?

This is where manual management gets difficult. Solutions include:
- Reference counting (covered later)
- Explicit ownership transfer protocols
- Document who is responsible

## Resource Acquisition Is Initialization (RAII)

C++ introduces RAII, tying resource lifetime to object lifetime:

```cpp
class Vector {
private:
    int* data;
    size_t size;

public:
    Vector(size_t n) : size(n) {
        data = new int[n];  // Acquire in constructor
    }

    ~Vector() {
        delete[] data;  // Release in destructor
    }

    // Prevent copying (or implement copy properly)
    Vector(const Vector&) = delete;
    Vector& operator=(const Vector&) = delete;
};

void use_vector() {
    Vector v(100);
    // use v
}  // v automatically destroyed, memory freed!
```

RAII provides automatic cleanup while maintaining manual control over allocation timing. The destructor runs when the object goes out of scope, ensuring cleanup happens.

**Smart Pointers** extend RAII to pointer management:

```cpp
#include <memory>

void smart_pointers() {
    // Unique ownership
    std::unique_ptr<int> ptr1(new int(42));
    // ptr1 automatically deleted when out of scope

    // Shared ownership
    std::shared_ptr<int> ptr2 = std::make_shared<int>(42);
    std::shared_ptr<int> ptr3 = ptr2;  // Both own it
    // Deleted when both ptr2 and ptr3 are destroyed
}
```

`unique_ptr` enforces single ownership. `shared_ptr` implements reference counting for shared ownership.

## Allocator Design Patterns

Real allocators use sophisticated techniques:

**Pool Allocation**: Pre-allocate fixed-size blocks for common object types.

```c
#define POOL_SIZE 1000

typedef struct {
    int data;
    bool in_use;
} Node;

Node pool[POOL_SIZE];

Node* alloc_node() {
    for (int i = 0; i < POOL_SIZE; i++) {
        if (!pool[i].in_use) {
            pool[i].in_use = true;
            return &pool[i];
        }
    }
    return NULL;  // Pool exhausted
}

void free_node(Node* node) {
    node->in_use = false;
}
```

Pool allocation is fast and avoids fragmentation but only works for fixed-size objects.

**Arena/Region Allocation**: Allocate from arena, deallocate entire arena at once.

```c
typedef struct {
    char* memory;
    size_t size;
    size_t used;
} Arena;

Arena* create_arena(size_t size) {
    Arena* arena = malloc(sizeof(Arena));
    arena->memory = malloc(size);
    arena->size = size;
    arena->used = 0;
    return arena;
}

void* arena_alloc(Arena* arena, size_t size) {
    if (arena->used + size > arena->size) {
        return NULL;  // Arena full
    }
    void* ptr = arena->memory + arena->used;
    arena->used += size;
    return ptr;
}

void destroy_arena(Arena* arena) {
    free(arena->memory);  // Frees everything at once!
    free(arena);
}
```

Arenas are perfect for allocations with the same lifetime (e.g., all data for one request in a web server).

**Custom Allocators**: Tailor allocation strategy to specific usage patterns.

```c
// Fast allocator for linked list nodes
typedef struct Node {
    int value;
    struct Node* next;
} Node;

Node* free_list = NULL;

Node* alloc_node() {
    if (free_list) {
        Node* node = free_list;
        free_list = free_list->next;
        return node;
    }
    return (Node*)malloc(sizeof(Node));
}

void free_node(Node* node) {
    node->next = free_list;
    free_list = node;
}
```

This allocator maintains a free list of nodes, reusing freed nodes without calling `free`/`malloc`.

## Debugging Memory Errors

Manual memory management errors are notoriously difficult to debug. Several tools help:

**Valgrind**: Detects memory leaks, invalid accesses, and use-after-free.

```bash
$ valgrind --leak-check=full ./program
==12345== Invalid write of size 4
==12345==    at 0x40054E: main (test.c:10)
==12345== Address 0x520104c is 4 bytes after a block of size 40 alloc'd
```

**AddressSanitizer**: Compiler-based instrumentation for memory errors.

```bash
$ gcc -fsanitize=address -g program.c
$ ./a.out
=================================================================
==12345==ERROR: AddressSanitizer: heap-buffer-overflow
```

**Electric Fence**: Allocates guard pages around allocations to catch overruns immediately.

**Custom Allocators**: Implement `malloc`/`free` that track all allocations.

```c
#define malloc(size) debug_malloc(size, __FILE__, __LINE__)
#define free(ptr) debug_free(ptr, __FILE__, __LINE__)

void* debug_malloc(size_t size, const char* file, int line) {
    void* ptr = real_malloc(size);
    record_allocation(ptr, size, file, line);
    return ptr;
}

void debug_free(void* ptr, const char* file, int line) {
    verify_valid(ptr, file, line);
    record_deallocation(ptr);
    real_free(ptr);
}
```

## Performance Considerations

Manual management allows precise performance control:

**Allocation Batching**: Allocate multiple objects together.

```c
// Instead of many small allocations
for (int i = 0; i < 1000; i++) {
    int* x = malloc(sizeof(int));  // Slow!
}

// Allocate once
int* arr = malloc(1000 * sizeof(int));  // Fast!
```

**Allocation Reuse**: Keep free lists to avoid repeated malloc/free.

**Cache Locality**: Allocate related data together for better cache performance.

```c
// Poor locality
struct Node {
    int data;
    struct Node* next;  // Nodes scattered in memory
};

// Better locality
struct NodeArray {
    int data[1000];     // All data contiguous
    int next[1000];     // Indices instead of pointers
};
```

**Deterministic Timing**: Manual management avoids GC pauses, crucial for real-time systems.

While manual memory management is challenging, it remains essential for systems programming, performance-critical code, and embedded systems where automatic management isn't feasible. Understanding these principles is valuable even when using garbage-collected languages, as it reveals the complexity that automatic systems must handle.
