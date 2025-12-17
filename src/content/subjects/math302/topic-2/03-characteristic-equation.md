---
title: "The Characteristic Equation Method"
---

# The Characteristic Equation Method

## Foundation of the Method

The **characteristic equation method** is the standard technique for solving linear homogeneous differential equations with constant coefficients. It transforms a differential equation into an algebraic equation, making solution straightforward and systematic.

For the general second-order equation:
$$ay'' + by' + cy = 0$$

The associated **characteristic equation** is:
$$ar^2 + br + c = 0$$

This polynomial equation is obtained by substituting $y = e^{rx}$ and factoring out $e^{rx}$.

## Why Exponentials?

Exponential functions have the remarkable property that their derivatives are proportional to themselves:
$$\frac{d}{dx}e^{rx} = re^{rx}$$

This self-similarity under differentiation makes exponentials the natural candidates for solutions to constant-coefficient linear equations. Any linear combination of $y$ and its derivatives will also be an exponential, allowing cancellation of the exponential factor.

## The Three Cases in Detail

### Case 1: Two Distinct Real Roots

When $b^2 - 4ac > 0$, the characteristic equation has two distinct real roots:
$$r_1 = \frac{-b + \sqrt{b^2 - 4ac}}{2a}, \quad r_2 = \frac{-b - \sqrt{b^2 - 4ac}}{2a}$$

**General solution**:
$$y = c_1e^{r_1x} + c_2e^{r_2x}$$

**Behavior**: Solutions are combinations of two exponentials with different growth/decay rates.

- If both $r_1, r_2 < 0$: Both exponentials decay → solution approaches zero
- If both $r_1, r_2 > 0$: Both exponentials grow → solution grows without bound
- If $r_1 < 0 < r_2$: One decays, one grows → long-term behavior dominated by $e^{r_2x}$

**Example 1**: Solve $y'' - y' - 6y = 0$.

Characteristic equation: $r^2 - r - 6 = 0$

Factor: $(r - 3)(r + 2) = 0$

Roots: $r_1 = 3$, $r_2 = -2$

General solution:
$$y = c_1e^{3x} + c_2e^{-2x}$$

As $x \to \infty$, the term $e^{3x}$ dominates (if $c_1 \neq 0$), so solutions grow exponentially.

**Example 2**: Solve $2y'' + 5y' + 2y = 0$.

Characteristic equation: $2r^2 + 5r + 2 = 0$

Factor: $(2r + 1)(r + 2) = 0$

Roots: $r_1 = -\frac{1}{2}$, $r_2 = -2$

General solution:
$$y = c_1e^{-x/2} + c_2e^{-2x}$$

Both roots are negative, so all solutions decay to zero as $x \to \infty$.

### Case 2: Repeated Real Root

When $b^2 - 4ac = 0$, the characteristic equation has one repeated root:
$$r = -\frac{b}{2a}$$

**General solution**:
$$y = (c_1 + c_2x)e^{rx}$$

**Why the polynomial factor?**

With only one exponential solution $e^{rx}$, we need a second linearly independent solution. It turns out that $xe^{rx}$ works. This can be verified by direct substitution or derived using reduction of order.

**Behavior**: Solutions combine polynomial and exponential growth/decay.

- If $r < 0$: Solutions decay, but polynomial factor slows initial decay
- If $r > 0$: Solutions grow, with polynomial factor accelerating growth
- If $r = 0$: Solutions are linear: $y = c_1 + c_2x$

**Example 3**: Solve $y'' + 6y' + 9y = 0$.

Characteristic equation: $r^2 + 6r + 9 = 0$

Factor: $(r + 3)^2 = 0$

Repeated root: $r = -3$

General solution:
$$y = (c_1 + c_2x)e^{-3x}$$

As $x \to \infty$, $y \to 0$ (exponential decay dominates polynomial growth).

**Example 4**: Verify that $xe^{rx}$ satisfies the equation when $r$ is a repeated root.

If $y = xe^{rx}$, then:
$$y' = e^{rx} + rxe^{rx} = (1 + rx)e^{rx}$$
$$y'' = re^{rx} + r(1 + rx)e^{rx} = (2r + r^2x)e^{rx}$$

For the equation $y'' + py' + qy = 0$ with repeated root $r = -p/2$ (so $p = -2r$ and $q = r^2$):
$$y'' + py' + qy = (2r + r^2x)e^{rx} + p(1 + rx)e^{rx} + qxe^{rx}$$
$$= e^{rx}[(2r + r^2x) + p(1 + rx) + qx]$$
$$= e^{rx}[2r + p + (r^2 + pr + q)x]$$

Since $r^2 + pr + q = 0$ (characteristic equation) and $p = -2r$ (repeated root condition):
$$= e^{rx}[2r - 2r + 0 \cdot x] = 0$$

Thus $y = xe^{rx}$ is indeed a solution.

### Case 3: Complex Conjugate Roots

When $b^2 - 4ac < 0$, the characteristic equation has complex conjugate roots:
$$r = \alpha \pm i\beta$$

where:
$$\alpha = -\frac{b}{2a}, \quad \beta = \frac{\sqrt{4ac - b^2}}{2a}$$

**General solution**:
$$y = e^{\alpha x}(c_1\cos\beta x + c_2\sin\beta x)$$

**Alternative form** (amplitude-phase):
$$y = Ae^{\alpha x}\cos(\beta x - \phi)$$

where $A = \sqrt{c_1^2 + c_2^2}$ and $\tan\phi = c_2/c_1$.

**Behavior**: Oscillations with exponentially changing amplitude.

- $\alpha < 0$: Decaying oscillations (underdamped)
- $\alpha = 0$: Constant amplitude oscillations (simple harmonic motion)
- $\alpha > 0$: Growing oscillations (unstable)

**Frequency and period**:
- Angular frequency: $\omega = \beta$
- Period: $T = \frac{2\pi}{\beta}$

**Example 5**: Solve $y'' + 4y' + 20y = 0$.

Characteristic equation: $r^2 + 4r + 20 = 0$

Discriminant: $\Delta = 16 - 80 = -64 < 0$

Roots:
$$r = \frac{-4 \pm \sqrt{-64}}{2} = \frac{-4 \pm 8i}{2} = -2 \pm 4i$$

So $\alpha = -2$, $\beta = 4$.

General solution:
$$y = e^{-2x}(c_1\cos 4x + c_2\sin 4x)$$

This represents oscillations with period $T = 2\pi/4 = \pi/2$ and exponentially decaying amplitude.

**Example 6**: Convert to amplitude-phase form.

Given $y = e^{-2x}(3\cos 4x + 4\sin 4x)$, find $A$ and $\phi$.

$$A = \sqrt{3^2 + 4^2} = \sqrt{9 + 16} = 5$$
$$\tan\phi = \frac{4}{3} \Rightarrow \phi = \arctan(4/3) \approx 0.927 \text{ radians}$$

Therefore:
$$y = 5e^{-2x}\cos(4x - 0.927)$$

**Example 7**: Pure oscillations.

Solve $y'' + 16y = 0$.

Characteristic equation: $r^2 + 16 = 0$

Roots: $r = \pm 4i$ (purely imaginary: $\alpha = 0$, $\beta = 4$)

General solution:
$$y = c_1\cos 4x + c_2\sin 4x$$

This represents simple harmonic motion with angular frequency $\omega = 4$ and period $T = \pi/2$.

## Factored vs Quadratic Formula

The characteristic equation can be solved by factoring (when possible) or using the quadratic formula.

**Quadratic formula**:
$$r = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

**Discriminant** $\Delta = b^2 - 4ac$ determines the case:
- $\Delta > 0$: Two distinct real roots
- $\Delta = 0$: Repeated real root
- $\Delta < 0$: Complex conjugate roots

**Example 8**: Classify without solving.

For $y'' + 3y' + 7y = 0$:
$$\Delta = 9 - 28 = -19 < 0 \Rightarrow \text{complex roots}$$

For $y'' - 4y' + 4y = 0$:
$$\Delta = 16 - 16 = 0 \Rightarrow \text{repeated root}$$

For $y'' - 3y' + 2y = 0$:
$$\Delta = 9 - 8 = 1 > 0 \Rightarrow \text{distinct real roots}$$

## Connection to Euler's Formula

Complex roots lead to complex exponential solutions:
$$y = c_1e^{(\alpha + i\beta)x} + c_2e^{(\alpha - i\beta)x}$$

Using Euler's formula $e^{i\theta} = \cos\theta + i\sin\theta$:
$$e^{(\alpha \pm i\beta)x} = e^{\alpha x}e^{\pm i\beta x} = e^{\alpha x}(\cos\beta x \pm i\sin\beta x)$$

Taking linear combinations to extract real and imaginary parts:
$$\frac{1}{2}[e^{(\alpha + i\beta)x} + e^{(\alpha - i\beta)x}] = e^{\alpha x}\cos\beta x$$
$$\frac{1}{2i}[e^{(\alpha + i\beta)x} - e^{(\alpha - i\beta)x}] = e^{\alpha x}\sin\beta x$$

These real functions form the basis for the general solution.

## Special Cases and Patterns

### No damping, no forcing ($p = 0, q > 0$)

$$y'' + \omega^2y = 0$$

Characteristic equation: $r^2 + \omega^2 = 0$, roots $r = \pm i\omega$

Solution: $y = c_1\cos\omega x + c_2\sin\omega x$ (simple harmonic motion)

### Critical damping

For $y'' + py' + qy = 0$ to have a repeated root:
$$\Delta = p^2 - 4q = 0 \Rightarrow p^2 = 4q$$

This is the boundary between oscillatory and non-oscillatory behavior.

### Zero root

If $r = 0$ is a root, then $c = 0$ in the original equation:
$$ay'' + by' = 0$$

This can be solved directly as a first-order equation for $y'$.

**Example 9**: Solve $y'' - 3y' = 0$.

Characteristic equation: $r^2 - 3r = r(r - 3) = 0$

Roots: $r_1 = 0$, $r_2 = 3$

General solution:
$$y = c_1e^{0 \cdot x} + c_2e^{3x} = c_1 + c_2e^{3x}$$

## Summary Table

| Characteristic Equation | Roots | General Solution |
|-------------------------|-------|------------------|
| $ar^2 + br + c = 0$ | $r_1 \neq r_2$ (real) | $c_1e^{r_1x} + c_2e^{r_2x}$ |
| $ar^2 + br + c = 0$ | $r$ (repeated) | $(c_1 + c_2x)e^{rx}$ |
| $ar^2 + br + c = 0$ | $\alpha \pm i\beta$ | $e^{\alpha x}(c_1\cos\beta x + c_2\sin\beta x)$ |

## Applications

**Spring-mass system**: $m\frac{d^2x}{dt^2} + c\frac{dx}{dt} + kx = 0$

Characteristic equation: $mr^2 + cr + k = 0$

Discriminant: $\Delta = c^2 - 4mk$

- **Overdamped** ($c^2 > 4mk$): Distinct real roots, no oscillation
- **Critically damped** ($c^2 = 4mk$): Repeated root, fastest return to equilibrium
- **Underdamped** ($c^2 < 4mk$): Complex roots, damped oscillation

## Conclusion

The characteristic equation method provides a complete, systematic solution procedure for second-order linear homogeneous equations with constant coefficients. By reducing a differential equation to an algebraic equation, it makes these equations among the most accessible in the theory of ODEs. Understanding the relationship between the discriminant and the qualitative behavior of solutions—exponential growth/decay, critical damping, oscillations—is essential for applications in physics, engineering, and applied mathematics. The three cases exhaustively cover all possibilities and provide explicit formulas for every solution.
