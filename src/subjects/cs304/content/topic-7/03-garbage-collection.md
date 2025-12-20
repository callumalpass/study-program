# Garbage Collection

Garbage collection (GC) automates memory management by automatically reclaiming memory occupied by objects that are no longer reachable from the program. This eliminates entire classes of bugs such as use-after-free, double-free, and memory leaks, at the cost of runtime overhead and reduced control over memory management. Understanding garbage collection is essential for implementing managed languages and for writing efficient programs that use them.

## Reachability and Liveness

The fundamental principle of garbage collection is that an object is garbage if it cannot be reached by the running program. The GC traces from a set of roots (global variables, stack variables, registers) to find all reachable objects. Everything else is garbage and can be reclaimed.

```c
// Example object graph
typedef struct object {
    struct object *field1;
    struct object *field2;
    int data;
    char marked;  // GC mark bit
} Object;

// Root set
Object *global_var;
Object *stack_vars[100];
int stack_top;
```

An object is live if there exists a path from any root to that object through pointer references. Dead objects have no such paths and can be safely collected.

## Mark-Sweep Collection

Mark-sweep is the classic garbage collection algorithm. It operates in two phases: mark reachable objects, then sweep through memory to reclaim unmarked objects.

### Mark Phase

The mark phase traverses the object graph starting from roots, marking each reachable object. This is typically implemented as a depth-first or breadth-first search.

```c
// Recursive mark function
void mark(Object *obj) {
    if (!obj || obj->marked)
        return;

    obj->marked = 1;

    // Recursively mark referenced objects
    mark(obj->field1);
    mark(obj->field2);
}

// Mark all reachable objects
void mark_all() {
    // Mark from global roots
    mark(global_var);

    // Mark from stack roots
    for (int i = 0; i < stack_top; i++) {
        mark(stack_vars[i]);
    }
}
```

For large heaps, recursive marking can overflow the stack. Iterative approaches using an explicit worklist avoid this:

```c
// Iterative marking with explicit worklist
void mark_iterative() {
    Object **worklist = malloc(WORKLIST_SIZE * sizeof(Object*));
    int worklist_size = 0;

    // Add roots to worklist
    for (int i = 0; i < stack_top; i++) {
        if (stack_vars[i] && !stack_vars[i]->marked) {
            worklist[worklist_size++] = stack_vars[i];
        }
    }

    // Process worklist
    while (worklist_size > 0) {
        Object *obj = worklist[--worklist_size];

        if (obj->marked)
            continue;

        obj->marked = 1;

        // Add children to worklist
        if (obj->field1 && !obj->field1->marked)
            worklist[worklist_size++] = obj->field1;
        if (obj->field2 && !obj->field2->marked)
            worklist[worklist_size++] = obj->field2;
    }

    free(worklist);
}
```

### Sweep Phase

The sweep phase scans all memory, freeing unmarked objects and clearing mark bits on marked objects.

```c
// Simple sweep through object list
void sweep() {
    Object **obj_ptr = &all_objects;

    while (*obj_ptr) {
        Object *obj = *obj_ptr;

        if (!obj->marked) {
            // Object is garbage - remove from list and free
            *obj_ptr = obj->next;
            free(obj);
        } else {
            // Object is live - clear mark for next GC
            obj->marked = 0;
            obj_ptr = &obj->next;
        }
    }
}
```

Mark-sweep has the advantage of handling cyclic data structures correctly, but it can fragment memory and requires pausing program execution during collection.

## Copying Collection

Copying collectors divide the heap into two semi-spaces: from-space and to-space. Allocation happens in from-space. During collection, live objects are copied to to-space, and the spaces are swapped. This compacts memory and eliminates fragmentation.

```c
typedef struct {
    void *from_space;
    void *to_space;
    void *alloc_ptr;    // Next allocation position
    void *scan_ptr;     // Next object to scan
    size_t space_size;
} CopyingCollector;

// Allocate in from-space
void *gc_alloc(CopyingCollector *gc, size_t size) {
    if (gc->alloc_ptr + size > gc->from_space + gc->space_size) {
        // Out of space - trigger collection
        gc_collect(gc);

        if (gc->alloc_ptr + size > gc->from_space + gc->space_size) {
            return NULL; // Still out of memory
        }
    }

    void *obj = gc->alloc_ptr;
    gc->alloc_ptr += size;
    return obj;
}

// Copy an object to to-space
Object *copy_object(CopyingCollector *gc, Object *obj) {
    if (!obj)
        return NULL;

    // Check if already copied (forwarding pointer)
    if (is_in_to_space(gc, obj->field1)) {
        return obj->field1;  // Forwarding pointer
    }

    // Copy to to-space
    Object *new_obj = gc->alloc_ptr;
    memcpy(new_obj, obj, sizeof(Object));
    gc->alloc_ptr += sizeof(Object);

    // Install forwarding pointer
    obj->field1 = new_obj;

    return new_obj;
}

// Cheney's algorithm: breadth-first copying
void gc_collect(CopyingCollector *gc) {
    // Swap spaces
    void *temp = gc->from_space;
    gc->from_space = gc->to_space;
    gc->to_space = temp;

    gc->alloc_ptr = gc->to_space;
    gc->scan_ptr = gc->to_space;

    // Copy roots
    for (int i = 0; i < stack_top; i++) {
        stack_vars[i] = copy_object(gc, stack_vars[i]);
    }

    // Scan copied objects and copy their children
    while (gc->scan_ptr < gc->alloc_ptr) {
        Object *obj = (Object *)gc->scan_ptr;

        obj->field1 = copy_object(gc, obj->field1);
        obj->field2 = copy_object(gc, obj->field2);

        gc->scan_ptr += sizeof(Object);
    }
}
```

Copying collection's main advantage is allocation speed (bump-pointer) and automatic compaction. The disadvantage is that only half the heap is usable at any time.

## Generational Collection

The generational hypothesis observes that most objects die young. Generational collectors exploit this by dividing objects into generations and collecting younger generations more frequently.

```c
typedef struct {
    void *young_space;      // Young generation
    void *old_space;        // Old generation
    size_t young_size;
    size_t old_size;
    int gc_count;
} GenerationalGC;

void *gen_alloc(GenerationalGC *gc, size_t size) {
    // Allocate in young generation
    void *obj = young_space_alloc(gc, size);

    if (!obj) {
        // Minor collection (young generation only)
        minor_collect(gc);
        obj = young_space_alloc(gc, size);
    }

    if (!obj) {
        // Major collection (all generations)
        major_collect(gc);
        obj = young_space_alloc(gc, size);
    }

    return obj;
}

void minor_collect(GenerationalGC *gc) {
    // Copy live objects from young to old generation
    for each root r {
        if (is_in_young_space(r)) {
            copy_to_old_space(gc, r);
        }
    }

    // Also scan objects in old generation that reference young
    // (remembered set optimization)
    for each old_object in remembered_set {
        scan_and_copy_young_refs(gc, old_object);
    }
}
```

Generational collection requires a write barrier to track pointers from old objects to young objects (the remembered set):

```c
// Write barrier for generational GC
void write_barrier(Object *obj, Object *value) {
    obj->field = value;

    // If old object now points to young object, record it
    if (is_in_old_space(obj) && is_in_young_space(value)) {
        add_to_remembered_set(obj);
    }
}
```

## Reference Counting

Reference counting maintains a count of pointers to each object. When the count reaches zero, the object can be immediately freed.

```c
typedef struct rc_object {
    int ref_count;
    struct rc_object *field1;
    struct rc_object *field2;
    int data;
} RCObject;

RCObject *rc_alloc() {
    RCObject *obj = malloc(sizeof(RCObject));
    obj->ref_count = 1;  // Created with one reference
    obj->field1 = NULL;
    obj->field2 = NULL;
    return obj;
}

void rc_retain(RCObject *obj) {
    if (obj)
        obj->ref_count++;
}

void rc_release(RCObject *obj) {
    if (!obj)
        return;

    obj->ref_count--;

    if (obj->ref_count == 0) {
        // Recursively release children
        rc_release(obj->field1);
        rc_release(obj->field2);
        free(obj);
    }
}

// Assignment with reference counting
void rc_assign(RCObject **dest, RCObject *value) {
    rc_retain(value);        // Retain new value first
    rc_release(*dest);       // Release old value
    *dest = value;           // Update pointer
}
```

Reference counting provides deterministic cleanup and works incrementally, but it cannot collect cycles and incurs overhead on every pointer assignment.

### Cycle Collection

To handle cycles, reference counting can be augmented with periodic cycle detection:

```c
// Simplified cycle detection
void detect_cycles() {
    // Mark phase: subtract reference counts
    for each object obj {
        for each field f in obj {
            if (f != NULL)
                f->rc_count_temp--;
        }
    }

    // Sweep phase: objects with rc_count_temp > 0 are external roots
    for each object obj {
        if (obj->rc_count_temp > 0) {
            mark_reachable(obj);
        }
    }

    // Collect unmarked objects
    for each object obj {
        if (!obj->marked) {
            collect(obj);
        }
    }
}
```

## Incremental and Concurrent Collection

To reduce pause times, garbage collectors can run incrementally (interleaved with program execution) or concurrently (on separate threads).

Incremental collection requires a write barrier to track modifications during collection:

```c
// Tri-color marking for incremental GC
// White: not visited, Black: visited with all children visited
// Gray: visited but children not yet scanned

void incremental_mark_step(int work_units) {
    while (work_units-- > 0 && gray_list) {
        Object *obj = pop_gray();

        // Scan children
        if (obj->field1 && is_white(obj->field1)) {
            mark_gray(obj->field1);
        }
        if (obj->field2 && is_white(obj->field2)) {
            mark_gray(obj->field2);
        }

        mark_black(obj);
    }
}

// Write barrier for incremental GC
void incremental_write_barrier(Object *obj, Object *value) {
    obj->field = value;

    // If black object now points to white object, mark it gray
    if (is_black(obj) && is_white(value)) {
        mark_gray(value);
    }
}
```

## Key Takeaways

- Garbage collection automates memory management by reclaiming unreachable objects, eliminating manual memory management bugs.
- Mark-sweep collection traces from roots to mark live objects, then sweeps to reclaim unmarked objects.
- Copying collection copies live objects to a new space, providing automatic compaction and fast allocation.
- Generational collection exploits the generational hypothesis by collecting short-lived objects more frequently.
- Reference counting provides immediate reclamation and deterministic cleanup but cannot handle cycles without additional mechanisms.
- Incremental and concurrent collection techniques reduce pause times by spreading collection work over time or running it in parallel.
- All garbage collection strategies involve tradeoffs between throughput, pause times, memory overhead, and implementation complexity.
