## Introduction

Functions are the building blocks of organized, reusable code. Instead of writing the same code multiple times, you write it once in a function and call it whenever needed. This topic covers everything from basic function definition to advanced concepts like scope and lambda functions.

**Learning Objectives:**
- Define and call functions with parameters
- Return values from functions
- Understand variable scope (local vs global)
- Use default and keyword arguments
- Write docstrings to document functions
- Create simple lambda functions

---

## Core Concepts

### Defining Functions

Use the `def` keyword to create a function:

```python
def greet():
    print("Hello, World!")

# Call the function
greet()  # Output: Hello, World!
```

### Parameters and Arguments

Functions can accept input through parameters:

```python
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")  # Output: Hello, Alice!
greet("Bob")    # Output: Hello, Bob!

# Multiple parameters
def add(a, b):
    print(f"{a} + {b} = {a + b}")

add(3, 5)  # Output: 3 + 5 = 8
```

### Return Values

Functions can send data back using `return`:

```python
def add(a, b):
    return a + b

result = add(3, 5)
print(result)  # Output: 8
```

### Default Arguments

Provide default values for optional parameters:

```python
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")                # Output: Hello, Alice!
greet("Bob", "Good morning")  # Output: Good morning, Bob!
```

### Variable Scope

Variables have different visibility depending on where they're defined:

```python
# Global variable
message = "Hello"

def greet():
    # Local variable - only exists inside this function
    name = "Alice"
    print(f"{message}, {name}!")  # Can read global variable

greet()           # Output: Hello, Alice!
# print(name)     # NameError! name is not defined here
```

---

## Common Patterns and Idioms

### Docstrings

Document your functions:

```python
def calculate_bmi(weight_kg, height_m):
    """
    Calculate Body Mass Index (BMI).

    Args:
        weight_kg: Weight in kilograms
        height_m: Height in meters

    Returns:
        BMI value as a float
    """
    return weight_kg / (height_m ** 2)
```

### Lambda Functions

Small anonymous functions for simple operations:

```python
# Regular function
def square(x):
    return x ** 2

# Equivalent lambda
square = lambda x: x ** 2

# Often used with sorted
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
sorted_numbers = sorted(numbers, key=lambda x: -x)  # Descending
```

---

## Common Mistakes and Debugging

### Mistake 1: Forgetting to Return

```python
# Wrong - function returns None implicitly
def add(a, b):
    result = a + b
    # Missing return!

total = add(3, 5)
print(total)  # Output: None

# Fix - return the result
def add(a, b):
    return a + b
```

### Mistake 2: Mutable Default Arguments

```python
# Wrong - the list is shared between calls!
def add_item(item, items=[]):
    items.append(item)
    return items

print(add_item(1))  # [1]
print(add_item(2))  # [1, 2] - Unexpected!

# Fix - use None and create new list
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items
```

---

## Best Practices

1. **One function, one job** - Functions should do one thing well
2. **Descriptive names** - Use verbs: `calculate_total()`, `get_user()`, `is_valid()`
3. **Keep functions short** - If over 20-30 lines, consider splitting
4. **Always add docstrings** for public functions
5. **Return values, don't print** - Let the caller decide what to do with results

---

## Summary

You've learned the fundamentals of Python functions:

- **Define functions** with `def` keyword
- **Parameters** receive input; **return** sends output back
- **Default arguments** make parameters optional
- **Keyword arguments** improve readability
- **Scope** determines where variables are visible
- **Lambda** creates small anonymous functions