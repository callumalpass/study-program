---
id: cs203-t7-reductions
title: "Polynomial Reductions"
order: 6
---

# Polynomial Reductions

**Polynomial-time reductions** are the fundamental tool for proving NP-completeness and comparing the relative difficulty of computational problems. They transform instances of one problem into instances of another while preserving answers, allowing us to transfer algorithms and hardness results between problems.

Reductions are central to complexity theory because they formalize the intuition that one problem is "at least as hard" as another. If we can reduce problem A to problem B, then any algorithm solving B can be used to solve A, and any lower bound for A also applies to B. This makes reductions invaluable for both algorithm design and complexity classification.

## Definition

A **polynomial-time reduction** from A to B (written A ≤_p B) is a function f: Σ* → Σ* such that:

1. f is computable in polynomial time
2. For all w: w ∈ A ⟺ f(w) ∈ B

## Meaning

$A \leq_p B$ means "A is no harder than B" or "B is at least as hard as A":
- If we can solve B efficiently, we can solve A efficiently
- To solve an instance of A: transform it to an instance of B, solve B, and use that answer for A
- Computational effort: $O(\text{time for } f) + O(\text{time to solve } B)$

Intuitively, a reduction shows that B is powerful enough to express A. If B were easy, then A would be easy too. Conversely, if A is hard, then B must be hard.

## Properties

**Transitivity**: A ≤_p B and B ≤_p C implies A ≤_p C

**Proof**: Compose reductions. f composed with g is polynomial (polynomial of polynomial).

**Preservation**: If A ≤_p B and B ∈ P, then A ∈ P.

## Reduction Strategy

To reduce A to B:

1. Take arbitrary instance x of A
2. Transform x to instance f(x) of B
3. Prove: x ∈ A ⟺ f(x) ∈ B
4. Show f computable in polynomial time

## Example: 3-SAT ≤_p CLIQUE

This classic reduction demonstrates how to transform a logic problem into a graph problem.

**Goal**: Transform 3-SAT formula to graph + number such that the formula is satisfiable iff the graph has a clique of the specified size.

**Construction**:
Given 3-SAT formula $\varphi$ with m clauses $C_1, C_2, \ldots, C_m$:

1. For each clause $C_i = (\ell_{i,1} \vee \ell_{i,2} \vee \ell_{i,3})$, create 3 vertices labeled $(i,1), (i,2), (i,3)$ representing the three literals.

2. Add an edge between vertices $(i,j)$ and $(i',j')$ if and only if:
   - $i \neq i'$ (the vertices come from different clauses), AND
   - $\ell_{i,j}$ and $\ell_{i',j'}$ are not contradictory (not of the form $x$ and $\neg x$)

3. Output the graph $G$ and the target clique size $k = m$.

**Correctness**:
- **Forward direction**: If $\varphi$ is satisfiable, pick one true literal from each clause. The corresponding m vertices form a clique (they're all connected because they're from different clauses and don't contradict).
- **Reverse direction**: If G has an m-clique, it must contain exactly one vertex from each clause (since vertices in the same clause aren't connected). Set the corresponding literals to true—this satisfies $\varphi$ with no contradictions (since contradictory literals aren't connected).

**Polynomial time**: Creating the graph takes $O(m^2)$ time (checking all pairs of clauses).

## Example: CLIQUE ≤_p VERTEX-COVER

This reduction exploits the relationship between cliques and independent sets through graph complements.

**Key insight**: A set S is a clique in G if and only if S is an independent set (no edges) in the complement graph $\overline{G}$. Furthermore, if S is an independent set in G, then $V \setminus S$ is a vertex cover in G.

**Construction**:
Given $(G, k)$, construct $(\overline{G}, n-k)$ where:
- $\overline{G}$ is the complement graph (edges become non-edges and vice versa)
- $n = |V|$ is the number of vertices

**Correctness**:
- A k-clique in G is a set of k vertices that are all pairwise connected in G
- These same k vertices have no edges between them in $\overline{G}$ (independent set)
- The remaining $n-k$ vertices must cover all edges in $\overline{G}$ (vertex cover)
- Thus: G has k-clique $\iff$ $\overline{G}$ has $(n-k)$-vertex cover

**Polynomial time**: Computing the complement graph takes $O(n^2)$ time.

## Example: HAMPATH ≤_p TSP

This reduction transforms the Hamiltonian Path problem (existence) into the Traveling Salesman Problem (optimization converted to decision).

**Construction**:
Given graph $G = (V, E)$:
1. Create complete graph $G'$ on the same vertex set V
2. Assign edge weights:
   - Weight 1 to edges that exist in G (edges in E)
   - Weight 2 to edges that don't exist in G (edges not in E)
3. Set budget $k = n$ where $n = |V|$ is the number of vertices

**Correctness**:
- A Hamiltonian path in G visits all n vertices exactly once using only edges from E
- This corresponds to a tour in $G'$ of length exactly n (using n edges of weight 1)
- Any tour using an edge not in G has length > n
- Thus: G has Hamiltonian path $\iff$ $G'$ has tour of length $\leq n$

**Polynomial time**: Creating the complete graph and assigning weights takes $O(n^2)$ time.

## Reduction Gadgets

Many sophisticated reductions use **gadgets**—small substructures that encode logical or combinatorial constraints. Gadgets are building blocks that ensure the reduction preserves the problem structure.

Common types of gadgets:

- **Variable gadgets**: Encode Boolean variables and force a choice between true/false. For example, in graph reductions, a variable gadget might be a path where choosing one direction means "true" and the other means "false."

- **Clause gadgets**: Encode satisfaction of logical clauses. They're designed so that at least one literal in the clause must be satisfied.

- **Connection gadgets**: Link different parts of the construction, ensuring that choices made in one gadget propagate correctly to others.

- **Consistency gadgets**: Enforce that the same variable has the same value throughout the construction.

The art of designing reductions often lies in finding clever gadgets that naturally express the constraints of the source problem in the target problem's language.

## Tips for Finding Reductions

Creating reductions is both science and art. Here are strategies that often work:

1. **Start with the right source**: Choose a known NP-complete problem that's structurally similar to your target. For graph problems, start with CLIQUE, VERTEX-COVER, or 3-COLORING. For numerical problems, try SUBSET-SUM or 3-SAT.

2. **Look for structural similarities**: Identify what makes both problems hard. Do they both involve selection? Assignment? Ordering? Path-finding?

3. **Map constraints to constraints**: The key is to ensure that constraints in the source problem correspond to constraints in the target problem. Each restriction in one problem should translate naturally to the other.

4. **Ensure polynomial blowup**: Your construction must not create exponentially large instances. Typically, the reduction should produce instances whose size is polynomial in the input size.

5. **Work through examples**: Before proving general correctness, construct the reduction for small concrete examples to build intuition.

## Karp Reductions vs Cook Reductions

**Karp (many-one) reduction**: Single transformation, same answer
**Cook (Turing) reduction**: Multiple oracle queries allowed

For NP-completeness, usually use Karp reductions.

## Reductions and Hardness

If A is NP-complete and A ≤_p B:
- B is NP-hard
- If also B ∈ NP, then B is NP-complete

This is how we prove new problems NP-complete.

## Common Reduction Patterns

1. **Direct encoding**: Translate constraints literally
2. **Complement**: Use relationship between problem and complement
3. **Restriction**: Show problem contains hard subproblem
4. **Local replacement**: Replace parts of instances systematically

## Proving Reductions Correct

A complete reduction proof requires three components:

1. **Completeness** ($x \in A \Rightarrow f(x) \in B$): Show that YES instances of A map to YES instances of B. If x is in A, prove that f(x) is in B by showing how a solution to x translates to a solution for f(x).

2. **Soundness** ($f(x) \in B \Rightarrow x \in A$): Show that NO instances of A map to NO instances of B (equivalently, YES instances of B come from YES instances of A). If f(x) is in B, prove that x must be in A by showing how a solution to f(x) translates back to a solution for x.

3. **Polynomial time**: Show that f is computable in polynomial time by analyzing the construction algorithm. Count the number of steps and the size of the output.

Both directions are essential—without soundness, the reduction could map everything to a single YES instance of B, which would be useless. Without completeness, the reduction wouldn't preserve the YES instances we care about.

## Key Takeaways

- Polynomial reductions are the fundamental tool for comparing problem difficulty
- A reduction from A to B shows that B is at least as hard as A
- Transitivity allows building chains of reductions from known hard problems
- Classic reductions (3-SAT to CLIQUE, CLIQUE to VERTEX-COVER, HAMPATH to TSP) illustrate key techniques
- Gadgets are modular building blocks that encode constraints in reductions
- Finding reductions requires identifying structural similarities between problems
- Karp reductions (single transformation) are standard for NP-completeness proofs
- A correct reduction proof requires completeness, soundness, and polynomial-time verification
- Reductions guide both theoretical complexity classification and practical algorithm design
