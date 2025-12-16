# Binary Search

Binary search is the quintessential divide-and-conquer algorithm, efficiently finding elements in sorted data. Mastering its variations is essential for algorithm design.

## Basic Binary Search

**Problem**: Find target in sorted array.

**Idea**: Compare with middle, eliminate half each iteration.

```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = left + (right - left) // 2  # Avoid overflow

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1  # Not found
```

**Analysis**:
- Time: O(log n)
- Space: O(1) iterative, O(log n) recursive

### Why It Works

Invariant: If target exists, it's in arr[left...right].

Each iteration halves the search space: n → n/2 → n/4 → ... → 1

Number of iterations: ⌈log₂(n)⌉

## Common Variations

### Find First Occurrence

```python
def binary_search_first(arr, target):
    left, right = 0, len(arr) - 1
    result = -1

    while left <= right:
        mid = left + (right - left) // 2

        if arr[mid] == target:
            result = mid
            right = mid - 1  # Keep searching left
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return result
```

### Find Last Occurrence

```python
def binary_search_last(arr, target):
    left, right = 0, len(arr) - 1
    result = -1

    while left <= right:
        mid = left + (right - left) // 2

        if arr[mid] == target:
            result = mid
            left = mid + 1   # Keep searching right
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return result
```

### Lower Bound (First ≥ target)

```python
def lower_bound(arr, target):
    left, right = 0, len(arr)

    while left < right:
        mid = left + (right - left) // 2

        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid

    return left
```

### Upper Bound (First > target)

```python
def upper_bound(arr, target):
    left, right = 0, len(arr)

    while left < right:
        mid = left + (right - left) // 2

        if arr[mid] <= target:
            left = mid + 1
        else:
            right = mid

    return left
```

## Binary Search on Answer

**Powerful technique**: Binary search the solution space when:
1. Answer lies in a monotonic range
2. We can efficiently verify if an answer is valid

### Example: Minimum Speed for Eating Bananas

```python
def min_eating_speed(piles, h):
    """Find minimum eating speed to finish piles in h hours."""

    def can_finish(speed):
        hours = sum((pile + speed - 1) // speed for pile in piles)
        return hours <= h

    left, right = 1, max(piles)

    while left < right:
        mid = left + (right - left) // 2

        if can_finish(mid):
            right = mid      # Try smaller speed
        else:
            left = mid + 1   # Need faster speed

    return left
```

### Example: Square Root

```python
def integer_sqrt(n):
    if n < 2:
        return n

    left, right = 1, n // 2

    while left <= right:
        mid = left + (right - left) // 2
        square = mid * mid

        if square == n:
            return mid
        elif square < n:
            left = mid + 1
        else:
            right = mid - 1

    return right  # Floor of square root
```

## Binary Search Templates

### Template 1: Find exact match

```python
while left <= right:
    mid = left + (right - left) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        left = mid + 1
    else:
        right = mid - 1
return -1
```

### Template 2: Find boundary

```python
while left < right:
    mid = left + (right - left) // 2
    if condition(mid):
        right = mid
    else:
        left = mid + 1
return left
```

### Template 3: Find in rotated array

```python
while left < right:
    mid = left + (right - left) // 2
    if arr[mid] > arr[right]:
        left = mid + 1   # Min is in right half
    else:
        right = mid      # Min is in left half (including mid)
return left
```

## Common Pitfalls

**Off-by-one errors**: Most common bug. Carefully choose:
- `left <= right` vs `left < right`
- `mid + 1` vs `mid`
- `mid - 1` vs `mid`

**Integer overflow**: Use `left + (right - left) // 2` instead of `(left + right) // 2`.

**Infinite loops**: Ensure search space shrinks. If `right = mid`, use `left < right`.

**Wrong invariant**: Clearly define what left, right, and result represent.

## Applications

### Finding in Sorted Collections

```python
import bisect

arr = [1, 3, 5, 7, 9]
bisect.bisect_left(arr, 5)   # Returns 2 (index of 5)
bisect.bisect_right(arr, 5)  # Returns 3 (after 5)
```

### Search in Rotated Array

```python
def search_rotated(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = left + (right - left) // 2

        if arr[mid] == target:
            return mid

        # Left half is sorted
        if arr[left] <= arr[mid]:
            if arr[left] <= target < arr[mid]:
                right = mid - 1
            else:
                left = mid + 1
        # Right half is sorted
        else:
            if arr[mid] < target <= arr[right]:
                left = mid + 1
            else:
                right = mid - 1

    return -1
```

### Peak Finding

```python
def find_peak(arr):
    left, right = 0, len(arr) - 1

    while left < right:
        mid = left + (right - left) // 2

        if arr[mid] < arr[mid + 1]:
            left = mid + 1   # Peak is to the right
        else:
            right = mid      # Peak is at mid or left

    return left
```
