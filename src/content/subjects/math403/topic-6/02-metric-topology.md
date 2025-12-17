# Metric Topology

The metric topology is the natural topology induced by a metric, providing a rich structure that connects metric and topological concepts.

## Generating the Topology

**Theorem:** Let (X, d) be a metric space. Define:
$$\mathcal{T} = \{U \subseteq X : \forall x \in U, \exists \epsilon > 0, B(x, \epsilon) \subseteq U\}$$

Then $\mathcal{T}$ is a topology on X, and the open balls form a basis for $\mathcal{T}$.

*Proof:*
- $\emptyset \in \mathcal{T}$ vacuously; $X \in \mathcal{T}$ since $B(x, 1) \subseteq X$
- Arbitrary unions: If $x \in \bigcup_\alpha U_\alpha$, then $x \in U_\alpha$ for some $\alpha$, so some ball around x lies in $U_\alpha \subseteq \bigcup_\alpha U_\alpha$
- Finite intersections: If $x \in U_1 \cap U_2$, then balls $B(x, \epsilon_1) \subseteq U_1$ and $B(x, \epsilon_2) \subseteq U_2$ exist, so $B(x, \min(\epsilon_1, \epsilon_2)) \subseteq U_1 \cap U_2$

## Properties of Metric Topologies

**Theorem:** Every metric topology is:
1. **Hausdorff:** Distinct points have disjoint neighborhoods
2. **First-countable:** Every point has a countable neighborhood basis
3. **Perfectly normal:** Closed sets can be separated by continuous functions

### Proof of Hausdorff Property
Let $x \neq y$ with $r = d(x, y) > 0$. Then $B(x, r/2)$ and $B(y, r/2)$ are disjoint neighborhoods.

### Proof of First-Countability
$\{B(x, 1/n) : n \in \mathbb{N}\}$ is a countable neighborhood basis at x.

## Metrizable Spaces

**Definition:** A topological space is **metrizable** if its topology can be induced by some metric.

**Example:** $\mathbb{R}$ with the standard topology is metrizable (use $d(x,y) = |x-y|$).

**Non-Example:** The Sierpiński space $\{0, 1\}$ with topology $\{\emptyset, \{1\}, \{0,1\}\}$ is not metrizable (not T₁).

## Characterizations of Open and Closed Sets

**Theorem:** In a metric space:
- U is open ⟺ For each $x \in U$, some ball around x lies in U
- F is closed ⟺ F contains all its limit points
- F is closed ⟺ $x_n \in F, x_n \to x \Rightarrow x \in F$

## Interior, Closure, and Boundary

**Theorem:** In a metric space (X, d):

**Interior:**
$$\text{int}(A) = \{x \in A : \exists \epsilon > 0, B(x, \epsilon) \subseteq A\}$$

**Closure:**
$$\overline{A} = \{x \in X : \forall \epsilon > 0, B(x, \epsilon) \cap A \neq \emptyset\}$$

**Boundary:**
$$\partial A = \overline{A} \setminus \text{int}(A)$$

## Distance to a Set

**Definition:** The **distance** from a point x to a set A is:
$$d(x, A) = \inf\{d(x, a) : a \in A\}$$

**Theorem:** The function $x \mapsto d(x, A)$ is continuous.

**Theorem:** $\overline{A} = \{x : d(x, A) = 0\}$.

## Subspaces and Products

**Theorem:** A subspace of a metrizable space is metrizable.

**Theorem:** A countable product of metrizable spaces is metrizable.

*For the product $\prod_{n=1}^\infty X_n$ with metrics $d_n$:*
$$d(x, y) = \sum_{n=1}^\infty \frac{1}{2^n} \cdot \frac{d_n(x_n, y_n)}{1 + d_n(x_n, y_n)}$$

## Separability

**Definition:** A metric space is **separable** if it contains a countable dense subset.

**Theorem:** A metric space is separable if and only if it is second-countable.
