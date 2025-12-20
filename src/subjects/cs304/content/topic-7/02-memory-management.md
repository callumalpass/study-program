# Memory Management

Memory management is one of the most critical responsibilities of a runtime system. How a program allocates, uses, and frees memory fundamentally affects its performance, reliability, and scalability. Unlike stack allocation which follows a strict LIFO pattern and can be managed with simple pointer adjustments, heap allocation requires sophisticated algorithms to handle arbitrary allocation and deallocation patterns efficiently.

## Heap Allocation Fundamentals

The heap is a region of memory used for dynamic allocation where objects can be allocated and freed in any order. When a program requests memory, the allocator must find a suitable block, mark it as in-use, and return its address. When memory is freed, the allocator must track that the block is available for reuse.

### Free List Management

The most basic heap allocator maintains a free list: a linked list of available memory blocks. Each free block contains a header with size information and a pointer to the next free block.

```c
// Simple free list node structure
typedef struct block {
    size_t size;              // Size of this block
    struct block *next;       // Next free block
    char data[];              // Flexible array member for user data
} Block;

// Global free list head
static Block *free_list = NULL;

// Initialize heap with a large block
void heap_init(void *memory, size_t size) {
    free_list = (Block *)memory;
    free_list->size = size - sizeof(Block);
    free_list->next = NULL;
}

// First-fit allocation strategy
void *heap_alloc(size_t size) {
    // Align size to pointer boundary
    size = (size + sizeof(void*) - 1) & ~(sizeof(void*) - 1);

    Block *prev = NULL;
    Block *curr = free_list;

    // Search for suitable block
    while (curr != NULL) {
        if (curr->size >= size) {
            // Found suitable block
            if (curr->size >= size + sizeof(Block) + 16) {
                // Split block if remainder is large enough
                Block *new_block = (Block *)((char *)curr + sizeof(Block) + size);
                new_block->size = curr->size - size - sizeof(Block);
                new_block->next = curr->next;

                curr->size = size;

                if (prev) prev->next = new_block;
                else free_list = new_block;
            } else {
                // Use entire block
                if (prev) prev->next = curr->next;
                else free_list = curr->next;
            }

            return curr->data;
        }

        prev = curr;
        curr = curr->next;
    }

    return NULL; // Out of memory
}

// Free a block
void heap_free(void *ptr) {
    if (!ptr) return;

    Block *block = (Block *)((char *)ptr - offsetof(Block, data));

    // Simple insertion at head (could coalesce adjacent blocks)
    block->next = free_list;
    free_list = block;
}
```

### Allocation Strategies

Different strategies exist for choosing which free block to allocate:

**First Fit**: Allocate the first block large enough. Fast but can fragment early blocks.

**Best Fit**: Allocate the smallest block that fits. Minimizes wasted space but slower and can create many tiny unusable blocks.

**Next Fit**: Continue searching from where the last allocation occurred. Distributes allocations more evenly.

**Worst Fit**: Allocate the largest available block. Counterintuitively, this can reduce fragmentation in some workloads by avoiding tiny remnants.

## Memory Pools

Memory pools (or pool allocators) optimize allocation for objects of fixed size by pre-allocating a large block and dividing it into equal-sized chunks. This eliminates fragmentation and makes allocation and deallocation extremely fast.

```c
// Pool allocator for fixed-size objects
typedef struct pool {
    void *memory;           // Base memory
    void **free_list;       // Free slots
    size_t object_size;     // Size of each object
    size_t capacity;        // Total number of objects
} Pool;

Pool *pool_create(size_t object_size, size_t count) {
    Pool *pool = malloc(sizeof(Pool));

    // Ensure minimum size for pointer storage
    if (object_size < sizeof(void*))
        object_size = sizeof(void*);

    pool->object_size = object_size;
    pool->capacity = count;
    pool->memory = malloc(object_size * count);

    // Initialize free list - each slot points to next
    pool->free_list = pool->memory;
    char *ptr = pool->memory;
    for (size_t i = 0; i < count - 1; i++) {
        *(void **)ptr = ptr + object_size;
        ptr += object_size;
    }
    *(void **)ptr = NULL; // Last slot

    return pool;
}

void *pool_alloc(Pool *pool) {
    if (!pool->free_list)
        return NULL; // Pool exhausted

    void *obj = pool->free_list;
    pool->free_list = *(void **)obj;
    return obj;
}

void pool_free(Pool *pool, void *obj) {
    *(void **)obj = pool->free_list;
    pool->free_list = obj;
}
```

Pool allocators are ideal for situations where you allocate many objects of the same type, such as AST nodes during compilation or particles in a physics simulation.

## Advanced Allocator Designs

Modern allocators incorporate sophisticated techniques to achieve high performance across diverse workloads.

### Size Classes and Segregated Storage

Instead of maintaining a single free list, allocators like tcmalloc and jemalloc use multiple size classes. Each size class has its own free list for objects within a specific size range. This reduces search time and fragmentation.

```c
// Simplified size-class allocator structure
#define NUM_SIZE_CLASSES 32

typedef struct size_class {
    size_t object_size;
    Block *free_list;
} SizeClass;

static SizeClass size_classes[NUM_SIZE_CLASSES];

// Map requested size to size class index
static int get_size_class(size_t size) {
    // Simple linear classes: 16, 32, 48, 64, ...
    return (size + 15) / 16;
}

void *allocate(size_t size) {
    int class_idx = get_size_class(size);

    if (class_idx >= NUM_SIZE_CLASSES) {
        // Large allocation - use different strategy
        return large_alloc(size);
    }

    SizeClass *sc = &size_classes[class_idx];

    if (!sc->free_list) {
        // Allocate new page for this size class
        refill_size_class(sc);
    }

    // Pop from free list
    Block *block = sc->free_list;
    sc->free_list = block->next;
    return block->data;
}
```

### Thread-Local Caching

In multithreaded programs, contention on the global allocator lock can become a bottleneck. Thread-local caches give each thread a small cache of pre-allocated objects that can be allocated without synchronization.

```c
// Thread-local allocation buffer
typedef struct tcache {
    void *objects[64];  // Cache of free objects
    int count;          // Number of cached objects
} TCache;

__thread TCache thread_cache[NUM_SIZE_CLASSES];

void *fast_alloc(size_t size) {
    int class_idx = get_size_class(size);
    TCache *cache = &thread_cache[class_idx];

    if (cache->count > 0) {
        // Fast path: allocate from thread-local cache
        return cache->objects[--cache->count];
    }

    // Slow path: refill cache from central allocator
    return refill_and_allocate(class_idx);
}

void fast_free(void *ptr, size_t size) {
    int class_idx = get_size_class(size);
    TCache *cache = &thread_cache[class_idx];

    if (cache->count < 64) {
        // Fast path: return to thread-local cache
        cache->objects[cache->count++] = ptr;
        return;
    }

    // Slow path: flush some objects to central allocator
    flush_and_free(class_idx, ptr);
}
```

### Buddy Allocation

The buddy system maintains blocks in power-of-two sizes. When splitting a block, it creates two "buddies" that can be efficiently coalesced when both are free.

```c
// Buddy allocator example
#define MAX_ORDER 10  // 2^10 = 1024 byte max block

typedef struct buddy_allocator {
    Block *free_lists[MAX_ORDER + 1];
    void *memory;
    size_t total_size;
} BuddyAllocator;

void *buddy_alloc(BuddyAllocator *ba, size_t size) {
    // Find smallest order that fits
    int order = 0;
    size_t block_size = 1;
    while (block_size < size) {
        block_size *= 2;
        order++;
    }

    // Find free block, splitting larger blocks if needed
    for (int curr_order = order; curr_order <= MAX_ORDER; curr_order++) {
        if (ba->free_lists[curr_order]) {
            Block *block = ba->free_lists[curr_order];
            ba->free_lists[curr_order] = block->next;

            // Split blocks until we reach desired order
            while (curr_order > order) {
                curr_order--;
                size_t buddy_size = 1 << curr_order;

                // Create buddy block
                Block *buddy = (Block *)((char *)block + buddy_size);
                buddy->next = ba->free_lists[curr_order];
                ba->free_lists[curr_order] = buddy;
            }

            return block;
        }
    }

    return NULL; // Out of memory
}
```

## Fragmentation and Coalescing

Fragmentation occurs when free memory exists but cannot satisfy allocation requests due to being scattered in small pieces. External fragmentation happens when free blocks are too small, while internal fragmentation occurs when allocated blocks are larger than needed.

Coalescing merges adjacent free blocks into larger blocks. Efficient coalescing requires tracking block boundaries and checking if neighbors are free.

## Key Takeaways

- Heap allocation manages arbitrary allocation patterns, unlike stack allocation's simple LIFO structure.
- Free list allocators maintain linked lists of available blocks, using strategies like first-fit or best-fit to select blocks.
- Memory pools optimize fixed-size allocations by eliminating fragmentation and overhead.
- Modern allocators use size classes to group similar-sized objects, reducing search time and fragmentation.
- Thread-local caching eliminates lock contention in multithreaded programs by giving each thread its own allocation buffer.
- Buddy allocation maintains power-of-two sized blocks that can be efficiently split and coalesced.
- Fragmentation is a fundamental challenge in memory management, requiring careful allocator design and coalescing strategies to mitigate.
