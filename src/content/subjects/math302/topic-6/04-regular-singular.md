---
title: "Regular Singular Points"
---

# Regular Singular Points

## Introduction

Many important differential equations in mathematical physics have singular points where the standard power series method fails. However, if these singular points are "regular" (rather than irregular), we can still find series solutions using the Frobenius method. Understanding the classification of singular points is essential for choosing the appropriate solution technique.

## Definition of Singular Points

Consider the second-order linear differential equation in standard form:

$$y'' + P(x)y' + Q(x)y = 0$$

A point $x_0$ is:

- **Ordinary** if both $P(x)$ and $Q(x)$ are analytic at $x_0$
- **Singular** if at least one of $P(x)$ or $Q(x)$ is not analytic at $x_0$

## Classification of Singular Points

### Regular Singular Points

A singular point $x_0$ is called a **regular singular point** if both:

$$(x-x_0)P(x) \quad \text{and} \quad (x-x_0)^2Q(x)$$

are analytic at $x_0$.

Equivalently, if we write the equation as:

$$y'' + \frac{p(x)}{x-x_0}y' + \frac{q(x)}{(x-x_0)^2}y = 0$$

then $x_0$ is a regular singular point if $p(x)$ and $q(x)$ are analytic at $x_0$.

### Irregular Singular Points

A singular point that is not regular is called an **irregular singular point**.

## Examples of Classification

### Example 1: Bessel's Equation

Consider Bessel's equation of order $\nu$:

$$x^2y'' + xy' + (x^2-\nu^2)y = 0$$

Divide by $x^2$ to get standard form:

$$y'' + \frac{1}{x}y' + \frac{x^2-\nu^2}{x^2}y = 0$$

At $x_0 = 0$:

$$P(x) = \frac{1}{x}, \quad Q(x) = \frac{x^2-\nu^2}{x^2} = 1 - \frac{\nu^2}{x^2}$$

Check regularity:

$$xP(x) = x \cdot \frac{1}{x} = 1 \quad \text{(analytic at } x=0\text{)}$$

$$x^2Q(x) = x^2 \left(1 - \frac{\nu^2}{x^2}\right) = x^2 - \nu^2 \quad \text{(analytic at } x=0\text{)}$$

Therefore, **$x = 0$ is a regular singular point**.

### Example 2: Legendre's Equation

$$(1-x^2)y'' - 2xy' + n(n+1)y = 0$$

Standard form:

$$y'' - \frac{2x}{1-x^2}y' + \frac{n(n+1)}{1-x^2}y = 0$$

At $x_0 = 1$:

$$P(x) = \frac{-2x}{1-x^2} = \frac{-2x}{(1-x)(1+x)}$$

$$(x-1)P(x) = \frac{-2x}{1+x} \quad \text{(analytic at } x=1\text{)}$$

$$(x-1)^2Q(x) = \frac{n(n+1)(x-1)^2}{(1-x)(1+x)} = \frac{-n(n+1)(x-1)}{1+x} \quad \text{(analytic at } x=1\text{)}$$

Therefore, **$x = 1$ is a regular singular point**.

Similarly, **$x = -1$ is a regular singular point**.

### Example 3: Irregular Singular Point

Consider:

$$x^3y'' + xy' + y = 0$$

Standard form:

$$y'' + \frac{1}{x^2}y' + \frac{1}{x^3}y = 0$$

At $x_0 = 0$:

$$xP(x) = x \cdot \frac{1}{x^2} = \frac{1}{x} \quad \text{(not analytic at } x=0\text{)}$$

Even though we check: the singularity is too severe.

$$x^2Q(x) = x^2 \cdot \frac{1}{x^3} = \frac{1}{x} \quad \text{(not analytic at } x=0\text{)}$$

Therefore, **$x = 0$ is an irregular singular point**.

### Example 4: Multiple Points

Classify all singular points of:

$$x^2(x-2)^2y'' + 3x(x-2)y' + 5y = 0$$

Standard form:

$$y'' + \frac{3}{x(x-2)}y' + \frac{5}{x^2(x-2)^2}y = 0$$

**At $x = 0$**:

$$xP(x) = x \cdot \frac{3}{x(x-2)} = \frac{3}{x-2} = \frac{-3}{2} + \text{analytic terms} \quad \text{(analytic)}$$

$$x^2Q(x) = x^2 \cdot \frac{5}{x^2(x-2)^2} = \frac{5}{(x-2)^2} = \frac{5}{4} + \text{analytic terms} \quad \text{(analytic)}$$

**Regular singular point at $x = 0$**.

**At $x = 2$**:

$$(x-2)P(x) = (x-2) \cdot \frac{3}{x(x-2)} = \frac{3}{x} = \frac{3}{2} + \text{analytic terms} \quad \text{(analytic)}$$

$$(x-2)^2Q(x) = (x-2)^2 \cdot \frac{5}{x^2(x-2)^2} = \frac{5}{x^2} = \frac{5}{4} + \text{analytic terms} \quad \text{(analytic)}$$

**Regular singular point at $x = 2$**.

## Behavior Near Singular Points

### Solutions Near Regular Singular Points

Near a regular singular point $x_0$, solutions typically have the form:

$$(x-x_0)^r \times \text{power series}$$

where $r$ may be:
- An integer
- A non-integer real number
- Complex (producing logarithmic terms)

This leads to solutions that may:
- Be analytic (when $r$ is a non-negative integer)
- Have algebraic singularities like $(x-x_0)^{1/2}$
- Involve logarithmic terms like $\ln(x-x_0)$

### Solutions Near Irregular Singular Points

Near irregular singular points, solutions may have:
- Essential singularities
- Behavior like $e^{1/x}$
- No convergent power series representation

These require asymptotic methods beyond the scope of standard series solutions.

## Determining the Type of Singular Point

### Procedure

For $y'' + P(x)y' + Q(x)y = 0$ at $x_0$:

1. **Find** $P(x)$ and $Q(x)$ in standard form
2. **Compute** $(x-x_0)P(x)$ and $(x-x_0)^2Q(x)$
3. **Check analyticity**:
   - If both are analytic at $x_0$: **regular singular**
   - If at least one is not analytic at $x_0$: **irregular singular**

### Alternative Form

If the equation is given as:

$$a_2(x)y'' + a_1(x)y' + a_0(x)y = 0$$

Then at a point $x_0$ where $a_2(x_0) = 0$:

- Define $p(x) = \frac{a_1(x)(x-x_0)}{a_2(x)}$ and $q(x) = \frac{a_0(x)(x-x_0)^2}{a_2(x)}$
- If both $p(x)$ and $q(x)$ have removable singularities (i.e., $\lim_{x \to x_0} p(x)$ and $\lim_{x \to x_0} q(x)$ exist), then $x_0$ is regular

## The Frobenius Method (Preview)

At a regular singular point $x_0$, we seek solutions of the form:

$$y = (x-x_0)^r \sum_{n=0}^{\infty} a_n(x-x_0)^n = \sum_{n=0}^{\infty} a_n(x-x_0)^{n+r}$$

where $r$ is determined by the **indicial equation**, and $a_0 \neq 0$.

This generalized power series (Frobenius series) can handle the algebraic singularities that arise at regular singular points.

## Practical Importance

Many fundamental equations in physics have regular singular points:

1. **Bessel's equation**: Models wave propagation in cylindrical coordinates
2. **Legendre's equation**: Models potentials in spherical coordinates
3. **Hypergeometric equation**: Generalizes many special functions
4. **Confluent hypergeometric equation**: Appears in quantum mechanics

The Frobenius method allows us to find exact solutions to these equations in the form of special functions.

## Summary

### Classification Hierarchy

```
Point x_0
├── Ordinary point (P, Q analytic)
│   └── Use standard power series
└── Singular point (P or Q not analytic)
    ├── Regular singular (xP, x²Q analytic)
    │   └── Use Frobenius method
    └── Irregular singular
        └── Use asymptotic methods
```

### Key Tests

| Point Type | Condition | Method |
|------------|-----------|---------|
| Ordinary | $P(x), Q(x)$ analytic | Power series $\sum a_n x^n$ |
| Regular Singular | $xP(x), x^2Q(x)$ analytic | Frobenius $\sum a_n x^{n+r}$ |
| Irregular Singular | Neither condition holds | Asymptotic expansion |

Understanding whether a singular point is regular or irregular determines which solution method is appropriate and what type of solutions to expect. Regular singular points, while more challenging than ordinary points, still admit systematic series solutions via the Frobenius method.
