# Zeros and Poles of Analytic Functions

Zeros and poles are fundamental features of analytic and meromorphic functions. Understanding their properties, distribution, and relationship is essential for complex analysis. The argument principle and Rouché's theorem provide powerful tools for counting and locating these critical points.

## Zeros

**Definition**: $z_0$ is a **zero** of $f$ if $f(z_0) = 0$.

**Order/multiplicity**: $z_0$ is a zero of order $m$ if:
$$f(z) = (z - z_0)^m g(z)$$
where $g$ is analytic at $z_0$ and $g(z_0) \neq 0$.

Equivalently: $f(z_0) = f'(z_0) = \cdots = f^{(m-1)}(z_0) = 0$ but $f^{(m)}(z_0) \neq 0$.

### Examples

- $f(z) = z^3$ has a zero of order 3 at $z = 0$
- $f(z) = \sin z$ has simple zeros at $z = n\pi$
- $f(z) = (z^2 + 1)^2$ has zeros of order 2 at $z = \pm i$

### Isolated Zeros

**Theorem**: Zeros of non-zero analytic functions are isolated.

If $f$ is analytic and not identically zero on a domain, zeros cannot accumulate (no limit points of zeros in the domain).

## Poles

**Definition**: $z_0$ is a **pole of order $m$** of $f$ if $f(z) = \frac{g(z)}{(z-z_0)^m}$ where $g$ is analytic at $z_0$ and $g(z_0) \neq 0$.

Equivalently: $(z - z_0)^m f(z)$ has a removable singularity at $z_0$ with non-zero limit.

### Relationship to Zeros

If $f$ has a pole of order $m$ at $z_0$, then $1/f$ has a zero of order $m$ at $z_0$.

Conversely, if $f$ has a zero of order $m$ at $z_0$ and $f \not\equiv 0$, then $1/f$ has a pole of order $m$ at $z_0$.

## Argument Principle

**Theorem**: If $f$ is meromorphic inside and on a simple closed contour $\gamma$, with $N$ zeros and $P$ poles inside $\gamma$ (counted with multiplicity), and $f$ has no zeros or poles on $\gamma$, then:

$$\frac{1}{2\pi i} \oint_\gamma \frac{f'(z)}{f(z)} \, dz = N - P$$

**Interpretation**: The integral counts zeros minus poles.

**Proof**: At a zero of order $m$: $f'/f$ has a simple pole with residue $m$.
At a pole of order $m$: $f'/f$ has a simple pole with residue $-m$.
Apply residue theorem.

## Rouché's Theorem

**Theorem**: If $f$ and $g$ are analytic inside and on a simple closed contour $\gamma$, and $|f(z) - g(z)| < |f(z)|$ on $\gamma$, then $f$ and $g$ have the same number of zeros inside $\gamma$.

**Application**: Proving existence and location of zeros without finding them explicitly.

**Example**: Show $p(z) = z^5 + 3z + 1$ has all zeros in $|z| < 2$.
On $|z| = 2$: $|3z + 1| \leq 7 < 32 = |z^5|$, so by Rouché, $p$ and $z^5$ have the same number of zeros (5) in $|z| < 2$.

## Summary

- Zero of order $m$: $f(z) = (z-z_0)^m g(z)$, $g(z_0) \neq 0$
- Pole of order $m$: $(z-z_0)^m f(z)$ has removable singularity
- Zeros of analytic functions are isolated
- Argument principle: $\frac{1}{2\pi i}\oint \frac{f'}{f} dz = N - P$
- Rouché's theorem: If $|f - g| < |f|$ on contour, $f$ and $g$ have same number of zeros
