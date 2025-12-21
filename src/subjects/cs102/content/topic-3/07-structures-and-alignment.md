---
id: cs102-t3-structures-alignment
title: "Structures and Alignment"
order: 7
---

# Structures and Memory Alignment

When you define a struct in C or a class in C++, the compiler must decide how to lay out the members in memory. This layout isn't always as simple as concatenating the members—the hardware requires certain alignments for efficient access. Understanding structure layout and alignment is essential for systems programming, binary file formats, network protocols, and interfacing with hardware.

## Why Alignment Matters

Modern CPUs access memory most efficiently when data is aligned to its natural boundary:

| Data Type | Size | Natural Alignment |
|-----------|------|-------------------|
| `char` | 1 byte | 1 byte (any address) |
| `short` | 2 bytes | 2 bytes (even addresses) |
| `int` | 4 bytes | 4 bytes (addresses divisible by 4) |
| `long`/pointer (64-bit) | 8 bytes | 8 bytes (addresses divisible by 8) |
| `double` | 8 bytes | 8 bytes |

**Why?** Memory buses transfer data in aligned chunks. A misaligned access might require two memory operations instead of one, or on some architectures, cause a hardware exception.

### Misaligned Access Penalty

Consider reading a 4-byte `int` at address 0x1003:

```
Memory:  [  0x1000  ][  0x1004  ][  0x1008  ]
         |    |    | |    |    | |    |    |
         0  1  2  3  4  5  6  7  8  9  A  B

Misaligned int at 0x1003: spans addresses 0x1003-0x1006
```

The CPU might need to:
1. Read the 4-byte block at 0x1000 (gets bytes at 0x1003)
2. Read the 4-byte block at 0x1004 (gets bytes at 0x1004-0x1006)
3. Combine the pieces

This doubles the memory access time—or worse on RISC architectures that don't support unaligned access.

## Structure Layout Rules

The compiler inserts **padding bytes** to maintain alignment:

```c
struct Example {
    char a;     // 1 byte
    // 3 bytes padding
    int b;      // 4 bytes, aligned to 4
    char c;     // 1 byte
    // 3 bytes padding (to align struct size for arrays)
};
```

**Size**: Not 6 bytes (1+4+1), but 12 bytes with padding.

### Layout in Memory

```
Offset  Contents
──────────────────
0x00    a (char, 1 byte)
0x01    padding
0x02    padding
0x03    padding
0x04    b (int, 4 bytes)
0x08    c (char, 1 byte)
0x09    padding
0x0A    padding
0x0B    padding
──────────────────
Total: 12 bytes
```

### End Padding

The struct's size must be a multiple of its largest member's alignment. This ensures arrays of structs maintain alignment:

```c
struct Example arr[2];
// arr[0] at offset 0x00, arr[1] at offset 0x0C
// If struct were 9 bytes, arr[1].b would be misaligned at 0x0D
```

## Measuring Size and Alignment

```c
#include <stddef.h>

struct Example { char a; int b; char c; };

sizeof(struct Example);  // 12 (total size with padding)
offsetof(struct Example, a);  // 0
offsetof(struct Example, b);  // 4
offsetof(struct Example, c);  // 8
```

The `offsetof` macro reveals where each member actually sits.

## Optimizing Structure Layout

Reordering members can reduce padding:

```c
// Poor layout (12 bytes)
struct Poor {
    char a;     // 1 byte + 3 padding
    int b;      // 4 bytes
    char c;     // 1 byte + 3 padding
};

// Better layout (8 bytes)
struct Better {
    int b;      // 4 bytes
    char a;     // 1 byte
    char c;     // 1 byte + 2 padding
};

// Optimal layout (6 bytes if packed)
struct Optimal {
    int b;      // 4 bytes
    char a;     // 1 byte
    char c;     // 1 byte (no end padding needed if alignment is 4)
};
```

**General rule**: Order members from largest to smallest alignment requirement.

## Nested Structures

When structs contain other structs, alignment propagates:

```c
struct Inner {
    int x;      // 4-byte alignment
};

struct Outer {
    char a;     // 1 byte
    // 3 bytes padding (to align Inner)
    struct Inner inner;  // 4 bytes, needs 4-byte alignment
    char b;     // 1 byte
    // 3 bytes padding
};
// Total: 12 bytes
```

The inner struct's alignment requirement affects the outer struct's layout.

## Packed Structures

Sometimes you need exact control over layout, especially for:
- Binary file formats
- Network protocols
- Hardware registers
- Interoperability with other languages

Most compilers provide attributes to disable padding:

```c
// GCC/Clang
struct __attribute__((packed)) Packet {
    uint8_t type;
    uint32_t length;
    uint16_t checksum;
};
// Size: exactly 7 bytes, no padding

// MSVC
#pragma pack(push, 1)
struct Packet { ... };
#pragma pack(pop)
```

**Warning**: Packed structures may cause:
- Performance penalties from unaligned access
- Crashes on architectures that don't support misaligned access
- Pointer aliasing issues

## Bit Fields

For even finer control, C allows bit fields:

```c
struct Flags {
    unsigned int ready    : 1;  // 1 bit
    unsigned int error    : 1;  // 1 bit
    unsigned int priority : 3;  // 3 bits
    unsigned int count    : 11; // 11 bits
};
// Total: 16 bits = 2 bytes (typically)
```

**Caveats**:
- Layout is implementation-defined
- Cannot take address of bit field
- May not cross certain boundaries

Bit fields are useful for:
- Hardware register definitions
- Compact flag storage
- Protocol headers

## Union Layout

Unions overlay all members at the same address:

```c
union Value {
    int i;
    float f;
    char bytes[4];
};
// Size: 4 bytes (largest member)
```

All members start at offset 0. Unions are useful for:
- Type punning (reinterpreting bits)
- Variant types
- Memory-efficient alternatives

```c
union Value v;
v.i = 0x40490FDB;  // Store as int
printf("%f\n", v.f);  // Read as float: 3.14159...
```

## Platform Differences

Alignment rules vary by platform:

| Platform | `long` size | `long` alignment | Pointer size |
|----------|-------------|------------------|--------------|
| Linux x86 | 4 bytes | 4 bytes | 4 bytes |
| Linux x86-64 | 8 bytes | 8 bytes | 8 bytes |
| Windows x86-64 | 4 bytes | 4 bytes | 8 bytes |

This means the same struct can have different sizes on different platforms!

```c
struct Platform {
    char a;
    long b;
};
// Linux x86: 8 bytes (1 + 3 padding + 4)
// Linux x86-64: 16 bytes (1 + 7 padding + 8)
// Windows x86-64: 8 bytes (1 + 3 padding + 4)
```

## Alignment for SIMD

SIMD (Single Instruction, Multiple Data) operations often require stricter alignment:

```c
// SSE requires 16-byte alignment
float __attribute__((aligned(16))) vector[4];

// AVX requires 32-byte alignment
float __attribute__((aligned(32))) avx_vector[8];
```

Misaligned SIMD access either crashes or falls back to slow scalar operations.

## Structure Padding in Practice

### Network Protocol Headers

```c
// IP header (must match network byte layout)
struct __attribute__((packed)) IPHeader {
    uint8_t version_ihl;
    uint8_t tos;
    uint16_t total_length;
    uint16_t identification;
    uint16_t flags_fragment;
    uint8_t ttl;
    uint8_t protocol;
    uint16_t checksum;
    uint32_t src_addr;
    uint32_t dst_addr;
};
// Exactly 20 bytes, matching the IP specification
```

### Binary File Formats

```c
struct __attribute__((packed)) BMPHeader {
    uint16_t magic;        // 'BM'
    uint32_t file_size;
    uint16_t reserved1;
    uint16_t reserved2;
    uint32_t data_offset;
};
```

### Cache Line Optimization

```c
// Pad to cache line size (64 bytes) to avoid false sharing
struct __attribute__((aligned(64))) ThreadData {
    int counter;
    char padding[60];  // Fill to 64 bytes
};
```

## Inspecting Structure Layout

```c
#include <stdio.h>
#include <stddef.h>

struct Example {
    char a;
    int b;
    char c;
};

int main() {
    printf("Size: %zu\n", sizeof(struct Example));
    printf("a offset: %zu\n", offsetof(struct Example, a));
    printf("b offset: %zu\n", offsetof(struct Example, b));
    printf("c offset: %zu\n", offsetof(struct Example, c));
    return 0;
}
```

Output:
```
Size: 12
a offset: 0
b offset: 4
c offset: 8
```

## Key Takeaways

- **Alignment** requirements mean data should sit at addresses divisible by their size.
- **Padding** bytes are inserted by the compiler to maintain alignment—structures are often larger than the sum of their members.
- **Member ordering** affects structure size; order from largest to smallest for efficiency.
- **Packed structures** eliminate padding but may cause performance penalties or crashes.
- **Bit fields** pack sub-byte data but have implementation-defined layout.
- **Unions** overlay members at the same address; size equals the largest member.
- **Platform differences** mean identical code can produce different layouts—use fixed-width types for portability.
- **SIMD operations** require stricter alignment (16 or 32 bytes).
- Use `sizeof` and `offsetof` to inspect actual layout—never assume.
- Understanding alignment is essential for systems programming, binary formats, and performance optimization.

