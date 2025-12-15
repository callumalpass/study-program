# Tracing a Simple Program (Putting Architecture Together)

Tracing means following the state of registers, memory, and control flow step-by-step. It’s a core CS102 exam skill and also how you debug low-level problems.

## A tiny pseudo-assembly example

Assume registers `R0`, `R1`, and `R2`:

```
MOV R0, #5
MOV R1, #7
ADD R2, R0, R1
```

Trace:
1. `MOV R0, #5` → R0 becomes 5
2. `MOV R1, #7` → R1 becomes 7
3. `ADD R2, R0, R1` → R2 becomes 12

## Add a branch

```
CMP R2, #10
JGT big
MOV R0, #0
JMP end
big:
MOV R0, #1
end:
```

If `R2=12`, then `CMP` sets flags so `JGT` jumps to `big`, and `R0` becomes 1.

## What to track while tracing

- PC: which instruction is next?
- Registers: what changes each step?
- Flags: how do comparisons affect branches?
- Memory (when present): what addresses are read/written?

## Key takeaways

- Tracing is systematic: track PC, registers, flags, and memory.
- Branches depend on flags set by compare/subtract operations.
- The tracing mindset carries directly into assembly and debugging later in CS102.

