# Advanced Pipelining Concepts

Modern processors go far beyond the basic 5-stage pipeline. This section introduces advanced techniques that achieve higher performance: deeper pipelines, superscalar execution, and out-of-order processing.

## Deep Pipelines (Superpipelining)

### Concept

Increase clock frequency by dividing stages into smaller substages:

**5-stage pipeline** → **15-stage pipeline**

```
Classic:     IF    ID    EX    MEM   WB
            ─────────────────────────────

Superpipe:  IF1 IF2 IF3 ID1 ID2 EX1 EX2 EX3 MEM1 MEM2 MEM3 WB1 WB2 WB3 WB15
            ─────────────────────────────────────────────────────────────────
```

### Benefits

- **Higher clock frequency**: Shorter critical paths
- **Increased throughput**: More instructions in flight

### Drawbacks

- **Longer branch penalty**: More stages to flush
- **More hazards**: Dependencies span more cycles
- **More forwarding paths**: Complexity increases
- **Power consumption**: More pipeline registers

### Examples

| Processor | Year | Pipeline Stages |
|-----------|------|-----------------|
| MIPS R4000 | 1991 | 8 |
| Intel Pentium 4 | 2000 | 20-31 |
| Intel Core | 2006 | 14 |
| ARM Cortex-A77 | 2019 | 13 |

## Superscalar Execution

### Concept

Fetch and execute **multiple instructions per cycle**:

```
            Cycle 1      Cycle 2      Cycle 3
Pipe 0:     add          sub          mul
Pipe 1:     lw           sw           and
```

A 2-wide superscalar processor can execute 2 IPC (instructions per cycle) ideally.

### Requirements

1. **Multiple fetch**: Wide instruction fetch (32+ bytes)
2. **Multiple decode**: Parallel decoders
3. **Hazard detection**: Check all pairs of instructions
4. **Multiple execution units**: ALUs, load/store units, etc.
5. **Register file ports**: Multiple reads and writes per cycle

### Issue Width

| Width | Description | Examples |
|-------|-------------|----------|
| 2-wide | Issue 2 instructions/cycle | ARM Cortex-A53 |
| 4-wide | Issue 4 instructions/cycle | Intel Core, Apple M1 |
| 6-wide | Issue 6 instructions/cycle | AMD Zen 3 |
| 8-wide | Issue 8 instructions/cycle | Apple M2 (peak) |

### Limitations

**True dependencies** limit parallelism:

```nasm
add $t0, $t1, $t2    ; ─┐
sub $t3, $t0, $t4    ;  ├─ Can't issue together
mul $t5, $t0, $t6    ; ─┘
```

**Resource conflicts**: Only one ALU operation if only one ALU

**Branches**: Limit the instruction window

Typical IPC achieved: 1.5-2.5 (not the theoretical 4-8)

## Out-of-Order (OoO) Execution

### In-Order Limitations

```nasm
lw   $t0, 0($t1)     ; Cache miss - stalls!
add  $t2, $t3, $t4   ; Independent but blocked
sub  $t5, $t6, $t7   ; Independent but blocked
mul  $t8, $t0, $t9   ; Dependent on load
```

In-order: Everything waits for the load.

### Out-of-Order Solution

Execute instructions as soon as their operands are ready:

```nasm
lw   $t0, 0($t1)     ; Issue, wait for memory
add  $t2, $t3, $t4   ; Execute immediately!
sub  $t5, $t6, $t7   ; Execute immediately!
mul  $t8, $t0, $t9   ; Wait for load, then execute
```

### OoO Pipeline Stages

```
       ┌──────┐  ┌────────┐  ┌──────────┐  ┌─────────┐  ┌────────┐
Fetch ─► Decode ─► Rename  ─► Dispatch ──► Execute  ──► Commit
       └──────┘  └────────┘  └──────────┘  └─────────┘  └────────┘
                                  │              │
                                  ▼              │
                           ┌─────────────┐       │
                           │ Issue Queue │◄──────┘
                           │ (wait for   │
                           │  operands)  │
                           └─────────────┘
```

### Register Renaming

Eliminate WAR and WAW hazards by renaming registers:

```nasm
; Original (has WAR hazard on $t1)
add $t1, $t2, $t3
sub $t4, $t1, $t5
add $t1, $t6, $t7    ; WAW: overwrites $t1

; After renaming
add P1, $t2, $t3     ; $t1 → P1
sub $t4, P1, $t5     ; Use renamed P1
add P2, $t6, $t7     ; $t1 → P2 (new mapping)
```

Physical registers (P1, P2, ...) >> architectural registers.

### Reorder Buffer (ROB)

Maintains program order for:
- **Precise exceptions**: Know which instructions completed
- **Branch misprediction recovery**: Know what to flush
- **Correct memory ordering**: Ensure stores appear in order

```
┌─────────────────────────────────────────────────┐
│                 Reorder Buffer                   │
├─────┬─────────┬────────┬──────────┬────────────┤
│ Ptr │ Instr   │ Dest   │ Value    │ Completed? │
├─────┼─────────┼────────┼──────────┼────────────┤
│  0  │ add t1  │  $t1   │  42      │    Yes     │
│  1  │ lw t2   │  $t2   │  --      │    No      │
│  2  │ sub t3  │  $t3   │  17      │    Yes     │
│  3  │ mul t4  │  $t4   │  --      │    No      │
└─────┴─────────┴────────┴──────────┴────────────┘
       Head                            Tail
```

**Commit**: When instruction at head is complete, update architectural state.

## Speculative Execution

### Concept

Execute instructions before knowing if they should execute:

```nasm
beq $t0, $t1, skip
add $t2, $t3, $t4    ; Execute speculatively
sub $t5, $t6, $t7    ; Execute speculatively
skip:
```

### Requirements

1. **Branch prediction**: Guess which way branch goes
2. **Speculative state**: Don't commit results until confirmed
3. **Recovery mechanism**: Flush if prediction wrong

### Benefits

- Hides branch latency
- Enables deeper out-of-order execution
- Critical for high performance

### Risks

- **Wasted work**: Wrong path execution
- **Security**: Spectre/Meltdown vulnerabilities exploit speculative execution

## Memory Disambiguation

Out-of-order execution of loads and stores is tricky:

```nasm
sw $t0, 0($t1)    ; Store to unknown address
lw $t2, 0($t3)    ; Load from unknown address
```

Can the load execute before the store? Only if addresses differ!

### Load-Store Queue

Track pending loads and stores:

```
Store Queue: [addr: ?, data: $t0]
Load Queue:  [addr: ?]
```

**Load forwarding**: If load address matches earlier store, forward data.

**Memory ordering**: Ensure correct semantics despite OoO execution.

## VLIW (Very Long Instruction Word)

Alternative to superscalar: compiler schedules parallelism.

```
; VLIW instruction packet (4 operations)
add $t0, $t1, $t2 | mul $t3, $t4, $t5 | lw $t6, 0($t7) | nop
```

### Advantages

- Simpler hardware (no dynamic scheduling)
- Compiler has global view for better scheduling

### Disadvantages

- Code size bloat (NOPs when parallelism unavailable)
- Binary compatibility issues
- Compiler complexity

### Examples

- Intel Itanium (EPIC)
- DSPs (TI C6000)
- Some GPUs

## Performance Comparison

| Technique | Typical IPC | Complexity |
|-----------|-------------|------------|
| 5-stage in-order | 0.5-1.0 | Low |
| Superpipelined | 0.7-1.0 | Medium |
| 2-wide superscalar | 1.0-1.5 | Medium |
| 4-wide OoO | 1.5-2.5 | High |
| 6-wide OoO | 2.0-3.0 | Very High |

## Key Takeaways

- Deep pipelines increase frequency but worsen hazard penalties
- Superscalar issues multiple instructions per cycle
- Out-of-order execution hides latency by executing ready instructions first
- Register renaming eliminates false dependencies (WAR, WAW)
- Reorder buffer ensures precise exceptions and correct commit order
- Speculative execution guesses branch outcomes for continued execution
- Memory disambiguation allows safe out-of-order memory operations
- Modern high-performance CPUs combine all these techniques
