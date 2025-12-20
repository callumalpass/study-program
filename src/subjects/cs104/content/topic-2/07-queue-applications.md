# Queue Applications

Queues are essential in computing for managing ordered processing, scheduling, and communication. Their FIFO nature ensures fairness and maintains order in many critical systems.

## Breadth-First Search (BFS)

The most important algorithmic application of queues:

```python
from collections import deque

def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    order = []

    while queue:
        node = queue.popleft()
        order.append(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return order

# BFS guarantees shortest path in unweighted graphs
def shortest_path(graph, start, end):
    if start == end:
        return [start]

    visited = {start}
    queue = deque([(start, [start])])

    while queue:
        node, path = queue.popleft()

        for neighbor in graph[node]:
            if neighbor == end:
                return path + [neighbor]
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))

    return None  # No path exists
```

## Level-Order Tree Traversal

Process nodes level by level:

```python
def level_order(root):
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        level_size = len(queue)
        current_level = []

        for _ in range(level_size):
            node = queue.popleft()
            current_level.append(node.val)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(current_level)

    return result
```

## Task Scheduling

Operating systems use queues for process scheduling:

```python
from collections import deque

class TaskScheduler:
    def __init__(self):
        self.task_queue = deque()
        self.current_task = None

    def add_task(self, task):
        self.task_queue.append(task)

    def run_next(self, time_slice):
        if not self.current_task and self.task_queue:
            self.current_task = self.task_queue.popleft()

        if self.current_task:
            remaining = self.current_task.execute(time_slice)
            if remaining > 0:
                # Task not finished, put back in queue (round-robin)
                self.task_queue.append(self.current_task)
            self.current_task = None

# Round-robin scheduling ensures fair CPU time distribution
```

## Print Spooler

Managing print jobs in order received:

```python
class PrintSpooler:
    def __init__(self):
        self.queue = deque()
        self.printing = False

    def add_job(self, document, pages):
        job = {'document': document, 'pages': pages, 'status': 'queued'}
        self.queue.append(job)
        return len(self.queue)  # Position in queue

    def print_next(self):
        if self.queue:
            job = self.queue.popleft()
            job['status'] = 'printing'
            # Simulate printing...
            return job
        return None

    def get_queue_status(self):
        return [{'document': j['document'], 'pages': j['pages']}
                for j in self.queue]
```

## Message Queues

Asynchronous communication between systems:

```python
import time
from collections import deque
from threading import Lock

class MessageQueue:
    def __init__(self, max_size=1000):
        self.queue = deque(maxlen=max_size)
        self.lock = Lock()

    def publish(self, message):
        with self.lock:
            self.queue.append({
                'data': message,
                'timestamp': time.time()
            })

    def consume(self):
        with self.lock:
            if self.queue:
                return self.queue.popleft()
        return None

    def peek(self):
        with self.lock:
            if self.queue:
                return self.queue[0]
        return None
```

## Buffering in I/O Operations

Keyboard input buffer example:

```python
class KeyboardBuffer:
    def __init__(self, buffer_size=256):
        self.buffer = deque(maxlen=buffer_size)

    def key_pressed(self, char):
        # Called by keyboard interrupt handler
        if len(self.buffer) < self.buffer.maxlen:
            self.buffer.append(char)
        # Else: buffer full, keystroke lost (beep!)

    def read_char(self):
        # Called by application
        if self.buffer:
            return self.buffer.popleft()
        return None  # No input available

    def read_line(self):
        line = []
        while self.buffer:
            char = self.buffer.popleft()
            if char == '\n':
                break
            line.append(char)
        return ''.join(line)
```

## Cache Eviction (FIFO Cache)

Simple cache using queue for eviction:

```python
from collections import OrderedDict

class FIFOCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key):
        return self.cache.get(key)

    def put(self, key, value):
        if key in self.cache:
            self.cache[key] = value
        else:
            if len(self.cache) >= self.capacity:
                self.cache.popitem(last=False)  # Remove oldest
            self.cache[key] = value
```

## Hot Potato Simulation (Josephus Problem)

Classic queue-based simulation:

```python
def hot_potato(names, num_passes):
    queue = deque(names)

    while len(queue) > 1:
        for _ in range(num_passes):
            queue.append(queue.popleft())  # Pass the potato
        eliminated = queue.popleft()
        print(f"{eliminated} is eliminated")

    return queue[0]  # Winner

# hot_potato(['Bill', 'David', 'Susan', 'Jane', 'Kent'], 7)
```

## Real-World Queue Systems

1. **Amazon SQS**: Distributed message queue for microservices
2. **RabbitMQ**: Message broker for asynchronous processing
3. **Redis Lists**: High-performance in-memory queues
4. **Kafka**: Distributed streaming platform with queue semantics

These systems handle millions of messages per second, demonstrating the importance of efficient queue implementations at scale.

## When to Use Queue-Based Solutions

- Processing items in arrival order is required
- Buffering between producer and consumer
- Implementing BFS or level-order traversal
- Managing resources fairly (scheduling)
- Decoupling components in distributed systems
