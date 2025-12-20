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

### Returning `None` (Implicit vs Explicit)

If a function reaches the end without a `return`, it returns `None` automatically:

```python
def say_hi(name):
    print(f"Hi, {name}!")

value = say_hi("Alice")
print(value)  # None
```

Use `return` when you want to produce a value, and `print()` only when you want to display something.

### Returning Multiple Values (Tuple Packing/Unpacking)

Python functions can “return multiple values” by returning a tuple:

```python
def min_max(numbers):
    return min(numbers), max(numbers)

low, high = min_max([3, 1, 4, 1, 5])
print(low, high)  # 1 5
```

### Early Returns and Guard Clauses

Returning early often makes code clearer than deeply nested `if` blocks:

```python
def withdraw(balance, amount):
    if amount <= 0:
        return "Amount must be positive"
    if amount > balance:
        return "Insufficient funds"
    return balance - amount
```

### Default Arguments

Provide default values for optional parameters:

```python
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")                # Output: Hello, Alice!
greet("Bob", "Good morning")  # Output: Good morning, Bob!
```

### Positional vs Keyword Arguments

Arguments can be passed by position or by name:

```python
def describe_pet(animal, name, age):
    return f"{name} is a {age}-year-old {animal}"

describe_pet("dog", "Rex", 5)                       # Positional
describe_pet(animal="dog", name="Rex", age=5)       # Keyword
describe_pet("dog", age=5, name="Rex")              # Mix (positional first)
```

Keyword arguments improve readability, especially when there are many parameters.

### `*args` and `**kwargs` (Flexible Signatures)

Use `*args` to accept any number of positional arguments, and `**kwargs` to accept any number of keyword arguments:

```python
def average(*numbers):
    return sum(numbers) / len(numbers)

print(average(10, 20, 30))  # 20.0

def print_profile(**info):
    for key, value in info.items():
        print(f"{key}: {value}")

print_profile(name="Alice", city="NYC", enrolled=True)
```

You can also unpack a tuple/list or dict into a function call:

```python
values = (3, 5)
print(add(*values))  # same as add(3, 5)

data = {"name": "Rex", "animal": "dog", "age": 5}
print(describe_pet(**data))
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

### The LEGB Rule (Where Python Looks for Names)

When you use a variable name, Python searches in this order:

1. **L**ocal (inside the current function)
2. **E**nclosing (inside any outer function, if nested)
3. **G**lobal (module-level)
4. **B**uilt-in (like `len`, `sum`, `print`)

### `global` and `nonlocal` (Use Sparingly)

You usually want functions that take inputs and return outputs, but sometimes you need to modify an outer variable.

```python
count = 0

def increment_global():
    global count
    count += 1

def make_counter():
    n = 0
    def increment():
        nonlocal n
        n += 1
        return n
    return increment

counter = make_counter()
print(counter())  # 1
print(counter())  # 2
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

### Type Hints (Optional, but Great for Clarity)

Type hints document intent and help tooling:

```python
def full_name(first: str, last: str) -> str:
    return f"{first} {last}"

def mean(values: list[float]) -> float:
    return sum(values) / len(values)
```

### Functions Are Values (Passing Functions Around)

You can pass a function into another function:

```python
def apply_twice(func, x):
    return func(func(x))

def double(n):
    return 2 * n

print(apply_twice(double, 3))  # 12
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

### Mistake 3: Shadowing Built-ins

```python
# Wrong - "list" is the name of a built-in type
list = [1, 2, 3]

# Later...
# list("abc") would crash because list is no longer the type
```

Prefer names like `items`, `values`, `numbers`, `names`.

### Mistake 4: Mixing Printing and Returning

```python
# Confusing - caller can't use the result
def total_price(prices):
    total = sum(prices)
    print(total)

# Better - return the value, caller prints if needed
def total_price(prices):
    return sum(prices)
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

**Key takeaways:**
- Prefer returning values over printing inside “library-style” functions
- Use keyword arguments and type hints to make calls self-documenting
- Avoid `global` unless you have a strong reason

---

## Practice Exercises

1. **Validation function**: Write `is_valid_password(password)` with rules (length, contains digit, etc.) and return `True/False`.
2. **Refactor to functions**: Take a small script you wrote earlier and split it into 3–5 functions with clear names.
3. **`*args` practice**: Write `sum_all(*numbers)` that sums any amount of inputs.
4. **Pure vs impure**: Write one function that returns a computed value, and another that prints a formatted report of that value.

---

## Further Exploration

- Learn about `help(your_function)` and how docstrings show up in interactive tools.
- Explore `functools.lru_cache` for caching (pairs nicely with recursion later).
