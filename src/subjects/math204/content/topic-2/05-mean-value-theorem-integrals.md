# Mean Value Theorem for Integrals

The Mean Value Theorem for Integrals is a fundamental result that connects average values of functions to specific function values. It guarantees that for continuous functions, there exists at least one point where the function equals its average value over an interval. This theorem has important applications in physics, probability, and numerical analysis.

## Average Value of a Function

In elementary mathematics, we compute the average of a finite list of numbers by summing them and dividing by the count. For a continuous function over an interval, we need a continuous analog of this process.

### Discrete Average

For $n$ values $y_1, y_2, \ldots, y_n$, the average is:
$$\text{Average} = \frac{y_1 + y_2 + \cdots + y_n}{n} = \frac{1}{n}\sum_{i=1}^n y_i$$

### Continuous Average

For a function $f(x)$ on $[a, b]$, we can approximate the average using a Riemann sum with $n$ sample points:
$$\text{Average} \approx \frac{1}{n}\sum_{i=1}^n f(x_i) = \frac{1}{n}\sum_{i=1}^n f(x_i) \cdot \frac{b-a}{b-a} = \frac{1}{b-a} \sum_{i=1}^n f(x_i) \cdot \Delta x$$

where $\Delta x = \frac{b-a}{n}$.

As $n \to \infty$, this becomes:
$$\text{Average} = \frac{1}{b-a} \int_a^b f(x) \, dx$$

### Definition: Average Value

The **average value** of a continuous function $f$ on $[a, b]$ is:
$$f_{\text{avg}} = \frac{1}{b-a} \int_a^b f(x) \, dx$$

**Geometric interpretation:** The average value is the height of the rectangle with base $[a, b]$ that has the same area as the region under the curve $f$.

$$f_{\text{avg}} \cdot (b - a) = \int_a^b f(x) \, dx$$

## Examples of Average Value

**Example 1:** Find the average value of $f(x) = x^2$ on $[0, 3]$.

$$f_{\text{avg}} = \frac{1}{3 - 0} \int_0^3 x^2 \, dx = \frac{1}{3} \left[ \frac{x^3}{3} \right]_0^3 = \frac{1}{3} \cdot \frac{27}{3} = \frac{1}{3} \cdot 9 = 3$$

**Verification:** The function $f(x) = x^2$ ranges from 0 to 9 on this interval, and the average of 3 seems reasonable.

**Example 2:** Find the average value of $f(x) = \sin(x)$ on $[0, \pi]$.

$$f_{\text{avg}} = \frac{1}{\pi - 0} \int_0^\pi \sin(x) \, dx = \frac{1}{\pi} \left[ -\cos(x) \right]_0^\pi$$
$$= \frac{1}{\pi}[-\cos(\pi) + \cos(0)] = \frac{1}{\pi}[1 + 1] = \frac{2}{\pi}$$

**Example 3:** Find the average temperature over a 24-hour period if the temperature is given by:
$$T(t) = 60 + 15\sin\left(\frac{\pi t}{12}\right)$$
where $t$ is hours after midnight.

$$T_{\text{avg}} = \frac{1}{24 - 0} \int_0^{24} \left[60 + 15\sin\left(\frac{\pi t}{12}\right)\right] dt$$

$$= \frac{1}{24} \left[ 60t - 15 \cdot \frac{12}{\pi}\cos\left(\frac{\pi t}{12}\right) \right]_0^{24}$$

$$= \frac{1}{24} \left[ \left(1440 - \frac{180}{\pi}\cos(2\pi)\right) - \left(0 - \frac{180}{\pi}\cos(0)\right) \right]$$

$$= \frac{1}{24} \left[ 1440 - \frac{180}{\pi} + \frac{180}{\pi} \right] = \frac{1440}{24} = 60$$

The sine term averages to zero over a complete period, leaving the constant term.

## The Mean Value Theorem for Integrals

**Mean Value Theorem for Integrals (MVT for Integrals):**

If $f$ is continuous on $[a, b]$, then there exists a number $c$ in $[a, b]$ such that:
$$\int_a^b f(x) \, dx = f(c) \cdot (b - a)$$

Equivalently:
$$f(c) = \frac{1}{b-a} \int_a^b f(x) \, dx = f_{\text{avg}}$$

**In words:** There exists at least one point $c$ where the function value $f(c)$ equals the average value of the function over the interval.

### Geometric Interpretation

The MVT for Integrals says that there is a rectangle with base $[a, b]$ and height $f(c)$ whose area exactly equals the area under the curve. The point $c$ is where the function "crosses" its average value.

### Proof Sketch

By the Extreme Value Theorem, $f$ attains a minimum value $m$ and maximum value $M$ on $[a, b]$.

For all $x$ in $[a, b]$: $m \leq f(x) \leq M$

Integrating:
$$m(b-a) \leq \int_a^b f(x) \, dx \leq M(b-a)$$

Dividing by $(b-a)$:
$$m \leq \frac{1}{b-a}\int_a^b f(x) \, dx \leq M$$

So $f_{\text{avg}}$ lies between the minimum and maximum values of $f$. By the Intermediate Value Theorem, since $f$ is continuous, $f$ must attain every value between $m$ and $M$, including $f_{\text{avg}}$. Therefore, there exists $c$ such that $f(c) = f_{\text{avg}}$.

## Finding the Point $c$

The MVT for Integrals guarantees existence of $c$, but doesn't tell us how to find it. We must solve the equation:
$$f(c) = f_{\text{avg}}$$

**Example 4:** Find all values of $c$ guaranteed by the MVT for Integrals for $f(x) = x^2$ on $[0, 3]$.

From Example 1, we know $f_{\text{avg}} = 3$.

We need to solve:
$$f(c) = 3$$
$$c^2 = 3$$
$$c = \pm\sqrt{3}$$

Since $c$ must be in $[0, 3]$, we have $c = \sqrt{3} \approx 1.732$.

**Example 5:** Find the value of $c$ for $f(x) = \cos(x)$ on $[0, \pi/2]$.

First, find the average value:
$$f_{\text{avg}} = \frac{1}{\pi/2 - 0} \int_0^{\pi/2} \cos(x) \, dx = \frac{2}{\pi} \left[ \sin(x) \right]_0^{\pi/2} = \frac{2}{\pi}[1 - 0] = \frac{2}{\pi}$$

Now solve $\cos(c) = \frac{2}{\pi}$:
$$c = \arccos\left(\frac{2}{\pi}\right) \approx 0.881 \text{ radians}$$

Indeed, $0.881 \in [0, \pi/2]$, so this is our value of $c$.

## Applications

### Physics: Average Velocity

If $v(t)$ is the velocity of an object, the average velocity over $[a, b]$ is:
$$v_{\text{avg}} = \frac{1}{b-a} \int_a^b v(t) \, dt = \frac{s(b) - s(a)}{b - a}$$

This is the total displacement divided by time—exactly what we expect for average velocity.

The MVT for Integrals guarantees that at some moment $t = c$, the instantaneous velocity equals the average velocity.

**Example 6:** A car's velocity is $v(t) = t^2 - 4t + 5$ m/s for $t \in [0, 4]$ seconds. Find the average velocity and when the instantaneous velocity equals the average.

Average velocity:
$$v_{\text{avg}} = \frac{1}{4-0} \int_0^4 (t^2 - 4t + 5) \, dt = \frac{1}{4} \left[ \frac{t^3}{3} - 2t^2 + 5t \right]_0^4$$
$$= \frac{1}{4} \left[ \frac{64}{3} - 32 + 20 \right] = \frac{1}{4} \cdot \frac{64 - 96 + 60}{3} = \frac{1}{4} \cdot \frac{28}{3} = \frac{7}{3} \text{ m/s}$$

Find $c$ such that $v(c) = \frac{7}{3}$:
$$c^2 - 4c + 5 = \frac{7}{3}$$
$$c^2 - 4c + 5 - \frac{7}{3} = 0$$
$$c^2 - 4c + \frac{8}{3} = 0$$
$$3c^2 - 12c + 8 = 0$$

Using the quadratic formula:
$$c = \frac{12 \pm \sqrt{144 - 96}}{6} = \frac{12 \pm \sqrt{48}}{6} = \frac{12 \pm 4\sqrt{3}}{6} = 2 \pm \frac{2\sqrt{3}}{3}$$

Both solutions are in $[0, 4]$:
- $c_1 = 2 - \frac{2\sqrt{3}}{3} \approx 0.845$ seconds
- $c_2 = 2 + \frac{2\sqrt{3}}{3} \approx 3.155$ seconds

The car has the average velocity at two different moments.

### Probability: Expected Value

In probability, if $f(x)$ is a probability density function on $[a, b]$, then:
$$E[X] = \int_a^b x \cdot f(x) \, dx$$

The MVT for Integrals can be used to establish properties of expected values.

### Numerical Integration

The MVT for Integrals provides error bounds for numerical integration methods. If we approximate $\int_a^b f(x) \, dx$ by $f(c) \cdot (b-a)$ for some sample point $c$, the MVT tells us that there exists an optimal choice of $c$ that gives the exact answer.

## Summary

- The **average value** of $f$ on $[a, b]$ is: $f_{\text{avg}} = \frac{1}{b-a} \int_a^b f(x) \, dx$
- The **Mean Value Theorem for Integrals** states: there exists $c \in [a, b]$ such that $f(c) = f_{\text{avg}}$
- Equivalently: $\int_a^b f(x) \, dx = f(c) \cdot (b - a)$ for some $c$
- Geometrically: there is a rectangle with the same area as the region under the curve
- To find $c$: solve $f(c) = f_{\text{avg}}$
- Applications include average velocity, average temperature, and probability theory
- The MVT for Integrals is analogous to the MVT for Derivatives, connecting local and global properties
