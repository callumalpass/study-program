# Type 2 Improper Integrals: Discontinuous Integrands

Type 2 improper integrals occur when the integrand has a vertical asymptote (infinite discontinuity) within or at the endpoints of the interval of integration. These integrals are crucial in physics (gravitational and electric potentials), geometry (surface area calculations), and probability (certain distributions with unbounded densities).

## Definition

A **Type 2 improper integral** arises when the integrand $f(x)$ becomes unbounded (has a vertical asymptote) at one or more points in the interval $[a, b]$.

**Discontinuity at the right endpoint:**
If $f$ is continuous on $[a, b)$ but discontinuous at $b$:
$$\int_a^b f(x)\,dx = \lim_{t \to b^-} \int_a^t f(x)\,dx$$

**Discontinuity at the left endpoint:**
If $f$ is continuous on $(a, b]$ but discontinuous at $a$:
$$\int_a^b f(x)\,dx = \lim_{t \to a^+} \int_t^b f(x)\,dx$$

**Discontinuity at an interior point:**
If $f$ is discontinuous at $c \in (a, b)$:
$$\int_a^b f(x)\,dx = \int_a^c f(x)\,dx + \int_c^b f(x)\,dx$$

where both integrals on the right are improper and must be evaluated separately. Both must converge for the whole integral to converge.

## Identifying Discontinuities

Before evaluating an integral, always check for points where the integrand is undefined or infinite.

**Common causes of discontinuities:**
- Division by zero
- Even roots of negative numbers
- Logarithms of zero or negative numbers
- Functions like $\tan x$ at $x = \frac{\pi}{2} + n\pi$

**Example:** For $f(x) = \frac{1}{\sqrt{4-x^2}}$ on $[0, 2]$, check where the denominator equals zero:
$$4 - x^2 = 0 \implies x = \pm 2$$

So $f$ has a discontinuity at $x = 2$ (the right endpoint).

## Convergence and Divergence at Endpoints

**Example 1: Convergent at right endpoint**

Evaluate $\int_0^1 \frac{1}{\sqrt{x}}\,dx$.

**Solution:**

First, identify the discontinuity. As $x \to 0^+$, $\frac{1}{\sqrt{x}} \to \infty$, so there's a vertical asymptote at $x = 0$ (the left endpoint).

Apply the definition:
$$\int_0^1 \frac{1}{\sqrt{x}}\,dx = \lim_{t \to 0^+} \int_t^1 \frac{1}{\sqrt{x}}\,dx$$

Evaluate the definite integral:
$$\int_t^1 x^{-1/2}\,dx = \left[2x^{1/2}\right]_t^1 = 2\sqrt{1} - 2\sqrt{t} = 2 - 2\sqrt{t}$$

Take the limit:
$$\lim_{t \to 0^+} (2 - 2\sqrt{t}) = 2 - 0 = 2$$

The integral converges to 2.

**Geometric interpretation:** Despite the function being unbounded near $x = 0$, the area under the curve from 0 to 1 is finite.

**Example 2: Divergent at left endpoint**

Evaluate $\int_0^1 \frac{1}{x}\,dx$.

**Solution:**

The integrand has a vertical asymptote at $x = 0$.

$$\int_0^1 \frac{1}{x}\,dx = \lim_{t \to 0^+} \int_t^1 \frac{1}{x}\,dx$$

$$= \lim_{t \to 0^+} [\ln|x|]_t^1 = \lim_{t \to 0^+} (\ln 1 - \ln t) = \lim_{t \to 0^+} (-\ln t)$$

As $t \to 0^+$, $\ln t \to -\infty$, so $-\ln t \to \infty$.

The integral diverges.

## The p-Integral for Type 2

Just as with Type 1 integrals, p-integrals provide crucial benchmarks for Type 2:

$$\int_0^1 \frac{1}{x^p}\,dx = \begin{cases} \frac{1}{1-p} & \text{if } p < 1 \text{ (converges)} \\ \text{diverges} & \text{if } p \geq 1 \end{cases}$$

**Notice:** The convergence condition is the **opposite** of Type 1! For Type 1, we needed $p > 1$. For Type 2 near zero, we need $p < 1$.

**Proof for $p \neq 1$:**

$$\int_0^1 \frac{1}{x^p}\,dx = \lim_{t \to 0^+} \int_t^1 x^{-p}\,dx = \lim_{t \to 0^+} \left[\frac{x^{1-p}}{1-p}\right]_t^1$$

$$= \lim_{t \to 0^+} \frac{1}{1-p}(1 - t^{1-p})$$

**Case 1: $p < 1$**
Then $1 - p > 0$, so $t^{1-p} \to 0$ as $t \to 0^+$.
$$\frac{1}{1-p}(1 - 0) = \frac{1}{1-p}$$

**Case 2: $p > 1$**
Then $1 - p < 0$, so $t^{1-p} = \frac{1}{t^{p-1}} \to \infty$ as $t \to 0^+$. Diverges.

**Case 3: $p = 1$**
We showed this diverges in Example 2.

**Key rule of thumb:** Near a discontinuity at a finite point, milder singularities (smaller $p$) converge, while stronger singularities diverge.

## Interior Point Discontinuities

When the discontinuity occurs inside the interval, we must split the integral and evaluate both parts.

**Example 3: Interior discontinuity**

Evaluate $\int_0^3 \frac{1}{\sqrt{|x-1|}}\,dx$.

**Solution:**

The integrand has a discontinuity at $x = 1$ (interior point). Split the integral:
$$\int_0^3 \frac{1}{\sqrt{|x-1|}}\,dx = \int_0^1 \frac{1}{\sqrt{1-x}}\,dx + \int_1^3 \frac{1}{\sqrt{x-1}}\,dx$$

**Evaluate the left part:**
$$\int_0^1 \frac{1}{\sqrt{1-x}}\,dx = \lim_{t \to 1^-} \int_0^t \frac{1}{\sqrt{1-x}}\,dx$$

Use substitution $u = 1 - x$, $du = -dx$:
$$= \lim_{t \to 1^-} \int_{1}^{1-t} \frac{-1}{\sqrt{u}}\,du = \lim_{t \to 1^-} \int_{1-t}^1 u^{-1/2}\,du$$

$$= \lim_{t \to 1^-} [2\sqrt{u}]_{1-t}^1 = \lim_{t \to 1^-} (2 - 2\sqrt{1-t}) = 2$$

**Evaluate the right part:**
$$\int_1^3 \frac{1}{\sqrt{x-1}}\,dx = \lim_{t \to 1^+} \int_t^3 \frac{1}{\sqrt{x-1}}\,dx$$

$$= \lim_{t \to 1^+} [2\sqrt{x-1}]_t^3 = \lim_{t \to 1^+} (2\sqrt{2} - 2\sqrt{t-1}) = 2\sqrt{2}$$

Both parts converge, so:
$$\int_0^3 \frac{1}{\sqrt{|x-1|}}\,dx = 2 + 2\sqrt{2}$$

**Example 4: Multiple discontinuities**

Evaluate $\int_{-1}^1 \frac{1}{x^2}\,dx$.

**Solution:**

The integrand has a discontinuity at $x = 0$. Split at 0:
$$\int_{-1}^1 \frac{1}{x^2}\,dx = \int_{-1}^0 \frac{1}{x^2}\,dx + \int_0^1 \frac{1}{x^2}\,dx$$

**Evaluate the left part:**
$$\int_{-1}^0 \frac{1}{x^2}\,dx = \lim_{t \to 0^-} \int_{-1}^t \frac{1}{x^2}\,dx = \lim_{t \to 0^-} \left[-\frac{1}{x}\right]_{-1}^t$$

$$= \lim_{t \to 0^-} \left(-\frac{1}{t} - 1\right) = -\infty$$

This part diverges, so the entire integral diverges. We don't even need to check the right part.

**Important:** If either part diverges, the whole integral diverges.

## Comparison with Type 1

Type 2 integrals behave differently from Type 1 at discontinuities.

**Type 1 at infinity:** $\int_1^\infty \frac{1}{x^p}\,dx$ converges for $p > 1$
**Type 2 near zero:** $\int_0^1 \frac{1}{x^p}\,dx$ converges for $p < 1$

These opposite conditions reflect different behaviors:
- Near infinity, we need **rapid decay** ($p > 1$)
- Near a finite singularity, we need **mild growth** ($p < 1$)

**Example 5: Combining Type 1 and Type 2**

Some integrals are improper for multiple reasons.

Evaluate $\int_0^\infty \frac{1}{\sqrt{x}}\,dx$.

**Solution:**

This is improper both at $x = 0$ (Type 2) and at $x = \infty$ (Type 1). Split at any convenient point, say $x = 1$:

$$\int_0^\infty \frac{1}{\sqrt{x}}\,dx = \int_0^1 \frac{1}{\sqrt{x}}\,dx + \int_1^\infty \frac{1}{\sqrt{x}}\,dx$$

From earlier work (Example 1), $\int_0^1 \frac{1}{\sqrt{x}}\,dx = 2$ (converges).

For the second part (Type 1 with $p = 1/2 < 1$):
$$\int_1^\infty \frac{1}{\sqrt{x}}\,dx = \lim_{t \to \infty} [2\sqrt{x}]_1^t = \lim_{t \to \infty} (2\sqrt{t} - 2) = \infty$$

This part diverges, so the entire integral diverges.

## Practical Examples

**Example 6: Arc length leading to Type 2**

The arc length of $y = x^{2/3}$ from $x = 0$ to $x = 1$ is:
$$L = \int_0^1 \sqrt{1 + \left(\frac{dy}{dx}\right)^2}\,dx$$

Since $\frac{dy}{dx} = \frac{2}{3}x^{-1/3}$:
$$L = \int_0^1 \sqrt{1 + \frac{4}{9}x^{-2/3}}\,dx$$

Near $x = 0$, the integrand behaves like $\frac{2}{3}x^{-1/3}$, which is a p-integral with $p = 1/3 < 1$, so it converges.

**Example 7: Surface area**

The surface area obtained by rotating $y = \frac{1}{x}$ from $x = 1$ to $x = 2$ about the $x$-axis is:
$$S = 2\pi \int_1^2 \frac{1}{x}\sqrt{1 + \frac{1}{x^4}}\,dx$$

The integrand is continuous on $[1, 2]$, so this is actually a proper integral despite the $\frac{1}{x}$ term.

## Common Mistakes

**Mistake 1: Missing interior discontinuities**

Always check the entire interval, not just endpoints. For $\int_0^2 \frac{1}{\sqrt{x(2-x)}}\,dx$, there are discontinuities at both $x = 0$ and $x = 2$.

**Mistake 2: Forgetting absolute value**

When checking for zeros of denominators, remember that $\sqrt{x^2} = |x|$, which is zero at $x = 0$ even though $x^2$ is never negative.

**Mistake 3: Assuming symmetry helps**

Even if $f$ is even, $\int_{-a}^a f(x)\,dx$ with a discontinuity at 0 requires evaluating both sides separately.

**Mistake 4: Not checking both parts**

For interior discontinuities, both resulting integrals must converge. Don't stop after finding one converges.

## Summary

- **Type 2 improper integrals** have unbounded integrands (vertical asymptotes)
- Define them using limits approaching the discontinuity from the appropriate side
- For discontinuities at **endpoints**, approach from inside the interval
- For **interior discontinuities**, split the integral and evaluate both parts
- **p-integral for Type 2:** $\int_0^1 x^{-p}\,dx$ converges iff $p < 1$ (opposite of Type 1!)
- **Both Type 1 and Type 2** can occur in the same problem—handle each separately
- Always identify all discontinuities before beginning evaluation
- If any part diverges, the entire integral diverges

Type 2 improper integrals appear naturally in applications involving singularities: gravitational and electric potentials near point masses or charges, arc lengths of curves with vertical tangents, and probability distributions with unbounded densities at finite points.
