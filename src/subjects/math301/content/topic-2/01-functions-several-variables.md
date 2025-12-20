# Functions of Several Variables

## Introduction

Functions of several variables extend the concept of single-variable functions to situations where the output depends on multiple inputs. These functions are ubiquitous in science, engineering, and economics, where outcomes typically depend on numerous factors simultaneously. For instance, temperature varies with position in three-dimensional space, profit depends on production quantities of multiple goods, and the trajectory of a spacecraft depends on its position and velocity components. Understanding multivariable functions is essential for modeling real-world phenomena and forms the foundation for multivariable calculus.

## Definition

### Functions of Two Variables

A **function of two variables** is a rule that assigns to each ordered pair $(x, y)$ in a domain $D \subseteq \mathbb{R}^2$ a unique real number $z$:

$$z = f(x, y)$$

The variables $x$ and $y$ are called **independent variables**, and $z$ is the **dependent variable**.

### Functions of Three Variables

Similarly, a **function of three variables** assigns to each ordered triple $(x, y, z)$ in a domain $D \subseteq \mathbb{R}^3$ a unique real number $w$:

$$w = f(x, y, z)$$

### General Case

More generally, a function of $n$ variables is:

$$w = f(x_1, x_2, \ldots, x_n)$$

where the domain is a subset of $\mathbb{R}^n$.

## Examples

### Example 1: Area of a Rectangle

The area of a rectangle depends on its length $\ell$ and width $w$:

$$A(\ell, w) = \ell w$$

Domain: $\{(\ell, w) : \ell > 0, w > 0\}$

### Example 2: Distance Formula

The distance from the origin to point $(x, y)$ is:

$$d(x, y) = \sqrt{x^2 + y^2}$$

Domain: All of $\mathbb{R}^2$

### Example 3: Temperature Distribution

Temperature in a room might be modeled as:

$$T(x, y, z) = 20 + 0.5z - 0.1x^2$$

where $(x, y, z)$ represents position in meters and $T$ is in degrees Celsius.

### Example 4: Cobb-Douglas Production Function

In economics, production $P$ might depend on labor $L$ and capital $K$:

$$P(L, K) = cL^{\alpha}K^{\beta}$$

where $c$, $\alpha$, and $\beta$ are constants.

## Domain

### Definition

The **domain** of a function $f$ is the set of all inputs for which $f$ is defined. Unless otherwise stated, the domain is the largest set for which the formula makes sense (natural domain).

### Finding Domains

To determine the domain:

1. Identify restrictions from denominators (cannot be zero)
2. Identify restrictions from square roots (radicand must be non-negative for real functions)
3. Identify restrictions from logarithms (argument must be positive)
4. Consider any physical or contextual constraints

### Example: Square Root Function

For $f(x, y) = \sqrt{9 - x^2 - y^2}$, we require:

$$9 - x^2 - y^2 \ge 0$$

$$x^2 + y^2 \le 9$$

The domain is the closed disk of radius 3 centered at the origin:

$$D = \{(x, y) : x^2 + y^2 \le 9\}$$

### Example: Rational Function

For $f(x, y) = \frac{1}{x - y}$, we require $x - y \neq 0$, so:

$$D = \{(x, y) : x \neq y\}$$

The domain is all of $\mathbb{R}^2$ except the line $y = x$.

### Example: Logarithmic Function

For $f(x, y) = \ln(xy - 1)$, we require:

$$xy - 1 > 0$$

$$xy > 1$$

The domain consists of two regions:
- $\{(x, y) : x > 0, y > 1/x\}$ (first quadrant above hyperbola)
- $\{(x, y) : x < 0, y < 1/x\}$ (third quadrant below hyperbola)

## Range

### Definition

The **range** of a function $f$ is the set of all possible output values:

$$\text{Range}(f) = \{z : z = f(x, y) \text{ for some } (x, y) \in D\}$$

### Example

For $f(x, y) = x^2 + y^2$:

Since $x^2 \ge 0$ and $y^2 \ge 0$, we have $f(x, y) \ge 0$. For any $c \ge 0$, we can find $(x, y)$ such that $x^2 + y^2 = c$ (e.g., $(x, y) = (\sqrt{c}, 0)$).

Range: $[0, \infty)$

### Example

For $f(x, y) = \sqrt{9 - x^2 - y^2}$ with domain $x^2 + y^2 \le 9$:

The maximum value occurs at $(0, 0)$: $f(0, 0) = 3$

The minimum value occurs on the boundary $x^2 + y^2 = 9$: $f = 0$

Range: $[0, 3]$

## Graphs

### Graph of a Function of Two Variables

The **graph** of $z = f(x, y)$ is the set of all points $(x, y, z)$ in three-dimensional space where $z = f(x, y)$:

$$\text{Graph}(f) = \{(x, y, z) : z = f(x, y), (x, y) \in D\}$$

This is a **surface** in $\mathbb{R}^3$.

### Visualizing Surfaces

Common surfaces include:

**Plane**: $f(x, y) = ax + by + c$ represents a flat plane.

**Paraboloid**: $f(x, y) = x^2 + y^2$ is a bowl-shaped surface opening upward.

**Saddle**: $f(x, y) = x^2 - y^2$ curves upward in one direction and downward in another, resembling a saddle.

**Hemisphere**: $f(x, y) = \sqrt{r^2 - x^2 - y^2}$ represents the upper half of a sphere of radius $r$.

### Example: Paraboloid

The graph of $f(x, y) = x^2 + y^2$ is a circular paraboloid. Cross-sections parallel to the $xy$-plane (at height $z = c > 0$) are circles $x^2 + y^2 = c$. Cross-sections in vertical planes through the $z$-axis are parabolas.

### Example: Saddle Surface

The graph of $f(x, y) = x^2 - y^2$ is a hyperbolic paraboloid (saddle surface). The cross-section at $y = 0$ is the parabola $z = x^2$ (opening upward). The cross-section at $x = 0$ is the parabola $z = -y^2$ (opening downward).

## Level Curves

### Definition

For a function $f(x, y)$, the **level curves** are curves in the $xy$-plane where $f$ is constant:

$$f(x, y) = c$$

for various constants $c$. These curves are also called **contour lines** (as on topographic maps).

### Interpretation

Level curves provide a two-dimensional representation of a three-dimensional surface. They are like the contour lines on a topographic map showing elevation.

### Example: Paraboloid

For $f(x, y) = x^2 + y^2$, the level curves are:

$$x^2 + y^2 = c$$

For $c > 0$, these are concentric circles centered at the origin with radius $\sqrt{c}$.

For $c = 0$, the level curve is the single point $(0, 0)$.

For $c < 0$, there are no level curves (no points satisfy the equation).

### Example: Linear Function

For $f(x, y) = 2x + 3y$, the level curves are:

$$2x + 3y = c$$

These are parallel lines with slope $-2/3$. Closer spacing indicates steeper change in $f$.

### Example: Hyperbolic Paraboloid

For $f(x, y) = x^2 - y^2$, the level curves are:

$$x^2 - y^2 = c$$

For $c > 0$: hyperbolas opening horizontally

For $c = 0$: the lines $y = \pm x$

For $c < 0$: hyperbolas opening vertically

### Gradient and Level Curves

The gradient of $f$ (discussed later) is always perpendicular to the level curves of $f$. This provides a powerful geometric interpretation.

## Level Surfaces

### Definition

For a function of three variables $f(x, y, z)$, the **level surfaces** are surfaces in three-dimensional space where $f$ is constant:

$$f(x, y, z) = c$$

### Example: Sphere

For $f(x, y, z) = x^2 + y^2 + z^2$, the level surfaces are:

$$x^2 + y^2 + z^2 = c$$

For $c > 0$: concentric spheres centered at the origin with radius $\sqrt{c}$

For $c = 0$: the single point $(0, 0, 0)$

For $c < 0$: no level surfaces

### Example: Plane

For $f(x, y, z) = ax + by + cz$, the level surfaces are:

$$ax + by + cz = k$$

These are parallel planes with normal vector $\langle a, b, c \rangle$.

### Example: Temperature

If $T(x, y, z) = 100 - z$ represents temperature (in °C) at position $(x, y, z)$, then level surfaces are:

$$100 - z = c \implies z = 100 - c$$

These are horizontal planes. The temperature is constant on each horizontal plane and decreases by 1°C per meter of altitude.

## Traces and Cross-Sections

### Definition

A **trace** or **cross-section** of the surface $z = f(x, y)$ is the intersection with a plane.

### Vertical Traces

Setting $x = a$ (constant) gives the trace in the plane $x = a$:

$$z = f(a, y)$$

This is a curve in the $yz$-plane.

Similarly, setting $y = b$ gives:

$$z = f(x, b)$$

a curve in the $xz$-plane.

### Horizontal Traces

Setting $z = c$ gives:

$$f(x, y) = c$$

This is a level curve in the $xy$-plane.

### Example: Elliptic Paraboloid

For $f(x, y) = \frac{x^2}{4} + y^2$:

**Trace at $x = 0$**: $z = y^2$ (parabola in $yz$-plane)

**Trace at $y = 0$**: $z = \frac{x^2}{4}$ (parabola in $xz$-plane)

**Trace at $z = 4$**: $\frac{x^2}{4} + y^2 = 4 \implies \frac{x^2}{16} + \frac{y^2}{4} = 1$ (ellipse)

## Computer Representation

Modern software (MATLAB, Mathematica, Python with matplotlib) can visualize functions of two variables using:

- **Surface plots**: Three-dimensional rendering of the graph
- **Contour plots**: Two-dimensional plots showing level curves
- **Heat maps**: Color-coded representations where color indicates function value

These tools are essential for understanding complex multivariable functions.

## Applications

### Physics

- Electric potential: $V(x, y, z)$ depends on position
- Temperature distribution: $T(x, y, z, t)$ depends on position and time
- Gravitational potential energy

### Economics

- Utility functions: $U(x_1, x_2, \ldots, x_n)$ depends on quantities of goods consumed
- Production functions: output depends on inputs (labor, capital, materials)
- Cost functions: total cost depends on quantities produced

### Engineering

- Stress and strain: depend on position within a structure
- Flow velocity in fluids: $\mathbf{v}(x, y, z, t)$ vector field
- Signal processing: intensity depends on spatial coordinates

### Geography

- Topographic maps: elevation $h(x, y)$ as a function of horizontal position
- Climate modeling: temperature, pressure, humidity as functions of position and time

## Summary

Functions of several variables assign a real number to each point in a multi-dimensional domain. The domain is the set of valid inputs, and the range is the set of possible outputs. Graphs of functions of two variables are surfaces in three-dimensional space. Level curves (for two variables) and level surfaces (for three variables) show where the function takes constant values, providing powerful visualization tools. Understanding the geometric representation of multivariable functions through graphs, level sets, and cross-sections is essential for analyzing and applying these functions across science, engineering, and economics.
