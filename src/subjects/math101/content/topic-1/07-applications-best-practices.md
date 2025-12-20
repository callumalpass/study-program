---
id: math101-t1-applications
title: "Applications and Best Practices"
order: 7
---

# Applications and Best Practices

## Propositional Logic in Programming

### Boolean Conditions

Every conditional statement in programming uses propositional logic:

```python
# Simple condition (atomic proposition)
if is_valid:
    process()

# Conjunction (AND)
if is_logged_in and has_permission:
    access_resource()

# Disjunction (OR)
if is_admin or is_owner:
    modify_settings()

# Negation (NOT)
if not is_empty:
    process_data()

# Complex condition
if (is_valid and not is_expired) or force_override:
    proceed()
```

### De Morgan's Laws in Code

These transformations are common during refactoring:

```python
# Original
if not (a and b):
    handle_case()

# De Morgan's transformation (equivalent)
if (not a) or (not b):
    handle_case()

# Original
if not (a or b):
    handle_case()

# De Morgan's transformation (equivalent)
if (not a) and (not b):
    handle_case()
```

### Short-Circuit Evaluation

Most programming languages use short-circuit evaluation:
- **AND:** If the first operand is False, the second isn't evaluated
- **OR:** If the first operand is True, the second isn't evaluated

```python
# Safe: won't crash if user is None
if user is not None and user.is_active:
    grant_access()

# Dangerous without short-circuit:
# user.is_active would fail if user is None
```

### Common Patterns

**Guard clauses using implication logic:**
```python
# p → q can be written as: if p then q
# Equivalently: if not p, skip
def process(data):
    if data is None:  # ¬p
        return        # Skip q
    # Continue with q (processing)
```

**Exclusive OR:**
```python
# XOR: exactly one should be true
if (has_keyboard_input) != (has_mouse_input):
    # Exactly one input type
    process_single_input()
```

## Propositional Logic in Databases

### SQL WHERE Clauses

SQL conditions directly implement propositional logic:

```sql
-- Conjunction (AND)
SELECT * FROM users
WHERE status = 'active' AND role = 'admin';

-- Disjunction (OR)
SELECT * FROM products
WHERE category = 'electronics' OR category = 'computers';

-- Negation (NOT)
SELECT * FROM orders
WHERE NOT shipped;

-- Complex condition
SELECT * FROM events
WHERE (status = 'confirmed' AND attendees > 10)
   OR (vip_event = true);
```

### De Morgan in Queries

```sql
-- These are equivalent (De Morgan's Law):
SELECT * FROM users WHERE NOT (age < 18 AND country = 'US');
SELECT * FROM users WHERE age >= 18 OR country != 'US';

-- These are equivalent:
SELECT * FROM orders WHERE NOT (status = 'pending' OR status = 'processing');
SELECT * FROM orders WHERE status != 'pending' AND status != 'processing';
```

## Propositional Logic in Digital Circuits

### Logic Gates

Each logical connective corresponds to a hardware gate:

| Logic | Gate | Symbol |
|-------|------|--------|
| NOT p | NOT gate / Inverter | ▷○ |
| p AND q | AND gate | D-shape |
| p OR q | OR gate | Curved D |
| p XOR q | XOR gate | OR with extra curve |
| NOT(p AND q) | NAND gate | AND with bubble |
| NOT(p OR q) | NOR gate | OR with bubble |

### Universal Gates

NAND and NOR are **universal gates**—any logical function can be built using only NAND gates (or only NOR gates).

- NOT p ≡ p NAND p
- p AND q ≡ (p NAND q) NAND (p NAND q)
- p OR q ≡ (p NAND p) NAND (q NAND q)

This is why NAND gates are fundamental in chip design.

## Translating English to Logic

### Systematic Approach

1. **Identify atomic propositions:** What are the basic statements?
2. **Identify connectives:** Look for AND, OR, NOT, IF-THEN, IFF keywords
3. **Determine structure:** What modifies what? Use parentheses.
4. **Handle special phrases:** "Unless," "only if," etc.

### Common Translations

| English | Logic |
|---------|-------|
| "A and B" | A ∧ B |
| "A or B" | A ∨ B |
| "Not A" | ¬A |
| "If A then B" | A → B |
| "A only if B" | A → B |
| "A if B" | B → A |
| "A unless B" | ¬B → A or A ∨ B |
| "A if and only if B" | A ↔ B |
| "A is necessary for B" | B → A |
| "A is sufficient for B" | A → B |
| "Neither A nor B" | ¬A ∧ ¬B |
| "Not both A and B" | ¬(A ∧ B) |

### Example Translations

**"You can enter the club if you're over 21 or you're a member."**
- p = "You can enter the club"
- q = "You're over 21"
- r = "You're a member"
- Translation: (q ∨ r) → p

**"The alarm sounds unless the door is locked and the window is closed."**
- a = "Alarm sounds"
- d = "Door is locked"
- w = "Window is closed"
- "unless" means "if not"
- Translation: ¬(d ∧ w) → a, or equivalently: a ∨ (d ∧ w)

## Best Practices

### 1. Use Parentheses Liberally

Don't rely on precedence rules:

❌ p ∨ q ∧ ¬r → s
✅ (p ∨ (q ∧ (¬r))) → s

### 2. Simplify Before Implementing

Complex expressions should be simplified using equivalences:

Before: ¬(¬p ∨ ¬q) ∧ (p ∨ q)
Apply De Morgan: (p ∧ q) ∧ (p ∨ q)
Apply Absorption: p ∧ q

### 3. Verify with Truth Tables

When uncertain, build a truth table to check:
- Equivalence of two expressions
- Whether an expression is a tautology
- Validity of an argument

### 4. Test Edge Cases in Code

Boolean conditions should be tested with all combinations:
```python
# Test all cases for: a and not b
test_cases = [
    (True, True, False),   # a=T, b=T → F
    (True, False, True),   # a=T, b=F → T
    (False, True, False),  # a=F, b=T → F
    (False, False, False), # a=F, b=F → F
]
```

### 5. Know Your Equivalences

Memorize key equivalences to transform expressions efficiently:
- De Morgan's Laws
- Contrapositive
- Implication as disjunction
- Distributive laws

## Common Mistakes to Avoid

### Mistake 1: Confusing Converse and Contrapositive

- Original: p → q
- Converse: q → p (NOT equivalent!)
- Contrapositive: ¬q → ¬p (Equivalent!)

### Mistake 2: Wrong Negation of Implication

- Original: "If it rains, the ground is wet"
- WRONG negation: "If it rains, the ground is not wet"
- CORRECT negation: "It rained AND the ground is not wet"

### Mistake 3: Exclusive vs. Inclusive OR

- Everyday "or" is often exclusive
- Logical ∨ is inclusive (true if both true)
- Use XOR explicitly when needed: (p ∨ q) ∧ ¬(p ∧ q)

### Mistake 4: Forgetting Precedence

- p ∨ q ∧ r means p ∨ (q ∧ r), not (p ∨ q) ∧ r
- When in doubt, use parentheses

## Summary

Propositional logic is everywhere in computer science:
- **Programming:** Boolean conditions, control flow
- **Databases:** Query predicates, constraints
- **Hardware:** Logic gates, circuit design
- **Formal methods:** Specification, verification

Best practices:
- Use parentheses for clarity
- Simplify complex expressions
- Verify with truth tables when needed
- Master key equivalences
- Watch for common pitfalls

With these foundations, you're ready to apply propositional logic effectively in any technical context.
