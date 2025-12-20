# Dynamic Programming on Trees

Tree structures provide an ideal setting for dynamic programming because their hierarchical nature creates a natural decomposition into subproblems. Each subtree is an independent subproblem, and solutions for subtrees combine predictably to solve problems on the full tree. These techniques are essential for graph algorithms, compiler optimization, network analysis, and processing any hierarchical data structure.

Unlike sequence or grid DP where subproblems correspond to prefixes or rectangular regions, tree DP subproblems correspond to subtrees. The recursive structure of trees—every subtree is itself a valid tree—provides the optimal substructure that makes DP possible. The overlapping subproblem property arises when multiple paths through the tree computation require the same subtree results.

Understanding tree DP opens doors to efficient solutions for problems that appear intractable at first glance. Problems that would require exponential time with naive approaches often admit elegant linear-time solutions once the tree structure is properly exploited.

## Tree DP Fundamentals

### The Core Insight

A tree with root r naturally decomposes into subtrees rooted at r's children. The solution for the subtree rooted at r depends only on solutions for subtrees rooted at r's children, not on any information from r's ancestors. This independence property is crucial—it means we can solve subproblems in any order that respects the tree structure, typically using a post-order traversal that visits children before their parent.

### Standard Pattern

The standard tree DP pattern processes each node after all its children have been processed:

```python
def tree_dp(node):
    if node is None:
        return base_case

    # Solve for all children first
    child_results = [tree_dp(child) for child in node.children]

    # Combine children's results
    return combine(node, child_results)
```

This pattern naturally computes solutions bottom-up: leaves first, then their parents, then grandparents, eventually reaching the root. The elegance lies in how naturally this matches the tree structure—each call to tree_dp has all the information it needs because its children have already been processed.

### Direction of DP

Different problems require different directions of information flow:

**Leaf-to-root (push up)**: When a node's result depends only on its descendants. This is the most common pattern, used when computing properties like subtree sizes, subtree sums, or optimal values within subtrees.

**Root-to-leaf (push down)**: When a node's result depends on its ancestors. This pattern appears when computing depths, path sums from root, or propagating constraints down the tree.

**Both directions (rerooting)**: Some problems require computing results as if every node were the root. This requires two passes: one to compute subtree information (leaf-to-root), and another to redistribute that information (root-to-leaf). The rerooting technique is powerful but more complex.

## Maximum Independent Set on Trees

The Maximum Independent Set problem asks for the largest set of vertices in a graph such that no two vertices in the set are adjacent. While this problem is NP-hard on general graphs, trees admit a polynomial-time solution through DP.

**Problem**: Find the largest set of nodes with no two adjacent.

The key insight is that for each node, we have a binary choice: include it in the independent set or exclude it. If we include a node, none of its children can be included. If we exclude a node, its children may or may not be included—we're free to choose optimally for each child.

**State**: For each node v, we compute two values:
- dp[v][0]: maximum independent set size in v's subtree when v is NOT included
- dp[v][1]: maximum independent set size in v's subtree when v IS included

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

**Time**: O(n) — each node is visited exactly once

The recurrence captures the constraint elegantly: including a node forces exclusion of children, while excluding a node allows optimal choice for each child independently.

## Tree Diameter

The diameter of a tree is the length of the longest path between any two nodes. This fundamental property has applications in network design (worst-case latency), tree layout algorithms, and understanding tree structure.

**Problem**: Find the longest path between any two nodes.

Two elegant approaches exist, both running in O(n) time.

### Approach 1: Two BFS/DFS

The first approach uses a beautiful property: the farthest node from any node in a tree is always an endpoint of the diameter. Starting from any node, find the farthest node u, then find the farthest node v from u—the distance from u to v is the diameter.

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

The second approach recognizes that the diameter either passes through the root or lies entirely within a subtree. For each node, we track the two longest paths descending from it—the diameter through that node is their sum.

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

**Time**: O(n) for both approaches

## Subtree Queries

Computing aggregate information about subtrees is a fundamental building block for more complex tree algorithms. These computations form the foundation for advanced techniques like centroid decomposition and heavy-light decomposition.

### Subtree Sum

Computing the sum of values in each subtree:

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

Computing the number of nodes in each subtree is essential for many algorithms including finding centroids:

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

Some problems require computing a result for every node as if that node were the root. A naive approach would run the entire DP for each potential root, giving O(n²) complexity. The rerooting technique achieves O(n) by computing results incrementally.

### Problem: Sum of Distances

For each node, compute the sum of distances to all other nodes.

**Naive approach**: O(n²) — run BFS from each node

**Rerooting approach**: O(n) — two DFS passes

The key insight is understanding how results change when we move the root from a node to its child. If we move the root from u to child v:
- All nodes in v's subtree become one step closer (subtree_size[v] total improvement)
- All other nodes become one step farther (n - subtree_size[v] total cost)

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

The rerooting formula captures exactly how the sum of distances changes: gains from v's subtree minus losses from the rest of the tree.

## Tree Coloring Problems

### Minimum Vertex Cover

A vertex cover selects a minimum set of vertices such that every edge has at least one endpoint selected. On trees, this admits an efficient DP solution.

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

Note the asymmetry: if we don't select a node, we must select all its children to cover the edges. If we do select a node, we're free to choose optimally for each child.

### K-Coloring

Determining if a tree can be properly colored with k colors:

```python
def is_k_colorable(root, k):
    """Trees are always 2-colorable (bipartite)"""
    return k >= 2 if root else k >= 0
```

Trees are always bipartite—we can 2-color any tree by alternating colors across levels. This simple fact underlies many tree algorithms.

## Tree Decomposition Techniques

For more complex problems, we sometimes need to decompose the tree into simpler structures.

### Centroid Decomposition

A centroid is a node whose removal leaves no subtree with more than n/2 nodes. Centroid decomposition recursively finds centroids, creating a decomposition tree where paths in the original tree correspond to ancestor-descendant relationships in the decomposition.

```python
def find_centroid(node, parent, tree_size, adj, removed):
    for child in adj[node]:
        if child != parent and not removed[child]:
            if subtree_size[child] > tree_size // 2:
                return find_centroid(child, node, tree_size, adj, removed)
    return node
```

**Applications**: Efficient path queries, distance computations, and counting problems.

### Heavy-Light Decomposition

Heavy-light decomposition partitions tree edges into chains, enabling efficient path queries with segment trees.

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

**Query time**: O(log n) chains traversed for any path query

## Binary Tree DP Examples

### House Robber III

The house robber cannot rob two directly connected houses (parent-child relationship).

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

Find minimum cameras needed to monitor all nodes, where each camera covers its parent, itself, and children.

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

## Common Patterns in Tree DP

1. **State per node**: Usually include/exclude or multiple status values representing the node's role in the solution

2. **Process children first**: Post-order traversal ensures children's results are available when processing parents

3. **Combine child results**: Often sum, min/max, or more complex aggregation depending on problem structure

4. **Rerooting for all-pairs**: When every node needs to be considered as root, use the two-pass rerooting technique

5. **Path queries**: For efficient path operations, consider HLD or centroid decomposition

Tree DP combines the elegance of recursive thinking with the efficiency of dynamic programming. Once you recognize the tree structure in a problem, these patterns provide a systematic approach to finding efficient solutions.
