---
id: cs202-t1-instrtypes
title: "Instruction Types"
order: 5
---

# Instruction Types and Categories

Instructions in any ISA can be categorized by their function. Understanding these categories helps in comprehending what operations a processor can perform and how programs are translated from high-level code to machine instructions.

## Categories of Instructions

Most instructions fall into these major categories:

1. **Data Transfer** - Moving data between locations
2. **Arithmetic** - Mathematical computations
3. **Logical** - Bit manipulation operations
4. **Control Flow** - Altering program execution order
5. **Comparison** - Comparing values and setting flags
6. **System** - Privileged and special operations

## Data Transfer Instructions

Data transfer instructions move data between registers, memory, and I/O devices.

### Register-to-Register

```nasm
MOV R1, R2        ; Copy R2 to R1
```

Simply copies a value from one register to another. This is one of the most common instructions.

### Load (Memory to Register)

```nasm
LW R1, 0(R2)      ; R1 = Memory[R2]
LD R1, offset(R2) ; R1 = Memory[R2 + offset]
```

Loads read data from memory into a register. Different variants handle different data sizes:
- `LB` / `LBU` - Load byte (signed/unsigned)
- `LH` / `LHU` - Load half-word
- `LW` / `LWU` - Load word
- `LD` - Load double-word

### Store (Register to Memory)

```nasm
SW R1, 0(R2)      ; Memory[R2] = R1
SD R1, offset(R2) ; Memory[R2 + offset] = R1
```

Stores write data from a register to memory:
- `SB` - Store byte
- `SH` - Store half-word
- `SW` - Store word
- `SD` - Store double-word

### Stack Operations

Many architectures provide push/pop instructions:

```nasm
PUSH R1           ; SP = SP - 4; Memory[SP] = R1
POP R2            ; R2 = Memory[SP]; SP = SP + 4
```

In RISC architectures, these are typically implemented using regular load/store with stack pointer manipulation.

### Load Immediate

```nasm
LI R1, 100        ; R1 = 100
LUI R1, 0x1234    ; R1 = 0x12340000 (load upper immediate)
```

Places a constant value into a register.

## Arithmetic Instructions

### Addition and Subtraction

```nasm
ADD R1, R2, R3    ; R1 = R2 + R3
ADDI R1, R2, 100  ; R1 = R2 + 100
SUB R1, R2, R3    ; R1 = R2 - R3
```

**Signed vs Unsigned**: Some ISAs provide separate instructions:
- `ADD` / `ADDU` - Add (trap on overflow / no trap)
- `ADDI` / `ADDIU` - Add immediate

### Multiplication and Division

```nasm
MUL R1, R2, R3    ; R1 = R2 × R3 (lower bits)
MULH R1, R2, R3   ; R1 = R2 × R3 (upper bits)
DIV R1, R2, R3    ; R1 = R2 / R3 (quotient)
REM R1, R2, R3    ; R1 = R2 % R3 (remainder)
```

Multiplication produces a double-width result. For two 32-bit operands, the result is 64 bits, often split across two registers.

Division is typically the slowest arithmetic operation, taking many cycles.

### Floating-Point Arithmetic

```nasm
ADD.S F1, F2, F3  ; F1 = F2 + F3 (single precision)
ADD.D F1, F2, F3  ; F1 = F2 + F3 (double precision)
MUL.D F1, F2, F3  ; F1 = F2 × F3
DIV.S F1, F2, F3  ; F1 = F2 / F3
SQRT.D F1, F2     ; F1 = √F2
```

Floating-point instructions operate on dedicated floating-point registers and follow IEEE 754 semantics.

## Logical Instructions

Logical instructions perform bitwise operations.

### Basic Logic Operations

```nasm
AND R1, R2, R3    ; R1 = R2 & R3 (bitwise AND)
OR R1, R2, R3     ; R1 = R2 | R3 (bitwise OR)
XOR R1, R2, R3    ; R1 = R2 ^ R3 (bitwise XOR)
NOT R1, R2        ; R1 = ~R2 (bitwise NOT)
```

**Common uses**:
- `AND` - Masking bits, clearing bits
- `OR` - Setting bits, combining flags
- `XOR` - Toggling bits, simple encryption
- `NOT` - Inverting all bits

### Shift Operations

```nasm
SLL R1, R2, 4     ; R1 = R2 << 4 (shift left logical)
SRL R1, R2, 4     ; R1 = R2 >> 4 (shift right logical)
SRA R1, R2, 4     ; R1 = R2 >> 4 (shift right arithmetic)
```

**Shift types**:
- **Logical shift**: Fills with zeros
- **Arithmetic shift right**: Preserves sign bit (for signed division by powers of 2)

```
Logical right shift of -8 (11111000): 01111100 = 124 ✗
Arithmetic right shift of -8:         11111100 = -2 ✓
```

### Rotate Operations

```nasm
ROL R1, R2, 4     ; Rotate left
ROR R1, R2, 4     ; Rotate right
```

Bits shifted out one end are shifted in the other end.

## Control Flow Instructions

Control flow instructions alter the sequential execution of programs.

### Unconditional Jump

```nasm
J target          ; PC = target
JR R1             ; PC = R1 (jump register)
```

Transfers control to a specified address. Jump register enables computed gotos and function returns.

### Conditional Branch

```nasm
BEQ R1, R2, offset   ; if R1 == R2, PC = PC + offset
BNE R1, R2, offset   ; if R1 != R2, PC = PC + offset
BLT R1, R2, offset   ; if R1 < R2, PC = PC + offset
BGE R1, R2, offset   ; if R1 >= R2, PC = PC + offset
```

Branches are PC-relative, enabling position-independent code.

### Function Call and Return

```nasm
JAL target        ; RA = PC + 4; PC = target (jump and link)
JALR R1           ; RA = PC + 4; PC = R1
RET               ; PC = RA (return)
```

`JAL` saves the return address before jumping, enabling function calls.

### Conditional Execution (ARM)

ARM uniquely supports conditional execution of most instructions:

```nasm
ADDEQ R1, R2, R3  ; Add only if equal flag set
MOVNE R1, #0      ; Move only if not equal
```

This reduces branches and can improve performance.

## Comparison Instructions

### Compare and Set Flags

```nasm
CMP R1, R2        ; Set flags based on R1 - R2
TEST R1, R2       ; Set flags based on R1 & R2
```

These instructions don't store a result but set condition flags (zero, negative, carry, overflow) for subsequent conditional instructions.

### Set on Condition (MIPS style)

```nasm
SLT R1, R2, R3    ; R1 = (R2 < R3) ? 1 : 0
SLTU R1, R2, R3   ; Unsigned comparison
SLTI R1, R2, 100  ; Compare with immediate
```

Instead of flags, these store a boolean result in a register.

## System Instructions

### Privileged Instructions

```nasm
SYSCALL           ; System call to OS
ERET              ; Return from exception
MFC0 R1, C0_SR    ; Move from coprocessor 0 (read system register)
MTC0 R1, C0_SR    ; Move to coprocessor 0 (write system register)
```

These instructions are typically only executable in kernel mode.

### Memory Barrier / Fence

```nasm
FENCE             ; Memory ordering barrier
DMB               ; Data memory barrier (ARM)
MFENCE            ; Memory fence (x86)
```

Ensures ordering of memory operations, essential for multiprocessor synchronization.

### Atomic Operations

```nasm
LL R1, 0(R2)      ; Load linked
SC R3, 0(R2)      ; Store conditional
```

Load-linked/store-conditional enables lock-free synchronization. If the memory location was modified between LL and SC, SC fails.

### No Operation

```nasm
NOP               ; No operation
```

Does nothing but consume a cycle. Used for timing, alignment, and pipeline considerations.

## Instruction Frequency

Studies of real programs show instruction frequency varies greatly:

| Category | Approximate Frequency |
|----------|----------------------|
| Load/Store | 25-35% |
| ALU (Add, Sub, etc.) | 15-25% |
| Conditional Branch | 15-20% |
| Compare | 5-10% |
| Shift/Logical | 5-10% |
| Call/Return | 2-5% |
| Multiply/Divide | 1-5% |
| Floating-Point | Varies by workload |

This frequency data influences ISA design—common operations should be efficient.

## Key Takeaways

- Instructions are categorized by function: data transfer, arithmetic, logical, control flow, comparison, and system
- Load/store instructions are the most common, moving data between memory and registers
- Arithmetic instructions include integer and floating-point variants
- Logical instructions perform bitwise operations essential for low-level programming
- Control flow instructions implement branches, loops, and function calls
- Comparison instructions set flags or condition codes for conditional execution
- System instructions handle privileged operations and synchronization
