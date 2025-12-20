---
id: cs201-t6-proofs
title: "Proving Greedy Correctness"
order: 2
---

# Proving Greedy Correctness

The simplicity of greedy algorithms is deceptive. Because they make locally optimal choices without considering global consequences, they can fail in subtle ways. Coin change with denominations [1, 3, 4] choosing greedily for amount 6 gives three coins (4+1+1) when two suffice (3+3). Without rigorous proof, you risk deploying broken algorithms that seem reasonable but produce suboptimal results.

Two proof techniques dominate greedy correctness arguments. Exchange arguments show that any optimal solution can be transformed into the greedy solution without losing optimality—if you can always "exchange" an optimal solution's choices for greedy's choices, greedy must be optimal. "Greedy stays ahead" arguments show that at every step, greedy has made at least as much progress as any alternative—if greedy is never behind, it finishes first (or tied for first).

Mastering these proof techniques builds confidence in greedy algorithm design. When you can prove a greedy approach correct, you gain efficiency without sacrificing optimality. When you cannot find a proof, that difficulty often signals genuine failure—prompting you to seek counterexamples or alternative approaches like dynamic programming.

## Why Proofs Matter

Greedy algorithms don't always work:

```python
# Coin change: Make 6 cents with coins [1, 3, 4]
# Greedy: 4 + 1 + 1 = 3 coins
# Optimal: 3 + 3 = 2 coins
```

Without proof, you might use a broken algorithm. With proof, you have confidence in correctness.

## The Exchange Argument

**Idea**: Show that any optimal solution can be transformed into the greedy solution without losing optimality.

### Structure

1. Let G be greedy solution, O be any optimal solution
2. If G = O, done
3. If G ≠ O, identify first difference
4. Show O can be modified to be "more like G" without increasing cost
5. Repeat until O = G

### Example: Activity Selection

**Problem**: Select maximum non-overlapping activities.

**Greedy**: Always pick activity with earliest end time.

**Proof**:

Let G = {g₁, g₂, ..., gₖ} be greedy solution (sorted by end time).
Let O = {o₁, o₂, ..., oₘ} be optimal solution (sorted by end time).

**Claim**: For all i ≤ min(k, m), end(gᵢ) ≤ end(oᵢ).

**Base**: g₁ has earliest end time by construction. So end(g₁) ≤ end(o₁).

**Induction**: Assume end(gᵢ₋₁) ≤ end(oᵢ₋₁).

In O, oᵢ starts after oᵢ₋₁ ends.
Since end(gᵢ₋₁) ≤ end(oᵢ₋₁), activity oᵢ is available when greedy selects gᵢ.
Greedy picks earliest end time among available, so end(gᵢ) ≤ end(oᵢ). ✓

**Conclusion**: Since greedy's ith activity always ends no later than optimal's ith activity, greedy can fit at least as many activities as optimal. Thus |G| ≥ |O|, so greedy is optimal.

### Example: Huffman Coding

**Problem**: Build optimal prefix-free code for character frequencies.

**Greedy**: Always merge two lowest-frequency nodes.

**Exchange Argument**:

Let T be any optimal tree. Let a, b be two lowest-frequency characters.

**Claim**: a and b can be made siblings at maximum depth without increasing cost.

If they're not at max depth, some other characters x, y are deeper. Since freq(a), freq(b) are minimal, swapping a↔x and b↔y doesn't increase weighted path length.

Since greedy creates trees where lowest-frequency nodes are siblings at bottom, and any optimal tree can be transformed this way, greedy is optimal.

## Greedy Stays Ahead

**Idea**: Define a measure where greedy is always "at least as good" as any alternative at each step.

### Structure

1. Define a measure of progress/quality
2. Prove inductively: at step i, greedy's measure ≥ any alternative's measure
3. Conclude greedy's final solution is optimal

### Example: Activity Selection (Alternative Proof)

**Measure**: Number of activities selected so far.

**Claim**: After selecting i activities, greedy's ith activity ends no later than any other way of selecting i activities.

**Induction**:
- Base: Greedy selects earliest-ending activity first.
- Step: If greedy has earliest end after i-1 activities, it can select earliest-ending compatible activity for ith, maintaining the property.

Since greedy always leaves maximum room for future activities, it selects the maximum number.

### Example: Fractional Knapsack

**Problem**: Fill knapsack maximizing value (items can be split).

**Greedy**: Take items by value/weight ratio, highest first.

**Measure**: Total value per unit capacity used.

**Proof**:

For any capacity c used, greedy achieves maximum value:
- Greedy takes highest ratio items first
- Any alternative using same capacity c with different items has lower value

By induction on capacity used, greedy is optimal.

## Matroid Theory (Advanced)

A **matroid** is a structure where greedy algorithms provably work.

**Definition**: A matroid M = (E, I) where:
- E is a finite set
- I is a collection of "independent" subsets satisfying:
  1. ∅ ∈ I
  2. If A ∈ I and B ⊆ A, then B ∈ I (hereditary)
  3. If A, B ∈ I and |A| < |B|, then ∃x ∈ B\A such that A ∪ {x} ∈ I (exchange)

**Theorem**: For any matroid, greedy finds maximum-weight independent set.

**Examples**:
- **Graphic matroid**: E = edges, I = acyclic subsets → MST
- **Linear matroid**: E = vectors, I = linearly independent subsets

## Common Mistakes

### Assuming Greedy Works Without Proof

```python
# Attempt: Minimize coins for amount
# Greedy by largest coin first
def coin_change_greedy(coins, amount):
    coins.sort(reverse=True)
    count = 0
    for coin in coins:
        while amount >= coin:
            amount -= coin
            count += 1
    return count if amount == 0 else -1
```

**Fails for**: coins = [1, 3, 4], amount = 6
**Needs**: DP solution

### Wrong Greedy Choice

For interval scheduling, sorting by:
- **Start time**: Wrong (early-starting long interval blocks many)
- **Duration**: Wrong (short interval might conflict with many)
- **End time**: Correct (leaves maximum room)

### Ignoring Edge Cases

Make sure proof covers:
- Empty inputs
- Single elements
- Ties (equal values)
- Extreme cases

## Proof Checklist

1. ☐ Define the problem formally
2. ☐ State the greedy choice clearly
3. ☐ Choose proof technique (exchange or stays ahead)
4. ☐ Prove base case
5. ☐ Prove inductive step
6. ☐ Handle ties and edge cases
7. ☐ Conclude optimality

## When to Suspect Greedy Works

- Problem has **optimal substructure**
- Local choices don't constrain future choices badly
- No "regret" from early decisions
- Problem resembles known greedy problems (scheduling, graph algorithms)

## When Greedy Likely Fails

- Choices interact in complex ways
- Early decisions can cause suboptimal lock-in
- Problem resembles known DP problems (knapsack, edit distance)
- Counter-examples are easy to construct
