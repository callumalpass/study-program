---
id: cs102-t2-overflow-carry-and-sign
title: "Overflow, Carry, and Signedness"
order: 3
---

# Overflow, Carry, and Signed vs Unsigned

One of the most important skills in CS102 is distinguishing **carry** from **overflow** and knowing when each matters. Both relate to arithmetic results that don't fit in the available bits, but they apply to different interpretations of those bits.

The same addition operation can produce a carry, an overflow, both, or neither—depending on whether you interpret the operands as signed or unsigned. Understanding this distinction is essential for debugging, writing correct low-level code, and understanding CPU flag registers.

## The Core Distinction

**Carry**: Relevant for **unsigned** arithmetic. Indicates that the result doesn't fit in N bits when interpreted as an unsigned value.

**Overflow**: Relevant for **signed** (two's complement) arithmetic. Indicates that the result doesn't fit in N bits when interpreted as a signed value.

The CPU computes both flags for every addition/subtraction. Your code decides which flag to check based on whether you're treating the values as signed or unsigned.

## Carry Flag (Unsigned Perspective)

For **unsigned** addition, a carry out of the most significant bit (MSB) means the mathematical result exceeds the maximum representable value.

### Example: 4-bit unsigned addition

The range of 4-bit unsigned is 0 to 15.

```
   1111  (15)
 + 0001  (1)
 ------
  10000  (16)
```

The result is 5 bits, but we only have 4-bit storage. The 4-bit result is `0000` (0), with a **carry out** of 1.

The carry flag would be SET, indicating unsigned overflow: 15 + 1 = 16 can't be represented in 4 unsigned bits.

### Another Example: No carry

```
   0111  (7)
 + 0001  (1)
 ------
   1000  (8)
```

Result fits in 4 bits (8 < 16), so the carry flag is CLEAR. No unsigned overflow.

### Carry in Subtraction

For subtraction `a - b`, CPUs typically compute `a + (~b) + 1`. The "borrow" concept becomes:

- **No borrow** (result is non-negative) → Carry flag SET
- **Borrow occurred** (result would be negative) → Carry flag CLEAR

This inverted logic can be confusing. Some architectures define a separate "borrow flag" to make it clearer.

## Overflow Flag (Signed Perspective)

For **signed** two's complement arithmetic, overflow occurs when the mathematical result falls outside the representable range.

### When Does Signed Overflow Occur?

Overflow happens when:
- Adding two **positive** numbers produces a **negative** result, or
- Adding two **negative** numbers produces a **positive** result

Equivalently:
- **Overflow** = (carry into sign bit) XOR (carry out of sign bit)

If the carry into the MSB differs from the carry out of the MSB, overflow occurred.

### Example: 4-bit signed addition (range -8 to 7)

```
   0111  (+7)
 + 0001  (+1)
 ------
   1000  (-8 in signed!)
```

Mathematically, 7 + 1 = 8. But 8 exceeds the 4-bit signed maximum of 7. The result `1000` is interpreted as -8 in two's complement—completely wrong!

- Carry out of MSB: 0
- Carry into MSB: 1 (from adding the second-highest bits)
- Carry in ≠ Carry out → **Overflow flag SET**

### Example: Two negatives producing positive

```
   1000  (-8)
 + 1000  (-8)
 ------
  10000  → 4-bit result is 0000 (+0)
```

Mathematically, (-8) + (-8) = -16. But -16 < -8 (minimum 4-bit signed). The 4-bit result is 0, which is wrong!

- Carry out of MSB: 1
- Carry into MSB: 0
- Carry in ≠ Carry out → **Overflow flag SET**

### Example: No overflow (different signs)

```
   0101  (+5)
 + 1101  (-3)
 ------
  10010  → 4-bit result is 0010 (+2)
```

Mathematically, 5 + (-3) = 2. This fits in 4-bit signed range (-8 to 7). ✓

- Carry out of MSB: 1
- Carry into MSB: 1
- Carry in = Carry out → **Overflow flag CLEAR**

## Why Opposite Signs Can't Overflow

When operands have opposite signs, the magnitude of the result is bounded by the larger operand's magnitude. Since both operands were representable, the result must also be representable.

**Intuition**: Adding a positive and negative number brings the result *between* them on the number line, which is always within range.

This is why the overflow rule works: overflow requires both operands to "push" in the same direction (both positive or both negative), exceeding the range boundary.

## The Same Bits, Different Interpretation

Here's a critical insight: the **same bit pattern** means different things depending on interpretation:

| Binary (4-bit) | Unsigned Value | Signed Value |
|----------------|----------------|--------------|
| 0000 | 0 | 0 |
| 0111 | 7 | +7 |
| 1000 | 8 | -8 |
| 1111 | 15 | -1 |

So `1000` is either 8 (unsigned) or -8 (signed). The bits don't change—only the interpretation.

## A Complete 4-Bit Example

Let's trace through `1010 + 0111` and check all flags:

```
    1010   (10 unsigned, or -6 signed)
  + 0111   (7 unsigned, or +7 signed)
  ------
```

Step by step:
- Position 0: 0+1 = 1, carry 0
- Position 1: 1+1 = 0, carry 1
- Position 2: 0+1+1 = 0, carry 1 ← carry INTO MSB
- Position 3: 1+0+1 = 0, carry 1 ← carry OUT OF MSB

Result: `0001` with carry out = 1

**As unsigned**: 10 + 7 = 17, but stored result is 1. Carry = 1 → **unsigned overflow**

**As signed**: -6 + 7 = 1. Result `0001` = +1. Correct!
- Carry in ≠ Carry out? 1 ≠ 1? No, they're equal → **no signed overflow**

So this operation:
- Has unsigned overflow (carry set)
- Has no signed overflow (overflow flag clear)

## CPU Flags in Practice

Real CPUs maintain a **flags register** (also called status register or condition codes) with bits for:

| Flag | Meaning |
|------|---------|
| C (Carry) | Carry out from MSB (unsigned overflow indicator) |
| V or O (oVerflow) | Signed overflow (XOR of carry in/out of MSB) |
| Z (Zero) | Result is all zeros |
| N or S (Negative/Sign) | MSB of result is 1 |

After an arithmetic operation, your code checks the appropriate flag:
- Unsigned comparison/bounds checking → Check Carry flag
- Signed comparison/bounds checking → Check Overflow and Sign flags

### Assembly Language Example

```asm
ADD  R1, R2      ; R1 = R1 + R2, flags updated

; For unsigned check:
JC   overflow_unsigned   ; Jump if Carry set

; For signed check:
JO   overflow_signed     ; Jump if Overflow set
```

## Common Pitfalls

### Checking the Wrong Flag

If you treat values as signed but check the carry flag, you'll miss some overflows and false-positive on others. Match the flag to the interpretation!

### Assuming Overflow Means Wrong Result

The bit pattern stored is always "correct" for modular arithmetic. Overflow just means the value wrapped around. Sometimes that's intentional (e.g., for cyclic counters).

### Forgetting Width Matters

Overflow depends on bit width:
- `127 + 1` overflows in 8-bit signed
- `127 + 1 = 128` is fine in 16-bit signed

## Detecting Overflow in High-Level Languages

Most languages don't expose CPU flags directly, but you can detect overflow with careful checks:

```python
# Detect signed 32-bit overflow in Python
def add_might_overflow(a, b):
    result = a + b
    INT_MAX = 2**31 - 1
    INT_MIN = -2**31
    return result > INT_MAX or result < INT_MIN
```

Some languages provide checked arithmetic:
- Rust: `checked_add()` returns `None` on overflow
- C#: `checked { }` block throws on overflow
- C: Signed overflow is undefined behavior (compiler can assume it never happens!)

## Key Takeaways

- **Carry** indicates unsigned overflow; **overflow flag** indicates signed overflow.
- The CPU computes both flags; your code chooses which to check based on interpretation.
- Signed overflow requires operands with the **same sign** producing a result with the **opposite sign**.
- **Adding opposite signs never causes signed overflow** because the result is bounded between the operands.
- The **same bits** can represent valid signed values and invalid unsigned values, or vice versa.
- Always reason with a specific bit **width** and **signedness** in mind.
- In assembly, conditional jumps use flags; in high-level languages, you need explicit checks or language features.

