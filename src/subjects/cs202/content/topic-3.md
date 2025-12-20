## Introduction

The datapath is the CPU's workhorse - the collection of functional units (ALU, registers, memory interfaces) and interconnections that execute instructions. Understanding datapath design reveals how software instructions become hardware operations.

**Learning Objectives:**
- Identify the major components of a CPU datapath
- Trace instruction execution through a single-cycle datapath
- Design control signals for different instruction types
- Understand the trade-offs between single-cycle and multi-cycle designs
- Analyze datapath performance metrics

---

## Core Concepts

### Datapath Components

A basic MIPS datapath includes:

```
┌──────────────────────────────────────────────────┐
│                    Datapath                       │
│                                                   │
│  ┌──────┐  ┌───────────┐  ┌─────┐  ┌──────────┐ │
│  │  PC  │→│ Instr Mem │→│ Regs │→│   ALU    │ │
│  └──────┘  └───────────┘  └─────┘  └──────────┘ │
│     ↑                        ↑          │        │
│     │                        │          ↓        │
│     │                     ┌──┴───┐  ┌────────┐  │
│     └─────────────────────│ Mux  │←│Data Mem│  │
│                           └──────┘  └────────┘  │
└──────────────────────────────────────────────────┘
```

**Program Counter (PC):** Holds address of current instruction
**Instruction Memory:** Stores the program
**Register File:** 32 registers for fast data access
**ALU:** Performs arithmetic and logical operations
**Data Memory:** Main memory for load/store operations

### Single-Cycle Execution

In a single-cycle datapath, each instruction completes in one clock cycle:

```
Clock cycle: ────────────────────────────────────────
             ↑                                      ↑
             │←─────── One Instruction ────────────→│

Stages: IF → ID → EX → MEM → WB (all in one cycle)
```

**Advantage:** Simple control logic
**Disadvantage:** Clock period = longest instruction time

### Control Unit Design

The control unit generates signals based on the opcode:

```
Instruction → Opcode → Control Unit → Control Signals

R-type (add):  RegDst=1, ALUSrc=0, MemtoReg=0, RegWrite=1
Load word:     RegDst=0, ALUSrc=1, MemtoReg=1, RegWrite=1
Store word:    ALUSrc=1, MemWrite=1, RegWrite=0
Branch:        Branch=1, ALUOp=01
```

### Multi-Cycle Datapath

Breaks instruction execution into multiple cycles:

```
Cycle:    1      2      3      4      5
         IF     ID     EX    MEM     WB
          └──────┴──────┴──────┴──────┘
          Shared resources between cycles
```

**Advantage:** Clock period = longest stage, not longest instruction
**Advantage:** Shared functional units reduce hardware

---

## Key Topics in This Section

1. **Datapath Overview** - Components and their interconnections
2. **Single-Cycle Datapath** - Design for R-type, load/store, branch
3. **Control Unit Design** - Generating control signals from opcodes
4. **Multi-Cycle Datapath** - Breaking execution into stages
5. **ALU Design** - Implementing arithmetic and logical operations
6. **Register File Design** - Multiple read/write port implementation
7. **Performance Analysis** - Evaluating datapath designs

---

## Prerequisites

- MIPS instruction formats and semantics (Topic 1)
- Basic digital logic (muxes, adders, registers)
- Understanding of clock cycles and timing
