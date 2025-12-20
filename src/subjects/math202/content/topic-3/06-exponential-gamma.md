# Exponential and Gamma Distributions

## Introduction

The exponential and gamma distributions are fundamental continuous distributions that model waiting times and durations. The exponential distribution describes the time until the first event in a Poisson process, while the gamma distribution generalizes this to the time until the $k$-th event. Together, they form a family of distributions essential for reliability analysis, queueing theory, and survival analysis.

## Exponential Distribution

The **exponential distribution** models the time between events in a Poisson process, making it the continuous analog of the geometric distribution.

### Probability Density Function

A random variable $X$ follows an exponential distribution with rate parameter $\lambda > 0$ if:

$$f(x) = \lambda e^{-\lambda x}, \quad x \geq 0$$

We denote this as $X \sim \text{Exp}(\lambda)$ or $X \sim \text{Exponential}(\lambda)$.

**Alternative parameterization:** Sometimes the exponential is parameterized by the scale parameter $\beta = \frac{1}{\lambda}$:

$$f(x) = \frac{1}{\beta} e^{-x/\beta}, \quad x \geq 0$$

### Cumulative Distribution Function

$$F(x) = P(X \leq x) = 1 - e^{-\lambda x}, \quad x \geq 0$$

**Derivation:**
$$F(x) = \int_0^x \lambda e^{-\lambda t} \, dt = \lambda \left[-\frac{1}{\lambda}e^{-\lambda t}\right]_0^x = -e^{-\lambda x} + 1 = 1 - e^{-\lambda x}$$

### Survival Function

The **survival function** (complementary CDF) is particularly important for reliability:

$$S(x) = P(X > x) = e^{-\lambda x}$$

This gives the probability that the event has not occurred by time $x$.

### Properties of Exponential Distribution

**Expected Value:**
$$E[X] = \frac{1}{\lambda}$$

**Variance:**
$$\text{Var}(X) = \frac{1}{\lambda^2}$$

**Standard Deviation:**
$$\sigma_X = \frac{1}{\lambda}$$

**Median:**
$$\text{Median} = \frac{\ln 2}{\lambda} \approx \frac{0.693}{\lambda}$$

**Mode:**
$$\text{Mode} = 0$$

**Derivation of Expected Value:**

$$E[X] = \int_0^{\infty} x \lambda e^{-\lambda x} \, dx$$

Using integration by parts with $u = x$, $dv = \lambda e^{-\lambda x} dx$:

$$E[X] = \left[-xe^{-\lambda x}\right]_0^{\infty} + \int_0^{\infty} e^{-\lambda x} \, dx = 0 + \left[-\frac{1}{\lambda}e^{-\lambda x}\right]_0^{\infty} = \frac{1}{\lambda}$$

### The Memoryless Property

The exponential distribution is the **only continuous distribution** with the memoryless property:

$$P(X > s + t \mid X > s) = P(X > t)$$

This means that if an event hasn't occurred by time $s$, the probability of waiting at least $t$ more time units is the same as the original probability of waiting at least $t$ time units.

**Proof:**

$$P(X > s + t \mid X > s) = \frac{P(X > s + t)}{P(X > s)} = \frac{e^{-\lambda(s+t)}}{e^{-\lambda s}} = e^{-\lambda t} = P(X > t)$$

**Interpretation:** The distribution "forgets" how long we've already waited. This property makes the exponential distribution ideal for modeling random, memoryless processes but inappropriate for aging systems.

### Worked Example 1: Customer Service

Phone calls to a help desk arrive at an average rate of 12 per hour. Assuming a Poisson process, what is the probability that the next call arrives within 3 minutes?

**Solution:**

The time between calls follows an exponential distribution. The rate is $\lambda = 12$ calls per hour $= 0.2$ calls per minute.

Let $X$ = time until next call (in minutes). Then $X \sim \text{Exp}(0.2)$.

$$P(X \leq 3) = 1 - e^{-\lambda x} = 1 - e^{-0.2 \cdot 3} = 1 - e^{-0.6}$$

$$= 1 - 0.5488 = 0.4512$$

The probability is approximately **45.12%**.

**Expected time until next call:**
$$E[X] = \frac{1}{\lambda} = \frac{1}{0.2} = 5 \text{ minutes}$$

### Worked Example 2: Component Lifetime

An electronic component has an exponential lifetime with mean 1000 hours. What is the probability it lasts at least 1500 hours? If it has already lasted 500 hours, what is the probability it lasts at least another 1000 hours?

**Solution:**

Mean = $\frac{1}{\lambda} = 1000$, so $\lambda = 0.001$ per hour.

**Part 1:**
$$P(X \geq 1500) = e^{-\lambda \cdot 1500} = e^{-0.001 \cdot 1500} = e^{-1.5} \approx 0.2231$$

Probability is about **22.31%**.

**Part 2:** Using the memoryless property:
$$P(X \geq 1500 \mid X \geq 500) = P(X \geq 1000) = e^{-0.001 \cdot 1000} = e^{-1} \approx 0.3679$$

Probability is about **36.79%**—the same as if it were new!

## Relationship Between Exponential and Poisson

If events occur according to a Poisson process with rate $\lambda$ per unit time:
- Number of events in time $t$: $N(t) \sim \text{Poisson}(\lambda t)$
- Time until first event: $T_1 \sim \text{Exp}(\lambda)$
- Time between consecutive events: $\text{Exp}(\lambda)$

The exponential and Poisson distributions are **dual**: one counts events in fixed time, the other measures time until a fixed number of events.

## Gamma Distribution

The **gamma distribution** generalizes the exponential distribution to model the time until the $k$-th event in a Poisson process.

### Probability Density Function

A random variable $X$ follows a gamma distribution with shape parameter $\alpha > 0$ and rate parameter $\lambda > 0$ if:

$$f(x) = \frac{\lambda^{\alpha}}{\Gamma(\alpha)} x^{\alpha-1} e^{-\lambda x}, \quad x > 0$$

where $\Gamma(\alpha)$ is the **gamma function**:

$$\Gamma(\alpha) = \int_0^{\infty} t^{\alpha-1} e^{-t} \, dt$$

We denote this as $X \sim \text{Gamma}(\alpha, \lambda)$.

**Special properties of the gamma function:**
- $\Gamma(n) = (n-1)!$ for positive integers $n$
- $\Gamma(1) = 1$
- $\Gamma(1/2) = \sqrt{\pi}$
- $\Gamma(\alpha + 1) = \alpha \Gamma(\alpha)$ (recursive property)

### Alternative Parameterization

The gamma distribution is also parameterized using shape $k$ and scale $\theta = \frac{1}{\lambda}$:

$$f(x) = \frac{1}{\Gamma(k)\theta^k} x^{k-1} e^{-x/\theta}, \quad x > 0$$

Then $X \sim \text{Gamma}(k, \theta)$ with $E[X] = k\theta$ and $\text{Var}(X) = k\theta^2$.

### Properties of Gamma Distribution

Using the shape-rate parameterization $\text{Gamma}(\alpha, \lambda)$:

**Expected Value:**
$$E[X] = \frac{\alpha}{\lambda}$$

**Variance:**
$$\text{Var}(X) = \frac{\alpha}{\lambda^2}$$

**Standard Deviation:**
$$\sigma_X = \frac{\sqrt{\alpha}}{\lambda}$$

**Mode (for $\alpha \geq 1$):**
$$\text{Mode} = \frac{\alpha - 1}{\lambda}$$

### Special Cases

1. **Exponential distribution:** $\text{Gamma}(1, \lambda) = \text{Exp}(\lambda)$

   When $\alpha = 1$: $f(x) = \lambda e^{-\lambda x}$

2. **Erlang distribution:** $\text{Gamma}(k, \lambda)$ where $k$ is a positive integer

   Models time until $k$-th event in a Poisson process

3. **Chi-squared distribution:** $\text{Gamma}(k/2, 1/2) = \chi^2_k$

   Important in statistical inference

### Sum of Exponential Random Variables

If $X_1, X_2, \ldots, X_k$ are independent $\text{Exp}(\lambda)$ random variables, then:

$$X_1 + X_2 + \cdots + X_k \sim \text{Gamma}(k, \lambda)$$

This makes intuitive sense: the sum of waiting times for $k$ independent events is the total waiting time until the $k$-th event.

### Worked Example 3: Network Packets

In a network, packets arrive according to a Poisson process with rate 30 packets per second. What is the expected time until 10 packets arrive? What is the probability this takes more than 0.5 seconds?

**Solution:**

Let $X$ = time until 10th packet. Then $X \sim \text{Gamma}(10, 30)$.

**Expected value:**
$$E[X] = \frac{\alpha}{\lambda} = \frac{10}{30} = \frac{1}{3} \approx 0.333 \text{ seconds}$$

**Variance:**
$$\text{Var}(X) = \frac{\alpha}{\lambda^2} = \frac{10}{900} = \frac{1}{90} \approx 0.0111$$

**Standard deviation:**
$$\sigma_X = \sqrt{1/90} \approx 0.105 \text{ seconds}$$

**Probability calculation:**
$$P(X > 0.5) = 1 - P(X \leq 0.5)$$

This requires numerical integration or statistical software. Using the gamma CDF:
$$P(X > 0.5) \approx 0.083$$

About **8.3%** chance it takes more than half a second.

### Worked Example 4: Reliability

A system has 5 independent components, each with exponential lifetime with mean 100 hours. The system fails when the 3rd component fails. What is the expected system lifetime?

**Solution:**

Each component has lifetime $\sim \text{Exp}(1/100)$.

The time until the 3rd failure (out of 5 components) doesn't follow a simple gamma distribution because we're looking at the 3rd order statistic. However, if we're considering the sum of the first 3 component lifetimes in a series system:

If components fail in sequence, time to 3rd failure: $X \sim \text{Gamma}(3, 1/100)$

$$E[X] = \frac{3}{1/100} = 300 \text{ hours}$$

## Relationships Between Distributions

$$\text{Exponential}(\lambda) \xrightarrow{\alpha=1} \text{Gamma}(\alpha, \lambda) \xrightarrow{\alpha=k/2, \lambda=1/2} \chi^2_k$$

$$\sum_{i=1}^k \text{Exp}(\lambda) = \text{Gamma}(k, \lambda)$$

## Applications

### Exponential Distribution

- **Queueing theory:** Inter-arrival times, service times
- **Reliability engineering:** Time to failure for systems without aging
- **Radioactive decay:** Time between emissions
- **Finance:** Time between trades
- **Survival analysis:** Disease-free survival (when hazard is constant)

### Gamma Distribution

- **Hydrology:** Rainfall amounts, flood frequencies
- **Insurance:** Aggregate claims
- **Reliability:** Time until $k$-th failure
- **Bayesian statistics:** Prior distribution for variance
- **Telecommunications:** Packet arrival times

## Summary

The exponential and gamma distributions form a family of continuous distributions for modeling waiting times and durations. The exponential distribution's memoryless property makes it ideal for random, non-aging processes, while the gamma distribution extends this to model the time until multiple events. Their connection to the Poisson process, mathematical tractability, and wide applicability make them essential tools in probability and statistics, particularly in reliability engineering, queueing theory, and survival analysis.
