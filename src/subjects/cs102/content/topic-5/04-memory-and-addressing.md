# Memory and Addressing (Conceptual)

Memory is where programs and data live while a computer runs. Understanding how memory is organized and accessed is fundamental to programming—it explains pointers, arrays, data structures, and many common bugs. At the architecture level, memory is a simple abstraction: a large array of bytes, each with a unique address.

## Memory as an Array of Bytes

The simplest model of memory is a giant array where each element is one byte (8 bits), and each byte has a unique numeric address:

```
Address:  0x0000  0x0001  0x0002  0x0003  0x0004  ...
Content:  [byte]  [byte]  [byte]  [byte]  [byte]  ...
```

To access memory, you specify an address; the memory system returns (or stores) the byte at that location.

### Address Space

The **address space** is the range of valid addresses. For a 32-bit address, you can represent 2^32 = 4,294,967,296 addresses (4 GB). For 64-bit addresses, the theoretical limit is 2^64 (16 exabytes), though real systems use far less.

### Byte Addressing

Most modern systems are **byte-addressed**: each address refers to one byte. This is important because:
- Characters (ASCII) are one byte
- Larger types span multiple consecutive addresses
- Byte-level access is needed for string manipulation and network protocols

### Word Size

A **word** is the natural unit of data for a processor—typically 32 or 64 bits. Many operations work on whole words. However, the address of a word is the address of its first (lowest-addressed) byte.

## Multi-Byte Data in Memory

Values larger than one byte occupy multiple consecutive memory locations. For a 32-bit integer:

```
Address:  0x1000  0x1001  0x1002  0x1003
Content:  [byte0] [byte1] [byte2] [byte3]
```

### Endianness Reminder

The order of bytes within a multi-byte value depends on **endianness**:

**Little endian** (x86, ARM): Least significant byte at lowest address
```
Value: 0x12345678
Addr 0x1000: 0x78 (LSB)
Addr 0x1001: 0x56
Addr 0x1002: 0x34
Addr 0x1003: 0x12 (MSB)
```

**Big endian** (network order): Most significant byte at lowest address
```
Value: 0x12345678
Addr 0x1000: 0x12 (MSB)
Addr 0x1001: 0x34
Addr 0x1002: 0x56
Addr 0x1003: 0x78 (LSB)
```

When reading hex dumps or debugging memory, always know the endianness.

## Memory Alignment

**Alignment** refers to placing data at addresses that are multiples of the data size:
- 2-byte values at even addresses (divisible by 2)
- 4-byte values at addresses divisible by 4
- 8-byte values at addresses divisible by 8

### Why Alignment Matters

**Performance**: Aligned access is faster. An unaligned 4-byte read might require two memory transactions.

**Correctness**: Some architectures (older ARM, SPARC) fault on unaligned access. Others (x86) handle it but with a performance penalty.

**Struct padding**: Compilers insert padding bytes to maintain alignment within structures.

```c
struct Example {
    char a;      // 1 byte at offset 0
    // 3 bytes padding
    int b;       // 4 bytes at offset 4 (aligned)
    char c;      // 1 byte at offset 8
    // 3 bytes padding
};
// Total: 12 bytes, not 6
```

## The Load/Store Model

In most RISC architectures, the CPU cannot operate directly on memory values. Instead:

1. **Load**: Copy data from memory into a register
2. **Compute**: Perform operations on register values
3. **Store**: Copy results from a register back to memory

This is the **load/store architecture**. Only load and store instructions access memory; all arithmetic and logic operates on registers.

**Example**:
```assembly
LOAD  R1, [0x1000]    ; R1 ← Memory[0x1000]
LOAD  R2, [0x1004]    ; R2 ← Memory[0x1004]
ADD   R3, R1, R2      ; R3 ← R1 + R2
STORE R3, [0x1008]    ; Memory[0x1008] ← R3
```

### Why Load/Store?

- **Simpler hardware**: Only two instruction types access memory
- **Predictable timing**: Memory access is isolated to specific instructions
- **Better pipelining**: Clear separation between computation and memory stages

CISC architectures (like x86) allow memory operands in arithmetic instructions, but internally often convert them to load-compute-store sequences.

## Addressing Modes

**Addressing modes** specify how an instruction finds its operands. Different modes provide flexibility for accessing variables, arrays, and data structures.

### Immediate Addressing

The operand value is encoded directly in the instruction:
```assembly
ADD R1, R2, #5    ; R1 ← R2 + 5
```

The value 5 is part of the instruction itself—no memory access needed for the operand.

**Use case**: Small constants, loop increments, known values.

### Register Addressing

The operand is in a register:
```assembly
ADD R1, R2, R3    ; R1 ← R2 + R3
```

All operands are already in the CPU. Very fast.

**Use case**: Most computations; variables kept in registers.

### Direct (Absolute) Addressing

The instruction contains the memory address:
```assembly
LOAD R1, [0x1000]    ; R1 ← Memory[0x1000]
```

The address is a constant embedded in the instruction.

**Use case**: Global variables at fixed addresses.

### Register Indirect Addressing

A register contains the address:
```assembly
LOAD R1, [R2]    ; R1 ← Memory[R2]
```

The value in R2 is treated as an address. The CPU reads from that address.

**Use case**: Pointer dereferencing (`*ptr` in C).

### Base + Offset (Displacement) Addressing

Address is a register plus a constant offset:
```assembly
LOAD R1, [R2 + 100]    ; R1 ← Memory[R2 + 100]
```

Combines a base register with a fixed offset.

**Use case**: Accessing struct fields (`obj.field`), stack variables (`[SP + offset]`).

### Indexed Addressing

Address is base register plus index register:
```assembly
LOAD R1, [R2 + R3]    ; R1 ← Memory[R2 + R3]
```

Useful for array access where the index varies.

**Use case**: Array elements where index is computed (`array[i]`).

### Scaled Indexed Addressing

Address is base plus scaled index:
```assembly
LOAD R1, [R2 + R3 * 4]    ; R1 ← Memory[R2 + R3*4]
```

The scale factor (typically 1, 2, 4, or 8) matches element size.

**Use case**: Array of ints (`int array[i]` where each int is 4 bytes).

### PC-Relative Addressing

Address is computed relative to the program counter:
```assembly
LOAD R1, [PC + offset]
```

The target address is the current instruction address plus an offset.

**Use case**: Position-independent code, accessing constants in code segment.

## Memory Regions

Programs organize memory into distinct regions:

### Text (Code) Segment

Contains the executable instructions. Usually read-only to prevent accidental modification.

### Data Segment

Contains global and static variables initialized with values.

### BSS Segment

Contains global and static variables initialized to zero. Doesn't take space in the executable—just a size specification.

### Heap

Dynamically allocated memory (malloc, new). Grows upward (toward higher addresses) as allocations are made.

### Stack

Stores local variables, function parameters, return addresses. Grows downward (toward lower addresses) as functions are called.

```
High addresses
+------------------+
|      Stack       |  ← SP points here; grows down
+------------------+
|        ↓         |
|   (free space)   |
|        ↑         |
+------------------+
|       Heap       |  ← Grows up
+------------------+
|       BSS        |
+------------------+
|       Data       |
+------------------+
|       Text       |
+------------------+
Low addresses
```

## Memory Access Latency

Not all memory access is equally fast:

| Level | Typical Latency | Typical Size |
|-------|-----------------|--------------|
| Registers | ~1 cycle | ~hundreds of bytes |
| L1 Cache | ~4 cycles | 32-64 KB |
| L2 Cache | ~10 cycles | 256 KB - 1 MB |
| L3 Cache | ~40 cycles | 4-32 MB |
| Main Memory | ~100 cycles | 8-64 GB |

The **memory hierarchy** exploits **locality**:
- **Temporal locality**: Recently accessed data is likely to be accessed again
- **Spatial locality**: Data near recently accessed data is likely to be accessed soon

Caches automatically keep frequently-used data close to the CPU.

## Virtual Memory (Preview)

Modern systems use **virtual memory**: programs see a private address space that doesn't correspond directly to physical RAM addresses. The operating system and hardware translate virtual addresses to physical addresses.

Benefits:
- **Isolation**: Each process has its own address space
- **Protection**: Processes can't access each other's memory
- **Flexibility**: Physical memory can be fragmented; virtual addresses are contiguous
- **Overcommitment**: Total virtual memory can exceed physical RAM (using disk swap)

## Common Memory Bugs

Understanding memory helps you avoid classic bugs:

**Null pointer dereference**: Accessing address 0 (or near 0), which is usually invalid.

**Buffer overflow**: Writing past the end of an array, corrupting adjacent data.

**Use after free**: Accessing memory that has been returned to the heap.

**Memory leak**: Allocating memory without ever freeing it.

**Uninitialized read**: Using memory before writing to it.

**Alignment fault**: Accessing unaligned data on architectures that require alignment.

## Key Takeaways

- Memory is a **byte-addressed array**; each byte has a unique address.
- Multi-byte values span consecutive addresses; **endianness** determines byte order.
- **Alignment** improves performance; compilers add padding to maintain it.
- **Load/store architecture**: Only load/store instructions access memory; arithmetic uses registers.
- **Addressing modes** provide flexibility: immediate, register, direct, indirect, base+offset, indexed, PC-relative.
- Memory is organized into **text, data, BSS, heap, and stack** regions.
- **Memory hierarchy** (registers → caches → RAM) trades size for speed; caches exploit locality.
- **Virtual memory** gives each process its own address space with protection and flexibility.
- Many bugs involve memory: null pointers, overflows, use-after-free, leaks, uninitialized reads.

