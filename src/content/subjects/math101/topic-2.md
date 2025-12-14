## Introduction

A mathematical proof is a logical argument that demonstrates the truth of a statement beyond any doubt. Unlike science, which relies on empirical evidence, mathematics relies on deductive reasoning. This topic covers the standard toolbox of techniques used to prove theorems.

**Learning Objectives:**
- Construct Direct Proofs
- Use Proof by Contrapositive
- Use Proof by Contradiction
- Apply Mathematical Induction
- Disprove statements using Counterexamples

---

## Core Concepts

### Direct Proof
Assume the hypothesis $P$ is true, then use axioms, definitions, and logical steps to show the conclusion $Q$ is true.

*Example: Prove that if $n$ is an even integer, then $n^2$ is even.*
1. Assume $n$ is even. Then $n = 2k$ for some integer $k$.
2. Square both sides: $n^2 = (2k)^2 = 4k^2$.
3. Factor out 2: $n^2 = 2(2k^2)$.
4. Since $2k^2$ is an integer, $n^2$ is 2 times an integer.
5. Therefore, $n^2$ is even.

### Proof by Contrapositive
Instead of proving $P \to Q$, we prove the logically equivalent $\neg Q \to \neg P$.

*Example: Prove that if $n^2$ is even, then $n$ is even.*
1. Contrapositive: If $n$ is odd, then $n^2$ is odd.
2. Assume $n$ is odd: $n = 2k + 1$.
3. $n^2 = (2k+1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1$.
4. This is of the form $2m + 1$, so $n^2$ is odd.
5. Therefore, the original statement is true.

### Proof by Contradiction
Assume the statement is False, and deduce a logical contradiction (e.g., $1=0$ or $P \land \neg P$).

*Example: Prove $\sqrt{2}$ is irrational.*
1. Assume $\sqrt{2}$ is rational: $\sqrt{2} = a/b$ in lowest terms.
2. $2 = a^2/b^2 \implies a^2 = 2b^2$. So $a$ is even.
3. Let $a = 2k$. Then $(2k)^2 = 2b^2 \implies 4k^2 = 2b^2 \implies 2k^2 = b^2$.
4. So $b$ must also be even.
5. Contradiction! We assumed $a/b$ was in lowest terms, but both are divisible by 2.

### Mathematical Induction
Used to prove $P(n)$ for all natural numbers $n$.
1. **Base Case:** Show $P(0)$ or $P(1)$ is true.
2. **Inductive Step:** Assume $P(k)$ is true (Inductive Hypothesis). Show that $P(k+1)$ must be true.

---

## Common Patterns and Idioms

### "Without Loss of Generality" (WLOG)
Used when a proof has symmetric cases. Instead of proving all of them, you prove one and state that the others follow identically.

### Existence and Uniqueness
To prove "there exists a unique $x$":
1. **Existence:** Show at least one $x$ works.
2. **Uniqueness:** Assume two solutions $x$ and $y$ exist, then prove $x = y$.

---

## Common Mistakes and Debugging

### Mistake 1: Proving by Example
Showing a statement works for $n=1, 2, 3$ does NOT prove it for all $n$.
*Counterexample:* $n^2 + n + 41$ generates primes for $n=0$ to $39$, but fails at $n=40$.

### Mistake 2: Begging the Question (Circular Reasoning)
Using the statement you are trying to prove as a step in its own proof.

---

## Summary

- **Direct Proof:** The standard approach.
- **Contrapositive:** Good for "If... then..." when direct is hard.
- **Contradiction:** Powerful "last resort" technique.
- **Induction:** Essential for infinite sequences and recursive structures.
