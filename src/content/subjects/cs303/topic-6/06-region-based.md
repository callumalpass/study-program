# Region-Based Memory Management

Region-based memory management (also called arena allocation) groups allocations with similar lifetimes into regions that are deallocated together. This approach combines manual control with bulk deallocation, offering better performance and safety characteristics than individual malloc/free while avoiding garbage collection overhead.

## The Region Concept

A region is a memory area where many objects are allocated. Instead of freeing objects individually, the entire region is deallocated at once. This is efficient when groups of objects share the same lifetime.

```c
typedef struct Region {
    char* memory;
    size_t size;
    size_t used;
    struct Region* next;  // For growing regions
} Region;

Region* create_region(size_t size) {
    Region* r = malloc(sizeof(Region));
    r->memory = malloc(size);
    r->size = size;
    r->used = 0;
    r->next = NULL;
    return r;
}

void* region_alloc(Region* r, size_t size) {
    // Align size to 8 bytes
    size = (size + 7) & ~7;

    if (r->used + size > r->size) {
        // Region full - allocate new chunk
        Region* new_chunk = create_region(max(r->size * 2, size));
        new_chunk->next = r->next;
        r->next = new_chunk;
        return region_alloc(new_chunk, size);
    }

    void* ptr = r->memory + r->used;
    r->used += size;
    return ptr;
}

void destroy_region(Region* r) {
    while (r) {
        Region* next = r->next;
        free(r->memory);
        free(r);
        r = next;
    }
}
```

Usage:
```c
void process_request() {
    Region* r = create_region(4096);

    // Allocate many objects
    for (int i = 0; i < 1000; i++) {
        Data* d = region_alloc(r, sizeof(Data));
        // use d
    }

    // Free everything at once
    destroy_region(r);
}
```

This is orders of magnitude faster than 1000 malloc/free calls.

## Applications and Use Cases

Region-based management excels when allocation lifetimes match logical phases:

**Request Processing**: Web servers allocating data per request.
```c
void handle_request(Request* req) {
    Region* request_arena = create_region(8192);

    // Parse request - allocations in arena
    ParsedRequest* parsed = parse(req, request_arena);

    // Process - more allocations
    Response* resp = process(parsed, request_arena);

    // Send response
    send_response(resp);

    // Free all request data at once
    destroy_region(request_arena);
}
```

**Compiler Phases**: Each compilation phase uses its own region.
```c
void compile(SourceFile* file) {
    Region* parse_region = create_region(1024 * 1024);
    AST* ast = parse(file, parse_region);

    Region* typecheck_region = create_region(512 * 1024);
    TypedAST* typed = typecheck(ast, typecheck_region);

    Region* codegen_region = create_region(2048 * 1024);
    Code* code = generate_code(typed, codegen_region);

    output_code(code);

    destroy_region(codegen_region);
    destroy_region(typecheck_region);
    destroy_region(parse_region);
}
```

**Game Frame Allocation**: Allocate per-frame temporary data.
```c
void game_loop() {
    while (running) {
        Region* frame_arena = create_region(1024 * 1024);

        update_game(frame_arena);
        render_frame(frame_arena);

        destroy_region(frame_arena);  // Clear frame data
    }
}
```

**Parser/Interpreter Temporary Data**: Parse tree nodes allocated in region.

## Nested Regions and Hierarchies

Regions can be nested, creating hierarchies that match program structure:

```c
typedef struct RegionStack {
    Region** regions;
    size_t count;
    size_t capacity;
} RegionStack;

void push_region(RegionStack* stack, size_t size) {
    Region* r = create_region(size);
    stack->regions[stack->count++] = r;
}

void pop_region(RegionStack* stack) {
    destroy_region(stack->regions[--stack->count]);
}

void* current_alloc(RegionStack* stack, size_t size) {
    return region_alloc(stack->regions[stack->count - 1], size);
}
```

Usage:
```c
RegionStack regions;

void outer_function() {
    push_region(&regions, 4096);

    Data* d1 = current_alloc(&regions, sizeof(Data));

    inner_function();

    Data* d2 = current_alloc(&regions, sizeof(Data));

    pop_region(&regions);  // Frees d1, d2, and inner_function's allocations
}

void inner_function() {
    push_region(&regions, 2048);

    Temp* t = current_alloc(&regions, sizeof(Temp));
    // use t

    pop_region(&regions);  // Frees t
}
```

This provides stack-like discipline for heap allocation.

## Region Types and Safety

Type systems can enforce correct region usage:

**Cyclone Language**: Statically-checked regions.
```cyclone
region<r> {
    int* @region(r) x = rmalloc(r, sizeof(int));
    *x = 42;
    // x cannot escape region r
}
// Region r and x automatically deallocated
```

The type system ensures:
- Pointers cannot outlive their region
- Regions deallocated in LIFO order
- No dangling pointers

**Rust-style Lifetimes** for regions:
```rust
struct Region<'r> {
    // Region with lifetime 'r
}

fn allocate<'r>(region: &Region<'r>) -> &'r Data {
    // Allocated data has same lifetime as region
}
```

The compiler tracks lifetimes to prevent use-after-free.

## Region Inference

Advanced type systems can automatically infer regions:

```
// Programmer writes:
let x = allocate();
use(x);

// Compiler infers:
region r {
    let x = allocate_in(r);
    use(x);
} // r deallocated
```

The MLKit compiler for Standard ML pioneered region inference, automatically placing allocations in appropriate regions.

## Advantages of Region-Based Management

**Performance**:
- Allocation is bump-pointer (very fast)
- Deallocation is bulk (O(1) for entire region)
- No per-object metadata or free lists
- Excellent cache locality (objects allocated together)

**Predictability**:
- No GC pauses
- Deterministic deallocation timing
- Memory usage bounded by region size

**Safety** (with type system support):
- No dangling pointers (statically verified)
- No memory leaks within region discipline
- No use-after-free

**Simplicity**:
- Simple implementation
- Easy to understand and reason about
- Works with existing code (C compatible)

## Disadvantages and Limitations

**Inflexibility**:
- All objects in region freed together
- Cannot free individual objects
- Poor fit for data with diverse lifetimes

**Memory Waste**:
- Short-lived objects keep region alive
- Unused region space is wasted

```c
Region* r = create_region(1MB);

LongLived* ll = region_alloc(r, 100);  // Needs to live long

for (int i = 0; i < 1000; i++) {
    Temp* t = region_alloc(r, 1000);  // Dies immediately
    use(t);
}

// Can't free region while ll is alive
// Temporary allocations waste space
```

**Requires Discipline**:
- Programmer must structure code around lifetimes
- May force awkward designs
- Not a silver bullet for all scenarios

## Hybrid Approaches

Combining regions with other techniques:

**Regions + GC**: Use regions for bulk allocations, GC for complex lifetimes.
```c
void process() {
    Region* r = create_region(4096);

    // Fast temporary allocations
    Data* temp = region_alloc(r, sizeof(Data));

    // Complex lifetime - use GC
    Object* obj = gc_malloc(sizeof(Object));
    register_with_gc(obj);

    destroy_region(r);
}
```

**Regions + Reference Counting**: Regions for bulk, RC for shared objects.

**Regions + Ownership Types**: Rust-style ownership with arena backing store.

## Implementation Optimizations

**Large Object Handling**: Allocate large objects separately.
```c
void* region_alloc(Region* r, size_t size) {
    if (size > LARGE_THRESHOLD) {
        // Allocate separately, track for later freeing
        return large_alloc(r, size);
    }
    // Normal bump allocation
}
```

**Region Pools**: Reuse regions rather than allocating new ones.
```c
Region* region_pool = NULL;

Region* get_region(size_t size) {
    if (region_pool) {
        Region* r = region_pool;
        region_pool = r->next;
        r->used = 0;  // Reset
        return r;
    }
    return create_region(size);
}

void return_region(Region* r) {
    r->next = region_pool;
    region_pool = r;
}
```

**Growing Regions**: Automatically expand when full.
```c
void* region_alloc_growing(Region* r, size_t size) {
    if (r->used + size > r->size) {
        size_t new_size = max(r->size * 2, r->used + size);
        r->memory = realloc(r->memory, new_size);
        r->size = new_size;
    }

    void* ptr = r->memory + r->used;
    r->used += size;
    return ptr;
}
```

## Real-World Systems

**Apache HTTP Server**: Uses memory pools for per-request allocation.

**PostgreSQL**: Memory contexts (regions) for query processing.

**LLVM**: BumpPtrAllocator for compiler data structures.

**Rust's bumpalo**: Arena allocator crate for Rust.

**Redis**: Region-based allocation for command processing.

These systems demonstrate region-based management's effectiveness for real-world applications where allocation patterns match the region model.

## When to Use Regions

Good fit:
- Phase-oriented processing
- Request/response servers
- Compilers and interpreters
- Game engines (per-frame data)
- Parsers with temporary ASTs

Poor fit:
- Long-lived complex data structures
- Unpredictable object lifetimes
- Shared ownership across regions
- Interactive applications with persistent state

Region-based management is a powerful tool when applied appropriately, offering performance and predictability that's hard to achieve with either manual or automatic garbage collection alone.
