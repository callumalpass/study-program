# Introduction to Predicate Logic

## Beyond Propositional Logic

Propositional logic works with complete statements that are either true or false. But many important claims involve *variables* and speak about *all* or *some* members of a collection.

Consider these statements:
- "All prime numbers greater than 2 are odd"
- "Some integers are divisible by 7"
- "For every positive number, there exists a smaller positive number"

Propositional logic cannot express these—it treats each as an atomic unit. **Predicate logic** (also called first-order logic) extends propositional logic with the tools to handle such statements precisely.

## What is Predicate Logic?

Predicate logic introduces two key concepts:

1. **Predicates**: Statement templates with variables
2. **Quantifiers**: Symbols that specify "how many" elements satisfy a predicate

This allows us to express and reason about:
- Properties that apply to entire collections
- Relationships between objects
- Existence and uniqueness claims
- Nested conditions involving multiple variables

## Why Predicate Logic Matters

### Mathematical Foundations

Every mathematical theorem uses predicate logic:
- "For all integers n, n + 0 = n"
- "There exists a real number x such that x² = 2"
- "For every ε > 0, there exists δ > 0..."

Understanding predicate logic is essential for reading, writing, and verifying proofs.

### Computer Science Applications

Predicate logic appears throughout computing:

**Programming constructs:**
```python
# Universal quantification
all(x > 0 for x in numbers)

# Existential quantification
any(item.is_valid for item in collection)
```

**Database queries:**
```sql
SELECT * FROM users WHERE EXISTS (
    SELECT 1 FROM orders WHERE orders.user_id = users.id
);
```

**Type systems:**
```typescript
// Generic types use universal quantification
function identity<T>(x: T): T { return x; }
```

**Formal verification:**
- Preconditions: "For all valid inputs..."
- Postconditions: "There exists no state where..."

### Everyday Reasoning

We use quantified statements constantly:
- "Everyone in the meeting agreed"
- "Some flights are delayed"
- "No solution exists"

Predicate logic formalizes this reasoning, making it precise and checkable.

## Key Components Overview

### Predicates

A **predicate** is a statement with one or more variables:
- P(x): "x is even"
- Q(x, y): "x is greater than y"
- R(x, y, z): "x + y = z"

A predicate is not true or false by itself—it becomes a proposition when variables are given specific values.

### Quantifiers

**Universal quantifier (∀)**: "for all"
- ∀x P(x) means "P(x) is true for every x"

**Existential quantifier (∃)**: "there exists"
- ∃x P(x) means "P(x) is true for at least one x"

### Domains

The **domain** (universe of discourse) specifies what values variables can take. The same predicate can have different truth values over different domains.

## Learning Path

This topic covers:

1. **Predicates and Domains**: How to define and work with predicates
2. **Universal Quantifier**: Expressing "for all" statements
3. **Existential Quantifier**: Expressing "there exists" statements
4. **Negating Quantifiers**: How to negate quantified statements
5. **Nested Quantifiers**: Multiple quantifiers and why order matters
6. **Translation and Applications**: Converting between English and logic

## Connecting to What You Know

| Propositional Logic | Predicate Logic |
|---------------------|-----------------|
| Fixed statements | Statement templates |
| P, Q, R | P(x), Q(x,y) |
| ∧, ∨, →, ¬ | ∧, ∨, →, ¬, ∀, ∃ |
| Truth tables | Domain-based evaluation |

Predicate logic *extends* propositional logic—all propositional rules still apply, plus new rules for quantifiers.

## A Motivating Example

Consider: "All even numbers are divisible by 2."

**Propositional logic:** We can only say "P" (the whole statement).

**Predicate logic:** We can decompose it:
- Let Even(x) mean "x is even"
- Let DivBy2(x) mean "x is divisible by 2"
- Domain: integers

The statement becomes: ∀x (Even(x) → DivBy2(x))

Now we can:
- Prove it by showing the implication holds for any x
- Negate it systematically: ∃x (Even(x) ∧ ¬DivBy2(x))
- Combine it with other quantified statements
- Verify it computationally over finite domains

This precision is what makes predicate logic powerful.

## Summary

Predicate logic extends propositional logic by:
- Introducing **predicates** (statement templates with variables)
- Adding **quantifiers** (∀ and ∃) to express scope
- Requiring **domains** to specify what variables range over

This enables precise expression of:
- Universal claims ("for all...")
- Existential claims ("there exists...")
- Complex nested conditions

Mastering predicate logic is essential for mathematics, programming, and formal reasoning.
