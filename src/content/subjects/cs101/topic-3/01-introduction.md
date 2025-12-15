## Functions: Why They Matter

Functions help you write code that is:

- **Reusable**: write once, call many times
- **Readable**: give a meaningful name to a chunk of logic
- **Testable**: you can test a function with different inputs
- **Maintainable**: change logic in one place instead of everywhere

You’ve already used functions like `print()`, `len()`, and `type()`. In this topic, you’ll learn to create your own.

---

## Function Anatomy

```python
def greet(name):
    return f"Hello, {name}!"
```

Parts:
- `def` starts a function definition
- `greet` is the function name
- `(name)` is the parameter list
- The indented block is the function body
- `return` sends a value back to the caller

Calling the function:

```python
message = greet("Alice")
print(message)
```

---

## A Simple “Design Checklist”

Before you write a function, decide:

1. **Inputs**: What information does it need? (parameters)
2. **Output**: What should it produce? (return value)
3. **Responsibility**: What *one job* does it do?

When functions do one clear job, they are much easier to reuse.

