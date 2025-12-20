---
id: math101-t4-applications
title: "Applications"
order: 7
---

# Applications and Best Practices

## Relations in Databases

### Relational Databases

The "relational" in relational databases refers to mathematical relations:
- A **table** is a relation (subset of a Cartesian product)
- Each **row** is a tuple
- Each **column** is an attribute with a domain

### Example

Students table as a relation R ⊆ ID × Name × GPA:

| ID | Name | GPA |
|----|------|-----|
| 101 | Alice | 3.8 |
| 102 | Bob | 3.5 |
| 103 | Carol | 3.9 |

R = {(101, Alice, 3.8), (102, Bob, 3.5), (103, Carol, 3.9)}

### Foreign Keys as Relations

Foreign keys create relations between tables:

```sql
-- Students(id, name)
-- Enrollments(student_id, course_id)

-- Enrollments defines a relation ⊆ Students × Courses
```

### SQL Joins

Joins correspond to relation composition and products:

```sql
-- Natural join: R ⋈ S (matching on common attributes)
SELECT * FROM Students
JOIN Enrollments ON Students.id = Enrollments.student_id;
```

## Relations in Graph Theory

### Graphs as Relations

**Directed graph:** G = (V, E) where E ⊆ V × V is a relation

**Undirected graph:** Symmetric relation (E = E⁻¹)

### Graph Properties via Relation Properties

| Graph Property | Relation Property |
|----------------|-------------------|
| Self-loops allowed | Reflexive pairs exist |
| No self-loops | Irreflexive |
| Undirected | Symmetric |
| DAG (no cycles) | Transitive closure is antisymmetric |

### Path Problems

**Reachability:** Can we get from u to v?
- Answer: (u, v) ∈ t(E) (transitive closure)

**Shortest path:** Minimum edges from u to v
- Modified closure algorithms track distance

## Equivalence Relations in Practice

### Modular Arithmetic

ℤ/nℤ (integers mod n):
- Used in cryptography (RSA, Diffie-Hellman)
- Hash functions
- Checksums

```python
# Equivalence class representative
def mod_rep(x, n):
    return x % n

# Same equivalence class?
def equivalent_mod(a, b, n):
    return (a - b) % n == 0
```

### Union-Find Data Structure

Maintains equivalence classes dynamically:
- **Union:** Merge two classes
- **Find:** Which class contains an element?

```python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px != py:
            self.parent[px] = py
```

Applications: Kruskal's MST algorithm, connected components, image segmentation.

### String Equivalence

- Case-insensitive comparison: "Hello" ~ "hello"
- Unicode normalization: "é" ~ "e\u0301"
- Anagram equivalence: "listen" ~ "silent"

## Partial Orders in Practice

### Task Scheduling

Dependencies form a partial order:
- Task A must complete before Task B
- A ≤ B means A is a prerequisite for B

**Topological sort:** Linear ordering consistent with partial order

```python
def topological_sort(tasks, dependencies):
    # dependencies: list of (prerequisite, dependent)
    # Return valid execution order
    ...
```

### Version Control

Git commits form a partial order:
- Commit A ≤ Commit B if A is an ancestor of B
- Merge creates elements with multiple predecessors

### Package Dependencies

```
numpy ≤ scipy ≤ machine_learning_lib
      ≤ pandas ≤
```

Package managers compute transitive closure of dependencies.

## Best Practices

### 1. Choose the Right Representation

| Task | Best Representation |
|------|---------------------|
| Checking membership | Set of pairs |
| Checking properties | Matrix |
| Path finding | Adjacency list |
| Visualization | Digraph/Hasse diagram |

### 2. Verify Properties Systematically

For each property, check all required conditions:

```python
def is_reflexive(R, A):
    return all((a, a) in R for a in A)

def is_symmetric(R):
    return all((b, a) in R for (a, b) in R)

def is_transitive(R):
    return all((a, c) in R
               for (a, b) in R
               for (b2, c) in R
               if b == b2)
```

### 3. Use Closures Appropriately

- Need reflexivity? Add identity pairs
- Need symmetry? Add reverse pairs
- Need transitivity? Use Warshall's algorithm

### 4. Recognize Common Relations

| Relation Type | Properties | Example |
|---------------|------------|---------|
| Equivalence | R, S, T | Mod n, same color |
| Partial order | R, AS, T | ⊆, ≤, divides |
| Total order | R, AS, T + total | ≤ on ℝ |
| Strict order | IR, AS, T | <, ⊂ |

### 5. Draw Diagrams

- Digraphs for general relations
- Hasse diagrams for partial orders
- Partition diagrams for equivalence classes

## Common Mistakes

### Mistake 1: Confusing Symmetric and Antisymmetric

- Symmetric: aRb → bRa (both directions)
- Antisymmetric: aRb ∧ bRa → a = b (prohibits both directions for distinct elements)

A relation can be both (identity relation) or neither.

### Mistake 2: Forgetting Vacuous Truth

Antisymmetric is vacuously true for relations with no symmetric pairs:
- {(1, 2), (2, 3)} is antisymmetric (no symmetric pairs to violate)

### Mistake 3: Minimal ≠ Minimum

- **Minimal:** Nothing below it (may not be unique)
- **Minimum:** Below everything (unique if exists)

### Mistake 4: Closure Order Matters

t(s(R)) ≠ s(t(R)) in general. Be careful when combining closures.

## Summary

Relations appear throughout computer science:
- **Databases:** Tables are relations, foreign keys link them
- **Graphs:** Edge sets are relations on vertices
- **Equivalence:** Partitioning, Union-Find, modular arithmetic
- **Partial orders:** Scheduling, dependencies, version control

Best practices:
- Choose appropriate representations
- Verify properties systematically
- Use closure algorithms when needed
- Draw diagrams for intuition
- Avoid common pitfalls around symmetry, antisymmetry, and closures
