# Place Value and Bases

Before you convert numbers, you need to be fluent in **place value**: the idea that digits have different weights depending on their position.

## Positional notation

In any base **b**, a number with digits `d_k ... d_2 d_1 d_0` represents:

`Σ (d_i × b^i)` for `i = 0..k`

Where:
- `b` is the base (2, 8, 10, 16, …)
- `d_i` is the digit value in that base (must be `< b`)

### Example (base 10)

`3057₁₀ = 3×10^3 + 0×10^2 + 5×10^1 + 7×10^0`

### Example (base 2)

`11001₂ = 1×2^4 + 1×2^3 + 0×2^2 + 0×2^1 + 1×2^0 = 16 + 8 + 1 = 25₁₀`

## Digits vs values (especially in hex)

In hex, the symbols `A..F` are digits with numeric values:

`A=10, B=11, C=12, D=13, E=14, F=15`

So:

`2F₁₆ = 2×16^1 + 15×16^0 = 32 + 15 = 47₁₀`

## Interpreting common notations

You’ll see different notations in code and documentation:

- `1010₂` (subscript)
- `0b1010` (binary literal in many languages)
- `0x2F` (hex literal)
- `075` (octal literal in some languages, historically in C)

In CS102 content, when you see `0x`, read it as “hex”.

## Practice mental model

It helps to memorize a few powers:

- Powers of 2: `2^0=1`, `2^1=2`, `2^2=4`, `2^3=8`, `2^4=16`, `2^5=32`, `2^6=64`, `2^7=128`, `2^8=256`
- Powers of 16: `16^0=1`, `16^1=16`, `16^2=256`, `16^3=4096`

With these, you can quickly estimate sizes and ranges:
- 8 bits (1 byte) unsigned range: `0..255` (`2^8-1`)
- 16 bits unsigned range: `0..65535` (`2^16-1`)

## Key takeaways

- Place value works the same across bases; only the base changes.
- Hex digits are values 0–15, not just “letters”.
- Memorizing small powers (2 and 16) makes conversion and debugging faster.

