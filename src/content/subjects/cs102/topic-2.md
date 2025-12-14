## Introduction

Just like we learn to add and subtract in decimal in elementary school, computers need to perform arithmetic in binary. This topic covers the mechanics of binary addition, how computers handle negative numbers (it's clever!), and the dreaded concept of overflow.

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
Rules:
- 0 + 0 = 0
- 0 + 1 = 1
- 1 + 1 = 0 (carry 1)
- 1 + 1 + 1 = 1 (carry 1)

Example ($5 + 6$):
  0101 (5)
+ 0110 (6)
------
  1011 (11)

### Representing Negative Numbers

How do we store "-5" bits?

1.  **Sign-Magnitude (Naive):** Use the first bit as a sign (0=+, 1=-).
    - $00000101 = +5$
    - $10000101 = -5$
    - *Problem:* Two zeros (+0 and -0) and hard to build adder circuits.

2.  **Two's Complement (Standard):** This is what modern computers use.
    - To make a number negative: **Invert all bits and add 1.**
    - Example: +5 is 
0000 0101
    - Invert: 
1111 1010
    - Add 1: 
1111 1011
 (-5 in Two's Complement)

**Why Two's Complement?**
It allows the CPU to use the *same* circuit for addition and subtraction.
$5 + (-5) = 0$

  0000 0101 (+5)
+ 1111 1011 (-5)
----------- 
1 0000 0000 (0, ignoring the carry out of the 8th bit)

### Overflow

In the physical world, numbers go on forever. In computers, we have a fixed number of bits (e.g., 8, 16, 32, 64). If a calculation result is too big to fit, it "wraps around" – this is **overflow**.

- **Unsigned Overflow:** $255 + 1 \to 0$ (Carry flag set)
- **Signed Overflow:** Adding two positive numbers yields a negative result (or vice versa). $127 + 1 \to -128$.

---

## Common Patterns and Idioms

### Sign Extension
When moving a number from a smaller container to a larger one (e.g., 8-bit to 16-bit):
- **Unsigned:** Pad with zeros.
- **Signed:** Pad with the *sign bit* (copy the MSB).
  - 8-bit -5: 
1111 1011
  - 16-bit -5: 
1111 1111 1111 1011

### Subtraction is Addition
Computers rarely have a "subtract" circuit. Instead, $A - B$ is calculated as $A + (-B)$.

---

## Common Mistakes and Pitfalls

### Mistake 1: Ignoring Width
Two's complement only makes sense if you know the number of bits.
`111` is 7 if unsigned, but -1 if it's a signed 3-bit number.

### Mistake 2: The Weird Number
In Two's Complement, the range is asymmetrical.
8-bit range: -128 to +127.
There is no positive 128! Trying to negate -128 results in -128 (overflow).

---

## Best Practices

1.  **Always specify bit width:** When doing binary math on paper, draw a box or write "8-bit" to remind yourself of the limits.
2.  **Check for overflow:** If adding two positives gives a negative, or two negatives gives a positive, you have overflowed.
3.  **Use hex for checking:** Converting to hex often makes it easier to spot patterns than reading long strings of 1s and 0s.

---

## Further Exploration

- **Floating Point Math:** How do we add 1.5 + 2.75? (Hint: It involves aligning decimal points).
- **Saturation Arithmetic:** Used in graphics. If $200 + 100 > 255$, the result stays at 255 (white) instead of wrapping to 44 (dark).
