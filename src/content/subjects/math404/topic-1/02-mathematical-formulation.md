---
title: "Mathematical Formulation"
description: "Translating real-world problems into mathematical optimization formulations"
---

# Mathematical Formulation

## The Art of Modeling

Mathematical formulation is the process of translating a real-world problem into a precise mathematical optimization problem. This is both an art and a science—requiring domain knowledge, mathematical sophistication, and practical experience.

A well-formulated problem has three essential components:

1. **Decision variables**: What can we control?
2. **Objective function**: What are we trying to optimize?
3. **Constraints**: What limitations must we respect?

The general form is:

$$
\begin{align}
\text{minimize/maximize} \quad & f(x) \\
\text{subject to} \quad & g_i(x) \leq 0, \quad i = 1, \ldots, m \\
& h_j(x) = 0, \quad j = 1, \ldots, p \\
& x \in \mathcal{X}
\end{align}
$$

## Decision Variables

Decision variables represent the quantities we can choose or control. Choosing appropriate variables is crucial for problem tractability.

### Example: Production Planning

A factory produces two products, A and B. Let:
- $x_1$ = units of product A to produce
- $x_2$ = units of product B to produce

The decision variables are $x = (x_1, x_2) \in \mathbb{R}^2_+$.

### Variable Types

**Continuous variables**: Can take any real value in a range.
$$x \in [0, 100]$$

**Integer variables**: Must be integers.
$$x \in \{0, 1, 2, 3, \ldots\}$$

**Binary variables**: Special case of integers.
$$x \in \{0, 1\}$$

Binary variables are powerful for modeling logical decisions:
- $x_i = 1$ if we select item $i$, otherwise $x_i = 0$
- $y_j = 1$ if facility $j$ is open, otherwise $y_j = 0$

### Dimension and Indexing

For problems with many similar variables, use indexed notation:

$$x_i \quad \text{for } i = 1, \ldots, n$$

Or double indices for 2D problems:

$$x_{ij} \quad \text{for } i = 1, \ldots, m, \; j = 1, \ldots, n$$

**Example**: Transportation problem with $m$ sources and $n$ destinations:
- $x_{ij}$ = amount shipped from source $i$ to destination $j$
- Total variables: $m \times n$

## Objective Functions

The objective function quantifies what we're trying to optimize. It must be a function of the decision variables.

### Minimization vs. Maximization

Minimization and maximization are equivalent:

$$
\max_x f(x) \equiv \min_x (-f(x))
$$

By convention, we often write problems in minimization form.

### Common Objective Types

**1. Linear objectives**:
$$f(x) = c_1 x_1 + c_2 x_2 + \cdots + c_n x_n = c^T x$$

**Example**: Minimize total cost where $c_i$ is the cost per unit of product $i$.

**2. Quadratic objectives**:
$$f(x) = \frac{1}{2} x^T Q x + c^T x$$

**Example**: Minimize variance in portfolio optimization, where $Q$ is the covariance matrix.

**3. Nonlinear objectives**:
$$f(x) = \sum_{i=1}^n e^{x_i} - \sqrt{x_i + 1}$$

**Example**: Minimize energy consumption with nonlinear physics.

### Multi-objective Optimization

Sometimes we have conflicting objectives. For example:
- Minimize cost AND maximize quality
- Minimize risk AND maximize return

**Approach 1**: Weighted sum
$$\min_x \alpha f_1(x) + (1-\alpha) f_2(x)$$

where $\alpha \in [0, 1]$ represents the trade-off.

**Approach 2**: Constrained optimization
$$
\begin{align}
\min \quad & f_1(x) \\
\text{s.t.} \quad & f_2(x) \leq \tau
\end{align}
$$

Optimize one objective while constraining the other.

**Approach 3**: Pareto optimization
Find the **Pareto frontier**—the set of solutions where improving one objective requires worsening another.

## Constraints

Constraints define the feasible set—the set of solutions that are acceptable or possible.

### Inequality Constraints

General form: $g(x) \leq 0$ (or $g(x) \geq 0$)

**Example**: Resource constraints
$$
\text{labor hours: } \quad 2x_1 + 3x_2 \leq 40
$$

Note that $g(x) \geq b$ can be rewritten as $-g(x) + b \leq 0$.

### Equality Constraints

General form: $h(x) = 0$

**Example**: Conservation laws
$$
\text{mass balance: } \quad x_1 + x_2 = 100
$$

**Warning**: Equality constraints reduce degrees of freedom. With $n$ variables and $p$ independent equality constraints, only $n - p$ degrees of freedom remain.

### Box Constraints

Simple bounds on individual variables:
$$
\ell_i \leq x_i \leq u_i \quad \text{for } i = 1, \ldots, n
$$

These are often written as $x \in [\ell, u]$ where $\ell$ and $u$ are vectors.

### Nonnegativity

Many problems require nonnegative variables:
$$x \geq 0 \quad \text{or} \quad x_i \geq 0 \text{ for all } i$$

This is natural for quantities like production levels, prices, or probabilities.

### Set Constraints

Variables restricted to a set:
$$x \in \mathcal{S}$$

**Examples**:
- Integers: $x \in \mathbb{Z}^n$
- Binary: $x \in \{0, 1\}^n$
- Discrete set: $x \in \{a_1, a_2, \ldots, a_k\}$
- Continuous set: $x \in [0, 1]^n$

## Modeling Techniques

### 1. Big-M Method

The Big-M method uses binary variables and large constants to model logical constraints.

**Example**: If $y = 1$, then $x \leq 10$. If $y = 0$, no constraint on $x$.

This can be modeled as:
$$x \leq 10 + M(1 - y)$$

where $M$ is a "big" constant. When $y = 1$, we get $x \leq 10$. When $y = 0$, we get $x \leq 10 + M$, which is inactive if $M$ is large enough.

**Example 2**: At most one of several constraints can be active.

If we want "constraint $i$ active $\implies y_i = 1$", and at most one $y_i = 1$:
$$
\begin{align}
g_i(x) &\leq M(1 - y_i) \quad \text{for all } i \\
\sum_i y_i &\leq 1 \\
y_i &\in \{0, 1\}
\end{align}
$$

### 2. Indicator Variables

Binary variables can model discrete choices:

**Example**: Facility location
- $y_j = 1$ if we open facility $j$, otherwise $y_j = 0$
- Fixed cost $f_j$ if facility $j$ is opened
- Variable cost $c_{ij}$ for serving customer $i$ from facility $j$

$$
\begin{align}
\min \quad & \sum_j f_j y_j + \sum_{ij} c_{ij} x_{ij} \\
\text{s.t.} \quad & \sum_j x_{ij} = 1 \quad \text{for all } i \\
& x_{ij} \leq y_j \quad \text{for all } i, j \\
& x_{ij} \geq 0, \quad y_j \in \{0, 1\}
\end{align}
$$

The constraint $x_{ij} \leq y_j$ ensures we can only serve customers from open facilities.

### 3. Linearization Techniques

Many nonlinear constraints can be reformulated as linear constraints.

**Example**: Absolute value

Instead of minimizing $|x|$, introduce auxiliary variable $t$:
$$
\begin{align}
\min \quad & t \\
\text{s.t.} \quad & -t \leq x \leq t
\end{align}
$$

**Example**: Maximum function

Instead of $z = \max\{x_1, x_2, \ldots, x_n\}$:
$$
\begin{align}
\min \quad & z \\
\text{s.t.} \quad & z \geq x_i \quad \text{for all } i
\end{align}
$$

**Example**: Piecewise linear functions

A piecewise linear function can be expressed using additional variables and constraints.

For $f(x) = \max\{a_1 x + b_1, a_2 x + b_2, \ldots, a_k x + b_k\}$:
$$
\begin{align}
\min \quad & t \\
\text{s.t.} \quad & t \geq a_i x + b_i \quad \text{for } i = 1, \ldots, k
\end{align}
$$

### 4. Product of Binary Variables

The product $y_1 \cdot y_2$ where $y_1, y_2 \in \{0, 1\}$ can be linearized:

Introduce $z = y_1 \cdot y_2$ and add constraints:
$$
\begin{align}
z &\leq y_1 \\
z &\leq y_2 \\
z &\geq y_1 + y_2 - 1 \\
z &\in \{0, 1\}
\end{align}
$$

This ensures $z = 1$ if and only if both $y_1 = 1$ and $y_2 = 1$.

## Case Study 1: Production Planning

**Problem**: A company makes two products, A and B.
- Product A: profit $40/unit, requires 2 hours labor and 1 kg material
- Product B: profit $30/unit, requires 1 hour labor and 2 kg material
- Available: 100 hours labor, 80 kg material
- Maximum demand: 50 units of A, 40 units of B

**Formulation**:

Decision variables:
$$x_1 = \text{units of A to produce}, \quad x_2 = \text{units of B to produce}$$

Objective (maximize profit):
$$\max \quad 40x_1 + 30x_2$$

Constraints:
$$
\begin{align}
\text{Labor: } \quad & 2x_1 + x_2 \leq 100 \\
\text{Material: } \quad & x_1 + 2x_2 \leq 80 \\
\text{Demand A: } \quad & x_1 \leq 50 \\
\text{Demand B: } \quad & x_2 \leq 40 \\
\text{Nonnegativity: } \quad & x_1, x_2 \geq 0
\end{align}
$$

This is a **linear program** (LP).

## Case Study 2: Portfolio Optimization

**Problem**: Invest in $n$ assets with expected returns $\mu_i$ and covariance matrix $\Sigma$. Minimize risk while achieving target return $r_{\text{target}}$.

**Formulation**:

Decision variables:
$$w_i = \text{fraction of wealth in asset } i, \quad i = 1, \ldots, n$$

Objective (minimize variance):
$$\min \quad \frac{1}{2} w^T \Sigma w$$

Constraints:
$$
\begin{align}
\text{Budget: } \quad & \sum_{i=1}^n w_i = 1 \\
\text{Target return: } \quad & \sum_{i=1}^n \mu_i w_i \geq r_{\text{target}} \\
\text{No short selling: } \quad & w_i \geq 0 \quad \text{for all } i
\end{align}
$$

This is a **convex quadratic program** (QP).

## Case Study 3: Network Flow

**Problem**: Ship goods from $m$ suppliers to $n$ customers at minimum cost.
- Supplier $i$ has supply $s_i$
- Customer $j$ has demand $d_j$
- Cost to ship from $i$ to $j$ is $c_{ij}$ per unit

**Formulation**:

Decision variables:
$$x_{ij} = \text{amount shipped from supplier } i \text{ to customer } j$$

Objective (minimize cost):
$$\min \quad \sum_{i=1}^m \sum_{j=1}^n c_{ij} x_{ij}$$

Constraints:
$$
\begin{align}
\text{Supply: } \quad & \sum_{j=1}^n x_{ij} \leq s_i \quad \text{for all } i \\
\text{Demand: } \quad & \sum_{i=1}^m x_{ij} = d_j \quad \text{for all } j \\
\text{Nonnegativity: } \quad & x_{ij} \geq 0 \quad \text{for all } i, j
\end{align}
$$

This is a **linear program** with special structure (network flow).

## Case Study 4: Traveling Salesman Problem

**Problem**: Visit $n$ cities exactly once and return to the start, minimizing total distance.

**Formulation**:

Decision variables:
$$x_{ij} = \begin{cases} 1 & \text{if we travel from city } i \text{ to city } j \\ 0 & \text{otherwise} \end{cases}$$

Objective (minimize distance):
$$\min \quad \sum_{i=1}^n \sum_{j=1}^n d_{ij} x_{ij}$$

Constraints:
$$
\begin{align}
\text{Leave each city once: } \quad & \sum_{j=1}^n x_{ij} = 1 \quad \text{for all } i \\
\text{Enter each city once: } \quad & \sum_{i=1}^n x_{ij} = 1 \quad \text{for all } j \\
\text{No subtours: } \quad & \sum_{i \in S} \sum_{j \in S} x_{ij} \leq |S| - 1 \quad \text{for all } \emptyset \neq S \subset \{1, \ldots, n\} \\
\text{Binary: } \quad & x_{ij} \in \{0, 1\}
\end{align}
$$

The subtour elimination constraints prevent forming disconnected cycles. This is an **integer program** (IP) and is NP-hard.

## Python Implementation

```python
import numpy as np
import cvxpy as cp
from scipy.optimize import linprog
import matplotlib.pyplot as plt

# Case Study 1: Production Planning
print("=" * 60)
print("CASE STUDY 1: PRODUCTION PLANNING")
print("=" * 60)

# Decision variables
x = cp.Variable(2, nonneg=True)  # x[0] = product A, x[1] = product B

# Objective: maximize profit (minimize negative profit)
profit = cp.Maximize(40*x[0] + 30*x[1])

# Constraints
constraints = [
    2*x[0] + x[1] <= 100,    # Labor
    x[0] + 2*x[1] <= 80,     # Material
    x[0] <= 50,              # Demand A
    x[1] <= 40               # Demand B
]

# Solve
problem = cp.Problem(profit, constraints)
problem.solve()

print(f"\nOptimal production:")
print(f"  Product A: {x.value[0]:.2f} units")
print(f"  Product B: {x.value[1]:.2f} units")
print(f"  Maximum profit: ${problem.value:.2f}")

# Check constraint utilization
print(f"\nResource utilization:")
labor_used = 2*x.value[0] + x.value[1]
material_used = x.value[0] + 2*x.value[1]
print(f"  Labor: {labor_used:.2f} / 100 hours ({labor_used/100*100:.1f}%)")
print(f"  Material: {material_used:.2f} / 80 kg ({material_used/80*100:.1f}%)")

# Visualize feasible region
fig, ax = plt.subplots(1, 1, figsize=(10, 8))

x1_vals = np.linspace(0, 60, 500)

# Constraint boundaries
x2_labor = 100 - 2*x1_vals  # 2x1 + x2 = 100
x2_material = (80 - x1_vals) / 2  # x1 + 2x2 = 80
x2_demand_A = np.ones_like(x1_vals) * 40  # x2 = 40
x1_demand_A = 50  # x1 = 50

# Plot constraints
ax.plot(x1_vals, x2_labor, 'b-', label='Labor: 2x₁ + x₂ = 100', linewidth=2)
ax.plot(x1_vals, x2_material, 'r-', label='Material: x₁ + 2x₂ = 80', linewidth=2)
ax.axvline(x1_demand_A, color='g', linestyle='-', label='Demand A: x₁ = 50', linewidth=2)
ax.axhline(40, color='m', linestyle='-', label='Demand B: x₂ = 40', linewidth=2)

# Fill feasible region
x2_feasible = np.minimum.reduce([x2_labor, x2_material, x2_demand_A])
x2_feasible = np.maximum(x2_feasible, 0)
mask = x1_vals <= x1_demand_A
ax.fill_between(x1_vals[mask], 0, x2_feasible[mask], alpha=0.3, color='cyan', label='Feasible region')

# Plot optimal point
ax.plot(x.value[0], x.value[1], 'r*', markersize=20, label='Optimal solution', zorder=5)

# Plot iso-profit lines
for profit_level in [600, 1200, 1800, 2400]:
    x2_isoprofit = (profit_level - 40*x1_vals) / 30
    ax.plot(x1_vals, x2_isoprofit, 'k--', alpha=0.3, linewidth=1)

ax.set_xlim(0, 60)
ax.set_ylim(0, 60)
ax.set_xlabel('Product A (x₁)', fontsize=12)
ax.set_ylabel('Product B (x₂)', fontsize=12)
ax.set_title('Production Planning: Feasible Region and Optimal Solution', fontsize=14)
ax.legend(fontsize=10)
ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('production_planning.png', dpi=300, bbox_inches='tight')
print("\nPlot saved as 'production_planning.png'")

# Case Study 2: Portfolio Optimization
print("\n" + "=" * 60)
print("CASE STUDY 2: PORTFOLIO OPTIMIZATION")
print("=" * 60)

# Generate example data
np.random.seed(123)
n_assets = 6
mean_returns = np.array([0.08, 0.12, 0.10, 0.07, 0.15, 0.09])  # Expected returns

# Generate covariance matrix (positive semidefinite)
A = np.random.randn(n_assets, n_assets)
cov_matrix = (A @ A.T) / 100  # Scale to reasonable values

asset_names = ['Stock A', 'Stock B', 'Stock C', 'Bond A', 'Stock D', 'Bond B']

# Decision variables
w = cp.Variable(n_assets)

# Different target returns
target_returns = np.linspace(0.07, 0.15, 20)
risks = []
optimal_weights = []

for target_return in target_returns:
    # Objective: minimize risk (variance)
    risk = cp.quad_form(w, cov_matrix)

    # Constraints
    constraints = [
        w >= 0,                        # No short selling
        cp.sum(w) == 1,                # Budget constraint
        mean_returns @ w >= target_return  # Target return
    ]

    # Solve
    problem = cp.Problem(cp.Minimize(risk), constraints)
    problem.solve()

    if problem.status == 'optimal':
        risks.append(np.sqrt(risk.value))
        optimal_weights.append(w.value.copy())
    else:
        risks.append(np.nan)
        optimal_weights.append(None)

# Find minimum variance portfolio
min_risk_idx = np.nanargmin(risks)
print(f"\nMinimum risk portfolio:")
print(f"  Target return: {target_returns[min_risk_idx]:.4f}")
print(f"  Risk (std dev): {risks[min_risk_idx]:.4f}")
print(f"  Weights:")
for i, name in enumerate(asset_names):
    print(f"    {name}: {optimal_weights[min_risk_idx][i]:.4f}")

# Find a balanced portfolio (target = 0.10)
target_idx = np.argmin(np.abs(target_returns - 0.10))
print(f"\nBalanced portfolio (target return = 0.10):")
print(f"  Actual return: {target_returns[target_idx]:.4f}")
print(f"  Risk (std dev): {risks[target_idx]:.4f}")
print(f"  Weights:")
for i, name in enumerate(asset_names):
    print(f"    {name}: {optimal_weights[target_idx][i]:.4f}")

# Plot efficient frontier
fig, axes = plt.subplots(1, 2, figsize=(16, 6))

# Plot 1: Efficient frontier
ax = axes[0]
ax.plot(risks, target_returns, 'b-', linewidth=2, label='Efficient frontier')
ax.plot(risks[min_risk_idx], target_returns[min_risk_idx], 'g*',
        markersize=15, label='Minimum variance portfolio')
ax.plot(risks[target_idx], target_returns[target_idx], 'r*',
        markersize=15, label='Balanced portfolio')

# Plot individual assets
individual_risks = np.sqrt(np.diag(cov_matrix))
ax.scatter(individual_risks, mean_returns, c='red', s=100, alpha=0.6,
          marker='o', edgecolors='black', linewidth=2, label='Individual assets')
for i, name in enumerate(asset_names):
    ax.annotate(name, (individual_risks[i], mean_returns[i]),
               xytext=(5, 5), textcoords='offset points', fontsize=9)

ax.set_xlabel('Risk (Standard Deviation)', fontsize=12)
ax.set_ylabel('Expected Return', fontsize=12)
ax.set_title('Efficient Frontier', fontsize=14)
ax.legend(fontsize=10)
ax.grid(True, alpha=0.3)

# Plot 2: Portfolio composition
ax = axes[1]
returns_subset = target_returns[::2]  # Every other point for clarity
weights_subset = [optimal_weights[i] for i in range(0, len(optimal_weights), 2)]

# Stack area plot
weights_array = np.array([w for w in weights_subset if w is not None]).T
bottom = np.zeros(len(returns_subset))

colors = plt.cm.Set3(np.linspace(0, 1, n_assets))
for i in range(n_assets):
    ax.fill_between(returns_subset[:len(weights_array[i])], bottom,
                    bottom + weights_array[i], label=asset_names[i],
                    alpha=0.7, color=colors[i])
    bottom += weights_array[i]

ax.set_xlabel('Target Return', fontsize=12)
ax.set_ylabel('Portfolio Weight', fontsize=12)
ax.set_title('Portfolio Composition Along Efficient Frontier', fontsize=14)
ax.legend(fontsize=9, loc='center left', bbox_to_anchor=(1, 0.5))
ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('portfolio_optimization.png', dpi=300, bbox_inches='tight')
print("\nPlot saved as 'portfolio_optimization.png'")

# Case Study 3: Transportation Problem
print("\n" + "=" * 60)
print("CASE STUDY 3: TRANSPORTATION PROBLEM")
print("=" * 60)

# Problem data
m, n = 3, 4  # 3 suppliers, 4 customers
supply = np.array([30, 40, 25])
demand = np.array([20, 25, 15, 35])

# Cost matrix (cost per unit from supplier i to customer j)
cost = np.array([
    [8, 6, 10, 9],
    [9, 12, 13, 7],
    [14, 9, 16, 5]
])

# Decision variables: x[i,j] = amount from supplier i to customer j
x = cp.Variable((m, n), nonneg=True)

# Objective: minimize total cost
objective = cp.Minimize(cp.sum(cp.multiply(cost, x)))

# Constraints
constraints = []
# Supply constraints
for i in range(m):
    constraints.append(cp.sum(x[i, :]) <= supply[i])
# Demand constraints
for j in range(n):
    constraints.append(cp.sum(x[:, j]) == demand[j])

# Solve
problem = cp.Problem(objective, constraints)
problem.solve()

print(f"\nOptimal transportation plan:")
print(f"  Total cost: ${problem.value:.2f}")
print(f"\nShipment amounts:")
print("        Customer 1  Customer 2  Customer 3  Customer 4  Total Shipped")
for i in range(m):
    row_sum = np.sum(x.value[i, :])
    print(f"Supplier {i+1}:  {x.value[i,0]:7.2f}    {x.value[i,1]:7.2f}    "
          f"{x.value[i,2]:7.2f}    {x.value[i,3]:7.2f}      {row_sum:7.2f} / {supply[i]}")

print(f"\nDemand met:")
for j in range(n):
    col_sum = np.sum(x.value[:, j])
    print(f"  Customer {j+1}: {col_sum:.2f} / {demand[j]}")

# Case Study 4: Simplified TSP (small instance)
print("\n" + "=" * 60)
print("CASE STUDY 4: TRAVELING SALESMAN PROBLEM (Small Instance)")
print("=" * 60)

# For demonstration, we'll solve a small 5-city TSP
n_cities = 5

# Generate random city locations
np.random.seed(456)
cities = np.random.rand(n_cities, 2) * 100

# Compute distance matrix
dist = np.zeros((n_cities, n_cities))
for i in range(n_cities):
    for j in range(n_cities):
        if i != j:
            dist[i, j] = np.linalg.norm(cities[i] - cities[j])
        else:
            dist[i, j] = np.inf  # Can't travel to same city

# Decision variables
x = cp.Variable((n_cities, n_cities), boolean=True)

# Objective
objective = cp.Minimize(cp.sum(cp.multiply(dist, x)))

# Constraints
constraints = []

# Each city left exactly once
for i in range(n_cities):
    constraints.append(cp.sum(x[i, :]) == 1)

# Each city entered exactly once
for j in range(n_cities):
    constraints.append(cp.sum(x[:, j]) == 1)

# No self-loops
for i in range(n_cities):
    constraints.append(x[i, i] == 0)

# Subtour elimination (Miller-Tucker-Zemlin formulation)
# This is more efficient than exponential number of subtour constraints
u = cp.Variable(n_cities, integer=True)
for i in range(1, n_cities):
    constraints.append(u[i] >= 1)
    constraints.append(u[i] <= n_cities - 1)

for i in range(1, n_cities):
    for j in range(1, n_cities):
        if i != j:
            constraints.append(u[i] - u[j] + n_cities * x[i, j] <= n_cities - 1)

# Solve (note: this can be slow for larger instances)
problem = cp.Problem(objective, constraints)
problem.solve(solver=cp.GLPK_MI, verbose=False)

if problem.status == 'optimal':
    print(f"\nOptimal tour length: {problem.value:.2f}")
    print(f"\nTour:")

    # Extract tour
    tour = [0]  # Start from city 0
    current = 0
    for _ in range(n_cities - 1):
        for j in range(n_cities):
            if x.value[current, j] > 0.5:  # Account for numerical errors
                tour.append(j)
                current = j
                break
    tour.append(0)  # Return to start

    print(" -> ".join([f"City {i}" for i in tour]))
else:
    print(f"Solver status: {problem.status}")
    print("Note: TSP is NP-hard and may be difficult to solve exactly for larger instances")

print("\n" + "=" * 60)
print("All formulations completed successfully!")
print("=" * 60)
```

## Common Formulation Mistakes

### 1. Wrong Variable Domain

**Mistake**: Using continuous variables when integers are required.
```python
# Wrong: x can be fractional
x = cp.Variable(n)

# Correct: x must be integer
x = cp.Variable(n, integer=True)
```

### 2. Nonlinear Equality Constraints

**Mistake**: Using nonlinear equality constraints carelessly.

Equality constraints $h(x) = 0$ are often harder to satisfy than inequalities. Moreover, nonlinear equalities can make problems non-convex.

### 3. Unbounded Variables

**Mistake**: Forgetting to add bounds when they're implicit in the problem.

If variables represent physical quantities (production, time, etc.), they often have natural bounds.

### 4. Scaling Issues

**Mistake**: Not scaling variables and constraints.

Poor scaling can cause numerical difficulties. If some variables are $O(10^6)$ and others are $O(10^{-3})$, rescale them.

### 5. Redundant Constraints

**Mistake**: Adding constraints that are already implied by others.

While not wrong mathematically, redundant constraints slow down solvers.

## Best Practices

1. **Start simple**: Begin with a basic model, then add complexity.

2. **Check feasibility**: Ensure your formulation has at least one feasible solution.

3. **Use standard forms**: LP, QP, SDP solvers expect specific formats.

4. **Exploit structure**: Special structure (network flows, separability) enables faster algorithms.

5. **Validate with small instances**: Test your formulation on tiny problems where you know the answer.

6. **Scale your data**: Normalize variables to similar magnitudes.

7. **Document your model**: Clearly state what each variable represents.

## Summary

Mathematical formulation transforms real-world problems into precise optimization problems. Key steps:

1. **Identify decision variables**: What can we control?
2. **Formulate objective**: What are we optimizing?
3. **Write constraints**: What are the limitations?
4. **Choose variable types**: Continuous, integer, or binary?
5. **Simplify and standardize**: Use known problem forms when possible.

Good formulation is crucial—a well-formulated problem is halfway to being solved. In the next sections, we'll study how to determine if our formulations are feasible and how to solve them efficiently.
