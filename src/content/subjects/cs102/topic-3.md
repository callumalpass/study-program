## Introduction

We can store integers, but what about the rest of the world? Real-world software deals with text, decimals, images, and sound. This topic explains how we encode these complex types of data into the universal language of bits.

**Learning Objectives:**
- Explain how non-integer data is stored in binary
- Understand the IEEE-754 standard for floating-point numbers
- Differentiate between ASCII and Unicode/UTF-8
- Understand Big-Endian vs Little-Endian byte ordering
- Recognize the limits of precision in floating-point math

---

## Core Concepts

### Floating Point (IEEE 754)

Storing decimals (like 3.14) is tricky. We use "scientific notation for binary."
Value = $(-1)^S \times 1.F \times 2^{E-B}$

**32-bit Float Structure:**
- **Sign (1 bit):** 0 for +, 1 for -.
- **Exponent (8 bits):** The scale factor (biased).
- **Mantissa/Fraction (23 bits):** The precision.

**Key Insight:** Floats are not exact. They are approximations.
`0.1 + 0.2 == 0.3` is usually **False** in computers!

### Text Encoding

**ASCII (The Old Standard):**
- 7 bits per character.
- Covers English letters, numbers, and basic symbols.
- A = 65, a = 97, 0 = 48.

**Unicode & UTF-8 (The Modern Standard):**
- **Unicode:** A giant list of every character in human languages (each has a "Code Point" like U+1F600).
- **UTF-8:** A clever way to store those code points.
  - Common English chars use 1 byte (same as ASCII).
  - Other chars use 2, 3, or 4 bytes.
  - Backward compatible with ASCII!

### Endianness

When storing a multi-byte number (like a 32-bit integer) in memory, which byte comes first?
- **Big Endian:** Most significant byte at lowest address (like writing left-to-right).
- **Little Endian:** Least significant byte at lowest address (standard for x86/Intel CPUs).

Example: The number `0x12345678`
- Big Endian memory: `12 34 56 78`
- Little Endian memory: `78 56 34 12`

---

## Common Patterns and Idioms

### The "Null Terminator"
In C and many low-level formats, strings end with a byte of value 0 (`\0`). This marks the end of the text.

### Magic Numbers
File formats often start with specific bytes to identify them.
- JPEG starts with `FF D8`
- PNG starts with `89 50 4E 47` (.PNG)

---

## Common Mistakes and Pitfalls

### Mistake 1: Using Floats for Money
Never use floats for currency! The tiny precision errors add up. Use integers (count in cents) or distinct Decimal types.

### Mistake 2: Confusing Encoding with Font
UTF-8 stores the *character* (the abstract letter). A font determines how it *looks*. If you see "" or empty boxes, your data might be correct, but your font is missing the glyph.

### Mistake 3: Byte Order Confusion
Reading binary data from a file or network? Check the endianness. Network traffic is usually Big Endian; your PC is likely Little Endian.

---

## Best Practices

1. **Always use UTF-8:** Unless you have a specific reason not to, default to UTF-8 for text.
2. **Comparison Epsilon:** When comparing floats, check if they are "close enough," not equal.
   `abs(a - b) < 0.00001`
3. **Know your limits:** A 32-bit integer maxes out at ~2 billion. For global population counts or simplified timestamps, you need 64 bits.

---

## Further Exploration

- **Color:** How computers store color (RGB, Hex codes).
- **Audio:** Sampling rates and bit depth.
- **Compression:** How do we make files smaller? (Lossless vs Lossy).
