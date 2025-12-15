## Classic Recursive Problems

These examples help you practice the “base case + recursive case” mindset.

---

## Factorial

```python
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)
```

---

## Sum of a List

```python
def sum_list(values):
    if len(values) == 0:
        return 0
    return values[0] + sum_list(values[1:])
```

---

## Reverse a String

```python
def reverse_string(s):
    if len(s) <= 1:
        return s
    return s[-1] + reverse_string(s[:-1])
```

---

## Power (Exponentiation)

```python
def power(base, exp):
    if exp == 0:
        return 1
    return base * power(base, exp - 1)
```

