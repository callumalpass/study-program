# Variables and Data Types

Variables are the fundamental building blocks of any program. In C, understanding data types is especially important because C gives you direct control over memory—and with that control comes responsibility.

## Declaring Variables

In C, you must declare a variable's type before using it. The basic syntax is:

```c
type variableName;
type variableName = initialValue;
```

Unlike dynamically-typed languages, C requires you to commit to a type at declaration time:

```c
int age;           // Declaration without initialization
int score = 100;   // Declaration with initialization
float pi = 3.14159;
char grade = 'A';
```

**Important**: Uninitialized variables contain garbage values—whatever happened to be in that memory location. Always initialize variables when possible.

## Integer Types

C provides several integer types with different sizes and ranges:

| Type | Typical Size | Range |
|------|-------------|-------|
| `char` | 1 byte | -128 to 127 |
| `short` | 2 bytes | -32,768 to 32,767 |
| `int` | 4 bytes | -2.1 billion to 2.1 billion |
| `long` | 4-8 bytes | Platform dependent |
| `long long` | 8 bytes | -9.2 quintillion to 9.2 quintillion |

Each type also has an `unsigned` variant that can only store non-negative values but has double the positive range:

```c
unsigned int count = 0;        // 0 to 4.2 billion
unsigned char byte = 255;      // 0 to 255
```

Choose the smallest type that fits your data to conserve memory, especially in embedded systems or large arrays.

## Floating-Point Types

For decimal numbers, C provides:

| Type | Size | Precision |
|------|------|-----------|
| `float` | 4 bytes | ~7 decimal digits |
| `double` | 8 bytes | ~15 decimal digits |
| `long double` | 10-16 bytes | ~19 decimal digits |

```c
float temperature = 98.6f;     // 'f' suffix for float literals
double distance = 384400.0;    // No suffix needed for double
double scientific = 6.022e23;  // Scientific notation
```

**Warning**: Floating-point arithmetic is approximate. Never compare floats for exact equality:

```c
// BAD: May fail due to floating-point imprecision
if (result == 0.1) { ... }

// GOOD: Compare within a small tolerance
if (fabs(result - 0.1) < 0.0001) { ... }
```

## Character Type

The `char` type stores single characters using ASCII encoding:

```c
char letter = 'A';        // Character literal with single quotes
char newline = '\n';      // Escape sequence
char digit = '7';         // The character '7', not the number 7

// Characters are actually small integers
printf("%d\n", 'A');      // Prints 65 (ASCII value)
printf("%c\n", 65);       // Prints 'A'
```

You can perform arithmetic on characters:

```c
char lowercase = 'a';
char uppercase = lowercase - 32;  // Converts to 'A'
```

## Boolean Values

Traditional C (C89/C90) doesn't have a built-in boolean type. Instead, integers are used:
- `0` is false
- Any non-zero value is true

```c
int isReady = 1;    // true
int isEmpty = 0;    // false

if (isReady) {
    printf("System is ready\n");
}
```

C99 introduced `<stdbool.h>` with proper boolean support:

```c
#include <stdbool.h>

bool isValid = true;
bool hasError = false;
```

## Type Modifiers and Qualifiers

**`const`** creates read-only variables:
```c
const double PI = 3.14159265359;
// PI = 3.0;  // ERROR: Cannot modify const
```

**`static`** preserves variable value between function calls:
```c
void countCalls() {
    static int count = 0;  // Initialized only once
    count++;
    printf("Called %d times\n", count);
}
```

**`volatile`** tells the compiler a variable may change unexpectedly (used in embedded systems):
```c
volatile int sensorReading;  // May be modified by hardware
```

## Type Conversion

C performs implicit type conversion in mixed expressions, generally promoting to the larger type:

```c
int a = 5;
double b = 2.5;
double result = a + b;  // 'a' promoted to double, result is 7.5
```

For explicit conversion, use casting:

```c
int x = 7, y = 2;
double ratio = (double)x / y;  // 3.5, not 3

// Be careful with narrowing conversions
int truncated = (int)3.7;      // 3, fractional part lost
```

## The sizeof Operator

Use `sizeof` to determine type and variable sizes:

```c
printf("int: %zu bytes\n", sizeof(int));
printf("double: %zu bytes\n", sizeof(double));

int arr[10];
printf("Array: %zu bytes\n", sizeof(arr));  // 40 on most systems
```

## Naming Conventions

Follow these conventions for readable code:

```c
// Good variable names
int studentCount;
double averageScore;
char firstInitial;

// Avoid
int x;        // Too vague
int NUMBER;   // ALL_CAPS typically reserved for constants
int student_count_in_the_class;  // Too long
```

Use camelCase or snake_case consistently throughout your project.

## Key Takeaways

- C is statically typed—declare types before use
- Choose the appropriate type size for your data
- Floating-point comparisons require tolerance checks
- Characters are integers under the hood (ASCII values)
- Use `const` for values that shouldn't change
- Be explicit about type conversions to avoid surprises
- `sizeof` helps you understand memory usage

Understanding C's type system is essential because it directly maps to how data is stored in memory—a concept we'll explore deeply when we cover pointers.
