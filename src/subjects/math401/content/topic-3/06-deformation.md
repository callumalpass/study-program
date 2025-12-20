---
id: math401-topic-3-6
title: "Antiderivatives"
order: 6
---

# Contour Deformation and Homotopy

Contour deformation is a powerful technique in complex integration that allows us to replace complicated integration paths with simpler ones without changing the value of the integral. This principle, based on Cauchy's theorem and the topological concept of homotopy, is fundamental to residue calculus and the evaluation of definite integrals. Understanding when and how contours can be deformed is essential for practical applications of complex analysis.

## Homotopy of Curves

### Definition

Two curves $\gamma_0$ and $\gamma_1$ with the same endpoints in a domain $D$ are **homotopic in $D$** if there exists a continuous function:

$$H: [0, 1] \times [0, 1] \to D$$

such that:
- $H(s, 0) = \gamma_0(s)$ for all $s \in [0, 1]$
- $H(s, 1) = \gamma_1(s)$ for all $s \in [0, 1]$
- $H(0, t) = z_0$ for all $t \in [0, 1]$ (common initial point)
- $H(1, t) = z_1$ for all $t \in [0, 1]$ (common terminal point)

Intuitively, $H(s, t)$ provides a continuous deformation from $\gamma_0$ (at $t = 0$) to $\gamma_1$ (at $t = 1$) that stays within $D$ and keeps endpoints fixed.

### Homotopy of Closed Curves

Two closed curves $\gamma_0$ and $\gamma_1$ are **homotopic** in $D$ if there exists a continuous $H: [0, 1] \times [0, 1] \to D$ with:
- $H(s, 0) = \gamma_0(s)$
- $H(s, 1) = \gamma_1(s)$
- $H(0, t) = H(1, t)$ for all $t$ (closed curves at each stage)

A closed curve is **null-homotopic** (or **homotopic to a point**) if it can be continuously shrunk to a point within $D$.

### Simply Connected Domains

A domain $D$ is **simply connected** if and only if every closed curve in $D$ is null-homotopic in $D$.

Equivalently:
- Every closed curve can be continuously shrunk to a point
- There are no "holes" in $D$
- Any two curves with the same endpoints are homotopic

## The Deformation Theorem

**Theorem (Cauchy's Deformation Theorem)**: Let $f$ be analytic on a domain $D$. If $\gamma_0$ and $\gamma_1$ are homotopic closed curves in $D$, then:

$$\oint_{\gamma_0} f(z) \, dz = \oint_{\gamma_1} f(z) \, dz$$

**Corollary**: In a simply connected domain where $f$ is analytic, all closed curve integrals vanish (since all closed curves are homotopic to a point).

**Proof sketch**: The homotopy $H(s, t)$ creates a "tube" connecting $\gamma_0$ to $\gamma_1$. The boundary of this tube consists of $\gamma_1$, $-\gamma_0$, and the "sides" (which cancel in pairs). By Cauchy's theorem applied to this region, the total boundary integral is zero, giving $\oint_{\gamma_1} f = \oint_{\gamma_0} f$.

## Practical Deformation Principle

**Principle**: If $f$ is analytic in the region between two closed curves $\gamma$ and $\tilde{\gamma}$, then:

$$\oint_\gamma f(z) \, dz = \oint_{\tilde{\gamma}} f(z) \, dz$$

provided both curves have the same orientation relative to the region.

This allows us to:
1. Replace complicated contours with simple ones (like circles)
2. Avoid singularities by deforming around them
3. Split one contour into multiple contours around individual singularities

## Examples of Deformation

### Example 1: Deforming to a Circle

**Evaluate** $\oint_\gamma \frac{1}{z^2 + 1} \, dz$ where $\gamma$ is any simple closed curve around $z = i$ (but not $z = -i$).

The function $f(z) = \frac{1}{z^2 + 1} = \frac{1}{(z-i)(z+i)}$ has singularities at $z = \pm i$.

Since $\gamma$ encloses only $z = i$, we can deform $\gamma$ to the circle $|z - i| = r$ for small $r > 0$.

(We'll evaluate this using residues in a later topic. For now, the key point is that the integral is the same for any contour enclosing $i$ but not $-i$.)

### Example 2: Avoiding a Singularity

**Evaluate** $\int_\gamma e^z \, dz$ where $\gamma$ is a curve from $0$ to $2$ that goes around the point $z = 1$ in a complicated way.

Since $e^z$ is entire (analytic everywhere), we can deform $\gamma$ to the straight line from $0$ to $2$:

$$\int_\gamma e^z \, dz = \int_0^2 e^t \, dt = [e^t]_0^2 = e^2 - 1$$

No need to track the complicated path—only endpoints matter for analytic functions.

### Example 3: Indenting Around a Singularity

Consider $\int_{-\infty}^\infty \frac{1}{x} \, dx$ (improper real integral, which doesn't converge).

To make sense of this, we can use the **principal value**:

$$\text{P.V.} \int_{-\infty}^\infty \frac{1}{x} \, dx = \lim_{\epsilon \to 0} \left[\int_{-\infty}^{-\epsilon} \frac{1}{x} \, dx + \int_\epsilon^\infty \frac{1}{x} \, dx\right]$$

In complex analysis, we can deform the contour to go around $z = 0$ using a small semicircle:

$$\int_{-R}^{-\epsilon} \frac{1}{x} \, dx + \int_{\gamma_\epsilon} \frac{1}{z} \, dz + \int_\epsilon^R \frac{1}{x} \, dx$$

where $\gamma_\epsilon$ is a semicircle of radius $\epsilon$ around $0$ (above the real axis).

As $\epsilon \to 0$, the semicircle integral contributes $i\pi$ (half of $2\pi i$), leading to interesting results in evaluating real integrals.

## Multiply Connected Domains

### Definition

A domain with $n$ holes is **$(n+1)$-connected** or **$n$-fold connected**.

Examples:
- **Simply connected** ($0$ holes): disks, half-planes, $\mathbb{C}$
- **Doubly connected** ($1$ hole): annuli, $\mathbb{C} \setminus \{0\}$
- **Triply connected** ($2$ holes): $\mathbb{C} \setminus \{0, 1\}$

### Cauchy's Theorem for Multiply Connected Domains

**Theorem**: Let $f$ be analytic in a region $D$ bounded by an outer curve $\gamma_0$ and inner curves $\gamma_1, \ldots, \gamma_n$, all oriented so the region is on the left. Then:

$$\oint_{\gamma_0} f = \sum_{j=1}^n \oint_{\gamma_j} f$$

**Application**: The integral around the outer boundary equals the sum of integrals around all inner boundaries.

### Example: Annulus

For $f(z) = 1/z$ on the annulus $1 < |z| < 3$:

$$\oint_{|z|=3} \frac{1}{z} \, dz = \oint_{|z|=1} \frac{1}{z} \, dz = 2\pi i$$

We can deform the outer circle to the inner circle (both give $2\pi i$) because the function is analytic between them.

### Example: Two Singularities

**Evaluate** $\oint_\gamma \frac{1}{z(z-2)} \, dz$ where $\gamma$ is the circle $|z| = 3$.

The function has singularities at $z = 0$ and $z = 2$, both inside $\gamma$.

Deform $\gamma$ into two small circles $\gamma_0$ around $z = 0$ and $\gamma_2$ around $z = 2$:

$$\oint_\gamma \frac{1}{z(z-2)} \, dz = \oint_{\gamma_0} \frac{1}{z(z-2)} \, dz + \oint_{\gamma_2} \frac{1}{z(z-2)} \, dz$$

(Each integral can be computed using residues.)

## Keyhole Contours

A **keyhole contour** is used to compute integrals of multi-valued functions by avoiding branch cuts.

### Example: $\int_0^\infty \frac{\log x}{x^2 + 1} \, dx$

The function $\log z$ has a branch cut. We use a keyhole contour:
- Large circle $|z| = R$
- Small circle around origin $|z| = \epsilon$
- Two line segments along the positive real axis (above and below the cut)

As $R \to \infty$ and $\epsilon \to 0$, the circular parts vanish, and we're left with integrals along the real axis that involve the jump in $\log z$ across the cut.

## Residue Calculus Preview

The deformation principle is central to residue calculus:

**Residue Theorem**: If $f$ is analytic except at isolated singularities $z_1, \ldots, z_n$ inside a closed curve $\gamma$, then:

$$\oint_\gamma f = 2\pi i \sum_{j=1}^n \text{Res}(f, z_j)$$

The integral depends only on the residues at the singularities, not the specific contour. We can deform $\gamma$ freely as long as we don't cross singularities.

## Practical Deformation Strategy

When evaluating $\oint_\gamma f(z) \, dz$:

1. **Identify singularities** of $f$
2. **Check which are inside $\gamma$**
3. **Deform $\gamma$** to a simpler contour (or multiple contours around each singularity)
4. **Evaluate** on the simpler contour(s)

### Example Strategy

For $\oint_{|z|=5} \frac{z^2}{(z-1)(z-2)(z+3)} \, dz$:

Singularities: $z = 1, 2, -3$ (all inside $|z| = 5$)

Deform to three circles:
- $|z - 1| = 0.1$
- $|z - 2| = 0.1$
- $|z + 3| = 0.1$

Then:
$$\oint_{|z|=5} f = \oint_{|z-1|=0.1} f + \oint_{|z-2|=0.1} f + \oint_{|z+3|=0.1} f$$

Each small circle integral can be computed via residues.

## Winding Number

The **winding number** $n(\gamma, z_0)$ counts how many times a closed curve $\gamma$ winds around a point $z_0$ (not on $\gamma$):

$$n(\gamma, z_0) = \frac{1}{2\pi i} \oint_\gamma \frac{1}{z - z_0} \, dz$$

Properties:
- Integer-valued
- Constant on each connected component of $\mathbb{C} \setminus \gamma$
- $n(\gamma, z_0) = 0$ for $z_0$ outside $\gamma$
- $n(\gamma, z_0) = +1$ for simple counterclockwise curve with $z_0$ inside

Homotopic closed curves have the same winding number around any point.

## Applications

### Evaluating Real Integrals

Contour deformation allows us to evaluate real integrals by:
1. Extending to complex contours
2. Deforming to enclose singularities
3. Using residues to compute

Example: $\int_{-\infty}^\infty \frac{1}{x^2 + 1} \, dx$ via semicircular contour.

### Solving Differential Equations

Laplace and Fourier transforms use contour integration with deformation to invert transforms and solve ODEs/PDEs.

### Proving Theorems

Liouville's theorem, maximum modulus principle, and other major results use contour deformation in their proofs.

## Summary

- **Homotopy**: Continuous deformation of curves within a domain
- **Deformation theorem**: Homotopic curves give equal integrals for analytic functions
- **Simply connected**: All closed curves homotopic to a point; all closed integrals zero
- **Multiply connected**: Integral around outer boundary = sum around inner boundaries
- **Practical use**: Replace complicated contours with simple ones (circles, lines)
- **Strategy**: Deform to separate contours around each singularity
- **Winding number**: Counts times curve winds around a point
- **Applications**: Evaluating real integrals, residue calculus, theoretical proofs
- Contour deformation is the bridge between topology and complex integration
- Essential tool for practical computation and theoretical understanding
