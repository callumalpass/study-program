---
title: "Convex Programs"
description: "Standard forms and problem classes in convex optimization"
---

# Convex Programs

A **Convex Optimization Problem** (or Convex Program) is a special class of mathematical optimization problem where the objective is convex and the feasible set is convex.

## Standard Form

A convex optimization problem is typically written as:

$$ 
\begin{align}
min \quad & f_0(x) \\
text{s.t.} \quad & f_i(x) \leq 0, \quad i = 1, \ldots, m \\
& a_i^T x = b_i, \quad i = 1, \ldots, p
\end{align}
$$ 

where:
1.  The objective function $f_0(x)$ is **convex**.
2.  The inequality constraint functions $f_i(x)$ are **convex**.
3.  The equality constraint functions are **affine** ($a_i^T x = b_i$).

**Note on Equality:** We cannot have non-linear equality constraints $h(x) = 0$ generally, because the set {x | h(x) = 0} is usually not convex (it's a curve or surface). The only exception is affine equalities, which define hyperplanes (convex).

## Why This Form?

The intersection of convex sublevel sets ($f_i(x) \leq 0$) and affine sets ($Ax=b$) is a convex set.
Minimizing a convex function over a convex set guarantees that any local minimum is a global minimum.

## Hierarchy of Convex Problems

Convex optimization is not a single type of problem; it's a hierarchy of problem classes, each generalizing the previous one.

### 1. Linear Programming (LP)
- **Objective:** Linear $c^T x$
- **Constraints:** Linear inequalities $Ax \leq b$ and equalities.
- **Complexity:** Solvable in polynomial time. Basis for everything.

### 2. Quadratic Programming (QP)
- **Objective:** Convex quadratic $\frac{1}{2}x^T P x + q^T x + r$ (where $P \succeq 0$).
- **Constraints:** Linear.
- **Example:** Least squares, portfolio optimization (Markowitz), SVM.

### 3. Quadratically Constrained QP (QCQP)
- **Objective:** Convex quadratic.
- **Constraints:** Convex quadratic inequalities $x^T P_i x + q_i^T x + r_i \leq 0$.
- **Example:** Portfolio optimization with risk constraints.

### 4. Second-Order Cone Programming (SOCP)
- **Objective:** Linear.
- **Constraints:** Second-order cone constraints $\|Ax + b\|_2 \leq c^T x + d$.
- **Generalizes:** LP, QP, QCQP.
- **Example:** Robust LP, facility location.

### 5. Semidefinite Programming (SDP)
- **Objective:** Linear function of matrix variable $\textbf{tr}(CX)$.
- **Constraints:** Linear matrix inequalities (LMI) $X \succeq 0$.
- **Generalizes:** All the above.
- **Example:** Control theory, combinatorial relaxations (Max-Cut), eigenvalue optimization.

### 6. Geometric Programming (GP)
- **Objective:** Posynomials.
- **Constraints:** Posynomial inequalities, monomial equalities.
- **Transformation:** Becomes convex after log transformation.
- **Example:** Circuit design, power control.

## Solving Convex Programs

We generally don't solve these by hand. We use **solvers**.

### Interior Point Methods
The dominant algorithm class for general convex problems (Newton's method with barrier functions).
- **Efficiency:** Robustly solves problems with thousands (sometimes millions) of variables.
- **Convergence:** Polynomial time complexity.

### First-Order Methods
Gradient descent, Proximal gradient, ADMM.
- **Efficiency:** Can handle massive scale (millions/billions of variables) if low accuracy is acceptable.
- **Application:** Machine learning training.

## The Art of Modeling

The challenge in convex optimization is not writing the algorithm (libraries do that). The challenge is **recognizing** or **reformulating** your problem as a convex program.

Example:
$$ \min \frac{\|Ax - b\|^2}{1 - x^T x} \quad \text{s.t.} \quad \|x\| < 1 $$ 

Is this convex? It doesn't look like it.
But minimizing $f(x)$ is equivalent to minimizing an upper bound $t$ s.t. $f(x) \leq t$.
$$ \frac{\|Ax - b\|^2}{1 - x^T x} \leq t \iff \|Ax - b\|^2 \leq t(1 - x^T x) $$ 

This requires Schur complement tricks or SDP formulation.

This skill—**Disciplined Convex Programming**—is what this course aims to build.

## Extended Example: Portfolio Optimization

Consider a classical portfolio optimization problem. You have $n$ assets with expected returns $\mu_i$ and a covariance matrix $\Sigma$ representing risk. Your goal is to choose portfolio weights $w \in \mathbb{R}^n$ (where $w_i$ is the fraction invested in asset $i$) to balance risk and return.

**Formulation:**
$$
\begin{align}
\min \quad & \frac{1}{2}w^T \Sigma w - \gamma \mu^T w \\
\text{s.t.} \quad & \mathbf{1}^T w = 1 \\
& w \geq 0
\end{align}
$$

Where $\gamma > 0$ is a risk-aversion parameter.

**Analysis:**
- The objective $\frac{1}{2}w^T \Sigma w$ (variance) is convex if $\Sigma \succeq 0$ (positive semidefinite), which is always true for covariance matrices.
- The term $-\gamma \mu^T w$ is linear (both convex and concave).
- Sum of convex functions is convex, so the objective is convex.
- Constraints are linear (affine equalities and inequalities).
- **Conclusion:** This is a Quadratic Program (QP).

This problem has a unique global optimum (since $\Sigma \succ 0$ typically, making the objective strictly convex).

## Reformulation Techniques

A critical skill in convex optimization is recognizing when a non-obvious problem can be reformulated as a standard convex program. Here are common techniques:

### 1. Epigraph Form
To minimize a convex function $f(x)$, introduce a new variable $t$ and minimize $t$ subject to $f(x) \leq t$:
$$ \min f(x) \quad \Longleftrightarrow \quad \min t \quad \text{s.t.} \quad f(x) \leq t $$

This is useful when the constraint form $f(x) \leq t$ has better structure than the objective $f(x)$.

**Example:** Minimize the maximum of convex functions:
$$ \min \max_{i=1,\ldots,m} f_i(x) \quad \Longleftrightarrow \quad \min t \quad \text{s.t.} \quad f_i(x) \leq t, \, i=1,\ldots,m $$

### 2. Change of Variables
Sometimes a non-convex problem becomes convex after substitution.

**Example:** Minimize $f(e^x)$ where $f$ is convex. Let $y = e^x$:
$$ \min_{x} f(e^x) \quad \Longleftrightarrow \quad \min_{y > 0} f(y) $$

This is the foundation of Geometric Programming.

### 3. Schur Complement
For quadratic forms, the Schur complement allows us to convert quadratic constraints into Linear Matrix Inequalities (LMIs).

**Schur Complement Lemma:**
$$ \begin{bmatrix} A & B \\ B^T & C \end{bmatrix} \succeq 0 \quad \Longleftrightarrow \quad C \succeq 0, \quad A - BC^{-1}B^T \succeq 0 $$

**Example:** The constraint $x^T P x \leq 1$ (with $P \succ 0$) is equivalent to:
$$ \begin{bmatrix} P & x \\ x^T & 1 \end{bmatrix} \succeq 0 $$

This converts a QCQP into an SDP.

## Common Mistakes to Avoid

### Mistake 1: Non-Convex Equality Constraints
A constraint like $x^2 + y^2 = 1$ (circle) is **not convex**. The set $\{(x,y) : x^2 + y^2 = 1\}$ is not a convex set.

**Why?** Take two points on the circle: $(1, 0)$ and $(0, 1)$. Their midpoint is $(\frac{1}{2}, \frac{1}{2})$, which satisfies $(\frac{1}{2})^2 + (\frac{1}{2})^2 = \frac{1}{2} \neq 1$.

**Rule:** Only affine equalities ($Ax = b$) are allowed in convex programs.

### Mistake 2: Maximizing Convex Functions
If $f$ is convex, then maximizing $f(x)$ is a **non-convex** problem (minimizing $-f$ where $-f$ is concave).

**Fix:** If you must maximize a convex function, you're in the realm of non-convex optimization. However, if the feasible set is compact and $f$ is continuous, the maximum exists at an extreme point (vertex for polyhedra).

### Mistake 3: Composition Errors
The composition $f(g(x))$ is convex if:
- $f$ is convex and non-decreasing, and $g$ is convex, **OR**
- $f$ is convex and non-increasing, and $g$ is concave.

**Example:** $e^{x^2}$ is convex ($e^t$ is convex and increasing, $x^2$ is convex). But $\log(x^2)$ requires care: $\log$ is concave and increasing, so we need $x^2$ to be concave (false!). Actually, $\log(x^2) = 2\log|x|$ is concave on $x > 0$.

## Computational Complexity

Different classes of convex programs have vastly different computational costs:

| Problem Class | Variables | Complexity (Roughly) | Solvable Size |
|---------------|-----------|----------------------|---------------|
| LP | $n$ | $O(n^{2.5})$ to $O(n^3)$ | Millions |
| QP | $n$ | $O(n^3)$ | Hundreds of thousands |
| SOCP | $n$ | $O(n^3)$ | Tens of thousands |
| SDP | $n \times n$ matrix | $O(n^{4.5})$ | Thousands |

**Practical Advice:**
- Always try to formulate as LP if possible (fastest).
- If LP fails, try SOCP before SDP (much faster).
- For massive scale ($n > 10^6$), use first-order methods (slower convergence, but each iteration is cheap).

## Key Takeaways

1. **Standard Form:** Minimize convex $f_0(x)$ subject to convex inequalities $f_i(x) \leq 0$ and affine equalities $Ax = b$.

2. **Hierarchy:** LP $\subset$ QP $\subset$ QCQP $\subset$ SOCP $\subset$ SDP. Each level is strictly more expressive than the previous.

3. **Solving:** Modern solvers (CVXPY, CVX, YALMIP) use disciplined convex programming frameworks that automatically recognize problem structure and select the appropriate algorithm.

4. **Reformulation is Key:** Many real-world problems are not obviously convex. The art is in recognizing hidden convex structure or reformulating to reveal it.

5. **Verification:** Use composition rules, check constraint convexity, and verify the feasible set is convex. If in doubt, check second derivatives (Hessian $\nabla^2 f \succeq 0$).

6. **Why Convexity Matters:** Any local minimum is global, duality gap is zero (under mild conditions), efficient algorithms exist, and theoretical guarantees are strong.