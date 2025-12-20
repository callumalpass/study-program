---
id: math202-t7-priors
title: "Prior Distributions"
order: 2
---

## Prior Distributions

In Bayesian inference, the prior distribution encodes what we know (or don't know) about a parameter before observing data. Choosing appropriate priors is both an art and a science—it requires statistical knowledge, domain expertise, and careful consideration of how prior beliefs should influence posterior inference. This subtopic explores different types of priors and how to select them effectively.

---

## What Makes a Good Prior?

A prior distribution should:

1. **Reflect genuine prior knowledge** when it exists
2. **Be mathematically convenient** if possible (conjugate priors)
3. **Be transparent** about assumptions being made
4. **Be defensible** to peers and stakeholders
5. **Allow sensitivity analysis** to check robustness

The "right" prior depends on the context. Sometimes we have strong prior knowledge; other times we want to be minimally informative and let the data dominate.

---

## Types of Priors

### Informative Priors

An informative prior incorporates substantial knowledge about the parameter, concentrating probability mass in regions we believe most plausible.

**Example:** Estimating the conversion rate for a new website feature.

Previous features at your company typically have conversion rates between 2% and 8%, with most around 5%. A Beta(10, 190) prior captures this knowledge:

- Mean: $\frac{10}{200} = 0.05$ (5%)
- Standard deviation: $\approx 0.015$
- Concentrated between 2% and 8%

**When to use:**
- You have reliable prior data from similar situations
- Expert knowledge strongly constrains plausible values
- You want to regularize estimates (prevent overfitting)
- Sample size is small

**Cautions:**
- Can dominate inference if data is limited
- Must be transparent about source of prior information
- Should perform sensitivity analysis

### Weakly Informative Priors

Weakly informative priors encode general constraints (e.g., "the parameter is probably between 0 and 100") without being too specific.

**Example:** Estimating average human body temperature.

We know it's probably between 96°F and 100°F, but we're uncertain about the exact value. A Normal(98, 2²) prior:

- Centers at 98°F
- Gives 95% of probability mass to [94, 102]
- Allows data to easily override if needed

**When to use:**
- You have general domain knowledge but not specific data
- You want to rule out completely implausible values
- You need some regularization but want data to dominate
- You're building hierarchical models that need proper priors

**Benefits:**
- Prevents pathological posterior behavior
- Stabilizes computation
- Incorporates basic domain knowledge
- Robust to reasonable changes

### Non-informative (Diffuse) Priors

Non-informative priors attempt to "let the data speak" by spreading probability mass widely across parameter space.

**Example:** Estimating a proportion $\theta \in [0, 1]$ with minimal prior knowledge.

Options include:
- **Uniform prior**: Beta(1, 1), equal probability to all values
- **Jeffreys prior**: Beta(0.5, 0.5), invariant under reparameterization
- **Reference prior**: Designed to minimize influence on posterior

**When to use:**
- You genuinely have minimal prior knowledge
- You want "objective" analysis (though true objectivity is impossible)
- You have large sample sizes (data will dominate anyway)
- You're doing preliminary analysis

**Cautions:**
- No prior is truly non-informative (all encode some assumptions)
- Can lead to improper priors (don't integrate to 1)
- May give undue weight to implausible values
- "Uniform" depends on parameterization (uniform for $\theta$ ≠ uniform for $\log \theta$)

---

## Conjugate Priors

A prior is conjugate to a likelihood if the posterior belongs to the same family as the prior. This mathematical convenience allows analytical posterior computation.

### Beta-Binomial Conjugacy

For binary outcomes (success/failure):

**Likelihood:** Binomial
$$P(x \mid \theta) = \binom{n}{x} \theta^x (1-\theta)^{n-x}$$

**Prior:** Beta($\alpha$, $\beta$)
$$P(\theta) = \frac{\Gamma(\alpha + \beta)}{\Gamma(\alpha)\Gamma(\beta)} \theta^{\alpha-1} (1-\theta)^{\beta-1}$$

**Posterior:** Beta($\alpha + x$, $\beta + n - x$)

**Interpretation:**
- $\alpha$ can be thought of as "prior successes"
- $\beta$ can be thought of as "prior failures"
- Posterior adds observed successes and failures to prior counts

**Example:**
- Prior: Beta(2, 8) — equivalent to 2 successes in 10 trials (20% success rate)
- Data: 15 successes in 40 trials (37.5% success rate)
- Posterior: Beta(17, 33) — mean = $\frac{17}{50} = 0.34$ (34%)

The posterior is a weighted average of prior belief (20%) and data (37.5%).

### Normal-Normal Conjugacy

For estimating a mean with known variance:

**Likelihood:** $x \mid \mu \sim N(\mu, \sigma^2)$ (known $\sigma^2$)

**Prior:** $\mu \sim N(\mu_0, \tau_0^2)$

**Posterior:** $\mu \mid x \sim N(\mu_n, \tau_n^2)$ where:

$$\mu_n = \frac{\frac{\mu_0}{\tau_0^2} + \frac{n\bar{x}}{\sigma^2}}{\frac{1}{\tau_0^2} + \frac{n}{\sigma^2}}$$

$$\frac{1}{\tau_n^2} = \frac{1}{\tau_0^2} + \frac{n}{\sigma^2}$$

**Interpretation:**
- Posterior mean is precision-weighted average of prior mean and sample mean
- Posterior precision is sum of prior precision and data precision
- More data → posterior closer to sample mean
- More precise prior → posterior stays closer to prior mean

**Example:**
- Prior: $\mu \sim N(100, 10^2)$ — we think the mean is around 100
- Data: $n = 25$, $\bar{x} = 105$, $\sigma = 15$ (known)
- Prior precision: $\frac{1}{100}$, Data precision: $\frac{25}{225} = \frac{1}{9}$
- Posterior: $\mu \mid x \sim N(104.5, 9.09^2)$

### Gamma-Poisson Conjugacy

For count data and rates:

**Likelihood:** Poisson
$$P(x \mid \lambda) = \frac{\lambda^x e^{-\lambda}}{x!}$$

**Prior:** Gamma($\alpha$, $\beta$)
$$P(\lambda) = \frac{\beta^\alpha}{\Gamma(\alpha)} \lambda^{\alpha-1} e^{-\beta\lambda}$$

**Posterior:** Gamma($\alpha + \sum x_i$, $\beta + n$)

**Interpretation:**
- $\alpha$ represents prior total counts
- $\beta$ represents prior exposure time
- Posterior updates both with observed counts and exposure

### Why Use Conjugate Priors?

**Advantages:**
1. **Analytical tractability** — closed-form posteriors
2. **Computational efficiency** — no numerical integration needed
3. **Intuitive interpretation** — prior parameters often have clear meaning
4. **Educational value** — helps build understanding

**Limitations:**
1. **Restrictive** — may not match true prior beliefs
2. **Less flexible** — can't capture all types of prior knowledge
3. **Less important now** — modern computers handle non-conjugate priors well

---

## Improper Priors

An improper prior is one that doesn't integrate to 1 (not a proper probability distribution).

**Example:** Uniform prior on entire real line
$$P(\theta) \propto 1, \quad \theta \in (-\infty, \infty)$$

This doesn't integrate to a finite value, but it can still lead to a proper posterior if the likelihood is informative enough.

**Common improper priors:**
- $P(\mu) \propto 1$ for location parameters
- $P(\sigma) \propto 1/\sigma$ for scale parameters (Jeffreys prior)
- $P(\theta) \propto 1$ for proportions on [0,1]

**When they work:**
- Data is sufficiently informative
- Likelihood drops off quickly in tails
- Posterior integrates to 1

**Dangers:**
- Posterior might also be improper
- Can't compute marginal likelihoods (needed for Bayes factors)
- Philosophical issues (can't truly represent "no prior information")
- May cause computational problems

**Best practice:** Use proper priors, even if very diffuse. E.g., use Normal(0, 1000²) instead of uniform on the entire real line.

---

## Jeffreys Priors

Jeffreys priors are designed to be invariant under reparameterization. If $\theta$ has Jeffreys prior and we transform to $\phi = g(\theta)$, then $\phi$ also has its Jeffreys prior.

**Definition:** The Jeffreys prior is proportional to the square root of the Fisher information:

$$P(\theta) \propto \sqrt{I(\theta)}$$

where $I(\theta) = -E\left[\frac{\partial^2 \log P(x|\theta)}{\partial \theta^2}\right]$

**Examples:**

**Bernoulli parameter** $\theta \in [0,1]$:
- Jeffreys prior: Beta(0.5, 0.5)
- Concentrates probability near 0 and 1

**Normal mean** $\mu$ (known variance):
- Jeffreys prior: $P(\mu) \propto 1$ (uniform on real line)

**Normal variance** $\sigma^2$:
- Jeffreys prior: $P(\sigma^2) \propto 1/\sigma^2$

**Advantages:**
- Objective (doesn't depend on parameterization)
- Often works well in practice
- Well-studied and understood

**Limitations:**
- Can be improper
- May not match actual prior knowledge
- Not always intuitive

---

## Prior Elicitation

When we have expert knowledge but not in the form of a probability distribution, we need to elicit priors from domain experts.

### Method 1: Direct Specification

Ask experts directly about parameters:
- "What's the most likely value?"
- "What range contains 95% of plausible values?"
- "What's the minimum and maximum possible value?"

Then find a distribution matching these specifications.

**Example:** Expert says conversion rate is most likely 5%, almost certainly between 2% and 10%.
- Mode around 0.05
- 95% interval: [0.02, 0.10]
- Try Beta(8, 152): mode = 0.044, 95% CI ≈ [0.02, 0.10] ✓

### Method 2: Quantile Matching

Ask for specific quantiles:
- "What value has 25% chance of being exceeded?"
- "What's the median?"
- "90th percentile?"

Fit a distribution to match these quantiles.

### Method 3: Prior Predictive Checks

Ask about observable quantities rather than abstract parameters:
- "In 100 trials, how many successes would you expect?"
- "What range of outcomes would surprise you?"

Simulate from candidate priors and check if predictions match expert expectations.

### Method 4: Historical Data

Use data from previous similar studies:
- Meta-analysis results
- Internal company data
- Published literature

Fit a distribution to historical estimates.

**Example:** Previous five A/B tests at your company had conversion rate increases of [1.2%, 2.3%, -0.5%, 3.1%, 1.8%]. Use Normal(1.6%, 1.2²%) as prior for the next test.

---

## Sensitivity Analysis

Always check how much conclusions depend on prior choice.

**Approaches:**

1. **Try multiple priors:** Run analysis with informative, weakly informative, and non-informative priors. Do conclusions change substantially?

2. **Vary hyperparameters:** If using Beta($\alpha$, $\beta$), try different values. How much does posterior change?

3. **Prior-posterior plot:** Visualize prior, likelihood, and posterior together to see the prior's influence.

4. **Effective sample size:** For conjugate priors, interpret prior as equivalent to some number of observations. Is this reasonable?

**Example:** Estimating proportion with n = 20, x = 12.

| Prior | Posterior Mean | 95% CI |
|-------|---------------|---------|
| Beta(1, 1) | 0.591 | [0.39, 0.77] |
| Beta(5, 5) | 0.583 | [0.41, 0.74] |
| Beta(2, 8) | 0.538 | [0.37, 0.70] |

Conclusions are robust to reasonable prior choices, though the informative Beta(2,8) prior (suggesting lower values) pulls the estimate down slightly.

---

## Practical Recommendations

1. **Start with domain knowledge:** What do you genuinely know before seeing data?

2. **Use weakly informative priors as default:** They stabilize inference without dominating data.

3. **Leverage conjugacy when possible:** Simplifies computation and interpretation.

4. **Be transparent:** Document prior choices and justification.

5. **Check sensitivity:** Ensure conclusions are robust to reasonable prior specifications.

6. **Use prior predictive distributions:** Simulate data from prior to check if it matches expectations.

7. **Avoid improper priors:** Use proper priors with wide dispersion instead.

8. **Learn from data:** If prior and data conflict strongly, investigate why.

---

## Key Takeaways

- **Prior distributions** encode knowledge and uncertainty about parameters before seeing data

- **Informative priors** incorporate substantial knowledge; **non-informative priors** attempt minimal influence

- **Conjugate priors** yield posterior in same family as prior, enabling analytical solutions

- **Beta-Binomial**, **Normal-Normal**, and **Gamma-Poisson** are common conjugate pairs

- **Jeffreys priors** are invariant under reparameterization but can be improper

- **Prior elicitation** translates expert knowledge into probability distributions

- **Sensitivity analysis** checks robustness of conclusions to prior specification

- **Weakly informative priors** balance incorporating domain knowledge with letting data dominate

The choice of prior is not arbitrary—it should reflect genuine knowledge, be computationally tractable, and be transparent. When in doubt, use weakly informative priors and check sensitivity.
