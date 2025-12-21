---
title: "The Dual Problem"
description: "Deriving and understanding the dual linear program"
---

# The Dual Problem

In mathematical optimization, particularly in linear programming (LP), every problem we define—let's call it the **primal problem**—has an associated problem known as the **dual problem**. The relationship between these two problems is one of the most beautiful and useful structures in applied mathematics.

## Motivation: Finding Bounds

Consider a standard maximization problem. Suppose you are running a factory that produces two products, $x_1$ and $x_2$. You want to maximize profit $z = 3x_1 + 2x_2$ subject to some resource constraints.

$$
\begin{align}
\text{Maximize} \quad & z = 3x_1 + 2x_2 \\
\text{Subject to} \quad & 2x_1 + x_2 \leq 100 \quad \text{(Resource A)} \\
& x_1 + x_2 \leq 80 \quad \text{(Resource B)} \\
& x_1 \leq 40 \quad \text{(Resource C)} \\
& x_1, x_2 \geq 0
\end{align}
$$

How do we know if a solution we found is optimal? Suppose we find a feasible solution $(20, 60)$ which gives profit $z = 3(20) + 2(60) = 60 + 120 = 180$. Is this the best we can do?

To prove it's the best, we need an **upper bound** on the maximum possible profit.

We can combine the constraints to form bounds.
- Take the first constraint: $2x_1 + x_2 \leq 100$. Since $x_1, x_2 \geq 0$, we know $3x_1 + 2x_2$ isn't directly bounded by this, but notice that $3x_1 + 2x_2 \leq 3(2x_1 + x_2)$ is generally false.
- Let's look for multipliers $y_1, y_2, y_3 \geq 0$ for the three constraints such that when we add the inequalities, the coefficients on the LHS are at least the coefficients in the objective function.

If we multiply:
- Constraint 1 by $y_1$
- Constraint 2 by $y_2$
- Constraint 3 by $y_3$

We get:
$$y_1(2x_1 + x_2) + y_2(x_1 + x_2) + y_3(x_1) \leq 100y_1 + 80y_2 + 40y_3$$

Rearranging terms by $x$:
$$(2y_1 + y_2 + y_3)x_1 + (y_1 + y_2)x_2 \leq 100y_1 + 80y_2 + 40y_3$$

If we can choose $y_i$ such that:
$$2y_1 + y_2 + y_3 \geq 3$$
$$y_1 + y_2 \geq 2$$

Then, because $x \geq 0$:
$$3x_1 + 2x_2 \leq (2y_1 + y_2 + y_3)x_1 + (y_1 + y_2)x_2 \leq 100y_1 + 80y_2 + 40y_3$$

So, $100y_1 + 80y_2 + 40y_3$ is an **upper bound** on our profit. To get the *tightest* upper bound, we want to **minimize** this quantity.

This minimization problem is exactly the **dual problem**.

## Formal Definition

Let the **Primal Problem (P)** be in canonical form:

$$
\begin{align}
\text{(P)} \quad \text{Maximize} \quad & c^T x \\
\text{Subject to} \quad & Ax \leq b \\
& x \geq 0
\end{align}
$$

where $A$ is an $m \times n$ matrix, $x \in \mathbb{R}^n$, $b \in \mathbb{R}^m$, and $c \in \mathbb{R}^n$.

The **Dual Problem (D)** is defined as:

$$
\begin{align}
\text{(D)} \quad \text{Minimize} \quad & b^T y \\
\text{Subject to} \quad & A^T y \geq c \\
& y \geq 0
\end{align}
$$

where $y \in \mathbb{R}^m$ is the vector of dual variables.

### Key Observations

1.  **Variables $\leftrightarrow$ Constraints**: The primal has $n$ variables and $m$ constraints. The dual has $m$ variables and $n$ constraints.
2.  **RHS $\leftrightarrow$ Objective**: The right-hand side vector $b$ of the primal becomes the objective coefficients of the dual.
3.  **Objective $\leftrightarrow$ RHS**: The objective coefficients $c$ of the primal become the right-hand side of the dual.
4.  **Matrix Transpose**: The constraint matrix $A$ is transposed to $A^T$ in the dual.
5.  **Direction**: Maximization turns into Minimization.
6.  **Inequalities**: $\leq$ constraints in a maximization problem become $\geq$ constraints in the minimization dual.

## Duality for General LPs

Not all LPs come in canonical form. We might have equality constraints, or free variables (unrestricted in sign). The rules for forming the dual are summarized in the "SOB" table (Sensible, Odd, Bizarre), or more formally:

| Primal (Maximize) | Dual (Minimize) |
| :--- | :--- |
| **Constraints** | **Variables** |
| $i$-th constraint $\leq b_i$ | $y_i \geq 0$ |
| $i$-th constraint $\geq b_i$ | $y_i \leq 0$ |
| $i$-th constraint $= b_i$ | $y_i$ free (unrestricted) |
| **Variables** | **Constraints** |
| $x_j \geq 0$ | $j$-th constraint $\geq c_j$ |
| $x_j \leq 0$ | $j$-th constraint $\leq c_j$ |
| $x_j$ free | $j$-th constraint $= c_j$ |

### Mnemonic

A "Sensible" constraint (inequality matching the optimization direction, e.g., $\leq$ for max) corresponds to a "Sensible" variable ($\geq 0$).
An "Odd" constraint (equality) corresponds to an "Odd" variable (free).
A "Bizarre" constraint (inequality opposing direction) corresponds to a "Bizarre" variable (flipped sign).

## Example Derivation

Let's find the dual of:

$$
\begin{align}
\text{Minimize} \quad & 2x_1 + 15x_2 + 5x_3 \\
\text{Subject to} \quad & x_1 + x_2 + x_3 \geq 1 \\
& x_1 - 2x_2 \leq 3 \\
& 2x_1 + x_3 = 5 \\
& x_1 \geq 0, x_2 \geq 0, x_3 \text{ free}
\end{align}
$$

### Step 1: Standardize (Optional but helpful)
We can convert everything to canonical form, but using the table is faster.

### Step 2: Apply Rules
Since Primal is **Minimize**:
- Objective coefficients $c = [2, 15, 5]^T$ become Dual RHS.
- RHS $b = [1, 3, 5]^T$ become Dual Objective coefficients (Maximize).
- Matrix $A$:
  $$A = \begin{bmatrix}
  1 & 1 & 1 \\
  1 & -2 & 0 \\
  2 & 0 & 1
  \end{bmatrix}$$ 

**Dual Variables:**
- Constraint 1 ($\geq 1$): This is "Sensible" for minimization (we want to stay above a floor). Wait, actually for minimization, standard is $\geq$. So $y_1 \geq 0$.
- Constraint 2 ($\leq 3$): This is "Bizarre" for minimization. So $y_2 \leq 0$.
- Constraint 3 ($= 5$): This is "Odd". So $y_3$ is free.

**Dual Constraints:**
- Variable 1 ($x_1 \geq 0$): Sensible. Dual constraint $\leq c_1 = 2$.
  Row 1 of $A^T$: $1y_1 + 1y_2 + 2y_3 \leq 2$.
- Variable 2 ($x_2 \geq 0$): Sensible. Dual constraint $\leq c_2 = 15$.
  Row 2 of $A^T$: $1y_1 - 2y_2 + 0y_3 \leq 15$.
- Variable 3 ($x_3$ free): Odd. Dual constraint $= c_3 = 5$.
  Row 3 of $A^T$: $1y_1 + 0y_2 + 1y_3 = 5$.

**The Dual:**

$$
\begin{align}
\text{Maximize} \quad & y_1 + 3y_2 + 5y_3 \\
\text{Subject to} \quad & y_1 + y_2 + 2y_3 \leq 2 \\
& y_1 - 2y_2 \leq 15 \\
& y_1 + y_3 = 5 \\
& y_1 \geq 0, y_2 \leq 0, y_3 \text{ free}
\end{align}
$$

## Symmetry of Duality

A fundamental property is that the dual of the dual is the primal.

Let's verify.
Dual (D): Maximize $b^T y$ subject to $A^T y \leq c$ (for standard min problem).
To take dual of (D), first rewrite as minimization:
Minimize $-b^T y$ subject to $-A^T y \geq -c$.
The dual of this is:
Maximize $-c^T x$ subject to $(-A^T)^T x \leq -b \implies -A x \leq -b \implies Ax \geq b$.
Which is equivalent to Minimize $c^T x$ subject to $Ax \geq b$.

## Why is this important?

1.  **Computational Efficiency**: Sometimes the dual is easier to solve. If the primal has $1,000,000$ constraints and $10$ variables, the dual has $10$ constraints and $1,000,000$ variables. Simplex often performs better with fewer constraints.
2.  **Insight**: Dual variables are **shadow prices**. They tell us the rate of change of the optimal value with respect to changes in the constraint RHS.
3.  **Bounds**: For any feasible $x$ and feasible $y$, $c^T x \geq b^T y$ (for min problem). This allows us to bound the error of approximation algorithms.

## Summary

The dual problem is not just an algebraic manipulation; it is a fundamental geometric and economic counterpart to the primal. Every constraint in the primal leads to a variable in the dual, representing the "cost" or "value" of that constraint.