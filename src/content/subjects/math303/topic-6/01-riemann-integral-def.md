---
title: "Riemann Integral: Definition"
slug: "riemann-integral-def"
description: "Riemann sums and the definition of the Riemann integral"
---

# Riemann Integral: Definition

## Motivation

The integral generalizes the notion of area under a curve. We approximate the area using rectangles and take a limit.

## Partitions

**Definition:** A **partition** of $[a,b]$ is a finite set $P = \{x_0, x_1, \ldots, x_n\}$ with:
$$
a = x_0 < x_1 < \cdots < x_n = b
$$

The **mesh** (or **norm**) of $P$ is $\|P\| = \max\{\Delta x_i : i = 1, \ldots, n\}$ where $\Delta x_i = x_i - x_{i-1}$.

## Riemann Sums

**Definition:** Given partition $P$ and sample points $t_i \in [x_{i-1}, x_i]$, the **Riemann sum** is:
$$
S(f, P, \{t_i\}) = \sum_{i=1}^{n} f(t_i) \Delta x_i
$$

## The Riemann Integral

**Definition:** $f$ is **Riemann integrable** on $[a,b]$ if there exists $I$ such that for every $\epsilon > 0$, there exists $\delta > 0$ such that for any partition $P$ with $\|P\| < \delta$ and any choice of sample points:
$$
|S(f, P, \{t_i\}) - I| < \epsilon
$$

We write $I = \int_a^b f(x) \, dx$ or $I = \int_a^b f$.

## Upper and Lower Sums

**Definition:** For partition $P$:
$$
M_i = \sup\{f(x) : x \in [x_{i-1}, x_i]\}, \quad m_i = \inf\{f(x) : x \in [x_{i-1}, x_i]\}
$$

**Upper sum:** $U(f, P) = \sum M_i \Delta x_i$

**Lower sum:** $L(f, P) = \sum m_i \Delta x_i$

## Darboux Criterion

**Theorem 6.1 (Darboux):** $f$ is Riemann integrable on $[a,b]$ if and only if:
$$
\inf_P U(f,P) = \sup_P L(f,P)
$$

This common value is $\int_a^b f$.

## Examples

**Example 1:** $f(x) = c$ (constant) is integrable with $\int_a^b c \, dx = c(b-a)$.

**Example 2:** $f(x) = x$ is integrable with $\int_a^b x \, dx = \frac{b^2 - a^2}{2}$.

**Example 3:** The Dirichlet function $f(x) = \mathbf{1}_{\mathbb{Q}}$ is not Riemann integrable on $[0,1]$ (upper sums = 1, lower sums = 0).

## Exercises

1. Prove $\int_0^1 x^2 \, dx = 1/3$ using Riemann sums.

2. Show that if $f$ is Riemann integrable, it is bounded.

3. Prove that refining a partition decreases upper sums and increases lower sums.

## Conclusion

The Riemann integral formalizes area via limits of approximating sums. The Darboux criterion provides a practical test for integrability.
