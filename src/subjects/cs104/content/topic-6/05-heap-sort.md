# Heap Sort

Heap sort combines the space efficiency of selection sort with the time efficiency of merge sort. It guarantees O(n log n) time while using only O(1) extra space, making it valuable when memory is constrained.

## The Heap Data Structure

A **heap** is a complete binary tree satisfying the heap property:
- **Max-heap**: Parent ≥ children
- **Min-heap**: Parent ≤ children

```
Max-heap:           Array representation:
       90           [90, 70, 80, 40, 50, 60, 30]
      /  \           0   1   2   3   4   5   6
    70    80
   /  \  /  \
  40  50 60 30

Parent of i: (i-1)//2
Left child: 2*i + 1
Right child: 2*i + 2
```

## Heap Operations

### Heapify (Sift Down)

Restore heap property by sifting a node down:

```python
def heapify(arr, n, i):
    """Sift down node at index i to maintain max-heap property."""
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

### Build Heap

Convert an array into a heap in O(n) time:

```python
def build_max_heap(arr):
    """Build max-heap from arbitrary array."""
    n = len(arr)
    # Start from last non-leaf node
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
```

**Why O(n)?** Most nodes are near the bottom and require few swaps. Mathematical analysis shows the total work is O(n).

## Heap Sort Algorithm

1. Build a max-heap from the array
2. Repeatedly extract the maximum (swap with last, reduce heap size, heapify)

```python
def heap_sort(arr):
    """Sort array using heap sort."""
    n = len(arr)

    # Build max-heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    # Extract elements one by one
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]  # Move max to end
        heapify(arr, i, 0)  # Heapify reduced heap

    return arr
```

## Step-by-Step Example

```
Initial: [4, 10, 3, 5, 1]

Build max-heap:
[4, 10, 3, 5, 1] → heapify at index 1 → [4, 10, 3, 5, 1]
                → heapify at index 0 → [10, 5, 3, 4, 1]

Extract maximum:
[10, 5, 3, 4, 1] → swap 10 and 1 → [1, 5, 3, 4, 10]
[1, 5, 3, 4 | 10] → heapify → [5, 4, 3, 1 | 10]

[5, 4, 3, 1 | 10] → swap 5 and 1 → [1, 4, 3 | 5, 10]
[1, 4, 3 | 5, 10] → heapify → [4, 1, 3 | 5, 10]

[4, 1, 3 | 5, 10] → swap 4 and 3 → [3, 1 | 4, 5, 10]
[3, 1 | 4, 5, 10] → heapify → [3, 1 | 4, 5, 10]

[3, 1 | 4, 5, 10] → swap 3 and 1 → [1 | 3, 4, 5, 10]

Done: [1, 3, 4, 5, 10]
```

## Complexity Analysis

**Time**: O(n log n) in all cases
- Build heap: O(n)
- n extractions, each O(log n): O(n log n)

**Space**: O(1) - in-place

**Recurrence**: Each heapify is O(log n), called n times.

## Properties

- **Stable**: No (distant swaps)
- **In-place**: Yes
- **Adaptive**: No (same time for all inputs)
- **Cache-friendly**: No (random access pattern)

## Comparison with Other O(n log n) Sorts

| Property | Heap Sort | Merge Sort | Quick Sort |
|----------|-----------|------------|------------|
| Time (worst) | O(n log n) | O(n log n) | O(n²) |
| Space | O(1) | O(n) | O(log n) |
| Stable | No | Yes | No |
| Cache | Poor | Good | Good |
| Practical speed | Slower | Fast | Fastest |

## When to Use Heap Sort

1. **Memory constrained**: Only O(1) extra space
2. **Guaranteed O(n log n)**: Unlike quicksort's O(n²) worst case
3. **Real-time systems**: Predictable performance
4. **Not for general use**: Usually slower than quicksort in practice

## Iterative Heapify

Avoid recursion overhead:

```python
def heapify_iterative(arr, n, i):
    """Iterative sift-down."""
    while True:
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2

        if left < n and arr[left] > arr[largest]:
            largest = left
        if right < n and arr[right] > arr[largest]:
            largest = right

        if largest == i:
            break

        arr[i], arr[largest] = arr[largest], arr[i]
        i = largest
```

## Floyd's Heap Construction

Build heap bottom-up (O(n)):

```python
def floyds_build_heap(arr):
    """Build heap in O(n) using Floyd's method."""
    n = len(arr)
    # Start from the last parent node
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
```

This is more efficient than inserting elements one by one (O(n log n)).

## Heap Sort Variations

### Bottom-Up Heap Sort

Slightly faster by reducing comparisons:

```python
def bottom_up_heapsort(arr):
    """Heap sort with bottom-up heapify (fewer comparisons)."""
    def sift_down(start, end):
        root = start
        while 2 * root + 1 <= end:
            child = 2 * root + 1
            if child + 1 <= end and arr[child] < arr[child + 1]:
                child += 1
            if arr[root] < arr[child]:
                arr[root], arr[child] = arr[child], arr[root]
                root = child
            else:
                return

    n = len(arr)
    # Build heap
    for start in range(n // 2 - 1, -1, -1):
        sift_down(start, n - 1)

    # Sort
    for end in range(n - 1, 0, -1):
        arr[0], arr[end] = arr[end], arr[0]
        sift_down(0, end - 1)
```

## Summary

Heap sort provides guaranteed O(n log n) time with O(1) space. While slower in practice than quicksort due to poor cache behavior, it's valuable when memory is limited or worst-case guarantees are needed. Understanding heap sort also prepares you for priority queues and other heap-based data structures.
