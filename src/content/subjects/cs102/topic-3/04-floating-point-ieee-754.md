# Floating Point (IEEE-754) Essentials

Floating point representation is how computers approximate real numbers. The most common format is **IEEE-754**.

## The three parts

A (single-precision) float uses 32 bits:

- 1 bit sign (S)
- 8 bits exponent (E) with a bias of 127
- 23 bits fraction/mantissa (F)

The value is:

`(-1)^S × 1.F × 2^(E - 127)` for normal numbers

The `1.` is *implicit* for normal values (called the “hidden bit”).

## Example: 1.0

For `1.0`:
- sign = 0
- exponent = 127 (so exponent-bias = 0)
- fraction = 0

So it’s exactly `1.0 × 2^0 = 1.0`

## Why floats are approximate

Some decimal fractions don’t have a finite binary representation (just like 1/3 doesn’t have a finite decimal representation). For example, `0.1` is repeating in binary, so it must be rounded.

That leads to:
- Rounding error
- Non-intuitive comparisons (`0.1 + 0.2` may not equal `0.3` exactly)

## Special values

IEEE-754 reserves patterns for:
- `+0` and `-0`
- infinities
- NaN (not-a-number)

You don’t need every bit rule memorized, but you should understand that the system must represent exceptional values.

## Key takeaways

- Floats store sign, exponent, and fraction with a bias and an implicit leading 1 for normal values.
- Many decimals are not exactly representable in binary.
- Floating point arithmetic is about approximation, not exact real-number math.

