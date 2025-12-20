---
title: "Probability Basics"
slug: "probability-basics"
description: "Foundational probability theory for AI, including axioms, conditional probability, Bayes' theorem, and random variables"
---

# Probability Basics

Probability theory forms the mathematical foundation for reasoning under uncertainty in artificial intelligence. Unlike classical logic, which deals with absolute truth values, probabilistic reasoning allows AI systems to make decisions based on partial information, noisy observations, and uncertain predictions. This capability is essential for real-world applications where complete information is rarely available.

## Introduction to Probability Theory

Probability theory provides a rigorous framework for quantifying uncertainty. At its core, probability assigns numerical values between 0 and 1 to events, where 0 represents impossibility and 1 represents certainty. The mathematical foundations rest on three fundamental axioms that govern all probabilistic calculations.

**Kolmogorov's Axioms:**
1. **Non-negativity**: For any event $A$, $P(A) \geq 0$
2. **Normalization**: The probability of the entire sample space is $P(\Omega) = 1$
3. **Additivity**: For mutually exclusive events $A$ and $B$, $P(A \cup B) = P(A) + P(B)$

From these axioms, we can derive important properties such as $P(\neg A) = 1 - P(A)$ and the general addition rule: $P(A \cup B) = P(A) + P(B) - P(A \cap B)$.

## Conditional Probability

Conditional probability captures how our beliefs about one event should change when we learn about another event. The conditional probability of $A$ given $B$ is defined as:

$$P(A|B) = \frac{P(A \cap B)}{P(B)}$$

This formula tells us how to update the probability of event $A$ when we know that event $B$ has occurred. For example, if we want to know the probability that a patient has a disease given that they tested positive, we use conditional probability.

**Chain Rule:**

The chain rule allows us to decompose joint probabilities into conditional probabilities:

$$P(A_1, A_2, ..., A_n) = P(A_1) \cdot P(A_2|A_1) \cdot P(A_3|A_1, A_2) \cdot ... \cdot P(A_n|A_1, ..., A_{n-1})$$

This is fundamental for building probabilistic models in AI, as it breaks down complex joint distributions into manageable conditional components.

## Bayes' Theorem

Bayes' theorem is perhaps the most important result in probabilistic AI. It provides a principled way to update beliefs in light of new evidence:

$$P(H|E) = \frac{P(E|H) \cdot P(H)}{P(E)}$$

Where:
- $P(H|E)$ is the **posterior probability** (belief after seeing evidence)
- $P(E|H)$ is the **likelihood** (how well the hypothesis explains the evidence)
- $P(H)$ is the **prior probability** (initial belief)
- $P(E)$ is the **marginal likelihood** or evidence

The denominator can be expanded using the law of total probability:

$$P(E) = \sum_{i} P(E|H_i) \cdot P(H_i)$$

**Example Application:**

Consider medical diagnosis. Let $D$ represent having a disease and $T$ represent testing positive:

```python
# Medical diagnosis using Bayes' theorem
def bayesian_diagnosis(prior_disease, sensitivity, specificity, test_positive):
    """
    Calculate probability of disease given test result.

    Args:
        prior_disease: P(D) - prior probability of disease
        sensitivity: P(T|D) - true positive rate
        specificity: P(~T|~D) - true negative rate
        test_positive: Whether test came back positive

    Returns:
        Posterior probability of having disease
    """
    if test_positive:
        # P(D|T) = P(T|D) * P(D) / P(T)
        p_test = sensitivity * prior_disease + (1 - specificity) * (1 - prior_disease)
        posterior = (sensitivity * prior_disease) / p_test
    else:
        # P(D|~T) = P(~T|D) * P(D) / P(~T)
        p_no_test = (1 - sensitivity) * prior_disease + specificity * (1 - prior_disease)
        posterior = ((1 - sensitivity) * prior_disease) / p_no_test

    return posterior

# Example: Rare disease with accurate test
prior = 0.01  # 1% of population has disease
sensitivity = 0.95  # 95% true positive rate
specificity = 0.90  # 90% true negative rate

p_disease_given_positive = bayesian_diagnosis(prior, sensitivity, specificity, True)
print(f"Probability of disease given positive test: {p_disease_given_positive:.3f}")
# Output: 0.087 (only 8.7% despite positive test!)
```

This example illustrates the base rate fallacy - even with an accurate test, a positive result might not be highly diagnostic if the disease is rare.

## Independence

Two events $A$ and $B$ are independent if knowing one provides no information about the other:

$$P(A|B) = P(A) \quad \text{or equivalently} \quad P(A \cap B) = P(A) \cdot P(B)$$

**Conditional Independence:**

More useful in AI is conditional independence. Events $A$ and $B$ are conditionally independent given $C$ if:

$$P(A, B|C) = P(A|C) \cdot P(B|C)$$

This concept is crucial for Bayesian networks, where we exploit conditional independence to simplify complex probability distributions.

## Random Variables and Distributions

A random variable is a function that maps outcomes to numerical values. Random variables can be:

**Discrete Random Variables:**
- Take on countable values
- Described by probability mass function (PMF): $P(X = x)$
- Example: Number of defects in manufactured products

**Continuous Random Variables:**
- Take on uncountably infinite values
- Described by probability density function (PDF): $f_X(x)$
- Probability found by integration: $P(a \leq X \leq b) = \int_a^b f_X(x) dx$

**Common Distributions:**

1. **Bernoulli Distribution**: Models binary outcomes
   - $P(X = 1) = p$, $P(X = 0) = 1-p$

2. **Binomial Distribution**: Number of successes in $n$ trials
   - $P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$

3. **Gaussian (Normal) Distribution**: Continuous bell curve
   - $f(x) = \frac{1}{\sqrt{2\pi\sigma^2}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}$

```python
import numpy as np
from scipy import stats
import matplotlib.pyplot as plt

# Working with probability distributions
def demonstrate_distributions():
    """Show common probability distributions."""

    # Bernoulli distribution (coin flip)
    bernoulli = stats.bernoulli(p=0.6)
    print(f"P(X=1) for Bernoulli(0.6): {bernoulli.pmf(1):.2f}")

    # Binomial distribution (10 coin flips)
    binomial = stats.binom(n=10, p=0.6)
    print(f"P(X=6) for Binomial(10, 0.6): {binomial.pmf(6):.3f}")

    # Gaussian distribution
    gaussian = stats.norm(loc=0, scale=1)
    print(f"P(-1 <= X <= 1) for N(0,1): {gaussian.cdf(1) - gaussian.cdf(-1):.3f}")

    # Sample from distribution
    samples = gaussian.rvs(size=1000)
    return samples

demonstrate_distributions()
```

## Expected Value and Variance

The expected value (mean) of a random variable represents its long-run average:

**Discrete:** $E[X] = \sum_x x \cdot P(X = x)$

**Continuous:** $E[X] = \int_{-\infty}^{\infty} x \cdot f_X(x) dx$

Variance measures spread around the mean:

$$\text{Var}(X) = E[(X - E[X])^2] = E[X^2] - (E[X])^2$$

These moments are essential for characterizing probability distributions and making predictions.

## Key Takeaways

1. **Probability axioms** provide the mathematical foundation for reasoning under uncertainty in AI systems
2. **Conditional probability** allows us to update beliefs based on observed evidence
3. **Bayes' theorem** is the cornerstone of probabilistic inference, enabling rational belief updating
4. **Independence and conditional independence** simplify complex probability models by reducing the number of parameters needed
5. **Random variables and distributions** provide the mathematical tools to model uncertain quantities
6. Understanding the **base rate fallacy** is crucial - rare events remain unlikely even after positive evidence
7. **Expected value and variance** summarize the central tendency and spread of probability distributions

Mastering these probability basics is essential for understanding advanced probabilistic AI techniques like Bayesian networks, hidden Markov models, and probabilistic graphical models. These foundations enable AI systems to reason rationally under uncertainty, make optimal decisions with incomplete information, and learn from data in principled ways.
