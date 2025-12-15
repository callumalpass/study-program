# Tracing a Simple Program (Putting Architecture Together)

Tracing means following the execution of a program step by step, tracking how registers, memory, and flags change with each instruction. It's an essential skill for understanding how code actually runs, for debugging low-level problems, and for exam preparation. Tracing bridges the gap between reading assembly and understanding what the CPU does.

## The Tracing Mindset

When tracing, you become the CPU. For each instruction:
1. What does this instruction do?
2. What values are involved (source operands)?
3. What changes (destination register, memory, flags)?
4. What's the next instruction (usually PC + 4, unless it's a branch)?

Keep a table showing the state after each instruction. Be systematic—skipping steps leads to errors.

## What to Track

### Program Counter (PC)

The PC holds the address of the current instruction. After executing a non-branch instruction, PC advances to the next instruction (typically +4 for 32-bit instructions). Branch instructions may change PC to a different address.

### Registers

Track all registers that are used or modified. Create columns for each register in your trace table. Only update a register when an instruction writes to it.

### Flags

For architectures with a flags register (x86, ARM), track relevant flags:
- **Z (Zero)**: Set if result is zero
- **N/S (Negative/Sign)**: Set if result is negative
- **C (Carry)**: Set on unsigned overflow
- **V/O (Overflow)**: Set on signed overflow

Flags are updated by arithmetic and comparison instructions, and tested by conditional branches.

### Memory

If the program loads from or stores to memory, track memory contents. Create a memory column or separate memory table showing addresses and their values.

## A Basic Trace Example

Consider this simple program with registers R0-R3:

```assembly
0x100:  MOV R0, #5       ; R0 ← 5
0x104:  MOV R1, #7       ; R1 ← 7
0x108:  ADD R2, R0, R1   ; R2 ← R0 + R1
0x10C:  SUB R3, R1, R0   ; R3 ← R1 - R0
```

### Trace Table

| PC    | Instruction      | R0 | R1 | R2 | R3 | Notes |
|-------|------------------|----|----|----|----|-------|
| 0x100 | MOV R0, #5       | 5  | -  | -  | -  | R0 set to 5 |
| 0x104 | MOV R1, #7       | 5  | 7  | -  | -  | R1 set to 7 |
| 0x108 | ADD R2, R0, R1   | 5  | 7  | 12 | -  | 5 + 7 = 12 |
| 0x10C | SUB R3, R1, R0   | 5  | 7  | 12 | 2  | 7 - 5 = 2 |

Final state: R0=5, R1=7, R2=12, R3=2

## Tracing with Branches

Branches make tracing more interesting because PC doesn't always advance sequentially.

```assembly
0x200:  MOV R0, #3
0x204:  MOV R1, #0
loop:
0x208:  ADD R1, R1, R0   ; R1 += R0
0x20C:  SUB R0, R0, #1   ; R0 -= 1
0x210:  CMP R0, #0       ; Compare R0 to 0
0x214:  BNE loop         ; Branch if not equal (Z=0)
0x218:  ...              ; Continue after loop
```

### Trace Table (with flags)

| PC    | Instruction      | R0 | R1 | Z | Notes |
|-------|------------------|----|----|---|-------|
| 0x200 | MOV R0, #3       | 3  | -  | - | |
| 0x204 | MOV R1, #0       | 3  | 0  | - | |
| 0x208 | ADD R1, R1, R0   | 3  | 3  | - | 0 + 3 = 3 |
| 0x20C | SUB R0, R0, #1   | 2  | 3  | 0 | 3 - 1 = 2, not zero |
| 0x210 | CMP R0, #0       | 2  | 3  | 0 | 2 ≠ 0, Z=0 |
| 0x214 | BNE loop         | 2  | 3  | 0 | Z=0, branch taken → PC=0x208 |
| 0x208 | ADD R1, R1, R0   | 2  | 5  | 0 | 3 + 2 = 5 |
| 0x20C | SUB R0, R0, #1   | 1  | 5  | 0 | 2 - 1 = 1, not zero |
| 0x210 | CMP R0, #0       | 1  | 5  | 0 | 1 ≠ 0, Z=0 |
| 0x214 | BNE loop         | 1  | 5  | 0 | Z=0, branch taken → PC=0x208 |
| 0x208 | ADD R1, R1, R0   | 1  | 6  | 0 | 5 + 1 = 6 |
| 0x20C | SUB R0, R0, #1   | 0  | 6  | 1 | 1 - 1 = 0, Z=1 |
| 0x210 | CMP R0, #0       | 0  | 6  | 1 | 0 = 0, Z=1 |
| 0x214 | BNE loop         | 0  | 6  | 1 | Z=1, branch NOT taken → PC=0x218 |

Final state: R0=0, R1=6 (which is 3+2+1)

This is a loop that computes the sum 3+2+1=6.

## Tracing with Memory

When programs access memory, track both register changes and memory changes.

```assembly
; Assume memory starts with: [0x1000]=10, [0x1004]=20
0x300:  MOV R0, #0x1000     ; R0 = base address
0x304:  LDR R1, [R0]        ; R1 = Memory[0x1000]
0x308:  LDR R2, [R0, #4]    ; R2 = Memory[0x1004]
0x30C:  ADD R3, R1, R2      ; R3 = R1 + R2
0x310:  STR R3, [R0, #8]    ; Memory[0x1008] = R3
```

### Trace Table

| PC    | Instruction        | R0     | R1 | R2 | R3 | Mem[0x1008] |
|-------|-------------------|--------|----|----|----|----|
| 0x300 | MOV R0, #0x1000    | 0x1000 | -  | -  | -  | -  |
| 0x304 | LDR R1, [R0]       | 0x1000 | 10 | -  | -  | -  |
| 0x308 | LDR R2, [R0, #4]   | 0x1000 | 10 | 20 | -  | -  |
| 0x30C | ADD R3, R1, R2     | 0x1000 | 10 | 20 | 30 | -  |
| 0x310 | STR R3, [R0, #8]   | 0x1000 | 10 | 20 | 30 | 30 |

## Tracing Function Calls

Function calls involve the stack, link register (or stack for return address), and calling conventions.

```assembly
; Main program
0x400:  MOV R0, #5         ; Argument
0x404:  BL  double         ; Call double(5), LR = 0x408
0x408:  ...                ; Return here with result in R0

; Function: double(x) returns x*2
double:
0x500:  ADD R0, R0, R0     ; R0 = R0 + R0 (double it)
0x504:  BX  LR             ; Return to caller
```

### Trace Table

| PC    | Instruction     | R0 | LR    | Notes |
|-------|-----------------|----|----- -|-------|
| 0x400 | MOV R0, #5      | 5  | -     | Argument in R0 |
| 0x404 | BL double       | 5  | 0x408 | Call function, save return addr |
| 0x500 | ADD R0, R0, R0  | 10 | 0x408 | 5 + 5 = 10 |
| 0x504 | BX LR           | 10 | 0x408 | Return to 0x408 |
| 0x408 | ...             | 10 | 0x408 | Result in R0 |

## Common Tracing Mistakes

### Forgetting to Update PC

After a taken branch, PC changes to the target address. Don't just increment by 4.

### Misreading Branch Conditions

- BEQ: Branch if **equal** (Z=1)
- BNE: Branch if **not equal** (Z=0)
- BGT: Branch if **greater than** (signed)
- BLT: Branch if **less than** (signed)
- BGE: Branch if **greater or equal**
- BLE: Branch if **less or equal**

Make sure you know what flags each condition tests.

### Confusing Source and Destination

In most assembly syntaxes: `ADD Rdest, Rsrc1, Rsrc2`

The destination comes first, sources after. Check your architecture's convention.

### Ignoring Flag Updates

Some instructions update flags (ADD, SUB, CMP), others don't (MOV, LDR). Know which affect flags.

### Off-by-One in Loops

When tracing loops, carefully track the loop counter and termination condition.

## Worked Example: Array Sum

```assembly
; Sum elements of array at 0x2000, length in R0
; Result in R1
0x600:  MOV R1, #0          ; R1 = sum = 0
0x604:  MOV R2, #0x2000     ; R2 = array base address
0x608:  MOV R3, #0          ; R3 = index = 0
loop:
0x60C:  CMP R3, R0          ; Compare index to length
0x610:  BGE done            ; If index >= length, exit
0x614:  LDR R4, [R2, R3, LSL #2]  ; R4 = array[R3] (4 bytes/element)
0x618:  ADD R1, R1, R4      ; sum += array[R3]
0x61C:  ADD R3, R3, #1      ; index++
0x620:  B   loop            ; Repeat
done:
0x624:  ...                 ; R1 contains sum
```

Initial state: R0=3 (length=3), Memory: [0x2000]=10, [0x2004]=20, [0x2008]=30

| PC    | Instruction            | R0 | R1  | R2     | R3 | R4 | Notes |
|-------|------------------------|----|----|---------|----|----|-------|
| 0x600 | MOV R1, #0             | 3  | 0  | -       | -  | -  | |
| 0x604 | MOV R2, #0x2000        | 3  | 0  | 0x2000  | -  | -  | |
| 0x608 | MOV R3, #0             | 3  | 0  | 0x2000  | 0  | -  | |
| 0x60C | CMP R3, R0             | 3  | 0  | 0x2000  | 0  | -  | 0<3, flags set |
| 0x610 | BGE done               | 3  | 0  | 0x2000  | 0  | -  | Not taken |
| 0x614 | LDR R4, [R2, R3, LSL #2] | 3  | 0  | 0x2000  | 0  | 10 | Load array[0] |
| 0x618 | ADD R1, R1, R4         | 3  | 10 | 0x2000  | 0  | 10 | sum=10 |
| 0x61C | ADD R3, R3, #1         | 3  | 10 | 0x2000  | 1  | 10 | |
| 0x620 | B loop                 | 3  | 10 | 0x2000  | 1  | 10 | |
| 0x60C | CMP R3, R0             | 3  | 10 | 0x2000  | 1  | 10 | 1<3 |
| 0x610 | BGE done               | 3  | 10 | 0x2000  | 1  | 10 | Not taken |
| 0x614 | LDR R4, [R2, R3, LSL #2] | 3  | 10 | 0x2000  | 1  | 20 | array[1] |
| 0x618 | ADD R1, R1, R4         | 3  | 30 | 0x2000  | 1  | 20 | sum=30 |
| 0x61C | ADD R3, R3, #1         | 3  | 30 | 0x2000  | 2  | 20 | |
| 0x620 | B loop                 | 3  | 30 | 0x2000  | 2  | 20 | |
| 0x60C | CMP R3, R0             | 3  | 30 | 0x2000  | 2  | 20 | 2<3 |
| 0x610 | BGE done               | 3  | 30 | 0x2000  | 2  | 20 | Not taken |
| 0x614 | LDR R4, [R2, R3, LSL #2] | 3  | 30 | 0x2000  | 2  | 30 | array[2] |
| 0x618 | ADD R1, R1, R4         | 3  | 60 | 0x2000  | 2  | 30 | sum=60 |
| 0x61C | ADD R3, R3, #1         | 3  | 60 | 0x2000  | 3  | 30 | |
| 0x620 | B loop                 | 3  | 60 | 0x2000  | 3  | 30 | |
| 0x60C | CMP R3, R0             | 3  | 60 | 0x2000  | 3  | 30 | 3=3 |
| 0x610 | BGE done               | 3  | 60 | 0x2000  | 3  | 30 | Taken! |
| 0x624 | ...                    | 3  | 60 | 0x2000  | 3  | 30 | Done, sum=60 |

Final result: R1 = 60 = 10 + 20 + 30

## Key Takeaways

- **Tracing is systematic**: Track PC, registers, flags, and memory for each instruction.
- Use a **trace table** with columns for each tracked value.
- **Sequential execution** is default; branches change PC to target address.
- **Flags** are set by arithmetic/comparison instructions; branches test them.
- **Memory access** (LDR/STR) requires tracking both registers and memory locations.
- **Function calls** involve saving return address (to LR or stack) and restoring it on return.
- **Common mistakes**: forgetting to update PC on branches, misreading conditions, source/dest confusion.
- Tracing is essential for **debugging**, **exam prep**, and deeply understanding program execution.

