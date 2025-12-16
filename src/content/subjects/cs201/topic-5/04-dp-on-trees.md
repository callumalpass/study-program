# Dynamic Programming on Trees

Tree structures enable natural DP solutions where subproblems correspond to subtrees. These techniques are essential for graph algorithms and hierarchical data processing.

## Tree DP Fundamentals

### Key Insight

A tree with root r naturally decomposes into subtrees. Solutions for subtrees combine to solve the whole tree.

### Standard Pattern

```python
def tree_dp(node):
    if node is None:
        return base_case

    # Solve for all children first
    child_results = [tree_dp(child) for child in node.children]

    # Combine children's results
    return combine(node, child_results)
```

### Direction of DP

**Root-to-leaf** (push down): When result depends on ancestors
**Leaf-to-root** (push up): When result depends on descendants
**Both directions**: Rerooting technique

## Maximum Independent Set on Trees

**Problem**: Find largest set of nodes with no two adjacent.

**State**: dp[v] = max independent set size in subtree rooted at v

**Choices**: Include v or not

```python
def max_independent_set(root):
    # dp[v][0] = max size when v is NOT included
    # dp[v][1] = max size when v IS included

    def dfs(node):
        if node is None:
            return (0, 0)

        include = 1  # Include current node
        exclude = 0  # Exclude current node

        for child in node.children:
            child_ex, child_in = dfs(child)

            # If we include node, must exclude children
            include += child_ex

            # If we exclude node, children can be included or not
            exclude += max(child_ex, child_in)

        return (exclude, include)

    ex, inc = dfs(root)
    return max(ex, inc)
```

**Time**: O(n)

## Tree Diameter

**Problem**: Find longest path between any two nodes.

### Approach 1: Two DFS

```python
def diameter_two_dfs(root):
    # First DFS: find farthest node from any node
    farthest, _ = dfs_farthest(root, None)

    # Second DFS: find farthest from that node
    _, diameter = dfs_farthest(farthest, None)

    return diameter

def dfs_farthest(node, parent):
    farthest_node = node
    max_dist = 0

    for child, weight in node.neighbors:
        if child != parent:
            far, dist = dfs_farthest(child, node)
            if dist + weight > max_dist:
                max_dist = dist + weight
                farthest_node = far

    return farthest_node, max_dist
```

### Approach 2: Single DFS

```python
def diameter_single_dfs(root):
    diameter = 0

    def dfs(node, parent):
        nonlocal diameter
        max1 = max2 = 0  # Two longest paths down

        for child, weight in node.neighbors:
            if child != parent:
                child_depth = dfs(child, node) + weight

                if child_depth > max1:
                    max2 = max1
                    max1 = child_depth
                elif child_depth > max2:
                    max2 = child_depth

        # Diameter through this node
        diameter = max(diameter, max1 + max2)

        return max1  # Return longest path down

    dfs(root, None)
    return diameter
```

**Time**: O(n)

## Subtree Queries

### Subtree Sum

```python
def compute_subtree_sums(root):
    subtree_sum = {}

    def dfs(node, parent):
        total = node.value
        for child in node.neighbors:
            if child != parent:
                total += dfs(child, node)
        subtree_sum[node] = total
        return total

    dfs(root, None)
    return subtree_sum
```

### Subtree Size

```python
def compute_subtree_sizes(root):
    size = {}

    def dfs(node, parent):
        s = 1
        for child in node.neighbors:
            if child != parent:
                s += dfs(child, node)
        size[node] = s
        return s

    dfs(root, None)
    return size
```

## Rerooting Technique

When you need to compute something for every node as if it were the root.

### Problem: Sum of Distances

For each node, compute sum of distances to all other nodes.

**Naive**: O(n²) - BFS from each node

**Rerooting**: O(n)

```python
def sum_of_distances(adj, n):
    # First pass: root at node 0
    subtree_size = [0] * n
    subtree_dist = [0] * n  # Sum of distances within subtree

    def dfs1(node, parent):
        subtree_size[node] = 1
        for child in adj[node]:
            if child != parent:
                dfs1(child, node)
                subtree_size[node] += subtree_size[child]
                subtree_dist[node] += subtree_dist[child] + subtree_size[child]

    dfs1(0, -1)

    # Second pass: reroot to each node
    result = [0] * n
    result[0] = subtree_dist[0]

    def dfs2(node, parent):
        for child in adj[node]:
            if child != parent:
                # When rerooting from node to child:
                # - child's subtree moves 1 closer (subtree_size[child] nodes)
                # - rest of tree moves 1 farther (n - subtree_size[child] nodes)
                result[child] = result[node] - subtree_size[child] + (n - subtree_size[child])
                dfs2(child, node)

    dfs2(0, -1)
    return result
```

## Tree Coloring Problems

### Minimum Vertex Cover

Select minimum nodes so every edge has at least one endpoint selected.

```python
def min_vertex_cover(root):
    # dp[v][0] = min cover for subtree when v NOT selected
    # dp[v][1] = min cover for subtree when v IS selected

    def dfs(node, parent):
        not_selected = 0
        selected = 1

        for child in node.neighbors:
            if child != parent:
                child_not, child_sel = dfs(child, node)

                # If not selected, all children must be selected
                not_selected += child_sel

                # If selected, children can be either
                selected += min(child_not, child_sel)

        return (not_selected, selected)

    return min(dfs(root, None))
```

### K-Coloring Check

Determine if tree can be colored with k colors.

```python
def is_k_colorable(root, k):
    """Trees are always 2-colorable (bipartite)"""
    return k >= 2 if root else k >= 0
```

Trees are always 2-colorable by alternating colors down levels.

## Tree Decomposition Problems

### Centroid Decomposition

Recursively find centroids to decompose tree.

**Centroid**: Node whose removal leaves no subtree with more than n/2 nodes.

```python
def find_centroid(node, parent, tree_size, adj, removed):
    for child in adj[node]:
        if child != parent and not removed[child]:
            if subtree_size[child] > tree_size // 2:
                return find_centroid(child, node, tree_size, adj, removed)
    return node
```

**Application**: Path queries, distance computations

### Heavy-Light Decomposition

Decompose tree into chains for efficient path queries.

```python
def hld(root, adj):
    parent = [-1] * n
    depth = [0] * n
    subtree_size = [0] * n
    heavy_child = [-1] * n
    chain_head = [0] * n
    position = [0] * n

    # First DFS: compute sizes and heavy children
    def dfs1(v, p, d):
        parent[v] = p
        depth[v] = d
        subtree_size[v] = 1
        max_child_size = 0

        for child in adj[v]:
            if child != p:
                dfs1(child, v, d + 1)
                subtree_size[v] += subtree_size[child]
                if subtree_size[child] > max_child_size:
                    max_child_size = subtree_size[child]
                    heavy_child[v] = child

    # Second DFS: assign positions and chain heads
    pos = [0]
    def dfs2(v, head):
        chain_head[v] = head
        position[v] = pos[0]
        pos[0] += 1

        if heavy_child[v] != -1:
            dfs2(heavy_child[v], head)  # Continue chain

        for child in adj[v]:
            if child != parent[v] and child != heavy_child[v]:
                dfs2(child, child)  # Start new chain

    dfs1(root, -1, 0)
    dfs2(root, root)

    return chain_head, position, parent, depth
```

**Query time**: O(log n) chains traversed

## Binary Tree DP

### House Robber III

Can't rob adjacent houses (parent-child relationship).

```python
def rob(root):
    def dfs(node):
        if not node:
            return (0, 0)  # (not_rob, rob)

        left = dfs(node.left)
        right = dfs(node.right)

        # If we don't rob this node, children can be robbed or not
        not_rob = max(left) + max(right)

        # If we rob this node, children cannot be robbed
        rob = node.val + left[0] + right[0]

        return (not_rob, rob)

    return max(dfs(root))
```

### Binary Tree Cameras

Minimum cameras to monitor all nodes.

```python
def min_camera_cover(root):
    # States: 0 = needs coverage, 1 = covered (no camera), 2 = has camera

    def dfs(node):
        if not node:
            return (0, 0, float('inf'))  # (needs, covered, camera)

        left = dfs(node.left)
        right = dfs(node.right)

        # State: needs coverage
        needs = left[1] + right[1]

        # State: covered (by child camera)
        covered = min(left[2] + min(right[1:]),
                     right[2] + min(left[1:]))

        # State: has camera
        camera = 1 + min(left) + min(right)

        return (needs, covered, camera)

    result = dfs(root)
    return min(result[1], result[2])  # Root can't be "needs"
```

## Common Patterns

1. **State per node**: Usually include/exclude or status values
2. **Process children first**: Postorder traversal
3. **Combine child results**: Often sum or min/max
4. **Rerooting for all-pairs**: Two-pass technique
5. **Path queries**: HLD or centroid decomposition

