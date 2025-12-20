---
title: "SOR Method"
description: "Comprehensive guide to sor method with theoretical foundations and Python implementations"
---

# Successive Over-Relaxation (SOR)

## Introduction

Successive Over-Relaxation (SOR) is an enhancement of the Gauss-Seidel method that introduces a relaxation parameter to accelerate convergence. Developed in the 1950s during early work on numerical solutions of partial differential equations, SOR has become one of the most effective classical iterative methods for solving large sparse linear systems. The method's power lies in its ability to significantly outperform Gauss-Seidel when the relaxation parameter is chosen optimally.

The fundamental idea behind SOR is elegant: rather than fully accepting the Gauss-Seidel update, we take a weighted average between the old value and the Gauss-Seidel update. This weighted average, controlled by the relaxation parameter $\omega$, can dramatically accelerate convergence when chosen appropriately. The method encompasses both over-relaxation ($\omega > 1$) and under-relaxation ($\omega < 1$), providing flexibility for different problem types.

## Mathematical Foundation

Starting from the Gauss-Seidel update formula:

$$x_i^{GS} = \frac{1}{a_{ii}}\left(b_i - \sum_{j=1}^{i-1} a_{ij}x_j^{(k+1)} - \sum_{j=i+1}^{n} a_{ij}x_j^{(k)}\right)$$

The SOR method combines this Gauss-Seidel update with the previous value using a relaxation parameter $\omega$:

$$x_i^{(k+1)} = (1 - \omega)x_i^{(k)} + \omega x_i^{GS}$$

Substituting the Gauss-Seidel formula:

$$x_i^{(k+1)} = (1 - \omega)x_i^{(k)} + \frac{\omega}{a_{ii}}\left(b_i - \sum_{j=1}^{i-1} a_{ij}x_j^{(k+1)} - \sum_{j=i+1}^{n} a_{ij}x_j^{(k)}\right)$$

This can be rewritten as:

$$x_i^{(k+1)} = x_i^{(k)} + \frac{\omega}{a_{ii}}\left(b_i - \sum_{j=1}^{i-1} a_{ij}x_j^{(k+1)} - a_{ii}x_i^{(k)} - \sum_{j=i+1}^{n} a_{ij}x_j^{(k)}\right)$$

In matrix form, using the decomposition $A = D + L + U$:

$$x^{(k+1)} = (D + \omega L)^{-1}[(1 - \omega)D - \omega U]x^{(k)} + \omega(D + \omega L)^{-1}b$$

The relaxation parameter $\omega$ determines the method's behavior:
- $\omega = 1$: SOR reduces to Gauss-Seidel
- $0 < \omega < 1$: Under-relaxation (stabilizes divergent iterations)
- $1 < \omega < 2$: Over-relaxation (accelerates convergence)
- $\omega \geq 2$: Method diverges for positive definite matrices

## Convergence Theory

The convergence of SOR depends critically on both the matrix properties and the choice of $\omega$.

**Kahan's Theorem**: A necessary condition for SOR convergence is:

$$0 < \omega < 2$$

**For Symmetric Positive Definite Matrices**: If $A$ is SPD, SOR converges for any $0 < \omega < 2$.

**Optimal Relaxation Parameter**: For certain matrices, particularly those from discretized elliptic PDEs with properties like consistency ordering, the optimal $\omega$ can be computed. For a symmetric positive definite tridiagonal matrix with Jacobi spectral radius $\rho_J$:

$$\omega_{opt} = \frac{2}{1 + \sqrt{1 - \rho_J^2}}$$

This optimal choice can reduce iteration count by an order of magnitude compared to Gauss-Seidel.

**Spectral Radius**: The SOR iteration matrix is:

$$T_{SOR} = (D + \omega L)^{-1}[(1 - \omega)D - \omega U]$$

Convergence requires $\rho(T_{SOR}) < 1$. At the optimal $\omega$, we have:

$$\rho(T_{SOR})(\omega_{opt}) = \omega_{opt} - 1$$

## Choosing the Relaxation Parameter

Selecting $\omega$ is crucial for SOR's effectiveness:

1. **Theoretical Optimal**: Use formula when matrix structure is known (e.g., from 2D Poisson equation)
2. **Empirical Testing**: Try multiple values in range $(1, 2)$ and measure convergence
3. **Adaptive Methods**: Start with $\omega = 1$ and gradually increase
4. **Problem-Specific Heuristics**: Use $\omega \approx 1.5$ to $1.9$ for many PDE problems
5. **Under-relaxation**: Use $\omega < 1$ when Gauss-Seidel diverges

## Worked Example

Solve the system using SOR with $\omega = 1.25$:

$$\begin{cases}
4x_1 + x_2 = 5 \\
x_1 + 4x_2 + x_3 = 6 \\
x_2 + 4x_3 = 7
\end{cases}$$

**Step 1**: Write SOR iteration formulas with $\omega = 1.25$

$$x_1^{(k+1)} = (1 - 1.25)x_1^{(k)} + \frac{1.25}{4}(5 - x_2^{(k)})$$
$$x_1^{(k+1)} = -0.25x_1^{(k)} + 0.3125(5 - x_2^{(k)})$$

$$x_2^{(k+1)} = -0.25x_2^{(k)} + 0.3125(6 - x_1^{(k+1)} - x_3^{(k)})$$

$$x_3^{(k+1)} = -0.25x_3^{(k)} + 0.3125(7 - x_2^{(k+1)})$$

**Step 2**: Iterate from $x^{(0)} = (0, 0, 0)^T$

*Iteration 1*:
- $x_1^{(1)} = -0.25(0) + 0.3125(5 - 0) = 1.5625$
- $x_2^{(1)} = -0.25(0) + 0.3125(6 - 1.5625 - 0) = 1.3867$
- $x_3^{(1)} = -0.25(0) + 0.3125(7 - 1.3867) = 1.7542$

*Iteration 2*:
- $x_1^{(2)} = -0.25(1.5625) + 0.3125(5 - 1.3867) = 0.7385$
- $x_2^{(2)} = -0.25(1.3867) + 0.3125(6 - 0.7385 - 1.7542) = 1.0127$
- $x_3^{(2)} = -0.25(1.7542) + 0.3125(7 - 1.0127) = 1.4328$

*Iteration 3*:
- $x_1^{(3)} = -0.25(0.7385) + 0.3125(5 - 1.0127) = 1.0618$
- $x_2^{(3)} = -0.25(1.0127) + 0.3125(6 - 1.0618 - 1.4328) = 0.8490$
- $x_3^{(3)} = -0.25(1.4328) + 0.3125(7 - 0.8490) = 1.5641$

Continuing iterations converges to $x \approx (0.9286, 1.0714, 1.5179)^T$.

For comparison, Gauss-Seidel ($\omega = 1$) would require approximately 15 iterations, while SOR with $\omega = 1.25$ converges in about 8 iterations, demonstrating the acceleration effect.

## Python Implementation

```python
import numpy as np

def sor(A, b, omega, x0=None, max_iter=100, tol=1e-6):
    """
    Solve Ax = b using Successive Over-Relaxation (SOR).

    Parameters:
    -----------
    A : numpy.ndarray
        Coefficient matrix (n x n)
    b : numpy.ndarray
        Right-hand side vector (n,)
    omega : float
        Relaxation parameter (0 < omega < 2)
    x0 : numpy.ndarray, optional
        Initial guess (default: zero vector)
    max_iter : int
        Maximum number of iterations
    tol : float
        Convergence tolerance

    Returns:
    --------
    x : numpy.ndarray
        Approximate solution
    iterations : int
        Number of iterations performed
    """
    n = len(b)
    x = np.zeros(n) if x0 is None else x0.copy()

    # Validate omega
    if omega <= 0 or omega >= 2:
        raise ValueError("Relaxation parameter must satisfy 0 < omega < 2")

    # Check for zero diagonal elements
    if np.any(np.diag(A) == 0):
        raise ValueError("Matrix has zero diagonal elements")

    for iteration in range(max_iter):
        x_old = x.copy()

        for i in range(n):
            # Compute Gauss-Seidel update
            sum_val = 0.0
            for j in range(n):
                if j != i:
                    sum_val += A[i, j] * x[j]

            # SOR update: weighted average of old value and GS update
            x_gs = (b[i] - sum_val) / A[i, i]
            x[i] = (1 - omega) * x_old[i] + omega * x_gs

        # Check convergence
        if np.linalg.norm(x - x_old, ord=np.inf) < tol:
            return x, iteration + 1

    print(f"Warning: Maximum iterations ({max_iter}) reached")
    return x, max_iter

def find_optimal_omega(A, num_trials=20):
    """
    Empirically find good omega value by testing multiple candidates.

    Parameters:
    -----------
    A : numpy.ndarray
        Coefficient matrix
    num_trials : int
        Number of omega values to test

    Returns:
    --------
    omega_best : float
        Best omega value found
    """
    b = np.ones(A.shape[0])  # Test right-hand side
    omega_values = np.linspace(1.0, 1.95, num_trials)
    iteration_counts = []

    for omega in omega_values:
        try:
            _, iters = sor(A, b, omega, max_iter=1000, tol=1e-10)
            iteration_counts.append(iters)
        except:
            iteration_counts.append(float('inf'))

    best_idx = np.argmin(iteration_counts)
    return omega_values[best_idx]

# Example usage
A = np.array([[4, 1, 0],
              [1, 4, 1],
              [0, 1, 4]], dtype=float)
b = np.array([5, 6, 7], dtype=float)

# Try different omega values
print("Comparison of different omega values:\n")
for omega in [0.8, 1.0, 1.1, 1.25, 1.5, 1.8]:
    try:
        solution, iters = sor(A, b, omega)
        print(f"omega = {omega:.2f}: {iters:3d} iterations, "
              f"solution = {solution}")
    except Exception as e:
        print(f"omega = {omega:.2f}: {e}")

# Find and use optimal omega
print("\nFinding optimal omega...")
omega_opt = find_optimal_omega(A)
print(f"Optimal omega: {omega_opt:.4f}")

solution, iters = sor(A, b, omega_opt)
print(f"Solution with optimal omega: {solution}")
print(f"Iterations: {iters}")
print(f"Verification Ax: {A @ solution}")
print(f"Expected b: {b}")
```

## Advantages and Disadvantages

**Advantages**:
- Can converge much faster than Gauss-Seidel with optimal $\omega$
- Flexible: can use over-relaxation or under-relaxation as needed
- Reduces to Gauss-Seidel when $\omega = 1$
- Effective for problems from elliptic PDEs
- Relatively simple to implement

**Disadvantages**:
- Requires choosing relaxation parameter $\omega$
- Optimal $\omega$ may be difficult to determine
- Poor choice of $\omega$ can slow convergence or cause divergence
- Still inherently sequential like Gauss-Seidel
- Sensitivity to $\omega$ varies with problem structure
- May not converge for non-symmetric or indefinite systems

## Key Takeaways

- SOR extends Gauss-Seidel by introducing a relaxation parameter $\omega$
- The optimal $\omega$ typically lies in the range $(1, 2)$ for over-relaxation
- With optimal $\omega$, SOR can be 5-10 times faster than Gauss-Seidel
- For SPD matrices, convergence is guaranteed when $0 < \omega < 2$
- The optimal relaxation parameter can be computed for certain matrix structures
- Under-relaxation ($\omega < 1$) can stabilize divergent iterations
- Method is particularly effective for discretized elliptic PDEs
- Trade-off between implementation simplicity and parameter tuning complexity

## Common Mistakes

**Mistake 1: Using $\omega$ outside valid range**
Setting $\omega \geq 2$ causes divergence for positive definite matrices, while $\omega \leq 0$ is mathematically invalid. Always ensure $0 < \omega < 2$ and test convergence.

**Mistake 2: Assuming optimal $\omega$ is always near 1.5**
While $\omega \approx 1.5$ works for many problems, the optimal value is problem-dependent. Some matrices benefit from $\omega$ close to 1, others near 2. Always validate your choice.

**Mistake 3: Not testing convergence with chosen $\omega$**
Blindly using a fixed $\omega$ without verifying convergence can lead to divergence or very slow convergence. Monitor residuals and iteration counts when testing different values.

**Mistake 4: Incorrect update formula**
A common error is computing $x_i^{(k+1)} = \omega x_i^{GS}$ instead of the correct weighted average $(1 - \omega)x_i^{(k)} + \omega x_i^{GS}$. This changes the method's behavior entirely.

**Mistake 5: Using SOR for unsuitable matrices**
SOR may not be effective for highly non-symmetric or indefinite matrices. Check matrix properties before choosing SOR over other methods.

**Mistake 6: Ignoring the relation to Gauss-Seidel**
Forgetting that SOR reduces to Gauss-Seidel when $\omega = 1$ can lead to duplicate implementations. Use a single SOR implementation with $\omega$ as a parameter.
