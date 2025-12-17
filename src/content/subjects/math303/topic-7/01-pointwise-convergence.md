---
title: "Pointwise Convergence"
slug: "pointwise-convergence"
description: "Sequences and series of functions converging pointwise"
---

# Pointwise Convergence

## Introduction

In real analysis, we often encounter sequences of functions rather than sequences of numbers. The study of how such sequences behave as the index approaches infinity is fundamental to understanding function spaces, differential equations, Fourier analysis, and many other areas of mathematics. The most natural notion of convergence for sequences of functions is pointwise convergence, where we examine the convergence at each individual point in the domain.

While pointwise convergence is intuitive and natural, we will discover that it is surprisingly weak in the sense that it fails to preserve many important properties of functions, such as continuity, differentiability, and integrability. This observation will motivate our study of stronger forms of convergence in subsequent sections.

## Definitions

**Definition 1.1 (Pointwise Convergence of Sequences):** Let $D \subseteq \mathbb{R}$ and let $(f_n)_{n=1}^{\infty}$ be a sequence of functions $f_n: D \to \mathbb{R}$. We say that $(f_n)$ **converges pointwise** to a function $f: D \to \mathbb{R}$ if for each $x \in D$, the sequence of real numbers $(f_n(x))_{n=1}^{\infty}$ converges to $f(x)$.

More formally, $(f_n)$ converges pointwise to $f$ on $D$ if:
$$
\forall x \in D, \quad \lim_{n \to \infty} f_n(x) = f(x)
$$

Using the $\epsilon$-$N$ definition of limits, this means:
$$
\forall x \in D, \forall \epsilon > 0, \exists N = N(x, \epsilon) \in \mathbb{N}: n \geq N \implies |f_n(x) - f(x)| < \epsilon
$$

We write $f_n \to f$ pointwise on $D$, or $f_n \xrightarrow{p} f$ on $D$.

**Important Note:** The crucial observation is that $N$ may depend on both $\epsilon$ and $x$. Different points may require different values of $N$ to achieve the same level of approximation.

**Definition 1.2 (Pointwise Convergence of Series):** Let $(f_n)_{n=1}^{\infty}$ be a sequence of functions $f_n: D \to \mathbb{R}$. The series $\sum_{n=1}^{\infty} f_n$ **converges pointwise** to $f: D \to \mathbb{R}$ if the sequence of partial sums $s_n(x) = \sum_{k=1}^{n} f_k(x)$ converges pointwise to $f(x)$ for each $x \in D$.

That is:
$$
\forall x \in D, \quad \sum_{n=1}^{\infty} f_n(x) = f(x)
$$

## Basic Examples

**Example 1.3:** Consider $f_n(x) = x^n$ on $[0,1]$.

For each $x \in [0,1)$, we have $|x| < 1$, so $\lim_{n \to \infty} x^n = 0$.

For $x = 1$, we have $1^n = 1$ for all $n$, so $\lim_{n \to \infty} 1^n = 1$.

Therefore, $f_n$ converges pointwise to:
$$
f(x) = \begin{cases}
0 & \text{if } x \in [0,1) \\
1 & \text{if } x = 1
\end{cases}
$$

**Crucial Observation:** Each $f_n$ is continuous on $[0,1]$, but the limit function $f$ is discontinuous at $x = 1$. This shows that pointwise convergence does not preserve continuity.

**Example 1.4:** Let $f_n(x) = \frac{nx}{1 + nx}$ on $[0, \infty)$.

For $x = 0$: $f_n(0) = 0$ for all $n$, so $\lim_{n \to \infty} f_n(0) = 0$.

For $x > 0$: $f_n(x) = \frac{nx}{1 + nx} = \frac{x}{1/n + x}$. As $n \to \infty$, we have $1/n \to 0$, so:
$$
\lim_{n \to \infty} f_n(x) = \frac{x}{0 + x} = 1
$$

Therefore:
$$
f(x) = \begin{cases}
0 & \text{if } x = 0 \\
1 & \text{if } x > 0
\end{cases}
$$

Again, each $f_n$ is continuous, but $f$ is discontinuous at $x = 0$.

**Example 1.5:** Let $f_n(x) = \frac{x}{n}$ on $\mathbb{R}$.

For any $x \in \mathbb{R}$:
$$
\lim_{n \to \infty} f_n(x) = \lim_{n \to \infty} \frac{x}{n} = x \cdot \lim_{n \to \infty} \frac{1}{n} = x \cdot 0 = 0
$$

Therefore, $f_n \to 0$ pointwise on $\mathbb{R}$. Here, both the $f_n$ and the limit function are continuous.

## Pathological Examples

**Example 1.6 (Moving Bump):** Define:
$$
f_n(x) = \begin{cases}
n & \text{if } 0 \leq x \leq 1/n \\
0 & \text{otherwise}
\end{cases}
$$

For any fixed $x > 0$, choose $N$ such that $1/N < x$. Then for all $n \geq N$, we have $1/n < x$, so $f_n(x) = 0$.

For $x = 0$, we have $f_n(0) = n$ for all $n$, which diverges.

For $x < 0$, we have $f_n(x) = 0$ for all $n$.

Therefore, $f_n \to 0$ pointwise on $(-\infty, 0) \cup (0, \infty)$, but the sequence diverges at $x = 0$.

Interestingly, the integral:
$$
\int_{-\infty}^{\infty} f_n(x) \, dx = \int_0^{1/n} n \, dx = n \cdot \frac{1}{n} = 1
$$

So even though $f_n \to 0$ at every point where the limit exists, the integral remains constant at 1, not 0. This demonstrates that pointwise convergence does not, in general, allow us to interchange limits and integrals.

**Example 1.7 (Shrinking Spike):** Define:
$$
f_n(x) = \begin{cases}
n^2 x & \text{if } 0 \leq x \leq 1/n \\
-n^2 x + 2n & \text{if } 1/n < x \leq 2/n \\
0 & \text{otherwise}
\end{cases}
$$

This is a triangular spike of height $n$ and base $2/n$. For any $x > 0$, eventually $2/n < x$, so $f_n(x) = 0$ for large $n$. Thus $f_n \to 0$ pointwise on $[0, \infty)$.

However, the integral:
$$
\int_0^{\infty} f_n(x) \, dx = \frac{1}{2} \cdot \frac{2}{n} \cdot n = 1
$$

Again, the integral does not converge to $\int 0 \, dx = 0$.

## Series of Functions

**Example 1.8:** Consider the geometric series $\sum_{n=0}^{\infty} x^n$.

For $|x| < 1$, this is a convergent geometric series with sum:
$$
\sum_{n=0}^{\infty} x^n = \frac{1}{1-x}
$$

For $|x| \geq 1$, the series diverges.

Therefore, the series converges pointwise on $(-1, 1)$ to $f(x) = \frac{1}{1-x}$.

**Example 1.9:** Consider $\sum_{n=1}^{\infty} \frac{x^n}{n}$ on $[-1, 1]$.

For $|x| < 1$, we can compare with $\sum_{n=1}^{\infty} |x|^n$, which converges. By the comparison test, our series converges absolutely.

For $x = 1$, we get $\sum_{n=1}^{\infty} \frac{1}{n}$, which diverges.

For $x = -1$, we get $\sum_{n=1}^{\infty} \frac{(-1)^n}{n}$, which converges by the alternating series test.

Therefore, the series converges pointwise on $[-1, 1)$.

## Properties and Theorems

**Theorem 1.10 (Uniqueness of Pointwise Limits):** If $f_n \to f$ pointwise on $D$ and $f_n \to g$ pointwise on $D$, then $f = g$ on $D$.

**Proof:** Let $x \in D$ be arbitrary. Since limits of sequences in $\mathbb{R}$ are unique, we have:
$$
f(x) = \lim_{n \to \infty} f_n(x) = g(x)
$$
Since $x$ was arbitrary, $f = g$ on $D$. $\square$

**Theorem 1.11 (Algebraic Operations):** If $f_n \to f$ and $g_n \to g$ pointwise on $D$, then:
1. $f_n + g_n \to f + g$ pointwise on $D$
2. $cf_n \to cf$ pointwise on $D$ for any constant $c \in \mathbb{R}$
3. $f_n \cdot g_n \to f \cdot g$ pointwise on $D$
4. If $g(x) \neq 0$ for all $x \in D$, then $\frac{f_n}{g_n} \to \frac{f}{g}$ pointwise on $D$ (for sufficiently large $n$)

**Proof:** These follow immediately from the corresponding limit laws for sequences of real numbers, applied at each point $x \in D$. For example, for (1):
$$
\lim_{n \to \infty} (f_n + g_n)(x) = \lim_{n \to \infty} f_n(x) + \lim_{n \to \infty} g_n(x) = f(x) + g(x) = (f+g)(x)
$$
$\square$

## What Pointwise Convergence Does NOT Preserve

The following examples illustrate fundamental limitations of pointwise convergence.

**Failure to Preserve Continuity:** Example 1.3 showed that a sequence of continuous functions can converge pointwise to a discontinuous function.

**Failure to Preserve Differentiability:** Consider $f_n(x) = \frac{\sin(nx)}{n}$ on $\mathbb{R}$.

For any $x \in \mathbb{R}$:
$$
|f_n(x)| = \left|\frac{\sin(nx)}{n}\right| \leq \frac{1}{n} \to 0
$$

So $f_n \to 0$ pointwise on $\mathbb{R}$.

However, $f_n'(x) = \cos(nx)$, which does not converge pointwise (it oscillates between $-1$ and $1$). Thus, even though each $f_n$ is differentiable and $f_n \to 0$, we cannot conclude that $(f_n')$ converges to $(0)' = 0$.

**Failure to Preserve Boundedness:** Consider $f_n(x) = nx$ on $[0, 1]$.

Each $f_n$ is bounded on $[0, 1]$ (with $|f_n(x)| \leq n$). However, $f_n$ does not converge pointwise anywhere except at $x = 0$ (where $f_n(0) = 0$ for all $n$). This shows that even the convergence itself can fail for bounded functions.

**Failure to Preserve Integrability:** Examples 1.6 and 1.7 demonstrated that even when $f_n \to f$ pointwise, we may have:
$$
\lim_{n \to \infty} \int f_n \neq \int f
$$

## Summary

Pointwise convergence is the most natural and straightforward notion of convergence for sequences of functions: a sequence $(f_n)$ converges pointwise to $f$ if $f_n(x) \to f(x)$ for each individual point $x$ in the domain. While this definition is intuitive and easy to work with, it is unfortunately too weak to preserve many important properties:

1. Continuous functions can converge pointwise to discontinuous functions
2. The derivative of the limit may not equal the limit of the derivatives
3. The integral of the limit may not equal the limit of the integrals
4. Bounded functions can converge pointwise to unbounded functions (or fail to converge at all)

The fundamental issue is that in pointwise convergence, the rate of convergence can vary arbitrarily from point to point. This lack of uniformity is what causes the failure to preserve important properties.

These observations motivate the study of uniform convergence, which we will explore in the next section. Uniform convergence requires that the approximation $f_n \approx f$ becomes good simultaneously across the entire domain, rather than point by point. This stronger notion will allow us to preserve continuity and exchange limits with integrals and derivatives under appropriate conditions.
