# Moments and Moment Generating Functions

Beyond mean and variance, we can characterize distributions using higher-order moments and a powerful tool called the moment generating function. These concepts provide deeper insight into the shape and properties of probability distributions.

## Moments

The $n$-th **moment** of a random variable $X$ is defined as:

$$E[X^n]$$

The $n$-th **central moment** is:

$$E[(X - \mu)^n]$$

where $\mu = E[X]$.

### Relationship to Familiar Concepts

- **First moment:** $E[X]$ = mean
- **Second central moment:** $E[(X - \mu)^2]$ = variance
- **Second moment:** $E[X^2]$ (used to compute variance)

Higher moments capture additional shape characteristics.

## Standardized Moments

To make moments scale-independent, we standardize them:

$$\tilde{\mu}_n = \frac{E[(X - \mu)^n]}{\sigma^n}$$

### Skewness (Third Standardized Moment)

**Skewness** measures asymmetry:

$$\text{Skewness} = \frac{E[(X - \mu)^3]}{\sigma^3}$$

- **Skewness = 0:** Symmetric distribution (e.g., normal)
- **Skewness > 0:** Right-skewed (long tail to the right)
- **Skewness < 0:** Left-skewed (long tail to the left)

**Example:** Income distributions are typically right-skewed (few very high earners).

### Kurtosis (Fourth Standardized Moment)

**Kurtosis** measures tail heaviness:

$$\text{Kurtosis} = \frac{E[(X - \mu)^4]}{\sigma^4}$$

Often we report **excess kurtosis** = Kurtosis - 3, where 3 is the kurtosis of a normal distribution.

- **Excess kurtosis = 0:** Normal-like tails
- **Excess kurtosis > 0:** Heavy tails (leptokurtic)
- **Excess kurtosis < 0:** Light tails (platykurtic)

**Example:** Financial returns often have positive excess kurtosis (more extreme events than normal distribution predicts).

## Moment Generating Functions

The **moment generating function** (MGF) of a random variable $X$ is:

$$M_X(t) = E[e^{tX}]$$

where $t$ is a real parameter.

**Discrete:**
$$M_X(t) = \sum_{x} e^{tx} p_X(x)$$

**Continuous:**
$$M_X(t) = \int_{-\infty}^{\infty} e^{tx} f_X(x) \, dx$$

The MGF exists if the expectation is finite for $t$ in some neighborhood of 0.

### Why "Moment Generating"?

The MGF generates moments through derivatives at $t = 0$.

Recall the Taylor series: $e^{tX} = 1 + tX + \frac{(tX)^2}{2!} + \frac{(tX)^3}{3!} + \cdots$

Taking expectation:
$$M_X(t) = E[e^{tX}] = 1 + t E[X] + \frac{t^2}{2!} E[X^2] + \frac{t^3}{3!} E[X^3] + \cdots$$

**Key property:** The $n$-th derivative at $t = 0$ gives the $n$-th moment:

$$M_X^{(n)}(0) = E[X^n]$$

**Proof:**
$$M_X'(t) = \frac{d}{dt} E[e^{tX}] = E\left[\frac{d}{dt} e^{tX}\right] = E[X e^{tX}]$$

At $t = 0$: $M_X'(0) = E[X]$

$$M_X''(t) = E[X^2 e^{tX}]$$

At $t = 0$: $M_X''(0) = E[X^2]$

And so on.

## Example 1: MGF of Bernoulli Distribution

For $X \sim \text{Bernoulli}(p)$:

$$M_X(t) = E[e^{tX}] = e^{t \cdot 0} \cdot (1-p) + e^{t \cdot 1} \cdot p$$

$$= (1-p) + p e^t = 1 + p(e^t - 1)$$

**Verify moments:**

$$M_X'(t) = p e^t \implies M_X'(0) = p = E[X]$$ ✓

$$M_X''(t) = p e^t \implies M_X''(0) = p = E[X^2]$$ ✓

(Recall $X^2 = X$ for Bernoulli.)

## Example 2: MGF of Binomial Distribution

For $X \sim \text{Binomial}(n,p)$, we can write $X = X_1 + \cdots + X_n$ where $X_i \sim \text{Bernoulli}(p)$ are independent.

Using the product property (see below):

$$M_X(t) = \prod_{i=1}^n M_{X_i}(t) = [1 + p(e^t - 1)]^n$$

**Finding the mean:**
$$M_X'(t) = n[1 + p(e^t - 1)]^{n-1} \cdot p e^t$$

$$M_X'(0) = n \cdot 1 \cdot p = np$$ ✓

## Example 3: MGF of Exponential Distribution

For $X \sim \text{Exponential}(\lambda)$:

$$M_X(t) = \int_0^{\infty} e^{tx} \lambda e^{-\lambda x} \, dx = \lambda \int_0^{\infty} e^{-(λ-t)x} \, dx$$

For convergence, we need $\lambda > t$.

$$= \lambda \left[ -\frac{1}{\lambda - t} e^{-(\lambda-t)x} \right]_0^{\infty} = \frac{\lambda}{\lambda - t}$$

Valid for $t < \lambda$.

**Finding moments:**

$$M_X'(t) = \frac{\lambda}{(\lambda - t)^2} \implies M_X'(0) = \frac{1}{\lambda}$$ ✓

$$M_X''(t) = \frac{2\lambda}{(\lambda - t)^3} \implies M_X''(0) = \frac{2}{\lambda^2}$$

$$\text{Var}(X) = E[X^2] - (E[X])^2 = \frac{2}{\lambda^2} - \frac{1}{\lambda^2} = \frac{1}{\lambda^2}$$ ✓

## Example 4: MGF of Normal Distribution

For $X \sim \text{Normal}(\mu, \sigma^2)$:

$$M_X(t) = e^{\mu t + \frac{\sigma^2 t^2}{2}}$$

This formula is derived using completing the square in the exponent (derivation omitted).

**Special case:** Standard normal $Z \sim \text{Normal}(0,1)$:

$$M_Z(t) = e^{t^2/2}$$

**Finding moments:**

$$M_Z'(t) = t e^{t^2/2} \implies M_Z'(0) = 0 = E[Z]$$ ✓

$$M_Z''(t) = e^{t^2/2} + t^2 e^{t^2/2} \implies M_Z''(0) = 1 = E[Z^2] = \text{Var}(Z)$$ ✓

## Properties of MGFs

### Property 1: Uniqueness

If two random variables have the same MGF, they have the same distribution.

This makes MGFs powerful for identifying distributions.

### Property 2: Linear Transformation

If $Y = aX + b$:

$$M_Y(t) = E[e^{t(aX + b)}] = e^{bt} E[e^{(at)X}] = e^{bt} M_X(at)$$

### Property 3: Sum of Independent Random Variables

If $X$ and $Y$ are independent:

$$M_{X+Y}(t) = E[e^{t(X+Y)}] = E[e^{tX} e^{tY}] = E[e^{tX}] E[e^{tY}] = M_X(t) M_Y(t)$$

**Application:** This is why we could easily find the binomial MGF from the Bernoulli MGF in Example 2.

### Property 4: MGF Determines Distribution

The MGF (when it exists) uniquely determines the probability distribution. Two random variables with the same MGF have the same distribution.

## Example 5: Sum of Independent Normals

Let $X \sim \text{Normal}(\mu_1, \sigma_1^2)$ and $Y \sim \text{Normal}(\mu_2, \sigma_2^2)$ be independent.

$$M_X(t) = e^{\mu_1 t + \frac{\sigma_1^2 t^2}{2}}$$

$$M_Y(t) = e^{\mu_2 t + \frac{\sigma_2^2 t^2}{2}}$$

$$M_{X+Y}(t) = M_X(t) M_Y(t) = e^{\mu_1 t + \frac{\sigma_1^2 t^2}{2}} \cdot e^{\mu_2 t + \frac{\sigma_2^2 t^2}{2}}$$

$$= e^{(\mu_1 + \mu_2)t + \frac{(\sigma_1^2 + \sigma_2^2)t^2}{2}}$$

This is the MGF of $\text{Normal}(\mu_1 + \mu_2, \sigma_1^2 + \sigma_2^2)$.

**Conclusion:** The sum of independent normal random variables is normal!

## Example 6: Sum of Independent Poissons

Let $X \sim \text{Poisson}(\lambda_1)$ and $Y \sim \text{Poisson}(\lambda_2)$ be independent.

The Poisson MGF is (can be derived):
$$M_X(t) = e^{\lambda_1(e^t - 1)}$$

$$M_{X+Y}(t) = e^{\lambda_1(e^t - 1)} \cdot e^{\lambda_2(e^t - 1)} = e^{(\lambda_1 + \lambda_2)(e^t - 1)}$$

This is the MGF of $\text{Poisson}(\lambda_1 + \lambda_2)$.

**Conclusion:** The sum of independent Poisson random variables is Poisson with parameter equal to the sum of parameters.

## Probability Generating Function (for Non-negative Integers)

For random variables taking values in $\{0, 1, 2, \ldots\}$, the **probability generating function** (PGF) is:

$$G_X(s) = E[s^X] = \sum_{k=0}^{\infty} s^k P(X = k)$$

**Relationship to MGF:** $G_X(s) = M_X(\ln s)$

**Generating probabilities:**
$$P(X = k) = \frac{G_X^{(k)}(0)}{k!}$$

**Example:** For $X \sim \text{Poisson}(\lambda)$:

$$G_X(s) = \sum_{k=0}^{\infty} s^k \frac{\lambda^k e^{-\lambda}}{k!} = e^{-\lambda} \sum_{k=0}^{\infty} \frac{(\lambda s)^k}{k!} = e^{-\lambda} e^{\lambda s} = e^{\lambda(s-1)}$$

## Characteristic Functions

The **characteristic function** always exists (unlike MGF) and is defined as:

$$\phi_X(t) = E[e^{itX}]$$

where $i = \sqrt{-1}$ is the imaginary unit.

This uses complex analysis but has similar properties to MGFs. It's particularly important in advanced probability theory and the Central Limit Theorem.

## MGF Table for Common Distributions

| Distribution | MGF $M_X(t)$ | Valid for |
|--------------|--------------|-----------|
| Bernoulli$(p)$ | $1 + p(e^t - 1)$ | All $t$ |
| Binomial$(n,p)$ | $[1 + p(e^t - 1)]^n$ | All $t$ |
| Geometric$(p)$ | $\frac{pe^t}{1 - (1-p)e^t}$ | $t < -\ln(1-p)$ |
| Poisson$(\lambda)$ | $e^{\lambda(e^t - 1)}$ | All $t$ |
| Uniform$[a,b]$ | $\frac{e^{tb} - e^{ta}}{t(b-a)}$ | $t \neq 0$ |
| Exponential$(\lambda)$ | $\frac{\lambda}{\lambda - t}$ | $t < \lambda$ |
| Normal$(\mu, \sigma^2)$ | $e^{\mu t + \frac{\sigma^2 t^2}{2}}$ | All $t$ |

## Applications of MGFs

1. **Computing moments:** Easier than direct integration/summation
2. **Identifying distributions:** Uniqueness property
3. **Sums of independent RVs:** Product property simplifies analysis
4. **Deriving limiting distributions:** Used in Central Limit Theorem proofs
5. **Establishing distribution properties:** Many theorems use MGF techniques

## Summary

- **Moments** $E[X^n]$ and **central moments** $E[(X-\mu)^n]$ characterize distribution shape
- **Skewness** (3rd moment) measures asymmetry
- **Kurtosis** (4th moment) measures tail heaviness
- **MGF** $M_X(t) = E[e^{tX}]$ encodes all moments: $M_X^{(n)}(0) = E[X^n]$
- MGFs are unique: same MGF implies same distribution
- For independent $X, Y$: $M_{X+Y}(t) = M_X(t) M_Y(t)$
- MGFs are powerful tools for analyzing sums and transformations of random variables
