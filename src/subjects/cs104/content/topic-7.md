# Heaps and Priority Queues

## Introduction

A **heap** is a specialized tree-based data structure that satisfies the heap property. In a **max-heap**, every parent node is greater than or equal to its children; in a **min-heap**, every parent is less than or equal to its children. Heaps provide efficient access to the maximum or minimum element.

**Priority queues** are abstract data types where each element has an associated priority. Elements are dequeued based on priority rather than insertion order. Heaps are the most common implementation of priority queues, offering O(log n) insertion and deletion with O(1) access to the highest-priority element.

## Learning Objectives

By the end of this topic, you will be able to:

1. Explain the heap property and distinguish between min-heaps and max-heaps
2. Implement a binary heap using an array representation
3. Perform heap operations: insert, extract-min/max, and heapify
4. Use heaps to implement priority queues
5. Apply heap sort to sort an array in O(n log n) time
6. Solve problems using heaps efficiently (top-k elements, median finding)

## Core Concepts

### Binary Heap Structure

A binary heap is a complete binary tree stored in an array. For a node at index `i`:
- **Parent**: `(i - 1) // 2`
- **Left child**: `2 * i + 1`
- **Right child**: `2 * i + 2`

```
         10                Array: [10, 8, 9, 4, 5, 6, 7]
        /  \               Index:  0   1  2  3  4  5  6
       8    9
      / \  / \
     4  5 6   7
```

### Min-Heap vs Max-Heap

**Min-Heap**: Parent <= Children (smallest element at root)
```
         1
        / \
       3   2
      / \
     5   4
```

**Max-Heap**: Parent >= Children (largest element at root)
```
         9
        / \
       7   8
      / \
     3   5
```

### Heap Operations

#### Heapify Up (Bubble Up)

Used after insertion to restore the heap property by moving a node up toward the root.

```python
def heapify_up(self, index):
    parent = (index - 1) // 2
    while index > 0 and self.heap[index] < self.heap[parent]:
        self.heap[index], self.heap[parent] = self.heap[parent], self.heap[index]
        index = parent
        parent = (index - 1) // 2
```

#### Heapify Down (Bubble Down)

Used after extraction to restore the heap property by moving a node down toward the leaves.

```python
def heapify_down(self, index):
    smallest = index
    left = 2 * index + 1
    right = 2 * index + 2

    if left < len(self.heap) and self.heap[left] < self.heap[smallest]:
        smallest = left
    if right < len(self.heap) and self.heap[right] < self.heap[smallest]:
        smallest = right

    if smallest != index:
        self.heap[index], self.heap[smallest] = self.heap[smallest], self.heap[index]
        self.heapify_down(smallest)
```

### Complete Min-Heap Implementation

```python
class MinHeap:
    def __init__(self):
        self.heap = []

    def parent(self, i):
        return (i - 1) // 2

    def left_child(self, i):
        return 2 * i + 1

    def right_child(self, i):
        return 2 * i + 2

    def insert(self, key):
        self.heap.append(key)
        self._heapify_up(len(self.heap) - 1)

    def extract_min(self):
        if not self.heap:
            return None
        if len(self.heap) == 1:
            return self.heap.pop()

        min_val = self.heap[0]
        self.heap[0] = self.heap.pop()
        self._heapify_down(0)
        return min_val

    def peek(self):
        return self.heap[0] if self.heap else None

    def _heapify_up(self, index):
        parent = self.parent(index)
        while index > 0 and self.heap[index] < self.heap[parent]:
            self.heap[index], self.heap[parent] = self.heap[parent], self.heap[index]
            index = parent
            parent = self.parent(index)

    def _heapify_down(self, index):
        smallest = index
        left = self.left_child(index)
        right = self.right_child(index)

        if left < len(self.heap) and self.heap[left] < self.heap[smallest]:
            smallest = left
        if right < len(self.heap) and self.heap[right] < self.heap[smallest]:
            smallest = right

        if smallest != index:
            self.heap[index], self.heap[smallest] = self.heap[smallest], self.heap[index]
            self._heapify_down(smallest)
```

### Time Complexity of Heap Operations

| Operation    | Time Complexity |
|--------------|-----------------|
| Insert       | O(log n)        |
| Extract Min/Max | O(log n)     |
| Peek Min/Max | O(1)            |
| Build Heap   | O(n)            |
| Heapify      | O(log n)        |

### Priority Queue

A priority queue is an abstract data type supporting:
- `insert(element, priority)`: Add element with priority
- `extract_max/min()`: Remove and return highest/lowest priority element
- `peek()`: View highest/lowest priority element without removing

```python
import heapq

class PriorityQueue:
    def __init__(self):
        self.heap = []
        self.counter = 0  # For stable ordering

    def push(self, item, priority):
        # heapq is a min-heap; negate priority for max-heap behavior
        heapq.heappush(self.heap, (priority, self.counter, item))
        self.counter += 1

    def pop(self):
        if self.heap:
            return heapq.heappop(self.heap)[2]
        return None

    def peek(self):
        return self.heap[0][2] if self.heap else None
```

### Python's heapq Module

Python provides a built-in heap implementation:

```python
import heapq

# Create a min-heap
heap = []
heapq.heappush(heap, 3)
heapq.heappush(heap, 1)
heapq.heappush(heap, 4)

print(heapq.heappop(heap))  # 1 (smallest)

# Heapify an existing list
nums = [5, 3, 8, 1, 2]
heapq.heapify(nums)  # O(n)

# Get n smallest/largest
print(heapq.nsmallest(3, nums))  # [1, 2, 3]
print(heapq.nlargest(2, nums))   # [8, 5]
```

### Heap Sort

Heap sort uses a heap to sort an array in O(n log n) time:

```python
def heap_sort(arr):
    n = len(arr)

    # Build max-heap (heapify from bottom up)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    # Extract elements one by one
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]  # Move max to end
        heapify(arr, i, 0)  # Heapify reduced heap

    return arr

def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right

    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)
```

- **Time Complexity**: O(n log n) in all cases
- **Space Complexity**: O(1) - in-place
- **Stable**: No

### Common Heap Applications

#### Finding K Largest/Smallest Elements

```python
import heapq

def k_largest(nums, k):
    # Use min-heap of size k
    return heapq.nlargest(k, nums)

def k_smallest(nums, k):
    return heapq.nsmallest(k, nums)
```

#### Merge K Sorted Lists

```python
import heapq

def merge_k_sorted(lists):
    heap = []
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst[0], i, 0))

    result = []
    while heap:
        val, list_idx, elem_idx = heapq.heappop(heap)
        result.append(val)

        if elem_idx + 1 < len(lists[list_idx]):
            next_val = lists[list_idx][elem_idx + 1]
            heapq.heappush(heap, (next_val, list_idx, elem_idx + 1))

    return result
```

#### Running Median

```python
import heapq

class MedianFinder:
    def __init__(self):
        self.small = []  # Max-heap (negate values)
        self.large = []  # Min-heap

    def add_num(self, num):
        heapq.heappush(self.small, -num)
        heapq.heappush(self.large, -heapq.heappop(self.small))

        if len(self.large) > len(self.small):
            heapq.heappush(self.small, -heapq.heappop(self.large))

    def find_median(self):
        if len(self.small) > len(self.large):
            return -self.small[0]
        return (-self.small[0] + self.large[0]) / 2
```

## Common Mistakes

1. **Confusing min-heap and max-heap**: Python's heapq is a min-heap; negate values for max-heap behavior

2. **Off-by-one errors in index calculations**: Remember that array indices start at 0

3. **Forgetting to heapify after modifications**: Always restore heap property after changes

4. **Not handling empty heap cases**: Check for empty heap before extract or peek

5. **Using heaps when simpler solutions exist**: For finding the single min/max, a linear scan suffices

6. **Incorrect parent/child index formulas**: Double-check the formulas, especially for 0-indexed arrays

## Best Practices

1. **Use Python's heapq module**: It's well-optimized and handles edge cases

2. **Consider space-time tradeoffs**: Building a heap takes O(n), but k operations on it take O(k log n)

3. **Use tuples for complex priorities**: `(priority, counter, item)` for stable ordering

4. **Choose the right heap type**: Min-heap for smallest elements, max-heap for largest

5. **Build heap in O(n) when possible**: Use `heapify()` instead of n insertions when you have all data upfront

6. **Consider heap vs. sorted list**: For frequent access to extreme values with modifications, use heaps

## Summary

Heaps are powerful data structures that provide efficient access to minimum or maximum elements. They're implemented as complete binary trees stored in arrays, enabling O(log n) insertions and deletions with O(1) access to the top element.

Key takeaways:
- **Binary heaps** satisfy the heap property: parent is always smaller (min-heap) or larger (max-heap) than children
- **Array representation** uses index formulas for parent/child relationships
- **Priority queues** are naturally implemented with heaps
- **Heap sort** achieves O(n log n) in-place sorting
- **Python's heapq** provides efficient min-heap operations
- **Common applications**: top-k problems, median finding, task scheduling, Dijkstra's algorithm

Understanding heaps is essential for algorithm optimization and solving problems requiring efficient priority-based processing.
