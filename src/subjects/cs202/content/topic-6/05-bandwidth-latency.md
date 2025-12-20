# Memory Bandwidth and Latency

Memory bandwidth and latency are the two fundamental performance metrics of memory systems. They interact in complex ways, and understanding both is essential for optimizing system performance.

## Understanding Bandwidth

### Definition

**Bandwidth** is the maximum rate of data transfer:

```
Bandwidth = Data transferred / Time
Units: GB/s, MB/s
```

### Theoretical vs. Effective Bandwidth

**Theoretical (peak) bandwidth**:
```
DDR4-3200, dual channel, 64-bit per channel:
= 3200 MT/s × 8 bytes × 2 channels
= 51.2 GB/s
```

**Effective (achieved) bandwidth**:
```
Actual measurement under workload
Usually 60-80% of theoretical due to:
- Protocol overhead
- Refresh
- Scheduling inefficiencies
- Row buffer misses
```

### Bandwidth Calculation Examples

```
Example 1: DDR5-4800 single channel
Peak = 4800 MT/s × 8 bytes = 38.4 GB/s

Example 2: DDR5-4800 dual channel
Peak = 4800 × 8 × 2 = 76.8 GB/s

Example 3: HBM2 (High Bandwidth Memory)
1024-bit interface, 2 GT/s
Peak = 2000 × 128 bytes = 256 GB/s
```

## Understanding Latency

### Definition

**Latency** is the time from request to data delivery:

```
Latency = Time from CPU request to data available
Units: nanoseconds, CPU cycles
```

### Latency Components

```
Total Memory Latency:
┌──────────────────────────────────────────────────────────┐
│ CPU Pipeline │ Interconnect │   MC Queue   │   DRAM    │
│   (~5ns)     │   (~10ns)    │   (~20ns)    │  (~50ns)  │
└──────────────────────────────────────────────────────────┘
               │                              │
               └──────────────────────────────┘
                     Variable (load-dependent)
```

### Loaded vs. Unloaded Latency

**Unloaded latency** (empty system):
```
Only DRAM access time matters
~50-70 ns for modern DDR4/DDR5
```

**Loaded latency** (busy system):
```
Queuing delays dominate
Can be 200-500+ ns under heavy load
```

```
            Latency
               │
           500 │                    ****
               │                ***
           400 │             **
               │          **
           300 │       **
               │     *
           200 │   *
               │  *
           100 │ *
               │*
            50 │*
               └────────────────────────────► Bandwidth
                0%   25%   50%   75%  100%
                      Utilization

Latency increases exponentially as bandwidth approaches saturation!
```

## Little's Law

### The Relationship

```
Throughput = Outstanding Requests / Latency

Or equivalently:
Outstanding Requests = Throughput × Latency
```

### Memory System Application

To achieve target bandwidth, need sufficient outstanding requests:

```
Target: 40 GB/s
Latency: 100 ns
Cache line: 64 bytes

Required outstanding requests:
= (40 GB/s × 100 ns) / 64 bytes
= (40 × 10^9 × 100 × 10^-9) / 64
= 4000 / 64
= 62.5 requests

Need ~63 outstanding memory requests to saturate bandwidth!
```

### Memory Level Parallelism (MLP)

```
Low MLP (serial accesses):
Request 1 → Wait 100ns → Request 2 → Wait 100ns → ...
Bandwidth: 64B / 100ns = 640 MB/s

High MLP (parallel accesses):
Request 1,2,3...64 → Wait 100ns → All complete
Bandwidth: 64×64B / 100ns = 40 GB/s

MLP essential for bandwidth utilization!
```

## Bandwidth Optimization

### Channel Interleaving

Spread data across memory channels:

```
Without interleaving:
Sequential access → All to Channel 0
Channel 0: BUSY BUSY BUSY
Channel 1: idle idle idle
Bandwidth: 50% utilized

With interleaving:
Sequential access → Alternates channels
Channel 0: BUSY idle BUSY idle
Channel 1: idle BUSY idle BUSY
Bandwidth: 100% utilized
```

### Bank-Level Parallelism

Access different banks concurrently:

```
Bank 0: ACT─────RD─────PRE
Bank 1:     ACT─────RD─────PRE
Bank 2:         ACT─────RD─────PRE
Bank 3:             ACT─────RD─────PRE

Overlapped commands → Higher throughput
```

### Burst Mode

Read multiple words per command:

```
Single 8-byte read: 64 bits / command
Burst of 8 (DDR4): 512 bits / command

Burst amortizes command overhead
Matches cache line size (64B)
```

## Latency Optimization

### Out-of-Order Execution

Hide memory latency with useful work:

```
lw   $t0, 0($a0)     # Cache miss - 200 cycle wait
add  $t1, $t2, $t3   # Independent - execute now!
sub  $t4, $t5, $t6   # Independent - execute now!
mul  $t7, $t8, $t9   # Independent - execute now!
...                   # Many more instructions
use  $t0             # Load finally complete
```

### Prefetching

Fetch data before it's needed:

```
Sequential access pattern:
for (i = 0; i < N; i++) {
    prefetch(&A[i+16]);  // Start fetch early
    sum += A[i];          // Use data (already fetched)
}

Hides latency if prefetch distance matches latency
```

### Non-Blocking Caches

Continue processing during cache miss:

```
Miss-under-miss:
Access A → Miss, request to memory
Access B → Miss, request to memory (don't wait for A!)
Access C → Miss, request to memory
...
A, B, C arrive → Continue

More outstanding misses → Better MLP → Higher bandwidth
```

## Memory-Bound vs. Compute-Bound

### Roofline Model

```
Attainable Performance = min(Peak Compute, Peak Bandwidth × Operational Intensity)

            Performance (GFLOPS)
                 │
            1000 │              ┌────────────── Compute bound
                 │             ╱
                 │            ╱
             100 │           ╱
                 │          ╱
                 │         ╱
              10 │        ╱
                 │       ╱
                 │      ╱ ← Memory bound
               1 │     ╱
                 │    ╱
                 └───┴────────────────────────► Operational Intensity
                    0.1   1    10   100      (FLOPS/Byte)
```

### Operational Intensity

```
Operational Intensity = Operations / Data Moved

Low OI (< 1): Memory bound
- Matrix-vector multiply
- Graph algorithms
- Sparse computations

High OI (> 10): Compute bound
- Dense matrix multiply
- FFT
- Neural network inference
```

### Optimization Strategy

**Memory-bound workloads**:
```
Focus on:
- Reducing data movement
- Improving cache hit rate
- Increasing memory bandwidth
- Prefetching
```

**Compute-bound workloads**:
```
Focus on:
- Vectorization (SIMD)
- Parallelization
- Algorithm optimization
- Hardware accelerators
```

## Measuring Memory Performance

### Benchmarks

**STREAM Benchmark**:
```c
// COPY: c[i] = a[i]
// SCALE: b[i] = scalar * c[i]
// ADD: c[i] = a[i] + b[i]
// TRIAD: a[i] = b[i] + scalar * c[i]

Measures sustainable memory bandwidth
```

**lmbench**:
```
Measures memory latency at various sizes
Reveals cache and memory hierarchy
```

### Performance Counters

```bash
# Linux perf
perf stat -e LLC-load-misses,LLC-loads ./program

# Intel VTune
Memory bandwidth per core
Outstanding misses
```

## Case Study: Matrix Multiply

```c
// Naive: Low operational intensity per cache line
for (i = 0; i < N; i++)
    for (j = 0; j < N; j++)
        for (k = 0; k < N; k++)
            C[i][j] += A[i][k] * B[k][j];

// B accessed by column = poor locality
// OI ≈ 2 FLOPS / 8 bytes = 0.25 → Memory bound

// Blocked: High operational intensity
for (ii = 0; ii < N; ii += BLOCK)
  for (jj = 0; jj < N; jj += BLOCK)
    for (kk = 0; kk < N; kk += BLOCK)
      // Small block fits in cache
      // Each element reused BLOCK times
      // OI ≈ 2*BLOCK FLOPS / 8 bytes → Compute bound
```

## Key Takeaways

- Bandwidth is maximum data rate; latency is response time
- Effective bandwidth is typically 60-80% of theoretical
- Latency increases dramatically as bandwidth approaches saturation
- Little's Law: Need sufficient outstanding requests for bandwidth
- MLP (Memory Level Parallelism) is essential for bandwidth
- Channel and bank interleaving improve parallelism
- Prefetching hides latency by overlapping fetch with computation
- Roofline model identifies memory vs. compute bound
- Operational intensity determines optimization strategy
- Blocking improves locality for memory-bound algorithms

