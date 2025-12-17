# Completeness

Completeness is a fundamental property of metric spaces that ensures Cauchy sequences converge, making it essential for analysis and the study of function spaces.

## Definition

**Definition:** A metric space (X, d) is **complete** if every Cauchy sequence in X converges to a point in X.

## Examples of Complete Spaces

### Example 1: Real Numbers
$\mathbb{R}$ with the standard metric is complete. This is the **Completeness Axiom** of real analysis.

### Example 2: Euclidean Space
$\mathbb{R}^n$ with the Euclidean metric is complete.

### Example 3: Closed Subsets
A closed subset of a complete metric space is complete.

### Example 4: Discrete Spaces
Any metric space with the discrete metric is complete (every Cauchy sequence is eventually constant).

### Example 5: Function Spaces
$C[a, b]$ with the supremum metric is complete.

## Non-Examples

### Example 6: Open Intervals
$(0, 1)$ is not complete. The sequence $x_n = 1/n$ is Cauchy but doesn't converge in $(0, 1)$.

### Example 7: Rationals
$\mathbb{Q}$ is not complete. Sequences of rationals converging to $\sqrt{2}$ are Cauchy but don't converge in $\mathbb{Q}$.

## Completeness and Closed Sets

**Theorem:** A subspace Y of a complete metric space X is complete if and only if Y is closed in X.

*Proof (⟹):* Let $y_n \in Y$ converge to $x \in X$. Then $(y_n)$ is Cauchy. By completeness of Y, it converges in Y. By uniqueness of limits, $x \in Y$.

*Proof (⟸):* Let $(y_n)$ be Cauchy in Y. It's Cauchy in X, so it converges to some $x \in X$. Since Y is closed, $x \in Y$.

## Completion of a Metric Space

**Theorem:** Every metric space has a **completion**: a complete metric space containing it as a dense subspace.

**Construction:** The completion $\hat{X}$ of X consists of equivalence classes of Cauchy sequences in X, where $(x_n) \sim (y_n)$ if $d(x_n, y_n) \to 0$.

The metric on $\hat{X}$ is:
$$\hat{d}([(x_n)], [(y_n)]) = \lim_{n \to \infty} d(x_n, y_n)$$

**Theorem:** The completion is unique up to isometry.

## Completeness and Compactness

**Theorem:** A compact metric space is complete.

*Proof:* Let $(x_n)$ be Cauchy in a compact space X. By compactness, some subsequence $x_{n_k} \to x$. Since $(x_n)$ is Cauchy and has a convergent subsequence, the whole sequence converges to x.

**Theorem:** A metric space is compact if and only if it is complete and totally bounded.

## Totally Bounded Spaces

**Definition:** A metric space X is **totally bounded** if for every $\epsilon > 0$, X can be covered by finitely many $\epsilon$-balls.

**Theorem:** Every totally bounded metric space is bounded.

**Theorem:** A metric space is compact ⟺ complete + totally bounded.

## The Cantor Intersection Theorem

**Theorem (Cantor):** Let (X, d) be a complete metric space, and let $F_1 \supseteq F_2 \supseteq \cdots$ be a nested sequence of non-empty closed sets with $\text{diam}(F_n) \to 0$. Then $\bigcap_{n=1}^\infty F_n$ contains exactly one point.

*Proof:* Choose $x_n \in F_n$. Since diameters shrink to 0, $(x_n)$ is Cauchy. By completeness, $x_n \to x$ for some x. Since each $F_n$ is closed and contains all but finitely many $x_k$, we have $x \in F_n$ for all n.

## Applications

Completeness is essential for:
- Fixed point theorems (Banach)
- Existence theorems for differential equations
- Functional analysis (Banach and Hilbert spaces)
- Baire category theorem
