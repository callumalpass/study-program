---
title: "Dual Simplex Method"
description: "Solving LPs via the dual simplex algorithm"
---

# Dual Simplex Method

## Motivation

Standard simplex: maintains primal feasibility, improves objective

**Dual simplex**: maintains dual feasibility, improves dual objective (equivalently, achieves primal feasibility)

## When to Use

- After adding new constraints (primal infeasible, dual may stay feasible)
- Sensitivity analysis
- Integer programming branch-and-bound

## Algorithm

1. Start with dual feasible but primal infeasible basis
2. Select leaving variable (most negative primal variable)
3. Select entering variable (maintains dual feasibility)
4. Pivot
5. Repeat until primal feasible

## Python Example

```python
from scipy.optimize import linprog
import numpy as np

# Problem becomes primal infeasible after adding constraint
c = np.array([2, 3])
A_ub = np.array([[1, 1], [2, 1], [1, 2]])  # New constraint added
b_ub = np.array([4, 6, 3])

# Dual simplex (via revised simplex with dual approach)
result = linprog(c, A_ub=A_ub, b_ub=b_ub, method='highs-ds')

print(f"Solution: {result.x}")
print(f"Optimal value: {result.fun:.4f}")
print(f"Iterations: {result.nit}")
```

## Summary

Dual simplex:
- Complementary to primal simplex
- Useful for re-optimization
- Standard in modern LP solvers
- Often combined with primal simplex
