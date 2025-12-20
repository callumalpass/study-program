---
title: "Differential Operator Methods"
---

# Differential Operator Methods

## The Differential Operator

The **differential operator** $D$ is defined as:
$$D = \frac{d}{dx}$$

Higher-order derivatives are denoted by powers:
$$D^2 = \frac{d^2}{dx^2}, \quad D^3 = \frac{d^3}{dx^3}, \quad D^n = \frac{d^n}{dx^n}$$

A linear differential equation can be written compactly using operator notation.

**Example**:
$$y'' + 3y' - 4y = e^x$$

becomes:
$$(D^2 + 3D - 4)y = e^x$$

## Polynomial Operators

A **polynomial differential operator** has the form:
$$P(D) = a_nD^n + a_{n-1}D^{n-1} + \cdots + a_1D + a_0$$

This acts on functions by applying the corresponding derivatives:
$$P(D)y = a_ny^{(n)} + a_{n-1}y^{(n-1)} + \cdots + a_1y' + a_0y$$

## Operator Algebra

Differential operators follow algebraic rules similar to polynomials:

1. **Addition**: $(P_1 + P_2)(D)y = P_1(D)y + P_2(D)y$

2. **Multiplication**: $(P_1 \cdot P_2)(D)y = P_1(D)[P_2(D)y]$

3. **Factorization**: $P(D) = a_n(D - r_1)(D - r_2) \cdots (D - r_n)$

**Important**: Operators with constant coefficients commute:
$$(D - r_1)(D - r_2) = (D - r_2)(D - r_1)$$

**Example 1**: Verify $(D - 1)(D - 2)y = (D - 2)(D - 1)y$ for $y = e^{3x}$.

$$(D - 1)(D - 2)e^{3x} = (D - 1)(3e^{3x} - 2e^{3x}) = (D - 1)(e^{3x}) = 3e^{3x} - e^{3x} = 2e^{3x}$$

$$(D - 2)(D - 1)e^{3x} = (D - 2)(3e^{3x} - e^{3x}) = (D - 2)(2e^{3x}) = 6e^{3x} - 4e^{3x} = 2e^{3x}$$

Indeed, they're equal.

## Exponential Shift Formula

**Theorem (Exponential Shift)**: For any polynomial operator $P(D)$:
$$P(D)[e^{ax}u] = e^{ax}P(D + a)u$$

**Proof** (for $D$):
$$D[e^{ax}u] = ae^{ax}u + e^{ax}Du = e^{ax}(D + a)u$$

This extends to higher powers of $D$ and polynomial operators.

**Application**: Simplifies solving equations with exponential forcing.

**Example 2**: Solve $(D^2 - 4)y = e^{2x}$.

Try $y_p = e^{2x}u$:
$$(D^2 - 4)[e^{2x}u] = e^{2x}(D + 2)^2u - 4e^{2x}u = e^{2x}[(D + 2)^2 - 4]u$$
$$= e^{2x}[D^2 + 4D + 4 - 4]u = e^{2x}(D^2 + 4D)u = e^{2x}$$

So:
$$D^2u + 4Du = 1$$
$$D(Du + 4u) = 1$$

Integrate: $Du + 4u = x$

This is first-order linear: $u' + 4u = x$

Integrating factor: $\mu = e^{4x}$
$$u = e^{-4x}\int xe^{4x}dx = \frac{x}{4} - \frac{1}{16}$$

$$y_p = e^{2x}\left(\frac{x}{4} - \frac{1}{16}\right)$$

## Annihilator Method

An operator $L$ **annihilates** a function $f$ if $L[f] = 0$.

**Annihilators for common functions**:

| Function $f(x)$ | Annihilator |
|-----------------|-------------|
| $1$ | $D$ |
| $x^n$ | $D^{n+1}$ |
| $e^{ax}$ | $D - a$ |
| $\cos\beta x$, $\sin\beta x$ | $D^2 + \beta^2$ |
| $e^{ax}\cos\beta x$, $e^{ax}\sin\beta x$ | $(D - a)^2 + \beta^2$ |
| $x^ne^{ax}$ | $(D - a)^{n+1}$ |

**Method**: To solve $P(D)y = f(x)$:

1. Find an annihilator $L$ such that $L[f] = 0$
2. Apply $L$ to both sides: $L \cdot P(D)y = L[f] = 0$
3. Solve the homogeneous equation $L \cdot P(D)y = 0$
4. The general solution to this contains $y_h$ plus extra terms from $L$
5. The extra terms form $y_p$

**Example 3**: Solve $(D^2 + 1)y = x$.

**Step 1**: Annihilator for $x$ is $D^2$

**Step 2**: Apply $D^2$:
$$D^2(D^2 + 1)y = D^2 \cdot x = 0$$

**Step 3**: Solve $D^2(D^2 + 1)y = 0$

Characteristic equation: $r^2(r^2 + 1) = 0$

Roots: $r = 0$ (multiplicity 2), $r = \pm i$

$$y = c_1 + c_2x + c_3\cos x + c_4\sin x$$

**Step 4**: The homogeneous solution to the original equation is:
$$y_h = c_3\cos x + c_4\sin x$$

The particular solution comes from the extra terms:
$$y_p = c_1 + c_2x$$

**Step 5**: Substitute $y_p = A + Bx$ into $(D^2 + 1)y = x$:
$$0 + A + Bx = x$$
$$A = 0, \quad B = 1$$

$$y_p = x$$

**General solution**:
$$y = c_1\cos x + c_2\sin x + x$$

**Example 4**: Solve $(D^2 - 3D + 2)y = e^x$.

**Annihilator for $e^x$**: $D - 1$

Apply:
$$(D - 1)(D^2 - 3D + 2)y = 0$$
$$(D - 1)(D - 1)(D - 2)y = 0$$
$$(D - 1)^2(D - 2)y = 0$$

General solution to this:
$$y = (c_1 + c_2x)e^x + c_3e^{2x}$$

The homogeneous solution is:
$$y_h = c_1e^x + c_3e^{2x}$$

So $y_p$ has the form $y_p = c_2xe^x$.

Substitute $y_p = Axe^x$:
$$(D^2 - 3D + 2)[Axe^x] = e^x$$

Using exponential shift:
$$e^x(D + 1)^2[Ax] - 3e^x(D + 1)[Ax] + 2e^x[Ax] = e^x$$
$$e^x[(D^2 + 2D + 1) - 3(D + 1) + 2][Ax] = e^x$$
$$e^x[D^2 - D][Ax] = e^x$$
$$e^x[-A] = e^x$$
$$A = -1$$

$$y_p = -xe^x$$

## Operator Factorization

For constant coefficients, $P(D)$ factors like a polynomial:
$$P(D) = a_n(D - r_1)(D - r_2) \cdots (D - r_n)$$

This allows solving equations in stages.

**Example 5**: Solve $(D - 1)(D - 2)y = 0$ by successive integration.

Let $u = (D - 2)y$. Then:
$$(D - 1)u = 0$$
$$u' - u = 0$$
$$u = c_1e^x$$

Now solve $(D - 2)y = c_1e^x$:
$$y' - 2y = c_1e^x$$

Integrating factor: $\mu = e^{-2x}$
$$y = e^{2x}\int c_1e^{x} \cdot e^{-2x}dx = e^{2x}\int c_1e^{-x}dx = e^{2x}(-c_1e^{-x} + c_2) = -c_1e^x + c_2e^{2x}$$

Relabel: $y = c_1e^x + c_2e^{2x}$

## Inverse Operators

The **inverse operator** $P(D)^{-1}$ acts as an integration:
$$P(D)^{-1}[f] = y_p \quad \text{where} \quad P(D)y_p = f$$

**Partial fraction decomposition** helps:
$$\frac{1}{(D - a)(D - b)} = \frac{1}{b - a}\left(\frac{1}{D - a} - \frac{1}{D - b}\right)$$

**Example 6**: Find $(D^2 - 1)^{-1}[e^{2x}]$.

Factor: $D^2 - 1 = (D - 1)(D + 1)$

$$\frac{1}{(D - 1)(D + 1)}e^{2x} = \frac{1}{2}\left(\frac{1}{D - 1} - \frac{1}{D + 1}\right)e^{2x}$$

$$= \frac{1}{2}\left[\frac{e^{2x}}{2 - 1} - \frac{e^{2x}}{2 + 1}\right] = \frac{1}{2}\left(e^{2x} - \frac{e^{2x}}{3}\right) = \frac{e^{2x}}{3}$$

So $y_p = \frac{e^{2x}}{3}$.

## Advantages of Operator Methods

1. **Compact notation**: Simplifies writing complex equations
2. **Algebraic manipulation**: Allows factoring and partial fractions
3. **Systematic approach**: Annihilator method is algorithmic
4. **Theoretical insight**: Reveals structure of solution space

## Limitations

1. **Constant coefficients only** (for most techniques)
2. **Can be abstract**: Less intuitive than direct methods
3. **Computationally intensive**: For high-order equations

## Conclusion

Differential operator methods provide a powerful algebraic framework for solving linear differential equations. The operator notation enables factorization, the annihilator method systematically finds particular solutions, and the exponential shift formula simplifies computations. While primarily useful for constant-coefficient equations, operator methods offer deep insight into the structure of differential equations and complement traditional solution techniques.
