## Introduction

Instruction-Level Parallelism (ILP) extracts parallel execution from sequential programs. Modern processors use multiple techniques - superscalar execution, dynamic scheduling, and speculation - to execute several instructions simultaneously and achieve high performance.

**Learning Objectives:**
- Explain the concept of instruction-level parallelism
- Understand superscalar processor organization
- Trace dynamic scheduling with Tomasulo's algorithm
- Analyze branch prediction and speculative execution
- Compare VLIW and superscalar approaches
- Evaluate practical limits of ILP exploitation

---

## Core Concepts

### What is ILP?

ILP exploits parallelism within a single instruction stream:

```
Sequential code:
    add r1, r2, r3
    mul r4, r5, r6    # Independent of add
    sub r7, r1, r4    # Depends on both

Without ILP:        With ILP (2-wide):
Cycle 1: add        Cycle 1: add, mul (parallel)
Cycle 2: mul        Cycle 2: sub
Cycle 3: sub
Total: 3 cycles     Total: 2 cycles
```

### Superscalar Processors

Issue multiple instructions per cycle:

```
┌─────────────────────────────────────────┐
│         Superscalar Pipeline            │
│                                         │
│  Fetch → Decode → Issue → Execute → WB  │
│    │       │        │        │          │
│    │       │        │     ┌──┴──┐       │
│    4       4        4     │ ALU │       │
│ instr   instr    instr    │ ALU │       │
│                           │ MEM │       │
│                           │ FPU │       │
│                           └─────┘       │
└─────────────────────────────────────────┘
```

### Dynamic Scheduling (Tomasulo)

Execute instructions out-of-order when operands are ready:

```
Reservation Stations:
┌────────────┬─────┬─────┬─────┬───────┐
│    Op      │ Qj  │ Vj  │ Qk  │  Vk   │
├────────────┼─────┼─────┼─────┼───────┤
│   ADD      │  -  │ 10  │  -  │  20   │ ← Ready
│   MUL      │ RS2 │  -  │  -  │   5   │ ← Waiting
│   SUB      │ RS1 │  -  │ RS2 │   -   │ ← Waiting
└────────────┴─────┴─────┴─────┴───────┘

Qj/Qk: Tag of RS producing the operand
Vj/Vk: Actual value when available
```

### Speculative Execution

Predict and execute before knowing the outcome:

```
Branch prediction:
    beq r1, r2, target    # Predict: not taken
    add r3, r4, r5        # Execute speculatively
    mul r6, r7, r8        # Execute speculatively
    ...

If misprediction:
    - Flush speculative results
    - Restart from correct path

Reorder Buffer (ROB) holds speculative results until commit
```

### VLIW Architecture

Compiler explicitly schedules parallel operations:

```
VLIW Instruction (128-bit example):
┌─────────┬─────────┬─────────┬─────────┐
│ ALU Op  │ ALU Op  │ Memory  │ Branch  │
│   add   │   mul   │   ld    │   beq   │
└─────────┴─────────┴─────────┴─────────┘
Compiler fills slots; hardware simple
```

---

## Key Topics in This Section

1. **Introduction to ILP** - Parallelism in sequential programs
2. **Superscalar Processors** - Multiple issue and execution units
3. **Dynamic Scheduling** - Tomasulo's algorithm and register renaming
4. **Speculative Execution** - Branch prediction and recovery
5. **VLIW Architecture** - Compiler-scheduled parallelism
6. **Data-Level Parallelism** - SIMD and vector processing
7. **Limits of ILP** - Practical constraints and Amdahl's Law

---

## Key Formulas

**IPC (Instructions Per Cycle):**
```
IPC = Instructions_completed / Cycles
Maximum IPC = Issue_width (e.g., 4 for 4-wide superscalar)
```

**Speedup limit (Amdahl's Law):**
```
Speedup = 1 / ((1 - P) + P/N)
P = parallelizable fraction
N = speedup of parallel portion
```

---

## Prerequisites

- Pipelining concepts and hazards (Topic 4)
- Understanding of data dependencies
- Basic compiler concepts helpful for VLIW
