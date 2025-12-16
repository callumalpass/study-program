# Binary Search

Binary search is the quintessential divide-and-conquer algorithm, efficiently finding elements in sorted data by repeatedly halving the search space. Despite its conceptual simplicity, binary search is notoriously tricky to implement correctly—Jon Bentley famously noted that only about 10% of professional programmers can write a correct binary search on their first attempt. Mastering its variations and understanding its subtleties is essential for algorithm design.

The elegance of binary search lies in its logarithmic efficiency. Where linear search examines every element, binary search eliminates half the possibilities with each comparison. Searching one million elements requires at most 20 comparisons—a dramatic improvement that makes binary search indispensable for any operation on sorted data.

Beyond simple element lookup, binary search generalizes to a powerful algorithmic paradigm called "binary search on answer." When a problem has a monotonic structure—answers that transition from invalid to valid (or vice versa) at some boundary—binary search can efficiently find that boundary even when the answer space is enormous.

## Basic Binary Search

The fundamental binary search algorithm finds a target value in a sorted array by maintaining a search interval and repeatedly narrowing it.

**Problem**: Find target in sorted array.

**Idea**: Compare with the middle element and eliminate half the search space each iteration. If the middle element equals the target, we're done. If the target is larger, it must be in the right half. If smaller, it must be in the left half.

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
- Time: O(log n) — each iteration halves the search space
- Space: O(1) iterative, O(log n) recursive due to call stack

The formula `mid = left + (right - left) // 2` deserves attention. While mathematically equivalent to `(left + right) // 2`, the latter can overflow when left and right are large integers. The subtraction-first version is always safe.

### Why It Works

The algorithm maintains an invariant: if the target exists in the array, it must be in the range arr[left...right]. Each iteration either finds the target or establishes that it's not in one half of the current range, allowing us to discard that half.

The search space shrinks exponentially: n → n/2 → n/4 → ... → 1

After k iterations, at most n/2^k elements remain. When n/2^k = 1, we have k = log₂(n). Thus, the algorithm terminates in at most ⌈log₂(n)⌉ iterations.

The correctness proof is a classic loop invariant argument: we show the invariant holds initially (target might be anywhere in the array), is preserved by each iteration (we only discard elements provably not equal to target), and upon termination either we've found the target or the interval is empty (target doesn't exist).

## Common Variations

Binary search variations differ in what they find: the exact match, the first occurrence, the last occurrence, or a boundary position. Each variation requires subtle adjustments to the loop condition and update rules.

### Find First Occurrence

When the array contains duplicates, we might want the leftmost occurrence. The key insight is that when we find a match, instead of returning immediately, we record the position and continue searching left for a potentially earlier occurrence.

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

Symmetrically, to find the rightmost occurrence, we continue searching right after finding a match.

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

Lower bound finds the first position where we could insert the target while maintaining sorted order—equivalently, the first element greater than or equal to target. This is the most generally useful boundary search.

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

Note the different loop condition (`left < right` instead of `left <= right`) and the fact that right can equal `len(arr)` to handle the case where all elements are less than target.

### Upper Bound (First > target)

Upper bound finds the first element strictly greater than target—the position after where target would go if inserted.

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

The difference from lower bound is subtle but crucial: we use `<=` instead of `<` in the comparison.

## Binary Search on Answer

Perhaps the most powerful generalization of binary search applies when we're not searching an array but rather searching through a space of possible answers. If we can efficiently check whether a given answer is valid, and validity is monotonic (all answers below some threshold are invalid, all above are valid, or vice versa), we can binary search for the boundary.

**Powerful technique**: Binary search the solution space when:
1. The answer lies in a bounded, monotonic range
2. We can efficiently verify if a given answer is valid (satisfies constraints)
3. Validity is monotonic—once answers become valid, they stay valid (or vice versa)

### Example: Minimum Speed for Eating Bananas

This classic problem asks for the minimum eating speed to finish a pile of bananas within a time limit. Smaller speeds are "invalid" (take too long), larger speeds are "valid" (finish in time). We binary search for the minimum valid speed.

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

The verification function `can_finish` runs in O(n) for n piles, and we perform O(log(max_pile)) binary search iterations, giving O(n log(max_pile)) total.

### Example: Square Root

Computing the integer square root is a natural application—we're searching for the largest integer whose square doesn't exceed n.

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

Having reliable templates reduces bugs. Each template handles a different class of problems.

### Template 1: Find exact match

Use when looking for a specific value and returning -1 if not found.

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

Use when searching for the first position satisfying a condition.

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

Use for arrays that were sorted but then rotated at some pivot point.

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

Binary search bugs are famously subtle. Here are the most common mistakes:

**Off-by-one errors**: The most common bug category. Carefully analyze:
- Should the condition be `left <= right` or `left < right`?
- Should we update with `mid + 1` or just `mid`?
- Should we update with `mid - 1` or just `mid`?

The rule of thumb: use `left <= right` with `mid + 1` and `mid - 1` for finding exact matches. Use `left < right` with `mid` (for right) and `mid + 1` (for left) for boundary searches.

**Integer overflow**: In languages with fixed-width integers, `(left + right) / 2` can overflow. Always use `left + (right - left) / 2` or equivalent.

**Infinite loops**: The search space must shrink each iteration. If you use `right = mid` with `left <= right`, the loop may never terminate when `left == right`. Match your condition with your update rules.

**Wrong invariant**: Before coding, explicitly state what left, right, and the result represent. "All valid answers are in [left, right]" is different from "left-1 is invalid, right is valid."

## Applications

Binary search appears throughout computer science wherever sorted data or monotonic properties exist.

### Finding in Sorted Collections

Python's bisect module provides efficient binary search implementations:

```python
import bisect

arr = [1, 3, 5, 7, 9]
bisect.bisect_left(arr, 5)   # Returns 2 (index of 5)
bisect.bisect_right(arr, 5)  # Returns 3 (after 5)
```

### Search in Rotated Array

A sorted array rotated at some pivot point remains partially sorted. We can still achieve O(log n) search by determining which half is sorted and whether the target lies in that half.

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

Finding a peak (element greater than neighbors) in an unsorted array seems to require linear search, but binary search works because any direction that increases must eventually lead to a peak.

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

Binary search is one of those algorithms that every programmer should know cold. Its applications extend far beyond simple array lookup, and mastering its variations unlocks efficient solutions to a wide class of problems.
