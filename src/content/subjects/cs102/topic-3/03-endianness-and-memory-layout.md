# Endianness and Memory Layout

When multi-byte values are stored in memory, the **byte order** matters. This is called **endianness**.

## Big endian vs little endian

Consider the 32-bit value:

`0x12345678`

It consists of 4 bytes:

`12 34 56 78`

### Big endian

Big endian stores the **most significant byte** at the **lowest address**:

```
addr:  1000 1001 1002 1003
byte:   12   34   56   78
```

### Little endian

Little endian stores the **least significant byte** at the **lowest address**:

```
addr:  1000 1001 1002 1003
byte:   78   56   34   12
```

Many common CPU architectures (including x86) are little endian.

## Why endianness matters

Endianness can affect:
- Interpreting **hex dumps** correctly
- Reading/writing binary file formats
- Network protocols (often define “network byte order” as big endian)
- Assembly-level memory loads and stores

## Bits within a byte

Endianness is about byte order in multi-byte values. Within a byte, the bit positions are consistent (bit 0 is the least significant bit, etc.). Don’t mix these concepts.

## Alignment (conceptual)

Many architectures prefer reading multi-byte values at addresses that are multiples of their size:
- 4-byte int at an address divisible by 4
- 8-byte value at an address divisible by 8

Misalignment can be slower or even illegal on some systems.

## Key takeaways

- Endianness determines byte order for multi-byte values in memory.
- Little endian is common; big endian is common in networking conventions.
- Correctly reading dumps and binary formats requires knowing the endianness.

