# Normal Distribution

## Introduction

The normal distribution, also known as the **Gaussian distribution**, is the most important probability distribution in statistics. Its characteristic bell-shaped curve appears throughout nature, science, and social phenomena. Named after Carl Friedrich Gauss, this distribution is fundamental to statistical inference, hypothesis testing, and modeling real-world data.

## Definition and Probability Density Function

A continuous random variable $X$ follows a **normal distribution** with parameters $\mu$ (mean) and $\sigma^2$ (variance) if its probability density function is:

$$f(x) = \frac{1}{\sigma\sqrt{2\pi}} \exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right), \quad -\infty < x < \infty$$

We denote this as $X \sim N(\mu, \sigma^2)$ or $X \sim \mathcal{N}(\mu, \sigma^2)$.

**Parameters:**
- $\mu$ (mu): mean, location parameter, center of the distribution
- $\sigma$ (sigma): standard deviation, scale parameter (spread)
- $\sigma^2$: variance

The PDF has several remarkable properties:

1. **Symmetry:** The curve is symmetric about $x = \mu$
2. **Bell-shaped:** Maximum density at the mean, decreasing smoothly on both sides
3. **Asymptotic:** The tails approach (but never reach) zero as $x \to \pm\infty$
4. **Inflection points:** Occur at $x = \mu \pm \sigma$

## Properties of the Normal Distribution

**Expected Value:**
$$E[X] = \mu$$

**Variance:**
$$\text{Var}(X) = \sigma^2$$

**Standard Deviation:**
$$\text{SD}(X) = \sigma$$

**Median:**
$$\text{Median} = \mu$$

**Mode:**
$$\text{Mode} = \mu$$

The normal distribution is **completely characterized** by its mean and variance. All normal distributions have the same shape; they differ only in location ($\mu$) and scale ($\sigma$).

## The Standard Normal Distribution

The **standard normal distribution** is the special case with $\mu = 0$ and $\sigma = 1$:

$$Z \sim N(0, 1)$$

Its PDF is:
$$\phi(z) = \frac{1}{\sqrt{2\pi}} e^{-z^2/2}$$

Its CDF is:
$$\Phi(z) = P(Z \leq z) = \int_{-\infty}^{z} \frac{1}{\sqrt{2\pi}} e^{-t^2/2} \, dt$$

The CDF $\Phi(z)$ cannot be expressed in closed form but is extensively tabulated and available in all statistical software.

### The 68-95-99.7 Rule (Empirical Rule)

For any normal distribution:

- Approximately **68%** of values fall within $\mu \pm \sigma$ (one standard deviation)
- Approximately **95%** of values fall within $\mu \pm 2\sigma$ (two standard deviations)
- Approximately **99.7%** of values fall within $\mu \pm 3\sigma$ (three standard deviations)

More precisely:
- $P(\mu - \sigma \leq X \leq \mu + \sigma) = 0.6827$
- $P(\mu - 2\sigma \leq X \leq \mu + 2\sigma) = 0.9545$
- $P(\mu - 3\sigma \leq X \leq \mu + 3\sigma) = 0.9973$

This rule provides a quick way to understand the spread of normally distributed data.

## Standardization and Z-Scores

Any normal random variable can be **standardized** to the standard normal distribution.

If $X \sim N(\mu, \sigma^2)$, then:

$$Z = \frac{X - \mu}{\sigma} \sim N(0, 1)$$

The value $z = \frac{x - \mu}{\sigma}$ is called the **z-score** or **standard score** of $x$. It represents:
- How many standard deviations $x$ is from the mean
- Positive if above the mean, negative if below
- Zero if equal to the mean

### Why Standardization Works

$$E[Z] = E\left[\frac{X - \mu}{\sigma}\right] = \frac{1}{\sigma}(E[X] - \mu) = \frac{1}{\sigma}(\mu - \mu) = 0$$

$$\text{Var}(Z) = \text{Var}\left(\frac{X - \mu}{\sigma}\right) = \frac{1}{\sigma^2}\text{Var}(X) = \frac{\sigma^2}{\sigma^2} = 1$$

### Computing Probabilities Using Z-Scores

To find $P(a \leq X \leq b)$ where $X \sim N(\mu, \sigma^2)$:

1. Convert to z-scores: $z_1 = \frac{a - \mu}{\sigma}$, $z_2 = \frac{b - \mu}{\sigma}$
2. Use standard normal table: $P(a \leq X \leq b) = \Phi(z_2) - \Phi(z_1)$

### Worked Example 1: IQ Scores

IQ scores are normally distributed with mean 100 and standard deviation 15. What percentage of people have IQ between 85 and 115?

**Solution:**

Let $X \sim N(100, 15^2)$.

**Convert to z-scores:**
$$z_1 = \frac{85 - 100}{15} = \frac{-15}{15} = -1$$
$$z_2 = \frac{115 - 100}{15} = \frac{15}{15} = 1$$

**Find probability:**
$$P(85 \leq X \leq 115) = P(-1 \leq Z \leq 1) = \Phi(1) - \Phi(-1)$$

From standard normal tables: $\Phi(1) = 0.8413$ and $\Phi(-1) = 0.1587$

$$P(85 \leq X \leq 115) = 0.8413 - 0.1587 = 0.6826$$

Approximately **68.26%** of people have IQ between 85 and 115 (within one standard deviation).

### Worked Example 2: Finding Percentiles

Heights of adult males are normally distributed with mean 70 inches and standard deviation 3 inches. What height represents the 90th percentile?

**Solution:**

Let $X \sim N(70, 3^2)$. We need to find $x$ such that $P(X \leq x) = 0.90$.

**Find critical z-value:**
From standard normal tables, $\Phi(1.28) \approx 0.90$, so $z_{0.90} = 1.28$.

**Convert back to original scale:**
$$x = \mu + z\sigma = 70 + 1.28(3) = 70 + 3.84 = 73.84 \text{ inches}$$

A man at the 90th percentile is approximately 73.84 inches tall.

### Worked Example 3: Quality Control

A machine fills bottles with mean 500 mL and standard deviation 5 mL, normally distributed. Bottles with less than 490 mL are rejected. What percentage is rejected?

**Solution:**

Let $X \sim N(500, 5^2)$. We need $P(X < 490)$.

**Z-score:**
$$z = \frac{490 - 500}{5} = \frac{-10}{5} = -2$$

**Probability:**
$$P(X < 490) = P(Z < -2) = \Phi(-2) = 0.0228$$

Approximately **2.28%** of bottles are rejected.

## Linear Transformations of Normal Variables

If $X \sim N(\mu, \sigma^2)$ and $Y = aX + b$ where $a, b$ are constants, then:

$$Y \sim N(a\mu + b, a^2\sigma^2)$$

This property makes the normal distribution **closed under linear transformation**.

### Example: Temperature Conversion

If temperature in Celsius is $C \sim N(20, 5^2)$, what is the distribution in Fahrenheit?

The conversion is $F = \frac{9}{5}C + 32$.

$$F \sim N\left(\frac{9}{5}(20) + 32, \left(\frac{9}{5}\right)^2 \cdot 25\right) = N(68, 81)$$

So $F \sim N(68, 81)$, meaning mean 68°F with standard deviation 9°F.

## Sum of Independent Normal Variables

If $X_1 \sim N(\mu_1, \sigma_1^2)$ and $X_2 \sim N(\mu_2, \sigma_2^2)$ are independent, then:

$$X_1 + X_2 \sim N(\mu_1 + \mu_2, \sigma_1^2 + \sigma_2^2)$$

More generally, if $X_1, \ldots, X_n$ are independent normal random variables:

$$\sum_{i=1}^{n} X_i \sim N\left(\sum_{i=1}^{n} \mu_i, \sum_{i=1}^{n} \sigma_i^2\right)$$

The normal distribution is **closed under addition**.

### Example: Total Weight

Two packages have weights $W_1 \sim N(10, 0.5^2)$ and $W_2 \sim N(15, 0.8^2)$ kg. What is the distribution of total weight?

$$W_1 + W_2 \sim N(10 + 15, 0.5^2 + 0.8^2) = N(25, 0.89)$$

Total weight is normally distributed with mean 25 kg and standard deviation $\sqrt{0.89} \approx 0.94$ kg.

## Common Standard Normal Values

These values are frequently used:

| z-score | $\Phi(z)$ | Right tail $P(Z > z)$ | Percentile |
|---------|-----------|----------------------|------------|
| -3.00   | 0.0013    | 0.9987              | 0.13%      |
| -2.58   | 0.0049    | 0.9951              | 0.49%      |
| -2.00   | 0.0228    | 0.9772              | 2.28%      |
| -1.96   | 0.0250    | 0.9750              | 2.50%      |
| -1.64   | 0.0505    | 0.9495              | 5.05%      |
| -1.00   | 0.1587    | 0.8413              | 15.87%     |
| 0.00    | 0.5000    | 0.5000              | 50%        |
| 1.00    | 0.8413    | 0.1587              | 84.13%     |
| 1.64    | 0.9495    | 0.0505              | 94.95%     |
| 1.96    | 0.9750    | 0.0250              | 97.50%     |
| 2.00    | 0.9772    | 0.0228              | 97.72%     |
| 2.58    | 0.9951    | 0.0049              | 99.51%     |
| 3.00    | 0.9987    | 0.0013              | 99.87%     |

**Note:** $z = 1.96$ and $z = 2.58$ are particularly important for 95% and 99% confidence intervals.

## Why the Normal Distribution is Important

1. **Central Limit Theorem:** Sums and averages of many independent random variables tend toward normal distribution
2. **Natural phenomena:** Many measurements (heights, weights, errors) are approximately normal
3. **Mathematical tractability:** Analytically convenient for statistical inference
4. **Maximum entropy:** For a given mean and variance, the normal distribution has maximum entropy (least informative distribution)
5. **Foundation of statistics:** Basis for t-tests, ANOVA, regression, and many other methods

## Applications

- **Physical measurements:** Heights, weights, blood pressure
- **Measurement errors:** Instruments, surveys, experiments
- **Financial modeling:** Returns on assets (approximately)
- **Quality control:** Manufacturing tolerances
- **Standardized testing:** SAT, GRE, IQ scores
- **Natural sciences:** Particle physics, astronomy
- **Social sciences:** Psychological traits, survey responses

## Summary

The normal distribution is the cornerstone of statistical theory and practice. Its bell-shaped curve, characterized entirely by mean and variance, describes countless natural and human phenomena. Through standardization and z-scores, we can compute probabilities and percentiles for any normal distribution using the standard normal table. The remarkable properties of the normal distribution—closure under linear transformation and summation, connection to the Central Limit Theorem—make it indispensable for statistical modeling and inference.
