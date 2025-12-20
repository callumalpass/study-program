---
id: cs104-t1-circular
title: "Circular Lists"
order: 5
---

# Circular Linked Lists

A circular linked list is a variation where the last node points back to the first node, forming a closed loop. This structure has unique properties useful for specific applications like round-robin scheduling and circular buffers.

## Types of Circular Lists

### Circular Singly Linked List
The last node's next pointer points to the head instead of None:

```python
class CircularSinglyLinkedList:
    def __init__(self):
        self.head = None
        self.size = 0

    def is_empty(self):
        return self.head is None
```

```
    ┌─────────────────────────────┐
    ↓                             │
   [10] → [20] → [30] → [40] ────┘
    ↑
   head
```

### Circular Doubly Linked List
Both ends connect: head.prev points to tail, tail.next points to head:

```
    ┌─────────────────────────────────────┐
    ↓                                     │
   [10] ↔ [20] ↔ [30] ↔ [40] ↔ ──────────┘
    ↑                       ↑
   head                   (wraps to head)
```

## Core Operations

### Insertion at Head
```python
def insert_at_head(self, data):
    new_node = Node(data)
    if not self.head:
        self.head = new_node
        new_node.next = new_node  # Points to itself
    else:
        # Find the tail (last node)
        current = self.head
        while current.next != self.head:
            current = current.next

        new_node.next = self.head
        current.next = new_node
        self.head = new_node
    self.size += 1
```

### Insertion at Tail
```python
def insert_at_tail(self, data):
    new_node = Node(data)
    if not self.head:
        self.head = new_node
        new_node.next = new_node
    else:
        current = self.head
        while current.next != self.head:
            current = current.next
        current.next = new_node
        new_node.next = self.head
    self.size += 1
```

### Traversal - Critical Difference
In circular lists, you must detect when you've completed a cycle:

```python
def traverse(self):
    if not self.head:
        return

    current = self.head
    while True:
        print(current.data, end=" -> ")
        current = current.next
        if current == self.head:  # Back to start
            break
    print("(back to head)")

def to_list(self):
    if not self.head:
        return []

    result = []
    current = self.head
    while True:
        result.append(current.data)
        current = current.next
        if current == self.head:
            break
    return result
```

### Deletion
```python
def delete_node(self, value):
    if not self.head:
        return False

    # Special case: single node
    if self.head.next == self.head and self.head.data == value:
        self.head = None
        self.size -= 1
        return True

    # Find the node and its predecessor
    prev = None
    current = self.head
    while True:
        if current.data == value:
            if current == self.head:
                # Find tail to update its next
                tail = self.head
                while tail.next != self.head:
                    tail = tail.next
                self.head = self.head.next
                tail.next = self.head
            else:
                prev.next = current.next
            self.size -= 1
            return True
        prev = current
        current = current.next
        if current == self.head:
            break
    return False
```

## Tail Pointer Optimization

Maintaining a tail pointer improves many operations:

```python
class OptimizedCircularList:
    def __init__(self):
        self.tail = None  # Tail pointer only!
        self.size = 0

    @property
    def head(self):
        return self.tail.next if self.tail else None

    def insert_at_tail(self, data):
        new_node = Node(data)
        if not self.tail:
            new_node.next = new_node
            self.tail = new_node
        else:
            new_node.next = self.tail.next  # Point to head
            self.tail.next = new_node
            self.tail = new_node
        self.size += 1

    def insert_at_head(self, data):
        new_node = Node(data)
        if not self.tail:
            new_node.next = new_node
            self.tail = new_node
        else:
            new_node.next = self.tail.next
            self.tail.next = new_node
        # Don't update tail - head insertion
        self.size += 1
```

With just a tail pointer, both head and tail insertions are O(1)!

## Detecting Circularity (Floyd's Algorithm)

Given any linked list, detect if it's circular:

```python
def has_cycle(head):
    if not head:
        return False

    slow = head
    fast = head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False
```

This uses O(1) space and O(n) time.

## Practical Applications

1. **Round-Robin Scheduling**: OS process scheduling where each process gets equal CPU time
2. **Circular Buffers**: Audio/video streaming, network packet buffers
3. **Game Development**: Turn-based games cycling through players
4. **Music Playlists**: Repeat mode in media players
5. **Token Ring Networks**: Network topology where data passes in a circle

## Implementation Example: Round-Robin Scheduler

```python
class RoundRobinScheduler:
    def __init__(self):
        self.current = None

    def add_process(self, process_id):
        new_node = Node(process_id)
        if not self.current:
            new_node.next = new_node
            self.current = new_node
        else:
            new_node.next = self.current.next
            self.current.next = new_node

    def get_next_process(self):
        if not self.current:
            return None
        self.current = self.current.next
        return self.current.data

    def remove_process(self, process_id):
        # Remove completed process from the rotation
        pass
```

## Advantages and Disadvantages

**Advantages:**
- No null pointer at end (useful for continuous cycling)
- Any node can be a starting point
- Efficient for applications needing continuous traversal

**Disadvantages:**
- Infinite loop risk if termination condition is wrong
- More complex implementation
- Slightly harder to debug
- Need careful handling of edge cases

## Josephus Problem

A classic application of circular linked lists is the Josephus Problem: n people stand in a circle, and every k-th person is eliminated until one remains.

```python
def josephus(n, k):
    """Find the survivor in the Josephus problem"""
    # Create circular list of n people numbered 1 to n
    head = Node(1)
    current = head
    for i in range(2, n + 1):
        current.next = Node(i)
        current = current.next
    current.next = head  # Make it circular

    # Eliminate every k-th person
    current = head
    prev = None

    # Find the last node (to track previous during first elimination)
    temp = head
    while temp.next != head:
        temp = temp.next
    prev = temp

    remaining = n
    while remaining > 1:
        # Move k-1 steps
        for _ in range(k - 1):
            prev = current
            current = current.next

        # Eliminate current person
        prev.next = current.next
        current = current.next
        remaining -= 1

    return current.data  # Survivor's position
```

## Circular Buffer Implementation

A circular buffer (ring buffer) is commonly used in producer-consumer scenarios:

```python
class CircularBuffer:
    def __init__(self, capacity):
        self.buffer = [None] * capacity
        self.capacity = capacity
        self.head = 0  # Read position
        self.tail = 0  # Write position
        self.count = 0

    def is_full(self):
        return self.count == self.capacity

    def is_empty(self):
        return self.count == 0

    def enqueue(self, item):
        if self.is_full():
            raise BufferError("Buffer is full")
        self.buffer[self.tail] = item
        self.tail = (self.tail + 1) % self.capacity
        self.count += 1

    def dequeue(self):
        if self.is_empty():
            raise BufferError("Buffer is empty")
        item = self.buffer[self.head]
        self.head = (self.head + 1) % self.capacity
        self.count -= 1
        return item
```

This uses an array with wrap-around indices rather than linked nodes, which is more cache-efficient for fixed-size buffers.

## Key Takeaways

- Circular linked lists connect the tail back to the head, eliminating null termination
- They're ideal for applications that cycle through elements repeatedly (scheduling, playlists)
- A tail pointer alone is sufficient since head is always `tail.next`
- Traversal must check for returning to the starting point to avoid infinite loops
- Floyd's algorithm detects cycles in O(n) time and O(1) space using two pointers
- The Josephus problem is a classic example where circular structure simplifies the solution
- Circular buffers can be implemented with arrays or linked lists depending on whether size is fixed
