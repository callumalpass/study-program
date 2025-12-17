# Introduction to Differential Topology

Differential topology studies smooth manifolds and smooth maps between them, combining techniques from topology and differential calculus.

## Smooth Manifolds

**Definition:** A **smooth n-manifold** is a Hausdorff, second-countable topological space M equipped with a smooth atlas: a collection of charts $(U_\alpha, \phi_\alpha)$ where:
1. $U_\alpha$ are open sets covering M
2. $\phi_\alpha: U_\alpha \to \mathbb{R}^n$ are homeomorphisms onto open sets
3. Transition maps $\phi_\beta \circ \phi_\alpha^{-1}$ are smooth ($C^\infty$)

## Examples of Smooth Manifolds

### Example 1: Euclidean Space
$\mathbb{R}^n$ is a smooth n-manifold with the single chart $(id)$.

### Example 2: Spheres
$S^n = \{x \in \mathbb{R}^{n+1} : |x| = 1\}$ is a smooth n-manifold.

### Example 3: Real Projective Space
$\mathbb{RP}^n = S^n / \{x \sim -x\}$ is a smooth n-manifold.

### Example 4: Matrix Groups
$GL_n(\mathbb{R})$, $O(n)$, $SO(n)$, $SL_n(\mathbb{R})$ are smooth manifolds (Lie groups).

## Smooth Maps

**Definition:** A map $f: M \to N$ between smooth manifolds is **smooth** if for every pair of charts, the composition $\psi \circ f \circ \phi^{-1}$ is smooth.

**Definition:** A **diffeomorphism** is a smooth bijection with smooth inverse.

Two manifolds are diffeomorphic if there exists a diffeomorphism between them.

## The Tangent Space

**Definition:** The **tangent space** $T_p M$ at a point p is the vector space of derivations on germs of smooth functions at p.

**Equivalent definition:** Equivalence classes of curves through p, where $\gamma_1 \sim \gamma_2$ if they have the same derivative at p in any chart.

**Dimension:** $\dim T_p M = \dim M$

## The Tangent Bundle

**Definition:** The **tangent bundle** is:
$$TM = \bigsqcup_{p \in M} T_p M$$
with natural smooth structure making projection $\pi: TM \to M$ a smooth map.

## The Derivative of a Smooth Map

**Definition:** The **derivative** (differential, pushforward) of $f: M \to N$ at p is the linear map:
$$df_p: T_p M \to T_{f(p)} N$$
defined by $df_p(v)(g) = v(g \circ f)$.

In coordinates, this is the Jacobian matrix.

## Regular and Critical Values

**Definition:** A point $p \in M$ is a **regular point** of $f: M \to N$ if $df_p$ is surjective. Otherwise p is a **critical point**.

**Definition:** A value $q \in N$ is a **regular value** if every point in $f^{-1}(q)$ is regular. Otherwise q is a **critical value**.

## Sard's Theorem

**Theorem (Sard):** The set of critical values of a smooth map has measure zero.

**Corollary:** Regular values are dense.

## The Regular Value Theorem

**Theorem:** If q is a regular value of $f: M^m \to N^n$ with $m \geq n$, then $f^{-1}(q)$ is a smooth manifold of dimension $m - n$.

**Application:** Many manifolds arise as level sets:
- Spheres: $S^{n-1} = f^{-1}(1)$ where $f(x) = |x|^2$
- Orthogonal group: $O(n) = f^{-1}(I)$ where $f(A) = A^T A$

## Transversality

**Definition:** Two submanifolds $A, B \subseteq M$ are **transverse** ($A \pitchfork B$) if at each $p \in A \cap B$:
$$T_p A + T_p B = T_p M$$

**Theorem:** If $A \pitchfork B$, then $A \cap B$ is a submanifold with:
$$\dim(A \cap B) = \dim A + \dim B - \dim M$$
