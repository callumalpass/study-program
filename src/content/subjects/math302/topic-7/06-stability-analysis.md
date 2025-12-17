---
title: "Stability Analysis"
---

# Stability Analysis

## Introduction

Stability analysis determines whether solutions to differential equations converge to equilibrium points or diverge from them. This is crucial in engineering (control systems), biology (population dynamics), economics (market models), and physics (mechanical systems). Understanding stability allows us to predict long-term behavior without solving equations explicitly.

## Equilibrium Points

### Definition

For an autonomous system $\frac{dx}{dt} = f(x)$, an **equilibrium point** (or **critical point**, **fixed point**) $x^*$ satisfies:

$$f(x^*) = 0$$

At equilibrium, $\frac{dx}{dt} = 0$, so the state does not change.

### Example: Logistic Equation

$$\frac{dP}{dt} = kP\left(1 - \frac{P}{K}\right)$$

Equilibria: $kP(1 - P/K) = 0$

$$P^* = 0 \quad \text{or} \quad P^* = K$$

## Stability Definitions

### Stable Equilibrium

An equilibrium $x^*$ is **stable** if solutions starting near $x^*$ remain close to $x^*$ for all future time.

Formally: For any $\epsilon > 0$, there exists $\delta > 0$ such that if $|x(0) - x^*| < \delta$, then $|x(t) - x^*| < \epsilon$ for all $t > 0$.

### Asymptotically Stable

An equilibrium is **asymptotically stable** if it is stable and solutions starting near $x^*$ converge to $x^*$ as $t \to \infty$.

$$\lim_{t \to \infty} x(t) = x^*$$

### Unstable Equilibrium

An equilibrium is **unstable** if it is not stable (small perturbations lead to trajectories moving away).

## One-Dimensional Systems

### Phase Line Analysis

For $\frac{dx}{dt} = f(x)$:

1. Find equilibria: solve $f(x) = 0$
2. Determine sign of $f(x)$ between equilibria
3. Draw arrows: $\to$ if $f(x) > 0$ (increasing), $\leftarrow$ if $f(x) < 0$ (decreasing)

**Stability**:
- Arrows point toward equilibrium: **asymptotically stable** (sink)
- Arrows point away: **unstable** (source)
- Mixed: **semi-stable** (one side stable, one unstable)

### Example: Logistic Equation

$$\frac{dP}{dt} = P(1 - P)$$

Equilibria: $P = 0, 1$

Phase line:

```
     ←      →
-----●------●-----
     0      1
```

- At $P = 0.5$: $\frac{dP}{dt} = 0.5(0.5) = 0.25 > 0$ (moving right)
- At $P = 1.5$: $\frac{dP}{dt} = 1.5(-0.5) = -0.75 < 0$ (moving left)

**Conclusion**:
- $P = 0$: unstable (arrows away)
- $P = 1$: asymptotically stable (arrows toward)

### Derivative Test

At equilibrium $x^*$:

$$f'(x^*) < 0 \implies \text{asymptotically stable}$$

$$f'(x^*) > 0 \implies \text{unstable}$$

$$f'(x^*) = 0 \implies \text{inconclusive (need higher-order analysis)}$$

**Reason**: $f'(x^*)$ is the "slope" of $f$ at $x^*$. Negative slope means $f$ decreases through zero, creating opposing flows.

### Example: Logistic Again

$$f(P) = P(1-P), \quad f'(P) = 1 - 2P$$

At $P = 0$: $f'(0) = 1 > 0$ → unstable ✓

At $P = 1$: $f'(1) = -1 < 0$ → asymptotically stable ✓

## Linearization

For systems, linearize near equilibrium to determine local stability.

### Single Variable

Near equilibrium $x^*$, Taylor expand:

$$f(x) = f(x^*) + f'(x^*)(x-x^*) + O((x-x^*)^2)$$

Since $f(x^*) = 0$:

$$\frac{dx}{dt} \approx f'(x^*)(x - x^*)$$

Let $\xi = x - x^*$ (deviation from equilibrium):

$$\frac{d\xi}{dt} = f'(x^*)\xi$$

Solution: $\xi(t) = \xi_0 e^{f'(x^*)t}$

- If $f'(x^*) < 0$: $\xi \to 0$ (stable)
- If $f'(x^*) > 0$: $\xi$ grows (unstable)

## Two-Dimensional Systems

### System Form

$$\frac{dx}{dt} = f(x, y)$$

$$\frac{dy}{dt} = g(x, y)$$

Equilibrium $(x^*, y^*)$: $f(x^*, y^*) = 0$ and $g(x^*, y^*) = 0$

### Jacobian Matrix

Linearize using the **Jacobian matrix**:

$$J = \begin{pmatrix} \frac{\partial f}{\partial x} & \frac{\partial f}{\partial y} \\ \frac{\partial g}{\partial x} & \frac{\partial g}{\partial y} \end{pmatrix}$$

evaluated at $(x^*, y^*)$.

### Linearized System

$$\frac{d}{dt}\begin{pmatrix} \xi \\ \eta \end{pmatrix} = J \begin{pmatrix} \xi \\ \eta \end{pmatrix}$$

where $\xi = x - x^*$, $\eta = y - y^*$.

### Eigenvalues and Stability

Find eigenvalues $\lambda$ of $J$ by solving:

$$\det(J - \lambda I) = 0$$

**Stability criteria**:

| Eigenvalues | Stability | Type |
|-------------|-----------|------|
| Both $\text{Re}(\lambda) < 0$ | Asymptotically stable | Sink/Stable node/Stable spiral |
| Both $\text{Re}(\lambda) > 0$ | Unstable | Source/Unstable node/Unstable spiral |
| Mixed signs | Unstable | Saddle point |
| Pure imaginary | Marginally stable | Center |

### Classification

**Real eigenvalues** $\lambda_1, \lambda_2$:
- Both negative: **Stable node**
- Both positive: **Unstable node**
- Opposite signs: **Saddle point** (unstable)

**Complex eigenvalues** $\lambda = \alpha \pm i\beta$:
- $\alpha < 0$: **Stable spiral** (asymptotically stable)
- $\alpha > 0$: **Unstable spiral**
- $\alpha = 0$: **Center** (neutral stability)

### Example: Predator-Prey System

$$\frac{dx}{dt} = x(2 - y)$$

$$\frac{dy}{dt} = y(x - 1)$$

**Equilibria**:
1. $(0, 0)$
2. $(1, 2)$

**Jacobian**:

$$J = \begin{pmatrix} 2-y & -x \\ y & x-1 \end{pmatrix}$$

**At $(0, 0)$**:

$$J = \begin{pmatrix} 2 & 0 \\ 0 & -1 \end{pmatrix}$$

Eigenvalues: $\lambda_1 = 2, \lambda_2 = -1$

**Saddle point** (unstable) - trajectories move away.

**At $(1, 2)$**:

$$J = \begin{pmatrix} 0 & -1 \\ 2 & 0 \end{pmatrix}$$

Characteristic equation: $\lambda^2 + 2 = 0 \implies \lambda = \pm i\sqrt{2}$

**Center** (marginally stable) - closed orbits, periodic solutions.

### Example: Competing Species

$$\frac{dx}{dt} = x(1 - x - y)$$

$$\frac{dy}{dt} = y(1 - x - 2y)$$

Equilibria: $(0,0), (1,0), (0, 0.5), (0.5, 0.5)$

At $(0.5, 0.5)$:

$$J = \begin{pmatrix} -0.5 & -0.5 \\ -0.5 & -1 \end{pmatrix}$$

Trace: $\text{tr}(J) = -1.5$

Determinant: $\det(J) = 0.5 - 0.25 = 0.25$

Eigenvalues from $\lambda^2 - \text{tr}(J)\lambda + \det(J) = 0$:

$$\lambda^2 + 1.5\lambda + 0.25 = 0$$

$$\lambda = \frac{-1.5 \pm \sqrt{2.25 - 1}}{2} = \frac{-1.5 \pm 1.12}{2}$$

Both negative: **stable node** (coexistence equilibrium).

## Lyapunov Functions

### Concept

A **Lyapunov function** $V(x)$ is a generalized "energy" function used to prove stability without solving the equation.

### Lyapunov's Direct Method

If there exists $V(x)$ such that:

1. $V(x^*) = 0$ and $V(x) > 0$ for $x \neq x^*$ (positive definite)
2. $\frac{dV}{dt} \leq 0$ along solutions (non-increasing)

Then $x^*$ is **stable**.

If additionally $\frac{dV}{dt} < 0$ for $x \neq x^*$, then $x^*$ is **asymptotically stable**.

### Time Derivative Along Solutions

$$\frac{dV}{dt} = \nabla V \cdot \frac{d\mathbf{x}}{dt} = \frac{\partial V}{\partial x}f(x,y) + \frac{\partial V}{\partial y}g(x,y)$$

### Example: Simple Harmonic Oscillator

$$\frac{dx}{dt} = y, \quad \frac{dy}{dt} = -x$$

Equilibrium: $(0, 0)$

Try $V(x, y) = \frac{1}{2}(x^2 + y^2)$ (total energy):

$$\frac{dV}{dt} = x\frac{dx}{dt} + y\frac{dy}{dt} = xy + y(-x) = 0$$

Since $\frac{dV}{dt} = 0$, the equilibrium is **stable** (but not asymptotically stable - consistent with center).

### Example: Damped Oscillator

$$\frac{dx}{dt} = y, \quad \frac{dy}{dt} = -x - \alpha y, \quad \alpha > 0$$

Same $V(x,y) = \frac{1}{2}(x^2 + y^2)$:

$$\frac{dV}{dt} = xy + y(-x - \alpha y) = -\alpha y^2 \leq 0$$

Since $\frac{dV}{dt} < 0$ for $y \neq 0$, the equilibrium is **asymptotically stable**.

## Basin of Attraction

The **basin of attraction** of a stable equilibrium is the set of all initial conditions that converge to it.

For linear systems, eigenvalue analysis determines global stability. For nonlinear systems, linearization only guarantees local stability near the equilibrium.

## Limit Cycles

A **limit cycle** is an isolated closed orbit (periodic solution).

- **Stable limit cycle**: Nearby trajectories spiral toward it
- **Unstable limit cycle**: Nearby trajectories spiral away
- **Semi-stable**: Stable on one side, unstable on the other

Example: Van der Pol oscillator has a stable limit cycle.

## Summary Table

| Condition | 1D Stability | 2D (Eigenvalues) | Type |
|-----------|--------------|------------------|------|
| $f'(x^*) < 0$ | Stable | Both $\text{Re}(\lambda) < 0$ | Sink/Stable |
| $f'(x^*) > 0$ | Unstable | Both $\text{Re}(\lambda) > 0$ | Source/Unstable |
| - | - | Opposite signs | Saddle |
| - | - | $\text{Re}(\lambda) = 0$ | Center/Marginal |

## Practical Applications

1. **Control systems**: Design controllers to make desired states asymptotically stable
2. **Ecology**: Determine if species can coexist (stability of coexistence equilibrium)
3. **Economics**: Analyze market equilibria
4. **Chemistry**: Reaction stability and oscillations
5. **Climate models**: Stability of climate states

## Summary

Stability analysis provides:
- **Qualitative understanding** without explicit solutions
- **Prediction of long-term behavior**
- **Design criteria** for engineering systems
- **Bifurcation analysis** foundation

Key techniques:
1. **Phase line** (1D)
2. **Linearization** and **eigenvalues** (2D and higher)
3. **Lyapunov functions** (general method)

Stability theory is fundamental to understanding dynamical systems and is essential in applications across science and engineering.
