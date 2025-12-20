# Variable Arguments

Variadic functions accept a variable number of arguments, like `printf`. This section covers how to create and use variadic functions safely.

## The stdarg.h Interface

### Core Macros

```c
#include <stdarg.h>

va_list args;           // Type to hold argument list
va_start(args, last);   // Initialize with last fixed parameter
va_arg(args, type);     // Get next argument of specified type
va_end(args);           // Clean up
va_copy(dest, src);     // Copy argument list (C99)
```

### Basic Example

```c
#include <stdarg.h>

double average(int count, ...) {
    va_list args;
    va_start(args, count);

    double sum = 0;
    for (int i = 0; i < count; i++) {
        sum += va_arg(args, double);
    }

    va_end(args);
    return sum / count;
}

double avg = average(4, 1.0, 2.0, 3.0, 4.0);  // 2.5
```

## How It Works

### Stack-Based Parameters

Arguments are passed on the stack (typically):

```
| arg4 |
| arg3 |
| arg2 |
| arg1 |
| count | <- va_start initializes here
| return addr |
| saved regs |
```

`va_arg` advances through the stack, interpreting bytes as the specified type.

## Common Patterns

### Printf-Style Functions

```c
void debug_log(const char* format, ...) {
    va_list args;
    va_start(args, format);

    fprintf(stderr, "[DEBUG] ");
    vfprintf(stderr, format, args);
    fprintf(stderr, "\n");

    va_end(args);
}

debug_log("Value: %d, Name: %s", 42, "test");
```

### Using vprintf Family

```c
// For each printf function, there's a v-version:
vprintf(format, args);      // va_list version of printf
vfprintf(file, format, args);
vsprintf(buf, format, args);
vsnprintf(buf, size, format, args);
```

### Custom Format String

```c
void print_values(const char* types, ...) {
    va_list args;
    va_start(args, types);

    for (const char* t = types; *t; t++) {
        switch (*t) {
            case 'i':
                printf("%d ", va_arg(args, int));
                break;
            case 'd':
                printf("%f ", va_arg(args, double));
                break;
            case 's':
                printf("%s ", va_arg(args, char*));
                break;
        }
    }
    printf("\n");

    va_end(args);
}

print_values("ids", 42, 3.14, "hello");  // "42 3.140000 hello"
```

## Important Rules

### Default Argument Promotion

Small types are promoted when passed:

```c
// char and short -> int
// float -> double

int sum_chars(int count, ...) {
    va_list args;
    va_start(args, count);

    int sum = 0;
    for (int i = 0; i < count; i++) {
        // Must use int, not char!
        sum += va_arg(args, int);
    }

    va_end(args);
    return sum;
}
```

### Type Safety Issues

No type checking - caller and function must agree:

```c
// DANGEROUS: Expecting double but passed int
double avg = average(3, 1, 2, 3);  // Undefined behavior!

// CORRECT: Pass doubles
double avg = average(3, 1.0, 2.0, 3.0);
```

### NULL Termination

Using sentinel value:

```c
void print_strings(const char* first, ...) {
    va_list args;
    va_start(args, first);

    const char* str = first;
    while (str != NULL) {
        printf("%s\n", str);
        str = va_arg(args, const char*);
    }

    va_end(args);
}

print_strings("one", "two", "three", NULL);
```

## va_copy Usage

### When to Use

Copy when you need to traverse arguments multiple times:

```c
int count_and_sum(int count, ...) {
    va_list args, args_copy;
    va_start(args, count);
    va_copy(args_copy, args);

    // First pass: count positive numbers
    int positive_count = 0;
    for (int i = 0; i < count; i++) {
        if (va_arg(args, int) > 0) positive_count++;
    }

    // Second pass: sum all numbers
    int sum = 0;
    for (int i = 0; i < count; i++) {
        sum += va_arg(args_copy, int);
    }

    va_end(args);
    va_end(args_copy);

    return sum;
}
```

## Variadic Macros

### C99 Variadic Macros

```c
#define DEBUG_PRINT(fmt, ...) \
    fprintf(stderr, "[%s:%d] " fmt "\n", __FILE__, __LINE__, __VA_ARGS__)

DEBUG_PRINT("Value is %d", x);
// Expands to:
// fprintf(stderr, "[file.c:42] Value is %d\n", "file.c", 42, x);
```

### Handling Zero Arguments

```c
// Problem: DEBUG_PRINT("hello") leaves trailing comma
#define DEBUG_PRINT(fmt, ...) \
    fprintf(stderr, fmt "\n", __VA_ARGS__)

// Solution: GCC extension
#define DEBUG_PRINT(fmt, ...) \
    fprintf(stderr, fmt "\n", ##__VA_ARGS__)

// ##__VA_ARGS__ removes preceding comma if empty
```

### C23 __VA_OPT__

```c
// Standard solution in C23
#define DEBUG_PRINT(fmt, ...) \
    fprintf(stderr, fmt __VA_OPT__(,) __VA_ARGS__)
```

## Building Safe Variadic Functions

### Type-Safe Wrapper

```c
// Use _Generic (C11) for type safety
#define log_value(x) _Generic((x), \
    int: log_int, \
    double: log_double, \
    char*: log_string \
)(x)

void log_int(int x) { printf("int: %d\n", x); }
void log_double(double x) { printf("double: %f\n", x); }
void log_string(char* x) { printf("string: %s\n", x); }
```

### Compound Literal Trick

```c
#define sum(...) sum_array((int[]){__VA_ARGS__}, \
                           sizeof((int[]){__VA_ARGS__}) / sizeof(int))

int sum_array(int* arr, size_t n) {
    int total = 0;
    for (size_t i = 0; i < n; i++) total += arr[i];
    return total;
}

int result = sum(1, 2, 3, 4, 5);  // Type-safe!
```

## Error Handling

### Format String Validation

GCC/Clang attribute:

```c
__attribute__((format(printf, 1, 2)))
void my_printf(const char* fmt, ...) {
    va_list args;
    va_start(args, fmt);
    vprintf(fmt, args);
    va_end(args);
}

// Compiler warns about format mismatches
my_printf("%d", "hello");  // Warning!
```

## Best Practices

1. **Document expected types** clearly
2. **Use format attributes** for printf-like functions
3. **Always call va_end** before returning
4. **Use va_copy** for multiple traversals
5. **Prefer type-safe alternatives** when possible
6. **Validate argument count** if possible

## Summary

Variadic functions provide flexibility but require care:
- Use `stdarg.h` macros correctly
- Remember default argument promotion
- No compile-time type checking
- Document expected argument types
- Consider type-safe alternatives

Use them for printf-like interfaces and when flexibility outweighs safety concerns.
