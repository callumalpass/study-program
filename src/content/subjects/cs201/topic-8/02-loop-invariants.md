# Loop Invariants in Practice

Loop invariants are assertions that remain true before and after each iteration. They're the key to proving iterative algorithm correctness.

## Anatomy of a Loop Invariant Proof

For a loop to be correct, prove three properties:

1. **Initialization**: Invariant holds before first iteration
2. **Maintenance**: If true before iteration, true after
3. **Termination**: When loop ends, invariant implies desired result

## Example: Array Sum

```python
def array_sum(arr):
    total = 0
    for i in range(len(arr)):
        total += arr[i]
    return total
```

**Invariant**: At the start of iteration i, `total = sum(arr[0:i])`.

**Initialization**: Before i=0, `total = 0 = sum(arr[0:0])`. ✓

**Maintenance**: If `total = sum(arr[0:i])` before iteration i, then after adding `arr[i]`, `total = sum(arr[0:i]) + arr[i] = sum(arr[0:i+1])`. ✓

**Termination**: After loop, i = n, so `total = sum(arr[0:n]) = sum(arr)`. ✓

## Example: Binary Search

```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
```

**Invariant**: If target is in arr, it's in `arr[left:right+1]`.

**Initialization**: Initially `left=0, right=n-1`, so if target is in arr, it's in `arr[0:n]`. ✓

**Maintenance**:
- If `arr[mid] < target`: target must be in right half, so new `left = mid + 1` maintains invariant.
- If `arr[mid] > target`: target must be in left half, so new `right = mid - 1` maintains invariant.

**Termination**:
- If target found: return correct index.
- If `left > right`: search space empty, target not in array, return -1. ✓

## Example: Insertion Sort

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

**Outer loop invariant**: At start of iteration i, `arr[0:i]` is sorted and contains original `arr[0:i]` elements.

**Inner loop invariant**: `arr[j+1:i+1]` contains elements greater than key, in sorted order, and `arr[j+1]` is empty (available for key or shift).

**Proof**:

*Outer initialization*: Before i=1, `arr[0:1]` is trivially sorted. ✓

*Outer maintenance*: Inner loop shifts elements > key right, places key correctly, extending sorted region to `arr[0:i+1]`. ✓

*Termination*: When i=n, `arr[0:n]` is sorted. ✓

## Example: Dutch National Flag

```python
def dutch_flag(arr, pivot):
    """Partition into < pivot, = pivot, > pivot"""
    low = 0      # Next position for < pivot
    mid = 0      # Current position
    high = len(arr) - 1  # Next position for > pivot

    while mid <= high:
        if arr[mid] < pivot:
            arr[low], arr[mid] = arr[mid], arr[low]
            low += 1
            mid += 1
        elif arr[mid] > pivot:
            arr[mid], arr[high] = arr[high], arr[mid]
            high -= 1
        else:
            mid += 1
```

**Invariant**:
- `arr[0:low]` contains elements < pivot
- `arr[low:mid]` contains elements = pivot
- `arr[mid:high+1]` is unprocessed
- `arr[high+1:n]` contains elements > pivot

**Proof**:

*Initialization*: All ranges except unprocessed are empty. ✓

*Maintenance* (case analysis):
- `arr[mid] < pivot`: Swap to low region, expand both low and mid regions. ✓
- `arr[mid] > pivot`: Swap to high region, shrink unprocessed region. ✓
- `arr[mid] = pivot`: Expand equal region into unprocessed. ✓

*Termination*: When `mid > high`, unprocessed is empty, array is partitioned. ✓

## Common Invariant Patterns

### "Processed so far"

```
Invariant: arr[0:i] has been processed correctly
```

Example: Maximum finding, cumulative sums

### "Boundary maintenance"

```
Invariant: Elements outside [left, right] cannot contain answer
```

Example: Binary search, two pointers

### "Partial solution"

```
Invariant: result contains partial answer for arr[0:i]
```

Example: Sorting (sorted prefix), DP (optimal up to i)

### "Structure preservation"

```
Invariant: Data structure property maintained
```

Example: Heap property in heapify, BST property in tree operations

## Choosing Good Invariants

1. **Captures progress**: Shows how much work is done
2. **Implies correctness**: At termination, gives desired result
3. **Maintainable**: Each iteration preserves it
4. **Verifiable**: Can check initialization easily

## Multiple Invariants

Complex algorithms may need multiple invariants:

```python
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

**Invariants**:
1. `arr[low:i+1]` contains elements ≤ pivot
2. `arr[i+1:j]` contains elements > pivot
3. `arr[j:high]` is unprocessed
4. `arr[high] = pivot`

## Invariant Debugging

When an algorithm is wrong:

1. State the intended invariant
2. Check initialization
3. Trace through iterations—where does invariant break?
4. Fix the code to maintain invariant

```python
# Buggy code
def max_element(arr):
    maximum = 0  # Bug: should be arr[0] or -inf
    for i in range(len(arr)):
        if arr[i] > maximum:
            maximum = arr[i]
    return maximum
```

**Invariant**: `maximum = max(arr[0:i])`

**Check initialization**: `maximum = 0 ≠ max(arr[0:0])` conceptually problematic if negative numbers exist.

**Fix**: `maximum = arr[0]` or handle empty array.

## Loop Invariants for Nested Loops

Each loop may have its own invariant:

```python
def matrix_multiply(A, B):
    n = len(A)
    C = [[0] * n for _ in range(n)]
    for i in range(n):
        # Invariant: C[0:i] contains correct values
        for j in range(n):
            # Invariant: C[i][0:j] contains correct values
            for k in range(n):
                # Invariant: C[i][j] = sum(A[i][0:k] * B[0:k][j])
                C[i][j] += A[i][k] * B[k][j]
    return C
```
