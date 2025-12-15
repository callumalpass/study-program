## Type Conversion (Casting)

Often you need to convert values from one type to another. Python provides built-in functions for this purpose.

---

## Converting to Integer: int()

```python
# From float (truncates, doesn't round)
print(int(3.7))    # 3
print(int(3.2))    # 3
print(int(-3.7))   # -3 (truncates toward zero)

# From string (must be valid integer format)
print(int("42"))   # 42
print(int("-17"))  # -17
print(int("  5 ")) # 5 (whitespace is stripped)

# From boolean
print(int(True))   # 1
print(int(False))  # 0

# From different bases
print(int("1010", 2))   # 10 (binary to decimal)
print(int("FF", 16))    # 255 (hex to decimal)
print(int("77", 8))     # 63 (octal to decimal)
```

### Common int() Errors

```python
# These will raise ValueError:
# int("hello")     # Can't convert non-numeric string
# int("3.14")      # Can't convert float string directly
# int("")          # Can't convert empty string

# Solution for float strings:
print(int(float("3.14")))  # 3 (convert to float first)
```

---

## Converting to Float: float()

```python
# From integer
print(float(42))    # 42.0

# From string
print(float("3.14"))  # 3.14
print(float("-2.5"))  # -2.5
print(float("42"))    # 42.0 (integers in string form work too)
print(float("1e-3"))  # 0.001 (scientific notation)

# From boolean
print(float(True))   # 1.0
print(float(False))  # 0.0

# Special values
print(float("inf"))   # inf
print(float("-inf"))  # -inf
print(float("nan"))   # nan
```

### Common float() Errors

```python
# These will raise ValueError:
# float("hello")    # Can't convert non-numeric string
# float("")         # Can't convert empty string
# float("1,000")    # Commas are not valid
```

---

## Converting to String: str()

```python
# From numbers
print(str(42))       # "42"
print(str(3.14))     # "3.14"
print(str(-17))      # "-17"

# From boolean
print(str(True))     # "True"
print(str(False))    # "False"

# From other types
print(str(None))     # "None"
print(str([1, 2]))   # "[1, 2]"
print(str({'a': 1})) # "{'a': 1}"
```

String conversion always works - every Python object can be converted to a string.

---

## Converting to Boolean: bool()

Remember the truthiness rules:

```python
# Numbers: 0 is False, everything else is True
print(bool(0))      # False
print(bool(0.0))    # False
print(bool(1))      # True
print(bool(-1))     # True
print(bool(0.001))  # True

# Strings: empty is False, non-empty is True
print(bool(""))     # False
print(bool("0"))    # True (not empty!)
print(bool(" "))    # True (contains a space)
print(bool("False")) # True (it's a non-empty string!)

# Collections: empty is False, non-empty is True
print(bool([]))     # False
print(bool([0]))    # True (contains something)
print(bool({}))     # False
print(bool({0}))    # True

# None is always False
print(bool(None))   # False
```

---

## Type Checking

Before converting, you might want to check a value's type:

### Using type()

```python
value = 42
print(type(value))  # <class 'int'>
print(type(value) == int)  # True

# Getting the type name as a string
print(type(value).__name__)  # "int"
```

### Using isinstance() (Recommended)

```python
value = 42

# Check for single type
print(isinstance(value, int))    # True
print(isinstance(value, float))  # False

# Check for multiple types
print(isinstance(value, (int, float)))  # True

# Why isinstance is better:
# It handles inheritance correctly
print(isinstance(True, int))  # True (bool is subclass of int)
print(type(True) == int)      # False (exact type check)
```

---

## Safe Type Conversion

Always validate user input before converting:

```python
def safe_int(value, default=0):
    """Safely convert to int, returning default on failure."""
    try:
        return int(value)
    except (ValueError, TypeError):
        return default

# Usage
print(safe_int("42"))      # 42
print(safe_int("hello"))   # 0 (default)
print(safe_int("", -1))    # -1 (custom default)
```

### Validating Before Converting

```python
user_input = "42"

# Check if string represents a valid integer
if user_input.lstrip('-').isdigit():
    number = int(user_input)
    print(f"Valid number: {number}")
else:
    print("Invalid input")

# For floats, use try/except (no simple string method)
def is_float(value):
    try:
        float(value)
        return True
    except ValueError:
        return False
```

---

## Common Conversion Patterns

### String to Number with Validation

```python
def parse_number(s):
    """Convert string to int or float as appropriate."""
    try:
        # Try integer first
        if '.' not in s and 'e' not in s.lower():
            return int(s)
        return float(s)
    except ValueError:
        return None

print(parse_number("42"))     # 42 (int)
print(parse_number("3.14"))   # 3.14 (float)
print(parse_number("1e-5"))   # 1e-05 (float)
print(parse_number("hello"))  # None
```

### Rounding Instead of Truncating

```python
# int() truncates (removes decimal)
print(int(3.7))  # 3

# round() rounds to nearest integer
print(round(3.7))  # 4
print(round(3.5))  # 4 (banker's rounding - to nearest even)
print(round(2.5))  # 2 (banker's rounding)

# Always round up or down
import math
print(math.floor(3.7))  # 3 (always down)
print(math.ceil(3.2))   # 4 (always up)
```

---

## Key Takeaways

- `int()`: Converts to integer (truncates floats, parses strings)
- `float()`: Converts to float (can parse scientific notation)
- `str()`: Converts anything to string
- `bool()`: Converts based on truthiness rules
- Use `isinstance()` to check types (handles inheritance)
- Always validate user input before converting
- Use `try/except` for safe conversions
- Remember: `int("3.14")` fails - convert to float first, then to int
