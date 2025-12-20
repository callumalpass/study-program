---
id: math301-topic-2-6
title: "Implicit Differentiation"
order: 6
---

# Implicit Differentiation for Multivariable Functions

## Introduction

Implicit differentiation extends the technique from single-variable calculus to functions of several variables. Many important relationships in mathematics, physics, and engineering are expressed through implicit equations rather than explicit functions. For instance, the equation of a sphere $x^2 + y^2 + z^2 = r^2$ defines $z$ implicitly as a function of $x$ and $y$, but solving explicitly for $z$ yields two branches (upper and lower hemispheres). Implicit differentiation allows us to find partial derivatives without explicitly solving for the dependent variable, which is often difficult or impossible.

## Implicit Functions of Two Variables

### Definition

An equation $F(x, y) = 0$ **implicitly defines** $y$ as a function of $x$ near a point $(x_0, y_0)$ satisfying $F(x_0, y_0) = 0$, provided certain conditions hold (Implicit Function Theorem).

### Implicit Differentiation Formula

If $F(x, y) = 0$ and $y$ is implicitly a function of $x$, then:

$$\frac{dy}{dx} = -\frac{\partial F/\partial x}{\partial F/\partial y} = -\frac{F_x}{F_y}$$

provided $F_y \neq 0$.

### Derivation

Treat $y$ as a function of $x$, so $F(x, y(x)) = 0$ for all $x$ in some interval. Differentiate both sides with respect to $x$ using the chain rule:

$$\frac{d}{dx}[F(x, y(x))] = 0$$

$$\frac{\partial F}{\partial x}\frac{dx}{dx} + \frac{\partial F}{\partial y}\frac{dy}{dx} = 0$$

$$F_x + F_y\frac{dy}{dx} = 0$$

Solving for $\frac{dy}{dx}$:

$$\frac{dy}{dx} = -\frac{F_x}{F_y}$$

### Example 1: Circle

Consider the circle $x^2 + y^2 = 25$.

Let $F(x, y) = x^2 + y^2 - 25$.

$$F_x = 2x, \quad F_y = 2y$$

$$\frac{dy}{dx} = -\frac{2x}{2y} = -\frac{x}{y}$$

**Verification**: Solving explicitly: $y = \pm\sqrt{25 - x^2}$

For the upper semicircle $y = \sqrt{25 - x^2}$:

$$\frac{dy}{dx} = \frac{-x}{\sqrt{25 - x^2}} = -\frac{x}{y}$$ ✓

### Example 2: Folium of Descartes

For $x^3 + y^3 = 6xy$, find $\frac{dy}{dx}$.

Let $F(x, y) = x^3 + y^3 - 6xy$.

$$F_x = 3x^2 - 6y, \quad F_y = 3y^2 - 6x$$

$$\frac{dy}{dx} = -\frac{3x^2 - 6y}{3y^2 - 6x} = \frac{6y - 3x^2}{3y^2 - 6x} = \frac{2y - x^2}{y^2 - 2x}$$

This cannot be simplified by solving explicitly for $y$.

## Implicit Functions of Three Variables

### Two Independent Variables

If $F(x, y, z) = 0$ defines $z$ implicitly as a function of $x$ and $y$, then:

$$\frac{\partial z}{\partial x} = -\frac{\partial F/\partial x}{\partial F/\partial z} = -\frac{F_x}{F_z}$$

$$\frac{\partial z}{\partial y} = -\frac{\partial F/\partial y}{\partial F/\partial z} = -\frac{F_y}{F_z}$$

provided $F_z \neq 0$.

### Derivation

Treat $z$ as a function of $x$ and $y$: $F(x, y, z(x, y)) = 0$. Differentiate with respect to $x$ (holding $y$ constant):

$$\frac{\partial F}{\partial x} + \frac{\partial F}{\partial z}\frac{\partial z}{\partial x} = 0$$

$$\frac{\partial z}{\partial x} = -\frac{F_x}{F_z}$$

Similarly for $\frac{\partial z}{\partial y}$.

### Example 3: Sphere

For $x^2 + y^2 + z^2 = 1$, find $\frac{\partial z}{\partial x}$ and $\frac{\partial z}{\partial y}$.

Let $F(x, y, z) = x^2 + y^2 + z^2 - 1$.

$$F_x = 2x, \quad F_y = 2y, \quad F_z = 2z$$

$$\frac{\partial z}{\partial x} = -\frac{2x}{2z} = -\frac{x}{z}$$

$$\frac{\partial z}{\partial y} = -\frac{2y}{2z} = -\frac{y}{z}$$

(valid where $z \neq 0$, i.e., away from the equator)

### Example 4: Surface

For $e^z - xyz = 0$, find $\frac{\partial z}{\partial x}$ and $\frac{\partial z}{\partial y}$.

Let $F(x, y, z) = e^z - xyz$.

$$F_x = -yz, \quad F_y = -xz, \quad F_z = e^z - xy$$

$$\frac{\partial z}{\partial x} = -\frac{-yz}{e^z - xy} = \frac{yz}{e^z - xy}$$

$$\frac{\partial z}{\partial y} = -\frac{-xz}{e^z - xy} = \frac{xz}{e^z - xy}$$

## Implicit Function Theorem

### Statement

The **Implicit Function Theorem** provides conditions under which an implicit equation defines a function.

**Theorem**: Let $F(x, y)$ be continuously differentiable in a region containing $(a, b)$ where:
1. $F(a, b) = 0$
2. $F_y(a, b) \neq 0$

Then there exists a neighborhood of $(a, b)$ in which the equation $F(x, y) = 0$ uniquely defines $y$ as a continuously differentiable function of $x$, with:

$$\frac{dy}{dx} = -\frac{F_x}{F_y}$$

### Extension to Three Variables

For $F(x, y, z) = 0$:

If $F$ is continuously differentiable near $(a, b, c)$, $F(a, b, c) = 0$, and $F_z(a, b, c) \neq 0$, then $z$ is implicitly defined as a function of $(x, y)$ near $(a, b)$, with partial derivatives given by the formulas above.

### Geometric Interpretation

The condition $F_y \neq 0$ (or $F_z \neq 0$) ensures that the level curve (or surface) is not horizontal near the point, allowing the implicit equation to define a function locally.

## Higher-Order Implicit Derivatives

### Second Derivative

To find $\frac{d^2y}{dx^2}$ from $F(x, y) = 0$:

We have $\frac{dy}{dx} = -\frac{F_x}{F_y}$.

Differentiate this expression with respect to $x$ using the quotient rule and chain rule:

$$\frac{d^2y}{dx^2} = -\frac{d}{dx}\left(\frac{F_x}{F_y}\right)$$

This involves $F_{xx}$, $F_{xy}$, $F_{yy}$, and $\frac{dy}{dx}$.

### Example 5

For $x^2 + y^2 = 25$, find $\frac{d^2y}{dx^2}$.

We found $\frac{dy}{dx} = -\frac{x}{y}$.

Differentiate:

$$\frac{d^2y}{dx^2} = -\frac{d}{dx}\left(\frac{x}{y}\right) = -\frac{y - x\frac{dy}{dx}}{y^2}$$

Substitute $\frac{dy}{dx} = -\frac{x}{y}$:

$$= -\frac{y - x(-x/y)}{y^2} = -\frac{y + x^2/y}{y^2} = -\frac{y^2 + x^2}{y^3}$$

Since $x^2 + y^2 = 25$:

$$\frac{d^2y}{dx^2} = -\frac{25}{y^3}$$

## Implicit Differentiation for Systems

### Two Equations

If we have two equations:

$$F(x, y, u, v) = 0$$
$$G(x, y, u, v) = 0$$

and we want to find $\frac{\partial u}{\partial x}$ and $\frac{\partial v}{\partial x}$ treating $u, v$ as functions of $x, y$, we differentiate both equations with respect to $x$:

$$F_x + F_u\frac{\partial u}{\partial x} + F_v\frac{\partial v}{\partial x} = 0$$

$$G_x + G_u\frac{\partial u}{\partial x} + G_v\frac{\partial v}{\partial x} = 0$$

This is a system of linear equations in $\frac{\partial u}{\partial x}$ and $\frac{\partial v}{\partial x}$.

Solving (using Cramer's rule or matrix methods) gives the partial derivatives.

### Example 6

Given:
$$u^2 + v^2 + x = 0$$
$$uv - y = 0$$

Find $\frac{\partial u}{\partial x}$ at $(x, y, u, v) = (-1, 0, 1, 0)$.

Differentiate the first equation with respect to $x$:

$$2u\frac{\partial u}{\partial x} + 2v\frac{\partial v}{\partial x} + 1 = 0$$

Differentiate the second:

$$v\frac{\partial u}{\partial x} + u\frac{\partial v}{\partial x} = 0$$

At $(-1, 0, 1, 0)$:

$$2(1)\frac{\partial u}{\partial x} + 0 + 1 = 0 \implies \frac{\partial u}{\partial x} = -\frac{1}{2}$$

$$0 + 1 \cdot \frac{\partial v}{\partial x} = 0 \implies \frac{\partial v}{\partial x} = 0$$

## Applications

### Level Curves and Surfaces

Implicit differentiation is natural for analyzing level curves $f(x, y) = c$ and level surfaces $f(x, y, z) = c$.

The gradient $\nabla f$ is perpendicular to level curves/surfaces, which can be shown using implicit differentiation.

### Thermodynamics

Many thermodynamic relations involve implicit functions. For example, the equation of state $F(P, V, T) = 0$ relates pressure, volume, and temperature. Implicit differentiation yields Maxwell relations and other identities.

### Constraint Optimization

In Lagrange multipliers, constraints are given implicitly. Implicit differentiation helps analyze constrained systems.

## Relationship to Total Differential

The total differential of $F(x, y, z)$ is:

$$dF = F_x\,dx + F_y\,dy + F_z\,dz$$

If $F(x, y, z) = 0$ along a surface, then $dF = 0$:

$$F_x\,dx + F_y\,dy + F_z\,dz = 0$$

Solving for $dz$:

$$dz = -\frac{F_x}{F_z}dx - \frac{F_y}{F_z}dy$$

This gives:

$$\frac{\partial z}{\partial x} = -\frac{F_x}{F_z}, \quad \frac{\partial z}{\partial y} = -\frac{F_y}{F_z}$$

consistent with our formulas.

## Related Rates via Implicit Differentiation

When an implicit equation involves time-dependent variables, implicit differentiation with respect to time yields related rates equations.

### Example 7

A spherical balloon's radius increases at 2 cm/s. How fast is the volume increasing when the radius is 10 cm?

Volume: $V = \frac{4}{3}\pi r^3$

Differentiate with respect to time:

$$\frac{dV}{dt} = 4\pi r^2 \frac{dr}{dt}$$

At $r = 10$ cm, $\frac{dr}{dt} = 2$ cm/s:

$$\frac{dV}{dt} = 4\pi (10)^2 (2) = 800\pi \text{ cm}^3/\text{s}$$

## Summary

Implicit differentiation for multivariable functions enables computation of derivatives when relationships are given implicitly rather than explicitly. For $F(x, y) = 0$, we have $\frac{dy}{dx} = -F_x/F_y$, and for $F(x, y, z) = 0$, we have $\frac{\partial z}{\partial x} = -F_x/F_z$ and $\frac{\partial z}{\partial y} = -F_y/F_z$. The Implicit Function Theorem guarantees the existence of such functions under suitable conditions. Implicit differentiation is essential for analyzing level curves and surfaces, solving constraint problems, and working with thermodynamic and other physical relations. It extends naturally to systems of equations and higher-order derivatives.
