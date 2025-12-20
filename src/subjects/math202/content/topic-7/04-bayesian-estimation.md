---
id: math202-t7-estimation
title: "Bayesian Estimation"
order: 4
---

## Bayesian Estimation

Estimation is one of the most fundamental tasks in statistics: given observed data, what can we say about unknown parameters? Bayesian estimation provides a complete probabilistic framework for this task, yielding not just point estimates but full posterior distributions that quantify our uncertainty. This subtopic explores Bayesian approaches to common estimation problems.

---

## Estimating Proportions

Proportion estimation is ubiquitous: conversion rates, success rates, prevalence, approval ratings. The Bayesian approach using Beta-Binomial conjugacy is particularly elegant.

### The Beta-Binomial Model

**Setup:**
- Parameter: $\theta$ = probability of success (proportion)
- Prior: $\theta \sim \text{Beta}(\alpha, \beta)$
- Data: $x$ = number of successes in $n$ trials
- Likelihood: $x \mid \theta \sim \text{Binomial}(n, \theta)$
- Posterior: $\theta \mid x \sim \text{Beta}(\alpha + x, \beta + n - x)$

**Prior interpretation:**
- $\alpha$ = prior successes
- $\beta$ = prior failures
- Prior mean: $\frac{\alpha}{\alpha + \beta}$
- Prior sample size: $\alpha + \beta$

### Example: Website Conversion Rate

You're testing a new website design and want to estimate the conversion rate.

**Prior:** You're fairly confident the rate is around 10%, based on similar designs. Use Beta(10, 90):
- Prior mean: 10%
- Prior "sample size": 100 visitors

**Data:** 250 visitors, 35 conversions (14% conversion rate)

**Posterior:** Beta(10 + 35, 90 + 215) = Beta(45, 305)

**Results:**
- Posterior mean: $\frac{45}{350} = 0.1286$ (12.86%)
- Posterior standard deviation: $\sqrt{\frac{45 \times 305}{350^2 \times 351}} = 0.0179$ (1.79%)
- 95% credible interval: [0.095, 0.166]

**Interpretation:** Given our prior belief and the data, we're 95% confident the true conversion rate is between 9.5% and 16.6%, with our best estimate being 12.86%.

### Comparison with Frequentist

**Frequentist MLE:** $\frac{35}{250} = 0.14$ (14%)

**Frequentist 95% CI:** Using Normal approximation:
$$0.14 \pm 1.96\sqrt{\frac{0.14 \times 0.86}{250}} = [0.097, 0.183]$$

The Bayesian estimate is pulled toward the prior (10%), while the frequentist estimate uses only the data. With more data, they'll converge.

### Small Sample Behavior

Bayesian estimation excels with small samples.

**Example:** Only 10 visitors, 2 conversions (20% rate)

**Frequentist:**
- MLE: 20%
- 95% CI: [0%, 40%] (very wide, may include impossible values)

**Bayesian with Beta(10, 90) prior:**
- Posterior: Beta(12, 98)
- Posterior mean: 10.9%
- 95% CI: [6.1%, 16.8%]

The prior knowledge stabilizes the estimate, preventing wild conclusions from limited data.

### Choosing Priors for Proportions

**Non-informative:**
- Beta(1, 1): Uniform prior
- Beta(0.5, 0.5): Jeffreys prior (favors extremes slightly)

**Weakly informative:**
- Beta(2, 2): Slightly favors middle values
- Beta(5, 5): Moderate preference for values near 0.5

**Informative:**
- Match prior mean and variance to existing knowledge
- Use prior predictive checks to validate

---

## Estimating Means

When estimating a population mean, the Normal-Normal conjugate model is most common.

### Normal-Normal Model (Known Variance)

**Setup:**
- Parameter: $\mu$ = population mean
- Prior: $\mu \sim N(\mu_0, \tau_0^2)$
- Data: $x_1, \ldots, x_n \sim N(\mu, \sigma^2)$ where $\sigma^2$ is known
- Posterior: $\mu \mid x \sim N(\mu_n, \tau_n^2)$

**Posterior parameters:**

Posterior mean (precision-weighted average):
$$\mu_n = \frac{\frac{\mu_0}{\tau_0^2} + \frac{n\bar{x}}{\sigma^2}}{\frac{1}{\tau_0^2} + \frac{n}{\sigma^2}}$$

Posterior variance:
$$\tau_n^2 = \frac{1}{\frac{1}{\tau_0^2} + \frac{n}{\sigma^2}}$$

**Key insights:**
- Posterior mean is weighted average of prior mean and sample mean
- Weights are proportional to precisions (inverse variances)
- More data → posterior closer to sample mean
- More precise prior → posterior stays closer to prior

### Example: Manufacturing Process

A machine produces metal rods. You want to estimate the mean length.

**Prior:** Historical data suggests mean length is 10.0 cm with standard deviation 0.2 cm. Use $\mu \sim N(10.0, 0.2^2)$.

**Data:** Measure 25 rods. Sample mean $\bar{x} = 10.15$ cm. Assume measurement error $\sigma = 0.3$ cm (known).

**Posterior:**

Prior precision: $\frac{1}{0.04} = 25$

Data precision: $\frac{25}{0.09} = 277.78$

Posterior precision: $25 + 277.78 = 302.78$

Posterior variance: $\frac{1}{302.78} = 0.0033$, so $\tau_n = 0.058$

Posterior mean:
$$\mu_n = \frac{25 \times 10.0 + 277.78 \times 10.15}{302.78} = \frac{250 + 2824.46}{302.78} = 10.148 \text{ cm}$$

**Results:**
- Posterior: $N(10.148, 0.058^2)$
- 95% credible interval: [10.034, 10.262]

**Interpretation:** The data suggests higher mean (10.15) than the prior (10.0), but the posterior (10.148) is between them, closer to the data because we have 25 observations and a relatively diffuse prior.

### Normal Model (Unknown Variance)

When variance is unknown, we need a prior for both $\mu$ and $\sigma^2$. The conjugate prior is Normal-Inverse-Gamma.

**Setup:**
- $\mu \mid \sigma^2 \sim N(\mu_0, \frac{\sigma^2}{\kappa_0})$
- $\sigma^2 \sim \text{Inverse-Gamma}(\alpha_0, \beta_0)$

The math is more complex, but the principle is the same: combine prior with likelihood to get posterior for both parameters.

**Simpler approach:** Use weakly informative priors and computational methods (MCMC) rather than conjugate analysis.

---

## Comparing Two Groups

A common task is comparing means or proportions between two groups (e.g., treatment vs control, A vs B).

### Comparing Two Proportions

**Example:** A/B testing two website designs.

**Setup:**
- Design A: $\theta_A \sim \text{Beta}(\alpha_A, \beta_A)$
- Design B: $\theta_B \sim \text{Beta}(\alpha_B, \beta_B)$
- Data: $n_A = 500$, $x_A = 65$ (13% conversion for A)
- Data: $n_B = 500$, $x_B = 78$ (15.6% conversion for B)

**Posteriors:**
- $\theta_A \mid x_A \sim \text{Beta}(65, 435)$ (assuming Beta(1,1) priors)
- $\theta_B \mid x_B \sim \text{Beta}(78, 422)$

**Question:** Is B better than A?

Compute $P(\theta_B > \theta_A \mid x)$ by simulation:
1. Draw $\theta_A^{(i)}$ from Beta(65, 435)
2. Draw $\theta_B^{(i)}$ from Beta(78, 422)
3. Count proportion where $\theta_B^{(i)} > \theta_A^{(i)}$

**Result:** $P(\theta_B > \theta_A \mid x) \approx 0.92$

**Interpretation:** There's a 92% probability that design B has a higher conversion rate than design A.

**Difference in rates:**
Compute distribution of $\theta_B - \theta_A$:
- Mean difference: $\frac{78}{500} - \frac{65}{500} = 0.026$ (2.6 percentage points)
- 95% credible interval for difference: [-0.006, 0.059]

Since the interval includes 0, we can't be highly confident there's a real difference, despite the 92% probability of B being better.

### Comparing Two Means

**Example:** Testing a new teaching method.

**Setup:**
- Control group: $n_1 = 30$, $\bar{x}_1 = 75$, $s_1 = 10$
- Treatment group: $n_2 = 30$, $\bar{x}_2 = 82$, $s_2 = 12$

**Model:** Assume $\mu_1, \mu_2 \sim N(75, 20^2)$ priors (both groups expected around 75)

**Question:** What's the treatment effect $\delta = \mu_2 - \mu_1$?

Using computational methods (since we're estimating variances too):
- Posterior mean of $\delta$: 6.8 points
- 95% credible interval: [0.5, 13.2]
- $P(\delta > 0 \mid x) = 0.98$

**Interpretation:** There's a 98% probability the treatment improves scores, with an expected improvement of 6.8 points.

### Effect Sizes

Rather than raw differences, we often want standardized effect sizes.

**Cohen's d:** Difference in means divided by pooled standard deviation:
$$d = \frac{\mu_2 - \mu_1}{\sigma_{\text{pooled}}}$$

Bayesian approach: compute posterior distribution of $d$, not just a point estimate.

---

## Hierarchical Estimation

When we have data from multiple related groups, hierarchical models pool information.

### Example: Multi-Location Sales

You operate 10 stores and want to estimate conversion rates for each.

**Naive approach:** Estimate each store separately. Problem: small stores have unstable estimates.

**Hierarchical approach:**
- Each store has its own $\theta_i$
- Store-specific parameters share a common prior: $\theta_i \sim \text{Beta}(\alpha, \beta)$
- Hyperparameters $\alpha, \beta$ learned from data

This "borrows strength" across stores: small stores get pulled toward the overall mean, while large stores remain independent.

**Example data:**

| Store | Visitors | Conversions | Naive Estimate |
|-------|----------|-------------|----------------|
| 1 | 1000 | 120 | 12.0% |
| 2 | 100 | 8 | 8.0% |
| 3 | 50 | 7 | 14.0% |
| 4 | 500 | 65 | 13.0% |

**Hierarchical estimates:**
- Store 1 (large): ~12.0% (data dominates)
- Store 2 (small): ~11.2% (pulled toward overall mean)
- Store 3 (small, high rate): ~12.5% (shrunk toward mean)
- Store 4 (medium): ~12.8% (slight shrinkage)

The hierarchical model recognizes that 14% for store 3 is based on only 50 visitors and is likely an overestimate.

---

## Regression: Bayesian Linear Models

Bayesian regression estimates not just coefficients but their full posterior distributions.

### Simple Linear Regression

**Model:**
$$y_i = \beta_0 + \beta_1 x_i + \epsilon_i, \quad \epsilon_i \sim N(0, \sigma^2)$$

**Priors:**
- $\beta_0 \sim N(0, 100^2)$ (weakly informative)
- $\beta_1 \sim N(0, 10^2)$
- $\sigma \sim \text{Half-Cauchy}(0, 5)$

**Posterior:** Gives distributions for all parameters, not just point estimates.

**Benefits:**
- Full uncertainty quantification for predictions
- Natural way to incorporate prior knowledge about relationships
- Robust to collinearity and small samples through regularizing priors
- Straightforward model comparison via Bayes factors

### Example: House Prices

Predict house price from square footage.

**Data:** 50 houses

**Frequentist result:**
- $\hat{\beta}_0 = 50000$, SE = 10000
- $\hat{\beta}_1 = 150$, SE = 20

**Bayesian result with weakly informative priors:**
- $\beta_0 \mid y \sim N(49500, 9800^2)$
- $\beta_1 \mid y \sim N(148, 19^2)$

Very similar to frequentist (as expected with weak priors and adequate data), but we get full distributions.

**Prediction for 2000 sq ft house:**
- Point prediction: $49500 + 148 \times 2000 = 345500$
- 95% predictive interval: [280000, 411000] (accounts for parameter uncertainty AND residual variance)

---

## Practical Recommendations

### Prior Choice

1. **Start weakly informative:** Unless you have strong prior knowledge, use priors that gently regularize but let data dominate.

2. **Use domain knowledge:** If you know reasonable ranges, encode them.

3. **Check prior predictive:** Simulate data from your prior. Does it match reality?

4. **Sensitivity analysis:** Try different reasonable priors and check if conclusions change.

### Reporting Results

1. **Report full posteriors when possible:** Plots or summary statistics (mean, SD, quantiles).

2. **Point estimates with uncertainty:** "The conversion rate is 12.9% (95% CI: [9.5%, 16.6%])."

3. **Probability statements:** "There's a 92% probability that B is better than A."

4. **Effect sizes:** Report meaningful differences, not just statistical significance.

### Sample Size Considerations

**Bayesian estimation works well with any sample size:**
- Small samples: Prior knowledge stabilizes estimates
- Large samples: Data dominates, prior becomes irrelevant
- Sequential: Easy to update as more data arrives

Unlike frequentist methods, you don't need large samples for valid inference.

---

## Key Takeaways

- **Bayesian estimation** provides full posterior distributions, not just point estimates

- **Beta-Binomial conjugacy** makes proportion estimation analytically tractable

- **Normal-Normal conjugacy** enables elegant mean estimation with known variance

- **Precision-weighted averaging** combines prior knowledge and data optimally

- **Comparing groups** yields direct probability statements about differences

- **Hierarchical models** borrow strength across related groups for better estimates

- **Small samples** are handled naturally through informative priors

- **Prior sensitivity** should always be checked to ensure robust conclusions

Bayesian estimation transforms parameters from unknown constants to random variables with full probability distributions, enabling richer, more intuitive inference than traditional point estimates alone.
