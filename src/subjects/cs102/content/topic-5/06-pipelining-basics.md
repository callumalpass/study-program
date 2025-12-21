---
id: cs102-t5-pipelining-basics
title: "Pipelining Basics"
order: 6
---

# Pipelining Basics

Pipelining is a fundamental technique for increasing CPU throughput. Instead of waiting for one instruction to complete before starting the next, pipelining overlaps execution—like an assembly line. This subtopic introduces the concept and explains why modern CPUs use it.

## The Assembly Line Analogy

Consider a car factory with three stations: body welding (20 min), painting (20 min), and assembly (20 min). Building one car takes 60 minutes.

**Without pipelining** (one car at a time):
```
Time (min):  0    20    40    60    80   100   120   140   160   180
Car 1:      [Weld][Paint][Assemble]
Car 2:                           [Weld][Paint][Assemble]
Car 3:                                                  [Weld][Paint][Assemble]

3 cars in 180 minutes = 60 min/car average
```

**With pipelining** (overlap stages):
```
Time (min):  0    20    40    60    80   100
Car 1:      [Weld][Paint][Assemble]
Car 2:           [Weld][Paint][Assemble]
Car 3:                [Weld][Paint][Assemble]

3 cars in 100 minutes = 33 min/car average
```

Once the pipeline is full, a new car finishes every 20 minutes—the duration of the slowest stage.

## Instruction Pipelining

CPUs apply the same principle to instructions. The classic 5-stage RISC pipeline:

| Stage | Abbreviation | Action |
|-------|--------------|--------|
| Fetch | IF | Read instruction from memory |
| Decode | ID | Interpret instruction, read registers |
| Execute | EX | Perform ALU operation |
| Memory | MEM | Read/write data memory |
| Write Back | WB | Write result to register |

Without pipelining, each instruction takes 5 clock cycles.

**Pipeline timing**:

```
Clock:    1    2    3    4    5    6    7    8    9
Instr 1: [IF ][ID ][EX ][MEM][WB ]
Instr 2:      [IF ][ID ][EX ][MEM][WB ]
Instr 3:           [IF ][ID ][EX ][MEM][WB ]
Instr 4:                [IF ][ID ][EX ][MEM][WB ]
Instr 5:                     [IF ][ID ][EX ][MEM][WB ]
```

After the pipeline fills (cycles 1-5), one instruction completes every cycle.

## Throughput vs Latency

**Latency**: Time for one instruction to complete (still 5 cycles)
**Throughput**: Instructions completed per unit time

Pipeline improves throughput, not latency. One instruction still takes 5 cycles, but the CPU completes one instruction per cycle once the pipeline is full.

**Ideal speedup**: Equal to the number of pipeline stages
- 5-stage pipeline → up to 5× throughput improvement

## Pipeline Stages in Detail

### Instruction Fetch (IF)

```
PC → Instruction Memory → Instruction Register

Actions:
1. Send PC (program counter) to memory
2. Read instruction at that address
3. Increment PC for next instruction
```

### Instruction Decode (ID)

```
Instruction → Control Logic + Register File

Actions:
1. Decode opcode to determine operation
2. Read source register values
3. Sign-extend immediate values
4. Determine destination register
```

### Execute (EX)

```
Operands → ALU → Result

Actions:
1. ALU performs operation (add, sub, AND, etc.)
2. For loads/stores: compute memory address
3. For branches: compute target address
```

### Memory Access (MEM)

```
Address → Data Memory → Data

Actions:
1. For loads: read data from memory
2. For stores: write data to memory
3. For non-memory instructions: pass through
```

### Write Back (WB)

```
Result → Register File

Actions:
1. Write result to destination register
2. For stores: no register write
```

## Pipeline Hazards

Overlapping instructions creates conflicts. **Hazards** prevent the next instruction from executing in its designated clock cycle.

### Data Hazards

When an instruction needs data that isn't yet available:

```
ADD R1, R2, R3    ; R1 = R2 + R3
SUB R4, R1, R5    ; R4 = R1 - R5  ← needs R1 from ADD

Pipeline:
ADD: [IF][ID][EX][MEM][WB]  ← R1 written in cycle 5
SUB:     [IF][ID][EX][MEM][WB]
              ↑
         Needs R1 in cycle 3, but ADD hasn't written it yet!
```

**Solutions**:

**Stalling** (bubbles): Wait for the data
```
ADD: [IF][ID][EX][MEM][WB]
SUB:     [IF][ID][ - ][ - ][EX][MEM][WB]
                  stall stall
```

**Forwarding** (bypassing): Route data directly from EX stage
```
ADD: [IF][ID][EX][MEM][WB]
SUB:     [IF][ID][EX][MEM][WB]
              ↑←──┘
         Forward from ADD's EX output
```

### Control Hazards

Branches change the program flow, but we've already fetched the next instruction:

```
BEQ R1, R2, target   ; If R1 == R2, jump to target
ADD R3, R4, R5       ; Already fetched, maybe wrong!

Pipeline:
BEQ: [IF][ID][EX][MEM][WB]
              ↑ Branch resolved here
ADD:     [IF][ID][???]
              Wrong instruction if branch taken!
```

**Solutions**:

**Stalling**: Always wait for branch resolution (slow)

**Prediction**: Guess which way the branch goes
- Static: Always predict not-taken (or always taken)
- Dynamic: Track history, predict based on past behavior

**Delayed branches**: Compiler fills the slot after branch with useful work (MIPS approach)

### Structural Hazards

When two instructions need the same hardware:

```
If instruction memory and data memory share a bus:
- IF needs to fetch instruction
- MEM needs to load/store data
Both need memory in the same cycle → conflict
```

**Solution**: Separate instruction and data memories (Harvard architecture at cache level).

## Pipeline Depth

More stages = higher potential clock speed (less work per stage).

| Era | Typical Depth | Clock Speed |
|-----|---------------|-------------|
| 1990s | 5 stages | 200-500 MHz |
| 2000 | 20 stages (Pentium 4) | 1.5-3 GHz |
| 2020s | 14-20 stages | 3-5 GHz |

But deeper pipelines have drawbacks:
- More stages to flush on misprediction
- More bypassing logic needed
- Diminishing returns on clock speed

## Example: Simple Pipeline Execution

Consider this instruction sequence:
```
LW   R1, 0(R2)    ; Load word: R1 = Memory[R2+0]
ADD  R3, R1, R4   ; Add: R3 = R1 + R4
SW   R3, 4(R5)    ; Store word: Memory[R5+4] = R3
```

**Pipeline with stalls** (no forwarding):

```
Clock:   1    2    3    4    5    6    7    8    9   10   11
LW:     [IF ][ID ][EX ][MEM][WB ]
ADD:         [IF ][ID ][ - ][ - ][EX ][MEM][WB ]  ← Stalls for R1
SW:               [IF ][ - ][ - ][ID ][EX ][MEM][WB ]
```

**Pipeline with forwarding**:

```
Clock:   1    2    3    4    5    6    7    8
LW:     [IF ][ID ][EX ][MEM][WB ]
ADD:         [IF ][ID ][ - ][EX ][MEM][WB ]  ← 1 stall (LW in MEM)
SW:               [IF ][ - ][ID ][EX ][MEM][WB ]
                        Forward R3 from ADD's EX
```

Still one stall because load-use requires waiting for the MEM stage.

## Performance Metrics

**CPI (Cycles Per Instruction)**: Average cycles to complete an instruction

Ideal pipelined CPI = 1.0 (one instruction per cycle)

Reality:
- Stalls increase CPI
- Cache misses increase CPI
- Branch mispredictions increase CPI

Typical modern CPU: CPI ≈ 0.25-0.5 (superscalar, multiple instructions per cycle)

## Key Takeaways

- **Pipelining** overlaps instruction execution like an assembly line.
- Classic 5-stage pipeline: **IF, ID, EX, MEM, WB**.
- Pipeline improves **throughput** (instructions/second), not **latency** (time for one instruction).
- **Data hazards** occur when instructions need results that aren't ready.
- **Control hazards** occur when branches change the instruction flow.
- **Forwarding** passes results directly between stages, reducing stalls.
- **Branch prediction** guesses branch outcomes to keep the pipeline full.
- **Deeper pipelines** enable higher clock speeds but with diminishing returns.
- Modern CPUs have 14-20 stage pipelines with extensive hazard handling.
- Understanding pipelining explains why CPU performance is more than just clock speed.

