---
title: "Dual Simplex Method"
description: "Solving LPs via the dual simplex algorithm"
---

# Dual Simplex Method

The **Dual Simplex Method** is an algorithm that solves the primal linear program by maintaining **dual feasibility** and complementary slackness while working to achieve **primal feasibility**.

This is the exact opposite of the Standard (Primal) Simplex Method, which maintains primal feasibility and works towards dual feasibility (optimality).

## Comparison

| Feature | Primal Simplex | Dual Simplex |
| :--- | :--- | :--- |
| **Start** | Primal feasible basis (RHS $\geq 0$) | Dual feasible basis (Reduced costs $\leq 0$ for max) |
| **Invariant** | Maintains Primal Feasibility | Maintains Dual Feasibility (Optimality condition) |
| **Goal** | Achieve Dual Feasibility (Optimality) | Achieve Primal Feasibility ($b \geq 0$) |
| **Pivot** | Improves objective (increases max) | Improves objective (decreases dual min / decreases primal max) |
| **Leaving** | Determined by ratio test (feasibility) | Determined by pivot row (most negative RHS) |
| **Entering** | Determined by reduced cost (optimality) | Determined by dual ratio test |

## When to use Dual Simplex?

The Dual Simplex method is extremely powerful in specific scenarios:

1.  **Re-optimization**: If you solve an LP and then add a new constraint that cuts off the optimal solution, the current basis becomes primal infeasible but remains dual feasible (optimal coefficients don't change). Dual Simplex can restore optimality in a few steps, whereas Primal Simplex would need to restart or use Big-M.
2.  **Sensitivity Analysis**: When checking changes to the RHS vector $b$.
3.  **Integer Programming**: In Branch-and-Bound, we essentially keep adding constraints (cuts). Dual Simplex is the standard engine for IP solvers.

## The Algorithm

Assume we have a tableau where:
- Reduced costs are non-positive (for max problem): $\bar{c}_j \leq 0$. (Dual Feasible)
- Some RHS values are negative: $\bar{b}_i < 0$. (Primal Infeasible)

**Step 1: Leaving Variable Selection**
Choose a basic variable with a negative value to leave the basis.
Typically, choose the most negative $\bar{b}_i$.
Let the row index be $r$.
$$ \bar{b}_r = \min_i \{ \bar{b}_i \} < 0 $$

**Step 2: Entering Variable Selection**
We need to pivot in a column that maintains dual feasibility ($\\bar{c}_j \leq 0$).
Look at the row $r$. We only care about columns where $a_{rj} < 0$ (otherwise pivoting won't fix the negative RHS).
Compute ratios:
$$ \theta = \min_{j: a_{rj} < 0} \left| \frac{\\bar{c}_j}{a_{rj}} \right| $$
Choose the column $s$ that minimizes this ratio. This ensures that after pivoting, the new reduced costs stay non-positive.

**Step 3: Pivot**
Perform a standard Gaussian elimination pivot on element $a_{rs}$.
- New basis variable at row $r$ becomes $x_s$.
- $\bar{b}_r$ becomes positive.

**Step 4: Repeat**
Repeat until all $\\bar{b}_i \geq 0$ (Optimal) or we detect dual unboundedness (Primal infeasible).

## Example

**Maximize** $z = -2x_1 - 3x_2$
**s.t.**
$x_1 + x_2 \geq 2 \implies -x_1 - x_2 \leq -2$
$x \geq 0$

Add slack $s_1$: $-x_1 - x_2 + s_1 = -2$.
Basis: {s_1}.
Solution: $s_1 = -2$ (Infeasible). $z = 0$.
Reduced costs: $c_1 = -2, c_2 = -3$ (All $\leq 0$, so Dual Feasible).

**Iteration 1:**
1.  **Leaving:** $s_1$ (value -2). Row 1 is pivot row.
2.  **Entering:** Look at Row 1 coefficients: [-1, -1]. Both negative.
Ratios:
    - $x_1: |-2 / -1| = 2$
    - $x_2: |-3 / -1| = 3$
    Min ratio is 2. Variable $x_1$ enters.
3.  **Pivot:** Pivot on element (-1) in col $x_1$, row 1.
    New row 1: divide by -1 $\to$ $x_1 + x_2 - s_1 = 2$.
    Eliminate $x_1$ from objective:
    Old obj: $z + 2x_1 + 3x_2 = 0$.
    New obj: $(z + 2x_1 + 3x_2) - 2(x_1 + x_2 - s_1 - 2) = 0$
    $z + x_2 + 2s_1 = -4 \implies z = -4 - x_2 - 2s_1$.

**Status:**
Basis {x_1}.
$x_1 = 2$. $x_2 = 0, s_1 = 0$.
Primal Feasible? Yes ($x_1 \geq 0$).
Dual Feasible? Yes (coeffs -1, -2 are $\leq 0$).

**Optimal found.**
Value $z = -4$. Point (2, 0).

## Why it works

The ratio test in Dual Simplex is derived to keep $\\bar{c}_j \leq 0$.
New $\\bar{c}_j' = \bar{c}_j - \frac{\\bar{c}_s}{a_{rs}} a_{rj}$.
If we chose $s$ correctly, this update will never make $\\bar{c}_j'$ positive.

## Summary

Dual Simplex is a specialized tool. You wouldn't use it to start a cold problem (getting a dual feasible basis is hard). But for repairing infeasibility in an already optimized tableau, it is unbeatable.