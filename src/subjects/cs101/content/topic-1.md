## Introduction

Welcome to your first step in learning Python programming! In this topic, you'll learn how computers store and manipulate information through variables and data types. By the end, you'll be able to create variables, understand Python's core data types, and convert between them confidently.

**Learning Objectives:**
- Create and name variables following Python conventions
- Identify and use the four basic data types: int, float, str, and bool
- Convert between data types using type casting
- Use the type() function to inspect variable types
- Understand how Python handles dynamic typing

---

## Core Concepts

### What Are Variables?

Variables are named containers that store data in your program's memory. Think of them as labeled boxes where you can put information and retrieve it later using the label (the variable name).

```python
# Creating variables is simple - just use the assignment operator (=)
age = 25
name = "Alice"
temperature = 98.6
is_student = True
```

Unlike some programming languages, Python doesn't require you to declare a variable's type before using it. Python figures out the type automatically based on the value you assign - this is called **dynamic typing**.

### Variable Naming Rules

Python has specific rules for naming variables:

```python
# Valid variable names
user_name = "Bob"      # Snake case (recommended style)
userName = "Bob"       # Camel case (works but not preferred)
_private = 42          # Can start with underscore
count2 = 10            # Can contain numbers (but not at start)

# Invalid variable names - these will cause errors!
# 2count = 10          # Cannot start with a number
# user-name = "Bob"    # Cannot contain hyphens
# class = "Math"       # Cannot use reserved keywords
```

**Convention:** Python programmers use `snake_case` for variable names (lowercase with underscores). This is defined in PEP 8, Python's style guide.

### The Four Basic Data Types

Python has four fundamental data types you'll use constantly:

**1. Integers (int)** - Whole numbers without decimal points

```python
count = 42
negative = -17
zero = 0
big_number = 1_000_000  # Underscores improve readability

print(type(count))  # Output: <class 'int'>
```

**2. Floating-Point Numbers (float)** - Numbers with decimal points

```python
price = 19.99
pi = 3.14159
scientific = 2.5e-3  # Scientific notation: 0.0025

print(type(price))  # Output: <class 'float'>
```

**3. Strings (str)** - Text enclosed in quotes

```python
single = 'Hello'           # Single quotes
double = "World"           # Double quotes (same as single)
multiline = """This is
a multiline
string"""                  # Triple quotes for multiple lines

# String operations
greeting = "Hello" + " " + "World"  # Concatenation
repeated = "Ha" * 3                  # Repetition: "HaHaHa"
length = len(greeting)               # Length: 11
```

**4. Booleans (bool)** - True or False values

```python
is_active = True
has_permission = False

# Booleans from comparisons
is_adult = age >= 18      # True if age is 18 or more
is_empty = len(name) == 0  # True if name has no characters
```

### Type Conversion (Casting)

You can convert between types using built-in functions:

```python
# String to number
age_str = "25"
age_int = int(age_str)      # 25 (integer)
price_float = float("19.99")  # 19.99 (float)

# Number to string
count = 42
count_str = str(count)      # "42" (string)

# To boolean
bool(1)      # True (any non-zero number is True)
bool(0)      # False
bool("")     # False (empty string)
bool("Hi")   # True (non-empty string)

# Be careful with invalid conversions!
# int("hello")  # ValueError - can't convert text to int
# int("3.14")   # ValueError - use float() first, then int()
```

---

## Common Patterns and Idioms

### Swapping Variables

Python has an elegant way to swap values without a temporary variable:

```python
a = 5
b = 10
a, b = b, a  # Now a=10, b=5
```

### Multiple Assignment

Assign multiple variables at once:

```python
x, y, z = 1, 2, 3
name, age, city = "Alice", 30, "NYC"
```

### Checking Types

Use `type()` for debugging and `isinstance()` for checking:

```python
value = 42
print(type(value))              # <class 'int'>
print(isinstance(value, int))   # True
print(isinstance(value, (int, float)))  # True - check multiple types
```

### String Formatting (f-strings)

The modern way to embed variables in strings:

```python
name = "Alice"
age = 30
message = f"My name is {name} and I am {age} years old."
# Output: "My name is Alice and I am 30 years old."

# You can include expressions
price = 19.99
print(f"Total: ${price * 1.1:.2f}")  # "Total: $21.99"
```

---

## Common Mistakes and Debugging

### Mistake 1: Using Undefined Variables

```python
# Wrong - using a variable before defining it
print(username)  # NameError: name 'username' is not defined

# Fix - define the variable first
username = "Alice"
print(username)
```

### Mistake 2: Type Mismatches

```python
# Wrong - can't concatenate string and integer
age = 25
message = "I am " + age + " years old"  # TypeError!

# Fix - convert to string
message = "I am " + str(age) + " years old"
# Or better, use f-strings
message = f"I am {age} years old"
```

### Mistake 3: Integer Division Confusion

```python
# In Python 3, division always returns float
result = 5 / 2   # 2.5 (float)
result = 4 / 2   # 2.0 (still float!)

# Use // for integer division
result = 5 // 2  # 2 (integer)
```

### Mistake 4: Modifying Strings

```python
# Strings are immutable - you can't change them in place
name = "Alice"
# name[0] = "B"  # TypeError!

# Fix - create a new string
name = "B" + name[1:]  # "Blice"
```

---

## Best Practices

1. **Use descriptive names**: `user_age` is better than `x` or `a`

2. **Follow naming conventions**: Use `snake_case` for variables, `UPPER_CASE` for constants

3. **Initialize variables before use**: Define variables at the top of their scope

4. **Use type hints for clarity** (optional but helpful):
```python
age: int = 25
name: str = "Alice"
```

5. **Prefer f-strings** over concatenation or .format()

6. **Don't use single letters** except for loop counters (`i`, `j`) or coordinates (`x`, `y`)

---

## Summary

You've learned the foundations of working with data in Python:

- **Variables** store data using the assignment operator (`=`)
- **Four basic types**: `int` (whole numbers), `float` (decimals), `str` (text), `bool` (True/False)
- **Dynamic typing** means Python determines types automatically
- **Type conversion** uses `int()`, `float()`, `str()`, `bool()`
- **f-strings** are the modern way to format strings with variables

**Key takeaways:**
- Always use descriptive, snake_case variable names
- Be mindful of types when doing operations
- Use `type()` to debug type-related errors

---

## Further Exploration

Ready for more? Try these challenges:
- What happens when you add very large integers? (Python handles them!)
- Explore string methods: `.upper()`, `.lower()`, `.split()`, `.strip()`
- Learn about `None` - Python's way of representing "no value"