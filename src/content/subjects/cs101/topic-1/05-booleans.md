## Booleans (bool)

Booleans represent truth values. There are only two: `True` and `False`. They're essential for making decisions in your code.

```python
is_active = True
has_permission = False

print(type(is_active))  # Output: <class 'bool'>
```

Note that `True` and `False` are capitalized - `true` and `false` will cause errors!

---

## Comparison Operators

Comparisons return boolean values:

```python
x = 10
y = 5

# Comparison operators
print(x == y)   # False (equal to)
print(x != y)   # True (not equal to)
print(x > y)    # True (greater than)
print(x < y)    # False (less than)
print(x >= y)   # True (greater than or equal)
print(x <= y)   # False (less than or equal)
```

### Chained Comparisons

Python allows elegant chained comparisons:

```python
age = 25

# Instead of: age >= 18 and age <= 65
print(18 <= age <= 65)  # True

# Check if a value is in range
x = 50
print(0 < x < 100)  # True
```

### Comparing Strings

Strings are compared lexicographically (dictionary order):

```python
print("apple" < "banana")  # True (a comes before b)
print("Apple" < "apple")   # True (uppercase before lowercase)
print("apple" == "Apple")  # False (case-sensitive)
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

# or - True if AT LEAST ONE is True
print(a or b)   # True
print(b or b)   # False

# not - Inverts the value
print(not a)    # False
print(not b)    # True
```

### Practical Examples

```python
age = 25
has_ticket = True
is_vip = False

# Multiple conditions
can_enter = age >= 18 and has_ticket
print(can_enter)  # True

# Complex conditions
priority_entry = is_vip or (age >= 65)
print(priority_entry)  # False

# Negation
needs_id = not is_vip
print(needs_id)  # True
```

### Short-Circuit Evaluation

Python stops evaluating as soon as the result is determined:

```python
# 'and' stops at first False
False and print("This won't print")

# 'or' stops at first True
True or print("This won't print")

# Useful for safe checks
user = None
# This won't crash even if user is None
name = user and user.name  # Returns None (stops at first falsy)
```

---

## Truthiness and Falsiness

In Python, any value can be evaluated as a boolean. This is called "truthiness."

### Falsy Values (evaluate to False)

```python
# All of these are considered False in boolean context:
bool(False)    # False
bool(None)     # False
bool(0)        # False
bool(0.0)      # False
bool("")       # False (empty string)
bool([])       # False (empty list)
bool({})       # False (empty dict)
bool(())       # False (empty tuple)
bool(set())    # False (empty set)
```

### Truthy Values (evaluate to True)

```python
# Everything else is True:
bool(True)     # True
bool(1)        # True (any non-zero number)
bool(-1)       # True
bool(0.1)      # True
bool("Hello")  # True (non-empty string)
bool([1, 2])   # True (non-empty list)
bool(" ")      # True (string with space - not empty!)
```

### Using Truthiness in Conditions

```python
name = ""

# Explicit check
if name != "":
    print("Name provided")

# Pythonic way (using truthiness)
if name:
    print("Name provided")
else:
    print("Name is empty")  # This prints

# Common pattern: default values
username = input_name or "Anonymous"  # Uses "Anonymous" if input_name is empty
```

---

## Identity vs Equality

Python has two ways to compare:

```python
# == checks if values are equal
# is checks if objects are the same in memory

a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(a == b)  # True (same values)
print(a is b)  # False (different objects)
print(a is c)  # True (same object)

# Use 'is' for None checks (recommended)
value = None
if value is None:
    print("Value is None")

# Don't use 'is' for numbers or strings (unreliable)
x = 1000
y = 1000
print(x is y)  # May be True or False depending on Python implementation!
print(x == y)  # Always True (use this for value comparison)
```

---

## Boolean as Numbers

Booleans are actually a subclass of integers:

```python
print(True + True)   # 2
print(True * 10)     # 10
print(False + 5)     # 5

# Useful for counting True values
results = [True, False, True, True, False]
print(sum(results))  # 3 (counts True values)
```

---

## Key Takeaways

- `True` and `False` are the only boolean values (capitalized!)
- Comparison operators (`==`, `!=`, `<`, `>`, etc.) return booleans
- Logical operators: `and`, `or`, `not`
- **Falsy values**: `False`, `None`, `0`, `""`, `[]`, `{}`, `()`
- **Truthy values**: Everything else
- Use `==` for value comparison, `is` for identity (especially with `None`)
- Short-circuit evaluation can prevent errors and improve efficiency
