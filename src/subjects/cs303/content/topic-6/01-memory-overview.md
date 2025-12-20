# Memory Management Overview

Memory management is one of the most critical aspects of programming language implementation. How a language allocates, tracks, and reclaims memory profoundly affects program performance, correctness, and the types of abstractions the language can support. Understanding memory management is essential for writing efficient programs and designing robust systems.

## Stack vs Heap: Two Memory Regions

Programs typically use two distinct regions of memory with different characteristics and management strategies:

**The Stack** stores local variables, function parameters, and return addresses. It operates as a Last-In-First-Out (LIFO) data structure. When a function is called, a stack frame is pushed containing its local variables. When the function returns, the entire frame is popped, deallocating all local variables instantly.

Stack allocation is extremely efficient - just increment a stack pointer. Deallocation is even faster - just decrement the pointer. The hardware often provides dedicated support for stack operations. Most importantly, stack allocation follows a structured discipline that matches function call/return behavior.

Consider this example:
```c
void foo() {
    int x = 10;      // Allocated on stack
    int arr[100];    // Also on stack
    bar();           // bar's locals go above foo's
}                    // All of foo's locals deallocated at once
```

The stack frame for `foo` contains `x`, `arr`, return address, and saved registers. When `foo` calls `bar`, `bar`'s frame is pushed on top. When `bar` returns, its frame is popped. When `foo` returns, its frame is popped.

Stack allocation has limitations:
- **Fixed size**: Stack size is typically limited (often 1-8MB)
- **Scoped lifetime**: Variables only exist while their function is active
- **Cannot return references**: Can't return pointer to local variable
- **No dynamic sizing**: Array size must be known at compile time (in most languages)

**The Heap** stores dynamically allocated memory with flexible lifetimes. Objects can be allocated at any time and may outlive the function that created them. The heap supports arbitrary allocation and deallocation patterns.

```c
void foo() {
    int* ptr = malloc(sizeof(int));  // Allocated on heap
    *ptr = 42;
    return ptr;  // Valid: heap object outlives function
}
```

Heap allocation is more flexible but more complex:
- **Dynamic size**: Can allocate objects of any size at runtime
- **Flexible lifetime**: Objects live until explicitly deallocated
- **Shared ownership**: Multiple pointers can reference same object
- **Fragmentation**: Memory can become fragmented over time

The cost is performance and complexity. Heap allocation requires finding free space, tracking allocations, and eventually reclaiming memory.

## Memory Layout of a Process

A typical process memory layout:

```
High addresses
┌─────────────────────┐
│   Command line      │  Arguments and environment
│   and environment   │
├─────────────────────┤
│       Stack         │  Grows downward
│         ↓           │
│                     │
│    (empty space)    │
│                     │
│         ↑           │
│       Heap          │  Grows upward
├─────────────────────┤
│   Uninitialized     │  BSS segment (zero-initialized)
│       Data          │
├─────────────────────┤
│    Initialized      │  Initialized global/static variables
│       Data          │
├─────────────────────┤
│      Text           │  Program code (read-only)
│    (Code)           │
└─────────────────────┘
Low addresses
```

The **text segment** contains executable code, typically read-only and shared among processes running the same program.

The **data segment** contains global and static variables. Initialized data has explicit initial values. Uninitialized data (BSS - Block Started by Symbol) is zero-initialized.

The **heap** starts above the data segment and grows upward. Memory allocators like `malloc` request memory from the operating system through system calls like `sbrk` or `mmap`.

The **stack** starts at high addresses and grows downward. Each thread has its own stack. Stack overflow occurs when the stack grows into the heap.

## Memory Allocation Strategies

Different allocation strategies suit different use cases:

**Sequential/Bump Allocation**: Maintain a pointer to free space. To allocate, increment pointer by requested size. Extremely fast (a few instructions) but doesn't support individual deallocation - typically used with garbage collection or region-based management.

```c
char* free_ptr = heap_start;

void* allocate(size_t size) {
    void* result = free_ptr;
    free_ptr += size;
    if (free_ptr > heap_end) {
        collect_garbage();  // Or request more memory
    }
    return result;
}
```

**Free List Allocation**: Maintain linked list of free blocks. To allocate, search for sufficiently large block. Various policies exist:
- **First fit**: Use first block large enough
- **Best fit**: Use smallest block large enough (minimizes waste)
- **Worst fit**: Use largest block (maximizes remaining space)

```c
typedef struct Block {
    size_t size;
    struct Block* next;
} Block;

Block* free_list;

void* allocate(size_t size) {
    Block* prev = NULL;
    Block* curr = free_list;

    // First fit search
    while (curr != NULL) {
        if (curr->size >= size) {
            // Remove from free list
            if (prev) prev->next = curr->next;
            else free_list = curr->next;

            // Split block if significantly larger
            if (curr->size > size + sizeof(Block)) {
                Block* remainder = (Block*)((char*)curr + size);
                remainder->size = curr->size - size;
                remainder->next = free_list;
                free_list = remainder;
                curr->size = size;
            }

            return curr;
        }
        prev = curr;
        curr = curr->next;
    }

    return NULL;  // No suitable block
}
```

**Segregated Free Lists**: Maintain separate free lists for different size classes. Small objects (8, 16, 32, 64 bytes) get their own lists. This reduces fragmentation and speeds allocation.

**Buddy Allocation**: Allocate memory in power-of-2 sized blocks. When splitting blocks, create "buddies" that can be efficiently merged later. Used in Linux kernel.

## Memory Fragmentation

Fragmentation is the nemesis of memory allocators:

**External Fragmentation**: Free memory is scattered in many small blocks. Total free space is sufficient, but no single block is large enough.

```
Before: [Used 8][Free 100][Used 8][Free 100]
After allocating/freeing various sizes:
[Used 8][Free 5][Used 10][Free 3][Used 8][Free 92]
```

Total free: 100 bytes, but largest free block: 92 bytes

**Internal Fragmentation**: Allocated blocks are larger than requested. The extra space is wasted.

```
Request: 33 bytes
Allocator: Must allocate 64 bytes (next size class)
Waste: 31 bytes
```

Combating fragmentation:
- **Compaction**: Move objects to consolidate free space (requires updating all pointers)
- **Size classes**: Reduce internal fragmentation by offering multiple sizes
- **Coalescence**: Merge adjacent free blocks
- **Best fit**: Choose blocks that minimize leftover space

## Manual vs Automatic Memory Management

Languages take different approaches to memory management:

**Manual Management** (C, C++): Programmer explicitly allocates and deallocates:
```c
int* ptr = malloc(sizeof(int) * 100);
// use ptr
free(ptr);
```

Advantages:
- Predictable performance
- No runtime overhead
- Deterministic resource cleanup

Disadvantages:
- Memory leaks (forgetting to free)
- Double frees (freeing twice)
- Use-after-free (accessing freed memory)
- Dangling pointers

**Automatic Management** (Java, Python, Go, JavaScript): Runtime automatically reclaims unused memory:
```java
Object obj = new Object();  // Allocated
// use obj
// No explicit deallocation - GC reclaims when unreachable
```

Advantages:
- No memory leaks (in theory)
- No use-after-free bugs
- Simpler code

Disadvantages:
- Unpredictable pauses (GC running)
- Runtime overhead
- Harder to reason about performance

**Hybrid Approaches** (Rust, C++ RAII): Use compile-time analysis to ensure memory safety:
```rust
{
    let v = vec![1, 2, 3];  // Allocated
    // use v
}  // v automatically deallocated (no GC!)
```

This combines manual management's performance with automatic safety guarantees.

## Pointer Metadata and Headers

Allocators typically store metadata alongside allocated blocks:

```c
typedef struct {
    size_t size;        // Block size
    bool allocated;     // Is block in use?
    // For GC systems:
    bool marked;        // For mark-and-sweep
    type_info* type;    // For typed GC
} BlockHeader;

void* allocate(size_t size) {
    // Allocate extra space for header
    size_t total = size + sizeof(BlockHeader);
    BlockHeader* header = find_free_block(total);

    header->size = size;
    header->allocated = true;

    // Return pointer past header
    return (void*)(header + 1);
}
```

The header enables:
- Finding block size during deallocation
- Traversing all allocated objects (for GC)
- Type information for typed garbage collection
- Debugging information

Modern allocators use various tricks to minimize header overhead, as it can be significant for small objects.

## Memory Alignment

Modern processors require or prefer aligned memory access. A 4-byte integer should start at an address divisible by 4. Unaligned access can be slower or cause crashes.

```c
// Good alignment
struct {
    int x;      // 4 bytes at offset 0
    double y;   // 8 bytes at offset 8 (padded)
} aligned;      // Size: 16 bytes

// Poor alignment
struct {
    char a;     // 1 byte at offset 0
    double b;   // 8 bytes at offset 1 (unaligned!)
} unaligned;
```

Allocators ensure allocated memory is properly aligned, typically to 8 or 16-byte boundaries, trading some internal fragmentation for performance.

Understanding these fundamental concepts provides the foundation for exploring specific memory management techniques like garbage collection, reference counting, and ownership systems.
