# Heap Fundamentals

A heap is a specialized tree-based data structure that satisfies the heap property. Heaps are the foundation for priority queues and enable efficient access to the minimum or maximum element. Understanding heaps is essential for algorithms like Dijkstra's shortest path and heap sort.

## What is a Heap?

A heap is a **complete binary tree** with the **heap property**:
- **Max-heap**: Every parent is greater than or equal to its children
- **Min-heap**: Every parent is less than or equal to its children

```
Max-heap:               Min-heap:
       90                      10
      /  \                    /  \
    80    70                20    30
   / \   / \               / \   / \
  50 60 40 30             40 50 60 70
```

## Complete Binary Tree

A **complete binary tree** is filled level by level, left to right. This property allows efficient array representation:

```
Tree:           Array: [90, 80, 70, 50, 60, 40, 30]
       90              [0] [1] [2] [3] [4] [5] [6]
      /  \
    80    70       Index relationships:
   / \   / \       Parent(i) = (i-1) // 2
  50 60 40 30      Left(i) = 2*i + 1
                   Right(i) = 2*i + 2
```

## Array Representation

```python
class MaxHeap:
    def __init__(self):
        self.heap = []

    def parent(self, i):
        return (i - 1) // 2

    def left_child(self, i):
        return 2 * i + 1

    def right_child(self, i):
        return 2 * i + 2

    def has_parent(self, i):
        return self.parent(i) >= 0

    def has_left_child(self, i):
        return self.left_child(i) < len(self.heap)

    def has_right_child(self, i):
        return self.right_child(i) < len(self.heap)
```

## Key Properties

1. **Shape Property**: Complete binary tree (all levels full except possibly last, filled left to right)
2. **Heap Property**: Parent-child ordering (max or min)
3. **Height**: O(log n) for n elements
4. **Root**: Contains maximum (max-heap) or minimum (min-heap)

## Heap vs Binary Search Tree

| Property | Heap | BST |
|----------|------|-----|
| Ordering | Parent-child | Left-right |
| Find min/max | O(1) | O(log n) or O(1) if tracked |
| Find arbitrary | O(n) | O(log n) |
| Insert | O(log n) | O(log n) |
| Delete min/max | O(log n) | O(log n) |
| In-order traversal | Not sorted | Sorted |

## Types of Heaps

### Binary Heap
Most common, uses binary tree structure.

### D-ary Heap
Each node has d children instead of 2. Decreases height but increases work per level.

### Fibonacci Heap
Amortized O(1) for decrease-key operation. Used in advanced algorithms.

### Binomial Heap
Supports efficient merge operation.

## Heap Applications

1. **Priority Queue**: Process items by priority
2. **Heap Sort**: O(n log n) sorting
3. **Dijkstra's Algorithm**: Extract minimum distance vertex
4. **Prim's Algorithm**: Extract minimum weight edge
5. **Median Maintenance**: Two heaps track running median
6. **Top K Elements**: Maintain k largest/smallest efficiently

## Python's heapq Module

Python provides a min-heap implementation:

```python
import heapq

# Create heap from list
nums = [5, 3, 8, 1, 2]
heapq.heapify(nums)  # In-place, O(n)

# Insert
heapq.heappush(nums, 4)  # O(log n)

# Extract minimum
min_val = heapq.heappop(nums)  # O(log n)

# Peek at minimum
min_val = nums[0]  # O(1)

# Push and pop in one operation
heapq.heappushpop(nums, 6)  # More efficient than separate ops

# Pop and push in one operation
heapq.heapreplace(nums, 7)  # Pops first, then pushes

# Find n largest/smallest
heapq.nlargest(3, nums)
heapq.nsmallest(3, nums)
```

### Max-Heap in Python

Python only provides min-heap. For max-heap, negate values:

```python
import heapq

class MaxHeapWrapper:
    def __init__(self):
        self.heap = []

    def push(self, val):
        heapq.heappush(self.heap, -val)

    def pop(self):
        return -heapq.heappop(self.heap)

    def peek(self):
        return -self.heap[0]
```

## Heap Invariant

The heap invariant must be maintained after every operation:
- **After insert**: May need to "bubble up" (sift up)
- **After delete**: May need to "bubble down" (sift down)

```python
def check_heap_invariant(heap):
    """Verify max-heap property."""
    for i in range(len(heap)):
        left = 2 * i + 1
        right = 2 * i + 2
        if left < len(heap) and heap[i] < heap[left]:
            return False
        if right < len(heap) and heap[i] < heap[right]:
            return False
    return True
```

## Summary

Heaps are complete binary trees with parent-child ordering. They provide O(1) access to min/max and O(log n) insertion and extraction. The array representation is space-efficient with simple index calculations. Heaps power priority queues, sorting, and graph algorithms. Python's heapq provides a min-heap implementation.
