# Worked Examples and Self-Checks

This subtopic ties together addition, subtraction, two’s complement, and overflow with a few representative examples.

## Example 1: Unsigned addition with carry

Compute in 8-bit unsigned:

`250 + 10`

`250₁₀ = 11111010₂`
` 10₁₀ = 00001010₂`

Add:

`11111010 + 00001010 = 1 00000100`

Stored 8-bit result: `00000100₂ = 4₁₀` with carry out → indicates unsigned overflow.

## Example 2: Signed addition without overflow

Compute in 8-bit signed:

`50 + (-20)`

`50 = 00110010`
`20 = 00010100` → `-20` is invert+1 → `11101100`

`00110010 + 11101100 = 00011110`

`00011110₂ = 30₁₀` (signed), no overflow (operands had different signs).

## Example 3: Signed overflow

In 4-bit signed (-8..7), compute `7 + 3`:

`7 = 0111`
`3 = 0011`

`0111 + 0011 = 1010`

As 4-bit signed, `1010` is `-6`, which is not the mathematical answer (10). Overflow occurred.

## Self-check strategy

When you’re unsure:
1. Convert to decimal and verify the math.
2. Confirm fixed width: are you working in 4-bit, 8-bit, 16-bit?
3. Decide signedness: signed (two’s complement) or unsigned?
4. For signed addition, check operand signs to detect overflow.

## Key takeaways

- Always reason in a fixed width and signedness.
- Carry indicates unsigned overflow; sign flips indicate signed overflow.
- Quick decimal verification prevents small binary mistakes from snowballing.

