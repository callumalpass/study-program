# Type 1 Improper Integrals: Infinite Limits of Integration

Type 1 improper integrals extend definite integration to infinite intervals. These integrals appear throughout mathematics, physics, and engineering whenever we need to compute quantities over unbounded regions. Understanding convergence and divergence of these integrals is essential for ensuring that calculated values are meaningful.

## Definition

A **Type 1 improper integral** has one or both limits of integration equal to infinity. We define these using limits:

**Infinite upper limit:**
$$\int_a^\infty f(x)\,dx = \lim_{t \to \infty} \int_a^t f(x)\,dx$$

**Infinite lower limit:**
$$\int_{-\infty}^b f(x)\,dx = \lim_{t \to -\infty} \int_t^b f(x)\,dx$$

**Both limits infinite:**
$$\int_{-\infty}^\infty f(x)\,dx = \int_{-\infty}^c f(x)\,dx + \int_c^\infty f(x)\,dx$$

where $c$ is any real number. Both integrals on the right must converge for the whole integral to converge.

**Important:** The value of the limit, if it exists, is the value of the improper integral. If the limit doesn't exist or is infinite, we say the integral **diverges**.

## Convergence and Divergence

An improper integral is:
- **Convergent** if the defining limit exists and is a finite real number
- **Divergent** if the limit does not exist, is infinite, or oscillates

**Example 1: Convergent integral**

Evaluate $\int_1^\infty \frac{1}{x^2}\,dx$.

**Solution:**
$$\int_1^\infty \frac{1}{x^2}\,dx = \lim_{t \to \infty} \int_1^t \frac{1}{x^2}\,dx$$

First, evaluate the definite integral:
$$\int_1^t \frac{1}{x^2}\,dx = \int_1^t x^{-2}\,dx = \left[-x^{-1}\right]_1^t = -\frac{1}{t} - \left(-\frac{1}{1}\right) = 1 - \frac{1}{t}$$

Now take the limit:
$$\lim_{t \to \infty} \left(1 - \frac{1}{t}\right) = 1 - 0 = 1$$

Therefore, $\int_1^\infty \frac{1}{x^2}\,dx = 1$. The integral converges to 1.

**Geometric interpretation:** This represents the area under the curve $y = \frac{1}{x^2}$ from $x = 1$ to infinity. Despite the unbounded region, the area is finite because the function decays rapidly enough.

**Example 2: Divergent integral**

Evaluate $\int_1^\infty \frac{1}{x}\,dx$.

**Solution:**
$$\int_1^\infty \frac{1}{x}\,dx = \lim_{t \to \infty} \int_1^t \frac{1}{x}\,dx$$

Evaluate the definite integral:
$$\int_1^t \frac{1}{x}\,dx = [\ln|x|]_1^t = \ln t - \ln 1 = \ln t$$

Take the limit:
$$\lim_{t \to \infty} \ln t = \infty$$

The integral diverges. The area under $y = \frac{1}{x}$ from $x = 1$ to infinity is infinite because the function doesn't decay fast enough.

## The p-Integral: A Fundamental Benchmark

The **p-integral** is the most important test case for Type 1 improper integrals:

$$\int_1^\infty \frac{1}{x^p}\,dx = \begin{cases} \frac{1}{p-1} & \text{if } p > 1 \text{ (converges)} \\ \text{diverges} & \text{if } p \leq 1 \end{cases}$$

**Proof for $p \neq 1$:**

$$\int_1^\infty \frac{1}{x^p}\,dx = \lim_{t \to \infty} \int_1^t x^{-p}\,dx = \lim_{t \to \infty} \left[\frac{x^{-p+1}}{-p+1}\right]_1^t = \lim_{t \to \infty} \frac{1}{1-p}\left[t^{1-p} - 1\right]$$

**Case 1: $p > 1$**
Then $1 - p < 0$, so $t^{1-p} \to 0$ as $t \to \infty$.
$$\frac{1}{1-p}(0 - 1) = \frac{1}{p-1}$$

**Case 2: $p < 1$**
Then $1 - p > 0$, so $t^{1-p} \to \infty$ as $t \to \infty$. The integral diverges.

**Case 3: $p = 1$**
We already showed $\int_1^\infty \frac{1}{x}\,dx$ diverges.

**Key insight:** The threshold $p = 1$ marks the boundary between convergence and divergence. Functions must decay faster than $\frac{1}{x}$ for their integrals over $[1, \infty)$ to converge.

## Evaluation Techniques

**Strategy for evaluating Type 1 improper integrals:**
1. Identify which limit(s) are infinite
2. Replace infinity with a variable (commonly $t$)
3. Evaluate the definite integral
4. Take the limit as $t \to \infty$ (or $t \to -\infty$)

**Example 3: Exponential decay**

Evaluate $\int_0^\infty e^{-2x}\,dx$.

**Solution:**
$$\int_0^\infty e^{-2x}\,dx = \lim_{t \to \infty} \int_0^t e^{-2x}\,dx$$

$$= \lim_{t \to \infty} \left[-\frac{1}{2}e^{-2x}\right]_0^t = \lim_{t \to \infty} \left(-\frac{1}{2}e^{-2t} + \frac{1}{2}\right)$$

As $t \to \infty$, $e^{-2t} \to 0$:
$$= 0 + \frac{1}{2} = \frac{1}{2}$$

The integral converges to $\frac{1}{2}$.

**Example 4: Trigonometric function**

Evaluate $\int_0^\infty \sin x\,dx$.

**Solution:**
$$\int_0^\infty \sin x\,dx = \lim_{t \to \infty} \int_0^t \sin x\,dx = \lim_{t \to \infty} [-\cos x]_0^t$$

$$= \lim_{t \to \infty} (-\cos t + \cos 0) = \lim_{t \to \infty} (1 - \cos t)$$

This limit does not exist because $\cos t$ oscillates between $-1$ and $1$ as $t \to \infty$.

Therefore, $\int_0^\infty \sin x\,dx$ diverges (by oscillation).

**Example 5: Rational function**

Evaluate $\int_0^\infty \frac{1}{1+x^2}\,dx$.

**Solution:**
$$\int_0^\infty \frac{1}{1+x^2}\,dx = \lim_{t \to \infty} \int_0^t \frac{1}{1+x^2}\,dx$$

$$= \lim_{t \to \infty} [\arctan x]_0^t = \lim_{t \to \infty} (\arctan t - \arctan 0)$$

As $t \to \infty$, $\arctan t \to \frac{\pi}{2}$:
$$= \frac{\pi}{2} - 0 = \frac{\pi}{2}$$

The integral converges to $\frac{\pi}{2}$.

## Integrals Over the Entire Real Line

For integrals of the form $\int_{-\infty}^\infty f(x)\,dx$, we must split at some finite point:

$$\int_{-\infty}^\infty f(x)\,dx = \int_{-\infty}^c f(x)\,dx + \int_c^\infty f(x)\,dx$$

**Both integrals must converge** for the whole integral to converge. The choice of $c$ doesn't matter (often we choose $c = 0$ for convenience).

**Example 6: Gaussian integral**

The fundamental Gaussian integral is:
$$\int_{-\infty}^\infty e^{-x^2}\,dx = \sqrt{\pi}$$

This remarkable result requires advanced techniques (polar coordinates or complex analysis) to prove, but it's a cornerstone of probability theory and appears in the normal distribution.

**Example 7: Rational function over entire line**

Evaluate $\int_{-\infty}^\infty \frac{1}{1+x^2}\,dx$.

**Solution:**
By symmetry (the function is even), we can write:
$$\int_{-\infty}^\infty \frac{1}{1+x^2}\,dx = 2\int_0^\infty \frac{1}{1+x^2}\,dx$$

From Example 5, we know this equals $2 \cdot \frac{\pi}{2} = \pi$.

Alternatively, split at $x = 0$:
$$\int_{-\infty}^0 \frac{1}{1+x^2}\,dx + \int_0^\infty \frac{1}{1+x^2}\,dx$$

$$= \lim_{s \to -\infty} [\arctan x]_s^0 + \lim_{t \to \infty} [\arctan x]_0^t$$

$$= (0 - (-\frac{\pi}{2})) + (\frac{\pi}{2} - 0) = \frac{\pi}{2} + \frac{\pi}{2} = \pi$$

## Important Special Cases

**Exponential integrals:**
$$\int_0^\infty e^{-ax}\,dx = \frac{1}{a} \quad \text{for } a > 0$$

$$\int_0^\infty x^n e^{-ax}\,dx = \frac{n!}{a^{n+1}} \quad \text{for } a > 0, n \geq 0$$

**Inverse tangent:**
$$\int_0^\infty \frac{1}{1+x^2}\,dx = \frac{\pi}{2}$$

$$\int_{-\infty}^\infty \frac{1}{1+x^2}\,dx = \pi$$

**Natural logarithm:**
$$\int_1^\infty \frac{1}{x}\,dx = \infty \quad \text{(diverges)}$$

## Common Pitfalls

**Pitfall 1: Treating infinity as a number**

Don't write $\int_1^\infty \frac{1}{x}\,dx = [\ln x]_1^\infty = \ln \infty - \ln 1 = \infty - 0 = \infty$.

While the conclusion is correct, the notation is imprecise. Always use proper limit notation.

**Pitfall 2: Forgetting to check both parts**

For $\int_{-\infty}^\infty f(x)\,dx$, you can't just evaluate one side and double it unless $f$ is even.

**Pitfall 3: Assuming convergence**

Just because you can write down an improper integral doesn't mean it converges. Always verify convergence before using the value.

## Summary

- Type 1 improper integrals have infinite limits of integration
- Define them using limits: replace $\infty$ with a variable and take the limit
- An integral **converges** if the limit exists and is finite
- The **p-integral test**: $\int_1^\infty x^{-p}\,dx$ converges iff $p > 1$
- Exponential functions $e^{-ax}$ with $a > 0$ always produce convergent integrals over $[0, \infty)$
- For $\int_{-\infty}^\infty f(x)\,dx$, both parts must converge separately
- Common convergent integrals: $\int_0^\infty e^{-ax}\,dx = \frac{1}{a}$, $\int_{-\infty}^\infty \frac{1}{1+x^2}\,dx = \pi$

Understanding Type 1 improper integrals provides the foundation for working with probability distributions, Laplace transforms, and many applications in physics and engineering where infinite domains naturally arise.
