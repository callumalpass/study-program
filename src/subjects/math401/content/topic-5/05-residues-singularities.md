---
id: math401-topic-5-5
title: "Uniqueness Theorem"
order: 5
---

# Residues at Singularities

The residue of a function at a singularity is the coefficient $a_{-1}$ in its Laurent series—the coefficient of the $(z - z_0)^{-1}$ term. This single complex number contains remarkable information about the function's behavior near the singularity and is the key to evaluating contour integrals via the residue theorem.

## Definition

For $f$ with isolated singularity at $z_0$, the **residue** of $f$ at $z_0$ is:

$$\text{Res}(f, z_0) = a_{-1}$$

where $f(z) = \sum_{n=-\infty}^{\infty} a_n(z - z_0)^n$ is the Laurent expansion.

**Integral formula**:
$$\text{Res}(f, z_0) = \frac{1}{2\pi i} \oint_{|z-z_0|=\epsilon} f(z) \, dz$$

for small $\epsilon > 0$.

## Computing Residues

### At Simple Poles

If $z_0$ is a simple pole:
$$\text{Res}(f, z_0) = \lim_{z \to z_0} (z - z_0) f(z)$$

**Example**: For $f(z) = \frac{1}{z-1}$ at $z = 1$:
$$\text{Res}(f, 1) = \lim_{z \to 1} (z-1) \cdot \frac{1}{z-1} = 1$$

### At Poles of Order $m$

$$\text{Res}(f, z_0) = \frac{1}{(m-1)!} \lim_{z \to z_0} \frac{d^{m-1}}{dz^{m-1}}[(z-z_0)^m f(z)]$$

**Example**: For $f(z) = \frac{1}{z^2}$ at $z = 0$ (order 2):
$$\text{Res}(f, 0) = \lim_{z \to 0} \frac{d}{dz}[z^2 \cdot \frac{1}{z^2}] = \lim_{z \to 0} \frac{d}{dz}[1] = 0$$

### For Rational Functions

If $f(z) = \frac{p(z)}{q(z)}$ with $p(z_0) \neq 0$ and $q$ has simple zero at $z_0$:
$$\text{Res}(f, z_0) = \frac{p(z_0)}{q'(z_0)}$$

### At Essential Singularities

Must compute Laurent series to find $a_{-1}$.

**Example**: $f(z) = e^{1/z}$ at $z = 0$:
$$e^{1/z} = 1 + \frac{1}{z} + \frac{1}{2!z^2} + \cdots$$
$$\text{Res}(e^{1/z}, 0) = 1$$

## Summary

- Residue: coefficient $a_{-1}$ in Laurent series
- $\text{Res}(f, z_0) = \frac{1}{2\pi i} \oint f(z) \, dz$ (small circle around $z_0$)
- **Simple pole**: $\text{Res} = \lim_{z \to z_0} (z-z_0)f(z)$
- **Pole of order $m$**: Use derivative formula
- **Rational**: $\text{Res} = p(z_0)/q'(z_0)$ for simple poles
- Foundation for residue theorem and integral evaluation
