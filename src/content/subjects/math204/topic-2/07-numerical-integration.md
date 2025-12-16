# Numerical Integration

While the Fundamental Theorem of Calculus provides an exact method for evaluating definite integrals when we can find antiderivatives, many important integrals cannot be evaluated in terms of elementary functions. Even simple-looking integrals like $\int e^{-x^2} dx$ or $\int \frac{\sin x}{x} dx$ have no elementary antiderivatives. In these cases, we turn to numerical methods to approximate integral values.

## The Need for Numerical Integration

**Examples of integrals requiring numerical methods:**
- $\int_0^1 e^{-x^2} dx$ (the error function, crucial in statistics)
- $\int_0^1 \frac{\sin x}{x} dx$ (the sine integral)
- $\int_0^1 \sqrt{1 + x^3} dx$ (arc length problems)
- Integrals involving data points from experiments (no formula available)

Numerical integration methods approximate $\int_a^b f(x) dx$ using weighted sums of function values at specific points. The three most common methods are the Trapezoidal Rule, Simpson's Rule, and basic Riemann sums.

## The Trapezoidal Rule

The **Trapezoidal Rule** approximates the region under a curve using trapezoids instead of rectangles. This generally gives better accuracy than Riemann sums.

### Single Trapezoid

For a single trapezoid over $[a, b]$:
$$\int_a^b f(x) dx \approx \frac{b - a}{2} [f(a) + f(b)]$$

This is the area of a trapezoid with parallel sides $f(a)$ and $f(b)$ and width $b - a$.

**Geometric interpretation:** We connect the points $(a, f(a))$ and $(b, f(b))$ with a straight line and find the area under this line.

### Composite Trapezoidal Rule

For better accuracy, divide $[a, b]$ into $n$ subintervals of equal width $\Delta x = \frac{b-a}{n}$ with endpoints:
$$x_0 = a, \quad x_1 = a + \Delta x, \quad x_2 = a + 2\Delta x, \quad \ldots, \quad x_n = b$$

The **Trapezoidal Rule** with $n$ subintervals is:

$$T_n = \frac{\Delta x}{2} [f(x_0) + 2f(x_1) + 2f(x_2) + \cdots + 2f(x_{n-1}) + f(x_n)]$$

**Pattern:** The first and last function values have coefficient 1, and all interior values have coefficient 2.

**Example 1:** Approximate $\int_0^2 x^2 dx$ using the Trapezoidal Rule with $n = 4$.

We know the exact value is $\left[\frac{x^3}{3}\right]_0^2 = \frac{8}{3} \approx 2.667$.

Here $\Delta x = \frac{2 - 0}{4} = 0.5$, with points $x_0 = 0, x_1 = 0.5, x_2 = 1, x_3 = 1.5, x_4 = 2$.

$$T_4 = \frac{0.5}{2}[f(0) + 2f(0.5) + 2f(1) + 2f(1.5) + f(2)]$$
$$= 0.25[0 + 2(0.25) + 2(1) + 2(2.25) + 4]$$
$$= 0.25[0 + 0.5 + 2 + 4.5 + 4] = 0.25 \cdot 11 = 2.75$$

Error: $|2.75 - 2.667| = 0.083$, about 3% relative error.

**Example 2:** Approximate $\int_0^1 e^{-x^2} dx$ using $T_4$.

Here $\Delta x = 0.25$, with points $0, 0.25, 0.5, 0.75, 1$.

$$T_4 = \frac{0.25}{2}[e^0 + 2e^{-0.0625} + 2e^{-0.25} + 2e^{-0.5625} + e^{-1}]$$
$$= 0.125[1 + 2(0.9394) + 2(0.7788) + 2(0.5698) + 0.3679]$$
$$= 0.125[1 + 1.8788 + 1.5576 + 1.1396 + 0.3679]$$
$$= 0.125 \cdot 5.9439 = 0.7430$$

The true value (computed numerically to high precision) is approximately 0.7468, so our error is about 0.0038.

## Simpson's Rule

**Simpson's Rule** uses parabolic arcs instead of straight lines or rectangles. It fits a quadratic polynomial through each set of three consecutive points, resulting in significantly better accuracy.

### Simpson's Rule Formula

Simpson's Rule requires an **even number** of subintervals $n$. With $\Delta x = \frac{b-a}{n}$:

$$S_n = \frac{\Delta x}{3} [f(x_0) + 4f(x_1) + 2f(x_2) + 4f(x_3) + 2f(x_4) + \cdots + 4f(x_{n-1}) + f(x_n)]$$

**Pattern:** Coefficients alternate 1, 4, 2, 4, 2, 4, 2, ..., 4, 1.
- First and last: coefficient 1
- Odd indices: coefficient 4
- Even indices (except first and last): coefficient 2

**Example 3:** Approximate $\int_0^2 x^2 dx$ using Simpson's Rule with $n = 4$.

With $\Delta x = 0.5$ and points $0, 0.5, 1, 1.5, 2$:

$$S_4 = \frac{0.5}{3}[f(0) + 4f(0.5) + 2f(1) + 4f(1.5) + f(2)]$$
$$= \frac{0.5}{3}[0 + 4(0.25) + 2(1) + 4(2.25) + 4]$$
$$= \frac{0.5}{3}[0 + 1 + 2 + 9 + 4] = \frac{0.5}{3} \cdot 16 = \frac{8}{3}$$

This is **exactly correct**! Simpson's Rule is exact for polynomials of degree 3 or less.

**Example 4:** Approximate $\int_0^1 e^{-x^2} dx$ using $S_4$.

$$S_4 = \frac{0.25}{3}[e^0 + 4e^{-0.0625} + 2e^{-0.25} + 4e^{-0.5625} + e^{-1}]$$
$$= \frac{0.25}{3}[1 + 4(0.9394) + 2(0.7788) + 4(0.5698) + 0.3679]$$
$$= \frac{0.25}{3}[1 + 3.7576 + 1.5576 + 2.2792 + 0.3679]$$
$$= \frac{0.25}{3} \cdot 8.9623 = 0.7469$$

Error: $|0.7469 - 0.7468| = 0.0001$. Much better than the Trapezoidal Rule!

## Comparison of Methods

For $\int_0^1 e^{-x^2} dx \approx 0.7468$:

| Method | $n$ | Approximation | Absolute Error |
|--------|-----|---------------|----------------|
| Left Riemann | 4 | 0.7746 | 0.0278 |
| Right Riemann | 4 | 0.6811 | 0.0657 |
| Midpoint | 4 | 0.7470 | 0.0002 |
| Trapezoidal | 4 | 0.7430 | 0.0038 |
| Simpson's | 4 | 0.7469 | 0.0001 |

Simpson's Rule is remarkably accurate even with few subintervals.

## Error Bounds

Mathematical theory provides bounds on the error for these methods.

### Trapezoidal Rule Error Bound

If $|f''(x)| \leq K$ for all $x$ in $[a, b]$, then:

$$|E_T| \leq \frac{K(b-a)^3}{12n^2}$$

**Key observation:** Error decreases like $\frac{1}{n^2}$. Doubling $n$ reduces error by a factor of 4.

### Simpson's Rule Error Bound

If $|f^{(4)}(x)| \leq M$ for all $x$ in $[a, b]$, then:

$$|E_S| \leq \frac{M(b-a)^5}{180n^4}$$

**Key observation:** Error decreases like $\frac{1}{n^4}$. Doubling $n$ reduces error by a factor of 16!

**Example 5:** Find an upper bound for the error when using $T_4$ to approximate $\int_0^2 x^2 dx$.

We have $f(x) = x^2$, so $f''(x) = 2$. Thus $K = 2$.

$$|E_T| \leq \frac{2(2-0)^3}{12 \cdot 4^2} = \frac{2 \cdot 8}{12 \cdot 16} = \frac{16}{192} = \frac{1}{12} \approx 0.083$$

Our actual error was 0.083, matching the bound (equality holds because $f''$ is constant).

**Example 6:** How large should $n$ be to ensure the error in approximating $\int_0^1 e^{-x^2} dx$ with the Trapezoidal Rule is less than 0.0001?

First, find $K$ such that $|f''(x)| \leq K$ on $[0, 1]$.

For $f(x) = e^{-x^2}$:
$$f'(x) = -2xe^{-x^2}$$
$$f''(x) = -2e^{-x^2} + 4x^2e^{-x^2} = e^{-x^2}(4x^2 - 2)$$

To find the maximum of $|f''(x)|$ on $[0, 1]$, check critical points and endpoints.

At $x = 0$: $f''(0) = -2$

At $x = 1$: $f''(1) = e^{-1}(4 - 2) = 2e^{-1} \approx 0.736$

The maximum is $|f''(0)| = 2$, so $K = 2$.

We need:
$$\frac{2(1-0)^3}{12n^2} < 0.0001$$
$$\frac{2}{12n^2} < 0.0001$$
$$\frac{1}{6n^2} < 0.0001$$
$$n^2 > \frac{1}{0.0006} \approx 1667$$
$$n > 40.8$$

So we need $n \geq 41$ subintervals.

## Practical Considerations

**When to use each method:**
- **Riemann sums:** Pedagogical value, simple to implement, but least accurate
- **Trapezoidal Rule:** Good balance of simplicity and accuracy, widely used
- **Simpson's Rule:** Best accuracy for smooth functions, requires even $n$
- **Advanced methods:** Gaussian quadrature, adaptive methods (for specialized applications)

**Computational efficiency:**
- All methods require $n+1$ function evaluations
- Simpson's Rule gives much better accuracy for the same computational cost
- For high precision, adaptive methods that adjust $\Delta x$ based on function behavior are preferred

## Worked Example: Choosing $n$ for Desired Accuracy

**Problem:** Approximate $\int_1^3 \ln(x) dx$ using Simpson's Rule with error less than 0.001.

**Solution:**

Find $f^{(4)}(x)$ where $f(x) = \ln(x)$:
$$f'(x) = \frac{1}{x}, \quad f''(x) = -\frac{1}{x^2}, \quad f'''(x) = \frac{2}{x^3}, \quad f^{(4)}(x) = -\frac{6}{x^4}$$

On $[1, 3]$, $|f^{(4)}(x)| = \frac{6}{x^4}$ is maximized at $x = 1$: $M = 6$.

We need:
$$\frac{6(3-1)^5}{180n^4} < 0.001$$
$$\frac{6 \cdot 32}{180n^4} < 0.001$$
$$\frac{192}{180n^4} < 0.001$$
$$n^4 > \frac{192}{0.18} \approx 1067$$
$$n > 5.7$$

So $n = 6$ (must be even) will suffice.

With $n = 6$, $\Delta x = \frac{2}{6} = \frac{1}{3}$, and we compute:
$$S_6 = \frac{1/3}{3}[\ln(1) + 4\ln(4/3) + 2\ln(5/3) + 4\ln(2) + 2\ln(7/3) + 4\ln(8/3) + \ln(3)]$$

## Summary

- **Numerical integration** approximates integrals when exact antiderivatives are unavailable
- **Trapezoidal Rule:** $T_n = \frac{\Delta x}{2}[f(x_0) + 2f(x_1) + \cdots + 2f(x_{n-1}) + f(x_n)]$
  - Error: $O(1/n^2)$
- **Simpson's Rule:** $S_n = \frac{\Delta x}{3}[f(x_0) + 4f(x_1) + 2f(x_2) + \cdots + 4f(x_{n-1}) + f(x_n)]$
  - Requires even $n$
  - Error: $O(1/n^4)$ (much better!)
  - Exact for polynomials of degree $\leq 3$
- **Error bounds** allow us to determine how many subintervals are needed for desired accuracy
- Simpson's Rule is generally preferred when function evaluations are inexpensive and high accuracy is needed
- For practical computation with real data or expensive function evaluations, adaptive methods are often used
