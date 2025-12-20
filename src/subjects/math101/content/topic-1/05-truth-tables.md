---
id: math101-t1-tables
title: "Truth Tables"
order: 5
---

# Truth Tables and Evaluation

## What is a Truth Table?

A truth table systematically lists all possible combinations of truth values for the propositional variables in an expression, along with the resulting truth value of the entire expression.

For an expression with n propositional variables, the truth table has 2^n rows, covering every possible combination of True and False.

| Variables | Rows |
|-----------|------|
| 1 (p) | 2 |
| 2 (p, q) | 4 |
| 3 (p, q, r) | 8 |
| 4 (p, q, r, s) | 16 |
| n | 2^n |

## Building Truth Tables Systematically

### Step 1: List All Variables

Identify all propositional variables in the expression.

### Step 2: Create Columns

Create a column for each variable and for each subexpression, building up to the final expression.

### Step 3: Fill in Variable Combinations

For n variables, fill in 2^n rows with all combinations. A standard pattern:
- First variable: T for first half, F for second half
- Second variable: T for first quarter, F for second quarter, repeat
- And so on, alternating faster with each variable

### Step 4: Evaluate Subexpressions

Work from the innermost subexpressions outward, filling in columns.

## Example: Building a Truth Table

Let's build a truth table for: (p ∧ q) → ¬r

**Step 1:** Variables are p, q, r (3 variables = 8 rows)

**Step 2:** Columns: p, q, r, (p ∧ q), ¬r, (p ∧ q) → ¬r

**Step 3 & 4:**

| p | q | r | p ∧ q | ¬r | (p ∧ q) → ¬r |
|:---:|:---:|:---:|:---:|:---:|:---:|
| T | T | T | T | F | F |
| T | T | F | T | T | T |
| T | F | T | F | F | T |
| T | F | F | F | T | T |
| F | T | T | F | F | T |
| F | T | F | F | T | T |
| F | F | T | F | F | T |
| F | F | F | F | T | T |

The expression is true in 7 out of 8 cases.

## Classifying Expressions

Truth tables reveal important properties of logical expressions:

### Tautology

A **tautology** is an expression that is **always true**, regardless of the truth values of its variables.

**Example:** p ∨ ¬p (Law of Excluded Middle)

| p | ¬p | p ∨ ¬p |
|:---:|:---:|:---:|
| T | F | **T** |
| F | T | **T** |

All entries in the final column are T.

**Other tautologies:**
- (p → q) ↔ (¬p ∨ q)
- ¬(p ∧ ¬p)
- (p ∧ q) → p
- p → (q → p)

### Contradiction

A **contradiction** is an expression that is **always false**.

**Example:** p ∧ ¬p

| p | ¬p | p ∧ ¬p |
|:---:|:---:|:---:|
| T | F | **F** |
| F | T | **F** |

All entries in the final column are F.

**Other contradictions:**
- (p → q) ∧ (p ∧ ¬q)
- ¬(p ∨ ¬p)

### Contingency

A **contingency** is an expression that is **sometimes true and sometimes false**, depending on the values of its variables.

Most expressions are contingencies. Examples: p, p ∧ q, p → q, p ↔ q

## Proving Logical Equivalence

Two expressions are **logically equivalent** (written ≡) if they have the same truth value for every possible assignment of truth values to their variables.

To prove equivalence using truth tables: show that both expressions have identical final columns.

### Example: Proving De Morgan's Law

Prove: ¬(p ∧ q) ≡ ¬p ∨ ¬q

| p | q | p ∧ q | ¬(p ∧ q) | ¬p | ¬q | ¬p ∨ ¬q |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| T | T | T | F | F | F | F |
| T | F | F | T | F | T | T |
| F | T | F | T | T | F | T |
| F | F | F | T | T | T | T |

The columns for ¬(p ∧ q) and ¬p ∨ ¬q are identical, proving the equivalence.

## Checking Argument Validity

An argument is **valid** if the conclusion must be true whenever all premises are true. Using truth tables:

1. Write the premises and conclusion
2. Find all rows where ALL premises are true
3. Check if the conclusion is also true in all those rows

### Example: Modus Ponens

**Argument:**
- Premise 1: p → q
- Premise 2: p
- Conclusion: q

| p | q | p → q | Premises True? | q |
|:---:|:---:|:---:|:---:|:---:|
| T | T | T | **Yes** (both T) | **T** ✓ |
| T | F | F | No (p→q is F) | F |
| F | T | T | No (p is F) | T |
| F | F | T | No (p is F) | F |

In the only row where both premises are true (row 1), the conclusion is also true. The argument is **valid**.

### Example: Invalid Argument (Affirming the Consequent)

**Argument:**
- Premise 1: p → q
- Premise 2: q
- Conclusion: p

| p | q | p → q | Premises True? | p |
|:---:|:---:|:---:|:---:|:---:|
| T | T | T | **Yes** | **T** ✓ |
| T | F | F | No | T |
| F | T | T | **Yes** | **F** ✗ |
| F | F | T | No | F |

Row 3 has both premises true but conclusion false. This is a **counterexample**, proving the argument is **invalid**.

## Efficiency Considerations

Truth tables grow exponentially. For 10 variables, you'd need 1024 rows!

**When to use truth tables:**
- Small number of variables (≤4 is comfortable, ≤6 is manageable)
- Need a definitive proof/disproof
- Checking if an expression is a tautology/contradiction
- Verifying logical equivalences

**Alternatives for larger expressions:**
- Algebraic manipulation using known equivalences
- Proof methods (natural deduction, resolution)
- SAT solvers (automated tools)

## Common Truth Table Patterns

### Always True (Tautology Pattern)
When the final column is all T's:
- p ∨ ¬p
- p → p
- (p → q) ∨ (q → p)

### Always False (Contradiction Pattern)
When the final column is all F's:
- p ∧ ¬p
- (p ↔ q) ∧ (p ↔ ¬q)

### Equivalent Expressions
When two expressions have identical columns:
- p → q and ¬p ∨ q
- ¬(p ∨ q) and ¬p ∧ ¬q (De Morgan)
- p → q and ¬q → ¬p (contrapositive)

## Summary

Truth tables provide a systematic, mechanical method to:
- **Evaluate** compound propositions for all possible inputs
- **Classify** expressions as tautologies, contradictions, or contingencies
- **Prove** logical equivalences by showing identical columns
- **Verify** argument validity by checking all premise-true rows

While limited by exponential growth, truth tables are an essential tool for understanding propositional logic and building intuition about logical relationships.
