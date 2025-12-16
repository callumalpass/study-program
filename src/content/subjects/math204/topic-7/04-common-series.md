# Common Maclaurin Series

Memorizing the Maclaurin series for common functions is essential for working efficiently with Taylor series. These series serve as building blocks that you'll use repeatedly to construct more complex series through substitution, differentiation, integration, and other operations. This section presents the most important series along with their derivations and applications.

## The Six Essential Series

These six series should be committed to memory:

### 1. Exponential Function: $e^x$

$$e^x = \sum_{n=0}^{\infty} \frac{x^n}{n!} = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \frac{x^4}{4!} + \frac{x^5}{5!} + \cdots$$

**Interval of Convergence:** $(-\infty, \infty)$

**Derivation:** All derivatives of $e^x$ equal $e^x$, so $f^{(n)}(0) = 1$ for all $n$.

**Why It's Special:** This is the only function (up to scaling) that equals its own derivative. The exponential series converges extremely rapidly due to the factorial in the denominator.

### 2. Sine Function: $\sin x$

$$\sin x = \sum_{n=0}^{\infty} \frac{(-1)^n x^{2n+1}}{(2n+1)!} = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \frac{x^7}{7!} + \frac{x^9}{9!} - \cdots$$

**Interval of Convergence:** $(-\infty, \infty)$

**Derivation:** Derivatives cycle: $\sin x \to \cos x \to -\sin x \to -\cos x \to \sin x$. At $x = 0$: $0, 1, 0, -1, 0, 1, \ldots$

**Pattern:** Only odd powers, alternating signs.

### 3. Cosine Function: $\cos x$

$$\cos x = \sum_{n=0}^{\infty} \frac{(-1)^n x^{2n}}{(2n)!} = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \frac{x^6}{6!} + \frac{x^8}{8!} - \cdots$$

**Interval of Convergence:** $(-\infty, \infty)$

**Derivation:** Derivatives cycle: $\cos x \to -\sin x \to -\cos x \to \sin x \to \cos x$. At $x = 0$: $1, 0, -1, 0, 1, \ldots$

**Pattern:** Only even powers, alternating signs.

**Relationship to Sine:** $\cos x = \frac{d}{dx}[\sin x]$ or equivalently, the sine series shifted by one derivative.

### 4. Geometric Series: $\frac{1}{1-x}$

$$\frac{1}{1-x} = \sum_{n=0}^{\infty} x^n = 1 + x + x^2 + x^3 + x^4 + x^5 + \cdots$$

**Interval of Convergence:** $(-1, 1)$

**Derivation:** This is the sum of a geometric series with ratio $r = x$, which converges when $|r| < 1$.

**Why It's Fundamental:** This is the simplest non-polynomial series and the starting point for building many other series through substitution.

### 5. Natural Logarithm: $\ln(1+x)$

$$\ln(1+x) = \sum_{n=1}^{\infty} \frac{(-1)^{n+1} x^n}{n} = x - \frac{x^2}{2} + \frac{x^3}{3} - \frac{x^4}{4} + \frac{x^5}{5} - \cdots$$

**Interval of Convergence:** $(-1, 1]$

**Derivation:** Integrate the series for $\frac{1}{1+x}$:
$$\frac{1}{1+x} = \sum_{n=0}^{\infty} (-1)^n x^n$$
$$\ln(1+x) = \int \frac{1}{1+x}\, dx = C + \sum_{n=0}^{\infty} \frac{(-1)^n x^{n+1}}{n+1}$$

Setting $x = 0$ gives $C = 0$.

**Note:** Converges at $x = 1$ (endpoint) by the alternating series test, giving the alternating harmonic series.

### 6. Inverse Tangent: $\arctan x$

$$\arctan x = \sum_{n=0}^{\infty} \frac{(-1)^n x^{2n+1}}{2n+1} = x - \frac{x^3}{3} + \frac{x^5}{5} - \frac{x^7}{7} + \frac{x^9}{9} - \cdots$$

**Interval of Convergence:** $[-1, 1]$

**Derivation:** Integrate the series for $\frac{1}{1+x^2}$:
$$\frac{1}{1+x^2} = \sum_{n=0}^{\infty} (-1)^n x^{2n}$$
$$\arctan x = \int \frac{1}{1+x^2}\, dx = C + \sum_{n=0}^{\infty} \frac{(-1)^n x^{2n+1}}{2n+1}$$

Setting $x = 0$ gives $C = 0$.

**Special Value:** At $x = 1$:
$$\arctan(1) = \frac{\pi}{4} = 1 - \frac{1}{3} + \frac{1}{5} - \frac{1}{7} + \frac{1}{9} - \cdots$$

This is the famous **Leibniz formula for $\pi$**.

## Important Relationships and Identities

### Euler's Formula (Complex Exponentials)

While this involves complex numbers, it's worth noting:
$$e^{ix} = \cos x + i \sin x$$

This can be verified by substituting $ix$ into the exponential series:
$$e^{ix} = \sum_{n=0}^{\infty} \frac{(ix)^n}{n!} = \sum_{n=0}^{\infty} \frac{i^n x^n}{n!}$$

Separating real and imaginary parts using $i^2 = -1$, $i^3 = -i$, $i^4 = 1$:
- Real parts (even powers): $1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \cdots = \cos x$
- Imaginary parts (odd powers): $x - \frac{x^3}{3!} + \frac{x^5}{5!} - \cdots = \sin x$

### Hyperbolic Functions

The hyperbolic sine and cosine have similar series:

$$\sinh x = \frac{e^x - e^{-x}}{2} = \sum_{n=0}^{\infty} \frac{x^{2n+1}}{(2n+1)!} = x + \frac{x^3}{3!} + \frac{x^5}{5!} + \frac{x^7}{7!} + \cdots$$

$$\cosh x = \frac{e^x + e^{-x}}{2} = \sum_{n=0}^{\infty} \frac{x^{2n}}{(2n)!} = 1 + \frac{x^2}{2!} + \frac{x^4}{4!} + \frac{x^6}{6!} + \cdots$$

Notice: sine → sinh (remove alternating signs), cosine → cosh (remove alternating signs).

## Derived Series Through Operations

Using the six essential series, we can quickly build many others.

### Example 1: $e^{-x}$

Substitute $-x$ into the series for $e^x$:
$$e^{-x} = \sum_{n=0}^{\infty} \frac{(-x)^n}{n!} = \sum_{n=0}^{\infty} \frac{(-1)^n x^n}{n!} = 1 - x + \frac{x^2}{2!} - \frac{x^3}{3!} + \frac{x^4}{4!} - \cdots$$

### Example 2: $\sin(2x)$

Substitute $2x$ into the series for $\sin x$:
$$\sin(2x) = \sum_{n=0}^{\infty} \frac{(-1)^n (2x)^{2n+1}}{(2n+1)!} = 2x - \frac{(2x)^3}{3!} + \frac{(2x)^5}{5!} - \cdots = 2x - \frac{8x^3}{6} + \frac{32x^5}{120} - \cdots$$

### Example 3: $x \cos(x^2)$

First substitute $x^2$ into the series for $\cos x$:
$$\cos(x^2) = 1 - \frac{x^4}{2!} + \frac{x^8}{4!} - \frac{x^{12}}{6!} + \cdots$$

Then multiply by $x$:
$$x \cos(x^2) = x - \frac{x^5}{2!} + \frac{x^9}{4!} - \frac{x^{13}}{6!} + \cdots$$

### Example 4: $\frac{1}{1+x}$

Substitute $-x$ into the geometric series:
$$\frac{1}{1+x} = \sum_{n=0}^{\infty} (-x)^n = \sum_{n=0}^{\infty} (-1)^n x^n = 1 - x + x^2 - x^3 + x^4 - \cdots$$

### Example 5: $\frac{x}{1-x^3}$

Substitute $x^3$ into the geometric series, then multiply by $x$:
$$\frac{1}{1-x^3} = 1 + x^3 + x^6 + x^9 + \cdots$$
$$\frac{x}{1-x^3} = x + x^4 + x^7 + x^{10} + \cdots$$

### Example 6: $\ln(1-x)$

Substitute $-x$ into the series for $\ln(1+x)$:
$$\ln(1-x) = \sum_{n=1}^{\infty} \frac{(-1)^{n+1} (-x)^n}{n} = \sum_{n=1}^{\infty} \frac{(-1)^{n+1} (-1)^n x^n}{n} = -\sum_{n=1}^{\infty} \frac{x^n}{n}$$
$$\ln(1-x) = -x - \frac{x^2}{2} - \frac{x^3}{3} - \frac{x^4}{4} - \cdots$$

### Example 7: $\frac{d}{dx}[e^x] = e^x$

Differentiate the exponential series term by term:
$$\frac{d}{dx}\left[1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \frac{x^4}{4!} + \cdots\right] = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots$$

The series reproduces itself, confirming $\frac{d}{dx}[e^x] = e^x$.

## Quick Reference Table

| Function | Series | Interval |
|----------|--------|----------|
| $e^x$ | $\sum_{n=0}^{\infty} \frac{x^n}{n!}$ | $(-\infty, \infty)$ |
| $e^{-x}$ | $\sum_{n=0}^{\infty} \frac{(-1)^n x^n}{n!}$ | $(-\infty, \infty)$ |
| $\sin x$ | $\sum_{n=0}^{\infty} \frac{(-1)^n x^{2n+1}}{(2n+1)!}$ | $(-\infty, \infty)$ |
| $\cos x$ | $\sum_{n=0}^{\infty} \frac{(-1)^n x^{2n}}{(2n)!}$ | $(-\infty, \infty)$ |
| $\sinh x$ | $\sum_{n=0}^{\infty} \frac{x^{2n+1}}{(2n+1)!}$ | $(-\infty, \infty)$ |
| $\cosh x$ | $\sum_{n=0}^{\infty} \frac{x^{2n}}{(2n)!}$ | $(-\infty, \infty)$ |
| $\frac{1}{1-x}$ | $\sum_{n=0}^{\infty} x^n$ | $(-1, 1)$ |
| $\frac{1}{1+x}$ | $\sum_{n=0}^{\infty} (-1)^n x^n$ | $(-1, 1)$ |
| $\ln(1+x)$ | $\sum_{n=1}^{\infty} \frac{(-1)^{n+1} x^n}{n}$ | $(-1, 1]$ |
| $\ln(1-x)$ | $-\sum_{n=1}^{\infty} \frac{x^n}{n}$ | $[-1, 1)$ |
| $\arctan x$ | $\sum_{n=0}^{\infty} \frac{(-1)^n x^{2n+1}}{2n+1}$ | $[-1, 1]$ |
| $(1+x)^p$ | $\sum_{n=0}^{\infty} \binom{p}{n} x^n$ | $(-1, 1)$ or $(-1, 1]$ |

## Memory Aids

**For $e^x$:** All positive terms, factorial denominators.

**For $\sin x$ and $\cos x$:**
- Sine: odd powers, alternating signs, starts with $x$
- Cosine: even powers, alternating signs, starts with $1$
- Both have factorials

**For $\frac{1}{1-x}$:** Simplest series: just $1 + x + x^2 + x^3 + \cdots$

**For $\ln(1+x)$:** Alternating, powers in numerator, integers in denominator.

**For $\arctan x$:** Like sine but with integers $1, 3, 5, 7, \ldots$ in denominator instead of factorials.

## Applications

### Approximating Constants

Setting $x = 1$ in $\arctan x$:
$$\frac{\pi}{4} = 1 - \frac{1}{3} + \frac{1}{5} - \frac{1}{7} + \frac{1}{9} - \cdots$$

Though this converges slowly, it's a famous formula.

### Computing Function Values

For small $x$, truncating series gives excellent approximations:
$$e^{0.1} \approx 1 + 0.1 + \frac{0.01}{2} + \frac{0.001}{6} = 1.105166...$$

The true value is $1.105170918...$, so this is accurate to 5 decimal places with only 4 terms!

### Solving Equations

Series can help solve equations like $e^x = 1 + x + x^2$:
$$1 + x + \frac{x^2}{2} + \frac{x^3}{6} + \cdots = 1 + x + x^2$$
$$\frac{x^2}{2} + \frac{x^3}{6} + \cdots = x^2$$

This gives approximate or exact solutions depending on the context.

## Summary

- **Memorize the six essential series:** $e^x$, $\sin x$, $\cos x$, $\frac{1}{1-x}$, $\ln(1+x)$, $\arctan x$
- **Geometric series** is the foundation for building rational function series
- **Exponential, sine, and cosine** have factorial denominators and converge for all $x$
- **Logarithm and arctangent** have integer denominators and limited convergence
- Use **substitution, differentiation, integration** to derive new series
- These series enable **numerical approximation, limit evaluation, and function analysis**
- **Euler's formula** connects exponential and trigonometric series via complex numbers
