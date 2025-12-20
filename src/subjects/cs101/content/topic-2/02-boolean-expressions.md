---
id: cs101-t2-booleans
title: "Boolean Expressions"
order: 2
---

## Boolean Expressions (Making True/False Decisions)

Every `if` statement and every `while` loop relies on a **boolean expression**: something that evaluates to `True` or `False`. Understanding how to construct and combine boolean expressions is fundamental to writing effective control flow.

```python
temperature = 21
is_warm = temperature > 18
print(is_warm)       # True
print(type(is_warm)) # <class 'bool'>
```

Boolean expressions are the questions your program asks to make decisions. The quality of your conditions directly affects the correctness of your program.

---

## Comparison Operators

Comparison operators compare two values and produce a boolean result:

```python
x = 10
y = 5

# Equality and inequality
x == y   # False (equal to)
x != y   # True  (not equal to)

# Ordering comparisons
x > y    # True  (greater than)
x < y    # False (less than)
x >= y   # True  (greater than or equal)
x <= y   # False (less than or equal)

# All comparisons return bool
result = x > y
print(type(result))  # <class 'bool'>
```

### Comparing Different Types

Python allows comparing numbers of different types:

```python
# int and float compare by value
print(5 == 5.0)    # True
print(10 > 9.5)    # True

# But comparing incompatible types raises an error
# print("5" > 5)   # TypeError: '>' not supported between str and int
```

### Comparing Strings

Strings compare lexicographically (dictionary order) based on Unicode values. This is rarely what you want for user-facing comparisons:

```python
"apple" < "banana"  # True (a comes before b)
"Apple" < "apple"   # True (uppercase A is 65, lowercase a is 97)
"10" < "2"          # True (string comparison: "1" < "2")
"10" < "9"          # True (compares first character: "1" < "9")
```

If you mean numeric comparisons, convert to numbers first:

```python
int("10") < int("2")  # False (now comparing 10 < 2)
```

For case-insensitive string comparisons:

```python
name1 = "Alice"
name2 = "ALICE"
print(name1 == name2)                # False (case-sensitive)
print(name1.lower() == name2.lower()) # True (case-insensitive)
```

---

## Logical Operators (`and`, `or`, `not`)

Logical operators combine boolean expressions to create more complex conditions.

### `and` - Both Must Be True

```python
age = 20
has_id = True

if age >= 18 and has_id:
    print("Allowed in")

# Truth table for 'and':
# True  and True  → True
# True  and False → False
# False and True  → False
# False and False → False
```

### `or` - At Least One Must Be True

```python
is_student = True
is_senior = False

if is_student or is_senior:
    print("Discount applies")

# Truth table for 'or':
# True  or True  → True
# True  or False → True
# False or True  → True
# False or False → False
```

### `not` - Inverts the Value

```python
is_valid = False

if not is_valid:
    print("Invalid input")

# Truth table for 'not':
# not True  → False
# not False → True
```

### Combining Multiple Operators

```python
age = 25
has_ticket = True
is_vip = False

# Complex condition
can_enter = (age >= 18 and has_ticket) or is_vip
print(can_enter)  # True
```

---

## Short-Circuit Evaluation

Python evaluates boolean expressions left-to-right and stops as soon as the result is determined. This is called short-circuit evaluation.

```python
# With 'and': stops at first False
False and print("Never runs")  # print() is never called

# With 'or': stops at first True
True or print("Never runs")    # print() is never called
```

### Practical Use: Safe Access

Short-circuit evaluation makes code safer by preventing errors:

```python
user = None

# Safe: second part only evaluated if first is True
if user is not None and user.get("name") == "Alice":
    print("Hello Alice")

# Without short-circuit, this would crash:
# user.get("name")  # AttributeError: 'NoneType' has no attribute 'get'
```

### Practical Use: Default Values

```python
# If name is empty/None, use "Anonymous"
name = user_input or "Anonymous"

# Equivalent to:
if user_input:
    name = user_input
else:
    name = "Anonymous"
```

**Caution**: Be careful when `0` or `False` are valid values:

```python
count = 0
value = count or 10  # Bug! value is 10 because 0 is falsy
# Better:
value = 10 if count is None else count
```

---

## Truthiness (What Counts as True/False?)

In boolean contexts, Python automatically converts values to True or False. Understanding "truthiness" is essential for writing Pythonic code.

### Falsy Values (Evaluate to False)

```python
bool(False)     # False - the boolean itself
bool(None)      # False - Python's null value
bool(0)         # False - zero integer
bool(0.0)       # False - zero float
bool("")        # False - empty string
bool([])        # False - empty list
bool({})        # False - empty dict
bool(())        # False - empty tuple
bool(set())     # False - empty set
```

### Truthy Values (Evaluate to True)

```python
bool(True)      # True
bool(1)         # True - any non-zero number
bool(-1)        # True - negative numbers too
bool("hello")   # True - non-empty string
bool(" ")       # True - string with just a space
bool([0])       # True - list containing something (even 0)
bool("False")   # True - the STRING "False" is non-empty!
```

### Using Truthiness in Conditions

```python
name = ""
items = [1, 2, 3]

# Explicit checks (verbose)
if name != "":
    print("Name provided")
if len(items) > 0:
    print("List has items")

# Pythonic way (using truthiness)
if name:
    print("Name provided")
if items:
    print("List has items")

# Checking for empty/None
if not name:
    print("No name entered")
if not items:
    print("List is empty")
```

### Prefer Truthiness Over Explicit Comparisons

```python
# Avoid - verbose and less Pythonic
if items == []:
    print("Empty")
if name != "":
    print("Has name")

# Prefer - cleaner and more idiomatic
if not items:
    print("Empty")
if name:
    print("Has name")
```

---

## Operator Precedence and Parentheses

When combining operators, precedence rules determine order of evaluation:

1. `not` (highest)
2. `and`
3. `or` (lowest)

```python
# Without parentheses - relies on precedence
True or False and False  # True (and evaluated first)

# Equivalent to:
True or (False and False)  # True
```

**Best Practice**: Use parentheses to make intent clear, even when not strictly necessary:

```python
# Clear intent with parentheses
score = 72
passed = (score >= 50) and (score <= 100)

# Even clearer with chained comparison
passed = 50 <= score <= 100
```

### Chained Comparisons

Python supports mathematical-style chained comparisons:

```python
age = 25

# Instead of:
if age >= 18 and age < 65:
    print("Working age")

# You can write:
if 18 <= age < 65:
    print("Working age")

# Works with multiple comparisons
x = 5
if 0 < x < 10 < 100:
    print("x is between 0 and 10, and 10 < 100")
```

---

## Common Pitfalls

### Mistaking `=` for `==`

```python
# Assignment vs comparison
x = 5      # Assignment: x now equals 5
x == 5     # Comparison: returns True

# Python prevents using = in conditions (SyntaxError)
# if x = 5:  # Error! Can't assign in a condition
```

### Comparing Floats Directly

Floating-point arithmetic can produce tiny errors:

```python
print(0.1 + 0.2)        # 0.30000000000000004
print(0.1 + 0.2 == 0.3) # False!
```

For float comparisons, use "close enough":

```python
import math

# Option 1: math.isclose()
if math.isclose(0.1 + 0.2, 0.3):
    print("Equal")

# Option 2: tolerance-based comparison
tolerance = 1e-9
if abs((0.1 + 0.2) - 0.3) < tolerance:
    print("Equal")
```

### Using `is` Instead of `==`

```python
# 'is' checks identity (same object in memory)
# '==' checks equality (same value)

a = [1, 2, 3]
b = [1, 2, 3]
print(a == b)  # True (same values)
print(a is b)  # False (different objects)

# Use 'is' only for None checks
if value is None:
    print("No value")
```

---

## Key Takeaways

- Boolean expressions evaluate to `True` or `False`
- Comparison operators: `==`, `!=`, `<`, `>`, `<=`, `>=`
- Logical operators: `and`, `or`, `not` (precedence: not > and > or)
- Short-circuit evaluation stops early when result is determined
- **Falsy values**: `False`, `None`, `0`, `""`, `[]`, `{}`, `()`
- Use truthiness for cleaner, more Pythonic conditions
- Use parentheses to clarify complex expressions
- Use `==` for value comparison, `is` only for `None` checks
- Be careful with float comparisons - use `math.isclose()` or tolerance
