---
title: "Second-Order Cone Programming (SOCP)"
description: "Optimization with norm constraints"
---

# Second-Order Cone Programming (SOCP)

Sitting between Linear Programming (LP) and Semidefinite Programming (SDP) is **Second-Order Cone Programming (SOCP)**. It allows us to handle Euclidean norms directly in the constraints.

## The Second-Order Cone

The **second-order cone** (also called the Lorentz cone or Ice-cream cone) in $\mathbb{R}^{n+1}$ is defined as:

$$ \mathcal{K}_n = \{ (x, t) \in \mathbb{R}^n \times \mathbb{R} \mid \|x\|_2 \leq t \} $$

It looks like an infinite ice cream cone starting at the origin and opening upwards along the $t$-axis.
- It is a convex cone.
- The constraint $\|x\|_2 \leq t$ is convex (epigraph of the Euclidean norm).

## Definition

An SOCP is an optimization problem of the form:

$$
\begin{align}
\min \quad & f^T x \\
\text{s.t.} \quad & \| A_i x + b_i \|_2 \leq c_i^T x + d_i, \quad i = 1, \ldots, m \\
& Fx = g
\end{align}
$$

Constraints of the form $\| Ax + b \|_2 \leq c^T x + d$ are called **second-order cone constraints**.
Notice that if $A_i = 0$, this reduces to a linear inequality $0 \leq c_i^T x + d_i$ (LP).

## Relation to Other Problems

$$ \text{LP} \subset \text{QP} \subset \text{QCQP} \subset \text{SOCP} \subset \text{SDP} $$

- **QP:** Minimizing $\|Ax - b\|^2$ is equivalent to minimizing $t$ s.t. $\|Ax - b\| \leq \sqrt{t}$. (Careful: $\sqrt{t}$ is not linear. Need substitution).
  Actually, QP is a subset. $x^T x \leq t$ can be written as $\| (2x, 1-t) \|_2 \leq 1+t$ (Rotated cone).
- **QCQP:** Any convex quadratic constraint $x^T P x + q^T x + r \leq 0$ (with $P \succeq 0$) can be factored $P = A^T A$ and written as $\|Ax\|_2^2 + q^T x + r \leq 0$, which can be converted to SOCP.

## Examples

### 1. Robust Linear Programming
Suppose we want to satisfy $a^T x \leq b$, but the vector $a$ is uncertain. It lies in an ellipsoid $\mathcal{E} = \{ \bar{a} + Pu \mid \|u\|_2 \leq 1 \}$.
We want the constraint to hold for **all** possible $a$.

$$ \max_{a \in \mathcal{E}} a^T x \leq b $$
$$ \max_{\|u\|
\leq 1} (\bar{a} + Pu)^T x \leq b $$
$$ \bar{a}^T x + \max_{\|u\|
\leq 1} (u^T P^T x) \leq b $$
The max is achieved when $u$ aligns with $P^T x$: $\|P^T x\|_2$.
$$ \bar{a}^T x + \|P^T x\|_2 \leq b $$
This is a Second-Order Cone constraint! Robust LP is an SOCP.

### 2. Portfolio Optimization with Value-at-Risk
Minimize risk (standard deviation) subject to return constraint.
$$ \min \| \Sigma^{1/2} w \|_2 \quad \text{s.t.} \quad \mu^T w \geq R_{min} $$
Equivalent to SOCP.

### 3. Facility Location (Weber Problem)
Find a point $x$ in the plane to minimize the sum of distances to $k$ warehouses at $p_1, \dots, p_k$.
$$ \min \sum_{i=1}^k \| x - p_i \|_2 $$
Rewrite:
$$ \min \sum t_i \quad \text{s.t.} \quad \|x - p_i\|_2 \leq t_i $$
This is an SOCP. (Note: Not an LP, not a QP).

## Solving SOCPs

SOCPs can be solved significantly faster than SDPs (since the cones are simpler), but slower than LPs.
Interior Point Methods for SOCP are very mature and efficient (e.g., ECOS solver).

## Geometric Interpretation

In LP, optimal solutions are always at vertices (corners).
In SOCP, the feasible set has "smooth" corners (like the tip of a cone) and curved edges.
The optimal solution might be at a vertex, or it might be tangent to a curved face.
This allows SOCP to model "smooth" trade-offs that LP cannot (like the curve of constant risk in finance).

## Detailed Derivation: Robust Linear Programming

Consider an LP with uncertain constraint $a^T x \leq b$, where the coefficient vector $a$ is uncertain and lies in an ellipsoid:
$$ \mathcal{E} = \{ a : a = \bar{a} + Pu, \|u\|_2 \leq 1 \} $$

Here, $\bar{a}$ is the nominal (center) value, and $P$ describes the shape and orientation of the uncertainty ellipsoid.

**Goal:** Find $x$ such that the constraint holds for **all** possible $a \in \mathcal{E}$.

**Worst-Case Formulation:**
$$ \max_{a \in \mathcal{E}} a^T x \leq b $$

**Step 1: Parameterize $a$**
$$ \max_{\|u\|_2 \leq 1} (\bar{a} + Pu)^T x \leq b $$
$$ \max_{\|u\|_2 \leq 1} \left( \bar{a}^T x + u^T P^T x \right) \leq b $$

**Step 2: Inner Maximization**
The term $\bar{a}^T x$ is constant. We need to maximize $u^T P^T x$ subject to $\|u\|_2 \leq 1$.

By the Cauchy-Schwarz inequality:
$$ u^T P^T x \leq \|u\|_2 \cdot \|P^T x\|_2 $$

The maximum is achieved when $u = \frac{P^T x}{\|P^T x\|_2}$ (aligned with $P^T x$), giving:
$$ \max_{\|u\|_2 \leq 1} u^T P^T x = \|P^T x\|_2 $$

**Step 3: Robust Constraint**
$$ \bar{a}^T x + \|P^T x\|_2 \leq b $$

This is a **second-order cone constraint** of the form:
$$ \|P^T x\|_2 \leq b - \bar{a}^T x $$

**Conclusion:** A robust LP with ellipsoidal uncertainty becomes an SOCP.

## Worked Example: Quadratic Constraint Conversion

**Problem:** Consider the constraint:
$$ x^2 + y^2 \leq t $$

This is a quadratic constraint. Can we express it as an SOCP constraint?

**Step 1: Recognize Norm Form**
$$ \sqrt{x^2 + y^2} \leq \sqrt{t} $$
$$ \|(x, y)\|_2 \leq \sqrt{t} $$

But we need a linear function on the right-hand side, not $\sqrt{t}$.

**Step 2: Rotated Second-Order Cone**
Use the **rotated second-order cone**:
$$ \mathcal{K}_r^n = \left\{ (x, y, z) : \|z\|_2^2 \leq xy, x \geq 0, y \geq 0 \right\} $$

The constraint $\|(x, y)\|_2^2 \leq t$ with $t \geq 0$ can be written as:
$$ x^2 + y^2 \leq t \cdot 1 $$

Introducing an auxiliary variable $s = 1$, this becomes:
$$ \|(x, y)\|_2^2 \leq ts $$

with $s = 1$, which is in rotated cone form.

**Alternative (Standard Cone):** Use the identity:
$$ \|(x, y)\|_2 \leq t \iff \|(2x, 2y, t-1)\|_2 \leq t+1 $$

(after rescaling and shifting).

**Key Takeaway:** Many quadratic constraints can be expressed as SOCP constraints using standard or rotated cones.

## The Rotated Second-Order Cone

The **rotated second-order cone** is defined as:
$$ \mathcal{K}_r^n = \left\{ (x, y, z) \in \mathbb{R} \times \mathbb{R} \times \mathbb{R}^{n-2} : \|z\|_2^2 \leq xy, \, x \geq 0, \, y \geq 0 \right\} $$

**Relation to Standard Cone:**
The rotated cone can be transformed into the standard second-order cone via a linear transformation. Specifically:
$$ \|z\|_2^2 \leq xy \iff \left\| \begin{bmatrix} 2z \\ x - y \end{bmatrix} \right\|_2 \leq x + y $$

**Use Cases:**
1. Quadratic constraints: $x^T x \leq yz$.
2. Hyperbolic constraints: $xy \geq \|z\|_2^2$ (reciprocal constraints).
3. Geometric mean constraints: $\sqrt{xy} \geq \|z\|_2$ (by squaring).

**Example:** Minimize $1/x$ subject to $x > 0$, $Ax = b$.

Reformulate as:
$$ \min t \quad \text{s.t.} \quad 1 \leq tx, \, x > 0, \, Ax = b $$

The constraint $1 \leq tx$ is equivalent to $1^2 \leq tx$ with empty $z$, which fits the rotated cone:
$$ \mathcal{K}_r: \quad t \geq 0, \, x \geq 0, \, tx \geq 1 $$

## Extended Example: Antenna Array Design

**Problem:** Design an antenna array to produce a beam pattern with specified characteristics.

The beam pattern at angle $\theta$ is:
$$ y(\theta) = \sum_{i=1}^n w_i e^{j\omega_i \theta} $$

where $w_i$ are complex weights (to be optimized), and $\omega_i$ are fixed frequencies.

**Objective:** Maximize gain in the main direction $\theta_0$ while keeping sidelobe levels below a threshold in other directions.

**Formulation:**
$$
\begin{align}
\max \quad & |y(\theta_0)|^2 \\
\text{s.t.} \quad & |y(\theta)|^2 \leq \delta, \quad \forall \theta \in \Theta_{sidelobe}
\end{align}
$$

where $\Theta_{sidelobe}$ is the set of sidelobe angles.

**SOCP Reformulation:**
1. Maximize $t$ subject to $|y(\theta_0)|^2 \geq t$ (equivalently, $\|a(\theta_0)^T w\|_2^2 \geq t$ where $a(\theta)$ is the steering vector).
2. For sidelobes: $\|a(\theta)^T w\|_2^2 \leq \delta$ for each $\theta \in \Theta_{sidelobe}$.

Using rotated cone representation, these quadratic constraints become SOCP constraints.

**Result:** The optimal antenna weights can be found via SOCP.

## Comparison: QP vs QCQP vs SOCP

| Problem Type | Objective | Constraints | Example |
|--------------|-----------|-------------|---------|
| QP | Convex quadratic | Linear | $\min \|Ax - b\|^2$ s.t. $Cx \leq d$ |
| QCQP | Convex quadratic | Convex quadratic | $\min \|Ax - b\|^2$ s.t. $\|C_i x\|^2 \leq d_i$ |
| SOCP | Linear | Second-order cone | $\min c^T x$ s.t. $\|A_i x + b_i\|_2 \leq c_i^T x + d_i$ |

**Inclusion Relations:**
- QP $\subset$ QCQP $\subset$ SOCP (via Schur complement tricks).
- SOCP generalizes all three by allowing direct representation of norms.

**Computational Efficiency:**
- QP: Fastest (specialized algorithms like active-set methods).
- QCQP: Moderate (convert to SOCP or use interior-point).
- SOCP: General framework (handles all norm constraints efficiently).

## Common Reformulation Tricks

### Trick 1: Minimizing Maximum Norm
Minimize the maximum of norms:
$$ \min \max_{i=1,\ldots,m} \|A_i x + b_i\|_2 $$

**Reformulation:**
$$ \min t \quad \text{s.t.} \quad \|A_i x + b_i\|_2 \leq t, \, i = 1,\ldots,m $$

This is an SOCP with $m$ second-order cone constraints.

### Trick 2: Sum of Norms
Minimize sum of norms:
$$ \min \sum_{i=1}^m \|A_i x + b_i\|_2 $$

**Reformulation:**
$$ \min \sum_{i=1}^m t_i \quad \text{s.t.} \quad \|A_i x + b_i\|_2 \leq t_i, \, i = 1,\ldots,m $$

Objective is now linear, constraints are SOCP.

### Trick 3: Stochastic Constraints (Chance Constraints)
Ensure constraint holds with probability $\geq 1 - \epsilon$:
$$ \Pr(a^T x \leq b) \geq 1 - \epsilon $$

where $a \sim \mathcal{N}(\bar{a}, \Sigma)$ is Gaussian.

Then $a^T x \sim \mathcal{N}(\bar{a}^T x, x^T \Sigma x)$.

The constraint becomes:
$$ \bar{a}^T x + \Phi^{-1}(1 - \epsilon) \sqrt{x^T \Sigma x} \leq b $$

where $\Phi^{-1}$ is the inverse CDF of the standard normal.

Since $\sqrt{x^T \Sigma x} = \|\Sigma^{1/2} x\|_2$, this is an SOCP constraint.

## Visualizing the Second-Order Cone

```plot
{
  "title": "Second-Order Cone (2D slice)",
  "x_label": "x",
  "y_label": "t",
  "functions": [
    {
      "fn": "abs(x)",
      "label": "|x| ≤ t (cone boundary)",
      "color": "blue"
    }
  ],
  "x_range": [-3, 3],
  "regions": [
    {
      "ineq": "abs(x) <= y",
      "color": "lightblue",
      "opacity": 0.3,
      "label": "Feasible region"
    }
  ]
}
```

In 2D, the second-order cone $\{(x, t) : |x| \leq t\}$ is the epigraph of $|x|$. In higher dimensions, it's an ice cream cone opening along the $t$-axis.

## Common Mistakes

**Mistake 1: Non-Convex Right-Hand Side**
The constraint $\|Ax + b\|_2 \leq c^T x + d$ requires $c^T x + d \geq 0$ for the cone to be well-defined. If $c^T x + d$ can be negative, the problem is non-convex.

**Fix:** Add constraint $c^T x + d \geq 0$ explicitly, or reformulate.

**Mistake 2: Squaring Both Sides Incorrectly**
The constraint $\|Ax + b\|_2 \leq c^T x + d$ is **not** equivalent to $\|Ax + b\|_2^2 \leq (c^T x + d)^2$ unless $c^T x + d \geq 0$ is guaranteed.

**Mistake 3: Mixing Norms**
SOCP handles the $\ell_2$ norm (Euclidean). If you have $\ell_1$ or $\ell_\infty$ norms, reformulate them first:
- $\|x\|_1 = \sum |x_i|$ can be handled via $|x_i| \leq t_i$ (linear).
- $\|x\|_\infty = \max |x_i|$ can be handled via $|x_i| \leq t$ (linear).

## Practical Tips

1. **Check Structure:** If your problem has norms, try SOCP before SDP (much faster).

2. **Use Modeling Tools:** CVXPY, CVX, YALMIP automatically recognize SOCP structure. Just write $\|Ax\|_2 \leq b$ directly.

3. **Solver Choice:** ECOS (embedded conic solver) is fast and free. Mosek and Gurobi are commercial but more robust.

4. **Scaling Matters:** SOCP solvers can be sensitive to poorly scaled data. Normalize your constraint matrices.

5. **Warm Starts:** Some SOCP solvers support warm starting (using a previous solution as an initial point), which speeds up re-solves when data changes slightly.

## Key Takeaways

1. **Definition:** SOCP minimizes linear objectives subject to second-order cone constraints $\|Ax + b\|_2 \leq c^T x + d$.

2. **Hierarchy:** LP $\subset$ QP $\subset$ QCQP $\subset$ SOCP $\subset$ SDP.

3. **Robust LP:** Ellipsoidal uncertainty in LP leads naturally to SOCP.

4. **Rotated Cone:** The rotated cone $\|z\|_2^2 \leq xy$ is useful for hyperbolic and quadratic constraints.

5. **Applications:** Portfolio optimization, robust control, facility location, antenna design, filter design, structural engineering.

6. **Complexity:** SOCPs are solved efficiently via interior-point methods, faster than SDP but slower than LP.

7. **Tools:** Use CVXPY (Python), CVX (MATLAB), or JuMP (Julia). Solvers: ECOS, Mosek, Gurobi, SCS.