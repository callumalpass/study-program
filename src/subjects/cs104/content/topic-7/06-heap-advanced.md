# Advanced Heap Techniques

Beyond basic operations, heaps support sophisticated techniques for solving complex problems. This section covers advanced patterns and optimizations.

## Min-Max Heap

A min-max heap supports both min and max operations efficiently:

```python
class MinMaxHeap:
    """
    Heap where min levels alternate with max levels.
    Level 0 (root): min level
    Level 1: max level
    Level 2: min level, etc.
    """

    def __init__(self):
        self.heap = []

    def _level(self, i):
        """Return level of index i (0-indexed)."""
        import math
        return int(math.log2(i + 1))

    def _is_min_level(self, i):
        return self._level(i) % 2 == 0

    def push(self, val):
        self.heap.append(val)
        self._push_up(len(self.heap) - 1)

    def _push_up(self, i):
        if i == 0:
            return
        parent = (i - 1) // 2

        if self._is_min_level(i):
            if self.heap[i] > self.heap[parent]:
                self.heap[i], self.heap[parent] = self.heap[parent], self.heap[i]
                self._push_up_max(parent)
            else:
                self._push_up_min(i)
        else:
            if self.heap[i] < self.heap[parent]:
                self.heap[i], self.heap[parent] = self.heap[parent], self.heap[i]
                self._push_up_min(parent)
            else:
                self._push_up_max(i)

    def get_min(self):
        return self.heap[0] if self.heap else None

    def get_max(self):
        if not self.heap:
            return None
        if len(self.heap) == 1:
            return self.heap[0]
        if len(self.heap) == 2:
            return self.heap[1]
        return max(self.heap[1], self.heap[2])
```

## Interval Heap

An interval heap stores pairs at each node, supporting both min and max:

```python
class IntervalHeap:
    """
    Each node stores (min, max) interval.
    Left child of (a,b) has values in [a, middle]
    Right child has values in [middle, b]
    """

    def __init__(self):
        self.heap = []  # List of [min, max] pairs

    def push(self, val):
        if not self.heap:
            self.heap.append([val, val])
            return

        # Add to last node or create new
        if len(self.heap[-1]) == 1:
            last = self.heap[-1]
            if val < last[0]:
                self.heap[-1] = [val, last[0]]
            else:
                self.heap[-1] = [last[0], val]
            self._bubble_up(len(self.heap) - 1)
        else:
            self.heap.append([val])
            self._bubble_up_new(len(self.heap) - 1)

    def get_min(self):
        return self.heap[0][0] if self.heap else None

    def get_max(self):
        return self.heap[0][1] if self.heap else None
```

## Soft Heap

A soft heap allows a small fraction of elements to be "corrupted" (have incorrect priorities) in exchange for better performance:

- **Insert**: O(1)
- **Delete**: O(1)
- **Find min**: O(1)

Used in:
- Optimal minimum spanning tree algorithms
- Near-linear time algorithms

## Leftist Heap

A leftist heap supports efficient merge by maintaining the "leftist" property:

```python
class LeftistHeap:
    """
    Binary heap where left subtree is always at least
    as heavy (in terms of s-value) as right subtree.
    s-value = length of rightmost path to null.
    """

    class Node:
        def __init__(self, key):
            self.key = key
            self.left = None
            self.right = None
            self.s = 1  # s-value (rank)

    def merge(self, h1, h2):
        """O(log n) merge."""
        if h1 is None:
            return h2
        if h2 is None:
            return h1

        # Ensure h1 has smaller root
        if h1.key > h2.key:
            h1, h2 = h2, h1

        # Merge h2 with right subtree of h1
        h1.right = self.merge(h1.right, h2)

        # Maintain leftist property
        if h1.left is None or h1.left.s < h1.right.s:
            h1.left, h1.right = h1.right, h1.left

        # Update s-value
        h1.s = 1 + (h1.right.s if h1.right else 0)

        return h1
```

## Skew Heap

A simpler self-adjusting variant of leftist heap:

```python
class SkewHeap:
    """
    Self-adjusting heap - always swap children after merge.
    Simpler than leftist but same amortized bounds.
    """

    class Node:
        def __init__(self, key):
            self.key = key
            self.left = None
            self.right = None

    def merge(self, h1, h2):
        """O(log n) amortized merge."""
        if h1 is None:
            return h2
        if h2 is None:
            return h1

        if h1.key > h2.key:
            h1, h2 = h2, h1

        # Merge and swap
        h1.right = self.merge(h1.right, h2)
        h1.left, h1.right = h1.right, h1.left  # Always swap

        return h1
```

## Heap with Lazy Deletion

When deletion by value is needed but finding elements is expensive:

```python
class LazyDeletionHeap:
    """
    Mark elements as deleted instead of removing.
    Clean up during extract operations.
    """

    def __init__(self):
        self.heap = []
        self.deleted = set()

    def push(self, val):
        heapq.heappush(self.heap, val)

    def delete(self, val):
        """O(1) - just mark as deleted."""
        self.deleted.add(val)

    def pop(self):
        """Remove actually deleted elements."""
        while self.heap and self.heap[0] in self.deleted:
            val = heapq.heappop(self.heap)
            self.deleted.remove(val)
        return heapq.heappop(self.heap) if self.heap else None

    def peek(self):
        while self.heap and self.heap[0] in self.deleted:
            val = heapq.heappop(self.heap)
            self.deleted.remove(val)
        return self.heap[0] if self.heap else None
```

## Double-Ended Priority Queue

Support both min and max efficiently:

```python
class DEPQ:
    """
    Double-ended priority queue using two heaps
    with lazy deletion.
    """

    def __init__(self):
        self.min_heap = []
        self.max_heap = []
        self.deleted = set()
        self.counter = 0

    def push(self, val):
        entry = (val, self.counter)
        self.counter += 1
        heapq.heappush(self.min_heap, entry)
        heapq.heappush(self.max_heap, (-val, -entry[1]))

    def _clean_min(self):
        while self.min_heap and self.min_heap[0][1] in self.deleted:
            self.deleted.remove(self.min_heap[0][1])
            heapq.heappop(self.min_heap)

    def _clean_max(self):
        while self.max_heap and -self.max_heap[0][1] in self.deleted:
            self.deleted.remove(-self.max_heap[0][1])
            heapq.heappop(self.max_heap)

    def pop_min(self):
        self._clean_min()
        if self.min_heap:
            val, idx = heapq.heappop(self.min_heap)
            self.deleted.add(idx)
            return val
        return None

    def pop_max(self):
        self._clean_max()
        if self.max_heap:
            neg_val, neg_idx = heapq.heappop(self.max_heap)
            self.deleted.add(-neg_idx)
            return -neg_val
        return None
```

## Heap Optimization: Cache-Aware Layout

For large heaps, cache performance matters:

```python
def cache_aware_parent(i, B):
    """
    Parent index in cache-aware heap layout.
    B = number of elements per cache line.
    """
    # Group nodes by cache lines
    # Children of nodes in line L are in lines 2L and 2L+1
    pass
```

B-heaps organize nodes to maximize cache hits during traversal.

## Summary

Advanced heap techniques include:
- **Min-Max heaps**: Support both operations
- **Interval heaps**: Store ranges
- **Leftist/Skew heaps**: Efficient merge
- **Lazy deletion**: O(1) deletion when finding is expensive
- **DEPQs**: Double-ended operations

Choose based on your specific operation mix and performance requirements.
