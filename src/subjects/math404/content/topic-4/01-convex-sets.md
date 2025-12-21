---
title: "Convex Sets"
description: "Definitions and examples of convex sets"
---

# Convex Sets

Convexity is the fundamental bedrock of modern optimization theory. While linear programming relies on polyhedra (a specific type of convex set), general convex optimization deals with a broader class of sets that share critical geometric properties.

## Definition

A set $C \subseteq \mathbb{R}^n$ is **convex** if the line segment between any two points in $C$ lies entirely in $C$.

Mathematically:
$$ \forall x, y \in C, \forall \theta \in [0, 1], \quad \theta x + (1 - \theta)y \in C $$

### Geometric Intuition
- **Convex:** A circle, a square, a solid ellipse, the entire plane. If you see it, it "bulges out" or is flat. It has no dents.
- **Non-Convex:** A crescent moon, a star, a donut (torus). You can pick two points in the set (e.g., opposite tips of the crescent) such that the line connecting them goes outside the set.

## Important Examples

### 1. Affine Sets
A set is **affine** if the line passing through any two points lies in the set (i.e., $\theta \in \mathbb{R}$, not just $[0,1]$).
- Example: Lines, planes, hyperplanes, the solution set of $Ax=b$.
- Every affine set is convex.

### 2. Hyperplanes and Halfspaces
A **hyperplane** is a set of the form:
$$ \{ x \mid a^T x = b \} $$
where $a \neq 0$. It divides space into two halves.

A **halfspace** is a set of the form:
$$ \{ x \mid a^T x \leq b \} $$
Halfspaces are convex. The intersection of halfspaces forms a polyhedron.

### 3. Euclidean Balls and Ellipsoids
A **Euclidean ball** centered at $x_c$ with radius $r$:
$$ B(x_c, r) = \{ x \mid \| x - x_c \|_2 \leq r \} $$
Balls are convex.

An **Ellipsoid**:
$$ \mathcal{E} = \{ x \mid (x - x_c)^T P^{-1} (x - x_c) \leq 1 \} $$
where $P$ is symmetric and positive definite ($P \succ 0$). Ellipsoids are convex.

### 4. Polyhedra
A **polyhedron** is defined by a finite number of linear inequalities and equalities:
$$ P = \{ x \mid Ax \leq b, Cx = d \} $$
Since it is the intersection of a finite number of halfspaces and hyperplanes (all convex), a polyhedron is convex.

### 5. Positive Semidefinite Cone
The set of symmetric positive semidefinite $n \times n$ matrices, denoted $\mathbb{S}^n_+$, is a convex cone.
If $A \succeq 0$ and $B \succeq 0$, then for any $\theta \in [0,1]$, $\theta A + (1-\theta)B \succeq 0$.

## Properties of Convex Sets

### Intersection
**Theorem:** The intersection of *any* number (finite or infinite) of convex sets is convex.
$$ C = \bigcap_{\alpha \in I} C_\alpha $$
*Proof:* If $x, y \in C$, then $x, y \in C_\alpha$ for all $\alpha$. Since each $C_\alpha$ is convex, the segment $xy$ is in each $C_\alpha$. Thus, the segment is in the intersection $C$.

*Example:* Since a halfspace is convex, and a polyhedron is the intersection of halfspaces, a polyhedron must be convex.

### Image and Pre-image
Let $f(x) = Ax + b$ be an affine function.
- If $C \subseteq \mathbb{R}^n$ is convex, its **image** $f(C)$ is convex.
- If $D \subseteq \mathbb{R}^m$ is convex, its **inverse image** $f^{-1}(D)$ is convex.

Example: The projection of a convex set onto a coordinate axis is a convex interval.

## Why Convexity Matters?

In optimization, if the feasible region is a convex set:
1.  A local optimum is automatically a global optimum (for convex objective functions).
2.  We can efficiently move from any point to any other point via a straight line without leaving the set.
3.  Mathematical analysis is tractable.

Conversely, optimizing over non-convex sets is generally NP-hard.