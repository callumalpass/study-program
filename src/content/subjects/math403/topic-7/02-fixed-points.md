# Fixed Point Theorems

Fixed point theorems guarantee the existence of points x where f(x) = x, with applications throughout mathematics and its applications.

## The Brouwer Fixed Point Theorem

**Theorem (Brouwer):** Every continuous function $f: D^n \to D^n$ from the closed n-disk to itself has a fixed point.

**Special Cases:**
- n = 1: Every continuous $f: [0,1] \to [0,1]$ has a fixed point
- n = 2: Every continuous self-map of a closed disk has a fixed point

### Proof Idea (using degree theory)
Suppose f has no fixed point. Then we can define a retraction $r: D^n \to S^{n-1}$ by projecting from f(x) through x to the boundary. But no such retraction exists (the boundary is not a retract of the disk).

## Applications of Brouwer's Theorem

### Game Theory
**Nash Equilibrium:** Every finite game has a Nash equilibrium in mixed strategies.

*Proof:* The best-response correspondence defines a continuous map on the simplex of mixed strategies. By Brouwer's theorem, it has a fixed point.

### Economics
**Existence of Equilibrium:** Under suitable conditions, markets have price equilibria.

## The Banach Fixed Point Theorem

**Theorem:** A contraction on a complete metric space has a unique fixed point.

This constructive theorem provides an algorithm (iteration) for finding the fixed point.

## The Schauder Fixed Point Theorem

**Theorem (Schauder):** Let K be a non-empty compact convex subset of a Banach space, and let $f: K \to K$ be continuous. Then f has a fixed point.

This generalizes Brouwer's theorem to infinite dimensions.

**Theorem (Schauder):** Let K be a closed bounded convex subset of a Banach space, and let $f: K \to K$ be continuous with f(K) relatively compact. Then f has a fixed point.

## The Tychonoff Fixed Point Theorem

**Theorem (Tychonoff):** Let K be a non-empty compact convex subset of a locally convex topological vector space. Every continuous $f: K \to K$ has a fixed point.

## The Kakutani Fixed Point Theorem

**Theorem (Kakutani):** Let K be a non-empty compact convex subset of $\mathbb{R}^n$, and let $\Phi: K \to 2^K$ be a set-valued map such that:
1. For each $x \in K$, $\Phi(x)$ is non-empty and convex
2. $\Phi$ has closed graph

Then $\Phi$ has a fixed point: some $x \in K$ with $x \in \Phi(x)$.

**Application:** Nash equilibrium for non-zero-sum games.

## The Lefschetz Fixed Point Theorem

**Theorem (Lefschetz):** Let X be a compact triangulable space and $f: X \to X$ continuous. If the Lefschetz number $L(f) \neq 0$, then f has a fixed point.

$$L(f) = \sum_{k=0}^n (-1)^k \text{tr}(f_*: H_k(X) \to H_k(X))$$

**Special Case:** For the identity map, $L(\text{id}) = \chi(X)$ (Euler characteristic). If $\chi(X) \neq 0$, every map homotopic to the identity has a fixed point.

## Fixed Point Index

The **fixed point index** generalizes degree theory to count fixed points with multiplicity and sign.

**Properties:**
1. Homotopy invariance
2. Additivity
3. Normalization

## Topological Degree

The **Brouwer degree** $\deg(f, U, y)$ counts (with sign) solutions to $f(x) = y$ in U.

**Theorem:** If $\deg(f, U, y) \neq 0$, then $f(x) = y$ has a solution in U.

## Applications to Differential Equations

Fixed point theorems prove existence of solutions:
- ODEs become integral equations
- PDEs can have fixed point formulations
- Periodic solutions via Poincaré maps
