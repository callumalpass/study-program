# Introduction to Metric Spaces

Metric spaces provide a framework where the concept of "distance" is precisely defined, allowing for rigorous treatment of limits, continuity, and convergence.

## Definition of a Metric Space

**Definition:** A **metric** on a set X is a function $d: X \times X \to [0, \infty)$ satisfying for all $x, y, z \in X$:

1. **Positivity:** $d(x, y) \geq 0$
2. **Identity of indiscernibles:** $d(x, y) = 0 \Leftrightarrow x = y$
3. **Symmetry:** $d(x, y) = d(y, x)$
4. **Triangle inequality:** $d(x, z) \leq d(x, y) + d(y, z)$

A **metric space** is a pair (X, d) where X is a set and d is a metric on X.

## Standard Examples

### Example 1: Euclidean Metric
On $\mathbb{R}^n$, the **Euclidean metric** is:
$$d(x, y) = \sqrt{\sum_{i=1}^n (x_i - y_i)^2}$$

### Example 2: Discrete Metric
On any set X, the **discrete metric** is:
$$d(x, y) = \begin{cases} 0 & \text{if } x = y \\ 1 & \text{if } x \neq y \end{cases}$$

### Example 3: Taxicab Metric
On $\mathbb{R}^n$, the **taxicab** (Manhattan) metric is:
$$d_1(x, y) = \sum_{i=1}^n |x_i - y_i|$$

### Example 4: Maximum Metric
On $\mathbb{R}^n$, the **maximum** (Chebyshev) metric is:
$$d_\infty(x, y) = \max_{1 \leq i \leq n} |x_i - y_i|$$

### Example 5: Function Spaces
On $C[0,1]$ (continuous functions on [0,1]), the **supremum metric**:
$$d(f, g) = \sup_{x \in [0,1]} |f(x) - g(x)|$$

## Open and Closed Balls

**Definition:** The **open ball** centered at x with radius r > 0 is:
$$B(x, r) = \{y \in X : d(x, y) < r\}$$

**Definition:** The **closed ball** centered at x with radius r is:
$$\overline{B}(x, r) = \{y \in X : d(x, y) \leq r\}$$

**Definition:** The **sphere** centered at x with radius r is:
$$S(x, r) = \{y \in X : d(x, y) = r\}$$

## The Metric Topology

**Theorem:** The collection of open balls forms a basis for a topology on X, called the **metric topology**.

A set U is open in this topology if and only if for every $x \in U$, there exists $\epsilon > 0$ such that $B(x, \epsilon) \subseteq U$.

## Equivalent Metrics

**Definition:** Two metrics $d_1$ and $d_2$ on X are **equivalent** if they generate the same topology.

**Theorem:** $d_1$ and $d_2$ are equivalent if and only if:
For every $x \in X$ and $\epsilon > 0$, there exist $\delta_1, \delta_2 > 0$ such that:
$$B_{d_1}(x, \delta_1) \subseteq B_{d_2}(x, \epsilon) \text{ and } B_{d_2}(x, \delta_2) \subseteq B_{d_1}(x, \epsilon)$$

**Example:** On $\mathbb{R}^n$, the Euclidean, taxicab, and maximum metrics are all equivalent.

## Bounded Sets and Diameter

**Definition:** A subset A of a metric space is **bounded** if there exists $M > 0$ such that $d(x, y) < M$ for all $x, y \in A$.

**Definition:** The **diameter** of a set A is:
$$\text{diam}(A) = \sup\{d(x, y) : x, y \in A\}$$

## Isometries

**Definition:** A function $f: (X, d_X) \to (Y, d_Y)$ is an **isometry** if:
$$d_Y(f(x), f(y)) = d_X(x, y)$$ for all $x, y \in X$.

Isometries preserve all metric properties and induce homeomorphisms.
