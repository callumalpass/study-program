---
id: math401-topic-5-1
title: "Power Series Basics"
order: 1
---

# Convergence of Power Series

Power series are infinite series of the form $\sum_{n=0}^{\infty} a_n(z - z_0)^n$, generalizing polynomials to infinitely many terms. These series are fundamental to complex analysis because every analytic function can be represented by a power series (at least locally). Understanding when and where power series converge is essential for working with analytic functions and their applications.

## Definition

A **power series** centered at $z_0 \in \mathbb{C}$ is an infinite series of the form:

$$\sum_{n=0}^{\infty} a_n(z - z_0)^n = a_0 + a_1(z - z_0) + a_2(z - z_0)^2 + \cdots$$

where $a_n \in \mathbb{C}$ are the **coefficients**.

**Special case**: When $z_0 = 0$, we have $\sum_{n=0}^{\infty} a_n z^n$.

## Radius of Convergence

**Theorem (Cauchy-Hadamard)**: For every power series $\sum a_n(z - z_0)^n$, there exists $R \in [0, \infty]$ called the **radius of convergence** such that:

1. The series **converges absolutely** for $|z - z_0| < R$
2. The series **diverges** for $|z - z_0| > R$
3. On $|z - z_0| = R$ (the boundary), convergence varies

The radius is given by:
$$R = \frac{1}{\limsup_{n \to \infty} |a_n|^{1/n}}$$

**Interpretation**: The series converges inside the disk $D(z_0, R)$ and diverges outside. This disk is called the **disk of convergence**.

## Computing the Radius

### Root Test Formula

$$R = \frac{1}{\limsup_{n \to \infty} |a_n|^{1/n}}$$

### Ratio Test Formula

If $\lim_{n \to \infty} \left|\frac{a_{n+1}}{a_n}\right|$ exists, then:

$$R = \lim_{n \to \infty} \left|\frac{a_n}{a_{n+1}}\right|$$

**Examples**:

1. $\sum_{n=0}^{\infty} z^n$: $a_n = 1$, so $R = 1$

2. $\sum_{n=0}^{\infty} \frac{z^n}{n!}$: $\left|\frac{a_n}{a_{n+1}}\right| = \frac{(n+1)!}{n!} = n + 1 \to \infty$, so $R = \infty$

3. $\sum_{n=0}^{\infty} n! z^n$: $\left|\frac{a_n}{a_{n+1}}\right| = \frac{(n+1)!}{n!} = \frac{1}{n+1} \to 0$, so $R = 0$

4. $\sum_{n=1}^{\infty} \frac{z^n}{n}$: $a_n = 1/n$, so $R = 1$

## Absolute and Uniform Convergence

**Theorem**: If $|z - z_0| < R$, then $\sum a_n(z - z_0)^n$ converges absolutely.

**Theorem (Uniform Convergence)**: For any $r < R$, the series converges uniformly on $|z - z_0| \leq r$.

**Consequence**: Power series can be integrated and differentiated term-by-term within the disk of convergence.

## Analyticity of Power Series

**Theorem**: A power series $f(z) = \sum_{n=0}^{\infty} a_n(z - z_0)^n$ represents an analytic function on its disk of convergence $|z - z_0| < R$.

Moreover:
$$f'(z) = \sum_{n=1}^{\infty} na_n(z - z_0)^{n-1}$$

and the derived series has the same radius of convergence $R$.

**Proof**: Term-by-term differentiation is justified by uniform convergence. The Cauchy-Riemann equations are satisfied, proving analyticity.

## Examples

### Example 1: Geometric Series

$$\frac{1}{1-z} = \sum_{n=0}^{\infty} z^n, \quad |z| < 1$$

Radius: $R = 1$. On $|z| = 1$, the series diverges (except at $z = 1$ where it's undefined).

### Example 2: Exponential

$$e^z = \sum_{n=0}^{\infty} \frac{z^n}{n!}, \quad |z| < \infty$$

Radius: $R = \infty$ (entire function).

### Example 3: Logarithm

$$\log(1 + z) = \sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{n}z^n, \quad |z| < 1$$

Radius: $R = 1$. At $z = 1$, gives alternating harmonic series (converges conditionally).

## Summary

- Power series: $\sum a_n(z - z_0)^n$
- Radius of convergence: $R = 1/\limsup |a_n|^{1/n}$
- Converges absolutely for $|z - z_0| < R$, diverges for $|z - z_0| > R$
- Uniform convergence on compact subsets
- Term-by-term differentiation preserves $R$
- Represents analytic function inside disk of convergence
