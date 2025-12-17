---
title: "Constrained Optimization Methods"
description: "Lagrangian and penalty-based approaches"
---

# Constrained Optimization

## Lagrangian

$$\mathcal{L}(x, \mu, \lambda) = f(x) + \mu^T g(x) + \lambda^T h(x)$$

## KKT Conditions

1. Stationarity
2. Primal feasibility
3. Dual feasibility
4. Complementarity

## Python

```python
import cvxpy as cp

x = cp.Variable(2)
problem = cp.Problem(cp.Minimize(cp.sum_squares(x)), [x[0] + x[1] >= 1])
problem.solve()
print(f"Solution: {x.value}")
```
