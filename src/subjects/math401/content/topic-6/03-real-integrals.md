---
id: math401-topic-6-3
title: "Residue Definition"
order: 3
---

# Evaluation of Real Integrals

One of the most spectacular applications of residue theory is evaluating real definite integrals that are difficult or impossible by standard real-variable methods. By extending to complex functions and applying the residue theorem, we can compute integrals over infinite intervals, improper integrals, and integrals involving trigonometric functions.

The power of this method lies in converting a real integral into a complex contour integral, where the residue theorem transforms the problem into simple algebra. This technique represents one of the most beautiful connections between real and complex analysis.

## Type 1: Rational Functions Over $(-\infty, \infty)$

For integrals of the form $\int_{-\infty}^{\infty} \frac{P(x)}{Q(x)} dx$ where:
- $Q(x) \neq 0$ for all real $x$
- $\deg(Q) \geq \deg(P) + 2$ (ensures convergence)

**Method**: Use a semicircular contour in the upper half-plane.

**Setup**: Define the contour $\gamma = \gamma_R \cup C_R$ where:
- $\gamma_R$ is the line segment from $-R$ to $R$ along the real axis
- $C_R$ is the semicircular arc $\{z = Re^{i\theta} : 0 \leq \theta \leq \pi\}$

**Key Observation**: As $R \to \infty$, the integral over $C_R$ vanishes because the degree condition ensures $|f(z)| \leq \frac{M}{R^2}$ on $C_R$, and the arc length is $\pi R$, giving:
$$\left|\int_{C_R} f(z) \, dz\right| \leq \frac{M}{R^2} \cdot \pi R = \frac{\pi M}{R} \to 0$$

**Result**:
$$\int_{-\infty}^{\infty} f(x) \, dx = 2\pi i \sum_{\text{Im}(z_k) > 0} \text{Res}(f, z_k)$$

where the sum is over residues at poles in the upper half-plane.

### Example 1: Basic Rational Function

Evaluate $I = \int_{-\infty}^{\infty} \frac{1}{x^2+1} dx$.

**Solution**: The integrand $f(z) = \frac{1}{z^2+1}$ has poles at $z = \pm i$.

Only $z = i$ is in the upper half-plane.

The residue at $z = i$ (simple pole):
$$\text{Res}(f, i) = \lim_{z \to i} (z-i) \cdot \frac{1}{(z-i)(z+i)} = \lim_{z \to i} \frac{1}{z+i} = \frac{1}{2i}$$

By the residue theorem:
$$I = 2\pi i \cdot \frac{1}{2i} = \pi$$

This is a famous result that can be verified by the substitution $x = \tan\theta$.

### Example 2: Higher Degree Denominator

Evaluate $I = \int_{-\infty}^{\infty} \frac{x^2}{(x^2+1)(x^2+4)} dx$.

**Solution**: Factor the denominator:
$$f(z) = \frac{z^2}{(z-i)(z+i)(z-2i)(z+2i)}$$

Poles in the upper half-plane: $z = i$ and $z = 2i$.

At $z = i$ (using the formula for rational functions):
$$\text{Res}(f, i) = \frac{i^2}{(i+i)(i-2i)(i+2i)} = \frac{-1}{2i \cdot (-i) \cdot 3i} = \frac{-1}{-6i^2} = \frac{-1}{6}$$

At $z = 2i$:
$$\text{Res}(f, 2i) = \frac{(2i)^2}{(2i-i)(2i+i)(2i+2i)} = \frac{-4}{i \cdot 3i \cdot 4i} = \frac{-4}{-12i^2} = \frac{-4}{12} = \frac{-1}{3}$$

Wait, let me recalculate more carefully. For $f(z) = \frac{p(z)}{q(z)}$ with simple poles:

At $z = i$:
$$p(z) = z^2, \quad q(z) = (z^2+1)(z^2+4) = z^4 + 5z^2 + 4$$
$$q'(z) = 4z^3 + 10z$$
$$\text{Res}(f, i) = \frac{p(i)}{q'(i)} = \frac{-1}{4i^3 + 10i} = \frac{-1}{-4i + 10i} = \frac{-1}{6i}$$

At $z = 2i$:
$$\text{Res}(f, 2i) = \frac{p(2i)}{q'(2i)} = \frac{-4}{4(2i)^3 + 10(2i)} = \frac{-4}{-32i + 20i} = \frac{-4}{-12i} = \frac{1}{3i}$$

Therefore:
$$I = 2\pi i\left(\frac{-1}{6i} + \frac{1}{3i}\right) = 2\pi i \cdot \frac{-1 + 2}{6i} = 2\pi i \cdot \frac{1}{6i} = \frac{\pi}{3}$$

## Type 2: Fourier-Type Integrals

For integrals of the form $\int_{-\infty}^{\infty} f(x) e^{iax} dx$ with $a > 0$:

Use a semicircular contour in the upper half-plane. Jordan's lemma (discussed in detail later) ensures the semicircle contribution vanishes as $R \to \infty$.

**Result**:
$$\int_{-\infty}^{\infty} f(x) e^{iax} dx = 2\pi i \sum_{\text{Im}(z_k) > 0} \text{Res}(f(z)e^{iaz}, z_k)$$

Taking real and imaginary parts gives integrals involving $\cos(ax)$ and $\sin(ax)$.

### Example 3: Fourier Integral

Evaluate $I = \int_{-\infty}^{\infty} \frac{e^{ix}}{x^2+1} dx$.

**Solution**: Consider $f(z) = \frac{e^{iz}}{z^2+1}$.

Pole in upper half-plane: $z = i$.

$$\text{Res}(f, i) = \lim_{z \to i} (z-i) \cdot \frac{e^{iz}}{(z-i)(z+i)} = \frac{e^{i \cdot i}}{2i} = \frac{e^{-1}}{2i}$$

Therefore:
$$I = 2\pi i \cdot \frac{e^{-1}}{2i} = \pi e^{-1} = \frac{\pi}{e}$$

Since $e^{ix} = \cos x + i\sin x$, we have:
$$\int_{-\infty}^{\infty} \frac{\cos x}{x^2+1} dx = \text{Re}(I) = \frac{\pi}{e}$$

$$\int_{-\infty}^{\infty} \frac{\sin x}{x^2+1} dx = \text{Im}(I) = 0$$

(The second integral is zero because the integrand is an odd function.)

### Example 4: Different Parameter

Evaluate $I = \int_{-\infty}^{\infty} \frac{x\sin(2x)}{x^2+4} dx$.

**Solution**: Write $\sin(2x) = \text{Im}(e^{2ix})$, so we need:
$$I = \text{Im}\left(\int_{-\infty}^{\infty} \frac{z e^{2iz}}{z^2+4} dz\right)$$

Consider $f(z) = \frac{z e^{2iz}}{z^2+4}$ with poles at $z = \pm 2i$.

Only $z = 2i$ is in the upper half-plane.

$$\text{Res}(f, 2i) = \lim_{z \to 2i} (z-2i) \cdot \frac{z e^{2iz}}{(z-2i)(z+2i)} = \frac{2i \cdot e^{2i(2i)}}{4i} = \frac{2i \cdot e^{-4}}{4i} = \frac{e^{-4}}{2}$$

Thus:
$$\int_{-\infty}^{\infty} \frac{x e^{2ix}}{x^2+4} dx = 2\pi i \cdot \frac{e^{-4}}{2} = \pi i e^{-4}$$

Taking the imaginary part:
$$I = \pi e^{-4}$$

## Type 3: Trigonometric Integrals Over $[0, 2\pi]$

For $\int_0^{2\pi} R(\sin\theta, \cos\theta) d\theta$ where $R$ is a rational function:

**Method**: Substitute $z = e^{i\theta}$:
- $\cos\theta = \frac{z + z^{-1}}{2} = \frac{z^2 + 1}{2z}$
- $\sin\theta = \frac{z - z^{-1}}{2i} = \frac{z^2 - 1}{2iz}$
- $d\theta = \frac{dz}{iz}$

The integral transforms to $\oint_{|z|=1} F(z) dz$ which we evaluate via residues.

### Example 5: Classic Trigonometric Integral

Evaluate $I = \int_0^{2\pi} \frac{d\theta}{2 + \cos\theta}$.

**Solution**: Substitute $z = e^{i\theta}$:
$$\cos\theta = \frac{z + z^{-1}}{2}, \quad d\theta = \frac{dz}{iz}$$

$$I = \oint_{|z|=1} \frac{1}{2 + \frac{z+z^{-1}}{2}} \cdot \frac{dz}{iz} = \oint_{|z|=1} \frac{2}{4 + z + z^{-1}} \cdot \frac{dz}{iz}$$

$$= \oint_{|z|=1} \frac{2z}{iz(4z + z^2 + 1)} dz = \oint_{|z|=1} \frac{2}{i(z^2 + 4z + 1)} dz$$

Find poles: $z^2 + 4z + 1 = 0$ gives $z = \frac{-4 \pm \sqrt{16-4}}{2} = \frac{-4 \pm 2\sqrt{3}}{2} = -2 \pm \sqrt{3}$.

So $z_1 = -2 + \sqrt{3} \approx -0.27$ and $z_2 = -2 - \sqrt{3} \approx -3.73$.

Only $z_1 = -2 + \sqrt{3}$ is inside $|z| = 1$ (since $|-2+\sqrt{3}| = 2 - \sqrt{3} < 1$).

$$\text{Res}\left(\frac{2}{i(z^2+4z+1)}, z_1\right) = \frac{2}{i \cdot 2z_1 + 4i} = \frac{2}{i(2z_1 + 4)}$$

Since $z_1 = -2 + \sqrt{3}$:
$$2z_1 + 4 = 2(-2+\sqrt{3}) + 4 = 2\sqrt{3}$$

$$\text{Res} = \frac{2}{i \cdot 2\sqrt{3}} = \frac{1}{i\sqrt{3}} = \frac{-i}{\sqrt{3}}$$

Therefore:
$$I = 2\pi i \cdot \frac{-i}{\sqrt{3}} = \frac{2\pi}{\sqrt{3}} = \frac{2\pi\sqrt{3}}{3}$$

### Example 6: Another Trigonometric Integral

Evaluate $I = \int_0^{2\pi} \frac{\sin^2\theta}{5 - 4\cos\theta} d\theta$.

**Solution**: With $z = e^{i\theta}$:
$$\sin^2\theta = \left(\frac{z-z^{-1}}{2i}\right)^2 = \frac{(z-z^{-1})^2}{-4} = \frac{z^2 - 2 + z^{-2}}{-4}$$

$$\cos\theta = \frac{z+z^{-1}}{2}$$

$$I = \oint_{|z|=1} \frac{(z^2-2+z^{-2})/(-4)}{5 - 2(z+z^{-1})} \cdot \frac{dz}{iz}$$

After simplification (multiply numerator and denominator by $z^2$):
$$I = \oint_{|z|=1} \frac{z^4 - 2z^2 + 1}{-4iz(5z^2 - 2z^3 - 2)} dz$$

This becomes algebraically complex, but the method is the same: find poles inside $|z|=1$, compute residues, and apply the residue theorem.

## Technique Comparison

| Integral Type | Contour | Key Condition |
|---------------|---------|---------------|
| $\int_{-\infty}^{\infty} \frac{P(x)}{Q(x)} dx$ | Semicircle (upper) | $\deg(Q) \geq \deg(P) + 2$ |
| $\int_{-\infty}^{\infty} f(x)e^{iax} dx$ | Semicircle (upper, $a>0$) | Jordan's lemma applies |
| $\int_0^{2\pi} R(\sin\theta, \cos\theta) d\theta$ | Unit circle | $z = e^{i\theta}$ substitution |

## Common Mistakes

1. **Forgetting the degree condition**: If $\deg(Q) < \deg(P) + 2$, the integral over $C_R$ may not vanish.

2. **Using the wrong half-plane**: For $e^{iax}$ with $a > 0$, use the upper half-plane. For $a < 0$, use the lower half-plane.

3. **Missing poles**: Always factor completely to find all singularities, then check which are inside the contour.

4. **Algebraic errors in substitution**: The $z = e^{i\theta}$ substitution involves careful algebra. Double-check the transformation.

5. **Forgetting to take real/imaginary parts**: For Fourier integrals, remember that $e^{ix} = \cos x + i\sin x$.

## Why This Works

The method works because:

1. **Analytic continuation**: The real integrand extends naturally to a complex function.
2. **Contour closing**: We can close the contour with an arc that contributes nothing in the limit.
3. **Residue theorem**: The integral around the closed contour equals $2\pi i$ times the sum of residues.
4. **Limiting process**: As the radius goes to infinity (or stays at 1 for trigonometric integrals), we recover the original real integral.

This is a remarkable interplay between real and complex analysis, showing the power of complex methods in solving real problems.

## Summary

- **Rational functions over $(-\infty, \infty)$**: Use semicircular contour in upper half-plane, sum residues with $\text{Im}(z) > 0$
- **Fourier integrals**: Use Jordan's lemma to show semicircle vanishes, apply residue theorem
- **Trigonometric integrals**: Substitute $z = e^{i\theta}$ to convert to contour integral around unit circle
- **General strategy**: Extend to complex, choose appropriate contour, apply residue theorem, take limit
- Result transforms difficult real integrals into algebraic residue calculations
- One of the most powerful applications of complex analysis to real problems

The evaluation of real integrals via residues demonstrates the unity of mathematics: complex analysis, initially developed to understand complex numbers, provides the most elegant methods for computing certain real integrals. This cross-pollination of ideas is characteristic of advanced mathematics.
