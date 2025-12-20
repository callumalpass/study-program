---
id: cs201-t2-comparison
title: "Comparison-Based Sorting"
order: 1
---

# Comparison-Based Sorting Algorithms

Sorting is one of the most fundamental operations in computer science. Databases sort records for efficient queries, search engines sort results by relevance, graphics systems sort objects by depth for rendering, and operating systems sort processes by priority for scheduling. The ubiquity of sorting has driven decades of algorithm development, producing a rich landscape of techniques with different trade-offs.

Comparison-based sorting algorithms determine element order by comparing pairs of elements, asking "is A less than B?" This simple interface applies to any ordered data type—numbers, strings, custom objects with comparison operators—making comparison sorts universally applicable. The trade-off is a fundamental limit: any comparison sort requires at least Ω(n log n) comparisons in the worst case.

Understanding comparison sorts means understanding the major algorithmic paradigms: divide-and-conquer (merge sort, quick sort), incremental construction (insertion sort), and heap-based selection (heap sort). Each paradigm offers different trade-offs between time complexity, space usage, stability, and practical performance. Choosing the right algorithm for a specific context—data size, memory constraints, distribution properties—is a key skill in algorithm design.

## The Sorting Problem

**Input**: Array of n comparable elements
**Output**: Array with elements in non-decreasing order

**Stability**: A sort is stable if equal elements maintain their relative order. Stability matters when sorting by multiple keys (first by city, then by name within each city) or when the original order carries meaning.

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

```mermaid
graph TD
    subgraph "Simple Sorts O(n²)"
        S1[Selection Sort<br/>Always Θ(n²)]
        S2[Insertion Sort<br/>Best: O(n)]
        S3[Bubble Sort<br/>Best: O(n)]
    end

    subgraph "Efficient Sorts O(n log n)"
        E1[Merge Sort<br/>Always Θ(n log n)<br/>Space: O(n)]
        E2[Quick Sort<br/>Average: Θ(n log n)<br/>Worst: O(n²)]
        E3[Heap Sort<br/>Always Θ(n log n)<br/>Space: O(1)]
    end

    Decision{Array size &<br/>characteristics?}
    Decision -->|Small/Nearly sorted| S2
    Decision -->|Need guaranteed<br/>O(n log n)| E1
    Decision -->|Average case,<br/>in-place| E2
    Decision -->|Guaranteed O(n log n)<br/>& O(1) space| E3

    style E1 fill:#4caf50
    style E2 fill:#81c784
    style E3 fill:#a5d6a7
```

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| Selection | $\Theta(n^2)$ | $\Theta(n^2)$ | $\Theta(n^2)$ | $O(1)$ | No |
| Insertion | $\Theta(n)$ | $\Theta(n^2)$ | $\Theta(n^2)$ | $O(1)$ | Yes |
| Bubble | $\Theta(n)$ | $\Theta(n^2)$ | $\Theta(n^2)$ | $O(1)$ | Yes |
| Merge | $\Theta(n \log n)$ | $\Theta(n \log n)$ | $\Theta(n \log n)$ | $O(n)$ | Yes |
| Quick | $\Theta(n \log n)$ | $\Theta(n \log n)$ | $\Theta(n^2)$ | $O(\log n)$ | No |
| Heap | $\Theta(n \log n)$ | $\Theta(n \log n)$ | $\Theta(n \log n)$ | $O(1)$ | No |

## Lower Bound for Comparison Sorts

**Theorem**: Any comparison-based sort requires $\Omega(n \log n)$ comparisons in worst case.

**Proof sketch**:

Consider the decision tree model where each internal node represents a comparison and each leaf represents a permutation (sorted output).

1. The tree must have at least $n!$ leaves (one for each possible permutation)
2. A binary tree of height $h$ has at most $2^h$ leaves
3. Therefore: $2^h \geq n!$
4. Taking logarithms: $h \geq \log_2(n!)$

Using Stirling's approximation:

$$\log_2(n!) = \log_2\left(\sqrt{2\pi n}\left(\frac{n}{e}\right)^n\right) = \Theta(n \log n)$$

Therefore, the minimum height is $h = \Omega(n \log n)$.

**Conclusion**: Merge sort, heap sort, and well-implemented quick sort are asymptotically optimal for comparison-based sorting.
