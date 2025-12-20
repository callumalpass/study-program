---
id: cs102-t2-shifts-multiplication-and-division
title: "Shifts, Multiplication, and Division"
order: 4
---

# Shifts, Multiplication, and Division

Many binary operations become surprisingly simple when you understand the relationship between bit positions and powers of 2. Shifting bits left or right corresponds directly to multiplying or dividing by powers of 2—operations that CPUs can perform in a single clock cycle, much faster than general multiplication or division.

Understanding shifts is essential for low-level programming, bit manipulation, and performance optimization. They're also fundamental to understanding how CPUs implement multiplication and division internally.

## The Fundamental Insight

In positional notation, each bit position represents a power of 2:

```
Position:  7    6    5    4    3    2    1    0
Weight:   128  64   32   16    8    4    2    1
         (2⁷) (2⁶) (2⁵) (2⁴) (2³) (2²) (2¹) (2⁰)
```

Moving a bit one position to the left **doubles** its contribution (moves from 2ⁿ to 2ⁿ⁺¹).
Moving a bit one position to the right **halves** its contribution (moves from 2ⁿ to 2ⁿ⁻¹).

This is exactly analogous to decimal: shifting left by one position multiplies by 10 (e.g., 42 → 420), and shifting right divides by 10 (e.g., 420 → 42).

## Left Shift: Multiplication by Powers of 2

**Left shift by k positions** multiplies the value by **2ᵏ** (ignoring overflow).

Notation: `x << k` (in most programming languages)

### How It Works

When you shift left:
1. All bits move k positions to the left
2. The k rightmost positions fill with zeros
3. The k leftmost bits are discarded (potentially causing overflow)

### Example: Left shift by 1 (multiply by 2)

```
Before:  00101101  (45)
After:   01011010  (90)
```

Each bit doubled its positional weight: 45 × 2 = 90 ✓

### Example: Left shift by 3 (multiply by 8)

```
Before:  00000101  (5)
After:   00101000  (40)
```

5 × 8 = 5 × 2³ = 40 ✓

### Overflow When Shifting Left

If high-order bits are shifted out, information is lost:

```
Before:  01100000  (96)
<< 2:    10000000  (128, but we lost bits!)
```

96 × 4 = 384, but 384 doesn't fit in 8 bits (max unsigned is 255). The stored result 128 is wrong—this is shift overflow.

In signed interpretation, `10000000` is -128, which is even more wrong!

### Quick Multiplication Formulas

```
x << 0 = x × 1 = x
x << 1 = x × 2
x << 2 = x × 4
x << 3 = x × 8
x << 4 = x × 16
x << n = x × 2ⁿ
```

## Right Shift: Division by Powers of 2

**Right shift by k positions** divides the value by **2ᵏ**, discarding the remainder (truncating toward zero for unsigned).

Notation: `x >> k`

### How It Works

When you shift right:
1. All bits move k positions to the right
2. The k rightmost bits are discarded (the "remainder")
3. The k leftmost positions need to be filled—but with what?

This is where **logical** vs **arithmetic** shift matters.

## Logical Right Shift (Unsigned)

**Logical right shift** fills the vacated high-order bits with **zeros**.

Used for: Unsigned values

### Example: Logical right shift by 1 (divide by 2)

```
Before:  01011010  (90)
After:   00101101  (45)
```

90 ÷ 2 = 45 ✓

### Example: Logical right shift by 2 (divide by 4)

```
Before:  00101100  (44)
After:   00001011  (11)
```

44 ÷ 4 = 11 ✓

### Truncation (Discarding Remainder)

```
Before:  00101101  (45)
>> 1:    00010110  (22)
```

45 ÷ 2 = 22.5, but we get 22. The 0.5 (the discarded low bit) is lost.

This is **truncation toward zero**, equivalent to integer division.

## Arithmetic Right Shift (Signed)

**Arithmetic right shift** fills the vacated high-order bits by **copying the sign bit**.

Used for: Signed (two's complement) values, to preserve the sign during division.

### Example: Arithmetic right shift of a negative number

```
Before:  11110000  (-16 in 8-bit signed)
>> 1:    11111000  (-8)
```

The sign bit (1) is copied into the vacated position. -16 ÷ 2 = -8 ✓

### Compare with Logical Shift on Same Pattern

```
Before (logical):  11110000  (240 unsigned)
Logical >> 1:      01111000  (120 unsigned)
```

240 ÷ 2 = 120 ✓ (correct for unsigned)

But if we used logical shift on a signed value:
```
Before (signed):   11110000  (-16)
Logical >> 1:      01111000  (+120, WRONG!)
```

The sign flipped from negative to positive—disaster for signed arithmetic!

### The Rounding Issue

Arithmetic right shift doesn't round the same way as mathematical division for negative numbers:

```
-7 in 8-bit:      11111001
Arithmetic >> 1:  11111100  = -4
```

Mathematically, -7 ÷ 2 = -3.5, which rounds toward zero to -3. But we got -4!

Arithmetic right shift rounds **toward negative infinity** (floor division), not toward zero. This is a subtle difference that matters in some algorithms.

## Language-Specific Behavior

Different languages handle right shift differently:

| Language | `>>` on signed | `>>` on unsigned |
|----------|----------------|------------------|
| C/C++ | Implementation-defined (usually arithmetic) | Logical |
| Java | `>>` is arithmetic, `>>>` is logical | N/A (no unsigned types) |
| Python | Always arithmetic (arbitrary precision) | Use masking for unsigned behavior |
| Rust | Arithmetic for signed types, logical for unsigned | Type determines behavior |

In C, whether `>>` is arithmetic or logical for signed types depends on the compiler. Most modern compilers use arithmetic shift, but it's technically undefined behavior to rely on this!

## Multiplication by Non-Powers-of-Two

Compilers use shifts to optimize multiplication by constants:

**Multiply by 10**:
```
x × 10 = x × 8 + x × 2 = (x << 3) + (x << 1)
```

**Multiply by 7**:
```
x × 7 = x × 8 - x = (x << 3) - x
```

**Multiply by 15**:
```
x × 15 = x × 16 - x = (x << 4) - x
```

These optimizations replace slow multiplication with fast shifts and adds.

## Division by Non-Powers-of-Two

Division by constants that aren't powers of 2 is trickier. Compilers use a technique called **multiplication by magic numbers** (reciprocal multiplication):

To divide by 3, compute:
```
x ÷ 3 ≈ (x × 0xAAAAAAAB) >> 33  (for 32-bit)
```

This is much faster than actual division. Understanding why it works requires modular arithmetic and is beyond our scope, but know that compilers apply such tricks automatically.

## Bit Masking with Shifts

Shifts are often combined with AND/OR to extract or set specific bits:

**Extract bits 4-7** (the high nibble of a byte):
```
(x >> 4) & 0x0F
```

**Set bit n**:
```
x | (1 << n)
```

**Clear bit n**:
```
x & ~(1 << n)
```

**Toggle bit n**:
```
x ^ (1 << n)
```

**Check if bit n is set**:
```
(x >> n) & 1
```

## Rotate Operations

Some CPUs support **rotate** (circular shift), where bits that exit one end enter the other:

**Rotate left**: High bits wrap to low positions
**Rotate right**: Low bits wrap to high positions

```
Rotate left by 1:
Before:  10110001
After:   01100011  (the high 1 bit moved to position 0)
```

Rotates are useful in cryptography and hash functions. Most high-level languages don't have rotate operators, but you can synthesize them:

```c
// Rotate left by n for 8-bit value
uint8_t rotl8(uint8_t x, int n) {
    return (x << n) | (x >> (8 - n));
}
```

## Performance Considerations

On modern CPUs:
- Shifts: 1 clock cycle
- Addition: 1 clock cycle
- Multiplication: 3-5 clock cycles
- Division: 20-100+ clock cycles

This is why compilers aggressively replace multiplication and division with shifts when possible. However, for readability, write `x * 4` rather than `x << 2`—let the compiler optimize.

## Key Takeaways

- **Left shift by k** multiplies by **2ᵏ**; bits shifted out are lost (potential overflow).
- **Right shift by k** divides by **2ᵏ**; the remainder is discarded.
- **Logical right shift** fills with zeros—use for unsigned values.
- **Arithmetic right shift** copies the sign bit—use for signed values to preserve sign.
- Arithmetic right shift rounds toward **negative infinity**, not toward zero.
- Compilers use shifts to **optimize multiplication and division** by constants.
- Shifts combined with AND/OR enable **bit extraction, setting, clearing, and toggling**.
- Know your language's behavior: `>>` semantics vary between languages and for signed types.

