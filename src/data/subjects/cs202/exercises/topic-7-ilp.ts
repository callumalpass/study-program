import type { WrittenExercise } from '../../../../core/types';

export const topic7Exercises: WrittenExercise[] = [
  {
    id: 'cs202-t7-ex1',
    subjectId: 'cs202',
    topicId: 'cs202-topic7',
    type: 'written',
    title: 'ILP Fundamentals',
    description: 'Define ILP and explain the difference between ILP available in a program vs ILP exploited by hardware. What limits each?',
    difficulty: 2,
    hints: ['Program ILP = parallelism in code', 'Hardware ILP = what processor extracts', 'Consider dependencies'],
    solution: `Instruction-Level Parallelism (ILP):

Definition: ILP is the potential to execute multiple instructions
simultaneously within a single thread.

Program ILP (inherent):
- Parallelism available in the instruction stream
- Limited by true data dependencies
- Independent of hardware

Example:
a = b + c;     # Independent
d = e + f;     # Can execute in parallel
g = a + d;     # Depends on both above

Program ILP = 2 (first two can be parallel)

Exploited ILP (realized):
- Parallelism actually extracted by hardware
- Limited by hardware resources and mechanisms

Limits on Program ILP:
1. True dependencies (RAW - Read After Write)
   add R1, R2, R3
   sub R4, R1, R5  # Must wait for R1

2. Control dependencies (branches)
   beq R1, R2, L1
   add R3, R4, R5  # Don't know if needed

3. Memory dependencies (potential aliases)
   store [R1], R2
   load R3, [R4]   # Might be same address!

Limits on Exploited ILP:
1. Issue width: How many instructions per cycle?
2. Window size: How far ahead can we look?
3. Functional units: Enough ALUs, FPUs?
4. Register file ports: Can read/write enough?
5. Branch prediction: Mispredictions waste work

Typical values:
- Program ILP: Varies widely (2-100+)
- Exploited ILP: 2-4 (modern CPUs)
- Gap due to hardware limitations and conservative choices`,
  },
  {
    id: 'cs202-t7-ex2',
    subjectId: 'cs202',
    topicId: 'cs202-topic7',
    type: 'written',
    title: 'Superscalar Basics',
    description: 'A 4-wide superscalar processor can issue 4 instructions per cycle. Given this code, what is the maximum IPC achievable? \nadd R1, R2, R3\nmul R4, R5, R6\nsub R7, R1, R8\ndiv R9, R4, R10',
    difficulty: 3,
    hints: ['Check dependencies between instructions', 'Consider which can issue together', 'Look at RAW hazards'],
    solution: `Superscalar Analysis (4-wide):

Instructions:
I1: add R1, R2, R3
I2: mul R4, R5, R6
I3: sub R7, R1, R8   # Depends on I1 (RAW on R1)
I4: div R9, R4, R10  # Depends on I2 (RAW on R4)

Dependency graph:
I1 ──────► I3
    R1
I2 ──────► I4
    R4

Cycle-by-cycle execution (assuming 1-cycle latency):

Cycle 1: Issue I1, I2 (both independent)
- I1, I2 execute
- I3 waits for R1
- I4 waits for R4

Cycle 2: Issue I3, I4 (dependencies resolved)
- I3 uses R1 (forwarded from I1)
- I4 uses R4 (forwarded from I2)

Total: 4 instructions in 2 cycles
IPC = 4 / 2 = 2.0

Maximum theoretical IPC = 4.0 (issue width)
Achieved IPC = 2.0 (limited by dependencies)

If all were independent:
Cycle 1: I1, I2, I3, I4 (all 4)
IPC = 4.0

Analysis:
- Dependencies create serialization
- I1→I3 and I2→I4 each form chains
- Two chains can execute in parallel
- But each chain is serialized

Best case for 4-wide superscalar requires
at least 4 independent instructions per cycle.`,
  },
  {
    id: 'cs202-t7-ex3',
    subjectId: 'cs202',
    topicId: 'cs202-topic7',
    type: 'written',
    title: 'Register Renaming',
    description: 'Explain how register renaming eliminates WAW and WAR hazards. Show the renaming for:\nadd R1, R2, R3\nsub R4, R1, R5\nadd R1, R6, R7\nmul R8, R1, R4',
    difficulty: 4,
    hints: ['Architectural vs physical registers', 'Each write gets new physical register', 'Eliminates false dependencies'],
    solution: `Register Renaming:

Original code:
I1: add R1, R2, R3
I2: sub R4, R1, R5    # RAW on R1 (true)
I3: add R1, R6, R7    # WAW on R1 (false), WAR with I2
I4: mul R8, R1, R4    # RAW on R1, R4 (true)

Without renaming:
- I3 must wait for I2 to read R1 (WAR hazard)
- I3 must wait for I1 to write R1 (WAW hazard)
- Limits parallelism despite no TRUE dependency

With register renaming:
Physical registers: P1, P2, P3, ...
Register Alias Table (RAT): maps arch → physical

Initial RAT: R1→P1, R2→P2, R3→P3, R4→P4, ...

I1: add R1, R2, R3
    Rename: add P10, P2, P3  (new P10 for R1)
    RAT: R1→P10

I2: sub R4, R1, R5
    Rename: sub P11, P10, P5  (uses current R1=P10)
    RAT: R4→P11

I3: add R1, R6, R7
    Rename: add P12, P6, P7  (new P12 for R1, different!)
    RAT: R1→P12

I4: mul R8, R1, R4
    Rename: mul P13, P12, P11  (uses current R1=P12, R4=P11)

After renaming:
add P10, P2, P3     # No dependencies
sub P11, P10, P5    # RAW on P10 only
add P12, P6, P7     # No dependencies!
mul P13, P12, P11   # RAW on P12, P11

Now I1 and I3 can execute in parallel!
WAW and WAR eliminated - only true RAW remains.

Parallelism exposed:
Cycle 1: I1, I3 (both independent now)
Cycle 2: I2, I4 (dependencies resolved)`,
  },
  {
    id: 'cs202-t7-ex4',
    subjectId: 'cs202',
    topicId: 'cs202-topic7',
    type: 'written',
    title: 'Tomasulo Algorithm',
    description: 'Describe the three key components of Tomasulo\'s algorithm. How does it enable out-of-order execution while maintaining correctness?',
    difficulty: 4,
    hints: ['Reservation stations', 'Common Data Bus', 'Register renaming via tags'],
    solution: `Tomasulo's Algorithm Components:

1. Reservation Stations (RS):
   - Buffer for instructions waiting to execute
   - Hold operands or tags for pending operands
   - Distributed (per functional unit)

   Structure:
   ┌────┬────┬─────┬─────┬─────┬─────┐
   │ Op │Busy│ Qj  │ Vj  │ Qk  │ Vk  │
   ├────┼────┼─────┼─────┼─────┼─────┤
   │ADD │  1 │  -  │ 10  │ RS2 │  -  │
   │MUL │  1 │ RS1 │  -  │  -  │  5  │
   └────┴────┴─────┴─────┴─────┴─────┘
   Q = tag of producing RS (0 = value ready)
   V = actual value (when ready)

2. Common Data Bus (CDB):
   - Broadcasts results to all waiting stations
   - Tag + Value broadcast
   - All RS snoop for matching tags

   When RS completes:
   CDB ← {Tag: RS_ID, Value: result}
   All RS with Qj/Qk = Tag update Vj/Vk

3. Register Status (Rename Table):
   - Maps arch register to producing RS
   - Qi = 0 means value in register file
   - Qi = RSx means wait for RSx result

   ┌──────┬─────┬───────┐
   │ Reg  │ Qi  │ Value │
   ├──────┼─────┼───────┤
   │  R1  │ RS2 │   -   │ (waiting)
   │  R2  │  0  │  42   │ (ready)
   └──────┴─────┴───────┘

Execution flow:
1. Issue: Allocate RS, read ready operands, set tags
2. Execute: When all operands ready, execute
3. Write Result: Broadcast on CDB, update waiting RS

Correctness maintained by:
- True dependencies: Operand tags ensure waiting
- WAW/WAR: Eliminated by renaming to RS tags
- In-order issue: Respects program order
- Out-of-order execute: Safe due to renaming
- In-order commit: Via Reorder Buffer (added later)`,
  },
  {
    id: 'cs202-t7-ex5',
    subjectId: 'cs202',
    topicId: 'cs202-topic7',
    type: 'written',
    title: 'Branch Prediction Accuracy',
    description: 'A processor with 90% branch prediction accuracy executes a program where 20% of instructions are branches. If the misprediction penalty is 15 cycles, what is the CPI impact?',
    difficulty: 2,
    hints: ['Misprediction rate = 1 - accuracy', 'Calculate stall cycles per instruction'],
    solution: `Branch Prediction Impact Analysis:

Given:
- Branch prediction accuracy: 90%
- Branch frequency: 20% of instructions
- Misprediction penalty: 15 cycles
- Assume base CPI = 1.0

Misprediction rate:
= 1 - accuracy = 1 - 0.90 = 0.10 (10%)

Branch misprediction stalls per instruction:
= Branch_frequency × Misprediction_rate × Penalty
= 0.20 × 0.10 × 15
= 0.30 cycles per instruction

CPI with branch stalls:
CPI = Base_CPI + Branch_stalls
= 1.0 + 0.30
= 1.30

Performance impact:
- Without branches: CPI = 1.0
- With branches: CPI = 1.30
- Slowdown: 30%
- Speedup potential: 1.30/1.0 = 1.30× with perfect prediction

Sensitivity analysis:

If accuracy improves to 95%:
Stalls = 0.20 × 0.05 × 15 = 0.15
CPI = 1.15 (15% slowdown)

If accuracy improves to 99%:
Stalls = 0.20 × 0.01 × 15 = 0.03
CPI = 1.03 (3% slowdown)

Key insight:
Every 1% improvement in branch prediction:
Saves: 0.20 × 0.01 × 15 = 0.03 CPI
3% of ideal performance per 1% accuracy

High accuracy (>95%) critical for deep pipelines!`,
  },
  {
    id: 'cs202-t7-ex6',
    subjectId: 'cs202',
    topicId: 'cs202-topic7',
    type: 'written',
    title: 'Speculative Execution',
    description: 'Explain speculative execution and the role of the Reorder Buffer (ROB). What happens on a branch misprediction?',
    difficulty: 3,
    hints: ['Execute before knowing if needed', 'ROB holds speculative results', 'Recovery on misprediction'],
    solution: `Speculative Execution:

Definition:
Execute instructions before knowing if they should execute
(usually past unresolved branches)

Why speculate?
- Branch takes cycles to resolve
- Don't waste time waiting
- High accuracy makes speculation profitable

Reorder Buffer (ROB):
- Holds speculative instruction results
- Maintains program order
- Enables in-order commit despite OoO execution

ROB structure:
┌─────┬──────┬───────┬───────┬────────┬─────────┐
│Entry│ Busy │ Instr │ State │ Dest   │ Value   │
├─────┼──────┼───────┼───────┼────────┼─────────┤
│  0  │  1   │ add   │ Commit│  R1    │   42    │
│  1  │  1   │ beq   │ Exec  │  -     │   -     │
│  2  │  1   │ mul   │ Done  │  R2    │   15    │ ← Speculative!
│  3  │  1   │ sub   │ Issue │  R3    │   -     │ ← Speculative!
└─────┴──────┴───────┴───────┴────────┴─────────┘
                       ↑
               Head (oldest)

Normal flow:
1. Issue: Allocate ROB entry, rename dest to ROB#
2. Execute: Compute result, write to ROB
3. Commit: When head of ROB, write to arch register

On branch misprediction:

Before misprediction discovered:
ROB: [branch, speculative_instr1, speculative_instr2, ...]

Misprediction detected at commit:
1. Flush ROB entries after mispredicted branch
2. Discard speculative results
3. Restore register rename table to checkpoint
4. Redirect fetch to correct path

Recovery steps:
┌────────────────────────────────────────────────┐
│ 1. Squash: Clear speculative ROB entries       │
│ 2. Restore: Rename table to safe checkpoint    │
│ 3. Redirect: PC to correct branch target       │
│ 4. Resume: Fetch from correct path             │
└────────────────────────────────────────────────┘

Cost of misprediction:
- Lost work: All speculative instructions wasted
- Pipeline refill: Frontend delay
- Penalty: Typically 10-20 cycles on modern CPUs`,
  },
  {
    id: 'cs202-t7-ex7',
    subjectId: 'cs202',
    topicId: 'cs202-topic7',
    type: 'written',
    title: 'VLIW vs Superscalar',
    description: 'Compare VLIW and superscalar approaches to exploiting ILP. What are the advantages and disadvantages of each?',
    difficulty: 3,
    hints: ['Who does the scheduling?', 'Hardware complexity', 'Code compatibility'],
    solution: `VLIW vs Superscalar Comparison:

VLIW (Very Long Instruction Word):
- Compiler schedules parallel operations
- Hardware executes bundles as specified
- Simple hardware, complex compiler

Example VLIW instruction (128-bit):
┌─────────────┬─────────────┬─────────────┬─────────────┐
│  ALU Op 1   │  ALU Op 2   │  Memory Op  │  Branch Op  │
│  add r1,r2  │  mul r3,r4  │  ld r5,[r6] │    nop      │
└─────────────┴─────────────┴─────────────┴─────────────┘
Compiler guarantees no conflicts!

Superscalar:
- Hardware schedules parallel operations
- Instructions issued dynamically
- Complex hardware, standard compiler

Comparison:
┌─────────────────┬───────────────┬────────────────────┐
│ Aspect          │ VLIW          │ Superscalar        │
├─────────────────┼───────────────┼────────────────────┤
│ Scheduling by   │ Compiler      │ Hardware           │
│ HW complexity   │ Low           │ High               │
│ Compiler work   │ High          │ Moderate           │
│ Power           │ Lower         │ Higher             │
│ Binary compat   │ Poor          │ Good               │
│ Dynamic adapt   │ No            │ Yes                │
│ Code size       │ Larger (NOPs) │ Normal             │
└─────────────────┴───────────────┴────────────────────┘

VLIW Advantages:
1. Simpler, lower-power hardware
2. More predictable performance
3. Compiler has global view
4. Good for DSPs, embedded (IA-64, TI DSPs)

VLIW Disadvantages:
1. Code tied to specific implementation
2. Can't adapt to runtime conditions
3. NOP waste for low-ILP code
4. Branch penalties harder to hide

Superscalar Advantages:
1. Binary compatibility across generations
2. Adapts to runtime conditions
3. Works with legacy code
4. Handles variable latencies

Superscalar Disadvantages:
1. Complex, power-hungry hardware
2. Scheduling overhead every cycle
3. Limited by window size

Modern trend: Superscalar dominates general-purpose,
VLIW successful in DSPs and specific domains.`,
  },
  {
    id: 'cs202-t7-ex8',
    subjectId: 'cs202',
    topicId: 'cs202-topic7',
    type: 'written',
    title: 'Loop Unrolling',
    description: 'Show how unrolling this loop by a factor of 4 exposes more ILP:\nfor(i=0; i<100; i++) A[i] = A[i] + B[i];',
    difficulty: 3,
    hints: ['Replicate loop body', 'Separate iterations become parallel', 'Reduce loop overhead'],
    solution: `Loop Unrolling Analysis:

Original loop:
for (i = 0; i < 100; i++)
    A[i] = A[i] + B[i];

Assembly (simplified):
loop:
    load  R1, A[i]      # 1
    load  R2, B[i]      # 2
    add   R3, R1, R2    # 3 - depends on 1,2
    store A[i], R3      # 4 - depends on 3
    addi  i, i, 1       # 5
    blt   i, 100, loop  # 6 - depends on 5

ILP per iteration: Limited
- loads can be parallel
- add waits for loads
- store waits for add
- branch overhead each iteration

Unrolled by 4:
for (i = 0; i < 100; i += 4) {
    A[i]   = A[i]   + B[i];
    A[i+1] = A[i+1] + B[i+1];
    A[i+2] = A[i+2] + B[i+2];
    A[i+3] = A[i+3] + B[i+3];
}

Assembly (unrolled):
loop:
    load  R1, A[i]      # Iteration 0
    load  R2, B[i]
    load  R3, A[i+1]    # Iteration 1 - PARALLEL!
    load  R4, B[i+1]
    load  R5, A[i+2]    # Iteration 2 - PARALLEL!
    load  R6, B[i+2]
    load  R7, A[i+3]    # Iteration 3 - PARALLEL!
    load  R8, B[i+3]
    add   R9,  R1, R2   # All adds can be parallel!
    add   R10, R3, R4
    add   R11, R5, R6
    add   R12, R7, R8
    store A[i],   R9    # All stores independent
    store A[i+1], R10
    store A[i+2], R11
    store A[i+3], R12
    addi  i, i, 4       # Only 1 increment
    blt   i, 100, loop  # Only 1 branch

Benefits:
1. 8 loads can issue in parallel
2. 4 adds can issue in parallel
3. 4 stores can issue in parallel
4. Loop overhead reduced 4×

ILP exposed: ~8 (vs ~2 before)
Branches reduced: 4× fewer iterations`,
  },
  {
    id: 'cs202-t7-ex9',
    subjectId: 'cs202',
    topicId: 'cs202-topic7',
    type: 'written',
    title: 'SIMD Operations',
    description: 'Explain how SIMD (Single Instruction Multiple Data) differs from superscalar. Give an example of adding four pairs of numbers using SSE/AVX.',
    difficulty: 2,
    hints: ['One instruction, multiple data elements', 'Wide registers', 'Data-level parallelism'],
    solution: `SIMD (Single Instruction Multiple Data):

Concept:
- One instruction operates on multiple data elements
- Wide registers hold vectors of values
- Same operation applied to all elements

SIMD vs Superscalar:
┌─────────────────┬─────────────────────┬───────────────────┐
│ Aspect          │ Superscalar         │ SIMD              │
├─────────────────┼─────────────────────┼───────────────────┤
│ Parallelism     │ Different instrs    │ Same instr        │
│ Data            │ Scalar values       │ Vector of values  │
│ Control         │ Multiple streams    │ Single stream     │
│ Best for        │ General code        │ Data parallel     │
└─────────────────┴─────────────────────┴───────────────────┘

SSE/AVX Example: Add four pairs of floats

Scalar code (4 instructions):
    add r1, a[0], b[0]  # result[0]
    add r2, a[1], b[1]  # result[1]
    add r3, a[2], b[2]  # result[2]
    add r4, a[3], b[3]  # result[3]

SIMD code (1 instruction):
    vaddps xmm0, xmm1, xmm2  # All 4 at once!

    xmm1: [a[0], a[1], a[2], a[3]]  (128-bit)
    xmm2: [b[0], b[1], b[2], b[3]]
    xmm0: [a[0]+b[0], a[1]+b[1], a[2]+b[2], a[3]+b[3]]

AVX-512 example (16 floats at once):
    vaddps zmm0, zmm1, zmm2

    zmm1: [a[0], a[1], ..., a[15]]  (512-bit)
    zmm2: [b[0], b[1], ..., b[15]]
    zmm0: [sum[0], sum[1], ..., sum[15]]

SIMD width progression:
- MMX: 64-bit (8 × 8-bit or 4 × 16-bit)
- SSE: 128-bit (4 × 32-bit float)
- AVX: 256-bit (8 × 32-bit float)
- AVX-512: 512-bit (16 × 32-bit float)

Best applications:
- Image/video processing
- Scientific computing
- Machine learning
- Any loop over arrays with same operation`,
  },
  {
    id: 'cs202-t7-ex10',
    subjectId: 'cs202',
    topicId: 'cs202-topic7',
    type: 'written',
    title: 'Amdahl\'s Law',
    description: 'A program spends 80% of time in parallelizable code. Using Amdahl\'s Law, calculate the maximum speedup with infinite parallel processors. What if only 50% is parallelizable?',
    difficulty: 2,
    hints: ['Serial portion limits speedup', 'Formula: 1/((1-P) + P/N)', 'Consider N → ∞'],
    solution: `Amdahl's Law Analysis:

Amdahl's Law formula:
Speedup = 1 / ((1 - P) + P/N)

Where:
- P = parallelizable fraction
- N = number of processors
- (1-P) = serial fraction

Case 1: P = 0.80 (80% parallelizable)

With N = 2 processors:
Speedup = 1 / (0.20 + 0.80/2)
        = 1 / (0.20 + 0.40)
        = 1 / 0.60
        = 1.67×

With N = 4 processors:
Speedup = 1 / (0.20 + 0.80/4)
        = 1 / (0.20 + 0.20)
        = 1 / 0.40
        = 2.5×

With N → ∞ (maximum speedup):
Speedup = 1 / (0.20 + 0)
        = 1 / 0.20
        = 5× maximum

Case 2: P = 0.50 (50% parallelizable)

With N → ∞:
Speedup = 1 / (0.50 + 0)
        = 1 / 0.50
        = 2× maximum

Comparison table:
┌─────────┬──────────────────────────────────┐
│    N    │  P=50%    P=80%    P=95%    P=99% │
├─────────┼──────────────────────────────────┤
│    2    │  1.33×    1.67×    1.90×    1.98× │
│    4    │  1.60×    2.50×    3.48×    3.88× │
│    8    │  1.78×    3.33×    5.93×    7.48× │
│   16    │  1.88×    4.00×    9.14×   13.91× │
│   ∞     │  2.00×    5.00×   20.00×  100.00× │
└─────────┴──────────────────────────────────┘

Key insight:
Serial portion dominates as N increases.
Even 1% serial limits speedup to 100×!

Implications:
- Focus optimization on serial bottlenecks
- Diminishing returns adding processors
- Need high parallelizable fraction for many-core`,
  },
  {
    id: 'cs202-t7-ex11',
    subjectId: 'cs202',
    topicId: 'cs202-topic7',
    type: 'written',
    title: 'Dependency Types',
    description: 'Identify all dependencies (RAW, WAR, WAW) in this code:\nI1: R1 = R2 + R3\nI2: R4 = R1 - R5\nI3: R1 = R6 * R7\nI4: R8 = R1 + R4',
    difficulty: 3,
    hints: ['RAW: true dependency', 'WAR: anti-dependency', 'WAW: output dependency'],
    solution: `Dependency Analysis:

Instructions:
I1: R1 = R2 + R3
I2: R4 = R1 - R5
I3: R1 = R6 * R7
I4: R8 = R1 + R4

Step 1: Identify all reads and writes

│ Instr │ Writes │ Reads     │
├───────┼────────┼───────────┤
│  I1   │  R1    │ R2, R3    │
│  I2   │  R4    │ R1, R5    │
│  I3   │  R1    │ R6, R7    │
│  I4   │  R8    │ R1, R4    │

Step 2: Find dependencies

RAW (Read After Write) - True dependencies:
• I1 → I2 on R1 (I1 writes R1, I2 reads R1)
• I2 → I4 on R4 (I2 writes R4, I4 reads R4)
• I3 → I4 on R1 (I3 writes R1, I4 reads R1)

WAR (Write After Read) - Anti-dependencies:
• I2 → I3 on R1 (I2 reads R1, I3 writes R1)

WAW (Write After Write) - Output dependencies:
• I1 → I3 on R1 (I1 writes R1, I3 writes R1)

Dependency diagram:
        RAW(R1)    WAW(R1)
    I1 ─────────► I2 ────────┐
    │             │          │
    │ WAW(R1)     │ WAR(R1)  │
    └──────► I3 ◄─┘          │
              │              │
              │ RAW(R1)      │ RAW(R4)
              └──────► I4 ◄──┘

True (RAW) dependencies: 3
Anti (WAR) dependencies: 1
Output (WAW) dependencies: 1

With register renaming (eliminates WAR, WAW):
I1: P1 = P2 + P3
I2: P4 = P1 - P5      # RAW on P1
I3: P10 = P6 + P7     # Renamed! No WAW
I4: P8 = P10 + P4     # RAW on P10, P4

Now I1, I3 can execute in parallel!`,
  },
  {
    id: 'cs202-t7-ex12',
    subjectId: 'cs202',
    topicId: 'cs202-topic7',
    type: 'written',
    title: 'Issue Width vs Window Size',
    description: 'Explain the difference between issue width and instruction window size. Why might a processor have a window much larger than its issue width?',
    difficulty: 3,
    hints: ['Issue width = instructions per cycle', 'Window = instructions being examined', 'Dependencies may span many instructions'],
    solution: `Issue Width vs Window Size:

Issue Width:
- Maximum instructions issued per cycle
- Determines peak IPC
- Limited by: decode width, rename bandwidth, functional units

Instruction Window (ROB size):
- Number of instructions "in-flight"
- Instructions between oldest and newest being tracked
- Determines how far ahead processor can look

Typical values:
┌────────────────┬──────────────┬─────────────────┐
│ Processor      │ Issue Width  │ Window (ROB)    │
├────────────────┼──────────────┼─────────────────┤
│ Intel Core     │ 4-6          │ 224-352         │
│ AMD Zen        │ 4-6          │ 256             │
│ Apple M1       │ 8            │ ~600            │
│ Typical ratio  │ 1            │ 40-100×         │
└────────────────┴──────────────┴─────────────────┘

Why window >> issue width?

1. Finding ILP:
   Large window needed to find independent instructions

   Example: If dependencies span 10 instructions,
   need window > 10 to overlap next independent group

2. Hiding latency:
   Long-latency operations (cache miss = 100s cycles)
   Need large window to have work during miss

   Example: 4-wide, 200 cycle miss
   Need 800 entry window to stay busy!

3. Branch coverage:
   Window spans multiple basic blocks
   More opportunities to find parallelism

4. Memory-level parallelism:
   Multiple cache misses in flight
   Large window = more outstanding misses

Analogy:
Issue width = checkout lanes at store
Window size = shopping carts in store

Many carts can be filling while few checkout at a time.
Large window keeps pipeline fed despite dependencies.`,
  },
  {
    id: 'cs202-t7-ex13',
    subjectId: 'cs202',
    topicId: 'cs202-topic7',
    type: 'written',
    title: 'Precise Exceptions',
    description: 'Why are precise exceptions difficult with out-of-order execution? How does the Reorder Buffer enable precise exceptions?',
    difficulty: 4,
    hints: ['OoO changes completion order', 'Need consistent state on exception', 'ROB commits in order'],
    solution: `Precise Exceptions with OoO Execution:

The problem:
Out-of-order execution completes instructions in different
order than program order. But exceptions must show
architectural state AS IF program ran in order.

Example:
I1: div R1, R2, R3     # slow, may trap
I2: add R4, R5, R6     # fast
I3: load R7, [R8]      # may trap

Execution order: I2, I3, I1 (div is slow)

If I1 causes divide-by-zero:
- I2 has completed (wrote R4)
- I3 has completed (wrote R7)
- But they shouldn't have! They're "after" I1

Imprecise exception state:
Some later instructions completed
Not consistent with any program point

Reorder Buffer solution:

ROB commits instructions IN ORDER regardless of
when they complete execution.

Structure:
┌─────┬────────┬───────┬──────────┐
│ ROB │ Instr  │ Done? │ Value    │
├─────┼────────┼───────┼──────────┤
│  0  │ I1 div │  No   │ pending  │ ← HEAD (oldest)
│  1  │ I2 add │  Yes  │ 42       │ (waiting to commit)
│  2  │ I3 load│  Yes  │ 100      │ (waiting to commit)
└─────┴────────┴───────┴──────────┘

Commit rules:
1. Only HEAD can commit
2. Instruction must be complete
3. Commit writes to architectural state
4. Exception checked at commit time

Exception handling:
1. I1 completes with exception
2. At commit: I1 is HEAD, has exception
3. Flush ROB (I2, I3 results discarded)
4. Architectural state is precisely before I1
5. Handle exception

Key insight:
- Speculative results stay in ROB until commit
- Architectural registers updated ONLY at commit
- In-order commit despite out-of-order execution
- Exception sees clean state at I1

Cost:
- ROB storage for all in-flight results
- Commit bandwidth limits sustained IPC
- Worthwhile for correct exception handling`,
  },
  {
    id: 'cs202-t7-ex14',
    subjectId: 'cs202',
    topicId: 'cs202-topic7',
    type: 'written',
    title: 'Memory Disambiguation',
    description: 'Explain the memory disambiguation problem. How can loads be speculatively executed before earlier stores?',
    difficulty: 4,
    hints: ['Stores might alias with loads', 'Can\'t know addresses until execution', 'Speculation and recovery'],
    solution: `Memory Disambiguation Problem:

The issue:
store [R1], R2
load  R3, [R4]  # Does R4 == R1? Don't know until execute!

If R1 == R4: RAW dependency (must wait)
If R1 != R4: Independent (can execute in parallel)

Challenge: Addresses computed at execution time
Can't know dependencies at decode/issue

Conservative approach:
Wait for all earlier stores before any load
Kills memory-level parallelism!

Aggressive approach (speculation):
Execute loads before stores, recover if wrong

Load Store Queue (LSQ) architecture:
┌─────────────────────────────────────────────┐
│           Load Store Queue                   │
│                                              │
│  Store Queue      │    Load Queue            │
│ ┌────┬─────┬────┐ │ ┌────┬─────┬────┐       │
│ │Addr│Data │Done│ │ │Addr│Data │Done│       │
│ ├────┼─────┼────┤ │ ├────┼─────┼────┤       │
│ │100 │ 42  │ Y  │ │ │104 │ 15  │ Y  │       │
│ │ ?  │ 7   │ N  │ │ │ ?  │  ?  │ N  │       │
│ └────┴─────┴────┘ │ └────┴─────┴────┘       │
└─────────────────────────────────────────────┘

Speculative load execution:
1. Issue load, check store queue
2. If older store has same address → forward data
3. If older store address unknown → speculate no conflict
4. Execute load, get data from cache/memory
5. When older stores get addresses, verify speculation

Store-to-load forwarding:
store [100], R5    # Value in store queue
load  R6, [100]    # Get value from store queue!
No memory access needed - forwarded from store queue

Conflict detection:
When older store gets address:
if (store.addr == speculative_load.addr)
    # Misspeculation! Flush load and later instructions

Modern CPUs:
- Use predictors to guess load/store independence
- Sophisticated LSQ searching
- Store-to-load forwarding common and fast
- Misspeculation penalty: flush and re-execute`,
  },
  {
    id: 'cs202-t7-ex15',
    subjectId: 'cs202',
    topicId: 'cs202-topic7',
    type: 'written',
    title: 'Limits of ILP',
    description: 'List five factors that limit achievable ILP in real programs. For each, explain why it\'s a fundamental limit.',
    difficulty: 3,
    hints: ['Dependencies, branches, memory, finite resources, power'],
    solution: `Fundamental Limits of ILP:

1. True Data Dependencies
   Why fundamental: Laws of physics/mathematics
   - Result must be computed before it's used
   - Cannot violate causality
   - Sets minimum serialization

   Example: a = b + c; d = a * 2;
   Must compute 'a' before 'd'

2. Control Dependencies (Branches)
   Why fundamental: Program semantics
   - Don't know which instructions needed until branch resolves
   - Speculation helps but has limits
   - Misprediction wastes all speculative work

   Typical impact: 15-20% of instructions are branches
   Even 95% accuracy = 1 mispredict per 20 branches

3. Memory Latency and Bandwidth
   Why fundamental: Physical distance, speed of light
   - Data must travel from memory
   - Cache misses impose long stalls
   - Memory bandwidth is finite

   Impact: Cache miss = 100s of potential instructions

4. Finite Hardware Resources
   Why fundamental: Cost, power, complexity
   - Limited issue width (decode, rename, issue)
   - Limited functional units
   - Limited instruction window (ROB)
   - Limited physical registers

   Practical limits: ~4-8 wide issue common

5. Power and Thermal Constraints
   Why fundamental: Physics of computation
   - More parallelism = more power
   - Chip can only dissipate so much heat
   - Diminishing returns on parallelism

   Modern CPUs: Can't use all transistors at once

Study data (Wall's 1991 limits):
Perfect predictor, infinite window, infinite resources:
- Average program ILP: ~50-100
Real processors achieve: ~2-4 IPC

Gap caused by practical limits on all above factors.`,
  },
  {
    id: 'cs202-t7-ex16',
    subjectId: 'cs202',
    topicId: 'cs202-topic7',
    type: 'written',
    title: 'SMT Basics',
    description: 'Explain Simultaneous Multithreading (SMT/Hyper-Threading). How does it improve resource utilization compared to superscalar alone?',
    difficulty: 3,
    hints: ['Multiple threads share functional units', 'Fill bubbles from one thread with another', 'Horizontal vs vertical waste'],
    solution: `Simultaneous Multithreading (SMT):

Concept:
Execute instructions from multiple threads simultaneously
on a single superscalar core.

Superscalar alone (single-threaded):
Cycle:    1    2    3    4    5    6
ALU 0:  [I1] [ - ] [I5] [ - ] [ - ] [I8]
ALU 1:  [I2] [ - ] [ - ] [I6] [ - ] [ - ]
FPU:    [I3] [I4] [ - ] [ - ] [I7] [ - ]
Load:   [ - ] [ - ] [I5] [ - ] [ - ] [ - ]

Bubbles (empty slots) due to:
- Dependencies in single thread
- Branch mispredictions
- Cache misses

SMT (two threads):
Cycle:    1    2    3    4    5    6
ALU 0:  [T1] [T2] [T1] [T2] [T1] [T2]
ALU 1:  [T1] [T2] [T2] [T1] [T2] [T1]
FPU:    [T2] [T1] [T2] [T1] [T2] [T1]
Load:   [T1] [T2] [T1] [T2] [T1] [T2]

Fill bubbles from one thread with instructions from another!

Resource sharing:
┌───────────────┬─────────────────────────────────┐
│ Duplicated    │ Shared                          │
├───────────────┼─────────────────────────────────┤
│ Arch state    │ Fetch/decode bandwidth          │
│ PC            │ Execution units (ALU, FPU)      │
│ Register file*│ Caches (L1, L2, L3)            │
│ Small buffers │ Branch predictors (partitioned) │
└───────────────┴─────────────────────────────────┘
* Some physical registers per thread, shared pool

Performance characteristics:
- Single thread: No improvement (may be slightly worse)
- Two threads: 10-30% total throughput increase
- Per-thread performance: May decrease 0-20%

Why not 2× speedup?
- Threads compete for resources
- Cache interference
- Some resources already well-utilized

SMT vs CMP (Chip Multiprocessor):
SMT: Share everything, fine-grain mixing
CMP: Duplicate cores, coarse-grain parallelism

Modern CPUs: Both! Multiple SMT cores
Example: 8 cores × 2 threads = 16 logical processors`,
  },
];
