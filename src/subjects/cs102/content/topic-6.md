# Topic 6: Assembly Language Basics

## Introduction
Assembly language bridges the gap between high-level programming languages (like Python or C) and the raw machine code executed by the processor. In this topic, we delve into the fundamental concepts of assembly language, including instruction sets, registers, and addressing modes. Understanding assembly gives you a "programmer's view" of the hardware, revealing how software actually controls the CPU.

## Learning Objectives
By the end of this topic, you should be able to:
- Explain the relationship between assembly language, machine code, and high-level languages.
- Describe the role of CPU registers (general-purpose, instruction pointer, flags).
- Read and trace simple assembly sequences (MOV, ADD, SUB, CMP, JMP).
- Differentiate between various addressing modes (immediate, register, direct, indirect).
- Understand the fetch-decode-execute cycle from an instruction perspective.

## Core Concepts

### 1. The Instruction Set Architecture (ISA)
The ISA is the interface between software and hardware. It defines the set of instructions a processor can execute. Common ISAs include x86 (Intel/AMD) and ARM (Mobile/Apple).
- **CISC (Complex Instruction Set Computer):** Many complex instructions (e.g., x86).
- **RISC (Reduced Instruction Set Computer):** Fewer, simpler instructions (e.g., ARM, MIPS, RISC-V).

### 2. Registers
Registers are small, ultra-fast storage locations directly inside the CPU.
- **General Purpose Registers (GPRs):** Used for arithmetic and data manipulation (e.g., AX, BX, CX, DX in x86).
- **Special Purpose Registers:**
  - **Program Counter (PC/IP):** Holds the address of the next instruction.
  - **Stack Pointer (SP):** Points to the top of the stack memory.
  - **Status Register (Flags):** Contains bits indicating results of operations (Zero flag, Carry flag, Overflow flag).

### 3. Basic Instructions
Most assembly instructions fall into these categories:
- **Data Movement:** `MOV dest, src` (Copy data).
- **Arithmetic/Logic:** `ADD`, `SUB`, `AND`, `OR`, `XOR`.
- **Control Flow:** `JMP` (Jump), `BEQ` (Branch if Equal), `BNE` (Branch if Not Equal).
- **Comparison:** `CMP` (Compare two values, setting flags).

#### Example: Simple Addition
```assembly
MOV AX, 5      ; Load 5 into register AX
MOV BX, 3      ; Load 3 into register BX
ADD AX, BX     ; Add BX to AX, result in AX (AX now equals 8)
```

### 4. Addressing Modes
How do we specify *where* the data is?
- **Immediate:** Data is in the instruction itself. (`MOV AX, 5`)
- **Register:** Data is in a register. (`ADD AX, BX`)
- **Direct/Absolute:** Data is at a specific memory address. (`MOV AX, [1000]`)
- **Indirect:** A register holds the memory address. (`MOV AX, [BX]`)

## Common Mistakes
- **Confusing Destination and Source:** In Intel syntax, it's `OP dest, src`. `MOV AX, BX` copies **from** BX **to** AX.
- **Forgetting to Update Flags:** Conditional jumps (`JE`, `JG`) depend on the flags set by a previous instruction (usually `CMP`). If you don't `CMP`, the jump behavior is undefined (or based on an old result).
- **Mixing Data Sizes:** Trying to move a 16-bit value into an 8-bit register usually causes an assembler error or data truncation.

## Best Practices
- **Comment Your Code:** Assembly is cryptic. Explain *what* a block does, not just the instruction (e.g., "Calculate loop counter" vs "Add 1 to AX").
- **Use Meaningful Labels:** Use labels like `loop_start:` or `error_handler:` instead of hardcoded addresses.
- **Trace Mentally:** Before running, step through the logic on paper, tracking register values.

## Summary
Assembly language provides granular control over the CPU. While rarely used for entire applications today, it is critical for system boot code, device drivers, and performance optimization. Mastery of assembly solidifies your understanding of how computers process information step-by-step.
