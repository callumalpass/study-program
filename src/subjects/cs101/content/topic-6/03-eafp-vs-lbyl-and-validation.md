---
id: cs101-t6-eafp
title: "EAFP vs LBYL and Validation"
order: 3
---

## EAFP vs LBYL: Two Approaches to Error Prevention

When writing code that might fail, you have two main strategies: check conditions before attempting an operation, or attempt the operation and handle any errors. Python has names for these approaches, and understanding when to use each makes your code cleaner and more robust.

---

## LBYL: Look Before You Leap

LBYL means checking that conditions are right before attempting an operation:

```python
from pathlib import Path

path = Path("data.txt")

# LBYL: Check first, then act
if path.exists():
    content = path.read_text(encoding="utf-8")
else:
    content = ""
```

```python
# LBYL with dictionary access
if "name" in person:
    name = person["name"]
else:
    name = "Unknown"

# LBYL with list access
if len(items) > 0:
    first = items[0]
else:
    first = None
```

### Advantages of LBYL

1. **Explicit intent** - The code clearly shows what conditions you're checking
2. **No exception overhead** - Checking a condition is faster than raising/catching exceptions
3. **Familiar to programmers** from other languages

### Disadvantages of LBYL

1. **Race conditions** - The condition might change between checking and acting:

```python
# Problem: file could be deleted between check and open
if path.exists():
    # Another process deletes the file here!
    content = path.read_text()  # Still crashes
```

2. **Verbose** - Multiple checks can make code harder to read:

```python
if data is not None:
    if "users" in data:
        if len(data["users"]) > 0:
            if "name" in data["users"][0]:
                name = data["users"][0]["name"]
```

3. **Repeated checks** - You might check the same condition multiple times

---

## EAFP: Easier to Ask Forgiveness than Permission

EAFP means attempting the operation and handling any exceptions:

```python
# EAFP: Try it, handle failure
try:
    content = Path("data.txt").read_text(encoding="utf-8")
except FileNotFoundError:
    content = ""
```

```python
# EAFP with dictionary access
try:
    name = person["name"]
except KeyError:
    name = "Unknown"

# EAFP with list access
try:
    first = items[0]
except IndexError:
    first = None
```

### Advantages of EAFP

1. **Atomic** - No race condition between check and action
2. **Clean happy path** - The success case reads naturally
3. **Handles unexpected errors** - Exceptions catch problems you didn't anticipate
4. **Pythonic** - This style is encouraged in Python

### Disadvantages of EAFP

1. **Exception overhead** - Raising exceptions is slower than checking conditions
2. **Can hide bugs** - Catching too broadly masks real problems
3. **Less explicit** - The conditions being checked are implicit in what you catch

---

## Python Favors EAFP

Python culture generally prefers EAFP for several reasons:

1. **Duck typing** - Python doesn't check types upfront; it tries operations and fails if they don't work
2. **Exception handling is cheap** - Python's exception mechanism is optimized
3. **Cleaner code** - The happy path is uninterrupted by checks

Consider this comparison:

```python
# LBYL - many conditions to check
def get_nested_value(data, key1, key2):
    if data is not None:
        if isinstance(data, dict):
            if key1 in data:
                if isinstance(data[key1], dict):
                    if key2 in data[key1]:
                        return data[key1][key2]
    return None

# EAFP - cleaner code
def get_nested_value(data, key1, key2):
    try:
        return data[key1][key2]
    except (TypeError, KeyError):
        return None
```

The EAFP version is shorter and easier to read.

---

## When to Use Each Approach

### Use LBYL When:

**The check is cheap and the condition is likely false:**

```python
# Most inputs are valid, but check the common error case
if divisor == 0:
    return 0
return number / divisor
```

**You're validating user input at a boundary:**

```python
text = input("Enter age: ").strip()
if not text.isdigit():
    print("Please enter a number")
elif int(text) < 0:
    print("Age cannot be negative")
else:
    age = int(text)
```

**The condition is more informative than the exception:**

```python
# LBYL - gives specific feedback
if len(password) < 8:
    print("Password too short")
elif not any(c.isdigit() for c in password):
    print("Password needs at least one digit")
else:
    save_password(password)
```

### Use EAFP When:

**Race conditions are possible:**

```python
# File could be deleted between check and open
try:
    with open(path) as f:
        content = f.read()
except FileNotFoundError:
    content = ""
```

**The check would duplicate the operation:**

```python
# Checking requires parsing; just parse once
try:
    data = json.loads(text)
except json.JSONDecodeError:
    data = None
```

**Multiple conditions would need checking:**

```python
# EAFP handles all failure modes at once
try:
    result = data["users"][0]["profile"]["email"]
except (KeyError, IndexError, TypeError):
    result = None
```

**The failure case is rare:**

```python
# Most calls succeed, so optimize for success
try:
    return cache[key]
except KeyError:
    value = compute_expensive_value(key)
    cache[key] = value
    return value
```

---

## Input Validation: A Special Case

User input validation often combines both approaches. You validate structure with LBYL but handle parsing errors with EAFP:

```python
def get_positive_integer(prompt):
    """Get a positive integer from the user."""
    while True:
        text = input(prompt).strip()

        # LBYL: Check for empty input
        if not text:
            print("Please enter something")
            continue

        # EAFP: Handle conversion errors
        try:
            number = int(text)
        except ValueError:
            print("That's not a valid number")
            continue

        # LBYL: Check the value
        if number <= 0:
            print("Please enter a positive number")
            continue

        return number
```

### Why Mix Both?

- **Empty input check** (LBYL): Gives immediate, specific feedback
- **Conversion** (EAFP): `int()` already does the validation; no need to duplicate it
- **Range check** (LBYL): Clearer error message than catching an exception

---

## Safe Access Methods

Python provides methods that make LBYL unnecessary in common cases:

### Dictionary `.get()`

```python
# Instead of LBYL
if "name" in person:
    name = person["name"]
else:
    name = "Unknown"

# Or EAFP
try:
    name = person["name"]
except KeyError:
    name = "Unknown"

# Use .get() - built-in safe access
name = person.get("name", "Unknown")
```

### Dictionary `.setdefault()`

```python
# Get value, inserting default if missing
count = word_counts.setdefault(word, 0)
word_counts[word] = count + 1
```

### `getattr()` for Attributes

```python
# Instead of hasattr + getattr
if hasattr(obj, "name"):
    name = obj.name
else:
    name = "Unknown"

# Use getattr with default
name = getattr(obj, "name", "Unknown")
```

### List Slicing (Never Raises)

```python
# Slicing returns empty list if out of range
first_three = items[:3]  # Works even if len(items) < 3

# But indexing raises
first = items[0]  # IndexError if empty
```

---

## Validation Best Practices

### Validate at Boundaries

Check input at the edges of your system, then trust internal data:

```python
def process_user_input(text):
    """Validate and convert user input."""
    # Boundary: strict validation
    text = text.strip()
    if not text:
        raise ValueError("Input cannot be empty")
    if not text.isdigit():
        raise ValueError("Input must be a number")
    return int(text)

def internal_calculation(number):
    """Work with validated data - no need to recheck."""
    # Internal: trust the data
    return number * 2 + 10
```

### Fail Fast

Validate early and raise exceptions immediately when something is wrong:

```python
def create_user(name, age, email):
    """Create a user with validated data."""
    # Fail fast: check all inputs upfront
    if not name or not name.strip():
        raise ValueError("Name cannot be empty")
    if not isinstance(age, int) or age < 0:
        raise ValueError("Age must be a non-negative integer")
    if "@" not in email:
        raise ValueError("Invalid email format")

    # Now proceed with confidence
    return {"name": name.strip(), "age": age, "email": email}
```

---

## Key Takeaways

- **LBYL** checks conditions before acting - explicit but can have race conditions
- **EAFP** tries operations and handles exceptions - atomic and often cleaner
- Python generally favors EAFP due to duck typing and exception optimization
- Use **LBYL** for cheap checks, user validation, and informative error messages
- Use **EAFP** for race-prone operations, complex conditions, and rare failures
- Use **safe access methods** like `.get()` when available
- Validate at **system boundaries**, then trust internal data
- **Fail fast** - catch problems early with clear error messages

