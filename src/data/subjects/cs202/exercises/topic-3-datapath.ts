import type { WrittenExercise } from '../../../../core/types';

export const topic3Exercises: WrittenExercise[] = [
  {
    id: 'cs202-t3-ex1',
    subjectId: 'cs202',
    topicId: 'cs202-topic3',
    type: 'written',
    title: 'Datapath Components',
    description: 'List the five major components of a basic MIPS datapath and explain the function of each.',
    difficulty: 1,
    hints: ['Think about what happens in each stage of execution', 'Consider both instruction and data memory'],
    solution: `Five major components of MIPS datapath:

1. Program Counter (PC)
   - 32-bit register holding address of current instruction
   - Incremented by 4 each cycle (or set by branch/jump)
   - Input: next PC value, Output: current instruction address

2. Instruction Memory
   - Read-only memory containing program instructions
   - Input: PC address, Output: 32-bit instruction
   - Addressed by PC

3. Register File
   - 32 general-purpose 32-bit registers
   - 2 read ports (rs, rt) and 1 write port (rd)
   - Read is combinational, write on clock edge

4. ALU (Arithmetic Logic Unit)
   - Performs arithmetic/logical operations
   - Inputs: two 32-bit operands, ALU control
   - Outputs: 32-bit result, zero flag

5. Data Memory
   - RAM for load/store operations
   - Inputs: address, write data, control signals
   - Output: read data (for loads)`,
  },
  {
    id: 'cs202-t3-ex2',
    subjectId: 'cs202',
    topicId: 'cs202-topic3',
    type: 'written',
    title: 'Single-Cycle Add Execution',
    description: 'Trace the execution of "add $t0, $s1, $s2" through a single-cycle datapath. List which components are active and what data flows through each.',
    difficulty: 2,
    hints: ['R-type instruction', 'Follow the instruction through IF, decode, execute, writeback'],
    solution: `Trace of "add $t0, $s1, $s2" (R-type):

1. Instruction Fetch:
   - PC provides address to Instruction Memory
   - Instruction = 0x02328020 fetched
   - PC + 4 calculated for next instruction

2. Instruction Decode:
   - opcode = 000000 → R-type, control signals set
   - rs = 10001 (17) = $s1 → Read Register 1
   - rt = 10010 (18) = $s2 → Read Register 2
   - rd = 01000 (8) = $t0 → Write Register
   - funct = 100000 → ALU operation = ADD

3. Execute:
   - Read Data 1 ($s1 value) → ALU input A
   - Read Data 2 ($s2 value) → ALU input B
   - ALU performs addition
   - Result = $s1 + $s2

4. Write Back:
   - ALU result → Write Data input of Register File
   - RegWrite = 1 (enabled)
   - Result written to $t0 on clock edge

Data Memory NOT used (no load/store)
Control signals: RegDst=1, ALUSrc=0, MemtoReg=0, RegWrite=1, MemRead=0, MemWrite=0, Branch=0`,
  },
  {
    id: 'cs202-t3-ex3',
    subjectId: 'cs202',
    topicId: 'cs202-topic3',
    type: 'written',
    title: 'Load Word Datapath',
    description: 'Show how "lw $t0, 8($s1)" uses the datapath. Draw the active paths and list all control signals.',
    difficulty: 3,
    hints: ['I-type instruction', 'ALU calculates address', 'Data comes from memory, not ALU'],
    solution: `Execution of "lw $t0, 8($s1)":

Active Datapath:
PC → Instr Mem → Decode → Reg File → ALU → Data Mem → Reg File
                  ↓           ↓        ↓
               Control      $s1    address(8)

Step-by-step:
1. Fetch: PC → Instruction Memory → instruction

2. Decode:
   - opcode = 100011 (lw)
   - rs = $s1 (base register)
   - rt = $t0 (destination)
   - immediate = 8 (offset)

3. Execute:
   - $s1 value → ALU input A
   - Sign-extended immediate (8) → ALU input B (via ALUSrc mux)
   - ALU computes: address = $s1 + 8

4. Memory:
   - ALU result → Data Memory address
   - MemRead = 1 → Data read from memory

5. Write Back:
   - Memory data → Register File (via MemtoReg mux)
   - Written to $t0

Control Signals:
- RegDst = 0 (rt is destination, not rd)
- ALUSrc = 1 (immediate, not register)
- MemtoReg = 1 (data from memory, not ALU)
- RegWrite = 1 (write to register)
- MemRead = 1 (read from memory)
- MemWrite = 0
- Branch = 0`,
  },
  {
    id: 'cs202-t3-ex4',
    subjectId: 'cs202',
    topicId: 'cs202-topic3',
    type: 'written',
    title: 'Branch Datapath',
    description: 'Explain how "beq $t0, $t1, label" determines whether to branch. What components are involved and what calculations are performed?',
    difficulty: 3,
    hints: ['ALU compares registers', 'Branch target calculated in parallel', 'Zero flag controls branch'],
    solution: `Branch execution for "beq $t0, $t1, label":

Components involved:
1. Register File - reads $t0 and $t1
2. ALU - compares values
3. Adder - calculates branch target
4. AND gate - combines Branch signal and Zero flag
5. MUX - selects next PC

Calculations:
1. ALU performs: $t0 - $t1
   - If equal: result = 0, Zero flag = 1
   - If not equal: result ≠ 0, Zero flag = 0

2. Branch target (calculated in parallel):
   Target = (PC + 4) + (sign-extended offset × 4)

3. Next PC selection:
   PCSrc = Branch AND Zero
   - If beq and equal: PCSrc = 1 → next PC = branch target
   - Otherwise: PCSrc = 0 → next PC = PC + 4

Control Signals:
- RegDst = X (don't care, no register write)
- ALUSrc = 0 (compare two registers)
- MemtoReg = X
- RegWrite = 0 (no write)
- MemRead = 0
- MemWrite = 0
- Branch = 1 (this is a branch instruction)
- ALUOp = 01 (subtract for comparison)`,
  },
  {
    id: 'cs202-t3-ex5',
    subjectId: 'cs202',
    topicId: 'cs202-topic3',
    type: 'written',
    title: 'Control Signal Table',
    description: 'Create a truth table showing control signals for: R-type, lw, sw, beq. Include RegDst, ALUSrc, MemtoReg, RegWrite, MemRead, MemWrite, Branch.',
    difficulty: 2,
    hints: ['Consider what each instruction needs', 'X means "don\'t care"'],
    solution: `Control Signal Truth Table:

Instruction | RegDst | ALUSrc | MemtoReg | RegWrite | MemRead | MemWrite | Branch
------------|--------|--------|----------|----------|---------|----------|-------
R-type      |   1    |   0    |    0     |    1     |    0    |    0     |   0
lw          |   0    |   1    |    1     |    1     |    1    |    0     |   0
sw          |   X    |   1    |    X     |    0     |    0    |    1     |   0
beq         |   X    |   0    |    X     |    0     |    0    |    0     |   1

Explanation:
- RegDst: 1 selects rd (R-type), 0 selects rt (lw)
- ALUSrc: 1 uses immediate (lw, sw), 0 uses register (R-type, beq)
- MemtoReg: 1 writes memory data (lw), 0 writes ALU result (R-type)
- RegWrite: 1 for instructions that write registers (R-type, lw)
- MemRead: 1 only for load instructions
- MemWrite: 1 only for store instructions
- Branch: 1 only for branch instructions

X = don't care (signal has no effect on this instruction)`,
  },
  {
    id: 'cs202-t3-ex6',
    subjectId: 'cs202',
    topicId: 'cs202-topic3',
    type: 'written',
    title: 'ALU Control',
    description: 'Given ALUOp = 10 (R-type) and funct = 100010 (sub), determine the ALU control signal. Explain the two-level decoding process.',
    difficulty: 3,
    hints: ['First level: main control sets ALUOp', 'Second level: ALU control decodes funct'],
    solution: `Two-level ALU control decoding:

Level 1: Main Control → ALUOp
- 00: lw/sw (add for address calculation)
- 01: beq (subtract for comparison)
- 10: R-type (look at funct field)

Level 2: ALU Control Unit
Input: ALUOp and funct field
Output: 4-bit ALU control signal

For ALUOp = 10, funct = 100010 (sub):
┌─────────┬────────┬─────────────┐
│ ALUOp   │ funct  │ ALU Control │
├─────────┼────────┼─────────────┤
│   00    │ XXXXXX │    0010     │ (add)
│   01    │ XXXXXX │    0110     │ (sub)
│   10    │ 100000 │    0010     │ (add)
│   10    │ 100010 │    0110     │ (sub) ← This case
│   10    │ 100100 │    0000     │ (and)
│   10    │ 100101 │    0001     │ (or)
│   10    │ 101010 │    0111     │ (slt)
└─────────┴────────┴─────────────┘

Result: ALU Control = 0110 (subtract)

ALU Control signals:
0000 = AND
0001 = OR
0010 = add
0110 = subtract
0111 = set-on-less-than`,
  },
  {
    id: 'cs202-t3-ex7',
    subjectId: 'cs202',
    topicId: 'cs202-topic3',
    type: 'written',
    title: 'Single-Cycle Timing',
    description: 'Given these delays: Instruction Memory 200ps, Register Read 100ps, ALU 200ps, Data Memory 200ps, Register Write 100ps. What is the minimum clock period for single-cycle?',
    difficulty: 2,
    hints: ['Find the longest path (critical path)', 'lw uses all components', 'Add up delays on critical path'],
    solution: `Timing analysis for single-cycle datapath:

Component delays:
- Instruction Memory: 200ps
- Register Read: 100ps
- ALU: 200ps
- Data Memory: 200ps
- Register Write: 100ps

Path analysis by instruction type:

R-type path:
IM + RegRead + ALU + RegWrite
= 200 + 100 + 200 + 100 = 600ps

Load (lw) path - CRITICAL:
IM + RegRead + ALU + DM + RegWrite
= 200 + 100 + 200 + 200 + 100 = 800ps

Store (sw) path:
IM + RegRead + ALU + DM
= 200 + 100 + 200 + 200 = 700ps

Branch (beq) path:
IM + RegRead + ALU
= 200 + 100 + 200 = 500ps
(plus mux and adder for target, typically parallel)

Critical path = lw = 800ps

Minimum clock period = 800ps
Maximum frequency = 1/800ps = 1.25 GHz

Problem: Clock period must accommodate slowest instruction,
even though most instructions are faster.`,
  },
  {
    id: 'cs202-t3-ex8',
    subjectId: 'cs202',
    topicId: 'cs202-topic3',
    type: 'written',
    title: 'Multi-Cycle Advantages',
    description: 'Explain three advantages of multi-cycle datapath over single-cycle. Why doesn\'t every instruction take 5 cycles?',
    difficulty: 2,
    hints: ['Consider clock period', 'Consider resource sharing', 'Consider instruction mix'],
    solution: `Advantages of multi-cycle datapath:

1. Shorter Clock Period
   - Single-cycle: clock = longest instruction (lw = 800ps)
   - Multi-cycle: clock = longest stage (200ps)
   - 4× faster clock (though more cycles per instruction)

2. Resource Sharing
   - Single memory unit (not separate I-mem and D-mem)
   - Single ALU (not separate adders for PC and branch)
   - Reduces hardware cost and complexity

3. Variable Instruction Timing
   - R-type: 4 cycles (no memory access)
   - lw: 5 cycles
   - sw: 4 cycles (no writeback)
   - beq: 3 cycles (no memory, no writeback)
   - Jump: 3 cycles

Why not all 5 cycles?
Different instructions need different stages:
- beq doesn't need MEM or WB stages
- sw doesn't need WB stage
- R-type doesn't need MEM stage

Average CPI example (assuming instruction mix):
25% lw (5) + 10% sw (4) + 45% R-type (4) + 15% beq (3) + 5% j (3)
= 1.25 + 0.4 + 1.8 + 0.45 + 0.15 = 4.05 cycles average

Effective speedup depends on instruction mix and cycle time ratio.`,
  },
  {
    id: 'cs202-t3-ex9',
    subjectId: 'cs202',
    topicId: 'cs202-topic3',
    type: 'written',
    title: 'Multi-Cycle States',
    description: 'List the five states of multi-cycle datapath execution and what happens in each state for a load word instruction.',
    difficulty: 3,
    hints: ['IF, ID, EX, MEM, WB', 'Each state takes one clock cycle', 'Intermediate values stored in registers'],
    solution: `Multi-cycle states for lw $t0, offset($s1):

State 0: Instruction Fetch (IF)
- IR = Memory[PC]  (fetch instruction)
- PC = PC + 4      (increment PC)
- 1 cycle

State 1: Instruction Decode (ID)
- A = Reg[rs]      (read $s1 into A register)
- B = Reg[rt]      (read $t0 into B register - not used for lw)
- ALUOut = PC + (sign-extend(offset) << 2)  (compute branch target)
- 1 cycle

State 2: Execution (EX)
- ALUOut = A + sign-extend(offset)  (compute memory address)
- 1 cycle

State 3: Memory Access (MEM)
- MDR = Memory[ALUOut]  (read data from computed address)
- 1 cycle

State 4: Write Back (WB)
- Reg[rt] = MDR    (write loaded data to $t0)
- 1 cycle

Total: 5 cycles for lw

Key registers added for multi-cycle:
- IR: Instruction Register (holds current instruction)
- MDR: Memory Data Register (holds data from memory)
- A, B: Hold register values between cycles
- ALUOut: Holds ALU result between cycles`,
  },
  {
    id: 'cs202-t3-ex10',
    subjectId: 'cs202',
    topicId: 'cs202-topic3',
    type: 'written',
    title: 'ALU Design',
    description: 'Design a 1-bit ALU slice that supports AND, OR, ADD, and SUB. Show how to cascade these for a 32-bit ALU.',
    difficulty: 4,
    hints: ['Use a mux to select operation', 'Full adder for arithmetic', 'Binvert input for subtraction'],
    solution: `1-bit ALU slice design:

Inputs: a, b, Binvert, CarryIn, Operation[1:0]
Outputs: Result, CarryOut

         ┌───────────────────────────────────┐
    b ──►│ 0──┐                              │
         │    │ Binvert                       │
   ~b ──►│ 1──┘──┬──────────────────┐        │
         │       │                   │        │
         │       ▼                   ▼        │
         │    ┌─────┐            ┌─────┐     │
    a ──►│───►│ AND │           │Full │     │
    b'──►│───►│     │           │Adder│     │
         │    └──┬──┘           └──┬──┘     │
         │       │    ┌─────┐     │  │       │
    a ──►│───────┼───►│ OR  │     │  │       │
    b'──►│───────┼───►│     │     │  │       │
         │       │    └──┬──┘     │  │       │
         │       │       │        │  │       │
         │       ▼       ▼        ▼  │       │
         │    ┌──────────────────────┴──┐    │
         │    │         4:1 MUX         │    │
         │    │  00  01  10  11         │───►│Result
         │    └─────────────────────────┘    │
         │                           CarryOut│───►
         └───────────────────────────────────┘

Operations (via Operation[1:0]):
00: AND (a AND b')
01: OR (a OR b')
10: ADD (a + b' + CarryIn)
11: (reserved for SLT)

32-bit ALU:
- Chain 32 slices, connecting CarryOut to next CarryIn
- LSB: CarryIn = Binvert (0 for add, 1 for subtract)
- Binvert: 0 for normal b, 1 for ~b (used in subtraction)
- Subtract: Binvert=1, CarryIn=1 (a + ~b + 1 = a - b)`,
  },
  {
    id: 'cs202-t3-ex11',
    subjectId: 'cs202',
    topicId: 'cs202-topic3',
    type: 'written',
    title: 'Register File Design',
    description: 'Design a register file with 32 registers, 2 read ports, and 1 write port. Show how to implement the read and write operations.',
    difficulty: 4,
    hints: ['Read is combinational (mux)', 'Write is clocked (decoder + registers)'],
    solution: `Register File Design (32 × 32-bit):

Read Ports (combinational):
- 5-bit Read Register 1 → 32:1 MUX → Read Data 1
- 5-bit Read Register 2 → 32:1 MUX → Read Data 2

         ┌─────────────────────────────┐
 Read1───►│  5-to-32                   │
         │  Decoder  ──────┐           │
         │                 │           │
         │  ┌──────────────▼───────┐   │
         │  │      32:1 MUX        │──►│ Data1
         │  │  (selects register)  │   │
         │  └──────────────────────┘   │
         │                             │
 Read2───►│  Same structure           │──► Data2
         └─────────────────────────────┘

Write Port (clocked):
         ┌─────────────────────────────┐
 Write───►│  5-to-32    RegWrite       │
 Reg      │  Decoder ────AND───┐       │
         │     │               │       │
         │     ▼               ▼       │
         │  ┌─────┐         ┌─────┐   │
 Write───►│  │Reg 0│◄────────│ EN  │   │
 Data     │  └─────┘         └─────┘   │
         │  ┌─────┐                    │
         │  │Reg 1│◄─────── ...        │
         │  └─────┘                    │
         │    ...                      │
         │  ┌─────┐                    │
         │  │Reg31│◄───────            │
         │  └─────┘                    │
         └─────────────────────────────┘

Special: Register 0 ($zero) is hardwired to 0
- Ignore writes to register 0
- Read always returns 0

Timing:
- Read: ~register access time (combinational)
- Write: On rising clock edge when RegWrite=1`,
  },
  {
    id: 'cs202-t3-ex12',
    subjectId: 'cs202',
    topicId: 'cs202-topic3',
    type: 'written',
    title: 'Jump Instruction Support',
    description: 'The basic datapath handles R-type, lw, sw, beq. What modifications are needed to support the j (jump) instruction?',
    difficulty: 3,
    hints: ['J-type uses 26-bit address', 'Target = PC[31:28] || address || 00', 'Need new mux for PC'],
    solution: `Modifications for jump instruction:

J-format: | opcode(6) | address(26) |

Jump target calculation:
Target = PC+4[31:28] || address || 00
       = Upper 4 bits of PC+4
         concatenated with
         26-bit address field
         concatenated with
         00 (word aligned)

Datapath modifications:

1. Add shift-left-2 unit for address field:
   address[25:0] << 2 → address[27:0]

2. Concatenation unit:
   {PC+4[31:28], address[27:0]} → Jump Target

3. Add MUX to PC input:
   Before: 2:1 MUX (PC+4 or Branch Target)
   After: 3:1 MUX (PC+4, Branch Target, or Jump Target)

4. New control signal: Jump
   - Jump = 1 for j instruction
   - Combined with Branch for PC selection

PC selection logic:
if (Jump) PC = JumpTarget
else if (Branch && Zero) PC = BranchTarget
else PC = PC + 4

Control signals for j:
- RegWrite = 0
- MemWrite = 0
- Jump = 1
- All others = don't care`,
  },
  {
    id: 'cs202-t3-ex13',
    subjectId: 'cs202',
    topicId: 'cs202-topic3',
    type: 'written',
    title: 'Performance Comparison',
    description: 'Compare performance of single-cycle vs multi-cycle for a program with: 25% loads, 10% stores, 50% ALU, 10% branches, 5% jumps. Component delays: IM=200ps, Reg=100ps, ALU=200ps, DM=200ps.',
    difficulty: 4,
    hints: ['Calculate CPI for each design', 'Single-cycle CPI = 1 but long clock', 'Multi-cycle variable CPI but short clock'],
    solution: `Performance analysis:

Single-Cycle:
- Clock period = critical path = lw
- IM + Reg + ALU + DM + Reg = 200+100+200+200+100 = 800ps
- CPI = 1 (all instructions take 1 cycle)
- Execution time per instruction = 800ps

Multi-Cycle:
- Clock period = longest stage = max(IM, Reg, ALU, DM) = 200ps
- Cycle counts:
  * lw: 5 cycles
  * sw: 4 cycles
  * ALU: 4 cycles
  * beq: 3 cycles
  * j: 3 cycles

Average CPI (weighted):
= 0.25(5) + 0.10(4) + 0.50(4) + 0.10(3) + 0.05(3)
= 1.25 + 0.40 + 2.00 + 0.30 + 0.15
= 4.10 cycles

Multi-cycle execution time = 4.10 × 200ps = 820ps

Comparison:
- Single-cycle: 800ps per instruction
- Multi-cycle: 820ps per instruction (average)

In this case, single-cycle is slightly faster!
But multi-cycle uses less hardware (shared ALU, single memory).

Multi-cycle wins when:
- Instruction mix has more fast instructions (branches, jumps)
- Memory is slower (larger DM delay increases single-cycle clock)`,
  },
  {
    id: 'cs202-t3-ex14',
    subjectId: 'cs202',
    topicId: 'cs202-topic3',
    type: 'written',
    title: 'Control Unit FSM',
    description: 'Draw the finite state machine (states and transitions) for the multi-cycle control unit handling lw, sw, and R-type instructions.',
    difficulty: 4,
    hints: ['Start with common IF and ID states', 'Branch based on opcode', 'Each instruction type has different path'],
    solution: `Multi-cycle Control FSM:

State 0: Instruction Fetch (IF)
  - IR = Mem[PC], PC = PC + 4
  - Next: State 1

State 1: Instruction Decode (ID)
  - A = Reg[rs], B = Reg[rt]
  - ALUOut = PC + (offset << 2)  [for branch target]
  - Next: based on opcode
    * R-type → State 6
    * lw/sw → State 2
    * beq → State 8

State 2: Memory Address (for lw/sw)
  - ALUOut = A + sign-extend(offset)
  - Next: lw → State 3, sw → State 5

State 3: Memory Read (lw)
  - MDR = Mem[ALUOut]
  - Next: State 4

State 4: Write Back (lw)
  - Reg[rt] = MDR
  - Next: State 0 (done)

State 5: Memory Write (sw)
  - Mem[ALUOut] = B
  - Next: State 0 (done)

State 6: Execute (R-type)
  - ALUOut = A op B
  - Next: State 7

State 7: R-type Write Back
  - Reg[rd] = ALUOut
  - Next: State 0 (done)

State 8: Branch Complete (beq)
  - if (A == B) PC = ALUOut
  - Next: State 0 (done)

FSM Diagram:
       ┌──────────────────────────────┐
       │                              │
       ▼                              │
   [State 0] ──► [State 1] ──┬──► [State 6] ──► [State 7] ──┘
       IF           ID       │       EX           WB
                             │
                             ├──► [State 2] ──┬──► [State 3] ──► [State 4] ──┘
                             │    MemAddr     │    MemRead       WB (lw)
                             │                │
                             │                └──► [State 5] ──────────────┘
                             │                     MemWrite (sw)
                             │
                             └──► [State 8] ──────────────────────────────┘
                                  Branch`,
  },
  {
    id: 'cs202-t3-ex15',
    subjectId: 'cs202',
    topicId: 'cs202-topic3',
    type: 'written',
    title: 'Sign Extension',
    description: 'Explain why sign extension is needed for I-type instructions. Show the sign extension of 0xFFFC (16-bit) to 32 bits.',
    difficulty: 2,
    hints: ['Immediate is 16 bits, ALU needs 32 bits', 'Preserve the numeric value', 'Copy the sign bit'],
    solution: `Why sign extension is needed:

I-type immediate field is 16 bits, but:
- ALU operates on 32-bit values
- Addresses are 32 bits
- Must preserve the signed value

Sign extension rule:
- Copy the most significant bit (sign bit) to fill upper bits
- Preserves the two's complement value

Example: Sign-extend 0xFFFC (16-bit)

16-bit value: 1111 1111 1111 1100
Decimal: -4 (two's complement)

Sign bit = 1 (negative number)

Sign-extended to 32 bits:
1111 1111 1111 1111 1111 1111 1111 1100
= 0xFFFFFFFC
Decimal: -4 ✓ (same value)

Example: Sign-extend 0x0004 (16-bit)

16-bit value: 0000 0000 0000 0100
Decimal: +4

Sign bit = 0 (positive number)

Sign-extended to 32 bits:
0000 0000 0000 0000 0000 0000 0000 0100
= 0x00000004
Decimal: +4 ✓

Hardware implementation:
- Take bit 15 of immediate
- Replicate it 16 times as upper bits
- Concatenate: {16{imm[15]}, imm[15:0]}`,
  },
  {
    id: 'cs202-t3-ex16',
    subjectId: 'cs202',
    topicId: 'cs202-topic3',
    type: 'written',
    title: 'Extending the ISA',
    description: 'What datapath and control modifications would be needed to add the "addi" instruction to our basic MIPS implementation?',
    difficulty: 3,
    hints: ['addi is I-type', 'Similar to lw but no memory access', 'rt is destination (not rd)'],
    solution: `Adding addi $rt, $rs, immediate:

Instruction format: I-type
opcode | rs | rt | immediate(16)

Desired operation: Reg[rt] = Reg[rs] + sign-extend(imm)

Datapath analysis:
- Reads rs from register file ✓ (already exists)
- Uses sign-extended immediate ✓ (already exists)
- ALU adds them ✓ (already exists)
- Writes result to rt ✓ (rt path exists for lw)

Datapath modifications needed: NONE!
The existing datapath already supports this path.

Control modifications:

Need to recognize addi opcode (001000) and set:
- RegDst = 0 (write to rt, not rd) - same as lw
- ALUSrc = 1 (use immediate) - same as lw
- MemtoReg = 0 (ALU result, not memory) - same as R-type
- RegWrite = 1 - same as lw/R-type
- MemRead = 0 - same as R-type
- MemWrite = 0 - same as everything except sw
- Branch = 0
- ALUOp = 00 (add) - same as lw

Control table addition:
Instruction | RegDst | ALUSrc | MemtoReg | RegWrite | MemRead | MemWrite | Branch | ALUOp
addi        |   0    |   1    |    0     |    1     |    0    |    0     |   0    |  00

Summary: Only control unit needs modification (add new opcode decoding).
No new datapath components required.`,
  },
];
