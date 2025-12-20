---
id: cs104-t7-variants
title: "Heap Variants"
order: 5
---

# Heap Variants

While binary heaps are most common, several heap variants offer different trade-offs for specific use cases. Understanding these variants helps you choose the right data structure for your needs.

## D-ary Heaps

A d-ary heap generalizes binary heaps: each node has d children instead of 2.

```python
class DaryHeap:
    """D-ary min-heap implementation."""

    def __init__(self, d=4):
        self.d = d
        self.heap = []

    def parent(self, i):
        return (i - 1) // self.d

    def children(self, i):
        start = self.d * i + 1
        end = min(start + self.d, len(self.heap))
        return range(start, end)

    def push(self, val):
        self.heap.append(val)
        self._sift_up(len(self.heap) - 1)

    def _sift_up(self, i):
        while i > 0 and self.heap[i] < self.heap[self.parent(i)]:
            p = self.parent(i)
            self.heap[i], self.heap[p] = self.heap[p], self.heap[i]
            i = p

    def pop(self):
        if not self.heap:
            raise IndexError("Empty heap")
        val = self.heap[0]
        self.heap[0] = self.heap[-1]
        self.heap.pop()
        if self.heap:
            self._sift_down(0)
        return val

    def _sift_down(self, i):
        while True:
            smallest = i
            for child in self.children(i):
                if self.heap[child] < self.heap[smallest]:
                    smallest = child
            if smallest == i:
                break
            self.heap[i], self.heap[smallest] = self.heap[smallest], self.heap[i]
            i = smallest
```

### Trade-offs

| Aspect | Binary (d=2) | D-ary (d>2) |
|--------|--------------|-------------|
| Height | log₂ n | log_d n |
| Sift up | O(log₂ n) | O(log_d n) - faster |
| Sift down | O(log₂ n) | O(d × log_d n) - more comparisons |
| Cache | Good | Better (more children per level) |

**Best use**: When decrease-key operations dominate (fewer levels to traverse up).

## Fibonacci Heap

Fibonacci heaps provide better amortized bounds for some operations, making them ideal for algorithms like Dijkstra's.

### Key Properties

- **Insert**: O(1) amortized
- **Find min**: O(1)
- **Extract min**: O(log n) amortized
- **Decrease key**: O(1) amortized
- **Merge**: O(1)

### Structure

- Collection of heap-ordered trees
- Trees are linked in a circular doubly-linked list
- Lazy consolidation (defer cleanup until extract-min)

```python
class FibonacciHeap:
    """Simplified Fibonacci heap (conceptual)."""

    class Node:
        def __init__(self, key):
            self.key = key
            self.degree = 0
            self.parent = None
            self.child = None
            self.marked = False
            self.left = self
            self.right = self

    def __init__(self):
        self.min_node = None
        self.n = 0

    def insert(self, key):
        """O(1) - just add to root list."""
        node = self.Node(key)
        if self.min_node is None:
            self.min_node = node
        else:
            # Add to root list
            self._link_nodes(self.min_node, node)
            if key < self.min_node.key:
                self.min_node = node
        self.n += 1
        return node

    def find_min(self):
        """O(1)"""
        return self.min_node.key if self.min_node else None

    def decrease_key(self, node, new_key):
        """O(1) amortized - cut node and cascade."""
        if new_key > node.key:
            raise ValueError("New key must be smaller")
        node.key = new_key
        parent = node.parent
        if parent and node.key < parent.key:
            self._cut(node, parent)
            self._cascading_cut(parent)
        if node.key < self.min_node.key:
            self.min_node = node
```

### When to Use

- Dijkstra's algorithm with many decrease-key operations
- Prim's MST algorithm
- When merge operations are frequent

### Practical Considerations

Fibonacci heaps have high constant factors. For most practical purposes, binary heaps or d-ary heaps are faster despite worse theoretical bounds.

## Binomial Heap

Binomial heaps support efficient merge operations.

### Binomial Tree B_k

- B_0 is a single node
- B_k is formed by linking two B_{k-1} trees

```
B_0:  •

B_1:  •
      |
      •

B_2:    •
       /|
      • •
      |
      •

B_3:      •
        / | \
       •  •  •
      /|  |
     • •  •
     |
     •
```

### Properties

- B_k has 2^k nodes
- Binomial heap is a collection of binomial trees
- At most one tree of each degree

### Operations

```python
class BinomialHeap:
    """Simplified binomial heap."""

    class Node:
        def __init__(self, key):
            self.key = key
            self.degree = 0
            self.parent = None
            self.child = None
            self.sibling = None

    def merge(self, other):
        """O(log n) - merge two binomial heaps."""
        # Combine root lists
        # Link trees of same degree
        pass

    def insert(self, key):
        """O(log n) - create single-node heap and merge."""
        new_heap = BinomialHeap()
        new_heap.head = self.Node(key)
        self.merge(new_heap)

    def extract_min(self):
        """O(log n)"""
        # Find minimum in root list
        # Remove it, promote children to root list
        # Consolidate
        pass
```

## Pairing Heap

Simpler than Fibonacci heaps with good practical performance.

```python
class PairingHeap:
    """Simple pairing heap."""

    class Node:
        def __init__(self, key):
            self.key = key
            self.children = []

    def __init__(self):
        self.root = None

    def merge(self, h1, h2):
        """Merge two heaps in O(1)."""
        if h1 is None:
            return h2
        if h2 is None:
            return h1
        if h1.key < h2.key:
            h1.children.append(h2)
            return h1
        else:
            h2.children.append(h1)
            return h2

    def insert(self, key):
        """O(1)"""
        new_node = self.Node(key)
        self.root = self.merge(self.root, new_node)

    def find_min(self):
        """O(1)"""
        return self.root.key if self.root else None

    def extract_min(self):
        """O(log n) amortized"""
        if not self.root:
            return None
        min_val = self.root.key
        # Two-pass pairing of children
        self.root = self._merge_pairs(self.root.children)
        return min_val

    def _merge_pairs(self, nodes):
        """Two-pass pairing merge."""
        if not nodes:
            return None
        if len(nodes) == 1:
            return nodes[0]
        # First pass: pair adjacent
        pairs = []
        for i in range(0, len(nodes) - 1, 2):
            pairs.append(self.merge(nodes[i], nodes[i+1]))
        if len(nodes) % 2 == 1:
            pairs.append(nodes[-1])
        # Second pass: merge from right to left
        result = pairs[-1]
        for i in range(len(pairs) - 2, -1, -1):
            result = self.merge(pairs[i], result)
        return result
```

## Comparison Summary

| Heap Type | Insert | Extract Min | Decrease Key | Merge |
|-----------|--------|-------------|--------------|-------|
| Binary | O(log n) | O(log n) | O(log n) | O(n) |
| D-ary | O(log_d n) | O(d log_d n) | O(log_d n) | O(n) |
| Binomial | O(log n) | O(log n) | O(log n) | O(log n) |
| Fibonacci | O(1)* | O(log n)* | O(1)* | O(1) |
| Pairing | O(1) | O(log n)* | O(log n)* | O(1) |

*Amortized

## Choosing a Heap

- **General purpose**: Binary heap (simple, cache-friendly)
- **Many decrease-key**: D-ary or Fibonacci heap
- **Frequent merges**: Binomial or Fibonacci heap
- **Simplicity + good performance**: Pairing heap

## Summary

Different heap variants offer trade-offs between operation complexities. Binary heaps are best for most practical uses. Fibonacci heaps provide optimal theoretical bounds but high constants. D-ary heaps improve decrease-key performance. Binomial heaps enable efficient merging. Pairing heaps balance simplicity and performance.
