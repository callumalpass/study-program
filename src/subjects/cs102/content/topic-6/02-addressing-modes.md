# Addressing Modes (How Assembly Finds Data)

When an instruction needs data, it must specify where to find it. An **addressing mode** is the method an instruction uses to locate its operand—whether that's a constant value, a register, or a memory location. Understanding addressing modes is essential for reading assembly code and understanding how high-level constructs like arrays, pointers, and structures translate to machine operations.

## Why Addressing Modes Matter

Different situations require different ways of specifying operands:
- Sometimes you need a constant (the number 5)
- Sometimes you need a value already in a register
- Sometimes you need data from memory at a fixed address
- Sometimes you need data from memory at an address computed at runtime

Addressing modes provide the flexibility to handle all these cases efficiently. Recognizing which mode is being used helps you understand what an instruction is actually doing.

## Immediate Addressing

In **immediate addressing**, the operand value is encoded directly in the instruction itself. The data is "immediately" available—no memory access required.

```assembly
MOV R0, #42       ; R0 ← 42
ADD R1, R1, #1    ; R1 ← R1 + 1
CMP R0, #0        ; Compare R0 to 0
```

The `#` symbol (in ARM-style syntax) indicates an immediate value. On x86, immediates are just written as numbers: `mov eax, 42`.

### Properties of Immediate Mode

- **Fast**: No memory access needed—the value is part of the instruction
- **Limited size**: The immediate must fit in the instruction's encoding (typically 8-16 bits)
- **Compile-time constant**: The value is fixed when the code is assembled

### Use Cases

- Loop counters: `ADD R0, R0, #1` (increment by 1)
- Comparisons with constants: `CMP R0, #100`
- Bit masks: `AND R0, R0, #0xFF` (keep low 8 bits)
- Small offsets: `ADD SP, SP, #-16` (allocate 16 bytes on stack)

## Register Addressing

In **register addressing**, the operand is in a register. This is the fastest mode because registers are accessed in a single cycle.

```assembly
ADD R2, R0, R1    ; R2 ← R0 + R1
MOV R3, R0        ; R3 ← R0
CMP R0, R1        ; Compare R0 to R1
```

All operands are register names. The CPU reads from source registers and writes to the destination register.

### Properties of Register Mode

- **Fastest**: No memory access at all
- **Limited storage**: Only 16-32 registers available
- **Compiler-managed**: The compiler decides what lives in which register

### Use Cases

- All arithmetic and logic operations work on registers
- Temporary variables during calculations
- Passing arguments between parts of code

## Direct (Absolute) Addressing

In **direct addressing**, the instruction contains the actual memory address.

```assembly
LOAD R0, [0x1000]     ; R0 ← Memory[0x1000]
STORE R1, [0x2000]    ; Memory[0x2000] ← R1
```

The address is a constant embedded in the instruction.

### Properties of Direct Mode

- **Fixed address**: The address is known at compile time
- **Simple**: No computation needed to find the address
- **Inflexible**: Can't change which address is accessed at runtime

### Use Cases

- Accessing global variables at known addresses
- Memory-mapped I/O at fixed locations
- Less common in modern code (addresses are often computed)

## Register Indirect Addressing

In **register indirect addressing**, a register contains the memory address.

```assembly
LOAD R0, [R1]     ; R0 ← Memory[R1]
STORE R2, [R3]    ; Memory[R3] ← R2
```

The value in R1 is interpreted as an address. The CPU reads from (or writes to) that memory location.

### Properties of Indirect Mode

- **Runtime flexibility**: The address can be computed or changed
- **Pointer access**: This is exactly how pointers work in C
- **One indirection**: Follow the pointer to find the data

### Use Cases

- **Pointer dereferencing**: `*ptr` in C
- **Walking through data**: Increment a pointer to visit consecutive elements
- **Dynamic data structures**: Access nodes via pointers

### Worked Example

```c
// C code
int *ptr = array;
int value = *ptr;  // Dereference pointer
```

```assembly
; Assembly equivalent
MOV R1, array_addr  ; R1 = &array[0] (pointer)
LDR R0, [R1]        ; R0 = *R1 (indirect load)
```

## Base + Offset (Displacement) Addressing

**Base + offset** (also called displacement addressing) computes the address as a register value plus a constant offset.

```assembly
LDR R0, [R1, #8]     ; R0 ← Memory[R1 + 8]
STR R2, [SP, #-4]    ; Memory[SP - 4] ← R2
LDR R3, [FP, #-12]   ; R3 ← Memory[FP - 12]
```

The effective address is: `base_register + constant_offset`.

### Properties of Base + Offset

- **Structured access**: Perfect for structs and stack frames
- **Fixed offset**: The offset is encoded in the instruction
- **Base varies**: The base register can point to different objects

### Use Cases

**Struct field access**:
```c
struct Point { int x; int y; };
struct Point p;
int val = p.y;  // Access field at offset 4
```

```assembly
; R0 = address of struct Point p
LDR R1, [R0, #4]    ; Load y field (offset 4 from base)
```

**Local variables on stack**:
```assembly
; Access local variable at [FP - 8]
LDR R0, [FP, #-8]
```

**Array access with constant index**:
```assembly
; array[3] where array base is in R0, each element is 4 bytes
LDR R1, [R0, #12]   ; 3 * 4 = 12
```

## Indexed Addressing

**Indexed addressing** computes the address as the sum of two registers.

```assembly
LDR R0, [R1, R2]    ; R0 ← Memory[R1 + R2]
```

The effective address is: `base_register + index_register`.

### Properties of Indexed Mode

- **Variable offset**: Both base and index can change at runtime
- **Array traversal**: Base is array start, index is element offset
- **Requires offset calculation**: Index often needs scaling

### Use Cases

**Array with variable index**:
```c
int array[10];
int i = ...;
int val = array[i];
```

```assembly
; R0 = array base, R1 = i * 4 (scaled index)
LDR R2, [R0, R1]
```

## Scaled Indexed Addressing

**Scaled indexed addressing** multiplies the index by a scale factor before adding to the base.

```assembly
; x86 syntax
mov eax, [ebx + ecx*4]    ; eax ← Memory[ebx + ecx*4]

; ARM syntax
LDR R0, [R1, R2, LSL #2]  ; R0 ← Memory[R1 + R2*4]
```

The effective address is: `base + (index × scale)`.

Scale factors are typically 1, 2, 4, or 8 (matching data sizes: byte, short, int, long).

### Properties of Scaled Indexed Mode

- **Natural array indexing**: Scale matches element size
- **Efficient**: Single instruction does multiply and add
- **Limited scales**: Usually powers of 2 only

### Use Cases

**Array of integers**:
```c
int array[100];
int i = 5;
int val = array[i];  // Element at index i
```

```assembly
; R0 = array base, R1 = i (not yet scaled)
; Each int is 4 bytes, so scale by 4
LDR R2, [R0, R1, LSL #2]  ; LSL #2 means multiply by 4
```

## PC-Relative Addressing

**PC-relative addressing** computes the address relative to the current program counter.

```assembly
LDR R0, [PC, #offset]    ; Load from code-relative address
ADR R1, label            ; Load address of label
```

The effective address is: `PC + offset`.

### Properties of PC-Relative Mode

- **Position-independent**: Code works regardless of where it's loaded
- **Code constants**: Access data embedded near the code
- **Branch targets**: Relative branches use this implicitly

### Use Cases

- **Position-independent code (PIC)**: Libraries that can load at any address
- **Literal pools**: Constants stored near functions
- **Branch instructions**: `B target` is PC-relative

## Pre-Increment and Post-Increment

Some architectures support automatic increment/decrement of the base register:

**Post-increment**: Use the address, then increment
```assembly
LDR R0, [R1], #4    ; R0 ← Memory[R1]; R1 ← R1 + 4
```

**Pre-increment**: Increment first, then use the address
```assembly
LDR R0, [R1, #4]!   ; R1 ← R1 + 4; R0 ← Memory[R1]
```

### Use Cases

- **Array traversal**: Load element and advance pointer in one instruction
- **Stack operations**: Push/pop implementations
- **String processing**: Walk through characters efficiently

## Choosing the Right Mode

| High-Level Construct | Typical Addressing Mode |
|---------------------|-------------------------|
| Constant value | Immediate |
| Variable in register | Register |
| Global variable | Direct |
| Pointer dereference (`*ptr`) | Register Indirect |
| Struct field (`s.field`) | Base + Offset |
| Array with constant index (`a[3]`) | Base + Offset |
| Array with variable index (`a[i]`) | Indexed or Scaled Indexed |
| Stack-based local variable | Base + Offset (from FP or SP) |
| Position-independent data | PC-Relative |

## Key Takeaways

- **Addressing modes** specify how an instruction finds its operands.
- **Immediate**: Value in the instruction itself; used for constants.
- **Register**: Operand is in a register; fastest access.
- **Direct**: Address is a constant in the instruction; for fixed locations.
- **Register Indirect**: Register contains the address; implements pointers.
- **Base + Offset**: Base register + constant; perfect for structs and stack variables.
- **Indexed**: Base + index register; for arrays with variable indices.
- **Scaled Indexed**: Base + (index × scale); natural for typed arrays.
- **PC-Relative**: Address relative to PC; enables position-independent code.
- Recognizing addressing modes helps you understand what assembly code is doing and how high-level constructs translate to machine operations.

