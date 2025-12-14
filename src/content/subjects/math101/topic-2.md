## Introduction

A mathematical proof is a logical argument that demonstrates the truth of a statement beyond any doubt. Unlike science, which relies on empirical evidence, mathematics relies on deductive reasoning. This topic covers the standard toolbox of techniques used to prove theorems.

**Why This Matters:**
Proof techniques are fundamental to mathematics and computer science. They're used to verify algorithm correctness, establish security properties, and ensure software reliability. Learning to construct and read proofs develops precise thinking that applies far beyond mathematics.

**Learning Objectives:**
- Construct Direct Proofs
- Use Proof by Contrapositive
- Use Proof by Contradiction
- Apply Mathematical Induction
- Disprove statements using Counterexamples

---

## Core Concepts

### The Structure of a Proof

Every proof has:
1. **Statement:** What you're trying to prove (often "If P, then Q")
2. **Assumptions:** What you're allowed to take as true
3. **Logical steps:** Chain of implications from assumptions to conclusion
4. **Conclusion:** The statement you've proven

### Direct Proof

Assume the hypothesis $P$ is true, then use axioms, definitions, and logical steps to show the conclusion $Q$ is true.

**Template:**
1. Assume $P$ is true
2. Use definitions and known results
3. Derive $Q$ through logical steps
4. Conclude $P \to Q$

**Example:** Prove that if $n$ is an even integer, then $n^2$ is even.

*Proof:*
1. Assume $n$ is even.
2. By definition of even, $n = 2k$ for some integer $k$.
3. Then $n^2 = (2k)^2 = 4k^2 = 2(2k^2)$.
4. Since $2k^2$ is an integer, $n^2 = 2m$ where $m = 2k^2$.
5. By definition of even, $n^2$ is even. $\square$

### Proof by Contrapositive

Instead of proving $P \to Q$ directly, prove the logically equivalent $\neg Q \to \neg P$.

**Why use it?** Sometimes starting from $\neg Q$ gives you more to work with.

**Template:**
1. State the contrapositive: $\neg Q \to \neg P$
2. Assume $\neg Q$ is true
3. Derive $\neg P$
4. Conclude $P \to Q$ (since contrapositive is equivalent)

**Example:** Prove that if $n^2$ is even, then $n$ is even.

*Proof:*
1. Contrapositive: If $n$ is odd, then $n^2$ is odd.
2. Assume $n$ is odd. Then $n = 2k + 1$ for some integer $k$.
3. $n^2 = (2k+1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1$.
4. This is of the form $2m + 1$, so $n^2$ is odd.
5. By contrapositive, if $n^2$ is even, then $n$ is even. $\square$

### Proof by Contradiction

Assume the statement is False, and derive a logical contradiction.

**Template:**
1. Assume $\neg S$ (the statement is false)
2. Use logical reasoning
3. Arrive at a contradiction ($P \land \neg P$ or something impossible like $1 = 0$)
4. Conclude $S$ must be true

**Example:** Prove $\sqrt{2}$ is irrational.

*Proof:*
1. Assume $\sqrt{2}$ is rational. Then $\sqrt{2} = \frac{a}{b}$ where $a, b$ are integers with no common factors.
2. Squaring: $2 = \frac{a^2}{b^2}$, so $a^2 = 2b^2$.
3. Thus $a^2$ is even, so $a$ is even (by contrapositive of previous example).
4. Let $a = 2c$. Then $(2c)^2 = 2b^2$, so $4c^2 = 2b^2$, thus $b^2 = 2c^2$.
5. Thus $b^2$ is even, so $b$ is even.
6. **Contradiction:** Both $a$ and $b$ are even, so they share factor 2. But we assumed no common factors!
7. Therefore $\sqrt{2}$ is irrational. $\square$

### Mathematical Induction

Used to prove statements about all natural numbers: $P(n)$ for all $n \geq n_0$.

**Template:**
1. **Base Case:** Prove $P(n_0)$ is true (usually $n_0 = 0$ or $1$)
2. **Inductive Step:** Assume $P(k)$ is true (Inductive Hypothesis). Prove $P(k+1)$ is true.
3. **Conclusion:** By induction, $P(n)$ is true for all $n \geq n_0$

**Example:** Prove $\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$ for all $n \geq 1$.

*Proof:*

**Base Case ($n = 1$):**
- LHS: $\sum_{i=1}^{1} i = 1$
- RHS: $\frac{1(1+1)}{2} = 1$
- LHS = RHS ✓

**Inductive Step:**
- Assume $\sum_{i=1}^{k} i = \frac{k(k+1)}{2}$ for some $k \geq 1$ (Inductive Hypothesis)
- Prove: $\sum_{i=1}^{k+1} i = \frac{(k+1)(k+2)}{2}$

$$\sum_{i=1}^{k+1} i = \sum_{i=1}^{k} i + (k+1)$$
$$= \frac{k(k+1)}{2} + (k+1) \quad \text{(by IH)}$$
$$= \frac{k(k+1) + 2(k+1)}{2}$$
$$= \frac{(k+1)(k+2)}{2} \quad \square$$

### Disproof by Counterexample

To disprove "For all $x$, $P(x)$," find ONE $x$ where $P(x)$ is false.

**Example:** Disprove "All prime numbers are odd."

*Counterexample:* 2 is prime and even. $\square$

---

## Common Patterns and Idioms

### "Without Loss of Generality" (WLOG)
Used when cases are symmetric. Prove one case, state others follow by symmetry.

*"WLOG, assume $a \leq b$..."*

### Existence and Uniqueness
To prove "there exists a unique $x$ such that $P(x)$":
1. **Existence:** Show at least one $x$ satisfying $P(x)$
2. **Uniqueness:** Assume two solutions $x$ and $y$, prove $x = y$

### Proof by Cases
Split into exhaustive cases, prove each separately.

*Example:* Prove $n^2 \geq n$ for all integers $n$.

*Cases:* $n < 0$, $n = 0$, $n = 1$, $n > 1$. (Prove each.)

### Strong Induction
In the inductive step, assume $P(1), P(2), \ldots, P(k)$ are ALL true, then prove $P(k+1)$.

Useful when $P(k+1)$ depends on multiple previous cases, not just $P(k)$.

---

## Common Mistakes and Debugging

### Mistake 1: Proving by Example
Showing a statement works for $n = 1, 2, 3$ does NOT prove it for all $n$.

*Counterexample to false generalization:* $n^2 - n + 41$ is prime for $n = 0$ to $39$, but $40^2 - 40 + 41 = 41^2$ is composite.

### Mistake 2: Circular Reasoning
Using the statement you're proving as a step in its own proof.

*Wrong:* "Assume $a = b$. Then clearly $a = b$." ✗

### Mistake 3: Assuming What You're Proving
In direct proofs, you assume the *hypothesis*, not the *conclusion*.

### Mistake 4: Forgetting the Base Case
An inductive proof without a base case proves nothing. The base case is the foundation.

### Mistake 5: Weak Inductive Hypothesis
Make sure your inductive hypothesis is exactly the statement you're proving, not a weaker version.

---

## Best Practices

1. **Start with what you know:** Write down all definitions and given information.

2. **Work both directions:** Try to work forward from assumptions AND backward from what you need to prove.

3. **Be explicit:** State every step and justify it. "By definition of..." or "By the inductive hypothesis..."

4. **Check boundary cases:** Test your proof with small values or edge cases.

5. **Read other proofs:** Exposure to well-written proofs builds intuition for proof structure.

6. **If stuck, try contrapositive or contradiction:** These often provide fresh perspectives.

---

## Real-World Applications

**Algorithm Correctness:**
Loop invariants are proved using induction—showing a property holds before the loop, is maintained by each iteration, and implies the desired result after.

**Cryptography:**
Security proofs often use contradiction: "If an adversary could break this system, they could solve a known hard problem."

**Type Systems:**
Programming language type systems use induction to prove "well-typed programs don't go wrong."

**Hardware Verification:**
Circuits are verified using formal proofs that the implementation matches the specification.

---

## Summary

- **Direct Proof:** Assume $P$, derive $Q$ through logical steps.
- **Contrapositive:** Prove $\neg Q \to \neg P$ instead of $P \to Q$.
- **Contradiction:** Assume $\neg S$, derive a contradiction, conclude $S$.
- **Induction:** Base case + inductive step proves statements for all natural numbers.
- **Counterexample:** One example is enough to disprove a universal statement.

---

## Further Exploration

- **Well-Founded Induction:** Generalization of induction to arbitrary well-ordered sets.
- **Structural Induction:** Induction on recursively defined structures (trees, lists).
- **Proof Assistants:** Software like Coq, Lean, and Isabelle that verify proofs mechanically.
- **The Pigeonhole Principle:** A powerful proof technique: if $n+1$ objects go into $n$ boxes, some box has at least 2.
