## Introduction

In classical statistics, probabilities are viewed as long-run frequencies of events. Bayesian inference takes a fundamentally different approach: probability represents our degree of belief about unknown quantities, and we update these beliefs systematically as we observe data. This paradigm shift enables elegant solutions to many statistical problems and provides a natural framework for incorporating prior knowledge into our analyses.

**Learning Objectives:**
- Understand the Bayesian framework and how it differs from frequentist approaches
- Work with prior distributions and understand conjugacy
- Compute and interpret posterior distributions and credible intervals
- Apply Bayesian methods to estimation problems for proportions, means, and comparisons
- Use Bayes factors for hypothesis testing and model comparison
- Understand basic computational methods for Bayesian inference
- Apply Bayesian reasoning to real-world problems

---

## Core Concepts

### Bayes' Theorem

The foundation of Bayesian inference is Bayes' theorem, which describes how to update probabilities in light of new evidence:

$$P(\theta \mid x) = \frac{P(x \mid \theta) \cdot P(\theta)}{P(x)}$$

Where:
- $P(\theta \mid x)$ is the **posterior distribution** (our updated belief about $\theta$ after seeing data $x$)
- $P(x \mid \theta)$ is the **likelihood** (how probable the data is for different values of $\theta$)
- $P(\theta)$ is the **prior distribution** (our initial belief about $\theta$ before seeing data)
- $P(x)$ is the **marginal likelihood** or evidence (a normalizing constant)

This simple formula encapsulates a complete learning process: we start with prior beliefs, observe data, and systematically update our beliefs to obtain the posterior.

### The Bayesian Workflow

A typical Bayesian analysis follows these steps:

1. **Specify the prior**: Choose a distribution $P(\theta)$ representing initial beliefs about the parameter
2. **Define the likelihood**: Specify $P(x \mid \theta)$, the probability model for the data
3. **Collect data**: Observe the actual data $x$
4. **Compute the posterior**: Apply Bayes' theorem to get $P(\theta \mid x)$
5. **Make inferences**: Use the posterior for point estimates, intervals, predictions, or decisions

### Bayesian vs Frequentist

The two major schools of statistical thought differ fundamentally:

**Frequentist approach:**
- Parameters are fixed (unknown) constants
- Probabilities represent long-run frequencies
- Inference based on what would happen in repeated sampling
- Confidence intervals: 95% of such intervals would contain the true parameter
- No formal way to incorporate prior knowledge

**Bayesian approach:**
- Parameters are random variables with distributions
- Probabilities represent degrees of belief
- Inference based on the observed data only
- Credible intervals: there's a 95% probability the parameter is in this interval
- Prior knowledge naturally incorporated through the prior distribution

### Conjugate Priors

When the prior and posterior belong to the same family of distributions, we call the prior a **conjugate prior**. This mathematical convenience allows us to compute posteriors analytically:

**Common conjugate pairs:**
- Beta prior + Binomial likelihood → Beta posterior (for proportions)
- Normal prior + Normal likelihood → Normal posterior (for means with known variance)
- Gamma prior + Poisson likelihood → Gamma posterior (for rates)
- Normal-Gamma prior + Normal likelihood → Normal-Gamma posterior (for means and variances)

### Bayesian Estimation

Instead of computing a single point estimate, Bayesian inference produces an entire posterior distribution. From this we can extract:

- **Point estimates**: Posterior mean, median, or mode (MAP)
- **Interval estimates**: Credible intervals containing a specified probability
- **Full uncertainty**: The complete shape of the posterior
- **Predictions**: Posterior predictive distributions for future observations

### Hypothesis Testing

Rather than p-values and significance tests, Bayesian hypothesis testing uses:

- **Bayes factors**: The ratio of evidence for one hypothesis versus another
- **Posterior odds**: Updated odds after seeing data
- **Model comparison**: Comparing posterior probabilities of different models

---

## Key Applications

Bayesian inference is particularly powerful for:

1. **Small sample problems** - Prior information helps when data is limited
2. **Sequential learning** - Today's posterior becomes tomorrow's prior
3. **Hierarchical models** - Natural framework for multi-level data structures
4. **Decision making** - Incorporates both uncertainty and utilities
5. **Prediction** - Accounts for all sources of uncertainty
6. **A/B testing** - More intuitive interpretation than frequentist tests
7. **Machine learning** - Bayesian neural networks, Gaussian processes

---

## Summary

Bayesian inference provides a coherent framework for statistical learning:

- **Bayes' theorem** updates beliefs from prior to posterior using observed data
- **Prior distributions** encode initial knowledge or uncertainty
- **Posterior distributions** represent updated beliefs after seeing data
- **Credible intervals** directly quantify our uncertainty about parameters
- **Bayes factors** compare the evidence for competing hypotheses
- **Computational methods** enable Bayesian analysis for complex problems
- **Real applications** span A/B testing, classification, and medical diagnosis

The Bayesian approach offers intuitive interpretations, principled uncertainty quantification, and a natural way to incorporate prior knowledge into statistical inference.
