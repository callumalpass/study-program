---
title: "Degeneracy in Linear Programming"
description: "Understanding degenerate basic feasible solutions and cycling in the simplex algorithm"
---

# Degeneracy in Linear Programming

## What is Degeneracy?

A basic feasible solution (BFS) is **degenerate** if one or more basic variables equals zero.

Geometrically, degeneracy occurs when more than $n$ hyperplanes (in $\mathbb{R}^n$) intersect at a vertex.

## Example

Consider:
$$
\begin{align}
\min \quad & -x_1 - x_2 \\
\text{s.t.} \quad & x_1 \leq 1 \\
& x_2 \leq 1 \\
& x_1 + x_2 \leq 1 \\
& x_1, x_2 \geq 0
\end{align}
$$

At vertex $(0,0)$: Four constraints are active ($x_1=0$, $x_2=0$, plus two others). This is degenerate.

## Cycling

**Cycling** occurs when the simplex algorithm visits the same sequence of BFS repeatedly without improving the objective.

Degeneracy can cause cycling:
- Multiple constraints active at a vertex
- Tie in minimum ratio test
- Zero pivot step (objective doesn't improve)

### Bland's Rule (Anti-Cycling)

To prevent cycling:
1. **Entering variable**: Choose smallest index among negative reduced costs
2. **Leaving variable**: Among tied ratios, choose smallest index

**Theorem**: Bland's rule prevents cycling, guaranteeing simplex termination.

## Implications

1. **Multiple optimal tableaux**: Different bases can give same BFS
2. **Sensitivity**: Small parameter changes can cause large basis changes
3. **Computational**: More simplex iterations may be needed

## Python Example

```python
import numpy as np
from scipy.optimize import linprog

# Degenerate problem
c = np.array([-1, -1, 0, 0, 0])
A_eq = np.array([[1, 0, 1, 0, 0],
                 [0, 1, 0, 1, 0],
                 [1, 1, 0, 0, 1]])
b_eq = np.array([1, 1, 1])

result = linprog(c, A_eq=A_eq, b_eq=b_eq, bounds=[(0,None)]*5, method='simplex')

print(f"Solution: {result.x}")
print(f"Number of degenerate variables: {np.sum(np.abs(result.x) < 1e-10)}")
```

## Summary

Degeneracy:
- Common in practice (more constraints than dimensions)
- Can cause cycling without proper pivot rules
- Bland's rule ensures termination
- Doesn't affect existence of optimal solution
