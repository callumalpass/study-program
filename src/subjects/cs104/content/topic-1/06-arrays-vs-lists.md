---
id: cs104-t1-comparison
title: "Arrays vs Linked Lists"
order: 6
---

# Arrays vs Linked Lists: Making the Right Choice

Understanding when to use arrays versus linked lists is a fundamental skill in data structure selection. Each structure has distinct characteristics that make it optimal for specific use cases.

## Performance Comparison

### Time Complexity

| Operation | Array | Linked List | Notes |
|-----------|-------|-------------|-------|
| Access by index | O(1) | O(n) | Array calculates address; list must traverse |
| Search (unsorted) | O(n) | O(n) | Both require scanning |
| Search (sorted) | O(log n) | O(n) | Binary search works on arrays |
| Insert at beginning | O(n) | O(1) | Array shifts all elements |
| Insert at end | O(1)* | O(1)** | *Amortized; **With tail pointer |
| Insert at middle | O(n) | O(n) | Array shifts; list traverses |
| Delete at beginning | O(n) | O(1) | Array shifts all elements |
| Delete at end | O(1) | O(n)*** | ***O(1) with doubly linked |
| Delete at middle | O(n) | O(n) | Both require shifting/traversing |

### Space Complexity

```
For n elements of size s bytes:

Array:
  - Data only: n × s bytes
  - Very space efficient

Singly Linked List:
  - Data + pointers: n × (s + 8) bytes  (assuming 64-bit pointers)
  - 8 bytes overhead per element

Doubly Linked List:
  - Data + two pointers: n × (s + 16) bytes
  - 16 bytes overhead per element
```

For small data types (like integers), linked list overhead can double or triple memory usage.

## Cache Performance

This is often the deciding factor in practice:

```python
import time

# Array - excellent cache locality
arr = list(range(10000000))
start = time.time()
total = sum(arr)  # Sequential access
print(f"Array sum: {time.time() - start:.3f}s")

# Simulated linked list behavior - poor cache locality
import random
indices = list(range(10000000))
random.shuffle(indices)
start = time.time()
total = sum(arr[i] for i in indices)  # Random access
print(f"Random access: {time.time() - start:.3f}s")
```

Arrays are typically 5-10x faster for sequential operations due to:
- **Spatial locality**: Adjacent elements loaded into cache together
- **Prefetching**: CPU predicts sequential access patterns
- **Memory layout**: Contiguous storage avoids cache misses

## Decision Framework

### Choose Arrays When:

1. **Random access is frequent**
   ```python
   # Fast: O(1) access
   scores = [85, 90, 78, 92, 88]
   third_score = scores[2]
   ```

2. **Size is known or relatively stable**
   ```python
   # Pre-allocate for known size
   buffer = [0] * 1024
   ```

3. **Memory efficiency matters**
   ```python
   # Storing millions of small values
   ids = array.array('i', range(10000000))  # Compact integer array
   ```

4. **You need sorting or binary search**
   ```python
   sorted_data = sorted(data)
   index = bisect.bisect_left(sorted_data, target)
   ```

5. **Cache performance is critical**
   - Numerical computing
   - Image processing
   - Game development

### Choose Linked Lists When:

1. **Frequent insertions/deletions at the front**
   ```python
   # Fast: O(1) at head
   class Stack:
       def push(self, item):
           new_node = Node(item)
           new_node.next = self.head
           self.head = new_node
   ```

2. **Unknown or highly variable size**
   ```python
   # No need to pre-allocate or resize
   while more_data:
       list.append(process(data))
   ```

3. **Memory is fragmented**
   - Can use scattered memory chunks
   - No need for large contiguous blocks

4. **Need to splice lists together**
   ```python
   # O(1) to connect two linked lists
   list1_tail.next = list2_head
   ```

5. **Implementing specialized structures**
   - LRU Cache (doubly linked + hash map)
   - Graph adjacency lists
   - Polynomial representation

## Real-World Scenarios

### Scenario 1: Player Leaderboard
```python
# Array: Good choice
# - Frequent access by rank (index)
# - Sorting needed for rank updates
# - Fixed reasonable size
leaderboard = sorted(players, key=lambda p: p.score, reverse=True)
top_10 = leaderboard[:10]
```

### Scenario 2: Undo History in Text Editor
```python
# Linked List: Good choice
# - Always access most recent (head/tail)
# - Size varies greatly
# - Never random access needed
class UndoStack:
    def __init__(self):
        self.head = None

    def push_action(self, action):
        # O(1) insertion
        node = Node(action)
        node.next = self.head
        self.head = node
```

### Scenario 3: Music Playlist
```python
# It depends on features:
# - Shuffle play: Array (random access)
# - Sequential play with frequent adds: Linked list
# - Most players use: Array with shuffle algorithm
```

### Scenario 4: Operating System Process Queue
```python
# Linked List: Good choice
# - FIFO operations (enqueue/dequeue)
# - Processes frequently added/removed
# - No random access needed
```

## Hybrid Approaches

Sometimes the best solution combines both:

### Unrolled Linked List
Store small arrays in each node:
```
[10,20,30] → [40,50,60] → [70,80,90] → None
```
Benefits: Better cache locality than linked list, more flexible than array.

### Hash Map + Linked List (LRU Cache)
```python
# O(1) access via hash map
# O(1) LRU updates via linked list
class LRUCache:
    def __init__(self, capacity):
        self.cache = {}  # key -> node
        self.list = DoublyLinkedList()  # for LRU ordering
```

## Summary

The choice between arrays and linked lists is rarely about raw complexity numbers alone. Consider:
- Access patterns (random vs sequential)
- Modification patterns (where do changes happen?)
- Size characteristics (fixed, bounded, unbounded)
- Memory constraints and fragmentation
- Cache behavior and real-world performance

When in doubt, start with arrays (the default in most languages) and switch to linked lists only when you have a specific reason.
