---
title: "Bisection Method"
description: "Robust root-finding algorithm based on the Intermediate Value Theorem with guaranteed convergence"
---

# Bisection Method

The bisection method is the simplest and most robust root-finding algorithm, guaranteed to converge for continuous functions.

## The Intermediate Value Theorem

If $f$ is continuous on $[a, b]$ and $f(a) \cdot f(b) < 0$, then there exists $c \in (a, b)$ such that $f(c) = 0$.

## Algorithm

1. Start with interval $[a_0, b_0]$ where $f(a_0) \cdot f(b_0) < 0$
2. Compute midpoint: $c_n = \frac{a_n + b_n}{2}$
3. Evaluate $f(c_n)$:
   - If $f(c_n) = 0$, done
   - If $f(a_n) \cdot f(c_n) < 0$, set $[a_{n+1}, b_{n+1}] = [a_n, c_n]$
   - Otherwise, set $[a_{n+1}, b_{n+1}] = [c_n, b_n]$
4. Repeat until $|b_n - a_n| < \epsilon$

## Convergence Analysis

After $n$ iterations, the interval width is:

$$|b_n - a_n| = \frac{|b_0 - a_0|}{2^n}$$

Error bound:

$$|c_n - r| \leq \frac{b_0 - a_0}{2^{n+1}}$$

**Convergence rate**: Linear with rate $\frac{1}{2}$

Number of iterations to achieve tolerance $\epsilon$:

$$n \geq \log_2\left(\frac{b_0 - a_0}{\epsilon}\right)$$

```python
import numpy as np
import matplotlib.pyplot as plt

def bisection(f, a, b, tol=1e-6, max_iter=100):
    """
    Bisection method for root finding.

    Parameters:
    - f: function
    - a, b: initial interval endpoints
    - tol: tolerance
    - max_iter: maximum iterations

    Returns:
    - root: approximate root
    - iterations: number of iterations
    - history: convergence history
    """
    # Check initial conditions
    if f(a) * f(b) >= 0:
        raise ValueError("f(a) and f(b) must have opposite signs")

    history = {'iterations': [], 'midpoints': [], 'intervals': [], 'errors': []}

    for i in range(max_iter):
        c = (a + b) / 2
        fc = f(c)

        # Store history
        history['iterations'].append(i)
        history['midpoints'].append(c)
        history['intervals'].append(b - a)

        # Check convergence
        if abs(b - a) < tol or abs(fc) < tol:
            history['final_iter'] = i
            return c, i, history

        # Update interval
        if f(a) * fc < 0:
            b = c
        else:
            a = c

    return (a + b) / 2, max_iter, history

# Example 1: f(x) = x² - 2 (find √2)
f1 = lambda x: x**2 - 2
root1, iters1, hist1 = bisection(f1, 1, 2, tol=1e-10)

print("Example 1: x² - 2 = 0")
print(f"Root: {root1:.15f}")
print(f"√2:   {np.sqrt(2):.15f}")
print(f"Error: {abs(root1 - np.sqrt(2)):.2e}")
print(f"Iterations: {iters1}\n")

# Example 2: f(x) = x³ - x - 2 (real root ≈ 1.52)
f2 = lambda x: x**3 - x - 2
root2, iters2, hist2 = bisection(f2, 1, 2, tol=1e-10)

print("Example 2: x³ - x - 2 = 0")
print(f"Root: {root2:.15f}")
print(f"Verification f(root): {f2(root2):.2e}")
print(f"Iterations: {iters2}\n")

# Example 3: Transcendental equation
f3 = lambda x: x - np.cos(x)
root3, iters3, hist3 = bisection(f3, 0, 1, tol=1e-10)

print("Example 3: x - cos(x) = 0")
print(f"Root: {root3:.15f}")
print(f"Verification f(root): {f3(root3):.2e}")
print(f"Iterations: {iters3}")

# Visualize convergence
def plot_bisection_convergence(histories, labels):
    """Plot convergence history for bisection method."""
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5))

    for hist, label in zip(histories, labels):
        iterations = hist['iterations']
        intervals = hist['intervals']

        # Plot interval width
        ax1.semilogy(iterations, intervals, 'o-', label=label, linewidth=2, markersize=4)

        # Theoretical convergence
        if len(iterations) > 0:
            theoretical = [intervals[0] / 2**i for i in iterations]
            ax1.semilogy(iterations, theoretical, '--', alpha=0.5)

    ax1.set_xlabel('Iteration')
    ax1.set_ylabel('Interval Width')
    ax1.set_title('Bisection Method: Interval Reduction')
    ax1.legend()
    ax1.grid(True, alpha=0.3)

    # Plot convergence rate
    for hist, label in zip(histories, labels):
        iterations = hist['iterations'][1:]
        if len(iterations) > 1:
            intervals = hist['intervals']
            ratios = [intervals[i+1]/intervals[i] for i in range(len(intervals)-1)]
            ax2.plot(iterations, ratios, 'o-', label=label, linewidth=2, markersize=4)

    ax2.axhline(y=0.5, color='k', linestyle='--', label='Theoretical (0.5)')
    ax2.set_xlabel('Iteration')
    ax2.set_ylabel('Reduction Ratio')
    ax2.set_title('Convergence Rate')
    ax2.legend()
    ax2.grid(True, alpha=0.3)

    plt.tight_layout()
    plt.savefig('bisection_convergence.png', dpi=150, bbox_inches='tight')
    plt.close()

plot_bisection_convergence([hist1, hist2, hist3],
                           ['x² - 2', 'x³ - x - 2', 'x - cos(x)'])

print("\nConvergence plot saved to bisection_convergence.png")
```

## Advantages and Disadvantages

### Advantages

1. **Guaranteed convergence** if initial interval brackets root
2. **Simple to implement** and understand
3. **Robust**: Works for any continuous function
4. **Predictable**: Number of iterations known in advance
5. **No derivative required**

### Disadvantages

1. **Slow convergence**: Only linear
2. **Requires bracketing interval**: Must find $[a,b]$ with $f(a) \cdot f(b) < 0$
3. **One root only**: Finds single root in interval
4. **Cannot find roots** where $f$ doesn't change sign (e.g., $x^2 = 0$)

## Applications

```python
# Application 1: Finding machine epsilon
def find_machine_epsilon():
    """Use bisection to find machine epsilon."""
    def f(eps):
        return (1.0 + eps) - 1.0

    eps, iters, _ = bisection(f, 0, 1, tol=1e-20)
    print(f"Machine epsilon (bisection): {eps:.2e}")
    print(f"NumPy machine epsilon: {np.finfo(float).eps:.2e}")
    print(f"Iterations: {iters}")

find_machine_epsilon()

# Application 2: Inverse interpolation
def inverse_interpolation_example():
    """Find x such that f(x) = y using bisection."""
    # Given: f(x) = x³, find x such that f(x) = 10
    target = 10
    f = lambda x: x**3 - target

    root, iters, _ = bisection(f, 0, 10, tol=1e-10)
    print(f"\nInverse interpolation: x³ = {target}")
    print(f"x = {root:.10f}")
    print(f"∛10 = {target**(1/3):.10f}")
    print(f"Iterations: {iters}")

inverse_interpolation_example()

# Application 3: Equation with multiple solutions
def multiple_roots_example():
    """Find all roots in an interval by subdividing."""
    f = lambda x: (x - 1) * (x - 2) * (x - 3)

    # Search for sign changes in [0, 4]
    x_test = np.linspace(0, 4, 100)
    roots = []

    for i in range(len(x_test) - 1):
        if f(x_test[i]) * f(x_test[i+1]) < 0:
            root, _, _ = bisection(f, x_test[i], x_test[i+1], tol=1e-10)
            roots.append(root)

    print(f"\nMultiple roots of (x-1)(x-2)(x-3) = 0:")
    for i, root in enumerate(roots, 1):
        print(f"Root {i}: {root:.10f}")

multiple_roots_example()
```

## Implementation Variations

### Modified Bisection (Regula Falsi Hybrid)

```python
def bisection_weighted(f, a, b, tol=1e-6, max_iter=100):
    """
    Bisection with weighted midpoint based on function values.

    Uses weighted average c = (a*|f(b)| + b*|f(a)|) / (|f(a)| + |f(b)|)
    instead of simple midpoint when advantageous.
    """
    history = []

    for i in range(max_iter):
        fa, fb = f(a), f(b)

        # Try weighted midpoint
        if abs(fa) + abs(fb) > 1e-15:
            c_weighted = (a * abs(fb) + b * abs(fa)) / (abs(fa) + abs(fb))
        else:
            c_weighted = (a + b) / 2

        # Use bisection midpoint
        c_bisect = (a + b) / 2

        # Choose better estimate
        if abs(c_weighted - c_bisect) < 0.1 * (b - a):
            c = c_weighted
        else:
            c = c_bisect

        fc = f(c)
        history.append((i, c, b - a))

        if abs(b - a) < tol or abs(fc) < tol:
            return c, i, history

        if fa * fc < 0:
            b, fb = c, fc
        else:
            a, fa = c, fc

    return (a + b) / 2, max_iter, history

# Compare with standard bisection
f = lambda x: x**3 - 2
root_std, iters_std, _ = bisection(f, 1, 2, tol=1e-10)
root_mod, iters_mod, _ = bisection_weighted(f, 1, 2, tol=1e-10)

print(f"\nComparison on x³ - 2 = 0:")
print(f"Standard bisection: {iters_std} iterations")
print(f"Weighted bisection: {iters_mod} iterations")
```

## Error Analysis

The error at iteration $n$ satisfies:

$$|e_n| = |c_n - r| \leq \frac{b_n - a_n}{2} = \frac{b_0 - a_0}{2^{n+1}}$$

This is a **guaranteed a priori bound**.

```python
def verify_error_bound():
    """Verify theoretical error bound for bisection."""
    f = lambda x: x**2 - 2
    true_root = np.sqrt(2)
    a, b = 1, 2

    print("\nError Bound Verification:")
    print(f"{'Iter':<6} {'Approx':<18} {'Error':<15} {'Bound':<15} {'Ratio'}")
    print("=" * 70)

    for i in range(1, 16):
        root, _, _ = bisection(f, a, b, max_iter=i)
        error = abs(root - true_root)
        bound = (b - a) / 2**(i + 1)
        ratio = error / bound

        print(f"{i:<6} {root:<18.12f} {error:<15.2e} {bound:<15.2e} {ratio:<15.3f}")

verify_error_bound()
```

## Summary

The bisection method is a fundamental root-finding algorithm:

- **Guaranteed convergence** with bracketing interval
- **Linear convergence** rate (halves interval each iteration)
- **Robust and simple** but slower than advanced methods
- **Ideal for** initial root approximation or when reliability is crucial
- **Predictable cost**: $\lceil \log_2((b-a)/\epsilon) \rceil$ iterations

Best used as a reliable fallback or starting point for faster methods.
