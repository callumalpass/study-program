---
id: cs104-t3-fundamentals
title: "Tree Fundamentals"
order: 1
---

# Tree Fundamentals

Trees are hierarchical data structures consisting of nodes connected by edges. Unlike linear structures, trees model parent-child relationships and are fundamental to organizing hierarchical data efficiently.

## Tree Terminology

Understanding tree vocabulary is essential:

```
            A           ← Root (no parent)
          / | \
         B  C  D        ← Children of A
        /|\    |
       E F G   H        ← Leaves (no children)
```

- **Root**: The topmost node with no parent
- **Parent/Child**: Direct ancestor/descendant relationship
- **Siblings**: Nodes sharing the same parent
- **Leaf**: Node with no children
- **Internal node**: Node with at least one child
- **Edge**: Connection between parent and child
- **Path**: Sequence of nodes connected by edges
- **Ancestor/Descendant**: Indirect parent/child relationship

## Tree Metrics

- **Depth of a node**: Distance (edges) from root to that node
- **Height of a node**: Longest path from that node to a leaf
- **Height of tree**: Height of the root node
- **Degree of a node**: Number of children
- **Degree of tree**: Maximum degree among all nodes

```
        A  (depth=0, height=2)
       / \
      B   C  (depth=1)
     /|   |
    D E   F  (depth=2, height=0, leaves)

Tree height = 2
```

## Tree Properties

1. **N nodes have N-1 edges**: Each node except root has exactly one incoming edge
2. **Connected**: There's exactly one path between any two nodes
3. **Acyclic**: No cycles exist

## Types of Trees

### General Trees
Any node can have any number of children:

```python
class TreeNode:
    def __init__(self, data):
        self.data = data
        self.children = []  # List of child nodes
```

### Binary Trees
Each node has at most two children (left and right):

```python
class BinaryTreeNode:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None
```

### Special Binary Trees

**Full Binary Tree**: Every node has 0 or 2 children
```
      A
     / \
    B   C
   / \
  D   E
```

**Complete Binary Tree**: All levels filled except possibly the last, which is filled left to right
```
      A
     / \
    B   C
   / \
  D   E
```

**Perfect Binary Tree**: All internal nodes have 2 children, all leaves at same level
```
       A
     /   \
    B     C
   / \   / \
  D   E F   G
```

**Balanced Binary Tree**: Height difference between left and right subtrees ≤ 1 for all nodes

## Tree Representations

### Node-Based (Linked)
```python
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

# Creating a tree
root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.left.left = TreeNode(4)
```

### Array-Based (for complete binary trees)
For node at index i:
- Left child: 2*i + 1
- Right child: 2*i + 2
- Parent: (i - 1) // 2

```python
# Tree stored as array: [1, 2, 3, 4, 5, 6, 7]
#         1
#        / \
#       2   3
#      / \ / \
#     4  5 6  7

def parent(i):
    return (i - 1) // 2

def left_child(i):
    return 2 * i + 1

def right_child(i):
    return 2 * i + 2
```

## Common Tree Operations

### Calculate Height
```python
def height(node):
    if not node:
        return -1  # or 0, depending on convention
    return 1 + max(height(node.left), height(node.right))
```

### Count Nodes
```python
def count_nodes(node):
    if not node:
        return 0
    return 1 + count_nodes(node.left) + count_nodes(node.right)
```

### Check if Balanced
```python
def is_balanced(node):
    def check(node):
        if not node:
            return 0
        left_height = check(node.left)
        right_height = check(node.right)
        if left_height == -1 or right_height == -1:
            return -1
        if abs(left_height - right_height) > 1:
            return -1
        return 1 + max(left_height, right_height)

    return check(node) != -1
```

## Real-World Tree Applications

1. **File systems**: Directory structure
2. **HTML/XML DOM**: Document structure
3. **Organization charts**: Company hierarchy
4. **Decision trees**: Machine learning
5. **Expression trees**: Compiler design
6. **Huffman trees**: Data compression
7. **Game trees**: AI for games (chess, tic-tac-toe)

## Why Trees Matter

Trees provide efficient operations that linear structures cannot:
- **Hierarchical data**: Natural representation
- **Searching**: O(log n) in balanced trees
- **Sorting**: In-order traversal of BST gives sorted output
- **Range queries**: Efficiently find values in a range
- **Prefix matching**: Tries for autocomplete

## Tree vs Linear Structure Comparison

| Aspect | Array/List | Tree (Balanced) |
|--------|------------|-----------------|
| Search | O(n) or O(log n) if sorted | O(log n) |
| Insert (maintain order) | O(n) | O(log n) |
| Delete | O(n) | O(log n) |
| Find min/max | O(n) or O(1) at ends | O(log n) or O(1) |
| Memory | Contiguous | Non-contiguous (pointers) |
| Cache performance | Excellent | Poor |

## Common Mistakes with Trees

1. **Confusing height and depth**: Height is measured from the bottom (leaves), depth from the top (root)
2. **Off-by-one in height calculation**: Clarify whether a single node has height 0 or 1
3. **Forgetting base case**: Always check for `None` before accessing children
4. **Not handling empty tree**: An empty tree (root = None) is valid
5. **Assuming balance**: General trees aren't balanced; only specific types guarantee balance

## Recursion and Trees

Trees and recursion are natural partners. Most tree operations follow this pattern:

```python
def tree_operation(node):
    if not node:
        return base_case

    # Process current node (preorder)

    left_result = tree_operation(node.left)
    right_result = tree_operation(node.right)

    # Combine results (postorder)
    return combine(left_result, right_result)
```

This recursive structure mirrors the tree's hierarchical nature.

## Key Takeaways

- Trees are hierarchical structures with parent-child relationships
- Binary trees restrict each node to at most two children
- Complete binary trees enable efficient array representation
- Tree height determines operation complexity: balanced trees give O(log n)
- Understanding terminology (root, leaf, depth, height) is essential
- Trees power file systems, databases, compilers, and AI algorithms
- Most tree algorithms are naturally recursive
