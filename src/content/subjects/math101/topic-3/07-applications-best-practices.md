# Applications and Best Practices

## Sets in Computer Science

### Data Structures

Most programming languages provide set data structures:

**Python:**
```python
# Creating sets
A = {1, 2, 3}
B = {3, 4, 5}

# Operations
A | B   # Union: {1, 2, 3, 4, 5}
A & B   # Intersection: {3}
A - B   # Difference: {1, 2}
A ^ B   # Symmetric difference: {1, 2, 4, 5}

# Membership
3 in A  # True
6 in A  # False

# Subset
{1, 2} <= A  # True (subset)
{1, 2} < A   # True (proper subset)
```

**JavaScript:**
```javascript
const A = new Set([1, 2, 3]);
const B = new Set([3, 4, 5]);

// Union
const union = new Set([...A, ...B]);

// Intersection
const intersection = new Set([...A].filter(x => B.has(x)));

// Difference
const difference = new Set([...A].filter(x => !B.has(x)));
```

### When to Use Sets

Use sets when:
- You need to eliminate duplicates
- You need fast membership testing (O(1) average for hash sets)
- You need to perform set operations (union, intersection)
- Order doesn't matter

```python
# Removing duplicates
list_with_dupes = [1, 2, 2, 3, 3, 3]
unique_items = list(set(list_with_dupes))  # [1, 2, 3]

# Finding common elements
users_A = {"alice", "bob", "charlie"}
users_B = {"bob", "david", "eve"}
common = users_A & users_B  # {"bob"}
```

## Sets in Databases

### SQL Set Operations

SQL directly implements set operations:

```sql
-- Union (removes duplicates)
SELECT name FROM customers_2023
UNION
SELECT name FROM customers_2024;

-- Intersection
SELECT name FROM customers_2023
INTERSECT
SELECT name FROM customers_2024;

-- Difference
SELECT name FROM customers_2023
EXCEPT
SELECT name FROM customers_2024;

-- Union All (keeps duplicates, not a true set operation)
SELECT name FROM customers_2023
UNION ALL
SELECT name FROM customers_2024;
```

### WHERE Clauses and Sets

WHERE clauses define sets via predicates:

```sql
-- Set builder notation: {x ∈ employees : x.salary > 50000}
SELECT * FROM employees WHERE salary > 50000;

-- Intersection: high salary AND remote
SELECT * FROM employees
WHERE salary > 50000 AND remote = true;

-- Union: high salary OR manager
SELECT * FROM employees
WHERE salary > 50000 OR role = 'manager';
```

## Sets in Probability

### Sample Spaces and Events

- **Sample space** (S or Ω): Set of all possible outcomes
- **Event**: A subset of the sample space
- **Elementary event**: A singleton subset {ω}

### Example: Rolling a Die

S = {1, 2, 3, 4, 5, 6}

Events:
- A = {2, 4, 6} (rolling even)
- B = {1, 2, 3} (rolling ≤ 3)
- A ∩ B = {2} (rolling even AND ≤ 3)
- A ∪ B = {1, 2, 3, 4, 6} (rolling even OR ≤ 3)

### Probability Formulas

$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

This is inclusion-exclusion applied to probability!

## Sets in Logic

### Propositional Logic Connection

There's a direct correspondence between set operations and logical connectives:

| Set Operation | Logical Connective |
|---------------|-------------------|
| A ∪ B | p ∨ q |
| A ∩ B | p ∧ q |
| Ā | ¬p |
| A ⊆ B | p → q |
| A = B | p ↔ q |

De Morgan's Laws work identically:
- $\overline{A ∪ B} = \overline{A} ∩ \overline{B}$ ↔ ¬(p ∨ q) ≡ ¬p ∧ ¬q
- $\overline{A ∩ B} = \overline{A} ∪ \overline{B}$ ↔ ¬(p ∧ q) ≡ ¬p ∨ ¬q

## Counting Problems

### Inclusion-Exclusion Principle

For counting elements in unions:

**Two sets:**
$$|A \cup B| = |A| + |B| - |A \cap B|$$

**Three sets:**
$$|A \cup B \cup C| = |A| + |B| + |C| - |A \cap B| - |A \cap C| - |B \cap C| + |A \cap B \cap C|$$

### Example Problem

In a class of 30 students:
- 18 study math
- 15 study physics
- 10 study both

How many study at least one subject?

|M ∪ P| = |M| + |P| - |M ∩ P| = 18 + 15 - 10 = 23

How many study neither?
30 - 23 = 7

## Best Practices

### 1. Choose the Right Notation

- Use roster notation {1, 2, 3} for small finite sets
- Use set-builder {x : P(x)} for infinite sets or complex definitions
- Use interval notation [a, b] for real number intervals

### 2. Be Precise About the Universal Set

The complement Ā depends on what U is. Always clarify the context.

### 3. Remember Sets Have No Duplicates or Order

- {1, 1, 2} = {1, 2}
- {1, 2, 3} = {3, 1, 2}
- If order matters, use sequences or tuples instead

### 4. Use Venn Diagrams for Intuition

Venn diagrams help visualize:
- Which regions are included in an operation
- Whether two expressions are equivalent
- Relationships between sets

### 5. Verify with Small Examples

Before proving an identity, test it:

Is (A ∪ B) - C = (A - C) ∪ (B - C)?

Test with A = {1, 2}, B = {2, 3}, C = {2}:
- A ∪ B = {1, 2, 3}
- (A ∪ B) - C = {1, 3}
- A - C = {1}, B - C = {3}
- (A - C) ∪ (B - C) = {1, 3} ✓

### 6. Apply De Morgan's Laws Systematically

When negating compound set expressions:
1. Push the complement through each operation
2. Swap ∪ ↔ ∩
3. Complement each set

## Common Mistakes to Avoid

### Mistake 1: Confusing ∈ and ⊆

- x ∈ A: x is an element of A
- B ⊆ A: B is a subset of A

{1} ∈ {{1}, {2}} but {1} ⊆ {1, 2}

### Mistake 2: Forgetting ∅ ∈ P(A)

The empty set is a subset of every set, so it's always in the power set.

### Mistake 3: Assuming A × B = B × A

Cartesian products are NOT commutative (order matters in pairs).

### Mistake 4: Wrong Cardinality of P(∅)

P(∅) = {∅}, which has 1 element, not 0.

## Summary

Sets appear throughout computer science and mathematics:
- **Data structures**: HashSet, TreeSet for efficient operations
- **Databases**: SQL UNION, INTERSECT, EXCEPT
- **Probability**: Events are sets of outcomes
- **Logic**: Direct correspondence with connectives
- **Counting**: Inclusion-exclusion principle

Best practices:
- Choose appropriate notation for clarity
- Specify the universal set when using complements
- Test identities with concrete examples
- Use Venn diagrams for intuition
- Remember: no duplicates, no order in sets
