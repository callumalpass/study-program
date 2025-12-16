# Survey of Modern ISAs

Understanding modern Instruction Set Architectures requires examining real-world examples. This survey covers the major ISAs in use today: x86-64, ARM, MIPS, and RISC-V, comparing their design choices and application domains.

## x86-64 (AMD64/Intel 64)

### Overview

x86-64 is the dominant ISA for personal computers and servers. It evolved from the 16-bit 8086 (1978) through 32-bit x86 (80386, 1985) to the current 64-bit version (2003).

### Key Characteristics

**Architecture type**: CISC with RISC-like internals

**Registers**:
- 16 general-purpose 64-bit registers (RAX, RBX, RCX, RDX, RSI, RDI, RBP, RSP, R8-R15)
- 16 floating-point/SIMD registers (XMM0-XMM15, 128-bit, expandable to YMM/ZMM)
- Flags register (RFLAGS)
- Instruction pointer (RIP)

**Instruction format**: Variable length, 1-15 bytes

```nasm
; Example instructions
mov rax, rbx              ; 3 bytes
mov rax, [rbx+rcx*8+100]  ; 8 bytes
vaddps ymm0, ymm1, ymm2   ; 4 bytes (AVX)
```

**Addressing modes**: Extensive
```nasm
mov rax, 100              ; Immediate
mov rax, rbx              ; Register
mov rax, [1000]           ; Direct
mov rax, [rbx]            ; Register indirect
mov rax, [rbx+8]          ; Base + displacement
mov rax, [rbx+rcx*4]      ; Base + scaled index
mov rax, [rbx+rcx*4+100]  ; Base + scaled index + displacement
mov rax, [rip+offset]     ; RIP-relative
```

**Strengths**:
- Massive software ecosystem
- Highly optimized implementations
- Excellent backward compatibility
- Advanced SIMD (AVX-512)

**Weaknesses**:
- Complex instruction encoding
- Power-hungry
- Large die area for decoders

### Modern x86-64 Processors
- Intel Core series, Xeon
- AMD Ryzen, EPYC

## ARM (Advanced RISC Machine)

### Overview

ARM dominates mobile devices and is expanding into servers and laptops. Originally designed for low power, it has evolved into a family of related architectures.

### ARM Architecture Versions

| Version | Bits | Notable Features |
|---------|------|------------------|
| ARMv7 | 32 | Thumb-2, NEON SIMD |
| ARMv8 (AArch64) | 64 | Complete redesign, larger registers |
| ARMv9 | 64 | SVE2, security extensions |

### AArch64 Characteristics

**Architecture type**: RISC (with some CISC-like features)

**Registers**:
- 31 general-purpose 64-bit registers (X0-X30)
- 32 floating-point/SIMD 128-bit registers (V0-V31)
- Stack pointer (SP), Program counter (PC)
- Zero register (XZR) - reads as 0, writes discarded

**Instruction format**: Fixed 32-bit

```asm
; Example instructions
add x0, x1, x2           ; Add registers
add x0, x1, #100         ; Add immediate
ldr x0, [x1, #8]         ; Load with offset
str x0, [x1, x2, lsl #3] ; Store with shifted index
```

**Addressing modes**:
```asm
ldr x0, [x1]             ; Base register
ldr x0, [x1, #8]         ; Base + immediate offset
ldr x0, [x1, x2]         ; Base + register offset
ldr x0, [x1, x2, lsl #3] ; Base + scaled register
ldr x0, [x1], #8         ; Post-index
ldr x0, [x1, #8]!        ; Pre-index
```

**Unique features**:
- Conditional execution (reduced from ARMv7)
- Load/store pair instructions
- Scalable Vector Extension (SVE)

**Strengths**:
- Excellent power efficiency
- Clean 64-bit design
- Strong mobile ecosystem
- Flexible licensing model

**Weaknesses**:
- Weaker single-thread performance (historically)
- Smaller server software ecosystem (improving)

### Notable ARM Processors
- Apple M1/M2/M3 series
- Qualcomm Snapdragon
- AWS Graviton
- NVIDIA Grace

## MIPS (Microprocessor without Interlocked Pipeline Stages)

### Overview

MIPS is historically significant as a pioneer of RISC architecture. While less common today, it remains important in embedded systems and education.

### Characteristics

**Architecture type**: Pure RISC

**Registers**:
- 32 general-purpose 32/64-bit registers ($0-$31)
- $0 is hardwired to zero
- HI/LO registers for multiplication results
- 32 floating-point registers

**Instruction format**: Fixed 32-bit, three formats
```
R-format: opcode | rs | rt | rd | shamt | funct
I-format: opcode | rs | rt | immediate
J-format: opcode | address
```

**Example instructions**:
```mips
add $t0, $s1, $s2    # R-format: $t0 = $s1 + $s2
addi $t0, $s1, 100   # I-format: $t0 = $s1 + 100
lw $t0, 4($s1)       # I-format: load word
j label              # J-format: jump
```

**Addressing mode**: Only base + displacement for memory

**Design philosophy**:
- Simplicity and regularity
- Easy to pipeline
- Load/store architecture
- Delayed branches (in classic MIPS)

**Strengths**:
- Clean, educational design
- Easy to implement
- Low power variants available

**Current status**: MIPS is transitioning to RISC-V for new designs. The ISA was opened in 2019.

## RISC-V

### Overview

RISC-V is an open-source ISA developed at UC Berkeley starting in 2010. It's designed to be simple, extensible, and free of licensing fees.

### Characteristics

**Architecture type**: Pure RISC, modular design

**Base ISA variants**:
- RV32I: 32-bit base integer
- RV64I: 64-bit base integer
- RV128I: 128-bit base (future)

**Standard extensions**:
- M: Multiplication/Division
- A: Atomics
- F: Single-precision floating-point
- D: Double-precision floating-point
- C: Compressed instructions (16-bit)
- V: Vector operations

Common combinations: RV32IMAC, RV64GC (G = IMAFD)

**Registers**:
- 32 general-purpose registers (x0-x31)
- x0 is hardwired to zero
- 32 floating-point registers (f0-f31)

**Instruction formats**: Six base formats
```
R-type: funct7 | rs2 | rs1 | funct3 | rd | opcode
I-type: imm[11:0] | rs1 | funct3 | rd | opcode
S-type: imm[11:5] | rs2 | rs1 | funct3 | imm[4:0] | opcode
B-type: imm[12|10:5] | rs2 | rs1 | funct3 | imm[4:1|11] | opcode
U-type: imm[31:12] | rd | opcode
J-type: imm[20|10:1|11|19:12] | rd | opcode
```

**Example instructions**:
```asm
add x1, x2, x3       # x1 = x2 + x3
addi x1, x2, 100     # x1 = x2 + 100
lw x1, 0(x2)         # Load word
sw x1, 4(x2)         # Store word
beq x1, x2, label    # Branch if equal
```

**Strengths**:
- Open-source, no licensing fees
- Clean, modern design
- Modular extensions
- Growing ecosystem
- Ideal for research and education

**Weaknesses**:
- Smaller software ecosystem (growing)
- Fewer mature implementations
- Less optimized toolchains (improving)

### Notable RISC-V Implementations
- SiFive cores
- Alibaba Xuantie
- Various academic projects

## Comparison Summary

| Feature | x86-64 | ARM AArch64 | MIPS64 | RISC-V |
|---------|--------|-------------|--------|--------|
| Type | CISC | RISC | RISC | RISC |
| Inst. length | Variable | 32-bit fixed | 32-bit fixed | 32-bit (+ 16-bit C) |
| GP registers | 16 | 31 | 32 | 32 |
| Zero register | No | Yes (XZR) | Yes ($0) | Yes (x0) |
| Addressing modes | Many | Moderate | One | Few |
| Open source | No | No | Yes (since 2019) | Yes |
| Primary domain | PC/Server | Mobile/Embedded | Embedded/Education | Emerging |

## Choosing an ISA

**For servers/desktops**: x86-64 (software ecosystem) or ARM (power efficiency)

**For mobile/embedded**: ARM (established) or RISC-V (emerging)

**For education**: RISC-V or MIPS (clean design)

**For research**: RISC-V (open, extensible)

## Key Takeaways

- x86-64 dominates through ecosystem and backward compatibility
- ARM leads in mobile and is expanding to servers
- MIPS pioneered RISC but is declining
- RISC-V is the future of open ISA development
- Each ISA represents different tradeoffs between complexity, power, and ecosystem
- Modern ISAs continue to evolve with new extensions for AI, security, and vectors
