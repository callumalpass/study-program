## Two Common Styles: LBYL vs EAFP

Python code often follows one of two styles:

- **LBYL** (“Look Before You Leap”): check conditions before doing something
- **EAFP** (“Easier to Ask Forgiveness than Permission”): try the operation and handle exceptions

Example (reading a file):

```python
from pathlib import Path

path = Path("data.txt")

# LBYL
if path.exists():
    content = path.read_text(encoding="utf-8")
else:
    content = ""
```

```python
# EAFP
try:
    content = Path("data.txt").read_text(encoding="utf-8")
except FileNotFoundError:
    content = ""
```

Both are valid. In Python, EAFP is very common, especially when race conditions are possible (a file could disappear after `exists()`).

---

## Validate User Input vs Catch Exceptions

If you can validate cheaply, do it:

```python
text = input("Age: ").strip()
if not text.isdigit():
    print("Digits only")
else:
    age = int(text)
```

If validation is complicated, it’s often simpler to try and catch:

```python
try:
    age = int(input("Age: "))
except ValueError:
    print("Invalid age")
```

