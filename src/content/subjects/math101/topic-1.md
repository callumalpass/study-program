## Introduction

Propositional logic is the bedrock of mathematical reasoning and computer science. It provides a formal language for representing knowledge and a system for precise deduction. In this topic, we explore how to construct complex logical statements from simple propositions and analyzing their truth values.

**Learning Objectives:**
- Identify propositions and logical connectives
- Construct and interpret truth tables
- Translate natural language sentences into logical expressions
- Verify logical equivalences using truth tables and algebraic laws
- Determine the validity of logical arguments
- Understand Tautologies, Contradictions, and Contingencies

---

## Core Concepts

### Propositions and Connectives

A **proposition** is a declarative statement that is either True ($T$) or False ($F$), but not both.

**Examples:**
- "Paris is in France." (True proposition)
- "2 + 2 = 5." (False proposition)
- "Close the door." (Not a proposition - it's a command)

We build compound propositions using logical operators (connectives):

| Connective | Name | Symbol | Meaning |
| :--- | :--- | :---: | :--- |
| **Negation** | NOT | $\neg p$ | Not $p$ |
| **Conjunction** | AND | $p \land q$ | $p$ and $q$ |
| **Disjunction** | OR | $p \lor q$ | $p$ or $q$ (inclusive) |
| **Implication** | IMPLIES | $p \to q$ | If $p$, then $q$ |
| **Biconditional** | IFF | $p \leftrightarrow q$ | $p$ if and only if $q$ |

### Truth Tables

Truth tables list all possible truth values for the variables in a proposition.

**Implication ($p \to q$):**
The statement "If it rains, I will bring an umbrella" is only false if it rains ($T$) but I *don't* bring an umbrella ($F$).

| $p$ | $q$ | $p \to q$ |
| :---: | :---: | :---: |
| T | T | T |
| T | F | F |
| F | T | T |
| F | F | T |

### Logical Equivalence

Two propositions are **logically equivalent** ($\equiv$) if they have the same truth values in all possible scenarios.

**Key Equivalences:**
- **De Morgan's Laws:**
  - $\neg(p \land q) \equiv \neg p \lor \neg q$
  - $\neg(p \lor q) \equiv \neg p \land \neg q$
- **Contrapositive:**
  - $p \to q \equiv \neg q \to \neg p$

---

## Common Patterns and Idioms

### Translating English to Logic

English is often ambiguous; logic is precise.
- "You can have soup or salad" usually means exclusive OR (XOR) in a restaurant context, but logical OR is inclusive.
- "$p$ is necessary for $q$" translates to $q \to p$.
- "$p$ is sufficient for $q$" translates to $p \to q$.

### Tautologies and Contradictions

- **Tautology:** A statement that is always true (e.g., $p \lor \neg p$).
- **Contradiction:** A statement that is always false (e.g., $p \land \neg p$).
- **Contingency:** A statement that is neither.

---

## Common Mistakes and Debugging

### Mistake 1: Confusing $\to$ with $\leftrightarrow$
"If it is a square, it is a rectangle" ($p \to q$) is true.
"If it is a rectangle, it is a square" ($q \to p$) is false.
They are not equivalent.

### Mistake 2: Negating Implications
The negation of "If $p$, then $q$" is NOT "If $p$, then not $q$".
It is "$p$ and not $q$".
$\neg(p \to q) \equiv p \land \neg q$

---

## Summary

- **Propositions** are the atoms of logic.
- **Truth tables** provide a rigorous method to verify truth values.
- **Logical equivalence** allows us to simplify complex expressions.
- **Implication** is the foundation of mathematical proof structures.
