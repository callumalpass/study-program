---
id: cs202-t6-storage
title: "Storage Systems"
order: 3
---

# Storage Systems: SSDs and Hard Drives

Beyond main memory, storage systems provide persistent, high-capacity data storage. Understanding the characteristics of SSDs (Solid State Drives) and HDDs (Hard Disk Drives) is crucial for system design and performance optimization.

## Hard Disk Drives (HDD)

### Physical Structure

HDDs store data magnetically on spinning platters:

```
         Spindle
            │
    ┌───────┴───────┐
    │    Platter    │  ◄── Magnetic coating
    │   ┌───────┐   │
    │   │       │   │
    │   │  ──   │   │  ◄── Track (concentric circle)
    │   │       │   │
    │   └───────┘   │
    │               │
    └───────────────┘
           │
      ┌────┴────┐
      │  Arm    │────── Read/Write Head
      └─────────┘

Multiple platters stacked:
    ┌─────────────┐
    │   Platter 1 │ ──┐
    ├─────────────┤   │
    │   Platter 2 │ ──┼── Cylinder (same track across platters)
    ├─────────────┤   │
    │   Platter 3 │ ──┘
    └─────────────┘
```

### Access Time Components

Total access time = Seek + Rotation + Transfer

```
1. SEEK TIME: Move arm to correct track
   Average: 5-10 ms
   ┌─────────────────────────────────┐
   │  Head at track 100              │
   │       │                         │
   │       ▼                         │
   │  Move to track 5000             │
   │       │                         │
   │       ▼                         │
   │  Arm movement = seek            │
   └─────────────────────────────────┘

2. ROTATIONAL LATENCY: Wait for sector to arrive
   At 7200 RPM: one rotation = 8.33 ms
   Average wait = half rotation = 4.17 ms
   ┌─────────────────────────────────┐
   │      Desired sector             │
   │           ↓                     │
   │    ○─────────○                  │
   │   ╱           ╲                 │
   │  ○      ×      ○  ← Head here  │
   │   ╲           ╱                 │
   │    ○─────────○                  │
   │     Spinning →                  │
   └─────────────────────────────────┘

3. TRANSFER TIME: Read the data
   At 150 MB/s, 4KB = 27 μs (negligible)
```

**Total average**: 5 + 4 + 0.03 ≈ **9 ms per random access**

### Sequential vs. Random

```
Random 4KB reads:
- 9 ms per access
- ~110 IOPS (I/O operations per second)
- Throughput: 110 × 4KB = 440 KB/s

Sequential reads:
- Minimal seek (adjacent tracks)
- Minimal rotation (next sector ready)
- 150-250 MB/s sustained
```

HDDs excel at sequential access, struggle with random.

### Disk Scheduling

Reorder requests to minimize seek time:

**FCFS (First Come First Served)**:
```
Queue: 98, 183, 37, 122, 14
Head at: 53
Path: 53→98→183→37→122→14
Total movement: 640 tracks
```

**SSTF (Shortest Seek Time First)**:
```
Queue: 98, 183, 37, 122, 14
Head at: 53
Path: 53→37→14→98→122→183
Total movement: 236 tracks
```

**SCAN (Elevator)**:
```
Move in one direction until end, then reverse
Path: 53→37→14→[end]→98→122→183
Fairer than SSTF, good throughput
```

## Solid State Drives (SSD)

### Flash Memory Basics

SSDs use NAND flash memory:

```
Flash Cell (Floating Gate Transistor):
                Control Gate
                     │
              ┌──────┴──────┐
              │   Oxide     │
              ├─────────────┤
              │  Floating   │ ◄── Trapped electrons = stored bit
              │    Gate     │
              ├─────────────┤
              │   Oxide     │
              └──────┬──────┘
                     │
              Source ─── Drain
```

**Cell types**:
| Type | Bits/Cell | Levels | Endurance | Speed |
|------|-----------|--------|-----------|-------|
| SLC | 1 | 2 | 100K writes | Fastest |
| MLC | 2 | 4 | 10K writes | Fast |
| TLC | 3 | 8 | 3K writes | Medium |
| QLC | 4 | 16 | 1K writes | Slower |

### SSD Organization

```
┌───────────────────────────────────────────────────────────┐
│                        SSD                                 │
│  ┌─────────────────────────────────────────────────────┐  │
│  │                   Controller                         │  │
│  │  ┌─────────────┬──────────────┬──────────────────┐  │  │
│  │  │ FTL (Flash │ Wear Leveling│   ECC Engine     │  │  │
│  │  │Translation │              │                   │  │  │
│  │  │   Layer)   │              │                   │  │  │
│  │  └─────────────┴──────────────┴──────────────────┘  │  │
│  └─────────────────────────────────────────────────────┘  │
│                           │                                │
│  ┌────────────────────────┼────────────────────────────┐  │
│  │           NAND Flash Packages                       │  │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐     │  │
│  │  │Chip 0│ │Chip 1│ │Chip 2│ │Chip 3│ │Chip 4│ ... │  │
│  │  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘     │  │
│  └─────────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────────┐  │
│  │              DRAM Cache (512MB-4GB)                  │  │
│  └─────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────┘
```

### Read vs. Write Asymmetry

**Reading**: Fast, can read any page
```
Read page: ~25-50 μs
Random 4KB read: ~10,000 IOPS per chip
With parallelism: 500,000+ IOPS
```

**Writing**: Complex, must erase before write
```
Write page: ~200-500 μs
But can only erase entire block (128-512 pages)
Erase block: ~1.5-3 ms
```

### The Erase Problem

```
Block Structure:
┌─────────────────────────────────────────┐
│              Block (256 pages)           │
├─────┬─────┬─────┬─────┬─────┬─────┬────┤
│Page │Page │Page │Page │Page │Page │... │
│  0  │  1  │  2  │  3  │  4  │  5  │    │
└─────┴─────┴─────┴─────┴─────┴─────┴────┘

Pages can be:
- Written once (from erased state)
- Read anytime
- But entire block must be erased to write again

Update Page 2:
1. Read all valid pages from block
2. Erase entire block
3. Write back all pages including updated Page 2
```

### Flash Translation Layer (FTL)

Maps logical addresses to physical locations:

```
Logical Block Address (from OS)
            │
            ▼
┌───────────────────────────────────────┐
│     Flash Translation Layer (FTL)      │
│                                        │
│  Mapping Table:                        │
│  LBA 0 → Chip 2, Block 15, Page 7     │
│  LBA 1 → Chip 0, Block 3, Page 12     │
│  LBA 2 → Chip 1, Block 8, Page 0      │
│  ...                                   │
└───────────────────────────────────────┘
            │
            ▼
Physical Location in NAND
```

**Key FTL functions**:
- Address translation
- Garbage collection (reclaim invalid pages)
- Wear leveling (spread writes evenly)

### Wear Leveling

Flash cells wear out after limited writes:

```
Without wear leveling:
Block 0: [100K writes] ← Dead
Block 1: [100K writes] ← Dead
Block 2: [50 writes]   ← Fine
Block 3: [10 writes]   ← Fine

With wear leveling:
Block 0: [25K writes]
Block 1: [25K writes]
Block 2: [25K writes]
Block 3: [25K writes]
All blocks share wear → longer life
```

### Garbage Collection

```
Before GC:
Block A: [Valid][Invalid][Valid][Invalid][Valid]
Block B: [Invalid][Valid][Invalid][Invalid][Valid]

GC Process:
1. Copy valid pages to new block
2. Erase old blocks

After GC:
Block C: [Valid][Valid][Valid][Valid]
Block A: [Erased - ready for new writes]
Block B: [Erased - ready for new writes]
```

**Write amplification**: Internal writes > host writes due to GC.

## HDD vs. SSD Comparison

| Feature | HDD | SSD |
|---------|-----|-----|
| Random read | ~0.3 ms | ~0.05 ms |
| Random write | ~5 ms | ~0.1 ms |
| Sequential read | 150-250 MB/s | 500-7000 MB/s |
| Sequential write | 150-200 MB/s | 500-5000 MB/s |
| IOPS (random) | ~100 | 100,000-1,000,000 |
| Power (active) | 5-10 W | 2-5 W |
| Power (idle) | 3-5 W | 0.05-0.5 W |
| Shock resistance | Poor | Excellent |
| Cost per GB | $0.02 | $0.10 |
| Endurance | Very high | Limited writes |

## Interface Technologies

### SATA (Serial ATA)

```
Protocol: AHCI (Advanced Host Controller Interface)
Bandwidth: 6 Gb/s (SATA III) = ~550 MB/s
Queue depth: 32 commands
```

Used by: Budget SSDs, all HDDs

### NVMe (Non-Volatile Memory Express)

```
Protocol: Designed for flash
Interface: PCIe lanes (×4 typical)
Bandwidth: PCIe 4.0 ×4 = 8 GB/s, PCIe 5.0 ×4 = 16 GB/s
Queue depth: 65,535 queues × 65,536 commands each
```

Used by: High-performance SSDs

### Performance Impact

```
4KB Random Read IOPS:
SATA SSD:  ~100,000 IOPS
NVMe SSD:  ~500,000-1,000,000 IOPS

Queue depth advantage:
SATA (depth 32): Limited parallelism
NVMe (massive queues): Full parallelism
```

## Key Takeaways

- HDDs use magnetic platters with mechanical seek
- HDD random access ~9ms, sequential ~200 MB/s
- Disk scheduling (SSTF, SCAN) reduces seek time
- SSDs use NAND flash with no moving parts
- Flash requires erase before write (block-level)
- FTL manages address mapping and wear leveling
- SSDs have write asymmetry and limited endurance
- SSDs: 100-1000× better random I/O than HDDs
- NVMe provides much higher throughput than SATA
- SSDs dominate for performance; HDDs for bulk storage

