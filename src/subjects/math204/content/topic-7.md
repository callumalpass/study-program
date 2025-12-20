## Introduction

Taylor and Maclaurin series are among the most powerful tools in calculus, allowing us to represent complex functions as infinite polynomials. This remarkable idea transforms difficult functions like $e^x$, $\sin x$, and $\ln(1+x)$ into infinite sums of simple power terms, making them easier to compute, differentiate, integrate, and analyze.

**Why This Matters:**
Taylor series are fundamental to numerical computation, approximation theory, differential equations, and complex analysis. They enable calculators and computers to evaluate transcendental functions, allow physicists to approximate solutions to nonlinear equations, and provide engineers with polynomial models of complicated systems. Understanding Taylor series deepens your appreciation of how functions behave and provides essential tools for applied mathematics, physics, and engineering.

**Learning Objectives:**
- Understand power series, radius of convergence, and interval of convergence
- Perform operations on power series: differentiation, integration, and combination
- Derive Taylor and Maclaurin series for functions
- Memorize and apply common Maclaurin series
- Use Taylor's Remainder Theorem for error estimation
- Apply Taylor series to approximate functions and evaluate limits
- Work with the binomial series and generalized binomial theorem
- Recognize when Taylor series converge to their generating function

---

## Core Concepts

### Power Series

A **power series** is an infinite series of the form:

$$\sum_{n=0}^{\infty} c_n (x - a)^n = c_0 + c_1(x - a) + c_2(x - a)^2 + c_3(x - a)^3 + \cdots$$

where $c_n$ are coefficients and $a$ is the center. For each value of $x$, this is a series of constants that may converge or diverge.

**Key Properties:**
- Every power series has a **radius of convergence** $R$ (possibly 0 or $\infty$)
- The series converges absolutely for $|x - a| < R$
- The series diverges for $|x - a| > R$
- At the endpoints $x = a \pm R$, convergence must be tested separately
- The **interval of convergence** is the set of all $x$ for which the series converges

### Taylor and Maclaurin Series

If a function $f$ has derivatives of all orders at $x = a$, its **Taylor series** centered at $a$ is:

$$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x - a)^n$$

A **Maclaurin series** is simply a Taylor series centered at $a = 0$:

$$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(0)}{n!}x^n = f(0) + f'(0)x + \frac{f''(0)}{2!}x^2 + \frac{f'''(0)}{3!}x^3 + \cdots$$

**Critical Distinction:** A function's Taylor series may converge but not equal $f(x)$. We need Taylor's Remainder Theorem to verify that the series actually represents the function.

### Common Maclaurin Series

These should be memorized:

| Function | Maclaurin Series | Interval |
|----------|------------------|----------|
| $e^x$ | $\displaystyle\sum_{n=0}^{\infty} \frac{x^n}{n!} = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots$ | $(-\infty, \infty)$ |
| $\sin x$ | $\displaystyle\sum_{n=0}^{\infty} \frac{(-1)^n x^{2n+1}}{(2n+1)!} = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \frac{x^7}{7!} + \cdots$ | $(-\infty, \infty)$ |
| $\cos x$ | $\displaystyle\sum_{n=0}^{\infty} \frac{(-1)^n x^{2n}}{(2n)!} = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \frac{x^6}{6!} + \cdots$ | $(-\infty, \infty)$ |
| $\frac{1}{1-x}$ | $\displaystyle\sum_{n=0}^{\infty} x^n = 1 + x + x^2 + x^3 + \cdots$ | $(-1, 1)$ |
| $\ln(1+x)$ | $\displaystyle\sum_{n=1}^{\infty} \frac{(-1)^{n+1} x^n}{n} = x - \frac{x^2}{2} + \frac{x^3}{3} - \frac{x^4}{4} + \cdots$ | $(-1, 1]$ |
| $\arctan x$ | $\displaystyle\sum_{n=0}^{\infty} \frac{(-1)^n x^{2n+1}}{2n+1} = x - \frac{x^3}{3} + \frac{x^5}{5} - \frac{x^7}{7} + \cdots$ | $[-1, 1]$ |

### Operations on Power Series

Within their interval of convergence, power series behave like polynomials:

**Differentiation:**
$$\frac{d}{dx}\left[\sum_{n=0}^{\infty} c_n x^n\right] = \sum_{n=1}^{\infty} n c_n x^{n-1}$$

**Integration:**
$$\int \left[\sum_{n=0}^{\infty} c_n x^n\right] dx = C + \sum_{n=0}^{\infty} \frac{c_n}{n+1} x^{n+1}$$

**Addition/Subtraction:**
$$\sum_{n=0}^{\infty} a_n x^n \pm \sum_{n=0}^{\infty} b_n x^n = \sum_{n=0}^{\infty} (a_n \pm b_n) x^n$$

**Multiplication:**
Power series can be multiplied like polynomials, collecting like powers of $x$.

**Substitution:**
If $\sum_{n=0}^{\infty} c_n x^n$ converges for $|x| < R$, then $\sum_{n=0}^{\infty} c_n (g(x))^n$ converges when $|g(x)| < R$.

### Taylor's Remainder Theorem

The $n$th-degree **Taylor polynomial** is:
$$T_n(x) = \sum_{k=0}^{n} \frac{f^{(k)}(a)}{k!}(x - a)^k$$

The **remainder** (error) is $R_n(x) = f(x) - T_n(x)$.

**Lagrange Form of the Remainder:**
$$R_n(x) = \frac{f^{(n+1)}(c)}{(n+1)!}(x - a)^{n+1}$$

for some $c$ between $a$ and $x$.

**Convergence Criterion:** The Taylor series converges to $f(x)$ if and only if:
$$\lim_{n \to \infty} R_n(x) = 0$$

---

## Common Patterns and Techniques

### Finding a Power Series Representation

**Method 1: Direct Computation**
Compute derivatives, evaluate at the center, and build the series term by term.

**Method 2: Start with Known Series**
Begin with $\frac{1}{1-x} = \sum x^n$ and manipulate:
- Substitute $-x$ for $x$
- Replace $x$ with $x^2$, $2x$, etc.
- Differentiate or integrate
- Multiply by $x$ or constants

**Example:** Find the series for $\frac{1}{1+x^2}$.

Start with $\frac{1}{1-x} = \sum_{n=0}^{\infty} x^n$. Replace $x$ with $-x^2$:
$$\frac{1}{1+x^2} = \sum_{n=0}^{\infty} (-x^2)^n = \sum_{n=0}^{\infty} (-1)^n x^{2n}$$

### Approximating Functions

To approximate $f(x)$ near $x = a$:
1. Find the Taylor polynomial $T_n(x)$ of desired degree
2. Estimate the error using the Lagrange remainder
3. Verify the error is within acceptable bounds

**Key Insight:** Near the center, lower-degree terms dominate. For small $x$:
- $e^x \approx 1 + x + \frac{x^2}{2}$
- $\sin x \approx x - \frac{x^3}{6}$
- $\cos x \approx 1 - \frac{x^2}{2}$

### Evaluating Limits Using Series

When L'Hôpital's Rule becomes tedious, Taylor series often provide elegant solutions:

$$\lim_{x \to 0} \frac{\sin x - x}{x^3} = \lim_{x \to 0} \frac{\left(x - \frac{x^3}{6} + \frac{x^5}{120} - \cdots\right) - x}{x^3} = \lim_{x \to 0} \frac{-\frac{x^3}{6} + \frac{x^5}{120} - \cdots}{x^3} = -\frac{1}{6}$$

### The Binomial Series

For any real number $p$:
$$(1 + x)^p = \sum_{n=0}^{\infty} \binom{p}{n} x^n = 1 + px + \frac{p(p-1)}{2!}x^2 + \frac{p(p-1)(p-2)}{3!}x^3 + \cdots$$

Valid for $|x| < 1$ when $p$ is not a non-negative integer.

**Applications:**
- Square roots: $(1 + x)^{1/2}$
- Reciprocals: $(1 + x)^{-1}$
- Rational powers: $(1 + x)^{2/3}$

---

## Common Mistakes and Debugging

### Mistake 1: Forgetting Factorials
The Taylor series has $\frac{f^{(n)}(a)}{n!}$, not just $f^{(n)}(a)$. Don't forget the factorial!

### Mistake 2: Assuming Series Equals Function
Just because you can write down a Taylor series doesn't mean it converges to the function. Check using the remainder theorem.

### Mistake 3: Wrong Center
Using $f^{(n)}(0)$ when the series is centered at $a \neq 0$. Always use derivatives at the center.

### Mistake 4: Ignoring Radius of Convergence
Power series operations are only valid within the interval of convergence. Don't extrapolate beyond it.

### Mistake 5: Endpoint Confusion
The series may converge at one, both, or neither endpoint of the interval $(a - R, a + R)$. Always check endpoints separately.

---

## Best Practices

1. **Memorize the common series** — $e^x$, $\sin x$, $\cos x$, $\frac{1}{1-x}$, $\ln(1+x)$, $\arctan x$
2. **Start with known series** rather than computing derivatives from scratch
3. **Use substitution and operations** to build new series from old ones
4. **Always find the interval of convergence** when working with power series
5. **Estimate error** using the remainder term when approximating
6. **Think polynomially** — series behave like infinite polynomials within their interval
7. **Verify convergence to the function** using the remainder theorem

---

## Summary

- **Power series** have a radius and interval of convergence determined by ratio or root tests
- **Taylor series** expand functions as infinite polynomials using derivatives at a center point
- **Maclaurin series** are Taylor series centered at 0
- **Common series** should be memorized and used as building blocks
- **Operations** (differentiation, integration, substitution) create new series from known ones
- **Taylor's Remainder Theorem** provides error bounds for polynomial approximations
- **Applications** include numerical computation, limit evaluation, and function approximation
- **Binomial series** generalizes $(1+x)^n$ to non-integer exponents

---

## Further Exploration

- **Complex Analysis:** Taylor series extend to complex functions, with profound consequences
- **Fourier Series:** Representing periodic functions as sums of sines and cosines
- **Differential Equations:** Power series solutions to ODEs
- **Asymptotic Analysis:** Understanding function behavior using truncated series
- **Special Functions:** Bessel functions, Legendre polynomials defined via series
