# Data Types and Representation in ISA

The **data types** supported by an ISA determine what kinds of values the processor can manipulate directly in hardware. Understanding these types and how they're represented in binary is essential for writing efficient low-level code and understanding compiler behavior.

## Fundamental Data Types

Most ISAs support a standard set of data types:

### Integer Types

| Type | Size | Range (Signed) | Range (Unsigned) |
|------|------|----------------|------------------|
| Byte | 8 bits | -128 to 127 | 0 to 255 |
| Half-word | 16 bits | -32,768 to 32,767 | 0 to 65,535 |
| Word | 32 bits | -2³¹ to 2³¹-1 | 0 to 2³²-1 |
| Double-word | 64 bits | -2⁶³ to 2⁶³-1 | 0 to 2⁶⁴-1 |

**Note**: "Word" size varies by architecture. In MIPS and ARM32, a word is 32 bits. In x86-64, historical terminology can be confusing (word=16 bits, dword=32 bits, qword=64 bits).

### Floating-Point Types

| Type | Size | Precision | Range |
|------|------|-----------|-------|
| Single | 32 bits | ~7 decimal digits | ±1.18×10⁻³⁸ to ±3.4×10³⁸ |
| Double | 64 bits | ~16 decimal digits | ±2.23×10⁻³⁰⁸ to ±1.8×10³⁰⁸ |
| Extended | 80 bits | ~19 decimal digits | Even larger range |

Floating-point is covered by the IEEE 754 standard, which defines formats, special values (NaN, infinity), and rounding modes.

## Integer Representation

### Unsigned Integers

Unsigned integers use standard binary representation:

```
Decimal 42 in 8 bits:  00101010
                       32+8+2 = 42
```

The value is simply the sum of powers of 2 for each bit position.

### Signed Integers: Two's Complement

Modern computers universally use **two's complement** for signed integers:

```
Positive 42:   00101010  (same as unsigned)
Negative -42:  11010110  (flip bits, add 1)
```

**Properties of two's complement**:
- Most significant bit (MSB) is the sign bit (0=positive, 1=negative)
- Zero has a unique representation (00000000)
- Addition and subtraction work the same for signed and unsigned
- Range is asymmetric: -128 to 127 for 8 bits

**Converting to negative**:
```
Start with 42:      00101010
Flip all bits:      11010101
Add 1:              11010110  = -42
```

### Sign Extension

When loading a smaller value into a larger register, sign extension preserves the value:

```
8-bit -5:    11111011
32-bit -5:   11111111111111111111111111111011
```

The sign bit is replicated to fill the upper bits.

**Instructions**:
- `LB` (Load Byte): Sign-extends to register width
- `LBU` (Load Byte Unsigned): Zero-extends to register width

## Floating-Point Representation (IEEE 754)

### Single Precision (32-bit)

```
┌─────────┬──────────────┬───────────────────────────┐
│  Sign   │   Exponent   │         Mantissa          │
│  1 bit  │    8 bits    │          23 bits          │
└─────────┴──────────────┴───────────────────────────┘
```

**Value** = (-1)^sign × 1.mantissa × 2^(exponent-127)

**Example**: Representing 6.5
```
6.5 in binary: 110.1 = 1.101 × 2²
Sign: 0 (positive)
Exponent: 2 + 127 = 129 = 10000001
Mantissa: 10100000000000000000000 (implicit leading 1)

Result: 0 10000001 10100000000000000000000 = 0x40D00000
```

### Double Precision (64-bit)

```
┌─────────┬──────────────┬─────────────────────────────────────────────┐
│  Sign   │   Exponent   │                  Mantissa                   │
│  1 bit  │   11 bits    │                   52 bits                   │
└─────────┴──────────────┴─────────────────────────────────────────────┘
```

### Special Values

| Pattern | Meaning |
|---------|---------|
| Exponent=0, Mantissa=0 | Zero (±0) |
| Exponent=0, Mantissa≠0 | Denormalized number |
| Exponent=255, Mantissa=0 | Infinity (±∞) |
| Exponent=255, Mantissa≠0 | NaN (Not a Number) |

## Endianness

**Endianness** refers to the byte ordering of multi-byte values in memory.

### Big-Endian

Most significant byte at the lowest address. "Big end first."

```
Value 0x12345678 at address 0x1000:
Address:  0x1000  0x1001  0x1002  0x1003
Content:    12      34      56      78
```

Used by: PowerPC, SPARC, network protocols

### Little-Endian

Least significant byte at the lowest address. "Little end first."

```
Value 0x12345678 at address 0x1000:
Address:  0x1000  0x1001  0x1002  0x1003
Content:    78      56      34      12
```

Used by: x86, x86-64, ARM (configurable)

### Why It Matters

Endianness affects:
- Network communication (network byte order is big-endian)
- File formats and binary data interchange
- Memory-mapped hardware access
- Debugging (examining raw memory)

**Example problem**:
```c
uint32_t x = 0x12345678;
uint8_t *p = (uint8_t *)&x;
// On little-endian: p[0]=0x78, p[1]=0x56, ...
// On big-endian:    p[0]=0x12, p[1]=0x34, ...
```

## Alignment Requirements

Many architectures require data to be **aligned** to certain boundaries:

| Data Size | Typical Alignment |
|-----------|-------------------|
| 1 byte | Any address |
| 2 bytes | Even address (divisible by 2) |
| 4 bytes | Address divisible by 4 |
| 8 bytes | Address divisible by 8 |

### Why Alignment Matters

**Performance**: Aligned access is faster. Misaligned access may require multiple memory operations.

**Hardware requirements**: Some architectures fault on misaligned access (MIPS, older ARM).

**Example**:
```
Address 0x1000: Word access - Aligned ✓
Address 0x1001: Word access - Misaligned ✗
Address 0x1002: Half-word access - Aligned ✓
```

### Compiler Handling

Compilers automatically align data:
```c
struct Example {
    char a;      // offset 0
    // 3 bytes padding
    int b;       // offset 4 (aligned to 4)
    char c;      // offset 8
    // 3 bytes padding
};  // Total size: 12 bytes (not 6!)
```

## ISA-Specific Considerations

### MIPS
- Strict alignment requirements
- Only aligned load/store (lw/sw require 4-byte alignment)
- Big-endian or little-endian (configurable)

### x86/x86-64
- No alignment requirements (but misaligned is slower)
- Little-endian
- Complex SIMD types (128-bit, 256-bit, 512-bit)

### ARM
- Alignment requirements vary by version
- Little-endian default, big-endian supported
- Flexible support for different data sizes

## SIMD Data Types

Modern ISAs include **SIMD (Single Instruction Multiple Data)** types:

| ISA | Extension | Vector Width |
|-----|-----------|--------------|
| x86 | SSE | 128 bits |
| x86 | AVX | 256 bits |
| x86 | AVX-512 | 512 bits |
| ARM | NEON | 128 bits |
| ARM | SVE | Scalable (128-2048) |

SIMD registers can hold multiple values:
```
128-bit register can hold:
- 16 × 8-bit integers
- 8 × 16-bit integers
- 4 × 32-bit integers or floats
- 2 × 64-bit integers or doubles
```

## Key Takeaways

- ISAs define specific data types with fixed sizes
- Two's complement is universal for signed integers
- IEEE 754 standardizes floating-point representation
- Endianness affects multi-byte value storage order
- Alignment requirements impact performance and correctness
- Modern ISAs include SIMD types for parallel data processing
- Understanding data representation is essential for systems programming
