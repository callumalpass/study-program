---
title: "Mixing Problems"
---

# Mixing Problems

## Introduction

Mixing problems involve tracking the concentration of substances in containers (tanks, pools, biological systems) as fluids flow in and out. These problems are common in chemical engineering, environmental science, pharmacokinetics, and process control. The governing differential equations arise from conservation of mass principles.

## Basic Principle

The fundamental equation for mixing problems is:

$$\frac{dA}{dt} = \text{rate in} - \text{rate out}$$

where $A(t)$ is the amount of substance in the container at time $t$.

## Single Tank Problems

### Setup

A tank contains $V(t)$ volume of liquid with concentration $c(t)$ of some substance. Liquid flows in at rate $r_{in}$ with concentration $c_{in}$, and flows out at rate $r_{out}$.

### Governing Equations

**Amount of substance**:

$$\frac{dA}{dt} = r_{in} \cdot c_{in} - r_{out} \cdot c_{out}$$

**Volume** (if inflow $\neq$ outflow):

$$\frac{dV}{dt} = r_{in} - r_{out}$$

**Concentration**:

$$c(t) = \frac{A(t)}{V(t)}$$

If $r_{in} = r_{out} = r$ (constant volume $V_0$):

$$\frac{dA}{dt} = r \cdot c_{in} - r \cdot \frac{A}{V_0}$$

$$\frac{dA}{dt} + \frac{r}{V_0}A = r \cdot c_{in}$$

This is a first-order linear differential equation.

### Example 1: Constant Inflow Concentration

A $100L$ tank initially contains pure water. Salt water with concentration $0.5 kg/L$ flows in at $5 L/min$. The well-mixed solution flows out at the same rate. Find $A(t)$.

$$\frac{dA}{dt} + \frac{5}{100}A = 5(0.5) = 2.5$$

$$\frac{dA}{dt} + 0.05A = 2.5$$

This is linear with integrating factor $\mu = e^{0.05t}$:

$$\frac{d}{dt}[Ae^{0.05t}] = 2.5e^{0.05t}$$

$$Ae^{0.05t} = \frac{2.5}{0.05}e^{0.05t} + C = 50e^{0.05t} + C$$

$$A(t) = 50 + Ce^{-0.05t}$$

Initial condition $A(0) = 0$:

$$0 = 50 + C \implies C = -50$$

$$A(t) = 50(1 - e^{-0.05t}) \text{ kg}$$

As $t \to \infty$: $A \to 50 kg$ (equilibrium: tank holds $100L \times 0.5 kg/L = 50 kg$)

Concentration: $c(t) = \frac{A(t)}{100} = 0.5(1 - e^{-0.05t}) kg/L$

### Example 2: Variable Volume

A $200L$ tank initially contains $10kg$ of salt. Fresh water flows in at $8 L/min$ and the mixture flows out at $6 L/min$.

Volume: $\frac{dV}{dt} = 8 - 6 = 2$ with $V(0) = 200$

$$V(t) = 200 + 2t$$

Amount: $\frac{dA}{dt} = 8(0) - 6 \cdot \frac{A}{200+2t} = -\frac{6A}{200+2t}$$

$$\frac{dA}{dt} + \frac{3A}{100+t} = 0$$

This is separable:

$$\frac{dA}{A} = -\frac{3dt}{100+t}$$

$$\ln|A| = -3\ln|100+t| + C$$

$$A = \frac{K}{(100+t)^3}$$

From $A(0) = 10$:

$$10 = \frac{K}{100^3} \implies K = 10^7$$

$$A(t) = \frac{10^7}{(100+t)^3} \text{ kg}$$

Concentration: $c(t) = \frac{A(t)}{V(t)} = \frac{10^7}{(100+t)^3(200+2t)}$

As $t \to \infty$: Both $A(t) \to 0$ and $c(t) \to 0$ (dilution by fresh water).

### Example 3: Time-Varying Input

A $500L$ tank initially contains pure water. For $0 \leq t \leq 10$ minutes, salt water (concentration $0.2 kg/L$) flows in at $10 L/min$. After $t = 10$, fresh water flows in. Solution flows out at $10 L/min$ throughout.

For $0 \leq t \leq 10$:

$$\frac{dA}{dt} + \frac{10}{500}A = 10(0.2) = 2$$

$$\frac{dA}{dt} + 0.02A = 2$$

Solution: $A(t) = 100(1 - e^{-0.02t})$ with $A(0) = 0$

At $t = 10$: $A(10) = 100(1 - e^{-0.2}) \approx 18.13 kg$

For $t > 10$:

$$\frac{dA}{dt} + 0.02A = 0$$

$$A(t) = Ce^{-0.02t}$$

With $A(10) = 18.13$:

$$18.13 = Ce^{-0.2} \implies C = 18.13e^{0.2} \approx 22.14$$

$$A(t) = 22.14e^{-0.02t} \text{ for } t > 10$$

## Cascaded Tanks (Compartmental Models)

### Two-Tank System

Tank 1 (volume $V_1$) drains into Tank 2 (volume $V_2$).

**Tank 1**:

$$\frac{dA_1}{dt} = r_{in}c_{in} - \frac{r}{V_1}A_1$$

**Tank 2**:

$$\frac{dA_2}{dt} = \frac{r}{V_1}A_1 - \frac{r}{V_2}A_2$$

This is a system of coupled first-order ODEs.

### Example: Two Tanks in Series

Tank 1 ($100L$) initially has $20kg$ salt. Tank 2 ($100L$) initially has $0kg$ salt. Fresh water enters Tank 1 at $5 L/min$. Mixture flows from Tank 1 to Tank 2 at $5 L/min$, and out of Tank 2 at $5 L/min$.

$$\frac{dA_1}{dt} = -0.05A_1, \quad A_1(0) = 20$$

$$\frac{dA_2}{dt} = 0.05A_1 - 0.05A_2, \quad A_2(0) = 0$$

First equation: $A_1(t) = 20e^{-0.05t}$

Substitute into second:

$$\frac{dA_2}{dt} + 0.05A_2 = 0.05(20e^{-0.05t}) = e^{-0.05t}$$

Integrating factor: $\mu = e^{0.05t}$

$$\frac{d}{dt}[A_2 e^{0.05t}] = e^{-0.05t} \cdot e^{0.05t} = 1$$

$$A_2 e^{0.05t} = t + C$$

From $A_2(0) = 0$: $C = 0$

$$A_2(t) = te^{-0.05t} \text{ kg}$$

Maximum in Tank 2 occurs when $\frac{dA_2}{dt} = 0$:

$$e^{-0.05t} - 0.05te^{-0.05t} = 0$$

$$1 - 0.05t = 0 \implies t = 20 \text{ min}$$

$$A_2(20) = 20e^{-1} \approx 7.36 \text{ kg}$$

## Applications Beyond Tanks

### Pharmacokinetics

Drug concentration in blood follows similar equations:

$$\frac{dC}{dt} = \text{absorption rate} - \text{elimination rate}$$

For IV infusion at rate $I$ and first-order elimination:

$$\frac{dC}{dt} = \frac{I}{V} - kC$$

where $V$ is volume of distribution and $k$ is elimination rate constant.

### Environmental Pollution

Pollutant concentration in lakes, rivers, or atmosphere:

$$\frac{dP}{dt} = \text{pollution input} - \text{natural degradation} - \text{outflow}$$

### Dialysis

Blood purification through dialysis follows mixing principles with membranes separating compartments.

### Chemical Reactors

Continuous stirred-tank reactors (CSTR) in chemical engineering follow mixing equations with additional reaction terms.

## Multi-Compartment Models

### Three-Compartment Model

For interconnected compartments (e.g., drug distribution in body):

$$\frac{dA_1}{dt} = -k_{12}A_1 - k_{13}A_1 + k_{21}A_2 + k_{31}A_3$$

$$\frac{dA_2}{dt} = k_{12}A_1 - k_{21}A_2 - k_{23}A_2 + k_{32}A_3$$

$$\frac{dA_3}{dt} = k_{13}A_1 + k_{23}A_2 - k_{31}A_3 - k_{32}A_3$$

where $k_{ij}$ is the transfer rate constant from compartment $i$ to $j$.

These systems require matrix methods or numerical solutions.

## Conservation Laws

Total amount in closed system (no external input/output) is conserved:

$$\frac{d}{dt}(A_1 + A_2 + \cdots + A_n) = 0$$

This provides a check on solutions.

## Steady-State Solutions

At equilibrium, $\frac{dA}{dt} = 0$:

$$\text{rate in} = \text{rate out}$$

For single tank with constant inflow:

$$A_{eq} = \frac{V \cdot r_{in} \cdot c_{in}}{r_{out}}$$

## Summary

Mixing problems demonstrate:

1. **Conservation of mass** leads to differential equations
2. **First-order linear ODEs** for single tanks
3. **Systems of ODEs** for multiple compartments
4. **Exponential approach to equilibrium** is typical
5. **Wide applicability**: chemistry, biology, medicine, environment

| Scenario | Equation Form | Key Feature |
|----------|---------------|-------------|
| Constant volume | $\frac{dA}{dt} + \frac{r}{V}A = r \cdot c_{in}$ | Linear first-order |
| Variable volume | $\frac{dA}{dt} = r_{in}c_{in} - r_{out}\frac{A}{V(t)}$ | Non-constant coefficient |
| Cascaded tanks | System of coupled ODEs | Sequential transfer |
| Closed system | $\sum \frac{dA_i}{dt} = 0$ | Conservation |

Mixing problems provide intuitive examples of how differential equations model real-world processes involving flow and concentration dynamics.
