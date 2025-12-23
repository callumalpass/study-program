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

## Detailed Example: Optimal Wire Sizing

**Problem:** Design the wire widths in an electronic circuit to minimize total area subject to timing and current density constraints.

**Variables:** Wire widths $w_1, \ldots, w_n > 0$.

**Constraints:**
1. **Timing (delay):** The delay through wire $i$ is proportional to $RC$, where resistance $R_i \propto 1/w_i$ and capacitance $C_i \propto w_i$. Total delay:
   $$ D = \sum_{i} \frac{\alpha_i}{w_i} + \beta_i w_i $$

   We require $D \leq D_{max}$.

2. **Current density:** Current density $J_i = I_i / w_i$ must satisfy $J_i \leq J_{max}$, so:
   $$ \frac{I_i}{w_i} \leq J_{max} \implies w_i \geq \frac{I_i}{J_{max}} $$

3. **Area:** Total wire area is $A = \sum_i L_i w_i$, where $L_i$ is the length of wire $i$.

**Formulation:**
$$
\begin{align}
\min \quad & \sum_i L_i w_i \\
\text{s.t.} \quad & \sum_i \left( \frac{\alpha_i}{w_i} + \beta_i w_i \right) \leq D_{max} \\
& w_i \geq \frac{I_i}{J_{max}}, \quad i = 1, \ldots, n
\end{align}
$$

**Analysis:**
- Objective $\sum L_i w_i$ is a posynomial (sum of monomials $L_i w_i^1$).
- Delay constraint: $\sum (\alpha_i w_i^{-1} + \beta_i w_i) \leq D_{max}$ is a posynomial $\leq$ constant. Rewrite as:
  $$ \frac{1}{D_{max}} \sum (\alpha_i w_i^{-1} + \beta_i w_i) \leq 1 $$
  This is a posynomial $\leq 1$ (GP form).

- Current density: $w_i \geq I_i / J_{max}$ can be written as:
  $$ w_i^{-1} \leq J_{max} / I_i \implies (J_{max}/I_i)^{-1} w_i^{-1} \leq 1 $$
  This is a monomial $\leq 1$ (GP form).

**Conclusion:** This is a Geometric Program. Transform to convex form via $y_i = \log w_i$ and solve.

## Proof: Posynomial Transformation is Convex

**Claim:** The log-sum-exp function $f(y) = \log \sum_k e^{a_k^T y + b_k}$ is convex.

**Proof:**
Let $g_k(y) = e^{a_k^T y + b_k}$. Each $g_k$ is convex (composition of convex exponential with affine function).

The sum $\sum_k g_k(y)$ is convex (sum of convex functions).

The function $h(z) = \log z$ is concave and increasing on $z > 0$.

However, the composition $h \circ g$ where $h$ is concave and $g$ is convex is **not** generally convex.

**Alternative Proof (Hessian):**
For $f(y) = \log \sum_k e^{a_k^T y + b_k}$, compute the Hessian.

Let $z = \sum_k e^{a_k^T y + b_k}$ and $p_k = e^{a_k^T y + b_k} / z$ (like probabilities, $\sum p_k = 1$).

Then:
$$ \nabla f = \frac{1}{z} \sum_k a_k e^{a_k^T y + b_k} = \sum_k p_k a_k = \mathbb{E}[a_k] $$

The Hessian is:
$$ \nabla^2 f = \sum_k p_k a_k a_k^T - \left( \sum_k p_k a_k \right) \left( \sum_k p_k a_k \right)^T = \mathbb{E}[a_k a_k^T] - \mathbb{E}[a_k] \mathbb{E}[a_k]^T $$

This is the **covariance matrix** of the vectors $a_k$ under distribution $p_k$, which is positive semidefinite.

Thus, $\nabla^2 f \succeq 0$, so $f$ is convex. $\blacksquare$

## Geometric vs Arithmetic Mean

GPs are closely related to the geometric mean inequality.

**Arithmetic-Geometric Mean Inequality:**
$$ \sqrt[n]{x_1 \cdots x_n} \leq \frac{x_1 + \cdots + x_n}{n} $$

with equality iff all $x_i$ are equal.

**Connection to GP:**
Minimizing a sum of positive terms (posynomial) while constraining a product (monomial) leverages this inequality.

**Example:** Minimize $x + y$ subject to $xy \geq 1$, $x, y > 0$.

By AM-GM: $\frac{x + y}{2} \geq \sqrt{xy} \geq 1$, so $x + y \geq 2$.

Equality when $x = y = 1$.

**GP Formulation:**
$$
\begin{align}
\min \quad & x + y \\
\text{s.t.} \quad & xy \geq 1, \quad x, y > 0
\end{align}
$$

Rewrite constraint: $xy \geq 1 \iff (xy)^{-1} \leq 1 \iff x^{-1} y^{-1} \leq 1$ (monomial $\leq 1$).

Objective $x + y$ is a posynomial.

This is a GP. After log transformation and solving, we get $x^* = y^* = 1$, confirming the AM-GM result.

## Handling Equality Constraints

**Key Rule:** GP allows monomial equality constraints but **not** posynomial equality constraints.

**Why?** The set $\{x : h(x) = 1\}$ where $h$ is a monomial is convex (actually, a hyperplane in log-space). But the set $\{x : f(x) = 1\}$ where $f$ is a posynomial is not convex.

**Example:**
- Monomial equality: $x_1 x_2^{-1} = 2 \iff \log x_1 - \log x_2 = \log 2$ (affine in $y = \log x$, so convex).
- Posynomial equality: $x_1 + x_2 = 1 \iff \log(x_1 + x_2) = 0$. The set $\{x : x_1 + x_2 = 1, x > 0\}$ is a line segment in the positive orthant, but $\log(x_1 + x_2)$ is convex, not affine. Setting a convex function equal to a constant doesn't define a convex set.

**Workaround:** If you must have $f(x) = c$ where $f$ is a posynomial, replace with two inequalities:
$$ f(x) \leq c \quad \text{and} \quad f(x) \geq c $$

The first is GP-compatible. The second is **not** (it's a concave constraint). This breaks convexity, but you can try relaxation or penalty methods.

## Extended Example: Power Control in Wireless Networks

**Problem:** $n$ transmitters communicate with $n$ receivers. Transmitter $i$ uses power $p_i > 0$. The signal-to-interference-plus-noise ratio (SINR) at receiver $i$ is:
$$ \text{SINR}_i = \frac{G_{ii} p_i}{\sum_{j \neq i} G_{ij} p_j + \sigma_i^2} $$

where $G_{ij}$ is the channel gain from transmitter $j$ to receiver $i$, and $\sigma_i^2$ is the noise power.

**Goal:** Minimize total power $\sum p_i$ subject to SINR constraints $\text{SINR}_i \geq \gamma_i$ (target SINR).

**SINR Constraint:**
$$ \frac{G_{ii} p_i}{\sum_{j \neq i} G_{ij} p_j + \sigma_i^2} \geq \gamma_i $$
$$ G_{ii} p_i \geq \gamma_i \left( \sum_{j \neq i} G_{ij} p_j + \sigma_i^2 \right) $$
$$ G_{ii} p_i \geq \gamma_i \sum_{j \neq i} G_{ij} p_j + \gamma_i \sigma_i^2 $$

Rearrange:
$$ \sum_{j \neq i} \frac{\gamma_i G_{ij}}{G_{ii}} p_j + \frac{\gamma_i \sigma_i^2}{G_{ii} p_i} \leq 1 $$

This is a posynomial inequality! (Sum of terms $p_j$ and $p_i^{-1}$, all with positive coefficients).

**GP Formulation:**
$$
\begin{align}
\min \quad & \sum_i p_i \\
\text{s.t.} \quad & \sum_{j \neq i} \frac{\gamma_i G_{ij}}{G_{ii}} p_j + \frac{\gamma_i \sigma_i^2}{G_{ii}} p_i^{-1} \leq 1, \quad i = 1, \ldots, n
\end{align}
$$

This is a GP. Solve via log transformation to find the optimal power allocation.

**Result:** GP provides the globally optimal power allocation, minimizing energy consumption while meeting quality-of-service requirements.

## Signomial Programming (Non-Convex)

If coefficients in the posynomial can be negative, we have a **signomial**:
$$ f(x) = \sum_k c_k x_1^{a_{1k}} \cdots x_n^{a_{nk}} \quad \text{where } c_k \in \mathbb{R} $$

**Problem:** Signomials are **not convex** after log transformation. The problem becomes non-convex.

**Example:** $f(x, y) = x + y - xy$ (with $x, y > 0$).

After transformation $x = e^u$, $y = e^v$:
$$ f(e^u, e^v) = e^u + e^v - e^{u+v} $$
$$ \log f = \log(e^u + e^v - e^{u+v}) $$

The log-sum-exp of terms with **positive** coefficients is convex. But subtracting a term (negative coefficient) breaks convexity.

**Approaches:**
1. **Successive Approximation:** Linearize signomial terms around a current point, creating a sequence of GPs.
2. **Heuristics:** Use local optimization (no global guarantees).
3. **Reformulation:** Try to eliminate negative terms via substitution or constraint relaxation.

## Visualizing Posynomials

```plot
{
  "title": "Monomial vs Posynomial",
  "x_label": "x",
  "y_label": "f(x)",
  "functions": [
    {
      "fn": "x^2",
      "label": "Monomial: x²",
      "color": "blue"
    },
    {
      "fn": "x^2 + 2*x + 1",
      "label": "Posynomial: x² + 2x + 1",
      "color": "red"
    }
  ],
  "x_range": [0.1, 3]
}
```

Monomials are smooth power functions. Posynomials are sums of monomials, creating more complex shapes but remaining convex in log-space.

## Common Mistakes

**Mistake 1: Negative Coefficients**
If your model has $x - y$, that's a signomial (not GP). Check if you can reformulate.

**Mistake 2: Posynomial Equality**
Constraint $f(x) = 1$ where $f$ is a posynomial is not allowed (non-convex set). Only monomial equalities are permitted.

**Mistake 3: Forgetting Domain**
GPs require $x > 0$ (strictly positive). Variables that can be zero or negative need special handling (e.g., shift variables or use different formulation).

**Mistake 4: Non-Positive Objective**
Minimizing a posynomial is GP. Maximizing a posynomial is non-convex. If you need to maximize, take reciprocal: $\max f(x) \equiv \min 1/f(x)$ (if $f$ is a monomial, $1/f$ is a monomial).

## Computational Considerations

**Transformation Complexity:** Converting to convex form is trivial (just substitute $y = \log x$). The computational cost is dominated by solving the resulting convex problem.

**Solver Performance:** GP solvers (CVX with GP mode, CVXPY, GPKIT) are highly optimized. They exploit the special structure of log-sum-exp functions for efficiency.

**Scale:** GPs can handle problems with thousands of variables and constraints, similar to general convex programs.

**Warm Starting:** If solving a sequence of related GPs (e.g., parameter sweep), warm starting can significantly speed up solutions.

## Practical Modeling Tips

1. **Check Units:** In engineering, dimensional analysis helps verify if a term is a valid monomial (exponents must balance dimensions).

2. **Start Simple:** Test your formulation on a small instance with 2-3 variables to verify correctness.

3. **Use Disciplined GP:** Modeling languages like CVXPY enforce GP rules, catching errors at the modeling stage.

4. **Exploit Sparsity:** If your posynomials have few terms, solvers can exploit this for speed.

5. **Sensitivity Analysis:** After solving, check how the optimal solution changes with parameters (often reveals design trade-offs).

## Key Takeaways

1. **Definition:** GP minimizes posynomials subject to posynomial inequalities and monomial equalities, with $x > 0$.

2. **Convexification:** GP becomes convex via the substitution $y = \log x$, transforming posynomials into log-sum-exp functions.

3. **Monomials:** Products of power functions $x_1^{a_1} \cdots x_n^{a_n}$ with $a_i \in \mathbb{R}$ (exponents can be negative or fractional).

4. **Posynomials:** Sums of monomials with positive coefficients.

5. **Applications:** Circuit design (wire sizing, gate sizing), power control (wireless networks), structural optimization, optics (lens design).

6. **Limitations:** Cannot handle negative coefficients (signomials), posynomial equality constraints, or variables that can be zero/negative.

7. **Tools:** CVXPY (Python), CVX (MATLAB), GPKIT (Python for engineering), MOSEK (commercial solver with GP support).

8. **Recognition:** If you see products, ratios, and powers with positive coefficients, check if it's a GP. The log trick can make it globally solvable.