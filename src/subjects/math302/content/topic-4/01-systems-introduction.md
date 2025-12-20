---
title: "Introduction to Systems of Differential Equations"
---

# Introduction to Systems of Differential Equations

## What is a System of Differential Equations?

A **system of differential equations** involves multiple dependent variables and their derivatives with respect to a common independent variable.

**General form** (first-order system):
$$\begin{cases}
\frac{dx_1}{dt} = f_1(t, x_1, x_2, \ldots, x_n) \\
\frac{dx_2}{dt} = f_2(t, x_1, x_2, \ldots, x_n) \\
\vdots \\
\frac{dx_n}{dt} = f_n(t, x_1, x_2, \ldots, x_n)
\end{cases}$$

**Linear system**:
$$\begin{cases}
x_1' = a_{11}(t)x_1 + a_{12}(t)x_2 + \cdots + a_{1n}(t)x_n + f_1(t) \\
x_2' = a_{21}(t)x_1 + a_{22}(t)x_2 + \cdots + a_{2n}(t)x_n + f_2(t) \\
\vdots \\
x_n' = a_{n1}(t)x_1 + a_{n2}(t)x_2 + \cdots + a_{nn}(t)x_n + f_n(t)
\end{cases}$$

## Matrix Form

A system can be written compactly using **matrix notation**:

$$\mathbf{x}' = A(t)\mathbf{x} + \mathbf{f}(t)$$

where:
$$\mathbf{x} = \begin{pmatrix} x_1 \\ x_2 \\ \vdots \\ x_n \end{pmatrix}, \quad A(t) = \begin{pmatrix}
a_{11}(t) & a_{12}(t) & \cdots & a_{1n}(t) \\
a_{21}(t) & a_{22}(t) & \cdots & a_{2n}(t) \\
\vdots & \vdots & \ddots & \vdots \\
a_{n1}(t) & a_{n2}(t) & \cdots & a_{nn}(t)
\end{pmatrix}, \quad \mathbf{f}(t) = \begin{pmatrix} f_1(t) \\ f_2(t) \\ \vdots \\ f_n(t) \end{pmatrix}$$

If $\mathbf{f}(t) = \mathbf{0}$, the system is **homogeneous**; otherwise, it's **nonhomogeneous**.

## Converting Higher-Order Equations to Systems

Any nth-order ODE can be converted to a first-order system.

### Single nth-Order Equation

For $y^{(n)} = f(t, y, y', \ldots, y^{(n-1)})$, define:
$$x_1 = y, \quad x_2 = y', \quad x_3 = y'', \quad \ldots, \quad x_n = y^{(n-1)}$$

Then:
$$\begin{cases}
x_1' = x_2 \\
x_2' = x_3 \\
\vdots \\
x_{n-1}' = x_n \\
x_n' = f(t, x_1, x_2, \ldots, x_n)
\end{cases}$$

**Example 1**: Convert $y'' + 3y' - 4y = \sin t$ to a system.

Let $x_1 = y$, $x_2 = y'$.

Then:
$$x_1' = x_2$$
$$x_2' = y'' = -3y' + 4y + \sin t = 4x_1 - 3x_2 + \sin t$$

System:
$$\begin{cases}
x_1' = x_2 \\
x_2' = 4x_1 - 3x_2 + \sin t
\end{cases}$$

Matrix form:
$$\begin{pmatrix} x_1' \\ x_2' \end{pmatrix} = \begin{pmatrix} 0 & 1 \\ 4 & -3 \end{pmatrix}\begin{pmatrix} x_1 \\ x_2 \end{pmatrix} + \begin{pmatrix} 0 \\ \sin t \end{pmatrix}$$

### Coupled Higher-Order Equations

Systems of higher-order equations can also be converted.

**Example 2**: Convert:
$$\begin{cases}
y_1'' = y_1 - y_2 \\
y_2'' = y_1 + y_2
\end{cases}$$

Let $x_1 = y_1$, $x_2 = y_1'$, $x_3 = y_2$, $x_4 = y_2'$.

$$\begin{cases}
x_1' = x_2 \\
x_2' = x_1 - x_3 \\
x_3' = x_4 \\
x_4' = x_1 + x_3
\end{cases}$$

Matrix form:
$$\mathbf{x}' = \begin{pmatrix}
0 & 1 & 0 & 0 \\
1 & 0 & -1 & 0 \\
0 & 0 & 0 & 1 \\
1 & 0 & 1 & 0
\end{pmatrix}\mathbf{x}$$

## Why Study Systems?

1. **Natural modeling**: Many phenomena involve multiple interacting quantities
   - Predator-prey populations
   - Coupled oscillators
   - Chemical reactions
   - Multi-compartment models

2. **Unified theory**: Systems provide a framework for all linear ODEs

3. **Computational advantages**: Numerical methods for systems are well-developed

4. **Phase space analysis**: Systems allow geometric/qualitative analysis

## Initial Value Problems for Systems

An IVP for a first-order system specifies initial values for all variables:

$$\mathbf{x}' = \mathbf{f}(t, \mathbf{x}), \quad \mathbf{x}(t_0) = \mathbf{x}_0$$

**Theorem (Existence and Uniqueness)**: If $\mathbf{f}$ is continuous and satisfies a Lipschitz condition in $\mathbf{x}$, then the IVP has a unique solution in some interval around $t_0$.

## Examples of Physical Systems

### Spring-Mass System with Two Masses

Two masses $m_1$ and $m_2$ connected by springs:
$$\begin{cases}
m_1x_1'' = -k_1x_1 + k_2(x_2 - x_1) \\
m_2x_2'' = -k_2(x_2 - x_1) - k_3x_2
\end{cases}$$

### Coupled Tanks

Two tanks with liquid flowing between them:
$$\begin{cases}
V_1\frac{dc_1}{dt} = r_{12}c_2 - r_{21}c_1 \\
V_2\frac{dc_2}{dt} = r_{21}c_1 - r_{12}c_2
\end{cases}$$

where $c_i$ is concentration in tank $i$, $V_i$ is volume, $r_{ij}$ is flow rate.

### Predator-Prey (Lotka-Volterra)

$$\begin{cases}
\frac{dx}{dt} = ax - bxy \\
\frac{dy}{dt} = -cy + dxy
\end{cases}$$

where $x$ is prey population, $y$ is predator population.

### RLC Circuit

$$\begin{cases}
L\frac{dI}{dt} = -RI - \frac{Q}{C} + E(t) \\
\frac{dQ}{dt} = I
\end{cases}$$

## Autonomous vs Non-Autonomous Systems

**Autonomous**: $\mathbf{x}' = \mathbf{f}(\mathbf{x})$ (no explicit time dependence)

**Non-autonomous**: $\mathbf{x}' = \mathbf{f}(t, \mathbf{x})$ (explicit time dependence)

Autonomous systems have special properties:
- Time-translation invariance
- Equilibrium points and stability analysis
- Phase portrait analysis

## Linear vs Nonlinear Systems

**Linear**: $\mathbf{x}' = A(t)\mathbf{x} + \mathbf{f}(t)$
- Superposition principle holds
- Explicit solution methods available
- Always solvable (at least numerically)

**Nonlinear**: Contains nonlinear terms ($xy$, $x^2$, $\sin x$, etc.)
- Generally cannot be solved explicitly
- Qualitative and numerical methods essential
- Rich behavior (chaos, bifurcations, limit cycles)

## Solution Concepts

A **solution** to $\mathbf{x}' = \mathbf{f}(t, \mathbf{x})$ is a vector function $\mathbf{x}(t)$ that satisfies the equation for all $t$ in some interval.

**Geometrically**: A solution is a **curve in phase space** (the space of all possible states).

**Trajectory**: The path traced by a solution in phase space

**Orbit**: A trajectory without time parametrization

## Equilibrium Points

An **equilibrium point** (or **fixed point**, **critical point**) $\mathbf{x}^*$ satisfies:
$$\mathbf{f}(t, \mathbf{x}^*) = \mathbf{0}$$

For autonomous systems, equilibria are constant solutions.

**Example 3**: Find equilibria of:
$$\begin{cases}
x' = x - xy \\
y' = -y + xy
\end{cases}$$

Set $x - xy = 0$ and $-y + xy = 0$:
$$x(1 - y) = 0, \quad y(x - 1) = 0$$

Solutions: $(0, 0)$ and $(1, 1)$

Both are equilibrium points.

## Stability Concepts

An equilibrium $\mathbf{x}^*$ is:
- **Stable**: Solutions starting nearby stay nearby
- **Asymptotically stable**: Solutions starting nearby approach $\mathbf{x}^*$
- **Unstable**: Solutions starting nearby move away

Stability analysis is crucial for understanding long-term behavior.

## Conclusion

Systems of differential equations provide a powerful framework for modeling multi-variable phenomena. Converting higher-order equations to first-order systems unifies the theory and enables systematic solution methods. Matrix notation compactly represents linear systems and connects differential equations to linear algebra. Understanding equilibria, stability, and the geometric phase space perspective sets the stage for detailed analysis of system behavior. In subsequent sections, we'll develop explicit solution methods for linear systems and explore qualitative techniques for nonlinear systems.
