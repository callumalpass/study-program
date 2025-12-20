---
title: "Graphical Method for Linear Programming"
description: "Solving two-variable linear programs geometrically"
---

# Graphical Method for Linear Programming

## Introduction

For LPs with two decision variables, we can solve graphically by plotting the feasible region and finding the optimal vertex.

**Standard form**:
$$
\begin{align}
\min \quad & c_1 x_1 + c_2 x_2 \\
\text{s.t.} \quad & a_{i1} x_1 + a_{i2} x_2 \leq b_i, \quad i = 1, \ldots, m \\
& x_1, x_2 \geq 0
\end{align}
$$

## Geometric Interpretation

- **Feasible region**: Intersection of half-spaces (a polygon)
- **Objective function**: Linear, represented by iso-cost lines
- **Optimal solution**: Vertex of feasible region where iso-cost line is tangent

### Key Theorem
If an LP has an optimal solution and the feasible region is bounded, then at least one optimal solution occurs at a vertex (extreme point) of the feasible region.

## Solution Procedure

1. **Plot constraints**: Draw each inequality as a line, shade the feasible side
2. **Identify feasible region**: Find the intersection of all feasible half-spaces
3. **Plot objective function**: Draw iso-cost/iso-profit lines
4. **Find optimal vertex**: Move iso-cost line in improving direction until it leaves the feasible region
5. **Compute optimal value**: Substitute vertex coordinates into objective

## Example

$$
\begin{align}
\max \quad & 3x_1 + 4x_2 \\
\text{s.t.} \quad & 2x_1 + 3x_2 \leq 12 \\
& 3x_1 + 2x_2 \leq 12 \\
& x_1, x_2 \geq 0
\end{align}
$$

**Vertices**: $(0,0)$, $(4,0)$, $(0,4)$, $(2.4, 2.4)$

**Objective values**: $0$, $12$, $16$, $16.8$

**Optimal**: $x^* = (2.4, 2.4)$, $z^* = 16.8$

## Python Implementation

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy.optimize import linprog

# Example problem
c = np.array([-3, -4])  # Maximize 3x1 + 4x2
A_ub = np.array([[2, 3], [3, 2]])
b_ub = np.array([12, 12])

result = linprog(c, A_ub=A_ub, b_ub=b_ub, bounds=[(0, None), (0, None)])

print(f"Optimal solution: x* = {result.x}")
print(f"Optimal value: {-result.fun:.2f}")

# Visualization
fig, ax = plt.subplots(figsize=(10, 8))

x1 = np.linspace(0, 6, 500)
x2_c1 = (12 - 2*x1) / 3
x2_c2 = (12 - 3*x1) / 2

ax.plot(x1, x2_c1, 'b-', linewidth=2, label='2x₁ + 3x₂ = 12')
ax.plot(x1, x2_c2, 'r-', linewidth=2, label='3x₁ + 2x₂ = 12')

# Feasible region
x2_feas = np.minimum(x2_c1, x2_c2)
x2_feas = np.maximum(x2_feas, 0)
ax.fill_between(x1, 0, x2_feas, where=(x2_feas >= 0), alpha=0.3, color='green')

# Vertices
vertices = np.array([[0, 0], [4, 0], [0, 4], [2.4, 2.4]])
for v in vertices:
    ax.plot(v[0], v[1], 'ko', markersize=8)

ax.plot(result.x[0], result.x[1], 'r*', markersize=20, label='Optimal')

# Iso-profit lines
for z in [6, 12, 16, 16.8]:
    x2_iso = (z - 3*x1) / 4
    ax.plot(x1, x2_iso, 'k--', alpha=0.3)

ax.set_xlim(0, 6)
ax.set_ylim(0, 6)
ax.set_xlabel('x₁')
ax.set_ylabel('x₂')
ax.set_title('Graphical Solution of LP')
ax.legend()
ax.grid(True, alpha=0.3)
plt.show()
```

## Special Cases

### Unbounded
Feasible region extends to infinity in the direction that improves the objective.

### Infeasible
No point satisfies all constraints (empty feasible region).

### Multiple Optima
Iso-cost line parallel to a constraint edge—entire edge is optimal.

### Degenerate
More than two constraints active at optimal vertex.

## Summary

The graphical method:
- Works only for 2D problems
- Provides geometric intuition
- Shows relationship between vertices and optimality
- Motivates the simplex algorithm (which works in higher dimensions)
