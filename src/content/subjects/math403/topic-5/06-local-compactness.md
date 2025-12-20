# Local Compactness

Local compactness weakens the notion of compactness while preserving many useful properties. A space is locally compact if compactness holds "in small regions" around each point, even if the whole space is not compact. This concept is essential for the study of locally compact groups, functional analysis, and the theory of compactifications.

## Definition

**Definition:** A topological space X is **locally compact** if every point has a compact neighborhood.

More precisely, X is locally compact if for each point $x \in X$, there exists an open set U containing x such that $\overline{U}$ is compact. Equivalently, every point has a neighborhood base consisting of sets with compact closures.

**Definition (Hausdorff version):** In a Hausdorff space X, local compactness can be stated more strongly: X is locally compact if for every point x and every open neighborhood U of x, there exists an open set V with:
$$x \in V \subseteq \overline{V} \subseteq U \quad \text{and} \quad \overline{V} \text{ is compact}$$

This stronger form follows from the basic definition in Hausdorff spaces because compact subsets of Hausdorff spaces are closed.

## Relationship to Compactness

Every compact space is locally compact (the whole space serves as a compact neighborhood of every point), but the converse is far from true. Local compactness is a much weaker condition that allows for non-compact spaces like $\mathbb{R}^n$.

**Theorem:** A closed subset of a locally compact Hausdorff space is locally compact.

**Theorem:** An open subset of a locally compact Hausdorff space is locally compact.

These properties make locally compact Hausdorff spaces very well-behaved.

## Examples of Locally Compact Spaces

### Example 1: Euclidean Space
$\mathbb{R}^n$ is locally compact but not compact. Every point x has the compact neighborhood $\overline{B(x, 1)}$ (the closed unit ball centered at x). This is the prototypical example of a non-compact locally compact space.

### Example 2: Discrete Spaces
Every discrete space is locally compact. Each singleton $\{x\}$ is both open and compact (hence a compact neighborhood of x). Infinite discrete spaces are locally compact but not compact.

### Example 3: Compact Spaces
Every compact space is locally compact. The whole space X is a compact neighborhood of every point. This shows that local compactness generalizes compactness.

### Example 4: Manifolds
All topological manifolds (including smooth manifolds, complex manifolds, etc.) are locally compact. This is because they are locally homeomorphic to $\mathbb{R}^n$, which is locally compact.

### Example 5: Open Subsets
An open subset of a locally compact Hausdorff space is locally compact. For instance, any open subset of $\mathbb{R}^n$ (like the open ball, the punctured plane, etc.) is locally compact.

### Example 6: Closed Subsets
A closed subset of a locally compact space is locally compact (when the ambient space is Hausdorff). For example, any closed subset of $\mathbb{R}^n$ is locally compact.

## Non-Examples

### Example 7: The Rational Numbers
$\mathbb{Q}$ with the subspace topology from $\mathbb{R}$ is NOT locally compact.

*Proof:* Suppose $\mathbb{Q}$ were locally compact. Then each rational r would have a compact neighborhood K. But compact subsets of $\mathbb{Q}$ (in the subspace topology) are closed and bounded in $\mathbb{Q}$. However, a closed bounded subset of $\mathbb{Q}$ is not compact because $\mathbb{Q}$ is not complete—we can find Cauchy sequences in K that converge to irrational limits.

More directly: any neighborhood of a rational in $\mathbb{Q}$ contains an interval $(a, b) \cap \mathbb{Q}$, and such intervals are not compact in $\mathbb{Q}$.

### Example 8: Infinite-Dimensional Normed Spaces
Infinite-dimensional normed spaces are not locally compact. The closed unit ball is not compact (by Riesz's lemma), and neither is any ball of any radius. This is a fundamental difference between finite and infinite dimensions.

### Example 9: The Space of Continuous Functions
$C([0,1])$ with the supremum norm is not locally compact. No point has a compact neighborhood.

## Key Properties

**Theorem:** A locally compact Hausdorff space is completely regular (Tychonoff).

*Proof sketch:* Given a closed set F and a point $x \notin F$, use Urysohn's lemma on a compact neighborhood of x.

**Theorem:** A locally compact Hausdorff space is a Baire space (the intersection of countably many dense open sets is dense).

**Theorem (Product):** A product of locally compact spaces is locally compact if and only if all but finitely many factors are compact.

*Proof:* The "if" direction: if only finitely many $X_i$ are non-compact, the product of compact neighborhoods in the compact factors with compact neighborhoods in the non-compact factors gives a compact neighborhood.

The "only if" direction: if infinitely many factors are non-compact locally compact (like $\mathbb{R}$), the product is not locally compact.

## Compactification and Local Compactness

Local compactness is precisely the condition needed for "nice" one-point compactification.

**Theorem:** A Hausdorff space X has a Hausdorff one-point compactification if and only if X is locally compact and not already compact.

**Theorem:** If X is locally compact Hausdorff, then its one-point compactification $X^*$ is compact Hausdorff.

**Theorem:** If X is not locally compact, then its one-point compactification $X^*$ is compact but not Hausdorff.

This shows that local compactness is the "right" condition for extending a space by a single point at infinity.

## Proper Maps

Proper maps are the morphisms that respect local compactness in a precise sense.

**Definition:** A continuous map $f: X \to Y$ is **proper** if the preimage of every compact set is compact.

Equivalently, in locally compact Hausdorff spaces, f is proper if and only if f is closed and has compact fibers ($f^{-1}(\{y\})$ is compact for each $y \in Y$).

**Theorem:** If $f: X \to Y$ is proper and Y is locally compact Hausdorff, then X is locally compact Hausdorff.

**Theorem:** Proper maps extend to one-point compactifications: if $f: X \to Y$ is proper between locally compact Hausdorff spaces, then f extends to a continuous map $f^*: X^* \to Y^*$.

## Locally Compact Groups

One of the most important applications of local compactness is in the theory of topological groups.

**Definition:** A **locally compact group** is a topological group G that is locally compact as a topological space.

**Key examples:**
- $\mathbb{R}^n$ with addition (the prototypical locally compact abelian group)
- The circle group $S^1 = \{z \in \mathbb{C} : |z| = 1\}$ with complex multiplication
- $GL_n(\mathbb{R})$ and $GL_n(\mathbb{C})$ with matrix multiplication
- The p-adic numbers $\mathbb{Q}_p$ and p-adic integers $\mathbb{Z}_p$
- Any finite or discrete group

**Theorem (Haar Measure):** Every locally compact group admits a left-invariant (or right-invariant) Haar measure, unique up to positive scalar multiple.

This is one of the deepest results connecting topology and analysis, and it requires local compactness in an essential way. Haar measure enables integration on groups and is fundamental to harmonic analysis, representation theory, and number theory.

## The Alexandroff Extension

For a locally compact but non-compact space X, the **Alexandroff extension** (one-point compactification) adds a single point $\infty$ with carefully chosen neighborhoods.

**Construction:** The neighborhoods of $\infty$ are exactly the sets of the form $(X \setminus K) \cup \{\infty\}$ where K is compact in X.

**Theorem:** If X is locally compact Hausdorff, then its one-point compactification $X^*$ is compact Hausdorff, and X is an open dense subspace of $X^*$.

This construction is explored in detail in the next subtopic.

## Key Takeaways

- Local compactness means every point has a compact neighborhood
- All compact spaces are locally compact; $\mathbb{R}^n$ is locally compact but not compact
- $\mathbb{Q}$ and infinite-dimensional normed spaces are not locally compact
- Local compactness is equivalent to having a Hausdorff one-point compactification
- Locally compact groups are fundamental in harmonic analysis and admit Haar measure
- Proper maps are the natural morphisms for locally compact spaces
