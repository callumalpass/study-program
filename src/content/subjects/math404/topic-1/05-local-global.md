---
title: "Local vs Global Optimality"
description: "Understanding local and global optima, and conditions that distinguish them"
---

# Local vs Global Optimality

## Definitions

### Global Minimum

A point $x^* \in \mathcal{F}$ is a **global minimum** (or **global minimizer**) if:

$$
f(x^*) \leq f(x) \quad \text{for all } x \in \mathcal{F}
$$

The value $f^* = f(x^*)$ is called the **optimal value** or **global minimum value**.

**Strict global minimum**: The inequality is strict for all $x \neq x^*$:

$$
f(x^*) < f(x) \quad \text{for all } x \in \mathcal{F}, \; x \neq x^*
$$

### Local Minimum

A point $x^* \in \mathcal{F}$ is a **local minimum** if there exists $\epsilon > 0$ such that:

$$
f(x^*) \leq f(x) \quad \text{for all } x \in \mathcal{F} \cap B(x^*, \epsilon)
$$

where $B(x^*, \epsilon) = \{x : \|x - x^*\| < \epsilon\}$ is the $\epsilon$-ball around $x^*$.

**Strict local minimum**: The inequality is strict for all $x \neq x^*$ in the neighborhood:

$$
f(x^*) < f(x) \quad \text{for all } x \in \mathcal{F} \cap B(x^*, \epsilon), \; x \neq x^*
$$

### Relationship

$$
\text{Global minimum} \implies \text{Local minimum}
$$

but the converse is generally **false**. A function can have multiple local minima, only some of which are global.

### Example: Multiple Local Minima

Consider $f(x) = x^4 - 2x^2 + 1$ on $\mathbb{R}$.

Taking the derivative: $f'(x) = 4x^3 - 4x = 4x(x^2 - 1)$

Critical points: $x = -1, 0, 1$

- $f(-1) = 0$ (local and global minimum)
- $f(0) = 1$ (local maximum)
- $f(1) = 0$ (local and global minimum)

This function has two global minima and one local maximum.

## Necessary Conditions for Local Optimality

### Unconstrained Problems

For unconstrained optimization: $\min_{x \in \mathbb{R}^n} f(x)$

**First-order necessary condition (FONC)**: If $x^*$ is a local minimum and $f$ is differentiable at $x^*$, then:

$$
\nabla f(x^*) = 0
$$

Such points are called **stationary points** or **critical points**.

**Proof**: Suppose $\nabla f(x^*) \neq 0$. Then $d = -\nabla f(x^*)$ is a descent direction (since $\nabla f(x^*)^T d = -\|\nabla f(x^*)\|^2 < 0$). For small enough $\alpha > 0$:

$$
f(x^* + \alpha d) \approx f(x^*) + \alpha \nabla f(x^*)^T d = f(x^*) - \alpha \|\nabla f(x^*)\|^2 < f(x^*)
$$

This contradicts $x^*$ being a local minimum.

**Second-order necessary condition (SONC)**: If $x^*$ is a local minimum and $f$ is twice differentiable, then:

$$
\nabla f(x^*) = 0 \quad \text{and} \quad \nabla^2 f(x^*) \succeq 0
$$

The Hessian must be positive semidefinite.

### Sufficient Conditions

**Second-order sufficient condition (SOSC)**: If $f$ is twice differentiable and:

$$
\nabla f(x^*) = 0 \quad \text{and} \quad \nabla^2 f(x^*) \succ 0
$$

(Hessian is positive definite), then $x^*$ is a **strict local minimum**.

**Note**: SOSC is sufficient but not necessary. A point can be a strict local minimum with a singular Hessian.

**Example**: $f(x) = x^4$ has a strict global minimum at $x = 0$, but $f''(0) = 0$ (not positive definite).

### Summary of Conditions

| Condition | Type | Requirement | Conclusion |
|-----------|------|-------------|------------|
| FONC | Necessary | $\nabla f(x^*) = 0$ | $x^*$ is stationary |
| SONC | Necessary | $\nabla f(x^*) = 0$, $\nabla^2 f(x^*) \succeq 0$ | Candidate for local min |
| SOSC | Sufficient | $\nabla f(x^*) = 0$, $\nabla^2 f(x^*) \succ 0$ | $x^*$ is strict local min |

## Constrained Problems

For constrained optimization:

$$
\begin{align}
\min \quad & f(x) \\
\text{s.t.} \quad & x \in \mathcal{F}
\end{align}
$$

The first-order condition must be modified to account for constraints.

### Feasible Directions

A direction $d \in \mathbb{R}^n$ is **feasible** at $x \in \mathcal{F}$ if there exists $\bar{\alpha} > 0$ such that:

$$
x + \alpha d \in \mathcal{F} \quad \text{for all } \alpha \in [0, \bar{\alpha}]
$$

The set of feasible directions at $x$ is denoted $\mathcal{D}(x)$.

**Example**: For $\mathcal{F} = \{x : x \geq 0\}$ (nonnegative orthant):
- At $x = (1, 2)$ (interior): all directions are feasible
- At $x = (0, 2)$ (boundary): only directions with $d_1 \geq 0$ are feasible

### Descent Directions

A direction $d$ is a **descent direction** for $f$ at $x$ if:

$$
\nabla f(x)^T d < 0
$$

This means moving in direction $d$ decreases $f$ (at least locally).

### FONC for Constrained Problems

**Theorem**: If $x^*$ is a local minimum of $f$ over $\mathcal{F}$ and $f$ is differentiable, then:

$$
\nabla f(x^*)^T d \geq 0 \quad \text{for all feasible directions } d \in \mathcal{D}(x^*)
$$

**Interpretation**: At a local minimum, there are no feasible descent directions. Any feasible direction either increases $f$ or is tangent to a level set.

**Proof**: Suppose there exists a feasible direction $d$ with $\nabla f(x^*)^T d < 0$. Then for small enough $\alpha > 0$:

$$
f(x^* + \alpha d) \approx f(x^*) + \alpha \nabla f(x^*)^T d < f(x^*)
$$

and $x^* + \alpha d \in \mathcal{F}$, contradicting $x^*$ being a local minimum.

## Global Optimality Conditions

### When is a Local Minimum Global?

For general nonconvex problems, checking global optimality is hard (often NP-hard). However, special structures guarantee local = global.

**Theorem (Convex Optimization)**: For a convex problem, every local minimum is a global minimum.

**Proof**: Suppose $x^*$ is a local minimum but not global. Then there exists $y \in \mathcal{F}$ with $f(y) < f(x^*)$. By convexity, the line segment is feasible:

$$
x(\theta) = (1 - \theta) x^* + \theta y \in \mathcal{F} \quad \text{for } \theta \in [0, 1]
$$

For small $\theta > 0$:

$$
f(x(\theta)) \leq (1 - \theta) f(x^*) + \theta f(y) < f(x^*)
$$

This violates local optimality at $x^*$.

### Sufficient Conditions for Global Optimality

**1. Convexity**: For convex problems, any local minimum is global.

**2. Coercivity**: If $f$ is coercive (i.e., $f(x) \to \infty$ as $\|x\| \to \infty$) and has a unique stationary point, that point is the global minimum.

**3. Compactness**: If $\mathcal{F}$ is compact and $f$ is continuous, a global minimum exists (Weierstrass theorem). If there's only one local minimum, it must be global.

## Characterizing Stationary Points

For unconstrained problems, we can classify stationary points using the Hessian:

**Classification at $x^*$ with $\nabla f(x^*) = 0$**:

| Hessian $\nabla^2 f(x^*)$ | Classification |
|---------------------------|----------------|
| Positive definite ($\succ 0$) | Strict local minimum |
| Positive semidefinite ($\succeq 0$) | Local minimum (possibly non-strict) |
| Negative definite ($\prec 0$) | Strict local maximum |
| Negative semidefinite ($\preceq 0$) | Local maximum (possibly non-strict) |
| Indefinite | Saddle point |
| Singular, indefinite | Unknown (higher-order analysis needed) |

### Example: Classifying Stationary Points

Consider $f(x_1, x_2) = x_1^2 - x_2^2$.

**Step 1**: Find stationary points.

$$
\nabla f = \begin{bmatrix} 2x_1 \\ -2x_2 \end{bmatrix} = 0 \implies x^* = (0, 0)
$$

**Step 2**: Compute Hessian.

$$
\nabla^2 f = \begin{bmatrix} 2 & 0 \\ 0 & -2 \end{bmatrix}
$$

**Step 3**: Analyze eigenvalues.

Eigenvalues: $\lambda_1 = 2 > 0$, $\lambda_2 = -2 < 0$

Hessian is **indefinite** $\implies$ $(0, 0)$ is a **saddle point**.

Along $x_2 = 0$: $f(x_1, 0) = x_1^2$ has a minimum at $x_1 = 0$.
Along $x_1 = 0$: $f(0, x_2) = -x_2^2$ has a maximum at $x_2 = 0$.

## Optimization Algorithms and Local Minima

Most iterative optimization algorithms converge to local minima, not necessarily global minima.

### Gradient-Based Methods

Methods like gradient descent, Newton's method, and quasi-Newton methods:
- Find stationary points (where $\nabla f = 0$)
- Converge to local minima (under appropriate conditions)
- Cannot guarantee global optimality for nonconvex problems

### Dealing with Multiple Local Minima

**Strategies for nonconvex problems**:

**1. Multi-start**: Run the algorithm from many random initial points, choose the best result.

**2. Global optimization algorithms**:
   - Simulated annealing
   - Genetic algorithms
   - Particle swarm optimization
   - Branch and bound

**3. Convex relaxation**: Approximate the problem with a convex problem, then refine.

**4. Problem reformulation**: Sometimes a nonconvex problem can be reformulated as a convex one.

### Convergence to Saddle Points

A surprising result: many algorithms (e.g., gradient descent with random initialization) almost never converge to saddle points—they converge to local minima.

**Intuition**: Saddle points are unstable. Small perturbations escape along directions of negative curvature.

## Python Implementation

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from scipy.optimize import minimize
import cvxpy as cp

print("=" * 70)
print("LOCAL VS GLOBAL OPTIMALITY")
print("=" * 70)

# Example 1: Multiple local minima
print("\n" + "=" * 70)
print("Example 1: Function with Multiple Local Minima")
print("=" * 70)

def f_multimodal(x):
    """Function with multiple local minima: x^4 - 2x^2 + 1"""
    return x**4 - 2*x**2 + 1

def grad_f_multimodal(x):
    """Gradient of f"""
    return 4*x**3 - 4*x

def hess_f_multimodal(x):
    """Hessian of f"""
    return 12*x**2 - 4

# Find critical points analytically
# f'(x) = 4x^3 - 4x = 4x(x^2 - 1) = 0
# Critical points: x = -1, 0, 1
critical_points = np.array([-1.0, 0.0, 1.0])

print("\nAnalyzing f(x) = x⁴ - 2x² + 1")
print("\nCritical points:")

for x_c in critical_points:
    f_val = f_multimodal(x_c)
    grad = grad_f_multimodal(x_c)
    hess = hess_f_multimodal(x_c)

    print(f"\nx = {x_c}:")
    print(f"  f(x) = {f_val:.4f}")
    print(f"  ∇f(x) = {grad:.6f}")
    print(f"  ∇²f(x) = {hess:.4f}")

    if abs(grad) < 1e-6:  # Stationary point
        if hess > 1e-6:
            point_type = "Local (and global) minimum"
        elif hess < -1e-6:
            point_type = "Local maximum"
        else:
            point_type = "Inflection point"
        print(f"  → {point_type}")

# Multi-start optimization
print("\n" + "-" * 70)
print("Multi-start optimization from different initial points:")

initial_points = [-2.5, -0.5, 0.5, 2.5]
results = []

for x0 in initial_points:
    result = minimize(f_multimodal, x0, method='BFGS', jac=grad_f_multimodal)
    results.append(result)
    print(f"\nStarting from x₀ = {x0:5.1f}:")
    print(f"  Converged to x* = {result.x[0]:6.3f}")
    print(f"  f(x*) = {result.fun:6.4f}")
    print(f"  Iterations: {result.nit}")

# Example 2: Convex problem (local = global)
print("\n" + "=" * 70)
print("Example 2: Convex Problem (Local = Global)")
print("=" * 70)

# Minimize x1^2 + x2^2 subject to x1 + x2 >= 1
x = cp.Variable(2)
objective = cp.Minimize(cp.sum_squares(x))
constraints = [cp.sum(x) >= 1]

problem = cp.Problem(objective, constraints)
problem.solve()

print("\nProblem: min x₁² + x₂² s.t. x₁ + x₂ ≥ 1")
print(f"Optimal solution: x* = {x.value}")
print(f"Optimal value: f(x*) = {problem.value:.6f}")
print("→ This is a GLOBAL minimum (convex problem)")

# Verify using calculus
print("\nVerification using Lagrange multipliers:")
print("∇f = (2x₁, 2x₂), ∇g = (-1, -1)")
print("At optimum: ∇f = λ∇g → (2x₁, 2x₂) = λ(-1, -1)")
print("This gives x₁ = x₂ and x₁ + x₂ = 1")
print(f"So x₁ = x₂ = 0.5, matching our solution: {x.value}")

# Example 3: Classifying stationary points
print("\n" + "=" * 70)
print("Example 3: Classifying Stationary Points via Hessian")
print("=" * 70)

def classify_stationary_point(hessian, tol=1e-8):
    """Classify stationary point based on Hessian."""
    eigenvalues = np.linalg.eigvalsh(hessian)
    min_eig = np.min(eigenvalues)
    max_eig = np.max(eigenvalues)

    if min_eig > tol:
        return "Strict local minimum", eigenvalues
    elif min_eig >= -tol and max_eig > tol:
        return "Local minimum (possibly non-strict)", eigenvalues
    elif max_eig < -tol:
        return "Strict local maximum", eigenvalues
    elif max_eig <= tol and min_eig < -tol:
        return "Local maximum (possibly non-strict)", eigenvalues
    elif min_eig < -tol and max_eig > tol:
        return "Saddle point", eigenvalues
    else:
        return "Unknown (degenerate)", eigenvalues

# Test cases
test_functions = [
    ("f(x₁, x₂) = x₁² + x₂²", np.array([[2, 0], [0, 2]])),
    ("f(x₁, x₂) = x₁² - x₂²", np.array([[2, 0], [0, -2]])),
    ("f(x₁, x₂) = -x₁² - x₂²", np.array([[-2, 0], [0, -2]])),
    ("f(x₁, x₂) = x₁² + x₁x₂ + x₂²", np.array([[2, 1], [1, 2]])),
]

for func_name, hessian in test_functions:
    classification, eigenvalues = classify_stationary_point(hessian)
    print(f"\n{func_name}:")
    print(f"  Hessian eigenvalues: {eigenvalues}")
    print(f"  → {classification}")

# Example 4: Non-convex optimization with multiple starts
print("\n" + "=" * 70)
print("Example 4: Global Optimization via Multi-start")
print("=" * 70)

def rosenbrock(x):
    """Rosenbrock function with multiple local minima variant"""
    return (1 - x[0])**2 + 100*(x[1] - x[0]**2)**2

# Multi-start
n_starts = 20
best_result = None
best_value = np.inf

np.random.seed(42)
print(f"\nRunning {n_starts} random starts on Rosenbrock function...")

all_results = []
for i in range(n_starts):
    x0 = np.random.randn(2) * 2
    result = minimize(rosenbrock, x0, method='BFGS')
    all_results.append(result)

    if result.fun < best_value:
        best_value = result.fun
        best_result = result

print(f"\nBest result found:")
print(f"  x* = {best_result.x}")
print(f"  f(x*) = {best_result.fun:.10f}")
print(f"  (True global minimum: x* = (1, 1), f(x*) = 0)")

# Check how many starts found the global minimum
global_minima_found = sum(1 for r in all_results if r.fun < 1e-6)
print(f"\nOut of {n_starts} starts, {global_minima_found} found the global minimum")

# Visualization
fig = plt.figure(figsize=(18, 12))

# Plot 1: Multiple local minima (1D)
ax1 = fig.add_subplot(2, 3, 1)
x_vals = np.linspace(-2.5, 2.5, 500)
y_vals = f_multimodal(x_vals)

ax1.plot(x_vals, y_vals, 'b-', linewidth=2.5, label='$f(x) = x^4 - 2x^2 + 1$')
ax1.plot(critical_points, f_multimodal(critical_points), 'ro', markersize=10,
         label='Critical points', zorder=5)
ax1.axhline(y=0, color='k', linestyle='--', alpha=0.3)
ax1.axhline(y=1, color='r', linestyle='--', alpha=0.3)

# Mark global minima
global_min_x = np.array([-1, 1])
ax1.plot(global_min_x, f_multimodal(global_min_x), 'g*', markersize=15,
         label='Global minima', zorder=6)

ax1.set_xlabel('x', fontsize=11)
ax1.set_ylabel('f(x)', fontsize=11)
ax1.set_title('Multiple Local Minima', fontsize=12, fontweight='bold')
ax1.legend(fontsize=9)
ax1.grid(True, alpha=0.3)
ax1.set_ylim(-0.5, 3)

# Plot 2: Multi-start convergence
ax2 = fig.add_subplot(2, 3, 2)
for i, (x0, res) in enumerate(zip(initial_points, results)):
    ax2.plot([x0, res.x[0]], [f_multimodal(x0), res.fun], 'o-',
             markersize=8, linewidth=2, label=f'Start: {x0:.1f}')

ax2.plot(x_vals, y_vals, 'k-', linewidth=1.5, alpha=0.3)
ax2.set_xlabel('x', fontsize=11)
ax2.set_ylabel('f(x)', fontsize=11)
ax2.set_title('Multi-start Optimization', fontsize=12, fontweight='bold')
ax2.legend(fontsize=8)
ax2.grid(True, alpha=0.3)

# Plot 3: Convex problem (local = global)
ax3 = fig.add_subplot(2, 3, 3)
x1_vals = np.linspace(-1, 2, 400)
x2_vals = np.linspace(-1, 2, 400)
X1, X2 = np.meshgrid(x1_vals, x2_vals)
Z = X1**2 + X2**2

contour = ax3.contour(X1, X2, Z, levels=20, cmap='viridis', alpha=0.7)
ax3.clabel(contour, inline=True, fontsize=8)

# Constraint: x1 + x2 = 1
x1_line = np.linspace(-1, 2, 100)
x2_line = 1 - x1_line
ax3.plot(x1_line, x2_line, 'r-', linewidth=2.5, label='$x_1 + x_2 = 1$')

# Optimal point
ax3.plot(x.value[0], x.value[1], 'r*', markersize=20, label='Global minimum', zorder=5)

ax3.set_xlabel('$x_1$', fontsize=11)
ax3.set_ylabel('$x_2$', fontsize=11)
ax3.set_title('Convex Problem: Local = Global', fontsize=12, fontweight='bold')
ax3.legend(fontsize=9)
ax3.grid(True, alpha=0.3)
ax3.set_aspect('equal')

# Plot 4: Saddle point
ax4 = fig.add_subplot(2, 3, 4, projection='3d')
x1_vals = np.linspace(-2, 2, 50)
x2_vals = np.linspace(-2, 2, 50)
X1, X2 = np.meshgrid(x1_vals, x2_vals)
Z_saddle = X1**2 - X2**2

surf = ax4.plot_surface(X1, X2, Z_saddle, cmap='coolwarm', alpha=0.8, edgecolor='none')
ax4.plot([0], [0], [0], 'r*', markersize=15, label='Saddle point')

ax4.set_xlabel('$x_1$', fontsize=10)
ax4.set_ylabel('$x_2$', fontsize=10)
ax4.set_zlabel('$f(x_1, x_2)$', fontsize=10)
ax4.set_title('Saddle Point: $f(x_1, x_2) = x_1^2 - x_2^2$', fontsize=11, fontweight='bold')

# Plot 5: Rosenbrock function
ax5 = fig.add_subplot(2, 3, 5)
x1_vals = np.linspace(-2, 2, 400)
x2_vals = np.linspace(-1, 3, 400)
X1, X2 = np.meshgrid(x1_vals, x2_vals)
Z_rosen = (1 - X1)**2 + 100*(X2 - X1**2)**2

# Use log scale for better visualization
contour = ax5.contour(X1, X2, Z_rosen, levels=np.logspace(-1, 3, 20),
                      cmap='viridis', alpha=0.7)

# Plot starting points and solutions
for res in all_results[:10]:  # Plot first 10 for clarity
    ax5.plot(res.x[0], res.x[1], 'ro', markersize=4, alpha=0.5)

ax5.plot(1, 1, 'g*', markersize=20, label='Global minimum (1, 1)', zorder=5)

ax5.set_xlabel('$x_1$', fontsize=11)
ax5.set_ylabel('$x_2$', fontsize=11)
ax5.set_title('Rosenbrock Function: Multi-start Results', fontsize=12, fontweight='bold')
ax5.legend(fontsize=9)
ax5.grid(True, alpha=0.3)

# Plot 6: Feasible descent directions
ax6 = fig.add_subplot(2, 3, 6)

# Constraint: x >= 0 (first quadrant)
ax6.fill([0, 3, 3, 0], [0, 0, 3, 3], alpha=0.2, color='green', label='Feasible region')

# Point on boundary
x_point = np.array([0, 1.5])
ax6.plot(x_point[0], x_point[1], 'ro', markersize=12, label='Point on boundary')

# Gradient direction (assuming we're minimizing x1 + 2*x2)
grad = np.array([1, 2])
ax6.arrow(x_point[0], x_point[1], -grad[0]*0.5, -grad[1]*0.5,
          head_width=0.15, head_length=0.1, fc='blue', ec='blue',
          linewidth=2, label='$-\\nabla f$ (steepest descent)')

# Feasible directions
feasible_dirs = [np.array([0.5, 0.5]), np.array([1, 0]), np.array([0.5, -0.5])]
colors = ['green', 'green', 'red']
labels = ['Feasible descent', 'Feasible descent', 'Infeasible']

for d, c, lbl in zip(feasible_dirs, colors, labels):
    d_norm = d / np.linalg.norm(d) * 0.8
    ax6.arrow(x_point[0], x_point[1], d_norm[0], d_norm[1],
             head_width=0.12, head_length=0.08, fc=c, ec=c,
             linewidth=1.5, alpha=0.7)

ax6.set_xlim(-0.5, 3)
ax6.set_ylim(-0.5, 3)
ax6.set_xlabel('$x_1$', fontsize=11)
ax6.set_ylabel('$x_2$', fontsize=11)
ax6.set_title('Feasible Descent Directions', fontsize=12, fontweight='bold')
ax6.legend(fontsize=9)
ax6.grid(True, alpha=0.3)
ax6.set_aspect('equal')

plt.tight_layout()
plt.savefig('local_global_optimality.png', dpi=300, bbox_inches='tight')
print("\n" + "=" * 70)
print("Visualization saved as 'local_global_optimality.png'")
print("=" * 70)
```

## Summary

### Key Concepts

1. **Global minimum**: Best solution over entire feasible set
2. **Local minimum**: Best solution in a neighborhood
3. **Stationary point**: Point where $\nabla f = 0$
4. **Critical distinction**: Global minimum $\implies$ local minimum, but not conversely

### Optimality Conditions

**Unconstrained**:
- **FONC**: $\nabla f(x^*) = 0$ (necessary)
- **SONC**: $\nabla^2 f(x^*) \succeq 0$ (necessary)
- **SOSC**: $\nabla^2 f(x^*) \succ 0$ (sufficient for strict local minimum)

**Constrained**:
- No feasible descent directions at local minimum
- $\nabla f(x^*)^T d \geq 0$ for all $d \in \mathcal{D}(x^*)$

### Special Case: Convex Problems

For convex optimization:
- **Local = Global**: Any local minimum is a global minimum
- This is why convex optimization is fundamentally easier

### Practical Implications

- Most algorithms find local minima
- For nonconvex problems, use multi-start or global optimization methods
- Recognize problem structure (convexity) to guarantee global optimality

In the next section, we'll derive the fundamental optimality conditions (KKT conditions) that generalize these results to constrained problems.
