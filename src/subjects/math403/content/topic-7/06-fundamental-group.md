# The Fundamental Group

The fundamental group captures information about loops in a space and is the most important invariant in algebraic topology. Introduced by Henri Poincaré in 1895, the fundamental group $\pi_1(X, x_0)$ measures the different ways loops based at a point $x_0$ can wind through a space X. This algebraic invariant translates geometric intuition about "1-dimensional holes" into group theory, providing a computable tool for distinguishing topological spaces. The fundamental group is particularly powerful because it combines topological information (loops and their deformations) with algebraic structure (group operations), enabling both geometric insight and rigorous calculation. Understanding the fundamental group is essential for studying covering spaces, knot theory, and the topology of manifolds.

## Definition

To define the fundamental group, we need several preliminary concepts about paths and loops.

**Definition:** A **path** in X from $x_0$ to $x_1$ is a continuous map $\gamma: [0,1] \to X$ with $\gamma(0) = x_0$ (initial point) and $\gamma(1) = x_1$ (terminal point).

Intuitively, a path traces a continuous trajectory through the space from one point to another. The path need not be injective—it can backtrack, wind around, or cross itself.

**Definition:** A **loop** based at $x_0$ is a path from $x_0$ to itself: a continuous map $\gamma: [0,1] \to X$ with $\gamma(0) = \gamma(1) = x_0$.

The basepoint $x_0$ serves as both the starting and ending point. Loops form the building blocks of the fundamental group.

**Definition:** Paths $\gamma_0$ and $\gamma_1$ from $x_0$ to $x_1$ are **path homotopic** (or **homotopic relative to endpoints**) if there exists a continuous map $H: [0,1] \times [0,1] \to X$ (called a **path homotopy**) satisfying:
- $H(s, 0) = \gamma_0(s)$ for all $s \in [0,1]$ (at time 0, we have $\gamma_0$)
- $H(s, 1) = \gamma_1(s)$ for all $s \in [0,1]$ (at time 1, we have $\gamma_1$)
- $H(0, t) = x_0$ for all $t \in [0,1]$ (initial point fixed)
- $H(1, t) = x_1$ for all $t \in [0,1]$ (terminal point fixed)

Path homotopy means we can continuously deform $\gamma_0$ into $\gamma_1$ through intermediate paths, always keeping endpoints fixed. This is an equivalence relation on paths.

**Definition:** The **fundamental group** $\pi_1(X, x_0)$ is the set of path homotopy classes of loops based at $x_0$, equipped with the group operation of path concatenation.

We write $[\gamma]$ for the homotopy class of loop $\gamma$. The fundamental group's elements are equivalence classes of loops, not individual loops.

## Group Structure

The fundamental group has a natural group structure arising from path concatenation.

**Concatenation:** Given loops $\gamma$ and $\delta$ based at $x_0$, their **concatenation** (or **product**) $\gamma \cdot \delta$ traverses $\gamma$ first (in time $[0, 1/2]$), then $\delta$ (in time $[1/2, 1]$):

$$(\gamma \cdot \delta)(s) = \begin{cases} \gamma(2s) & 0 \leq s \leq 1/2 \\ \delta(2s-1) & 1/2 \leq s \leq 1 \end{cases}$$

We reparametrize to traverse each loop at double speed, fitting both into the unit interval.

**Theorem:** Path concatenation induces a well-defined group operation on $\pi_1(X, x_0)$: if $\gamma_0 \simeq \gamma_1$ and $\delta_0 \simeq \delta_1$ (path homotopic), then $\gamma_0 \cdot \delta_0 \simeq \gamma_1 \cdot \delta_1$.

**Proof:** Concatenate the homotopies to obtain a homotopy of concatenated paths.

**Group axioms:**

1. **Identity element:** The constant loop $c_{x_0}(s) = x_0$ for all $s$ is the identity. For any loop $\gamma$:
   $$[\gamma] \cdot [c_{x_0}] = [\gamma] = [c_{x_0}] \cdot [\gamma]$$

2. **Inverse elements:** For loop $\gamma$, the **reverse loop** $\gamma^{-1}(s) = \gamma(1-s)$ (traverse $\gamma$ backward) is the inverse:
   $$[\gamma] \cdot [\gamma^{-1}] = [c_{x_0}] = [\gamma^{-1}] \cdot [\gamma]$$

3. **Associativity:** For loops $\gamma, \delta, \epsilon$:
   $$[(\gamma \cdot \delta) \cdot \epsilon] = [\gamma \cdot (\delta \cdot \epsilon)]$$

   This follows from reparametrization invariance: both sides traverse $\gamma$, then $\delta$, then $\epsilon$ in sequence.

**Basepoint dependence:** If X is path-connected and $x_0, x_1 \in X$, then $\pi_1(X, x_0) \cong \pi_1(X, x_1)$. A path $\alpha$ from $x_0$ to $x_1$ induces an isomorphism:
$$\phi_\alpha: \pi_1(X, x_0) \to \pi_1(X, x_1)$$
$$[\gamma] \mapsto [\alpha^{-1} \cdot \gamma \cdot \alpha]$$

This isomorphism is **not canonical**—different paths $\alpha$ give different isomorphisms unless $\pi_1$ is abelian. For path-connected spaces, we often write $\pi_1(X)$ when the basepoint is understood or when all basepoint choices give the same group up to isomorphism.

## Simply Connected Spaces

**Definition:** A space X is **simply connected** if it is path-connected and $\pi_1(X, x_0) = \{e\}$ (trivial group consisting only of the identity).

Simply connected spaces have no non-trivial loops—every loop can be continuously contracted to a point. This is the strongest form of path-connectivity.

**Examples of simply connected spaces:**
- **Euclidean space:** $\mathbb{R}^n$ is simply connected. Any loop can be contracted by linear homotopy to the constant loop.
- **Higher spheres:** $S^n$ for $n \geq 2$ is simply connected. The higher dimension provides "room" to contract loops.
- **Convex sets:** Any convex subset of $\mathbb{R}^n$ is simply connected (contractible, hence simply connected).
- **The cone:** The cone CX on any space X is simply connected (contractible).

**Non-examples (spaces that are NOT simply connected):**
- **Circle:** $S^1$ has $\pi_1(S^1) \cong \mathbb{Z}$, with loops classified by winding number.
- **Torus:** $T^2$ has $\pi_1(T^2) \cong \mathbb{Z} \times \mathbb{Z}$, with two independent generating loops.
- **Punctured plane:** $\mathbb{R}^2 \setminus \{0\}$ has $\pi_1(\mathbb{R}^2 \setminus \{0\}) \cong \mathbb{Z}$, loops wind around the missing point.
- **Figure-eight:** $S^1 \vee S^1$ (wedge of two circles) has $\pi_1(S^1 \vee S^1) \cong \mathbb{Z} * \mathbb{Z}$ (free group on two generators).

**Theorem:** A space is simply connected if and only if any two paths with the same endpoints are path homotopic.

## Computing Fundamental Groups

Computing fundamental groups requires tools from algebraic topology. Here are key examples with calculation sketches.

### $\pi_1(S^1) \cong \mathbb{Z}$

The circle's fundamental group is the integers, with winding number as the isomorphism.

**Proof sketch:** Use the universal covering map $p: \mathbb{R} \to S^1$ given by $p(t) = e^{2\pi i t}$.

- Every loop $\gamma$ in $S^1$ based at 1 lifts uniquely to a path $\tilde{\gamma}$ in $\mathbb{R}$ starting at 0.
- The endpoint $\tilde{\gamma}(1) \in \mathbb{Z}$ is an integer (since $\gamma$ is a loop).
- This integer is the **winding number** of $\gamma$—how many times $\gamma$ winds around $S^1$.
- Winding number is a group homomorphism $\pi_1(S^1) \to \mathbb{Z}$, and covering space theory shows it's an isomorphism.

The loop $\gamma(s) = e^{2\pi i s}$ (once around counterclockwise) generates $\pi_1(S^1)$.

### $\pi_1(T^2) \cong \mathbb{Z} \times \mathbb{Z}$

The 2-torus $T^2 = S^1 \times S^1$ has fundamental group $\mathbb{Z}^2$.

**Proof sketch:**
- The torus has two independent loops: one around the "hole" (meridian) and one through the "hole" (longitude).
- Using the product structure: $\pi_1(X \times Y) \cong \pi_1(X) \times \pi_1(Y)$ (for nice spaces).
- Therefore: $\pi_1(T^2) = \pi_1(S^1 \times S^1) \cong \pi_1(S^1) \times \pi_1(S^1) \cong \mathbb{Z} \times \mathbb{Z}$.

The two generators correspond to loops going around each $S^1$ factor.

### $\pi_1(\mathbb{RP}^2) \cong \mathbb{Z}/2\mathbb{Z}$

Real projective plane has fundamental group $\mathbb{Z}_2$.

**Proof sketch:**
- Use the covering map $p: S^2 \to \mathbb{RP}^2$ (identifying antipodal points).
- $S^2$ is simply connected, so it's the universal cover of $\mathbb{RP}^2$.
- The deck transformations are $\{\text{id}, -\text{id}\}$, a group of order 2.
- By covering space theory: $\pi_1(\mathbb{RP}^2) \cong \mathbb{Z}/2\mathbb{Z}$.

The non-trivial loop in $\mathbb{RP}^2$ corresponds to a path in $S^2$ connecting antipodal points. Traversing this loop twice lifts to a full loop in $S^2$, which is contractible.

### $\pi_1(S^1 \vee S^1) \cong \mathbb{Z} * \mathbb{Z}$

The wedge (bouquet) of two circles has free group on two generators.

**Proof sketch:**
- Use van Kampen's theorem (see below).
- The two circles contribute independent generators with no relations.
- Result: free group $\mathbb{Z} * \mathbb{Z}$ on generators corresponding to loops around each circle.

This is the first example showing $\pi_1$ can be non-abelian.

## The Fundamental Group and Covering Spaces

Covering spaces provide the primary tool for computing and understanding fundamental groups.

**Definition:** A **covering map** is $p: \tilde{X} \to X$ such that every $x \in X$ has a neighborhood U where $p^{-1}(U)$ is a disjoint union of open sets, each mapped homeomorphically onto U by p.

**Theorem (Lifting criterion):** A map $f: Y \to X$ lifts to $\tilde{f}: Y \to \tilde{X}$ (with $p \circ \tilde{f} = f$) if and only if:
$$f_*(\pi_1(Y)) \subseteq p_*(\pi_1(\tilde{X}))$$

**Theorem (Classification of coverings):** For "nice" spaces X, covering spaces correspond bijectively to subgroups of $\pi_1(X)$:
- The covering $\tilde{X} \to X$ corresponds to subgroup $p_*(\pi_1(\tilde{X})) \subseteq \pi_1(X)$
- The number of sheets equals the index $[\pi_1(X) : p_*(\pi_1(\tilde{X}))]$

**Universal cover:** The **universal cover** $\tilde{X}$ is the unique (up to isomorphism) simply connected covering space. It corresponds to the trivial subgroup $\{e\} \subseteq \pi_1(X)$.

**Examples:**
- Universal cover of $S^1$: $\mathbb{R} \to S^1$
- Universal cover of $T^2$: $\mathbb{R}^2 \to T^2$
- Universal cover of $\mathbb{RP}^n$: $S^n \to \mathbb{RP}^n$

**Deck transformations:** The group of covering transformations equals $\pi_1(X)$ for universal covers, providing a geometric realization of the fundamental group.

## Induced Homomorphisms

Continuous maps between spaces induce homomorphisms between fundamental groups, making $\pi_1$ a functor.

**Theorem:** A continuous map $f: (X, x_0) \to (Y, y_0)$ (preserving basepoints) induces a group homomorphism:
$$f_*: \pi_1(X, x_0) \to \pi_1(Y, y_0)$$
defined by $f_*([\gamma]) = [f \circ \gamma]$.

The induced map $f_*$ is called the **pushforward** or **induced homomorphism**.

**Properties:**
1. **Functoriality:** $(g \circ f)_* = g_* \circ f_*$ (composition)
2. **Identity:** $(id_X)_* = id_{\pi_1(X)}$ (identity map)
3. **Homotopy invariance:** If $f \simeq g$ (homotopic maps), then $f_* = g_*$

**Corollary:** If $f: X \to Y$ is a homotopy equivalence, then $f_*: \pi_1(X) \to \pi_1(Y)$ is an isomorphism.

This shows the fundamental group is a **homotopy invariant**—it depends only on homotopy type, not specific homeomorphism.

**Example:** The inclusion $S^1 \hookrightarrow \mathbb{R}^2 \setminus \{0\}$ induces an isomorphism $\mathbb{Z} \to \mathbb{Z}$ because the spaces are homotopy equivalent.

## Van Kampen's Theorem

Van Kampen's theorem (also called the Seifert-van Kampen theorem) computes the fundamental group of a union from the fundamental groups of the pieces.

**Theorem (Seifert-van Kampen):** Let X be a path-connected space, and suppose $X = U \cup V$ where U, V are open and path-connected with $U \cap V$ path-connected. Choose basepoint $x_0 \in U \cap V$. Then:

$$\pi_1(X, x_0) \cong \pi_1(U, x_0) *_{\pi_1(U \cap V, x_0)} \pi_1(V, x_0)$$

This is the **amalgamated free product** (free product with amalgamation). The subgroups $i_*({\pi_1(U \cap V)})$ in $\pi_1(U)$ and $j_*(\pi_1(U \cap V))$ in $\pi_1(V)$ are identified, where $i: U \cap V \to U$ and $j: U \cap V \to V$ are inclusions.

**Special case—Free product:** If $U \cap V$ is simply connected, then:
$$\pi_1(X) \cong \pi_1(U) * \pi_1(V)$$

**Application—Wedge of circles:** For $S^1 \vee S^1$, take $U$ and $V$ as neighborhoods of each circle with $U \cap V$ contractible:
$$\pi_1(S^1 \vee S^1) \cong \pi_1(S^1) * \pi_1(S^1) = \mathbb{Z} * \mathbb{Z}$$

**Application—Genus g surface:** A closed orientable surface of genus g has:
$$\pi_1(\Sigma_g) = \langle a_1, b_1, \ldots, a_g, b_g \mid [a_1,b_1] \cdots [a_g,b_g] = 1 \rangle$$

where $[a,b] = aba^{-1}b^{-1}$ is the commutator.

**Power:** Van Kampen's theorem reduces difficult computations to simpler ones by decomposition, analogous to Mayer-Vietoris in homology.

## Applications and Significance

**Topological invariant:** The fundamental group distinguishes topological spaces. For example, $S^2$ and $T^2$ are not homeomorphic because $\pi_1(S^2) = \{e\}$ while $\pi_1(T^2) = \mathbb{Z}^2$.

**Covering space classification:** The fundamental group parametrizes all covering spaces, essential in complex analysis (Riemann surfaces), algebraic geometry, and Galois theory analogies.

**Knot theory:** The knot group $\pi_1(\mathbb{R}^3 \setminus K)$ is a powerful invariant distinguishing knots.

**Group theory:** Every group is the fundamental group of some space (realization theorem), connecting topology and algebra.

**Obstruction theory:** Many problems reduce to fundamental group computations: Can a map be lifted? Extended? Deformed?

## Key Takeaways

- The fundamental group $\pi_1(X, x_0)$ consists of homotopy classes of loops
- Group operation is path concatenation (loop composition)
- Simply connected spaces have trivial fundamental group
- The circle has $\pi_1(S^1) \cong \mathbb{Z}$, the torus has $\pi_1(T^2) \cong \mathbb{Z}^2$
- Covering spaces provide geometric realizations and computation tools
- Continuous maps induce group homomorphisms (functoriality)
- Homotopy equivalent spaces have isomorphic fundamental groups
- Van Kampen's theorem computes $\pi_1$ by decomposition
- The fundamental group is the primary tool for 1-dimensional hole detection
- Applications span topology, geometry, knot theory, and algebra
- Understanding $\pi_1$ is essential for advanced topology and geometry
