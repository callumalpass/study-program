---
id: cs201-t1-space
title: "Space Complexity"
order: 2
---

# Space Complexity

While time complexity captures how long algorithms take, space complexity captures how much memory they consume. In an era of vast RAM and cheap storage, space might seem less critical than time—but this view misses crucial realities. Memory hierarchies mean that algorithms fitting in cache run orders of magnitude faster than those that spill to disk. Embedded systems have hard memory limits. Cloud computing charges by memory usage. And sometimes the data simply won't fit, no matter how much hardware you throw at it.

Space and time often trade off against each other. Memoization speeds up dynamic programming by storing intermediate results—trading O(n) space for exponential time savings. Hash tables enable O(1) lookups by using O(n) space for the table. In-place algorithms like heapsort and quicksort minimize memory at the cost of implementation complexity. Understanding these tradeoffs enables informed choices based on actual constraints rather than default assumptions.

Space analysis requires careful accounting. Input space (the data itself) is usually not counted—we want to know what additional memory the algorithm requires. Recursive algorithms consume stack space proportional to maximum recursion depth. Hidden allocations in string concatenation or list slicing can turn an apparently O(n) algorithm into O(n²) space. Mastering space complexity means seeing these hidden costs and knowing when they matter.

## What Counts as Space?

1. **Input space**: Memory for input data (usually not counted)
2. **Auxiliary space**: Extra memory the algorithm uses
3. **Total space**: Input + auxiliary

Convention: "Space complexity" typically means auxiliary space.

## Auxiliary vs Total Space

```python
def sum_array(arr):           # Input: O(n) for arr
    total = 0                 # Auxiliary: O(1)
    for x in arr:
        total += x
    return total
# Total space: O(n), Auxiliary space: O(1)

def copy_array(arr):
    return arr[:]             # Creates new array
# Total space: O(n), Auxiliary space: O(n)
```

## Analyzing Space Complexity

### Constant Space - O(1)

Uses fixed amount of memory regardless of input:

```python
def find_max(arr):
    max_val = arr[0]     # One variable
    for x in arr:
        if x > max_val:
            max_val = x
    return max_val
# O(1) auxiliary space
```

### Linear Space - O(n)

Memory grows linearly with input:

```python
def reverse_array(arr):
    result = []          # New array
    for i in range(len(arr) - 1, -1, -1):
        result.append(arr[i])
    return result
# O(n) auxiliary space

def reverse_in_place(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
# O(1) auxiliary space
```

### Recursive Call Stack

Recursion uses stack space for each call:

```python
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)
# O(n) space - n stack frames
```

Each call adds a stack frame. Maximum depth = n.

### Tail Recursion Optimization

Some languages optimize tail recursion to O(1) space:

```python
def factorial_tail(n, acc=1):
    if n <= 1:
        return acc
    return factorial_tail(n - 1, acc * n)
# Still O(n) in Python (no TCO), but O(1) in optimizing languages
```

## Space-Time Tradeoffs

Often we can trade space for time or vice versa.

### Example: Two Sum Problem

**Approach 1: O(1) space, O(n²) time**
```python
def two_sum_brute(arr, target):
    n = len(arr)
    for i in range(n):
        for j in range(i + 1, n):
            if arr[i] + arr[j] == target:
                return [i, j]
    return None
```

**Approach 2: O(n) space, O(n) time**
```python
def two_sum_hash(arr, target):
    seen = {}
    for i, num in enumerate(arr):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return None
```

### Memoization

Trading space for time in recursive algorithms:

```python
def fib_naive(n):          # O(1) space, O(2ⁿ) time
    if n <= 1:
        return n
    return fib_naive(n-1) + fib_naive(n-2)

def fib_memo(n, memo={}):  # O(n) space, O(n) time
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)
    return memo[n]
```

## Common Space Complexities

| Algorithm | Time | Space |
|-----------|------|-------|
| Binary search | O(log n) | O(1) iterative, O(log n) recursive |
| Merge sort | O(n log n) | O(n) |
| Quick sort | O(n log n) avg | O(log n) |
| Heap sort | O(n log n) | O(1) |
| BFS | O(V + E) | O(V) |
| DFS | O(V + E) | O(V) recursive |

## In-Place Algorithms

An algorithm is **in-place** if it uses O(1) auxiliary space.

### In-Place Examples

```python
def swap(arr, i, j):
    arr[i], arr[j] = arr[j], arr[i]  # No extra array

def partition(arr, low, high):  # Quick sort partition
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1
```

### Not In-Place

```python
def merge(left, right):     # Merge sort merge
    result = []             # Extra O(n) array
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result
```

## Analyzing Data Structures

| Structure | Space | Note |
|-----------|-------|------|
| Array | O(n) | Contiguous memory |
| Linked List | O(n) | Extra pointer per node |
| Binary Tree | O(n) | Two pointers per node |
| Hash Table | O(n) | Load factor affects actual usage |
| Graph (adj list) | O(V + E) | |
| Graph (adj matrix) | O(V²) | |

## Hidden Space Costs

### String Concatenation

```python
def build_string_bad(n):
    result = ""
    for i in range(n):
        result += str(i)    # Creates new string each time!
    return result
# O(n²) time and creates O(n) intermediate strings

def build_string_good(n):
    parts = []
    for i in range(n):
        parts.append(str(i))
    return ''.join(parts)
# O(n) time and space
```

### Slicing

```python
arr = [1, 2, 3, 4, 5]
subset = arr[1:4]        # Creates new list - O(k) space
```

### Recursion Depth

```python
import sys
sys.setrecursionlimit(10000)  # Python default is ~1000

def deep_recursion(n):
    if n == 0:
        return
    deep_recursion(n - 1)
# Stack overflow if n > recursion limit
```

## Memory-Efficient Patterns

**Generators** for iteration without storing:
```python
def squares_gen(n):
    for i in range(n):
        yield i * i
# O(1) space - generates values on demand
```

**Streaming** for large data:
```python
def process_file_lines(filename):
    with open(filename) as f:
        for line in f:      # Read one line at a time
            process(line)
# O(1) memory regardless of file size
```
