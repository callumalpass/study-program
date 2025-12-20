---
title: "Systems with Complex Eigenvalues"
---

# Systems with Complex Eigenvalues

## Complex Eigenvalues

When the characteristic equation $\det(A - \lambda I) = 0$ has complex roots, they occur in **conjugate pairs**:

$$\lambda = \alpha \pm i\beta$$

where $\alpha, \beta \in \mathbb{R}$ and $\beta \neq 0$.

For real matrices $A$, complex eigenvalues always come in conjugate pairs with conjugate eigenvectors.

## Complex Exponential Solutions

For eigenvalue $\lambda = \alpha + i\beta$ with eigenvector $\mathbf{v}$, the complex solution is:

$$\mathbf{x}(t) = e^{(\alpha + i\beta)t}\mathbf{v} = e^{\alpha t}e^{i\beta t}\mathbf{v}$$

Using **Euler's formula** $e^{i\theta} = \cos\theta + i\sin\theta$:

$$e^{i\beta t} = \cos(\beta t) + i\sin(\beta t)$$

Therefore:
$$\mathbf{x}(t) = e^{\alpha t}[\cos(\beta t) + i\sin(\beta t)]\mathbf{v}$$

## Real-Valued Solutions

Since the differential equation has real coefficients, we seek real-valued solutions. If $\mathbf{v} = \mathbf{a} + i\mathbf{b}$ where $\mathbf{a}, \mathbf{b} \in \mathbb{R}^n$:

$$\mathbf{x}(t) = e^{\alpha t}[\cos(\beta t) + i\sin(\beta t)](\mathbf{a} + i\mathbf{b})$$

Expanding:
$$= e^{\alpha t}[\cos(\beta t)\mathbf{a} - \sin(\beta t)\mathbf{b}] + ie^{\alpha t}[\sin(\beta t)\mathbf{a} + \cos(\beta t)\mathbf{b}]$$

The **real and imaginary parts** are both real-valued solutions:

$$\mathbf{x}_1(t) = e^{\alpha t}[\cos(\beta t)\mathbf{a} - \sin(\beta t)\mathbf{b}]$$
$$\mathbf{x}_2(t) = e^{\alpha t}[\sin(\beta t)\mathbf{a} + \cos(\beta t)\mathbf{b}]$$

These are linearly independent, providing two real solutions from the conjugate pair.

## General Solution for 2×2 Systems

For a 2×2 system with complex eigenvalues $\alpha \pm i\beta$:

$$\mathbf{x}(t) = c_1e^{\alpha t}[\cos(\beta t)\mathbf{a} - \sin(\beta t)\mathbf{b}] + c_2e^{\alpha t}[\sin(\beta t)\mathbf{a} + \cos(\beta t)\mathbf{b}]$$

Factoring:
$$\mathbf{x}(t) = e^{\alpha t}[(c_1\mathbf{a} + c_2\mathbf{b})\cos(\beta t) + (c_2\mathbf{a} - c_1\mathbf{b})\sin(\beta t)]$$

or more compactly:
$$\mathbf{x}(t) = e^{\alpha t}[(\cos\beta t)\mathbf{u} + (\sin\beta t)\mathbf{v}]$$

where $\mathbf{u}$ and $\mathbf{v}$ are linear combinations of $\mathbf{a}$ and $\mathbf{b}$.

## Example 1: Pure Imaginary Eigenvalues

Solve:
$$\mathbf{x}' = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}\mathbf{x}$$

**Characteristic equation**:
$$\det(A - \lambda I) = \begin{vmatrix} -\lambda & -1 \\ 1 & -\lambda \end{vmatrix} = \lambda^2 + 1 = 0$$

Eigenvalues: $\lambda = \pm i$ (so $\alpha = 0$, $\beta = 1$)

**Eigenvector for $\lambda = i$**:
$$(A - iI)\mathbf{v} = \begin{pmatrix} -i & -1 \\ 1 & -i \end{pmatrix}\begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \mathbf{0}$$

From first row: $-iv_1 - v_2 = 0 \Rightarrow v_2 = -iv_1$

Choose $v_1 = 1$: $\mathbf{v} = \begin{pmatrix} 1 \\ -i \end{pmatrix} = \begin{pmatrix} 1 \\ 0 \end{pmatrix} + i\begin{pmatrix} 0 \\ -1 \end{pmatrix}$

So $\mathbf{a} = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$, $\mathbf{b} = \begin{pmatrix} 0 \\ -1 \end{pmatrix}$

**Complex solution**:
$$\mathbf{x}(t) = e^{it}\begin{pmatrix} 1 \\ -i \end{pmatrix} = (\cos t + i\sin t)\begin{pmatrix} 1 \\ -i \end{pmatrix}$$
$$= \begin{pmatrix} \cos t \\ \sin t \end{pmatrix} + i\begin{pmatrix} \sin t \\ -\cos t \end{pmatrix}$$

**Real solutions**:
$$\mathbf{x}_1(t) = \begin{pmatrix} \cos t \\ \sin t \end{pmatrix}, \quad \mathbf{x}_2(t) = \begin{pmatrix} \sin t \\ -\cos t \end{pmatrix}$$

**General solution**:
$$\mathbf{x}(t) = c_1\begin{pmatrix} \cos t \\ \sin t \end{pmatrix} + c_2\begin{pmatrix} \sin t \\ -\cos t \end{pmatrix}$$

**Interpretation**: Pure rotation (circular trajectories) since $\alpha = 0$.

## Example 2: Complex Eigenvalues with Real Part

Solve:
$$\mathbf{x}' = \begin{pmatrix} 1 & -5 \\ 1 & -3 \end{pmatrix}\mathbf{x}$$

**Characteristic equation**:
$$\det(A - \lambda I) = (1-\lambda)(-3-\lambda) + 5 = \lambda^2 + 2\lambda + 2 = 0$$

$$\lambda = \frac{-2 \pm \sqrt{4 - 8}}{2} = \frac{-2 \pm 2i}{2} = -1 \pm i$$

So $\alpha = -1$, $\beta = 1$

**Eigenvector for $\lambda = -1 + i$**:
$$(A - (-1+i)I)\mathbf{v} = \begin{pmatrix} 2-i & -5 \\ 1 & -2-i \end{pmatrix}\begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \mathbf{0}$$

From second row: $v_1 + (-2-i)v_2 = 0 \Rightarrow v_1 = (2+i)v_2$

Choose $v_2 = 1$: $\mathbf{v} = \begin{pmatrix} 2+i \\ 1 \end{pmatrix} = \begin{pmatrix} 2 \\ 1 \end{pmatrix} + i\begin{pmatrix} 1 \\ 0 \end{pmatrix}$

So $\mathbf{a} = \begin{pmatrix} 2 \\ 1 \end{pmatrix}$, $\mathbf{b} = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$

**Real solutions**:
$$\mathbf{x}_1(t) = e^{-t}\left[\cos t \begin{pmatrix} 2 \\ 1 \end{pmatrix} - \sin t \begin{pmatrix} 1 \\ 0 \end{pmatrix}\right] = e^{-t}\begin{pmatrix} 2\cos t - \sin t \\ \cos t \end{pmatrix}$$

$$\mathbf{x}_2(t) = e^{-t}\left[\sin t \begin{pmatrix} 2 \\ 1 \end{pmatrix} + \cos t \begin{pmatrix} 1 \\ 0 \end{pmatrix}\right] = e^{-t}\begin{pmatrix} 2\sin t + \cos t \\ \sin t \end{pmatrix}$$

**General solution**:
$$\mathbf{x}(t) = c_1e^{-t}\begin{pmatrix} 2\cos t - \sin t \\ \cos t \end{pmatrix} + c_2e^{-t}\begin{pmatrix} 2\sin t + \cos t \\ \sin t \end{pmatrix}$$

**Interpretation**: Spiraling toward origin (since $\alpha = -1 < 0$).

## Geometric Behavior

The behavior depends on the sign of $\alpha = \text{Re}(\lambda)$:

### Spiral Sink ($\alpha < 0$)
- Solutions spiral inward toward the origin
- $e^{\alpha t} \to 0$ as $t \to \infty$
- **Asymptotically stable** equilibrium
- Example 2 above

### Center ($\alpha = 0$)
- Solutions are periodic ellipses/circles
- Amplitude remains constant
- **Neutrally stable** (marginally stable)
- Example 1 above

### Spiral Source ($\alpha > 0$)
- Solutions spiral outward from the origin
- $e^{\alpha t} \to \infty$ as $t \to \infty$
- **Unstable** equilibrium

### Angular Frequency
The parameter $\beta$ determines the angular frequency of oscillation:
- Period: $T = \frac{2\pi}{\beta}$
- Frequency: $f = \frac{\beta}{2\pi}$

## Initial Value Problems

### Example 3: IVP with Complex Eigenvalues

Solve $\mathbf{x}' = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}\mathbf{x}$ with $\mathbf{x}(0) = \begin{pmatrix} 2 \\ 0 \end{pmatrix}$.

From Example 1:
$$\mathbf{x}(t) = c_1\begin{pmatrix} \cos t \\ \sin t \end{pmatrix} + c_2\begin{pmatrix} \sin t \\ -\cos t \end{pmatrix}$$

At $t = 0$:
$$\begin{pmatrix} 2 \\ 0 \end{pmatrix} = c_1\begin{pmatrix} 1 \\ 0 \end{pmatrix} + c_2\begin{pmatrix} 0 \\ -1 \end{pmatrix}$$

$$c_1 = 2, \quad -c_2 = 0 \Rightarrow c_2 = 0$$

**Solution**:
$$\mathbf{x}(t) = 2\begin{pmatrix} \cos t \\ \sin t \end{pmatrix} = \begin{pmatrix} 2\cos t \\ 2\sin t \end{pmatrix}$$

This is a circular trajectory with radius 2.

## Phase Portraits

Phase portraits for complex eigenvalues show characteristic patterns:

**Center** ($\alpha = 0$): Closed elliptical orbits around the origin

**Spiral Sink** ($\alpha < 0$): Inward spiraling trajectories

**Spiral Source** ($\alpha > 0$): Outward spiraling trajectories

The eigenvector directions influence the orientation and shape of spirals/ellipses.

## Relationship to Second-Order Equations

A second-order equation with complex roots:
$$y'' + 2\alpha y' + (\alpha^2 + \beta^2)y = 0$$

has solutions:
$$y = e^{-\alpha t}(c_1\cos\beta t + c_2\sin\beta t)$$

Converting to a system $x_1 = y$, $x_2 = y'$ yields:
$$\mathbf{x}' = \begin{pmatrix} 0 & 1 \\ -(\alpha^2+\beta^2) & -2\alpha \end{pmatrix}\mathbf{x}$$

with eigenvalues $-\alpha \pm i\beta$, connecting the two perspectives.

## Summary of Solution Process

For $\mathbf{x}' = A\mathbf{x}$ with complex eigenvalues $\alpha \pm i\beta$:

1. **Find eigenvalues**: Solve characteristic equation

2. **Find one complex eigenvector** $\mathbf{v} = \mathbf{a} + i\mathbf{b}$ for $\lambda = \alpha + i\beta$

3. **Extract real and imaginary parts**: Separate $\mathbf{a}$ and $\mathbf{b}$

4. **Form real solutions**:
   $$\mathbf{x}_1 = e^{\alpha t}[\cos(\beta t)\mathbf{a} - \sin(\beta t)\mathbf{b}]$$
   $$\mathbf{x}_2 = e^{\alpha t}[\sin(\beta t)\mathbf{a} + \cos(\beta t)\mathbf{b}]$$

5. **Write general solution**: $\mathbf{x} = c_1\mathbf{x}_1 + c_2\mathbf{x}_2$

## Conclusion

Complex eigenvalues introduce oscillatory behavior to linear systems. The real part $\alpha$ controls exponential growth/decay, while the imaginary part $\beta$ determines oscillation frequency. By extracting real and imaginary parts from complex solutions, we obtain real-valued solutions exhibiting spirals, centers, or periodic motion. Understanding complex eigenvalues is essential for analyzing oscillatory systems in mechanics, circuits, and vibrations.
