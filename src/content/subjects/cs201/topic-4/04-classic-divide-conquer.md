# Classic Divide and Conquer Algorithms

Beyond sorting, divide and conquer enables efficient solutions to diverse computational problems.

## Closest Pair of Points

**Problem**: Given n points in 2D, find the pair with minimum Euclidean distance.

**Naive**: O(n²) - check all pairs

**Divide and Conquer**: O(n log n)

### Algorithm

```python
def closest_pair(points):
    # Sort by x-coordinate
    px = sorted(points, key=lambda p: p[0])
    # Sort by y-coordinate
    py = sorted(points, key=lambda p: p[1])
    return closest_pair_rec(px, py)

def closest_pair_rec(px, py):
    n = len(px)

    # Base case
    if n <= 3:
        return brute_force(px)

    # Divide
    mid = n // 2
    mid_x = px[mid][0]

    # Split points by x-coordinate
    left_px = px[:mid]
    right_px = px[mid:]

    # Split py maintaining y-order
    left_py = [p for p in py if p[0] < mid_x or (p[0] == mid_x and p in left_px)]
    right_py = [p for p in py if p not in left_py]

    # Conquer
    d_left = closest_pair_rec(left_px, left_py)
    d_right = closest_pair_rec(right_px, right_py)
    d = min(d_left, d_right)

    # Combine: check strip
    strip = [p for p in py if abs(p[0] - mid_x) < d]
    return min(d, closest_in_strip(strip, d))

def closest_in_strip(strip, d):
    min_d = d
    n = len(strip)

    for i in range(n):
        j = i + 1
        while j < n and strip[j][1] - strip[i][1] < d:
            dist = distance(strip[i], strip[j])
            min_d = min(min_d, dist)
            j += 1

    return min_d
```

### Key Insight

Within the strip of width 2d around the dividing line, each point needs to be compared with at most 7 others (geometric argument).

**Time**: T(n) = 2T(n/2) + O(n) = O(n log n)

## Strassen's Matrix Multiplication

**Problem**: Multiply two n×n matrices

**Standard**: O(n³)

**Strassen**: O(n^2.807)

### Standard Approach

```python
def matrix_multiply_standard(A, B):
    n = len(A)
    C = [[0] * n for _ in range(n)]
    for i in range(n):
        for j in range(n):
            for k in range(n):
                C[i][j] += A[i][k] * B[k][j]
    return C
```

Recurrence: T(n) = 8T(n/2) + O(n²) = O(n³)

### Strassen's Key Insight

Reduce 8 recursive multiplications to 7:

```
A = |A11 A12|    B = |B11 B12|
    |A21 A22|        |B21 B22|

Standard: C11 = A11B11 + A12B21 (8 multiplications)

Strassen: Compute 7 products:
M1 = (A11 + A22)(B11 + B22)
M2 = (A21 + A22)B11
M3 = A11(B12 - B22)
M4 = A22(B21 - B11)
M5 = (A11 + A12)B22
M6 = (A21 - A11)(B11 + B12)
M7 = (A12 - A22)(B21 + B22)

Then:
C11 = M1 + M4 - M5 + M7
C12 = M3 + M5
C21 = M2 + M4
C22 = M1 - M2 + M3 + M6
```

**Recurrence**: T(n) = 7T(n/2) + O(n²)
**Solution**: T(n) = O(n^(log₂7)) ≈ O(n^2.807)

### Practical Considerations

- Overhead makes Strassen slower for small matrices
- Use standard algorithm below threshold (typically n < 64-128)
- Numerical stability can be an issue
- Better algorithms exist: O(n^2.373) theoretically achievable

## Karatsuba Multiplication

**Problem**: Multiply two n-digit numbers

**Grade school**: O(n²)

**Karatsuba**: O(n^1.585)

### Algorithm

For numbers x and y with n digits:

```
x = x1 · 10^(n/2) + x0
y = y1 · 10^(n/2) + y0

xy = x1y1 · 10^n + (x1y0 + x0y1) · 10^(n/2) + x0y0
```

**Key insight**: Compute x1y0 + x0y1 using only one multiplication:

```
z0 = x0y0
z2 = x1y1
z1 = (x0 + x1)(y0 + y1) - z0 - z2 = x1y0 + x0y1
```

### Implementation

```python
def karatsuba(x, y):
    # Base case
    if x < 10 or y < 10:
        return x * y

    n = max(len(str(x)), len(str(y)))
    m = n // 2

    # Split
    x1, x0 = divmod(x, 10**m)
    y1, y0 = divmod(y, 10**m)

    # Recursive calls (only 3!)
    z0 = karatsuba(x0, y0)
    z2 = karatsuba(x1, y1)
    z1 = karatsuba(x0 + x1, y0 + y1) - z0 - z2

    return z2 * 10**(2*m) + z1 * 10**m + z0
```

**Recurrence**: T(n) = 3T(n/2) + O(n)
**Solution**: O(n^(log₂3)) ≈ O(n^1.585)

## Counting Inversions

**Problem**: Count pairs (i, j) where i < j but arr[i] > arr[j]

**Application**: Measuring similarity between rankings

### Algorithm

Modify merge sort to count inversions during merge.

```python
def count_inversions(arr):
    return merge_sort_count(arr.copy())[1]

def merge_sort_count(arr):
    if len(arr) <= 1:
        return arr, 0

    mid = len(arr) // 2
    left, left_inv = merge_sort_count(arr[:mid])
    right, right_inv = merge_sort_count(arr[mid:])
    merged, split_inv = merge_count(left, right)

    return merged, left_inv + right_inv + split_inv

def merge_count(left, right):
    result = []
    inversions = 0
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            # Key: all remaining elements in left are inversions
            inversions += len(left) - i
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result, inversions
```

**Time**: O(n log n)

### Why It Works

When taking from right array before left array is exhausted, every remaining left element forms an inversion with the right element being taken.

## Selection: Finding kth Smallest

**Problem**: Find kth smallest element without sorting

### Randomized QuickSelect

```python
import random

def quickselect(arr, k):
    """Find kth smallest (0-indexed)"""
    if len(arr) == 1:
        return arr[0]

    pivot = random.choice(arr)
    left = [x for x in arr if x < pivot]
    equal = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]

    if k < len(left):
        return quickselect(left, k)
    elif k < len(left) + len(equal):
        return pivot
    else:
        return quickselect(right, k - len(left) - len(equal))
```

**Expected Time**: O(n)
**Worst Case**: O(n²)

### Median of Medians (Deterministic)

Guarantees O(n) worst case by choosing good pivot:

1. Divide into groups of 5
2. Find median of each group
3. Recursively find median of medians
4. Use as pivot

```python
def select_deterministic(arr, k):
    if len(arr) <= 5:
        return sorted(arr)[k]

    # Divide into groups of 5, find medians
    medians = []
    for i in range(0, len(arr), 5):
        group = sorted(arr[i:i+5])
        medians.append(group[len(group) // 2])

    # Recursively find median of medians
    pivot = select_deterministic(medians, len(medians) // 2)

    # Partition around pivot
    left = [x for x in arr if x < pivot]
    equal = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]

    if k < len(left):
        return select_deterministic(left, k)
    elif k < len(left) + len(equal):
        return pivot
    else:
        return select_deterministic(right, k - len(left) - len(equal))
```

**Time**: T(n) = T(n/5) + T(7n/10) + O(n) = O(n)

## Polynomial Multiplication via FFT

**Problem**: Multiply two degree-n polynomials

**Coefficient representation**: O(n²)

**FFT approach**: O(n log n)

### Key Idea

1. Convert coefficients to point-value representation (evaluate at special points)
2. Multiply point-values: O(n)
3. Convert back via inverse FFT

The Fast Fourier Transform computes n evaluations at roots of unity in O(n log n).

### Applications

- Signal processing
- Large integer multiplication
- String matching with wildcards
- Audio/image processing

## Design Patterns Summary

### When D&C Works Well

1. **Natural splitting**: Problem divides cleanly
2. **Independent subproblems**: No cross-dependencies
3. **Efficient combination**: Merge step is subquadratic
4. **Balanced division**: Subproblems roughly equal size

### Common Techniques

- **Prune before recursing**: Closest pair strip
- **Clever reformulation**: Strassen's matrix products
- **Count during merge**: Inversions
- **Randomization**: QuickSelect pivot choice

