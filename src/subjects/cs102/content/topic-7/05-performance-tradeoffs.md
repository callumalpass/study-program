---
id: cs102-t7-performance-tradeoffs
title: "Performance Tradeoffs"
order: 5
---

# Performance Tradeoffs Across the Memory Hierarchy

Understanding computer performance requires looking beyond instruction counts and clock speeds. The memory hierarchy—from registers down to disk—dominates real-world performance. Programs with identical big-O complexity can differ by orders of magnitude in actual runtime depending on how well they use the hierarchy. This topic synthesizes what we've learned about caches, virtual memory, and I/O into practical performance principles.

## The Memory Hierarchy Revisited

Every level of the hierarchy trades off size, speed, and cost:

```
Level         Latency       Size          Cost/GB
─────────────────────────────────────────────────
Registers     <1 ns         ~KB           —
L1 Cache      ~1-4 ns       32-64 KB      —
L2 Cache      ~12 ns        256 KB - 1 MB —
L3 Cache      ~40 ns        4-50 MB       —
Main Memory   ~100 ns       4-128 GB      ~$5
SSD           ~50 μs        250 GB - 4 TB ~$0.10
HDD           ~10 ms        1-16 TB       ~$0.02
Network       varies        unlimited     varies
```

The key insight: each level is roughly 10-100× slower than the one above it. Accessing disk instead of cache can be a million times slower. This means performance-critical code must keep data in the fastest level possible.

## Latency vs Bandwidth

Two fundamentally different metrics describe memory performance:

### Latency

**Latency** is the time to complete a single operation—the delay from request to first byte of response.

Examples:
- L1 cache read latency: 4 cycles (~1 ns)
- Main memory latency: ~100 ns
- SSD random read latency: ~50 μs
- HDD seek latency: ~10 ms

Latency dominates when:
- Accessing small, scattered data (random access)
- Dependent operations (each operation waits for the previous)
- Many small I/O operations

### Bandwidth

**Bandwidth** is the rate of data transfer once streaming—bytes per second.

Examples:
- L1 cache bandwidth: 500+ GB/s
- Main memory bandwidth: 25-50 GB/s
- NVMe SSD sequential: 3-7 GB/s
- HDD sequential: 100-200 MB/s

Bandwidth dominates when:
- Transferring large blocks of data
- Sequential access patterns
- Bulk I/O operations

### The Connection

For large transfers, **effective rate = size / (latency + size/bandwidth)**.

For small requests, latency dominates (you spend most time waiting, not transferring).
For large requests, bandwidth dominates (transfer time exceeds setup time).

Example: Reading 4 KB from an SSD
- Latency: 50 μs
- Bandwidth: 3 GB/s
- Transfer time: 4 KB / 3 GB/s ≈ 1.3 μs
- Total time: 50 μs + 1.3 μs ≈ 51.3 μs

Latency (50 μs) dominates the transfer time (1.3 μs). This is why SSDs are transformative for random access but not dramatically faster than HDDs for sequential bulk transfers.

## Why Big-O Isn't the Whole Story

Algorithm complexity analysis assumes all operations take constant time. In reality:

```
Memory access:     1-1,000,000+ cycles depending on level
Branch misprediction: 10-20 cycles penalty
Cache miss:        50-200 cycles penalty
Page fault:        millions of cycles
```

Two O(n) algorithms can have vastly different performance based on memory access patterns.

### Example: Array vs Linked List

Both support O(1) access to the next element:

```c
// Array traversal - cache friendly
for (int i = 0; i < n; i++) {
    sum += array[i];  // Sequential access
}

// Linked list traversal - cache hostile
for (Node* p = head; p != NULL; p = p->next) {
    sum += p->value;  // Pointer chasing
}
```

Array performance:
- `array[0]` causes cache miss; loads 64 bytes into cache
- `array[1]` through `array[15]` all hit in cache (spatial locality)
- 1 miss per 16 elements → ~6% miss rate

Linked list performance:
- Each node may be anywhere in memory
- Every access could be a cache miss
- Up to 100% miss rate if nodes are scattered

With 100ns per miss, the linked list could be 16× slower despite identical big-O complexity.

### Example: Matrix Multiplication Order

Consider accessing a 2D array stored in row-major order:

```c
// Row-major access - cache friendly
for (int i = 0; i < N; i++)
    for (int j = 0; j < N; j++)
        sum += matrix[i][j];  // Adjacent elements

// Column-major access - cache hostile
for (int j = 0; j < N; j++)
    for (int i = 0; i < N; i++)
        sum += matrix[i][j];  // Stride of N elements
```

For a large matrix, column-major traversal accesses elements separated by N × sizeof(element) bytes. If N is large, every access misses, because the cache line loaded for `matrix[0][0]` is evicted before we return to access `matrix[0][1]`.

The row-major version can be 10-50× faster for large matrices.

## Practical Performance Principles

### Principle 1: Prefer Sequential Access

Sequential access exploits spatial locality. The hardware prefetcher recognizes sequential patterns and fetches data before you need it.

Good:
```c
for (int i = 0; i < n; i++)
    process(data[i]);
```

Bad:
```c
for (int i = 0; i < n; i++)
    process(data[random() % n]);  // Random access
```

### Principle 2: Keep Working Set Small

If your active data fits in cache, you get cache-speed performance. If it exceeds cache size, you pay memory-speed penalties.

Techniques:
- **Blocking/tiling**: Process data in cache-sized chunks
- **Data structure selection**: Choose compact representations
- **Avoid unnecessary data**: Don't load what you won't use

### Principle 3: Prefer Contiguous Data Structures

Arrays outperform pointer-based structures for sequential access:

| Structure | Sequential | Random | Insert/Delete |
|-----------|------------|--------|---------------|
| Array     | Excellent  | Good   | Poor (O(n))   |
| Linked list | Poor     | Poor   | Excellent     |
| Hash table | —         | Good   | Good          |

If you iterate frequently, arrays (or vectors) usually win despite poor theoretical insert complexity.

### Principle 4: Batch Operations

Amortize latency by doing more work per operation:

Bad:
```c
for (int i = 0; i < 1000; i++) {
    write(fd, &data[i], sizeof(int));  // 1000 system calls
}
```

Good:
```c
write(fd, data, 1000 * sizeof(int));  // 1 system call
```

Each system call has overhead (context switch, kernel entry). Batching amortizes this overhead.

### Principle 5: Avoid Unnecessary Indirection

Each pointer dereference is a potential cache miss:

```c
// Three potential misses
result = obj->table->entries[i]->value;
```

Consider:
- Embedding data instead of pointing to it
- Using indices into arrays instead of pointers
- Flattening nested structures

### Principle 6: Be Aware of Page and Cache Line Boundaries

Accessing data that spans boundaries causes extra operations:

- **Cache line splits**: Accessing a 4-byte int that crosses a 64-byte boundary requires loading two cache lines
- **Page splits**: Similar problem at 4 KB page boundaries
- **Alignment**: Keep structures aligned to avoid splits

Most compilers handle alignment automatically, but be aware when using packed structures or manual memory layouts.

## Profiling and Measurement

Theory guides optimization, but measurement confirms it.

### Hardware Performance Counters

Modern CPUs track events like:
- Cache hits/misses at each level
- TLB hits/misses
- Branch predictions/mispredictions
- Instructions per cycle (IPC)

Tools: `perf` (Linux), Intel VTune, AMD uProf

Example `perf` command:
```bash
perf stat -e cache-misses,cache-references ./myprogram
```

### Profiling Cache Behavior

```bash
perf stat -e L1-dcache-loads,L1-dcache-load-misses ./myprogram
```

Output might show:
```
1,000,000,000 L1-dcache-loads
    50,000,000 L1-dcache-load-misses  # 5% miss rate
```

A 5% miss rate sounds small, but if misses cost 50 cycles each, they double your average access time.

### Memory Bandwidth Measurement

For bandwidth-bound code, check if you're near hardware limits:
- Theoretical max: Check CPU specs
- Achievable max: Run STREAM benchmark
- Your code: Profile memory throughput

If you're at 80%+ of achievable bandwidth, optimization must reduce data movement, not just access pattern.

## Common Anti-Patterns

### Anti-Pattern: Premature Pointer Chasing

Building linked structures when arrays would work:
```c
// Slow: pointer chasing on every access
struct Node { int value; struct Node* next; };

// Fast: contiguous memory, sequential access
int values[N];
```

### Anti-Pattern: Cold Functions in Hot Loops

```c
for (int i = 0; i < n; i++) {
    if (unlikely_condition)      // Rarely true
        handle_special_case(i);  // Large function
    data[i]++;                   // Common case
}
```

The large `handle_special_case` function may evict hot code from instruction cache even if it's rarely called. Move rare code to a separate function marked as unlikely/cold.

### Anti-Pattern: Unnecessary Heap Allocation

```c
// Slow: heap allocation per iteration
for (int i = 0; i < n; i++) {
    int* temp = malloc(sizeof(int));
    *temp = compute(i);
    process(temp);
    free(temp);
}

// Fast: stack allocation
for (int i = 0; i < n; i++) {
    int temp = compute(i);
    process(&temp);
}
```

Heap allocation involves system calls, fragmentation overhead, and cache pollution.

### Anti-Pattern: False Sharing

In multithreaded code, data accessed by different threads on the same cache line causes cache line bouncing:

```c
// Bad: counters likely share a cache line
int counter[NUM_THREADS];  // 4 bytes each, packed together

// Good: pad to separate cache lines
struct PaddedCounter {
    int value;
    char padding[60];  // Ensure 64-byte spacing
} counter[NUM_THREADS];
```

## Summary: A Mental Model for Performance

1. **Registers are free** (already have the data)
2. **L1 cache is cheap** (~4 cycles, usually hit)
3. **L2/L3 cache is affordable** (~12-40 cycles)
4. **Memory is expensive** (~100-200 cycles per miss)
5. **SSD is very expensive** (~50,000 cycles)
6. **HDD is catastrophic** (~10,000,000 cycles)

Optimize by:
1. Minimizing data movement distance
2. Maximizing locality (temporal and spatial)
3. Batching operations to amortize latency
4. Measuring to find actual bottlenecks

## Key Takeaways

- The memory hierarchy spans 6+ orders of magnitude in latency.
- **Latency** dominates small, random accesses; **bandwidth** dominates large, sequential transfers.
- **Big-O analysis ignores constant factors** that can be 10-100× differences in practice.
- **Sequential access** exploits spatial locality and hardware prefetching.
- **Working set size** determines whether your code runs at cache speed or memory speed.
- **Contiguous data structures** (arrays) outperform pointer-based structures for iteration.
- **Batching** amortizes per-operation overhead (system calls, latency).
- **Measurement is essential**—use profilers and hardware counters to find actual bottlenecks.
- Common anti-patterns: pointer chasing, unnecessary allocation, false sharing, poor traversal order.
- Understanding the memory hierarchy transforms abstract algorithms into efficient programs.

