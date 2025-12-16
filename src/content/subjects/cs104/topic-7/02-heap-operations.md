# Heap Operations

Heaps support several key operations that maintain the heap property while providing efficient access to the extreme element. Understanding these operations in detail is crucial for implementing and using heaps effectively.

## Insert (Push)

Add a new element to the heap:

1. Add element at the end (maintain complete tree property)
2. "Bubble up" (sift up) until heap property is restored

```python
def insert(self, value):
    """Insert a value into the max-heap. O(log n)"""
    self.heap.append(value)
    self._sift_up(len(self.heap) - 1)

def _sift_up(self, index):
    """Move element up until heap property is satisfied."""
    while index > 0:
        parent_idx = (index - 1) // 2
        if self.heap[index] > self.heap[parent_idx]:
            self.heap[index], self.heap[parent_idx] = \
                self.heap[parent_idx], self.heap[index]
            index = parent_idx
        else:
            break
```

### Visualization

```
Insert 85 into max-heap [90, 80, 70, 50, 60]:

Step 1: Add at end
       90
      /  \
    80    70
   / \   /
  50 60 85

Step 2: 85 > 70, swap
       90
      /  \
    80    85
   / \   /
  50 60 70

Step 3: 85 < 90, done
       90
      /  \
    80    85
   / \   /
  50 60 70

Array: [90, 80, 85, 50, 60, 70]
```

## Extract Maximum/Minimum

Remove and return the root element:

1. Save the root value
2. Move last element to root
3. "Bubble down" (sift down) until heap property is restored

```python
def extract_max(self):
    """Remove and return maximum element. O(log n)"""
    if not self.heap:
        raise IndexError("Heap is empty")

    max_val = self.heap[0]

    # Move last element to root
    self.heap[0] = self.heap[-1]
    self.heap.pop()

    if self.heap:
        self._sift_down(0)

    return max_val

def _sift_down(self, index):
    """Move element down until heap property is satisfied."""
    size = len(self.heap)

    while True:
        largest = index
        left = 2 * index + 1
        right = 2 * index + 2

        if left < size and self.heap[left] > self.heap[largest]:
            largest = left
        if right < size and self.heap[right] > self.heap[largest]:
            largest = right

        if largest != index:
            self.heap[index], self.heap[largest] = \
                self.heap[largest], self.heap[index]
            index = largest
        else:
            break
```

### Visualization

```
Extract max from [90, 80, 85, 50, 60, 70]:

Step 1: Save 90, move 70 to root
       70
      /  \
    80    85
   / \
  50 60

Step 2: 70 < max(80, 85) = 85, swap with 85
       85
      /  \
    80    70
   / \
  50 60

Step 3: 70 has no children > 70, done
       85
      /  \
    80    70
   / \
  50 60

Array: [85, 80, 70, 50, 60]
Return: 90
```

## Peek

View the top element without removing it:

```python
def peek(self):
    """Return maximum without removing. O(1)"""
    if not self.heap:
        raise IndexError("Heap is empty")
    return self.heap[0]
```

## Build Heap (Heapify)

Convert an arbitrary array into a heap:

### Method 1: Repeated Insertion - O(n log n)

```python
def build_heap_insert(arr):
    heap = MaxHeap()
    for val in arr:
        heap.insert(val)
    return heap
```

### Method 2: Floyd's Algorithm - O(n)

Sift down from the last non-leaf node:

```python
def heapify(self, arr):
    """Build heap from array in O(n)."""
    self.heap = arr.copy()
    # Start from last non-leaf node
    for i in range(len(self.heap) // 2 - 1, -1, -1):
        self._sift_down(i)
```

**Why O(n)?** Most nodes are near the bottom and require few swaps:
- n/2 nodes at bottom: 0 swaps each
- n/4 nodes one level up: 1 swap max each
- n/8 nodes two levels up: 2 swaps max each
- Total: n/2×0 + n/4×1 + n/8×2 + ... = O(n)

## Replace (Update Priority)

Change an element's value and restore heap property:

```python
def increase_key(self, index, new_value):
    """Increase value at index (max-heap). O(log n)"""
    if new_value < self.heap[index]:
        raise ValueError("New value must be larger")
    self.heap[index] = new_value
    self._sift_up(index)

def decrease_key(self, index, new_value):
    """Decrease value at index (max-heap). O(log n)"""
    if new_value > self.heap[index]:
        raise ValueError("New value must be smaller")
    self.heap[index] = new_value
    self._sift_down(index)

def update_key(self, index, new_value):
    """Update value at index. O(log n)"""
    old_value = self.heap[index]
    self.heap[index] = new_value
    if new_value > old_value:
        self._sift_up(index)
    else:
        self._sift_down(index)
```

## Delete Arbitrary Element

Remove an element at any position:

```python
def delete(self, index):
    """Delete element at index. O(log n)"""
    if index >= len(self.heap):
        raise IndexError("Index out of range")

    # Move last element to this position
    self.heap[index] = self.heap[-1]
    self.heap.pop()

    if index < len(self.heap):
        # May need to sift up or down
        self.update_key(index, self.heap[index])
```

## Complete Max-Heap Implementation

```python
class MaxHeap:
    def __init__(self, arr=None):
        if arr:
            self.heap = arr.copy()
            self._heapify()
        else:
            self.heap = []

    def _heapify(self):
        for i in range(len(self.heap) // 2 - 1, -1, -1):
            self._sift_down(i)

    def _sift_up(self, i):
        while i > 0:
            parent = (i - 1) // 2
            if self.heap[i] > self.heap[parent]:
                self.heap[i], self.heap[parent] = self.heap[parent], self.heap[i]
                i = parent
            else:
                break

    def _sift_down(self, i):
        n = len(self.heap)
        while True:
            largest = i
            left, right = 2*i + 1, 2*i + 2
            if left < n and self.heap[left] > self.heap[largest]:
                largest = left
            if right < n and self.heap[right] > self.heap[largest]:
                largest = right
            if largest != i:
                self.heap[i], self.heap[largest] = self.heap[largest], self.heap[i]
                i = largest
            else:
                break

    def push(self, val):
        self.heap.append(val)
        self._sift_up(len(self.heap) - 1)

    def pop(self):
        if not self.heap:
            raise IndexError("Empty heap")
        val = self.heap[0]
        self.heap[0] = self.heap[-1]
        self.heap.pop()
        if self.heap:
            self._sift_down(0)
        return val

    def peek(self):
        return self.heap[0] if self.heap else None

    def __len__(self):
        return len(self.heap)

    def __bool__(self):
        return bool(self.heap)
```

## Complexity Summary

| Operation | Time Complexity |
|-----------|-----------------|
| Insert | O(log n) |
| Extract max/min | O(log n) |
| Peek | O(1) |
| Build heap | O(n) |
| Increase/Decrease key | O(log n) |
| Delete arbitrary | O(log n) |

## Summary

Heap operations maintain the heap property through sift up (after insertion or increase key) and sift down (after extraction or decrease key). Build heap in O(n) using Floyd's algorithm. All operations except peek are O(log n) due to the tree height. These operations form the foundation for priority queues.
