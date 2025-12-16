# Class P

**P** (Polynomial Time) is the class of problems solvable in polynomial time by a deterministic Turing machine. It represents "efficiently solvable" problems.

## Formal Definition

**P** = ⋃_{k≥0} TIME(n^k)

A language L is in P if there exists:
- A deterministic TM M deciding L
- A polynomial p(n) such that M runs in O(p(n)) time

## Intuition

Problems in P:
- Have "efficient" algorithms
- Running time doesn't explode with input size
- Practically solvable for reasonable inputs

## Examples in P

### Path Finding
**PATH** = {⟨G, s, t⟩ | directed graph G has path from s to t}

Algorithm: BFS/DFS in O(V + E) time.

### Sorting
**SORTING** = {(a₁,...,aₙ) | input can be sorted}

Algorithm: Merge sort in O(n log n).

### Primality Testing
**PRIMES** = {n | n is prime}

Algorithm: AKS primality test in O(n¹²) (polynomial in input length).

### Context-Free Language Recognition
**CFL** membership in O(n³) via CYK algorithm.

### Linear Programming
Solvable in polynomial time (ellipsoid method, interior point methods).

### Matching
**BIPARTITE-MATCHING** = {⟨G, k⟩ | G has matching of size ≥ k}

Algorithm: Hopcroft-Karp in O(E√V).

## Problems Not Known to Be in P

- SAT (Boolean satisfiability)
- Traveling Salesman (optimization)
- Graph Coloring
- Hamiltonian Path
- Integer Factorization

These are in NP but not known to be in P.

## P and Polynomial Equivalence

P is robust under polynomial transformations:
- If L₁ ∈ P and L₂ reduces to L₁ in polynomial time, then L₂ ∈ P

## Properties of P

P is closed under:
- Union
- Intersection
- Complement
- Concatenation
- Kleene star
- Polynomial-time reductions

## Extended Church-Turing Thesis (for P)

"Any problem efficiently solvable in the real world is solvable in polynomial time by a TM."

This stronger thesis is debated (quantum computers may violate it).

## Why Polynomial?

Arguments for polynomial time as "efficient":
- Composition: polynomial composed with polynomial is polynomial
- Model independence: P same across reasonable models
- Practical threshold: low-degree polynomials are feasible

Criticisms:
- O(n¹⁰⁰) is "polynomial" but impractical
- O(1.001ⁿ) is "exponential" but often tractable

## P-Complete Problems

A problem is **P-complete** if:
- It's in P
- Every problem in P reduces to it (under log-space reductions)

Example: Circuit Value Problem (CVP)

P-complete problems are "hardest" in P; unlikely to be parallelizable.

## P vs Other Classes

- P ⊆ NP (can verify in polynomial time)
- P ⊆ PSPACE (polynomial time uses polynomial space)
- P ⊆ EXPTIME (polynomial < exponential)

The P vs NP question asks: Does P = NP?
