# Polynomial Reductions

**Polynomial-time reductions** are the tool for proving NP-completeness. They transform instances of one problem into instances of another while preserving answers.

## Definition

A **polynomial-time reduction** from A to B (written A ≤_p B) is a function f: Σ* → Σ* such that:

1. f is computable in polynomial time
2. For all w: w ∈ A ⟺ f(w) ∈ B

## Meaning

A ≤_p B means "A is no harder than B":
- If we can solve B, we can solve A
- Transform A instance to B instance, solve B, get answer for A

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

**Goal**: Transform 3-SAT formula to graph + number.

**Construction**:
Given 3-SAT formula φ with m clauses:

1. For each clause Cᵢ = (ℓᵢ₁ ∨ ℓᵢ₂ ∨ ℓᵢ₃), create 3 vertices (i,1), (i,2), (i,3)

2. Add edge between (i,j) and (i',j') if:
   - i ≠ i' (different clauses)
   - ℓᵢⱼ and ℓᵢ'ⱼ' are not contradictory (not x and ¬x)

3. Output: (G, m)

**Correctness**:
- φ satisfiable ⟺ G has m-clique
- Clique vertices correspond to true literals, one per clause

## Example: CLIQUE ≤_p VERTEX-COVER

**Insight**: Clique in G ⟺ Independent set in G ⟺ Vertex cover in Ḡ (complement)

**Construction**:
Given (G, k), output (Ḡ, n-k) where n = |V|.

**Correctness**:
G has k-clique ⟺ Ḡ has (n-k)-vertex-cover

## Example: HAMPATH ≤_p TSP

**Construction**:
Given graph G:
1. Create complete graph G' on same vertices
2. Assign weight 1 to edges in G
3. Assign weight 2 to edges not in G
4. Set budget k = n (number of vertices)

**Correctness**:
G has Hamiltonian path ⟺ G' has tour of length ≤ n

## Reduction Gadgets

Many reductions use **gadgets**—small constructions encoding constraints:

- **Variable gadgets**: Encode Boolean variables
- **Clause gadgets**: Encode clause satisfaction
- **Connection gadgets**: Link components

## Tips for Finding Reductions

1. Start with known NP-complete problem close to target
2. Look for structural similarities
3. Map constraints to constraints
4. Ensure polynomial blowup

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

Must show both directions:
- x ∈ A → f(x) ∈ B (completeness)
- f(x) ∈ B → x ∈ A (soundness)

And show f is polynomial-time computable.
