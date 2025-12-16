# Divergence Test, Integral Test, and p-Series

## The Divergence Test

The **Divergence Test** (also called the **Test for Divergence** or **$n$-th Term Test**) is the simplest test for series, though it can only tell us when a series diverges.

### Theorem: The Divergence Test

If $\lim_{n \to \infty} a_n \neq 0$ (or the limit does not exist), then the series $\sum_{n=1}^{\infty} a_n$ **diverges**.

**Contrapositive Form**: If $\sum_{n=1}^{\infty} a_n$ converges, then $\lim_{n \to \infty} a_n = 0$.

### Important Warning

The converse is **NOT** true. If $\lim_{n \to \infty} a_n = 0$, we **cannot** conclude that the series converges.

The harmonic series $\sum \frac{1}{n}$ is the classic counterexample: $\lim_{n \to \infty} \frac{1}{n} = 0$, but the series diverges.

### Example 1: Using the Divergence Test

Determine if $\sum_{n=1}^{\infty} \frac{n}{n+1}$ converges.

**Solution**: Check the limit of the terms:
$$\lim_{n \to \infty} \frac{n}{n+1} = \lim_{n \to \infty} \frac{1}{1 + \frac{1}{n}} = 1 \neq 0$$

By the Divergence Test, the series diverges.

### Example 2: Oscillating Terms

Does $\sum_{n=1}^{\infty} (-1)^n$ converge?

**Solution**: The limit $\lim_{n \to \infty} (-1)^n$ does not exist (it oscillates between $-1$ and $1$).

By the Divergence Test, the series diverges.

### Example 3: When the Test is Inconclusive

Does $\sum_{n=1}^{\infty} \frac{1}{n^2}$ converge?

**Solution**: We have:
$$\lim_{n \to \infty} \frac{1}{n^2} = 0$$

The Divergence Test is **inconclusive** — we need another test. (This series actually converges, as we'll see with the Integral Test.)

## The Integral Test

The **Integral Test** connects series to improper integrals, allowing us to use techniques from integral calculus to determine convergence.

### Theorem: The Integral Test

Suppose $f$ is a continuous, positive, decreasing function on $[1, \infty)$, and let $a_n = f(n)$. Then:

$$\sum_{n=1}^{\infty} a_n \text{ and } \int_1^{\infty} f(x)\,dx$$

either **both converge** or **both diverge**.

### Key Requirements

For the Integral Test to apply, $f(x)$ must be:
1. **Continuous** on $[1, \infty)$
2. **Positive** on $[1, \infty)$
3. **Decreasing** on $[1, \infty)$ (or eventually decreasing for $x \geq N$ for some $N$)

### Intuition

The idea is that the series $\sum a_n$ can be approximated by the integral $\int f(x)\,dx$. The rectangles in a Riemann sum representation can be used to bound the integral, creating a connection between the discrete sum and continuous integral.

### Example 1: The Harmonic Series Revisited

Use the Integral Test to show that $\sum_{n=1}^{\infty} \frac{1}{n}$ diverges.

**Solution**: Let $f(x) = \frac{1}{x}$. This function is continuous, positive, and decreasing on $[1, \infty)$.

Evaluate the improper integral:
$$\int_1^{\infty} \frac{1}{x}\,dx = \lim_{t \to \infty} \int_1^t \frac{1}{x}\,dx = \lim_{t \to \infty} [\ln x]_1^t = \lim_{t \to \infty} (\ln t - \ln 1) = \infty$$

Since the integral diverges, the series $\sum_{n=1}^{\infty} \frac{1}{n}$ also diverges.

### Example 2: A Convergent Series

Determine if $\sum_{n=1}^{\infty} \frac{1}{n^2}$ converges.

**Solution**: Let $f(x) = \frac{1}{x^2}$. This is continuous, positive, and decreasing on $[1, \infty)$.

$$\int_1^{\infty} \frac{1}{x^2}\,dx = \lim_{t \to \infty} \int_1^t x^{-2}\,dx = \lim_{t \to \infty} \left[-\frac{1}{x}\right]_1^t$$

$$= \lim_{t \to \infty} \left(-\frac{1}{t} + 1\right) = 1$$

Since the integral converges, the series $\sum_{n=1}^{\infty} \frac{1}{n^2}$ also converges.

(Note: The value of the integral is $1$, but the sum of the series is $\frac{\pi^2}{6} \approx 1.645$. The Integral Test tells us about convergence, not the exact value.)

### Example 3: Series with Natural Logarithm

Does $\sum_{n=2}^{\infty} \frac{1}{n \ln n}$ converge?

**Solution**: Let $f(x) = \frac{1}{x \ln x}$ for $x \geq 2$. This is continuous, positive, and decreasing.

$$\int_2^{\infty} \frac{1}{x \ln x}\,dx$$

Use the substitution $u = \ln x$, so $du = \frac{1}{x}\,dx$:
$$= \int_{\ln 2}^{\infty} \frac{1}{u}\,du = \lim_{t \to \infty} [\ln u]_{\ln 2}^t = \lim_{t \to \infty} (t - \ln(\ln 2)) = \infty$$

Since the integral diverges, the series diverges.

### Example 4: Exponential Decay

Test $\sum_{n=1}^{\infty} ne^{-n^2}$ for convergence.

**Solution**: Let $f(x) = xe^{-x^2}$. This is continuous and positive on $[1, \infty)$.

To verify it's decreasing, check $f'(x)$:
$$f'(x) = e^{-x^2} + x \cdot (-2x)e^{-x^2} = e^{-x^2}(1 - 2x^2)$$

For $x \geq 1$, we have $1 - 2x^2 < 0$, so $f'(x) < 0$ and $f$ is decreasing.

Now evaluate the integral using substitution $u = -x^2$, $du = -2x\,dx$:
$$\int_1^{\infty} xe^{-x^2}\,dx = \lim_{t \to \infty} \left[-\frac{1}{2}e^{-x^2}\right]_1^t = \lim_{t \to \infty} \left(-\frac{1}{2}e^{-t^2} + \frac{1}{2}e^{-1}\right) = \frac{1}{2e}$$

Since the integral converges, the series converges.

## The p-Series

A **p-series** is a series of the form:
$$\sum_{n=1}^{\infty} \frac{1}{n^p}$$

where $p$ is a positive constant.

### Theorem: Convergence of p-Series

The p-series $\sum_{n=1}^{\infty} \frac{1}{n^p}$ converges if and only if $p > 1$.

More specifically:
- If $p > 1$: the series **converges**
- If $p \leq 1$: the series **diverges**

### Proof Using the Integral Test

Let $f(x) = \frac{1}{x^p}$. This is continuous, positive, and decreasing on $[1, \infty)$ for $p > 0$.

**Case 1**: $p > 1$

$$\int_1^{\infty} \frac{1}{x^p}\,dx = \lim_{t \to \infty} \int_1^t x^{-p}\,dx = \lim_{t \to \infty} \left[\frac{x^{-p+1}}{-p+1}\right]_1^t$$

$$= \lim_{t \to \infty} \frac{1}{1-p}\left(t^{1-p} - 1\right)$$

Since $p > 1$, we have $1-p < 0$, so $t^{1-p} \to 0$ as $t \to \infty$:
$$= \frac{1}{1-p}(0-1) = \frac{1}{p-1}$$

The integral converges, so the series converges.

**Case 2**: $p = 1$

This is the harmonic series, which we've shown diverges.

**Case 3**: $0 < p < 1$

$$\int_1^{\infty} \frac{1}{x^p}\,dx = \lim_{t \to \infty} \frac{1}{1-p}(t^{1-p} - 1)$$

Since $1-p > 0$, we have $t^{1-p} \to \infty$, so the integral diverges, and thus the series diverges.

### Examples of p-Series

1. $\sum_{n=1}^{\infty} \frac{1}{n^{3/2}}$ converges (since $p = \frac{3}{2} > 1$)

2. $\sum_{n=1}^{\infty} \frac{1}{n}$ diverges (since $p = 1$)

3. $\sum_{n=1}^{\infty} \frac{1}{\sqrt{n}}$ diverges (since $p = \frac{1}{2} < 1$)

4. $\sum_{n=1}^{\infty} \frac{1}{n^3}$ converges (since $p = 3 > 1$)

### Example: Disguised p-Series

Determine if $\sum_{n=1}^{\infty} \frac{5}{(2n)^4}$ converges.

**Solution**: Factor out constants:
$$\sum_{n=1}^{\infty} \frac{5}{(2n)^4} = \sum_{n=1}^{\infty} \frac{5}{2^4 n^4} = \frac{5}{16} \sum_{n=1}^{\infty} \frac{1}{n^4}$$

This is a constant multiple of a p-series with $p = 4 > 1$, so it converges.

### Example: Modified p-Series

Does $\sum_{n=1}^{\infty} \frac{n+1}{n^3}$ converge?

**Solution**: Split the fraction:
$$\sum_{n=1}^{\infty} \frac{n+1}{n^3} = \sum_{n=1}^{\infty} \left(\frac{n}{n^3} + \frac{1}{n^3}\right) = \sum_{n=1}^{\infty} \frac{1}{n^2} + \sum_{n=1}^{\infty} \frac{1}{n^3}$$

Both are p-series with $p > 1$, so both converge. Therefore, the original series converges.

## Choosing the Right Test

**Use the Divergence Test first**: Always check if $\lim_{n \to \infty} a_n \neq 0$. If so, the series diverges immediately.

**Use the p-Series Test**: If the series is (or can be transformed into) a p-series, apply the simple criterion $p > 1$ for convergence.

**Use the Integral Test**: When you can easily integrate the corresponding function, especially for series involving logarithms, exponentials, or algebraic functions.

## Key Takeaways

- The Divergence Test can only prove divergence, never convergence
- The Integral Test connects series to improper integrals
- p-Series converge if and only if $p > 1$
- These tests form the foundation for understanding more complex series
