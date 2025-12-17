# Matrix Chain Multiplication

Compute optimal parenthesization for multiplying chain of matrices.

## Problem
**Given**: Matrices $A_1, \ldots, A_n$ with dimensions. **Goal**: Minimize scalar multiplications.

## DP Solution
$$m[i,j] = \min_{i \leq k < j} (m[i,k] + m[k+1,j] + p_{i-1} p_k p_j)$$

**Time**: $O(n^3)$, **Space**: $O(n^2)$

## Applications
Database query optimization, compiler optimization
