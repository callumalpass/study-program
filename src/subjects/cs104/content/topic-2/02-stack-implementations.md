# Stack Implementations

Stacks can be implemented using different underlying data structures, each with its own tradeoffs. The two primary approaches are array-based and linked list-based implementations.

## Array-Based Stack

The simplest and most cache-efficient implementation:

```python
class ArrayStack:
    def __init__(self, capacity=10):
        self._data = [None] * capacity
        self._top = -1  # Index of top element (-1 means empty)
        self._capacity = capacity

    def push(self, item):
        if self._top == self._capacity - 1:
            self._resize(2 * self._capacity)
        self._top += 1
        self._data[self._top] = item

    def pop(self):
        if self.is_empty():
            raise IndexError("Stack is empty")
        item = self._data[self._top]
        self._data[self._top] = None  # Help garbage collection
        self._top -= 1
        return item

    def peek(self):
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self._data[self._top]

    def is_empty(self):
        return self._top == -1

    def size(self):
        return self._top + 1

    def _resize(self, new_capacity):
        new_data = [None] * new_capacity
        for i in range(self._top + 1):
            new_data[i] = self._data[i]
        self._data = new_data
        self._capacity = new_capacity
```

**Advantages:**
- O(1) amortized push and pop
- Cache-friendly (contiguous memory)
- Low memory overhead per element

**Disadvantages:**
- May waste space if stack shrinks
- Occasional O(n) resize operation

## Linked List-Based Stack

Uses nodes with pointers, pushing/popping at the head:

```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedStack:
    def __init__(self):
        self._head = None
        self._size = 0

    def push(self, item):
        new_node = Node(item)
        new_node.next = self._head
        self._head = new_node
        self._size += 1

    def pop(self):
        if self.is_empty():
            raise IndexError("Stack is empty")
        item = self._head.data
        self._head = self._head.next
        self._size -= 1
        return item

    def peek(self):
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self._head.data

    def is_empty(self):
        return self._head is None

    def size(self):
        return self._size
```

**Advantages:**
- O(1) worst-case push and pop (no resizing)
- Memory used is proportional to current size
- No wasted space

**Disadvantages:**
- Pointer overhead per element (8 bytes on 64-bit)
- Poor cache locality
- More memory allocations

## Implementation Comparison

| Aspect | Array-Based | Linked List-Based |
|--------|-------------|-------------------|
| Push time | O(1) amortized | O(1) worst-case |
| Pop time | O(1) | O(1) |
| Memory per element | Just the data | Data + pointer |
| Cache performance | Excellent | Poor |
| Memory usage | May over-allocate | Exact fit |
| Resize needed | Yes | No |

## Python's Built-in Options

Python lists work well as stacks:

```python
# Using list as stack
stack = []
stack.append(1)    # push - O(1) amortized
stack.append(2)
stack.append(3)
stack.pop()        # pop - O(1)
stack[-1]          # peek - O(1)
len(stack)         # size - O(1)
not stack          # is_empty check
```

For better performance with concurrent access, use `collections.deque`:

```python
from collections import deque

stack = deque()
stack.append(1)    # push
stack.pop()        # pop
stack[-1]          # peek
```

## Fixed-Size Stack

When maximum size is known, a simpler implementation without resizing:

```python
class FixedStack:
    def __init__(self, capacity):
        self._data = [None] * capacity
        self._top = -1
        self._capacity = capacity

    def push(self, item):
        if self._top == self._capacity - 1:
            raise OverflowError("Stack is full")
        self._top += 1
        self._data[self._top] = item

    def pop(self):
        if self._top == -1:
            raise IndexError("Stack is empty")
        item = self._data[self._top]
        self._top -= 1
        return item

    def is_full(self):
        return self._top == self._capacity - 1
```

Used in embedded systems or when memory is strictly limited.

## Thread-Safe Stack

For concurrent environments, synchronization is needed:

```python
import threading

class ThreadSafeStack:
    def __init__(self):
        self._stack = []
        self._lock = threading.Lock()

    def push(self, item):
        with self._lock:
            self._stack.append(item)

    def pop(self):
        with self._lock:
            if not self._stack:
                raise IndexError("Stack is empty")
            return self._stack.pop()
```

## Choosing an Implementation

**Choose array-based when:**
- Cache performance matters
- Size is roughly known
- Memory overhead should be minimal

**Choose linked list-based when:**
- Need guaranteed O(1) operations (no amortization)
- Size varies dramatically
- Memory fragmentation is acceptable

In practice, array-based implementations (like Python lists) are used in most situations due to their simplicity and cache efficiency.
