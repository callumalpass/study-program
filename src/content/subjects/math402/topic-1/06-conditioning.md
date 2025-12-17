---
title: "Conditioning of Problems"
description: "Understanding problem conditioning, condition numbers, and their impact on numerical solution accuracy"
---

# Conditioning of Problems

Conditioning describes the sensitivity of a mathematical problem to perturbations in input data. A well-conditioned problem has solutions that change little with small input changes, while ill-conditioned problems amplify input errors significantly.

## Condition Number Definition

For a problem $f: X \to Y$, the **relative condition number** is:

$$\kappa = \lim_{\delta \to 0} \sup_{\|\Delta x\| \leq \delta \|x\|} \frac{\|f(x + \Delta x) - f(x)\| / \|f(x)\|}{\|\Delta x\| / \|x\|}$$

For differentiable scalar functions:

$$\kappa(x) = \left|\frac{x f'(x)}{f(x)}\right|$$

**Interpretation**:
- $\kappa \approx 1$: Well-conditioned
- $\kappa \approx 10^k$: Lose about $k$ digits of accuracy
- $\kappa \to \infty$: Ill-conditioned

```python
import numpy as np
import matplotlib.pyplot as plt

def condition_number_scalar(f, f_prime, x):
    """Compute relative condition number for scalar function."""
    f_val = f(x)
    if abs(f_val) < 1e-15:
        return float('inf')
    return abs(x * f_prime(x) / f_val)

# Examples
functions = [
    (lambda x: x**2, lambda x: 2*x, "f(x) = x²"),
    (lambda x: np.sqrt(x), lambda x: 0.5/np.sqrt(x), "f(x) = √x"),
    (lambda x: np.exp(x), lambda x: np.exp(x), "f(x) = eˣ"),
    (lambda x: np.log(x), lambda x: 1/x, "f(x) = ln(x)"),
    (lambda x: np.sin(x), lambda x: np.cos(x), "f(x) = sin(x)"),
]

x_range = np.linspace(0.1, 5, 100)

plt.figure(figsize=(12, 6))
for f, f_prime, name in functions:
    kappa_values = [condition_number_scalar(f, f_prime, x) for x in x_range]
    plt.semilogy(x_range, kappa_values, label=name, linewidth=2)

plt.xlabel('x')
plt.ylabel('Condition Number κ(x)')
plt.title('Condition Numbers of Elementary Functions')
plt.legend()
plt.grid(True, alpha=0.3)
plt.ylim([0.1, 1000])
plt.savefig('scalar_condition_numbers.png', dpi=150, bbox_inches='tight')
plt.close()

print("Condition number analysis saved to scalar_condition_numbers.png")
```

## Matrix Condition Numbers

For matrix problems $Ax = b$, the condition number is:

$$\kappa(A) = \|A\| \cdot \|A^{-1}\|$$

Common norms:
- $\|A\|_1 = \max_j \sum_i |a_{ij}|$ (maximum absolute column sum)
- $\|A\|_\infty = \max_i \sum_j |a_{ij}|$ (maximum absolute row sum)
- $\|A\|_2 = \sqrt{\lambda_{\max}(A^T A)}$ (spectral norm)

For the 2-norm:

$$\kappa_2(A) = \frac{\sigma_{\max}(A)}{\sigma_{\min}(A)}$$

where $\sigma$ denotes singular values.

### Properties

1. $\kappa(A) \geq 1$ for any matrix
2. $\kappa(A) = \kappa(A^{-1})$
3. $\kappa(cA) = \kappa(A)$ for any scalar $c \neq 0$
4. $\kappa(A) = 1$ if and only if $A$ is a scaled orthogonal matrix

```python
def analyze_matrix_conditioning(A, name="Matrix"):
    """Comprehensive conditioning analysis for a matrix."""
    print(f"\n{name}:")
    print(f"Matrix:\n{A}\n")

    # Condition numbers in different norms
    try:
        kappa_2 = np.linalg.cond(A, 2)
        kappa_1 = np.linalg.cond(A, 1)
        kappa_inf = np.linalg.cond(A, np.inf)

        print(f"Condition numbers:")
        print(f"  κ₂ (spectral): {kappa_2:.2e}")
        print(f"  κ₁: {kappa_1:.2e}")
        print(f"  κ∞: {kappa_inf:.2e}")

        # Singular values
        U, sigma, Vt = np.linalg.svd(A)
        print(f"\nSingular values: {sigma}")
        print(f"Ratio σ_max/σ_min: {sigma[0]/sigma[-1]:.2e}")

        # Determinant
        det = np.linalg.det(A)
        print(f"\nDeterminant: {det:.2e}")

        # Assess conditioning
        if kappa_2 < 10:
            assessment = "Well-conditioned"
        elif kappa_2 < 1000:
            assessment = "Moderately conditioned"
        elif kappa_2 < 1e6:
            assessment = "Ill-conditioned"
        else:
            assessment = "Severely ill-conditioned"

        print(f"\nAssessment: {assessment}")

    except np.linalg.LinAlgError:
        print("Matrix is singular or nearly singular")

# Example 1: Well-conditioned matrix
A_good = np.array([[4, 1], [1, 3]], dtype=float)
analyze_matrix_conditioning(A_good, "Well-conditioned Example")

# Example 2: Ill-conditioned matrix
A_bad = np.array([[1, 1], [1, 1+1e-10]], dtype=float)
analyze_matrix_conditioning(A_bad, "Ill-conditioned Example")

# Example 3: Hilbert matrix (famously ill-conditioned)
n = 5
A_hilbert = np.array([[1/(i+j+1) for j in range(n)] for i in range(n)], dtype=float)
analyze_matrix_conditioning(A_hilbert, f"Hilbert Matrix ({n}×{n})")
```

## Impact of Conditioning on Solutions

For linear system $Ax = b$:

$$\frac{\|\Delta x\|}{\|x\|} \leq \kappa(A) \frac{\|\Delta b\|}{\|b\|}$$

Small perturbations in $b$ can cause large changes in $x$ if $\kappa(A)$ is large.

```python
def demonstrate_conditioning_impact():
    """Show how conditioning affects solution accuracy."""
    # Well-conditioned system
    A_good = np.array([[4, 1], [1, 3]], dtype=float)
    b_good = np.array([1, 2], dtype=float)

    # Ill-conditioned system
    eps = 1e-10
    A_bad = np.array([[1, 1], [1, 1+eps]], dtype=float)
    b_bad = np.array([2, 2+eps], dtype=float)

    for A, b, name in [(A_good, b_good, "Well-conditioned"),
                        (A_bad, b_bad, "Ill-conditioned")]:
        print(f"\n{name} System:")
        print(f"Condition number: {np.linalg.cond(A):.2e}\n")

        # Exact solution
        x_exact = np.linalg.solve(A, b)
        print(f"Exact solution: {x_exact}")

        # Perturb right-hand side slightly
        perturbations = [1e-10, 1e-8, 1e-6, 1e-4]

        print(f"\n{'Perturbation':<15} {'Rel. Change b':<15} {'Rel. Change x':<15} {'Amplification'}")
        print("=" * 65)

        for delta in perturbations:
            b_perturbed = b + delta
            x_perturbed = np.linalg.solve(A, b_perturbed)

            rel_change_b = np.linalg.norm(b_perturbed - b) / np.linalg.norm(b)
            rel_change_x = np.linalg.norm(x_perturbed - x_exact) / np.linalg.norm(x_exact)

            amplification = rel_change_x / rel_change_b if rel_change_b > 0 else 0

            print(f"{delta:<15.2e} {rel_change_b:<15.2e} {rel_change_x:<15.2e} {amplification:<15.2f}")

demonstrate_conditioning_impact()
```

## Sources of Ill-Conditioning

### 1. Nearly Linearly Dependent Columns

```python
def demonstrate_dependency_conditioning():
    """Show how linear dependence affects conditioning."""
    angles = np.linspace(0.1, 89.9, 50)  # Angle between two vectors
    condition_numbers = []

    for theta_deg in angles:
        theta = np.radians(theta_deg)
        # Two unit vectors with angle theta between them
        v1 = np.array([1, 0])
        v2 = np.array([np.cos(theta), np.sin(theta)])
        A = np.column_stack([v1, v2])

        kappa = np.linalg.cond(A)
        condition_numbers.append(kappa)

    plt.figure(figsize=(10, 6))
    plt.semilogy(angles, condition_numbers, 'b-', linewidth=2)
    plt.xlabel('Angle between columns (degrees)')
    plt.ylabel('Condition Number')
    plt.title('Conditioning vs. Column Dependency')
    plt.grid(True, alpha=0.3)
    plt.savefig('dependency_conditioning.png', dpi=150, bbox_inches='tight')
    plt.close()

    print("Conditioning vs. dependency plot saved")

demonstrate_dependency_conditioning()
```

### 2. Extreme Scaling

```python
def demonstrate_scaling_conditioning():
    """Show how poor scaling affects conditioning."""
    scales = np.logspace(-10, 10, 50)
    condition_numbers = []

    for scale in scales:
        A = np.array([[1, 0], [0, scale]], dtype=float)
        kappa = np.linalg.cond(A)
        condition_numbers.append(kappa)

    plt.figure(figsize=(10, 6))
    plt.loglog(scales, condition_numbers, 'r-', linewidth=2)
    plt.xlabel('Scaling Factor')
    plt.ylabel('Condition Number')
    plt.title('Conditioning vs. Matrix Scaling')
    plt.grid(True, alpha=0.3)
    plt.savefig('scaling_conditioning.png', dpi=150, bbox_inches='tight')
    plt.close()

    print("Scaling conditioning plot saved")

demonstrate_scaling_conditioning()
```

### 3. Discretization and Mesh Size

Finer discretizations often increase conditioning:

```python
def discretization_conditioning():
    """Analyze conditioning of finite difference matrices."""
    sizes = range(5, 101, 5)
    condition_numbers = []

    for n in sizes:
        # 1D Laplacian: -d²u/dx² discretized
        A = (n+1)**2 * (2*np.eye(n) - np.eye(n, k=1) - np.eye(n, k=-1))
        kappa = np.linalg.cond(A)
        condition_numbers.append(kappa)

    plt.figure(figsize=(10, 6))
    plt.loglog(sizes, condition_numbers, 'go-', linewidth=2, markersize=5)

    # Theoretical: κ(A) ≈ O(n²)
    plt.loglog(sizes, np.array(sizes)**2 * 4 / np.pi**2, 'k--',
               label='Theoretical O(n²)', linewidth=2)

    plt.xlabel('Matrix Size n')
    plt.ylabel('Condition Number')
    plt.title('Conditioning of 1D Laplacian vs. Grid Size')
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.savefig('discretization_conditioning.png', dpi=150, bbox_inches='tight')
    plt.close()

    print("Discretization conditioning analysis saved")
    print(f"\nn={sizes[-1]}: κ = {condition_numbers[-1]:.2e}")

discretization_conditioning()
```

## Improving Conditioning

### 1. Preconditioning

Transform $Ax = b$ to $M^{-1}Ax = M^{-1}b$ where $M^{-1}A$ is better conditioned.

```python
def demonstrate_preconditioning():
    """Show effect of preconditioning on condition number."""
    # Ill-conditioned matrix
    A = np.array([[1e6, 1], [1, 1e-6]], dtype=float)

    print("Original System:")
    print(f"A =\n{A}")
    print(f"κ(A) = {np.linalg.cond(A):.2e}\n")

    # Diagonal preconditioning: M = diag(A)
    D = np.diag(np.diag(A))
    D_inv = np.diag(1/np.diag(A))

    A_precond = D_inv @ A
    print("Preconditioned System (D⁻¹A where D = diag(A)):")
    print(f"D⁻¹A =\n{A_precond}")
    print(f"κ(D⁻¹A) = {np.linalg.cond(A_precond):.2e}\n")

    # Verify solution is unchanged
    b = np.array([1, 1], dtype=float)
    x_original = np.linalg.solve(A, b)
    x_precond = np.linalg.solve(A_precond, D_inv @ b)

    print(f"Original solution: {x_original}")
    print(f"Preconditioned solution: {x_precond}")
    print(f"Difference: {np.linalg.norm(x_original - x_precond):.2e}")

demonstrate_preconditioning()
```

### 2. Regularization

Add small diagonal perturbation:

$$A_\epsilon = A + \epsilon I$$

Trades exact solution for stability.

```python
def demonstrate_regularization():
    """Show regularization effect on ill-conditioned systems."""
    # Nearly singular matrix
    A = np.array([[1, 1], [1, 1.0001]], dtype=float)
    b = np.array([2, 2.0001], dtype=float)

    print(f"Original κ(A) = {np.linalg.cond(A):.2e}")

    regularization_params = [0, 1e-6, 1e-4, 1e-2]

    print(f"\n{'ε':<12} {'κ(A+εI)':<15} {'||x||':<15} {'||Ax-b||':<15}")
    print("=" * 57)

    for eps in regularization_params:
        A_reg = A + eps * np.eye(2)
        x = np.linalg.solve(A_reg, b)

        kappa = np.linalg.cond(A_reg)
        norm_x = np.linalg.norm(x)
        residual = np.linalg.norm(A @ x - b)

        print(f"{eps:<12.2e} {kappa:<15.2e} {norm_x:<15.6f} {residual:<15.2e}")

demonstrate_regularization()
```

### 3. Equilibration

Scale rows and columns to similar magnitudes:

```python
def equilibrate_system(A, b):
    """Equilibrate linear system."""
    n = A.shape[0]

    # Row scaling
    row_scales = np.max(np.abs(A), axis=1)
    row_scales[row_scales == 0] = 1
    D_r = np.diag(1 / row_scales)

    # Column scaling
    A_row = D_r @ A
    col_scales = np.max(np.abs(A_row), axis=0)
    col_scales[col_scales == 0] = 1
    D_c = np.diag(1 / col_scales)

    # Equilibrated system
    A_eq = D_r @ A @ D_c
    b_eq = D_r @ b

    return A_eq, b_eq, D_r, D_c

# Test
A = np.array([[1e8, 1], [1, 1e-8]], dtype=float)
b = np.array([1e8, 1], dtype=float)

print("Before equilibration:")
print(f"A =\n{A}")
print(f"κ(A) = {np.linalg.cond(A):.2e}\n")

A_eq, b_eq, D_r, D_c = equilibrate_system(A, b)

print("After equilibration:")
print(f"A_eq =\n{A_eq}")
print(f"κ(A_eq) = {np.linalg.cond(A_eq):.2e}")
```

## Condition Estimation

Computing $\kappa(A) = \|A\| \|A^{-1}\|$ exactly requires $O(n^3)$ operations. **Condition estimation** approximates $\kappa(A)$ more cheaply.

```python
def condition_estimate(A):
    """
    Estimate condition number without computing A^{-1}.
    Uses LAPACK-style approach.
    """
    n = A.shape[0]

    # Compute norm of A
    norm_A = np.linalg.norm(A, 1)

    # Solve Ax = b for random b to estimate ||A^{-1}||
    # More sophisticated: use power iteration on A^{-1}

    # Simple estimate: solve with random vectors
    estimates = []
    for _ in range(5):
        b = np.random.randn(n)
        x = np.linalg.solve(A, b)
        estimates.append(np.linalg.norm(x, 1) / np.linalg.norm(b, 1))

    norm_A_inv_estimate = max(estimates)

    return norm_A * norm_A_inv_estimate

# Test
A = np.random.randn(10, 10)
A = A @ A.T  # Make symmetric positive definite

exact = np.linalg.cond(A, 1)
estimated = condition_estimate(A)

print(f"Exact condition number: {exact:.2e}")
print(f"Estimated condition number: {estimated:.2e}")
print(f"Relative error: {abs(exact - estimated)/exact:.2%}")
```

## Residual vs. Error

For $Ax = b$:
- **Residual**: $r = b - A\tilde{x}$
- **Error**: $e = x - \tilde{x}$

Relationship:

$$\frac{\|e\|}{\|x\|} \leq \kappa(A) \frac{\|r\|}{\|b\|}$$

Small residual doesn't guarantee small error if $\kappa(A)$ is large!

```python
def residual_vs_error_demo():
    """Demonstrate residual vs. error relationship."""
    # Well-conditioned
    A_good = np.array([[4, 1], [1, 3]], dtype=float)
    # Ill-conditioned
    A_bad = np.array([[1, 1], [1, 1+1e-10]], dtype=float)

    b = np.array([1, 1], dtype=float)

    for A, name in [(A_good, "Well-conditioned"), (A_bad, "Ill-conditioned")]:
        x_exact = np.linalg.solve(A, b)

        # Perturbed solution
        x_perturbed = x_exact + np.array([1e-6, 1e-6])

        residual = b - A @ x_perturbed
        error = x_exact - x_perturbed

        rel_residual = np.linalg.norm(residual) / np.linalg.norm(b)
        rel_error = np.linalg.norm(error) / np.linalg.norm(x_exact)

        kappa = np.linalg.cond(A)

        print(f"\n{name} (κ = {kappa:.2e}):")
        print(f"  Relative residual: {rel_residual:.2e}")
        print(f"  Relative error: {rel_error:.2e}")
        print(f"  Ratio (error/residual): {rel_error/rel_residual:.2e}")
        print(f"  Condition number: {kappa:.2e}")

residual_vs_error_demo()
```

## Summary

Problem conditioning fundamentally limits achievable accuracy:

1. **Condition number** $\kappa$ measures sensitivity
2. **Expect to lose** $\log_{10} \kappa$ digits of accuracy
3. **Ill-conditioning** comes from:
   - Nearly dependent columns/rows
   - Extreme scaling differences
   - Fine discretization
4. **Improvements**:
   - Preconditioning
   - Regularization
   - Equilibration
   - Problem reformulation
5. **Small residual** ≠ **small error** for ill-conditioned problems

No algorithm can overcome fundamental ill-conditioning of a problem!
