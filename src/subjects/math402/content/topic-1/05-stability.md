---
title: "Numerical Stability"
description: "Analysis of stability in numerical algorithms and techniques to ensure robust computations"
---

# Numerical Stability

Stability is a fundamental property of numerical algorithms, determining whether small errors remain bounded or grow uncontrollably during computation.

## Types of Stability

### Forward Stability

An algorithm is **forward stable** if the forward error is bounded by a small multiple of machine epsilon times the condition number:

$$\frac{\|\tilde{y} - y\|}{\|y\|} \leq C \cdot \kappa(x) \cdot \epsilon_{mach}$$

where $\tilde{y}$ is the computed result and $y$ is the exact result.

### Backward Stability

An algorithm is **backward stable** if it produces the exact answer to a slightly perturbed problem:

$$\tilde{y} = f(x + \Delta x), \quad \frac{\|\Delta x\|}{\|x\|} = O(\epsilon_{mach})$$

**Key insight**: Backward stability + good conditioning = forward stability.

### Numerical Stability

An algorithm is **numerically stable** if errors do not grow uncontrollably. This is weaker than forward or backward stability.

## Stable vs. Unstable Algorithms

### Example 1: Computing $e^x - 1$

**Unstable approach** for small $x$:
```python
def expm1_unstable(x):
    """Unstable: suffers from cancellation."""
    return np.exp(x) - 1
```

**Stable approach**:
```python
def expm1_stable(x):
    """Stable: uses Taylor series for small x."""
    if abs(x) < 1e-5:
        # Taylor series: e^x - 1 = x + x^2/2! + x^3/3! + ...
        return x * (1 + x * (0.5 + x * (1/6 + x * (1/24 + x/120))))
    else:
        return np.exp(x) - 1

# Compare
x_values = [1e-10, 1e-8, 1e-6, 1e-4, 1e-2]
print(f"{'x':<12} {'Unstable':<20} {'Stable':<20} {'NumPy':<20}")
print("=" * 72)

for x in x_values:
    unstable = expm1_unstable(x)
    stable = expm1_stable(x)
    numpy_result = np.expm1(x)
    print(f"{x:<12.2e} {unstable:<20.15e} {stable:<20.15e} {numpy_result:<20.15e}")
```

### Example 2: Polynomial Evaluation

**Unstable**: Direct evaluation
$$p(x) = a_0 + a_1 x + a_2 x^2 + \cdots + a_n x^n$$

```python
def poly_eval_unstable(coeffs, x):
    """Unstable: compute powers separately."""
    result = 0
    for i, a in enumerate(coeffs):
        result += a * x**i
    return result
```

**Stable**: Horner's method
$$p(x) = a_0 + x(a_1 + x(a_2 + \cdots + x(a_{n-1} + x \cdot a_n)\cdots))$$

```python
def poly_eval_horner(coeffs, x):
    """Stable: Horner's method."""
    result = coeffs[-1]
    for a in reversed(coeffs[:-1]):
        result = result * x + a
    return result

# Compare
coeffs = [1, -10, 35, -50, 24]  # (x-1)(x-2)(x-3)(x-4)
x = 1.0000001

unstable = poly_eval_unstable(coeffs, x)
stable = poly_eval_horner(coeffs, x)
exact = (x-1) * (x-2) * (x-3) * (x-4)

print(f"Polynomial evaluation at x = {x}")
print(f"Unstable method: {unstable:.15e}")
print(f"Horner's method: {stable:.15e}")
print(f"Exact (factored): {exact:.15e}")
print(f"Error (unstable): {abs(unstable - exact):.5e}")
print(f"Error (stable): {abs(stable - exact):.5e}")
```

## Analyzing Stability: Growth Factor

The **growth factor** measures error amplification:

$$G = \frac{\text{max magnitude during computation}}{\text{initial magnitude}}$$

Small growth factor indicates stability.

```python
def analyze_growth_factor(algorithm, input_data, track_intermediates):
    """
    Analyze growth factor of an algorithm.

    Parameters:
    - algorithm: function to analyze
    - input_data: input to algorithm
    - track_intermediates: function that returns intermediate values
    """
    intermediates = track_intermediates(input_data)

    initial_mag = np.max(np.abs(input_data))
    max_mag = np.max(np.abs(intermediates))

    growth_factor = max_mag / initial_mag if initial_mag != 0 else float('inf')

    return growth_factor, intermediates

# Example: Gaussian elimination
def gaussian_elimination_track(A, b):
    """Gaussian elimination with pivoting, tracking intermediate values."""
    n = len(b)
    A = A.astype(float).copy()
    b = b.astype(float).copy()

    intermediates = [np.max(np.abs(A))]

    for k in range(n-1):
        # Partial pivoting
        max_idx = np.argmax(np.abs(A[k:, k])) + k
        if max_idx != k:
            A[[k, max_idx]] = A[[max_idx, k]]
            b[[k, max_idx]] = b[[max_idx, k]]

        # Elimination
        for i in range(k+1, n):
            factor = A[i, k] / A[k, k]
            A[i, k+1:] -= factor * A[k, k+1:]
            b[i] -= factor * b[k]

        intermediates.append(np.max(np.abs(A)))

    return intermediates

# Test
A = np.array([[1, 2, 3], [2, 5, 2], [6, -3, 1]], dtype=float)
b = np.array([1, 2, 3], dtype=float)

intermediates = gaussian_elimination_track(A, b)
initial = np.max(np.abs(A))
final = intermediates[-1]
growth = final / initial

print(f"Gaussian Elimination Growth Factor:")
print(f"Initial max magnitude: {initial:.5e}")
print(f"Final max magnitude: {final:.5e}")
print(f"Growth factor: {growth:.5e}")
```

## Stability of Recurrence Relations

### Example: Computing Bessel Functions

Consider the recurrence:
$$J_{n-1}(x) - \frac{2n}{x}J_n(x) + J_{n+1}(x) = 0$$

**Forward recurrence** (unstable for large $n$):
$$J_{n+1}(x) = \frac{2n}{x}J_n(x) - J_{n-1}(x)$$

**Backward recurrence** (stable):
$$J_{n-1}(x) = \frac{2n}{x}J_n(x) - J_{n+1}(x)$$

```python
from scipy.special import jv

def bessel_forward_unstable(x, n_max):
    """Forward recurrence - unstable."""
    J = np.zeros(n_max + 1)
    J[0] = jv(0, x)  # Initial value
    J[1] = jv(1, x)  # Initial value

    for n in range(1, n_max):
        J[n+1] = (2*n/x) * J[n] - J[n-1]

    return J

def bessel_backward_stable(x, n_max):
    """Backward recurrence - stable."""
    # Start with arbitrary values at high n
    J = np.zeros(n_max + 10)
    J[-1] = 0
    J[-2] = 1  # Arbitrary starting value

    # Backward recurrence
    for n in range(n_max + 8, 0, -1):
        J[n-1] = (2*n/x) * J[n] - J[n+1]

    # Normalize using J_0(x)
    scale = jv(0, x) / J[0]
    J *= scale

    return J[:n_max + 1]

# Compare
x = 5.0
n_max = 20

J_forward = bessel_forward_unstable(x, n_max)
J_backward = bessel_backward_stable(x, n_max)
J_exact = np.array([jv(n, x) for n in range(n_max + 1)])

print(f"Bessel Function Recurrence at x = {x}")
print(f"{'n':<5} {'Forward':<20} {'Backward':<20} {'Exact':<20} {'Error(Fwd)':<15} {'Error(Back)'}")
print("=" * 95)

for n in range(0, n_max + 1, 2):
    err_fwd = abs(J_forward[n] - J_exact[n]) / abs(J_exact[n]) if J_exact[n] != 0 else 0
    err_back = abs(J_backward[n] - J_exact[n]) / abs(J_exact[n]) if J_exact[n] != 0 else 0

    print(f"{n:<5} {J_forward[n]:<20.10e} {J_backward[n]:<20.10e} {J_exact[n]:<20.10e} {err_fwd:<15.5e} {err_back:<15.5e}")
```

### Miller's Algorithm

For stable computation of ratios or normalized sequences:

1. Start backward from arbitrary initial values
2. Compute desired number of terms
3. Normalize using a known value

## Stability Analysis Techniques

### Von Neumann Stability Analysis

For finite difference schemes, analyze error mode:

$$\epsilon_j^n = \xi^n e^{ijk\Delta x}$$

Substituting into the scheme gives amplification factor $\xi$.

**Stability condition**: $|\xi| \leq 1$

```python
def von_neumann_analysis_heat_equation():
    """
    Von Neumann stability analysis for heat equation:
    u_t = α u_xx

    FTCS scheme: u[n+1,j] = u[n,j] + r(u[n,j+1] - 2u[n,j] + u[n,j-1])
    where r = α Δt / Δx²
    """
    # Amplification factor: ξ = 1 - 4r sin²(kΔx/2)

    k_values = np.linspace(0, np.pi, 100)
    r_values = [0.25, 0.5, 0.6]

    plt.figure(figsize=(10, 6))

    for r in r_values:
        xi = 1 - 4*r*np.sin(k_values/2)**2
        plt.plot(k_values, xi, label=f'r = {r}', linewidth=2)

    plt.axhline(y=1, color='k', linestyle='--', alpha=0.3)
    plt.axhline(y=-1, color='k', linestyle='--', alpha=0.3)
    plt.xlabel('k Δx')
    plt.ylabel('Amplification factor ξ')
    plt.title('Von Neumann Stability Analysis: Heat Equation (FTCS)')
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.ylim([-2, 1.5])
    plt.savefig('von_neumann_stability.png', dpi=150, bbox_inches='tight')
    plt.close()

    print("Stability analysis:")
    print("FTCS is stable when r ≤ 0.5")
    print("For r > 0.5, |ξ| > 1 and method is unstable")

von_neumann_analysis_heat_equation()
```

### Matrix Stability Analysis

For $\mathbf{u}^{n+1} = A\mathbf{u}^n$:

**Stability condition**: All eigenvalues of $A$ satisfy $|\lambda_i| \leq 1$

```python
def matrix_stability_analysis(A, n_iterations=50):
    """Analyze stability of iterative method."""
    # Compute eigenvalues
    eigenvalues = np.linalg.eigvals(A)
    spectral_radius = np.max(np.abs(eigenvalues))

    print(f"Matrix Stability Analysis:")
    print(f"Eigenvalues: {eigenvalues}")
    print(f"Spectral radius: {spectral_radius:.6f}")

    if spectral_radius < 1:
        print("Status: STABLE (ρ < 1)")
    elif spectral_radius == 1:
        print("Status: MARGINALLY STABLE (ρ = 1)")
    else:
        print("Status: UNSTABLE (ρ > 1)")

    # Demonstrate convergence/divergence
    u0 = np.random.rand(A.shape[0])
    u = u0.copy()
    norms = [np.linalg.norm(u)]

    for i in range(n_iterations):
        u = A @ u
        norms.append(np.linalg.norm(u))

    # Plot
    plt.figure(figsize=(10, 6))
    plt.semilogy(norms, 'b-', linewidth=2)
    plt.xlabel('Iteration')
    plt.ylabel('||u||')
    plt.title(f'Evolution of Solution Norm (ρ = {spectral_radius:.3f})')
    plt.grid(True, alpha=0.3)
    plt.savefig('matrix_stability.png', dpi=150, bbox_inches='tight')
    plt.close()

# Example: Stable iteration matrix
A_stable = np.array([[0.5, 0.2], [0.1, 0.6]])
matrix_stability_analysis(A_stable)

print("\n" + "="*50 + "\n")

# Example: Unstable iteration matrix
A_unstable = np.array([[1.1, 0.2], [0.1, 0.9]])
matrix_stability_analysis(A_unstable)
```

## Improving Stability

### 1. Pivoting

Pivoting improves stability in Gaussian elimination:

```python
def gaussian_no_pivot(A, b):
    """Gaussian elimination without pivoting - potentially unstable."""
    n = len(b)
    A = A.astype(float).copy()
    b = b.astype(float).copy()

    for k in range(n-1):
        for i in range(k+1, n):
            if abs(A[k, k]) < 1e-15:
                raise ValueError("Zero pivot encountered")
            factor = A[i, k] / A[k, k]
            A[i, k+1:] -= factor * A[k, k+1:]
            b[i] -= factor * b[k]

    # Back substitution
    x = np.zeros(n)
    for i in range(n-1, -1, -1):
        x[i] = (b[i] - np.dot(A[i, i+1:], x[i+1:])) / A[i, i]

    return x

def gaussian_with_pivot(A, b):
    """Gaussian elimination with partial pivoting - stable."""
    n = len(b)
    A = A.astype(float).copy()
    b = b.astype(float).copy()

    for k in range(n-1):
        # Find pivot
        max_idx = np.argmax(np.abs(A[k:, k])) + k

        # Swap rows
        if max_idx != k:
            A[[k, max_idx]] = A[[max_idx, k]]
            b[[k, max_idx]] = b[[max_idx, k]]

        # Eliminate
        for i in range(k+1, n):
            factor = A[i, k] / A[k, k]
            A[i, k+1:] -= factor * A[k, k+1:]
            b[i] -= factor * b[k]

    # Back substitution
    x = np.zeros(n)
    for i in range(n-1, -1, -1):
        x[i] = (b[i] - np.dot(A[i, i+1:], x[i+1:])) / A[i, i]

    return x

# Test with ill-conditioned matrix
A = np.array([[1e-20, 1], [1, 1]], dtype=float)
b = np.array([1, 2], dtype=float)

try:
    x_no_pivot = gaussian_no_pivot(A, b)
    print("Without pivoting:", x_no_pivot)
except Exception as e:
    print("Without pivoting: Failed -", str(e))

x_pivot = gaussian_with_pivot(A, b)
x_exact = np.linalg.solve(A, b)

print("With pivoting:", x_pivot)
print("NumPy (pivoted):", x_exact)
print("Error (pivoting):", np.linalg.norm(x_pivot - x_exact))
```

### 2. Scaling

Equilibration improves conditioning:

```python
def equilibrate_matrix(A):
    """Equilibrate matrix by row and column scaling."""
    n = A.shape[0]

    # Row scaling
    row_scales = np.max(np.abs(A), axis=1)
    row_scales[row_scales == 0] = 1
    D_row = np.diag(1 / row_scales)

    # Column scaling
    A_row_scaled = D_row @ A
    col_scales = np.max(np.abs(A_row_scaled), axis=0)
    col_scales[col_scales == 0] = 1
    D_col = np.diag(1 / col_scales)

    # Scaled matrix
    A_scaled = D_row @ A @ D_col

    return A_scaled, D_row, D_col

# Example
A = np.array([[1e6, 1], [1, 1e-6]], dtype=float)

print("Original matrix:")
print(A)
print(f"Condition number: {np.linalg.cond(A):.2e}")

A_scaled, D_row, D_col = equilibrate_matrix(A)
print("\nScaled matrix:")
print(A_scaled)
print(f"Condition number: {np.linalg.cond(A_scaled):.2e}")
```

### 3. Orthogonalization

Using orthogonal transformations (QR, Householder) for stability:

```python
def gram_schmidt_unstable(A):
    """Classical Gram-Schmidt - numerically unstable."""
    n, m = A.shape
    Q = np.zeros_like(A, dtype=float)
    R = np.zeros((m, m), dtype=float)

    for j in range(m):
        v = A[:, j].copy()
        for i in range(j):
            R[i, j] = np.dot(Q[:, i], A[:, j])
            v -= R[i, j] * Q[:, i]
        R[j, j] = np.linalg.norm(v)
        Q[:, j] = v / R[j, j]

    return Q, R

def gram_schmidt_stable(A):
    """Modified Gram-Schmidt - more stable."""
    n, m = A.shape
    Q = A.astype(float).copy()
    R = np.zeros((m, m), dtype=float)

    for j in range(m):
        R[j, j] = np.linalg.norm(Q[:, j])
        Q[:, j] /= R[j, j]
        for i in range(j+1, m):
            R[j, i] = np.dot(Q[:, j], Q[:, i])
            Q[:, i] -= R[j, i] * Q[:, j]

    return Q, R

# Test with nearly linearly dependent columns
A = np.array([[1, 1, 1],
              [1e-10, 0, 0],
              [0, 1e-10, 0],
              [0, 0, 1e-10]], dtype=float)

Q_unstable, R_unstable = gram_schmidt_unstable(A)
Q_stable, R_stable = gram_schmidt_stable(A)

print("Orthogonality check Q^T Q (should be identity):")
print("\nClassical Gram-Schmidt:")
print(Q_unstable.T @ Q_unstable)
print("\nModified Gram-Schmidt:")
print(Q_stable.T @ Q_stable)
```

## Stability in Numerical Integration

### Explicit vs. Implicit Methods

For ODE $y' = f(t, y)$:

**Explicit Euler** (conditionally stable):
$$y_{n+1} = y_n + h f(t_n, y_n)$$

**Implicit Euler** (unconditionally stable):
$$y_{n+1} = y_n + h f(t_{n+1}, y_{n+1})$$

```python
def compare_euler_stability():
    """Compare stability of explicit vs implicit Euler."""
    # Test equation: y' = -λy, exact solution: y = y0 * exp(-λt)
    lambda_val = 10
    y0 = 1.0
    t_end = 2.0

    def exact_solution(t):
        return y0 * np.exp(-lambda_val * t)

    # Stability region for explicit Euler: |1 - hλ| ≤ 1
    h_stable = 0.15  # Stable (h < 2/λ = 0.2)
    h_unstable = 0.25  # Unstable (h > 2/λ)

    for h, label in [(h_stable, "Stable"), (h_unstable, "Unstable")]:
        n_steps = int(t_end / h)
        t = np.linspace(0, n_steps * h, n_steps + 1)

        # Explicit Euler
        y_explicit = np.zeros(n_steps + 1)
        y_explicit[0] = y0
        for i in range(n_steps):
            y_explicit[i+1] = y_explicit[i] + h * (-lambda_val * y_explicit[i])

        # Implicit Euler
        y_implicit = np.zeros(n_steps + 1)
        y_implicit[0] = y0
        for i in range(n_steps):
            y_implicit[i+1] = y_implicit[i] / (1 + h * lambda_val)

        # Plot
        plt.figure(figsize=(10, 6))
        plt.plot(t, y_explicit, 'r-', label='Explicit Euler', linewidth=2)
        plt.plot(t, y_implicit, 'b--', label='Implicit Euler', linewidth=2)
        plt.plot(t, exact_solution(t), 'k:', label='Exact', linewidth=2)
        plt.xlabel('t')
        plt.ylabel('y')
        plt.title(f'Euler Methods: h = {h} ({label} for Explicit)')
        plt.legend()
        plt.grid(True, alpha=0.3)
        plt.savefig(f'euler_stability_{label.lower()}.png', dpi=150, bbox_inches='tight')
        plt.close()

        print(f"\n{label} case (h = {h}):")
        print(f"  Explicit final value: {y_explicit[-1]:.5e}")
        print(f"  Implicit final value: {y_implicit[-1]:.5e}")
        print(f"  Exact final value: {exact_solution(t[-1]):.5e}")

compare_euler_stability()
```

## Summary

Numerical stability is crucial for reliable computation:

1. **Backward stability**: Solve perturbed problem exactly
2. **Forward stability**: Small forward error relative to condition number
3. **Growth factors**: Measure error amplification
4. **Recurrences**: Forward often unstable, backward often stable
5. **Pivoting**: Essential for Gaussian elimination
6. **Orthogonalization**: Modified Gram-Schmidt more stable
7. **Implicit methods**: Often more stable for stiff problems

Key principles:
- Avoid operations that amplify errors
- Use backward-stable algorithms when possible
- Pivot/scale to improve conditioning
- Choose appropriate method for problem characteristics
- Verify stability through analysis or testing
