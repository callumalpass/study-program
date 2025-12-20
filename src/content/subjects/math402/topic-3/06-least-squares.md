---
title: "Least Squares Approximation"
description: "Fitting functions to overdetermined data using least squares criterion for optimal approximation"
---

# Least Squares Approximation

Least squares approximation finds the best-fitting function from a given class when exact interpolation is impossible, impractical, or undesirable. This fundamental technique minimizes the sum of squared residuals and is essential for data fitting and regression analysis.

## Introduction

Unlike interpolation, which requires the approximating function to pass through all data points, **approximation** seeks a function that comes "close" to the data in some optimal sense. This is crucial when:

- **More data than parameters**: Overdetermined systems (more equations than unknowns)
- **Noisy measurements**: Exact interpolation fits the noise, not the underlying trend
- **Simplicity desired**: Lower-degree approximations are smoother and more interpretable
- **Outliers present**: Robust fitting requires minimizing overall error, not matching every point

The **least squares criterion** minimizes the sum of squared errors, providing a unique, computationally efficient solution with excellent statistical properties.

## Problem Formulation

Given data points $(x_1, y_1), (x_2, y_2), \ldots, (x_m, y_m)$ and a class of approximating functions (e.g., polynomials of degree $n < m-1$), find the function $\phi(x)$ that minimizes:

$$E = \sum_{i=1}^m [y_i - \phi(x_i)]^2$$

This is the **sum of squared residuals** or **least squares error**.

## Linear Least Squares

The most common case uses **linear combinations of basis functions**:

$$\phi(x) = c_1 \phi_1(x) + c_2 \phi_2(x) + \cdots + c_n \phi_n(x)$$

where $\phi_1, \ldots, \phi_n$ are fixed basis functions and $c_1, \ldots, c_n$ are coefficients to determine.

### Normal Equations

The least squares solution satisfies the **normal equations**:

$$A^T A \mathbf{c} = A^T \mathbf{y}$$

where:
- $A$ is the $m \times n$ **design matrix** with $A_{ij} = \phi_j(x_i)$
- $\mathbf{c} = [c_1, c_2, \ldots, c_n]^T$ is the coefficient vector
- $\mathbf{y} = [y_1, y_2, \ldots, y_m]^T$ is the data vector

The matrix $A^T A$ is $n \times n$ and symmetric positive definite (if columns of $A$ are linearly independent).

### Derivation

Minimize $E(\mathbf{c}) = \|\mathbf{y} - A\mathbf{c}\|^2$:

$$E = (\mathbf{y} - A\mathbf{c})^T(\mathbf{y} - A\mathbf{c}) = \mathbf{y}^T\mathbf{y} - 2\mathbf{c}^T A^T \mathbf{y} + \mathbf{c}^T A^T A \mathbf{c}$$

Taking the gradient with respect to $\mathbf{c}$ and setting to zero:

$$\nabla_\mathbf{c} E = -2A^T\mathbf{y} + 2A^T A\mathbf{c} = 0$$

Therefore: $A^T A \mathbf{c} = A^T \mathbf{y}$.

## Polynomial Least Squares

For polynomial approximation, use basis $\phi_j(x) = x^{j-1}$ for $j = 1, \ldots, n+1$ to get degree $n$ polynomial:

$$p(x) = c_0 + c_1 x + c_2 x^2 + \cdots + c_n x^n$$

The design matrix is:

$$A = \begin{bmatrix}
1 & x_1 & x_1^2 & \cdots & x_1^n \\
1 & x_2 & x_2^2 & \cdots & x_2^n \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
1 & x_m & x_m^2 & \cdots & x_m^n
\end{bmatrix}$$

This is a **Vandermonde-like matrix** that can become ill-conditioned for high degrees.

## Implementation

```python
import numpy as np
import matplotlib.pyplot as plt

def least_squares_poly(x_data, y_data, degree):
    """
    Polynomial least squares approximation.

    Parameters:
    - x_data: array of x-coordinates (m points)
    - y_data: array of y-coordinates (m points)
    - degree: degree n of approximating polynomial

    Returns:
    - coeffs: polynomial coefficients [c0, c1, ..., cn]
    - residual: sum of squared residuals
    """
    m = len(x_data)
    n = degree + 1

    # Build design matrix A
    A = np.zeros((m, n))
    for j in range(n):
        A[:, j] = x_data**j

    # Solve normal equations: A^T A c = A^T y
    ATA = A.T @ A
    ATy = A.T @ y_data

    coeffs = np.linalg.solve(ATA, ATy)

    # Compute residual
    y_approx = A @ coeffs
    residual = np.sum((y_data - y_approx)**2)

    return coeffs, residual

def evaluate_poly(coeffs, x):
    """Evaluate polynomial with given coefficients."""
    result = np.zeros_like(x, dtype=float)
    for j, c in enumerate(coeffs):
        result += c * x**j
    return result

# Example: Fit noisy data
np.random.seed(42)
x_data = np.linspace(0, 2*np.pi, 20)
y_true = np.sin(x_data)
y_data = y_true + 0.3 * np.random.randn(len(x_data))  # Add noise

# Fit polynomials of different degrees
degrees = [1, 3, 5, 9]
x_plot = np.linspace(0, 2*np.pi, 200)

fig, axes = plt.subplots(2, 2, figsize=(12, 10))
axes = axes.flatten()

for idx, deg in enumerate(degrees):
    coeffs, residual = least_squares_poly(x_data, y_data, deg)
    y_fit = evaluate_poly(coeffs, x_plot)

    ax = axes[idx]
    ax.plot(x_data, y_data, 'ko', markersize=5, label='Noisy data')
    ax.plot(x_plot, np.sin(x_plot), 'b-', linewidth=2, alpha=0.5, label='True function')
    ax.plot(x_plot, y_fit, 'r--', linewidth=2, label=f'Degree {deg} fit')
    ax.set_title(f'Degree {deg}, Residual: {residual:.4f}')
    ax.legend()
    ax.grid(True, alpha=0.3)
    ax.set_xlabel('x')
    ax.set_ylabel('y')

plt.tight_layout()
plt.show()

print("Polynomial Least Squares Results:")
for deg in degrees:
    coeffs, residual = least_squares_poly(x_data, y_data, deg)
    print(f"Degree {deg}: residual = {residual:.6f}")
```

## Worked Example

**Problem**: Fit a line $y = c_0 + c_1 x$ to the data: $(0, 1)$, $(1, 3)$, $(2, 4)$, $(3, 4)$.

**Solution**:

We have $m = 4$ points and $n = 2$ parameters (degree 1).

Design matrix:
$$A = \begin{bmatrix} 1 & 0 \\ 1 & 1 \\ 1 & 2 \\ 1 & 3 \end{bmatrix}, \quad \mathbf{y} = \begin{bmatrix} 1 \\ 3 \\ 4 \\ 4 \end{bmatrix}$$

Compute $A^T A$:
$$A^T A = \begin{bmatrix} 1 & 1 & 1 & 1 \\ 0 & 1 & 2 & 3 \end{bmatrix} \begin{bmatrix} 1 & 0 \\ 1 & 1 \\ 1 & 2 \\ 1 & 3 \end{bmatrix} = \begin{bmatrix} 4 & 6 \\ 6 & 14 \end{bmatrix}$$

Compute $A^T \mathbf{y}$:
$$A^T \mathbf{y} = \begin{bmatrix} 1 & 1 & 1 & 1 \\ 0 & 1 & 2 & 3 \end{bmatrix} \begin{bmatrix} 1 \\ 3 \\ 4 \\ 4 \end{bmatrix} = \begin{bmatrix} 12 \\ 23 \end{bmatrix}$$

Solve normal equations:
$$\begin{bmatrix} 4 & 6 \\ 6 & 14 \end{bmatrix} \begin{bmatrix} c_0 \\ c_1 \end{bmatrix} = \begin{bmatrix} 12 \\ 23 \end{bmatrix}$$

From first equation: $4c_0 + 6c_1 = 12$, so $c_0 = 3 - 1.5c_1$.

Substitute into second: $6(3 - 1.5c_1) + 14c_1 = 23$
$$18 - 9c_1 + 14c_1 = 23$$
$$5c_1 = 5$$
$$c_1 = 1$$

Therefore $c_0 = 3 - 1.5(1) = 1.5$.

**Best-fit line**: $y = 1.5 + x$

Verification:
- At $x=0$: $y=1.5$ (data: 1, error: 0.5)
- At $x=1$: $y=2.5$ (data: 3, error: 0.5)
- At $x=2$: $y=3.5$ (data: 4, error: 0.5)
- At $x=3$: $y=4.5$ (data: 4, error: 0.5)

Sum of squared residuals: $4 \times (0.5)^2 = 1.0$.

## QR Decomposition Method

For numerical stability, use **QR decomposition** instead of forming $A^T A$:

$$A = QR$$

where $Q$ is orthogonal and $R$ is upper triangular. Then:

$$A^T A \mathbf{c} = A^T \mathbf{y}$$
$$R^T Q^T Q R \mathbf{c} = R^T Q^T \mathbf{y}$$
$$R^T R \mathbf{c} = R^T Q^T \mathbf{y}$$
$$R \mathbf{c} = Q^T \mathbf{y}$$

Solve by back-substitution.

```python
def least_squares_qr(x_data, y_data, degree):
    """
    Least squares using QR decomposition (more stable).

    Parameters:
    - x_data, y_data: data points
    - degree: polynomial degree

    Returns:
    - coeffs: polynomial coefficients
    """
    m = len(x_data)
    n = degree + 1

    # Build design matrix
    A = np.vander(x_data, n, increasing=True)

    # QR decomposition
    Q, R = np.linalg.qr(A)

    # Solve R c = Q^T y
    coeffs = np.linalg.solve(R, Q.T @ y_data)

    return coeffs

# Compare with normal equations
coeffs_normal, _ = least_squares_poly(x_data, y_data, 5)
coeffs_qr = least_squares_qr(x_data, y_data, 5)

print("\nComparison of methods:")
print("Normal equations:", coeffs_normal)
print("QR decomposition:", coeffs_qr)
print("Max difference:", np.max(np.abs(coeffs_normal - coeffs_qr)))
```

## Weighted Least Squares

When data points have different **reliabilities** or **uncertainties**, use weighted least squares:

$$E = \sum_{i=1}^m w_i [y_i - \phi(x_i)]^2$$

where $w_i > 0$ are weights (often $w_i = 1/\sigma_i^2$ for measurement variance $\sigma_i^2$).

Modified normal equations:
$$A^T W A \mathbf{c} = A^T W \mathbf{y}$$

where $W = \text{diag}(w_1, \ldots, w_m)$.

## Overfitting and Underfitting

- **Underfitting**: Degree too low, large residual, poor fit
- **Good fit**: Captures trend without fitting noise
- **Overfitting**: Degree too high, fits noise, poor generalization

**Cross-validation** or information criteria (AIC, BIC) help choose appropriate degree.

## Applications

1. **Data analysis**: Linear regression, trend fitting
2. **Curve fitting**: Empirical models from experimental data
3. **Signal processing**: Filter design, parameter estimation
4. **Machine learning**: Linear models, feature engineering
5. **Statistics**: Linear regression, ANOVA
6. **Physics**: Fitting theoretical models to observations

## Key Takeaways

- **Least squares** minimizes sum of squared residuals
- Provides **unique solution** via normal equations $A^T A \mathbf{c} = A^T \mathbf{y}$
- Works with **overdetermined systems** (more data than parameters)
- **Polynomial least squares** uses monomial basis functions
- **QR decomposition** provides more numerically stable solution
- **Weighted least squares** accounts for varying data quality
- Must balance **model complexity** with **generalization** to avoid overfitting
- Foundation of **linear regression** in statistics

## Common Mistakes

1. **Using interpolation for noisy data**: Exact interpolation fits the noise, not the signal
2. **Degree too high**: Overfitting causes wild oscillations and poor predictions
3. **Ill-conditioned matrices**: High polynomial degrees make $A^T A$ nearly singular; use QR instead
4. **Ignoring weights**: Treating all measurements equally when they have different accuracies
5. **Not validating**: Failing to test on independent data to detect overfitting
6. **Extrapolation**: Least squares fits may be very poor outside the data range
