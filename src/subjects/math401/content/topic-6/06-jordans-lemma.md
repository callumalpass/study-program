---
id: math401-topic-6-6
title: "Evaluation of Real Integrals"
order: 6
---

# Jordan's Lemma

Jordan's lemma is a crucial technical result that allows us to ignore semicircular arc contributions when evaluating Fourier-type integrals. It ensures that certain contour integrals vanish in the limit, enabling the residue theorem to work for integrals over infinite intervals.

## Statement

**Lemma (Jordan's Lemma)**: Let $f$ be continuous on the semicircular arc $C_R = \{z = Re^{i\theta} : 0 \leq \theta \leq \pi\}$ in the upper half-plane. If $f(z) \to 0$ uniformly as $R \to \infty$ on $C_R$, then for $a > 0$:

$$\lim_{R \to \infty} \int_{C_R} f(z) e^{iaz} dz = 0$$

## Proof

On $C_R$: $z = Re^{i\theta}$, so $e^{iaz} = e^{iaRe^{i\theta}} = e^{iaR(\cos\theta + i\sin\theta)} = e^{iaR\cos\theta} e^{-aR\sin\theta}$.

Since $\sin\theta \geq 0$ for $\theta \in [0, \pi]$:
$$|e^{iaz}| = e^{-aR\sin\theta} \leq 1$$

By ML inequality and using Jordan's inequality $\sin\theta \geq \frac{2\theta}{\pi}$ for $\theta \in [0, \pi/2]$:

$$\left|\int_{C_R} f e^{iaz} dz\right| \to 0 \text{ as } R \to \infty$$

## Applications

Enables evaluation of integrals like:
$$\int_{-\infty}^{\infty} \frac{e^{iax}}{x^2+1} dx$$

by showing the semicircular contribution vanishes.

## Summary

- Jordan's lemma: $\int_{C_R} f e^{iaz} dz \to 0$ if $f \to 0$ and $a > 0$
- Essential for Fourier integrals
- Semicircular arc contribution vanishes
- Allows application of residue theorem to infinite integrals
