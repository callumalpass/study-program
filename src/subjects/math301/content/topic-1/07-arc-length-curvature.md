---
id: math301-topic-1-7
title: "Arc Length and Curvature"
order: 7
---

# Arc Length and Curvature

## Introduction

Arc length and curvature are fundamental concepts for analyzing the geometry of curves in space. Arc length measures the distance traveled along a curve, while curvature quantifies how sharply a curve bends. These concepts are essential in differential geometry, physics (for describing particle paths), engineering (for designing roads and tracks), and computer graphics (for rendering smooth curves). The TNB frame (tangent, normal, binormal) provides a moving coordinate system that travels along a curve, offering deep geometric insight.

## Arc Length

### Definition

The **arc length** of a curve traced by $\mathbf{r}(t)$ from $t = a$ to $t = b$ is the distance traveled along the curve:

$$L = \int_a^b |\mathbf{r}'(t)|\,dt = \int_a^b \sqrt{[f'(t)]^2 + [g'(t)]^2 + [h'(t)]^2}\,dt$$

This generalizes the arc length formula from single-variable calculus.

### Derivation

Consider a small segment of the curve from $t$ to $t + \Delta t$. The displacement is approximately $\mathbf{r}'(t)\Delta t$, with length $|\mathbf{r}'(t)|\Delta t$. Summing these infinitesimal lengths and taking the limit gives the integral.

### Example: Arc Length of a Helix

Find the arc length of the helix $\mathbf{r}(t) = \langle a\cos t, a\sin t, bt \rangle$ from $t = 0$ to $t = 2\pi$.

$$\mathbf{r}'(t) = \langle -a\sin t, a\cos t, b \rangle$$

$$|\mathbf{r}'(t)| = \sqrt{a^2\sin^2 t + a^2\cos^2 t + b^2} = \sqrt{a^2 + b^2}$$

$$L = \int_0^{2\pi} \sqrt{a^2 + b^2}\,dt = 2\pi\sqrt{a^2 + b^2}$$

For $a = 1, b = 1$:

$$L = 2\pi\sqrt{2}$$

### Example: Circle

A circle of radius $r$ parametrized by $\mathbf{r}(t) = \langle r\cos t, r\sin t, 0 \rangle$ from $t = 0$ to $t = 2\pi$ has:

$$|\mathbf{r}'(t)| = |r\langle -\sin t, \cos t, 0 \rangle| = r$$

$$L = \int_0^{2\pi} r\,dt = 2\pi r$$

This confirms the familiar circumference formula.

## Arc Length Function

The **arc length function** measures the distance from a fixed starting point $t = a$:

$$s(t) = \int_a^t |\mathbf{r}'(u)|\,du$$

This function increases monotonically along the curve.

### Derivative

By the Fundamental Theorem of Calculus:

$$\frac{ds}{dt} = |\mathbf{r}'(t)|$$

This is the **speed** of traversal along the curve.

## Arc Length Parametrization

A curve is **parametrized by arc length** if the parameter is the arc length $s$ itself. In this case:

$$\left|\frac{d\mathbf{r}}{ds}\right| = 1$$

The tangent vector has unit length, simplifying many formulas.

### Converting to Arc Length Parameter

To reparametrize a curve by arc length:

1. Compute $s(t) = \int_a^t |\mathbf{r}'(u)|\,du$
2. Solve for $t$ as a function of $s$: $t = t(s)$
3. Substitute: $\mathbf{r}(s) = \mathbf{r}(t(s))$

This is often difficult analytically but useful conceptually.

### Example

For the helix $\mathbf{r}(t) = \langle \cos t, \sin t, t \rangle$, we have $|\mathbf{r}'(t)| = \sqrt{2}$, so:

$$s = \sqrt{2}t \implies t = \frac{s}{\sqrt{2}}$$

$$\mathbf{r}(s) = \left\langle \cos\frac{s}{\sqrt{2}}, \sin\frac{s}{\sqrt{2}}, \frac{s}{\sqrt{2}} \right\rangle$$

Verification:
$$\frac{d\mathbf{r}}{ds} = \left\langle -\frac{1}{\sqrt{2}}\sin\frac{s}{\sqrt{2}}, \frac{1}{\sqrt{2}}\cos\frac{s}{\sqrt{2}}, \frac{1}{\sqrt{2}} \right\rangle$$

$$\left|\frac{d\mathbf{r}}{ds}\right| = \sqrt{\frac{1}{2}\sin^2\frac{s}{\sqrt{2}} + \frac{1}{2}\cos^2\frac{s}{\sqrt{2}} + \frac{1}{2}} = \sqrt{\frac{1}{2} + \frac{1}{2}} = 1$$ ✓

## Curvature

### Definition

**Curvature** $\kappa$ (kappa) measures how sharply a curve bends. For a curve parametrized by arc length:

$$\kappa = \left|\frac{d\mathbf{T}}{ds}\right|$$

where $\mathbf{T}$ is the unit tangent vector.

Geometrically, curvature is the rate at which the tangent direction changes with respect to arc length.

### General Formula

For a curve parametrized by arbitrary parameter $t$:

$$\kappa = \frac{|\mathbf{T}'(t)|}{|\mathbf{r}'(t)|} = \frac{|\mathbf{r}'(t) \times \mathbf{r}''(t)|}{|\mathbf{r}'(t)|^3}$$

The second formula avoids computing $\mathbf{T}$ explicitly.

### Derivation of Cross Product Formula

Using the chain rule:

$$\frac{d\mathbf{T}}{ds} = \frac{d\mathbf{T}}{dt} \cdot \frac{dt}{ds} = \frac{\mathbf{T}'(t)}{|\mathbf{r}'(t)|}$$

Therefore:

$$\kappa = \left|\frac{d\mathbf{T}}{ds}\right| = \frac{|\mathbf{T}'(t)|}{|\mathbf{r}'(t)|}$$

The cross product formula comes from:

$$\mathbf{T} = \frac{\mathbf{r}'}{|\mathbf{r}'|}$$

Differentiating and simplifying (using properties of cross products) yields the alternative form.

### Example: Circle

For a circle of radius $r$:

$$\mathbf{r}(t) = \langle r\cos t, r\sin t, 0 \rangle$$

$$\mathbf{r}'(t) = \langle -r\sin t, r\cos t, 0 \rangle, \quad \mathbf{r}''(t) = \langle -r\cos t, -r\sin t, 0 \rangle$$

$$\mathbf{r}'(t) \times \mathbf{r}''(t) = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ -r\sin t & r\cos t & 0 \\ -r\cos t & -r\sin t & 0 \end{vmatrix} = \mathbf{k}(r^2\sin^2 t + r^2\cos^2 t) = r^2\mathbf{k}$$

$$|\mathbf{r}'(t) \times \mathbf{r}''(t)| = r^2$$

$$|\mathbf{r}'(t)| = r$$

$$\kappa = \frac{r^2}{r^3} = \frac{1}{r}$$

The curvature of a circle is constant and equals the reciprocal of the radius. Smaller circles have greater curvature.

### Example: Helix

For $\mathbf{r}(t) = \langle a\cos t, a\sin t, bt \rangle$:

$$\mathbf{r}'(t) = \langle -a\sin t, a\cos t, b \rangle$$

$$\mathbf{r}''(t) = \langle -a\cos t, -a\sin t, 0 \rangle$$

$$\mathbf{r}'(t) \times \mathbf{r}''(t) = \langle ab\sin t, -ab\cos t, a^2 \rangle$$

$$|\mathbf{r}'(t) \times \mathbf{r}''(t)| = \sqrt{a^2b^2\sin^2 t + a^2b^2\cos^2 t + a^4} = a\sqrt{a^2 + b^2}$$

$$|\mathbf{r}'(t)| = \sqrt{a^2 + b^2}$$

$$\kappa = \frac{a\sqrt{a^2 + b^2}}{(a^2 + b^2)^{3/2}} = \frac{a}{a^2 + b^2}$$

The curvature is constant for a helix.

### Straight Line

For a straight line $\mathbf{r}(t) = \mathbf{r}_0 + t\mathbf{v}$:

$$\mathbf{r}'(t) = \mathbf{v}, \quad \mathbf{r}''(t) = \mathbf{0}$$

$$\kappa = 0$$

Straight lines have zero curvature—they don't bend.

## Radius of Curvature

The **radius of curvature** is:

$$\rho = \frac{1}{\kappa}$$

It represents the radius of the "best-fitting" circle (osculating circle) at a point on the curve.

## The TNB Frame

### Unit Tangent Vector $\mathbf{T}$

$$\mathbf{T}(t) = \frac{\mathbf{r}'(t)}{|\mathbf{r}'(t)|}$$

Points in the direction of motion.

### Principal Unit Normal Vector $\mathbf{N}$

The **principal unit normal** points in the direction the curve is turning:

$$\mathbf{N}(t) = \frac{\mathbf{T}'(t)}{|\mathbf{T}'(t)|}$$

For arc length parametrization:

$$\mathbf{N} = \frac{d\mathbf{T}/ds}{|d\mathbf{T}/ds|} = \frac{d\mathbf{T}/ds}{\kappa}$$

$\mathbf{N}$ is perpendicular to $\mathbf{T}$ and points toward the center of curvature.

### Binormal Vector $\mathbf{B}$

The **binormal vector** is:

$$\mathbf{B}(t) = \mathbf{T}(t) \times \mathbf{N}(t)$$

It is perpendicular to both $\mathbf{T}$ and $\mathbf{N}$, forming a right-handed orthonormal basis.

### Properties

1. $\mathbf{T}$, $\mathbf{N}$, $\mathbf{B}$ are mutually orthogonal unit vectors
2. $\mathbf{T} \cdot \mathbf{N} = 0$, $\mathbf{N} \cdot \mathbf{B} = 0$, $\mathbf{B} \cdot \mathbf{T} = 0$
3. $|\mathbf{T}| = |\mathbf{N}| = |\mathbf{B}| = 1$
4. $\mathbf{B} = \mathbf{T} \times \mathbf{N}$, $\mathbf{T} = \mathbf{N} \times \mathbf{B}$, $\mathbf{N} = \mathbf{B} \times \mathbf{T}$

The TNB frame is also called the **Frenet-Serret frame**.

### Example: TNB Frame for a Helix

For $\mathbf{r}(t) = \langle \cos t, \sin t, t \rangle$:

$$\mathbf{r}'(t) = \langle -\sin t, \cos t, 1 \rangle, \quad |\mathbf{r}'(t)| = \sqrt{2}$$

$$\mathbf{T}(t) = \frac{1}{\sqrt{2}}\langle -\sin t, \cos t, 1 \rangle$$

$$\mathbf{T}'(t) = \frac{1}{\sqrt{2}}\langle -\cos t, -\sin t, 0 \rangle$$

$$|\mathbf{T}'(t)| = \frac{1}{\sqrt{2}}$$

$$\mathbf{N}(t) = \frac{\mathbf{T}'(t)}{|\mathbf{T}'(t)|} = \langle -\cos t, -\sin t, 0 \rangle$$

$$\mathbf{B}(t) = \mathbf{T} \times \mathbf{N} = \frac{1}{\sqrt{2}}\langle \sin t, -\cos t, 1 \rangle$$

## Acceleration Decomposition

Acceleration can be decomposed into tangential and normal components:

$$\mathbf{a} = a_T\mathbf{T} + a_N\mathbf{N}$$

where:

**Tangential component**: $a_T = \frac{d|\mathbf{v}|}{dt}$ (changes speed)

**Normal component**: $a_N = \kappa|\mathbf{v}|^2 = \frac{|\mathbf{v}|^2}{\rho}$ (changes direction)

### Formulas

$$a_T = \frac{\mathbf{v} \cdot \mathbf{a}}{|\mathbf{v}|}$$

$$a_N = \frac{|\mathbf{v} \times \mathbf{a}|}{|\mathbf{v}|}$$

The normal component is responsible for centripetal acceleration in circular motion.

## Torsion

**Torsion** $\tau$ (tau) measures how much a curve twists out of its osculating plane:

$$\tau = -\mathbf{N} \cdot \frac{d\mathbf{B}}{ds}$$

For a general parameter:

$$\tau = \frac{(\mathbf{r}' \times \mathbf{r}'') \cdot \mathbf{r}'''}{|\mathbf{r}' \times \mathbf{r}''|^2}$$

Torsion is zero for planar curves. The helix has constant torsion.

## Frenet-Serret Formulas

The TNB frame satisfies differential equations called the **Frenet-Serret formulas**:

$$\frac{d\mathbf{T}}{ds} = \kappa\mathbf{N}$$

$$\frac{d\mathbf{N}}{ds} = -\kappa\mathbf{T} + \tau\mathbf{B}$$

$$\frac{d\mathbf{B}}{ds} = -\tau\mathbf{N}$$

These describe how the frame rotates as it moves along the curve.

## Applications

### Highway Design

Engineers use curvature to design safe roads. Maximum curvature (minimum radius) depends on speed limits and banking angles to ensure vehicles don't skid.

### Physics

- Particle motion in magnetic fields follows helical paths with constant curvature and torsion
- Curvature appears in general relativity (curvature of spacetime)

### Computer Graphics

- Bezier and spline curves are designed with controlled curvature for smooth appearance
- Camera paths use curvature to create natural motion

### Robotics

- Path planning requires bounded curvature to match physical constraints of robots

## Summary

Arc length $L = \int_a^b |\mathbf{r}'(t)|\,dt$ measures the distance along a curve. Curvature $\kappa$ quantifies how sharply a curve bends and can be computed from $\kappa = |\mathbf{r}' \times \mathbf{r}''|/|\mathbf{r}'|^3$. The TNB frame consists of the unit tangent $\mathbf{T}$, principal normal $\mathbf{N}$, and binormal $\mathbf{B}$ vectors, forming an orthonormal basis that moves along the curve. The curvature of a circle is $1/r$, and straight lines have zero curvature. Torsion measures out-of-plane twisting. These concepts provide a complete geometric description of curves in space and are fundamental to differential geometry and its applications.
