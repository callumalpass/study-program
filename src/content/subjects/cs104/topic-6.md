# Sorting Algorithms

## Introduction

Sorting is one of the most fundamental operations in computer science. A **sorting algorithm** arranges elements of a collection in a specific order, typically ascending or descending. Understanding sorting algorithms is essential because they appear in countless applications—from organizing databases and rendering graphics to preparing data for efficient searching.

Different sorting algorithms offer various trade-offs between time complexity, space complexity, and implementation complexity. Choosing the right algorithm depends on the size of the data, whether it's nearly sorted, memory constraints, and whether stability matters.

## Learning Objectives

By the end of this topic, you will be able to:

1. Explain how comparison-based sorting algorithms work
2. Implement bubble sort, selection sort, insertion sort, merge sort, and quick sort
3. Analyze the time and space complexity of each sorting algorithm
4. Understand the concept of sorting stability and when it matters
5. Choose appropriate sorting algorithms for different scenarios
6. Trace through sorting algorithms step by step

## Core Concepts

### What Makes a Good Sorting Algorithm?

When evaluating sorting algorithms, consider these factors:

- **Time Complexity**: How does running time scale with input size?
- **Space Complexity**: How much extra memory is required?
- **Stability**: Do equal elements maintain their relative order?
- **Adaptivity**: Does the algorithm perform better on nearly-sorted data?
- **In-place**: Does it sort without requiring significant extra space?

### Simple Sorting Algorithms: O(n²)

#### Bubble Sort

Bubble sort repeatedly steps through the list, compares adjacent elements, and swaps them if they're in the wrong order. The largest elements "bubble up" to the end.

```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:  # Optimization: stop if no swaps
            break
    return arr
```

- **Time Complexity**: O(n²) average/worst, O(n) best (already sorted)
- **Space Complexity**: O(1)
- **Stable**: Yes
- **Use case**: Educational purposes, small datasets

#### Selection Sort

Selection sort divides the array into sorted and unsorted regions. It repeatedly finds the minimum element from the unsorted region and moves it to the sorted region.

```python
def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr
```

- **Time Complexity**: O(n²) in all cases
- **Space Complexity**: O(1)
- **Stable**: No (standard implementation)
- **Use case**: When memory writes are expensive

#### Insertion Sort

Insertion sort builds the sorted array one element at a time by inserting each element into its correct position among the previously sorted elements.

```python
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr
```

- **Time Complexity**: O(n²) average/worst, O(n) best (already sorted)
- **Space Complexity**: O(1)
- **Stable**: Yes
- **Use case**: Small datasets, nearly sorted data, online sorting

### Efficient Sorting Algorithms: O(n log n)

#### Merge Sort

Merge sort uses the divide-and-conquer strategy. It divides the array into halves, recursively sorts each half, then merges the sorted halves.

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

- **Time Complexity**: O(n log n) in all cases
- **Space Complexity**: O(n) for the auxiliary array
- **Stable**: Yes
- **Use case**: When stability matters, linked lists, external sorting

#### Quick Sort

Quick sort also uses divide-and-conquer. It selects a "pivot" element and partitions the array so elements smaller than the pivot come before it, and larger elements come after.

```python
def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1

    if low < high:
        pivot_idx = partition(arr, low, high)
        quick_sort(arr, low, pivot_idx - 1)
        quick_sort(arr, pivot_idx + 1, high)
    return arr

def partition(arr, low, high):
    pivot = arr[high]  # Choose last element as pivot
    i = low - 1

    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]

    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1
```

- **Time Complexity**: O(n log n) average, O(n²) worst (poor pivot selection)
- **Space Complexity**: O(log n) for recursion stack
- **Stable**: No
- **Use case**: General-purpose sorting, in-memory sorting

### Comparison of Sorting Algorithms

| Algorithm      | Best Case  | Average    | Worst Case | Space  | Stable |
|----------------|------------|------------|------------|--------|--------|
| Bubble Sort    | O(n)       | O(n²)      | O(n²)      | O(1)   | Yes    |
| Selection Sort | O(n²)      | O(n²)      | O(n²)      | O(1)   | No     |
| Insertion Sort | O(n)       | O(n²)      | O(n²)      | O(1)   | Yes    |
| Merge Sort     | O(n log n) | O(n log n) | O(n log n) | O(n)   | Yes    |
| Quick Sort     | O(n log n) | O(n log n) | O(n²)      | O(log n)| No    |

### Stability in Sorting

A sorting algorithm is **stable** if elements with equal keys appear in the same order in the output as they appear in the input.

```python
# Example: sorting students by grade
students = [("Alice", 85), ("Bob", 90), ("Carol", 85)]

# Stable sort by grade keeps Alice before Carol
# Unstable sort might put Carol before Alice
```

Stability matters when:
- Sorting by multiple keys (sort by last name, then by first name)
- Maintaining original order of equal elements is meaningful
- Building more complex sorting operations

## Common Mistakes

1. **Off-by-one errors in loop bounds**: Carefully consider whether indices should be inclusive or exclusive

2. **Forgetting base cases in recursive sorts**: Always handle arrays of length 0 or 1

3. **Modifying the array while iterating incorrectly**: Be careful with index management during swaps

4. **Poor pivot selection in quick sort**: Using the first/last element leads to O(n²) on sorted data; consider median-of-three or random pivots

5. **Not understanding stability implications**: Assuming all sorts preserve relative order

6. **Confusing in-place vs. not in-place**: Merge sort creates new arrays; quick sort modifies in place

## Best Practices

1. **Use built-in sorts for production code**: Python's `sorted()` and `.sort()` use Timsort, a highly optimized hybrid algorithm

2. **Choose based on data characteristics**:
   - Small or nearly sorted data: Insertion sort
   - Guaranteed O(n log n) needed: Merge sort
   - General purpose, in-place: Quick sort with good pivot selection

3. **Consider stability requirements**: If you need stable sorting, use merge sort or insertion sort

4. **Optimize for your specific use case**: If data is often nearly sorted, use adaptive algorithms like insertion sort or Timsort

5. **Be aware of space constraints**: Use in-place algorithms when memory is limited

6. **Test with edge cases**: Empty arrays, single elements, all equal elements, reverse sorted

## Summary

Sorting algorithms are fundamental building blocks in computer science. Simple algorithms like bubble, selection, and insertion sort are easy to understand but have O(n²) complexity. More sophisticated divide-and-conquer algorithms like merge sort and quick sort achieve O(n log n) average complexity.

Key takeaways:
- **Bubble/Selection/Insertion Sort**: O(n²), good for small datasets or educational purposes
- **Merge Sort**: O(n log n), stable, requires O(n) extra space
- **Quick Sort**: O(n log n) average, in-place, but unstable and can degrade to O(n²)
- **Stability matters** when the relative order of equal elements is significant
- **Real-world applications** typically use hybrid algorithms like Timsort

Understanding these algorithms helps you make informed decisions about sorting strategies and prepares you for analyzing more complex algorithmic problems.
