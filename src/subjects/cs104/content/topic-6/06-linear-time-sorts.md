# Linear Time Sorting Algorithms

Comparison-based sorting has a lower bound of O(n log n). However, when data has special properties, we can sort in O(n) time using non-comparison sorts: Counting Sort, Radix Sort, and Bucket Sort.

## Counting Sort

When values are integers in a known range [0, k], counting sort achieves O(n + k) time.

### Algorithm

1. Count occurrences of each value
2. Compute cumulative counts (positions)
3. Place elements at their positions

```python
def counting_sort(arr, max_val=None):
    """
    Sort integers in range [0, max_val].
    Stable sorting algorithm.
    """
    if not arr:
        return arr

    if max_val is None:
        max_val = max(arr)

    # Count occurrences
    count = [0] * (max_val + 1)
    for num in arr:
        count[num] += 1

    # Compute cumulative counts (positions)
    for i in range(1, len(count)):
        count[i] += count[i - 1]

    # Build output array (traverse backwards for stability)
    output = [0] * len(arr)
    for num in reversed(arr):
        count[num] -= 1
        output[count[num]] = num

    return output
```

### Simpler Version (Not Stable)

```python
def counting_sort_simple(arr, max_val):
    """Simple counting sort (not stable)."""
    count = [0] * (max_val + 1)
    for num in arr:
        count[num] += 1

    result = []
    for i, c in enumerate(count):
        result.extend([i] * c)

    return result
```

### Complexity

- **Time**: O(n + k) where k = range of values
- **Space**: O(n + k)
- **Stable**: Yes (with proper implementation)

### When to Use

- Integer keys in small range
- k = O(n) (otherwise falls back to O(k))
- As a subroutine in radix sort

## Radix Sort

Sort numbers digit by digit, from least significant to most significant (LSD) or vice versa (MSD).

### LSD Radix Sort

```python
def radix_sort(arr):
    """
    Sort non-negative integers using LSD radix sort.
    Uses counting sort as subroutine.
    """
    if not arr:
        return arr

    max_val = max(arr)

    exp = 1
    while max_val // exp > 0:
        arr = counting_sort_by_digit(arr, exp)
        exp *= 10

    return arr

def counting_sort_by_digit(arr, exp):
    """Sort by digit at position exp."""
    n = len(arr)
    output = [0] * n
    count = [0] * 10

    # Count occurrences of each digit
    for num in arr:
        digit = (num // exp) % 10
        count[digit] += 1

    # Cumulative count
    for i in range(1, 10):
        count[i] += count[i - 1]

    # Build output (backwards for stability)
    for num in reversed(arr):
        digit = (num // exp) % 10
        count[digit] -= 1
        output[count[digit]] = num

    return output
```

### Visualization

```
Input: [170, 45, 75, 90, 802, 24, 2, 66]

Sort by ones digit:
170, 90, 802, 2, 24, 45, 75, 66
  0   0    2  2   4   5   5   6

Sort by tens digit:
802, 2, 24, 45, 66, 170, 75, 90
  0  0   2   4   6    7   7   9

Sort by hundreds digit:
2, 24, 45, 66, 75, 90, 170, 802
0   0   0   0   0   0    1    8

Output: [2, 24, 45, 66, 75, 90, 170, 802]
```

### Complexity

- **Time**: O(d × (n + k)) where d = number of digits, k = base (10 for decimal)
- **Space**: O(n + k)
- **Stable**: Yes (if using stable counting sort)

### Radix Sort for Strings

```python
def radix_sort_strings(strings, max_len):
    """Sort strings of equal length."""
    for pos in range(max_len - 1, -1, -1):
        # Sort by character at position pos
        strings = sorted(strings, key=lambda s: s[pos] if pos < len(s) else '')
    return strings
```

## Bucket Sort

Distribute elements into buckets, sort each bucket, then concatenate.

```python
def bucket_sort(arr, num_buckets=10):
    """
    Sort floats in range [0, 1).
    """
    if not arr:
        return arr

    # Create buckets
    buckets = [[] for _ in range(num_buckets)]

    # Distribute elements
    for num in arr:
        bucket_idx = int(num * num_buckets)
        buckets[bucket_idx].append(num)

    # Sort each bucket and concatenate
    result = []
    for bucket in buckets:
        bucket.sort()  # Or use insertion sort
        result.extend(bucket)

    return result
```

### Generalized Bucket Sort

```python
def bucket_sort_general(arr, num_buckets=10):
    """Bucket sort for arbitrary ranges."""
    if not arr:
        return arr

    min_val, max_val = min(arr), max(arr)
    bucket_range = (max_val - min_val) / num_buckets + 1

    buckets = [[] for _ in range(num_buckets)]

    for num in arr:
        bucket_idx = int((num - min_val) / bucket_range)
        buckets[bucket_idx].append(num)

    result = []
    for bucket in buckets:
        bucket.sort()
        result.extend(bucket)

    return result
```

### Complexity

- **Time**: O(n + n²/k + k) where k = number of buckets
  - Best case (uniform distribution): O(n)
  - Worst case (all in one bucket): O(n²)
- **Space**: O(n + k)

### When to Use

- Data uniformly distributed
- Known range
- Floating-point numbers

## Comparison of Linear Sorts

| Algorithm | Time | Space | Stable | Best For |
|-----------|------|-------|--------|----------|
| Counting | O(n+k) | O(n+k) | Yes | Small integer range |
| Radix | O(d(n+k)) | O(n+k) | Yes | Fixed-length integers/strings |
| Bucket | O(n) avg | O(n+k) | Yes | Uniformly distributed data |

## Practical Considerations

### When Linear Sorts Beat O(n log n)

- **Counting**: k < n log n
- **Radix**: d × k < n log n
- **Bucket**: Data is uniformly distributed

### Limitations

- **Counting**: Only for integers, large k = large space
- **Radix**: Need to know number of digits
- **Bucket**: Assumes distribution knowledge

## Combined Approaches

```python
def hybrid_sort(arr):
    """Choose algorithm based on data."""
    if not arr:
        return arr

    min_val, max_val = min(arr), max(arr)
    n = len(arr)
    range_val = max_val - min_val

    # Use counting sort if range is small
    if range_val < n * 2:
        return counting_sort_shifted(arr, min_val, max_val)

    # Use radix sort for integers with reasonable digit count
    if isinstance(arr[0], int) and max_val < 10**9:
        return radix_sort(arr)

    # Fall back to comparison sort
    return sorted(arr)
```

## Summary

Linear time sorts exploit special properties of data. Counting sort works for small integer ranges. Radix sort processes digit by digit. Bucket sort distributes into buckets assuming uniform distribution. All achieve O(n) under appropriate conditions, beating the O(n log n) comparison sort bound.
