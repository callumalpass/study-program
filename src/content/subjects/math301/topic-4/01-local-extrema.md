# Local Extrema of Multivariable Functions

## Introduction

Finding local extrema (maxima and minima) is a central problem in multivariable calculus with applications throughout optimization, economics, physics, and engineering. While single-variable calculus requires checking where the derivative equals zero, multivariable optimization involves analyzing critical points where all partial derivatives vanish. However, unlike the single-variable case, critical points can be local maxima, local minima, or saddle points—locations where the function increases in some directions and decreases in others. This topic develops the theory of local extrema and introduces methods for identifying and classifying critical points.

## Definitions

### Local Maximum

A function $f(x, y)$ has a **local maximum** at $(a, b)$ if:

$$f(a, b) \ge f(x, y)$$

for all $(x, y)$ in some disk around $(a, b)$.

Geometrically, the surface has a peak at $(a, b)$.

### Local Minimum

A function $f(x, y)$ has a **local minimum** at $(a, b)$ if:

$$f(a, b) \le f(x, y)$$

for all $(x, y)$ in some disk around $(a, b)$.

The surface has a valley at $(a, b)$.

### Global Extrema

A **global** (or **absolute**) maximum/minimum satisfies the inequality for **all** points in the domain, not just nearby points.

### Saddle Point

A **saddle point** is a critical point that is neither a local maximum nor minimum. The surface curves upward in some directions and downward in others, resembling a horse saddle.

## Critical Points

### Definition

A point $(a, b)$ is a **critical point** of $f(x, y)$ if:

1. $f_x(a, b) = 0$ and $f_y(a, b) = 0$, or
2. At least one of $f_x(a, b)$ or $f_y(a, b)$ does not exist

In vector notation: $\nabla f(a, b) = \mathbf{0}$ or $\nabla f$ doesn't exist.

### Necessary Condition for Local Extrema

**Theorem**: If $f$ has a local maximum or minimum at $(a, b)$ and $f$ is differentiable there, then $(a, b)$ is a critical point.

This is the multivariable analog of "if $f'(c) = 0$, then $c$ might be an extremum."

### Proof Sketch

If $f$ has a local max at $(a, b)$, then along the line $y = b$, the function $g(x) = f(x, b)$ has a local max at $x = a$.

By single-variable calculus, $g'(a) = 0$, so $f_x(a, b) = 0$.

Similarly, $f_y(a, b) = 0$.

## Finding Critical Points

### Procedure

1. Compute $f_x$ and $f_y$
2. Solve the system: $f_x = 0, f_y = 0$
3. Check points where partials don't exist

### Example 1

Find critical points of $f(x, y) = x^2 + y^2 - 4x + 6y + 5$.

$$f_x = 2x - 4 = 0 \implies x = 2$$
$$f_y = 2y + 6 = 0 \implies y = -3$$

Critical point: $(2, -3)$.

Evaluate: $f(2, -3) = 4 + 9 - 8 - 18 + 5 = -8$.

This is a paraboloid opening upward, so $(2, -3, -8)$ is the vertex (global minimum).

### Example 2

Find critical points of $f(x, y) = x^3 - 3xy + y^3$.

$$f_x = 3x^2 - 3y = 0 \implies x^2 = y$$
$$f_y = -3x + 3y^2 = 0 \implies x = y^2$$

Substituting $x^2 = y$ into $x = y^2$:

$$(y^2)^2 = y \implies y^4 = y \implies y(y^3 - 1) = 0$$

$$y = 0 \text{ or } y = 1$$

If $y = 0$: $x = 0$. Critical point: $(0, 0)$.

If $y = 1$: $x = 1$. Critical point: $(1, 1)$.

## Geometric Interpretation

At a critical point, the tangent plane is horizontal ($z = f(a, b)$), since:

$$z = f(a, b) + f_x(a, b)(x - a) + f_y(a, b)(y - b) = f(a, b)$$

when $f_x = f_y = 0$.

## Classification Without Second Derivatives

### Analyzing Function Values

Check the sign of $f(x, y) - f(a, b)$ near $(a, b)$:

- If always positive: local minimum
- If always negative: local maximum
- If both positive and negative: saddle point

### Example 3

For $f(x, y) = x^2 - y^2$ at $(0, 0)$:

$$f(x, 0) = x^2 \ge 0$$
$$f(0, y) = -y^2 \le 0$$

Along the $x$-axis, $f \ge f(0, 0) = 0$ (minimum behavior).

Along the $y$-axis, $f \le f(0, 0) = 0$ (maximum behavior).

Therefore, $(0, 0)$ is a **saddle point**.

## Types of Critical Points

### Local Minimum

$f(a, b)$ is the smallest value in a neighborhood. The surface curves upward in all directions.

Example: $f(x, y) = x^2 + y^2$ at $(0, 0)$.

### Local Maximum

$f(a, b)$ is the largest value in a neighborhood. The surface curves downward in all directions.

Example: $f(x, y) = -x^2 - y^2$ at $(0, 0)$.

### Saddle Point

The function increases in some directions and decreases in others.

Example: $f(x, y) = x^2 - y^2$ at $(0, 0)$.

Saddle points are unique to functions of two or more variables; they have no analog in single-variable calculus.

## Examples of Each Type

### Example 4: Local Minimum

$f(x, y) = (x - 1)^2 + (y + 2)^2 + 3$

$$f_x = 2(x - 1) = 0 \implies x = 1$$
$$f_y = 2(y + 2) = 0 \implies y = -2$$

Critical point: $(1, -2)$ with $f(1, -2) = 3$.

Since $f(x, y) \ge 3$ for all $(x, y)$, this is a **global minimum**.

### Example 5: Local Maximum

$f(x, y) = 4 - x^2 - 2y^2$

$$f_x = -2x = 0 \implies x = 0$$
$$f_y = -4y = 0 \implies y = 0$$

Critical point: $(0, 0)$ with $f(0, 0) = 4$.

Since $f(x, y) \le 4$ for all $(x, y)$, this is a **global maximum**.

### Example 6: Saddle Point

$f(x, y) = xy$

$$f_x = y = 0$$
$$f_y = x = 0$$

Critical point: $(0, 0)$ with $f(0, 0) = 0$.

Check nearby points:
- $f(1, 1) = 1 > 0$
- $f(1, -1) = -1 < 0$

Since $f$ takes both positive and negative values near $(0, 0)$, it's a **saddle point**.

## Boundary Behavior

Critical points only identify **interior** extrema. If the domain has a boundary, extreme values might occur on the boundary, requiring separate analysis.

### Example 7

Find the maximum of $f(x, y) = x + y$ on the disk $x^2 + y^2 \le 1$.

$$f_x = 1, \quad f_y = 1$$

No critical points in the interior (partials never zero).

Check boundary $x^2 + y^2 = 1$. Parametrize: $x = \cos\theta, y = \sin\theta$.

$$f(\theta) = \cos\theta + \sin\theta$$

$$f'(\theta) = -\sin\theta + \cos\theta = 0 \implies \tan\theta = 1 \implies \theta = \pi/4$$

Maximum at $(\cos(\pi/4), \sin(\pi/4)) = (1/\sqrt{2}, 1/\sqrt{2})$ with $f = \sqrt{2}$.

## Degenerate Critical Points

Sometimes the second derivative test (next topic) is inconclusive. These are **degenerate** critical points requiring more sophisticated analysis.

### Example 8

$f(x, y) = x^4 + y^4$ at $(0, 0)$.

$f_x = 4x^3 = 0 \implies x = 0$

$f_y = 4y^3 = 0 \implies y = 0$

Critical point: $(0, 0)$.

Since $f(x, y) = x^4 + y^4 \ge 0 = f(0, 0)$ with equality only at $(0, 0)$, this is a **global minimum** (though the second derivative test would be inconclusive).

## Summary

Local extrema of $f(x, y)$ occur at critical points where $\nabla f = \mathbf{0}$ or the gradient doesn't exist. Critical points can be local maxima (surface peaks), local minima (surface valleys), or saddle points (neither max nor min). To find critical points, solve $f_x = 0, f_y = 0$ simultaneously. Analyzing nearby function values can classify critical points, but the second derivative test (next topic) provides a systematic method. Boundary points must be checked separately. Understanding local extrema is fundamental to optimization and appears in diverse applications from economics to physics.
