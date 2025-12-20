# Propositions and Truth Values

## What is a Proposition?

A **proposition** is a declarative statement that is either True (T) or False (F), but not both and not neither. This binary nature is fundamental—every proposition must have exactly one of these two truth values.

### Examples of Propositions

**True Propositions:**
- "Paris is the capital of France."
- "2 + 2 = 4"
- "The Earth orbits the Sun."
- "7 is a prime number."

**False Propositions:**
- "The Earth is flat."
- "2 + 2 = 5"
- "All cats are dogs."
- "0 > 1"

Note that being false doesn't disqualify something from being a proposition. A proposition simply needs to be a declarative statement with a definite truth value.

**Context-Dependent Propositions:**
- "It is raining." (True or false depending on current weather)
- "The stock market is up today." (Depends on the day)
- "She is the president." (Depends on time and place)

These are still propositions because at any given moment, they have a definite truth value.

### What is NOT a Proposition

**Commands/Imperatives:**
- "Close the door." — This gives an instruction, not a statement of fact.
- "Please sit down." — A request, not a declaration.

**Questions:**
- "What time is it?" — Questions don't assert anything.
- "Is it raining?" — This asks, it doesn't declare.

**Exclamations:**
- "Wow!" — Expresses emotion, not a truth claim.
- "Ouch!" — An interjection.

**Statements with Free Variables:**
- "x > 5" — This is a **predicate**, not a proposition. Its truth value depends on what x is. If x = 10, it's true; if x = 3, it's false.
- "n is prime" — Without knowing what n is, we can't assign a truth value.

**Paradoxical Statements:**
- "This statement is false." — If it's true, then it must be false. If it's false, then it must be true. This is the **Liar's Paradox** and is not a valid proposition because it cannot be assigned a consistent truth value.

## Propositional Variables

In propositional logic, we use variables (typically lowercase letters like p, q, r, s) to represent propositions. This abstraction lets us study the structure of logical arguments regardless of their specific content.

For example:
- Let p = "It is raining"
- Let q = "I will bring an umbrella"

We can then analyze statements like "If p, then q" without needing to know the specific propositions.

### Variable Naming Conventions

| Symbol | Common Uses |
|--------|-------------|
| p, q, r, s | Generic propositions |
| P, Q, R | Sometimes used for predicates |
| A, B, C | Often used when discussing sets or specific statements |

## Truth Values

Every proposition has exactly one **truth value**: either **True (T)** or **False (F)**.

### Notation

Different textbooks use different notations:

| True | False |
|------|-------|
| T | F |
| 1 | 0 |
| ⊤ | ⊥ |
| true | false |

We'll primarily use T and F, but in digital logic and programming, 1 and 0 are common.

### The Principle of Bivalence

Propositional logic assumes the **Principle of Bivalence**: every proposition is either true or false, with no middle ground. This is also called the **Law of the Excluded Middle**.

In symbols: for any proposition p, either p or ¬p is true.

This might seem obvious, but some alternative logical systems (like fuzzy logic or many-valued logic) relax this assumption to handle uncertainty or partial truth.

## Atomic vs. Compound Propositions

**Atomic Propositions** (also called **simple propositions**) cannot be broken down into simpler propositions. They are the building blocks:
- "The sky is blue."
- "5 > 3"
- "Alice passed the exam."

**Compound Propositions** are built from atomic propositions using logical connectives:
- "The sky is blue AND the grass is green."
- "Either it will rain OR it will snow."
- "If you study, then you will pass."

The truth value of a compound proposition depends entirely on:
1. The truth values of its component atomic propositions
2. The logical connectives used to combine them

This is the key insight that makes propositional logic tractable: we can determine the truth of complex statements by analyzing their structure.

## Determining Truth Values

To determine whether something is a proposition and find its truth value:

1. **Is it a declarative statement?** Commands, questions, and exclamations are not propositions.

2. **Does it have a definite truth value?** If the truth depends on unspecified variables, it's a predicate, not a proposition.

3. **Is it self-consistent?** Paradoxical statements are not valid propositions.

4. **What is the actual truth value?** This may require world knowledge (for statements about facts) or calculation (for mathematical statements).

### Practice Examples

Determine whether each is a proposition and, if so, its truth value:

1. "The Eiffel Tower is in London." → Proposition, False
2. "Stop talking!" → Not a proposition (command)
3. "Is 7 prime?" → Not a proposition (question)
4. "x² = 4" → Not a proposition (free variable)
5. "Every even number greater than 2 can be expressed as the sum of two primes." → Proposition (Goldbach's Conjecture, unproven but either true or false)
6. "This sentence has five words." → Proposition, True

## Summary

- A **proposition** is a declarative statement with a definite truth value (T or F)
- Commands, questions, and statements with free variables are NOT propositions
- **Propositional variables** (p, q, r...) represent arbitrary propositions
- **Atomic propositions** are indivisible; **compound propositions** are built using connectives
- The **Principle of Bivalence** states every proposition is either true or false

Understanding what constitutes a proposition is the first step. Next, we'll learn how to combine propositions using logical connectives.
