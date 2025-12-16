# Iterated Integrals

## Introduction

While the definition of double integrals via Riemann sums is conceptually important, it is not practical for computation. Iterated integrals provide a powerful method for evaluating double integrals by reducing them to successive single-variable integrations. This approach transforms a two-dimensional integration problem into two one-dimensional problems that can be solved using familiar techniques from single-variable calculus.

## Definition of Iterated Integrals

An **iterated integral** is an integral evaluated in stages, where we integrate with respect to one variable at a time, treating the other variables as constants.

For a function $f(x, y)$ defined on a rectangle $R = [a, b] \times [c, d]$, there are two possible iterated integrals:

### Integrating First with Respect to $y$, Then $x$

$$\int_a^b \left[\int_c^d f(x, y) \, dy\right] dx$$

The computation proceeds in two steps:
1. **Inner integral**: For each fixed $x$ in $[a, b]$, integrate $f(x, y)$ with respect to $y$ from $c$ to $d$. This produces a function of $x$.
2. **Outer integral**: Integrate the resulting function with respect to $x$ from $a$ to $b$.

### Integrating First with Respect to $x$, Then $y$

$$\int_c^d \left[\int_a^b f(x, y) \, dx\right] dy$$

The computation proceeds as:
1. **Inner integral**: For each fixed $y$ in $[c, d]$, integrate $f(x, y)$ with respect to $x$ from $a$ to $b$.
2. **Outer integral**: Integrate the resulting function with respect to $y$ from $c$ to $d$.

## Fubini's Theorem

The fundamental theorem connecting double integrals and iterated integrals is Fubini's theorem, named after the Italian mathematician Guido Fubini.

**Theorem (Fubini's Theorem for Rectangles):** If $f(x, y)$ is continuous on the rectangle $R = [a, b] \times [c, d]$, then:

$$\iint_R f(x, y) \, dA = \int_a^b \int_c^d f(x, y) \, dy \, dx = \int_c^d \int_a^b f(x, y) \, dx \, dy$$

This remarkable theorem tells us three things:
1. The double integral can be evaluated as an iterated integral
2. Both orders of integration give the same result
3. We can choose whichever order is more convenient for computation

### Conditions for Fubini's Theorem

Fubini's theorem holds under more general conditions than continuity:
- If $f$ is continuous on $R$, the theorem applies
- If $f$ is bounded on $R$ and discontinuous only on a finite number of smooth curves, the theorem still applies
- If $\iint_R |f(x, y)| \, dA$ exists and is finite, the theorem applies

## Computing Iterated Integrals

### Example 1: Polynomial Function

Evaluate $\iint_R (6x^2y - 2x) \, dA$ where $R = [1, 3] \times [0, 2]$.

**Solution (integrating $y$ first):**

$$\int_1^3 \int_0^2 (6x^2y - 2x) \, dy \, dx$$

Inner integral (treat $x$ as constant):
$$\int_0^2 (6x^2y - 2x) \, dy = \left[3x^2y^2 - 2xy\right]_0^2 = 3x^2(4) - 2x(2) = 12x^2 - 4x$$

Outer integral:
$$\int_1^3 (12x^2 - 4x) \, dx = \left[4x^3 - 2x^2\right]_1^3 = (108 - 18) - (4 - 2) = 90 - 2 = 88$$

**Verification (integrating $x$ first):**

$$\int_0^2 \int_1^3 (6x^2y - 2x) \, dx \, dy$$

Inner integral:
$$\int_1^3 (6x^2y - 2x) \, dx = \left[2x^3y - x^2\right]_1^3 = (54y - 9) - (2y - 1) = 52y - 8$$

Outer integral:
$$\int_0^2 (52y - 8) \, dy = \left[26y^2 - 8y\right]_0^2 = 104 - 16 = 88$$

Both orders give the same answer, confirming Fubini's theorem.

### Example 2: Exponential Function

Evaluate $\iint_R xe^{xy} \, dA$ where $R = [0, 1] \times [0, 1]$.

**Solution (integrating $y$ first):**

$$\int_0^1 \int_0^1 xe^{xy} \, dy \, dx$$

Inner integral (use substitution $u = xy$, so $du = x \, dy$):
$$\int_0^1 xe^{xy} \, dy = [e^{xy}]_0^1 = e^x - 1$$

Outer integral:
$$\int_0^1 (e^x - 1) \, dx = [e^x - x]_0^1 = (e - 1) - (1 - 0) = e - 2$$

**Attempting the other order:**

$$\int_0^1 \int_0^1 xe^{xy} \, dx \, dy$$

The inner integral $\int_0^1 xe^{xy} \, dx$ is more difficult (requires integration by parts with $y$ as a parameter). This example illustrates that while both orders are theoretically equivalent, one may be computationally easier.

### Example 3: Trigonometric Function

Evaluate $\iint_R \cos(x + y) \, dA$ where $R = [0, \pi] \times [0, \pi/2]$.

**Solution (integrating $y$ first):**

$$\int_0^\pi \int_0^{\pi/2} \cos(x + y) \, dy \, dx$$

Inner integral:
$$\int_0^{\pi/2} \cos(x + y) \, dy = [\sin(x + y)]_0^{\pi/2} = \sin(x + \pi/2) - \sin(x) = \cos(x) - \sin(x)$$

Outer integral:
$$\int_0^\pi (\cos(x) - \sin(x)) \, dx = [\sin(x) + \cos(x)]_0^\pi = (-1) - (1) = -2$$

## Order of Integration

### When to Choose Which Order

The choice of integration order can significantly affect the difficulty of computation. Consider these guidelines:

1. **Simplicity of antiderivatives**: Choose the order that produces simpler antiderivatives in the inner integral.

2. **Separable functions**: If $f(x, y) = g(x)h(y)$, the integral factors completely:
   $$\iint_R g(x)h(y) \, dA = \int_a^b g(x) \, dx \cdot \int_c^d h(y) \, dy$$

3. **Functions of one variable**: If $f(x, y) = g(x)$, integrate with respect to $y$ first:
   $$\int_a^b \int_c^d g(x) \, dy \, dx = \int_a^b g(x)(d - c) \, dx$$

### Example 4: Separable Function

Evaluate $\iint_R x^2 \sin(y) \, dA$ where $R = [0, 2] \times [0, \pi]$.

Since the function factors as $f(x, y) = x^2 \cdot \sin(y)$:

$$\iint_R x^2 \sin(y) \, dA = \left[\int_0^2 x^2 \, dx\right] \cdot \left[\int_0^\pi \sin(y) \, dy\right]$$

$$= \left[\frac{x^3}{3}\right]_0^2 \cdot [-\cos(y)]_0^\pi = \frac{8}{3} \cdot (1 - (-1)) = \frac{16}{3}$$

## Notation Variations

Several notational conventions are used for iterated integrals:

1. With brackets: $\int_a^b \left[\int_c^d f(x, y) \, dy\right] dx$
2. Without brackets: $\int_a^b \int_c^d f(x, y) \, dy \, dx$
3. Abbreviated: $\int_a^b dx \int_c^d dy \, f(x, y)$

The second form is most common, with the understanding that integration proceeds from the inside out (right to left in the differential notation).

## Applications

### Average Value

The average value of $f(x, y)$ over a rectangle $R$ is:

$$f_{\text{avg}} = \frac{1}{\text{Area}(R)} \iint_R f(x, y) \, dA = \frac{1}{(b-a)(d-c)} \int_a^b \int_c^d f(x, y) \, dy \, dx$$

### Example 5: Average Temperature

If $T(x, y) = 100 - x^2 - y^2$ represents temperature over the rectangular plate $R = [0, 3] \times [0, 4]$, find the average temperature.

$$T_{\text{avg}} = \frac{1}{12} \int_0^3 \int_0^4 (100 - x^2 - y^2) \, dy \, dx$$

Inner integral:
$$\int_0^4 (100 - x^2 - y^2) \, dy = \left[100y - x^2y - \frac{y^3}{3}\right]_0^4 = 400 - 4x^2 - \frac{64}{3}$$

Outer integral:
$$\int_0^3 \left(400 - 4x^2 - \frac{64}{3}\right) dx = \left[400x - \frac{4x^3}{3} - \frac{64x}{3}\right]_0^3 = 1200 - 36 - 64 = 1100$$

Average temperature: $T_{\text{avg}} = \frac{1100}{12} = \frac{275}{3} \approx 91.67$ degrees.

## Conclusion

Iterated integrals, combined with Fubini's theorem, provide the primary computational tool for evaluating double integrals over rectangular regions. The ability to choose the order of integration offers flexibility in simplifying calculations. In the next section, we extend these techniques to non-rectangular regions, which requires more careful specification of the limits of integration.
