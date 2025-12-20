---
id: cs104-t1-singly
title: "Singly Linked Lists"
order: 3
---

# Singly Linked Lists

A singly linked list is a linear data structure where elements are stored in nodes, and each node contains data and a reference (pointer) to the next node. Unlike arrays, linked lists don't require contiguous memory allocation.

## Node Structure

Each node in a singly linked list contains two components:

```python
class Node:
    def __init__(self, data):
        self.data = data    # The actual value stored
        self.next = None    # Reference to the next node
```

The list itself typically maintains a reference to the first node (head):

```python
class SinglyLinkedList:
    def __init__(self):
        self.head = None
        self.size = 0
```

## Memory Model

Unlike arrays with contiguous memory, linked list nodes can be scattered throughout memory:

```
Array:    [10][20][30][40][50]   ← contiguous addresses

Linked:   [10|*]--→[20|*]--→[30|*]--→[40|*]--→[50|None]
          addr:100  addr:500  addr:200  addr:800  addr:350
          (scattered throughout memory)
```

Each node stores data plus a pointer (typically 4-8 bytes), so linked lists have higher memory overhead than arrays.

## Core Operations

### Insertion at Head - O(1)
```python
def insert_at_head(self, data):
    new_node = Node(data)
    new_node.next = self.head
    self.head = new_node
    self.size += 1
```

### Insertion at Tail - O(n) or O(1) with tail pointer
```python
def insert_at_tail(self, data):
    new_node = Node(data)
    if not self.head:
        self.head = new_node
    else:
        current = self.head
        while current.next:  # Traverse to last node
            current = current.next
        current.next = new_node
    self.size += 1
```

With a tail pointer, this becomes O(1):
```python
def __init__(self):
    self.head = None
    self.tail = None

def insert_at_tail(self, data):
    new_node = Node(data)
    if not self.head:
        self.head = self.tail = new_node
    else:
        self.tail.next = new_node
        self.tail = new_node
```

### Insertion at Position - O(n)
```python
def insert_at_position(self, data, position):
    if position == 0:
        return self.insert_at_head(data)

    new_node = Node(data)
    current = self.head
    for _ in range(position - 1):
        if not current:
            raise IndexError("Position out of range")
        current = current.next

    new_node.next = current.next
    current.next = new_node
    self.size += 1
```

### Deletion at Head - O(1)
```python
def delete_at_head(self):
    if not self.head:
        raise IndexError("List is empty")
    data = self.head.data
    self.head = self.head.next
    self.size -= 1
    return data
```

### Deletion by Value - O(n)
```python
def delete_by_value(self, value):
    if not self.head:
        return False

    # Special case: delete head
    if self.head.data == value:
        self.head = self.head.next
        self.size -= 1
        return True

    current = self.head
    while current.next:
        if current.next.data == value:
            current.next = current.next.next
            self.size -= 1
            return True
        current = current.next
    return False
```

### Search - O(n)
```python
def search(self, value):
    current = self.head
    index = 0
    while current:
        if current.data == value:
            return index
        current = current.next
        index += 1
    return -1
```

## Traversal Patterns

### Iterating Through All Nodes
```python
def print_list(self):
    current = self.head
    while current:
        print(current.data, end=" -> ")
        current = current.next
    print("None")

def to_list(self):
    result = []
    current = self.head
    while current:
        result.append(current.data)
        current = current.next
    return result
```

### Getting Length
```python
def __len__(self):
    return self.size  # O(1) if tracking size

# Without size tracking: O(n)
def length(self):
    count = 0
    current = self.head
    while current:
        count += 1
        current = current.next
    return count
```

## Time Complexity Summary

| Operation | Time | Notes |
|-----------|------|-------|
| Access by index | O(n) | Must traverse from head |
| Insert at head | O(1) | Just update pointers |
| Insert at tail | O(n) or O(1) | O(1) with tail pointer |
| Insert at middle | O(n) | Must find position first |
| Delete at head | O(1) | Just update head pointer |
| Delete at tail | O(n) | Must find second-to-last |
| Search | O(n) | Must traverse |

## Common Mistakes

1. **Losing the head reference**: Always save head before traversing
2. **Null pointer errors**: Check if node is None before accessing .next
3. **Off-by-one in traversal**: Double-check loop conditions
4. **Memory leaks**: In languages without GC, free deleted nodes
5. **Forgetting edge cases**: Empty list, single element, target at head/tail

## When to Use Singly Linked Lists

**Good for:**
- Frequent insertions/deletions at the beginning
- When you don't know the size in advance
- Implementing stacks (LIFO - add/remove at head)
- Memory is fragmented

**Not ideal for:**
- Random access by index
- Traversing backwards (need doubly linked)
- Cache-sensitive applications (poor locality)

## Advanced Techniques

### Reversing a Linked List

One of the most common interview problems and a fundamental skill:

```python
def reverse(self):
    prev = None
    current = self.head
    while current:
        next_node = current.next  # Save next
        current.next = prev       # Reverse pointer
        prev = current            # Move prev forward
        current = next_node       # Move current forward
    self.head = prev
```

This runs in O(n) time and O(1) space—no extra data structure needed.

### Finding the Middle Node

Use the "fast and slow pointer" technique:

```python
def find_middle(self):
    if not self.head:
        return None

    slow = self.head
    fast = self.head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    return slow  # slow is at the middle
```

When fast reaches the end, slow is at the middle. This works because fast moves twice as fast.

### Detecting Cycles

If a linked list has a cycle (some node's next points to an earlier node), regular traversal would loop forever:

```python
def has_cycle(self):
    if not self.head:
        return False

    slow = self.head
    fast = self.head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False
```

This is Floyd's Cycle Detection algorithm (also called "tortoise and hare").

## Key Takeaways

- Linked lists store elements in nodes connected by pointers, not contiguous memory
- Insertion and deletion at the head is O(1), making them ideal for stack implementations
- Random access is O(n) because you must traverse from the head
- Always handle edge cases: empty list, single element, and operations at head/tail
- The "fast and slow pointer" technique solves many linked list problems efficiently
- Memory overhead from pointers makes linked lists less cache-efficient than arrays
- Choose linked lists when insertion/deletion patterns favor the head and you don't need random access
