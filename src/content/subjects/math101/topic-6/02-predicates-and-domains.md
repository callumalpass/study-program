# Predicates and Domains

## What is a Predicate?

A **predicate** is a statement containing one or more variables that becomes a proposition when specific values are substituted for the variables.

### Examples

**Single-variable predicates:**
- P(x): "x is prime"
  - P(7) is True
  - P(8) is False
- Q(x): "x > 5"
  - Q(10) is True
  - Q(3) is False

**Multi-variable predicates:**
- R(x, y): "x divides y"
  - R(3, 12) is True
  - R(5, 12) is False
- S(x, y, z): "x + y = z"
  - S(2, 3, 5) is True
  - S(2, 3, 6) is False

## Predicates vs. Propositions

| Predicate | Proposition |
|-----------|-------------|
| Contains free variables | No free variables |
| Not true/false alone | Has definite truth value |
| P(x): "x is even" | P(4): "4 is even" (True) |
| Template | Instantiation |

A predicate becomes a proposition by either:
1. **Substitution**: Replace variables with specific values
2. **Quantification**: Apply ∀ or ∃

## The Domain (Universe of Discourse)

The **domain** is the set of values that variables can take. It must be specified for quantified statements to have definite truth values.

### Why Domains Matter

Consider P(x): "x² ≥ 0"

| Domain | ∀x P(x) |
|--------|---------|
| Real numbers ℝ | True |
| Integers ℤ | True |
| Complex numbers ℂ | False (i² = -1) |

The same predicate has different truth values depending on the domain.

### Common Domains

| Symbol | Domain |
|--------|--------|
| ℕ | Natural numbers {0, 1, 2, ...} or {1, 2, 3, ...} |
| ℤ | Integers {..., -2, -1, 0, 1, 2, ...} |
| ℤ⁺ | Positive integers {1, 2, 3, ...} |
| ℚ | Rational numbers |
| ℝ | Real numbers |
| ℝ⁺ | Positive real numbers |
| ℂ | Complex numbers |

### Finite Domains

Predicates over finite domains can be evaluated completely:

Domain: {1, 2, 3, 4, 5}
P(x): "x is even"

P(1) = False, P(2) = True, P(3) = False, P(4) = True, P(5) = False

**Truth set** = {2, 4}

## Truth Sets

The **truth set** of a predicate P(x) over domain D is:

{x ∈ D : P(x) is true}

### Examples

Domain: ℤ (integers)

| Predicate | Truth Set |
|-----------|-----------|
| x > 0 | ℤ⁺ = {1, 2, 3, ...} |
| x² = 4 | {-2, 2} |
| x is even | {..., -4, -2, 0, 2, 4, ...} |
| x² < 0 | ∅ (empty set) |

### Connection to Quantifiers

- ∀x P(x) is true ⟺ truth set of P = D (entire domain)
- ∃x P(x) is true ⟺ truth set of P ≠ ∅ (non-empty)

## Multi-Variable Predicates

Predicates can have multiple variables, each potentially from different domains.

### Binary Predicates

R(x, y) defines a **relation** between two sets.

Example: Less(x, y): "x < y" over domain ℤ × ℤ
- Less(3, 5) = True
- Less(5, 3) = False
- Less(3, 3) = False

### Ternary Predicates

S(x, y, z): "x + y = z" over domain ℤ × ℤ × ℤ
- S(1, 2, 3) = True
- S(1, 2, 4) = False

## Predicate Notation Conventions

### Function-like Notation

P(x), Q(x, y), R(a, b, c)

Variables are listed as arguments.

### Infix Notation

For binary predicates, we often use infix:
- x < y instead of Less(x, y)
- x ∈ S instead of ElementOf(x, S)
- x | y instead of Divides(x, y)

### Subscript Notation

Sometimes used to indicate the domain:
- ∀x∈ℤ means "for all x in the integers"
- Pℕ(x) means P defined over natural numbers

## Restricted Domains

We can restrict quantifiers to subsets of the domain:

### Notation

$$\forall x \in S \, P(x) \equiv \forall x \, (x \in S \to P(x))$$

$$\exists x \in S \, P(x) \equiv \exists x \, (x \in S \land P(x))$$

### Examples

"All even numbers are divisible by 2":
$$\forall x \in \text{Even} \, \text{DivBy2}(x)$$

Or equivalently:
$$\forall x \, (\text{Even}(x) \to \text{DivBy2}(x))$$

"Some prime is even":
$$\exists x \in \text{Prime} \, \text{Even}(x)$$

## Building Complex Predicates

Predicates can be combined using logical connectives:

### Conjunction

(P ∧ Q)(x) = P(x) ∧ Q(x)

"x is positive and even": Positive(x) ∧ Even(x)

### Disjunction

(P ∨ Q)(x) = P(x) ∨ Q(x)

"x is zero or positive": Zero(x) ∨ Positive(x)

### Negation

(¬P)(x) = ¬P(x)

"x is not prime": ¬Prime(x)

### Implication

(P → Q)(x) = P(x) → Q(x)

"If x is a square, then x is non-negative": Square(x) → NonNeg(x)

## Common Predicate Patterns

| Pattern | Meaning |
|---------|---------|
| P(x) | x has property P |
| R(x, y) | x is related to y by R |
| x = y | x equals y (equality predicate) |
| x ∈ S | x is an element of S |
| f(x) = y | function f maps x to y |

## Summary

**Predicates:**
- Statement templates with variables
- Become propositions when variables are assigned values
- Can have one or more variables

**Domains:**
- The set of possible values for variables
- Must be specified for quantified statements
- Same predicate can have different truth values over different domains

**Truth sets:**
- The set of domain elements that make a predicate true
- Connect predicates to set theory

**Key insight:** A predicate P(x) is essentially a function from the domain to {True, False}, partitioning the domain into elements that satisfy P and those that don't.
