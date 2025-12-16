# Probability Axioms and Basic Rules

## Introduction

While our intuitive understanding of probability is important, a rigorous mathematical treatment requires formal axioms. These axioms, formulated by Andrey Kolmogorov in 1933, provide the foundation for all of probability theory. From just three simple axioms, we can derive all the rules and properties of probability.

## The Axioms of Probability

Let $S$ be a sample space and let $\mathcal{F}$ be the collection of events (subsets of $S$). A **probability function** $P$ assigns to each event $A$ a number $P(A)$, called the probability of $A$, satisfying the following axioms:

### Axiom 1: Non-negativity
For any event $A$:
$$P(A) \geq 0$$

Probabilities cannot be negative.

### Axiom 2: Normalization
For the sample space $S$:
$$P(S) = 1$$

The probability that some outcome occurs is 1 (certainty).

### Axiom 3: Countable Additivity
For any countable sequence of **mutually exclusive** events $A_1, A_2, A_3, \ldots$ (meaning $A_i \cap A_j = \emptyset$ for $i \neq j$):
$$P\left(\bigcup_{i=1}^{\infty} A_i\right) = \sum_{i=1}^{\infty} P(A_i)$$

For disjoint events, the probability of their union equals the sum of their individual probabilities.

## Immediate Consequences of the Axioms

### Probability of the Empty Set
$$P(\emptyset) = 0$$

**Proof**: Let $A_1 = \emptyset$ and $A_i = \emptyset$ for all $i \geq 1$. These are mutually exclusive. By Axiom 3:
$$P(\emptyset) = P\left(\bigcup_{i=1}^{\infty} \emptyset\right) = \sum_{i=1}^{\infty} P(\emptyset)$$

This infinite sum equals $P(\emptyset)$ only if $P(\emptyset) = 0$.

### Finite Additivity
For mutually exclusive events $A_1, A_2, \ldots, A_n$:
$$P(A_1 \cup A_2 \cup \cdots \cup A_n) = P(A_1) + P(A_2) + \cdots + P(A_n)$$

### Range of Probabilities
For any event $A$:
$$0 \leq P(A) \leq 1$$

**Proof**: By Axiom 1, $P(A) \geq 0$. Since $A$ and $A^c$ are mutually exclusive and $A \cup A^c = S$:
$$P(A) + P(A^c) = P(S) = 1$$
Therefore, $P(A) = 1 - P(A^c) \leq 1$.

## The Complement Rule

For any event $A$:
$$P(A^c) = 1 - P(A)$$

**Proof**: Since $A$ and $A^c$ partition $S$:
$$P(A \cup A^c) = P(S) = 1$$
$$P(A) + P(A^c) = 1$$
$$P(A^c) = 1 - P(A)$$

### Example 1: Using the Complement

**Problem**: The probability that it rains tomorrow is 0.3. What is the probability that it does not rain?

**Solution**:
$$P(\text{no rain}) = 1 - P(\text{rain}) = 1 - 0.3 = 0.7$$

### Example 2: At Least One Success

**Problem**: When flipping a fair coin 3 times, what is the probability of getting at least one heads?

**Solution**: It's easier to compute the complement (no heads = all tails):
$$P(\text{at least one H}) = 1 - P(\text{all T}) = 1 - \left(\frac{1}{2}\right)^3 = 1 - \frac{1}{8} = \frac{7}{8}$$

## The Addition Rule

For any two events $A$ and $B$ (not necessarily mutually exclusive):
$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

**Proof**: We can write $A \cup B$ as a union of disjoint events:
$$A \cup B = A \cup (B \cap A^c)$$

These are disjoint, so:
$$P(A \cup B) = P(A) + P(B \cap A^c)$$

Also, $B = (B \cap A) \cup (B \cap A^c)$, which are disjoint:
$$P(B) = P(B \cap A) + P(B \cap A^c)$$
$$P(B \cap A^c) = P(B) - P(B \cap A) = P(B) - P(A \cap B)$$

Substituting:
$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

### Example 3: Card Drawing

**Problem**: What is the probability of drawing a heart or a face card from a standard deck?

**Solution**:
- $P(\text{heart}) = \frac{13}{52}$
- $P(\text{face card}) = \frac{12}{52}$
- $P(\text{heart and face}) = \frac{3}{52}$ (J♥, Q♥, K♥)

$$P(\text{heart or face}) = \frac{13}{52} + \frac{12}{52} - \frac{3}{52} = \frac{22}{52} = \frac{11}{26}$$

### Special Case: Mutually Exclusive Events

If $A$ and $B$ are mutually exclusive ($A \cap B = \emptyset$), then:
$$P(A \cup B) = P(A) + P(B)$$

This is a special case of Axiom 3.

## General Addition Rule for Three Events

For events $A$, $B$, and $C$:
$$P(A \cup B \cup C) = P(A) + P(B) + P(C)$$
$$- P(A \cap B) - P(A \cap C) - P(B \cap C)$$
$$+ P(A \cap B \cap C)$$

This follows the inclusion-exclusion principle.

### Example 4: Three Event Addition

**Problem**: In a class of 30 students:
- 15 play basketball ($B$)
- 12 play soccer ($S$)
- 10 play tennis ($T$)
- 6 play both basketball and soccer
- 4 play both basketball and tennis
- 3 play both soccer and tennis
- 2 play all three sports

What is the probability a randomly selected student plays at least one sport?

**Solution**:
$$P(B \cup S \cup T) = \frac{15 + 12 + 10 - 6 - 4 - 3 + 2}{30} = \frac{26}{30} = \frac{13}{15}$$

## Difference Rule

For any events $A$ and $B$:
$$P(A - B) = P(A \cap B^c) = P(A) - P(A \cap B)$$

**Proof**: We can write $A$ as a union of disjoint events:
$$A = (A \cap B) \cup (A \cap B^c)$$
$$P(A) = P(A \cap B) + P(A \cap B^c)$$
$$P(A \cap B^c) = P(A) - P(A \cap B)$$

### Example 5: Probability Difference

**Problem**: If $P(A) = 0.7$ and $P(A \cap B) = 0.4$, find $P(A \cap B^c)$.

**Solution**:
$$P(A \cap B^c) = P(A) - P(A \cap B) = 0.7 - 0.4 = 0.3$$

## Monotonicity

If $A \subseteq B$, then:
$$P(A) \leq P(B)$$

**Proof**: If $A \subseteq B$, then $B = A \cup (B \cap A^c)$, which is a union of disjoint events:
$$P(B) = P(A) + P(B \cap A^c) \geq P(A)$$

since $P(B \cap A^c) \geq 0$ by Axiom 1.

## Bonferroni's Inequality

For any events $A$ and $B$:
$$P(A \cap B) \geq P(A) + P(B) - 1$$

**Proof**: From the addition rule:
$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

Since $P(A \cup B) \leq 1$:
$$P(A) + P(B) - P(A \cap B) \leq 1$$
$$P(A \cap B) \geq P(A) + P(B) - 1$$

## Boole's Inequality (Union Bound)

For any events $A_1, A_2, \ldots, A_n$ (not necessarily disjoint):
$$P\left(\bigcup_{i=1}^{n} A_i\right) \leq \sum_{i=1}^{n} P(A_i)$$

This provides an upper bound on the probability of a union.

### Example 6: Application of Union Bound

**Problem**: A system fails if any of 5 components fail. Each component has a 0.02 probability of failing. What is an upper bound on the system failure probability?

**Solution**:
$$P(\text{system fails}) = P(A_1 \cup A_2 \cup A_3 \cup A_4 \cup A_5) \leq \sum_{i=1}^{5} P(A_i) = 5 \times 0.02 = 0.10$$

The system failure probability is at most 10%.

## Equally Likely Outcomes

When all outcomes in a finite sample space are equally likely:
$$P(\{s\}) = \frac{1}{|S|}$$

for each outcome $s \in S$.

For any event $A$:
$$P(A) = \frac{|A|}{|S|} = \frac{\text{number of favorable outcomes}}{\text{total number of outcomes}}$$

### Example 7: Dice Rolling

**Problem**: What is the probability of rolling a sum of 7 with two fair dice?

**Solution**:
- Sample space size: $|S| = 6 \times 6 = 36$
- Favorable outcomes: $(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)$ → 6 outcomes

$$P(\text{sum is 7}) = \frac{6}{36} = \frac{1}{6}$$

## Worked Problem: Lottery Selection

**Problem**: A lottery requires selecting 6 numbers from 1 to 49. What is the probability of:
(a) Winning the jackpot (matching all 6 numbers)?
(b) Matching exactly 5 numbers?

**Solution**:

(a) Total possible tickets:
$$\binom{49}{6} = \frac{49!}{6! \cdot 43!} = 13,983,816$$

Probability of winning:
$$P(\text{jackpot}) = \frac{1}{13,983,816} \approx 7.15 \times 10^{-8}$$

(b) To match exactly 5 numbers:
- Choose 5 correct from 6 winning numbers: $\binom{6}{5} = 6$
- Choose 1 incorrect from 43 non-winning numbers: $\binom{43}{1} = 43$
- Total ways: $6 \times 43 = 258$

$$P(\text{exactly 5 matches}) = \frac{258}{13,983,816} \approx 1.85 \times 10^{-5}$$

## Summary

The three axioms of probability provide a rigorous foundation for probability theory. From these axioms, we derive essential rules including:
- Complement rule: $P(A^c) = 1 - P(A)$
- Addition rule: $P(A \cup B) = P(A) + P(B) - P(A \cap B)$
- Difference rule: $P(A - B) = P(A) - P(A \cap B)$

These rules, combined with counting principles, allow us to compute probabilities for complex events in a systematic way.
