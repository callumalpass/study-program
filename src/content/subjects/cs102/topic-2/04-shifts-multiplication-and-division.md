# Shifts, Multiplication, and Division Intuition

Many operations become simpler when you view binary numbers as weighted bits. Shifts are particularly important in low-level programming and performance work.

## Left shift (multiply by 2)

Shifting left by 1 multiplies by 2 (for unsigned, ignoring overflow):

`00101101₂ (45) << 1 = 01011010₂ (90)`

Shifting left by k multiplies by `2^k`:

`x << k = x × 2^k`

## Right shift (divide by 2)

Shifting right by 1 divides by 2 and drops the remainder (for unsigned):

`01011010₂ (90) >> 1 = 00101101₂ (45)`

### Logical vs arithmetic right shift

- **Logical right shift** fills with 0s on the left (used for unsigned).
- **Arithmetic right shift** copies the sign bit on the left (commonly used for signed two’s complement).

Example (8-bit):

`11111000` might represent `-8` in two’s complement.

Arithmetic right shift by 1:

`11111000 >> 1 = 11111100` (still negative)

This approximates division by 2 for signed numbers (with rounding rules depending on language/hardware).

## Multiplication and division by powers of two

For powers of two, shifts are exact and fast:
- Multiply by 8 → `x << 3`
- Divide by 4 → `x >> 2` (careful for signed and rounding)

But for general multiplication/division, CPUs use more complex circuits (multipliers/dividers), though compilers may still optimize when possible.

## Key takeaways

- Left shift multiplies by powers of two; right shift divides by powers of two.
- Signed right shifts require knowing whether they’re arithmetic or logical.
- Shifts are core to bit masks, arithmetic tricks, and low-level optimization.

