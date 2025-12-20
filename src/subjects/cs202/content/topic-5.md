## Introduction

Cache memory bridges the speed gap between fast processors and slow main memory. By keeping frequently accessed data close to the CPU, caches dramatically improve program performance. Understanding cache behavior is essential for writing efficient software.

**Learning Objectives:**
- Explain why caches are necessary (memory wall problem)
- Analyze cache organization: direct-mapped, set-associative, fully-associative
- Compare write-through and write-back policies
- Classify cache misses (3 Cs: Compulsory, Capacity, Conflict)
- Design multi-level cache hierarchies
- Optimize code for cache performance

---

## Core Concepts

### The Memory Hierarchy

```
                    Speed        Size        Cost/byte
                      ▲           ▼             ▲
    ┌─────────┐       │           │             │
    │Registers│ ──────┼───────────┼─────────────┤
    └────┬────┘       │           │             │
         │            │           │             │
    ┌────▼────┐       │           │             │
    │ L1 Cache│ ──────┼───────────┼─────────────┤
    └────┬────┘       │           │             │
         │            │           │             │
    ┌────▼────┐       │           │             │
    │ L2 Cache│ ──────┼───────────┼─────────────┤
    └────┬────┘       │           │             │
         │            │           │             │
    ┌────▼────┐       │           │             │
    │Main Mem │ ──────┼───────────┼─────────────┤
    └────┬────┘       │           │             │
         │            │           │             │
    ┌────▼────┐       │           │             │
    │  Disk   │ ──────┴───────────┴─────────────┘
    └─────────┘
```

### Locality Principles

Caches exploit two types of locality:

**Temporal Locality:** Recently accessed data likely accessed again
```c
for (int i = 0; i < 1000; i++) {
    sum += arr[i];  // 'sum' accessed every iteration
}
```

**Spatial Locality:** Data near recently accessed data likely accessed
```c
for (int i = 0; i < 1000; i++) {
    sum += arr[i];  // arr[i+1] likely needed next
}
```

### Cache Organization

**Direct-Mapped:** Each address maps to exactly one cache line
```
Address: | Tag | Index | Offset |
         Maps to one specific set
```

**Set-Associative:** Each address maps to a set of lines
```
Address: | Tag | Index | Offset |
         Maps to a set, any line in set can hold it
```

**Fully-Associative:** Any address can go anywhere
```
Address: | Tag | Offset |
         Can be placed in any cache line
```

### Cache Miss Types (3 Cs)

1. **Compulsory (Cold):** First access to a block
2. **Capacity:** Cache too small for working set
3. **Conflict:** Multiple blocks map to same set

---

## Key Topics in This Section

1. **Introduction to Caches** - Memory wall and cache basics
2. **Cache Organization** - Mapping policies and structure
3. **Write Policies** - Write-through vs write-back
4. **Miss Classification** - The 3 Cs of cache misses
5. **Multi-Level Caches** - L1/L2/L3 hierarchy design
6. **Cache Optimization** - Software techniques for better hit rates
7. **Virtual Memory Integration** - TLBs and cache interaction

---

## Key Formulas

**Average Memory Access Time:**
```
AMAT = Hit_time + Miss_rate × Miss_penalty
```

**Multi-level AMAT:**
```
AMAT = L1_hit_time + L1_miss_rate × (L2_hit_time + L2_miss_rate × Mem_time)
```

---

## Prerequisites

- Basic memory concepts
- Binary addressing and bit manipulation
- Understanding of program execution patterns
