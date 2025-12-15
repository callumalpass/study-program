# Endianness and Memory Layout

When values larger than one byte are stored in memory, a choice must be made: which byte goes at the lowest address? This choice is called **endianness**, and it's one of the fundamental concepts that trips up programmers working with binary data, network protocols, and cross-platform code.

## The Endianness Problem

Consider the 32-bit hexadecimal value `0x12345678`. It consists of four bytes:
- `0x12` (most significant byte)
- `0x34`
- `0x56`
- `0x78` (least significant byte)

Memory is addressed byte-by-byte. If this value is stored at address 1000, which byte goes where?

### Big Endian ("Network Byte Order")

**Big endian** stores the **most significant byte** at the **lowest address**. The "big end" comes first.

```
Address:  1000  1001  1002  1003
Content:   12    34    56    78
```

Reading the bytes in address order gives you `12 34 56 78`, which matches the human-readable notation `0x12345678`.

Big endian is used by:
- Network protocols (hence "network byte order")
- SPARC processors (historically)
- PowerPC (in big-endian mode)
- Java class files
- Many file formats (JPEG, PNG headers)

### Little Endian ("Intel Byte Order")

**Little endian** stores the **least significant byte** at the **lowest address**. The "little end" comes first.

```
Address:  1000  1001  1002  1003
Content:   78    56    34    12
```

Reading the bytes in address order gives you `78 56 34 12`, which is "backwards" from the human-readable notation.

Little endian is used by:
- x86 and x86-64 processors (Intel, AMD)
- ARM (in default mode)
- Most desktop and server CPUs today

### Memory Diagram Comparison

For `0x12345678` at address 0x1000:

```
Big Endian:
  Address: 0x1000  0x1001  0x1002  0x1003
  Byte:      12      34      56      78
             ↑ MSB                    ↑ LSB

Little Endian:
  Address: 0x1000  0x1001  0x1002  0x1003
  Byte:      78      56      34      12
             ↑ LSB                    ↑ MSB
```

## Why Does Endianness Exist?

Both conventions have engineering trade-offs:

**Big endian advantages**:
- Matches human reading order for hex values
- Sign bit is at the lowest address (easy to check)
- Comparison can be done byte-by-byte from low address

**Little endian advantages**:
- Adding extra precision is easy (just add bytes at higher addresses)
- The address of a value doesn't change when you widen it (casting int to long)
- Incrementing the low byte doesn't require knowing the value's size

Neither is inherently "correct"—they're just different conventions that hardware designers chose.

## Practical Implications

### Reading Hex Dumps

When you see a hex dump from a little-endian system:

```
0x1000: 78 56 34 12 41 00 00 00
```

The first 4 bytes represent `0x12345678` (read in reverse order for little endian).
The next 4 bytes represent `0x00000041` = 65 = 'A'.

If you read bytes left-to-right and interpret them as `0x78563412`, you've made an endianness error.

### Binary File Formats

File formats must specify their endianness. Common conventions:
- **BMP files**: Little endian (Windows heritage)
- **PNG files**: Big endian (network byte order)
- **ELF executables**: Depends on target architecture
- **PDF files**: Mostly big endian

Some formats include a **byte order mark (BOM)** or **magic number** that indicates endianness:
```
TIFF files:
  "II" at start → Intel (little endian)
  "MM" at start → Motorola (big endian)
```

### Network Protocols

The Internet protocols (IP, TCP, UDP) use **big endian**, called "network byte order." This means:

```c
// Must convert host byte order to network byte order
uint16_t port = 8080;
uint16_t network_port = htons(port);  // host to network short

uint32_t ip = 0x7F000001;  // 127.0.0.1
uint32_t network_ip = htonl(ip);  // host to network long

// And convert back when receiving
uint16_t received = ntohs(network_port);
```

The functions `htons`, `htonl`, `ntohs`, `ntohl` handle these conversions portably.

### Cross-Platform Data Exchange

If you write binary data on one architecture and read it on another, endianness must be handled:

```c
// WRONG: Endianness-dependent
int value = 12345;
fwrite(&value, sizeof(value), 1, file);

// RIGHT: Explicit byte order
uint32_t value = 12345;
uint8_t bytes[4] = {
    (value >> 24) & 0xFF,  // Big endian: MSB first
    (value >> 16) & 0xFF,
    (value >> 8) & 0xFF,
    value & 0xFF
};
fwrite(bytes, 4, 1, file);
```

Many serialization formats (JSON, Protocol Buffers) handle this automatically.

## Endianness Does NOT Apply To...

### Bits Within a Byte

Endianness is about **byte order**, not bit order. Within a single byte, bit positions are consistent across all architectures:
- Bit 0 is the LSB (value 1)
- Bit 7 is the MSB (value 128)

### Single-Byte Values

A single byte has no endianness issue—there's only one byte to store.

### Strings (Usually)

Character strings are stored in reading order. The string "ABCD" is stored as:
```
Address:  1000  1001  1002  1003
Content:   'A'   'B'   'C'   'D'
```

This is the same regardless of CPU endianness because each character is one byte.

(Exception: UTF-16 and UTF-32 strings have endianness issues because characters are multi-byte.)

## Memory Alignment

A related concept is **alignment**—the requirement that multi-byte values be stored at addresses that are multiples of their size.

### Natural Alignment Rules

- 2-byte values (short) should be at even addresses (divisible by 2)
- 4-byte values (int) should be at addresses divisible by 4
- 8-byte values (long, double) should be at addresses divisible by 8

### Why Alignment Matters

**Performance**: Aligned accesses are faster. An unaligned 4-byte read might require two memory transactions.

**Correctness**: Some architectures (older ARM, SPARC) crash on unaligned access. Others (x86) handle it but with a performance penalty.

### Struct Padding

Compilers insert padding bytes to maintain alignment:

```c
struct Example {
    char a;      // 1 byte
    // 3 bytes padding
    int b;       // 4 bytes (aligned to 4)
    char c;      // 1 byte
    // 3 bytes padding
};
// Total size: 12 bytes, not 6!
```

This affects:
- Binary file formats (can't just read a struct from disk)
- Network protocols (must pack/unpack explicitly)
- Memory efficiency (reorder fields to minimize padding)

### Controlling Alignment

```c
// Pack struct without padding (may hurt performance)
#pragma pack(push, 1)
struct Packed {
    char a;
    int b;
    char c;
};
#pragma pack(pop)
// Size: 6 bytes
```

## Detecting System Endianness

At runtime:
```c
int is_little_endian() {
    uint16_t value = 1;
    uint8_t *byte = (uint8_t*)&value;
    return byte[0] == 1;  // True if LSB is at lowest address
}
```

At compile time (GCC/Clang):
```c
#if __BYTE_ORDER__ == __ORDER_LITTLE_ENDIAN__
    // Little endian code
#else
    // Big endian code
#endif
```

## Byte Swapping

Converting between endianness requires swapping bytes:

```c
// Swap bytes in 16-bit value
uint16_t swap16(uint16_t x) {
    return (x >> 8) | (x << 8);
}

// Swap bytes in 32-bit value
uint32_t swap32(uint32_t x) {
    return ((x >> 24) & 0x000000FF) |
           ((x >> 8)  & 0x0000FF00) |
           ((x << 8)  & 0x00FF0000) |
           ((x << 24) & 0xFF000000);
}
```

Most compilers provide built-in byte-swap functions (`__builtin_bswap32` in GCC).

## Key Takeaways

- **Endianness** determines byte order for multi-byte values in memory.
- **Little endian** (LSB first) dominates in modern desktop/server CPUs (x86, ARM).
- **Big endian** (MSB first) is used in network protocols ("network byte order").
- When reading hex dumps, **know the endianness** or you'll misinterpret values.
- Use **conversion functions** (`htons`, `ntohl`) for network code.
- **Alignment** affects struct layout and memory access performance.
- **Padding** is inserted by compilers to maintain alignment—structs are often larger than the sum of their fields.
- Endianness applies to **multi-byte values**, not to bits within bytes or single-byte characters.

