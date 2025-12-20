---
id: math403-topic-6-1
title: "Introduction to Metric Spaces"
order: 1
---

# Introduction to Metric Spaces

Metric spaces provide a framework where the concept of "distance" is precisely defined, allowing for rigorous treatment of limits, continuity, and convergence. The abstraction of distance through the metric function has proven to be one of the most fruitful ideas in modern mathematics, unifying concepts from geometry, analysis, and topology while providing the foundation for functional analysis and many applications in physics, computer science, and engineering.

## Historical Context

The formal definition of metric spaces was introduced by Maurice Fréchet in his 1906 doctoral dissertation, though the underlying ideas had been developing throughout the 19th century in the work of Cauchy, Weierstrass, and Cantor. Fréchet's abstraction allowed mathematicians to recognize common patterns across seemingly disparate areas of mathematics, from Euclidean geometry to function spaces, and to prove general theorems applicable to all metric spaces.

## Definition of a Metric Space

**Definition:** A **metric** on a set X is a function $d: X \times X \to [0, \infty)$ satisfying for all $x, y, z \in X$:

1. **Positivity:** $d(x, y) \geq 0$
2. **Identity of indiscernibles:** $d(x, y) = 0 \Leftrightarrow x = y$
3. **Symmetry:** $d(x, y) = d(y, x)$
4. **Triangle inequality:** $d(x, z) \leq d(x, y) + d(y, z)$

A **metric space** is a pair (X, d) where X is a set and d is a metric on X.

The triangle inequality is the most significant of these axioms, encoding the geometric intuition that the direct path between two points should be no longer than any indirect route. This property underlies many important results in metric space theory.

## Verifying the Metric Axioms

When presented with a potential metric, it's essential to verify all four axioms. The triangle inequality is often the most challenging to establish. For instance, to verify that the Euclidean metric on $\mathbb{R}^n$ satisfies the triangle inequality requires the Cauchy-Schwarz inequality, demonstrating the deep connections between different areas of mathematics.

## Standard Examples

### Example 1: Euclidean Metric
On $\mathbb{R}^n$, the **Euclidean metric** is:
$$d(x, y) = \sqrt{\sum_{i=1}^n (x_i - y_i)^2}$$

This is the familiar notion of distance in ordinary space. The triangle inequality for this metric is equivalent to the geometric fact that the sum of two sides of a triangle exceeds the third side.

### Example 2: Discrete Metric
On any set X, the **discrete metric** is:
$$d(x, y) = \begin{cases} 0 & \text{if } x = y \\ 1 & \text{if } x \neq y \end{cases}$$

This metric makes every subset of X both open and closed, demonstrating that very different topologies can arise from metric structures. The discrete metric is complete and every sequence that converges must eventually be constant.

### Example 3: Taxicab Metric
On $\mathbb{R}^n$, the **taxicab** (Manhattan) metric is:
$$d_1(x, y) = \sum_{i=1}^n |x_i - y_i|$$

Named for its reflection of how taxis navigate city grids, this metric measures distance by summing coordinate-wise differences. In $\mathbb{R}^2$, this is the distance one would travel when restricted to horizontal and vertical movements.

### Example 4: Maximum Metric
On $\mathbb{R}^n$, the **maximum** (Chebyshev) metric is:
$$d_\infty(x, y) = \max_{1 \leq i \leq n} |x_i - y_i|$$

This metric measures the largest coordinate-wise difference. It's particularly useful in numerical analysis and approximation theory.

### Example 5: Function Spaces
On $C[0,1]$ (continuous functions on [0,1]), the **supremum metric**:
$$d(f, g) = \sup_{x \in [0,1]} |f(x) - g(x)|$$

This metric measures the maximum vertical distance between two function graphs. Completeness of this space is fundamental to analysis.

### Example 6: $p$-Metrics
More generally, on $\mathbb{R}^n$, for $1 \leq p < \infty$:
$$d_p(x, y) = \left(\sum_{i=1}^n |x_i - y_i|^p\right)^{1/p}$$

The cases $p = 1, 2, \infty$ give the taxicab, Euclidean, and maximum metrics respectively. The triangle inequality for these metrics requires Minkowski's inequality.

## Open and Closed Balls

**Definition:** The **open ball** centered at x with radius r > 0 is:
$$B(x, r) = \{y \in X : d(x, y) < r\}$$

**Definition:** The **closed ball** centered at x with radius r is:
$$\overline{B}(x, r) = \{y \in X : d(x, y) \leq r\}$$

**Definition:** The **sphere** centered at x with radius r is:
$$S(x, r) = \{y \in X : d(x, y) = r\}$$

**Important Warning:** In general metric spaces, the closure of an open ball need not equal the closed ball! Consider the discrete metric: $B(x, 1) = \{x\}$ is already closed, and $\overline{B}(x, 1) = X$ in a multi-point space.

## The Metric Topology

**Theorem:** The collection of open balls forms a basis for a topology on X, called the **metric topology**.

A set U is open in this topology if and only if for every $x \in U$, there exists $\epsilon > 0$ such that $B(x, \epsilon) \subseteq U$.

This connection between the metric structure and topology allows us to import topological concepts like continuity, compactness, and connectedness into the metric setting, while also using the metric to provide quantitative versions of these concepts.

## Equivalent Metrics

**Definition:** Two metrics $d_1$ and $d_2$ on X are **equivalent** if they generate the same topology.

**Theorem:** $d_1$ and $d_2$ are equivalent if and only if:
For every $x \in X$ and $\epsilon > 0$, there exist $\delta_1, \delta_2 > 0$ such that:
$$B_{d_1}(x, \delta_1) \subseteq B_{d_2}(x, \epsilon) \text{ and } B_{d_2}(x, \delta_2) \subseteq B_{d_1}(x, \epsilon)$$

**Example:** On $\mathbb{R}^n$, the Euclidean, taxicab, and maximum metrics are all equivalent. This means that convergence, continuity, and openness are the same concepts regardless of which metric we use, though the specific quantitative behavior differs.

**Non-Example:** The discrete metric on $\mathbb{R}$ is not equivalent to the standard metric, since every subset is open in the discrete topology but not in the standard topology.

## Bounded Sets and Diameter

**Definition:** A subset A of a metric space is **bounded** if there exists $M > 0$ such that $d(x, y) < M$ for all $x, y \in A$.

Equivalently, A is bounded if it is contained in some ball.

**Definition:** The **diameter** of a set A is:
$$\text{diam}(A) = \sup\{d(x, y) : x, y \in A\}$$

The diameter measures the "size" of a set. A set is bounded if and only if it has finite diameter. Note that $\text{diam}(A) = \text{diam}(\overline{A})$, since the distance function is continuous.

## Isometries

**Definition:** A function $f: (X, d_X) \to (Y, d_Y)$ is an **isometry** if:
$$d_Y(f(x), f(y)) = d_X(x, y)$$ for all $x, y \in X$.

Isometries preserve all metric properties: distances, angles (when defined), and the entire metric structure. Every isometry is injective (by the identity of indiscernibles) and continuous. If an isometry is surjective, it is called an **isometric isomorphism**, and the spaces are considered metrically identical.

## Key Takeaways

- Metric spaces abstract the concept of distance, providing a unifying framework for geometry, analysis, and topology
- The four metric axioms (positivity, identity of indiscernibles, symmetry, triangle inequality) capture essential properties of distance
- Common examples include Euclidean space, function spaces, and the discrete metric
- Open balls generate the metric topology, linking metric and topological concepts
- Equivalent metrics generate the same topology but may have different quantitative properties
- Isometries preserve the entire metric structure and represent the natural notion of "sameness" for metric spaces
