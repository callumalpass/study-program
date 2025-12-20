# Limits at Infinity

While limits at a point describe local behavior, limits at infinity describe how functions behave as inputs grow without bound. This reveals the "end behavior" of functions and identifies horizontal asymptotes.

## Definition

$$\lim_{x \to \infty} f(x) = L$$

means that $f(x)$ approaches $L$ as $x$ increases without bound.

$$\lim_{x \to -\infty} f(x) = L$$

means that $f(x)$ approaches $L$ as $x$ decreases without bound.

If either limit exists and equals a finite number $L$, the line $y = L$ is a **horizontal asymptote**.

## Limits at Infinity for Polynomials

For polynomials, the highest-degree term dominates as $|x| \to \infty$.

**Example:** $\lim_{x \to \infty} (2x^3 - 100x^2 + 1000x)$

The $2x^3$ term dominates:
$$\lim_{x \to \infty} (2x^3 - 100x^2 + 1000x) = \infty$$

**For $x \to -\infty$:**
$$\lim_{x \to -\infty} (2x^3 - 100x^2 + 1000x) = -\infty$$

(Since $x^3$ is negative when $x$ is negative.)

## Rational Functions: The Degree Rule

For rational functions $\frac{P(x)}{Q(x)}$, compare the degrees of numerator and denominator:

### Case 1: Degree of P < Degree of Q

$$\lim_{x \to \pm\infty} \frac{P(x)}{Q(x)} = 0$$

**Example:**
$$\lim_{x \to \infty} \frac{3x^2 + 1}{x^3 - 2} = 0$$

The denominator grows faster, so the fraction shrinks to 0.

### Case 2: Degree of P = Degree of Q

$$\lim_{x \to \pm\infty} \frac{P(x)}{Q(x)} = \frac{\text{leading coefficient of } P}{\text{leading coefficient of } Q}$$

**Example:**
$$\lim_{x \to \infty} \frac{4x^3 - x + 2}{2x^3 + 5x^2} = \frac{4}{2} = 2$$

### Case 3: Degree of P > Degree of Q

$$\lim_{x \to \pm\infty} \frac{P(x)}{Q(x)} = \pm\infty$$

**Example:**
$$\lim_{x \to \infty} \frac{x^4 + 1}{x^2 - 1} = \infty$$

If degree of P = degree of Q + 1, there's an **oblique (slant) asymptote** found by polynomial division.

## Technique: Divide by Highest Power

To evaluate rigorously, divide numerator and denominator by the highest power of $x$ in the denominator.

**Example:**
$$\lim_{x \to \infty} \frac{3x^2 - 2x + 1}{2x^2 + 5}$$

Divide everything by $x^2$:
$$= \lim_{x \to \infty} \frac{3 - \frac{2}{x} + \frac{1}{x^2}}{2 + \frac{5}{x^2}} = \frac{3 - 0 + 0}{2 + 0} = \frac{3}{2}$$

## Exponential Functions

Exponential functions grow faster than any polynomial:

$$\lim_{x \to \infty} \frac{x^n}{e^x} = 0 \quad \text{for any } n$$

$$\lim_{x \to \infty} \frac{e^x}{x^n} = \infty \quad \text{for any } n$$

**Example:**
$$\lim_{x \to \infty} \frac{x^{100}}{e^x} = 0$$

Even $x^{100}$ is eventually dominated by $e^x$.

## Logarithmic Functions

Logarithms grow slower than any positive power:

$$\lim_{x \to \infty} \frac{\ln x}{x^n} = 0 \quad \text{for any } n > 0$$

$$\lim_{x \to \infty} \frac{x^n}{\ln x} = \infty \quad \text{for any } n > 0$$

**Example:**
$$\lim_{x \to \infty} \frac{\ln x}{\sqrt{x}} = 0$$

## Growth Rate Hierarchy

From slowest to fastest growing as $x \to \infty$:

$$\ln x \ll x^{0.001} \ll x^{0.5} \ll x \ll x^2 \ll x^{100} \ll e^x \ll x! \ll x^x$$

The notation $f \ll g$ means $\lim_{x \to \infty} \frac{f(x)}{g(x)} = 0$.

## Square Roots at Infinity

**Be careful with signs when $x \to -\infty$!**

$$\sqrt{x^2} = |x| = \begin{cases} x & \text{if } x \geq 0 \\ -x & \text{if } x < 0 \end{cases}$$

**Example:**
$$\lim_{x \to \infty} \frac{x}{\sqrt{x^2 + 1}}$$

Divide by $|x| = x$ (since $x > 0$):
$$= \lim_{x \to \infty} \frac{1}{\sqrt{1 + 1/x^2}} = \frac{1}{1} = 1$$

**Example:**
$$\lim_{x \to -\infty} \frac{x}{\sqrt{x^2 + 1}}$$

Divide by $|x| = -x$ (since $x < 0$):
$$= \lim_{x \to -\infty} \frac{x}{-x\sqrt{1 + 1/x^2}} = \lim_{x \to -\infty} \frac{-1}{\sqrt{1 + 1/x^2}} = -1$$

## Horizontal Asymptotes

If $\lim_{x \to \infty} f(x) = L$ or $\lim_{x \to -\infty} f(x) = L$, then $y = L$ is a horizontal asymptote.

A function can have:
- No horizontal asymptotes
- One horizontal asymptote (same limit both directions)
- Two horizontal asymptotes (different limits as $x \to \pm\infty$)

**Example:** $f(x) = \frac{x}{\sqrt{x^2 + 1}}$ has horizontal asymptotes $y = 1$ (right) and $y = -1$ (left).

## Oblique (Slant) Asymptotes

When degree of numerator = degree of denominator + 1, divide to find the oblique asymptote.

**Example:** $f(x) = \frac{x^2 + 1}{x - 1}$

Long division: $\frac{x^2 + 1}{x - 1} = x + 1 + \frac{2}{x - 1}$

As $x \to \pm\infty$, $\frac{2}{x-1} \to 0$, so the graph approaches the line $y = x + 1$.

## Summary

- Limits at infinity describe end behavior
- For rational functions: compare degrees of numerator and denominator
- Exponentials dominate polynomials; polynomials dominate logarithms
- Watch the sign of $\sqrt{x^2} = |x|$ when $x \to -\infty$
- Horizontal asymptotes occur when limits at infinity are finite
- Oblique asymptotes occur when numerator degree exceeds denominator by 1
