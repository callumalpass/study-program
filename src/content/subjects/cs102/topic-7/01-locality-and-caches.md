# Locality and Caches

The speed gap between CPUs and main memory is one of the defining challenges in computer architecture. While processor speeds have increased dramatically over the decades, memory latency has improved much more slowly. This "memory wall" means that a modern CPU could be waiting hundreds of cycles for data to arrive from RAM—time when the processor sits idle. Caches exist to bridge this gap by keeping frequently used data close to the CPU where it can be accessed quickly.

## The Memory Speed Problem

Consider the numbers: a modern CPU can execute instructions in fractions of a nanosecond, but accessing main memory takes roughly 50-100 nanoseconds. That's a ratio of 100:1 or worse. If every instruction required a memory access at main memory speeds, the processor would spend most of its time waiting.

The solution is a **memory hierarchy**—a series of increasingly larger but slower storage levels:

```
Registers    → ~1 cycle      (bytes)
L1 Cache     → ~4 cycles     (32-64 KB)
L2 Cache     → ~12 cycles    (256 KB - 1 MB)
L3 Cache     → ~40 cycles    (several MB)
Main Memory  → ~200 cycles   (GB)
Storage      → millions of cycles (TB)
```

Each level acts as a cache for the level below it. The key insight is that we don't need all data to be fast—we just need the data we're currently using to be fast.

## The Principle of Locality

Caches work because programs don't access memory randomly. Instead, memory access patterns exhibit **locality**—predictable clustering that allows caches to anticipate what data will be needed.

### Temporal Locality

**Temporal locality** means that if you accessed a memory location recently, you're likely to access it again soon. This happens constantly in programs:

- **Loop counters**: A loop variable is read and written every iteration
- **Hot variables**: Frequently used variables in tight loops
- **Stack data**: Local variables and return addresses
- **Instructions**: The same code executes repeatedly in loops

Example:
```c
// sum is accessed 1000 times
int sum = 0;
for (int i = 0; i < 1000; i++) {
    sum += array[i];
}
```

The variable `sum` exhibits strong temporal locality—it's accessed on every iteration. Once `sum` is in the cache, subsequent accesses are fast.

### Spatial Locality

**Spatial locality** means that if you accessed a memory location, you're likely to access nearby locations soon. This pattern emerges from:

- **Sequential instruction execution**: Code runs through consecutive addresses
- **Array traversal**: Processing array elements in order
- **Structure access**: Accessing multiple fields of the same struct
- **Stack operations**: Push/pop operations use nearby stack addresses

Example:
```c
// array[0], array[1], array[2]... accessed in sequence
for (int i = 0; i < 1000; i++) {
    sum += array[i];
}
```

Each array element is adjacent in memory. When `array[0]` is fetched, nearby elements (`array[1]`, `array[2]`, etc.) are likely to be needed soon.

### Why Locality Matters

Without locality, caching wouldn't work. If every memory access were to a completely random location, the cache would constantly miss—data fetched would never be reused before being evicted. Locality makes the cache's predictions accurate enough to be useful.

## Cache Fundamentals

A cache is a small, fast memory that stores copies of data from main memory. When the CPU needs data, it checks the cache first.

### Cache Lines (Blocks)

Caches don't store individual bytes—they store fixed-size chunks called **cache lines** or **blocks**. A typical cache line is 64 bytes.

Why blocks instead of bytes?
- **Exploits spatial locality**: When you access one byte, the entire block (including neighboring bytes) is fetched
- **Reduces overhead**: Managing metadata for 64-byte blocks requires far less hardware than managing individual bytes
- **Matches memory bus**: Memory systems transfer data in chunks; fetching a block isn't much slower than fetching a byte

When you access `array[0]`, the cache fetches a 64-byte block containing `array[0]` through `array[15]` (assuming 4-byte integers). Subsequent accesses to `array[1]`, `array[2]`, etc. hit in the cache.

### Cache Hits and Misses

When the CPU requests an address:

**Cache Hit**: The data is found in the cache. The data is returned quickly (in a few cycles). This is the common case when locality holds.

**Cache Miss**: The data is not in the cache. The cache must fetch the data from the next level (L2, L3, or main memory). This takes much longer—possibly 100+ cycles for a miss that goes all the way to RAM.

The **hit rate** is the fraction of accesses that hit in the cache. A 95% hit rate means 95 out of 100 accesses are served from the cache. Even small improvements in hit rate can significantly impact performance because misses are so expensive.

### Cache Structure

A cache contains multiple cache lines, each consisting of:

- **Valid bit**: Indicates whether this line contains valid data
- **Tag**: Part of the memory address, used to identify which block is stored here
- **Data**: The actual cached bytes (e.g., 64 bytes)
- **Dirty bit** (for write-back caches): Indicates if the cached data has been modified

When the CPU requests an address, the cache:
1. Extracts the tag from the address
2. Looks up the appropriate cache location
3. Compares tags to see if the requested data is present
4. Returns data on hit, or initiates a fetch on miss

## Cache Levels

Modern systems have multiple cache levels, forming a hierarchy:

### L1 Cache

The **L1 cache** is closest to the CPU core and is the fastest cache. It's also the smallest, typically 32-64 KB split between data and instructions:

- **L1d**: Data cache (for loads and stores)
- **L1i**: Instruction cache (for fetching instructions)

L1 access takes about 4 cycles. The small size is necessary to achieve this speed—larger caches require more time to search.

### L2 Cache

The **L2 cache** is larger (256 KB - 1 MB) and slower (about 12 cycles). It's usually unified (holding both data and instructions) and private to each CPU core.

L2 acts as a victim cache for L1—when data is evicted from L1, it often ends up in L2.

### L3 Cache

The **L3 cache** is larger still (several MB) and shared among all cores on a chip. Access takes about 40 cycles.

L3's shared nature means it can help with data sharing between cores, but also introduces contention when multiple cores compete for cache space.

### Inclusive vs Exclusive

Cache hierarchies can be:
- **Inclusive**: L2 contains copies of everything in L1; L3 contains copies of everything in L2
- **Exclusive**: Each level holds different data; evictions from L1 move to L2

Inclusive caches simplify coherence (checking if data exists) but waste space storing duplicates. Exclusive caches maximize effective capacity but complicate lookup.

## Write Policies

When the CPU writes to a cached address, the cache must decide how to handle the write:

### Write-Through

**Write-through** writes data to both the cache and main memory immediately. Every write goes to memory.

- Advantage: Memory always has current data; simpler to reason about
- Disadvantage: Writes are slow; memory bus becomes a bottleneck

### Write-Back

**Write-back** writes data only to the cache, marking the line as "dirty." The data is written to memory only when the line is evicted.

- Advantage: Multiple writes to the same location only require one memory write
- Disadvantage: Memory may have stale data; eviction is more complex

Write-back is more common in modern systems because it significantly reduces memory traffic.

### Write Allocation

On a write miss (writing to an address not in the cache):
- **Write-allocate**: Fetch the block into the cache, then write to it
- **No-write-allocate**: Write directly to memory without caching

Write-allocate pairs well with write-back (since future writes will hit), while no-write-allocate pairs with write-through.

## Measuring Cache Effectiveness

### Hit Rate and Miss Rate

**Hit rate** = (cache hits) / (total accesses)
**Miss rate** = (cache misses) / (total accesses) = 1 - hit rate

A 99% hit rate sounds excellent, but if the 1% misses cost 100x more than hits, misses account for about half of total memory access time.

### Average Memory Access Time (AMAT)

AMAT = Hit Time + (Miss Rate × Miss Penalty)

Example:
- Hit time: 4 cycles
- Miss rate: 5%
- Miss penalty: 100 cycles

AMAT = 4 + (0.05 × 100) = 4 + 5 = 9 cycles

The misses double the average access time despite being only 5% of accesses.

## Key Takeaways

- The **memory wall** (CPU-memory speed gap) necessitates caching.
- **Temporal locality**: Recently used data will likely be used again soon.
- **Spatial locality**: Data near recently used addresses will likely be used soon.
- Caches store data in **cache lines** (typically 64 bytes) to exploit spatial locality.
- **Cache hits** are fast (a few cycles); **cache misses** are slow (100+ cycles).
- Modern systems have **multiple cache levels** (L1, L2, L3) with increasing size and latency.
- **Write policies** (write-through vs write-back) determine when modified data reaches memory.
- **AMAT** combines hit time, miss rate, and miss penalty to measure cache effectiveness.
- Caches work because programs exhibit locality—without locality, caches would be useless.

