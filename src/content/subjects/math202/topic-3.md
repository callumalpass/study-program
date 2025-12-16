# Topic 3: Probability Distributions

## Overview

Probability distributions are mathematical functions that describe the likelihood of different outcomes in random phenomena. They form the foundation of statistical analysis, enabling us to model uncertainty, make predictions, and draw inferences from data. This topic explores the most important discrete and continuous probability distributions, their properties, relationships, and applications.

Understanding probability distributions allows us to:
- Model real-world random processes mathematically
- Calculate probabilities of various events
- Make informed decisions under uncertainty
- Perform statistical inference and hypothesis testing
- Understand the theoretical foundations of data analysis

## Learning Objectives

By the end of this topic, you should be able to:

1. **Identify and apply** discrete distributions (Bernoulli, binomial, Poisson, geometric, negative binomial, discrete uniform)
2. **Identify and apply** continuous distributions (normal, exponential, gamma, continuous uniform)
3. **Calculate** probabilities, expected values, variances, and other properties of distributions
4. **Recognize** when specific distributions are appropriate for modeling real-world scenarios
5. **Understand** relationships between different distributions
6. **Apply** the Central Limit Theorem to approximate distributions and perform inference
7. **Use** standardization and z-scores for normal distribution calculations
8. **Interpret** distribution properties in practical contexts

## Key Concepts

### Discrete Probability Distributions

Discrete distributions model random variables that take on countable values (integers, finite sets). The **probability mass function (PMF)** $P(X = k)$ gives the probability of each specific value.

**Common Properties:**
- $P(X = k) \geq 0$ for all $k$
- $\sum_k P(X = k) = 1$
- $E[X] = \sum_k k \cdot P(X = k)$
- $\text{Var}(X) = E[X^2] - (E[X])^2$

### Continuous Probability Distributions

Continuous distributions model random variables that can take any value in an interval. The **probability density function (PDF)** $f(x)$ describes the relative likelihood of values, with probabilities given by integrals.

**Common Properties:**
- $f(x) \geq 0$ for all $x$
- $\int_{-\infty}^{\infty} f(x) \, dx = 1$
- $P(a \leq X \leq b) = \int_a^b f(x) \, dx$
- $E[X] = \int_{-\infty}^{\infty} x \cdot f(x) \, dx$

The **cumulative distribution function (CDF)** $F(x) = P(X \leq x)$ applies to both discrete and continuous distributions.

## Distribution Families

### Bernoulli Trial Distributions

These distributions arise from sequences of independent binary trials:

- **Bernoulli(p):** Single trial, success/failure
- **Binomial(n, p):** Number of successes in $n$ trials (fixed trials, count successes)
- **Geometric(p):** Number of trials until first success (count trials, fixed successes = 1)
- **Negative Binomial(r, p):** Number of trials until $r$-th success (count trials, fixed successes = $r$)

**Relationships:**
- Binomial is the sum of $n$ independent Bernoulli trials
- Geometric is a special case of negative binomial with $r = 1$
- Negative binomial is the sum of $r$ independent geometric variables

### Poisson Process Distributions

These model events occurring over time or space:

- **Poisson($\lambda$):** Number of events in a fixed interval (discrete)
- **Exponential($\lambda$):** Time until first event (continuous)
- **Gamma($\alpha$, $\lambda$):** Time until $\alpha$-th event (continuous, generalization of exponential)

**Relationships:**
- Poisson approximates binomial when $n$ is large, $p$ is small, and $np = \lambda$
- Exponential is time analog of geometric (memoryless property)
- Gamma with $\alpha = k$ is the sum of $k$ independent exponential variables
- Gamma with $\alpha = 1$ reduces to exponential

### Uniform Distributions

These represent complete uncertainty or equal likelihood:

- **Discrete Uniform{a, b}:** Equal probability for each integer in $\{a, a+1, \ldots, b\}$
- **Continuous Uniform(a, b):** Constant density over interval $[a, b]$

The standard uniform $\mathcal{U}(0, 1)$ is fundamental for random number generation and simulation.

### Normal Distribution Family

The normal distribution is the most important continuous distribution:

- **Normal($\mu$, $\sigma^2$):** Bell-shaped, characterized by mean and variance
- **Standard Normal:** $N(0, 1)$, used for standardization via z-scores
- Approximates many other distributions for large samples (via CLT)

## Important Properties and Theorems

### Memoryless Property

Only two distributions have the memoryless property:
- **Geometric (discrete):** $P(X > m+n \mid X > m) = P(X > n)$
- **Exponential (continuous):** $P(X > s+t \mid X > s) = P(X > t)$

This property means the past doesn't affect future waiting times.

### Central Limit Theorem

The most important result in probability theory: For i.i.d. random variables $X_1, \ldots, X_n$ with mean $\mu$ and variance $\sigma^2$:

$$\frac{\bar{X}_n - \mu}{\sigma/\sqrt{n}} \xrightarrow{d} N(0, 1) \quad \text{as } n \to \infty$$

**Implications:**
- Averages tend toward normal distribution regardless of the original distribution
- Foundation for confidence intervals and hypothesis testing
- Explains why the normal distribution appears so frequently in nature
- Typically requires $n \geq 30$ for good approximation

### Relationships Summary

```
Bernoulli(p) → [n trials] → Binomial(n,p)
                ↓ [n→∞, p→0, np=λ]
Geometric(p) → [r trials] → NegBin(r,p)     Poisson(λ)
                                               ↓ [continuous time]
                                             Exp(λ) → [k events] → Gamma(k,λ)

DiscreteUniform → [continuous] → ContinuousUniform(a,b)
                                       ↓ [a=0, b=1]
                                   Standard Uniform(0,1)

All distributions → [CLT, large n] → Normal(μ,σ²)
                                        ↓ [standardize]
                                    Standard Normal(0,1)
```

## Applications by Distribution

| Distribution | Primary Applications |
|--------------|---------------------|
| Bernoulli/Binomial | Quality control, survey sampling, A/B testing, genetics |
| Poisson | Rare events, queueing, radioactive decay, web traffic |
| Geometric/Negative Binomial | Waiting times, reliability, clinical trials |
| Uniform | Random number generation, Bayesian priors, simulation |
| Normal | Natural measurements, errors, test scores, CLT applications |
| Exponential | Component lifetimes, inter-arrival times, radioactive decay |
| Gamma | Waiting times for multiple events, rainfall, insurance claims |

## Choosing the Right Distribution

**Ask these questions:**

1. **Discrete or continuous?**
   - Countable outcomes → Discrete
   - Measurable quantities → Continuous

2. **What is fixed and what is random?**
   - Fixed trials, count successes → Binomial
   - Fixed successes, count trials → Negative Binomial
   - Fixed time, count events → Poisson
   - Fixed events, measure time → Exponential/Gamma

3. **What are the characteristics?**
   - Symmetric, bell-shaped → Normal
   - Equal probability → Uniform
   - Memoryless → Geometric or Exponential
   - Rare events → Poisson

4. **Are there theoretical justifications?**
   - Sums/averages of many variables → Normal (by CLT)
   - Events in Poisson process → Poisson/Exponential/Gamma

## Common Pitfalls and Misconceptions

1. **Confusing parameters:** Be clear whether parameters are rate or scale, mean or variance
2. **Ignoring independence:** Many distributions assume independence
3. **Misapplying CLT:** Requires finite variance and sufficient sample size
4. **Continuity correction:** Remember when approximating discrete with continuous
5. **Memoryless confusion:** Only geometric and exponential have this property
6. **PDF vs PMF:** PDF values can exceed 1 (probabilities come from integrals)

## Study Tips

1. **Focus on intuition:** Understand what each distribution models in the real world
2. **Know the formulas:** PMF/PDF, mean, variance for each distribution
3. **Practice identifying scenarios:** Given a problem, which distribution applies?
4. **Master standardization:** Converting to z-scores is essential for normal calculations
5. **Understand relationships:** How distributions connect and transform into each other
6. **Work many examples:** Probability is best learned through practice
7. **Use technology:** Statistical software and calculators for complex calculations
8. **Visualize distributions:** Sketch or plot distributions to understand their shapes

## Subtopics

1. **Bernoulli Trials and Binomial Distribution** - Foundation of discrete probability, counting successes
2. **Poisson Distribution** - Modeling rare events and count data
3. **Geometric and Negative Binomial Distributions** - Waiting time distributions
4. **Uniform Distribution** - Equal likelihood, discrete and continuous
5. **Normal Distribution** - The bell curve, z-scores, and standardization
6. **Exponential and Gamma Distributions** - Continuous waiting times and durations
7. **Central Limit Theorem** - The foundation of statistical inference

## Historical Context

The development of probability distributions spans centuries:

- **1654:** Pascal and Fermat lay foundations of probability theory
- **1713:** Jacob Bernoulli publishes work on binomial distribution
- **1733:** De Moivre discovers the normal distribution
- **1809:** Gauss applies normal distribution to astronomical errors
- **1837:** Poisson introduces his distribution for rare events
- **1930s:** Modern probability theory formalized by Kolmogorov

## Connections to Other Topics

- **Topic 1 (Foundations):** Uses sample spaces, events, and probability axioms
- **Topic 2 (Random Variables):** Distributions are functions of random variables
- **Topic 4 (Sampling Distributions):** Builds on CLT for inference
- **Topic 5 (Statistical Inference):** Uses distributions for hypothesis testing and confidence intervals

## Summary

Probability distributions provide mathematical models for random phenomena. The discrete distributions (Bernoulli, binomial, Poisson, geometric, negative binomial) model countable outcomes, while continuous distributions (uniform, normal, exponential, gamma) model measurable quantities. Understanding the properties, relationships, and applications of these distributions is essential for statistical analysis. The Central Limit Theorem unifies these concepts by showing that averages tend toward the normal distribution, providing the theoretical foundation for statistical inference.

Each distribution has its own characteristics, but they are interconnected through various relationships and limiting behaviors. Mastering these distributions requires understanding both their mathematical properties and their practical applications in modeling real-world uncertainty.
