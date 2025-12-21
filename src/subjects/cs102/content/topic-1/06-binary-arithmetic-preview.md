---
id: cs102-t1-binary-arithmetic-preview
title: "Binary Arithmetic Preview"
order: 6
---

# Binary Arithmetic Preview

Now that you can convert between bases fluently, the next step is performing arithmetic directly in binary. This subtopic provides a bridge to Topic 2 by introducing the fundamentals of binary addition and the concept of overflow—the starting point for understanding how computers actually compute.

## Why Binary Arithmetic Matters

When you write `a + b` in a high-level language, the CPU performs the addition using binary circuits. Understanding binary arithmetic reveals:

- Why integer overflow occurs and how to detect it
- How subtraction is implemented using addition circuits
- Why certain "magic" bit operations work (like checking if a number is a power of 2)
- How the CPU's flags (carry, overflow, zero, negative) relate to calculation results

Binary arithmetic isn't just an academic exercise—it's how every calculation your computer performs actually happens at the hardware level.

## Binary Addition: The Basics

Binary addition follows the same rules as decimal addition, but with only two digits (0 and 1):

```
  0 + 0 = 0
  0 + 1 = 1
  1 + 0 = 1
  1 + 1 = 10  (0 with carry of 1)
```

The last case is the key insight: when the sum exceeds the largest single digit, you carry to the next position—exactly like carrying in decimal when 9 + 1 = 10.

### Example: Adding 5 + 3 in Binary

```
    0101   (5₁₀)
  + 0011   (3₁₀)
  ──────
```

Working right-to-left:

```
Position 0: 1 + 1 = 10₂  → Write 0, carry 1
Position 1: 0 + 1 + 1(carry) = 10₂  → Write 0, carry 1
Position 2: 1 + 0 + 1(carry) = 10₂  → Write 0, carry 1
Position 3: 0 + 0 + 1(carry) = 1  → Write 1, no carry

Result: 1000₂ = 8₁₀
```

Let's verify: 5 + 3 = 8. Correct!

### Example: Adding 7 + 1

```
    0111   (7₁₀)
  + 0001   (1₁₀)
  ──────
```

Working through:
```
Position 0: 1 + 1 = 10₂  → Write 0, carry 1
Position 1: 1 + 0 + 1 = 10₂  → Write 0, carry 1
Position 2: 1 + 0 + 1 = 10₂  → Write 0, carry 1
Position 3: 0 + 0 + 1 = 1  → Write 1

Result: 1000₂ = 8₁₀
```

This cascading carry effect is why hardware needs the carry flag—it indicates when a carry propagates out of the top bit.

## The Carry Bit

When adding N-bit numbers, if the addition produces a result that requires N+1 bits, the extra bit is called the **carry out**. In hardware, this is captured by the **carry flag (C)**.

**4-bit example:**
```
    1111   (15₁₀)
  + 0001   (1₁₀)
  ──────
   10000   (16₁₀)
```

The result is 16, but we only have 4 bits to store it. The result wraps around to `0000`, with the carry flag set to 1.

For **unsigned** arithmetic, a set carry flag indicates overflow—the result is too large to fit in the available bits.

## Binary Subtraction Preview

Binary subtraction could use a "borrow" mechanism analogous to carrying, but hardware designers found a more elegant solution: **two's complement** representation. This allows subtraction to be performed using the same addition circuits:

```
A - B = A + (-B)
```

The question becomes: how do you represent -B in binary? The answer—two's complement—is the focus of Topic 2. For now, just know that subtraction circuits are essentially addition circuits with some input manipulation.

### A Glimpse at Two's Complement

To negate a number in two's complement:
1. Flip all the bits (one's complement)
2. Add 1

**Example**: -5 in 4-bit two's complement
```
5 in binary:     0101
Flip all bits:   1010
Add 1:           1011

So -5 = 1011₂ in 4-bit two's complement
```

Verify by adding 5 + (-5):
```
    0101   (+5)
  + 1011   (-5)
  ──────
   10000
```

The 4-bit result is `0000` (with carry), which equals 0. This confirms that `1011` correctly represents -5.

## Fixed-Width Integer Overflow

Computers represent integers with a fixed number of bits (8, 16, 32, or 64). When arithmetic produces a result outside the representable range, **overflow** occurs.

### Unsigned Overflow

With 8 unsigned bits, values range from 0 to 255. Adding 200 + 100:

```
200₁₀ = 11001000₂
100₁₀ = 01100100₂

  11001000
+ 01100100
──────────
 100101100   (9 bits!)
```

The 8-bit result is `00101100` = 44, with a carry-out of 1. The true sum (300) wrapped around: 300 - 256 = 44.

### Signed Overflow

With signed integers, overflow occurs when the result's sign is impossible given the operands' signs:
- Positive + Positive = Negative → Overflow
- Negative + Negative = Positive → Overflow
- Positive + Negative → Cannot overflow (different signs)

**Example**: 127 + 1 in 8-bit signed
```
127₁₀ = 01111111₂
  1₁₀ = 00000001₂

  01111111
+ 00000001
──────────
  10000000   = -128 in two's complement
```

The sum of two positive numbers appears negative—clear overflow!

## Detecting Overflow

For **unsigned** numbers:
- Overflow occurs if there's a carry out of the most significant bit

For **signed** numbers (two's complement):
- Overflow occurs if the carry into the MSB differs from the carry out of the MSB
- Equivalently: if both operands have the same sign and the result has the opposite sign

Hardware provides separate flags:
- **Carry flag (C)**: Set when there's a carry out of the MSB (unsigned overflow indicator)
- **Overflow flag (V)**: Set when signed overflow occurs

## Why This Matters for Programming

In most programming languages:
- Integer overflow is **undefined behavior** (C/C++) or **wraps silently** (Java, Go, Rust in release mode)
- This means bugs can be silent and unpredictable

```c
// C code - undefined behavior on overflow!
int x = INT_MAX;  // 2,147,483,647
x = x + 1;        // Undefined - could be -2,147,483,648, could crash, could "work"

// Safe approach - check before operating
if (x <= INT_MAX - 1) {
    x = x + 1;  // Now safe
}
```

Understanding binary arithmetic helps you:
1. Predict when overflow might occur
2. Write code that handles edge cases
3. Debug strange behavior when values suddenly go negative or wrap around

## Connecting to Hardware

The CPU's Arithmetic Logic Unit (ALU) performs these binary operations using logic gates. A key insight from Topic 4 (Boolean Logic) will be that addition is just a chain of **full adder** circuits—each handling one bit position and the carry from the previous position.

The ripple of carries through the adder is why we call it a "ripple-carry adder." This ripple takes time, which limits how fast the CPU can add—a topic we'll explore in computer architecture.

## Practice Problems

1. Add these binary numbers (4-bit):
   - `0110 + 0011`
   - `1010 + 0111`
   - `1111 + 0001`

2. For each sum above, determine if unsigned overflow occurred.

3. Convert 12 and 7 to binary, add them, and convert the result back to decimal.

### Solutions

**Problem 1**:
- `0110 + 0011 = 1001` (6 + 3 = 9)
- `1010 + 0111 = 10001` (10 + 7 = 17, 5-bit result)
- `1111 + 0001 = 10000` (15 + 1 = 16, 5-bit result)

**Problem 2**:
- `0110 + 0011`: No overflow (result fits in 4 bits)
- `1010 + 0111`: Overflow! (result requires 5 bits; 4-bit result is `0001` = 1, not 17)
- `1111 + 0001`: Overflow! (result requires 5 bits; 4-bit result is `0000` = 0, not 16)

**Problem 3**:
- 12₁₀ = 1100₂
- 7₁₀ = 0111₂
- 1100 + 0111 = 10011₂ = 19₁₀ ✓

## Key Takeaways

- Binary addition follows the same carry rules as decimal, but with only digits 0 and 1.
- The **carry flag** indicates when the result exceeds the bit width (unsigned overflow).
- **Two's complement** allows subtraction using addition circuits by negating the subtrahend.
- **Fixed-width overflow** occurs when results don't fit in the available bits—values wrap around.
- **Signed overflow** occurs when two same-sign numbers produce an opposite-sign result.
- Understanding binary arithmetic is essential for predicting overflow bugs and writing robust code.
- Topic 2 will dive deeper into two's complement, multiplication, division, and bit shifting.

