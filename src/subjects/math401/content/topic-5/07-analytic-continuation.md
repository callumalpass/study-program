# Analytic Continuation

Analytic continuation is the process of extending the domain of an analytic function beyond its original region of definition. This powerful technique shows that analytic functions defined on small regions can often be uniquely extended to much larger domains, revealing deep connections between seemingly different function representations.

## The Concept

**Problem**: Given $f$ analytic on domain $D_1$, can we extend $f$ to a larger domain $D_2 \supset D_1$ while preserving analyticity?

**Answer**: If such an extension exists and $D_1$ and $D_2$ overlap, the extension is unique (by the identity theorem).

## Identity Theorem

**Theorem**: If $f$ and $g$ are analytic on connected domain $D$, and $f = g$ on a set with a limit point in $D$, then $f = g$ throughout $D$.

**Consequence**: Analytic continuation is unique when it exists.

## Methods of Continuation

### Power Series Method

If $f$ has a Taylor series $\sum a_n(z - z_0)^n$ with radius $R$, pick a point $z_1$ with $|z_1 - z_0| < R$. Expand $f$ in Taylor series around $z_1$. The new series may converge in a disk extending beyond the original disk.

### Example: Geometric Series

$$f(z) = \sum_{n=0}^{\infty} z^n = \frac{1}{1-z}, \quad |z| < 1$$

The series only converges for $|z| < 1$, but the function $\frac{1}{1-z}$ is analytic on $\mathbb{C} \setminus \{1\}$.

The rational function is the analytic continuation of the series.

### Reflection Principle

**Schwarz reflection principle**: If $f$ is analytic in the upper half-plane and continuous up to the real axis with real values on the real axis, then $f$ can be continued to the lower half-plane by:
$$f(\bar{z}) = \overline{f(z)}$$

## Natural Boundaries

**Definition**: A natural boundary is a curve beyond which analytic continuation is impossible.

**Example**: $\sum_{n=0}^{\infty} z^{2^n}$ has the unit circle $|z| = 1$ as a natural boundary. The function cannot be continued past any point on this circle.

## Riemann Zeta Function

The series $\zeta(s) = \sum_{n=1}^{\infty} n^{-s}$ converges only for $\text{Re}(s) > 1$.

Using the functional equation and other techniques, $\zeta$ extends to a meromorphic function on all of $\mathbb{C}$ with a simple pole at $s = 1$.

This is one of the most important examples of analytic continuation.

## Summary

- Analytic continuation extends domain of analytic functions
- Unique when it exists (identity theorem)
- Methods: power series, functional equations, integral representations
- Not always possible—natural boundaries exist
- Examples: geometric series, Riemann zeta function
- Fundamental to understanding special functions and number theory
