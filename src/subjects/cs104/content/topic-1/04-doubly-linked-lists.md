---
id: cs104-t1-doubly
title: "Doubly Linked Lists"
order: 4
---

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

## Common Implementation Patterns

### Converting Between List Types

Sometimes you need to convert a doubly linked list to an array or vice versa:

```python
def to_array(self):
    result = []
    current = self.head
    while current:
        result.append(current.data)
        current = current.next
    return result

@classmethod
def from_array(cls, arr):
    dll = cls()
    for item in arr:
        dll.insert_at_tail(item)
    return dll
```

### Swapping Adjacent Nodes

Unlike arrays where swapping is simple, linked list node swapping requires careful pointer manipulation:

```python
def swap_nodes(self, node1, node2):
    """Swap two adjacent nodes where node1.next == node2"""
    if not node1 or not node2 or node1.next != node2:
        return

    # Update external links
    if node1.prev:
        node1.prev.next = node2
    else:
        self.head = node2

    if node2.next:
        node2.next.prev = node1
    else:
        self.tail = node1

    # Swap the nodes
    node2.prev = node1.prev
    node1.prev = node2
    node1.next = node2.next
    node2.next = node1
```

## Debugging Tips

When working with doubly linked lists, bugs often come from incorrect pointer updates. Use these strategies:

1. **Draw diagrams**: Before coding, sketch the before and after states of pointer changes
2. **Check invariants**: After each operation, verify that for every node `n`, `n.next.prev == n` and `n.prev.next == n`
3. **Walk both directions**: Traverse forward and backward to ensure consistency
4. **Count nodes**: The size should match the number of nodes reachable from head and from tail

```python
def validate(self):
    """Check that the list structure is consistent"""
    if not self.head:
        return self.tail is None and self.size == 0

    # Check forward traversal
    count_forward = 0
    current = self.head
    while current:
        count_forward += 1
        if current.next:
            assert current.next.prev == current
        current = current.next

    # Check backward traversal matches
    count_backward = 0
    current = self.tail
    while current:
        count_backward += 1
        current = current.prev

    assert count_forward == count_backward == self.size
    return True
```

## Key Takeaways

- Doubly linked lists add a previous pointer, enabling O(1) deletion at the tail and O(1) deletion of any node given a reference to it
- The extra pointer doubles memory overhead compared to singly linked lists
- Sentinel nodes eliminate edge cases for empty lists and boundary operations
- Common uses include LRU caches, browser history, and deques
- Always update both `next` and `prev` pointers when modifying the list to maintain consistency
- Choose doubly linked when you need backward traversal or frequent deletions from both ends
