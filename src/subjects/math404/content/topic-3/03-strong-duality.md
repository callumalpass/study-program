---
title: "Strong Duality"
description: "Equality of primal and dual optimal values"
---

# Strong Duality

While Weak Duality states that the primal optimal value is less than or equal to the dual optimal value ($z^* \leq w^*$), **Strong Duality** asserts that for linear programs, they are exactly equal ($z^* = w^*$), provided an optimal solution exists.

This is a deep and non-trivial result. Unlike weak duality, which is a one-line proof based on algebra, strong duality requires the geometry of convex sets or separating hyperplanes.

## The Strong Duality Theorem

**Theorem:** Consider the primal linear program (P) and its dual (D).
1.  If (P) has an optimal solution $x^*$, then (D) has an optimal solution $y^*$ such that:
    $$ c^T x^* = b^T y^* $$
2.  In general, exactly one of the following possibilities occurs:
    *   **Optimal:** Both (P) and (D) are feasible, have optimal solutions, and their optimal values are equal.
    *   **Infeasible/Unbounded:** (P) is unbounded $\implies$ (D) is infeasible.
    *   **Unbounded/Infeasible:** (D) is unbounded $\implies$ (P) is infeasible.
    *   **Infeasible/Infeasible:** Both (P) and (D) are infeasible.

## Intuition

Recall the geometric interpretation of Weak Duality where the primal values are to the left of the dual values. Strong duality says that there is **no gap** between the best primal and the best dual value. They touch exactly at the optimum.

## Proof Sketch (Simplex Method Argument)

The constructive proof uses the Simplex Method.

1.  Assume the Primal has an optimal solution. We solve it using the Simplex Method.
2.  The method terminates with an optimal basis $B$.
3.  The optimal primal solution is $x_B = B^{-1}b \geq 0$, $x_N = 0$.
4.  The optimality condition (reduced costs) for the Simplex method is:
    $$ c^T - c_B^T B^{-1} A \leq 0 $$
    (assuming maximization).
5.  Let's define a vector $y^* = (c_B^T B^{-1})^T$.
6.  The optimality condition becomes $c^T - y^{*T} A \leq 0 \iff A^T y^* \geq c$.
    This means $y^*$ is **dual feasible**.
7.  What is the value of the dual objective at $y^*$?
    $$ b^T y^* = y^{*T} b = c_B^T B^{-1} b = c_B^T x_B = c^T x^* $$
8.  So we found a dual feasible vector $y^*$ whose objective value equals the primal optimal value.
9.  By the Weak Duality corollary, $y^*$ must be the dual optimal solution.

$\blacksquare$

## Proof Sketch (Geometric/Farkas Argument)

A more general proof that generalizes to convex optimization uses the separating hyperplane theorem.

1.  Define a set of reachable values in $(Ax, c^T x)$ space.
2.  Show that the optimal value is on the boundary of this set.
3.  Use a supporting hyperplane to separate the feasible set from the "better" values.
4.  The normal vector to this hyperplane corresponds to the dual variables.
5.  The fact that the hyperplane supports the set implies the strong duality equality.

## Why is Strong Duality Important?

### 1. Verification
If I give you a solution to a massive LP and claim it's optimal, you generally have to trust my algorithm. But if I give you a primal solution $x$ and a dual solution $y$ and you verify that:
1.  $Ax \leq b, x \geq 0$ (Primal Feasible)
2.  $A^T y \geq c, y \geq 0$ (Dual Feasible)
3.  $c^T x = b^T y$ (Zero Gap)

Then you have mathematical **proof** that $x$ is optimal, without running any algorithm yourself.

### 2. Sensitivity Analysis
The dual variables $y^*$ derived from the strong duality proof ($y^* = (B^{-1})^T c_B$) reveal how the optimal value $z^*$ changes as $b$ changes.
$$ z^*(b) = c_B^T B^{-1} b = (y^*)^T b $$
If we change $b_i$ by a small amount $\Delta$, the profit changes by roughly $y^*_i \Delta$.
This is why dual variables are called **shadow prices**.

### 3. Reformulation
Strong duality allows us to convert a "min-max" problem into a pure minimization or maximization problem.
Example: $\min_x \max_y f(x, y)$
If the inner maximization is an LP, we can replace it with its dual minimization, turning the problem into $\min_x \min_{y'} g(x, y')$, which is just $\min_{x, y'} g(x, y')$.

## Convex Optimization

For general convex optimization (not just linear), strong duality holds under mild conditions called **constraint qualifications** (e.g., Slater's condition).

- **Linear Programming:** Strong duality always holds (unless both infeasible).
- **Convex Programming:** Strong duality usually holds (requires Slater's condition).
- **Non-convex Programming:** Strong duality rarely holds (duality gap $> 0$).

## Example

**Primal:** $\max x$ s.t. $x \leq 1$.
- Opt: $x^* = 1$, Value = 1.

**Dual:** $\min y$ s.t. $y \geq 1, y \geq 0$.
- Opt: $y^* = 1$, Value = 1.

Values match. Strong duality holds.