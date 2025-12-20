# Class P

**P** (Polynomial Time) is the class of problems solvable in polynomial time by a deterministic Turing machine. It represents "efficiently solvable" problems and forms one of the most fundamental concepts in computational complexity theory.

The class P captures our intuitive notion of tractability—problems we can realistically solve even for large inputs. While the definition uses Turing machines, P remains the same across virtually all reasonable computational models, making it a robust and model-independent concept. This universality is one reason why P is considered such a natural complexity class.

## Formal Definition

$$
\mathbf{P} = \bigcup_{k \geq 0} \mathbf{TIME}(n^k)
$$

A language $L$ is in $\mathbf{P}$ if there exists:
- A deterministic TM $M$ deciding $L$
- A polynomial $p(n)$ such that $M$ runs in $O(p(n))$ time

The union is over all fixed polynomials, meaning that any fixed-degree polynomial is acceptable. Whether an algorithm runs in $O(n^2)$, $O(n^{10})$, or even $O(n^{100})$ time, it's still in P. While this definition might seem overly generous (since $O(n^{100})$ is impractical), in practice most polynomial-time algorithms have relatively small exponents.

## Intuition

Problems in P:
- Have "efficient" algorithms that scale well
- Running time doesn't explode exponentially with input size
- Practically solvable for reasonable inputs in most cases
- Remain manageable even as problems grow larger

## Examples in P

### Path Finding
**PATH** = {⟨G, s, t⟩ | directed graph G has path from s to t}

Algorithm: BFS/DFS in O(V + E) time.

### Sorting
**SORTING** = {(a₁,...,aₙ) | input can be sorted}

Algorithm: Merge sort in O(n log n).

### Primality Testing
**PRIMES** = {n | n is prime}

Algorithm: AKS primality test in $O((\log n)^{12})$ polynomial in input length.

For many years, primality testing was not known to be in P. Probabilistic algorithms could test primality efficiently, but the first deterministic polynomial-time algorithm wasn't discovered until 2002 (the AKS algorithm by Agrawal, Kayal, and Saxena). This demonstrates that membership in P isn't always obvious and sometimes requires breakthrough insights.

### Context-Free Language Recognition
**CFL** membership testing: Given a context-free grammar $G$ and string $w$, does $G$ generate $w$?

Algorithm: CYK (Cocke-Younger-Kasami) algorithm in $O(n^3)$ time using dynamic programming.

### Linear Programming
Linear programming is the problem of optimizing a linear objective function subject to linear constraints. Despite having exponential-time worst-case algorithms initially (simplex method), polynomial-time algorithms were discovered:

- **Ellipsoid method** (Khachiyan, 1979): First polynomial-time algorithm
- **Interior point methods** (Karmarkar, 1984): Practical and efficient

This shows that some optimization problems can be solved efficiently, contrary to initial expectations.

### Matching
**BIPARTITE-MATCHING** = {⟨G, k⟩ | bipartite graph G has matching of size ≥ k}

Algorithm: Hopcroft-Karp in $O(E\sqrt{V})$ time.

Maximum matching in general graphs is also in P via Edmonds' blossom algorithm, demonstrating that some graph problems that seem complex can still be solved efficiently.

## Problems Not Known to Be in P

Despite decades of research, many important problems are not known to be in P:

- **SAT** (Boolean satisfiability): Is there an assignment making a Boolean formula true?
- **Traveling Salesman Problem**: Find shortest tour visiting all cities
- **Graph k-Coloring**: Can a graph be colored with k colors (k ≥ 3)?
- **Hamiltonian Path**: Does a graph have a path visiting each vertex exactly once?
- **Integer Factorization**: Find prime factors of a composite number

Most of these problems are in NP (some are NP-complete). The question of whether they're also in P is related to the famous P vs NP problem. Integer factorization is particularly interesting—it's in NP but not believed to be NP-complete, occupying an intermediate position.

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

P relates to other complexity classes in important ways:

- $\mathbf{P} \subseteq \mathbf{NP}$: If we can solve a problem in polynomial time, we can certainly verify solutions in polynomial time
- $\mathbf{P} \subseteq \mathbf{PSPACE}$: Any computation running in polynomial time uses at most polynomial space
- $\mathbf{P} \subseteq \mathbf{EXPTIME}$: Polynomial-time is strictly less than exponential time

The most famous open question in computer science asks: Does $\mathbf{P} = \mathbf{NP}$? This question has profound implications for cryptography, optimization, and our understanding of computational limits.

## Key Takeaways

- P captures the notion of efficiently solvable problems using deterministic algorithms
- Polynomial-time complexity is robust across different computational models
- Many practical problems have polynomial-time solutions (sorting, graph connectivity, matching, linear programming)
- The boundary between P and problems outside P remains unclear for many important problems
- P is closed under all standard operations (union, intersection, complement, concatenation)
- Understanding P is essential for algorithm design and complexity theory
- The Extended Church-Turing Thesis suggests P captures all "efficiently solvable" problems in practice
