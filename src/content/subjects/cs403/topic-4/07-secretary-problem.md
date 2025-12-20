# Secretary Problem: Optimal Stopping and 1/e Threshold

## Introduction

The secretary problem is perhaps the most beautiful example of optimal stopping theory in mathematics. Despite its simple formulation, it leads to a surprising and elegant solution: observe the first 37% of candidates, then hire the next one better than all you've seen.

This problem goes by many names—the marriage problem, the best-choice problem, the dowry problem—reflecting its broad applicability to sequential decision-making under uncertainty. The mathematical solution has influenced fields from behavioral economics to machine learning.

The secretary problem exemplifies a fundamental challenge in online algorithms: balancing exploration (gathering information) against exploitation (making a decision), when decisions are irrevocable.

## Problem Definition

**Scenario**: You need to hire a secretary from $n$ candidates. Candidates are interviewed one at a time, in random order.

**Information structure**:
- After each interview, you know the relative ranking of candidates seen so far
- You don't know absolute quality or how remaining candidates compare
- The permutation of candidate quality is uniformly random

**Decision constraint**: After each interview, you must immediately hire or reject the candidate. Rejected candidates cannot be recalled.

**Objective**: Maximize the probability of hiring the best candidate (rank 1).

**Key insight**: We cannot maximize expected rank—the problem explicitly asks for the probability of getting the best, not second-best.

## The Optimal Strategy

**Algorithm**: For threshold $r$, reject the first $r-1$ candidates (observation phase), then hire the first subsequent candidate who is better than all observed candidates.

```typescript
function secretaryAlgorithm(n: number, threshold: number, getCandidateQuality: (i: number) => number): number {
    let bestSoFar = -Infinity;

    // Observation phase: reject first threshold-1 candidates
    for (let i = 0; i < threshold - 1; i++) {
        const quality = getCandidateQuality(i);
        bestSoFar = Math.max(bestSoFar, quality);
    }

    // Selection phase: hire first candidate better than all observed
    for (let i = threshold - 1; i < n; i++) {
        const quality = getCandidateQuality(i);
        if (quality > bestSoFar) {
            return i; // Hire this candidate
        }
    }

    // Forced to hire last candidate
    return n - 1;
}
```

**Optimal threshold**: $r^* = \lfloor n/e \rfloor \approx 0.368n$

**Success probability**: Approaches $1/e \approx 0.368$ as $n \to \infty$

## Mathematical Analysis

**Setup**: Let $P(r)$ = probability of selecting the best candidate using threshold $r$.

The best candidate is at position $i$ (for $i \geq r$) with probability $1/n$.

We succeed if:
1. Best candidate is at position $i \geq r$, AND
2. The best among first $i-1$ candidates is in positions $1, \ldots, r-1$

**Probability calculation**:

If the best candidate is at position $i$, we succeed iff the best of the first $i-1$ candidates is among the first $r-1$. This probability is $(r-1)/(i-1)$.

$$P(r) = \sum_{i=r}^{n} \frac{1}{n} \cdot \frac{r-1}{i-1} = \frac{r-1}{n} \sum_{i=r}^{n} \frac{1}{i-1}$$

**Continuous approximation**: For large $n$, let $x = r/n$ (fraction observed).

$$P(x) \approx x \int_{x}^{1} \frac{1}{t} dt = x \cdot (-\ln x) = -x \ln x$$

**Maximizing**: Take derivative and set to zero:
$$\frac{d}{dx}(-x \ln x) = -\ln x - 1 = 0$$
$$x^* = 1/e$$

**Optimal success probability**:
$$P(1/e) = -\frac{1}{e} \ln \frac{1}{e} = \frac{1}{e} \approx 0.368$$

This is remarkable: regardless of $n$ (for large $n$), the probability of finding the best candidate is about 37%.

## Proof of Optimality

**Theorem**: No strategy can achieve success probability greater than $1/e$ asymptotically.

**Proof sketch**: Consider any strategy. It must balance:
- Observing more → better reference for comparison
- Observing fewer → more chances to select the best

The threshold strategy is optimal because it maximizes information gathering subject to leaving enough candidates for selection. Any other strategy either gathers less information or has fewer selection opportunities.

**Lower bound argument**: Even knowing the optimal stopping rule, success probability cannot exceed $1/e$ because we fundamentally lack future information.

## Variations and Extensions

### Unknown $n$

If the number of candidates is unknown, use time-based stopping:

**Strategy**: Interview for time $T/e$, then select the first candidate better than all seen.

For candidates arriving as a Poisson process, this achieves probability $1/e$.

### Selecting Multiple Candidates

**Goal**: Select top $k$ candidates.

**Strategy**: Modified thresholds, observe fewer candidates initially.

**Success probability**: Decreases as $k$ increases, but more forgiving for partial success.

### Maximizing Expected Rank

Instead of maximizing probability of best:

**Goal**: Minimize expected rank of selected candidate.

**Optimal strategy**: Different threshold, observe fewer candidates.

**Expected rank**: Approximately $3.87$ with optimal strategy.

### Cardinal Utilities

If we observe actual quality values (not just ranks):

**Strategy**: Depends on distribution of quality values.

**Prophet inequalities**: Related theory for selecting from known distributions.

```typescript
function cardinalSecretary(values: number[], threshold: number): number {
    // With known value distribution, can compute optimal threshold
    let bestSeen = -Infinity;

    for (let i = 0; i < threshold; i++) {
        bestSeen = Math.max(bestSeen, values[i]);
    }

    for (let i = threshold; i < values.length; i++) {
        if (values[i] > bestSeen) {
            return i;
        }
    }

    return values.length - 1;
}
```

### Costs for Interviewing

If each interview has a cost:

**Trade-off**: Interview longer for better information vs. save interview costs.

**Optimal**: Observe fewer than $n/e$ candidates.

## Applications

**Hiring decisions**: Literal application—interview candidates sequentially and decide.

**House hunting**: Visit houses and decide to make an offer.

**Selling assets**: Accept bids for an item, deciding when to sell.

**Dating and relationships**: The "37% rule" for romantic decisions (popularized in mathematics outreach).

**Online auctions**: When to accept a bid in sequential auctions.

**Parking space selection**: Drive past spaces, deciding when to stop.

**Clinical trials**: Sequential patient enrollment with stopping rules.

## Connection to Online Algorithms

The secretary problem connects to broader themes in online algorithms:

**Competitive analysis**: The $1/e$ success probability can be viewed as a "competitive ratio" against an adversary who shows candidates in worst-case order—but here the random order assumption is crucial.

**Prophet inequalities**: Related problems where we know the distribution of values and compare against a prophet who sees all values.

**Online selection**: Generalizations to matroid constraints, multiple selections, and combinatorial objectives.

## Behavioral Implications

Laboratory experiments show humans often:
- Stop too early (insufficient observation)
- Stop too late (over-sampling)
- Fail to use consistent thresholds

The optimal strategy requires discipline to reject good-seeming candidates during the observation phase—counterintuitive but mathematically optimal.

## Key Takeaways

- The secretary problem asks: maximize probability of selecting the best from a random sequence
- Optimal strategy: observe $n/e$ candidates, then select first one better than all observed
- Success probability: $1/e \approx 37\%$, independent of $n$
- The $1/e$ fraction appears in both threshold and success probability—a beautiful mathematical coincidence
- Variations exist for multiple selections, unknown $n$, and cardinal utilities
- Applications span hiring, dating, house hunting, and auctions
- The problem demonstrates the fundamental exploration-exploitation trade-off in sequential decisions
