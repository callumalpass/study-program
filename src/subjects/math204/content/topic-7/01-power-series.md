---
id: math204-t7-power-series
title: "Power Series"
order: 1
---

# Power Series

Power series are infinite polynomials that extend the familiar concept of polynomials to infinitely many terms. They form the foundation for Taylor and Maclaurin series, providing a bridge between discrete polynomials and continuous functions. Understanding power series is essential for approximation theory, numerical analysis, and solving differential equations.

## Definition of a Power Series

A **power series** centered at $a$ is an infinite series of the form:

$$\sum_{n=0}^{\infty} c_n (x - a)^n = c_0 + c_1(x - a) + c_2(x - a)^2 + c_3(x - a)^3 + \cdots$$

where:
- $c_n$ are the **coefficients** (constants)
- $a$ is the **center** of the series
- $x$ is the **variable**
- $n$ is the **index** running from 0 to infinity

When $a = 0$, we get the simpler form:
$$\sum_{n=0}^{\infty} c_n x^n = c_0 + c_1 x + c_2 x^2 + c_3 x^3 + \cdots$$

**Key Insight:** For each specific value of $x$, this becomes a series of constants that we can test for convergence using the techniques from infinite series (ratio test, root test, etc.).

## Examples of Power Series

**Example 1:** The geometric series
$$\sum_{n=0}^{\infty} x^n = 1 + x + x^2 + x^3 + \cdots$$

This has $c_n = 1$ for all $n$ and center $a = 0$. We know from geometric series that this converges to $\frac{1}{1-x}$ when $|x| < 1$.

```plot
{
  "xAxis": { "domain": [-1.5, 1.5], "label": "x" },
  "yAxis": { "domain": [-2, 5], "label": "y" },
  "data": [
    { "fn": "1/(1-x)", "color": "#8b5cf6" }
  ]
}
```

The function $f(x) = \frac{1}{1-x}$ equals the geometric series $\sum x^n$ for $|x| < 1$. The series diverges at and beyond $|x| = 1$ (vertical asymptote at $x = 1$).

**Example 2:** The exponential series
$$\sum_{n=0}^{\infty} \frac{x^n}{n!} = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \frac{x^4}{4!} + \cdots$$

Here $c_n = \frac{1}{n!}$ and this converges to $e^x$ for all real $x$.

```plot
{
  "xAxis": { "domain": [-3, 3], "label": "x" },
  "yAxis": { "domain": [0, 10], "label": "y" },
  "data": [
    { "fn": "exp(x)", "color": "#8b5cf6" }
  ]
}
```

The exponential function $e^x$ equals its power series $\sum \frac{x^n}{n!}$ for all real $x$—the series has infinite radius of convergence.

**Example 3:** A series centered at $a = 2$
$$\sum_{n=0}^{\infty} \frac{(x - 2)^n}{2^n} = 1 + \frac{x-2}{2} + \frac{(x-2)^2}{4} + \frac{(x-2)^3}{8} + \cdots$$

This is centered at $x = 2$ with $c_n = \frac{1}{2^n}$.

## Convergence of Power Series

The fundamental question for any power series is: for which values of $x$ does it converge?

**Theorem (Convergence of Power Series):** For a power series $\sum_{n=0}^{\infty} c_n (x - a)^n$, exactly one of the following is true:

1. The series converges **only at $x = a$** (radius of convergence $R = 0$)
2. The series converges **for all $x$** (radius of convergence $R = \infty$)
3. There exists $R > 0$ such that:
   - The series **converges absolutely** for $|x - a| < R$
   - The series **diverges** for $|x - a| > R$
   - At the endpoints $x = a \pm R$, the series may converge or diverge (must test separately)

The number $R$ is called the **radius of convergence**.

## Finding the Radius of Convergence

We use the **Ratio Test** or **Root Test** to find $R$.

### Method 1: Ratio Test

If $\lim_{n \to \infty} \left|\frac{c_{n+1}}{c_n}\right| = L$, then:
- If $L \neq 0$: $R = \frac{1}{L}$
- If $L = 0$: $R = \infty$
- If $L = \infty$: $R = 0$

**Example 4:** Find the radius of convergence of $\sum_{n=0}^{\infty} \frac{x^n}{n!}$.

$$\lim_{n \to \infty} \left|\frac{c_{n+1}}{c_n}\right| = \lim_{n \to \infty} \frac{1/(n+1)!}{1/n!} = \lim_{n \to \infty} \frac{n!}{(n+1)!} = \lim_{n \to \infty} \frac{1}{n+1} = 0$$

Therefore $R = \infty$. The series converges for all $x$.

**Example 5:** Find the radius of convergence of $\sum_{n=0}^{\infty} n! x^n$.

$$\lim_{n \to \infty} \left|\frac{c_{n+1}}{c_n}\right| = \lim_{n \to \infty} \frac{(n+1)!}{n!} = \lim_{n \to \infty} (n+1) = \infty$$

Therefore $R = 0$. The series converges only at $x = 0$.

**Example 6:** Find the radius of convergence of $\sum_{n=1}^{\infty} \frac{x^n}{n}$.

$$\lim_{n \to \infty} \left|\frac{c_{n+1}}{c_n}\right| = \lim_{n \to \infty} \frac{1/(n+1)}{1/n} = \lim_{n \to \infty} \frac{n}{n+1} = 1$$

Therefore $R = 1$. The series converges for $|x| < 1$ and diverges for $|x| > 1$.

### Method 2: Root Test

If $\lim_{n \to \infty} \sqrt[n]{|c_n|} = L$, then:
- If $L \neq 0$: $R = \frac{1}{L}$
- If $L = 0$: $R = \infty$
- If $L = \infty$: $R = 0$

**Example 7:** Find the radius of convergence of $\sum_{n=0}^{\infty} \frac{x^n}{2^n}$.

$$\lim_{n \to \infty} \sqrt[n]{|c_n|} = \lim_{n \to \infty} \sqrt[n]{\frac{1}{2^n}} = \lim_{n \to \infty} \frac{1}{2} = \frac{1}{2}$$

Therefore $R = 2$. The series converges for $|x| < 2$.

## The Interval of Convergence

The **interval of convergence** is the complete set of $x$ values for which the series converges. It consists of:
1. The open interval $(a - R, a + R)$ where the series definitely converges
2. Possibly one or both endpoints, which must be tested separately

### Testing Endpoints

To test convergence at an endpoint, substitute the endpoint value into the series and use standard convergence tests (alternating series test, p-series test, comparison test, etc.).

**Example 8:** Find the interval of convergence of $\sum_{n=1}^{\infty} \frac{x^n}{n}$.

We found $R = 1$, so we need to test $x = -1$ and $x = 1$.

**At $x = 1$:**
$$\sum_{n=1}^{\infty} \frac{1^n}{n} = \sum_{n=1}^{\infty} \frac{1}{n}$$
This is the harmonic series, which diverges.

**At $x = -1$:**
$$\sum_{n=1}^{\infty} \frac{(-1)^n}{n} = -\frac{1}{1} + \frac{1}{2} - \frac{1}{3} + \frac{1}{4} - \cdots$$
This is the alternating harmonic series, which converges by the alternating series test.

**Interval of convergence:** $[-1, 1)$ (includes $-1$, excludes $1$).

**Example 9:** Find the interval of convergence of $\sum_{n=0}^{\infty} \frac{(x-3)^n}{n^2}$.

First, find $R$:
$$\lim_{n \to \infty} \left|\frac{c_{n+1}}{c_n}\right| = \lim_{n \to \infty} \frac{1/(n+1)^2}{1/n^2} = \lim_{n \to \infty} \frac{n^2}{(n+1)^2} = 1$$

So $R = 1$ and the series converges for $|x - 3| < 1$, i.e., $2 < x < 4$.

**At $x = 2$:**
$$\sum_{n=0}^{\infty} \frac{(-1)^n}{n^2}$$
This converges absolutely (p-series with $p = 2 > 1$).

**At $x = 4$:**
$$\sum_{n=0}^{\infty} \frac{1^n}{n^2} = \sum_{n=0}^{\infty} \frac{1}{n^2}$$
This converges (p-series with $p = 2 > 1$).

**Interval of convergence:** $[2, 4]$ (includes both endpoints).

## Representing Functions as Power Series

When a power series converges on an interval, it defines a function:

$$f(x) = \sum_{n=0}^{\infty} c_n (x - a)^n$$

This function is well-defined for all $x$ in the interval of convergence.

**Example 10:** The function $f(x) = \frac{1}{1-x}$

We know the geometric series gives:
$$\frac{1}{1-x} = \sum_{n=0}^{\infty} x^n = 1 + x + x^2 + x^3 + \cdots$$

for $|x| < 1$. This is a power series representation of $f(x) = \frac{1}{1-x}$.

**Example 11:** Find a power series representation for $g(x) = \frac{1}{1+x^2}$.

Start with $\frac{1}{1-x} = \sum_{n=0}^{\infty} x^n$ and substitute $-x^2$ for $x$:

$$\frac{1}{1-(-x^2)} = \frac{1}{1+x^2} = \sum_{n=0}^{\infty} (-x^2)^n = \sum_{n=0}^{\infty} (-1)^n x^{2n}$$

This gives:
$$\frac{1}{1+x^2} = 1 - x^2 + x^4 - x^6 + x^8 - \cdots$$

for $|x| < 1$ (since we need $|-x^2| < 1$, which gives $|x| < 1$).

## Properties of Power Series Functions

Functions defined by power series have remarkable properties:

1. **Continuity:** $f(x) = \sum_{n=0}^{\infty} c_n (x - a)^n$ is continuous on $(a - R, a + R)$

2. **Differentiability:** $f$ is infinitely differentiable on $(a - R, a + R)$, and we can differentiate term by term

3. **Integrability:** $f$ can be integrated term by term on $(a - R, a + R)$

4. **Uniqueness:** If two power series centered at $a$ represent the same function, their coefficients must be equal: $c_n = d_n$ for all $n$

## Summary

- A **power series** is an infinite sum $\sum_{n=0}^{\infty} c_n (x - a)^n$
- Every power series has a **radius of convergence** $R$ (possibly 0 or $\infty$)
- Use the **ratio test** or **root test** to find $R$
- The series converges absolutely for $|x - a| < R$ and diverges for $|x - a| > R$
- The **interval of convergence** includes the open interval plus any convergent endpoints
- **Always test endpoints separately** using standard convergence tests
- Power series define functions that are continuous, differentiable, and integrable within their interval of convergence
- Power series provide a way to represent complicated functions as "infinite polynomials"
