import type { WrittenExercise } from '../../../../core/types';

export const topic1Exercises: WrittenExercise[] = [
  {
    id: 'cs202-t1-ex1',
    subjectId: 'cs202',
    topicId: 'cs202-topic1',
    type: 'written',
    title: 'Identify ISA Components',
    description: 'Classify the following as part of the ISA or microarchitecture: (a) Number of general-purpose registers (b) Pipeline depth (c) Instruction encoding format (d) Cache size (e) Addressing modes supported',
    difficulty: 1,
    hints: ['ISA is the interface visible to programmers', 'Microarchitecture is about implementation details'],
    solution: `ISA components (visible to programmers):
(a) Number of general-purpose registers - ISA (programmers must know how many registers are available)
(c) Instruction encoding format - ISA (assemblers and compilers must know instruction formats)
(e) Addressing modes supported - ISA (determines how programs specify memory addresses)

Microarchitecture (implementation details):
(b) Pipeline depth - Microarchitecture (how instructions flow through hardware)
(d) Cache size - Microarchitecture (performance optimization, not visible to ISA)

The ISA is the interface between software and hardware. Different microarchitectures can implement the same ISA differently.`,
  },
  {
    id: 'cs202-t1-ex2',
    subjectId: 'cs202',
    topicId: 'cs202-topic1',
    type: 'written',
    title: 'MIPS R-Format Decoding',
    description: 'Decode the following MIPS instruction: 0x012A4020. Break it down into opcode, rs, rt, rd, shamt, and funct fields, and identify the instruction.',
    difficulty: 3,
    hints: ['Convert hex to binary first', 'R-format: opcode(6) | rs(5) | rt(5) | rd(5) | shamt(5) | funct(6)'],
    solution: `Binary: 0000 0001 0010 1010 0100 0000 0010 0000

Field breakdown:
- opcode (bits 31-26): 000000 = 0 (R-type)
- rs (bits 25-21): 00001 = 1 ($at or $1)
- rt (bits 20-16): 01010 = 10 ($t2)
- rd (bits 15-11): 01000 = 8 ($t0)
- shamt (bits 10-6): 00000 = 0
- funct (bits 5-0): 100000 = 32 (add)

Instruction: add $t0, $at, $t2
Or: add $t0, $1, $10

This adds the contents of register $at ($1) and $t2 ($10), storing the result in $t0 ($8).`,
  },
  {
    id: 'cs202-t1-ex3',
    subjectId: 'cs202',
    topicId: 'cs202-topic1',
    type: 'written',
    title: 'Address Calculation',
    description: 'For the instruction "lw $t0, 100($s0)", if $s0 contains 0x10000000, calculate the effective memory address. Also explain what type of addressing mode this represents.',
    difficulty: 2,
    hints: ['Effective Address = Base + Offset', 'Convert offset to hex for easier addition'],
    solution: `Effective Address Calculation:
Base register ($s0): 0x10000000
Offset: 100 (decimal) = 0x64 (hexadecimal)

Effective Address = Base + Offset
= 0x10000000 + 0x64
= 0x10000064

Addressing Mode: Base + Offset (also called Base + Displacement)

This is the primary addressing mode for accessing arrays and structure fields:
- Base register points to start of data structure
- Offset specifies displacement to desired element
- Very efficient for sequential array access when combined with pointer increment`,
  },
  {
    id: 'cs202-t1-ex4',
    subjectId: 'cs202',
    topicId: 'cs202-topic1',
    type: 'written',
    title: 'Immediate Field Range',
    description: 'The MIPS I-format uses a 16-bit immediate field. (a) What range of values can be represented as unsigned? (b) What range as signed (two\'s complement)? (c) How would you load the value 0x12345678 into a register?',
    difficulty: 3,
    hints: ['Unsigned: 0 to 2^n - 1', 'Signed: -2^(n-1) to 2^(n-1) - 1', 'lui loads upper 16 bits'],
    solution: `(a) Unsigned range:
- Minimum: 0
- Maximum: 2^16 - 1 = 65,535 (0xFFFF)
- Range: 0 to 65,535

(b) Signed (two's complement) range:
- Minimum: -2^15 = -32,768 (0x8000 interpreted as signed)
- Maximum: 2^15 - 1 = 32,767 (0x7FFF)
- Range: -32,768 to 32,767

(c) Loading 0x12345678 requires two instructions:
lui $t0, 0x1234      # Load upper 16 bits: $t0 = 0x12340000
ori $t0, $t0, 0x5678 # OR in lower 16 bits: $t0 = 0x12345678

This is necessary because no single instruction can specify a 32-bit immediate.
The assembler pseudo-instruction "li $t0, 0x12345678" generates these two instructions automatically.`,
  },
  {
    id: 'cs202-t1-ex5',
    subjectId: 'cs202',
    topicId: 'cs202-topic1',
    type: 'written',
    title: 'CISC vs RISC Instruction Comparison',
    description: 'Compare how x86 (CISC) and MIPS (RISC) would implement: memory[B] = memory[A] + memory[B]. Write the assembly for both and count the memory accesses.',
    difficulty: 3,
    hints: ['CISC allows memory-to-memory operations', 'RISC requires load-store pattern'],
    solution: `x86 (CISC) approach:
mov eax, [A]        ; Load memory[A] into eax
add [B], eax        ; Add eax to memory[B], store result in memory[B]

Memory accesses: 4
- Read A (1)
- Read B (for the add, 1)
- Write B (store result, 1)
- Plus instruction fetches

Total instructions: 2

MIPS (RISC) approach:
lw $t0, A($zero)    ; Load memory[A] into $t0
lw $t1, B($zero)    ; Load memory[B] into $t1
add $t2, $t0, $t1   ; Add: $t2 = $t0 + $t1
sw $t2, B($zero)    ; Store result to memory[B]

Memory accesses: 3 (2 loads, 1 store)
Total instructions: 4

Key differences:
- CISC: Fewer instructions, but memory-memory operations
- RISC: More instructions, but load-store only, simpler decode
- RISC makes pipelining easier because each instruction is simple and regular`,
  },
  {
    id: 'cs202-t1-ex6',
    subjectId: 'cs202',
    topicId: 'cs202-topic1',
    type: 'written',
    title: 'J-Format Address Calculation',
    description: 'For a MIPS jump instruction at address 0x00400024, with a 26-bit target field of 0x100008, calculate the jump target address. Explain the address calculation process.',
    difficulty: 4,
    hints: ['Jump uses upper 4 bits of PC+4', 'Target is shifted left by 2', 'Result is concatenation'],
    solution: `MIPS J-format jump target calculation:

Given:
- PC of jump instruction: 0x00400024
- 26-bit target field: 0x100008 = 00 0001 0000 0000 0000 0000 1000 (binary)

Jump target address composition:
1. Take upper 4 bits of PC+4: 0x004 (from 0x00400028)
2. Shift 26-bit target left by 2 (word alignment): 0x100008 << 2 = 0x400020
3. Concatenate: upper 4 bits || (target << 2)

Target = (PC+4)[31:28] || (target << 2)
       = 0x0 || 0x0400020
       = 0x00400020

Verification:
- Upper 4 bits: 0000 (from PC region)
- Lower 28 bits: 0x0400020 (target × 4)
- Full address: 0x00400020

Notes:
- The shift by 2 allows addressing word-aligned instructions (every 4 bytes)
- The upper 4 bits from PC mean jumps are limited to the same 256MB region
- For cross-region jumps, use jr (jump register) instruction`,
  },
  {
    id: 'cs202-t1-ex7',
    subjectId: 'cs202',
    topicId: 'cs202-topic1',
    type: 'written',
    title: 'Instruction Type Identification',
    description: 'Categorize each instruction by type (data transfer, arithmetic, logical, control flow): ADD, LW, BEQ, AND, SW, JR, SLT, SLL, JAL, SUB',
    difficulty: 1,
    hints: ['Data transfer moves data between registers and memory', 'Control flow changes program execution order'],
    solution: `Data Transfer Instructions (move data between registers and memory):
- LW (Load Word) - Reads from memory to register
- SW (Store Word) - Writes from register to memory

Arithmetic Instructions (mathematical operations):
- ADD - Addition
- SUB - Subtraction
- SLT (Set Less Than) - Comparison that produces 0 or 1

Logical Instructions (bitwise operations):
- AND - Bitwise AND
- SLL (Shift Left Logical) - Bit shifting

Control Flow Instructions (change execution order):
- BEQ (Branch if Equal) - Conditional branch
- JR (Jump Register) - Indirect jump
- JAL (Jump and Link) - Function call

Note: SLT could also be considered logical (produces boolean result).
Categories can overlap; e.g., CMP in x86 is both arithmetic (subtraction) and comparison.`,
  },
  {
    id: 'cs202-t1-ex8',
    subjectId: 'cs202',
    topicId: 'cs202-topic1',
    type: 'written',
    title: 'PC-Relative Addressing',
    description: 'A BEQ instruction is located at address 0x00400100. If the branch is taken, execution continues at 0x00400120. What is the value stored in the 16-bit offset field of the instruction?',
    difficulty: 3,
    hints: ['Target = (PC + 4) + (offset × 4)', 'Offset is in words, not bytes'],
    solution: `PC-relative addressing in MIPS branches:

Given:
- BEQ instruction at: 0x00400100
- Target address: 0x00400120

Branch target calculation: Target = (PC + 4) + (offset × 4)

Solving for offset:
0x00400120 = (0x00400100 + 4) + (offset × 4)
0x00400120 = 0x00400104 + (offset × 4)
0x00400120 - 0x00400104 = offset × 4
0x0000001C = offset × 4
offset = 0x0000001C / 4
offset = 0x00000007 = 7

The 16-bit offset field contains: 0x0007 (or just 7)

Verification:
Target = 0x00400104 + (7 × 4)
      = 0x00400104 + 0x1C
      = 0x00400120 ✓

The offset is in words (4 bytes), not bytes, extending the branch range by 4×.`,
  },
  {
    id: 'cs202-t1-ex9',
    subjectId: 'cs202',
    topicId: 'cs202-topic1',
    type: 'written',
    title: 'Register Conventions Purpose',
    description: 'Explain why MIPS has conventions for registers like $a0-$a3 (arguments), $v0-$v1 (return values), and $t0-$t9 (temporaries). What would happen without these conventions?',
    difficulty: 3,
    hints: ['Think about separate compilation', 'Consider caller-saved vs callee-saved'],
    solution: `Purpose of Register Conventions:

1. Enable separate compilation:
   - Caller knows where to put arguments ($a0-$a3)
   - Callee knows where to find arguments
   - Libraries can be compiled separately from user code

2. Efficient function calls:
   - No need to save/restore all registers
   - Caller-saved ($t0-$t9): Callee can use freely
   - Callee-saved ($s0-$s7): Callee must preserve

3. Clear responsibility:
   - $ra: Return address from JAL
   - $sp: Stack pointer (must be maintained)
   - $gp: Global pointer (for global data access)

Without conventions:
- Every function call would need to save ALL registers
- Functions couldn't be compiled independently
- Linking would require knowledge of all register usage
- No way for caller/callee to agree on interface
- Libraries would be impossible to use

The ABI (Application Binary Interface) standardizes these conventions, making interoperability possible.`,
  },
  {
    id: 'cs202-t1-ex10',
    subjectId: 'cs202',
    topicId: 'cs202-topic1',
    type: 'written',
    title: 'Fixed vs Variable Length Instructions',
    description: 'MIPS uses fixed 32-bit instructions while x86 uses variable length (1-15 bytes). Discuss the trade-offs in terms of: (a) code density, (b) decode complexity, (c) pipelining ease.',
    difficulty: 4,
    hints: ['Consider instruction cache efficiency', 'Think about superscalar fetch'],
    solution: `(a) Code Density:
Variable-length (x86):
- Common instructions can be short (1-3 bytes)
- Complex instructions encoded only when needed
- Better code density (smaller executables)

Fixed-length (MIPS):
- Every instruction is 4 bytes, even simple ones
- NOPs and padding waste space
- Typically 25-30% larger executables

(b) Decode Complexity:
Variable-length (x86):
- Must determine instruction length before decoding next
- Prefix bytes, multiple opcode bytes, variable operands
- Modern x86: Pre-decode stage to find boundaries
- Historically limited superscalar width

Fixed-length (MIPS):
- Every instruction at PC, PC+4, PC+8, etc.
- Instruction fields in fixed positions
- Simple, parallel decode of multiple instructions
- Enables easy superscalar implementations

(c) Pipelining:
Variable-length (x86):
- Instruction cache must deliver variable amounts
- Branch target might not be instruction-aligned
- Complex instruction buffer management
- Harder to fetch/decode multiple per cycle

Fixed-length (MIPS):
- Fetch N × 4 bytes = N instructions
- Branch targets always word-aligned
- Simple instruction fetch/buffer
- Enables efficient wide issue

Modern x86 mitigates these issues by converting to fixed-length micro-ops internally.`,
  },
  {
    id: 'cs202-t1-ex11',
    subjectId: 'cs202',
    topicId: 'cs202-topic1',
    type: 'written',
    title: 'Endianness Impact',
    description: 'The 32-bit value 0x12345678 is stored at address 0x1000. Show the byte layout in memory for both big-endian and little-endian systems. Which byte is at address 0x1000 in each case?',
    difficulty: 2,
    hints: ['Big-endian: Most significant byte first', 'Little-endian: Least significant byte first'],
    solution: `Value: 0x12345678
- Most significant byte: 0x12
- Least significant byte: 0x78

Big-Endian (MSB at lowest address):
Address   Byte
0x1000    0x12  ← Most significant byte first
0x1001    0x34
0x1002    0x56
0x1003    0x78

Little-Endian (LSB at lowest address):
Address   Byte
0x1000    0x78  ← Least significant byte first
0x1001    0x56
0x1002    0x34
0x1003    0x12

At address 0x1000:
- Big-endian: 0x12
- Little-endian: 0x78

Practical implications:
- Network protocols typically use big-endian ("network byte order")
- x86 is little-endian
- ARM can be configured either way
- When accessing bytes of a word (e.g., string characters), order matters
- When reading 32-bit words, hardware handles endianness transparently`,
  },
  {
    id: 'cs202-t1-ex12',
    subjectId: 'cs202',
    topicId: 'cs202-topic1',
    type: 'written',
    title: 'Instruction Encoding',
    description: 'Encode the MIPS instruction "addi $t0, $s1, -5" into its 32-bit binary representation. Show your work.',
    difficulty: 3,
    hints: ['addi is I-format', 'Use two\'s complement for negative immediate'],
    solution: `Instruction: addi $t0, $s1, -5

MIPS I-format layout:
| opcode (6) | rs (5) | rt (5) | immediate (16) |

Field values:
- opcode for addi: 001000 (8)
- rs (source): $s1 = register 17 = 10001
- rt (destination): $t0 = register 8 = 01000
- immediate: -5 in 16-bit two's complement

Computing -5 in 16-bit two's complement:
5 in binary: 0000 0000 0000 0101
Invert:      1111 1111 1111 1010
Add 1:       1111 1111 1111 1011
-5 =         0xFFFB = 1111 1111 1111 1011

Complete instruction:
| 001000 | 10001 | 01000 | 1111 1111 1111 1011 |

Binary: 0010 0010 0010 1000 1111 1111 1111 1011

Grouped as hex: 0x2228FFFB

Verification:
- Opcode 0x08 = addi ✓
- rs = 17 = $s1 ✓
- rt = 8 = $t0 ✓
- imm = 0xFFFB = -5 ✓`,
  },
  {
    id: 'cs202-t1-ex13',
    subjectId: 'cs202',
    topicId: 'cs202-topic1',
    type: 'written',
    title: 'ISA Design Trade-off',
    description: 'You are designing an ISA for an embedded system with limited memory. You can choose between: (A) 32 registers with 32-bit fixed instructions, or (B) 8 registers with 16-bit fixed instructions. Analyze the trade-offs.',
    difficulty: 5,
    hints: ['More registers reduce spills to memory', '16-bit instructions have code density advantages'],
    solution: `Analysis of both options:

Option A: 32 registers, 32-bit instructions

Advantages:
- More registers reduce memory traffic (less spilling)
- Larger immediate fields possible
- More opcodes/functionality available
- Better for compute-intensive code

Disadvantages:
- Each instruction is 4 bytes
- Code size is larger
- More instruction memory needed

Option B: 8 registers, 16-bit instructions

Advantages:
- 2× code density (important for embedded!)
- Lower instruction cache requirements
- Lower power for instruction fetch
- Register specifiers only need 3 bits each

Disadvantages:
- Frequent register spilling to memory
- Small immediates (need more instructions for constants)
- Limited instruction encoding space
- More memory traffic for spilled registers

Recommendation for embedded:
Consider a hybrid like ARM Thumb or MIPS16:
- 16-bit instructions for common operations
- 32-bit for complex operations
- Achieves ~70% code size of pure 32-bit
- Register window or subset addressing

Real-world examples:
- ARM Thumb-2: Mixed 16/32-bit
- RISC-V Compressed: 16-bit subset
- MIPS16e: 16-bit extension mode`,
  },
  {
    id: 'cs202-t1-ex14',
    subjectId: 'cs202',
    topicId: 'cs202-topic1',
    type: 'written',
    title: 'Compare x86 and ARM Instructions',
    description: 'Compare how x86 and ARM would implement "if (a == 0) b = c + d". Write pseudo-assembly for both and highlight ISA differences.',
    difficulty: 3,
    hints: ['ARM has conditional execution', 'x86 uses two-operand format'],
    solution: `Assume: a in R0, b in R1, c in R2, d in R3

x86 approach:
    cmp eax, 0        ; Compare a with 0, sets flags
    jne skip          ; Jump if not equal (ZF=0)
    mov ebx, ecx      ; b = c
    add ebx, edx      ; b = c + d
skip:

Characteristics:
- Separate compare instruction sets flags
- Conditional jump based on flags
- Two-operand instructions (dest = dest op src)

ARM approach:
    cmp r0, #0        ; Compare a with 0, sets flags
    addeq r1, r2, r3  ; If equal, b = c + d (conditional execution!)

Or without predication:
    cmp r0, #0
    bne skip
    add r1, r2, r3
skip:

Characteristics:
- Predicated execution: most instructions can be conditional
- Three-operand format (dest, src1, src2)
- Can avoid branch entirely with conditional execution

Key differences:
1. ARM has conditional execution on most instructions
2. ARM uses 3-operand format (non-destructive)
3. x86 uses 2-operand format (destination is also source)
4. ARM predication avoids branch penalty for short conditionals
5. x86 has implicit flags register; ARM sets flags explicitly (S suffix)`,
  },
  {
    id: 'cs202-t1-ex15',
    subjectId: 'cs202',
    topicId: 'cs202-topic1',
    type: 'written',
    title: 'RISC-V Extension Analysis',
    description: 'RISC-V has a base ISA (RV32I) and optional extensions (M for multiply, F for float, etc.). Discuss advantages and challenges of this modular approach.',
    difficulty: 5,
    hints: ['Think about customization for different applications', 'Consider software ecosystem challenges'],
    solution: `Advantages of Modular Extensions:

1. Customization for application:
   - Embedded: RV32I only (minimal area)
   - Scientific: RV64GC (full 64-bit with float)
   - Crypto: Add Zk extension
   - No unused hardware for your use case

2. Implementation flexibility:
   - Simple cores: Trap unimplemented instructions to software
   - Complex cores: Hardware implementation of all extensions
   - Same binaries can run (with different performance)

3. Future-proof:
   - Add new extensions without breaking compatibility
   - Reserved opcode space for future use
   - V (vector), P (packed SIMD) added recently

4. Reduces verification burden:
   - Each extension verified independently
   - Base ISA is small and well-tested

Challenges:

1. Software compatibility:
   - Compiler must know which extensions are available
   - Libraries may need multiple versions
   - Runtime detection adds complexity

2. Fragmentation risk:
   - Too many combinations to test
   - Some extension combinations may conflict
   - Hardware/software ecosystem splitting

3. Discovery mechanism:
   - Software must detect available extensions
   - CSRs (Control/Status Registers) for discovery
   - Boot-time vs. runtime detection

4. ABI challenges:
   - Calling conventions depend on extensions (float registers?)
   - Binary compatibility across extension sets
   - Dynamic linking with extension-specific code

Real-world status:
- RISC-V has profiles (RVA, RVB) that define standard combinations
- This reduces fragmentation while keeping modularity`,
  },
  {
    id: 'cs202-t1-ex16',
    subjectId: 'cs202',
    topicId: 'cs202-topic1',
    type: 'written',
    title: 'Instruction Fetch Width Calculation',
    description: 'A processor fetches instructions from a 64-byte aligned cache line. For MIPS (32-bit fixed), x86 (variable 1-15 bytes), and Thumb-2 (mixed 16/32-bit), how many instructions can maximally be fetched per cache line?',
    difficulty: 3,
    hints: ['64 bytes / instruction size = max instructions', 'Variable length needs analysis of best/worst case'],
    solution: `64-byte cache line analysis:

MIPS (fixed 32-bit = 4 bytes):
- Each instruction: 4 bytes
- Maximum instructions per line: 64 / 4 = 16 instructions
- Predictable, always 16 instructions (if aligned)

x86 (variable 1-15 bytes):
- Minimum instruction size: 1 byte
- Maximum instruction size: 15 bytes
- Best case: 64 / 1 = 64 instructions (all 1-byte, like NOP)
- Worst case: 64 / 15 ≈ 4 instructions
- Typical: ~15-20 instructions (average ~3-4 bytes)
- Note: Cannot know count without decoding!

ARM Thumb-2 (mixed 16/32-bit):
- 16-bit instructions: 2 bytes
- 32-bit instructions: 4 bytes
- Best case: 64 / 2 = 32 instructions (all 16-bit)
- Worst case: 64 / 4 = 16 instructions (all 32-bit)
- Typical: ~20-24 instructions (mix of both)
- Better predictability than x86 (only 2 sizes)

Implications for fetch:
- MIPS: Simple, fetch exactly N instructions
- x86: Complex pre-decode to find boundaries
- Thumb-2: Easier boundary detection than x86

Modern x86 CPUs use instruction length decoders in L1 cache to mark boundaries, reducing decode complexity.`,
  },
];
