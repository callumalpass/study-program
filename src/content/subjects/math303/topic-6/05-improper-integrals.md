---
title: "Improper Integrals"
slug: "improper-integrals"
description: "Integration over unbounded intervals"
---

# Improper Integrals

## Introduction

The Riemann integral, as developed so far, applies only to bounded functions on bounded intervals. However, many important applications require integrating unbounded functions (like $1/x^2$ near 0) or integrating over unbounded intervals (like $[1, \infty)$). These cases require extending the definition through limits, leading to **improper integrals**. This section develops the theory of improper integrals, establishing criteria for convergence and methods for evaluation.

## Type I: Infinite Intervals

**Definition 6.5.1 (Improper Integral, Infinite Interval):** If $f$ is integrable on $[a,b]$ for every $b > a$, we define:
$$
\int_a^\infty f(x) \, dx = \lim_{b \to \infty} \int_a^b f(x) \, dx
$$

If the limit exists and is finite, we say the improper integral **converges**; otherwise, it **diverges**.

Similarly:
$$
\int_{-\infty}^b f(x) \, dx = \lim_{a \to -\infty} \int_a^b f(x) \, dx
$$

For the entire real line:
$$
\int_{-\infty}^\infty f(x) \, dx = \int_{-\infty}^c f(x) \, dx + \int_c^\infty f(x) \, dx
$$

for any $c \in \mathbb{R}$, provided both integrals converge.

**Example 6.5.2:** Evaluate $\int_1^\infty \frac{1}{x^2} dx$.

$$
\int_1^\infty \frac{1}{x^2} dx = \lim_{b \to \infty} \int_1^b \frac{1}{x^2} dx = \lim_{b \to \infty} \left[-\frac{1}{x}\right]_1^b
$$
$$
= \lim_{b \to \infty} \left(-\frac{1}{b} + 1\right) = 1
$$

The integral converges to 1.

**Example 6.5.3:** Evaluate $\int_1^\infty \frac{1}{x} dx$.

$$
\int_1^\infty \frac{1}{x} dx = \lim_{b \to \infty} \int_1^b \frac{1}{x} dx = \lim_{b \to \infty} [\ln x]_1^b
$$
$$
= \lim_{b \to \infty} (\ln b - 0) = \infty
$$

The integral diverges.

**Example 6.5.4 (The $p$-test):** The integral $\int_1^\infty \frac{1}{x^p} dx$ converges if and only if $p > 1$.

For $p \neq 1$:
$$
\int_1^\infty \frac{1}{x^p} dx = \lim_{b \to \infty} \left[\frac{x^{-p+1}}{-p+1}\right]_1^b = \lim_{b \to \infty} \frac{1}{1-p}\left(b^{1-p} - 1\right)
$$

- If $p > 1$: $1 - p < 0$, so $b^{1-p} \to 0$, and the integral converges to $\frac{1}{p-1}$.
- If $p < 1$: $1 - p > 0$, so $b^{1-p} \to \infty$, and the integral diverges.
- If $p = 1$: As shown in Example 6.5.3, the integral diverges.

**Example 6.5.5:** Evaluate $\int_{-\infty}^\infty \frac{1}{1+x^2} dx$.

$$
\int_{-\infty}^\infty \frac{1}{1+x^2} dx = \lim_{a \to -\infty} \arctan(a) + \lim_{b \to \infty} \left(\arctan(b) - \arctan(0)\right)
$$
$$
= -\frac{\pi}{2} + \frac{\pi}{2} = \pi
$$

## Type II: Unbounded Integrands

**Definition 6.5.6 (Improper Integral, Unbounded Integrand):** If $f$ is continuous on $(a,b]$ but unbounded near $a$, we define:
$$
\int_a^b f(x) \, dx = \lim_{c \to a^+} \int_c^b f(x) \, dx
$$

Similarly, if $f$ is unbounded near $b$:
$$
\int_a^b f(x) \, dx = \lim_{c \to b^-} \int_a^c f(x) \, dx
$$

If $f$ is unbounded at an interior point $c \in (a,b)$:
$$
\int_a^b f(x) \, dx = \int_a^c f(x) \, dx + \int_c^b f(x) \, dx
$$

provided both improper integrals converge.

**Example 6.5.7:** Evaluate $\int_0^1 \frac{1}{\sqrt{x}} dx$.

$$
\int_0^1 \frac{1}{\sqrt{x}} dx = \lim_{c \to 0^+} \int_c^1 \frac{1}{\sqrt{x}} dx = \lim_{c \to 0^+} [2\sqrt{x}]_c^1
$$
$$
= \lim_{c \to 0^+} (2 - 2\sqrt{c}) = 2
$$

The integral converges.

**Example 6.5.8:** Evaluate $\int_0^1 \frac{1}{x^2} dx$.

$$
\int_0^1 \frac{1}{x^2} dx = \lim_{c \to 0^+} \int_c^1 \frac{1}{x^2} dx = \lim_{c \to 0^+} \left[-\frac{1}{x}\right]_c^1
$$
$$
= \lim_{c \to 0^+} \left(-1 + \frac{1}{c}\right) = \infty
$$

The integral diverges.

**Example 6.5.9 (The $p$-test at 0):** The integral $\int_0^1 \frac{1}{x^p} dx$ converges if and only if $p < 1$.

This is the opposite of the behavior at infinity!

**Example 6.5.10:** Evaluate $\int_0^2 \frac{1}{x-1} dx$.

The integrand is unbounded at $x = 1 \in (0,2)$. We split:
$$
\int_0^2 \frac{1}{x-1} dx = \int_0^1 \frac{1}{x-1} dx + \int_1^2 \frac{1}{x-1} dx
$$

For the first integral:
$$
\int_0^1 \frac{1}{x-1} dx = \lim_{c \to 1^-} [\ln|x-1|]_0^c = \lim_{c \to 1^-} (\ln|c-1| - \ln 1) = -\infty
$$

Since one part diverges, the entire integral diverges.

## Comparison Tests

**Theorem 6.5.11 (Comparison Test):** Suppose $0 \leq f(x) \leq g(x)$ for all $x \geq a$.
1. If $\int_a^\infty g(x) \, dx$ converges, then $\int_a^\infty f(x) \, dx$ converges.
2. If $\int_a^\infty f(x) \, dx$ diverges, then $\int_a^\infty g(x) \, dx$ diverges.

**Proof:** For (1), let $F(b) = \int_a^b f$ and $G(b) = \int_a^b g$. Then $F$ and $G$ are increasing, and $F(b) \leq G(b)$ for all $b \geq a$. If $\lim_{b \to \infty} G(b)$ exists, then $G(b)$ is bounded, so $F(b)$ is bounded. Since $F$ is increasing and bounded, it converges. $\square$

**Example 6.5.12:** Determine whether $\int_1^\infty \frac{\sin^2 x}{x^2} dx$ converges.

Since $0 \leq \sin^2 x \leq 1$, we have $0 \leq \frac{\sin^2 x}{x^2} \leq \frac{1}{x^2}$.

Since $\int_1^\infty \frac{1}{x^2} dx$ converges (Example 6.5.2), by the Comparison Test, $\int_1^\infty \frac{\sin^2 x}{x^2} dx$ converges.

**Theorem 6.5.13 (Limit Comparison Test):** Suppose $f, g > 0$ for $x \geq a$ and:
$$
\lim_{x \to \infty} \frac{f(x)}{g(x)} = L \in (0, \infty)
$$

Then $\int_a^\infty f$ and $\int_a^\infty g$ either both converge or both diverge.

**Example 6.5.14:** Determine whether $\int_1^\infty \frac{1}{x^2 + x + 1} dx$ converges.

For large $x$, the integrand behaves like $\frac{1}{x^2}$. More precisely:
$$
\lim_{x \to \infty} \frac{1/(x^2+x+1)}{1/x^2} = \lim_{x \to \infty} \frac{x^2}{x^2+x+1} = 1
$$

Since $\int_1^\infty \frac{1}{x^2} dx$ converges, by the Limit Comparison Test, $\int_1^\infty \frac{1}{x^2+x+1} dx$ converges.

## Absolute and Conditional Convergence

**Definition 6.5.15:** An improper integral $\int_a^\infty f$ is **absolutely convergent** if $\int_a^\infty |f|$ converges. If $\int_a^\infty f$ converges but $\int_a^\infty |f|$ diverges, we say it is **conditionally convergent**.

**Theorem 6.5.16:** If $\int_a^\infty |f|$ converges, then $\int_a^\infty f$ converges.

**Proof:** Use $-|f| \leq f \leq |f|$ and apply the comparison test after adding $|f|$ to all terms. $\square$

**Example 6.5.17:** The integral $\int_1^\infty \frac{\sin x}{x^2} dx$ is absolutely convergent since:
$$
\left|\frac{\sin x}{x^2}\right| \leq \frac{1}{x^2}
$$
and $\int_1^\infty \frac{1}{x^2} dx$ converges.

**Example 6.5.18 (Conditional Convergence):** The integral $\int_1^\infty \frac{\sin x}{x} dx$ converges (this requires integration by parts to prove), but:
$$
\int_1^\infty \left|\frac{\sin x}{x}\right| dx
$$
diverges. Therefore, it is conditionally convergent.

## Special Functions Defined by Improper Integrals

**Example 6.5.19 (The Gamma Function):** For $\alpha > 0$:
$$
\Gamma(\alpha) = \int_0^\infty x^{\alpha-1} e^{-x} dx
$$

This converges for all $\alpha > 0$ and satisfies $\Gamma(\alpha+1) = \alpha\Gamma(\alpha)$ and $\Gamma(n) = (n-1)!$ for $n \in \mathbb{N}$.

**Example 6.5.20 (Gaussian Integral):** The famous result:
$$
\int_{-\infty}^\infty e^{-x^2} dx = \sqrt{\pi}
$$

can be proven using polar coordinates in $\mathbb{R}^2$.

## Exercises

1. Evaluate $\int_0^\infty e^{-ax} dx$ for $a > 0$.

2. Determine convergence: $\int_2^\infty \frac{1}{x\ln x} dx$.

3. Evaluate $\int_0^1 \frac{1}{x^{1/3}} dx$.

4. Use the Comparison Test to determine convergence of $\int_1^\infty \frac{e^{-x}}{x} dx$.

5. Show that $\int_0^\infty \frac{\sin x}{x} dx$ converges. (Hint: Integration by parts.)

6. Determine convergence: $\int_1^\infty \frac{\arctan x}{x^2} dx$.

7. Prove that if $f$ is continuous and $f(x) \geq 0$ for all $x \geq a$, and if $\int_a^\infty f$ converges, then $\lim_{x \to \infty} f(x) = 0$ is not necessarily true. (Find a counterexample.)

8. Evaluate $\int_0^\pi \frac{dx}{\sqrt{\sin x}}$ or show it diverges.

## Conclusion

Improper integrals extend the Riemann integral to unbounded intervals and unbounded functions through limiting processes. The $p$-test provides basic criteria for convergence, while the Comparison and Limit Comparison Tests allow us to determine convergence by relating integrals to simpler ones. The distinction between absolute and conditional convergence parallels that for infinite series. Improper integrals are essential in probability theory (where they define probability densities on unbounded domains), physics (for computing work against infinite-range forces), and in defining special functions like the Gamma function. Understanding when these limiting processes converge is crucial for rigorous application of integration theory.
