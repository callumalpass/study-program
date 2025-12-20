# Control Unit Design

The **control unit** is the brain of the processor, responsible for generating the signals that orchestrate the datapath's operation. It decodes instructions and produces control signals that tell each component what to do during each clock cycle.

## Control Unit Responsibilities

The control unit must:

1. **Decode the instruction**: Determine the type of operation
2. **Generate control signals**: Tell datapath components what to do
3. **Handle special cases**: Manage branches, jumps, and exceptions
4. **Coordinate timing**: Ensure signals are active at the right time

## Single-Cycle Control

For a single-cycle datapath, the control unit is **combinational logic**—the outputs depend only on the current instruction (no state).

```
        ┌──────────────────────────────────────────────┐
        │              Control Unit                     │
        │                                               │
Opcode ─┼──►┌────────────┐                             │
(6 bits)│   │   Main     │──► RegDst                   │
        │   │  Control   │──► Branch                   │
        │   │            │──► MemRead                  │
        │   │            │──► MemtoReg                 │
        │   │            │──► MemWrite                 │
        │   │            │──► ALUSrc                   │
        │   │            │──► RegWrite                 │
        │   │            │──► ALUOp (2 bits)           │
        │   └────────────┘                             │
        │                                               │
        │   ┌────────────┐                             │
ALUOp ──┼──►│    ALU     │                             │
(2 bits)│   │  Control   │──► ALU Control (4 bits)    │
Funct ──┼──►│            │                             │
(6 bits)│   └────────────┘                             │
        └──────────────────────────────────────────────┘
```

## Main Control Signals

### Control Signal Definitions

| Signal | When 0 | When 1 |
|--------|--------|--------|
| RegDst | Write register = rt | Write register = rd |
| ALUSrc | ALU input B = register | ALU input B = sign-extended immediate |
| MemtoReg | Register write data = ALU result | Register write data = memory |
| RegWrite | No register write | Register written |
| MemRead | No memory read | Memory read |
| MemWrite | No memory write | Memory written |
| Branch | PC = PC + 4 | PC = branch target if condition true |

### Truth Table for Main Control

| Opcode | Instruction | RegDst | ALUSrc | MemtoReg | RegWrite | MemRead | MemWrite | Branch | ALUOp |
|--------|-------------|--------|--------|----------|----------|---------|----------|--------|-------|
| 000000 | R-type | 1 | 0 | 0 | 1 | 0 | 0 | 0 | 10 |
| 100011 | lw | 0 | 1 | 1 | 1 | 1 | 0 | 0 | 00 |
| 101011 | sw | X | 1 | X | 0 | 0 | 1 | 0 | 00 |
| 000100 | beq | X | 0 | X | 0 | 0 | 0 | 1 | 01 |
| 001000 | addi | 0 | 1 | 0 | 1 | 0 | 0 | 0 | 00 |
| 000010 | j | X | X | X | 0 | 0 | 0 | X | XX |

## Implementing the Main Control

The main control can be implemented as combinational logic. For example, the RegDst signal:

```
RegDst = Opcode[5]'·Opcode[4]'·Opcode[3]'·Opcode[2]'·Opcode[1]'·Opcode[0]'
       = (Opcode == 000000)
```

This means RegDst is 1 only for R-type instructions.

### Logic Equations

**RegWrite**:
```
RegWrite = R-type + lw + addi
         = (Op == 000000) + (Op == 100011) + (Op == 001000)
```

**MemRead**:
```
MemRead = lw
        = (Op == 100011)
```

**MemWrite**:
```
MemWrite = sw
         = (Op == 101011)
```

**Branch**:
```
Branch = beq
       = (Op == 000100)
```

**ALUSrc**:
```
ALUSrc = lw + sw + addi
       = (Op == 100011) + (Op == 101011) + (Op == 001000)
```

## ALU Control

The ALU control unit generates the precise operation code for the ALU:

### ALU Control Truth Table

| ALUOp | Funct | ALU Action | ALU Control |
|-------|-------|------------|-------------|
| 00 | XXXXXX | Add | 0010 |
| 01 | XXXXXX | Subtract | 0110 |
| 10 | 100000 | Add | 0010 |
| 10 | 100010 | Subtract | 0110 |
| 10 | 100100 | AND | 0000 |
| 10 | 100101 | OR | 0001 |
| 10 | 101010 | SLT | 0111 |

### ALU Control Logic

```
ALUControl[3] = 0
ALUControl[2] = ALUOp[0] | (ALUOp[1] & Funct[1])
ALUControl[1] = ALUOp[1]' | Funct[2]'
ALUControl[0] = ALUOp[1] & (Funct[0] | Funct[3])
```

## Hardwired vs Microprogrammed Control

### Hardwired Control

The approach we've described uses **hardwired control**—direct logic circuits.

**Advantages**:
- Fast: Pure combinational logic
- Efficient: Minimal hardware
- Good for simple instruction sets

**Disadvantages**:
- Inflexible: Hard to modify
- Complex: Many gates for complex ISAs
- Difficult to extend

### Microprogrammed Control

**Microprogrammed control** uses a lookup table (microcode ROM).

```
        ┌───────────────────────────────────────┐
        │                                       │
Opcode ─┼──►┌────────────┐                     │
        │   │  Address   │                     │
        │   │  Logic     │──► ROM Address      │
        │   └────────────┘                     │
        │                                       │
        │   ┌────────────────────────────────┐ │
        │   │        Microcode ROM            │ │
Address─┼──►│                                 │──► Control Signals
        │   │  Contains control signal        │ │
        │   │  values for each instruction    │ │
        │   └────────────────────────────────┘ │
        └───────────────────────────────────────┘
```

**Advantages**:
- Flexible: Easy to modify (just change ROM contents)
- Simplifies complex ISAs
- Easier debugging and testing

**Disadvantages**:
- Slower: ROM access adds delay
- More hardware: Requires ROM storage
- Power consumption

**Modern reality**: x86 processors use microcode for complex instructions but hardwired control for simple operations.

## Control for Jump Instructions

Jump instructions require additional control:

### Jump (`j`)

```
┌─────────────────┬─────────────────────────────┐
│     Opcode      │          Address            │
│     6 bits      │          26 bits            │
└─────────────────┴─────────────────────────────┘
```

Target address = {PC[31:28], Address, 00}

Additional hardware needed:
```
                    ┌──────────────────┐
Instruction[25:0] ──┤ Shift left 2     │
                    └────────┬─────────┘
                             │
          ┌──────────────────▼─────────────────┐
PC[31:28] │            Concatenate             │──► Jump Target
          └────────────────────────────────────┘
```

### Jump Register (`jr`)

Target address comes from a register:

```nasm
jr $ra    ; PC = $ra
```

Requires:
- Reading the register file
- Routing register value to PC input
- Additional mux control

### Jump and Link (`jal`)

```nasm
jal label   ; $ra = PC + 4; PC = label
```

Requires:
- Writing PC + 4 to $ra
- Jumping to target address

## Control Signal Timing

All control signals must be stable during the clock cycle:

```
Clock   ────┐     ┌─────────┐     ┌─────────
            └─────┘         └─────┘

Signals ────────────────────────────────────
        ◄───── Setup ─────►◄── Hold ──►
            time before      time after
            clock edge       clock edge
```

Control signals are generated combinationally from the instruction, so they're ready shortly after the instruction is fetched.

## Extending the Control

To add a new instruction:

1. **Define the instruction format and operation**
2. **Determine required control signal values**
3. **Add to the control truth table**
4. **Update the control logic**
5. **Add any new datapath components if needed**

**Example**: Adding `addi` (add immediate)

| Opcode | RegDst | ALUSrc | MemtoReg | RegWrite | MemRead | MemWrite | Branch | ALUOp |
|--------|--------|--------|----------|----------|---------|----------|--------|-------|
| 001000 | 0 | 1 | 0 | 1 | 0 | 0 | 0 | 00 |

Similar to `lw` but MemtoReg=0 (ALU result, not memory).

## Key Takeaways

- The control unit decodes instructions and generates control signals
- Single-cycle control is purely combinational logic
- Main control generates high-level signals; ALU control generates ALU operation codes
- Control signals are derived from the opcode and function fields
- Hardwired control is fast but inflexible; microprogrammed control is flexible but slower
- Jump instructions require additional control and datapath paths
- Adding new instructions requires updating both control logic and potentially the datapath
