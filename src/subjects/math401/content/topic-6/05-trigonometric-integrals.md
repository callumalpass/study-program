# Trigonometric Integrals

Integrals involving trigonometric functions over $[0, 2\pi]$ or $(-\infty, \infty)$ can be evaluated elegantly using residue theory. The key techniques are the $z = e^{i\theta}$ substitution for periodic integrals and Fourier methods for infinite intervals.

## Periodic Integrals: $z = e^{i\theta}$

For $\int_0^{2\pi} R(\sin\theta, \cos\theta) d\theta$ where $R$ is rational:

**Substitution**:
- $z = e^{i\theta}$
- $\cos\theta = \frac{z+z^{-1}}{2}$
- $\sin\theta = \frac{z-z^{-1}}{2i}$
- $d\theta = \frac{dz}{iz}$

Integral becomes $\oint_{|z|=1} F(z) dz$ which we evaluate via residues.

**Example**: $I = \int_0^{2\pi} \frac{d\theta}{a + b\cos\theta}$ for $a > |b| > 0$

Substitution gives $I = \oint_{|z|=1} \frac{2}{i(2az + bz^2 + b)} \frac{dz}{z}$

Find poles inside $|z| = 1$, compute residues, apply theorem.

## Fourier-Type Integrals

For $\int_{-\infty}^{\infty} f(x)\cos(ax) dx$ or $\int_{-\infty}^{\infty} f(x)\sin(ax) dx$:

Use $e^{iax} = \cos(ax) + i\sin(ax)$, evaluate $\int f(x)e^{iax} dx$ via residues, then take real/imaginary parts.

**Jordan's Lemma**: For $a > 0$, the contribution from the semicircular arc in the upper half-plane vanishes if $f(z) \to 0$ as $|z| \to \infty$.

## Summary

- Periodic: $z = e^{i\theta}$ substitution converts to contour integral
- Fourier: Use $e^{iax}$, Jordan's lemma
- Apply residue theorem
- Take real/imaginary parts as needed
