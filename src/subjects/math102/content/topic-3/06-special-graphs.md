---
id: math102-t3-special
title: "Special Graphs"
order: 6
---

# Special Graphs and Graph Families

Certain graph families have special properties that make them important in theory and applications. Understanding these families helps recognize structure and apply known results.

## Complete Graphs

A **complete graph** K_n has n vertices where every pair is connected.

**Properties of K_n:**
- Edges: $\binom{n}{2} = \frac{n(n-1)}{2}$
- Each vertex has degree n-1
- Diameter: 1 (one hop between any pair)
- Regular (all degrees equal)

**Complete Bipartite Graph K_{m,n}:**
- Two parts with m and n vertices
- Every vertex in one part connected to all vertices in other part
- Edges: m × n
- Star graph K_{1,n} is special case

## Cycles and Paths

**Path P_n:**
- n vertices in a line
- n-1 edges
- Two endpoints (degree 1)
- Interior vertices have degree 2

**Cycle C_n:**
- n vertices in a closed loop
- n edges
- Every vertex has degree 2
- Minimum cycle length is 3 (triangle C_3)

**Properties:**
- C_n is 2-regular
- Bipartite iff n is even
- Chromatic number: 2 if even, 3 if odd

## Bipartite Graphs

A graph is **bipartite** if vertices can be 2-colored with no adjacent same colors.

**Characterization:**
- G is bipartite ⟺ G has no odd cycles
- Can check via BFS/DFS coloring

**Complete Bipartite K_{m,n}:**
- Has m × n edges
- Diameter 2 (if m,n ≥ 2)
- Not planar if min(m,n) ≥ 3 and max(m,n) ≥ 3

**Applications:**
- Matching problems (jobs to workers)
- Resource allocation
- Conflict-free scheduling

## Regular Graphs

A **k-regular graph** has every vertex with degree k.

**Examples:**
- 0-regular: Independent set
- 1-regular: Perfect matching
- 2-regular: Disjoint cycles
- 3-regular: Cubic graphs (e.g., Petersen graph)

**Properties:**
- Sum of degrees = k × n (must be even)
- So n must be even if k is odd

**Petersen Graph:**
- 3-regular with 10 vertices
- Non-planar
- Smallest cubic graph with no Hamiltonian cycle
- Used as counterexample in graph theory

## Trees

A **tree** is a connected graph with no cycles.

**Equivalent definitions (for n vertices):**
- Connected with n-1 edges
- No cycles with n-1 edges
- Unique path between every pair
- Connected, but removing any edge disconnects

**Special Trees:**
- **Path:** Linear tree
- **Star K_{1,n-1}:** Central vertex connected to all others
- **Caterpillar:** All vertices within distance 1 of a path
- **Spider:** Star with legs extended

**Binary Trees:**
- Rooted trees where each node has at most 2 children
- Full binary tree: every node has 0 or 2 children
- Perfect binary tree: all leaves at same depth

## Planar Graphs

A graph is **planar** if it can be drawn in the plane with no edge crossings.

**Euler's Formula:** For connected planar graph:
$$v - e + f = 2$$
where v = vertices, e = edges, f = faces (including outer face)

**Consequences:**
- For n ≥ 3: e ≤ 3n - 6
- For bipartite: e ≤ 2n - 4
- Maximum average degree < 6 (so some vertex has degree ≤ 5)

**Non-planar graphs:**
- K_5 (complete on 5 vertices)
- K_{3,3} (complete bipartite)
- Any graph containing K_5 or K_{3,3} subdivision

**Kuratowski's Theorem:** G is planar iff it has no subdivision of K_5 or K_{3,3}.

## Hypercubes

The **n-dimensional hypercube** Q_n:
- Vertices: all n-bit binary strings
- Edges: strings differing in exactly one bit

**Properties:**
- |V| = 2^n vertices
- |E| = n × 2^{n-1} edges
- Degree: every vertex has degree n
- Diameter: n (bitwise distance)
- Bipartite (parity of 1-bits)
- Hamiltonian (Gray code order)

**Applications:**
- Parallel computing networks
- Error-correcting codes
- Boolean algebra

## Grid Graphs

**m × n Grid:**
- Vertices at lattice points
- Edges to adjacent points (4-connectivity)
- Bipartite (checkerboard coloring)
- Used in image processing, game boards

**Triangular/Hexagonal Grids:**
- Different connectivity patterns
- Applications in chemistry, materials science

## Graph Operations

### Complement

The **complement** $\bar{G}$ has:
- Same vertices as G
- Edge (u,v) iff (u,v) not in G

**Properties:**
- $\bar{\bar{G}} = G$
- $\bar{K_n}$ = empty graph
- Self-complementary graphs: G ≅ $\bar{G}$

### Line Graph

The **line graph** L(G):
- Vertices are edges of G
- Two vertices adjacent iff corresponding edges share endpoint

**Properties:**
- L(K_n) = triangular graph
- L(K_{1,n}) = K_n

### Graph Products

**Cartesian Product G □ H:**
- Vertex set: V(G) × V(H)
- (u₁,v₁) ~ (u₂,v₂) if:
  - u₁ = u₂ and v₁ ~ v₂ in H, or
  - v₁ = v₂ and u₁ ~ u₂ in G

**Example:** Q_n = K_2 □ K_2 □ ... □ K_2 (n times)

## Graph Parameters

For special graph families:

| Graph | Vertices | Edges | Diameter | Chromatic |
|-------|----------|-------|----------|-----------|
| K_n | n | n(n-1)/2 | 1 | n |
| C_n | n | n | ⌊n/2⌋ | 2 or 3 |
| P_n | n | n-1 | n-1 | 2 |
| Q_n | 2^n | n×2^{n-1} | n | 2 |
| K_{m,n} | m+n | mn | 2 | 2 |

## Applications

**Network Design:**
- Hypercube: parallel computing
- Complete graph: full connectivity
- Bipartite: two-tier architectures

**Error Correction:**
- Hypercubes encode Hamming distance
- Regular graphs for uniform protection

**Social Networks:**
- Small-world graphs (high clustering, low diameter)
- Scale-free graphs (power-law degree distribution)

## Summary

Special graph families include:
- **Complete/bipartite:** Maximum/structured connectivity
- **Cycles/paths:** Minimal connectivity patterns
- **Trees:** Connected acyclic graphs
- **Planar:** Drawable without crossings
- **Hypercubes:** Binary string adjacency
- **Regular:** Uniform degree distribution

Recognizing these structures enables application of known theorems and algorithms.
