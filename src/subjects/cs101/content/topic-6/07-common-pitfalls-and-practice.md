---
id: cs101-t6-pitfalls
title: "Common Pitfalls and Practice"
order: 7
---

## Common Pitfalls in Exception Handling

Exception handling is powerful, but it's easy to misuse. Poor exception handling can hide bugs, make debugging impossible, and create security vulnerabilities. This subtopic covers the most common mistakes and how to avoid them.

---

## Pitfall 1: Catching Too Broadly

The most common mistake is catching all exceptions when you should catch specific ones:

```python
# BAD: Catches everything, including bugs
try:
    result = process_data(data)
except Exception:
    print("Something went wrong")
    result = None
```

Why this is dangerous:

1. **Hides bugs** - TypeErrors, NameErrors, and other programming mistakes are silently swallowed
2. **Makes debugging hard** - You don't know what actually failed
3. **Masks the root cause** - The real problem might be somewhere else

```python
# GOOD: Catch specific exceptions you expect
try:
    result = process_data(data)
except FileNotFoundError:
    print("Data file not found")
    result = None
except json.JSONDecodeError:
    print("Invalid data format")
    result = None
```

### When Broad Catching Is Acceptable

Sometimes you need to catch broadly, but always log the actual exception:

```python
# Acceptable: Top-level handler in a long-running service
import traceback

try:
    handle_request(request)
except Exception as e:
    # Log the full error for debugging
    traceback.print_exc()
    # Log to file for later analysis
    logging.error(f"Request failed: {e}", exc_info=True)
    # Send error response
    return {"error": "Internal server error"}
```

---

## Pitfall 2: Silent Failure

Even worse than catching broadly is catching and doing nothing:

```python
# TERRIBLE: Silent failure hides all problems
try:
    process_data(data)
except Exception:
    pass
```

This is almost never correct. At minimum, log the error:

```python
# Better: At least log what happened
try:
    process_data(data)
except Exception as e:
    print(f"Warning: process_data failed: {e}")
    # Or use proper logging
    logging.warning(f"process_data failed: {e}")
```

### The Only Exception

The only time `except: pass` is reasonable is when you truly don't care about failure:

```python
# Acceptable: Cleanup that might fail, doesn't matter if it does
try:
    temp_file.unlink()  # Delete temp file
except OSError:
    pass  # File might already be deleted, that's fine
```

---

## Pitfall 3: Catching and Re-raising Wrong

When you catch an exception to do something and re-raise, do it correctly:

```python
# WRONG: Loses the original traceback
try:
    process(data)
except ValueError as e:
    log_error(e)
    raise ValueError(str(e))  # New exception, loses traceback!

# CORRECT: Bare raise preserves traceback
try:
    process(data)
except ValueError as e:
    log_error(e)
    raise  # Same exception, original traceback

# ALSO CORRECT: Chain exceptions
try:
    process(data)
except ValueError as e:
    raise ProcessingError("Failed to process") from e
```

---

## Pitfall 4: Exceptions in Finally Blocks

If a `finally` block raises an exception, it replaces any exception from the `try` block:

```python
# BAD: Exception in finally hides the original error
try:
    result = 1 / 0  # ZeroDivisionError
finally:
    raise ValueError("Cleanup failed")  # This is what gets raised!
```

Guard against exceptions in finally:

```python
# GOOD: Protect cleanup code
try:
    result = process(data)
finally:
    try:
        cleanup()
    except Exception as e:
        print(f"Cleanup warning: {e}")
        # Don't re-raise; let original exception propagate
```

---

## Pitfall 5: Resource Leaks

Forgetting to release resources even when exceptions occur:

```python
# BAD: File not closed if error occurs
file = open("data.txt")
data = file.read()
process(data)  # If this fails, file stays open!
file.close()

# GOOD: Use context managers
with open("data.txt") as file:
    data = file.read()
    process(data)  # File closes even if this fails
```

Context managers handle cleanup automatically. Use them for:
- Files (`with open(...)`)
- Network connections
- Database connections
- Locks (`with lock:`)
- Temporary files (`with tempfile.NamedTemporaryFile()`)

---

## Pitfall 6: Exceptions in Constructors

If `__init__` raises an exception, `__del__` won't be called:

```python
# Potential leak: if file operations fail, lock isn't released
class Resource:
    def __init__(self):
        self.lock = acquire_lock()
        self.file = open("data.txt")  # If this fails, lock leaks!

    def __del__(self):
        self.file.close()
        release_lock(self.lock)
```

Use context managers or explicit cleanup:

```python
class Resource:
    def __init__(self):
        self.lock = None
        self.file = None
        try:
            self.lock = acquire_lock()
            self.file = open("data.txt")
        except:
            self.close()  # Clean up partial initialization
            raise

    def close(self):
        if self.file:
            self.file.close()
        if self.lock:
            release_lock(self.lock)
```

---

## Pitfall 7: Modifying Exceptions Incorrectly

Don't modify the exception message by string manipulation:

```python
# BAD: Modifying exception message
try:
    process(data)
except ValueError as e:
    e.args = (f"Error in process: {e}",)  # Hacky, fragile
    raise

# GOOD: Use exception chaining
try:
    process(data)
except ValueError as e:
    raise ValueError(f"Error in process: {e}") from e
```

---

## Pitfall 8: Bare `except:`

Never use bare `except:` without a type:

```python
# TERRIBLE: Catches KeyboardInterrupt, SystemExit, everything
try:
    long_running_operation()
except:  # Catches Ctrl+C, can't kill the program!
    pass

# BETTER: At least catch Exception
try:
    long_running_operation()
except Exception:  # Doesn't catch KeyboardInterrupt
    print("Operation failed")
```

The difference: `except:` catches `BaseException`, which includes `KeyboardInterrupt` and `SystemExit`. Users can't Ctrl+C out of your program!

---

## Pitfall 9: Not Handling Expected Exceptions

Failing to handle exceptions that are part of normal operation:

```python
# BAD: Crashes on missing file
def load_config():
    with open("config.json") as f:
        return json.load(f)  # FileNotFoundError if missing!

# GOOD: Handle expected failure
def load_config():
    try:
        with open("config.json") as f:
            return json.load(f)
    except FileNotFoundError:
        return {}  # Default config
```

---

## Best Practices Summary

### Do:

- **Catch specific exceptions** you know how to handle
- **Log exceptions** with full details before handling
- Use **bare `raise`** to re-raise and preserve tracebacks
- Use **context managers** for resource cleanup
- **Fail fast** - let unexpected exceptions crash with full tracebacks

### Don't:

- Catch `Exception` or use bare `except:` unless at top level
- Use `except: pass` - at least log the error
- Catch and re-raise new exceptions without chaining
- Put risky code in `finally` blocks
- Hide exceptions from debugging

---

## Practice Exercises

Test your understanding with these exercises:

### Exercise 1: Safe Integer Conversion

Write a function `safe_int(text)` that:
- Returns the integer value if conversion succeeds
- Returns `None` if conversion fails
- Handles leading/trailing whitespace

```python
safe_int("42")      # Returns 42
safe_int("  42  ")  # Returns 42
safe_int("hello")   # Returns None
safe_int("")        # Returns None
```

### Exercise 2: File Reader with Default

Write a function `read_file_or_default(path, default="")` that:
- Returns the file contents if the file exists
- Returns the default value if the file doesn't exist
- Raises other exceptions (permissions, etc.)

### Exercise 3: Custom Game Exception

Create a simple text game with:
- A custom `InvalidMoveError` exception
- A function `make_move(direction)` that raises it for invalid input
- A game loop that catches the error and asks for a new move

### Exercise 4: Traceback Analysis

Given this traceback, identify:
1. What type of error occurred?
2. What line caused it?
3. What was the call chain?
4. What's the likely fix?

```
Traceback (most recent call last):
  File "main.py", line 20, in <module>
    display_user(user_id)
  File "main.py", line 15, in display_user
    user = get_user(user_id)
  File "main.py", line 8, in get_user
    return users[user_id]
KeyError: 'alice'
```

### Exercise 5: Robust Data Processor

Write a function `process_records(records)` that:
- Processes a list of dictionaries
- Skips records that are missing required fields
- Logs warnings for skipped records
- Returns the list of successfully processed results
- Doesn't crash on any individual record's failure

---

## Key Takeaways

- **Catch specific exceptions** - broad catching hides bugs
- **Never silently swallow exceptions** - at least log them
- Use **bare `raise`** to preserve tracebacks
- Use **context managers** for resource cleanup
- Don't catch `KeyboardInterrupt` unless you know what you're doing
- **Log before handling** so you can debug later
- Test exception handling with intentionally bad input
- When in doubt, let the exception propagate

