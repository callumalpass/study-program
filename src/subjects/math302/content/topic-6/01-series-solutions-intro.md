---
title: "Introduction to Series Solutions"
---

# Introduction to Series Solutions

## Motivation

Many important differential equations in physics and engineering cannot be solved using elementary functions (polynomials, exponentials, trigonometric functions, etc.). Examples include Bessel's equation, Legendre's equation, and the quantum harmonic oscillator equation. For such equations, we seek solutions in the form of infinite series.

Series solution methods provide:

1. **Exact solutions** in the form of convergent power series
2. **Approximate solutions** by truncating the series
3. **Special functions** that arise naturally in applications (Bessel functions, Legendre polynomials, etc.)
4. **Insight** into solution behavior near specific points

## When to Use Series Methods

### Equations Not Solvable by Elementary Methods

Consider the differential equation:

$$y'' + xy' + y = 0$$

The variable coefficient $x$ prevents us from using the characteristic equation method. Series solutions provide a systematic approach.

### Standard Form

We typically consider second-order linear equations of the form:

$$y'' + P(x)y' + Q(x)y = 0$$

where $P(x)$ and $Q(x)$ are given functions.

## Types of Points

The nature of the solution depends on the behavior of the coefficients near a point $x_0$.

### Ordinary Points

A point $x_0$ is called an **ordinary point** of the differential equation if both $P(x)$ and $Q(x)$ are analytic at $x_0$ (i.e., they can be expressed as convergent power series about $x_0$).

Equivalently, for the equation in standard form:

$$y'' + p(x)y' + q(x)y = 0$$

$x_0$ is ordinary if $p(x) = \frac{P(x)}{1}$ and $q(x) = \frac{Q(x)}{1}$ are analytic at $x_0$.

### Singular Points

A point $x_0$ is a **singular point** if it is not an ordinary point.

#### Regular Singular Points

A singular point $x_0$ is **regular** if:

$$(x-x_0)P(x) \quad \text{and} \quad (x-x_0)^2Q(x)$$

are both analytic at $x_0$.

Alternatively, for the equation:

$$y'' + \frac{p(x)}{x-x_0}y' + \frac{q(x)}{(x-x_0)^2}y = 0$$

if $p(x)$ and $q(x)$ are analytic at $x_0$, then $x_0$ is a regular singular point.

#### Irregular Singular Points

A singular point that is not regular is called **irregular**.

### Example 1: Classifying Points

Classify the singular points of:

$$x^2(x-1)y'' + xy' + (x-1)y = 0$$

First, write in standard form by dividing by $x^2(x-1)$:

$$y'' + \frac{1}{x(x-1)}y' + \frac{1}{x^2}y = 0$$

**At $x = 0$**:

Check $(x-0) \cdot \frac{1}{x(x-1)} = \frac{1}{x-1}$ (analytic at $x=0$) ✓

Check $(x-0)^2 \cdot \frac{1}{x^2} = 1$ (analytic at $x=0$) ✓

Therefore, $x = 0$ is a **regular singular point**.

**At $x = 1$**:

Check $(x-1) \cdot \frac{1}{x(x-1)} = \frac{1}{x}$ (analytic at $x=1$) ✓

Check $(x-1)^2 \cdot \frac{1}{x^2}$ (analytic at $x=1$) ✓

Therefore, $x = 1$ is a **regular singular point**.

### Example 2: Bessel's Equation

Consider Bessel's equation of order $\nu$:

$$x^2y'' + xy' + (x^2 - \nu^2)y = 0$$

Standard form:

$$y'' + \frac{1}{x}y' + \frac{x^2-\nu^2}{x^2}y = 0$$

**At $x = 0$**:

Check $x \cdot \frac{1}{x} = 1$ (analytic) ✓

Check $x^2 \cdot \frac{x^2-\nu^2}{x^2} = x^2 - \nu^2$ (analytic) ✓

Therefore, $x = 0$ is a **regular singular point**.

All other points are ordinary.

## Existence Theorem for Series Solutions

### Theorem (Ordinary Points)

If $x_0$ is an ordinary point of:

$$y'' + P(x)y' + Q(x)y = 0$$

then there exist two linearly independent solutions of the form:

$$y(x) = \sum_{n=0}^{\infty} a_n(x-x_0)^n$$

The series converges in an interval $|x - x_0| < R$, where $R$ is at least as large as the distance from $x_0$ to the nearest singular point.

### Theorem (Regular Singular Points - Frobenius)

If $x_0$ is a regular singular point, then there exists at least one solution of the form:

$$y(x) = (x-x_0)^r \sum_{n=0}^{\infty} a_n(x-x_0)^n = \sum_{n=0}^{\infty} a_n(x-x_0)^{n+r}$$

where $r$ is a constant to be determined (possibly complex or non-integer). This is called the **Frobenius method**.

## The General Approach

### At Ordinary Points

1. Assume a solution $y = \sum_{n=0}^{\infty} a_n x^n$
2. Compute $y'$ and $y''$ term by term
3. Substitute into the differential equation
4. Collect terms with like powers of $x$
5. Set coefficients equal to zero to obtain a recurrence relation
6. Solve the recurrence relation for the coefficients $a_n$

### At Regular Singular Points (Frobenius Method)

1. Assume $y = \sum_{n=0}^{\infty} a_n x^{n+r}$ with $a_0 \neq 0$
2. Compute derivatives and substitute
3. Find the **indicial equation** by setting the coefficient of the lowest power of $x$ to zero
4. Solve for $r$ (the indicial roots)
5. Use the larger root to find one solution
6. Find the second solution (method depends on the relationship between roots)

## Simple Example: Ordinary Point

Solve $y'' + y = 0$ near $x = 0$ using series.

All points are ordinary, so assume:

$$y = \sum_{n=0}^{\infty} a_n x^n$$

Then:

$$y' = \sum_{n=1}^{\infty} na_n x^{n-1}, \quad y'' = \sum_{n=2}^{\infty} n(n-1)a_n x^{n-2}$$

Substitute into $y'' + y = 0$:

$$\sum_{n=2}^{\infty} n(n-1)a_n x^{n-2} + \sum_{n=0}^{\infty} a_n x^n = 0$$

Shift the index in the first sum (let $m = n-2$):

$$\sum_{m=0}^{\infty} (m+2)(m+1)a_{m+2} x^m + \sum_{m=0}^{\infty} a_m x^m = 0$$

$$\sum_{m=0}^{\infty} [(m+2)(m+1)a_{m+2} + a_m] x^m = 0$$

For this to hold for all $x$:

$$(m+2)(m+1)a_{m+2} + a_m = 0$$

$$a_{m+2} = -\frac{a_m}{(m+2)(m+1)}$$

This gives:

- $a_2 = -\frac{a_0}{2!}$, $a_4 = -\frac{a_2}{4 \cdot 3} = \frac{a_0}{4!}$, $a_6 = -\frac{a_0}{6!}$, ...
- $a_3 = -\frac{a_1}{3!}$, $a_5 = \frac{a_1}{5!}$, $a_7 = -\frac{a_1}{7!}$, ...

Therefore:

$$y = a_0\left(1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \frac{x^6}{6!} + \cdots\right) + a_1\left(x - \frac{x^3}{3!} + \frac{x^5}{5!} - \frac{x^7}{7!} + \cdots\right)$$

$$= a_0\cos(x) + a_1\sin(x)$$

This confirms the known solution!

## Advantages and Limitations

### Advantages

1. Works for equations not solvable by other methods
2. Provides power series representations of special functions
3. Can be used to approximate solutions numerically
4. Systematic and algorithmic

### Limitations

1. Can be algebraically tedious
2. Recurrence relations may be difficult to solve
3. Radius of convergence may be limited
4. Not suitable for irregular singular points (requires asymptotic methods)

## Summary

Series solution methods are essential tools for solving differential equations with variable coefficients. The key steps are:

1. **Classify points** as ordinary, regular singular, or irregular singular
2. **Choose the appropriate method**:
   - Power series for ordinary points
   - Frobenius method for regular singular points
3. **Find recurrence relations** for coefficients
4. **Identify the solutions** as known functions or new special functions

In the following sections, we'll develop these methods in detail and explore the famous special functions that arise from them.
