---
id: math102-t3-probs
title: "Graph Problems"
order: 7
---

# Graph Theory Problems

This section presents classic problems and proof techniques in graph theory. Working through these problems builds intuition and problem-solving skills.

## Eulerian Graphs

### Euler's Theorem

**Theorem:** A connected graph has an Eulerian circuit (path visiting every edge exactly once, returning to start) if and only if every vertex has even degree.

**Proof (necessity):** Each time we enter a vertex, we must leave. So edges are used in pairs at each vertex, requiring even degree.

**Proof (sufficiency):** Start anywhere. At each step, take an unused edge. Since all degrees are even, we can only get stuck at the start. If edges remain, find a vertex with unused edges on our circuit, start a new circuit, and splice.

### Eulerian Path

A graph has an Eulerian path (not necessarily a circuit) if and only if it has exactly 0 or 2 vertices of odd degree.

### Königsberg Bridges

The classic problem: Can you walk through Königsberg crossing each of its 7 bridges exactly once?

**Solution:** Model as graph with 4 vertices (land masses) and 7 edges (bridges). All vertices have odd degree, so no Eulerian path exists.

## Hamiltonian Graphs

### Hamiltonian vs Eulerian

- **Eulerian:** Visit every edge once
- **Hamiltonian:** Visit every vertex once

Unlike Eulerian paths, no simple characterization exists for Hamiltonian paths/cycles. The decision problem is NP-complete.

### Sufficient Conditions

**Ore's Theorem:** If |V| = n ≥ 3 and for every pair of non-adjacent vertices u, v: deg(u) + deg(v) ≥ n, then G has a Hamiltonian cycle.

**Dirac's Theorem:** If |V| = n ≥ 3 and every vertex has degree ≥ n/2, then G has a Hamiltonian cycle.

### Gray Codes

A Gray code is a Hamiltonian path in the hypercube Q_n, listing all n-bit strings where consecutive strings differ in one bit.

**Construction (binary-reflected):**
```
n=1: 0, 1
n=2: 00, 01, 11, 10
n=3: 000, 001, 011, 010, 110, 111, 101, 100
```

## Matching Problems

### Perfect Matching

A **perfect matching** pairs all vertices (requires even vertex count).

**Hall's Theorem:** A bipartite graph G = (X, Y, E) has a matching covering X iff for every S ⊆ X:
$$|N(S)| \geq |S|$$
where N(S) = vertices in Y adjacent to some vertex in S.

### König's Theorem

In a bipartite graph:
**Maximum matching size = Minimum vertex cover size**

### Marriage Problem

Given n men and n women with preferences, find a stable matching where no pair would both prefer each other over their current partners.

**Gale-Shapley Algorithm:** O(n²) solution exists. Produces man-optimal or woman-optimal stable matching.

## Coloring Problems

### Chromatic Number

**Problem:** Find minimum colors needed to color vertices so no adjacent vertices share a color.

**Greedy Bound:** χ(G) ≤ Δ(G) + 1 (max degree + 1)

**Brook's Theorem:** χ(G) ≤ Δ(G) unless G is complete graph or odd cycle.

### Four Color Theorem

Every planar graph can be colored with 4 colors.

**Note:** First major theorem proved with computer assistance (1976).

### Edge Coloring

**Vizing's Theorem:** Edge chromatic number χ'(G) is either Δ(G) or Δ(G) + 1.

## Connectivity Problems

### Vertex Connectivity

κ(G) = minimum vertices whose removal disconnects G

**Menger's Theorem:** Maximum number of vertex-disjoint paths between u and v equals minimum vertex cut separating them.

### Edge Connectivity

λ(G) = minimum edges whose removal disconnects G

**Relation:** κ(G) ≤ λ(G) ≤ δ(G) (minimum degree)

### Ear Decomposition

Every 2-connected graph can be built by starting with a cycle and successively adding "ears" (paths between existing vertices).

## Network Flow Problems

### Max-Flow Min-Cut

**Problem:** Find maximum flow from source s to sink t in a network with edge capacities.

**Max-Flow Min-Cut Theorem:** Maximum flow equals minimum cut capacity.

**Ford-Fulkerson:** Find augmenting paths until none remain.

### Applications

- Bipartite matching (reduce to flow)
- Edge-disjoint paths
- Minimum cut problems

## Shortest Path Problems

### Single-Source Shortest Path

**Dijkstra's Algorithm:** O((V+E) log V) for non-negative weights

**Bellman-Ford:** O(VE), handles negative edges, detects negative cycles

### All-Pairs Shortest Path

**Floyd-Warshall:** O(V³)

For all pairs u, v and intermediate vertex k:
```
dist[u][v] = min(dist[u][v], dist[u][k] + dist[k][v])
```

## Tree Problems

### Minimum Spanning Tree

Find spanning tree with minimum total edge weight.

**Algorithms:**
- Prim's: Grow from one vertex, O(E log V)
- Kruskal's: Add edges by weight, O(E log E)

### Cayley's Formula

Number of labeled trees on n vertices: n^{n-2}

**Proof techniques:** Prüfer sequences, matrix-tree theorem.

## Proof Techniques

### Double Counting

Count the same quantity two ways.

**Handshaking Lemma:** Sum of degrees = 2|E|

**Proof:** Each edge contributes 2 to the sum.

### Extremal Arguments

Consider graph achieving maximum/minimum of some quantity.

**Example:** Prove every graph has two vertices of equal degree.

**Proof:** Degrees range 0 to n-1. If both 0 and n-1 appear, they're adjacent (contradiction). So only n-1 possible values for n vertices; by Pigeonhole, two are equal.

### Induction

Strong induction on number of vertices or edges.

**Example:** Every tree with n ≥ 2 vertices has at least two leaves.

**Proof:**
- Base: n=2, both vertices are leaves.
- Induction: Remove a leaf and its edge. Remaining tree has ≥ 2 leaves by hypothesis. At most one is the neighbor of removed vertex, so original tree has ≥ 2 leaves.

### Probabilistic Method

Show existence by proving probability > 0.

**Example:** There exists a graph on n vertices with independence number and clique number both at most 2log₂n.

## Practice Problems

1. Prove: A graph is bipartite iff it contains no odd cycle.

2. Show: In any group of 6 people, either 3 mutually know each other or 3 mutually don't know each other (Ramsey R(3,3)=6).

3. Prove: Every graph with average degree d contains a subgraph with minimum degree > d/2.

4. Find: Minimum edges in a connected graph on n vertices (answer: n-1).

5. Prove: Every planar graph is 5-colorable.

## Summary

Graph theory problems encompass:
- **Eulerian/Hamiltonian:** Path/cycle existence
- **Matching:** Pairing vertices optimally
- **Coloring:** Conflict-free assignment
- **Connectivity:** Cut/path analysis
- **Flow/shortest paths:** Network optimization

Key techniques include double counting, extremal arguments, induction, and reduction between problems.
