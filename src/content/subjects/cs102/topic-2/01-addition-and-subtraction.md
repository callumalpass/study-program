# Binary Addition and Subtraction

Binary arithmetic is the foundation for understanding overflow, two’s complement, and how the ALU operates. The rules are simple, but you need to practice carrying and borrowing accurately.

## Binary addition (carry)

The 1-bit addition table:

| A | B | Sum | Carry |
|---|---|-----|-------|
| 0 | 0 |  0  |   0   |
| 0 | 1 |  1  |   0   |
| 1 | 0 |  1  |   0   |
| 1 | 1 |  0  |   1   |

Example:

```
  101101
+ 011011
--------
 1001000
```

Work right-to-left just like decimal. The only difference is that `1+1=10₂`.

## Binary subtraction (borrow)

The 1-bit subtraction table:

| A | B | Diff | Borrow |
|---|---|------|--------|
| 0 | 0 |  0   |   0    |
| 1 | 0 |  1   |   0    |
| 1 | 1 |  0   |   0    |
| 0 | 1 |  1   |   1    |

That last row means: `0 - 1` requires borrowing from the next bit to the left.

Example:

```
  10010
-  01101
--------
   00101
```

Check in decimal: `18 - 13 = 5`.

## Quick sanity checks

- Adding a number to itself is a left shift by 1: `x + x = x << 1`.
- If you add two numbers and the result has fewer bits than expected, you likely dropped a carry.

## Key takeaways

- Binary addition uses carry just like decimal; the base is 2.
- Binary subtraction uses borrow; careful bookkeeping prevents most errors.
- Always verify with a quick decimal check when learning.

