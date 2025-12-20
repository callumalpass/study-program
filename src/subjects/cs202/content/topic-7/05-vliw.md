---
id: cs202-t7-vliw
title: "VLIW Architecture"
order: 5
---

# VLIW and Static Scheduling

**Very Long Instruction Word (VLIW)** processors take a fundamentally different approach to ILP: instead of hardware discovering parallelism at runtime, the compiler explicitly specifies which operations execute in parallel. This shifts complexity from hardware to software.

## VLIW Concept

### Basic Idea

Package multiple operations into one wide instruction:

```
Traditional instruction (32 bits):
add $t0, $t1, $t2

VLIW instruction (128 bits = 4 operations):
┌─────────────┬─────────────┬─────────────┬─────────────┐
│    ALU 0    │    ALU 1    │    MEM      │   BRANCH    │
│ add t0,t1,t2│ sub t3,t4,t5│ ld t6,0(a0) │   nop       │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

All operations in one instruction execute simultaneously.

### Comparison with Superscalar

| Aspect | Superscalar | VLIW |
|--------|-------------|------|
| Parallelism discovery | Hardware (runtime) | Compiler (compile time) |
| Instruction format | Fixed, standard | Wide, multi-operation |
| Hardware complexity | High | Low |
| Compiler complexity | Standard | High |
| Binary compatibility | Good | Poor |
| Power consumption | Higher | Lower |

## VLIW Architecture

### Processor Structure

```
┌─────────────────────────────────────────────────────────────┐
│                    VLIW Processor                           │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Wide Instruction Fetch (128-512 bits)        │   │
│  └────────────────────────┬─────────────────────────────┘   │
│                           │                                  │
│           ┌───────────────┼───────────────┐                 │
│           │               │               │                 │
│           ▼               ▼               ▼                 │
│      ┌────────┐      ┌────────┐      ┌────────┐            │
│      │ Decode │      │ Decode │      │ Decode │   ...      │
│      │  Slot 0│      │  Slot 1│      │  Slot 2│            │
│      └────┬───┘      └────┬───┘      └────┬───┘            │
│           │               │               │                 │
│           ▼               ▼               ▼                 │
│      ┌────────┐      ┌────────┐      ┌────────┐            │
│      │ ALU 0  │      │ ALU 1  │      │  FPU   │   ...      │
│      └────────┘      └────────┘      └────────┘            │
│                                                              │
│      ┌──────────────────────────────────────────────────┐   │
│      │               Register File                       │   │
│      │         (many read/write ports)                   │   │
│      └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### No Dynamic Scheduling

```
VLIW hardware:
- Simple decode (no dependency check)
- No reorder buffer
- No reservation stations
- No register renaming (compiler handles it)
- Deterministic timing

Compiler responsibility:
- Find independent operations
- Schedule to avoid hazards
- Insert NOPs when no parallelism
- Handle latencies explicitly
```

## Static Scheduling

### Compiler's Role

The compiler performs what superscalar hardware does:

```c
// Source code
a = b + c;
d = e * f;
g = a + d;
h = i - j;

// Compiler analysis:
// a = b + c → produces a
// d = e * f → independent, parallel with line 1
// g = a + d → depends on a AND d
// h = i - j → independent of g

// VLIW schedule (2 ALU slots):
┌───────────────┬───────────────┐
│  Cycle 1      │               │
│  add a,b,c    │  mul d,e,f    │  ← Parallel
├───────────────┼───────────────┤
│  Cycle 2      │               │
│  sub h,i,j    │     nop       │  ← Waiting for mul
├───────────────┼───────────────┤
│  Cycle 3      │               │
│  add g,a,d    │     nop       │  ← Dependencies ready
└───────────────┴───────────────┘
```

### Software Pipelining

Overlap iterations of loops:

```c
for (i = 0; i < N; i++) {
    A[i] = B[i] + C[i];
}

// Sequential execution:
Iter 0: Load B[0], Load C[0], Add, Store A[0]
Iter 1: Load B[1], Load C[1], Add, Store A[1]
...

// Software pipelined (steady state):
┌────────────┬────────────┬────────────┬────────────┐
│  Load i+2  │  Load i+2  │  Add i+1   │ Store i    │
│    B[]     │    C[]     │            │    A[]     │
└────────────┴────────────┴────────────┴────────────┘

Multiple iterations in flight, hiding latencies.
```

### Loop Unrolling for VLIW

```c
// Original loop
for (i = 0; i < 100; i++)
    sum += A[i];

// Unrolled 4x for VLIW
for (i = 0; i < 100; i += 4) {
    sum0 += A[i];
    sum1 += A[i+1];
    sum2 += A[i+2];
    sum3 += A[i+3];
}
sum = sum0 + sum1 + sum2 + sum3;

// VLIW can now fill slots with parallel adds
```

## EPIC (Explicitly Parallel Instruction Computing)

### Intel Itanium

Intel's EPIC architecture (IA-64) extended VLIW concepts:

```
Itanium Instruction Bundle (128 bits):
┌───────────────────────────────────────────────────────────┐
│ Template │  Slot 0 (41b)  │  Slot 1 (41b)  │  Slot 2 (41b)│
│   (5b)   │                │                │              │
└───────────────────────────────────────────────────────────┘

Template: Specifies which execution units
Slots: Individual operations
```

### EPIC Features

**Predicated execution**:
```
(p1) add r1 = r2, r3    ; Execute only if p1 is true
(p2) sub r4 = r5, r6    ; Execute only if p2 is true

Both can be in same bundle, hardware selects result
Eliminates many branches
```

**Speculation support**:
```
ld.s r1 = [r10]    ; Speculative load (may fault later)
... other work ...
chk.s r1, recovery  ; Check if speculation was valid
use r1              ; Safe to use
```

**Large register file**: 128 general registers, rotating for loops.

## Challenges

### Code Size

NOPs waste space:

```
Limited parallelism:
┌─────────┬─────────┬─────────┬─────────┐
│  add    │   nop   │   nop   │   nop   │
└─────────┴─────────┴─────────┴─────────┘

Each NOP wastes 32 bits
Code bloat: 2-4× larger than scalar
```

### Binary Compatibility

Hardware changes break binaries:

```
Old CPU: 4 slots, 3-cycle multiply latency
New CPU: 6 slots, 1-cycle multiply

Old binary: Scheduled for 4 slots, 3-cycle mul
On new CPU: Can't use extra slots, NOPs everywhere

Must recompile for each new chip version
```

### Compile Time Limitations

Compiler cannot know runtime information:

```c
if (x > 0) {
    y = a + b;  // Path A
} else {
    y = c - d;  // Path B
}
z = y * 2;

Runtime: Path A taken 99% of the time
Compiler: Doesn't know, can't optimize
Superscalar: Learns and predicts
```

## VLIW Applications

### Digital Signal Processors (DSPs)

VLIW is very successful in DSPs:

```
TI C6000 DSP:
- 8 functional units
- 256-bit instruction packet
- Very regular algorithms (filters, FFT)
- Predictable access patterns
- Compiler can schedule well
```

### Graphics Processors

Early GPUs used VLIW:

```
AMD TeraScale (2007-2011):
- VLIW-5 architecture
- 5 ALUs per stream processor
- Shader compiler schedules operations
- Replaced with scalar GCN architecture
```

### Embedded Systems

Where power and determinism matter:

```
Characteristics favorable to VLIW:
- Fixed workloads (compiler can optimize)
- Real-time requirements (deterministic timing)
- Power constraints (simple hardware)
- No legacy binary requirement
```

## Comparison Example

### The Same Code on Different Architectures

```c
for (i = 0; i < 1000; i++)
    D[i] = A[i] * B[i] + C[i];
```

**Superscalar OoO (runtime)**:
- Hardware finds parallelism across iterations
- Dynamic scheduling hides load latencies
- Branch predictor handles loop control
- Adapts to cache behavior

**VLIW (compile time)**:
- Compiler unrolls loop
- Software pipelines iterations
- Explicit scheduling in instruction stream
- Static, deterministic execution

Both can achieve similar ILP, different trade-offs.

## Key Takeaways

- VLIW explicitly encodes parallelism in wide instructions
- Compiler performs scheduling, not hardware
- Simpler hardware = lower power, lower complexity
- Software pipelining overlaps loop iterations
- Predication converts branches to conditional operations
- Code size and binary compatibility are challenges
- Very successful in DSPs and embedded systems
- Less successful for general-purpose computing (Itanium)
- Trade-off: Hardware complexity vs. compiler complexity
- Hybrid approaches (EPIC) try to get best of both

