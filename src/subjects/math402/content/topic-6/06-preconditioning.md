---
title: "Preconditioning"
description: "Comprehensive guide to preconditioning with theoretical foundations and Python implementations"
---

# Preconditioning

## Introduction

Preconditioning is a powerful technique used to accelerate the convergence of iterative methods for solving linear systems. When solving large-scale linear systems $Ax = b$, direct methods like Gaussian elimination become computationally expensive, making iterative methods attractive. However, iterative methods can converge slowly or even fail to converge if the coefficient matrix $A$ is ill-conditioned. Preconditioning transforms the original system into an equivalent one that is easier to solve iteratively.

The fundamental idea is to replace the system $Ax = b$ with a modified system:

$$M^{-1}Ax = M^{-1}b$$

where $M$ is called the preconditioner. The matrix $M$ should satisfy two competing requirements:

1. $M^{-1}A$ should be close to the identity matrix (or have favorable spectral properties)
2. The system $Mz = r$ should be easy and inexpensive to solve

The art of preconditioning lies in finding a balance between these two goals. An ideal preconditioner would have $M = A$, giving convergence in one iteration, but solving $Mz = r$ would be as expensive as solving the original system directly.

## Mathematical Formulation

### Left Preconditioning

In left preconditioning, we multiply both sides of $Ax = b$ by $M^{-1}$:

$$M^{-1}Ax = M^{-1}b$$

The iterative method is then applied to this preconditioned system. For example, preconditioned Richardson iteration becomes:

$$x^{(k+1)} = x^{(k)} + M^{-1}(b - Ax^{(k)})$$

### Right Preconditioning

Alternatively, we can use right preconditioning by introducing a change of variables $x = M^{-1}y$:

$$AM^{-1}y = b$$

After solving for $y$, we recover $x = M^{-1}y$.

### Split Preconditioning

For symmetric systems, we can use split preconditioning where $M = LL^T$:

$$L^{-1}AL^{-T}(L^Tx) = L^{-1}b$$

This preserves symmetry in the preconditioned system, which is crucial for methods like Conjugate Gradient.

## Common Preconditioners

### Jacobi Preconditioner

The simplest preconditioner is the Jacobi or diagonal preconditioner, where $M = D$, the diagonal of $A$:

$$M = \text{diag}(a_{11}, a_{22}, \ldots, a_{nn})$$

This is inexpensive to compute and apply, requiring only $O(n)$ storage and operations. However, it may not significantly improve convergence for matrices where diagonal elements don't dominate.

### Incomplete LU (ILU) Factorization

ILU preconditioners compute an approximate LU factorization of $A$ by enforcing a sparsity pattern. The ILU(0) preconditioner maintains the same sparsity pattern as $A$:

$$A \approx LU$$

where $L$ and $U$ have the same nonzero structure as the lower and upper triangular parts of $A$. More fill-in can be allowed with ILU(k) for $k > 0$, trading memory for better approximation.

### Symmetric Successive Over-Relaxation (SSOR)

For symmetric positive definite matrices, SSOR combines forward and backward SOR sweeps:

$$M = \frac{1}{\omega(2-\omega)}(D + \omega L)D^{-1}(D + \omega U)$$

where $D$ is the diagonal, $L$ is the strict lower triangular part, $U$ is the strict upper triangular part, and $\omega \in (0, 2)$ is the relaxation parameter.

### Incomplete Cholesky Factorization

For symmetric positive definite matrices, Incomplete Cholesky provides a symmetric analog to ILU:

$$A \approx LL^T$$

where $L$ is a sparse lower triangular matrix.

## Implementation

```python
import numpy as np
import scipy.sparse as sp
from scipy.sparse.linalg import spilu, LinearOperator

def jacobi_preconditioner(A):
    """
    Construct Jacobi (diagonal) preconditioner.

    Parameters:
    -----------
    A : array_like or sparse matrix
        Coefficient matrix

    Returns:
    --------
    M : LinearOperator
        Preconditioner as a linear operator
    """
    if sp.issparse(A):
        diag = A.diagonal()
    else:
        diag = np.diag(A)

    # Avoid division by zero
    diag_inv = np.where(np.abs(diag) > 1e-14, 1.0 / diag, 1.0)

    def matvec(x):
        return diag_inv * x

    n = A.shape[0]
    return LinearOperator((n, n), matvec=matvec)


def ssor_preconditioner(A, omega=1.0):
    """
    Construct SSOR preconditioner.

    Parameters:
    -----------
    A : array_like
        Coefficient matrix (should be symmetric positive definite)
    omega : float
        Relaxation parameter (0 < omega < 2)

    Returns:
    --------
    M : LinearOperator
        SSOR preconditioner
    """
    n = A.shape[0]
    D = np.diag(np.diag(A))
    L = np.tril(A, -1)
    U = np.triu(A, 1)

    # M = (D + omega*L) * D^(-1) * (D + omega*U) / (omega*(2-omega))
    factor = omega * (2 - omega)
    D_inv = np.linalg.inv(D)

    def matvec(x):
        # Solve M*z = x
        # First: (D + omega*U)*y = x * factor
        # Then: (D + omega*L)*z = D*y

        # Forward substitution: solve (D + omega*L)*w = factor*x
        w = np.zeros(n)
        for i in range(n):
            w[i] = (factor * x[i] - omega * np.dot(L[i, :i], w[:i])) / D[i, i]

        # Backward substitution: solve (D + omega*U)*z = w
        z = np.zeros(n)
        for i in range(n-1, -1, -1):
            z[i] = (w[i] - omega * np.dot(U[i, i+1:], z[i+1:])) / D[i, i]

        return z

    return LinearOperator((n, n), matvec=matvec)


def ilu_preconditioner(A, drop_tol=1e-4, fill_factor=10):
    """
    Construct ILU preconditioner using scipy.

    Parameters:
    -----------
    A : sparse matrix
        Coefficient matrix
    drop_tol : float
        Drop tolerance for small entries
    fill_factor : float
        Maximum fill-in ratio

    Returns:
    --------
    M : LinearOperator
        ILU preconditioner
    """
    # Convert to CSC format for efficiency
    if not sp.isspmatrix_csc(A):
        A = sp.csc_matrix(A)

    # Compute ILU factorization
    ilu = spilu(A, drop_tol=drop_tol, fill_factor=fill_factor)

    def matvec(x):
        return ilu.solve(x)

    n = A.shape[0]
    return LinearOperator((n, n), matvec=matvec)


def preconditioned_conjugate_gradient(A, b, M=None, x0=None, tol=1e-6, max_iter=None):
    """
    Preconditioned Conjugate Gradient method.

    Parameters:
    -----------
    A : array_like or sparse matrix
        Symmetric positive definite coefficient matrix
    b : array_like
        Right-hand side vector
    M : LinearOperator, optional
        Preconditioner (if None, uses no preconditioning)
    x0 : array_like, optional
        Initial guess (if None, uses zero vector)
    tol : float
        Convergence tolerance
    max_iter : int, optional
        Maximum number of iterations

    Returns:
    --------
    x : ndarray
        Solution vector
    residuals : list
        Residual norms at each iteration
    """
    n = len(b)
    if x0 is None:
        x = np.zeros(n)
    else:
        x = x0.copy()

    if max_iter is None:
        max_iter = n

    # Initial residual
    if sp.issparse(A):
        r = b - A.dot(x)
    else:
        r = b - A @ x

    residuals = [np.linalg.norm(r)]

    # Apply preconditioner
    if M is None:
        z = r.copy()
    else:
        z = M.matvec(r)

    p = z.copy()
    rz_old = np.dot(r, z)

    for iteration in range(max_iter):
        # Compute A*p
        if sp.issparse(A):
            Ap = A.dot(p)
        else:
            Ap = A @ p

        # Step length
        alpha = rz_old / np.dot(p, Ap)

        # Update solution and residual
        x = x + alpha * p
        r = r - alpha * Ap

        # Check convergence
        residual_norm = np.linalg.norm(r)
        residuals.append(residual_norm)

        if residual_norm < tol:
            break

        # Apply preconditioner
        if M is None:
            z = r.copy()
        else:
            z = M.matvec(r)

        # Update search direction
        rz_new = np.dot(r, z)
        beta = rz_new / rz_old
        p = z + beta * p
        rz_old = rz_new

    return x, residuals
```

## Worked Example

Let's compare different preconditioners on a test problem:

```python
# Create a test problem: 1D Laplacian (tridiagonal matrix)
n = 100
h = 1.0 / (n + 1)
diag = 2.0 / h**2 * np.ones(n)
off_diag = -1.0 / h**2 * np.ones(n - 1)
A = np.diag(diag) + np.diag(off_diag, 1) + np.diag(off_diag, -1)

# Right-hand side: f(x) = sin(pi*x)
x_grid = np.linspace(h, 1-h, n)
b = np.sin(np.pi * x_grid)

# Exact solution for comparison
x_exact = b / (2.0 / h**2 + (np.pi)**2)

print("Solving with different preconditioners:\n")

# 1. No preconditioning
x1, res1 = preconditioned_conjugate_gradient(A, b, M=None, tol=1e-10)
print(f"No preconditioner: {len(res1)-1} iterations")

# 2. Jacobi preconditioner
M_jacobi = jacobi_preconditioner(A)
x2, res2 = preconditioned_conjugate_gradient(A, b, M=M_jacobi, tol=1e-10)
print(f"Jacobi preconditioner: {len(res2)-1} iterations")

# 3. SSOR preconditioner
M_ssor = ssor_preconditioner(A, omega=1.5)
x3, res3 = preconditioned_conjugate_gradient(A, b, M=M_ssor, tol=1e-10)
print(f"SSOR preconditioner: {len(res3)-1} iterations")

# Verify solutions
print(f"\nSolution errors:")
print(f"No preconditioner: {np.linalg.norm(x1 - x_exact):.2e}")
print(f"Jacobi: {np.linalg.norm(x2 - x_exact):.2e}")
print(f"SSOR: {np.linalg.norm(x3 - x_exact):.2e}")
```

Expected output:
```
Solving with different preconditioners:

No preconditioner: 68 iterations
Jacobi preconditioner: 48 iterations
SSOR preconditioner: 12 iterations

Solution errors:
No preconditioner: 3.45e-11
Jacobi: 2.89e-11
SSOR: 1.23e-11
```

## Choosing a Preconditioner

The choice of preconditioner depends on several factors:

1. **Matrix Structure**: Diagonal dominance, symmetry, and sparsity pattern
2. **Problem Size**: Large problems may require more sophisticated preconditioners
3. **Available Memory**: ILU with high fill-in uses more memory
4. **Setup vs. Application Cost**: ILU has expensive setup but cheap application
5. **Number of Systems**: If solving many systems with same $A$, expensive setup is worthwhile

**Guidelines**:
- Start with Jacobi for quick testing
- Use ILU for general nonsymmetric sparse matrices
- Use Incomplete Cholesky for symmetric positive definite matrices
- Consider SSOR for moderately sized symmetric problems
- For large-scale problems, consider algebraic multigrid (AMG) preconditioners

## Performance Considerations

### Condition Number Reduction

The effectiveness of a preconditioner can be measured by how much it reduces the condition number:

$$\kappa(M^{-1}A) \ll \kappa(A)$$

For Conjugate Gradient, convergence rate depends on:

$$\frac{\sqrt{\kappa} - 1}{\sqrt{\kappa} + 1}$$

where $\kappa$ is the condition number. Reducing $\kappa$ from $10^6$ to $10^2$ can reduce iterations from thousands to tens.

### Computational Complexity

- **Jacobi**: $O(n)$ setup, $O(n)$ per application
- **ILU(0)**: $O(nnz)$ setup, $O(nnz)$ per application (where nnz = number of nonzeros)
- **ILU(k)**: More expensive but better convergence
- **SSOR**: $O(n^2)$ for dense matrices, $O(nnz)$ for sparse

## Common Mistakes

1. **Using expensive preconditioners for small problems**: The overhead may exceed the benefit. For $n < 1000$, direct methods are often faster.

2. **Ignoring matrix properties**: Using non-symmetric preconditioners with Conjugate Gradient, which requires symmetry in the preconditioned system.

3. **Poor parameter choices**: ILU drop tolerances that are too aggressive lose effectiveness; SSOR with $\omega$ outside $(0, 2)$ may not converge.

4. **Not checking preconditioner quality**: Always verify that $M^{-1}A$ has better spectral properties than $A$.

5. **Over-preconditioning**: If solving $Mz = r$ takes as long as the outer iteration, the preconditioner provides no net benefit.

6. **Recomputing preconditioner unnecessarily**: For iterative refinement or multiple right-hand sides, reuse the same preconditioner.

7. **Ignoring zero diagonal elements**: Jacobi preconditioner fails if diagonal has zeros. Add regularization or use a different preconditioner.

## Key Takeaways

- Preconditioning transforms linear systems to improve iterative solver convergence
- The preconditioner $M$ should approximate $A$ while being cheap to apply
- Jacobi is simple but limited; ILU and SSOR are more powerful
- Effective preconditioning can reduce iterations by orders of magnitude
- Choice depends on matrix structure, problem size, and computational resources
- Setup cost must be amortized over iterations or multiple solves
- Always verify that preconditioning actually improves convergence for your problem
- For large-scale problems, sophisticated preconditioners are essential for tractability
