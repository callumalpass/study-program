---
id: cs104-t2-queue-concept
title: "Queue Concept"
order: 4
---

# The Queue Concept: FIFO Principle

A queue is an abstract data type that follows the First-In-First-Out (FIFO) principle. The first element added is the first one to be removed, like a line at a ticket counter where the first person in line is served first.

## Core Operations

Every queue implementation must support these fundamental operations:

```python
class Queue:
    def enqueue(self, item):
        """Add item to the rear of the queue"""
        pass

    def dequeue(self):
        """Remove and return the front item"""
        pass

    def front(self):
        """Return front item without removing it"""
        pass

    def is_empty(self):
        """Check if queue is empty"""
        pass

    def size(self):
        """Return number of items"""
        pass
```

All operations should be O(1) time complexity.

## The FIFO Mental Model

Visualize a queue as a horizontal line where items enter at the rear and leave from the front:

```
                enqueue(40)
                     ↓
  Front ← [10][20][30][  ] ← Rear
    ↓
dequeue() returns 10

After operations:
  Front ← [20][30][40] ← Rear
```

Key insight: Processing order matches arrival order.

## Real-World Queue Examples

1. **Supermarket checkout line**: First customer in line is served first
2. **Print queue**: Documents printed in order submitted
3. **Customer service call center**: Callers handled in order
4. **Keyboard buffer**: Keystrokes processed in order typed
5. **Task scheduling**: Jobs executed in order received

## Queue vs Stack Comparison

```
STACK (LIFO):               QUEUE (FIFO):
    ↕ push/pop                enqueue →  → dequeue
  ┌────┐                    ┌────┬────┬────┬────┐
  │ 40 │ ← top              │ 10 │ 20 │ 30 │ 40 │
  ├────┤                    └────┴────┴────┴────┘
  │ 30 │                      ↑               ↑
  ├────┤                    front           rear
  │ 20 │
  ├────┤
  │ 10 │
  └────┘

Stack: Last added (40) removed first
Queue: First added (10) removed first
```

## Queue Interface in Different Languages

**Python** (using deque for efficiency):
```python
from collections import deque

queue = deque()
queue.append(1)      # enqueue
queue.append(2)
front = queue[0]     # front (peek)
item = queue.popleft()  # dequeue
```

**Java**:
```java
Queue<Integer> queue = new LinkedList<>();
queue.offer(1);      // enqueue
queue.offer(2);
int front = queue.peek();
int item = queue.poll();  // dequeue
```

**C++**:
```cpp
queue<int> q;
q.push(1);           // enqueue
q.push(2);
int front = q.front();
q.pop();             // dequeue (returns void)
```

## Common Queue Variants

### 1. Priority Queue
Elements dequeued by priority, not arrival order:
```python
import heapq

pq = []
heapq.heappush(pq, (2, "medium priority"))
heapq.heappush(pq, (1, "high priority"))
heapq.heappush(pq, (3, "low priority"))

# Dequeue by priority (lowest number = highest priority)
print(heapq.heappop(pq))  # (1, "high priority")
```

### 2. Double-Ended Queue (Deque)
Allows operations at both ends:
```python
from collections import deque

dq = deque()
dq.append(1)       # Add to rear
dq.appendleft(0)   # Add to front
dq.pop()           # Remove from rear
dq.popleft()       # Remove from front
```

### 3. Circular Queue
Fixed-size queue where rear wraps around to front (covered in detail later).

## When to Use a Queue

**Use a queue when:**
- Order of processing should match order of arrival
- Implementing breadth-first search (BFS)
- Task scheduling (job queues, message queues)
- Buffering data (streaming, I/O)
- Managing resources fairly (round-robin scheduling)

**Don't use a queue when:**
- Most recent item should be processed first (use stack)
- Need random access to elements (use array)
- Items have priorities (use priority queue)
- Need to process from both ends (use deque)

## Common Mistakes

1. **Using list.pop(0) in Python**: O(n) operation, use deque instead
2. **Dequeueing from empty queue**: Always check `is_empty()` first
3. **Confusing enqueue/dequeue with push/pop**: Different data structures
4. **Forgetting FIFO vs LIFO**: Draw diagrams to visualize

## Queue in Concurrent Systems

Queues are fundamental in multi-threaded programming:

```python
from queue import Queue
import threading

task_queue = Queue()

def worker():
    while True:
        task = task_queue.get()  # Blocks until item available
        process(task)
        task_queue.task_done()

# Start worker threads
for _ in range(4):
    t = threading.Thread(target=worker, daemon=True)
    t.start()

# Add tasks
for task in tasks:
    task_queue.put(task)

task_queue.join()  # Wait for all tasks to complete
```

The producer-consumer pattern relies heavily on queues for safe communication between threads.

## Queue Terminology

Different contexts use different terminology for queue operations:

| Operation | Standard | Alternative Names |
|-----------|----------|-------------------|
| Add item | Enqueue | offer, add, put, push (confusing but used) |
| Remove item | Dequeue | poll, remove, get, pop (confusing but used) |
| View front | Front/Peek | head, first |
| View rear | Rear | back, last, tail |

Be aware that some languages use "push/pop" for queues (confusingly similar to stacks), so always check documentation.

## Time and Space Complexity

| Operation | Time Complexity | Notes |
|-----------|-----------------|-------|
| Enqueue | O(1) | With proper implementation |
| Dequeue | O(1) | With proper implementation |
| Front/Peek | O(1) | Just return pointer |
| Is Empty | O(1) | Check size or front pointer |
| Size | O(1) | If tracked; O(n) if counting |

**Warning**: Using Python's `list.pop(0)` for dequeue is O(n) because all elements shift. Use `collections.deque` for O(1) operations.

## Key Takeaways

- Queues follow FIFO: First In, First Out
- Core operations (enqueue, dequeue, front) should all be O(1)
- Python's `collections.deque` is the recommended queue implementation
- Queues are essential for BFS, task scheduling, and producer-consumer patterns
- Priority queues and deques are important variants for different use cases
- Thread-safe queues (`queue.Queue`) are fundamental for concurrent programming
- Always use the right data structure: stack for LIFO, queue for FIFO, deque for both
