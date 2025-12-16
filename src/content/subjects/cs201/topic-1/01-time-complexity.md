# Time Complexity Fundamentals

Time complexity measures how an algorithm's running time grows with input size. It's the primary metric for comparing algorithm efficiency.

## Why Measure Complexity?

**Problem**: Actual running time depends on hardware, language, and implementation details.

**Solution**: Count fundamental operations as a function of input size n.

This provides machine-independent comparison of algorithms.

## Counting Operations

Consider searching for an element in an unsorted array:

```python
def linear_search(arr, target):
    for i in range(len(arr)):      # Loop n times
        if arr[i] == target:       # One comparison per iteration
            return i
    return -1
```

**Best case**: Target at index 0 → 1 comparison
**Worst case**: Target absent or at end → n comparisons
**Average case**: Target at random position → n/2 comparisons

## Asymptotic Analysis

We care about behavior for large n, ignoring constant factors.

**Key insight**: For large n, the growth rate dominates:
- n² + 1000n ≈ n² when n > 1000
- 2ⁿ grows faster than any polynomial

### Growth Rates Comparison

For n = 1,000,000:

| Complexity | Operations |
|------------|------------|
| O(1) | 1 |
| O(log n) | 20 |
| O(n) | 1,000,000 |
| O(n log n) | 20,000,000 |
| O(n²) | 10¹² |
| O(2ⁿ) | Astronomical |

## Big-O Notation

**Definition**: f(n) = O(g(n)) if there exist constants c > 0 and n₀ such that:

```
f(n) ≤ c × g(n) for all n ≥ n₀
```

Big-O gives an **upper bound** on growth rate.

### Examples

**f(n) = 3n + 5 is O(n)**

For n ≥ 5: 3n + 5 ≤ 3n + n = 4n

So f(n) ≤ 4n with c = 4, n₀ = 5. ✓

**f(n) = n² + 2n is O(n²)**

For n ≥ 2: n² + 2n ≤ n² + n² = 2n²

So f(n) ≤ 2n² with c = 2, n₀ = 2. ✓

### Simplification Rules

1. **Drop constants**: O(2n) = O(n)
2. **Drop lower-order terms**: O(n² + n) = O(n²)
3. **Focus on dominant term**: O(n³ + n² + n) = O(n³)

## Common Complexity Classes

### O(1) - Constant Time

Operations independent of input size:

```python
def get_first(arr):
    return arr[0]  # Always one operation

def hash_lookup(d, key):
    return d[key]  # Hash table lookup (average case)
```

### O(log n) - Logarithmic

Input halves each step (binary search pattern):

```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
```

Each iteration halves the search space: n → n/2 → n/4 → ... → 1

Number of iterations: log₂(n)

### O(n) - Linear

Process each element once:

```python
def find_max(arr):
    max_val = arr[0]
    for x in arr:
        if x > max_val:
            max_val = x
    return max_val
```

### O(n log n) - Linearithmic

Divide-and-conquer algorithms:

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])    # O(n log n)
    right = merge_sort(arr[mid:])   # O(n log n)
    return merge(left, right)       # O(n)
```

Total: O(n) work at each of O(log n) levels = O(n log n)

### O(n²) - Quadratic

Nested loops over input:

```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
```

### O(2ⁿ) - Exponential

Recursive algorithms with multiple branches:

```python
def fibonacci_naive(n):
    if n <= 1:
        return n
    return fibonacci_naive(n - 1) + fibonacci_naive(n - 2)
```

Each call branches into two more. Tree has 2ⁿ nodes.

## Analyzing Loops

### Single Loop

```python
for i in range(n):    # O(n)
    # O(1) work
```

Total: O(n)

### Nested Loops

```python
for i in range(n):       # O(n)
    for j in range(n):   # O(n)
        # O(1) work
```

Total: O(n) × O(n) = O(n²)

### Loop with Varying Bound

```python
for i in range(n):
    for j in range(i):   # j goes 0, 1, 2, ..., n-1
        # O(1) work
```

Total: 0 + 1 + 2 + ... + (n-1) = n(n-1)/2 = O(n²)

### Loop Halving

```python
i = n
while i > 0:
    # O(1) work
    i = i // 2
```

Total: O(log n) iterations

## Tight Bounds: Big-Θ

**Definition**: f(n) = Θ(g(n)) if f(n) = O(g(n)) AND f(n) = Ω(g(n))

Big-Θ means g(n) is a **tight bound**—the algorithm is both no worse and no better than g(n).

**Example**: Merge sort is Θ(n log n) in all cases.
Binary search is O(log n) but Θ(1) best case, Θ(log n) worst case.
