---
id: math401-topic-5-2
title: "Radius of Convergence"
order: 2
---

# Taylor Series Expansion

Taylor series provide a way to represent analytic functions as power series. Every function that is analytic at a point can be expressed as a power series centered at that point, with coefficients determined by the function's derivatives. This representation is fundamental to complex analysis and has no direct analog in real analysis of the same power—in the complex setting, analyticity guarantees the Taylor series representation, whereas in real analysis, smoothness (infinite differentiability) is not sufficient.

## Taylor's Theorem for Complex Functions

**Theorem (Taylor's Theorem)**: If $f$ is analytic on a disk $|z - z_0| < R$, then for all $z$ in this disk:

$$f(z) = \sum_{n=0}^{\infty} \frac{f^{(n)}(z_0)}{n!}(z - z_0)^n$$

This series converges to $f(z)$ throughout the disk.

The key difference from real analysis is that in complex analysis, if $f$ is analytic (complex differentiable) in a region, then it is automatically infinitely differentiable and equals its Taylor series. In real analysis, there exist infinitely differentiable functions whose Taylor series do not converge to the function.

**Proof Sketch**: Use Cauchy's integral formula for derivatives. For $|z - z_0| < r < R$, we have:

$$f(z) = \frac{1}{2\pi i} \oint_{|w-z_0|=r} \frac{f(w)}{w-z} dw$$

We can write:
$$\frac{1}{w-z} = \frac{1}{(w-z_0) - (z-z_0)} = \frac{1}{w-z_0} \cdot \frac{1}{1 - \frac{z-z_0}{w-z_0}}$$

Using the geometric series $\frac{1}{1-u} = \sum_{n=0}^{\infty} u^n$ for $|u| < 1$:

$$\frac{1}{w-z} = \frac{1}{w-z_0} \sum_{n=0}^{\infty} \left(\frac{z-z_0}{w-z_0}\right)^n = \sum_{n=0}^{\infty} \frac{(z-z_0)^n}{(w-z_0)^{n+1}}$$

Substituting back and interchanging sum and integral (justified by uniform convergence):

$$f(z) = \sum_{n=0}^{\infty} \left[\frac{1}{2\pi i} \oint_{|w-z_0|=r} \frac{f(w)}{(w-z_0)^{n+1}} dw\right] (z-z_0)^n$$

By Cauchy's integral formula for derivatives:
$$\frac{1}{2\pi i} \oint_{|w-z_0|=r} \frac{f(w)}{(w-z_0)^{n+1}} dw = \frac{f^{(n)}(z_0)}{n!}$$

Therefore:
$$f(z) = \sum_{n=0}^{\infty} \frac{f^{(n)}(z_0)}{n!}(z - z_0)^n$$

## Computing Taylor Series

There are several methods for finding the Taylor series of a function:

**Method 1: Direct computation** of derivatives:
$$a_n = \frac{f^{(n)}(z_0)}{n!}$$

This method is straightforward but can be tedious if the derivatives are complicated.

**Method 2: Use known series** and algebraic manipulations.

This is often the most efficient approach. Start with known series (like $e^z$, $\sin z$, $\cos z$, $\frac{1}{1-z}$) and use substitution, multiplication, division, and differentiation/integration to obtain new series.

**Method 3: Cauchy's formula**:
$$a_n = \frac{1}{2\pi i} \oint_{|z-z_0|=r} \frac{f(z)}{(z-z_0)^{n+1}} dz$$

This integral formula is theoretically important but rarely used for practical computation.

## Fundamental Examples

### Example 1: Exponential Function $e^z$ at $z_0 = 0$

Since $f^{(n)}(z) = e^z$ for all $n$, we have $f^{(n)}(0) = 1$ for all $n$.

$$e^z = \sum_{n=0}^{\infty} \frac{z^n}{n!} = 1 + z + \frac{z^2}{2!} + \frac{z^3}{3!} + \cdots, \quad R = \infty$$

This series converges for all $z \in \mathbb{C}$, making $e^z$ an entire function.

**Application**: We can derive Euler's formula:
$$e^{i\theta} = \sum_{n=0}^{\infty} \frac{(i\theta)^n}{n!} = \sum_{n=0}^{\infty} \frac{i^n \theta^n}{n!}$$

Separating real and imaginary parts (using $i^n$ cycles through $1, i, -1, -i$):
$$e^{i\theta} = \cos\theta + i\sin\theta$$

### Example 2: Sine Function $\sin z$ at $z_0 = 0$

The derivatives cycle with period 4: $\sin, \cos, -\sin, -\cos, \sin, \ldots$

At $z = 0$: values are $0, 1, 0, -1, 0, 1, \ldots$

So the non-zero terms occur at odd indices with alternating signs:
$$\sin z = \sum_{n=0}^{\infty} \frac{(-1)^n}{(2n+1)!} z^{2n+1} = z - \frac{z^3}{3!} + \frac{z^5}{5!} - \frac{z^7}{7!} + \cdots, \quad R = \infty$$

### Example 3: Cosine Function $\cos z$ at $z_0 = 0$

Similarly, using the derivatives of cosine:
$$\cos z = \sum_{n=0}^{\infty} \frac{(-1)^n}{(2n)!} z^{2n} = 1 - \frac{z^2}{2!} + \frac{z^4}{4!} - \frac{z^6}{6!} + \cdots, \quad R = \infty$$

**Verification of Euler's formula**:
$$e^{iz} = \sum_{n=0}^{\infty} \frac{(iz)^n}{n!} = \sum_{n=0}^{\infty} \frac{i^n z^n}{n!}$$

Separating even and odd terms:
$$= \sum_{n=0}^{\infty} \frac{(-1)^n z^{2n}}{(2n)!} + i\sum_{n=0}^{\infty} \frac{(-1)^n z^{2n+1}}{(2n+1)!} = \cos z + i\sin z$$

### Example 4: Geometric Series $\frac{1}{1-z}$ at $z_0 = 0$

The $n$-th derivative of $\frac{1}{1-z}$ is $\frac{n!}{(1-z)^{n+1}}$, so $f^{(n)}(0) = n!$.

$$\frac{1}{1-z} = \sum_{n=0}^{\infty} z^n = 1 + z + z^2 + z^3 + \cdots, \quad |z| < 1$$

This is the fundamental geometric series, and the radius of convergence is exactly 1 because there is a singularity at $z = 1$.

### Example 5: Logarithm $\log(1 + z)$ at $z_0 = 0$

We can derive this by integrating the geometric series:
$$\frac{1}{1+z} = \sum_{n=0}^{\infty} (-1)^n z^n, \quad |z| < 1$$

Integrating term-by-term from 0 to $z$:
$$\log(1 + z) = \int_0^z \frac{1}{1+w} dw = \sum_{n=0}^{\infty} (-1)^n \int_0^z w^n dw$$

$$= \sum_{n=0}^{\infty} \frac{(-1)^n z^{n+1}}{n+1} = \sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{n}z^n = z - \frac{z^2}{2} + \frac{z^3}{3} - \frac{z^4}{4} + \cdots$$

The radius is $R = 1$. At $z = 1$, we get the alternating harmonic series $\sum \frac{(-1)^{n+1}}{n}$, which converges to $\log 2$. At $z = -1$, we get $-\sum \frac{1}{n}$, which diverges.

### Example 6: Binomial Series $(1+z)^{\alpha}$ for $\alpha \in \mathbb{C}$

For complex $\alpha$, we define:
$$(1+z)^{\alpha} = e^{\alpha \log(1+z)}$$

where we use the principal branch of the logarithm. The Taylor series is:
$$(1+z)^{\alpha} = \sum_{n=0}^{\infty} \binom{\alpha}{n} z^n, \quad |z| < 1$$

where the **generalized binomial coefficient** is:
$$\binom{\alpha}{n} = \frac{\alpha(\alpha-1)(\alpha-2)\cdots(\alpha-n+1)}{n!}$$

For $n = 0$, we define $\binom{\alpha}{0} = 1$.

**Special cases**:
- When $\alpha = m$ is a non-negative integer, the series terminates after $m+1$ terms (becomes a polynomial)
- When $\alpha = -1$: $(1+z)^{-1} = 1 - z + z^2 - z^3 + \cdots$
- When $\alpha = 1/2$: $(1+z)^{1/2} = 1 + \frac{z}{2} - \frac{z^2}{8} + \frac{z^3}{16} - \cdots$

## Taylor Series at Different Centers

**Theorem**: If $f$ is analytic at $z_1$, then $f$ has a Taylor series expansion centered at $z_1$ valid in some disk around $z_1$.

The radius of this new series extends to the nearest singularity of $f$.

### Example: $\frac{1}{1-z}$ centered at $z_0 = i$

We write:
$$\frac{1}{1-z} = \frac{1}{1-i-(z-i)} = \frac{1}{(1-i)[1 - \frac{z-i}{1-i}]}$$

$$= \frac{1}{1-i} \sum_{n=0}^{\infty} \left(\frac{z-i}{1-i}\right)^n = \sum_{n=0}^{\infty} \frac{(z-i)^n}{(1-i)^{n+1}}$$

This series converges for $\left|\frac{z-i}{1-i}\right| < 1$, i.e., $|z - i| < |1 - i| = \sqrt{2}$.

The radius is $\sqrt{2}$, which is exactly the distance from $i$ to the singularity at $z = 1$.

## Uniqueness of Taylor Series

**Theorem**: If $f(z) = \sum_{n=0}^{\infty} a_n(z - z_0)^n$ for $|z - z_0| < R$, then:
$$a_n = \frac{f^{(n)}(z_0)}{n!}$$

This means the Taylor series representation is unique. If a function can be represented as a power series, that representation must be the Taylor series.

**Proof**: Differentiate the power series $k$ times and evaluate at $z_0$. All terms with $n < k$ vanish, the term with $n = k$ gives $k! a_k$, and terms with $n > k$ vanish when evaluated at $z_0$.

## Applications and Connections

### Computing Limits

Taylor series can be used to evaluate limits using L'Hôpital's rule or direct substitution.

**Example**: Evaluate $\lim_{z \to 0} \frac{e^z - 1 - z}{z^2}$.

Using the Taylor series $e^z = 1 + z + \frac{z^2}{2!} + \frac{z^3}{3!} + \cdots$:

$$\frac{e^z - 1 - z}{z^2} = \frac{\frac{z^2}{2!} + \frac{z^3}{3!} + \cdots}{z^2} = \frac{1}{2} + \frac{z}{6} + \cdots \to \frac{1}{2}$$

### Solving Differential Equations

Power series methods can solve differential equations by assuming a series solution and determining coefficients recursively.

### Numerical Approximation

Taylor series provide polynomial approximations to functions, useful for numerical computation.

## Common Mistakes Students Make

1. **Forgetting the radius of convergence**: Always determine where the Taylor series is valid. It only represents the function within its disk of convergence.

2. **Using the wrong center**: The series $\sum \frac{f^{(n)}(z_0)}{n!}(z - z_0)^n$ is centered at $z_0$, not at the origin.

3. **Confusing Taylor and Laurent series**: Taylor series have only non-negative powers. If negative powers appear, you have a Laurent series.

4. **Assuming convergence implies equality**: A Taylor series might converge but not to the original function (though this cannot happen in complex analysis if $f$ is analytic).

5. **Incorrect coefficient formula**: Remember it's $\frac{f^{(n)}(z_0)}{n!}$, not $f^{(n)}(z_0)$ alone.

## Summary

- Taylor series: $f(z) = \sum \frac{f^{(n)}(z_0)}{n!}(z-z_0)^n$
- Valid throughout disk of analyticity
- Coefficients computed from derivatives or Cauchy's formula
- Every analytic function equals its Taylor series (within the disk)
- Radius extends to nearest singularity
- Fundamental tool for approximation and computation
- Unique representation for a given center
- Can be manipulated algebraically (addition, multiplication, composition)
- Essential for understanding function behavior near regular points
