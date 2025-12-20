# Control Flow: Branches, Jumps, and Loops

At the machine level, all control flow—if statements, loops, function calls—reduces to a small set of primitives: unconditional jumps, conditional branches, and comparisons that set flags. Recognizing these patterns in assembly is essential for reading code, debugging, and reverse engineering tasks like analyzing a "binary bomb."

## Control Flow Fundamentals

High-level control structures compile down to:
1. **Compare/test instructions** that set flags
2. **Conditional branches** that jump based on flags
3. **Unconditional jumps** that always transfer control

The Program Counter (PC) normally advances sequentially. Control flow instructions change the PC to point elsewhere—either conditionally or unconditionally.

## Unconditional Jumps

An **unconditional jump** (also called a "branch always" or "goto") transfers control to a target address regardless of any conditions.

```assembly
JMP label       ; x86: Jump to label
B   label       ; ARM: Branch to label
j   label       ; MIPS: Jump to label
```

After the jump, execution continues at `label`. The next sequential instruction is skipped.

### Use Cases

- **Skipping code**: Jump over an else block after executing the if block
- **Loop back**: Jump back to the start of a loop
- **Function epilogue**: Jump to cleanup code at the end of a function
- **Implementing switch/case**: Jump tables use computed jumps

## Conditional Branches

A **conditional branch** transfers control only if a specific condition is true. The condition is determined by flags set by previous arithmetic or comparison instructions.

### Common Conditional Branch Instructions

**After `CMP A, B`** (computes A - B, sets flags):

| Condition | x86 Mnemonic | ARM Mnemonic | Meaning |
|-----------|--------------|--------------|---------|
| Equal | JE / JZ | BEQ | A == B |
| Not equal | JNE / JNZ | BNE | A != B |
| Less than (signed) | JL / JNGE | BLT | A < B |
| Greater than (signed) | JG / JNLE | BGT | A > B |
| Less or equal (signed) | JLE / JNG | BLE | A <= B |
| Greater or equal (signed) | JGE / JNL | BGE | A >= B |
| Below (unsigned) | JB / JC | BLO / BCC | A < B (unsigned) |
| Above (unsigned) | JA | BHI | A > B (unsigned) |

### Branch vs Jump Terminology

- **Jump**: Usually unconditional (JMP, J)
- **Branch**: Often conditional, though "branch always" exists
- Usage varies by architecture—the distinction isn't always strict

## Comparison Instructions

**CMP** (compare) computes a subtraction but discards the result, keeping only the flags.

```assembly
CMP R0, R1      ; Flags set as if R0 - R1
CMP R0, #10     ; Flags set as if R0 - 10
```

**TST/TEST** computes an AND but discards the result. Useful for checking if specific bits are set.

```assembly
TST R0, #1      ; Test if bit 0 is set (check odd/even)
BNE is_odd      ; Branch if bit was set (result non-zero)
```

### Comparison Patterns

**Testing for zero**:
```assembly
CMP R0, #0
BEQ is_zero     ; Branch if R0 == 0
```

Or simply (since some operations set flags):
```assembly
SUBS R0, R0, #1 ; Decrement and set flags
BEQ done        ; Branch if result is zero
```

**Testing for equality between registers**:
```assembly
CMP R0, R1
BEQ equal       ; Branch if R0 == R1
```

## Implementing If-Then-Else

The high-level if-else structure has a recognizable assembly pattern.

### If-Then (No Else)

```c
if (x == 0) {
    // then-block
}
// after
```

```assembly
    CMP R0, #0          ; Compare x to 0
    BNE after           ; If not equal, skip then-block
    ; then-block code here
after:
    ; continue
```

The condition is **inverted**: to execute the then-block only when the condition is true, we branch **around** it when false.

### If-Then-Else

```c
if (x < 10) {
    // then-block
} else {
    // else-block
}
// after
```

```assembly
    CMP R0, #10         ; Compare x to 10
    BGE else_block      ; If x >= 10, go to else
    ; then-block code
    B   after           ; Skip else-block
else_block:
    ; else-block code
after:
    ; continue
```

Pattern:
1. Compare
2. Branch to else if condition is false
3. Execute then-block
4. Jump over else-block
5. Else-block
6. Continue

## Implementing Loops

Loops are backward branches with evolving state.

### While Loop

```c
while (x > 0) {
    // body
    x--;
}
```

```assembly
loop:
    CMP R0, #0          ; Test condition
    BLE done            ; If x <= 0, exit
    ; loop body
    SUB R0, R0, #1      ; x--
    B   loop            ; Repeat
done:
```

Pattern:
1. Test condition at loop start
2. Branch out if false
3. Execute body
4. Update loop variable
5. Jump back to test

### Do-While Loop

```c
do {
    // body
    x--;
} while (x > 0);
```

```assembly
loop:
    ; loop body
    SUB R0, R0, #1      ; x--
    CMP R0, #0
    BGT loop            ; If x > 0, repeat
done:
```

The condition test is at the end, so the body always executes at least once.

### For Loop

```c
for (int i = 0; i < 10; i++) {
    // body
}
```

```assembly
    MOV R0, #0          ; i = 0
loop:
    CMP R0, #10         ; i < 10?
    BGE done            ; If i >= 10, exit
    ; loop body
    ADD R0, R0, #1      ; i++
    B   loop
done:
```

For loops are just while loops with initialization and increment specified.

### Counted Loop (Common Pattern)

Counting down to zero is often more efficient:

```assembly
    MOV R0, #10         ; Counter = 10
loop:
    ; loop body (executes 10 times)
    SUBS R0, R0, #1     ; Counter-- and set flags
    BNE loop            ; If counter != 0, repeat
```

This avoids a separate CMP instruction—SUB already sets the zero flag.

## Nested Conditions

Complex conditions compile to sequences of branches.

### And Conditions

```c
if (x > 0 && y > 0) {
    // body
}
```

```assembly
    CMP R0, #0
    BLE skip            ; If x <= 0, skip (short-circuit)
    CMP R1, #0
    BLE skip            ; If y <= 0, skip
    ; body
skip:
```

**Short-circuit evaluation**: If the first condition is false, the second isn't tested.

### Or Conditions

```c
if (x == 0 || y == 0) {
    // body
}
```

```assembly
    CMP R0, #0
    BEQ body            ; If x == 0, go to body
    CMP R1, #0
    BNE skip            ; If y != 0, skip
body:
    ; body
skip:
```

With OR, if the first is true, we go directly to the body.

## Switch Statements

Switch statements can be implemented as:
1. **Chain of if-else**: For few cases
2. **Jump table**: For many consecutive cases

### Jump Table

```c
switch (x) {
    case 0: /* ... */ break;
    case 1: /* ... */ break;
    case 2: /* ... */ break;
}
```

```assembly
    CMP R0, #2
    BHI default         ; If x > 2, go to default

    ; Load address from jump table
    ADR R1, jump_table
    LDR PC, [R1, R0, LSL #2]  ; PC = table[x]

jump_table:
    .word case0
    .word case1
    .word case2
```

Jump tables enable O(1) dispatch for switch statements.

## Loop Optimization Patterns

### Loop Unrolling

Execute multiple iterations per loop cycle:
```assembly
; Instead of processing 1 element per iteration:
loop:
    LDR R1, [R0], #4
    ; process R1
    LDR R2, [R0], #4
    ; process R2
    ; ... (several elements per iteration)
    SUBS R3, R3, #4     ; Decrement counter by 4
    BNE loop
```

Reduces branch overhead at the cost of code size.

### Loop Inversion

Transform while-loop to do-while with initial test:
```assembly
    CMP R0, #0
    BLE done            ; Initial test
loop:
    ; body
    SUB R0, R0, #1
    CMP R0, #0
    BGT loop            ; Loop test at end
done:
```

This can help with branch prediction.

## Recognizing Control Flow in Disassembly

When reverse-engineering:

1. **Find branches**: Look for B, BEQ, BNE, JMP, JE, etc.
2. **Identify targets**: Where do branches go?
3. **Recognize patterns**:
   - Forward branch that skips code → if-then
   - Forward branch + backward branch → if-else
   - Backward branch → loop
4. **Track the condition**: What comparison precedes the branch?

Practice recognizing these patterns—they appear in every binary.

## Key Takeaways

- **Unconditional jumps** (JMP/B) always transfer control.
- **Conditional branches** (JE, BEQ, BLT, etc.) depend on flags set by CMP or arithmetic.
- **If-then-else** compiles to: compare, branch if false, then-code, jump past else, else-code.
- **Loops** are backward branches with a counter or condition variable that changes.
- **While loops** test at the top; **do-while loops** test at the bottom.
- **And conditions** use short-circuit evaluation (branch past if first is false).
- **Or conditions** branch to body if any condition is true.
- **Switch statements** may use jump tables for efficiency.
- Recognizing control flow patterns is essential for debugging and reverse engineering.

