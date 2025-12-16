# Linear-Time Sorting Algorithms

The Ω(n log n) lower bound for comparison-based sorting might seem like an insurmountable barrier, but it applies only when the algorithm learns about element order exclusively through pairwise comparisons. By exploiting additional information about the data—its range, digit structure, or distribution—we can achieve linear time sorting. These non-comparison sorts represent a fundamental insight: more information enables faster algorithms.

Linear-time sorting algorithms trade generality for speed. Where comparison sorts work on any totally ordered type, non-comparison sorts require specific assumptions about the data. Counting sort assumes integer keys in a bounded range. Radix sort assumes fixed-length representations. Bucket sort assumes approximately known distributions. When these assumptions hold, the algorithms dramatically outperform comparison sorts; when they don't, comparison sorts remain the only option.

Understanding when linear-time sorts apply requires understanding their assumptions. A naive application of counting sort to 64-bit integers would require astronomically more space than the data itself. Radix sort on variable-length strings requires careful handling. Bucket sort on pathologically distributed data degenerates to quadratic time. The art lies in recognizing when data characteristics enable linear-time approaches.

## Counting Sort

Counting sort is conceptually the simplest linear-time sort: count how many times each value appears, then reconstruct the sorted array from these counts. The key insight is that knowing the count of each value tells us exactly where each element belongs in the output. If we have three 1s, two 2s, and one 3, then 1s occupy positions 0-2, 2s occupy positions 3-4, and the 3 occupies position 5.

The algorithm works in three phases. First, we count occurrences of each value, building a histogram of the input. Second, we convert counts to cumulative counts, which tell us the ending position for elements of each value. Third, we iterate through the input backwards, placing each element at its correct position and decrementing the count. The backward iteration ensures stability—equal elements maintain their original relative order.

**Idea**: Count occurrences of each value, then place elements accordingly.

**Requirement**: Elements are integers in a known range [0, k].

```python
def counting_sort(arr, k):
    """Sort array with elements in range [0, k]"""
    n = len(arr)
    count = [0] * (k + 1)
    output = [0] * n

    # Count occurrences
    for x in arr:
        count[x] += 1

    # Compute cumulative counts (positions)
    for i in range(1, k + 1):
        count[i] += count[i - 1]

    # Build output array (iterate backwards for stability)
    for i in range(n - 1, -1, -1):
        output[count[arr[i]] - 1] = arr[i]
        count[arr[i]] -= 1

    return output
```

### Example Trace

```
Input: [4, 2, 2, 8, 3, 3, 1]
Range: k = 8

Count:   [0, 1, 2, 2, 1, 0, 0, 0, 1]
         index: 0  1  2  3  4  5  6  7  8

Cumulative: [0, 1, 3, 5, 6, 6, 6, 6, 7]
            (positions where each value ends)

Output: [1, 2, 2, 3, 3, 4, 8]
```

### Analysis

- **Time**: O(n + k) where k is the range
- **Space**: O(n + k)
- **Stable**: Yes (backward iteration preserves order)

### When to Use

- Known small range of integer values
- k = O(n) (otherwise worse than O(n log n))
- Stability required

## Radix Sort

**Idea**: Sort by each digit, from least significant to most significant, using a stable sort.

```python
def radix_sort(arr):
    if not arr:
        return arr

    max_val = max(arr)
    exp = 1

    while max_val // exp > 0:
        counting_sort_digit(arr, exp)
        exp *= 10

    return arr

def counting_sort_digit(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10

    for x in arr:
        digit = (x // exp) % 10
        count[digit] += 1

    for i in range(1, 10):
        count[i] += count[i - 1]

    for i in range(n - 1, -1, -1):
        digit = (arr[i] // exp) % 10
        output[count[digit] - 1] = arr[i]
        count[digit] -= 1

    for i in range(n):
        arr[i] = output[i]
```

### Example: Sort [170, 45, 75, 90, 802, 24, 2, 66]

```
Original: [170, 45, 75, 90, 802, 24, 2, 66]

After sorting by 1s digit:
[170, 90, 802, 2, 24, 45, 75, 66]

After sorting by 10s digit:
[802, 2, 24, 45, 66, 170, 75, 90]

After sorting by 100s digit:
[2, 24, 45, 66, 75, 90, 170, 802]
```

### Analysis

- **Time**: O(d(n + k)) where d = number of digits, k = base (10)
- **Space**: O(n + k)
- **Stable**: Yes (requires stable digit sort)

For fixed-width integers with w bits: O(n × w/log n) using base n.

### When to Use

- Fixed-length integers or strings
- Number of digits is small
- Range too large for counting sort

## Bucket Sort

**Idea**: Distribute elements into buckets, sort buckets, concatenate.

```python
def bucket_sort(arr):
    if not arr:
        return arr

    n = len(arr)
    min_val = min(arr)
    max_val = max(arr)
    bucket_range = (max_val - min_val) / n + 1

    # Create buckets
    buckets = [[] for _ in range(n)]

    # Distribute elements
    for x in arr:
        idx = int((x - min_val) / bucket_range)
        buckets[idx].append(x)

    # Sort individual buckets
    for bucket in buckets:
        bucket.sort()  # Use insertion sort for small buckets

    # Concatenate
    result = []
    for bucket in buckets:
        result.extend(bucket)

    return result
```

### Analysis

- **Best case**: O(n) when elements uniformly distributed
- **Worst case**: O(n²) when all elements in one bucket
- **Average**: O(n + n²/k + k) = O(n) when k = Θ(n)
- **Space**: O(n)

### When to Use

- Uniformly distributed floating-point numbers in [0, 1)
- Distribution is approximately known
- Can tune bucket count to distribution

## Comparison of Linear Sorts

| Algorithm | Time | Space | Requirement |
|-----------|------|-------|-------------|
| Counting Sort | O(n + k) | O(n + k) | Integers in [0, k] |
| Radix Sort | O(d(n + k)) | O(n + k) | Fixed-width keys |
| Bucket Sort | O(n) avg | O(n) | Uniform distribution |

## Why They Beat O(n log n)

**Comparison sorts** use only pairwise comparisons → decision tree → Ω(n log n).

**Non-comparison sorts** use additional information:
- **Counting sort**: Assumes bounded integer range
- **Radix sort**: Examines individual digits
- **Bucket sort**: Assumes distribution

This additional structure breaks the information-theoretic lower bound.

## Practical Considerations

### Hybrid Approaches

Real implementations often combine approaches:

```python
def hybrid_sort(arr):
    if len(arr) < 64:
        return insertion_sort(arr)  # Fast for small arrays

    max_val = max(arr)
    if max_val < 10000:
        return counting_sort(arr, max_val)

    return quick_sort(arr)  # General fallback
```

### Strings and Arbitrary Keys

Radix sort extends to strings (MSD radix sort) and other fixed-length keys.

```python
def msd_radix_sort(strings):
    # Sort strings by character at each position
    # Starting from most significant (leftmost)
    ...
```

Used in suffix arrays and string databases.

### External Sorting

When data exceeds memory, use external variants:
- External merge sort: Merge sorted chunks from disk
- External radix sort: Partition by digit, process partitions
