# Vector-Valued Functions

## Introduction

Vector-valued functions extend the concept of functions from producing scalar outputs to producing vector outputs. These functions map real numbers (often representing time) to vectors in space, enabling the description of curves, motion, and trajectories. Vector-valued functions are fundamental in physics for describing the motion of particles, in computer graphics for generating curves and surfaces, and in engineering for analyzing mechanical systems. This topic explores the calculus of vector-valued functions, including differentiation, integration, velocity, and acceleration.

## Definition and Notation

### Vector-Valued Function

A **vector-valued function** $\mathbf{r}(t)$ assigns to each value of $t$ in its domain a unique vector. In three-dimensional space:

$$\mathbf{r}(t) = \langle f(t), g(t), h(t) \rangle = f(t)\mathbf{i} + g(t)\mathbf{j} + h(t)\mathbf{k}$$

where $f(t)$, $g(t)$, and $h(t)$ are scalar-valued functions called the **component functions**.

### Domain

The domain of $\mathbf{r}(t)$ is the set of all $t$ values for which all component functions are defined.

### Example

Consider $\mathbf{r}(t) = \langle \cos t, \sin t, t \rangle$. The component functions are:
- $f(t) = \cos t$
- $g(t) = \sin t$
- $h(t) = t$

The domain is all real numbers $t \in \mathbb{R}$.

## Geometric Interpretation

### Space Curves

As $t$ varies, $\mathbf{r}(t)$ traces out a curve in space called a **space curve** or **parametric curve**. The parameter $t$ often represents time.

### Example: Helix

The function $\mathbf{r}(t) = \langle \cos t, \sin t, t \rangle$ describes a circular helix. As $t$ increases:
- The $x$ and $y$ components trace a circle of radius 1
- The $z$ component increases linearly
- The curve spirals upward around the $z$-axis

At $t = 0$: $\mathbf{r}(0) = \langle 1, 0, 0 \rangle$

At $t = 2\pi$: $\mathbf{r}(2\pi) = \langle 1, 0, 2\pi \rangle$

### Example: Circle

$\mathbf{r}(t) = \langle R\cos t, R\sin t, 0 \rangle$ traces a circle of radius $R$ in the $xy$-plane.

## Limits and Continuity

### Limit of a Vector-Valued Function

The limit of $\mathbf{r}(t)$ as $t \to a$ is:

$$\lim_{t \to a} \mathbf{r}(t) = \left\langle \lim_{t \to a} f(t), \lim_{t \to a} g(t), \lim_{t \to a} h(t) \right\rangle$$

provided each component limit exists.

### Continuity

$\mathbf{r}(t)$ is **continuous** at $t = a$ if:

$$\lim_{t \to a} \mathbf{r}(t) = \mathbf{r}(a)$$

This occurs if and only if each component function is continuous at $t = a$.

## Derivatives of Vector-Valued Functions

### Definition

The **derivative** of $\mathbf{r}(t)$ is:

$$\mathbf{r}'(t) = \lim_{h \to 0} \frac{\mathbf{r}(t + h) - \mathbf{r}(t)}{h}$$

provided the limit exists.

### Component-wise Differentiation

The derivative is computed component by component:

$$\mathbf{r}'(t) = \langle f'(t), g'(t), h'(t) \rangle$$

### Notation

Alternative notations include:

$$\mathbf{r}'(t) = \frac{d\mathbf{r}}{dt} = \dot{\mathbf{r}}(t)$$

### Example

For $\mathbf{r}(t) = \langle t^2, \sin t, e^t \rangle$:

$$\mathbf{r}'(t) = \langle 2t, \cos t, e^t \rangle$$

### Geometric Interpretation: Tangent Vector

The derivative $\mathbf{r}'(t)$ is a **tangent vector** to the curve at the point $\mathbf{r}(t)$. It points in the direction of motion and its magnitude represents the rate of change of position.

### Higher-Order Derivatives

Second and higher derivatives are computed by repeated differentiation:

$$\mathbf{r}''(t) = \langle f''(t), g''(t), h''(t) \rangle$$

## Differentiation Rules

Vector-valued functions satisfy differentiation rules analogous to those for scalar functions:

### Scalar Multiple

$$\frac{d}{dt}[c\mathbf{r}(t)] = c\mathbf{r}'(t)$$

### Sum Rule

$$\frac{d}{dt}[\mathbf{u}(t) + \mathbf{v}(t)] = \mathbf{u}'(t) + \mathbf{v}'(t)$$

### Scalar Function Product

$$\frac{d}{dt}[f(t)\mathbf{r}(t)] = f'(t)\mathbf{r}(t) + f(t)\mathbf{r}'(t)$$

### Dot Product Rule

$$\frac{d}{dt}[\mathbf{u}(t) \cdot \mathbf{v}(t)] = \mathbf{u}'(t) \cdot \mathbf{v}(t) + \mathbf{u}(t) \cdot \mathbf{v}'(t)$$

### Cross Product Rule

$$\frac{d}{dt}[\mathbf{u}(t) \times \mathbf{v}(t)] = \mathbf{u}'(t) \times \mathbf{v}(t) + \mathbf{u}(t) \times \mathbf{v}'(t)$$

Note: Order matters due to anti-commutativity of the cross product.

### Chain Rule

If $\mathbf{r}(t)$ is differentiable and $t = t(s)$ is a differentiable function:

$$\frac{d\mathbf{r}}{ds} = \frac{d\mathbf{r}}{dt} \cdot \frac{dt}{ds}$$

## Integrals of Vector-Valued Functions

### Indefinite Integral

The **indefinite integral** (or **antiderivative**) of $\mathbf{r}(t)$ is:

$$\int \mathbf{r}(t)\,dt = \left\langle \int f(t)\,dt, \int g(t)\,dt, \int h(t)\,dt \right\rangle + \mathbf{C}$$

where $\mathbf{C}$ is a constant vector.

### Example

$$\int \langle t, \cos t, 2t \rangle\,dt = \left\langle \frac{t^2}{2}, \sin t, t^2 \right\rangle + \mathbf{C}$$

### Definite Integral

The **definite integral** from $a$ to $b$ is:

$$\int_a^b \mathbf{r}(t)\,dt = \left\langle \int_a^b f(t)\,dt, \int_a^b g(t)\,dt, \int_a^b h(t)\,dt \right\rangle$$

### Example

$$\int_0^{\pi} \langle \cos t, \sin t, 1 \rangle\,dt = \langle [\sin t]_0^{\pi}, [-\cos t]_0^{\pi}, [t]_0^{\pi} \rangle = \langle 0, 2, \pi \rangle$$

## Motion in Space

### Position, Velocity, and Acceleration

For a particle moving along curve $\mathbf{r}(t)$ where $t$ represents time:

**Position**: $\mathbf{r}(t)$

**Velocity**: $\mathbf{v}(t) = \mathbf{r}'(t) = \frac{d\mathbf{r}}{dt}$

**Speed**: $v(t) = |\mathbf{v}(t)| = |\mathbf{r}'(t)|$

**Acceleration**: $\mathbf{a}(t) = \mathbf{v}'(t) = \mathbf{r}''(t) = \frac{d^2\mathbf{r}}{dt^2}$

### Example

A particle moves along $\mathbf{r}(t) = \langle t^2, t^3, t \rangle$. Find velocity and acceleration at $t = 1$.

Velocity:
$$\mathbf{v}(t) = \langle 2t, 3t^2, 1 \rangle$$
$$\mathbf{v}(1) = \langle 2, 3, 1 \rangle$$

Speed:
$$v(1) = \sqrt{4 + 9 + 1} = \sqrt{14}$$

Acceleration:
$$\mathbf{a}(t) = \langle 2, 6t, 0 \rangle$$
$$\mathbf{a}(1) = \langle 2, 6, 0 \rangle$$

### Properties

1. **Constant Speed**: If $|\mathbf{v}(t)|$ is constant, then $\mathbf{v}(t) \cdot \mathbf{a}(t) = 0$ (velocity and acceleration are orthogonal).

2. **Straight-Line Motion**: Motion is along a straight line if and only if $\mathbf{a}(t)$ is parallel to $\mathbf{v}(t)$ (or zero).

### Proof of Property 1

If $|\mathbf{v}(t)| = c$ (constant), then $\mathbf{v}(t) \cdot \mathbf{v}(t) = c^2$. Differentiating:

$$\frac{d}{dt}[\mathbf{v} \cdot \mathbf{v}] = 2\mathbf{v} \cdot \mathbf{v}' = 2\mathbf{v} \cdot \mathbf{a} = 0$$

Therefore $\mathbf{v} \cdot \mathbf{a} = 0$.

## Projectile Motion

An object launched with initial velocity $\mathbf{v}_0$ from position $\mathbf{r}_0$ under gravity has:

$$\mathbf{a}(t) = \langle 0, 0, -g \rangle$$

Integrating once:
$$\mathbf{v}(t) = \mathbf{v}_0 + \int \mathbf{a}(t)\,dt = \mathbf{v}_0 + \langle 0, 0, -gt \rangle$$

Integrating again:
$$\mathbf{r}(t) = \mathbf{r}_0 + \int \mathbf{v}(t)\,dt = \mathbf{r}_0 + \mathbf{v}_0 t + \left\langle 0, 0, -\frac{1}{2}gt^2 \right\rangle$$

### Example

A ball is thrown from the origin with initial velocity $\mathbf{v}_0 = \langle 10, 0, 15 \rangle$ m/s. Find its position after 2 seconds (use $g = 10$ m/s²).

$$\mathbf{r}(2) = \langle 0, 0, 0 \rangle + \langle 10, 0, 15 \rangle \cdot 2 + \langle 0, 0, -5 \cdot 4 \rangle$$

$$= \langle 20, 0, 30 \rangle + \langle 0, 0, -20 \rangle = \langle 20, 0, 10 \rangle$$

The ball is at position $(20, 0, 10)$ meters.

## Unit Tangent Vector

The **unit tangent vector** is the unit vector in the direction of velocity:

$$\mathbf{T}(t) = \frac{\mathbf{r}'(t)}{|\mathbf{r}'(t)|} = \frac{\mathbf{v}(t)}{|\mathbf{v}(t)|}$$

It points in the direction of motion with magnitude 1.

### Example

For $\mathbf{r}(t) = \langle 2\cos t, 2\sin t, 3t \rangle$:

$$\mathbf{r}'(t) = \langle -2\sin t, 2\cos t, 3 \rangle$$

$$|\mathbf{r}'(t)| = \sqrt{4\sin^2 t + 4\cos^2 t + 9} = \sqrt{4 + 9} = \sqrt{13}$$

$$\mathbf{T}(t) = \frac{1}{\sqrt{13}}\langle -2\sin t, 2\cos t, 3 \rangle$$

## Smooth Curves

A curve is **smooth** on an interval if $\mathbf{r}'(t)$ is continuous and $\mathbf{r}'(t) \neq \mathbf{0}$ on that interval. Smooth curves have well-defined tangent vectors everywhere.

## Parametrization by Arc Length

A special parametrization uses arc length $s$ as the parameter instead of $t$. This is advantageous because:

$$\left|\frac{d\mathbf{r}}{ds}\right| = 1$$

The tangent vector has unit length, simplifying many formulas.

### Relationship to General Parameter

If $\mathbf{r}(t)$ is parametrized by $t$, the arc length from $t = a$ is:

$$s(t) = \int_a^t |\mathbf{r}'(u)|\,du$$

## Applications

### Physics

- Trajectory of projectiles
- Orbital mechanics
- Motion of charged particles in electromagnetic fields

### Computer Graphics

- Bezier curves and splines
- Animation paths
- Camera movements

### Engineering

- Robot arm trajectories
- Vehicle path planning
- Mechanical linkages

## Summary

Vector-valued functions $\mathbf{r}(t) = \langle f(t), g(t), h(t) \rangle$ describe curves in space by assigning a vector to each value of the parameter $t$. Differentiation yields the velocity vector $\mathbf{v}(t) = \mathbf{r}'(t)$, which is tangent to the curve, and the acceleration vector $\mathbf{a}(t) = \mathbf{r}''(t)$. Integration recovers position from velocity. The calculus of vector-valued functions provides the mathematical framework for analyzing motion, designing curves, and solving problems in physics, engineering, and computer graphics. The unit tangent vector $\mathbf{T}(t)$ encodes directional information, while the magnitude of the velocity gives the speed of motion.
