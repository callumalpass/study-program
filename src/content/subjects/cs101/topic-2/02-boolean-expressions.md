## Boolean Expressions (Making True/False Decisions)

An `if` statement and a `while` loop both rely on a **boolean expression**: something that evaluates to `True` or `False`.

```python
temperature = 21
is_warm = temperature > 18
print(is_warm)  # True
```

---

## Comparison Operators

Comparison operators compare two values and produce a boolean:

```python
x = 10
y = 5

x == y   # False  (equal)
x != y   # True   (not equal)
x > y    # True
x < y    # False
x >= y   # True
x <= y   # False
```

### Comparing Strings

Strings compare lexicographically (“dictionary order”), but this is rarely what you want for user-facing comparisons:

```python
"apple" < "banana"  # True
"10" < "2"          # True (string comparison, not numeric!)
```

If you mean numeric comparisons, convert first:

```python
int("10") < int("2")  # False
```

---

## Logical Operators (`and`, `or`, `not`)

Logical operators combine boolean expressions.

```python
age = 20
has_id = True

if age >= 18 and has_id:
    print("Allowed in")
```

### Short-Circuit Evaluation

Python evaluates left-to-right and stops as soon as the result is known.

```python
user = None

# Safe: second part is only evaluated if first part is True
if user is not None and user.get("name") == "Alice":
    print("Alice")
```

This makes code safer and faster, but be careful when the right-hand side has side effects.

---

## Truthiness (What Counts as True/False?)

In conditions, Python automatically treats some values as falsey:

Falsey values:
- `False`, `None`
- `0`, `0.0`
- `""` (empty string)
- `[]`, `{}`, `set()` (empty containers)

Everything else is truthy.

```python
name = ""
if not name:
    print("No name entered")

items = [1, 2, 3]
if items:
    print("There are items")
```

### Prefer Truthiness Over Explicit Comparisons

```python
# Avoid
if items == []:
    ...

# Prefer
if not items:
    ...
```

---

## Operator Precedence and Parentheses

Precedence rules can make conditions hard to read. Parentheses make intent clear:

```python
score = 72
passed = (score >= 50) and (score <= 100)
```

Python also supports chained comparisons:

```python
age = 20
if 18 <= age < 65:
    print("Working age")
```

---

## Common Pitfalls

### Mistaking `=` for `==`

Python will not allow `=` inside a condition (it’s a syntax error). That’s a *good thing*—it prevents a very common bug in other languages.

### Comparing Floats Directly

Floating-point values can be slightly imprecise:

```python
0.1 + 0.2 == 0.3  # Often False due to floating-point representation
```

When comparing floats, you often want “close enough”:

```python
abs((0.1 + 0.2) - 0.3) < 1e-9
```

