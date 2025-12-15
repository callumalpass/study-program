## Scope (Where Variables Live)

Scope determines where a variable name can be used.

```python
message = "Hello"  # global

def greet():
    name = "Alice"  # local
    print(message, name)

greet()
```

`name` exists only inside `greet()`.

---

## The LEGB Rule

When Python looks up a name, it searches:

1. **L**ocal: current function
2. **E**nclosing: outer function(s), if nested
3. **G**lobal: module-level
4. **B**uilt-in: `len`, `sum`, `print`, etc.

---

## Nested Functions and Closures

An inner function can “remember” variables from the outer function:

```python
def make_multiplier(factor):
    def multiply(x):
        return x * factor
    return multiply

double = make_multiplier(2)
print(double(5))  # 10
```

Here, `multiply` closes over `factor`. This is called a **closure**.

---

## `global` and `nonlocal` (Use Sparingly)

You usually want to pass values in and return values out. But if you must modify an outer variable:

```python
count = 0

def increment_global():
    global count
    count += 1
```

For nested functions, use `nonlocal`:

```python
def make_counter():
    n = 0
    def inc():
        nonlocal n
        n += 1
        return n
    return inc
```

Avoid relying on `global` in beginner code—it makes programs harder to understand.

