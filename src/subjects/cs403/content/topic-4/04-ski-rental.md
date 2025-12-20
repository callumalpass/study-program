# Ski Rental Problem: Rent vs Buy and Randomized Strategy

## Introduction

The ski rental problem is the simplest and most elegant example of online decision-making under uncertainty. Despite its toy-like appearance, it captures the essence of many real-world decisions: when should you commit to a large upfront cost versus paying incrementally?

This problem serves as the canonical example for introducing competitive analysis and demonstrating how randomization can provably improve performance against worst-case inputs. The techniques developed here—balancing immediate costs against future uncertainty, using randomization to defeat adversarial inputs—appear throughout online algorithms.

## Problem Definition

**Scenario**: You arrive at a ski resort for a trip of unknown duration. Each day you have two choices:
- Rent skis for $\$1$ per day
- Buy skis for $\$B$ (one-time cost, use forever)

**Offline optimal**: If you knew you'd ski exactly $d$ days:
- If $d < B$: rent every day, cost = $d$
- If $d \geq B$: buy on day 1, cost = $B$

**Online challenge**: The number of days $d$ is revealed one day at a time. You must decide each morning whether to rent or buy, not knowing if today is your last day.

**Key constraint**: Decisions are irrevocable. Once you buy, you can't return the skis. Once you rent, you've spent that dollar.

## Deterministic Analysis

**Naive strategies**:
- Always rent: Cost = $d$. If $d$ is large, this is arbitrarily bad compared to OPT = $B$.
- Always buy on day 1: Cost = $B$. If $d = 1$, ratio = $B$ (arbitrarily bad).

**Break-even strategy**: Rent for $B-1$ days, then buy on day $B$.

**Analysis**:

*Case 1*: Trip lasts $d < B$ days.
- Algorithm cost = $d$ (rent each day)
- OPT cost = $d$ (rent each day)
- Ratio = 1

*Case 2*: Trip lasts $d \geq B$ days.
- Algorithm cost = $(B-1) + B = 2B - 1$ (rent $B-1$ days, then buy)
- OPT cost = $B$ (buy on day 1)
- Ratio = $(2B-1)/B < 2$

**Theorem**: The break-even strategy is 2-competitive.

**Lower bound**: No deterministic strategy can achieve competitive ratio better than 2.

**Proof**: Consider two possible trip lengths: 1 day or $B$ days. Any deterministic algorithm must decide on day 1 whether to buy or rent.
- If it buys on day 1 and trip is 1 day: ratio = $B/1 = B$
- If it rents on day 1 and trip is $B$ days: it will either buy (after some renting) or keep renting

The adversary chooses trip length after seeing the algorithm. Best deterministic ratio is 2.

## Randomized Strategy

Randomization can defeat the adversary by making algorithm behavior unpredictable.

**Randomized break-even**: Choose a "buy day" $D$ according to some distribution. Rent until day $D$, then buy on day $D$ if still skiing.

**Optimal distribution**: Choose $D$ according to an exponential-like distribution with parameter $1/B$.

**Simplified analysis** (uniform distribution): Choose $D$ uniformly from $\{1, 2, \ldots, B\}$.

For trip of length $d$:
- If $d < D$: rent all $d$ days, cost = $d$
- If $d \geq D$: rent $D-1$ days, buy on day $D$, cost = $D - 1 + B$

**Expected cost for trip of $d$ days**:
$$\mathbb{E}[\text{cost}] = \frac{1}{B} \sum_{D=1}^{B} \text{cost}(d, D)$$

**Optimal exponential distribution**: The optimal randomized strategy achieves competitive ratio:
$$\frac{e}{e-1} \approx 1.58$$

**Deriving the optimal**:

Consider continuous time. Buy skis at time $t$ chosen from distribution $F(t)$ with density $f(t)$.

Let $\rho = $ competitive ratio. For ratio $\rho$:
- If trip length $d < t$: cost = $d \leq \rho \cdot d$ ✓
- If trip length $d \geq t$: cost = $t + B \leq \rho \cdot B$

The constraint $t + B \leq \rho B$ gives $t \leq (\rho - 1)B$.

To minimize $\rho$, we want $F$ supported on $[0, (\rho-1)B]$ with right density.

Solving the optimization: $\rho = e/(e-1)$ with exponential distribution:
$$f(t) = \frac{1}{B} e^{t/B} \quad \text{for } t \in [0, B \ln(e/(e-1))]$$

```typescript
function randomizedSkiRental(buyPrice: number): number {
    // Sample buy day from optimal distribution
    // Simplified: use uniform distribution for demonstration
    const buyDay = Math.floor(Math.random() * buyPrice) + 1;
    return buyDay;
}

function simulateTrip(tripLength: number, buyPrice: number): number {
    const buyDay = randomizedSkiRental(buyPrice);

    if (tripLength < buyDay) {
        return tripLength; // Only rented
    } else {
        return (buyDay - 1) + buyPrice; // Rented, then bought
    }
}
```

## Lower Bound for Randomized Algorithms

**Theorem**: No randomized algorithm can achieve competitive ratio better than $e/(e-1) \approx 1.58$ against oblivious adversaries.

**Proof sketch** (Yao's minimax): Design a distribution over trip lengths that makes any deterministic algorithm perform poorly on average. By Yao's principle, this lower bounds randomized algorithms.

Distribution: Trip length $d = B$ with probability $p$, otherwise $d$ chosen uniformly from $\{1, \ldots, B-1\}$.

Optimizing $p$ gives lower bound $e/(e-1)$.

## Generalizations

**Multiple slopes**: Different rental rates at different times (e.g., discounts on certain days).

**Refunds**: Partial refund if you return early.

**TCP acknowledgment**: Send ACK now (cost 1) or wait and batch (cost $B$ if timeout occurs). Same structure as ski rental.

**Bahncard problem**: Buy a discount card that reduces future ticket prices. Multi-slope generalization.

## Applications

**Cloud computing**: Rent vs buy server capacity. On-demand instances vs reserved instances.

**Leasing**: Rent vs purchase equipment, vehicles, real estate.

**Investment timing**: When to make irreversible investments under uncertainty.

**Caching/prefetching**: When to proactively fetch data vs fetch on demand.

**Subscription decisions**: Pay per use vs monthly subscription.

## Connection to Online Learning

The ski rental problem connects to the explore-exploit tradeoff:
- **Explore**: Keep renting to learn more about trip duration
- **Exploit**: Buy to lock in known good rate

Unlike bandit problems, ski rental has no learning—each day's "trip continues" signal provides no information about future duration.

## Key Takeaways

- Ski rental is the canonical rent-vs-buy online problem
- Break-even deterministic strategy achieves 2-competitive ratio
- Randomization improves to $e/(e-1) \approx 1.58$-competitive
- Both bounds are tight (matching lower bounds exist)
- The problem models many real decisions: cloud computing, leasing, subscriptions
- Techniques generalize to multi-slope variants and related problems
- Simple structure makes it ideal for introducing competitive analysis concepts
