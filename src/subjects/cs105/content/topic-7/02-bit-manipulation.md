# Bit Manipulation Techniques

This section covers advanced bit manipulation techniques and algorithms commonly used in systems programming, competitive programming, and optimization.

## Bit Tricks

### Isolate Lowest Set Bit

```c
int lowest_bit = n & (-n);

// Example: n = 12 (1100)
// -12 in two's complement: 0100
// 12 & (-12) = 0100 = 4
```

### Clear Lowest Set Bit

```c
n = n & (n - 1);

// Example: n = 12 (1100)
// n - 1 = 11 (1011)
// 12 & 11 = 1000 = 8
```

### Set Lowest Clear Bit

```c
n = n | (n + 1);

// Example: n = 12 (1100)
// n + 1 = 13 (1101)
// 12 | 13 = 1101 = 13
```

### Check If Power of 2

```c
bool is_power_of_2(unsigned n) {
    return n && !(n & (n - 1));
}
```

### Round Up to Power of 2

```c
unsigned next_power_of_2(unsigned n) {
    n--;
    n |= n >> 1;
    n |= n >> 2;
    n |= n >> 4;
    n |= n >> 8;
    n |= n >> 16;
    return n + 1;
}
```

## Counting Bits

### Population Count (Hamming Weight)

```c
// Method 1: Loop
int popcount_loop(unsigned n) {
    int count = 0;
    while (n) {
        count += n & 1;
        n >>= 1;
    }
    return count;
}

// Method 2: Brian Kernighan
int popcount_kernighan(unsigned n) {
    int count = 0;
    while (n) {
        n &= n - 1;  // Clear lowest set bit
        count++;
    }
    return count;
}

// Method 3: Lookup table
static const int bit_count[256] = { /* precomputed */ };
int popcount_table(unsigned n) {
    return bit_count[n & 0xFF] +
           bit_count[(n >> 8) & 0xFF] +
           bit_count[(n >> 16) & 0xFF] +
           bit_count[(n >> 24) & 0xFF];
}

// Method 4: Built-in (GCC/Clang)
int count = __builtin_popcount(n);
```

### Count Leading Zeros

```c
// Built-in
int leading_zeros = __builtin_clz(n);  // Undefined for n=0

// Manual implementation
int clz(unsigned n) {
    if (n == 0) return 32;
    int count = 0;
    if ((n & 0xFFFF0000) == 0) { count += 16; n <<= 16; }
    if ((n & 0xFF000000) == 0) { count += 8;  n <<= 8;  }
    if ((n & 0xF0000000) == 0) { count += 4;  n <<= 4;  }
    if ((n & 0xC0000000) == 0) { count += 2;  n <<= 2;  }
    if ((n & 0x80000000) == 0) { count += 1; }
    return count;
}
```

### Count Trailing Zeros

```c
// Built-in
int trailing_zeros = __builtin_ctz(n);  // Undefined for n=0

// Using lowest set bit
int ctz(unsigned n) {
    if (n == 0) return 32;
    return __builtin_popcount((n & -n) - 1);
}
```

### Find Position of Highest Bit

```c
int highest_bit_position(unsigned n) {
    return 31 - __builtin_clz(n);
}

// Or: floor(log2(n))
int log2_floor(unsigned n) {
    int result = 0;
    while (n >>= 1) result++;
    return result;
}
```

## Bit Field Extraction

### Extract Bit Range

```c
// Extract bits [low, high] from n
unsigned extract_bits(unsigned n, int low, int high) {
    unsigned mask = (1U << (high - low + 1)) - 1;
    return (n >> low) & mask;
}

// Example: extract bits 4-7 from 0xABCD
unsigned result = extract_bits(0xABCD, 4, 7);  // 0xC
```

### Insert Bit Range

```c
// Insert value into bits [low, high] of n
unsigned insert_bits(unsigned n, unsigned value, int low, int high) {
    unsigned mask = ((1U << (high - low + 1)) - 1) << low;
    return (n & ~mask) | ((value << low) & mask);
}
```

## Bit Reversal

### Reverse All Bits

```c
unsigned reverse_bits(unsigned n) {
    n = ((n >> 1) & 0x55555555) | ((n & 0x55555555) << 1);
    n = ((n >> 2) & 0x33333333) | ((n & 0x33333333) << 2);
    n = ((n >> 4) & 0x0F0F0F0F) | ((n & 0x0F0F0F0F) << 4);
    n = ((n >> 8) & 0x00FF00FF) | ((n & 0x00FF00FF) << 8);
    n = (n >> 16) | (n << 16);
    return n;
}
```

### Reverse Bytes (Endian Swap)

```c
uint32_t swap_endian(uint32_t n) {
    return ((n >> 24) & 0xFF) |
           ((n >> 8) & 0xFF00) |
           ((n << 8) & 0xFF0000) |
           ((n << 24) & 0xFF000000);
}

// Built-in
uint32_t swapped = __builtin_bswap32(n);
```

## Practical Applications

### Fast Modulo (Power of 2)

```c
// n % 8 (when divisor is power of 2)
int mod = n & 7;  // Equivalent to n % 8
int mod = n & (divisor - 1);  // General case
```

### Fast Division (Power of 2)

```c
int div = n >> 3;  // n / 8
int div = n >> k;  // n / 2^k (unsigned only)
```

### Absolute Value Without Branching

```c
int abs_nobranch(int n) {
    int mask = n >> 31;  // All 1s if negative, all 0s if positive
    return (n + mask) ^ mask;
}
```

### Sign Extension

```c
// Extend 8-bit signed to 32-bit
int sign_extend_8(uint8_t n) {
    return (int8_t)n;
}

// Manual sign extension
int sign_extend(unsigned n, int bits) {
    unsigned mask = 1U << (bits - 1);
    return (n ^ mask) - mask;
}
```

### Conditional Set

```c
// Set y to 0 if x is 0, else set y to -1 (all 1s)
int y = -!!x;

// Conditional expression without branch
// result = condition ? a : b
int result = (a & -condition) | (b & ~(-condition));
```

## Bit Arrays

### Bitmap Implementation

```c
#define BITMAP_SIZE 1024

typedef struct {
    unsigned char bits[BITMAP_SIZE / 8];
} Bitmap;

void bitmap_set(Bitmap* bm, int index) {
    bm->bits[index / 8] |= (1 << (index % 8));
}

void bitmap_clear(Bitmap* bm, int index) {
    bm->bits[index / 8] &= ~(1 << (index % 8));
}

int bitmap_test(const Bitmap* bm, int index) {
    return (bm->bits[index / 8] >> (index % 8)) & 1;
}
```

### Find First Set Bit in Array

```c
int find_first_set(const unsigned* array, int size) {
    for (int i = 0; i < size; i++) {
        if (array[i]) {
            return i * 32 + __builtin_ctz(array[i]);
        }
    }
    return -1;  // No bit set
}
```

## Gray Code

### Binary to Gray

```c
unsigned to_gray(unsigned n) {
    return n ^ (n >> 1);
}
```

### Gray to Binary

```c
unsigned from_gray(unsigned gray) {
    unsigned n = gray;
    for (unsigned mask = n >> 1; mask; mask >>= 1) {
        n ^= mask;
    }
    return n;
}
```

## Summary

Bit manipulation enables:
- Efficient algorithms
- Memory-efficient data structures
- Low-level optimization
- Systems programming

Key techniques:
- Isolate/clear lowest bit
- Population count
- Leading/trailing zero count
- Bit field extraction
- Endian conversion

Use built-in functions when available for optimal performance.
