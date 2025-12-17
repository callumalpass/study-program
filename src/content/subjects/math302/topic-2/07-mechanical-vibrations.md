---
title: "Mechanical Vibrations and Applications"
---

# Mechanical Vibrations and Applications

## The Mass-Spring System

A mass-spring system is modeled by **Newton's Second Law**:

$$F = ma$$

For a mass $m$ attached to a spring with spring constant $k$, subject to damping force (proportional to velocity) and external forcing:

$$m\frac{d^2x}{dt^2} = -kx - c\frac{dx}{dt} + F(t)$$

where:
- $x(t)$ is displacement from equilibrium
- $m$ is mass
- $k$ is spring constant (stiffness)
- $c$ is damping coefficient
- $F(t)$ is external forcing

Rearranging:
$$m\frac{d^2x}{dt^2} + c\frac{dx}{dt} + kx = F(t)$$

This is a **second-order linear differential equation with constant coefficients**.

## Free Vibrations (Unforced Motion)

When $F(t) = 0$, the system undergoes **free vibrations**:

$$m\frac{d^2x}{dt^2} + c\frac{dx}{dt} + kx = 0$$

Dividing by $m$:
$$\frac{d^2x}{dt^2} + \frac{c}{m}\frac{dx}{dt} + \frac{k}{m}x = 0$$

Define:
- **Natural frequency**: $\omega_0 = \sqrt{\frac{k}{m}}$
- **Damping coefficient**: $\gamma = \frac{c}{2m}$

The equation becomes:
$$\frac{d^2x}{dt^2} + 2\gamma\frac{dx}{dt} + \omega_0^2 x = 0$$

Characteristic equation:
$$r^2 + 2\gamma r + \omega_0^2 = 0$$

Discriminant:
$$\Delta = 4\gamma^2 - 4\omega_0^2 = 4(\gamma^2 - \omega_0^2)$$

The behavior depends on the sign of $\gamma^2 - \omega_0^2$, leading to three cases.

## Case 1: Underdamped ($\gamma < \omega_0$ or $c^2 < 4mk$)

**Condition**: Damping is weak.

**Roots**: Complex conjugate $r = -\gamma \pm i\omega_d$

where the **damped frequency** is:
$$\omega_d = \sqrt{\omega_0^2 - \gamma^2}$$

**General solution**:
$$x(t) = e^{-\gamma t}(c_1\cos\omega_d t + c_2\sin\omega_d t)$$

**Alternative form** (amplitude-phase):
$$x(t) = Ae^{-\gamma t}\cos(\omega_d t - \phi)$$

where $A = \sqrt{c_1^2 + c_2^2}$ and $\tan\phi = c_2/c_1$.

**Behavior**:
- Oscillations with **exponentially decaying amplitude**
- Period: $T = \frac{2\pi}{\omega_d}$
- Envelope: $\pm Ae^{-\gamma t}$

**Example 1**: A 2 kg mass is attached to a spring with $k = 50$ N/m and damping $c = 4$ N·s/m. The mass is displaced 0.1 m and released from rest. Find $x(t)$.

$$\omega_0 = \sqrt{\frac{50}{2}} = 5 \text{ rad/s}$$
$$\gamma = \frac{4}{2 \cdot 2} = 1 \text{ s}^{-1}$$
$$\omega_d = \sqrt{25 - 1} = \sqrt{24} = 2\sqrt{6} \text{ rad/s}$$

General solution:
$$x(t) = e^{-t}(c_1\cos(2\sqrt{6}t) + c_2\sin(2\sqrt{6}t))$$

Initial conditions: $x(0) = 0.1$, $x'(0) = 0$

$$x(0) = c_1 = 0.1$$

$$x'(t) = -e^{-t}(c_1\cos(2\sqrt{6}t) + c_2\sin(2\sqrt{6}t)) + e^{-t}(-2\sqrt{6}c_1\sin(2\sqrt{6}t) + 2\sqrt{6}c_2\cos(2\sqrt{6}t))$$
$$x'(0) = -c_1 + 2\sqrt{6}c_2 = 0$$
$$c_2 = \frac{c_1}{2\sqrt{6}} = \frac{0.1}{2\sqrt{6}} = \frac{0.05}{\sqrt{6}}$$

Therefore:
$$x(t) = e^{-t}\left(0.1\cos(2\sqrt{6}t) + \frac{0.05}{\sqrt{6}}\sin(2\sqrt{6}t)\right)$$

## Case 2: Overdamped ($\gamma > \omega_0$ or $c^2 > 4mk$)

**Condition**: Damping is strong.

**Roots**: Two distinct negative real roots
$$r_1 = -\gamma + \sqrt{\gamma^2 - \omega_0^2}, \quad r_2 = -\gamma - \sqrt{\gamma^2 - \omega_0^2}$$

**General solution**:
$$x(t) = c_1e^{r_1 t} + c_2e^{r_2 t}$$

**Behavior**:
- **No oscillations**
- Exponential decay to equilibrium
- Both $r_1$ and $r_2$ are negative, so $x(t) \to 0$ as $t \to \infty$

**Example 2**: A 1 kg mass with $k = 9$ N/m and $c = 10$ N·s/m starts at $x(0) = 1$ m with $x'(0) = 0$.

$$\omega_0 = \sqrt{9} = 3, \quad \gamma = \frac{10}{2} = 5$$

Since $\gamma > \omega_0$, overdamped.

$$r_1 = -5 + \sqrt{25-9} = -5 + 4 = -1$$
$$r_2 = -5 - 4 = -9$$

$$x(t) = c_1e^{-t} + c_2e^{-9t}$$

From $x(0) = 1$: $c_1 + c_2 = 1$

From $x'(0) = 0$: $-c_1 - 9c_2 = 0$, so $c_1 = -9c_2$

Solving: $-9c_2 + c_2 = 1 \Rightarrow c_2 = -\frac{1}{8}$, $c_1 = \frac{9}{8}$

$$x(t) = \frac{9}{8}e^{-t} - \frac{1}{8}e^{-9t}$$

The mass returns to equilibrium without oscillating.

## Case 3: Critically Damped ($\gamma = \omega_0$ or $c^2 = 4mk$)

**Condition**: Boundary between underdamped and overdamped.

**Root**: Repeated root $r = -\gamma$

**General solution**:
$$x(t) = (c_1 + c_2t)e^{-\gamma t}$$

**Behavior**:
- **No oscillations**
- **Fastest return to equilibrium** without oscillating
- Optimal damping for many engineering applications (e.g., car suspensions, door closers)

**Example 3**: Critical damping with $m = 1$ kg, $k = 16$ N/m, and $c = 8$ N·s/m.

$$\omega_0 = 4, \quad \gamma = 4$$

Critically damped: $r = -4$

$$x(t) = (c_1 + c_2t)e^{-4t}$$

With $x(0) = 0.5$, $x'(0) = 2$:

$$c_1 = 0.5$$
$$x'(t) = c_2e^{-4t} - 4(c_1 + c_2t)e^{-4t}$$
$$x'(0) = c_2 - 4c_1 = 2$$
$$c_2 = 2 + 2 = 4$$

$$x(t) = (0.5 + 4t)e^{-4t}$$

## Forced Vibrations

When $F(t) \neq 0$, the equation is:
$$m\frac{d^2x}{dt^2} + c\frac{dx}{dt} + kx = F(t)$$

**General solution**: $x(t) = x_c(t) + x_p(t)$

where $x_c$ is the complementary (transient) solution and $x_p$ is the particular (steady-state) solution.

### Harmonic Forcing

Consider **sinusoidal forcing**: $F(t) = F_0\cos\omega t$

$$m\frac{d^2x}{dt^2} + c\frac{dx}{dt} + kx = F_0\cos\omega t$$

The particular solution has the form:
$$x_p(t) = A\cos(\omega t - \delta)$$

where $A$ is the **amplitude** and $\delta$ is the **phase lag**.

After substitution and algebra:
$$A = \frac{F_0/m}{\sqrt{(\omega_0^2 - \omega^2)^2 + (2\gamma\omega)^2}}$$
$$\tan\delta = \frac{2\gamma\omega}{\omega_0^2 - \omega^2}$$

### Resonance

**Resonance** occurs when the forcing frequency $\omega$ equals the natural frequency $\omega_0$ (in the undamped case) or near $\omega_0$ (with damping).

For **undamped forced vibrations** ($c = 0$, $\omega = \omega_0$):
$$\frac{d^2x}{dt^2} + \omega_0^2 x = \frac{F_0}{m}\cos\omega_0 t$$

The forcing term matches the complementary solution, causing **resonance**. The particular solution is:
$$x_p(t) = \frac{F_0}{2m\omega_0}t\sin\omega_0 t$$

**Amplitude grows linearly with time** → unbounded oscillations → catastrophic failure!

**Example 4**: Tacoma Narrows Bridge collapse (1940) resulted from wind-induced resonance.

**With damping**, resonance still occurs but amplitude remains bounded:
$$A_{\text{max}} = \frac{F_0/m}{2\gamma\sqrt{\omega_0^2 - \gamma^2}}$$

at frequency $\omega_{\text{res}} = \sqrt{\omega_0^2 - 2\gamma^2}$ (slightly below $\omega_0$).

## RLC Electrical Circuits

An RLC circuit with inductance $L$, resistance $R$, capacitance $C$, and voltage source $E(t)$ obeys:

$$L\frac{d^2Q}{dt^2} + R\frac{dQ}{dt} + \frac{1}{C}Q = E(t)$$

where $Q(t)$ is charge.

**Analogy to mass-spring system**:

| Mechanical | Electrical |
|------------|------------|
| Mass $m$ | Inductance $L$ |
| Damping $c$ | Resistance $R$ |
| Spring constant $k$ | Reciprocal capacitance $1/C$ |
| Displacement $x$ | Charge $Q$ |
| Force $F(t)$ | Voltage $E(t)$ |

The same mathematical analysis applies!

**Example 5**: An LC circuit (no resistance) with $L = 1$ H, $C = 0.25$ F, $Q(0) = 10$ C, $I(0) = 0$ A.

$$\frac{d^2Q}{dt^2} + \frac{1}{0.25}Q = 0$$
$$\frac{d^2Q}{dt^2} + 4Q = 0$$

$$Q(t) = c_1\cos 2t + c_2\sin 2t$$

From $Q(0) = 10$: $c_1 = 10$

$I = \frac{dQ}{dt} = -2c_1\sin 2t + 2c_2\cos 2t$

From $I(0) = 0$: $c_2 = 0$

$$Q(t) = 10\cos 2t$$

The charge oscillates between $\pm 10$ C with period $\pi$ s.

## Quality Factor

The **quality factor** $Q$ measures how underdamped an oscillator is:

$$Q = \frac{\omega_0}{2\gamma} = \frac{\sqrt{km}}{c}$$

- **High $Q$** ($Q \gg 1$): Lightly damped, sharp resonance peak
- **Low $Q$** ($Q \sim 1$): Heavily damped, broad resonance

For RLC circuits: $Q = \frac{1}{R}\sqrt{\frac{L}{C}}$

## Beats

When two frequencies $\omega_1$ and $\omega_2$ are close but not equal, **beats** occur:

$$\cos\omega_1 t + \cos\omega_2 t = 2\cos\left(\frac{\omega_1 - \omega_2}{2}t\right)\cos\left(\frac{\omega_1 + \omega_2}{2}t\right)$$

This appears as oscillations at the average frequency $\frac{\omega_1 + \omega_2}{2}$, modulated by a slow envelope at beat frequency $\frac{\omega_1 - \omega_2}{2}$.

**Application**: Tuning musical instruments by listening for beats.

## Nonlinear Oscillations

For large amplitudes, Hooke's law may not hold, leading to **nonlinear oscillators**:
$$\frac{d^2x}{dt^2} + \omega_0^2\sin x = 0$$

(pendulum equation for large angles)

These require numerical or qualitative methods beyond the scope of linear theory.

## Conclusion

Mechanical vibrations provide a rich application of second-order linear differential equations. The interplay between damping, natural frequency, and forcing leads to diverse behaviors: exponential decay, damped oscillations, resonance, and beats. Understanding these phenomena is crucial in engineering (vibration isolation, resonance avoidance), physics (quantum harmonic oscillator), and signal processing (filters, oscillators). The mathematical framework developed for mass-spring systems extends directly to electrical circuits and many other physical systems, demonstrating the unifying power of differential equations.
