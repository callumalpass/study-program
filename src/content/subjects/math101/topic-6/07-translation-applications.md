# Translation and Applications

## Translating English to Predicate Logic

Converting natural language to formal logic requires identifying:
1. The **domain** (what are we talking about?)
2. The **predicates** (what properties/relations?)
3. The **quantifiers** (all, some, none?)
4. The **logical structure** (how are parts connected?)

## Standard Translation Patterns

### "All A are B"

$$\forall x \, (A(x) \to B(x))$$

Uses implication because we only care about things that are A.

**Examples:**
- "All dogs bark" → ∀x (Dog(x) → Barks(x))
- "Every prime greater than 2 is odd" → ∀x ((Prime(x) ∧ x>2) → Odd(x))
- "All students in this class passed" → ∀x (InClass(x) → Passed(x))

### "Some A is B"

$$\exists x \, (A(x) \land B(x))$$

Uses conjunction because we need something that is BOTH A and B.

**Examples:**
- "Some dogs are friendly" → ∃x (Dog(x) ∧ Friendly(x))
- "There's a prime that's even" → ∃x (Prime(x) ∧ Even(x))
- "Someone in the room is sleeping" → ∃x (InRoom(x) ∧ Sleeping(x))

### "No A is B"

$$\forall x \, (A(x) \to \neg B(x))$$

or equivalently:

$$\neg \exists x \, (A(x) \land B(x))$$

**Examples:**
- "No cats bark" → ∀x (Cat(x) → ¬Barks(x))
- "No integer squared is negative" → ∀x∈ℤ (x² ≥ 0)

### "Not all A are B"

$$\exists x \, (A(x) \land \neg B(x))$$

**Examples:**
- "Not all birds fly" → ∃x (Bird(x) ∧ ¬Flies(x))
- "Not every student passed" → ∃x (Student(x) ∧ ¬Passed(x))

### "Only A are B"

$$\forall x \, (B(x) \to A(x))$$

Note: The direction of implication flips!

**Examples:**
- "Only students can borrow books" → ∀x (CanBorrow(x) → Student(x))
- "Only mammals are warm-blooded" → ∀x (WarmBlooded(x) → Mammal(x))

## Translation Table Summary

| English | Predicate Logic |
|---------|-----------------|
| All A are B | ∀x (A(x) → B(x)) |
| Some A are B | ∃x (A(x) ∧ B(x)) |
| No A is B | ∀x (A(x) → ¬B(x)) |
| Some A is not B | ∃x (A(x) ∧ ¬B(x)) |
| Only A are B | ∀x (B(x) → A(x)) |
| Not all A are B | ∃x (A(x) ∧ ¬B(x)) |

## Complex Translations

### "If any A is B, then it is C"

$$\forall x \, ((A(x) \land B(x)) \to C(x))$$

"If any student is absent, they fail."
$$\forall x \, ((Student(x) \land Absent(x)) \to Fails(x))$$

### "There is exactly one A"

$$\exists! x \, A(x) \equiv \exists x \, (A(x) \land \forall y \, (A(y) \to y = x))$$

"There's exactly one even prime."

### "Every A has a B"

$$\forall x \, (A(x) \to \exists y \, (B(y) \land R(x,y)))$$

"Every student has an advisor."
$$\forall s \, (Student(s) \to \exists a \, (Advisor(a) \land Advises(a,s)))$$

## Common Mistakes in Translation

### Mistake 1: Wrong connective with ∀

❌ ∀x (Student(x) ∧ Passed(x))
"Everything is a student who passed"

✅ ∀x (Student(x) → Passed(x))
"All students passed"

### Mistake 2: Wrong connective with ∃

❌ ∃x (Bird(x) → CanSwim(x))
Almost always true (any non-bird works!)

✅ ∃x (Bird(x) ∧ CanSwim(x))
"Some bird can swim"

### Mistake 3: Confusing "only" direction

"Only A are B" is NOT "All A are B"

"Only students can vote" means "If you can vote, you're a student."
NOT "If you're a student, you can vote."

## Programming Applications

### Universal Quantification

```python
# ∀x ∈ numbers: x > 0
all(x > 0 for x in numbers)

# ∀x ∈ users: is_active(x) → has_email(x)
all(has_email(u) for u in users if is_active(u))
```

### Existential Quantification

```python
# ∃x ∈ items: is_valid(x)
any(is_valid(item) for item in items)

# ∃x ∈ results: x.error is not None
any(r.error is not None for r in results)
```

### Finding Witnesses

```python
# Find witness for ∃x P(x)
witness = next((x for x in domain if predicate(x)), None)

# Using filter
witnesses = list(filter(predicate, domain))
```

## Database Query Applications

### Universal (NOT EXISTS)

```sql
-- ∀ students: passed their exams
-- "No student exists who didn't pass"
SELECT * FROM students s
WHERE NOT EXISTS (
    SELECT 1 FROM exams e
    WHERE e.student_id = s.id AND e.passed = FALSE
);
```

### Existential (EXISTS)

```sql
-- ∃ customer from New York
SELECT * FROM orders o
WHERE EXISTS (
    SELECT 1 FROM customers c
    WHERE c.id = o.customer_id AND c.city = 'New York'
);
```

### Universal over Related Entities

```sql
-- All orders for a product are shipped
SELECT p.* FROM products p
WHERE NOT EXISTS (
    SELECT 1 FROM orders o
    WHERE o.product_id = p.id AND o.shipped = FALSE
);
```

## Type System Applications

### Generic Types (Universal)

```typescript
// ∀T. T → T (identity for any type)
function identity<T>(x: T): T {
    return x;
}

// ∀T. Array<T> → number (length for any array)
function length<T>(arr: T[]): number {
    return arr.length;
}
```

### Existential Types

```typescript
// ∃T. { value: T, show: T → string }
// "There exists some type T with a value and a way to show it"
interface Showable {
    show(): string;
}
```

## Formal Verification Applications

### Preconditions

```
// ∀x: (x > 0) → function_works(x)
requires: n > 0
function factorial(n: int): int
```

### Postconditions

```
// ∀x ∀result: function_returns(x, result) → property(result)
ensures: result >= 0
function absolute_value(x: int): int
```

### Loop Invariants

```
// ∀i: (0 ≤ i < n) → invariant_holds(i)
while i < n:
    invariant: sum == Σ(arr[0..i])
    sum += arr[i]
    i += 1
```

## Mathematical Definitions Using Quantifiers

### Surjective (Onto)

$$\forall y \in B \, \exists x \in A \, (f(x) = y)$$

### Injective (One-to-One)

$$\forall x_1 \, \forall x_2 \, (f(x_1) = f(x_2) \to x_1 = x_2)$$

### Continuous at Point a

$$\forall \epsilon > 0 \, \exists \delta > 0 \, \forall x \, (|x-a| < \delta \to |f(x)-f(a)| < \epsilon)$$

### Dense Ordering

$$\forall x \, \forall y \, (x < y \to \exists z \, (x < z \land z < y))$$

## Summary

**Translation guidelines:**
- "All A are B" → ∀x (A(x) → B(x))
- "Some A is B" → ∃x (A(x) ∧ B(x))
- "No A is B" → ∀x (A(x) → ¬B(x))
- "Only A are B" → ∀x (B(x) → A(x))

**Common mistakes to avoid:**
- Don't use ∧ with ∀ for "All A are B"
- Don't use → with ∃ for "Some A is B"
- Watch the direction for "only"

**Applications:**
- Programming: all(), any(), list comprehensions
- Databases: EXISTS, NOT EXISTS
- Type systems: generics
- Verification: pre/postconditions
