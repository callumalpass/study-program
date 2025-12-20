---
id: math401-topic-6-3
title: "Residue Definition"
order: 3
---

# Evaluation of Real Integrals

One of the most spectacular applications of residue theory is evaluating real definite integrals that are difficult or impossible by standard real-variable methods. By extending to complex functions and applying the residue theorem, we can compute integrals over infinite intervals, improper integrals, and integrals involving trigonometric functions.

## Type 1: Rational Functions Over $(-\infty, \infty)$

For $\int_{-\infty}^{\infty} \frac{P(x)}{Q(x)} dx$ where:
- $Q(x) \neq 0$ for real $x$
- $\deg(Q) \geq \deg(P) + 2$

**Method**: Use semicircular contour in upper half-plane.

**Result**: $\int_{-\infty}^{\infty} f(x) dx = 2\pi i \sum \text{(residues in upper half-plane)}$

**Example**: $\int_{-\infty}^{\infty} \frac{1}{x^2+1} dx = 2\pi i \cdot \text{Res}(f, i) = 2\pi i \cdot \frac{1}{2i} = \pi$

## Type 2: Fourier-Type Integrals

For $\int_{-\infty}^{\infty} f(x) e^{iax} dx$ with $a > 0$:

Use semicircular contour (Jordan's lemma ensures semicircle contribution vanishes).

**Example**: $\int_{-\infty}^{\infty} \frac{e^{ix}}{x^2+1} dx = 2\pi i \cdot \text{Res}(f, i) = \frac{2\pi}{e}$

Taking real/imaginary parts gives $\cos$ and $\sin$ integrals.

## Type 3: Trigonometric Integrals $[0, 2\pi]$

For $\int_0^{2\pi} F(\sin\theta, \cos\theta) d\theta$:

**Method**: Substitute $z = e^{i\theta}$:
- $\cos\theta = \frac{z + z^{-1}}{2}$
- $\sin\theta = \frac{z - z^{-1}}{2i}$
- $d\theta = \frac{dz}{iz}$

Transform to contour integral around $|z| = 1$.

**Example**: $\int_0^{2\pi} \frac{d\theta}{2 + \cos\theta}$

Becomes $\oint_{|z|=1} \frac{2}{iz(4 + z + z^{-1})} dz$. Apply residue theorem.

## Summary

- Rational functions: semicircular contour
- Fourier integrals: Jordan's lemma
- Trigonometric: substitution $z = e^{i\theta}$
- Result from summing residues
- Transforms difficult real integrals into algebraic calculations
