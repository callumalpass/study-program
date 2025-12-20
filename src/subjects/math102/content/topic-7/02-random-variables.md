---
id: math102-t7-rv
title: "Random Variables"
order: 2
---

# Discrete Random Variables

Random variables transform probability problems into algebraic ones. Understanding common distributions and their properties is essential for algorithm analysis.

## Bernoulli Distribution

The simplest random variable: success (1) or failure (0).

```
X ~ Bernoulli(p)

P(X = 1) = p
P(X = 0) = 1 - p = q
```

**Expected value**: E[X] = p
**Variance**: Var(X) = pq = p(1-p)

## Binomial Distribution

Count of successes in n independent Bernoulli trials.

```
X ~ Binomial(n, p)

P(X = k) = C(n,k) × pᵏ × (1-p)ⁿ⁻ᵏ
```

**Expected value**: E[X] = np
**Variance**: Var(X) = np(1-p)

### Example: Coin Flips

Flip fair coin 10 times. P(exactly 6 heads)?

P(X = 6) = C(10,6) × (0.5)⁶ × (0.5)⁴ = 210 × (0.5)¹⁰ ≈ 0.205

### Sum of Bernoullis

If X₁, ..., Xₙ are independent Bernoulli(p):
```
X₁ + ... + Xₙ ~ Binomial(n, p)
```

## Geometric Distribution

Number of trials until first success.

```
X ~ Geometric(p)

P(X = k) = (1-p)ᵏ⁻¹ × p  for k = 1, 2, 3, ...
```

**Expected value**: E[X] = 1/p
**Variance**: Var(X) = (1-p)/p²

**Memoryless property**: P(X > m + n | X > m) = P(X > n)

### Example: Expected Coin Flips

Expected flips until first heads with fair coin?

E[X] = 1/0.5 = 2 flips

## Negative Binomial Distribution

Number of trials until r successes.

```
X ~ NegBinomial(r, p)

P(X = k) = C(k-1, r-1) × pʳ × (1-p)ᵏ⁻ʳ  for k = r, r+1, ...
```

**Expected value**: E[X] = r/p

## Poisson Distribution

Models rare events occurring at a fixed rate.

```
X ~ Poisson(λ)

P(X = k) = e⁻λ × λᵏ / k!  for k = 0, 1, 2, ...
```

**Expected value**: E[X] = λ
**Variance**: Var(X) = λ

### Poisson Approximation to Binomial

If n is large and p is small with np = λ moderate:

```
Binomial(n, p) ≈ Poisson(np)
```

### Example: Typos

A book averages 2 typos per page. P(page has no typos)?

P(X = 0) = e⁻² × 2⁰/0! = e⁻² ≈ 0.135

## Hypergeometric Distribution

Drawing without replacement from a finite population.

```
X ~ Hypergeometric(N, K, n)

P(X = k) = C(K,k) × C(N-K, n-k) / C(N,n)
```

Where:
- N = population size
- K = success states in population
- n = number of draws
- k = observed successes

**Expected value**: E[X] = n × K/N

### Example: Card Drawing

Draw 5 cards from deck. P(exactly 2 aces)?

N = 52, K = 4, n = 5, k = 2

P(X = 2) = C(4,2) × C(48,3) / C(52,5)
         = 6 × 17,296 / 2,598,960
         ≈ 0.040

## Indicator Random Variables

**Definition**: I_A = 1 if event A occurs, 0 otherwise.

**Key property**: E[I_A] = P(A)

### Linearity Technique

To find E[X] where X counts events:

1. Express X = Σᵢ Iᵢ as sum of indicators
2. Apply E[X] = Σᵢ E[Iᵢ] = Σᵢ P(Aᵢ)

### Example: Birthday Problem

n people. Expected number of pairs sharing a birthday?

Let Iᵢⱼ = 1 if persons i,j share birthday.

X = Σᵢ<ⱼ Iᵢⱼ

E[X] = Σᵢ<ⱼ P(share birthday) = C(n,2) × 1/365 = n(n-1)/(2×365)

For n = 23: E[X] ≈ 0.69 pairs expected.

### Example: Fixed Points in Permutation

Random permutation of n. Expected fixed points?

Let Iᵢ = 1 if position i is fixed.

E[fixed points] = Σᵢ E[Iᵢ] = Σᵢ 1/n = n × 1/n = 1

Remarkably, expected fixed points = 1 regardless of n!

## Joint Distributions

For two random variables X and Y:

**Joint PMF**: p(x,y) = P(X = x, Y = y)

**Marginal PMFs**:
- p_X(x) = Σ_y p(x,y)
- p_Y(y) = Σ_x p(x,y)

**Independence**: X and Y are independent if p(x,y) = p_X(x) × p_Y(y) for all x,y

## Covariance and Correlation

**Covariance**:
```
Cov(X,Y) = E[(X - E[X])(Y - E[Y])] = E[XY] - E[X]E[Y]
```

**Correlation**:
```
ρ(X,Y) = Cov(X,Y) / (σ_X × σ_Y)
```

Range: -1 ≤ ρ ≤ 1

### Properties

- Cov(X,X) = Var(X)
- Cov(X,Y) = 0 if X,Y independent
- Var(X + Y) = Var(X) + Var(Y) + 2Cov(X,Y)

## Conditional Expectation

```
E[X|Y = y] = Σ_x x × P(X = x | Y = y)
```

**Law of Total Expectation**:
```
E[X] = E[E[X|Y]] = Σ_y E[X|Y = y] × P(Y = y)
```

### Example: Random Sums

Roll die to get N. Flip N coins. Expected heads?

E[X] = E[E[X|N]] = E[N/2] = E[N]/2 = 3.5/2 = 1.75

## Moment Generating Functions

```
M_X(t) = E[e^(tX)] = Σ_x e^(tx) × P(X = x)
```

**Properties**:
- E[Xⁿ] = M^(n)(0) (nth derivative at 0)
- M_{X+Y}(t) = M_X(t) × M_Y(t) if independent

This uniquely determines the distribution and simplifies working with sums of independent variables.
