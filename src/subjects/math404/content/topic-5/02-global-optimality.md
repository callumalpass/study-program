---
title: "Global Optimality"
description: "Why local optima are global in convex optimization"
---

# Global Optimality

The single most important property of convex optimization problems is that **every local optimum is a global optimum**. This property turns the impossible task of finding the absolute best solution in a vast landscape into a tractable hill-climbing procedure.

## Definitions

Consider minimizing $f(x)$ over a feasible set $C$.

1.  **Local Minimum:** A point $x \in C$ is a local minimum if there exists a radius $r > 0$ such that:
    $$ f(x) \leq f(y) \quad \forall y \in C \text{ s.t. } \|y - x\| \leq r $$ 
    (It is the best point in its immediate neighborhood).

2.  **Global Minimum:** A point $x \in C$ is a global minimum if:
    $$ f(x) \leq f(y) \quad \forall y \in C $$ 
    (It is the best point everywhere).

## The Fundamental Theorem

**Theorem:** For a convex optimization problem (convex objective $f$, convex feasible set $C$), any local minimum is a global minimum.

**Proof by Contradiction:**
Suppose $x$ is a local minimum but not global.
Then there exists some $y \in C$ (far away) such that $f(y) < f(x)$.

Consider the line segment connecting $x$ and $y$:
$$ z(\theta) = (1 - \theta)x + \theta y, \quad \theta \in [0, 1] $$ 
Since $C$ is convex, this entire segment is inside $C$.

By convexity of $f$:
$$ f(z(\theta)) \leq (1 - \theta)f(x) + \theta f(y) $$ 

Since $f(y) < f(x)$, we have:
$$ f(z(\theta)) < (1 - \theta)f(x) + \theta f(x) = f(x) $$ 

So for **any** $\theta > 0$, $f(z(\theta)) < f(x)$.
Pick $\theta$ very small (small enough that $z(\theta)$ is inside the local radius $r$).
Then $z(\theta)$ is a neighbor of $x$ that is strictly better than $x$.
This contradicts the assumption that $x$ is a local minimum.

Thus, no such better point $y$ can exist. $x$ must be global. $\blacksquare$

## Optimality Conditions

Since local implies global, we just need to find a point that satisfies **local** optimality conditions.

### Unconstrained Case
If minimizing $f(x)$ over $\mathbb{R}^n$, a necessary and sufficient condition for $x^*$ to be global optimum is:
$$ \nabla f(x^*) = 0 $$ 
(Assuming $f$ is differentiable).

### Constrained Case
If minimizing $f(x)$ over a convex set $C$, the condition is:
$$ \nabla f(x^*)^T (y - x^*) \geq 0 \quad \forall y \in C $$ 

**Geometric Interpretation:**
$-\nabla f(x^*)$ is the direction of steepest descent.
The condition says: "Any feasible direction $(y - x^*)$ makes an angle $\leq 90^\circ$ with the gradient."
Or: "To improve the objective, you must move generally opposite to the gradient. But moving opposite to the gradient would take you **outside** the feasible set."

$x^*$ is "pressed up against the wall" of the feasible set such that the only way to go down is to go through the wall.

### Uniqueness
If $f$ is **strictly convex**, the global minimum is **unique**.
If $f$ is just convex (e.g., linear), there might be many global minima (an entire face of the polyhedron), but they all have the same optimal objective value.

## Why Non-Convex is Hard

In non-convex landscapes (like neural network loss landscapes):
- There are many local minima.
- There are saddle points (flat regions that aren't minima).
- A gradient-based algorithm might get stuck in a "puddle" (local min) while the "ocean" (global min) is over the mountain range.
- Verification is impossible: You can't know if you are at the global min without exploring the entire space.

In convex optimization, if your gradient is zero, you are done. You have found the absolute best solution.