---
title: "Electrical Circuits"
---

# Electrical Circuits

## Introduction

Electrical circuits provide one of the most important applications of differential equations. The behavior of current and voltage in circuits containing resistors, capacitors, and inductors is governed by differential equations derived from Kirchhoff's laws. These models are fundamental in electrical engineering and physics.

## Basic Circuit Elements

### Resistor (R)

Ohm's law relates voltage drop $V_R$ and current $I$:

$$V_R = IR$$

where $R$ is resistance (measured in ohms, $\Omega$).

### Inductor (L)

An inductor opposes changes in current:

$$V_L = L\frac{dI}{dt}$$

where $L$ is inductance (measured in henrys, H).

### Capacitor (C)

A capacitor stores charge $Q = CV$:

$$I = \frac{dQ}{dt} = C\frac{dV_C}{dt}$$

or equivalently:

$$V_C = \frac{1}{C}\int I \, dt = \frac{Q}{C}$$

where $C$ is capacitance (measured in farads, F).

## Kirchhoff's Laws

### Kirchhoff's Voltage Law (KVL)

The sum of voltage drops around any closed loop equals the applied voltage:

$$E(t) = V_R + V_L + V_C$$

### Kirchhoff's Current Law (KCL)

The sum of currents entering a node equals the sum leaving the node.

## RC Circuits

### Series RC Circuit

For a resistor and capacitor in series with voltage source $E(t)$:

$$E(t) = IR + \frac{Q}{C}$$

Since $I = \frac{dQ}{dt}$:

$$E(t) = R\frac{dQ}{dt} + \frac{Q}{C}$$

This is a first-order linear equation:

$$\frac{dQ}{dt} + \frac{1}{RC}Q = \frac{E(t)}{R}$$

### Solution for Constant Voltage

If $E(t) = E_0$ (constant), with $Q(0) = 0$:

$$\frac{dQ}{dt} + \frac{Q}{RC} = \frac{E_0}{R}$$

Using integrating factor $\mu = e^{t/(RC)}$:

$$Q(t) = CE_0(1 - e^{-t/(RC)})$$

The voltage across the capacitor:

$$V_C(t) = \frac{Q(t)}{C} = E_0(1 - e^{-t/(RC)})$$

The current:

$$I(t) = \frac{dQ}{dt} = \frac{E_0}{R}e^{-t/(RC)}$$

### Time Constant

The **time constant** $\tau = RC$ characterizes the response speed:

- At $t = \tau$: $V_C = E_0(1 - e^{-1}) \approx 0.63E_0$
- At $t = 5\tau$: $V_C \approx 0.993E_0$ (essentially fully charged)

### Example: Charging Capacitor

A $10\mu F$ capacitor and $1k\Omega$ resistor are connected to a $12V$ battery.

Time constant: $\tau = RC = 10^{-5} \times 10^3 = 0.01s = 10ms$

Voltage across capacitor:

$$V_C(t) = 12(1 - e^{-t/0.01})$$

After $50ms$ ($5\tau$): $V_C \approx 12V$ (fully charged)

## RL Circuits

### Series RL Circuit

For a resistor and inductor in series:

$$E(t) = IR + L\frac{dI}{dt}$$

$$\frac{dI}{dt} + \frac{R}{L}I = \frac{E(t)}{L}$$

### Solution for Constant Voltage

If $E(t) = E_0$ with $I(0) = 0$:

$$I(t) = \frac{E_0}{R}(1 - e^{-Rt/L})$$

Time constant: $\tau = \frac{L}{R}$

As $t \to \infty$: $I \to \frac{E_0}{R}$ (steady-state current)

### Example: Current Buildup

A $0.1H$ inductor and $5\Omega$ resistor are connected to a $10V$ source.

Time constant: $\tau = \frac{L}{R} = \frac{0.1}{5} = 0.02s = 20ms$

$$I(t) = \frac{10}{5}(1 - e^{-t/0.02}) = 2(1 - e^{-50t}) \text{ A}$$

Steady-state current: $I_{ss} = 2A$

## RLC Circuits

### Series RLC Circuit

All three elements in series with voltage source $E(t)$:

$$E(t) = IR + L\frac{dI}{dt} + \frac{Q}{C}$$

Differentiating with respect to $t$ and using $I = \frac{dQ}{dt}$:

$$\frac{dE}{dt} = R\frac{dI}{dt} + L\frac{d^2I}{dt^2} + \frac{I}{C}$$

For constant $E_0$:

$$L\frac{d^2I}{dt^2} + R\frac{dI}{dt} + \frac{I}{C} = 0$$

Dividing by $L$:

$$\frac{d^2I}{dt^2} + \frac{R}{L}\frac{dI}{dt} + \frac{1}{LC}I = 0$$

This is a second-order linear homogeneous equation.

### Characteristic Equation

$$r^2 + \frac{R}{L}r + \frac{1}{LC} = 0$$

$$r = -\frac{R}{2L} \pm \sqrt{\left(\frac{R}{2L}\right)^2 - \frac{1}{LC}}$$

Define:
- **Natural frequency**: $\omega_0 = \frac{1}{\sqrt{LC}}$
- **Damping coefficient**: $\alpha = \frac{R}{2L}$

Then: $r = -\alpha \pm \sqrt{\alpha^2 - \omega_0^2}$

### Three Cases

#### 1. Overdamped ($\alpha > \omega_0$ or $R > 2\sqrt{L/C}$)

Two distinct real roots:

$$r_{1,2} = -\alpha \pm \sqrt{\alpha^2 - \omega_0^2}$$

$$I(t) = c_1 e^{r_1 t} + c_2 e^{r_2 t}$$

Current decays to zero without oscillation.

#### 2. Critically Damped ($\alpha = \omega_0$ or $R = 2\sqrt{L/C}$)

Repeated root $r = -\alpha$:

$$I(t) = (c_1 + c_2 t)e^{-\alpha t}$$

Fastest decay to zero without oscillation.

#### 3. Underdamped ($\alpha < \omega_0$ or $R < 2\sqrt{L/C}$)

Complex conjugate roots: $r = -\alpha \pm i\omega_d$

where $\omega_d = \sqrt{\omega_0^2 - \alpha^2}$ is the **damped frequency**.

$$I(t) = e^{-\alpha t}(c_1\cos(\omega_d t) + c_2\sin(\omega_d t))$$

or

$$I(t) = Ae^{-\alpha t}\cos(\omega_d t - \phi)$$

Current oscillates while decaying to zero.

### Example: RLC Circuit

Given $L = 1H$, $R = 6\Omega$, $C = \frac{1}{8}F$, $I(0) = 0$, $I'(0) = 10$.

$$\omega_0 = \frac{1}{\sqrt{LC}} = \frac{1}{\sqrt{1/8}} = 2\sqrt{2} \approx 2.83$$

$$\alpha = \frac{R}{2L} = \frac{6}{2} = 3$$

Since $\alpha > \omega_0$, the circuit is **overdamped**.

$$r = -3 \pm \sqrt{9 - 8} = -3 \pm 1 = -2, -4$$

$$I(t) = c_1 e^{-2t} + c_2 e^{-4t}$$

From $I(0) = 0$: $c_1 + c_2 = 0$

From $I'(0) = 10$: $-2c_1 - 4c_2 = 10$

Solving: $c_1 = 5$, $c_2 = -5$

$$I(t) = 5(e^{-2t} - e^{-4t})$$

## Forced RLC Circuits

With AC source $E(t) = E_0\cos(\omega t)$:

$$L\frac{d^2I}{dt^2} + R\frac{dI}{dt} + \frac{I}{C} = -E_0\omega\sin(\omega t)$$

The steady-state solution has the form:

$$I_{ss}(t) = I_0\cos(\omega t - \phi)$$

where:

$$I_0 = \frac{E_0}{\sqrt{R^2 + \left(\omega L - \frac{1}{\omega C}\right)^2}}$$

$$\tan\phi = \frac{\omega L - 1/(\omega C)}{R}$$

### Impedance

The **impedance** $Z$ is:

$$Z = \sqrt{R^2 + (X_L - X_C)^2}$$

where:
- $X_L = \omega L$ (inductive reactance)
- $X_C = \frac{1}{\omega C}$ (capacitive reactance)

Then $I_0 = \frac{E_0}{Z}$.

### Resonance

**Resonance** occurs when $X_L = X_C$:

$$\omega L = \frac{1}{\omega C} \implies \omega = \omega_0 = \frac{1}{\sqrt{LC}}$$

At resonance:
- Impedance is minimized: $Z = R$
- Current is maximized: $I_0 = \frac{E_0}{R}$
- Circuit behaves purely resistively

### Quality Factor

The **quality factor** (Q-factor) measures sharpness of resonance:

$$Q = \frac{\omega_0 L}{R} = \frac{1}{R}\sqrt{\frac{L}{C}}$$

Higher $Q$ means sharper resonance peak and lower damping.

## Practical Applications

### Radio Tuning

RLC circuits in radios are tuned to resonate at specific frequencies to select desired stations.

### Filters

- **Low-pass filter**: Passes low frequencies (RC circuit)
- **High-pass filter**: Passes high frequencies (RC circuit)
- **Band-pass filter**: Passes frequencies near resonance (RLC circuit)

### Power Transmission

Understanding impedance and phase relationships is crucial for efficient AC power transmission.

## Summary

| Circuit | Equation | Time Constant | Behavior |
|---------|----------|---------------|----------|
| RC | $\frac{dQ}{dt} + \frac{Q}{RC} = \frac{E}{R}$ | $\tau = RC$ | Exponential charging/discharging |
| RL | $\frac{dI}{dt} + \frac{R}{L}I = \frac{E}{L}$ | $\tau = L/R$ | Exponential current buildup/decay |
| RLC | $L\frac{d^2I}{dt^2} + R\frac{dI}{dt} + \frac{I}{C} = 0$ | Depends on $R,L,C$ | Overdamped, critical, or underdamped |

Electrical circuits beautifully demonstrate how differential equations model real physical systems, with direct applications in electronics, communications, and power systems.
