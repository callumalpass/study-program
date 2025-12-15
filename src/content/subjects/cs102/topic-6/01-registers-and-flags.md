# Assembly Basics: Registers and Flags

Assembly language is a human-readable view of machine instructions. Different CPUs have different instruction sets, but common concepts repeat: registers, flags, and simple operations.

## Registers

Registers are the CPU’s working variables. Assembly instructions typically operate on registers.

You’ll commonly see:
- general-purpose registers (e.g., R0–R15, or AX/BX/CX/DX historically)
- special registers: PC (program counter), SP (stack pointer)

## Flags (status bits)

Many CPUs maintain a **status register** containing flags that reflect the result of operations. Common flags:
- **ZF** (Zero Flag): set when result is 0
- **SF/NF** (Sign/Negative): set when result is negative (signed)
- **CF** (Carry Flag): carry out / borrow (unsigned)
- **OF** (Overflow Flag): signed overflow occurred

### Why flags matter

Conditional branches often check flags:
- `JE`/`BEQ` jumps if “equal” (often via ZF = 1)
- `JLT`/`BLT` uses sign/overflow combinations for signed comparisons

## Example: compare and branch

Conceptual:

```
CMP R0, #0   ; sets flags as if R0 - 0
JE  zero
```

If R0 is 0, ZF becomes 1, and the jump is taken.

## Key takeaways

- Registers are where assembly computes; memory is accessed explicitly.
- Flags summarize results and drive conditional control flow.
- Understanding CF vs OF matters for unsigned vs signed comparisons.

