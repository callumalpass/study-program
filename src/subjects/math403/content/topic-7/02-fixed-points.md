---
id: math403-topic-7-2
title: "Fixed Point Theorems"
order: 2
---

# Fixed Point Theorems

Fixed point theorems guarantee the existence of points x where f(x) = x, with profound applications throughout mathematics and its applications. These theorems are remarkable because they prove existence without providing explicit construction methods. From game theory to differential equations, from economics to dynamical systems, fixed point theorems provide the foundation for existence results across mathematics. The variety of fixed point theorems—from the constructive Banach theorem to the topological Brouwer theorem to generalizations in infinite dimensions—illustrates the depth and breadth of this fundamental concept.

## The Brouwer Fixed Point Theorem

**Theorem (Brouwer, 1911):** Every continuous function $f: D^n \to D^n$ from the closed n-dimensional disk to itself has a fixed point.

Here $D^n = \{x \in \mathbb{R}^n : |x| \leq 1\}$ is the closed unit disk in n-dimensional Euclidean space. This theorem is purely existential—it guarantees a fixed point exists but provides no method for finding it. The theorem requires all three conditions: continuity of f, closedness of the domain, and boundedness of the domain. Removing any condition allows counterexamples.

**Special Cases:**
- **n = 1:** Every continuous function $f: [0,1] \to [0,1]$ has a fixed point. This follows from the intermediate value theorem: consider $g(x) = f(x) - x$.
- **n = 2:** Every continuous self-map of a closed disk has a fixed point. A popular illustration: if you stir coffee in a cup, some point of the liquid returns to its original position.
- **n = 3:** Applications to 3D flows and vector fields

### Proof Idea (using degree theory)

The standard proof uses algebraic topology, specifically the concept of degree. Suppose for contradiction that f has no fixed point, so $f(x) \neq x$ for all $x \in D^n$. We can then define a retraction $r: D^n \to S^{n-1}$ by drawing a ray from f(x) through x and following it to the boundary sphere $S^{n-1}$. Explicitly:

$$r(x) = x + t(x)(x - f(x))$$

where $t(x)$ is chosen so that $|r(x)| = 1$. This retraction would satisfy $r(x) = x$ for all $x \in S^{n-1}$.

However, algebraic topology proves that no retraction $D^n \to S^{n-1}$ exists. One approach uses homology: $H_{n-1}(D^n) = 0$ but $H_{n-1}(S^{n-1}) = \mathbb{Z}$, so no surjection exists on homology, contradicting the existence of a retraction. This contradiction proves f must have a fixed point.

### Why the Hypotheses Matter

Each hypothesis is essential:
- **Continuity:** The function $f(x) = -x$ on $S^n$ has no fixed point
- **Closedness:** $f(x) = x + 1$ on $(0,1)$ has no fixed point
- **Boundedness:** $f(x) = x + 1$ on $[0,\infty)$ has no fixed point

## Applications of Brouwer's Theorem

### Game Theory

**Nash Equilibrium Theorem:** Every finite game has a Nash equilibrium in mixed strategies.

**Proof sketch:** Consider an n-player game. Each player has a finite set of pure strategies. A mixed strategy is a probability distribution over pure strategies. The set of mixed strategy profiles is a simplex (convex, compact subset of Euclidean space). The best-response correspondence maps each strategy profile to the set of best responses. By continuity and convexity properties, this induces a continuous self-map on the simplex. Brouwer's theorem guarantees a fixed point, which is precisely a Nash equilibrium.

This revolutionary result, due to John Nash (1950), transformed game theory and earned Nash the Nobel Prize in Economics. It guarantees that competitive situations have stable equilibria, even when finding them computationally is difficult.

### Economics

**Existence of Market Equilibrium:** Under suitable conditions (continuous excess demand functions, Walras's law), competitive markets have price equilibria where supply equals demand.

The proof models the price simplex as a compact convex set and shows that market mechanisms define a continuous self-map. Fixed points correspond to equilibrium prices. This provides theoretical foundation for market economics and general equilibrium theory.

### Differential Topology

**Hairy Ball Theorem:** Any continuous tangent vector field on an even-dimensional sphere must vanish somewhere.

**Proof using Brouwer:** Suppose a non-vanishing vector field exists on $S^{2n}$. Flow along the field for time $\pi$ defines a continuous map $f: S^{2n} \to S^{2n}$ with no fixed point (since flowing along a tangent field moves points). This contradicts Brouwer for even n. Odd-dimensional spheres do admit non-vanishing fields (e.g., $S^1$, $S^3$).

**Corollary:** You cannot comb a hairy ball flat without creating a cowlick.

## The Banach Fixed Point Theorem

**Theorem (Banach, 1922):** Let (X,d) be a complete metric space and $f: X \to X$ a contraction, meaning there exists $0 \leq k < 1$ with $d(f(x), f(y)) \leq k \cdot d(x,y)$ for all x, y. Then f has a unique fixed point.

Unlike Brouwer's theorem, the Banach fixed point theorem is constructive: it provides an algorithm.

**Proof:** Pick any $x_0 \in X$ and define $x_{n+1} = f(x_n)$. Then:
$$d(x_{n+1}, x_n) = d(f(x_n), f(x_{n-1})) \leq k \cdot d(x_n, x_{n-1}) \leq \cdots \leq k^n d(x_1, x_0)$$

This shows $(x_n)$ is Cauchy. By completeness, $x_n \to x^*$. By continuity, $f(x^*) = x^*$. Uniqueness follows because if $f(x) = x$ and $f(y) = y$, then $d(x,y) = d(f(x), f(y)) \leq k \cdot d(x,y)$, forcing $x = y$.

**Applications:**
- **Picard's existence theorem:** Proves existence and uniqueness for ODEs $y' = f(t,y)$
- **Inverse function theorem:** Local invertibility via contraction mapping
- **Numerical methods:** Convergence of iterative algorithms

## The Schauder Fixed Point Theorem

**Theorem (Schauder, 1930):** Let K be a non-empty compact convex subset of a Banach space, and let $f: K \to K$ be continuous. Then f has a fixed point.

This generalizes Brouwer's theorem to infinite dimensions. The key insight is that compact convex sets in infinite-dimensional spaces behave like finite-dimensional disks for topological purposes.

**More General Version:** Let K be a closed bounded convex subset of a Banach space, and let $f: K \to K$ be continuous with f(K) relatively compact. Then f has a fixed point.

This version is crucial because K itself need not be compact in the infinite-dimensional setting.

**Proof idea:** Approximate the infinite-dimensional space by finite-dimensional subspaces. Use Brouwer's theorem on these approximations and take limits. Compactness ensures convergence.

**Applications to PDEs:** The Schauder theorem proves existence of solutions to elliptic partial differential equations. By reformulating the PDE as an integral equation, one obtains a compact operator on a function space, to which Schauder applies.

## The Tychonoff Fixed Point Theorem

**Theorem (Tychonoff, 1935):** Let K be a non-empty compact convex subset of a locally convex topological vector space. Every continuous map $f: K \to K$ has a fixed point.

This extends Schauder to the most general setting of locally convex spaces, which include spaces of distributions, spaces of smooth functions, and other infinite-dimensional spaces arising in analysis.

## The Kakutani Fixed Point Theorem

**Theorem (Kakutani, 1941):** Let K be a non-empty compact convex subset of $\mathbb{R}^n$, and let $\Phi: K \to 2^K$ be a set-valued map (correspondence) such that:
1. For each $x \in K$, $\Phi(x)$ is non-empty and convex
2. $\Phi$ has closed graph: $(x_n, y_n) \to (x,y)$ with $y_n \in \Phi(x_n)$ implies $y \in \Phi(x)$

Then $\Phi$ has a fixed point: some $x^* \in K$ with $x^* \in \Phi(x^*)$.

**Significance:** This extends fixed point theory from functions to correspondences, essential when best responses are not unique.

**Application—Nash Equilibrium for General Games:** For non-zero-sum games, best responses may not be single-valued. Kakutani's theorem handles this, providing existence of Nash equilibrium in more general settings than Brouwer alone.

## The Lefschetz Fixed Point Theorem

**Theorem (Lefschetz, 1926):** Let X be a compact triangulable space and $f: X \to X$ continuous. If the Lefschetz number $L(f) \neq 0$, then f has a fixed point.

The Lefschetz number is defined using homology:
$$L(f) = \sum_{k=0}^n (-1)^k \text{tr}(f_*: H_k(X) \to H_k(X))$$

where $f_*$ is the induced map on homology groups.

**Special Cases:**
- For the identity map, $L(\text{id}) = \chi(X)$, the Euler characteristic
- If $\chi(X) \neq 0$, every map homotopic to the identity has a fixed point
- For $S^{2n}$, $\chi(S^{2n}) = 2$, so every self-map has a fixed point (Brouwer for spheres)

**Example:** The torus $T^2$ has $\chi(T^2) = 0$, so the Lefschetz theorem doesn't guarantee fixed points. Indeed, translations on the torus have no fixed points.

**Advantage over Brouwer:** The Lefschetz theorem applies to arbitrary topological spaces, not just disks, and provides a computable criterion (checking if $L(f) \neq 0$).

## Fixed Point Index

The **fixed point index** $i(f, U, p)$ generalizes degree theory to count fixed points with multiplicity and sign. For an isolated fixed point p of $f: U \to \mathbb{R}^n$, the index measures how f "wraps around" near p.

**Properties:**
1. **Homotopy invariance:** If $f_t$ varies continuously with no fixed points on $\partial U$, then $i(f_0, U) = i(f_1, U)$
2. **Additivity:** If U is a disjoint union, indices add
3. **Normalization:** $i(\text{id}, U, p) = 1$

**Application:** A non-zero index sum guarantees fixed points exist. This refines the Lefschetz theorem and connects to intersection theory.

## Topological Degree

The **Brouwer degree** $\deg(f, U, y)$ counts (with sign and multiplicity) the number of solutions to $f(x) = y$ in U, where $f: \overline{U} \to \mathbb{R}^n$ with $y \notin f(\partial U)$.

**Theorem:** If $\deg(f, U, y) \neq 0$, then the equation $f(x) = y$ has at least one solution in U.

**Properties:**
- Degree is a homotopy invariant
- Degree is additive over disjoint domains
- Degree of the identity is 1
- Degree detects surjectivity and counts preimages

## Applications to Differential Equations

Fixed point theorems convert differential equations into integral equations, where continuity and compactness allow fixed point arguments:

**Ordinary Differential Equations:** The IVP $y' = f(t,y)$, $y(0) = y_0$ is equivalent to the integral equation:
$$y(t) = y_0 + \int_0^t f(s, y(s)) \, ds$$

The integral operator $T(y)(t) = y_0 + \int_0^t f(s, y(s)) \, ds$ maps a function space to itself. Under Lipschitz conditions, T is a contraction (Banach). Under weaker conditions, T is compact (Schauder).

**Partial Differential Equations:** Elliptic PDEs like $\Delta u = f(x, u)$ can be reformulated using Green's functions, yielding compact operators on function spaces. Schauder's theorem then provides existence.

**Periodic Solutions:** Finding periodic solutions to $y' = f(t, y)$ reduces to finding fixed points of the period map (Poincaré map). Brouwer's theorem applies when the period map takes a disk to itself.

## Key Takeaways

- Fixed point theorems prove existence of solutions across mathematics
- Brouwer's theorem is topological and non-constructive but widely applicable
- Banach's theorem is metric, constructive, and algorithmic
- Schauder and Tychonoff extend fixed point theory to infinite dimensions
- Kakutani's theorem handles set-valued maps, essential for game theory
- The Lefschetz theorem uses algebraic topology to detect fixed points
- Degree theory refines fixed point theory with quantitative information
- Applications include Nash equilibria, market equilibria, and differential equations
- The interplay between topology, analysis, and algebra makes fixed point theory powerful
