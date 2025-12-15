# Control Flow: Branches, Jumps, and Loops

At the machine level, control flow is built from a small set of primitives:
- unconditional jump
- conditional branch
- compare/test instructions that set flags

## Unconditional jump

`JMP label` updates PC to the instruction at `label`.

## Conditional branch

Conditional jumps depend on flags:

```
CMP R0, #10
JE  equal
JL  less
JG  greater
```

The exact mnemonics vary, but the pattern is stable: compare sets flags, branch tests them.

## Loops in assembly

A loop is a branch back to an earlier address:

```
MOV R0, #0        ; i = 0
loop:
ADD R0, R0, #1    ; i++
CMP R0, #10
JL  loop
```

Tracing strategy:
- Identify loop counter register(s)
- Identify termination condition
- Track how flags are set each iteration

## “If/else” in assembly

High-level `if` becomes:
1. Compare/test
2. Conditional jump over a block
3. Optional jump around the “else” block

Recognizing these shapes is crucial for reverse engineering projects like a “binary bomb”.

## Key takeaways

- Control flow is compare/test + conditional branch + unconditional jump.
- Loops are backward branches with an evolving state (counter, pointer, etc.).
- If/else structures are recognizable patterns in assembly.

