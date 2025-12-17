---
title: "Taylor's Theorem"
slug: "taylor-theorem"
description: "Taylor polynomials and Taylor's theorem"
---

# Taylor's Theorem

## Introduction

Taylor's Theorem is one of the most important results in analysis, providing a method for approximating functions by polynomials. The theorem gives both the approximating polynomial (the Taylor polynomial) and a precise estimate of the error (the remainder term). This has profound applications in numerical analysis, approximation theory, and theoretical physics. The theorem represents the culmination of differential calculus, connecting all derivatives of a function at a point to the global behavior of the function.

## Motivation

A polynomial is easy to evaluate, differentiate, and integrate. If we can approximate a complicated function $f(x)$ by a polynomial near a point $a$, we gain computational and theoretical advantages. The natural question is: what polynomial best approximates $f$ near $a$?

If $f$ is differentiable at $a$, the tangent line $L(x) = f(a) + f'(a)(x-a)$ is the best linear approximation. Taylor's Theorem generalizes this to polynomial approximations of arbitrary degree.

## Taylor Polynomials

**Definition 5.5.1 (Taylor Polynomial):** Let $f$ be $n$ times differentiable at $a$. The **$n$-th degree Taylor polynomial** of $f$ centered at $a$ is:
$$
P_n(x) = \sum_{k=0}^{n} \frac{f^{(k)}(a)}{k!}(x-a)^k
$$
$$
= f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \cdots + \frac{f^{(n)}(a)}{n!}(x-a)^n
$$

When $a = 0$, this is called a **Maclaurin polynomial**.

**Example 5.5.2:** Find the 3rd degree Taylor polynomial of $f(x) = e^x$ at $a = 0$.

We have $f^{(k)}(x) = e^x$ for all $k$, so $f^{(k)}(0) = 1$. Therefore:
$$
P_3(x) = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} = 1 + x + \frac{x^2}{2} + \frac{x^3}{6}
$$

**Example 5.5.3:** Find the 4th degree Taylor polynomial of $f(x) = \sin x$ at $a = 0$.

We have: $f(x) = \sin x$, $f'(x) = \cos x$, $f''(x) = -\sin x$, $f'''(x) = -\cos x$, $f^{(4)}(x) = \sin x$.

At $x = 0$: $f(0) = 0$, $f'(0) = 1$, $f''(0) = 0$, $f'''(0) = -1$, $f^{(4)}(0) = 0$.

Therefore:
$$
P_4(x) = x - \frac{x^3}{6}
$$

## Taylor's Theorem with Lagrange Remainder

**Theorem 5.5.4 (Taylor's Theorem):** Let $n \geq 0$ be an integer, and let $f$ be $(n+1)$ times differentiable on an interval containing $a$ and $x$. Then there exists a point $c$ strictly between $a$ and $x$ such that:
$$
f(x) = P_n(x) + R_n(x)
$$
where $P_n(x)$ is the $n$-th Taylor polynomial and the **Lagrange remainder** is:
$$
R_n(x) = \frac{f^{(n+1)}(c)}{(n+1)!}(x-a)^{n+1}
$$

**Proof:** The case $n = 0$ is the Mean Value Theorem. For $n \geq 1$, we use a generalization. Define:
$$
R_n(x) = f(x) - P_n(x)
$$

We want to show that $R_n(x) = \frac{f^{(n+1)}(c)}{(n+1)!}(x-a)^{n+1}$ for some $c$ between $a$ and $x$.

Fix $x \neq a$ and define the auxiliary function:
$$
g(t) = f(x) - f(t) - f'(t)(x-t) - \frac{f''(t)}{2!}(x-t)^2 - \cdots - \frac{f^{(n)}(t)}{n!}(x-t)^n
$$
and
$$
h(t) = (x-t)^{n+1}
$$

Note that $g(x) = 0$ and $g(a) = R_n(x)$. Also, $h(x) = 0$ and $h(a) = (x-a)^{n+1}$.

Computing $g'(t)$ (using the product rule and telescoping):
$$
g'(t) = -\frac{f^{(n+1)}(t)}{n!}(x-t)^n
$$

And $h'(t) = -(n+1)(x-t)^n$.

By Cauchy's Mean Value Theorem applied to $g$ and $h$ on $[a,x]$ (or $[x,a]$ if $x < a$), there exists $c$ between $a$ and $x$ such that:
$$
\frac{g(x) - g(a)}{h(x) - h(a)} = \frac{g'(c)}{h'(c)}
$$

Substituting:
$$
\frac{0 - R_n(x)}{0 - (x-a)^{n+1}} = \frac{-\frac{f^{(n+1)}(c)}{n!}(x-c)^n}{-(n+1)(x-c)^n}
$$
$$
\frac{R_n(x)}{(x-a)^{n+1}} = \frac{f^{(n+1)}(c)}{(n+1)!}
$$

Therefore:
$$
R_n(x) = \frac{f^{(n+1)}(c)}{(n+1)!}(x-a)^{n+1}
$$
$\square$

**Corollary 5.5.5 (Error Bound):** If $|f^{(n+1)}(t)| \leq M$ for all $t$ between $a$ and $x$, then:
$$
|R_n(x)| \leq \frac{M}{(n+1)!}|x-a|^{n+1}
$$

## Applications and Examples

**Example 5.5.6:** Approximate $e$ using the Taylor polynomial of $e^x$ at $a = 0$ with $n = 5$, and bound the error.

The 5th degree Taylor polynomial is:
$$
P_5(x) = 1 + x + \frac{x^2}{2} + \frac{x^3}{6} + \frac{x^4}{24} + \frac{x^5}{120}
$$

At $x = 1$:
$$
P_5(1) = 1 + 1 + 0.5 + 0.1667 + 0.0417 + 0.0083 = 2.7167
$$

For the error, $f^{(6)}(x) = e^x$. For $x \in [0,1]$, we have $e^x \leq e < 3$. Therefore:
$$
|R_5(1)| \leq \frac{3}{6!} = \frac{3}{720} = \frac{1}{240} \approx 0.0042
$$

So $e \approx 2.7167 \pm 0.0042$, i.e., $e \in [2.7125, 2.7209]$. (The actual value is $e \approx 2.71828$.)

**Example 5.5.7:** Use Taylor's Theorem to prove that $e^x \geq 1 + x$ for all $x \in \mathbb{R}$.

For $x = 0$, we have equality. For $x \neq 0$, use the first-degree Taylor polynomial at $a = 0$:
$$
e^x = 1 + x + \frac{e^c}{2}x^2
$$
for some $c$ between 0 and $x$. Since $e^c > 0$ and $x^2 \geq 0$, we have:
$$
e^x = 1 + x + \frac{e^c}{2}x^2 \geq 1 + x
$$

**Example 5.5.8:** Find the 2nd degree Taylor polynomial of $f(x) = \ln(1+x)$ at $a = 0$ and use it to approximate $\ln(1.1)$.

We have:
- $f(x) = \ln(1+x)$, $f(0) = 0$
- $f'(x) = \frac{1}{1+x}$, $f'(0) = 1$
- $f''(x) = -\frac{1}{(1+x)^2}$, $f''(0) = -1$

So:
$$
P_2(x) = 0 + x - \frac{x^2}{2} = x - \frac{x^2}{2}
$$

At $x = 0.1$:
$$
P_2(0.1) = 0.1 - 0.005 = 0.095
$$

For the error, $f'''(x) = \frac{2}{(1+x)^3}$. For $x \in [0, 0.1]$, we have $|f'''(x)| \leq 2$. Therefore:
$$
|R_2(0.1)| \leq \frac{2}{6}(0.1)^3 = \frac{0.002}{6} \approx 0.00033
$$

So $\ln(1.1) \approx 0.095 \pm 0.00033$. (The actual value is $\ln(1.1) \approx 0.09531$.)

**Example 5.5.9:** Show that $\sin x = x - \frac{x^3}{6} + O(x^5)$ as $x \to 0$.

Using Taylor's Theorem with $n = 3$ at $a = 0$:
$$
\sin x = x - \frac{x^3}{6} + \frac{f^{(4)}(c)}{24}x^4
$$

Since $f^{(4)}(x) = \sin x$ and $|\sin c| \leq 1$, we have:
$$
\left|\sin x - \left(x - \frac{x^3}{6}\right)\right| \leq \frac{|x|^4}{24}
$$

This means $\sin x = x - \frac{x^3}{6} + O(x^5)$.

## Other Forms of the Remainder

### Cauchy Remainder

**Theorem 5.5.10 (Taylor's Theorem with Cauchy Remainder):** Under the same hypotheses as Theorem 5.5.4, there exists $c$ between $a$ and $x$ such that:
$$
R_n(x) = \frac{f^{(n+1)}(c)}{n!}(x-c)^n(x-a)
$$

### Integral Remainder

**Theorem 5.5.11 (Taylor's Theorem with Integral Remainder):** If $f$ is $(n+1)$ times continuously differentiable on $[a,x]$, then:
$$
R_n(x) = \int_a^x \frac{f^{(n+1)}(t)}{n!}(x-t)^n \, dt
$$

This form is useful because it doesn't require finding an unknown point $c$.

## Taylor Series

**Definition 5.5.12 (Taylor Series):** If $f$ is infinitely differentiable at $a$, the **Taylor series** of $f$ at $a$ is:
$$
\sum_{k=0}^{\infty} \frac{f^{(k)}(a)}{k!}(x-a)^k
$$

**Important Question:** Does the Taylor series converge to $f(x)$?

**Answer:** Not always! The series might not converge, or it might converge to something other than $f(x)$.

**Theorem 5.5.13:** The Taylor series of $f$ converges to $f(x)$ if and only if $\lim_{n \to \infty} R_n(x) = 0$.

**Example 5.5.14 (Exponential Function):** For $f(x) = e^x$:
$$
e^x = \sum_{k=0}^{\infty} \frac{x^k}{k!}
$$

This converges for all $x \in \mathbb{R}$ because:
$$
|R_n(x)| \leq \frac{e^{|x|}}{(n+1)!}|x|^{n+1} \to 0 \text{ as } n \to \infty
$$

**Example 5.5.15 (Sine and Cosine):**
$$
\sin x = \sum_{k=0}^{\infty} \frac{(-1)^k x^{2k+1}}{(2k+1)!} = x - \frac{x^3}{6} + \frac{x^5}{120} - \cdots
$$
$$
\cos x = \sum_{k=0}^{\infty} \frac{(-1)^k x^{2k}}{(2k)!} = 1 - \frac{x^2}{2} + \frac{x^4}{24} - \cdots
$$

Both converge for all $x \in \mathbb{R}$.

**Example 5.5.16 (Geometric Series):** For $f(x) = \frac{1}{1-x}$:
$$
\frac{1}{1-x} = \sum_{k=0}^{\infty} x^k = 1 + x + x^2 + x^3 + \cdots
$$

This converges only for $|x| < 1$. For $|x| \geq 1$, the series diverges.

**Example 5.5.17 (Logarithm):** For $f(x) = \ln(1+x)$:
$$
\ln(1+x) = \sum_{k=1}^{\infty} \frac{(-1)^{k+1}x^k}{k} = x - \frac{x^2}{2} + \frac{x^3}{3} - \cdots
$$

This converges for $-1 < x \leq 1$.

## Analytic Functions

**Definition 5.5.18:** A function $f$ is **analytic** at $a$ if there exists $r > 0$ such that $f(x)$ equals its Taylor series for all $x \in (a-r, a+r)$.

**Remark:** All elementary functions (polynomials, exponentials, trigonometric functions, etc.) are analytic wherever they are infinitely differentiable. However, there exist infinitely differentiable functions that are not analytic.

**Example 5.5.19 (Non-Analytic Function):** The function
$$
f(x) = \begin{cases} e^{-1/x^2} & x \neq 0 \\ 0 & x = 0 \end{cases}
$$
is infinitely differentiable at 0 with $f^{(n)}(0) = 0$ for all $n$, so its Taylor series at 0 is identically 0, which does not equal $f(x)$ for $x \neq 0$.

## Exercises

1. Find the 3rd degree Taylor polynomial of $f(x) = \sqrt{1+x}$ at $a = 0$ and use it to approximate $\sqrt{1.1}$.

2. Prove that $\cos x \leq 1 - \frac{x^2}{2} + \frac{x^4}{24}$ for all $x \in \mathbb{R}$.

3. Use Taylor's Theorem to show that for small $x$, $(1+x)^n \approx 1 + nx + \frac{n(n-1)}{2}x^2$.

4. Determine the degree $n$ needed for the Taylor polynomial of $\sin x$ at 0 to approximate $\sin(0.5)$ with error less than $10^{-6}$.

5. Find the Taylor series of $\frac{1}{1+x^2}$ at $a = 0$ and determine its radius of convergence.

6. Prove that $e^x \geq 1 + x + \frac{x^2}{2}$ for all $x \geq 0$.

7. Show that $\ln(1+x) = x - \frac{x^2}{2} + \frac{x^3}{3} + O(x^4)$ as $x \to 0$.

8. Use Taylor series to evaluate $\lim_{x \to 0} \frac{e^x - 1 - x - \frac{x^2}{2}}{x^3}$.

## Conclusion

Taylor's Theorem is a powerful tool that bridges local and global properties of functions. It allows us to approximate complicated functions by polynomials with quantifiable error bounds. The theorem has applications throughout mathematics, from numerical analysis to differential equations to probability theory. Understanding Taylor polynomials and series is essential for advanced work in analysis, and the remainder estimates provide crucial theoretical tools for proving inequalities and convergence results.
