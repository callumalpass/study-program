# Overflow, Carry, and Signed vs Unsigned

One of the most important CS102 skills is distinguishing **carry** from **overflow**, and knowing when each one matters.

## Carry (unsigned perspective)

For **unsigned** addition, a carry out of the most significant bit means the result doesn’t fit in the fixed width.

Example (4-bit unsigned):

`1111₂ (15) + 0001₂ (1) = 1 0000₂ (16)`

If you store only 4 bits, you keep `0000` and drop the carry, which is wrong for the mathematical result.

## Overflow (signed perspective)

For **signed** two’s complement addition, overflow occurs when:
- You add two positives and get a negative, or
- You add two negatives and get a positive.

Equivalent bit rule:
- Overflow happens when the carry into the sign bit differs from the carry out of the sign bit.

Example (4-bit signed range is -8..7):

`0111 (7) + 0001 (1) = 1000 (-8)` → overflow

We know 8 is out of range for 4-bit signed.

## Why “positive + negative” can’t overflow (in two’s complement)

If one operand is positive and the other is negative, the mathematical result must lie between them, which is always within range of the larger magnitude if both were representable. In two’s complement, overflow requires the operands to have the **same sign**.

## Practical implication

The same bit pattern can mean different numbers:
- `1000` as unsigned is 8
- `1000` as signed (4-bit two’s complement) is -8

So when you see a register value, you must know whether the operation treats it as signed or unsigned.

## Key takeaways

- Carry is about unsigned overflow; overflow is about signed overflow.
- Signed overflow requires operands with the same sign.
- Always interpret bits with a chosen width and signedness.

