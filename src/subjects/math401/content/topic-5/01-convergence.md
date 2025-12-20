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

The power series generalizes the concept of a polynomial to infinitely many terms. Just as polynomials are the simplest functions to work with algebraically, power series provide a tractable way to represent and manipulate more complex analytic functions.

## Radius of Convergence

**Theorem (Cauchy-Hadamard)**: For every power series $\sum a_n(z - z_0)^n$, there exists $R \in [0, \infty]$ called the **radius of convergence** such that:

1. The series **converges absolutely** for $|z - z_0| < R$
2. The series **diverges** for $|z - z_0| > R$
3. On $|z - z_0| = R$ (the boundary), convergence varies

The radius is given by:
$$R = \frac{1}{\limsup_{n \to \infty} |a_n|^{1/n}}$$

**Interpretation**: The series converges inside the disk $D(z_0, R)$ and diverges outside. This disk is called the **disk of convergence**.

This theorem is remarkable because it shows that the region of convergence is always a disk (possibly of radius 0 or $\infty$). This geometric simplicity contrasts with real analysis, where power series can have more complicated convergence intervals.

### Proof Sketch of Cauchy-Hadamard Theorem

The proof relies on the root test. For convergence, we need:
$$\limsup_{n \to \infty} |a_n(z - z_0)^n|^{1/n} < 1$$

This simplifies to:
$$|z - z_0| \limsup_{n \to \infty} |a_n|^{1/n} < 1$$

Therefore:
$$|z - z_0| < \frac{1}{\limsup_{n \to \infty} |a_n|^{1/n}} = R$$

Similarly, when $|z - z_0| > R$, the series must diverge. The boundary case $|z - z_0| = R$ requires individual analysis for each series.

## Computing the Radius

### Root Test Formula

$$R = \frac{1}{\limsup_{n \to \infty} |a_n|^{1/n}}$$

This is the most general formula, but the $\limsup$ can sometimes be difficult to compute. When the limit exists, we can use it instead:

$$R = \frac{1}{\lim_{n \to \infty} |a_n|^{1/n}} \quad \text{(when the limit exists)}$$

### Ratio Test Formula

If $\lim_{n \to \infty} \left|\frac{a_{n+1}}{a_n}\right|$ exists, then:

$$R = \lim_{n \to \infty} \left|\frac{a_n}{a_{n+1}}\right|$$

The ratio test is often easier to apply in practice, especially when the coefficients involve factorials or exponentials.

**Important Note**: The ratio test only applies when the limit exists. If $\lim_{n \to \infty} \left|\frac{a_{n+1}}{a_n}\right|$ does not exist, you must use the root test formula.

### Detailed Examples

**Example 1**: $\sum_{n=0}^{\infty} z^n$ (geometric series)

Here $a_n = 1$ for all $n$, so:
$$R = \lim_{n \to \infty} \left|\frac{1}{1}\right| = 1$$

The series converges for $|z| < 1$ and diverges for $|z| > 1$. On the boundary $|z| = 1$, the series diverges at every point (since the terms don't go to zero).

**Example 2**: $\sum_{n=0}^{\infty} \frac{z^n}{n!}$ (exponential series)

Using the ratio test:
$$R = \lim_{n \to \infty} \frac{1/n!}{1/(n+1)!} = \lim_{n \to \infty} \frac{(n+1)!}{n!} = \lim_{n \to \infty} (n + 1) = \infty$$

This series converges for all $z \in \mathbb{C}$. Functions with infinite radius of convergence are called **entire functions**.

**Example 3**: $\sum_{n=0}^{\infty} n! z^n$

Using the ratio test:
$$R = \lim_{n \to \infty} \frac{n!}{(n+1)!} = \lim_{n \to \infty} \frac{1}{n+1} = 0$$

This series converges only at $z = 0$, making it essentially useless for representing functions.

**Example 4**: $\sum_{n=1}^{\infty} \frac{z^n}{n}$ (logarithmic series)

Here $a_n = 1/n$, so:
$$R = \lim_{n \to \infty} \frac{1/n}{1/(n+1)} = \lim_{n \to \infty} \frac{n+1}{n} = 1$$

On the boundary, behavior varies: at $z = 1$ we get the harmonic series (diverges), at $z = -1$ we get the alternating harmonic series (converges conditionally).

**Example 5**: $\sum_{n=0}^{\infty} \frac{z^{2n}}{(2n)!}$ (even terms only)

Let $w = z^2$. Then this is $\sum_{n=0}^{\infty} \frac{w^n}{(2n)!}$. However, we must be careful: the coefficients in terms of $z$ are:
- $a_0 = 1$, $a_1 = 0$, $a_2 = 1/2!$, $a_3 = 0$, $a_4 = 1/4!$, etc.

Using the root test: $\limsup |a_n|^{1/n} = 0$, so $R = \infty$.

## Absolute and Uniform Convergence

**Theorem (Absolute Convergence)**: If $|z - z_0| < R$, then $\sum a_n(z - z_0)^n$ converges absolutely.

**Proof**: Choose $r$ such that $|z - z_0| < r < R$. Then for sufficiently large $n$:
$$|a_n|^{1/n} < \frac{1}{r}$$

So $|a_n(z - z_0)^n| < \left(\frac{|z - z_0|}{r}\right)^n$. Since $|z - z_0|/r < 1$, the geometric series $\sum \left(\frac{|z - z_0|}{r}\right)^n$ converges, and by comparison, $\sum |a_n(z - z_0)^n|$ converges.

**Theorem (Uniform Convergence)**: For any $r < R$, the series converges uniformly on the closed disk $|z - z_0| \leq r$.

**Proof**: For $|z - z_0| \leq r < R$, we have:
$$|a_n(z - z_0)^n| \leq |a_n| r^n$$

Choose $r'$ with $r < r' < R$. For large $n$, $|a_n|^{1/n} < 1/r'$, so $|a_n| r^n < (r/r')^n$. Since $r/r' < 1$, the series $\sum (r/r')^n$ converges, and by the Weierstrass M-test, the power series converges uniformly on $|z - z_0| \leq r$.

**Consequence**: Power series can be integrated and differentiated term-by-term within the disk of convergence.

This is a powerful result. Uniform convergence allows us to interchange the limit and integration or differentiation operations, which is essential for proving many properties of analytic functions.

## Analyticity of Power Series

**Theorem**: A power series $f(z) = \sum_{n=0}^{\infty} a_n(z - z_0)^n$ represents an analytic function on its disk of convergence $|z - z_0| < R$.

Moreover, the derivative can be computed term-by-term:
$$f'(z) = \sum_{n=1}^{\infty} na_n(z - z_0)^{n-1}$$

and the derived series has the same radius of convergence $R$.

**Proof Sketch**: The radius of convergence of the derived series is:
$$R' = \frac{1}{\limsup_{n \to \infty} |na_n|^{1/n}} = \frac{1}{\limsup_{n \to \infty} n^{1/n} |a_n|^{1/n}}$$

Since $\lim_{n \to \infty} n^{1/n} = 1$, we have $R' = R$.

To show $f$ is analytic, we verify that $f'(z)$ exists and is continuous. By uniform convergence on compact sets, we can differentiate term-by-term. The Cauchy-Riemann equations are satisfied because each term $(z - z_0)^n$ is entire.

**Corollary**: Power series can be differentiated infinitely many times within their disk of convergence, and:
$$f^{(k)}(z) = \sum_{n=k}^{\infty} n(n-1)\cdots(n-k+1) a_n(z - z_0)^{n-k}$$

**Corollary**: At the center, we have:
$$a_n = \frac{f^{(n)}(z_0)}{n!}$$

This shows that the coefficients are uniquely determined by the derivatives at $z_0$.

## Boundary Behavior

The behavior on the circle of convergence $|z - z_0| = R$ can be quite varied:

1. **Converges at all points**: Example: $\sum \frac{z^n}{n^2}$ converges on $|z| = 1$
2. **Diverges at all points**: Example: $\sum z^n$ diverges on $|z| = 1$
3. **Converges at some points, diverges at others**: Example: $\sum \frac{z^n}{n}$ converges at $z = -1$, diverges at $z = 1$

There is no general rule—each series must be examined individually on the boundary.

## Common Mistakes Students Make

1. **Confusing radius with diameter**: $R$ is the radius, not the diameter, of the disk of convergence.

2. **Assuming convergence on the boundary**: Just because $|z - z_0| = R$ doesn't mean the series converges there.

3. **Incorrectly applying the ratio test**: Remember that the ratio test gives $R = \lim \frac{a_n}{a_{n+1}}$, not $\lim \frac{a_{n+1}}{a_n}$.

4. **Forgetting absolute value**: When computing $R$ for series with complex coefficients, always use $|a_n|$.

5. **Mixing up center points**: When comparing series centered at different points, remember they have different regions of convergence.

## Summary

- Power series: $\sum a_n(z - z_0)^n$
- Radius of convergence: $R = 1/\limsup |a_n|^{1/n}$
- Converges absolutely for $|z - z_0| < R$, diverges for $|z - z_0| > R$
- Uniform convergence on compact subsets of disk
- Term-by-term differentiation preserves $R$
- Represents analytic function inside disk of convergence
- Boundary behavior varies case by case
