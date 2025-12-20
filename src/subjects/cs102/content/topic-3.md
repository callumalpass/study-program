## Introduction

We can store integers, but what about the rest of the world? Real-world software deals with text, decimals, images, and sound. This topic explains how we encode these complex types of data into the universal language of bits.

**Why This Matters:**
Understanding data representation explains why `0.1 + 0.2 != 0.3` in most programming languages, why text files sometimes show garbled characters, and how images and audio are digitized. This knowledge is essential for debugging encoding issues and making informed decisions about data types.

**Learning Objectives:**
- Explain how non-integer data is stored in binary
- Understand the IEEE-754 standard for floating-point numbers
- Differentiate between ASCII and Unicode/UTF-8
- Understand Big-Endian vs Little-Endian byte ordering
- Recognize the limits of precision in floating-point math

---

## Core Concepts

### Floating Point (IEEE 754)

Storing decimals (like 3.14) is tricky. We use "scientific notation for binary."

**The idea:** $1.5 = 1.1_2 \times 2^0$ and $6.0 = 1.1_2 \times 2^2$

**32-bit Float Structure:**

| Sign | Exponent | Mantissa (Fraction) |
|------|----------|---------------------|
| 1 bit | 8 bits | 23 bits |

$$\text{Value} = (-1)^S \times 1.M \times 2^{E-127}$$

Where:
- **S** = Sign bit (0 for positive, 1 for negative)
- **E** = Exponent (biased by 127)
- **M** = Mantissa (the "1." is implicit)

**Example: Representing 6.5**
1. Convert to binary: $6.5 = 110.1_2$
2. Normalize: $1.101 \times 2^2$
3. Sign = 0 (positive)
4. Exponent = 2 + 127 = 129 = $10000001_2$
5. Mantissa = 101 (followed by zeros)
6. Result: `0 10000001 10100000000000000000000`

### The Floating Point Precision Problem

**Critical insight:** Floats are approximations, not exact values!

```python
>>> 0.1 + 0.2
0.30000000000000004

>>> 0.1 + 0.2 == 0.3
False
```

Why? Because 0.1 in binary is a repeating fraction (like 1/3 = 0.333... in decimal). It cannot be stored exactly in a finite number of bits.

**Special Values:**
- **Infinity:** When exponent is all 1s, mantissa all 0s
- **NaN (Not a Number):** When exponent is all 1s, mantissa non-zero
- **Zero:** When exponent and mantissa are all 0s (there's +0 and -0!)

### Text Encoding

**ASCII (American Standard Code for Information Interchange):**
- 7 bits per character (128 possible characters)
- Covers English letters, numbers, and basic symbols
- Key values to know:
  - 'A' = 65, 'Z' = 90
  - 'a' = 97, 'z' = 122
  - '0' = 48, '9' = 57
  - Space = 32, Newline = 10

```python
>>> ord('A')
65
>>> chr(65)
'A'
>>> ord('a') - ord('A')
32  # Lowercase is always +32 from uppercase
```

**Unicode & UTF-8 (The Modern Standard):**

ASCII only covers English. Unicode is a giant catalog of every character in human languages, emojis, and symbols—each assigned a unique "code point" (e.g., U+1F600).

**UTF-8** is the most common way to store Unicode:
- ASCII characters (U+0000 to U+007F): 1 byte
- Most European/Middle Eastern: 2 bytes
- Asian characters: 3 bytes
- Emojis and rare symbols: 4 bytes

**Why UTF-8 is clever:**
- Backward compatible with ASCII
- Self-synchronizing (you can find character boundaries)
- No byte-order issues

```python
>>> len("Hello")
5
>>> len("Hello".encode('utf-8'))
5  # Same - ASCII chars are 1 byte each
>>> "World".encode('utf-8')
b'World'
```

### Endianness

When storing a multi-byte number in memory, which byte comes first?

**Big Endian:** Most significant byte at lowest address (like reading left-to-right).

**Little Endian:** Least significant byte at lowest address (used by x86/Intel CPUs).

**Example: The number `0x12345678`**

| Address | Big Endian | Little Endian |
|---------|------------|---------------|
| 0x00 | 12 | 78 |
| 0x01 | 34 | 56 |
| 0x02 | 56 | 34 |
| 0x03 | 78 | 12 |

**Mnemonic:** "Big end first" vs "Little end first" (from Gulliver's Travels!)

---

## Common Patterns and Idioms

### The Null Terminator
In C and many low-level formats, strings end with a byte of value 0 (`\0`). This marks the end of the text.

```c
char name[] = "Hi";  // Actually stored as: 'H', 'i', '\0'
```

### Magic Numbers (File Signatures)
File formats often start with specific bytes to identify them:

| Format | Magic Bytes | ASCII |
|--------|-------------|-------|
| JPEG | `FF D8 FF` | (non-printable) |
| PNG | `89 50 4E 47` | .PNG |
| PDF | `25 50 44 46` | %PDF |
| ZIP | `50 4B 03 04` | PK.. |

### BOM (Byte Order Mark)
UTF-16 files may start with a BOM to indicate endianness:
- `FE FF` = Big Endian
- `FF FE` = Little Endian

UTF-8 doesn't need a BOM, but Windows sometimes adds one (`EF BB BF`).

---

## Common Mistakes and Pitfalls

### Mistake 1: Using Floats for Money
Never use floats for currency! The tiny precision errors accumulate.

```python
# Wrong
balance = 0.10 + 0.20  # 0.30000000000000004

# Right - use integers (cents) or Decimal
from decimal import Decimal
balance = Decimal('0.10') + Decimal('0.20')  # Decimal('0.30')
```

### Mistake 2: Comparing Floats for Equality
```python
# Wrong
if result == 0.3:
    ...

# Right - check if "close enough"
if abs(result - 0.3) < 1e-9:
    ...
```

### Mistake 3: Assuming ASCII
```python
# This might fail with non-ASCII input
name.encode('ascii')  # UnicodeEncodeError for non-English chars

# Better - always use UTF-8
name.encode('utf-8')
```

### Mistake 4: Byte Order Confusion
Reading binary data from a file or network? Check the endianness! Network protocols typically use Big Endian ("network byte order"), while your PC likely uses Little Endian.

```python
import struct
data = b'\x00\x00\x01\x00'
struct.unpack('>I', data)  # Big endian: 256
struct.unpack('<I', data)  # Little endian: 65536
```

---

## Best Practices

1. **Always use UTF-8:** Unless you have a specific reason not to, default to UTF-8 for all text.

2. **Specify encoding explicitly:**
   ```python
   with open('file.txt', 'r', encoding='utf-8') as f:
       ...
   ```

3. **Use epsilon for float comparison:**
   ```python
   def float_equals(a, b, epsilon=1e-9):
       return abs(a - b) < epsilon
   ```

4. **Know your limits:**
   - 32-bit float: ~7 decimal digits of precision
   - 64-bit double: ~15 decimal digits of precision
   - For exact decimals, use `decimal.Decimal`

5. **Use appropriate types:**
   - Money: integers (cents) or `Decimal`
   - Scientific calculations: `float` or `numpy.float64`
   - Text: always UTF-8

---

## Real-World Applications

**Why Images Have Color Banding:**
8 bits per color channel = 256 levels. In smooth gradients, you can sometimes see the discrete steps.

**Database Encoding Issues:**
Ever seen "Ã©" instead of "é"? That's UTF-8 data being interpreted as Latin-1. Always ensure your database, application, and connection all agree on encoding.

**Network Programming:**
```python
# Always convert to network byte order for protocols
import socket
socket.htonl(256)  # Host to network long: 0x00000100 → 0x00010000
```

---

## Further Exploration

- **Color Depth:** How RGB(255, 128, 0) is stored as 24 bits (or 32 with alpha channel).
- **Audio Sampling:** Nyquist theorem and why CDs use 44.1kHz.
- **Compression:** Lossy (JPEG, MP3) vs Lossless (PNG, FLAC).
- **Fixed-Point Arithmetic:** An alternative to floating point used in embedded systems and financial calculations.
