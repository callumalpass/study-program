---
title: "Newton's Method"
description: "Fast quadratically convergent root-finding algorithm using function derivatives"
---

# Newton's Method

Newton's method (also called Newton-Raphson method) is one of the most powerful and widely used root-finding algorithms, featuring quadratic convergence near simple roots.

## Derivation

From Taylor expansion around $x_n$:

$$f(x) \approx f(x_n) + f'(x_n)(x - x_n)$$

Setting $f(x) = 0$ and solving for $x$:

$$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$$

**Geometric interpretation**: $x_{n+1}$ is where the tangent line at $(x_n, f(x_n))$ crosses the x-axis.

## Algorithm

1. Choose initial guess $x_0$
2. For $n = 0, 1, 2, \ldots$:
   $$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$$
3. Stop when $|x_{n+1} - x_n| < \epsilon$ or $|f(x_{n+1})| < \epsilon$

```mermaid
flowchart TD
    A[Start: initial guess x₀] --> B[Evaluate f x_n and f' x_n]
    B --> C{f' x_n ≈ 0?}
    C -->|Yes| D[Derivative too small: fail or restart]
    C -->|No| E["Compute x_{n+1} = x_n - f(x_n)/f'(x_n)"]
    E --> F{Converged?<br/>|x_{n+1} - x_n| < ε}
    F -->|Yes| G[Return x_{n+1} as root]
    F -->|No| H{Max iterations?}
    H -->|Yes| I[Return current estimate]
    H -->|No| J[n = n + 1]
    J --> B
```

The geometric interpretation shows how Newton's method uses tangent lines to find roots:

```plot
{
  "xAxis": { "domain": [0, 3] },
  "yAxis": { "domain": [-2, 8] },
  "grid": true,
  "data": [
    { "fn": "x^2 - 2", "color": "#3b82f6" },
    { "fn": "0", "color": "#6b7280" },
    { "fn": "4*(x - 2)", "color": "#ef4444" }
  ]
}
```

This shows $f(x) = x^2 - 2$ and a tangent line at $x = 2$. The tangent intersects the x-axis at $x = 1.5$, giving the next Newton iterate.

## Convergence Analysis

**Theorem**: If $f$ is twice continuously differentiable, $f(r) = 0$, and $f'(r) \neq 0$, then Newton's method converges **quadratically** from sufficiently close initial guesses:

$$\lim_{n \to \infty} \frac{|e_{n+1}|}{|e_n|^2} = \frac{|f''(r)|}{2|f'(r)|}$$

where $e_n = x_n - r$.

**Quadratic convergence** means the number of correct digits approximately doubles each iteration.

```python
import numpy as np
import matplotlib.pyplot as plt

def newton_method(f, f_prime, x0, tol=1e-10, max_iter=50):
    """
    Newton's method for root finding.

    Parameters:
    - f: function
    - f_prime: derivative of f
    - x0: initial guess
    - tol: tolerance
    - max_iter: maximum iterations

    Returns:
    - root: approximate root
    - iterations: number of iterations
    - history: convergence history
    """
    history = {'x': [x0], 'f': [f(x0)], 'errors': []}

    x = x0
    for i in range(max_iter):
        fx = f(x)
        fpx = f_prime(x)

        if abs(fpx) < 1e-15:
            raise ValueError(f"Derivative too small at iteration {i}")

        x_new = x - fx / fpx

        history['x'].append(x_new)
        history['f'].append(f(x_new))

        # Check convergence
        if abs(x_new - x) < tol or abs(f(x_new)) < tol:
            history['iterations'] = i + 1
            return x_new, i + 1, history

        x = x_new

    history['iterations'] = max_iter
    return x, max_iter, history

# Example 1: √2
f1 = lambda x: x**2 - 2
f1_prime = lambda x: 2*x

root1, iters1, hist1 = newton_method(f1, f1_prime, x0=1.5)
print("Example 1: x² - 2 = 0")
print(f"Root: {root1:.15f}")
print(f"√2:   {np.sqrt(2):.15f}")
print(f"Error: {abs(root1 - np.sqrt(2)):.2e}")
print(f"Iterations: {iters1}\n")

# Example 2: cos(x) = x
f2 = lambda x: np.cos(x) - x
f2_prime = lambda x: -np.sin(x) - 1

root2, iters2, hist2 = newton_method(f2, f2_prime, x0=1.0)
print("Example 2: cos(x) - x = 0")
print(f"Root: {root2:.15f}")
print(f"f(root): {f2(root2):.2e}")
print(f"Iterations: {iters2}\n")

# Example 3: x³ - 2x - 5 = 0
f3 = lambda x: x**3 - 2*x - 5
f3_prime = lambda x: 3*x**2 - 2

root3, iters3, hist3 = newton_method(f3, f3_prime, x0=2.0)
print("Example 3: x³ - 2x - 5 = 0")
print(f"Root: {root3:.15f}")
print(f"f(root): {f3(root3):.2e}")
print(f"Iterations: {iters3}")

# Demonstrate quadratic convergence
def demonstrate_quadratic_convergence():
    """Show doubling of correct digits."""
    f = lambda x: x**2 - 2
    f_prime = lambda x: 2*x
    true_root = np.sqrt(2)

    x = 1.5
    print("\n\nQuadratic Convergence (number of correct digits doubles):")
    print(f"{'Iter':<6} {'x_n':<20} {'Error':<15} {'Digits'}")
    print("=" * 55)

    for i in range(8):
        error = abs(x - true_root)
        if error > 0:
            digits = -np.log10(error)
        else:
            digits = float('inf')

        print(f"{i:<6} {x:<20.15f} {error:<15.2e} {digits:<10.2f}")

        x = x - f(x) / f_prime(x)

demonstrate_quadratic_convergence()
```

## Visual Basin of Attraction

```python
def newton_basins(f, f_prime, roots, xrange, yrange, resolution=500):
    """
    Visualize basins of attraction for Newton's method in complex plane.

    Shows which initial points converge to which roots.
    """
    x = np.linspace(xrange[0], xrange[1], resolution)
    y = np.linspace(yrange[0], yrange[1], resolution)
    X, Y = np.meshgrid(x, y)
    Z = X + 1j*Y

    # Apply Newton's method
    result = np.zeros_like(Z, dtype=int)
    max_iter = 50

    for i in range(resolution):
        for j in range(resolution):
            z = Z[i, j]
            for _ in range(max_iter):
                fz = f(z)
                fpz = f_prime(z)
                if abs(fpz) < 1e-10:
                    break
                z = z - fz / fpz

                # Check convergence to roots
                for k, root in enumerate(roots):
                    if abs(z - root) < 1e-3:
                        result[i, j] = k + 1
                        break

    plt.figure(figsize=(10, 8))
    plt.imshow(result, extent=[xrange[0], xrange[1], yrange[0], yrange[1]],
               origin='lower', cmap='tab10', interpolation='bilinear')
    plt.colorbar(label='Root Index')
    plt.title("Newton's Method: Basins of Attraction")
    plt.xlabel('Re(z)')
    plt.ylabel('Im(z)')
    plt.savefig('newton_basins.png', dpi=150, bbox_inches='tight')
    plt.close()

# Example: z³ - 1 = 0 (three cube roots of unity)
f = lambda z: z**3 - 1
f_prime = lambda z: 3*z**2
roots = [1, np.exp(2j*np.pi/3), np.exp(4j*np.pi/3)]

newton_basins(f, f_prime, roots, [-2, 2], [-2, 2])
print("Basin of attraction plot saved")
```

## Practical Considerations

### Choosing Initial Guess

```python
def test_initial_guess_sensitivity():
    """Show how initial guess affects convergence."""
    f = lambda x: x**3 - 2*x - 5
    f_prime = lambda x: 3*x**2 - 2

    true_root = 2.0945514815423265  # Approximate true root

    initial_guesses = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 5.0]

    print("\n\nInitial Guess Sensitivity:")
    print(f"{'x0':<8} {'Converged':<12} {'Iterations':<12} {'Final Root':<20}")
    print("=" * 55)

    for x0 in initial_guesses:
        try:
            root, iters, _ = newton_method(f, f_prime, x0, max_iter=50)
            converged = abs(root - true_root) < 1e-6
            print(f"{x0:<8.2f} {'Yes' if converged else 'No':<12} {iters:<12} {root:<20.10f}")
        except Exception as e:
            print(f"{x0:<8.2f} {'Failed':<12} {'-':<12} {str(e)[:20]:<20}")

test_initial_guess_sensitivity()
```

### Safeguarded Newton's Method

```python
def safeguarded_newton(f, f_prime, a, b, tol=1e-10, max_iter=50):
    """
    Newton's method with bisection safeguard.

    Combines speed of Newton with reliability of bisection.
    """
    if f(a) * f(b) >= 0:
        raise ValueError("f(a) and f(b) must have opposite signs")

    # Start with midpoint
    x = (a + b) / 2

    for i in range(max_iter):
        fx = f(x)
        fpx = f_prime(x)

        if abs(fpx) < 1e-15:
            # Derivative too small, use bisection
            x_new = (a + b) / 2
        else:
            # Try Newton step
            x_new = x - fx / fpx

            # Check if Newton step is within bounds
            if x_new < a or x_new > b:
                # Outside bounds, use bisection
                x_new = (a + b) / 2

        # Update interval
        if f(a) * f(x_new) < 0:
            b = x_new
        else:
            a = x_new

        if abs(x_new - x) < tol or abs(f(x_new)) < tol:
            return x_new, i + 1

        x = x_new

    return x, max_iter

# Test
f = lambda x: x**3 - 2*x - 5
f_prime = lambda x: 3*x**2 - 2

root_safe, iters_safe = safeguarded_newton(f, f_prime, 2, 3)
root_newton, iters_newton, _ = newton_method(f, f_prime, 2.5)

print(f"\n\nSafeguarded vs Standard Newton:")
print(f"Safeguarded: {iters_safe} iterations, root = {root_safe:.15f}")
print(f"Standard: {iters_newton} iterations, root = {root_newton:.15f}")
```

## Special Cases and Difficulties

### Multiple Roots

For multiple roots ($f(r) = f'(r) = 0$), convergence is only linear:

$$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)} \approx x_n - \frac{(x_n - r)^m}{m}$$

**Modified Newton** for multiplicity $m$:

$$x_{n+1} = x_n - m\frac{f(x_n)}{f'(x_n)}$$

```python
def modified_newton(f, f_prime, x0, multiplicity=1, tol=1e-10, max_iter=50):
    """Newton's method modified for multiple roots."""
    x = x0
    history = [x0]

    for i in range(max_iter):
        fx = f(x)
        fpx = f_prime(x)

        if abs(fpx) < 1e-15:
            break

        x_new = x - multiplicity * fx / fpx
        history.append(x_new)

        if abs(x_new - x) < tol:
            return x_new, i + 1, history

        x = x_new

    return x, max_iter, history

# Test with f(x) = (x-2)³
f = lambda x: (x - 2)**3
f_prime = lambda x: 3*(x - 2)**2

print("\n\nMultiple Root (x-2)³ = 0:")
root_std, iters_std, _ = newton_method(f, f_prime, 1.5, tol=1e-10)
root_mod, iters_mod, _ = modified_newton(f, f_prime, 1.5, multiplicity=3, tol=1e-10)

print(f"Standard Newton: {iters_std} iterations")
print(f"Modified Newton (m=3): {iters_mod} iterations")
```

## Applications

### Computing Reciprocals

Without division: find $x$ such that $f(x) = \frac{1}{x} - a = 0$

$$x_{n+1} = x_n - \frac{1/x_n - a}{-1/x_n^2} = x_n(2 - ax_n)$$

```python
def reciprocal_newton(a, x0=0.5, tol=1e-15):
    """Compute 1/a using Newton's method without division."""
    x = x0
    for i in range(20):
        x_new = x * (2 - a * x)
        if abs(x_new - x) < tol:
            return x_new, i + 1
        x = x_new
    return x, 20

a = 7.0
recip, iters = reciprocal_newton(a)
print(f"\n\nReciprocal of {a}:")
print(f"Newton result: {recip:.15f}")
print(f"True value: {1/a:.15f}")
print(f"Iterations: {iters}")
```

### Integer Square Root

```python
def isqrt_newton(n):
    """Integer square root using Newton's method."""
    if n == 0:
        return 0

    x = n
    while True:
        x_new = (x + n // x) // 2
        if x_new >= x:
            return x
        x = x_new

print(f"\nInteger square root of 12345: {isqrt_newton(12345)}")
print(f"Verification: {isqrt_newton(12345)**2} < 12345 < {(isqrt_newton(12345)+1)**2}")
```

## Comparison with Other Methods

```python
def compare_methods():
    """Compare convergence rates of different methods."""
    from scipy.optimize import brentq

    f = lambda x: x**3 - 2*x - 5
    f_prime = lambda x: 3*x**2 - 2

    # Bisection
    def bisection_simple(f, a, b, tol):
        n = int(np.ceil(np.log2((b - a) / tol)))
        for _ in range(n):
            c = (a + b) / 2
            if f(a) * f(c) < 0:
                b = c
            else:
                a = c
        return (a + b) / 2, n

    root_bisect, iters_bisect = bisection_simple(f, 2, 3, 1e-10)
    root_newton, iters_newton, _ = newton_method(f, f_prime, 2.5, tol=1e-10)
    root_brent = brentq(f, 2, 3, xtol=1e-10)

    print("\n\nMethod Comparison for x³ - 2x - 5 = 0:")
    print(f"{'Method':<20} {'Iterations':<12} {'Root':<20}")
    print("=" * 55)
    print(f"{'Bisection':<20} {iters_bisect:<12} {root_bisect:<20.12f}")
    print(f"{'Newton':<20} {iters_newton:<12} {root_newton:<20.12f}")
    print(f"{'Brent (SciPy)':<20} {'-':<12} {root_brent:<20.12f}")

compare_methods()
```

## Summary

Newton's method is exceptionally powerful when applicable:

- **Quadratic convergence** near simple roots (digits double per iteration)
- **Requires derivative** $f'(x)$
- **Sensitive to initial guess** - may diverge if started far from root
- **Can fail** at critical points where $f'(x) = 0$
- **Best for** smooth functions with known derivatives and good initial guesses

Use safeguarded versions or combine with bisection for robustness.
