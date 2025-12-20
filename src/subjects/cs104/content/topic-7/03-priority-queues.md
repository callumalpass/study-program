---
id: cs104-t7-priority
title: "Priority Queues"
order: 3
---

# Priority Queues

A priority queue is an abstract data type where elements have priorities, and elements with higher priority are served before elements with lower priority. Heaps are the most common implementation of priority queues.

## Priority Queue Operations

- **insert(element, priority)**: Add element with given priority
- **extract_max()** / **extract_min()**: Remove and return highest/lowest priority element
- **peek()**: View highest priority element without removing
- **change_priority(element, new_priority)**: Update an element's priority

## Implementation Using Heap

```python
import heapq

class PriorityQueue:
    """Min-priority queue using Python's heapq."""

    def __init__(self):
        self.heap = []
        self.entry_finder = {}  # Map element to entry
        self.counter = 0  # Unique sequence count for ties

    def push(self, element, priority):
        """Add element with priority. O(log n)"""
        if element in self.entry_finder:
            self.remove(element)

        entry = [priority, self.counter, element]
        self.counter += 1
        self.entry_finder[element] = entry
        heapq.heappush(self.heap, entry)

    def pop(self):
        """Remove and return element with lowest priority. O(log n)"""
        while self.heap:
            priority, count, element = heapq.heappop(self.heap)
            if element is not None:  # Not removed
                del self.entry_finder[element]
                return element
        raise KeyError("Priority queue is empty")

    def remove(self, element):
        """Mark element as removed (lazy deletion). O(1)"""
        entry = self.entry_finder.pop(element)
        entry[-1] = None  # Mark as removed

    def peek(self):
        """Return element with lowest priority. O(1)"""
        while self.heap and self.heap[0][-1] is None:
            heapq.heappop(self.heap)
        if self.heap:
            return self.heap[0][-1]
        raise KeyError("Priority queue is empty")

    def __len__(self):
        return len(self.entry_finder)

    def __bool__(self):
        return bool(self.entry_finder)
```

## Handling Priority Ties

When elements have equal priority, we need a tiebreaker:

```python
class Task:
    def __init__(self, priority, name):
        self.priority = priority
        self.name = name

# Using tuple with sequence number
import itertools

class TaskQueue:
    def __init__(self):
        self.heap = []
        self.counter = itertools.count()

    def add_task(self, task, priority):
        count = next(self.counter)
        entry = (priority, count, task)  # count breaks ties
        heapq.heappush(self.heap, entry)

    def pop_task(self):
        priority, count, task = heapq.heappop(self.heap)
        return task
```

## Priority Queue vs Other Data Structures

| Structure | Insert | Extract Min | Find Min | Change Priority |
|-----------|--------|-------------|----------|-----------------|
| Unsorted Array | O(1) | O(n) | O(n) | O(n) |
| Sorted Array | O(n) | O(1) | O(1) | O(n) |
| Heap | O(log n) | O(log n) | O(1) | O(log n) |
| BST | O(log n) | O(log n) | O(log n) | O(log n) |

## Applications

### 1. Dijkstra's Shortest Path

```python
import heapq

def dijkstra(graph, start):
    """Find shortest paths using priority queue."""
    distances = {node: float('inf') for node in graph}
    distances[start] = 0

    # Priority queue: (distance, node)
    pq = [(0, start)]

    while pq:
        current_dist, current = heapq.heappop(pq)

        if current_dist > distances[current]:
            continue  # Skip if we've found a better path

        for neighbor, weight in graph[current]:
            distance = current_dist + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))

    return distances
```

### 2. Event-Driven Simulation

```python
class EventSimulator:
    def __init__(self):
        self.events = []  # Priority queue of (time, event)
        self.current_time = 0

    def schedule(self, time, event):
        heapq.heappush(self.events, (time, event))

    def run(self):
        while self.events:
            time, event = heapq.heappop(self.events)
            self.current_time = time
            self.process(event)

    def process(self, event):
        # Handle event, may schedule new events
        pass
```

### 3. Huffman Encoding

```python
def build_huffman_tree(frequencies):
    """Build Huffman tree using priority queue."""
    # Create leaf nodes
    heap = [(freq, char) for char, freq in frequencies.items()]
    heapq.heapify(heap)

    while len(heap) > 1:
        # Combine two lowest frequency nodes
        freq1, node1 = heapq.heappop(heap)
        freq2, node2 = heapq.heappop(heap)

        combined = (freq1 + freq2, (node1, node2))
        heapq.heappush(heap, combined)

    return heap[0]
```

### 4. K-Way Merge

```python
def merge_k_sorted_lists(lists):
    """Merge k sorted lists using priority queue."""
    result = []
    # Heap entries: (value, list_index, element_index)
    heap = []

    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst[0], i, 0))

    while heap:
        val, list_idx, elem_idx = heapq.heappop(heap)
        result.append(val)

        # Add next element from same list
        if elem_idx + 1 < len(lists[list_idx]):
            next_val = lists[list_idx][elem_idx + 1]
            heapq.heappush(heap, (next_val, list_idx, elem_idx + 1))

    return result
```

### 5. Task Scheduling

```python
def schedule_tasks(tasks, cooldown):
    """
    Schedule tasks with cooldown between same tasks.
    tasks: list of task IDs
    cooldown: minimum gap between same task
    """
    from collections import Counter

    counts = Counter(tasks)
    # Max-heap of (count, task)
    heap = [(-count, task) for task, count in counts.items()]
    heapq.heapify(heap)

    time = 0
    cooling = []  # (available_time, count, task)

    while heap or cooling:
        # Move available tasks back to heap
        while cooling and cooling[0][0] <= time:
            _, count, task = heapq.heappop(cooling)
            heapq.heappush(heap, (count, task))

        if heap:
            count, task = heapq.heappop(heap)
            time += 1
            if count + 1 < 0:  # More instances to schedule
                heapq.heappush(cooling, (time + cooldown, count + 1, task))
        else:
            # Idle time
            time = cooling[0][0]

    return time
```

## Indexed Priority Queue

When you need to update priorities by element:

```python
class IndexedPriorityQueue:
    """Priority queue with efficient update by element."""

    def __init__(self):
        self.heap = []
        self.index = {}  # element -> heap index

    def push(self, element, priority):
        if element in self.index:
            self.update(element, priority)
            return

        self.index[element] = len(self.heap)
        self.heap.append((priority, element))
        self._sift_up(len(self.heap) - 1)

    def update(self, element, priority):
        idx = self.index[element]
        old_priority = self.heap[idx][0]
        self.heap[idx] = (priority, element)

        if priority < old_priority:
            self._sift_up(idx)
        else:
            self._sift_down(idx)

    def _swap(self, i, j):
        self.heap[i], self.heap[j] = self.heap[j], self.heap[i]
        self.index[self.heap[i][1]] = i
        self.index[self.heap[j][1]] = j

    # ... sift_up and sift_down using _swap
```

## Summary

Priority queues provide efficient access to the highest (or lowest) priority element. Heaps implement priority queues with O(log n) insertion and extraction. Applications include Dijkstra's algorithm, event simulation, Huffman encoding, and k-way merging. Use indexed priority queues when you need to update priorities efficiently.
