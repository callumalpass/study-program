# Sorting Applications and Selection

Sorting enables efficient solutions to many problems. Understanding sorting applications and related algorithms like selection expands your algorithmic toolkit.

## Sorting as a Preprocessing Step

Sorting often transforms O(n²) or harder problems into O(n log n) or O(n) solutions.

### Finding Duplicates

**Without sorting**: O(n²) pairwise comparison or O(n) with hash table

**With sorting**: O(n log n) sort + O(n) scan
```python
def find_duplicates(arr):
    arr.sort()
    duplicates = []
    for i in range(1, len(arr)):
        if arr[i] == arr[i-1]:
            if not duplicates or duplicates[-1] != arr[i]:
                duplicates.append(arr[i])
    return duplicates
```

### Finding Closest Pair (1D)

**Without sorting**: O(n²) check all pairs

**With sorting**: O(n log n) sort + O(n) scan adjacent pairs
```python
def closest_pair_1d(arr):
    arr.sort()
    min_diff = float('inf')
    pair = None
    for i in range(len(arr) - 1):
        diff = arr[i+1] - arr[i]
        if diff < min_diff:
            min_diff = diff
            pair = (arr[i], arr[i+1])
    return pair
```

### Two Sum (Sorted Array)

**With hash table**: O(n) time, O(n) space

**With sorting**: O(n log n) sort + O(n) two-pointer
```python
def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        current_sum = arr[left] + arr[right]
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    return None
```

## The Selection Problem

**Problem**: Find the kth smallest element in unsorted array.

### Naive Approach

Sort and index: O(n log n)

```python
def kth_smallest_sort(arr, k):
    return sorted(arr)[k-1]
```

### Heap-Based Selection

Build max-heap of size k: O(n log k)

```python
import heapq

def kth_smallest_heap(arr, k):
    return heapq.nsmallest(k, arr)[-1]
```

### QuickSelect

Expected O(n), worst O(n²)

```python
def quickselect(arr, k):
    """Find kth smallest (0-indexed)"""
    if len(arr) == 1:
        return arr[0]

    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]

    if k < len(left):
        return quickselect(left, k)
    elif k < len(left) + len(middle):
        return pivot
    else:
        return quickselect(right, k - len(left) - len(middle))
```

### Median of Medians

Guaranteed O(n) worst case

```python
def median_of_medians(arr, k):
    """Select kth smallest in worst-case O(n)"""
    if len(arr) <= 5:
        return sorted(arr)[k]

    # Divide into groups of 5, find medians
    groups = [arr[i:i+5] for i in range(0, len(arr), 5)]
    medians = [sorted(g)[len(g)//2] for g in groups]

    # Recursively find median of medians
    pivot = median_of_medians(medians, len(medians) // 2)

    # Partition around pivot
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]

    if k < len(left):
        return median_of_medians(left, k)
    elif k < len(left) + len(middle):
        return pivot
    else:
        return median_of_medians(right, k - len(left) - len(middle))
```

## Order Statistics

The **kth order statistic** is the kth smallest element.

### Special Cases

- **k = 1**: Minimum → O(n) single pass
- **k = n**: Maximum → O(n) single pass
- **k = n/2**: Median → O(n) with quickselect

### Finding Both Min and Max

**Naive**: 2(n-1) comparisons

**Optimized**: 3⌊n/2⌋ comparisons
```python
def min_max(arr):
    n = len(arr)
    if n % 2 == 1:
        min_val = max_val = arr[0]
        start = 1
    else:
        if arr[0] < arr[1]:
            min_val, max_val = arr[0], arr[1]
        else:
            min_val, max_val = arr[1], arr[0]
        start = 2

    for i in range(start, n, 2):
        if arr[i] < arr[i+1]:
            small, large = arr[i], arr[i+1]
        else:
            small, large = arr[i+1], arr[i]

        min_val = min(min_val, small)
        max_val = max(max_val, large)

    return min_val, max_val
```

## Counting Inversions

An **inversion** is a pair (i, j) where i < j but arr[i] > arr[j].

Number of inversions measures "sortedness."

**Applications**: Collaborative filtering, rank correlation

### Merge Sort Approach: O(n log n)

```python
def count_inversions(arr):
    def merge_count(arr):
        if len(arr) <= 1:
            return arr, 0

        mid = len(arr) // 2
        left, left_inv = merge_count(arr[:mid])
        right, right_inv = merge_count(arr[mid:])

        merged = []
        inversions = left_inv + right_inv
        i = j = 0

        while i < len(left) and j < len(right):
            if left[i] <= right[j]:
                merged.append(left[i])
                i += 1
            else:
                merged.append(right[j])
                # All remaining left elements form inversions
                inversions += len(left) - i
                j += 1

        merged.extend(left[i:])
        merged.extend(right[j:])
        return merged, inversions

    _, count = merge_count(arr)
    return count
```

## Sorting Lower Bound

**Theorem**: Any comparison-based sort requires Ω(n log n) comparisons in worst case.

**Proof**: Decision tree has n! leaves (permutations). Height ≥ log₂(n!) = Θ(n log n).

**Implications**:
- Merge sort, heap sort are optimal
- To beat O(n log n), must use non-comparison methods (counting, radix)

## External Sorting

When data doesn't fit in memory:

### External Merge Sort

1. **Run formation**: Sort chunks that fit in memory
2. **Merge**: K-way merge of sorted runs from disk

```
Memory: M, Disk: N >> M

Phase 1: Create N/M sorted runs
Phase 2: K-way merge, K = M/B (B = block size)

Total I/O: O((N/B) × logₖ(N/M))
```

### Replacement Selection

Create longer runs by using a heap during run formation.

Average run length: 2M (twice memory size).

## Sorting Stability Importance

**Stable sort**: Equal elements maintain relative order.

**Why it matters**:

```python
# Sort by name, then by grade
students = [
    ('Alice', 'A'), ('Bob', 'B'), ('Carol', 'A')
]

# Stable sort by grade preserves name order within same grade
# Result: [('Alice', 'A'), ('Carol', 'A'), ('Bob', 'B')]

# Unstable might give:
# [('Carol', 'A'), ('Alice', 'A'), ('Bob', 'B')]
```

**Stable sorts**: Merge sort, insertion sort, counting sort, radix sort
**Unstable sorts**: Quick sort, heap sort, selection sort
