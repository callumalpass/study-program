## Introduction

Sets are the fundamental discrete structure upon which all other discrete structures are built. A set is simply an unordered collection of distinct objects. Understanding sets is crucial for understanding databases, data types, and algorithms.

**Learning Objectives:**
- Define sets using roster and set-builder notation
- Perform set operations (Union, Intersection, Difference)
- Understand Subsets and Power Sets
- Calculate Cardinality
- Compute Cartesian Products

---

## Core Concepts

### Defining Sets

- **Roster Method:** Listing elements. $A = \{1, 3, 5, 7\}$
- **Set-Builder:** Describing properties. $B = \{x \in \mathbb{Z} \mid x > 0 \land x \text{ is even}\}$
- **Empty Set (\(\emptyset\)):** The set with no elements. \{\}
- **Universal Set (\(U\)):** The set containing all objects under consideration.

### Subsets
$A \subseteq B$ ($A$ is a subset of $B$) if every element of $A$ is also in $B$.
- **Proper Subset (\(A \subset B\)):** $A \subseteq B$ but $A \neq B$.

### Power Set
The Power Set of $S$, denoted \(\mathcal{P}(S)\), is the set of *all* subsets of $S$.
If $|S| = n$, then $|P(S)| = 2^n$.

*Example:* $S = \{a, b\}$
$P(S) = \{\emptyset, \{a\}, \{b\}, \{a, b\}\}$

### Set Operations

| Operation | Symbol | Definition |
| :--- | :---: | :--- |
| **Union** | $A \cup B$ | Elements in $A$ OR $B$ |
| **Intersection** | $A \cap B$ | Elements in $A$ AND $B$ |
| **Difference** | $A - B$ | Elements in $A$ but NOT in $B$ |
| **Complement** | $\overline{A}$ or $A^c$ | Elements in $U$ but NOT in $A$ |

### Cartesian Product
$A \times B = \{(a, b) \mid a \in A, b \in B\}$.
The set of all ordered pairs.
$|A \times B| = |A| \cdot |B|$.

---

## Common Patterns and Idioms

### Inclusion-Exclusion Principle
To count the size of a union:
$|A \cup B| = |A| + |B| - |A \cap B|$
(We subtract the intersection so we don't count the overlapping elements twice.)

---

## Common Mistakes and Debugging

### Mistake 1: $\emptyset$ vs \(\{\emptyset\}
- $\emptyset$ is an empty box. Size = 0.
- \(\{\emptyset\}\) is a box containing an empty box. Size = 1.
They are NOT the same.

### Mistake 2: Ordered vs Unordered
Sets are unordered. \{1, 2\} = \{2, 1\}.
Tuples (from Cartesian products) are ordered. (1, 2) \neq (2, 1).

---

## Summary

- Sets collect objects.
- **Power sets** grow exponentially.
- **Venn diagrams** visualize relationships.
- Set operations mirror logical operations ($U \leftrightarrow \lor$, $\cap \leftrightarrow \land$).
