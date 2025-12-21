---
title: "Complementary Slackness"
description: "The relationship between primal and dual variables at optimality"
---

# Complementary Slackness

Complementary Slackness is a powerful condition that characterizes the relationship between optimal primal and dual solutions. It provides a mechanism to check for optimality and to construct a dual optimal solution from a primal one (and vice versa).

## The Condition

**Theorem (Complementary Slackness):**
Let $x$ be a feasible solution to the primal (Max $c^T x$ s.t. $Ax 
leq b, x 
geq 0$) and $y$ be a feasible solution to the dual (Min $b^T y$ s.t. $A^T y 
geq c, y 
geq 0$).

Then $x$ and $y$ are optimal if and only if:

1.  **Primal Complementary Slackness:** For each constraint $i=1,\dots,m$:
    $$ y_i (b_i - \sum_{j=1}^n a_{ij} x_j) = 0 $$
    *In words: Either the dual variable is zero, or the primal constraint is tight (slack is zero).*

2.  **Dual Complementary Slackness:** For each variable $j=1,\dots,n$:
    $$ x_j (\sum_{i=1}^m a_{ij} y_i - c_j) = 0 $$
    *In words: Either the primal variable is zero, or the dual constraint is tight (surplus is zero).*

## Derivation

Recall the proof of Weak Duality:
$$ c^T x = \sum x_j c_j \leq \sum x_j (A^T y)_j = y^T A x = \sum y_i (Ax)_i \leq \sum y_i b_i = b^T y $$

For Strong Duality to hold ($c^T x = b^T y$), all inequalities in this chain must be equalities.

1.  **First Inequality becomes Equality:**
    $$ \sum_{j=1}^n x_j c_j = \sum_{j=1}^n x_j (A^T y)_j $$
    $$ \implies \sum_{j=1}^n x_j ((A^T y)_j - c_j) = 0 $$
    Since $x_j \geq 0$ and $(A^T y)_j - c_j \geq 0$ (dual feasibility), every term in the sum must be non-negative. For the sum to be zero, **every individual term must be zero**.
    $$ x_j > 0 \implies (A^T y)_j = c_j $$

2.  **Second Inequality becomes Equality:**
    $$ \sum_{i=1}^m y_i (Ax)_i = \sum_{i=1}^m y_i b_i $$
    $$ \implies \sum_{i=1}^m y_i (b_i - (Ax)_i) = 0 $$
    Since $y_i \geq 0$ and $b_i - (Ax)_i \geq 0$ (primal feasibility), every term must be zero.
    $$ y_i > 0 \implies (Ax)_i = b_i $$

## Logic Summary

The condition can be summarized as:

- **Constraint not binding (Slack > 0) $\implies$ Shadow price is zero.**
  If you have leftover resource (e.g., leftover wood), the marginal value of having more of it is zero.
- **Shadow price positive (Price > 0) $\implies$ Constraint binding (Slack = 0).**
  If a resource is valuable, you must be using all of it.
- **Variable positive ($x > 0$) $\implies$ Reduced cost is zero.**
  If you are producing a product, its marginal cost must equal its marginal revenue (at optimality).
- **Reduced cost non-zero $\implies$ Variable is zero.**
  If a product is unprofitable (marginal cost > marginal revenue), you shouldn't produce it.

## Application: Solving LPs

We can use CS to solve LPs without running Simplex if we have a guess about the optimal structure.

**Example:**
Max $z = 3x_1 + 2x_2$
s.t.
1. $2x_1 + x_2 \leq 100$
2. $x_1 + x_2 \leq 80$
3. $x_1 \leq 40$
$x \geq 0$

**Guess:** Suppose we guess that constraint 1 and 2 are active (binding).
$$ 2x_1 + x_2 = 100 $$
$$ x_1 + x_2 = 80 $$
Subtracting (2) from (1): $x_1 = 20$.
Then $x_2 = 60$.
Check constraint 3: $20 \leq 40$ (OK).
Primal feasible guess: $x = (20, 60)$.

Is this optimal? Let's try to construct a dual solution $y$.
Since primal constraints 1 and 2 are active, $y_1$ and $y_2$ can be non-zero.
Since primal constraint 3 is NOT active ($20 < 40$), CS implies **$y_3 = 0$**.

Since $x_1 = 20 > 0$, dual constraint 1 must be tight:
$$ 2y_1 + 1y_2 + 1y_3 = 3 $$
Since $x_2 = 60 > 0$, dual constraint 2 must be tight:
$$ 1y_1 + 1y_2 + 0y_3 = 2 $$

Substituting $y_3 = 0$:
$$ 2y_1 + y_2 = 3 $$
$$ y_1 + y_2 = 2 $$

Subtracting: $y_1 = 1$.
Then $y_2 = 1$.

So dual solution candidate: $y = (1, 1, 0)$.
Is it feasible?
$y \geq 0$? Yes.
Constraints:
1. $2(1) + 1(1) + 1(0) = 3 \geq 3$ (Tight, OK)
2. $1(1) + 1(1) + 0(0) = 2 \geq 2$ (Tight, OK)

Since we found a primal feasible $x$ and dual feasible $y$ satisfying CS, **$x=(20,60)$ is indeed optimal**.

## Strict Complementarity

Often, exactly one of $x_j$ and dual slack $s_j$ is positive.
$x_j + s_j > 0$.
This is called **strict complementarity**.
However, it is possible (in "degenerate" cases) for both to be zero.
$x_j = 0$ and slack $= 0$.
CS simply requires that they cannot **both be non-zero**.

## Summary Table

| Primal Status | Dual Status |
| :--- | :--- |
| Basic (Active) variable ($x_j > 0$) | Dual constraint binding (Reduced cost = 0) |
| Non-basic variable ($x_j = 0$) | Dual constraint non-binding (Reduced cost $\neq 0$)* |
| Binding constraint (Slack = 0) | Dual variable basic ($y_i > 0$)* |
| Non-binding constraint (Slack > 0) | Dual variable zero ($y_i = 0$) |

*Note: In degenerate cases, both can be zero.