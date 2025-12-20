# Discrete Probability Distributions

This section covers the most important discrete probability distributions. Each models a specific type of random process and has characteristic properties.

## Bernoulli Distribution

### Definition

A **Bernoulli trial** has two outcomes: success (1) with probability p, failure (0) with probability 1-p.

$$P(X = k) = p^k (1-p)^{1-k}, \quad k \in \{0, 1\}$$

### Properties

- Mean: E[X] = p
- Variance: Var(X) = p(1-p)
- Moment generating function: M(t) = 1 - p + pe^t

### Example

Coin flip: X = 1 if heads, with p = 0.5.

## Binomial Distribution

### Definition

X ~ Binomial(n, p) counts successes in n independent Bernoulli(p) trials.

$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}, \quad k = 0, 1, \ldots, n$$

### Properties

- Mean: E[X] = np
- Variance: Var(X) = np(1-p)
- Mode: ⌊(n+1)p⌋ or ⌈(n+1)p⌉ - 1
- Sum property: If X ~ Bin(n,p) and Y ~ Bin(m,p) independent, then X+Y ~ Bin(n+m,p)

### Example

Flip 10 fair coins. P(exactly 6 heads):
$$\binom{10}{6} (0.5)^6 (0.5)^4 = 210 \cdot \frac{1}{1024} ≈ 0.205$$

### Code

```python
from scipy.stats import binom

# P(X = 6) for n=10, p=0.5
print(binom.pmf(6, 10, 0.5))  # 0.205078125

# P(X <= 4)
print(binom.cdf(4, 10, 0.5))  # 0.376953125
```

## Geometric Distribution

### Definition

X ~ Geometric(p) counts trials until first success.

$$P(X = k) = (1-p)^{k-1} p, \quad k = 1, 2, 3, \ldots$$

### Alternative Definition

Some sources define Y = number of failures before first success:
P(Y = k) = (1-p)^k p for k = 0, 1, 2, ...

Then Y = X - 1.

### Properties

- Mean: E[X] = 1/p
- Variance: Var(X) = (1-p)/p²
- Memoryless: P(X > m+n | X > m) = P(X > n)

### Memorylessness

This is the only discrete memoryless distribution. "Past failures don't affect future probability."

### Example

Roll die until first 6. Expected rolls = 1/(1/6) = 6.

## Negative Binomial Distribution

### Definition

X ~ NegBin(r, p) counts trials until r successes.

$$P(X = k) = \binom{k-1}{r-1} p^r (1-p)^{k-r}, \quad k = r, r+1, \ldots$$

### Properties

- Mean: E[X] = r/p
- Variance: Var(X) = r(1-p)/p²
- Sum of r Geometric(p) variables

### Example

Roll die until 3 sixes. X ~ NegBin(3, 1/6).
E[X] = 3/(1/6) = 18 rolls expected.

## Poisson Distribution

### Definition

X ~ Poisson(λ) models rare events in fixed interval.

$$P(X = k) = \frac{\lambda^k e^{-\lambda}}{k!}, \quad k = 0, 1, 2, \ldots$$

### Properties

- Mean: E[X] = λ
- Variance: Var(X) = λ (mean equals variance!)
- Sum property: If X ~ Poisson(λ₁) and Y ~ Poisson(λ₂) independent, then X+Y ~ Poisson(λ₁+λ₂)

### Poisson as Binomial Limit

If X ~ Binomial(n, p) with n large, p small, np = λ constant:
$$P(X = k) → \frac{\lambda^k e^{-\lambda}}{k!}$$

### Example

Typos on a page average 2. P(exactly 3 typos):
$$P(X = 3) = \frac{2^3 e^{-2}}{3!} = \frac{8 \cdot 0.135}{6} ≈ 0.180$$

### Applications

- Number of calls to call center
- Radioactive decay events
- Defects in manufacturing
- Customer arrivals

## Hypergeometric Distribution

### Definition

X ~ Hypergeometric(N, K, n) counts successes when drawing n items without replacement from population of N containing K successes.

$$P(X = k) = \frac{\binom{K}{k}\binom{N-K}{n-k}}{\binom{N}{n}}$$

### Properties

- Mean: E[X] = nK/N
- Variance: Var(X) = n(K/N)(1-K/N)(N-n)/(N-1)

### Difference from Binomial

- Binomial: with replacement (or infinite population)
- Hypergeometric: without replacement

### Example

Deck of 52 cards, 13 spades. Draw 5 cards. P(exactly 2 spades):
$$P(X=2) = \frac{\binom{13}{2}\binom{39}{3}}{\binom{52}{5}} = \frac{78 \cdot 9139}{2598960} ≈ 0.274$$

## Uniform Distribution

### Definition

X ~ Uniform({a, a+1, ..., b}) has equal probability for each value.

$$P(X = k) = \frac{1}{b-a+1}, \quad k = a, a+1, \ldots, b$$

### Properties

- Mean: E[X] = (a+b)/2
- Variance: Var(X) = ((b-a+1)² - 1)/12

### Example

Fair die: X ~ Uniform({1,2,3,4,5,6}).
E[X] = 3.5, Var(X) = 35/12 ≈ 2.92

## Summary Table

| Distribution | PMF | Mean | Variance |
|--------------|-----|------|----------|
| Bernoulli(p) | p^k(1-p)^{1-k} | p | p(1-p) |
| Binomial(n,p) | C(n,k)p^k(1-p)^{n-k} | np | np(1-p) |
| Geometric(p) | (1-p)^{k-1}p | 1/p | (1-p)/p² |
| Poisson(λ) | λ^k e^{-λ}/k! | λ | λ |
| Hypergeometric | (C(K,k)C(N-K,n-k))/C(N,n) | nK/N | complex |

## Choosing the Right Distribution

- **Bernoulli:** Single yes/no trial
- **Binomial:** Fixed number of independent trials
- **Geometric:** Trials until first success
- **Negative Binomial:** Trials until r successes
- **Poisson:** Count of rare events in interval
- **Hypergeometric:** Drawing without replacement

## Practice Problems

1. **Binomial:** P(at least 8 heads in 10 fair coin flips)?

2. **Geometric:** Expected flips until first heads with biased coin (p=0.3)?

3. **Poisson:** If average 4 emails/hour, P(6 or more in an hour)?

4. **Hypergeometric:** Draw 4 cards from deck; P(all 4 are aces)?

## Summary

Discrete distributions model:
- Binary outcomes (Bernoulli, Binomial)
- Waiting times (Geometric, Negative Binomial)
- Rare events (Poisson)
- Finite populations (Hypergeometric, Uniform)

Understanding these distributions and when to apply them is essential for probabilistic modeling.
