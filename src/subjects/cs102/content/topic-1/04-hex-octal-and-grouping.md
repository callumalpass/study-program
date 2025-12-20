---
id: cs102-t1-hex-octal-and-grouping
title: "Hex, Octal, and Bit Grouping"
order: 4
---

# Hex, Octal, and Bit Grouping

Hex and octal are compact ways to write binary. Their power lies in the mathematical relationship between their bases and base 2: they map to fixed-size bit groups, making conversion trivial and mental arithmetic practical.

- **Octal (base 8)**: 1 digit ↔ **3 bits** (because 8 = 2³)
- **Hex (base 16)**: 1 digit ↔ **4 bits** (because 16 = 2⁴)

This property makes these bases invaluable for systems programming, where you constantly work with binary data but need a human-readable representation.

## Why Bit Grouping Works

The mathematical foundation is simple: when one base is a power of another, digits in the larger base map directly to groups of digits in the smaller base.

Since 8 = 2³, each octal digit represents exactly 3 binary digits.
Since 16 = 2⁴, each hex digit represents exactly 4 binary digits.

This isn't just a convenient property—it's the reason these bases exist in computing. Engineers specifically chose octal and hexadecimal because they compress binary into a form that's both compact and losslessly convertible.

Compare this to decimal (base 10): there's no clean relationship between 10 and 2. Converting between binary and decimal requires arithmetic, not just regrouping. That's why decimal is rarely used in low-level computing contexts.

## Octal Grouping (3 Bits per Digit)

### Conversion: Binary → Octal

**Method**:
1. Starting from the right, group binary digits into sets of 3
2. Pad with leading zeros if the leftmost group is incomplete
3. Convert each 3-bit group to its octal digit (0-7)

**Example 1**: Convert `110101001₂` to octal

```
Original:    110 101 001
Octal:         6   5   1

Result: 651₈
```

Let's verify each group:
- `110₂ = 4 + 2 + 0 = 6`
- `101₂ = 4 + 0 + 1 = 5`
- `001₂ = 0 + 0 + 1 = 1`

**Example 2**: Convert `1011101₂` to octal

```
Original:    1 011 101
Pad left:  001 011 101
Octal:       1   3   5

Result: 135₈
```

### Conversion: Octal → Binary

**Method**: Convert each octal digit to its 3-bit binary equivalent.

**Example**: Convert `752₈` to binary

```
7 = 111
5 = 101
2 = 010

Result: 111101010₂
```

### The 3-Bit Octal Table

```
Octal  Binary
  0     000
  1     001
  2     010
  3     011
  4     100
  5     101
  6     110
  7     111
```

This table is easy to memorize because it's simply counting from 0 to 7 in binary.

## Where Octal Appears Today

Octal was more common in early computing when computer word sizes were multiples of 3 bits (12-bit, 18-bit, 24-bit, 36-bit architectures). The PDP-10, a famous 1960s computer, used 36-bit words, which divide evenly into 12 octal digits.

Today, octal appears mainly in:

**Unix/Linux File Permissions**: The classic `chmod 755` command uses octal. Each digit represents permissions for owner, group, and others:

```
7₈ = 111₂ = rwx (read + write + execute)
5₈ = 101₂ = r-x (read + execute)
5₈ = 101₂ = r-x (read + execute)
```

So `chmod 755` means: owner can read/write/execute, group and others can read/execute.

**C Language Octal Literals**: A leading zero indicates octal in C/C++:

```c
int x = 010;  // This is octal 10 = decimal 8, NOT ten!
int y = 0755; // Octal 755 = decimal 493
```

This is a notorious source of bugs. If you accidentally write `int month = 09;`, it's a syntax error because 9 isn't a valid octal digit!

**Escape Sequences**: Some escape sequences use octal:

```c
char newline = '\012';  // Octal 12 = decimal 10 = newline character
```

## Hexadecimal Grouping (4 Bits per Digit)

### Conversion: Binary → Hex

**Method**:
1. Starting from the right, group binary digits into sets of 4 (nibbles)
2. Pad with leading zeros if the leftmost group is incomplete
3. Convert each 4-bit group to its hex digit (0-F)

**Example 1**: Convert `1110010110010011₂` to hex

```
Original:  1110 0101 1001 0011
Hex:          E    5    9    3

Result: E593₁₆
```

**Example 2**: Convert `101011₂` to hex

```
Original:       10 1011
Pad left:    0010 1011
Hex:            2    B

Result: 2B₁₆
```

### Conversion: Hex → Binary

**Method**: Convert each hex digit to its 4-bit binary equivalent.

**Example**: Convert `DEADBEEF₁₆` to binary

```
D = 1101
E = 1110
A = 1010
D = 1101
B = 1011
E = 1110
E = 1110
F = 1111

Result: 11011110101011011011111011101111₂
```

### The 4-Bit Hex Table

```
Hex  Binary  Decimal     Hex  Binary  Decimal
 0    0000      0         8    1000      8
 1    0001      1         9    1001      9
 2    0010      2         A    1010     10
 3    0011      3         B    1011     11
 4    0100      4         C    1100     12
 5    0101      5         D    1101     13
 6    0110      6         E    1110     14
 7    0111      7         F    1111     15
```

**Memory aids**:
- 0-7 are the same as octal—just add a leading 0 bit
- 8-F all start with a 1 bit
- A (10) = 1010 is alternating
- F (15) = 1111 is all ones
- 5 = 0101 is also alternating (complement of A)

## Why Hex Dominates Modern Systems

Hexadecimal has become the standard for several reasons:

**Byte Alignment**: Modern computers are byte-oriented (8-bit bytes), and 8 bits = 2 hex digits. This means:
- 1 byte = 2 hex digits (00 to FF)
- 2 bytes (16 bits) = 4 hex digits (0000 to FFFF)
- 4 bytes (32 bits) = 8 hex digits (00000000 to FFFFFFFF)
- 8 bytes (64 bits) = 16 hex digits

When you see a memory address like `0x7ffeefbff5c0`, you know immediately it's a 48-bit (6-byte) address because it has 12 hex digits.

**Compact Representation**: Hex is 4× shorter than binary. The value `11011110101011011011111011101111₂` becomes just `DEADBEEF₁₆`.

**Bit Visibility**: Unlike decimal, hex preserves the bit structure. You can instantly see which nibbles (and therefore roughly which bits) are set without calculation.

**Memory Dumps**: Debuggers and hex editors display data in hex because it aligns perfectly with byte boundaries:

```
Address     Hex Dump                                      ASCII
0x1000:     48 65 6C 6C 6F 20 57 6F 72 6C 64 00          Hello World.
```

**Colors and Bitmasks**: CSS colors like `#FF5733` are hex. Each pair represents one byte (red, green, blue):
- FF = 255 (full red)
- 57 = 87 (some green)
- 33 = 51 (little blue)

**Assembly Language**: Machine code is typically displayed in hex. When debugging, you'll see instructions like:

```
0x48 0x89 0xE5    ; mov rbp, rsp
0xB8 0x01 0x00    ; mov eax, 1
```

## Hex Arithmetic Tips

Once comfortable with hex, you can do simple arithmetic directly:

**Counting**: After F comes 10 (sixteen), after 1F comes 20, after FF comes 100.

**Adding small values**:
- `0x3A + 0x05 = 0x3F` (A=10, 10+5=15=F)
- `0x3F + 0x01 = 0x40` (F+1 carries)

**Subtracting**:
- `0x40 - 0x01 = 0x3F`
- `0x100 - 0x01 = 0xFF`

**Recognizing powers of 2**:
- `0x100 = 256 = 2⁸`
- `0x1000 = 4096 = 2¹²`
- `0x10000 = 65536 = 2¹⁶`

## Key Takeaways

- **Octal** groups bits in 3s (8 = 2³); **hex** groups bits in 4s (16 = 2⁴).
- 1 byte = 8 bits = **2 hex digits** exactly.
- Hex is the modern standard because it aligns with byte-oriented architectures.
- Octal appears mainly in Unix permissions and legacy contexts.
- Memorize the nibble-to-hex table for instant conversion.
- Hex preserves bit structure while being 4× more compact than binary—this is why systems programmers prefer it.

