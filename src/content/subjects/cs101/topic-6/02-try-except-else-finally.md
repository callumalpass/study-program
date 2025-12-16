## `try` / `except`: Catching Exceptions

The `try/except` statement is Python's primary mechanism for handling exceptions. It lets you attempt risky operations and specify what to do if they fail. Mastering this construct is essential for writing robust programs that handle errors gracefully instead of crashing.

---

## Basic Structure

The simplest form wraps risky code in a `try` block and specifies what to do if an exception occurs:

```python
try:
    number = int(input("Enter a number: "))
    print(f"You entered: {number}")
except ValueError:
    print("That's not a valid number!")
```

If the user enters valid input like `"42"`, the code runs normally. If they enter `"hello"`, a `ValueError` is raised, Python skips the rest of the `try` block, and executes the `except` block instead.

### How It Works

1. Python executes the code inside `try`
2. If no exception occurs, it skips the `except` block entirely
3. If an exception occurs that matches the `except` clause, it runs that block
4. If an exception occurs that doesn't match, it propagates up (possibly crashing the program)

```python
try:
    x = 10 / 2  # No exception
    print(x)    # Prints: 5.0
except ZeroDivisionError:
    print("Division failed")
# The except block never runs
```

---

## Catching Multiple Exception Types

Often, a block of code can raise different types of exceptions. You can handle each one differently:

```python
try:
    number = int(input("Enter a number: "))
    result = 100 / number
    print(f"Result: {result}")
except ValueError:
    print("That's not a valid number!")
except ZeroDivisionError:
    print("Cannot divide by zero!")
```

Python checks each `except` clause in order. The first one that matches the exception type handles it.

### Catching Multiple Types in One Handler

If you want to handle several exception types the same way, group them in a tuple:

```python
try:
    value = int(input("Enter number: "))
    data = [1, 2, 3]
    print(data[value])
except (ValueError, IndexError):
    print("Invalid input - please enter 0, 1, or 2")
```

This is cleaner than duplicating the same error-handling code.

---

## Capturing the Exception Object

Use `as` to capture the exception object and access its details:

```python
try:
    number = int("not a number")
except ValueError as e:
    print(f"Conversion failed: {e}")
    # Output: Conversion failed: invalid literal for int() with base 10: 'not a number'
```

The exception object often contains useful information:

```python
try:
    with open("missing.txt") as file:
        content = file.read()
except FileNotFoundError as e:
    print(f"Error: {e.filename} not found")
    print(f"Error number: {e.errno}")
```

### Getting Exception Details

Different exception types have different attributes:

```python
try:
    numbers = [1, 2, 3]
    print(numbers[10])
except IndexError as e:
    print(f"Message: {e}")
    print(f"Args: {e.args}")
```

---

## The `else` Clause

The `else` clause runs only if the `try` block completes without raising an exception:

```python
try:
    number = int(input("Enter a number: "))
except ValueError:
    print("Invalid input!")
else:
    print(f"Success! You entered {number}")
    result = number * 2
    print(f"Doubled: {result}")
```

### Why Use `else`?

The `else` clause keeps the success path separate from error handling. Compare:

```python
# Without else - harder to see what's risky vs follow-up
try:
    number = int(input("Enter a number: "))
    # Is this line risky? Or just follow-up?
    result = number * 2
    print(f"Doubled: {result}")
except ValueError:
    print("Invalid input!")

# With else - clear separation
try:
    number = int(input("Enter a number: "))  # This is the risky operation
except ValueError:
    print("Invalid input!")
else:
    # This is safe follow-up code that shouldn't be in try
    result = number * 2
    print(f"Doubled: {result}")
```

The `else` block is particularly useful when you don't want to catch exceptions from the follow-up code:

```python
try:
    data = json.load(file)
except json.JSONDecodeError:
    print("Invalid JSON")
else:
    # If process_data raises an exception, we DON'T want to catch it
    # It would be a bug, not a JSON parsing error
    process_data(data)
```

---

## The `finally` Clause

The `finally` clause **always runs**, whether an exception occurred or not. It's used for cleanup operations that must happen regardless of success or failure:

```python
try:
    file = open("data.txt", "r")
    content = file.read()
    process(content)
except FileNotFoundError:
    print("File not found!")
finally:
    # This runs no matter what
    print("Cleanup complete")
```

### Guaranteed Execution

The `finally` block runs even if:
- The `try` block succeeds
- An exception is caught
- An exception is not caught (before it propagates)
- A `return` statement is executed

```python
def read_file():
    try:
        with open("data.txt") as f:
            return f.read()
    except FileNotFoundError:
        return ""
    finally:
        print("This always prints!")  # Runs even after return

result = read_file()
# Output: This always prints!
```

### Resource Cleanup

The classic use case is releasing resources:

```python
file = None
try:
    file = open("data.txt", "r")
    content = file.read()
    process(content)
except FileNotFoundError:
    print("File not found!")
finally:
    if file is not None:
        file.close()  # Always close, even if error occurred
```

However, in modern Python, the `with` statement handles this more elegantly:

```python
# Preferred approach - with handles cleanup automatically
try:
    with open("data.txt", "r") as file:
        content = file.read()
        process(content)
except FileNotFoundError:
    print("File not found!")
```

---

## Complete Structure

You can combine all four clauses:

```python
try:
    # Code that might raise exceptions
    file = open("data.txt", "r")
    data = file.read()
    number = int(data)
except FileNotFoundError:
    print("File not found!")
    number = 0
except ValueError:
    print("File doesn't contain a valid number!")
    number = 0
else:
    # Only runs if no exception occurred
    print(f"Successfully read: {number}")
finally:
    # Always runs
    print("Operation complete")
```

The order must be: `try`, then `except` (zero or more), then `else` (optional), then `finally` (optional).

---

## Catching All Exceptions (Use Carefully)

You can catch all exceptions with a bare `except` or `except Exception`:

```python
try:
    risky_operation()
except Exception as e:
    print(f"Something went wrong: {e}")
```

**Warning:** This is usually a bad idea because:
- It catches bugs that you should fix
- It makes debugging harder
- It can hide the real cause of problems

If you must catch broadly, at least log the exception:

```python
import traceback

try:
    risky_operation()
except Exception as e:
    print(f"Error: {e}")
    traceback.print_exc()  # Print full traceback for debugging
    # Handle the error somehow
```

### When Broad Catching Is Acceptable

- At the top level of your program to prevent crashes
- In long-running services that should continue after errors
- When logging all errors for later analysis

```python
# Top-level handler in a server
while True:
    try:
        request = get_next_request()
        handle_request(request)
    except Exception as e:
        log_error(e)
        send_error_response()
        # Continue processing other requests
```

---

## Nested Try/Except

You can nest try/except blocks when inner operations have their own error handling:

```python
try:
    with open("config.json", "r") as file:
        try:
            config = json.load(file)
        except json.JSONDecodeError:
            print("Invalid JSON format")
            config = {}
except FileNotFoundError:
    print("Config file not found")
    config = {}
```

However, deeply nested error handling becomes hard to read. Consider refactoring into functions:

```python
def load_config(path):
    """Load config from file, returning empty dict on any error."""
    try:
        with open(path, "r") as file:
            return json.load(file)
    except FileNotFoundError:
        print("Config file not found")
        return {}
    except json.JSONDecodeError:
        print("Invalid JSON format")
        return {}

config = load_config("config.json")
```

---

## Key Takeaways

- `try` wraps code that might raise exceptions
- `except` handles specific exception types - list the most specific first
- Use `as` to capture the exception object for details
- `else` runs only if no exception occurred - use it for success-path code
- `finally` always runs - use it for cleanup that must happen
- Avoid catching `Exception` broadly unless you have a good reason
- Keep try blocks small - only wrap the risky code
- The `with` statement is preferred over manual try/finally for resource cleanup

