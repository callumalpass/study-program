# Point Estimation

Point estimation is the process of using sample data to calculate a single value (a point estimate) that serves as our best guess for an unknown population parameter. While we know this single value won't be exactly correct, good point estimators have desirable properties that make them reliable tools for inference.

## The Estimation Problem

We observe data $X_1, X_2, \ldots, X_n$ from a population with an unknown parameter $\theta$ (could be mean, variance, proportion, etc.). We want to use this data to estimate $\theta$.

**Point Estimator:** A rule or formula for computing an estimate, denoted $\hat{\theta}$ (read "theta hat"). It's a function of the sample data:
$$\hat{\theta} = h(X_1, X_2, \ldots, X_n)$$

**Point Estimate:** The specific numerical value obtained when we apply the estimator to our particular sample data.

**Key Distinction:** The estimator $\hat{\theta}$ is a random variable (varies from sample to sample). The estimate is a fixed number computed from one specific sample.

**Example:** To estimate the population mean $\mu$:
- Estimator: $\hat{\mu} = \bar{X} = \frac{1}{n}\sum_{i=1}^n X_i$
- Estimate: If we observe data $\{2, 5, 3, 7, 6\}$, the estimate is $\bar{x} = \frac{2+5+3+7+6}{5} = 4.6$

## Properties of Point Estimators

Not all estimators are created equal. We evaluate estimators based on several properties.

### 1. Bias

An estimator is **unbiased** if its expected value equals the parameter being estimated.

**Definition:** $\hat{\theta}$ is unbiased for $\theta$ if:
$$E[\hat{\theta}] = \theta \text{ for all possible values of } \theta$$

**Bias:** The bias of an estimator is:
$$\text{Bias}(\hat{\theta}) = E[\hat{\theta}] - \theta$$

If bias = 0, the estimator is unbiased.

**Interpretation:** If we could repeat the sampling process infinitely many times and average all the estimates, we'd get exactly the true parameter value.

**Example 1: Sample Mean**

For $\bar{X} = \frac{1}{n}\sum_{i=1}^n X_i$:
$$E[\bar{X}] = E\left[\frac{1}{n}\sum_{i=1}^n X_i\right] = \frac{1}{n}\sum_{i=1}^n E[X_i] = \frac{1}{n} \cdot n\mu = \mu$$

Therefore, $\bar{X}$ is an unbiased estimator of $\mu$.

**Example 2: Sample Variance**

Consider two possible estimators for population variance $\sigma^2$:

$$S_n^2 = \frac{1}{n}\sum_{i=1}^n (X_i - \bar{X})^2 \quad \text{(uses } n \text{ divisor)}$$

$$S^2 = \frac{1}{n-1}\sum_{i=1}^n (X_i - \bar{X})^2 \quad \text{(uses } n-1 \text{ divisor)}$$

It can be shown that:
$$E[S_n^2] = \frac{n-1}{n}\sigma^2 \quad \text{(biased, underestimates)}$$

$$E[S^2] = \sigma^2 \quad \text{(unbiased)}$$

This is why we use the $n-1$ divisor—it corrects for the bias. The bias in $S_n^2$ is:
$$\text{Bias}(S_n^2) = \frac{n-1}{n}\sigma^2 - \sigma^2 = -\frac{\sigma^2}{n}$$

**Example 3: Sample Proportion**

For $\hat{p} = \frac{X}{n}$ where $X$ is the count of successes:
$$E[\hat{p}] = E\left[\frac{X}{n}\right] = \frac{1}{n}E[X] = \frac{1}{n}(np) = p$$

So $\hat{p}$ is an unbiased estimator of $p$.

### 2. Variance and Standard Error

Even if an estimator is unbiased, we want it to have small variability—we want estimates to cluster tightly around the true value.

**Variance of an Estimator:**
$$\text{Var}(\hat{\theta}) = E[(\hat{\theta} - E[\hat{\theta}])^2]$$

**Standard Error:** The standard deviation of the estimator:
$$SE(\hat{\theta}) = \sqrt{\text{Var}(\hat{\theta})}$$

**For the sample mean:**
$$\text{Var}(\bar{X}) = \frac{\sigma^2}{n}, \quad SE(\bar{X}) = \frac{\sigma}{\sqrt{n}}$$

**For the sample proportion:**
$$\text{Var}(\hat{p}) = \frac{p(1-p)}{n}, \quad SE(\hat{p}) = \sqrt{\frac{p(1-p)}{n}}$$

**Important:** Standard error decreases as $n$ increases. Larger samples give more precise estimates.

### 3. Mean Squared Error

The **mean squared error (MSE)** combines bias and variance:

$$\text{MSE}(\hat{\theta}) = E[(\hat{\theta} - \theta)^2]$$

This can be decomposed as:
$$\text{MSE}(\hat{\theta}) = \text{Var}(\hat{\theta}) + [\text{Bias}(\hat{\theta})]^2$$

**Proof:**
$$\text{MSE} = E[(\hat{\theta} - \theta)^2] = E[(\hat{\theta} - E[\hat{\theta}] + E[\hat{\theta}] - \theta)^2]$$
$$= E[(\hat{\theta} - E[\hat{\theta}])^2] + 2E[(\hat{\theta} - E[\hat{\theta}])(E[\hat{\theta}] - \theta)] + (E[\hat{\theta}] - \theta)^2$$
$$= \text{Var}(\hat{\theta}) + 0 + [\text{Bias}(\hat{\theta})]^2$$

**For unbiased estimators:** MSE = Variance (since bias = 0).

**Bias-Variance Tradeoff:** Sometimes a slightly biased estimator with much lower variance can have smaller MSE than an unbiased estimator. However, unbiasedness is still generally preferred for interpretability.

### 4. Consistency

An estimator is **consistent** if it converges to the true parameter value as sample size increases.

**Definition:** $\hat{\theta}_n$ is consistent for $\theta$ if for every $\varepsilon > 0$:
$$\lim_{n \to \infty} P(|\hat{\theta}_n - \theta| > \varepsilon) = 0$$

This is convergence in probability: $\hat{\theta}_n \xrightarrow{P} \theta$.

**Sufficient Condition:** If $\lim_{n \to \infty} E[\hat{\theta}_n] = \theta$ and $\lim_{n \to \infty} \text{Var}(\hat{\theta}_n) = 0$, then $\hat{\theta}_n$ is consistent.

**Example:** The sample mean $\bar{X}_n$:
- $E[\bar{X}_n] = \mu$ for all $n$ (unbiased)
- $\text{Var}(\bar{X}_n) = \frac{\sigma^2}{n} \to 0$ as $n \to \infty$

Therefore, $\bar{X}_n$ is consistent for $\mu$.

**Law of Large Numbers:** This is essentially the law of large numbers—sample averages converge to the population mean.

### 5. Efficiency

Among unbiased estimators, we prefer the one with the smallest variance.

**Relative Efficiency:** If $\hat{\theta}_1$ and $\hat{\theta}_2$ are both unbiased for $\theta$, the relative efficiency of $\hat{\theta}_1$ to $\hat{\theta}_2$ is:

$$\text{eff}(\hat{\theta}_1, \hat{\theta}_2) = \frac{\text{Var}(\hat{\theta}_2)}{\text{Var}(\hat{\theta}_1)}$$

If this ratio exceeds 1, then $\hat{\theta}_1$ is more efficient (has lower variance).

**Most Efficient Estimator:** Among all unbiased estimators, the one with minimum variance is called the **minimum variance unbiased estimator (MVUE)** or **best unbiased estimator**.

**Example:** For estimating the mean of a normal distribution, both the sample mean $\bar{X}$ and the sample median $M$ are unbiased. However:

$$\text{Var}(\bar{X}) = \frac{\sigma^2}{n}$$

$$\text{Var}(M) \approx \frac{\pi \sigma^2}{2n} \approx 1.57 \frac{\sigma^2}{n}$$

So $\bar{X}$ is more efficient. In fact, $\bar{X}$ is the MVUE for $\mu$ when sampling from a normal population.

### 6. Sufficiency

A **sufficient statistic** contains all the information in the sample relevant to estimating the parameter.

**Definition:** A statistic $T(X_1, \ldots, X_n)$ is sufficient for $\theta$ if the conditional distribution of the sample given $T$ does not depend on $\theta$.

**Factorization Theorem:** $T$ is sufficient for $\theta$ if and only if the joint density/mass function can be factored as:
$$f(x_1, \ldots, x_n; \theta) = g(T(x_1, \ldots, x_n), \theta) \cdot h(x_1, \ldots, x_n)$$

where $h$ doesn't depend on $\theta$.

**Example:** For $X_1, \ldots, X_n \sim N(\mu, \sigma^2)$ with $\sigma^2$ known, $T = \sum_{i=1}^n X_i$ (equivalently $\bar{X}$) is sufficient for $\mu$.

**Importance:** The best estimators are typically functions of sufficient statistics.

## Common Point Estimators

### Population Mean

**Estimator:** Sample mean
$$\hat{\mu} = \bar{X} = \frac{1}{n}\sum_{i=1}^n X_i$$

- Unbiased: $E[\bar{X}] = \mu$
- Variance: $\text{Var}(\bar{X}) = \frac{\sigma^2}{n}$
- Consistent
- For normal populations, $\bar{X}$ is the MVUE

### Population Variance

**Estimator:** Sample variance
$$\hat{\sigma}^2 = S^2 = \frac{1}{n-1}\sum_{i=1}^n (X_i - \bar{X})^2$$

- Unbiased: $E[S^2] = \sigma^2$
- Variance: $\text{Var}(S^2) = \frac{2\sigma^4}{n-1}$ (for normal populations)
- Consistent

**Note:** The sample standard deviation $S = \sqrt{S^2}$ is *not* unbiased for $\sigma$, but the bias is typically small.

### Population Proportion

**Estimator:** Sample proportion
$$\hat{p} = \frac{X}{n}$$

where $X$ is the number of successes in $n$ trials.

- Unbiased: $E[\hat{p}] = p$
- Variance: $\text{Var}(\hat{p}) = \frac{p(1-p)}{n}$
- Consistent

### Population Median

For symmetric distributions, the sample median $M$ is an unbiased estimator of the population median. However, it's generally less efficient than the sample mean for estimating the center of a normal distribution.

## Evaluating Estimators: A Summary

When choosing among estimators, consider:

1. **Unbiasedness:** Does $E[\hat{\theta}] = \theta$?
2. **Consistency:** Does $\hat{\theta}_n \to \theta$ as $n \to \infty$?
3. **Efficiency:** Among unbiased estimators, which has smallest variance?
4. **Sufficiency:** Is the estimator based on a sufficient statistic?
5. **Robustness:** How sensitive is the estimator to outliers or violations of assumptions?

**General Hierarchy:**
- Prefer unbiased to biased (if bias is substantial)
- Among unbiased, prefer more efficient
- Prefer consistent estimators for large sample situations
- Consider robustness in the presence of outliers

## Example: Comparing Estimators for Center

Suppose we want to estimate the center of a distribution. Three options:

1. **Sample mean** $\bar{X}$: Unbiased, efficient for normal data, sensitive to outliers
2. **Sample median** $M$: Unbiased (for symmetric distributions), less efficient for normal data, robust to outliers
3. **Trimmed mean** (average after removing extreme values): Slightly biased, intermediate efficiency, moderately robust

**Choice depends on:**
- Is the population approximately normal? → Use $\bar{X}$
- Are there outliers? → Consider median or trimmed mean
- Is sample size small? → Efficiency matters more, lean toward $\bar{X}$

## Practical Considerations

**Reporting:** When reporting a point estimate, always include:
1. The estimate itself
2. A measure of precision (standard error or confidence interval)
3. Sample size

**Example:** "The sample mean is 45.3 (SE = 2.1, n = 50)."

**Interpretation:** A point estimate alone doesn't convey uncertainty. Always accompany with interval estimation or standard error to give context about precision.

## Summary

**Key Concepts:**
- **Point estimators** are random variables; point estimates are specific values
- **Unbiased estimators** have expected value equal to the parameter
- **Variance** measures precision; lower variance is better
- **Consistency** means the estimator approaches the true value as $n \to \infty$
- **Efficiency** compares variances among unbiased estimators
- **MSE** balances bias and variance: MSE = Variance + Bias²

**Common Estimators:**
- Population mean: Sample mean $\bar{X}$ (unbiased, efficient)
- Population variance: Sample variance $S^2$ with $n-1$ divisor (unbiased)
- Population proportion: Sample proportion $\hat{p}$ (unbiased)

**Best Practice:** Use estimators that are unbiased (or have negligible bias), consistent, and efficient. For standard parameters in standard situations, the "textbook" estimators ($\bar{X}$, $S^2$, $\hat{p}$) have these properties.
