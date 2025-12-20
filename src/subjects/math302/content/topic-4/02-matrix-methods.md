---
title: "Matrix Methods for Linear Systems"
---

# Matrix Methods for Linear Systems

## Homogeneous Linear Systems with Constant Coefficients

Consider the system:
$$\mathbf{x}' = A\mathbf{x}$$

where $A$ is an $n \times n$ constant matrix and $\mathbf{x}$ is an $n$-dimensional vector function.

**Goal**: Find the general solution $\mathbf{x}(t)$.

## Exponential Matrix Solution

By analogy with the scalar case $x' = ax$ having solution $x = e^{at}x_0$, we seek a solution of the form:
$$\mathbf{x}(t) = e^{At}\mathbf{x}_0$$

where $e^{At}$ is the **matrix exponential**.

### Definition of Matrix Exponential

$$e^{At} = I + At + \frac{(At)^2}{2!} + \frac{(At)^3}{3!} + \cdots = \sum_{k=0}^\infty \frac{(At)^k}{k!}$$

where $I$ is the identity matrix.

**Properties**:
1. $e^{A \cdot 0} = I$
2. $\frac{d}{dt}e^{At} = Ae^{At} = e^{At}A$
3. $e^{A(s+t)} = e^{As}e^{At}$ (if $A$ commutes with itself, which it does)
4. $(e^{At})^{-1} = e^{-At}$

### Verification

If $\mathbf{x}(t) = e^{At}\mathbf{c}$:
$$\mathbf{x}'(t) = \frac{d}{dt}(e^{At}\mathbf{c}) = Ae^{At}\mathbf{c} = A\mathbf{x}(t)$$ ✓

With $\mathbf{x}(0) = e^{A \cdot 0}\mathbf{c} = I\mathbf{c} = \mathbf{c}$

## Computing $e^{At}$: Eigenvalue Method

For constant matrices, the most practical method uses **eigenvalues and eigenvectors**.

If $A$ has eigenvalue $\lambda$ with eigenvector $\mathbf{v}$:
$$A\mathbf{v} = \lambda\mathbf{v}$$

Then $\mathbf{x}(t) = e^{\lambda t}\mathbf{v}$ is a solution.

**Verification**:
$$\mathbf{x}'(t) = \lambda e^{\lambda t}\mathbf{v}$$
$$A\mathbf{x}(t) = Ae^{\lambda t}\mathbf{v} = e^{\lambda t}A\mathbf{v} = e^{\lambda t}\lambda\mathbf{v} = \lambda e^{\lambda t}\mathbf{v}$$ ✓

### Example 1: Distinct Real Eigenvalues

Solve:
$$\mathbf{x}' = \begin{pmatrix} 1 & 2 \\ 3 & 2 \end{pmatrix}\mathbf{x}$$

**Step 1**: Find eigenvalues

$$\det(A - \lambda I) = \begin{vmatrix} 1-\lambda & 2 \\ 3 & 2-\lambda \end{vmatrix} = (1-\lambda)(2-\lambda) - 6 = \lambda^2 - 3\lambda - 4 = 0$$

$$(\lambda - 4)(\lambda + 1) = 0$$

Eigenvalues: $\lambda_1 = 4$, $\lambda_2 = -1$

**Step 2**: Find eigenvectors

For $\lambda_1 = 4$:
$$(A - 4I)\mathbf{v}_1 = \begin{pmatrix} -3 & 2 \\ 3 & -2 \end{pmatrix}\begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \mathbf{0}$$

From first row: $-3v_1 + 2v_2 = 0 \Rightarrow v_2 = \frac{3}{2}v_1$

Choose $v_1 = 2$: $\mathbf{v}_1 = \begin{pmatrix} 2 \\ 3 \end{pmatrix}$

For $\lambda_2 = -1$:
$$(A + I)\mathbf{v}_2 = \begin{pmatrix} 2 & 2 \\ 3 & 3 \end{pmatrix}\begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \mathbf{0}$$

From first row: $2v_1 + 2v_2 = 0 \Rightarrow v_2 = -v_1$

Choose $v_1 = 1$: $\mathbf{v}_2 = \begin{pmatrix} 1 \\ -1 \end{pmatrix}$

**Step 3**: General solution

$$\mathbf{x}(t) = c_1e^{4t}\begin{pmatrix} 2 \\ 3 \end{pmatrix} + c_2e^{-t}\begin{pmatrix} 1 \\ -1 \end{pmatrix}$$

## Fundamental Matrix

The **fundamental matrix** $\Phi(t)$ is a matrix whose columns are linearly independent solutions:

$$\Phi(t) = \begin{pmatrix} \mathbf{x}_1(t) & \mathbf{x}_2(t) & \cdots & \mathbf{x}_n(t) \end{pmatrix}$$

**Properties**:
1. $\Phi'(t) = A\Phi(t)$
2. $\det(\Phi(t)) \neq 0$ for all $t$
3. $\Phi(0) = \begin{pmatrix} \mathbf{v}_1 & \mathbf{v}_2 & \cdots & \mathbf{v}_n \end{pmatrix}$ (matrix of eigenvectors)

**General solution**: $\mathbf{x}(t) = \Phi(t)\mathbf{c}$ where $\mathbf{c}$ is a constant vector.

**Matrix exponential**: $e^{At} = \Phi(t)\Phi(0)^{-1}$

### Example 2: Computing Fundamental Matrix

From Example 1:
$$\Phi(t) = \begin{pmatrix} 2e^{4t} & e^{-t} \\ 3e^{4t} & -e^{-t} \end{pmatrix}$$

$$\Phi(0) = \begin{pmatrix} 2 & 1 \\ 3 & -1 \end{pmatrix}$$

$$\Phi(0)^{-1} = \frac{1}{-5}\begin{pmatrix} -1 & -1 \\ -3 & 2 \end{pmatrix} = \begin{pmatrix} 1/5 & 1/5 \\ 3/5 & -2/5 \end{pmatrix}$$

$$e^{At} = \begin{pmatrix} 2e^{4t} & e^{-t} \\ 3e^{4t} & -e^{-t} \end{pmatrix}\begin{pmatrix} 1/5 & 1/5 \\ 3/5 & -2/5 \end{pmatrix}$$

(This can be multiplied out for explicit form.)

## Wronskian for Systems

The **Wronskian** for a system is:
$$W(t) = \det(\Phi(t))$$

**Abel's formula** for systems:
$$W(t) = W(0)e^{\int_0^t \text{tr}(A)\,ds} = W(0)e^{t\cdot\text{tr}(A)}$$

where $\text{tr}(A) = a_{11} + a_{22} + \cdots + a_{nn}$ is the **trace** of $A$.

### Example 3: Verifying Abel's Formula

From Example 1: $A = \begin{pmatrix} 1 & 2 \\ 3 & 2 \end{pmatrix}$, so $\text{tr}(A) = 1 + 2 = 3$

$$W(t) = \det(\Phi(t)) = \begin{vmatrix} 2e^{4t} & e^{-t} \\ 3e^{4t} & -e^{-t} \end{vmatrix} = -2e^{3t} - 3e^{3t} = -5e^{3t}$$

$$W(0) = -5, \quad W(t) = -5e^{3t}$$ ✓

Abel's formula: $W(t) = W(0)e^{3t} = -5e^{3t}$ ✓

## Diagonalizable Matrices

If $A$ has $n$ linearly independent eigenvectors $\mathbf{v}_1, \ldots, \mathbf{v}_n$ with eigenvalues $\lambda_1, \ldots, \lambda_n$, then $A$ is **diagonalizable**:

$$A = PDP^{-1}$$

where $P = \begin{pmatrix} \mathbf{v}_1 & \cdots & \mathbf{v}_n \end{pmatrix}$ and $D = \text{diag}(\lambda_1, \ldots, \lambda_n)$.

Then:
$$e^{At} = Pe^{Dt}P^{-1} = P\begin{pmatrix} e^{\lambda_1 t} & 0 & \cdots & 0 \\ 0 & e^{\lambda_2 t} & \cdots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \cdots & e^{\lambda_n t} \end{pmatrix}P^{-1}$$

This provides an efficient way to compute $e^{At}$.

## Initial Value Problems

To solve $\mathbf{x}' = A\mathbf{x}$ with $\mathbf{x}(0) = \mathbf{x}_0$:

$$\mathbf{x}(t) = e^{At}\mathbf{x}_0$$

Alternatively:
$$\mathbf{x}(t) = \Phi(t)\Phi(0)^{-1}\mathbf{x}_0 = \Phi(t)\mathbf{c}$$

where $\mathbf{c} = \Phi(0)^{-1}\mathbf{x}_0$.

### Example 4: IVP

Solve $\mathbf{x}' = \begin{pmatrix} 1 & 2 \\ 3 & 2 \end{pmatrix}\mathbf{x}$ with $\mathbf{x}(0) = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$.

From Example 1:
$$\mathbf{x}(t) = c_1e^{4t}\begin{pmatrix} 2 \\ 3 \end{pmatrix} + c_2e^{-t}\begin{pmatrix} 1 \\ -1 \end{pmatrix}$$

At $t = 0$:
$$\begin{pmatrix} 1 \\ 0 \end{pmatrix} = c_1\begin{pmatrix} 2 \\ 3 \end{pmatrix} + c_2\begin{pmatrix} 1 \\ -1 \end{pmatrix}$$

$$2c_1 + c_2 = 1$$
$$3c_1 - c_2 = 0 \Rightarrow c_2 = 3c_1$$

$$2c_1 + 3c_1 = 1 \Rightarrow c_1 = 1/5, \quad c_2 = 3/5$$

$$\mathbf{x}(t) = \frac{1}{5}e^{4t}\begin{pmatrix} 2 \\ 3 \end{pmatrix} + \frac{3}{5}e^{-t}\begin{pmatrix} 1 \\ -1 \end{pmatrix}$$

## Nonhomogeneous Systems

For $\mathbf{x}' = A\mathbf{x} + \mathbf{f}(t)$:

**General solution**: $\mathbf{x}(t) = \mathbf{x}_h(t) + \mathbf{x}_p(t)$

where:
- $\mathbf{x}_h = e^{At}\mathbf{c}$ (homogeneous solution)
- $\mathbf{x}_p$ is a particular solution

### Variation of Parameters

$$\mathbf{x}_p(t) = e^{At}\int_0^t e^{-As}\mathbf{f}(s)\,ds = \Phi(t)\int_0^t \Phi^{-1}(s)\mathbf{f}(s)\,ds$$

### Undetermined Coefficients

For special forms of $\mathbf{f}(t)$ (polynomial, exponential, sinusoidal), guess the form of $\mathbf{x}_p$.

## Advantages of Matrix Methods

1. **Unified approach**: Works for any $n \times n$ system
2. **Computational**: Leverages linear algebra software
3. **Theoretical**: Connects to eigenvalue theory
4. **Generalizable**: Extends to time-varying $A(t)$ (with modifications)

## Conclusion

Matrix methods provide a systematic framework for solving linear systems of differential equations. The matrix exponential $e^{At}$ generalizes the scalar exponential solution, while eigenvalues and eigenvectors reduce the problem to finding independent exponential solutions. The fundamental matrix organizes these solutions, and the Wronskian extends to measure linear independence. These techniques, rooted in linear algebra, offer both theoretical insight and practical computational methods for analyzing multi-variable dynamical systems.
