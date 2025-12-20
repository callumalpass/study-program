---
id: math204-t5-gamma
title: "Gamma Function"
order: 5
---

# The Gamma Function

The gamma function is one of the most important special functions in mathematics, extending the factorial function to all real (and complex) numbers. It appears throughout pure and applied mathematics, from probability theory and statistics to quantum mechanics and complex analysis.

## Definition

The **gamma function** is defined as an improper integral:

$$\Gamma(n) = \int_0^\infty x^{n-1} e^{-x}\,dx, \quad n > 0$$

This integral is improper both at $x = 0$ (Type 2 if $n < 1$) and at $x = \infty$ (Type 1).

**Convergence:** For $n > 0$:
- Near $x = 0$: the integrand behaves like $x^{n-1}$, which gives a convergent p-integral since $n - 1 > -1$ (i.e., $p = 1 - n < 1$)
- As $x \to \infty$: the exponential $e^{-x}$ dominates any polynomial, ensuring convergence

Therefore, $\Gamma(n)$ is well-defined for all $n > 0$.

## Connection to Factorials

The gamma function generalizes factorials:

$$\Gamma(n) = (n-1)! \quad \text{for positive integers } n$$

More precisely, $\Gamma(n+1) = n!$ for non-negative integers $n$.

**Why the shift?** We have $\Gamma(1) = 1 = 0!$, so the gamma function is shifted by one compared to the factorial notation.

**Example 1: Computing $\Gamma(1)$**

$$\Gamma(1) = \int_0^\infty x^{0} e^{-x}\,dx = \int_0^\infty e^{-x}\,dx$$

$$= \lim_{t \to \infty} [-e^{-x}]_0^t = \lim_{t \to \infty} (1 - e^{-t}) = 1$$

**Example 2: Computing $\Gamma(2)$**

$$\Gamma(2) = \int_0^\infty x^{1} e^{-x}\,dx = \int_0^\infty x e^{-x}\,dx$$

Use integration by parts: $u = x$, $dv = e^{-x}dx$, so $du = dx$, $v = -e^{-x}$:

$$= \lim_{t \to \infty} \left[-xe^{-x}\right]_0^t + \int_0^t e^{-x}\,dx$$

$$= \lim_{t \to \infty} \left(-te^{-t} + 0 + [-e^{-x}]_0^t\right) = 0 + 1 = 1$$

So $\Gamma(2) = 1 = 1!$.

## The Fundamental Recursion Formula

The most important property of the gamma function is its recursion relation:

$$\Gamma(n+1) = n \cdot \Gamma(n)$$

**Proof:** Use integration by parts on the definition:

$$\Gamma(n+1) = \int_0^\infty x^n e^{-x}\,dx$$

Let $u = x^n$, $dv = e^{-x}dx$, so $du = nx^{n-1}dx$, $v = -e^{-x}$:

$$= \lim_{t \to \infty} \left[-x^n e^{-x}\right]_0^t + \int_0^t nx^{n-1} e^{-x}\,dx$$

The boundary term vanishes (at $x = 0$ by continuity, at $x = t$ because exponential decay dominates):

$$= 0 + n\int_0^\infty x^{n-1} e^{-x}\,dx = n \cdot \Gamma(n)$$

**Consequence:** Starting from $\Gamma(1) = 1$, we can compute $\Gamma(n)$ for all positive integers:

$$\Gamma(2) = 1 \cdot \Gamma(1) = 1$$
$$\Gamma(3) = 2 \cdot \Gamma(2) = 2 \cdot 1 = 2$$
$$\Gamma(4) = 3 \cdot \Gamma(3) = 3 \cdot 2 = 6$$
$$\Gamma(5) = 4 \cdot \Gamma(4) = 4 \cdot 6 = 24$$

In general: $\Gamma(n+1) = n!$

## The Value at $\frac{1}{2}$

One of the most remarkable values of the gamma function is:

$$\Gamma\left(\frac{1}{2}\right) = \sqrt{\pi}$$

**Proof:**

$$\Gamma\left(\frac{1}{2}\right) = \int_0^\infty x^{-1/2} e^{-x}\,dx$$

Substitute $x = u^2$, so $dx = 2u\,du$:

$$= \int_0^\infty (u^2)^{-1/2} e^{-u^2} \cdot 2u\,du = 2\int_0^\infty e^{-u^2}\,du$$

This is half of the Gaussian integral:

$$\int_{-\infty}^\infty e^{-u^2}\,du = \sqrt{\pi}$$

Therefore:

$$\Gamma\left(\frac{1}{2}\right) = 2 \cdot \frac{\sqrt{\pi}}{2} = \sqrt{\pi}$$

**Using the recursion formula**, we can find other half-integer values:

$$\Gamma\left(\frac{3}{2}\right) = \frac{1}{2} \Gamma\left(\frac{1}{2}\right) = \frac{\sqrt{\pi}}{2}$$

$$\Gamma\left(\frac{5}{2}\right) = \frac{3}{2} \Gamma\left(\frac{3}{2}\right) = \frac{3}{2} \cdot \frac{\sqrt{\pi}}{2} = \frac{3\sqrt{\pi}}{4}$$

$$\Gamma\left(\frac{7}{2}\right) = \frac{5}{2} \Gamma\left(\frac{5}{2}\right) = \frac{5}{2} \cdot \frac{3\sqrt{\pi}}{4} = \frac{15\sqrt{\pi}}{8}$$

**General formula for half-integers:**

$$\Gamma\left(n + \frac{1}{2}\right) = \frac{(2n)!}{4^n n!} \sqrt{\pi} = \frac{1 \cdot 3 \cdot 5 \cdots (2n-1)}{2^n} \sqrt{\pi}$$

## Properties of the Gamma Function

**1. Domain and continuity:** $\Gamma(n)$ is defined and continuous for all $n > 0$.

**2. Extension to negative numbers:** Using the recursion formula backward:
$$\Gamma(n) = \frac{\Gamma(n+1)}{n}$$

This extends $\Gamma$ to negative non-integers. However, $\Gamma$ has poles (is undefined) at $n = 0, -1, -2, -3, \ldots$

**3. Convexity:** $\Gamma(n)$ is convex on $(0, \infty)$, meaning its graph curves upward.

**4. Minimum:** The minimum value of $\Gamma(n)$ for $n > 0$ occurs at $n \approx 1.46$ and equals approximately $0.886$.

**5. Asymptotic behavior:** For large $n$:
$$\Gamma(n) \sim \sqrt{2\pi n} \left(\frac{n}{e}\right)^n \quad \text{(Stirling's approximation)}$$

## Computing with the Gamma Function

**Example 3: Evaluate $\Gamma(6)$**

$$\Gamma(6) = 5! = 120$$

**Example 4: Evaluate $\int_0^\infty x^5 e^{-x}\,dx$**

This matches the gamma function with $n - 1 = 5$, so $n = 6$:

$$\int_0^\infty x^5 e^{-x}\,dx = \Gamma(6) = 5! = 120$$

**Example 5: Evaluate $\int_0^\infty x^{3/2} e^{-x}\,dx$**

Here $n - 1 = 3/2$, so $n = 5/2$:

$$\int_0^\infty x^{3/2} e^{-x}\,dx = \Gamma\left(\frac{5}{2}\right) = \frac{3\sqrt{\pi}}{4}$$

**Example 6: Evaluate $\int_0^\infty \sqrt{x} \, e^{-x}\,dx$**

Here $n - 1 = 1/2$, so $n = 3/2$:

$$\int_0^\infty x^{1/2} e^{-x}\,dx = \Gamma\left(\frac{3}{2}\right) = \frac{\sqrt{\pi}}{2}$$

## Scaling Property

A useful generalization allows us to evaluate integrals with scaled exponentials:

$$\int_0^\infty x^{n-1} e^{-ax}\,dx = \frac{\Gamma(n)}{a^n}, \quad a > 0$$

**Proof:** Substitute $u = ax$, so $x = u/a$ and $dx = du/a$:

$$\int_0^\infty x^{n-1} e^{-ax}\,dx = \int_0^\infty \left(\frac{u}{a}\right)^{n-1} e^{-u} \frac{du}{a}$$

$$= \frac{1}{a^n} \int_0^\infty u^{n-1} e^{-u}\,du = \frac{\Gamma(n)}{a^n}$$

**Example 7: Evaluate $\int_0^\infty x^3 e^{-2x}\,dx$**

Here $n = 4$ and $a = 2$:

$$\int_0^\infty x^3 e^{-2x}\,dx = \frac{\Gamma(4)}{2^4} = \frac{3!}{16} = \frac{6}{16} = \frac{3}{8}$$

**Example 8: Evaluate $\int_0^\infty x^{1/2} e^{-3x}\,dx$**

Here $n = 3/2$ and $a = 3$:

$$\int_0^\infty x^{1/2} e^{-3x}\,dx = \frac{\Gamma(3/2)}{3^{3/2}} = \frac{\sqrt{\pi}/2}{3\sqrt{3}} = \frac{\sqrt{\pi}}{6\sqrt{3}} = \frac{\sqrt{\pi}}{6\sqrt{3}} \cdot \frac{\sqrt{3}}{\sqrt{3}} = \frac{\sqrt{3\pi}}{18}$$

## Connection to the Beta Function

The **beta function** is closely related to the gamma function:

$$B(p, q) = \int_0^1 x^{p-1}(1-x)^{q-1}\,dx$$

**Relationship:**
$$B(p, q) = \frac{\Gamma(p)\Gamma(q)}{\Gamma(p+q)}$$

This formula allows us to evaluate many Type 2 improper integrals using the gamma function.

**Example 9: Evaluate $\int_0^1 x^2(1-x)^3\,dx$**

This is $B(3, 4)$ with $p = 3$ and $q = 4$:

$$B(3, 4) = \frac{\Gamma(3)\Gamma(4)}{\Gamma(7)} = \frac{2! \cdot 3!}{6!} = \frac{2 \cdot 6}{720} = \frac{12}{720} = \frac{1}{60}$$

## Applications

### 1. Probability: Gamma Distribution

The **gamma distribution** with shape parameter $\alpha$ and rate parameter $\beta$ has PDF:

$$f(x) = \frac{\beta^\alpha}{\Gamma(\alpha)} x^{\alpha - 1} e^{-\beta x}, \quad x > 0$$

The normalizing constant involves $\Gamma(\alpha)$ to ensure $\int_0^\infty f(x)\,dx = 1$.

### 2. Quantum Mechanics

The gamma function appears in solutions to the Schrödinger equation for the hydrogen atom and in calculations involving angular momentum.

### 3. Number Theory

The **Riemann zeta function** can be expressed using the gamma function:

$$\zeta(s) = \frac{1}{\Gamma(s)} \int_0^\infty \frac{x^{s-1}}{e^x - 1}\,dx$$

### 4. Complex Analysis

The gamma function extends to the complex plane and satisfies the **reflection formula**:

$$\Gamma(z)\Gamma(1-z) = \frac{\pi}{\sin(\pi z)}$$

## Numerical Values

For reference, here are some key values:

| $n$ | $\Gamma(n)$ |
|-----|-------------|
| $1$ | $1$ |
| $2$ | $1$ |
| $3$ | $2$ |
| $4$ | $6$ |
| $5$ | $24$ |
| $1/2$ | $\sqrt{\pi} \approx 1.772$ |
| $3/2$ | $\frac{\sqrt{\pi}}{2} \approx 0.886$ |
| $5/2$ | $\frac{3\sqrt{\pi}}{4} \approx 1.329$ |

## Common Mistakes

**Mistake 1: Confusing $\Gamma(n)$ with $n!$**

Remember: $\Gamma(n) = (n-1)!$, not $n!$. Alternatively, $\Gamma(n+1) = n!$.

**Mistake 2: Forgetting the scaling factor**

For $\int_0^\infty x^{n-1} e^{-ax}\,dx$, don't forget the $a^n$ in the denominator: $\frac{\Gamma(n)}{a^n}$.

**Mistake 3: Wrong limits**

The gamma function is defined from $0$ to $\infty$. If your limits differ, transform the variable first.

**Mistake 4: Incorrect recursion**

The recursion is $\Gamma(n+1) = n\Gamma(n)$, not $\Gamma(n) = n\Gamma(n-1)$ (though this is equivalent).

## Summary

- The **gamma function** $\Gamma(n) = \int_0^\infty x^{n-1}e^{-x}\,dx$ generalizes factorials
- **Recursion formula:** $\Gamma(n+1) = n\Gamma(n)$
- **Key values:** $\Gamma(1) = 1$, $\Gamma(1/2) = \sqrt{\pi}$
- **Factorial relation:** $\Gamma(n+1) = n!$ for non-negative integers
- **Scaling property:** $\int_0^\infty x^{n-1}e^{-ax}\,dx = \frac{\Gamma(n)}{a^n}$
- **Half-integers:** $\Gamma(n + 1/2)$ involves $\sqrt{\pi}$ and products of odd numbers
- **Applications** include probability distributions, physics, and number theory
- The gamma function connects to the **beta function** via $B(p,q) = \frac{\Gamma(p)\Gamma(q)}{\Gamma(p+q)}$

The gamma function is a cornerstone of advanced mathematics, providing an elegant extension of one of the most fundamental discrete concepts (factorial) to the continuous realm.
