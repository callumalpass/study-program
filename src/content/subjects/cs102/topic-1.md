## Introduction

At their core, computers are just vast collections of switches that can be either on or off. To communicate with these machines, we need a way to translate our human world of decimal numbers and text into the binary world of 1s and 0s. This topic explores the fundamental language of computers: number systems.

**Learning Objectives:**
- Understand why computers use binary instead of decimal
- Convert numbers between Binary (base 2), Decimal (base 10), and Hexadecimal (base 16)
- Perform calculations using positional notation
- Memorize the first 16 binary/hex values
- Understand the relationship between hex digits and 4-bit nibbles

---

## Core Concepts

### Why Binary?

Computers use binary because it is reliable and easy to implement in hardware. A transistor is either conducting current (1) or not (0). It's much harder to build a circuit that reliably distinguishes between 10 different voltage levels (decimal) than just two.

### Positional Notation

In any number system, the position of a digit determines its value.
- **Decimal (Base 10):** digits 0-9, powers of 10.
  $357 = 3 \times 10^2 + 5 \times 10^1 + 7 \times 10^0$
- **Binary (Base 2):** digits 0-1, powers of 2.
  $1011_2 = 1 \times 2^3 + 0 \times 2^2 + 1 \times 2^1 + 1 \times 2^0 = 8 + 0 + 2 + 1 = 11_{10}$

### Hexadecimal (Base 16)

Binary gets long and hard to read ($11111111_2$ is 255). Hexadecimal is a shorthand for binary.
- Digits: 0-9 and A-F (where A=10, B=11... F=15).
- One hex digit represents exactly 4 bits (a "nibble").

**The Magic Map:**
- 0000 = 0
- 0101 = 5
- 1010 = A (10)
- 1111 = F (15)

### Converting Between Bases

**Binary \u2192 Decimal:**
Sum the powers of 2 where the bit is 1.
$10010_2 = 16 + 2 = 18$

**Decimal \u2192 Binary:**
Repeatedly divide by 2 and record the remainders. Read remainders from bottom (last) to top (first).
$13 / 2 = 6$ rem 1
$6 / 2 = 3$ rem 0
$3 / 2 = 1$ rem 1
$1 / 2 = 0$ rem 1
Result: $1101_2$

**Binary \u2194 Hex:**
Group bits by 4, starting from the right.
$1101011_2$ \u2192 $0110 \ 1011$ \u2192 $6 \ B$ \u2192 $6B_{16}$

---

## Common Patterns and Idioms

### The "0x" Prefix
Programmers use prefixes to tell bases apart:
- `0b` for binary (e.g., `0b1010`)
- `0x` for hex (e.g., `0xFF`)
- `0` or `0o` for octal (less common now)

### Powers of 2 Shortcuts
Memorizing these speeds up your work significantly:
- $2^0 = 1$
- $2^1 = 2$
- $2^2 = 4$
- $2^3 = 8$
- $2^4 = 16$
- $2^5 = 32$
- $2^6 = 64$
- $2^7 = 128$
- $2^8 = 256$ (one byte max value + 1)
- $2^{10} = 1024$ (approx 1000, "1K")

---

## Common Mistakes and Pitfalls

### Mistake 1: Confusing Values with Representations
Remember that "11" means eleven in decimal, three in binary, and seventeen in hex. The *value* is the abstract quantity; the *representation* depends on the base.

### Mistake 2: Off-by-One in Ranges
An n-bit number can represent $2^n$ distinct values, ranging from $0$ to $2^n - 1$.
- 8 bits: 0 to 255 (not 256!)

### Mistake 3: Grouping Direction
When converting binary to hex, always group by 4 starting from the **right** (least significant bit).
Right: $110101 \to 0011 \ 0101 \to 35_{16}$
Wrong: $110101 \to 1101 \ 0100 \to D4_{16}$

---

## Best Practices

1. **Pad with zeros:** When writing binary, pad to 4 or 8 bits (e.g., write `0101` instead of `101`) to make hex conversion easier.
2. **Use the 8-4-2-1 rule:** For 4-bit binary, just sum the weights 8, 4, 2, 1. (e.g., 1011 = 8 + 2 + 1 = 11 = B).
3. **Practice mental math:** Try to recognize common patterns like `1111` (F), `1010` (A), `1000` (8).

---

## Further Exploration

- **Octal (Base 8):** Used in Unix file permissions (e.g., `chmod 755`). Why is it useful? (Hint: 3 bits).
- **Base64:** How we send binary data (images, files) over text-only protocols like email.
- **Finger Binary:** Learn to count to 31 on one hand and 1023 on two hands!
