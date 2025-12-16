# Merge Sort

Merge sort is a divide-and-conquer algorithm that guarantees O(n log n) time complexity in all cases. It's the algorithm of choice when stability is required and memory is not a constraint.

## The Divide-and-Conquer Strategy

1. **Divide**: Split the array into two halves
2. **Conquer**: Recursively sort each half
3. **Combine**: Merge the sorted halves

```
Original:  [38, 27, 43, 3, 9, 82, 10]

Divide:    [38, 27, 43, 3]  |  [9, 82, 10]
Divide:    [38, 27] [43, 3] |  [9, 82] [10]
Divide:    [38][27] [43][3] |  [9][82] [10]

Merge:     [27, 38] [3, 43] |  [9, 82] [10]
Merge:     [3, 27, 38, 43]  |  [9, 10, 82]
Merge:     [3, 9, 10, 27, 38, 43, 82]
```

## Implementation

### Top-Down (Recursive)

```python
def merge_sort(arr):
    """Recursive merge sort."""
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)

def merge(left, right):
    """Merge two sorted arrays."""
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:  # <= for stability
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    # Append remaining elements
    result.extend(left[i:])
    result.extend(right[j:])

    return result
```

### In-Place Version (Modifies Original)

```python
def merge_sort_inplace(arr, left=0, right=None):
    """Merge sort that modifies the original array."""
    if right is None:
        right = len(arr)

    if right - left <= 1:
        return

    mid = (left + right) // 2
    merge_sort_inplace(arr, left, mid)
    merge_sort_inplace(arr, mid, right)
    merge_inplace(arr, left, mid, right)

def merge_inplace(arr, left, mid, right):
    """Merge arr[left:mid] and arr[mid:right] using extra space."""
    left_copy = arr[left:mid]
    right_copy = arr[mid:right]

    i = j = 0
    k = left

    while i < len(left_copy) and j < len(right_copy):
        if left_copy[i] <= right_copy[j]:
            arr[k] = left_copy[i]
            i += 1
        else:
            arr[k] = right_copy[j]
            j += 1
        k += 1

    while i < len(left_copy):
        arr[k] = left_copy[i]
        i += 1
        k += 1

    while j < len(right_copy):
        arr[k] = right_copy[j]
        j += 1
        k += 1
```

### Bottom-Up (Iterative)

```python
def merge_sort_iterative(arr):
    """Bottom-up merge sort without recursion."""
    n = len(arr)
    width = 1

    while width < n:
        for i in range(0, n, 2 * width):
            left = i
            mid = min(i + width, n)
            right = min(i + 2 * width, n)

            # Merge arr[left:mid] and arr[mid:right]
            merge_inplace(arr, left, mid, right)

        width *= 2

    return arr
```

## Complexity Analysis

**Time Complexity**: O(n log n) in all cases

```
Level 0: 1 merge of size n         → O(n) work
Level 1: 2 merges of size n/2      → O(n) work
Level 2: 4 merges of size n/4      → O(n) work
...
Level log n: n merges of size 1    → O(n) work

Total: O(n log n)
```

**Space Complexity**: O(n) for the auxiliary array

**Recurrence Relation**: T(n) = 2T(n/2) + O(n)
Solved by Master Theorem: O(n log n)

## Properties

- **Stable**: Yes (equal elements maintain order if we use <=)
- **In-place**: No (requires O(n) auxiliary space)
- **Adaptive**: No (same time regardless of input order)
- **Parallelizable**: Yes (merges are independent)

## Optimizations

### 1. Use Insertion Sort for Small Subarrays

```python
def merge_sort_optimized(arr):
    if len(arr) <= 10:  # Threshold for insertion sort
        return insertion_sort(arr)

    mid = len(arr) // 2
    left = merge_sort_optimized(arr[:mid])
    right = merge_sort_optimized(arr[mid:])

    return merge(left, right)
```

### 2. Skip Merge if Already Sorted

```python
def merge_sort_skip(arr, left=0, right=None):
    if right is None:
        right = len(arr)

    if right - left <= 1:
        return

    mid = (left + right) // 2
    merge_sort_skip(arr, left, mid)
    merge_sort_skip(arr, mid, right)

    # Skip merge if already sorted
    if arr[mid - 1] <= arr[mid]:
        return

    merge_inplace(arr, left, mid, right)
```

### 3. Alternate Between Auxiliary Arrays

Avoid copying by alternating roles of original and auxiliary array.

## Applications

### 1. External Sorting

When data doesn't fit in memory, merge sort shines:

```python
def external_sort(input_file, output_file, chunk_size):
    """Sort a file too large for memory."""
    # Phase 1: Create sorted chunks
    chunks = []
    with open(input_file, 'r') as f:
        while True:
            lines = []
            for _ in range(chunk_size):
                line = f.readline()
                if not line:
                    break
                lines.append(line)
            if not lines:
                break
            lines.sort()
            chunk_file = f'chunk_{len(chunks)}.tmp'
            with open(chunk_file, 'w') as cf:
                cf.writelines(lines)
            chunks.append(chunk_file)

    # Phase 2: K-way merge of chunks
    # (Implementation uses min-heap for efficiency)
```

### 2. Inversion Count

Count pairs (i, j) where i < j but arr[i] > arr[j]:

```python
def count_inversions(arr):
    """Count inversions using modified merge sort."""
    def merge_count(arr, left, mid, right):
        left_arr = arr[left:mid]
        right_arr = arr[mid:right]
        inversions = 0
        i = j = 0
        k = left

        while i < len(left_arr) and j < len(right_arr):
            if left_arr[i] <= right_arr[j]:
                arr[k] = left_arr[i]
                i += 1
            else:
                arr[k] = right_arr[j]
                inversions += len(left_arr) - i  # All remaining left elements
                j += 1
            k += 1

        arr[k:right] = left_arr[i:] + right_arr[j:]
        return inversions

    def sort_count(arr, left, right):
        if right - left <= 1:
            return 0
        mid = (left + right) // 2
        return (sort_count(arr, left, mid) +
                sort_count(arr, mid, right) +
                merge_count(arr, left, mid, right))

    return sort_count(arr.copy(), 0, len(arr))
```

## Summary

Merge sort guarantees O(n log n) time and provides stability, making it ideal when these properties matter. The trade-off is O(n) space complexity. It's excellent for external sorting and linked lists. Hybrid implementations use insertion sort for small subarrays.
