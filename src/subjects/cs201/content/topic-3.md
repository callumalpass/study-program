# Searching Algorithms

## Introduction

Retrieving information is just as important as storing it. Searching algorithms are designed to check for an element or retrieve it from any data structure where it is stored. The efficiency of a search algorithm depends heavily on the data structure used and whether the data is pre-processed (e.g., sorted).

In this topic, we cover the classic Linear and Binary Search, as well as Symbol Table concepts.

## Learning Objectives

By the end of this topic, you will be able to:
1.  Implement **Linear Search** and analyze its efficiency.
2.  Implement **Binary Search** iteratively and recursively.
3.  Understand the preconditions for Binary Search (Sorted Data).
4.  Understand **Interpolation Search** and when it outperforms Binary Search.
5.  Analyze the lower bounds of comparison-based searching.

## Core Concepts

### 1. Linear Search ($O(n)$)

The simplest approach: check every element one by one until you find what you are looking for.
-   **Best Case:** $O(1)$ (First element).
-   **Worst Case:** $O(n)$ (Last element or not found).
-   **Requirement:** None. Works on unsorted data, linked lists, etc.

### 2. Binary Search ($O(\log n)$)

The standard for searching in arrays. It works by repeatedly dividing the search interval in half.
-   **Requirement:** Data **must** be sorted.
-   **Mechanism:** Compare the target value to the middle element of the array.
    -   If they match, return the index.
    -   If the target is less than the middle, search the left half.
    -   If the target is greater, search the right half.

### 3. Interpolation Search

An improvement over Binary Search for instances where the values in a sorted array are uniformly distributed. Instead of always going to the middle, it "guesses" the position based on the value.
-   **Formula:** $pos = low + \frac{(x - arr[low]) \times (high - low)}{(arr[high] - arr[low])}$
-   **Complexity:** $O(\log (\log n))$ for uniformly distributed data, but $O(n)$ worst case (e.g., exponential distribution).

### 4. Code Examples

**Binary Search (Iterative Python):**
```python
def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    
    while low <= high:
        mid = (low + high) // 2
        guess = arr[mid]
        
        if guess == target:
            return mid
        if guess > target:
            high = mid - 1
        else:
            low = mid + 1
            
    return -1 # Not found
```

## Common Mistakes

1.  **Midpoint Overflow:** In languages with fixed integer sizes (like C++ or Java), calculating `mid = (low + high) / 2` can overflow if `low + high` exceeds the maximum integer limit.
    -   *Fix:* `mid = low + (high - low) / 2`.
2.  **Infinite Loops:** Incorrectly updating `low` or `high` (e.g., using `low = mid` instead of `low = mid + 1`) can cause the loop to never terminate.
3.  **Unsorted Data:** Applying Binary Search to an unsorted array will yield incorrect results (or infinite loops). Always sort first or verify sorting.

## Best Practices

-   **Sort First?** If you are searching only once, Linear Search ($O(n)$) is faster than Sort ($O(n \log n)$) + Binary Search ($O(\log n)$). If you are searching *many* times, sorting first pays off.
-   **Use Libraries:** `bisect` module in Python or `std::binary_search` / `std::lower_bound` in C++.
-   **Lower/Upper Bound:** Often we don't just want to know *if* an element exists, but where it *should* be inserted, or the range of equal elements. Understand how to modify Binary Search to find the *first* or *last* occurrence.

## Summary

| Algorithm | Precondition | Time (Avg) | Time (Worst) | Space |
| :--- | :--- | :--- | :--- | :--- |
| **Linear** | None | $O(n)$ | $O(n)$ | $O(1)$ |
| **Binary** | Sorted | $O(\log n)$ | $O(\log n)$ | $O(1)$ |
| **Interpolation** | Sorted & Uniform | $O(\log(\log n))$ | $O(n)$ | $O(1)$ |

Binary Search is a cornerstone algorithm. Its logarithmic behavior ($O(\log n)$) means it stays instant even for billions of records, making it vastly superior to Linear Search for sorted data.
