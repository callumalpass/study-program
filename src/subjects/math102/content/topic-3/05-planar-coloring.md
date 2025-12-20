# Planar Graphs and Graph Coloring

Planar graphs can be drawn without edge crossings, while graph coloring assigns labels to vertices under adjacency constraints. Both concepts have profound theoretical and practical significance.

## Planar Graphs

A graph is **planar** if it can be drawn in the plane with no edges crossing.

Such a drawing is called a **planar embedding** or **plane graph**.

### Examples

**Planar**:
```
K₄:              Can be drawn as:
A---B            A---B
|\ /|             \ /
| X |      →      X
|/ \|             / \
C---D            C---D
```

**Non-planar**: K₅ and K₃,₃ cannot be drawn without crossings.

## Euler's Formula

For a connected planar graph drawn in the plane:

```
V - E + F = 2
```

Where:
- V = number of vertices
- E = number of edges
- F = number of faces (including the outer unbounded face)

### Example

```
    A---B
    |\ /|
    | X |
    |/ \|
    C---D
```

V = 4, E = 6, F = 4 (three inner triangles + outer face)

Check: 4 - 6 + 4 = 2 ✓

### Corollaries

For a connected planar simple graph with V ≥ 3:

**Edge bound**: E ≤ 3V - 6

**Proof**: Each face is bounded by at least 3 edges. Summing over faces: 3F ≤ 2E (each edge borders at most 2 faces). So F ≤ 2E/3. By Euler: V - E + 2E/3 ≥ 2, giving E ≤ 3V - 6.

**Application**: K₅ has V = 5, E = 10. But 10 > 3(5) - 6 = 9. So K₅ is non-planar.

**For bipartite planar graphs**: E ≤ 2V - 4

**Application**: K₃,₃ has V = 6, E = 9. But 9 > 2(6) - 4 = 8. So K₃,₃ is non-planar.

## Kuratowski's Theorem

A graph is planar if and only if it contains no subdivision of K₅ or K₃,₃.

A **subdivision** replaces edges with paths (inserting vertices of degree 2).

This gives a complete characterization: K₅ and K₃,₃ are the only "obstructions" to planarity.

## Graph Coloring

A **proper k-coloring** assigns one of k colors to each vertex such that adjacent vertices have different colors.

**Chromatic number χ(G)**: Minimum k for which a proper k-coloring exists.

### Examples

```
Triangle (K₃):          Square (C₄):
   R                      R---B
  / \                     |   |
 B---G                    B---R

χ(K₃) = 3               χ(C₄) = 2
```

### Basic Bounds

**Lower bounds**:
- χ(G) ≥ ω(G), where ω is the clique number (largest complete subgraph)
- χ(G) ≥ n/α(G), where α is the independence number

**Upper bounds**:
- χ(G) ≤ Δ(G) + 1, where Δ is maximum degree (greedy algorithm)
- χ(G) ≤ Δ(G) for connected graphs that aren't complete or odd cycles (Brooks' theorem)

## Special Chromatic Numbers

| Graph | χ |
|-------|---|
| Kₙ | n |
| Tree | 2 |
| Even cycle C₂ₖ | 2 |
| Odd cycle C₂ₖ₊₁ | 3 |
| Bipartite | 2 |
| Planar | ≤ 4 |

## The Four Color Theorem

Every planar graph has chromatic number at most 4.

Equivalently: Every map can be colored with 4 colors so adjacent regions differ.

**History**: Conjectured 1852, proved 1976 (Appel & Haken) using computer verification of ~1500 cases. First major theorem proved with computer assistance.

**The Five Color Theorem** (easier to prove): Every planar graph is 5-colorable.

## Greedy Coloring

```python
def greedy_color(graph, vertex_order):
    color = {}
    for v in vertex_order:
        used = {color[u] for u in graph[v] if u in color}
        # Find smallest unused color
        c = 0
        while c in used:
            c += 1
        color[v] = c
    return color
```

Greedy uses at most Δ + 1 colors, but may use more than χ(G) depending on vertex order.

## Bipartiteness as 2-Colorability

A graph is bipartite if and only if χ(G) = 2 if and only if it contains no odd cycle.

**Testing**: BFS/DFS can determine bipartiteness in O(V + E).

```python
def is_bipartite(graph):
    color = {}
    for start in graph:
        if start in color:
            continue
        queue = deque([start])
        color[start] = 0
        while queue:
            v = queue.popleft()
            for u in graph[v]:
                if u not in color:
                    color[u] = 1 - color[v]
                    queue.append(u)
                elif color[u] == color[v]:
                    return False
    return True
```

## Edge Coloring

A **proper edge coloring** assigns colors to edges so no two edges sharing a vertex have the same color.

**Chromatic index χ'(G)**: Minimum colors needed.

**Vizing's Theorem**: Δ ≤ χ'(G) ≤ Δ + 1

Graphs are either **Class 1** (χ' = Δ) or **Class 2** (χ' = Δ + 1).

## Applications

**Scheduling**: Vertices = tasks, edges = conflicts. Chromatic number = minimum time slots.

**Register allocation**: Vertices = variables, edges = simultaneous liveness. Colors = registers.

**Map coloring**: Faces = regions, adjacency = shared border. Classic application of planar coloring.

**Frequency assignment**: Vertices = transmitters, edges = interference. Colors = frequencies.

## Computational Complexity

| Problem | Complexity |
|---------|------------|
| 2-coloring | O(V + E) - just bipartiteness |
| 3-coloring | NP-complete |
| k-coloring (k ≥ 3) | NP-complete |
| Chromatic number | NP-hard |
| Planar 3-coloring | NP-complete |
| Planar 4-coloring | Polynomial (but complex) |
