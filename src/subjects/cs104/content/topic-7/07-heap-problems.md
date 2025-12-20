# Common Heap Problems

Heap problems appear frequently in coding interviews and competitions. This section covers essential problems and patterns that leverage heap properties.

## Problem 1: Merge K Sorted Lists

```python
import heapq

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def merge_k_lists(lists):
    """Merge k sorted linked lists. O(n log k)"""
    # Custom comparison for ListNode
    heap = []
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst.val, i, lst))

    dummy = ListNode()
    current = dummy

    while heap:
        val, i, node = heapq.heappop(heap)
        current.next = node
        current = current.next

        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))

    return dummy.next
```

## Problem 2: Find Median from Data Stream

```python
class MedianFinder:
    def __init__(self):
        self.small = []  # Max-heap (negated)
        self.large = []  # Min-heap

    def add_num(self, num):
        # Add to max-heap
        heapq.heappush(self.small, -num)

        # Ensure max of small <= min of large
        if self.large and -self.small[0] > self.large[0]:
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)

        # Balance sizes
        if len(self.small) > len(self.large) + 1:
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)
        elif len(self.large) > len(self.small):
            val = heapq.heappop(self.large)
            heapq.heappush(self.small, -val)

    def find_median(self):
        if len(self.small) > len(self.large):
            return -self.small[0]
        return (-self.small[0] + self.large[0]) / 2
```

## Problem 3: Kth Largest Element in Stream

```python
class KthLargest:
    def __init__(self, k, nums):
        self.k = k
        self.heap = []
        for num in nums:
            self.add(num)

    def add(self, val):
        heapq.heappush(self.heap, val)
        if len(self.heap) > self.k:
            heapq.heappop(self.heap)
        return self.heap[0]
```

## Problem 4: Top K Frequent Elements

```python
def top_k_frequent(nums, k):
    """Find k most frequent elements. O(n log k)"""
    from collections import Counter

    counts = Counter(nums)

    # Min-heap of size k: (frequency, element)
    heap = []
    for num, freq in counts.items():
        heapq.heappush(heap, (freq, num))
        if len(heap) > k:
            heapq.heappop(heap)

    return [num for freq, num in heap]

# Alternative using bucket sort: O(n)
def top_k_frequent_bucket(nums, k):
    from collections import Counter

    counts = Counter(nums)
    buckets = [[] for _ in range(len(nums) + 1)]

    for num, freq in counts.items():
        buckets[freq].append(num)

    result = []
    for i in range(len(buckets) - 1, -1, -1):
        for num in buckets[i]:
            result.append(num)
            if len(result) == k:
                return result
    return result
```

## Problem 5: Ugly Number II

```python
def nth_ugly_number(n):
    """
    Find nth ugly number (only prime factors 2, 3, 5).
    """
    import heapq

    heap = [1]
    seen = {1}

    for _ in range(n):
        ugly = heapq.heappop(heap)
        for factor in [2, 3, 5]:
            new = ugly * factor
            if new not in seen:
                seen.add(new)
                heapq.heappush(heap, new)

    return ugly

# Optimized: Three pointers
def nth_ugly_number_dp(n):
    ugly = [1] * n
    i2 = i3 = i5 = 0

    for i in range(1, n):
        next2, next3, next5 = ugly[i2]*2, ugly[i3]*3, ugly[i5]*5
        ugly[i] = min(next2, next3, next5)

        if ugly[i] == next2:
            i2 += 1
        if ugly[i] == next3:
            i3 += 1
        if ugly[i] == next5:
            i5 += 1

    return ugly[-1]
```

## Problem 6: Meeting Rooms II

```python
def min_meeting_rooms(intervals):
    """Find minimum number of meeting rooms needed."""
    if not intervals:
        return 0

    # Sort by start time
    intervals.sort(key=lambda x: x[0])

    # Min-heap of end times
    heap = []

    for start, end in intervals:
        # If earliest ending meeting is done, reuse room
        if heap and heap[0] <= start:
            heapq.heappop(heap)

        heapq.heappush(heap, end)

    return len(heap)
```

## Problem 7: Smallest Range Covering Elements from K Lists

```python
def smallest_range(nums):
    """
    Find smallest range that includes at least one element from each list.
    """
    import heapq

    # Heap: (value, list_index, element_index)
    heap = []
    max_val = float('-inf')

    for i, lst in enumerate(nums):
        heapq.heappush(heap, (lst[0], i, 0))
        max_val = max(max_val, lst[0])

    best_range = [float('-inf'), float('inf')]

    while len(heap) == len(nums):
        min_val, i, j = heapq.heappop(heap)

        if max_val - min_val < best_range[1] - best_range[0]:
            best_range = [min_val, max_val]

        if j + 1 < len(nums[i]):
            next_val = nums[i][j + 1]
            heapq.heappush(heap, (next_val, i, j + 1))
            max_val = max(max_val, next_val)

    return best_range
```

## Problem 8: Trapping Rain Water II (3D)

```python
def trap_rain_water_3d(height_map):
    """
    Calculate water trapped in 3D terrain.
    Use heap to process cells from lowest boundary inward.
    """
    if not height_map or not height_map[0]:
        return 0

    m, n = len(height_map), len(height_map[0])
    visited = [[False] * n for _ in range(m)]
    heap = []

    # Add boundary cells
    for i in range(m):
        for j in range(n):
            if i == 0 or i == m-1 or j == 0 or j == n-1:
                heapq.heappush(heap, (height_map[i][j], i, j))
                visited[i][j] = True

    water = 0
    directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]

    while heap:
        height, x, y = heapq.heappop(heap)

        for dx, dy in directions:
            nx, ny = x + dx, y + dy
            if 0 <= nx < m and 0 <= ny < n and not visited[nx][ny]:
                visited[nx][ny] = True
                water += max(0, height - height_map[nx][ny])
                heapq.heappush(heap, (max(height, height_map[nx][ny]), nx, ny))

    return water
```

## Problem 9: Task Scheduler

```python
def least_interval(tasks, n):
    """
    Minimum intervals to finish all tasks with cooldown n.
    """
    from collections import Counter

    counts = Counter(tasks)
    heap = [-c for c in counts.values()]
    heapq.heapify(heap)

    time = 0
    while heap:
        cycle = []
        for _ in range(n + 1):
            if heap:
                count = heapq.heappop(heap)
                if count + 1 < 0:
                    cycle.append(count + 1)
            time += 1 if heap or cycle else 0

        for count in cycle:
            heapq.heappush(heap, count)

        if not heap:
            break

    return time
```

## Problem 10: Super Ugly Number

```python
def nth_super_ugly_number(n, primes):
    """
    Find nth ugly number with given prime factors.
    """
    ugly = [1]
    # Heap: (value, prime, index into ugly)
    heap = [(p, p, 0) for p in primes]
    heapq.heapify(heap)

    while len(ugly) < n:
        val, prime, idx = heapq.heappop(heap)

        if val != ugly[-1]:  # Avoid duplicates
            ugly.append(val)

        heapq.heappush(heap, (prime * ugly[idx + 1], prime, idx + 1))

    return ugly[n - 1]
```

## Problem-Solving Tips

1. **Recognize heap patterns**: Top K, streaming data, merging sorted sequences
2. **Two heaps for median**: Max-heap for lower half, min-heap for upper half
3. **Lazy deletion**: Mark elements instead of finding and removing
4. **Heap size limit**: For K problems, maintain heap of size K
5. **Multi-source BFS with heap**: Process in order of some metric

## Summary

Heap problems typically involve:
- Finding K largest/smallest elements
- Processing elements in sorted order from multiple sources
- Maintaining running statistics
- Scheduling with constraints

The key insight is recognizing when you need efficient access to extreme elements with dynamic updates.
