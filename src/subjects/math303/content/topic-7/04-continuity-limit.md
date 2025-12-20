---
title: "Continuity and Limits"
slug: "continuity-limit"
description: "Preservation of continuity under uniform convergence"
---

# Continuity and Limits

## Introduction

One of the most important questions in analysis is: when can we interchange two limiting operations? For sequences of functions, this question takes several forms:
- If $f_n \to f$ and each $f_n$ is continuous, is $f$ continuous?
- Can we interchange $\lim_{n \to \infty}$ and $\lim_{x \to x_0}$?
- Can we interchange $\lim_{n \to \infty}$ and $\int$?
- Can we interchange $\lim_{n \to \infty}$ and $\frac{d}{dx}$?

As we saw with pointwise convergence, the answer to these questions is generally "no" without additional hypotheses. However, uniform convergence provides precisely the right condition to ensure these interchanges are valid. This section explores these fundamental theorems in detail.

## Preservation of Continuity

We have already stated this crucial theorem in the previous section, but we revisit it here with additional context and examples.

**Theorem 4.1 (Uniform Limit Theorem):** Let $(f_n)$ be a sequence of continuous functions $f_n: D \to \mathbb{R}$. If $f_n \rightrightarrows f$ on $D$, then $f$ is continuous on $D$.

**Proof:** (Repeated for completeness) Let $x_0 \in D$ and $\epsilon > 0$. We need to show there exists $\delta > 0$ such that $|x - x_0| < \delta$ implies $|f(x) - f(x_0)| < \epsilon$.

By uniform convergence, choose $N$ such that:
$$
\sup_{x \in D} |f_N(x) - f(x)| < \frac{\epsilon}{3}
$$

Since $f_N$ is continuous at $x_0$, there exists $\delta > 0$ such that:
$$
|x - x_0| < \delta \implies |f_N(x) - f_N(x_0)| < \frac{\epsilon}{3}
$$

For $|x - x_0| < \delta$:
$$
\begin{align}
|f(x) - f(x_0)| &\leq |f(x) - f_N(x)| + |f_N(x) - f_N(x_0)| + |f_N(x_0) - f(x_0)| \\
&< \frac{\epsilon}{3} + \frac{\epsilon}{3} + \frac{\epsilon}{3} = \epsilon
\end{align}
$$

Therefore, $f$ is continuous at $x_0$. Since $x_0$ was arbitrary, $f$ is continuous on $D$. $\square$

**Key Insight:** The proof uses the "three epsilon trick": we split the error into three parts, each bounded by $\epsilon/3$. The crucial step is choosing a single $N$ that works uniformly for all $x$, which is possible only because of uniform convergence.

**Example 4.2:** Consider $f_n(x) = x^n$ on $[0, 1]$.

Each $f_n$ is continuous, but $f_n$ converges pointwise to:
$$
f(x) = \begin{cases}
0 & x \in [0,1) \\
1 & x = 1
\end{cases}
$$

which is discontinuous at $x = 1$. This shows that pointwise convergence is insufficient; indeed, we showed earlier that convergence is not uniform on $[0,1]$.

However, on $[0, r]$ for $r < 1$, we have $f_n \rightrightarrows 0$ (uniformly), and indeed the limit function $f(x) = 0$ is continuous on $[0, r]$.

**Example 4.3:** The series $\sum_{n=1}^{\infty} \frac{\sin(nx)}{n^2}$ converges uniformly on $\mathbb{R}$ (by the M-test). Each term is continuous, so the sum:
$$
f(x) = \sum_{n=1}^{\infty} \frac{\sin(nx)}{n^2}
$$

is continuous on $\mathbb{R}$.

## Interchange of Limits

**Theorem 4.4 (Double Limit Theorem):** Let $(f_n)$ be a sequence of functions $f_n: D \to \mathbb{R}$, and let $x_0$ be a limit point of $D$ (not necessarily in $D$). Suppose:
1. $f_n \rightrightarrows f$ on $D$
2. For each $n$, $\lim_{x \to x_0} f_n(x) = L_n$ exists

Then:
1. The limit $\lim_{n \to \infty} L_n$ exists
2. The limit $\lim_{x \to x_0} f(x)$ exists
3. These limits are equal:
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

Since $\lim_{x \to x_0} f_N(x) = L_N$ exists, there exists $\delta > 0$ such that:
$$
0 < |x - x_0| < \delta, x \in D \implies |f_N(x) - L_N| < \frac{\epsilon}{3}
$$

For such $x$:
$$
|f(x) - L_N| \leq |f(x) - f_N(x)| + |f_N(x) - L_N| < \frac{\epsilon}{3} + \frac{\epsilon}{3} = \frac{2\epsilon}{3} < \epsilon
$$

This shows $\lim_{x \to x_0} f(x)$ exists and equals some value $L$ with $|L - L_N| \leq \frac{2\epsilon}{3}$.

To show $(L_n)$ converges to $L$, let $\epsilon > 0$ and choose $N$ as before. For any $n \geq N$:
$$
|L_n - L| \leq |L_n - f_n(x)| + |f_n(x) - f(x)| + |f(x) - L|
$$

Choose $x$ close enough to $x_0$ so that $|f_n(x) - L_n| < \frac{\epsilon}{3}$ and $|f(x) - L| < \frac{\epsilon}{3}$. Since $n \geq N$:
$$
|f_n(x) - f(x)| < \frac{\epsilon}{3}
$$

Therefore:
$$
|L_n - L| < \frac{\epsilon}{3} + \frac{\epsilon}{3} + \frac{\epsilon}{3} = \epsilon
$$

This shows $L_n \to L$. $\square$

**Corollary 4.5:** If $(f_n)$ is a sequence of continuous functions on $D$ and $f_n \rightrightarrows f$ on $D$, then for any $x_0 \in D$:
$$
\lim_{x \to x_0} f(x) = f(x_0) = \lim_{n \to \infty} f_n(x_0)
$$

This is just Theorem 4.1 restated using the double limit theorem.

## Examples and Applications

**Example 4.6:** Consider $f_n(x) = \frac{nx}{1 + nx}$ on $(0, \infty)$.

We have $\lim_{n \to \infty} f_n(x) = 1$ for each $x > 0$.

For each $n$:
$$
\lim_{x \to 0^+} f_n(x) = \lim_{x \to 0^+} \frac{nx}{1 + nx} = 0
$$

However:
$$
\lim_{x \to 0^+} \lim_{n \to \infty} f_n(x) = \lim_{x \to 0^+} 1 = 1
$$

So:
$$
\lim_{x \to 0^+} \lim_{n \to \infty} f_n(x) = 1 \neq 0 = \lim_{n \to \infty} \lim_{x \to 0^+} f_n(x)
$$

The limits cannot be interchanged! Indeed, we showed earlier that $f_n$ does not converge uniformly on $(0, \infty)$ (or on any interval containing 0).

**Example 4.7:** Consider the series $f(x) = \sum_{n=1}^{\infty} \frac{x^n}{n^2}$ on $[-1, 1]$.

By the Weierstrass M-test, this converges uniformly on $[-1, 1]$. Therefore:
$$
\lim_{x \to 0} f(x) = \lim_{x \to 0} \sum_{n=1}^{\infty} \frac{x^n}{n^2} = \sum_{n=1}^{\infty} \lim_{x \to 0} \frac{x^n}{n^2} = \sum_{n=1}^{\infty} 0 = 0
$$

Alternatively, since $f$ is continuous (by Theorem 4.1):
$$
\lim_{x \to 0} f(x) = f(0) = 0
$$

**Example 4.8:** Let $f(x) = \sum_{n=1}^{\infty} \frac{e^{-nx}}{n}$ on $(0, \infty)$.

We showed in Example 3.15 that this converges uniformly on $[a, \infty)$ for any $a > 0$, so $f$ is continuous on $(0, \infty)$.

In particular, for any $x_0 > 0$:
$$
\lim_{x \to x_0} f(x) = f(x_0) = \sum_{n=1}^{\infty} \frac{e^{-nx_0}}{n}
$$

## Continuity on Compact Sets

**Theorem 4.9:** Let $K \subseteq \mathbb{R}$ be compact, and let $(f_n)$ be a sequence of continuous functions $f_n: K \to \mathbb{R}$. If $f_n \rightrightarrows f$ on $K$, then $f$ is continuous on $K$.

**Proof:** This follows immediately from Theorem 4.1. $\square$

The importance of this theorem is that on compact sets, uniform limits of continuous functions are not only continuous, but they inherit many other properties as well.

**Theorem 4.10 (Dini's Theorem):** Let $K \subseteq \mathbb{R}$ be compact, and let $(f_n)$ be a sequence of continuous functions $f_n: K \to \mathbb{R}$. Suppose:
1. $f_n \to f$ pointwise on $K$
2. $f$ is continuous on $K$
3. For each $x \in K$, the sequence $(f_n(x))$ is monotonic (all increasing or all decreasing)

Then $f_n \rightrightarrows f$ on $K$.

**Proof:** Assume $(f_n(x))$ is increasing for each $x$ (the decreasing case is similar). Let $\epsilon > 0$. For each $x \in K$, since $f_n(x) \to f(x)$, there exists $N_x$ such that:
$$
f_{N_x}(x) > f(x) - \epsilon
$$

By continuity of $f$ and $f_{N_x}$, the function $g_x = f - f_{N_x}$ is continuous. Since $g_x(x) < \epsilon$, there exists an open neighborhood $U_x$ of $x$ such that:
$$
g_x(y) < \epsilon \text{ for all } y \in U_x
$$

That is, $f_{N_x}(y) > f(y) - \epsilon$ for all $y \in U_x$.

The collection $\{U_x : x \in K\}$ is an open cover of $K$. By compactness, there exists a finite subcover $U_{x_1}, \ldots, U_{x_m}$.

Let $N = \max\{N_{x_1}, \ldots, N_{x_m}\}$. For any $y \in K$, we have $y \in U_{x_i}$ for some $i$. Since $(f_n(y))$ is increasing and $n \geq N \geq N_{x_i}$:
$$
f(y) - \epsilon < f_{N_{x_i}}(y) \leq f_n(y) \leq f(y)
$$

Therefore, $|f_n(y) - f(y)| < \epsilon$ for all $y \in K$ and all $n \geq N$. This shows uniform convergence. $\square$

**Example 4.11:** Consider $f_n(x) = x^n$ on $[0, r]$ where $0 < r < 1$.

For each $x \in [0, r]$, $(f_n(x))$ is decreasing, and $f_n(x) \to 0$. The limit function $f(x) = 0$ is continuous. By Dini's theorem, $f_n \rightrightarrows 0$ on $[0, r]$.

This provides an alternative proof to the direct calculation we did earlier.

**Example 4.12:** Dini's theorem does not apply on $[0, 1]$ for $f_n(x) = x^n$ because the limit function:
$$
f(x) = \begin{cases}
0 & x \in [0,1) \\
1 & x = 1
\end{cases}
$$

is not continuous. Indeed, we know convergence is not uniform on $[0, 1]$.

## Term-by-Term Continuity Arguments

**Theorem 4.13:** If $\sum_{n=1}^{\infty} f_n$ converges uniformly on $D$ and each $f_n$ is continuous on $D$, then the sum function:
$$
f(x) = \sum_{n=1}^{\infty} f_n(x)
$$

is continuous on $D$.

**Proof:** Let $s_n = \sum_{k=1}^{n} f_k$ be the sequence of partial sums. Each $s_n$ is continuous (as a finite sum of continuous functions). Since $s_n \rightrightarrows f$, Theorem 4.1 implies $f$ is continuous. $\square$

**Example 4.14:** The function:
$$
f(x) = \sum_{n=1}^{\infty} \frac{\cos(nx)}{n^2}
$$

is continuous on $\mathbb{R}$ because the series converges uniformly (by the M-test) and each term is continuous.

**Example 4.15:** The Weierstrass function:
$$
W(x) = \sum_{n=0}^{\infty} a^n \cos(b^n \pi x)
$$

where $0 < a < 1$, $b$ is an odd integer, and $ab > 1 + \frac{3\pi}{2}$, is continuous everywhere but differentiable nowhere.

Continuity follows from uniform convergence (by the M-test with $M_n = a^n$). The nowhere-differentiability requires a more delicate argument that we omit.

## Sequential Criterion for Continuity

**Theorem 4.16 (Sequential Criterion):** A function $f: D \to \mathbb{R}$ is continuous at $x_0 \in D$ if and only if for every sequence $(x_n)$ in $D$ with $x_n \to x_0$, we have $f(x_n) \to f(x_0)$.

This theorem (proved in basic analysis courses) provides an alternative characterization of continuity that is often useful in proofs involving uniform convergence.

**Example 4.17:** To show that $f(x) = \sum_{n=1}^{\infty} \frac{\sin(nx)}{n^2}$ is continuous at $x_0 = 0$, we can verify that for any sequence $x_k \to 0$:
$$
f(x_k) = \sum_{n=1}^{\infty} \frac{\sin(nx_k)}{n^2} \to \sum_{n=1}^{\infty} \frac{\sin(0)}{n^2} = 0 = f(0)
$$

The interchange $\lim_{k \to \infty} \sum_{n=1}^{\infty}$ vs $\sum_{n=1}^{\infty} \lim_{k \to \infty}$ is justified by uniform convergence.

## Summary

The key results on continuity and uniform convergence are:

1. **Uniform Limit Theorem**: If $f_n$ are continuous and $f_n \rightrightarrows f$, then $f$ is continuous.

2. **Double Limit Theorem**: Uniform convergence allows interchange of $\lim_{x \to x_0}$ and $\lim_{n \to \infty}$.

3. **Dini's Theorem**: On compact sets, monotonic pointwise convergence to a continuous limit is automatically uniform.

4. **Series**: If $\sum f_n$ converges uniformly and each $f_n$ is continuous, then the sum is continuous.

These theorems provide the foundation for analyzing sequences and series of functions. The preservation of continuity under uniform convergence is the primary reason this notion is so important in analysis.

**Key Proof Technique**: Most proofs use the "three epsilon trick": split the error into three parts using the triangle inequality, control each part separately, and combine to get the desired bound. This technique appears repeatedly throughout analysis.

**Practical Implication**: To show a function defined by a series is continuous:
1. Verify each term is continuous
2. Prove uniform convergence (often using the M-test)
3. Apply Theorem 4.13

This procedure is routine in many areas of mathematics, from Fourier analysis to differential equations to complex analysis. In the next sections, we explore how uniform convergence interacts with integration and differentiation, completing the picture of when we can interchange limiting operations.
