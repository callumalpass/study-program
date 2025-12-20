---
id: cs101-t3-lambda
title: "Lambdas, Higher-Order, Pitfalls"
order: 7
---

## Lambdas and Higher-Order Functions

A **higher-order function** is a function that either takes another function as an argument or returns a function. This powerful concept enables flexible, reusable code patterns. **Lambda functions** provide a concise way to create small anonymous functions inline.

---

## Higher-Order Functions

Functions in Python are "first-class objects" - they can be assigned to variables, passed as arguments, and returned from other functions.

### Functions as Arguments

```python
def apply_twice(func, x):
    """Apply a function twice to a value."""
    return func(func(x))

def double(n):
    return n * 2

def square(n):
    return n * n

print(apply_twice(double, 3))  # double(double(3)) = double(6) = 12
print(apply_twice(square, 2))  # square(square(2)) = square(4) = 16
```

Notice that we pass `double` without parentheses - we're passing the function itself, not calling it.

### Functions as Return Values

```python
def make_multiplier(factor):
    """Return a function that multiplies by factor."""
    def multiplier(x):
        return x * factor
    return multiplier

double = make_multiplier(2)
triple = make_multiplier(3)

print(double(5))  # 10
print(triple(5))  # 15
```

### Why Higher-Order Functions?

They enable powerful patterns:

```python
# Reusable retry logic
def retry(func, attempts=3):
    """Try to run func up to 'attempts' times."""
    for i in range(attempts):
        try:
            return func()
        except Exception as e:
            if i == attempts - 1:
                raise
            print(f"Attempt {i+1} failed, retrying...")

# Timing decorator (preview of decorators)
def timed(func):
    """Return a version of func that prints execution time."""
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"{func.__name__} took {time.time() - start:.3f}s")
        return result
    return wrapper
```

---

## Built-in Higher-Order Functions

Python provides several built-in higher-order functions.

### `map()` - Transform Each Item

```python
numbers = [1, 2, 3, 4, 5]

def square(x):
    return x * x

squared = list(map(square, numbers))
print(squared)  # [1, 4, 9, 16, 25]

# map returns an iterator, so we convert to list
```

### `filter()` - Keep Matching Items

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

def is_even(x):
    return x % 2 == 0

evens = list(filter(is_even, numbers))
print(evens)  # [2, 4, 6, 8, 10]
```

### `sorted()` with `key`

```python
names = ["Alice", "bob", "CHARLIE", "diana"]

# Sort by lowercase version (case-insensitive)
def lowercase(s):
    return s.lower()

sorted_names = sorted(names, key=lowercase)
print(sorted_names)  # ['Alice', 'bob', 'CHARLIE', 'diana']

# Sort by length
sorted_by_length = sorted(names, key=len)
print(sorted_by_length)  # ['bob', 'Alice', 'diana', 'CHARLIE']
```

---

## Lambda Functions

A **lambda** is a small anonymous function defined in a single expression:

```python
# Regular function
def add(a, b):
    return a + b

# Equivalent lambda
add = lambda a, b: a + b

print(add(3, 5))  # 8
```

Lambda syntax: `lambda parameters: expression`

- Can have any number of parameters
- Body is a single expression (no statements)
- Automatically returns the expression's value

### Common Lambda Uses

Lambdas are most useful for short functions passed to higher-order functions:

```python
numbers = [1, 2, 3, 4, 5]

# With map
squared = list(map(lambda x: x * x, numbers))

# With filter
evens = list(filter(lambda x: x % 2 == 0, numbers))

# With sorted
names = ["Alice", "bob", "CHARLIE"]
sorted_names = sorted(names, key=lambda s: s.lower())

# With max/min
people = [{"name": "Alice", "age": 30}, {"name": "Bob", "age": 25}]
oldest = max(people, key=lambda p: p["age"])
print(oldest)  # {"name": "Alice", "age": 30}
```

### When to Use Lambda vs `def`

**Use lambda when:**
- The function is simple (one expression)
- It's used only once
- It makes the code more readable inline

**Use `def` when:**
- The function has multiple statements
- The function is complex
- You need a docstring
- You'll reuse the function

```python
# Good lambda use: simple, one-time
sorted(items, key=lambda x: x["priority"])

# Bad lambda use: too complex
process = lambda x: x.strip().lower().replace(" ", "_") if x else "unknown"

# Better as def
def process(x):
    """Clean and format string for use as identifier."""
    if not x:
        return "unknown"
    return x.strip().lower().replace(" ", "_")
```

---

## List Comprehensions vs `map`/`filter`

Python's list comprehensions often replace `map` and `filter`:

```python
numbers = [1, 2, 3, 4, 5]

# map with lambda
squared = list(map(lambda x: x * x, numbers))

# List comprehension (usually preferred)
squared = [x * x for x in numbers]

# filter with lambda
evens = list(filter(lambda x: x % 2 == 0, numbers))

# List comprehension
evens = [x for x in numbers if x % 2 == 0]
```

List comprehensions are generally:
- More readable (Pythonic)
- Slightly faster
- More flexible (can combine mapping and filtering)

```python
# Combined transform and filter
result = [x * x for x in numbers if x % 2 == 0]
# [4, 16] - square of even numbers only
```

---

## Common Pitfalls

### Shadowing Built-in Names

Never use Python built-in names for your variables:

```python
# Bad: shadows built-in list
list = [1, 2, 3]
other = list([4, 5, 6])  # TypeError: 'list' object is not callable

# Bad: shadows built-in sum
sum = 10
total = sum([1, 2, 3])  # TypeError: 'int' object is not callable

# Bad: shadows built-in type
type = "admin"
print(type(42))  # TypeError: 'str' object is not callable
```

Common built-ins to avoid: `list`, `dict`, `set`, `str`, `int`, `float`, `type`, `sum`, `max`, `min`, `len`, `input`, `print`, `id`, `filter`, `map`, `open`, `file`, `format`

If you accidentally shadow a built-in, you can recover it:

```python
list = [1, 2, 3]
del list  # Remove the shadow
list([4, 5, 6])  # Works again
```

### Mixing Printing and Returning

A common beginner mistake is printing inside a function that should return:

```python
# Hard to reuse: prints but returns None
def calculate_total(prices):
    total = sum(prices)
    print(total)  # Side effect

# The result can't be used
result = calculate_total([10, 20, 30])  # Prints 60
print(f"Total: {result}")  # Total: None

# Better: return the value
def calculate_total(prices):
    return sum(prices)

result = calculate_total([10, 20, 30])
print(f"Total: {result}")  # Total: 60
```

### Late Binding in Closures

Closures capture variables by reference, not by value:

```python
# Bug: all functions return 4
functions = []
for i in range(5):
    functions.append(lambda: i)

print([f() for f in functions])  # [4, 4, 4, 4, 4]
```

All lambdas share the same `i`, which ends up as 4 after the loop.

**Fix: capture the value with a default argument:**

```python
functions = []
for i in range(5):
    functions.append(lambda i=i: i)  # i=i captures current value

print([f() for f in functions])  # [0, 1, 2, 3, 4]
```

### Modifying Arguments Unexpectedly

Mutable arguments can be modified inside functions:

```python
def add_item(item, items):
    items.append(item)  # Modifies the original list!
    return items

my_list = [1, 2, 3]
add_item(4, my_list)
print(my_list)  # [1, 2, 3, 4] - modified!
```

If this isn't intended, create a copy:

```python
def add_item(item, items):
    new_items = items.copy()  # Work with a copy
    new_items.append(item)
    return new_items
```

---

## Best Practices Summary

1. **Keep functions small and focused** - one job per function
2. **Prefer returning values to printing** inside reusable functions
3. **Use keyword arguments** for clarity at call sites
4. **Avoid `global` variables** - pass data in, return data out
5. **Write docstrings** for functions others will use
6. **Use type hints** for better documentation and tooling
7. **Prefer list comprehensions** over `map`/`filter` for readability
8. **Use lambdas sparingly** - only for simple, one-time functions
9. **Never shadow built-in names** like `list`, `dict`, `sum`
10. **Be careful with mutable default arguments** - use `None` pattern

---

## Key Takeaways

- Higher-order functions take functions as arguments or return functions
- Built-in higher-order functions: `map()`, `filter()`, `sorted()` with `key`
- Lambda syntax: `lambda args: expression` - for small anonymous functions
- Use lambdas for simple inline functions; use `def` for anything complex
- List comprehensions are usually preferred over `map`/`filter`
- Avoid shadowing built-in names (`list`, `dict`, `sum`, etc.)
- Watch out for late binding in closures - use default arguments to capture values
- Separate side effects (printing) from calculations (returning)

