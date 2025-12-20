---
id: cs201-t8-hardness
title: "Computational Hardness"
order: 6
---

# Computational Hardness

Understanding hardness is about knowing what you cannot do as much as what you can. When a problem is proven NP-hard, you stop looking for polynomial-time exact algorithms and start exploring alternatives: approximation, parameterized algorithms, heuristics, or special cases. This reframing—from seeking optimality to seeking tractability—is essential practical wisdom.

Hardness comes in degrees. NP-hardness says no polynomial-time algorithm exists (unless P = NP). Inapproximability results say you cannot even get close to optimal efficiently. Strong NP-hardness rules out pseudo-polynomial algorithms. Understanding these distinctions helps calibrate expectations: for some problems, 2-approximation is achievable; for others, any constant approximation is as hard as exact solution.

The tools for proving hardness—polynomial-time reductions—also illuminate problem structure. Showing that problem A reduces to problem B reveals that B contains all the difficulty of A, plus possibly more. The web of reductions connecting NP-complete problems provides a taxonomy of computational hardness, showing how problems relate and which techniques might transfer.

## Proving Hardness

### Reduction Framework

To prove problem B is at least as hard as problem A:

1. Show polynomial-time transformation from A to B
2. If A-instance is YES ↔ B-instance is YES
3. Then solving B solves A

**Notation**: A ≤ₚ B means "A reduces to B"

**Consequence**: If A is hard and A ≤ₚ B, then B is at least as hard.

### Common Reduction Sources

Start from known hard problems:

| Source | Reduces To |
|--------|-----------|
| SAT | Circuit SAT, 3-SAT |
| 3-SAT | Clique, Vertex Cover, 3-Coloring |
| Vertex Cover | Set Cover, Dominating Set |
| Subset Sum | Partition, Knapsack |
| Hamiltonian Path | TSP, Longest Path |

## Hardness of Approximation

Some problems are hard to even approximate!

### Gap Problems

**Gap-3-SAT**: Distinguish between:
- All clauses satisfiable
- At most 7/8 fraction satisfiable

**PCP Theorem**: Gap-3-SAT is NP-hard!

**Consequence**: No polynomial-time algorithm achieves better than 7/8 approximation for MAX-3-SAT (unless P = NP).

### Inapproximability Results

| Problem | Best Possible | Unless |
|---------|---------------|--------|
| Set Cover | O(log n) | P = NP |
| Clique | n^(1-ε) | P = NP |
| TSP (general) | Any constant | P = NP |
| Vertex Cover | 2 - ε | Unique Games Conj. |
| MAX-3-SAT | 7/8 + ε | P = NP |

## Special Case Tractability

Some NP-hard problems become easy on restricted inputs.

### Graph Classes

| Problem | Hard On | Easy On |
|---------|---------|---------|
| 3-Coloring | General | Trees (O(n)) |
| Clique | General | Chordal graphs (O(n³)) |
| Hamiltonian Path | General | DAGs (O(V + E)) |
| Vertex Cover | General | Trees (O(n)) |
| Max Independent Set | General | Bipartite (matching) |

### Structural Parameters

**Treewidth**: Many NP-hard problems are FPT with respect to treewidth.

```python
def solve_if_bounded_treewidth(graph, tw):
    """Many NP-hard problems solvable in O(f(tw) × n)."""
    # Use tree decomposition
    # Dynamic programming on tree structure
    pass
```

**Examples**:
- 3-Coloring: O(3^tw × n)
- Hamiltonian Path: O(tw! × 4^tw × n)
- Independent Set: O(2^tw × n)

## Pseudo-Polynomial Algorithms

For numeric problems, distinguish:
- **Polynomial in n** (input size in bits)
- **Polynomial in N** (numeric value)

### Knapsack

```python
def knapsack(weights, values, W):
    # O(nW) - polynomial in W (value), not in input size
    dp = [[0] * (W + 1) for _ in range(n + 1)]
    # ...
```

**Analysis**:
- Input: n items, W capacity
- W requires log(W) bits
- O(nW) = O(n × 2^(log W)) = exponential in input size!

**Weakly NP-hard**: NP-hard, but pseudo-polynomial algorithm exists.

### Strongly NP-hard

No pseudo-polynomial algorithm exists (unless P = NP).

**Examples**:
- 3-SAT
- Clique
- 3-Coloring
- TSP

## Parameterized Hardness

### W-Hierarchy

**W[1]**: Problems reducible to Clique

**W[2]**: Problems reducible to Dominating Set

**Believed**: FPT ⊊ W[1] ⊊ W[2] ⊊ ...

### W[1]-Hard Problems

Not believed to be FPT:
- Clique (parameter k = clique size)
- Independent Set (parameter k)
- Subgraph Isomorphism

### FPT Examples

Tractable with small parameter:
- Vertex Cover: O(2^k × n)
- Feedback Vertex Set: O(3.619^k × n)
- Graph Genus: O(2^O(k) × n)

## Hardness Assumptions

### P ≠ NP

Most fundamental assumption.

**Consequences**:
- SAT requires super-polynomial time
- Approximation lower bounds hold

### Exponential Time Hypothesis (ETH)

3-SAT requires 2^Ω(n) time.

**Consequences**:
- Clique requires 2^Ω(n) time
- No 2^o(n) algorithms for many problems

### Strong ETH (SETH)

k-SAT requires 2^(1-o(1))n time.

**Consequences**:
- Edit distance requires n^(2-o(1)) time
- Longest Common Subsequence requires n^(2-o(1)) time

### Unique Games Conjecture

Approximate a certain constraint satisfaction problem is hard.

**Consequences**:
- Vertex Cover: 2 is optimal ratio
- Max-Cut: Goemans-Williamson 0.878 is optimal

## Coping Strategies

### 1. Approximation

Accept near-optimal solutions.

**Example**: Vertex Cover 2-approximation

```python
def vertex_cover_approx(graph):
    cover = set()
    edges = list(graph.edges())

    for u, v in edges:
        if u not in cover and v not in cover:
            cover.add(u)
            cover.add(v)

    return cover  # At most 2× optimal
```

### 2. Parameterization

Exploit small parameters.

### 3. Heuristics

No guarantees, but often effective:
- Local search
- Genetic algorithms
- Simulated annealing

### 4. Exact Solvers

Modern SAT/ILP solvers handle large instances:
- CDCL (Conflict-Driven Clause Learning)
- Branch and bound
- Cutting planes

### 5. Preprocessing

Reduce instance size before solving.

**Kernelization**: Polynomial-time reduction to instance of size f(k).

## Summary

| Concept | Meaning |
|---------|---------|
| NP-Hard | At least as hard as NP-Complete |
| Strongly NP-Hard | No pseudo-poly algorithm |
| Weakly NP-Hard | Pseudo-poly exists |
| W[1]-Hard | Not likely FPT |
| APX-Hard | No PTAS unless P = NP |

Understanding hardness helps calibrate expectations: knowing a problem is NP-hard suggests investing in approximation, special cases, or heuristics rather than exact polynomial-time algorithms.
