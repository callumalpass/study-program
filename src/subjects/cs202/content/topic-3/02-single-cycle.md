---
id: cs202-t3-single
title: "Single-Cycle Datapath"
order: 2
---

# Single-Cycle Datapath Implementation

A **single-cycle datapath** executes each instruction in exactly one clock cycle. While not used in modern high-performance processors, this design is fundamental for understanding processor architecture and serves as the foundation for more advanced designs.

## Complete Single-Cycle Datapath

Here's the complete datapath supporting R-type, load/store, and branch instructions:

```
                    ┌──────────────────────────────────────────────────────────┐
                    │                                                          │
                    │  ┌─────────┐                                             │
        ┌──────────►│  │   +4    │                                             │
        │           │  └────┬────┘                                             │
        │           │       │                                                  │
        │     ┌─────▼─────┐ │  ┌──────────┐                                   │
        │     │    MUX    │◄┴──┤ Branch   │                                   │
        │     │  PCSrc    │    │ Target   │                                   │
        │     └─────┬─────┘    └────▲─────┘                                   │
        │           │               │                                          │
        │     ┌─────▼─────┐        │                                          │
        │     │    PC     │        │                                          │
        │     └─────┬─────┘        │                                          │
        │           │              │                                          │
        │     ┌─────▼─────┐   ┌────┴────┐   ┌────────────┐                   │
        │     │   Instr   │   │  Sign   │   │            │                   │
        └─────┤   Mem     ├──►│ Extend  ├──►│   <<2      │                   │
              │           │   │         │   │            │                   │
              └─────┬─────┘   └────┬────┘   └────────────┘                   │
                    │              │                                          │
         ┌──────────┴──────────┐   │                                          │
         │                     │   │                                          │
    ┌────▼────┐          ┌────▼────▼───┐                                     │
    │ Read    │          │             │      ┌─────────────┐                │
    │ Reg 1   │──────────►   Register  │──────►             │                │
    │         │          │    File     │      │    ALU      │──► ALU Result  │
    │ Read    │──────┬───►             │──┬──►│             │                │
    │ Reg 2   │      │   │             │  │   └──────┬──────┘                │
    │         │      │   │ Write Reg   │  │          │ Zero                  │
    │ Write   │      │   │ Write Data  │  │          ▼                       │
    │ Reg     │◄─────┼───┤             │  │   ┌──────────────┐               │
    └────▲────┘      │   └─────▲───────┘  │   │   Data       │               │
         │           │         │          │   │   Memory     │──► Read Data  │
         │           │         │          │   │              │               │
         │      ┌────▼────┐    │     ┌────▼───┤  Address     │               │
         │      │  MUX    │    │     │  MUX   │  Write Data  │               │
         │      │ RegDst  │    │     │ALUSrc  │  MemRead     │               │
         │      └────┬────┘    │     └────────┤  MemWrite    │               │
         │           │         │              └──────────────┘               │
         │           │    ┌────▼────┐                                        │
         │           │    │   MUX   │                                        │
         │           │    │MemtoReg│                                        │
         │           │    └────┬────┘                                        │
         │           │         │                                             │
         └───────────┴─────────┘                                             │
```

## Instruction Types Supported

### R-Type Instructions (e.g., `add`, `sub`, `and`, `or`)

**Format**: `op | rs | rt | rd | shamt | funct`

**Datapath operation**:
1. Fetch instruction from memory at PC
2. Read rs and rt from register file
3. ALU performs operation specified by funct
4. Write result to rd in register file
5. PC ← PC + 4

**Control signals**:
- RegDst = 1 (destination is rd)
- ALUSrc = 0 (second ALU input from register)
- MemtoReg = 0 (ALU result to register)
- RegWrite = 1 (write to register file)
- MemRead = 0
- MemWrite = 0
- Branch = 0

### Load Word (`lw`)

**Format**: `op | rs | rt | immediate`

**Datapath operation**:
1. Fetch instruction
2. Read base address from rs
3. Sign-extend immediate
4. ALU adds base + offset
5. Read data from memory at computed address
6. Write data to rt
7. PC ← PC + 4

**Control signals**:
- RegDst = 0 (destination is rt)
- ALUSrc = 1 (second ALU input from immediate)
- MemtoReg = 1 (memory data to register)
- RegWrite = 1
- MemRead = 1
- MemWrite = 0
- Branch = 0

### Store Word (`sw`)

**Format**: `op | rs | rt | immediate`

**Datapath operation**:
1. Fetch instruction
2. Read base address from rs
3. Read data to store from rt
4. Sign-extend immediate
5. ALU adds base + offset
6. Write data to memory at computed address
7. PC ← PC + 4

**Control signals**:
- RegDst = X (don't care—not writing register)
- ALUSrc = 1 (immediate for address calculation)
- MemtoReg = X
- RegWrite = 0
- MemRead = 0
- MemWrite = 1
- Branch = 0

### Branch Equal (`beq`)

**Format**: `op | rs | rt | immediate`

**Datapath operation**:
1. Fetch instruction
2. Read rs and rt
3. ALU subtracts rs - rt
4. If Zero flag set, branch taken
5. Branch target = PC + 4 + (immediate × 4)
6. PC ← branch target if taken, else PC + 4

**Control signals**:
- RegDst = X
- ALUSrc = 0 (compare registers)
- MemtoReg = X
- RegWrite = 0
- MemRead = 0
- MemWrite = 0
- Branch = 1
- ALUOp = subtract

## Control Signal Summary

| Instruction | RegDst | ALUSrc | MemtoReg | RegWrite | MemRead | MemWrite | Branch | ALUOp |
|-------------|--------|--------|----------|----------|---------|----------|--------|-------|
| R-type | 1 | 0 | 0 | 1 | 0 | 0 | 0 | funct |
| lw | 0 | 1 | 1 | 1 | 1 | 0 | 0 | add |
| sw | X | 1 | X | 0 | 0 | 1 | 0 | add |
| beq | X | 0 | X | 0 | 0 | 0 | 1 | sub |

## ALU Control

The ALU operation is determined by a combination of the opcode and function field:

```
        ┌────────────┐
Opcode ─┤            │
        │  Main      ├──► ALUOp (2 bits)
        │  Control   │
        └────────────┘

        ┌────────────┐
ALUOp ──┤            │
        │   ALU      ├──► ALU Control (4 bits)
Funct ──┤  Control   │
        └────────────┘
```

**ALUOp encoding**:
- 00: Add (for lw/sw)
- 01: Subtract (for beq)
- 10: Use function field (R-type)

**ALU Control output**:
| ALUOp | Function | Operation |
|-------|----------|-----------|
| 00 | XXXXXX | Add |
| 01 | XXXXXX | Subtract |
| 10 | 100000 | Add |
| 10 | 100010 | Subtract |
| 10 | 100100 | AND |
| 10 | 100101 | OR |
| 10 | 101010 | SLT |

## Timing Analysis

The clock period must accommodate the longest instruction path:

### Critical Path: Load Instruction

```
PC → Instr Mem → Register File → MUX → ALU → Data Mem → MUX → Register File
└──────┘ └──────────┘ └─────────────┘ └───────┘ └───────────┘ └──────────────┘
  200ps     50ps          100ps         200ps       50ps           50ps
```

**Total: ~650 ps** → Maximum frequency ≈ 1.5 GHz

### Other Paths

| Instruction | Path Length |
|-------------|-------------|
| R-type | ~400 ps (no data memory) |
| sw | ~500 ps (no register write) |
| beq | ~350 ps (no memory, no write) |

All instructions must use the same 650 ps cycle, wasting time on faster instructions.

## Limitations of Single-Cycle Design

1. **Inefficiency**: Simple instructions wait for the longest instruction's timing
2. **No parallelism**: Only one instruction executes at a time
3. **Resource waste**: ALU and memory units idle during parts of the cycle
4. **Scalability**: Adding complex instructions increases cycle time for all

## Performance Calculation

**Example**: Compare performance for a program with instruction mix:
- 25% loads, 10% stores, 45% R-type, 15% branches, 5% jumps

**Single-cycle**:
- All instructions: 650 ps
- CPI = 1 (one cycle per instruction)
- Average time per instruction: 650 ps

**Improvement potential** (with variable timing):
- Loads: 650 ps × 25% = 162.5 ps
- Stores: 500 ps × 10% = 50 ps
- R-type: 400 ps × 45% = 180 ps
- Branches: 350 ps × 15% = 52.5 ps
- Jumps: 300 ps × 5% = 15 ps
- Average: 460 ps

Single-cycle wastes ~29% of time compared to optimal.

## Key Takeaways

- Single-cycle datapath executes each instruction in one clock cycle
- Key components: PC, instruction memory, register file, ALU, data memory, multiplexers
- Control signals determine datapath behavior for each instruction type
- Clock period is constrained by the slowest instruction (load)
- Simple but inefficient—pipelining and multi-cycle designs improve performance
- Understanding single-cycle is foundational for studying advanced CPU designs
