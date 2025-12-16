# Advanced BST Operations

Beyond basic search, insert, and delete, Binary Search Trees support many useful operations that leverage the ordering property. Mastering these operations builds the foundation for understanding more complex tree-based algorithms.

## Finding Minimum and Maximum

The minimum value in a BST is always in the leftmost node (keep going left until you can't). The maximum is in the rightmost node.

```python
def find_min(root):
    """Find the minimum value in a BST."""
    if root is None:
        return None
    current = root
    while current.left is not None:
        current = current.left
    return current.value

def find_max(root):
    """Find the maximum value in a BST."""
    if root is None:
        return None
    current = root
    while current.right is not None:
        current = current.right
    return current.value
```

**Time Complexity**: O(h) where h is the height

## Finding Predecessor and Successor

The **in-order predecessor** of a node is the node with the largest value smaller than it. The **in-order successor** is the node with the smallest value larger than it.

```python
def find_successor(root, target):
    """Find the in-order successor of a value in a BST."""
    successor = None
    current = root

    while current is not None:
        if target < current.value:
            successor = current  # This could be the successor
            current = current.left
        elif target > current.value:
            current = current.right
        else:
            # Found the target node
            if current.right is not None:
                # Successor is minimum in right subtree
                return find_min_node(current.right).value
            break

    return successor.value if successor else None

def find_predecessor(root, target):
    """Find the in-order predecessor of a value in a BST."""
    predecessor = None
    current = root

    while current is not None:
        if target > current.value:
            predecessor = current
            current = current.right
        elif target < current.value:
            current = current.left
        else:
            if current.left is not None:
                return find_max_node(current.left).value
            break

    return predecessor.value if predecessor else None
```

## Finding the Kth Smallest Element

Using in-order traversal, we can find the kth smallest element efficiently:

```python
def kth_smallest(root, k):
    """Find the kth smallest element (1-indexed)."""
    stack = []
    current = root
    count = 0

    while stack or current:
        # Go to the leftmost node
        while current:
            stack.append(current)
            current = current.left

        current = stack.pop()
        count += 1

        if count == k:
            return current.value

        current = current.right

    return None  # k is larger than tree size
```

**Optimization**: If we need frequent kth element queries, we can augment each node to store the size of its subtree.

```python
class AugmentedBSTNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None
        self.left_size = 0  # Number of nodes in left subtree

def kth_smallest_augmented(root, k):
    """O(h) kth smallest using augmented nodes."""
    current = root
    while current:
        left_size = current.left_size
        if k == left_size + 1:
            return current.value
        elif k <= left_size:
            current = current.left
        else:
            k = k - left_size - 1
            current = current.right
    return None
```

## Lowest Common Ancestor (LCA)

The lowest common ancestor of two nodes is the deepest node that has both nodes as descendants. In a BST, we can find this efficiently:

```python
def lowest_common_ancestor(root, p, q):
    """Find LCA of two values in a BST."""
    current = root

    while current:
        if p < current.value and q < current.value:
            # Both values are in left subtree
            current = current.left
        elif p > current.value and q > current.value:
            # Both values are in right subtree
            current = current.right
        else:
            # Split point - this is the LCA
            return current.value

    return None
```

**Time Complexity**: O(h)

## Range Queries

Find all values in a BST within a given range [low, high]:

```python
def range_query(root, low, high):
    """Find all values in range [low, high]."""
    result = []

    def traverse(node):
        if node is None:
            return

        # Only go left if there might be values >= low
        if node.value > low:
            traverse(node.left)

        # Add current node if in range
        if low <= node.value <= high:
            result.append(node.value)

        # Only go right if there might be values <= high
        if node.value < high:
            traverse(node.right)

    traverse(root)
    return result
```

This is more efficient than traversing the entire tree because we prune branches that can't contain values in the range.

## Floor and Ceiling

**Floor**: Largest value less than or equal to target.
**Ceiling**: Smallest value greater than or equal to target.

```python
def floor(root, target):
    """Find the largest value <= target."""
    result = None
    current = root

    while current:
        if current.value == target:
            return target
        elif current.value < target:
            result = current.value  # Potential floor
            current = current.right
        else:
            current = current.left

    return result

def ceiling(root, target):
    """Find the smallest value >= target."""
    result = None
    current = root

    while current:
        if current.value == target:
            return target
        elif current.value > target:
            result = current.value  # Potential ceiling
            current = current.left
        else:
            current = current.right

    return result
```

## Counting Nodes in a Range

Count how many nodes have values in [low, high]:

```python
def count_in_range(root, low, high):
    """Count nodes with values in [low, high]."""
    if root is None:
        return 0

    # Current node is in range
    if low <= root.value <= high:
        return (1 +
                count_in_range(root.left, low, high) +
                count_in_range(root.right, low, high))

    # Current node is below range - only check right
    if root.value < low:
        return count_in_range(root.right, low, high)

    # Current node is above range - only check left
    return count_in_range(root.left, low, high)
```

## Rank and Select

**Rank**: How many elements are smaller than a given value?
**Select**: What is the element at a given rank?

```python
def rank(root, target):
    """Count elements smaller than target."""
    if root is None:
        return 0

    if target <= root.value:
        return rank(root.left, target)
    else:
        left_count = count_nodes(root.left)
        return 1 + left_count + rank(root.right, target)

def count_nodes(root):
    """Count total nodes in tree."""
    if root is None:
        return 0
    return 1 + count_nodes(root.left) + count_nodes(root.right)
```

## Two Sum in BST

Check if there exist two nodes whose values sum to a target:

```python
def two_sum_bst(root, target):
    """Check if two nodes sum to target using in-order traversal."""
    values = []

    def inorder(node):
        if node:
            inorder(node.left)
            values.append(node.value)
            inorder(node.right)

    inorder(root)

    # Two-pointer approach on sorted array
    left, right = 0, len(values) - 1
    while left < right:
        current_sum = values[left] + values[right]
        if current_sum == target:
            return True
        elif current_sum < target:
            left += 1
        else:
            right -= 1

    return False
```

## Summary

BSTs support many powerful operations beyond basic CRUD. Key operations include finding min/max, predecessor/successor, kth element, LCA, range queries, floor/ceiling, and rank/select. Many of these run in O(h) time. For guaranteed O(log n) performance, consider self-balancing trees like AVL or Red-Black trees.
