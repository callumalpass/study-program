---
title: "Power Series Review"
---

# Power Series Review

## Introduction

Before solving differential equations using series methods, we need to review the essential properties of power series. A solid understanding of convergence, operations, and manipulation of power series is crucial for successfully implementing series solution techniques.

## Definition of Power Series

A **power series** centered at $x_0$ is an infinite series of the form:

$$\sum_{n=0}^{\infty} a_n(x-x_0)^n = a_0 + a_1(x-x_0) + a_2(x-x_0)^2 + a_3(x-x_0)^3 + \cdots$$

where the coefficients $a_n$ are constants.

When $x_0 = 0$, we have:

$$\sum_{n=0}^{\infty} a_n x^n = a_0 + a_1 x + a_2 x^2 + a_3 x^3 + \cdots$$

## Convergence of Power Series

### Radius of Convergence

For every power series $\sum_{n=0}^{\infty} a_n(x-x_0)^n$, there exists a number $R$ (called the **radius of convergence**) such that:

1. The series **converges absolutely** for $|x - x_0| < R$
2. The series **diverges** for $|x - x_0| > R$
3. At $|x - x_0| = R$, the series may converge or diverge (must be checked separately)

The interval $(x_0 - R, x_0 + R)$ is called the **interval of convergence**.

### Finding the Radius of Convergence

#### Ratio Test

If $\lim_{n \to \infty} \left|\frac{a_{n+1}}{a_n}\right| = L$, then:

$$R = \frac{1}{L}$$

If $L = 0$, then $R = \infty$ (converges everywhere).

If $L = \infty$, then $R = 0$ (converges only at $x = x_0$).

#### Root Test

If $\lim_{n \to \infty} \sqrt[n]{|a_n|} = L$, then:

$$R = \frac{1}{L}$$

### Example 1: Geometric Series

Consider $\sum_{n=0}^{\infty} x^n$.

Using the ratio test: $\left|\frac{a_{n+1}}{a_n}\right| = \left|\frac{x^{n+1}}{x^n}\right| = |x|$

The series converges when $|x| < 1$, so $R = 1$.

We know: $\sum_{n=0}^{\infty} x^n = \frac{1}{1-x}$ for $|x| < 1$.

### Example 2: Exponential Series

Consider $\sum_{n=0}^{\infty} \frac{x^n}{n!}$.

Ratio test: $\left|\frac{a_{n+1}}{a_n}\right| = \left|\frac{x^{n+1}/(n+1)!}{x^n/n!}\right| = \frac{|x|}{n+1} \to 0$ as $n \to \infty$

Therefore $R = \infty$, and we know: $\sum_{n=0}^{\infty} \frac{x^n}{n!} = e^x$ for all $x$.

### Example 3: Finite Radius

Consider $\sum_{n=0}^{\infty} n! x^n$.

Ratio test: $\left|\frac{a_{n+1}}{a_n}\right| = \left|\frac{(n+1)! x^{n+1}}{n! x^n}\right| = (n+1)|x| \to \infty$ as $n \to \infty$ unless $x = 0$

Therefore $R = 0$ (converges only at $x = 0$).

## Operations on Power Series

### Term-by-Term Differentiation

If $f(x) = \sum_{n=0}^{\infty} a_n x^n$ converges for $|x| < R$, then $f$ is differentiable on $(-R, R)$ and:

$$f'(x) = \sum_{n=1}^{\infty} na_n x^{n-1} = a_1 + 2a_2 x + 3a_3 x^2 + \cdots$$

The derived series has the same radius of convergence $R$.

Similarly:

$$f''(x) = \sum_{n=2}^{\infty} n(n-1)a_n x^{n-2}$$

### Term-by-Term Integration

If $f(x) = \sum_{n=0}^{\infty} a_n x^n$ for $|x| < R$, then:

$$\int f(x) \, dx = C + \sum_{n=0}^{\infty} \frac{a_n}{n+1} x^{n+1}$$

The integrated series also has radius of convergence $R$.

### Addition and Subtraction

If $f(x) = \sum_{n=0}^{\infty} a_n x^n$ and $g(x) = \sum_{n=0}^{\infty} b_n x^n$ both converge for $|x| < R$, then:

$$f(x) \pm g(x) = \sum_{n=0}^{\infty} (a_n \pm b_n) x^n$$

### Multiplication

The product of two power series is:

$$\left(\sum_{n=0}^{\infty} a_n x^n\right)\left(\sum_{n=0}^{\infty} b_n x^n\right) = \sum_{n=0}^{\infty} c_n x^n$$

where $c_n = \sum_{k=0}^{n} a_k b_{n-k}$ (Cauchy product).

### Substitution

If $f(t) = \sum_{n=0}^{\infty} a_n t^n$ and $t = g(x) = \sum_{m=1}^{\infty} b_m x^m$ with $g(0) = 0$, then:

$$f(g(x)) = \sum_{n=0}^{\infty} a_n [g(x)]^n$$

is a power series in $x$ (composition of series).

## Index Shifting

When working with series, we often need to shift indices to combine terms.

### Example 4: Index Shifting

Combine $\sum_{n=2}^{\infty} n(n-1)a_n x^{n-2} + \sum_{n=0}^{\infty} a_n x^n$.

**First series**: Let $k = n - 2$, so $n = k + 2$:

$$\sum_{n=2}^{\infty} n(n-1)a_n x^{n-2} = \sum_{k=0}^{\infty} (k+2)(k+1)a_{k+2} x^k$$

**Second series**: Already starts at $n = 0$:

$$\sum_{n=0}^{\infty} a_n x^n = \sum_{k=0}^{\infty} a_k x^k$$

**Combined**:

$$\sum_{k=0}^{\infty} [(k+2)(k+1)a_{k+2} + a_k] x^k$$

## Taylor Series

A function $f(x)$ that is infinitely differentiable at $x_0$ can be represented by its Taylor series:

$$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(x_0)}{n!}(x-x_0)^n$$

if the series converges to $f(x)$.

### Important Taylor Series (centered at 0)

$$e^x = \sum_{n=0}^{\infty} \frac{x^n}{n!} = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots, \quad R = \infty$$

$$\sin(x) = \sum_{n=0}^{\infty} \frac{(-1)^n x^{2n+1}}{(2n+1)!} = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \frac{x^7}{7!} + \cdots, \quad R = \infty$$

$$\cos(x) = \sum_{n=0}^{\infty} \frac{(-1)^n x^{2n}}{(2n)!} = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \frac{x^6}{6!} + \cdots, \quad R = \infty$$

$$\frac{1}{1-x} = \sum_{n=0}^{\infty} x^n = 1 + x + x^2 + x^3 + \cdots, \quad R = 1$$

$$\ln(1+x) = \sum_{n=1}^{\infty} \frac{(-1)^{n+1} x^n}{n} = x - \frac{x^2}{2} + \frac{x^3}{3} - \frac{x^4}{4} + \cdots, \quad R = 1$$

$$(1+x)^{\alpha} = \sum_{n=0}^{\infty} \binom{\alpha}{n} x^n = 1 + \alpha x + \frac{\alpha(\alpha-1)}{2!}x^2 + \cdots, \quad R = 1$$

where $\binom{\alpha}{n} = \frac{\alpha(\alpha-1)\cdots(\alpha-n+1)}{n!}$ (binomial series).

## Analytic Functions

A function $f(x)$ is **analytic** at $x_0$ if it can be represented by a convergent power series in some interval about $x_0$:

$$f(x) = \sum_{n=0}^{\infty} a_n(x-x_0)^n$$

Properties:

1. Analytic functions are infinitely differentiable
2. Sums, products, and compositions of analytic functions are analytic
3. Polynomials, $e^x$, $\sin(x)$, $\cos(x)$ are analytic everywhere
4. Rational functions are analytic except at poles
5. $\ln(x)$ is analytic for $x > 0$

## Uniqueness of Power Series

If $\sum_{n=0}^{\infty} a_n x^n = \sum_{n=0}^{\infty} b_n x^n$ for all $x$ in some interval, then $a_n = b_n$ for all $n$.

This **identity property** is crucial: if two power series represent the same function, their coefficients must be equal.

## Example 5: Finding Coefficients

Find the power series for $f(x) = \frac{x}{1-x^2}$ centered at $x = 0$.

Start with the geometric series: $\frac{1}{1-t} = \sum_{n=0}^{\infty} t^n$ for $|t| < 1$.

Substitute $t = x^2$:

$$\frac{1}{1-x^2} = \sum_{n=0}^{\infty} x^{2n}$$

Multiply by $x$:

$$\frac{x}{1-x^2} = x\sum_{n=0}^{\infty} x^{2n} = \sum_{n=0}^{\infty} x^{2n+1} = x + x^3 + x^5 + x^7 + \cdots$$

This converges for $|x| < 1$.

## Example 6: Operations with Series

Find the first few terms of the power series for $e^x \sin(x)$.

$$e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \frac{x^4}{4!} + \cdots$$

$$\sin(x) = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \cdots$$

Multiply (collect terms up to $x^4$):

$$e^x \sin(x) = (1 + x + \frac{x^2}{2} + \frac{x^3}{6} + \frac{x^4}{24} + \cdots)(x - \frac{x^3}{6} + \cdots)$$

$$= x + x^2 + \frac{x^3}{2} - \frac{x^3}{6} + \frac{x^4}{6} + \text{higher terms}$$

$$= x + x^2 + \frac{x^3}{3} + \frac{x^4}{6} + \cdots$$

## Applications to Differential Equations

When solving differential equations by series:

1. Assume a solution $y = \sum_{n=0}^{\infty} a_n x^n$
2. Compute $y'$ and $y''$ by term-by-term differentiation
3. Substitute into the differential equation
4. Use index shifting to align powers
5. Apply the uniqueness property: coefficients of $x^n$ must be zero
6. Solve the resulting recurrence relation for $a_n$

## Summary

Power series are essential tools for solving differential equations. Key points:

1. **Convergence**: Every power series has a radius of convergence $R$
2. **Operations**: Can differentiate and integrate term-by-term within the radius of convergence
3. **Uniqueness**: Coefficients are uniquely determined
4. **Manipulation**: Index shifting allows combining series with different starting points
5. **Standard series**: Memorize Taylor series for common functions

These properties form the foundation for power series and Frobenius methods in solving differential equations.
