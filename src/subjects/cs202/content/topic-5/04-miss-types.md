---
id: cs202-t5-miss
title: "Miss Classification"
order: 4
---

# Cache Miss Classification

Understanding why cache misses occur helps in designing better caches and writing cache-friendly software. The "Three Cs" model categorizes all misses into three types: Compulsory, Capacity, and Conflict.

## The Three Cs

### Compulsory Misses (Cold Misses)

**First access to a block always misses** because the data has never been in the cache.

```
Program starts:
Access 0x1000 → Miss (never seen before)
Access 0x2000 → Miss (never seen before)
Access 0x1000 → Hit  (now in cache)
```

**Characteristics**:
- Unavoidable with standard caching
- Occur even with infinite cache size
- Typically small fraction of total misses
- Reduced by prefetching

### Capacity Misses

**Cache isn't big enough** to hold all needed blocks.

```
Working set: 1000 blocks
Cache size: 500 blocks

Even with perfect placement, can't fit everything!
Some blocks evicted due to limited space.
```

**Characteristics**:
- Would occur even with fully associative cache
- Depend on working set size
- Reduced by larger caches

### Conflict Misses

**Multiple blocks compete for same cache location** due to limited associativity.

```
Direct-mapped cache, 4 entries:
Block A maps to index 2
Block B maps to index 2

Access A → Miss, load to index 2
Access B → Miss, evict A, load to index 2
Access A → Miss, evict B, load to index 2  (conflict!)
```

**Characteristics**:
- Wouldn't occur with fully associative cache
- Reduced by higher associativity
- Can cause pathological "thrashing" patterns

## Identifying Miss Types

### Analysis Method

To classify a miss:

1. **Run with infinite, fully associative cache**
   - Misses here = compulsory

2. **Run with finite, fully associative cache (same size)**
   - Additional misses = capacity

3. **Run with actual cache configuration**
   - Additional misses = conflict

### Example Analysis

**Scenario**: 8KB direct-mapped cache, accessing 16KB of data

```
Configuration          | Miss Count
-----------------------|------------
Infinite FA            | 256 misses (compulsory)
8KB FA                 | 512 misses (256 capacity)
8KB DM                 | 768 misses (256 conflict)

Total: 768 misses
- Compulsory: 256 (33%)
- Capacity: 256 (33%)
- Conflict: 256 (33%)
```

## Miss Rate by Program Type

### Integer Programs (SPEC INT)

```
┌──────────────────────────────────────────┐
│ Miss Type Distribution                    │
├──────────────┬───────────────────────────┤
│ Compulsory   │ ████ 10%                  │
│ Capacity     │ ████████████████ 40%      │
│ Conflict     │ ████████████████████ 50%  │
└──────────────┴───────────────────────────┘
```

Higher conflict rate due to irregular access patterns.

### Floating-Point Programs (SPEC FP)

```
┌──────────────────────────────────────────┐
│ Miss Type Distribution                    │
├──────────────┬───────────────────────────┤
│ Compulsory   │ ████████ 20%              │
│ Capacity     │ ████████████████████ 50%  │
│ Conflict     │ ████████████ 30%          │
└──────────────┴───────────────────────────┘
```

More capacity misses due to large array operations.

## Reducing Each Miss Type

### Reducing Compulsory Misses

**Prefetching**: Fetch data before it's needed.

```
Hardware prefetching:
Access A[0] → Prefetch A[1], A[2], A[3]
Access A[1] → Already in cache (hit!)

Software prefetching:
for (i = 0; i < N; i++) {
    prefetch(A[i+16]);  // Hint to hardware
    sum += A[i];
}
```

**Larger blocks**: More data per miss (but may waste bandwidth).

### Reducing Capacity Misses

**Larger caches**: More space for working set.

```
Cache Size   Miss Rate
8KB          15%
16KB         10%
32KB         6%
64KB         4%
```

**Better data structures**: Reduce working set size.

```c
// Before: Large sparse matrix
int matrix[10000][10000];  // 400MB!

// After: Compressed sparse row format
struct CSR {
    int* values;    // Only non-zero values
    int* col_idx;
    int* row_ptr;
};  // Much smaller for sparse data
```

### Reducing Conflict Misses

**Higher associativity**:

```
Associativity   Conflict Miss Reduction
Direct-mapped   Baseline
2-way           30% reduction
4-way           50% reduction
8-way           60% reduction
```

**Victim cache**: Small fully-associative cache for evicted blocks.

```
             ┌─────────────┐
Access ─────►│  L1 Cache   │
             │ (main cache)│
             └──────┬──────┘
                    │ Evicted blocks
                    ▼
             ┌─────────────┐
             │Victim Cache │  ◄── Check on L1 miss
             │  (4-16 way  │
             │    FA)      │
             └─────────────┘
```

**Better index function**: Use XOR of address bits to reduce conflicts.

```
Traditional: index = addr[13:6]
XOR-based:   index = addr[13:6] XOR addr[21:14]

Reduces conflict for strided access patterns.
```

## Thrashing

### What is Thrashing?

Repeated eviction and reload of the same blocks:

```
Direct-mapped, 4 entries
Access pattern: A, B, A, B, A, B, ...
Both A and B map to same index

A → Miss (load A)
B → Miss (evict A, load B)
A → Miss (evict B, load A)  ← Thrashing!
B → Miss (evict A, load B)  ← Every access misses
...

Miss rate: 100%!
```

### Detecting Thrashing

**Symptoms**:
- Very high miss rate (>50%)
- Performance counters show many conflict misses
- Memory bandwidth saturated

**Common causes**:
- Arrays with size = power of 2 (bad alignment)
- Multiple arrays with same stride
- Matrix column access when row-major storage

### Fixing Thrashing

**Padding**:
```c
// Before: Perfect conflict
int A[1024];  // All access same cache lines
int B[1024];

// After: Offset to avoid conflicts
int A[1024];
int pad[16];  // Shift B's alignment
int B[1024];
```

**Loop transformations**:
```c
// Before: Bad striding
for (i = 0; i < N; i++)
    for (j = 0; j < N; j++)
        sum += matrix[j][i];  // Column access = bad

// After: Cache-friendly
for (j = 0; j < N; j++)
    for (i = 0; i < N; i++)
        sum += matrix[j][i];  // Row access = good
```

**Blocking/Tiling**:
```c
// Before: Large matrix, exceeds cache
for (i = 0; i < N; i++)
    for (j = 0; j < N; j++)
        C[i][j] = A[i][k] * B[k][j];

// After: Process in cache-sized blocks
for (ii = 0; ii < N; ii += BLOCK)
    for (jj = 0; jj < N; jj += BLOCK)
        for (i = ii; i < ii+BLOCK; i++)
            for (j = jj; j < jj+BLOCK; j++)
                C[i][j] = A[i][k] * B[k][j];
```

## Fourth C: Coherence Misses

In multiprocessor systems, a fourth category exists:

**Coherence misses**: Misses caused by another processor invalidating the cache line.

```
CPU 0 cache: x = 5
CPU 1 writes: x = 10 → Invalidates CPU 0's copy
CPU 0 reads: x → Miss! (coherence miss)
```

**True sharing**: Both processors need same data.

**False sharing**: Different data in same cache line.

```
// False sharing: a and b in same cache line
struct {
    int a;  // CPU 0 uses
    int b;  // CPU 1 uses
} shared;

// Fix: Pad to separate cache lines
struct {
    int a;
    char pad[60];  // Assuming 64-byte lines
    int b;
} shared;
```

## Miss Analysis Tools

### Hardware Performance Counters

```bash
# Linux perf tool
perf stat -e cache-misses,cache-references ./program

# Intel VTune
amplxe-cl -collect memory-access ./program
```

### Cache Simulation

```bash
# Valgrind cachegrind
valgrind --tool=cachegrind ./program

# Output shows miss rates by cache level
D1  miss rate: 3.2%
LLi miss rate: 0.5%
```

## Key Takeaways

- **Compulsory misses**: First access, unavoidable, reduced by prefetching
- **Capacity misses**: Working set exceeds cache, reduced by larger cache
- **Conflict misses**: Mapping conflicts, reduced by higher associativity
- Thrashing causes pathological miss patterns
- Padding and loop transformations fix software-caused conflicts
- Blocking enables large data to fit in cache incrementally
- Coherence misses matter in multiprocessor systems
- Performance counters and simulators help identify miss types

