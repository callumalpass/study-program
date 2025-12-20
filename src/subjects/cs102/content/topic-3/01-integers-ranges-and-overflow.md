# Integers: Ranges, Signedness, and Overflow

An integer in a computer is fundamentally different from a mathematical integer. In mathematics, integers extend infinitely in both directions. In a computer, an integer is a **fixed-width bit pattern** with a finite range of representable values. Understanding this distinction is essential for writing correct code, debugging unexpected behavior, and avoiding security vulnerabilities.

## Fixed Width and Ranges

With **N bits**, you have exactly **2^N** distinct bit patterns. These patterns can be interpreted as either unsigned or signed integers, giving different ranges.

### Unsigned Integers

Unsigned integers represent only non-negative values. All bit patterns from all zeros to all ones map to values from 0 to the maximum:

**Range**: `0` to `2^N - 1`

| Bits | Minimum | Maximum | Total Values |
|------|---------|---------|--------------|
| 8 | 0 | 255 | 256 |
| 16 | 0 | 65,535 | 65,536 |
| 32 | 0 | 4,294,967,295 | ~4.3 billion |
| 64 | 0 | 18,446,744,073,709,551,615 | ~18 quintillion |

The pattern is simple: `2^N` distinct patterns, all interpreted as non-negative.

### Signed Integers (Two's Complement)

Signed two's complement integers split the bit patterns between negative and non-negative values:

**Range**: `-2^(N-1)` to `2^(N-1) - 1`

| Bits | Minimum | Maximum | Total Values |
|------|---------|---------|--------------|
| 8 | -128 | 127 | 256 |
| 16 | -32,768 | 32,767 | 65,536 |
| 32 | -2,147,483,648 | 2,147,483,647 | ~4.3 billion |
| 64 | -9,223,372,036,854,775,808 | 9,223,372,036,854,775,807 | ~18 quintillion |

Notice the asymmetry: there's one more negative value than positive. This is because zero takes one of the non-negative slots.

### Why These Specific Ranges?

For N-bit two's complement:
- Half the patterns (those with MSB = 1) represent negative numbers: -2^(N-1) to -1
- Half the patterns (those with MSB = 0) represent non-negative numbers: 0 to 2^(N-1) - 1

The most negative value (-2^(N-1)) has no positive counterpart because zero occupies one pattern.

## Same Bits, Different Meaning

The **same bit pattern** can represent different values depending on whether it's interpreted as signed or unsigned:

| 8-bit Pattern | Unsigned Value | Signed Value |
|---------------|----------------|--------------|
| 00000000 | 0 | 0 |
| 00000001 | 1 | 1 |
| 01111111 | 127 | 127 |
| 10000000 | 128 | -128 |
| 10000001 | 129 | -127 |
| 11111110 | 254 | -2 |
| 11111111 | 255 | -1 |

**Key insight**: For patterns with MSB = 0, unsigned and signed interpretations agree. For patterns with MSB = 1, they differ by 2^N.

If you see `11111111` in a debugger, is it 255 or -1? The bits don't tell you—you need to know the **type**.

## Integer Overflow: A Fact of Fixed Width

Overflow occurs when an arithmetic operation produces a result outside the representable range. Since hardware can only store N bits, the mathematical result is **truncated** to fit.

### Unsigned Overflow (Wraparound)

For unsigned integers, overflow means the result exceeds 2^N - 1. The hardware keeps only the low N bits, which is equivalent to computing the result modulo 2^N.

**Example (8-bit unsigned)**:
```
255 + 1 = 256
But 256 mod 256 = 0
Stored result: 0
```

```
200 + 100 = 300
But 300 mod 256 = 44
Stored result: 44
```

This wraparound behavior is well-defined and sometimes intentional (e.g., for cyclic counters or hash functions).

### Signed Overflow (Undefined in C!)

For signed integers in two's complement, overflow occurs when:
- Adding two positive values produces a negative result
- Adding two negative values produces a positive result

**Example (8-bit signed)**:
```
127 + 1 = 128 (mathematically)
But 128 > 127 (max 8-bit signed)
Stored pattern: 10000000 = -128 (signed interpretation)
```

**Critical warning**: In C and C++, signed integer overflow is **undefined behavior**. The compiler is allowed to assume it never happens, which can lead to surprising optimizations:

```c
// The compiler might optimize this to always return 1
int is_positive(int x) {
    return x + 1 > x;  // "Obviously" true... unless overflow
}
```

Other languages handle signed overflow differently:
- Java: Wraparound (defined behavior)
- Python: Arbitrary precision (no overflow)
- Rust: Panic in debug mode, wraparound in release (configurable)

## Common Integer Types and Sizes

Different platforms and languages use different sizes for integer types. Here are common conventions:

### C/C++ (sizes can vary by platform!)

| Type | Typical Size | Typical Range (signed) |
|------|--------------|------------------------|
| char | 8 bits | -128 to 127 |
| short | 16 bits | -32,768 to 32,767 |
| int | 32 bits | -2.1B to 2.1B |
| long | 32 or 64 bits | Platform-dependent |
| long long | 64 bits | -9.2×10^18 to 9.2×10^18 |

For portable code, use fixed-width types from `<stdint.h>`: `int8_t`, `int16_t`, `int32_t`, `int64_t` (and unsigned variants `uint8_t`, etc.).

### Java (sizes are guaranteed)

| Type | Size | Range |
|------|------|-------|
| byte | 8 bits | -128 to 127 |
| short | 16 bits | -32,768 to 32,767 |
| int | 32 bits | -2.1B to 2.1B |
| long | 64 bits | -9.2×10^18 to 9.2×10^18 |

Java has no unsigned integer types (except char, which is unsigned 16-bit).

## Practical Debugging Patterns

### Unexpected Negative Values

If a value that should be positive appears negative, check:
- Are you interpreting an unsigned result as signed?
- Did the value overflow the positive range?

**Example**: You read a byte (0-255) into a signed char. Value 200 becomes -56.

### Masking to Force Width

To extract the low N bits and treat them as unsigned, use bitwise AND:

```c
int32_t x = some_value;
uint8_t low_byte = x & 0xFF;       // Low 8 bits
uint16_t low_word = x & 0xFFFF;    // Low 16 bits
```

This is essential when dealing with mixed-width operations or extracting fields from packed data.

### Detecting Overflow

**For unsigned addition** (wraps around):
```c
// Overflow occurred if result < either operand
uint32_t a, b, sum = a + b;
if (sum < a) {
    // Overflow!
}
```

**For signed addition** (undefined in C, but common pattern):
```c
// Check before adding
if (a > 0 && b > INT_MAX - a) {
    // Would overflow positive
}
if (a < 0 && b < INT_MIN - a) {
    // Would overflow negative
}
```

## Security Implications

Integer overflow has caused serious security vulnerabilities:

**Buffer overflow via integer overflow**: If a size calculation overflows, a small buffer might be allocated for large data:

```c
size_t size = count * element_size;  // Might overflow!
void *buf = malloc(size);            // Allocates small buffer
memcpy(buf, data, count * element_size);  // Overflows buffer
```

**Sign confusion**: Mixing signed and unsigned comparisons can bypass checks:

```c
int length = attacker_controlled;  // Could be negative
if (length > MAX_SIZE) return;     // Negative passes this check!
// length implicitly converted to unsigned for array access
```

Understanding integer representation is therefore not just academic—it's essential for writing secure code.

## Key Takeaways

- Computer integers are **fixed-width bit patterns** with limited ranges, unlike mathematical integers.
- **Signedness** changes interpretation without changing bits: `11111111` is 255 unsigned or -1 signed.
- **Unsigned overflow** wraps around (modular arithmetic); **signed overflow** is undefined in C.
- Always know your **type widths and ranges** when reasoning about correctness.
- Use **fixed-width types** (`int32_t`, `uint64_t`) for portable code.
- **Masking** with `& 0xFF` etc. forces a specific bit width.
- Integer overflow is a major source of **security vulnerabilities**—validate arithmetic on untrusted input.

