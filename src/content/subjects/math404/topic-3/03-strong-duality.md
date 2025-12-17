---
title: "Strong Duality"
description: "Equality of primal and dual optimal values"
---

# Strong Duality

## Strong Duality Theorem

**Theorem**: If primal has an optimal solution $x^*$, then dual has an optimal solution $\pi^*$ with:
$$c^T x^* = b^T \pi^*$$

## When Does Strong Duality Hold?

For linear programs: **Always** (if optimal solutions exist)

**Theorem**: Exactly one of the following holds:
1. Both primal and dual have optimal solutions with equal values
2. Primal unbounded ⟹ dual infeasible
3. Dual unbounded ⟹ primal infeasible  
4. Both primal and dual infeasible

## Proof Sketch

From simplex final tableau:
- Optimal primal solution from basic variables
- Optimal dual solution from reduced costs
- Objective values equal by construction

## Duality Gap

**Duality gap**: $c^T x - b^T \pi$ for feasible $x$, $\pi$

- Always $\geq 0$ (weak duality)
- $= 0$ ⟺ both optimal (strong duality)

## Applications

1. **Optimality verification**: Check if gap = 0
2. **Bounds**: Use gap to estimate solution quality
3. **Iterative algorithms**: Minimize gap to convergence

## Python Example

```python
import cvxpy as cp
import numpy as np

# Large problem example
np.random.seed(42)
n, m = 100, 50
A = np.random.randn(m, n)
b = np.random.randn(m) * 10
c = np.random.randn(n)

# Primal
x = cp.Variable(n, nonneg=True)
primal = cp.Problem(cp.Minimize(c @ x), [A @ x >= b])

# Dual
pi = cp.Variable(m, nonneg=True)
dual = cp.Problem(cp.Maximize(b @ pi), [A.T @ pi <= c])

primal.solve()
dual.solve()

print(f"Primal optimal: {primal.value:.6f}")
print(f"Dual optimal: {dual.value:.6f}")
print(f"Strong duality gap: {abs(primal.value - dual.value):.10f}")
print(f"Relative gap: {abs(primal.value - dual.value) / abs(primal.value):.10e}")
```
