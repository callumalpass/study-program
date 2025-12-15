## Divide and Conquer

Divide-and-conquer problems have this shape:

1. Split the problem into smaller parts
2. Solve the parts (often recursively)
3. Combine results

---

## Binary Search (Recursive)

Binary search finds an item in a *sorted* list by repeatedly halving the search space.

```python
def binary_search(arr, target, low=0, high=None):
    if high is None:
        high = len(arr) - 1

    if low > high:
        return -1

    mid = (low + high) // 2

    if arr[mid] == target:
        return mid
    if arr[mid] < target:
        return binary_search(arr, target, mid + 1, high)
    return binary_search(arr, target, low, mid - 1)
```

Key requirement: `arr` must be sorted, otherwise the logic breaks.

---

## Grid Paths (Multiple Recursive Calls)

Sometimes recursion branches into multiple calls:

```python
def count_paths(m, n):
    if m == 1 or n == 1:
        return 1
    return count_paths(m - 1, n) + count_paths(m, n - 1)
```

This is elegant but can be slow for large grids—memoization helps (next subtopic).

