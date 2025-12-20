---
title: "Complementary Slackness"
description: "The relationship between primal and dual variables at optimality"
---

# Complementary Slackness

## Theorem

At optimality, for each primal constraint and dual variable pair:
$$\pi_i (a_i^T x - b_i) = 0$$

And for each primal variable and dual constraint:
$$x_j (c_j - (A^T \pi)_j) = 0$$

## Interpretation

- If $\pi_i > 0$, then $a_i^T x = b_i$ (primal constraint active)
- If $a_i^T x > b_i$, then $\pi_i = 0$ (dual variable zero)
- If $x_j > 0$, then $(A^T \pi)_j = c_j$ (dual constraint active)
- If $(A^T \pi)_j < c_j$, then $x_j = 0$ (primal variable zero)

## Applications

1. Find primal from dual (or vice versa)
2. Verify optimality
3. Warm-starting algorithms

## Python Example

```python
import cvxpy as cp
import numpy as np

# Solve primal
x = cp.Variable(2, nonneg=True)
constraints = [x[0] + x[1] >= 1, 2*x[0] + x[1] >= 2]
primal = cp.Problem(cp.Minimize(x[0] + 2*x[1]), constraints)
primal.solve()

# Extract dual variables
pi = np.array([constraints[0].dual_value, constraints[1].dual_value])

print(f"Primal solution: x = {x.value}")
print(f"Dual solution: π = {pi}")

# Check complementary slackness
for i, const in enumerate(constraints):
    slack = const.violation() if const.violation() is not None else 0
    print(f"Constraint {i+1}: π[{i}] = {pi[i]:.6f}, slack = {slack:.6f}, product = {pi[i] * slack:.10f}")
```
