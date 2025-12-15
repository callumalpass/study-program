## Exceptions (When Things Go Wrong)

An **exception** is Python’s way of saying: “I can’t continue normally.”

Some exceptions come from the environment:
- A file is missing (`FileNotFoundError`)
- The user types invalid input (`ValueError`)

Some exceptions come from bugs:
- Wrong index (`IndexError`)
- Wrong key (`KeyError`)
- Wrong type (`TypeError`)

Your goal is to:

1. **Prevent** predictable errors (validate input, use safe methods)
2. **Handle** unavoidable errors (file might be missing)
3. **Fix** programmer bugs (use tracebacks and debugging)

---

## Raising vs Handling

When something goes wrong, Python **raises** an exception. If you don’t handle it, the program stops and prints a traceback.

```python
result = 10 / 0  # ZeroDivisionError
```

To handle exceptions, you use `try/except` (next subtopic).

---

## Common Exception Types

| Exception | Typical Cause |
|----------|----------------|
| `ValueError` | Correct type, invalid value (e.g. `int("hi")`) |
| `TypeError` | Wrong type for operation (`"5" + 10`) |
| `ZeroDivisionError` | Divide by zero |
| `FileNotFoundError` | Missing file |
| `IndexError` | List index out of range |
| `KeyError` | Dict key missing |
| `NameError` | Variable not defined |

Knowing these names helps you catch the right problems.

