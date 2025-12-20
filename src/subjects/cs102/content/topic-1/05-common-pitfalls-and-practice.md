# Common Pitfalls and Practice

Converting between bases is mechanically straightforward, but it's also easy to make small mistakes that lead to completely wrong answers. This subtopic identifies the most common errors and provides practice problems with detailed solutions. Learning to avoid these pitfalls will save you time and frustration on exams and in real debugging sessions.

## Pitfall 1: Reading Remainders in the Wrong Direction

When converting decimal to binary (or any base) using repeated division, you write remainders top-to-bottom but must read them **bottom-to-top**.

**The Wrong Way**:
```
45 ÷ 2 = 22 r1  ← First remainder
22 ÷ 2 = 11 r0
11 ÷ 2 = 5  r1
 5 ÷ 2 = 2  r1
 2 ÷ 2 = 1  r0
 1 ÷ 2 = 0  r1  ← Last remainder

Wrong answer (reading top-to-bottom): 101101 ← Actually happens to be the same!
```

This particular example works out the same, but consider converting 12:

```
12 ÷ 2 = 6 r0
 6 ÷ 2 = 3 r0
 3 ÷ 2 = 1 r1
 1 ÷ 2 = 0 r1

Reading top-to-bottom (WRONG): 0011₂ = 3
Reading bottom-to-top (CORRECT): 1100₂ = 12 ✓
```

**How to remember**: The first remainder you calculate is the **least significant bit** (rightmost), and the last remainder is the **most significant bit** (leftmost). Read from the last remainder to the first.

**Self-check**: If your binary result starts with leading zeros or seems too small, you probably read in the wrong direction.

## Pitfall 2: Forgetting to Pad When Grouping

Binary-to-hex (or binary-to-octal) conversion requires complete groups. If the leftmost group is short, you must pad with leading zeros.

**Incorrect conversion**:
```
Binary: 101011
Grouped without padding: 10 1011  ← "10" is only 2 bits!
```

**Correct conversion**:
```
Binary: 101011
Pad to complete group: 0010 1011
Hex: 2B
```

**Why it matters**: Without proper padding, you might incorrectly read `10₂` as a hex digit (there is no hex digit for "10" as a single symbol—that would be A, which is `1010₂`).

**Self-check**: Count your bits. For hex conversion, you need a multiple of 4. For octal, a multiple of 3. If not, add leading zeros.

## Pitfall 3: Confusing Hex Symbols with Values

The letters A-F in hex are **numeric values**, not letters:

| Symbol | Value |
|--------|-------|
| A | 10 |
| B | 11 |
| C | 12 |
| D | 13 |
| E | 14 |
| F | 15 |

**Common mistakes**:

- Thinking `0x10` is "ten" — it's actually 16₁₀
- Thinking `0xA` is somehow related to the letter A — it's just 10₁₀
- Forgetting that `A + 6 = 10` in hex (10 + 6 = 16, which is 10₁₆)

**Example calculation**:
```
0x3A + 0x0F = ?

A = 10, F = 15
10 + 15 = 25

25 in hex: 25 = 16 + 9 = 0x19

Wait, let's think about this properly:
0x3A = 3×16 + 10 = 58
0x0F = 15
58 + 15 = 73

73 ÷ 16 = 4 r9
So 73₁₀ = 0x49

Or directly in hex:
A + F = 10 + 15 = 25 = 16 + 9, so write 9 carry 1
3 + 0 + 1 = 4
Result: 0x49 ✓
```

**Self-check**: When you see a hex number, mentally read A as "ten", B as "eleven", etc. This keeps you thinking in numeric terms.

## Pitfall 4: Dropping the Base Notation

In conversions, the same digits can mean completely different values:

- `1010₂` (binary) = 10₁₀ (decimal)
- `1010₁₀` (decimal) = 1010
- `1010₈` (octal) = 520₁₀ (decimal)
- `1010₁₆` (hex) = 4112₁₀ (decimal)

**Always label your answers** with the base, especially during exam work. Use:
- Subscripts: 1010₂, 1010₁₀, 1010₁₆
- Prefixes: 0b1010, 0o1010, 0x1010
- Suffixes: 1010b, 1010h (common in assembly)

**Self-check**: Before writing a final answer, ask yourself: "Would someone reading this know what base I mean?"

## Pitfall 5: Octal Trap in Programming

In C, C++, and some other languages, a leading zero indicates octal:

```c
int x = 10;   // Decimal ten
int y = 010;  // Octal 10 = Decimal EIGHT!
int z = 08;   // COMPILER ERROR! 8 is not a valid octal digit
```

This has caused countless bugs, especially when someone aligns numbers visually:

```c
int months[] = {
    01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12
    //                          ^^  ^^ These are errors!
};
```

**Best practice**: Never use leading zeros unless you intend octal. Modern languages like Python 3 require `0o` for octal (`0o10`), which is much clearer.

## Pitfall 6: Off-by-One in Powers

When calculating place values, remember that position numbering starts at 0:

```
Position:  3   2   1   0
Digit:     1   0   1   1
Weight:   2³  2²  2¹  2⁰
        = 8   4   2   1
```

A 4-digit binary number has positions 0, 1, 2, 3 — the highest position is **n-1** for an n-digit number.

**Common mistake**: Thinking the leftmost digit of `1011` is position 4 (it's position 3).

**Self-check**: The leftmost digit of an n-digit number is in position n-1.

## Pitfall 7: Sign Confusion (Preview)

For unsigned binary, all bit patterns are positive. But in two's complement (signed), the MSB indicates sign:

```
Unsigned 8-bit:   11111111 = 255
Signed 8-bit:     11111111 = -1
```

We'll cover this in detail in Topic 2 (Binary Arithmetic), but be aware that the same bits mean different values depending on interpretation.

**Self-check**: Always know whether you're working with signed or unsigned values.

## Practice Problems

Test yourself with these problems. Work through them on paper before checking answers.

### Conversions

1. Convert `111001₂` to decimal
2. Convert `73₁₀` to binary
3. Convert `0x3C` to binary
4. Convert `0b10010110` to hex
5. Convert `725₈` to binary
6. Convert `0xBEEF` to decimal
7. Convert `500₁₀` to hex
8. Convert `11101010₂` to octal

### Solutions

**Problem 1**: `111001₂` to decimal
```
Weights: 32 16 8 4 2 1
Bits:     1  1 1 0 0 1
Sum = 32 + 16 + 8 + 1 = 57₁₀
```

**Problem 2**: `73₁₀` to binary
```
73 ÷ 2 = 36 r1
36 ÷ 2 = 18 r0
18 ÷ 2 = 9  r0
 9 ÷ 2 = 4  r1
 4 ÷ 2 = 2  r0
 2 ÷ 2 = 1  r0
 1 ÷ 2 = 0  r1

Reading bottom-to-top: 1001001₂
Verify: 64 + 8 + 1 = 73 ✓
```

**Problem 3**: `0x3C` to binary
```
3 = 0011
C = 1100

Result: 00111100₂ (or 111100₂ without leading zeros)
```

**Problem 4**: `0b10010110` to hex
```
Grouped: 1001 0110
             9    6

Result: 0x96
```

**Problem 5**: `725₈` to binary
```
7 = 111
2 = 010
5 = 101

Result: 111010101₂
```

**Problem 6**: `0xBEEF` to decimal
```
B×16³ + E×16² + E×16¹ + F×16⁰
= 11×4096 + 14×256 + 14×16 + 15×1
= 45056 + 3584 + 224 + 15
= 48879₁₀
```

**Problem 7**: `500₁₀` to hex
```
500 ÷ 16 = 31 r4
 31 ÷ 16 = 1  r15 (F)
  1 ÷ 16 = 0  r1

Reading bottom-to-top: 1F4₁₆
Verify: 1×256 + 15×16 + 4 = 256 + 240 + 4 = 500 ✓
```

**Problem 8**: `11101010₂` to octal
```
Grouped (3 bits): 011 101 010
Octal:              3   5   2

Result: 352₈
```

## Quick Reference Checklist

Before submitting any conversion:

- [ ] Did I read remainders in the correct direction (bottom-to-top)?
- [ ] Did I pad with leading zeros when grouping bits?
- [ ] Did I use A=10, B=11, C=12, D=13, E=14, F=15?
- [ ] Is my answer labeled with the correct base?
- [ ] Did I verify by converting back?

## Key Takeaways

- Read remainders **bottom-to-top** when converting decimal to any base.
- **Pad with leading zeros** to complete groups when converting binary to hex/octal.
- Treat hex letters as **numbers**: A=10, B=11, ..., F=15.
- **Always label bases** to avoid ambiguity.
- Beware of **octal literals** in C-style languages (leading zero = octal).
- Position numbering starts at **0** from the right.
- Practice conversions until they become automatic—speed and accuracy come with repetition.

