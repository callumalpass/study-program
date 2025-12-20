---
title: "Cauchy-Euler Equations"
---

# Cauchy-Euler Equations

## Definition

A **Cauchy-Euler equation** (also called an **Euler equation** or **equidimensional equation**) is a linear differential equation with variable coefficients of the form:

$$a_nx^ny^{(n)} + a_{n-1}x^{n-1}y^{(n-1)} + \cdots + a_1xy' + a_0y = f(x)$$

where $a_0, a_1, \ldots, a_n$ are constants.

The key feature is that each coefficient $a_kx^k$ matches the order of the derivative $y^{(k)}$.

**Second-order form**:
$$ax^2y'' + bxy' + cy = f(x)$$

**Third-order form**:
$$ax^3y''' + bx^2y'' + cxy' + dy = f(x)$$

## Why Important?

Cauchy-Euler equations:
- Arise naturally in applications (spherical/cylindrical coordinates, potential theory)
- Can be solved in closed form despite variable coefficients
- Connect to constant-coefficient equations via substitution

## Solution Method: Power Function Ansatz

For the homogeneous equation, try a solution of the form:
$$y = x^r$$

where $r$ is a constant to be determined.

### Second-Order Case

For $ax^2y'' + bxy' + cy = 0$:

Compute derivatives:
$$y = x^r$$
$$y' = rx^{r-1}$$
$$y'' = r(r-1)x^{r-2}$$

Substitute:
$$ax^2 \cdot r(r-1)x^{r-2} + bx \cdot rx^{r-1} + cx^r = 0$$
$$ar(r-1)x^r + brx^r + cx^r = 0$$
$$x^r[ar(r-1) + br + c] = 0$$

Since $x^r \neq 0$ (for $x > 0$), we need:
$$ar(r-1) + br + c = 0$$
$$ar^2 - ar + br + c = 0$$
$$ar^2 + (b-a)r + c = 0$$

This is the **characteristic equation** (or **indicial equation**).

## Three Cases

### Case 1: Distinct Real Roots

If $r_1 \neq r_2$ are real, the general solution is:
$$y = c_1x^{r_1} + c_2x^{r_2}$$

**Example 1**: Solve $x^2y'' - 2xy' - 4y = 0$ for $x > 0$.

Try $y = x^r$:
$$r(r-1) - 2r - 4 = 0$$
$$r^2 - r - 2r - 4 = 0$$
$$r^2 - 3r - 4 = 0$$
$$(r - 4)(r + 1) = 0$$

Roots: $r_1 = 4$, $r_2 = -1$

General solution:
$$y = c_1x^4 + c_2x^{-1} = c_1x^4 + \frac{c_2}{x}$$

### Case 2: Repeated Real Root

If $r$ is a repeated root (discriminant = 0), the solutions are:
$$y_1 = x^r, \quad y_2 = x^r\ln x$$

The logarithm term arises from reduction of order (analogous to $xe^{rx}$ for constant coefficients).

**Example 2**: Solve $x^2y'' + 5xy' + 4y = 0$.

Characteristic equation:
$$r(r-1) + 5r + 4 = 0$$
$$r^2 + 4r + 4 = 0$$
$$(r + 2)^2 = 0$$

Repeated root: $r = -2$

General solution:
$$y = c_1x^{-2} + c_2x^{-2}\ln x = \frac{1}{x^2}(c_1 + c_2\ln x)$$

**Verification of $y_2 = x^r\ln x$**: This can be derived using reduction of order with $y_1 = x^r$.

### Case 3: Complex Conjugate Roots

If $r = \alpha \pm i\beta$ (complex), use Euler's formula:
$$x^{\alpha + i\beta} = x^\alpha x^{i\beta} = x^\alpha e^{i\beta\ln x} = x^\alpha(\cos(\beta\ln x) + i\sin(\beta\ln x))$$

Taking real and imaginary parts:
$$y_1 = x^\alpha\cos(\beta\ln x), \quad y_2 = x^\alpha\sin(\beta\ln x)$$

General solution:
$$y = x^\alpha[c_1\cos(\beta\ln x) + c_2\sin(\beta\ln x)]$$

**Example 3**: Solve $x^2y'' + 3xy' + 2y = 0$.

Characteristic equation:
$$r(r-1) + 3r + 2 = 0$$
$$r^2 + 2r + 2 = 0$$

Quadratic formula:
$$r = \frac{-2 \pm \sqrt{4 - 8}}{2} = \frac{-2 \pm 2i}{2} = -1 \pm i$$

So $\alpha = -1$, $\beta = 1$.

General solution:
$$y = \frac{1}{x}[c_1\cos(\ln x) + c_2\sin(\ln x)]$$

## Higher-Order Cauchy-Euler Equations

**Third-order**: For $ax^3y''' + bx^2y'' + cxy' + dy = 0$:

Try $y = x^r$:
$$y' = rx^{r-1}, \quad y'' = r(r-1)x^{r-2}, \quad y''' = r(r-1)(r-2)x^{r-3}$$

Characteristic equation:
$$ar(r-1)(r-2) + br(r-1) + cr + d = 0$$

This is a cubic in $r$.

**Example 4**: Solve $x^3y''' - 3x^2y'' + 6xy' - 6y = 0$.

$$r(r-1)(r-2) - 3r(r-1) + 6r - 6 = 0$$
$$r^3 - 3r^2 + 2r - 3r^2 + 3r + 6r - 6 = 0$$
$$r^3 - 6r^2 + 11r - 6 = 0$$

Try $r = 1$: $1 - 6 + 11 - 6 = 0$ ✓

Factor: $(r - 1)(r^2 - 5r + 6) = (r - 1)(r - 2)(r - 3) = 0$

Roots: $r = 1, 2, 3$

General solution:
$$y = c_1x + c_2x^2 + c_3x^3$$

## Transformation to Constant Coefficients

The substitution $x = e^t$ (or $t = \ln x$) transforms a Cauchy-Euler equation into a constant-coefficient equation.

Under $x = e^t$:
$$\frac{dy}{dx} = \frac{dy}{dt}\frac{dt}{dx} = \frac{1}{x}\frac{dy}{dt}$$
$$\frac{d^2y}{dx^2} = \frac{1}{x^2}\left(\frac{d^2y}{dt^2} - \frac{dy}{dt}\right)$$

**Example 5**: Transform $x^2y'' + xy' - y = 0$ using $t = \ln x$.

$$x^2y'' = \frac{d^2y}{dt^2} - \frac{dy}{dt}$$
$$xy' = \frac{dy}{dt}$$

The equation becomes:
$$\frac{d^2y}{dt^2} - \frac{dy}{dt} + \frac{dy}{dt} - y = 0$$
$$\frac{d^2y}{dt^2} - y = 0$$

Characteristic equation: $r^2 - 1 = 0$, so $r = \pm 1$

$$y(t) = c_1e^t + c_2e^{-t}$$

Transform back ($e^t = x$):
$$y(x) = c_1x + \frac{c_2}{x}$$

## Nonhomogeneous Cauchy-Euler Equations

For $ax^2y'' + bxy' + cy = f(x)$:

**General solution**: $y = y_h + y_p$

### Method 1: Variation of Parameters

Use the formula for variation of parameters with $y_1$ and $y_2$ from the homogeneous solution.

### Method 2: Undetermined Coefficients

If $f(x)$ has a special form (polynomial in $\ln x$, powers of $x$, etc.), guess $y_p$.

**Example 6**: Solve $x^2y'' - 2xy' + 2y = x^3$.

Homogeneous solution:

Characteristic equation: $r(r-1) - 2r + 2 = r^2 - 3r + 2 = (r-1)(r-2) = 0$

$$y_h = c_1x + c_2x^2$$

For $f(x) = x^3$, try $y_p = Ax^3$:
$$y_p' = 3Ax^2, \quad y_p'' = 6Ax$$

Substitute:
$$x^2(6Ax) - 2x(3Ax^2) + 2(Ax^3) = x^3$$
$$6Ax^3 - 6Ax^3 + 2Ax^3 = x^3$$
$$2Ax^3 = x^3$$
$$A = \frac{1}{2}$$

General solution:
$$y = c_1x + c_2x^2 + \frac{1}{2}x^3$$

## Initial Value Problems

**Example 7**: Solve $x^2y'' - xy' - 3y = 0$ with $y(1) = 1$, $y'(1) = 4$.

Characteristic equation:
$$r(r-1) - r - 3 = r^2 - 2r - 3 = (r - 3)(r + 1) = 0$$

$$y = c_1x^3 + c_2x^{-1}$$
$$y' = 3c_1x^2 - c_2x^{-2}$$

Apply $y(1) = 1$:
$$c_1 + c_2 = 1$$

Apply $y'(1) = 4$:
$$3c_1 - c_2 = 4$$

Solve: $4c_1 = 5$, so $c_1 = \frac{5}{4}$, $c_2 = -\frac{1}{4}$

Solution:
$$y = \frac{5}{4}x^3 - \frac{1}{4x}$$

## Negative and Zero Values of x

For $x < 0$, use $|x|^r$ or transform $x \to -x$.

The general solution on any interval not containing $x = 0$ can be written:
$$y = c_1|x|^{r_1} + c_2|x|^{r_2}$$

## Applications

- **Laplace's equation** in spherical coordinates
- **Potential flow** around cylinders
- **Bessel equations** (related form)
- **Gravitational/electrostatic potentials**

## Conclusion

Cauchy-Euler equations are remarkable because, despite having variable coefficients, they can be solved exactly using power functions $x^r$. The method parallels constant-coefficient equations: find a characteristic equation, classify roots, and write the general solution. The transformation to constant coefficients via $x = e^t$ provides an alternative approach and deepens understanding of the connection between these equation types. Cauchy-Euler equations appear frequently in physics and engineering problems with radial symmetry.
