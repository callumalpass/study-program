# Comparison-Based Sorting Algorithms

Comparison sorts determine element order by comparing pairs. Understanding their mechanics reveals fundamental algorithmic paradigms.

## The Sorting Problem

**Input**: Array of n comparable elements
**Output**: Array with elements in non-decreasing order

**Stability**: A sort is stable if equal elements maintain their relative order.

## Selection Sort

**Idea**: Find minimum element, place it first. Repeat for remaining array.

```python
def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
```

**Analysis**:
- Time: Θ(n²) always (both loops run fully)
- Space: O(1)
- Stable: No (swaps can change relative order)
- Comparisons: n(n-1)/2

**When to use**: Rarely. Minimizes swaps (good when writes are expensive).

## Insertion Sort

**Idea**: Build sorted portion by inserting each element in correct position.

```python
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
```

**Analysis**:
- Time: O(n²) worst, O(n) best (already sorted)
- Space: O(1)
- Stable: Yes
- Adaptive: Yes (faster on nearly-sorted data)

**When to use**: Small arrays, nearly-sorted data, online sorting (streaming).

## Bubble Sort

**Idea**: Repeatedly swap adjacent elements that are out of order.

```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
```

**Analysis**:
- Time: O(n²) worst/average, O(n) best
- Space: O(1)
- Stable: Yes

**When to use**: Educational purposes only. Insertion sort is better in practice.

## Merge Sort

**Idea**: Divide array in half, recursively sort halves, merge sorted halves.

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)

def merge(left, right):
    result = []
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

**Analysis**:
- Time: Θ(n log n) always
- Space: O(n)
- Stable: Yes

**Recurrence**: T(n) = 2T(n/2) + O(n) → O(n log n)

**When to use**: Need guaranteed O(n log n), stability required, external sorting.

## Quick Sort

**Idea**: Pick pivot, partition array around pivot, recursively sort partitions.

```python
def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1

    if low < high:
        pivot_idx = partition(arr, low, high)
        quick_sort(arr, low, pivot_idx - 1)
        quick_sort(arr, pivot_idx + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1
```

**Analysis**:
- Time: O(n log n) average, O(n²) worst (sorted input with bad pivot)
- Space: O(log n) average stack, O(n) worst
- Stable: No (basic version)

**When to use**: General-purpose sorting, cache-efficient, in-place needed.

## Heap Sort

**Idea**: Build max-heap, repeatedly extract maximum.

```python
def heap_sort(arr):
    n = len(arr)

    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    # Extract elements
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)

def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right

    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)
```

**Analysis**:
- Time: O(n log n) always
- Space: O(1)
- Stable: No

**When to use**: Guaranteed O(n log n), O(1) space, no recursion stack concerns.

## Comparison Summary

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| Selection | Θ(n²) | Θ(n²) | Θ(n²) | O(1) | No |
| Insertion | Θ(n) | Θ(n²) | Θ(n²) | O(1) | Yes |
| Bubble | Θ(n) | Θ(n²) | Θ(n²) | O(1) | Yes |
| Merge | Θ(n log n) | Θ(n log n) | Θ(n log n) | O(n) | Yes |
| Quick | Θ(n log n) | Θ(n log n) | Θ(n²) | O(log n) | No |
| Heap | Θ(n log n) | Θ(n log n) | Θ(n log n) | O(1) | No |

## Lower Bound for Comparison Sorts

**Theorem**: Any comparison-based sort requires Ω(n log n) comparisons in worst case.

**Proof sketch**: Decision tree with n! leaves (permutations) has height ≥ log₂(n!) = Θ(n log n).

This means merge sort, heap sort, and well-implemented quick sort are optimal.
