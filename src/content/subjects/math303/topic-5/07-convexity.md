---
title: "Convexity"
slug: "convexity"
description: "Convex functions and inequalities"
---

# Convexity

## Introduction

Convex functions are among the most important classes of functions in mathematics, with applications throughout optimization theory, economics, probability, and functional analysis. A convex function has the property that any line segment connecting two points on its graph lies above (or on) the graph itself. This geometric property translates into powerful analytic inequalities, including Jensen's inequality, which generalizes many classical inequalities. This section develops the theory of convex functions and explores their remarkable properties.

## Definition and Basic Properties

**Definition 5.7.1 (Convex Function):** A function $f: I \to \mathbb{R}$ defined on an interval $I$ is **convex** if for all $x, y \in I$ and all $\lambda \in [0,1]$:
$$
f(\lambda x + (1-\lambda)y) \leq \lambda f(x) + (1-\lambda)f(y)
$$

If the inequality is strict for $\lambda \in (0,1)$ and $x \neq y$, we say $f$ is **strictly convex**.

**Definition 5.7.2 (Concave Function):** A function $f$ is **concave** if $-f$ is convex, i.e., if:
$$
f(\lambda x + (1-\lambda)y) \geq \lambda f(x) + (1-\lambda)f(y)
$$

**Geometric Interpretation:** The point $(\lambda x + (1-\lambda)y, f(\lambda x + (1-\lambda)y))$ lies on or below the line segment connecting $(x, f(x))$ and $(y, f(y))$.

**Example 5.7.3:**
- $f(x) = x^2$ is strictly convex on $\mathbb{R}$.
- $f(x) = |x|$ is convex on $\mathbb{R}$ but not strictly convex.
- $f(x) = e^x$ is strictly convex on $\mathbb{R}$.
- $f(x) = \ln x$ is strictly concave on $(0, \infty)$.
- $f(x) = x$ is both convex and concave (affine functions are).

**Proposition 5.7.4 (Basic Properties):**
1. If $f$ and $g$ are convex on $I$ and $\alpha, \beta \geq 0$, then $\alpha f + \beta g$ is convex.
2. If $f_i$ are convex for $i \in \mathcal{I}$ (any index set), then $\sup_i f_i$ is convex (where defined).
3. If $f$ is convex and increasing, and $g$ is convex, then $f \circ g$ is convex.

**Proof:** Exercise. These follow directly from the definition. $\square$

## Characterizations of Convexity

### First Derivative Characterization

**Theorem 5.7.5 (First Derivative Test for Convexity):** Let $f$ be differentiable on an open interval $I$. Then $f$ is convex on $I$ if and only if for all $x, y \in I$:
$$
f(y) \geq f(x) + f'(x)(y - x)
$$

That is, the graph of $f$ lies above all its tangent lines.

**Proof:**
($\Rightarrow$) Assume $f$ is convex. Fix $x, y \in I$ with $x < y$. For $t \in (0,1)$:
$$
f(x + t(y-x)) \leq (1-t)f(x) + tf(y)
$$
$$
\frac{f(x + t(y-x)) - f(x)}{t(y-x)} \leq \frac{f(y) - f(x)}{y - x}
$$

Taking $t \to 0^+$:
$$
f'(x) \leq \frac{f(y) - f(x)}{y - x}
$$

Therefore, $f(y) \geq f(x) + f'(x)(y-x)$.

($\Leftarrow$) Assume $f(y) \geq f(x) + f'(x)(y-x)$ for all $x, y \in I$. Let $x, y \in I$ and $\lambda \in (0,1)$. Set $z = \lambda x + (1-\lambda)y$. Then:
$$
f(x) \geq f(z) + f'(z)(x - z)
$$
$$
f(y) \geq f(z) + f'(z)(y - z)
$$

Multiplying the first by $\lambda$ and the second by $(1-\lambda)$ and adding:
$$
\lambda f(x) + (1-\lambda)f(y) \geq f(z) + f'(z)[\lambda(x-z) + (1-\lambda)(y-z)]
$$

Since $z = \lambda x + (1-\lambda)y$, we have $\lambda(x-z) + (1-\lambda)(y-z) = 0$, so:
$$
\lambda f(x) + (1-\lambda)f(y) \geq f(z) = f(\lambda x + (1-\lambda)y)
$$
$\square$

**Corollary 5.7.6:** If $f$ is differentiable, then $f$ is convex if and only if $f'$ is monotone increasing.

**Proof:** From Theorem 5.7.5, for $x < y$:
$$
f'(x) \leq \frac{f(y) - f(x)}{y - x} \leq f'(y)
$$
by applying the inequality at both $x$ and $y$. $\square$

### Second Derivative Characterization

**Theorem 5.7.7 (Second Derivative Test for Convexity):** Let $f$ be twice differentiable on an open interval $I$. Then:
1. $f$ is convex on $I$ if and only if $f''(x) \geq 0$ for all $x \in I$.
2. If $f''(x) > 0$ for all $x \in I$, then $f$ is strictly convex.

**Proof:** This follows from Corollary 5.7.6 and the fact that $f'$ is increasing if and only if $(f')' = f'' \geq 0$. $\square$

**Example 5.7.8:** Determine the convexity of $f(x) = x^4 - 2x^2 + 1$ on $\mathbb{R}$.

We have $f''(x) = 12x^2 - 4 = 4(3x^2 - 1)$.

- For $|x| < 1/\sqrt{3}$: $f''(x) < 0$, so $f$ is concave.
- For $|x| > 1/\sqrt{3}$: $f''(x) > 0$, so $f$ is convex.

The points $x = \pm 1/\sqrt{3}$ are inflection points.

## Jensen's Inequality

**Theorem 5.7.9 (Jensen's Inequality, Finite Form):** Let $f$ be convex on $I$. For any $x_1, \ldots, x_n \in I$ and $\lambda_1, \ldots, \lambda_n \geq 0$ with $\sum_{i=1}^n \lambda_i = 1$:
$$
f\left(\sum_{i=1}^n \lambda_i x_i\right) \leq \sum_{i=1}^n \lambda_i f(x_i)
$$

**Proof:** By induction on $n$. For $n = 2$, this is the definition of convexity. Assume true for $n$. For $n+1$ points, let $\mu = \sum_{i=1}^n \lambda_i$ and assume $\mu > 0$ (otherwise trivial). Then:
$$
\sum_{i=1}^{n+1} \lambda_i x_i = \mu \left(\sum_{i=1}^n \frac{\lambda_i}{\mu} x_i\right) + \lambda_{n+1} x_{n+1}
$$

By convexity ($n=2$ case):
$$
f\left(\sum_{i=1}^{n+1} \lambda_i x_i\right) \leq \mu f\left(\sum_{i=1}^n \frac{\lambda_i}{\mu} x_i\right) + \lambda_{n+1} f(x_{n+1})
$$

By the induction hypothesis:
$$
\leq \mu \sum_{i=1}^n \frac{\lambda_i}{\mu} f(x_i) + \lambda_{n+1} f(x_{n+1}) = \sum_{i=1}^{n+1} \lambda_i f(x_i)
$$
$\square$

**Corollary 5.7.10 (Arithmetic-Geometric Mean Inequality):** For $x_1, \ldots, x_n > 0$:
$$
\sqrt[n]{x_1 \cdots x_n} \leq \frac{x_1 + \cdots + x_n}{n}
$$

**Proof:** Apply Jensen's inequality to the concave function $f(x) = \ln x$ with $\lambda_i = 1/n$:
$$
\ln\left(\frac{x_1 + \cdots + x_n}{n}\right) \geq \frac{1}{n}\sum_{i=1}^n \ln x_i = \ln\sqrt[n]{x_1 \cdots x_n}
$$

Exponentiating gives the result. $\square$

**Example 5.7.11 (Cauchy-Schwarz):** For $a_i, b_i > 0$, prove:
$$
\sum_{i=1}^n a_i b_i \leq \sqrt{\sum_{i=1}^n a_i^2} \sqrt{\sum_{i=1}^n b_i^2}
$$

This follows from applying Jensen to $f(x) = x^2$ (convex).

## Important Examples and Applications

**Example 5.7.12 (Exponential Function):** Show that $e^x$ is strictly convex.

We have $f''(x) = e^x > 0$ for all $x$, so $f$ is strictly convex.

**Example 5.7.13 (Logarithm):** Show that $\ln x$ is strictly concave on $(0, \infty)$.

We have $f''(x) = -1/x^2 < 0$ for all $x > 0$, so $f$ is strictly concave.

**Example 5.7.14 (Power Functions):** For $f(x) = x^p$ on $(0, \infty)$:
- If $p \geq 1$ or $p \leq 0$, then $f$ is convex.
- If $0 < p < 1$, then $f$ is concave.

**Proof:** We have $f''(x) = p(p-1)x^{p-2}$. For $x > 0$:
- If $p > 1$: $f''(x) > 0$ (convex).
- If $0 < p < 1$: $f''(x) < 0$ (concave).
- If $p < 0$: $(p-1) < -1$, so $p(p-1) > 0$ (convex).
$\square$

### Application to Optimization

**Theorem 5.7.15:** If $f$ is strictly convex on $I$ and has a local minimum at $c \in I$, then $c$ is the unique global minimum.

**Proof:** Suppose $f$ has a local minimum at $c$ and $f(d) < f(c)$ for some $d \in I$. For $\lambda \in (0,1)$:
$$
f(\lambda c + (1-\lambda)d) < \lambda f(c) + (1-\lambda)f(d) < \lambda f(c) + (1-\lambda)f(c) = f(c)
$$

For $\lambda$ sufficiently close to 1, $\lambda c + (1-\lambda)d$ is arbitrarily close to $c$, contradicting that $c$ is a local minimum. $\square$

This result is fundamental in convex optimization: local minima are global minima.

## Classical Inequalities from Convexity

**Example 5.7.16 (Young's Inequality):** For $a, b > 0$ and $p, q > 1$ with $1/p + 1/q = 1$:
$$
ab \leq \frac{a^p}{p} + \frac{b^q}{q}
$$

**Proof:** Apply Jensen to $f(x) = e^x$ (convex):
$$
e^{\frac{\ln a^p}{p} + \frac{\ln b^q}{q}} \leq \frac{e^{\ln a^p}}{p} + \frac{e^{\ln b^q}}{q} = \frac{a^p}{p} + \frac{b^q}{q}
$$

The left side equals $e^{\ln a + \ln b} = ab$. $\square$

**Example 5.7.17 (Hölder's Inequality):** For $a_i, b_i \geq 0$ and $p, q > 1$ with $1/p + 1/q = 1$:
$$
\sum_{i=1}^n a_i b_i \leq \left(\sum_{i=1}^n a_i^p\right)^{1/p} \left(\sum_{i=1}^n b_i^q\right)^{1/q}
$$

This follows from applying Young's inequality to normalized sequences.

**Example 5.7.18 (Information Inequality):** For probability distributions $p_i, q_i > 0$ with $\sum p_i = \sum q_i = 1$:
$$
\sum_{i=1}^n p_i \ln\left(\frac{p_i}{q_i}\right) \geq 0
$$

with equality if and only if $p_i = q_i$ for all $i$.

**Proof:** Apply Jensen to $f(x) = -\ln x$ (convex) with weights $p_i$:
$$
-\ln\left(\sum_{i=1}^n p_i \frac{q_i}{p_i}\right) \leq \sum_{i=1}^n p_i \left(-\ln\frac{q_i}{p_i}\right) = \sum_{i=1}^n p_i \ln\frac{p_i}{q_i}
$$

Since $\sum p_i (q_i/p_i) = \sum q_i = 1$, the left side is 0. $\square$

This is the relative entropy or Kullback-Leibler divergence, fundamental in information theory.

## Midpoint Convexity

**Definition 5.7.19:** A function $f$ is **midpoint convex** if for all $x, y \in I$:
$$
f\left(\frac{x+y}{2}\right) \leq \frac{f(x) + f(y)}{2}
$$

**Remark:** If $f$ is continuous, midpoint convexity is equivalent to convexity. However, there exist discontinuous midpoint convex functions that are not convex (they require the Axiom of Choice to construct).

## Exercises

1. Prove that if $f$ and $g$ are convex, then $\max\{f, g\}$ is convex.

2. Show that $f(x) = x \ln x$ (with $f(0) = 0$) is strictly convex on $[0, \infty)$.

3. Prove the weighted AM-GM inequality: for $x_i > 0$ and $\lambda_i > 0$ with $\sum \lambda_i = 1$:
$$
\prod_{i=1}^n x_i^{\lambda_i} \leq \sum_{i=1}^n \lambda_i x_i
$$

4. Use Jensen's inequality to prove that for $x_1, \ldots, x_n > 0$:
$$
\frac{n}{\sum_{i=1}^n 1/x_i} \leq \sqrt[n]{\prod_{i=1}^n x_i} \leq \frac{\sum_{i=1}^n x_i}{n} \leq \sqrt{\frac{\sum_{i=1}^n x_i^2}{n}}
$$

(Harmonic $\leq$ Geometric $\leq$ Arithmetic $\leq$ Quadratic means)

5. Determine the values of $\alpha$ for which $f(x) = x^\alpha$ is convex on $(0, \infty)$.

6. Prove that if $f$ is convex and $f(x_0) = 0$ for some $x_0$, then $f(x) \geq f'(x_0)(x - x_0)$ for all $x$ (if $f$ is differentiable).

7. Show that the function $f(x) = -\sqrt{1-x^2}$ is concave on $[-1, 1]$.

8. Use convexity to prove Bernoulli's inequality: $(1+x)^n \geq 1 + nx$ for $x > -1$ and $n \geq 1$.

## Conclusion

Convex functions form a rich and beautiful class with remarkable properties. The geometric definition—that line segments lie above the graph—translates into powerful analytic tools through the derivative characterizations and Jensen's inequality. The class of convex functions is closed under many operations, making it robust for applications. In optimization theory, convexity guarantees that local minima are global, greatly simplifying analysis. The classical inequalities of analysis (AM-GM, Cauchy-Schwarz, Hölder) all follow from convexity considerations. Understanding convex functions is essential for advanced work in optimization, probability theory, economics, and many other fields.
