---
title: "Simplex Tableau Method"
description: "Tabular form of the simplex algorithm for manual computation"
---

# Simplex Tableau Method

## Introduction

The simplex tableau is a tabular representation of the simplex algorithm that facilitates hand calculations and provides clear visualization of the algorithm's progress.

## Tableau Structure

For LP in standard form: $\min c^T x$ s.t. $Ax = b$, $x \geq 0$

Initial tableau:

$$
\begin{array}{c|cccc|c}
 & x_1 & x_2 & \cdots & x_n & \text{RHS} \\
\hline
x_{B_1} & a_{11} & a_{12} & \cdots & a_{1n} & b_1 \\
x_{B_2} & a_{21} & a_{22} & \cdots & a_{2n} & b_2 \\
\vdots & \vdots & \vdots & \ddots & \vdots & \vdots \\
x_{B_m} & a_{m1} & a_{m2} & \cdots & a_{mn} & b_m \\
\hline
z & c_1 & c_2 & \cdots & c_n & 0
\end{array}
$$

## Tableau Operations

### Optimality Test
If all entries in the objective row are $\geq 0$, solution is optimal.

### Pivot Operation

1. **Select pivot column**: Most negative entry in objective row
2. **Select pivot row**: Minimum ratio test (RHS / pivot column entry)
3. **Pivot**: Make pivot element = 1, all other elements in pivot column = 0

### Pivot Mechanics

To pivot on element $a_{rs}$:
1. Divide row $r$ by $a_{rs}$ (pivot element becomes 1)
2. For each other row $i$: Row$_i$ = Row$_i$ - $a_{is} \times$ Row$_r$

## Example

$$
\begin{align}
\max \quad & 3x_1 + 2x_2 \\
\text{s.t.} \quad & 2x_1 + x_2 \leq 18 \\
& 2x_1 + 3x_2 \leq 42 \\
& 3x_1 + x_2 \leq 24 \\
& x_1, x_2 \geq 0
\end{align}
$$

Add slack variables: $x_3, x_4, x_5 \geq 0$

**Initial Tableau**:
$$
\begin{array}{c|ccccc|c}
 & x_1 & x_2 & x_3 & x_4 & x_5 & \text{RHS} \\
\hline
x_3 & 2 & 1 & 1 & 0 & 0 & 18 \\
x_4 & 2 & 3 & 0 & 1 & 0 & 42 \\
x_5 & 3 & 1 & 0 & 0 & 1 & 24 \\
\hline
-z & -3 & -2 & 0 & 0 & 0 & 0
\end{array}
$$

**Iteration 1**:
- Pivot column: $x_1$ (most negative: $-3$)
- Ratios: $18/2=9$, $42/2=21$, $24/3=8$ → minimum is 8
- Pivot row: Row 3
- Pivot element: 3

After pivoting:
$$
\begin{array}{c|ccccc|c}
 & x_1 & x_2 & x_3 & x_4 & x_5 & \text{RHS} \\
\hline
x_3 & 0 & 1/3 & 1 & 0 & -2/3 & 2 \\
x_4 & 0 & 7/3 & 0 & 1 & -2/3 & 26 \\
x_1 & 1 & 1/3 & 0 & 0 & 1/3 & 8 \\
\hline
-z & 0 & -1 & 0 & 0 & 1 & 24
\end{array}
$$

**Iteration 2**:
- Pivot column: $x_2$ (only negative: $-1$)
- Continue...

**Final Tableau** (optimal):
$$
\begin{array}{c|ccccc|c}
 & x_1 & x_2 & x_3 & x_4 & x_5 & \text{RHS} \\
\hline
x_2 & 0 & 1 & 3 & 0 & -2 & 6 \\
x_4 & 0 & 0 & -7 & 1 & 4 & 12 \\
x_1 & 1 & 0 & -1 & 0 & 1 & 6 \\
\hline
-z & 0 & 0 & 3 & 0 & -1 & 30
\end{array}
$$

**Optimal solution**: $x_1 = 6$, $x_2 = 6$, $z = 30$

## Reading the Tableau

From final tableau:
- **Basic variables**: Left column (currently in basis)
- **Values**: RHS column
- **Reduced costs**: Objective row (sensitivity information)
- **Shadow prices**: Can be computed from objective row coefficients

## Python Implementation

```python
import numpy as np

def simplex_tableau(c, A, b):
    """Solve LP using simplex tableau method"""
    m, n = A.shape
    
    # Create initial tableau
    tableau = np.zeros((m + 1, n + m + 1))
    tableau[:m, :n] = A
    tableau[:m, n:n+m] = np.eye(m)  # Slack variables
    tableau[:m, -1] = b
    tableau[m, :n] = -c
    
    iteration = 0
    print("Initial Tableau:")
    print(tableau)
    
    while True:
        # Check optimality
        if np.all(tableau[-1, :-1] >= -1e-10):
            break
        
        # Select pivot column (most negative)
        pivot_col = np.argmin(tableau[-1, :-1])
        
        # Minimum ratio test
        ratios = np.where(tableau[:-1, pivot_col] > 1e-10,
                         tableau[:-1, -1] / tableau[:-1, pivot_col],
                         np.inf)
        
        if np.all(ratios == np.inf):
            return None, "unbounded"
        
        pivot_row = np.argmin(ratios)
        pivot_element = tableau[pivot_row, pivot_col]
        
        print(f"\nIteration {iteration + 1}:")
        print(f"  Pivot: Row {pivot_row}, Col {pivot_col}")
        print(f"  Pivot element: {pivot_element:.4f}")
        
        # Pivot operation
        tableau[pivot_row, :] /= pivot_element
        
        for i in range(m + 1):
            if i != pivot_row:
                tableau[i, :] -= tableau[i, pivot_col] * tableau[pivot_row, :]
        
        print("Tableau after pivot:")
        print(tableau)
        iteration += 1
    
    # Extract solution
    x = np.zeros(n)
    for j in range(n):
        col = tableau[:m, j]
        if np.sum(np.abs(col) > 1e-10) == 1:  # Basic variable
            idx = np.argmax(np.abs(col))
            if abs(col[idx] - 1.0) < 1e-10:
                x[j] = tableau[idx, -1]
    
    obj_value = -tableau[-1, -1]
    
    return x, obj_value

# Example
c = np.array([3, 2])
A = np.array([[2, 1],
              [2, 3],
              [3, 1]])
b = np.array([18, 42, 24])

x_opt, z_opt = simplex_tableau(c, A, b)
print(f"\nOptimal solution: x* = {x_opt}")
print(f"Optimal value: z* = {z_opt:.4f}")
```

## Advantages and Disadvantages

**Advantages**:
- Clear visualization of algorithm progress
- Good for learning and small problems
- Easy to perform sensitivity analysis

**Disadvantages**:
- Inefficient for large problems
- Numerical errors accumulate
- Requires many arithmetic operations

## Summary

The simplex tableau:
- Organizes simplex algorithm into tabular form
- Facilitates hand calculations
- Shows relationship between variables and constraints
- Provides basis for sensitivity analysis
- Foundation for understanding computational LP
