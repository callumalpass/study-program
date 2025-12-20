# Introduction to Memory Hierarchy

The memory hierarchy is one of the most important concepts in computer architecture. It provides the illusion of large, fast memory using a combination of technologies with different characteristics. Understanding the hierarchy is essential for writing efficient software and designing high-performance systems.

## The Memory Wall

### The Problem

Processor speed has increased faster than memory speed:

```
Year    Processor Speed    Memory Speed    Gap
1980    1 MHz              100 ns          ~10 cycles
1990    100 MHz            60 ns           ~6 cycles
2000    1 GHz              50 ns           ~50 cycles
2010    3 GHz              40 ns           ~120 cycles
2020    4 GHz              30 ns           ~120 cycles
```

The "memory wall" means processors spend more time waiting for memory.

### The Solution

Use a hierarchy of progressively larger, slower memories:

```
                    Speed        Size         Cost/GB
                      │           │            │
Registers         ────┼───────────┼────────────┼──── $$$$$
                      │           │            │
L1 Cache          ────┼───────────┼────────────┼──── $$$$
                      │           │            │
L2 Cache          ────┼───────────┼────────────┼──── $$$
                      │           │            │
L3 Cache          ────┼───────────┼────────────┼──── $$
                      │           │            │
Main Memory       ────┼───────────┼────────────┼──── $
                      │           │            │
SSD               ────┼───────────┼────────────┼──── ¢
                      │           │            │
HDD               ────┼───────────┼────────────┼──── ¢/10
                      │           │            │
                   Fast          Small       Expensive
                      │           │            │
                   Slow          Large       Cheap
```

## Memory Technologies

### Static RAM (SRAM)

Used for caches.

**Structure**: 6 transistors per bit (6T cell):

```
        Vdd
         │
    ┌────┴────┐
    │  PMOS   │──┬──│  PMOS   │
    └────┬────┘  │  └────┬────┘
         │       │       │
    ┌────┴────┐  │  ┌────┴────┐
    │  NMOS   │──┼──│  NMOS   │
    └────┬────┘  │  └────┬────┘
         │       │       │
        GND    Access   GND
              Transistors
```

**Characteristics**:
- Fast: 1-2 ns access
- No refresh needed
- Expensive: ~$1000/GB
- Power hungry
- Large area per bit

### Dynamic RAM (DRAM)

Used for main memory.

**Structure**: 1 transistor + 1 capacitor per bit:

```
    Word Line ─────┬─────
                   │
              ┌────┴────┐
              │  NMOS   │
              └────┬────┘
                   │
    Bit Line ──────┤
                   │
              ┌────┴────┐
              │Capacitor│
              └─────────┘
```

**Characteristics**:
- Slower: 50-100 ns access
- Requires periodic refresh (capacitor leaks)
- Cheap: ~$5/GB
- Lower power
- Dense (small area per bit)

### Flash Memory

Used for SSDs, storage.

**Structure**: Floating gate transistor:

```
    Control Gate
         │
    ┌────┴────┐
    │ Oxide   │
    ├─────────┤
    │Floating │ ◄── Trapped electrons store data
    │  Gate   │
    ├─────────┤
    │ Oxide   │
    └────┬────┘
    Source ─── Drain
```

**Characteristics**:
- Much slower than DRAM: 50-150 μs
- Non-volatile (retains data without power)
- Very cheap: ~$0.10/GB
- Limited write endurance
- No mechanical parts

### Magnetic Disk (HDD)

Traditional storage.

**Characteristics**:
- Very slow: 5-10 ms (seek + rotation)
- Non-volatile
- Cheapest: ~$0.02/GB
- Mechanical wear
- High capacity

## Hierarchy Characteristics

### Access Times

| Level | Technology | Typical Time | Cycles (4GHz) |
|-------|------------|--------------|---------------|
| Registers | Flip-flops | 0.25 ns | 1 |
| L1 Cache | SRAM | 1 ns | 4 |
| L2 Cache | SRAM | 3 ns | 12 |
| L3 Cache | SRAM | 10 ns | 40 |
| Main Memory | DRAM | 50 ns | 200 |
| SSD | Flash | 100 μs | 400,000 |
| HDD | Magnetic | 10 ms | 40,000,000 |

### Typical Sizes

| Level | Typical Size | Example System |
|-------|--------------|----------------|
| Registers | 1 KB | 32 × 64-bit registers |
| L1 Cache | 64 KB | 32KB I$ + 32KB D$ |
| L2 Cache | 512 KB | Per-core |
| L3 Cache | 16 MB | Shared |
| Main Memory | 16 GB | DDR4/DDR5 |
| SSD | 1 TB | NVMe |
| HDD | 4 TB | 7200 RPM |

## Why the Hierarchy Works

### Locality Principle

Programs don't access memory uniformly:

**Temporal locality**: Recently accessed data is likely accessed again.
```
for (int i = 0; i < 1000; i++)
    sum += array[i];  // 'sum' accessed 1000 times
```

**Spatial locality**: Nearby data is likely accessed soon.
```
array[0], array[1], array[2]...  // Sequential access
```

### Working Set Model

At any time, a program actively uses a small "working set" of memory:

```
Total program memory: 1 GB
Active working set: 10 MB (fits in cache!)

Time →
┌──────────────────────────────────────────────────────────┐
│     Phase 1        │    Phase 2       │    Phase 3       │
│ Working Set: 5MB   │Working Set: 15MB │Working Set: 8MB  │
│   (array proc)     │  (sorting)       │   (output)       │
└──────────────────────────────────────────────────────────┘
```

### Hit Rates

With locality, most accesses hit faster levels:

```
L1 hit rate: 95%
L2 hit rate: 90% (of L1 misses)
L3 hit rate: 85% (of L2 misses)

1000 accesses:
- 950 L1 hits (fast)
- 50 L1 misses → 45 L2 hits
- 5 L2 misses → 4.25 L3 hits
- ~0.75 memory accesses

Average: mostly cache speed, rarely memory!
```

## Hierarchy Metrics

### AMAT (Average Memory Access Time)

```
AMAT = Hit_Time + Miss_Rate × Miss_Penalty
```

For multi-level:
```
AMAT = L1_Hit_Time + L1_Miss_Rate × (L2_Hit_Time + L2_Miss_Rate × L2_Miss_Penalty)
```

### Example Calculation

```
L1: 2 cycles, 5% miss rate
L2: 10 cycles, 20% miss rate (of L1 misses)
Memory: 200 cycles

AMAT = 2 + 0.05 × (10 + 0.20 × 200)
     = 2 + 0.05 × (10 + 40)
     = 2 + 0.05 × 50
     = 2 + 2.5
     = 4.5 cycles

Without cache: 200 cycles
Speedup: 200/4.5 = 44×
```

## Cost-Performance Analysis

### Dollars per Access

Balancing cost and performance:

```
Technology      Cost/GB     Access Time    Cost per ns
SRAM            $1000       1 ns           $1000/ns
DRAM            $5          50 ns          $0.10/ns
SSD             $0.10       100 μs         $0.000001/ns
```

### Optimal Hierarchy Size

More of faster memory is better, but cost limits:

```
System Budget: $100 memory

Option A: 100GB DRAM, no cache
- 100 × $1 = $100
- Average access: ~50 ns

Option B: 16MB SRAM + 16GB DRAM
- 0.016 × $1000 + 16 × $1 = $16 + $16 = $32
- Average access: ~5 ns (with 95% hit rate)

Option B is 10× faster for 1/3 the cost!
```

## Historical Perspective

### Evolution of Caches

| Year | Processor | L1 | L2 | L3 |
|------|-----------|-----|-----|-----|
| 1982 | 80286 | None | - | - |
| 1989 | 80486 | 8KB | - | - |
| 1995 | Pentium Pro | 16KB | 256KB | - |
| 2006 | Core 2 | 64KB | 4MB | - |
| 2010 | Core i7 | 64KB | 256KB | 8MB |
| 2020 | Ryzen 5000 | 64KB | 512KB | 32MB |

Caches grow to bridge widening speed gap.

## Key Takeaways

- Memory hierarchy bridges the processor-memory speed gap
- Different technologies trade off speed, size, and cost
- SRAM is fast but expensive (caches)
- DRAM is slower but cheaper (main memory)
- Flash and HDD provide cheap bulk storage
- Locality makes the hierarchy effective
- AMAT quantifies hierarchy performance
- Multiple levels provide both speed and capacity
- Cache sizes continue to grow in modern processors
- Understanding the hierarchy is crucial for performance

