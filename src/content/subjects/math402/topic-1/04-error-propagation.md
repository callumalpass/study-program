---
title: "Error Propagation"
description: "How errors propagate through arithmetic operations and function evaluations in numerical computations"
---

# Error Propagation

Understanding how errors propagate through computations is essential for predicting the accuracy of numerical results and designing stable algorithms.

## Forward Error Analysis

**Forward error** measures the error in the final result:

$$\text{Forward Error} = |\text{computed result} - \text{true result}|$$

Forward error analysis tracks how input errors affect output.

## Backward Error Analysis

**Backward error** asks: "What problem was actually solved?"

$$\text{Backward Error} = |\text{actual input} - \text{perturbed input that gives computed result}|$$

An algorithm is **backward stable** if it produces the exact answer to a slightly perturbed problem.

### Example: Matrix Multiplication

For computed $\tilde{C} = AB$:
- **Forward error**: $\|\tilde{C} - AB\|$
- **Backward error**: $\|E\|$ where $\tilde{C} = (A+E)B$ exactly

## Error Propagation in Arithmetic Operations

### Addition and Subtraction

For $z = x + y$ with errors $\Delta x$ and $\Delta y$:

$$z + \Delta z = (x + \Delta x) + (y + \Delta y)$$

Therefore:

$$\Delta z = \Delta x + \Delta y$$

**Absolute error propagation**:

$$|\Delta z| \leq |\Delta x| + |\Delta y|$$

**Relative error propagation**:

$$\frac{|\Delta z|}{|z|} \leq \frac{|x|}{|x+y|}|\Delta x/x| + \frac{|y|}{|x+y|}|\Delta y/y|$$

**Critical case**: When $x \approx -y$ (cancellation), small absolute errors become large relative errors.

```python
import numpy as np

def demonstrate_addition_error_propagation():
    """Demonstrate error propagation in addition."""
    # Case 1: Similar magnitude, same sign
    x1, y1 = 1.0, 0.5
    dx1, dy1 = 1e-10, 1e-10

    z1_exact = x1 + y1
    z1_perturbed = (x1 + dx1) + (y1 + dy1)
    dz1 = z1_perturbed - z1_exact

    rel_error_z1 = abs(dz1) / abs(z1_exact)
    rel_error_x1 = abs(dx1) / abs(x1)
    rel_error_y1 = abs(dy1) / abs(y1)

    print("Case 1: No cancellation (x=1.0, y=0.5)")
    print(f"  Input relative errors: x: {rel_error_x1:.2e}, y: {rel_error_y1:.2e}")
    print(f"  Output relative error: {rel_error_z1:.2e}")
    print()

    # Case 2: Nearly equal, opposite sign (cancellation)
    x2, y2 = 1.0000000000, -0.9999999999
    dx2, dy2 = 1e-10, 1e-10

    z2_exact = x2 + y2
    z2_perturbed = (x2 + dx2) + (y2 + dy2)
    dz2 = z2_perturbed - z2_exact

    rel_error_z2 = abs(dz2) / abs(z2_exact) if z2_exact != 0 else float('inf')
    rel_error_x2 = abs(dx2) / abs(x2)
    rel_error_y2 = abs(dy2) / abs(y2)

    print("Case 2: Severe cancellation (x≈-y)")
    print(f"  Input relative errors: x: {rel_error_x2:.2e}, y: {rel_error_y2:.2e}")
    print(f"  Output relative error: {rel_error_z2:.2e}")
    print(f"  Error amplification factor: {rel_error_z2 / max(rel_error_x2, rel_error_y2):.2e}")

demonstrate_addition_error_propagation()
```

### Multiplication

For $z = x \times y$:

$$z + \Delta z = (x + \Delta x)(y + \Delta y) = xy + y\Delta x + x\Delta y + \Delta x \Delta y$$

Neglecting second-order terms:

$$\Delta z \approx y\Delta x + x\Delta y$$

**Relative error**:

$$\frac{\Delta z}{z} \approx \frac{\Delta x}{x} + \frac{\Delta y}{y}$$

Relative errors **add** in multiplication.

### Division

For $z = x / y$:

$$\frac{\Delta z}{z} \approx \frac{\Delta x}{x} - \frac{\Delta y}{y}$$

Again, relative errors add (with opposite signs).

### General Functions

For $z = f(x, y)$, using Taylor expansion:

$$\Delta z \approx \frac{\partial f}{\partial x}\Delta x + \frac{\partial f}{\partial y}\Delta y$$

**Absolute error**:

$$|\Delta z| \leq \left|\frac{\partial f}{\partial x}\right||\Delta x| + \left|\frac{\partial f}{\partial y}\right||\Delta y|$$

**Relative error** (when $f \neq 0$):

$$\frac{|\Delta z|}{|f|} \leq \left|\frac{x}{f}\frac{\partial f}{\partial x}\right|\frac{|\Delta x|}{|x|} + \left|\frac{y}{f}\frac{\partial f}{\partial y}\right|\frac{|\Delta y|}{|y|}$$

## Condition Numbers

The **condition number** measures sensitivity to input perturbations.

### Absolute Condition Number

$$\kappa_{abs} = \lim_{\delta \to 0} \sup_{\|\Delta x\| \leq \delta} \frac{\|f(x + \Delta x) - f(x)\|}{\|\Delta x\|}$$

For differentiable functions:

$$\kappa_{abs} = \|f'(x)\|$$

### Relative Condition Number

$$\kappa_{rel} = \lim_{\delta \to 0} \sup_{\|\Delta x\| \leq \delta} \frac{\|f(x + \Delta x) - f(x)\| / \|f(x)\|}{\|\Delta x\| / \|x\|}$$

For scalar functions:

$$\kappa_{rel} = \left|\frac{xf'(x)}{f(x)}\right|$$

**Interpretation**:
- $\kappa_{rel} \approx 1$: Well-conditioned
- $\kappa_{rel} \gg 1$: Ill-conditioned
- Relative error in output $\approx \kappa_{rel} \times$ relative error in input

```python
def compute_condition_number(f, f_prime, x, relative=True):
    """
    Compute condition number of function f at point x.

    Parameters:
    - f: function
    - f_prime: derivative of f
    - x: evaluation point
    - relative: if True, compute relative condition number
    """
    if relative:
        f_val = f(x)
        if abs(f_val) < 1e-15:
            return float('inf')
        kappa = abs(x * f_prime(x) / f_val)
    else:
        kappa = abs(f_prime(x))

    return kappa

# Examples
def analyze_condition_numbers():
    """Analyze condition numbers for various functions."""
    test_cases = [
        (lambda x: x**2, lambda x: 2*x, 2.0, "f(x) = x²"),
        (lambda x: np.exp(x), lambda x: np.exp(x), 10.0, "f(x) = eˣ"),
        (lambda x: np.log(x), lambda x: 1/x, 1.1, "f(x) = ln(x)"),
        (lambda x: np.sqrt(x), lambda x: 0.5/np.sqrt(x), 4.0, "f(x) = √x"),
        (lambda x: np.sin(x), lambda x: np.cos(x), np.pi/2, "f(x) = sin(x) at π/2"),
        (lambda x: np.sin(x), lambda x: np.cos(x), np.pi, "f(x) = sin(x) at π"),
    ]

    print(f"{'Function':<25} {'Point':<10} {'Absolute κ':<15} {'Relative κ':<15}")
    print("=" * 65)

    for f, f_prime, x, name in test_cases:
        kappa_abs = compute_condition_number(f, f_prime, x, relative=False)
        kappa_rel = compute_condition_number(f, f_prime, x, relative=True)
        print(f"{name:<25} {x:<10.4f} {kappa_abs:<15.6e} {kappa_rel:<15.6e}")

analyze_condition_numbers()
```

## Error Propagation Examples

### Example 1: Computing $(b^2 - 4ac)$ in Quadratic Formula

For the discriminant $\Delta = b^2 - 4ac$:

$$\frac{\partial \Delta}{\partial b} = 2b, \quad \frac{\partial \Delta}{\partial a} = -4c, \quad \frac{\partial \Delta}{\partial c} = -4a$$

Relative condition number when $b^2 \approx 4ac$:

$$\kappa_{rel} \approx \frac{|b|^2 + 4|ac|}{|b^2 - 4ac|}$$

This becomes very large when $b^2 \approx 4ac$ (near-double root).

```python
def discriminant_condition_number(a, b, c):
    """Compute condition number for quadratic discriminant."""
    delta = b**2 - 4*a*c

    if abs(delta) < 1e-15:
        return float('inf')

    # Relative condition number
    numerator = b**2 + 4*abs(a*c)
    kappa = numerator / abs(delta)

    return kappa

# Test cases
test_cases = [
    (1, 5, 1, "Well-separated roots"),
    (1, 2.001, 1, "Nearly equal roots"),
    (1, 2.0, 1, "Exactly equal roots"),
]

print("Discriminant Condition Numbers:")
for a, b, c, desc in test_cases:
    kappa = discriminant_condition_number(a, b, c)
    print(f"{desc:}: a={a}, b={b}, c={c}")
    print(f"  Discriminant: {b**2 - 4*a*c:.10f}")
    print(f"  Condition number: {kappa:.2e}")
    print()
```

### Example 2: Computing $e^x - 1$

For small $|x|$, computing $e^x - 1$ directly suffers from cancellation.

Condition number:

$$\kappa_{rel} = \left|\frac{x \cdot e^x}{e^x - 1}\right| = \left|\frac{x}{e^x - 1}\right| \cdot e^x$$

As $x \to 0$: $\kappa_{rel} \to 1$ (well-conditioned problem)

But the subtraction is ill-conditioned numerically!

**Solution**: Use `expm1(x)` function which computes $e^x - 1$ accurately.

```python
def compare_expm1_methods(x_values):
    """Compare direct and expm1 for computing e^x - 1."""
    print(f"{'x':<12} {'Direct':<20} {'expm1':<20} {'Exact':<20} {'Error(Direct)':<15} {'Error(expm1)'}")
    print("=" * 105)

    for x in x_values:
        direct = np.exp(x) - 1
        expm1_result = np.expm1(x)

        # High-precision calculation
        from decimal import Decimal, getcontext
        getcontext().prec = 50
        exact = float(Decimal(x).exp() - 1)

        error_direct = abs(direct - exact) / abs(exact) if exact != 0 else 0
        error_expm1 = abs(expm1_result - exact) / abs(exact) if exact != 0 else 0

        print(f"{x:<12.2e} {direct:<20.15f} {expm1_result:<20.15f} {exact:<20.15f} {error_direct:<15.2e} {error_expm1:<15.2e}")

x_values = [1e-1, 1e-5, 1e-10, 1e-15, 1e-20]
compare_expm1_methods(x_values)
```

### Example 3: Matrix-Vector Multiplication

For $y = Ax$ with error $\Delta x$:

$$\Delta y = A \Delta x$$

$$\|\Delta y\| \leq \|A\| \|\Delta x\|$$

Relative error:

$$\frac{\|\Delta y\|}{\|y\|} \leq \frac{\|A\| \|x\|}{\|Ax\|} \frac{\|\Delta x\|}{\|x\|}$$

The condition number is:

$$\kappa(A) = \|A\| \|A^{-1}\|$$

```python
def matrix_condition_number_demo():
    """Demonstrate condition number for matrix operations."""
    # Well-conditioned matrix
    A_good = np.array([[4, 1], [1, 3]], dtype=float)

    # Ill-conditioned matrix
    A_bad = np.array([[1, 1], [1, 1.0001]], dtype=float)

    for A, name in [(A_good, "Well-conditioned"), (A_bad, "Ill-conditioned")]:
        kappa = np.linalg.cond(A)
        print(f"\n{name} Matrix:")
        print(f"Matrix:\n{A}")
        print(f"Condition number: {kappa:.2e}")

        # Test error propagation
        x = np.array([1.0, 1.0])
        dx = np.array([1e-10, 0])

        y = A @ x
        y_perturbed = A @ (x + dx)
        dy = y_perturbed - y

        rel_error_input = np.linalg.norm(dx) / np.linalg.norm(x)
        rel_error_output = np.linalg.norm(dy) / np.linalg.norm(y)

        amplification = rel_error_output / rel_error_input

        print(f"Input relative error: {rel_error_input:.2e}")
        print(f"Output relative error: {rel_error_output:.2e}")
        print(f"Amplification factor: {amplification:.2e}")
        print(f"Condition number: {kappa:.2e}")

matrix_condition_number_demo()
```

## Sensitivity Analysis

Sensitivity analysis quantifies how output varies with inputs.

```python
def sensitivity_analysis(f, x0, param_names, delta=1e-8):
    """
    Perform sensitivity analysis for multivariate function.

    Parameters:
    - f: function taking array of parameters
    - x0: nominal parameter values
    - param_names: list of parameter names
    - delta: perturbation size
    """
    n = len(x0)
    f0 = f(x0)

    print(f"Nominal output: f(x0) = {f0:.10f}\n")
    print(f"{'Parameter':<15} {'Absolute Sens.':<20} {'Relative Sens.':<20}")
    print("=" * 55)

    sensitivities = []

    for i in range(n):
        x_perturbed = x0.copy()
        x_perturbed[i] += delta

        f_perturbed = f(x_perturbed)

        # Absolute sensitivity
        abs_sens = (f_perturbed - f0) / delta

        # Relative sensitivity
        if f0 != 0 and x0[i] != 0:
            rel_sens = (f_perturbed - f0) / f0 / (delta / x0[i])
        else:
            rel_sens = 0

        sensitivities.append((abs_sens, rel_sens))
        print(f"{param_names[i]:<15} {abs_sens:<20.10e} {rel_sens:<20.10f}")

    return sensitivities

# Example: Sensitivity of quadratic roots
def quadratic_root(params):
    """Compute smaller root of quadratic."""
    a, b, c = params
    discriminant = b**2 - 4*a*c
    if b >= 0:
        root = (-b - np.sqrt(discriminant)) / (2*a)
    else:
        root = (-b + np.sqrt(discriminant)) / (2*a)
    return root

params = np.array([1.0, 10.0, 1.0])
param_names = ['a', 'b', 'c']

print("Sensitivity Analysis: Quadratic Root")
print("Equation: ax² + bx + c = 0\n")
sensitivity_analysis(quadratic_root, params, param_names)
```

## Error Propagation in Sequences

For iterative methods $x_{n+1} = g(x_n)$:

$$\Delta x_{n+1} \approx g'(x_n) \Delta x_n$$

After $n$ iterations:

$$\Delta x_n \approx \prod_{i=0}^{n-1} g'(x_i) \cdot \Delta x_0$$

**Stability**: $|g'(x)| < 1$ at solution ensures error decreases.

```python
def error_propagation_iteration():
    """Demonstrate error propagation in iterative methods."""
    # Fixed-point iteration for sqrt(2): x = 1 + 1/x
    # Converges to x = (1 + sqrt(5))/2 ≈ 1.618 (golden ratio)
    # We want sqrt(2), so use x = (x + 2/x)/2 instead

    def g(x):
        """Iteration function for sqrt(2)."""
        return 0.5 * (x + 2/x)

    def g_prime(x):
        """Derivative of iteration function."""
        return 0.5 * (1 - 2/x**2)

    # Start with two slightly different initial values
    x0_1 = 1.0
    x0_2 = 1.0 + 1e-10

    n_iterations = 10
    values_1 = [x0_1]
    values_2 = [x0_2]
    errors = [abs(x0_2 - x0_1)]

    print(f"{'Iteration':<12} {'x1':<20} {'x2':<20} {'|x2-x1|':<15} {'Predicted':<15}")
    print("=" * 82)

    for i in range(n_iterations):
        x1 = g(values_1[-1])
        x2 = g(values_2[-1])

        values_1.append(x1)
        values_2.append(x2)

        actual_error = abs(x2 - x1)
        errors.append(actual_error)

        # Predict error using derivative
        if i > 0:
            predicted_error = abs(g_prime(values_1[-2])) * errors[-2]
        else:
            predicted_error = 0

        print(f"{i:<12} {x1:<20.15f} {x2:<20.15f} {actual_error:<15.5e} {predicted_error:<15.5e}")

    # Convergence to sqrt(2)
    print(f"\nConverged to: {values_1[-1]:.15f}")
    print(f"sqrt(2) = {np.sqrt(2):.15f}")
    print(f"|g'(√2)| = {abs(g_prime(np.sqrt(2))):.15f}")

error_propagation_iteration()
```

## Monte Carlo Error Propagation

When analytical derivatives are unavailable, use Monte Carlo:

```python
def monte_carlo_error_propagation(f, x_mean, x_std, n_samples=10000):
    """
    Estimate output uncertainty using Monte Carlo sampling.

    Parameters:
    - f: function
    - x_mean: mean input values (array)
    - x_std: standard deviations of inputs (array)
    - n_samples: number of Monte Carlo samples
    """
    n_params = len(x_mean)

    # Generate samples
    samples = np.random.normal(x_mean[:, np.newaxis],
                               x_std[:, np.newaxis],
                               size=(n_params, n_samples))

    # Evaluate function for each sample
    outputs = np.array([f(samples[:, i]) for i in range(n_samples)])

    # Statistics
    output_mean = np.mean(outputs)
    output_std = np.std(outputs, ddof=1)

    return output_mean, output_std, outputs

# Example: Quadratic formula with uncertain coefficients
def quadratic_smaller_root(params):
    a, b, c = params
    disc = b**2 - 4*a*c
    if disc < 0:
        return np.nan
    if b >= 0:
        return (-b - np.sqrt(disc)) / (2*a)
    else:
        return c / (a * (-b + np.sqrt(disc)) / (2*a))

# Uncertain parameters
x_mean = np.array([1.0, 10.0, 1.0])
x_std = np.array([0.01, 0.1, 0.01])

mean, std, samples = monte_carlo_error_propagation(
    quadratic_smaller_root, x_mean, x_std, n_samples=100000
)

print(f"Monte Carlo Error Propagation:")
print(f"Input means: a={x_mean[0]}, b={x_mean[1]}, c={x_mean[2]}")
print(f"Input stds: σ_a={x_std[0]}, σ_b={x_std[1]}, σ_c={x_std[2]}")
print(f"Output mean: {mean:.10f}")
print(f"Output std: {std:.10f}")
print(f"95% confidence interval: [{mean - 1.96*std:.10f}, {mean + 1.96*std:.10f}]")
```

## Summary

Error propagation analysis reveals:

1. **Addition/Subtraction**: Absolute errors add; cancellation is dangerous
2. **Multiplication/Division**: Relative errors add
3. **Condition numbers**: Measure sensitivity to perturbations
4. **Well-conditioned**: $\kappa \approx 1$, ill-conditioned: $\kappa \gg 1$
5. **Backward stability**: Often more achievable than forward accuracy
6. **Iterative methods**: Errors multiply by derivatives at each step

Key strategies:
- Avoid cancellation in subtraction
- Use specialized functions (expm1, log1p, etc.)
- Reformulate to improve conditioning
- Understand condition numbers of your problems
- Apply sensitivity analysis to identify critical parameters
