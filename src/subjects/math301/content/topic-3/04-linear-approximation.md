# Linear Approximation and Total Differential

## Introduction

Linear approximation extends the idea of tangent line approximation from single-variable calculus to multivariable functions. Just as the tangent line provides a local linear approximation to a curve, the tangent plane provides a local linear approximation to a surface. This approximation is expressed through the **linearization** and the **total differential**, which are fundamental tools for estimating function values, analyzing error propagation, and understanding differentiability in multiple dimensions.

## Linearization

### Definition

For a differentiable function $f(x, y)$, the **linearization** (or **linear approximation**) at $(a, b)$ is:

$$L(x, y) = f(a, b) + f_x(a, b)(x - a) + f_y(a, b)(y - b)$$

This is the equation of the tangent plane at $(a, b, f(a, b))$.

Near $(a, b)$, we approximate:

$$f(x, y) \approx L(x, y)$$

### Geometric Interpretation

The linearization $L(x, y)$ represents the tangent plane to the surface $z = f(x, y)$. Close to $(a, b)$, the surface and its tangent plane nearly coincide, making $L$ an excellent approximation.

### Example 1

Find the linearization of $f(x, y) = \sqrt{x^2 + y^2}$ at $(3, 4)$.

$$f(3, 4) = \sqrt{9 + 16} = 5$$

$$f_x = \frac{x}{\sqrt{x^2 + y^2}}, \quad f_y = \frac{y}{\sqrt{x^2 + y^2}}$$

$$f_x(3, 4) = \frac{3}{5}, \quad f_y(3, 4) = \frac{4}{5}$$

Linearization:

$$L(x, y) = 5 + \frac{3}{5}(x - 3) + \frac{4}{5}(y - 4)$$

$$= 5 + \frac{3x}{5} - \frac{9}{5} + \frac{4y}{5} - \frac{16}{5}$$

$$= \frac{3x + 4y}{5}$$

### Example 2: Approximating Values

Use the linearization from Example 1 to approximate $f(2.9, 4.1)$.

$$L(2.9, 4.1) = \frac{3(2.9) + 4(4.1)}{5} = \frac{8.7 + 16.4}{5} = \frac{25.1}{5} = 5.02$$

Actual value:

$$f(2.9, 4.1) = \sqrt{8.41 + 16.81} = \sqrt{25.22} \approx 5.022$$

The approximation is very accurate.

## Total Differential

### Definition

The **total differential** of $z = f(x, y)$ is:

$$dz = f_x\,dx + f_y\,dy$$

where $dx = \Delta x$ and $dy = \Delta y$ represent small changes in $x$ and $y$.

The total differential approximates the actual change in $f$:

$$\Delta z = f(x + \Delta x, y + \Delta y) - f(x, y) \approx dz$$

### Relationship to Linearization

The total differential is the differential form of the linearization. Setting $(x, y) = (a + dx, b + dy)$:

$$dz = f(x + dx, y + dy) - f(x, y) \approx L(x + dx, y + dy) - L(x, y)$$

### Example 3

For $f(x, y) = x^2y + y^3$ at $(2, 1)$ with $dx = 0.1, dy = -0.05$:

$$f(2, 1) = 4 + 1 = 5$$

$$f_x = 2xy, \quad f_y = x^2 + 3y^2$$

$$f_x(2, 1) = 4, \quad f_y(2, 1) = 7$$

Total differential:

$$dz = 4(0.1) + 7(-0.05) = 0.4 - 0.35 = 0.05$$

Approximate value:

$$f(2.1, 0.95) \approx 5 + 0.05 = 5.05$$

Actual value:

$$f(2.1, 0.95) = (2.1)^2(0.95) + (0.95)^3 = 4.1895 + 0.857375 = 5.046875$$

## Three Variables

For $w = f(x, y, z)$, the linearization at $(a, b, c)$ is:

$$L(x, y, z) = f(a, b, c) + f_x(a, b, c)(x - a) + f_y(a, b, c)(y - b) + f_z(a, b, c)(z - c)$$

The total differential is:

$$dw = f_x\,dx + f_y\,dy + f_z\,dz$$

### Example 4

For $f(x, y, z) = e^{xyz}$ at $(0, 1, 2)$ with $dx = 0.01, dy = 0, dz = -0.02$:

$$f(0, 1, 2) = e^0 = 1$$

$$f_x = yze^{xyz}, \quad f_y = xze^{xyz}, \quad f_z = xye^{xyz}$$

$$f_x(0, 1, 2) = 2, \quad f_y(0, 1, 2) = 0, \quad f_z(0, 1, 2) = 0$$

$$dw = 2(0.01) + 0 + 0 = 0.02$$

$$f(0.01, 1, 1.98) \approx 1.02$$

## Error Propagation

The total differential estimates how measurement errors propagate through calculations.

If $x$ and $y$ have errors $dx$ and $dy$, the resulting error in $f(x, y)$ is approximately:

$$|df| \approx |f_x|\,|dx| + |f_y|\,|dy|$$

(using the triangle inequality for a worst-case estimate)

### Example 5: Cylinder Volume

The volume of a cylinder is $V = \pi r^2 h$. If $r = 5$ cm with error $\pm 0.1$ cm, and $h = 10$ cm with error $\pm 0.2$ cm, estimate the maximum error in $V$.

$$\frac{\partial V}{\partial r} = 2\pi rh, \quad \frac{\partial V}{\partial h} = \pi r^2$$

At $r = 5, h = 10$:

$$\frac{\partial V}{\partial r} = 100\pi, \quad \frac{\partial V}{\partial h} = 25\pi$$

Maximum error:

$$|dV| \le 100\pi(0.1) + 25\pi(0.2) = 10\pi + 5\pi = 15\pi \approx 47.1 \text{ cm}^3$$

### Relative and Percentage Error

**Relative error**: $\frac{dV}{V}$

**Percentage error**: $\frac{dV}{V} \times 100\%$

For the cylinder: $V = \pi(25)(10) = 250\pi$

$$\frac{dV}{V} = \frac{15\pi}{250\pi} = \frac{15}{250} = 0.06 = 6\%$$

## Differential Formulas

### Product Rule

$$d(uv) = u\,dv + v\,du$$

### Quotient Rule

$$d\left(\frac{u}{v}\right) = \frac{v\,du - u\,dv}{v^2}$$

### Chain Rule

If $w = f(x, y)$ and $x, y$ are functions of $t$:

$$dw = f_x\,dx + f_y\,dy$$

Dividing by $dt$:

$$\frac{dw}{dt} = f_x\frac{dx}{dt} + f_y\frac{dy}{dt}$$

## Applications in Physics and Engineering

### Example 6: Ideal Gas Law

For the ideal gas law $PV = nRT$, if $V$ and $T$ are measured:

$$P = \frac{nRT}{V}$$

$$dP = \frac{\partial P}{\partial V}dV + \frac{\partial P}{\partial T}dT = -\frac{nRT}{V^2}dV + \frac{nR}{V}dT$$

If $V$ increases slightly while $T$ is constant ($dT = 0$), then $dP < 0$: pressure decreases.

### Example 7: Electrical Resistance

For resistors in series: $R = R_1 + R_2$

$$dR = dR_1 + dR_2$$

Errors add directly.

For resistors in parallel: $\frac{1}{R} = \frac{1}{R_1} + \frac{1}{R_2}$

$$d\left(\frac{1}{R}\right) = -\frac{dR}{R^2} = -\frac{dR_1}{R_1^2} - \frac{dR_2}{R_2^2}$$

More complex error propagation.

## Accuracy of Linear Approximation

The approximation $f(x, y) \approx L(x, y)$ is most accurate when $(x, y)$ is close to $(a, b)$. The error depends on the second derivatives of $f$ (curvature of the surface).

For smooth functions, if $|(x - a, y - b)|$ is small, the error is proportional to the square of the distance:

$$|f(x, y) - L(x, y)| = O(|(x - a, y - b)|^2)$$

## Comparison with Single-Variable Case

In single-variable calculus:

$$f(x) \approx f(a) + f'(a)(x - a)$$

$$df = f'(a)\,dx$$

The multivariable versions are direct generalizations, replacing $f'(a)$ with the gradient.

## Summary

Linear approximation and the total differential extend tangent line approximation to multivariable functions. The linearization $L(x, y) = f(a, b) + f_x(x - a) + f_y(y - b)$ is the tangent plane, providing the best linear approximation near $(a, b)$. The total differential $dz = f_x\,dx + f_y\,dy$ estimates the change in $f$ for small changes in the variables and is crucial for error propagation analysis. These tools are fundamental in calculus, physics, engineering, and numerical methods, enabling estimation of function values and understanding sensitivity to parameter changes.
