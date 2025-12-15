# Binary Addition and Subtraction

Binary arithmetic is the foundation for understanding how computers perform all mathematical operations. Every addition, subtraction, multiplication, or division that occurs in your programs ultimately breaks down to binary operations in the CPU's arithmetic logic unit (ALU). The rules are simpler than decimal arithmetic—there are only four cases for single-bit addition—but you need to practice carrying and borrowing accurately to avoid errors.

## Why Binary Arithmetic Matters

When you write `x + y` in any programming language, the CPU performs binary addition on the bit patterns representing x and y. Understanding binary arithmetic helps you:

- Predict overflow conditions before they crash your program
- Understand how two's complement makes subtraction work with addition hardware
- Debug low-level code and assembly language
- Optimize code by understanding bit-level operations
- Pass technical interviews that test computer fundamentals

## Binary Addition: The Carry Mechanism

Binary addition works just like decimal addition, except the only digits are 0 and 1. When a column sums to 2 or more, we carry to the next column.

### The 1-Bit Addition Table

There are only four cases for adding two single bits:

| A | B | Sum | Carry Out |
|---|---|-----|-----------|
| 0 | 0 |  0  |     0     |
| 0 | 1 |  1  |     0     |
| 1 | 0 |  1  |     0     |
| 1 | 1 |  0  |     1     |

The key insight: `1 + 1 = 10₂` (which is 2 in decimal). We write 0 in the sum column and carry 1 to the next position.

When there's a carry-in from a previous column, we're actually adding three bits:

| A | B | Carry In | Sum | Carry Out |
|---|---|----------|-----|-----------|
| 0 | 0 |    0     |  0  |     0     |
| 0 | 0 |    1     |  1  |     0     |
| 0 | 1 |    0     |  1  |     0     |
| 0 | 1 |    1     |  0  |     1     |
| 1 | 0 |    0     |  1  |     0     |
| 1 | 0 |    1     |  0  |     1     |
| 1 | 1 |    0     |  0  |     1     |
| 1 | 1 |    1     |  1  |     1     |

This three-input addition is exactly what a **full adder** circuit computes in hardware.

### Step-by-Step Addition Example

Let's add `101101₂` (45) and `011011₂` (27):

```
      1 11 1      ← Carries
      101101      ← 45
    + 011011      ← 27
    --------
     1001000      ← 72
```

Working right-to-left:
- Position 0: 1+1 = 10₂ → write 0, carry 1
- Position 1: 0+1+1(carry) = 10₂ → write 0, carry 1
- Position 2: 1+0+1(carry) = 10₂ → write 0, carry 1
- Position 3: 1+1+1(carry) = 11₂ → write 1, carry 1
- Position 4: 0+1+1(carry) = 10₂ → write 0, carry 1
- Position 5: 1+0+1(carry) = 10₂ → write 0, carry 1
- Position 6: 0+0+1(carry) = 1 → write 1, no carry

Result: `1001000₂` = 64 + 8 = 72 ✓

### Another Example: Maximum 8-Bit Values

Adding `11111111₂` (255) and `00000001₂` (1):

```
    11111111      ← carries propagate all the way
    11111111      ← 255
  + 00000001      ← 1
  ----------
   100000000      ← 256 (9 bits!)
```

This result is 9 bits, but if we're working with 8-bit unsigned integers, the leftmost bit is lost (carry out), leaving `00000000` — a classic unsigned overflow.

## Binary Subtraction: The Borrow Mechanism

Binary subtraction works like decimal subtraction with borrowing, but since we're in base 2, when we borrow, we add 2 to the current position.

### The 1-Bit Subtraction Table

| A | B | Difference | Borrow |
|---|---|------------|--------|
| 0 | 0 |     0      |   0    |
| 1 | 0 |     1      |   0    |
| 1 | 1 |     0      |   0    |
| 0 | 1 |     1      |   1    |

The last row is the interesting case: `0 - 1` cannot be done directly, so we borrow 1 from the next higher position. This gives us `10₂ - 1₂ = 1₂` (that's 2 - 1 = 1 in decimal).

### Step-by-Step Subtraction Example

Let's compute `10010₂` (18) minus `01101₂` (13):

```
      0 1        ← Borrows
      10010      ← 18
    - 01101      ← 13
    -------
      00101      ← 5
```

Working right-to-left:
- Position 0: 0-1 → borrow, becomes 2-1=1
- Position 1: 1-0-1(borrow) = 0
- Position 2: 0-1 → borrow, becomes 2-1=1
- Position 3: 0-1-1(borrow) → borrow again, 2-1-1=0 with borrow
- Position 4: 1-0-1(borrow) = 0

Result: `00101₂` = 5 ✓ (since 18 - 13 = 5)

### A More Complex Example

Subtract `11010₂` (26) from `110001₂` (49):

```
       1         ← Borrows
      110001     ← 49
    -  11010     ← 26
    --------
      010111     ← 23
```

Verification: 49 - 26 = 23 ✓

## Common Patterns and Shortcuts

### Adding a Number to Itself

When you add a number to itself, the result is a left shift by 1 position:

```
x + x = x << 1 = 2x
```

For example:
```
  00101 (5)
+ 00101 (5)
-------
  01010 (10)
```

This is equivalent to shifting left by 1.

### Recognizing All-Ones Patterns

Binary numbers with all 1s have special properties:

- Adding 1 to all-ones produces all-zeros with a carry: `1111 + 1 = 10000`
- The value of n ones is 2ⁿ - 1 (e.g., `1111₂` = 15 = 2⁴ - 1)

### Subtracting from Powers of Two

Subtracting 1 from a power of 2 gives all-ones below that position:

```
  10000 (16)
- 00001 (1)
-------
  01111 (15)
```

## Verification Strategies

When practicing binary arithmetic, always verify your work:

1. **Convert to decimal**: Do the same operation in decimal and compare.
2. **Check bit counts**: If adding two n-bit numbers, the result can be at most n+1 bits.
3. **Estimate magnitude**: A rough decimal estimate catches gross errors.
4. **Add back**: Verify subtraction by adding the result to the subtrahend.

### Example Verification

We calculated `101101₂ + 011011₂ = 1001000₂`

Decimal check:
- `101101₂` = 32 + 8 + 4 + 1 = 45
- `011011₂` = 16 + 8 + 2 + 1 = 27
- `1001000₂` = 64 + 8 = 72
- 45 + 27 = 72 ✓

## Key Takeaways

- Binary addition uses **carry** just like decimal; the base is 2 instead of 10.
- The rule `1 + 1 = 10₂` (write 0, carry 1) is the only non-obvious case.
- Binary subtraction uses **borrow**; `0 - 1` borrows from the next position.
- The same hardware addition circuit can be used for subtraction with two's complement (covered next).
- Always verify with a quick decimal check when learning.
- Carries propagating through multiple positions is called **carry propagation** and affects CPU performance.

