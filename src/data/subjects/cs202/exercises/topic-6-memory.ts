import type { WrittenExercise } from '../../../../core/types';

export const topic6Exercises: WrittenExercise[] = [
  {
    id: 'cs202-t6-ex1',
    subjectId: 'cs202',
    topicId: 'cs202-topic6',
    type: 'written',
    title: 'Memory Hierarchy Levels',
    description: 'List the levels of the memory hierarchy from fastest to slowest. Give typical capacity and access time for each level.',
    difficulty: 1,
    hints: ['Start with CPU registers', 'End with archival storage', 'Note the trade-offs'],
    solution: `Memory Hierarchy (fastest to slowest):

Level      │ Capacity    │ Access Time │ Cost/GB  │ Technology
───────────┼─────────────┼─────────────┼──────────┼──────────────
Registers  │ ~1 KB       │ ~0.25 ns    │ -        │ SRAM (in CPU)
L1 Cache   │ 32-64 KB    │ ~1 ns       │ ~$1000   │ SRAM
L2 Cache   │ 256KB-1MB   │ ~4 ns       │ ~$100    │ SRAM
L3 Cache   │ 8-64 MB     │ ~10-20 ns   │ ~$10     │ SRAM
Main Mem   │ 8-256 GB    │ ~50-100 ns  │ ~$5      │ DRAM
SSD        │ 256GB-4TB   │ ~50-100 μs  │ ~$0.10   │ Flash
HDD        │ 1-16 TB     │ ~5-10 ms    │ ~$0.02   │ Magnetic
Tape       │ Petabytes   │ seconds-min │ ~$0.002  │ Magnetic

Key observations:
1. Capacity increases ~10-1000× per level
2. Latency increases ~10× per level
3. Cost decreases ~10× per level

The hierarchy works because of locality:
- Temporal: Recently accessed data accessed again
- Spatial: Nearby data accessed soon

Design goal: Make average access time close to fastest level
while having capacity of slowest level.

Modern system example:
- L1: 32KB × 2 (I+D), 4 cycles
- L2: 256KB, 12 cycles
- L3: 8MB shared, 40 cycles
- DRAM: 16GB, 200+ cycles`,
  },
  {
    id: 'cs202-t6-ex2',
    subjectId: 'cs202',
    topicId: 'cs202-topic6',
    type: 'written',
    title: 'DRAM vs SRAM',
    description: 'Compare DRAM and SRAM in terms of structure, speed, density, cost, and typical use. Why is SRAM used for caches and DRAM for main memory?',
    difficulty: 2,
    hints: ['SRAM uses flip-flops', 'DRAM uses capacitors', 'Consider transistor count'],
    solution: `DRAM vs SRAM Comparison:

Structure:
┌──────────────────────────────────────────────────┐
│ SRAM Cell (6 transistors):                       │
│     ┌───┐     ┌───┐                             │
│ BL──┤   ├──┬──┤   ├──BL'                        │
│     └───┘  │  └───┘                             │
│            ▼                                     │
│      Cross-coupled inverters                     │
│      (bistable - holds value)                    │
├──────────────────────────────────────────────────┤
│ DRAM Cell (1 transistor + 1 capacitor):         │
│                                                  │
│     WL ─┬─                                       │
│         │                                        │
│ BL ────┤├──┤├──                                 │
│            ═ capacitor                           │
│            │                                     │
│           GND                                    │
└──────────────────────────────────────────────────┘

Comparison:
┌─────────────┬────────────────┬────────────────┐
│ Property    │ SRAM           │ DRAM           │
├─────────────┼────────────────┼────────────────┤
│ Transistors │ 6 per bit      │ 1 per bit      │
│ Speed       │ Fast (~1-2 ns) │ Slower (~50 ns)│
│ Density     │ Lower          │ ~6× higher     │
│ Cost/bit    │ ~10× higher    │ Lower          │
│ Refresh     │ Not needed     │ Required       │
│ Power       │ Higher static  │ Lower static   │
│ Volatility  │ Volatile       │ Volatile       │
└─────────────┴────────────────┴────────────────┘

Why SRAM for caches:
- Speed critical for cache hits
- Small capacity needed (KB-MB)
- Higher cost acceptable for small size
- No refresh simplifies design

Why DRAM for main memory:
- Need large capacity (GB)
- Cost per bit critical
- Speed hidden by caches
- Refresh overhead acceptable`,
  },
  {
    id: 'cs202-t6-ex3',
    subjectId: 'cs202',
    topicId: 'cs202-topic6',
    type: 'written',
    title: 'DRAM Timing Parameters',
    description: 'Explain tRCD, CL (tCAS), and tRP. For a DDR4-2400 module with CL=17, tRCD=17, tRP=17, calculate the time to access a random memory location.',
    difficulty: 3,
    hints: ['Row activate → Column read → Precharge', 'Times are in clock cycles', 'DDR4-2400 has specific clock frequency'],
    solution: `DRAM Timing Parameters:

tRCD (RAS to CAS Delay):
- Time from row activation to column access
- Opens the row, charges sense amplifiers
- Row address → wait tRCD → column address

CL (CAS Latency) or tCAS:
- Time from column address to data output
- Also called tCL
- Column address → wait CL → data available

tRP (Row Precharge):
- Time to close row before opening another
- Prepares bank for next row activation
- Close row → wait tRP → can activate new row

Access Sequence:
┌─────────────────────────────────────────────────────┐
│ ROW ACT ──tRCD──► COL READ ──CL──► DATA            │
│                                                     │
│ For new row: close old row first                   │
│ PRECHARGE ──tRP──► ROW ACT ──tRCD──► COL ──CL──►   │
└─────────────────────────────────────────────────────┘

DDR4-2400 Calculation:

Clock frequency:
- DDR4-2400: 2400 MT/s (megatransfers/second)
- Actual clock: 1200 MHz (DDR = double data rate)
- Clock period: 1/1200MHz = 0.833 ns

Given: CL=17, tRCD=17, tRP=17

Random access (different row than last access):
Time = tRP + tRCD + CL
= 17 + 17 + 17
= 51 clock cycles
= 51 × 0.833 ns
= 42.5 ns

Row hit (same row as last access):
Time = CL = 17 cycles = 14.2 ns

This is why row buffer hits are important!
Random access: 3× slower than row hit.`,
  },
  {
    id: 'cs202-t6-ex4',
    subjectId: 'cs202',
    topicId: 'cs202-topic6',
    type: 'written',
    title: 'DRAM Banking',
    description: 'A DRAM module has 8 banks. Explain how banking helps hide latency. If back-to-back accesses go to different banks, how does this help?',
    difficulty: 3,
    hints: ['Banks operate independently', 'Pipeline accesses across banks', 'Interleaving addresses'],
    solution: `DRAM Banking and Latency Hiding:

Bank Structure:
┌─────────────────────────────────────────┐
│             DRAM Module                  │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐        │
│ │Bank0│ │Bank1│ │Bank2│ │Bank3│        │
│ └─────┘ └─────┘ └─────┘ └─────┘        │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐        │
│ │Bank4│ │Bank5│ │Bank6│ │Bank7│        │
│ └─────┘ └─────┘ └─────┘ └─────┘        │
│            Shared Data Bus              │
└─────────────────────────────────────────┘

Key insight: Banks operate INDEPENDENTLY
- Each bank has its own row buffer
- Can have different rows active
- Only share the data bus

Single Bank Sequential Access:
Time: | Act0 | Read0 | Pre0 | Act1 | Read1 | Pre1 |...
      |←────── 50ns ──────→|←────── 50ns ──────→|

Multi-Bank Interleaved Access:
Bank0: | Act0 | Read0 | Pre0 |
Bank1:    | Act1 | Read1 | Pre1 |
Bank2:       | Act2 | Read2 | Pre2 |

Time:    0    10    20    30    40    50 ns
Data:              D0    D1    D2    ...

Benefits:
1. Latency hiding: Start next bank while current completes
2. Higher bandwidth: Data arrives more frequently
3. Better utilization: Banks stay busy

Address interleaving strategies:
- Bank bits in low-order address → sequential addresses hit different banks
- Example: Address[5:3] selects bank
- Sequential access automatically interleaved

Effective bandwidth with 8 banks:
- Single bank: ~1 access per 50ns = 20 million/s
- 8 banks interleaved: up to 8× = 160 million/s
- Limited by bus bandwidth in practice`,
  },
  {
    id: 'cs202-t6-ex5',
    subjectId: 'cs202',
    topicId: 'cs202-topic6',
    type: 'written',
    title: 'Memory Controller Scheduling',
    description: 'Explain FR-FCFS (First-Ready First-Come-First-Serve) memory scheduling. Why prioritize row hits? What are the trade-offs?',
    difficulty: 4,
    hints: ['Row hits are faster', 'Order affects performance', 'Consider fairness'],
    solution: `FR-FCFS Memory Scheduling:

Basic FCFS (First-Come-First-Serve):
- Process requests in arrival order
- Simple, fair
- Ignores row buffer state

FR-FCFS (First-Ready FCFS):
- Prioritize requests that hit open row
- Among row hits, use FCFS
- Row misses wait for row hits to complete

Algorithm:
1. If any request hits open row → serve oldest row hit
2. Else → serve oldest request (will cause row miss)

Example:
Queue: [A: row 5, B: row 3, C: row 3, D: row 5]
Currently open: row 3

FCFS order: A, B, C, D
- A: row miss (close 3, open 5, read)
- B: row miss (close 5, open 3, read)
- C: row hit
- D: row miss
Total: 3 row misses

FR-FCFS order: B, C, A, D
- B: row hit (row 3 open)
- C: row hit
- A: row miss (close 3, open 5, read)
- D: row hit
Total: 1 row miss!

Trade-offs:

Advantages:
- Maximizes row buffer hits
- Reduces average latency
- Increases effective bandwidth

Disadvantages:
1. Unfairness: Some requests delayed indefinitely
   - If row X keeps getting hits, row Y requests starve
2. Complexity: Track row buffer state
3. Reordering: May violate program order

Modern solutions:
- Batching: Group requests, FR-FCFS within batch
- Age-based priority: Old requests get priority
- Per-application fairness: Track delays per thread`,
  },
  {
    id: 'cs202-t6-ex6',
    subjectId: 'cs202',
    topicId: 'cs202-topic6',
    type: 'written',
    title: 'SSD vs HDD',
    description: 'Compare SSD and HDD for: random read, sequential read, write endurance, and cost. When would you choose each?',
    difficulty: 2,
    hints: ['SSD has no mechanical parts', 'HDD has seek time', 'Flash has limited writes'],
    solution: `SSD vs HDD Comparison:

Performance:
┌─────────────────┬────────────────┬────────────────┐
│ Operation       │ SSD            │ HDD            │
├─────────────────┼────────────────┼────────────────┤
│ Random Read     │ ~0.1 ms        │ ~10 ms         │
│ Random Write    │ ~0.1 ms        │ ~10 ms         │
│ Sequential Read │ ~500 MB/s      │ ~150 MB/s      │
│ Sequential Write│ ~450 MB/s      │ ~150 MB/s      │
│ IOPS (4KB rand) │ 100,000+       │ ~100           │
└─────────────────┴────────────────┴────────────────┘

Why SSD is faster for random:
- No mechanical seek (HDD head movement)
- No rotational latency (HDD platter spin)
- Direct electrical access to any cell

Other factors:
┌─────────────────┬────────────────┬────────────────┐
│ Factor          │ SSD            │ HDD            │
├─────────────────┼────────────────┼────────────────┤
│ Cost/GB         │ $0.08-0.15     │ $0.02-0.03     │
│ Capacity        │ 256GB - 8TB    │ 1TB - 20TB     │
│ Power           │ 2-5W           │ 6-15W          │
│ Durability      │ No moving parts│ Shock sensitive│
│ Write endurance │ Limited (TBW)  │ Essentially ∞  │
│ Noise           │ Silent         │ Audible        │
└─────────────────┴────────────────┴────────────────┘

When to choose SSD:
- Boot/OS drive (many random accesses)
- Databases (random I/O heavy)
- Laptops (durability, power, speed)
- Any workload with random access

When to choose HDD:
- Large media storage (movies, photos)
- Backup/archive (write once, read rarely)
- Budget-constrained bulk storage
- Sequential workloads (video editing source)

Best practice: Hybrid
- SSD for OS and frequently accessed data
- HDD for bulk storage and archives`,
  },
  {
    id: 'cs202-t6-ex7',
    subjectId: 'cs202',
    topicId: 'cs202-topic6',
    type: 'written',
    title: 'Bandwidth vs Latency',
    description: 'A memory system has 50ns latency and 25.6 GB/s bandwidth. For a 64-byte cache line fetch, calculate the total transfer time. What dominates for small vs large transfers?',
    difficulty: 2,
    hints: ['Total time = latency + size/bandwidth', 'Consider both components', 'Graph transfer size vs time'],
    solution: `Bandwidth vs Latency Analysis:

Given:
- Latency: 50 ns
- Bandwidth: 25.6 GB/s = 25.6 bytes/ns

Total time = Latency + Transfer time
           = Latency + Size / Bandwidth

For 64-byte cache line:
Transfer time = 64 bytes / 25.6 bytes/ns = 2.5 ns
Total time = 50 ns + 2.5 ns = 52.5 ns

Breakdown:
- Latency: 50 ns (95%)
- Transfer: 2.5 ns (5%)
Latency dominates!

Analysis for different sizes:
┌───────────┬──────────┬────────────┬─────────┬────────────┐
│ Size      │ Transfer │ Total Time │ Latency │ BW Portion │
├───────────┼──────────┼────────────┼─────────┼────────────┤
│ 64 B      │ 2.5 ns   │ 52.5 ns    │ 95%     │ 5%         │
│ 256 B     │ 10 ns    │ 60 ns      │ 83%     │ 17%        │
│ 1 KB      │ 40 ns    │ 90 ns      │ 56%     │ 44%        │
│ 4 KB      │ 160 ns   │ 210 ns     │ 24%     │ 76%        │
│ 64 KB     │ 2560 ns  │ 2610 ns    │ 2%      │ 98%        │
└───────────┴──────────┴────────────┴─────────┴────────────┘

Conclusions:
1. Small transfers: Latency-bound
   - Most time waiting for first byte
   - Higher bandwidth doesn't help much

2. Large transfers: Bandwidth-bound
   - Most time transferring data
   - Lower latency doesn't help much

3. Crossover point: Size = Latency × Bandwidth
   = 50 ns × 25.6 B/ns = 1280 bytes

Implications:
- Cache lines: Focus on reducing latency
- DMA/streaming: Focus on bandwidth
- Prefetching: Convert latency-bound to bandwidth-bound`,
  },
  {
    id: 'cs202-t6-ex8',
    subjectId: 'cs202',
    topicId: 'cs202-topic6',
    type: 'written',
    title: 'DDR Evolution',
    description: 'Compare DDR3, DDR4, and DDR5 in terms of data rate, prefetch, voltage, and typical bandwidth. What improvements does each generation bring?',
    difficulty: 3,
    hints: ['Each gen roughly doubles bandwidth', 'Prefetch doubles each generation', 'Voltage decreases'],
    solution: `DDR Evolution Comparison:

┌─────────────┬───────────────┬───────────────┬───────────────┐
│ Parameter   │ DDR3          │ DDR4          │ DDR5          │
├─────────────┼───────────────┼───────────────┼───────────────┤
│ Data Rate   │ 800-2133 MT/s │ 1600-3200 MT/s│ 3200-6400 MT/s│
│ Prefetch    │ 8n            │ 8n            │ 16n           │
│ Voltage     │ 1.5V / 1.35V  │ 1.2V          │ 1.1V          │
│ Max Capacity│ 8GB/DIMM      │ 64GB/DIMM     │ 128GB/DIMM    │
│ Banks       │ 8             │ 16 (4 groups) │ 32 (8 groups) │
│ Burst Length│ 8             │ 8             │ 16            │
│ Year        │ 2007          │ 2014          │ 2020          │
└─────────────┴───────────────┴───────────────┴───────────────┘

Peak Bandwidth (typical configs):
- DDR3-1600: 12.8 GB/s per channel
- DDR4-2400: 19.2 GB/s per channel
- DDR4-3200: 25.6 GB/s per channel
- DDR5-4800: 38.4 GB/s per channel
- DDR5-6400: 51.2 GB/s per channel

Key improvements per generation:

DDR3 → DDR4:
- 50% higher data rate
- Lower voltage (20% power reduction)
- Bank groups enable higher efficiency
- Larger capacity per DIMM

DDR4 → DDR5:
- 2× prefetch (8n → 16n)
- 2× bank groups (more parallelism)
- On-DIMM voltage regulation
- Dual 32-bit channels (vs single 64-bit)
- Better power management
- ECC on-die

Latency (hasn't improved much):
DDR3-1600 CL11: 13.75 ns
DDR4-2400 CL17: 14.17 ns
DDR5-4800 CL40: 16.67 ns

Note: Absolute latency (ns) similar or worse!
Bandwidth improved, not latency.`,
  },
  {
    id: 'cs202-t6-ex9',
    subjectId: 'cs202',
    topicId: 'cs202-topic6',
    type: 'written',
    title: 'ECC Memory',
    description: 'Explain how ECC memory works. What errors can SECDED (Single Error Correction, Double Error Detection) handle? When is ECC essential?',
    difficulty: 3,
    hints: ['Extra bits for error correction', 'Hamming code principles', 'Servers vs consumer'],
    solution: `ECC Memory (Error Correcting Code):

How it works:
- Extra bits store error-correcting codes
- Standard: 72 bits per 64 bits of data (8 ECC bits)
- On read: calculate syndrome, detect/correct errors

SECDED (Single Error Correction, Double Error Detection):
- Correct any 1-bit error automatically
- Detect (but not correct) 2-bit errors
- Uses Hamming code with extra parity bit

Example encoding (simplified):
Data: 64 bits
ECC:  8 bits (calculated from data)
Total: 72 bits stored

Read process:
1. Read 72 bits (data + ECC)
2. Recalculate ECC from data
3. XOR with stored ECC = syndrome
4. Syndrome = 0: no error
5. Syndrome = single bit pattern: correct that bit
6. Syndrome = other pattern: uncorrectable error detected

Error types and handling:
┌────────────────┬────────────────┬─────────────────────┐
│ Error Type     │ Detection      │ Correction          │
├────────────────┼────────────────┼─────────────────────┤
│ No error       │ ✓              │ N/A                 │
│ 1-bit error    │ ✓              │ ✓ (automatic)       │
│ 2-bit error    │ ✓              │ ✗ (halt/flag)       │
│ 3+ bit error   │ Maybe          │ ✗                   │
└────────────────┴────────────────┴─────────────────────┘

When ECC is essential:
1. Servers: Uptime critical, can't reboot
2. Scientific computing: Incorrect results unacceptable
3. Financial systems: Data integrity mandatory
4. Medical/safety: Lives depend on correctness
5. Large memory systems: More bits = more errors

Soft error rates:
- ~1 error per GB per year (varies by environment)
- 128GB server: ~10 errors/month without ECC
- Cosmic rays, alpha particles cause bit flips

Consumer systems mostly skip ECC:
- Cost: ~10-20% more expensive
- Compatibility: Needs ECC support in CPU/motherboard
- Acceptable risk for most users`,
  },
  {
    id: 'cs202-t6-ex10',
    subjectId: 'cs202',
    topicId: 'cs202-topic6',
    type: 'written',
    title: 'Memory Channels',
    description: 'A system has 4 memory channels, each 64 bits wide at DDR4-3200. Calculate the peak memory bandwidth. How does multi-channel help?',
    difficulty: 2,
    hints: ['Bandwidth = width × frequency', 'Channels are independent', 'DDR means double data rate'],
    solution: `Multi-Channel Memory Bandwidth:

Given:
- 4 memory channels
- 64 bits per channel
- DDR4-3200 (3200 MT/s)

Single channel bandwidth:
Data rate: 3200 MT/s (megatransfers/second)
Width: 64 bits = 8 bytes

Bandwidth = 3200 × 10⁶ × 8 bytes/s
          = 25.6 GB/s per channel

Total system bandwidth:
4 channels × 25.6 GB/s = 102.4 GB/s peak

How multi-channel helps:

1. Parallel access
   ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐
   │ Chan 0 │  │ Chan 1 │  │ Chan 2 │  │ Chan 3 │
   │ DIMM   │  │ DIMM   │  │ DIMM   │  │ DIMM   │
   └───┬────┘  └───┬────┘  └───┬────┘  └───┬────┘
       │           │           │           │
       └─────────┬─┴───────────┴─┬─────────┘
                 │  Memory       │
                 │ Controller    │
                 └───────────────┘

2. Interleaved addressing
   - Address bits select channel
   - Sequential accesses spread across channels
   - 4× bandwidth for streaming access

3. Independent operation
   - Each channel has own command/data buses
   - Different requests can proceed in parallel

Real-world considerations:
- Peak bandwidth rarely achieved
- Memory controller overhead
- Access patterns affect utilization
- Typical utilization: 60-80% of peak

Diminishing returns:
1 → 2 channels: ~2× bandwidth (huge gain)
2 → 4 channels: ~2× bandwidth (good gain)
4 → 8 channels: <2× bandwidth (limited by other factors)`,
  },
  {
    id: 'cs202-t6-ex11',
    subjectId: 'cs202',
    topicId: 'cs202-topic6',
    type: 'written',
    title: 'HBM Architecture',
    description: 'Explain High Bandwidth Memory (HBM). How does it achieve higher bandwidth than DDR? What are its use cases?',
    difficulty: 4,
    hints: ['3D stacking', 'Wide interface', 'Close to processor'],
    solution: `High Bandwidth Memory (HBM):

Architecture:
┌─────────────────────────────────────────┐
│           GPU/CPU Die                    │
│  ┌─────────────────────────────────┐    │
│  │         Logic                    │    │
│  └─────────────────────────────────┘    │
│           │Silicon Interposer│           │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐              │
│  │HBM│ │HBM│ │HBM│ │HBM│              │
│  │ 1 │ │ 2 │ │ 3 │ │ 4 │              │
│  └───┘ └───┘ └───┘ └───┘              │
└─────────────────────────────────────────┘

HBM Stack (3D):
    ┌──────────┐
    │ DRAM die │ Layer 4
    ├──────────┤
    │ DRAM die │ Layer 3
    ├──────────┤
    │ DRAM die │ Layer 2
    ├──────────┤
    │ DRAM die │ Layer 1
    ├──────────┤
    │ Logic die│ Base
    └──────────┘
    Through-silicon vias (TSVs)

Why HBM is faster:

1. Wide interface: 1024 bits vs 64 bits
   DDR5: 64 bits × 6400 MT/s = 51.2 GB/s
   HBM2: 1024 bits × 2000 MT/s = 256 GB/s per stack

2. Short distance: <1mm vs ~10cm for DIMMs
   - Lower power (less capacitance)
   - Faster signaling possible

3. 3D stacking:
   - Multiple DRAM dies per stack
   - More bandwidth per footprint

HBM Generations:
┌──────┬──────────────┬────────────────┐
│ Gen  │ BW/stack     │ Capacity/stack │
├──────┼──────────────┼────────────────┤
│ HBM  │ 128 GB/s     │ 1 GB           │
│ HBM2 │ 256 GB/s     │ 8 GB           │
│ HBM2e│ 307 GB/s     │ 16 GB          │
│ HBM3 │ 600 GB/s     │ 24 GB          │
└──────┴──────────────┴────────────────┘

Use cases:
- GPUs (NVIDIA A100: 80GB HBM2e, 2 TB/s)
- AI accelerators (bandwidth-hungry workloads)
- High-end FPGAs
- Supercomputers

Limitations:
- Higher cost per GB
- Limited capacity (vs DDR)
- Complex packaging
- Heat dissipation challenges`,
  },
  {
    id: 'cs202-t6-ex12',
    subjectId: 'cs202',
    topicId: 'cs202-topic6',
    type: 'written',
    title: 'Non-Volatile Memory',
    description: 'Compare Intel Optane (3D XPoint) with NAND flash and DRAM. What gap does it fill in the memory hierarchy?',
    difficulty: 3,
    hints: ['Between DRAM and SSD', 'Byte-addressable option', 'Persistence'],
    solution: `Non-Volatile Memory Comparison:

Technology comparison:
┌─────────────┬────────────┬────────────┬────────────┐
│ Property    │ DRAM       │ 3D XPoint  │ NAND Flash │
├─────────────┼────────────┼────────────┼────────────┤
│ Read latency│ ~50 ns     │ ~300 ns    │ ~50 μs     │
│ Write speed │ ~50 ns     │ ~100 ns    │ ~200 μs    │
│ Endurance   │ Unlimited  │ High       │ Limited    │
│ Byte-addr   │ Yes        │ Yes        │ No (pages) │
│ Density     │ Low        │ Medium     │ High       │
│ Cost/GB     │ ~$5        │ ~$2-4      │ ~$0.10     │
│ Volatile    │ Yes        │ No         │ No         │
└─────────────┴────────────┴────────────┴────────────┘

Memory hierarchy position:
        Speed
          ↑
    DRAM  │  ●
          │      ● 3D XPoint (Optane)
          │
          │              ● NAND SSD
          │
          └──────────────────────→ Capacity

Gap filled by 3D XPoint:
1. Faster than NAND, cheaper than DRAM
2. Non-volatile with near-DRAM speed
3. Byte-addressable (can use as memory)

Optane use modes:

1. Persistent Memory (Memory Mode):
   - Extends memory capacity
   - DRAM as cache for Optane
   - Transparent to software

2. App Direct Mode:
   - Directly addressable NVM
   - Applications aware of persistence
   - Used for in-memory databases

3. Storage (Optane SSD):
   - Very fast SSD
   - Great for latency-sensitive workloads
   - Lower capacity than NAND SSDs

Applications:
- Databases with persistent data structures
- Fast restart (memory survives reboot)
- Large in-memory computing
- Storage caching tier

Note: Intel discontinued Optane (2022)
Future: CXL-attached memory, other NVM technologies`,
  },
  {
    id: 'cs202-t6-ex13',
    subjectId: 'cs202',
    topicId: 'cs202-topic6',
    type: 'written',
    title: 'NUMA Architecture',
    description: 'Explain NUMA (Non-Uniform Memory Access). How does memory placement affect performance? What should programmers consider?',
    difficulty: 4,
    hints: ['Local vs remote memory', 'Memory affinity', 'NUMA-aware allocation'],
    solution: `NUMA (Non-Uniform Memory Access):

Architecture:
┌─────────────────────────────────────────────────────┐
│                   NUMA System                        │
│                                                      │
│  Node 0              Interconnect          Node 1   │
│ ┌────────────┐      ═══════════════      ┌────────────┐
│ │   CPU 0    │◄────────────────────────►│   CPU 1    │
│ │            │                          │            │
│ │  L3 Cache  │                          │  L3 Cache  │
│ └────────────┘                          └────────────┘
│       │                                        │
│       ▼                                        ▼
│ ┌────────────┐                          ┌────────────┐
│ │  Memory 0  │                          │  Memory 1  │
│ │  (Local)   │                          │  (Local)   │
│ └────────────┘                          └────────────┘
└─────────────────────────────────────────────────────┘

Access latency:
- Local memory: ~50 ns
- Remote memory: ~100-150 ns (1.5-3× slower)

NUMA ratio = Remote_latency / Local_latency
Typical: 1.5 - 3.0×

Why NUMA exists:
- Scalability: Single memory controller doesn't scale
- Bandwidth: Each node has dedicated bandwidth
- Locality: Most accesses should be local

Performance implications:

Bad: Process on Node 0, data on Node 1
- Every access crosses interconnect
- 2× latency, shared interconnect bandwidth

Good: Process and data on same node
- Local memory access
- Full bandwidth, low latency

Programmer considerations:

1. Memory allocation:
   // NUMA-aware allocation
   numa_alloc_onnode(size, node);
   // or let OS place on current node
   numa_alloc_local(size);

2. Thread placement:
   - Pin threads to CPUs
   - Keep threads near their data

3. Data structures:
   - Partition data by NUMA node
   - Avoid false sharing across nodes

4. First-touch policy:
   - Memory allocated on node that first touches it
   - Initialize data on thread that will use it

Linux tools:
- numactl: Control NUMA policy
- numastat: View NUMA statistics
- /proc/*/numa_maps: Process NUMA mapping`,
  },
  {
    id: 'cs202-t6-ex14',
    subjectId: 'cs202',
    topicId: 'cs202-topic6',
    type: 'written',
    title: 'Memory Power Management',
    description: 'Describe DRAM power states and their trade-offs. How does the memory controller balance power and performance?',
    difficulty: 3,
    hints: ['Active, standby, power-down states', 'Wake-up latency vs power savings', 'Predictive techniques'],
    solution: `DRAM Power States:

State progression (most to least power):
┌────────────────┬─────────┬────────────┬───────────────┐
│ State          │ Power   │ Wake-up    │ When used     │
├────────────────┼─────────┼────────────┼───────────────┤
│ Active         │ High    │ 0          │ Currently     │
│                │         │            │ accessing     │
├────────────────┼─────────┼────────────┼───────────────┤
│ Idle/Standby   │ Medium  │ ~1 cycle   │ No current    │
│                │         │            │ access        │
├────────────────┼─────────┼────────────┼───────────────┤
│ Power-Down     │ Low     │ ~10 cycles │ Idle period   │
│ (Fast exit)    │         │            │               │
├────────────────┼─────────┼────────────┼───────────────┤
│ Power-Down     │ Very Low│ ~100 cycles│ Long idle     │
│ (Slow exit)    │         │            │               │
├────────────────┼─────────┼────────────┼───────────────┤
│ Self-Refresh   │ Minimal │ ~1000 cycles│ System sleep  │
└────────────────┴─────────┴────────────┴───────────────┘

Power breakdown (typical DDR4):
- Active: 100%
- Idle: ~60%
- Power-down: ~20%
- Self-refresh: ~5%

Trade-offs:
1. More aggressive power-down = more wake-up latency
2. Frequent transitions waste energy
3. Prediction errors hurt performance

Memory controller strategies:

1. Timeout-based:
   if (idle_time > threshold)
       enter_power_down();
   Simple but reactive

2. Predictive:
   - Track access patterns
   - Predict idle duration
   - Enter appropriate state proactively

3. Rank-level management:
   - Put unused ranks in power-down
   - Keep active ranks ready
   - Balance across ranks

DVFS (Dynamic Voltage/Frequency Scaling):
- Lower frequency during light load
- Reduces power significantly
- Bandwidth trade-off

Modern techniques:
- Rank interleaving: Spread accesses, allow sleep
- Page policy: Close-page vs open-page affects power
- Scheduling: Batch accesses, maximize sleep time

Power proportionality goal:
Power consumption ∝ Work done
Not fully achieved in current DRAM (high idle power)`,
  },
  {
    id: 'cs202-t6-ex15',
    subjectId: 'cs202',
    topicId: 'cs202-topic6',
    type: 'written',
    title: 'RAID Levels',
    description: 'Compare RAID 0, 1, 5, and 6. For a 4-drive array with 1TB drives, calculate usable capacity and fault tolerance for each level.',
    difficulty: 3,
    hints: ['RAID 0: striping', 'RAID 1: mirroring', 'RAID 5/6: parity'],
    solution: `RAID Levels Comparison:

Configuration: 4 × 1TB drives

RAID 0 (Striping):
┌──────┬──────┬──────┬──────┐
│ D0   │ D1   │ D2   │ D3   │
│ D4   │ D5   │ D6   │ D7   │
│ ...  │ ...  │ ...  │ ...  │
└──────┴──────┴──────┴──────┘
- Capacity: 4TB (100%)
- Fault tolerance: 0 drives (any failure = data loss)
- Performance: 4× read/write
- Use: Speed, no redundancy needed

RAID 1 (Mirroring):
┌──────┬──────┐ ┌──────┬──────┐
│ D0   │ D0   │ │ D1   │ D1   │
│ D2   │ D2   │ │ D3   │ D3   │
└──────┴──────┘ └──────┴──────┘
  Mirror 1        Mirror 2
- Capacity: 2TB (50%)
- Fault tolerance: 1 drive per mirror (up to 2)
- Performance: 2× read, 1× write
- Use: High reliability, simple

RAID 5 (Striping + Distributed Parity):
┌──────┬──────┬──────┬──────┐
│ D0   │ D1   │ D2   │ P0   │
│ D3   │ D4   │ P1   │ D5   │
│ D6   │ P2   │ D7   │ D8   │
└──────┴──────┴──────┴──────┘
- Capacity: 3TB (75%)
- Fault tolerance: 1 drive
- Performance: ~3× read, slower write (parity calc)
- Use: Balance of capacity and protection

RAID 6 (Striping + Dual Parity):
┌──────┬──────┬──────┬──────┐
│ D0   │ D1   │ P0   │ Q0   │
│ D2   │ P1   │ Q1   │ D3   │
│ P2   │ Q2   │ D4   │ D5   │
└──────┴──────┴──────┴──────┘
- Capacity: 2TB (50%)
- Fault tolerance: 2 drives
- Performance: ~2× read, slower write
- Use: Mission-critical, large arrays

Summary:
┌───────┬──────────┬─────────┬─────────────┐
│ Level │ Capacity │ Survive │ Performance │
├───────┼──────────┼─────────┼─────────────┤
│ 0     │ 4 TB     │ 0 drive │ Excellent   │
│ 1     │ 2 TB     │ 1-2     │ Good read   │
│ 5     │ 3 TB     │ 1 drive │ Good        │
│ 6     │ 2 TB     │ 2 drives│ Moderate    │
└───────┴──────────┴─────────┴─────────────┘`,
  },
  {
    id: 'cs202-t6-ex16',
    subjectId: 'cs202',
    topicId: 'cs202-topic6',
    type: 'written',
    title: 'Memory-Level Parallelism',
    description: 'Define Memory-Level Parallelism (MLP). How do modern processors exploit MLP? Why is it important for performance?',
    difficulty: 4,
    hints: ['Multiple outstanding misses', 'Out-of-order execution', 'Miss bandwidth vs miss latency'],
    solution: `Memory-Level Parallelism (MLP):

Definition:
MLP = number of memory accesses outstanding simultaneously
Higher MLP = better utilization of memory bandwidth

Why MLP matters:
Without MLP (serial misses):
Time: |--miss 1--|--miss 2--|--miss 3--|
      100 ns      100 ns      100 ns
Total: 300 ns

With MLP (parallel misses):
Time: |--miss 1--|
      |--miss 2--|
      |--miss 3--|
Total: ~100 ns (if memory can handle 3 parallel)

Speedup: up to 3× (limited by memory bandwidth)

How processors exploit MLP:

1. Out-of-Order Execution:
   - Continue executing past cache miss
   - Find independent misses
   - Issue them in parallel

   load R1, [addr1]    # miss
   add R2, R3, R4      # independent, continues
   load R5, [addr2]    # miss - overlapped with first!

2. Non-blocking caches:
   - Cache handles multiple misses
   - Miss Status Holding Registers (MSHRs)
   - Each MSHR tracks one outstanding miss

3. Hardware prefetching:
   - Detect access patterns
   - Issue prefetches ahead of demand
   - Increases outstanding requests

4. Runahead execution:
   - On long-latency miss, checkpoint state
   - Speculatively execute ahead
   - Discover future misses
   - Restore state when miss returns

Metrics:
- Standalone miss latency: 100 ns
- Effective miss latency with MLP=4: 100/4 = 25 ns

MLP-aware analysis:
Traditional: Stall_cycles = Miss_count × Miss_latency
With MLP: Stall_cycles = Miss_count × Miss_latency / MLP

Example:
100 misses, 100 cycle latency
MLP = 1: 10,000 cycles
MLP = 4: 2,500 cycles

Modern CPUs: MLP of 8-16 for memory accesses
Key insight: Miss bandwidth matters as much as miss rate!`,
  },
];
