---
id: cs201-t3-trees
title: "Search Trees"
order: 3
---

# Search Trees

Binary search trees (BSTs) and their balanced variants provide efficient searching combined with dynamic insertions and deletions—a combination that static arrays cannot achieve. While a sorted array supports O(log n) search via binary search, inserting or deleting elements requires O(n) time to shift elements. BSTs overcome this limitation by using a linked structure that supports O(log n) search, insert, and delete when properly balanced.

The elegance of tree-based search lies in its recursive structure: each node partitions the key space into smaller and larger elements, enabling the same divide-and-conquer strategy as binary search but with dynamic updates. This makes BSTs and their balanced variants the foundation of ordered dictionaries, databases, file systems, and countless other applications requiring efficient key-based access with modifications.

Understanding tree balance is crucial because unbalanced trees degrade to linear time. The difference between O(log n) and O(n) operations becomes dramatic at scale: searching 1 million elements takes at most 20 comparisons in a balanced tree but might require 1 million comparisons in a degenerate tree. Self-balancing variants like AVL trees and Red-Black trees guarantee logarithmic performance regardless of insertion order.

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

This ordering invariant makes search efficient: at each node, we can eliminate half the remaining candidates by going left or right based on comparison with the current key. The property also ensures that an in-order traversal (left, root, right) visits keys in sorted order—a useful property for range queries and ordered iteration.

## Basic Operations

The fundamental BST operations—search, insert, and delete—all follow the same pattern: navigate down from the root using comparisons to find the appropriate location. The time complexity of each operation is O(h) where h is the tree height. For a balanced tree, h = O(log n), but for a skewed tree, h can be as large as n.

### Search

Search navigates from root to target, going left for smaller keys and right for larger ones. The recursion mirrors binary search on arrays but follows pointers rather than computing indices.

```python
def search(root, key):
    if root is None or root.key == key:
        return root
    if key < root.key:
        return search(root.left, key)
    return search(root.right, key)
```

**Time**: O(h) where h = tree height

The iterative version avoids recursion overhead and is often preferred in practice, especially for deep trees where stack overflow is a concern.

### Insertion

Insertion finds the appropriate leaf position and creates a new node. We navigate as if searching for the key, then attach the new node where the search would have failed.

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

The functional style shown here returns a new root reference, which handles the case of inserting into an empty tree elegantly. In languages with mutable references, an imperative approach that modifies pointers directly may be more efficient.

### Deletion

Deletion is the most complex basic operation because removing a node requires maintaining the BST property while preserving the tree structure. Three cases arise based on the number of children:

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

The two-children case uses the in-order successor—the smallest element larger than the deleted key—because it maintains the BST property: all elements in the left subtree remain smaller, and all in the right subtree remain larger. The predecessor (largest element smaller than the deleted key) works equally well.

## Tree Traversals

Tree traversals visit every node exactly once, producing different orderings useful for different purposes. The three classic depth-first traversals differ only in when they process the current node relative to its subtrees.

### In-Order (Sorted Output)

In-order traversal processes nodes in left-root-right order. For BSTs, this visits keys in ascending sorted order—a property that makes BSTs natural for implementing sorted collections.

```python
def inorder(root):
    if root:
        inorder(root.left)
        print(root.key)
        inorder(root.right)
```

For BST, produces keys in sorted order. This property is fundamental: converting a BST to a sorted array takes O(n) time via in-order traversal, and we can verify the BST property by checking that in-order output is strictly increasing.

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

The Achilles' heel of basic BSTs is their vulnerability to pathological insertion orders. The tree's shape—and therefore performance—depends entirely on the sequence of insertions, which is often outside the programmer's control.

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

This degenerate case is not merely theoretical. Inserting already-sorted data—common when loading from a file or database—produces the worst possible tree. Inserting reverse-sorted data is equally bad. Even partially sorted data can produce poorly balanced trees.

The mathematical analysis shows that random insertions produce trees with expected height O(log n), but the variance is high. In security-sensitive applications, an attacker who controls insertion order could deliberately degrade performance, making self-balancing trees essential.

## AVL Trees

AVL trees (named after inventors Adelson-Velsky and Landis, 1962) were the first self-balancing BST. They maintain strict balance through rotation operations, guaranteeing O(log n) height and therefore O(log n) operations.

**Invariant**: For every node, heights of left and right subtrees differ by at most 1.

**Balance factor** = height(left) - height(right) ∈ {-1, 0, 1}

### Rotations

Rotations are local restructuring operations that preserve the BST property while changing the tree's shape. They are the mechanism by which balanced trees restore balance after insertions or deletions. A rotation takes O(1) time because it only redirects a constant number of pointers.

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

Red-Black trees take a different approach to balance: instead of strict height balance, they enforce a coloring invariant that limits how unbalanced the tree can become. This relaxed balance means Red-Black trees perform fewer rotations on average, making insertions and deletions faster in practice.

Less strictly balanced than AVL, but fewer rotations on average.

**Properties**:
1. Every node is red or black
2. Root is black
3. Leaves (NIL) are black
4. Red node's children are black (no consecutive red nodes on any path)
5. All paths from node to descendant NILs have same black count (black-height)

These properties together guarantee that the longest path (alternating red-black) is at most twice as long as the shortest path (all black), bounding the height.

**Height bound**: At most 2 log(n+1), so O(log n) operations.

**Used in**: Java TreeMap, C++ std::map, Linux kernel completely fair scheduler

The widespread adoption of Red-Black trees in production systems reflects their practical efficiency. While AVL trees provide faster lookups due to stricter balance, Red-Black trees' faster insertions make them preferred when modifications are frequent.

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

BSTs and their balanced variants power numerous applications where ordered data with dynamic updates is required.

### Sorted Data Maintenance

Maintaining a dynamically changing sorted collection is the primary use case for BSTs. Unlike sorted arrays that require O(n) time for insertions, balanced BSTs support O(log n) insert, delete, and search. This makes them ideal for leaderboards, priority queues with update operations, and any application requiring both sorted access and frequent modifications.

### Range Queries

Range queries efficiently find all keys within an interval—a fundamental database operation. The BST structure allows us to prune entire subtrees that fall outside the range, achieving O(log n + k) time where k is the number of results.

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

Augmenting BST nodes with additional information enables new operations without changing the basic structure. The most common augmentation stores subtree sizes, enabling order-statistic queries: finding the kth smallest element or determining the rank of a given element.

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

Interval trees extend the augmentation idea to manage collections of intervals, supporting efficient overlap queries. Each node stores an interval [low, high], ordered by low endpoint, and is augmented with the maximum high endpoint in its subtree.

Augmented BST for storing intervals and querying overlaps.

Store: intervals [low, high]
Augment: max endpoint in subtree

Find overlapping interval in O(log n).

The augmented maximum allows efficient pruning: if a subtree's maximum endpoint is less than the query interval's start, no interval in that subtree can overlap the query. This enables O(log n) queries for finding any overlapping interval, or O(log n + k) for finding all k overlapping intervals.

Interval trees are essential for computational geometry, calendar applications, and any domain involving time ranges or spatial extents. Related structures include segment trees for range queries and k-d trees for multi-dimensional data.

Search trees represent a fundamental trade-off in data structure design: we accept the complexity of maintaining balance in exchange for guaranteed efficient operations on dynamic ordered data. Understanding when to use BSTs versus hash tables versus sorted arrays is a key skill in algorithm design—BSTs are the right choice when order matters and data changes.
