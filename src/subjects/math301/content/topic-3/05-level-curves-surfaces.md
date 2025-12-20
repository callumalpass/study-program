---
id: math301-topic-3-5
title: "Level Curves and Surfaces"
order: 5
---

# Level Curves and Level Surfaces

## Introduction

Level curves and level surfaces provide powerful tools for visualizing multivariable functions. While graphs of $z = f(x, y)$ require three dimensions, level curves offer a two-dimensional representation, much like contour lines on topographic maps. Level surfaces extend this concept to functions of three variables. Understanding level sets is essential for optimization, analyzing constraints, and studying the geometry of multivariable functions. The gradient's perpendicularity to level sets provides deep geometric insight.

## Level Curves

### Definition

For a function $f(x, y)$, the **level curves** are curves in the $xy$-plane defined by:

$$f(x, y) = k$$

for various constants $k$. Each level curve consists of all points where $f$ takes the value $k$.

### Alternative Names

- **Contour lines** (especially in topography)
- **Isolines** or **isopleths**
- **Level sets** (in 2D)

### Visualization

A collection of level curves for different values of $k$ forms a **contour map** or **contour plot**, providing a complete picture of how $f$ varies across the $xy$-plane.

### Example 1: Linear Function

For $f(x, y) = 2x + 3y$, level curves are:

$$2x + 3y = k$$

These are parallel lines with slope $-2/3$. Different values of $k$ give different parallel lines.

$k = 0$: $2x + 3y = 0$ (line through origin)
$k = 6$: $2x + 3y = 6$
$k = -6$: $2x + 3y = -6$

Closely spaced level curves indicate steep change; widely spaced curves indicate gradual change.

### Example 2: Paraboloid

For $f(x, y) = x^2 + y^2$, level curves are:

$$x^2 + y^2 = k$$

For $k > 0$: circles of radius $\sqrt{k}$ centered at the origin
For $k = 0$: the origin (single point)
For $k < 0$: no level curve (empty set)

The circles become larger as $k$ increases, representing increasing height on the paraboloid.

### Example 3: Hyperbolic Paraboloid (Saddle)

For $f(x, y) = x^2 - y^2$, level curves are:

$$x^2 - y^2 = k$$

For $k > 0$: hyperbolas opening horizontally
For $k = 0$: lines $y = \pm x$ (degenerate hyperbola)
For $k < 0$: hyperbolas opening vertically

This creates the characteristic saddle shape.

### Example 4: Cobb-Douglas Function

In economics, $P(L, K) = AL^{\alpha}K^{\beta}$ represents production. Level curves $P = k$ are:

$$AL^{\alpha}K^{\beta} = k$$

$$K = \left(\frac{k}{A}\right)^{1/\beta}L^{-\alpha/\beta}$$

These are **isoquants**, showing combinations of labor $L$ and capital $K$ that produce the same output.

## Properties of Level Curves

### Spacing and Gradient

- **Close spacing**: Large gradient (steep surface)
- **Wide spacing**: Small gradient (gentle surface)
- **Uniform spacing**: Constant gradient magnitude

### No Crossing

Level curves for different values of $k$ **never intersect** (since $f$ is single-valued: a point can't have two different $f$-values simultaneously).

### Perpendicularity to Gradient

The gradient $\nabla f$ is **perpendicular** to level curves at every point.

**Proof**: If $\mathbf{r}(t) = \langle x(t), y(t) \rangle$ parametrizes a level curve $f(x, y) = k$, then:

$$\frac{d}{dt}[f(x(t), y(t))] = 0$$

$$f_x\frac{dx}{dt} + f_y\frac{dy}{dt} = 0$$

$$\nabla f \cdot \mathbf{r}'(t) = 0$$

Since $\mathbf{r}'(t)$ is tangent to the level curve and $\nabla f \cdot \mathbf{r}'(t) = 0$, the gradient is perpendicular to the curve.

### Example 5

For $f(x, y) = x^2 + y^2$:

$$\nabla f = \langle 2x, 2y \rangle = 2\langle x, y \rangle$$

This points radially outward, perpendicular to the circular level curves $x^2 + y^2 = k$.

## Level Surfaces

### Definition

For $f(x, y, z)$, the **level surfaces** are surfaces in three-dimensional space defined by:

$$f(x, y, z) = k$$

### Example 6: Sphere

For $f(x, y, z) = x^2 + y^2 + z^2$:

$$x^2 + y^2 + z^2 = k$$

For $k > 0$: spheres of radius $\sqrt{k}$ centered at the origin
For $k = 0$: the origin
For $k < 0$: empty set

### Example 7: Plane

For $f(x, y, z) = ax + by + cz$:

$$ax + by + cz = k$$

These are parallel planes with normal vector $\langle a, b, c \rangle$.

### Example 8: Cylinder

For $f(x, y, z) = x^2 + y^2$:

$$x^2 + y^2 = k$$

For $k > 0$: circular cylinders with axis along the $z$-axis
Note: $f$ doesn't depend on $z$, so the level surfaces are cylinders extending infinitely in the $z$-direction.

### Example 9: Ellipsoid

For $f(x, y, z) = \frac{x^2}{a^2} + \frac{y^2}{b^2} + \frac{z^2}{c^2}$:

$$\frac{x^2}{a^2} + \frac{y^2}{b^2} + \frac{z^2}{c^2} = k$$

For $k > 0$: ellipsoids with semi-axes $a\sqrt{k}, b\sqrt{k}, c\sqrt{k}$

## Gradient Perpendicular to Level Surfaces

The gradient $\nabla f(x, y, z)$ is **perpendicular** (normal) to the level surface $f(x, y, z) = k$ at each point.

This follows from the same reasoning as for level curves: any curve on the surface satisfies $f = k$, so:

$$\nabla f \cdot \mathbf{r}'(t) = 0$$

for any curve $\mathbf{r}(t)$ on the surface. Thus $\nabla f$ is perpendicular to all tangent vectors, hence normal to the surface.

### Example 10

For the sphere $x^2 + y^2 + z^2 = 25$:

$$\nabla f = \langle 2x, 2y, 2z \rangle$$

At $(3, 4, 0)$:

$$\nabla f(3, 4, 0) = \langle 6, 8, 0 \rangle$$

This points outward from the center, perpendicular to the sphere's surface.

## Applications

### Topographic Maps

Contour lines on maps show elevation. Close contours indicate steep terrain; wide spacing indicates gentle slopes.

### Thermodynamics

Isotherms ($T = k$) show constant temperature curves/surfaces.

### Meteorology

Isobars ($P = k$) show constant pressure.

### Electromagnetism

Equipotential surfaces ($V = k$) show constant electric potential. Electric field lines are perpendicular to these surfaces, following $\mathbf{E} = -\nabla V$.

### Economics

Indifference curves show combinations of goods yielding the same utility.

## Sketching Level Curves

### Procedure

1. Choose several values of $k$ (including positive, negative, and zero if applicable)
2. For each $k$, solve $f(x, y) = k$ or sketch the curve implicitly
3. Plot the curves, labeling each with its $k$ value
4. Note patterns: spacing, shape, symmetry

### Example 11

Sketch level curves for $f(x, y) = xy$.

$$xy = k$$

For $k > 0$: hyperbolas in quadrants I and III
For $k = 0$: the axes ($x = 0$ or $y = 0$)
For $k < 0$: hyperbolas in quadrants II and IV

## Gradient Descent and Ascent

Since $\nabla f$ points perpendicular to level curves (in the direction of steepest ascent):

- **Gradient ascent**: Move in direction $+\nabla f$ to increase $f$ most rapidly
- **Gradient descent**: Move in direction $-\nabla f$ to decrease $f$ most rapidly

These are fundamental optimization algorithms.

## Relationship to Tangent Planes

For a level surface $F(x, y, z) = k$, the tangent plane at $(a, b, c)$ has normal vector $\nabla F(a, b, c)$:

$$F_x(a, b, c)(x - a) + F_y(a, b, c)(y - b) + F_z(a, b, c)(z - c) = 0$$

## Summary

Level curves $f(x, y) = k$ provide two-dimensional visualizations of functions of two variables, analogous to contour maps. Level surfaces $f(x, y, z) = k$ extend this concept to three variables. The gradient $\nabla f$ is always perpendicular to level curves and surfaces, pointing in the direction of steepest increase. Close spacing of level sets indicates steep change; wide spacing indicates gradual change. Level sets never cross and are fundamental for understanding optimization, constraints, and the geometry of multivariable functions. Applications range from topography and meteorology to economics and electromagnetism.
