---
id: cs202-t3-perf
title: "Performance Analysis"
order: 7
---

# Performance Metrics and Analysis

Understanding processor performance requires analyzing multiple factors: clock speed, cycles per instruction, instruction count, and their interactions. This section covers the fundamental metrics used to evaluate and compare processor designs.

## The CPU Performance Equation

The time to execute a program is:

```
CPU Time = Instructions × CPI × Clock Period
```

Or equivalently:

```
CPU Time = (Instructions × CPI) / Clock Frequency
```

Where:
- **Instructions**: Number of instructions executed
- **CPI**: Cycles Per Instruction (average)
- **Clock Period**: Time for one clock cycle (1/frequency)

### Breaking Down the Equation

Each factor is influenced by different aspects:

| Factor | Affected By |
|--------|-------------|
| Instruction Count | ISA, Compiler, Algorithm |
| CPI | ISA, CPU Organization, Compiler |
| Clock Period | CPU Organization, Technology |

## Cycles Per Instruction (CPI)

CPI varies by instruction type and design:

### Single-Cycle Design
```
CPI = 1 (always)
```

All instructions take exactly one cycle, but the clock must be slow enough for the longest instruction.

### Multi-Cycle Design
```
CPI = Σ(CPI_i × frequency_i)
```

**Example**:
| Instruction | Cycles | Frequency |
|-------------|--------|-----------|
| ALU | 4 | 40% |
| Load | 5 | 25% |
| Store | 4 | 15% |
| Branch | 3 | 15% |
| Jump | 3 | 5% |

```
CPI = 4×0.40 + 5×0.25 + 4×0.15 + 3×0.15 + 3×0.05
    = 1.60 + 1.25 + 0.60 + 0.45 + 0.15
    = 4.05
```

### Pipelined Design

Ideal: CPI = 1 (one instruction completes per cycle)

Reality: CPI > 1 due to:
- Pipeline stalls (hazards)
- Branch mispredictions
- Cache misses

## Clock Period Constraints

The clock period must accommodate the longest combinational path:

### Single-Cycle
```
T_clock ≥ T_longest_instruction

For load: T = T_PC + T_IMem + T_RegRead + T_ALU + T_DMem + T_RegWrite
        ≈ 50 + 200 + 50 + 100 + 200 + 50 = 650 ps
```

### Multi-Cycle
```
T_clock ≥ T_longest_step

Longest step (memory access): T ≈ 200 ps
```

### Pipelined
```
T_clock ≥ T_longest_stage + T_pipeline_register

T ≈ max(T_IF, T_ID, T_EX, T_MEM, T_WB) + T_reg
```

## Performance Comparison Example

Compare single-cycle and multi-cycle for the same program:

**Assumptions**:
- Single-cycle: T = 650 ps, CPI = 1
- Multi-cycle: T = 200 ps, CPI = 4.05

**For 1 million instructions**:

Single-cycle:
```
Time = 10^6 × 1 × 650 ps = 650 μs
```

Multi-cycle:
```
Time = 10^6 × 4.05 × 200 ps = 810 μs
```

Single-cycle is faster! But multi-cycle uses simpler hardware.

## Iron Law of Processor Performance

```
Time/Program = Instructions/Program × Cycles/Instruction × Seconds/Cycle
```

To improve performance, reduce any factor. But factors are not independent!

**Trade-offs**:
- More complex instructions → fewer instructions but higher CPI
- Simpler instructions → more instructions but lower CPI
- Faster clock → shorter cycle but may increase CPI (more stalls)

## MIPS and MFLOPS

### MIPS (Million Instructions Per Second)

```
MIPS = Instruction Count / (Execution Time × 10^6)
     = Clock Rate / (CPI × 10^6)
```

**Problems with MIPS**:
- Doesn't account for instruction complexity
- Different ISAs not comparable
- Can be improved by using simpler instructions (that do less work)

### MFLOPS (Million Floating-Point Operations Per Second)

```
MFLOPS = FP Operations / (Execution Time × 10^6)
```

Better for scientific computing but still limited:
- Only measures FP performance
- Different FP operations have different complexity
- Modern: GFLOPS (10^9), TFLOPS (10^12)

## Benchmarks

Real-world programs provide better performance measures:

### SPEC (Standard Performance Evaluation Corporation)

**SPEC CPU2017** includes:
- SPECint: Integer benchmarks
- SPECfp: Floating-point benchmarks

Results normalized to a reference machine:
```
SPECratio = Reference Time / System Under Test Time
```

Geometric mean used for aggregate scores:
```
SPECmark = (∏ SPECratio_i)^(1/n)
```

### Other Benchmarks

| Benchmark | Focus |
|-----------|-------|
| SPEC CPU | General-purpose CPU |
| EEMBC | Embedded systems |
| MLPerf | Machine learning |
| TPC | Database/transaction processing |
| LINPACK | Dense linear algebra (supercomputers) |

## Amdahl's Law

When optimizing part of a system:

```
Speedup_overall = 1 / ((1 - F) + F/S)
```

Where:
- F = Fraction of time in optimized portion
- S = Speedup of the optimized portion

**Example**: Optimize floating-point (20% of time) by 10×:
```
Speedup = 1 / ((1 - 0.2) + 0.2/10)
        = 1 / (0.8 + 0.02)
        = 1.22× (only 22% improvement!)
```

**Key insight**: The unoptimized portion limits overall speedup.

### Amdahl's Law Corollary

As S approaches infinity:
```
Speedup_max = 1 / (1 - F)
```

If F = 0.2, maximum speedup is 1.25×, no matter how fast the optimized part becomes.

## Power and Energy

Modern processors are power-limited:

### Dynamic Power
```
P_dynamic = α × C × V² × f
```

Where:
- α = Activity factor (fraction of gates switching)
- C = Capacitance
- V = Voltage
- f = Frequency

### Static Power
```
P_static = V × I_leakage
```

Always present, increases with temperature and smaller transistors.

### Performance per Watt

Modern metric: Performance/Power (operations per joule)

```
Perf/Watt = MIPS/Watt or GFLOPS/Watt
```

### Voltage-Frequency Scaling

Since P ∝ V²f and f ∝ V:
```
P ∝ V³
```

Reducing voltage by 20% reduces power by ~50%!

But frequency also drops, so there's a trade-off.

## Summary: Comparing Designs

| Metric | Single-Cycle | Multi-Cycle | Pipelined |
|--------|--------------|-------------|-----------|
| CPI | 1 | 3-5 | 1+ |
| Clock Period | Long | Short | Short |
| Hardware | Simple, duplicated | Shared | Complex |
| Control | Simple | FSM | Complex |

**Best choice depends on**:
- Performance requirements
- Power/energy constraints
- Cost (die area, complexity)
- Design time

## Key Takeaways

- CPU Time = Instructions × CPI × Clock Period
- CPI depends on instruction mix and microarchitecture
- Clock period limited by longest combinational path
- MIPS is a flawed metric; use benchmarks instead
- Amdahl's Law limits speedup from partial optimization
- Power = dynamic + static; both critical in modern designs
- Performance/Watt increasingly important
- No single best design—trade-offs depend on requirements
