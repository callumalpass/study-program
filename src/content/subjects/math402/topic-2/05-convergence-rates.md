---
title: "Convergence Rates"
description: "Analysis and comparison of convergence rates for root-finding algorithms"
---

# Convergence Rates

Understanding convergence rates helps choose appropriate algorithms and predict computational cost.

## Order of Convergence

A sequence $\{x_n\}$ converging to $p$ has **order of convergence** $\alpha$ if:

$$\lim_{n \to \infty} \frac{|x_{n+1} - p|}{|x_n - p|^\alpha} = \lambda$$

where $0 < \lambda < \infty$ is the **asymptotic error constant**.

- $\alpha = 1, \lambda < 1$: **Linear convergence**
- $\alpha = 2$: **Quadratic convergence**
- $1 < \alpha < 2$: **Superlinear convergence**

## Common Methods

| Method | Order $\alpha$ | Conditions | Function Evals/Iter |
|--------|----------------|------------|---------------------|
| Bisection | 1 ($\lambda = 0.5$) | Bracketing interval | 1 |
| Fixed-point | 1 | $\|g'(p)\| < 1$ | 1 |
| Secant | $\phi \approx 1.618$ | Simple root | 1 |
| Newton | 2 | Simple root, $f' \neq 0$ | 2 (f and f') |
| Halley | 3 | Simple root | 3 (f, f', f'') |

```python
import numpy as np
import matplotlib.pyplot as plt

def estimate_convergence_order(errors):
    """
    Estimate convergence order from error sequence.
    
    Uses log-log regression on consecutive errors.
    """
    errors = np.array([e for e in errors if e > 0])
    if len(errors) < 3:
        return None
    
    # Use last few iterations for better estimate
    n = min(5, len(errors) - 1)
    ratios = []
    
    for i in range(len(errors) - n, len(errors) - 1):
        if errors[i] > 1e-15 and errors[i+1] > 1e-15:
            alpha = np.log(errors[i+1]) / np.log(errors[i])
            ratios.append(alpha)
    
    return np.mean(ratios) if ratios else None

# Test different methods
def test_convergence_rates():
    """Compare convergence rates experimentally."""
    f = lambda x: x**2 - 2
    f_prime = lambda x: 2*x
    f_double_prime = lambda x: 2
    true_root = np.sqrt(2)
    
    # Bisection
    def bisection_errors():
        a, b = 1, 2
        errors = []
        for _ in range(20):
            c = (a + b) / 2
            errors.append(abs(c - true_root))
            if f(a) * f(c) < 0:
                b = c
            else:
                a = c
        return errors
    
    # Newton
    def newton_errors():
        x = 1.5
        errors = []
        for _ in range(10):
            errors.append(abs(x - true_root))
            x = x - f(x) / f_prime(x)
        return errors
    
    # Secant
    def secant_errors():
        x0, x1 = 1.0, 2.0
        errors = [abs(x0 - true_root), abs(x1 - true_root)]
        for _ in range(15):
            f0, f1 = f(x0), f(x1)
            x2 = x1 - f1 * (x1 - x0) / (f1 - f0)
            errors.append(abs(x2 - true_root))
            x0, x1 = x1, x2
        return errors
    
    methods = [
        (bisection_errors(), "Bisection", 1.0),
        (newton_errors(), "Newton", 2.0),
        (secant_errors(), "Secant", 1.618),
    ]
    
    print("Convergence Rate Estimates:")
    print(f"{'Method':<15} {'Estimated α':<15} {'Theoretical α':<15}")
    print("=" * 45)
    
    for errors, name, theoretical in methods:
        estimated = estimate_convergence_order(errors)
        print(f"{name:<15} {estimated if estimated else 'N/A':<15.3f} {theoretical:<15.3f}")
    
    # Plot
    plt.figure(figsize=(12, 5))
    
    for errors, name, _ in methods:
        plt.semilogy(range(len(errors)), errors, 'o-', label=name, linewidth=2, markersize=5)
    
    plt.xlabel('Iteration')
    plt.ylabel('|x_n - √2|')
    plt.title('Convergence Comparison')
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.savefig('convergence_rates_comparison.png', dpi=150, bbox_inches='tight')
    plt.close()
    print("\nPlot saved")

test_convergence_rates()
```

## Efficiency Index

Accounts for computational cost:

$$E = \alpha^{1/p}$$

where $p$ is the number of function evaluations per iteration.

```python
def efficiency_comparison():
    """Compare efficiency indices."""
    methods = [
        ("Bisection", 1, 1),
        ("Secant", 1.618, 1),
        ("Newton", 2, 2),
        ("Halley", 3, 3),
    ]
    
    print("\nEfficiency Analysis:")
    print(f"{'Method':<15} {'Order α':<10} {'Evals/Iter':<12} {'Efficiency E':<15}")
    print("=" * 55)
    
    for name, alpha, evals in methods:
        efficiency = alpha ** (1 / evals)
        print(f"{name:<15} {alpha:<10.3f} {evals:<12} {efficiency:<15.3f}")

efficiency_comparison()
```

## Determining Order Experimentally

```python
def compute_convergence_factors(errors):
    """Compute convergence factors for different assumed orders."""
    print(f"\n{'n':<5} {'Error':<15} {'α=1':<12} {'α=1.6':<12} {'α=2':<12}")
    print("=" * 60)
    
    for i in range(min(10, len(errors) - 1)):
        e_n = errors[i]
        e_n1 = errors[i+1]
        
        if e_n > 1e-15:
            factor_1 = e_n1 / e_n
            factor_16 = e_n1 / (e_n ** 1.6)
            factor_2 = e_n1 / (e_n ** 2)
            
            print(f"{i:<5} {e_n:<15.2e} {factor_1:<12.5f} {factor_16:<12.5f} {factor_2:<12.5f}")

# Test on Newton's method
f = lambda x: x**3 - 2
f_prime = lambda x: 3*x**2
true_root = 2**(1/3)

x = 2.0
errors = []
for _ in range(8):
    errors.append(abs(x - true_root))
    x = x - f(x) / f_prime(x)

print("Newton's Method on x³ - 2 = 0:")
compute_convergence_factors(errors)
```

## Summary

Convergence rate analysis:
- **Determines iteration count** needed for accuracy
- **Newton typically fastest** for smooth functions
- **Secant good compromise** when derivatives expensive
- **Bisection most robust** but slowest
- **Consider efficiency index** not just convergence order
