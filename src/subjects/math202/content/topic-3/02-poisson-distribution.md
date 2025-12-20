---
id: math202-t3-poisson
title: "Poisson Distribution"
order: 2
---

# Poisson Distribution

## Introduction

The Poisson distribution, named after French mathematician Siméon Denis Poisson, models the number of events occurring in a fixed interval of time or space when these events occur with a known average rate and independently of the time since the last event. It is one of the most important discrete probability distributions in applied statistics.

## The Poisson Process

A **Poisson process** is a stochastic process that counts the number of events occurring in a given time period. For a process to be Poisson, it must satisfy:

1. **Independence:** The number of occurrences in non-overlapping intervals are independent
2. **Stationarity:** The probability of an occurrence in an interval depends only on the length of the interval, not when it occurs
3. **No simultaneity:** The probability of two or more events occurring in an infinitesimally small interval is negligible
4. **Constant rate:** Events occur at a constant average rate $\lambda$

### Examples of Poisson Processes

- Number of phone calls received at a call center per hour
- Number of radioactive particles emitted by a substance per second
- Number of customers arriving at a store per day
- Number of typos per page in a manuscript
- Number of earthquakes in a region per year
- Number of emails received per hour

## Poisson Distribution Definition

A random variable $X$ follows a **Poisson distribution** with parameter $\lambda > 0$ if:

$$P(X = k) = \frac{\lambda^k e^{-\lambda}}{k!}, \quad k = 0, 1, 2, 3, \ldots$$

where:
- $\lambda$ is the expected number of events in the interval (rate parameter)
- $e \approx 2.71828$ is Euler's number
- $k$ is the number of occurrences

We denote this as $X \sim \text{Poisson}(\lambda)$ or $X \sim \text{Pois}(\lambda)$.

### Verification that PMF Sums to 1

$$\sum_{k=0}^{\infty} P(X = k) = \sum_{k=0}^{\infty} \frac{\lambda^k e^{-\lambda}}{k!} = e^{-\lambda} \sum_{k=0}^{\infty} \frac{\lambda^k}{k!} = e^{-\lambda} \cdot e^{\lambda} = 1$$

This uses the Taylor series expansion: $e^{\lambda} = \sum_{k=0}^{\infty} \frac{\lambda^k}{k!}$

## Properties of the Poisson Distribution

**Expected Value:**
$$E[X] = \lambda$$

**Variance:**
$$\text{Var}(X) = \lambda$$

**Standard Deviation:**
$$\sigma_X = \sqrt{\lambda}$$

**Moment Generating Function:**
$$M_X(t) = e^{\lambda(e^t - 1)}$$

A remarkable property of the Poisson distribution is that **its mean equals its variance**. This property can be used to test whether data follows a Poisson distribution.

### Derivation of Expected Value

$$E[X] = \sum_{k=0}^{\infty} k \cdot \frac{\lambda^k e^{-\lambda}}{k!} = \sum_{k=1}^{\infty} k \cdot \frac{\lambda^k e^{-\lambda}}{k!}$$

$$= \lambda e^{-\lambda} \sum_{k=1}^{\infty} \frac{\lambda^{k-1}}{(k-1)!} = \lambda e^{-\lambda} \sum_{j=0}^{\infty} \frac{\lambda^j}{j!} = \lambda e^{-\lambda} \cdot e^{\lambda} = \lambda$$

## Worked Example 1: Customer Arrivals

A coffee shop receives an average of 15 customers per hour. What is the probability of getting exactly 10 customers in a given hour?

**Solution:**

Let $X$ = number of customers in one hour. Then $X \sim \text{Pois}(15)$.

$$P(X = 10) = \frac{15^{10} e^{-15}}{10!}$$

$$= \frac{576,650,390,625 \cdot 0.000000306}{3,628,800}$$

$$= \frac{176,491}{3,628,800} \approx 0.0486$$

The probability is approximately 4.86%.

## Worked Example 2: Rare Events

A hospital emergency room receives an average of 2.5 ambulance arrivals per night. What is the probability of receiving at most 1 ambulance in a given night?

**Solution:**

Let $X$ = number of ambulances. Then $X \sim \text{Pois}(2.5)$.

$$P(X \leq 1) = P(X = 0) + P(X = 1)$$

$$P(X = 0) = \frac{2.5^0 e^{-2.5}}{0!} = e^{-2.5} \approx 0.0821$$

$$P(X = 1) = \frac{2.5^1 e^{-2.5}}{1!} = 2.5 \cdot e^{-2.5} \approx 0.2052$$

$$P(X \leq 1) \approx 0.0821 + 0.2052 = 0.2873$$

The probability is approximately 28.73%.

## Relation to Binomial Distribution

The Poisson distribution can be derived as a limiting case of the binomial distribution. Specifically, if $X_n \sim B(n, p_n)$ where:

- $n \to \infty$ (number of trials becomes very large)
- $p_n \to 0$ (probability of success becomes very small)
- $np_n \to \lambda$ (the expected number of successes remains constant)

Then $X_n$ converges in distribution to $\text{Pois}(\lambda)$.

### Poisson Approximation to Binomial

When $n \geq 20$, $p \leq 0.05$, and $np < 10$, we can approximate:

$$B(n, p) \approx \text{Pois}(np)$$

This approximation is useful because Poisson probabilities are often easier to compute than binomial probabilities for large $n$.

### Example: Approximation

Suppose we flip a coin 1000 times. What is the probability of getting exactly 3 heads?

Using binomial: $X \sim B(1000, 0.5)$ (difficult to compute)

But wait, $p = 0.5$ is not small, so Poisson approximation is inappropriate here.

Better example: A factory produces 10,000 items with a 0.0002 defect rate. What's the probability of exactly 3 defects?

**Exact (Binomial):**
$$P(X = 3) = \binom{10000}{3}(0.0002)^3(0.9998)^{9997}$$

This is computationally intensive.

**Approximation (Poisson):**
With $\lambda = np = 10000 \times 0.0002 = 2$:

$$P(X = 3) \approx \frac{2^3 e^{-2}}{3!} = \frac{8 \cdot 0.1353}{6} \approx 0.1804$$

The approximation is much simpler to compute!

## Sum of Independent Poisson Variables

If $X_1 \sim \text{Pois}(\lambda_1)$ and $X_2 \sim \text{Pois}(\lambda_2)$ are independent, then:

$$X_1 + X_2 \sim \text{Pois}(\lambda_1 + \lambda_2)$$

This property extends to any number of independent Poisson random variables.

### Example: Combined Arrivals

If a store receives an average of 20 customers in the morning and 30 in the afternoon, the total for the day follows $\text{Pois}(50)$.

## Changing Time Intervals

If events occur at rate $\lambda$ per unit time, then in time interval $t$, the number of events follows:

$$X \sim \text{Pois}(\lambda t)$$

### Example: Scaling Time

If a website receives an average of 100 visits per hour, then:
- In 30 minutes: $X \sim \text{Pois}(50)$
- In 2 hours: $X \sim \text{Pois}(200)$
- In 1 day (24 hours): $X \sim \text{Pois}(2400)$

## Applications of the Poisson Distribution

1. **Queueing Theory:** Modeling customer arrivals, service requests
2. **Reliability Engineering:** Counting failures or defects
3. **Telecommunications:** Modeling call arrivals, packet transmissions
4. **Biology:** Counting cells, bacteria colonies, mutations
5. **Astronomy:** Counting photons, cosmic ray detections
6. **Insurance:** Modeling claim frequencies
7. **Traffic Engineering:** Counting vehicles passing a point
8. **Ecology:** Modeling rare species counts

## The Mode of Poisson Distribution

The mode (most probable value) is:
- $\lfloor \lambda \rfloor$ and $\lceil \lambda \rceil$ if $\lambda$ is an integer (bimodal)
- $\lfloor \lambda \rfloor$ otherwise

## Normal Approximation

For large $\lambda$ (typically $\lambda > 10$), the Poisson distribution can be approximated by a normal distribution:

$$\text{Pois}(\lambda) \approx N(\lambda, \lambda)$$

With continuity correction for better accuracy.

## Summary

The Poisson distribution is essential for modeling count data and rare events. Its simplicity (single parameter $\lambda$), mathematical tractability, and wide applicability make it one of the most used distributions in statistics. The key insight is that when many independent rare events can occur, their total count follows a Poisson distribution characterized entirely by the average rate $\lambda$.
