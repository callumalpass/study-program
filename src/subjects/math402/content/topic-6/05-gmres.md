---
title: "GMRES"
description: "Comprehensive guide to gmres with theoretical foundations and Python implementations"
---

# GMRES (Generalized Minimal Residual Method)

## Introduction

The Generalized Minimal Residual (GMRES) method is a powerful iterative technique for solving nonsymmetric systems of linear equations. Developed by Youcef Saad and Martin Schultz in 1986, GMRES extends the success of Conjugate Gradient to general matrices that are neither symmetric nor positive definite. The method has become one of the most widely used iterative solvers in scientific computing, particularly for large-scale problems arising from computational fluid dynamics, electromagnetics, and other engineering applications.

GMRES belongs to the family of Krylov subspace methods, which construct approximate solutions from increasingly larger subspaces. The key distinguishing feature of GMRES is that it minimizes the residual norm over the Krylov subspace at each iteration, making it optimal in this sense. However, this optimality comes at a cost: the memory and computational requirements grow with the number of iterations, leading to the development of restarted GMRES variants for practical applications.

## Mathematical Foundation

For a general system $Ax = b$ where $A \in \mathbb{R}^{n \times n}$ is nonsingular (not necessarily symmetric or positive definite), GMRES seeks an approximate solution $x^{(k)}$ from the Krylov subspace:

$$\mathcal{K}_k(A, r^{(0)}) = \text{span}\{r^{(0)}, Ar^{(0)}, A^2r^{(0)}, \ldots, A^{k-1}r^{(0)}\}$$

where $r^{(0)} = b - Ax^{(0)}$ is the initial residual.

The approximate solution at iteration $k$ is:

$$x^{(k)} = x^{(0)} + y^{(k)}$$

where $y^{(k)} \in \mathcal{K}_k(A, r^{(0)})$ is chosen to minimize the residual norm:

$$\|r^{(k)}\|_2 = \|b - Ax^{(k)}\|_2 = \|r^{(0)} - Ay^{(k)}\|_2$$

This minimization problem is solved using the Arnoldi process, which constructs an orthonormal basis $\{v_1, v_2, \ldots, v_k\}$ for the Krylov subspace through a modified Gram-Schmidt orthogonalization.

## The Arnoldi Process

The Arnoldi iteration builds an orthonormal basis for the Krylov subspace. Starting with $v_1 = r^{(0)}/\|r^{(0)}\|_2$, we iteratively compute:

$$Av_j = \sum_{i=1}^{j+1} h_{ij} v_i$$

where the coefficients $h_{ij}$ are computed via orthogonalization:

$$h_{ij} = v_i^T (Av_j) \quad \text{for } i = 1, 2, \ldots, j$$

$$v_{j+1} = \frac{Av_j - \sum_{i=1}^{j} h_{ij} v_i}{h_{j+1,j}}$$

where $h_{j+1,j} = \|Av_j - \sum_{i=1}^{j} h_{ij} v_i\|_2$.

This process produces a matrix relation:

$$AV_k = V_{k+1}\tilde{H}_k$$

where $V_k = [v_1, v_2, \ldots, v_k]$ has orthonormal columns, and $\tilde{H}_k$ is a $(k+1) \times k$ upper Hessenberg matrix.

## GMRES Minimization

Using the Arnoldi decomposition, the residual minimization becomes:

$$\min_{y \in \mathbb{R}^k} \|r^{(0)} - AV_k y\|_2 = \min_{y \in \mathbb{R}^k} \|\beta v_1 - V_{k+1}\tilde{H}_k y\|_2$$

where $\beta = \|r^{(0)}\|_2$. Since $V_{k+1}$ has orthonormal columns:

$$\min_{y \in \mathbb{R}^k} \|\beta e_1 - \tilde{H}_k y\|_2$$

where $e_1 = (1, 0, \ldots, 0)^T \in \mathbb{R}^{k+1}$. This least squares problem is solved using QR factorization or Givens rotations.

## Worked Example

Solve the system using GMRES (2 iterations):

$$A = \begin{bmatrix} 2 & 1 \\ 1 & 3 \end{bmatrix}, \quad b = \begin{bmatrix} 1 \\ 2 \end{bmatrix}$$

**Step 1**: Initialize with $x^{(0)} = (0, 0)^T$

$$r^{(0)} = b - Ax^{(0)} = \begin{bmatrix} 1 \\ 2 \end{bmatrix}$$

$$\beta = \|r^{(0)}\|_2 = \sqrt{1^2 + 2^2} = \sqrt{5}$$

$$v_1 = \frac{r^{(0)}}{\beta} = \frac{1}{\sqrt{5}} \begin{bmatrix} 1 \\ 2 \end{bmatrix} = \begin{bmatrix} 0.4472 \\ 0.8944 \end{bmatrix}$$

**Step 2**: First Arnoldi iteration

Compute $Av_1$:
$$Av_1 = \begin{bmatrix} 2 & 1 \\ 1 & 3 \end{bmatrix} \begin{bmatrix} 0.4472 \\ 0.8944 \end{bmatrix} = \begin{bmatrix} 1.7888 \\ 3.1304 \end{bmatrix}$$

Compute $h_{11}$:
$$h_{11} = v_1^T (Av_1) = 0.4472(1.7888) + 0.8944(3.1304) = 3.5999 \approx 3.6$$

Compute unnormalized $v_2$:
$$w = Av_1 - h_{11}v_1 = \begin{bmatrix} 1.7888 \\ 3.1304 \end{bmatrix} - 3.6 \begin{bmatrix} 0.4472 \\ 0.8944 \end{bmatrix} = \begin{bmatrix} 0.1789 \\ -0.0896 \end{bmatrix}$$

Compute $h_{21}$:
$$h_{21} = \|w\|_2 = \sqrt{0.1789^2 + (-0.0896)^2} = 0.2000$$

Normalize:
$$v_2 = \frac{w}{h_{21}} = \begin{bmatrix} 0.8944 \\ -0.4472 \end{bmatrix}$$

**Step 3**: Solve minimization problem for $k=1$

We have $\tilde{H}_1 = \begin{bmatrix} h_{11} \\ h_{21} \end{bmatrix} = \begin{bmatrix} 3.6 \\ 0.2 \end{bmatrix}$

Minimize $\|\beta e_1 - \tilde{H}_1 y_1\|_2 = \left\|\begin{bmatrix} \sqrt{5} \\ 0 \end{bmatrix} - \begin{bmatrix} 3.6 \\ 0.2 \end{bmatrix} y_1\right\|_2$

This gives $y_1 = \beta / h_{11} = \sqrt{5} / 3.6 = 0.6209$

Update solution:
$$x^{(1)} = x^{(0)} + y_1 v_1 = 0.6209 \begin{bmatrix} 0.4472 \\ 0.8944 \end{bmatrix} = \begin{bmatrix} 0.2776 \\ 0.5553 \end{bmatrix}$$

Residual norm:
$$\|r^{(1)}\|_2 = |h_{21}||y_1| = 0.2 \times 0.6209 = 0.1242$$

**Step 4**: Second Arnoldi iteration (continuing similarly)

This process continues, building the Krylov subspace and minimizing the residual at each step. For a $2 \times 2$ system, GMRES converges in at most 2 iterations.

## Restarted GMRES

The main drawback of full GMRES is that memory and computational cost grow linearly with iteration count. **GMRES(m)**, or restarted GMRES, addresses this by restarting after $m$ iterations:

1. Run GMRES for $m$ iterations
2. Use $x^{(m)}$ as the new starting point
3. Reset the Arnoldi basis and repeat

The restart parameter $m$ is typically chosen between 10 and 50, balancing memory usage against convergence rate. Restarting can slow or even prevent convergence for difficult problems.

## Python Implementation

```python
import numpy as np

def arnoldi(A, v, k):
    """
    Arnoldi iteration to build orthonormal basis for Krylov subspace.

    Parameters:
    -----------
    A : numpy.ndarray
        Coefficient matrix (n x n)
    v : numpy.ndarray
        Initial vector (normalized)
    k : int
        Number of iterations

    Returns:
    --------
    V : numpy.ndarray
        Matrix with orthonormal columns (n x k)
    H : numpy.ndarray
        Upper Hessenberg matrix (k+1 x k)
    """
    n = len(v)
    V = np.zeros((n, k + 1))
    H = np.zeros((k + 1, k))

    V[:, 0] = v

    for j in range(k):
        # Compute w = A * v_j
        w = A @ V[:, j]

        # Modified Gram-Schmidt orthogonalization
        for i in range(j + 1):
            H[i, j] = np.dot(w, V[:, i])
            w = w - H[i, j] * V[:, i]

        # Compute norm and check for breakdown
        H[j + 1, j] = np.linalg.norm(w)
        if H[j + 1, j] < 1e-14:
            # Krylov subspace has become invariant
            return V[:, :j+1], H[:j+1, :j]

        V[:, j + 1] = w / H[j + 1, j]

    return V, H

def gmres(A, b, x0=None, max_iter=None, tol=1e-6, restart=None):
    """
    Solve Ax = b using GMRES or restarted GMRES(m).

    Parameters:
    -----------
    A : numpy.ndarray
        Coefficient matrix (n x n)
    b : numpy.ndarray
        Right-hand side vector (n,)
    x0 : numpy.ndarray, optional
        Initial guess (default: zero vector)
    max_iter : int, optional
        Maximum number of iterations (default: n)
    tol : float
        Convergence tolerance
    restart : int, optional
        Restart parameter for GMRES(m) (default: no restart)

    Returns:
    --------
    x : numpy.ndarray
        Approximate solution
    iterations : int
        Number of iterations performed
    residual_norms : list
        History of residual norms
    """
    n = len(b)
    x = np.zeros(n) if x0 is None else x0.copy()
    max_iter = n if max_iter is None else max_iter
    restart = max_iter if restart is None else restart

    residual_norms = []
    total_iterations = 0

    for cycle in range((max_iter + restart - 1) // restart):
        # Compute initial residual
        r = b - A @ x
        beta = np.linalg.norm(r)
        residual_norms.append(beta)

        if beta < tol:
            return x, total_iterations, residual_norms

        v1 = r / beta

        # Build Krylov subspace using Arnoldi
        k = min(restart, max_iter - total_iterations)
        V, H = arnoldi(A, v1, k)

        # Solve least squares problem: min ||beta*e1 - H*y||
        e1 = np.zeros(H.shape[0])
        e1[0] = beta

        # Use lstsq for robust solution
        y, residuals, rank, s = np.linalg.lstsq(H, e1, rcond=None)

        # Update solution
        x = x + V[:, :len(y)] @ y

        # Update iteration count
        total_iterations += len(y)

        # Compute actual residual norm
        r = b - A @ x
        beta = np.linalg.norm(r)
        residual_norms.append(beta)

        if beta < tol or total_iterations >= max_iter:
            return x, total_iterations, residual_norms

    return x, total_iterations, residual_norms

# Example usage
print("Example 1: Small nonsymmetric system")
A = np.array([[2, 1],
              [1, 3]], dtype=float)
b = np.array([1, 2], dtype=float)

solution, iters, res_norms = gmres(A, b)
print(f"Solution: {solution}")
print(f"Iterations: {iters}")
print(f"Residual norms: {res_norms}")
print(f"Verification Ax: {A @ solution}")
print(f"Expected b: {b}\n")

print("Example 2: Nonsymmetric system")
A_nonsym = np.array([[5, 2, 1],
                     [1, 4, 2],
                     [2, 1, 6]], dtype=float)
b_nonsym = np.array([1, 2, 3], dtype=float)

solution, iters, res_norms = gmres(A_nonsym, b_nonsym)
print(f"Solution: {solution}")
print(f"Iterations: {iters}")
print(f"Final residual: {res_norms[-1]:.2e}\n")

print("Example 3: GMRES with restart")
n = 50
np.random.seed(42)
A_large = np.random.randn(n, n)
b_large = np.random.randn(n)

# Full GMRES
sol_full, iter_full, res_full = gmres(A_large, b_large, tol=1e-8)
print(f"Full GMRES - Iterations: {iter_full}, Final residual: {res_full[-1]:.2e}")

# GMRES(10)
sol_restart, iter_restart, res_restart = gmres(A_large, b_large,
                                                tol=1e-8, restart=10,
                                                max_iter=100)
print(f"GMRES(10) - Iterations: {iter_restart}, Final residual: {res_restart[-1]:.2e}")
```

## Convergence Properties

Unlike CG, GMRES does not have a simple convergence bound in terms of the condition number. Convergence depends on:

1. **Eigenvalue distribution**: Systems with eigenvalues clustered away from zero converge faster
2. **Matrix norm**: Smaller $\|A\|$ generally leads to faster convergence
3. **Right-hand side**: The initial residual's alignment with eigenvectors affects convergence

**Key property**: GMRES residuals are monotonically decreasing (non-increasing):
$$\|r^{(k+1)}\|_2 \leq \|r^{(k)}\|_2$$

This is because GMRES explicitly minimizes the residual at each step.

**Superlinear convergence**: For matrices with a favorable eigenvalue distribution, GMRES often exhibits superlinear convergence after an initial phase.

## Advantages and Disadvantages

**Advantages**:
- Works for general nonsymmetric matrices
- Monotonic residual decrease (no oscillations)
- Optimal in the Krylov subspace (minimizes residual norm)
- Can handle indefinite and non-normal matrices
- Finite termination in exact arithmetic
- Effective for many practical problems

**Disadvantages**:
- Memory grows linearly with iterations (full GMRES)
- Computational cost per iteration increases
- Restarting can slow or prevent convergence
- Choosing restart parameter $m$ requires experimentation
- More complex implementation than simple stationary methods
- May require preconditioning for practical effectiveness

## Key Takeaways

- GMRES extends Krylov subspace methods to nonsymmetric systems
- The method minimizes the residual norm at each iteration (optimal in Krylov subspace)
- Arnoldi process builds orthonormal basis for the Krylov subspace
- Residuals decrease monotonically, unlike some other iterative methods
- Full GMRES has growing memory requirements; restarted GMRES addresses this
- Convergence depends on eigenvalue distribution, not just condition number
- The method requires one matrix-vector product per iteration
- GMRES(m) with $m = 10$ to $50$ is common in practice
- Preconditioning is often essential for difficult problems

## Common Mistakes

**Mistake 1: Using GMRES for SPD matrices instead of CG**
While GMRES works for symmetric positive definite matrices, CG is more efficient for such systems. Use GMRES only when the matrix is nonsymmetric or indefinite.

**Mistake 2: Not restarting for large systems**
Running full GMRES on large systems quickly exhausts memory. Always use GMRES(m) with appropriate restart parameter for problems where $n$ is large.

**Mistake 3: Choosing restart parameter too small**
Setting $m$ too small (e.g., $m = 2$ or $3$) can prevent convergence entirely. Values of $m = 10$ to $50$ are typically effective, though problem-dependent.

**Mistake 4: Ignoring orthogonality loss**
In finite precision, the Arnoldi vectors gradually lose orthogonality. For very long runs without restart, this can degrade convergence. Restarting naturally addresses this issue.

**Mistake 5: Not monitoring actual residual**
The least squares residual (from the Hessenberg system) can diverge from the true residual $\|b - Ax^{(k)}\|$ due to round-off. Periodically compute the actual residual for critical applications.

**Mistake 6: Expecting fast convergence without preconditioning**
For ill-conditioned or highly nonsymmetric systems, unpreconditioned GMRES can be extremely slow. Preconditioning is often necessary for practical convergence rates.
