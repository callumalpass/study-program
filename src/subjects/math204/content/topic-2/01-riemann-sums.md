# Riemann Sums and the Definite Integral

The definite integral represents the total accumulation of a quantity over an interval, such as distance traveled given velocity, or area under a curve. Unlike indefinite integrals (which produce antiderivatives), definite integrals yield numerical values. The foundation of definite integration lies in the concept of approximating areas using rectangles, formalized through Riemann sums.

## Motivation: The Area Problem

Consider the problem of finding the area under the curve $f(x) = x^2$ from $x = 0$ to $x = 2$. Unlike simple geometric shapes, this curved region doesn't have an obvious formula. However, we can approximate the area by dividing the interval into rectangles and summing their areas.

The key insight: as we use more rectangles (making them narrower), our approximation improves. The definite integral is the limit of these approximations as the number of rectangles approaches infinity.

## Partitions and Riemann Sums

A **partition** of the interval $[a, b]$ divides it into $n$ subintervals. For simplicity, we typically use **regular partitions** where all subintervals have equal width:

$$\Delta x = \frac{b - a}{n}$$

The partition points are:
$$x_0 = a, \quad x_1 = a + \Delta x, \quad x_2 = a + 2\Delta x, \quad \ldots, \quad x_n = b$$

For each subinterval $[x_{i-1}, x_i]$, we form a rectangle with width $\Delta x$ and height determined by the function value at some point in that subinterval. The choice of this point gives rise to different types of Riemann sums.

## Left Riemann Sum

In a **left Riemann sum**, the height of each rectangle is determined by the function value at the **left endpoint** of each subinterval.

$$L_n = \sum_{i=1}^{n} f(x_{i-1}) \cdot \Delta x$$

**Example:** Approximate $\int_0^2 x^2 \, dx$ using a left Riemann sum with $n = 4$ rectangles.

Here $\Delta x = \frac{2 - 0}{4} = 0.5$, and the partition points are $x_0 = 0, x_1 = 0.5, x_2 = 1, x_3 = 1.5, x_4 = 2$.

$$L_4 = f(0) \cdot 0.5 + f(0.5) \cdot 0.5 + f(1) \cdot 0.5 + f(1.5) \cdot 0.5$$
$$= 0 \cdot 0.5 + 0.25 \cdot 0.5 + 1 \cdot 0.5 + 2.25 \cdot 0.5$$
$$= 0 + 0.125 + 0.5 + 1.125 = 1.75$$

For an increasing function like $f(x) = x^2$, the left Riemann sum **underestimates** the true area.

## Right Riemann Sum

In a **right Riemann sum**, the height of each rectangle is determined by the function value at the **right endpoint** of each subinterval.

$$R_n = \sum_{i=1}^{n} f(x_i) \cdot \Delta x$$

**Continuing the example:** For $\int_0^2 x^2 \, dx$ with $n = 4$:

$$R_4 = f(0.5) \cdot 0.5 + f(1) \cdot 0.5 + f(1.5) \cdot 0.5 + f(2) \cdot 0.5$$
$$= 0.25 \cdot 0.5 + 1 \cdot 0.5 + 2.25 \cdot 0.5 + 4 \cdot 0.5$$
$$= 0.125 + 0.5 + 1.125 + 2 = 3.75$$

For an increasing function, the right Riemann sum **overestimates** the true area.

## Midpoint Riemann Sum

In a **midpoint Riemann sum**, the height of each rectangle is determined by the function value at the **midpoint** of each subinterval.

$$M_n = \sum_{i=1}^{n} f\left(\frac{x_{i-1} + x_i}{2}\right) \cdot \Delta x$$

**Continuing the example:** The midpoints are $0.25, 0.75, 1.25, 1.75$:

$$M_4 = f(0.25) \cdot 0.5 + f(0.75) \cdot 0.5 + f(1.25) \cdot 0.5 + f(1.75) \cdot 0.5$$
$$= 0.0625 \cdot 0.5 + 0.5625 \cdot 0.5 + 1.5625 \cdot 0.5 + 3.0625 \cdot 0.5$$
$$= 0.03125 + 0.28125 + 0.78125 + 1.53125 = 2.625$$

The midpoint sum often provides a better approximation than left or right sums for the same value of $n$. The exact value of this integral is $\frac{8}{3} \approx 2.667$, so $M_4 = 2.625$ is quite close!

## The Definite Integral

As we increase the number of rectangles ($n \to \infty$), the width of each rectangle approaches zero ($\Delta x \to 0$), and the Riemann sum approaches a limit. This limit, when it exists, is called the **definite integral** of $f$ from $a$ to $b$:

$$\int_a^b f(x) \, dx = \lim_{n \to \infty} \sum_{i=1}^{n} f(x_i^*) \cdot \Delta x$$

where $x_i^*$ is any point in the $i$-th subinterval. The notation $\int_a^b f(x) \, dx$ is read as "the integral from $a$ to $b$ of $f(x)$ with respect to $x$."

**Components of the notation:**
- $\int$ is the integral sign (an elongated S, for "sum")
- $a$ is the **lower limit** of integration
- $b$ is the **upper limit** of integration
- $f(x)$ is the **integrand** (the function being integrated)
- $dx$ indicates the variable of integration

## Properties of Riemann Sums

For a function $f$ that is continuous on $[a, b]$:

1. **All Riemann sums converge to the same value:** Whether you use left, right, midpoint, or any other choice of sample points, the limit as $n \to \infty$ is the same.

2. **Increasing vs. Decreasing functions:**
   - If $f$ is increasing: $L_n \leq \int_a^b f(x) \, dx \leq R_n$
   - If $f$ is decreasing: $R_n \leq \int_a^b f(x) \, dx \leq L_n$

3. **Error bounds:** The difference between a Riemann sum and the true integral decreases as $n$ increases. For well-behaved functions, the error typically decreases like $\frac{1}{n}$.

## Worked Example: Computing an Integral Using the Limit Definition

Find $\int_1^4 (2x + 1) \, dx$ using the definition of the definite integral.

**Solution:**

We use a right Riemann sum with $n$ rectangles.

$$\Delta x = \frac{4 - 1}{n} = \frac{3}{n}$$

The right endpoints are:
$$x_i = 1 + i \cdot \Delta x = 1 + \frac{3i}{n}$$

The right Riemann sum is:
$$R_n = \sum_{i=1}^{n} f(x_i) \cdot \Delta x = \sum_{i=1}^{n} \left(2\left(1 + \frac{3i}{n}\right) + 1\right) \cdot \frac{3}{n}$$

$$= \sum_{i=1}^{n} \left(2 + \frac{6i}{n} + 1\right) \cdot \frac{3}{n} = \sum_{i=1}^{n} \left(3 + \frac{6i}{n}\right) \cdot \frac{3}{n}$$

$$= \sum_{i=1}^{n} \left(\frac{9}{n} + \frac{18i}{n^2}\right) = \frac{9}{n} \sum_{i=1}^{n} 1 + \frac{18}{n^2} \sum_{i=1}^{n} i$$

Using the formulas $\sum_{i=1}^{n} 1 = n$ and $\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$:

$$R_n = \frac{9}{n} \cdot n + \frac{18}{n^2} \cdot \frac{n(n+1)}{2} = 9 + \frac{9(n+1)}{n} = 9 + 9\left(1 + \frac{1}{n}\right)$$

$$= 18 + \frac{9}{n}$$

Taking the limit:
$$\int_1^4 (2x + 1) \, dx = \lim_{n \to \infty} R_n = \lim_{n \to \infty} \left(18 + \frac{9}{n}\right) = 18$$

## Geometric Interpretation

The definite integral $\int_a^b f(x) \, dx$ represents the **signed area** between the curve $y = f(x)$ and the $x$-axis from $x = a$ to $x = b$:

- Area above the $x$-axis contributes positively
- Area below the $x$-axis contributes negatively

For example, if $f(x) = \sin(x)$, then $\int_0^{2\pi} \sin(x) \, dx = 0$ because the positive area from $0$ to $\pi$ exactly cancels the negative area from $\pi$ to $2\pi$.

## Summary

- **Riemann sums** approximate the area under a curve using rectangles
- **Left sums** use left endpoints: $L_n = \sum_{i=1}^{n} f(x_{i-1}) \Delta x$
- **Right sums** use right endpoints: $R_n = \sum_{i=1}^{n} f(x_i) \Delta x$
- **Midpoint sums** use midpoints: $M_n = \sum_{i=1}^{n} f\left(\frac{x_{i-1} + x_i}{2}\right) \Delta x$
- The **definite integral** is the limit: $\int_a^b f(x) \, dx = \lim_{n \to \infty} \text{(Riemann sum)}$
- The definite integral represents **signed area** under a curve
- Computing integrals directly from the limit definition is tedious—the Fundamental Theorem of Calculus provides a much easier method
