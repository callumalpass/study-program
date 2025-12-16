# Sampling Distributions

Understanding sampling distributions is the foundation of statistical inference. When we collect data from a sample, we compute statistics like the sample mean or sample proportion. But these statistics aren't fixed numbers—they vary from sample to sample. The sampling distribution describes this variability and allows us to make probability statements about our estimates.

## The Fundamental Problem

In statistics, we face a universal challenge: we want to learn about a **population** but can only afford to observe a **sample**.

- **Population:** The complete collection of all individuals or items of interest
- **Sample:** A subset of the population that we actually observe
- **Population parameter:** A numerical characteristic of the population (e.g., mean $\mu$, variance $\sigma^2$, proportion $p$)
- **Sample statistic:** A numerical characteristic computed from the sample (e.g., $\bar{X}$, $S^2$, $\hat{p}$)

The key insight: **sample statistics are random variables**. Different random samples from the same population will yield different values of the statistic. To make inferences, we need to understand the probability distribution of these statistics.

## What is a Sampling Distribution?

The **sampling distribution** of a statistic is the probability distribution of that statistic across all possible samples of a given size from the population.

**Formal Definition:** If we:
1. Take all possible samples of size $n$ from a population
2. Compute a statistic (like the mean) for each sample
3. Create the probability distribution of these statistic values

Then we have the sampling distribution of that statistic.

**Key Point:** We typically don't actually enumerate all possible samples. Instead, we use mathematical theory to determine what the sampling distribution looks like.

## Sampling Distribution of the Sample Mean

The most important sampling distribution is that of the sample mean $\bar{X}$.

**Setup:** Suppose we have a population with mean $\mu$ and variance $\sigma^2$. We draw a random sample $X_1, X_2, \ldots, X_n$ and compute:

$$\bar{X} = \frac{1}{n}\sum_{i=1}^n X_i$$

### Properties of $\bar{X}$

**Expected Value:**
$$E[\bar{X}] = \mu$$

This says the sample mean is an **unbiased estimator** of the population mean—on average, it equals what we're trying to estimate.

**Proof:**
$$E[\bar{X}] = E\left[\frac{1}{n}\sum_{i=1}^n X_i\right] = \frac{1}{n}\sum_{i=1}^n E[X_i] = \frac{1}{n} \cdot n\mu = \mu$$

**Variance:**
$$\text{Var}(\bar{X}) = \frac{\sigma^2}{n}$$

This is remarkable: the variance of the sample mean decreases as sample size increases. Larger samples give more precise estimates.

**Proof (for independent observations):**
$$\text{Var}(\bar{X}) = \text{Var}\left(\frac{1}{n}\sum_{i=1}^n X_i\right) = \frac{1}{n^2}\sum_{i=1}^n \text{Var}(X_i) = \frac{1}{n^2} \cdot n\sigma^2 = \frac{\sigma^2}{n}$$

**Standard Error:**
The standard deviation of $\bar{X}$ is called the **standard error**:

$$SE(\bar{X}) = \sqrt{\text{Var}(\bar{X})} = \frac{\sigma}{\sqrt{n}}$$

This measures the typical deviation of a sample mean from the population mean.

## The Central Limit Theorem

The **Central Limit Theorem (CLT)** is one of the most important results in all of statistics.

**Central Limit Theorem:** Let $X_1, X_2, \ldots, X_n$ be independent and identically distributed random variables with mean $\mu$ and variance $\sigma^2$. Then, as $n \to \infty$:

$$\frac{\bar{X} - \mu}{\sigma/\sqrt{n}} \to N(0, 1) \text{ in distribution}$$

Or equivalently:
$$\bar{X} \sim N\left(\mu, \frac{\sigma^2}{n}\right) \text{ approximately, for large } n$$

**What This Means:** No matter what the population distribution looks like (uniform, exponential, heavily skewed), the distribution of the sample mean approaches a normal distribution as sample size increases.

**Rule of Thumb:** For most distributions, $n \geq 30$ is sufficient for the CLT to give a good approximation. For symmetric distributions, even smaller $n$ works. For heavily skewed distributions, you might need $n > 30$.

### Example: Uniform Distribution

Suppose the population is uniform on $[0, 10]$, so $\mu = 5$ and $\sigma^2 = \frac{100}{12} \approx 8.33$.

- For $n = 1$: $\bar{X}$ is uniform (flat, not normal)
- For $n = 5$: $\bar{X}$ starts to look mound-shaped
- For $n = 30$: $\bar{X}$ is very nearly normal with mean 5 and variance $8.33/30 \approx 0.28$

The CLT says:
$$\bar{X} \sim N(5, 0.28) \text{ approximately}$$

Or standardized:
$$Z = \frac{\bar{X} - 5}{\sqrt{8.33/30}} \sim N(0, 1) \text{ approximately}$$

### Why the CLT Matters

The CLT is powerful because:

1. **Universal applicability:** Works regardless of the population distribution
2. **Enables inference:** We can make probability statements about $\bar{X}$ using the normal distribution
3. **Justifies methods:** Confidence intervals and hypothesis tests for means rely on the CLT

**Practical Use:** When $n$ is large, we can write:

$$P\left(\mu - z_{\alpha/2} \cdot \frac{\sigma}{\sqrt{n}} \leq \bar{X} \leq \mu + z_{\alpha/2} \cdot \frac{\sigma}{\sqrt{n}}\right) \approx 1 - \alpha$$

This is the foundation of confidence intervals.

## Sampling Distribution of the Sample Proportion

For categorical data, we work with proportions.

**Setup:** Population has proportion $p$ with a certain characteristic. Draw a sample of size $n$ and let $X$ be the count with the characteristic. Then:

$$\hat{p} = \frac{X}{n}$$

is the **sample proportion**.

### Properties of $\hat{p}$

**Expected Value:**
$$E[\hat{p}] = p$$

The sample proportion is an unbiased estimator of the population proportion.

**Variance:**
$$\text{Var}(\hat{p}) = \frac{p(1-p)}{n}$$

**Standard Error:**
$$SE(\hat{p}) = \sqrt{\frac{p(1-p)}{n}}$$

### Normal Approximation

By the CLT (since $\hat{p}$ is an average of Bernoulli random variables):

$$\hat{p} \sim N\left(p, \frac{p(1-p)}{n}\right) \text{ approximately}$$

**Conditions for approximation:** This works well when both $np \geq 10$ and $n(1-p) \geq 10$.

**Example:** A poll surveys 400 voters. If the true proportion supporting a candidate is $p = 0.55$, what's the probability the sample proportion is between 0.52 and 0.58?

Check conditions: $np = 400(0.55) = 220 \geq 10$ ✓ and $n(1-p) = 180 \geq 10$ ✓

Standard error: $SE = \sqrt{\frac{0.55(0.45)}{400}} = \sqrt{0.0006188} \approx 0.0249$

Standardize:
$$P(0.52 \leq \hat{p} \leq 0.58) = P\left(\frac{0.52 - 0.55}{0.0249} \leq Z \leq \frac{0.58 - 0.55}{0.0249}\right)$$
$$= P(-1.20 \leq Z \leq 1.20) \approx 0.7699$$

There's about a 77% chance the sample proportion falls in this range.

## Sampling Distribution of the Sample Variance

For the sample variance:
$$S^2 = \frac{1}{n-1}\sum_{i=1}^n (X_i - \bar{X})^2$$

If the population is normal with variance $\sigma^2$, then:

$$\frac{(n-1)S^2}{\sigma^2} \sim \chi^2_{n-1}$$

This follows a **chi-squared distribution** with $n-1$ degrees of freedom.

**Properties:**
- $E[S^2] = \sigma^2$ (unbiased)
- $\text{Var}(S^2) = \frac{2\sigma^4}{n-1}$

**Why $n-1$?** We lose one degree of freedom because we use $\bar{X}$ (computed from the data) instead of the true $\mu$. The $n-1$ divisor makes $S^2$ unbiased.

## Sampling Distribution of Differences

Often we compare two groups.

**Two Sample Means:** If $\bar{X}_1$ and $\bar{X}_2$ are independent sample means from populations with means $\mu_1, \mu_2$ and variances $\sigma_1^2, \sigma_2^2$:

$$E[\bar{X}_1 - \bar{X}_2] = \mu_1 - \mu_2$$

$$\text{Var}(\bar{X}_1 - \bar{X}_2) = \frac{\sigma_1^2}{n_1} + \frac{\sigma_2^2}{n_2}$$

By CLT (for large samples):
$$\bar{X}_1 - \bar{X}_2 \sim N\left(\mu_1 - \mu_2, \frac{\sigma_1^2}{n_1} + \frac{\sigma_2^2}{n_2}\right)$$

**Two Sample Proportions:** Similarly:

$$\hat{p}_1 - \hat{p}_2 \sim N\left(p_1 - p_2, \frac{p_1(1-p_1)}{n_1} + \frac{p_2(1-p_2)}{n_2}\right)$$

## Finite Population Correction

When sampling **without replacement** from a finite population of size $N$, if the sample is a substantial fraction of the population, we use the **finite population correction (FPC)**:

$$SE(\bar{X}) = \frac{\sigma}{\sqrt{n}} \cdot \sqrt{\frac{N-n}{N-1}}$$

The factor $\sqrt{\frac{N-n}{N-1}}$ is the FPC. As $N \to \infty$, this approaches 1.

**Rule of Thumb:** If $n < 0.05N$ (sample is less than 5% of population), the FPC is negligible and can be ignored.

## Summary

The sampling distribution framework allows us to:

1. **Quantify uncertainty:** Standard errors measure the precision of estimates
2. **Make probability statements:** Using normal approximations (via CLT)
3. **Construct confidence intervals:** Ranges of plausible parameter values
4. **Perform hypothesis tests:** Assess evidence against null claims

**Key Formulas:**

| Statistic | Mean | Standard Error |
|-----------|------|----------------|
| $\bar{X}$ | $\mu$ | $\frac{\sigma}{\sqrt{n}}$ |
| $\hat{p}$ | $p$ | $\sqrt{\frac{p(1-p)}{n}}$ |
| $\bar{X}_1 - \bar{X}_2$ | $\mu_1 - \mu_2$ | $\sqrt{\frac{\sigma_1^2}{n_1} + \frac{\sigma_2^2}{n_2}}$ |
| $\hat{p}_1 - \hat{p}_2$ | $p_1 - p_2$ | $\sqrt{\frac{p_1(1-p_1)}{n_1} + \frac{p_2(1-p_2)}{n_2}}$ |

**Central Limit Theorem:** For large $n$ (typically $n \geq 30$), sample means are approximately normally distributed regardless of the population distribution.

Understanding sampling distributions transforms statistics from merely describing data to making rigorous inferences about populations from limited samples.
