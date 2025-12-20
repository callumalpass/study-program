---
id: cs102-t1-place-value-and-bases
title: "Place Value and Bases"
order: 2
---

# Place Value and Bases

Before you convert numbers, you need to be fluent in **place value**: the idea that digits have different weights depending on their position. This concept is so fundamental to our number system that we often take it for granted, but understanding it deeply is essential for working with any base.

## The Power of Positional Notation

Positional notation is one of humanity's great intellectual achievements. Ancient Romans wrote numbers like MCMLXXIV (1974), where each symbol has a fixed value regardless of position. This made arithmetic extremely difficult. Try multiplying XLVII by XXIII without converting to our modern system!

In positional notation, the same digit means different things based on where it appears. The "5" in "500" represents five hundred, while the "5" in "50" represents fifty, and in "5" it's just five. This simple insight makes arithmetic algorithms possible.

## The General Formula

In any base **b**, a number with digits `dₖ dₖ₋₁ ... d₂ d₁ d₀` represents:

```
Value = Σ (dᵢ × bⁱ) for i = 0 to k
      = dₖ×bᵏ + dₖ₋₁×bᵏ⁻¹ + ... + d₂×b² + d₁×b¹ + d₀×b⁰
```

Where:
- **b** is the base (2, 8, 10, 16, etc.)
- **dᵢ** is the digit value at position i (must be in range 0 to b-1)
- Position 0 is the rightmost (least significant) digit
- Each position's weight is the base raised to that position's power

### Detailed Decimal Example

Let's expand `3057₁₀` step by step:

```
Position:     3      2      1      0
Digit:        3      0      5      7
Weight:      10³    10²    10¹    10⁰
           =1000   =100   =10    =1

Value = 3×1000 + 0×100 + 5×10 + 7×1
      = 3000 + 0 + 50 + 7
      = 3057
```

Notice that position 0 always has weight b⁰ = 1, regardless of the base. This is why the rightmost digit is sometimes called the "units" digit.

### Detailed Binary Example

Now let's expand `11001₂`:

```
Position:     4      3      2      1      0
Digit:        1      1      0      0      1
Weight:      2⁴     2³     2²     2¹     2⁰
           =16     =8     =4     =2     =1

Value = 1×16 + 1×8 + 0×4 + 0×2 + 1×1
      = 16 + 8 + 0 + 0 + 1
      = 25₁₀
```

### Detailed Hexadecimal Example

For `2AF₁₆`:

```
Position:     2      1      0
Digit:        2      A      F
Digit Value:  2     10     15
Weight:      16²    16¹    16⁰
           =256    =16    =1

Value = 2×256 + 10×16 + 15×1
      = 512 + 160 + 15
      = 687₁₀
```

## Digits vs Values in Different Bases

A critical concept: in any base b, each digit must have a value less than b. The digit "symbols" we use are:

- **Decimal**: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 (ten symbols for base 10)
- **Binary**: 0, 1 (two symbols for base 2)
- **Octal**: 0, 1, 2, 3, 4, 5, 6, 7 (eight symbols for base 8)
- **Hexadecimal**: 0-9 and A-F (sixteen symbols for base 16)

In hex, we ran out of single-character numerals after 9, so we borrowed letters:

| Symbol | Numeric Value |
|--------|--------------|
| A (or a) | 10 |
| B (or b) | 11 |
| C (or c) | 12 |
| D (or d) | 13 |
| E (or e) | 14 |
| F (or f) | 15 |

So when you see `0xFF`, you're looking at:

```
F×16 + F×1 = 15×16 + 15×1 = 240 + 15 = 255
```

This is the maximum value for an 8-bit unsigned integer—not a coincidence!

## Common Notations in Programming

Different programming languages and contexts use different notation to indicate bases:

| Notation | Meaning | Example | Decimal Value |
|----------|---------|---------|---------------|
| `1010₂` | Subscript (math) | Binary 1010 | 10 |
| `0b1010` | Prefix (C/Python/Rust) | Binary 1010 | 10 |
| `0o17` | Prefix (Python 3) | Octal 17 | 15 |
| `017` | C octal (dangerous!) | Octal 17 | 15 |
| `0x2F` | Prefix (C/Python/Java) | Hex 2F | 47 |
| `2Fh` | Suffix (assembly) | Hex 2F | 47 |
| `$2F` | Prefix (some assemblers) | Hex 2F | 47 |
| `#2F` | Prefix (CSS colors) | Hex 2F | 47 |

The C-style octal notation `017` is notorious for causing bugs. A programmer might write `010` thinking it's ten, but C interprets it as octal 10 = decimal 8. Python 3 fixed this by requiring `0o` for octal.

## Essential Powers to Memorize

Fluency in number systems requires having certain values at your fingertips. Memorize these:

### Powers of 2
```
2⁰ = 1       2⁵ = 32      2¹⁰ = 1024 (≈1K)
2¹ = 2       2⁶ = 64      2¹⁶ = 65536 (64K)
2² = 4       2⁷ = 128     2²⁰ = 1048576 (≈1M)
2³ = 8       2⁸ = 256     2³⁰ ≈ 1 billion (≈1G)
2⁴ = 16      2⁹ = 512     2³² = 4294967296 (4G)
```

### Powers of 16
```
16⁰ = 1
16¹ = 16
16² = 256
16³ = 4096
16⁴ = 65536
```

### Key Observations
- 2¹⁰ = 1024 ≈ 10³ (this is why 1 KB is roughly 1000 bytes)
- 2²⁰ ≈ 10⁶ (1 MB ≈ 1 million bytes)
- 16² = 256 = 2⁸ (two hex digits = one byte)
- 16⁴ = 65536 = 2¹⁶ (four hex digits = two bytes)

## Quick Size Estimates

With these powers memorized, you can quickly estimate:

**Unsigned ranges:**
- 8 bits: 0 to 2⁸-1 = 0 to 255
- 16 bits: 0 to 2¹⁶-1 = 0 to 65,535
- 32 bits: 0 to 2³²-1 ≈ 0 to 4.3 billion
- 64 bits: 0 to 2⁶⁴-1 ≈ 0 to 18 quintillion

**Hex digits needed:**
- 1 byte (8 bits) → 2 hex digits (00 to FF)
- 2 bytes (16 bits) → 4 hex digits (0000 to FFFF)
- 4 bytes (32 bits) → 8 hex digits (00000000 to FFFFFFFF)
- 8 bytes (64 bits) → 16 hex digits

## Fractional Positions (Brief Introduction)

Place value extends to positions right of the "decimal point" too. Just as 0.5 in decimal means 5×10⁻¹ = 5/10, in binary:

```
0.1₂ = 1×2⁻¹ = 0.5₁₀
0.01₂ = 1×2⁻² = 0.25₁₀
0.11₂ = 1×2⁻¹ + 1×2⁻² = 0.5 + 0.25 = 0.75₁₀
```

This becomes important when studying floating-point representation, where we'll see that many "simple" decimal fractions (like 0.1) cannot be represented exactly in binary.

## Key Takeaways

- **Place value works identically across all bases**; only the base changes the weights.
- Each digit position has weight = base^position, counting from 0 on the right.
- Hex digits A-F represent values 10-15, not letters—treat them as numbers.
- Memorizing powers of 2 and 16 makes mental conversion and debugging much faster.
- Different programming contexts use different notations (`0x`, `0b`, `0o`, subscripts); learn to recognize them all.
- Understanding place value deeply prepares you for two's complement, floating-point, and memory addressing topics.

