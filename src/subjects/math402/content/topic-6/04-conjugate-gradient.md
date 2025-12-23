---
title: "Conjugate Gradient"
description: "Comprehensive guide to conjugate gradient with theoretical foundations and Python implementations"
---

# Conjugate Gradient Method

## Introduction

The following diagram illustrates the conjugate gradient algorithm:

```mermaid
flowchart TD
    A["Initialize: x⁽⁰⁾, r⁽⁰⁾ = b - Ax⁽⁰⁾, p⁽⁰⁾ = r⁽⁰⁾"] --> B[k = 0]
    B --> C{||r⁽ᵏ⁾|| < tol?}
    C -->|Yes| D[Return x⁽ᵏ⁾]
    C -->|No| E["Compute α_k = (r⁽ᵏ⁾ᵀr⁽ᵏ⁾)/(p⁽ᵏ⁾ᵀAp⁽ᵏ⁾)"]
    E --> F["x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ + α_k p⁽ᵏ⁾"]
    F --> G["r⁽ᵏ⁺¹⁾ = r⁽ᵏ⁾ - α_k Ap⁽ᵏ⁾"]
    G --> H["β_k = (r⁽ᵏ⁺¹⁾ᵀr⁽ᵏ⁺¹⁾)/(r⁽ᵏ⁾ᵀr⁽ᵏ⁾)"]
    H --> I["p⁽ᵏ⁺¹⁾ = r⁽ᵏ⁺¹⁾ + β_k p⁽ᵏ⁾"]
    I --> J[k = k + 1]
    J --> C
```

The following shows the quadratic function $f(x) = \frac{1}{2}x^T A x - b^T x$ that CG minimizes:

```plot
{
  "xAxis": { "domain": [-2, 4] },
  "yAxis": { "domain": [-5, 15] },
  "grid": true,
  "data": [
    { "fn": "0.5*x^2 - 2*x + 3", "color": "#3b82f6" }
  ]
}
```

This shows a 1D quadratic with minimum at $x = 2$. In higher dimensions, CG moves along conjugate directions to efficiently reach the minimum.

The Conjugate Gradient (CG) method is one of the most important iterative algorithms for solving large-scale systems of linear equations. Developed by Magnus Hestenes and Eduard Stiefel in the 1950s, this method represents a significant departure from classical iterative methods like Jacobi and Gauss-Seidel. Rather than being a simple fixed-point iteration, CG is based on optimization theory and generates search directions that are mutually conjugate with respect to the coefficient matrix.

The method is specifically designed for systems where the coefficient matrix is symmetric positive definite (SPD). For such systems, solving $Ax = b$ is equivalent to minimizing the quadratic function $f(x) = \frac{1}{2}x^T A x - b^T x$. The CG method efficiently minimizes this function by moving along carefully chosen conjugate directions. Remarkably, in exact arithmetic, CG converges to the exact solution in at most $n$ iterations for an $n \times n$ system, making it a direct method in theory but typically used as an iterative method in practice.

## Mathematical Foundation

For a symmetric positive definite matrix $A$, consider the quadratic form:

$$f(x) = \frac{1}{2}x^T A x - b^T x$$

The gradient of this function is:

$$\nabla f(x) = Ax - b$$

At the minimum, $\nabla f(x) = 0$, which gives $Ax = b$. Thus, solving the linear system is equivalent to minimizing $f(x)$.

The CG method generates a sequence of approximations $x^{(0)}, x^{(1)}, \ldots$ by moving along conjugate directions $p^{(0)}, p^{(1)}, \ldots$. Two vectors $p$ and $q$ are said to be **A-conjugate** (or conjugate with respect to $A$) if:

$$p^T A q = 0$$

The key properties of the CG method are:

1. **Residual**: $r^{(k)} = b - Ax^{(k)}$ is the residual at iteration $k$
2. **Search direction**: $p^{(k)}$ is the conjugate direction at iteration $k$
3. **Update formulas**:

$$x^{(k+1)} = x^{(k)} + \alpha_k p^{(k)}$$

where the step size is:

$$\alpha_k = \frac{(r^{(k)})^T r^{(k)}}{(p^{(k)})^T A p^{(k)}}$$

The residual is updated as:

$$r^{(k+1)} = r^{(k)} - \alpha_k A p^{(k)}$$

And the new search direction is:

$$p^{(k+1)} = r^{(k+1)} + \beta_k p^{(k)}$$

where:

$$\beta_k = \frac{(r^{(k+1)})^T r^{(k+1)}}{(r^{(k)})^T r^{(k)}}$$

## Theoretical Properties

The CG method has remarkable theoretical properties:

**Finite Termination**: In exact arithmetic, CG terminates in at most $n$ iterations for an $n \times n$ system.

**Conjugate Directions**: The search directions satisfy:
$$(p^{(i)})^T A p^{(j)} = 0 \quad \text{for } i \neq j$$

**Orthogonal Residuals**: The residuals satisfy:
$$(r^{(i)})^T r^{(j)} = 0 \quad \text{for } i \neq j$$

**Krylov Subspace**: The iterate $x^{(k)}$ lies in the affine Krylov subspace:
$$x^{(k)} \in x^{(0)} + \mathcal{K}_k(A, r^{(0)})$$
where $\mathcal{K}_k(A, r^{(0)}) = \text{span}\{r^{(0)}, Ar^{(0)}, A^2r^{(0)}, \ldots, A^{k-1}r^{(0)}\}$

**Optimality**: At iteration $k$, $x^{(k)}$ minimizes $f(x)$ over $x^{(0)} + \mathcal{K}_k(A, r^{(0)})$.

## Convergence Rate

The convergence of CG depends on the condition number $\kappa(A) = \lambda_{\max}/\lambda_{\min}$ of the matrix:

$$\|x - x^{(k)}\|_A \leq 2\left(\frac{\sqrt{\kappa(A)} - 1}{\sqrt{\kappa(A)} + 1}\right)^k \|x - x^{(0)}\|_A$$

where $\|y\|_A = \sqrt{y^T A y}$ is the A-norm.

This bound shows that:
- Well-conditioned matrices ($\kappa(A) \approx 1$) converge very rapidly
- Ill-conditioned matrices ($\kappa(A) \gg 1$) converge slowly
- Preconditioning can dramatically improve convergence by reducing $\kappa(A)$

## Worked Example

Solve the system using the Conjugate Gradient method:

$$A = \begin{bmatrix} 4 & 1 \\ 1 & 3 \end{bmatrix}, \quad b = \begin{bmatrix} 1 \\ 2 \end{bmatrix}$$

**Step 1**: Verify that $A$ is symmetric positive definite
- $A$ is symmetric: $A = A^T$ ✓
- Eigenvalues: $\lambda_1 \approx 4.303$, $\lambda_2 \approx 2.697$ (both positive) ✓

**Step 2**: Initialize with $x^{(0)} = (0, 0)^T$

$$r^{(0)} = b - Ax^{(0)} = \begin{bmatrix} 1 \\ 2 \end{bmatrix}$$

$$p^{(0)} = r^{(0)} = \begin{bmatrix} 1 \\ 2 \end{bmatrix}$$

**Step 3**: Iteration 1

Compute $Ap^{(0)}$:
$$Ap^{(0)} = \begin{bmatrix} 4 & 1 \\ 1 & 3 \end{bmatrix} \begin{bmatrix} 1 \\ 2 \end{bmatrix} = \begin{bmatrix} 6 \\ 7 \end{bmatrix}$$

Compute step size:
$$\alpha_0 = \frac{(r^{(0)})^T r^{(0)}}{(p^{(0)})^T A p^{(0)}} = \frac{1^2 + 2^2}{1 \cdot 6 + 2 \cdot 7} = \frac{5}{20} = 0.25$$

Update solution:
$$x^{(1)} = x^{(0)} + \alpha_0 p^{(0)} = \begin{bmatrix} 0 \\ 0 \end{bmatrix} + 0.25 \begin{bmatrix} 1 \\ 2 \end{bmatrix} = \begin{bmatrix} 0.25 \\ 0.50 \end{bmatrix}$$

Update residual:
$$r^{(1)} = r^{(0)} - \alpha_0 A p^{(0)} = \begin{bmatrix} 1 \\ 2 \end{bmatrix} - 0.25 \begin{bmatrix} 6 \\ 7 \end{bmatrix} = \begin{bmatrix} -0.5 \\ 0.25 \end{bmatrix}$$

Compute $\beta_0$:
$$\beta_0 = \frac{(r^{(1)})^T r^{(1)}}{(r^{(0)})^T r^{(0)}} = \frac{(-0.5)^2 + 0.25^2}{1^2 + 2^2} = \frac{0.3125}{5} = 0.0625$$

Update search direction:
$$p^{(1)} = r^{(1)} + \beta_0 p^{(0)} = \begin{bmatrix} -0.5 \\ 0.25 \end{bmatrix} + 0.0625 \begin{bmatrix} 1 \\ 2 \end{bmatrix} = \begin{bmatrix} -0.4375 \\ 0.375 \end{bmatrix}$$

**Step 4**: Iteration 2

Compute $Ap^{(1)}$:
$$Ap^{(1)} = \begin{bmatrix} 4 & 1 \\ 1 & 3 \end{bmatrix} \begin{bmatrix} -0.4375 \\ 0.375 \end{bmatrix} = \begin{bmatrix} -1.375 \\ 0.6875 \end{bmatrix}$$

Compute step size:
$$\alpha_1 = \frac{0.3125}{(-0.4375)(-1.375) + (0.375)(0.6875)} = \frac{0.3125}{0.8594} \approx 0.3636$$

Update solution:
$$x^{(2)} = \begin{bmatrix} 0.25 \\ 0.50 \end{bmatrix} + 0.3636 \begin{bmatrix} -0.4375 \\ 0.375 \end{bmatrix} = \begin{bmatrix} 0.0909 \\ 0.6364 \end{bmatrix}$$

Update residual:
$$r^{(2)} = \begin{bmatrix} -0.5 \\ 0.25 \end{bmatrix} - 0.3636 \begin{bmatrix} -1.375 \\ 0.6875 \end{bmatrix} \approx \begin{bmatrix} 0 \\ 0 \end{bmatrix}$$

The method has converged (as expected in 2 iterations for a $2 \times 2$ system). The solution is $x \approx (0.0909, 0.6364)^T$ or exactly $x = (1/11, 7/11)^T$.

## Python Implementation

```python
import numpy as np

def conjugate_gradient(A, b, x0=None, max_iter=None, tol=1e-6):
    """
    Solve Ax = b using the Conjugate Gradient method.

    Parameters:
    -----------
    A : numpy.ndarray
        Symmetric positive definite coefficient matrix (n x n)
    b : numpy.ndarray
        Right-hand side vector (n,)
    x0 : numpy.ndarray, optional
        Initial guess (default: zero vector)
    max_iter : int, optional
        Maximum number of iterations (default: n)
    tol : float
        Convergence tolerance

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

    # Check symmetry
    if not np.allclose(A, A.T):
        raise ValueError("Matrix must be symmetric")

    # Initial residual and search direction
    r = b - A @ x
    p = r.copy()

    # Store initial residual norm
    residual_norms = [np.linalg.norm(r)]
    r_dot_r = np.dot(r, r)

    for iteration in range(max_iter):
        # Check convergence
        if np.sqrt(r_dot_r) < tol:
            return x, iteration, residual_norms

        # Compute A * p
        Ap = A @ p

        # Compute step size alpha
        p_dot_Ap = np.dot(p, Ap)
        if abs(p_dot_Ap) < 1e-14:
            print("Warning: Division by near-zero in alpha computation")
            return x, iteration, residual_norms

        alpha = r_dot_r / p_dot_Ap

        # Update solution and residual
        x = x + alpha * p
        r = r - alpha * Ap

        # Store new residual norm
        r_dot_r_new = np.dot(r, r)
        residual_norms.append(np.sqrt(r_dot_r_new))

        # Compute beta and update search direction
        beta = r_dot_r_new / r_dot_r
        p = r + beta * p

        # Update r_dot_r for next iteration
        r_dot_r = r_dot_r_new

    print(f"Warning: Maximum iterations ({max_iter}) reached")
    return x, max_iter, residual_norms

# Example usage
A = np.array([[4, 1],
              [1, 3]], dtype=float)
b = np.array([1, 2], dtype=float)

print("Example 1: Small 2x2 system")
solution, iters, res_norms = conjugate_gradient(A, b)
print(f"Solution: {solution}")
print(f"Iterations: {iters}")
print(f"Residual norms: {res_norms}")
print(f"Verification Ax: {A @ solution}")
print(f"Expected b: {b}\n")

# Larger example
print("Example 2: Larger SPD system")
n = 50
# Create symmetric positive definite matrix
np.random.seed(42)
L = np.random.randn(n, n)
A_large = L @ L.T + 5 * np.eye(n)  # Ensure positive definite
b_large = np.random.randn(n)

solution, iters, res_norms = conjugate_gradient(A_large, b_large, tol=1e-10)
print(f"System size: {n}x{n}")
print(f"Iterations: {iters}")
print(f"Final residual: {res_norms[-1]:.2e}")
print(f"Condition number: {np.linalg.cond(A_large):.2f}")

# Verify solution
error = np.linalg.norm(A_large @ solution - b_large)
print(f"Verification error: {error:.2e}")
```

## Advantages and Disadvantages

**Advantages**:
- Theoretically converges in at most $n$ iterations (exact arithmetic)
- No matrix factorization required
- Only needs matrix-vector products (good for sparse matrices)
- Memory efficient: only stores a few vectors
- Convergence rate depends on condition number, not matrix size
- Can be stopped early for acceptable approximate solutions
- Easily adapted to use with preconditioners

**Disadvantages**:
- Only works for symmetric positive definite matrices
- Convergence can be slow for ill-conditioned systems
- Finite-precision arithmetic degrades theoretical properties
- Requires matrix-vector product computation each iteration
- May need preconditioning for practical effectiveness
- More complex to implement than simple stationary methods

## Key Takeaways

- CG is an optimization-based method for symmetric positive definite systems
- The method generates conjugate search directions that minimize a quadratic function
- Theoretical convergence in $n$ iterations makes it a hybrid direct/iterative method
- Convergence rate depends on the condition number $\kappa(A)$
- Well-conditioned systems converge very rapidly (often in $\ll n$ iterations)
- Memory requirement is $O(n)$, storing only a few vectors
- Each iteration costs one matrix-vector product plus $O(n)$ vector operations
- Preconditioning is often essential for practical problems
- The method is optimal in the Krylov subspace at each iteration

## Common Mistakes

**Mistake 1: Using CG for non-SPD matrices**
The most common error is applying CG to matrices that are not symmetric positive definite. This can lead to numerical instability, breakdown (division by zero), or nonsensical results. Always verify matrix properties before using CG.

**Mistake 2: Computing $Ax^{(k)}$ to get $r^{(k)}$**
Computing the residual as $r^{(k)} = b - Ax^{(k)}$ at each iteration wastes computation and accumulates round-off error. Instead, update the residual using $r^{(k+1)} = r^{(k)} - \alpha_k A p^{(k)}$.

**Mistake 3: Recomputing dot products unnecessarily**
The value $(r^{(k)})^T r^{(k)}$ is computed when calculating $\beta_{k-1}$. Storing this value and reusing it when computing $\alpha_k$ saves computation.

**Mistake 4: Expecting exact $n$-iteration convergence in practice**
While theory guarantees convergence in $n$ iterations, finite-precision arithmetic degrades this property. In practice, residuals may not decrease monotonically, and the method is best used as an iterative solver stopped early.

**Mistake 5: Not using preconditioning for ill-conditioned systems**
For systems with large condition numbers, CG without preconditioning can be excruciatingly slow. Preconditioning is often essential to achieve practical convergence rates.

**Mistake 6: Incorrect $\beta$ calculation**
Computing $\beta_k = (r^{(k+1)})^T r^{(k+1)} / (r^{(k)})^T r^{(k)}$ requires the old residual norm squared. A common bug is using an incorrect or outdated value, which destroys the conjugacy property and causes failure.
