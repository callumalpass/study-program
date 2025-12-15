# Integers: Ranges, Signedness, and Overflow

An integer in a computer is not “an infinite mathematical integer”. It is a **fixed-width bit pattern**. Understanding what that implies is essential for debugging, security, and low-level programming.

## Fixed width and ranges

With **N bits**, you have exactly `2^N` distinct patterns.

### Unsigned

Unsigned values represent `0 .. 2^N - 1`.

Example (8-bit unsigned): `0 .. 255`

### Signed (two’s complement)

Signed two’s complement values represent:

`-2^(N-1) .. 2^(N-1) - 1`

Example (8-bit signed): `-128 .. 127`

## Same bits, different meaning

The bit pattern `11111111` can mean:
- Unsigned: 255
- Signed (8-bit two’s complement): -1

So you always need context: is the value interpreted as signed or unsigned?

## Overflow is not “a bug” in hardware—it’s a fact of fixed width

If an operation produces a value outside the representable range, the stored result **wraps** (hardware keeps the low N bits).

Example (8-bit unsigned):

`255 + 1 = 0` (wraps around)

Example (8-bit signed):

`127 + 1 = -128` (wraps in two’s complement)

Many languages expose this differently:
- Some define wrap-around behavior for unsigned types.
- Some leave signed overflow undefined or implementation-dependent.

CS102 focuses on the underlying representation: the hardware keeps N bits.

## Practical debugging patterns

- Unexpected negative values often come from interpreting an unsigned bit pattern as signed (or vice versa).
- Masking (`& 0xFF`, `& 0xFFFF`) is used to force a specific width.

## Key takeaways

- Integers are fixed-width bit patterns with limited ranges.
- Signedness changes interpretation without changing bits.
- Overflow is inevitable in fixed width; you must detect and handle it when correctness matters.

