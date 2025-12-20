# Doubly Linked Lists

A doubly linked list extends the singly linked list concept by adding a previous pointer to each node, enabling bidirectional traversal. This additional pointer provides significant advantages for certain operations at the cost of extra memory.

## Node Structure

```python
class DoublyNode:
    def __init__(self, data):
        self.data = data
        self.prev = None  # Pointer to previous node
        self.next = None  # Pointer to next node

class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0
```

## Visual Representation

```
None ← [10] ↔ [20] ↔ [30] ↔ [40] → None
         ↑                       ↑
        head                   tail
```

Each node maintains two pointers, creating a chain that can be traversed in both directions.

## Core Operations

### Insertion at Head - O(1)
```python
def insert_at_head(self, data):
    new_node = DoublyNode(data)
    if not self.head:
        self.head = self.tail = new_node
    else:
        new_node.next = self.head
        self.head.prev = new_node
        self.head = new_node
    self.size += 1
```

### Insertion at Tail - O(1)
```python
def insert_at_tail(self, data):
    new_node = DoublyNode(data)
    if not self.tail:
        self.head = self.tail = new_node
    else:
        new_node.prev = self.tail
        self.tail.next = new_node
        self.tail = new_node
    self.size += 1
```

### Insertion Before a Node - O(1) given the node
```python
def insert_before(self, node, data):
    if not node:
        return
    new_node = DoublyNode(data)
    new_node.next = node
    new_node.prev = node.prev

    if node.prev:
        node.prev.next = new_node
    else:
        self.head = new_node
    node.prev = new_node
    self.size += 1
```

### Deletion at Tail - O(1)
This is a major advantage over singly linked lists:
```python
def delete_at_tail(self):
    if not self.tail:
        raise IndexError("List is empty")
    data = self.tail.data
    if self.head == self.tail:
        self.head = self.tail = None
    else:
        self.tail = self.tail.prev
        self.tail.next = None
    self.size -= 1
    return data
```

### Delete Specific Node - O(1) given the node
```python
def delete_node(self, node):
    if not node:
        return

    if node.prev:
        node.prev.next = node.next
    else:
        self.head = node.next

    if node.next:
        node.next.prev = node.prev
    else:
        self.tail = node.prev

    self.size -= 1
```

## Bidirectional Traversal

```python
def traverse_forward(self):
    current = self.head
    while current:
        print(current.data, end=" -> ")
        current = current.next
    print("None")

def traverse_backward(self):
    current = self.tail
    while current:
        print(current.data, end=" -> ")
        current = current.prev
    print("None")
```

## Time Complexity Comparison

| Operation | Singly Linked | Doubly Linked |
|-----------|---------------|---------------|
| Insert at head | O(1) | O(1) |
| Insert at tail | O(n)* | O(1) |
| Delete at head | O(1) | O(1) |
| Delete at tail | O(n) | O(1) |
| Delete given node | O(n)** | O(1) |
| Traverse backwards | O(n²)*** | O(n) |

*O(1) with tail pointer in singly linked
**Must find previous node first
***Requires repeated traversals from head

## Memory Overhead

Doubly linked lists use more memory per node:
- Singly: data + 1 pointer (8 bytes typically)
- Doubly: data + 2 pointers (16 bytes typically)

For small data items, this overhead can be significant:
```
Storing 1 million integers:
- Array: ~4 MB (just data)
- Singly linked: ~12 MB (data + next pointer)
- Doubly linked: ~20 MB (data + two pointers)
```

## Sentinel Nodes (Dummy Nodes)

Using sentinel head and tail nodes simplifies edge case handling:

```python
class DoublyLinkedListWithSentinels:
    def __init__(self):
        self.head = DoublyNode(None)  # Dummy head
        self.tail = DoublyNode(None)  # Dummy tail
        self.head.next = self.tail
        self.tail.prev = self.head
        self.size = 0

    def insert_at_head(self, data):
        new_node = DoublyNode(data)
        new_node.prev = self.head
        new_node.next = self.head.next
        self.head.next.prev = new_node
        self.head.next = new_node
        self.size += 1
```

With sentinels, you never need to check for null head or tail - the structure is always consistent.

## Common Applications

1. **Browser history**: Navigate forward and backward through pages
2. **Music playlist**: Previous and next track functionality
3. **Undo/Redo**: Navigate through action history
4. **LRU Cache**: O(1) removal of least recently used items
5. **Text editors**: Efficient cursor movement in both directions

## When to Choose Doubly Over Singly

**Choose doubly linked list when:**
- Need frequent deletions at the tail
- Need backward traversal
- Implementing LRU cache or deque
- Have references to nodes and need O(1) deletion

**Stick with singly linked when:**
- Memory is constrained
- Only need forward traversal
- Implementing simple stack or queue
- Insertions/deletions only at head
