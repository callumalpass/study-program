---
title: "Systems with Repeated Eigenvalues"
---

# Systems with Repeated Eigenvalues

## The Problem of Repeated Eigenvalues

When the characteristic equation has a **repeated eigenvalue** $\lambda$ of multiplicity $m > 1$, we may not have $m$ linearly independent eigenvectors.

Two cases arise:

**Case 1**: **Complete set of eigenvectors**
- $m$ linearly independent eigenvectors exist
- Matrix is **diagonalizable**
- Standard eigenvalue method works

**Case 2**: **Deficient eigenvectors**
- Fewer than $m$ linearly independent eigenvectors
- Matrix is **not diagonalizable**
- Need **generalized eigenvectors**

## Complete Eigenvectors (Diagonalizable Case)

If an eigenvalue $\lambda$ of multiplicity $m$ has $m$ linearly independent eigenvectors $\mathbf{v}_1, \ldots, \mathbf{v}_m$, then:

$$\mathbf{x}(t) = c_1e^{\lambda t}\mathbf{v}_1 + c_2e^{\lambda t}\mathbf{v}_2 + \cdots + c_me^{\lambda t}\mathbf{v}_m$$

### Example 1: Complete Eigenvectors

Solve:
$$\mathbf{x}' = \begin{pmatrix} 2 & 0 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & -1 \end{pmatrix}\mathbf{x}$$

**Characteristic equation**:
$$\det(A - \lambda I) = (2-\lambda)^2(-1-\lambda) = 0$$

Eigenvalues: $\lambda_1 = 2$ (multiplicity 2), $\lambda_2 = -1$

**For $\lambda = 2$**:
$$(A - 2I)\mathbf{v} = \begin{pmatrix} 0 & 0 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & -3 \end{pmatrix}\begin{pmatrix} v_1 \\ v_2 \\ v_3 \end{pmatrix} = \mathbf{0}$$

This gives $v_3 = 0$, but $v_1$ and $v_2$ are free.

Two independent eigenvectors: $\mathbf{v}_1 = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$, $\mathbf{v}_2 = \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix}$

**For $\lambda = -1$**:
$$\mathbf{v}_3 = \begin{pmatrix} 0 \\ 0 \\ 1 \end{pmatrix}$$

**General solution**:
$$\mathbf{x}(t) = c_1e^{2t}\begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix} + c_2e^{2t}\begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix} + c_3e^{-t}\begin{pmatrix} 0 \\ 0 \\ 1 \end{pmatrix}$$

## Deficient Eigenvectors (Generalized Eigenvectors)

When an eigenvalue $\lambda$ of multiplicity $m$ has fewer than $m$ eigenvectors, we need **generalized eigenvectors**.

### Single Deficient Eigenvector (2×2 Case)

For a 2×2 matrix with repeated eigenvalue $\lambda$ and only **one** eigenvector $\mathbf{v}$, we have one solution:
$$\mathbf{x}_1(t) = e^{\lambda t}\mathbf{v}$$

The second solution has the form:
$$\mathbf{x}_2(t) = te^{\lambda t}\mathbf{v} + e^{\lambda t}\mathbf{w}$$

where $\mathbf{w}$ is a **generalized eigenvector** satisfying:
$$(A - \lambda I)\mathbf{w} = \mathbf{v}$$

### Derivation

Seeking $\mathbf{x}_2 = te^{\lambda t}\mathbf{v} + e^{\lambda t}\mathbf{w}$:

$$\mathbf{x}_2' = e^{\lambda t}\mathbf{v} + \lambda te^{\lambda t}\mathbf{v} + \lambda e^{\lambda t}\mathbf{w}$$

Must satisfy $\mathbf{x}_2' = A\mathbf{x}_2$:
$$e^{\lambda t}\mathbf{v} + \lambda te^{\lambda t}\mathbf{v} + \lambda e^{\lambda t}\mathbf{w} = A(te^{\lambda t}\mathbf{v} + e^{\lambda t}\mathbf{w})$$
$$e^{\lambda t}\mathbf{v} + \lambda te^{\lambda t}\mathbf{v} + \lambda e^{\lambda t}\mathbf{w} = te^{\lambda t}A\mathbf{v} + e^{\lambda t}A\mathbf{w}$$

Since $A\mathbf{v} = \lambda\mathbf{v}$:
$$e^{\lambda t}\mathbf{v} + \lambda te^{\lambda t}\mathbf{v} + \lambda e^{\lambda t}\mathbf{w} = \lambda te^{\lambda t}\mathbf{v} + e^{\lambda t}A\mathbf{w}$$

Cancel $\lambda te^{\lambda t}\mathbf{v}$ and divide by $e^{\lambda t}$:
$$\mathbf{v} + \lambda\mathbf{w} = A\mathbf{w}$$
$$(A - \lambda I)\mathbf{w} = \mathbf{v}$$

This defines the generalized eigenvector $\mathbf{w}$.

### Example 2: Repeated Eigenvalue with Deficiency

Solve:
$$\mathbf{x}' = \begin{pmatrix} 3 & -1 \\ 1 & 1 \end{pmatrix}\mathbf{x}$$

**Characteristic equation**:
$$\det(A - \lambda I) = (3-\lambda)(1-\lambda) + 1 = \lambda^2 - 4\lambda + 4 = (\lambda - 2)^2 = 0$$

Eigenvalue: $\lambda = 2$ (multiplicity 2)

**Find eigenvector**:
$$(A - 2I)\mathbf{v} = \begin{pmatrix} 1 & -1 \\ 1 & -1 \end{pmatrix}\begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \mathbf{0}$$

From first row: $v_1 - v_2 = 0 \Rightarrow v_1 = v_2$

Eigenvector: $\mathbf{v} = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$ (only ONE independent eigenvector!)

**First solution**:
$$\mathbf{x}_1(t) = e^{2t}\begin{pmatrix} 1 \\ 1 \end{pmatrix}$$

**Find generalized eigenvector**:
$$(A - 2I)\mathbf{w} = \mathbf{v}$$
$$\begin{pmatrix} 1 & -1 \\ 1 & -1 \end{pmatrix}\begin{pmatrix} w_1 \\ w_2 \end{pmatrix} = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$$

From first row: $w_1 - w_2 = 1$

Choose $w_1 = 1, w_2 = 0$: $\mathbf{w} = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$

**Second solution**:
$$\mathbf{x}_2(t) = te^{2t}\begin{pmatrix} 1 \\ 1 \end{pmatrix} + e^{2t}\begin{pmatrix} 1 \\ 0 \end{pmatrix} = e^{2t}\begin{pmatrix} t+1 \\ t \end{pmatrix}$$

**General solution**:
$$\mathbf{x}(t) = c_1e^{2t}\begin{pmatrix} 1 \\ 1 \end{pmatrix} + c_2e^{2t}\begin{pmatrix} t+1 \\ t \end{pmatrix}$$

Or in component form:
$$x_1(t) = c_1e^{2t} + c_2(t+1)e^{2t} = (c_1 + c_2 + c_2t)e^{2t}$$
$$x_2(t) = c_1e^{2t} + c_2te^{2t}$$

### Example 3: IVP with Repeated Eigenvalue

Solve $\mathbf{x}' = \begin{pmatrix} 3 & -1 \\ 1 & 1 \end{pmatrix}\mathbf{x}$ with $\mathbf{x}(0) = \begin{pmatrix} 2 \\ 1 \end{pmatrix}$.

From Example 2:
$$\mathbf{x}(t) = c_1e^{2t}\begin{pmatrix} 1 \\ 1 \end{pmatrix} + c_2e^{2t}\begin{pmatrix} t+1 \\ t \end{pmatrix}$$

At $t = 0$:
$$\begin{pmatrix} 2 \\ 1 \end{pmatrix} = c_1\begin{pmatrix} 1 \\ 1 \end{pmatrix} + c_2\begin{pmatrix} 1 \\ 0 \end{pmatrix}$$

$$c_1 + c_2 = 2$$
$$c_1 = 1$$

Therefore $c_2 = 1$.

**Solution**:
$$\mathbf{x}(t) = e^{2t}\begin{pmatrix} 1 \\ 1 \end{pmatrix} + e^{2t}\begin{pmatrix} t+1 \\ t \end{pmatrix} = e^{2t}\begin{pmatrix} t+2 \\ t+1 \end{pmatrix}$$

## Higher Multiplicity

For eigenvalue $\lambda$ with multiplicity $m > 2$ and deficiency, form **chains** of generalized eigenvectors:

$$(A - \lambda I)\mathbf{v}_1 = \mathbf{0}$$ (eigenvector)
$$(A - \lambda I)\mathbf{v}_2 = \mathbf{v}_1$$ (generalized eigenvector, rank 1)
$$(A - \lambda I)\mathbf{v}_3 = \mathbf{v}_2$$ (generalized eigenvector, rank 2)
$$\vdots$$

Solutions:
$$\mathbf{x}_1 = e^{\lambda t}\mathbf{v}_1$$
$$\mathbf{x}_2 = te^{\lambda t}\mathbf{v}_1 + e^{\lambda t}\mathbf{v}_2$$
$$\mathbf{x}_3 = \frac{t^2}{2}e^{\lambda t}\mathbf{v}_1 + te^{\lambda t}\mathbf{v}_2 + e^{\lambda t}\mathbf{v}_3$$

### Example 4: Triple Eigenvalue

For a 3×3 matrix with $\lambda = 2$ (multiplicity 3) and one eigenvector $\mathbf{v}_1$:

Find $\mathbf{v}_2$ and $\mathbf{v}_3$ such that:
$$(A - 2I)\mathbf{v}_2 = \mathbf{v}_1$$
$$(A - 2I)\mathbf{v}_3 = \mathbf{v}_2$$

Solutions:
$$\mathbf{x}_1 = e^{2t}\mathbf{v}_1$$
$$\mathbf{x}_2 = te^{2t}\mathbf{v}_1 + e^{2t}\mathbf{v}_2$$
$$\mathbf{x}_3 = \frac{t^2}{2}e^{2t}\mathbf{v}_1 + te^{2t}\mathbf{v}_2 + e^{2t}\mathbf{v}_3$$

## Phase Portrait Behavior

For repeated eigenvalues:

**$\lambda < 0$**: Trajectories approach origin along direction of eigenvector (improper node, stable)

**$\lambda > 0$**: Trajectories diverge from origin (improper node, unstable)

**$\lambda = 0$**: Parallel lines (not isolated equilibrium)

Unlike distinct eigenvalues, repeated eigenvalues produce **improper nodes** rather than proper nodes.

## Connection to Higher-Order Equations

The second-order equation with repeated root $r$:
$$y'' - 2ry' + r^2y = 0$$

has solutions $y_1 = e^{rt}$ and $y_2 = te^{rt}$.

Converting to system form yields repeated eigenvalue $\lambda = r$ with generalized eigenvector, connecting both perspectives.

## Summary of Procedure

For eigenvalue $\lambda$ with algebraic multiplicity $m$:

1. **Find eigenvectors**: Solve $(A - \lambda I)\mathbf{v} = \mathbf{0}$

2. **Check geometric multiplicity**: Count independent eigenvectors $k$

3. **If $k = m$**: Use all eigenvectors directly

4. **If $k < m$**: Find $m - k$ generalized eigenvectors solving:
   $$(A - \lambda I)\mathbf{w} = \mathbf{v}$$
   (and higher ranks if needed)

5. **Form solutions**: Combine exponentials and polynomials in $t$

## Conclusion

Repeated eigenvalues introduce polynomial factors (in $t$) into solutions when the matrix is not diagonalizable. Generalized eigenvectors fill the gap left by missing regular eigenvectors, ensuring a complete set of $n$ linearly independent solutions. The algebra is more involved, but the systematic procedure—finding eigenvectors, checking deficiency, computing generalized eigenvectors—works reliably. Understanding repeated eigenvalues is essential for analyzing systems with special symmetries or degenerate cases.
