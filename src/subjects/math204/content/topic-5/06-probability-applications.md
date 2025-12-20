---
id: math204-t5-probability
title: "Probability Applications"
order: 6
---

# Probability Applications of Improper Integrals

Probability theory relies heavily on improper integrals. Many probability distributions have infinite support (domains extending to infinity), and computing probabilities, expected values, and variances requires evaluating improper integrals. Understanding these applications bridges abstract calculus with statistical practice.

## Probability Density Functions

A **probability density function** (PDF) is a function $f(x)$ that describes the probability distribution of a continuous random variable $X$.

**Requirements:**
1. **Non-negativity:** $f(x) \geq 0$ for all $x$
2. **Normalization:** $\int_{-\infty}^\infty f(x)\,dx = 1$

The probability that $X$ falls in an interval $[a, b]$ is:
$$P(a \leq X \leq b) = \int_a^b f(x)\,dx$$

**Why improper integrals?** Many important distributions have infinite support (defined over $(-\infty, \infty)$ or $[0, \infty)$), making normalization and probability calculations improper integrals.

## The Exponential Distribution

The **exponential distribution** models waiting times and lifetimes. Its PDF is:

$$f(x) = \begin{cases} \lambda e^{-\lambda x} & x \geq 0 \\ 0 & x < 0 \end{cases}$$

where $\lambda > 0$ is the rate parameter.

### Verification of Normalization

We must verify $\int_{-\infty}^\infty f(x)\,dx = 1$:

$$\int_{-\infty}^\infty f(x)\,dx = \int_{-\infty}^0 0\,dx + \int_0^\infty \lambda e^{-\lambda x}\,dx$$

$$= 0 + \lambda \int_0^\infty e^{-\lambda x}\,dx$$

$$= \lambda \lim_{t \to \infty} \left[-\frac{1}{\lambda}e^{-\lambda x}\right]_0^t = \lambda \lim_{t \to \infty} \left(-\frac{1}{\lambda}e^{-\lambda t} + \frac{1}{\lambda}\right)$$

$$= \lambda \cdot \frac{1}{\lambda} = 1$$

**Example 1: Computing probabilities**

If $X \sim \text{Exp}(2)$ (exponential distribution with $\lambda = 2$), find $P(X > 1)$.

**Solution:**

$$P(X > 1) = \int_1^\infty 2e^{-2x}\,dx = \lim_{t \to \infty} \left[-e^{-2x}\right]_1^t$$

$$= \lim_{t \to \infty} (-e^{-2t} + e^{-2}) = e^{-2} \approx 0.135$$

**Example 2: Probability in an interval**

For the same distribution, find $P(0.5 \leq X \leq 2)$.

**Solution:**

$$P(0.5 \leq X \leq 2) = \int_{0.5}^2 2e^{-2x}\,dx = \left[-e^{-2x}\right]_{0.5}^2$$

$$= -e^{-4} + e^{-1} = e^{-1} - e^{-4} \approx 0.368 - 0.018 = 0.350$$

## Expected Value

The **expected value** (mean) of a continuous random variable $X$ with PDF $f(x)$ is:

$$E[X] = \int_{-\infty}^\infty x f(x)\,dx$$

This is often an improper integral requiring careful evaluation.

### Expected Value of Exponential Distribution

For $X \sim \text{Exp}(\lambda)$:

$$E[X] = \int_0^\infty x \cdot \lambda e^{-\lambda x}\,dx$$

Use integration by parts: $u = x$, $dv = \lambda e^{-\lambda x}dx$:
$$du = dx, \quad v = -e^{-\lambda x}$$

$$E[X] = \lim_{t \to \infty} \left[-xe^{-\lambda x}\right]_0^t + \int_0^t e^{-\lambda x}\,dx$$

The first term: $\lim_{t \to \infty} (-te^{-\lambda t}) = 0$ (exponential dominates).

$$= 0 + \left[-\frac{1}{\lambda}e^{-\lambda x}\right]_0^\infty = \frac{1}{\lambda}$$

**Result:** $E[X] = \frac{1}{\lambda}$

**Example 3: Mean waiting time**

If the average arrival rate is $\lambda = 3$ customers per minute, the expected waiting time until the next customer is:

$$E[X] = \frac{1}{3} \text{ minute} = 20 \text{ seconds}$$

## Variance

The **variance** measures spread and is defined as:

$$\text{Var}(X) = E[X^2] - (E[X])^2$$

We need to compute:
$$E[X^2] = \int_{-\infty}^\infty x^2 f(x)\,dx$$

### Variance of Exponential Distribution

For $X \sim \text{Exp}(\lambda)$:

$$E[X^2] = \int_0^\infty x^2 \cdot \lambda e^{-\lambda x}\,dx$$

This has the form $\int_0^\infty x^2 e^{-\lambda x}\,dx$ with $\lambda$ factor outside.

Using the gamma function scaling property: $\int_0^\infty x^{n-1}e^{-ax}\,dx = \frac{\Gamma(n)}{a^n}$

Here $n = 3$ (since $x^2 = x^{3-1}$) and $a = \lambda$:

$$E[X^2] = \lambda \cdot \frac{\Gamma(3)}{\lambda^3} = \lambda \cdot \frac{2!}{\lambda^3} = \frac{2}{\lambda^2}$$

Therefore:
$$\text{Var}(X) = E[X^2] - (E[X])^2 = \frac{2}{\lambda^2} - \frac{1}{\lambda^2} = \frac{1}{\lambda^2}$$

**Standard deviation:** $\sigma = \frac{1}{\lambda}$ (same as the mean!).

## The Normal Distribution

The **normal (Gaussian) distribution** is the most important probability distribution:

$$f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-(x-\mu)^2/(2\sigma^2)}, \quad -\infty < x < \infty$$

where $\mu$ is the mean and $\sigma > 0$ is the standard deviation.

### The Standard Normal Distribution

For $\mu = 0$ and $\sigma = 1$:

$$\phi(x) = \frac{1}{\sqrt{2\pi}} e^{-x^2/2}$$

**Normalization:** We need to verify:

$$\int_{-\infty}^\infty \frac{1}{\sqrt{2\pi}} e^{-x^2/2}\,dx = 1$$

This requires showing:
$$\int_{-\infty}^\infty e^{-x^2/2}\,dx = \sqrt{2\pi}$$

Or equivalently (substituting $u = x/\sqrt{2}$):
$$\int_{-\infty}^\infty e^{-u^2}\,du = \sqrt{\pi}$$

This is the **Gaussian integral**, proven using polar coordinates (beyond scope here), giving:

$$\Gamma\left(\frac{1}{2}\right) = \sqrt{\pi}$$

**Example 4: Standard normal probability**

Find $P(-1 \leq Z \leq 1)$ for $Z \sim N(0, 1)$.

**Solution:**

$$P(-1 \leq Z \leq 1) = \int_{-1}^1 \frac{1}{\sqrt{2\pi}} e^{-x^2/2}\,dx$$

This integral has no elementary antiderivative. We use numerical methods or tables:

$$P(-1 \leq Z \leq 1) \approx 0.683$$

This is the famous "68% rule"—about 68% of data falls within one standard deviation of the mean.

## The Gamma Distribution

The **gamma distribution** generalizes the exponential distribution:

$$f(x) = \frac{\beta^\alpha}{\Gamma(\alpha)} x^{\alpha-1} e^{-\beta x}, \quad x > 0$$

where $\alpha > 0$ is the shape parameter and $\beta > 0$ is the rate parameter.

### Normalization

Verify $\int_0^\infty f(x)\,dx = 1$:

$$\int_0^\infty \frac{\beta^\alpha}{\Gamma(\alpha)} x^{\alpha-1} e^{-\beta x}\,dx = \frac{\beta^\alpha}{\Gamma(\alpha)} \int_0^\infty x^{\alpha-1} e^{-\beta x}\,dx$$

Using the scaling property of the gamma function:

$$= \frac{\beta^\alpha}{\Gamma(\alpha)} \cdot \frac{\Gamma(\alpha)}{\beta^\alpha} = 1$$

### Expected Value of Gamma Distribution

$$E[X] = \int_0^\infty x \cdot \frac{\beta^\alpha}{\Gamma(\alpha)} x^{\alpha-1} e^{-\beta x}\,dx$$

$$= \frac{\beta^\alpha}{\Gamma(\alpha)} \int_0^\infty x^\alpha e^{-\beta x}\,dx$$

$$= \frac{\beta^\alpha}{\Gamma(\alpha)} \cdot \frac{\Gamma(\alpha+1)}{\beta^{\alpha+1}}$$

Using $\Gamma(\alpha+1) = \alpha\Gamma(\alpha)$:

$$= \frac{\beta^\alpha}{\Gamma(\alpha)} \cdot \frac{\alpha\Gamma(\alpha)}{\beta^{\alpha+1}} = \frac{\alpha}{\beta}$$

**Result:** $E[X] = \frac{\alpha}{\beta}$

**Example 5: Gamma distribution mean**

For $\alpha = 3$ and $\beta = 2$:

$$E[X] = \frac{3}{2} = 1.5$$

## The Pareto Distribution

The **Pareto distribution** models income distributions, city sizes, and other power-law phenomena:

$$f(x) = \frac{\alpha x_m^\alpha}{x^{\alpha+1}}, \quad x \geq x_m > 0$$

where $\alpha > 0$ is the shape parameter and $x_m$ is the minimum value.

### Normalization

$$\int_{x_m}^\infty \frac{\alpha x_m^\alpha}{x^{\alpha+1}}\,dx = \alpha x_m^\alpha \int_{x_m}^\infty x^{-\alpha-1}\,dx$$

$$= \alpha x_m^\alpha \left[\frac{x^{-\alpha}}{-\alpha}\right]_{x_m}^\infty = \alpha x_m^\alpha \cdot \frac{1}{\alpha x_m^\alpha} = 1$$

### Expected Value

$$E[X] = \int_{x_m}^\infty x \cdot \frac{\alpha x_m^\alpha}{x^{\alpha+1}}\,dx = \alpha x_m^\alpha \int_{x_m}^\infty x^{-\alpha}\,dx$$

This converges only if $\alpha > 1$. For $\alpha > 1$:

$$E[X] = \alpha x_m^\alpha \left[\frac{x^{-\alpha+1}}{-\alpha+1}\right]_{x_m}^\infty = \alpha x_m^\alpha \cdot \frac{x_m^{1-\alpha}}{\alpha-1} = \frac{\alpha x_m}{\alpha - 1}$$

**Important:** If $\alpha \leq 1$, the expected value is infinite!

**Example 6: When means don't exist**

For a Pareto distribution with $\alpha = 0.5$ and $x_m = 1$, the mean does not exist because the integral diverges. This happens in real phenomena like certain financial markets.

## Cumulative Distribution Functions

The **cumulative distribution function** (CDF) is:

$$F(x) = P(X \leq x) = \int_{-\infty}^x f(t)\,dt$$

For distributions starting at 0:

$$F(x) = \int_0^x f(t)\,dt$$

**Example 7: Exponential CDF**

For $X \sim \text{Exp}(\lambda)$:

$$F(x) = \int_0^x \lambda e^{-\lambda t}\,dt = \left[-e^{-\lambda t}\right]_0^x = 1 - e^{-\lambda x}$$

So:
$$P(X \leq x) = 1 - e^{-\lambda x}, \quad x \geq 0$$

And:
$$P(X > x) = e^{-\lambda x}$$

## Practical Interpretation

**Example 8: Light bulb lifetime**

Light bulb lifetimes follow an exponential distribution with mean 1000 hours ($\lambda = 0.001$ per hour).

a) What's the probability a bulb lasts more than 1500 hours?

$$P(X > 1500) = e^{-0.001 \cdot 1500} = e^{-1.5} \approx 0.223$$

b) What's the median lifetime?

The median $m$ satisfies $P(X \leq m) = 0.5$:

$$1 - e^{-0.001m} = 0.5$$
$$e^{-0.001m} = 0.5$$
$$-0.001m = \ln(0.5)$$
$$m = \frac{-\ln(0.5)}{0.001} = \frac{\ln 2}{0.001} \approx 693 \text{ hours}$$

## Moment Generating Functions

The **moment generating function** (MGF) is:

$$M_X(t) = E[e^{tX}] = \int_{-\infty}^\infty e^{tx} f(x)\,dx$$

**Example 9: Exponential MGF**

For $X \sim \text{Exp}(\lambda)$:

$$M_X(t) = \int_0^\infty e^{tx} \cdot \lambda e^{-\lambda x}\,dx = \lambda \int_0^\infty e^{-(lambda - t)x}\,dx$$

This converges only for $t < \lambda$:

$$M_X(t) = \lambda \cdot \frac{1}{\lambda - t} = \frac{\lambda}{\lambda - t}, \quad t < \lambda$$

## Summary

- **Probability density functions** require normalization: $\int_{-\infty}^\infty f(x)\,dx = 1$
- **Expected value:** $E[X] = \int_{-\infty}^\infty x f(x)\,dx$
- **Variance:** $\text{Var}(X) = E[X^2] - (E[X])^2$
- **Exponential distribution:** $f(x) = \lambda e^{-\lambda x}$ for $x \geq 0$, with $E[X] = \frac{1}{\lambda}$
- **Normal distribution:** $f(x) = \frac{1}{\sigma\sqrt{2\pi}}e^{-(x-\mu)^2/(2\sigma^2)}$, normalization uses Gaussian integral
- **Gamma distribution:** $f(x) = \frac{\beta^\alpha}{\Gamma(\alpha)}x^{\alpha-1}e^{-\beta x}$, with $E[X] = \frac{\alpha}{\beta}$
- **Pareto distribution:** Heavy-tailed, mean exists only if $\alpha > 1$
- The **gamma function** appears in normalization constants and moment calculations
- Some distributions have **infinite moments** when integrals diverge

Improper integrals are indispensable in probability theory, enabling rigorous treatment of continuous random variables with infinite support and providing the mathematical foundation for statistical inference.
