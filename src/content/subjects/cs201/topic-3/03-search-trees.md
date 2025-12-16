# Search Trees

Binary search trees (BSTs) and their balanced variants provide efficient searching with dynamic insertions and deletions. Understanding tree-based search is fundamental to algorithm design.

## Binary Search Tree Properties

A BST maintains the **BST property**: For every node x:
- All keys in left subtree < x.key
- All keys in right subtree > x.key

```
        8
       / \
      3   10
     / \    \
    1   6   14
       / \
      4   7
```

This structure enables binary search: O(log n) operations on balanced trees.

## Basic Operations

### Search

```python
def search(root, key):
    if root is None or root.key == key:
        return root
    if key < root.key:
        return search(root.left, key)
    return search(root.right, key)
```

**Time**: O(h) where h = tree height

### Insertion

```python
def insert(root, key):
    if root is None:
        return TreeNode(key)
    if key < root.key:
        root.left = insert(root.left, key)
    elif key > root.key:
        root.right = insert(root.right, key)
    return root
```

**Time**: O(h)

### Deletion

Three cases:
1. **Leaf node**: Simply remove
2. **One child**: Replace with child
3. **Two children**: Replace with in-order successor (or predecessor)

```python
def delete(root, key):
    if root is None:
        return root

    if key < root.key:
        root.left = delete(root.left, key)
    elif key > root.key:
        root.right = delete(root.right, key)
    else:
        # Node to delete found
        if root.left is None:
            return root.right
        elif root.right is None:
            return root.left
        else:
            # Two children: get inorder successor
            successor = find_min(root.right)
            root.key = successor.key
            root.right = delete(root.right, successor.key)

    return root

def find_min(node):
    while node.left:
        node = node.left
    return node
```

**Time**: O(h)

## Tree Traversals

### In-Order (Sorted Output)

```python
def inorder(root):
    if root:
        inorder(root.left)
        print(root.key)
        inorder(root.right)
```

For BST, produces keys in sorted order.

### Finding Successor/Predecessor

```python
def successor(root, key):
    """Find smallest key larger than given key"""
    successor_node = None
    while root:
        if key < root.key:
            successor_node = root
            root = root.left
        else:
            root = root.right
    return successor_node
```

## BST Balance Problem

**Problem**: Random insertions give expected O(log n) height, but worst case (sorted insertions) gives O(n).

```
Insertions: 1, 2, 3, 4, 5

Result:
1
 \
  2
   \
    3
     \
      4
       \
        5

Height = n-1, all operations O(n)!
```

## AVL Trees

**Invariant**: For every node, heights of left and right subtrees differ by at most 1.

**Balance factor** = height(left) - height(right) ∈ {-1, 0, 1}

### Rotations

When balance is violated, restore with rotations:

**Right Rotation** (LL case):
```
    y                x
   / \              / \
  x   C    →       A   y
 / \                  / \
A   B                B   C
```

**Left Rotation** (RR case):
```
  x                  y
 / \                / \
A   y      →       x   C
   / \            / \
  B   C          A   B
```

**Left-Right** (LR case): Left rotate left child, then right rotate node

**Right-Left** (RL case): Right rotate right child, then left rotate node

### AVL Operations

All operations: O(log n) guaranteed

After insert/delete, walk up and rebalance if needed.

```python
def rebalance(node):
    balance = height(node.left) - height(node.right)

    if balance > 1:  # Left heavy
        if height(node.left.left) >= height(node.left.right):
            return right_rotate(node)  # LL
        else:
            node.left = left_rotate(node.left)  # LR
            return right_rotate(node)

    if balance < -1:  # Right heavy
        if height(node.right.right) >= height(node.right.left):
            return left_rotate(node)  # RR
        else:
            node.right = right_rotate(node.right)  # RL
            return left_rotate(node)

    return node
```

## Red-Black Trees

Less strictly balanced than AVL, but fewer rotations on average.

**Properties**:
1. Every node is red or black
2. Root is black
3. Leaves (NIL) are black
4. Red node's children are black
5. All paths from node to descendant NILs have same black count

**Height bound**: At most 2 log(n+1), so O(log n) operations.

**Used in**: Java TreeMap, C++ std::map, Linux kernel

## Comparison

| Tree | Height Bound | Insert | Search | Delete |
|------|--------------|--------|--------|--------|
| BST | O(n) worst | O(h) | O(h) | O(h) |
| AVL | O(log n) | O(log n) | O(log n) | O(log n) |
| Red-Black | O(log n) | O(log n) | O(log n) | O(log n) |

**AVL vs Red-Black**:
- AVL: Faster lookups (more balanced), slower insertions
- Red-Black: Faster insertions, slightly slower lookups

## Applications

### Sorted Data Maintenance

Keep data sorted while supporting efficient updates.

### Range Queries

Find all keys in [low, high]:
```python
def range_query(root, low, high):
    result = []
    def traverse(node):
        if node is None:
            return
        if low < node.key:
            traverse(node.left)
        if low <= node.key <= high:
            result.append(node.key)
        if node.key < high:
            traverse(node.right)
    traverse(root)
    return result
```

**Time**: O(log n + k) where k = output size

### Order Statistics

With augmentation (storing subtree sizes), find kth smallest in O(log n):

```python
def select(root, k):
    """Find kth smallest (1-indexed)"""
    if root is None:
        return None
    left_size = size(root.left)
    if k <= left_size:
        return select(root.left, k)
    elif k == left_size + 1:
        return root.key
    else:
        return select(root.right, k - left_size - 1)
```

### Interval Trees

Augmented BST for storing intervals and querying overlaps.

Store: intervals [low, high]
Augment: max endpoint in subtree

Find overlapping interval in O(log n).
