---
id: cs104-t7-operations
title: "Heap Operations"
order: 2
---

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

### Visualization: Sift-Up Process

```mermaid
graph TD
    subgraph Step 1: Add 85 at end
    A1[90] --> B1[80]
    A1 --> C1[70]
    B1 --> D1[50]
    B1 --> E1[60]
    C1 --> F1[85]
    end

    subgraph Step 2: 85 > 70 swap
    A2[90] --> B2[80]
    A2 --> C2[85]
    B2 --> D2[50]
    B2 --> E2[60]
    C2 --> F2[70]
    end

    subgraph Step 3: 85 < 90 done
    A3[90] --> B3[80]
    A3 --> C3[85]
    B3 --> D3[50]
    B3 --> E3[60]
    C3 --> F3[70]
    end

    style F1 fill:#FFB6C6
    style C2 fill:#FFB6C6
    style C3 fill:#90EE90
```

**Sift-up complexity**: $O(\log n)$ - at most $\log_2 n$ swaps (height of tree)

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

### Visualization: Sift-Down Process

```mermaid
graph TD
    subgraph Step 1: Move 70 to root
    A1[70] --> B1[80]
    A1 --> C1[85]
    B1 --> D1[50]
    B1 --> E1[60]
    end

    subgraph Step 2: 70 < max 80 85  swap with 85
    A2[85] --> B2[80]
    A2 --> C2[70]
    B2 --> D2[50]
    B2 --> E2[60]
    end

    subgraph Step 3: 70 no larger children done
    A3[85] --> B3[80]
    A3 --> C3[70]
    B3 --> D3[50]
    B3 --> E3[60]
    end

    style A1 fill:#FFB6C6
    style C2 fill:#FFB6C6
    style C3 fill:#90EE90
```

**Result**: Extracted 90, heap property restored

**Sift-down complexity**: $O(\log n)$ - at most $\log_2 n$ swaps (height of tree)

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

**Why $O(n)$?** Most nodes are near the bottom and require few swaps:
- $n/2$ nodes at bottom (leaves): 0 swaps each
- $n/4$ nodes one level up: at most 1 swap each
- $n/8$ nodes two levels up: at most 2 swaps each
- ...
- 1 node at root: at most $\log n$ swaps

Total work:
$$\sum_{h=0}^{\log n} \frac{n}{2^{h+1}} \cdot h = O(n)$$

This is tighter than the naive bound of $O(n \log n)$ from $n$ insertions!

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
| Insert | $O(\log n)$ |
| Extract max/min | $O(\log n)$ |
| Peek | $O(1)$ |
| Build heap | $O(n)$ |
| Increase/Decrease key | $O(\log n)$ |
| Delete arbitrary | $O(\log n)$ |

**Key insight**: Heap height is $\lfloor \log_2 n \rfloor$, so operations that traverse from leaf to root (or vice versa) take $O(\log n)$ time.

## Summary

Heap operations maintain the heap property through sift up (after insertion or increase key) and sift down (after extraction or decrease key). Build heap in O(n) using Floyd's algorithm. All operations except peek are O(log n) due to the tree height. These operations form the foundation for priority queues.
