## Introduction

Pipelining is the key technique that makes modern processors fast. By overlapping instruction execution like an assembly line, we can achieve throughput of nearly one instruction per cycle. However, this introduces hazards that must be carefully managed.

**Learning Objectives:**
- Explain how pipelining improves processor throughput
- Identify the three types of pipeline hazards
- Design forwarding paths to resolve data hazards
- Implement branch prediction to handle control hazards
- Handle exceptions in a pipelined processor
- Calculate pipeline performance metrics

---

## Core Concepts

### The Pipeline Concept

Without pipelining (single-cycle):
```
Time:     1    2    3    4    5    6    7    8
Instr 1: [─────────────────────]
Instr 2:                        [─────────────────────]
```

With pipelining (5 stages):
```
Time:     1    2    3    4    5    6    7    8
Instr 1:  IF   ID   EX  MEM   WB
Instr 2:       IF   ID   EX  MEM   WB
Instr 3:            IF   ID   EX  MEM   WB
Instr 4:                 IF   ID   EX  MEM   WB
```

**Throughput:** One instruction completing per cycle (ideally)
**Latency:** Still 5 cycles per instruction

### Pipeline Stages (MIPS)

```
IF:  Instruction Fetch    - Read instruction from memory
ID:  Instruction Decode   - Read registers, decode instruction
EX:  Execute              - ALU operation or address calculation
MEM: Memory Access        - Load/store data memory access
WB:  Write Back           - Write result to register file
```

### Pipeline Hazards

**Structural Hazards:** Hardware resource conflicts
```
Problem: Two instructions need same resource
Solution: Duplicate hardware or stall
```

**Data Hazards:** Dependencies between instructions
```
add $t0, $s0, $s1   # Writes $t0
sub $t2, $t0, $s2   # Needs $t0 - but not written yet!
```

**Control Hazards:** Branches change instruction flow
```
beq $t0, $t1, target   # Don't know if taken
add $s0, $s1, $s2      # Should this execute?
```

### Forwarding (Bypassing)

Forward results before they're written to registers:

```
         EX/MEM                MEM/WB
           │                      │
           ▼                      ▼
        ┌──┴──┐              ┌───┴───┐
    ┌───│ Mux │←─────────────│Forward│
    │   └─────┘              └───────┘
    ▼
   ALU ← Gets value from pipeline register
         instead of waiting for WB stage
```

---

## Key Topics in This Section

1. **Introduction to Pipelining** - Concepts and performance benefits
2. **Pipeline Hazards** - Structural, data, and control hazards
3. **Data Forwarding** - Bypassing to resolve RAW hazards
4. **Branch Prediction** - Static and dynamic prediction strategies
5. **Exceptions in Pipelines** - Handling interrupts precisely
6. **Advanced Pipelining** - Deep pipelines and superpipelining
7. **Pipeline Performance** - CPI analysis and optimization

---

## Key Formulas

**Speedup from pipelining:**
```
Speedup_ideal = Number of pipeline stages

Speedup_actual = Pipeline depth / (1 + Pipeline stall cycles per instruction)
```

**CPI with stalls:**
```
CPI = 1 + Stall_cycles_per_instruction
```

---

## Prerequisites

- Single-cycle and multi-cycle datapath design (Topic 3)
- Understanding of instruction dependencies
- Basic probability for branch prediction analysis
