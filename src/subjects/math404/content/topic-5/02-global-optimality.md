---
title: "Global Optimality in Convex Programs"
description: "Why convex problems have no local minima"
---

# Global Optimality

## Key Theorem

For convex problems: **Every local minimum is a global minimum.**

## KKT Conditions

For convex programs, KKT conditions are **necessary and sufficient** for global optimality.

## Python Example

```python
import cvxpy as cp
x = cp.Variable()
problem = cp.Problem(cp.Minimize((x-2)**2), [x >= 0])
problem.solve()
print(f"Global optimum: x = {x.value:.4f}")
```
