---
title: "Homogeneous Equations with Constant Coefficients"
---

# Homogeneous Equations with Constant Coefficients

## Standard Form

A **second-order linear homogeneous equation with constant coefficients** has the form:

$$ay'' + by' + cy = 0$$

where $a$, $b$, and $c$ are constants with $a \neq 0$. Dividing by $a$ gives:

$$y'' + py' + qy = 0$$

where $p = b/a$ and $q = c/a$.

These equations are among the most important in applications because they model systems with constant physical parameters (mass, damping, spring constant, resistance, capacitance, etc.).

## The Exponential Ansatz

The key observation is that derivatives of exponential functions are proportional to the function itself. This suggests trying a solution of the form:

$$y = e^{rx}$$

where $r$ is a constant to be determined.

If $y = e^{rx}$, then:
$$y' = re^{rx}, \quad y'' = r^2e^{rx}$$

Substituting into $y'' + py' + qy = 0$:
$$r^2e^{rx} + pre^{rx} + qe^{rx} = 0$$
$$e^{rx}(r^2 + pr + q) = 0$$

Since $e^{rx} \neq 0$, we must have:
$$r^2 + pr + q = 0$$

This is called the **characteristic equation** (or **auxiliary equation**).

## The Characteristic Equation

The **characteristic equation** associated with $y'' + py' + qy = 0$ is:

$$r^2 + pr + q = 0$$

This is a quadratic equation with solutions:

$$r = \frac{-p \pm \sqrt{p^2 - 4q}}{2}$$

The nature of the solutions depends on the **discriminant** $\Delta = p^2 - 4q$:

1. **$\Delta > 0$**: Two distinct real roots $r_1, r_2$
2. **$\Delta = 0$**: One repeated real root $r$
3. **$\Delta < 0$**: Two complex conjugate roots $\alpha \pm i\beta$

Each case leads to a different form for the general solution.

## Case 1: Distinct Real Roots

If $p^2 - 4q > 0$, the characteristic equation has two distinct real roots $r_1$ and $r_2$.

**General Solution**:
$$y = c_1e^{r_1x} + c_2e^{r_2x}$$

**Verification**: Both $y_1 = e^{r_1x}$ and $y_2 = e^{r_2x}$ satisfy the differential equation, and they are linearly independent (since $r_1 \neq r_2$, one is not a multiple of the other).

The Wronskian is:
$$W(e^{r_1x}, e^{r_2x}) = \begin{vmatrix} e^{r_1x} & e^{r_2x} \\ r_1e^{r_1x} & r_2e^{r_2x} \end{vmatrix} = (r_2 - r_1)e^{(r_1+r_2)x} \neq 0$$

### Example 1: Distinct Real Roots

Solve $y'' - 5y' + 6y = 0$.

**Solution**:
Characteristic equation: $r^2 - 5r + 6 = 0$

Factor: $(r - 2)(r - 3) = 0$

Roots: $r_1 = 2$, $r_2 = 3$

General solution:
$$y = c_1e^{2x} + c_2e^{3x}$$

### Example 2: IVP with Distinct Real Roots

Solve $y'' + y' - 2y = 0$ with $y(0) = 1$, $y'(0) = 0$.

**Solution**:
Characteristic equation: $r^2 + r - 2 = 0$

Factor: $(r + 2)(r - 1) = 0$

Roots: $r_1 = -2$, $r_2 = 1$

General solution:
$$y = c_1e^{-2x} + c_2e^x$$

Apply initial conditions:
$$y(0) = c_1 + c_2 = 1$$

For the derivative:
$$y' = -2c_1e^{-2x} + c_2e^x$$
$$y'(0) = -2c_1 + c_2 = 0$$

Solve the system:
$$c_1 + c_2 = 1$$
$$-2c_1 + c_2 = 0$$

From the second equation: $c_2 = 2c_1$

Substitute into the first: $c_1 + 2c_1 = 1 \Rightarrow c_1 = 1/3$

Therefore $c_2 = 2/3$.

Particular solution:
$$y = \frac{1}{3}e^{-2x} + \frac{2}{3}e^x$$

## Case 2: Repeated Real Root

If $p^2 - 4q = 0$, the characteristic equation has one repeated root:

$$r = -\frac{p}{2}$$

**General Solution**:
$$y = c_1e^{rx} + c_2xe^{rx} = (c_1 + c_2x)e^{rx}$$

**Why the factor $x$?**

With only one exponential $e^{rx}$, we cannot form a general solution (we need two linearly independent solutions). The second solution involves multiplying by $x$. This can be derived using reduction of order, which we'll cover in detail later.

**Verification**: The Wronskian is:
$$W(e^{rx}, xe^{rx}) = \begin{vmatrix} e^{rx} & xe^{rx} \\ re^{rx} & (1+rx)e^{rx} \end{vmatrix} = e^{2rx} \neq 0$$

So the solutions are linearly independent.

### Example 3: Repeated Root

Solve $y'' - 6y' + 9y = 0$.

**Solution**:
Characteristic equation: $r^2 - 6r + 9 = 0$

Factor: $(r - 3)^2 = 0$

Repeated root: $r = 3$

General solution:
$$y = c_1e^{3x} + c_2xe^{3x} = (c_1 + c_2x)e^{3x}$$

### Example 4: IVP with Repeated Root

Solve $4y'' + 4y' + y = 0$ with $y(0) = 2$, $y'(0) = 1$.

**Solution**:
Divide by 4: $y'' + y' + \frac{1}{4}y = 0$

Characteristic equation: $r^2 + r + \frac{1}{4} = 0$

This factors as $(r + \frac{1}{2})^2 = 0$, or use the quadratic formula:
$$r = \frac{-1 \pm \sqrt{1 - 1}}{2} = -\frac{1}{2}$$

General solution:
$$y = c_1e^{-x/2} + c_2xe^{-x/2}$$

Apply initial conditions:
$$y(0) = c_1 = 2$$

For the derivative:
$$y' = -\frac{1}{2}c_1e^{-x/2} + c_2e^{-x/2} - \frac{1}{2}c_2xe^{-x/2}$$
$$y'(0) = -\frac{1}{2}c_1 + c_2 = 1$$

Substitute $c_1 = 2$:
$$-1 + c_2 = 1 \Rightarrow c_2 = 2$$

Particular solution:
$$y = 2e^{-x/2} + 2xe^{-x/2} = 2(1 + x)e^{-x/2}$$

## Case 3: Complex Conjugate Roots

If $p^2 - 4q < 0$, the characteristic equation has complex conjugate roots:

$$r = \alpha \pm i\beta$$

where:
$$\alpha = -\frac{p}{2}, \quad \beta = \frac{\sqrt{4q - p^2}}{2}$$

Using Euler's formula $e^{i\theta} = \cos\theta + i\sin\theta$, the complex exponentials can be written in terms of real trigonometric functions.

**General Solution**:
$$y = e^{\alpha x}(c_1\cos\beta x + c_2\sin\beta x)$$

**Derivation**: The complex solutions are $y = e^{(\alpha + i\beta)x}$ and $y = e^{(\alpha - i\beta)x}$. Taking real and imaginary parts:

$$e^{(\alpha + i\beta)x} = e^{\alpha x}e^{i\beta x} = e^{\alpha x}(\cos\beta x + i\sin\beta x)$$

The real part $e^{\alpha x}\cos\beta x$ and imaginary part $e^{\alpha x}\sin\beta x$ are both real solutions to the differential equation. These form a linearly independent pair.

### Example 5: Complex Roots

Solve $y'' + 4y' + 13y = 0$.

**Solution**:
Characteristic equation: $r^2 + 4r + 13 = 0$

Quadratic formula:
$$r = \frac{-4 \pm \sqrt{16 - 52}}{2} = \frac{-4 \pm \sqrt{-36}}{2} = \frac{-4 \pm 6i}{2} = -2 \pm 3i$$

So $\alpha = -2$ and $\beta = 3$.

General solution:
$$y = e^{-2x}(c_1\cos 3x + c_2\sin 3x)$$

### Example 6: Simple Harmonic Oscillator

Solve $y'' + \omega^2y = 0$ where $\omega > 0$.

**Solution**:
Characteristic equation: $r^2 + \omega^2 = 0$

Roots: $r = \pm i\omega$ (purely imaginary: $\alpha = 0$, $\beta = \omega$)

General solution:
$$y = c_1\cos\omega x + c_2\sin\omega x$$

This describes simple harmonic motion with angular frequency $\omega$.

### Example 7: IVP with Complex Roots

Solve $y'' + 2y' + 5y = 0$ with $y(0) = 1$, $y'(0) = -3$.

**Solution**:
Characteristic equation: $r^2 + 2r + 5 = 0$

Roots:
$$r = \frac{-2 \pm \sqrt{4 - 20}}{2} = \frac{-2 \pm 4i}{2} = -1 \pm 2i$$

So $\alpha = -1$, $\beta = 2$.

General solution:
$$y = e^{-x}(c_1\cos 2x + c_2\sin 2x)$$

Apply initial conditions:
$$y(0) = c_1 = 1$$

For the derivative:
$$y' = -e^{-x}(c_1\cos 2x + c_2\sin 2x) + e^{-x}(-2c_1\sin 2x + 2c_2\cos 2x)$$
$$y'(0) = -c_1 + 2c_2 = -3$$

Substitute $c_1 = 1$:
$$-1 + 2c_2 = -3 \Rightarrow c_2 = -1$$

Particular solution:
$$y = e^{-x}(\cos 2x - \sin 2x)$$

## Summary of Cases

| Discriminant $\Delta = p^2 - 4q$ | Roots | General Solution |
|----------------------------------|-------|------------------|
| $\Delta > 0$ | $r_1, r_2$ real, distinct | $y = c_1e^{r_1x} + c_2e^{r_2x}$ |
| $\Delta = 0$ | $r$ real, repeated | $y = (c_1 + c_2x)e^{rx}$ |
| $\Delta < 0$ | $\alpha \pm i\beta$ complex | $y = e^{\alpha x}(c_1\cos\beta x + c_2\sin\beta x)$ |

## Physical Interpretation

For mechanical or electrical oscillators governed by $y'' + py' + qy = 0$:

- **Distinct real roots** (overdamped): System returns to equilibrium without oscillating
- **Repeated root** (critically damped): System returns to equilibrium as quickly as possible without oscillating
- **Complex roots** (underdamped): System oscillates with exponentially decaying amplitude

The coefficient $p$ represents damping, while $q$ represents the restoring force or natural frequency.

## Higher-Order Constant Coefficient Equations

The method extends to higher-order equations. For example, the third-order equation:
$$y''' + ay'' + by' + cy = 0$$

has characteristic equation:
$$r^3 + ar^2 + br + c = 0$$

The general solution combines exponentials and polynomials based on the roots (real, repeated, or complex).

## Conclusion

Second-order linear homogeneous equations with constant coefficients are solved completely by finding roots of the characteristic equation. The three cases—distinct real, repeated real, and complex conjugate roots—cover all possibilities and lead to explicit formulas for the general solution. This algebraic approach reduces the problem of solving a differential equation to solving a quadratic equation, making these among the most tractable of all differential equations. The solutions have immediate physical interpretation in terms of damped and undamped oscillations.
