# Probability Problems

This section presents classic probability problems and techniques. These problems develop intuition and problem-solving skills essential for probabilistic reasoning.

## Counting and Probability

### Problem 1: Birthday Probability

**Problem:** Find the probability that in a group of n people, at least two share a birthday.

**Solution:**

P(no shared birthday) = 365/365 × 364/365 × ... × (365-n+1)/365

P(at least one match) = 1 - P(no match)

```python
def birthday_probability(n):
    p_no_match = 1.0
    for i in range(n):
        p_no_match *= (365 - i) / 365
    return 1 - p_no_match

# Results
# n=23: P ≈ 0.507
# n=50: P ≈ 0.970
# n=70: P ≈ 0.999
```

### Problem 2: Poker Hands

**Problem:** Probability of full house (3 of one rank, 2 of another)?

**Solution:**

Total hands: C(52, 5) = 2,598,960

Full house:
- Choose rank for triple: C(13, 1) = 13
- Choose 3 suits: C(4, 3) = 4
- Choose rank for pair: C(12, 1) = 12
- Choose 2 suits: C(4, 2) = 6

P(full house) = (13 × 4 × 12 × 6) / 2,598,960 = 3744/2,598,960 ≈ 0.00144

### Problem 3: Matching Problem

**Problem:** n letters randomly placed in n envelopes. Expected number of correct matches?

**Solution using indicators:**

Let Xᵢ = 1 if letter i in correct envelope.
E[Xᵢ] = P(Xᵢ = 1) = 1/n

E[total matches] = Σ E[Xᵢ] = n × (1/n) = **1**

Remarkably, expected matches is exactly 1 regardless of n!

## Conditional Probability Problems

### Problem 4: Monty Hall Problem

**Setup:** Three doors, one with car, two with goats. You pick door 1. Host opens door 3 (showing goat). Should you switch to door 2?

**Solution:**

P(car at 1 | host opens 3) = P(opens 3 | car at 1) × P(car at 1) / P(opens 3)
= (1/2 × 1/3) / (1/2) = 1/3

P(car at 2 | host opens 3) = P(opens 3 | car at 2) × P(car at 2) / P(opens 3)
= (1 × 1/3) / (1/2) = 2/3

**Switching wins with probability 2/3!**

### Problem 5: Two Children Problem

**Problem:** A family has two children. Given at least one is a boy, what's probability both are boys?

**Solution:**

Sample space with at least one boy: {BB, BG, GB}
Favorable: {BB}

P(both boys | at least one boy) = 1/3

**Variant:** "The older child is a boy" gives P = 1/2 (different conditioning).

### Problem 6: Disease Testing

**Given:**
- P(disease) = 0.001
- P(positive | disease) = 0.99
- P(negative | no disease) = 0.98

**Find:** P(disease | positive)

By Bayes:
P(D|+) = P(+|D)P(D) / [P(+|D)P(D) + P(+|D')P(D')]
= (0.99 × 0.001) / (0.99 × 0.001 + 0.02 × 0.999)
= 0.00099 / 0.02097
≈ **0.047**

Only about 5% chance of disease despite positive test!

## Expectation Problems

### Problem 7: Coupon Collector

**Problem:** n coupon types, equally likely. Expected draws to collect all?

**Solution:**

After getting k types, expected draws for (k+1)th new type:
E[draws for new] = n/(n-k)

Total expected:
E[total] = n/n + n/(n-1) + n/(n-2) + ... + n/1 = n × Hₙ ≈ n ln n

### Problem 8: Hat Check Problem

**Problem:** n people check hats, receive random hat back. Expected number getting own hat?

**Solution:** (Same as matching problem)

E[own hat] = 1

Variance calculation:
Var(X) = E[X²] - 1
E[X²] = E[X] + 2 × E[Xᵢ Xⱼ for i≠j] = 1 + 2 × C(n,2) × 1/(n(n-1)) = 1 + 1 = 2
Var(X) = 1

### Problem 9: Random Walk Return

**Problem:** Symmetric random walk on integers. What's probability of eventual return to origin?

**Solution:** P(return) = 1 in 1D, but expected return time is infinite!

## Geometric Probability

### Problem 10: Meeting Problem

**Problem:** Two people agree to meet between 12:00 and 1:00, each arriving at uniform random time and waiting 15 minutes. Probability they meet?

**Solution:**

Let X, Y be arrival times (in hours, 0 to 1).
Meet if |X - Y| ≤ 0.25

P(meet) = 1 - P(|X-Y| > 0.25) = 1 - 2 × (0.75)²/2 = 1 - 0.5625 = **7/16**

### Problem 11: Stick Breaking

**Problem:** Break stick at two random points. Probability pieces form triangle?

**Solution:**

Let breaks at X, Y with X < Y (uniform on [0,1]).
Triangle inequality requires:
- X < 0.5
- Y - X < 0.5
- 1 - Y < 0.5

P(triangle) = 1/4 (area of feasible region)

## Competition Problems

### Problem 12: Two Envelope Problem

**Problem:** Two envelopes, one with twice the money. You pick one seeing $100. Should you switch?

**Analysis:** This is a paradox! Naive analysis suggests always switch, but this can't be right.

**Resolution:** Need proper prior on amounts. With bounded distributions, switching isn't always beneficial.

### Problem 13: Petersburg Paradox

**Game:** Flip coin until heads. If heads on flip n, win $2ⁿ.

**Expected value:**
E[winnings] = Σ (1/2)ⁿ × 2ⁿ = Σ 1 = ∞

**Paradox:** Expected value infinite, but people won't pay much to play.

**Resolutions:**
- Utility functions (log money)
- Finite bankroll
- Bounded bets

## Problem-Solving Strategies

1. **Draw sample space:** Visualize all outcomes
2. **Use indicators:** Simplify counting via linearity
3. **Condition wisely:** Break into cases
4. **Check with simulation:** Verify intuition
5. **Watch for paradoxes:** Ensure proper conditioning

## Practice Problems

1. **Dice:** Roll 3 dice. P(all different)?

2. **Cards:** Deal 5 cards. P(exactly 2 pairs)?

3. **Expectation:** Roll die repeatedly until sum ≥ 10. Expected rolls?

4. **Conditional:** Given sum of two dice is 7, P(one die shows 4)?

5. **Random walk:** Start at 3. Each step ±1 equally likely. P(reach 0 before 7)?

## Summary

Probability problems require:
- Careful sample space construction
- Correct conditioning (avoid common fallacies)
- Indicator variables for counting
- Bayes' theorem for inverse probability
- Checking answers via simulation or limiting cases
