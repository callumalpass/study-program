---
id: cs102-t2-twos-complement-arithmetic
title: "Two’s Complement Arithmetic"
order: 2
---

# Two's Complement Arithmetic

Computers need to represent negative numbers, but binary digits are inherently unsigned—they're just 0s and 1s. Several schemes have been invented to encode sign information, but **two's complement** has become the universal standard for signed integers. Its key advantage is elegant: the same binary addition hardware works correctly for both positive and negative numbers, with no special cases.

## The Problem: Representing Negative Numbers

Early computers tried different approaches to signed numbers:

**Sign-magnitude**: Use the leftmost bit as a sign flag (0=positive, 1=negative), with the remaining bits as the magnitude. Problem: you get two representations of zero (+0 and -0), and addition requires sign comparison logic.

**One's complement**: Negate a number by inverting all bits. Problem: still two zeros, and addition sometimes requires an "end-around carry."

**Two's complement**: Negate a number by inverting all bits and adding 1. Advantage: single zero, simple addition, no special cases.

Two's complement won because it makes hardware simpler—a critical consideration when you're building millions of adders.

## Two's Complement in One Sentence

For an N-bit two's complement number:
- The leftmost bit is the **sign bit**: 0 means positive (or zero), 1 means negative.
- The representable range is $-2^{N-1}$ to $2^{N-1} - 1$.

| Bits | Range | Example |
|------|-------|---------|
| 4 | -8 to 7 | -8, -7, ..., 0, ..., 6, 7 |
| 8 | -128 to 127 | -128, -127, ..., 0, ..., 126, 127 |
| 16 | -32768 to 32767 | Approximately ±32K |
| 32 | -2147483648 to 2147483647 | Approximately ±2 billion |

Notice the asymmetry: there's one more negative value than positive. This is because zero takes one of the "positive" bit patterns (all zeros).

## How Two's Complement Works

The mathematical definition: in N-bit two's complement, a bit pattern B represents the value:

- If the sign bit is 0: the value is simply B (as unsigned)
- If the sign bit is 1: the value is $B - 2^N$

More practically, we can think of the sign bit as having **negative weight**:

For an 8-bit number $b_7b_6b_5b_4b_3b_2b_1b_0$:

$$\text{Value} = -b_7 \times 128 + b_6 \times 64 + b_5 \times 32 + b_4 \times 16 + b_3 \times 8 + b_2 \times 4 + b_1 \times 2 + b_0 \times 1$$

The sign bit contributes -128 (not +128). All other bits contribute their normal positive weights.

### Example: What is `11111011₂` in 8-bit two's complement?

```
Value = -1×128 + 1×64 + 1×32 + 1×16 + 1×8 + 0×4 + 1×2 + 1×1
      = -128 + 64 + 32 + 16 + 8 + 2 + 1
      = -128 + 123
      = -5
```

So `11111011₂` represents -5 in 8-bit two's complement.

## Creating a Negative Value (Negation)

To compute `-x` in two's complement:

1. Write `x` in binary using N bits
2. **Invert** all bits (0→1, 1→0)
3. **Add 1**

This is often written as: `-x = ~x + 1` (where ~ means bitwise NOT).

### Example: Represent -5 in 8 bits

Start with +5:
```
5 = 00000101
```

Invert all bits:
```
    11111010
```

Add 1:
```
    11111010
  +        1
  ----------
    11111011
```

So **-5 is `11111011`** in 8-bit two's complement.

### Verify by Negating Again

If we negate -5, we should get +5:

```
-5 = 11111011
Invert: 00000100
Add 1:  00000101 = 5 ✓
```

## Why Invert-and-Add-One Works

This isn't magic—there's a mathematical reason. For any N-bit value $x$:

$$x + \sim x = 111...1_2 = 2^N - 1$$

Therefore:

$$\sim x = 2^N - 1 - x$$

$$\sim x + 1 = 2^N - x$$

In modular arithmetic (mod $2^N$), adding $2^N$ is the same as adding 0. So $\sim x + 1$ is equivalent to $-x$.

## Adding Signed Numbers

The beautiful property of two's complement: **regular binary addition just works**.

### Example: 5 + (-3) in 8 bits

```
  5 = 00000101
 -3 = 11111101  (invert 00000011, add 1)

    00000101
  + 11111101
  ----------
   100000010
```

The result is 9 bits, but we only keep 8 bits: `00000010` = 2.

And indeed, 5 + (-3) = 2. ✓

### Example: (-5) + (-3) in 8 bits

```
 -5 = 11111011
 -3 = 11111101

    11111011
  + 11111101
  ----------
   111111000
```

Keeping 8 bits: `11111000`

What does `11111000` represent?
```
Value = -128 + 64 + 32 + 16 + 8 = -128 + 120 = -8
```

And (-5) + (-3) = -8. ✓

## Subtraction Using Addition

Since we can negate numbers easily, subtraction becomes addition:

```
a - b = a + (-b) = a + (~b + 1)
```

This is exactly how CPUs implement subtraction—they invert the second operand, set the carry-in to 1, and use the same adder circuit.

### Example: 7 - 3 in 8 bits

```
  7 = 00000111
  3 = 00000011 → -3 = 11111101

    00000111
  + 11111101
  ----------
   100000100
```

Keeping 8 bits: `00000100` = 4. ✓

## The Special Case: Most Negative Number

In 8-bit two's complement, `10000000` represents -128.

What happens if we try to negate it?

```
-128 = 10000000
Invert: 01111111
Add 1:  10000000  ← back to the same pattern!
```

So `-(-128) = -128` in 8-bit two's complement!

This happens because +128 is **not representable** in 8-bit two's complement (the range is -128 to +127). Negating the most negative value causes **overflow**.

This is a real bug that has affected production software. In Java, for example:

```java
int x = Integer.MIN_VALUE;  // -2147483648
int y = -x;                  // Still -2147483648!
int z = Math.abs(x);         // Still -2147483648!
```

## Sign Extension

When you need to represent a number in more bits (e.g., converting 8-bit to 16-bit), you must **sign extend**—copy the sign bit into all the new high-order positions.

### Example: Extend -5 from 8 bits to 16 bits

```
8-bit:  11111011
16-bit: 1111111111111011
```

We copied the sign bit (1) into the 8 new positions. The value is still -5.

For positive numbers, sign extension fills with zeros (which is the same as zero extension):

```
8-bit:  00000101 (5)
16-bit: 0000000000000101 (5)
```

## Recognizing Two's Complement Values

Quick mental checks:

- **All zeros** = 0
- **All ones** = -1 (not the most negative!)
- **1 followed by all zeros** = most negative value (-2^(N-1))
- **0 followed by all ones** = most positive value (2^(N-1) - 1)
- **Sign bit = 1** means negative
- **Sign bit = 0** means non-negative

### 8-Bit Reference Values

| Binary | Decimal |
|--------|---------|
| 00000000 | 0 |
| 00000001 | 1 |
| 01111111 | 127 (max positive) |
| 10000000 | -128 (min negative) |
| 10000001 | -127 |
| 11111111 | -1 |

## Key Takeaways

- **Two's complement** is the universal representation for signed integers in modern computers.
- To negate: **invert all bits and add 1** (`-x = ~x + 1`).
- The same **binary adder** works for signed and unsigned arithmetic—only the interpretation of overflow differs.
- The representable range is **asymmetric**: there's one more negative value than positive.
- **Sign extension** preserves value when widening: replicate the sign bit.
- The **most negative value** cannot be negated without overflow.
- Always reason in a **fixed width** (8-bit, 16-bit, 32-bit), because representation depends on width.

