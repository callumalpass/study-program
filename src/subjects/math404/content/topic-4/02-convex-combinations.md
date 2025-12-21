---
title: "Convex Combinations"
description: "Convex hulls and combinations"
---

# Convex Combinations

Once we have defined convex sets, we can define operations that generate them. The most important concept here is the **convex combination**, which generalizes the idea of a "weighted average" to vectors in high-dimensional space.

## Definition

A vector $x$ is a **convex combination** of the points $x_1, x_2, \dots, x_k$ if:
$$ x = \theta_1 x_1 + \theta_2 x_2 + \dots + \theta_k x_k $$
where:
1.  $\theta_i \geq 0$ for all $i$
2.  $\sum_{i=1}^k \theta_i = 1$

This is distinct from:
- **Linear Combination:** No restrictions on $\theta_i$.
- **Affine Combination:** $\sum \theta_i = 1$, but $\theta_i$ can be negative.
- **Conic Combination:** $\theta_i \geq 0$, but no restriction on sum.

### Physical Interpretation
A convex combination can be thought of as the center of mass of unit masses placed at $x_i$ with weights $\theta_i$. Since weights are non-negative, the center of mass must lie "between" the points.

## The Convex Hull

The **convex hull** of a set $C$, denoted $\textbf{conv}(C)$, is the set of all convex combinations of points in $C$.
$$ \textbf{conv}(C) = \{ \sum_{i=1}^k \theta_i x_i \mid x_i \in C, \theta_i \geq 0, \sum \theta_i = 1, k \in \mathbb{N} \} $$

Geometrically, the convex hull is the "shrink wrap" containing the set $C$. It is the smallest convex set that contains $C$.

### Properties
1.  $\textbf{conv}(C)$ is always convex.
2.  $C \subseteq \textbf{conv}(C)$.
3.  If $C$ is convex, then $\textbf{conv}(C) = C$.

## Examples

1.  **Two Points:** The convex hull of {$x_1, x_2$} is the line segment connecting them.
2.  **Three Points:** The convex hull of {$x_1, x_2, x_3$} (not collinear) is the triangle with these vertices (including the interior).
3.  **Unit Circle:** The convex hull of the unit circle (boundary) is the unit disk (filled).

## Carathéodory's Theorem

A fundamental result in convex geometry relates the dimension of the space to the number of points needed to express a convex combination.

**Theorem (Carathéodory):**
If $S \subseteq \mathbb{R}^n$ and $x \in \textbf{conv}(S)$, then $x$ can be expressed as a convex combination of **at most $n+1$ points** from $S$.

*Example in $\mathbb{R}^2$:*
If a point is inside a complex shape (like a country on a map), it can be contained within a triangle (3 points) formed by points in that shape. You don't need 100 points to surround it; 3 suffice.

*Example in $\mathbb{R}^3$:*
Any point in a convex hull can be enclosed in a tetrahedron (4 points).

## Vertices and Extreme Points

An **extreme point** of a convex set $C$ is a point that cannot be written as a convex combination of two other distinct points in $C$.
$$ x \text{ is extreme} \iff \nexists y, z \in C \setminus \{x\}, \theta \in (0,1) \text{ s.t. } x = \theta y + (1-\theta)z $$

In a polyhedron, extreme points correspond to **vertices**.

**Krein-Milman Theorem:**
A compact (closed and bounded) convex set is the convex hull of its extreme points.
*Example:* A solid square is the convex hull of its 4 corners. You can reconstruct the entire square just by knowing the corners.

This is the geometric reason why the Simplex method works! The optimum of a linear function over a compact convex set must occur at an extreme point. We only need to search the vertices.