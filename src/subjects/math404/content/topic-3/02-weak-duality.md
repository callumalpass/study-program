---
title: "Weak Duality"
description: "The fundamental inequality between primal and dual objectives"
---

# Weak Duality

The **Weak Duality Theorem** is the most basic yet incredibly powerful result in duality theory. It establishes a simple bounding relationship between the objective values of the primal and dual problems.

## The Theorem

Consider the standard primal-dual pair:

**Primal (P):**
$$ z_P = \max \{ c^T x \mid Ax \leq b, x \geq 0 \} $$

**Dual (D):**
$$ z_D = \min \{ b^T y \mid A^T y \geq c, y \geq 0 \} $$

**Theorem (Weak Duality):**
If $x$ is any feasible solution to the primal problem and $y$ is any feasible solution to the dual problem, then:
$$ c^T x \leq b^T y $$

In other words, the value of any maximization feasible solution is a lower bound for the value of any minimization feasible solution.

## Proof

The proof is a direct consequence of the feasibility conditions.

Let $x$ be primal feasible and $y$ be dual feasible.
1.  From primal feasibility: $Ax \leq b$ and $x \geq 0$.
2.  From dual feasibility: $A^T y \geq c$ and $y \geq 0$.

We want to compare $c^T x$ and $b^T y$.

Let's look at the inner product $y^T A x$. We can group it two ways:

**Approach 1: Using Primal Constraints**
Since $y \geq 0$ and $Ax \leq b$:
$$ y^T (Ax) \leq y^T b = b^T y $$
(Multiplying an inequality $Ax \leq b$ by a non-negative vector $y$ preserves the inequality).

**Approach 2: Using Dual Constraints**
Since $x \geq 0$ and $A^T y \geq c$ (which implies $y^T A \geq c^T$):
$$ (y^T A) x \geq c^T x $$
(Multiplying an inequality $y^T A \geq c^T$ by a non-negative vector $x$ preserves the inequality).

**Combining them:**
$$ c^T x \leq y^T A x \leq b^T y $$

Thus, $c^T x \leq b^T y$. $\quad \blacksquare$

## Implications

Weak duality has several immediate and profound consequences:

### 1. Bounding Optimal Values
Let $z^*$ be the optimal value of the primal (maximize). Since $z^* = c^T x^*$ for some feasible $x^*$, and weak duality holds for *any* dual feasible $y$:
$$ z^* \leq b^T y \quad \text{for all dual feasible } y $$
This means that **any feasible solution to the dual provides an upper bound** on the optimal primal profit.

Similarly, let $w^*$ be the optimal value of the dual (minimize).
$$ c^T x \leq w^* \quad \text{for all primal feasible } x $$
**Any feasible solution to the primal provides a lower bound** on the optimal dual cost.

### 2. Certificate of Optimality
**Corollary:** If we find a primal feasible $x$ and a dual feasible $y$ such that their objective values are equal ($c^T x = b^T y$), then $x$ is optimal for the primal and $y$ is optimal for the dual.

**Proof:**
For any other primal feasible $x'$, weak duality says $c^T x' \leq b^T y$.
Since $b^T y = c^T x$, we have $c^T x' \leq c^T x$. Thus, $x$ maximizes the primal.
Similarly, for any other dual feasible $y'$, $c^T x \leq b^T y'$.
Since $c^T x = b^T y$, we have $b^T y \leq b^T y'$. Thus, $y$ minimizes the dual.

This is incredibly useful! We don't need to search the entire space to prove optimality; we just need to produce a matching witness.

### 3. Infeasibility
**Corollary:**
- If the primal is unbounded (max $\to \infty$), then the dual must be infeasible.
  - *Reason:* If dual had a feasible solution $y$, then $b^T y$ would be a finite upper bound on the primal. If primal goes to infinity, no such bound exists.
- If the dual is unbounded (min $\to -\infty$), then the primal must be infeasible.

*Note:* The converse is not necessarily true. Both primal and dual can be infeasible.

## Duality Gap

The difference between the primal and dual objective values for feasible vectors $x$ and $y$ is called the **duality gap**:
$$ \text{Gap} = b^T y - c^T x \geq 0 $$

Weak duality says the gap is always non-negative. Finding the optimal solution corresponds to driving this gap to zero (which leads us to Strong Duality).

## Geometric Interpretation

Imagine the real number line.
- The set of all possible primal values $\{ c^T x \mid x \in P \}$ sits on the left.
- The set of all possible dual values $\{ b^T y \mid y \in D \}$ sits on the right.
- Weak duality guarantees that these two sets never "cross over." The entire primal set is to the left of the entire dual set.

$$ [ \dots \text{Primal Values} \dots ] \quad \leq \quad [ \dots \text{Dual Values} \dots ] $$

The best primal value (max) is the rightmost edge of the left set.
The best dual value (min) is the leftmost edge of the right set.
They meet in the middle (which is the Strong Duality Theorem).

## Example

**Primal (Max):**
$$ \max x_1 + x_2 $$
$$ 2x_1 + x_2 \leq 4 $$
$$ x_1 + 2x_2 \leq 4 $$
$$ x \geq 0 $$

Primal feasible point: $x = (1, 1)$.
Value: $1 + 1 = 2$.

**Dual (Min):**
$$ \min 4y_1 + 4y_2 $$
$$ 2y_1 + y_2 \geq 1 $$
$$ y_1 + 2y_2 \geq 1 $$
$$ y \geq 0 $$

Dual feasible point: $y = (1, 1)$.
Value: $4(1) + 4(1) = 8$.

Is $2 \leq 8$? Yes. Weak duality holds.
The duality gap is $8 - 2 = 6$.

Let's try better points.
Primal: $x = (4/3, 4/3)$. Value $= 8/3 \approx 2.66$.
Dual: $y = (1/3, 1/3)$. Value $= 4(1/3) + 4(1/3) = 8/3 \approx 2.66$.

Gap is 0. Optimality achieved.