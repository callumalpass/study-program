---
id: math202-t1-conditional
title: "Conditional Probability"
order: 4
---

# Conditional Probability

## Introduction

In many situations, we have partial information about the outcome of a random experiment. This information changes the probabilities we assign to events. Conditional probability quantifies how the probability of an event changes when we know that another event has occurred. This concept is fundamental to understanding how information updates our beliefs and is essential for applications ranging from medical diagnosis to machine learning.

## Definition of Conditional Probability

The **conditional probability** of event $A$ given that event $B$ has occurred is denoted $P(A|B)$ and defined as:

$$P(A|B) = \frac{P(A \cap B)}{P(B)}$$

provided that $P(B) > 0$.

### Interpretation

- The numerator $P(A \cap B)$ is the probability that both $A$ and $B$ occur
- The denominator $P(B)$ normalizes by the probability of the given information
- We're essentially restricting our sample space to the event $B$ and asking what fraction of $B$ also belongs to $A$

### Example 1: Rolling Dice

**Problem**: A fair die is rolled. What is the probability that the result is 4, given that the result is even?

**Solution**:
Let $A = \{4\}$ and $B = \{2, 4, 6\}$ (even outcomes).

$$P(A|B) = \frac{P(A \cap B)}{P(B)} = \frac{P(\{4\})}{P(\{2,4,6\})} = \frac{1/6}{3/6} = \frac{1}{3}$$

Intuitively, if we know the die shows an even number, there are three equally likely possibilities: 2, 4, or 6. The probability of 4 is therefore 1/3.

## The Multiplication Rule

Rearranging the definition of conditional probability gives the **multiplication rule**:

$$P(A \cap B) = P(B) \cdot P(A|B) = P(A) \cdot P(B|A)$$

This provides a way to compute the probability of the intersection of two events.

### Example 2: Drawing Cards Without Replacement

**Problem**: Two cards are drawn from a standard deck without replacement. What is the probability that both are aces?

**Solution**:
Let $A_1$ = first card is an ace, $A_2$ = second card is an ace.

$$P(A_1 \cap A_2) = P(A_1) \cdot P(A_2|A_1) = \frac{4}{52} \cdot \frac{3}{51} = \frac{12}{2652} = \frac{1}{221}$$

After drawing one ace, there are 3 aces left among 51 cards.

### Example 3: Quality Control

**Problem**: A factory produces items where 5% are defective. An inspector correctly identifies defective items 90% of the time and correctly identifies non-defective items 95% of the time. What is the probability that a randomly selected item is defective and identified as defective?

**Solution**:
Let $D$ = item is defective, $I$ = identified as defective.

$$P(D \cap I) = P(D) \cdot P(I|D) = 0.05 \times 0.90 = 0.045$$

## General Multiplication Rule

For events $A_1, A_2, \ldots, A_n$:

$$P(A_1 \cap A_2 \cap \cdots \cap A_n) = P(A_1) \cdot P(A_2|A_1) \cdot P(A_3|A_1 \cap A_2) \cdots P(A_n|A_1 \cap \cdots \cap A_{n-1})$$

### Example 4: Sequential Selection

**Problem**: A box contains 5 red balls and 3 blue balls. Three balls are drawn without replacement. What is the probability all three are red?

**Solution**:
Let $R_i$ = $i$-th ball is red.

$$P(R_1 \cap R_2 \cap R_3) = P(R_1) \cdot P(R_2|R_1) \cdot P(R_3|R_1 \cap R_2)$$
$$= \frac{5}{8} \cdot \frac{4}{7} \cdot \frac{3}{6} = \frac{60}{336} = \frac{5}{28}$$

## Properties of Conditional Probability

For a fixed event $B$ with $P(B) > 0$, conditional probability $P(\cdot|B)$ satisfies all the axioms of probability:

1. **Non-negativity**: $P(A|B) \geq 0$
2. **Normalization**: $P(S|B) = 1$ and $P(B|B) = 1$
3. **Additivity**: For mutually exclusive events $A_1$ and $A_2$:
   $$P(A_1 \cup A_2|B) = P(A_1|B) + P(A_2|B)$$

### Complement Rule for Conditional Probability

$$P(A^c|B) = 1 - P(A|B)$$

### Addition Rule for Conditional Probability

$$P(A_1 \cup A_2|B) = P(A_1|B) + P(A_2|B) - P(A_1 \cap A_2|B)$$

## Computing Conditional Probabilities

### Method 1: Using the Definition

Directly apply:
$$P(A|B) = \frac{P(A \cap B)}{P(B)}$$

### Method 2: Reduced Sample Space

When outcomes are equally likely, condition by treating $B$ as the new sample space:
$$P(A|B) = \frac{|A \cap B|}{|B|}$$

### Example 5: Family with Two Children

**Problem**: A family has two children. What is the probability both are girls, given that:
(a) At least one is a girl?
(b) The older child is a girl?

**Solution**:
Sample space: $S = \{BB, BG, GB, GG\}$ (B=boy, G=girl; first letter is older child).

(a) Let $A$ = both girls = $\{GG\}$, $B$ = at least one girl = $\{BG, GB, GG\}$

$$P(A|B) = \frac{|A \cap B|}{|B|} = \frac{|\{GG\}|}{|\{BG, GB, GG\}|} = \frac{1}{3}$$

(b) Let $C$ = older child is a girl = $\{GB, GG\}$

$$P(A|C) = \frac{|A \cap C|}{|C|} = \frac{|\{GG\}|}{|\{GB, GG\}|} = \frac{1}{2}$$

The additional information in (b) is more specific, leading to a different probability.

## Tree Diagrams

Tree diagrams provide a visual method for calculating probabilities in sequential experiments. Each branch represents a possible outcome with its associated probability.

### Example 6: Medical Testing

**Problem**: A disease affects 1% of the population. A test for the disease:
- Correctly identifies 99% of those with the disease (sensitivity)
- Correctly identifies 98% of those without the disease (specificity)

What is the probability that a randomly selected person tests positive?

**Solution**:
Let $D$ = has disease, $T$ = tests positive.

Using a tree diagram:

Branch 1: Has disease → Tests positive
- Probability: $P(D) \cdot P(T|D) = 0.01 \times 0.99 = 0.0099$

Branch 2: Has disease → Tests negative
- Probability: $P(D) \cdot P(T^c|D) = 0.01 \times 0.01 = 0.0001$

Branch 3: No disease → Tests positive
- Probability: $P(D^c) \cdot P(T|D^c) = 0.99 \times 0.02 = 0.0198$

Branch 4: No disease → Tests negative
- Probability: $P(D^c) \cdot P(T^c|D^c) = 0.99 \times 0.98 = 0.9702$

Total probability of testing positive:
$$P(T) = 0.0099 + 0.0198 = 0.0297 \approx 2.97\%$$

## Partition Theorem (Law of Total Probability)

If $B_1, B_2, \ldots, B_n$ form a partition of the sample space $S$ (mutually exclusive and exhaustive), then for any event $A$:

$$P(A) = \sum_{i=1}^{n} P(A|B_i) \cdot P(B_i)$$

**Proof**: Since the $B_i$ partition $S$:
$$A = A \cap S = A \cap (B_1 \cup B_2 \cup \cdots \cup B_n) = (A \cap B_1) \cup (A \cap B_2) \cup \cdots \cup (A \cap B_n)$$

These intersections are mutually exclusive, so:
$$P(A) = \sum_{i=1}^{n} P(A \cap B_i) = \sum_{i=1}^{n} P(B_i) \cdot P(A|B_i)$$

### Example 7: Manufacturing Process

**Problem**: A product is manufactured at three plants:
- Plant A produces 50% of items with 2% defective rate
- Plant B produces 30% of items with 3% defective rate
- Plant C produces 20% of items with 4% defective rate

What is the probability a randomly selected item is defective?

**Solution**:
Let $D$ = defective, $A, B, C$ = from respective plants.

$$P(D) = P(D|A) \cdot P(A) + P(D|B) \cdot P(B) + P(D|C) \cdot P(C)$$
$$= 0.02 \times 0.50 + 0.03 \times 0.30 + 0.04 \times 0.20$$
$$= 0.010 + 0.009 + 0.008 = 0.027 = 2.7\%$$

## Worked Problem: Insurance Claims

**Problem**: An insurance company classifies drivers as low-risk (60%), medium-risk (30%), or high-risk (10%). The probability of filing a claim in a year is:
- Low-risk: 5%
- Medium-risk: 15%
- High-risk: 30%

(a) What is the probability a randomly selected driver files a claim?
(b) If a driver files a claim, what is the probability they are high-risk? (This will be answered using Bayes' theorem in a later section)

**Solution**:

(a) Let $C$ = files claim, $L, M, H$ = risk levels.

$$P(C) = P(C|L) \cdot P(L) + P(C|M) \cdot P(M) + P(C|H) \cdot P(H)$$
$$= 0.05 \times 0.60 + 0.15 \times 0.30 + 0.30 \times 0.10$$
$$= 0.030 + 0.045 + 0.030 = 0.105 = 10.5\%$$

## Conditional Probability and Venn Diagrams

In a Venn diagram, $P(A|B)$ represents the fraction of region $B$ that overlaps with $A$. The conditioning effectively makes $B$ the new "universe," and we measure $A$ relative to this reduced universe.

## Common Misconceptions

### Misconception 1: $P(A|B) = P(B|A)$

These are generally different! For example:
- $P(\text{rain}|\text{clouds})$ is high
- $P(\text{clouds}|\text{rain})$ is essentially 1
- But they are not equal

### Misconception 2: Assuming Independence

Do not assume $P(A|B) = P(A)$ unless you know $A$ and $B$ are independent (covered in the next section).

## Summary

Conditional probability quantifies how information affects probabilities. The key formulas are:

- **Definition**: $P(A|B) = \frac{P(A \cap B)}{P(B)}$
- **Multiplication Rule**: $P(A \cap B) = P(A) \cdot P(B|A) = P(B) \cdot P(A|B)$
- **Law of Total Probability**: $P(A) = \sum_i P(A|B_i) \cdot P(B_i)$ for a partition $\{B_i\}$

Understanding conditional probability is essential for Bayes' theorem, independence, and many applications in statistics and machine learning.
