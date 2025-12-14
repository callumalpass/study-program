## Introduction

Propositional logic is the bedrock of mathematical reasoning and computer science. It provides a formal language for representing knowledge and a system for precise deduction. In this topic, we explore how to construct complex logical statements from simple propositions and analyze their truth values.

**Why This Matters:**
Logic is the foundation of programming, database queries, circuit design, and mathematical proofs. Every `if` statement, every SQL `WHERE` clause, and every boolean expression relies on propositional logic. Understanding logic helps you write correct code, debug tricky conditions, and reason precisely about complex systems.

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

**Examples of propositions:**
- "Paris is in France." (True)
- "2 + 2 = 5." (False)
- "It is raining." (True or False depending on weather)

**NOT propositions:**
- "Close the door." (Command)
- "What time is it?" (Question)
- "x > 5" (Has a variable—this is a *predicate*, not a proposition)

We build compound propositions using **logical connectives**:

| Connective | Name | Symbol | Read As | True When... |
| :--- | :--- | :---: | :--- | :--- |
| **Negation** | NOT | $\neg p$ | "not p" | $p$ is False |
| **Conjunction** | AND | $p \land q$ | "p and q" | Both are True |
| **Disjunction** | OR | $p \lor q$ | "p or q" | At least one is True |
| **Implication** | IF-THEN | $p \to q$ | "if p then q" | $p$ is False OR $q$ is True |
| **Biconditional** | IFF | $p \leftrightarrow q$ | "p if and only if q" | Both same truth value |

### Truth Tables

Truth tables enumerate all possible combinations of truth values for propositions.

**Basic Truth Tables:**

| $p$ | $\neg p$ |
|:---:|:--------:|
| T | F |
| F | T |

| $p$ | $q$ | $p \land q$ | $p \lor q$ | $p \to q$ | $p \leftrightarrow q$ |
|:---:|:---:|:-----------:|:----------:|:---------:|:--------------------:|
| T | T | T | T | T | T |
| T | F | F | T | F | F |
| F | T | F | T | T | F |
| F | F | F | F | T | T |

### Understanding Implication ($p \to q$)

The implication is the trickiest connective. Think of it as a promise:
- "If it rains ($p$), I will bring an umbrella ($q$)."

The promise is only **broken** (False) if it rains AND you don't bring an umbrella.

| Scenario | $p$ (rain) | $q$ (umbrella) | Promise kept? |
|----------|:----------:|:--------------:|:-------------:|
| Rains, bring umbrella | T | T | T |
| Rains, no umbrella | T | F | F (broken!) |
| No rain, bring umbrella | F | T | T (not tested) |
| No rain, no umbrella | F | F | T (not tested) |

**Key insight:** A false premise makes the implication vacuously true.

### Logical Equivalence

Two propositions are **logically equivalent** ($\equiv$) if they have the same truth values in all possible scenarios.

**Key Equivalences to Memorize:**

**De Morgan's Laws:**
$$\neg(p \land q) \equiv \neg p \lor \neg q$$
$$\neg(p \lor q) \equiv \neg p \land \neg q$$

**Contrapositive:**
$$p \to q \equiv \neg q \to \neg p$$

**Implication as OR:**
$$p \to q \equiv \neg p \lor q$$

**Double Negation:**
$$\neg(\neg p) \equiv p$$

### Tautologies, Contradictions, and Contingencies

- **Tautology:** Always true regardless of input values
  - Example: $p \lor \neg p$ (Law of Excluded Middle)

- **Contradiction:** Always false regardless of input values
  - Example: $p \land \neg p$

- **Contingency:** Sometimes true, sometimes false (depends on values)
  - Example: $p \land q$

---

## Common Patterns and Idioms

### Translating English to Logic

English is ambiguous; logic is precise. Here are common translations:

| English | Logic |
|---------|-------|
| "p and q" | $p \land q$ |
| "p or q" | $p \lor q$ (inclusive) |
| "not p" | $\neg p$ |
| "if p then q" | $p \to q$ |
| "p only if q" | $p \to q$ |
| "p unless q" | $\neg q \to p$ or $p \lor q$ |
| "p is necessary for q" | $q \to p$ |
| "p is sufficient for q" | $p \to q$ |
| "p if and only if q" | $p \leftrightarrow q$ |

### Operator Precedence

From highest to lowest: $\neg$ (NOT) > $\land$ (AND) > $\lor$ (OR) > $\to$ (IMPLIES) > $\leftrightarrow$ (IFF)

So $p \lor q \land r$ means $p \lor (q \land r)$, NOT $(p \lor q) \land r$.

### Common Logical Laws

| Law | Expression |
|-----|------------|
| **Commutative** | $p \land q \equiv q \land p$ |
| **Associative** | $(p \land q) \land r \equiv p \land (q \land r)$ |
| **Distributive** | $p \land (q \lor r) \equiv (p \land q) \lor (p \land r)$ |
| **Absorption** | $p \land (p \lor q) \equiv p$ |
| **Identity** | $p \land T \equiv p$, $p \lor F \equiv p$ |
| **Domination** | $p \lor T \equiv T$, $p \land F \equiv F$ |

---

## Common Mistakes and Debugging

### Mistake 1: Confusing $\to$ with $\leftrightarrow$
"If it is a square, then it is a rectangle" ($p \to q$) is True.
"If it is a rectangle, then it is a square" ($q \to p$) is False.
They are NOT equivalent!

$p \to q$ is NOT the same as $q \to p$ (the converse).

### Mistake 2: Negating Implications Incorrectly
The negation of "If $p$, then $q$" is NOT "If $p$, then not $q$".

$$\neg(p \to q) \equiv p \land \neg q$$

"It is NOT the case that if it rains I bring an umbrella" means "It rained AND I didn't bring an umbrella."

### Mistake 3: Exclusive vs Inclusive OR
In everyday English, "or" often means exclusive (one or the other, but not both). In logic, $\lor$ is **inclusive** (one or the other, or both).

- "Coffee or tea?" (usually XOR in context)
- Logical OR: $p \lor q$ is True when both are True

For exclusive or, use: $(p \lor q) \land \neg(p \land q)$ or $p \oplus q$

---

## Best Practices

1. **Build truth tables systematically:** For n variables, you have $2^n$ rows. List all combinations.

2. **Use parentheses liberally:** Don't rely on precedence rules when clarity matters.

3. **Check equivalences with truth tables:** If two expressions have identical columns, they're equivalent.

4. **Practice translation:** Convert English sentences to logic and back. This is a core skill.

5. **Simplify using laws:** De Morgan's and the contrapositive are your most powerful tools.

---

## Real-World Applications

**Programming:**
```python
# These are equivalent (De Morgan's Law)
if not (a and b):
    ...
if (not a) or (not b):
    ...
```

**Database Queries (SQL):**
```sql
-- These are equivalent
SELECT * FROM users WHERE NOT (age < 18 AND country = 'US');
SELECT * FROM users WHERE age >= 18 OR country != 'US';
```

**Circuit Design:**
The expression $(A \land B) \lor (\neg A \land C)$ directly maps to a circuit with AND, OR, and NOT gates.

**Formal Verification:**
Proving that software or hardware behaves correctly often involves proving logical equivalences.

---

## Summary

- **Propositions** are the atoms of logic—statements that are True or False.
- **Connectives** ($\neg$, $\land$, $\lor$, $\to$, $\leftrightarrow$) combine propositions.
- **Truth tables** provide a rigorous method to verify truth values.
- **Logical equivalence** allows us to simplify and transform expressions.
- **Implication** ($p \to q$) is only False when $p$ is True and $q$ is False.
- **De Morgan's Laws** and the **Contrapositive** are essential equivalences.

---

## Further Exploration

- **Predicate Logic:** Extends propositional logic with quantifiers ($\forall$, $\exists$) and variables.
- **Boolean Algebra:** The algebraic structure underlying propositional logic.
- **SAT Solvers:** Algorithms that determine if a propositional formula can be satisfied.
- **Natural Deduction:** A system for proving logical statements step-by-step.
