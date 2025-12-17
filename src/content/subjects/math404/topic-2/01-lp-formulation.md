---
title: "Linear Programming Formulation"
description: "Formulating and standardizing linear programs, canonical and standard forms"
---

# Linear Programming Formulation

## Introduction

Linear Programming (LP) is a method for optimizing a linear objective function subject to linear constraints. It's one of the most important and widely-used optimization techniques.

**General form**:

$$
\begin{align}
\text{minimize} \quad & c^T x \\
\text{subject to} \quad & Ax \leq b \\
& A_{eq} x = b_{eq} \\
& x \geq 0
\end{align}
$$

where:
- $x \in \mathbb{R}^n$ is the decision variable
- $c \in \mathbb{R}^n$ is the cost vector
- $A \in \mathbb{R}^{m \times n}$ is the inequality constraint matrix
- $b \in \mathbb{R}^m$ is the inequality RHS
- $A_{eq} \in \mathbb{R}^{p \times n}$ is the equality constraint matrix
- $b_{eq} \in \mathbb{R}^p$ is the equality RHS

## Standard Forms

### Inequality Form

$$
\begin{align}
\min \quad & c^T x \\
\text{s.t.} \quad & Ax \leq b
\end{align}
$$

### Equality Form (Standard Form)

$$
\begin{align}
\min \quad & c^T x \\
\text{s.t.} \quad & Ax = b \\
& x \geq 0
\end{align}
$$

This is the **standard form** used by the simplex algorithm.

### Canonical Form

$$
\begin{align}
\min \quad & c^T x \\
\text{s.t.} \quad & Ax \geq b \\
& x \geq 0
\end{align}
$$

## Converting Between Forms

Any LP can be converted to standard form:

**1. Maximize to minimize**: $\max c^T x = \min (-c)^T x$

**2. Inequality to equality**: Add slack variable $s \geq 0$
$$Ax \leq b \quad \Rightarrow \quad Ax + s = b, \; s \geq 0$$

**3. Opposite inequality**: Multiply by $-1$
$$Ax \geq b \quad \Rightarrow \quad -Ax \leq -b$$

**4. Unrestricted variable**: Split into positive and negative parts
$$x_i \text{ free} \quad \Rightarrow \quad x_i = x_i^+ - x_i^-, \; x_i^+, x_i^- \geq 0$$

**5. Absolute value**: Introduce auxiliary variable
$$|x_i| \leq t \quad \Rightarrow \quad -t \leq x_i \leq t$$

### Example: Converting to Standard Form

**Original**:
$$
\begin{align}
\max \quad & 3x_1 + 2x_2 \\
\text{s.t.} \quad & 2x_1 + x_2 \leq 10 \\
& x_1 + 3x_2 \geq 6 \\
& x_1 \geq 0, \; x_2 \text{ free}
\end{align}
$$

**Step 1**: Convert max to min
$$\min \quad -3x_1 - 2x_2$$

**Step 2**: Split free variable
$$x_2 = x_2^+ - x_2^-, \quad x_2^+, x_2^- \geq 0$$

**Step 3**: Add slack variables
$$
\begin{align}
2x_1 + x_2^+ - x_2^- + s_1 &= 10 \\
x_1 + 3x_2^+ - 3x_2^- - s_2 &= 6
\end{align}
$$

**Standard form**:
$$
\begin{align}
\min \quad & -3x_1 - 2x_2^+ + 2x_2^- \\
\text{s.t.} \quad & 2x_1 + x_2^+ - x_2^+ + s_1 = 10 \\
& x_1 + 3x_2^+ - 3x_2^- - s_2 = 6 \\
& x_1, x_2^+, x_2^-, s_1, s_2 \geq 0
\end{align}
$$

## Properties of Linear Programs

### Convexity

LPs are **convex optimization problems**:
- Objective function is linear (hence convex)
- Feasible set is a polyhedron (intersection of half-spaces, hence convex)

**Consequence**: Any local minimum is a global minimum.

### Feasible Set Structure

The feasible set is a **polyhedron**:

$$
\mathcal{P} = \{x : Ax \leq b\}
$$

Properties:
- Convex
- Closed
- May be unbounded
- May be empty (infeasible)

**Vertices** (extreme points): Points that cannot be expressed as convex combinations of other feasible points.

**Key theorem**: If an LP has an optimal solution, there exists an optimal vertex.

### Optimal Solutions

An LP can have:
1. **Unique optimal solution**
2. **Multiple optimal solutions** (if optimal face has dimension > 0)
3. **Unbounded optimal value** (value can go to $-\infty$)
4. **No solution** (infeasible problem)

## Common LP Formulations

### Production Planning

**Problem**: Maximize profit from producing products subject to resource constraints.

$$
\begin{align}
\max \quad & \sum_{j=1}^n p_j x_j \\
\text{s.t.} \quad & \sum_{j=1}^n a_{ij} x_j \leq b_i \quad \text{for all resources } i \\
& x_j \geq 0
\end{align}
$$

where:
- $x_j$ = units of product $j$
- $p_j$ = profit per unit of product $j$
- $a_{ij}$ = resource $i$ required per unit of product $j$
- $b_i$ = available amount of resource $i$

### Transportation Problem

**Problem**: Ship goods from suppliers to customers at minimum cost.

$$
\begin{align}
\min \quad & \sum_{i=1}^m \sum_{j=1}^n c_{ij} x_{ij} \\
\text{s.t.} \quad & \sum_{j=1}^n x_{ij} \leq s_i \quad \text{(supply)} \\
& \sum_{i=1}^m x_{ij} = d_j \quad \text{(demand)} \\
& x_{ij} \geq 0
\end{align}
$$

### Diet Problem

**Problem**: Meet nutritional requirements at minimum cost.

$$
\begin{align}
\min \quad & \sum_{j=1}^n c_j x_j \\
\text{s.t.} \quad & \sum_{j=1}^n a_{ij} x_j \geq r_i \quad \text{(nutrient requirements)} \\
& x_j \geq 0
\end{align}
$$

where:
- $x_j$ = amount of food $j$
- $c_j$ = cost per unit of food $j$
- $a_{ij}$ = amount of nutrient $i$ in food $j$
- $r_i$ = required amount of nutrient $i$

### Network Flow

**Problem**: Maximize flow from source to sink in a network.

$$
\begin{align}
\max \quad & \sum_{j:(s,j) \in E} f_{sj} \\
\text{s.t.} \quad & \sum_{j:(i,j) \in E} f_{ij} - \sum_{j:(j,i) \in E} f_{ji} = 0 \quad \text{(flow conservation)} \\
& 0 \leq f_{ij} \leq u_{ij} \quad \text{(capacity)}
\end{align}
$$

## Python Implementation

```python
import numpy as np
import cvxpy as cp
from scipy.optimize import linprog
import matplotlib.pyplot as plt

print("=" * 70)
print("LINEAR PROGRAMMING FORMULATIONS")
print("=" * 70)

# Example 1: Production Planning
print("\n" + "=" * 70)
print("Example 1: Production Planning")
print("=" * 70)

# Two products: A and B
# Product A: profit = $40, needs 2 hours labor, 1 kg material
# Product B: profit = $30, needs 1 hour labor, 2 kg material
# Available: 100 hours labor, 80 kg material

c = np.array([-40, -30])  # Negative for maximization
A_ub = np.array([[2, 1], [1, 2]])
b_ub = np.array([100, 80])
bounds = [(0, None), (0, None)]

result = linprog(c, A_ub=A_ub, b_ub=b_ub, bounds=bounds, method='highs')

print(f"\nOptimal production:")
print(f"  Product A: {result.x[0]:.2f} units")
print(f"  Product B: {result.x[1]:.2f} units")
print(f"  Maximum profit: ${-result.fun:.2f}")

# Using CVXPY
x = cp.Variable(2, nonneg=True)
objective = cp.Maximize(40*x[0] + 30*x[1])
constraints = [
    2*x[0] + x[1] <= 100,
    x[0] + 2*x[1] <= 80
]
problem = cp.Problem(objective, constraints)
problem.solve()

print(f"\nCVXPY verification:")
print(f"  Solution: {x.value}")
print(f"  Optimal value: ${problem.value:.2f}")

# Example 2: Transportation Problem
print("\n" + "=" * 70)
print("Example 2: Transportation Problem")
print("=" * 70)

# 3 warehouses, 4 customers
supply = np.array([30, 40, 25])
demand = np.array([20, 25, 15, 35])

# Cost matrix
cost = np.array([
    [8, 6, 10, 9],
    [9, 12, 13, 7],
    [14, 9, 16, 5]
])

m, n = cost.shape
x = cp.Variable((m, n), nonneg=True)

objective = cp.Minimize(cp.sum(cp.multiply(cost, x)))

constraints = []
for i in range(m):
    constraints.append(cp.sum(x[i, :]) <= supply[i])
for j in range(n):
    constraints.append(cp.sum(x[:, j]) == demand[j])

problem = cp.Problem(objective, constraints)
problem.solve()

print(f"\nOptimal cost: ${problem.value:.2f}")
print(f"\nShipment plan:")
print("        Cust1  Cust2  Cust3  Cust4   Total")
for i in range(m):
    row_sum = np.sum(x.value[i, :])
    print(f"Warehouse {i+1}: {x.value[i,0]:5.1f}  {x.value[i,1]:5.1f}  "
          f"{x.value[i,2]:5.1f}  {x.value[i,3]:5.1f}  = {row_sum:5.1f} / {supply[i]}")

# Example 3: Diet Problem
print("\n" + "=" * 70)
print("Example 3: Diet Problem")
print("=" * 70)

# Foods: Milk, Bread, Cheese, Potato, Fish, Yogurt
# Nutrients: Calories, Protein, Calcium

foods = ['Milk', 'Bread', 'Cheese', 'Potato', 'Fish', 'Yogurt']
nutrients = ['Calories', 'Protein', 'Calcium']

# Nutrient content (per unit)
nutrient_content = np.array([
    [90, 30, 300],   # Milk
    [65, 2, 15],     # Bread
    [115, 7, 200],   # Cheese
    [85, 2, 10],     # Potato
    [120, 20, 30],   # Fish
    [60, 5, 180]     # Yogurt
]).T  # Transpose to get (nutrients x foods)

# Requirements
requirements = np.array([2000, 55, 800])  # Min daily requirements

# Costs (per unit)
costs = np.array([0.5, 0.2, 0.8, 0.3, 1.5, 0.6])

# Solve
x = cp.Variable(len(foods), nonneg=True)
objective = cp.Minimize(costs @ x)

constraints = []
for i in range(len(nutrients)):
    constraints.append(nutrient_content[i, :] @ x >= requirements[i])

problem = cp.Problem(objective, constraints)
problem.solve()

print(f"\nOptimal diet cost: ${problem.value:.2f}")
print(f"\nFood amounts:")
for i, food in enumerate(foods):
    print(f"  {food:8s}: {x.value[i]:6.2f} units")

print(f"\nNutrient levels:")
for i, nutrient in enumerate(nutrients):
    actual = nutrient_content[i, :] @ x.value
    print(f"  {nutrient:10s}: {actual:7.1f} (required: {requirements[i]:7.1f})")

# Example 4: Form Conversion
print("\n" + "=" * 70)
print("Example 4: Converting to Standard Form")
print("=" * 70)

print("\nOriginal problem:")
print("  max  3x₁ + 2x₂")
print("  s.t. 2x₁ + x₂ ≤ 10")
print("       x₁ + 3x₂ ≥ 6")
print("       x₁ ≥ 0, x₂ free")

print("\nStandard form:")
print("  min  -3x₁ - 2x₂⁺ + 2x₂⁻")
print("  s.t. 2x₁ + x₂⁺ - x₂⁻ + s₁ = 10")
print("       x₁ + 3x₂⁺ - 3x₂⁻ - s₂ = 6")
print("       x₁, x₂⁺, x₂⁻, s₁, s₂ ≥ 0")

# Visualization
fig, axes = plt.subplots(2, 2, figsize=(14, 12))

# Plot 1: Production Planning
ax = axes[0, 0]
x1_vals = np.linspace(0, 100, 500)

# Constraints
x2_labor = 100 - 2*x1_vals
x2_material = (80 - x1_vals) / 2

ax.plot(x1_vals, x2_labor, 'b-', label='Labor: 2x₁ + x₂ = 100', linewidth=2)
ax.plot(x1_vals, x2_material, 'r-', label='Material: x₁ + 2x₂ = 80', linewidth=2)

# Feasible region
x2_feas = np.minimum(x2_labor, x2_material)
x2_feas = np.maximum(x2_feas, 0)
ax.fill_between(x1_vals, 0, x2_feas, where=(x2_feas >= 0), alpha=0.3,
                color='green', label='Feasible region')

# Optimal point
ax.plot(result.x[0], result.x[1], 'r*', markersize=20, label='Optimal', zorder=5)

# Objective contours
for profit in [800, 1200, 1600, 2000, 2400]:
    x2_iso = (profit - 40*x1_vals) / 30
    ax.plot(x1_vals, x2_iso, 'k--', alpha=0.3, linewidth=1)

ax.set_xlim(0, 60)
ax.set_ylim(0, 60)
ax.set_xlabel('Product A (x₁)', fontsize=11)
ax.set_ylabel('Product B (x₂)', fontsize=11)
ax.set_title('Production Planning LP', fontsize=12, fontweight='bold')
ax.legend(fontsize=9)
ax.grid(True, alpha=0.3)

# Plot 2: Transportation Network
ax = axes[0, 1]
warehouse_pos = np.array([[0, 2], [0, 1], [0, 0]])
customer_pos = np.array([[1, 2.5], [1, 1.75], [1, 0.75], [1, 0]])

# Draw warehouses
for i, pos in enumerate(warehouse_pos):
    ax.plot(pos[0], pos[1], 'rs', markersize=15)
    ax.text(pos[0]-0.1, pos[1], f'W{i+1}\n({supply[i]})', fontsize=9,
           ha='right', va='center')

# Draw customers
for j, pos in enumerate(customer_pos):
    ax.plot(pos[0], pos[1], 'bo', markersize=12)
    ax.text(pos[0]+0.1, pos[1], f'C{j+1}\n({demand[j]})', fontsize=9,
           ha='left', va='center')

# Draw shipments (only significant ones)
for i in range(m):
    for j in range(n):
        if x.value[i, j] > 0.5:
            w_pos = warehouse_pos[i]
            c_pos = customer_pos[j]
            ax.arrow(w_pos[0], w_pos[1], c_pos[0]-w_pos[0]-0.05, c_pos[1]-w_pos[1],
                    head_width=0.05, head_length=0.05, fc='gray', ec='gray',
                    alpha=0.5, linewidth=2)
            mid_x = (w_pos[0] + c_pos[0]) / 2
            mid_y = (w_pos[1] + c_pos[1]) / 2
            ax.text(mid_x, mid_y, f'{x.value[i,j]:.0f}', fontsize=8,
                   bbox=dict(boxstyle='round', facecolor='white', alpha=0.7))

ax.set_xlim(-0.3, 1.3)
ax.set_ylim(-0.5, 3)
ax.set_title('Transportation Problem Solution', fontsize=12, fontweight='bold')
ax.axis('off')

# Plot 3: Diet Problem
ax = axes[1, 0]
x_pos = np.arange(len(foods))
ax.bar(x_pos, x.value, color='steelblue', edgecolor='black', linewidth=1.5)
ax.set_xticks(x_pos)
ax.set_xticklabels(foods, rotation=45, ha='right')
ax.set_ylabel('Amount (units)', fontsize=11)
ax.set_title('Optimal Diet Composition', fontsize=12, fontweight='bold')
ax.grid(True, alpha=0.3, axis='y')

# Plot 4: Nutrient Requirements
ax = axes[1, 1]
x_pos = np.arange(len(nutrients))
actual_nutrients = nutrient_content @ x.value
width = 0.35

ax.bar(x_pos - width/2, requirements, width, label='Required',
       color='lightcoral', edgecolor='black', linewidth=1.5)
ax.bar(x_pos + width/2, actual_nutrients, width, label='Actual',
       color='lightgreen', edgecolor='black', linewidth=1.5)

ax.set_xticks(x_pos)
ax.set_xticklabels(nutrients)
ax.set_ylabel('Amount', fontsize=11)
ax.set_title('Nutrient Requirements vs. Actual', fontsize=12, fontweight='bold')
ax.legend(fontsize=10)
ax.grid(True, alpha=0.3, axis='y')

plt.tight_layout()
plt.savefig('lp_formulations.png', dpi=300, bbox_inches='tight')
print("\n" + "=" * 70)
print("Visualization saved as 'lp_formulations.png'")
print("=" * 70)
```

## Summary

### Key Concepts

1. **Linear programming**: Optimize linear objective subject to linear constraints
2. **Standard form**: $\min c^T x$ s.t. $Ax = b$, $x \geq 0$
3. **Feasible set**: Polyhedron (convex)
4. **Optimal solutions**: Exist at vertices (if they exist at all)

### Form Conversions

- Any LP can be converted to standard form
- Conversions involve slack variables, variable splitting, and sign changes
- Maintaining equivalence is crucial

### Common Applications

- Production planning
- Transportation and logistics
- Resource allocation
- Network flows

Linear programming is the foundation for more advanced optimization techniques and has efficient solution algorithms (simplex, interior-point).
