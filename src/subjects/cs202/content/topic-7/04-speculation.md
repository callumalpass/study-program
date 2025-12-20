---
id: cs202-t7-speculation
title: "Speculative Execution"
order: 4
---

# Speculative Execution

**Speculative execution** is the technique of executing instructions before knowing whether they should execute. The processor "speculates" on the outcome of branches, memory operations, and other conditions, then recovers if the speculation was wrong. This is essential for maintaining high throughput in the face of control flow uncertainty.

## Why Speculate?

### The Branch Problem

```
                   Branch
                     │
        ┌────────────┴────────────┐
        │                         │
      Taken                   Not Taken
        │                         │
    Instructions              Instructions
    A, B, C                   D, E, F

Without speculation:
- Wait for branch resolution (5-20 cycles)
- Pipeline empties, IPC drops

With speculation:
- Predict one path
- Execute that path speculatively
- Very high hit rate (95%+) → rarely wrong
```

### Speculation Enables Deep Pipelines

```
Branch resolves in EX stage (cycle 3)
20-stage pipeline:

Without speculation:
Fetch → 17 stages of nothing → EX → resolved
IPC ≈ 0.05 (waiting for branches!)

With speculation:
Fetch predicted path immediately
If correct: No penalty
If wrong: Flush 17 instructions (rare)
IPC ≈ 2.0+ typical
```

## Types of Speculation

### Control Speculation (Branch Prediction)

Predict branch direction and target:

```
Branch prediction:
beq $t0, $t1, target

Prediction: Taken → target
Actual: Taken → target ← Correct! No penalty.

Prediction: Taken → target
Actual: Not Taken ← Wrong! Flush speculative work.
```

### Data Speculation

Predict data values or memory dependencies:

**Load Value Prediction**:
```
lw $t0, 0($a0)    ; Predict $t0 = 42
use $t0           ; Execute with predicted value

If actual value = 42: Correct speculation
If actual value ≠ 42: Squash and re-execute
```

**Memory Dependency Prediction**:
```
sw $t0, 0($a0)    ; Store to unknown address
lw $t1, 0($a1)    ; Load from unknown address

Predict: Different addresses → Execute load early
Verify: Check if addresses actually differ
```

## Speculative Pipeline

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                 Speculative Out-of-Order CPU                │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │               Branch Predictor                        │   │
│  └────────────────────┬─────────────────────────────────┘   │
│                       │                                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │    Fetch (speculative path)                          │   │
│  └────────────────────┬─────────────────────────────────┘   │
│                       │                                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │    Decode + Rename (add to ROB)                      │   │
│  └────────────────────┬─────────────────────────────────┘   │
│                       │                                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │    Issue + Execute (speculative)                     │   │
│  └────────────────────┬─────────────────────────────────┘   │
│                       │                                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │    Reorder Buffer (holds speculative results)        │   │
│  └────────────────────┬─────────────────────────────────┘   │
│                       │                                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │    Commit (in-order, only non-speculative)           │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Reorder Buffer Role

ROB maintains program order for speculative instructions:

```
┌───────────────────────────────────────────────────────────┐
│                    Reorder Buffer                         │
├─────┬──────┬──────────┬───────┬───────────┬──────────────┤
│ ROB │ Inst │ Specul?  │ Done? │ Exception │ Value        │
├─────┼──────┼──────────┼───────┼───────────┼──────────────┤
│  0  │ add  │   No     │ Yes   │    No     │    42        │ ← Commit
│  1  │ beq  │   No     │ Yes   │    No     │   T/NT       │
│  2  │ sub  │   Yes    │ Yes   │    No     │    17        │ ← Speculative
│  3  │ mul  │   Yes    │ Yes   │    No     │    99        │ ← Speculative
│  4  │ div  │   Yes    │  No   │    ?      │    --        │ ← Speculative
└─────┴──────┴──────────┴───────┴───────────┴──────────────┘
 HEAD                                                    TAIL

Entry 0: Ready to commit (not speculative)
Entry 1: Branch, when resolved, entries 2-4 become non-speculative (or flushed)
```

## Handling Mispredictions

### Detection

Branch misprediction detected when branch executes:

```
Branch at ROB entry 5:
Predicted: Taken to 0x1000
Actual: Not Taken (falls through)

Misprediction detected!
```

### Recovery Process

```
1. Mark all instructions after mispredicted branch invalid
2. Restore register rename table to pre-branch state
3. Redirect fetch to correct path
4. Continue execution

Timeline:
Cycle N:   Branch executes, misprediction detected
Cycle N+1: Start recovery, flush pipeline
Cycle N+2: Restore state
Cycle N+3: Fetch from correct address
Cycle N+4+: Resume normal execution
```

### Recovery Cost

```
Misprediction penalty = Pipeline depth × issue width

15-stage, 4-wide pipeline:
- Up to 60 instructions in flight
- All speculative ones flushed
- 15-20 cycle penalty typical
```

## Speculative State Management

### Checkpointing

Save state at speculation points:

```
At each branch:
┌─────────────────────────────────────────┐
│            Checkpoint N                  │
├─────────────────────────────────────────┤
│ RAT copy (register mappings)            │
│ Branch target                           │
│ Next PC                                 │
│ ROB tail pointer                        │
└─────────────────────────────────────────┘

On misprediction:
Restore checkpoint, continue from there
```

### Memory Speculation

Store buffer handles speculative stores:

```
Speculative stores:
- Write to store buffer, not memory
- Mark as speculative
- Only write to cache/memory on commit

lw after speculative sw:
- Forward from store buffer if addresses match
- Speculate independence if addresses might differ
```

## Exception Handling

### Precise Exceptions

Speculative execution must maintain precise exceptions:

```
Non-speculative instruction at ROB head:
- Exception → Take exception immediately
- Update PC, save state

Speculative instruction causes exception:
- Don't take exception yet
- Mark in ROB
- If speculation correct → Take when it reaches head
- If speculation wrong → Discard (never happened)
```

### Example Scenario

```
Program:
1: beq  $t0, $zero, skip
2: div  $t1, $t2, $zero    ← Division by zero!
3: add  $t3, $t4, $t5
skip:
4: sub  $t6, $t7, $t8

Case 1: Branch predicted not taken (correct)
- div executed speculatively
- Exception stored in ROB
- div reaches ROB head
- Exception taken!

Case 2: Branch predicted not taken (wrong, should be taken)
- div executed speculatively
- Exception stored in ROB
- Branch resolves: Misprediction!
- div flushed (exception never happened)
```

## Security Implications

### Spectre and Meltdown

Speculative execution can leak information:

```
if (x < array_size) {
    y = array[x];
    z = array2[y * 256];  // Cache timing side channel
}

Attack:
1. Attacker provides out-of-bounds x
2. Bounds check fails (eventually)
3. But speculative execution reads array[x]
4. Cache state changes based on secret data
5. Attacker measures cache timing
6. Infers secret value!
```

### Mitigations

```
- Speculative load hardening
- Retpoline (indirect branch protection)
- IBRS/STIBP (hardware mitigations)
- Flushing microarchitectural state
- Compiler barriers
```

## Performance Impact

### Benefits

```
Without speculation (in-order, stall on branches):
Branches: 15% of instructions
Branch resolution: 10 cycles
IPC ≈ 1 / (1 + 0.15 × 10) = 0.4

With 95% accurate speculation:
Penalty only on mispredictions: 5% × 10 = 0.5 cycles average
IPC ≈ 1 / (1 + 0.5) = 0.67 (67% better!)

With superscalar and OoO:
IPC can reach 2-3
```

### Cost of Misprediction

```
Misprediction rate: 5%
Misprediction penalty: 20 cycles
Branch frequency: 15%

CPI increase = 0.05 × 20 × 0.15 = 0.15 cycles/instruction

Still much better than not speculating!
```

## Key Takeaways

- Speculation executes instructions before knowing if they should execute
- Essential for hiding branch latency in deep pipelines
- Branch prediction provides control speculation (~95% accuracy)
- Reorder buffer holds speculative results until commit
- Recovery flushes wrong-path work and restores state
- Checkpointing enables fast recovery
- Precise exceptions maintained despite speculation
- Store buffer handles speculative memory operations
- Security vulnerabilities (Spectre/Meltdown) arise from speculation
- Net performance benefit is substantial despite misprediction costs

