# Sorting Algorithms

## Introduction

Sorting is one of the most fundamental operations in computer science. Organizing data allows for efficient searching (e.g., Binary Search), easier duplicate detection, and better data analysis. There are dozens of sorting algorithms, each with its own trade-offs regarding time complexity, space complexity, and stability.

In this topic, we will categorize sorting algorithms into $O(n^2)$ elementary sorts and $O(n \log n)$ efficient sorts, and discuss when to use which.

## Learning Objectives

By the end of this topic, you will be able to:
1.  Implement and analyze elementary sorts: **Bubble Sort**, **Selection Sort**, and **Insertion Sort**.
2.  Implement and analyze efficient sorts: **Merge Sort**, **Quick Sort**, and **Heap Sort**.
3.  Understand the concept of **Stability** in sorting.
4.  Understand the difference between **comparison-based** and **non-comparison-based** sorting.
5.  Analyze the Best, Average, and Worst-case time complexities of these algorithms.

## Core Concepts

### 1. Elementary Sorts ($O(n^2)$)

These are simple to understand and implement but inefficient for large datasets.

-   **Bubble Sort:** Repeatedly swaps adjacent elements if they are in the wrong order. "Bubbles" the largest element to the end in each pass.
-   **Selection Sort:** Repeatedly finds the minimum element from the unsorted part and puts it at the beginning.
-   **Insertion Sort:** Builds the sorted array one item at a time. It takes an element and "inserts" it into its correct position in the already sorted part.
    *   *Note:* Insertion sort is very efficient ($O(n)$) for small or nearly-sorted datasets.

### 2. Efficient Sorts ($O(n \log n)$)

These use the "Divide and Conquer" strategy (covered in detail in Topic 4) to achieve better performance.

-   **Merge Sort:** Recursively splits the array in half, sorts each half, and then **merges** the sorted halves.
    *   *Pros:* Stable, guaranteed $O(n \log n)$.
    *   *Cons:* Requires $O(n)$ extra space.
-   **Quick Sort:** Selects a **pivot** element and partitions the array such that elements smaller than the pivot are on the left, and larger on the right. Then recursively sorts the partitions.
    *   *Pros:* Very fast in practice ($O(n \log n)$ average), in-place ($O(\log n)$ stack space).
    *   *Cons:* Unstable, Worst-case $O(n^2)$ (if pivot is poorly chosen).
-   **Heap Sort:** Builds a Binary Heap data structure from the array, then repeatedly extracts the maximum element.
    *   *Pros:* In-place, guaranteed $O(n \log n)$.
    *   *Cons:* Unstable, usually slower than Quick Sort in practice due to poor cache locality.

### 3. Stability

A sorting algorithm is **stable** if it preserves the relative order of equal elements.
*   *Example:* If we sort a list of Students by Grade, a stable sort ensures that students with the same Grade remain in their original alphabetical order (if they were alphabetically sorted before).
*   **Stable:** Insertion, Merge, Bubble.
*   **Unstable:** Quick, Selection, Heap.

### 4. Code Examples

**Insertion Sort (Python):**
```python
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        # Move elements of arr[0..i-1], that are greater than key,
        # to one position ahead of their current position
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
```

**Quick Sort Partition Logic:**
```python
def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i = i + 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1
```

## Common Mistakes

1.  **Choosing Bubble Sort:** Almost never use Bubble Sort in production. Insertion sort is strictly better for small inputs.
2.  **Worst-case Quicksort:** Implementing Quick Sort without randomizing the pivot or using "Median of Three" can lead to $O(n^2)$ performance on already sorted arrays.
3.  **Ignoring Space Complexity:** Merge Sort is great, but allocating new arrays for every recursive step can consume lots of memory. (Use indices to manage sub-arrays).
4.  **Off-by-one errors:** Partitioning logic in Quick Sort is notorious for infinite recursion bugs due to incorrect indices.

## Best Practices

-   **Use Built-in Sorts:** Python's `sort()` (Timsort) and C++'s `std::sort` (Introsort) are highly optimized hybrids. Use them unless you have a specific reason not to.
-   **Insertion Sort for Small Arrays:** Hybrid algorithms often switch to Insertion Sort when the sub-array size is small (e.g., < 64 elements).
-   **Consider Data Properties:**
    *   Nearly sorted? -> Insertion Sort.
    *   Memory constrained? -> Heap Sort or Quick Sort.
    *   Need stability? -> Merge Sort.

## Summary

| Algorithm | Time (Avg) | Time (Worst) | Space | Stable? | Remarks |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Bubble** | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Yes | Educational only. |
| **Insertion** | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Yes | Great for small/nearly-sorted data. |
| **Selection** | $O(n^2)$ | $O(n^2)$ | $O(1)$ | No | Minimizes writes. |
| **Merge** | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ | Yes | Predictable, stable. |
| **Quick** | $O(n \log n)$ | $O(n^2)$ | $O(\log n)$ | No | Fastest in practice (usually). |
| **Heap** | $O(n \log n)$ | $O(n \log n)$ | $O(1)$ | No | Good worst-case, no extra memory. |

Understanding these underlying mechanics allows you to not just use `array.sort()`, but to understand *why* it works and when it might fail you.
