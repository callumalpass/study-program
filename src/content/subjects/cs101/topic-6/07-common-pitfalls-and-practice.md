## Common Pitfalls

---

## Catching Too Broadly

```python
# Avoid: hides real problems
try:
    result = calculate(data)
except Exception:
    print("Error")
```

Prefer catching specific exceptions, or re-raise after logging.

---

## Silencing Errors

```python
# Avoid: silent failure
try:
    process_data(data)
except Exception:
    pass
```

At minimum, log or print the error message so you can debug.

---

## Resource Leaks (Forgetting to Close)

Use context managers (`with`) for files and other resources.

---

## Practice Exercises

1. Write a function `safe_int(text)` that returns an integer or `None` if invalid.
2. Write code that reads a file and prints a friendly message if it doesn’t exist.
3. Create a custom exception `InvalidMoveError` for a tiny game and raise it on invalid input.
4. Take a buggy program, read the traceback, and write down the call chain from top to bottom.
5. Add assertions to a function that computes an average to protect against empty input.

