## Introduction

Predicate logic (also called first-order logic) extends propositional logic by introducing **quantifiers** and **predicates**. While propositional logic deals with fixed statements like "Paris is in France," predicate logic can express statements about *all* or *some* elements in a domain, such as "Every prime greater than 2 is odd" or "There exists an integer that is both even and prime."

**Why This Matters:**
Predicate logic is the language of mathematics and formal specifications. When you write `for x in range(n)` or `any(p(x) for x in items)`, you're using quantification. Database queries, type systems, formal verification, and mathematical theorems all rely on predicate logic. Mastering it allows you to express and reason about properties that apply to entire collections of objects.

**Learning Objectives:**
- Understand predicates and their truth sets
- Use universal (∀) and existential (∃) quantifiers correctly
- Translate between English and predicate logic
- Apply negation rules for quantified statements
- Evaluate quantified expressions over finite and infinite domains
- Recognize nested quantifiers and their order dependence

---

## Core Concepts

### Predicates

A **predicate** is a statement containing one or more variables that becomes a proposition when the variables are given specific values.

**Examples:**
- $P(x)$: "$x$ is prime" — not a proposition until $x$ is specified
  - $P(7)$ is True (7 is prime)
  - $P(8)$ is False (8 is not prime)
- $Q(x, y)$: "$x > y$" — a two-variable predicate
  - $Q(5, 3)$ is True
  - $Q(2, 7)$ is False

The **domain** (or universe of discourse) is the set of values the variables can take. The domain must be specified for quantified statements to have definite truth values.

### Universal Quantifier (∀)

The **universal quantifier** $\forall$ means "for all" or "for every."

$$\forall x \, P(x)$$

Read as: "For all $x$, $P(x)$ is true" or "Every $x$ satisfies $P$."

**Truth condition:** $\forall x \, P(x)$ is True if and only if $P(x)$ is True for *every* element in the domain.

**Example:**
Let the domain be positive integers ≤ 5, i.e., {1, 2, 3, 4, 5}.
- $\forall x \, (x > 0)$ is **True** (all elements are positive)
- $\forall x \, (x < 4)$ is **False** (4 and 5 are not less than 4)

**Think of ∀ as a giant AND:**
$$\forall x \in \{1,2,3\} \, P(x) \equiv P(1) \land P(2) \land P(3)$$

### Existential Quantifier (∃)

The **existential quantifier** $\exists$ means "there exists" or "for some."

$$\exists x \, P(x)$$

Read as: "There exists an $x$ such that $P(x)$ is true" or "Some $x$ satisfies $P$."

**Truth condition:** $\exists x \, P(x)$ is True if and only if $P(x)$ is True for *at least one* element in the domain.

**Example:**
Let the domain be integers.
- $\exists x \, (x^2 = 4)$ is **True** ($x = 2$ or $x = -2$ works)
- $\exists x \, (x^2 = -1)$ is **False** in the integers (no real number squared gives -1)

**Think of ∃ as a giant OR:**
$$\exists x \in \{1,2,3\} \, P(x) \equiv P(1) \lor P(2) \lor P(3)$$

### Negating Quantified Statements

One of the most important rules in predicate logic:

$$\neg(\forall x \, P(x)) \equiv \exists x \, \neg P(x)$$
$$\neg(\exists x \, P(x)) \equiv \forall x \, \neg P(x)$$

**Intuition:**
- "NOT all students passed" ≡ "Some student failed"
- "NOT some student cheated" ≡ "All students were honest"

**Example:**
Negate: "All birds can fly."
- Original: $\forall x \, (\text{Bird}(x) \to \text{CanFly}(x))$
- Negation: $\exists x \, (\text{Bird}(x) \land \neg\text{CanFly}(x))$
- English: "There exists a bird that cannot fly." (Penguins!)

### Nested Quantifiers

Predicates with multiple variables often require multiple quantifiers.

**Order matters!**

$$\forall x \, \exists y \, P(x, y) \quad \text{vs} \quad \exists y \, \forall x \, P(x, y)$$

**Example:** Let the domain be real numbers, and $P(x, y)$: "$y > x$"

- $\forall x \, \exists y \, (y > x)$: "For every $x$, there exists a $y$ greater than $x$."
  - **True** — given any number, we can find a larger one
- $\exists y \, \forall x \, (y > x)$: "There exists a $y$ greater than all $x$."
  - **False** — no single number is greater than all real numbers

### Quantifiers with Restricted Domains

Often we restrict quantifiers to a subset:

$$\forall x \in S \, P(x) \equiv \forall x \, (x \in S \to P(x))$$
$$\exists x \in S \, P(x) \equiv \exists x \, (x \in S \land P(x))$$

**Example:**
"All even numbers are divisible by 2" becomes:
$$\forall x \, (\text{Even}(x) \to \text{DivisibleBy2}(x))$$

---

## Common Patterns and Idioms

### Translating English to Predicate Logic

| English | Predicate Logic |
|---------|-----------------|
| "All dogs bark" | $\forall x \, (\text{Dog}(x) \to \text{Barks}(x))$ |
| "Some dogs bark" | $\exists x \, (\text{Dog}(x) \land \text{Barks}(x))$ |
| "No dogs bark" | $\forall x \, (\text{Dog}(x) \to \neg\text{Barks}(x))$ or $\neg\exists x \, (\text{Dog}(x) \land \text{Barks}(x))$ |
| "Not all dogs bark" | $\exists x \, (\text{Dog}(x) \land \neg\text{Barks}(x))$ |
| "Only dogs bark" | $\forall x \, (\text{Barks}(x) \to \text{Dog}(x))$ |

### Uniqueness Quantifier

$\exists! x \, P(x)$ means "there exists exactly one $x$ such that $P(x)$."

Expanded form:
$$\exists! x \, P(x) \equiv \exists x \, (P(x) \land \forall y \, (P(y) \to y = x))$$

### Common Logical Forms

**Universal Conditional:** "All A are B"
$$\forall x \, (A(x) \to B(x))$$

**Existential Conjunction:** "Some A are B"
$$\exists x \, (A(x) \land B(x))$$

---

## Common Mistakes and Debugging

### Mistake 1: Using ∧ with ∀ and ∨ with ∃

❌ Wrong: $\forall x \, (\text{Student}(x) \land \text{Passed}(x))$
- This claims everyone in the universe is both a student AND passed

✅ Correct: $\forall x \, (\text{Student}(x) \to \text{Passed}(x))$
- This claims: IF someone is a student, THEN they passed

❌ Wrong: $\exists x \, (\text{Bird}(x) \to \text{CanSwim}(x))$
- This is vacuously true if any non-bird exists!

✅ Correct: $\exists x \, (\text{Bird}(x) \land \text{CanSwim}(x))$
- This correctly asserts some bird can swim

### Mistake 2: Ignoring Quantifier Order

The statements $\forall x \, \exists y \, P(x,y)$ and $\exists y \, \forall x \, P(x,y)$ usually have different meanings!

**Example:** "Everyone has a mother" vs "Someone is everyone's mother"
- $\forall x \, \exists y \, \text{MotherOf}(y, x)$ — True (everyone has some mother)
- $\exists y \, \forall x \, \text{MotherOf}(y, x)$ — False (no one is mother to all)

### Mistake 3: Negating Incorrectly

To negate $\forall x \, (P(x) \to Q(x))$:
1. Apply De Morgan for quantifiers: $\exists x \, \neg(P(x) \to Q(x))$
2. Negate the implication: $\exists x \, (P(x) \land \neg Q(x))$

NOT: $\forall x \, (P(x) \to \neg Q(x))$ — this is a different statement!

---

## Best Practices

1. **Always specify the domain:** The truth of quantified statements depends critically on what set the variables range over.

2. **Use restricted quantifiers for clarity:** Write $\forall x \in \mathbb{Z}$ rather than assuming the domain.

3. **Read nested quantifiers inside-out:** For $\forall x \, \exists y \, P(x,y)$, the inner quantifier can depend on the outer variable.

4. **Check edge cases:** Consider empty domains, singleton domains, and infinite domains.

5. **Practice negation:** The ability to correctly negate quantified statements is essential for proofs by contradiction.

---

## Real-World Applications

**Programming:**
```python
# Universal quantification: all elements satisfy a condition
all(x > 0 for x in numbers)  # ∀x ∈ numbers. x > 0

# Existential quantification: some element satisfies a condition
any(x % 2 == 0 for x in numbers)  # ∃x ∈ numbers. x is even
```

**Database Queries (SQL):**
```sql
-- Universal: All orders are shipped (no unshipped orders exist)
SELECT NOT EXISTS (SELECT 1 FROM orders WHERE shipped = FALSE);

-- Existential: Some customer is from New York
SELECT EXISTS (SELECT 1 FROM customers WHERE city = 'New York');
```

**Type Systems:**
Generic types use universal quantification:
```typescript
// ∀T. (array: T[], element: T) → boolean
function contains<T>(array: T[], element: T): boolean { ... }
```

**Formal Verification:**
Preconditions and postconditions use quantifiers:
- "For all valid inputs, the function terminates"
- "There exists no input that causes undefined behavior"

---

## Summary

- **Predicates** are statement templates with variables; they become propositions when variables are assigned.
- **Universal quantifier (∀):** True when the predicate holds for ALL elements in the domain.
- **Existential quantifier (∃):** True when the predicate holds for AT LEAST ONE element.
- **Negation rules:** $\neg\forall \equiv \exists\neg$ and $\neg\exists \equiv \forall\neg$
- **Order matters** for nested quantifiers: $\forall x \, \exists y$ is generally different from $\exists y \, \forall x$.
- **Translation patterns:** Use → with ∀ for "all A are B"; use ∧ with ∃ for "some A are B."

---

## Further Exploration

- **Higher-Order Logic:** Allows quantification over predicates and functions.
- **Model Theory:** Studies the relationship between formal languages and their interpretations.
- **Automated Theorem Proving:** Applies predicate logic to verify mathematical proofs computationally.
- **Satisfiability Modulo Theories (SMT):** Extends SAT solving to predicate logic with theories.
