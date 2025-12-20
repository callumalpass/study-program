---
id: math202-t1-independence
title: "Independence"
order: 5
---

# Independence

## Introduction

Independence is one of the most important concepts in probability theory. When events are independent, knowing that one event occurred provides no information about whether the other event occurred. This concept simplifies probability calculations and underlies many important theoretical results and practical applications, from random sampling to statistical inference.

## Definition of Independence

Two events $A$ and $B$ are **independent** if and only if:

$$P(A \cap B) = P(A) \cdot P(B)$$

### Equivalent Characterizations

If $P(B) > 0$, then $A$ and $B$ are independent if and only if:
$$P(A|B) = P(A)$$

Similarly, if $P(A) > 0$:
$$P(B|A) = P(B)$$

**Interpretation**: Independence means that knowing $B$ occurred doesn't change the probability of $A$ (and vice versa).

### Proof of Equivalence

Starting from $P(A|B) = P(A)$ and using the definition of conditional probability:
$$\frac{P(A \cap B)}{P(B)} = P(A)$$
$$P(A \cap B) = P(A) \cdot P(B)$$

This shows the equivalence of the two definitions.

## Examples of Independence

### Example 1: Coin Flips

**Problem**: Two fair coins are flipped. Are the events $A$ = "first coin is heads" and $B$ = "second coin is heads" independent?

**Solution**:
$$P(A) = \frac{1}{2}, \quad P(B) = \frac{1}{2}, \quad P(A \cap B) = \frac{1}{4}$$

$$P(A) \cdot P(B) = \frac{1}{2} \cdot \frac{1}{2} = \frac{1}{4} = P(A \cap B)$$

Yes, they are independent. The outcome of one coin flip does not affect the other.

### Example 2: Dice Rolls

**Problem**: Roll two fair dice. Are the events $A$ = "first die shows 6" and $B$ = "sum is 7" independent?

**Solution**:
- $P(A) = \frac{6}{36} = \frac{1}{6}$ (6 outcomes: (6,1), (6,2), ..., (6,6))
- $P(B) = \frac{6}{36} = \frac{1}{6}$ (6 outcomes: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1))
- $P(A \cap B) = \frac{1}{36}$ (only (6,1))

$$P(A) \cdot P(B) = \frac{1}{6} \cdot \frac{1}{6} = \frac{1}{36} = P(A \cap B)$$

Yes, they are independent.

## Examples of Dependence

### Example 3: Drawing Without Replacement

**Problem**: Two cards are drawn from a standard deck without replacement. Are the events $A$ = "first card is an ace" and $B$ = "second card is an ace" independent?

**Solution**:
$$P(A) = \frac{4}{52} = \frac{1}{13}$$

$$P(B|A) = \frac{3}{51} = \frac{1}{17} \neq \frac{1}{13} = P(B)$$

No, they are dependent. Drawing an ace first changes the probability that the second card is an ace.

### Example 4: Dice Sum

**Problem**: Roll two fair dice. Are the events $A$ = "first die shows 4" and $B$ = "sum is 8" independent?

**Solution**:
- $P(A) = \frac{6}{36} = \frac{1}{6}$
- $P(B) = \frac{5}{36}$ (outcomes: (2,6), (3,5), (4,4), (5,3), (6,2))
- $P(A \cap B) = \frac{1}{36}$ (only (4,4))

$$P(A) \cdot P(B) = \frac{1}{6} \cdot \frac{5}{36} = \frac{5}{216} \neq \frac{1}{36} = P(A \cap B)$$

No, they are dependent.

## Testing for Independence

To determine if events $A$ and $B$ are independent, check if any of these equivalent conditions hold:

1. $P(A \cap B) = P(A) \cdot P(B)$
2. $P(A|B) = P(A)$ (when $P(B) > 0$)
3. $P(B|A) = P(B)$ (when $P(A) > 0$)

### Example 5: Family Example Revisited

**Problem**: A family has two children. Consider these events:
- $A$ = "both children are girls"
- $B$ = "at least one child is a girl"

Are $A$ and $B$ independent?

**Solution**:
Sample space: $\{BB, BG, GB, GG\}$ (equally likely)

$$P(A) = \frac{1}{4}, \quad P(B) = \frac{3}{4}, \quad P(A \cap B) = P(A) = \frac{1}{4}$$

$$P(A) \cdot P(B) = \frac{1}{4} \cdot \frac{3}{4} = \frac{3}{16} \neq \frac{1}{4} = P(A \cap B)$$

No, they are dependent. If both are girls, then at least one is certainly a girl, so $P(B|A) = 1 \neq P(B)$.

## Properties of Independent Events

### Property 1: Complements

If $A$ and $B$ are independent, then the following pairs are also independent:
- $A$ and $B^c$
- $A^c$ and $B$
- $A^c$ and $B^c$

**Proof for $A$ and $B^c$**:
$$P(A \cap B^c) = P(A - B) = P(A) - P(A \cap B) = P(A) - P(A) \cdot P(B)$$
$$= P(A)(1 - P(B)) = P(A) \cdot P(B^c)$$

### Property 2: Zero Probability Events

If $P(A) = 0$ or $P(B) = 0$, then $A$ and $B$ are independent (vacuously).

### Property 3: Certain Events

If $P(A) = 1$ or $P(B) = 1$, then $A$ and $B$ are independent.

## Independence vs. Mutually Exclusive

**Important**: Independence and mutual exclusivity are different concepts!

- **Mutually exclusive**: $A \cap B = \emptyset$, so $P(A \cap B) = 0$
- **Independent**: $P(A \cap B) = P(A) \cdot P(B)$

### Key Observation

If $A$ and $B$ are mutually exclusive with $P(A) > 0$ and $P(B) > 0$, they **cannot** be independent.

**Proof**: If mutually exclusive:
$$P(A \cap B) = 0$$

If they were independent:
$$P(A \cap B) = P(A) \cdot P(B) > 0$$

Contradiction! Therefore, non-trivial mutually exclusive events are always dependent.

**Intuition**: If $A$ and $B$ are mutually exclusive, then knowing $A$ occurred tells us that $B$ definitely did not occur. This is maximum dependence, not independence.

## Mutual Independence

For three or more events, we need a stronger notion of independence.

### Pairwise Independence

Events $A_1, A_2, \ldots, A_n$ are **pairwise independent** if every pair is independent:
$$P(A_i \cap A_j) = P(A_i) \cdot P(A_j) \text{ for all } i \neq j$$

### Mutual Independence

Events $A_1, A_2, \ldots, A_n$ are **mutually independent** (or just "independent") if for every subset $\{i_1, i_2, \ldots, i_k\} \subseteq \{1, 2, \ldots, n\}$:
$$P(A_{i_1} \cap A_{i_2} \cap \cdots \cap A_{i_k}) = P(A_{i_1}) \cdot P(A_{i_2}) \cdots P(A_{i_k})$$

**Important**: Mutual independence is stronger than pairwise independence!

### Example 6: Three Coin Flips

**Problem**: Three fair coins are flipped. Define:
- $A$ = "first coin is heads"
- $B$ = "second coin is heads"
- $C$ = "third coin is heads"

Are $A$, $B$, $C$ mutually independent?

**Solution**:
We need to verify:
1. Pairwise: $P(A \cap B) = P(A)P(B)$, $P(A \cap C) = P(A)P(C)$, $P(B \cap C) = P(B)P(C)$
2. Triple: $P(A \cap B \cap C) = P(A)P(B)P(C)$

$$P(A) = P(B) = P(C) = \frac{1}{2}$$
$$P(A \cap B) = P(A \cap C) = P(B \cap C) = \frac{1}{4} = \frac{1}{2} \cdot \frac{1}{2}$$ ✓
$$P(A \cap B \cap C) = \frac{1}{8} = \frac{1}{2} \cdot \frac{1}{2} \cdot \frac{1}{2}$$ ✓

Yes, they are mutually independent.

### Example 7: Pairwise but Not Mutually Independent

**Problem**: Consider a tetrahedral die with faces labeled:
- Face 1: (0,0,1)
- Face 2: (0,1,0)
- Face 3: (1,0,0)
- Face 4: (1,1,1)

Define events based on the face that appears:
- $A$ = first coordinate is 1
- $B$ = second coordinate is 1
- $C$ = third coordinate is 1

Are these pairwise independent? Mutually independent?

**Solution**:
$$P(A) = P(\{3,4\}) = \frac{2}{4} = \frac{1}{2}$$
$$P(B) = P(\{2,4\}) = \frac{1}{2}$$
$$P(C) = P(\{1,4\}) = \frac{1}{2}$$

Pairwise:
$$P(A \cap B) = P(\{4\}) = \frac{1}{4} = P(A) \cdot P(B)$$ ✓
$$P(A \cap C) = P(\{4\}) = \frac{1}{4} = P(A) \cdot P(C)$$ ✓
$$P(B \cap C) = P(\{4\}) = \frac{1}{4} = P(B) \cdot P(C)$$ ✓

Triple:
$$P(A \cap B \cap C) = P(\{4\}) = \frac{1}{4} \neq \frac{1}{8} = P(A) \cdot P(B) \cdot P(C)$$ ✗

These events are pairwise independent but **not** mutually independent!

## Applications of Independence

### Repeated Independent Trials

When an experiment is repeated independently $n$ times, and event $A$ has probability $p$ on each trial:
$$P(\text{$A$ occurs on all $n$ trials}) = p^n$$

### Example 8: Quality Control

**Problem**: A machine produces items that are defective with probability 0.01, independently. What is the probability that in a batch of 5 items:
(a) All are non-defective?
(b) At least one is defective?

**Solution**:

(a) $P(\text{all non-defective}) = (0.99)^5 \approx 0.951$

(b) Using the complement:
$$P(\text{at least one defective}) = 1 - P(\text{all non-defective}) = 1 - 0.951 = 0.049$$

### Example 9: System Reliability

**Problem**: A system has three components in series, each functioning independently with probability 0.95. The system works only if all components work. What is the system reliability?

**Solution**:
$$P(\text{system works}) = P(C_1 \cap C_2 \cap C_3) = P(C_1) \cdot P(C_2) \cdot P(C_3) = (0.95)^3 \approx 0.857$$

**Problem (continued)**: If instead the components are in parallel (system works if at least one component works), what is the reliability?

**Solution**:
$$P(\text{system works}) = 1 - P(\text{all fail}) = 1 - (0.05)^3 = 1 - 0.000125 = 0.999875$$

## Conditional Independence

Events $A$ and $B$ are **conditionally independent given $C$** if:
$$P(A \cap B | C) = P(A|C) \cdot P(B|C)$$

**Important**: Conditional independence does not imply unconditional independence, and vice versa!

### Example 10: Medical Tests

Two medical tests for the same disease are conditionally independent given the disease status, but unconditionally dependent (since both depend on whether the patient has the disease).

## Summary

Independence is a crucial concept in probability:

- **Definition**: $P(A \cap B) = P(A) \cdot P(B)$
- **Equivalent**: $P(A|B) = P(A)$ (when $P(B) > 0$)
- **Not the same**: Independence ≠ mutually exclusive
- **Mutual independence**: Requires all subsets to have multiplicative probabilities
- **Applications**: Simplifies calculations for repeated trials and complex systems

Understanding when events are independent (or can be assumed independent) is essential for modeling real-world phenomena and performing statistical analysis.
