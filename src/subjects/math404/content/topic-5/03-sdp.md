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