# Uniform Distribution

## Introduction

The uniform distribution is the simplest probability distribution, where all outcomes in a given range are equally likely. It serves as a fundamental building block in probability theory and appears naturally in many applications, from random number generation to modeling complete uncertainty. We distinguish between discrete and continuous versions, each with distinct properties and applications.

## Discrete Uniform Distribution

The **discrete uniform distribution** assigns equal probability to each of a finite number of outcomes.

### Probability Mass Function

If $X$ can take any of the integer values $a, a+1, a+2, \ldots, b$ with equal probability:

$$P(X = k) = \frac{1}{b - a + 1}, \quad k \in \{a, a+1, \ldots, b\}$$

We denote this as $X \sim \text{DiscreteUniform}(a, b)$ or $X \sim \mathcal{U}\{a, b\}$.

The number of possible values is $n = b - a + 1$.

### Properties of Discrete Uniform Distribution

**Expected Value:**
$$E[X] = \frac{a + b}{2}$$

This is simply the midpoint of the range.

**Variance:**
$$\text{Var}(X) = \frac{(b - a + 1)^2 - 1}{12} = \frac{n^2 - 1}{12}$$

**Derivation of Expected Value:**

$$E[X] = \sum_{k=a}^{b} k \cdot \frac{1}{b-a+1} = \frac{1}{b-a+1} \sum_{k=a}^{b} k$$

Using the formula $\sum_{k=a}^{b} k = \frac{(b-a+1)(a+b)}{2}$:

$$E[X] = \frac{1}{b-a+1} \cdot \frac{(b-a+1)(a+b)}{2} = \frac{a+b}{2}$$

### Example 1: Fair Die

A fair six-sided die follows $X \sim \mathcal{U}\{1, 6\}$.

$$P(X = k) = \frac{1}{6}, \quad k \in \{1, 2, 3, 4, 5, 6\}$$

**Expected value:**
$$E[X] = \frac{1 + 6}{2} = 3.5$$

**Variance:**
$$\text{Var}(X) = \frac{6^2 - 1}{12} = \frac{35}{12} \approx 2.917$$

**Standard deviation:**
$$\sigma_X = \sqrt{\frac{35}{12}} \approx 1.708$$

### Example 2: Random Selection

A lottery randomly selects a number between 1 and 100. What is the probability of selecting a number greater than 75?

**Solution:**

Let $X \sim \mathcal{U}\{1, 100\}$. The favorable outcomes are $\{76, 77, \ldots, 100\}$, which contains 25 values.

$$P(X > 75) = \frac{25}{100} = 0.25$$

## Continuous Uniform Distribution

The **continuous uniform distribution** assigns equal probability density to all values in a continuous interval $[a, b]$.

### Probability Density Function

$$f(x) = \begin{cases} \frac{1}{b-a} & \text{if } a \leq x \leq b \\ 0 & \text{otherwise} \end{cases}$$

We denote this as $X \sim \text{Uniform}(a, b)$ or $X \sim \mathcal{U}(a, b)$.

The PDF is constant over $[a, b]$, reflecting the "equal likelihood" of all values.

### Cumulative Distribution Function

$$F(x) = P(X \leq x) = \begin{cases} 0 & \text{if } x < a \\ \frac{x-a}{b-a} & \text{if } a \leq x \leq b \\ 1 & \text{if } x > b \end{cases}$$

The CDF increases linearly from 0 to 1 over the interval $[a, b]$.

### Properties of Continuous Uniform Distribution

**Expected Value:**
$$E[X] = \frac{a + b}{2}$$

**Variance:**
$$\text{Var}(X) = \frac{(b-a)^2}{12}$$

**Standard Deviation:**
$$\sigma_X = \frac{b-a}{2\sqrt{3}} \approx 0.289(b-a)$$

**Median:**
$$\text{Median} = \frac{a+b}{2} = E[X]$$

**Mode:** All values in $[a, b]$ are equally likely (every point is a mode).

### Derivation of Expected Value

$$E[X] = \int_{a}^{b} x \cdot \frac{1}{b-a} \, dx = \frac{1}{b-a} \int_{a}^{b} x \, dx$$

$$= \frac{1}{b-a} \left[\frac{x^2}{2}\right]_{a}^{b} = \frac{1}{b-a} \cdot \frac{b^2 - a^2}{2} = \frac{(b-a)(b+a)}{2(b-a)} = \frac{a+b}{2}$$

### Derivation of Variance

$$E[X^2] = \int_{a}^{b} x^2 \cdot \frac{1}{b-a} \, dx = \frac{1}{b-a} \left[\frac{x^3}{3}\right]_{a}^{b} = \frac{b^3 - a^3}{3(b-a)}$$

$$= \frac{(b-a)(b^2 + ab + a^2)}{3(b-a)} = \frac{b^2 + ab + a^2}{3}$$

$$\text{Var}(X) = E[X^2] - (E[X])^2 = \frac{b^2 + ab + a^2}{3} - \left(\frac{a+b}{2}\right)^2$$

$$= \frac{b^2 + ab + a^2}{3} - \frac{a^2 + 2ab + b^2}{4} = \frac{4b^2 + 4ab + 4a^2 - 3a^2 - 6ab - 3b^2}{12}$$

$$= \frac{b^2 - 2ab + a^2}{12} = \frac{(b-a)^2}{12}$$

### Example 3: Bus Waiting Time

A bus arrives every 20 minutes. If you arrive at a random time, how long do you expect to wait? What is the probability you wait more than 15 minutes?

**Solution:**

Let $X$ = waiting time in minutes. Then $X \sim \mathcal{U}(0, 20)$.

**Expected waiting time:**
$$E[X] = \frac{0 + 20}{2} = 10 \text{ minutes}$$

**Probability of waiting more than 15 minutes:**
$$P(X > 15) = \frac{20 - 15}{20 - 0} = \frac{5}{20} = 0.25$$

**Standard deviation:**
$$\sigma_X = \frac{20 - 0}{2\sqrt{3}} = \frac{20}{2\sqrt{3}} \approx 5.77 \text{ minutes}$$

### Example 4: Random Number Generation

Generate a random number uniformly distributed between -1 and 1. What is the probability it falls between -0.5 and 0.5?

**Solution:**

Let $X \sim \mathcal{U}(-1, 1)$.

$$P(-0.5 \leq X \leq 0.5) = \frac{0.5 - (-0.5)}{1 - (-1)} = \frac{1}{2} = 0.5$$

For any subinterval of length $\ell$ within $[a, b]$:
$$P(\text{value in subinterval}) = \frac{\ell}{b-a}$$

## Standard Uniform Distribution

The **standard uniform distribution** is the special case $\mathcal{U}(0, 1)$.

$$f(x) = \begin{cases} 1 & \text{if } 0 \leq x \leq 1 \\ 0 & \text{otherwise} \end{cases}$$

$$F(x) = \begin{cases} 0 & \text{if } x < 0 \\ x & \text{if } 0 \leq x \leq 1 \\ 1 & \text{if } x > 1 \end{cases}$$

**Properties:**
- $E[X] = 0.5$
- $\text{Var}(X) = \frac{1}{12} \approx 0.0833$
- $\sigma_X = \frac{1}{2\sqrt{3}} \approx 0.289$

The standard uniform is fundamental in computational probability and statistics because:

1. **Random number generators** produce $\mathcal{U}(0,1)$ random values
2. **Transformation:** Any $\mathcal{U}(a, b)$ can be obtained from $\mathcal{U}(0, 1)$: If $U \sim \mathcal{U}(0, 1)$, then $X = a + (b-a)U \sim \mathcal{U}(a, b)$
3. **Inverse transform method:** Any distribution can be simulated using $\mathcal{U}(0, 1)$ via $X = F^{-1}(U)$

## Quantile Function

For $X \sim \mathcal{U}(a, b)$, the quantile function (inverse CDF) is:

$$F^{-1}(p) = a + p(b - a), \quad 0 \leq p \leq 1$$

This gives the value below which a proportion $p$ of the distribution falls.

**Example:** For $X \sim \mathcal{U}(0, 10)$:
- 25th percentile: $F^{-1}(0.25) = 0 + 0.25(10) = 2.5$
- Median (50th percentile): $F^{-1}(0.5) = 0 + 0.5(10) = 5$
- 75th percentile: $F^{-1}(0.75) = 0 + 0.75(10) = 7.5$

## Applications of Uniform Distribution

### Discrete Uniform

- Fair games (dice, cards, lottery)
- Random sampling without replacement
- Cryptographic key generation
- Discrete optimization (random search)

### Continuous Uniform

- **Modeling complete uncertainty:** When all values in a range are equally plausible
- **Random number generation:** Foundation of computational probability
- **Monte Carlo methods:** Simulation and numerical integration
- **Queueing theory:** Arrival times within known intervals
- **Calibration:** Measurement errors with known bounds
- **Computer graphics:** Random positioning, colors
- **Statistical testing:** Generating null distributions

## Relationship to Other Distributions

1. **To Normal:** Sum of many independent uniforms approaches normal (CLT)
2. **To Exponential:** If $U \sim \mathcal{U}(0, 1)$, then $X = -\frac{1}{\lambda}\ln(U) \sim \text{Exp}(\lambda)$
3. **To any distribution:** Inverse transform: $X = F^{-1}(U)$ where $U \sim \mathcal{U}(0, 1)$

## Summary

The uniform distribution represents the principle of indifference: when all outcomes are equally likely. Its mathematical simplicity makes it an ideal starting point for understanding probability distributions, while its practical importance in random number generation and simulation makes it indispensable in computational statistics. Whether discrete or continuous, the uniform distribution embodies the concept of pure randomness within a bounded range.
