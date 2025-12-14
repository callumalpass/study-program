## Introduction

Programs don't always work perfectly. Users enter unexpected input, files go missing, networks fail, and bugs lurk in code. Error handling and debugging are essential skills for writing robust, reliable software. This topic covers how Python handles errors, how to write code that gracefully handles problems, and techniques for finding and fixing bugs.

**Learning Objectives:**
- Understand exceptions and the error hierarchy
- Use try/except/else/finally for error handling
- Raise custom exceptions when appropriate
- Apply debugging techniques to find and fix bugs
- Use assertions for defensive programming
- Read and interpret Python tracebacks

---

## Core Concepts

### What Are Exceptions?

Exceptions are Python's way of signaling that something went wrong. When an error occurs, Python "raises" an exception that interrupts normal program flow.

```python
# This raises a ZeroDivisionError
result = 10 / 0

# This raises a FileNotFoundError
file = open("nonexistent.txt")

# This raises an IndexError
numbers = [1, 2, 3]
print(numbers[10])

# This raises a KeyError
data = {"name": "Alice"}
print(data["age"])

# This raises a TypeError
result = "5" + 10

# This raises a ValueError
number = int("hello")
```

### Common Exception Types

| Exception | When It Occurs |
|-----------|----------------|
| `ZeroDivisionError` | Dividing by zero |
| `FileNotFoundError` | File doesn't exist |
| `IndexError` | List index out of range |
| `KeyError` | Dictionary key not found |
| `TypeError` | Wrong type for operation |
| `ValueError` | Right type, wrong value |
| `NameError` | Variable not defined |
| `AttributeError` | Object lacks attribute |
| `ImportError` | Module can't be imported |

### Try/Except Blocks

Handle exceptions with try/except to prevent crashes:

```python
# Basic try/except
try:
    number = int(input("Enter a number: "))
    result = 100 / number
    print(f"Result: {result}")
except ZeroDivisionError:
    print("Cannot divide by zero!")
except ValueError:
    print("That's not a valid number!")
```

### Catching Multiple Exceptions

```python
# Multiple exceptions in one handler
try:
    value = my_dict[key]
    result = 10 / value
except (KeyError, ZeroDivisionError) as e:
    print(f"Error occurred: {e}")

# Catching all exceptions (use sparingly!)
try:
    risky_operation()
except Exception as e:
    print(f"Something went wrong: {e}")
```

### The else and finally Clauses

```python
try:
    file = open("data.txt", "r")
    content = file.read()
except FileNotFoundError:
    print("File not found!")
    content = None
else:
    # Runs only if no exception occurred
    print("File read successfully!")
finally:
    # Always runs, whether exception occurred or not
    print("Cleanup complete")
```

### Raising Exceptions

Raise exceptions to signal errors in your own code:

```python
def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

def set_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    if age > 150:
        raise ValueError("Age seems unrealistic")
    return age
```

### Creating Custom Exceptions

```python
class InvalidEmailError(Exception):
    """Raised when an email address is invalid."""
    pass

class InsufficientFundsError(Exception):
    """Raised when account balance is too low."""
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        super().__init__(f"Balance {balance} is less than {amount}")

# Using custom exceptions
def validate_email(email):
    if "@" not in email:
        raise InvalidEmailError(f"Invalid email: {email}")
    return True
```

---

## Debugging Techniques

### Reading Tracebacks

When an exception occurs, Python shows a traceback:

```
Traceback (most recent call last):
  File "program.py", line 15, in <module>
    result = calculate(data)
  File "program.py", line 8, in calculate
    return process(items[0])
  File "program.py", line 3, in process
    return value / 0
ZeroDivisionError: division by zero
```

Read from bottom to top:
1. The exception type and message (bottom)
2. The line that caused the error
3. The chain of function calls that led there

### Print Debugging

The simplest debugging technique:

```python
def find_average(numbers):
    print(f"DEBUG: Input is {numbers}")  # Check input
    print(f"DEBUG: Type is {type(numbers)}")  # Check type

    total = sum(numbers)
    print(f"DEBUG: Total is {total}")  # Check intermediate value

    count = len(numbers)
    print(f"DEBUG: Count is {count}")  # Check another value

    return total / count
```

### Using Assertions

Assertions check conditions that should always be true:

```python
def calculate_average(numbers):
    assert len(numbers) > 0, "List cannot be empty"
    assert all(isinstance(n, (int, float)) for n in numbers), "All items must be numbers"
    return sum(numbers) / len(numbers)

def set_percentage(value):
    assert 0 <= value <= 100, f"Percentage must be 0-100, got {value}"
    return value
```

Assertions are for catching programmer errors, not user input errors.

### Common Bug Patterns

**Off-by-one errors:**
```python
# Wrong: misses last element
for i in range(len(items) - 1):
    process(items[i])

# Correct
for i in range(len(items)):
    process(items[i])
```

**Mutable default arguments:**
```python
# Wrong: list is shared between calls
def add_item(item, items=[]):
    items.append(item)
    return items

# Correct
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items
```

**Modifying list while iterating:**
```python
# Wrong: skips elements
numbers = [1, 2, 3, 4, 5]
for num in numbers:
    if num % 2 == 0:
        numbers.remove(num)

# Correct: iterate over a copy
for num in numbers[:]:
    if num % 2 == 0:
        numbers.remove(num)
```

---

## Common Mistakes and Debugging

### Mistake 1: Catching Too Broadly

```python
# Wrong - hides real bugs
try:
    result = calculate(data)
except:
    print("Error")

# Better - catch specific exceptions
try:
    result = calculate(data)
except ValueError as e:
    print(f"Invalid value: {e}")
except TypeError as e:
    print(f"Type error: {e}")
```

### Mistake 2: Silencing Exceptions

```python
# Wrong - swallows important errors
try:
    process_data(data)
except Exception:
    pass  # Silent failure!

# Better - at least log the error
try:
    process_data(data)
except Exception as e:
    print(f"Warning: {e}")  # Or use proper logging
```

### Mistake 3: Not Using finally for Cleanup

```python
# Wrong - file might not close on error
file = open("data.txt")
data = process(file.read())  # If this fails, file stays open
file.close()

# Correct - use context manager or finally
with open("data.txt") as file:
    data = process(file.read())
# File automatically closed
```

---

## Best Practices

1. **Catch specific exceptions** - Don't use bare `except:`
2. **Don't silence errors** - At minimum, log them
3. **Use finally for cleanup** - Or better, use context managers
4. **Raise exceptions early** - Fail fast when input is invalid
5. **Include helpful error messages** - Make debugging easier
6. **Use assertions for invariants** - Catch programming errors early
7. **Read tracebacks carefully** - They tell you exactly what went wrong

---

## Summary

You've learned essential error handling and debugging skills:

- **Exceptions** signal errors in Python programs
- **try/except** blocks catch and handle exceptions gracefully
- **else/finally** clauses handle success and cleanup cases
- **raise** creates exceptions in your own code
- **Custom exceptions** make your code's error handling clearer
- **Tracebacks** show you exactly where and why errors occurred
- **Debugging techniques** help you find and fix bugs systematically
