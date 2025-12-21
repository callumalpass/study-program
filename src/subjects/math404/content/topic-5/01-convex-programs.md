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