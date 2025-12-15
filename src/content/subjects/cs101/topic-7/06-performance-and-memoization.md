## Performance: Overlapping Work

Some recursive solutions repeat the same work many times.

The classic example is Fibonacci:

```python
def fib_slow(n):
    if n <= 1:
        return n
    return fib_slow(n - 1) + fib_slow(n - 2)
```

This recalculates `fib_slow(10)` inside `fib_slow(12)` and so on.

---

## Memoization (Caching Results)

Memoization stores results so you don’t recompute them.

```python
def fib_fast(n, memo=None):
    if memo is None:
        memo = {}

    if n in memo:
        return memo[n]
    if n <= 1:
        return n

    memo[n] = fib_fast(n - 1, memo) + fib_fast(n - 2, memo)
    return memo[n]
```

This turns many exponential recursive problems into much faster ones.

---

## When to Prefer Iteration

If a recursive solution is simple but might recurse very deeply, iteration can be safer:

```python
def factorial_iter(n):
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result
```

