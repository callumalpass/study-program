---
title: "Convex Programs"
description: "Standard forms and problem classes in convex optimization"
---

# Convex Programs

## Standard Form

$$
\begin{align}
\min \quad & f_0(x) \\
\text{s.t.} \quad & f_i(x) \leq 0, \quad i = 1, \ldots, m \\
& Ax = b
\end{align}
$$

where $f_0, f_1, \ldots, f_m$ are convex.

## Problem Classes

1. **LP**: Linear programming
2. **QP**: Quadratic programming  
3. **SOCP**: Second-order cone programming
4. **SDP**: Semidefinite programming
5. **GP**: Geometric programming

## Example

```python
import cvxpy as cp

x = cp.Variable(2)
objective = cp.Minimize(cp.sum_squares(x))
constraints = [x[0] + x[1] >= 1]
problem = cp.Problem(objective, constraints)
problem.solve()
print(f"Optimal: {x.value}")
```
