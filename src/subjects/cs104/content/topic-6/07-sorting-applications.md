---
id: cs104-t6-applications
title: "Sorting Applications"
order: 7
---

# Sorting Applications and Problems

Sorting is a building block for countless algorithms and problems. Understanding when and how to apply sorting is a key problem-solving skill.

## Pattern: Sort Then Solve

Many problems become easier after sorting:

### 1. Two Sum Variants

```python
def two_sum_sorted(arr, target):
    """Find if two numbers sum to target in O(n log n)."""
    arr_sorted = sorted(enumerate(arr), key=lambda x: x[1])
    left, right = 0, len(arr) - 1

    while left < right:
        current_sum = arr_sorted[left][1] + arr_sorted[right][1]
        if current_sum == target:
            return [arr_sorted[left][0], arr_sorted[right][0]]
        elif current_sum < target:
            left += 1
        else:
            right -= 1

    return []
```

### 2. Merge Intervals

```python
def merge_intervals(intervals):
    """Merge overlapping intervals."""
    if not intervals:
        return []

    # Sort by start time
    intervals.sort(key=lambda x: x[0])

    merged = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:  # Overlapping
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])

    return merged
```

### 3. Meeting Rooms

```python
def can_attend_all(meetings):
    """Check if person can attend all meetings."""
    meetings.sort(key=lambda x: x[0])

    for i in range(1, len(meetings)):
        if meetings[i][0] < meetings[i-1][1]:
            return False

    return True

def min_meeting_rooms(meetings):
    """Find minimum number of meeting rooms needed."""
    starts = sorted(m[0] for m in meetings)
    ends = sorted(m[1] for m in meetings)

    rooms = max_rooms = 0
    s = e = 0

    while s < len(starts):
        if starts[s] < ends[e]:
            rooms += 1
            max_rooms = max(max_rooms, rooms)
            s += 1
        else:
            rooms -= 1
            e += 1

    return max_rooms
```

## Pattern: Custom Comparators

### 1. Largest Number

```python
from functools import cmp_to_key

def largest_number(nums):
    """Form largest number from array of integers."""
    def compare(a, b):
        # Compare concatenations
        if a + b > b + a:
            return -1
        elif a + b < b + a:
            return 1
        return 0

    nums_str = [str(n) for n in nums]
    nums_str.sort(key=cmp_to_key(compare))

    result = ''.join(nums_str)
    return '0' if result[0] == '0' else result

# largest_number([3, 30, 34, 5, 9]) → "9534330"
```

### 2. Sort by Multiple Criteria

```python
def sort_people(people):
    """
    Sort by height descending, then by name alphabetically.
    people: [(name, height), ...]
    """
    return sorted(people, key=lambda x: (-x[1], x[0]))
```

## Pattern: Sorting for Binary Search

### 1. Search in Rotated Sorted Array

```python
def search_rotated(nums, target):
    """Binary search in rotated sorted array."""
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = (left + right) // 2

        if nums[mid] == target:
            return mid

        # Left half is sorted
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        # Right half is sorted
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1

    return -1
```

### 2. Find Kth Largest

```python
import heapq

def find_kth_largest(nums, k):
    """Find kth largest element."""
    # Method 1: Sort (O(n log n))
    return sorted(nums, reverse=True)[k-1]

    # Method 2: Heap (O(n log k))
    # return heapq.nlargest(k, nums)[-1]

    # Method 3: Quickselect (O(n) average)
    # See quickselect implementation
```

## Pattern: Sorting for Greedy

### 1. Assign Cookies

```python
def assign_cookies(children, cookies):
    """
    Maximize children that can be satisfied.
    Each child has greed factor, each cookie has size.
    """
    children.sort()
    cookies.sort()

    child = cookie = 0
    while child < len(children) and cookie < len(cookies):
        if cookies[cookie] >= children[child]:
            child += 1  # Satisfied
        cookie += 1

    return child
```

### 2. Job Scheduling

```python
def job_scheduling(jobs):
    """
    Maximize profit from non-overlapping jobs.
    jobs: [(start, end, profit), ...]
    """
    jobs.sort(key=lambda x: x[1])  # Sort by end time

    # DP with binary search
    n = len(jobs)
    dp = [0] * (n + 1)

    for i in range(n):
        start, end, profit = jobs[i]

        # Binary search for latest non-overlapping job
        lo, hi = 0, i
        while lo < hi:
            mid = (lo + hi + 1) // 2
            if jobs[mid][1] <= start:
                lo = mid
            else:
                hi = mid - 1

        # Include or exclude current job
        dp[i + 1] = max(dp[i], dp[lo + 1] + profit)

    return dp[n]
```

## Pattern: Relative Ordering

### 1. Relative Sort Array

```python
def relative_sort(arr1, arr2):
    """
    Sort arr1 such that relative order of elements
    matches arr2, remaining elements sorted at end.
    """
    order = {v: i for i, v in enumerate(arr2)}
    return sorted(arr1, key=lambda x: (order.get(x, len(arr2)), x))
```

### 2. Custom Sort String

```python
def custom_sort_string(order, s):
    """Sort string s according to order in 'order'."""
    priority = {c: i for i, c in enumerate(order)}
    return ''.join(sorted(s, key=lambda c: priority.get(c, 26)))
```

## Pattern: Sorting with Index

### 1. Count Smaller Numbers After Self

```python
def count_smaller(nums):
    """For each element, count smaller elements to its right."""
    def merge_count(indices, left, mid, right):
        left_arr = indices[left:mid]
        right_arr = indices[mid:right]
        i = j = 0
        k = left
        smaller_count = 0

        while i < len(left_arr) and j < len(right_arr):
            if nums[left_arr[i]] > nums[right_arr[j]]:
                counts[left_arr[i]] += len(right_arr) - j
                indices[k] = left_arr[i]
                i += 1
            else:
                indices[k] = right_arr[j]
                j += 1
            k += 1

        while i < len(left_arr):
            indices[k] = left_arr[i]
            i += 1
            k += 1
        while j < len(right_arr):
            indices[k] = right_arr[j]
            j += 1
            k += 1

    def merge_sort(indices, left, right):
        if right - left <= 1:
            return
        mid = (left + right) // 2
        merge_sort(indices, left, mid)
        merge_sort(indices, mid, right)
        merge_count(indices, left, mid, right)

    n = len(nums)
    counts = [0] * n
    indices = list(range(n))
    merge_sort(indices, 0, n)
    return counts
```

## Best Practices

1. **Know your data**: Size, range, distribution
2. **Consider stability**: Important for multi-key sorts
3. **Use built-in sorts**: They're highly optimized
4. **Custom comparators**: cmp_to_key for complex orderings
5. **Sort once, query many**: O(n log n) preprocessing enables O(log n) queries

## Summary

Sorting enables efficient solutions to many problems. Common patterns include sort-then-solve, custom comparators, sorting for binary search, sorting for greedy algorithms, relative ordering, and sorting with index tracking. Recognize when sorting simplifies a problem and choose the appropriate algorithm for your data characteristics.
