# Introduction to Assembly Language

**Assembly language** is a low-level programming language that provides a human-readable representation of machine code. Each assembly instruction corresponds directly to a machine instruction, giving programmers precise control over hardware while being more readable than raw binary.

## Why Learn Assembly?

While most software is written in high-level languages, understanding assembly provides several benefits:

### 1. Understanding Computer Architecture
Assembly reveals how computers actually execute instructions. You'll understand:
- How the CPU processes data
- How memory is organized and accessed
- How control flow works at the hardware level
- Why certain high-level operations are expensive

### 2. Performance Optimization
Critical code paths sometimes need hand-tuned assembly:
- Inner loops in numerical computing
- Cryptographic implementations
- Real-time systems with strict timing requirements
- SIMD vectorization for data-parallel operations

### 3. Systems Programming
Certain tasks require assembly:
- Operating system kernels (context switching, interrupt handlers)
- Device drivers (hardware register access)
- Bootloaders (before high-level runtime is available)
- Embedded systems with severe resource constraints

### 4. Security
Understanding assembly is essential for:
- Reverse engineering malware
- Analyzing vulnerabilities
- Exploit development and prevention
- Binary analysis and forensics

### 5. Debugging
Reading compiler-generated assembly helps diagnose:
- Performance issues
- Compiler optimization behavior
- Memory corruption bugs
- ABI compatibility problems

## Assembly vs Machine Code

**Machine code** is the actual binary that the CPU executes:
```
10001011 01000101 11111100
```

**Assembly language** is a symbolic representation:
```nasm
mov eax, [ebp-4]
```

An **assembler** translates assembly to machine code. The relationship is typically one-to-one, though assemblers provide conveniences like:
- Symbolic labels for addresses
- Named constants
- Macros
- Pseudo-instructions

## Assembly Language Syntax

Different assemblers use different syntax conventions. The two major styles are:

### Intel Syntax
Used by NASM, MASM, and Intel documentation:
```nasm
mov eax, [ebx+4]    ; destination, source
add eax, 10         ; eax = eax + 10
```

Characteristics:
- Destination on the left
- Memory operands in square brackets
- No size suffixes (usually)

### AT&T Syntax
Used by GNU assembler (GAS) and Unix tools:
```asm
movl 4(%ebx), %eax    # source, destination
addl $10, %eax        # eax = eax + 10
```

Characteristics:
- Source on the left, destination on the right
- Register names prefixed with %
- Immediate values prefixed with $
- Size suffixes (b, w, l, q)

We'll primarily use Intel syntax in this course for its readability.

## Basic Assembly Structure

A typical assembly program has these sections:

```nasm
; Data section - initialized data
section .data
    message db "Hello, World!", 10    ; String with newline
    count   dd 42                      ; 32-bit integer

; BSS section - uninitialized data
section .bss
    buffer resb 1024                   ; Reserve 1024 bytes

; Code section - instructions
section .text
    global _start           ; Entry point

_start:
    ; Program instructions here
    mov eax, 1              ; System call number (exit)
    mov ebx, 0              ; Exit code
    int 0x80                ; Call kernel
```

### Section Breakdown

**`.data`**: Initialized data
- Variables with initial values
- String constants
- Lookup tables

**`.bss`**: Uninitialized data (Block Started by Symbol)
- Variables that start as zero
- Doesn't increase executable size
- Initialized to zero at runtime

**`.text`**: Code
- Executable instructions
- Usually read-only
- Contains program entry point

## Registers in x86-64

Assembly programming revolves around registers. x86-64 provides:

### General Purpose Registers

| 64-bit | 32-bit | 16-bit | 8-bit (low) | Traditional Use |
|--------|--------|--------|-------------|-----------------|
| RAX | EAX | AX | AL | Accumulator, return value |
| RBX | EBX | BX | BL | Base register |
| RCX | ECX | CX | CL | Counter (loops) |
| RDX | EDX | DX | DL | Data, I/O |
| RSI | ESI | SI | SIL | Source index |
| RDI | EDI | DI | DIL | Destination index |
| RBP | EBP | BP | BPL | Base pointer (stack frame) |
| RSP | ESP | SP | SPL | Stack pointer |
| R8-R15 | R8D-R15D | R8W-R15W | R8B-R15B | Additional registers |

### Special Purpose Registers

- **RIP**: Instruction pointer (program counter)
- **RFLAGS**: Status flags (zero, carry, sign, overflow, etc.)

### Accessing Register Parts

```nasm
mov rax, 0x1122334455667788    ; Full 64 bits
mov eax, 0x11223344            ; Lower 32 bits (clears upper 32!)
mov ax, 0x1122                 ; Lower 16 bits
mov al, 0x11                   ; Lower 8 bits
mov ah, 0x22                   ; Bits 8-15 (not available for R8-R15)
```

**Important**: Writing to 32-bit registers (EAX, etc.) zero-extends to 64 bits. Writing to 16-bit or 8-bit registers preserves upper bits.

## Your First Assembly Program

Here's a complete "Hello, World!" for Linux x86-64:

```nasm
; hello.asm - Hello World in x86-64 assembly
section .data
    msg db "Hello, World!", 10    ; Message with newline
    len equ $ - msg               ; Calculate length

section .text
    global _start

_start:
    ; write(stdout, msg, len)
    mov rax, 1          ; System call number: write
    mov rdi, 1          ; File descriptor: stdout
    mov rsi, msg        ; Buffer address
    mov rdx, len        ; Number of bytes
    syscall             ; Invoke system call

    ; exit(0)
    mov rax, 60         ; System call number: exit
    mov rdi, 0          ; Exit code: 0
    syscall             ; Invoke system call
```

### Assembling and Running

```bash
# Assemble to object file
nasm -f elf64 hello.asm -o hello.o

# Link to executable
ld hello.o -o hello

# Run
./hello
```

## Common Assembler Directives

Directives control the assembler, not the CPU:

| Directive | Purpose | Example |
|-----------|---------|---------|
| `db` | Define byte(s) | `db 'A', 0` |
| `dw` | Define word(s) (16-bit) | `dw 1234` |
| `dd` | Define double-word (32-bit) | `dd 12345678` |
| `dq` | Define quad-word (64-bit) | `dq 123456789` |
| `resb` | Reserve bytes | `resb 100` |
| `resw` | Reserve words | `resw 50` |
| `equ` | Define constant | `SIZE equ 100` |
| `times` | Repeat | `times 10 db 0` |

## Key Takeaways

- Assembly provides direct control over hardware through symbolic machine code
- Intel and AT&T syntax differ in operand order and notation conventions
- Programs are organized into data, BSS, and text sections
- x86-64 has 16 general-purpose 64-bit registers plus special registers
- Understanding assembly is essential for systems programming, optimization, and security
- Assemblers translate symbolic assembly to binary machine code
