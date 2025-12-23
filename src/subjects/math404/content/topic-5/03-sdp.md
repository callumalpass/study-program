---
title: "Semidefinite Programming (SDP)"
description: "Optimizing over the cone of positive semidefinite matrices"
---

# Semidefinite Programming (SDP)

Semidefinite Programming (SDP) is arguably the most exciting development in mathematical optimization in the late 20th century. It generalizes Linear Programming (LP) to matrices, replacing vector inequalities ($\geq 0$) with matrix inequalities (Positive Semidefinite $\succeq 0$). 

## Definition

Standard Form SDP:

$$ 
\begin{align}
\min_{X \in \mathbb{S}^n} \quad & \textbf{tr}(CX) \\
\text{s.t.} \quad & \textbf{tr}(A_i X) = b_i, \quad i = 1, \ldots, p \\
& X \succeq 0
\end{align}
$$

where:
- $X \in \mathbb{S}^n$ is the decision variable (symmetric $n \times n$ matrix).
- $C, A_i \in \mathbb{S}^n$ are data matrices.
- $\textbf{tr}(CX) = \sum_{i,j} C_{ij} X_{ij}$ is the standard inner product for matrices (analogous to $c^T x$).
- $X \succeq 0$ means $X$ is positive semidefinite (all eigenvalues $\geq 0$).

## Relation to LP

Linear Programming is actually a specific case of SDP.
If we restrict $X$ to be a diagonal matrix, then $X \succeq 0$ simply means the diagonal entries are non-negative ($x_i \geq 0$).
The trace inner product becomes the vector dot product.
Thus, **Diagonal SDP = LP**.

SDP is to LP what complex numbers are to real numbers: a richer, more powerful generalization that reveals hidden structures.

## Geometric Intuition

In LP, the feasible set is a **polyhedron** (intersection of flat halfspaces). It has sharp corners (vertices) and flat faces.
In SDP, the feasible set is the intersection of affine hyperplanes with the **PSD Cone**. The PSD cone has "curved" boundaries (like an ice cream cone, but in high dimensions).

The boundary of the PSD cone consists of singular matrices (determinant = 0).

## Examples

### 1. Eigenvalue Minimization
Minimize the maximum eigenvalue of a symmetric matrix $A(x) = A_0 + x_1 A_1 + \dots + x_k A_k$.
$$ \min \lambda_{\max}(A(x)) $$
This is equivalent to:
$$ \min t \quad \text{s.t.} \quad tI - A(x) \succeq 0 $$
This is an SDP in variables $(t, x)$.

### 2. Matrix Norm Minimization
Minimize the spectral norm (largest singular value) of a matrix $A(x)$.
$$ \min \|A(x)\|_2 $$
Equivalent to:
$$ 
\min t \quad \text{s.t.} \quad \begin{bmatrix} tI & A(x) \\ A(x)^T & tI \end{bmatrix} \succeq 0
$$ 

### 3. Max-Cut Relaxation (Goemans-Williamson)
The Max-Cut problem (partition graph nodes to maximize edges crossing the partition) is NP-hard.
Formulation: $x_i \in \{-1, 1\}$, maximize $\sum w_{ij} (1 - x_i x_j)/2$.
Relaxation: Replace scalar product $x_i x_j$ with vector dot product $v_i^T v_j$ (where $\|v_i\|=1$).
This leads to an SDP:
$$ \max \sum \frac{w_{ij}}{2}(1 - X_{ij}) \quad \text{s.t.} \quad X_{ii} = 1, X \succeq 0 $$
The solution $X$ allows us to approximate the Max-Cut with a guaranteed bound of $0.878$.

## Duality in SDP

The dual of an SDP is also an SDP.

**Primal:**
$$ \min \textbf{tr}(CX) \quad \text{s.t.} \quad \textbf{tr}(A_i X) = b_i, X \succeq 0 $$

**Dual:**
$$ \max b^T y \quad \text{s.t.} \quad \sum_{i=1}^p y_i A_i + S = C, S \succeq 0 $$

Note:
- Weak duality always holds.
- Strong duality holds **only if** Slater's condition is met (strictly feasible point exists).
- Duality gap can be non-zero in pathological cases (unlike LP).

## Applications

1.  **Control Theory:** Lyapunov stability analysis ($A^T P + PA \prec 0$).
2.  **Signal Processing:** Filter design, sensor network localization.
3.  **Combinatorial Optimization:** Relaxations of NP-hard graph problems.
4.  **Geometry:** Finding the smallest ellipsoid enclosing a set of points (Löwner-John ellipsoid).
5.  **Polynomial Optimization:** Sum-of-squares (SOS) decomposition.

## Solving SDPs

SDPs are solvable in polynomial time using **Interior Point Methods**.
However, the complexity is roughly $O(n^{3.5})$ or $O(n^4)$, which is much more expensive than LP.
Current solvers (Mosek, SDPT3, SeDuMi) can handle matrices up to $n \approx 1000$ or a few thousand. For larger problems, first-order methods (ADMM) are used.

## Understanding the PSD Cone

The set of positive semidefinite matrices forms a **convex cone** in the space of symmetric matrices:
$$ \mathbb{S}_+^n = \{ X \in \mathbb{S}^n : X \succeq 0 \} $$

**Properties:**
1. **Closure under positive scaling:** If $X \succeq 0$ and $\alpha \geq 0$, then $\alpha X \succeq 0$.
2. **Closure under addition:** If $X \succeq 0$ and $Y \succeq 0$, then $X + Y \succeq 0$.
3. **Convexity:** If $X, Y \succeq 0$ and $\theta \in [0,1]$, then $\theta X + (1-\theta)Y \succeq 0$.

**Characterizations of $X \succeq 0$:**
- All eigenvalues are non-negative: $\lambda_i(X) \geq 0$ for all $i$.
- $X = LL^T$ for some matrix $L$ (Cholesky decomposition).
- $z^T X z \geq 0$ for all vectors $z \in \mathbb{R}^n$.
- All principal minors are non-negative.

**Boundary:** The boundary of the PSD cone consists of matrices with $\det(X) = 0$ (singular matrices with at least one zero eigenvalue).

## Extended Example: Matrix Completion

Given a partially observed matrix (some entries known, others missing), find the lowest-rank matrix consistent with the observations.

**Problem:**
$$ \min \text{rank}(X) \quad \text{s.t.} \quad X_{ij} = M_{ij} \text{ for } (i,j) \in \Omega $$

where $\Omega$ is the set of observed entries.

**Challenge:** Rank minimization is non-convex and NP-hard.

**Convex Relaxation:** Replace rank with the nuclear norm (sum of singular values), which is the convex envelope of rank on the unit ball.

$$ \min \|X\|_* \quad \text{s.t.} \quad X_{ij} = M_{ij} \text{ for } (i,j) \in \Omega $$

where $\|X\|_* = \sum_i \sigma_i(X)$ is the nuclear norm.

**SDP Formulation:** The nuclear norm can be expressed using an SDP:
$$ \|X\|_* = \min \frac{1}{2}(\text{tr}(W_1) + \text{tr}(W_2)) \quad \text{s.t.} \quad \begin{bmatrix} W_1 & X \\ X^T & W_2 \end{bmatrix} \succeq 0 $$

This is an SDP in variables $(X, W_1, W_2)$.

**Application:** Netflix Prize, recommender systems, sensor network localization.

## Worked Example: Eigenvalue Optimization

**Problem:** Given symmetric matrices $A_0, A_1, \ldots, A_k$, minimize the maximum eigenvalue of $A(x) = A_0 + x_1 A_1 + \cdots + x_k A_k$.

$$ \min_{x \in \mathbb{R}^k} \lambda_{\max}(A(x)) $$

**Step 1: Reformulation**
Introduce variable $t$ representing the maximum eigenvalue:
$$ \min t \quad \text{s.t.} \quad \lambda_{\max}(A(x)) \leq t $$

**Step 2: Convert to PSD Constraint**
The condition $\lambda_{\max}(A(x)) \leq t$ is equivalent to $A(x) \preceq tI$, or:
$$ tI - A(x) \succeq 0 $$

**Step 3: Linear Matrix Inequality**
$$ tI - A_0 - \sum_{i=1}^k x_i A_i \succeq 0 $$

This is linear in the decision variables $(t, x_1, \ldots, x_k)$.

**Final SDP:**
$$
\begin{align}
\min_{t, x} \quad & t \\
\text{s.t.} \quad & tI - A_0 - \sum_{i=1}^k x_i A_i \succeq 0
\end{align}
$$

**Example Application:** In control theory, stabilize a system $\dot{z} = A(x)z$ by choosing $x$ to make all eigenvalues of $A(x)$ have negative real parts (eigenvalue constraints).

## The S-Procedure and Robust Constraints

The **S-Procedure** is a powerful tool for converting quadratic constraints into LMIs.

**Theorem (S-Procedure):**
For quadratic functions $f_0(x) = x^T P_0 x + 2q_0^T x + r_0$ and $f_1(x) = x^T P_1 x + 2q_1^T x + r_1$, the implication:
$$ f_1(x) \leq 0 \implies f_0(x) \leq 0 $$

holds if and only if there exists $\tau \geq 0$ such that:
$$ \begin{bmatrix} P_0 & q_0 \\ q_0^T & r_0 \end{bmatrix} \preceq \tau \begin{bmatrix} P_1 & q_1 \\ q_1^T & r_1 \end{bmatrix} $$

(under a constraint qualification: $\exists x : f_1(x) < 0$).

**Application:** Robust optimization with ellipsoidal uncertainty.

**Example:** Ensure $c^T x \leq b$ for all $x$ satisfying $\|x - x_0\|_P^2 \leq 1$ (ellipsoidal set).

This is equivalent to:
$$ (x - x_0)^T P (x - x_0) \leq 1 \implies c^T x \leq b $$

By the S-procedure, this holds if:
$$ \begin{bmatrix} 0 & c/2 \\ c/2 & b \end{bmatrix} \succeq \tau \begin{bmatrix} P & -Px_0 \\ -x_0^T P & x_0^T P x_0 - 1 \end{bmatrix} $$

for some $\tau \geq 0$. This is a matrix inequality constraint on $\tau$.

## SDP and Sum-of-Squares (SOS)

A polynomial $p(x)$ is a **sum-of-squares (SOS)** if it can be written as:
$$ p(x) = \sum_{i=1}^m q_i(x)^2 $$

for some polynomials $q_i$.

**Key Fact:** If $p(x)$ is SOS, then $p(x) \geq 0$ for all $x$ (global non-negativity).

**SDP Connection:** Testing if $p(x)$ is SOS can be formulated as an SDP.

**Example:** $p(x) = x_1^2 + x_2^2 + 1$ is clearly SOS (already in squared form) and globally non-negative.

But $p(x) = x^4 - x + 1$ is globally non-negative (can be verified by calculus), but is it SOS?

**Technique:** Write $p(x) = v(x)^T Q v(x)$ where $v(x)$ is a vector of monomials (e.g., $v(x) = [x^2, x, 1]^T$) and $Q$ is a symmetric matrix. Then $p$ is SOS if $Q \succeq 0$.

For $p(x) = x^4 - x + 1$, use $v(x) = [x^2, x, 1]^T$:
$$ p(x) = [x^2, x, 1] \begin{bmatrix} Q_{11} & Q_{12} & Q_{13} \\ Q_{12} & Q_{22} & Q_{23} \\ Q_{13} & Q_{23} & Q_{33} \end{bmatrix} \begin{bmatrix} x^2 \\ x \\ 1 \end{bmatrix} $$

Match coefficients:
- $x^4$: $Q_{11} = 1$
- $x^3$: $2Q_{12} = 0 \implies Q_{12} = 0$
- $x^2$: $2Q_{13} + Q_{22} = 0$
- $x^1$: $2Q_{23} = -1 \implies Q_{23} = -1/2$
- $x^0$: $Q_{33} = 1$

From $2Q_{13} + Q_{22} = 0$, let $Q_{22} = a$, then $Q_{13} = -a/2$.

Check $Q \succeq 0$: Compute determinants of principal minors. After solving, we find a feasible $Q \succeq 0$, proving $p$ is SOS.

**Application:** Global polynomial optimization via SOS relaxations (Lasserre hierarchy).

## Comparison: LP vs SDP

| Feature | Linear Programming | Semidefinite Programming |
|---------|-------------------|--------------------------|
| Variables | Vector $x \in \mathbb{R}^n$ | Matrix $X \in \mathbb{S}^n$ |
| Objective | $c^T x$ | $\text{tr}(CX)$ |
| Constraints | $Ax \leq b$ | $\text{tr}(A_i X) = b_i, X \succeq 0$ |
| Feasible Set | Polyhedron (flat faces) | Intersection of affine space with PSD cone (curved) |
| Complexity | $O(n^3)$ | $O(n^{4.5})$ |
| Optimal Point | Vertex (corner) | May be on curved boundary |
| Simplex Method | Yes | No analog |
| Interior Point | Yes | Yes |
| Strong Duality | Always (if feasible) | Requires Slater condition |

## Common Mistakes and Pitfalls

**Mistake 1: Forgetting Symmetry**
The constraint $X \succeq 0$ only makes sense if $X$ is symmetric. If your formulation has a non-symmetric matrix, you must symmetrize it: use $(X + X^T)/2$.

**Mistake 2: Confusing $\succeq$ with Elementwise $\geq$**
$X \succeq Y$ means $X - Y$ is PSD (eigenvalue condition), **not** that every element $X_{ij} \geq Y_{ij}$.

**Example:**
$$ X = \begin{bmatrix} 2 & 0 \\ 0 & 2 \end{bmatrix}, \quad Y = \begin{bmatrix} 1 & 1 \\ 1 & 1 \end{bmatrix} $$

Elementwise: $X \geq Y$ is false (since $0 \not\geq 1$).

But $X - Y = \begin{bmatrix} 1 & -1 \\ -1 & 1 \end{bmatrix}$ has eigenvalues $0, 2$ (both $\geq 0$), so $X \succeq Y$ is **true**.

**Mistake 3: Ignoring Constraint Qualification**
Strong duality in SDP requires **Slater's condition**: there exists a strictly feasible point (interior point of the PSD cone where $X \succ 0$). If this fails, the duality gap can be non-zero, and the SDP may be ill-posed.

## Practical Tips for Modeling with SDP

1. **Check if LP/SOCP suffices first:** SDPs are more expensive. Only use SDP if lower levels in the hierarchy don't work.

2. **Use standard form:** Convert your problem to standard SDP form for compatibility with solvers.

3. **Exploit structure:** If your problem has block-diagonal structure, decompose it. Solvers can exploit this for massive speedup.

4. **Start small:** Test your formulation on small instances to verify correctness before scaling up.

5. **Numerical issues:** PSD constraints can be sensitive to numerical errors. Use appropriate solver tolerances.

## Key Takeaways

1. **Definition:** SDP optimizes linear objectives over LMI constraints $X \succeq 0$.

2. **Generalization:** SDP generalizes LP by replacing vector inequalities ($x \geq 0$) with matrix inequalities ($X \succeq 0$).

3. **Power:** SDP can solve problems LP cannot: eigenvalue optimization, matrix norm minimization, combinatorial relaxations.

4. **Complexity:** SDPs are polynomial-time solvable but more expensive than LPs. Practical limit is $n \approx 1000$.

5. **Applications:** Control theory (Lyapunov functions), quantum information (entanglement), machine learning (kernel methods), combinatorial optimization (Max-Cut).

6. **Duality:** SDP duality is similar to LP duality but requires Slater's condition for zero duality gap.

7. **Tools:** Use CVX (MATLAB), CVXPY (Python), or JuMP (Julia) for modeling. Solvers: Mosek, SDPT3, SCS.