## Divide and Conquer

Divide and conquer is a powerful algorithm design strategy that naturally leads to recursive solutions. The idea is simple: break a problem into smaller subproblems, solve them (often recursively), and combine the results. Many of the most efficient algorithms in computer science follow this pattern.

---

## The Divide and Conquer Pattern

Every divide-and-conquer algorithm has three steps:

1. **Divide**: Split the problem into smaller subproblems
2. **Conquer**: Solve each subproblem (often recursively)
3. **Combine**: Merge the solutions into a solution for the original problem

```python
def divide_and_conquer(problem):
    # Base case: problem is small enough to solve directly
    if is_simple(problem):
        return solve_directly(problem)

    # Divide: split into subproblems
    subproblems = divide(problem)

    # Conquer: solve subproblems recursively
    solutions = [divide_and_conquer(sub) for sub in subproblems]

    # Combine: merge solutions
    return combine(solutions)
```

---

## Binary Search

Binary search finds an element in a sorted array by repeatedly halving the search space. It's one of the most important algorithms to know.

```python
def binary_search(arr, target, low=0, high=None):
    if high is None:
        high = len(arr) - 1

    # Base case: element not found
    if low > high:
        return -1

    # Divide: find the middle
    mid = (low + high) // 2

    # Base case: found it
    if arr[mid] == target:
        return mid

    # Conquer: search the appropriate half
    if arr[mid] < target:
        return binary_search(arr, target, mid + 1, high)
    else:
        return binary_search(arr, target, low, mid - 1)

numbers = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
print(binary_search(numbers, 7))   # 3 (index of 7)
print(binary_search(numbers, 8))   # -1 (not found)
```

### Why Binary Search Is Fast

Each comparison eliminates half the remaining elements:
- 1000 elements → 10 comparisons maximum
- 1,000,000 elements → 20 comparisons maximum
- 1,000,000,000 elements → 30 comparisons maximum

This is O(log n) time complexity, far better than linear search's O(n).

### The Critical Requirement

Binary search **only works on sorted data**. If the array isn't sorted, the logic breaks down completely.

---

## Merge Sort

Merge sort is a classic divide-and-conquer sorting algorithm:

1. **Divide**: Split the array in half
2. **Conquer**: Recursively sort each half
3. **Combine**: Merge the two sorted halves

```python
def merge_sort(arr):
    # Base case: arrays of 0 or 1 element are already sorted
    if len(arr) <= 1:
        return arr

    # Divide: split in half
    mid = len(arr) // 2
    left = arr[:mid]
    right = arr[mid:]

    # Conquer: sort each half
    sorted_left = merge_sort(left)
    sorted_right = merge_sort(right)

    # Combine: merge sorted halves
    return merge(sorted_left, sorted_right)

def merge(left, right):
    """Merge two sorted arrays into one sorted array."""
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    # Add remaining elements
    result.extend(left[i:])
    result.extend(right[j:])
    return result

print(merge_sort([64, 34, 25, 12, 22, 11, 90]))
# [11, 12, 22, 25, 34, 64, 90]
```

### How Merge Sort Works

```
merge_sort([64, 34, 25, 12])
├── merge_sort([64, 34])
│   ├── merge_sort([64]) → [64]
│   └── merge_sort([34]) → [34]
│   → merge([64], [34]) → [34, 64]
└── merge_sort([25, 12])
    ├── merge_sort([25]) → [25]
    └── merge_sort([12]) → [12]
    → merge([25], [12]) → [12, 25]
→ merge([34, 64], [12, 25]) → [12, 25, 34, 64]
```

Merge sort is O(n log n) - optimal for comparison-based sorting.

---

## Counting Grid Paths

A classic problem: count the number of ways to move from the top-left to bottom-right of a grid, moving only right or down.

```python
def count_paths(rows, cols):
    # Base case: single row or column has only one path
    if rows == 1 or cols == 1:
        return 1

    # Recursive case: paths from above + paths from left
    return count_paths(rows - 1, cols) + count_paths(rows, cols - 1)

print(count_paths(3, 3))  # 6
print(count_paths(4, 4))  # 20
```

This creates a tree of recursive calls. From any cell, you can come from above (rows-1, cols) or from the left (rows, cols-1).

### Visualization

For a 3×3 grid:
```
Start → → →
  ↓       ↓
  ↓   → → ↓
  ↓       ↓
  → → → End
```

The 6 paths correspond to different orderings of 2 rights and 2 downs.

---

## Maximum Subarray Sum

Find the contiguous subarray with the largest sum. This can be solved with divide and conquer:

```python
def max_subarray(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1

    # Base case: single element
    if low == high:
        return arr[low]

    # Divide
    mid = (low + high) // 2

    # Conquer: find max in left, right, and crossing
    left_max = max_subarray(arr, low, mid)
    right_max = max_subarray(arr, mid + 1, high)
    cross_max = max_crossing_sum(arr, low, mid, high)

    # Combine: return the maximum
    return max(left_max, right_max, cross_max)

def max_crossing_sum(arr, low, mid, high):
    """Find max subarray that crosses the midpoint."""
    # Find max sum starting from mid going left
    left_sum = float('-inf')
    total = 0
    for i in range(mid, low - 1, -1):
        total += arr[i]
        left_sum = max(left_sum, total)

    # Find max sum starting from mid+1 going right
    right_sum = float('-inf')
    total = 0
    for i in range(mid + 1, high + 1):
        total += arr[i]
        right_sum = max(right_sum, total)

    return left_sum + right_sum

arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
print(max_subarray(arr))  # 6 (subarray [4, -1, 2, 1])
```

---

## Tree Recursion: Multiple Branches

When divide-and-conquer splits into multiple subproblems, the call structure forms a tree:

```python
def tree_example(n):
    if n <= 0:
        return 1
    return tree_example(n - 1) + tree_example(n - 1)

# Creates 2^n calls!
```

For `tree_example(4)`:
```
                tree(4)
              /        \
         tree(3)      tree(3)
         /    \       /    \
      tree(2) tree(2) tree(2) tree(2)
      ...and so on...
```

This exponential growth is why naive Fibonacci is slow - and why memoization is so important (next subtopic).

---

## When to Use Divide and Conquer

Divide and conquer works well when:

1. **The problem can be broken into independent subproblems** - solving one doesn't affect the others
2. **Subproblems have the same structure as the original** - recursion is natural
3. **Combining solutions is efficient** - merging shouldn't be harder than solving
4. **The division reduces problem size significantly** - halving is ideal

Classic applications:
- **Sorting**: Merge sort, quicksort
- **Searching**: Binary search
- **Computational geometry**: Closest pair of points
- **Matrix operations**: Strassen's algorithm
- **Numerical**: Fast Fourier Transform

---

## Quicksort (Brief Introduction)

Another divide-and-conquer sorting algorithm:

```python
def quicksort(arr):
    if len(arr) <= 1:
        return arr

    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]

    return quicksort(left) + middle + quicksort(right)

print(quicksort([3, 6, 8, 10, 1, 2, 1]))
# [1, 1, 2, 3, 6, 8, 10]
```

Quicksort divides by value (elements less than/greater than pivot) rather than by position.

---

## Key Takeaways

- **Divide and conquer**: Split, solve recursively, combine
- **Binary search**: Halve the search space each step - O(log n)
- **Merge sort**: Sort halves, merge them - O(n log n)
- **Grid paths**: Count by summing paths from above and left
- **Multiple recursive calls** create tree-shaped execution
- Works best when subproblems are **independent** and **combining is cheap**
- **Halving** problems gives logarithmic depth (efficient)
- Many efficient algorithms follow this pattern

