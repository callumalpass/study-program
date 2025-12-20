---
id: cs202-t1-formats
title: "Instruction Formats"
order: 2
---

# Instruction Formats and Encoding

Every machine instruction must be encoded as a sequence of bits that the processor can decode and execute. The **instruction format** defines how these bits are organized—which bits represent the operation, which represent the operands, and how different types of instructions are distinguished.

## Anatomy of a Machine Instruction

A typical instruction consists of several fields:

```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│    Opcode    │   Operand 1  │   Operand 2  │   Operand 3  │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

**Opcode (Operation Code)**: Specifies what operation to perform (ADD, SUB, LOAD, etc.)

**Operands**: Specify the data to operate on. These might be:
- Register numbers
- Memory addresses
- Immediate (constant) values

## Fixed vs Variable Length Instructions

One of the most important distinctions in instruction encoding is between fixed and variable length formats.

### Fixed-Length Instructions

In fixed-length encoding, every instruction occupies the same number of bits (typically 32 bits for RISC architectures).

**Advantages**:
- Simple instruction fetch: always fetch the same number of bytes
- Easy to pipeline: next instruction address is predictable
- Simple decode logic

**Disadvantages**:
- May waste space for simple instructions
- Limited space for immediate values
- Address range may be restricted

**Example (MIPS R-format, 32 bits)**:
```
┌────────┬────────┬────────┬────────┬────────┬────────┐
│ opcode │   rs   │   rt   │   rd   │ shamt  │ funct  │
│ 6 bits │ 5 bits │ 5 bits │ 5 bits │ 5 bits │ 6 bits │
└────────┴────────┴────────┴────────┴────────┴────────┘
```

### Variable-Length Instructions

In variable-length encoding, different instructions use different numbers of bytes (1 to 15 bytes in x86-64).

**Advantages**:
- More efficient encoding: common instructions can be shorter
- Larger immediate values and addresses possible
- More flexible instruction set

**Disadvantages**:
- Complex decode logic
- Difficult to pipeline
- Must determine instruction length before fetching next instruction

**Example (x86 instruction structure)**:
```
┌──────────┬────────┬────────┬─────┬──────────────┬───────────┐
│ Prefixes │ Opcode │ ModR/M │ SIB │ Displacement │ Immediate │
│  0-4 B   │  1-3 B │  0-1 B │0-1 B│    0-4 B     │   0-4 B   │
└──────────┴────────┴────────┴─────┴──────────────┴───────────┘
```

## Common Instruction Format Types

### Three-Address Format

Three operands are specified: two sources and one destination.

```
ADD R1, R2, R3    ; R1 = R2 + R3
```

This is common in RISC architectures like MIPS and ARM. It's convenient for expression evaluation but requires more bits per instruction.

### Two-Address Format

Two operands, where one serves as both source and destination.

```
ADD R1, R2        ; R1 = R1 + R2
```

Common in x86. Uses fewer bits but the destination operand is destroyed.

### One-Address (Accumulator) Format

Uses an implicit accumulator register for one operand.

```
ADD R1            ; ACC = ACC + R1
```

Very compact encoding but limited flexibility. Used in early computers and some microcontrollers.

### Zero-Address (Stack) Format

Operands are taken from and results pushed to a stack.

```
PUSH A
PUSH B
ADD               ; Push A+B onto stack
```

Used in stack-based virtual machines like the JVM.

## MIPS Instruction Formats in Detail

MIPS is an excellent example of clean instruction format design with exactly three formats:

### R-Format (Register)

Used for register-to-register operations:

```
┌────────┬────────┬────────┬────────┬────────┬────────┐
│ opcode │   rs   │   rt   │   rd   │ shamt  │ funct  │
│ 6 bits │ 5 bits │ 5 bits │ 5 bits │ 5 bits │ 6 bits │
└────────┴────────┴────────┴────────┴────────┴────────┘
```

- **opcode**: Always 0 for R-format
- **rs, rt**: Source registers
- **rd**: Destination register
- **shamt**: Shift amount (for shift instructions)
- **funct**: Specific operation (ADD=0x20, SUB=0x22, etc.)

Example: `add $t0, $s1, $s2`
```
opcode=0, rs=17, rt=18, rd=8, shamt=0, funct=32
000000 10001 10010 01000 00000 100000
```

### I-Format (Immediate)

Used for operations with immediate values and memory access:

```
┌────────┬────────┬────────┬─────────────────────────┐
│ opcode │   rs   │   rt   │        immediate        │
│ 6 bits │ 5 bits │ 5 bits │         16 bits         │
└────────┴────────┴────────┴─────────────────────────┘
```

- **opcode**: Specifies the operation
- **rs**: Source register (or base for memory ops)
- **rt**: Destination register
- **immediate**: 16-bit constant or offset

Example: `addi $t0, $s1, 100`
```
opcode=8, rs=17, rt=8, immediate=100
001000 10001 01000 0000000001100100
```

### J-Format (Jump)

Used for jump instructions:

```
┌────────┬────────────────────────────────────────────┐
│ opcode │                  address                   │
│ 6 bits │                  26 bits                   │
└────────┴────────────────────────────────────────────┘
```

The 26-bit address is shifted left by 2 (since instructions are word-aligned) and combined with the upper 4 bits of PC.

## x86 Instruction Encoding

x86 uses a complex variable-length encoding:

### Prefixes (0-4 bytes)
- **REX prefix**: Extends registers in 64-bit mode
- **Operand-size override**: Changes operand size
- **Address-size override**: Changes address size
- **Segment override**: Changes memory segment

### Opcode (1-3 bytes)
The primary operation code. Some opcodes are one byte, others require escape sequences.

### ModR/M Byte
Encodes addressing mode and register operands:
```
┌─────────┬─────────┬─────────┐
│   Mod   │   Reg   │   R/M   │
│  2 bits │  3 bits │  3 bits │
└─────────┴─────────┴─────────┘
```

### SIB Byte (Scale-Index-Base)
For complex memory addressing:
```
┌─────────┬─────────┬─────────┐
│  Scale  │  Index  │  Base   │
│  2 bits │  3 bits │  3 bits │
└─────────┴─────────┴─────────┘
```

## Design Tradeoffs

Instruction format design involves many tradeoffs:

| Consideration | Fixed-Length | Variable-Length |
|--------------|--------------|-----------------|
| Code density | Lower | Higher |
| Decode speed | Faster | Slower |
| Pipeline design | Simpler | Complex |
| Immediate range | Limited | Flexible |
| Implementation | Simpler | Complex |

## Key Takeaways

- Instruction formats define how operations and operands are encoded in bits
- Fixed-length formats simplify hardware but may waste space
- Variable-length formats allow denser code but complicate decoding
- RISC architectures typically use fixed-length, regular formats
- CISC architectures like x86 use variable-length, complex formats
- Format design affects performance, code size, and implementation complexity
