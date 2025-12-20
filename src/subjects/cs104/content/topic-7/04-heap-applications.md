# Heap Applications

Heaps and priority queues solve many practical problems efficiently. This section covers common applications that leverage the heap's ability to quickly access extreme elements.

## Top K Elements

### K Largest Elements

```python
import heapq

def k_largest(nums, k):
    """Find k largest elements using min-heap. O(n log k)"""
    # Keep min-heap of size k
    heap = nums[:k]
    heapq.heapify(heap)

    for num in nums[k:]:
        if num > heap[0]:  # Larger than smallest in heap
            heapq.heapreplace(heap, num)

    return heap

# Alternative: heapq.nlargest is optimized for this
def k_largest_builtin(nums, k):
    return heapq.nlargest(k, nums)
```

### K Smallest Elements

```python
def k_smallest(nums, k):
    """Find k smallest elements using max-heap. O(n log k)"""
    # Use negation for max-heap behavior
    heap = [-x for x in nums[:k]]
    heapq.heapify(heap)

    for num in nums[k:]:
        if num < -heap[0]:  # Smaller than largest in heap
            heapq.heapreplace(heap, -num)

    return [-x for x in heap]
```

### Kth Largest Element

```python
def kth_largest(nums, k):
    """Find kth largest element. O(n log k)"""
    heap = []
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]
```

## Running Median

Maintain median as elements arrive using two heaps:

```python
class MedianFinder:
    """
    Use max-heap for lower half, min-heap for upper half.
    Median is at the top of one or both heaps.
    """
    def __init__(self):
        self.lo = []  # Max-heap (negated) for lower half
        self.hi = []  # Min-heap for upper half

    def add_num(self, num):
        # Add to max-heap (lower half)
        heapq.heappush(self.lo, -num)

        # Balance: largest of lo should <= smallest of hi
        if self.hi and -self.lo[0] > self.hi[0]:
            heapq.heappush(self.hi, -heapq.heappop(self.lo))

        # Ensure size property: |lo| >= |hi| and |lo| - |hi| <= 1
        if len(self.lo) > len(self.hi) + 1:
            heapq.heappush(self.hi, -heapq.heappop(self.lo))
        elif len(self.hi) > len(self.lo):
            heapq.heappush(self.lo, -heapq.heappop(self.hi))

    def find_median(self):
        if len(self.lo) > len(self.hi):
            return -self.lo[0]
        return (-self.lo[0] + self.hi[0]) / 2
```

## Merge K Sorted Streams

```python
def merge_k_sorted(streams):
    """
    Merge k sorted iterators.
    Useful for external sorting, merging log files, etc.
    """
    heap = []

    # Initialize with first element from each stream
    for i, stream in enumerate(streams):
        try:
            val = next(stream)
            heapq.heappush(heap, (val, i, stream))
        except StopIteration:
            pass

    while heap:
        val, i, stream = heapq.heappop(heap)
        yield val

        try:
            next_val = next(stream)
            heapq.heappush(heap, (next_val, i, stream))
        except StopIteration:
            pass
```

## Sliding Window Maximum

```python
from collections import deque

def sliding_window_max(nums, k):
    """
    Find maximum in each sliding window of size k.
    Uses deque (not heap) for O(n) solution.
    """
    result = []
    dq = deque()  # Stores indices

    for i, num in enumerate(nums):
        # Remove indices outside window
        while dq and dq[0] < i - k + 1:
            dq.popleft()

        # Remove smaller elements (they'll never be max)
        while dq and nums[dq[-1]] < num:
            dq.pop()

        dq.append(i)

        if i >= k - 1:
            result.append(nums[dq[0]])

    return result

# Heap-based solution (O(n log n))
def sliding_window_max_heap(nums, k):
    """Heap solution - simpler but slower."""
    import heapq
    result = []
    heap = []  # (-value, index)

    for i, num in enumerate(nums):
        heapq.heappush(heap, (-num, i))

        # Remove elements outside window
        while heap[0][1] <= i - k:
            heapq.heappop(heap)

        if i >= k - 1:
            result.append(-heap[0][0])

    return result
```

## Schedule Tasks to Minimize Lateness

```python
def minimize_lateness(tasks):
    """
    Schedule tasks to minimize maximum lateness.
    tasks: [(duration, deadline), ...]
    """
    # Sort by deadline (Earliest Deadline First)
    tasks.sort(key=lambda x: x[1])

    time = 0
    max_lateness = 0

    for duration, deadline in tasks:
        time += duration
        lateness = max(0, time - deadline)
        max_lateness = max(max_lateness, lateness)

    return max_lateness
```

## Reorganize String

```python
def reorganize_string(s):
    """
    Rearrange string so no two adjacent chars are same.
    Uses max-heap to always pick most frequent available char.
    """
    from collections import Counter

    counts = Counter(s)
    # Max-heap: (-count, char)
    heap = [(-count, char) for char, count in counts.items()]
    heapq.heapify(heap)

    result = []
    prev_count, prev_char = 0, ''

    while heap:
        count, char = heapq.heappop(heap)
        result.append(char)

        # Re-add previous character if it still has count
        if prev_count < 0:
            heapq.heappush(heap, (prev_count, prev_char))

        prev_count, prev_char = count + 1, char

    if len(result) != len(s):
        return ""  # Not possible

    return ''.join(result)
```

## Closest Points to Origin

```python
def k_closest(points, k):
    """Find k closest points to origin. O(n log k)"""
    # Max-heap of size k (negate distance for max behavior)
    heap = []

    for x, y in points:
        dist = -(x*x + y*y)  # Negate for max-heap
        if len(heap) < k:
            heapq.heappush(heap, (dist, [x, y]))
        elif dist > heap[0][0]:  # Closer than farthest in heap
            heapq.heapreplace(heap, (dist, [x, y]))

    return [point for _, point in heap]
```

## IPO (Initial Public Offering)

```python
def find_maximized_capital(k, w, profits, capital):
    """
    Maximize capital after at most k projects.
    w: starting capital
    profits[i], capital[i]: profit and required capital for project i
    """
    # Max-heap for affordable projects (by profit)
    # Min-heap for unaffordable projects (by capital)
    n = len(profits)
    projects = sorted(zip(capital, profits))
    idx = 0
    available = []

    for _ in range(k):
        # Move affordable projects to available heap
        while idx < n and projects[idx][0] <= w:
            heapq.heappush(available, -projects[idx][1])
            idx += 1

        if not available:
            break

        # Take most profitable available project
        w += -heapq.heappop(available)

    return w
```

## Summary

Heaps efficiently solve problems involving:
- **Top K elements**: Maintain heap of size k
- **Running statistics**: Two heaps for median, one for max/min
- **Merging streams**: K-way merge with heap
- **Greedy scheduling**: Always pick optimal choice
- **Reorganization**: Pick most frequent available

The key insight is recognizing when you need quick access to extreme elements while handling dynamic updates.
