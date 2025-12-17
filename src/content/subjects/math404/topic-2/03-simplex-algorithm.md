---
title: "The Simplex Algorithm"
description: "Understanding and implementing the simplex method for solving linear programs"
---

# The Simplex Algorithm

## Introduction

The simplex algorithm, developed by George Dantzig in 1947, is the most famous algorithm for solving linear programs. It exploits the geometric fact that optimal solutions occur at vertices of the feasible polyhedron.

## Basic Feasible Solutions

For an LP in standard form:
$$
\min c^T x \quad \text{s.t.} \quad Ax = b, \; x \geq 0
$$

where $A$ is $m \times n$ with rank $m$ (assume $n > m$).

**Basic solution**: Choose $m$ linearly independent columns of $A$ (the **basis**), set remaining variables to zero, solve for the $m$ basic variables.

**Basic feasible solution (BFS)**: A basic solution with all variables $\geq 0$.

**Theorem**: BFS correspond to vertices of the feasible polyhedron.

## The Simplex Method

**Key idea**: Move from one BFS to an adjacent BFS that improves the objective, until no improvement is possible.

### Algorithm Steps

1. **Initialize**: Find an initial BFS (Phase I or use slack variables if $b \geq 0$)
2. **Optimality test**: Check if current solution is optimal (all reduced costs $\geq 0$)
3. **Select entering variable**: Choose variable with most negative reduced cost
4. **Select leaving variable**: Determine which basic variable hits zero first (minimum ratio test)
5. **Pivot**: Update basis by swapping entering and leaving variables
6. **Repeat** until optimal or unbounded

### Reduced Costs

For variable $x_j$: $\bar{c}_j = c_j - c_B^T A_B^{-1} A_j$

- If $\bar{c}_j \geq 0$ for all $j$, current solution is optimal
- If $\bar{c}_j < 0$, increasing $x_j$ improves the objective

## Example

$$
\begin{align}
\min \quad & -3x_1 - 2x_2 \\
\text{s.t.} \quad & x_1 + x_2 + x_3 = 4 \\
& 2x_1 + x_2 + x_4 = 5 \\
& x_1, x_2, x_3, x_4 \geq 0
\end{align}
$$

Initial basis: $B = \{3, 4\}$, $x_B = (4, 5)^T$

Iteration 1:
- Reduced costs: $\bar{c}_1 = -3 < 0$, $\bar{c}_2 = -2 < 0$
- Enter: $x_1$ (most negative)
- Leave: $x_4$ (minimum ratio test)

Iteration 2:
- New basis: $B = \{1, 3\}$
- Check optimality...

Continue until all reduced costs $\geq 0$.

## Python Implementation

```python
import numpy as np
from scipy.optimize import linprog
import cvxpy as cp

# Example: Solve simplex manually
def simplex_step(c, A, b, basis):
    """One iteration of simplex algorithm"""
    m, n = A.shape
    non_basis = [i for i in range(n) if i not in basis]
    
    # Basic solution
    A_B = A[:, basis]
    c_B = c[basis]
    x_B = np.linalg.solve(A_B, b)
    
    # Reduced costs
    pi = c_B @ np.linalg.inv(A_B)
    reduced_costs = c - pi @ A
    
    # Check optimality
    if np.all(reduced_costs[non_basis] >= -1e-10):
        x = np.zeros(n)
        x[basis] = x_B
        return x, basis, True
    
    # Select entering variable
    entering = non_basis[np.argmin(reduced_costs[non_basis])]
    
    # Minimum ratio test
    d = np.linalg.solve(A_B, A[:, entering])
    ratios = np.where(d > 1e-10, x_B / d, np.inf)
    
    if np.all(ratios == np.inf):
        return None, None, "unbounded"
    
    leaving_idx = np.argmin(ratios)
    leaving = basis[leaving_idx]
    
    # Update basis
    new_basis = basis.copy()
    new_basis[leaving_idx] = entering
    
    return None, new_basis, False

# Test problem
c = np.array([-3, -2, 0, 0])
A = np.array([[1, 1, 1, 0],
              [2, 1, 0, 1]])
b = np.array([4, 5])

basis = [2, 3]  # Initial basis (slack variables)
iteration = 0
max_iter = 10

print("Simplex Algorithm Iterations:")
while iteration < max_iter:
    x, new_basis, status = simplex_step(c, A, b, basis)
    
    if status == True:
        print(f"\nOptimal solution found!")
        print(f"x* = {x}")
        print(f"Objective = {c @ x:.4f}")
        break
    elif status == "unbounded":
        print("\nProblem is unbounded!")
        break
    else:
        print(f"Iteration {iteration}: Basis = {new_basis}")
        basis = new_basis
        iteration += 1

# Verify with scipy
result = linprog(c, A_eq=A, b_eq=b, bounds=[(0, None)]*4, method='highs')
print(f"\nScipy verification: x* = {result.x}, obj = {result.fun:.4f}")
```

## Computational Complexity

- **Worst-case**: Exponential (can visit all vertices)
- **Average-case**: Polynomial-like behavior in practice
- **Typical**: Very efficient for most real-world problems

## Variants

- **Revised simplex**: More efficient implementation
- **Dual simplex**: Useful for sensitivity analysis
- **Network simplex**: Specialized for network flow problems

## Summary

The simplex algorithm:
- Moves between adjacent vertices
- Improves objective at each step
- Terminates at optimum or detects unboundedness/infeasibility
- Extremely effective in practice despite exponential worst-case
