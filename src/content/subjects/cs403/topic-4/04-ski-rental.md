# Ski Rental Problem: Rent vs Buy and Randomized Strategy

## Introduction

The ski rental problem is the canonical example of online decision-making under uncertainty. It demonstrates competitive analysis and randomized strategies for online algorithms.

## Problem

**Scenario**: Ski for unknown number of days. Each day: rent ($\$1$) or buy ($\$B$).

**Online challenge**: Don't know how many days total.

**Offline optimal**: If ski $\geq B$ days, buy immediately. Otherwise, rent all days.

## Deterministic Strategy

**Break-even algorithm**: Rent for $B-1$ days, then buy on day $B$.

**Analysis**:
- If ski $< B$ days: Cost = days (same as OPT)
- If ski $\geq B$ days: Cost = $B-1 + B = 2B - 1$, OPT = $B$

**Competitive ratio**: 2 (tight for deterministic)

## Randomized Strategy

**Algorithm**: Choose random day $d \in [1, B]$ uniformly. Rent until day $d$, then buy.

**Expected cost**:
$$\mathbb{E}[\text{cost}] = \begin{cases} 
d & \text{if ski } d \text{ days (rent only)} \\
d + B & \text{if ski } > d \text{ days (rent + buy)}
\end{cases}$$

**Against oblivious adversary**: Expected competitive ratio = $e/(e-1) \approx 1.58$

**Proof**: Uses exponential distribution for choosing buy day.

## Applications

**Cloud computing**: Rent vs buy server capacity
**Leasing**: Rent vs buy equipment  
**Investment**: Dollar-cost averaging
**Caching**: When to pre-fetch vs on-demand

## Conclusion

Ski rental illustrates fundamental online algorithm concepts: competitive analysis, randomization for better ratios, and practical decision-making under uncertainty.
