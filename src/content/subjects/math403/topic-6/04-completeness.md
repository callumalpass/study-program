# Completeness

Completeness is a fundamental property of metric spaces that ensures Cauchy sequences converge, making it essential for analysis and the study of function spaces. The concept bridges the gap between the algebraic notion of "eventually getting close together" (Cauchy sequences) and the topological notion of convergence, providing the foundation for fixed point theorems, differential equations, and functional analysis.

## Historical Context

The distinction between Cauchy sequences and convergent sequences became clear in the 19th century when mathematicians recognized that $\mathbb{Q}$ (the rationals) contains Cauchy sequences that don't converge within $\mathbb{Q}$ itself. This observation led Cantor and Dedekind to construct the real numbers as the "completion" of the rationals, making completeness a cornerstone of real analysis. The abstract notion of completeness in metric spaces was formalized in the early 20th century.

## Definition

**Definition:** A metric space (X, d) is **complete** if every Cauchy sequence in X converges to a point in X.

**Intuition:** In a complete space, there are no "gaps"—whenever a sequence's terms get arbitrarily close to each other, they must be approaching some point in the space. Completeness is not a topological property but rather a metric property: it depends on the specific metric, not just the topology.

## Examples of Complete Spaces

### Example 1: Real Numbers
$\mathbb{R}$ with the standard metric is complete. This is the **Completeness Axiom** (or Dedekind completeness) of real analysis, which can be taken as an axiom or proved from other constructions of $\mathbb{R}$.

This completeness is what makes $\mathbb{R}$ suitable for doing analysis—it has no "holes" where limits should be.

### Example 2: Euclidean Space
$\mathbb{R}^n$ with the Euclidean metric is complete.

*Proof:* A sequence $(x_k)$ in $\mathbb{R}^n$ is Cauchy if and only if each coordinate sequence is Cauchy in $\mathbb{R}$. By completeness of $\mathbb{R}$, each coordinate sequence converges. Therefore, the full sequence converges in $\mathbb{R}^n$.

### Example 3: Closed Subsets
A closed subset of a complete metric space is complete (see theorem below).

**Example:** $[0, 1] \subseteq \mathbb{R}$ is complete because it's a closed subset of the complete space $\mathbb{R}$.

### Example 4: Discrete Spaces
Any metric space with the discrete metric is complete. Every Cauchy sequence in a discrete metric space is eventually constant: if $d(x_m, x_n) < 1$ for large m, n, then $x_m = x_n$ by the definition of the discrete metric.

### Example 5: Function Spaces
$C[a, b]$ with the supremum metric $d(f, g) = \sup_{x \in [a,b]} |f(x) - g(x)|$ is complete.

*Proof Sketch:* If $(f_n)$ is Cauchy, then for each $x \in [a,b]$, the sequence $(f_n(x))$ is Cauchy in $\mathbb{R}$, so it converges to some $f(x)$. The uniform Cauchy condition ensures that this pointwise limit f is continuous and that $f_n \to f$ uniformly.

This completeness is fundamental for proving existence theorems for differential and integral equations.

### Example 6: $\ell^p$ Spaces
For $1 \leq p < \infty$, the space $\ell^p = \{(x_n) : \sum |x_n|^p < \infty\}$ with metric $d(x, y) = (\sum |x_n - y_n|^p)^{1/p}$ is complete. These sequence spaces are fundamental in functional analysis and quantum mechanics.

## Non-Examples

### Example 7: Open Intervals
$(0, 1)$ with the standard metric is not complete. The sequence $x_n = 1/n$ is Cauchy but doesn't converge in $(0, 1)$ (it converges to 0, which is not in the space).

This demonstrates that completeness is not inherited by arbitrary subspaces—only closed subspaces.

### Example 8: Rationals
$\mathbb{Q}$ with the standard metric is not complete. Sequences of rationals converging to irrational numbers (like $\sqrt{2}$ or $e$) are Cauchy in $\mathbb{Q}$ but don't converge to points in $\mathbb{Q}$.

The completion of $\mathbb{Q}$ is $\mathbb{R}$, illustrating the general completion construction.

### Example 9: $C[a, b]$ with $L^1$ Metric
$C[a, b]$ with the $L^1$ metric $d(f, g) = \int_a^b |f(x) - g(x)| dx$ is not complete. Sequences of continuous functions can be Cauchy in this metric yet converge (in $L^1$) to discontinuous functions.

This shows the importance of the choice of metric—the same set can be complete or incomplete depending on the metric.

## Completeness and Closed Sets

**Theorem:** A subspace Y of a complete metric space X is complete if and only if Y is closed in X.

This theorem characterizes completeness for subspaces entirely in topological terms.

*Proof (⟹):* Suppose Y is complete. Let $(y_n)$ be a sequence in Y converging to some $x \in X$.

Then $(y_n)$ is Cauchy (convergent sequences are Cauchy). Since Y is complete and $(y_n) \subseteq Y$, the sequence converges to some point in Y. By uniqueness of limits, $x \in Y$.

Thus Y contains all limits of convergent sequences in Y, so Y is closed.

*Proof (⟸):* Suppose Y is closed. Let $(y_n)$ be a Cauchy sequence in Y.

Since $(y_n)$ is also Cauchy in X and X is complete, $(y_n)$ converges to some $x \in X$.

Since Y is closed and $(y_n) \subseteq Y$, we have $x \in Y$.

Therefore, every Cauchy sequence in Y converges to a point in Y, proving Y is complete.

**Application:** This theorem gives an easy way to verify completeness of many spaces. For instance, any closed ball in $\mathbb{R}^n$ is complete.

## Completion of a Metric Space

**Theorem:** Every metric space has a **completion**: a complete metric space containing it as a dense subspace.

Moreover, the completion is unique up to isometry.

**Construction Outline:** The completion $\hat{X}$ of X consists of equivalence classes of Cauchy sequences in X, where $(x_n) \sim (y_n)$ if $\lim_{n \to \infty} d(x_n, y_n) = 0$.

**Proof that $\sim$ is an equivalence relation:**
- Reflexive: $d(x_n, x_n) = 0 \to 0$
- Symmetric: $d(x_n, y_n) = d(y_n, x_n)$
- Transitive: If $d(x_n, y_n) \to 0$ and $d(y_n, z_n) \to 0$, then by the triangle inequality, $d(x_n, z_n) \leq d(x_n, y_n) + d(y_n, z_n) \to 0$

The metric on $\hat{X}$ is:
$$\hat{d}([(x_n)], [(y_n)]) = \lim_{n \to \infty} d(x_n, y_n)$$

This limit exists because $|d(x_m, y_m) - d(x_n, y_n)| \leq d(x_m, x_n) + d(y_m, y_n)$, making $(d(x_n, y_n))$ a Cauchy sequence in $\mathbb{R}$.

**Embedding X in $\hat{X}$:** Each $x \in X$ corresponds to the equivalence class of the constant sequence $(x, x, x, \ldots)$.

**Example:** The completion of $\mathbb{Q}$ is $\mathbb{R}$. The completion of $(0, 1)$ is $[0, 1]$.

## Completeness and Compactness

**Theorem:** A compact metric space is complete.

*Proof:* Let $(x_n)$ be Cauchy in a compact space X.

By compactness, some subsequence $x_{n_k} \to x \in X$.

**Claim:** The entire sequence converges to x.

Given $\epsilon > 0$, there exists N such that $d(x_m, x_n) < \epsilon/2$ for all $m, n \geq N$ (Cauchy condition).

Also, there exists K such that $d(x_{n_k}, x) < \epsilon/2$ for all $k \geq K$ (subsequence convergence).

Choose $k$ large enough that $n_k \geq N$ and $k \geq K$. For any $n \geq N$:
$$d(x_n, x) \leq d(x_n, x_{n_k}) + d(x_{n_k}, x) < \frac{\epsilon}{2} + \frac{\epsilon}{2} = \epsilon$$

Therefore $x_n \to x$.

**Converse:** Completeness alone does not imply compactness. For instance, $\mathbb{R}$ is complete but not compact.

**Theorem:** A metric space is compact if and only if it is complete and totally bounded.

## Totally Bounded Spaces

**Definition:** A metric space X is **totally bounded** if for every $\epsilon > 0$, X can be covered by finitely many $\epsilon$-balls.

**Intuition:** Total boundedness means the space can be approximated arbitrarily well by finitely many points—it has "finite complexity at every scale."

**Theorem:** Every totally bounded metric space is bounded.

*Proof:* Taking $\epsilon = 1$, there exist $x_1, \ldots, x_n$ such that $X = \bigcup_{i=1}^n B(x_i, 1)$.

Let $M = \max_{i,j} d(x_i, x_j) + 2$. For any $x, y \in X$, there exist i, j with $x \in B(x_i, 1)$ and $y \in B(x_j, 1)$, so:
$$d(x, y) \leq d(x, x_i) + d(x_i, x_j) + d(x_j, y) < 1 + M - 2 + 1 = M$$

**Example:** $[0, 1]$ is totally bounded. For any $\epsilon > 0$, finitely many intervals of length $\epsilon$ cover $[0, 1]$.

**Non-Example:** $\mathbb{R}$ is not totally bounded (cannot be covered by finitely many balls of radius 1).

**Theorem:** A metric space is compact ⟺ complete + totally bounded.

This characterization is often the easiest way to prove compactness in metric spaces.

## The Cantor Intersection Theorem

**Theorem (Cantor):** Let (X, d) be a complete metric space, and let $F_1 \supseteq F_2 \supseteq F_3 \supseteq \cdots$ be a nested sequence of non-empty closed sets with $\text{diam}(F_n) \to 0$. Then $\bigcap_{n=1}^\infty F_n$ contains exactly one point.

*Proof:* Choose $x_n \in F_n$ for each n.

**Claim:** $(x_n)$ is Cauchy.

For $m, n \geq N$, we have $x_m, x_n \in F_N$ (by nesting), so $d(x_m, x_n) \leq \text{diam}(F_N) \to 0$.

By completeness, $x_n \to x$ for some $x \in X$.

**Claim:** $x \in F_k$ for all k.

For any k, the sequence $(x_n)_{n \geq k}$ lies entirely in $F_k$. Since $F_k$ is closed, $x \in F_k$.

**Claim:** The point x is unique.

If $y \in \bigcap F_n$, then $d(x, y) \leq \text{diam}(F_n) \to 0$, so $x = y$.

**Application:** This theorem is crucial for proving existence of solutions in many contexts, including the Banach fixed point theorem and constructions in fractal geometry.

## Applications

Completeness is essential for:

1. **Fixed point theorems (Banach):** The contraction mapping theorem requires completeness
2. **Existence theorems for differential equations:** The Picard-Lindelöf theorem uses completeness of function spaces
3. **Functional analysis:** Banach spaces (complete normed vector spaces) and Hilbert spaces (complete inner product spaces) form the foundation
4. **Baire category theorem:** Requires completeness (or local compactness)
5. **Implicit function theorem:** Relies on completeness for iterative solution methods
6. **Approximation theory:** Completeness ensures that approximation processes converge

## Key Takeaways

- Complete spaces have no "gaps"—every Cauchy sequence converges
- $\mathbb{R}$, $\mathbb{R}^n$, and $C[a,b]$ with the supremum metric are complete
- Closed subspaces of complete spaces are complete; open subspaces generally are not
- Every metric space has a unique (up to isometry) completion
- Compactness implies completeness, and compactness equals completeness plus total boundedness
- The Cantor Intersection Theorem characterizes completeness via nested closed sets
- Completeness is fundamental for analysis, providing the foundation for fixed point theorems and existence results
