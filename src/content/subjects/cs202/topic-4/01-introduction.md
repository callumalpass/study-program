# Introduction to Pipelining

**Pipelining** is the most important technique for improving processor performance. Like an assembly line in a factory, pipelining allows multiple instructions to be in different stages of execution simultaneously, dramatically increasing throughput.

## The Assembly Line Analogy

Consider a car assembly line:

**Without pipelining** (single-cycle):
```
Car 1: [Paint] → [Engine] → [Interior] → [Test] → Done
Car 2:                                            [Paint] → ...
```
One car must be completely finished before the next starts.

**With pipelining**:
```
Time:   1       2        3         4        5       6
Car 1: [Paint] [Engine] [Interior] [Test]   Done
Car 2:         [Paint]  [Engine]   [Interior] [Test] Done
Car 3:                  [Paint]    [Engine]  [Interior] ...
Car 4:                             [Paint]   [Engine]  ...
```
Multiple cars in different stages simultaneously. Same total time per car, but much higher throughput.

## Basic Pipeline Concept

A **classic 5-stage RISC pipeline** divides instruction execution:

| Stage | Abbreviation | Operation |
|-------|--------------|-----------|
| 1 | IF | Instruction Fetch |
| 2 | ID | Instruction Decode / Register Read |
| 3 | EX | Execute / Address Calculation |
| 4 | MEM | Memory Access |
| 5 | WB | Write Back |

### Pipeline Execution

```
Clock Cycle:    1    2    3    4    5    6    7    8    9
Instruction 1:  IF   ID   EX   MEM  WB
Instruction 2:       IF   ID   EX   MEM  WB
Instruction 3:            IF   ID   EX   MEM  WB
Instruction 4:                 IF   ID   EX   MEM  WB
Instruction 5:                      IF   ID   EX   MEM  WB
```

After the pipeline is full:
- One instruction completes every cycle
- Five instructions are "in flight" simultaneously
- Throughput: 1 instruction per cycle (ideally)

## Pipeline Speedup

### Theoretical Speedup

For a pipeline with k stages:
```
Speedup_max = k
```

A 5-stage pipeline can potentially execute 5× faster than single-cycle.

### Actual Speedup

For n instructions on a k-stage pipeline:
```
Time_unpipelined = n × k cycles
Time_pipelined = k + (n - 1) cycles

Speedup = (n × k) / (k + n - 1)
```

As n → ∞:
```
Speedup → k
```

**Example**: 100 instructions, 5 stages
```
Unpipelined: 100 × 5 = 500 cycles
Pipelined: 5 + 99 = 104 cycles
Speedup = 500 / 104 ≈ 4.8×
```

## Pipeline Registers

To separate stages, we insert **pipeline registers** between them:

```
     ┌────┐    ┌────────┐    ┌────────┐    ┌─────────┐    ┌────────┐
     │    │    │        │    │        │    │         │    │        │
────►│ IF │───►│ IF/ID  │───►│ ID/EX  │───►│ EX/MEM  │───►│MEM/WB  │───►
     │    │    │        │    │        │    │         │    │        │
     └────┘    └────────┘    └────────┘    └─────────┘    └────────┘
      Stage     Pipeline      Pipeline      Pipeline      Pipeline
                Register      Register      Register      Register
```

Each pipeline register holds:
- Data values (operands, results)
- Control signals for remaining stages
- Instruction information (for debugging, exceptions)

## Pipeline Stages in Detail

### Stage 1: Instruction Fetch (IF)

```
PC → Instruction Memory → Instruction
PC ← PC + 4
```

- Read instruction from memory
- Increment PC
- Pass instruction to IF/ID register

### Stage 2: Instruction Decode (ID)

```
Instruction → Decode Logic → Control Signals
Register File → Operands
```

- Decode instruction, generate control signals
- Read source registers
- Sign-extend immediate (if needed)
- Pass values to ID/EX register

### Stage 3: Execute (EX)

```
Operands → ALU → Result
```

- Perform ALU operation
- Calculate memory address (for load/store)
- Calculate branch target
- Pass result to EX/MEM register

### Stage 4: Memory Access (MEM)

```
Address → Data Memory → Data (load)
Address, Data → Data Memory (store)
```

- Access data memory if needed
- Pass data to MEM/WB register
- For non-memory instructions, just pass through

### Stage 5: Write Back (WB)

```
Result → Register File
```

- Write result to destination register
- Select between ALU result and memory data

## Pipeline Timing

The clock period is determined by the **slowest stage**:

```
T_clock = max(T_IF, T_ID, T_EX, T_MEM, T_WB) + T_register
```

**Example stage times**:
| Stage | Time |
|-------|------|
| IF | 200 ps |
| ID | 100 ps |
| EX | 150 ps |
| MEM | 200 ps |
| WB | 100 ps |
| Register | 20 ps |

```
T_clock = 200 + 20 = 220 ps
```

Compare to single-cycle: 750 ps total

Speedup = 750 / 220 ≈ 3.4× (not 5× due to unbalanced stages)

## Pipeline Hazards: A Preview

Pipelining introduces complications called **hazards**:

### Structural Hazards
Multiple instructions need the same resource simultaneously.

### Data Hazards
An instruction needs data that isn't available yet.

```
add $t0, $t1, $t2    ; Writes $t0
sub $t3, $t0, $t4    ; Needs $t0 - but it's not written yet!
```

### Control Hazards
Branch decisions aren't known until late in the pipeline.

```
beq $t0, $t1, target
add $t2, $t3, $t4    ; Should this execute? Don't know yet!
```

These hazards can cause **stalls** (pipeline bubbles) that reduce performance. We'll cover solutions in subsequent sections.

## Pipeline Performance

### Ideal CPI

In a perfectly balanced, hazard-free pipeline:
```
CPI = 1
```

One instruction completes per cycle once the pipeline is full.

### Real-World CPI

With hazards and stalls:
```
CPI = 1 + stall_cycles_per_instruction
```

Modern processors achieve CPI close to 1 (or even < 1 with superscalar designs) through sophisticated hazard handling.

## Why Pipelining Works

Pipelining succeeds because:

1. **Instructions are independent** (mostly)
2. **Stages are roughly equal** in complexity
3. **Memory is fast enough** (with caches)
4. **Hazards can be handled** (forwarding, prediction)

Pipelining doesn't reduce **latency** (time for one instruction) but dramatically improves **throughput** (instructions per unit time).

## Key Takeaways

- Pipelining overlaps instruction execution for higher throughput
- Classic 5-stage pipeline: IF, ID, EX, MEM, WB
- Pipeline registers hold data and control between stages
- Clock period limited by slowest stage
- Theoretical speedup equals number of stages
- Hazards (structural, data, control) reduce actual performance
- Ideal CPI = 1; real CPI slightly higher due to stalls
- Pipelining improves throughput, not latency
