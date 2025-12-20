---
title: "Applications Overview"
description: "Survey of optimization applications across machine learning, engineering, finance, and operations research"
---

# Applications Overview

## Introduction

Optimization is ubiquitous in modern science, engineering, and business. This section surveys major application areas, illustrating how the theoretical concepts we've studied translate into practical problem-solving.

## Machine Learning and Artificial Intelligence

### Training Neural Networks

The fundamental problem in machine learning is minimizing empirical risk:

$$
\min_{\theta} \frac{1}{N} \sum_{i=1}^N L(f_\theta(x_i), y_i) + \lambda R(\theta)
$$

where:
- $\theta$ = model parameters (weights, biases)
- $f_\theta$ = neural network function
- $L$ = loss function (cross-entropy, MSE, etc.)
- $R(\theta)$ = regularization (L2, L1, dropout)
- $\lambda$ = regularization strength

**Challenges**:
- High-dimensional (millions to billions of parameters)
- Non-convex (many local minima)
- Large-scale data (requires stochastic methods)

**Methods**: Stochastic gradient descent (SGD), Adam, RMSprop

### Support Vector Machines

SVMs solve a convex quadratic program:

$$
\begin{align}
\min_{w, b, \xi} \quad & \frac{1}{2} \|w\|^2 + C \sum_{i=1}^N \xi_i \\
\text{s.t.} \quad & y_i(w^T x_i + b) \geq 1 - \xi_i \\
& \xi_i \geq 0
\end{align}
$$

This finds the maximum-margin hyperplane separating two classes.

**Key advantage**: Convex problem, global optimum guaranteed.

### Logistic Regression

Minimize negative log-likelihood:

$$
\min_{w} \sum_{i=1}^N \log(1 + \exp(-y_i w^T x_i)) + \frac{\lambda}{2} \|w\|^2
$$

This is an unconstrained convex optimization problem.

### Principal Component Analysis (PCA)

Find directions of maximum variance:

$$
\begin{align}
\max_{w} \quad & w^T \Sigma w \\
\text{s.t.} \quad & \|w\| = 1
\end{align}
$$

where $\Sigma$ is the covariance matrix.

**Solution**: Eigenvector corresponding to largest eigenvalue.

### Compressed Sensing

Recover sparse signals from limited measurements:

$$
\begin{align}
\min_{x} \quad & \|x\|_1 \\
\text{s.t.} \quad & Ax = b
\end{align}
$$

The L1 norm promotes sparsity. This is a linear program.

## Finance and Economics

### Portfolio Optimization (Markowitz)

The classic mean-variance optimization:

$$
\begin{align}
\min_{w} \quad & \frac{1}{2} w^T \Sigma w \\
\text{s.t.} \quad & \mu^T w \geq r_{\min} \\
& \mathbf{1}^T w = 1 \\
& w \geq 0
\end{align}
$$

Minimize risk (variance) while achieving target return $r_{\min}$.

**Extensions**:
- Transaction costs
- Cardinality constraints (limit number of assets)
- Robust optimization (uncertain parameters)

### Option Pricing

Black-Scholes PDE can be derived from an optimization perspective (hedging strategy).

For American options (early exercise), optimal stopping problem:

$$
V(S, t) = \max(\text{exercise value}, \text{continuation value})
$$

Solved via dynamic programming or free-boundary PDE methods.

### Risk Management

Conditional Value-at-Risk (CVaR) optimization:

$$
\begin{align}
\min_{w, \alpha, z} \quad & \alpha + \frac{1}{(1-\beta)N} \sum_{i=1}^N z_i \\
\text{s.t.} \quad & z_i \geq -w^T r_i - \alpha \\
& z_i \geq 0 \\
& \mathbf{1}^T w = 1
\end{align}
$$

CVaR is convex and can be formulated as an LP.

### Auction Design and Game Theory

Mechanism design often involves optimization:

$$
\max_{\text{mechanism}} \text{revenue} \quad \text{s.t. incentive compatibility}
$$

Nash equilibria are solutions to variational inequality problems.

## Engineering and Control

### Optimal Control

Minimize cost over trajectory:

$$
\begin{align}
\min_{u(t)} \quad & \int_0^T L(x(t), u(t)) \, dt + \phi(x(T)) \\
\text{s.t.} \quad & \dot{x}(t) = f(x(t), u(t)) \\
& x(0) = x_0
\end{align}
$$

where $u(t)$ is the control input and $x(t)$ is the state.

**Methods**: Pontryagin's maximum principle, dynamic programming, model predictive control (MPC).

### Model Predictive Control (MPC)

At each time step, solve:

$$
\begin{align}
\min_{u_0, \ldots, u_{N-1}} \quad & \sum_{k=0}^{N-1} \|x_k - x_{\text{ref}}\|^2 + \|u_k\|^2 \\
\text{s.t.} \quad & x_{k+1} = Ax_k + Bu_k \\
& u_{\min} \leq u_k \leq u_{\max} \\
& x_{\min} \leq x_k \leq x_{\max}
\end{align}
$$

Apply first control $u_0$, then resolve at next time step (receding horizon).

**Applications**: Process control, robotics, autonomous vehicles.

### Circuit Design

Transistor sizing for minimum power:

$$
\begin{align}
\min_{w} \quad & \sum_i w_i \\
\text{s.t.} \quad & \tau_i(w) \leq \tau_{\max} \quad \text{(timing)} \\
& w_{\min} \leq w_i \leq w_{\max}
\end{align}
$$

This is a geometric program (convex after log transformation).

### Structural Optimization

Minimize weight subject to stress constraints:

$$
\begin{align}
\min_{A} \quad & \rho^T A \\
\text{s.t.} \quad & \sigma_i(A) \leq \sigma_{\max} \\
& A \geq A_{\min}
\end{align}
$$

where $A$ are cross-sectional areas and $\sigma_i$ are stresses.

**Applications**: Truss design, topology optimization.

### Signal Processing

Filter design:

$$
\begin{align}
\min_{h} \quad & \|h\|_2 \\
\text{s.t.} \quad & |H(\omega)| \leq \delta \quad \text{for } \omega \in \Omega_{\text{stop}} \\
& |H(\omega) - 1| \leq \epsilon \quad \text{for } \omega \in \Omega_{\text{pass}}
\end{align}
$$

Design filter coefficients $h$ to meet frequency response specs.

## Operations Research

### Linear Programming Applications

**Transportation**: Minimize shipping costs from warehouses to customers.

**Production planning**: Maximize profit subject to resource constraints.

**Diet problem**: Minimize cost subject to nutritional requirements.

**Network flows**: Max flow, min cost flow, shortest path.

### Integer Programming

**Facility location**:

$$
\begin{align}
\min_{x, y} \quad & \sum_j f_j y_j + \sum_{ij} c_{ij} x_{ij} \\
\text{s.t.} \quad & \sum_j x_{ij} = 1 \quad \text{for all } i \\
& x_{ij} \leq y_j \\
& x_{ij} \geq 0, \; y_j \in \{0, 1\}
\end{align}
$$

**Scheduling**: Assign tasks to machines to minimize makespan.

**Traveling salesman**: Find shortest tour visiting all cities.

### Inventory Management

Minimize holding + ordering costs:

$$
\min_{q} \quad \frac{D}{q} K + \frac{q}{2} h
$$

where $q$ is order quantity, $D$ is demand, $K$ is fixed cost, $h$ is holding cost.

**Solution** (Economic Order Quantity): $q^* = \sqrt{2DK/h}$

## Statistics and Data Science

### Maximum Likelihood Estimation

Find parameters maximizing likelihood:

$$
\max_{\theta} \quad \mathcal{L}(\theta) = \prod_{i=1}^N p(x_i | \theta)
$$

Equivalently (log-likelihood):

$$
\max_{\theta} \quad \sum_{i=1}^N \log p(x_i | \theta)
$$

Often convex for exponential family distributions.

### Regression

**Linear regression** (least squares):

$$
\min_{\beta} \quad \|y - X\beta\|^2
$$

**Solution**: $\beta^* = (X^T X)^{-1} X^T y$

**Ridge regression** (L2 regularization):

$$
\min_{\beta} \quad \|y - X\beta\|^2 + \lambda \|\beta\|^2
$$

**Lasso** (L1 regularization):

$$
\min_{\beta} \quad \|y - X\beta\|^2 + \lambda \|\beta\|_1
$$

L1 promotes sparsity (feature selection).

### Clustering

**K-means**: Minimize within-cluster variance:

$$
\min_{C_1, \ldots, C_K} \sum_{k=1}^K \sum_{x_i \in C_k} \|x_i - \mu_k\|^2
$$

Non-convex, but local algorithms (Lloyd's algorithm) work well.

## Computer Vision and Graphics

### Image Denoising

Total variation denoising:

$$
\min_{u} \quad \int_\Omega |\nabla u| \, dx + \frac{\lambda}{2} \int_\Omega (u - f)^2 \, dx
$$

Balance smoothness (total variation) with fidelity to noisy image $f$.

### Image Segmentation

Graph cuts formulation:

$$
\min_{S} \quad \sum_{i \in S, j \notin S} w_{ij}
$$

Find cut of minimum weight (NP-hard in general, but polynomial for special cases).

### Structure from Motion

Minimize reprojection error:

$$
\min_{X, P} \sum_{i,j} \|x_{ij} - P_i X_j\|^2
$$

Recover 3D structure $X$ and camera poses $P$ from 2D images.

**Methods**: Bundle adjustment (large-scale nonlinear least squares).

### Shape Optimization

Minimize deformation energy:

$$
\min_{u} \quad \int_\Omega |\nabla u|^2 \, dx \quad \text{s.t. boundary conditions}
$$

Used in mesh processing, animation, and registration.

## Python Implementation: Application Examples

```python
import numpy as np
import cvxpy as cp
import matplotlib.pyplot as plt
from sklearn.datasets import make_classification, make_blobs
from sklearn.linear_model import LogisticRegression, Lasso

print("=" * 70)
print("OPTIMIZATION APPLICATIONS")
print("=" * 70)

# Application 1: Portfolio Optimization
print("\n" + "=" * 70)
print("Application 1: Portfolio Optimization (Markowitz)")
print("=" * 70)

np.random.seed(42)
n_assets = 5
asset_names = ['Tech', 'Finance', 'Healthcare', 'Energy', 'Consumer']

# Generate random returns data
returns = np.random.randn(252, n_assets) * 0.02  # Daily returns
mean_returns = np.mean(returns, axis=0)
cov_matrix = np.cov(returns.T)

print(f"\nAssets: {asset_names}")
print(f"Expected annual returns: {mean_returns * 252}")

# Efficient frontier
target_returns = np.linspace(mean_returns.min() * 252, mean_returns.max() * 252, 50)
risks = []
optimal_weights = []

for target in target_returns:
    w = cp.Variable(n_assets)
    risk = cp.quad_form(w, cov_matrix)

    constraints = [
        w >= 0,
        cp.sum(w) == 1,
        mean_returns @ w >= target / 252
    ]

    problem = cp.Problem(cp.Minimize(risk), constraints)
    problem.solve()

    if problem.status == 'optimal':
        risks.append(np.sqrt(risk.value * 252))  # Annualized std dev
        optimal_weights.append(w.value)

print(f"\nComputed efficient frontier with {len(risks)} points")

# Find minimum variance portfolio
min_var_idx = np.argmin(risks)
print(f"\nMinimum variance portfolio:")
print(f"  Expected return: {target_returns[min_var_idx]:.4f}")
print(f"  Risk (std dev): {risks[min_var_idx]:.4f}")
for i, name in enumerate(asset_names):
    print(f"    {name}: {optimal_weights[min_var_idx][i]:.4f}")

# Application 2: Support Vector Machine
print("\n" + "=" * 70)
print("Application 2: Support Vector Machine (SVM)")
print("=" * 70)

# Generate binary classification data
X_train, y_train = make_classification(n_samples=100, n_features=2, n_redundant=0,
                                       n_informative=2, n_clusters_per_class=1,
                                       random_state=42)
y_train = 2 * y_train - 1  # Convert to {-1, +1}

# Solve SVM dual problem
n_samples = X_train.shape[0]
alpha = cp.Variable(n_samples)

# Kernel matrix (linear kernel)
K = X_train @ X_train.T
Y = np.outer(y_train, y_train)

# Dual objective
objective = cp.Maximize(cp.sum(alpha) - 0.5 * cp.quad_form(alpha, K * Y))

# Dual constraints
constraints = [
    alpha >= 0,
    alpha <= 1.0,  # C = 1.0 (regularization parameter)
    alpha @ y_train == 0
]

problem = cp.Problem(objective, constraints)
problem.solve()

# Extract support vectors
support_threshold = 1e-5
support_indices = np.where(alpha.value > support_threshold)[0]
n_support = len(support_indices)

print(f"\nSVM training completed:")
print(f"  Number of support vectors: {n_support} / {n_samples}")
print(f"  Dual objective value: {problem.value:.4f}")

# Compute weights and bias
w = (alpha.value * y_train) @ X_train
b = np.mean(y_train[support_indices] - X_train[support_indices] @ w)

print(f"  Weights: {w}")
print(f"  Bias: {b:.4f}")

# Application 3: Lasso Regression (Sparse Recovery)
print("\n" + "=" * 70)
print("Application 3: Lasso Regression (Sparse Recovery)")
print("=" * 70)

# Generate sparse signal
n_features = 50
n_samples = 100
n_nonzero = 5

true_coef = np.zeros(n_features)
nonzero_indices = np.random.choice(n_features, n_nonzero, replace=False)
true_coef[nonzero_indices] = np.random.randn(n_nonzero) * 5

X = np.random.randn(n_samples, n_features)
y = X @ true_coef + np.random.randn(n_samples) * 0.1

# Lasso regression
lambda_reg = 0.1
beta = cp.Variable(n_features)

objective = cp.Minimize(cp.sum_squares(X @ beta - y) + lambda_reg * cp.norm1(beta))
problem = cp.Problem(objective)
problem.solve()

# Count recovered coefficients
recovered_nonzero = np.sum(np.abs(beta.value) > 0.1)
correctly_recovered = np.sum(np.abs(beta.value[nonzero_indices]) > 0.1)

print(f"\nTrue number of nonzero coefficients: {n_nonzero}")
print(f"Lasso recovered coefficients: {recovered_nonzero}")
print(f"Correctly identified: {correctly_recovered} / {n_nonzero}")

# Application 4: Compressed Sensing
print("\n" + "=" * 70)
print("Application 4: Compressed Sensing")
print("=" * 70)

# Generate sparse signal
n_signal = 100
n_measurements = 30
sparsity = 5

x_true = np.zeros(n_signal)
sparse_indices = np.random.choice(n_signal, sparsity, replace=False)
x_true[sparse_indices] = np.random.randn(sparsity)

# Random measurement matrix
A = np.random.randn(n_measurements, n_signal)
b = A @ x_true

print(f"\nSignal dimension: {n_signal}")
print(f"Number of measurements: {n_measurements} (underdetermined!)")
print(f"True sparsity: {sparsity}")

# L1 minimization
x_recovered = cp.Variable(n_signal)
objective = cp.Minimize(cp.norm1(x_recovered))
constraints = [A @ x_recovered == b]

problem = cp.Problem(objective, constraints)
problem.solve()

# Check recovery
recovery_error = np.linalg.norm(x_recovered.value - x_true)
print(f"\nRecovery error: {recovery_error:.6f}")
print(f"Recovered sparsity: {np.sum(np.abs(x_recovered.value) > 0.01)}")

# Application 5: MPC (Simple Example)
print("\n" + "=" * 70)
print("Application 5: Model Predictive Control (MPC)")
print("=" * 70)

# System: x_{k+1} = A x_k + B u_k
A = np.array([[1.1, 0.1], [0, 0.9]])
B = np.array([[0], [1]])
n_states = A.shape[0]
n_inputs = B.shape[1]

# MPC parameters
N = 10  # Prediction horizon
Q = np.eye(n_states)  # State cost
R = 0.1 * np.eye(n_inputs)  # Input cost

x0 = np.array([1.0, 1.0])  # Initial state
x_ref = np.array([0.0, 0.0])  # Target state

# MPC optimization
x = cp.Variable((n_states, N + 1))
u = cp.Variable((n_inputs, N))

cost = 0
constraints = [x[:, 0] == x0]

for k in range(N):
    cost += cp.quad_form(x[:, k] - x_ref, Q)
    cost += cp.quad_form(u[:, k], R)
    constraints += [x[:, k + 1] == A @ x[:, k] + B @ u[:, k]]
    constraints += [cp.abs(u[:, k]) <= 2]  # Input constraints

cost += cp.quad_form(x[:, N] - x_ref, Q)  # Terminal cost

problem = cp.Problem(cp.Minimize(cost), constraints)
problem.solve()

print(f"\nMPC solution:")
print(f"  Initial state: {x0}")
print(f"  Optimal first control: {u.value[:, 0]}")
print(f"  Predicted final state: {x.value[:, -1]}")
print(f"  Total cost: {problem.value:.4f}")

# Visualization
fig = plt.figure(figsize=(18, 10))

# Plot 1: Efficient Frontier
ax1 = fig.add_subplot(2, 3, 1)
ax1.plot(risks, target_returns, 'b-', linewidth=2.5, label='Efficient frontier')
ax1.plot(risks[min_var_idx], target_returns[min_var_idx], 'r*',
         markersize=15, label='Minimum variance')
ax1.set_xlabel('Risk (Annual Std Dev)', fontsize=11)
ax1.set_ylabel('Expected Return (Annual)', fontsize=11)
ax1.set_title('Portfolio Efficient Frontier', fontsize=12, fontweight='bold')
ax1.legend(fontsize=10)
ax1.grid(True, alpha=0.3)

# Plot 2: SVM Decision Boundary
ax2 = fig.add_subplot(2, 3, 2)
x1_min, x1_max = X_train[:, 0].min() - 1, X_train[:, 0].max() + 1
x2_min, x2_max = X_train[:, 1].min() - 1, X_train[:, 1].max() + 1
xx1, xx2 = np.meshgrid(np.linspace(x1_min, x1_max, 100),
                        np.linspace(x2_min, x2_max, 100))
Z = (np.c_[xx1.ravel(), xx2.ravel()] @ w + b).reshape(xx1.shape)

ax2.contour(xx1, xx2, Z, levels=[-1, 0, 1], colors=['r', 'k', 'r'],
            linestyles=['--', '-', '--'], linewidths=[2, 2.5, 2])
ax2.scatter(X_train[y_train == 1, 0], X_train[y_train == 1, 1],
            c='blue', marker='o', s=100, edgecolors='k', label='Class +1')
ax2.scatter(X_train[y_train == -1, 0], X_train[y_train == -1, 1],
            c='red', marker='s', s=100, edgecolors='k', label='Class -1')
ax2.scatter(X_train[support_indices, 0], X_train[support_indices, 1],
            s=200, facecolors='none', edgecolors='green', linewidths=2,
            label='Support vectors')
ax2.set_xlabel('Feature 1', fontsize=11)
ax2.set_ylabel('Feature 2', fontsize=11)
ax2.set_title('Support Vector Machine', fontsize=12, fontweight='bold')
ax2.legend(fontsize=9)
ax2.grid(True, alpha=0.3)

# Plot 3: Lasso Coefficients
ax3 = fig.add_subplot(2, 3, 3)
ax3.stem(range(n_features), true_coef, linefmt='b-', markerfmt='bo',
         basefmt=' ', label='True coefficients')
ax3.stem(range(n_features), beta.value, linefmt='r-', markerfmt='r^',
         basefmt=' ', label='Lasso estimates')
ax3.set_xlabel('Coefficient Index', fontsize=11)
ax3.set_ylabel('Coefficient Value', fontsize=11)
ax3.set_title('Lasso Regression: Sparse Recovery', fontsize=12, fontweight='bold')
ax3.legend(fontsize=10)
ax3.grid(True, alpha=0.3)

# Plot 4: Compressed Sensing
ax4 = fig.add_subplot(2, 3, 4)
ax4.stem(range(n_signal), x_true, linefmt='b-', markerfmt='bo',
         basefmt=' ', label='True signal')
ax4.stem(range(n_signal), x_recovered.value, linefmt='r--', markerfmt='r^',
         basefmt=' ', label='Recovered signal')
ax4.set_xlabel('Signal Index', fontsize=11)
ax4.set_ylabel('Signal Value', fontsize=11)
ax4.set_title(f'Compressed Sensing ({n_measurements}/{n_signal} measurements)',
              fontsize=12, fontweight='bold')
ax4.legend(fontsize=10)
ax4.grid(True, alpha=0.3)

# Plot 5: MPC State Trajectory
ax5 = fig.add_subplot(2, 3, 5)
time = range(N + 1)
ax5.plot(time, x.value[0, :], 'b-o', linewidth=2, markersize=6, label='$x_1$')
ax5.plot(time, x.value[1, :], 'r-s', linewidth=2, markersize=6, label='$x_2$')
ax5.axhline(y=x_ref[0], color='k', linestyle='--', alpha=0.5, label='Target')
ax5.set_xlabel('Time Step', fontsize=11)
ax5.set_ylabel('State Value', fontsize=11)
ax5.set_title('MPC: Predicted State Trajectory', fontsize=12, fontweight='bold')
ax5.legend(fontsize=10)
ax5.grid(True, alpha=0.3)

# Plot 6: MPC Control Input
ax6 = fig.add_subplot(2, 3, 6)
ax6.step(range(N), u.value.flatten(), 'g-', linewidth=2.5, where='post', label='Control input')
ax6.axhline(y=2, color='r', linestyle='--', alpha=0.5, label='Constraints')
ax6.axhline(y=-2, color='r', linestyle='--', alpha=0.5)
ax6.set_xlabel('Time Step', fontsize=11)
ax6.set_ylabel('Control Input', fontsize=11)
ax6.set_title('MPC: Optimal Control Sequence', fontsize=12, fontweight='bold')
ax6.legend(fontsize=10)
ax6.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('optimization_applications.png', dpi=300, bbox_inches='tight')
print("\n" + "=" * 70)
print("Visualization saved as 'optimization_applications.png'")
print("=" * 70)
```

## Summary

### Key Application Domains

1. **Machine Learning**: Training models, SVM, regression, clustering
2. **Finance**: Portfolio optimization, risk management, option pricing
3. **Engineering**: Control systems, circuit design, structural optimization
4. **Operations Research**: Logistics, scheduling, resource allocation
5. **Signal Processing**: Compressed sensing, filter design, image processing

### Common Problem Structures

- **Convex problems**: Portfolio optimization, SVM, Lasso—global optimality guaranteed
- **Non-convex problems**: Neural network training, clustering—require sophisticated algorithms
- **Large-scale**: Modern ML applications require stochastic methods and distributed optimization
- **Constrained**: Most real applications have physical, budgetary, or regulatory constraints

### Practical Considerations

1. **Problem formulation**: Translate real-world problem into mathematical optimization
2. **Solver selection**: Choose appropriate algorithm based on problem structure
3. **Scalability**: Large-scale applications require specialized methods
4. **Validation**: Verify solutions satisfy practical requirements

Optimization theory provides the foundation for solving these diverse problems systematically and efficiently. The methods we study in subsequent topics enable practical solutions across all these application areas.
