---
id: cs202-t6-dram
title: "DRAM Organization"
order: 2
---

# DRAM Organization and Operation

Dynamic Random Access Memory (DRAM) serves as main memory in virtually all computing systems. Understanding DRAM's internal organization and timing characteristics is essential for optimizing memory performance and designing memory controllers.

## DRAM Cell Basics

### Cell Structure

Each DRAM cell stores one bit using a capacitor:

```
       Word Line (row select)
            │
       ┌────┴────┐
       │  NMOS   │  Access Transistor
       └────┬────┘
            │
Bit Line ───┤
            │
       ┌────┴────┐
       │ Storage │  ~30 femtofarads
       │Capacitor│
       └─────────┘
            │
          Ground
```

**Storing data**:
- Charge capacitor → Logic 1
- Discharge capacitor → Logic 0

**Reading data**:
1. Precharge bit line to Vdd/2
2. Open access transistor (word line high)
3. Charge sharing between bit line and capacitor
4. Sense amplifier detects small voltage change
5. Amplify to full swing (0 or Vdd)

### Destructive Read

Reading destroys the stored charge:

```
Before read: Capacitor = Vdd (logic 1)

After read: Capacitor = Vdd/2 + small_delta

Must restore data after every read!
```

### Refresh

Capacitors leak charge—must refresh periodically:

```
Retention time: ~64 ms (typical)
Refresh interval: Every row refreshed within 64 ms

For 8GB DRAM with 64K rows:
Refresh rate: 64K rows / 64 ms = 1000 rows/ms
```

Refresh consumes bandwidth and power.

## DRAM Organization

### Hierarchical Structure

```
                    DIMM (Dual Inline Memory Module)
    ┌────────────────────────────────────────────────────────┐
    │  Rank 0                    Rank 1                      │
    │ ┌────────┬────────┐      ┌────────┬────────┐          │
    │ │ Chip 0 │ Chip 1 │ ... │ Chip 0 │ Chip 1 │ ...      │
    │ └────────┴────────┘      └────────┴────────┘          │
    └────────────────────────────────────────────────────────┘

                    Inside Each Chip
    ┌───────────────────────────────────────────────────────┐
    │  Bank 0    Bank 1    Bank 2    ...    Bank 7         │
    │ ┌───────┐ ┌───────┐ ┌───────┐      ┌───────┐        │
    │ │ Array │ │ Array │ │ Array │      │ Array │        │
    │ │  of   │ │  of   │ │  of   │      │  of   │        │
    │ │ Cells │ │ Cells │ │ Cells │      │ Cells │        │
    │ └───────┘ └───────┘ └───────┘      └───────┘        │
    └───────────────────────────────────────────────────────┘
```

### Bank Organization

Each bank contains a 2D array of cells:

```
                        Columns (4096-16384)
              ┌─────────────────────────────────────┐
         Row  │ [0,0] [0,1] [0,2] ... [0,N-1]      │
         0    │                                     │
              ├─────────────────────────────────────┤
         Row  │ [1,0] [1,1] [1,2] ... [1,N-1]      │
         1    │                                     │
Rows          ├─────────────────────────────────────┤
(32K-64K)     │  ...                               │
              ├─────────────────────────────────────┤
         Row  │ [M,0] [M,1] [M,2] ... [M,N-1]      │
         M-1  │                                     │
              └─────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │   Row Buffer      │ (Sense Amplifiers)
                    │   (page buffer)   │
                    └───────────────────┘
```

**Row buffer**: Holds one row (~8KB), acts as cache for bank.

## DRAM Access Sequence

### Three-Step Access

Every DRAM access involves:

1. **ACT (Activate)**: Open a row
2. **RD/WR (Read/Write)**: Access columns
3. **PRE (Precharge)**: Close the row

```
ACT: Select row, transfer to row buffer
┌───────────────────────────────────────────┐
│                                           │
│   Row 5 ──────────────► Row Buffer        │
│                         (sense amps)      │
│                                           │
└───────────────────────────────────────────┘

RD: Read from row buffer
┌───────────────────────────────────────────┐
│                                           │
│   Row Buffer ──► Column 23 ──► Data Out   │
│                                           │
└───────────────────────────────────────────┘

PRE: Write back and close
┌───────────────────────────────────────────┐
│                                           │
│   Row Buffer ──────────────► Row 5        │
│              (write back)                 │
│                                           │
└───────────────────────────────────────────┘
```

### Timing Parameters

Key DRAM timing (in nanoseconds):

| Parameter | Symbol | DDR4-3200 | Meaning |
|-----------|--------|-----------|---------|
| CAS Latency | tCL | 14-20 ns | Column access time |
| RAS to CAS | tRCD | 14-20 ns | Row activate to column |
| Row Precharge | tRP | 14-20 ns | Close row time |
| Row Active | tRAS | 32-40 ns | Min row open time |
| Row Cycle | tRC | 46-60 ns | Full access cycle |

**Typical notation**: DDR4-3200 CL16 (3200 MT/s, CAS latency 16 cycles)

## Row Buffer Behavior

### Row Buffer Hit

Accessing data in already-open row:

```
Access pattern: Row 5, Col 10 → Row 5, Col 20 → Row 5, Col 30

Row 5 opened ──► Read Col 10 ──► Read Col 20 ──► Read Col 30
    │               tCL           tCL           tCL
    └───────────────────────────────────────────────────────►
                    Time

Total time: tRCD + 3 × tCL ≈ 15 + 3×14 = 57 ns
```

**Row buffer hit**: Fast, only column access (tCL).

### Row Buffer Miss (Different Row)

Accessing different row in same bank:

```
Access: Row 5, then Row 8

Row 5 open ──► PRE ──► ACT Row 8 ──► Read
     │          tRP       tRCD         tCL
     └─────────────────────────────────────────►
                    Time

Total time: tRP + tRCD + tCL ≈ 14 + 14 + 14 = 42 ns (per access)
```

**Row buffer miss**: Slow, must precharge and activate new row.

### Row Buffer Conflict

Repeatedly accessing different rows = pathological case:

```
Access: Row 5, Row 8, Row 5, Row 8...

Each access: tRP + tRCD + tCL ≈ 42 ns

Miss rate: 100% → poor performance
```

## Bank-Level Parallelism

### Interleaving Accesses

Different banks can operate independently:

```
Bank 0:  ACT────────RD────────PRE
Bank 1:       ACT────────RD────────PRE
Bank 2:            ACT────────RD────────PRE
Bank 3:                 ACT────────RD────────PRE
         ────────────────────────────────────────────►
                         Time

Overlapped: Higher throughput than sequential
```

### Address Mapping

Map addresses to spread across banks:

```
Physical Address: [Row | Bank | Column | Byte Offset]

Example: 8 banks, 8KB row buffer
Bits:    [31:17 | 16:14 | 13:3 | 2:0]

Sequential addresses hit different banks:
0x0000 → Bank 0
0x2000 → Bank 1
0x4000 → Bank 2
...
```

## DDR Signaling

### Double Data Rate

Transfer data on both clock edges:

```
Clock:    ___/‾‾‾\___/‾‾‾\___/‾‾‾\___
                │       │       │
Rising:         D0      D2      D4
Falling:     D1      D3      D5

DDR4-3200: 1600 MHz clock × 2 edges = 3200 MT/s (megatransfers/sec)
```

### Burst Mode

DRAM returns multiple words per command:

```
Single read command → Burst of 8 words

Command:  RD
Data:     [W0][W1][W2][W3][W4][W5][W6][W7]
          ──────────────────────────────────►
                   8 transfers

At 8 bytes/word, DDR4-3200: 3200 × 8 = 25.6 GB/s per channel
```

## DDR Evolution

### Generation Comparison

| Feature | DDR3 | DDR4 | DDR5 |
|---------|------|------|------|
| Data rate | 800-2133 MT/s | 1600-3200 MT/s | 3200-8400 MT/s |
| Voltage | 1.5V | 1.2V | 1.1V |
| Prefetch | 8n | 8n | 16n |
| Banks/chip | 8 | 16 | 32 |
| Max DIMM | 16 GB | 64 GB | 256 GB |

### DDR5 Improvements

- Two independent 32-bit channels per DIMM
- On-die ECC
- Higher bank count for better parallelism
- Same latency (ns), higher bandwidth

## Memory Controller

### Functions

The memory controller manages DRAM:

```
┌───────────────────────────────────────────────────────────┐
│                   Memory Controller                        │
├───────────────────────────────────────────────────────────┤
│  Request Queue                                             │
│  ┌──────┬──────┬──────┬──────┐                            │
│  │ Req0 │ Req1 │ Req2 │ Req3 │                            │
│  └──────┴──────┴──────┴──────┘                            │
│                                                            │
│  Scheduler (reorder for row buffer hits, bank parallelism) │
│                                                            │
│  Command Generator (ACT, RD, WR, PRE, REF)                │
│                                                            │
│  Timing Enforcer (obey tRCD, tRP, tCL, etc.)              │
└───────────────────────────────────────────────────────────┘
              │
              ▼
         DRAM DIMMs
```

### Request Scheduling

Reorder requests for better performance:

```
Request order: R5-C1, R8-C2, R5-C3, R8-C4

Naive (FIFO): R5 miss, R8 miss, R5 miss, R8 miss

Reordered: R5-C1, R5-C3, R8-C2, R8-C4
           (row buffer hits!)
```

**FR-FCFS (First-Ready First-Come First-Served)**: Prioritize row buffer hits.

## Key Takeaways

- DRAM cells use capacitor + transistor (1T1C)
- Reading is destructive—data must be restored
- Refresh required every ~64ms (consumes bandwidth)
- Three-step access: Activate, Read/Write, Precharge
- Row buffer acts as cache for current row
- Row buffer hits are fast; misses are slow
- Bank-level parallelism hides latency
- DDR doubles transfer rate using both clock edges
- Memory controller schedules requests for performance
- DDR5 brings higher bandwidth, more banks, on-die ECC

