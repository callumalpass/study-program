# Class NP

**NP** (Nondeterministic Polynomial Time) is the class of problems where solutions can be verified quickly, even if finding solutions may be hard.

## Definition via Verifiers

A **verifier** for language L is algorithm V where:

L = {w | ∃c : V accepts (w, c)}

Here c is a **certificate** (proof/witness) for membership.

V is a **polynomial-time verifier** if V runs in polynomial time in |w|.

## Formal Definition

**NP** = {L | L has a polynomial-time verifier}

Equivalently: L ∈ NP if ∃ polynomial p, polynomial-time V such that:

w ∈ L ⟺ ∃c (|c| ≤ p(|w|) and V(w,c) accepts)

## Alternative Definition

**NP** = languages decidable in polynomial time by a **nondeterministic** TM.

The NTM "guesses" a certificate, then verifies it.

## Examples in NP

### SAT (Satisfiability)
**SAT** = {φ | Boolean formula φ is satisfiable}

Certificate: A satisfying assignment
Verification: Check assignment satisfies φ in O(|φ|)

### CLIQUE
**CLIQUE** = {⟨G, k⟩ | G has a clique of size k}

Certificate: k vertices forming the clique
Verification: Check all pairs are connected in O(k²)

### HAMPATH (Hamiltonian Path)
**HAMPATH** = {⟨G, s, t⟩ | G has Hamiltonian path from s to t}

Certificate: The path (sequence of vertices)
Verification: Check it's a valid path visiting all vertices

### SUBSET-SUM
**SUBSET-SUM** = {⟨S, t⟩ | subset of S sums to t}

Certificate: The subset
Verification: Sum the elements, compare to t

### COMPOSITE
**COMPOSITE** = {n | n is composite}

Certificate: A factor d (1 < d < n)
Verification: Check d divides n

## P ⊆ NP

Every problem in P is also in NP:
- If L ∈ P, decide membership directly
- Verifier can ignore certificate and just decide
- Trivially verifiable in polynomial time

## NP and Certificates

Key insight: NP captures problems where:
- Solutions may be hard to find
- Solutions are easy to check
- "Finding vs checking" asymmetry

## coNP

**coNP** = {L | L̄ ∈ NP}

Languages whose complement has polynomial verifiers.

Examples:
- TAUTOLOGY = {φ | φ is always true}
- UNSAT = {φ | φ is unsatisfiable}
- PRIMES (also in P, but instructive)

## NP ∩ coNP

Problems in both NP and coNP:
- Have polynomial verifiers for YES and NO instances
- May or may not be in P

Example: FACTORING (believed in NP ∩ coNP but not P)

## Why NP Matters

NP contains:
- Optimization problems (scheduling, routing)
- Constraint satisfaction
- Verification tasks
- Many practical problems

Understanding NP is central to algorithm design.

## NP is Not "Non-Polynomial"

Common misconception: "NP = non-polynomial time"

Reality: NP = Nondeterministic Polynomial time
- May be solvable in polynomial time (if P = NP)
- Verification is polynomial, not necessarily solution
