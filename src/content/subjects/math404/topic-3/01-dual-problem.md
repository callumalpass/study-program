---
title: "The Dual Problem"
description: "Deriving and understanding the dual linear program"
---

# The Dual Problem

## Introduction

Every linear program (primal) has an associated **dual** linear program. The dual provides:
- Economic interpretation
- Computational benefits
- Theoretical insights (weak/strong duality)
- Optimality certificates

## Primal-Dual Pairs

**Primal** (P):
$$
\begin{align}
\min \quad & c^T x \\
\text{s.t.} \quad & Ax \geq b \\
& x \geq 0
\end{align}
$$

**Dual** (D):
$$
\begin{align}
\max \quad & b^T \pi \\
\text{s.t.} \quad & A^T \pi \leq c \\
& \pi \geq 0
\end{align}
$$

## Derivation

The dual can be derived using Lagrangian relaxation or by considering upper bounds on the primal objective.

**Key idea**: For any feasible $\pi$, we have $b^T \pi \leq c^T x$ for all feasible $x$.

## Dual of Standard Form

**Primal**: $\min c^T x$ s.t. $Ax = b$, $x \geq 0$

**Dual**: $\max b^T \pi$ s.t. $A^T \pi \leq c$ ($\pi$ unrestricted)

## Python Example

```python
import cvxpy as cp
import numpy as np

# Primal
x = cp.Variable(2, nonneg=True)
primal = cp.Problem(cp.Minimize(3*x[0] + 2*x[1]),
                   [2*x[0] + x[1] >= 4,
                    x[0] + 2*x[1] >= 3])

# Dual
pi = cp.Variable(2, nonneg=True)
dual = cp.Problem(cp.Maximize(4*pi[0] + 3*pi[1]),
                 [2*pi[0] + pi[1] <= 3,
                  pi[0] + 2*pi[1] <= 2])

primal.solve()
dual.solve()

print(f"Primal optimal: {primal.value:.4f}")
print(f"Dual optimal: {dual.value:.4f}")
print(f"Duality gap: {abs(primal.value - dual.value):.6e}")
```

## Summary

The dual LP:
- Has same optimal value as primal (strong duality)
- Provides bounds and certificates
- Has reversed min/max, transposed matrix
- Variables correspond to primal constraints
