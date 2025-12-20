---
id: math202-t2-expected-value
title: "Expected Value"
order: 3
---

# Expected Value

The expected value is one of the most important concepts in probability theory. It provides a single number that summarizes the "center" or "typical value" of a random variable, representing the long-run average if we could repeat an experiment infinitely many times.

## Intuition and Definition

Imagine rolling a fair die many times and computing the average of the outcomes. As the number of rolls increases, this average converges to:

$$\frac{1 + 2 + 3 + 4 + 5 + 6}{6} = 3.5$$

This is the **expected value** (or **expectation** or **mean**) of the die roll.

More generally, the expected value weights each possible outcome by its probability.

### Expected Value of Discrete Random Variables

For a discrete random variable $X$ with PMF $p_X(x)$:

$$E[X] = \sum_{x} x \cdot p_X(x)$$

The sum is taken over all values $x$ in the support of $X$.

**Notation:** $E[X]$, $\mathbb{E}[X]$, or $\mu_X$ all denote expected value.

### Expected Value of Continuous Random Variables

For a continuous random variable $X$ with PDF $f_X(x)$:

$$E[X] = \int_{-\infty}^{\infty} x \cdot f_X(x) \, dx$$

The integral must converge absolutely for the expected value to exist.

## Example 1: Fair Die

Let $X$ be the outcome of a fair six-sided die.

$$E[X] = \sum_{x=1}^{6} x \cdot \frac{1}{6} = \frac{1}{6}(1 + 2 + 3 + 4 + 5 + 6) = \frac{21}{6} = 3.5$$

Notice the expected value need not be a possible outcome! You can't roll 3.5.

## Example 2: Sum of Two Dice

Let $S$ be the sum of two fair dice. From the discrete random variables subtopic, we know the PMF.

$$E[S] = \sum_{s=2}^{12} s \cdot p_S(s)$$

Computing term by term:
$$E[S] = 2 \cdot \frac{1}{36} + 3 \cdot \frac{2}{36} + 4 \cdot \frac{3}{36} + \cdots + 12 \cdot \frac{1}{36}$$

$$= \frac{1}{36}(2 + 6 + 12 + 20 + 30 + 42 + 40 + 36 + 30 + 22 + 12) = \frac{252}{36} = 7$$

**Alternative approach:** By linearity (see below), $E[S] = E[X_1 + X_2] = E[X_1] + E[X_2] = 3.5 + 3.5 = 7$.

## Example 3: Bernoulli Random Variable

For $X \sim \text{Bernoulli}(p)$:

$$E[X] = 0 \cdot (1-p) + 1 \cdot p = p$$

The expected value of a Bernoulli equals its success probability.

## Example 4: Uniform Distribution

For $X \sim \text{Uniform}[a,b]$:

$$E[X] = \int_a^b x \cdot \frac{1}{b-a} \, dx = \frac{1}{b-a} \cdot \frac{x^2}{2} \bigg|_a^b = \frac{1}{b-a} \cdot \frac{b^2 - a^2}{2}$$

$$= \frac{(b-a)(b+a)}{2(b-a)} = \frac{a+b}{2}$$

The expected value is the midpoint, which makes intuitive sense by symmetry.

## Example 5: Exponential Distribution

For $X \sim \text{Exponential}(\lambda)$:

$$E[X] = \int_0^{\infty} x \cdot \lambda e^{-\lambda x} \, dx$$

Using integration by parts with $u = x$, $dv = \lambda e^{-\lambda x} dx$:

$$= \left[-x e^{-\lambda x}\right]_0^{\infty} + \int_0^{\infty} e^{-\lambda x} \, dx$$

The first term vanishes (using L'Hôpital's rule for the upper limit):

$$= 0 + \left[-\frac{1}{\lambda} e^{-\lambda x}\right]_0^{\infty} = \frac{1}{\lambda}$$

So $E[X] = \frac{1}{\lambda}$. The rate parameter $\lambda$ is the reciprocal of the mean waiting time.

## Expected Value of Functions of Random Variables

Often we want the expected value of some function $g(X)$ rather than $X$ itself.

### Law of the Unconscious Statistician (LOTUS)

For a function $g$ and random variable $X$:

**Discrete case:**
$$E[g(X)] = \sum_{x} g(x) \cdot p_X(x)$$

**Continuous case:**
$$E[g(X)] = \int_{-\infty}^{\infty} g(x) \cdot f_X(x) \, dx$$

The name comes from the fact that we don't need to find the distribution of $Y = g(X)$ first—we can compute the expectation directly using the distribution of $X$.

### Example 6: Expected Value of $X^2$

For $X \sim \text{Uniform}[0,1]$:

$$E[X^2] = \int_0^1 x^2 \cdot 1 \, dx = \frac{x^3}{3} \bigg|_0^1 = \frac{1}{3}$$

Note that $E[X^2] \neq (E[X])^2$. We have $E[X] = \frac{1}{2}$, so $(E[X])^2 = \frac{1}{4} \neq \frac{1}{3}$.

**General fact:** $E[X^2] \geq (E[X])^2$ (equality holds only for constant random variables).

## Linearity of Expectation

One of the most powerful properties of expectation is **linearity**:

### Property 1: Scaling
$$E[aX] = a \cdot E[X]$$

for any constant $a$.

### Property 2: Addition
$$E[X + Y] = E[X] + E[Y]$$

This holds **even if $X$ and $Y$ are dependent**!

### Combined Linearity
$$E[aX + bY + c] = a \cdot E[X] + b \cdot E[Y] + c$$

for any constants $a, b, c$.

More generally, for random variables $X_1, \ldots, X_n$ and constants $a_1, \ldots, a_n, b$:

$$E\left[\sum_{i=1}^n a_i X_i + b\right] = \sum_{i=1}^n a_i E[X_i] + b$$

### Example 7: Application of Linearity

A random variable $X$ counts the number of heads in 10 coin flips. Find $E[X]$.

Write $X = X_1 + X_2 + \cdots + X_{10}$ where $X_i$ is the indicator that flip $i$ is heads.

Each $X_i \sim \text{Bernoulli}(0.5)$, so $E[X_i] = 0.5$.

By linearity:
$$E[X] = E[X_1 + \cdots + X_{10}] = E[X_1] + \cdots + E[X_{10}] = 10 \cdot 0.5 = 5$$

This works even though the $X_i$ are not independent (actually they are, but linearity doesn't require it).

### Example 8: Binomial Expected Value

More generally, for $X \sim \text{Binomial}(n,p)$:

$$E[X] = np$$

**Proof:** Write $X = \sum_{i=1}^n X_i$ where $X_i \sim \text{Bernoulli}(p)$.

$$E[X] = E\left[\sum_{i=1}^n X_i\right] = \sum_{i=1}^n E[X_i] = \sum_{i=1}^n p = np$$

This is much simpler than computing $\sum_{k=0}^n k \binom{n}{k} p^k (1-p)^{n-k}$ directly!

## Properties of Expectation

1. **Constant:** $E[c] = c$ for any constant $c$

2. **Monotonicity:** If $X \leq Y$ (meaning $P(X \leq Y) = 1$), then $E[X] \leq E[Y]$

3. **Non-negativity:** If $X \geq 0$, then $E[X] \geq 0$

4. **Indicator variables:** If $A$ is an event and $I_A$ is the indicator random variable ($I_A = 1$ if $A$ occurs, 0 otherwise), then $E[I_A] = P(A)$

## Expected Value and Independence

While $E[X + Y] = E[X] + E[Y]$ holds in general, **independence** gives us a multiplicative property:

**If $X$ and $Y$ are independent:**
$$E[XY] = E[X] \cdot E[Y]$$

**Warning:** The converse is false! $E[XY] = E[X]E[Y]$ does not imply independence.

### Example 9: Variance Decomposition

This multiplicative property is crucial for computing $E[X^2]$ for certain distributions, which we'll use when studying variance.

## Conditional Expectation

The **conditional expected value** of $X$ given event $A$ is:

**Discrete:**
$$E[X \mid A] = \sum_{x} x \cdot P(X = x \mid A)$$

**Continuous:**
$$E[X \mid A] = \int_{-\infty}^{\infty} x \cdot f_{X|A}(x) \, dx$$

### Law of Total Expectation

If $A_1, A_2, \ldots, A_n$ partition the sample space:

$$E[X] = \sum_{i=1}^n E[X \mid A_i] \cdot P(A_i)$$

This allows us to compute expectations by conditioning on different scenarios.

## When Expected Value Doesn't Exist

Not all random variables have a finite expected value. The expectation exists only if:

**Discrete:** $\sum_x |x| \cdot p_X(x) < \infty$

**Continuous:** $\int_{-\infty}^{\infty} |x| \cdot f_X(x) \, dx < \infty$

### Example 10: St. Petersburg Paradox

Consider a game: flip a fair coin repeatedly until it lands heads. If heads appears on flip $n$, you win $2^n$ dollars.

Let $X$ be the winnings. Then $P(X = 2^n) = \frac{1}{2^n}$ for $n = 1, 2, 3, \ldots$

$$E[X] = \sum_{n=1}^{\infty} 2^n \cdot \frac{1}{2^n} = \sum_{n=1}^{\infty} 1 = \infty$$

The expected value is infinite! How much should you pay to play this game?

## Summary

- The **expected value** $E[X]$ is the probability-weighted average of a random variable's values
- For discrete $X$: $E[X] = \sum_x x \cdot p_X(x)$
- For continuous $X$: $E[X] = \int x \cdot f_X(x) \, dx$
- **LOTUS:** $E[g(X)] = \sum_x g(x) p_X(x)$ or $\int g(x) f_X(x) \, dx$
- **Linearity:** $E[aX + bY + c] = aE[X] + bE[Y] + c$ (holds regardless of dependence)
- **Independence:** If $X \perp Y$, then $E[XY] = E[X]E[Y]$
- Expected value provides the foundation for variance and other moments
