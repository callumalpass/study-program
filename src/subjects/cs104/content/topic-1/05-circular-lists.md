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
