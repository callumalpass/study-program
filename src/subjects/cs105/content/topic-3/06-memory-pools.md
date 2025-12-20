---
id: cs105-t3-pools
title: "Memory Pools and Arenas"
order: 6
---

# Memory Pools and Arenas

Memory pools and arenas are custom allocation strategies that can dramatically improve performance over general-purpose allocators like `malloc`. They're essential in game engines, embedded systems, and performance-critical applications.

## Why Custom Allocators?

### Problems with malloc/free

```c
// Fragmentation over time
for (int i = 0; i < 1000000; i++) {
    void* p = malloc(rand() % 1000);
    // Use p...
    free(p);
}
// Memory becomes fragmented, allocations slow down

// Overhead per allocation
char* c = malloc(1);  // May use 16-32 bytes total!
// Header overhead + alignment padding

// Cache unfriendly
Node* nodes[1000];
for (int i = 0; i < 1000; i++) {
    nodes[i] = malloc(sizeof(Node));  // Scattered in memory
}
```

### Benefits of Custom Allocators

- Faster allocation (O(1) vs O(n) for some malloc implementations)
- No fragmentation (for specific patterns)
- Better cache locality
- Bulk deallocation (free everything at once)
- Deterministic memory usage

## Arena Allocator (Linear/Bump Allocator)

The simplest allocator: allocate sequentially, free everything at once.

### Basic Implementation

```c
typedef struct {
    char* buffer;
    size_t capacity;
    size_t offset;
} Arena;

Arena arena_create(size_t size) {
    Arena a;
    a.buffer = malloc(size);
    a.capacity = size;
    a.offset = 0;
    return a;
}

void* arena_alloc(Arena* a, size_t size) {
    // Align to 8 bytes
    size_t aligned_offset = (a->offset + 7) & ~7;

    if (aligned_offset + size > a->capacity) {
        return NULL;  // Out of memory
    }

    void* ptr = a->buffer + aligned_offset;
    a->offset = aligned_offset + size;
    return ptr;
}

void arena_reset(Arena* a) {
    a->offset = 0;  // "Free" everything instantly
}

void arena_destroy(Arena* a) {
    free(a->buffer);
}
```

### Usage Pattern

```c
Arena frame_arena = arena_create(1024 * 1024);  // 1 MB

void game_loop() {
    while (running) {
        arena_reset(&frame_arena);  // Free last frame's allocations

        // All allocations for this frame
        Enemy* enemies = arena_alloc(&frame_arena,
                                     num_enemies * sizeof(Enemy));
        Particle* particles = arena_alloc(&frame_arena,
                                          num_particles * sizeof(Particle));

        // Process frame...
        // No individual frees needed!
    }
}
```

### Advantages

- O(1) allocation and deallocation
- No fragmentation
- Excellent cache locality
- Zero memory leaks (reset frees everything)

### Limitations

- Cannot free individual allocations
- Must reset entire arena
- Fixed maximum size

## Pool Allocator (Fixed-Size)

Allocates fixed-size blocks efficiently. Perfect for objects of uniform size.

### Implementation

```c
typedef struct PoolBlock {
    struct PoolBlock* next;
} PoolBlock;

typedef struct {
    char* buffer;
    size_t block_size;
    size_t block_count;
    PoolBlock* free_list;
} Pool;

Pool pool_create(size_t block_size, size_t block_count) {
    // Ensure minimum size for free list pointer
    if (block_size < sizeof(PoolBlock)) {
        block_size = sizeof(PoolBlock);
    }

    Pool p;
    p.block_size = block_size;
    p.block_count = block_count;
    p.buffer = malloc(block_size * block_count);

    // Build free list
    p.free_list = NULL;
    for (size_t i = 0; i < block_count; i++) {
        PoolBlock* block = (PoolBlock*)(p.buffer + i * block_size);
        block->next = p.free_list;
        p.free_list = block;
    }

    return p;
}

void* pool_alloc(Pool* p) {
    if (!p->free_list) return NULL;

    PoolBlock* block = p->free_list;
    p->free_list = block->next;
    return block;
}

void pool_free(Pool* p, void* ptr) {
    PoolBlock* block = ptr;
    block->next = p->free_list;
    p->free_list = block;
}

void pool_destroy(Pool* p) {
    free(p->buffer);
}
```

### Usage Example

```c
typedef struct {
    int x, y;
    int health;
    int type;
} Entity;

Pool entity_pool;

void init_game() {
    entity_pool = pool_create(sizeof(Entity), 1000);
}

Entity* spawn_entity(int x, int y) {
    Entity* e = pool_alloc(&entity_pool);
    if (!e) return NULL;
    e->x = x;
    e->y = y;
    e->health = 100;
    return e;
}

void destroy_entity(Entity* e) {
    pool_free(&entity_pool, e);
}
```

### Advantages

- O(1) allocation and deallocation
- No fragmentation
- Individual frees supported
- Objects are contiguous in memory

### Limitations

- Only one size per pool
- Fixed maximum count

## Slab Allocator

Combines pools of different sizes for general-purpose allocation.

### Simple Implementation

```c
#define NUM_SIZE_CLASSES 8

typedef struct {
    Pool pools[NUM_SIZE_CLASSES];
    // Sizes: 8, 16, 32, 64, 128, 256, 512, 1024
} SlabAllocator;

size_t size_class(size_t size) {
    if (size <= 8) return 0;
    if (size <= 16) return 1;
    if (size <= 32) return 2;
    if (size <= 64) return 3;
    if (size <= 128) return 4;
    if (size <= 256) return 5;
    if (size <= 512) return 6;
    if (size <= 1024) return 7;
    return (size_t)-1;  // Too large
}

void* slab_alloc(SlabAllocator* s, size_t size) {
    size_t class = size_class(size);
    if (class == (size_t)-1) {
        return malloc(size);  // Fall back to malloc
    }
    return pool_alloc(&s->pools[class]);
}

void slab_free(SlabAllocator* s, void* ptr, size_t size) {
    size_t class = size_class(size);
    if (class == (size_t)-1) {
        free(ptr);
        return;
    }
    pool_free(&s->pools[class], ptr);
}
```

## Stack Allocator

LIFO allocation pattern - useful for temporary allocations.

```c
typedef struct {
    char* buffer;
    size_t capacity;
    size_t offset;
} StackAlloc;

typedef size_t StackMark;  // Saved position

StackMark stack_mark(StackAlloc* s) {
    return s->offset;
}

void* stack_alloc(StackAlloc* s, size_t size) {
    size_t aligned = (s->offset + 7) & ~7;
    if (aligned + size > s->capacity) return NULL;
    void* ptr = s->buffer + aligned;
    s->offset = aligned + size;
    return ptr;
}

void stack_free_to_mark(StackAlloc* s, StackMark mark) {
    s->offset = mark;
}
```

### Usage

```c
void process() {
    StackMark mark = stack_mark(&stack);

    int* temp = stack_alloc(&stack, 1000 * sizeof(int));
    // Use temp...

    stack_free_to_mark(&stack, mark);  // Free temp
}
```

## Choosing an Allocator

| Pattern | Allocator | Use Case |
|---------|-----------|----------|
| Many same-size objects | Pool | Game entities, network packets |
| Frame-based allocation | Arena | Per-frame game data |
| LIFO temporaries | Stack | Function scratch space |
| General purpose | Slab | Mixed sizes, performance critical |
| Hierarchical | Nested Arena | Document/scene hierarchies |

## Real-World Examples

### Game Engine Pattern

```c
// Global allocators
Arena persistent;    // Lasts entire game
Arena frame;        // Reset each frame
Pool entity_pool;   // Fixed-size entities

void init_game() {
    persistent = arena_create(100 * 1024 * 1024);  // 100 MB
    frame = arena_create(10 * 1024 * 1024);        // 10 MB
    entity_pool = pool_create(sizeof(Entity), 10000);
}
```

### Embedded Systems

```c
// Static allocation - no heap at all
static char memory_block[8192];
static Arena arena = {memory_block, sizeof(memory_block), 0};

// All "dynamic" allocation uses the arena
```

## Summary

Custom allocators solve specific problems:
- **Arena**: Fast sequential allocation, bulk free
- **Pool**: Fixed-size objects, individual free
- **Stack**: LIFO pattern, scope-based lifetime
- **Slab**: Multiple size classes, general purpose

Choose based on your allocation pattern for significant performance gains.
