# Introduction to Differential Topology

Differential topology studies smooth manifolds and smooth maps between them, combining techniques from topology and differential calculus. While topology studies properties preserved by continuous deformations, differential topology adds the requirement of smoothness, allowing us to use calculus tools like derivatives, tangent spaces, and differential forms. This additional structure enables powerful theorems and techniques unavailable in pure topology, yet the underlying topological intuition remains essential. Differential topology provides the mathematical foundation for modern geometry, theoretical physics, and many applications where smooth structure matters.

## Smooth Manifolds

**Definition:** A **smooth n-manifold** is a Hausdorff, second-countable topological space M equipped with a smooth atlas—a collection of charts $(U_\alpha, \phi_\alpha)$ where:
1. $\{U_\alpha\}$ are open sets covering M
2. Each $\phi_\alpha: U_\alpha \to \mathbb{R}^n$ is a homeomorphism onto an open subset of $\mathbb{R}^n$
3. Transition maps $\phi_\beta \circ \phi_\alpha^{-1}: \phi_\alpha(U_\alpha \cap U_\beta) \to \phi_\beta(U_\alpha \cap U_\beta)$ are smooth ($C^\infty$)

The charts $(U_\alpha, \phi_\alpha)$ provide local coordinate systems. The smoothness of transition maps ensures that differential calculus is well-defined independently of coordinate choice. The Hausdorff condition prevents pathological identification of distinct points, while second-countability ensures a countable basis, ruling out overly large or pathological spaces.

**Maximal Atlas:** A collection of charts is **maximal** if it contains every chart compatible with the given charts. Every smooth atlas extends uniquely to a maximal one, defining the smooth structure.

**Different Smooth Structures:** A topological manifold may admit multiple distinct smooth structures. Remarkably, $\mathbb{R}^4$ has uncountably many distinct smooth structures (exotic $\mathbb{R}^4$'s), while $\mathbb{R}^n$ for $n \neq 4$ has a unique smooth structure.

## Examples of Smooth Manifolds

### Example 1: Euclidean Space

$\mathbb{R}^n$ is the fundamental smooth n-manifold with the single global chart $(\mathbb{R}^n, \text{id})$. This is the model for all smooth manifolds locally.

### Example 2: Spheres

The n-sphere $S^n = \{x \in \mathbb{R}^{n+1} : |x| = 1\}$ is a smooth n-manifold. We can use stereographic projection to construct charts. Project from the north pole $N = (0,\ldots,0,1)$ to the equatorial $\mathbb{R}^n$:
$$\phi_N(x_1,\ldots,x_{n+1}) = \frac{1}{1-x_{n+1}}(x_1,\ldots,x_n)$$

Similarly project from the south pole. The two charts cover $S^n$ and have smooth transition map (an inversion).

### Example 3: Real Projective Space

$\mathbb{RP}^n = S^n / \{x \sim -x\}$ is obtained by identifying antipodal points on the sphere. This quotient inherits a smooth structure making the quotient map smooth. Real projective space models lines through the origin in $\mathbb{R}^{n+1}$.

### Example 4: Tori

The n-torus $T^n = S^1 \times \cdots \times S^1$ (n factors) is a smooth n-manifold. The 2-torus $T^2$ is the familiar doughnut surface. As a quotient $T^n = \mathbb{R}^n / \mathbb{Z}^n$, it inherits smooth structure from Euclidean space.

### Example 5: Matrix Groups (Lie Groups)

Many important groups of matrices are smooth manifolds:
- $GL_n(\mathbb{R})$ = invertible n×n matrices, an open subset of $\mathbb{R}^{n^2}$
- $O(n)$ = orthogonal matrices, defined by $A^T A = I$, dimension $n(n-1)/2$
- $SO(n)$ = special orthogonal matrices (determinant 1), connected component of O(n)
- $SL_n(\mathbb{R})$ = matrices with determinant 1, dimension $n^2 - 1$

These are **Lie groups**—smooth manifolds with smooth group operations.

## Smooth Maps

**Definition:** A map $f: M \to N$ between smooth manifolds is **smooth** if for every point $p \in M$ and every pair of charts $(U, \phi)$ around p and $(V, \psi)$ around f(p), the composition:
$$\psi \circ f \circ \phi^{-1}: \phi(U \cap f^{-1}(V)) \to \psi(V)$$
is smooth as a map between open subsets of Euclidean space.

This coordinate-based definition ensures smoothness is independent of chart choice.

**Definition:** A **diffeomorphism** is a smooth bijection with smooth inverse. Diffeomorphisms are the isomorphisms in the category of smooth manifolds.

**Diffeomorphic manifolds** share all smooth properties. However, homeomorphic manifolds need not be diffeomorphic (e.g., exotic spheres in dimension 7).

## The Tangent Space

The tangent space captures the first-order infinitesimal behavior near a point.

**Definition (via derivations):** The **tangent space** $T_p M$ at point $p \in M$ is the vector space of derivations on germs of smooth functions at p. A derivation is a linear map $v: C^\infty_p \to \mathbb{R}$ satisfying the Leibniz rule:
$$v(fg) = v(f) \cdot g(p) + f(p) \cdot v(g)$$

**Equivalent definition (via curves):** $T_p M$ consists of equivalence classes of smooth curves $\gamma: (-\epsilon, \epsilon) \to M$ with $\gamma(0) = p$, where $\gamma_1 \sim \gamma_2$ if they have the same velocity in any chart:
$$\frac{d}{dt}\big|_{t=0} (\phi \circ \gamma_1)(t) = \frac{d}{dt}\big|_{t=0} (\phi \circ \gamma_2)(t)$$

**Coordinate expression:** In a chart $(U, \phi)$ with coordinates $(x^1,\ldots,x^n)$, the tangent space has basis $\{\partial/\partial x^1,\ldots,\partial/\partial x^n\}$, and vectors are written:
$$v = \sum_{i=1}^n v^i \frac{\partial}{\partial x^i}$$

**Dimension:** $\dim T_p M = \dim M = n$. This is the **manifold dimension theorem**.

## The Tangent Bundle

**Definition:** The **tangent bundle** is the disjoint union of all tangent spaces:
$$TM = \bigsqcup_{p \in M} T_p M = \{(p, v) : p \in M, v \in T_p M\}$$

The tangent bundle TM is itself a smooth manifold of dimension 2n (if $\dim M = n$). The projection $\pi: TM \to M$ given by $\pi(p,v) = p$ is smooth.

**Smooth structure on TM:** If $(U, \phi)$ is a chart on M with $\phi = (x^1,\ldots,x^n)$, then $(TU, T\phi)$ is a chart on TM where:
$$T\phi(p, v^i \partial/\partial x^i|_p) = (x^1(p),\ldots,x^n(p), v^1,\ldots,v^n)$$

This makes TM into a $2n$-dimensional manifold.

**Vector fields:** A **vector field** is a smooth section $X: M \to TM$, assigning to each $p \in M$ a tangent vector $X_p \in T_p M$ smoothly. Vector fields form an infinite-dimensional vector space and a Lie algebra under the Lie bracket.

## The Derivative of a Smooth Map

**Definition:** The **derivative** (also called differential or pushforward) of $f: M \to N$ at p is the linear map:
$$df_p: T_p M \to T_{f(p)} N$$

defined by $df_p(v)(g) = v(g \circ f)$ for any smooth function g near f(p).

**Coordinate expression:** If $(x^1,\ldots,x^m)$ are coordinates on M and $(y^1,\ldots,y^n)$ on N, then:
$$df_p\left(\sum_i v^i \frac{\partial}{\partial x^i}\right) = \sum_{i,j} v^i \frac{\partial f^j}{\partial x^i}(p) \frac{\partial}{\partial y^j}$$

The matrix $[\partial f^j/\partial x^i]$ is the **Jacobian matrix** of f.

**Chain rule:** For composable smooth maps $f: M \to N$ and $g: N \to P$:
$$d(g \circ f)_p = dg_{f(p)} \circ df_p$$

This is the manifold version of the chain rule from multivariable calculus.

## Regular and Critical Values

**Definition:** A point $p \in M$ is a **regular point** of $f: M \to N$ if $df_p: T_p M \to T_{f(p)} N$ is surjective. Otherwise p is a **critical point**.

**Definition:** A value $q \in N$ is a **regular value** if every point in $f^{-1}(q)$ is regular (including the case $f^{-1}(q) = \emptyset$). Otherwise q is a **critical value**.

**Note:** Regular values are more common than critical values, as Sard's theorem shows.

## Sard's Theorem

**Theorem (Sard, 1942):** The set of critical values of a smooth map $f: M \to N$ has measure zero in N.

**Corollary:** The set of regular values is dense in N (in fact, it has full measure).

This remarkable theorem says that "almost all" values are regular. Despite being purely topological and differentiable in nature, the proof uses measure theory in an essential way.

**Applications:**
- Existence of regular values simplifies many constructions
- Transversality arguments rely on perturbations to regular values
- Morse theory uses generic functions (those with non-degenerate critical points)

## The Regular Value Theorem (Preimage Theorem)

**Theorem:** If q is a regular value of $f: M^m \to N^n$ with $m \geq n$, then the preimage $f^{-1}(q)$ is a smooth manifold of dimension $m - n$ (or empty).

**Proof sketch:** Surjectivity of $df_p$ at each $p \in f^{-1}(q)$ allows the implicit function theorem to construct charts around p for which f looks locally like the projection $\mathbb{R}^m \to \mathbb{R}^n$, $(x^1,\ldots,x^m) \mapsto (x^1,\ldots,x^n)$. The preimage is then locally $\{0\} \times \mathbb{R}^{m-n}$.

**Applications—Manifolds as Level Sets:**

1. **Spheres:** $S^{n-1} = f^{-1}(1)$ where $f: \mathbb{R}^n \to \mathbb{R}$, $f(x) = |x|^2$. Since $df_x(v) = 2x \cdot v$ is surjective for $x \neq 0$, the value 1 is regular.

2. **Orthogonal group:** $O(n) = f^{-1}(I)$ where $f: M_n(\mathbb{R}) \to \text{Sym}_n(\mathbb{R})$, $f(A) = A^T A$. The tangent space to O(n) at I consists of skew-symmetric matrices, giving dimension $n(n-1)/2$.

3. **Torus:** $T^2 = f^{-1}(0)$ for appropriate f on $\mathbb{R}^4$.

## Transversality

**Definition:** Two submanifolds $A, B \subseteq M$ intersect **transversally** (written $A \pitchfork B$) if at each $p \in A \cap B$:
$$T_p A + T_p B = T_p M$$

Intuitively, the submanifolds are not "tangent" at intersection points—they cross with maximal generality.

**Theorem:** If $A \pitchfork B$, then $A \cap B$ is a smooth submanifold with:
$$\dim(A \cap B) = \dim A + \dim B - \dim M$$

**Example:** Two curves in the plane ($\dim A = \dim B = 1$, $\dim M = 2$) intersecting transversally meet at isolated points ($\dim = 0$).

**Transversality Theorem:** Transversality is a generic condition. Given smooth maps, almost all small perturbations make them transversal. This underlies many existence arguments in differential topology.

## Immersions, Submersions, and Embeddings

**Definition:** $f: M \to N$ is an **immersion** if $df_p$ is injective for all p (local embedding).

**Definition:** $f: M \to N$ is a **submersion** if $df_p$ is surjective for all p (local projection).

**Definition:** $f: M \to N$ is an **embedding** if it is an injective immersion that is a homeomorphism onto its image.

**Examples:**
- The inclusion $S^n \hookrightarrow \mathbb{R}^{n+1}$ is an embedding
- The figure-eight curve $t \mapsto (\sin t, \sin 2t)$ is an immersion but not an embedding
- The map $\mathbb{R} \to S^1 \times S^1$, $t \mapsto (e^{2\pi i t}, e^{2\pi i \alpha t})$ is an embedding when $\alpha$ is irrational (dense winding)

## Key Takeaways

- Smooth manifolds combine topological and differential structure
- Charts provide local coordinates; smoothness is coordinate-independent
- The tangent space captures first-order infinitesimal information
- The derivative generalizes the Jacobian to manifolds
- Sard's theorem guarantees abundance of regular values
- Level sets of regular values are smooth manifolds
- Transversality ensures clean intersections
- Differential topology provides foundations for geometry and physics
- Smoothness assumptions enable powerful calculus-based techniques
- Examples from matrix groups illustrate the theory concretely
