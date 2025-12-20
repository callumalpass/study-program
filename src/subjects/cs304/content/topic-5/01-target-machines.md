# Target Architecture Considerations

Code generation is the final phase of compilation where intermediate representation is transformed into executable machine code for a specific target architecture. Understanding target machine characteristics is crucial for generating efficient code that leverages hardware capabilities while respecting architectural constraints.

## Target Machine Models

A target machine model abstracts the physical hardware to provide a framework for code generation. The compiler must understand the instruction set, register organization, memory model, and execution characteristics of the target processor.

### Basic Machine Model Components

**Instruction Set**: The repertoire of operations the processor can execute, including arithmetic, logical, memory access, and control flow instructions.

**Register Set**: Fast, on-chip storage locations. Modern processors typically have 16-32 general-purpose registers, plus specialized registers like the program counter, stack pointer, and status flags.

**Memory Hierarchy**: Organized in levels from fast, small cache memory to slow, large main memory. The compiler must consider memory access patterns to optimize cache utilization.

**Pipeline Structure**: Modern processors execute instructions in stages (fetch, decode, execute, memory, writeback). Understanding pipeline characteristics helps avoid hazards and maximize throughput.

## RISC vs CISC Architectures

The fundamental architectural divide in processor design significantly impacts code generation strategies.

### CISC (Complex Instruction Set Computing)

CISC architectures like x86 provide rich instruction sets with complex, variable-length instructions that can perform multiple operations.

**Characteristics**:
- Variable-length instructions (1-15 bytes on x86)
- Complex addressing modes (base + index * scale + displacement)
- Instructions can access memory directly
- Fewer registers historically (x86 had only 8 general-purpose registers until x86-64)
- Microcode-based execution

**Code Generation Implications**:
```x86asm
; CISC example: Complex instruction doing multiple operations
mov eax, [ebx + ecx*4 + 16]  ; Load with complex addressing
add eax, 42                    ; Immediate addition
imul eax, [edi]                ; Multiply with memory operand
```

The rich instruction set allows compact code but complicates instruction selection. The compiler must choose between simple instruction sequences and single complex instructions.

### RISC (Reduced Instruction Set Computing)

RISC architectures like ARM, MIPS, and RISC-V emphasize simplicity and regularity with fixed-length instructions and a load-store architecture.

**Characteristics**:
- Fixed-length instructions (typically 32 bits)
- Simple addressing modes
- Load-store architecture (only load/store access memory)
- Large register file (32 general-purpose registers typical)
- Single-cycle execution for most instructions
- Hardwired control logic

**Code Generation Implications**:
```arm
; ARM example: Same operation requires multiple instructions
ldr  r0, [r1, r2, lsl #2]   ; Load with scaled index
add  r0, r0, #42             ; Add immediate
ldr  r3, [r4]                ; Load second operand
mul  r0, r0, r3              ; Multiply registers
```

RISC simplifies instruction selection but requires more instructions for complex operations. The abundance of registers enables better register allocation.

## x86/x86-64 Architecture

The x86 architecture dominates desktop and server computing. x86-64 (AMD64) extended the 32-bit x86 with 64-bit addressing and doubled the register count.

### Register Organization

```
General Purpose Registers (x86-64):
RAX, RBX, RCX, RDX, RSI, RDI, RBP, RSP (legacy, 64-bit)
R8, R9, R10, R11, R12, R13, R14, R15 (new in x86-64)

Special Purposes:
RAX - Accumulator, return values
RBX - Base register
RCX - Counter for loops
RDX - Data register, second return value
RSI, RDI - Source and destination for string operations
RBP - Base pointer for stack frames
RSP - Stack pointer
R10-R15 - General purpose
```

### Instruction Encoding

x86 instructions use variable-length encoding with prefixes, opcodes, ModR/M bytes, SIB bytes, and immediate/displacement fields:

```
[Prefixes] [Opcode] [ModR/M] [SIB] [Displacement] [Immediate]
```

Example breakdown:
```x86asm
mov rax, [rbx + rcx*8 + 100]
; Encoded as: 48 8B 84 CB 64 00 00 00
; 48 - REX.W prefix (64-bit operand)
; 8B - MOV opcode
; 84 - ModR/M byte (register + SIB)
; CB - SIB byte (base=RBX, index=RCX, scale=8)
; 64 00 00 00 - 32-bit displacement (100)
```

### x86-64 Advantages for Code Generation

**More Registers**: Sixteen 64-bit registers reduce register spilling significantly.

**RIP-Relative Addressing**: Position-independent code becomes simpler:
```x86asm
mov rax, [rip + offset]  ; Load relative to instruction pointer
```

**SSE/AVX Extensions**: SIMD instructions for vectorization:
```x86asm
; Process 4 floats simultaneously
movaps xmm0, [rsi]       ; Load 4 floats
addps  xmm0, [rdi]       ; Add 4 floats
movaps [rdx], xmm0       ; Store 4 floats
```

## ARM Architecture

ARM dominates mobile and embedded systems with excellent power efficiency. ARMv8 introduced 64-bit support (AArch64).

### Register Organization

```
AArch64 Registers:
X0-X30  - 64-bit general purpose
W0-W30  - 32-bit versions (low half of X registers)
XZR/WZR - Zero register
SP      - Stack pointer
PC      - Program counter (not directly accessible)

V0-V31  - 128-bit SIMD/FP registers
```

### Load-Store Architecture

All arithmetic operations work on registers; memory access only through load/store:

```arm
; ARM64 assembly example
ldr  x0, [x1]          ; Load from memory to register
add  x0, x0, x2        ; Add registers
str  x0, [x3]          ; Store register to memory

; Cannot do: add x0, [x1], x2  (invalid - memory operand not allowed)
```

### Conditional Execution

ARM supports predicated execution, reducing branches:

```arm
cmp   x0, x1           ; Compare
csel  x2, x3, x4, gt   ; x2 = (x0 > x1) ? x3 : x4
```

This eliminates branches for simple conditionals, improving pipeline efficiency.

## Code Generation Strategies

### Architecture-Specific Optimizations

**Instruction Selection**: Choose instructions that best exploit hardware features:
- Use x86 LEA for arithmetic: `lea rax, [rbx + rcx*4]` instead of separate multiply and add
- Use ARM conditional instructions to eliminate branches
- Use SIMD instructions for data-parallel operations

**Register Allocation**: Adapt to register availability:
- x86-64 benefits from caller-save conventions for 16 registers
- ARM's 31 registers enable aggressive register allocation with minimal spilling

**Addressing Modes**: Utilize complex addressing when beneficial:
- x86 scaled indexing for array access
- ARM post-increment for sequential access: `ldr x0, [x1], #8`

### Retargetable Code Generation

Modern compilers support multiple architectures through abstraction layers:

```
IR → Machine-Independent Optimizations → Machine IR
   → Machine-Dependent Optimizations → Target Assembly
```

The machine IR (like LLVM IR or GCC RTL) provides target-independent representation while exposing machine characteristics for optimization.

## Performance Considerations

### Instruction Latency and Throughput

Different instructions have different execution costs:

```
x86-64 typical latencies:
- ADD/SUB: 1 cycle latency, 0.25 cycle throughput (4/cycle)
- IMUL:    3 cycle latency, 1 cycle throughput
- IDIV:    ~20-40 cycle latency, not pipelined
- Memory:  4-5 cycle L1 cache, 12 cycle L2, 40+ cycle L3
```

Compilers avoid expensive operations when possible (e.g., multiply by constant → shift and add).

### Cache Effects

Memory layout affects performance dramatically:
- Sequential access leverages cache lines and prefetching
- Structure padding for alignment reduces cache misses
- Loop tiling improves temporal locality

### Branch Prediction

Modern processors predict branch outcomes:
- Well-predicted branches cost ~1-2 cycles
- Mispredicted branches cost ~10-20 cycles

Code generation should minimize unpredictable branches and use branch hints when available.

## Key Takeaways

- Target architecture fundamentally determines code generation strategy and optimization opportunities
- CISC (x86) provides complex instructions with variable encoding; RISC (ARM) uses simple, fixed-length instructions
- x86-64's 16 registers and rich instruction set enable compact code; ARM's 31 registers and load-store design simplify instruction selection
- Understanding register organization, instruction encoding, and addressing modes is essential for effective code generation
- Architecture-specific features like SIMD, conditional execution, and complex addressing modes offer significant optimization potential
- Performance characteristics like instruction latency, cache behavior, and branch prediction must guide code generation decisions
- Retargetable compilers abstract target differences while allowing architecture-specific optimizations through machine IR layers
