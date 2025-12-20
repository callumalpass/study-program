---
title: "Interior-Point Methods for Linear Programming"
description: "Modern polynomial-time algorithms for LP based on barrier methods"
---

# Interior-Point Methods for Linear Programming

## Introduction

Interior-point methods (IPMs) solve LPs by moving through the interior of the feasible region, rather than along edges like the simplex method.

**Key advantages**:
- Polynomial-time complexity: $O(n^3)$ or $O(n^{3.5})$
- Excellent for large-scale problems
- Warm-start capabilities
- Similar performance across problem instances

## The Barrier Function Approach

For LP: $\min c^T x$ s.t. $Ax = b$, $x \geq 0$

Replace nonnegativity constraints with a **barrier function**:

$$
\min_{x} \; c^T x - \mu \sum_{i=1}^n \log(x_i) \quad \text{s.t.} \; Ax = b
$$

where $\mu > 0$ is the barrier parameter.

**Barrier term**: $-\mu \log(x_i) \to \infty$ as $x_i \to 0^+$ (prevents variables from reaching boundary)

## Central Path

For each $\mu > 0$, solve the barrier problem to get $x^*(\mu)$.

The **central path** is the curve $\{x^*(\mu) : \mu > 0\}$.

As $\mu \to 0$, $x^*(\mu) \to x^*$ (LP optimal solution).

## Primal-Dual Interior-Point Method

Consider primal-dual pair:

**Primal**: $\min c^T x$ s.t. $Ax = b$, $x \geq 0$

**Dual**: $\max b^T \pi$ s.t. $A^T \pi + s = c$, $s \geq 0$

KKT conditions (modified for barrier):
$$
\begin{align}
Ax &= b \\
A^T \pi + s &= c \\
X S e &= \mu e \\
x, s &> 0
\end{align}
$$

where $X = \text{diag}(x)$, $S = \text{diag}(s)$, $e = (1,1,\ldots,1)^T$.

## Algorithm (Primal-Dual Path-Following)

1. Initialize: $x^0 > 0$, $s^0 > 0$, $\pi^0$, $\mu_0$
2. While not converged:
   a. Solve Newton system for search direction
   b. Line search to maintain $x, s > 0$
   c. Update: $(x, \pi, s) \leftarrow (x, \pi, s) + \alpha (\Delta x, \Delta \pi, \Delta s)$
   d. Reduce barrier: $\mu \leftarrow \sigma \mu$ (e.g., $\sigma = 0.1$)
3. Return $x$ when duality gap $\approx 0$

## Computational Complexity

**Theorem (Karmarkar, 1984)**: Interior-point methods solve LPs in polynomial time.

Typical complexity: $O(\sqrt{n} L)$ iterations, each costing $O(n^3)$ for Newton system.

**For large sparse problems**: Much faster than simplex in many cases.

## Comparison with Simplex

| Property | Simplex | Interior-Point |
|----------|---------|----------------|
| Worst-case | Exponential | Polynomial |
| Average-case | Very fast | Fast |
| Warm-start | Excellent | Moderate |
| Sparsity | Excellent | Good |
| Certificates | Easy | Harder |
| Implementation | Well-understood | More complex |

## Python Implementation

```python
import numpy as np
from scipy.optimize import linprog
import cvxpy as cp

# Problem
c = np.array([1, 1])
A_eq = np.array([[1, 2]])
b_eq = np.array([3])
bounds = [(0, None), (0, None)]

# Solve with interior-point
result_ip = linprog(c, A_eq=A_eq, b_eq=b_eq, bounds=bounds, 
                    method='interior-point')

# Solve with simplex
result_simplex = linprog(c, A_eq=A_eq, b_eq=b_eq, bounds=bounds,
                        method='highs')

print("Interior-Point Method:")
print(f"  Solution: {result_ip.x}")
print(f"  Iterations: {result_ip.nit}")

print("\nSimplex Method:")
print(f"  Solution: {result_simplex.x}")
print(f"  Iterations: {result_simplex.nit}")

# Barrier function visualization
import matplotlib.pyplot as plt

x_vals = np.linspace(0.01, 2, 100)
mu_values = [0.1, 0.5, 1.0]

plt.figure(figsize=(10, 6))
for mu in mu_values:
    barrier = -mu * np.log(x_vals)
    plt.plot(x_vals, barrier, label=f'μ = {mu}')

plt.xlabel('x')
plt.ylabel('Barrier: -μ log(x)')
plt.title('Logarithmic Barrier Function')
plt.legend()
plt.grid(True)
plt.show()
```

## Modern Developments

- **Mehrotra's predictor-corrector**: Most widely used variant
- **Homogeneous self-dual**: Simultaneously detects infeasibility
- **Specialized methods**: Network flows, second-order cone programs

## Summary

Interior-point methods:
- Polynomial-time complexity (theoretical guarantee)
- Move through interior, not along edges
- Use barrier functions to handle inequality constraints
- Highly effective for large-scale sparse LPs
- Standard in modern optimization software
