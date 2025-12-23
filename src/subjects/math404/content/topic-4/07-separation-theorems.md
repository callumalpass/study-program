---
title: "Separation Theorems"
description: "Geometric foundations of duality"
---

# Separation Theorems

The geometric intuition behind Strong Duality and Lagrange Multipliers comes from the **Separating Hyperplane Theorem**. These theorems describe how disjoint convex sets can be separated by a flat boundary (a hyperplane). Understanding separation theorems provides the deepest insight into why duality works and why convex optimization is fundamentally different from non-convex optimization.

## Hyperplanes and Halfspaces

A **hyperplane** $H$ in $\mathbb{R}^n$ is defined by a normal vector $a \neq 0$ and a scalar $b$:
$$ H = \{ x \mid a^T x = b \} $$

Geometrically, a hyperplane is a flat $(n-1)$-dimensional surface:
- In $\mathbb{R}^2$, a hyperplane is a line
- In $\mathbb{R}^3$, a hyperplane is a plane
- In $\mathbb{R}^n$, a hyperplane has dimension $n-1$

The vector $a$ is perpendicular (normal) to the hyperplane. The scalar $b/\|a\|$ represents the signed distance from the origin to the hyperplane.

A hyperplane divides the space into two closed **halfspaces**:
$$ H^+ = \{ x \mid a^T x \geq b \} \quad \text{(positive halfspace)}$$
$$ H^- = \{ x \mid a^T x \leq b \} \quad \text{(negative halfspace)}$$

The open halfspaces (with strict inequality) are the interiors of these sets.

## Separating Hyperplane Theorem

The fundamental result connecting convexity and separation:

**Theorem (Separating Hyperplane):** Let $C$ and $D$ be two non-empty **disjoint** convex sets ($C \cap D = \emptyset$). Then there exists a hyperplane that separates them.

That is, there exist $a \neq 0$ and $b$ such that:
$$ a^T x \leq b \quad \forall x \in C $$
$$ a^T x \geq b \quad \forall x \in D $$

Equivalently, $C \subseteq H^-$ and $D \subseteq H^+$.

### Geometric Intuition

If you have two convex blobs that don't touch, you can always slide a sheet of paper between them. The sheet is the separating hyperplane.

**Why convexity is necessary:** If the sets were non-convex (e.g., a C-shape and a dot inside the C), you might not be able to separate them with a straight plane. A curved surface might be needed, but that's not a hyperplane.

### Proof Sketch

The proof uses the projection onto convex sets:
1. Since $C$ and $D$ are disjoint, consider the set $C - D = \{c - d \mid c \in C, d \in D\}$.
2. This set is convex and does not contain the origin.
3. Let $z^*$ be the point in $C - D$ closest to the origin.
4. The hyperplane through $z^*$ perpendicular to $z^*$ separates the origin from $C - D$.
5. This translates to a hyperplane separating $C$ from $D$.

## Strict Separation Theorem

The basic theorem gives non-strict separation (the hyperplane may touch the sets). For strict separation, we need additional conditions.

**Theorem (Strict Separation):** Let $C$ and $D$ be disjoint convex sets. If $C$ is **closed** and $D$ is **compact** (closed and bounded), then there exists a hyperplane strictly separating them:
$$ a^T x < b < a^T y \quad \forall x \in C, \forall y \in D $$

There is a positive gap between the hyperplane and both sets.

### Example: No Strict Separation

Consider $C = \{(x, y) \mid y \geq 1/x, x > 0\}$ (above a hyperbola) and $D = \{(x, 0) \mid x \geq 0\}$ (the positive x-axis). These are disjoint convex sets, but the infimal distance between them is 0 (they get arbitrarily close). There is a separating hyperplane (the x-axis itself) but no strictly separating hyperplane.

## Supporting Hyperplane Theorem

What if we consider just one set and a point on its boundary?

A hyperplane $H$ **supports** a set $C$ at a boundary point $x_0$ if:
1. $x_0 \in H$ (the plane passes through the point)
2. $C \subseteq H^-$ or $C \subseteq H^+$ (the entire set is on one side)

**Theorem (Supporting Hyperplane):** Let $C$ be a convex set with non-empty interior, and let $x_0$ be a point on the boundary of $C$. Then there exists a supporting hyperplane to $C$ at $x_0$.

This means at every boundary point of a convex set, we can place a tangent plane that doesn't cut through the interior.

### Converse

**Theorem:** If a closed set $S$ with non-empty interior has a supporting hyperplane at every boundary point, then $S$ is convex.

This provides another characterization of convexity: a set is convex if and only if it looks "locally convex" at every boundary point (has a supporting hyperplane).

## Connection to Optimization

Separation theorems are not just abstract geometry — they are the foundation of optimization theory.

### 1. Optimality Conditions

Consider minimizing $f(x)$ over a convex set $C$. Let $x^*$ be the optimum.

The sublevel set $S = \{x \mid f(x) \leq f(x^*)\}$ is tangent to $C$ at $x^*$ (they touch at $x^*$ but $S$ doesn't penetrate inside $C$ where $f < f(x^*)$).

By the Supporting Hyperplane Theorem, there is a hyperplane supporting $S$ at $x^*$. The normal vector to this hyperplane is related to $\nabla f(x^*)$.

This geometric tangency leads to the **first-order optimality condition**:
$$ \nabla f(x^*)^T (x - x^*) \geq 0 \quad \forall x \in C $$

In words: "any feasible direction from $x^*$ moves uphill (or stays level)."

### 2. Derivation of Lagrange Multipliers

Consider the problem:
$$\min f(x) \quad \text{s.t. } g_i(x) \leq 0$$

Define the set of achievable (constraint, objective) pairs:
$$G = \{(u, t) \mid \exists x: g_i(x) \leq u_i, f(x) \leq t\}$$

If the problem has optimal value $p^*$, then the point $(0, p^*)$ is on the boundary of $G$.

By the Supporting Hyperplane Theorem, there exists a supporting hyperplane at $(0, p^*)$ with normal $(\lambda, \mu)$.

The components $\lambda_i \geq 0$ are the **Lagrange multipliers**! They represent the "price" of relaxing constraint $i$.

### 3. Duality in Linear Programming

In linear programming:
$$\min c^T x \quad \text{s.t. } Ax = b, x \geq 0$$

The set of achievable $(Ax, c^T x)$ pairs is a convex set. The point $(b, z^*)$ where $z^* = c^T x^*$ lies on the boundary.

The supporting hyperplane at this point has normal vector $(y, -1)$ where $y$ is the dual solution.

The equation of the supporting hyperplane gives:
$$y^T (Ax) - c^T x \leq y^T b - z^* = 0$$
which means $y^T A \leq c^T$, the dual feasibility condition.

### 4. Farkas' Lemma

Farkas' Lemma is the Separating Hyperplane Theorem applied to a cone:

**Lemma (Farkas):** Exactly one of the following is true:
1. $\exists x \geq 0$ such that $Ax = b$
2. $\exists y$ such that $A^T y \geq 0$ and $b^T y < 0$

*Proof using separation:*
- Let $C = \{Ax \mid x \geq 0\}$ (the cone generated by columns of $A$).
- If $b \notin C$, then by the Separating Hyperplane Theorem, there exists $y$ separating $b$ from $C$.
- Since $C$ is a cone, the hyperplane must pass through the origin, giving $y^T z \geq 0$ for all $z \in C$ (i.e., $A^T y \geq 0$) and $y^T b < 0$.

Farkas' Lemma is the foundation of LP duality and certificates of infeasibility.

## The Hahn-Banach Theorem

In infinite-dimensional spaces (functional analysis), the Separating Hyperplane Theorem generalizes to the **Hahn-Banach Theorem**, which states that convex sets can be separated by continuous linear functionals. This is fundamental for infinite-dimensional optimization (e.g., optimal control, calculus of variations).

## Common Mistakes

1. **Assuming separation without convexity:** Non-convex sets may not be separable by a hyperplane, even if disjoint.

2. **Expecting strict separation always:** Strict separation requires additional conditions (closedness and compactness).

3. **Forgetting that the normal vector is not unique:** Many hyperplanes might separate the same pair of sets. The normal direction is unique only up to scaling and possible multiple separating hyperplanes.

4. **Confusing separation with tangency:** A separating hyperplane need not be tangent to either set; a supporting hyperplane must pass through a boundary point.

## Summary: The Geometry-Duality Connection

In Convex Optimization, geometry precedes algebra:

1. **Convexity** allows separation (Separating Hyperplane Theorem).
2. **Separation** gives existence of dual variables (Lagrange multipliers as hyperplane normals).
3. **Dual variables** provide optimality conditions (KKT conditions).
4. **KKT conditions** enable algorithms (interior-point, gradient methods).

This geometric foundation explains why convex optimization is fundamentally tractable: the separation theorems guarantee the existence of "certificates" (dual solutions) that verify optimality.

## Key Takeaways

- Disjoint convex sets can always be separated by a hyperplane.
- Supporting hyperplanes exist at every boundary point of a convex set.
- Lagrange multipliers arise as normal vectors to supporting hyperplanes.
- Farkas' Lemma is separation applied to cones.
- Separation theorems are the geometric foundation of duality theory.
