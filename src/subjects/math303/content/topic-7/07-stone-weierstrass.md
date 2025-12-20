---
title: "Stone-Weierstrass Theorem"
slug: "stone-weierstrass"
description: "Approximation by polynomials"
---

# Stone-Weierstrass Theorem

## Introduction

One of the most profound questions in analysis is: which functions can be approximated by simpler functions? The Weierstrass approximation theorem, proved in 1885, answers this question in a spectacular way: every continuous function on a closed bounded interval can be uniformly approximated by polynomials. This theorem has far-reaching consequences in analysis, showing that despite their simplicity, polynomials are dense in the space of continuous functions.

The Stone-Weierstrass theorem, proved by Marshall Stone in 1937, is a vast generalization to arbitrary algebras of continuous functions. While we will state the general version, our focus will be on the classical Weierstrass theorem and its constructive proof.

## The Weierstrass Approximation Theorem

**Theorem 7.1 (Weierstrass Approximation Theorem):** Let $f: [a, b] \to \mathbb{R}$ be continuous. For any $\epsilon > 0$, there exists a polynomial $p(x)$ such that:
$$
\sup_{x \in [a,b]} |f(x) - p(x)| < \epsilon
$$

In other words, $f$ can be uniformly approximated by polynomials on $[a, b]$.

**Interpretation:** The set of all polynomials is dense in $C([a, b])$, the space of continuous functions on $[a, b]$, with respect to the uniform (supremum) norm.

**Remark:** The approximating polynomial depends on $\epsilon$; smaller $\epsilon$ typically requires higher degree.

**Example 7.2:** The function $f(x) = |x|$ on $[-1, 1]$ is continuous but not differentiable at 0. Nevertheless, it can be uniformly approximated by polynomials (which are infinitely differentiable). This shows that differentiability is not preserved under uniform approximation, only continuity is.

## Proof Using Bernstein Polynomials

We will prove Theorem 7.1 using Bernstein polynomials, which provide an explicit constructive approximation.

**Definition 7.3 (Bernstein Polynomials):** For a function $f: [0, 1] \to \mathbb{R}$ and $n \in \mathbb{N}$, the $n$-th Bernstein polynomial is defined by:
$$
B_n(f)(x) = \sum_{k=0}^{n} f\left(\frac{k}{n}\right) \binom{n}{k} x^k (1-x)^{n-k}
$$

**Lemma 7.4:** For $f(x) = 1$, $f(x) = x$, and $f(x) = x^2$, we have:
1. $B_n(1)(x) = 1$
2. $B_n(x)(x) = x$
3. $B_n(x^2)(x) = x^2 + \frac{x(1-x)}{n}$

**Proof:**
(1) Using the binomial theorem:
$$
B_n(1)(x) = \sum_{k=0}^{n} \binom{n}{k} x^k (1-x)^{n-k} = (x + (1-x))^n = 1
$$

(2) We have:
$$
B_n(x)(x) = \sum_{k=0}^{n} \frac{k}{n} \binom{n}{k} x^k (1-x)^{n-k}
$$

Using the identity $k \binom{n}{k} = n \binom{n-1}{k-1}$:
$$
B_n(x)(x) = \sum_{k=1}^{n} \frac{k}{n} \binom{n}{k} x^k (1-x)^{n-k} = x \sum_{k=1}^{n} \binom{n-1}{k-1} x^{k-1} (1-x)^{n-k}
$$

Substituting $j = k-1$:
$$
B_n(x)(x) = x \sum_{j=0}^{n-1} \binom{n-1}{j} x^j (1-x)^{n-1-j} = x \cdot (x + (1-x))^{n-1} = x
$$

(3) The calculation is similar but more involved. Using $k^2 \binom{n}{k} = n(n-1) \binom{n-2}{k-2} + n \binom{n-1}{k-1}$, one can show:
$$
B_n(x^2)(x) = x^2 + \frac{x(1-x)}{n}
$$

We omit the details. $\square$

**Theorem 7.5:** If $f: [0, 1] \to \mathbb{R}$ is continuous, then $B_n(f) \rightrightarrows f$ on $[0, 1]$ as $n \to \infty$.

**Proof:** Since $f$ is continuous on the compact set $[0, 1]$, it is uniformly continuous. Let $\epsilon > 0$. Choose $\delta > 0$ such that:
$$
|x - y| < \delta \implies |f(x) - f(y)| < \frac{\epsilon}{2}
$$

Also, $f$ is bounded: $|f(x)| \leq M$ for all $x \in [0, 1]$.

For any $x \in [0, 1]$:
$$
\begin{align}
|B_n(f)(x) - f(x)| &= \left|\sum_{k=0}^{n} f\left(\frac{k}{n}\right) \binom{n}{k} x^k (1-x)^{n-k} - f(x) \sum_{k=0}^{n} \binom{n}{k} x^k (1-x)^{n-k}\right| \\
&= \left|\sum_{k=0}^{n} \left[f\left(\frac{k}{n}\right) - f(x)\right] \binom{n}{k} x^k (1-x)^{n-k}\right| \\
&\leq \sum_{k=0}^{n} \left|f\left(\frac{k}{n}\right) - f(x)\right| \binom{n}{k} x^k (1-x)^{n-k}
\end{align}
$$

Split the sum into two parts: terms where $\left|\frac{k}{n} - x\right| < \delta$ and terms where $\left|\frac{k}{n} - x\right| \geq \delta$.

For the first part (where $\left|\frac{k}{n} - x\right| < \delta$):
$$
\sum_{\left|\frac{k}{n} - x\right| < \delta} \left|f\left(\frac{k}{n}\right) - f(x)\right| \binom{n}{k} x^k (1-x)^{n-k} < \frac{\epsilon}{2} \sum_{k=0}^{n} \binom{n}{k} x^k (1-x)^{n-k} = \frac{\epsilon}{2}
$$

For the second part (where $\left|\frac{k}{n} - x\right| \geq \delta$):
$$
\sum_{\left|\frac{k}{n} - x\right| \geq \delta} \left|f\left(\frac{k}{n}\right) - f(x)\right| \binom{n}{k} x^k (1-x)^{n-k} \leq 2M \sum_{\left|\frac{k}{n} - x\right| \geq \delta} \binom{n}{k} x^k (1-x)^{n-k}
$$

For the terms in the second sum, $\left(\frac{k}{n} - x\right)^2 \geq \delta^2$. Therefore:
$$
\sum_{\left|\frac{k}{n} - x\right| \geq \delta} \binom{n}{k} x^k (1-x)^{n-k} \leq \frac{1}{\delta^2} \sum_{k=0}^{n} \left(\frac{k}{n} - x\right)^2 \binom{n}{k} x^k (1-x)^{n-k}
$$

Now:
$$
\sum_{k=0}^{n} \left(\frac{k}{n} - x\right)^2 \binom{n}{k} x^k (1-x)^{n-k} = B_n(x^2)(x) - 2x B_n(x)(x) + x^2 B_n(1)(x)
$$

Using Lemma 7.4:
$$
= x^2 + \frac{x(1-x)}{n} - 2x \cdot x + x^2 \cdot 1 = \frac{x(1-x)}{n} \leq \frac{1}{4n}
$$

(The maximum of $x(1-x)$ on $[0, 1]$ is $\frac{1}{4}$.)

Therefore:
$$
\sum_{\left|\frac{k}{n} - x\right| \geq \delta} \binom{n}{k} x^k (1-x)^{n-k} \leq \frac{1}{\delta^2} \cdot \frac{1}{4n}
$$

Choose $N$ such that $\frac{2M}{4n\delta^2} < \frac{\epsilon}{2}$ for all $n \geq N$, i.e., $n > \frac{M}{2\epsilon \delta^2}$.

Then for $n \geq N$:
$$
|B_n(f)(x) - f(x)| < \frac{\epsilon}{2} + 2M \cdot \frac{1}{4n\delta^2} < \frac{\epsilon}{2} + \frac{\epsilon}{2} = \epsilon
$$

Since this holds for all $x \in [0, 1]$, we have $\sup_{x \in [0,1]} |B_n(f)(x) - f(x)| < \epsilon$ for all $n \geq N$. $\square$

**Corollary 7.6 (Weierstrass Approximation Theorem on $[0, 1]$):** Every continuous function $f: [0, 1] \to \mathbb{R}$ can be uniformly approximated by polynomials.

**Proof:** The Bernstein polynomials $B_n(f)$ are polynomials that converge uniformly to $f$. $\square$

**Proof of Theorem 7.1 (General Interval):** For an arbitrary interval $[a, b]$, use the linear transformation:
$$
t = \frac{x - a}{b - a}
$$

This maps $[a, b]$ to $[0, 1]$. If $f: [a, b] \to \mathbb{R}$ is continuous, then $g(t) = f(a + (b-a)t)$ is continuous on $[0, 1]$.

By Corollary 7.6, there exists a polynomial $q(t)$ such that $\sup_{t \in [0,1]} |g(t) - q(t)| < \epsilon$.

Define $p(x) = q\left(\frac{x-a}{b-a}\right)$. Then $p$ is a polynomial in $x$, and:
$$
\sup_{x \in [a,b]} |f(x) - p(x)| = \sup_{t \in [0,1]} |g(t) - q(t)| < \epsilon
$$
$\square$

## Applications

**Example 7.7:** The function $f(x) = e^x$ on $[0, 1]$ can be approximated by polynomials. While we know the Taylor series $\sum_{n=0}^{\infty} \frac{x^n}{n!}$ converges to $e^x$, the Weierstrass theorem provides an alternative: the Bernstein polynomials also approximate $e^x$, though they converge more slowly than the Taylor series.

**Example 7.8:** The function $f(x) = \sqrt{x}$ on $[0, 1]$ is continuous but not differentiable at 0. Nevertheless, it can be uniformly approximated by polynomials (which are differentiable everywhere).

**Example 7.9 (Numerical Integration):** If we want to compute $\int_a^b f(x) \, dx$ and $f$ is complicated, we can approximate $f$ by a polynomial $p$ and compute $\int_a^b p(x) \, dx$ instead. The error is:
$$
\left|\int_a^b f(x) \, dx - \int_a^b p(x) \, dx\right| \leq (b-a) \sup_{x \in [a,b]} |f(x) - p(x)|
$$

If $p$ approximates $f$ to within $\epsilon$, the integration error is at most $(b-a)\epsilon$.

## Trigonometric Polynomials

A related question: can we approximate continuous periodic functions by trigonometric polynomials?

**Definition 7.10:** A **trigonometric polynomial** is a function of the form:
$$
T(x) = a_0 + \sum_{k=1}^{n} (a_k \cos(kx) + b_k \sin(kx))
$$

**Theorem 7.11 (Weierstrass Approximation Theorem for Periodic Functions):** If $f: \mathbb{R} \to \mathbb{R}$ is continuous and $2\pi$-periodic, then for any $\epsilon > 0$, there exists a trigonometric polynomial $T$ such that:
$$
\sup_{x \in \mathbb{R}} |f(x) - T(x)| < \epsilon
$$

**Proof Sketch:** This follows from the Stone-Weierstrass theorem applied to the algebra of trigonometric polynomials on the circle. Alternatively, one can use convolution with approximate identities (Fejér kernels). $\square$

This theorem is fundamental to Fourier analysis, showing that trigonometric polynomials (finite Fourier series) are dense in the space of continuous periodic functions.

## The Stone-Weierstrass Theorem (General Version)

We now state the general Stone-Weierstrass theorem, which applies to algebras of continuous functions.

**Definition 7.12:** Let $X$ be a compact Hausdorff space. A subset $\mathcal{A} \subseteq C(X)$ (the space of continuous real-valued functions on $X$) is called an **algebra** if:
1. $1 \in \mathcal{A}$ (the constant function 1)
2. If $f, g \in \mathcal{A}$, then $f + g \in \mathcal{A}$ and $fg \in \mathcal{A}$
3. If $f \in \mathcal{A}$ and $c \in \mathbb{R}$, then $cf \in \mathcal{A}$

An algebra $\mathcal{A}$ **separates points** if for any $x \neq y$ in $X$, there exists $f \in \mathcal{A}$ such that $f(x) \neq f(y)$.

**Theorem 7.13 (Stone-Weierstrass Theorem):** Let $X$ be a compact Hausdorff space, and let $\mathcal{A}$ be an algebra of continuous real-valued functions on $X$. If:
1. $\mathcal{A}$ contains the constant functions
2. $\mathcal{A}$ separates points

Then $\mathcal{A}$ is dense in $C(X)$ with respect to the supremum norm. That is, the closure of $\mathcal{A}$ is all of $C(X)$.

**Proof:** The proof is beyond the scope of this course, but it involves showing that $\mathcal{A}$ is closed under taking absolute values and maxima/minima, then using a partition of unity argument. $\square$

**Application to Weierstrass Theorem:** Take $X = [a, b]$ and $\mathcal{A}$ = the set of all polynomials on $[a, b]$. Then:
1. $\mathcal{A}$ contains constant functions (polynomials of degree 0)
2. $\mathcal{A}$ separates points: for $x \neq y$, the polynomial $p(t) = t$ satisfies $p(x) \neq p(y)$

By the Stone-Weierstrass theorem, $\mathcal{A}$ is dense in $C([a, b])$, which is exactly the Weierstrass approximation theorem.

## Counterexamples and Limitations

**Example 7.14 (Necessity of Compactness):** On $\mathbb{R}$, the function $f(x) = \frac{1}{1 + x^2}$ cannot be uniformly approximated by polynomials. Any polynomial $p(x)$ satisfies $|p(x)| \to \infty$ as $|x| \to \infty$, but $f(x) \to 0$. Therefore, $\sup_{x \in \mathbb{R}} |f(x) - p(x)| = \infty$ for any polynomial $p$.

This shows that compactness of the domain is essential.

**Example 7.15 (Necessity of Separating Points):** Let $X = [0, 1]$ and $\mathcal{A}$ = the set of constant functions. Then $\mathcal{A}$ is an algebra but does not separate points. The closure of $\mathcal{A}$ is just the constant functions, not all of $C([0, 1])$.

**Example 7.16 (Complex Version):** For complex-valued functions, the Stone-Weierstrass theorem requires the algebra to be closed under complex conjugation. For instance, the algebra generated by $z$ on the unit circle in $\mathbb{C}$ (i.e., polynomials in $z$ with no $\bar{z}$) is not dense in $C(S^1)$. One needs both $z$ and $\bar{z}$ to approximate all continuous functions.

## Quantitative Estimates

While the Weierstrass theorem guarantees approximation, it doesn't specify how good the approximation is for a given degree.

**Theorem 7.17 (Jackson's Theorem):** If $f: [0, 1] \to \mathbb{R}$ is continuous with modulus of continuity $\omega(\delta)$, then for any $n \in \mathbb{N}$, there exists a polynomial $p$ of degree at most $n$ such that:
$$
\sup_{x \in [0,1]} |f(x) - p(x)| \leq C \omega\left(\frac{1}{\sqrt{n}}\right)
$$

for some constant $C$.

The **modulus of continuity** of $f$ is defined by:
$$
\omega(\delta) = \sup_{|x-y| \leq \delta} |f(x) - f(y)|
$$

This gives a quantitative bound on the approximation error in terms of the smoothness of $f$.

**Example 7.18:** If $f$ is Lipschitz continuous with constant $L$ (i.e., $|f(x) - f(y)| \leq L|x - y|$), then $\omega(\delta) = L\delta$, and Jackson's theorem gives:
$$
\sup_{x \in [0,1]} |f(x) - p_n(x)| \leq \frac{CL}{\sqrt{n}}
$$

So the approximation error decreases like $n^{-1/2}$ for Lipschitz functions.

## Summary

The Weierstrass approximation theorem and its generalizations are cornerstones of modern analysis:

1. **Classical Weierstrass Theorem**: Every continuous function on $[a, b]$ can be uniformly approximated by polynomials.

2. **Bernstein Polynomials**: Provide an explicit constructive approximation that converges for all continuous functions.

3. **Trigonometric Version**: Continuous periodic functions can be uniformly approximated by trigonometric polynomials (finite Fourier series).

4. **Stone-Weierstrass Theorem**: Algebras of functions that contain constants and separate points are dense in the space of continuous functions on compact spaces.

5. **Applications**: Numerical analysis, functional analysis, approximation theory, Fourier analysis.

**Philosophical Significance:** Despite polynomials being "simple" (finite algebraic combinations of powers), they are sufficient to approximate all continuous functions. This bridges the discrete/algebraic world and the continuous/analytic world.

**Limitations**:
- Compactness is essential; approximation fails on unbounded domains
- Uniform approximation is much stronger than pointwise approximation
- The rate of convergence depends on the smoothness of the function

The Weierstrass theorem, proved using the tools of uniform convergence we have developed throughout this chapter, represents a culmination of 19th-century analysis. It shows that the theory of sequences and series of functions—pointwise and uniform convergence, term-by-term operations, power series—provides a complete framework for understanding and approximating continuous functions.
