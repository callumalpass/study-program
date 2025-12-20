---
id: cs102-t6-tracing-and-debugging
title: "Tracing and Debugging"
order: 5
---

# Tracing and Debugging Assembly-Like Code

Assembly code can look intimidating—long sequences of cryptic mnemonics operating on registers and memory. But assembly is fundamentally systematic: each instruction does exactly one thing. With a consistent debugging workflow and good note-taking habits, you can trace through any assembly code methodically.

## The Debugging Mindset

When reading assembly:
1. **Don't try to understand everything at once**—work instruction by instruction
2. **Track state explicitly**—write down register values, don't try to keep them in your head
3. **Identify patterns**—loops, conditionals, and function calls have recognizable shapes
4. **Annotate as you go**—rename registers based on their apparent purpose

Assembly debugging is mechanical. If you follow a systematic process, you'll find the answer.

## The Systematic Tracing Workflow

For each instruction, follow these steps:

### Step 1: Identify the Instruction

What operation is being performed?
- **Data movement**: MOV, LDR, STR, PUSH, POP
- **Arithmetic**: ADD, SUB, MUL, DIV
- **Logic**: AND, OR, XOR, NOT, shifts
- **Comparison**: CMP, TEST
- **Control flow**: JMP, B, BEQ, BNE, CALL, RET

### Step 2: Identify the Operands

Where does the data come from? Where does it go?
- Source operand(s): registers, memory, immediate values
- Destination: which register or memory location is modified

### Step 3: Execute the Operation

Compute the result on paper:
- For arithmetic: perform the calculation
- For memory access: note what address is accessed and what value is read/written
- For comparisons: determine which flags are set

### Step 4: Update State

Write down the new state:
- Register values that changed
- Memory values that changed
- Flags that were set or cleared

### Step 5: Determine Next Instruction

- Sequential: PC advances to the next instruction
- Branch taken: PC jumps to the target
- Branch not taken: PC continues sequentially

## Setting Up a Trace Table

A trace table is your primary tool. Create columns for:
- **PC**: Current instruction address
- **Instruction**: The assembly instruction
- **Relevant registers**: One column per register you're tracking
- **Flags**: Z, N, C, V (or whatever flags matter)
- **Memory**: Any memory locations being accessed
- **Notes**: Comments about what's happening

### Example Trace Table

| PC | Instruction | R0 | R1 | R2 | Z | N | Notes |
|----|-------------|----|----|----|----|---|-------|
| 0x100 | MOV R0, #10 | 10 | - | - | - | - | Initialize counter |
| 0x104 | MOV R1, #0 | 10 | 0 | - | - | - | Initialize sum |
| 0x108 | ADD R1, R1, R0 | 10 | 10 | - | 0 | 0 | sum += counter |
| 0x10C | SUB R0, R0, #1 | 9 | 10 | - | 0 | 0 | counter-- |
| ... | ... | ... | ... | ... | ... | ... | ... |

## Common Assembly Patterns

Recognizing common patterns speeds up understanding.

### Loop Pattern

```assembly
    MOV R0, #count       ; Initialize counter
loop:
    ; ... loop body ...
    SUB R0, R0, #1       ; Decrement
    CMP R0, #0           ; Check if done
    BNE loop             ; Branch back if not zero
```

Signs of a loop:
- Backward branch (target address < current address)
- Counter being decremented or incremented
- Comparison before the branch

### If-Else Pattern

```assembly
    CMP R0, R1           ; Compare
    BLE else_block       ; Branch if condition false
    ; then-block
    B   end
else_block:
    ; else-block
end:
```

Signs of if-else:
- Compare followed by conditional branch
- Unconditional branch at end of then-block
- Forward branches to skip code

### Function Call Pattern

```assembly
    ; Setup arguments
    MOV R0, arg1
    MOV R1, arg2
    BL  function         ; Call
    ; R0 contains return value
```

Signs of a function call:
- Arguments placed in specific registers (or pushed to stack)
- BL/CALL instruction
- Return value expected in specific register

### Memory Access Pattern

```assembly
    LDR R0, [R1]         ; Load from *R1
    ADD R0, R0, #1       ; Modify
    STR R0, [R1]         ; Store back to *R1
```

This is the assembly equivalent of `*ptr += 1`.

## Common Tracing Mistakes

### Mistake 1: Confusing Address and Value

```assembly
MOV R0, #0x1000      ; R0 = 0x1000 (the address itself)
LDR R0, [R0]         ; R0 = Memory[0x1000] (the value at that address)
```

The `#` indicates an immediate value (the number itself).
Brackets `[]` indicate memory access (get the value at that address).

### Mistake 2: Forgetting About Fixed-Width

Assembly operates on fixed-width values. An 8-bit value wraps from 255 to 0:

```assembly
MOV R0, #255         ; R0 = 0xFF
ADD R0, R0, #1       ; R0 = 0x00 (8-bit), CF=1
```

Always consider the bit width of the operation.

### Mistake 3: Not Tracking Flags

Flags are essential for understanding branches:

```assembly
CMP R0, R1           ; Flags set here
; ... other instructions that DON'T affect flags ...
BEQ target           ; Uses the flags from CMP
```

Know which instructions set flags and which don't.

### Mistake 4: Wrong Branch Condition

```assembly
CMP R0, #5
BGT greater          ; Branches if R0 > 5, not if R0 >= 5
```

Be precise about condition codes:
- GT = greater than (strictly)
- GE = greater or equal
- LT = less than (strictly)
- LE = less or equal

### Mistake 5: Losing Track of the Stack

When functions call other functions, the stack changes:

```assembly
PUSH R4              ; SP decreases
BL   function        ; More stack used inside
POP  R4              ; Must match the PUSH
```

Draw a stack diagram if calls are involved.

## Annotating Registers

As you understand what values represent, rename them in your notes:

Original code:
```assembly
    LDR R0, [R5]
    LDR R1, [R5, #4]
    ADD R2, R0, R1
```

After understanding context:
```assembly
    ; R5 = struct pointer
    ; [R5] = x field, [R5+4] = y field
    LDR R0, [R5]         ; R0 = obj->x
    LDR R1, [R5, #4]     ; R1 = obj->y
    ADD R2, R0, R1       ; R2 = obj->x + obj->y
```

This dramatically reduces cognitive load.

## Using a Debugger

When tracing manually becomes tedious, use a debugger.

### GDB Commands for Assembly

```gdb
(gdb) layout asm              ; Show disassembly window
(gdb) layout regs             ; Show registers window
(gdb) stepi                   ; Single-step one instruction
(gdb) nexti                   ; Step over function calls
(gdb) info registers          ; Show all register values
(gdb) p $r0                   ; Print specific register
(gdb) x/10i $pc               ; Show next 10 instructions
(gdb) x/20x $sp               ; Examine 20 words at stack pointer
(gdb) break *0x401234         ; Set breakpoint at address
```

### Breakpoints and Watchpoints

**Breakpoints** pause execution at a specific address:
```gdb
(gdb) break *0x401234         ; Break at this address
(gdb) break main              ; Break at function
```

**Watchpoints** pause when a value changes:
```gdb
(gdb) watch $r0               ; Break when R0 changes
(gdb) watch *0x2000           ; Break when memory at 0x2000 changes
```

### Examining Memory

```gdb
(gdb) x/10x 0x2000            ; 10 hex words at 0x2000
(gdb) x/s 0x2000              ; String at 0x2000
(gdb) x/i 0x401234            ; Instruction at address
```

## Debugging Strategies

### Strategy 1: Find the Crash Site

If the program crashes:
1. Run until crash
2. Note the PC value
3. Examine the instruction that crashed
4. Look at register values—is there a bad pointer?

### Strategy 2: Binary Search

If you know the bug is somewhere in a large function:
1. Set a breakpoint in the middle
2. Check if state is correct at that point
3. If correct, bug is in the second half; if wrong, bug is in first half
4. Repeat

### Strategy 3: Trace Backward

If you find an incorrect value:
1. Identify which instruction last wrote to that register/memory
2. Was that instruction's input correct?
3. Trace backward to find where the error originated

### Strategy 4: Compare Expected vs Actual

Write down what you expect the state to be, then run and compare:
- If they match, continue
- If they don't, you've found where things went wrong

## Reverse Engineering Tips

When analyzing unknown code (like a binary bomb):

1. **Start with the entry point**: Find main or the obvious starting function
2. **Identify function boundaries**: Look for prologues (PUSH FP, LR) and epilogues (POP, RET)
3. **Name things**: As you understand what a function or variable does, give it a meaningful name
4. **Document as you go**: Write comments about what you've discovered
5. **Test hypotheses**: If you think R0 is a loop counter, trace and verify

## Key Takeaways

- **Tracing is mechanical**: Execute instruction, update state, determine next PC.
- Use a **trace table** to track registers, flags, memory, and notes.
- **Recognize patterns**: Loops (backward branches), if-else (forward branches), calls (BL/RET).
- **Common mistakes**: Confusing address/value, forgetting flags, wrong branch conditions, losing track of stack.
- **Annotate registers**: Name them based on purpose (counter, pointer, sum).
- **Use debuggers**: GDB's stepi, info registers, and x commands are essential tools.
- **Debugging strategies**: Find crash site, binary search, trace backward, compare expected vs actual.
- Good notes are your best debugging tool—never try to keep everything in your head.

