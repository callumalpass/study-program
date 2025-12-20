---
id: cs105-t7-bitwise
title: "Bitwise Operations"
order: 1
---

# Bitwise Operations

Bitwise operators manipulate individual bits within integer values. These operations are fundamental for low-level programming, embedded systems, graphics, cryptography, and performance optimization.

## Binary Representation

### Understanding Bits

Integers are stored as sequences of bits:

```c
// 8-bit examples
0000 0101 = 5
0000 1010 = 10
1111 1111 = 255 (unsigned) or -1 (signed)
```

### Viewing Binary

```c
void print_binary(unsigned int n) {
    for (int i = 31; i >= 0; i--) {
        printf("%d", (n >> i) & 1);
        if (i % 8 == 0) printf(" ");
    }
    printf("\n");
}

print_binary(42);  // 00000000 00000000 00000000 00101010
```

## Bitwise Operators

### AND (`&`)

Both bits must be 1:

```c
  0101 (5)
& 0011 (3)
------
  0001 (1)
```

```c
int result = 5 & 3;  // 1
```

**Uses:**
- Masking bits
- Checking if bit is set
- Clearing bits

### OR (`|`)

Either bit must be 1:

```c
  0101 (5)
| 0011 (3)
------
  0111 (7)
```

```c
int result = 5 | 3;  // 7
```

**Uses:**
- Setting bits
- Combining flags

### XOR (`^`)

Bits must be different:

```c
  0101 (5)
^ 0011 (3)
------
  0110 (6)
```

```c
int result = 5 ^ 3;  // 6
```

**Uses:**
- Toggling bits
- Simple encryption
- Swap without temporary

### NOT (`~`)

Inverts all bits:

```c
~0101 = 1010 (as part of larger int)
```

```c
unsigned char x = 5;   // 0000 0101
unsigned char y = ~x;  // 1111 1010 = 250
```

### Left Shift (`<<`)

Shifts bits left, filling with zeros:

```c
5 << 1 = 10   // 0101 << 1 = 1010
5 << 2 = 20   // 0101 << 2 = 10100
```

Equivalent to multiplying by 2^n:

```c
x << n == x * (1 << n)  // x * 2^n
```

### Right Shift (`>>`)

Shifts bits right:

```c
20 >> 1 = 10  // 10100 >> 1 = 1010
20 >> 2 = 5   // 10100 >> 2 = 101
```

**Warning:** Behavior with negative numbers is implementation-defined.

```c
// Arithmetic shift (preserves sign)
-8 >> 1 = -4  // 11111000 >> 1 = 11111100

// Logical shift (zero fill)
// Use unsigned for predictable behavior
```

## Common Operations

### Check if Bit is Set

```c
#define BIT_IS_SET(value, bit) (((value) >> (bit)) & 1)

int x = 0b10110;
if (BIT_IS_SET(x, 2)) {  // Check bit 2
    printf("Bit 2 is set\n");
}
```

### Set a Bit

```c
#define SET_BIT(value, bit) ((value) | (1 << (bit)))

int x = 0b10000;
x = SET_BIT(x, 2);  // x = 0b10100
```

### Clear a Bit

```c
#define CLEAR_BIT(value, bit) ((value) & ~(1 << (bit)))

int x = 0b10110;
x = CLEAR_BIT(x, 2);  // x = 0b10010
```

### Toggle a Bit

```c
#define TOGGLE_BIT(value, bit) ((value) ^ (1 << (bit)))

int x = 0b10110;
x = TOGGLE_BIT(x, 1);  // x = 0b10100
```

## Bit Masks

### Creating Masks

```c
// Single bit mask
#define BIT(n) (1 << (n))

// Range mask (bits m to n)
#define MASK(m, n) (((1 << ((n) - (m) + 1)) - 1) << (m))

unsigned int mask = MASK(2, 5);  // 0b00111100
```

### Extracting Bit Fields

```c
// Extract bits m to n from value
#define EXTRACT(value, m, n) \
    (((value) >> (m)) & ((1 << ((n) - (m) + 1)) - 1))

unsigned int x = 0b11010110;
unsigned int field = EXTRACT(x, 2, 5);  // 0b0101 = 5
```

## Practical Applications

### Flags and Options

```c
#define FLAG_READ    (1 << 0)  // 0001
#define FLAG_WRITE   (1 << 1)  // 0010
#define FLAG_EXECUTE (1 << 2)  // 0100
#define FLAG_DELETE  (1 << 3)  // 1000

unsigned int permissions = FLAG_READ | FLAG_WRITE;

// Check permission
if (permissions & FLAG_READ) {
    printf("Read access granted\n");
}

// Add permission
permissions |= FLAG_EXECUTE;

// Remove permission
permissions &= ~FLAG_WRITE;

// Toggle permission
permissions ^= FLAG_DELETE;
```

### Color Manipulation

```c
// ARGB color format
uint32_t color = 0xFF336699;  // Alpha=FF, R=33, G=66, B=99

uint8_t alpha = (color >> 24) & 0xFF;
uint8_t red   = (color >> 16) & 0xFF;
uint8_t green = (color >> 8) & 0xFF;
uint8_t blue  = color & 0xFF;

// Modify green channel
color = (color & 0xFF00FFFF) | (0xAA << 8);
```

### Swap Without Temporary

```c
void swap_xor(int* a, int* b) {
    *a ^= *b;
    *b ^= *a;
    *a ^= *b;
}
// Note: Fails if a and b point to same location
```

### Power of Two Check

```c
bool is_power_of_two(unsigned int n) {
    return n && !(n & (n - 1));
}
// 8 = 1000, 7 = 0111, 8 & 7 = 0
```

### Count Set Bits (Population Count)

```c
int popcount(unsigned int n) {
    int count = 0;
    while (n) {
        count += n & 1;
        n >>= 1;
    }
    return count;
}

// Faster: Brian Kernighan's algorithm
int popcount_fast(unsigned int n) {
    int count = 0;
    while (n) {
        n &= (n - 1);  // Clear lowest set bit
        count++;
    }
    return count;
}
```

## Operator Precedence

Bitwise operators have lower precedence than comparison:

```c
// WRONG - comparison evaluates first
if (flags & FLAG_READ == FLAG_READ)  // Parsed as: flags & (FLAG_READ == FLAG_READ)

// RIGHT - use parentheses
if ((flags & FLAG_READ) == FLAG_READ)

// Or simpler
if (flags & FLAG_READ)
```

## Summary

Bitwise operations enable:
- Efficient flag management
- Low-level data manipulation
- Performance optimization
- Hardware interaction

Key operators: `&` (AND), `|` (OR), `^` (XOR), `~` (NOT), `<<` (left shift), `>>` (right shift).

Always use parentheses to ensure correct precedence.
