---
id: math202-t4-moments
title: "Method of Moments"
order: 3
---

# Method of Moments Estimation

The method of moments is one of the oldest and most intuitive approaches to parameter estimation. The core idea is beautifully simple: equate population moments (theoretical) to sample moments (observed) and solve for the unknown parameters. Despite its simplicity, it produces estimators that are often consistent and reasonably efficient.

## The Fundamental Idea

**Moments** are expected values of powers of a random variable:
- **First moment:** $E[X] = \mu_1'$ (the mean)
- **Second moment:** $E[X^2] = \mu_2'$
- **Third moment:** $E[X^3] = \mu_3'$
- **k-th moment:** $E[X^k] = \mu_k'$

**Central moments** are moments about the mean:
- **Second central moment:** $E[(X-\mu)^2] = \mu_2 = \sigma^2$ (the variance)
- **k-th central moment:** $E[(X-\mu)^k] = \mu_k$

**Sample moments** are the sample analogs:
- **First sample moment:** $m_1' = \frac{1}{n}\sum_{i=1}^n X_i = \bar{X}$
- **Second sample moment:** $m_2' = \frac{1}{n}\sum_{i=1}^n X_i^2$
- **k-th sample moment:** $m_k' = \frac{1}{n}\sum_{i=1}^n X_i^k$

## The Method of Moments Procedure

Suppose we have a distribution with $k$ unknown parameters $\theta_1, \theta_2, \ldots, \theta_k$.

**Steps:**

1. **Express the first $k$ population moments as functions of the parameters:**
   $$\mu_1' = g_1(\theta_1, \ldots, \theta_k)$$
   $$\mu_2' = g_2(\theta_1, \ldots, \theta_k)$$
   $$\vdots$$
   $$\mu_k' = g_k(\theta_1, \ldots, \theta_k)$$

2. **Set these equal to the corresponding sample moments:**
   $$m_1' = g_1(\theta_1, \ldots, \theta_k)$$
   $$m_2' = g_2(\theta_1, \ldots, \theta_k)$$
   $$\vdots$$
   $$m_k' = g_k(\theta_1, \ldots, \theta_k)$$

3. **Solve this system of equations for $\theta_1, \ldots, \theta_k$:**
   The solutions $\hat{\theta}_1, \ldots, \hat{\theta}_k$ are the **method of moments estimators**.

**Key Insight:** We're matching the theoretical moments (which depend on unknown parameters) to the observed sample moments (which we can calculate from data).

## One-Parameter Distributions

For distributions with a single parameter, we typically only need to use the first moment (mean).

### Example 1: Exponential Distribution

The exponential distribution has density $f(x; \lambda) = \lambda e^{-\lambda x}$ for $x \geq 0$.

**Population mean:** $E[X] = \frac{1}{\lambda}$

**Method of moments:**
Set the population mean equal to the sample mean:
$$\frac{1}{\lambda} = \bar{X}$$

Solve for $\lambda$:
$$\hat{\lambda}_{MM} = \frac{1}{\bar{X}}$$

**Numerical Example:** We observe waiting times (in minutes): 2.3, 5.1, 1.8, 3.4, 0.9, 4.2.

Sample mean: $\bar{x} = \frac{2.3 + 5.1 + 1.8 + 3.4 + 0.9 + 4.2}{6} = \frac{17.7}{6} = 2.95$

Method of moments estimate: $\hat{\lambda}_{MM} = \frac{1}{2.95} \approx 0.339$

### Example 2: Poisson Distribution

The Poisson distribution has mass function $P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$.

**Population mean:** $E[X] = \lambda$

**Method of moments:**
Set the population mean equal to the sample mean:
$$\lambda = \bar{X}$$

Therefore:
$$\hat{\lambda}_{MM} = \bar{X}$$

**Numerical Example:** We count the number of customers arriving per hour over 8 hours: 12, 9, 15, 11, 8, 13, 10, 14.

Sample mean: $\bar{x} = \frac{12 + 9 + 15 + 11 + 8 + 13 + 10 + 14}{8} = \frac{92}{8} = 11.5$

Method of moments estimate: $\hat{\lambda}_{MM} = 11.5$

### Example 3: Geometric Distribution

The geometric distribution (number of trials until first success) has $E[X] = \frac{1}{p}$.

**Method of moments:**
$$\frac{1}{p} = \bar{X}$$

$$\hat{p}_{MM} = \frac{1}{\bar{X}}$$

**Numerical Example:** We record the number of free throws a basketball player takes until making one, over 5 attempts: 3, 1, 2, 1, 4.

Sample mean: $\bar{x} = \frac{3 + 1 + 2 + 1 + 4}{5} = 2.2$

Method of moments estimate: $\hat{p}_{MM} = \frac{1}{2.2} \approx 0.455$

## Two-Parameter Distributions

For distributions with two parameters, we need two equations, typically using the first and second moments.

### Example 4: Normal Distribution

The normal distribution $N(\mu, \sigma^2)$ has two parameters.

**Population moments:**
- $E[X] = \mu$
- $E[X^2] = \sigma^2 + \mu^2$ (since $\text{Var}(X) = E[X^2] - (E[X])^2$)

Alternatively, we can use the mean and variance directly:
- $E[X] = \mu$
- $\text{Var}(X) = \sigma^2$

**Method of moments:**
$$\mu = \bar{X}$$
$$\sigma^2 = \frac{1}{n}\sum_{i=1}^n (X_i - \bar{X})^2$$

Therefore:
$$\hat{\mu}_{MM} = \bar{X}$$
$$\hat{\sigma}^2_{MM} = \frac{1}{n}\sum_{i=1}^n (X_i - \bar{X})^2$$

**Note:** This gives the MLE for $\sigma^2$, which uses $n$ in the denominator. The unbiased estimator uses $n-1$.

### Example 5: Gamma Distribution

The gamma distribution has density:
$$f(x; \alpha, \beta) = \frac{1}{\Gamma(\alpha)\beta^\alpha}x^{\alpha-1}e^{-x/\beta}, \quad x > 0$$

**Population moments:**
- $E[X] = \alpha\beta$
- $\text{Var}(X) = \alpha\beta^2$

**Method of moments:**
Set $E[X] = \bar{X}$ and $\text{Var}(X) = \frac{1}{n}\sum_{i=1}^n (X_i - \bar{X})^2$:

$$\alpha\beta = \bar{X}$$
$$\alpha\beta^2 = \frac{1}{n}\sum_{i=1}^n (X_i - \bar{X})^2$$

Divide the second equation by the first:
$$\beta = \frac{\sum_{i=1}^n (X_i - \bar{X})^2}{n\bar{X}}$$

Substitute back:
$$\alpha = \frac{\bar{X}}{\beta} = \frac{n\bar{X}^2}{\sum_{i=1}^n (X_i - \bar{X})^2}$$

**Numerical Example:** Data: 3.2, 5.1, 2.8, 4.3, 6.0, 3.9, 4.7, 5.5.

Calculate: $\bar{x} = 4.4375$, $\sum(x_i - \bar{x})^2 = 11.97875$

$$\hat{\beta}_{MM} = \frac{11.97875}{8 \times 4.4375} = \frac{11.97875}{35.5} \approx 0.337$$

$$\hat{\alpha}_{MM} = \frac{8 \times (4.4375)^2}{11.97875} = \frac{157.64}{11.97875} \approx 13.16$$

### Example 6: Uniform Distribution

Suppose $X \sim \text{Uniform}(a, b)$ where both $a$ and $b$ are unknown.

**Population moments:**
- $E[X] = \frac{a+b}{2}$
- $\text{Var}(X) = \frac{(b-a)^2}{12}$

**Method of moments:**
$$\frac{a+b}{2} = \bar{X}$$
$$\frac{(b-a)^2}{12} = \frac{1}{n}\sum_{i=1}^n (X_i - \bar{X})^2$$

From the first equation: $a + b = 2\bar{X}$

From the second equation: $(b-a)^2 = 12 \cdot \frac{1}{n}\sum_{i=1}^n (X_i - \bar{X})^2$

So: $b - a = \sqrt{12 \cdot \frac{1}{n}\sum_{i=1}^n (X_i - \bar{X})^2} = 2\sqrt{3} \cdot \sqrt{\frac{1}{n}\sum_{i=1}^n (X_i - \bar{X})^2}$

Solving the system:
$$\hat{a}_{MM} = \bar{X} - \sqrt{3} \cdot \sqrt{\frac{1}{n}\sum_{i=1}^n (X_i - \bar{X})^2}$$
$$\hat{b}_{MM} = \bar{X} + \sqrt{3} \cdot \sqrt{\frac{1}{n}\sum_{i=1}^n (X_i - \bar{X})^2}$$

**Note:** For the uniform distribution, there are better estimators (like using the minimum and maximum of the sample), but this illustrates the method.

## Properties of Method of Moments Estimators

### Consistency

Under regularity conditions, method of moments estimators are **consistent**:
$$\hat{\theta}_{MM} \xrightarrow{P} \theta \text{ as } n \to \infty$$

This follows from the law of large numbers: sample moments converge to population moments.

### Asymptotic Normality

Method of moments estimators are typically **asymptotically normal**:
$$\sqrt{n}(\hat{\theta}_{MM} - \theta) \xrightarrow{d} N(0, V)$$

where $V$ is a variance that depends on the distribution.

### Not Always Efficient

While MM estimators are consistent and asymptotically normal, they're not always the most efficient. Maximum likelihood estimators (discussed next) generally have lower variance.

### Easy to Compute

A major advantage of the method of moments is computational simplicity. The estimators often have closed-form expressions, unlike MLEs which sometimes require numerical optimization.

## When Method of Moments Works Well

**Advantages:**
1. **Intuitive:** The logic is straightforward
2. **General:** Works for any distribution with finite moments
3. **Simple:** Often yields closed-form estimators
4. **No optimization needed:** Unlike MLE, no need to maximize a likelihood

**Disadvantages:**
1. **Not always efficient:** May have higher variance than MLE
2. **No guarantee of good properties in small samples:** Asymptotic theory applies to large samples
3. **May yield inadmissible estimates:** Sometimes produces estimates outside the parameter space (e.g., negative variance estimates)
4. **Not unique:** Different choices of moments can give different estimators

## Worked Example: Beta Distribution

The beta distribution $\text{Beta}(\alpha, \beta)$ has density:
$$f(x; \alpha, \beta) = \frac{\Gamma(\alpha + \beta)}{\Gamma(\alpha)\Gamma(\beta)}x^{\alpha-1}(1-x)^{\beta-1}, \quad 0 < x < 1$$

**Population moments:**
$$E[X] = \frac{\alpha}{\alpha + \beta}$$
$$\text{Var}(X) = \frac{\alpha\beta}{(\alpha+\beta)^2(\alpha+\beta+1)}$$

**Method of moments:**
Let $\bar{X} = m_1'$ and $s^2 = \frac{1}{n}\sum_{i=1}^n(X_i - \bar{X})^2$.

From $E[X] = \frac{\alpha}{\alpha + \beta} = \bar{X}$:
$$\alpha = \bar{X}(\alpha + \beta)$$

From $\text{Var}(X) = \frac{\alpha\beta}{(\alpha+\beta)^2(\alpha+\beta+1)} = s^2$:

After algebraic manipulation (using $\mu = \bar{X}$ and $\sigma^2 = s^2$):
$$\hat{\alpha}_{MM} = \bar{X}\left(\frac{\bar{X}(1-\bar{X})}{s^2} - 1\right)$$
$$\hat{\beta}_{MM} = (1-\bar{X})\left(\frac{\bar{X}(1-\bar{X})}{s^2} - 1\right)$$

**Numerical Example:** Data representing proportions: 0.23, 0.45, 0.31, 0.52, 0.38, 0.41, 0.29, 0.47.

$\bar{x} = 0.3825$, $s^2 = 0.00956$

$$\frac{\bar{x}(1-\bar{x})}{s^2} = \frac{0.3825 \times 0.6175}{0.00956} \approx 24.71$$

$$\hat{\alpha}_{MM} = 0.3825 \times (24.71 - 1) = 0.3825 \times 23.71 \approx 9.07$$
$$\hat{\beta}_{MM} = 0.6175 \times 23.71 \approx 14.64$$

## Summary

**Method of Moments Algorithm:**
1. Find the first $k$ population moments as functions of the $k$ parameters
2. Set these equal to the sample moments
3. Solve for the parameters

**Key Formulas:**
- First sample moment: $m_1' = \bar{X}$
- Second sample moment: $m_2' = \frac{1}{n}\sum X_i^2$
- Sample variance: $s^2 = \frac{1}{n}\sum (X_i - \bar{X})^2$

**When to Use:**
- Need quick, simple estimates
- Analytic MLE is difficult to compute
- Preliminary analysis before more sophisticated methods

**Limitations:**
- May be less efficient than MLE
- Can produce estimates outside the parameter space
- Choice of moments matters for multi-parameter cases

The method of moments provides a solid, intuitive foundation for parameter estimation. While modern practice often favors maximum likelihood, MM estimators remain valuable for their simplicity and as starting values for iterative MLE computations.
