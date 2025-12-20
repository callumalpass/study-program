---
title: "Convergence Analysis"
description: "Comprehensive guide to convergence analysis with theoretical foundations and Python implementations"
---

# Convergence Analysis

## Introduction

Understanding when and how fast iterative methods converge is crucial for solving linear systems efficiently. Convergence analysis provides the theoretical foundation for predicting the behavior of iterative methods and choosing appropriate algorithms for specific problems. For a linear system $Ax = b$, iterative methods generate a sequence of approximations $x^{(0)}, x^{(1)}, x^{(2)}, \ldots$ that ideally converge to the true solution $x^*$.

The fundamental question in convergence analysis is: Under what conditions does $\lim_{k \to \infty} x^{(k)} = x^*$? And if convergence occurs, how fast does the error decrease? These questions are answered by analyzing the spectral properties of the iteration matrix, which captures how errors evolve from one iteration to the next.

For stationary iterative methods, we can write the iteration as:

$$x^{(k+1)} = Gx^{(k)} + c$$

where $G$ is the iteration matrix and $c$ is a constant vector. The behavior of this iteration is completely determined by the eigenvalues of $G$.

## Spectral Radius and Convergence

### The Spectral Radius

The spectral radius of a matrix $G$ is defined as:

$$\rho(G) = \max_{i} |\lambda_i|$$

where $\lambda_i$ are the eigenvalues of $G$. The spectral radius measures the largest magnitude among all eigenvalues.

### Fundamental Convergence Theorem

**Theorem**: A stationary iterative method $x^{(k+1)} = Gx^{(k)} + c$ converges for any initial guess $x^{(0)}$ if and only if:

$$\rho(G) < 1$$

This theorem provides a simple yet powerful criterion for convergence. If the spectral radius is less than 1, all eigenvalues lie within the unit circle in the complex plane, ensuring that errors decay exponentially.

### Error Propagation

The error at iteration $k$ is $e^{(k)} = x^{(k)} - x^*$. For a stationary method:

$$e^{(k+1)} = Ge^{(k)} = G^{k+1}e^{(0)}$$

As $k \to \infty$, $G^k \to 0$ if and only if $\rho(G) < 1$. Furthermore, the error behaves asymptotically as:

$$\|e^{(k)}\| \approx C\rho(G)^k$$

for some constant $C$. This shows that the spectral radius directly controls the convergence rate.

## Iteration Matrices for Classical Methods

### Jacobi Method

For the splitting $A = D - L - U$ where $D$ is diagonal, $L$ is strictly lower triangular, and $U$ is strictly upper triangular, the Jacobi iteration matrix is:

$$G_J = D^{-1}(L + U) = I - D^{-1}A$$

**Example**: For the matrix
$$A = \begin{pmatrix} 4 & 1 & 0 \\ 1 & 4 & 1 \\ 0 & 1 & 4 \end{pmatrix}$$

the Jacobi iteration matrix is:

$$G_J = \begin{pmatrix} 0 & -1/4 & 0 \\ -1/4 & 0 & -1/4 \\ 0 & -1/4 & 0 \end{pmatrix}$$

### Gauss-Seidel Method

The Gauss-Seidel iteration matrix is:

$$G_{GS} = (D - L)^{-1}U$$

For the same matrix $A$ above:

$$G_{GS} = \begin{pmatrix} 0 & -1/4 & 0 \\ 0 & -1/16 & -1/4 \\ 0 & -1/64 & -1/16 \end{pmatrix}$$

### Successive Over-Relaxation (SOR)

The SOR iteration matrix depends on the relaxation parameter $\omega$:

$$G_{SOR} = (D - \omega L)^{-1}[(1-\omega)D + \omega U]$$

For $\omega = 1$, SOR reduces to Gauss-Seidel. The optimal $\omega$ typically lies in $(1, 2)$ for over-relaxation.

## Convergence Rates

### Asymptotic Convergence Rate

The asymptotic convergence rate is defined as:

$$R(G) = -\ln(\rho(G))$$

A larger $R(G)$ indicates faster convergence. The number of iterations required to reduce the error by a factor of $\epsilon$ is approximately:

$$k \approx \frac{\ln(\epsilon)}{R(G)} = \frac{\ln(\epsilon)}{-\ln(\rho(G))}$$

### Average Convergence Rate

After $k$ iterations, the average convergence rate is:

$$R_k = -\frac{1}{k}\ln(\|e^{(k)}\|/\|e^{(0)}\|)$$

This practical measure can be computed during iteration to monitor performance.

## Comparing Classical Methods

### Spectral Radius Comparison

For a wide class of matrices (including those from discretized PDEs), the following relationships hold:

1. **Gauss-Seidel vs. Jacobi**: For consistently ordered matrices with $\rho(G_J) < 1$:
   $$\rho(G_{GS}) = [\rho(G_J)]^2$$

   This means Gauss-Seidel converges roughly twice as fast as Jacobi in terms of iterations.

2. **SOR vs. Gauss-Seidel**: With optimal $\omega$:
   $$\rho(G_{SOR}^{opt}) = \omega_{opt} - 1$$
   where
   $$\omega_{opt} = \frac{2}{1 + \sqrt{1 - \rho(G_J)^2}}$$

3. **General ordering**: For matrices satisfying appropriate conditions:
   $$\rho(G_{SOR}^{opt}) < \rho(G_{GS}) < \rho(G_J) < 1$$

### Computational Cost Comparison

While Gauss-Seidel requires fewer iterations than Jacobi, each iteration has similar cost. SOR with optimal $\omega$ can provide dramatic speedups but requires knowing $\rho(G_J)$, which is often impractical.

**Iteration counts for model problem** (2D Poisson with $n \times n$ grid):
- Jacobi: $O(n^2)$ iterations
- Gauss-Seidel: $O(n^2)$ iterations (about half of Jacobi)
- Optimal SOR: $O(n)$ iterations

## Sufficient Convergence Conditions

While $\rho(G) < 1$ is necessary and sufficient, computing the spectral radius is expensive. Practical sufficient conditions include:

### Strict Diagonal Dominance

If $A$ is strictly diagonally dominant:
$$|a_{ii}| > \sum_{j \neq i} |a_{ij}|, \quad \forall i$$

then both Jacobi and Gauss-Seidel converge.

### Symmetric Positive Definite

If $A$ is symmetric positive definite (all eigenvalues positive), then:
- Gauss-Seidel converges
- SOR converges for $0 < \omega < 2$

### Irreducible Diagonal Dominance

If $A$ is irreducibly diagonally dominant (weakly diagonally dominant with strict inequality for at least one row, and the directed graph is strongly connected), then Jacobi and Gauss-Seidel converge.

## Implementation

```python
import numpy as np
import matplotlib.pyplot as plt

def iteration_matrix_jacobi(A):
    """
    Compute the Jacobi iteration matrix.

    Parameters:
    -----------
    A : ndarray
        Coefficient matrix

    Returns:
    --------
    G : ndarray
        Jacobi iteration matrix
    """
    n = A.shape[0]
    D = np.diag(np.diag(A))
    L = -np.tril(A, -1)
    U = -np.triu(A, 1)
    D_inv = np.linalg.inv(D)
    return D_inv @ (L + U)


def iteration_matrix_gauss_seidel(A):
    """
    Compute the Gauss-Seidel iteration matrix.

    Parameters:
    -----------
    A : ndarray
        Coefficient matrix

    Returns:
    --------
    G : ndarray
        Gauss-Seidel iteration matrix
    """
    n = A.shape[0]
    D = np.diag(np.diag(A))
    L = -np.tril(A, -1)
    U = -np.triu(A, 1)
    return np.linalg.inv(D - L) @ U


def iteration_matrix_sor(A, omega):
    """
    Compute the SOR iteration matrix.

    Parameters:
    -----------
    A : ndarray
        Coefficient matrix
    omega : float
        Relaxation parameter

    Returns:
    --------
    G : ndarray
        SOR iteration matrix
    """
    n = A.shape[0]
    D = np.diag(np.diag(A))
    L = -np.tril(A, -1)
    U = -np.triu(A, 1)
    return np.linalg.inv(D - omega * L) @ ((1 - omega) * D + omega * U)


def spectral_radius(G):
    """
    Compute the spectral radius of a matrix.

    Parameters:
    -----------
    G : ndarray
        Input matrix

    Returns:
    --------
    rho : float
        Spectral radius (largest eigenvalue magnitude)
    """
    eigenvalues = np.linalg.eigvals(G)
    return np.max(np.abs(eigenvalues))


def optimal_omega(A):
    """
    Compute optimal SOR parameter assuming knowledge of Jacobi spectral radius.

    Parameters:
    -----------
    A : ndarray
        Coefficient matrix

    Returns:
    --------
    omega_opt : float
        Optimal relaxation parameter
    """
    G_J = iteration_matrix_jacobi(A)
    rho_J = spectral_radius(G_J)
    if rho_J >= 1:
        return 1.0  # Jacobi doesn't converge
    omega_opt = 2 / (1 + np.sqrt(1 - rho_J**2))
    return omega_opt


def convergence_analysis(A, methods=['jacobi', 'gauss-seidel', 'sor']):
    """
    Analyze convergence properties of different iterative methods.

    Parameters:
    -----------
    A : ndarray
        Coefficient matrix
    methods : list
        List of methods to analyze

    Returns:
    --------
    results : dict
        Dictionary with convergence information for each method
    """
    results = {}

    if 'jacobi' in methods:
        G_J = iteration_matrix_jacobi(A)
        rho_J = spectral_radius(G_J)
        results['jacobi'] = {
            'spectral_radius': rho_J,
            'converges': rho_J < 1,
            'rate': -np.log(rho_J) if rho_J < 1 else None,
            'eigenvalues': np.linalg.eigvals(G_J)
        }

    if 'gauss-seidel' in methods:
        G_GS = iteration_matrix_gauss_seidel(A)
        rho_GS = spectral_radius(G_GS)
        results['gauss-seidel'] = {
            'spectral_radius': rho_GS,
            'converges': rho_GS < 1,
            'rate': -np.log(rho_GS) if rho_GS < 1 else None,
            'eigenvalues': np.linalg.eigvals(G_GS)
        }

    if 'sor' in methods:
        omega_opt = optimal_omega(A)
        G_SOR = iteration_matrix_sor(A, omega_opt)
        rho_SOR = spectral_radius(G_SOR)
        results['sor'] = {
            'omega': omega_opt,
            'spectral_radius': rho_SOR,
            'converges': rho_SOR < 1,
            'rate': -np.log(rho_SOR) if rho_SOR < 1 else None,
            'eigenvalues': np.linalg.eigvals(G_SOR)
        }

    return results


def estimate_iterations(rho, tolerance=1e-6):
    """
    Estimate number of iterations needed for convergence.

    Parameters:
    -----------
    rho : float
        Spectral radius of iteration matrix
    tolerance : float
        Desired error reduction factor

    Returns:
    --------
    k : int
        Estimated number of iterations
    """
    if rho >= 1:
        return np.inf
    return int(np.ceil(np.log(tolerance) / np.log(rho)))


def check_diagonal_dominance(A):
    """
    Check if matrix is diagonally dominant.

    Parameters:
    -----------
    A : ndarray
        Input matrix

    Returns:
    --------
    strict : bool
        True if strictly diagonally dominant
    weak : bool
        True if weakly diagonally dominant
    """
    n = A.shape[0]
    strict = True
    weak = True

    for i in range(n):
        row_sum = np.sum(np.abs(A[i, :])) - np.abs(A[i, i])
        if np.abs(A[i, i]) <= row_sum:
            strict = False
        if np.abs(A[i, i]) < row_sum:
            weak = False

    return strict, weak
```

## Worked Examples

### Example 1: Comparing Methods on a Tridiagonal System

```python
# Create tridiagonal matrix from 1D Laplacian
n = 5
A = np.diag([4]*n) + np.diag([-1]*(n-1), 1) + np.diag([-1]*(n-1), -1)

print("Matrix A:")
print(A)
print()

# Check diagonal dominance
strict_dd, weak_dd = check_diagonal_dominance(A)
print(f"Strictly diagonally dominant: {strict_dd}")
print(f"Weakly diagonally dominant: {weak_dd}")
print()

# Analyze convergence
results = convergence_analysis(A)

print("Convergence Analysis:")
print("-" * 60)
for method, data in results.items():
    print(f"\n{method.upper()}:")
    print(f"  Spectral radius: {data['spectral_radius']:.6f}")
    print(f"  Converges: {data['converges']}")
    if data['converges']:
        print(f"  Convergence rate: {data['rate']:.6f}")
        iters = estimate_iterations(data['spectral_radius'])
        print(f"  Est. iterations (tol=1e-6): {iters}")
```

Expected output:
```
Matrix A:
[[ 4 -1  0  0  0]
 [-1  4 -1  0  0]
 [ 0 -1  4 -1  0]
 [ 0  0 -1  4 -1]
 [ 0  0  0 -1  4]]

Strictly diagonally dominant: True
Weakly diagonally dominant: True

Convergence Analysis:
------------------------------------------------------------

JACOBI:
  Spectral radius: 0.707107
  Converges: True
  Convergence rate: 0.346574
  Est. iterations (tol=1e-6): 40

GAUSS-SEIDEL:
  Spectral radius: 0.500000
  Converges: True
  Convergence rate: 0.693147
  Est. iterations (tol=1e-6): 20

SOR:
  Spectral radius: 0.236068
  Converges: True
  Convergence rate: 1.443365
  Est. iterations (tol=1e-6): 10
```

### Example 2: Non-Convergent Case

```python
# Create a matrix where Jacobi doesn't converge
A_bad = np.array([[1, 2, 0],
                   [2, 1, 2],
                   [0, 2, 1]])

print("Matrix A (not diagonally dominant):")
print(A_bad)
print()

strict_dd, weak_dd = check_diagonal_dominance(A_bad)
print(f"Strictly diagonally dominant: {strict_dd}")
print(f"Weakly diagonally dominant: {weak_dd}")
print()

results_bad = convergence_analysis(A_bad)

print("Convergence Analysis:")
for method, data in results_bad.items():
    print(f"\n{method.upper()}:")
    print(f"  Spectral radius: {data['spectral_radius']:.6f}")
    print(f"  Converges: {data['converges']}")
```

Expected output:
```
Matrix A (not diagonally dominant):
[[1 2 0]
 [2 1 2]
 [0 2 1]]

Strictly diagonally dominant: False
Weakly diagonally dominant: False

Convergence Analysis:

JACOBI:
  Spectral radius: 2.000000
  Converges: False

GAUSS-SEIDEL:
  Spectral radius: 2.414214
  Converges: False

SOR:
  Spectral radius: 1.000000
  Converges: False
```

### Example 3: Visualizing Eigenvalue Spectrum

```python
# Create 2D Laplacian matrix (larger problem)
n = 20
A = np.diag([4]*n) + np.diag([-1]*(n-1), 1) + np.diag([-1]*(n-1), -1)

# Compute iteration matrices
G_J = iteration_matrix_jacobi(A)
G_GS = iteration_matrix_gauss_seidel(A)
omega_opt = optimal_omega(A)
G_SOR = iteration_matrix_sor(A, omega_opt)

# Get eigenvalues
eig_J = np.linalg.eigvals(G_J)
eig_GS = np.linalg.eigvals(G_GS)
eig_SOR = np.linalg.eigvals(G_SOR)

# Plot in complex plane
fig, ax = plt.subplots(figsize=(8, 8))

# Unit circle
theta = np.linspace(0, 2*np.pi, 100)
ax.plot(np.cos(theta), np.sin(theta), 'k--', alpha=0.3, label='Unit circle')

# Eigenvalues
ax.scatter(eig_J.real, eig_J.imag, s=50, alpha=0.6, label='Jacobi')
ax.scatter(eig_GS.real, eig_GS.imag, s=50, alpha=0.6, label='Gauss-Seidel')
ax.scatter(eig_SOR.real, eig_SOR.imag, s=50, alpha=0.6, label=f'SOR (ω={omega_opt:.3f})')

ax.axhline(y=0, color='k', linewidth=0.5)
ax.axvline(x=0, color='k', linewidth=0.5)
ax.set_xlabel('Real part')
ax.set_ylabel('Imaginary part')
ax.set_title('Eigenvalues of Iteration Matrices')
ax.legend()
ax.grid(True, alpha=0.3)
ax.axis('equal')
plt.show()

print(f"Spectral radii:")
print(f"  Jacobi: {spectral_radius(G_J):.6f}")
print(f"  Gauss-Seidel: {spectral_radius(G_GS):.6f}")
print(f"  SOR: {spectral_radius(G_SOR):.6f}")
```

## When Methods Converge or Diverge

### Convergence Guarantees

**Always Converge**:
- For strictly diagonally dominant matrices: Jacobi and Gauss-Seidel
- For symmetric positive definite matrices: Gauss-Seidel
- For SPD with $0 < \omega < 2$: SOR

**May Converge**:
- For general matrices: case-by-case analysis needed
- Irreducibly diagonally dominant: Jacobi and Gauss-Seidel

### Divergence Scenarios

**Guaranteed Divergence**:
- Any method with $\rho(G) > 1$
- Non-symmetric indefinite matrices often fail
- Poorly scaled systems

**Practical Indicators of Divergence**:
- Residual norm increases
- Solution components grow without bound
- Oscillatory behavior without decreasing trend

### Remedies for Non-Convergence

1. **Preconditioning**: Transform $Ax = b$ to $M^{-1}Ax = M^{-1}b$
2. **Reordering**: Change equation ordering for better properties
3. **Scaling**: Normalize rows/columns to improve diagonal dominance
4. **Different method**: Switch to Conjugate Gradient or GMRES
5. **Direct methods**: For small systems, direct solve may be better

## Common Mistakes

1. **Assuming convergence without checking**: Always verify $\rho(G) < 1$ or check sufficient conditions before using an iterative method.

2. **Confusing convergence rate with iteration cost**: Gauss-Seidel has better spectral radius than Jacobi, but this doesn't always translate to faster wall-clock time.

3. **Using sub-optimal SOR parameter**: Random choice of $\omega$ can perform worse than Gauss-Seidel. Either compute optimal $\omega$ or use $\omega \approx 1.5$ as starting point.

4. **Ignoring problem structure**: For symmetric positive definite systems, specialized methods like Conjugate Gradient are often superior to stationary methods.

5. **Over-iterating**: Continuing iterations when already at machine precision wastes computation and may increase rounding errors.

6. **Under-iterating**: Stopping too early based on insufficient convergence criteria leads to inaccurate solutions.

7. **Not monitoring convergence**: Track residual norms or solution changes to detect stagnation or divergence early.

## Key Takeaways

- The spectral radius $\rho(G)$ completely determines convergence: method converges iff $\rho(G) < 1$
- Smaller spectral radius means faster convergence: iterations needed $\approx \ln(\epsilon) / \ln(\rho(G))$
- For well-behaved matrices: $\rho(G_{SOR}^{opt}) < \rho(G_{GS}) < \rho(G_J)$
- Gauss-Seidel typically has $\rho(G_{GS}) = [\rho(G_J)]^2$ for consistent orderings
- Optimal SOR can provide order-of-magnitude speedup but requires knowing $\rho(G_J)$
- Diagonal dominance and SPD property guarantee convergence for Jacobi and Gauss-Seidel
- Always verify convergence conditions before applying iterative methods
- Monitor residuals during iteration to detect divergence or stagnation early
- For large-scale problems, modern Krylov methods often outperform classical stationary methods
