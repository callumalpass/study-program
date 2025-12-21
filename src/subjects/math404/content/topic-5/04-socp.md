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