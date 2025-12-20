## Introduction

Just like we learn to add and subtract in decimal in elementary school, computers need to perform arithmetic in binary. This topic covers the mechanics of binary addition, how computers handle negative numbers (it's clever!), and the dreaded concept of overflow.

**Why This Matters:**
Understanding binary arithmetic explains why certain bugs occur (integer overflow), how CPUs are designed, and why some operations are faster than others. It's fundamental to systems programming, cryptography, and understanding computer security vulnerabilities.

**Learning Objectives:**
- Perform binary addition and subtraction
- Understand the limitations of fixed-width arithmetic (Overflow)
- Represent negative numbers using Sign-Magnitude and Two's Complement
- Convert between decimal and Two's Complement values
- Perform arithmetic with signed numbers

---

## Core Concepts

### Binary Addition

It works exactly like decimal addition, but you carry when you reach 2, not 10.

**Rules:**
- 0 + 0 = 0
- 0 + 1 = 1
- 1 + 0 = 1
- 1 + 1 = 0 (carry 1)
- 1 + 1 + 1 = 1 (carry 1)

**Example: $5 + 6 = 11$**
```
    0101  (5)
  + 0110  (6)
  ------
    1011  (11)
```

**Step by step:**
1. Rightmost: 1 + 0 = 1
2. Next: 0 + 1 = 1
3. Next: 1 + 1 = 0, carry 1
4. Leftmost: 0 + 0 + 1 (carry) = 1

### Representing Negative Numbers

How do we store "-5" in bits? There are two main approaches:

**1. Sign-Magnitude (Naive approach):**
Use the first bit as a sign (0 = positive, 1 = negative).
- $00000101 = +5$
- $10000101 = -5$

*Problems:*
- Two representations of zero (+0 and -0)
- Addition circuits become complicated
- Not used in modern computers

**2. Two's Complement (What computers actually use):**

To negate a number: **Invert all bits and add 1.**

*Example: Converting +5 to -5 in 8-bit:*
```
+5:     0000 0101
Invert: 1111 1010
Add 1:  1111 1011  ← This is -5 in Two's Complement
```

### Why Two's Complement is Brilliant

It allows the CPU to use the **same circuit** for addition and subtraction!

**Proof: $5 + (-5) = 0$**
```
    0000 0101  (+5)
  + 1111 1011  (-5)
  -----------
  1 0000 0000  (The 1 carries out and is discarded)
```

The result is 0 (ignoring the carry out).

**Key insight:** Subtraction becomes addition: $A - B = A + (-B)$

### Two's Complement Ranges

For n-bit signed integers:
- **Minimum value:** $-2^{n-1}$
- **Maximum value:** $2^{n-1} - 1$

| Bits | Range |
|------|-------|
| 8-bit | -128 to +127 |
| 16-bit | -32,768 to +32,767 |
| 32-bit | -2,147,483,648 to +2,147,483,647 |

### Overflow

In the physical world, numbers go on forever. In computers, we have a fixed number of bits. If a calculation result is too big (or too small) to fit, it "wraps around"—this is **overflow**.

**Unsigned Overflow:**
```
  1111 1111  (255)
+         1  (1)
-----------
1 0000 0000  → 0000 0000 (wraps to 0!)
```

**Signed Overflow:**
Adding two positive numbers yields a negative result (or vice versa).
```
  0111 1111  (+127)
+ 0000 0001  (1)
-----------
  1000 0000  (-128!)  ← Overflow!
```

**Detecting signed overflow:** If you add two positives and get a negative, or add two negatives and get a positive, overflow occurred.

---

## Common Patterns and Idioms

### Sign Extension
When moving a number from a smaller container to a larger one (e.g., 8-bit to 16-bit):

**Unsigned:** Pad with zeros on the left.
```
8-bit:  1111 1011  (251 unsigned)
16-bit: 0000 0000 1111 1011  (still 251)
```

**Signed:** Copy the sign bit (MSB) to fill the new positions.
```
8-bit:  1111 1011  (-5 in Two's Complement)
16-bit: 1111 1111 1111 1011  (still -5)
```

### Quick Negation Check
In Two's Complement, negative numbers always have a 1 in the most significant bit (MSB). This makes sign checking a single-bit operation!

### Subtraction Without a Subtractor
Computers rarely have dedicated "subtract" circuits. Instead:

$$A - B = A + (\text{NOT } B) + 1 = A + (-B)$$

---

## Common Mistakes and Pitfalls

### Mistake 1: Ignoring Bit Width
Two's Complement only makes sense when you know the number of bits.

`1111 1011` is:
- 251 if unsigned 8-bit
- -5 if signed 8-bit
- Part of a larger number if 16-bit

**Always specify the bit width!**

### Mistake 2: The Weird Asymmetric Range
In Two's Complement, the range is asymmetrical.
- 8-bit range: **-128 to +127** (not ±127!)
- There is no positive 128 in 8-bit signed!
- Trying to negate -128 results in -128 (overflow)

```
-128:   1000 0000
Invert: 0111 1111
Add 1:  1000 0000  ← Back to -128!
```

### Mistake 3: Mixing Signed and Unsigned
When comparing or operating on mixed signed/unsigned values, unexpected results occur:

```c
// In C:
int a = -1;
unsigned int b = 1;
if (a < b)  // FALSE! -1 is converted to a large unsigned number
```

---

## Best Practices

1. **Always specify bit width:** When doing binary math on paper, draw a box or write "8-bit" to remind yourself of the limits.

2. **Check for overflow:** If adding two positives gives a negative, or two negatives gives a positive, you have overflowed.

3. **Use hex for checking:** Converting to hex often makes it easier to spot patterns than reading long strings of 1s and 0s.

4. **Know your language's behavior:** Python has arbitrary precision integers. C and Java have fixed-width types that can overflow silently.

---

## Real-World Applications

**Security Vulnerabilities:**
Integer overflow bugs have caused serious security vulnerabilities. If a program allocates `n * size` bytes without checking for overflow, an attacker might cause `n * size` to wrap around to a small number, then write past the allocated buffer.

**Game Bugs:**
The "Gandhi nuclear bug" in Civilization is famously attributed to an integer underflow—Gandhi's aggression of 1 minus 2 wrapped around to 255, making him extremely aggressive.

**Y2K38 Problem:**
Unix timestamps are often stored as signed 32-bit integers (seconds since 1970). On January 19, 2038, this will overflow—causing date calculations to break.

---

## Further Exploration

- **Floating Point Math:** How do we add 1.5 + 2.75? (Hint: It involves aligning "decimal" points in binary)
- **Saturation Arithmetic:** Used in graphics and audio. If $200 + 100 > 255$, the result stays at 255 instead of wrapping to 44.
- **Carry vs Overflow Flags:** CPUs track both—carry for unsigned overflow, overflow flag for signed overflow.
- **BigInt:** How languages like Python handle arbitrarily large integers.
