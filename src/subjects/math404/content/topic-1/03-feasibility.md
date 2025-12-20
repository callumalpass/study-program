---
title: "Feasibility and Constraint Qualification"
description: "Understanding feasible sets, constraint qualifications, and methods for checking feasibility"
---

# Feasibility and Constraint Qualification

## Feasible Sets

The **feasible set** (or feasible region) is the set of all points that satisfy all constraints of an optimization problem:

$$
\mathcal{F} = \{x \in \mathbb{R}^n : g_i(x) \leq 0, \; h_j(x) = 0, \; x \in \mathcal{X}\}
$$

where:
- $g_i(x) \leq 0$ are inequality constraints, $i = 1, \ldots, m$
- $h_j(x) = 0$ are equality constraints, $j = 1, \ldots, p$
- $\mathcal{X}$ is the domain (e.g., $\mathbb{R}^n$, $\mathbb{R}^n_+$, $\mathbb{Z}^n$)

A point $x \in \mathcal{F}$ is called **feasible**. A point $x \notin \mathcal{F}$ is **infeasible**.

### Properties of Feasible Sets

**Theorem (Intersection Property)**: The feasible set is the intersection of individual constraint sets:

$$
\mathcal{F} = \mathcal{X} \cap \bigcap_{i=1}^m \{x : g_i(x) \leq 0\} \cap \bigcap_{j=1}^p \{x : h_j(x) = 0\}
$$

**Compactness**: A feasible set is **compact** if it is closed and bounded. Compact feasible sets have important properties:
- If $f$ is continuous and $\mathcal{F}$ is compact and nonempty, then the optimization problem has a solution (Weierstrass theorem).

**Connectedness**: A set is **connected** if it cannot be written as the union of two disjoint nonempty open sets. For optimization, disconnected feasible sets can have multiple local minima in different components.

## Feasibility vs. Infeasibility

An optimization problem can be:

1. **Feasible**: $\mathcal{F} \neq \emptyset$ (at least one point satisfies all constraints)
2. **Infeasible**: $\mathcal{F} = \emptyset$ (no point satisfies all constraints)

If a problem is infeasible, it has no solution—not even a local one.

### Example: Infeasible Linear Program

$$
\begin{align}
\min \quad & x_1 + x_2 \\
\text{s.t.} \quad & x_1 + x_2 \geq 10 \\
& x_1 + x_2 \leq 5 \\
& x_1, x_2 \geq 0
\end{align}
$$

This problem is infeasible because the first two constraints are contradictory: we cannot have $x_1 + x_2 \geq 10$ and $x_1 + x_2 \leq 5$ simultaneously.

### Example: Feasible but Unbounded

$$
\begin{align}
\min \quad & -x_1 - x_2 \\
\text{s.t.} \quad & x_1 + x_2 \geq 10 \\
& x_1, x_2 \geq 0
\end{align}
$$

This problem is feasible (e.g., $x = (10, 0)$ is feasible), but the optimal value is $-\infty$ because we can make $x_1 + x_2$ arbitrarily large.

## Active and Inactive Constraints

At a point $x \in \mathcal{F}$:

**Active constraint**: A constraint that holds with equality.
- Inequality $g_i(x) \leq 0$ is active if $g_i(x) = 0$
- Equality $h_j(x) = 0$ is always active

**Inactive (or slack) constraint**: An inequality that holds strictly.
- Inequality $g_i(x) \leq 0$ is inactive if $g_i(x) < 0$

The set of active inequality constraints at $x$ is denoted:

$$
\mathcal{A}(x) = \{i : g_i(x) = 0\}
$$

### Why Active Constraints Matter

Active constraints determine the local geometry of the feasible set. At an optimal point $x^*$:
- Inactive constraints don't affect the solution locally (we could relax them slightly without changing $x^*$)
- Active constraints "bind" the solution—relaxing them might allow a better solution

### Example: Active Set

Consider:
$$
\begin{align}
\min \quad & x_1^2 + x_2^2 \\
\text{s.t.} \quad & x_1 + x_2 \geq 1 \\
& x_1 \geq 0 \\
& x_2 \geq 0
\end{align}
$$

At the optimal point $x^* = (0.5, 0.5)$:
- $x_1 + x_2 = 1$ is **active** (holds with equality)
- $x_1 = 0.5 > 0$ is **inactive**
- $x_2 = 0.5 > 0$ is **inactive**

## Constraint Qualifications

**Constraint qualifications** (CQs) are regularity conditions on constraints that ensure well-behaved optimality conditions (like KKT conditions, which we'll see later).

Without constraint qualifications, standard optimality conditions may fail even at true optima.

### Why Do We Need Constraint Qualifications?

Consider this simple problem:

$$
\begin{align}
\min \quad & x \\
\text{s.t.} \quad & x^3 \leq 0
\end{align}
$$

The optimal solution is $x^* = 0$. The constraint $x^3 \leq 0$ is active. However, the gradient of the constraint at $x^* = 0$ is:

$$
\nabla g(x^*) = 3(x^*)^2 = 0
$$

This zero gradient causes problems—it cannot represent a meaningful "direction" for the constraint. Constraint qualifications prevent such degeneracies.

### Linear Independence Constraint Qualification (LICQ)

**LICQ**: The gradients of active constraints are linearly independent.

At $x \in \mathcal{F}$, let $\mathcal{E}$ be the set of equality constraints and $\mathcal{A}(x)$ be the active inequality constraints. LICQ holds if:

$$
\{\nabla h_j(x) : j \in \mathcal{E}\} \cup \{\nabla g_i(x) : i \in \mathcal{A}(x)\}
$$

are linearly independent vectors.

**LICQ is the strongest constraint qualification**—it implies all others.

**Example (LICQ satisfied)**:
$$
\begin{align}
\min \quad & f(x) \\
\text{s.t.} \quad & x_1 + x_2 \leq 1 \\
& x_1 - x_2 \leq 0
\end{align}
$$

At $x^* = (0.5, 0.5)$, both constraints are active:
- $\nabla g_1 = (1, 1)$
- $\nabla g_2 = (1, -1)$

These are linearly independent, so LICQ holds.

**Example (LICQ violated)**:
$$
\begin{align}
\min \quad & f(x) \\
\text{s.t.} \quad & x_1 + x_2 \leq 1 \\
& 2x_1 + 2x_2 \leq 2
\end{align}
$$

At $x^* = (0.5, 0.5)$:
- $\nabla g_1 = (1, 1)$
- $\nabla g_2 = (2, 2) = 2 \nabla g_1$

These are linearly dependent, so LICQ fails. (Note: the constraints are redundant.)

### Mangasarian-Fromovitz Constraint Qualification (MFCQ)

**MFCQ**: The gradients of equality constraints are linearly independent, and there exists a direction that strictly decreases all active inequality constraints.

Formally, at $x \in \mathcal{F}$:
1. $\{\nabla h_j(x) : j \in \mathcal{E}\}$ are linearly independent
2. There exists $d \in \mathbb{R}^n$ such that:
   - $\nabla h_j(x)^T d = 0$ for all $j \in \mathcal{E}$
   - $\nabla g_i(x)^T d < 0$ for all $i \in \mathcal{A}(x)$

MFCQ is weaker than LICQ but still quite strong.

### Slater's Condition

**Slater's condition**: For convex problems, there exists a strictly feasible point.

For a convex optimization problem:
$$
\begin{align}
\min \quad & f(x) \\
\text{s.t.} \quad & g_i(x) \leq 0, \quad i = 1, \ldots, m \\
& Ax = b
\end{align}
$$

where $f$ and $g_i$ are convex, Slater's condition holds if there exists $x \in \mathcal{F}$ such that:
- $g_i(x) < 0$ for all $i$ (strict inequality for all convex inequalities)
- $Ax = b$ (equality for affine constraints)

Slater's condition is crucial for **strong duality** in convex optimization.

### Constraint Qualification Hierarchy

$$
\text{LICQ} \implies \text{MFCQ} \implies \text{Slater's condition (for convex problems)}
$$

## Checking Feasibility

### Analytical Methods

For simple problems, we can check feasibility by inspection or algebraic manipulation.

**Example**: Is the following feasible?
$$
\begin{align}
x_1 + x_2 &= 5 \\
x_1 - x_2 &= 1 \\
x_1, x_2 &\geq 0
\end{align}
$$

Solving: $x_1 = 3$, $x_2 = 2$. Since both are nonnegative, the problem is feasible.

### Phase I Method (Linear Programming)

For linear programs, we can check feasibility by solving an auxiliary problem.

Original problem:
$$
\begin{align}
\min \quad & c^T x \\
\text{s.t.} \quad & Ax = b \\
& x \geq 0
\end{align}
$$

**Phase I problem**: Introduce artificial variables $y \geq 0$:
$$
\begin{align}
\min \quad & \mathbf{1}^T y \\
\text{s.t.} \quad & Ax + y = b \\
& x, y \geq 0
\end{align}
$$

- If the optimal value is 0, the original problem is feasible (we can set $y = 0$)
- If the optimal value is positive, the original problem is infeasible

### Constraint Relaxation

If a problem is infeasible, we may want to find the "least infeasible" point by relaxing constraints.

**Penalty formulation**: Minimize constraint violations:
$$
\min_{x} \sum_{i=1}^m \max\{0, g_i(x)\}^2 + \sum_{j=1}^p h_j(x)^2
$$

The optimal value tells us how much the constraints are violated.

**Elastic formulation**: Introduce slack variables with penalties:
$$
\begin{align}
\min \quad & c^T x + M \sum_i s_i \\
\text{s.t.} \quad & g_i(x) \leq s_i \\
& s_i \geq 0
\end{align}
$$

where $M$ is a large penalty weight.

## Python Implementation

```python
import numpy as np
import cvxpy as cp
import matplotlib.pyplot as plt
from scipy.optimize import minimize

print("=" * 70)
print("FEASIBILITY ANALYSIS")
print("=" * 70)

# Example 1: Feasible Linear Program
print("\n" + "=" * 70)
print("Example 1: Feasible Linear Program")
print("=" * 70)

x = cp.Variable(2)
objective = cp.Minimize(x[0] + x[1])
constraints = [
    x[0] + x[1] >= 5,
    x[0] - x[1] <= 3,
    x[0] >= 0,
    x[1] >= 0
]

problem = cp.Problem(objective, constraints)
problem.solve()

print(f"Status: {problem.status}")
if problem.status == 'optimal':
    print(f"Feasible! Optimal solution: x = {x.value}")
    print(f"Optimal value: {problem.value:.4f}")

    # Check which constraints are active
    print("\nConstraint activity:")
    print(f"  x1 + x2 >= 5: {x.value[0] + x.value[1]:.4f} (active: {abs(x.value[0] + x.value[1] - 5) < 1e-6})")
    print(f"  x1 - x2 <= 3: {x.value[0] - x.value[1]:.4f} (active: {abs(x.value[0] - x.value[1] - 3) < 1e-6})")
    print(f"  x1 >= 0: {x.value[0]:.4f} (active: {abs(x.value[0]) < 1e-6})")
    print(f"  x2 >= 0: {x.value[1]:.4f} (active: {abs(x.value[1]) < 1e-6})")

# Example 2: Infeasible Linear Program
print("\n" + "=" * 70)
print("Example 2: Infeasible Linear Program")
print("=" * 70)

x = cp.Variable(2)
objective = cp.Minimize(x[0] + x[1])
constraints = [
    x[0] + x[1] >= 10,
    x[0] + x[1] <= 5,
    x[0] >= 0,
    x[1] >= 0
]

problem = cp.Problem(objective, constraints)
problem.solve()

print(f"Status: {problem.status}")
if problem.status == 'infeasible':
    print("Problem is infeasible: no point satisfies all constraints")

# Example 3: Phase I Method
print("\n" + "=" * 70)
print("Example 3: Phase I Method for Feasibility")
print("=" * 70)

# Original problem (possibly infeasible)
# min x1 + x2
# s.t. 2x1 + x2 = 8
#      x1 + 3x2 = 12
#      x1, x2 >= 0

A = np.array([[2, 1], [1, 3]])
b = np.array([8, 12])

# Phase I: add artificial variables
# min y1 + y2
# s.t. 2x1 + x2 + y1 = 8
#      x1 + 3x2 + y2 = 12
#      x1, x2, y1, y2 >= 0

x = cp.Variable(2, nonneg=True)
y = cp.Variable(2, nonneg=True)

phase1_obj = cp.Minimize(cp.sum(y))
phase1_constraints = [A @ x + y == b]

phase1_problem = cp.Problem(phase1_obj, phase1_constraints)
phase1_problem.solve()

print(f"Phase I optimal value: {phase1_problem.value:.6f}")
if phase1_problem.value < 1e-6:
    print("Original problem is FEASIBLE")
    print(f"Feasible point: x = {x.value}")
else:
    print("Original problem is INFEASIBLE")
    print(f"Minimum constraint violation: {phase1_problem.value:.4f}")

# Example 4: Constraint Qualifications
print("\n" + "=" * 70)
print("Example 4: Checking LICQ")
print("=" * 70)

def check_licq(x_point, constraint_gradients):
    """
    Check if LICQ holds at a point.
    constraint_gradients: list of gradients of active constraints
    """
    if len(constraint_gradients) == 0:
        return True, "No active constraints"

    # Stack gradients as rows
    gradient_matrix = np.array(constraint_gradients)

    # Check linear independence via rank
    rank = np.linalg.matrix_rank(gradient_matrix)
    num_constraints = len(constraint_gradients)

    if rank == num_constraints:
        return True, f"LICQ satisfied (rank = {rank})"
    else:
        return False, f"LICQ violated (rank = {rank} < {num_constraints})"

# Example point: x = (1, 0)
# Active constraints: x1 + x2 = 1, x2 = 0
x_point = np.array([1, 0])

# Gradients of active constraints
grad1 = np.array([1, 1])  # ∇(x1 + x2)
grad2 = np.array([0, 1])  # ∇(x2)

licq_holds, message = check_licq(x_point, [grad1, grad2])
print(f"At point x = {x_point}:")
print(f"  Active constraints: x1 + x2 = 1, x2 = 0")
print(f"  Gradients: {grad1}, {grad2}")
print(f"  {message}")

# Example with LICQ violation
print("\nAt point x = (0.5, 0.5):")
# Active constraints: x1 + x2 = 1, 2x1 + 2x2 = 2 (redundant!)
grad1 = np.array([1, 1])
grad2 = np.array([2, 2])  # Parallel to grad1

licq_holds, message = check_licq(x_point, [grad1, grad2])
print(f"  Active constraints: x1 + x2 = 1, 2x1 + 2x2 = 2")
print(f"  Gradients: {grad1}, {grad2}")
print(f"  {message}")

# Example 5: Finding Least Infeasible Point
print("\n" + "=" * 70)
print("Example 5: Finding Least Infeasible Point")
print("=" * 70)

# Infeasible system:
# x1 + x2 >= 10
# x1 + x2 <= 5
# x1, x2 >= 0

# We'll minimize constraint violations
x = cp.Variable(2, nonneg=True)
s1 = cp.Variable(nonneg=True)  # Slack for first constraint
s2 = cp.Variable(nonneg=True)  # Slack for second constraint

# Minimize total violation
objective = cp.Minimize(s1 + s2)

# Relaxed constraints
constraints = [
    x[0] + x[1] + s1 >= 10,   # Can violate by s1
    x[0] + x[1] - s2 <= 5     # Can violate by s2
]

problem = cp.Problem(objective, constraints)
problem.solve()

print(f"Minimum total constraint violation: {problem.value:.4f}")
print(f"Least infeasible point: x = {x.value}")
print(f"Violation of x1 + x2 >= 10: {s1.value:.4f}")
print(f"Violation of x1 + x2 <= 5: {s2.value:.4f}")
print(f"\nNote: Constraints require x1 + x2 >= 10 AND x1 + x2 <= 5")
print(f"This is impossible, minimum violation is {problem.value:.4f}")

# Example 6: Slater's Condition for Convex Problems
print("\n" + "=" * 70)
print("Example 6: Checking Slater's Condition")
print("=" * 70)

# Convex problem:
# min x1^2 + x2^2
# s.t. x1 + x2 >= 1
#      x1^2 + x2^2 <= 4

print("Problem:")
print("  min x1^2 + x2^2")
print("  s.t. -(x1 + x2) <= -1  (rewritten: x1 + x2 >= 1)")
print("       x1^2 + x2^2 <= 4")

# Find a strictly feasible point (Slater point)
x = cp.Variable(2)
# We just need to find any point with strict inequalities
objective = cp.Minimize(0)  # Don't care about objective
constraints = [
    x[0] + x[1] >= 1.1,        # Strict version of x1 + x2 >= 1
    cp.sum_squares(x) <= 3.9   # Strict version of x1^2 + x2^2 <= 4
]

problem = cp.Problem(objective, constraints)
problem.solve()

if problem.status == 'optimal':
    print(f"\nSlater's condition SATISFIED")
    print(f"Strictly feasible point: x = {x.value}")
    print(f"  x1 + x2 = {x.value[0] + x.value[1]:.4f} > 1")
    print(f"  x1^2 + x2^2 = {np.sum(x.value**2):.4f} < 4")
else:
    print(f"\nSlater's condition NOT satisfied (no strictly feasible point)")

# Visualization
fig, axes = plt.subplots(2, 2, figsize=(14, 12))

# Plot 1: Feasible LP
ax = axes[0, 0]
x1_vals = np.linspace(0, 10, 400)

# Constraints: x1 + x2 >= 5, x1 - x2 <= 3
x2_lower = 5 - x1_vals  # From x1 + x2 = 5
x2_upper = x1_vals - 3  # From x1 - x2 = 3

ax.plot(x1_vals, x2_lower, 'b-', label='$x_1 + x_2 = 5$', linewidth=2)
ax.plot(x1_vals, x2_upper, 'r-', label='$x_1 - x_2 = 3$', linewidth=2)

# Fill feasible region
mask = (x2_lower >= 0) & (x2_upper >= 0) & (x1_vals >= 0)
x2_feas = np.maximum(x2_lower, x2_upper)
ax.fill_between(x1_vals[mask], x2_feas[mask], 10, alpha=0.3, color='green', label='Feasible region')

ax.set_xlim(0, 10)
ax.set_ylim(0, 10)
ax.set_xlabel('$x_1$', fontsize=12)
ax.set_ylabel('$x_2$', fontsize=12)
ax.set_title('Example 1: Feasible LP', fontsize=14, fontweight='bold')
ax.legend(fontsize=10)
ax.grid(True, alpha=0.3)

# Plot 2: Infeasible LP
ax = axes[0, 1]
x1_vals = np.linspace(0, 15, 400)

# Constraints: x1 + x2 >= 10, x1 + x2 <= 5
x2_lower = 10 - x1_vals  # From x1 + x2 = 10
x2_upper = 5 - x1_vals   # From x1 + x2 = 5

ax.plot(x1_vals, x2_lower, 'b-', label='$x_1 + x_2 = 10$', linewidth=2)
ax.plot(x1_vals, x2_upper, 'r-', label='$x_1 + x_2 = 5$', linewidth=2)

# Fill regions
ax.fill_between(x1_vals, x2_lower, 15, where=(x2_lower >= 0) & (x1_vals >= 0),
                alpha=0.3, color='blue', label='$x_1 + x_2 \\geq 10$')
ax.fill_between(x1_vals, 0, x2_upper, where=(x2_upper >= 0) & (x1_vals >= 0),
                alpha=0.3, color='red', label='$x_1 + x_2 \\leq 5$')

ax.text(7.5, 7, 'NO OVERLAP\n(Infeasible)', fontsize=14, fontweight='bold',
        ha='center', bbox=dict(boxstyle='round', facecolor='yellow', alpha=0.7))

ax.set_xlim(0, 15)
ax.set_ylim(0, 15)
ax.set_xlabel('$x_1$', fontsize=12)
ax.set_ylabel('$x_2$', fontsize=12)
ax.set_title('Example 2: Infeasible LP', fontsize=14, fontweight='bold')
ax.legend(fontsize=10)
ax.grid(True, alpha=0.3)

# Plot 3: Active vs Inactive Constraints
ax = axes[1, 0]
x1_vals = np.linspace(-1, 3, 400)
x2_vals = np.linspace(-1, 3, 400)
X1, X2 = np.meshgrid(x1_vals, x2_vals)

# Objective: x1^2 + x2^2
Z = X1**2 + X2**2

# Plot objective contours
contour = ax.contour(X1, X2, Z, levels=15, cmap='viridis', alpha=0.6)

# Constraints
ax.plot(x1_vals, 1 - x1_vals, 'r-', linewidth=2, label='$x_1 + x_2 = 1$ (active)')
ax.axvline(0, color='gray', linestyle='--', linewidth=1.5, label='$x_1 = 0$ (inactive)')
ax.axhline(0, color='gray', linestyle='--', linewidth=1.5, label='$x_2 = 0$ (inactive)')

# Optimal point
ax.plot(0.5, 0.5, 'r*', markersize=20, label='Optimal: $(0.5, 0.5)$', zorder=5)

# Fill feasible region
x2_constraint = 1 - x1_vals
mask = (x1_vals >= 0) & (x2_constraint >= 0)
ax.fill_between(x1_vals[mask], 0, x2_constraint[mask], alpha=0.2, color='green', label='Feasible')

ax.set_xlim(-0.5, 2)
ax.set_ylim(-0.5, 2)
ax.set_xlabel('$x_1$', fontsize=12)
ax.set_ylabel('$x_2$', fontsize=12)
ax.set_title('Example: Active vs Inactive Constraints', fontsize=14, fontweight='bold')
ax.legend(fontsize=9)
ax.grid(True, alpha=0.3)
ax.set_aspect('equal')

# Plot 4: Slater's Condition
ax = axes[1, 1]
theta = np.linspace(0, 2*np.pi, 400)

# Constraint 1: x1^2 + x2^2 <= 4 (circle of radius 2)
x1_circle = 2 * np.cos(theta)
x2_circle = 2 * np.sin(theta)
ax.plot(x1_circle, x2_circle, 'b-', linewidth=2, label='$x_1^2 + x_2^2 = 4$')
ax.fill(x1_circle, x2_circle, alpha=0.2, color='blue')

# Constraint 2: x1 + x2 >= 1 (half-plane)
x1_line = np.linspace(-3, 3, 100)
x2_line = 1 - x1_line
ax.plot(x1_line, x2_line, 'r-', linewidth=2, label='$x_1 + x_2 = 1$')

# Feasible region (intersection)
x1_vals = np.linspace(-2, 2, 1000)
x2_lower = 1 - x1_vals
x2_upper = np.sqrt(np.maximum(0, 4 - x1_vals**2))
x2_lower_bounded = np.maximum(x2_lower, -np.sqrt(np.maximum(0, 4 - x1_vals**2)))

for i in range(len(x1_vals)):
    if x2_upper[i] >= x2_lower[i] and 4 - x1_vals[i]**2 >= 0:
        ax.plot([x1_vals[i], x1_vals[i]], [x2_lower_bounded[i], x2_upper[i]],
               'g-', alpha=0.3, linewidth=1)

# Slater point (strictly feasible)
slater_x1, slater_x2 = 1.0, 0.5
ax.plot(slater_x1, slater_x2, 'g*', markersize=20, label=f'Slater point ({slater_x1}, {slater_x2})', zorder=5)

# Optimal point
opt_x1, opt_x2 = 0.5, 0.5
ax.plot(opt_x1, opt_x2, 'r*', markersize=20, label=f'Optimum ({opt_x1}, {opt_x2})', zorder=5)

ax.set_xlim(-3, 3)
ax.set_ylim(-3, 3)
ax.set_xlabel('$x_1$', fontsize=12)
ax.set_ylabel('$x_2$', fontsize=12)
ax.set_title("Slater's Condition for Convex Problem", fontsize=14, fontweight='bold')
ax.legend(fontsize=10)
ax.grid(True, alpha=0.3)
ax.set_aspect('equal')

plt.tight_layout()
plt.savefig('feasibility_analysis.png', dpi=300, bbox_inches='tight')
print("\n" + "=" * 70)
print("Visualization saved as 'feasibility_analysis.png'")
print("=" * 70)
```

## Summary

### Key Concepts

1. **Feasible set**: The set of all points satisfying all constraints
2. **Active constraints**: Constraints that hold with equality at a given point
3. **Constraint qualifications**: Regularity conditions ensuring well-behaved optimality conditions
4. **LICQ**: Strongest CQ—gradients of active constraints are linearly independent
5. **Slater's condition**: For convex problems—existence of strictly feasible point

### Practical Implications

- Always check feasibility before solving
- Identify active constraints at the solution
- Verify constraint qualifications for theoretical guarantees
- Use Phase I methods or penalty formulations for feasibility checking

In the next section, we'll explore convexity—a property that makes optimization problems tractable and guarantees global optimality.
