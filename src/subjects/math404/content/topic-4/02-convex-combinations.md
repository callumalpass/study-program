---
title: "Convex Combinations"
description: "Convex hulls and combinations"
---

# Convex Combinations

Once we have defined convex sets, we can define operations that generate them. The most important concept here is the **convex combination**, which generalizes the idea of a "weighted average" to vectors in high-dimensional space. Understanding convex combinations provides a constructive way to build convex sets and leads to fundamental theorems in convex geometry.

## Definition

A vector $x$ is a **convex combination** of the points $x_1, x_2, \dots, x_k$ if:
$$ x = \theta_1 x_1 + \theta_2 x_2 + \dots + \theta_k x_k $$
where:
1. $\theta_i \geq 0$ for all $i$ (non-negative weights)
2. $\sum_{i=1}^k \theta_i = 1$ (weights sum to one)

This is distinct from other types of combinations:

| Type | Constraints on $\theta_i$ |
|------|--------------------------|
| **Linear Combination** | No restrictions on $\theta_i$ |
| **Affine Combination** | $\sum \theta_i = 1$, but $\theta_i$ can be negative |
| **Conic Combination** | $\theta_i \geq 0$, but no restriction on sum |
| **Convex Combination** | $\theta_i \geq 0$ AND $\sum \theta_i = 1$ |

### Physical Interpretation

A convex combination can be thought of as the center of mass of unit masses placed at $x_i$ with weights $\theta_i$. Since weights are non-negative and sum to one, the center of mass must lie "between" the points. This physical intuition explains why convex combinations always stay within the "boundary" of the original points.

Another way to think about it: if you have a collection of locations and you want to choose a weighted average location, the convex combination gives you exactly those locations you can reach by distributing your weight among the given points.

### Alternative Characterization

A set $C$ is convex if and only if it contains all convex combinations of its points. This provides an equivalent definition of convexity that generalizes from two points to any finite number of points.

## The Convex Hull

The **convex hull** of a set $C$, denoted $\textbf{conv}(C)$, is the set of all convex combinations of points in $C$:
$$ \textbf{conv}(C) = \{ \sum_{i=1}^k \theta_i x_i \mid x_i \in C, \theta_i \geq 0, \sum \theta_i = 1, k \in \mathbb{N} \} $$

Geometrically, the convex hull is the "shrink wrap" containing the set $C$. It is the smallest convex set that contains $C$. You can also think of it as stretching a rubber band around the set.

### Properties of the Convex Hull

1. $\textbf{conv}(C)$ is always convex, regardless of whether $C$ is convex.
2. $C \subseteq \textbf{conv}(C)$ (the hull contains the original set).
3. If $C$ is already convex, then $\textbf{conv}(C) = C$.
4. $\textbf{conv}(C)$ is the intersection of all convex sets containing $C$.
5. For finite sets, $\textbf{conv}(C)$ is always a polytope.

### Computation of Convex Hulls

For a finite set of points in $\mathbb{R}^2$ or $\mathbb{R}^3$, efficient algorithms exist to compute the convex hull:
- **Gift wrapping algorithm:** O(nh) where h is the number of hull vertices
- **Graham scan:** O(n log n) in 2D
- **Quickhull:** O(n log n) expected time

These algorithms are fundamental in computational geometry and have applications in computer graphics, robotics, and geographic information systems.

## Examples

1. **Two Points:** The convex hull of $\{x_1, x_2\}$ is the line segment connecting them: $\{\theta x_1 + (1-\theta) x_2 \mid \theta \in [0,1]\}$.

2. **Three Points:** The convex hull of $\{x_1, x_2, x_3\}$ (not collinear) is the triangle with these vertices (including the interior). Every point in the triangle can be written as $\theta_1 x_1 + \theta_2 x_2 + \theta_3 x_3$ with $\theta_i \geq 0$ and $\sum \theta_i = 1$.

3. **Unit Circle:** The convex hull of the unit circle (boundary) is the unit disk (filled). The circle is not convex, but its hull is.

4. **Four Points in $\mathbb{R}^3$:** The convex hull of four non-coplanar points is a tetrahedron.

5. **Star Shape:** The convex hull of a 5-pointed star is a regular pentagon.

## Carathéodory's Theorem

A fundamental result in convex geometry relates the dimension of the space to the number of points needed to express a convex combination.

**Theorem (Carathéodory):**
If $S \subseteq \mathbb{R}^n$ and $x \in \textbf{conv}(S)$, then $x$ can be expressed as a convex combination of **at most $n+1$ points** from $S$.

This is a remarkable economy result: no matter how many points are in $S$, you never need more than $n+1$ of them to represent any point in the convex hull.

*Proof Sketch:*
Suppose $x = \sum_{i=1}^k \theta_i x_i$ with $k > n+1$. The vectors $x_2 - x_1, x_3 - x_1, \ldots, x_k - x_1$ are $k-1 > n$ vectors in $\mathbb{R}^n$, so they must be linearly dependent. This means we can find coefficients $\mu_i$ (not all zero) such that $\sum \mu_i x_i = 0$ and $\sum \mu_i = 0$. By adjusting the $\theta_i$ using these $\mu_i$, we can eliminate at least one point from the representation while maintaining the convex combination property.

### Examples of Carathéodory's Theorem

*Example in $\mathbb{R}^2$:*
If a point is inside a complex shape (like a country on a map), it can be contained within a triangle (3 points) formed by points in that shape. You don't need 100 points to surround it; 3 suffice.

*Example in $\mathbb{R}^3$:*
Any point in a convex hull can be enclosed in a tetrahedron (4 points).

*Example in $\mathbb{R}^n$:*
Any point in the convex hull of $S \subseteq \mathbb{R}^n$ can be written as a convex combination of at most $n+1$ points from $S$. This is tight: a simplex in $\mathbb{R}^n$ has $n+1$ vertices, and the centroid requires all $n+1$ vertices to express.

## Vertices and Extreme Points

An **extreme point** of a convex set $C$ is a point that cannot be written as a convex combination of two other distinct points in $C$.

Formally:
$$ x \text{ is extreme} \iff \nexists y, z \in C \setminus \{x\}, \theta \in (0,1) \text{ s.t. } x = \theta y + (1-\theta)z $$

Equivalently, $x$ is extreme if whenever $x = \theta y + (1-\theta)z$ for some $y, z \in C$ and $\theta \in (0,1)$, we must have $y = z = x$.

### Examples of Extreme Points

- In a triangle, the three vertices are extreme points; all other points are not extreme.
- In a disk, every point on the boundary (circle) is an extreme point.
- In a polyhedron, extreme points correspond to **vertices**.
- An open set has no extreme points (since boundary points are excluded).

### Finding Extreme Points

For a polyhedron defined by $\{x \mid Ax \leq b\}$, extreme points occur where $n$ linearly independent constraints are active (hold with equality). This gives a system of linear equations whose solution is a vertex.

## Krein-Milman Theorem

**Theorem (Krein-Milman):**
A compact (closed and bounded) convex set is the convex hull of its extreme points.

*Example:* A solid square is the convex hull of its 4 corners. You can reconstruct the entire square just by knowing the corners.

*Example:* A disk is the convex hull of its boundary circle (which consists entirely of extreme points).

This theorem has profound implications for optimization:

### Application to the Simplex Method

The Krein-Milman theorem explains why the Simplex method works! The optimum of a linear function over a compact convex set must occur at an extreme point. We only need to search the vertices, not the entire infinite feasible region.

More precisely, if we maximize $c^T x$ over a polytope $P$:
1. The maximum exists (compactness).
2. The maximum is attained at an extreme point (linearity of objective + convexity).
3. The Simplex method moves from vertex to vertex, improving the objective at each step.

## Conic Combinations and Cones

A **conic combination** (or non-negative linear combination) of points $x_1, \ldots, x_k$ is:
$$ x = \theta_1 x_1 + \cdots + \theta_k x_k, \quad \theta_i \geq 0 $$

Note that the weights do not need to sum to one.

A set $K$ is a **cone** if for every $x \in K$ and $\theta \geq 0$, we have $\theta x \in K$. A set is a **convex cone** if it is both convex and a cone, which is equivalent to being closed under conic combinations.

### Examples of Convex Cones

- The non-negative orthant $\mathbb{R}^n_+$
- The positive semidefinite cone $\mathbb{S}^n_+$
- The second-order cone (Lorentz cone): $\{(x, t) \mid \|x\|_2 \leq t\}$
- The cone of polynomials that are non-negative on an interval

## Common Mistakes

1. **Confusing affine and convex combinations:** Affine combinations allow negative weights; convex combinations require non-negative weights.

2. **Forgetting that k can vary:** In the convex hull definition, you can use any number of points, not a fixed number.

3. **Misapplying Carathéodory:** The theorem says $n+1$ points suffice for any representation, not that every representation uses exactly $n+1$ points.

4. **Confusing extreme points with boundary points:** Not all boundary points are extreme (e.g., points on an edge of a cube but not at a vertex).

## Key Takeaways

- A convex combination has non-negative weights summing to one.
- The convex hull is the smallest convex set containing a given set.
- Carathéodory's theorem: At most $n+1$ points suffice in $\mathbb{R}^n$.
- Extreme points cannot be expressed as convex combinations of other points.
- Krein-Milman: Compact convex sets equal the hull of their extreme points.
- These results underpin the Simplex method and many optimization algorithms.
