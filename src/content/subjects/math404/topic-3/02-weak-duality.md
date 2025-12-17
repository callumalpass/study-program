---
title: "Weak Duality"
description: "The fundamental inequality between primal and dual objectives"
---

# Weak Duality

## Weak Duality Theorem

**Theorem**: If $x$ is primal feasible and $\pi$ is dual feasible, then:
$$b^T \pi \leq c^T x$$

**Proof**: 
$$b^T \pi \leq (Ax)^T \pi = x^T A^T \pi \leq x^T c = c^T x$$

## Implications

1. **Dual provides lower bound**: Any dual feasible solution bounds primal optimal value
2. **Primal provides upper bound**: Any primal feasible solution bounds dual optimal value
3. **Optimality certificate**: If $c^T x = b^T \pi$, both are optimal
4. **Infeasibility detection**: If dual unbounded, primal infeasible (and vice versa)

## Bounding

Given:
- Primal feasible $x$ with $c^T x = 10$
- Dual feasible $\pi$ with $b^T \pi = 8$

We know: $8 \leq p^* = d^* \leq 10$

## Python Example

```python
import cvxpy as cp
import numpy as np

c = np.array([2, 3])
A = np.array([[1, 1], [2, 1]])
b = np.array([5, 8])

# Primal
x = cp.Variable(2, nonneg=True)
primal = cp.Problem(cp.Minimize(c @ x), [A @ x >= b])

# Dual  
pi = cp.Variable(2, nonneg=True)
dual = cp.Problem(cp.Maximize(b @ pi), [A.T @ pi <= c])

# Feasible solutions
x_feas = np.array([3, 3])  # Primal feasible
pi_feas = np.array([1, 1])  # Dual feasible

print(f"Primal objective at x: {c @ x_feas:.2f}")
print(f"Dual objective at π: {b @ pi_feas:.2f}")
print(f"Weak duality verified: {b @ pi_feas:.2f} ≤ {c @ x_feas:.2f}")

primal.solve()
dual.solve()
print(f"\nOptimal values equal: {abs(primal.value - dual.value) < 1e-6}")
```
