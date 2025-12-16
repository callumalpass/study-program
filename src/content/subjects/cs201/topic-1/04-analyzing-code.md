# Analyzing Code Complexity

Translating code into complexity expressions requires systematic analysis of loops, recursion, and data structure operations. This skill is essential for predicting algorithm performance.

## Analyzing Iterative Code

### Simple Loops

**Constant iterations**:
```python
for i in range(100):
    print(i)  # O(1) per iteration
# Total: O(100) = O(1) - constant time
```

**Linear iterations**:
```python
for i in range(n):
    print(i)  # O(1) per iteration
# Total: O(n)
```

**Loop with arithmetic progression**:
```python
total = 0
for i in range(1, n + 1):
    total += i
# Iterations: n, each O(1)
# Total: O(n)
```

### Nested Loops

**Both dependent on n**:
```python
for i in range(n):
    for j in range(n):
        print(i, j)
# Outer: n iterations
# Inner: n iterations each
# Total: O(n × n) = O(n²)
```

**Inner depends on outer**:
```python
for i in range(n):
    for j in range(i):
        print(i, j)
# Inner loop runs: 0 + 1 + 2 + ... + (n-1) = n(n-1)/2
# Total: O(n²)
```

**Inner loop shrinks**:
```python
for i in range(n):
    for j in range(i, n):
        print(i, j)
# Inner loop runs: n + (n-1) + ... + 1 = n(n+1)/2
# Total: O(n²)
```

### Logarithmic Loops

**Loop variable doubles**:
```python
i = 1
while i < n:
    print(i)
    i *= 2
# Values of i: 1, 2, 4, 8, ..., 2^k where 2^k < n
# Iterations: log₂(n)
# Total: O(log n)
```

**Loop variable halves**:
```python
i = n
while i >= 1:
    print(i)
    i //= 2
# Values of i: n, n/2, n/4, ..., 1
# Iterations: log₂(n)
# Total: O(log n)
```

### Combined Patterns

**Linearithmic (n log n)**:
```python
for i in range(n):          # O(n)
    j = 1
    while j < n:            # O(log n)
        print(i, j)
        j *= 2
# Total: O(n) × O(log n) = O(n log n)
```

**Nested with logarithmic inner**:
```python
for i in range(n):
    j = i
    while j > 0:
        j //= 2
# Each inner loop: O(log i)
# Total: log(1) + log(2) + ... + log(n) = log(n!) = O(n log n)
```

## Analyzing Recursive Code

### Linear Recursion

```python
def sum_array(arr, i=0):
    if i == len(arr):
        return 0
    return arr[i] + sum_array(arr, i + 1)
# Recurrence: T(n) = T(n-1) + O(1)
# Solution: T(n) = O(n)
```

### Binary Recursion (Divide and Conquer)

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)  # O(n)
# Recurrence: T(n) = 2T(n/2) + O(n)
# Solution: T(n) = O(n log n)
```

### Exponential Recursion

```python
def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)
# Recurrence: T(n) = T(n-1) + T(n-2) + O(1)
# Solution: T(n) = O(φⁿ) ≈ O(1.618ⁿ)
```

### Counting Recursive Calls

**Tree recursion visualization**:
```
                 fib(5)
                /      \
           fib(4)      fib(3)
           /    \      /    \
       fib(3)  fib(2) fib(2) fib(1)
       /   \
   fib(2) fib(1)
```

Count nodes = number of calls.
For Fibonacci: approximately φⁿ nodes.

## Data Structure Operation Costs

Always account for underlying data structure costs:

### Array/List Operations

| Operation | Python List | Array |
|-----------|-------------|-------|
| Access by index | O(1) | O(1) |
| Append | O(1) amortized | - |
| Insert at position | O(n) | O(n) |
| Delete by index | O(n) | O(n) |
| Search (unsorted) | O(n) | O(n) |
| Search (sorted) | O(n) or O(log n) | O(log n) |

### Dictionary/Hash Operations

| Operation | Average | Worst |
|-----------|---------|-------|
| Insert | O(1) | O(n) |
| Delete | O(1) | O(n) |
| Lookup | O(1) | O(n) |

### Set Operations

| Operation | Average |
|-----------|---------|
| Add | O(1) |
| Remove | O(1) |
| Contains | O(1) |
| Union | O(len(s) + len(t)) |
| Intersection | O(min(len(s), len(t))) |

## Hidden Complexity

### String Operations

```python
# String concatenation in a loop - DANGER!
result = ""
for i in range(n):
    result += str(i)  # Creates new string each time!
# Each concatenation: O(current length)
# Total: O(1 + 2 + ... + n) = O(n²)

# Better approach:
parts = []
for i in range(n):
    parts.append(str(i))
result = "".join(parts)  # O(n) total
```

### Slicing

```python
# List slicing creates a copy
arr = [1, 2, 3, 4, 5]
sub = arr[1:4]  # O(k) where k = 4-1 = 3
```

### Built-in Functions

```python
# Sorting
sorted(arr)      # O(n log n)
arr.sort()       # O(n log n)

# Search
x in list        # O(n)
x in set         # O(1) average
x in dict        # O(1) average

# Copying
arr.copy()       # O(n)
list(arr)        # O(n)
```

## Amortized Analysis

Some operations have varying costs but consistent average cost.

### Dynamic Array (Python list.append)

```python
arr = []
for i in range(n):
    arr.append(i)
```

**Individual costs**: Usually O(1), occasionally O(n) when resizing.

**Amortized**: O(1) per append.

**Total for n appends**: O(n).

### Accounting Method

"Charge" extra during cheap operations to pay for expensive ones.

For dynamic array:
- Charge 3 units per append (1 for insert, 2 saved for future resize)
- When resizing from k to 2k: use k saved units
- Each append still costs O(1) amortized

## Practice Problems

**Example 1**: What's the complexity?
```python
def mystery(n):
    if n <= 0:
        return
    for i in range(n):
        print(i)
    mystery(n - 1)
```

**Analysis**:
- Each call does O(n) work
- Calls: mystery(n), mystery(n-1), ..., mystery(1)
- Total work: n + (n-1) + ... + 1 = O(n²)

**Example 2**: What's the complexity?
```python
def foo(n):
    if n <= 1:
        return 1
    return foo(n // 2) + foo(n // 2)
```

**Analysis**:
- Recurrence: T(n) = 2T(n/2) + O(1)
- By Master Theorem: a=2, b=2, f(n)=1
- n^(log₂2) = n, f(n) = O(n^(1-ε))
- Case 1: T(n) = O(n)
