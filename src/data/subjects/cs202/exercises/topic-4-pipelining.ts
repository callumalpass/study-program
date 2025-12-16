import type { WrittenExercise } from '../../../../core/types';

export const topic4Exercises: WrittenExercise[] = [
  {
    id: 'cs202-t4-ex1',
    subjectId: 'cs202',
    topicId: 'cs202-topic4',
    type: 'written',
    title: 'Pipeline Basics',
    description: 'A non-pipelined processor takes 800ps per instruction. If we split it into 5 equal stages, what is the ideal speedup? What factors reduce the actual speedup?',
    difficulty: 1,
    hints: ['Ideal speedup = number of stages', 'Consider pipeline register overhead and hazards'],
    solution: `Ideal speedup analysis:

Non-pipelined: 800ps per instruction
Pipelined: 5 stages of 800/5 = 160ps each

Ideal speedup = number of stages = 5×

Throughput improvement:
- Non-pipelined: 1 instruction per 800ps
- Pipelined: 1 instruction per 160ps (after pipeline fills)

Factors reducing actual speedup:

1. Pipeline register overhead
   - Each stage needs registers to hold intermediate values
   - Adds ~20ps per stage
   - New clock period: 160 + 20 = 180ps
   - Actual speedup: 800/180 = 4.44×

2. Pipeline hazards cause stalls:
   - Data hazards: instruction depends on previous result
   - Control hazards: branches change instruction flow
   - Structural hazards: resource conflicts (rare in MIPS)

3. Unbalanced stages
   - If stages aren't equal, clock = slowest stage
   - Fast stages waste time waiting

4. Pipeline fill/drain
   - First instruction takes 5 cycles
   - Last instructions drain without new work
   - Matters for short programs`,
  },
  {
    id: 'cs202-t4-ex2',
    subjectId: 'cs202',
    topicId: 'cs202-topic4',
    type: 'written',
    title: 'Identify Hazards',
    description: 'Identify all hazards in this sequence:\nadd $t0, $t1, $t2\nsub $t3, $t0, $t4\nand $t5, $t0, $t3\nlw $t6, 0($t3)',
    difficulty: 2,
    hints: ['Look for RAW (read-after-write) dependencies', 'Check which registers are read vs written'],
    solution: `Hazard analysis:

I1: add $t0, $t1, $t2    # Writes $t0
I2: sub $t3, $t0, $t4    # Reads $t0, writes $t3
I3: and $t5, $t0, $t3    # Reads $t0 and $t3
I4: lw  $t6, 0($t3)      # Reads $t3

Data hazards (RAW - Read After Write):

1. I1 → I2 on $t0 (distance 1)
   - add writes $t0, sub reads $t0
   - Most severe: add in EX when sub in ID

2. I1 → I3 on $t0 (distance 2)
   - add writes $t0, and reads $t0
   - Less severe due to distance

3. I2 → I3 on $t3 (distance 1)
   - sub writes $t3, and reads $t3
   - Severe hazard

4. I2 → I4 on $t3 (distance 2)
   - sub writes $t3, lw reads $t3 for address
   - Less severe

Pipeline diagram showing hazards:
Cycle:    1    2    3    4    5    6    7    8
I1 add:  IF   ID   EX   MEM  WB
I2 sub:       IF   ID   EX   MEM  WB
              ↑hazard on $t0
I3 and:            IF   ID   EX   MEM  WB
                   ↑hazard on $t0, $t3
I4 lw:                  IF   ID   EX   MEM  WB
                        ↑hazard on $t3

No structural hazards (separate I-mem and D-mem).
No control hazards (no branches).`,
  },
  {
    id: 'cs202-t4-ex3',
    subjectId: 'cs202',
    topicId: 'cs202-topic4',
    type: 'written',
    title: 'Forwarding Paths',
    description: 'Draw the pipeline diagram for the sequence in the previous exercise with forwarding. Show which forwarding paths are used.',
    difficulty: 3,
    hints: ['EX/MEM → EX forward', 'MEM/WB → EX forward', 'Forwarding eliminates most stalls'],
    solution: `Pipeline with forwarding:

Cycle:    1    2    3    4    5    6    7    8
I1 add:  IF   ID   EX   MEM  WB
I2 sub:       IF   ID   EX   MEM  WB
I3 and:            IF   ID   EX   MEM  WB
I4 lw:                  IF   ID   EX   MEM  WB

Forwarding paths used:

1. I1 → I2 (EX/MEM → EX forward)
   - Cycle 4: add finishes EX, result in EX/MEM register
   - Cycle 4: sub needs value in EX stage
   - Forward from EX/MEM to ALU input

2. I1 → I3 (MEM/WB → EX forward)
   - Cycle 5: add finishes MEM, result in MEM/WB register
   - Cycle 5: and needs value in EX stage
   - Forward from MEM/WB to ALU input

3. I2 → I3 (EX/MEM → EX forward)
   - Cycle 5: sub finishes EX, result in EX/MEM register
   - Cycle 5: and needs value in EX stage
   - Forward from EX/MEM to ALU input

4. I2 → I4 (MEM/WB → EX forward)
   - Cycle 6: sub finishes MEM, result in MEM/WB register
   - Cycle 6: lw needs value in EX stage (address calc)
   - Forward from MEM/WB to ALU input

No stalls needed! Forwarding handles all hazards.

Forwarding unit logic:
if (EX/MEM.RegWrite && EX/MEM.Rd == ID/EX.Rs)
    ForwardA = EX/MEM.ALUResult
else if (MEM/WB.RegWrite && MEM/WB.Rd == ID/EX.Rs)
    ForwardA = MEM/WB.Result
else
    ForwardA = ID/EX.ReadData1`,
  },
  {
    id: 'cs202-t4-ex4',
    subjectId: 'cs202',
    topicId: 'cs202-topic4',
    type: 'written',
    title: 'Load-Use Hazard',
    description: 'Why can\'t forwarding alone solve the load-use hazard? Show the pipeline diagram for:\nlw $t0, 0($t1)\nadd $t2, $t0, $t3',
    difficulty: 3,
    hints: ['When is load data available?', 'When does add need it?', 'Data travels back in time?'],
    solution: `Load-use hazard analysis:

lw  $t0, 0($t1)    # Load value into $t0
add $t2, $t0, $t3  # Use $t0 immediately

Pipeline without stall (impossible):
Cycle:    1    2    3    4    5
lw:      IF   ID   EX   MEM  WB
add:          IF   ID   EX   MEM  WB
                   ↑    ↑
              needs   data
              data   ready

The problem:
- add needs $t0 in cycle 3 (for EX stage)
- lw produces $t0 in cycle 4 (end of MEM stage)
- Data arrives one cycle AFTER it's needed!
- Forwarding cannot send data backwards in time

Solution: Pipeline stall (bubble)

Cycle:    1    2    3    4    5    6
lw:      IF   ID   EX   MEM  WB
add:          IF   ID   --   EX   MEM  WB
                   ↑stall

With stall:
- Cycle 3: ID repeated for add (or bubble inserted)
- Cycle 4: lw finishes MEM, data available
- Cycle 5: add EX uses forwarded data from MEM/WB

The stall costs 1 cycle but is unavoidable.

Hardware detection:
if (ID/EX.MemRead &&
    ID/EX.Rt == IF/ID.Rs || ID/EX.Rt == IF/ID.Rt)
    stall pipeline

This is why lw followed by dependent instruction costs extra cycle.`,
  },
  {
    id: 'cs202-t4-ex5',
    subjectId: 'cs202',
    topicId: 'cs202-topic4',
    type: 'written',
    title: 'Branch Prediction',
    description: 'Compare static "always not taken" prediction vs a 1-bit dynamic predictor for a loop that executes 10 times.',
    difficulty: 3,
    hints: ['Count mispredictions for each', 'When does 1-bit predictor change?'],
    solution: `Loop executing 10 times analysis:

Static "Always Not Taken":
Iteration 1-9: branch taken → misprediction (9 wrong)
Iteration 10: branch not taken → correct (1 right)
Accuracy: 1/10 = 10%
Mispredictions: 9

1-bit Dynamic Predictor:
(Starts with "not taken" prediction)

Iter | Actual | Predict | Result    | Next State
-----|--------|---------|-----------|------------
  1  | taken  | NT      | WRONG     | T
  2  | taken  | T       | correct   | T
  3  | taken  | T       | correct   | T
  4  | taken  | T       | correct   | T
  5  | taken  | T       | correct   | T
  6  | taken  | T       | correct   | T
  7  | taken  | T       | correct   | T
  8  | taken  | T       | correct   | T
  9  | taken  | T       | correct   | T
 10  | NT     | T       | WRONG     | NT

Accuracy: 8/10 = 80%
Mispredictions: 2 (first and last iterations)

1-bit predictor is much better for loops!

Problem with 1-bit: Nested loops cause issues
- Outer loop ending mispredicts
- Inner loop starting mispredicts
- 2 mispredictions per outer iteration

2-bit predictor solution:
- Takes 2 mispredictions to change prediction
- Better handles loop exit transitions`,
  },
  {
    id: 'cs202-t4-ex6',
    subjectId: 'cs202',
    topicId: 'cs202-topic4',
    type: 'written',
    title: '2-bit Saturating Counter',
    description: 'Draw the state machine for a 2-bit saturating counter branch predictor. Show all states and transitions for taken/not-taken outcomes.',
    difficulty: 2,
    hints: ['4 states: strongly/weakly taken/not-taken', 'Takes 2 wrong predictions to flip'],
    solution: `2-bit Saturating Counter Branch Predictor:

States:
00: Strongly Not Taken (predict NT)
01: Weakly Not Taken (predict NT)
10: Weakly Taken (predict T)
11: Strongly Taken (predict T)

State Machine:
                    NT                 NT
           ┌───────────────┐   ┌───────────────┐
           │               ▼   │               ▼
        ┌──┴──┐         ┌──┴──┐         ┌─────┐         ┌─────┐
        │ 00  │◄───NT───│ 01  │◄───NT───│ 10  │◄───NT───│ 11  │
        │ SNT │         │ WNT │         │ WT  │         │ ST  │
        │     │───T────►│     │───T────►│     │───T────►│     │
        └─────┘         └─────┘         └─────┘         └──┬──┘
           │               ▲               ▲               │
           └───────────────┘               └───────────────┘
                    T                              T

Prediction based on MSB:
- States 00, 01 → Predict Not Taken
- States 10, 11 → Predict Taken

Advantages over 1-bit:
1. Loop example (10 iterations):
   - Start at SNT (00)
   - Iter 1: T, wrong → WNT (01)
   - Iter 2: T, wrong → WT (10), now predicting T
   - Iter 3-9: T, correct → stays WT or ST
   - Iter 10: NT, wrong → WNT
   - Only 3 mispredictions vs 2 for 1-bit

2. Better for loop in loop:
   - Inner loop exit: wrong → weakly change
   - Next inner loop start: still predicts taken
   - Avoids double misprediction`,
  },
  {
    id: 'cs202-t4-ex7',
    subjectId: 'cs202',
    topicId: 'cs202-topic4',
    type: 'written',
    title: 'Control Hazard Penalty',
    description: 'Calculate the CPI for a processor where 20% of instructions are branches, branch prediction accuracy is 85%, and misprediction penalty is 3 cycles.',
    difficulty: 2,
    hints: ['Base CPI = 1 with no hazards', 'Add penalty cycles for mispredictions'],
    solution: `Control hazard CPI calculation:

Given:
- Base CPI = 1 (ideal pipelined)
- Branch frequency = 20%
- Prediction accuracy = 85%
- Misprediction penalty = 3 cycles

Misprediction rate = 1 - 0.85 = 0.15 (15%)

Stall cycles due to branches:
= branch_frequency × misprediction_rate × penalty
= 0.20 × 0.15 × 3
= 0.09 cycles per instruction

Actual CPI = Base CPI + Branch stalls
= 1 + 0.09
= 1.09

Performance impact:
- Ideal: 1.0 CPI
- Actual: 1.09 CPI
- Slowdown: 9%

Sensitivity analysis:
If prediction improves to 95%:
Stalls = 0.20 × 0.05 × 3 = 0.03
CPI = 1.03 (only 3% slowdown)

If penalty increases to 5 cycles:
Stalls = 0.20 × 0.15 × 5 = 0.15
CPI = 1.15 (15% slowdown)

This shows importance of:
1. Better branch prediction
2. Lower misprediction penalty (resolve branches earlier)`,
  },
  {
    id: 'cs202-t4-ex8',
    subjectId: 'cs202',
    topicId: 'cs202-topic4',
    type: 'written',
    title: 'Pipeline Diagram with Hazards',
    description: 'Draw the complete pipeline diagram showing stalls for:\nlw $t0, 0($s0)\nadd $t1, $t0, $t2\nsub $t3, $t1, $t4\nAssume forwarding is available.',
    difficulty: 3,
    hints: ['Load-use requires one stall', 'add-sub can be forwarded', 'Show bubble in diagram'],
    solution: `Pipeline diagram with hazards:

Instructions:
I1: lw  $t0, 0($s0)    # loads into $t0
I2: add $t1, $t0, $t2  # uses $t0 (load-use hazard)
I3: sub $t3, $t1, $t4  # uses $t1

Cycle:    1    2    3    4    5    6    7    8
I1 lw:   IF   ID   EX   MEM  WB
I2 add:       IF   ID   **   EX   MEM  WB
                   stall
I3 sub:            IF   **   ID   EX   MEM  WB
                        stall

** = stall/bubble

Detailed analysis:

Cycle 1: I1 in IF
Cycle 2: I1 in ID, I2 in IF
Cycle 3: I1 in EX, I2 in ID
         - Hazard detected: I1 is lw, I2 reads $t0
         - Must stall I2 (and I3)
Cycle 4: I1 in MEM, I2 stalled (ID repeated), I3 stalled
         - Bubble inserted in EX stage
Cycle 5: I1 in WB, I2 in EX (forward from MEM/WB), I3 in ID
Cycle 6: I2 in MEM, I3 in EX (forward from EX/MEM)
Cycle 7: I2 in WB, I3 in MEM
Cycle 8: I3 in WB

Forwarding paths:
- Cycle 5: MEM/WB.Data → I2 EX (load result)
- Cycle 6: EX/MEM.ALUOut → I3 EX (add result)

Total cycles: 8 (instead of 7 without hazard)
Stall cycles: 1`,
  },
  {
    id: 'cs202-t4-ex9',
    subjectId: 'cs202',
    topicId: 'cs202-topic4',
    type: 'written',
    title: 'Exception Handling',
    description: 'Explain how a pipelined processor handles an arithmetic overflow exception in the EX stage. What happens to instructions in earlier and later stages?',
    difficulty: 4,
    hints: ['Precise exceptions', 'Instructions before must complete', 'Instructions after must be cancelled'],
    solution: `Exception handling in pipelined processor:

Scenario: Overflow occurs during add in EX stage

Pipeline state at exception:
Cycle N:
IF:  I4 (being fetched)
ID:  I3 (being decoded)
EX:  I2 add - OVERFLOW!
MEM: I1 (in memory stage)
WB:  I0 (completing)

Requirements for precise exception:
1. All instructions before I2 must complete (I0, I1)
2. I2 and all instructions after must be cancelled (I2, I3, I4)
3. Exception handler must see state as if I2 never started

Steps:

1. Detect exception in EX stage
   - Overflow flag set by ALU
   - EX/MEM pipeline register marks exception

2. Let earlier instructions complete
   - I0 finishes WB normally
   - I1 finishes MEM, then WB

3. Flush later stages
   - Convert I2, I3, I4 to NOPs (bubbles)
   - Prevent any state changes

4. Save exception state
   - EPC = address of I2 (excepting instruction)
   - Cause register = overflow
   - Save any needed state

5. Jump to handler
   - PC = exception handler address
   - Begin fetching handler code

Pipeline after handling:
Cycle N+1: Flush I4, I3, I2
Cycle N+2: I1 in WB, handler IF
Cycle N+3: Handler executing

Challenges:
- Multiple exceptions in different stages
- Handling exceptions in order (oldest first)
- Speculative instructions (branch misprediction)`,
  },
  {
    id: 'cs202-t4-ex10',
    subjectId: 'cs202',
    topicId: 'cs202-topic4',
    type: 'written',
    title: 'Delayed Branch',
    description: 'Explain the MIPS delayed branch mechanism. Why does MIPS have a "branch delay slot"? Fill the delay slot for: beq $t0, $t1, target followed by add $s0, $s1, $s2',
    difficulty: 3,
    hints: ['Instruction after branch always executes', 'Can often be filled with useful work', 'Compiler responsibility'],
    solution: `MIPS Delayed Branch:

In MIPS, the instruction immediately after a branch ALWAYS executes,
regardless of whether the branch is taken. This is the "delay slot."

Why delayed branch exists:
- Original MIPS had no branch prediction
- Branch target not known until ID/EX
- 1 cycle penalty inevitable
- Rather than waste the cycle, execute useful instruction

Example:
    beq $t0, $t1, target
    add $s0, $s1, $s2    # Branch delay slot - ALWAYS executes
    ...
target:
    ...

Filling strategies:

1. Move instruction from BEFORE branch (best):
Before:
    add $s0, $s1, $s2
    beq $t0, $t1, target

After (optimized):
    beq $t0, $t1, target
    add $s0, $s1, $s2    # From before branch, no dependency

2. Move from branch target (if taken likely):
    beq $t0, $t1, target
    first_target_inst    # Duplicated from target

3. Move from fall-through (if not-taken likely):
    beq $t0, $t1, target
    fall_through_inst    # Only safe if branch usually not taken

4. NOP if nothing safe:
    beq $t0, $t1, target
    nop                  # Wasted slot

For the given code:
    beq $t0, $t1, target
    add $s0, $s1, $s2

If add is independent of branch (doesn't use $t0, $t1 or affect branch):
- Keep as is - add always executes
- Works correctly whether branch taken or not

Modern processors use branch prediction instead.`,
  },
  {
    id: 'cs202-t4-ex11',
    subjectId: 'cs202',
    topicId: 'cs202-topic4',
    type: 'written',
    title: 'Structural Hazards',
    description: 'A processor has a single memory port for both instructions and data. Show how this causes structural hazards. What is the solution in MIPS?',
    difficulty: 2,
    hints: ['IF and MEM both need memory', 'When do they conflict?', 'Harvard architecture'],
    solution: `Structural hazard with single memory port:

Single-port memory (von Neumann):
- Both IF and MEM need memory access
- Only one access per cycle possible

Conflict scenario:
Cycle:    1    2    3    4    5    6
I1:      IF   ID   EX   MEM  WB
I2:           IF   ID   EX   MEM  WB
I3:                IF   ID   EX   MEM
I4:                     IF   ID   EX
                        ↑    ↑
                      Conflict!

At cycle 4:
- I1 needs memory for data (MEM stage) - e.g., lw
- I4 needs memory for instruction (IF stage)
- Both cannot be served!

Solutions:

1. Stall one stage (poor performance):
Cycle:    1    2    3    4    5    6    7
I1 lw:   IF   ID   EX   MEM  WB
I2:           IF   ID   EX   MEM  WB
I3:                IF   ID   EX   MEM  WB
I4:                     IF   **   ID   EX
                        stall

2. MIPS solution - Harvard Architecture:
- Separate instruction memory and data memory
- IF uses I-cache, MEM uses D-cache
- No structural hazard possible

In cache-based systems:
- L1 split into I-cache and D-cache
- Both can be accessed simultaneously
- Unified L2/L3 can still have conflicts (handled by cache controller)

Register file structural hazard:
- Potential conflict: ID reads, WB writes
- Solution: Write in first half of cycle, read in second half
- Or: Multiple read/write ports`,
  },
  {
    id: 'cs202-t4-ex12',
    subjectId: 'cs202',
    topicId: 'cs202-topic4',
    type: 'written',
    title: 'WAW and WAR Hazards',
    description: 'Define WAW (Write After Write) and WAR (Write After Read) hazards. Do they occur in a standard 5-stage MIPS pipeline? Why or why not?',
    difficulty: 3,
    hints: ['Consider in-order vs out-of-order execution', 'All writes happen in WB stage', 'Consider instruction ordering'],
    solution: `WAW and WAR Hazard Analysis:

WAW (Write After Write):
- Later instruction writes before earlier instruction
- Example: I1 writes R1, I3 writes R1
- If I3 writes first, I1 overwrites with stale value

WAR (Write After Read):
- Later instruction writes before earlier instruction reads
- Example: I1 reads R1, I3 writes R1
- If I3 writes first, I1 reads new (wrong) value

In standard 5-stage MIPS pipeline:

WAW hazards - NO
- All writes happen in WB stage (stage 5)
- Instructions proceed in order
- Earlier instruction always reaches WB first
- Correct final value guaranteed

Example:
I1: add $t0, $t1, $t2    # writes $t0 in cycle 5
I2: ...
I3: sub $t0, $t3, $t4    # writes $t0 in cycle 7
Result: $t0 = sub result (correct - latest write wins)

WAR hazards - NO
- All reads happen in ID stage (stage 2)
- All writes happen in WB stage (stage 5)
- Reads always happen before writes in pipeline order
- No way for later write to overtake earlier read

Example:
I1: add $t0, $s0, $s1    # reads $s0 in cycle 2
I2: sub $s0, $t1, $t2    # writes $s0 in cycle 6
I1 reads $s0 long before I2 writes it - no hazard

When do WAW/WAR occur?
- Out-of-order execution
- Variable-latency operations (FP divide)
- Multi-cycle operations completing out of order
- Solved with register renaming in superscalar processors`,
  },
  {
    id: 'cs202-t4-ex13',
    subjectId: 'cs202',
    topicId: 'cs202-topic4',
    type: 'written',
    title: 'Deep Pipeline Trade-offs',
    description: 'A processor has the option of a 5-stage or 10-stage pipeline. Compare the trade-offs including clock speed, CPI, and hazard impacts.',
    difficulty: 4,
    hints: ['More stages = higher clock frequency', 'More stages = more hazard penalties', 'Consider branch misprediction cost'],
    solution: `Deep Pipeline Analysis: 5-stage vs 10-stage

Clock Speed:
- 5-stage: Stage delay = total/5, clock = 1/(stage + overhead)
- 10-stage: Stage delay = total/10, clock = 1/(stage + overhead)
- 10-stage has ~2× higher frequency (ideally)
- But overhead (pipeline registers) is larger fraction of shorter stages

Example: 1000ps total logic, 50ps register overhead
- 5-stage: 200ps + 50ps = 250ps clock → 4 GHz
- 10-stage: 100ps + 50ps = 150ps clock → 6.67 GHz
- Actual speedup: 1.67× (not 2×)

Hazard Impacts:

Data hazards:
- 5-stage: Load-use = 1 stall cycle
- 10-stage: More stages between load and use
- May need 2-3 stall cycles for load-use

Branch misprediction:
- 5-stage: ~2-3 cycle penalty (IF, ID, EX flushed)
- 10-stage: ~5-6 cycle penalty (more stages to flush)
- Misprediction much more expensive!

CPI Analysis:
Assume: 20% branches, 15% misprediction, 25% loads, 50% load-use

5-stage:
Branch penalty: 0.20 × 0.15 × 3 = 0.09
Load-use stalls: 0.25 × 0.50 × 1 = 0.125
CPI = 1 + 0.09 + 0.125 = 1.215

10-stage:
Branch penalty: 0.20 × 0.15 × 6 = 0.18
Load-use stalls: 0.25 × 0.50 × 2 = 0.25
CPI = 1 + 0.18 + 0.25 = 1.43

Performance comparison:
5-stage: 4 GHz / 1.215 = 3.29 billion inst/sec
10-stage: 6.67 GHz / 1.43 = 4.66 billion inst/sec

10-stage is faster despite higher CPI due to clock speed.
But needs better branch prediction to be worthwhile.`,
  },
  {
    id: 'cs202-t4-ex14',
    subjectId: 'cs202',
    topicId: 'cs202-topic4',
    type: 'written',
    title: 'Code Scheduling',
    description: 'Reorder these instructions to minimize stalls (assume forwarding):\nlw $t0, 0($s0)\nlw $t1, 4($s0)\nadd $t2, $t0, $t1\nsw $t2, 8($s0)',
    difficulty: 3,
    hints: ['Load-use hazards cause stalls', 'Put independent instructions between load and use', 'Both loads can happen early'],
    solution: `Code scheduling to minimize stalls:

Original code:
    lw  $t0, 0($s0)     # I1
    lw  $t1, 4($s0)     # I2
    add $t2, $t0, $t1   # I3: uses $t0 (load-use!), uses $t1 (load-use!)
    sw  $t2, 8($s0)     # I4: uses $t2

Original pipeline (with stalls):
Cycle:  1   2   3   4   5   6   7   8   9   10
I1 lw: IF  ID  EX  MEM WB
I2 lw:     IF  ID  EX  MEM WB
I3 add:        IF  ID  **  EX  MEM WB
                   stall (wait for $t1)
I4 sw:             IF  **  ID  EX  MEM WB

Stalls: 2 cycles (one for each load-use)
Total: 10 cycles

Scheduled code (no reordering possible to eliminate both):
The problem: add needs BOTH $t0 and $t1
- $t0 available after I1 MEM (cycle 4)
- $t1 available after I2 MEM (cycle 5)
- add in EX needs both in cycle 5 at earliest

Better schedule:
    lw  $t0, 0($s0)     # I1
    lw  $t1, 4($s0)     # I2
    nop                  # or move unrelated instruction here
    add $t2, $t0, $t1   # I3: now both values available via forwarding
    sw  $t2, 8($s0)     # I4

Cycle:  1   2   3   4   5   6   7   8   9
I1 lw: IF  ID  EX  MEM WB
I2 lw:     IF  ID  EX  MEM WB
nop:           IF  ID  EX  MEM WB
I3 add:            IF  ID  EX  MEM WB
I4 sw:                 IF  ID  EX  MEM

With proper scheduling: 9 cycles (1 stall or nop)
Saved 1 cycle!

The key insight:
- Start both loads early
- Give time for both to reach MEM before add needs them`,
  },
  {
    id: 'cs202-t4-ex15',
    subjectId: 'cs202',
    topicId: 'cs202-topic4',
    type: 'written',
    title: 'Forwarding Unit Design',
    description: 'Write the logic equations for the forwarding unit that detects when to forward from EX/MEM or MEM/WB to the ALU inputs.',
    difficulty: 4,
    hints: ['Check destination register matches source', 'EX/MEM has priority over MEM/WB', 'Must check RegWrite is enabled'],
    solution: `Forwarding Unit Logic Design:

Inputs:
- EX/MEM.RegisterRd: destination of instruction in MEM
- MEM/WB.RegisterRd: destination of instruction in WB
- ID/EX.RegisterRs: first source of instruction in EX
- ID/EX.RegisterRt: second source of instruction in EX
- EX/MEM.RegWrite: is MEM instruction writing?
- MEM/WB.RegWrite: is WB instruction writing?

Outputs:
- ForwardA[1:0]: mux select for first ALU operand
- ForwardB[1:0]: mux select for second ALU operand

ForwardA/B encoding:
00 = use register file output (no forwarding)
01 = forward from MEM/WB
10 = forward from EX/MEM

Logic for ForwardA (first ALU input):

// EX hazard (forward from EX/MEM)
EX_hazard_A = EX/MEM.RegWrite
           && (EX/MEM.RegisterRd != 0)
           && (EX/MEM.RegisterRd == ID/EX.RegisterRs)

// MEM hazard (forward from MEM/WB)
MEM_hazard_A = MEM/WB.RegWrite
            && (MEM/WB.RegisterRd != 0)
            && (MEM/WB.RegisterRd == ID/EX.RegisterRs)
            && NOT(EX_hazard_A)  // EX hazard has priority

ForwardA = EX_hazard_A ? 10 :
           MEM_hazard_A ? 01 :
           00

Logic for ForwardB (second ALU input):

// Same logic but with RegisterRt
EX_hazard_B = EX/MEM.RegWrite
           && (EX/MEM.RegisterRd != 0)
           && (EX/MEM.RegisterRd == ID/EX.RegisterRt)

MEM_hazard_B = MEM/WB.RegWrite
            && (MEM/WB.RegisterRd != 0)
            && (MEM/WB.RegisterRd == ID/EX.RegisterRt)
            && NOT(EX_hazard_B)

ForwardB = EX_hazard_B ? 10 :
           MEM_hazard_B ? 01 :
           00

Key points:
- Check Rd != 0 because $zero is hardwired
- EX/MEM has priority (more recent value)
- Must check RegWrite (not all instructions write)`,
  },
  {
    id: 'cs202-t4-ex16',
    subjectId: 'cs202',
    topicId: 'cs202-topic4',
    type: 'written',
    title: 'Pipeline Performance Equation',
    description: 'Derive the speedup formula for pipelining. Calculate the speedup for a 5-stage pipeline with 20% stall cycles due to hazards.',
    difficulty: 3,
    hints: ['Throughput vs latency', 'Consider steady state', 'CPI with stalls'],
    solution: `Pipeline Speedup Derivation:

Non-pipelined execution time for N instructions:
T_unpipelined = N × (k × t)
where k = number of stages, t = stage time

Pipelined execution time:
- First instruction: k cycles (fills pipeline)
- Remaining N-1 instructions: 1 cycle each (ideally)
- Plus stall cycles

T_pipelined_ideal = (k + N - 1) × t

For large N:
T_pipelined_ideal ≈ N × t

Ideal Speedup = T_unpipelined / T_pipelined
             = (N × k × t) / (N × t)
             = k

With stalls (CPI > 1):
T_pipelined = N × CPI × t

Actual Speedup = (N × k × t) / (N × CPI × t)
               = k / CPI

Given: 5-stage pipeline, 20% stall cycles
CPI = 1 + 0.20 = 1.20

Speedup = 5 / 1.20 = 4.17×

Comparison:
- Ideal: 5× speedup
- Actual: 4.17× speedup
- Lost: 0.83× due to hazards

Breaking down the loss:
- Stall cycles waste potential throughput
- 20% of cycles are bubbles
- Effective utilization: 1/1.20 = 83.3%

General formula:
Speedup = Pipeline_depth / (1 + Stall_rate)

Or: Speedup = Pipeline_depth × Pipeline_efficiency
where efficiency = 1 / CPI`,
  },
];
