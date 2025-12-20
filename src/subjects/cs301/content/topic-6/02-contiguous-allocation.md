---
id: cs301-t6-contiguous
title: "Contiguous Allocation"
order: 2
---

# Contiguous Memory Allocation

Contiguous allocation assigns each process a single continuous block of memory. This subtopic covers fixed and variable partitioning schemes.

## Contiguous Allocation Concept

Each process occupies a single contiguous region:

```
Physical Memory:
┌─────────────────────┐
│   Operating System  │
├─────────────────────┤
│    Process A        │  ← Contiguous block
│    (200KB)          │
├─────────────────────┤
│    Process B        │  ← Contiguous block
│    (300KB)          │
├─────────────────────┤
│    Process C        │  ← Contiguous block
│    (150KB)          │
├─────────────────────┤
│      Free           │
└─────────────────────┘
```

## Fixed Partitioning

Memory divided into fixed-size partitions at system startup.

### Equal-Size Partitions

```
Memory (1MB):
┌─────────────────────┐
│   OS (256KB)        │
├─────────────────────┤
│   Partition 1       │  256KB each
│   (256KB)           │
├─────────────────────┤
│   Partition 2       │
│   (256KB)           │
├─────────────────────┤
│   Partition 3       │
│   (256KB)           │
└─────────────────────┘
```

### Unequal-Size Partitions

```
Memory (1MB):
┌─────────────────────┐
│   OS (100KB)        │
├─────────────────────┤
│   Partition 1       │  100KB
├─────────────────────┤
│   Partition 2       │  200KB
├─────────────────────┤
│   Partition 3       │  300KB
├─────────────────────┤
│   Partition 4       │  300KB
└─────────────────────┘
```

### Implementation

```c
#define NUM_PARTITIONS 4

typedef struct {
    uint32_t base;
    uint32_t size;
    int pid;        // -1 if free
} Partition;

Partition partitions[NUM_PARTITIONS];

void init_partitions() {
    uint32_t sizes[] = {100*KB, 200*KB, 300*KB, 300*KB};
    uint32_t base = OS_SIZE;

    for (int i = 0; i < NUM_PARTITIONS; i++) {
        partitions[i].base = base;
        partitions[i].size = sizes[i];
        partitions[i].pid = -1;
        base += sizes[i];
    }
}

int allocate_fixed(int pid, uint32_t size) {
    // Find smallest partition that fits
    int best = -1;
    uint32_t best_size = UINT32_MAX;

    for (int i = 0; i < NUM_PARTITIONS; i++) {
        if (partitions[i].pid == -1 &&
            partitions[i].size >= size &&
            partitions[i].size < best_size) {
            best = i;
            best_size = partitions[i].size;
        }
    }

    if (best != -1) {
        partitions[best].pid = pid;
        return partitions[best].base;
    }

    return -1;  // No suitable partition
}
```

### Internal Fragmentation

Wasted space inside allocated partitions:

```
Process needs 150KB, gets 256KB partition:
┌─────────────────────┐
│   Process (150KB)   │
├─────────────────────┤
│   Wasted (106KB)    │  ← Internal fragmentation
└─────────────────────┘
```

## Variable Partitioning

Partitions created dynamically to match process sizes.

### Allocation

```c
typedef struct Block {
    uint32_t base;
    uint32_t size;
    bool allocated;
    int pid;
    struct Block* next;
} Block;

Block* free_list;

void init_memory(uint32_t total_size) {
    free_list = malloc(sizeof(Block));
    free_list->base = OS_SIZE;
    free_list->size = total_size - OS_SIZE;
    free_list->allocated = false;
    free_list->pid = -1;
    free_list->next = NULL;
}

Block* allocate_variable(int pid, uint32_t size) {
    Block* current = free_list;

    while (current != NULL) {
        if (!current->allocated && current->size >= size) {
            // Found suitable block
            if (current->size > size + MIN_BLOCK_SIZE) {
                // Split block
                Block* new_block = malloc(sizeof(Block));
                new_block->base = current->base + size;
                new_block->size = current->size - size;
                new_block->allocated = false;
                new_block->next = current->next;

                current->size = size;
                current->next = new_block;
            }

            current->allocated = true;
            current->pid = pid;
            return current;
        }
        current = current->next;
    }

    return NULL;  // No suitable block
}
```

### External Fragmentation

Free memory split into unusable pieces:

```
Memory after several allocations/deallocations:
┌─────────────────────┐
│   Process A (100KB) │
├─────────────────────┤
│   Free (50KB)       │  ← Too small for 200KB request
├─────────────────────┤
│   Process B (200KB) │
├─────────────────────┤
│   Free (75KB)       │  ← Too small
├─────────────────────┤
│   Process C (150KB) │
├─────────────────────┤
│   Free (100KB)      │  ← Too small
└─────────────────────┘

Total free: 225KB
But can't allocate 200KB process!
```

## Allocation Algorithms

### First Fit

Allocate first block that's large enough:

```c
Block* first_fit(uint32_t size) {
    Block* current = free_list;

    while (current != NULL) {
        if (!current->allocated && current->size >= size) {
            return current;
        }
        current = current->next;
    }

    return NULL;
}
```

**Pros**: Fast
**Cons**: Fragments beginning of memory

### Best Fit

Allocate smallest block that's large enough:

```c
Block* best_fit(uint32_t size) {
    Block* best = NULL;
    Block* current = free_list;

    while (current != NULL) {
        if (!current->allocated && current->size >= size) {
            if (best == NULL || current->size < best->size) {
                best = current;
            }
        }
        current = current->next;
    }

    return best;
}
```

**Pros**: Minimizes wasted space per allocation
**Cons**: Creates many small fragments

### Worst Fit

Allocate largest block available:

```c
Block* worst_fit(uint32_t size) {
    Block* worst = NULL;
    Block* current = free_list;

    while (current != NULL) {
        if (!current->allocated && current->size >= size) {
            if (worst == NULL || current->size > worst->size) {
                worst = current;
            }
        }
        current = current->next;
    }

    return worst;
}
```

**Pros**: Leaves larger remaining fragments
**Cons**: Uses up large blocks quickly

### Next Fit

Like first fit, but starts search from last allocation:

```c
Block* last_allocated = NULL;

Block* next_fit(uint32_t size) {
    Block* start = (last_allocated != NULL) ?
                   last_allocated->next : free_list;
    Block* current = start;

    do {
        if (current == NULL) {
            current = free_list;
        }

        if (!current->allocated && current->size >= size) {
            last_allocated = current;
            return current;
        }

        current = current->next;
    } while (current != start);

    return NULL;
}
```

**Pros**: More even distribution of allocations
**Cons**: May miss better fits earlier in memory

### Comparison

```
Algorithm  | Speed    | Fragmentation | Memory Util
-----------|----------|---------------|-------------
First Fit  | Fast     | Medium        | Medium
Best Fit   | Slow     | Many small    | High
Worst Fit  | Slow     | Few large     | Low
Next Fit   | Fast     | Medium        | Medium

Studies show: First Fit ≈ Best Fit in practice
             Both better than Worst Fit
```

## Deallocation and Coalescing

### Simple Deallocation

```c
void deallocate(Block* block) {
    block->allocated = false;
    block->pid = -1;
}
```

### Coalescing Adjacent Free Blocks

```c
void coalesce() {
    Block* current = free_list;

    while (current != NULL && current->next != NULL) {
        if (!current->allocated && !current->next->allocated) {
            // Merge with next block
            Block* next = current->next;
            current->size += next->size;
            current->next = next->next;
            free(next);
            // Don't advance - might need to merge again
        } else {
            current = current->next;
        }
    }
}
```

## Compaction

Move all processes to one end to eliminate external fragmentation:

```
Before Compaction:           After Compaction:
┌─────────────────┐         ┌─────────────────┐
│   Process A     │         │   Process A     │
├─────────────────┤         ├─────────────────┤
│   Free          │         │   Process B     │
├─────────────────┤         ├─────────────────┤
│   Process B     │         │   Process C     │
├─────────────────┤         ├─────────────────┤
│   Free          │         │                 │
├─────────────────┤         │      Free       │
│   Process C     │         │    (all 225KB)  │
├─────────────────┤         │                 │
│   Free          │         │                 │
└─────────────────┘         └─────────────────┘
```

### Implementation Considerations

```c
void compact() {
    uint32_t dest = OS_SIZE;
    Block* current = free_list;

    while (current != NULL) {
        if (current->allocated) {
            if (current->base != dest) {
                // Move process memory
                memmove((void*)dest, (void*)current->base, current->size);

                // Update process's base register
                update_process_base(current->pid, dest);

                current->base = dest;
            }
            dest += current->size;
        }
        current = current->next;
    }

    // Coalesce all free space
    coalesce();
}
```

**Drawbacks:**
- Expensive operation (copying memory)
- Processes must be stopped
- Only works with runtime binding

## Buddy System

Special allocation scheme for power-of-2 sizes:

```c
#define MIN_ORDER 4   // 16 bytes minimum
#define MAX_ORDER 20  // 1MB maximum

Block* free_lists[MAX_ORDER - MIN_ORDER + 1];

int get_order(size_t size) {
    int order = MIN_ORDER;
    while ((1 << order) < size) {
        order++;
    }
    return order;
}

void* buddy_alloc(size_t size) {
    int order = get_order(size);

    // Find smallest available block
    int i = order - MIN_ORDER;
    while (i <= MAX_ORDER - MIN_ORDER && free_lists[i] == NULL) {
        i++;
    }

    if (i > MAX_ORDER - MIN_ORDER) {
        return NULL;  // No memory
    }

    // Split larger blocks until we get right size
    while (i > order - MIN_ORDER) {
        Block* block = free_lists[i];
        free_lists[i] = block->next;

        // Split into two buddies
        i--;
        size_t half_size = 1 << (i + MIN_ORDER);

        Block* buddy = (Block*)((char*)block + half_size);
        buddy->next = free_lists[i];
        free_lists[i] = buddy;

        block->next = free_lists[i];
        free_lists[i] = block;
    }

    Block* result = free_lists[i];
    free_lists[i] = result->next;
    return result;
}
```

**Advantage**: Fast coalescing (buddy address computed mathematically)
**Disadvantage**: Internal fragmentation (power-of-2 sizes only)

## Summary

Contiguous allocation schemes:
- Fixed partitioning: Simple but wasteful (internal fragmentation)
- Variable partitioning: Better utilization but external fragmentation
- First fit generally best in practice
- Coalescing merges adjacent free blocks
- Compaction eliminates fragmentation but is expensive
- Buddy system provides fast allocation/deallocation
- Modern systems use non-contiguous allocation (paging)
