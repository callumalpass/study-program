---
id: math202-t2-continuous
title: "Continuous Random Variables"
order: 2
---

# Continuous Random Variables

While discrete random variables handle countable outcomes, many real-world quantities are measured on a continuous scale: height, weight, temperature, time, distance. Continuous random variables provide the mathematical framework for modeling such phenomena.

## From Discrete to Continuous

Consider measuring the time until a radioactive atom decays. We might measure to the nearest second, minute, or microsecond, but fundamentally, time is continuous. The key difference:

**Discrete:** $P(X = 5) = 0.2$ makes sense (probability of exactly 5 successes)
**Continuous:** $P(X = 5) = 0$ (probability of any exact value is zero!)

This counterintuitive property is central to continuous random variables: individual points have zero probability, but intervals have positive probability.

## Definition

A random variable $X$ is **continuous** if there exists a non-negative function $f_X(x)$, called the **probability density function** (PDF), such that for any interval $[a,b]$:

$$P(a \leq X \leq b) = \int_a^b f_X(x) \, dx$$

The PDF is not a probability—it's a **density**. The probability is the area under the PDF curve.

### Probability Density Function (PDF)

The PDF $f_X(x)$ must satisfy two properties:

1. **Non-negativity:** $f_X(x) \geq 0$ for all $x \in \mathbb{R}$

2. **Normalization:** $\int_{-\infty}^{\infty} f_X(x) \, dx = 1$

**Critical distinction:** Unlike the PMF where $p_X(x) = P(X = x)$, the PDF value $f_X(x)$ is NOT a probability. In fact:

$$P(X = c) = \int_c^c f_X(x) \, dx = 0$$

for any specific value $c$.

This means for continuous random variables:
$$P(a < X < b) = P(a \leq X < b) = P(a < X \leq b) = P(a \leq X \leq b)$$

Whether we include or exclude endpoints makes no difference.

## Example 1: Uniform Distribution

The simplest continuous distribution is the **uniform distribution** on interval $[a,b]$.

The PDF is:
$$f_X(x) = \begin{cases}
\frac{1}{b-a} & \text{if } a \leq x \leq b \\
0 & \text{otherwise}
\end{cases}$$

This represents complete uncertainty—every value in $[a,b]$ is equally likely (or more precisely, equally dense).

**Verification of normalization:**
$$\int_{-\infty}^{\infty} f_X(x) \, dx = \int_a^b \frac{1}{b-a} \, dx = \frac{1}{b-a} \cdot (b-a) = 1$$ ✓

**Computing probabilities:**

For $X \sim \text{Uniform}[0, 10]$:

$$P(3 \leq X \leq 7) = \int_3^7 \frac{1}{10} \, dx = \frac{1}{10}(7-3) = \frac{4}{10} = 0.4$$

$$P(X < 2) = \int_0^2 \frac{1}{10} \, dx = \frac{2}{10} = 0.2$$

$$P(X = 5) = \int_5^5 \frac{1}{10} \, dx = 0$$

Notice that probability is proportional to interval length: $P(c \leq X \leq d) = \frac{d-c}{b-a}$.

## Example 2: Exponential Distribution

The **exponential distribution** models waiting times and has PDF:

$$f_X(x) = \begin{cases}
\lambda e^{-\lambda x} & \text{if } x \geq 0 \\
0 & \text{if } x < 0
\end{cases}$$

where $\lambda > 0$ is the **rate parameter**.

**Verification of normalization:**
$$\int_0^{\infty} \lambda e^{-\lambda x} \, dx = \lambda \left[ -\frac{1}{\lambda} e^{-\lambda x} \right]_0^{\infty} = \lambda \left(0 - \left(-\frac{1}{\lambda}\right)\right) = 1$$ ✓

**Computing a probability:**

For $X \sim \text{Exponential}(\lambda = 0.5)$, find $P(1 \leq X \leq 3)$:

$$P(1 \leq X \leq 3) = \int_1^3 0.5 e^{-0.5x} \, dx = \left[-e^{-0.5x}\right]_1^3$$
$$= -e^{-1.5} - (-e^{-0.5}) = e^{-0.5} - e^{-1.5} \approx 0.606 - 0.223 = 0.383$$

## Cumulative Distribution Function (CDF)

The CDF for a continuous random variable is:

$$F_X(x) = P(X \leq x) = \int_{-\infty}^x f_X(t) \, dt$$

Unlike discrete CDFs, continuous CDFs are **continuous functions** (no jumps).

### Recovering the PDF from CDF

By the Fundamental Theorem of Calculus:

$$f_X(x) = \frac{d}{dx} F_X(x)$$

wherever the derivative exists.

### Example 3: CDF of Uniform Distribution

For $X \sim \text{Uniform}[a,b]$:

$$F_X(x) = \begin{cases}
0 & \text{if } x < a \\
\frac{x-a}{b-a} & \text{if } a \leq x \leq b \\
1 & \text{if } x > b
\end{cases}$$

**Verification by differentiation:**
$$\frac{d}{dx} F_X(x) = \begin{cases}
0 & \text{if } x < a \\
\frac{1}{b-a} & \text{if } a < x < b \\
0 & \text{if } x > b
\end{cases} = f_X(x)$$ ✓

### Example 4: CDF of Exponential Distribution

For $X \sim \text{Exponential}(\lambda)$:

$$F_X(x) = \begin{cases}
0 & \text{if } x < 0 \\
1 - e^{-\lambda x} & \text{if } x \geq 0
\end{cases}$$

**Derivation:**
$$F_X(x) = \int_0^x \lambda e^{-\lambda t} \, dt = \left[-e^{-\lambda t}\right]_0^x = -e^{-\lambda x} - (-1) = 1 - e^{-\lambda x}$$

**Computing probabilities using CDF:**
$$P(X > x) = 1 - F_X(x) = e^{-\lambda x}$$

This is the **survival function** or **reliability function**.

## Example 5: Normal Distribution

The most important continuous distribution is the **normal** (or **Gaussian**) distribution:

$$f_X(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}, \quad -\infty < x < \infty$$

where:
- $\mu$ is the **mean** (location parameter)
- $\sigma > 0$ is the **standard deviation** (scale parameter)

**Standard normal:** $\mu = 0, \sigma = 1$

$$\phi(x) = \frac{1}{\sqrt{2\pi}} e^{-\frac{x^2}{2}}$$

The CDF has no closed form and is denoted $\Phi(x)$. We use tables or software to evaluate it.

**Properties:**
- Symmetric about $\mu$: $f_X(\mu + a) = f_X(\mu - a)$
- Bell-shaped with maximum at $x = \mu$
- Approximately 68% of probability within $\mu \pm \sigma$
- Approximately 95% within $\mu \pm 2\sigma$
- Approximately 99.7% within $\mu \pm 3\sigma$ (empirical rule)

## Transformations of Random Variables

If $X$ is continuous with PDF $f_X(x)$ and $Y = g(X)$ for some function $g$, how do we find the PDF of $Y$?

### Method 1: CDF Technique

1. Find the CDF of $Y$: $F_Y(y) = P(Y \leq y) = P(g(X) \leq y)$
2. Express in terms of $X$ and use $F_X$
3. Differentiate to get $f_Y(y) = \frac{d}{dy} F_Y(y)$

### Example 6: Linear Transformation

If $X$ has PDF $f_X(x)$ and $Y = aX + b$ where $a > 0$:

$$F_Y(y) = P(Y \leq y) = P(aX + b \leq y) = P\left(X \leq \frac{y-b}{a}\right) = F_X\left(\frac{y-b}{a}\right)$$

Differentiating:
$$f_Y(y) = \frac{d}{dy} F_X\left(\frac{y-b}{a}\right) = f_X\left(\frac{y-b}{a}\right) \cdot \frac{1}{a}$$

**Special case:** If $X \sim \text{Uniform}[0,1]$ and $Y = a + (b-a)X$, then $Y \sim \text{Uniform}[a,b]$.

### Method 2: Change of Variables Formula

For strictly monotone $g$ with inverse $h = g^{-1}$:

$$f_Y(y) = f_X(h(y)) \left| \frac{dh}{dy} \right|$$

The absolute value of the derivative is the **Jacobian** and accounts for the change in scale.

## Interpretation of PDF Values

Since $f_X(x)$ is not a probability, what does it mean?

For small $\Delta x$:
$$P(x \leq X \leq x + \Delta x) \approx f_X(x) \cdot \Delta x$$

So $f_X(x)$ represents **probability per unit length** near $x$.

**Example:** If $f_X(5) = 0.3$, then the probability $X$ falls in a small interval near 5 is approximately $0.3 \cdot \Delta x$.

Note that $f_X(x)$ can exceed 1! For instance, $\text{Uniform}[0, 0.5]$ has $f_X(x) = 2$ on its support. The constraint is that the **total area** equals 1, not that individual density values are ≤ 1.

## Summary

- **Continuous random variables** can take on any value in an interval or union of intervals
- The **PDF** $f_X(x)$ is a density function, not a probability; probabilities are areas under the PDF curve
- $P(X = c) = 0$ for any specific value $c$
- The **CDF** $F_X(x) = \int_{-\infty}^x f_X(t) \, dt$ is a continuous function
- $f_X(x) = F_X'(x)$ (PDF is the derivative of CDF)
- Common distributions: Uniform, Exponential, Normal
- Transformations of continuous random variables can be analyzed using CDF technique or change of variables
