# Emerging Memory Technologies

Traditional DRAM and SRAM face fundamental scaling challenges. New memory technologies promise to bridge the gap between memory and storage, offering unique combinations of speed, density, non-volatility, and endurance. This section explores emerging memory technologies reshaping the memory hierarchy.

## Challenges with Traditional Memory

### DRAM Scaling Limits

```
Problem: Capacitor size shrinking
- Smaller capacitor = less charge = harder to detect
- More frequent refresh needed
- Higher error rates

Cell size progression:
40nm: 30 fF capacitor, stable
20nm: 15 fF capacitor, marginal
10nm: ~8 fF capacitor, problematic
```

### Flash Limitations

```
Problem: Wear and performance
- Limited write cycles (TLC: ~3000, QLC: ~1000)
- Write amplification from garbage collection
- Increasing read disturb as cells shrink
- Slow writes compared to reads
```

## Non-Volatile Memory (NVM) Technologies

### Phase-Change Memory (PCM)

Uses chalcogenide glass that switches between crystalline and amorphous states:

```
        Crystalline State              Amorphous State
        (Low resistance = 1)           (High resistance = 0)

        ┌─────────────────┐           ┌─────────────────┐
        │ ░░░░░░░░░░░░░░░ │           │ ╱╲╱╲╱╲╱╲╱╲╱╲╱╲ │
        │ ░░ Ordered ░░░░ │           │ ╲ Disordered ╱  │
        │ ░░ Structure░░░ │           │ ╱╲╱╲╱╲╱╲╱╲╱╲╱╲ │
        └─────────────────┘           └─────────────────┘
              │                               │
              └───── Heat + Slow Cool ────────┘
              └───── Heat + Fast Cool ────────┘
```

**Characteristics**:
| Property | PCM | DRAM | Flash |
|----------|-----|------|-------|
| Read latency | ~100 ns | ~50 ns | ~50 μs |
| Write latency | ~1 μs | ~50 ns | ~500 μs |
| Endurance | 10^8 cycles | Unlimited | 10^3-10^5 |
| Non-volatile | Yes | No | Yes |
| Density | High | Medium | Very High |

**Applications**: Storage-class memory, persistent memory

### Resistive RAM (ReRAM/RRAM)

Uses metal oxide that forms/destroys conductive filaments:

```
        SET (Low R)                   RESET (High R)

        ┌─────────────────┐           ┌─────────────────┐
        │  Top Electrode  │           │  Top Electrode  │
        ├─────────────────┤           ├─────────────────┤
        │    ▓ Filament   │           │   Oxide Only    │
        │    ▓            │           │                 │
        ├─────────────────┤           ├─────────────────┤
        │ Bottom Electrode│           │ Bottom Electrode│
        └─────────────────┘           └─────────────────┘
```

**Advantages**:
- Very fast (10-100 ns)
- Low power
- High density (crossbar arrays)
- Simple structure (good for 3D stacking)

**Challenges**:
- Variability in switching
- Endurance (10^6-10^12 cycles)
- Sneak currents in crossbar arrays

### Magnetoresistive RAM (MRAM)

Uses magnetic tunnel junction (MTJ) to store data:

```
        Free Layer (programmable)
        ┌─────────────────┐
        │    ↑ or ↓      │  ◄── Magnetic orientation
        ├─────────────────┤
        │  Tunnel Barrier │  ◄── Thin insulator
        ├─────────────────┤
        │       ↑        │  ◄── Fixed reference
        │  Fixed Layer   │
        └─────────────────┘

Parallel (↑↑) = Low resistance = 0
Antiparallel (↑↓) = High resistance = 1
```

**STT-MRAM (Spin-Transfer Torque)**:
- Write by passing current through MTJ
- Read by measuring resistance
- Very fast reads (~10 ns)
- Essentially unlimited endurance (>10^15)
- Already in production (embedded applications)

### Ferroelectric RAM (FeRAM)

Uses ferroelectric material with switchable polarization:

```
        Polarization Up              Polarization Down

        ┌─────────────────┐           ┌─────────────────┐
        │  + + + + + + +  │           │  - - - - - - -  │
        │                 │           │                 │
        │  Ferroelectric  │           │  Ferroelectric  │
        │                 │           │                 │
        │  - - - - - - -  │           │  + + + + + + +  │
        └─────────────────┘           └─────────────────┘
```

**Advantages**:
- Fast (similar to DRAM)
- Low power
- Good endurance (10^12-10^15)

**Challenges**:
- Destructive read (like DRAM)
- Scaling difficulties
- Lower density than flash

## Intel Optane (3D XPoint)

### Technology

Proprietary technology (likely PCM-based):

```
3D Crossbar Structure:
        Word Lines (horizontal)
            │   │   │   │
        ────┼───┼───┼───┼────
        ────┼───┼───┼───┼────
        ────┼───┼───┼───┼────  ◄── Memory cells at crosspoints
        ────┼───┼───┼───┼────
            │   │   │   │
        Bit Lines (vertical)
```

**Key features**:
- Bit-addressable (like DRAM, unlike flash)
- Non-volatile
- ~10× denser than DRAM
- ~1000× lower latency than NAND flash

### Products

**Optane Memory (caching)**:
```
Small capacity (16-64 GB)
Caches frequently accessed data from SSD/HDD
Improves application launch times
```

**Optane DC Persistent Memory (DCPMM)**:
```
Large capacity (128-512 GB per DIMM)
Two modes:
- Memory Mode: Extends DRAM capacity (volatile use)
- App Direct: Persistent storage (byte-addressable)
```

### Performance Position

```
           Latency              Capacity
              │                    │
SRAM          │█                   │█
DRAM          │██                  │████
Optane        │████                │████████
Flash SSD     │██████████████      │████████████████████
HDD           │████████████████████│████████████████████████

Optane fills gap between DRAM and SSD
```

## High Bandwidth Memory (HBM)

### Architecture

3D-stacked DRAM with wide interface:

```
        Logic Die (CPU/GPU)
        ┌─────────────────────────────┐
        │                             │
        │     Memory Controller       │
        │                             │
        └──────────┬──────────────────┘
                   │ Through-Silicon Vias (TSVs)
        ┌──────────┴──────────────────┐
        │     DRAM Stack              │
        │  ┌────────────────────────┐ │
        │  │       Die 4            │ │
        │  ├────────────────────────┤ │
        │  │       Die 3            │ │
        │  ├────────────────────────┤ │
        │  │       Die 2            │ │
        │  ├────────────────────────┤ │
        │  │       Die 1            │ │
        │  └────────────────────────┘ │
        └─────────────────────────────┘
```

### Specifications

| Feature | HBM2 | HBM2E | HBM3 |
|---------|------|-------|------|
| Interface | 1024-bit | 1024-bit | 1024-bit |
| Data rate | 2 GT/s | 3.6 GT/s | 6.4 GT/s |
| Bandwidth | 256 GB/s | 460 GB/s | 819 GB/s |
| Capacity/stack | 8 GB | 16 GB | 24 GB |
| Power | ~15 pJ/bit | ~12 pJ/bit | ~10 pJ/bit |

**Use cases**: GPUs, AI accelerators, high-performance computing

## Processing-In-Memory (PIM)

### Concept

Move computation to where data lives:

```
Traditional:
┌────────┐          ┌────────┐
│  CPU   │ ◄──────► │ Memory │  Data movement bottleneck
└────────┘          └────────┘

Processing-In-Memory:
┌─────────────────────────────────┐
│           Memory                │
│  ┌──────────────────────────┐  │
│  │  Data  │  Data  │  Data  │  │
│  └────┬───┴────┬───┴────┬───┘  │
│       │        │        │      │
│  ┌────▼────────▼────────▼───┐  │
│  │     Processing Logic     │  │  Compute where data is
│  └──────────────────────────┘  │
└─────────────────────────────────┘
```

### Implementations

**Samsung HBM-PIM**:
- SIMD units inside HBM stack
- 2× performance for AI workloads
- Same HBM2 interface

**UPMEM Processing-in-Memory DIMM**:
- Small processors per memory bank
- Programmable via SDK
- Good for data-parallel operations

## Compute Express Link (CXL) Memory

### CXL Technology

Standard for attaching memory and accelerators:

```
┌─────────────────────────────────────────────────────┐
│                     CXL Protocol                     │
├─────────────────┬──────────────┬────────────────────┤
│   CXL.io        │   CXL.cache  │    CXL.mem         │
│ (PCIe-based I/O)│(Cache coherent│(Memory access)     │
│                 │   access)     │                    │
└─────────────────┴──────────────┴────────────────────┘
```

### CXL Memory Expansion

```
Traditional:
CPU ─── DDR5 DIMMs (limited capacity)

With CXL:
CPU ─── DDR5 DIMMs (fast tier)
 │
 └── CXL ─── CXL Memory (larger, slightly slower)
              │
              └── Pooled memory across servers
```

**Benefits**:
- Larger memory capacity
- Shared memory pools
- Tiered memory (hot/cold data)
- Memory disaggregation

## Key Takeaways

- Traditional DRAM and flash face scaling challenges
- PCM offers non-volatile memory with DRAM-like performance
- STT-MRAM provides fast, high-endurance embedded memory
- Intel Optane fills the gap between DRAM and SSDs
- HBM provides extreme bandwidth through 3D stacking
- Processing-in-memory reduces data movement
- CXL enables flexible memory expansion and pooling
- The memory hierarchy is evolving with new technologies
- Application requirements drive technology adoption
- Hybrid memory systems will become common

