# Taylor Series Expansion

Taylor series provide a way to represent analytic functions as power series. Every function that is analytic at a point can be expressed as a power series centered at that point, with coefficients determined by the function's derivatives. This representation is fundamental to complex analysis and has no direct analog in real analysis of the same power.

## Taylor's Theorem for Complex Functions

**Theorem (Taylor's Theorem)**: If $f$ is analytic on a disk $|z - z_0| < R$, then for all $z$ in this disk:

$$f(z) = \sum_{n=0}^{\infty} \frac{f^{(n)}(z_0)}{n!}(z - z_0)^n$$

This series converges to $f(z)$ throughout the disk.

**Proof**: Use Cauchy's integral formula for derivatives:
$$f^{(n)}(z_0) = \frac{n!}{2\pi i} \oint_{|w-z_0|=r} \frac{f(w)}{(w-z_0)^{n+1}} dw$$

Apply this to derive the Taylor series representation.

## Computing Taylor Series

**Method 1: Direct computation** of derivatives:
$$a_n = \frac{f^{(n)}(z_0)}{n!}$$

**Method 2: Use known series** and algebraic manipulations.

**Method 3: Cauchy's formula**:
$$a_n = \frac{1}{2\pi i} \oint_{|z-z_0|=r} \frac{f(z)}{(z-z_0)^{n+1}} dz$$

## Examples

### Example 1: $e^z$ at $z_0 = 0$

$f^{(n)}(z) = e^z$, so $f^{(n)}(0) = 1$.
$$e^z = \sum_{n=0}^{\infty} \frac{z^n}{n!}, \quad R = \infty$$

### Example 2: $\sin z$ at $z_0 = 0$

Derivatives cycle: $\sin, \cos, -\sin, -\cos, \ldots$

At $z = 0$: $0, 1, 0, -1, 0, 1, \ldots$

$$\sin z = \sum_{n=0}^{\infty} \frac{(-1)^n}{(2n+1)!} z^{2n+1} = z - \frac{z^3}{3!} + \frac{z^5}{5!} - \cdots$$

### Example 3: $\frac{1}{1-z}$ at $z_0 = 0$

$$\frac{1}{1-z} = \sum_{n=0}^{\infty} z^n, \quad |z| < 1$$

### Example 4: $(1+z)^{\alpha}$ for $\alpha \in \mathbb{C}$

$$( 1+z)^{\alpha} = \sum_{n=0}^{\infty} \binom{\alpha}{n} z^n, \quad |z| < 1$$

where $\binom{\alpha}{n} = \frac{\alpha(\alpha-1)\cdots(\alpha-n+1)}{n!}$.

## Taylor Series at Different Centers

**Theorem**: If $f$ is analytic at $z_1$, then $f$ has a Taylor series expansion centered at $z_1$ valid in some disk around $z_1$.

The radius of this new series extends to the nearest singularity of $f$.

## Summary

- Taylor series: $f(z) = \sum \frac{f^{(n)}(z_0)}{n!}(z-z_0)^n$
- Valid throughout disk of analyticity
- Coefficients computed from derivatives or Cauchy's formula
- Every analytic function equals its Taylor series
- Radius extends to nearest singularity
- Fundamental tool for approximation and computation
