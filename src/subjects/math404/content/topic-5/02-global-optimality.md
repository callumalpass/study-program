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

## Extended Example: Linear Programming

Consider the LP:
$$
\min \quad c^T x \quad \text{s.t.} \quad Ax = b, \quad x \geq 0
$$

The objective $c^T x$ is linear (both convex and concave). The feasible set is a polyhedron (intersection of halfspaces and hyperplanes), which is convex.

**Optimality Condition:**
At an optimal vertex $x^*$, the gradient $c$ must satisfy:
$$ c^T (y - x^*) \geq 0 \quad \forall y \in C $$

where $C = \{x : Ax = b, x \geq 0\}$.

**Geometric Interpretation:**
The gradient $c$ points "outward" from the feasible region at $x^*$. Any feasible direction $(y - x^*)$ has a non-negative dot product with $c$, meaning moving in any feasible direction increases the objective.

**Consequence:** The simplex algorithm finds a vertex satisfying local optimality (adjacent vertices have higher cost). By the theorem, this vertex is globally optimal.

## Proof Sketch: Constrained Optimality

For a constrained problem $\min f(x)$ subject to $x \in C$ (convex), the optimality condition:
$$ \nabla f(x^*)^T (y - x^*) \geq 0 \quad \forall y \in C $$

can be derived using the **supporting hyperplane** theorem.

**Derivation:**
Suppose $x^*$ is optimal. Then for any $y \in C$ and $\theta \in (0, 1)$:
$$ z = (1-\theta)x^* + \theta y \in C $$
(by convexity of $C$).

Since $x^*$ is optimal:
$$ f(x^*) \leq f(z) $$

By convexity of $f$:
$$ f(z) \leq (1-\theta)f(x^*) + \theta f(y) $$

Combining:
$$ f(x^*) \leq (1-\theta)f(x^*) + \theta f(y) $$
$$ \theta f(x^*) \leq \theta f(y) $$
$$ f(x^*) \leq f(y) $$

This holds for all $y \in C$, confirming $x^*$ is global.

Now, for the first-order condition: Consider the directional derivative in direction $(y - x^*)$:
$$ \lim_{\theta \to 0^+} \frac{f(x^* + \theta(y - x^*)) - f(x^*)}{\theta} = \nabla f(x^*)^T (y - x^*) $$

Since $f(x^* + \theta(y - x^*)) \geq f(x^*)$ for small $\theta$ (by optimality), the directional derivative must be non-negative:
$$ \nabla f(x^*)^T (y - x^*) \geq 0 $$

This is the **first-order necessary and sufficient condition** for convex optimization.

## The Role of Strict Convexity

If $f$ is **strictly convex**, the global minimum is **unique**.

**Proof:**
Suppose $x$ and $y$ are both global minima with $x \neq y$. Then:
$$ f(x) = f(y) = p^* $$
where $p^*$ is the optimal value.

Consider the midpoint $z = \frac{1}{2}x + \frac{1}{2}y$. By strict convexity:
$$ f(z) < \frac{1}{2}f(x) + \frac{1}{2}f(y) = \frac{1}{2}p^* + \frac{1}{2}p^* = p^* $$

But this contradicts the fact that $p^*$ is the minimum. Thus, there cannot be two distinct global minima. $\blacksquare$

**Example:**
- $f(x) = x^2$ is strictly convex. The problem $\min x^2$ has a unique solution $x = 0$.
- $f(x) = |x|$ is convex but not strictly convex. The problem $\min |x|$ also has a unique solution $x = 0$, but this is not guaranteed by strict convexity.
- $f(x) = 0$ (constant) is convex but not strictly convex. The problem $\min f(x)$ s.t. $x \in [0,1]$ has infinitely many solutions (the entire interval).

## Comparison with Non-Convex Optimization

Consider the non-convex function $f(x) = x^4 - 2x^2$ on $\mathbb{R}$.

**Critical points:** $\nabla f = 4x^3 - 4x = 4x(x^2 - 1) = 0$ gives $x \in \{-1, 0, 1\}$.

**Second derivative test:**
- $\nabla^2 f(x) = 12x^2 - 4$
- At $x = -1$: $\nabla^2 f(-1) = 12 - 4 = 8 > 0$ (local min)
- At $x = 0$: $\nabla^2 f(0) = -4 < 0$ (local max)
- At $x = 1$: $\nabla^2 f(1) = 8 > 0$ (local min)

**Evaluation:**
- $f(-1) = 1 - 2 = -1$
- $f(0) = 0$
- $f(1) = 1 - 2 = -1$

The global minima are $x = \pm 1$ with value $-1$. The point $x = 0$ is a local maximum.

**Key Observation:** In non-convex optimization:
1. There can be multiple local minima with different objective values.
2. A critical point ($\nabla f = 0$) may not be a minimum at all (could be a saddle point or local max).
3. Finding the global minimum requires exploring the entire landscape or using global optimization techniques (branch and bound, simulated annealing, genetic algorithms).

In contrast, for convex $f$, any point with $\nabla f = 0$ is guaranteed to be the global minimum.

## Convexity and Hessian Conditions

For twice-differentiable functions, convexity can be checked via the Hessian matrix $\nabla^2 f(x)$.

**Theorem:**
- $f$ is convex $\iff$ $\nabla^2 f(x) \succeq 0$ for all $x$ (positive semidefinite).
- $f$ is strictly convex if $\nabla^2 f(x) \succ 0$ for all $x$ (positive definite).

**Example:** $f(x, y) = x^2 + y^2 - xy$.

Compute Hessian:
$$ \nabla^2 f = \begin{bmatrix} 2 & -1 \\ -1 & 2 \end{bmatrix} $$

Eigenvalues: $\det(\lambda I - \nabla^2 f) = (\lambda - 2)^2 - 1 = 0$ gives $\lambda = 1, 3$.

Both eigenvalues are positive, so $\nabla^2 f \succ 0$. Thus, $f$ is strictly convex.

**Consequence:** The problem $\min (x^2 + y^2 - xy)$ has a unique global minimum at the point where $\nabla f = (2x - y, 2y - x) = (0, 0)$, which gives $x = y = 0$.

## Visualizing Convex vs Non-Convex Landscapes

```plot
{
  "title": "Convex Function (Bowl)",
  "x_label": "x",
  "y_label": "f(x)",
  "functions": [
    {
      "fn": "x^2",
      "label": "f(x) = x²",
      "color": "blue"
    }
  ],
  "x_range": [-3, 3]
}
```

In a convex landscape, there is a single valley. Any descent direction leads to the global minimum.

```plot
{
  "title": "Non-Convex Function (Multiple Valleys)",
  "x_label": "x",
  "y_label": "f(x)",
  "functions": [
    {
      "fn": "x^4 - 2*x^2",
      "label": "f(x) = x⁴ - 2x²",
      "color": "red"
    }
  ],
  "x_range": [-2, 2]
}
```

In a non-convex landscape, there are multiple valleys (local minima) and hills (local maxima). A gradient-based method can get trapped.

## Practical Implications

1. **Algorithm Design:** For convex problems, simple gradient descent with proper step size will converge to the global optimum. No need for sophisticated global search strategies.

2. **Verification:** Once you find a candidate solution $x^*$, you can verify optimality by checking the first-order condition. If $\nabla f(x^*) = 0$ (unconstrained) or the KKT conditions hold (constrained), you're done.

3. **Sensitivity Analysis:** Small changes in data lead to small changes in the optimal solution (stability). This is not true for non-convex problems where small perturbations can jump between different local minima.

4. **Duality:** Convex problems have strong duality (zero duality gap under mild conditions), enabling dual methods and providing optimality certificates.

## Common Misconceptions

**Misconception 1:** "Local minima are global only if the function has a single valley."

**Truth:** Convex functions can have flat regions (entire faces where $f$ is constant). For example, $f(x) = \max(0, x)$ is convex. The set $\{x : x \leq 0\}$ all have $f(x) = 0$, forming a flat region of global minima.

**Misconception 2:** "Convexity guarantees a unique solution."

**Truth:** Only **strict convexity** guarantees uniqueness. Linear functions are convex but not strictly convex, and LPs often have multiple optimal solutions (entire faces of the feasible polyhedron).

**Misconception 3:** "Non-convex means impossible to solve."

**Truth:** Many non-convex problems can be solved via convex relaxations (SDP relaxations of combinatorial problems), local methods (which work well if initialized properly), or specialized algorithms. However, there are no general guarantees of finding the global optimum efficiently.

## Key Takeaways

1. **Fundamental Property:** In convex optimization, every local minimum is a global minimum.

2. **First-Order Conditions:** For unconstrained problems, $\nabla f(x^*) = 0$ is necessary and sufficient. For constrained problems, $\nabla f(x^*)^T(y - x^*) \geq 0$ for all feasible $y$.

3. **Uniqueness:** Strict convexity implies a unique global minimum.

4. **Hessian Check:** $\nabla^2 f \succeq 0$ everywhere implies convexity.

5. **Why It Matters:** Convex optimization transforms intractable global search into tractable local optimization with global guarantees.