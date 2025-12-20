---
id: math202-t3-geometric
title: "Geometric and Negative Binomial"
order: 3
---

# Geometric and Negative Binomial Distributions

## Introduction

While the binomial distribution counts successes in a fixed number of trials, the geometric and negative binomial distributions answer a different question: "How many trials until we achieve a certain number of successes?" These **waiting time distributions** are fundamental in reliability theory, queueing systems, and any scenario involving sequential trials.

## Geometric Distribution

The **geometric distribution** models the number of trials needed to get the first success in a sequence of independent Bernoulli trials.

### Probability Mass Function

Let $X$ represent the trial number on which the first success occurs. Then:

$$P(X = k) = (1-p)^{k-1}p, \quad k = 1, 2, 3, \ldots$$

where $p$ is the probability of success on each trial.

We denote this as $X \sim \text{Geometric}(p)$ or $X \sim \text{Geom}(p)$.

**Interpretation:** We have $k-1$ failures (each with probability $1-p$), followed by one success (with probability $p$).

### Alternative Formulation

Some textbooks define the geometric distribution as the number of failures before the first success:

$$P(Y = k) = (1-p)^k p, \quad k = 0, 1, 2, \ldots$$

Here $Y = X - 1$. We'll use the first formulation (number of trials) unless otherwise specified.

### Properties of the Geometric Distribution

**Expected Value:**
$$E[X] = \frac{1}{p}$$

**Variance:**
$$\text{Var}(X) = \frac{1-p}{p^2}$$

**Standard Deviation:**
$$\sigma_X = \frac{\sqrt{1-p}}{p}$$

### Derivation of Expected Value

$$E[X] = \sum_{k=1}^{\infty} k(1-p)^{k-1}p = p\sum_{k=1}^{\infty} k(1-p)^{k-1}$$

Let $q = 1-p$. Using the fact that $\sum_{k=1}^{\infty} kx^{k-1} = \frac{1}{(1-x)^2}$ for $|x| < 1$:

$$E[X] = p \cdot \frac{1}{(1-q)^2} = p \cdot \frac{1}{p^2} = \frac{1}{p}$$

### Memoryless Property

The geometric distribution has the remarkable **memoryless property**:

$$P(X > m + n \mid X > m) = P(X > n)$$

This means that if we've already had $m$ failures, the probability of waiting at least $n$ more trials is the same as if we were starting fresh. The past doesn't matter.

**Proof:**

$$P(X > m + n \mid X > m) = \frac{P(X > m + n)}{P(X > m)} = \frac{(1-p)^{m+n}}{(1-p)^m} = (1-p)^n = P(X > n)$$

The geometric distribution is the **only discrete distribution** with this property.

### Worked Example 1: Rolling Dice

What is the expected number of rolls of a fair die until we get a 6? What is the probability it takes more than 10 rolls?

**Solution:**

Let $X$ = number of rolls until first 6. Then $X \sim \text{Geom}(\frac{1}{6})$.

**Expected value:**
$$E[X] = \frac{1}{p} = \frac{1}{1/6} = 6 \text{ rolls}$$

**Probability of more than 10 rolls:**
$$P(X > 10) = (1-p)^{10} = \left(\frac{5}{6}\right)^{10} \approx 0.1615$$

There's about a 16.15% chance it takes more than 10 rolls.

### Worked Example 2: Quality Control

A manufacturing process produces 2% defective items. If we inspect items one by one, what is the probability that the first defective item is the 5th item inspected?

**Solution:**

Let $X$ = position of first defective item. Then $X \sim \text{Geom}(0.02)$.

$$P(X = 5) = (1-0.02)^{5-1} \cdot 0.02 = (0.98)^4 \cdot 0.02$$

$$= 0.9224 \cdot 0.02 = 0.0185$$

The probability is approximately 1.85%.

## Negative Binomial Distribution

The **negative binomial distribution** generalizes the geometric distribution. Instead of waiting for the first success, we wait for the $r$-th success.

### Probability Mass Function

Let $X$ represent the trial number on which the $r$-th success occurs. Then:

$$P(X = k) = \binom{k-1}{r-1}p^r(1-p)^{k-r}, \quad k = r, r+1, r+2, \ldots$$

where:
- $r$ is the number of successes we're waiting for
- $p$ is the probability of success on each trial
- $k$ is the trial number on which the $r$-th success occurs

We denote this as $X \sim \text{NegBin}(r, p)$.

**Interpretation:** By trial $k$, we must have exactly $r$ successes and $k-r$ failures. The last trial (trial $k$) must be a success, and among the first $k-1$ trials, we need exactly $r-1$ successes.

### Alternative Formulation

Often the negative binomial is defined as the number of failures before the $r$-th success:

$$P(Y = k) = \binom{k+r-1}{r-1}p^r(1-p)^k, \quad k = 0, 1, 2, \ldots$$

Here $Y = X - r$.

### Properties of the Negative Binomial Distribution

**Expected Value:**
$$E[X] = \frac{r}{p}$$

**Variance:**
$$\text{Var}(X) = \frac{r(1-p)}{p^2}$$

**Standard Deviation:**
$$\sigma_X = \frac{\sqrt{r(1-p)}}{p}$$

### Connection to Geometric Distribution

The geometric distribution is a special case of the negative binomial with $r = 1$:

$$\text{Geom}(p) = \text{NegBin}(1, p)$$

Also, if $X_1, X_2, \ldots, X_r$ are independent $\text{Geom}(p)$ random variables, then:

$$X_1 + X_2 + \cdots + X_r \sim \text{NegBin}(r, p)$$

This makes intuitive sense: the sum of waiting times for $r$ individual successes is the total waiting time for $r$ successes.

### Worked Example 3: Basketball Free Throws

A basketball player has a 70% free throw success rate. What is the probability that she makes her 3rd successful free throw on her 6th attempt?

**Solution:**

Let $X$ = attempt number of 3rd success. Then $X \sim \text{NegBin}(3, 0.7)$.

$$P(X = 6) = \binom{6-1}{3-1}(0.7)^3(0.3)^{6-3}$$

$$= \binom{5}{2}(0.7)^3(0.3)^3$$

$$= 10 \cdot 0.343 \cdot 0.027 = 0.0926$$

The probability is approximately 9.26%.

**Expected number of attempts:**
$$E[X] = \frac{r}{p} = \frac{3}{0.7} \approx 4.29 \text{ attempts}$$

### Worked Example 4: Sales Calls

A salesperson closes a sale with probability 0.15 on each call. How many calls should they expect to make to close 5 sales? What is the variance?

**Solution:**

Let $X$ = number of calls to close 5 sales. Then $X \sim \text{NegBin}(5, 0.15)$.

**Expected value:**
$$E[X] = \frac{r}{p} = \frac{5}{0.15} = 33.33 \text{ calls}$$

**Variance:**
$$\text{Var}(X) = \frac{r(1-p)}{p^2} = \frac{5 \cdot 0.85}{(0.15)^2} = \frac{4.25}{0.0225} = 188.89$$

**Standard deviation:**
$$\sigma_X = \sqrt{188.89} \approx 13.74 \text{ calls}$$

The salesperson should expect to make about 33 calls, with considerable variability (standard deviation of about 14 calls).

## Comparing Binomial and Negative Binomial

| Feature | Binomial | Negative Binomial |
|---------|----------|-------------------|
| Fixed quantity | Number of trials $n$ | Number of successes $r$ |
| Random variable | Number of successes | Number of trials |
| Sample space | $\{0, 1, \ldots, n\}$ | $\{r, r+1, r+2, \ldots\}$ |
| PMF | $\binom{n}{k}p^k(1-p)^{n-k}$ | $\binom{k-1}{r-1}p^r(1-p)^{k-r}$ |
| Mean | $np$ | $\frac{r}{p}$ |

## Applications

### Geometric Distribution Applications

- Time until first failure in reliability testing
- Number of items inspected until finding the first defect
- Number of attempts until success in games of chance
- Time until first customer arrival
- Number of searches until finding a target

### Negative Binomial Applications

- Clinical trials: number of patients needed to observe $r$ adverse events
- Epidemiology: modeling overdispersed count data
- Ecology: modeling species abundance with more variance than Poisson
- Insurance: modeling claim counts
- Reliability: number of tests until $r$ failures occur

## Relationship Summary

$$\text{Geometric}(p) \xrightarrow{r=1} \text{NegBin}(r,p) \xrightarrow{\text{sum of } r} \sum_{i=1}^r \text{Geom}(p)$$

Both distributions are memoryless in the appropriate sense and share the fundamental characteristic of modeling waiting times in sequences of Bernoulli trials.

## Summary

The geometric and negative binomial distributions are essential for modeling sequential processes and waiting times. The geometric distribution answers "when will the first success occur?" while the negative binomial generalizes this to "when will the $r$-th success occur?" Their memoryless property and connection to Bernoulli trials make them indispensable tools in reliability analysis, quality control, and any field involving sequential random phenomena.
