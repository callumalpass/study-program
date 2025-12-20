---
title: "Series Solutions at Ordinary Points"
---

# Series Solutions at Ordinary Points

## Introduction

When a differential equation has variable coefficients that prevent solution by characteristic equations, but the point of expansion is an ordinary point, we can find solutions as power series. This method is systematic and always produces two linearly independent solutions in the form of convergent power series.

## The Method

### Standard Form

Consider the second-order linear differential equation:

$$y'' + P(x)y' + Q(x)y = 0$$

If $x_0$ is an ordinary point (both $P(x)$ and $Q(x)$ are analytic at $x_0$), we assume a solution:

$$y = \sum_{n=0}^{\infty} a_n(x-x_0)^n$$

For simplicity, we often take $x_0 = 0$:

$$y = \sum_{n=0}^{\infty} a_n x^n$$

### Procedure

1. Assume the power series form for $y$
2. Differentiate term-by-term to find $y'$ and $y''$
3. Substitute into the differential equation
4. Shift indices to align powers of $x$
5. Combine series and set coefficient of each power to zero
6. Solve the recurrence relation for $a_n$
7. Express the solution in terms of two arbitrary constants

## Example 1: Airy's Equation

Solve $y'' - xy = 0$ near $x = 0$.

Since $P(x) = 0$ and $Q(x) = -x$ are analytic everywhere, $x = 0$ is an ordinary point.

Assume:

$$y = \sum_{n=0}^{\infty} a_n x^n$$

Then:

$$y' = \sum_{n=1}^{\infty} na_n x^{n-1}, \quad y'' = \sum_{n=2}^{\infty} n(n-1)a_n x^{n-2}$$

Substitute into $y'' - xy = 0$:

$$\sum_{n=2}^{\infty} n(n-1)a_n x^{n-2} - x\sum_{n=0}^{\infty} a_n x^n = 0$$

$$\sum_{n=2}^{\infty} n(n-1)a_n x^{n-2} - \sum_{n=0}^{\infty} a_n x^{n+1} = 0$$

**Shift indices**: In the first sum, let $k = n-2$ (so $n = k+2$). In the second, let $k = n+1$ (so $n = k-1$):

$$\sum_{k=0}^{\infty} (k+2)(k+1)a_{k+2} x^k - \sum_{k=1}^{\infty} a_{k-1} x^k = 0$$

The first sum starts at $k=0$, the second at $k=1$. Extract the $k=0$ term from the first:

$$2 \cdot 1 \cdot a_2 + \sum_{k=1}^{\infty} [(k+2)(k+1)a_{k+2} - a_{k-1}] x^k = 0$$

For this to hold for all $x$:

$$a_2 = 0$$

$$(k+2)(k+1)a_{k+2} - a_{k-1} = 0 \quad \text{for } k \geq 1$$

This gives the recurrence relation:

$$a_{k+2} = \frac{a_{k-1}}{(k+2)(k+1)}$$

**Finding the pattern**:

From $a_2 = 0$, we get $a_5 = \frac{a_2}{5 \cdot 4} = 0$, $a_8 = 0$, etc. All $a_{3n+2} = 0$.

For $k=1$: $a_3 = \frac{a_0}{3 \cdot 2} = \frac{a_0}{6}$

For $k=2$: $a_4 = \frac{a_1}{4 \cdot 3} = \frac{a_1}{12}$

For $k=4$: $a_6 = \frac{a_3}{6 \cdot 5} = \frac{a_0}{6 \cdot 6 \cdot 5} = \frac{a_0}{180}$

For $k=5$: $a_7 = \frac{a_4}{7 \cdot 6} = \frac{a_1}{12 \cdot 7 \cdot 6} = \frac{a_1}{504}$

The general solution is:

$$y = a_0\left(1 + \frac{x^3}{6} + \frac{x^6}{180} + \cdots\right) + a_1\left(x + \frac{x^4}{12} + \frac{x^7}{504} + \cdots\right)$$

$$= a_0 y_1(x) + a_1 y_2(x)$$

where $y_1$ and $y_2$ are the two linearly independent solutions (Airy functions Ai and Bi).

## Example 2: Hermite's Equation

Solve $y'' - 2xy' + \lambda y = 0$ where $\lambda$ is a constant.

This equation arises in quantum mechanics (quantum harmonic oscillator).

Assume $y = \sum_{n=0}^{\infty} a_n x^n$.

$$y' = \sum_{n=1}^{\infty} na_n x^{n-1}, \quad y'' = \sum_{n=2}^{\infty} n(n-1)a_n x^{n-2}$$

Substitute:

$$\sum_{n=2}^{\infty} n(n-1)a_n x^{n-2} - 2x\sum_{n=1}^{\infty} na_n x^{n-1} + \lambda\sum_{n=0}^{\infty} a_n x^n = 0$$

$$\sum_{n=2}^{\infty} n(n-1)a_n x^{n-2} - 2\sum_{n=1}^{\infty} na_n x^n + \lambda\sum_{n=0}^{\infty} a_n x^n = 0$$

Shift the first sum (let $k = n-2$):

$$\sum_{k=0}^{\infty} (k+2)(k+1)a_{k+2} x^k - 2\sum_{k=1}^{\infty} ka_k x^k + \lambda\sum_{k=0}^{\infty} a_k x^k = 0$$

Extract the $k=0$ term:

$$2a_2 + \lambda a_0 + \sum_{k=1}^{\infty} [(k+2)(k+1)a_{k+2} - 2ka_k + \lambda a_k] x^k = 0$$

Therefore:

$$a_2 = -\frac{\lambda a_0}{2}$$

$$a_{k+2} = \frac{2k - \lambda}{(k+2)(k+1)} a_k$$

**Special case**: When $\lambda = 2n$ for some non-negative integer $n$, the series terminates, producing polynomial solutions called **Hermite polynomials** $H_n(x)$.

For example, if $\lambda = 2$:

$$a_2 = -\frac{2a_0}{2} = -a_0$$

$$a_{k+2} = \frac{2k-2}{(k+2)(k+1)}a_k$$

For $k=1$: $a_3 = \frac{0}{6}a_1 = 0$, so $a_5 = a_7 = \cdots = 0$

For $k=2$: $a_4 = \frac{2}{12}a_2 = \frac{a_2}{6} = -\frac{a_0}{6}$

For $k=3$: $a_5 = \frac{4}{20}a_3 = 0$

The series becomes:

$$y = a_0(1 - x^2 + \text{higher even terms}) + a_1 x$$

With $\lambda = 2$, choosing $a_0 = -2$ and $a_1 = 0$: $H_1(x) = 2x$

## Example 3: Legendre's Equation

Solve $(1-x^2)y'' - 2xy' + n(n+1)y = 0$ near $x = 0$.

Rewrite in standard form:

$$y'' - \frac{2x}{1-x^2}y' + \frac{n(n+1)}{1-x^2}y = 0$$

Since $P(x) = \frac{-2x}{1-x^2}$ and $Q(x) = \frac{n(n+1)}{1-x^2}$ are analytic at $x=0$ (can be expanded as power series), $x=0$ is an ordinary point.

Assume $y = \sum_{k=0}^{\infty} a_k x^k$.

Rather than using standard form, work with the original equation:

$$(1-x^2)\sum_{k=2}^{\infty} k(k-1)a_k x^{k-2} - 2x\sum_{k=1}^{\infty} ka_k x^{k-1} + n(n+1)\sum_{k=0}^{\infty} a_k x^k = 0$$

$$\sum_{k=2}^{\infty} k(k-1)a_k x^{k-2} - \sum_{k=2}^{\infty} k(k-1)a_k x^k - 2\sum_{k=1}^{\infty} ka_k x^k + n(n+1)\sum_{k=0}^{\infty} a_k x^k = 0$$

Shift indices (let $j = k-2$ in first sum):

$$\sum_{j=0}^{\infty} (j+2)(j+1)a_{j+2} x^j - \sum_{j=2}^{\infty} j(j-1)a_j x^j - 2\sum_{j=1}^{\infty} ja_j x^j + n(n+1)\sum_{j=0}^{\infty} a_j x^j = 0$$

Extract low-order terms:

$$2a_2 + n(n+1)a_0 + [6a_3 - 2a_1 + n(n+1)a_1]x$$

$$+ \sum_{j=2}^{\infty} [(j+2)(j+1)a_{j+2} - j(j-1)a_j - 2ja_j + n(n+1)a_j]x^j = 0$$

This gives:

$$a_2 = -\frac{n(n+1)}{2}a_0$$

$$a_3 = \frac{2a_1 - n(n+1)a_1}{6} = \frac{(2-n)(n+1)}{6}a_1 = -\frac{(n-1)(n+2)}{6}a_1$$

**Recurrence relation**:

$$a_{j+2} = \frac{j(j+1) - n(n+1)}{(j+2)(j+1)}a_j = \frac{(j-n)(j+n+1)}{(j+2)(j+1)}a_j$$

When $n$ is a non-negative integer, the series terminates, giving **Legendre polynomials** $P_n(x)$.

## Radius of Convergence

The series solution converges at least in the interval from $x_0$ to the nearest singular point.

### Example: Legendre's Equation

For $(1-x^2)y'' - 2xy' + n(n+1)y = 0$, the singular points are where $1-x^2 = 0$, i.e., $x = \pm 1$.

The radius of convergence about $x_0 = 0$ is at least $R = 1$.

## Summary of Method

1. **Verify** $x_0$ is an ordinary point
2. **Assume** $y = \sum_{n=0}^{\infty} a_n (x-x_0)^n$
3. **Differentiate** term-by-term
4. **Substitute** into the differential equation
5. **Align** powers by shifting indices
6. **Equate** coefficients to zero
7. **Solve** recurrence relation
8. **Express** general solution as $y = a_0 y_1(x) + a_1 y_2(x)$

The power series method at ordinary points is guaranteed to produce two linearly independent solutions that converge in a neighborhood of the expansion point, providing exact or approximate solutions to differential equations with variable coefficients.
