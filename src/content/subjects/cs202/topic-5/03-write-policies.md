# Cache Write Policies

Handling writes in a cache is more complex than reads because we must maintain consistency between the cache and main memory. Different write policies offer trade-offs between performance, complexity, and consistency.

## The Write Problem

When the CPU writes data:
1. Should we update the cache only, or also main memory?
2. If the block isn't in the cache, should we bring it in?

These decisions define the cache's **write policy**.

## Write-Through vs Write-Back

### Write-Through

**Every write goes to both cache AND main memory.**

```
CPU Write
    │
    ▼
┌───────────────┐
│    Cache      │ ─────────► Update cache
└───────────────┘
         │
         ▼
┌───────────────┐
│ Main Memory   │ ─────────► Also update memory
└───────────────┘
```

**Advantages**:
- Memory always consistent with cache
- Simple cache coherence (for multiprocessors)
- Cache block can be discarded without write-back

**Disadvantages**:
- Every write goes to slow memory
- Consumes memory bandwidth
- Write latency equals memory latency

### Write Buffer

To mitigate write-through's latency, use a **write buffer**:

```
CPU Write
    │
    ├──────────► Update cache
    │
    ▼
┌───────────────┐
│ Write Buffer  │ ─── Drain to memory in background
│   (queue)     │
└───────────────┘
```

- CPU continues without waiting for memory
- Buffer drains writes to memory
- Stall only if buffer is full

### Write-Back

**Write only to cache; update memory later when block is evicted.**

```
CPU Write
    │
    ▼
┌───────────────┐
│    Cache      │ ─────────► Update cache
│  (dirty bit)  │            Mark block as dirty
└───────────────┘

Later, on eviction:
┌───────────────┐
│    Cache      │ ─────────► If dirty, write to memory
└───────────────┘
         │
         ▼
┌───────────────┐
│ Main Memory   │
└───────────────┘
```

**Dirty bit**: Each cache line has a bit indicating if it's been modified.

**Advantages**:
- Multiple writes to same block only hit memory once
- Reduces memory bandwidth
- Lower write latency (write to fast cache)

**Disadvantages**:
- Memory and cache can be inconsistent
- More complex cache coherence
- Must write back dirty blocks on eviction

### Comparison

| Aspect | Write-Through | Write-Back |
|--------|---------------|------------|
| Memory traffic | High | Low |
| Write latency | High (without buffer) | Low |
| Consistency | Always consistent | Inconsistent until eviction |
| Complexity | Simple | More complex |
| Common use | L1 (some systems) | L2, L3 (most systems) |

## Write-Allocate vs No-Write-Allocate

When a write misses the cache, do we fetch the block?

### Write-Allocate (Fetch-on-Write)

**On write miss: Fetch block to cache, then write.**

```
Write Miss
    │
    ▼
Fetch block from memory
    │
    ▼
Write data to cache
```

**Rationale**: Exploit spatial locality. If writing to this block, we might read/write nearby bytes soon.

### No-Write-Allocate (Write-Around)

**On write miss: Write directly to memory, don't fetch.**

```
Write Miss
    │
    ▼
Write directly to memory (bypass cache)
```

**Rationale**: If we're not reading this block, why fill the cache with it?

### Common Combinations

| Write Policy | Miss Policy | Common Name |
|--------------|-------------|-------------|
| Write-through | No-write-allocate | Write-through |
| Write-back | Write-allocate | Write-back |

The combinations make sense:
- Write-through already writes to memory, no need to cache on miss
- Write-back benefits from having the block in cache for future writes

## Write Miss Handling

### Write-Allocate Process

1. Read block from memory (like a read miss)
2. Write the new data to appropriate bytes
3. Mark block as valid (and dirty for write-back)

```
Address: 0x1234, writing byte
┌─────────────────────────────────────────────┐
│ Block from memory: [A][B][C][D][E][F][G][H] │
└─────────────────────────────────────────────┘
                          │
                          ▼ Write 'X' at offset 4
┌─────────────────────────────────────────────┐
│ Block in cache:     [A][B][C][D][X][F][G][H] │
└─────────────────────────────────────────────┘
```

### Write Buffer Operation

```
┌────────────────────────────────────────────────────────┐
│                   Write Buffer                          │
├──────────────┬──────────────┬───────────────┬──────────┤
│    Entry 0   │    Entry 1   │    Entry 2    │  Entry 3 │
│  Addr | Data │  Addr | Data │  Addr | Data  │   Empty  │
├──────────────┼──────────────┼───────────────┼──────────┤
│ 0x100 | 42   │ 0x200 | 17   │ 0x108 | 99    │          │
└──────────────┴──────────────┴───────────────┴──────────┘
       ▲                                            │
       │                                            │
    New writes                              Drain to memory
       │                                            │
      CPU                                        Memory
```

**Write buffer considerations**:
- Buffer full → CPU must stall
- Check buffer on reads (might have newer data than cache!)
- Coalesce writes to same block when possible

## Write Coalescing

Combine multiple writes to the same block:

```
Write 0x100, byte 0: A
Write 0x101, byte 1: B
Write 0x102, byte 2: C

Without coalescing: 3 separate memory writes
With coalescing: 1 memory write with [A][B][C]
```

Reduces memory bandwidth and improves efficiency.

## Cache Coherence Preview

Write-back caches complicate multiprocessor systems:

```
CPU 0 Cache: x = 5 (dirty)
CPU 1 Cache: x = 3 (stale!)
Memory: x = 3

CPU 1 reads x → gets wrong value!
```

Solutions (covered in advanced courses):
- Snooping protocols (watch bus for writes)
- Directory-based protocols (track which caches have data)
- Write-through (simpler but less efficient)

## Modern Cache Write Policies

**Typical L1 configuration**:
- Write-back or write-through (varies)
- Write-allocate
- Small write buffer

**Typical L2/L3 configuration**:
- Write-back
- Write-allocate
- Inclusive or exclusive policy with L1

## Performance Impact

**Write-back benefits**:
```
Consider: 100 writes to same word

Write-through: 100 memory writes
Write-back: 1 memory write (on eviction)

Memory bandwidth saved: 99×!
```

**Write-allocate benefits**:
```
Consider: Writing an array sequentially

No-write-allocate: Every write goes to memory
Write-allocate: First write fetches block, subsequent writes hit cache

With 64-byte blocks, 8-byte writes:
Write-allocate: 1 miss + 7 hits = 87.5% hit rate
```

## Key Takeaways

- Write-through sends all writes to memory (simple but high bandwidth)
- Write-back writes only to cache, updates memory on eviction (efficient)
- Dirty bit tracks whether block needs write-back
- Write-allocate fetches block on write miss (exploits spatial locality)
- No-write-allocate bypasses cache on write miss
- Write buffers hide write-through latency
- Write coalescing combines multiple writes to same block
- Write-back is standard for L2/L3 due to bandwidth efficiency
- Write policies impact cache coherence in multiprocessor systems
