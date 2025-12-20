# Worked Examples and Self-Checks

This subtopic ties together addition, subtraction, two's complement, overflow detection, and shifts with comprehensive worked examples. Working through these problems step-by-step will solidify your understanding and prepare you for exams and real-world debugging scenarios.

## Example 1: Unsigned Addition with Carry

**Problem**: Compute `250 + 10` in 8-bit unsigned arithmetic. Determine if overflow occurs.

**Solution**:

First, convert to binary:
```
250₁₀ = 11111010₂
 10₁₀ = 00001010₂
```

Perform the addition:
```
    11111      ← carries
    11111010   (250)
  + 00001010   (10)
  ----------
   100000100
```

The result is 9 bits: `100000100`

For 8-bit storage, we keep only the low 8 bits: `00000100` = 4

**Analysis**:
- Carry out = 1 → **Unsigned overflow occurred**
- Mathematical result: 250 + 10 = 260
- Stored result: 4 (260 mod 256 = 4)
- The unsigned interpretation is wrong because 260 > 255

**Verification**: 260 = 256 + 4, and 256 wraps around to 0, leaving 4. ✓

## Example 2: Signed Addition Without Overflow

**Problem**: Compute `50 + (-20)` in 8-bit signed arithmetic.

**Solution**:

Convert to binary (including negation for -20):
```
 50₁₀ = 00110010₂

 20₁₀ = 00010100₂
 Invert: 11101011
 Add 1:  11101100
-20₁₀ = 11101100₂
```

Perform the addition:
```
    111 11     ← carries
    00110010   (50)
  + 11101100   (-20)
  ----------
   100011110
```

Keep 8 bits: `00011110`

**Interpretation**:
```
00011110₂ = 16 + 8 + 4 + 2 = 30₁₀
```

**Overflow check**:
- Operand signs: positive + negative
- Since signs differ, overflow is impossible
- Carry into MSB: 1
- Carry out of MSB: 1
- Carry in = Carry out → No overflow ✓

**Verification**: 50 + (-20) = 30 ✓

## Example 3: Signed Overflow (Positive + Positive)

**Problem**: In 4-bit signed arithmetic (range -8 to 7), compute `7 + 3`.

**Solution**:
```
7₁₀ = 0111₂
3₁₀ = 0011₂
```

Addition:
```
   111     ← carries
   0111    (7)
 + 0011    (3)
 ------
   1010
```

**Interpretation as 4-bit signed**:
```
1010₂ = -8 + 2 = -6
```

**Overflow check**:
- Both operands positive (MSB = 0)
- Result appears negative (MSB = 1)
- **Overflow occurred!**
- Carry into MSB: 1
- Carry out of MSB: 0
- Carry in ≠ Carry out → Overflow confirmed

**Analysis**: 7 + 3 = 10, but 10 > 7 (max 4-bit signed). The result -6 is completely wrong.

## Example 4: Signed Overflow (Negative + Negative)

**Problem**: In 4-bit signed arithmetic, compute `(-5) + (-5)`.

**Solution**:
```
 5₁₀ = 0101₂
 Invert: 1010
 Add 1:  1011
-5₁₀ = 1011₂
```

Addition:
```
   111     ← carries
   1011    (-5)
 + 1011    (-5)
 ------
  10110
```

Keep 4 bits: `0110`

**Interpretation as 4-bit signed**:
```
0110₂ = 6
```

**Overflow check**:
- Both operands negative (MSB = 1)
- Result appears positive (MSB = 0)
- **Overflow occurred!**
- Carry into MSB: 1
- Carry out of MSB: 1... wait, let me recalculate

Actually, let me trace more carefully:
```
Position 0: 1+1 = 0, carry 1
Position 1: 1+1+1 = 1, carry 1
Position 2: 0+0+1 = 1, carry 0  ← carry INTO MSB
Position 3: 1+1+0 = 0, carry 1  ← carry OUT OF MSB
```

Result: `0110` with carry out = 1

- Carry into MSB: 0
- Carry out of MSB: 1
- Carry in ≠ Carry out → **Overflow confirmed**

**Analysis**: (-5) + (-5) = -10, but -10 < -8 (min 4-bit signed). The result 6 is completely wrong.

## Example 5: Two's Complement Negation

**Problem**: Represent -37 in 8-bit two's complement.

**Solution**:
```
37₁₀ = 32 + 4 + 1 = 00100101₂

Invert all bits:
00100101 → 11011010

Add 1:
11011010
       +1
---------
11011011
```

**Answer**: -37 is `11011011` in 8-bit two's complement.

**Verification** (negate back to positive):
```
11011011
Invert: 00100100
Add 1:  00100101 = 37 ✓
```

**Alternative verification** (interpret directly):
```
11011011 = -128 + 64 + 16 + 8 + 2 + 1 = -128 + 91 = -37 ✓
```

## Example 6: Left Shift with Overflow Check

**Problem**: Compute `45 << 2` in 8-bit unsigned. Does overflow occur?

**Solution**:
```
45₁₀ = 00101101₂

Shift left by 2 (multiply by 4):
00101101 << 2 = 10110100
```

**Interpretation**:
```
10110100₂ = 128 + 32 + 16 + 4 = 180
```

**Overflow check**: Did we lose any 1-bits?
- Original high 2 bits: `00` (both zero)
- No 1-bits were shifted out
- **No overflow**

**Verification**: 45 × 4 = 180 ✓

**Contrast**: What about `96 << 2`?
```
96₁₀ = 01100000₂
01100000 << 2 = 10000000  (shifted out: 01)
```
We lost a 1-bit! 96 × 4 = 384, but stored result is 128. **Overflow occurred**.

## Example 7: Arithmetic vs Logical Right Shift

**Problem**: Compute `11110100₂ >> 2` using both arithmetic and logical shift. Interpret results.

**Logical right shift** (fill with zeros):
```
11110100 >>> 2 = 00111101
```
As unsigned: 244 >> 2 = 61. And 244 ÷ 4 = 61 ✓

**Arithmetic right shift** (copy sign bit):
```
11110100 >> 2 = 11111101
```
As signed: -12 >> 2 = -3. Let's verify: `11110100` = -128 + 116 = -12. And -12 ÷ 4 = -3 ✓

**Key insight**: Same operation, different fill behavior, both correct for their respective interpretations.

## Example 8: Mixed Signed/Unsigned Interpretation

**Problem**: The bit pattern `10001100` is stored in an 8-bit register. What value does it represent as (a) unsigned and (b) signed?

**(a) Unsigned**:
```
10001100₂ = 128 + 8 + 4 = 140
```

**(b) Signed (two's complement)**:
```
10001100₂ = -128 + 8 + 4 = -116
```

**The bits are identical**—only the interpretation differs.

## Self-Check Strategy

When solving binary arithmetic problems, follow this checklist:

### Before calculating:
1. **Identify the bit width**: 4-bit? 8-bit? 16-bit?
2. **Determine signedness**: Unsigned or signed (two's complement)?
3. **Know the range**:
   - 8-bit unsigned: 0 to 255
   - 8-bit signed: -128 to 127

### During calculation:
4. **Track carries carefully**: Write them above the columns
5. **Discard excess bits**: Only keep N bits for N-bit arithmetic
6. **Watch for overflow conditions**:
   - Unsigned: carry out indicates overflow
   - Signed: sign flip (same-sign operands, different-sign result) indicates overflow

### After calculating:
7. **Verify with decimal**: Convert back and check the math
8. **Sanity check the result**: Is the magnitude reasonable?

## Practice Problems

Try these yourself before checking answers:

1. Compute `11010110₂ + 00101101₂` in 8-bit unsigned. Is there a carry?
2. Represent -100 in 8-bit two's complement.
3. In 8-bit signed, compute `(-50) + (-100)`. Does overflow occur?
4. Compute `96₁₀ >> 3` (logical shift). What's the result?
5. What is `11111111₂` as (a) 8-bit unsigned and (b) 8-bit signed?

### Answers

1. `11010110 + 00101101 = 100000011` → 8-bit result is `00000011` (3) with carry = 1

2. `100 = 01100100`, invert = `10011011`, add 1 = `10011100`. So -100 = `10011100`

3. -50 = `11001110`, -100 = `10011100`. Sum = `01101010` = +106. Both negative, result positive → **overflow**!

4. 96 = `01100000`, logical >> 3 = `00001100` = 12. (96 ÷ 8 = 12) ✓

5. (a) `11111111` unsigned = 255; (b) `11111111` signed = -1

## Key Takeaways

- Always work in a **fixed bit width** and know whether values are **signed or unsigned**.
- **Carry** indicates unsigned overflow; **sign change** (same-sign inputs, opposite-sign output) indicates signed overflow.
- Two's complement negation: **invert and add 1**.
- **Verify** by converting to decimal—catches most arithmetic mistakes.
- The **same bits** mean different values depending on interpretation.
- Practice builds speed and accuracy—these are fundamental skills for CS102 and beyond.

