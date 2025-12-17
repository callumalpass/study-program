# The Baire Category Theorem

The Baire Category Theorem is a fundamental result about complete metric spaces and locally compact Hausdorff spaces, with important applications in functional analysis.

## First and Second Category

**Definition:** A subset A of a topological space X is:
- **Nowhere dense** if $\text{int}(\overline{A}) = \emptyset$
- **First category** (meager) if it is a countable union of nowhere dense sets
- **Second category** (non-meager) if it is not first category

**Definition:** A set is **residual** (comeager) if its complement is first category.

## Examples

### Example 1: Nowhere Dense Sets
- $\{0\}$ is nowhere dense in $\mathbb{R}$
- $\mathbb{Z}$ is nowhere dense in $\mathbb{R}$
- The Cantor set is nowhere dense in $\mathbb{R}$

### Example 2: First Category Sets
- $\mathbb{Q}$ is first category in $\mathbb{R}$ (countable union of singletons)
- Any countable subset of $\mathbb{R}$ is first category

### Example 3: Second Category
- $\mathbb{R}$ is second category in itself
- $[0, 1]$ is second category in itself

## The Baire Category Theorem

**Theorem (Baire):** Let X be either:
1. A complete metric space, or
2. A locally compact Hausdorff space

Then X is not first category in itself. Equivalently, the intersection of countably many dense open sets is dense.

## Proof for Complete Metric Spaces

Let $G_1, G_2, G_3, \ldots$ be dense open sets in X. We show $\bigcap G_n$ is dense.

Let U be any non-empty open set. We construct a point in $U \cap \bigcap G_n$.

Since $G_1$ is dense, $U \cap G_1 \neq \emptyset$. Choose $x_1 \in U \cap G_1$ and $r_1 > 0$ such that $\overline{B(x_1, r_1)} \subseteq U \cap G_1$ with $r_1 < 1$.

Since $G_2$ is dense, $B(x_1, r_1) \cap G_2 \neq \emptyset$. Choose $x_2$ and $r_2 < 1/2$ with $\overline{B(x_2, r_2)} \subseteq B(x_1, r_1) \cap G_2$.

Continue inductively: $\overline{B(x_n, r_n)} \subseteq B(x_{n-1}, r_{n-1}) \cap G_n$ with $r_n < 1/n$.

The sequence $(x_n)$ is Cauchy since $d(x_m, x_n) < 1/\min(m,n)$. By completeness, $x_n \to x^*$.

By construction, $x^* \in \overline{B(x_n, r_n)} \subseteq G_n$ for all n, and $x^* \in U$.

## Applications

### Application 1: $\mathbb{Q}$ is Not a $G_\delta$
If $\mathbb{Q} = \bigcap G_n$ with $G_n$ open, then each $G_n$ would be dense (since $\mathbb{Q}$ is dense). But $\mathbb{R} \setminus \mathbb{Q} = \bigcup (\mathbb{R} \setminus G_n)$ would be first category, contradicting that $\mathbb{R} \setminus \mathbb{Q}$ is residual.

### Application 2: Nowhere Differentiable Functions
The set of continuous nowhere-differentiable functions is residual in $C[0,1]$. "Most" continuous functions are nowhere differentiable!

### Application 3: Uniform Boundedness Principle
Let $(T_\alpha)$ be a family of bounded linear operators on a Banach space. If $\sup_\alpha \|T_\alpha x\| < \infty$ for each x, then $\sup_\alpha \|T_\alpha\| < \infty$.

### Application 4: Open Mapping Theorem
A bounded linear surjection between Banach spaces is an open map.

### Application 5: Closed Graph Theorem
A linear map between Banach spaces is bounded if and only if its graph is closed.

## The Baire Property

**Definition:** A set has the **Baire property** if it differs from an open set by a meager set.

**Theorem:** In a complete metric space, every Borel set has the Baire property.
