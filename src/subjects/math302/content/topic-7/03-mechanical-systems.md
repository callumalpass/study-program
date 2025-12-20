---
title: "Mechanical Systems"
---

# Mechanical Systems

## Introduction

Mechanical systems involving springs, masses, and dampers are modeled by second-order differential equations derived from Newton's second law. These models are fundamental in engineering, from designing suspension systems to analyzing structural vibrations. The mathematical framework is analogous to electrical RLC circuits, demonstrating the universality of differential equation models.

## Newton's Second Law

The foundation of mechanical modeling:

$$F = ma = m\frac{d^2x}{dt^2}$$

where $F$ is net force, $m$ is mass, $a$ is acceleration, and $x$ is displacement.

## Spring-Mass Systems

### Hooke's Law

An ideal spring exerts a restoring force proportional to displacement:

$$F_s = -kx$$

where:
- $k$ is the spring constant (stiffness, N/m)
- $x$ is displacement from equilibrium
- Negative sign indicates force opposes displacement

### Undamped Spring-Mass System

For a mass $m$ attached to a spring with constant $k$, with no damping:

$$m\frac{d^2x}{dt^2} = -kx$$

$$\frac{d^2x}{dt^2} + \omega_0^2 x = 0$$

where $\omega_0 = \sqrt{k/m}$ is the **natural frequency** (rad/s).

### Solution

Characteristic equation: $r^2 + \omega_0^2 = 0 \implies r = \pm i\omega_0$

General solution:

$$x(t) = c_1\cos(\omega_0 t) + c_2\sin(\omega_0 t)$$

or equivalently:

$$x(t) = A\cos(\omega_0 t - \phi)$$

where:
- $A = \sqrt{c_1^2 + c_2^2}$ is the **amplitude**
- $\phi = \arctan(c_2/c_1)$ is the **phase**
- $T = \frac{2\pi}{\omega_0}$ is the **period**
- $f = \frac{1}{T} = \frac{\omega_0}{2\pi}$ is the **frequency** (Hz)

### Example: Undamped Oscillator

A $2kg$ mass on a spring with $k = 50 N/m$ is displaced $0.1m$ and released from rest.

$$\omega_0 = \sqrt{\frac{50}{2}} = 5 \text{ rad/s}$$

Initial conditions: $x(0) = 0.1$, $x'(0) = 0$

$$x(t) = c_1\cos(5t) + c_2\sin(5t)$$

From $x(0) = 0.1$: $c_1 = 0.1$

From $x'(0) = 0$: $-5c_1\sin(0) + 5c_2\cos(0) = 0 \implies c_2 = 0$

$$x(t) = 0.1\cos(5t) \text{ m}$$

Period: $T = \frac{2\pi}{5} \approx 1.26 \text{ seconds}$

## Damped Spring-Mass Systems

### Damping Force

Viscous damping (like friction in oil) is proportional to velocity:

$$F_d = -c\frac{dx}{dt}$$

where $c$ is the damping coefficient (Ns/m).

### Equation of Motion

$$m\frac{d^2x}{dt^2} = -kx - c\frac{dx}{dt}$$

$$m\frac{d^2x}{dt^2} + c\frac{dx}{dt} + kx = 0$$

Dividing by $m$:

$$\frac{d^2x}{dt^2} + 2\alpha\frac{dx}{dt} + \omega_0^2 x = 0$$

where:
- $\alpha = \frac{c}{2m}$ is the **damping coefficient**
- $\omega_0 = \sqrt{k/m}$ is the **natural frequency**

### Characteristic Equation

$$r^2 + 2\alpha r + \omega_0^2 = 0$$

$$r = -\alpha \pm \sqrt{\alpha^2 - \omega_0^2}$$

### Three Cases of Damping

#### 1. Overdamped ($\alpha > \omega_0$ or $c > 2\sqrt{km}$)

Two distinct real roots (both negative):

$$r = -\alpha \pm \sqrt{\alpha^2 - \omega_0^2}$$

$$x(t) = c_1 e^{r_1 t} + c_2 e^{r_2 t}$$

Motion returns to equilibrium without oscillating. High damping prevents oscillation.

#### 2. Critically Damped ($\alpha = \omega_0$ or $c = 2\sqrt{km}$)

Repeated root $r = -\alpha$:

$$x(t) = (c_1 + c_2 t)e^{-\alpha t}$$

**Fastest return to equilibrium without oscillation.** This is optimal for systems like car suspensions and door closers.

Critical damping coefficient: $c_{crit} = 2\sqrt{km}$

#### 3. Underdamped ($\alpha < \omega_0$ or $c < 2\sqrt{km}$)

Complex roots: $r = -\alpha \pm i\omega_d$

where $\omega_d = \sqrt{\omega_0^2 - \alpha^2}$ is the **damped frequency**.

$$x(t) = e^{-\alpha t}(c_1\cos(\omega_d t) + c_2\sin(\omega_d t))$$

or

$$x(t) = Ae^{-\alpha t}\cos(\omega_d t - \phi)$$

**Oscillatory motion with exponentially decaying amplitude.** Most real systems are underdamped.

### Damping Ratio

The **damping ratio** $\zeta = \frac{\alpha}{\omega_0} = \frac{c}{c_{crit}}$ characterizes damping:

- $\zeta < 1$: Underdamped
- $\zeta = 1$: Critically damped
- $\zeta > 1$: Overdamped

### Example: Underdamped System

A $1kg$ mass on a spring ($k = 100 N/m$) with damping $c = 4 Ns/m$. Initial: $x(0) = 0.2m$, $x'(0) = 0$.

$$\omega_0 = \sqrt{100/1} = 10 \text{ rad/s}$$

$$\alpha = \frac{4}{2(1)} = 2$$

Since $\alpha < \omega_0$, underdamped.

$$\omega_d = \sqrt{100 - 4} = \sqrt{96} \approx 9.8 \text{ rad/s}$$

$$x(t) = e^{-2t}(c_1\cos(9.8t) + c_2\sin(9.8t))$$

From $x(0) = 0.2$: $c_1 = 0.2$

From $x'(0) = 0$: $-2c_1 + 9.8c_2 = 0 \implies c_2 = \frac{2(0.2)}{9.8} \approx 0.041$

$$x(t) = e^{-2t}(0.2\cos(9.8t) + 0.041\sin(9.8t))$$

or $x(t) \approx 0.204e^{-2t}\cos(9.8t - 0.2)$

## Forced Oscillations

### External Forcing

An external periodic force $F(t) = F_0\cos(\omega t)$ drives the system:

$$m\frac{d^2x}{dt^2} + c\frac{dx}{dt} + kx = F_0\cos(\omega t)$$

### Solution Structure

General solution = complementary (transient) + particular (steady-state):

$$x(t) = x_c(t) + x_p(t)$$

The complementary solution $x_c(t)$ decays to zero (assuming damping). The particular solution represents steady-state forced oscillation:

$$x_p(t) = A\cos(\omega t - \phi)$$

where:

$$A = \frac{F_0/m}{\sqrt{(\omega_0^2 - \omega^2)^2 + (2\alpha\omega)^2}}$$

$$\tan\phi = \frac{2\alpha\omega}{\omega_0^2 - \omega^2}$$

### Resonance

**Resonance** occurs when the driving frequency equals the natural frequency ($\omega \approx \omega_0$), causing maximum amplitude:

$$A_{max} \approx \frac{F_0}{2m\alpha\omega_0} = \frac{F_0}{c\omega_0}$$

For small damping, resonance amplitude can be very large, potentially causing structural failure (e.g., Tacoma Narrows Bridge collapse).

### Resonance Frequency

The amplitude is maximum at:

$$\omega_{res} = \sqrt{\omega_0^2 - 2\alpha^2} = \omega_0\sqrt{1 - 2\zeta^2}$$

For light damping ($\alpha \ll \omega_0$), $\omega_{res} \approx \omega_0$.

### Example: Forced Oscillation

Mass $m = 1kg$, spring $k = 25 N/m$, damping $c = 2 Ns/m$, force $F(t) = 10\cos(4t)$.

$$\omega_0 = 5, \quad \alpha = 1, \quad F_0 = 10, \quad \omega = 4$$

$$A = \frac{10/1}{\sqrt{(25-16)^2 + (2 \cdot 1 \cdot 4)^2}} = \frac{10}{\sqrt{81+64}} = \frac{10}{\sqrt{145}} \approx 0.83 \text{ m}$$

$$\tan\phi = \frac{8}{9} \implies \phi \approx 0.73 \text{ rad}$$

Steady-state: $x_p(t) = 0.83\cos(4t - 0.73)$

## Pendulum

### Small Angle Approximation

For a pendulum of length $L$ with mass $m$, angle $\theta$ from vertical:

$$mL\frac{d^2\theta}{dt^2} = -mg\sin\theta$$

For small angles, $\sin\theta \approx \theta$:

$$\frac{d^2\theta}{dt^2} + \frac{g}{L}\theta = 0$$

This is simple harmonic motion with $\omega_0 = \sqrt{g/L}$.

Period: $T = 2\pi\sqrt{L/g}$ (independent of mass!)

### Nonlinear Pendulum

For large angles, the equation is nonlinear and requires numerical or elliptic function solutions.

## Coupled Oscillators

Two masses connected by springs exhibit coupled motion described by a system of differential equations. Normal modes allow independent oscillation at specific frequencies.

## Summary

| System | Equation | Behavior |
|--------|----------|----------|
| Undamped | $\ddot{x} + \omega_0^2 x = 0$ | Harmonic oscillation |
| Overdamped | $\ddot{x} + 2\alpha\dot{x} + \omega_0^2 x = 0$, $\alpha > \omega_0$ | Non-oscillatory decay |
| Critically damped | $\alpha = \omega_0$ | Fastest non-oscillatory return |
| Underdamped | $\alpha < \omega_0$ | Damped oscillation |
| Forced | $\ddot{x} + 2\alpha\dot{x} + \omega_0^2 x = F_0\cos(\omega t)$ | Resonance at $\omega \approx \omega_0$ |

Mechanical oscillators demonstrate fundamental concepts in vibration analysis, structural engineering, and dynamic systems, with applications ranging from building design to automotive suspension systems.
