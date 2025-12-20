---
id: cs202-t1-addressing
title: "Addressing Modes"
order: 3
---

# Addressing Modes

**Addressing modes** determine how the processor calculates the effective address of an operand. They provide flexibility in how data is accessed, enabling efficient implementation of various programming constructs like arrays, pointers, and data structures.

## Why Multiple Addressing Modes?

Different programming patterns require different ways of accessing data:

- **Constants**: Need to embed values directly in instructions
- **Local variables**: Need efficient register access
- **Array elements**: Need indexed access with computed offsets
- **Pointers**: Need indirect access through stored addresses
- **Stack frames**: Need base-plus-offset access

Without multiple addressing modes, programmers would need many more instructions to accomplish the same tasks.

## Immediate Addressing

In **immediate addressing**, the operand value is encoded directly in the instruction itself.

```
MOV R1, #100      ; R1 = 100
ADD R2, R2, #5    ; R2 = R2 + 5
```

**Characteristics**:
- Fastest mode: no memory access needed
- Operand size limited by instruction format
- Used for constants known at compile time

**Example in MIPS**:
```mips
addi $t0, $zero, 42    # $t0 = 42
ori  $t1, $zero, 0xFF  # $t1 = 255
```

**Limitations**: The immediate value is limited by the bits available. In MIPS I-format, immediates are 16 bits (-32768 to 32767 for signed values).

## Register Addressing

In **register addressing**, operands are in CPU registers.

```
ADD R1, R2, R3    ; R1 = R2 + R3
MOV R4, R5        ; R4 = R5
```

**Characteristics**:
- Very fast: registers are on-chip
- Limited number of registers (typically 16-32)
- Most RISC arithmetic uses register addressing exclusively

**Example in MIPS**:
```mips
add $t0, $s1, $s2    # $t0 = $s1 + $s2
sub $t1, $t0, $s3    # $t1 = $t0 - $s3
```

## Direct (Absolute) Addressing

In **direct addressing**, the instruction contains the memory address of the operand.

```
LOAD R1, [0x1000]     ; R1 = Memory[0x1000]
STORE R2, [0x2000]    ; Memory[0x2000] = R2
```

**Characteristics**:
- Simple addressing calculation
- Address size may limit addressable memory
- Useful for accessing global variables

**Example in x86**:
```nasm
mov eax, [0x00401000]    ; Load from absolute address
mov [counter], ebx       ; Store to labeled address
```

**Limitation**: In 64-bit architectures, direct addressing of the full address space would require 64 bits in every instruction, which is impractical.

## Register Indirect Addressing

In **register indirect addressing**, a register holds the address of the operand.

```
LOAD R1, [R2]     ; R1 = Memory[R2]
STORE R3, [R4]    ; Memory[R4] = R3
```

**Characteristics**:
- Essential for implementing pointers
- Allows accessing different memory locations with same instruction
- Common in RISC load/store architectures

**Example in MIPS**:
```mips
lw $t0, 0($s1)    # $t0 = Memory[$s1]
sw $t2, 0($s3)    # Memory[$s3] = $t2
```

**Use case - Pointer dereference**:
```c
// C code:
int *p = &x;
int y = *p;    // Register indirect: load from address in p
```

## Base + Displacement (Indexed) Addressing

In **base + displacement** mode, the effective address is a register value plus a constant offset.

```
LOAD R1, [R2 + 100]    ; R1 = Memory[R2 + 100]
```

**Characteristics**:
- Ideal for accessing structure fields
- Supports stack frame access
- Displacement usually has limited range

**Example in MIPS**:
```mips
lw $t0, 8($sp)     # Load from stack pointer + 8
sw $t1, -4($fp)    # Store to frame pointer - 4
```

**Use case - Structure access**:
```c
struct Point { int x; int y; };
struct Point *p = ...;
int a = p->x;    // Base (p) + offset (0)
int b = p->y;    // Base (p) + offset (4)
```

## Scaled Index Addressing

In **scaled index** mode, an index register is multiplied by a scale factor and added to a base.

```
LOAD R1, [R2 + R3*4]    ; R1 = Memory[R2 + R3*4]
```

**Characteristics**:
- Perfect for array access
- Scale factor matches element size (1, 2, 4, or 8 bytes)
- Common in x86, less common in RISC

**Example in x86**:
```nasm
mov eax, [ebx + ecx*4]       ; Array of 4-byte integers
mov eax, [array + rsi*8]     ; Array of 8-byte values
```

**Use case - Array indexing**:
```c
int arr[100];
int x = arr[i];    // Base (arr) + index (i) * scale (4)
```

## Base + Index + Displacement

Some architectures support combining all three components:

```
LOAD R1, [R2 + R3*4 + 100]    ; R1 = Memory[R2 + R3*4 + 100]
```

**Example in x86**:
```nasm
mov eax, [ebx + ecx*4 + 16]
```

**Use case - 2D array or structure array**:
```c
struct Item { int data[10]; };
struct Item items[100];
int x = items[i].data[j];    // Base + i*sizeof(Item) + j*4
```

## PC-Relative Addressing

In **PC-relative** mode, addresses are calculated relative to the program counter.

```
BEQ R1, R2, offset    ; if R1==R2, PC = PC + offset
```

**Characteristics**:
- Essential for position-independent code
- Common for branch instructions
- Enables relocatable code

**Example in MIPS**:
```mips
beq $t0, $t1, label    # Branch if equal, offset from PC
j label                # Jump (pseudo-absolute)
```

**Example in x86-64**:
```nasm
lea rax, [rip + offset]    ; RIP-relative addressing
call function              ; PC-relative call
```

## Auto-Increment/Decrement

Some architectures support automatic modification of the address register:

```
LOAD R1, [R2]+     ; R1 = Memory[R2]; R2 = R2 + size (post-increment)
LOAD R1, -[R2]     ; R2 = R2 - size; R1 = Memory[R2] (pre-decrement)
```

**Characteristics**:
- Useful for sequential memory access
- Common for stack operations
- Found in ARM and some CISC architectures

**Example - Stack push/pop**:
```
PUSH: STR R1, [SP, #-4]!    ; Pre-decrement SP, then store
POP:  LDR R1, [SP], #4      ; Load, then post-increment SP
```

## Addressing Mode Summary Table

| Mode | Example | Effective Address | Use Case |
|------|---------|------------------|----------|
| Immediate | `MOV R1, #5` | N/A (value in instruction) | Constants |
| Register | `ADD R1, R2` | N/A (value in register) | Computation |
| Direct | `LOAD R1, [1000]` | 1000 | Global variables |
| Register Indirect | `LOAD R1, [R2]` | R2 | Pointers |
| Base + Disp | `LOAD R1, [R2+8]` | R2 + 8 | Structures, stack |
| Scaled Index | `LOAD R1, [R2+R3*4]` | R2 + R3*4 | Arrays |
| PC-Relative | `BEQ offset` | PC + offset | Branches, PIC |

## Key Takeaways

- Addressing modes provide flexibility in operand specification
- RISC architectures use fewer, simpler addressing modes
- CISC architectures offer more complex modes for code density
- Common patterns: immediate for constants, register indirect for pointers, base+displacement for structures
- Scaled indexing is essential for efficient array access
- PC-relative addressing enables position-independent code
