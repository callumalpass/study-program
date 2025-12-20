# Memory Controllers and Interfaces

The memory controller is the critical interface between the processor and DRAM. Its design significantly impacts memory bandwidth, latency, and power consumption. Understanding memory controller architecture helps explain system performance characteristics.

## Memory Controller Functions

### Core Responsibilities

```
┌─────────────────────────────────────────────────────────────┐
│                    Memory Controller                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Request Handling                                         │
│     - Accept read/write requests from CPU/caches             │
│     - Queue and prioritize requests                          │
│                                                              │
│  2. Address Translation                                      │
│     - Map physical address to DRAM location                  │
│     - (Channel, Rank, Bank, Row, Column)                    │
│                                                              │
│  3. Command Scheduling                                       │
│     - Generate DRAM commands (ACT, RD, WR, PRE, REF)        │
│     - Enforce timing constraints                             │
│     - Maximize throughput                                    │
│                                                              │
│  4. Data Path Management                                     │
│     - Handle DDR timing                                      │
│     - Manage write/read data buffers                         │
│                                                              │
│  5. Refresh Control                                          │
│     - Schedule refresh operations                            │
│     - Balance refresh with performance                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Controller Architecture

```
         From CPU/Cache
              │
              ▼
    ┌─────────────────────┐
    │   Request Queue     │
    │  ┌───┬───┬───┬───┐ │
    │  │R0 │R1 │R2 │R3 │ │
    │  └───┴───┴───┴───┘ │
    └─────────┬───────────┘
              │
              ▼
    ┌─────────────────────┐
    │ Address Mapper      │
    │ Phys → DRAM coords  │
    └─────────┬───────────┘
              │
              ▼
    ┌─────────────────────┐
    │ Per-Bank Queues     │
    │ ┌──┐ ┌──┐ ┌──┐ ┌──┐│
    │ │B0│ │B1│ │B2│ │B3││
    │ └──┘ └──┘ └──┘ └──┘│
    └─────────┬───────────┘
              │
              ▼
    ┌─────────────────────┐
    │ Command Scheduler   │
    │   + Timing Engine   │
    └─────────┬───────────┘
              │
              ▼
         DRAM Interface
```

## Address Mapping

### Physical to DRAM Translation

A physical address must be mapped to DRAM coordinates:

```
Physical Address (e.g., 0x123456789ABC)
         │
         ▼
┌────────┬────────┬────────┬────────┬────────┬──────────┐
│Channel │  Rank  │  Bank  │  Row   │ Column │  Offset  │
│ (0-1)  │ (0-1)  │ (0-15) │(0-64K) │(0-1K)  │ (0-63)   │
└────────┴────────┴────────┴────────┴────────┴──────────┘
```

### Mapping Policies

**Row-interleaved** (cache-line in same row):
```
Address bits: [Row | Bank | Column | Offset]

Sequential addresses → Same row, different columns
Good for: Sequential access (exploits row buffer)
```

**Bank-interleaved** (cache-line across banks):
```
Address bits: [Row | Column | Bank | Offset]

Sequential addresses → Different banks
Good for: Random access (exploits bank parallelism)
```

**XOR mapping** (reduce conflicts):
```
Bank = Bank_bits XOR Row_bits

Reduces pathological conflict patterns
```

### Example Mapping

```
32-bit address, 2 channels, 2 ranks, 8 banks, 64K rows, 1K columns, 64B lines

Bits needed:
- Channel: 1 bit
- Rank: 1 bit
- Bank: 3 bits
- Row: 16 bits
- Column: 7 bits (1024 columns / 8 burst = 128)
- Offset: 6 bits (64 bytes)

Address layout: [Row:16 | Channel:1 | Rank:1 | Bank:3 | Column:7 | Offset:6]
```

## Request Scheduling

### Scheduling Goals

1. **Maximize throughput**: Keep DRAM busy
2. **Minimize latency**: Reduce wait times
3. **Fairness**: Don't starve any requester
4. **Power efficiency**: Minimize unnecessary activations

### FCFS (First Come First Served)

Process requests in arrival order:

```
Queue: B0-R5-C1, B1-R3-C2, B0-R5-C3, B0-R8-C1

Order: R5-C1 → R3-C2 → R5-C3 → R8-C1

Simple but doesn't exploit row buffer hits
```

### FR-FCFS (First Ready, First Come First Served)

Prioritize row buffer hits:

```
Queue: B0-R5-C1, B1-R3-C2, B0-R5-C3, B0-R8-C1
Bank 0 row buffer: Row 5 open

Priority:
1. Row buffer hits: B0-R5-C1, B0-R5-C3 (hit, fast)
2. Then others by arrival: B1-R3-C2, B0-R8-C1

Order: R5-C1 → R5-C3 → R3-C2 → R8-C1 (better!)
```

### PARBS (Parallelism-Aware Batch Scheduling)

Group requests into batches, schedule within batch:

```
Batch 1: [Requests from all threads, sorted by bank]
         Schedule oldest batch first
         Within batch: FR-FCFS

Benefits:
- Fairness between threads
- Still exploits row buffer hits
- Prevents starvation
```

## Row Buffer Management

### Open-Page Policy

Keep row buffer open after access:

```
Access R5-C1 → Row 5 stays open
Access R5-C2 → Row buffer hit! (fast)
Access R5-C3 → Row buffer hit! (fast)
Access R8-C1 → Row buffer miss (need PRE + ACT)
```

**Best for**: Sequential access, streaming workloads

### Close-Page Policy

Precharge immediately after access:

```
Access R5-C1 → Precharge immediately
Access R5-C2 → Need ACT (but no PRE delay)
Access R8-C1 → Need ACT (no conflict penalty)
```

**Best for**: Random access, multi-threaded workloads

### Adaptive Policies

Predict which policy is better:

```
Track row buffer hit rate per bank
If hit rate > threshold: Keep row open
If hit rate < threshold: Close row early
```

## Refresh Management

### Refresh Requirements

```
All DRAM rows must be refreshed within 64ms

Example: 64K rows per bank
Refresh rate: 64K / 64ms = 1 row / μs

Each refresh command refreshes one row per bank simultaneously
```

### Refresh Scheduling

```
Option 1: Distributed Refresh
         Issue refresh commands spread over time
         │ ▼   │ ▼   │ ▼   │ ▼   │
         ─────────────────────────── Time
         Lower burst penalty, steady overhead

Option 2: Burst Refresh
         │             │▼▼▼▼▼▼▼▼│             │
         ─────────────────────────────────────── Time
         Higher burst penalty, longer free periods
```

### Refresh-Aware Scheduling

```
Rank A idle → Pull refresh forward for Rank A
Rank B busy → Delay Rank B refresh (within limit)

Reduces refresh interference with normal traffic
```

## Quality of Service (QoS)

### Multi-Core Memory Contention

Multiple cores compete for memory bandwidth:

```
Core 0: Memory-intensive (1000 requests/μs)
Core 1: Compute-intensive (10 requests/μs)

Without QoS:
Core 0 dominates → Core 1 starves

With QoS:
Reserve bandwidth for each core
Core 1 gets guaranteed minimum
```

### QoS Mechanisms

**Request prioritization**:
```
Priority levels: Critical, High, Normal, Low
Critical: Real-time, latency-sensitive
Low: Background, throughput-oriented
```

**Bandwidth reservation**:
```
Core 0: Maximum 60% of bandwidth
Core 1: Guaranteed 20% minimum
Core 2: Best effort (remaining)
```

**Request limiting**:
```
Core 0: Max 100 outstanding requests
Core 1: Max 50 outstanding requests
Prevents monopolization
```

## Power Management

### DRAM Power States

```
Active:    Full power, ready for commands
Precharge: Row closed, lower power
Power-down: Deep sleep, higher exit latency
Self-refresh: Maintains data, lowest active power
```

### Power-Down Policies

```
Idle threshold: If bank idle for N cycles → Enter power-down

Trade-off:
- Aggressive: Save power, but wake-up latency
- Conservative: Quick response, higher power
```

### Rank-Level Power Management

```
Stagger power-up across ranks:
Rank 0: Active
Rank 1: Power-down (idle)
Rank 2: Power-down (idle)
Rank 3: Active

Reduces peak power while maintaining performance
```

## Modern Memory Controller Features

### Intel IMC (Integrated Memory Controller)

```
Features:
- 2-4 memory channels
- DDR4/DDR5 support
- Per-channel queues
- QoS with traffic classes
- RAS features (patrol scrubbing, ECC)
```

### AMD IMC

```
Features:
- Up to 8 channels (server)
- Infinity Fabric interconnect
- Adaptive scheduling
- Memory bandwidth allocation
```

## Key Takeaways

- Memory controller bridges CPU and DRAM
- Address mapping affects parallelism and locality
- FR-FCFS exploits row buffer hits for throughput
- Open-page vs. close-page policies suit different workloads
- Refresh must be scheduled without starving requests
- QoS prevents memory bandwidth monopolization
- Power management balances performance and efficiency
- Modern IMCs are highly sophisticated, on-die components
- Controller design significantly impacts system performance

