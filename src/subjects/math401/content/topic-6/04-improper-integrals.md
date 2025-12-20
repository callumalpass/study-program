---
id: math401-topic-6-4
title: "Residue Theorem"
order: 4
---

# Improper Integrals and Principal Values

Improper integrals involve infinite intervals or singularities. Complex methods handle these elegantly through residue theory. The Cauchy principal value allows treating certain divergent integrals in a meaningful way.

## Integrals Over $[0, \infty)$

For $\int_0^{\infty} f(x) dx$:

**Method 1**: If $f$ even, use $\int_0^{\infty} f = \frac{1}{2}\int_{-\infty}^{\infty} f$.

**Method 2**: Use keyhole contour for multi-valued functions.

### Keyhole Contour

For integrals involving $\log x$ or $x^{\alpha}$:

Use contour avoiding branch cut (usually along positive real axis).

**Example**: $\int_0^{\infty} \frac{\log x}{x^2+1} dx$

Use keyhole contour, accounting for logarithm branch cut. The jump across the cut contributes, leading to the answer.

## Principal Value Integrals

When integrand has singularities on the real axis:

**Cauchy Principal Value**:
$$\text{P.V.} \int_{-\infty}^{\infty} f(x) dx = \lim_{\epsilon \to 0} \left[\int_{-\infty}^{-\epsilon} f + \int_{\epsilon}^{\infty} f\right]$$

**Method**: Indent contour around singularity with small semicircle.

As $\epsilon \to 0$, the semicircle contributes $\pm i\pi \cdot \text{Res}(f, x_0)$ (sign depends on direction).

## Summary

- Use symmetry when possible
- Keyhole contours for multi-valued functions
- Principal value for singularities on integration path
- Indent contours contribute residue multiples
- Careful limiting processes required
