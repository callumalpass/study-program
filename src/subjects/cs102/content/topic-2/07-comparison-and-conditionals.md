---
id: cs102-t2-comparison-conditionals
title: "Comparison and Conditional Operations"
order: 7
---

# Comparison and Conditional Operations

Arithmetic operations compute new values, but programs also need to make decisions: Is A greater than B? Is this value zero? Did overflow occur? This subtopic explains how comparison works at the binary level and how the CPU's condition flags enable branching and conditional execution.

## The Need for Comparison

Every `if` statement, loop condition, and comparison operator ultimately reduces to binary comparisons in hardware. Understanding these operations reveals:

- How branch instructions decide which path to take
- Why signed and unsigned comparisons use different instructions
- How conditional moves can avoid branch misprediction penalties
- What the CPU flags actually mean

## Basic Comparison: Subtraction

At the hardware level, comparing A and B is implemented as computing A - B and examining the result:

```
A - B < 0  → A < B
A - B = 0  → A = B
A - B > 0  → A > B
```

The CPU doesn't store the result—it only updates the **flags** based on what the result would be.

### The CMP Instruction

In assembly, `CMP A, B` computes `A - B` but discards the result, keeping only the flags:

```assembly
CMP  rax, rbx    ; Compute rax - rbx, set flags, discard result
JL   less_than   ; Jump if Less Than (signed)
JB   below       ; Jump if Below (unsigned)
JE   equal       ; Jump if Equal
```

## CPU Condition Flags

The flags register (RFLAGS on x86-64) contains bits that describe the result of the most recent arithmetic operation:

### Zero Flag (ZF)

Set to 1 if the result is zero.

```
10 - 10 = 0  → ZF = 1
10 - 5  = 5  → ZF = 0
```

Used for equality comparisons: if `A - B` sets ZF, then A equals B.

### Sign Flag (SF)

Set to 1 if the result's most significant bit is 1 (the result is negative when interpreted as signed).

```
5 - 10 = -5 = 11111011₂  → SF = 1 (MSB is 1)
10 - 5 = 5 = 00000101₂   → SF = 0 (MSB is 0)
```

### Carry Flag (CF)

Set to 1 if there was a carry-out (for addition) or borrow (for subtraction) from the most significant bit.

```
Unsigned: 200 - 100 = 100  → CF = 0 (no borrow)
Unsigned: 100 - 200 = -100 → CF = 1 (borrow needed)
```

For unsigned arithmetic, CF indicates whether the true result is negative (would require negative representation, impossible for unsigned).

### Overflow Flag (OF)

Set to 1 if signed overflow occurred—the result is too large (or too negative) to represent in the available bits.

```
Signed 8-bit: 100 + 50 = 150  → OF = 1 (exceeds +127)
Signed 8-bit: -100 - 50 = -150  → OF = 1 (below -128)
```

OF is set when the carry into the MSB differs from the carry out of the MSB.

## Signed vs Unsigned Comparison

The same bit patterns mean different values depending on interpretation:

```
8-bit: 11111111
  Unsigned: 255
  Signed:   -1
```

When comparing `11111111` to `00000001`:
- Unsigned: 255 > 1 ✓
- Signed: -1 < 1 ✓

The subtraction `11111111 - 00000001 = 11111110` sets:
- SF = 1 (MSB is 1)
- CF = 0 (no borrow for unsigned)
- OF = 0 (no signed overflow)

### Unsigned Comparison Conditions

For unsigned A compared to B, after computing A - B:

| Relation | Condition | Flag Test |
|----------|-----------|-----------|
| A = B | Equal | ZF = 1 |
| A ≠ B | Not Equal | ZF = 0 |
| A < B | Below | CF = 1 |
| A ≤ B | Below or Equal | CF = 1 or ZF = 1 |
| A > B | Above | CF = 0 and ZF = 0 |
| A ≥ B | Above or Equal | CF = 0 |

### Signed Comparison Conditions

For signed A compared to B, after computing A - B:

| Relation | Condition | Flag Test |
|----------|-----------|-----------|
| A = B | Equal | ZF = 1 |
| A ≠ B | Not Equal | ZF = 0 |
| A < B | Less Than | SF ≠ OF |
| A ≤ B | Less or Equal | SF ≠ OF or ZF = 1 |
| A > B | Greater Than | SF = OF and ZF = 0 |
| A ≥ B | Greater or Equal | SF = OF |

The `SF ≠ OF` condition accounts for overflow: if overflow occurred, the sign bit is misleading.

### Why Different Conditions?

Consider comparing -1 and 1 (both 8-bit signed):

```
-1 = 11111111
 1 = 00000001

-1 - 1 = 11111110 = -2
SF = 1 (negative result)
OF = 0 (no overflow)
CF = 0 (no unsigned borrow)
```

- Signed comparison: SF (1) ≠ OF (0), so -1 < 1. ✓
- Unsigned comparison: CF = 0, so 255 ≥ 1. ✓

Same computation, different interpretation of the flags.

## Conditional Branch Instructions

After a CMP (or any arithmetic that sets flags), conditional jumps test the flags:

### x86-64 Examples

```assembly
; Signed comparisons
JE   target    ; Jump if Equal (ZF = 1)
JNE  target    ; Jump if Not Equal (ZF = 0)
JL   target    ; Jump if Less (SF ≠ OF)
JLE  target    ; Jump if Less or Equal
JG   target    ; Jump if Greater (SF = OF and ZF = 0)
JGE  target    ; Jump if Greater or Equal

; Unsigned comparisons
JB   target    ; Jump if Below (CF = 1)
JBE  target    ; Jump if Below or Equal
JA   target    ; Jump if Above (CF = 0 and ZF = 0)
JAE  target    ; Jump if Above or Equal
```

### Common Patterns

```assembly
; if (a < b) goto less
CMP  a, b
JL   less      ; signed
; or
JB   less      ; unsigned

; while (count > 0)
loop_start:
    CMP  count, 0
    JLE  loop_end   ; signed: count <= 0 ends loop
    ; loop body
    DEC  count
    JMP  loop_start
loop_end:
```

## Testing for Zero

A common optimization: instead of `CMP x, 0`, use `TEST x, x`:

```assembly
; Traditional
CMP  rax, 0
JE   is_zero

; Optimized
TEST rax, rax   ; Computes rax AND rax, sets ZF if zero
JZ   is_zero    ; JZ is alias for JE
```

`TEST` is faster because it's simpler than subtraction. The result of `x AND x` is zero if and only if x is zero.

## Conditional Move (CMOV)

Modern CPUs support conditional moves that avoid branch misprediction:

```assembly
; Traditional (may mispredict)
CMP  rax, rbx
JL   use_rbx
MOV  rcx, rax   ; rcx = rax
JMP  done
use_rbx:
MOV  rcx, rbx   ; rcx = rbx
done:

; Conditional move (no branch)
CMP  rax, rbx
CMOVL rcx, rbx  ; If rax < rbx, rcx = rbx
CMOVGE rcx, rax ; If rax >= rbx, rcx = rax
```

Both paths execute, but only one result is kept. This eliminates branch misprediction penalty for unpredictable branches.

### When CMOV Helps

- Unpredictable branches (50/50 outcomes)
- Short conditional bodies (just one assignment)
- Performance-critical code paths

### When CMOV Hurts

- Predictable branches (CPU predicts correctly 99%+ of the time)
- When one path is expensive (CMOV always computes both)
- Complex conditional logic (multiple dependent conditions)

## Compound Conditions

High-level constructs like `if (a > 0 && b < 10)` become multiple comparisons:

```c
if (a > 0 && b < 10) {
    // body
}
```

Compiles to (short-circuit evaluation):

```assembly
CMP  a, 0
JLE  skip       ; a <= 0? Skip to else
CMP  b, 10
JGE  skip       ; b >= 10? Skip to else
; body
skip:
```

The second comparison only happens if the first succeeds—this is short-circuit evaluation.

## Comparison in High-Level Languages

### Integer Comparison

```c
if (a < b) ...      // Signed comparison
if ((unsigned)a < (unsigned)b) ...  // Unsigned comparison
```

Languages like C require explicit casts for unsigned comparison when mixing signed and unsigned.

### Floating-Point Comparison

Floating-point comparison is more complex due to:
- NaN (Not a Number): `NaN != NaN` and `!(NaN < x)` for any x
- Signed zeros: `+0.0 == -0.0`
- Infinities: `INFINITY > all finite numbers`

Special CPU flags exist for floating-point unordered (NaN) results.

### Pointer Comparison

Comparing pointers compares memory addresses (unsigned):

```c
int arr[10];
if (&arr[3] > &arr[0]) ...  // Always true
```

But comparing pointers to different objects is undefined behavior in C.

## Practical Applications

### Min/Max Functions

```c
int min(int a, int b) {
    return a < b ? a : b;
}
```

With CMOV:
```assembly
CMP   edi, esi   ; Compare a and b
CMOVL eax, edi   ; If a < b, result = a
CMOVGE eax, esi  ; If a >= b, result = b
```

### Clamping Values

```c
int clamp(int x, int lo, int hi) {
    if (x < lo) return lo;
    if (x > hi) return hi;
    return x;
}
```

### Sign Detection

```c
int sign(int x) {
    if (x > 0) return 1;
    if (x < 0) return -1;
    return 0;
}

// Branchless alternative (trickier)
int sign(int x) {
    return (x > 0) - (x < 0);
}
```

## Key Takeaways

- Comparison is implemented as **subtraction** followed by flag examination.
- The **Zero Flag (ZF)** indicates equality; **Sign Flag (SF)** indicates negative results.
- **Carry Flag (CF)** is for unsigned overflow/borrow; **Overflow Flag (OF)** is for signed overflow.
- **Signed and unsigned comparisons** use different flag tests despite identical subtraction.
- Conditional jumps like **JL (signed) and JB (unsigned)** test appropriate flag combinations.
- **Conditional moves (CMOV)** avoid branch misprediction but compute both paths.
- **Short-circuit evaluation** means compound conditions may not evaluate all parts.
- Understanding flags is essential for assembly programming and low-level debugging.
- The same bits can produce different comparison results depending on signed/unsigned interpretation.

