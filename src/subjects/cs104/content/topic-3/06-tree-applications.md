# Tree Applications

Trees are ubiquitous in computer science, appearing in file systems, databases, compilers, and many algorithms. Understanding practical applications helps you recognize when to use tree structures and how to apply them effectively.

## Expression Trees

Compilers use expression trees to represent and evaluate mathematical expressions. Each internal node is an operator, and leaves are operands.

```
Expression: (3 + 4) * 5

       *
      / \
     +   5
    / \
   3   4
```

```python
class ExprNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def evaluate(node):
    """Evaluate an expression tree."""
    if node.left is None and node.right is None:
        return float(node.value)  # Leaf - operand

    left_val = evaluate(node.left)
    right_val = evaluate(node.right)

    if node.value == '+':
        return left_val + right_val
    elif node.value == '-':
        return left_val - right_val
    elif node.value == '*':
        return left_val * right_val
    elif node.value == '/':
        return left_val / right_val
```

**Building from postfix notation:**

```python
def build_expression_tree(postfix):
    """Build expression tree from postfix expression."""
    stack = []
    operators = {'+', '-', '*', '/'}

    for token in postfix:
        node = ExprNode(token)
        if token in operators:
            node.right = stack.pop()
            node.left = stack.pop()
        stack.append(node)

    return stack[0]
```

## Trie (Prefix Tree)

Tries are specialized trees for storing strings, enabling efficient prefix-based operations.

```
Words: ["cat", "car", "card", "care", "dog"]

          root
         /    \
        c      d
        |      |
        a      o
       / \     |
      t   r    g
         /|\
        d e [card, care end here]
```

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True

    def search(self, word):
        node = self._find_node(word)
        return node is not None and node.is_end_of_word

    def starts_with(self, prefix):
        return self._find_node(prefix) is not None

    def _find_node(self, s):
        node = self.root
        for char in s:
            if char not in node.children:
                return None
            node = node.children[char]
        return node
```

**Applications:**
- Autocomplete systems
- Spell checkers
- IP routing tables
- Dictionary implementations

## Segment Trees

Segment trees enable efficient range queries and updates on arrays.

```python
class SegmentTree:
    """Segment tree for range sum queries."""

    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)
        self._build(arr, 0, 0, self.n - 1)

    def _build(self, arr, node, start, end):
        if start == end:
            self.tree[node] = arr[start]
        else:
            mid = (start + end) // 2
            self._build(arr, 2*node+1, start, mid)
            self._build(arr, 2*node+2, mid+1, end)
            self.tree[node] = self.tree[2*node+1] + self.tree[2*node+2]

    def query(self, left, right):
        """Query sum in range [left, right]."""
        return self._query(0, 0, self.n-1, left, right)

    def _query(self, node, start, end, left, right):
        if right < start or left > end:
            return 0  # Out of range
        if left <= start and end <= right:
            return self.tree[node]  # Completely in range

        mid = (start + end) // 2
        left_sum = self._query(2*node+1, start, mid, left, right)
        right_sum = self._query(2*node+2, mid+1, end, left, right)
        return left_sum + right_sum
```

**Time Complexity:**
- Build: O(n)
- Query: O(log n)
- Update: O(log n)

## File System Trees

File systems are natural tree structures where directories are internal nodes and files are leaves.

```python
class FileSystemNode:
    def __init__(self, name, is_directory=False):
        self.name = name
        self.is_directory = is_directory
        self.children = {}  # name -> FileSystemNode
        self.content = ""   # For files

    def add_child(self, name, is_directory=False):
        self.children[name] = FileSystemNode(name, is_directory)
        return self.children[name]

class FileSystem:
    def __init__(self):
        self.root = FileSystemNode("/", is_directory=True)

    def mkdir(self, path):
        parts = path.strip("/").split("/")
        node = self.root
        for part in parts:
            if part not in node.children:
                node.add_child(part, is_directory=True)
            node = node.children[part]

    def ls(self, path):
        node = self._navigate(path)
        if node.is_directory:
            return sorted(node.children.keys())
        return [node.name]

    def _navigate(self, path):
        parts = path.strip("/").split("/")
        node = self.root
        for part in parts:
            if part:
                node = node.children[part]
        return node
```

## Binary Indexed Tree (Fenwick Tree)

A simpler alternative to segment trees for prefix sums:

```python
class BinaryIndexedTree:
    def __init__(self, n):
        self.n = n
        self.tree = [0] * (n + 1)

    def update(self, i, delta):
        """Add delta to index i."""
        i += 1  # 1-indexed internally
        while i <= self.n:
            self.tree[i] += delta
            i += i & (-i)  # Add lowest set bit

    def prefix_sum(self, i):
        """Sum of elements [0, i]."""
        i += 1
        total = 0
        while i > 0:
            total += self.tree[i]
            i -= i & (-i)  # Remove lowest set bit
        return total

    def range_sum(self, left, right):
        """Sum of elements [left, right]."""
        return self.prefix_sum(right) - (self.prefix_sum(left - 1) if left > 0 else 0)
```

## Decision Trees

Used in machine learning for classification and regression:

```python
class DecisionNode:
    def __init__(self, feature=None, threshold=None, left=None, right=None, value=None):
        self.feature = feature      # Feature to split on
        self.threshold = threshold  # Split threshold
        self.left = left           # Left child (≤ threshold)
        self.right = right         # Right child (> threshold)
        self.value = value         # Prediction (for leaf nodes)

def predict(node, sample):
    """Make prediction for a single sample."""
    if node.value is not None:
        return node.value  # Leaf node

    if sample[node.feature] <= node.threshold:
        return predict(node.left, sample)
    else:
        return predict(node.right, sample)
```

## Huffman Trees

Used in data compression to create optimal prefix codes:

```python
import heapq

class HuffmanNode:
    def __init__(self, char, freq):
        self.char = char
        self.freq = freq
        self.left = None
        self.right = None

    def __lt__(self, other):
        return self.freq < other.freq

def build_huffman_tree(char_freq):
    """Build Huffman tree from character frequencies."""
    heap = [HuffmanNode(char, freq) for char, freq in char_freq.items()]
    heapq.heapify(heap)

    while len(heap) > 1:
        left = heapq.heappop(heap)
        right = heapq.heappop(heap)

        parent = HuffmanNode(None, left.freq + right.freq)
        parent.left = left
        parent.right = right

        heapq.heappush(heap, parent)

    return heap[0]
```

## Summary

Trees power many systems: expression trees in compilers, tries in search engines, segment trees for range queries, file system hierarchies, and Huffman trees for compression. Recognizing these patterns helps you design efficient solutions and understand existing systems.
