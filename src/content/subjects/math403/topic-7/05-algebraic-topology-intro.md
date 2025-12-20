# Introduction to Algebraic Topology

Algebraic topology uses algebraic structures—groups, rings, modules, and categories—to study topological spaces, converting topological problems into algebraic ones that are often easier to solve. The fundamental philosophy is to assign computable algebraic invariants to topological spaces in such a way that homeomorphic (or homotopy equivalent) spaces receive isomorphic invariants. This translation from topology to algebra is one of the great achievements of 20th-century mathematics, providing powerful tools for distinguishing spaces, proving impossibility results, and understanding the structure of continuous maps. The interplay between geometric intuition and algebraic computation makes algebraic topology both conceptually rich and practically applicable.

## The Main Idea

The central principle of algebraic topology is to construct functors from topological spaces to algebraic objects.

**Goal:** Assign algebraic invariants (groups, rings, vector spaces, modules, categories) to topological spaces such that:
1. **Topological invariance:** Homeomorphic (or homotopy equivalent) spaces have isomorphic invariants
2. **Computability:** The invariants can be calculated from explicit data (triangulations, cell decompositions, generators and relations)
3. **Discrimination:** Different spaces (often) have different invariants, allowing us to distinguish them
4. **Functoriality:** Continuous maps induce homomorphisms between invariants, preserving composition

This program succeeds remarkably well. While no single invariant completely classifies all spaces (an impossible dream), the collection of algebraic topology invariants provides powerful tools for understanding topological structure.

**Philosophy:** Algebraic topology trades the continuous complexity of topology for the discrete complexity of algebra. Continuous maps become homomorphisms, homotopies become algebraic relations, and topological constructions become algebraic operations.

## Homotopy

Homotopy is a fundamental equivalence relation in algebraic topology, capturing when two maps are "essentially the same."

**Definition:** Two continuous maps $f, g: X \to Y$ are **homotopic** (written $f \simeq g$) if there exists a continuous map $H: X \times [0,1] \to Y$ (called a **homotopy**) with:
- $H(x, 0) = f(x)$ for all $x \in X$
- $H(x, 1) = g(x)$ for all $x \in X$

Intuitively, H provides a continuous deformation from f to g. The parameter $t \in [0,1]$ represents time, with the map $f_t(x) = H(x,t)$ interpolating continuously from $f_0 = f$ to $f_1 = g$.

**Properties of homotopy:**
- Homotopy is an equivalence relation on the set of continuous maps $X \to Y$
- Composition respects homotopy: if $f \simeq g$ and $h \simeq k$, then $h \circ f \simeq k \circ g$ (when defined)
- Homotopy is coarser than equality but preserves many important properties

**Definition:** Spaces X and Y are **homotopy equivalent** (written $X \simeq Y$) if there exist continuous maps $f: X \to Y$ and $g: Y \to X$ such that:
- $g \circ f \simeq \text{id}_X$ (identity on X)
- $f \circ g \simeq \text{id}_Y$ (identity on Y)

Maps f and g are called **homotopy equivalences**. Homotopy equivalence is weaker than homeomorphism but strong enough to preserve algebraic invariants.

**Examples:**
- $\mathbb{R}^n$ is homotopy equivalent to a point (contractible space)
- $\mathbb{R}^n \setminus \{0\}$ is homotopy equivalent to $S^{n-1}$ via radial projection
- A solid torus is homotopy equivalent to $S^1$
- Any convex subset of $\mathbb{R}^n$ is contractible

**Definition:** A space is **contractible** if it is homotopy equivalent to a point. Contractible spaces are topologically trivial from the homotopy perspective—all algebraic topology invariants reduce to those of a point.

## The Fundamental Group

The fundamental group is the first and most important algebraic invariant in topology, measuring 1-dimensional "holes" via loops.

**Definition:** The **fundamental group** $\pi_1(X, x_0)$ of a space X based at point $x_0 \in X$ consists of homotopy classes of loops based at $x_0$, with group operation given by path concatenation.

A **loop** based at $x_0$ is a continuous map $\gamma: [0,1] \to X$ with $\gamma(0) = \gamma(1) = x_0$. Two loops are **homotopic (rel endpoints)** if they can be continuously deformed into each other while keeping the basepoint fixed.

**Group operation:** For loops $\gamma$ and $\delta$ based at $x_0$, their **product** $\gamma \cdot \delta$ traverses $\gamma$ first, then $\delta$:
$$(\gamma \cdot \delta)(s) = \begin{cases} \gamma(2s) & 0 \leq s \leq 1/2 \\ \delta(2s-1) & 1/2 \leq s \leq 1 \end{cases}$$

**Properties:**
- **Identity:** The constant loop $c_{x_0}(s) = x_0$
- **Inverses:** $\gamma^{-1}(s) = \gamma(1-s)$ (traverse backward)
- **Associativity:** $(\gamma \cdot \delta) \cdot \epsilon \simeq \gamma \cdot (\delta \cdot \epsilon)$

**Theorem:** $\pi_1(X, x_0)$ is a group. If X is path-connected, $\pi_1(X, x_0) \cong \pi_1(X, x_1)$ for any basepoints $x_0, x_1$ (isomorphism not canonical).

**Basic Examples:**
- $\pi_1(\mathbb{R}^n) = \{e\}$ (trivial group)—any loop can be contracted to a point
- $\pi_1(S^1) \cong \mathbb{Z}$—loops classified by winding number
- $\pi_1(S^n) = \{e\}$ for $n \geq 2$—higher-dimensional spheres are simply connected
- $\pi_1(T^2) \cong \mathbb{Z} \times \mathbb{Z}$—two independent 1-cycles on the torus
- $\pi_1(\mathbb{RP}^2) \cong \mathbb{Z}/2\mathbb{Z}$—the non-orientable loop on the projective plane

**Simply connected spaces:** X is **simply connected** if it is path-connected and $\pi_1(X) = \{e\}$. Simply connected spaces have no non-trivial loops.

## Higher Homotopy Groups

The fundamental group generalizes to higher dimensions.

**Definition:** The **n-th homotopy group** $\pi_n(X, x_0)$ consists of homotopy classes of maps $(S^n, *) \to (X, x_0)$ (based maps from the n-sphere).

**Group structure:** Given by addition of maps via suspension coordinates. For $n \geq 2$, we can define addition by:
$$[f] + [g] : S^n \to X$$
using the cogroup structure on spheres.

**Properties:**
- $\pi_0(X)$ is the set of path components (not a group unless pointed)
- $\pi_1(X, x_0)$ is the fundamental group (generally non-abelian)
- **Eckmann-Hilton theorem:** $\pi_n(X, x_0)$ is abelian for $n \geq 2$
- $\pi_n(S^n) \cong \mathbb{Z}$ (generated by the identity map)
- $\pi_3(S^2) \cong \mathbb{Z}$ (Hopf fibration)—surprising!

**Computational difficulty:** Computing higher homotopy groups is extremely difficult. Even for spheres, $\pi_n(S^m)$ is known only for limited ranges. The homotopy groups of spheres remain an active research area.

## Homology

While homotopy groups measure maps from spheres into a space, homology measures "holes" more directly and is easier to compute.

**Philosophy:** Homology assigns to each space X a sequence of abelian groups $H_0(X), H_1(X), H_2(X), \ldots$ measuring:
- $H_0$: connected components (0-dimensional holes)
- $H_1$: 1-dimensional holes (loops, tunnels)
- $H_2$: 2-dimensional holes (voids, cavities)
- $H_n$: n-dimensional holes

**Definition (Simplicial Homology):** For a simplicial complex K:
1. **Chain groups:** $C_n(K)$ is the free abelian group on n-simplices
2. **Boundary maps:** $\partial_n: C_n \to C_{n-1}$ takes formal sums to their boundaries
3. **Key property:** $\partial_{n-1} \circ \partial_n = 0$ (boundary of boundary is empty)
4. **Homology groups:** $H_n(K) = \ker \partial_n / \text{im } \partial_{n+1}$

The homology measures "cycles that are not boundaries"—chains with no boundary that don't bound higher-dimensional chains.

**Intuition:**
- **n-cycles:** Elements of $\ker \partial_n$ (chains with no boundary)
- **n-boundaries:** Elements of $\text{im } \partial_{n+1}$ (boundaries of (n+1)-chains)
- **n-th homology:** $H_n = \text{cycles} / \text{boundaries}$

**Examples:**
- **Point:** $H_0(\text{point}) = \mathbb{Z}$, $H_n(\text{point}) = 0$ for $n > 0$
- **Circle:** $H_0(S^1) = \mathbb{Z}$, $H_1(S^1) = \mathbb{Z}$, $H_n(S^1) = 0$ for $n \geq 2$
- **n-sphere:** $H_k(S^n) = \mathbb{Z}$ for $k = 0, n$, and $H_k(S^n) = 0$ otherwise
- **Torus:** $H_0(T^2) = \mathbb{Z}$, $H_1(T^2) = \mathbb{Z}^2$, $H_2(T^2) = \mathbb{Z}$, $H_n(T^2) = 0$ for $n \geq 3$
- **Real projective plane:** $H_0(\mathbb{RP}^2) = \mathbb{Z}$, $H_1(\mathbb{RP}^2) = \mathbb{Z}/2\mathbb{Z}$, $H_2(\mathbb{RP}^2) = 0$

**Relationship to fundamental group:** For path-connected spaces, $H_1(X) \cong \pi_1(X)^{\text{ab}}$ (the abelianization of the fundamental group). Homology "sees" the abelian part of the fundamental group.

## The Euler Characteristic

The Euler characteristic combines all homology groups into a single integer.

**Definition:** The **Euler characteristic** is:
$$\chi(X) = \sum_{n=0}^\infty (-1)^n \rank H_n(X)$$

(assuming finitely many non-zero terms).

**Alternative formula:** For a simplicial complex with $V_n$ n-simplices:
$$\chi(X) = V_0 - V_1 + V_2 - V_3 + \cdots$$

This shows the Euler characteristic is a combinatorial invariant.

**Examples:**
- $\chi(S^n) = 1 + (-1)^n$ (equals 2 for even n, 0 for odd n)
- $\chi(T^2) = 1 - 2 + 1 = 0$ (torus)
- $\chi(\mathbb{RP}^2) = 1$ (projective plane)
- $\chi(S^2) = 2$ (sphere, giving $V - E + F = 2$ for polyhedra)

**Properties:**
- $\chi(X \sqcup Y) = \chi(X) + \chi(Y)$ (additivity)
- $\chi(X \times Y) = \chi(X) \cdot \chi(Y)$ (multiplicativity)
- Homotopy invariant: $X \simeq Y$ implies $\chi(X) = \chi(Y)$

## Cohomology

Cohomology is dual to homology, with superior algebraic structure.

**Definition:** Cohomology groups $H^n(X; G)$ are defined dually to homology, using cochains (functions on chains):
$$C^n(X; G) = \text{Hom}(C_n(X), G)$$

The coboundary maps $\delta^n: C^n \to C^{n+1}$ are dual to boundary maps, and:
$$H^n(X; G) = \ker \delta^n / \text{im } \delta^{n-1}$$

**Advantage of cohomology:** Cohomology has a natural **ring structure** via the **cup product**:
$$\cup: H^p(X) \times H^q(X) \to H^{p+q}(X)$$

This product makes $H^*(X) = \bigoplus_n H^n(X)$ into a graded ring, providing additional algebraic structure beyond homology.

**Universal Coefficient Theorem:** For reasonable spaces, cohomology with coefficients in G relates to homology:
$$H^n(X; G) \cong \text{Hom}(H_n(X), G) \oplus \text{Ext}(H_{n-1}(X), G)$$

## Exact Sequences

Exact sequences are fundamental tools in algebraic topology for computing invariants.

**Definition:** A sequence of groups and homomorphisms:
$$\cdots \to A_{n+1} \xrightarrow{f_{n+1}} A_n \xrightarrow{f_n} A_{n-1} \to \cdots$$
is **exact** if $\ker f_n = \text{im } f_{n+1}$ at each stage.

**Mayer-Vietoris Sequence:** For $X = U \cup V$ with U, V open:
$$\cdots \to H_n(U \cap V) \to H_n(U) \oplus H_n(V) \to H_n(X) \to H_{n-1}(U \cap V) \to \cdots$$

This long exact sequence allows computation of $H_*(X)$ from $H_*(U)$, $H_*(V)$, and $H_*(U \cap V)$ by decomposition.

**Application:** Computing homology of complex spaces by breaking them into simpler pieces.

## Key Theorems

Algebraic topology provides topological consequences via algebraic methods.

**Brouwer Fixed Point Theorem:** Every continuous map $f: D^n \to D^n$ has a fixed point.

**Proof idea:** If f has no fixed point, construct a retraction $D^n \to S^{n-1}$. But $H_{n-1}(D^n) = 0$ while $H_{n-1}(S^{n-1}) = \mathbb{Z}$, so no retraction exists.

**Invariance of Domain:** A continuous injection $\mathbb{R}^n \to \mathbb{R}^n$ is an open map (preserves open sets).

**Proof idea:** Uses homology to show injections preserve local topological properties.

**Borsuk-Ulam Theorem:** Every continuous map $f: S^n \to \mathbb{R}^n$ has antipodal points with equal values: some $x \in S^n$ satisfies $f(x) = f(-x)$.

**Corollary:** At any moment, there exist antipodal points on Earth with identical temperature and pressure.

**Proof idea:** Uses $\mathbb{Z}/2\mathbb{Z}$-equivariant cohomology.

**Ham Sandwich Theorem:** Any n measurable sets in $\mathbb{R}^n$ can be simultaneously bisected by a single hyperplane.

**Proof:** Consequence of Borsuk-Ulam.

## Key Takeaways

- Algebraic topology translates topological problems into algebraic ones
- Homotopy provides an equivalence relation coarser than homeomorphism
- The fundamental group $\pi_1$ measures 1-dimensional holes via loops
- Higher homotopy groups $\pi_n$ measure maps from spheres but are hard to compute
- Homology groups $H_n$ measure n-dimensional holes and are easier to compute than homotopy
- The Euler characteristic combines homology into a single number
- Cohomology adds ring structure via the cup product
- Exact sequences (Mayer-Vietoris) enable computation by decomposition
- Algebraic invariants prove topological impossibility results (Brouwer, Borsuk-Ulam)
- Functoriality ensures continuous maps induce algebraic homomorphisms
- The interplay of algebra and topology yields deep theorems and practical computations
