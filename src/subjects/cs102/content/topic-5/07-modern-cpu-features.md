---
id: cs102-t5-modern-cpu-features
title: "Modern CPU Features Overview"
order: 7
---

# Modern CPU Features Overview

The basic fetch-decode-execute cycle and simple pipelining are just the foundation. Modern CPUs employ sophisticated techniques to extract more performance from silicon. This subtopic surveys these features, providing context for how contemporary processors achieve their remarkable performance.

## Superscalar Execution

Instead of one instruction per cycle, superscalar CPUs issue **multiple instructions simultaneously**:

```
Simple pipeline (scalar):
Clock:    1    2    3    4
Instr 1: [IF ][ID ][EX ][WB ]
Instr 2:      [IF ][ID ][EX ][WB ]

Superscalar (2-wide):
Clock:    1    2    3    4
Instr 1: [IF ][ID ][EX ][WB ]
Instr 2: [IF ][ID ][EX ][WB ]  ← Same cycle as Instr 1
Instr 3:      [IF ][ID ][EX ][WB ]
Instr 4:      [IF ][ID ][EX ][WB ]
```

Modern CPUs are 4-6 wide, meaning they can issue up to 4-6 instructions per cycle.

### Requirements for Superscalar

- **Multiple functional units**: 2+ ALUs, multiple load/store units
- **Wide instruction fetch**: Fetch 4+ instructions at once
- **Dependency checking**: Find independent instructions to execute together
- **Large register file**: Support many in-flight instructions

## Out-of-Order Execution

Instructions don't have to execute in program order. The CPU reorders for efficiency:

```
Original order:
1. MUL R1, R2, R3    ; Slow (5 cycles)
2. ADD R4, R1, R5    ; Depends on R1
3. SUB R6, R7, R8    ; Independent!
4. AND R9, R6, R10   ; Depends on R6

In-order: 1 → 2 → 3 → 4  (waits for MUL before starting SUB)

Out-of-order:
- Start MUL
- SUB is independent, start it immediately
- AND depends on SUB, start when SUB finishes
- ADD waits for MUL
```

### How It Works

1. **Decode and Rename**: Map architectural registers to physical registers, eliminating false dependencies
2. **Issue Queue**: Instructions wait until operands are ready
3. **Execute**: Run instructions as soon as dependencies are satisfied (not in order)
4. **Reorder Buffer**: Track original order, retire instructions in program order for correct behavior

## Branch Prediction

Since branches disrupt pipelining, CPUs predict branch outcomes:

### Prediction Accuracy

| Predictor Type | Accuracy | Used In |
|----------------|----------|---------|
| Static (always not-taken) | ~60% | Simple processors |
| 2-bit saturating counter | ~85% | 1990s CPUs |
| Two-level adaptive | ~95% | Modern CPUs |
| Neural network | ~98% | Latest CPUs |

At 98% accuracy, a misprediction still occurs every 50 branches, causing a pipeline flush.

### Branch Target Buffer (BTB)

Cache of recent branch addresses and their targets:
```
Branch at 0x401234 → target 0x401300
Next time: predict taken, speculatively fetch from 0x401300
```

## Speculative Execution

Don't wait for branch resolution—execute the predicted path speculatively:

```
BEQ R1, R2, target    ; Predict: not taken
ADD R3, R4, R5        ; Execute speculatively
SUB R6, R7, R8        ; Execute speculatively
...

If prediction wrong:
- Flush pipeline
- Throw away speculative results
- Start from correct path
```

This gamble usually pays off (98%+ accuracy), but has security implications (Spectre, Meltdown).

## SIMD (Single Instruction, Multiple Data)

Process multiple data elements with one instruction:

```
Scalar:                      SIMD (4-wide):
ADD R1, R2, R3               VADD V1, V2, V3
                             ; V1[0] = V2[0] + V3[0]
Adds 1 pair                  ; V1[1] = V2[1] + V3[1]
                             ; V1[2] = V2[2] + V3[2]
                             ; V1[3] = V2[3] + V3[3]

                             Adds 4 pairs in one instruction
```

Modern SIMD widths:
- SSE: 128-bit (4 floats)
- AVX: 256-bit (8 floats)
- AVX-512: 512-bit (16 floats)

SIMD is essential for graphics, scientific computing, and machine learning.

## Multi-Core and Hyper-Threading

### Multi-Core

Multiple complete CPUs on one chip:

```
┌─────────────────────────────────────┐
│                 Chip                 │
│  ┌──────┐  ┌──────┐  ┌──────┐      │
│  │Core 0│  │Core 1│  │Core 2│  ... │
│  │ ALU  │  │ ALU  │  │ ALU  │      │
│  │Cache │  │Cache │  │Cache │      │
│  └──────┘  └──────┘  └──────┘      │
│        Shared L3 Cache              │
└─────────────────────────────────────┘
```

Each core is (mostly) independent, running different threads.

### Hyper-Threading (SMT)

**Simultaneous Multi-Threading**: One core pretends to be two:

- Single set of execution units
- Duplicate register files and some other state
- Interleave instructions from two threads

When one thread stalls (cache miss), the other thread uses the execution units. Typically provides 15-30% more throughput.

## Cache Hierarchy Details

Modern CPUs have multiple cache levels:

```
Core 0:
  L1 Instruction Cache (32 KB) - 4 cycle latency
  L1 Data Cache (32 KB) - 4 cycle latency
  L2 Cache (256 KB) - 12 cycle latency

Shared:
  L3 Cache (8-32 MB) - 40 cycle latency

Main Memory: ~100 ns latency
```

### Cache Coherence

When multiple cores share data, hardware ensures consistency:

```
Core 0 writes X = 5
Core 1 must see X = 5 (not stale value)
```

The **MESI protocol** (Modified, Exclusive, Shared, Invalid) coordinates caches.

## Memory Prefetching

CPUs predict future memory accesses and fetch data early:

**Hardware prefetching**:
- Detects sequential access patterns
- Automatically fetches next cache lines

**Software prefetching**:
```c
__builtin_prefetch(&data[i + 16]);  // Hint to CPU
process(data[i]);
```

## Power Management

Modern CPUs dynamically adjust for power efficiency:

### Dynamic Voltage and Frequency Scaling (DVFS)

- **Turbo Boost**: Increase clock speed when thermal headroom exists
- **Power saving**: Reduce speed when idle

### Clock Gating

Turn off clock to unused units:
```
If FPU not needed, disable its clock → no switching → no power
```

### Core Parking

Put entire cores to sleep during low load.

## Security Features

Hardware assists for security:

| Feature | Purpose |
|---------|---------|
| NX (No Execute) | Mark memory pages as non-executable |
| ASLR support | Hardware random number generation |
| Memory tagging | Detect buffer overflows (ARM MTE) |
| Enclaves | Isolated execution (Intel SGX) |

Security vulnerabilities (Spectre, Meltdown) showed that performance features can create security holes. Modern CPUs include mitigations.

## Performance Monitoring

CPUs include counters for performance analysis:

- Cache hits/misses
- Branch predictions/mispredictions
- Instructions retired
- Cycles stalled

Tools like `perf` on Linux read these counters:
```bash
perf stat ./my_program
# Shows IPC, cache miss rate, branch mispredictions
```

## Example: Modern CPU Microarchitecture

A simplified view of a modern core:

```
Fetch (4+ instr/cycle)
       ↓
Branch Predictor
       ↓
Decode (4-6 μops/cycle)
       ↓
Rename (register renaming)
       ↓
Scheduler (reservation stations)
       ↓
    ┌──┬──┬──┬──┬──┬──┐
    │ALU│ALU│AGU│AGU│FPU│VEC│  Execution Units
    └──┴──┴──┴──┴──┴──┘
       ↓
Reorder Buffer (retire in order)
       ↓
Commit to architectural state
```

At any moment, 200+ instructions might be "in flight" in various stages.

## Historical Progression

| Era | Key Features |
|-----|--------------|
| 1970s | Basic pipelining (4-5 stages) |
| 1980s | Instruction and data caches |
| 1990s | Superscalar, out-of-order, branch prediction |
| 2000s | Multi-core, power management |
| 2010s | Integrated graphics, SIMD extensions |
| 2020s | AI accelerators, security mitigations |

Each era built on the previous, adding complexity to extract more performance.

## Why This Matters

Understanding CPU features helps with:

- **Performance optimization**: Know what the hardware can and can't do
- **Debugging**: Understand why code behaves unexpectedly
- **System design**: Make informed architecture decisions
- **Security**: Recognize how hardware vulnerabilities arise

## Key Takeaways

- **Superscalar** CPUs issue multiple instructions per cycle using multiple execution units.
- **Out-of-order execution** runs instructions as soon as dependencies are satisfied, not in program order.
- **Branch prediction** (~98% accurate) and **speculative execution** keep pipelines full.
- **SIMD** processes multiple data elements with single instructions (SSE, AVX, NEON).
- **Multi-core** puts multiple CPUs on one chip; **SMT** makes one core look like two.
- **Cache hierarchy** (L1/L2/L3) hides memory latency with decreasing speed and increasing size.
- **Prefetching** predicts memory access patterns and loads data early.
- **Power management** dynamically adjusts speed and voltage for efficiency.
- **Security features** like NX and ASLR are implemented in hardware.
- Modern CPUs have 200+ instructions in flight, managed by complex control logic.
- This complexity is why understanding computer systems matters—the simple mental model hides enormous sophistication.

