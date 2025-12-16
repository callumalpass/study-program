# Graph Definitions and Terminology

Graphs model relationships between objects and appear throughout computer science—from social networks to circuit design. This foundation covers essential vocabulary and concepts.

## What is a Graph?

A **graph** G = (V, E) consists of:
- **V**: A set of **vertices** (nodes)
- **E**: A set of **edges** connecting pairs of vertices

### Example

```
V = {1, 2, 3, 4}
E = {{1,2}, {1,3}, {2,3}, {3,4}}

    1 --- 2
     \   /
      \ /
       3 --- 4
```

## Directed vs Undirected

**Undirected graph**: Edges have no direction. {u,v} = {v,u}.

```
A --- B    (Can traverse either direction)
```

**Directed graph (digraph)**: Edges have direction. (u,v) ≠ (v,u).

```
A --→ B    (Only traverse A to B)
```

Directed edges are called **arcs**. For arc (u,v), u is the **tail** and v is the **head**.

## Vertex Degree

**Degree** of vertex v, denoted deg(v): Number of edges incident to v.

### Undirected Graph

```
    A --- B
     \   /|
      \ / |
       C  |
       |  /
       D /
```

deg(A) = 2, deg(B) = 3, deg(C) = 3, deg(D) = 1

**Handshaking Lemma**: Σ deg(v) = 2|E|

Each edge contributes 2 to the total degree (one for each endpoint).

**Corollary**: The number of vertices with odd degree is even.

### Directed Graph

- **In-degree** deg⁻(v): Number of edges pointing into v
- **Out-degree** deg⁺(v): Number of edges pointing out of v

```
A → B → C
↓   ↑
└───┘
```

For vertex B: deg⁻(B) = 2, deg⁺(B) = 1

**Property**: Σ deg⁻(v) = Σ deg⁺(v) = |E|

## Special Vertices and Edges

**Isolated vertex**: deg(v) = 0 (no incident edges)

**Pendant vertex** (leaf): deg(v) = 1 (exactly one edge)

**Self-loop**: Edge from vertex to itself: {v,v} or (v,v)

**Multi-edge** (parallel edges): Multiple edges between same pair of vertices

**Simple graph**: No self-loops or multi-edges

**Multigraph**: Allows multiple edges between vertices

**Pseudograph**: Allows both self-loops and multi-edges

## Adjacency and Incidence

**Adjacent vertices**: Connected by an edge. If {u,v} ∈ E, then u and v are adjacent.

**Incident**: An edge is incident to its endpoints. Edge {u,v} is incident to both u and v.

**Neighborhood** N(v): Set of all vertices adjacent to v.

```
    A --- B
     \   /
      \ /
       C --- D
```

N(C) = {A, B, D}

## Graph Properties

### Connectivity

**Connected graph**: There exists a path between every pair of vertices.

**Connected component**: Maximal connected subgraph.

```
A --- B    D --- E
 \   /
  \ /
   C         F

Two components: {A,B,C} and {D,E,F}
```

**Strongly connected** (directed): Path exists from u to v AND from v to u for all u,v.

### Completeness

**Complete graph** Kₙ: Every pair of vertices is connected.

```
K₄:
    A ─────── B
    |\       /|
    | \     / |
    |  \   /  |
    |   \ /   |
    |    X    |
    |   / \   |
    |  /   \  |
    | /     \ |
    |/       \|
    C ─────── D
```

Kₙ has n(n-1)/2 edges.

### Bipartiteness

**Bipartite graph**: Vertices can be partitioned into two sets U and W such that every edge connects a vertex in U to one in W.

```
U: A    B    C
    \  /|\  /
     \/  \ /
     /\   X
    /  \ / \
W: D    E    F
```

**Property**: A graph is bipartite if and only if it contains no odd-length cycle.

**Complete bipartite graph** Kₘ,ₙ: Every vertex in U connects to every vertex in W.

Kₘ,ₙ has m×n edges.

## Subgraphs

A **subgraph** H of G: H = (V', E') where V' ⊆ V and E' ⊆ E, with edges in E' only between vertices in V'.

**Induced subgraph**: Given vertex subset S ⊆ V, the induced subgraph G[S] includes all edges of G between vertices in S.

**Spanning subgraph**: Uses all vertices of G (V' = V) but subset of edges.

## Graph Isomorphism

Graphs G₁ and G₂ are **isomorphic** if there exists a bijection f: V₁ → V₂ such that {u,v} ∈ E₁ iff {f(u),f(v)} ∈ E₂.

Isomorphic graphs are "structurally identical."

### Checking Isomorphism

**Necessary conditions** (but not sufficient):
- Same number of vertices
- Same number of edges
- Same degree sequence
- Same number of cycles of each length

**Example**: These graphs are isomorphic:
```
1─2        A─B
|X|   ↔    |X|
3─4        C─D
```

Mapping: 1→A, 2→B, 3→C, 4→D

## Important Graph Families

| Name | Notation | Description |
|------|----------|-------------|
| Path | Pₙ | n vertices in a line |
| Cycle | Cₙ | n vertices in a ring |
| Complete | Kₙ | All pairs connected |
| Complete bipartite | Kₘ,ₙ | Two parts, all cross-edges |
| Star | K₁,ₙ | Center connected to n leaves |
| Wheel | Wₙ | Cycle with center vertex |
| Hypercube | Qₙ | 2ⁿ vertices, bit-flip edges |

## Graph Complements

The **complement** Ḡ of G: Same vertices, edges are exactly those NOT in G.

```
G:          Ḡ:
A─B         A  B
|           |\/|
C─D         C──D
```

If G is Kₙ, then Ḡ has no edges. If G has no edges, Ḡ = Kₙ.
