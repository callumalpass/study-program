## Lambdas and Higher-Order Functions

A **higher-order function** is a function that takes another function as an argument or returns a function.

```python
def apply_twice(func, x):
    return func(func(x))

def double(n):
    return 2 * n

print(apply_twice(double, 3))  # 12
```

---

## Lambda Functions

A `lambda` is a small anonymous function (an expression, not a full block):

```python
square = lambda x: x * x
print(square(4))  # 16
```

Most commonly, lambdas are used for “key functions”:

```python
names = ["Alice", "bob", "CHARLIE"]
print(sorted(names, key=lambda s: s.lower()))
```

If the logic is more than a simple expression, prefer `def`.

---

## Common Pitfalls

### Shadowing Built-ins

Avoid naming variables `list`, `dict`, `sum`, `type`, etc.:

```python
# Bad
list = [1, 2, 3]
```

### Mixing Printing and Returning

```python
# Hard to reuse
def total_price(prices):
    total = sum(prices)
    print(total)

# Better
def total_price(prices):
    return sum(prices)
```

---

## Best Practices

1. Keep functions small and focused (one job).
2. Prefer returning values to printing inside reusable functions.
3. Use keyword arguments for readability.
4. Avoid `global` where possible.
5. Write docstrings for functions others will use.

---

## Practice Exercises

1. Write `is_valid_password(password)` (length, contains digit, contains uppercase).
2. Refactor a small script into 3–5 functions with clear names and return values.
3. Write `sum_all(*numbers)` and `print_profile(**info)`.
4. Write `apply_n_times(func, x, n)` that applies a function repeatedly.

