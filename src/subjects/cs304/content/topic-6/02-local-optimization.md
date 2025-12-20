# Local Optimization

Local optimization operates within the boundaries of a single basic block—a maximal sequence of consecutive instructions with no branches except at the entry and exit. Because control flow doesn't change within a basic block, local optimizations can be performed efficiently with simple, single-pass algorithms. These optimizations form the foundation of compiler optimization and often provide substantial performance improvements with minimal complexity.

## Basic Blocks and Local Analysis

A basic block has a single entry point (the first instruction) and a single exit point (the last instruction). This property simplifies analysis because every instruction in the block executes exactly once per block execution.

```c
// Example basic blocks
int compute(int x, int y) {
    // Basic Block 1 (BB1)
    int a = x + y;
    int b = a * 2;

    // BB1 ends here (branch)
    if (b > 10) {
        // Basic Block 2 (BB2)
        int c = b - 5;
        return c;
    } else {
        // Basic Block 3 (BB3)
        int d = b + 5;
        return d;
    }
}
```

Within each basic block, we can apply various local optimizations without worrying about complex control flow interactions.

## Constant Folding

Constant folding evaluates expressions with constant operands at compile time rather than runtime. This eliminates runtime computation and can expose further optimization opportunities.

**Basic Constant Folding**: Evaluating arithmetic expressions with literal constants.

```c
// Before optimization
int x = 3 + 5;
int y = x * 2;
int z = 100 / 4;

// After constant folding
int x = 8;
int y = x * 2;  // Can't fold yet (x is a variable)
int z = 25;
```

**Constant Propagation**: When combined with constant propagation (identifying variables with constant values), more opportunities emerge:

```c
// Before
int x = 8;      // x is constant
int y = x * 2;  // x's value known

// After constant propagation and folding
int x = 8;
int y = 16;
```

**Algebraic Identities**: Recognizing mathematical identities to simplify expressions.

```c
// Before
int a = x * 1;    // Identity: multiply by 1
int b = y + 0;    // Identity: add 0
int c = z * 0;    // Annihilator: multiply by 0
int d = w & 0;    // Annihilator: bitwise AND with 0

// After
int a = x;
int b = y;
int c = 0;
int d = 0;
```

**Compile-Time Evaluation**: More complex expressions can also be evaluated:

```c
// Before
int factorial = 1 * 2 * 3 * 4 * 5;
bool comparison = (10 > 5) && (3 < 7);
int shift = 16 << 2;

// After
int factorial = 120;
bool comparison = true;  // or 1
int shift = 64;
```

## Strength Reduction

Strength reduction replaces expensive operations with cheaper equivalent operations. The "strength" refers to computational cost—stronger operations are more expensive.

**Arithmetic Strength Reduction**: Common replacements include:

```c
// Multiplication by power of 2 → Shift
// Before
int a = x * 4;
int b = y * 8;

// After
int a = x << 2;  // Left shift by 2 equals multiply by 4
int b = y << 3;  // Left shift by 3 equals multiply by 8

// Division by power of 2 → Shift (for unsigned)
// Before
unsigned c = x / 4;

// After
unsigned c = x >> 2;  // Right shift by 2 equals divide by 4

// Multiplication by constant → Addition chain
// Before
int d = x * 10;

// After
int temp = x << 3;   // x * 8
int d = temp + (x << 1);  // x * 8 + x * 2 = x * 10
```

**Exponentiation**: Converting exponentiation to multiplication:

```c
// Before
double result = pow(x, 2);

// After
double result = x * x;  // Much faster than library call
```

**Addressing Mode Strength Reduction**: On some architectures, certain addressing modes are faster:

```c
// Before
int value = array[i * 4];  // Multiply then index

// After (if architecture supports scaled indexing)
int value = *(array + (i << 2));  // Use scaled index mode
```

## Peephole Optimization

Peephole optimization examines a small "window" (the peephole) of consecutive instructions and replaces inefficient sequences with better ones. The window typically spans 2-5 instructions.

**Redundant Load/Store Elimination**:

```assembly
; Before
MOV R1, x      ; Load x into R1
MOV x, R1      ; Store R1 back to x (redundant!)
ADD R1, R2     ; Use R1

; After
MOV R1, x      ; Load x into R1
ADD R1, R2     ; Use R1 (store eliminated)
```

**Algebraic Simplification**:

```assembly
; Before
ADD R1, #0     ; Add 0 to R1
MUL R2, #1     ; Multiply R2 by 1

; After
; (both instructions eliminated as no-ops)
```

**Instruction Combination**:

```assembly
; Before
MOV R1, R2     ; Copy R2 to R1
ADD R1, R3     ; Add R3 to R1

; After (if architecture supports)
ADD R1, R2, R3 ; R1 = R2 + R3 (single instruction)
```

**Dead Store Elimination**:

```assembly
; Before
MOV R1, #5     ; Set R1 to 5
MOV R1, #10    ; Immediately overwrite with 10

; After
MOV R1, #10    ; First store is dead
```

**Branch Optimization**:

```assembly
; Before
CMP R1, R2
JE label1
JMP label2
label1:

; After (branch to next instruction eliminated)
CMP R1, R2
JNE label2
label1:
```

## Copy Propagation

Copy propagation replaces uses of a variable that's a copy of another variable with the original variable, potentially eliminating the copy.

```c
// Before
int a = x;
int b = a;      // b is a copy of a
int c = b + 5;  // Use b

// After copy propagation
int a = x;
int b = a;
int c = a + 5;  // Use a directly (if safe)

// After dead code elimination (if b is not used elsewhere)
int a = x;
int c = a + 5;
```

**Conditions for Copy Propagation**:
1. The source variable must not be modified between the copy and the use
2. The copy must dominate all uses being replaced
3. No aliasing issues (in languages with pointers)

```c
// Example where copy propagation is unsafe
int a = x;
int b = a;
a = 10;         // a modified!
int c = b + 5;  // Must use b, not a
```

## Algebraic Simplification

Beyond simple identities, recognizing more complex algebraic patterns can simplify code:

**Boolean Simplification**:

```c
// Before
bool a = x && true;
bool b = y || false;
bool c = !(!z);
bool d = x && x;  // Idempotent

// After
bool a = x;
bool b = y;
bool c = z;
bool d = x;
```

**Distributive Laws**:

```c
// Before
int result = (a * b) + (a * c);

// After (if beneficial)
int result = a * (b + c);  // Reduces one multiplication
```

**Common Subexpression Elimination (Local)**:

```c
// Before
int a = x + y;
int b = (x + y) * 2;  // x + y computed again

// After
int a = x + y;
int b = a * 2;  // Reuse a
```

## Value Numbering

Value numbering is a technique to detect equivalent expressions by assigning the same "value number" to expressions that compute the same value.

```c
// Before
int a = x + y;
int b = 5;
int c = x + y;  // Same as a
int d = x + y;  // Same as a and c

// Value numbering assigns:
// (x + y) → value number 1
// 5 → value number 2

// After optimization
int a = x + y;  // VN 1
int b = 5;      // VN 2
int c = a;      // Reuse VN 1
int d = a;      // Reuse VN 1
```

## Dead Code Elimination (Local)

Dead code is code that computes values that are never used. Local dead code elimination removes assignments to variables that aren't used later in the basic block.

```c
// Before
int a = x + y;
int b = a * 2;  // b is never used
int c = z + 5;
return c;

// After
int a = x + y;  // a might be dead too if not used
int c = z + 5;
return c;
```

## Implementation Considerations

**Single-Pass vs. Multi-Pass**: Some local optimizations can be done in a single pass over the basic block, while others benefit from iteration until a fixed point is reached.

**Interaction Between Optimizations**: Local optimizations often enable each other. For example, constant folding can create dead code, and copy propagation can expose common subexpressions.

```c
// Initial code
int a = 5;
int b = a;
int c = b + 3;
int d = a + 3;

// After copy propagation
int a = 5;
int b = a;
int c = a + 3;
int d = a + 3;  // Now (a + 3) is a common subexpression

// After constant propagation and folding
int a = 5;
int b = 5;
int c = 8;
int d = 8;
```

**Efficiency**: Local optimizations should be fast since they're applied to every basic block. Simple pattern matching and single-pass algorithms are preferred.

## Key Takeaways

- Local optimizations operate within basic blocks, where control flow is simple and sequential.
- Constant folding evaluates compile-time computable expressions, reducing runtime overhead.
- Strength reduction replaces expensive operations (multiplication, division) with cheaper equivalents (shifts, additions).
- Peephole optimization examines small instruction windows to replace inefficient patterns with optimized sequences.
- Copy propagation eliminates unnecessary variable copies by replacing uses with the original value.
- Algebraic simplification applies mathematical identities to reduce expression complexity.
- Local optimizations often interact synergistically—one optimization creates opportunities for others.
- These optimizations are foundational and typically applied at all optimization levels due to their low cost and high benefit.
