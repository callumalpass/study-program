---
id: cs104-t3-problems
title: "Tree Problems"
order: 7
---

# Common Tree Problems and Patterns

Tree problems are favorites in coding interviews and competitive programming. This section covers essential patterns and techniques for solving tree problems effectively.

## Pattern 1: Tree Traversal Problems

Many problems reduce to visiting nodes in a specific order.

### Level Order Traversal (BFS)

```python
from collections import deque

def level_order(root):
    """Return nodes level by level."""
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        level_size = len(queue)
        level = []

        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.value)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(level)

    return result
```

### Zigzag Level Order

```python
def zigzag_level_order(root):
    """Alternate left-to-right and right-to-left."""
    if not root:
        return []

    result = []
    queue = deque([root])
    left_to_right = True

    while queue:
        level = deque()
        for _ in range(len(queue)):
            node = queue.popleft()
            if left_to_right:
                level.append(node.value)
            else:
                level.appendleft(node.value)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(list(level))
        left_to_right = not left_to_right

    return result
```

## Pattern 2: Tree Properties

Calculate properties like height, diameter, or balance.

### Tree Height

```python
def height(root):
    """Height = longest path from root to leaf."""
    if not root:
        return 0
    return 1 + max(height(root.left), height(root.right))
```

### Tree Diameter

The diameter is the longest path between any two nodes (may not pass through root).

```python
def diameter(root):
    """Return diameter of tree."""
    max_diameter = [0]

    def height(node):
        if not node:
            return 0

        left_h = height(node.left)
        right_h = height(node.right)

        # Update diameter if path through this node is longest
        max_diameter[0] = max(max_diameter[0], left_h + right_h)

        return 1 + max(left_h, right_h)

    height(root)
    return max_diameter[0]
```

### Check if Balanced

```python
def is_balanced(root):
    """Check if tree is height-balanced."""
    def check(node):
        if not node:
            return 0

        left_h = check(node.left)
        right_h = check(node.right)

        if left_h == -1 or right_h == -1:
            return -1  # Subtree is unbalanced

        if abs(left_h - right_h) > 1:
            return -1  # This node is unbalanced

        return 1 + max(left_h, right_h)

    return check(root) != -1
```

## Pattern 3: Path Problems

Find or check paths in trees.

### Root-to-Leaf Path Sum

```python
def has_path_sum(root, target_sum):
    """Check if any root-to-leaf path sums to target."""
    if not root:
        return False

    if not root.left and not root.right:
        return root.value == target_sum

    remaining = target_sum - root.value
    return (has_path_sum(root.left, remaining) or
            has_path_sum(root.right, remaining))
```

### All Paths with Sum

```python
def path_sum_paths(root, target_sum):
    """Return all root-to-leaf paths that sum to target."""
    def dfs(node, remaining, path, paths):
        if not node:
            return

        path.append(node.value)

        if not node.left and not node.right and remaining == node.value:
            paths.append(list(path))
        else:
            dfs(node.left, remaining - node.value, path, paths)
            dfs(node.right, remaining - node.value, path, paths)

        path.pop()  # Backtrack

    paths = []
    dfs(root, target_sum, [], paths)
    return paths
```

### Maximum Path Sum (Any-to-Any)

```python
def max_path_sum(root):
    """Maximum sum path between any two nodes."""
    max_sum = [float('-inf')]

    def max_gain(node):
        if not node:
            return 0

        # Max gain from left and right (ignore negative paths)
        left = max(0, max_gain(node.left))
        right = max(0, max_gain(node.right))

        # Path through this node
        path_sum = node.value + left + right
        max_sum[0] = max(max_sum[0], path_sum)

        # Return max gain if path continues through parent
        return node.value + max(left, right)

    max_gain(root)
    return max_sum[0]
```

## Pattern 4: Tree Construction

Build trees from various inputs.

### From Inorder + Preorder

```python
def build_tree(preorder, inorder):
    """Build tree from preorder and inorder traversals."""
    if not inorder:
        return None

    root_val = preorder.pop(0)
    root = TreeNode(root_val)

    mid = inorder.index(root_val)

    root.left = build_tree(preorder, inorder[:mid])
    root.right = build_tree(preorder, inorder[mid + 1:])

    return root
```

### Serialize and Deserialize

```python
def serialize(root):
    """Convert tree to string."""
    if not root:
        return "null"
    return f"{root.value},{serialize(root.left)},{serialize(root.right)}"

def deserialize(data):
    """Reconstruct tree from string."""
    def build(nodes):
        val = next(nodes)
        if val == "null":
            return None
        node = TreeNode(int(val))
        node.left = build(nodes)
        node.right = build(nodes)
        return node

    return build(iter(data.split(",")))
```

## Pattern 5: Tree Comparison

Compare trees or subtrees.

### Same Tree

```python
def is_same_tree(p, q):
    """Check if two trees are identical."""
    if not p and not q:
        return True
    if not p or not q:
        return False
    return (p.value == q.value and
            is_same_tree(p.left, q.left) and
            is_same_tree(p.right, q.right))
```

### Symmetric Tree

```python
def is_symmetric(root):
    """Check if tree is mirror symmetric."""
    def is_mirror(t1, t2):
        if not t1 and not t2:
            return True
        if not t1 or not t2:
            return False
        return (t1.value == t2.value and
                is_mirror(t1.left, t2.right) and
                is_mirror(t1.right, t2.left))

    return is_mirror(root, root)
```

### Subtree Check

```python
def is_subtree(root, sub_root):
    """Check if sub_root is a subtree of root."""
    if not root:
        return False
    if is_same_tree(root, sub_root):
        return True
    return is_subtree(root.left, sub_root) or is_subtree(root.right, sub_root)
```

## Pattern 6: Tree Modification

Modify tree structure.

### Invert Binary Tree

```python
def invert_tree(root):
    """Mirror/flip a binary tree."""
    if not root:
        return None

    root.left, root.right = root.right, root.left
    invert_tree(root.left)
    invert_tree(root.right)

    return root
```

### Flatten to Linked List

```python
def flatten(root):
    """Flatten tree to right-skewed linked list (preorder)."""
    if not root:
        return

    flatten(root.left)
    flatten(root.right)

    # Save right subtree
    right = root.right

    # Move left subtree to right
    root.right = root.left
    root.left = None

    # Find end of new right subtree and attach old right
    current = root
    while current.right:
        current = current.right
    current.right = right
```

## Problem-Solving Tips

1. **Draw the tree** - Visualize before coding
2. **Identify traversal type** - Preorder for top-down, postorder for bottom-up
3. **Consider edge cases** - Empty tree, single node, skewed tree
4. **Use helper functions** - Pass extra parameters for state
5. **Return multiple values** - Use tuples or lists for complex returns
6. **Think recursively** - Most tree problems have elegant recursive solutions

## Summary

Tree problems typically involve traversal, property calculation, path finding, construction, comparison, or modification. Master the patterns in this section to handle most tree problems confidently. Practice recognizing which pattern applies and adapting it to specific requirements.
