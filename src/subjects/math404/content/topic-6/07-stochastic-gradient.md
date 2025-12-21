---
title: "Stochastic Gradient Descent"
description: "Optimization for large-scale data"
---

# Stochastic Gradient Descent (SGD)

In the age of Big Data, calculating the true gradient is a luxury we cannot afford. **Stochastic Gradient Descent (SGD)** replaces the true gradient with a noisy, cheap estimate. It is the engine of Deep Learning.

## The Problem Setting

Consider minimizing a sum of functions (Finite Sum problem):
$$ f(x) = \frac{1}{n} \sum_{i=1}^n f_i(x) $$
This usually represents the **Loss Function** over a training set of $n$ examples.
- $f_i(x)$: Loss on data point $i$.
- $x$: Model parameters.

## Batch Gradient Descent (Standard GD)

$$ x_{k+1} = x_k - \alpha \nabla f(x_k) = x_k - \frac{\alpha}{n} \sum_{i=1}^n \nabla f_i(x_k) $$
Cost per step: $O(n)$.
If $n = 1,000,000,000$ (e.g., ImageNet), one step takes hours.

## Stochastic Gradient Descent (SGD)

Instead of summing all $n$, pick a **random index** $i_k$ uniformly from {1, ..., n}.
Use $\nabla f_{i_k}(x_k)$ as an unbiased estimator of the true gradient.

$$ x_{k+1} = x_k - \alpha_k \nabla f_{i_k}(x_k) $$

Cost per step: $O(1)$ (independent of dataset size!).

**Expected Update:**
$$ \mathbb{E}[x_{k+1} \mid x_k] = x_k - \alpha_k \mathbb{E}[\nabla f_{i_k}(x_k)] = x_k - \alpha_k \nabla f(x_k) $$
On average, we move in the right direction. In reality, we take a noisy, drunk walk.

## Mini-batch SGD

A compromise. Pick a random batch $\mathcal{B}$ of size $b$ (e.g., 32, 64, 128).
$$ x_{k+1} = x_k - \frac{\alpha_k}{b} \sum_{i \in \mathcal{B}} \nabla f_i(x_k) $$
- Reduces variance of gradient estimate.
- Allows vectorized computation (GPUs love this).

## Convergence

SGD converges, but slowly.
Because of the noise (variance $\sigma^2$), we cannot use a fixed step size $\alpha$. We must decrease it.
Robbins-Monro condition:
$$ \sum \alpha_k = \infty, \quad \sum \alpha_k^2 < \infty $$
Typical schedule: $\alpha_k = O(1/k)$ or $O(1/\sqrt{k})$.

**Rate:**
- Strongly Convex: $O(1/k)$ (Compare to $O(c^k)$ for GD).
- General Convex: $O(1/\sqrt{k})$.

**Trade-off:**
- GD: Fast convergence (few steps), expensive steps.
- SGD: Slow convergence (many steps), cheap steps.
- For low accuracy (Machine Learning), SGD wins. For high accuracy ($10^{-10}$), GD wins.

## Variance Reduction (Advanced)

Modern algorithms (SVRG, SAGA) combine the speed of SGD with the convergence rate of GD.
Key idea: Keep a memory of previous gradients to reduce the variance of the estimate.
Achieves **Linear Convergence $O(c^k)$** with **$O(1)$ cost**.

## Momentum and Adam

Standard SGD is slow in "ravines" (ill-conditioned).
**SGD with Momentum:**
$$ v_{k+1} = \beta v_k + \nabla f_{i_k}(x_k) $$
$$ x_{k+1} = x_k - \alpha v_{k+1} $$
Accelerates in consistent directions, damps oscillations.

**Adam (Adaptive Moment Estimation):**
Adapts the learning rate for each parameter individually based on gradient statistics.
The default optimizer for deep learning.