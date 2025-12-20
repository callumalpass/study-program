# Conversion Techniques (Decimal ↔ Binary/Hex)

You'll use conversions constantly in systems work—debugging memory dumps, analyzing network packets, working with assembly code, or understanding how data is stored. This subtopic focuses on **repeatable methods** you can trust under exam pressure and in real-world debugging sessions.

## Overview of Conversion Paths

The most common conversions you'll need:

```
        Decimal
       ↗       ↖
    Binary ↔ Hex
```

- **Decimal ↔ Binary**: Use place value expansion or repeated division
- **Decimal ↔ Hex**: Use place value expansion or repeated division (base 16)
- **Binary ↔ Hex**: Use 4-bit grouping (fastest and most practical)

Let's master each technique.

## Binary → Decimal (Place Value Expansion)

**Method**: Multiply each bit by its power of 2 and sum all the products.

**Step-by-step process**:
1. Write the binary number
2. Label each bit position with its power of 2, starting from 0 on the right
3. For each 1-bit, add the corresponding power of 2
4. Ignore 0-bits (they contribute nothing)

**Example 1**: Convert `101101₂` to decimal

```
Position:   5    4    3    2    1    0
Weight:    32   16    8    4    2    1
Bit:        1    0    1    1    0    1

Value = 32 + 8 + 4 + 1 = 45₁₀
```

**Tip for longer numbers**: Write the powers above the bits like a ruler:

```
weights: 128  64  32  16   8   4   2   1
bits:      1   0   1   1   0   1   0   0

Sum the weights where bits are 1:
128 + 32 + 16 + 4 = 180₁₀
```

**Example 2**: Convert `11111111₂` (the maximum 8-bit value)

```
weights: 128  64  32  16   8   4   2   1
bits:      1   1   1   1   1   1   1   1

Sum = 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255₁₀
```

Notice this equals 2⁸ - 1. In general, a binary number with all n bits set equals 2ⁿ - 1.

## Decimal → Binary (Repeated Division by 2)

**Method**: Repeatedly divide by 2, recording remainders, then read them in reverse order.

**Step-by-step process**:
1. Divide the decimal number by 2
2. Record the remainder (0 or 1) — this becomes a bit
3. Take the quotient and repeat
4. Stop when the quotient reaches 0
5. Read the remainders from bottom to top (last remainder is MSB)

**Example 1**: Convert `45₁₀` to binary

```
45 ÷ 2 = 22  remainder 1  ← LSB (rightmost)
22 ÷ 2 = 11  remainder 0
11 ÷ 2 = 5   remainder 1
 5 ÷ 2 = 2   remainder 1
 2 ÷ 2 = 1   remainder 0
 1 ÷ 2 = 0   remainder 1  ← MSB (leftmost)
```

Read upward: `101101₂`

**Verification**: 32 + 8 + 4 + 1 = 45 ✓

**Example 2**: Convert `200₁₀` to binary

```
200 ÷ 2 = 100  remainder 0
100 ÷ 2 = 50   remainder 0
 50 ÷ 2 = 25   remainder 0
 25 ÷ 2 = 12   remainder 1
 12 ÷ 2 = 6    remainder 0
  6 ÷ 2 = 3    remainder 0
  3 ÷ 2 = 1    remainder 1
  1 ÷ 2 = 0    remainder 1
```

Read upward: `11001000₂`

**Verification**: 128 + 64 + 8 = 200 ✓

## Alternative: Subtraction Method (Decimal → Binary)

Some people prefer this approach:

1. Find the largest power of 2 that fits into your number
2. Subtract it and mark that bit as 1
3. Repeat for the remainder
4. Fill in 0s for powers you skip

**Example**: Convert `45₁₀` to binary

```
45 - 32 = 13  → bit 5 is 1
13 - 8  = 5   → bit 3 is 1 (skip bit 4, so it's 0)
 5 - 4  = 1   → bit 2 is 1
 1 - 1  = 0   → bit 0 is 1 (skip bit 1, so it's 0)

Result: 101101₂
```

This method is faster for mental calculation once you know the powers of 2 well.

## Hexadecimal → Decimal (Place Value Expansion)

**Method**: Expand using powers of 16, remembering that A=10, B=11, ..., F=15.

**Example 1**: Convert `3A₁₆` to decimal

```
Position:    1      0
Digit:       3      A
Digit Value: 3     10
Weight:     16      1

Value = 3×16 + 10×1 = 48 + 10 = 58₁₀
```

**Example 2**: Convert `CAFE₁₆` to decimal

```
Position:       3       2       1       0
Digit:          C       A       F       E
Digit Value:   12      10      15      14
Weight:      4096     256      16       1

Value = 12×4096 + 10×256 + 15×16 + 14×1
      = 49152 + 2560 + 240 + 14
      = 51966₁₀
```

## Decimal → Hexadecimal (Repeated Division by 16)

**Method**: Divide by 16 repeatedly, recording remainders, converting to hex digits.

**Example**: Convert `58₁₀` to hex

```
58 ÷ 16 = 3  remainder 10 (A)  ← LSB
 3 ÷ 16 = 0  remainder 3       ← MSB
```

Read upward: `3A₁₆`

**Example 2**: Convert `255₁₀` to hex

```
255 ÷ 16 = 15  remainder 15 (F)
 15 ÷ 16 = 0   remainder 15 (F)
```

Read upward: `FF₁₆`

This confirms that `0xFF` = 255, the maximum 8-bit unsigned value.

**Example 3**: Convert `1000₁₀` to hex

```
1000 ÷ 16 = 62  remainder 8
  62 ÷ 16 = 3   remainder 14 (E)
   3 ÷ 16 = 0   remainder 3
```

Read upward: `3E8₁₆`

**Verification**: 3×256 + 14×16 + 8×1 = 768 + 224 + 8 = 1000 ✓

## Binary ↔ Hexadecimal (4-Bit Grouping)

This is the fastest conversion you'll do in practice, and it's the one systems programmers use constantly.

### Binary → Hex

**Method**:
1. Starting from the right, group bits into chunks of 4
2. Pad with leading zeros if needed to complete the leftmost group
3. Convert each 4-bit group to its hex digit

**Example 1**: Convert `110101011₂` to hex

```
Original:    110101011
Pad left:  0001 1010 1011
Hex:          1    A    B

Result: 1AB₁₆
```

**Example 2**: Convert `11111111₂` to hex

```
Grouped:  1111 1111
Hex:         F    F

Result: FF₁₆
```

**Example 3**: Convert `10010110₂` to hex

```
Grouped:  1001 0110
Hex:         9    6

Result: 96₁₆
```

### Hex → Binary

**Method**: Convert each hex digit to its 4-bit binary equivalent.

**Example 1**: Convert `9F₁₆` to binary

```
9 = 1001
F = 1111

Result: 10011111₂
```

**Example 2**: Convert `DEADBEEF₁₆` to binary (a famous debug value)

```
D = 1101
E = 1110
A = 1010
D = 1101
B = 1011
E = 1110
E = 1110
F = 1111

Result: 11011110101011011011111011101111₂
```

### Memorize the Nibble Table

For quick conversion, commit this to memory:

```
0 = 0000    4 = 0100    8 = 1000    C = 1100
1 = 0001    5 = 0101    9 = 1001    D = 1101
2 = 0010    6 = 0110    A = 1010    E = 1110
3 = 0011    7 = 0111    B = 1011    F = 1111
```

**Memory tricks**:
- 8 through F have their high bit set (1xxx)
- 0, 1, 8, 9 are "easy" (0000, 0001, 1000, 1001)
- A = 1010 alternates
- 5 = 0101 also alternates
- F = 1111 (all ones)

## Putting It Together: Multi-Step Conversions

Sometimes you need to convert between bases that don't have a direct shortcut. The strategy:

**Hex → Decimal**: Either expand directly with powers of 16, or convert hex→binary→decimal.

**Decimal → Binary → Hex**: If the decimal number is large, it's often easier to:
1. Convert to binary via repeated division by 2
2. Group the binary into nibbles
3. Convert each nibble to hex

**Example**: Convert `1000₁₀` to binary, then to hex

```
Binary (from earlier): 1111101000₂
Grouped: 0011 1110 1000
Hex:        3    E    8

Result: 3E8₁₆
```

## Key Takeaways

- **Binary ↔ Decimal**: Use place value expansion (to decimal) or repeated division by 2 (to binary).
- **Hex ↔ Decimal**: Same methods with base 16 and remembering A=10 through F=15.
- **Binary ↔ Hex**: 4-bit grouping is the "systems programmer" default—fast and error-resistant.
- Always verify your work by converting back, especially under exam conditions.
- The subtraction method offers a quick mental alternative for decimal→binary.
- Memorize the 16-entry nibble table for instant hex↔binary conversion.

