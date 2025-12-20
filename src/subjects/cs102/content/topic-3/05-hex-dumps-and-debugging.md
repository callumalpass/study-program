# Interpreting Hex Dumps and Debugging Memory

Hex dumps are a fundamental tool for understanding what's actually in memory. Whether you're debugging a crash, reverse-engineering a file format, or analyzing network traffic, the ability to read raw bytes and interpret them correctly is essential. This subtopic combines everything from earlier—number systems, endianness, data types—into a practical debugging workflow.

## What Is a Hex Dump?

A hex dump displays memory contents as hexadecimal bytes, typically with address offsets and sometimes an ASCII representation. Here's a typical format:

```
Address   Hex bytes                                      ASCII
00000000  48 65 6C 6C 6F 2C 20 57 6F 72 6C 64 21 00 00 00  Hello, World!...
00000010  78 56 34 12 FF FF FF FF 00 00 00 00 41 42 43 44  xV4.........ABCD
00000020  01 00 00 00 02 00 00 00 03 00 00 00 04 00 00 00  ................
```

Each line shows:
- **Address**: Offset from the start (in hex)
- **Hex bytes**: 16 bytes displayed as hex pairs
- **ASCII**: Printable characters; unprintable shown as `.`

## Tools for Creating Hex Dumps

### Command Line

```bash
# Linux/macOS
hexdump -C file.bin
xxd file.bin
od -A x -t x1z file.bin

# Show first 64 bytes
xxd -l 64 file.bin
```

### In Debuggers

```gdb
(gdb) x/32xb 0x7fffffffde00    # 32 bytes as hex
(gdb) x/8xw 0x7fffffffde00     # 8 words (32-bit) as hex
(gdb) x/4xg 0x7fffffffde00     # 4 giant words (64-bit) as hex
```

### Programming Languages

```python
# Python
data = open('file.bin', 'rb').read()
print(data.hex())
print(' '.join(f'{b:02X}' for b in data[:32]))
```

```c
// C
void hex_dump(void *ptr, size_t len) {
    unsigned char *p = ptr;
    for (size_t i = 0; i < len; i++) {
        printf("%02X ", p[i]);
        if ((i + 1) % 16 == 0) printf("\n");
    }
}
```

## The Interpretation Process

Raw bytes are meaningless until interpreted. The same bytes can represent entirely different values depending on how you read them.

### Step 1: Identify the Data Type

Ask yourself: What type of data am I looking at?
- Integers (how many bytes? signed or unsigned?)
- Floating-point values
- Strings (what encoding? null-terminated?)
- Structures (what's the layout?)
- Raw binary data

### Step 2: Determine Endianness

For multi-byte values, you must know the byte order:
- **Little endian** (x86, ARM): LSB at lowest address
- **Big endian** (network, some file formats): MSB at lowest address

### Step 3: Apply the Interpretation

Group the bytes according to the data type size, apply endianness, and convert.

## Worked Example: Interpreting a Memory Dump

Given this hex dump from a little-endian system:

```
0000: 78 56 34 12 41 00 00 00 00 00 80 3F CD CC 4C 3E
```

### As 32-bit Integers (Little Endian)

Group into 4-byte chunks and reverse for little endian:

```
Bytes 0-3: 78 56 34 12 → 0x12345678 = 305,419,896
Bytes 4-7: 41 00 00 00 → 0x00000041 = 65 = ASCII 'A'
Bytes 8-11: 00 00 80 3F → 0x3F800000
Bytes 12-15: CD CC 4C 3E → 0x3E4CCCCD
```

### As 32-bit Floats (Little Endian)

Using IEEE-754 interpretation:

```
0x3F800000 = 1.0f
0x3E4CCCCD ≈ 0.2f
```

### As Characters (ASCII)

```
78 = 'x'
56 = 'V'
34 = '4'
12 = (control char)
41 = 'A'
00 = NUL (string terminator)
...
```

The interpretation depends entirely on what the data represents!

## Common Patterns to Recognize

### All Zeros

```
00 00 00 00 00 00 00 00
```
- Null pointer
- Uninitialized memory (sometimes)
- Zero-initialized data
- Padding bytes

### All F's (0xFF)

```
FF FF FF FF
```
- -1 as signed integer
- Maximum unsigned value
- Uninitialized memory (common fill pattern)
- Erased flash memory

### Repeating Pattern

```
DE AD BE EF DE AD BE EF
```
- Debug fill pattern (memory allocator markers)
- Common values: `0xDEADBEEF`, `0xCAFEBABE`, `0xFEEDFACE`

### ASCII Text

```
48 65 6C 6C 6F
```
- Readable as "Hello"
- Values in range 0x20-0x7E are printable ASCII
- 0x00 often terminates strings

### Pointers

```
60 F5 BF EF FE 7F 00 00
```
On 64-bit little-endian: `0x00007FFEEFBFF560`
- Looks like a stack address
- High bytes often `0x00007F...` for user-space Linux addresses

## Debugging Workflow

### 1. Establish Context

Before looking at bytes, know:
- What program/system produced this?
- What architecture? (32/64-bit, endianness)
- What data structure should be here?
- What operation just happened?

### 2. Find Reference Points

Look for recognizable patterns:
- String literals (ASCII text)
- Magic numbers (file signatures like `89 50 4E 47` for PNG)
- Known values (return addresses, vtable pointers)
- Pattern boundaries (sequences of zeros, repeated values)

### 3. Work Outward

From known values, decode adjacent data:
- If you find a string, the preceding bytes might be its length
- If you find a pointer, what does it point to?
- If you find a structure, what are the field offsets?

### 4. Validate Interpretations

Cross-check your interpretation:
- Does the decoded value make sense?
- Do adjacent values form a coherent structure?
- Can you verify against source code or documentation?

## File Format Analysis

Many bugs involve misinterpreting file data. Here's how to analyze a binary file:

### Example: PNG File Header

```
00000000: 89 50 4E 47 0D 0A 1A 0A 00 00 00 0D 49 48 44 52
00000010: 00 00 01 00 00 00 01 00 08 02 00 00 00 D3 10 3F
```

Analysis:
- `89 50 4E 47 0D 0A 1A 0A`: PNG signature (magic number)
- `00 00 00 0D`: Chunk length = 13 (big endian!)
- `49 48 44 52`: Chunk type = "IHDR"
- `00 00 01 00`: Width = 256 (big endian)
- `00 00 01 00`: Height = 256 (big endian)
- And so on...

PNG uses big endian, unlike most desktop data!

## Common Debugging Scenarios

### Stack Corruption

Look for:
- Overwritten return addresses
- Canary values (0xCC, stack cookies) that are corrupted
- Out-of-bounds data overwriting saved registers

### Heap Corruption

Look for:
- Corrupted heap metadata (sizes, next/prev pointers)
- Writes past allocated bounds
- Use-after-free (freed memory with unexpected content)

### Type Confusion

The same bytes interpreted differently:
- Integer read as pointer → crash
- Float read as integer → bizarre value
- Signed/unsigned mismatch → negative values becoming huge positives

### Uninitialized Data

Patterns that suggest uninitialized memory:
- `0xCC` bytes (MSVC debug fill for stack)
- `0xCD` bytes (MSVC debug fill for heap)
- `0xDD` bytes (MSVC debug fill for freed memory)
- Random-looking values with no pattern

## Quick Reference: Interpretation Checklist

Before interpreting any hex dump:

1. **What's the byte width?** 1, 2, 4, 8 bytes?
2. **What's the endianness?** Little or big?
3. **Signed or unsigned?** For integers
4. **What type?** Integer, float, pointer, string, struct?
5. **What encoding?** For strings: ASCII, UTF-8, UTF-16?
6. **What's the expected range?** Sanity check your result

### Conversion Quick Reference

For little-endian 32-bit integer from bytes `A B C D`:
```
Value = D×2²⁴ + C×2¹⁶ + B×2⁸ + A
      = 0xDCBA
```

For big-endian 32-bit integer from bytes `A B C D`:
```
Value = A×2²⁴ + B×2¹⁶ + C×2⁸ + D
      = 0xABCD
```

## Key Takeaways

- Hex dumps show **raw bytes**; meaning comes from **type + endianness + context**.
- Always establish **what type of data** you're looking at before interpreting.
- **Little endian** reverses byte order for multi-byte values; **big endian** preserves it.
- Recognize **common patterns**: zeros, 0xFF, debug fill values, ASCII ranges.
- Many bugs reduce to **wrong interpretation of bits**—same bytes, wrong type assumption.
- A **systematic checklist** (width, endianness, signedness, type) prevents interpretation errors.
- **Cross-reference** with source code, documentation, or known values to validate your interpretation.
- Master this skill—it's essential for debugging crashes, analyzing protocols, and understanding low-level behavior.

