---
id: cs202-t5-opt
title: "Cache Optimization"
order: 6
---

# Cache Optimization Techniques

Improving cache performance involves both hardware techniques (built into the processor) and software techniques (compiler and programmer optimizations). This section covers the most important strategies for reducing miss rate, miss penalty, and hit time.

## Categories of Optimization

The three performance targets:

1. **Reduce miss rate**: Fewer misses = fewer slow memory accesses
2. **Reduce miss penalty**: When misses occur, handle them faster
3. **Reduce hit time**: Make cache hits even faster

## Reducing Miss Rate

### Larger Block Size

Fetching more data per miss exploits spatial locality:

```
Block Size    Miss Rate    Memory Traffic
16 bytes      10%          High per miss, fewer misses
32 bytes      7%           Better balance
64 bytes      5%           Common choice
128 bytes     4%           Diminishing returns
256 bytes     4.5%         Too large—wasted bandwidth
```

**Trade-off**: Larger blocks increase transfer time and may bring unused data.

### Higher Associativity

More places for each block reduces conflicts:

```
8-way vs. Direct-mapped: ~40% fewer misses
4-way vs. Direct-mapped: ~30% fewer misses
2-way vs. Direct-mapped: ~20% fewer misses
```

**Trade-off**: Higher associativity increases hit time and hardware cost.

### Compiler Optimizations

#### Loop Interchange

Change loop nesting to match memory layout:

```c
// Before: Poor spatial locality (column access)
for (j = 0; j < N; j++)
    for (i = 0; i < N; i++)
        x += A[i][j];  // Stride = N elements

// After: Good spatial locality (row access)
for (i = 0; i < N; i++)
    for (j = 0; j < N; j++)
        x += A[i][j];  // Stride = 1 element
```

#### Loop Fusion

Combine loops to reuse data while in cache:

```c
// Before: Two passes over array, may not fit in cache
for (i = 0; i < N; i++) A[i] = B[i] + 1;
for (i = 0; i < N; i++) C[i] = A[i] * 2;

// After: Single pass, each element used while in cache
for (i = 0; i < N; i++) {
    A[i] = B[i] + 1;
    C[i] = A[i] * 2;
}
```

#### Blocking (Tiling)

Process data in cache-sized chunks:

```c
// Before: Full matrix operations exceed cache
for (i = 0; i < N; i++)
    for (j = 0; j < N; j++)
        for (k = 0; k < N; k++)
            C[i][j] += A[i][k] * B[k][j];

// After: Process in blocks that fit in cache
for (ii = 0; ii < N; ii += BLOCK)
    for (jj = 0; jj < N; jj += BLOCK)
        for (kk = 0; kk < N; kk += BLOCK)
            // Mini matrix multiply within block
            for (i = ii; i < min(ii+BLOCK, N); i++)
                for (j = jj; j < min(jj+BLOCK, N); j++)
                    for (k = kk; k < min(kk+BLOCK, N); k++)
                        C[i][j] += A[i][k] * B[k][j];
```

**Effect**: Dramatically improves cache utilization for matrix operations.

### Prefetching

Fetch data before it's needed:

#### Hardware Prefetching

Processor detects access patterns and prefetches automatically:

```
Accesses: A[0], A[1], A[2], ...
Hardware detects stride pattern
Prefetches: A[8], A[16], A[24], ... (ahead of program)
```

Common patterns detected:
- Sequential access
- Constant stride
- Linked list traversal (pointer prefetching)

#### Software Prefetching

Compiler or programmer inserts prefetch instructions:

```c
for (i = 0; i < N; i++) {
    __builtin_prefetch(&A[i + 16]);  // Prefetch ahead
    sum += A[i];
}
```

**Timing**: Prefetch early enough to hide latency, late enough to stay in cache.

## Reducing Miss Penalty

### Critical Word First

Don't wait for entire block—return the needed word immediately:

```
Address requested: 0x1234 (word 5 of block)

Without critical word first:
Memory → [Word 0][Word 1][Word 2]...[Word 7] → CPU

With critical word first:
Memory → [Word 5] → CPU (continues immediately)
          [Word 6][Word 7][Word 0]...[Word 4] (fill rest)
```

**Early restart**: Similar—CPU continues as soon as requested word arrives.

### Non-Blocking Caches

Allow cache to continue serving other requests during a miss:

```
Hit Under Miss:
Access A → Miss, start fetch
Access B → Hit! Return immediately
Access C → Hit! Return immediately
A fetch completes → Return A

Miss Under Miss:
Access A → Miss, start fetch
Access B → Miss, start second fetch
Access C → Hit!
A completes, B completes
```

**MSHR (Miss Status Holding Registers)**: Track outstanding misses.

### Multi-Level Caches

Add more cache levels to reduce penalty of each level:

```
L1 miss penalty without L2: 100 cycles (memory)
L1 miss penalty with L2: 10 cycles (L2 hit)
                         100 cycles (L2 miss, ~10% of L1 misses)
Effective penalty: 10 + 0.1 × 100 = 20 cycles
```

### Victim Cache

Small fully-associative cache holds recently evicted blocks:

```
            ┌──────────────┐
L1 Miss ───►│   L1 Cache   │
            │(direct-mapped)│
            └──────┬───────┘
                   │ Evicted block
                   ▼
            ┌──────────────┐
            │ Victim Cache │  ◄── Check on L1 miss
            │  (4-16 entry │
            │  full assoc) │
            └──────────────┘
```

Catches conflict misses cheaply.

### Write Buffers

Hide write latency:

```
Write to 0x1000
    │
    ▼
┌────────────────┐
│  Write Buffer  │──────► Memory (background)
│    Entry 0     │
│    Entry 1     │
│    Entry 2     │
│    Entry 3     │
└────────────────┘
    │
    ▼
CPU continues immediately
```

## Reducing Hit Time

### Small and Simple Caches

Keep L1 small to minimize latency:

```
L1 Size    Hit Time
8KB        1 cycle
16KB       1 cycle
32KB       2 cycles
64KB       2-3 cycles
```

**Design principle**: Fast L1 + larger L2 often beats larger L1.

### Way Prediction

Predict which way of set-associative cache will hit:

```
4-way cache:
Without prediction: Check all 4 ways in parallel
With prediction:
    Predict way 2 → Check way 2 first
    If hit: 1-cycle access
    If miss: Check other ways (add 1 cycle)
```

Hit rate for way prediction: ~85-90%.

### Virtually Indexed, Physically Tagged (VIPT)

Start cache access with virtual address (faster), but use physical tag:

```
Virtual address: [VPN | Page Offset]
                           │
                   ┌───────┴───────┐
                   │  Cache Index  │
                   │ (from offset) │
                   └───────────────┘
                           │
             ┌─────────────┴─────────────┐
             │                           │
       ┌─────▼─────┐               ┌─────▼─────┐
       │   Cache   │               │    TLB    │
       │   Lookup  │               │   Lookup  │
       └─────┬─────┘               └─────┬─────┘
             │                           │
             │ Data + Tag          Physical Address
             │                           │
             └───────────┬───────────────┘
                         │
                    Tag Compare
```

Cache access and TLB lookup happen in parallel—saves ~1 cycle.

### Pipelined Cache Access

Split cache access into multiple cycles for higher clock frequency:

```
Cycle 1: Index decode, access tag array
Cycle 2: Tag compare, access data array
Cycle 3: Select and align data

Total: 3-cycle hit time, but pipelined throughput = 1 per cycle
```

### Trace Caches

Cache decoded micro-operations instead of raw instructions:

```
Traditional I-cache:
Fetch → Decode → Execute
        (complex)

Trace cache:
Store decoded trace → Execute directly
                      (skip decode)
```

Used in Intel Pentium 4, some modern designs.

## Summary of Techniques

| Technique | Reduces | Complexity |
|-----------|---------|------------|
| Larger blocks | Miss rate | Low |
| Higher associativity | Miss rate | Medium |
| Compiler optimizations | Miss rate | Software |
| Prefetching | Miss rate | Medium-High |
| Critical word first | Miss penalty | Low |
| Non-blocking cache | Miss penalty | High |
| Multi-level cache | Miss penalty | Medium |
| Victim cache | Miss penalty | Low |
| Write buffers | Miss penalty | Low |
| Small L1 | Hit time | Design choice |
| Way prediction | Hit time | Medium |
| VIPT | Hit time | Medium |
| Pipelined access | Hit time | Medium |

## Real-World Impact

**Matrix multiplication improvement**:
```
Naive implementation: 0.1 GFLOPS
With blocking: 2.0 GFLOPS
With blocking + prefetch: 4.0 GFLOPS
Optimized library (all techniques): 20+ GFLOPS
```

**Cache optimization often provides 10-100× speedup!**

## Key Takeaways

- Three targets: reduce miss rate, miss penalty, hit time
- Larger blocks and higher associativity trade complexity for miss rate
- Compiler optimizations (blocking, fusion) dramatically improve locality
- Prefetching hides memory latency by fetching data early
- Non-blocking caches allow overlap of cache misses
- Multiple levels reduce effective miss penalty
- Small, simple L1 keeps hit time low
- VIPT allows parallel TLB/cache access
- Combining techniques yields multiplicative benefits
- Software and hardware optimizations work together

