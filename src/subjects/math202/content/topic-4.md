## Introduction

Statistical inference is the process of drawing conclusions about populations based on sample data. This is one of the most powerful and practical areas of statistics, allowing us to make informed decisions despite uncertainty and incomplete information. Where descriptive statistics summarize data, inferential statistics lets us generalize findings and quantify our confidence in those generalizations.

**Why This Matters:**
Statistical inference underpins scientific research, quality control, medical trials, polling, A/B testing, and countless business decisions. When pharmaceutical companies test new drugs on sample groups, when pollsters predict election outcomes from surveying a fraction of voters, or when engineers estimate product failure rates, they're using statistical inference. Understanding these techniques is essential for data-driven decision making in any field.

**Learning Objectives:**
- Understand sampling distributions and the Central Limit Theorem
- Distinguish between point estimation and interval estimation
- Apply the method of moments to estimate parameters
- Use maximum likelihood estimation to find optimal estimators
- Construct and interpret confidence intervals for means, proportions, and variances
- Determine appropriate sample sizes for desired precision

---

## Core Concepts

### Sampling and Statistical Inference

The fundamental problem of statistics: we want to learn about a **population** (the entire group of interest) but can only observe a **sample** (a subset of the population).

- **Population parameter:** A numerical characteristic of the population (e.g., mean $\mu$, variance $\sigma^2$)
- **Sample statistic:** A numerical characteristic computed from sample data (e.g., sample mean $\bar{X}$, sample variance $S^2$)
- **Estimator:** A formula/rule for computing an estimate from sample data
- **Estimate:** The specific numerical value obtained from a particular sample

**Key Insight:** Sample statistics are random variables—different samples yield different values. Understanding their distributions is crucial for inference.

### Sampling Distributions

The **sampling distribution** of a statistic is the probability distribution of that statistic across all possible samples of size $n$.

**Central Limit Theorem (CLT):** For large enough sample sizes, the sampling distribution of the sample mean is approximately normal, regardless of the population distribution:

$$\bar{X} \sim N\left(\mu, \frac{\sigma^2}{n}\right) \text{ approximately, for large } n$$

This remarkable result is why the normal distribution appears everywhere in statistics.

**Standard Error:** The standard deviation of a sampling distribution is called the standard error. For the sample mean:

$$SE(\bar{X}) = \frac{\sigma}{\sqrt{n}}$$

This decreases as sample size increases, meaning larger samples give more precise estimates.

### Point Estimation

A **point estimator** is a single value used to estimate a population parameter. Desirable properties include:

1. **Unbiased:** $E[\hat{\theta}] = \theta$ (estimator's expected value equals the parameter)
2. **Consistent:** $\hat{\theta}_n \to \theta$ as $n \to \infty$ (converges to true value with large samples)
3. **Efficient:** Has minimum variance among unbiased estimators

**Common Point Estimators:**
- Population mean $\mu$: Sample mean $\bar{X} = \frac{1}{n}\sum_{i=1}^n X_i$
- Population variance $\sigma^2$: Sample variance $S^2 = \frac{1}{n-1}\sum_{i=1}^n (X_i - \bar{X})^2$
- Population proportion $p$: Sample proportion $\hat{p} = \frac{X}{n}$

Note the $n-1$ divisor in $S^2$—this makes it unbiased, correcting for underestimation.

### Method of Moments

The **method of moments** equates population moments to sample moments to solve for parameter estimates.

**Procedure:**
1. Express the first $k$ population moments as functions of the parameters
2. Set these equal to the corresponding sample moments
3. Solve the resulting system of equations for the parameters

For one-parameter distributions, we typically use the first moment (mean). For two-parameter distributions, we use both mean and variance.

**Example:** For $X \sim \text{Exponential}(\lambda)$:
- Population mean: $E[X] = \frac{1}{\lambda}$
- Set $\bar{X} = \frac{1}{\lambda}$
- Solve: $\hat{\lambda}_{\text{MM}} = \frac{1}{\bar{X}}$

### Maximum Likelihood Estimation

**Maximum likelihood estimation (MLE)** finds parameter values that maximize the probability of observing the data.

**Likelihood Function:** For observations $x_1, \ldots, x_n$:
$$L(\theta) = \prod_{i=1}^n f(x_i; \theta)$$

**Log-Likelihood:** Usually easier to work with:
$$\ell(\theta) = \ln L(\theta) = \sum_{i=1}^n \ln f(x_i; \theta)$$

**Procedure:**
1. Write the likelihood (or log-likelihood) function
2. Take the derivative with respect to the parameter(s)
3. Set equal to zero and solve for the parameter(s)
4. Verify it's a maximum (second derivative test or examine endpoints)

**Properties of MLEs:**
- Asymptotically unbiased
- Asymptotically efficient (lowest variance among consistent estimators)
- Invariant under transformations: if $\hat{\theta}$ is MLE of $\theta$, then $g(\hat{\theta})$ is MLE of $g(\theta)$

### Confidence Intervals

A **confidence interval** is a range of plausible values for a parameter, with an associated confidence level.

**Interpretation:** A 95% confidence interval means that if we repeated the sampling process many times, approximately 95% of the computed intervals would contain the true parameter value.

**Critical Point:** The confidence level refers to the long-run frequency, not the probability that a specific interval contains the parameter (it either does or doesn't).

**Confidence Interval for Mean ($\sigma$ known):**
$$\bar{x} \pm z_{\alpha/2} \cdot \frac{\sigma}{\sqrt{n}}$$

**Confidence Interval for Mean ($\sigma$ unknown):**
$$\bar{x} \pm t_{\alpha/2, n-1} \cdot \frac{s}{\sqrt{n}}$$

Uses the $t$-distribution with $n-1$ degrees of freedom.

**Confidence Interval for Proportion:**
$$\hat{p} \pm z_{\alpha/2} \cdot \sqrt{\frac{\hat{p}(1-\hat{p})}{n}}$$

Valid for large samples where $n\hat{p} \geq 10$ and $n(1-\hat{p}) \geq 10$.

**Confidence Interval for Variance:**
$$\left[\frac{(n-1)s^2}{\chi^2_{\alpha/2, n-1}}, \frac{(n-1)s^2}{\chi^2_{1-\alpha/2, n-1}}\right]$$

Uses the chi-squared distribution with $n-1$ degrees of freedom.

### Factors Affecting Interval Width

The width of a confidence interval depends on:

1. **Confidence level:** Higher confidence → wider interval (trade precision for certainty)
2. **Sample size:** Larger $n$ → narrower interval (more data gives more precision)
3. **Population variability:** Larger $\sigma$ → wider interval (more variable populations harder to pin down)

**Margin of Error:** Half the width of the confidence interval:
$$E = z_{\alpha/2} \cdot \frac{\sigma}{\sqrt{n}}$$

### Sample Size Determination

To achieve a desired margin of error $E$ with confidence level $1-\alpha$:

**For estimating a mean:**
$$n = \left(\frac{z_{\alpha/2} \cdot \sigma}{E}\right)^2$$

**For estimating a proportion:**
$$n = \left(\frac{z_{\alpha/2}}{E}\right)^2 \cdot p(1-p)$$

If $p$ is unknown, use $p = 0.5$ for the most conservative (largest) sample size.

---

## Common Patterns and Techniques

### Checking Assumptions

Before applying inference procedures, verify:

1. **Random sampling:** Sample must be randomly selected from the population
2. **Independence:** Observations should be independent (or sample < 10% of population)
3. **Sample size:** For CLT applications, typically need $n \geq 30$ (or check normality for smaller samples)
4. **Distribution conditions:** For proportions, check $n\hat{p} \geq 10$ and $n(1-\hat{p}) \geq 10$

### Choosing Between $z$ and $t$

Use the **$z$-distribution** when:
- Population standard deviation $\sigma$ is known
- Sample size is large ($n \geq 30$) by CLT

Use the **$t$-distribution** when:
- Population standard deviation $\sigma$ is unknown (must use $s$)
- Sample size is small (especially $n < 30$)
- Population is approximately normal

### Interpreting Confidence Intervals

**Correct Interpretation (95% CI):**
"We are 95% confident that the true population parameter lies in this interval" or "If we repeated this sampling procedure many times, about 95% of the intervals would contain the true parameter."

**Incorrect Interpretation:**
"There's a 95% probability the parameter is in this interval" (the parameter is fixed, not random).

---

## Common Mistakes and Debugging

### Mistake 1: Confusing Parameter and Statistic
The population mean $\mu$ is a fixed (unknown) value. The sample mean $\bar{X}$ is a random variable that varies from sample to sample.

### Mistake 2: Using $n$ Instead of $n-1$ for Sample Variance
$$S^2 = \frac{1}{n-1}\sum_{i=1}^n (X_i - \bar{X})^2 \quad \text{NOT} \quad \frac{1}{n}\sum_{i=1}^n (X_i - \bar{X})^2$$

The $n-1$ divisor (Bessel's correction) makes the estimator unbiased.

### Mistake 3: Misinterpreting Confidence Level
A 95% confidence interval doesn't mean there's a 95% chance the parameter is in the interval. The interval either contains it or doesn't. The 95% refers to the long-run success rate of the procedure.

### Mistake 4: Ignoring Assumptions
- Don't use $z$-procedures when $\sigma$ is unknown unless $n$ is large
- Don't apply normal-based methods to small samples from non-normal populations
- Don't use proportion formulas when $n\hat{p} < 10$ or $n(1-\hat{p}) < 10$

### Mistake 5: Forgetting to Take Square Root
The standard error is $\frac{\sigma}{\sqrt{n}}$, not $\frac{\sigma}{n}$. The standard deviation decreases with the square root of sample size.

---

## Best Practices

1. **Always start by identifying** what parameter you're estimating (mean, proportion, variance)
2. **Check assumptions** before applying any inference procedure
3. **Use the appropriate distribution** ($z$, $t$, or $\chi^2$) based on what's known and sample size
4. **Report both the estimate and the interval** for complete information
5. **Interpret in context** using the language of the problem, not just mathematical notation
6. **Increase sample size** to reduce margin of error when precision is critical
7. **Verify calculations** by checking that intervals make sense (positive for variances, between 0 and 1 for proportions)

---

## Connection to Hypothesis Testing

Statistical inference includes both **estimation** (covered in this topic) and **hypothesis testing** (typically covered next):

- **Estimation:** "What is the value of the parameter?" → Confidence intervals
- **Hypothesis Testing:** "Is the parameter equal to a specific value?" → p-values and test statistics

The two approaches are complementary. A 95% confidence interval contains all parameter values that wouldn't be rejected by a two-sided hypothesis test at the 5% significance level.

---

## Summary

- **Sampling distributions** describe the variability of statistics across samples
- **Point estimators** provide single-value estimates; good estimators are unbiased, consistent, and efficient
- **Method of moments** equates sample moments to population moments
- **Maximum likelihood estimation** finds parameters that maximize the probability of the observed data
- **Confidence intervals** provide ranges of plausible parameter values with associated confidence levels
- **Sample size determination** balances precision requirements with data collection costs
- The **Central Limit Theorem** justifies using normal distributions for means of large samples

---

## Further Exploration

- **Bootstrap Methods:** Resampling techniques for estimating sampling distributions
- **Bayesian Inference:** Alternative framework treating parameters as random variables
- **Robust Estimation:** Methods less sensitive to outliers and violations of assumptions
- **Prediction Intervals:** Intervals for future observations (vs. confidence intervals for parameters)
- **Hypothesis Testing:** Complementary approach to statistical inference
