## The Call Stack (What Recursion “Really” Does)

Every function call creates a new “frame” on the call stack. With recursion, you create many frames—one per recursive call.

Example:

```python
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)
```

Calling `factorial(4)` behaves like:

```
factorial(4)
→ 4 * factorial(3)
→ 4 * (3 * factorial(2))
→ 4 * (3 * (2 * factorial(1)))
→ 4 * (3 * (2 * 1))
→ 24
```

---

## Tracing With Indentation

Tracing helps you see the shape of recursion:

```python
def factorial_traced(n, depth=0):
    indent = "  " * depth
    print(f"{indent}factorial({n})")

    if n <= 1:
        print(f"{indent}return 1")
        return 1

    result = n * factorial_traced(n - 1, depth + 1)
    print(f"{indent}return {result}")
    return result
```

---

## Recursion Depth

Python has a recursion limit (often around 1000). Deep recursion can raise `RecursionError`.

If your recursion might go deep, consider an iterative solution or a different approach.

