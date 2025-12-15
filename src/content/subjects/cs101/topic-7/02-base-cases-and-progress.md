## Base Cases and “Progress Toward the Base Case”

Most recursion bugs come from one of these:

1. Missing base case (infinite recursion)
2. Base case exists but is never reached

---

## Missing Base Case

```python
def broken(n):
    print(n)
    broken(n - 1)  # never stops
```

Fix:

```python
def fixed(n):
    if n <= 0:
        return
    print(n)
    fixed(n - 1)
```

---

## Base Case Never Reached

```python
def factorial_broken(n):
    if n == 0:
        return 1
    return n * factorial_broken(n + 1)  # wrong direction
```

The recursive step must make the problem simpler, not harder:

```python
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)
```

