---
title: "Riemann-Stieltjes Integration"
slug: "riemann-stieltjes"
description: "Generalization of Riemann integration"
---

# Riemann-Stieltjes Integration

## Introduction

The Riemann-Stieltjes integral is a powerful generalization of the Riemann integral that allows for integration with respect to any monotone function, not just the identity function. This generalization unifies the treatment of discrete and continuous probability distributions, provides a framework for defining measures, and has applications in functional analysis and physics. The key idea is to replace the interval lengths $\Delta x_i$ in Riemann sums with increments $\Delta \alpha_i$ of an integrator function $\alpha$.

## Definition and Motivation

In the standard Riemann integral, we sum $f(t_i) \Delta x_i$ where $\Delta x_i = x_i - x_{i-1}$ represents the length of subintervals. The Riemann-Stieltjes integral replaces these lengths with $\Delta \alpha_i = \alpha(x_i) - \alpha(x_{i-1})$ for some function $\alpha$.

**Definition 6.6.1 (Riemann-Stieltjes Sum):** Given functions $f$ and $\alpha$ on $[a,b]$, a partition $P = \{x_0, \ldots, x_n\}$, and sample points $t_i \in [x_{i-1}, x_i]$, the **Riemann-Stieltjes sum** is:
$$
S(f, P, \alpha, \{t_i\}) = \sum_{i=1}^n f(t_i) \Delta \alpha_i
$$
where $\Delta \alpha_i = \alpha(x_i) - \alpha(x_{i-1})$.

**Definition 6.6.2 (Riemann-Stieltjes Integral):** We say $f$ is **Riemann-Stieltjes integrable** with respect to $\alpha$ on $[a,b]$ if there exists $I \in \mathbb{R}$ such that for every $\epsilon > 0$, there exists $\delta > 0$ with:
$$
|S(f, P, \alpha, \{t_i\}) - I| < \epsilon
$$
for all partitions $P$ with $\|P\| < \delta$ and all choices of sample points. We write:
$$
I = \int_a^b f \, d\alpha \quad \text{or} \quad I = \int_a^b f(x) \, d\alpha(x)
$$

**Remark:** When $\alpha(x) = x$, we recover the ordinary Riemann integral:
$$
\int_a^b f \, dx = \int_a^b f(x) \, dx
$$

## Basic Properties

**Theorem 6.6.3 (Linearity in $f$):** If $f$ and $g$ are Riemann-Stieltjes integrable with respect to $\alpha$ on $[a,b]$, then for constants $c_1, c_2$:
$$
\int_a^b (c_1 f + c_2 g) \, d\alpha = c_1 \int_a^b f \, d\alpha + c_2 \int_a^b g \, d\alpha
$$

**Theorem 6.6.4 (Linearity in $\alpha$):** If $f$ is integrable with respect to both $\alpha$ and $\beta$, then:
$$
\int_a^b f \, d(c_1\alpha + c_2\beta) = c_1 \int_a^b f \, d\alpha + c_2 \int_a^b f \, d\beta
$$

**Theorem 6.6.5 (Additivity):** If $c \in (a,b)$ and $f$ is integrable with respect to $\alpha$ on $[a,b]$, then:
$$
\int_a^b f \, d\alpha = \int_a^c f \, d\alpha + \int_c^b f \, d\alpha
$$

## Integration with Respect to a Step Function

**Definition 6.6.6:** A function $\alpha$ is a **step function** if it is constant except for finitely many jump discontinuities.

**Example 6.6.7:** Let $\alpha(x) = H(x-c)$ where $H$ is the Heaviside function:
$$
H(x) = \begin{cases} 0 & x < 0 \\ 1 & x \geq 0 \end{cases}
$$

For any continuous function $f$ on $[a,b]$ with $a < c < b$:
$$
\int_a^b f(x) \, d\alpha(x) = f(c)
$$

This follows because $\Delta \alpha_i = 0$ except for the subinterval containing $c$, where $\Delta \alpha = 1$.

**General Result:** If $\alpha$ has jumps of size $j_k$ at points $c_k$ in $[a,b]$, and $f$ is continuous, then:
$$
\int_a^b f \, d\alpha = \sum_k j_k f(c_k)
$$

This connects Riemann-Stieltjes integration to discrete sums.

## Integration by Parts

**Theorem 6.6.8 (Integration by Parts):** If $f$ and $\alpha$ have bounded variation on $[a,b]$ and $\int_a^b f \, d\alpha$ exists, then $\int_a^b \alpha \, df$ exists and:
$$
\int_a^b f \, d\alpha = f(b)\alpha(b) - f(a)\alpha(a) - \int_a^b \alpha \, df
$$

**Example 6.6.9:** Let $f(x) = x^2$ and $\alpha(x) = x^3$ on $[0,1]$. Using integration by parts:
$$
\int_0^1 x^2 \, d(x^3) = 1 \cdot 1 - 0 \cdot 0 - \int_0^1 x^3 \, d(x^2)
$$
$$
= 1 - \int_0^1 x^3 \cdot 2x \, dx = 1 - 2\int_0^1 x^4 \, dx = 1 - \frac{2}{5} = \frac{3}{5}
$$

Alternatively, directly:
$$
\int_0^1 x^2 \, d(x^3) = \int_0^1 x^2 \cdot 3x^2 \, dx = 3\int_0^1 x^4 \, dx = \frac{3}{5}
$$

## Change of Variables

**Theorem 6.6.10:** If $\alpha$ is continuous and strictly increasing, and $f$ is continuous, then:
$$
\int_a^b f(x) \, d\alpha(x) = \int_{\alpha(a)}^{\alpha(b)} f(\alpha^{-1}(u)) \, du
$$

**Example 6.6.11:** Let $f(x) = x$ and $\alpha(x) = x^2$ on $[0,2]$. Then:
$$
\int_0^2 x \, d(x^2) = \int_0^4 \sqrt{u} \, du = \frac{2}{3}u^{3/2}\bigg|_0^4 = \frac{16}{3}
$$

Or directly: $\int_0^2 x \cdot 2x \, dx = 2\int_0^2 x^2 \, dx = \frac{16}{3}$.

## When $\alpha$ is Differentiable

**Theorem 6.6.12:** If $\alpha$ is differentiable with continuous derivative $\alpha'$, and $f$ is Riemann integrable, then:
$$
\int_a^b f \, d\alpha = \int_a^b f(x) \alpha'(x) \, dx
$$

**Proof:** In each subinterval, by the Mean Value Theorem:
$$
\Delta \alpha_i = \alpha(x_i) - \alpha(x_{i-1}) = \alpha'(\xi_i) \Delta x_i
$$

for some $\xi_i \in (x_{i-1}, x_i)$. As the mesh goes to zero, the Riemann-Stieltjes sum approaches $\int_a^b f(x)\alpha'(x) \, dx$. $\square$

**Example 6.6.13:** Compute $\int_0^1 x^2 \, d(\sin x)$.

Since $(\sin x)' = \cos x$:
$$
\int_0^1 x^2 \, d(\sin x) = \int_0^1 x^2 \cos x \, dx
$$

Using integration by parts twice:
$$
= x^2 \sin x\big|_0^1 - \int_0^1 2x \sin x \, dx
$$
$$
= \sin 1 - 2[-x\cos x\big|_0^1 + \int_0^1 \cos x \, dx]
$$
$$
= \sin 1 + 2\cos 1 - 2\sin 1 = 2\cos 1 - \sin 1
$$

## Existence Conditions

**Theorem 6.6.14:** If $f$ is continuous on $[a,b]$ and $\alpha$ is of bounded variation, then $\int_a^b f \, d\alpha$ exists.

**Theorem 6.6.15:** If $f$ and $\alpha$ have no common discontinuities and both are of bounded variation, then $\int_a^b f \, d\alpha$ exists.

**Example 6.6.16 (Nonexistence):** Let $f = H(x-1/2)$ and $\alpha = H(x-1/2)$ on $[0,1]$. Both have a jump at $x = 1/2$. The integral $\int_0^1 f \, d\alpha$ does not exist because the Riemann-Stieltjes sum depends on whether the sample point is to the left or right of 1/2.

## Applications

### Probability Theory

In probability, the Riemann-Stieltjes integral unifies discrete and continuous random variables. If $F$ is a cumulative distribution function, the expected value of a random variable $X$ is:
$$
E[g(X)] = \int_{-\infty}^\infty g(x) \, dF(x)
$$

This formula works whether $X$ is discrete (F is a step function) or continuous ($F$ is absolutely continuous).

### Physics

The work done by a variable force $F(x)$ along a path can be expressed using Stieltjes integration when the path is not smooth.

### Measure Theory

The Riemann-Stieltjes integral provides motivation for the Lebesgue-Stieltjes integral and general measure theory, where $\alpha$ determines a measure.

## Exercises

1. Compute $\int_0^1 x \, d(x^2 + x)$.

2. If $\alpha(x) = \lfloor x \rfloor$ (greatest integer function), compute $\int_0^3 x^2 \, d\alpha$.

3. Prove that if $\alpha$ is constant on $[a,b]$, then $\int_a^b f \, d\alpha = 0$ for any $f$.

4. Let $\alpha$ have a single jump of size $c$ at $x = p \in (a,b)$ and be continuous elsewhere. Show that for continuous $f$:
$$
\int_a^b f \, d\alpha = cf(p)
$$

5. Compute $\int_0^\pi \cos x \, d(\sin x)$ using the change of variable formula.

6. Prove the integration by parts formula for Riemann-Stieltjes integrals.

7. If $f$ and $\alpha$ are both strictly increasing, show that $\int_a^b f \, d\alpha \geq 0$.

8. Find an example where $\int_a^b f \, d\alpha$ exists but $\int_a^b \alpha \, df$ does not.

## Conclusion

The Riemann-Stieltjes integral generalizes the Riemann integral by allowing integration with respect to any function of bounded variation, not just the identity. This framework unifies discrete sums and continuous integrals, providing a powerful tool in probability theory, physics, and analysis. When the integrator $\alpha$ is differentiable, the Stieltjes integral reduces to an ordinary weighted Riemann integral. The theory demonstrates the flexibility of integration concepts and serves as a stepping stone toward measure theory and the Lebesgue integral.
