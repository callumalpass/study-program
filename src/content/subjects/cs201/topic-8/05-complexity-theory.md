# Complexity Theory Fundamentals

Complexity theory classifies problems by inherent computational difficulty, revealing fundamental limits of efficient computation.

## Complexity Classes

### Class P (Polynomial Time)

Problems solvable by deterministic Turing machine in polynomial time.

**Examples in P**:
- Sorting: O(n log n)
- Shortest path: O(V² or E log V)
- Matching: O(V³)
- Linear programming: O(n³L) where L = input bits
- Primality testing: O(log⁶ n)

**Intuition**: P = "efficiently solvable"

### Class NP (Nondeterministic Polynomial)

Problems where solutions can be **verified** in polynomial time.

**Formal definition**: Solvable by nondeterministic TM in polynomial time.

**Equivalent definition**: Given a certificate, verify in polynomial time.

**Examples in NP**:
- SAT: Given assignment, check if formula satisfied
- Clique: Given vertex set, check if complete subgraph
- Hamiltonian Path: Given path, check if valid
- Subset Sum: Given subset, check if sums to target

**Note**: P ⊆ NP (if solvable in P, can verify by solving)

### The P vs NP Question

**Open problem**: Does P = NP?

**If P = NP**:
- Every verifiable problem is efficiently solvable
- Cryptography breaks (RSA, etc.)
- Mathematical proofs could be found automatically

**Most believe P ≠ NP**, but no proof exists.

## NP-Completeness

### Definition

A problem is **NP-Complete** if:
1. It's in NP (verifiable in polynomial time)
2. Every NP problem reduces to it in polynomial time

**Significance**: If any NP-Complete problem is in P, then P = NP.

### Cook-Levin Theorem

SAT is NP-Complete (first proven NP-Complete problem).

**SAT**: Given boolean formula, is there a satisfying assignment?

```
(x₁ ∨ ¬x₂ ∨ x₃) ∧ (¬x₁ ∨ x₂) ∧ (x₂ ∨ ¬x₃)
```

### Proving NP-Completeness

To show problem X is NP-Complete:
1. Show X ∈ NP (give polynomial verifier)
2. Reduce known NP-Complete problem Y to X
   - Transform Y instance to X instance in polynomial time
   - Y has solution iff X has solution

### Common NP-Complete Problems

| Problem | Description |
|---------|-------------|
| SAT | Boolean satisfiability |
| 3-SAT | SAT with 3 literals per clause |
| Clique | Find complete subgraph of size k |
| Vertex Cover | Cover all edges with k vertices |
| Hamiltonian Path | Visit all vertices exactly once |
| TSP (decision) | Tour of length ≤ k |
| Subset Sum | Subset summing to target |
| 3-Coloring | Color graph with 3 colors |
| Partition | Divide into two equal-sum subsets |
| Knapsack (0/1) | Maximize value ≤ capacity |

### Reduction Example: 3-SAT to Clique

**3-SAT**: CNF formula with 3 literals per clause

**Clique**: Graph G, integer k; is there complete subgraph of size k?

**Reduction**:
1. For each clause Cᵢ, create 3 vertices (one per literal)
2. Connect vertices from different clauses unless contradictory
3. Set k = number of clauses

**Proof**: Satisfying assignment picks one true literal per clause; these form a clique.

## Beyond NP

### Co-NP

Problems whose complements are in NP.

**Example**: "Is this formula unsatisfiable?"

**P ⊆ NP ∩ co-NP** (likely proper subset)

### NP-Hard

At least as hard as NP-Complete, but not necessarily in NP.

**Examples**:
- TSP optimization (find shortest tour)
- Halting problem (undecidable!)

### PSPACE

Problems solvable with polynomial space (unlimited time).

**Contains**: P, NP, co-NP

**PSPACE-Complete examples**:
- Quantified Boolean Formula (QBF)
- Generalized chess

### EXPTIME

Problems solvable in exponential time.

**Contains**: PSPACE

**EXPTIME-Complete**: Problems requiring exponential time.

## Hierarchy

```
P ⊆ NP ⊆ PSPACE ⊆ EXPTIME
P ⊆ co-NP ⊆ PSPACE ⊆ EXPTIME
```

**Known**: P ⊊ EXPTIME (strict containment)
**Unknown**: P vs NP, NP vs PSPACE

## Practical Implications

### What to Do with NP-Complete Problems?

1. **Small inputs**: Exponential algorithms may be acceptable
2. **Approximation**: Find near-optimal solutions
3. **Heuristics**: SAT solvers, genetic algorithms
4. **Special cases**: Problem may be in P for restricted inputs
5. **Randomization**: Monte Carlo, Las Vegas algorithms

### Recognizing NP-Completeness

**Warning signs**:
- "Find the best" or "find all"
- Combinatorial explosion of possibilities
- Similar to known NP-Complete problem

**What to do**:
- Don't spend months trying to find polynomial algorithm
- Consider approximation or special cases
- Use existing solvers (SAT, ILP)

## Parameterized Complexity

Some problems are tractable when a parameter is small.

**Fixed-Parameter Tractable (FPT)**: O(f(k) × poly(n))

**Example**: Vertex Cover
- NP-Complete in general
- O(2ᵏ × n) where k = cover size
- Tractable for small k

## Randomized Complexity

### BPP (Bounded-Error Probabilistic Polynomial)

Problems solvable with randomization, error probability < 1/3.

**Believed**: P ⊆ BPP ⊆ NP ∩ co-NP

### RP (Randomized Polynomial)

One-sided error: if answer is NO, always correct.

**Examples**: Polynomial identity testing

## Summary

| Class | Description | Example |
|-------|-------------|---------|
| P | Poly-time solvable | Sorting |
| NP | Poly-time verifiable | SAT |
| NP-Complete | Hardest in NP | 3-SAT, Clique |
| NP-Hard | ≥ NP-Complete | TSP optimization |
| PSPACE | Poly-space | QBF |
| EXPTIME | Exp-time | Generalized chess |

Understanding complexity classes helps recognize problem difficulty, avoid futile optimization attempts, and choose appropriate algorithmic strategies.
