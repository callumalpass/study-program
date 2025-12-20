## Introduction

Assembly language provides a human-readable representation of machine code, giving programmers direct control over processor operations. In this topic, you'll learn to write MIPS assembly programs, understand how high-level constructs map to assembly, and master debugging techniques.

**Learning Objectives:**
- Write basic MIPS assembly programs with arithmetic and logical operations
- Implement control flow using branches and jumps
- Access memory using load/store instructions
- Create and call procedures following calling conventions
- Use system calls for I/O operations
- Debug assembly programs effectively

---

## Core Concepts

### Assembly Language Basics

Assembly language provides a one-to-one mapping to machine instructions, using mnemonics instead of binary:

```mips
# High-level: result = a + b - c
# Assembly equivalent:
add   $t0, $s0, $s1    # t0 = a + b
sub   $t1, $t0, $s2    # t1 = t0 - c (result)
```

### MIPS Register Set

MIPS has 32 general-purpose registers, each with a conventional use:

```
$zero  = 0      (constant 0)
$at    = 1      (assembler temporary)
$v0-v1 = 2-3    (function return values)
$a0-a3 = 4-7    (function arguments)
$t0-t9 = 8-15,24-25  (temporaries)
$s0-s7 = 16-23  (saved registers)
$gp    = 28     (global pointer)
$sp    = 29     (stack pointer)
$fp    = 30     (frame pointer)
$ra    = 31     (return address)
```

### Memory Organization

MIPS memory is byte-addressable with a 32-bit address space:

```
Address Space Layout:
┌─────────────────┐ 0x7FFFFFFF
│     Stack       │ ↓ grows down
├─────────────────┤
│       ↕         │
├─────────────────┤
│     Heap        │ ↑ grows up
├─────────────────┤ 0x10010000
│  Static Data    │
├─────────────────┤ 0x10000000
│      Text       │
├─────────────────┤ 0x00400000
│    Reserved     │
└─────────────────┘ 0x00000000
```

### Control Flow

Assembly uses branches and jumps instead of if/while:

```mips
# if (a == b) then ... else ...
      beq  $s0, $s1, then_block
      j    else_block
then_block:
      # then code
      j    end_if
else_block:
      # else code
end_if:
```

---

## Key Topics in This Section

1. **Introduction to Assembly** - Assembly syntax and the assembly process
2. **Basic Instructions** - Arithmetic, logical, and shift operations
3. **Control Flow** - Branches, jumps, and comparison instructions
4. **Memory Addressing** - Load/store instructions and addressing modes
5. **Procedures and Stack** - Calling conventions and stack management
6. **System Calls** - I/O and OS services
7. **Debugging Assembly** - Tools and techniques for finding bugs

---

## Prerequisites

Before starting assembly programming:
- Understand binary/hex representation
- Know the ISA concepts from Topic 1
- Have access to a MIPS simulator (MARS or SPIM)
