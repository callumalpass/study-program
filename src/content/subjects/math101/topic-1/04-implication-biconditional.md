# Implication and Biconditional

## The Conditional (Implication) — →

The implication, or conditional, is perhaps the most important and most confusing connective. It captures the idea of "if... then..." statements.

### Notation

| Notation | Read As |
|----------|---------|
| p → q | "if p then q" |
| p ⇒ q | "p implies q" |
| p ⊃ q | "p implies q" |

In p → q:
- p is called the **hypothesis**, **antecedent**, or **premise**
- q is called the **conclusion** or **consequent**

### Truth Table

| p | q | p → q |
|:---:|:---:|:---:|
| T | T | **T** |
| T | F | **F** |
| F | T | **T** |
| F | F | **T** |

The implication is false in exactly one case: when the hypothesis is true but the conclusion is false.

### Understanding the Truth Table

The truth table for implication often puzzles students. Why is p → q true when p is false?

**Think of it as a promise:**

"If it rains (p), I will bring an umbrella (q)."

| Scenario | p (rain) | q (umbrella) | Promise broken? |
|----------|:--------:|:------------:|:---------------:|
| It rains, I bring umbrella | T | T | No — Promise kept |
| It rains, I don't bring umbrella | T | F | **Yes — Broken!** |
| It doesn't rain, I bring umbrella | F | T | No — Can't be broken |
| It doesn't rain, I don't bring umbrella | F | F | No — Can't be broken |

The promise is only broken when the condition occurs (it rains) AND I fail to deliver (no umbrella).

**Vacuous Truth:** When p is false, the implication is **vacuously true**. The promise was never tested, so it can't be broken.

- "If pigs fly, then I'm the Queen of England." — True! (Pigs don't fly, so the promise is untested.)
- "If 2 + 2 = 5, then the moon is made of cheese." — True! (The premise is false.)

### Common Ways to Express Implications

All of these are logically equivalent to p → q:

| English | Logic |
|---------|-------|
| "If p, then q" | p → q |
| "p implies q" | p → q |
| "p only if q" | p → q |
| "q if p" | p → q |
| "q whenever p" | p → q |
| "p is sufficient for q" | p → q |
| "q is necessary for p" | p → q |
| "q unless ¬p" | p → q |

### Related Statements

Given an implication p → q:

| Name | Form | Relationship |
|------|------|--------------|
| **Original** | p → q | — |
| **Converse** | q → p | NOT equivalent to original |
| **Inverse** | ¬p → ¬q | NOT equivalent to original |
| **Contrapositive** | ¬q → ¬p | **Equivalent to original** |

**Example:** "If it rains, the ground is wet." (p → q)

- **Converse:** "If the ground is wet, it rained." (Sprinklers could have made it wet!)
- **Inverse:** "If it doesn't rain, the ground isn't wet." (False for same reason)
- **Contrapositive:** "If the ground isn't wet, it didn't rain." (This IS equivalent!)

The contrapositive equivalence is extremely useful in proofs.

### Implication as Disjunction

An important equivalence:

$$p \to q \equiv \neg p \lor q$$

This makes sense: "If p then q" means "either p is false, or q is true (or both)."

| p | q | p → q | ¬p ∨ q |
|:---:|:---:|:---:|:---:|
| T | T | T | T |
| T | F | F | F |
| F | T | T | T |
| F | F | T | T |

The columns for p → q and ¬p ∨ q are identical!

## The Biconditional — ↔

The biconditional captures "if and only if" (often abbreviated "iff").

### Notation

| Notation | Read As |
|----------|---------|
| p ↔ q | "p if and only if q" |
| p ⇔ q | "p iff q" |
| p ≡ q | "p is equivalent to q" |

### Truth Table

| p | q | p ↔ q |
|:---:|:---:|:---:|
| T | T | **T** |
| T | F | F |
| F | T | F |
| F | F | **T** |

The biconditional is true when both sides have the **same truth value**.

### Understanding the Biconditional

p ↔ q means that p and q are logically equivalent—they're true in exactly the same situations and false in exactly the same situations.

**As a Two-Way Implication:**

$$p \leftrightarrow q \equiv (p \to q) \land (q \to p)$$

"p if and only if q" means "if p then q" AND "if q then p."

**Example:** "You pass the course if and only if you score at least 60%."

This means:
- If you score ≥60%, you pass (p → q)
- If you pass, you scored ≥60% (q → p)

Both directions must hold.

### Common Ways to Express Biconditionals

| English | Logic |
|---------|-------|
| "p if and only if q" | p ↔ q |
| "p iff q" | p ↔ q |
| "p is necessary and sufficient for q" | p ↔ q |
| "p is equivalent to q" | p ↔ q |
| "p exactly when q" | p ↔ q |

## Operator Precedence (Complete)

From highest to lowest binding:

1. ¬ (NOT)
2. ∧ (AND)
3. ∨ (OR)
4. → (IMPLIES)
5. ↔ (IFF) — binds loosest

So p ∨ q → r ∧ s means (p ∨ q) → (r ∧ s).

And p → q ↔ r → s means (p → q) ↔ (r → s).

### Important: Right Associativity of →

When multiple implications appear without parentheses, they're typically read right-to-left:

p → q → r means p → (q → r), NOT (p → q) → r.

However, always use parentheses to be clear!

## Negating Implications and Biconditionals

### Negating an Implication

$$\neg(p \to q) \equiv p \land \neg q$$

"It is NOT the case that if p then q" means "p is true AND q is false."

**Example:** The negation of "If it rains, I bring an umbrella" is NOT "If it rains, I don't bring an umbrella."

It IS: "It rained AND I didn't bring an umbrella."

### Negating a Biconditional

$$\neg(p \leftrightarrow q) \equiv p \oplus q$$

The negation of "p iff q" is "p XOR q"—exactly one of them is true.

Equivalently: ¬(p ↔ q) ≡ (p ∧ ¬q) ∨ (¬p ∧ q)

## Summary

**Implication (p → q):**
- True unless p is True and q is False
- Equivalent to ¬p ∨ q
- Contrapositive (¬q → ¬p) is equivalent; converse and inverse are not
- Used for "if...then..." statements

**Biconditional (p ↔ q):**
- True when p and q have the same truth value
- Equivalent to (p → q) ∧ (q → p)
- Used for "if and only if" statements

**Negations:**
- ¬(p → q) ≡ p ∧ ¬q
- ¬(p ↔ q) ≡ p ⊕ q

These connectives, combined with NOT, AND, and OR, give us a complete system for expressing any logical relationship.
