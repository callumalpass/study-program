---
id: cs101-t6-exceptions
title: "Exceptions Overview"
order: 1
---

## Exceptions: When Things Go Wrong

Programs don't always run smoothly. Files go missing, users type unexpected input, network connections drop, and calculations produce invalid results. Rather than crashing silently or producing garbage, Python uses **exceptions** to signal when something has gone wrong. Understanding exceptions is essential for writing robust, user-friendly programs.

---

## What Is an Exception?

An **exception** is Python's way of saying: "I encountered a problem and can't continue normally." When an exception occurs, Python stops the current flow of execution and looks for code that can handle the problem. If no handler is found, the program terminates with an error message called a **traceback**.

```python
# This line raises an exception
result = 10 / 0
# ZeroDivisionError: division by zero

# The program stops here - this line never runs
print("This won't print")
```

Exceptions are not necessarily bad. They're a communication mechanism. Some exceptions indicate bugs in your code, while others represent legitimate situations that your program should handle gracefully.

---

## Sources of Exceptions

Exceptions come from two main sources, and understanding the difference helps you handle them appropriately.

### Environmental Errors

These exceptions come from the world outside your program. They're not bugs - they're situations your program must anticipate:

```python
# File doesn't exist
with open("missing.txt", "r") as file:
    content = file.read()
# FileNotFoundError: [Errno 2] No such file or directory

# User types invalid input
age = int(input("Enter age: "))  # User types "twenty"
# ValueError: invalid literal for int()

# Network is down
response = urllib.request.urlopen("http://example.com")
# URLError: <urlopen error [Errno -2] Name or service not known>
```

These exceptions are **expected** in the sense that they can happen during normal operation. Your program should handle them gracefully, perhaps by showing a helpful error message or trying an alternative approach.

### Programmer Errors (Bugs)

These exceptions indicate mistakes in your code. They shouldn't happen if your code is correct:

```python
# Wrong index
numbers = [1, 2, 3]
print(numbers[10])
# IndexError: list index out of range

# Wrong dictionary key
person = {"name": "Alice"}
print(person["age"])
# KeyError: 'age'

# Wrong type for operation
result = "5" + 10
# TypeError: can only concatenate str (not "int") to str

# Variable not defined
print(unknown_variable)
# NameError: name 'unknown_variable' is not defined
```

For these exceptions, the solution is to fix the bug, not to catch the exception and hide it.

---

## Your Three Goals

When dealing with exceptions, you have three distinct goals:

### 1. Prevent Predictable Errors

Use validation and safe methods to avoid errors before they happen:

```python
# Instead of risking KeyError
value = data["key"]  # Might crash

# Use .get() for safe access
value = data.get("key", "default")  # Returns default if missing

# Instead of risking IndexError
if len(items) > 0:
    first = items[0]
else:
    first = None

# Check before division
if divisor != 0:
    result = number / divisor
```

### 2. Handle Unavoidable Errors

Some errors can't be prevented because they depend on external factors:

```python
# File might not exist - handle it gracefully
try:
    with open("config.txt", "r") as file:
        config = file.read()
except FileNotFoundError:
    config = "default settings"
    print("Using default configuration")

# Network might be down
try:
    response = fetch_data_from_api()
except ConnectionError:
    response = load_cached_data()
```

### 3. Fix Programmer Bugs

When exceptions reveal bugs, use tracebacks and debugging to find and fix the root cause:

```python
# Don't just catch and ignore bugs
try:
    process_data(items)
except IndexError:
    pass  # BAD: hides the bug

# Instead, fix the code that caused the bug
# Read the traceback, understand what went wrong, fix it
```

---

## Common Exception Types

Python has many built-in exception types. Knowing the common ones helps you catch the right problems and write clearer error handling.

| Exception | Typical Cause | Example |
|-----------|---------------|---------|
| `ValueError` | Correct type, invalid value | `int("hello")` |
| `TypeError` | Wrong type for operation | `"5" + 10` |
| `ZeroDivisionError` | Division by zero | `10 / 0` |
| `FileNotFoundError` | File doesn't exist | `open("missing.txt")` |
| `IndexError` | List index out of range | `[1,2,3][10]` |
| `KeyError` | Dict key not found | `{"a": 1}["b"]` |
| `NameError` | Variable not defined | `print(undefined)` |
| `AttributeError` | Object lacks attribute | `"text".nonexistent()` |
| `ImportError` | Module can't be imported | `import nonexistent` |
| `PermissionError` | Insufficient permissions | Opening a protected file |
| `RuntimeError` | Generic runtime error | Various runtime problems |

### The Exception Hierarchy

Exceptions form a hierarchy. At the top is `BaseException`, which includes system-exiting exceptions like `KeyboardInterrupt`. Below that is `Exception`, which is the base class for most exceptions you'll work with:

```
BaseException
├── SystemExit
├── KeyboardInterrupt
├── GeneratorExit
└── Exception
    ├── ValueError
    ├── TypeError
    ├── OSError
    │   ├── FileNotFoundError
    │   └── PermissionError
    ├── LookupError
    │   ├── IndexError
    │   └── KeyError
    └── ...
```

This hierarchy matters when catching exceptions. Catching `Exception` catches most errors, while catching `LookupError` catches both `IndexError` and `KeyError`.

---

## Raising vs Handling

Understanding the difference between raising and handling exceptions is fundamental:

**Raising** an exception signals that something went wrong:

```python
def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b
```

**Handling** an exception deals with the problem:

```python
try:
    result = divide(10, 0)
except ValueError as e:
    print(f"Error: {e}")
    result = 0
```

When you raise an exception, you're saying "I've detected a problem." When you handle one, you're saying "I know how to deal with this problem."

---

## Why Not Just Return Error Codes?

Some languages use return values like `-1` or `None` to signal errors. Python prefers exceptions because:

1. **They can't be ignored silently** - unhandled exceptions crash the program with a clear message
2. **They separate error handling from normal logic** - the try/except structure keeps the happy path clean
3. **They carry information** - exception objects contain error messages and tracebacks
4. **They propagate automatically** - you don't need to check and forward error codes at every level

---

## Key Takeaways

- An **exception** is Python's signal that something went wrong
- Exceptions come from **environmental errors** (handle gracefully) or **bugs** (fix the code)
- Your goals are to **prevent** predictable errors, **handle** unavoidable ones, and **fix** bugs
- Common exceptions include `ValueError`, `TypeError`, `FileNotFoundError`, `IndexError`, and `KeyError`
- Exceptions form a hierarchy - catching a parent type catches all its children
- **Raising** signals a problem; **handling** deals with it
- Exceptions are better than error codes because they're explicit and can't be silently ignored

