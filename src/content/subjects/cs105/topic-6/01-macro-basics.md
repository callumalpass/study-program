# Macro Basics

Macros are text substitution rules processed by the C preprocessor before compilation. They provide a powerful mechanism for code reuse, configuration, and abstraction without runtime overhead.

## Object-Like Macros

### Simple Constants

Object-like macros define named constants:

```c
#define PI 3.14159265358979
#define MAX_BUFFER_SIZE 1024
#define COMPANY_NAME "Acme Corp"

double circumference = 2 * PI * radius;
char buffer[MAX_BUFFER_SIZE];
```

### Advantages Over Magic Numbers

Using macros for constants:
- Documents the meaning of values
- Enables single-point changes
- Improves code readability
- No runtime overhead (compile-time substitution)

### Multi-line Macros

Use backslash for continuation:

```c
#define LONG_STRING "This is a very long string " \
                    "that spans multiple lines " \
                    "in the source code"
```

## Function-Like Macros

### Basic Syntax

Function-like macros take parameters:

```c
#define SQUARE(x) ((x) * (x))
#define MAX(a, b) ((a) > (b) ? (a) : (b))
#define ABS(x) ((x) < 0 ? -(x) : (x))

int result = SQUARE(5);      // Expands to: ((5) * (5))
int larger = MAX(10, 20);    // Expands to: ((10) > (20) ? (10) : (20))
```

### The Parentheses Rule

Always parenthesize:
1. Each parameter use
2. The entire macro body

```c
// BAD - Missing parentheses
#define DOUBLE_BAD(x) x * 2
int result = DOUBLE_BAD(3 + 4);  // 3 + 4 * 2 = 11, not 14!

// GOOD - Properly parenthesized
#define DOUBLE_GOOD(x) ((x) * 2)
int result = DOUBLE_GOOD(3 + 4);  // ((3 + 4) * 2) = 14
```

### Multiple Evaluation Problem

Macro arguments are substituted textually, causing multiple evaluation:

```c
#define SQUARE(x) ((x) * (x))

int a = 5;
int result = SQUARE(a++);  // ((a++) * (a++)) - a incremented twice!
```

**Solution:** Use inline functions for expressions with side effects:

```c
static inline int square(int x) {
    return x * x;
}
```

## Predefined Macros

Standard predefined macros:

```c
printf("File: %s\n", __FILE__);      // Source filename
printf("Line: %d\n", __LINE__);      // Current line number
printf("Date: %s\n", __DATE__);      // Compilation date
printf("Time: %s\n", __TIME__);      // Compilation time
printf("Function: %s\n", __func__);  // Current function (C99)
```

### Using for Debugging

```c
#define DEBUG_PRINT(msg) \
    printf("[%s:%d] %s\n", __FILE__, __LINE__, msg)

#define ASSERT(condition) \
    do { \
        if (!(condition)) { \
            fprintf(stderr, "Assertion failed: %s at %s:%d\n", \
                    #condition, __FILE__, __LINE__); \
            abort(); \
        } \
    } while(0)
```

## Undefining Macros

Remove macro definitions with `#undef`:

```c
#define TEMP 100
// ... use TEMP ...
#undef TEMP
// TEMP no longer defined

#define TEMP 200  // Can redefine
```

## Macro vs Function Trade-offs

| Aspect | Macros | Functions |
|--------|--------|-----------|
| Type checking | None | Full |
| Debugging | Harder | Easier |
| Multiple evaluation | Yes | No |
| Code size | Larger (inline) | Smaller |
| Overhead | None | Call overhead |
| Type generic | Yes | No (before C11) |

## Best Practices

1. **Use UPPERCASE** for macro names
2. **Parenthesize** everything
3. **Avoid side effects** in arguments
4. **Prefer inline functions** when possible
5. **Document** macro behavior
6. **Use `do { } while(0)`** for multi-statement macros

```c
// Multi-statement macro pattern
#define SWAP(a, b) \
    do { \
        typeof(a) temp = (a); \
        (a) = (b); \
        (b) = temp; \
    } while(0)

// Usage works correctly in all contexts:
if (x > y)
    SWAP(x, y);  // No semicolon issues
```

## Common Patterns

### Debug Logging

```c
#ifdef DEBUG
    #define LOG(fmt, ...) fprintf(stderr, fmt, ##__VA_ARGS__)
#else
    #define LOG(fmt, ...) ((void)0)
#endif
```

### Compile-Time Constants

```c
#define ARRAY_SIZE(arr) (sizeof(arr) / sizeof((arr)[0]))

int numbers[] = {1, 2, 3, 4, 5};
size_t count = ARRAY_SIZE(numbers);  // 5
```

## Summary

Macros provide powerful text substitution capabilities:
- Object-like macros define constants
- Function-like macros provide parameterized substitution
- Proper parenthesization prevents precedence bugs
- Predefined macros aid debugging
- Consider inline functions as safer alternatives
