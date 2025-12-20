---
id: math202-t7-posterior
title: "Posterior Inference"
order: 3
---

## Posterior Inference

Once we've specified a prior and observed data, Bayes' theorem gives us the posterior distribution—a complete description of our updated knowledge about the parameter. But how do we extract useful information from this distribution? Posterior inference encompasses the techniques for summarizing, interpreting, and using posterior distributions to make decisions and predictions.

---

## The Posterior Distribution

The posterior distribution $P(\theta \mid x)$ contains everything we know about the parameter $\theta$ after observing data $x$. Unlike frequentist methods that produce single point estimates, Bayesian inference gives us an entire probability distribution.

**Key properties:**

1. **Complete uncertainty quantification:** The full distribution shows not just where we think $\theta$ is, but how uncertain we are.

2. **Direct probability statements:** We can make statements like "There's a 95% probability that $\theta$ is between 2 and 5."

3. **Basis for prediction:** We can predict future observations by averaging over posterior uncertainty.

4. **Sequential updating:** Today's posterior becomes tomorrow's prior as new data arrives.

---

## Point Estimation

While the posterior distribution is our complete answer, we often need a single "best guess" for the parameter.

### Posterior Mean

The posterior mean minimizes expected squared error loss:

$$\hat{\theta}_{\text{mean}} = E[\theta \mid x] = \int \theta \cdot P(\theta \mid x) \, d\theta$$

**Properties:**
- Most commonly used point estimate
- Easy to compute and interpret
- Optimal under squared error loss
- Can be sensitive to outliers or skewness

**Example:** If $\theta \mid x \sim \text{Beta}(12, 8)$, then:
$$\hat{\theta}_{\text{mean}} = \frac{12}{12+8} = 0.6$$

### Posterior Median

The posterior median divides the posterior probability in half:

$$P(\theta \leq \hat{\theta}_{\text{median}} \mid x) = 0.5$$

**Properties:**
- Minimizes expected absolute error loss
- Robust to outliers and skewness
- Always exists and is unique for unimodal distributions
- Appropriate when over/under-estimation have symmetric costs

**Example:** For a right-skewed posterior, the median will be less than the mean, providing a more robust estimate.

### Maximum A Posteriori (MAP)

The MAP estimate is the mode of the posterior:

$$\hat{\theta}_{\text{MAP}} = \arg\max_\theta P(\theta \mid x)$$

**Properties:**
- The most probable parameter value
- Easy to find (set derivative to zero)
- Can be computed without integration
- May not exist or be unique for multimodal posteriors
- Doesn't account for uncertainty

**Relationship to MLE:**

With a flat (uniform) prior, MAP = MLE:
$$\hat{\theta}_{\text{MAP}} = \arg\max_\theta P(\theta \mid x) = \arg\max_\theta P(x \mid \theta)$$

With an informative prior, MAP pulls the MLE toward the prior mode.

**Example:** Beta(12, 8) posterior:
- Mean: 0.60
- Median: 0.60
- Mode: $\frac{12-1}{12+8-2} = \frac{11}{18} = 0.611$

For symmetric distributions like Beta with integer parameters, these are very close.

### Choosing Between Point Estimates

| Estimate | Best When | Drawback |
|----------|-----------|----------|
| Mean | Symmetric posterior, squared error loss | Sensitive to skewness |
| Median | Skewed posterior, absolute error loss | Less common in practice |
| MAP | Need most probable value, computational constraints | Ignores uncertainty |

**General advice:** Report the full posterior when possible. If you must give a single number, use the mean unless there's a specific reason to use another.

---

## Interval Estimation: Credible Intervals

A credible interval (also called credible region or Bayesian confidence interval) is a range that contains the parameter with specified probability.

### Equal-Tailed Credible Interval

The most common type places equal probability in each tail.

**95% equal-tailed interval:** Find values $L$ and $U$ such that:
$$P(\theta < L \mid x) = 0.025$$
$$P(\theta > U \mid x) = 0.025$$

Then $[L, U]$ is a 95% credible interval.

**Interpretation:** Given the data, there's a 95% probability that $\theta \in [L, U]$.

**Example:** For Beta(12, 8) posterior:
- 2.5th percentile: 0.413
- 97.5th percentile: 0.768
- 95% CI: [0.413, 0.768]

We're 95% certain the parameter is between 0.413 and 0.768.

### Highest Posterior Density (HPD) Interval

The HPD interval contains the parameter values with highest posterior density, subject to containing the specified probability.

**Definition:** A 95% HPD interval $[L, U]$ satisfies:
1. $P(L \leq \theta \leq U \mid x) = 0.95$
2. $P(\theta \mid x)$ is higher at any point inside $[L, U]$ than outside

**Properties:**
- Shortest possible credible interval
- More natural for asymmetric posteriors
- More complex to compute

**Example:** For a right-skewed posterior, the HPD interval will be shifted left compared to the equal-tailed interval, capturing the high-density region more efficiently.

**When they differ:** For symmetric unimodal posteriors, equal-tailed and HPD intervals coincide. For asymmetric posteriors, they can differ substantially.

### Credible vs Confidence Intervals

This is a crucial distinction that's often misunderstood.

**Credible interval (Bayesian):**
- Direct probability statement about the parameter
- "There's a 95% probability the parameter is in this interval"
- The interval is fixed; the parameter is random

**Confidence interval (Frequentist):**
- Statement about the procedure, not this specific interval
- "If we repeated this many times, 95% of intervals would contain the true parameter"
- The parameter is fixed; the interval is random

**Example:** You observe data and compute [2.1, 3.7].

**Bayesian:** "There's a 95% probability $\theta \in [2.1, 3.7]$."

**Frequentist:** "If we repeated this experiment infinitely many times, 95% of such intervals would contain $\theta$. For this specific interval, either $\theta$ is in it or it isn't—we can't say which."

The Bayesian interpretation is what most people intuitively want, which is why credible intervals are often preferred in applications.

---

## Posterior Predictive Distribution

Beyond estimating parameters, we often want to predict future observations. The posterior predictive distribution integrates over parameter uncertainty.

**Definition:** The probability of a new observation $\tilde{x}$ given observed data $x$:

$$P(\tilde{x} \mid x) = \int P(\tilde{x} \mid \theta) \cdot P(\theta \mid x) \, d\theta$$

This averages the predictive distribution over all possible parameter values, weighted by their posterior probability.

**Interpretation:** This accounts for two sources of uncertainty:
1. **Parameter uncertainty:** We don't know $\theta$ exactly (captured by $P(\theta \mid x)$)
2. **Sampling variability:** Even if we knew $\theta$, the next observation would vary (captured by $P(\tilde{x} \mid \theta)$)

### Example: Coin Flipping

You observe 7 heads in 10 flips. With a Beta(5, 5) prior, your posterior is Beta(12, 8).

**Question:** What's the probability the next flip is heads?

**Frequentist approach:** Use point estimate $\hat{\theta} = 0.6$, predict $P(\text{heads}) = 0.6$.

**Bayesian approach:** Integrate over posterior uncertainty.

For Beta-Binomial, there's a closed form:
$$P(\tilde{x} = 1 \mid x) = \frac{\alpha}{\alpha + \beta} = \frac{12}{20} = 0.6$$

But this also accounts for uncertainty. If we had Beta(120, 80) posterior (10× more data), we'd still get 0.6 as the point prediction, but our posterior predictive distribution would be more concentrated.

### Posterior Predictive Checking

We can use the posterior predictive distribution to validate our model.

**Method:**
1. Simulate new datasets from the posterior predictive distribution
2. Compare simulated data to observed data
3. If observed data looks unusual compared to simulations, model may be inadequate

**Example:** You model customer purchases as Poisson. Generate 1000 datasets from your posterior predictive and plot histograms. If the actual data has much more variance than the simulated data, maybe you need a negative binomial model instead.

---

## Working Example: Quality Control

A factory produces widgets, and you want to estimate the defect rate $\theta$.

**Prior:** Based on industry standards, you use Beta(5, 95) prior:
- Prior mean: 5% defect rate
- Expresses moderate confidence

**Data:** Inspect 200 widgets, find 15 defects.

**Posterior:** Beta(5 + 15, 95 + 185) = Beta(20, 280)

### Point Estimates

**Posterior mean:**
$$\hat{\theta}_{\text{mean}} = \frac{20}{300} = 0.0667 \text{ (6.67%)}$$

**MAP estimate:**
$$\hat{\theta}_{\text{MAP}} = \frac{19}{298} = 0.0638 \text{ (6.38%)}$$

**Comparison to MLE:** $\frac{15}{200} = 0.075$ (7.5%)

The Bayesian estimates are pulled slightly toward the prior mean of 5%, reflecting the combination of prior knowledge and data.

### Credible Interval

95% equal-tailed credible interval: [0.041, 0.100]

**Interpretation:** We're 95% certain the true defect rate is between 4.1% and 10.0%.

### Posterior Predictive: Next Batch

You're about to inspect another batch of 200 widgets. How many defects should you expect?

**Expected defects:** $200 \times 0.0667 = 13.3$

**Full distribution:** For each possible $\theta$ value, we could get different numbers of defects. The posterior predictive accounts for this uncertainty.

For Beta-Binomial:
$$P(\tilde{x} = k \mid x) = \binom{n}{k} \frac{B(k + \alpha, n - k + \beta)}{B(\alpha, \beta)}$$

Computing this, we find:
- 95% predictive interval: [5, 24] defects
- Most likely: 13 defects

This is wider than it would be if we just used the point estimate, because it accounts for parameter uncertainty.

---

## Loss Functions and Decision Theory

Different decisions require different point estimates, formalized through loss functions.

### Squared Error Loss

$$L(\theta, \hat{\theta}) = (\theta - \hat{\theta})^2$$

**Optimal estimate:** Posterior mean

**Interpretation:** Penalizes errors quadratically. A 10% error is 4× worse than a 5% error.

**Use when:** Over- and under-estimation have symmetric costs that grow quadratically.

### Absolute Error Loss

$$L(\theta, \hat{\theta}) = |\theta - \hat{\theta}|$$

**Optimal estimate:** Posterior median

**Interpretation:** Linear penalty for errors.

**Use when:** Over- and under-estimation have symmetric linear costs.

### 0-1 Loss

$$L(\theta, \hat{\theta}) = \begin{cases} 0 & \text{if } \theta = \hat{\theta} \\ 1 & \text{otherwise} \end{cases}$$

**Optimal estimate:** Posterior mode (MAP)

**Interpretation:** Only care if we're exactly right.

**Use when:** Need the single most probable value (rare in practice for continuous parameters).

### Asymmetric Loss

Real decisions often have asymmetric costs.

**Example:** Manufacturing tolerance.
- Undersize parts must be scrapped (cost: $10)
- Oversize parts can be reprocessed (cost: $2)

Define asymmetric loss:
$$L(\theta, \hat{\theta}) = \begin{cases} 10(\theta - \hat{\theta}) & \text{if } \hat{\theta} < \theta \\ 2(\hat{\theta} - \theta) & \text{if } \hat{\theta} > \theta \end{cases}$$

The optimal estimate is not the mean, median, or mode, but the value that minimizes expected loss under the posterior.

---

## Summarizing High-Dimensional Posteriors

When we have multiple parameters, the posterior is a joint distribution. How do we summarize it?

### Marginal Distributions

For parameter $\theta_1$ in a multiparameter model:

$$P(\theta_1 \mid x) = \int P(\theta_1, \theta_2, \ldots \mid x) \, d\theta_2 \ldots$$

Report marginal mean, credible intervals for each parameter separately.

### Joint Credible Regions

A 95% joint credible region contains 95% of the posterior probability mass for all parameters simultaneously.

**Caution:** This is NOT the same as having 95% marginal credible intervals for each parameter.

### Posterior Correlation

Parameters may be correlated in the posterior even if independent in the prior.

**Example:** Estimating mean $\mu$ and variance $\sigma^2$ from Normal data. If $\mu$ is high, observed data might be high because of high mean or high variance—creating posterior correlation.

---

## Key Takeaways

- **Posterior distribution** contains complete information about the parameter after observing data

- **Point estimates** include posterior mean (optimal for squared error), median (absolute error), and MAP (most probable value)

- **Credible intervals** directly quantify uncertainty with probability statements about parameters

- **HPD intervals** are shortest possible credible intervals, important for asymmetric posteriors

- **Posterior predictive distribution** integrates over parameter uncertainty for predictions

- **Loss functions** formalize decision-making, with different losses yielding different optimal estimates

- **Asymmetric losses** reflect real-world costs and lead to estimates different from mean/median/mode

- **Credible intervals** have direct probability interpretation unlike frequentist confidence intervals

The posterior distribution is our complete answer to any inference question. Point estimates, credible intervals, and predictions are all derived from this single, coherent probability distribution.
