---
title: "Fixed-Point Iteration"
description: "Iterative method for finding fixed points where g(x) = x, foundation for many numerical algorithms"
---

# Fixed-Point Iteration

Fixed-point iteration is a fundamental technique where we reformulate $f(x) = 0$ as $x = g(x)$ and iterate $x_{n+1} = g(x_n)$.

## Theory

A **fixed point** of $g$ is a value $p$ such that $g(p) = p$.

**Fixed-Point Theorem**: If $g \in C[a,b]$ and $g(x) \in [a,b]$ for all $x \in [a,b]$, and $g$ is a contraction mapping on $[a,b]$ (i.e., $|g'(x)| < 1$), then:
1. $g$ has a unique fixed point $p \in [a,b]$
2. The iteration $x_{n+1} = g(x_n)$ converges to $p$ for any $x_0 \in [a,b]$

## Convergence Criterion

Near the fixed point:
$$x_{n+1} - p = g(x_n) - g(p) \approx g'(p)(x_n - p)$$

**Convergence condition**: $|g'(p)| < 1$

**Convergence rate**:
- If $0 < |g'(p)| < 1$: linear convergence
- If $g'(p) = 0$ and $g''(p) \neq 0$: quadratic convergence

```python
import numpy as np
import matplotlib.pyplot as plt

def fixed_point_iteration(g, x0, tol=1e-10, max_iter=100):
    """
    Fixed-point iteration.
    
    Solves x = g(x) by iterating x_{n+1} = g(x_n)
    """
    history = [x0]
    x = x0
    
    for i in range(max_iter):
        x_new = g(x)
        history.append(x_new)
        
        if abs(x_new - x) < tol:
            return x_new, i + 1, history
        
        x = x_new
    
    return x, max_iter, history

# Example 1: x = cos(x)
g1 = lambda x: np.cos(x)
root1, iters1, hist1 = fixed_point_iteration(g1, 0.5)

print(f"Example 1: x = cos(x)")
print(f"Fixed point: {root1:.15f}")
print(f"Verification: cos({root1:.15f}) = {np.cos(root1):.15f}")
print(f"Iterations: {iters1}\n")

# Example 2: x² - 2 = 0, reformulated as x = 2/x
g2 = lambda x: 2 / x
root2, iters2, hist2 = fixed_point_iteration(g2, 1.5, tol=1e-10)

print(f"Example 2: x = 2/x (√2)")
print(f"Fixed point: {root2:.15f}")
print(f"√2 = {np.sqrt(2):.15f}")
print(f"Iterations: {iters2}\n")

# Example 3: Different reformulations
print("Different reformulations of x² - 2 = 0:")

# g(x) = x² - 2 + x (diverges)
# g(x) = √2 (trivial)
# g(x) = (x² + 2)/(2x) (Newton's method!)
g3 = lambda x: (x**2 + 2) / (2 * x)
root3, iters3, _ = fixed_point_iteration(g3, 1.5, tol=1e-10)
print(f"g(x) = (x² + 2)/(2x): {iters3} iterations")
```

## Visualizing Convergence

```python
def visualize_fixed_point(g, x0, true_root, title=""):
    """Visualize fixed-point iteration on cobweb plot."""
    # Generate iteration history
    x, _, history = fixed_point_iteration(g, x0, max_iter=20)
    
    # Create cobweb plot
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5))
    
    # Cobweb plot
    x_plot = np.linspace(min(history) - 0.5, max(history) + 0.5, 1000)
    ax1.plot(x_plot, g(x_plot), 'b-', label='y = g(x)', linewidth=2)
    ax1.plot(x_plot, x_plot, 'k--', label='y = x', alpha=0.5)
    
    # Draw cobweb
    for i in range(len(history) - 1):
        ax1.plot([history[i], history[i]], [history[i], history[i+1]], 'r-', alpha=0.5)
        ax1.plot([history[i], history[i+1]], [history[i+1], history[i+1]], 'r-', alpha=0.5)
    
    ax1.plot(history[0], g(history[0]), 'go', markersize=10, label='Start')
    ax1.plot(history[-1], history[-1], 'ro', markersize=10, label='End')
    ax1.set_xlabel('x')
    ax1.set_ylabel('y')
    ax1.set_title(f'Cobweb Plot: {title}')
    ax1.legend()
    ax1.grid(True, alpha=0.3)
    
    # Convergence plot
    errors = [abs(h - true_root) for h in history]
    ax2.semilogy(range(len(errors)), errors, 'bo-', linewidth=2, markersize=5)
    ax2.set_xlabel('Iteration')
    ax2.set_ylabel('|x_n - p|')
    ax2.set_title('Convergence History')
    ax2.grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.savefig('fixed_point_visualization.png', dpi=150, bbox_inches='tight')
    plt.close()

visualize_fixed_point(g1, 0.5, root1, "x = cos(x)")
print("Visualization saved")
```

## Reformulation Strategies

To solve $f(x) = 0$:

1. **Direct**: $g(x) = x + f(x)$
2. **Scaled**: $g(x) = x + \alpha f(x)$ (choose $\alpha$ to make $|g'(p)| < 1$)
3. **Inverted**: $g(x) = x - f(x)/f'(x)$ (Newton's method!)

```python
def test_reformulations():
    """Test different reformulations of f(x) = x³ - x - 1 = 0."""
    f = lambda x: x**3 - x - 1
    true_root = 1.3247179572447  # Approximate
    
    reformulations = [
        (lambda x: x**3 - 1, "g(x) = x³ - 1"),
        (lambda x: (x + 1)**(1/3), "g(x) = ∛(x + 1)"),
        (lambda x: (x + 1) / x**2, "g(x) = (x + 1)/x²"),
        (lambda x: x - f(x) / (3*x**2 - 1), "Newton"),
    ]
    
    print("\nReformulation comparison:")
    print(f"{'Reformulation':<25} {'Converged?':<12} {'Iterations':<12}")
    print("=" * 52)
    
    for g, name in reformulations:
        try:
            root, iters, _ = fixed_point_iteration(g, 1.5, max_iter=50)
            converged = abs(root - true_root) < 1e-6
            print(f"{name:<25} {'Yes' if converged else 'No':<12} {iters:<12}")
        except:
            print(f"{name:<25} {'Failed':<12} {'-':<12}")

test_reformulations()
```

## Aitken's Δ² Process

Accelerates linearly convergent sequences:

$$\tilde{x}_n = x_n - \frac{(x_{n+1} - x_n)^2}{x_{n+2} - 2x_{n+1} + x_n}$$

```python
def aitken_acceleration(sequence):
    """Apply Aitken's Δ² process to accelerate convergence."""
    n = len(sequence)
    accelerated = []
    
    for i in range(n - 2):
        x0, x1, x2 = sequence[i], sequence[i+1], sequence[i+2]
        denom = x2 - 2*x1 + x0
        if abs(denom) > 1e-15:
            x_acc = x0 - (x1 - x0)**2 / denom
            accelerated.append(x_acc)
    
    return accelerated

# Test
g = lambda x: np.cos(x)
_, _, history = fixed_point_iteration(g, 0.5, max_iter=20)
accelerated = aitken_acceleration(history)

print(f"\nAitken Acceleration:")
print(f"Standard (20 iter): {history[-1]:.15f}")
print(f"Aitken (18 values): {accelerated[-1]:.15f}")
print(f"Improvement: {abs(accelerated[-1] - history[-1]):.2e}")
```

## Summary

Fixed-point iteration:
- **Simple and general** framework
- **Requires** $|g'(p)| < 1$ for convergence
- **Reformulation matters** - choose $g$ carefully
- **Can be accelerated** with Aitken's method
- **Foundation** for Newton's method and many iterative schemes
