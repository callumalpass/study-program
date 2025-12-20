---
id: math201-t5-cramers
title: "Cramer"
order: 5
---

# Cramer's Rule

Cramer's Rule provides an explicit formula for solving systems of linear equations using determinants. While not the most computationally efficient method for large systems, it offers theoretical insight and is practical for small systems with symbolic coefficients.

## The Setting: Linear Systems

Consider a system of $n$ linear equations in $n$ unknowns:

$$\begin{cases}
a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n = b_1 \\
a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n = b_2 \\
\vdots \\
a_{n1}x_1 + a_{n2}x_2 + \cdots + a_{nn}x_n = b_n
\end{cases}$$

In matrix form: $A\mathbf{x} = \mathbf{b}$, where:

$$A = \begin{bmatrix} a_{11} & a_{12} & \cdots & a_{1n} \\ a_{21} & a_{22} & \cdots & a_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ a_{n1} & a_{n2} & \cdots & a_{nn} \end{bmatrix}, \quad \mathbf{x} = \begin{bmatrix} x_1 \\ x_2 \\ \vdots \\ x_n \end{bmatrix}, \quad \mathbf{b} = \begin{bmatrix} b_1 \\ b_2 \\ \vdots \\ b_n \end{bmatrix}$$

## Cramer's Rule Statement

If $\det(A) \neq 0$, the system has a unique solution given by:

$$x_i = \frac{\det(A_i)}{\det(A)}$$

where $A_i$ is the matrix formed by replacing the $i$-th column of $A$ with the vector $\mathbf{b}$.

## Understanding the Formula

**$A_i$ construction**: To find $x_i$, replace column $i$ of $A$ with $\mathbf{b}$:

$$A_i = \begin{bmatrix} a_{11} & \cdots & b_1 & \cdots & a_{1n} \\ a_{21} & \cdots & b_2 & \cdots & a_{2n} \\ \vdots & & \vdots & & \vdots \\ a_{n1} & \cdots & b_n & \cdots & a_{nn} \end{bmatrix}$$

The $i$-th column is replaced with $\mathbf{b}$; all other columns remain the same.

## Example: 2×2 System

Solve the system:
$$\begin{cases}
2x_1 + 3x_2 = 8 \\
5x_1 + 4x_2 = 13
\end{cases}$$

**Step 1**: Write in matrix form.
$$A = \begin{bmatrix} 2 & 3 \\ 5 & 4 \end{bmatrix}, \quad \mathbf{b} = \begin{bmatrix} 8 \\ 13 \end{bmatrix}$$

**Step 2**: Compute $\det(A)$.
$$\det(A) = (2)(4) - (3)(5) = 8 - 15 = -7$$

Since $\det(A) \neq 0$, a unique solution exists.

**Step 3**: Compute $\det(A_1)$ (replace column 1 with $\mathbf{b}$).
$$A_1 = \begin{bmatrix} 8 & 3 \\ 13 & 4 \end{bmatrix}$$
$$\det(A_1) = (8)(4) - (3)(13) = 32 - 39 = -7$$

**Step 4**: Compute $\det(A_2)$ (replace column 2 with $\mathbf{b}$).
$$A_2 = \begin{bmatrix} 2 & 8 \\ 5 & 13 \end{bmatrix}$$
$$\det(A_2) = (2)(13) - (8)(5) = 26 - 40 = -14$$

**Step 5**: Apply Cramer's Rule.
$$x_1 = \frac{\det(A_1)}{\det(A)} = \frac{-7}{-7} = 1$$
$$x_2 = \frac{\det(A_2)}{\det(A)} = \frac{-14}{-7} = 2$$

**Solution**: $x_1 = 1$, $x_2 = 2$

**Verification**: $2(1) + 3(2) = 2 + 6 = 8$ ✓ and $5(1) + 4(2) = 5 + 8 = 13$ ✓

## Example: 3×3 System

Solve the system:
$$\begin{cases}
x_1 + 2x_2 + x_3 = 6 \\
2x_1 + x_2 + x_3 = 6 \\
x_1 + x_2 + 2x_3 = 6
\end{cases}$$

**Step 1**: Matrix form.
$$A = \begin{bmatrix} 1 & 2 & 1 \\ 2 & 1 & 1 \\ 1 & 1 & 2 \end{bmatrix}, \quad \mathbf{b} = \begin{bmatrix} 6 \\ 6 \\ 6 \end{bmatrix}$$

**Step 2**: Compute $\det(A)$ using row expansion.
$$\det(A) = 1\det\begin{bmatrix} 1 & 1 \\ 1 & 2 \end{bmatrix} - 2\det\begin{bmatrix} 2 & 1 \\ 1 & 2 \end{bmatrix} + 1\det\begin{bmatrix} 2 & 1 \\ 1 & 1 \end{bmatrix}$$

$$= 1(2-1) - 2(4-1) + 1(2-1) = 1 - 6 + 1 = -4$$

**Step 3**: Compute $\det(A_1)$ (replace column 1).
$$A_1 = \begin{bmatrix} 6 & 2 & 1 \\ 6 & 1 & 1 \\ 6 & 1 & 2 \end{bmatrix}$$

Factor out 6 from column 1: $\det(A_1) = 6\det\begin{bmatrix} 1 & 2 & 1 \\ 1 & 1 & 1 \\ 1 & 1 & 2 \end{bmatrix}$

$$= 6[1(2-1) - 2(2-1) + 1(1-1)] = 6[1 - 2 + 0] = -6$$

**Step 4**: Compute $\det(A_2)$ (replace column 2).
$$A_2 = \begin{bmatrix} 1 & 6 & 1 \\ 2 & 6 & 1 \\ 1 & 6 & 2 \end{bmatrix}$$

Factor out 6 from column 2: $\det(A_2) = 6\det\begin{bmatrix} 1 & 1 & 1 \\ 2 & 1 & 1 \\ 1 & 1 & 2 \end{bmatrix}$

$$= 6[1(2-1) - 1(4-1) + 1(2-1)] = 6[1 - 3 + 1] = -6$$

**Step 5**: Compute $\det(A_3)$ (replace column 3).
$$A_3 = \begin{bmatrix} 1 & 2 & 6 \\ 2 & 1 & 6 \\ 1 & 1 & 6 \end{bmatrix}$$

Factor out 6 from column 3: $\det(A_3) = 6\det\begin{bmatrix} 1 & 2 & 1 \\ 2 & 1 & 1 \\ 1 & 1 & 1 \end{bmatrix}$

$$= 6[1(1-1) - 2(2-1) + 1(2-1)] = 6[0 - 2 + 1] = -6$$

**Step 6**: Apply Cramer's Rule.
$$x_1 = \frac{-6}{-4} = \frac{3}{2}$$
$$x_2 = \frac{-6}{-4} = \frac{3}{2}$$
$$x_3 = \frac{-6}{-4} = \frac{3}{2}$$

**Solution**: $x_1 = x_2 = x_3 = \frac{3}{2}$

## Conditions for Unique Solution

Cramer's Rule works if and only if $\det(A) \neq 0$.

**Case 1: $\det(A) \neq 0$**
- The system has a **unique solution**
- Cramer's Rule provides explicit formulas for each variable
- The matrix $A$ is invertible

**Case 2: $\det(A) = 0$**
- The system either has **no solution** or **infinitely many solutions**
- Cramer's Rule does not apply
- The matrix $A$ is singular (not invertible)

### Example: No Unique Solution

Consider:
$$\begin{cases}
2x_1 + 4x_2 = 6 \\
x_1 + 2x_2 = 5
\end{cases}$$

$$A = \begin{bmatrix} 2 & 4 \\ 1 & 2 \end{bmatrix}$$

$$\det(A) = (2)(2) - (4)(1) = 0$$

Since $\det(A) = 0$, Cramer's Rule doesn't apply. The rows are proportional (row 1 = 2 × row 2), but the constants aren't (6 ≠ 2 × 5), so there's **no solution**.

## Why Cramer's Rule Works

The formula $x_i = \frac{\det(A_i)}{\det(A)}$ comes from the relationship between matrix multiplication and determinants.

When we solve $A\mathbf{x} = \mathbf{b}$, we're looking for coefficients $x_1, \ldots, x_n$ such that:
$$x_1\mathbf{a}_1 + x_2\mathbf{a}_2 + \cdots + x_n\mathbf{a}_n = \mathbf{b}$$

where $\mathbf{a}_i$ are the columns of $A$.

The determinant $\det(A_i)$ effectively "measures" how much the $i$-th column needs to be scaled to produce $\mathbf{b}$, normalized by $\det(A)$.

## Computational Considerations

**Advantages**:
- Provides explicit formulas for solutions
- Useful for theoretical work and symbolic computation
- Each variable can be computed independently
- Clear criterion for uniqueness: $\det(A) \neq 0$

**Disadvantages**:
- Computationally expensive for large systems
- Requires computing $n+1$ determinants (each $O(n^3)$ operations)
- Total complexity: $O(n^4)$ vs $O(n^3)$ for Gaussian elimination
- Numerically unstable for large systems

**Practical use**: Cramer's Rule is best for:
- Small systems (2×2 or 3×3)
- Symbolic/parametric solutions
- Theoretical analysis
- Single variable solutions (when you only need one $x_i$)

### Example: Finding One Variable

If you only need $x_2$ from a large system, Cramer's Rule requires computing only $\det(A)$ and $\det(A_2)$—more efficient than solving the entire system.

## Homogeneous Systems

For a homogeneous system $A\mathbf{x} = \mathbf{0}$:

**If $\det(A) \neq 0$**: Only the trivial solution $\mathbf{x} = \mathbf{0}$ exists.
- Each $A_i$ has a column of zeros (since $\mathbf{b} = \mathbf{0}$)
- Therefore $\det(A_i) = 0$ for all $i$
- Cramer's Rule gives $x_i = \frac{0}{\det(A)} = 0$

**If $\det(A) = 0$**: Infinitely many nontrivial solutions exist.

### Example: Homogeneous System

$$\begin{cases}
x_1 + 2x_2 = 0 \\
3x_1 + 6x_2 = 0
\end{cases}$$

$$\det(A) = (1)(6) - (2)(3) = 0$$

Infinitely many solutions: $x_2 = t$, $x_1 = -2t$ for any $t \in \mathbb{R}$.

## Summary

- **Cramer's Rule**: $x_i = \frac{\det(A_i)}{\det(A)}$ where $A_i$ replaces column $i$ with $\mathbf{b}$
- **Applicability**: Works if and only if $\det(A) \neq 0$
- **Uniqueness**: $\det(A) \neq 0$ guarantees a unique solution
- **Construction**: Replace each column of $A$ with $\mathbf{b}$ to get $A_i$
- **Advantages**: Explicit formulas, good for small or symbolic systems
- **Disadvantages**: Computationally expensive for large systems ($O(n^4)$)
- **Best for**: 2×2, 3×3 systems, finding individual variables, theoretical analysis
- **Homogeneous case**: Trivial solution only when $\det(A) \neq 0$
