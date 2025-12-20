---
id: math401-topic-4-2
title: "Derivatives via Integral Formula"
order: 2
---

# Cauchy's Formula for Derivatives

One of the most remarkable consequences of Cauchy's integral formula is that analytic functions are infinitely differentiable, and their derivatives can be expressed as contour integrals. This stands in stark contrast to real analysis, where differentiability does not imply higher-order differentiability. The formula for derivatives also leads to powerful estimates on the growth of derivatives.

## Statement of the Theorem

**Theorem (Cauchy's Formula for Derivatives)**: Let $f$ be analytic on and inside a simple closed contour $\gamma$. Then $f$ has derivatives of all orders inside $\gamma$, and for any $z_0$ inside $\gamma$ and any $n \geq 0$:

$$f^{(n)}(z_0) = \frac{n!}{2\pi i} \oint_\gamma \frac{f(z)}{(z - z_0)^{n+1}} \, dz$$

**Special cases**:
- $n = 0$: Standard Cauchy formula
- $n = 1$: $f'(z_0) = \frac{1}{2\pi i} \oint_\gamma \frac{f(z)}{(z - z_0)^2} \, dz$
- $n = 2$: $f''(z_0) = \frac{2}{2\pi i} \oint_\gamma \frac{f(z)}{(z - z_0)^3} \, dz$

## Proof by Induction

We'll prove this by mathematical induction on $n$.

**Base case** ($n = 0$): This is just Cauchy's integral formula.

**Inductive step**: Assume the formula holds for $n$. We need to show it holds for $n + 1$.

By the inductive hypothesis:
$$f^{(n)}(z_0) = \frac{n!}{2\pi i} \oint_\gamma \frac{f(z)}{(z - z_0)^{n+1}} \, dz$$

We need to show:
$$f^{(n+1)}(z_0) = \lim_{h \to 0} \frac{f^{(n)}(z_0 + h) - f^{(n)}(z_0)}{h}$$

exists and equals $\frac{(n+1)!}{2\pi i} \oint_\gamma \frac{f(z)}{(z - z_0)^{n+2}} \, dz$.

$$\frac{f^{(n)}(z_0 + h) - f^{(n)}(z_0)}{h} = \frac{n!}{2\pi i} \oint_\gamma f(z) \left[\frac{1}{(z - z_0 - h)^{n+1}} - \frac{1}{(z - z_0)^{n+1}}\right] \frac{dz}{h}$$

Using the algebraic identity:
$$\frac{1}{(z - z_0 - h)^{n+1}} - \frac{1}{(z - z_0)^{n+1}} = \frac{(z - z_0)^{n+1} - (z - z_0 - h)^{n+1}}{(z - z_0 - h)^{n+1}(z - z_0)^{n+1}}$$

By the binomial theorem and taking $h \to 0$:
$$\lim_{h \to 0} \frac{(z - z_0)^{n+1} - (z - z_0 - h)^{n+1}}{h} = (n+1)(z - z_0)^n$$

Through careful limiting arguments (interchanging limit and integral, justified by uniform convergence):
$$f^{(n+1)}(z_0) = \frac{n!}{2\pi i} \oint_\gamma f(z) \cdot \frac{(n+1)}{(z - z_0)^{n+2}} \, dz = \frac{(n+1)!}{2\pi i} \oint_\gamma \frac{f(z)}{(z - z_0)^{n+2}} \, dz$$

This completes the induction.

## Infinite Differentiability

**Corollary**: If $f$ is analytic (complex differentiable) at $z_0$, then $f$ has derivatives of all orders at $z_0$.

This is astonishing! In real analysis, knowing $f'(x_0)$ exists tells you nothing about $f''(x_0)$.

In complex analysis, the mere existence of $f'(z_0)$ (complex differentiability) implies $f''(z_0), f'''(z_0), \ldots$ all exist!

**Example**: The function $f(z) = e^z$ is entire, so all derivatives exist everywhere:
$$f^{(n)}(z) = e^z \text{ for all } n$$

## Examples

### Example 1: First Derivative

**Evaluate** $\oint_{|z|=2} \frac{e^z}{(z - 1)^2} \, dz$.

Using Cauchy's formula for derivatives with $f(z) = e^z$, $z_0 = 1$, $n = 1$:
$$f'(1) = \frac{1!}{2\pi i} \oint_{|z|=2} \frac{e^z}{(z - 1)^2} \, dz$$

Since $f'(z) = e^z$, we have $f'(1) = e$:
$$\oint_{|z|=2} \frac{e^z}{(z - 1)^2} \, dz = 2\pi i \cdot e$$

### Example 2: Second Derivative

**Evaluate** $\oint_{|z|=1} \frac{\sin z}{z^3} \, dz$.

Using $f(z) = \sin z$, $z_0 = 0$, $n = 2$:
$$f''(0) = \frac{2!}{2\pi i} \oint_{|z|=1} \frac{\sin z}{z^3} \, dz$$

Since $f'(z) = \cos z$ and $f''(z) = -\sin z$, we have $f''(0) = 0$:
$$\oint_{|z|=1} \frac{\sin z}{z^3} \, dz = 2\pi i \cdot \frac{f''(0)}{2!} = 0$$

### Example 3: Higher Derivative

**Evaluate** $\oint_{|z|=3} \frac{z^2 + 1}{(z - i)^4} \, dz$.

Using $f(z) = z^2 + 1$, $z_0 = i$, $n = 3$:
$$f'''(i) = \frac{3!}{2\pi i} \oint_{|z|=3} \frac{z^2 + 1}{(z - i)^4} \, dz$$

Compute derivatives:
- $f(z) = z^2 + 1$
- $f'(z) = 2z$
- $f''(z) = 2$
- $f'''(z) = 0$

Therefore:
$$\oint_{|z|=3} \frac{z^2 + 1}{(z - i)^4} \, dz = \frac{2\pi i \cdot 0}{3!} = 0$$

### Example 4: Computing a Derivative

Find $\frac{d^5}{dz^5}[\cos z]$ at $z = 0$.

$$f^{(5)}(0) = \frac{5!}{2\pi i} \oint_{|z|=1} \frac{\cos z}{z^6} \, dz$$

By the pattern of derivatives of cosine: $f^{(5)}(z) = \sin z$, so $f^{(5)}(0) = 0$.

We can verify:
$$\oint_{|z|=1} \frac{\cos z}{z^6} \, dz = \frac{2\pi i \cdot 0}{5!} = 0$$

## Cauchy's Inequality

**Theorem (Cauchy's Inequality)**: If $f$ is analytic in $|z - z_0| \leq R$ and $|f(z)| \leq M$ for $|z - z_0| = R$, then:

$$|f^{(n)}(z_0)| \leq \frac{n! M}{R^n}$$

**Proof**: Apply the ML inequality to Cauchy's formula for derivatives:

$$|f^{(n)}(z_0)| = \left|\frac{n!}{2\pi i} \oint_{|z - z_0|=R} \frac{f(z)}{(z - z_0)^{n+1}} \, dz\right|$$

$$\leq \frac{n!}{2\pi} \cdot \frac{M}{R^{n+1}} \cdot 2\pi R = \frac{n! M}{R^n}$$

**Consequence**: If $f$ is entire and bounded, then $f'$ is bounded (with bound proportional to $M/R$). Taking $R \to \infty$ gives $f' \equiv 0$, hence $f$ is constant. This is Liouville's theorem!

### Example: Estimating Derivatives

If $f$ is analytic in $|z| \leq 1$ with $|f(z)| \leq 10$ for $|z| = 1$, then:
$$|f'(0)| \leq \frac{1! \cdot 10}{1^1} = 10$$
$$|f''(0)| \leq \frac{2! \cdot 10}{1^2} = 20$$
$$|f'''(0)| \leq \frac{3! \cdot 10}{1^3} = 60$$

## Liouville's Theorem (Preview)

**Theorem (Liouville)**: If $f$ is entire and bounded, then $f$ is constant.

**Proof using Cauchy's inequality**: For any $z_0 \in \mathbb{C}$ and any $R > 0$:
$$|f'(z_0)| \leq \frac{M}{R}$$

where $M$ bounds $|f|$ everywhere. Taking $R \to \infty$:
$$|f'(z_0)| \leq \lim_{R \to \infty} \frac{M}{R} = 0$$

So $f'(z_0) = 0$ for all $z_0$, meaning $f$ is constant.

## Analyticity of Derivatives

**Corollary**: If $f$ is analytic on domain $D$, then $f'$ is also analytic on $D$.

**Proof**: By Cauchy's formula for derivatives, $f'$ can be expressed as a contour integral. This integral formula shows $f'$ is complex differentiable, hence analytic.

By induction, all derivatives $f^{(n)}$ are analytic.

## Applications

### Taylor Series (Preview)

The derivative formula leads directly to Taylor series:
$$f(z) = \sum_{n=0}^{\infty} \frac{f^{(n)}(z_0)}{n!}(z - z_0)^n$$

Each coefficient can be computed via contour integrals.

### Harmonic Functions

If $f = u + iv$ is analytic, then $u$ and $v$ are harmonic (satisfy Laplace's equation). The infinite differentiability of $f$ implies infinite differentiability of $u$ and $v$.

### Numerical Differentiation

Cauchy's formula provides a method for numerical differentiation using contour integration, which can be more stable than finite difference methods.

## Summary

- **Cauchy's formula for derivatives**: $f^{(n)}(z_0) = \frac{n!}{2\pi i} \oint_\gamma \frac{f(z)}{(z - z_0)^{n+1}} dz$
- **Infinite differentiability**: Analytic functions have derivatives of all orders
- **Proof**: By induction, differentiating Cauchy's integral formula under the integral
- **Cauchy's inequality**: $|f^{(n)}(z_0)| \leq \frac{n! M}{R^n}$
- **Applications**: Liouville's theorem, Taylor series, harmonic functions
- **Examples**: Directly evaluate integrals using the formula
- Unique to complex analysis—no real analog
- Shows analytic functions are extremely smooth and constrained
- Foundation for power series representation and growth estimates
