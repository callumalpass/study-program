---
id: cs104-t2-deques
title: "Deques"
order: 6
---

# Double-Ended Queues (Deques)

A deque (pronounced "deck") is a double-ended queue that allows insertion and deletion at both the front and rear. It combines the capabilities of both stacks and queues in a single data structure.

## Core Operations

A deque supports these operations, all in O(1) time:

```python
class Deque:
    def add_front(self, item):
        """Add item to the front"""
        pass

    def add_rear(self, item):
        """Add item to the rear"""
        pass

    def remove_front(self):
        """Remove and return front item"""
        pass

    def remove_rear(self):
        """Remove and return rear item"""
        pass

    def peek_front(self):
        """View front item without removing"""
        pass

    def peek_rear(self):
        """View rear item without removing"""
        pass
```

## Deque as Stack and Queue

A deque can simulate both:

```python
from collections import deque

# As a STACK (LIFO) - use one end
stack = deque()
stack.append(1)      # push
stack.append(2)
stack.pop()          # pop from same end

# As a QUEUE (FIFO) - use both ends
queue = deque()
queue.append(1)      # enqueue at rear
queue.append(2)
queue.popleft()      # dequeue from front
```

## Implementation with Doubly Linked List

```python
class DequeNode:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None

class LinkedDeque:
    def __init__(self):
        self._front = None
        self._rear = None
        self._size = 0

    def add_front(self, item):
        new_node = DequeNode(item)
        if self.is_empty():
            self._front = self._rear = new_node
        else:
            new_node.next = self._front
            self._front.prev = new_node
            self._front = new_node
        self._size += 1

    def add_rear(self, item):
        new_node = DequeNode(item)
        if self.is_empty():
            self._front = self._rear = new_node
        else:
            new_node.prev = self._rear
            self._rear.next = new_node
            self._rear = new_node
        self._size += 1

    def remove_front(self):
        if self.is_empty():
            raise IndexError("Deque is empty")
        item = self._front.data
        self._front = self._front.next
        if self._front:
            self._front.prev = None
        else:
            self._rear = None
        self._size -= 1
        return item

    def remove_rear(self):
        if self.is_empty():
            raise IndexError("Deque is empty")
        item = self._rear.data
        self._rear = self._rear.prev
        if self._rear:
            self._rear.next = None
        else:
            self._front = None
        self._size -= 1
        return item

    def is_empty(self):
        return self._size == 0
```

## Python's collections.deque

Python provides an optimized deque implementation:

```python
from collections import deque

# Creation
d = deque()
d = deque([1, 2, 3])
d = deque(maxlen=5)  # Bounded deque

# Operations
d.append(4)          # Add to right
d.appendleft(0)      # Add to left
d.pop()              # Remove from right
d.popleft()          # Remove from left

# Extend
d.extend([5, 6, 7])
d.extendleft([1, 2])  # Note: reversed order

# Rotation
d.rotate(2)          # Rotate right by 2
d.rotate(-1)         # Rotate left by 1

# Access (O(1) at ends, O(n) in middle)
d[0]                 # Front
d[-1]               # Rear
```

## Bounded Deques

When created with `maxlen`, a deque automatically discards elements from the opposite end:

```python
# Useful for "last N items" tracking
recent_items = deque(maxlen=5)
for i in range(10):
    recent_items.append(i)
# recent_items contains [5, 6, 7, 8, 9]
```

## Applications

### Sliding Window Problems
```python
def max_sliding_window(nums, k):
    result = []
    dq = deque()  # Store indices of useful elements

    for i in range(len(nums)):
        # Remove elements outside window
        while dq and dq[0] <= i - k:
            dq.popleft()

        # Remove smaller elements (they'll never be max)
        while dq and nums[dq[-1]] < nums[i]:
            dq.pop()

        dq.append(i)

        if i >= k - 1:
            result.append(nums[dq[0]])

    return result
```

### Palindrome Checker
```python
def is_palindrome(s):
    d = deque(c.lower() for c in s if c.isalnum())

    while len(d) > 1:
        if d.popleft() != d.pop():
            return False
    return True
```

### Implementing Undo/Redo with Limited History
```python
class LimitedHistory:
    def __init__(self, max_history=100):
        self.undo_stack = deque(maxlen=max_history)
        self.redo_stack = deque(maxlen=max_history)

    def do_action(self, action):
        self.undo_stack.append(action)
        self.redo_stack.clear()

    def undo(self):
        if self.undo_stack:
            action = self.undo_stack.pop()
            self.redo_stack.append(action)
            return action.reverse()
```

## Time Complexity

| Operation | deque | list |
|-----------|-------|------|
| append (right) | O(1) | O(1) amortized |
| appendleft | O(1) | O(n) |
| pop (right) | O(1) | O(1) |
| popleft | O(1) | O(n) |
| Access by index | O(n) | O(1) |

**Key insight**: `deque` sacrifices random access performance for O(1) operations at both ends.

## When to Use Deque

- Need efficient operations at both ends
- Implementing queues or stacks
- Sliding window problems
- Keeping track of recent N items
- When list.insert(0) or list.pop(0) is a bottleneck

## Internal Implementation of Python's deque

Python's `deque` is not a simple linked list. It uses a hybrid approach:

```
Block-based structure:
[Block 0] ↔ [Block 1] ↔ [Block 2] ↔ [Block 3]
  [a,b,c]    [d,e,f,g]    [h,i,j]    [k,l,_]
```

- Blocks of fixed size (typically 64 elements) are linked together
- Each block is a contiguous array for cache efficiency
- Adding to ends usually fills existing blocks
- New blocks are allocated only when edge blocks are full

This gives the best of both worlds: cache-friendly access within blocks and O(1) operations at the ends.

## Deque vs List Performance

Real-world performance comparison for 1 million operations:

| Operation | list | deque |
|-----------|------|-------|
| append (right) | 0.05s | 0.05s |
| pop (right) | 0.04s | 0.04s |
| insert(0, x) | 45.0s | 0.05s |
| pop(0) | 44.0s | 0.04s |

The difference is dramatic: `list.insert(0, x)` is ~900x slower than `deque.appendleft(x)` for large lists.

## Common Mistakes

1. **Using list when you need front operations**: Always use deque for queue-like behavior
2. **Random access in deque**: `deque[i]` is O(n), not O(1) like list
3. **Forgetting extendleft reverses order**: `d.extendleft([1,2,3])` adds in order 3, 2, 1

## Key Takeaways

- Deques provide O(1) operations at both ends, unlike lists
- Python's `collections.deque` is the go-to for queue and double-ended operations
- Bounded deques (`maxlen`) automatically maintain a fixed window of recent items
- The sliding window maximum problem showcases monotonic deque technique
- Use deque for queues, stacks, and any scenario with front insertions/deletions
- The block-based implementation balances cache efficiency with flexibility
