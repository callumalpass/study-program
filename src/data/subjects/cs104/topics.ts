import { Topic } from '../../../core/types';

const topic1Content = `# Arrays and Linked Lists

## Introduction

Arrays and linked lists are the foundational building blocks of data structures. Understanding these two fundamental structures is essential for every programmer, as they form the basis for more complex data structures and algorithms.

## Learning Objectives

By the end of this topic, you will be able to:

1. Explain the differences between arrays and linked lists
2. Analyze the time complexity of common operations on both structures
3. Implement singly and doubly linked lists
4. Choose the appropriate data structure for different scenarios
5. Solve classic linked list problems using pointer manipulation

## Core Concepts

### Arrays

Arrays store elements in **contiguous memory locations**, enabling constant-time O(1) access to any element using its index. This property makes arrays ideal for scenarios requiring frequent random access.

\`\`\`python
# Array access is O(1)
arr = [10, 20, 30, 40, 50]
print(arr[2])  # 30 - direct access

# Insertion at end is O(1) amortized
arr.append(60)

# Insertion at beginning is O(n) - requires shifting
arr.insert(0, 5)  # All elements must shift right
\`\`\`

**Time Complexities for Arrays:**
- Access by index: O(1)
- Search (unsorted): O(n)
- Insert at end: O(1) amortized
- Insert at beginning/middle: O(n)
- Delete at end: O(1)
- Delete at beginning/middle: O(n)

### Linked Lists

Linked lists consist of **nodes** where each node contains data and a reference (pointer) to the next node. Unlike arrays, linked lists don't require contiguous memory.

\`\`\`python
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

# Creating a linked list: 1 -> 2 -> 3
head = Node(1)
head.next = Node(2)
head.next.next = Node(3)
\`\`\`

**Types of Linked Lists:**
- **Singly Linked List**: Each node points to the next node only
- **Doubly Linked List**: Each node points to both next and previous nodes
- **Circular Linked List**: The last node points back to the first node

**Time Complexities for Linked Lists:**
- Access by index: O(n) - must traverse from head
- Search: O(n)
- Insert at beginning: O(1)
- Insert at end: O(n) or O(1) with tail pointer
- Delete at beginning: O(1)
- Delete at end: O(n)

### When to Use Each

**Choose Arrays when:**
- You need frequent random access by index
- The size is known and relatively fixed
- Memory locality matters (cache efficiency)
- You're doing lots of reads, few modifications

**Choose Linked Lists when:**
- Frequent insertions/deletions at the beginning
- Size is highly dynamic
- You don't need random access
- Memory is fragmented

## Common Mistakes

1. **Forgetting to handle null/empty cases**: Always check if head is None before operations
2. **Losing reference to head**: Save the head pointer before traversing
3. **Off-by-one errors**: Be careful with loop conditions when counting nodes
4. **Memory leaks**: In languages without garbage collection, properly free deleted nodes
5. **Modifying while iterating**: This can cause infinite loops or skipped nodes

## Best Practices

1. **Use dummy head nodes** to simplify edge cases in linked list operations
2. **Use two pointers** (slow/fast) for many linked list problems
3. **Draw diagrams** when working with pointer manipulations
4. **Test with edge cases**: empty list, single element, two elements
5. **Consider space-time tradeoffs**: Sometimes converting to an array temporarily simplifies the problem

## Summary

Arrays and linked lists each have distinct advantages. Arrays excel at random access and cache efficiency, while linked lists excel at dynamic sizing and efficient insertions at the beginning. Understanding these tradeoffs is fundamental to choosing the right data structure for any given problem.
`;

const topic2Content = `# Stacks and Queues

## Introduction

Stacks and queues are abstract data types that restrict how elements are added and removed from a collection. These restrictions make them incredibly useful for specific problems and form the basis of many algorithms.

## Learning Objectives

By the end of this topic, you will be able to:

1. Explain LIFO (Last-In-First-Out) and FIFO (First-In-First-Out) principles
2. Implement stacks and queues using arrays and linked lists
3. Apply stacks to expression evaluation and parentheses matching
4. Apply queues to BFS and level-order processing
5. Use deques for problems requiring access at both ends

## Core Concepts

### Stacks (LIFO)

A stack follows the **Last-In-First-Out** principle. Think of a stack of plates—you can only add or remove plates from the top.

\`\`\`python
# Stack operations
stack = []
stack.append(1)    # push
stack.append(2)    # push
stack.append(3)    # push
top = stack[-1]    # peek: 3
item = stack.pop() # pop: 3
\`\`\`

**Key Operations:**
- **push(item)**: Add item to top - O(1)
- **pop()**: Remove and return top item - O(1)
- **peek()**: View top item without removing - O(1)
- **isEmpty()**: Check if stack is empty - O(1)

**Common Applications:**
- Function call management (call stack)
- Expression evaluation (infix, postfix)
- Parentheses/bracket matching
- Undo mechanisms
- DFS traversal

### Queues (FIFO)

A queue follows the **First-In-First-Out** principle. Think of a line at a store—first person in line is first to be served.

\`\`\`python
from collections import deque

queue = deque()
queue.append(1)     # enqueue
queue.append(2)     # enqueue
item = queue.popleft()  # dequeue: 1
\`\`\`

**Key Operations:**
- **enqueue(item)**: Add item to rear - O(1)
- **dequeue()**: Remove and return front item - O(1)
- **front()**: View front item without removing - O(1)
- **isEmpty()**: Check if queue is empty - O(1)

**Common Applications:**
- BFS traversal
- Level-order tree traversal
- Task scheduling
- Print queue, message buffers

### Deques (Double-Ended Queues)

Deques allow insertion and deletion at both ends efficiently.

\`\`\`python
from collections import deque

dq = deque()
dq.append(1)      # add to right
dq.appendleft(0)  # add to left
dq.pop()          # remove from right
dq.popleft()      # remove from left
\`\`\`

### Priority Queues

Elements have priorities; highest priority is dequeued first (covered in detail in Topic 7).

## Common Mistakes

1. **Stack underflow**: Popping from an empty stack
2. **Using list for queue**: list.pop(0) is O(n); use collections.deque
3. **Not handling edge cases**: Empty stack/queue operations
4. **Confusing LIFO vs FIFO**: Draw diagrams to visualize

## Best Practices

1. **Use deque for queues**: Python's deque provides O(1) operations at both ends
2. **Check for empty before pop/dequeue**
3. **Consider monotonic stacks/queues** for problems involving "next greater element"

## Summary

Stacks and queues are fundamental data structures with restricted access patterns. Stacks (LIFO) are ideal for matching, recursion simulation, and DFS. Queues (FIFO) are perfect for BFS and level-order processing.
`;

const topic3Content = `# Trees

## Introduction

Trees are hierarchical data structures consisting of nodes connected by edges. Unlike linear structures, trees represent relationships with parent-child hierarchies and are fundamental to many computer science applications.

## Learning Objectives

By the end of this topic, you will be able to:

1. Understand tree terminology and properties
2. Implement binary trees and binary search trees
3. Perform tree traversals (inorder, preorder, postorder, level-order)
4. Analyze BST operations and their time complexities
5. Understand balanced trees and their importance

## Core Concepts

### Tree Terminology

- **Root**: The topmost node with no parent
- **Parent/Child**: A node's direct ancestor/descendant
- **Leaf**: A node with no children
- **Height**: Longest path from root to a leaf
- **Depth**: Distance from root to a node
- **Subtree**: A node and all its descendants

### Binary Trees

Each node has at most two children (left and right).

\`\`\`python
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None
\`\`\`

### Binary Search Trees (BST)

A binary tree where for each node:
- All left subtree values < node value
- All right subtree values > node value

\`\`\`python
def search_bst(root, target):
    if not root or root.val == target:
        return root
    if target < root.val:
        return search_bst(root.left, target)
    return search_bst(root.right, target)
\`\`\`

**BST Time Complexities (balanced):**
- Search: O(log n)
- Insert: O(log n)
- Delete: O(log n)

**Worst case (skewed tree):** All operations become O(n)

### Tree Traversals

\`\`\`python
def inorder(root):    # Left, Root, Right
    if root:
        inorder(root.left)
        print(root.val)
        inorder(root.right)

def preorder(root):   # Root, Left, Right
    if root:
        print(root.val)
        preorder(root.left)
        preorder(root.right)

def postorder(root):  # Left, Right, Root
    if root:
        postorder(root.left)
        postorder(root.right)
        print(root.val)
\`\`\`

**Key insight**: Inorder traversal of a BST visits nodes in sorted order.

## Common Mistakes

1. **Forgetting base case**: Always check if node is None
2. **Confusing traversal orders**: Remember by when root is visited
3. **BST property violations**: Remember it applies to entire subtrees, not just children
4. **Not considering unbalanced trees**: Worst-case is O(n) for skewed trees

## Summary

Trees are hierarchical structures essential for representing relationships and enabling efficient operations. Binary Search Trees provide O(log n) operations when balanced. Tree traversals (inorder, preorder, postorder, level-order) visit nodes in different orders useful for different problems.
`;

const topic4Content = `# Hash Tables

## Introduction

Hash tables (hash maps) are data structures that provide average O(1) time complexity for insertions, deletions, and lookups. They achieve this efficiency by using a hash function to compute an index into an array of buckets.

## Learning Objectives

By the end of this topic, you will be able to:

1. Explain how hash functions map keys to indices
2. Understand collision resolution strategies
3. Analyze the time complexity of hash table operations
4. Implement a basic hash table
5. Apply hash tables to solve common problems

## Core Concepts

### Hash Functions

A hash function maps keys to array indices. Good hash functions:
- Distribute keys uniformly across buckets
- Are deterministic (same input always gives same output)
- Are efficient to compute

\`\`\`python
def simple_hash(key, size):
    return hash(key) % size
\`\`\`

### Collision Resolution

Collisions occur when two different keys hash to the same index.

**Chaining**: Each bucket stores a linked list of entries.
\`\`\`python
class HashMap:
    def __init__(self, size=1000):
        self.buckets = [[] for _ in range(size)]

    def put(self, key, value):
        idx = hash(key) % len(self.buckets)
        for i, (k, v) in enumerate(self.buckets[idx]):
            if k == key:
                self.buckets[idx][i] = (key, value)
                return
        self.buckets[idx].append((key, value))
\`\`\`

**Open Addressing**: Find another slot in the array.
- Linear probing: Check next slot
- Quadratic probing: Check slots at increasing intervals
- Double hashing: Use second hash function

### Load Factor

Load factor = n / capacity (number of elements / number of buckets)

High load factor increases collisions. Resize when load factor exceeds threshold (typically 0.75).

### Time Complexities

| Operation | Average | Worst (many collisions) |
|-----------|---------|-------------------------|
| Insert    | O(1)    | O(n)                    |
| Search    | O(1)    | O(n)                    |
| Delete    | O(1)    | O(n)                    |

## Common Mistakes

1. **Using mutable objects as keys**: Keys must be hashable
2. **Not handling collisions**: They will happen
3. **Poor hash functions**: Leading to clustering
4. **Forgetting to resize**: Performance degrades with high load factor

## Summary

Hash tables provide O(1) average-case operations by using hash functions to map keys to indices. Understanding collision resolution and load factor is crucial for efficient implementations.
`;

const topic5Content = `# Graphs

## Introduction

Graphs are versatile data structures that model relationships between objects. They consist of vertices (nodes) and edges (connections) and can represent everything from social networks to road maps.

## Learning Objectives

By the end of this topic, you will be able to:

1. Understand graph terminology and types
2. Represent graphs using adjacency lists and matrices
3. Implement DFS and BFS traversals
4. Apply graph algorithms to real-world problems
5. Detect cycles and find connected components

## Core Concepts

### Graph Types

- **Directed vs Undirected**: Edges have direction or not
- **Weighted vs Unweighted**: Edges have associated costs or not
- **Cyclic vs Acyclic**: Contains cycles or not
- **Connected vs Disconnected**: All vertices reachable or not

### Graph Representations

**Adjacency List** (most common):
\`\`\`python
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'D'],
    'D': ['B', 'C']
}
\`\`\`

**Adjacency Matrix**:
\`\`\`python
# 0 means no edge, 1 means edge exists
matrix = [
    [0, 1, 1, 0],  # A
    [1, 0, 0, 1],  # B
    [1, 0, 0, 1],  # C
    [0, 1, 1, 0]   # D
]
\`\`\`

### Traversals

**DFS (Depth-First Search)**: Go deep before wide
\`\`\`python
def dfs(graph, node, visited=None):
    if visited is None:
        visited = set()
    visited.add(node)
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
    return visited
\`\`\`

**BFS (Breadth-First Search)**: Go wide before deep
\`\`\`python
from collections import deque

def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    while queue:
        node = queue.popleft()
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return visited
\`\`\`

### Common Algorithms

- **Shortest Path**: Dijkstra's, Bellman-Ford, BFS (unweighted)
- **Minimum Spanning Tree**: Prim's, Kruskal's
- **Topological Sort**: Order dependencies
- **Cycle Detection**: DFS with states

## Summary

Graphs model relationships and are fundamental to many algorithms. DFS and BFS are the building blocks for most graph algorithms. Choose the right representation (list vs matrix) based on graph density and operations needed.
`;

export const cs104Topics: Topic[] = [
  {
    id: 'cs104-topic-1',
    title: 'Arrays and Linked Lists',
    content: topic1Content,
    quizIds: ['cs104-quiz-1a', 'cs104-quiz-1b', 'cs104-quiz-1c'],
    exerciseIds: ['cs104-exercise-1', 'cs104-t1-ex02', 'cs104-t1-ex03', 'cs104-t1-ex04', 'cs104-t1-ex05', 'cs104-t1-ex06', 'cs104-t1-ex07', 'cs104-t1-ex08', 'cs104-t1-ex09', 'cs104-t1-ex10', 'cs104-t1-ex11', 'cs104-t1-ex12', 'cs104-t1-ex13', 'cs104-t1-ex14', 'cs104-t1-ex15', 'cs104-t1-ex16']
  },
  {
    id: 'cs104-topic-2',
    title: 'Stacks and Queues',
    content: topic2Content,
    quizIds: ['cs104-quiz-2a', 'cs104-quiz-2b', 'cs104-quiz-2c'],
    exerciseIds: ['cs104-exercise-2', 'cs104-t2-ex02', 'cs104-t2-ex03', 'cs104-t2-ex04', 'cs104-t2-ex05', 'cs104-t2-ex06', 'cs104-t2-ex07', 'cs104-t2-ex08', 'cs104-t2-ex09', 'cs104-t2-ex10', 'cs104-t2-ex11', 'cs104-t2-ex12', 'cs104-t2-ex13', 'cs104-t2-ex14', 'cs104-t2-ex15', 'cs104-t2-ex16']
  },
  {
    id: 'cs104-topic-3',
    title: 'Trees',
    content: topic3Content,
    quizIds: ['cs104-quiz-3a', 'cs104-quiz-3b', 'cs104-quiz-3c'],
    exerciseIds: ['cs104-exercise-3', 'cs104-t3-ex02', 'cs104-t3-ex03', 'cs104-t3-ex04', 'cs104-t3-ex05', 'cs104-t3-ex06', 'cs104-t3-ex07', 'cs104-t3-ex08', 'cs104-t3-ex09', 'cs104-t3-ex10', 'cs104-t3-ex11', 'cs104-t3-ex12', 'cs104-t3-ex13', 'cs104-t3-ex14', 'cs104-t3-ex15', 'cs104-t3-ex16']
  },
  {
    id: 'cs104-topic-4',
    title: 'Hash Tables',
    content: topic4Content,
    quizIds: ['cs104-quiz-4a', 'cs104-quiz-4b', 'cs104-quiz-4c'],
    exerciseIds: ['cs104-exercise-4', 'cs104-t4-ex02', 'cs104-t4-ex03', 'cs104-t4-ex04', 'cs104-t4-ex05', 'cs104-t4-ex06', 'cs104-t4-ex07', 'cs104-t4-ex08', 'cs104-t4-ex09', 'cs104-t4-ex10', 'cs104-t4-ex11', 'cs104-t4-ex12', 'cs104-t4-ex13', 'cs104-t4-ex14', 'cs104-t4-ex15', 'cs104-t4-ex16']
  },
  {
    id: 'cs104-topic-5',
    title: 'Graphs',
    content: topic5Content,
    quizIds: ['cs104-quiz-5a', 'cs104-quiz-5b', 'cs104-quiz-5c'],
    exerciseIds: ['cs104-exercise-5', 'cs104-t5-ex02', 'cs104-t5-ex03', 'cs104-t5-ex04', 'cs104-t5-ex05', 'cs104-t5-ex06', 'cs104-t5-ex07', 'cs104-t5-ex08', 'cs104-t5-ex09', 'cs104-t5-ex10', 'cs104-t5-ex11', 'cs104-t5-ex12', 'cs104-t5-ex13', 'cs104-t5-ex14', 'cs104-t5-ex15', 'cs104-t5-ex16']
  },
  {
    id: 'cs104-topic-6',
    title: 'Sorting Algorithms',
    content: '',
    quizIds: ['cs104-quiz-6a', 'cs104-quiz-6b', 'cs104-quiz-6c'],
    exerciseIds: ['cs104-t6-ex01', 'cs104-t6-ex02', 'cs104-t6-ex03', 'cs104-t6-ex04', 'cs104-t6-ex05', 'cs104-t6-ex06', 'cs104-t6-ex07', 'cs104-t6-ex08', 'cs104-t6-ex09', 'cs104-t6-ex10', 'cs104-t6-ex11', 'cs104-t6-ex12', 'cs104-t6-ex13', 'cs104-t6-ex14', 'cs104-t6-ex15', 'cs104-t6-ex16']
  },
  {
    id: 'cs104-topic-7',
    title: 'Heaps and Priority Queues',
    content: '',
    quizIds: ['cs104-quiz-7a', 'cs104-quiz-7b', 'cs104-quiz-7c'],
    exerciseIds: ['cs104-t7-ex01', 'cs104-t7-ex02', 'cs104-t7-ex03', 'cs104-t7-ex04', 'cs104-t7-ex05', 'cs104-t7-ex06', 'cs104-t7-ex07', 'cs104-t7-ex08', 'cs104-t7-ex09', 'cs104-t7-ex10', 'cs104-t7-ex11', 'cs104-t7-ex12', 'cs104-t7-ex13', 'cs104-t7-ex14', 'cs104-t7-ex15', 'cs104-t7-ex16']
  }
];
