---
id: math102-t3-trees
title: "Trees and Forests"
order: 4
---

# Trees and Forests

Trees are connected graphs without cycles. They're among the most important structures in computer science, appearing in data structures, algorithms, and network design.

## Definitions

**Tree**: A connected graph with no cycles.

**Forest**: A graph with no cycles (may be disconnected). Each connected component is a tree.

**Rooted tree**: A tree with one designated vertex called the root.

## Equivalent Characterizations

For a graph G with n vertices, these are equivalent:

1. G is a tree (connected, no cycles)
2. G is connected with exactly n-1 edges
3. G has no cycles and exactly n-1 edges
4. Any two vertices are connected by exactly one path
5. G is connected, but removing any edge disconnects it
6. G has no cycles, but adding any edge creates exactly one cycle

### Why n-1 Edges?

**Connected requires at least n-1 edges**: A spanning tree of n vertices needs n-1 edges.

**Acyclic allows at most n-1 edges**: Each edge in a tree connects two components. Starting with n isolated vertices, n-1 edges can connect them without creating a cycle.

## Rooted Tree Terminology

Once a root is designated, trees gain hierarchical structure:

```
         A (root)
        /|\
       / | \
      B  C  D
     /|     |
    E F     G
```

**Parent**: The vertex closer to root on the unique path. B's parent is A.

**Child**: A vertex whose parent is v. B's children are E and F.

**Siblings**: Vertices sharing the same parent. B, C, D are siblings.

**Ancestor**: Any vertex on the path to root. A, B are ancestors of E.

**Descendant**: Any vertex in the subtree rooted at v. E, F are descendants of B.

**Leaf**: A vertex with no children (degree 1, except root). E, F, C, G are leaves.

**Internal node**: A vertex with at least one child. A, B, D are internal.

**Depth**: Distance from root. Depth of E = 2.

**Height**: Maximum depth of any leaf in subtree. Height of tree = 2.

**Subtree**: Tree formed by a vertex and all its descendants.

## Spanning Trees

A **spanning tree** of connected graph G is a subgraph that:
- Is a tree
- Contains all vertices of G

### Properties

- Every connected graph has at least one spanning tree
- If G has n vertices and m edges, spanning trees have n-1 edges
- Removing any edge from spanning tree disconnects it
- Adding any non-tree edge creates exactly one cycle

### Counting Spanning Trees

**Cayley's Formula**: The complete graph Kₙ has n^(n-2) spanning trees.

- K₃ has 3¹ = 3 spanning trees
- K₄ has 4² = 16 spanning trees
- K₅ has 5³ = 125 spanning trees

**Matrix Tree Theorem**: The number of spanning trees equals any cofactor of the Laplacian matrix.

## Minimum Spanning Trees

For weighted graphs, a **minimum spanning tree (MST)** minimizes total edge weight while spanning all vertices.

### Kruskal's Algorithm

```python
def kruskal(vertices, edges):
    # Sort edges by weight
    edges.sort(key=lambda e: e[2])
    uf = UnionFind(vertices)
    mst = []

    for u, v, weight in edges:
        if uf.find(u) != uf.find(v):
            uf.union(u, v)
            mst.append((u, v, weight))

    return mst
```

**Idea**: Greedily add cheapest edge that doesn't create a cycle.

**Time**: O(E log E)

### Prim's Algorithm

```python
def prim(graph, start):
    visited = {start}
    edges = [(weight, start, v) for v, weight in graph[start]]
    heapq.heapify(edges)
    mst = []

    while edges:
        weight, u, v = heapq.heappop(edges)
        if v not in visited:
            visited.add(v)
            mst.append((u, v, weight))
            for next_v, next_w in graph[v]:
                if next_v not in visited:
                    heapq.heappush(edges, (next_w, v, next_v))

    return mst
```

**Idea**: Grow tree from start, always adding cheapest edge to new vertex.

**Time**: O(E log V) with binary heap

### MST Properties

- MST may not be unique if equal-weight edges exist
- Cut property: The minimum edge crossing any cut is in some MST
- Cycle property: The maximum edge in any cycle is not in any MST

## Tree Traversals

### Preorder (Root First)

Visit root, then recursively visit children.

```python
def preorder(node):
    if node:
        process(node)
        for child in node.children:
            preorder(child)
```

Use: Copy tree, prefix expressions

### Postorder (Root Last)

Recursively visit children, then visit root.

```python
def postorder(node):
    if node:
        for child in node.children:
            postorder(child)
        process(node)
```

Use: Delete tree, calculate directory sizes

### Level Order (BFS)

Visit level by level using a queue.

```python
def level_order(root):
    queue = deque([root])
    while queue:
        node = queue.popleft()
        process(node)
        queue.extend(node.children)
```

## Special Trees

**Binary tree**: Each node has at most 2 children.

**Full binary tree**: Every node has 0 or 2 children.

**Complete binary tree**: All levels filled except possibly last (filled left to right).

**Perfect binary tree**: All internal nodes have 2 children, all leaves at same level.

**Balanced tree**: Height is O(log n).

**k-ary tree**: Each node has at most k children.

## Tree Formulas

For a full binary tree with n internal nodes:
- Total nodes: 2n + 1
- Leaves: n + 1
- Height h: n ≥ h (minimum) to n = 2ʰ - 1 (maximum)

For a complete binary tree with n nodes:
- Height: ⌊log₂ n⌋
- Leaves: ⌈n/2⌉
- Internal nodes: ⌊n/2⌋

## Prüfer Sequences

A **Prüfer sequence** uniquely encodes labeled trees on n vertices as a sequence of n-2 integers.

**Encoding**: Repeatedly remove the leaf with smallest label, record its neighbor.

**Decoding**: Reconstruct tree from sequence.

**Application**: Proves Cayley's formula. There are n^(n-2) sequences of length n-2 using labels 1 to n.
