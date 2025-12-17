# Pipeline Performance Analysis

Understanding pipeline performance requires analyzing how various factors—hazards, prediction accuracy, cache behavior—combine to determine actual throughput. This section covers performance metrics, analysis techniques, and optimization strategies.

## Pipeline Performance Equation

### Basic CPI Model

For a pipelined processor:

$$\text{CPI} = \text{CPI}_{\text{ideal}} + \text{CPI}_{\text{stalls}}$$

$$\text{CPI}_{\text{ideal}} = 1 \text{ (for scalar pipeline)}$$

$$\text{CPI}_{\text{stalls}} = \text{CPI}_{\text{data}} + \text{CPI}_{\text{control}} + \text{CPI}_{\text{structural}}$$

### Expanded Model

$$\text{CPI} = 1 + \frac{\text{data}_{\text{stalls}}}{\text{instruction}} + (\text{branch}_{\text{penalty}} \times \text{branch}_{\text{freq}} \times \text{mispredict}_{\text{rate}}) + \frac{\text{memory}_{\text{stalls}}}{\text{instruction}}$$

Each component can be analyzed separately.

## Data Hazard Impact

### Without Forwarding

Assume 30% of instructions depend on the previous instruction:

$$\text{Stall cycles needed} = 2 \text{ cycles (wait for WB)}$$
$$\text{Dependency rate} = 30\%$$
$$\text{CPI}_{\text{data}} = 0.30 \times 2 = 0.60$$

### With Forwarding

Forwarding eliminates most stalls. Only load-use hazards remain:

$$\text{Load-use rate} = 15\% \text{ of loads, loads are } 25\% \text{ of instructions}$$
$$\text{Stall cycles} = 1$$
$$\text{CPI}_{\text{data}} = 0.25 \times 0.15 \times 1 = 0.0375$$

Forwarding reduces data hazard CPI from 0.60 to ~0.04!

## Control Hazard Impact

### Basic Analysis

$$\text{Branch frequency} = 15\text{-}20\% \text{ of instructions}$$
$$\text{Misprediction rate} = 5\text{-}15\% \text{ (with prediction)}$$
$$\text{Branch penalty} = 2\text{-}3 \text{ cycles (5-stage)}, 10\text{-}20 \text{ cycles (deep OoO)}$$

$$\text{CPI}_{\text{control}} = \text{branch}_{\text{freq}} \times \text{mispredict}_{\text{rate}} \times \text{penalty}$$

**Example (5-stage)**:

$$\text{CPI}_{\text{control}} = 0.15 \times 0.10 \times 2 = 0.03$$

**Example (15-stage OoO)**:

$$\text{CPI}_{\text{control}} = 0.15 \times 0.05 \times 15 = 0.11$$

Deeper pipelines need better prediction!

### Prediction Accuracy Impact

| Accuracy | Mispredict Rate | CPI_control (15-cycle penalty) |
|----------|-----------------|-------------------------------|
| 80% | 20% | 0.45 |
| 90% | 10% | 0.225 |
| 95% | 5% | 0.113 |
| 98% | 2% | 0.045 |
| 99% | 1% | 0.023 |

Every 1% improvement matters significantly for deep pipelines.

## Memory Stall Impact

Cache misses cause significant stalls:

$$\text{CPI}_{\text{memory}} = (\text{loads} + \text{stores}) \times \text{miss}_{\text{rate}} \times \text{miss}_{\text{penalty}}$$

**Example**:
- Memory instructions: 35% of total
- L1 miss rate: 5%
- L1 miss penalty: 10 cycles (assuming L2 hit)

$$\text{CPI}_{\text{memory}} = 0.35 \times 0.05 \times 10 = 0.175$$

With L2 misses:
- L2 miss rate (given L1 miss): 10%
- L2 miss penalty: 100 cycles

$$\text{CPI}_{\text{memory,L2}} = 0.35 \times 0.05 \times 0.10 \times 100 = 0.175 \text{ (additional)}$$

Memory system is often the biggest performance limiter!

## Complete CPI Calculation

**Example System**:
- 5-stage pipeline
- Forwarding enabled
- 90% branch prediction accuracy
- 2-cycle branch penalty
- 5% L1 cache miss rate
- 10-cycle L1 miss penalty

$$\text{CPI} = 1 + 0.04 + (0.15 \times 0.10 \times 2) + (0.35 \times 0.05 \times 10)$$
$$= 1 + 0.04 + 0.03 + 0.175$$
$$= 1.245$$

$$\text{IPC} = \frac{1}{\text{CPI}} = 0.80 \text{ instructions per cycle}$$

## Speedup Analysis

### Comparing Designs

**Design A**: 5-stage, 2 GHz, CPI = 1.2
**Design B**: 10-stage, 3 GHz, CPI = 1.5

$$\text{Performance}_A = \frac{2 \text{ GHz}}{1.2} = 1.67 \text{ billion instructions/sec}$$

$$\text{Performance}_B = \frac{3 \text{ GHz}}{1.5} = 2.0 \text{ billion instructions/sec}$$

$$\text{Speedup of B over A} = \frac{2.0}{1.67} = 1.2\times$$

Deeper pipeline is faster despite higher CPI due to higher clock.

### Amdahl's Law Application

Optimizing branch prediction (currently 10% of CPI):

```
Current CPI = 1.25
Branch contribution = 0.125 (10%)

If we halve misprediction rate:
New branch contribution = 0.0625
New CPI = 1.25 - 0.125 + 0.0625 = 1.1875
Speedup = 1.25 / 1.1875 = 1.05×
```

Limited return because other factors dominate.

## Performance Counters

Modern CPUs provide hardware counters for analysis:

| Counter | Meaning |
|---------|---------|
| Instructions retired | Completed instructions |
| Cycles | Clock cycles |
| Branch mispredictions | Wrong predictions |
| Cache misses (L1/L2/L3) | Memory hierarchy misses |
| Stall cycles | Pipeline stalls by type |

**Using counters**:
```bash
perf stat ./program
# Shows IPC, cache miss rates, branch misprediction rate
```

## Optimization Strategies

### Software (Compiler) Optimizations

1. **Loop unrolling**: Reduce branch frequency
```c
// Before
for (i = 0; i < 100; i++) a[i] = b[i] + c[i];

// After (4× unrolled)
for (i = 0; i < 100; i += 4) {
    a[i] = b[i] + c[i];
    a[i+1] = b[i+1] + c[i+1];
    a[i+2] = b[i+2] + c[i+2];
    a[i+3] = b[i+3] + c[i+3];
}
```

2. **Instruction scheduling**: Hide latencies
```nasm
; Before (stall after load)
lw   $t0, 0($t1)
add  $t2, $t0, $t3    ; Depends on load

; After (fill delay)
lw   $t0, 0($t1)
sub  $t4, $t5, $t6    ; Independent - fill delay
add  $t2, $t0, $t3    ; Load now complete
```

3. **Cache-friendly access**: Improve locality
```c
// Bad: Column-major access (cache unfriendly)
for (i = 0; i < N; i++)
    for (j = 0; j < N; j++)
        sum += a[j][i];

// Good: Row-major access (cache friendly)
for (i = 0; i < N; i++)
    for (j = 0; j < N; j++)
        sum += a[i][j];
```

### Hardware Optimizations

1. **Increase forwarding paths**: Reduce data stalls
2. **Better branch prediction**: Reduce control stalls
3. **Larger caches**: Reduce miss rate
4. **Prefetching**: Hide memory latency
5. **More execution units**: Increase ILP exploitation

## Performance Benchmarking

### SPEC CPU Benchmarks

Standard tests for CPU performance:

| Benchmark | Type | What It Tests |
|-----------|------|---------------|
| gcc | Integer | Branch-heavy, complex control |
| mcf | Integer | Memory-intensive |
| xalancbmk | Integer | Large working set |
| povray | Float | Compute-intensive |
| lbm | Float | Memory bandwidth |

### Geometric Mean

For multiple benchmarks, use geometric mean:

$$\text{SPECmark} = \left(\prod_{i=1}^{n} \text{speedup}_i\right)^{1/n}$$

This prevents any single benchmark from dominating.

## Real-World Performance

**Example: Intel Core i7-12700K**
- 12 cores (8 P-cores, 4 E-cores)
- P-core: ~15-stage pipeline, 6-wide OoO
- Branch prediction: 97%+ accuracy
- L1 cache: 32KB/80KB per core
- Typical IPC: 2-3 on integer workloads

**Example: Apple M2**
- 8 cores (4 performance, 4 efficiency)
- Performance core: 8-wide, very deep OoO
- Exceptional branch prediction
- Large L2 cache
- Typical IPC: 3-4 on integer workloads

## Key Takeaways

- CPI = 1 + data_stalls + control_stalls + memory_stalls
- Forwarding dramatically reduces data hazard impact
- Branch prediction accuracy critical for deep pipelines
- Memory stalls often dominate in real workloads
- Performance counters enable precise analysis
- Software and hardware optimizations work together
- Real CPUs achieve IPC of 2-4 through advanced techniques
- Benchmarks provide standardized performance comparison
