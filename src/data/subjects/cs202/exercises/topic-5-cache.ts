import type { WrittenExercise } from '../../../../core/types';

export const topic5Exercises: WrittenExercise[] = [
  {
    id: 'cs202-t5-ex1',
    subjectId: 'cs202',
    topicId: 'cs202-topic5',
    type: 'written',
    title: 'Cache Address Breakdown',
    description: 'For a 32KB direct-mapped cache with 64-byte blocks and 32-bit addresses, calculate the number of bits for tag, index, and offset fields.',
    difficulty: 2,
    hints: ['Total size = blocks × block size', 'Offset bits = log2(block size)', 'Index bits = log2(number of blocks)'],
    solution: `Cache parameter calculation:

Given:
- Cache size: 32KB = 32 × 1024 = 32768 bytes
- Block size: 64 bytes
- Address: 32 bits

Step 1: Calculate number of blocks
Number of blocks = Cache size / Block size
= 32768 / 64 = 512 blocks

Step 2: Calculate offset bits
Offset addresses bytes within a block
Offset bits = log2(64) = 6 bits

Step 3: Calculate index bits
Index selects which block (set)
Index bits = log2(512) = 9 bits

Step 4: Calculate tag bits
Tag = remaining address bits
Tag bits = 32 - 9 - 6 = 17 bits

Address breakdown:
| Tag (17 bits) | Index (9 bits) | Offset (6 bits) |
|   31 - 15     |    14 - 6      |     5 - 0       |

Verification:
- 2^6 = 64 bytes per block ✓
- 2^9 = 512 blocks ✓
- 512 × 64 = 32KB ✓`,
  },
  {
    id: 'cs202-t5-ex2',
    subjectId: 'cs202',
    topicId: 'cs202-topic5',
    type: 'written',
    title: 'Cache Access Sequence',
    description: 'For a direct-mapped cache with 4 blocks (0-3) and addresses that map as: addr mod 4, trace accesses to addresses: 0, 4, 8, 0, 4, 12, 0. Show hits/misses.',
    difficulty: 2,
    hints: ['Direct-mapped means one possible location', 'Track what\'s in each block', 'Address mod 4 gives index'],
    solution: `Direct-mapped cache trace (4 blocks, index = addr mod 4):

Initial state: all blocks empty

Access 0: index = 0 mod 4 = 0
- Block 0 empty → MISS
- Load addr 0 into block 0
- Cache: [0, -, -, -]

Access 4: index = 4 mod 4 = 0
- Block 0 has addr 0, need 4 → MISS (conflict)
- Replace with addr 4
- Cache: [4, -, -, -]

Access 8: index = 8 mod 4 = 0
- Block 0 has addr 4, need 8 → MISS (conflict)
- Replace with addr 8
- Cache: [8, -, -, -]

Access 0: index = 0 mod 4 = 0
- Block 0 has addr 8, need 0 → MISS (conflict)
- Replace with addr 0
- Cache: [0, -, -, -]

Access 4: index = 4 mod 4 = 0
- Block 0 has addr 0, need 4 → MISS (conflict)
- Replace with addr 4
- Cache: [4, -, -, -]

Access 12: index = 12 mod 4 = 0
- Block 0 has addr 4, need 12 → MISS (conflict)
- Replace with addr 12
- Cache: [12, -, -, -]

Access 0: index = 0 mod 4 = 0
- Block 0 has addr 12, need 0 → MISS (conflict)
- Replace with addr 0
- Cache: [0, -, -, -]

Results: 7 accesses, 0 hits, 7 misses
Hit rate: 0%

Problem: All addresses map to same block!
This is pathological worst case for direct-mapped.
Set-associative cache would help.`,
  },
  {
    id: 'cs202-t5-ex3',
    subjectId: 'cs202',
    topicId: 'cs202-topic5',
    type: 'written',
    title: 'Set-Associative Cache',
    description: 'Redo the previous exercise with a 2-way set-associative cache (2 sets, 2 blocks each). Use LRU replacement.',
    difficulty: 3,
    hints: ['2 sets means index = addr mod 2', 'Each set holds 2 blocks', 'LRU evicts least recently used'],
    solution: `2-way set-associative cache trace:
(2 sets × 2 ways = 4 blocks total, index = addr mod 2)

Initial: Set 0: [-, -], Set 1: [-, -]

Access 0: index = 0 mod 2 = 0
- Set 0 empty → MISS
- Load 0 into Set 0, Way 0
- Set 0: [0, -], LRU order: 0

Access 4: index = 4 mod 2 = 0
- Set 0 has [0, -], no 4 → MISS
- Load 4 into Set 0, Way 1
- Set 0: [0, 4], LRU order: 0, 4 (0 is older)

Access 8: index = 8 mod 2 = 0
- Set 0 has [0, 4], no 8 → MISS
- LRU is 0, replace it
- Set 0: [8, 4], LRU order: 4, 8

Access 0: index = 0 mod 2 = 0
- Set 0 has [8, 4], no 0 → MISS
- LRU is 4, replace it
- Set 0: [8, 0], LRU order: 8, 0

Access 4: index = 4 mod 2 = 0
- Set 0 has [8, 0], no 4 → MISS
- LRU is 8, replace it
- Set 0: [4, 0], LRU order: 0, 4

Access 12: index = 12 mod 2 = 0
- Set 0 has [4, 0], no 12 → MISS
- LRU is 0, replace it
- Set 0: [4, 12], LRU order: 4, 12

Access 0: index = 0 mod 2 = 0
- Set 0 has [4, 12], no 0 → MISS
- LRU is 4, replace it
- Set 0: [0, 12], LRU order: 12, 0

Results: 7 accesses, 0 hits, 7 misses
Still 0% hit rate - this sequence is adversarial!

Note: 4-way or fully associative would help here.`,
  },
  {
    id: 'cs202-t5-ex4',
    subjectId: 'cs202',
    topicId: 'cs202-topic5',
    type: 'written',
    title: 'AMAT Calculation',
    description: 'Calculate AMAT for: L1 hit time = 1 cycle, L1 miss rate = 5%, L2 hit time = 10 cycles, L2 miss rate = 20%, Memory = 100 cycles.',
    difficulty: 2,
    hints: ['AMAT = Hit time + Miss rate × Miss penalty', 'L2 miss penalty includes memory access', 'Chain the calculations'],
    solution: `Average Memory Access Time (AMAT) calculation:

Given:
- L1 hit time: 1 cycle
- L1 miss rate: 5% (0.05)
- L2 hit time: 10 cycles
- L2 miss rate: 20% (0.20) - miss rate GIVEN L1 miss
- Memory access time: 100 cycles

Method 1: Hierarchical AMAT

L2 AMAT (when L1 misses):
AMAT_L2 = L2_hit_time + L2_miss_rate × Memory_time
= 10 + 0.20 × 100
= 10 + 20
= 30 cycles

Total AMAT:
AMAT = L1_hit_time + L1_miss_rate × L2_AMAT
= 1 + 0.05 × 30
= 1 + 1.5
= 2.5 cycles

Method 2: Probability breakdown

P(L1 hit) = 0.95 → 1 cycle
P(L1 miss, L2 hit) = 0.05 × 0.80 = 0.04 → 1 + 10 = 11 cycles
P(L1 miss, L2 miss) = 0.05 × 0.20 = 0.01 → 1 + 10 + 100 = 111 cycles

AMAT = 0.95(1) + 0.04(11) + 0.01(111)
= 0.95 + 0.44 + 1.11
= 2.5 cycles ✓

Interpretation:
- Average memory access takes 2.5 cycles
- L1 provides most of the performance (95% hits at 1 cycle)
- L2 catches most L1 misses (80% of 5%)
- Only 1% of accesses go to memory`,
  },
  {
    id: 'cs202-t5-ex5',
    subjectId: 'cs202',
    topicId: 'cs202-topic5',
    type: 'written',
    title: 'Three Cs Classification',
    description: 'Classify these misses using the 3 Cs: (a) First access to array element (b) Working set larger than cache (c) Two arrays mapping to same cache lines',
    difficulty: 2,
    hints: ['Compulsory: first access ever', 'Capacity: not enough total space', 'Conflict: mapping collision'],
    solution: `Three Cs Miss Classification:

(a) First access to array element: COMPULSORY (Cold) miss
- Data has never been in cache before
- Cannot be avoided (except by prefetching)
- Would occur even with infinite cache size
- Example: First iteration of loop accessing array

(b) Working set larger than cache: CAPACITY miss
- Cache too small to hold all active data
- Would occur even with full associativity
- Solution: Larger cache or better algorithm locality
- Example: Matrix multiply where matrix doesn't fit

(c) Two arrays mapping to same lines: CONFLICT miss
- Multiple addresses compete for same cache set
- Would NOT occur with full associativity
- Solution: More associativity or array padding
- Example: Stride access pattern hitting same sets

Miss classification summary:
┌────────────┬──────────────────────┬───────────────────┐
│ Type       │ Cause                │ Solution          │
├────────────┼──────────────────────┼───────────────────┤
│ Compulsory │ First access         │ Prefetching       │
│ Capacity   │ Cache too small      │ Larger cache      │
│ Conflict   │ Limited associativity│ More ways         │
└────────────┴──────────────────────┴───────────────────┘

Relative impact (typical):
- Compulsory: Small (happens once per block)
- Capacity: Can be large for big datasets
- Conflict: Often significant, reduced by associativity`,
  },
  {
    id: 'cs202-t5-ex6',
    subjectId: 'cs202',
    topicId: 'cs202-topic5',
    type: 'written',
    title: 'Write Policies',
    description: 'Compare write-through and write-back policies. For a program that writes 1000 times to the same address, how many memory writes occur with each policy?',
    difficulty: 2,
    hints: ['Write-through writes to memory every time', 'Write-back only writes when evicted', 'Consider dirty bit'],
    solution: `Write Policy Comparison:

Write-Through:
- Every write goes to both cache AND memory
- Simple, keeps memory consistent
- High memory bandwidth usage

Write-Back:
- Write only goes to cache
- Mark block as "dirty"
- Write to memory only when evicted
- Requires extra dirty bit

For 1000 writes to same address:

Write-Through:
- Each write updates memory
- Memory writes: 1000
- Memory reads: 1 (initial miss, assuming cold start)
- Total memory traffic: 1001 accesses

Write-Back:
- First write: miss, bring block to cache, write to cache
- Writes 2-1000: hit, update cache only
- On eviction: write dirty block back
- Memory writes: 1 (on eviction)
- Memory reads: 1 (initial miss)
- Total memory traffic: 2 accesses

Comparison:
┌─────────────────┬───────────────┬─────────────┐
│ Metric          │ Write-Through │ Write-Back  │
├─────────────────┼───────────────┼─────────────┤
│ Memory writes   │     1000      │      1      │
│ Memory reads    │       1       │      1      │
│ Total traffic   │     1001      │      2      │
│ Complexity      │     Low       │    Higher   │
│ Consistency     │   Immediate   │   Delayed   │
└─────────────────┴───────────────┴─────────────┘

Write-back is 500× less memory traffic for this case!

Write buffers (enhancement for write-through):
- Queue writes, continue execution
- Reduces stalls but still uses bandwidth`,
  },
  {
    id: 'cs202-t5-ex7',
    subjectId: 'cs202',
    topicId: 'cs202-topic5',
    type: 'written',
    title: 'Cache Optimization',
    description: 'A programmer writes code that accesses a 2D array column by column (arr[j][i] in inner loop). The array is 1024×1024 integers stored row-major. Explain why this is bad and how to fix it.',
    difficulty: 3,
    hints: ['Row-major means row elements are consecutive', 'Column access has large stride', 'Consider cache block utilization'],
    solution: `Column-wise access problem:

Array layout (row-major, C/C++):
arr[0][0], arr[0][1], arr[0][2], ... arr[0][1023],
arr[1][0], arr[1][1], arr[1][2], ... arr[1][1023],
...

Array size: 1024 × 1024 × 4 bytes = 4MB

Column access pattern (arr[j][i]):
for (i = 0; i < 1024; i++)      // outer
    for (j = 0; j < 1024; j++)  // inner
        sum += arr[j][i];       // Column access!

Access sequence: arr[0][0], arr[1][0], arr[2][0], ...

Stride = 1024 integers = 4096 bytes between accesses

Problem analysis:
- Cache block typically 64 bytes = 16 integers
- Access arr[0][0]: bring in arr[0][0..15]
- Next access arr[1][0]: none of those 16 are needed!
- 15/16 = 93.75% of fetched data is wasted

With 64-byte blocks:
- 1024 × 1024 = 1M accesses
- Almost every access is a miss (stride > block size)
- ~1M misses!

Fixed code (row-wise access):
for (i = 0; i < 1024; i++)
    for (j = 0; j < 1024; j++)
        sum += arr[i][j];       // Row access!

Access sequence: arr[0][0], arr[0][1], arr[0][2], ...

Now:
- Access arr[0][0]: bring in arr[0][0..15]
- Next 15 accesses hit in cache!
- 1 miss per 16 accesses
- ~64K misses (vs 1M!)

Speedup: 15× fewer misses, potentially much faster`,
  },
  {
    id: 'cs202-t5-ex8',
    subjectId: 'cs202',
    topicId: 'cs202-topic5',
    type: 'written',
    title: 'Multi-Level Inclusion',
    description: 'Explain inclusive vs exclusive cache hierarchies. If L1 is 32KB and L2 is 256KB, what is the effective size for each policy?',
    difficulty: 3,
    hints: ['Inclusive: L1 ⊆ L2', 'Exclusive: L1 ∩ L2 = ∅', 'Consider total unique data'],
    solution: `Cache Inclusion Policies:

Inclusive Cache:
- All data in L1 is also in L2
- L1 ⊆ L2 (L1 is subset of L2)
- Simple coherence (snoop L2 only)
- L1 eviction doesn't need L2 action

Exclusive Cache:
- L1 and L2 have no overlap
- L1 ∩ L2 = ∅
- Maximum capacity
- L1 eviction → move to L2

Effective sizes for L1=32KB, L2=256KB:

Inclusive:
- L2 contains everything L1 has
- Unique data = L2 size = 256KB
- L1's 32KB is "duplicated" in L2
- Effective total: 256KB

Exclusive:
- L1 and L2 are disjoint
- Unique data = L1 + L2 = 32KB + 256KB
- Effective total: 288KB

Comparison:
┌────────────┬───────────┬───────────────────────────┐
│ Policy     │ Capacity  │ Trade-off                 │
├────────────┼───────────┼───────────────────────────┤
│ Inclusive  │  256KB    │ Simple, coherence easy    │
│ Exclusive  │  288KB    │ +12.5% capacity, complex  │
└────────────┴───────────┴───────────────────────────┘

NINE (Non-Inclusive, Non-Exclusive):
- Hybrid approach
- L2 may or may not contain L1 data
- Intermediate complexity and capacity
- Used in some modern processors

Intel typically uses inclusive L3
AMD often uses exclusive or NINE policies`,
  },
  {
    id: 'cs202-t5-ex9',
    subjectId: 'cs202',
    topicId: 'cs202-topic5',
    type: 'written',
    title: 'Block Size Trade-off',
    description: 'Analyze the impact of increasing block size from 32 to 128 bytes. What improves? What gets worse?',
    difficulty: 3,
    hints: ['Consider spatial locality', 'Consider miss penalty', 'Consider number of blocks'],
    solution: `Block Size Trade-off Analysis:

Going from 32-byte to 128-byte blocks:

IMPROVEMENTS (what gets better):

1. Better spatial locality exploitation
   - More adjacent data brought in per miss
   - Sequential access patterns benefit
   - Compulsory misses reduced

2. Lower tag overhead
   - Fewer blocks = fewer tags
   - 32B: need tag for every 32 bytes
   - 128B: need tag for every 128 bytes (4× fewer)

3. Potentially fewer misses for streaming access
   - Miss every 128 bytes vs every 32 bytes
   - Up to 4× fewer misses for sequential patterns

DEGRADATIONS (what gets worse):

1. Higher miss penalty
   - 128 bytes takes longer to transfer than 32
   - Miss penalty increases (roughly linearly)

2. More wasted bandwidth on small accesses
   - Access 4 bytes, fetch 128
   - 97% of transfer unused if no spatial locality

3. More pollution/conflict misses
   - Fewer blocks in same-size cache
   - 64KB cache: 2048 32B blocks vs 512 128B blocks
   - Higher conflict probability

4. Worse for random access patterns
   - Each miss brings unneeded data
   - Miss rate may increase

Optimal point:
- Depends on access patterns
- Typical L1: 64 bytes
- Typical L2/L3: 64-128 bytes

Formula consideration:
AMAT = Hit_time + Miss_rate × Miss_penalty
- Block size ↑ → Miss_rate may ↓
- Block size ↑ → Miss_penalty ↑
- Optimal balances these effects`,
  },
  {
    id: 'cs202-t5-ex10',
    subjectId: 'cs202',
    topicId: 'cs202-topic5',
    type: 'written',
    title: 'Virtual Memory and Caches',
    description: 'Explain the difference between virtually-indexed/physically-tagged (VIPT) and physically-indexed/physically-tagged (PIPT) caches. Why is VIPT common for L1?',
    difficulty: 4,
    hints: ['Virtual address available immediately', 'Physical address needs TLB lookup', 'Consider timing critical path'],
    solution: `Cache Indexing and Tagging Options:

PIPT (Physically-Indexed, Physically-Tagged):
- Both index and tag use physical address
- Requires TLB lookup BEFORE cache access
- Timeline: VA → TLB → PA → Cache
- Slower: TLB in critical path

VIPT (Virtually-Indexed, Physically-Tagged):
- Index uses virtual address (fast)
- Tag uses physical address (correct)
- Timeline: VA → Cache index || TLB → compare tags
- Faster: TLB and cache index in parallel

Why VIPT for L1:

Timing advantage:
┌─────────────────────────────────────────────┐
│ PIPT (Serial):                              │
│ VA ──► TLB ──► PA ──► Cache Index ──► Data  │
│        ~1ns         ~1ns                    │
│ Total: ~2ns                                 │
├─────────────────────────────────────────────┤
│ VIPT (Parallel):                            │
│ VA ──► Cache Index ──► Data                 │
│    ╲                                        │
│     ──► TLB ──► Tag Compare                 │
│ Total: ~1ns (TLB hidden)                    │
└─────────────────────────────────────────────┘

VIPT constraints:
- Index bits must be same in VA and PA
- Constraint: cache_size ≤ page_size × associativity
- For 4KB pages, 64B blocks:
  - Offset: 6 bits (within block)
  - Index: up to 6 bits (page offset - block offset)
  - Max direct-mapped: 4KB
  - 8-way: up to 32KB

Synonym problem:
- Different VAs map to same PA
- VIPT with small cache: no issue (index from page offset)
- Large VIPT cache needs extra handling

L2/L3 typically PIPT:
- Not as timing critical
- Simpler, no synonym issues
- TLB already done for L1 access`,
  },
  {
    id: 'cs202-t5-ex11',
    subjectId: 'cs202',
    topicId: 'cs202-topic5',
    type: 'written',
    title: 'LRU Implementation',
    description: 'For a 4-way set-associative cache, describe how to implement true LRU replacement. What is the storage cost? Describe a pseudo-LRU alternative.',
    difficulty: 4,
    hints: ['Track relative order of all ways', 'How many bits for ordering?', 'Tree-based pseudo-LRU'],
    solution: `LRU Implementation for 4-way Cache:

True LRU:
Need to track relative ordering of 4 ways.

Method 1: Counter per way
- Each way has 2-bit counter (0-3)
- On access: set counter to 3 (most recent)
- Decrement other counters
- Evict way with counter = 0
- Storage: 4 × 2 = 8 bits per set

Method 2: Ordering matrix
- N×N bit matrix for N ways
- row[i][j] = 1 if way i more recent than j
- Storage: N² bits = 16 bits per set
- But updates complex

Method 3: Order list
- log2(4!) = log2(24) = 5 bits needed
- Encode one of 24 possible orderings
- Storage: 5 bits per set
- Complex decode logic

True LRU storage for 4-way:
5-8 bits per set (depending on method)

Pseudo-LRU (Tree-based):
Binary tree with 3 bits for 4 ways:

        [B0]
       /    \\
    [B1]    [B2]
    /  \\    /  \\
  W0   W1  W2   W3

Each bit points to "less recently used" subtree
- B0=0: left subtree less recent
- B0=1: right subtree less recent

On access to Way 2:
- B0 → 0 (right side used)
- B2 → 0 (left of right used)

Find victim: Follow bits to leaf
Storage: 3 bits per set (vs 5-8 for true LRU)

Trade-off:
- True LRU: Optimal but complex
- Pseudo-LRU: ~1% worse hit rate, much simpler
- Most modern caches use pseudo-LRU or random`,
  },
  {
    id: 'cs202-t5-ex12',
    subjectId: 'cs202',
    topicId: 'cs202-topic5',
    type: 'written',
    title: 'Cache Performance Impact',
    description: 'A processor runs at 3GHz with CPI=1.0 (no memory stalls). L1 cache has 2% miss rate, 10 cycle miss penalty. Calculate new CPI and performance impact.',
    difficulty: 2,
    hints: ['Assume some percentage of instructions are memory ops', 'Miss penalty adds to CPI', 'Consider typical instruction mix'],
    solution: `Cache Performance Impact Analysis:

Given:
- CPU frequency: 3 GHz
- Base CPI: 1.0 (without memory stalls)
- L1 miss rate: 2%
- L1 miss penalty: 10 cycles

Assumption: 30% of instructions are loads/stores
(typical for many workloads)

Memory stall cycles per instruction:
= Memory_instruction_fraction × Miss_rate × Miss_penalty
= 0.30 × 0.02 × 10
= 0.06 cycles per instruction

New CPI with memory stalls:
CPI = Base_CPI + Memory_stall_cycles
= 1.0 + 0.06
= 1.06

Performance impact:
Speedup = Old_CPI / New_CPI = 1.0 / 1.06 = 0.943
Slowdown = 1 - 0.943 = 5.7%

Alternative calculation (if ALL instructions accessed memory):
Memory stalls = 1.0 × 0.02 × 10 = 0.2 cycles
CPI = 1.0 + 0.2 = 1.2
20% slowdown

Real-world consideration:
- Miss penalty often hidden by out-of-order execution
- Multiple outstanding misses (MLP)
- Prefetching reduces effective miss rate
- Actual impact often less than calculated

Sensitivity:
- If miss rate → 4%: stalls = 0.12, CPI = 1.12 (12% slowdown)
- If miss penalty → 20: stalls = 0.12, CPI = 1.12
- Memory performance critical for overall performance!`,
  },
  {
    id: 'cs202-t5-ex13',
    subjectId: 'cs202',
    topicId: 'cs202-topic5',
    type: 'written',
    title: 'Cache Blocking',
    description: 'Explain cache blocking (tiling) for matrix multiplication. For matrices A, B, C that don\'t fit in cache, how does blocking help?',
    difficulty: 4,
    hints: ['Divide matrices into smaller blocks', 'Keep blocks in cache', 'Work on one block at a time'],
    solution: `Cache Blocking for Matrix Multiplication:

Standard matrix multiply: C = A × B
for (i = 0; i < N; i++)
    for (j = 0; j < N; j++)
        for (k = 0; k < N; k++)
            C[i][j] += A[i][k] * B[k][j];

Problem with large matrices:
- A, B, C each N×N elements
- If N=1000: 3 × 4MB = 12MB total
- Typical L1: 32KB, L2: 256KB
- Inner loop accesses entire row of A, column of B
- Massive cache misses!

Cache Blocking (Tiling):
Divide into B×B blocks that fit in cache

for (ii = 0; ii < N; ii += B)
    for (jj = 0; jj < N; jj += B)
        for (kk = 0; kk < N; kk += B)
            // Multiply block [ii:ii+B] × [kk:kk+B]
            for (i = ii; i < min(ii+B, N); i++)
                for (j = jj; j < min(jj+B, N); j++)
                    for (k = kk; k < min(kk+B, N); k++)
                        C[i][j] += A[i][k] * B[k][j];

Why it works:
- Block size B chosen so 3 B×B blocks fit in cache
- Cache requirement: 3 × B² × 4 bytes < Cache size
- For 32KB L1: B ≈ 50

Data reuse analysis:
Without blocking (N=1000):
- Each A element used N times, but evicted between uses
- B column accessed N times with cache misses each time

With blocking (B=50):
- A block loaded once, used for B iterations
- B block loaded once, used for B iterations
- Much better cache utilization

Performance improvement:
- Unblocked: O(N³) memory accesses
- Blocked: O(N³/B) memory accesses
- Speedup factor: ~B (up to 10-50×)`,
  },
  {
    id: 'cs202-t5-ex14',
    subjectId: 'cs202',
    topicId: 'cs202-topic5',
    type: 'written',
    title: 'Prefetching',
    description: 'Explain hardware vs software prefetching. What are the benefits and risks of prefetching? Give an example prefetch strategy for sequential array access.',
    difficulty: 3,
    hints: ['Prefetch brings data before it\'s needed', 'Can waste bandwidth if wrong', 'Timing is critical'],
    solution: `Prefetching: Fetching Data Before It's Needed

Hardware Prefetching:
- Automatically detects access patterns
- Stream prefetcher: detects sequential accesses
- Stride prefetcher: detects constant stride patterns
- No programmer effort required
- May prefetch incorrectly

Software Prefetching:
- Programmer inserts prefetch instructions
- __builtin_prefetch(addr) in GCC
- Precise control over what to prefetch
- Requires programmer effort/knowledge

Example: Sequential Array Access
for (i = 0; i < N; i++)
    sum += arr[i];

Without prefetch:
- arr[0] miss, wait 100 cycles
- arr[1-15] hits (same cache line)
- arr[16] miss, wait 100 cycles
- ...

With software prefetch:
for (i = 0; i < N; i++) {
    __builtin_prefetch(&arr[i + 16]);  // Prefetch ahead
    sum += arr[i];
}

Timeline:
i=0: prefetch arr[16], access arr[0] (miss)
i=1-15: prefetch arr[17-31], access arr[1-15] (hits)
i=16: arr[16] already prefetched! (hit)
...

Benefits:
- Hides memory latency
- Converts compulsory misses to hits
- Can dramatically improve streaming performance

Risks:
1. Prefetch too early → data evicted before use
2. Prefetch too late → data not ready
3. Wrong data → wasted bandwidth
4. Cache pollution → evicts useful data
5. Bandwidth saturation → slows other accesses

Optimal prefetch distance:
Distance = Memory_latency / Time_per_iteration
For 100 cycle latency, 5 cycles per iteration: prefetch 20 ahead`,
  },
  {
    id: 'cs202-t5-ex15',
    subjectId: 'cs202',
    topicId: 'cs202-topic5',
    type: 'written',
    title: 'Cache Coherence Problem',
    description: 'Two processors share memory. Processor 1 writes X=5 (initially X=0). Processor 2\'s cache still has X=0. Explain this coherence problem and how snooping protocols address it.',
    difficulty: 4,
    hints: ['Multiple copies of same data', 'Writes must be visible to all', 'Invalidate or update?'],
    solution: `Cache Coherence Problem:

Initial state:
- Memory: X = 0
- P1 cache: X = 0
- P2 cache: X = 0

After P1 writes X = 5:
- Memory: X = 5 (with write-through) or X = 0 (write-back)
- P1 cache: X = 5
- P2 cache: X = 0  ← STALE DATA!

If P2 reads X, it gets 0 instead of 5!
This violates cache coherence.

Coherence requirements:
1. Write propagation: writes eventually visible to all
2. Write serialization: all processors see writes in same order

Snooping Protocol Solution:

Bus-based snooping (MSI protocol):
States per cache line:
- Modified (M): exclusive, dirty
- Shared (S): clean, others may have copy
- Invalid (I): not valid

P1 writes X:
1. P1 broadcasts "write X" on bus
2. P2 snoops bus, sees write to X
3. P2 invalidates its copy (S → I)
4. P1 writes X = 5, marks Modified

P2 reads X:
1. P2 has X Invalid, must fetch
2. P1 snoops read request
3. P1 supplies X = 5 (has Modified copy)
4. Both transition to Shared

State transitions:
P1: I → M (on write)
P2: S → I (on snoop of write)
P2: I → S (on read, P1 supplies data)
P1: M → S (on snoop of read)

Alternatives to invalidation:
- Update protocol: broadcast new value
- Trade-off: invalidate has less traffic for multiple writes
- Most systems use invalidation`,
  },
  {
    id: 'cs202-t5-ex16',
    subjectId: 'cs202',
    topicId: 'cs202-topic5',
    type: 'written',
    title: 'TLB and Cache Interaction',
    description: 'Draw a diagram showing the interaction between TLB, L1 cache, L2 cache, and main memory for a memory access. Show the critical path for a TLB hit/L1 hit case.',
    difficulty: 3,
    hints: ['TLB translates virtual to physical', 'L1 can be VIPT or PIPT', 'Multiple levels accessed on miss'],
    solution: `Memory Access Flow Diagram:

CPU generates Virtual Address (VA)
            │
            ▼
    ┌───────────────┐
    │     TLB       │──────────────┐
    │  (VA → PA)    │              │ TLB Miss
    └───────┬───────┘              ▼
            │ TLB Hit         Page Table Walk
            │ (PA ready)           │
            ▼                      │
    ┌───────────────┐              │
    │   L1 Cache    │◄─────────────┘
    │   (VIPT)      │
    └───────┬───────┘
            │ L1 Miss
            │ (has PA from TLB)
            ▼
    ┌───────────────┐
    │   L2 Cache    │
    │   (PIPT)      │
    └───────┬───────┘
            │ L2 Miss
            ▼
    ┌───────────────┐
    │   L3 Cache    │
    │   (PIPT)      │
    └───────┬───────┘
            │ L3 Miss
            ▼
    ┌───────────────┐
    │  Main Memory  │
    └───────────────┘

Critical Path (TLB Hit, L1 Hit):

Cycle 1: VA → TLB lookup || VA → L1 index (parallel for VIPT)
Cycle 1: TLB returns PA, L1 returns candidate tags
Cycle 2: Compare tags, data ready

Total: ~2 cycles for VIPT L1

For PIPT L1 (serial):
Cycle 1: VA → TLB → PA
Cycle 2: PA → L1 index → tag compare
Cycle 3: Data ready

Total: ~3 cycles

Miss cases (cumulative latency):
TLB hit, L1 hit:    2 cycles
TLB hit, L1 miss:   2 + 10 = 12 cycles (L2 access)
TLB hit, L2 miss:   12 + 30 = 42 cycles (L3 access)
TLB hit, L3 miss:   42 + 100 = 142 cycles (memory)
TLB miss:           +20-100 cycles (page table walk)`,
  },
];
