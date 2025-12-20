---
id: math202-t2-discrete
title: "Discrete Random Variables"
order: 1
---

# Discrete Random Variables

Random variables form the bridge between probability theory and real-world numerical outcomes. While probability spaces deal with abstract events, random variables let us assign numerical values to those events, enabling quantitative analysis of uncertain phenomena.

## What is a Random Variable?

A **random variable** is a function that maps outcomes from a sample space to real numbers. More formally, if $\Omega$ is a sample space, then a random variable $X$ is a function:

$$X: \Omega \to \mathbb{R}$$

**Key insight:** Despite the name, a random variable is not actually random, nor is it simply a variable. It's a deterministic function that assigns numbers to outcomes of a random experiment.

For example, consider rolling two dice. The sample space consists of 36 ordered pairs $(i,j)$ where $1 \leq i,j \leq 6$. We could define:
- $X$ = sum of the two dice
- $Y$ = maximum of the two dice
- $Z$ = absolute difference between the dice

Each of these is a random variable mapping the same sample space to different numerical values.

## Discrete Random Variables

A random variable $X$ is **discrete** if it can take on only countably many values. This includes:
- Finite sets: $\{1, 2, 3, 4, 5, 6\}$ (single die)
- Countably infinite sets: $\{0, 1, 2, 3, \ldots\}$ (number of trials until success)

**Examples of discrete random variables:**
- Number of heads in 10 coin flips
- Number of defective items in a batch of 100
- Number of customers arriving at a store in an hour
- Number of emails received in a day

## Probability Mass Function (PMF)

The probability distribution of a discrete random variable $X$ is completely characterized by its **probability mass function** (PMF), denoted $p_X(x)$ or simply $p(x)$:

$$p_X(x) = P(X = x)$$

This gives the probability that $X$ takes on the specific value $x$.

### Properties of PMFs

Every PMF must satisfy two fundamental properties:

1. **Non-negativity:** $p_X(x) \geq 0$ for all $x$

2. **Normalization:** $\sum_{\text{all } x} p_X(x) = 1$

The sum is taken over all possible values of $X$.

### Example 1: Single Die Roll

Let $X$ represent the outcome of rolling a fair six-sided die.

The PMF is:
$$p_X(x) = \begin{cases}
\frac{1}{6} & \text{if } x \in \{1, 2, 3, 4, 5, 6\} \\
0 & \text{otherwise}
\end{cases}$$

We can verify normalization:
$$\sum_{x=1}^{6} p_X(x) = 6 \cdot \frac{1}{6} = 1$$ ✓

### Example 2: Sum of Two Dice

Let $S$ represent the sum of two fair dice. The possible values are $\{2, 3, 4, \ldots, 12\}$.

To find the PMF, we count the number of ways to achieve each sum:

| Sum $s$ | Ways | $p_S(s)$ |
|---------|------|----------|
| 2 | (1,1) | $\frac{1}{36}$ |
| 3 | (1,2), (2,1) | $\frac{2}{36}$ |
| 4 | (1,3), (2,2), (3,1) | $\frac{3}{36}$ |
| 5 | (1,4), (2,3), (3,2), (4,1) | $\frac{4}{36}$ |
| 6 | 5 ways | $\frac{5}{36}$ |
| 7 | 6 ways | $\frac{6}{36}$ |
| 8 | 5 ways | $\frac{5}{36}$ |
| 9 | 4 ways | $\frac{4}{36}$ |
| 10 | 3 ways | $\frac{3}{36}$ |
| 11 | 2 ways | $\frac{2}{36}$ |
| 12 | (6,6) | $\frac{1}{36}$ |

Notice the symmetry: $p_S(7-k) = p_S(7+k)$ for $k = 0, 1, 2, 3, 4, 5$.

### Example 3: Bernoulli Random Variable

The simplest meaningful random variable is the **Bernoulli** random variable, which takes only two values: 0 or 1.

$$X = \begin{cases}
1 & \text{with probability } p \\
0 & \text{with probability } 1-p
\end{cases}$$

The PMF is:
$$p_X(x) = \begin{cases}
p & \text{if } x = 1 \\
1-p & \text{if } x = 0 \\
0 & \text{otherwise}
\end{cases}$$

This can be written compactly as:
$$p_X(x) = p^x(1-p)^{1-x} \quad \text{for } x \in \{0,1\}$$

**Applications:** Modeling any binary outcome (success/failure, yes/no, heads/tails).

## Computing Probabilities from PMFs

Once we have the PMF, we can compute probabilities of any event involving $X$.

**For any set $A$:**
$$P(X \in A) = \sum_{x \in A} p_X(x)$$

### Example 4: Probability Calculations

Using the two-dice sum from Example 2:

**P(sum is even):**
$$P(S \in \{2,4,6,8,10,12\}) = \frac{1}{36} + \frac{3}{36} + \frac{5}{36} + \frac{5}{36} + \frac{3}{36} + \frac{1}{36} = \frac{18}{36} = \frac{1}{2}$$

**P(sum ≥ 10):**
$$P(S \geq 10) = p_S(10) + p_S(11) + p_S(12) = \frac{3}{36} + \frac{2}{36} + \frac{1}{36} = \frac{6}{36} = \frac{1}{6}$$

**P(sum is prime):**
Primes in $\{2,3,\ldots,12\}$: $\{2,3,5,7,11\}$
$$P(S \text{ is prime}) = \frac{1}{36} + \frac{2}{36} + \frac{4}{36} + \frac{6}{36} + \frac{2}{36} = \frac{15}{36} = \frac{5}{12}$$

## Cumulative Distribution Function (CDF)

The **cumulative distribution function** gives the probability that $X$ is at most $x$:

$$F_X(x) = P(X \leq x) = \sum_{t \leq x} p_X(t)$$

For discrete random variables, the CDF is a step function that jumps at each value in the support of $X$.

### Properties of CDFs

1. **Monotone increasing:** If $x_1 < x_2$, then $F_X(x_1) \leq F_X(x_2)$
2. **Right-continuous:** $\lim_{h \to 0^+} F_X(x+h) = F_X(x)$
3. **Limits:** $\lim_{x \to -\infty} F_X(x) = 0$ and $\lim_{x \to \infty} F_X(x) = 1$

### Example 5: CDF of a Die Roll

For $X$ = outcome of a fair die:

$$F_X(x) = \begin{cases}
0 & \text{if } x < 1 \\
\frac{1}{6} & \text{if } 1 \leq x < 2 \\
\frac{2}{6} & \text{if } 2 \leq x < 3 \\
\frac{3}{6} & \text{if } 3 \leq x < 4 \\
\frac{4}{6} & \text{if } 4 \leq x < 5 \\
\frac{5}{6} & \text{if } 5 \leq x < 6 \\
1 & \text{if } x \geq 6
\end{cases}$$

We can recover the PMF from the CDF using:
$$p_X(x) = F_X(x) - \lim_{h \to 0^+} F_X(x-h)$$

This equals the size of the jump in the CDF at $x$.

## Common Discrete Distributions

Several discrete distributions appear repeatedly in applications:

**Binomial:** Number of successes in $n$ independent Bernoulli trials
$$p_X(k) = \binom{n}{k} p^k (1-p)^{n-k}, \quad k = 0, 1, \ldots, n$$

**Geometric:** Number of trials until first success
$$p_X(k) = (1-p)^{k-1} p, \quad k = 1, 2, 3, \ldots$$

**Poisson:** Number of events in a fixed interval
$$p_X(k) = \frac{\lambda^k e^{-\lambda}}{k!}, \quad k = 0, 1, 2, \ldots$$

These will be studied in detail in later topics.

## Summary

- A **discrete random variable** assigns numerical values to outcomes and can take on countably many values
- The **PMF** $p_X(x) = P(X = x)$ completely characterizes the distribution
- PMFs must be non-negative and sum to 1
- The **CDF** $F_X(x) = P(X \leq x)$ is a step function for discrete random variables
- Understanding discrete random variables enables quantitative analysis of uncertain outcomes
