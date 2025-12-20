---
id: math401-topic-5-4
title: "Analytic Continuation"
order: 4
---

# Classification of Singularities

Singularities are points where a function fails to be analytic. Understanding the nature of these points is crucial for complex analysis. Laurent series provide the tool for classifying singularities into three fundamental types: removable, poles, and essential.

## Types of Isolated Singularities

Let $f$ have an isolated singularity at $z_0$ (analytic in $0 < |z - z_0| < r$ for some $r > 0$).

### Removable Singularity

**Definition**: $z_0$ is a **removable singularity** if $\lim_{z \to z_0} f(z)$ exists and is finite.

**Laurent series characterization**: All negative power terms vanish: $a_n = 0$ for $n < 0$.

**Riemann's theorem**: $z_0$ is removable iff $f$ is bounded near $z_0$.

**Example**: $f(z) = \frac{\sin z}{z}$ at $z = 0$ is removable. Define $f(0) = 1$ to make $f$ entire.

### Pole

**Definition**: $z_0$ is a **pole of order $m$** if the Laurent series has the form:
$$f(z) = \frac{a_{-m}}{(z-z_0)^m} + \cdots + \frac{a_{-1}}{z-z_0} + a_0 + \cdots$$

with $a_{-m} \neq 0$ and $a_n = 0$ for $n < -m$.

Equivalently: $\lim_{z \to z_0} |f(z)| = \infty$ and $(z-z_0)^m f(z)$ has a removable singularity at $z_0$.

**Simple pole**: Order $m = 1$.

**Example**: $f(z) = \frac{1}{z^2}$ has a pole of order 2 at $z = 0$.

### Essential Singularity

**Definition**: $z_0$ is an **essential singularity** if it is neither removable nor a pole.

**Laurent series characterization**: Infinitely many negative power terms.

**Weierstrass-Casorati theorem**: Near an essential singularity, $f$ comes arbitrarily close to every complex value.

**Picard's theorem**: Near an essential singularity, $f$ takes on all complex values (with at most one exception) infinitely often.

**Example**: $f(z) = e^{1/z}$ has an essential singularity at $z = 0$.

## Determining Singularity Type

**Method 1**: Compute the Laurent series and check negative powers.

**Method 2**: Check the limit:
- Finite $\implies$ removable
- Infinite $\implies$ pole
- Doesn't exist $\implies$ essential

**Method 3**: For rational functions, poles occur at denominator zeros.

## Summary

- **Removable**: $\lim_{z \to z_0} f(z)$ exists, no negative powers
- **Pole of order $m$**: $(z-z_0)^m f(z)$ has removable singularity
- **Essential**: Infinitely many negative powers in Laurent series
- Classification via Laurent series or limiting behavior
- Crucial for residue calculus and understanding function behavior
