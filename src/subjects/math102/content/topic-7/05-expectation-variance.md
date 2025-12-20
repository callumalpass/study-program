# Expectation and Variance

Expectation and variance are the fundamental summary statistics for random variables. They quantify the center and spread of probability distributions.

## Expected Value

### Definition

For discrete random variable X with PMF p(x):
$$E[X] = \sum_{x} x \cdot p(x)$$

Also called the **mean** or **first moment**, denoted μ or μ_X.

### Intuition

- The "average" value in long run
- Center of mass of probability distribution
- Weighted average of outcomes

### Examples

**Fair die:**
E[X] = 1(1/6) + 2(1/6) + ... + 6(1/6) = 21/6 = 3.5

**Biased coin (P(H) = 0.7):**
Let X = 1 for heads, 0 for tails.
E[X] = 1(0.7) + 0(0.3) = 0.7

## Properties of Expectation

### Linearity

For constants a, b and random variables X, Y:
$$E[aX + b] = aE[X] + b$$
$$E[X + Y] = E[X] + E[Y]$$

**Important:** Linearity holds even if X, Y are dependent!

### Expectation of Function

For function g(X):
$$E[g(X)] = \sum_{x} g(x) \cdot p(x)$$

**Warning:** E[g(X)] ≠ g(E[X]) in general (Jensen's inequality).

### Product of Independent Variables

If X and Y are independent:
$$E[XY] = E[X] \cdot E[Y]$$

## Law of the Unconscious Statistician (LOTUS)

To find E[g(X)], don't need distribution of g(X):
$$E[g(X)] = \sum_{x} g(x) \cdot P(X = x)$$

### Example

For X ~ Uniform({1, 2, 3}), find E[X²]:
E[X²] = 1²(1/3) + 2²(1/3) + 3²(1/3) = 14/3

## Variance

### Definition

$$\text{Var}(X) = E[(X - \mu)^2] = E[X^2] - (E[X])^2$$

Also written σ² or σ²_X.

### Computational Formula

The second form is often easier:
$$\text{Var}(X) = E[X^2] - (E[X])^2$$

### Standard Deviation

$$\sigma = \sqrt{\text{Var}(X)}$$

Same units as X (variance has squared units).

### Example

For fair die:
- E[X] = 3.5
- E[X²] = (1 + 4 + 9 + 16 + 25 + 36)/6 = 91/6
- Var(X) = 91/6 - (3.5)² = 91/6 - 49/4 = 35/12 ≈ 2.92
- σ ≈ 1.71

## Properties of Variance

### Shifting and Scaling

$$\text{Var}(aX + b) = a^2 \text{Var}(X)$$

Adding constants doesn't change variance; scaling by a multiplies variance by a².

### Sum of Independent Variables

If X and Y are independent:
$$\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y)$$

**Warning:** This requires independence!

### General Sum

$$\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y) + 2\text{Cov}(X, Y)$$

## Covariance and Correlation

### Covariance

$$\text{Cov}(X, Y) = E[(X - \mu_X)(Y - \mu_Y)] = E[XY] - E[X]E[Y]$$

- Cov(X, X) = Var(X)
- Cov(X, Y) = 0 if X, Y independent
- Measures linear relationship

### Correlation

$$\rho(X, Y) = \frac{\text{Cov}(X, Y)}{\sigma_X \sigma_Y}$$

- Always -1 ≤ ρ ≤ 1
- ρ = ±1 iff perfect linear relationship
- ρ = 0: uncorrelated (but not necessarily independent!)

## Higher Moments

### kth Moment

$$E[X^k]$$

### kth Central Moment

$$E[(X - \mu)^k]$$

### Skewness (3rd standardized moment)

$$\gamma_1 = E\left[\left(\frac{X - \mu}{\sigma}\right)^3\right]$$

Measures asymmetry:
- γ₁ > 0: right-skewed (long right tail)
- γ₁ < 0: left-skewed

### Kurtosis (4th standardized moment)

$$\gamma_2 = E\left[\left(\frac{X - \mu}{\sigma}\right)^4\right] - 3$$

Measures tail heaviness (excess kurtosis, normal has 0).

## Moment Generating Functions

### Definition

$$M_X(t) = E[e^{tX}] = \sum_{x} e^{tx} p(x)$$

### Property

$$E[X^n] = M_X^{(n)}(0) = \frac{d^n M_X}{dt^n}\bigg|_{t=0}$$

Derivatives at t=0 give moments!

### Uniqueness

MGF (when it exists) uniquely determines distribution.

## Inequalities

### Markov's Inequality

For non-negative X and a > 0:
$$P(X \geq a) \leq \frac{E[X]}{a}$$

### Chebyshev's Inequality

For any X with mean μ and variance σ²:
$$P(|X - \mu| \geq k\sigma) \leq \frac{1}{k^2}$$

At least (1 - 1/k²) of probability within k standard deviations of mean.

### Examples

- k = 2: At least 75% within 2 standard deviations
- k = 3: At least 89% within 3 standard deviations

## Law of Large Numbers

### Weak LLN

Sample mean converges in probability to true mean:
$$\bar{X}_n = \frac{1}{n}\sum_{i=1}^{n} X_i \xrightarrow{p} \mu$$

### Strong LLN

Sample mean converges almost surely:
$$P\left(\lim_{n \to \infty} \bar{X}_n = \mu\right) = 1$$

## Practice Problems

1. **Expected value:** X takes values -1, 0, 1 with probabilities 0.2, 0.5, 0.3. Find E[X] and E[X²].

2. **Variance:** For X ~ Binomial(10, 0.3), find Var(X).

3. **Covariance:** If E[X] = 2, E[Y] = 3, E[XY] = 8, find Cov(X, Y).

4. **Chebyshev:** For distribution with μ = 50, σ = 10, what's the bound on P(|X - 50| ≥ 25)?

## Summary

Expectation and variance:
- E[X] measures central tendency (mean)
- Var(X) = E[X²] - (E[X])² measures spread
- Linearity of expectation (works always)
- Variance of sum requires independence or covariance
- Chebyshev bounds tail probability
- Law of Large Numbers: sample mean → population mean
