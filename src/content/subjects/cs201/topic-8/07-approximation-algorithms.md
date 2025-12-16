# Approximation Algorithms

When optimal solutions are intractable, approximation algorithms provide provably good solutions in polynomial time.

## Approximation Ratios

### Definition

For minimization problem:
**Approximation ratio** α = (algorithm's solution) / (optimal solution) ≥ 1

For maximization problem:
**Approximation ratio** α = (optimal solution) / (algorithm's solution) ≥ 1

**α-approximation**: Algorithm achieves ratio at most α.

### Classification

| Type | Ratio | Example |
|------|-------|---------|
| Constant | O(1) | Vertex Cover (2) |
| Logarithmic | O(log n) | Set Cover |
| PTAS | 1 + ε | Knapsack |
| FPTAS | 1 + ε, poly(1/ε) | Knapsack |

## Vertex Cover

**Problem**: Minimum set of vertices covering all edges.

### 2-Approximation

```python
def vertex_cover_2approx(graph):
    cover = set()
    uncovered_edges = set(graph.edges())

    while uncovered_edges:
        # Pick arbitrary uncovered edge
        u, v = uncovered_edges.pop()
        cover.add(u)
        cover.add(v)

        # Remove all edges incident to u or v
        uncovered_edges = {(a, b) for a, b in uncovered_edges
                          if a not in (u, v) and b not in (u, v)}

    return cover
```

### Proof of 2-Approximation

**Claim**: |cover| ≤ 2 × |OPT|

**Proof**:
- We pick k edges (endpoints form cover of size 2k)
- These k edges are vertex-disjoint (no shared endpoints)
- OPT must include at least one endpoint of each
- Therefore |OPT| ≥ k, so |cover| = 2k ≤ 2|OPT|

## Set Cover

**Problem**: Cover all elements with minimum number of sets.

### Greedy O(log n)-Approximation

```python
def set_cover_greedy(universe, sets):
    covered = set()
    chosen = []

    while covered != universe:
        # Choose set covering most uncovered elements
        best = max(sets, key=lambda s: len(s - covered))
        chosen.append(best)
        covered |= best

    return chosen
```

### Analysis

**Theorem**: Greedy achieves O(log n) approximation.

**Proof sketch**:
- Let OPT cover all elements
- At each step, best set covers ≥ (remaining)/OPT elements
- After OPT × ln(n) steps, expected remaining < 1

**Lower bound**: O(log n) is optimal unless P = NP.

## Traveling Salesman (Metric TSP)

**Problem**: Shortest tour visiting all cities, with triangle inequality.

### Christofides Algorithm (1.5-approximation)

```python
def christofides(graph):
    # 1. Find MST
    mst = minimum_spanning_tree(graph)

    # 2. Find odd-degree vertices
    odd_vertices = [v for v in graph if degree(mst, v) % 2 == 1]

    # 3. Minimum weight perfect matching on odd vertices
    matching = min_weight_matching(graph, odd_vertices)

    # 4. Combine MST and matching (multigraph)
    combined = mst + matching

    # 5. Find Eulerian tour
    euler_tour = eulerian_circuit(combined)

    # 6. Shortcut repeated vertices
    tour = shortcut(euler_tour)

    return tour
```

### Why 1.5-Approximation?

- MST weight ≤ OPT (tour minus one edge is spanning tree)
- Matching weight ≤ OPT/2 (optimal tour on odd vertices)
- Combined: ≤ 1.5 × OPT
- Shortcutting only helps (triangle inequality)

## Knapsack FPTAS

**Problem**: Maximize value subject to weight capacity.

### Scaling Approach

```python
def knapsack_fptas(weights, values, capacity, epsilon):
    n = len(weights)
    max_value = max(values)

    # Scale values
    K = epsilon * max_value / n
    scaled_values = [int(v / K) for v in values]

    # DP with scaled values
    max_scaled = n * int(max_value / K)
    dp = [[float('inf')] * (max_scaled + 1) for _ in range(n + 1)]
    dp[0][0] = 0

    for i in range(1, n + 1):
        for v in range(max_scaled + 1):
            dp[i][v] = dp[i-1][v]  # Don't take
            if v >= scaled_values[i-1]:
                dp[i][v] = min(dp[i][v],
                               dp[i-1][v - scaled_values[i-1]] + weights[i-1])

    # Find maximum value within capacity
    for v in range(max_scaled, -1, -1):
        if dp[n][v] <= capacity:
            return v * K  # Approximate original value

    return 0
```

### Analysis

**Scaling factor**: K = εV_max/n

**Scaled values**: At most n/ε each

**DP table size**: O(n × n/ε) = O(n²/ε)

**Time**: O(n³/ε)

**Error**: At most ε × V_max per item, n items total
→ Error ≤ n × K = ε × V_max ≤ ε × OPT

Therefore: Solution ≥ (1 - ε) × OPT

## LP Relaxation and Rounding

### Framework

1. Write integer linear program (ILP)
2. Relax to LP (allow fractional solutions)
3. Solve LP optimally
4. Round to obtain integral solution
5. Analyze approximation ratio

### Set Cover via LP

**ILP**:
```
Minimize Σ xₛ
Subject to: Σ xₛ ≥ 1 for each element e
            xₛ ∈ {0, 1}
```

**LP Relaxation**: Replace xₛ ∈ {0, 1} with 0 ≤ xₛ ≤ 1

**Rounding**: Include set s if xₛ ≥ 1/f where f = max set frequency

**Ratio**: O(f) approximation

### Vertex Cover via LP

**LP**: For each edge (u,v): xᵤ + xᵥ ≥ 1

**Rounding**: Include vertex v if xᵥ ≥ 0.5

**Ratio**: 2-approximation (same as greedy!)

## Randomized Approximation

### MAX-SAT

**Problem**: Maximize satisfied clauses.

**Random assignment**: Each variable true with probability 1/2.

**Expected satisfied clauses**: ≥ (1 - 1/2ᵏ) × m for clauses of size k

**For 3-SAT**: At least 7/8 × m clauses satisfied in expectation.

**Derandomization**: Use method of conditional expectations to achieve same ratio deterministically.

## Primal-Dual Method

Simultaneously construct primal and dual solutions.

### Set Cover Example

- Primal: Choose sets to cover elements
- Dual: Assign prices to elements

**Algorithm**:
```python
def primal_dual_set_cover(elements, sets):
    prices = {e: 0 for e in elements}
    chosen = []

    for e in elements:
        if not covered(e, chosen):
            # Raise price until some set becomes tight
            tight_set = raise_price_until_tight(e, prices, sets)
            chosen.append(tight_set)

    return chosen
```

## Summary of Approximation Techniques

| Technique | Example Problem | Ratio |
|-----------|-----------------|-------|
| Greedy | Set Cover | O(log n) |
| Local search | MAX-SAT | 2 |
| LP rounding | Vertex Cover | 2 |
| Primal-dual | Set Cover | f |
| Scaling | Knapsack | 1 + ε |
| Metric | TSP | 1.5 |
| Randomization | MAX-SAT | 7/8 |

## When to Use Approximation

1. **Problem is NP-hard**: No exact polynomial algorithm
2. **Good approximation exists**: Ratio is acceptable
3. **Exact solutions expensive**: Even for moderate inputs
4. **Practical constraints**: Time limits in real applications

Approximation algorithms bridge the gap between theoretical hardness and practical necessity—providing guaranteed quality in polynomial time.
