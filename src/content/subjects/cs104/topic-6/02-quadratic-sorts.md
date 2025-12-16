# Quadratic Sorting Algorithms

The "simple" sorting algorithms - Bubble Sort, Selection Sort, and Insertion Sort - all have O(n²) worst-case complexity. While not efficient for large datasets, they're important to understand and have practical uses for small arrays.

## Bubble Sort

Repeatedly swap adjacent elements if they're in the wrong order. The largest unsorted element "bubbles up" to its correct position each pass.

```python
def bubble_sort(arr):
    """Bubble sort with early termination optimization."""
    n = len(arr)

    for i in range(n):
        swapped = False

        for j in range(n - 1 - i):  # Last i elements are sorted
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True

        if not swapped:  # Array is sorted
            break

    return arr
```

### Visualization

```
Initial: [5, 1, 4, 2, 8]

Pass 1:
[5, 1, 4, 2, 8] → [1, 5, 4, 2, 8]  # 5 > 1, swap
[1, 5, 4, 2, 8] → [1, 4, 5, 2, 8]  # 5 > 4, swap
[1, 4, 5, 2, 8] → [1, 4, 2, 5, 8]  # 5 > 2, swap
[1, 4, 2, 5, 8] → [1, 4, 2, 5, 8]  # 5 < 8, no swap
# 8 is now in correct position

Pass 2:
[1, 4, 2, 5, 8] → [1, 4, 2, 5, 8]  # 1 < 4
[1, 4, 2, 5, 8] → [1, 2, 4, 5, 8]  # 4 > 2, swap
[1, 2, 4, 5, 8] → [1, 2, 4, 5, 8]  # 4 < 5
# 5 is now in correct position

Pass 3:
[1, 2, 4, 5, 8] → no swaps needed
# Early termination!
```

### Properties

- **Time**: O(n²) average/worst, O(n) best (already sorted)
- **Space**: O(1)
- **Stable**: Yes
- **Adaptive**: Yes (with early termination)

## Selection Sort

Find the minimum element in the unsorted portion and swap it to the front.

```python
def selection_sort(arr):
    """Selection sort."""
    n = len(arr)

    for i in range(n):
        # Find minimum in arr[i:]
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j

        # Swap minimum to position i
        arr[i], arr[min_idx] = arr[min_idx], arr[i]

    return arr
```

### Visualization

```
Initial: [64, 25, 12, 22, 11]

Pass 1: Find min (11) at index 4, swap with index 0
[11, 25, 12, 22, 64]

Pass 2: Find min (12) at index 2, swap with index 1
[11, 12, 25, 22, 64]

Pass 3: Find min (22) at index 3, swap with index 2
[11, 12, 22, 25, 64]

Pass 4: Find min (25) at index 3, already in place
[11, 12, 22, 25, 64]

Done!
```

### Properties

- **Time**: O(n²) in all cases (always scans entire unsorted portion)
- **Space**: O(1)
- **Stable**: No (swapping can change order of equal elements)
- **Adaptive**: No

**Key advantage**: Minimizes the number of swaps (at most n-1 swaps). Useful when writes are expensive (e.g., flash memory).

## Insertion Sort

Build the sorted array one element at a time by inserting each element into its correct position.

```python
def insertion_sort(arr):
    """Insertion sort."""
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1

        # Shift elements greater than key to the right
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1

        arr[j + 1] = key

    return arr
```

### Visualization

```
Initial: [5, 2, 4, 6, 1, 3]

i=1, key=2: [5, 5, 4, 6, 1, 3] → [2, 5, 4, 6, 1, 3]
i=2, key=4: [2, 5, 5, 6, 1, 3] → [2, 4, 5, 6, 1, 3]
i=3, key=6: [2, 4, 5, 6, 1, 3] → already in place
i=4, key=1: [2, 4, 5, 6, 6, 3] → [2, 4, 5, 5, 6, 3] → [2, 4, 4, 5, 6, 3]
           → [2, 2, 4, 5, 6, 3] → [1, 2, 4, 5, 6, 3]
i=5, key=3: [1, 2, 4, 5, 6, 6] → [1, 2, 4, 5, 5, 6] → [1, 2, 4, 4, 5, 6]
           → [1, 2, 3, 4, 5, 6]
```

### Properties

- **Time**: O(n²) average/worst, O(n) best (already sorted)
- **Space**: O(1)
- **Stable**: Yes
- **Adaptive**: Yes (fast on nearly sorted data)

## Comparison

| Aspect | Bubble | Selection | Insertion |
|--------|--------|-----------|-----------|
| Best Case | O(n) | O(n²) | O(n) |
| Swaps | Many | O(n) | Many |
| Adaptive | Yes | No | Yes |
| Stable | Yes | No | Yes |
| Online | No | No | Yes |

**Online**: Can sort data as it arrives (insertion sort can).

## When to Use Quadratic Sorts

1. **Small arrays (n < 50)**: Overhead of O(n log n) algorithms not worth it
2. **Nearly sorted data**: Insertion sort is O(n)
3. **Few swaps needed**: Selection sort
4. **Teaching/learning**: Simple to understand and implement
5. **Hybrid algorithms**: Many O(n log n) sorts use insertion sort for small subarrays

## Binary Insertion Sort

Use binary search to find insertion position (reduces comparisons but not shifts):

```python
def binary_insertion_sort(arr):
    """Insertion sort with binary search for position."""
    for i in range(1, len(arr)):
        key = arr[i]

        # Binary search for insertion position
        lo, hi = 0, i
        while lo < hi:
            mid = (lo + hi) // 2
            if arr[mid] < key:
                lo = mid + 1
            else:
                hi = mid

        # Shift and insert
        arr[lo+1:i+1] = arr[lo:i]
        arr[lo] = key

    return arr
```

Comparisons: O(n log n), but shifts still O(n²).

## Summary

Bubble, Selection, and Insertion sorts all have O(n²) worst-case time. Insertion sort is generally best among them due to adaptive behavior on nearly sorted data. Selection sort minimizes swaps. These algorithms are practical for small arrays and form building blocks for hybrid sorting algorithms.
