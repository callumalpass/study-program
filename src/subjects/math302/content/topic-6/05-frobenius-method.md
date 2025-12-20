---
title: "Frobenius Method"
---

# Frobenius Method

## Introduction

The Frobenius method extends the power series technique to handle regular singular points. Named after Ferdinand Frobenius, this method seeks solutions in the form of generalized power series with a leading factor $(x-x_0)^r$, where the exponent $r$ is determined as part of the solution process.

## The Frobenius Theorem

If $x = x_0$ is a regular singular point of:

$$y'' + P(x)y' + Q(x)y = 0$$

then there exists at least one solution of the form:

$$y = (x-x_0)^r \sum_{n=0}^{\infty} a_n(x-x_0)^n = \sum_{n=0}^{\infty} a_n(x-x_0)^{n+r}, \quad a_0 \neq 0$$

valid in some interval $0 < |x-x_0| < R$.

## The Method (at $x_0 = 0$)

For simplicity, we work with $x_0 = 0$. The procedure is:

1. **Assume** a solution $y = \sum_{n=0}^{\infty} a_n x^{n+r}$ with $a_0 \neq 0$
2. **Compute** $y'$ and $y''$
3. **Substitute** into the differential equation
4. **Find the indicial equation** from the coefficient of the lowest power of $x$
5. **Solve** for the indicial roots $r_1, r_2$
6. **Determine** coefficients using the recurrence relation
7. **Find second solution** based on the relationship between $r_1$ and $r_2$

### The Indicial Equation

The lowest power of $x$ in the series yields the **indicial equation**, a quadratic in $r$ that determines possible values of the exponent.

## Example 1: Euler's Equation

Solve $x^2y'' + xy' - y = 0$ for $x > 0$.

This is a regular singular point at $x = 0$. Assume:

$$y = \sum_{n=0}^{\infty} a_n x^{n+r}$$

Then:

$$y' = \sum_{n=0}^{\infty} (n+r)a_n x^{n+r-1}$$

$$y'' = \sum_{n=0}^{\infty} (n+r)(n+r-1)a_n x^{n+r-2}$$

Substitute:

$$x^2\sum_{n=0}^{\infty} (n+r)(n+r-1)a_n x^{n+r-2} + x\sum_{n=0}^{\infty} (n+r)a_n x^{n+r-1} - \sum_{n=0}^{\infty} a_n x^{n+r} = 0$$

$$\sum_{n=0}^{\infty} (n+r)(n+r-1)a_n x^{n+r} + \sum_{n=0}^{\infty} (n+r)a_n x^{n+r} - \sum_{n=0}^{\infty} a_n x^{n+r} = 0$$

$$\sum_{n=0}^{\infty} [(n+r)(n+r-1) + (n+r) - 1]a_n x^{n+r} = 0$$

$$\sum_{n=0}^{\infty} [(n+r)^2 - 1]a_n x^{n+r} = 0$$

For $n = 0$ (lowest power $x^r$):

$$[r^2 - 1]a_0 = 0$$

Since $a_0 \neq 0$, the **indicial equation** is:

$$r^2 - 1 = 0 \implies r = \pm 1$$

For $n \geq 1$:

$$[(n+r)^2 - 1]a_n = 0$$

With $r = 1$: $[(n+1)^2 - 1]a_n = [n^2 + 2n]a_n = 0$ for $n \geq 1$

This forces $a_n = 0$ for all $n \geq 1$, giving $y_1 = a_0 x$.

With $r = -1$: $[(n-1)^2 - 1]a_n = [n^2 - 2n]a_n = 0$ for $n \geq 1$

This forces $a_n = 0$ for all $n \geq 1$, giving $y_2 = a_0 x^{-1}$.

General solution:

$$y = c_1 x + c_2 x^{-1}$$

## Example 2: Modified Bessel Equation

Solve $xy'' + y' - xy = 0$.

Assume $y = \sum_{n=0}^{\infty} a_n x^{n+r}$.

$$y' = \sum_{n=0}^{\infty} (n+r)a_n x^{n+r-1}, \quad y'' = \sum_{n=0}^{\infty} (n+r)(n+r-1)a_n x^{n+r-2}$$

Substitute:

$$x\sum_{n=0}^{\infty} (n+r)(n+r-1)a_n x^{n+r-2} + \sum_{n=0}^{\infty} (n+r)a_n x^{n+r-1} - x\sum_{n=0}^{\infty} a_n x^{n+r} = 0$$

$$\sum_{n=0}^{\infty} (n+r)(n+r-1)a_n x^{n+r-1} + \sum_{n=0}^{\infty} (n+r)a_n x^{n+r-1} - \sum_{n=0}^{\infty} a_n x^{n+r+1} = 0$$

$$\sum_{n=0}^{\infty} (n+r)^2 a_n x^{n+r-1} - \sum_{n=0}^{\infty} a_n x^{n+r+1} = 0$$

Shift index in second sum (let $k = n+2$):

$$\sum_{n=0}^{\infty} (n+r)^2 a_n x^{n+r-1} - \sum_{n=2}^{\infty} a_{n-2} x^{n+r-1} = 0$$

For $n = 0$: $r^2 a_0 x^{r-1} = 0$

Indicial equation: $r^2 = 0 \implies r = 0$ (double root)

For $n = 1$: $(1+r)^2 a_1 = 0 \implies a_1 = 0$ (since $r = 0$)

For $n \geq 2$: $(n+r)^2 a_n - a_{n-2} = 0$

With $r = 0$:

$$a_n = \frac{a_{n-2}}{n^2}$$

Since $a_1 = 0$, all odd coefficients vanish.

$$a_2 = \frac{a_0}{2^2}, \quad a_4 = \frac{a_2}{4^2} = \frac{a_0}{2^2 \cdot 4^2}, \quad a_6 = \frac{a_0}{2^2 \cdot 4^2 \cdot 6^2}$$

In general:

$$a_{2m} = \frac{a_0}{(2 \cdot 4 \cdot 6 \cdots 2m)^2} = \frac{a_0}{2^{2m}(m!)^2}$$

One solution:

$$y_1 = a_0 \sum_{m=0}^{\infty} \frac{x^{2m}}{2^{2m}(m!)^2} = a_0 I_0(x)$$

where $I_0(x)$ is the modified Bessel function of the first kind of order zero.

For the second solution (when roots differ by an integer or are equal), we need a different approach involving logarithms.

## The Three Cases

Let $r_1$ and $r_2$ be the indicial roots with $r_1 \geq r_2$.

### Case 1: $r_1 - r_2$ Not an Integer

Two linearly independent solutions:

$$y_1 = \sum_{n=0}^{\infty} a_n x^{n+r_1}, \quad y_2 = \sum_{n=0}^{\infty} b_n x^{n+r_2}$$

### Case 2: $r_1 = r_2$ (Double Root)

$$y_1 = \sum_{n=0}^{\infty} a_n x^{n+r_1}$$

$$y_2 = y_1 \ln(x) + \sum_{n=1}^{\infty} c_n x^{n+r_1}$$

### Case 3: $r_1 - r_2$ = Positive Integer

$$y_1 = \sum_{n=0}^{\infty} a_n x^{n+r_1}$$

$$y_2 = Cy_1 \ln(x) + \sum_{n=0}^{\infty} b_n x^{n+r_2}$$

where $C$ may be zero (giving two independent Frobenius solutions) or non-zero (requiring a logarithmic term).

## Example 3: Bessel's Equation of Order Zero

Solve $x^2y'' + xy' + x^2y = 0$.

Assume $y = \sum_{n=0}^{\infty} a_n x^{n+r}$.

After substitution and simplification (details omitted):

Indicial equation: $r^2 = 0 \implies r = 0$ (double root)

Recurrence relation:

$$a_n = -\frac{a_{n-2}}{n^2}$$

With $a_1 = 0$:

$$a_0 = a_0, \quad a_2 = -\frac{a_0}{2^2}, \quad a_4 = \frac{a_0}{2^2 \cdot 4^2}, \quad a_6 = -\frac{a_0}{2^2 \cdot 4^2 \cdot 6^2}$$

One solution (Bessel function $J_0(x)$):

$$y_1 = a_0 \sum_{m=0}^{\infty} \frac{(-1)^m x^{2m}}{2^{2m}(m!)^2} = a_0 J_0(x)$$

The second solution involves a logarithm:

$$y_2 = J_0(x) \ln(x) + \sum_{n=1}^{\infty} c_n x^{2n}$$

## Summary of Frobenius Method

1. **Identify** regular singular point at $x_0$
2. **Assume** $y = \sum a_n (x-x_0)^{n+r}$
3. **Substitute** and collect terms
4. **Extract** indicial equation from lowest power
5. **Solve** $r^2 + pr + q = 0$ for indicial roots
6. **Find** first solution using larger root $r_1$
7. **Determine** second solution based on $r_1 - r_2$:
   - Different by non-integer: standard Frobenius with $r_2$
   - Equal or integer difference: may need logarithmic terms

The Frobenius method is essential for solving equations with regular singular points and leads to important special functions like Bessel functions, which cannot be expressed in terms of elementary functions.
