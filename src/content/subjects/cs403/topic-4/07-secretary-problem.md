# Secretary Problem: Optimal Stopping and 1/e Threshold

## Introduction

The secretary problem is a classic optimal stopping problem: interview candidates sequentially, must hire or reject immediately. It demonstrates elegant probability theory and optimal decision rules under uncertainty.

## Problem

**Scenario**: $n$ candidates, quality ranks $1, \ldots, n$ (1 = best)

**Process**: Interview in random order, one at a time

**Decision**: After each interview, hire or reject (irrevocable)

**Goal**: Maximize probability of hiring best candidate

## Optimal Strategy

**1/e rule**: Reject first $n/e \approx 0.368n$ candidates. Then hire first candidate better than all previous.

**Success probability**: $\geq 1/e \approx 0.368$

**Remarkable**: Independent of $n$ for large $n$!

## Analysis

Let $p(n)$ = probability of success with optimal strategy for $n$ candidates.

**Observation**: If best candidate is at position $i$, we succeed iff:
1. We skip first $i-1$ candidates (probability varies with strategy)
2. Best among first $i-1$ is in first $r$ (probability $(r-1)/(i-1)$)

**Threshold**: Skip first $r = n/e$ candidates.

**Probability**:
$$p(n) = \sum_{i=r+1}^{n} \frac{1}{n} \cdot \frac{r}{i-1} = \frac{r}{n} \sum_{i=r+1}^{n} \frac{1}{i-1}$$

As $n \to \infty$ with $r = n/e$:
$$p(n) \to \frac{1}{e} \sum_{i=r}^{n-1} \frac{1}{i} \to \frac{1}{e} \int_{1/e}^{1} \frac{1}{x} dx = \frac{1}{e}$$

## Variations

**Multiple choices**: Hire top $k$ candidates → different threshold

**Unknown $n$**: Use Bayesian approach with prior on $n$

**Cardinal utilities**: Know actual values, not just ranks → different strategy

**Costs**: Cost for each interview → economic tradeoff

## Applications

**Dating**: When to settle down (humorous but illustrative!)

**House hunting**: When to make offer

**Hiring**: When to stop interviewing

**Selling assets**: When to accept bid

**Online auctions**: When to bid

## Conclusion

The secretary problem demonstrates optimal stopping theory. The 1/e rule provides concrete guidance for real-world sequential decision-making under uncertainty.
