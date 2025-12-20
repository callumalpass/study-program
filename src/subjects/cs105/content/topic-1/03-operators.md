---
id: cs105-t1-operators
title: "Operators and Expressions"
order: 3
---

# Operators and Expressions

Operators are symbols that tell the compiler to perform specific mathematical, logical, or other operations. C provides a rich set of operators that give you fine-grained control over computations.

## Arithmetic Operators

The basic arithmetic operators work as you'd expect:

| Operator | Description | Example |
|----------|-------------|---------|
| `+` | Addition | `5 + 3` → 8 |
| `-` | Subtraction | `5 - 3` → 2 |
| `*` | Multiplication | `5 * 3` → 15 |
| `/` | Division | `5 / 3` → 1 (integer division) |
| `%` | Modulo (remainder) | `5 % 3` → 2 |

**Integer Division Warning**: When both operands are integers, division truncates:

```c
int a = 7 / 2;        // 3, not 3.5
double b = 7 / 2;     // Still 3.0 (integer division happens first!)
double c = 7.0 / 2;   // 3.5 (one operand is double)
double d = (double)7 / 2;  // 3.5 (explicit cast)
```

The modulo operator is useful for many tasks:

```c
// Check if a number is even
if (num % 2 == 0) {
    printf("Even\n");
}

// Wrap around (circular indexing)
int index = (i + 1) % arraySize;

// Extract digits
int lastDigit = num % 10;
```

## Increment and Decrement

C provides shorthand for adding or subtracting 1:

```c
int x = 5;
x++;    // Post-increment: x is now 6
++x;    // Pre-increment: x is now 7
x--;    // Post-decrement: x is now 6
--x;    // Pre-decrement: x is now 5
```

The difference between pre and post matters in expressions:

```c
int a = 5;
int b = a++;  // b = 5, then a becomes 6
int c = ++a;  // a becomes 7, then c = 7
```

**Best Practice**: Avoid using increment/decrement in complex expressions. Use them on separate lines for clarity.

## Assignment Operators

Beyond simple assignment (`=`), C provides compound assignment operators:

```c
int x = 10;
x += 5;   // Same as x = x + 5;  → x is 15
x -= 3;   // Same as x = x - 3;  → x is 12
x *= 2;   // Same as x = x * 2;  → x is 24
x /= 4;   // Same as x = x / 4;  → x is 6
x %= 4;   // Same as x = x % 4;  → x is 2
```

These operators are not just shorthand—they evaluate the left operand only once, which matters for expressions with side effects.

## Comparison Operators

Comparison operators return 1 (true) or 0 (false):

| Operator | Description |
|----------|-------------|
| `==` | Equal to |
| `!=` | Not equal to |
| `<` | Less than |
| `>` | Greater than |
| `<=` | Less than or equal |
| `>=` | Greater than or equal |

```c
int a = 5, b = 10;
int result;

result = (a == b);   // 0 (false)
result = (a < b);    // 1 (true)
result = (a != b);   // 1 (true)
```

**Common Mistake**: Using `=` instead of `==` in conditions:

```c
if (x = 5) {  // WRONG: assigns 5 to x, always true
    // ...
}

if (x == 5) {  // CORRECT: compares x to 5
    // ...
}
```

## Logical Operators

Logical operators combine boolean expressions:

| Operator | Description |
|----------|-------------|
| `&&` | Logical AND |
| `\|\|` | Logical OR |
| `!` | Logical NOT |

```c
int age = 25;
int hasLicense = 1;

if (age >= 18 && hasLicense) {
    printf("Can drive\n");
}

if (age < 13 || age > 65) {
    printf("Discount available\n");
}

if (!hasLicense) {
    printf("Cannot drive\n");
}
```

**Short-Circuit Evaluation**: C stops evaluating as soon as the result is determined:

```c
// If ptr is NULL, the second condition is never evaluated
if (ptr != NULL && ptr->value > 0) {
    // Safe to use ptr
}

// If first condition is true, second is never evaluated
if (isAdmin || checkPassword()) {
    // Admin gets in without password check
}
```

## Bitwise Operators

Bitwise operators work on individual bits:

| Operator | Description |
|----------|-------------|
| `&` | Bitwise AND |
| `\|` | Bitwise OR |
| `^` | Bitwise XOR |
| `~` | Bitwise NOT (complement) |
| `<<` | Left shift |
| `>>` | Right shift |

```c
unsigned char a = 0b00001111;  // 15
unsigned char b = 0b11110000;  // 240

unsigned char c = a & b;   // 0b00000000 = 0
unsigned char d = a | b;   // 0b11111111 = 255
unsigned char e = a ^ b;   // 0b11111111 = 255

unsigned char f = a << 2;  // 0b00111100 = 60 (multiply by 4)
unsigned char g = b >> 4;  // 0b00001111 = 15 (divide by 16)
```

Common uses:
- **Flags**: `flags |= FLAG_VISIBLE;` (set bit)
- **Masking**: `value & 0xFF` (extract lower byte)
- **Fast multiplication/division**: `x << 1` is `x * 2`

## The Ternary Operator

The conditional (ternary) operator provides compact if-else:

```c
// condition ? value_if_true : value_if_false

int max = (a > b) ? a : b;

char *status = (score >= 60) ? "Pass" : "Fail";

printf("You have %d item%s\n", count, (count == 1) ? "" : "s");
```

Use it for simple conditions; for complex logic, prefer if-else.

## Operator Precedence

Operators have precedence that determines evaluation order:

```c
int result = 2 + 3 * 4;    // 14, not 20 (multiplication first)
int result2 = (2 + 3) * 4; // 20 (parentheses override)
```

When in doubt, use parentheses to make intent clear:

```c
// Confusing
if (a & b == c) { ... }

// Clear
if ((a & b) == c) { ... }
```

General precedence (highest to lowest):
1. `()` Parentheses
2. `++` `--` (postfix)
3. `!` `~` `++` `--` (prefix), casts
4. `*` `/` `%`
5. `+` `-`
6. `<<` `>>`
7. `<` `<=` `>` `>=`
8. `==` `!=`
9. `&`, then `^`, then `|`
10. `&&`
11. `||`
12. `?:`
13. Assignment operators

## Key Takeaways

- Integer division truncates—cast to double for decimal results
- Pre vs. post increment/decrement matters in expressions
- Use `==` for comparison, `=` for assignment
- Logical operators short-circuit for efficiency and safety
- Bitwise operators manipulate individual bits
- When precedence is unclear, use parentheses
- Compound assignment operators (`+=`, `-=`, etc.) improve readability

Mastering operators enables you to write concise, efficient code. Combined with control flow statements (covered next), you'll be able to express complex logic clearly.
