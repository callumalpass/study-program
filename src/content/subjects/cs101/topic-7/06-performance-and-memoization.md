## Performance and Memoization

Not all recursive solutions are efficient. Some recalculate the same values many times, leading to exponential slowdown. **Memoization** is a technique that caches results to avoid redundant computation, often transforming slow recursive solutions into fast ones.

---

## The Problem: Redundant Computation

Consider the naive recursive Fibonacci:

```python
def fib_slow(n):
    if n <= 1:
        return n
    return fib_slow(n - 1) + fib_slow(n - 2)
```

This looks elegant, but it's terribly inefficient. Let's trace `fib_slow(5)`:

```
fib(5)
├── fib(4)
│   ├── fib(3)
│   │   ├── fib(2)
│   │   │   ├── fib(1) → 1
│   │   │   └── fib(0) → 0
│   │   └── fib(1) → 1
│   └── fib(2)
│       ├── fib(1) → 1
│       └── fib(0) → 0
└── fib(3)
    ├── fib(2)
    │   ├── fib(1) → 1
    │   └── fib(0) → 0
    └── fib(1) → 1
```

Notice that `fib(2)` is calculated 3 times, and `fib(3)` is calculated 2 times. This redundancy grows exponentially.

### The Cost

| n | Function calls |
|---|---------------|
| 10 | 177 |
| 20 | 21,891 |
| 30 | 2,692,537 |
| 40 | 331,160,281 |

The time complexity is $O(2^n)$ - exponential growth. `fib_slow(50)` would take years to compute.

Without memoization, computing $\text{fib}(n)$ requires approximately $2^n$ function calls because each call branches into two more calls (except base cases).

---

## The Solution: Memoization

Memoization stores the result of each unique call so it's only computed once:

```python
def fib_memo(n, cache=None):
    if cache is None:
        cache = {}

    # Check if we've already computed this
    if n in cache:
        return cache[n]

    # Base cases
    if n <= 1:
        return n

    # Compute and cache the result
    result = fib_memo(n - 1, cache) + fib_memo(n - 2, cache)
    cache[n] = result
    return result

print(fib_memo(50))  # Instant! Returns 12586269025
```

Now each value is computed only once. The time complexity drops to $O(n)$ - linear time instead of exponential.

### How It Works

```
fib_memo(5)
├── fib_memo(4)
│   ├── fib_memo(3)
│   │   ├── fib_memo(2)
│   │   │   ├── fib_memo(1) → 1 (computed)
│   │   │   └── fib_memo(0) → 0 (computed)
│   │   │   → cache[2] = 1
│   │   └── fib_memo(1) → 1 (cached!)
│   │   → cache[3] = 2
│   └── fib_memo(2) → 1 (cached!)
│   → cache[4] = 3
└── fib_memo(3) → 2 (cached!)
→ cache[5] = 5
```

After computing `fib(2)` once, every subsequent call retrieves it from the cache instantly.

---

## Using Python's `functools.lru_cache`

Python provides a decorator that automatically memoizes function calls:

```python
from functools import lru_cache

@lru_cache(maxsize=None)
def fib_cached(n):
    if n <= 1:
        return n
    return fib_cached(n - 1) + fib_cached(n - 2)

print(fib_cached(100))  # Instant!
# 354224848179261915075
```

The `@lru_cache` decorator handles the caching automatically. `maxsize=None` means cache unlimited results.

### Clearing the Cache

```python
fib_cached.cache_clear()  # Clear all cached values
print(fib_cached.cache_info())  # View cache statistics
```

---

## When to Use Memoization

Memoization helps when:

1. **The function is called with the same arguments multiple times**
2. **The function is pure** (same inputs always produce same outputs)
3. **Results can be cached efficiently** (hashable arguments)

### Recognizing Overlapping Subproblems

If your recursion tree shows the same call appearing multiple times, memoization will help:

```python
# Grid paths: count_paths(3, 3) calls count_paths(2, 3) and count_paths(3, 2)
# Both of those call count_paths(2, 2)
# Overlapping subproblems!

@lru_cache(maxsize=None)
def count_paths(rows, cols):
    if rows == 1 or cols == 1:
        return 1
    return count_paths(rows - 1, cols) + count_paths(rows, cols - 1)

print(count_paths(20, 20))  # Instant: 35345263800
```

Without memoization, this would make billions of recursive calls.

---

## Manual vs Decorator Memoization

### Decorator (Preferred)

```python
from functools import lru_cache

@lru_cache(maxsize=None)
def expensive_function(n):
    # ... complex computation ...
    return result
```

**Pros**: Clean, no code changes needed
**Cons**: Less control over cache behavior

### Manual

```python
def expensive_function(n, cache=None):
    if cache is None:
        cache = {}
    if n in cache:
        return cache[n]

    result = # ... complex computation ...
    cache[n] = result
    return result
```

**Pros**: Full control over caching
**Cons**: More boilerplate code

---

## Converting to Iteration

When recursion depth is a concern, you can often convert memoized recursion to iteration:

```python
def fib_iterative(n):
    if n <= 1:
        return n

    prev2 = 0  # fib(0)
    prev1 = 1  # fib(1)

    for i in range(2, n + 1):
        current = prev1 + prev2
        prev2 = prev1
        prev1 = current

    return prev1

print(fib_iterative(1000))  # Works without recursion limit
```

This uses O(1) space instead of O(n) for the cache, and avoids recursion limits entirely.

### Bottom-Up Dynamic Programming

The iterative approach is called "bottom-up" dynamic programming - you build from the base cases up, rather than recursing down:

```python
def count_paths_dp(rows, cols):
    # Create a grid to store path counts
    dp = [[1] * cols for _ in range(rows)]

    # Fill in the grid bottom-up
    for r in range(1, rows):
        for c in range(1, cols):
            dp[r][c] = dp[r-1][c] + dp[r][c-1]

    return dp[rows-1][cols-1]

print(count_paths_dp(20, 20))  # 35345263800
```

---

## Space Optimization

Sometimes you can reduce memory usage in dynamic programming:

```python
def fib_space_optimized(n):
    if n <= 1:
        return n

    # Only need the last two values
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

print(fib_space_optimized(100))
```

This uses $O(1)$ space (constant) instead of $O(n)$ (linear) for storing all previous values. For Fibonacci, we only need to remember the last two values: $F_{n-1}$ and $F_{n-2}$ to compute $F_n = F_{n-1} + F_{n-2}$.

---

## Comparing Performance

Let's measure the difference:

```python
import time

def measure(func, arg):
    start = time.time()
    result = func(arg)
    elapsed = time.time() - start
    return result, elapsed

# Slow version (don't try with large n!)
def fib_slow(n):
    if n <= 1:
        return n
    return fib_slow(n - 1) + fib_slow(n - 2)

# Fast version
@lru_cache(maxsize=None)
def fib_fast(n):
    if n <= 1:
        return n
    return fib_fast(n - 1) + fib_fast(n - 2)

# Compare
print(measure(fib_slow, 30))  # About 0.3 seconds
print(measure(fib_fast, 30))  # About 0.00001 seconds
```

The difference is dramatic - from hundreds of milliseconds to microseconds.

---

## When Memoization Won't Help

Memoization doesn't help when:

1. **No overlapping subproblems**: Each call has unique arguments

```python
# Each call has unique (n, depth) - no overlap to cache
def factorial(n, depth=0):
    if n <= 1:
        return 1
    return n * factorial(n - 1, depth + 1)
```

2. **Arguments aren't hashable**: Lists and dicts can't be cache keys

```python
# Can't cache calls with list arguments
def sum_list(items):  # items is a list - not hashable
    ...
```

3. **Results are too large**: Caching huge data structures wastes memory

---

## Key Takeaways

- **Overlapping subproblems** cause exponential slowdown in naive recursion
- **Memoization** caches results to avoid redundant computation
- Use `@lru_cache` for easy automatic memoization
- Memoization can turn $O(2^n)$ into $O(n)$
- **Bottom-up iteration** avoids recursion limits and can be more efficient
- **Space optimization** reduces memory by keeping only what's needed
- Memoization works best for **pure functions** with **hashable arguments**
- Recognize when recursion trees have repeated calls - that's your signal to memoize

