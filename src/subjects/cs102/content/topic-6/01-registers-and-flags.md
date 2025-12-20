# Assembly Basics: Registers and Flags

Assembly language is the human-readable form of machine code. While high-level languages abstract away hardware details, assembly exposes them directly—you see exactly which registers are used, which operations are performed, and how data moves through the system. Understanding registers and flags is the foundation for reading and writing assembly code.

## What Is Assembly Language?

Assembly is a thin layer over machine code. Each assembly instruction corresponds (roughly) to one machine instruction. Where machine code is raw binary, assembly uses mnemonics like `ADD`, `MOV`, and `JMP` that humans can read.

Different processors have different instruction sets:
- **x86/x86-64**: Intel and AMD desktop/server processors
- **ARM**: Mobile devices, embedded systems, Apple M-series chips
- **MIPS**: Educational use, some embedded systems
- **RISC-V**: Open-source ISA gaining adoption

While syntax and specific instructions differ, the core concepts—registers, memory access, arithmetic, branches—are universal.

## Registers: The CPU's Working Variables

Registers are small, fast storage locations inside the CPU. They're where the processor does its actual work—loading values, computing results, storing temporaries.

### Why Registers?

- **Speed**: Register access takes ~1 cycle; memory access takes ~100+ cycles
- **Direct access**: ALU operations work directly on register contents
- **Limited count**: Typically 16-32 general-purpose registers, forcing careful management

When you write `x = y + z` in a high-level language, the compiler typically:
1. Loads y from memory into a register
2. Loads z into another register
3. Adds them, storing the result in a register
4. Stores the result back to memory for x

### General-Purpose Registers

Most registers are general-purpose—they can hold any data (integers, addresses, etc.). Different architectures name them differently:

**ARM (32-bit)**:
```
R0, R1, R2, ..., R12  (general purpose)
R13 = SP (stack pointer)
R14 = LR (link register, return address)
R15 = PC (program counter)
```

**x86-64**:
```
RAX, RBX, RCX, RDX    (traditional)
RSI, RDI              (source/destination index)
RBP, RSP              (base pointer, stack pointer)
R8, R9, ..., R15      (additional registers)
```

**MIPS**:
```
$0 = zero (always 0)
$1-$31 = general purpose (with conventions)
$sp = stack pointer
$ra = return address
```

### Special-Purpose Registers

Some registers have dedicated functions:

**Program Counter (PC / RIP)**: Contains the address of the current (or next) instruction. Updated after each fetch; changed by branches and jumps.

**Stack Pointer (SP / RSP)**: Points to the top of the stack. Used by push, pop, call, and return operations.

**Link Register (LR)**: On ARM, stores the return address when a function is called. x86 uses the stack instead.

**Frame Pointer (FP / RBP)**: Points to the base of the current stack frame. Helps access local variables at fixed offsets.

### Register Width

Register size matches the architecture's word size:
- 32-bit ARM: Registers are 32 bits (4 bytes)
- x86-64: Registers are 64 bits (8 bytes)

On x86-64, you can access parts of registers:
```
RAX = full 64 bits
EAX = lower 32 bits
AX  = lower 16 bits
AL  = lower 8 bits
AH  = bits 8-15
```

### Register Conventions

Beyond hardware requirements, software conventions govern register use:

**Caller-saved** (volatile): The called function may modify these freely. The caller must save them if needed.

**Callee-saved** (non-volatile): The called function must preserve these. If used, they must be saved and restored.

**Argument registers**: Function parameters are passed in specific registers (e.g., R0-R3 on ARM, RDI/RSI/RDX/RCX on x86-64).

**Return value register**: Function results are returned in specific registers (e.g., R0 on ARM, RAX on x86-64).

These conventions (called the **calling convention** or **ABI**) ensure functions can call each other correctly.

## Status Flags: Recording Operation Results

Many CPUs maintain a **status register** (also called flags register or condition codes) that records information about the result of arithmetic and logic operations.

### Common Flags

**Zero Flag (ZF / Z)**:
- Set to 1 if the result is zero
- Set to 0 if the result is non-zero
- Used for equality comparisons: if A - B = 0, then A equals B

**Sign/Negative Flag (SF / N)**:
- Set to 1 if the result is negative (MSB = 1 in two's complement)
- Set to 0 if the result is positive or zero
- Reflects the sign bit of the result

**Carry Flag (CF / C)**:
- Set to 1 if unsigned overflow occurred (carry out of MSB)
- For addition: set if the result wrapped around (e.g., 255 + 1 = 0 with carry)
- For subtraction: set if a borrow was needed (e.g., 0 - 1 requires borrow)
- Used for unsigned comparisons and multi-precision arithmetic

**Overflow Flag (OF / V)**:
- Set to 1 if signed overflow occurred
- Happens when adding two positive numbers gives negative, or two negative gives positive
- Used for signed comparisons

### Which Operations Set Flags?

**Arithmetic operations** (ADD, SUB, etc.) typically set all flags based on the result.

**Compare operations** (CMP) compute a subtraction but discard the result, keeping only the flags.

**Test operations** (TEST, TST) compute an AND but discard the result, keeping only flags.

**Move and load operations** typically do NOT set flags—they just copy data.

**Logical operations** (AND, OR, XOR) set ZF and SF, typically clear CF and OF.

### Using Flags for Comparisons

The CMP instruction is key to conditional logic. `CMP A, B` computes A - B without storing the result, just setting flags.

After `CMP A, B`:

| Condition | Flags Test | Branch Mnemonic |
|-----------|------------|-----------------|
| A == B | ZF = 1 | BEQ / JE |
| A != B | ZF = 0 | BNE / JNE |
| A < B (unsigned) | CF = 1 | BLO / JB |
| A >= B (unsigned) | CF = 0 | BHS / JAE |
| A < B (signed) | SF != OF | BLT / JL |
| A >= B (signed) | SF == OF | BGE / JGE |
| A > B (signed) | ZF=0 AND SF==OF | BGT / JG |
| A <= B (signed) | ZF=1 OR SF!=OF | BLE / JLE |

**Critical distinction**: Signed and unsigned comparisons use different flags. Using the wrong branch type is a common bug.

### Worked Example

```assembly
MOV R0, #5
MOV R1, #3
CMP R0, R1    ; Compute 5 - 3 = 2
              ; Result: 2 (positive, non-zero)
              ; ZF = 0 (not zero)
              ; SF = 0 (not negative)
              ; CF = 0 (no borrow)
              ; OF = 0 (no overflow)
```

After this CMP:
- BEQ would NOT branch (ZF = 0)
- BNE would branch (ZF = 0)
- BGT would branch (ZF=0 AND SF==OF)
- BLT would NOT branch (SF == OF, both 0)

### Flags and Overflow

Consider signed 8-bit addition: 100 + 50 = 150

In two's complement, 150 > 127, so it doesn't fit in signed range:
- Result bits: 10010110 = -106 (if interpreted as signed)
- Overflow flag set because the signed result is wrong
- Carry flag NOT set (no unsigned overflow: 150 < 256)

This shows why tracking both CF and OF matters—they answer different questions.

## Reading Assembly Instructions

Common instruction patterns:

```assembly
MOV dest, src     ; Copy src to dest
ADD dest, src1, src2  ; dest = src1 + src2
SUB dest, src1, src2  ; dest = src1 - src2
AND dest, src1, src2  ; dest = src1 & src2
CMP src1, src2    ; Set flags for src1 - src2
LDR dest, [addr]  ; Load from memory
STR src, [addr]   ; Store to memory
```

Note: x86 uses two-operand form: `ADD dest, src` means `dest = dest + src`.

## Key Takeaways

- **Registers** are fast, limited storage inside the CPU; assembly operates primarily on registers.
- **General-purpose registers** hold data and addresses; **special registers** (PC, SP, LR) have dedicated functions.
- **Flags** (Zero, Sign, Carry, Overflow) record operation results.
- **CMP** sets flags without storing the result—used before conditional branches.
- **Unsigned comparisons** use Carry flag; **signed comparisons** use Sign and Overflow flags.
- **Calling conventions** define which registers hold arguments, return values, and must be preserved.
- Understanding register naming and flag behavior is essential for reading any assembly code.

