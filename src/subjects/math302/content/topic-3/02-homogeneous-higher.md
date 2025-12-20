---
title: "Homogeneous Higher-Order Equations with Constant Coefficients"
---

# Homogeneous Higher-Order Equations with Constant Coefficients

## Standard Form

An nth-order linear homogeneous equation with constant coefficients has the form:

$$a_ny^{(n)} + a_{n-1}y^{(n-1)} + \cdots + a_1y' + a_0y = 0$$

where $a_0, a_1, \ldots, a_n$ are constants and $a_n \neq 0$.

## The Characteristic Equation Method

As with second-order equations, we assume a solution of the form $y = e^{rx}$:

$$a_nr^ne^{rx} + a_{n-1}r^{n-1}e^{rx} + \cdots + a_1re^{rx} + a_0e^{rx} = 0$$

Factoring out $e^{rx}$:
$$e^{rx}(a_nr^n + a_{n-1}r^{n-1} + \cdots + a_1r + a_0) = 0$$

The **characteristic equation** is:
$$a_nr^n + a_{n-1}r^{n-1} + \cdots + a_1r + a_0 = 0$$

This is an nth-degree polynomial equation with $n$ roots (counting multiplicity).

## Case 1: Distinct Real Roots

If the characteristic equation has $n$ distinct real roots $r_1, r_2, \ldots, r_n$, the general solution is:

$$y = c_1e^{r_1x} + c_2e^{r_2x} + \cdots + c_ne^{r_nx}$$

**Example 1**: Solve $y''' - 6y'' + 11y' - 6y = 0$.

Characteristic equation: $r^3 - 6r^2 + 11r - 6 = 0$

Try $r = 1$: $1 - 6 + 11 - 6 = 0$ ✓

Factor: $(r - 1)(r^2 - 5r + 6) = (r - 1)(r - 2)(r - 3) = 0$

Roots: $r_1 = 1$, $r_2 = 2$, $r_3 = 3$

General solution:
$$y = c_1e^x + c_2e^{2x} + c_3e^{3x}$$

## Case 2: Repeated Real Roots

If a root $r$ has multiplicity $m$, it contributes $m$ linearly independent solutions:

$$e^{rx}, \quad xe^{rx}, \quad x^2e^{rx}, \quad \ldots, \quad x^{m-1}e^{rx}$$

**Example 2**: Solve $y^{(4)} - 4y''' + 6y'' - 4y' + y = 0$.

Characteristic equation: $r^4 - 4r^3 + 6r^2 - 4r + 1 = 0$

Recognize this as $(r - 1)^4 = 0$ (binomial expansion).

Root: $r = 1$ with multiplicity 4

General solution:
$$y = c_1e^x + c_2xe^x + c_3x^2e^x + c_4x^3e^x = (c_1 + c_2x + c_3x^2 + c_4x^3)e^x$$

**Example 3**: Solve $y''' - 3y'' + 3y' - y = 0$.

Characteristic equation: $r^3 - 3r^2 + 3r - 1 = (r - 1)^3 = 0$

Root: $r = 1$ with multiplicity 3

General solution:
$$y = (c_1 + c_2x + c_3x^2)e^x$$

## Case 3: Complex Roots

Complex roots occur in conjugate pairs $\alpha \pm i\beta$.

Each pair $\alpha \pm i\beta$ contributes the solutions:
$$e^{\alpha x}\cos\beta x, \quad e^{\alpha x}\sin\beta x$$

If the pair has multiplicity $m$, the solutions are:
$$e^{\alpha x}\cos\beta x, \quad xe^{\alpha x}\cos\beta x, \quad \ldots, \quad x^{m-1}e^{\alpha x}\cos\beta x$$
$$e^{\alpha x}\sin\beta x, \quad xe^{\alpha x}\sin\beta x, \quad \ldots, \quad x^{m-1}e^{\alpha x}\sin\beta x$$

**Example 4**: Solve $y''' + 3y'' + 3y' + y = 0$.

Characteristic equation: $r^3 + 3r^2 + 3r + 1 = (r + 1)^3 = 0$

Root: $r = -1$ with multiplicity 3

General solution:
$$y = (c_1 + c_2x + c_3x^2)e^{-x}$$

**Example 5**: Solve $y^{(4)} + 2y'' + y = 0$.

Characteristic equation: $r^4 + 2r^2 + 1 = (r^2 + 1)^2 = 0$

This gives $(r - i)^2(r + i)^2 = 0$, or $r = \pm i$ each with multiplicity 2.

For $r = i$ (i.e., $\alpha = 0$, $\beta = 1$) with multiplicity 2:
$$\cos x, \quad x\cos x, \quad \sin x, \quad x\sin x$$

General solution:
$$y = c_1\cos x + c_2\sin x + c_3x\cos x + c_4x\sin x$$

## Mixed Cases

**Example 6**: Solve $y^{(4)} - y = 0$.

Characteristic equation: $r^4 - 1 = (r^2 - 1)(r^2 + 1) = (r - 1)(r + 1)(r - i)(r + i) = 0$

Roots: $r = 1, -1, i, -i$

- From $r = \pm 1$: $e^x, e^{-x}$
- From $r = \pm i$: $\cos x, \sin x$

General solution:
$$y = c_1e^x + c_2e^{-x} + c_3\cos x + c_4\sin x$$

**Example 7**: Solve $y^{(5)} - 2y^{(4)} + 2y''' - 2y'' + y' = 0$.

Factor out $y'$: $y'(y^{(4)} - 2y''' + 2y'' - 2y' + 1) = 0$

One root is $r = 0$.

For $y^{(4)} - 2y''' + 2y'' - 2y' + 1 = 0$:

Characteristic equation: $r^4 - 2r^3 + 2r^2 - 2r + 1 = 0$

This factors as $(r^2 - r + 1)^2 = 0$ (with complex roots).

Solving $r^2 - r + 1 = 0$:
$$r = \frac{1 \pm \sqrt{1 - 4}}{2} = \frac{1 \pm i\sqrt{3}}{2}$$

So $\alpha = 1/2$, $\beta = \sqrt{3}/2$, each with multiplicity 2.

General solution:
$$y = c_1 + e^{x/2}\left[(c_2 + c_3x)\cos\frac{\sqrt{3}}{2}x + (c_4 + c_5x)\sin\frac{\sqrt{3}}{2}x\right]$$

## Initial Value Problems

**Example 8**: Solve $y''' - y' = 0$ with $y(0) = 0$, $y'(0) = 1$, $y''(0) = 2$.

Characteristic equation: $r^3 - r = r(r^2 - 1) = r(r - 1)(r + 1) = 0$

Roots: $r = 0, 1, -1$

General solution:
$$y = c_1 + c_2e^x + c_3e^{-x}$$

Apply initial conditions:
$$y(0) = c_1 + c_2 + c_3 = 0$$

$$y' = c_2e^x - c_3e^{-x}$$
$$y'(0) = c_2 - c_3 = 1$$

$$y'' = c_2e^x + c_3e^{-x}$$
$$y''(0) = c_2 + c_3 = 2$$

From equations 2 and 3: $c_2 = \frac{3}{2}$, $c_3 = \frac{1}{2}$

From equation 1: $c_1 = -c_2 - c_3 = -2$

Solution:
$$y = -2 + \frac{3}{2}e^x + \frac{1}{2}e^{-x}$$

## Summary of Rules

For characteristic equation $a_nr^n + \cdots + a_0 = 0$:

| Root Type | Multiplicity | Solutions |
|-----------|--------------|-----------|
| Real $r$ | 1 | $e^{rx}$ |
| Real $r$ | $m$ | $e^{rx}, xe^{rx}, \ldots, x^{m-1}e^{rx}$ |
| Complex $\alpha \pm i\beta$ | 1 | $e^{\alpha x}\cos\beta x, e^{\alpha x}\sin\beta x$ |
| Complex $\alpha \pm i\beta$ | $m$ | $x^ke^{\alpha x}\cos\beta x, x^ke^{\alpha x}\sin\beta x$ for $k = 0, 1, \ldots, m-1$ |

## Factoring Techniques

Higher-degree polynomials can be challenging to factor. Useful techniques:

1. **Rational Root Theorem**: If $p/q$ is a rational root (in lowest terms), then $p | a_0$ and $q | a_n$
2. **Synthetic division**: Test possible roots
3. **Grouping**: For quartics and higher
4. **Substitution**: $u = r^2$ for even-power equations
5. **Computer algebra systems**: For difficult cases

## Applications

**Fourth-order**: Beam vibrations, plate theory

**Fifth-order and higher**: Chemical reaction networks, coupled oscillators

## Conclusion

The characteristic equation method extends naturally to higher-order constant-coefficient equations. The key is factoring the characteristic polynomial and applying the rules for real, repeated, and complex roots. While computational complexity increases with degree, the systematic approach remains effective. Understanding these solutions provides the foundation for analyzing more complex systems in engineering and physics.
