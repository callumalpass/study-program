# Bit Fields

Bit fields allow you to specify the exact number of bits for structure members, enabling compact data storage and hardware register access.

## Basic Syntax

### Defining Bit Fields

```c
struct Flags {
    unsigned int read : 1;    // 1 bit
    unsigned int write : 1;   // 1 bit
    unsigned int execute : 1; // 1 bit
    unsigned int hidden : 1;  // 1 bit
};

struct Flags f = { .read = 1, .write = 1, .execute = 0, .hidden = 0 };

if (f.read && f.write) {
    printf("Read-write access\n");
}
```

### Size Specification

```c
struct PackedData {
    unsigned int type : 4;     // 0-15
    unsigned int priority : 3; // 0-7
    unsigned int valid : 1;    // 0-1
};

printf("Size: %zu\n", sizeof(struct PackedData));  // Usually 4 bytes
```

## Use Cases

### Flag Storage

```c
struct FilePermissions {
    unsigned owner_read : 1;
    unsigned owner_write : 1;
    unsigned owner_exec : 1;
    unsigned group_read : 1;
    unsigned group_write : 1;
    unsigned group_exec : 1;
    unsigned other_read : 1;
    unsigned other_write : 1;
    unsigned other_exec : 1;
};

void set_permissions(struct FilePermissions* p, int mode) {
    p->other_exec = mode & 1;
    p->other_write = (mode >> 1) & 1;
    p->other_read = (mode >> 2) & 1;
    // ... etc
}
```

### Compact Data Structures

```c
struct Date {
    unsigned int day : 5;    // 1-31
    unsigned int month : 4;  // 1-12
    unsigned int year : 12;  // 0-4095
};

struct Date today = { .day = 15, .month = 6, .year = 2024 };
printf("Size: %zu bytes\n", sizeof(struct Date));  // 4 bytes vs 12 without bit fields
```

### Protocol Headers

```c
struct TCPHeader {
    uint16_t src_port;
    uint16_t dst_port;
    uint32_t seq_num;
    uint32_t ack_num;
    unsigned data_offset : 4;
    unsigned reserved : 3;
    unsigned ns : 1;
    unsigned cwr : 1;
    unsigned ece : 1;
    unsigned urg : 1;
    unsigned ack : 1;
    unsigned psh : 1;
    unsigned rst : 1;
    unsigned syn : 1;
    unsigned fin : 1;
    uint16_t window;
    uint16_t checksum;
    uint16_t urgent_ptr;
};
```

## Hardware Register Access

### Memory-Mapped Registers

```c
typedef struct {
    volatile unsigned enable : 1;
    volatile unsigned mode : 2;
    volatile unsigned speed : 3;
    volatile unsigned : 2;      // Reserved/padding
    volatile unsigned status : 4;
    volatile unsigned : 4;      // Reserved
    volatile unsigned error : 8;
    volatile unsigned : 8;      // Reserved
} ControlRegister;

#define CTRL_REG ((ControlRegister*)0x40000000)

void configure_device(void) {
    CTRL_REG->enable = 1;
    CTRL_REG->mode = 2;
    CTRL_REG->speed = 5;
}
```

### Unnamed Fields for Padding

```c
struct Register {
    unsigned field1 : 4;
    unsigned : 4;         // 4 bits padding (unnamed)
    unsigned field2 : 8;
    unsigned : 0;         // Align to next unit boundary
    unsigned field3 : 8;
};
```

## Type Considerations

### Signed vs Unsigned

```c
struct SignedBits {
    signed int value : 4;  // Range: -8 to 7
};

struct UnsignedBits {
    unsigned int value : 4;  // Range: 0 to 15
};

struct SignedBits s = { .value = 8 };  // Overflow!
printf("%d\n", s.value);  // Likely -8 (implementation-defined)
```

### Bool Bit Fields (C99)

```c
#include <stdbool.h>

struct Options {
    bool verbose : 1;
    bool debug : 1;
    bool quiet : 1;
};
```

## Memory Layout

### Packing Behavior

```c
struct BitField1 {
    unsigned a : 3;
    unsigned b : 5;
    unsigned c : 7;
    unsigned d : 1;
};

// May be packed into 16 bits or spread across more
// Layout is implementation-defined!
```

### Forcing New Unit

```c
struct Spread {
    unsigned a : 4;
    unsigned : 0;    // Force next field to new unit
    unsigned b : 4;
};
// 'b' starts at new storage unit boundary
```

## Portability Concerns

### Implementation-Defined Behavior

The following are NOT portable:
- Order of bit fields within a unit (MSB-first or LSB-first)
- Alignment of bit fields
- Whether fields span unit boundaries
- Maximum field width

### Portable Alternative

```c
// Instead of bit fields, use explicit bit manipulation:
#define FLAG_READ    (1 << 0)
#define FLAG_WRITE   (1 << 1)
#define FLAG_EXECUTE (1 << 2)

uint32_t flags = FLAG_READ | FLAG_WRITE;

if (flags & FLAG_READ) {
    // Has read permission
}
```

## Restrictions

### Cannot Take Address

```c
struct Bits {
    unsigned value : 4;
};

struct Bits b;
// unsigned* ptr = &b.value;  // ERROR: cannot take address
```

### Cannot Use sizeof

```c
struct Bits {
    unsigned value : 4;
};

struct Bits b;
// size_t s = sizeof(b.value);  // ERROR
```

### Cannot Be Arrays

```c
struct Invalid {
    // unsigned values[3] : 4;  // ERROR: cannot have array of bit fields
};
```

## Best Practices

### Use for Space Optimization

```c
// Good: Many boolean flags
struct Flags {
    unsigned flag1 : 1;
    unsigned flag2 : 1;
    // ... many more flags
};
```

### Avoid for Performance-Critical Code

```c
// Bit fields may require masking and shifting
// Regular integers can be faster
struct Fast {
    uint8_t value;  // Faster than unsigned value : 8;
};
```

### Document Layout Assumptions

```c
// WARNING: Bit layout is compiler/architecture dependent
// This structure assumes little-endian, LSB-first bit ordering
struct NetworkHeader {
    unsigned version : 4;
    unsigned ihl : 4;
    // ...
};
```

### Use Unions for Dual Access

```c
union Register {
    uint32_t raw;
    struct {
        unsigned field1 : 8;
        unsigned field2 : 8;
        unsigned field3 : 16;
    } bits;
};

// Access as raw value or individual fields
union Register r;
r.raw = 0x12345678;
printf("field1: %u\n", r.bits.field1);
```

## Summary

Bit fields provide:
- Compact data storage
- Named access to individual bits
- Hardware register modeling

Limitations:
- Non-portable layout
- Cannot take address
- May have performance overhead

Use for space optimization and hardware access, but prefer explicit bit manipulation for portable code.
