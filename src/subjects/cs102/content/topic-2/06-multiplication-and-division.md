---
id: cs102-t2-multiplication-division
title: "Multiplication and Division Details"
order: 6
---

# Binary Multiplication and Division in Depth

While addition and subtraction are the foundation of binary arithmetic, multiplication and division complete the picture. Understanding how these operations work at the bit level explains why they're slower than addition, how integer division truncates, and why certain "multiply by 10" tricks work in code.

## Binary Multiplication Fundamentals

Binary multiplication follows the same pencil-and-paper algorithm as decimal multiplication, but it's simpler because each digit is only 0 or 1:

```
Multiplication table for binary:
  0 × 0 = 0
  0 × 1 = 0
  1 × 0 = 0
  1 × 1 = 1
```

No carrying within the multiplication step itself—just 0 or copy the multiplicand.

### Example: 5 × 3

```
       0101   (5)
     × 0011   (3)
     ──────
       0101   (5 × 1, shift 0)
      0101    (5 × 1, shift 1)
     0000     (5 × 0, shift 2)
    0000      (5 × 0, shift 3)
    ────────
    0001111   (15)
```

Each row is either the multiplicand (if multiplier bit is 1) or zeros (if bit is 0), shifted left by the bit position. Sum all partial products.

Verify: 5 × 3 = 15. ✓

### Example: 7 × 6

```
        0111   (7)
      × 0110   (6)
      ──────
        0000   (7 × 0, shift 0)
       0111    (7 × 1, shift 1)
      0111     (7 × 1, shift 2)
     0000      (7 × 0, shift 3)
     ────────
     0101010   (42)
```

Verify: 7 × 6 = 42. ✓

## Why Multiplication Takes Longer

For an N-bit multiplication:
- Generate N partial products (one per multiplier bit)
- Each partial product is N bits (potentially)
- Sum all partial products

This requires roughly N additions of N-bit numbers. Compare to addition, which is a single N-bit operation. Multiplication is inherently O(N) times slower in naive implementations.

### Hardware Optimizations

Real CPUs use faster multiplication algorithms:

**Booth's Algorithm**: Handles signed numbers efficiently by encoding runs of 1s as a subtraction and an addition at the boundaries.

**Wallace Trees**: Reduce partial products using carry-save adders in a tree structure, completing in O(log N) time instead of O(N).

**Dedicated Multiplier Units**: Modern CPUs have specialized hardware that multiplies in 3-5 clock cycles, not N cycles.

Still, multiplication is typically 3-10× slower than addition on modern CPUs.

## Result Size

When multiplying two N-bit numbers, the result can be up to 2N bits:

```
Largest 4-bit unsigned: 1111 × 1111 = 15 × 15 = 225 = 11100001 (8 bits)
Largest 8-bit unsigned: 255 × 255 = 65,025 (needs 16 bits)
```

**In programming languages**:
- Most languages return only the low N bits, discarding overflow
- Some provide "wide multiply" operations returning full 2N bits
- Assembly typically stores result in a register pair

```c
// C: result truncated to 32 bits
uint32_t a = 0xFFFFFFFF;
uint32_t b = 2;
uint32_t c = a * b;  // c = 0xFFFFFFFE (low 32 bits)

// For full result, use 64-bit type
uint64_t wide = (uint64_t)a * b;  // wide = 0x1FFFFFFFE
```

## Binary Division

Division is the inverse of multiplication and the most complex basic arithmetic operation. The algorithm resembles long division in decimal.

### Long Division Algorithm

Divide 13 by 3 in binary:

```
         0100   quotient
        ─────
  0011 │ 1101   (13 ÷ 3)
         0011   (3 × 1, shifted)
         ────
         1011   remainder after first step
         0011   (3 × 1, shifted)
         ────
         0010   remainder after second step
          ...
         ────
         0001   final remainder = 1
```

Result: 13 ÷ 3 = 4 remainder 1. Verify: 3 × 4 + 1 = 13. ✓

### The Restoring Division Algorithm

The hardware algorithm for unsigned division:

```
For N-bit division A ÷ B:
1. Initialize remainder R = 0, quotient Q = A
2. For each bit position (N times):
   a. Shift R:Q left by 1 (R gets top bit of Q)
   b. Subtract B from R
   c. If result >= 0: quotient bit = 1, keep result
      If result < 0: quotient bit = 0, restore R (add B back)
3. Quotient is in Q, remainder is in R
```

This requires N iterations, each involving a subtraction and conditional addition—making division 10-40× slower than addition.

### Why Division Is Slow

Division cannot be parallelized the way multiplication can. Each bit of the quotient depends on the result of the previous step. Hardware optimizations exist (SRT division, Newton-Raphson iteration), but division remains the slowest basic arithmetic operation.

**Typical latency** (clock cycles):
- Addition: 1 cycle
- Multiplication: 3-5 cycles
- Division: 20-100+ cycles

This is why compilers optimize `x / 2` to `x >> 1` and `x / 10` to multiplication by a magic constant.

## Integer Division Truncation

In most programming languages, integer division truncates toward zero:

```c
 7 / 3 =  2   (not 2.33...)
-7 / 3 = -2   (not -3, truncates toward zero)
 7 / -3 = -2
-7 / -3 =  2
```

The relationship always holds: `(a / b) * b + (a % b) == a`

### Modulo and Remainder

The `%` operator gives the remainder after division. Its sign follows the dividend in C/C++/Java:

```c
 7 % 3 =  1
-7 % 3 = -1
 7 % -3 =  1
-7 % -3 = -1
```

**Warning**: Some languages (Python) use true modulo (result has divisor's sign), not remainder. This matters for negative numbers.

## Multiplication and Division by Powers of 2

These operations are special because they're equivalent to bit shifts:

```
x × 2  = x << 1   (left shift by 1)
x × 4  = x << 2   (left shift by 2)
x × 8  = x << 3   (left shift by 3)
x × 2ⁿ = x << n

x ÷ 2  = x >> 1   (right shift by 1)
x ÷ 4  = x >> 2
x ÷ 8  = x >> 3
x ÷ 2ⁿ = x >> n
```

### Example: 12 × 4

```
12₁₀ = 1100₂
12 × 4 = 12 << 2 = 110000₂ = 48₁₀
```

Just append two zeros (shift left by 2).

### Example: 50 ÷ 4

```
50₁₀ = 110010₂
50 >> 2 = 1100₂ = 12₁₀ (with remainder 2 lost)
```

The low 2 bits (`10₂` = 2) are the remainder.

### Why This Works

In decimal, multiplying by 10 appends a zero. Dividing by 10 removes a digit. Binary is the same, but with powers of 2.

**Compilers use this aggressively**. Even `x * 10` often becomes:
```
x * 10 = x * 8 + x * 2 = (x << 3) + (x << 1)
```

Two shifts and an add are faster than one multiplication on some architectures.

## Signed Division Complications

For signed division, the right shift for division has a subtlety:

**Arithmetic right shift** preserves the sign bit:
```
-8 >> 1 = 11111000₂ >> 1 = 11111100₂ = -4  (correct!)
```

**Logical right shift** would give:
```
-8 >>> 1 = 11111000₂ >>> 1 = 01111100₂ = 124  (wrong for signed!)
```

C's `>>` on signed integers is implementation-defined but typically arithmetic. Java has both `>>` (arithmetic) and `>>>` (logical).

### Negative Division Rounding

There's a problem: arithmetic right shift rounds toward negative infinity, not toward zero:

```c
-7 / 4 = -1   (truncation toward zero)
-7 >> 2 = -2  (arithmetic shift rounds toward -∞)
```

For correct signed division by power of 2, compilers add a correction:
```c
// Compiler-generated code for: int y = x / 4;
if (x < 0) x += 3;  // Add (divisor - 1) if negative
y = x >> 2;
```

## Practical Applications

### Extracting Digits

Division and modulo extract decimal digits:

```c
int n = 1234;
while (n > 0) {
    int digit = n % 10;   // Get last digit
    printf("%d", digit);  // Prints 4, 3, 2, 1
    n = n / 10;           // Remove last digit
}
```

### Checking Divisibility

`a % b == 0` means a is divisible by b. Powers of 2 are special:

```c
// Check if n is divisible by 8
if ((n & 7) == 0) ...   // Bit trick: AND with (divisor - 1)

// Equivalent but slower:
if (n % 8 == 0) ...
```

### Coordinate Conversion

2D array indexing often uses division and modulo:

```c
// Convert linear index to 2D coordinates (row-major)
int row = index / width;
int col = index % width;

// Convert 2D to linear
int index = row * width + col;
```

## Key Takeaways

- Binary multiplication uses **shift-and-add**: each 1 bit in the multiplier adds a shifted copy of the multiplicand.
- Multiplication produces a result up to **twice the input bit width**—languages typically return only the low bits.
- Binary division uses **repeated subtraction** with shifting—it's inherently serial and slow.
- Division is 10-40× slower than multiplication, which is 3-5× slower than addition.
- **Power-of-2 operations** become simple shifts: `× 2ⁿ = << n`, `÷ 2ⁿ = >> n`.
- Compilers optimize non-power-of-2 multiplication using **shift-add combinations**.
- **Signed division** by powers of 2 requires care due to rounding differences.
- Integer division **truncates toward zero** in most languages; modulo keeps the dividend's sign.
- Understanding these operations helps you write efficient code and understand compiler optimizations.

