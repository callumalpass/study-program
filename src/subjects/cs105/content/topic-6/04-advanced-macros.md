---
id: cs105-t6-advanced
title: "Advanced Macros"
order: 4
---

# Advanced Macros

Beyond basic macros, C provides powerful preprocessor features including stringification, token concatenation, and variadic macros. These enable sophisticated metaprogramming techniques.

## Stringification (`#`)

The `#` operator converts a macro argument to a string literal:

```c
#define STRINGIFY(x) #x
#define TOSTRING(x) STRINGIFY(x)

printf("%s\n", STRINGIFY(hello));  // "hello"
printf("%s\n", STRINGIFY(1 + 2));  // "1 + 2"
```

### Two-Level Stringification

To stringify macro values (not names), use two levels:

```c
#define VERSION 42
#define STRINGIFY(x) #x
#define TOSTRING(x) STRINGIFY(x)

printf("%s\n", STRINGIFY(VERSION));  // "VERSION"
printf("%s\n", TOSTRING(VERSION));   // "42"
```

### Debug Assertions

```c
#define ASSERT(condition) \
    do { \
        if (!(condition)) { \
            fprintf(stderr, "Assertion failed: %s\n", #condition); \
            fprintf(stderr, "  at %s:%d\n", __FILE__, __LINE__); \
            abort(); \
        } \
    } while(0)

ASSERT(x > 0);  // Prints "Assertion failed: x > 0" if false
```

## Token Concatenation (`##`)

The `##` operator joins tokens:

```c
#define CONCAT(a, b) a##b

int CONCAT(my, Var) = 10;      // int myVar = 10;
int CONCAT(count, 1) = 5;      // int count1 = 5;
```

### Generating Identifiers

```c
#define DECLARE_PAIR(type) \
    typedef struct { \
        type first; \
        type second; \
    } type##_pair

DECLARE_PAIR(int);     // Creates int_pair struct
DECLARE_PAIR(double);  // Creates double_pair struct

int_pair p1 = {10, 20};
double_pair p2 = {1.5, 2.5};
```

### Enum-to-String

```c
#define ENUM_ENTRY(name) name,
#define STRING_ENTRY(name) #name,

#define COLORS(F) \
    F(RED) \
    F(GREEN) \
    F(BLUE) \
    F(YELLOW)

enum Color { COLORS(ENUM_ENTRY) };
const char* color_names[] = { COLORS(STRING_ENTRY) };

// Expands to:
// enum Color { RED, GREEN, BLUE, YELLOW, };
// const char* color_names[] = { "RED", "GREEN", "BLUE", "YELLOW", };
```

## Variadic Macros

Macros that accept variable arguments (C99):

```c
#define DEBUG_PRINT(fmt, ...) \
    fprintf(stderr, "[DEBUG] " fmt "\n", __VA_ARGS__)

DEBUG_PRINT("Value: %d", x);
DEBUG_PRINT("Point: (%d, %d)", x, y);
```

### The `##__VA_ARGS__` Extension

Handle zero arguments (GCC/Clang extension):

```c
#define LOG(fmt, ...) \
    fprintf(stderr, fmt "\n", ##__VA_ARGS__)

LOG("Simple message");           // Works with zero args
LOG("Value: %d", x);             // Works with one arg
LOG("Sum: %d + %d = %d", a, b, c);  // Multiple args
```

### Counting Arguments

```c
#define COUNT_ARGS(...) COUNT_ARGS_IMPL(__VA_ARGS__, 5, 4, 3, 2, 1, 0)
#define COUNT_ARGS_IMPL(_1, _2, _3, _4, _5, N, ...) N

int count = COUNT_ARGS(a, b, c);  // 3
```

## X-Macros

Pattern for maintaining parallel data structures:

```c
// Define data once
#define ERROR_CODES \
    X(SUCCESS,     0, "Operation successful") \
    X(NOT_FOUND, -1, "Item not found") \
    X(INVALID,   -2, "Invalid input") \
    X(NO_MEMORY, -3, "Out of memory")

// Generate enum
#define X(name, value, desc) name = value,
enum ErrorCode { ERROR_CODES };
#undef X

// Generate string table
#define X(name, value, desc) [name + 3] = desc,
const char* error_messages[] = { ERROR_CODES };
#undef X

// Generate function
const char* get_error_message(enum ErrorCode code) {
    return error_messages[code + 3];
}
```

## Generic Selection (C11)

Type-generic macros using `_Generic`:

```c
#define print_value(x) _Generic((x), \
    int: print_int, \
    double: print_double, \
    char*: print_string, \
    default: print_unknown \
)(x)

void print_int(int x) { printf("%d\n", x); }
void print_double(double x) { printf("%f\n", x); }
void print_string(char* x) { printf("%s\n", x); }
void print_unknown(void* x) { printf("Unknown type\n"); }

print_value(42);        // Calls print_int
print_value(3.14);      // Calls print_double
print_value("hello");   // Calls print_string
```

### Type-Safe Max

```c
#define max(a, b) _Generic((a), \
    int: max_int, \
    long: max_long, \
    float: max_float, \
    double: max_double \
)(a, b)

int max_int(int a, int b) { return a > b ? a : b; }
long max_long(long a, long b) { return a > b ? a : b; }
float max_float(float a, float b) { return a > b ? a : b; }
double max_double(double a, double b) { return a > b ? a : b; }
```

## Multi-Statement Macros

Use `do { } while(0)` pattern:

```c
#define SAFE_FREE(ptr) \
    do { \
        free(ptr); \
        (ptr) = NULL; \
    } while(0)

// Works correctly in all contexts:
if (condition)
    SAFE_FREE(p);
else
    other_action();
```

### Why Not Just Braces?

```c
// Problem with simple braces:
#define BAD_FREE(ptr) { free(ptr); ptr = NULL; }

if (condition)
    BAD_FREE(p);   // Semicolon creates empty statement
else               // Error: else without if
    other_action();
```

## Compile-Time Assertions

```c
#define STATIC_ASSERT(cond, msg) \
    typedef char static_assertion_##msg[(cond) ? 1 : -1]

STATIC_ASSERT(sizeof(int) == 4, int_must_be_4_bytes);
STATIC_ASSERT(sizeof(void*) == 8, must_be_64_bit);
```

C11 provides `_Static_assert`:

```c
_Static_assert(sizeof(int) >= 4, "int must be at least 4 bytes");
```

## Best Practices

1. **Use uppercase** for macro names
2. **Parenthesize** all parameters and expressions
3. **Use `do { } while(0)`** for multi-statement macros
4. **Document** complex macros thoroughly
5. **Prefer inline functions** when possible
6. **Test macro expansion** with `-E` flag

## Debugging Macros

View preprocessor output:

```bash
gcc -E source.c           # Show preprocessed output
gcc -E -P source.c        # Without line markers
gcc -E -dM source.c       # List all defined macros
```

## Summary

Advanced macro techniques provide:
- Stringification for debug messages
- Token concatenation for identifier generation
- Variadic macros for flexible interfaces
- X-macros for maintaining parallel structures
- Generic selection for type-safe operations

Use these carefully - complex macros can be hard to debug and maintain.
