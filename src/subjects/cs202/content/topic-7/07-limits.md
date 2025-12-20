# Limits of ILP and Future Directions

Despite decades of architectural advances, extracting more ILP from programs has become increasingly difficult. Understanding these limits helps explain why the industry has shifted toward other forms of parallelism and guides future processor design.

## Fundamental ILP Limits

### True Data Dependencies

**RAW (Read After Write)** dependencies cannot be eliminated:

```nasm
add  $t0, $t1, $t2    ; Produces $t0
mul  $t3, $t0, $t4    ; MUST wait for $t0

No hardware trick can compute $t3 before $t0 exists.
This is a fundamental limit.
```

### Control Dependencies

Branches create uncertainty:

```nasm
beq  $t0, $zero, skip
add  $t1, $t2, $t3    ; Execute? Unknown until branch resolves.
sub  $t4, $t5, $t6
skip:
mul  $t7, $t8, $t9
```

**Branch prediction helps but doesn't eliminate the problem**:
- 15-20% of instructions are branches
- Even 97% accuracy means 3% mispredictions
- Misprediction penalty: 10-20 cycles
- Effective ILP limit from branches alone

### Memory Dependencies

Aliasing creates uncertainty:

```nasm
sw   $t0, 0($a0)      ; Store to unknown address
lw   $t1, 0($a1)      ; Load from unknown address

Are $a0 and $a1 the same? Must check!
```

**Memory disambiguation** helps but adds latency.

## Empirical ILP Measurements

### Available Parallelism Studies

Research from 1990s-2000s measured available ILP:

```
With perfect prediction, unlimited resources:
SPEC Integer: 20-80 ILP
SPEC Floating-point: 40-200 ILP

With realistic constraints:
SPEC Integer: 2-6 ILP
SPEC Floating-point: 3-10 ILP
```

### Real Processor IPC

```
Processor          Year    Issue Width    Typical IPC
Pentium Pro        1995    3-wide         1.0-1.5
Pentium 4          2000    3-wide         0.5-1.0 (long pipe)
Core 2             2006    4-wide         1.5-2.0
Skylake            2015    4-wide         2.0-2.5
Golden Cove        2021    6-wide         2.5-3.5
Apple M2           2022    8-wide         3.0-4.0
```

**Observation**: Doubling issue width does not double IPC.

## Diminishing Returns

### The ILP Wall

```
                IPC
                 │
             4.0 │                          ═══════════ Theoretical limit
                 │                    ●●●●●●
             3.0 │              ●●●●●
                 │         ●●●●
             2.0 │     ●●●
                 │   ●●
             1.0 │ ●●
                 │●
                 └────────────────────────────────────────► Issue Width
                    1   2   3   4   5   6   7   8

IPC grows sub-linearly with issue width.
Each doubling of width gives less than 50% more IPC.
```

### Why Diminishing Returns?

1. **Dependency chains**: Average chain length limits parallelism
2. **Branch frequency**: Every ~5-7 instructions is a branch
3. **Memory latency**: Cache misses stall independent work
4. **Instruction window**: Finite ROB limits look-ahead

## Hardware Costs of ILP

### Complexity Growth

```
Component          2-wide   4-wide   8-wide
─────────────────────────────────────────────
Dependency check    4        16       64      (n²)
ROB entries        32        64      128
Physical regs      64       128      256
Issue ports         4         8       16
Result buses        2         4        8
```

Many structures scale as O(n²) with issue width.

### Power Consumption

```
Power breakdown (modern OoO core):
- Front-end (fetch, decode, rename): 15%
- Scheduling (issue queues, wakeup): 25%
- Execution units: 25%
- Memory system: 25%
- Other: 10%

OoO scheduling is expensive!
```

### Design Complexity

```
Line-of-code in core design (estimated):
Simple in-order: 50K-100K lines
Superscalar OoO: 500K-1M lines
Modern aggressive OoO: 2-5M lines

Verification effort scales even worse.
```

## Beyond ILP: Other Parallelism

### Thread-Level Parallelism (TLP)

Run multiple threads/processes in parallel:

```
                    ILP (within core)
                         │
              ┌──────────┴──────────┐
              │                     │
           Core 0               Core 1
         (4-wide OoO)         (4-wide OoO)
          Thread A             Thread B

Total throughput = Core_0_IPC + Core_1_IPC
```

**Multicore** exploits TLP instead of pushing single-thread ILP.

### Data-Level Parallelism (DLP)

SIMD exploits regular data parallelism:

```
for (i = 0; i < N; i++)
    c[i] = a[i] + b[i];

ILP approach: 4-wide OoO, ~4 iterations/cycle
DLP approach: 512-bit SIMD, 16 floats/instruction

DLP often more efficient for regular workloads.
```

### Memory-Level Parallelism (MLP)

Overlap multiple memory accesses:

```
Traditional view: Memory limits ILP
MLP view: Issue many memory ops in parallel

Prefetching + non-blocking caches = hide latency
Modern CPUs: 10-20 outstanding misses
```

## Industry Response

### The Multicore Transition (~2005)

```
Before 2005: Double transistors → faster single core
After 2005: Double transistors → more cores

Reason: Power wall + ILP wall
- Frequency scaling hit thermal limits
- ILP returns diminished
- Multiple cores better use of transistors
```

### Heterogeneous Computing

Different cores for different workloads:

```
Modern SoC:
┌─────────────────────────────────────────────────┐
│  Big Cores        │  Little Cores               │
│  (high ILP)       │  (efficient)                │
├───────────────────┼─────────────────────────────┤
│  GPU              │  Neural Processor           │
│  (massive DLP)    │  (ML acceleration)          │
├───────────────────┼─────────────────────────────┤
│  Media Engine     │  DSP                        │
│  (video codec)    │  (signal processing)        │
└─────────────────────────────────────────────────┘
```

### Accelerators and Domain-Specific

Move computation to specialized hardware:

```
Workload          Traditional CPU    Accelerator
─────────────────────────────────────────────────
Graphics          100 GFLOPS         10 TFLOPS (GPU)
ML inference      50 TOPS            100+ TOPS (NPU)
Video encode      Real-time 1080p    Real-time 8K
Crypto            100 MB/s           10 GB/s
```

## Future Directions

### Continued ILP Innovation

Still improving, but incremental:

- Better branch prediction (ML-based)
- Wider issue (8-10 wide becoming common)
- Larger structures (256-entry ROB)
- Better speculation (value prediction)

### Near-Data Processing

Move compute closer to data:

```
Traditional:
Data ────(long path)────► CPU ────► Result

Near-data:
Data ────► Compute ────► Result
    (at memory/storage)

Reduces data movement bottleneck.
```

### Quantum and Novel Architectures

Completely different paradigms:

- Quantum computing: Inherent parallelism for specific problems
- Neuromorphic: Brain-inspired computing
- Reversible computing: Thermodynamic limits

## Key Takeaways

- True data dependencies fundamentally limit ILP
- Control and memory dependencies add practical limits
- Realistic ILP is 2-6 for integer, 3-10 for FP
- Hardware costs scale super-linearly with issue width
- Diminishing returns drove industry toward multicore
- TLP, DLP, and MLP complement ILP
- Heterogeneous computing mixes architectures
- Domain-specific accelerators bypass general-purpose limits
- Future: Better prediction, near-data compute, new paradigms
- Understanding limits guides efficient system design

