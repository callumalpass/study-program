# Metric Topology

The metric topology is the natural topology induced by a metric, providing a rich structure that connects metric and topological concepts. Understanding this connection is fundamental to both analysis and topology, as it allows us to translate between quantitative (metric) and qualitative (topological) properties of spaces.

## Motivation

While general topological spaces are defined axiomatically through open sets, metric spaces provide an alternative approach where topology emerges naturally from the concept of distance. This makes metric topology more intuitive and computationally accessible, while still maintaining the full power of topological reasoning. Many important spaces in mathematics—including Euclidean spaces, function spaces, and probability spaces—are naturally metric, making the metric topology essential for applications.

## Generating the Topology

**Theorem:** Let (X, d) be a metric space. Define:
$$\mathcal{T} = \{U \subseteq X : \forall x \in U, \exists \epsilon > 0, B(x, \epsilon) \subseteq U\}$$

Then $\mathcal{T}$ is a topology on X, and the open balls form a basis for $\mathcal{T}$.

*Proof:*
- $\emptyset \in \mathcal{T}$ vacuously (there are no points whose neighborhood requirement must be satisfied)
- $X \in \mathcal{T}$ since for any $x \in X$, we can take $\epsilon = 1$ and $B(x, 1) \subseteq X$
- **Arbitrary unions:** If $x \in \bigcup_\alpha U_\alpha$, then $x \in U_\alpha$ for some $\alpha$. Since $U_\alpha$ is open, there exists $\epsilon > 0$ with $B(x, \epsilon) \subseteq U_\alpha \subseteq \bigcup_\alpha U_\alpha$
- **Finite intersections:** If $x \in U_1 \cap U_2$, then $x \in U_1$ and $x \in U_2$, so balls $B(x, \epsilon_1) \subseteq U_1$ and $B(x, \epsilon_2) \subseteq U_2$ exist. Therefore $B(x, \min(\epsilon_1, \epsilon_2)) \subseteq U_1 \cap U_2$

This proof demonstrates how the metric structure (specifically, the ability to find balls of any positive radius) ensures the topological axioms are satisfied.

## Understanding Open Sets

The $\epsilon$-ball characterization of open sets provides a powerful tool for working with metric topologies. A set is open precisely when it contains a "buffer zone" around each of its points—no point lies on the "boundary" of an open set. This geometric intuition translates directly into the formal definition.

**Example:** In $\mathbb{R}$ with the standard metric, the interval $(0, 1)$ is open because for any $x \in (0, 1)$, we can choose $\epsilon = \min(x, 1-x)/2$, and then $B(x, \epsilon) \subseteq (0, 1)$.

**Non-Example:** The interval $[0, 1)$ is not open because at $x = 0$, every ball $B(0, \epsilon)$ contains points less than 0, which are not in $[0, 1)$.

## Properties of Metric Topologies

**Theorem:** Every metric topology is:
1. **Hausdorff:** Distinct points have disjoint neighborhoods
2. **First-countable:** Every point has a countable neighborhood basis
3. **Perfectly normal:** Closed sets can be separated by continuous functions

These properties are automatic consequences of the metric structure and do not hold for all topological spaces. This makes metric spaces particularly well-behaved.

### Proof of Hausdorff Property
Let $x \neq y$ with $r = d(x, y) > 0$. Then $B(x, r/2)$ and $B(y, r/2)$ are disjoint neighborhoods.

*Why are they disjoint?* Suppose $z \in B(x, r/2) \cap B(y, r/2)$. Then:
$$d(x, y) \leq d(x, z) + d(z, y) < r/2 + r/2 = r = d(x, y)$$

This contradiction shows the balls are disjoint. This proof illustrates the power of the triangle inequality.

### Proof of First-Countability
$\{B(x, 1/n) : n \in \mathbb{N}\}$ is a countable neighborhood basis at x.

To verify this: any neighborhood U of x contains some $B(x, \epsilon)$, and choosing n large enough that $1/n < \epsilon$ ensures $B(x, 1/n) \subseteq B(x, \epsilon) \subseteq U$.

First-countability is crucial because it allows us to work with sequences instead of nets, greatly simplifying analysis.

## Metrizable Spaces

**Definition:** A topological space is **metrizable** if its topology can be induced by some metric.

Not every topological space is metrizable. The metric structure imposes strong constraints: every metrizable space must be Hausdorff, regular, and first-countable. However, these conditions alone are insufficient—the Sorgenfrey line satisfies all three but is not metrizable.

**Example:** $\mathbb{R}$ with the standard topology is metrizable (use $d(x,y) = |x-y|$).

**Non-Example:** The Sierpiński space $\{0, 1\}$ with topology $\{\emptyset, \{1\}, \{0,1\}\}$ is not metrizable because it's not T₁. In any metric space, singletons are closed.

**Non-Example:** An uncountable product of copies of $\mathbb{R}$ with the product topology is not metrizable because it's not first-countable.

## Characterizations of Open and Closed Sets

**Theorem:** In a metric space:
- U is open ⟺ For each $x \in U$, some ball around x lies in U
- F is closed ⟺ F contains all its limit points
- F is closed ⟺ $x_n \in F, x_n \to x \Rightarrow x \in F$

The sequential characterization of closed sets is particularly powerful in metric spaces. Unlike general topological spaces, where sequences may be insufficient to detect topological properties, in metric spaces (and more generally in first-countable spaces), sequences fully capture the topology.

## Interior, Closure, and Boundary

**Theorem:** In a metric space (X, d):

**Interior:**
$$\text{int}(A) = \{x \in A : \exists \epsilon > 0, B(x, \epsilon) \subseteq A\}$$

The interior consists of points that are "strictly inside" A, with room to move in all directions while remaining in A.

**Closure:**
$$\overline{A} = \{x \in X : \forall \epsilon > 0, B(x, \epsilon) \cap A \neq \emptyset\}$$

The closure consists of points that can be approximated arbitrarily well by points in A. Equivalently, these are points that are limits of sequences in A.

**Boundary:**
$$\partial A = \overline{A} \setminus \text{int}(A)$$

The boundary consists of points where A and its complement meet—every ball around a boundary point intersects both A and $X \setminus A$.

**Example:** For $A = (0, 1] \subseteq \mathbb{R}$:
- $\text{int}(A) = (0, 1)$
- $\overline{A} = [0, 1]$
- $\partial A = \{0, 1\}$

## Distance to a Set

**Definition:** The **distance** from a point x to a set A is:
$$d(x, A) = \inf\{d(x, a) : a \in A\}$$

This function measures how close x is to the set A, even if $x \notin A$.

**Theorem:** The function $x \mapsto d(x, A)$ is continuous.

*Proof:* For any $x, y \in X$ and $a \in A$:
$$d(x, A) \leq d(x, a) \leq d(x, y) + d(y, a)$$

Taking the infimum over $a \in A$: $d(x, A) \leq d(x, y) + d(y, A)$, so $d(x, A) - d(y, A) \leq d(x, y)$.

By symmetry, $|d(x, A) - d(y, A)| \leq d(x, y)$, proving continuity (in fact, Lipschitz continuity with constant 1).

**Theorem:** $\overline{A} = \{x : d(x, A) = 0\}$.

This provides a metric characterization of closure: a point is in the closure if and only if it has zero distance to the set.

## Subspaces and Products

**Theorem:** A subspace of a metrizable space is metrizable.

*Proof:* If d is a metric on X and $Y \subseteq X$, then the restriction $d|_{Y \times Y}$ is a metric on Y inducing the subspace topology.

**Theorem:** A countable product of metrizable spaces is metrizable.

*For the product $\prod_{n=1}^\infty X_n$ with metrics $d_n$:*
$$d(x, y) = \sum_{n=1}^\infty \frac{1}{2^n} \cdot \frac{d_n(x_n, y_n)}{1 + d_n(x_n, y_n)}$$

The factor $\frac{d_n(x_n, y_n)}{1 + d_n(x_n, y_n)}$ bounds each term to $[0, 1)$, ensuring convergence of the series. The weights $1/2^n$ ensure that differences in later coordinates contribute less to the overall distance.

**Important:** Uncountable products of non-trivial metrizable spaces are generally not metrizable, as they fail to be first-countable.

## Separability

**Definition:** A metric space is **separable** if it contains a countable dense subset.

**Theorem:** A metric space is separable if and only if it is second-countable.

*Proof (⟹):* If D is a countable dense subset, then $\{B(d, 1/n) : d \in D, n \in \mathbb{N}\}$ is a countable basis.

*Proof (⟸):* If $\mathcal{B}$ is a countable basis, choose one point from each basis element to form a countable dense set.

This equivalence fails in general topological spaces but holds in metric spaces due to the ability to construct balls of arbitrary small radius.

## Key Takeaways

- The metric topology is generated by open balls and satisfies all topological axioms
- Metric spaces are automatically Hausdorff, first-countable, and perfectly normal
- Not all topologies can be induced by a metric—metrizable spaces satisfy special conditions
- Interior, closure, and boundary have concrete metric characterizations
- The distance-to-a-set function is continuous and characterizes closure
- Subspaces and countable products of metrizable spaces remain metrizable
- In metric spaces, separability is equivalent to second-countability
