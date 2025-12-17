---
title: "Introduction to Second-Order Linear Differential Equations"
---

# Introduction to Second-Order Linear Differential Equations

## General Form

A **second-order linear differential equation** has the general form:

$$a_2(x)\frac{d^2y}{dx^2} + a_1(x)\frac{dy}{dx} + a_0(x)y = f(x)$$

where $a_2(x) \neq 0$. Dividing by $a_2(x)$ gives the **standard form**:

$$\frac{d^2y}{dx^2} + P(x)\frac{dy}{dx} + Q(x)y = F(x)$$

where $P(x) = \frac{a_1(x)}{a_2(x)}$, $Q(x) = \frac{a_0(x)}{a_2(x)}$, and $F(x) = \frac{f(x)}{a_2(x)}$.

The equation is **linear** because:
1. The dependent variable $y$ and its derivatives appear to the first power
2. There are no products of $y$, $y'$, or $y''$
3. No transcendental functions of $y$ or its derivatives appear

## Homogeneous vs Nonhomogeneous

If $F(x) = 0$, the equation is **homogeneous**:
$$y'' + P(x)y' + Q(x)y = 0$$

If $F(x) \neq 0$, the equation is **nonhomogeneous** (or **inhomogeneous**):
$$y'' + P(x)y' + Q(x)y = F(x)$$

**Examples**:

**Homogeneous**: $y'' + 4y' + 3y = 0$

**Nonhomogeneous**: $y'' + 4y' + 3y = e^x$

## Initial and Boundary Value Problems

### Initial Value Problem (IVP)

A **second-order IVP** specifies the value of the solution and its first derivative at a single point:

$$y'' + P(x)y' + Q(x)y = F(x)$$
$$y(x_0) = y_0, \quad y'(x_0) = y_1$$

**Example**:
$$y'' + 4y = 0, \quad y(0) = 1, \quad y'(0) = 2$$

### Boundary Value Problem (BVP)

A **boundary value problem** specifies values of the solution (or its derivatives) at two different points:

$$y'' + P(x)y' + Q(x)y = F(x)$$
$$y(a) = \alpha, \quad y(b) = \beta$$

**Example**:
$$y'' + 4y = 0, \quad y(0) = 1, \quad y(\pi) = -1$$

BVPs arise in steady-state problems and spatial boundary conditions. Unlike IVPs, BVPs may have no solution, exactly one solution, or infinitely many solutions.

## Existence and Uniqueness for IVPs

**Theorem**: Consider the IVP
$$y'' + P(x)y' + Q(x)y = F(x)$$
$$y(x_0) = y_0, \quad y'(x_0) = y_1$$

If $P(x)$, $Q(x)$, and $F(x)$ are continuous on an interval $I$ containing $x_0$, then there exists a **unique** solution $y(x)$ on the entire interval $I$.

This theorem guarantees that second-order linear IVPs are **well-posed**: a solution exists, is unique, and depends continuously on the initial data.

**Example**: For $y'' + xy' + y = \sin x$ with $y(0) = 1$, $y'(0) = 0$, since $P(x) = x$, $Q(x) = 1$, and $F(x) = \sin x$ are continuous everywhere, a unique solution exists on $\mathbb{R}$.

## Superposition Principle

The **superposition principle** is fundamental to linear equations.

**Theorem (Superposition for Homogeneous Equations)**: If $y_1$ and $y_2$ are solutions to the homogeneous equation
$$y'' + P(x)y' + Q(x)y = 0$$

then any linear combination
$$y = c_1y_1 + c_2y_2$$

is also a solution for any constants $c_1$ and $c_2$.

**Proof**: Substitute $y = c_1y_1 + c_2y_2$ into the equation:
$$y'' + Py' + Qy = (c_1y_1 + c_2y_2)'' + P(c_1y_1 + c_2y_2)' + Q(c_1y_1 + c_2y_2)$$
$$= c_1(y_1'' + Py_1' + Qy_1) + c_2(y_2'' + Py_2' + Qy_2)$$
$$= c_1 \cdot 0 + c_2 \cdot 0 = 0$$

This principle does **not** hold for nonlinear equations!

**Example**: For $y'' + y = 0$, we know $y_1 = \cos x$ and $y_2 = \sin x$ are solutions. Therefore:
$$y = c_1\cos x + c_2\sin x$$

is also a solution for any constants $c_1$ and $c_2$.

## Linear Independence and the Wronskian

### Linear Independence

Two functions $y_1$ and $y_2$ are **linearly independent** on an interval $I$ if neither is a constant multiple of the other. Equivalently, the only constants satisfying
$$c_1y_1(x) + c_2y_2(x) = 0$$

for all $x \in I$ are $c_1 = c_2 = 0$.

**Linearly independent**: $y_1 = \cos x$ and $y_2 = \sin x$

**Linearly dependent**: $y_1 = e^x$ and $y_2 = 3e^x$ (since $y_2 = 3y_1$)

### The Wronskian

The **Wronskian** of two functions $y_1$ and $y_2$ is:

$$W(y_1, y_2)(x) = \begin{vmatrix} y_1 & y_2 \\ y_1' & y_2' \end{vmatrix} = y_1y_2' - y_1'y_2$$

**Theorem**: If $y_1$ and $y_2$ are solutions to $y'' + P(x)y' + Q(x)y = 0$ on an interval $I$, then:
1. Either $W(y_1, y_2)(x) = 0$ for all $x \in I$, or
2. $W(y_1, y_2)(x) \neq 0$ for all $x \in I$

**Corollary**: If $y_1$ and $y_2$ are solutions to a homogeneous linear equation, then:
- $W(y_1, y_2) \neq 0$ if and only if $y_1$ and $y_2$ are linearly independent
- $W(y_1, y_2) = 0$ if and only if $y_1$ and $y_2$ are linearly dependent

### Computing the Wronskian

**Example 1**: Check if $y_1 = e^{2x}$ and $y_2 = e^{-x}$ are linearly independent.

Compute derivatives:
$$y_1' = 2e^{2x}, \quad y_2' = -e^{-x}$$

Wronskian:
$$W = y_1y_2' - y_1'y_2 = e^{2x}(-e^{-x}) - 2e^{2x}(e^{-x})$$
$$= -e^x - 2e^x = -3e^x \neq 0$$

Since $W \neq 0$, the functions are linearly independent.

**Example 2**: Check if $y_1 = x^2$ and $y_2 = 2x^2$ are linearly independent.

$$W = x^2(4x) - 2x(2x^2) = 4x^3 - 4x^3 = 0$$

Since $W = 0$, the functions are linearly dependent (indeed, $y_2 = 2y_1$).

## Abel's Theorem

**Abel's Theorem**: If $y_1$ and $y_2$ are solutions to $y'' + P(x)y' + Q(x)y = 0$, then the Wronskian satisfies:

$$W(x) = Ce^{-\int P(x)dx}$$

where $C$ is a constant.

This theorem is useful because:
1. It allows computation of $W$ without knowing $y_1$ and $y_2$ explicitly
2. It shows that $W$ is either always zero or never zero
3. It provides a differential equation for $W$: $W' + P(x)W = 0$

**Example 3**: For $y'' - 2y' + y = 0$, if $W(0) = 3$, find $W(x)$.

Here $P(x) = -2$. By Abel's theorem:
$$W(x) = Ce^{-\int (-2)dx} = Ce^{2x}$$

With $W(0) = 3$: $3 = Ce^0 = C$, so:
$$W(x) = 3e^{2x}$$

## General Solution Structure

### Homogeneous Equations

**Theorem**: If $y_1$ and $y_2$ are linearly independent solutions to the homogeneous equation
$$y'' + P(x)y' + Q(x)y = 0$$

then the **general solution** is:
$$y_h = c_1y_1 + c_2y_2$$

where $c_1$ and $c_2$ are arbitrary constants.

The pair $\{y_1, y_2\}$ is called a **fundamental set of solutions** or a **basis** for the solution space.

**Example**: For $y'' + 4y = 0$, a fundamental set is $\{y_1, y_2\} = \{\cos 2x, \sin 2x\}$, giving:
$$y_h = c_1\cos 2x + c_2\sin 2x$$

### Nonhomogeneous Equations

**Theorem**: The general solution to the nonhomogeneous equation
$$y'' + P(x)y' + Q(x)y = F(x)$$

has the form:
$$y = y_h + y_p$$

where:
- $y_h = c_1y_1 + c_2y_2$ is the general solution to the associated homogeneous equation (complementary solution)
- $y_p$ is any particular solution to the nonhomogeneous equation

**Proof sketch**: If $y$ is any solution to the nonhomogeneous equation and $y_p$ is a particular solution, then:
$$(y - y_p)'' + P(y - y_p)' + Q(y - y_p) = [y'' + Py' + Qy] - [y_p'' + Py_p' + Qy_p]$$
$$= F(x) - F(x) = 0$$

Therefore $y - y_p$ is a solution to the homogeneous equation, so $y - y_p = y_h$, giving $y = y_h + y_p$.

**Example**: For $y'' + 4y = 8$, we know $y_h = c_1\cos 2x + c_2\sin 2x$. By inspection, $y_p = 2$ is a particular solution (since $2'' + 4(2) = 8$). Therefore:
$$y = c_1\cos 2x + c_2\sin 2x + 2$$

## Reduction of Order

If one solution $y_1$ to the homogeneous equation is known, a second linearly independent solution can be found.

**Theorem (Reduction of Order)**: If $y_1$ is a known solution to
$$y'' + P(x)y' + Q(x)y = 0$$

then a second linearly independent solution is:
$$y_2 = y_1\int \frac{e^{-\int P(x)dx}}{y_1^2}dx$$

This method will be explored in detail in a subsequent section.

## Applications

Second-order linear differential equations model numerous physical phenomena:

### Simple Harmonic Motion
$$m\frac{d^2x}{dt^2} + kx = 0$$

Mass-spring system with mass $m$ and spring constant $k$.

### Damped Oscillations
$$m\frac{d^2x}{dt^2} + c\frac{dx}{dt} + kx = 0$$

Mass-spring-damper system with damping coefficient $c$.

### Forced Vibrations
$$m\frac{d^2x}{dt^2} + c\frac{dx}{dt} + kx = F(t)$$

Oscillator subjected to external force $F(t)$.

### RLC Circuits
$$L\frac{d^2Q}{dt^2} + R\frac{dQ}{dt} + \frac{1}{C}Q = E(t)$$

Electrical circuit with inductance $L$, resistance $R$, capacitance $C$, and voltage source $E(t)$.

### Beam Deflection
$$EI\frac{d^4y}{dx^4} = w(x)$$

This fourth-order equation for beam deflection reduces to second-order equations under certain boundary conditions.

## Conclusion

Second-order linear differential equations form a rich and well-understood class of equations with powerful theoretical results. The superposition principle, Wronskian, and solution structure theorems provide a complete framework for both analyzing and solving these equations. The distinction between homogeneous and nonhomogeneous equations, along with the fundamental role of linear independence, guides our solution strategies. Understanding these foundational concepts is essential for the specific solution techniques that follow.
