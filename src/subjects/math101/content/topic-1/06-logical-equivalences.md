---
id: math101-t1-equivalences
title: "Logical Equivalences"
order: 6
---

# Logical Equivalences and Laws

## What is Logical Equivalence?

Two propositions are **logically equivalent** (denoted p ≡ q or p ⟺ q) if they have the same truth value in every possible scenario. Equivalences allow us to transform expressions into simpler or more useful forms without changing their meaning.

## Fundamental Equivalences

These equivalences form the foundation of propositional algebra:

### Identity Laws
$$p \land T \equiv p$$
$$p \lor F \equiv p$$

AND with True, or OR with False, returns the original proposition.

### Domination Laws
$$p \lor T \equiv T$$
$$p \land F \equiv F$$

OR with True is always True; AND with False is always False.

### Idempotent Laws
$$p \lor p \equiv p$$
$$p \land p \equiv p$$

Repeating a proposition doesn't change it.

### Double Negation
$$\neg(\neg p) \equiv p$$

Negating twice returns to the original.

### Commutative Laws
$$p \land q \equiv q \land p$$
$$p \lor q \equiv q \lor p$$

Order doesn't matter for AND and OR.

### Associative Laws
$$(p \land q) \land r \equiv p \land (q \land r)$$
$$(p \lor q) \lor r \equiv p \lor (q \lor r)$$

Grouping doesn't matter for consecutive ANDs or consecutive ORs.

### Distributive Laws
$$p \land (q \lor r) \equiv (p \land q) \lor (p \land r)$$
$$p \lor (q \land r) \equiv (p \lor q) \land (p \lor r)$$

AND distributes over OR, and OR distributes over AND.

### Absorption Laws
$$p \land (p \lor q) \equiv p$$
$$p \lor (p \land q) \equiv p$$

These are useful for simplification.

## De Morgan's Laws

These are among the most important equivalences:

$$\neg(p \land q) \equiv \neg p \lor \neg q$$
$$\neg(p \lor q) \equiv \neg p \land \neg q$$

**In words:**
- The negation of a conjunction is the disjunction of the negations
- The negation of a disjunction is the conjunction of the negations

**Memory trick:** When you push negation through parentheses, the operator flips (AND ↔ OR) and each operand gets negated.

### Example Applications

**Programming:** These are equivalent:
```python
# De Morgan's Law
if not (a and b):    # ≡ if (not a) or (not b):
    do_something()

if not (a or b):     # ≡ if (not a) and (not b):
    do_something()
```

**Logic:** Negate "It is raining and cold."
- ¬(R ∧ C) ≡ ¬R ∨ ¬C
- "It is not raining OR it is not cold."

## Implication Equivalences

### Implication as Disjunction
$$p \to q \equiv \neg p \lor q$$

"If p then q" is the same as "not p, or q."

### Contrapositive
$$p \to q \equiv \neg q \to \neg p$$

An implication is equivalent to its contrapositive. This is extremely useful in proofs.

**Example:** "If n² is even, then n is even" is equivalent to "If n is odd, then n² is odd."

### Negation of Implication
$$\neg(p \to q) \equiv p \land \neg q$$

The negation of "if p then q" is "p AND not q"—NOT "if p then not q."

## Biconditional Equivalences

### As Double Implication
$$p \leftrightarrow q \equiv (p \to q) \land (q \to p)$$

### As Matching Truth Values
$$p \leftrightarrow q \equiv (p \land q) \lor (\neg p \land \neg q)$$

Both true or both false.

### Negation of Biconditional
$$\neg(p \leftrightarrow q) \equiv p \oplus q \equiv (p \lor q) \land \neg(p \land q)$$

The negation of "iff" is XOR (exactly one is true).

## Proving Equivalences Algebraically

We can prove equivalences by transforming one side into the other using known laws.

### Example 1: Prove ¬(p → q) ≡ p ∧ ¬q

$$\neg(p \to q)$$
$$\equiv \neg(\neg p \lor q) \quad \text{(implication as disjunction)}$$
$$\equiv \neg(\neg p) \land \neg q \quad \text{(De Morgan)}$$
$$\equiv p \land \neg q \quad \text{(double negation)}$$

### Example 2: Prove (p → q) ∧ (p → r) ≡ p → (q ∧ r)

$$p \to (q \land r)$$
$$\equiv \neg p \lor (q \land r) \quad \text{(implication)}$$
$$\equiv (\neg p \lor q) \land (\neg p \lor r) \quad \text{(distributive)}$$
$$\equiv (p \to q) \land (p \to r) \quad \text{(implication)}$$

### Example 3: Simplify (p ∧ q) ∨ (p ∧ ¬q)

$$(p \land q) \lor (p \land \neg q)$$
$$\equiv p \land (q \lor \neg q) \quad \text{(distributive, reversed)}$$
$$\equiv p \land T \quad \text{(excluded middle)}$$
$$\equiv p \quad \text{(identity)}$$

## Quick Reference Table

| Law | Equivalence |
|-----|-------------|
| **Identity** | p ∧ T ≡ p, p ∨ F ≡ p |
| **Domination** | p ∨ T ≡ T, p ∧ F ≡ F |
| **Idempotent** | p ∧ p ≡ p, p ∨ p ≡ p |
| **Double Negation** | ¬¬p ≡ p |
| **Commutative** | p ∧ q ≡ q ∧ p, p ∨ q ≡ q ∨ p |
| **Associative** | (p ∧ q) ∧ r ≡ p ∧ (q ∧ r) |
| **Distributive** | p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r) |
| **Absorption** | p ∧ (p ∨ q) ≡ p |
| **De Morgan** | ¬(p ∧ q) ≡ ¬p ∨ ¬q |
| **Implication** | p → q ≡ ¬p ∨ q |
| **Contrapositive** | p → q ≡ ¬q → ¬p |
| **Biconditional** | p ↔ q ≡ (p → q) ∧ (q → p) |
| **Negation of →** | ¬(p → q) ≡ p ∧ ¬q |
| **Excluded Middle** | p ∨ ¬p ≡ T |
| **Contradiction** | p ∧ ¬p ≡ F |

## Normal Forms

### Conjunctive Normal Form (CNF)

A formula is in CNF if it's a conjunction of clauses, where each clause is a disjunction of literals (variables or their negations).

**Example:** (p ∨ q) ∧ (¬p ∨ r) ∧ (q ∨ ¬r)

### Disjunctive Normal Form (DNF)

A formula is in DNF if it's a disjunction of terms, where each term is a conjunction of literals.

**Example:** (p ∧ q) ∨ (¬p ∧ r) ∨ (q ∧ ¬r)

Every propositional formula can be converted to CNF or DNF using the equivalences above.

## Summary

Logical equivalences are powerful tools that let us:
- **Simplify** complex expressions
- **Transform** expressions into useful forms
- **Prove** statements by algebraic manipulation
- **Understand** the structure of logical relationships

The key equivalences to memorize are:
- **De Morgan's Laws** (negation through AND/OR)
- **Implication as disjunction** (p → q ≡ ¬p ∨ q)
- **Contrapositive** (p → q ≡ ¬q → ¬p)
- **Distributive laws** (for expansion and factoring)

Mastering these equivalences will serve you well in proofs, programming, and logical reasoning.
