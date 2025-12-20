---
id: math401-topic-5-3
title: "Taylor Series Expansion"
order: 3
---

# Laurent Series and Annular Regions

Laurent series extend power series to functions with singularities by allowing negative powers. While Taylor series require analyticity at the center, Laurent series work in annular regions (rings) around singularities. This generalization is crucial for studying functions near poles and essential singularities.

## Definition

A **Laurent series** centered at $z_0$ is a series of the form:

$$\sum_{n=-\infty}^{\infty} a_n(z - z_0)^n = \cdots + \frac{a_{-2}}{(z-z_0)^2} + \frac{a_{-1}}{z-z_0} + a_0 + a_1(z-z_0) + \cdots$$

The series splits into two parts:
- **Principal part** (negative powers): $\sum_{n=1}^{\infty} \frac{a_{-n}}{(z-z_0)^n}$
- **Analytic part** (non-negative powers): $\sum_{n=0}^{\infty} a_n(z-z_0)^n$

## Laurent's Theorem

**Theorem**: If $f$ is analytic in the annulus $r < |z - z_0| < R$, then $f$ has a unique Laurent series representation:

$$f(z) = \sum_{n=-\infty}^{\infty} a_n(z-z_0)^n$$

valid throughout the annulus, with coefficients:

$$a_n = \frac{1}{2\pi i} \oint_{|z-z_0|=\rho} \frac{f(z)}{(z-z_0)^{n+1}} dz$$

where $r < \rho < R$.

## Computing Laurent Series

**Method 1**: Use known Taylor series and algebraic manipulation.

**Method 2**: Partial fractions for rational functions.

**Method 3**: Direct integration (Cauchy formula).

### Example 1: $\frac{1}{z(z-1)}$ for $0 < |z| < 1$

Using partial fractions:
$$\frac{1}{z(z-1)} = -\frac{1}{z} - \frac{1}{z-1} = -\frac{1}{z} + \frac{1}{1-z}$$

$$= -\frac{1}{z} + \sum_{n=0}^{\infty} z^n = -\frac{1}{z} + 1 + z + z^2 + \cdots$$

### Example 2: $e^{1/z}$ for $z \neq 0$

$$e^{1/z} = \sum_{n=0}^{\infty} \frac{(1/z)^n}{n!} = 1 + \frac{1}{z} + \frac{1}{2!z^2} + \frac{1}{3!z^3} + \cdots$$

Infinitely many negative powers (essential singularity at $z = 0$).

### Example 3: $\frac{z}{(z-1)(z-2)}$ for $1 < |z| < 2$

Expand each term appropriately for the given annulus.

## Summary

- Laurent series: $\sum_{n=-\infty}^{\infty} a_n(z-z_0)^n$
- Valid in annular regions $r < |z-z_0| < R$
- Unique representation for given annulus
- Principal part (negative powers) + analytic part (non-negative)
- Coefficients from Cauchy-type integrals
- Essential for classifying singularities and residue calculus
