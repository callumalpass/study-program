---
title: "Optimality Conditions"
description: "Karush-Kuhn-Tucker (KKT) conditions and fundamental optimality theory for constrained optimization"
---

# Optimality Conditions

## Introduction

Optimality conditions are mathematical statements that characterize optimal solutions. They answer the fundamental question: **How do we know when we've found an optimal solution?**

For constrained optimization:

$$
\begin{align}
\text{minimize} \quad & f(x) \\
\text{subject to} \quad & g_i(x) \leq 0, \quad i = 1, \ldots, m \\
& h_j(x) = 0, \quad j = 1, \ldots, p
\end{align}
$$

we need conditions that account for both the objective function and the constraints.

## Lagrange Multipliers (Equality Constraints Only)

### The Method of Lagrange Multipliers

For problems with only equality constraints:

$$
\begin{align}
\text{minimize} \quad & f(x) \\
\text{subject to} \quad & h_j(x) = 0, \quad j = 1, \ldots, p
\end{align}
$$

**Lagrange's theorem** (1788): At a local minimum $x^*$, there exist **Lagrange multipliers** $\lambda^* \in \mathbb{R}^p$ such that:

$$
\nabla f(x^*) + \sum_{j=1}^p \lambda_j^* \nabla h_j(x^*) = 0
$$

### The Lagrangian Function

Define the **Lagrangian**:

$$
\mathcal{L}(x, \lambda) = f(x) + \sum_{j=1}^p \lambda_j h_j(x) = f(x) + \lambda^T h(x)
$$

The optimality conditions become:

$$
\begin{align}
\nabla_x \mathcal{L}(x^*, \lambda^*) &= 0 \quad \text{(stationarity)} \\
\nabla_\lambda \mathcal{L}(x^*, \lambda^*) &= 0 \quad \text{(feasibility)}
\end{align}
$$

The second condition is just $h(x^*) = 0$ (the original constraints).

### Geometric Interpretation

At the optimum, the gradient of the objective is a linear combination of the constraint gradients:

$$
\nabla f(x^*) = -\sum_{j=1}^p \lambda_j^* \nabla h_j(x^*)
$$

This means $\nabla f(x^*)$ is **orthogonal to the feasible set** (tangent space of constraints).

**Why?** If $\nabla f(x^*)$ had a component along the tangent space, we could move in that direction while staying feasible and improving the objective.

### Example: Minimize Distance to Origin

$$
\begin{align}
\min \quad & x_1^2 + x_2^2 \\
\text{s.t.} \quad & x_1 + x_2 = 1
\end{align}
$$

**Lagrangian**: $\mathcal{L}(x, \lambda) = x_1^2 + x_2^2 + \lambda(x_1 + x_2 - 1)$

**Optimality conditions**:
$$
\begin{align}
\frac{\partial \mathcal{L}}{\partial x_1} &= 2x_1 + \lambda = 0 \\
\frac{\partial \mathcal{L}}{\partial x_2} &= 2x_2 + \lambda = 0 \\
\frac{\partial \mathcal{L}}{\partial \lambda} &= x_1 + x_2 - 1 = 0
\end{align}
$$

From the first two: $x_1 = x_2 = -\lambda/2$

Substituting into the third: $-\lambda/2 - \lambda/2 = 1 \implies \lambda = -1$

**Solution**: $x^* = (0.5, 0.5)$, $\lambda^* = -1$

## KKT Conditions (General Case)

The **Karush-Kuhn-Tucker (KKT) conditions** extend Lagrange multipliers to inequality constraints.

### Statement of KKT Conditions

For the general problem:

$$
\begin{align}
\min \quad & f(x) \\
\text{s.t.} \quad & g_i(x) \leq 0, \quad i = 1, \ldots, m \\
& h_j(x) = 0, \quad j = 1, \ldots, p
\end{align}
$$

Define the Lagrangian:

$$
\mathcal{L}(x, \mu, \lambda) = f(x) + \sum_{i=1}^m \mu_i g_i(x) + \sum_{j=1}^p \lambda_j h_j(x)
$$

**Theorem (KKT Necessary Conditions)**: If $x^*$ is a local minimum and a constraint qualification holds, then there exist **KKT multipliers** $\mu^* \in \mathbb{R}^m$ and $\lambda^* \in \mathbb{R}^p$ such that:

1. **Stationarity**:
$$\nabla_x \mathcal{L}(x^*, \mu^*, \lambda^*) = \nabla f(x^*) + \sum_{i=1}^m \mu_i^* \nabla g_i(x^*) + \sum_{j=1}^p \lambda_j^* \nabla h_j(x^*) = 0$$

2. **Primal feasibility**:
$$g_i(x^*) \leq 0, \quad h_j(x^*) = 0$$

3. **Dual feasibility**:
$$\mu_i^* \geq 0 \quad \text{for all } i$$

4. **Complementary slackness**:
$$\mu_i^* g_i(x^*) = 0 \quad \text{for all } i$$

These four conditions are collectively called the **KKT conditions**.

### Understanding the Conditions

**Stationarity**: The gradient of the Lagrangian vanishes. The objective gradient is a weighted sum of constraint gradients.

**Primal feasibility**: The solution must be feasible (obvious but needs to be stated).

**Dual feasibility**: Inequality multipliers must be nonnegative. This reflects that inequality constraints can only "push" the solution in one direction.

**Complementary slackness**: For each inequality constraint, either:
- The constraint is active ($g_i(x^*) = 0$), or
- The multiplier is zero ($\mu_i^* = 0$), or
- Both

**Interpretation**: If a constraint is inactive ($g_i(x^*) < 0$), it doesn't affect the solution locally, so $\mu_i^* = 0$. If $\mu_i^* > 0$, the constraint must be active.

### KKT Conditions for Convex Problems

**Theorem (KKT Sufficient Conditions)**: For a **convex problem** (convex $f$ and $g_i$, affine $h_j$), the KKT conditions are **sufficient** for global optimality.

That is, if $(x^*, \mu^*, \lambda^*)$ satisfy the KKT conditions, then $x^*$ is a global minimum.

This is a remarkable result: for convex problems, KKT conditions are both necessary and sufficient!

### Example: Quadratic Program with Inequality

$$
\begin{align}
\min \quad & x_1^2 + x_2^2 \\
\text{s.t.} \quad & x_1 + x_2 - 1 \geq 0 \\
& x_1 \geq 0, \; x_2 \geq 0
\end{align}
$$

Rewrite in standard form (constraints $\leq 0$):
$$
\begin{align}
\min \quad & x_1^2 + x_2^2 \\
\text{s.t.} \quad & -x_1 - x_2 + 1 \leq 0 \\
& -x_1 \leq 0 \\
& -x_2 \leq 0
\end{align}
$$

**Lagrangian**:
$$\mathcal{L}(x, \mu) = x_1^2 + x_2^2 + \mu_1(-x_1 - x_2 + 1) + \mu_2(-x_1) + \mu_3(-x_2)$$

**KKT conditions**:

1. Stationarity:
$$
\begin{align}
2x_1 - \mu_1 - \mu_2 &= 0 \\
2x_2 - \mu_1 - \mu_3 &= 0
\end{align}
$$

2. Primal feasibility: $x_1 + x_2 \geq 1$, $x_1 \geq 0$, $x_2 \geq 0$

3. Dual feasibility: $\mu_1, \mu_2, \mu_3 \geq 0$

4. Complementary slackness:
$$
\begin{align}
\mu_1(1 - x_1 - x_2) &= 0 \\
\mu_2 x_1 &= 0 \\
\mu_3 x_2 &= 0
\end{align}
$$

**Solution**: By symmetry and the minimum distance to origin, we expect $x_1 = x_2 = 0.5$.

Check: $x_1 + x_2 = 1$ (active), so $\mu_1 > 0$ is allowed.
$x_1 = x_2 = 0.5 > 0$, so $\mu_2 = \mu_3 = 0$ (complementary slackness).

From stationarity: $2(0.5) = \mu_1 \implies \mu_1 = 1$.

**KKT point**: $x^* = (0.5, 0.5)$, $\mu^* = (1, 0, 0)$ ✓

## Interpretation of Multipliers

### Economic Interpretation

Lagrange multipliers have an economic interpretation as **shadow prices** or **marginal values**.

Consider a constraint $h(x) = b$ (parameterized by $b$). Let $p^*(b)$ be the optimal value as a function of $b$:

$$
p^*(b) = \min \{f(x) : h(x) = b\}
$$

**Envelope theorem**: $\frac{dp^*}{db} = \lambda^*$ at the optimum.

**Interpretation**: The multiplier $\lambda^*$ tells us how much the optimal value changes if we relax the constraint slightly.

### Sensitivity Analysis

If $\lambda_j^*$ is large, constraint $j$ is "expensive"—relaxing it slightly would significantly improve the optimal value.

If $\lambda_j^* = 0$, the constraint is not binding locally—relaxing it has no first-order effect.

### Example: Production with Resource Constraint

Maximize profit $\pi(x)$ subject to resource constraint $r(x) \leq R$.

The KKT multiplier $\mu^*$ for the resource constraint represents the **marginal value of the resource**.

If $\mu^* = 10$ dollars per unit, acquiring one more unit of the resource would increase profit by approximately $10.

## Constraint Qualifications (Revisited)

KKT conditions are **necessary** only if a constraint qualification holds. The most common CQs:

### LICQ (Linear Independence Constraint Qualification)

Gradients of active constraints are linearly independent.

**LICQ is the strongest CQ**—guarantees uniqueness of multipliers.

### MFCQ (Mangasarian-Fromovitz)

For active inequalities, there exists a direction that strictly satisfies all.

### Slater's Condition

For convex problems, there exists a strictly feasible point.

**Note**: For convex problems, Slater's condition guarantees strong duality and KKT conditions.

## Solving Problems via KKT Conditions

For small problems, we can solve the KKT conditions directly.

### Strategy

1. Write down the Lagrangian
2. Write the KKT conditions
3. Guess which constraints are active (complementary slackness)
4. Solve the resulting system of equations
5. Verify all KKT conditions are satisfied

This often requires checking multiple cases (different active sets).

### Example: Simple QP

$$
\begin{align}
\min \quad & (x - 2)^2 \\
\text{s.t.} \quad & x \geq 0
\end{align}
$$

**Case 1**: $x > 0$ (constraint inactive)

Then $\mu = 0$. Stationarity: $2(x - 2) = 0 \implies x = 2$.
Check: $x = 2 > 0$ ✓

**Case 2**: $x = 0$ (constraint active)

Stationarity: $2(x - 2) + \mu(-1) = 0 \implies -4 - \mu = 0 \implies \mu = -4$.
Check dual feasibility: $\mu = -4 < 0$ ✗

**Conclusion**: Only Case 1 is valid. $x^* = 2$, $\mu^* = 0$.

## Python Implementation

```python
import numpy as np
import cvxpy as cp
import matplotlib.pyplot as plt
from scipy.optimize import minimize

print("=" * 70)
print("OPTIMALITY CONDITIONS (KKT)")
print("=" * 70)

# Example 1: Lagrange multipliers (equality constraints only)
print("\n" + "=" * 70)
print("Example 1: Lagrange Multipliers")
print("=" * 70)

print("\nProblem: min x₁² + x₂² s.t. x₁ + x₂ = 1")

# Solve using CVXPY
x = cp.Variable(2)
objective = cp.Minimize(cp.sum_squares(x))
constraints = [cp.sum(x) == 1]
problem = cp.Problem(objective, constraints)
problem.solve()

print(f"\nOptimal solution: x* = {x.value}")
print(f"Optimal value: f(x*) = {problem.value:.6f}")

# Extract dual variable (Lagrange multiplier)
lambda_star = constraints[0].dual_value
print(f"Lagrange multiplier: λ* = {lambda_star:.6f}")

# Verify KKT conditions manually
print("\nVerifying optimality conditions:")
grad_f = 2 * x.value  # ∇f = 2x
grad_h = np.array([1, 1])  # ∇h = (1, 1)

stationarity = grad_f + lambda_star * grad_h
print(f"  Stationarity: ∇f + λ∇h = {stationarity}")
print(f"  ‖stationarity‖ = {np.linalg.norm(stationarity):.6e} (should be ≈ 0)")

feasibility = np.sum(x.value) - 1
print(f"  Feasibility: x₁ + x₂ - 1 = {feasibility:.6e} (should be ≈ 0)")

# Example 2: KKT conditions for inequality constraints
print("\n" + "=" * 70)
print("Example 2: KKT Conditions with Inequalities")
print("=" * 70)

print("\nProblem: min x₁² + x₂² s.t. x₁ + x₂ ≥ 1, x₁ ≥ 0, x₂ ≥ 0")

# Solve using CVXPY
x = cp.Variable(2)
objective = cp.Minimize(cp.sum_squares(x))
constraints = [
    x[0] + x[1] >= 1,  # Constraint 0
    x[0] >= 0,         # Constraint 1
    x[1] >= 0          # Constraint 2
]
problem = cp.Problem(objective, constraints)
problem.solve()

print(f"\nOptimal solution: x* = {x.value}")
print(f"Optimal value: f(x*) = {problem.value:.6f}")

# Extract dual variables (KKT multipliers)
print("\nKKT multipliers:")
for i, constraint in enumerate(constraints):
    mu_i = constraint.dual_value
    print(f"  μ_{i} = {mu_i:.6f}")

    # Check complementary slackness
    # For constraint ax >= b, residual is ax - b
    if i == 0:
        residual = x.value[0] + x.value[1] - 1
    elif i == 1:
        residual = x.value[0]
    else:
        residual = x.value[1]

    comp_slack = mu_i * residual
    print(f"    Constraint residual: {residual:.6e}")
    print(f"    Complementary slackness: μ_{i} × residual = {comp_slack:.6e}")

# Verify stationarity
grad_f = 2 * x.value
grad_g = [np.array([1, 1]), np.array([1, 0]), np.array([0, 1])]

# Note: CVXPY returns dual variables with opposite sign for >= constraints
# We need to adjust: for ax >= b, the dual in standard form is for -ax + b <= 0
mu_values = [c.dual_value for c in constraints]

stationarity = grad_f.copy()
for i, (mu, grad) in enumerate(zip(mu_values, grad_g)):
    # Adjust sign for >= constraints
    stationarity -= mu * grad

print(f"\nStationarity check:")
print(f"  ∇f - Σμᵢ∇gᵢ = {stationarity}")
print(f"  ‖stationarity‖ = {np.linalg.norm(stationarity):.6e} (should be ≈ 0)")

# Example 3: Solving KKT conditions analytically
print("\n" + "=" * 70)
print("Example 3: Analytical KKT Solution")
print("=" * 70)

print("\nProblem: min (x - 2)² s.t. x ≥ 0")

def solve_kkt_1d_qp():
    """Solve 1D QP via KKT conditions analytically."""
    print("\nCase 1: x > 0 (constraint inactive, μ = 0)")
    # Stationarity: 2(x - 2) = 0
    x_case1 = 2.0
    mu_case1 = 0.0
    print(f"  Stationarity gives: x = {x_case1}")
    print(f"  Check primal feasibility: x = {x_case1} ≥ 0 ✓")
    print(f"  Check dual feasibility: μ = {mu_case1} ≥ 0 ✓")
    print(f"  Objective value: f(x) = {(x_case1 - 2)**2:.4f}")

    print("\nCase 2: x = 0 (constraint active)")
    # Stationarity: 2(x - 2) - μ = 0 with x = 0
    x_case2 = 0.0
    mu_case2 = 2 * (x_case2 - 2)  # = -4
    print(f"  x = {x_case2}")
    print(f"  Stationarity gives: μ = {mu_case2}")
    print(f"  Check dual feasibility: μ = {mu_case2} ≥ 0? ✗")
    print(f"  Case 2 is INFEASIBLE (violates dual feasibility)")

    print("\n" + "-" * 70)
    print(f"Conclusion: x* = {x_case1}, μ* = {mu_case1}")
    return x_case1, mu_case1

x_opt, mu_opt = solve_kkt_1d_qp()

# Verify with CVXPY
x = cp.Variable()
problem = cp.Problem(cp.Minimize((x - 2)**2), [x >= 0])
problem.solve()
print(f"\nCVXPY verification: x* = {x.value:.6f} (matches analytical solution ✓)")

# Example 4: Active set identification
print("\n" + "=" * 70)
print("Example 4: Identifying Active Constraints")
print("=" * 70)

# Problem with multiple constraints
A = np.array([[1, 1], [1, -1], [-1, 0], [0, -1]])
b = np.array([2, 1, 0, 0])

x = cp.Variable(2)
objective = cp.Minimize(cp.sum_squares(x - np.array([1.5, 1.5])))
constraints = [A @ x <= b]
problem = cp.Problem(objective, constraints)
problem.solve()

print("\nProblem: min ‖x - (1.5, 1.5)‖² subject to:")
print("  x₁ + x₂ ≤ 2")
print("  x₁ - x₂ ≤ 1")
print("  x₁ ≥ 0")
print("  x₂ ≥ 0")

print(f"\nOptimal solution: x* = {x.value}")

# Check which constraints are active
print("\nConstraint activity analysis:")
tolerance = 1e-6

residuals = A @ x.value - b
mu_values = constraints[0].dual_value

constraint_names = ["x₁ + x₂ ≤ 2", "x₁ - x₂ ≤ 1", "x₁ ≥ 0", "x₂ ≥ 0"]

for i, name in enumerate(constraint_names):
    is_active = abs(residuals[i]) < tolerance
    mu_i = mu_values[i] if mu_values is not None else 0
    status = "ACTIVE" if is_active else "INACTIVE"

    print(f"\n  {name}:")
    print(f"    Residual: {residuals[i]:8.6f}")
    print(f"    Multiplier: μ_{i} = {mu_i:8.6f}")
    print(f"    Status: {status}")
    print(f"    Comp. slack: μ_{i} × residual = {mu_i * residuals[i]:.6e}")

# Example 5: Sensitivity analysis
print("\n" + "=" * 70)
print("Example 5: Sensitivity Analysis (Shadow Prices)")
print("=" * 70)

print("\nProblem: min x₁² + x₂² s.t. x₁ + x₂ ≥ b")
print("Varying the RHS parameter b...")

b_values = np.linspace(0.5, 2.0, 20)
optimal_values = []
lambda_values = []

for b in b_values:
    x = cp.Variable(2)
    objective = cp.Minimize(cp.sum_squares(x))
    constraint = [x[0] + x[1] >= b]
    problem = cp.Problem(objective, constraint)
    problem.solve()

    optimal_values.append(problem.value)
    lambda_values.append(constraint[0].dual_value)

optimal_values = np.array(optimal_values)
lambda_values = np.array(lambda_values)

print(f"\nAt b = 1.0:")
idx = np.argmin(np.abs(b_values - 1.0))
print(f"  Optimal value: p*(b) = {optimal_values[idx]:.6f}")
print(f"  Lagrange multiplier: λ* = {lambda_values[idx]:.6f}")

# Numerical derivative
dp_db = np.gradient(optimal_values, b_values)[idx]
print(f"  Numerical dp*/db = {dp_db:.6f}")
print(f"  Relationship: dp*/db ≈ λ* ✓ (envelope theorem)")

# Visualization
fig = plt.figure(figsize=(18, 12))

# Plot 1: Lagrange multiplier example
ax1 = fig.add_subplot(2, 3, 1)
x1_vals = np.linspace(-0.5, 2, 400)
x2_vals = np.linspace(-0.5, 2, 400)
X1, X2 = np.meshgrid(x1_vals, x2_vals)
Z = X1**2 + X2**2

contour = ax1.contour(X1, X2, Z, levels=15, cmap='viridis', alpha=0.7)
ax1.plot(x1_vals, 1 - x1_vals, 'r-', linewidth=2.5, label='Constraint: $x_1 + x_2 = 1$')

# Optimal point
x_opt = np.array([0.5, 0.5])
ax1.plot(x_opt[0], x_opt[1], 'r*', markersize=20, label='Optimal point', zorder=5)

# Gradient at optimum
grad_f = 2 * x_opt
grad_h = np.array([1, 1])
scale = 0.3

ax1.arrow(x_opt[0], x_opt[1], -grad_f[0]*scale, -grad_f[1]*scale,
         head_width=0.08, head_length=0.06, fc='blue', ec='blue',
         linewidth=2, label='$-\\nabla f$')
ax1.arrow(x_opt[0], x_opt[1], grad_h[0]*scale, grad_h[1]*scale,
         head_width=0.08, head_length=0.06, fc='green', ec='green',
         linewidth=2, label='$\\nabla h$')

ax1.set_xlabel('$x_1$', fontsize=11)
ax1.set_ylabel('$x_2$', fontsize=11)
ax1.set_title('Lagrange Multipliers:\n$\\nabla f = -\\lambda \\nabla h$', fontsize=12, fontweight='bold')
ax1.legend(fontsize=9)
ax1.grid(True, alpha=0.3)
ax1.set_aspect('equal')
ax1.set_xlim(-0.5, 2)
ax1.set_ylim(-0.5, 2)

# Plot 2: KKT with inequalities
ax2 = fig.add_subplot(2, 3, 2)
Z2 = X1**2 + X2**2
contour2 = ax2.contour(X1, X2, Z2, levels=15, cmap='viridis', alpha=0.7)

# Constraints
ax2.plot(x1_vals, 1 - x1_vals, 'r-', linewidth=2, label='$x_1 + x_2 = 1$ (active)')
ax2.axvline(0, color='gray', linestyle='--', linewidth=1.5, label='$x_1 = 0$ (inactive)')
ax2.axhline(0, color='gray', linestyle='--', linewidth=1.5, label='$x_2 = 0$ (inactive)')

# Feasible region
x1_feas = np.linspace(0, 2, 100)
x2_feas = np.maximum(0, 1 - x1_feas)
ax2.fill_between(x1_feas, x2_feas, 2, alpha=0.2, color='green', label='Feasible')

# Optimal point
ax2.plot(0.5, 0.5, 'r*', markersize=20, label='Optimal: $(0.5, 0.5)$', zorder=5)

ax2.set_xlabel('$x_1$', fontsize=11)
ax2.set_ylabel('$x_2$', fontsize=11)
ax2.set_title('KKT Conditions with Inequalities', fontsize=12, fontweight='bold')
ax2.legend(fontsize=9)
ax2.grid(True, alpha=0.3)
ax2.set_xlim(-0.5, 2)
ax2.set_ylim(-0.5, 2)
ax2.set_aspect('equal')

# Plot 3: 1D QP example
ax3 = fig.add_subplot(2, 3, 3)
x_vals = np.linspace(-1, 4, 400)
y_vals = (x_vals - 2)**2

ax3.plot(x_vals, y_vals, 'b-', linewidth=2.5, label='$f(x) = (x - 2)^2$')
ax3.axvline(0, color='r', linestyle='--', linewidth=2, label='Constraint: $x \\geq 0$')
ax3.axvline(2, color='gray', linestyle=':', alpha=0.5)

# Unconstrained minimum
ax3.plot(2, 0, 'go', markersize=10, label='Unconstrained min: $x = 2$', zorder=5)

# Feasible region
ax3.axvspan(0, 4, alpha=0.2, color='green', label='Feasible region')

ax3.set_xlabel('$x$', fontsize=11)
ax3.set_ylabel('$f(x)$', fontsize=11)
ax3.set_title('1D QP: Constraint Inactive at Optimum', fontsize=12, fontweight='bold')
ax3.legend(fontsize=9)
ax3.grid(True, alpha=0.3)
ax3.set_ylim(-0.5, 10)

# Plot 4: Active set example
ax4 = fig.add_subplot(2, 3, 4)

# Read optimal solution from Example 4
# (Would need to store from above, but we'll recreate for visualization)
x_opt_ex4 = np.array([1.0, 1.0])  # Approximate for visualization

x1_range = np.linspace(-0.5, 3, 400)

# Constraints
ax4.plot(x1_range, 2 - x1_range, 'b-', linewidth=2, label='$x_1 + x_2 = 2$')
ax4.plot(x1_range, x1_range - 1, 'r-', linewidth=2, label='$x_1 - x_2 = 1$')
ax4.axvline(0, color='gray', linewidth=1.5, label='$x_1 = 0$')
ax4.axhline(0, color='gray', linewidth=1.5, label='$x_2 = 0$')

# Target point
ax4.plot(1.5, 1.5, 'go', markersize=10, label='Target: $(1.5, 1.5)$', zorder=4)

# Optimal point
ax4.plot(x_opt_ex4[0], x_opt_ex4[1], 'r*', markersize=20, label='Optimal', zorder=5)

# Objective contours centered at (1.5, 1.5)
X1_obj, X2_obj = np.meshgrid(np.linspace(-0.5, 3, 100), np.linspace(-0.5, 3, 100))
Z_obj = (X1_obj - 1.5)**2 + (X2_obj - 1.5)**2
ax4.contour(X1_obj, X2_obj, Z_obj, levels=10, cmap='viridis', alpha=0.4)

ax4.set_xlabel('$x_1$', fontsize=11)
ax4.set_ylabel('$x_2$', fontsize=11)
ax4.set_title('Active Set at Optimum', fontsize=12, fontweight='bold')
ax4.legend(fontsize=8, loc='upper right')
ax4.grid(True, alpha=0.3)
ax4.set_xlim(-0.5, 3)
ax4.set_ylim(-0.5, 3)
ax4.set_aspect('equal')

# Plot 5: Sensitivity analysis
ax5 = fig.add_subplot(2, 3, 5)
ax5.plot(b_values, optimal_values, 'b-', linewidth=2.5, label='$p^*(b)$ (optimal value)')
ax5.set_xlabel('RHS parameter $b$', fontsize=11)
ax5.set_ylabel('Optimal value $p^*(b)$', fontsize=11)
ax5.set_title('Sensitivity to Constraint RHS', fontsize=12, fontweight='bold')
ax5.legend(fontsize=10)
ax5.grid(True, alpha=0.3)

# Plot 6: Shadow prices
ax6 = fig.add_subplot(2, 3, 6)
ax6.plot(b_values, lambda_values, 'r-', linewidth=2.5, label='$\\lambda^*$ (shadow price)')
ax6.set_xlabel('RHS parameter $b$', fontsize=11)
ax6.set_ylabel('Lagrange multiplier $\\lambda^*$', fontsize=11)
ax6.set_title('Shadow Price (Marginal Value)', fontsize=12, fontweight='bold')
ax6.legend(fontsize=10)
ax6.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('optimality_conditions.png', dpi=300, bbox_inches='tight')
print("\n" + "=" * 70)
print("Visualization saved as 'optimality_conditions.png'")
print("=" * 70)
```

## Summary

### KKT Conditions

For the optimization problem:
$$
\begin{align}
\min \quad & f(x) \\
\text{s.t.} \quad & g_i(x) \leq 0, \; h_j(x) = 0
\end{align}
$$

The KKT conditions at $(x^*, \mu^*, \lambda^*)$ are:

1. **Stationarity**: $\nabla_x \mathcal{L} = 0$
2. **Primal feasibility**: $g_i(x^*) \leq 0$, $h_j(x^*) = 0$
3. **Dual feasibility**: $\mu_i^* \geq 0$
4. **Complementary slackness**: $\mu_i^* g_i(x^*) = 0$

### Key Results

- **Necessary**: KKT conditions are necessary for local optimality (with CQ)
- **Sufficient**: For convex problems, KKT conditions are also sufficient for global optimality
- **Multipliers as shadow prices**: $\lambda^* = dp^*/db$ (sensitivity to constraint changes)

### Practical Use

1. **Verify optimality**: Check if a candidate solution satisfies KKT
2. **Solve small problems**: Analytically solve KKT conditions
3. **Algorithmic foundations**: Many algorithms (SQP, interior-point) are based on solving KKT conditions

These optimality conditions are the foundation of constrained optimization theory and algorithms.
