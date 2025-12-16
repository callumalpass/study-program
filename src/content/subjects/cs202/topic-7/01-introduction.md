# Introduction to Instruction-Level Parallelism

**Instruction-Level Parallelism (ILP)** refers to executing multiple instructions simultaneously within a single processor. Modern CPUs achieve performance not just through faster clocks, but by finding and exploiting parallelism among instructions. Understanding ILP is fundamental to comprehending how modern processors achieve high performance.

## The Parallelism Opportunity

### Sequential Programs Have Hidden Parallelism

Consider this code:
```c
a = b + c;
d = e * f;
g = a + d;
```

As assembly:
```nasm
add  $t0, $t1, $t2    ; a = b + c
mul  $t3, $t4, $t5    ; d = e * f
add  $t6, $t0, $t3    ; g = a + d
```

**Dependency analysis**:
```
Instruction 1: add (produces $t0)
Instruction 2: mul (produces $t3) ← Independent of 1!
Instruction 3: add (uses $t0, $t3) ← Depends on 1 AND 2

Instructions 1 and 2 can execute in parallel.
```

### Potential ILP in Programs

```
Typical program statistics:
- 15-20% branches
- 25-35% loads/stores
- 50-60% arithmetic/logical

Dependencies:
- ~30% of instructions depend on previous instruction
- ~50% can execute with some parallelism
- Significant ILP exists in most programs
```

## Sources of Parallelism

### Data Independence

Operations on different data can parallelize:

```nasm
add  $t0, $t1, $t2    ; Group 1
sub  $t3, $t4, $t5    ; Group 1 (parallel)
mul  $t6, $t7, $t8    ; Group 1 (parallel)
or   $t9, $t0, $t3    ; Group 2 (depends on 1)
```

### Control Independence

Different control paths may have parallel operations:

```c
if (condition) {
    x = a + b;    // Path A
} else {
    y = c + d;    // Path B (independent of Path A)
}
z = e + f;        // Parallel with either path
```

### Memory Independence

Loads/stores to different addresses can parallelize:

```nasm
lw   $t0, 0($a0)      ; Load from array A
lw   $t1, 0($a1)      ; Load from array B (parallel)
sw   $t2, 0($a2)      ; Store to array C (parallel)
```

## ILP Metrics

### Instructions Per Cycle (IPC)

```
IPC = Instructions Executed / Clock Cycles

Ideal: IPC = pipeline width (e.g., 4 for 4-wide)
Real:  IPC = 1.5-3 typically

Example:
1000 instructions in 500 cycles → IPC = 2.0
```

### CPI vs. IPC

```
CPI (Cycles Per Instruction) = 1/IPC

Scalar (single-issue): CPI ≥ 1, IPC ≤ 1
Superscalar: CPI can be < 1, IPC can be > 1

A 4-wide machine:
- Perfect ILP: CPI = 0.25, IPC = 4
- Typical: CPI = 0.5, IPC = 2
```

### Available ILP

```
Available ILP = Maximum parallel instructions / Total instructions

Study of SPEC benchmarks:
- Integer: ILP ≈ 2-5 instructions
- Floating-point: ILP ≈ 3-8 instructions

Limited by:
- True dependencies (RAW hazards)
- Control flow (branches)
- Memory dependencies (ambiguous addresses)
```

## Techniques to Exploit ILP

### Hardware Techniques

| Technique | Description | ILP Gained |
|-----------|-------------|------------|
| Pipelining | Overlap instruction execution | Throughput |
| Superscalar | Multiple issue per cycle | 2-8× |
| Out-of-Order | Execute ready instructions first | ~1.5× |
| Branch Prediction | Speculate past branches | ~1.3× |
| Register Renaming | Remove false dependencies | ~1.2× |

### Software Techniques

| Technique | Description | ILP Gained |
|-----------|-------------|------------|
| Instruction Scheduling | Reorder to reduce stalls | ~1.1-1.3× |
| Loop Unrolling | Reduce branch overhead | ~1.2× |
| Software Pipelining | Overlap loop iterations | ~1.5× |
| Trace Scheduling | Optimize common paths | ~1.2× |

## ILP Limits

### Fundamental Constraints

```
1. Data Dependencies: Can't compute f(x) before x is known
2. Control Dependencies: Can't know path until branch resolves
3. Memory Bandwidth: Limited data transfer rate
4. Finite Resources: Limited ALUs, registers, etc.
```

### Dependency Types

**True dependency (RAW - Read After Write)**:
```nasm
add $t0, $t1, $t2    ; Write $t0
sub $t3, $t0, $t4    ; Read $t0 ← Must wait
```

**Anti-dependency (WAR - Write After Read)**:
```nasm
add $t0, $t1, $t2    ; Read $t1
sub $t1, $t3, $t4    ; Write $t1 ← Can't reorder
```

**Output dependency (WAW - Write After Write)**:
```nasm
add $t0, $t1, $t2    ; Write $t0
sub $t0, $t3, $t4    ; Write $t0 ← Must be ordered
```

Only RAW dependencies are "true" dependencies—others can be eliminated with register renaming.

### Control Flow Limits

```
Branch frequency: ~15-20% of instructions
Branch taken: ~60-70% are taken
Branch penalty: 5-20 cycles (varies by depth)

Without prediction:
Effective IPC ≤ 1 / (1 + 0.15 × penalty)

With 95% accurate prediction:
Penalty only 5% × 15% = 0.75% of instructions
```

## ILP Evolution

### Historical Progression

| Era | Processor | ILP Technique | Typical IPC |
|-----|-----------|---------------|-------------|
| 1980s | Intel 386 | Single-issue | ~0.5 |
| Early 90s | Pentium | 2-way superscalar | ~1.0 |
| Late 90s | Pentium Pro | Out-of-order | ~1.5 |
| 2000s | Core 2 | Wide OoO | ~2.0 |
| 2010s | Skylake | Deep OoO | ~2.5 |
| 2020s | Golden Cove | Very wide OoO | ~3.0+ |

### The ILP Wall

```
ILP gains have diminished:
- 1990s: 50% faster per year (ILP + frequency)
- 2000s: 20% faster per year (ILP gains slowing)
- 2010s: 5-10% IPC improvement per year
- 2020s: 5-15% IPC improvement per generation

Reason: Diminishing returns from ILP
Solution: Thread-Level Parallelism (TLP), Data-Level Parallelism (DLP)
```

## Visualizing ILP

### Instruction Window

```
Program order:         What OoO sees (data flow):

1: add $t0, $t1, $t2         ┌─────┐
2: sub $t3, $t0, $t4      ───►│  1  │───┐
3: mul $t5, $t6, $t7         └─────┘   │
4: or  $t8, $t5, $t3         ┌─────┐   │    ┌─────┐
5: and $t9, $t1, $t2      ───►│  3  │───┼───►│  4  │
                              └─────┘   │    └─────┘
                              ┌─────┐   │
                           ───►│  2  │───┘
                              └─────┘
                              ┌─────┐
                           ───►│  5  │
                              └─────┘

Parallel groups:
Cycle 1: Instructions 1, 3, 5 (independent)
Cycle 2: Instructions 2 (waits for 1)
Cycle 3: Instruction 4 (waits for 2, 3)

ILP = 5 instructions / 3 cycles = 1.67
```

## Key Takeaways

- ILP allows executing multiple instructions simultaneously
- Sequential programs have hidden parallelism from data independence
- IPC measures actual parallelism achieved (typical: 1.5-3)
- True dependencies (RAW) limit ILP fundamentally
- False dependencies (WAR, WAW) can be eliminated
- Branches limit ILP unless predicted accurately
- Hardware and software techniques work together
- ILP improvements have diminishing returns
- Modern CPUs rely heavily on ILP for performance
- Understanding ILP is key to understanding modern CPUs

