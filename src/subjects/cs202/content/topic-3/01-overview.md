---
id: cs202-t3-overview
title: "Datapath Overview"
order: 1
---

# CPU Datapath Overview

The **datapath** is the hardware component of a processor responsible for performing operations on data. It contains the functional units that execute instructions: registers, ALUs, multiplexers, and the interconnections between them. Understanding the datapath is key to understanding how processors actually execute programs.

## The Processor's Core Components

A CPU consists of two main parts:

### Datapath
The "muscles" of the processor—the hardware that performs operations:
- **Registers**: Fast storage for data being processed
- **ALU (Arithmetic Logic Unit)**: Performs arithmetic and logical operations
- **Memory interface**: Connects to instruction and data memory
- **Multiplexers**: Select between different data sources
- **Buses**: Wires that carry data between components

### Control Unit
The "brain" that directs the datapath:
- Decodes instructions
- Generates control signals
- Determines what the datapath does each cycle

```
┌─────────────────────────────────────────────────────────────┐
│                        Control Unit                          │
│   ┌──────────────────────────────────────────────────┐      │
│   │     Instruction Decode & Control Signal Gen       │      │
│   └──────────────────────────────────────────────────┘      │
│              │ Control Signals                               │
│              ▼                                               │
│   ┌──────────────────────────────────────────────────┐      │
│   │                    Datapath                       │      │
│   │  ┌────┐    ┌─────┐    ┌─────┐    ┌────────┐     │      │
│   │  │ PC │───►│Instr│───►│ Reg │───►│  ALU   │     │      │
│   │  │    │    │ Mem │    │File │    │        │     │      │
│   │  └────┘    └─────┘    └─────┘    └────────┘     │      │
│   └──────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## Instruction Execution Stages

Most instructions follow a similar pattern of execution stages:

### 1. Instruction Fetch (IF)
- Read the instruction from memory at the address in PC
- Increment PC to point to the next instruction

```
PC → Instruction Memory → Instruction Register
PC ← PC + 4
```

### 2. Instruction Decode (ID)
- Decode the instruction to determine the operation
- Read source registers from the register file
- Sign-extend immediate values if needed

```
Instruction → Decode Logic → Control Signals
Register File → Source Operands
```

### 3. Execute (EX)
- Perform the operation in the ALU
- Calculate memory addresses for load/store
- Evaluate branch conditions

```
Operands → ALU → Result
```

### 4. Memory Access (MEM)
- Load: Read data from memory
- Store: Write data to memory
- Other instructions: Skip this stage

```
Address → Data Memory → Data (load)
Address, Data → Data Memory (store)
```

### 5. Write Back (WB)
- Write the result to the destination register

```
Result → Register File
```

## Single-Cycle Datapath Concept

In a **single-cycle design**, each instruction completes in one clock cycle:

```
     ┌──────────────────────────────────────────────────────┐
     │                    One Clock Cycle                    │
     │                                                       │
┌────┴────┐    ┌────┐    ┌────┐    ┌────┐    ┌────┐        │
│   IF    │───►│ ID │───►│ EX │───►│MEM │───►│ WB │        │
└─────────┘    └────┘    └────┘    └────┘    └────┘        │
                                                            │
◄──────────────────────────────────────────────────────────►
                   All stages in one cycle
```

**Advantage**: Simple design, easy to understand

**Disadvantage**: Clock period must accommodate the slowest instruction (typically load), wasting time on faster instructions

## Key Datapath Components

### Program Counter (PC)
A register holding the address of the current instruction.

```
        ┌─────────┐
Clock──►│   PC    │──► Address to Instruction Memory
        │         │
        └────┬────┘
             │
         ┌───▼───┐
         │  + 4  │──► Next PC (normal case)
         └───────┘
```

### Instruction Memory
Read-only memory containing the program. Takes an address and outputs the instruction at that address.

```
Address ──►┌─────────────────┐
           │                 │
           │   Instruction   │──► Instruction
           │     Memory      │
           │                 │
           └─────────────────┘
```

### Register File
Contains the general-purpose registers. Supports:
- Two read ports (for two source operands)
- One write port (for the destination)

```
Read Reg 1 ──►┌───────────────┐
              │               │──► Read Data 1
Read Reg 2 ──►│  Register     │
              │    File       │──► Read Data 2
Write Reg ───►│               │
Write Data ──►│               │
RegWrite ────►└───────────────┘
```

### ALU (Arithmetic Logic Unit)
Performs arithmetic and logical operations based on a control signal.

```
         ┌─────────────────┐
Input A ─┤                 │
         │      ALU        ├──► Result
Input B ─┤                 │
         │                 ├──► Zero flag
ALUOp ───┤                 │
         └─────────────────┘
```

Common ALU operations:
- ADD, SUB, AND, OR, XOR
- SLT (set less than)
- Shift operations

### Data Memory
Stores and retrieves data. Supports both reads and writes.

```
Address ─────►┌───────────────┐
              │               │
Write Data ──►│     Data      │──► Read Data
              │    Memory     │
MemRead ─────►│               │
MemWrite ────►└───────────────┘
```

### Multiplexers
Select between multiple inputs based on a control signal.

```
        Input A ──►┌────┐
                   │MUX │──► Output
        Input B ──►│    │
                   └──▲─┘
                      │
                   Select
```

Used throughout the datapath to choose between alternatives (e.g., ALU source: register vs immediate).

## Connecting the Components

For an R-type instruction like `add $t0, $t1, $t2`:

```
1. PC provides address to Instruction Memory
2. Instruction Memory outputs instruction
3. Instruction fields select registers:
   - rs ($t1) → Read Register 1
   - rt ($t2) → Read Register 2
   - rd ($t0) → Write Register
4. Register File outputs rs and rt values
5. ALU performs addition
6. Result written back to Register File
7. PC incremented by 4
```

For a load instruction like `lw $t0, 8($t1)`:

```
1. PC → Instruction Memory → instruction
2. rs ($t1) → Read Register 1
3. Immediate (8) sign-extended
4. ALU adds base address + offset
5. Data Memory reads from computed address
6. Read data written to rt ($t0) in Register File
7. PC incremented by 4
```

## Performance Considerations

The single-cycle datapath's clock period is determined by:

```
T_cycle = T_IF + T_ID + T_EX + T_MEM + T_WB
```

For a load instruction (the longest path):
- Instruction memory access: ~200 ps
- Register read: ~50 ps
- ALU computation: ~100 ps
- Data memory access: ~200 ps
- Register write: ~50 ps
- **Total: ~600 ps**

Even simple instructions (like `add`) that don't need memory access must wait this entire time, wasting cycles.

## Key Takeaways

- The datapath contains functional units (registers, ALU, memory) connected by buses and muxes
- The control unit directs the datapath by generating control signals
- Instructions execute in stages: Fetch, Decode, Execute, Memory, Write Back
- Single-cycle design is simple but inefficient—clock period limited by slowest instruction
- Understanding the datapath is fundamental to processor design and optimization
- Components include: PC, instruction memory, register file, ALU, data memory, and multiplexers
