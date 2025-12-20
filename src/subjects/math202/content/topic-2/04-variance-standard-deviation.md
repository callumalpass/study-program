---
id: math202-t2-variance
title: "Variance and Standard Deviation"
order: 4
---

# Variance and Standard Deviation

While the expected value tells us the center of a distribution, it says nothing about spread or variability. Two random variables can have the same mean but vastly different behaviors. Variance and standard deviation quantify this spread, measuring how far values typically deviate from the mean.

## Motivation

Consider two random variables:
- $X$: Always equals 10
- $Y$: Equals 0 or 20, each with probability 0.5

Both have $E[X] = E[Y] = 10$, but $X$ has no variability while $Y$ is highly variable. We need a measure to distinguish them.

## Definition of Variance

The **variance** of a random variable $X$ measures the expected squared deviation from the mean:

$$\text{Var}(X) = E[(X - \mu)^2]$$

where $\mu = E[X]$ is the mean.

**Notation:** $\text{Var}(X)$, $V(X)$, $\sigma^2_X$, or simply $\sigma^2$.

### Computing Variance

Using LOTUS (Law of the Unconscious Statistician):

**Discrete:**
$$\text{Var}(X) = \sum_{x} (x - \mu)^2 \cdot p_X(x)$$

**Continuous:**
$$\text{Var}(X) = \int_{-\infty}^{\infty} (x - \mu)^2 \cdot f_X(x) \, dx$$

### Computational Formula

Expanding $(X - \mu)^2$:

$$\text{Var}(X) = E[(X - \mu)^2] = E[X^2 - 2\mu X + \mu^2]$$

By linearity of expectation:
$$= E[X^2] - 2\mu E[X] + \mu^2 = E[X^2] - 2\mu^2 + \mu^2$$

$$\text{Var}(X) = E[X^2] - (E[X])^2$$

This **computational formula** is often easier to use: compute $E[X^2]$ and $E[X]$ separately, then subtract.

**Mnemonic:** "Expected square minus square of expected"

## Example 1: Constant Random Variable

If $X = c$ (constant), then:
$$\text{Var}(X) = E[(c - c)^2] = E[0] = 0$$

Zero variance means no variability, which makes sense for a constant.

## Example 2: Fair Die

Let $X$ be the outcome of a fair six-sided die. We know $E[X] = 3.5$.

First, compute $E[X^2]$:
$$E[X^2] = \sum_{x=1}^{6} x^2 \cdot \frac{1}{6} = \frac{1}{6}(1 + 4 + 9 + 16 + 25 + 36) = \frac{91}{6}$$

Then:
$$\text{Var}(X) = E[X^2] - (E[X])^2 = \frac{91}{6} - (3.5)^2 = \frac{91}{6} - \frac{49}{4}$$

$$= \frac{182}{12} - \frac{147}{12} = \frac{35}{12} \approx 2.917$$

## Example 3: Bernoulli Distribution

For $X \sim \text{Bernoulli}(p)$:

We know $E[X] = p$.

$$E[X^2] = 0^2 \cdot (1-p) + 1^2 \cdot p = p$$

(Note: $X^2 = X$ since $X \in \{0,1\}$)

$$\text{Var}(X) = E[X^2] - (E[X])^2 = p - p^2 = p(1-p)$$

**Observation:** Variance is maximized when $p = 0.5$ (maximum uncertainty).

## Example 4: Uniform Distribution

For $X \sim \text{Uniform}[a,b]$, we know $E[X] = \frac{a+b}{2}$.

$$E[X^2] = \int_a^b x^2 \cdot \frac{1}{b-a} \, dx = \frac{1}{b-a} \cdot \frac{x^3}{3} \bigg|_a^b = \frac{b^3 - a^3}{3(b-a)}$$

$$= \frac{(b-a)(b^2 + ab + a^2)}{3(b-a)} = \frac{a^2 + ab + b^2}{3}$$

$$\text{Var}(X) = \frac{a^2 + ab + b^2}{3} - \left(\frac{a+b}{2}\right)^2$$

$$= \frac{a^2 + ab + b^2}{3} - \frac{a^2 + 2ab + b^2}{4}$$

$$= \frac{4(a^2 + ab + b^2) - 3(a^2 + 2ab + b^2)}{12} = \frac{a^2 - 2ab + b^2}{12} = \frac{(b-a)^2}{12}$$

For $\text{Uniform}[0,1]$: $\text{Var}(X) = \frac{1}{12} \approx 0.0833$.

## Example 5: Exponential Distribution

For $X \sim \text{Exponential}(\lambda)$, we know $E[X] = \frac{1}{\lambda}$.

To find $E[X^2]$, use integration by parts twice:

$$E[X^2] = \int_0^{\infty} x^2 \lambda e^{-\lambda x} \, dx = \frac{2}{\lambda^2}$$

(The derivation is left as an exercise.)

$$\text{Var}(X) = E[X^2] - (E[X])^2 = \frac{2}{\lambda^2} - \frac{1}{\lambda^2} = \frac{1}{\lambda^2}$$

Interestingly, for the exponential distribution, the standard deviation equals the mean.

## Standard Deviation

The **standard deviation** is the square root of the variance:

$$\sigma_X = \sqrt{\text{Var}(X)}$$

**Why take the square root?**

Variance has squared units. If $X$ is measured in meters, $\text{Var}(X)$ is in meters². Taking the square root gives us a measure of spread in the original units.

Standard deviation is often more interpretable than variance for this reason.

### Example 6: Die Roll Standard Deviation

From Example 2: $\text{Var}(X) = \frac{35}{12}$

$$\sigma_X = \sqrt{\frac{35}{12}} \approx 1.708$$

This tells us typical deviations from the mean (3.5) are about 1.7 units.

## Properties of Variance

### Property 1: Non-negativity
$$\text{Var}(X) \geq 0$$

Equality holds if and only if $X$ is constant (almost surely).

### Property 2: Variance of a Constant
$$\text{Var}(c) = 0$$

### Property 3: Scaling
$$\text{Var}(aX) = a^2 \text{Var}(X)$$

**Proof:**
$$\text{Var}(aX) = E[(aX)^2] - (E[aX])^2 = a^2 E[X^2] - a^2(E[X])^2 = a^2(E[X^2] - (E[X])^2) = a^2 \text{Var}(X)$$

**Standard deviation:** $\sigma_{aX} = |a| \sigma_X$

### Property 4: Shift Invariance
$$\text{Var}(X + b) = \text{Var}(X)$$

Adding a constant shifts the distribution but doesn't change the spread.

**Proof:**
$$\text{Var}(X + b) = E[(X+b)^2] - (E[X+b])^2 = E[X^2 + 2bX + b^2] - (E[X] + b)^2$$

$$= E[X^2] + 2b E[X] + b^2 - (E[X])^2 - 2b E[X] - b^2 = E[X^2] - (E[X])^2 = \text{Var}(X)$$

### Property 5: General Linear Transformation
$$\text{Var}(aX + b) = a^2 \text{Var}(X)$$

Combining Properties 3 and 4.

### Property 6: Variance of a Sum (Independent Variables)

**If $X$ and $Y$ are independent:**
$$\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y)$$

**Warning:** This requires independence! Unlike expectation, variance is NOT generally linear.

**Proof for independent variables:**
$$\text{Var}(X + Y) = E[(X+Y)^2] - (E[X+Y])^2$$

$$= E[X^2 + 2XY + Y^2] - (E[X] + E[Y])^2$$

$$= E[X^2] + 2E[XY] + E[Y^2] - (E[X])^2 - 2E[X]E[Y] - (E[Y])^2$$

For independent $X$ and $Y$: $E[XY] = E[X]E[Y]$, so the middle terms cancel:

$$= E[X^2] - (E[X])^2 + E[Y^2] - (E[Y])^2 = \text{Var}(X) + \text{Var}(Y)$$

### General Formula for Sum (Dependent Variables)

$$\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y) + 2\text{Cov}(X,Y)$$

where $\text{Cov}(X,Y)$ is the covariance (covered in a later subtopic).

## Example 7: Binomial Variance

For $X \sim \text{Binomial}(n,p)$, write $X = X_1 + \cdots + X_n$ where $X_i \sim \text{Bernoulli}(p)$ are independent.

$$\text{Var}(X) = \text{Var}(X_1 + \cdots + X_n) = \sum_{i=1}^n \text{Var}(X_i) = n \cdot p(1-p)$$

Since $E[X] = np$, we have:
$$\sigma_X = \sqrt{np(1-p)}$$

For $n = 100, p = 0.5$: $E[X] = 50$ and $\sigma_X = \sqrt{25} = 5$.

## Coefficient of Variation

The **coefficient of variation** is the ratio:

$$CV = \frac{\sigma_X}{|\mu_X|}$$

This is a dimensionless measure of relative variability, useful for comparing variability across different scales.

## Chebyshev's Inequality

Variance allows us to bound probabilities without knowing the full distribution:

**Chebyshev's Inequality:** For any $k > 0$:

$$P(|X - \mu| \geq k\sigma) \leq \frac{1}{k^2}$$

Equivalently:
$$P(|X - \mu| < k\sigma) \geq 1 - \frac{1}{k^2}$$

**Interpretation:** At least $1 - \frac{1}{k^2}$ of the probability mass lies within $k$ standard deviations of the mean.

For $k = 2$: At least 75% of values are within 2 standard deviations of the mean (for ANY distribution).

For $k = 3$: At least 88.9% within 3 standard deviations.

### Example 8: Application of Chebyshev

A random variable has $\mu = 50$ and $\sigma = 5$. What can we say about $P(40 < X < 60)$?

The interval $(40, 60)$ is $\mu \pm 2\sigma$.

By Chebyshev with $k = 2$:
$$P(|X - 50| < 10) \geq 1 - \frac{1}{4} = 0.75$$

At least 75% of the probability is in this interval, regardless of the distribution's shape.

## Variance of Common Distributions

| Distribution | $E[X]$ | $\text{Var}(X)$ |
|--------------|--------|-----------------|
| Bernoulli$(p)$ | $p$ | $p(1-p)$ |
| Binomial$(n,p)$ | $np$ | $np(1-p)$ |
| Geometric$(p)$ | $\frac{1}{p}$ | $\frac{1-p}{p^2}$ |
| Poisson$(\lambda)$ | $\lambda$ | $\lambda$ |
| Uniform$[a,b]$ | $\frac{a+b}{2}$ | $\frac{(b-a)^2}{12}$ |
| Exponential$(\lambda)$ | $\frac{1}{\lambda}$ | $\frac{1}{\lambda^2}$ |
| Normal$(\mu, \sigma^2)$ | $\mu$ | $\sigma^2$ |

## Summary

- **Variance** $\text{Var}(X) = E[(X-\mu)^2] = E[X^2] - (E[X])^2$ measures spread around the mean
- **Standard deviation** $\sigma_X = \sqrt{\text{Var}(X)}$ has the same units as $X$
- $\text{Var}(aX + b) = a^2 \text{Var}(X)$ (variance is not linear)
- For independent $X, Y$: $\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y)$
- **Chebyshev's inequality** bounds tail probabilities using only mean and variance
- Variance complements expected value by quantifying uncertainty and spread
