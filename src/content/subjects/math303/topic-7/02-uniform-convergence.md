---
title: "Uniform Convergence"
slug: "uniform-convergence"
description: "Uniform vs pointwise convergence"
---

# Uniform Convergence

## Introduction

As we saw in the previous section, pointwise convergence fails to preserve many important properties of functions. The root cause is that in pointwise convergence, the rate of convergence can vary arbitrarily from point to point. Some points may require many more terms than others to achieve the same level of approximation.

Uniform convergence addresses this deficiency by requiring that the convergence occurs at the same rate across the entire domain. This seemingly small change has profound consequences: uniform convergence preserves continuity, allows interchange of limits, and provides a framework for rigorous analysis of function sequences and series.

## Definition

**Definition 2.1 (Uniform Convergence):** Let $D \subseteq \mathbb{R}$ and let $(f_n)_{n=1}^{\infty}$ be a sequence of functions $f_n: D \to \mathbb{R}$. We say that $(f_n)$ **converges uniformly** to $f: D \to \mathbb{R}$ on $D$ if:
$$
\forall \epsilon > 0, \exists N = N(\epsilon) \in \mathbb{N}: n \geq N \implies \sup_{x \in D} |f_n(x) - f(x)| < \epsilon
$$

Equivalently:
$$
\forall \epsilon > 0, \exists N = N(\epsilon) \in \mathbb{N}: n \geq N \implies |f_n(x) - f(x)| < \epsilon \text{ for all } x \in D
$$

We write $f_n \rightrightarrows f$ on $D$ or $f_n \xrightarrow{u} f$ on $D$.

**Key Difference from Pointwise Convergence:** The crucial distinction is that $N$ depends only on $\epsilon$, not on $x$. Once we have chosen $N$ large enough, the inequality $|f_n(x) - f(x)| < \epsilon$ holds for **all** $x \in D$ simultaneously.

**Alternative Characterization:** $(f_n)$ converges uniformly to $f$ on $D$ if and only if:
$$
\lim_{n \to \infty} \sup_{x \in D} |f_n(x) - f(x)| = 0
$$

This is often written as $\lim_{n \to \infty} \|f_n - f\|_{\infty} = 0$, where $\|g\|_{\infty} = \sup_{x \in D} |g(x)|$ is the supremum norm.

**Definition 2.2 (Uniform Convergence of Series):** The series $\sum_{n=1}^{\infty} f_n$ **converges uniformly** to $f$ on $D$ if the sequence of partial sums $s_n = \sum_{k=1}^{n} f_k$ converges uniformly to $f$ on $D$.

## Basic Properties

**Theorem 2.3:** If $(f_n)$ converges uniformly to $f$ on $D$, then $(f_n)$ converges pointwise to $f$ on $D$.

**Proof:** Suppose $f_n \rightrightarrows f$ on $D$. Let $x \in D$ and $\epsilon > 0$ be given. By uniform convergence, there exists $N$ such that for all $n \geq N$:
$$
\sup_{y \in D} |f_n(y) - f(y)| < \epsilon
$$
In particular, taking $y = x$:
$$
|f_n(x) - f(x)| < \epsilon
$$
This shows pointwise convergence at $x$. Since $x$ was arbitrary, $f_n \to f$ pointwise on $D$. $\square$

**Important:** The converse is false. Pointwise convergence does not imply uniform convergence.

**Theorem 2.4 (Uniqueness):** If $f_n \rightrightarrows f$ and $f_n \rightrightarrows g$ on $D$, then $f = g$ on $D$.

**Proof:** By Theorem 2.3, $f_n \to f$ and $f_n \to g$ pointwise. By uniqueness of pointwise limits, $f = g$. $\square$

## Examples

**Example 2.5:** Let $f_n(x) = \frac{x}{n}$ on $\mathbb{R}$.

We know $f_n \to 0$ pointwise. To check uniform convergence:
$$
\sup_{x \in \mathbb{R}} |f_n(x) - 0| = \sup_{x \in \mathbb{R}} \left|\frac{x}{n}\right| = \infty
$$

So $f_n$ does not converge uniformly on $\mathbb{R}$.

However, on any bounded interval $[-M, M]$:
$$
\sup_{x \in [-M,M]} |f_n(x) - 0| = \sup_{x \in [-M,M]} \left|\frac{x}{n}\right| = \frac{M}{n} \to 0
$$

Therefore, $f_n \rightrightarrows 0$ on any bounded interval.

**Example 2.6:** Consider $f_n(x) = x^n$ on $[0,1]$.

We know from Example 1.3 that $f_n$ converges pointwise to:
$$
f(x) = \begin{cases}
0 & \text{if } x \in [0,1) \\
1 & \text{if } x = 1
\end{cases}
$$

For $x \in [0,1)$:
$$
|f_n(x) - f(x)| = |x^n - 0| = x^n
$$

Thus:
$$
\sup_{x \in [0,1]} |f_n(x) - f(x)| = \sup_{x \in [0,1)} x^n = 1
$$

(The supremum is achieved as $x \to 1^-$.) Since this does not approach 0, $f_n$ does not converge uniformly on $[0,1]$.

However, on $[0, r]$ where $r < 1$:
$$
\sup_{x \in [0,r]} |f_n(x) - 0| = r^n \to 0
$$

So $f_n \rightrightarrows 0$ on $[0,r]$ for any $r < 1$.

**Example 2.7:** Let $f_n(x) = \frac{nx}{1+nx}$ on $[0,\infty)$.

From Example 1.4, we know:
$$
f(x) = \begin{cases}
0 & \text{if } x = 0 \\
1 & \text{if } x > 0
\end{cases}
$$

For $x > 0$:
$$
|f_n(x) - 1| = \left|\frac{nx}{1+nx} - 1\right| = \left|\frac{-1}{1+nx}\right| = \frac{1}{1+nx}
$$

As $x \to 0^+$, we have $1 + nx \to 1$, so:
$$
\sup_{x > 0} \frac{1}{1+nx} = 1
$$

Therefore, $f_n$ does not converge uniformly on $[0, \infty)$ or $(0, \infty)$.

However, on $[\delta, \infty)$ where $\delta > 0$:
$$
\sup_{x \geq \delta} \frac{1}{1+nx} = \frac{1}{1+n\delta} \to 0
$$

So $f_n \rightrightarrows 1$ on $[\delta, \infty)$ for any $\delta > 0$.

**Example 2.8:** Consider $f_n(x) = \frac{\sin(nx)}{n}$ on $\mathbb{R}$.

For any $x \in \mathbb{R}$:
$$
|f_n(x) - 0| = \left|\frac{\sin(nx)}{n}\right| \leq \frac{1}{n}
$$

Therefore:
$$
\sup_{x \in \mathbb{R}} |f_n(x) - 0| \leq \frac{1}{n} \to 0
$$

So $f_n \rightrightarrows 0$ on $\mathbb{R}$.

## Cauchy Criterion for Uniform Convergence

**Theorem 2.9 (Cauchy Criterion):** A sequence $(f_n)$ of functions $f_n: D \to \mathbb{R}$ converges uniformly on $D$ if and only if:
$$
\forall \epsilon > 0, \exists N \in \mathbb{N}: m, n \geq N \implies \sup_{x \in D} |f_n(x) - f_m(x)| < \epsilon
$$

**Proof:**

($\Rightarrow$) Suppose $f_n \rightrightarrows f$ on $D$. Let $\epsilon > 0$. Choose $N$ such that for all $n \geq N$:
$$
\sup_{x \in D} |f_n(x) - f(x)| < \frac{\epsilon}{2}
$$

Then for $m, n \geq N$ and any $x \in D$:
$$
|f_n(x) - f_m(x)| \leq |f_n(x) - f(x)| + |f(x) - f_m(x)| < \frac{\epsilon}{2} + \frac{\epsilon}{2} = \epsilon
$$

Taking the supremum over $x \in D$:
$$
\sup_{x \in D} |f_n(x) - f_m(x)| \leq \epsilon
$$

($\Leftarrow$) Suppose the Cauchy criterion holds. For each $x \in D$, $(f_n(x))$ is a Cauchy sequence in $\mathbb{R}$, hence convergent. Define $f(x) = \lim_{n \to \infty} f_n(x)$.

Let $\epsilon > 0$. Choose $N$ such that for all $m, n \geq N$:
$$
\sup_{x \in D} |f_n(x) - f_m(x)| < \frac{\epsilon}{2}
$$

Fix $n \geq N$ and any $x \in D$. For any $m \geq N$:
$$
|f_n(x) - f_m(x)| < \frac{\epsilon}{2}
$$

Taking $m \to \infty$:
$$
|f_n(x) - f(x)| \leq \frac{\epsilon}{2} < \epsilon
$$

This holds for all $x \in D$, so:
$$
\sup_{x \in D} |f_n(x) - f(x)| \leq \epsilon
$$

Therefore, $f_n \rightrightarrows f$ on $D$. $\square$

## The Fundamental Theorem on Uniform Convergence

**Theorem 2.10 (Preservation of Continuity):** Let $(f_n)$ be a sequence of continuous functions $f_n: D \to \mathbb{R}$. If $f_n \rightrightarrows f$ on $D$, then $f$ is continuous on $D$.

**Proof:** Let $x_0 \in D$ and $\epsilon > 0$. We need to show there exists $\delta > 0$ such that:
$$
|x - x_0| < \delta \implies |f(x) - f(x_0)| < \epsilon
$$

By uniform convergence, choose $N$ such that:
$$
\sup_{x \in D} |f_N(x) - f(x)| < \frac{\epsilon}{3}
$$

Since $f_N$ is continuous at $x_0$, there exists $\delta > 0$ such that:
$$
|x - x_0| < \delta \implies |f_N(x) - f_N(x_0)| < \frac{\epsilon}{3}
$$

Now, if $|x - x_0| < \delta$:
$$
\begin{align}
|f(x) - f(x_0)| &\leq |f(x) - f_N(x)| + |f_N(x) - f_N(x_0)| + |f_N(x_0) - f(x_0)| \\
&< \frac{\epsilon}{3} + \frac{\epsilon}{3} + \frac{\epsilon}{3} = \epsilon
\end{align}
$$

Therefore, $f$ is continuous at $x_0$. Since $x_0$ was arbitrary, $f$ is continuous on $D$. $\square$

**Corollary 2.11:** If each $f_n$ is continuous on $[a,b]$ and $f_n \rightrightarrows f$ on $[a,b]$, then $f$ is continuous on $[a,b]$.

This theorem is the primary reason uniform convergence is so important. It provides a sufficient condition for preserving continuity under limits.

## Interchange of Limits

**Theorem 2.12 (Interchange of Limit and Function):** Let $(f_n)$ be a sequence of functions $f_n: D \to \mathbb{R}$ and let $x_0$ be a limit point of $D$. Suppose:
1. $f_n \rightrightarrows f$ on $D$
2. For each $n$, $\lim_{x \to x_0} f_n(x) = L_n$ exists

Then $\lim_{n \to \infty} L_n$ exists, $\lim_{x \to x_0} f(x)$ exists, and:
$$
\lim_{x \to x_0} \lim_{n \to \infty} f_n(x) = \lim_{n \to \infty} \lim_{x \to x_0} f_n(x)
$$

That is:
$$
\lim_{x \to x_0} f(x) = \lim_{n \to \infty} L_n
$$

**Proof:** Let $\epsilon > 0$. By uniform convergence, choose $N$ such that:
$$
\sup_{x \in D} |f_N(x) - f(x)| < \frac{\epsilon}{3}
$$

Since $\lim_{x \to x_0} f_N(x) = L_N$, there exists $\delta > 0$ such that:
$$
0 < |x - x_0| < \delta, x \in D \implies |f_N(x) - L_N| < \frac{\epsilon}{3}
$$

For such $x$:
$$
\begin{align}
|f(x) - L_N| &\leq |f(x) - f_N(x)| + |f_N(x) - L_N| \\
&< \frac{\epsilon}{3} + \frac{\epsilon}{3} = \frac{2\epsilon}{3}
\end{align}
$$

This shows $\lim_{x \to x_0} f(x) = L_N + r$ where $|r| \leq \frac{2\epsilon}{3}$.

Similarly, we can show that the sequence $(L_n)$ is Cauchy and hence convergent. The limit interchange follows. $\square$

## Testing for Uniform Convergence

**Theorem 2.13 (Negation Test):** If $f_n \to f$ pointwise but not uniformly on $D$, then there exist $\epsilon_0 > 0$ and sequences $(n_k)$ in $\mathbb{N}$ and $(x_k)$ in $D$ such that $n_k \to \infty$ and:
$$
|f_{n_k}(x_k) - f(x_k)| \geq \epsilon_0 \text{ for all } k
$$

This provides a method to prove non-uniform convergence: find a sequence of points where convergence fails to be uniform.

**Example 2.14:** For $f_n(x) = x^n$ on $[0,1]$, let $x_n = (1 - 1/n)$. Then:
$$
f_n(x_n) = \left(1 - \frac{1}{n}\right)^n \to \frac{1}{e} \approx 0.368
$$

But $f(x_n) = 0$ since $x_n < 1$. Thus:
$$
|f_n(x_n) - f(x_n)| \to \frac{1}{e}
$$

This confirms that convergence is not uniform.

## Uniform Convergence and Boundedness

**Theorem 2.15:** If each $f_n$ is bounded on $D$ and $f_n \rightrightarrows f$ on $D$, then $f$ is bounded on $D$.

**Proof:** Choose $N$ such that $\sup_{x \in D} |f_N(x) - f(x)| < 1$. Since $f_N$ is bounded, there exists $M$ such that $|f_N(x)| \leq M$ for all $x \in D$.

For any $x \in D$:
$$
|f(x)| \leq |f(x) - f_N(x)| + |f_N(x)| < 1 + M
$$

Therefore, $f$ is bounded by $1 + M$. $\square$

## Summary

Uniform convergence is a stronger notion than pointwise convergence, requiring that the approximation $f_n \approx f$ becomes good simultaneously across the entire domain. The key properties are:

1. **Definition**: $f_n \rightrightarrows f$ if $\sup_{x \in D} |f_n(x) - f(x)| \to 0$
2. **Preservation of Continuity**: Uniform limits of continuous functions are continuous
3. **Interchange of Limits**: Uniform convergence allows interchange of limits and function evaluation
4. **Cauchy Criterion**: Provides a necessary and sufficient condition for uniform convergence
5. **Boundedness**: Uniform limits of bounded functions are bounded

The fundamental distinction from pointwise convergence is that the rate of convergence does not depend on the point. This seemingly technical requirement has profound consequences, making uniform convergence the appropriate notion for preserving analytic properties of functions.

In the next sections, we will develop tools (like the Weierstrass M-test) for proving uniform convergence and explore how uniform convergence interacts with integration and differentiation.
