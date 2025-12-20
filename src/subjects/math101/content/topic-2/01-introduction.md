---
id: math101-t2-intro
title: "Introduction to Proof Techniques"
order: 1
---

# Introduction to Proof Techniques

## What is a Mathematical Proof?

A **proof** is a logical argument that establishes the truth of a mathematical statement beyond any doubt. Unlike scientific evidence, which can only support a hypothesis, a mathematical proof provides absolute certainty—once proven, a theorem is true forever.

A proof consists of:
1. **Premises** or **axioms**: Statements assumed to be true
2. **Logical steps**: Each step follows logically from previous steps or premises
3. **Conclusion**: The statement being proven

## Why Do We Need Proofs?

### 1. Certainty Over Intuition

Mathematical intuition can be wrong. Consider: "Is 0.999... = 1?"

Many people intuit "no," but a proof shows they are exactly equal:
- Let x = 0.999...
- Then 10x = 9.999...
- So 10x - x = 9
- Therefore x = 1

### 2. Universal Truth

A proven theorem is true in all cases, not just the ones we've tested. Testing can never prove a universal statement—we'd need infinite tests. But a proof establishes truth for all cases at once.

### 3. Foundation for Further Work

Mathematics builds on itself. Theorems become stepping stones for more complex results. Without proofs, we couldn't trust this foundation.

### 4. Understanding "Why"

Proofs don't just tell us that something is true—they explain why it's true. This deeper understanding often leads to new insights and generalizations.

## Statements That Require Proof

### Theorems
Major mathematical results that have been proven. Examples:
- Pythagorean Theorem
- Fundamental Theorem of Calculus
- Fermat's Last Theorem

### Lemmas
Smaller results used as stepping stones to prove larger theorems.

### Corollaries
Results that follow directly from a theorem with little additional proof needed.

### Propositions
Medium-sized results, less significant than theorems but more than lemmas.

### Conjectures
Statements believed to be true but not yet proven (e.g., Goldbach's Conjecture: every even integer > 2 is the sum of two primes).

## Types of Statements to Prove

Most mathematical statements fall into these categories:

### Universal Statements
"For all x in set S, property P holds."
- Notation: ∀x ∈ S, P(x)
- Example: "All even numbers are divisible by 2"
- Requires: Proof that works for any element of S

### Existential Statements
"There exists some x in S with property P."
- Notation: ∃x ∈ S such that P(x)
- Example: "There exists a prime number greater than 100"
- Requires: Finding one specific example

### Conditional Statements (Implications)
"If P, then Q."
- Notation: P → Q
- Example: "If n² is even, then n is even"
- Most theorems are stated this way

### Biconditional Statements
"P if and only if Q."
- Notation: P ↔ Q
- Requires: Proof of both P → Q and Q → P

## The Structure of a Proof

A typical proof follows this structure:

1. **State what you're proving**: "Theorem: For all integers n, if n² is even, then n is even."

2. **State your assumptions**: "Let n be an integer such that n² is even."

3. **Proceed logically**: Each step must follow from previous steps, definitions, or known theorems.

4. **Reach the conclusion**: "Therefore, n is even."

5. **Signal completion**: "QED" (quod erat demonstrandum), "□", or "∎"

## Proof Techniques Overview

Different statements require different proof techniques:

| Technique | Best For |
|-----------|----------|
| **Direct Proof** | Showing P → Q by assuming P and deriving Q |
| **Contrapositive** | P → Q when showing ¬Q → ¬P is easier |
| **Contradiction** | Proving P by showing ¬P leads to impossibility |
| **Induction** | Statements about all natural numbers |
| **Cases** | When dividing into exhaustive scenarios helps |
| **Construction** | Existence proofs (finding an example) |
| **Counterexample** | Disproving universal statements |

## What Makes a Proof Valid?

A valid proof must:

1. **Start from true premises**: Axioms, definitions, or previously proven results
2. **Use valid logical rules**: Each step must follow logically
3. **Cover all cases**: No gaps or unstated assumptions
4. **Reach the desired conclusion**: The final statement is what we wanted to prove

## Common Proof Writing Conventions

### Language
- Use "we" (editorial we) or impersonal constructions
- "Let x be..." to introduce variables
- "Suppose..." for assumptions
- "Then...", "Therefore...", "Thus..." for conclusions

### Structure
- State the theorem clearly first
- Make your proof technique explicit ("Proof by contradiction...")
- End with a clear conclusion and symbol (□ or QED)

### Examples
- Include concrete examples to illustrate abstract arguments
- But remember: examples don't prove universal statements!

## Looking Ahead

In this topic, you'll master the essential proof techniques:

1. **Direct Proof**: The most straightforward approach
2. **Proof by Contrapositive**: When negatives are easier
3. **Proof by Contradiction**: When impossibility is the key
4. **Mathematical Induction**: The domino effect for integers
5. **Strong Induction**: When you need more than the previous case
6. **Proof by Cases**: Divide and conquer
7. **Existence and Counterexample**: Finding witnesses

Each technique is a tool in your mathematical toolkit. Knowing which tool to use—and when—is the art of mathematical proof.
