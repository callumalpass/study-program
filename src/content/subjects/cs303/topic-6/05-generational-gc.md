# Generational Garbage Collection

Generational garbage collection is based on the empirical observation that most objects die young. By organizing memory into generations and collecting young objects more frequently than old ones, generational GC dramatically improves performance. This technique is used in virtually all modern high-performance garbage collectors.

## The Generational Hypothesis

The generational hypothesis states: **most objects die young**. Empirical studies across many programs show:

- 80-98% of objects become garbage shortly after allocation
- Objects that survive multiple collections typically live much longer
- Young objects create most of the garbage

This suggests collecting young objects frequently (where most garbage is) while avoiding repeated scans of long-lived objects.

Example allocation pattern:
```java
for (int i = 0; i < 1000000; i++) {
    String temp = "Iteration " + i;  // Dies immediately
    process(temp);
}
// temp strings are garbage right after use
// Only final result survives
```

Without generational GC, we'd scan all million temporary strings repeatedly. With it, we quickly reclaim them before scanning older objects.

## Two-Generation System

The simplest generational system uses two generations:

**Young Generation** (nursery): Where objects are initially allocated. Collected frequently.

**Old Generation** (tenured): Where long-lived objects are promoted. Collected rarely.

```
┌─────────────────┐
│ Young Generation│  Fast allocation, frequent collection
├─────────────────┤
│                 │
│ Old Generation  │  Slow allocation, rare collection
│                 │
└─────────────────┘
```

### Allocation and Collection

```c
typedef struct {
    void* young_start;
    void* young_end;
    void* young_free;

    void* old_start;
    void* old_end;
    void* old_free;
} GenerationalHeap;

void* allocate(size_t size) {
    // Try young generation first (fast path)
    if (heap.young_free + size <= heap.young_end) {
        void* obj = heap.young_free;
        heap.young_free += size;
        return obj;
    }

    // Young generation full - collect it
    minor_collection();

    // Try again
    if (heap.young_free + size <= heap.young_end) {
        void* obj = heap.young_free;
        heap.young_free += size;
        return obj;
    }

    // Still no space - major collection needed
    major_collection();

    // Allocate from old generation
    return allocate_old(size);
}
```

**Minor Collection**: Collect young generation only. Fast and frequent.

**Major Collection**: Collect entire heap (young + old). Slow and rare.

## Minor Collection Algorithm

Minor collections only trace objects in the young generation:

```c
void minor_collection() {
    // Mark young objects reachable from roots
    for (each root in root_set) {
        if (points_to_young(root)) {
            mark_young(root);
        }
    }

    // Mark young objects reachable from old generation
    for (each remembered_set_entry) {
        mark_young(remembered_set_entry);
    }

    // Survivors are promoted or copied
    void* survivor_space = allocate_survivor_space();

    for (each marked young object) {
        if (object->age >= promotion_threshold) {
            copy_to_old_generation(object);
        } else {
            copy_to_survivor_space(object, survivor_space);
            object->age++;
        }
    }

    // Reset young generation
    heap.young_free = heap.young_start;
}
```

Key insight: We don't scan the entire old generation! We only process:
1. Roots pointing to young objects
2. Old objects with pointers to young objects (remembered set)

This makes minor collections fast even with large old generations.

## The Remembered Set Problem

To collect only the young generation, we need to know which old generation objects point to young objects. Scanning the entire old generation defeats the purpose.

Solution: **Remembered Set** - tracks old-to-young pointers.

```c
typedef struct {
    Object** entries;
    size_t count;
    size_t capacity;
} RememberedSet;

RememberedSet remembered_set;
```

Whenever an old object is modified to point to a young object, record it:

```c
void write_barrier(Object* obj, Object* new_value) {
    obj->field = new_value;

    // If old object now points to young object, remember it
    if (is_in_old_generation(obj) && is_in_young_generation(new_value)) {
        add_to_remembered_set(obj);
    }
}
```

This **write barrier** adds overhead to every pointer write but makes minor collections much faster.

## Copying Collection for Young Generation

Young generation is typically collected using copying collection:

The young generation is divided into two spaces:
- **Eden**: Where new objects are allocated
- **Survivor spaces** (From and To): Hold objects that survived one collection

```
Young Generation:
┌──────┬──────────┬──────────┐
│ Eden │ From     │ To       │
└──────┴──────────┴──────────┘
```

Collection process:
1. Scan roots and remembered set
2. Copy live objects from Eden and From to To
3. Increment age of survivors
4. Promote objects that are old enough to old generation
5. Swap From and To
6. Clear Eden

```c
void copy_collection() {
    void* to_ptr = survivor_to_space;

    // Process roots
    for (each root) {
        if (is_in_young(root)) {
            root = copy_object(root, &to_ptr);
        }
    }

    // Process remembered set
    for (each old_obj in remembered_set) {
        for (each field in old_obj) {
            if (is_in_young(field)) {
                field = copy_object(field, &to_ptr);
            }
        }
    }

    // Process copied objects (breadth-first traversal)
    void* scan = survivor_to_space;
    while (scan < to_ptr) {
        Object* obj = (Object*)scan;
        for (each field in obj) {
            if (is_in_young(field)) {
                field = copy_object(field, &to_ptr);
            }
        }
        scan += obj->size;
    }

    // Swap survivor spaces
    swap(survivor_from_space, survivor_to_space);

    // Reset Eden
    eden_free = eden_start;
}

Object* copy_object(Object* obj, void** to_ptr) {
    if (obj->forwarding_pointer) {
        // Already copied
        return obj->forwarding_pointer;
    }

    if (obj->age >= promotion_threshold) {
        // Promote to old generation
        Object* new_loc = allocate_in_old(obj->size);
        memcpy(new_loc, obj, obj->size);
        obj->forwarding_pointer = new_loc;
        return new_loc;
    } else {
        // Copy to survivor space
        Object* new_loc = *to_ptr;
        memcpy(new_loc, obj, obj->size);
        new_loc->age = obj->age + 1;
        *to_ptr += obj->size;
        obj->forwarding_pointer = new_loc;
        return new_loc;
    }
}
```

## Multi-Generation Systems

Some systems use more than two generations:

**Java HotSpot**: Young (Eden + 2 Survivors), Old, Permanent/Metaspace

**V8 (JavaScript)**: New space (divided in two), Old space, Large object space

**Python**: Three generations (gen0, gen1, gen2)

More generations allow finer-grained tuning but add complexity.

### Age-Based Promotion

Objects are promoted based on age (number of collections survived):

```c
typedef struct {
    uint8_t age;
    // ... other fields
} Object;

#define PROMOTION_THRESHOLD 15

void update_age(Object* obj) {
    if (obj->age < PROMOTION_THRESHOLD) {
        obj->age++;
    } else {
        promote_to_old_generation(obj);
    }
}
```

Some systems use adaptive thresholds based on survivor space utilization.

## Generational Garbage Collection Performance

**Benefits**:
- Much faster minor collections (only young generation)
- Most garbage reclaimed quickly
- Reduces full heap traversals
- Better cache locality (young objects clustered)

**Costs**:
- Write barrier overhead on pointer writes
- Remembered set memory and maintenance
- Complexity of multi-generation coordination

Typical performance:
- Minor collection: 1-10 milliseconds
- Major collection: 100-1000 milliseconds
- 90%+ of collections are minor

## Write Barrier Implementations

Write barriers are critical but must be fast:

**Card Marking**: Divide old generation into cards (e.g., 512 bytes each). Mark dirty cards rather than individual objects.

```c
#define CARD_SIZE 512
uint8_t* card_table;

void write_barrier(Object* obj, Object* new_value) {
    obj->field = new_value;

    if (is_in_old_generation(obj) && is_in_young_generation(new_value)) {
        size_t card_index = ((char*)obj - old_gen_start) / CARD_SIZE;
        card_table[card_index] = 1;  // Mark card dirty
    }
}

void scan_remembered_set() {
    for (size_t i = 0; i < num_cards; i++) {
        if (card_table[i]) {
            void* card_start = old_gen_start + i * CARD_SIZE;
            scan_objects_in_card(card_start);
            card_table[i] = 0;  // Clear mark
        }
    }
}
```

Card marking trades precision (must scan entire card) for performance (simple array write).

**Sequential Store Buffer**: Record stores in buffer, process during GC.

```c
typedef struct {
    Object** stores;
    size_t count;
} StoreBuffer;

void write_barrier(Object* obj, Object* new_value) {
    obj->field = new_value;

    if (is_old_to_young_pointer(obj, new_value)) {
        store_buffer.stores[store_buffer.count++] = &obj->field;
    }
}
```

## Parallel and Concurrent Generational GC

Modern collectors parallelize and overlap GC with program execution:

**Parallel Minor Collection**: Use multiple threads to scan and copy.

```c
void parallel_minor_collection() {
    // Divide work among threads
    ThreadPool pool(num_threads);

    // Phase 1: Copy from roots (parallel)
    pool.parallel_for(roots, [](Root* root) {
        if (is_young(root)) {
            copy_object(root);
        }
    });

    // Phase 2: Scan copied objects (parallel)
    pool.parallel_scan(survivor_space);

    pool.wait_all();
}
```

**Concurrent Old Generation Collection**: Collect old generation while program runs.

The Garbage-First (G1) collector and Z Garbage Collector (ZGC) use sophisticated concurrent techniques to minimize pauses.

## Tuning Generational GC

Key parameters to tune:

**Young Generation Size**: Larger = less frequent minor collections but longer pauses.

```
-Xmn512m  (Java: set young generation to 512MB)
```

**Promotion Threshold**: Higher = more collections before promotion.

```
-XX:MaxTenuringThreshold=15  (Java: max age before promotion)
```

**Heap Ratios**: Balance between generations.

```
-XX:NewRatio=2  (Java: old generation 2x young generation)
```

Optimal settings depend on application characteristics:
- High allocation rate → larger young generation
- Long-lived objects → smaller young generation, lower promotion threshold
- Low latency requirement → smaller generations (shorter pauses)

Generational GC has proven so effective that virtually all production garbage collectors for major languages use it as a foundation, with various optimizations and concurrent techniques built on top.
