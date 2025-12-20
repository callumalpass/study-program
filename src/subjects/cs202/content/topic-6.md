## Introduction

The memory hierarchy extends beyond caches to include main memory (DRAM), solid-state storage, and magnetic disks. Understanding the characteristics of each level helps in designing efficient systems and writing performance-aware software.

**Learning Objectives:**
- Explain DRAM organization and timing parameters
- Compare SSD and HDD characteristics
- Understand memory controller operation
- Analyze bandwidth and latency trade-offs
- Evaluate emerging memory technologies (HBM, NVM)
- Design memory systems for different workloads

---

## Core Concepts

### DRAM Organization

Dynamic RAM stores data as charge in capacitors:

```
DRAM Chip Structure:
┌─────────────────────────────────────┐
│  Bank 0    Bank 1    Bank 2    ...  │
│ ┌──────┐  ┌──────┐  ┌──────┐        │
│ │ Row  │  │ Row  │  │ Row  │        │
│ │Buffer│  │Buffer│  │Buffer│        │
│ └──────┘  └──────┘  └──────┘        │
└─────────────────────────────────────┘

Access sequence:
1. Row address → Activate row (tRCD)
2. Column address → Read data (CL)
3. Precharge for next access (tRP)
```

### DRAM Timing Parameters

```
Memory access timeline:
─────┬─────────┬─────────┬─────────┬──────
     │  tRCD   │   CL    │   tRP   │
     │ Row     │ Column  │Precharge│
     │ Activate│  Read   │         │
─────┴─────────┴─────────┴─────────┴──────

Example DDR4-2400: CL=17, tRCD=17, tRP=17
Total latency for random access: ~50+ ns
```

### Storage Technologies

**SSD (Solid State Drive):**
- NAND flash memory
- No moving parts
- Read: ~50-100 μs
- Write: ~100-500 μs
- Random access efficient

**HDD (Hard Disk Drive):**
- Magnetic platters
- Mechanical seek + rotation
- Access time: 5-15 ms
- Sequential access preferred
- Lower cost per GB

### Memory Bandwidth vs Latency

```
                 Bandwidth        Latency
                 (GB/s)           (ns)
    ┌──────────┬──────────┬──────────────┐
    │ L1 Cache │ 1000+    │ ~1           │
    │ L2 Cache │ 200-500  │ ~10          │
    │ L3 Cache │ 100-200  │ ~40          │
    │ DDR4 RAM │ 20-50    │ ~50-100      │
    │ DDR5 RAM │ 40-100   │ ~50-90       │
    │ SSD      │ 3-7      │ ~50,000      │
    │ HDD      │ 0.1-0.2  │ ~10,000,000  │
    └──────────┴──────────┴──────────────┘
```

---

## Key Topics in This Section

1. **Memory Hierarchy Introduction** - Overview and design principles
2. **DRAM Organization** - Banks, rows, columns, and timing
3. **Storage Systems** - SSD and HDD characteristics
4. **Memory Controllers** - Request scheduling and optimization
5. **Bandwidth and Latency** - Performance metrics and trade-offs
6. **Emerging Memory Technologies** - HBM, NVRAM, 3D stacking
7. **Hierarchy Design** - Balancing capacity, speed, and cost

---

## Key Formulas

**Effective bandwidth with latency:**
```
Effective_BW = Data_transferred / (Latency + Transfer_time)
```

**DRAM row buffer hit rate impact:**
```
Avg_latency = Hit_rate × tCL + (1 - Hit_rate) × (tRCD + tCL + tRP)
```

---

## Prerequisites

- Cache memory concepts (Topic 5)
- Basic understanding of digital storage
- Familiarity with time unit conversions (ns, μs, ms)
