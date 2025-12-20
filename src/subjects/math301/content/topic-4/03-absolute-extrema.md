# Absolute Extrema on Closed Bounded Regions

## Introduction

While local extrema identify peaks and valleys within a function's domain, absolute (or global) extrema represent the largest and smallest values the function attains over its entire domain or a specified region. Finding absolute extrema is crucial for optimization problems in engineering, economics, and physics, where we seek truly optimal solutions rather than merely locally optimal ones. The Extreme Value Theorem guarantees the existence of absolute extrema for continuous functions on closed, bounded regions, and a systematic procedure enables their determination.

## Extreme Value Theorem

### Statement

**Theorem**: If $f(x, y)$ is continuous on a closed, bounded region $D$, then $f$ attains both an absolute maximum and an absolute minimum on $D$.

This is the multivariable analog of the single-variable Extreme Value Theorem.

### Requirements

- **Continuous**: $f$ must be continuous (no jumps or breaks)
- **Closed**: $D$ includes its boundary
- **Bounded**: $D$ fits within some disk (doesn't extend to infinity)

Examples of closed, bounded regions: disks $x^2 + y^2 \le r^2$, rectangles $[a,b] \times [c,d]$, triangular regions.

### Consequence

The theorem guarantees extrema exist but doesn't locate them. We need a systematic method.

## Method for Finding Absolute Extrema

### Procedure

To find absolute extrema of $f$ on region $D$:

1. **Find critical points** in the interior of $D$ (where $\nabla f = \mathbf{0}$)
2. **Find extreme values on the boundary** of $D$
3. **Evaluate $f$** at all points from steps 1 and 2
4. **Compare values**: the largest is the absolute max, the smallest is the absolute min

### Rationale

Absolute extrema occur either:
- At interior critical points (like local extrema), or
- On the boundary

We must check both possibilities.

## Examples

### Example 1: Rectangle

Find absolute extrema of $f(x, y) = x^2 + y^2 - 2x - 4y$ on the rectangle $R = [0, 3] \times [0, 4]$.

**Step 1: Interior critical points**

$$f_x = 2x - 2 = 0 \implies x = 1$$
$$f_y = 2y - 4 = 0 \implies y = 2$$

Critical point: $(1, 2)$ in the interior of $R$.

$$f(1, 2) = 1 + 4 - 2 - 8 = -5$$

**Step 2: Boundary**

The boundary consists of four edges:

**Edge 1**: $x = 0, 0 \le y \le 4$

$$g_1(y) = f(0, y) = y^2 - 4y$$

$$g_1'(y) = 2y - 4 = 0 \implies y = 2$$

Values: $g_1(0) = 0, g_1(2) = -4, g_1(4) = 0$

**Edge 2**: $x = 3, 0 \le y \le 4$

$$g_2(y) = f(3, y) = 9 + y^2 - 6 - 4y = 3 + y^2 - 4y$$

$$g_2'(y) = 2y - 4 = 0 \implies y = 2$$

Values: $g_2(0) = 3, g_2(2) = -1, g_2(4) = 3$

**Edge 3**: $y = 0, 0 \le x \le 3$

$$g_3(x) = f(x, 0) = x^2 - 2x$$

$$g_3'(x) = 2x - 2 = 0 \implies x = 1$$

Values: $g_3(0) = 0, g_3(1) = -1, g_3(3) = 3$

**Edge 4**: $y = 4, 0 \le x \le 3$

$$g_4(x) = f(x, 4) = x^2 + 16 - 2x - 16 = x^2 - 2x$$

$$g_4'(x) = 2x - 2 = 0 \implies x = 1$$

Values: $g_4(0) = 0, g_4(1) = -1, g_4(3) = 3$

**Step 3: Compare all values**

Interior: $f(1, 2) = -5$

Boundary: $-4, -1, 0, 3$ (various points)

**Step 4: Conclusion**

**Absolute minimum**: $-5$ at $(1, 2)$ (interior)
**Absolute maximum**: $3$ at $(3, 0)$, $(0, 0)$, $(3, 4)$, $(0, 4)$ (corners where edges meet)

### Example 2: Disk

Find absolute extrema of $f(x, y) = 2 + 2x + 2y - x^2 - y^2$ on the disk $D: x^2 + y^2 \le 9$.

**Step 1: Interior critical points**

$$f_x = 2 - 2x = 0 \implies x = 1$$
$$f_y = 2 - 2y = 0 \implies y = 1$$

Critical point: $(1, 1)$.

Check if it's in $D$: $1^2 + 1^2 = 2 < 9$ ✓

$$f(1, 1) = 2 + 2 + 2 - 1 - 1 = 4$$

**Step 2: Boundary** $x^2 + y^2 = 9$

Parametrize: $x = 3\cos\theta, y = 3\sin\theta$

$$g(\theta) = f(3\cos\theta, 3\sin\theta) = 2 + 6\cos\theta + 6\sin\theta - 9\cos^2\theta - 9\sin^2\theta$$

$$= 2 + 6\cos\theta + 6\sin\theta - 9$$

$$= -7 + 6(\cos\theta + \sin\theta)$$

Maximize $\cos\theta + \sin\theta$:

$$\frac{dg}{d\theta} = -6\sin\theta + 6\cos\theta = 0$$

$$\cos\theta = \sin\theta \implies \theta = \pi/4 \text{ or } 5\pi/4$$

At $\theta = \pi/4$: $x = y = 3/\sqrt{2}$, $\cos\theta + \sin\theta = \sqrt{2}$

$$g(\pi/4) = -7 + 6\sqrt{2} \approx 1.485$$

At $\theta = 5\pi/4$: $x = y = -3/\sqrt{2}$, $\cos\theta + \sin\theta = -\sqrt{2}$

$$g(5\pi/4) = -7 - 6\sqrt{2} \approx -15.485$$

**Step 3: Compare**

Interior: $f(1, 1) = 4$

Boundary: $\approx 1.485, \approx -15.485$

**Absolute maximum**: $4$ at $(1, 1)$
**Absolute minimum**: $-7 - 6\sqrt{2}$ at $(-3/\sqrt{2}, -3/\sqrt{2})$

### Example 3: Triangle

Find absolute extrema of $f(x, y) = xy$ on the triangular region bounded by $x = 0, y = 0, x + y = 1$.

**Step 1: Interior critical points**

$$f_x = y = 0, \quad f_y = x = 0$$

Critical point: $(0, 0)$, but this is on the boundary (corner), not interior.

**Step 2: Boundary**

**Edge 1**: $x = 0, 0 \le y \le 1$

$$f(0, y) = 0$$

**Edge 2**: $y = 0, 0 \le x \le 1$

$$f(x, 0) = 0$$

**Edge 3**: $x + y = 1$, i.e., $y = 1 - x, 0 \le x \le 1$

$$g(x) = f(x, 1-x) = x(1-x) = x - x^2$$

$$g'(x) = 1 - 2x = 0 \implies x = 1/2$$

$$g(1/2) = 1/2 - 1/4 = 1/4$$

Endpoints: $g(0) = 0, g(1) = 0$

**Step 3: Compare**

All values: $0$ (on edges 1 and 2) and $1/4$ (at $(1/2, 1/2)$ on edge 3)

**Absolute maximum**: $1/4$ at $(1/2, 1/2)$
**Absolute minimum**: $0$ along edges $x = 0$ and $y = 0$

## Boundary Analysis Techniques

### Parametrization

For boundaries that are curves, parametrize them and reduce to a single-variable problem.

### Lagrange Multipliers (Preview)

For boundaries defined by constraints, Lagrange multipliers (next topic) provide an alternative method.

### Corners

Always check corner points where boundary segments meet.

## Applications

### Engineering: Optimal Design

Maximize strength or minimize cost subject to physical constraints (bounded regions).

### Economics: Production Optimization

Maximize output given limited resources (capital, labor) within feasible region.

### Physics: Constrained Systems

Find equilibrium states or minimum energy configurations within physical boundaries.

## Unbounded Regions

If the region is unbounded, the Extreme Value Theorem doesn't apply, and extrema may not exist.

### Example 4: No Maximum

$f(x, y) = e^{x+y}$ on the unbounded region $x \ge 0, y \ge 0$.

As $x, y \to \infty$, $f \to \infty$, so there's no absolute maximum.

There is an absolute minimum at $(0, 0)$ where $f(0, 0) = 1$.

## Summary

To find absolute extrema of a continuous function $f$ on a closed, bounded region $D$:
1. Find critical points in the interior
2. Find extreme values on the boundary (using parametrization or single-variable techniques)
3. Evaluate $f$ at all candidate points
4. The largest value is the absolute max; the smallest is the absolute min

The Extreme Value Theorem guarantees extrema exist for continuous functions on closed, bounded regions. Boundary analysis is essential because extrema often occur there. This method is fundamental for solving real-world optimization problems in engineering, economics, and physics.
