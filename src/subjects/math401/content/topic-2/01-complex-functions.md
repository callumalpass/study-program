---
id: math401-topic-2-1
title: "Complex Functions"
order: 1
---

# Functions of a Complex Variable

Functions of a complex variable extend the concept of functions from real analysis to the complex plane. While superficially similar to functions $f: \mathbb{R}^2 \to \mathbb{R}^2$, complex functions possess unique properties that make complex analysis profoundly different—and more powerful—than multivariable real calculus.

## Definition and Basic Concepts

A **function of a complex variable** is a rule that assigns to each complex number $z$ in some set $D \subseteq \mathbb{C}$ a unique complex number $w = f(z)$.

$$f: D \to \mathbb{C}$$

where:
- $D$ is the **domain** of $f$
- The set $f(D) = \{f(z) : z \in D\}$ is the **range** or **image** of $f$
- $z = x + iy$ is the **independent variable**
- $w = u + iv = f(z)$ is the **dependent variable**

### Component Functions

Since both input and output are complex, we can write:

$$z = x + iy, \quad w = f(z) = u(x, y) + iv(x, y)$$

where $u$ and $v$ are real-valued functions of two real variables:

$$u(x, y) = \text{Re}(f(z)), \quad v(x, y) = \text{Im}(f(z))$$

The functions $u$ and $v$ are called the **component functions** or **real and imaginary parts** of $f$.

**Example**: For $f(z) = z^2$, we have:
$$f(x + iy) = (x + iy)^2 = x^2 - y^2 + 2xyi$$

So $u(x, y) = x^2 - y^2$ and $v(x, y) = 2xy$.

## Visualization Challenges

Unlike real functions $f: \mathbb{R} \to \mathbb{R}$ (which can be graphed in 2D), complex functions $f: \mathbb{C} \to \mathbb{C}$ would require 4 dimensions to graph fully (2 for input, 2 for output).

### Alternative Visualizations

1. **Domain coloring**: Assign colors to complex values, then color the domain based on the function value
2. **Level curves**: Plot curves where $u$ or $v$ is constant
3. **Vector fields**: At each $z$, draw a vector representing $f(z)$
4. **Separate plots**: Plot $u(x, y)$ and $v(x, y)$ as surfaces in 3D
5. **Mapping diagrams**: Show how regions in the domain map to regions in the range

## Elementary Examples

### Polynomial Functions

**Linear function**: $f(z) = az + b$ where $a, b \in \mathbb{C}$

If $a = \alpha + i\beta$ and $z = x + iy$:
$$f(z) = (\alpha + i\beta)(x + iy) + b$$
$$= (\alpha x - \beta y) + i(\beta x + \alpha y) + b$$

This represents a rotation, scaling, and translation.

**Quadratic**: $f(z) = z^2$
$$u(x, y) = x^2 - y^2, \quad v(x, y) = 2xy$$

Maps circles to parabolas, angles at origin are doubled.

**General polynomial**: $f(z) = a_n z^n + a_{n-1}z^{n-1} + \cdots + a_1 z + a_0$

where $a_0, \ldots, a_n \in \mathbb{C}$ with $a_n \neq 0$.

### Rational Functions

$$f(z) = \frac{P(z)}{Q(z)}$$

where $P$ and $Q$ are polynomials with no common factors. Defined for all $z$ except zeros of $Q$.

**Example**: $f(z) = \frac{1}{z}$

For $z = x + iy \neq 0$:
$$f(z) = \frac{1}{x + iy} = \frac{x - iy}{x^2 + y^2}$$

So $u(x, y) = \frac{x}{x^2 + y^2}$ and $v(x, y) = \frac{-y}{x^2 + y^2}$.

This function **inverts** circles: circles through the origin become lines, and vice versa.

### The Complex Exponential

The **complex exponential function** is defined by:

$$e^z = e^{x+iy} = e^x(\cos y + i\sin y) = e^x \cos y + ie^x \sin y$$

Component functions:
$$u(x, y) = e^x \cos y, \quad v(x, y) = e^x \sin y$$

**Properties**:
1. $e^{z_1 + z_2} = e^{z_1} e^{z_2}$ (fundamental exponential property)
2. $e^z \neq 0$ for all $z \in \mathbb{C}$
3. $|e^{iy}| = 1$ for $y \in \mathbb{R}$ (lies on unit circle)
4. $|e^z| = e^x = e^{\text{Re}(z)}$
5. $\arg(e^z) = y = \text{Im}(z)$ (mod $2\pi$)
6. Periodic: $e^{z + 2\pi i} = e^z$

The complex exponential is periodic with pure imaginary period $2\pi i$.

### Trigonometric Functions

Extending Euler's formula, we define:

$$\cos z = \frac{e^{iz} + e^{-iz}}{2}, \quad \sin z = \frac{e^{iz} - e^{-iz}}{2i}$$

These reduce to the usual definitions for real $z$.

**For general complex $z = x + iy$**:

$$\cos z = \cos x \cosh y - i\sin x \sinh y$$
$$\sin z = \sin x \cosh y + i\cos x \sinh y$$

where $\cosh$ and $\sinh$ are hyperbolic functions:
$$\cosh y = \frac{e^y + e^{-y}}{2}, \quad \sinh y = \frac{e^y - e^{-y}}{2}$$

**Key differences from real trigonometric functions**:
1. $|\sin z|$ and $|\cos z|$ can exceed 1
2. They are unbounded: $|\sin(iy)| = \sinh y \to \infty$ as $y \to \infty$
3. Zeros remain on the real axis: $\sin z = 0 \iff z = n\pi$, $\cos z = 0 \iff z = \frac{\pi}{2} + n\pi$

## Single-Valued vs. Multi-Valued Functions

### The Complex Logarithm

For $z \neq 0$, we seek $w$ such that $e^w = z$. Writing $z = re^{i\theta}$ and $w = u + iv$:

$$e^{u+iv} = re^{i\theta}$$

This gives $e^u = r$ and $v = \theta + 2\pi k$ for integer $k$.

Thus $u = \ln r$ (real logarithm) and $v = \theta + 2\pi k$.

The **complex logarithm** is:
$$\log z = \ln|z| + i\arg(z)$$

But since $\arg(z)$ is multi-valued (defined mod $2\pi$), $\log z$ is **multi-valued**.

**Principal value**: $\text{Log } z = \ln|z| + i\text{Arg}(z)$ where $\text{Arg}(z) \in (-\pi, \pi]$.

**Example**: $\log(i)$
- $|i| = 1$, so $\ln|i| = 0$
- $\arg(i) = \frac{\pi}{2} + 2\pi k$
- $\log(i) = i\left(\frac{\pi}{2} + 2\pi k\right)$ for integer $k$
- $\text{Log}(i) = i\frac{\pi}{2}$ (principal value)

### The Square Root Function

$\sqrt{z}$ is defined by $w^2 = z$. For $z = re^{i\theta}$:

$$\sqrt{z} = \pm\sqrt{r} e^{i\theta/2}$$

This is **double-valued**.

**Example**: $\sqrt{1}$
- Obvious: $\pm 1$
- From polar form: $1 = e^{i \cdot 0}$ or $1 = e^{i \cdot 2\pi}$
- $\sqrt{1} = e^{i \cdot 0} = 1$ or $\sqrt{1} = e^{i\pi} = -1$

For single-valuedness, we typically choose the **principal square root** with argument in $(-\pi/2, \pi/2]$.

### Branch Cuts and Branches

To make multi-valued functions single-valued, we introduce **branch cuts**—curves in the plane where we "cut" to prevent circling around critical points.

For $\log z$, a common branch cut is the negative real axis. The **principal branch** is:
$$\text{Log } z = \ln|z| + i\theta, \quad \theta \in (-\pi, \pi)$$

This is discontinuous across the negative real axis.

## Transformations and Mappings

Complex functions can be viewed as **mappings** or **transformations** of the complex plane.

### Linear Transformations

$f(z) = az + b$ performs:
1. Rotation by $\arg(a)$
2. Scaling by $|a|$
3. Translation by $b$

**Example**: $f(z) = iz$ rotates by $90°$ counterclockwise.

**Example**: $f(z) = 2z + (3 + i)$ scales by 2, then translates by $3 + i$.

### The Mapping $w = z^2$

$$f(z) = z^2 = r^2 e^{2i\theta}$$

Effects:
1. Squares the modulus: $|w| = |z|^2$
2. Doubles the argument: $\arg(w) = 2\arg(z)$

**Consequences**:
- Circles $|z| = r_0$ map to circles $|w| = r_0^2$
- Rays $\arg(z) = \theta_0$ map to rays $\arg(w) = 2\theta_0$
- The right half-plane $\text{Re}(z) > 0$ maps to the full plane minus the negative real axis
- The first quadrant maps to the upper half-plane

### Inversion: $w = 1/z$

$$f(z) = \frac{1}{z} = \frac{1}{r}e^{-i\theta}$$

Effects:
1. Inverts the modulus: $|w| = 1/|z|$
2. Negates the argument: $\arg(w) = -\arg(z)$

**Mapping properties**:
- Circles centered at origin: $|z| = r$ maps to $|w| = 1/r$
- Lines through origin map to lines through origin
- Circles not through origin map to circles (not through origin)
- Lines not through origin map to circles through origin
- Preserves angles (conformal)

This transformation is called **inversion** or **reciprocation**.

## Comparison with Real Functions

### One Complex Equation = Two Real Equations

A single complex equation $f(z) = 0$ is equivalent to two real equations:
$$u(x, y) = 0, \quad v(x, y) = 0$$

This makes complex analysis more constrained than real analysis.

### Complex Differentiability is Stronger

A complex function $f$ is complex differentiable at $z_0$ if:

$$\lim_{h \to 0} \frac{f(z_0 + h) - f(z_0)}{h}$$

exists, where $h \in \mathbb{C}$ can approach 0 from any direction.

This is **much stronger** than partial differentiability in two variables. Complex differentiability implies:
1. All partial derivatives exist
2. Cauchy-Riemann equations hold
3. $f$ is infinitely differentiable
4. $f$ equals its Taylor series (analytic)

We'll explore this in subsequent sections.

### The Fundamental Theorem

In real analysis, differentiable functions can be quite wild (e.g., nowhere analytic).

In complex analysis, **differentiable implies analytic**. Every complex differentiable function is:
- Infinitely differentiable
- Represented by its Taylor series
- Determined by its values on any small open set
- Satisfying the maximum modulus principle

This remarkable rigidity is the hallmark of complex analysis.

## Algebraic Operations on Functions

Functions can be combined algebraically:

**Addition**: $(f + g)(z) = f(z) + g(z)$

**Multiplication**: $(fg)(z) = f(z)g(z)$

**Division**: $(f/g)(z) = f(z)/g(z)$ (where $g(z) \neq 0$)

**Composition**: $(f \circ g)(z) = f(g(z))$

These inherit properties from the component operations.

## Parameterized Families

Complex parameters can generate families of functions.

**Example**: The family $f_c(z) = z^2 + c$ for $c \in \mathbb{C}$.
- $c = 0$: The simple squaring map
- $c = -2$: Has attractive fixed point at $-1$
- $c = i$: Generates a Julia set

The Mandelbrot set consists of all $c$ for which the orbit of 0 under $f_c$ remains bounded.

## Extending Real Functions to Complex Variables

Many real functions extend naturally to complex variables:

1. **Polynomials and rational functions**: Direct extension
2. **Exponential**: $e^z$ as defined above
3. **Trigonometric**: via exponential
4. **Hyperbolic**: $\cosh z = \frac{e^z + e^{-z}}{2}$, $\sinh z = \frac{e^z - e^{-z}}{2}$
5. **Inverse trig**: $\arcsin z = -i\log(iz + \sqrt{1 - z^2})$ (multi-valued)

## Summary

- A **complex function** $f: D \subseteq \mathbb{C} \to \mathbb{C}$ assigns complex numbers to complex numbers
- Decomposition: $f(z) = u(x, y) + iv(x, y)$ where $u, v: \mathbb{R}^2 \to \mathbb{R}$
- **Elementary functions**: polynomials, rational functions, $e^z$, $\sin z$, $\cos z$
- $e^z = e^x(\cos y + i\sin y)$ with period $2\pi i$
- $\log z$ and $\sqrt{z}$ are multi-valued; branch cuts make them single-valued
- Complex functions act as **mappings** of the plane
- $f(z) = z^2$ doubles arguments and squares moduli
- $f(z) = 1/z$ inverts moduli and negates arguments
- Complex differentiability is far stronger than real differentiability
- Functions of a complex variable have unique properties not present in real or multivariable calculus
- Understanding these functions sets the stage for complex differentiation and integration
