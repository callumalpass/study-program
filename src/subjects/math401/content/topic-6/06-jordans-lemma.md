---
id: math401-topic-6-6
title: "Evaluation of Real Integrals"
order: 6
---

# Jordan's Lemma

Jordan's lemma is a crucial technical result that allows us to ignore semicircular arc contributions when evaluating Fourier-type integrals. It ensures that certain contour integrals vanish in the limit, enabling the residue theorem to work for integrals over infinite intervals.

Without Jordan's lemma, the residue method for Fourier integrals would be incomplete. The lemma provides the rigorous justification for "closing the contour" in the complex plane and is one of the key tools in applied complex analysis.

## Statement

**Lemma (Jordan's Lemma)**: Let $f$ be continuous on the semicircular arc $C_R = \{z = Re^{i\theta} : 0 \leq \theta \leq \pi\}$ in the upper half-plane. If $f(z) \to 0$ uniformly as $R \to \infty$ on $C_R$, then for $a > 0$:

$$\lim_{R \to \infty} \int_{C_R} f(z) e^{iaz} dz = 0$$

**Interpretation**: This says that if $f$ decays to zero as we move far from the origin in the upper half-plane, and we multiply by $e^{iaz}$ with $a > 0$, then integrating over a large semicircular arc gives a vanishingly small contribution.

**Important Notes**:
- The condition $a > 0$ is crucial. For $a < 0$, we must use the lower half-plane instead.
- The convergence $f(z) \to 0$ must be uniform on the semicircle, not just pointwise.
- The lemma applies to semicircular arcs; for other contour shapes, different estimates are needed.

## Proof

The proof uses a clever estimate involving Jordan's inequality.

**Jordan's Inequality**: For $0 \leq \theta \leq \pi/2$:
$$\sin\theta \geq \frac{2\theta}{\pi}$$

This can be verified by comparing the graphs of $\sin\theta$ and $\frac{2\theta}{\pi}$ on this interval.

**Proof of Jordan's Lemma**:

On the semicircular arc $C_R$, parametrize as $z = Re^{i\theta}$ for $\theta \in [0, \pi]$.

Then $dz = iRe^{i\theta} d\theta$ and:
$$e^{iaz} = e^{iaRe^{i\theta}} = e^{iaR(\cos\theta + i\sin\theta)} = e^{iaR\cos\theta} \cdot e^{-aR\sin\theta}$$

The magnitude is:
$$|e^{iaz}| = |e^{iaR\cos\theta}| \cdot |e^{-aR\sin\theta}| = 1 \cdot e^{-aR\sin\theta} = e^{-aR\sin\theta}$$

Since $\sin\theta \geq 0$ for $\theta \in [0, \pi]$ and $a > 0$, we have $e^{-aR\sin\theta} \leq 1$.

Now estimate the integral:
$$\left|\int_{C_R} f(z) e^{iaz} dz\right| = \left|\int_0^{\pi} f(Re^{i\theta}) e^{iaRe^{i\theta}} \cdot iRe^{i\theta} d\theta\right|$$

$$\leq \int_0^{\pi} |f(Re^{i\theta})| \cdot e^{-aR\sin\theta} \cdot R \, d\theta$$

Since $f(z) \to 0$ uniformly on $C_R$, for large $R$ we have $|f(Re^{i\theta})| < \epsilon$ for any $\epsilon > 0$. Thus:

$$\left|\int_{C_R} f(z) e^{iaz} dz\right| \leq \epsilon R \int_0^{\pi} e^{-aR\sin\theta} d\theta$$

By symmetry of $\sin\theta$ around $\theta = \pi/2$:
$$\int_0^{\pi} e^{-aR\sin\theta} d\theta = 2\int_0^{\pi/2} e^{-aR\sin\theta} d\theta$$

Using Jordan's inequality $\sin\theta \geq \frac{2\theta}{\pi}$ for $\theta \in [0, \pi/2]$:
$$e^{-aR\sin\theta} \leq e^{-aR \cdot \frac{2\theta}{\pi}}$$

Therefore:
$$\int_0^{\pi/2} e^{-aR\sin\theta} d\theta \leq \int_0^{\pi/2} e^{-\frac{2aR\theta}{\pi}} d\theta$$

Let $u = \frac{2aR\theta}{\pi}$, so $d\theta = \frac{\pi}{2aR} du$:
$$= \int_0^{aR} e^{-u} \cdot \frac{\pi}{2aR} du = \frac{\pi}{2aR} \left[-e^{-u}\right]_0^{aR} = \frac{\pi}{2aR}(1 - e^{-aR})$$

As $R \to \infty$, $e^{-aR} \to 0$, so:
$$\int_0^{\pi/2} e^{-aR\sin\theta} d\theta \leq \frac{\pi}{2aR}$$

Going back:
$$\left|\int_{C_R} f(z) e^{iaz} dz\right| \leq \epsilon R \cdot 2 \cdot \frac{\pi}{2aR} = \frac{\pi\epsilon}{a}$$

Since $\epsilon$ was arbitrary, letting $R \to \infty$ and then $\epsilon \to 0$ gives:
$$\lim_{R \to \infty} \int_{C_R} f(z) e^{iaz} dz = 0$$

This completes the proof.

## Applications

Jordan's lemma is essential for evaluating Fourier-type integrals.

### Example 1: Basic Fourier Integral

Evaluate $I = \int_{-\infty}^{\infty} \frac{\cos x}{x^2+1} dx$.

**Solution**: Write $\cos x = \text{Re}(e^{ix})$ and consider:
$$J = \int_{-\infty}^{\infty} \frac{e^{ix}}{x^2+1} dx$$

Consider the contour consisting of the interval $[-R, R]$ and the semicircular arc $C_R$ in the upper half-plane.

The function $f(z) = \frac{1}{z^2+1}$ satisfies $f(z) \to 0$ as $|z| \to \infty$. Specifically, on $C_R$:
$$|f(Re^{i\theta})| = \frac{1}{|R^2e^{2i\theta}+1|} \sim \frac{1}{R^2} \to 0$$

By Jordan's lemma (with $a = 1 > 0$):
$$\lim_{R \to \infty} \int_{C_R} \frac{e^{iz}}{z^2+1} dz = 0$$

The only pole in the upper half-plane is $z = i$. The residue is:
$$\text{Res}\left(\frac{e^{iz}}{z^2+1}, i\right) = \lim_{z \to i} (z-i) \frac{e^{iz}}{(z-i)(z+i)} = \frac{e^{-1}}{2i}$$

By the residue theorem:
$$J = 2\pi i \cdot \frac{e^{-1}}{2i} = \pi e^{-1} = \frac{\pi}{e}$$

Therefore:
$$I = \text{Re}(J) = \frac{\pi}{e}$$

### Example 2: Different Parameter

Evaluate $I = \int_{-\infty}^{\infty} \frac{\cos(3x)}{(x^2+4)^2} dx$.

**Solution**: Consider:
$$J = \int_{-\infty}^{\infty} \frac{e^{3ix}}{(x^2+4)^2} dx$$

Here $f(z) = \frac{1}{(z^2+4)^2}$ decays like $\frac{1}{R^4}$ on $C_R$, so Jordan's lemma applies (with $a = 3$).

The pole in the upper half-plane is $z = 2i$ with order 2.

$$\text{Res}\left(\frac{e^{3iz}}{(z^2+4)^2}, 2i\right) = \lim_{z \to 2i} \frac{d}{dz}\left[(z-2i)^2 \frac{e^{3iz}}{(z-2i)^2(z+2i)^2}\right]$$

$$= \lim_{z \to 2i} \frac{d}{dz}\left[\frac{e^{3iz}}{(z+2i)^2}\right]$$

Using the quotient rule:
$$= \lim_{z \to 2i} \frac{3ie^{3iz}(z+2i)^2 - e^{3iz} \cdot 2(z+2i)}{(z+2i)^4}$$

$$= \lim_{z \to 2i} \frac{e^{3iz}[3i(z+2i) - 2]}{(z+2i)^3}$$

At $z = 2i$:
$$= \frac{e^{-6}[3i(4i) - 2]}{(4i)^3} = \frac{e^{-6}[-12 - 2]}{-64i} = \frac{-14e^{-6}}{-64i} = \frac{14e^{-6}}{64i} = \frac{7e^{-6}}{32i}$$

Therefore:
$$J = 2\pi i \cdot \frac{7e^{-6}}{32i} = \frac{7\pi e^{-6}}{16}$$

$$I = \text{Re}(J) = \frac{7\pi}{16e^6}$$

### Example 3: When Jordan's Lemma Fails

Consider $\int_{-\infty}^{\infty} e^{ix} dx$.

Here $f(z) = 1$ does not decay to zero, so Jordan's lemma does not apply. Indeed, this integral does not converge in the ordinary sense (though it has a distributional interpretation as $2\pi\delta(1)$).

## Conditions for Applicability

Jordan's lemma requires:

1. **Decay condition**: $f(z) \to 0$ uniformly on $C_R$ as $R \to \infty$
2. **Sign of parameter**: $a > 0$ for upper half-plane (or $a < 0$ for lower half-plane)
3. **Contour shape**: Semicircular arc in the appropriate half-plane

**Common decay rates**:
- $f(z) = \frac{1}{z^n}$ for $n \geq 1$: decays sufficiently
- $f(z) = \frac{P(z)}{Q(z)}$ with $\deg(Q) \geq \deg(P) + 1$: decays sufficiently
- $f(z) = e^z$: does NOT decay (grows exponentially)

**Note on degree condition**: For rational functions, the degree condition $\deg(Q) \geq \deg(P) + 1$ is weaker than the condition $\deg(Q) \geq \deg(P) + 2$ needed for integrals without the exponential factor. The exponential $e^{iaz}$ provides additional damping in the upper half-plane when $a > 0$.

## Variants and Extensions

### Lower Half-Plane Version

For $a < 0$, use the lower half-plane. The statement becomes:

If $f(z) \to 0$ uniformly on the semicircular arc $C_R = \{z = Re^{i\theta} : -\pi \leq \theta \leq 0\}$ in the lower half-plane, then for $a < 0$:
$$\lim_{R \to \infty} \int_{C_R} f(z) e^{iaz} dz = 0$$

### Modified Jordan's Lemma

For integrals involving $e^{-ax}$ with $a > 0$ (real exponential decay), we can use either half-plane, and the decay condition on $f$ can be relaxed.

## Common Mistakes

1. **Forgetting the decay condition**: Jordan's lemma only applies when $f(z) \to 0$ on the semicircle.

2. **Wrong half-plane**: For $e^{iax}$ with $a > 0$, use upper half-plane. For $a < 0$, use lower half-plane.

3. **Insufficient decay**: If $f$ decays like $\frac{1}{R}$ (e.g., $\deg(Q) = \deg(P) + 1$ barely), Jordan's lemma still applies for Fourier integrals, but not for ordinary rational function integrals.

4. **Not verifying uniform convergence**: The decay $f(z) \to 0$ must be uniform on the arc, not just pointwise.

5. **Applying to non-semicircular contours**: Jordan's lemma is specific to semicircular arcs. Other contour shapes require separate analysis.

## Why the Lemma is Needed

Without Jordan's lemma, we couldn't rigorously justify that:
$$\int_{-\infty}^{\infty} f(x)e^{iax} dx = \oint_{\gamma} f(z)e^{iaz} dz$$

where $\gamma$ is the closed contour. We need to know that:
$$\oint_{\gamma} = \int_{-R}^{R} + \int_{C_R}$$

and that the second term vanishes as $R \to \infty$.

Jordan's lemma provides this crucial missing piece, allowing us to close the contour and apply the residue theorem.

## Historical Context

The lemma is named after Camille Jordan (1838-1922), a French mathematician who made fundamental contributions to group theory, topology, and analysis. While the result was known before Jordan, he popularized its use in evaluating Fourier integrals.

The lemma became essential with the development of Fourier analysis in the 19th century, when mathematicians needed rigorous methods to justify contour integration techniques for integral transforms.

## Connection to Other Results

Jordan's lemma is related to:

- **Riemann-Lebesgue lemma**: States that Fourier coefficients of integrable functions decay to zero
- **ML inequality**: The basic estimate $|\int_C f| \leq ML$ underlies the proof
- **Dominated convergence theorem**: Provides a more general framework for limits of integrals

## Summary

- **Jordan's lemma**: For $f(z) \to 0$ uniformly on $C_R$ and $a > 0$, $\int_{C_R} f(z) e^{iaz} dz \to 0$ as $R \to \infty$
- **Proof uses**: Jordan's inequality $\sin\theta \geq \frac{2\theta}{\pi}$ for $\theta \in [0, \pi/2]$
- **Essential for**: Fourier integrals $\int_{-\infty}^{\infty} f(x)e^{iax} dx$
- **Allows**: Closing the contour and applying residue theorem
- **Requires**: Uniform decay of $f$ and correct choice of half-plane
- **Weaker condition**: Need $\deg(Q) \geq \deg(P) + 1$ instead of $\deg(Q) \geq \deg(P) + 2$

Jordan's lemma is a perfect example of a technical result that enables powerful applications. While the statement and proof are straightforward, the lemma is indispensable for Fourier analysis, signal processing, quantum mechanics, and many other areas where Fourier-type integrals appear.

The elegance of Jordan's lemma lies in how the exponential factor $e^{iaz}$ provides natural damping in the upper half-plane (for $a > 0$), allowing contour integration methods to work with weaker decay conditions than would otherwise be required. This mathematical harmony between the complex exponential and the geometry of the complex plane is one of the deep beauties of complex analysis.
