# Introduction to Algebraic Topology

Algebraic topology uses algebraic structures to study topological spaces, converting topological problems into algebraic ones that are often easier to solve.

## The Main Idea

**Goal:** Assign algebraic invariants (groups, rings, etc.) to topological spaces such that:
1. Homeomorphic spaces have isomorphic invariants
2. The invariants are computable
3. Different spaces have different invariants

## Homotopy

**Definition:** Two continuous maps $f, g: X \to Y$ are **homotopic** ($f \simeq g$) if there exists a continuous $H: X \times [0,1] \to Y$ with $H(x, 0) = f(x)$ and $H(x, 1) = g(x)$.

**Definition:** Spaces X and Y are **homotopy equivalent** if there exist maps $f: X \to Y$ and $g: Y \to X$ with $g \circ f \simeq id_X$ and $f \circ g \simeq id_Y$.

**Example:** $\mathbb{R}^n$ is homotopy equivalent to a point (contractible).

**Example:** $\mathbb{R}^n \setminus \{0\}$ is homotopy equivalent to $S^{n-1}$.

## The Fundamental Group

**Definition:** The **fundamental group** $\pi_1(X, x_0)$ is the set of homotopy classes of loops based at $x_0$, with group operation given by concatenation.

**Properties:**
- $\pi_1$ is a homotopy invariant
- Simply connected spaces have trivial $\pi_1$
- $\pi_1(S^1) \cong \mathbb{Z}$
- $\pi_1(T^2) \cong \mathbb{Z} \times \mathbb{Z}$

## Higher Homotopy Groups

**Definition:** $\pi_n(X, x_0)$ is the set of homotopy classes of maps $(S^n, *) \to (X, x_0)$.

**Properties:**
- $\pi_n$ is abelian for $n \geq 2$
- $\pi_n(S^n) \cong \mathbb{Z}$
- Computing higher homotopy groups is very difficult

## Homology

**Idea:** Homology measures "holes" of various dimensions:
- $H_0$: connected components
- $H_1$: 1-dimensional holes (loops)
- $H_2$: 2-dimensional holes (voids)

**Definition (Simplicial):** For a simplicial complex K:
- Chain groups $C_n(K)$ = formal sums of n-simplices
- Boundary maps $\partial_n: C_n \to C_{n-1}$
- $H_n(K) = \ker \partial_n / \text{im } \partial_{n+1}$

**Examples:**
- $H_n(\text{point}) = 0$ for $n > 0$
- $H_n(S^n) \cong \mathbb{Z}$, $H_k(S^n) = 0$ for $0 < k < n$
- $H_1(T^2) \cong \mathbb{Z}^2$, $H_2(T^2) \cong \mathbb{Z}$

## The Euler Characteristic

**Definition:** The **Euler characteristic** is:
$$\chi(X) = \sum_{n=0}^\infty (-1)^n \rank H_n(X)$$

**Examples:**
- $\chi(S^2) = 2$
- $\chi(T^2) = 0$
- $\chi(\mathbb{RP}^2) = 1$

## Cohomology

**Definition:** Cohomology groups $H^n(X; G)$ are defined dually to homology, using cochains (functions on chains).

**Advantage:** Cohomology has a natural ring structure via the cup product:
$$\cup: H^p(X) \times H^q(X) \to H^{p+q}(X)$$

## Exact Sequences

**Mayer-Vietoris Sequence:** For $X = A \cup B$:
$$\cdots \to H_n(A \cap B) \to H_n(A) \oplus H_n(B) \to H_n(X) \to H_{n-1}(A \cap B) \to \cdots$$

This allows computation of homology by decomposition.

## Key Theorems

**Brouwer Fixed Point:** Every continuous $f: D^n \to D^n$ has a fixed point.

**Invariance of Domain:** A continuous injection $\mathbb{R}^n \to \mathbb{R}^n$ is an open map.

**Borsuk-Ulam:** Every continuous $f: S^n \to \mathbb{R}^n$ has $x$ with $f(x) = f(-x)$.
