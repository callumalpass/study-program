---
title: "Geometric Programming"
description: "Optimization of posynomials via log-transformation"
---

# Geometric Programming (GP)

Geometric Programming is a fascinating class of optimization problems that are not convex in their natural form, but can be **transformed** into convex problems via a change of variables (logarithms). They arise frequently in engineering design (circuits, structures) and power control.

## Monomials and Posynomials

Let $x_1, \dots, x_n$ be positive variables ($x > 0$). 

1.  **Monomial:** A function of the form:
    $$ f(x) = c x_1^{a_1} x_2^{a_2} \dots x_n^{a_n} $$
    where $c > 0$ and $a_i \in \mathbb{R}$.
    (Note: exponents can be negative or fractional).

2.  **Posynomial:** A sum of monomials:
    $$ f(x) = \sum_{k=1}^K c_k x_1^{a_{1k}} \dots x_n^{a_{nk}} $$
    where $c_k > 0$.

## Definition

A **Geometric Program (GP)** is an optimization problem of the form:

$$ \begin{align} \min \quad & f_0(x) \\ \text{s.t.} \quad & f_i(x) \leq 1, \quad i = 1, \ldots, m \\ & h_j(x) = 1, \quad j = 1, \ldots, p \end{align} $$

where:
- $f_0, \dots, f_m$ are **posynomials**.
- $h_1, \dots, h_p$ are **monomials**.
- $x > 0$.

**Notes:**
- The constraints must be $\leq 1$ (or bounded by another posynomial).
- Equality constraints can only involve monomials (not posynomials).
- This form looks non-convex (e.g., $x^{-1} \leq 1$ is $x \geq 1$, which is convex, but $x^2 \leq 1$ is convex, while $x^{0.5} \leq 1$ is convex. But generally posynomials are not convex functions).

## Convex Transformation

We use the substitution $y_i = \log x_i$ (so $x_i = e^{y_i}$).
Also take the log of the objective and constraints.

**Monomial Transformation:**
$$ f(x) = c \prod x_i^{a_i} \implies \log f(e^y) = \log c + \sum a_i y_i $$
This is an **affine function** of $y$.

**Posynomial Transformation:**
$$ f(x) = \sum c_k \prod x_i^{a_{ik}} \implies \log f(e^y) = \log \left( \sum c_k \exp(\sum a_{ik} y_i) \right) $$
This is the **Log-Sum-Exp** function of affine functions.
Since LSE is convex and composition with affine preserves convexity, **the transformed posynomial is convex**.

**Transformed GP:**
$$ \begin{align} \min \quad & \log f_0(e^y) \\ \text{s.t.} \quad & \log f_i(e^y) \leq 0, \quad i = 1, \ldots, m \\ & \log h_j(e^y) = 0, \quad j = 1, \ldots, p \end{align} $$

- Objective: Convex (LSE form).
- Inequality: Convex $\leq 0$.
- Equality: Affine $= 0$.

This is a valid **Convex Optimization Problem**. We can solve it efficiently and then transform back ($x = e^y$). 

## Example: Box Volume Design

Maximize volume of a box $h, w, d$ subject to:
- Floor area $\leq A_{max}$
- Wall area $\leq W_{max}$
- Ratios $h/w \leq \alpha$

**Formulation:**
$$ \max hwd \implies \min (hwd)^{-1} = h^{-1} w^{-1} d^{-1} $$
Constraints:
1. $wd \leq A_{max} \implies (1/A_{max})wd \leq 1$ (Monomial $\leq 1$)
2. $2hw + 2hd \leq W_{max} \implies (2/W_{max})hw + (2/W_{max})hd \leq 1$ (Posynomial $\leq 1$)
3. $h w^{-1} \leq \alpha \implies \alpha^{-1} h w^{-1} \leq 1$ (Monomial $\leq 1$)

This fits the GP format perfectly.

## Example: Digital Circuit Sizing

Minimize delay of a logic gate chain.
Delay $D$ is typically a posynomial function of the gate sizes $x_i$.
Power $P$ is also a posynomial.
Area $A$ is a posynomial.

Problem: Minimize Delay s.t. Power $\leq P_{max}$, Area $\leq A_{max}$.
This is a GP. We can find the globally optimal transistor sizes.

## Limitations

- **Signomial Programming:** If posynomial coefficients $c_k$ can be negative (difference of posynomials), it's not a GP (not convex).
- **Posynomial Equality:** $f(x) = 1$ where $f$ is a posynomial is not allowed (would require log-sum-exp = 0, which defines a non-convex set).

## Summary

GP is a hidden gem. If you see products, powers, and ratios in your engineering model, check if it's a Geometric Program. The difference between "impossible non-linear problem" and "globally solvable convex problem" is just a log trick.