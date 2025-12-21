---
title: "KKT Examples"
description: "Worked examples of applying KKT conditions"
---

# KKT Examples

Applying KKT conditions analytically usually involves checking combinations of active/inactive constraints.

## Example 1: Water-Filling (Communication Channels)

Problem: Allocate total power $P_{tot}$ across $n$ channels with noise levels $\sigma_i^2$ to maximize capacity.
$$
\begin{align}
\min \quad & - \sum_{i=1}^n \log(1 + x_i/\sigma_i^2) \\
\text{s.t.} \quad & \sum x_i = P_{tot} \\
& x_i \geq 0 \quad (\iff -x_i \leq 0)
\end{align}
$$

**Lagrangian:**
$$ L(x, \lambda, \nu) = - \sum \log(1 + x_i/\sigma_i^2) + \nu (\sum x_i - P_{tot}) - \sum \lambda_i x_i $$

**Stationarity:**
$$ \frac{\partial L}{\partial x_i} = - \frac{1/\sigma_i^2}{1 + x_i/\sigma_i^2} + \nu - \lambda_i = 0 $$
$$ \frac{-1}{\sigma_i^2 + x_i} + \nu - \lambda_i = 0 $$
$$ \nu - \lambda_i = \frac{1}{\sigma_i^2 + x_i} $$

**Complementary Slackness:**
$\lambda_i x_i = 0$ and $\lambda_i \geq 0, x_i \geq 0$.

**Analysis:**
- If $x_i > 0$, then $\lambda_i = 0$.
  $\nu = \frac{1}{\sigma_i^2 + x_i} \implies \sigma_i^2 + x_i = \frac{1}{\nu}$.
  $x_i = \frac{1}{\nu} - \sigma_i^2$.
- If $x_i = 0$, then $\lambda_i \geq 0$.
  $\nu - \lambda_i = \frac{1}{\sigma_i^2} \implies \nu \geq \frac{1}{\sigma_i^2}$.
  $\sigma_i^2 \geq \frac{1}{\nu} \implies \frac{1}{\nu} - \sigma_i^2 \leq 0$.

**Unified Solution:**
$$ x_i = \max \left( 0, \frac{1}{\nu} - \sigma_i^2 \right) $$
The constant $1/\nu$ is the "water level".
We pour water (power) into the channels (vessels) with bottom height $\sigma_i^2$.
If noise $\sigma_i^2$ is high (above water level), allocated power is 0.

Find $\nu$ such that $\sum x_i = P_{tot}$.

## Example 2: Projection onto the Probability Simplex

Given $y \in \mathbb{R}^n$, find closest probability vector $x$.
$$ 
\min \frac{1}{2} \|x - y\|^2 \quad \text{s.t.} \quad \sum x_i = 1, x \geq 0
$$ 

**KKT Conditions:**
1. $x_i - y_i + \nu - \lambda_i = 0 \implies x_i = y_i - \nu + \lambda_i$
2. $\lambda_i x_i = 0, \lambda_i \geq 0, x_i \geq 0$
3. $\sum x_i = 1$

**Analysis:**
Similar to water-filling.
If $x_i > 0, \lambda_i = 0 \implies x_i = y_i - \nu$.
If $x_i = 0, \lambda_i = \nu - y_i \geq 0 \implies y_i - \nu \leq 0$.
So $x_i = \max(0, y_i - \nu)$.

We need to find $\nu$ such that $\sum \max(0, y_i - \nu) = 1$.
This can be solved by sorting $y$ and checking $n$ thresholds. $O(n \log n)$.

## Example 3: Support Vector Machines (SVM)

Primal:
$$ 
\min \frac{1}{2} \|w\|^2 + C \sum \xi_i 
$$ 
$$ 
\text{s.t.} \quad y_i(w^T x_i + b) \geq 1 - \xi_i, \quad \xi_i \geq 0 
$$ 

Deriving the dual via KKT leads to the famous kernel trick formulation.
$\lambda_i$ (dual var for margin constraint) becomes the coefficient for support vectors.
Complementary slackness tells us:
- $\lambda_i = 0$: Point correctly classified, far from boundary.
- $0 < \lambda_i < C$: Point is ON the margin. (Support vector).
- $\lambda_i = C$: Point violates margin ($\xi_i > 0$).

This sparsity (most $\lambda_i=0$) makes SVMs efficient.