# Sorting Fundamentals

Sorting is one of the most fundamental operations in computer science. Understanding different sorting algorithms, their trade-offs, and when to use each is essential for every programmer.

## Why Sorting Matters

Sorting enables:
- **Efficient searching**: Binary search requires sorted data (O(log n) vs O(n))
- **Data presentation**: Displaying information in meaningful order
- **Problem solving**: Many algorithms assume or benefit from sorted input
- **Database operations**: ORDER BY, indexing, merge joins

## Sorting Terminology

**In-place**: Uses O(1) extra space (modifies input array)
**Stable**: Equal elements maintain their relative order
**Comparison-based**: Compares pairs of elements to determine order
**Adaptive**: Runs faster on partially sorted input

```python
# Stability example
data = [(3, 'a'), (1, 'b'), (3, 'c'), (1, 'd')]

# Stable sort by first element:
# [(1, 'b'), (1, 'd'), (3, 'a'), (3, 'c')]  # b before d, a before c

# Unstable sort might give:
# [(1, 'd'), (1, 'b'), (3, 'c'), (3, 'a')]  # Order of equal elements changed
```

## Classification by Complexity

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | No |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | No |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | No |

## Lower Bound for Comparison Sorts

Any comparison-based sorting algorithm must make at least O(n log n) comparisons in the worst case.

**Proof sketch**: There are n! possible orderings. Each comparison splits possibilities in half. To distinguish n! orderings requires log₂(n!) ≈ n log n comparisons.

Non-comparison sorts (Counting, Radix, Bucket) can achieve O(n) under certain conditions.

## Python's Built-in Sorting

Python uses **Timsort**, a hybrid of merge sort and insertion sort:

```python
# Sort a list in place
arr = [3, 1, 4, 1, 5, 9]
arr.sort()  # [1, 1, 3, 4, 5, 9]

# Return new sorted list
arr = [3, 1, 4, 1, 5, 9]
sorted_arr = sorted(arr)  # Original unchanged

# Custom key function
words = ['banana', 'apple', 'cherry']
words.sort(key=len)  # ['apple', 'banana', 'cherry']

# Reverse order
arr.sort(reverse=True)  # [9, 5, 4, 3, 1, 1]

# Multiple criteria
people = [('Alice', 30), ('Bob', 25), ('Alice', 25)]
people.sort(key=lambda x: (x[0], x[1]))  # Sort by name, then age
```

## Measuring Sort Performance

```python
import time
import random

def measure_sort(sort_func, n, trials=5):
    """Measure average sorting time."""
    total = 0
    for _ in range(trials):
        arr = [random.randint(0, n) for _ in range(n)]
        start = time.time()
        sort_func(arr.copy())
        total += time.time() - start
    return total / trials

# Example usage
# O(n²) sorts become impractical around n=10,000
# O(n log n) sorts handle millions easily
```

## Choosing a Sorting Algorithm

**Small arrays (n < 50)**: Insertion sort (low overhead, cache-friendly)

**General purpose**: Quicksort or Timsort

**Guaranteed O(n log n)**: Merge sort or Heap sort

**Nearly sorted data**: Insertion sort (O(n) best case)

**Need stability**: Merge sort or Timsort

**Memory constrained**: Heap sort (O(1) space)

**Integer data in known range**: Counting sort (O(n + k))

## Common Mistakes

1. **Not considering stability**: Important when sorting by multiple keys
2. **Ignoring input characteristics**: Nearly sorted data, many duplicates
3. **Wrong algorithm for size**: O(n²) is fine for n=100, not n=1,000,000
4. **Modifying while iterating**: Don't sort the array you're iterating over

## Summary

Sorting is fundamental to computer science. Understand the trade-offs between algorithms: time complexity, space complexity, stability, and adaptiveness. Use language built-ins (Timsort in Python) for general cases, but know when specialized algorithms are better.
