# Queue Implementations

Like stacks, queues can be implemented using arrays or linked lists. However, array-based queues require special handling to achieve O(1) operations at both ends.

## Array-Based Queue (Naive Approach)

A simple but inefficient approach:

```python
class NaiveArrayQueue:
    def __init__(self):
        self._data = []

    def enqueue(self, item):
        self._data.append(item)  # O(1) amortized

    def dequeue(self):
        if self.is_empty():
            raise IndexError("Queue is empty")
        return self._data.pop(0)  # O(n) - BAD!
```

**Problem**: `pop(0)` shifts all elements, making dequeue O(n).

## Circular Array Queue

The standard solution uses a circular buffer:

```python
class CircularArrayQueue:
    def __init__(self, capacity=10):
        self._data = [None] * capacity
        self._front = 0
        self._size = 0
        self._capacity = capacity

    def enqueue(self, item):
        if self._size == self._capacity:
            self._resize(2 * self._capacity)
        rear = (self._front + self._size) % self._capacity
        self._data[rear] = item
        self._size += 1

    def dequeue(self):
        if self.is_empty():
            raise IndexError("Queue is empty")
        item = self._data[self._front]
        self._data[self._front] = None
        self._front = (self._front + 1) % self._capacity
        self._size -= 1
        return item

    def front(self):
        if self.is_empty():
            raise IndexError("Queue is empty")
        return self._data[self._front]

    def is_empty(self):
        return self._size == 0

    def __len__(self):
        return self._size

    def _resize(self, new_capacity):
        new_data = [None] * new_capacity
        for i in range(self._size):
            new_data[i] = self._data[(self._front + i) % self._capacity]
        self._data = new_data
        self._front = 0
        self._capacity = new_capacity
```

**How it works:**
```
Initial: front=0, size=0, capacity=5
         [_][_][_][_][_]
          ↑
        front

After enqueue(10, 20, 30):
         [10][20][30][_][_]
          ↑         ↑
        front      rear (calculated)

After dequeue() returns 10:
         [_][20][30][_][_]
             ↑      ↑
           front   rear

After enqueue(40, 50, 60):
         [60][20][30][40][50]  ← Wraps around!
          ↑   ↑
         rear front
```

## Linked List Queue

Simple and always O(1):

```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedQueue:
    def __init__(self):
        self._front = None
        self._rear = None
        self._size = 0

    def enqueue(self, item):
        new_node = Node(item)
        if self.is_empty():
            self._front = self._rear = new_node
        else:
            self._rear.next = new_node
            self._rear = new_node
        self._size += 1

    def dequeue(self):
        if self.is_empty():
            raise IndexError("Queue is empty")
        item = self._front.data
        self._front = self._front.next
        if self._front is None:
            self._rear = None
        self._size -= 1
        return item

    def front(self):
        if self.is_empty():
            raise IndexError("Queue is empty")
        return self._front.data

    def is_empty(self):
        return self._front is None

    def __len__(self):
        return self._size
```

## Using Python's collections.deque

The recommended approach in Python:

```python
from collections import deque

# As a queue
queue = deque()
queue.append(1)       # enqueue - O(1)
queue.append(2)
item = queue.popleft() # dequeue - O(1)
front = queue[0]      # peek - O(1)

# With max length (circular buffer)
bounded_queue = deque(maxlen=5)
for i in range(10):
    bounded_queue.append(i)
# bounded_queue contains [5, 6, 7, 8, 9]
```

`deque` is implemented as a doubly-linked list of fixed-size blocks, providing O(1) operations at both ends.

## Implementation Comparison

| Aspect | Circular Array | Linked List | deque |
|--------|---------------|-------------|-------|
| Enqueue | O(1) amortized | O(1) | O(1) |
| Dequeue | O(1) | O(1) | O(1) |
| Memory overhead | Low | High (pointers) | Medium |
| Cache performance | Good | Poor | Medium |
| Max size | Fixed/Resizable | Unlimited | Unlimited |
| Implementation | Complex | Simple | Built-in |

## Two-Stack Queue

An interesting alternative implementation using two stacks:

```python
class TwoStackQueue:
    def __init__(self):
        self._inbox = []   # For enqueue
        self._outbox = []  # For dequeue

    def enqueue(self, item):
        self._inbox.append(item)

    def dequeue(self):
        if not self._outbox:
            while self._inbox:
                self._outbox.append(self._inbox.pop())
        if not self._outbox:
            raise IndexError("Queue is empty")
        return self._outbox.pop()

    def front(self):
        if not self._outbox:
            while self._inbox:
                self._outbox.append(self._inbox.pop())
        if not self._outbox:
            raise IndexError("Queue is empty")
        return self._outbox[-1]
```

**Amortized O(1)**: Each element is moved at most twice (once to outbox, once out), so n operations take O(n) total time.

## Thread-Safe Queue

For concurrent programming:

```python
from queue import Queue  # Thread-safe by default

q = Queue(maxsize=100)  # Optional max size

# Producer thread
q.put(item)  # Blocks if full

# Consumer thread
item = q.get()  # Blocks if empty
q.task_done()

# Wait for all items to be processed
q.join()
```

Python's `queue.Queue` handles all synchronization internally, making it safe for multi-threaded producer-consumer patterns.

## Choosing an Implementation

- **General use in Python**: Use `collections.deque`
- **Thread-safe needed**: Use `queue.Queue`
- **Custom behavior needed**: Implement circular array or linked list
- **Learning/interviews**: Understand all approaches
