---
id: cs101-t1-bools
title: "Booleans"
order: 5
---

## Booleans (bool)

Booleans represent truth values. There are only two: `True` and `False`. They're essential for making decisions in your code - every `if` statement, every `while` loop, and every conditional expression ultimately depends on booleans.

```python
is_active = True
has_permission = False

print(type(is_active))  # Output: <class 'bool'>
```

Note that `True` and `False` are capitalized - `true` and `false` will cause errors! This is different from languages like JavaScript or Java.

```python
# Correct
is_valid = True
is_valid = False

# Wrong - these are not booleans, they're undefined names
# is_valid = true   # NameError: name 'true' is not defined
# is_valid = false  # NameError: name 'false' is not defined
```

---

## Comparison Operators

Comparisons return boolean values. These are the building blocks of conditional logic:

```python
x = 10
y = 5

# Equality and inequality
print(x == y)   # False (equal to)
print(x != y)   # True (not equal to)

# Ordering
print(x > y)    # True (greater than)
print(x < y)    # False (less than)
print(x >= y)   # True (greater than or equal)
print(x <= y)   # False (less than or equal)

# All comparisons return bool
print(type(x > y))  # <class 'bool'>
```

### Chained Comparisons

Python allows elegant chained comparisons that read like mathematical notation:

```python
age = 25

# Instead of: age >= 18 and age <= 65
print(18 <= age <= 65)  # True

# Check if a value is in a range
x = 50
print(0 < x < 100)  # True

# This also works with more than two comparisons
a, b, c = 1, 2, 3
print(a < b < c)    # True
print(a < b > c)    # False (b is not greater than c)

# Even for equality
x = y = 5
print(x == y == 5)  # True
```

### Comparing Different Types

Python allows comparison between some types but not others:

```python
# Numbers can be compared across types
print(5 == 5.0)    # True (int and float)
print(5 > 4.9)     # True

# Strings are compared lexicographically (dictionary order)
print("apple" < "banana")  # True (a comes before b)
print("Apple" < "apple")   # True (uppercase before lowercase in ASCII)
print("apple" == "Apple")  # False (case-sensitive)

# Can't compare incompatible types
# print("5" > 5)   # TypeError: '>' not supported between str and int
```

---

## Logical Operators

Combine multiple conditions using `and`, `or`, and `not`:

```python
a = True
b = False

# and - True only if BOTH are True
print(a and b)  # False
print(a and a)  # True
print(b and b)  # False

# or - True if AT LEAST ONE is True
print(a or b)   # True
print(b or b)   # False
print(a or a)   # True

# not - Inverts the value
print(not a)    # False
print(not b)    # True
print(not not a)  # True (double negation)
```

### Operator Precedence

When combining operators, `not` has highest precedence, then `and`, then `or`:

```python
# not > and > or
print(True or False and False)    # True (and evaluated first)
print((True or False) and False)  # False (parentheses override)

print(not False and True)         # True (not evaluated first)
print(not (False and True))       # True (parentheses change meaning)
```

### Practical Examples

```python
age = 25
has_ticket = True
is_vip = False

# Multiple conditions
can_enter = age >= 18 and has_ticket
print(can_enter)  # True

# Complex conditions with parentheses for clarity
priority_entry = is_vip or (age >= 65 and has_ticket)
print(priority_entry)  # False

# Negation
needs_id = not is_vip
print(needs_id)  # True

# Real-world validation
username = "alice"
password = "secret123"
is_valid = len(username) >= 3 and len(password) >= 8
print(is_valid)  # True
```

### Short-Circuit Evaluation

Python stops evaluating as soon as the result is determined. This is important for efficiency and safety:

```python
# 'and' stops at first False (returns that value)
print(False and print("This won't print"))  # False

# 'or' stops at first True (returns that value)
print(True or print("This won't print"))    # True

# Useful for safe checks - avoids errors
user = None
# This won't crash even if user is None
name = user and user.name  # Returns None (stops at first falsy)

# Safe dictionary access pattern
data = {"key": "value"}
result = "key" in data and data["key"]  # "value"
result = "missing" in data and data["missing"]  # False (safe)

# Default value pattern
name = "" or "Anonymous"  # "Anonymous" (empty string is falsy)
```

---

## Truthiness and Falsiness

In Python, any value can be evaluated as a boolean. This is called "truthiness." Understanding this is crucial for writing Pythonic code.

### Falsy Values (evaluate to False)

```python
# All of these are considered False in boolean context:
bool(False)    # False - the boolean False itself
bool(None)     # False - Python's null value
bool(0)        # False - zero integer
bool(0.0)      # False - zero float
bool(0j)       # False - zero complex
bool("")       # False - empty string
bool([])       # False - empty list
bool({})       # False - empty dict
bool(())       # False - empty tuple
bool(set())    # False - empty set
bool(range(0)) # False - empty range
```

### Truthy Values (evaluate to True)

```python
# Everything else is True:
bool(True)     # True - the boolean True itself
bool(1)        # True - any non-zero number
bool(-1)       # True - negative numbers too
bool(0.1)      # True - any non-zero float
bool("Hello")  # True - non-empty string
bool(" ")      # True - string with just a space (not empty!)
bool([0])      # True - list with one element (even if that element is falsy)
bool({"": ""}) # True - dict with one entry
bool("0")      # True - string containing "0" (not empty!)
bool("False")  # True - string containing "False" (still not empty!)
```

### Using Truthiness in Conditions

```python
name = ""

# Explicit check (more verbose)
if name != "":
    print("Name provided")

# Pythonic way (using truthiness)
if name:
    print("Name provided")
else:
    print("Name is empty")  # This prints

# Common pattern: check before accessing
users = []
if users:
    print(f"First user: {users[0]}")
else:
    print("No users")  # This prints

# Default values with 'or'
username = input_name or "Anonymous"  # Uses "Anonymous" if input_name is empty/None
```

---

## Identity vs Equality

Python has two ways to compare: `==` for equality and `is` for identity.

```python
# == checks if VALUES are equal
# is checks if objects are the SAME OBJECT in memory

a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(a == b)  # True (same values)
print(a is b)  # False (different objects in memory)
print(a is c)  # True (c points to same object as a)

# Use 'is' for None checks (recommended and slightly faster)
value = None
if value is None:
    print("Value is None")

if value is not None:
    print("Value has a value")

# Don't use 'is' for numbers or strings (unreliable due to interning)
x = 1000
y = 1000
print(x is y)  # May be True or False depending on Python implementation!
print(x == y)  # Always True (use this for value comparison)

# Small integers (-5 to 256) are interned, so 'is' works by accident
a = 5
b = 5
print(a is b)  # True (but don't rely on this!)
```

---

## Booleans as Numbers

Booleans are actually a subclass of integers in Python. `True` equals `1` and `False` equals `0`:

```python
print(True + True)   # 2
print(True * 10)     # 10
print(False + 5)     # 5
print(True + 0.5)    # 1.5

# This is useful for counting True values
results = [True, False, True, True, False]
print(sum(results))  # 3 (counts True values)

# Count items matching a condition
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_count = sum(n % 2 == 0 for n in numbers)
print(even_count)  # 5

# Calculate percentage
total = len(results)
true_percentage = sum(results) / total * 100
print(f"{true_percentage}% True")  # 60.0% True
```

---

## Key Takeaways

- `True` and `False` are the only boolean values (must be capitalized!)
- Comparison operators (`==`, `!=`, `<`, `>`, `<=`, `>=`) return booleans
- Logical operators: `and`, `or`, `not` (precedence: not > and > or)
- Python supports chained comparisons: `0 < x < 100`
- **Falsy values**: `False`, `None`, `0`, `0.0`, `""`, `[]`, `{}`, `()`, `set()`
- **Truthy values**: Everything else (including `"0"`, `"False"`, `[0]`)
- Use `==` for value comparison, `is` for identity (especially with `None`)
- Short-circuit evaluation can prevent errors and improve efficiency
- Booleans are integers: `True == 1`, `False == 0`
