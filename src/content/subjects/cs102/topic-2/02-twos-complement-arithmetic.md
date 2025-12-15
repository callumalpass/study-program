# Two’s Complement Arithmetic Rules

Computers commonly represent signed integers using **two’s complement**. The key advantage is that the same binary addition hardware works for both positive and negative numbers.

## Two’s complement in one sentence

For an N-bit number:
- The leftmost bit is the **sign bit**.
- Values range from `-2^(N-1)` to `2^(N-1)-1`.

Example for 8 bits: `-128 .. 127`.

## Creating a negative value (from a positive one)

To compute `-x` in two’s complement (fixed width):
1. Write `x` in binary using N bits.
2. Invert all bits.
3. Add 1.

Example: represent `-5` in 8 bits:

`5 = 00000101`
Invert → `11111010`
Add 1 → `11111011`

So `-5` is `11111011` (8-bit two’s complement).

## Adding signed numbers

Binary addition works normally, but you interpret the result as signed.

Example (8-bit): `5 + (-5)`:

`00000101 + 11111011 = 00000000` (carry out is discarded in fixed-width arithmetic)

## The “weird” edge case: most negative number

In 8-bit two’s complement, `10000000` represents `-128`.

If you try to negate it:
- Invert: `01111111`
- Add 1: `10000000` (back to itself)

So `-(-128) = -128` in 8-bit two’s complement because `+128` is not representable.

## Key takeaways

- Two’s complement makes subtraction and negative numbers work with the same adder.
- The representable range is asymmetric by 1 (e.g., -128..127).
- Always reason in a fixed width (8-bit, 16-bit, 32-bit), because overflow depends on width.

