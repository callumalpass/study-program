---
title: "Sensitivity Analysis"
description: "Analyzing how LP solutions change with parameter variations"
---

# Sensitivity Analysis in Linear Programming

## Introduction

Sensitivity analysis studies how the optimal solution changes when problem parameters (costs, RHS, constraint coefficients) are modified.

## Optimal Basis and Reduced Costs

From the final simplex tableau:
- **Basic variables**: Current basis $B$
- **Reduced costs** $\bar{c}_j$: Change in objective per unit increase in $x_j$
- **Shadow prices** $\pi$: Dual variables, value of relaxing constraints

## RHS Sensitivity (Right-Hand Side)

How does optimal value change when $b$ changes to $b + \Delta b$?

**Range of validity**: Values of $b_i$ for which current basis remains optimal

**Shadow price** $\pi_i$: $\frac{\partial z^*}{\partial b_i} = \pi_i$

Small change: $z^*(b + \Delta b) \approx z^*(b) + \pi^T \Delta b$

### Example

$$
\begin{align}
\max \quad & 3x_1 + 2x_2 \\
\text{s.t.} \quad & 2x_1 + x_2 \leq 100 \\
& x_1 + x_2 \leq 80 \\
& x_1 \leq 40 \\
& x_1, x_2 \geq 0
\end{align}
$$

Optimal: $x^* = (20, 60)$, $z^* = 180$

Shadow price for first constraint: $\pi_1 = 1$
- If $b_1$ increases from 100 to 101, $z^*$ increases by approximately $1$

## Cost Coefficient Sensitivity

How does solution change when $c_j$ changes?

**Range of optimality**: Values of $c_j$ for which current basis remains optimal

If $c_j$ changes but stays in range: optimal basis unchanged, optimal value changes linearly

## Adding New Variable/Constraint

**New variable**: Check if reduced cost is negative
- If $\bar{c}_j < 0$, current solution is no longer optimal

**New constraint**: Check if current solution satisfies it
- If violated, re-optimize

## Python Implementation

```python
import numpy as np
from scipy.optimize import linprog
import cvxpy as cp

# Base problem
c = np.array([-3, -2])
A_ub = np.array([[2, 1], [1, 1], [1, 0]])
b_ub = np.array([100, 80, 40])

# Solve base problem
result_base = linprog(c, A_ub=A_ub, b_ub=b_ub, bounds=[(0,None)]*2)
print(f"Base solution: x = {result_base.x}, z = {-result_base.fun:.2f}")

# RHS sensitivity
print("\nRHS Sensitivity:")
for i, delta in enumerate([1, -1, 5]):
    b_new = b_ub.copy()
    b_new[0] += delta
    result_new = linprog(c, A_ub=A_ub, b_ub=b_new, bounds=[(0,None)]*2)
    z_change = -result_new.fun - (-result_base.fun)
    print(f"  Δb₁ = {delta:2d}: Δz = {z_change:.2f}")

# Cost sensitivity
print("\nCost Coefficient Sensitivity:")
for delta_c in [-0.5, 0.5, 1.0]:
    c_new = c.copy()
    c_new[0] += delta_c
    result_new = linprog(c_new, A_ub=A_ub, b_ub=b_ub, bounds=[(0,None)]*2)
    print(f"  Δc₁ = {delta_c:.1f}: x = {result_new.x}, z = {-result_new.fun:.2f}")
```

## Dual Variables and Shadow Prices

The dual variables $\pi$ from the optimal tableau are shadow prices.

**Interpretation**: 
- $\pi_i$ = marginal value of resource $i$
- Increase $b_i$ by 1 unit → objective increases by $\pi_i$ (within validity range)

## Practical Applications

1. **Resource valuation**: How much to pay for additional resources?
2. **Product pricing**: What happens if prices change?
3. **Capacity planning**: Where to invest in capacity expansion?
4. **Robustness**: How sensitive is solution to data errors?

## Summary

Sensitivity analysis:
- Uses optimal tableau without re-solving
- Provides ranges of validity
- Shadow prices give marginal values
- Critical for decision-making in practice
