# NP-Completeness

**NP-complete** problems are the "hardest" problems in NP. If any NP-complete problem has a polynomial-time algorithm, then P = NP.

## Definition

A language L is **NP-complete** if:
1. L ∈ NP (in NP)
2. For every A ∈ NP: A ≤_p L (NP-hard)

**NP-hard**: At least as hard as everything in NP.
**NP-complete**: NP-hard and in NP.

## Polynomial-Time Reductions

A ≤_p B (A reduces to B in polynomial time) if there exists polynomial-time computable f such that:

w ∈ A ⟺ f(w) ∈ B

Reductions are transitive: A ≤_p B and B ≤_p C implies A ≤_p C.

## The First NP-Complete Problem

**Cook-Levin Theorem** (1971): SAT is NP-complete.

**Proof idea**: Any NP verifier's computation can be encoded as a Boolean formula that's satisfiable iff the original instance is in the language.

## Proving NP-Completeness

To prove L is NP-complete:
1. Show L ∈ NP (give polynomial verifier)
2. Show known NP-complete problem reduces to L

If SAT ≤_p L and L ∈ NP, then L is NP-complete.

## Classic NP-Complete Problems

### SAT (Boolean Satisfiability)
Given Boolean formula φ, is there a satisfying assignment?

### 3-SAT
SAT restricted to clauses with exactly 3 literals.
3-SAT ≤_p SAT (special case)
SAT ≤_p 3-SAT (reduction)

### CLIQUE
Does graph G have a clique of size k?
3-SAT ≤_p CLIQUE

### VERTEX-COVER
Does graph G have a vertex cover of size k?
CLIQUE ≤_p VERTEX-COVER (complement relationship)

### HAMILTONIAN-PATH
Does graph G have a Hamiltonian path?
3-SAT ≤_p HAMPATH

### SUBSET-SUM
Given set S and target t, is there subset summing to t?
3-SAT ≤_p SUBSET-SUM

### TRAVELING SALESMAN (Decision)
Is there a tour of length ≤ k?
HAMPATH ≤_p TSP

### GRAPH-COLORING
Can G be colored with k colors?
3-SAT ≤_p 3-COLORING

## The Web of Reductions

Cook's theorem established SAT as NP-complete. Thousands of problems have been shown NP-complete by reduction chains:

SAT → 3-SAT → CLIQUE → VERTEX-COVER
       ↓
    HAMPATH → TSP
       ↓
    SUBSET-SUM → KNAPSACK

## Consequences of NP-Completeness

If L is NP-complete:
- L ∈ P ⟹ P = NP
- L ∉ P ⟺ P ≠ NP (assuming it)
- No known polynomial algorithm
- Unlikely to find one

## Dealing with NP-Complete Problems

Practical approaches:
1. **Approximation**: Find near-optimal solutions
2. **Heuristics**: Fast algorithms without guarantees
3. **Special cases**: Identify tractable subproblems
4. **Parameterized**: Fix some parameter
5. **Randomization**: Accept probabilistic guarantees
6. **Exponential but smart**: Exact algorithms with good constants

## NP-Hard vs NP-Complete

**NP-hard**: As hard as NP (may not be in NP)
**NP-complete**: NP-hard AND in NP

Examples:
- Halting problem: NP-hard, not in NP (undecidable)
- Optimization TSP: NP-hard, not in NP (not decision)
- TSP decision: NP-complete

## Historical Impact

NP-completeness theory:
- Unified thousands of problems
- Provided framework for "hardness"
- Guides algorithm design
- Foundation of complexity theory
