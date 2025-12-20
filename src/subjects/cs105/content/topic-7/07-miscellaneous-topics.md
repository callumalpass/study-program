---
id: cs105-t7-misc
title: "Miscellaneous Topics"
order: 7
---

# Miscellaneous Topics

This section covers additional C features including `typedef`, `sizeof`, alignment, compound literals, and other useful language constructs.

## typedef

### Basic Usage

Create type aliases:

```c
typedef unsigned int uint;
typedef unsigned long ulong;

uint x = 42;
ulong y = 1000000;
```

### Struct Typedef

```c
// Without typedef
struct Point {
    int x, y;
};
struct Point p1;  // Need 'struct' keyword

// With typedef
typedef struct {
    int x, y;
} Point;
Point p2;  // No 'struct' needed

// Or combined
typedef struct Point {
    int x, y;
} Point;
```

### Function Pointer Typedef

```c
// Without typedef
int (*compare_func)(const void*, const void*);

// With typedef - much cleaner
typedef int (*CompareFunc)(const void*, const void*);
CompareFunc cmp = strcmp;
```

### Complex Declarations

```c
// Array of function pointers
typedef void (*Handler)(int);
Handler handlers[10];

// Function returning pointer to function
typedef int (*MathOp)(int, int);
typedef MathOp (*OpFactory)(const char*);

MathOp get_operation(const char* name);  // Clearer than raw declaration
```

## sizeof Operator

### Basic Usage

```c
int x;
printf("int size: %zu\n", sizeof(int));    // Type
printf("x size: %zu\n", sizeof(x));        // Variable
printf("x size: %zu\n", sizeof x);         // Parentheses optional for variables
```

### Arrays vs Pointers

```c
int arr[10];
int* ptr = arr;

printf("Array: %zu\n", sizeof(arr));  // 40 (10 * 4)
printf("Pointer: %zu\n", sizeof(ptr)); // 8 (on 64-bit)

// ARRAY_SIZE macro
#define ARRAY_SIZE(arr) (sizeof(arr) / sizeof((arr)[0]))
printf("Count: %zu\n", ARRAY_SIZE(arr));  // 10
```

### Compile-Time Evaluation

```c
// sizeof is evaluated at compile time
int size = sizeof(int);  // No runtime cost

// Except for VLAs (C99)
int n = 10;
int vla[n];
printf("%zu\n", sizeof(vla));  // Runtime evaluation
```

### Structure Size

```c
struct Data {
    char a;     // 1 byte
    int b;      // 4 bytes
    char c;     // 1 byte
};

printf("%zu\n", sizeof(struct Data));  // Often 12, not 6 (due to padding)
```

## Alignment

### Memory Alignment

CPUs access memory efficiently at aligned addresses:

```c
struct Aligned {
    char a;     // offset 0
    // 3 bytes padding
    int b;      // offset 4 (aligned to 4)
    char c;     // offset 8
    // 3 bytes padding
};  // Total: 12 bytes
```

### alignof Operator (C11)

```c
#include <stdalign.h>

printf("int alignment: %zu\n", alignof(int));     // 4
printf("double alignment: %zu\n", alignof(double)); // 8
```

### Controlling Alignment

```c
// Packed structure (no padding)
struct __attribute__((packed)) Packed {
    char a;
    int b;
    char c;
};  // 6 bytes

// Aligned variable
int __attribute__((aligned(16))) aligned_var;

// C11 alignas
alignas(16) int aligned_arr[4];
```

### Optimizing Structure Layout

```c
// Poor layout (16 bytes with padding)
struct Bad {
    char a;   // 1 + 3 padding
    int b;    // 4
    char c;   // 1 + 3 padding
    int d;    // 4
};

// Better layout (12 bytes)
struct Good {
    int b;    // 4
    int d;    // 4
    char a;   // 1
    char c;   // 1 + 2 padding
};
```

## Compound Literals (C99)

### Anonymous Arrays

```c
// Create temporary array
int* ptr = (int[]){1, 2, 3, 4, 5};

// Pass array to function
print_array((int[]){10, 20, 30}, 3);
```

### Anonymous Structures

```c
struct Point* p = &(struct Point){10, 20};

// Pass struct to function
draw_point((struct Point){x, y});
```

### Scope and Lifetime

```c
// Block scope - lifetime of enclosing block
int* ptr;
{
    ptr = (int[]){1, 2, 3};
}
// ptr is now dangling!

// File scope - static lifetime
int* global = (int[]){1, 2, 3};  // OK
```

## Designated Initializers (C99)

### Array Initializers

```c
// Initialize specific indices
int arr[10] = {
    [0] = 1,
    [5] = 50,
    [9] = 100
};

// Sparse initialization
int sparse[100] = { [50] = 500 };
```

### Structure Initializers

```c
struct Point p = {
    .y = 20,
    .x = 10  // Order doesn't matter
};

// Nested structures
struct Rectangle {
    struct Point top_left;
    struct Point bottom_right;
};

struct Rectangle r = {
    .top_left = { .x = 0, .y = 0 },
    .bottom_right = { .x = 100, .y = 100 }
};
```

## Flexible Array Members (C99)

### Definition

```c
struct String {
    size_t length;
    char data[];  // Flexible array member - must be last
};

// Allocate with extra space
struct String* str = malloc(sizeof(struct String) + 100);
str->length = 100;
strcpy(str->data, "Hello");
```

### Usage Pattern

```c
struct Packet {
    uint16_t type;
    uint16_t length;
    uint8_t data[];
};

struct Packet* create_packet(uint16_t type, const void* data, uint16_t len) {
    struct Packet* pkt = malloc(sizeof(struct Packet) + len);
    pkt->type = type;
    pkt->length = len;
    memcpy(pkt->data, data, len);
    return pkt;
}
```

## Static Assertions (C11)

### Compile-Time Checks

```c
_Static_assert(sizeof(int) == 4, "int must be 4 bytes");
_Static_assert(sizeof(void*) == 8, "64-bit pointers required");

// Check structure size
_Static_assert(sizeof(struct Header) == 16, "Header size mismatch");
```

## Generic Selection (C11)

### Type-Based Selection

```c
#define type_name(x) _Generic((x), \
    int: "int", \
    float: "float", \
    double: "double", \
    char*: "string", \
    default: "unknown")

printf("%s\n", type_name(42));      // "int"
printf("%s\n", type_name(3.14));    // "double"
printf("%s\n", type_name("hi"));    // "string"
```

### Type-Safe Functions

```c
#define abs(x) _Generic((x), \
    int: abs, \
    long: labs, \
    long long: llabs, \
    float: fabsf, \
    double: fabs, \
    long double: fabsl \
)(x)
```

## Inline Functions

### Usage

```c
static inline int max(int a, int b) {
    return a > b ? a : b;
}

// Benefits over macros:
// - Type checking
// - Single evaluation of arguments
// - Debuggable
```

### Linkage Rules

```c
// Header file - inline definition
inline int helper(int x) { return x * 2; }

// One source file - external definition
extern inline int helper(int x);
```

## Summary

These features enhance C programming:
- `typedef` - Create meaningful type names
- `sizeof` - Query type/variable sizes
- Alignment - Control memory layout
- Compound literals - Create anonymous objects
- Designated initializers - Clear initialization
- Flexible arrays - Variable-size structures
- Static assertions - Compile-time checks
- Generic selection - Type-based dispatch

Master these to write cleaner, more efficient C code.
