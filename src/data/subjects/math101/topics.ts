import { Topic } from '../../../core/types';

export const math101Topics: Topic[] = [
  {
    id: 'math101-topic-1',
    title: 'Propositional Logic',
    content: String.raw`## Introduction

Propositional logic is the bedrock of mathematical reasoning and computer science. It provides a formal language for representing knowledge and a system for precise deduction. In this topic, we explore how to construct complex logical statements from simple propositions and analyzing their truth values.

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

**Examples:**
- "Paris is in France." (True proposition)
- "2 + 2 = 5." (False proposition)
- "Close the door." (Not a proposition - it's a command)

We build compound propositions using logical operators (connectives):

| Connective | Name | Symbol | Meaning |
| :--- | :--- | :---: | :--- |
| **Negation** | NOT | $\neg p$ | Not $p$ |
| **Conjunction** | AND | $p \land q$ | $p$ and $q$ |
| **Disjunction** | OR | $p \lor q$ | $p$ or $q$ (inclusive) |
| **Implication** | IMPLIES | $p \to q$ | If $p$, then $q$ |
| **Biconditional** | IFF | $p \leftrightarrow q$ | $p$ if and only if $q$ |

### Truth Tables

Truth tables list all possible truth values for the variables in a proposition.

**Implication ($p \to q$):**
The statement "If it rains, I will bring an umbrella" is only false if it rains ($T$) but I *don't* bring an umbrella ($F$).

| $p$ | $q$ | $p \to q$ |
| :---: | :---: | :---: |
| T | T | T |
| T | F | F |
| F | T | T |
| F | F | T |

### Logical Equivalence

Two propositions are **logically equivalent** ($\equiv$) if they have the same truth values in all possible scenarios.

**Key Equivalences:**
- **De Morgan's Laws:**
  - $\neg(p \land q) \equiv \neg p \lor \neg q$
  - $\neg(p \lor q) \equiv \neg p \land \neg q$
- **Contrapositive:**
  - $p \to q \equiv \neg q \to \neg p$

---

## Common Patterns and Idioms

### Translating English to Logic

English is often ambiguous; logic is precise.
- "You can have soup or salad" usually means exclusive OR (XOR) in a restaurant context, but logical OR is inclusive.
- "$p$ is necessary for $q$" translates to $q \to p$.
- "$p$ is sufficient for $q$" translates to $p \to q$.

### Tautologies and Contradictions

- **Tautology:** A statement that is always true (e.g., $p \lor \neg p$).
- **Contradiction:** A statement that is always false (e.g., $p \land \neg p$).
- **Contingency:** A statement that is neither.

---

## Common Mistakes and Debugging

### Mistake 1: Confusing $\to$ with $\leftrightarrow$
"If it is a square, it is a rectangle" ($p \to q$) is true.
"If it is a rectangle, it is a square" ($q \to p$) is false.
They are not equivalent.

### Mistake 2: Negating Implications
The negation of "If $p$, then $q$" is NOT "If $p$, then not $q$".
It is "$p$ and not $q$".
$\neg(p \to q) \equiv p \land \neg q$

---

## Summary

- **Propositions** are the atoms of logic.
- **Truth tables** provide a rigorous method to verify truth values.
- **Logical equivalence** allows us to simplify complex expressions.
- **Implication** is the foundation of mathematical proof structures.`,
    quizIds: ['math101-quiz-1'],
    exerciseIds: [
      'math101-t1-drill-1',
      'math101-t1-drill-2',
      'math101-t1-drill-3',
      'math101-t1-drill-4',
      'math101-ex-1',
      'math101-t1-ex02',
      'math101-t1-ex03',
      'math101-t1-ex04',
      'math101-t1-ex05',
      'math101-t1-ex06',
      'math101-t1-ex07',
      'math101-t1-ex08',
      'math101-t1-ex09',
      'math101-t1-ex10',
      'math101-t1-ex11',
      'math101-t1-ex12',
      'math101-t1-ex13',
      'math101-t1-ex14',
      'math101-t1-ex15',
      'math101-t1-ex16'
    ]
  },
  {
    id: 'math101-topic-2',
    title: 'Proof Techniques',
    content: String.raw`## Introduction

A mathematical proof is a logical argument that demonstrates the truth of a statement beyond any doubt. Unlike science, which relies on empirical evidence, mathematics relies on deductive reasoning. This topic covers the standard toolbox of techniques used to prove theorems.

**Learning Objectives:**
- Construct Direct Proofs
- Use Proof by Contrapositive
- Use Proof by Contradiction
- Apply Mathematical Induction
- Disprove statements using Counterexamples

---

## Core Concepts

### Direct Proof
Assume the hypothesis $P$ is true, then use axioms, definitions, and logical steps to show the conclusion $Q$ is true.

*Example: Prove that if $n$ is an even integer, then $n^2$ is even.*
1. Assume $n$ is even. Then $n = 2k$ for some integer $k$.
2. Square both sides: $n^2 = (2k)^2 = 4k^2$.
3. Factor out 2: $n^2 = 2(2k^2)$.
4. Since $2k^2$ is an integer, $n^2$ is 2 times an integer.
5. Therefore, $n^2$ is even.

### Proof by Contrapositive
Instead of proving $P \to Q$, we prove the logically equivalent $\neg Q \to \neg P$.

*Example: Prove that if $n^2$ is even, then $n$ is even.*
1. Contrapositive: If $n$ is odd, then $n^2$ is odd.
2. Assume $n$ is odd: $n = 2k + 1$.
3. $n^2 = (2k+1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1$.
4. This is of the form $2m + 1$, so $n^2$ is odd.
5. Therefore, the original statement is true.

### Proof by Contradiction
Assume the statement is False, and deduce a logical contradiction (e.g., $1=0$ or $P \land \neg P$).

*Example: Prove $\sqrt{2}$ is irrational.*
1. Assume $\sqrt{2}$ is rational: $\sqrt{2} = a/b$ in lowest terms.
2. $2 = a^2/b^2 \implies a^2 = 2b^2$. So $a$ is even.
3. Let $a = 2k$. Then $(2k)^2 = 2b^2 \implies 4k^2 = 2b^2 \implies 2k^2 = b^2$.
4. So $b$ must also be even.
5. Contradiction! We assumed $a/b$ was in lowest terms, but both are divisible by 2.

### Mathematical Induction
Used to prove $P(n)$ for all natural numbers $n$.
1. **Base Case:** Show $P(0)$ or $P(1)$ is true.
2. **Inductive Step:** Assume $P(k)$ is true (Inductive Hypothesis). Show that $P(k+1)$ must be true.

---

## Common Patterns and Idioms

### "Without Loss of Generality" (WLOG)
Used when a proof has symmetric cases. Instead of proving all of them, you prove one and state that the others follow identically.

### Existence and Uniqueness
To prove "there exists a unique $x$":
1. **Existence:** Show at least one $x$ works.
2. **Uniqueness:** Assume two solutions $x$ and $y$ exist, then prove $x = y$.

---

## Common Mistakes and Debugging

### Mistake 1: Proving by Example
Showing a statement works for $n=1, 2, 3$ does NOT prove it for all $n$.
*Counterexample:* $n^2 + n + 41$ generates primes for $n=0$ to $39$, but fails at $n=40$.

### Mistake 2: Begging the Question (Circular Reasoning)
Using the statement you are trying to prove as a step in its own proof.

---

## Summary

- **Direct Proof:** The standard approach.
- **Contrapositive:** Good for "If... then..." when direct is hard.
- **Contradiction:** Powerful "last resort" technique.
- **Induction:** Essential for infinite sequences and recursive structures.`,
    quizIds: ['math101-quiz-2'],
    exerciseIds: ['math101-ex-2', 'math101-t2-ex02', 'math101-t2-ex03', 'math101-t2-ex04', 'math101-t2-ex05', 'math101-t2-ex06', 'math101-t2-ex07', 'math101-t2-ex08']
  },
  {
    id: 'math101-topic-3',
    title: 'Sets and Set Operations',
    content: String.raw`## Introduction

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
- **Empty Set ($\emptyset$):** The set with no elements. $\{\}$
- **Universal Set ($U$):** The set containing all objects under consideration.

### Subsets
$A \subseteq B$ ($A$ is a subset of $B$) if every element of $A$ is also in $B$.
- **Proper Subset ($A \subset B$):** $A \subseteq B$ but $A \neq B$.

### Power Set
The Power Set of $S$, denoted $\mathcal{P}(S)$, is the set of *all* subsets of $S$.
If $|S| = n$, then $|\mathcal{P}(S)| = 2^n$.

*Example:* $S = \{a, b\}$
$\mathcal{P}(S) = \{\emptyset, \{a\}, \{b\}, \{a, b\}\}$

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

### Mistake 1: $\emptyset$ vs $\{\emptyset\}$
- $\emptyset$ is an empty box. Size = 0.
- $\{\emptyset\}$ is a box containing an empty box. Size = 1.
They are NOT the same.

### Mistake 2: Ordered vs Unordered
Sets are unordered. $\{1, 2\} = \{2, 1\}$.
Tuples (from Cartesian products) are ordered. $(1, 2) \neq (2, 1)$.

---

## Summary

- Sets collect objects.
- **Power sets** grow exponentially.
- **Venn diagrams** visualize relationships.
- Set operations mirror logical operations ($U \leftrightarrow \lor$, $\cap \leftrightarrow \land$).`,
    quizIds: ['math101-quiz-3'],
    exerciseIds: ['math101-ex-3', 'math101-t3-ex02', 'math101-t3-ex03', 'math101-t3-ex04', 'math101-t3-ex05', 'math101-t3-ex06', 'math101-t3-ex07', 'math101-t3-ex08']
  },
  {
    id: 'math101-topic-4',
    title: 'Relations',
    content: String.raw`## Introduction

Relationships between objects are everywhere: "is less than", "is a subset of", "is connected to". In mathematics, we formalize this using **Relations**. A relation defines links between elements of sets.

**Learning Objectives:**
- Define relations as subsets of Cartesian products
- Represent relations using matrices and directed graphs (digraphs)
- Identify properties: Reflexive, Symmetric, Transitive, Antisymmetric
- Understand Equivalence Relations and Partitions
- Understand Partial Orders

---

## Core Concepts

### Definition
A relation $R$ on a set $A$ is a subset of $A \times A$.
We write $a R b$ if $(a, b) \in R$.

### Properties of Relations

1.  **Reflexive:** $\forall a \in A, (a, a) \in R$.
    *   *Every element is related to itself.*
2.  **Symmetric:** $\forall a, b \in A, (a, b) \in R \to (b, a) \in R$.
    *   *If a is related to b, b is related to a.*
3.  **Antisymmetric:** $\forall a, b \in A, [(a, b) \in R \land (b, a) \in R] \to a = b$.
    *   *No distinct pair is related in both directions.*
4.  **Transitive:** $\forall a, b, c \in A, [(a, b) \in R \land (b, c) \in R] \to (a, c) \in R$.
    *   *If a->b and b->c, then a->c.*

### Equivalence Relations
A relation that is **Reflexive**, **Symmetric**, and **Transitive**.
*Example:* "Has the same birthday as", "Is congruent to (mod n)".
Equivalence relations partition a set into disjoint **Equivalence Classes**.

### Partial Orders (Posets)
A relation that is **Reflexive**, **Antisymmetric**, and **Transitive**.
*Example:* $\le$ (less than or equal), $\subseteq$ (subset).
Used to order elements where not every pair needs to be comparable.

---

## Common Patterns and Idioms

### Matrix Representation
For a set $A = \{1, 2, 3\}$, a relation can be an $n \times n$ matrix $M$.
$M_{ij} = 1$ if $(i, j) \in R$, else 0.
- Reflexive: Diagonal is all 1s.
- Symmetric: Matrix is symmetric ($M = M^T$).

### Digraph Representation
Nodes are elements of $A$. Directed edges represent the relation.
- Reflexive: Every node has a self-loop.
- Transitive: If there's a path from $a$ to $c$, there's a direct edge $a \to c$.

---

## Common Mistakes and Debugging

### Mistake 1: Symmetric vs Antisymmetric
A relation can be:
- Both (Equality: $a=b$)
- Neither (e.g., Pre-orders)
Antisymmetric does NOT mean "not symmetric". It means "no two-way streets unless it's a cul-de-sac".

---

## Summary

- **Relations** generalize functions.
- **Properties** classify relations.
- **Equivalence relations** group similar objects.
- **Partial orders** arrange objects in a hierarchy.`,
    quizIds: ['math101-quiz-4'],
    exerciseIds: ['math101-ex-4', 'math101-t4-ex02', 'math101-t4-ex03', 'math101-t4-ex04', 'math101-t4-ex05', 'math101-t4-ex06', 'math101-t4-ex07', 'math101-t4-ex08']
  },
  {
    id: 'math101-topic-5',
    title: 'Functions',
    content: String.raw`## Introduction

Functions are a special type of relation that assign exactly one output to every input. They are central to calculus, linear algebra, and computer science (think "methods" or "subroutines").

**Learning Objectives:**
- Define Domain, Codomain, and Range
- Identify Injective (One-to-One), Surjective (Onto), and Bijective functions
- Compose functions
- Find Inverse functions
- Understand Floor and Ceiling functions

---

## Core Concepts

### Definition
A function $f: A \to B$ assigns each $a \in A$ to a unique $b \in B$.
- **Domain:** Set $A$.
- **Codomain:** Set $B$.
- **Range (Image):** The set of actual values mapped to $\{f(a) \mid a \in A\}$. Note: Range $\subseteq$ Codomain.

### Types of Functions

1.  **Injective (One-to-One):**
    Distinct inputs map to distinct outputs.
    $\forall x, y \in A, f(x) = f(y) \implies x = y$.
    *Horizontal Line Test passes (at most 1 intersection).*

2.  **Surjective (Onto):**
    Every element in the codomain is "hit" by the function.
    $\forall b \in B, \exists a \in A$ such that $f(a) = b$.
    *Range = Codomain.*

3.  **Bijective:**
    Both Injective and Surjective.
    A perfect one-to-one correspondence.
    *Only bijective functions have inverses.*

### Composition
$(f \circ g)(x) = f(g(x))$.
Order matters! $(f \circ g)$ usually $\neq (g \circ f)$.

### Inverse Functions
If $f: A \to B$ is bijective, $f^{-1}: B \to A$ exists.
$f(a) = b \iff f^{-1}(b) = a$.

---

## Common Patterns and Idioms

### Floor and Ceiling
Used constantly in CS (e.g., analyzing algorithms).
- **Floor ($\lfloor x \rfloor$):** Greatest integer $\le x$.
  - $\lfloor 2.9 \rfloor = 2$
- **Ceiling ($\lceil x \rceil$):** Smallest integer $\ge x$.
  - $\lceil 2.1 \rceil = 3$

### Pigeonhole Principle
If $k+1$ objects are placed into $k$ boxes, at least one box contains 2 or more objects.
*Simple but powerful proof technique.*

---

## Common Mistakes and Debugging

### Mistake 1: Codomain vs Range
They are not the same!
$f(x) = x^2$ from $\mathbb{R} \to \mathbb{R}$.
- Codomain: All real numbers.
- Range: Non-negative real numbers $[0, \infty)$.
Therefore, it is not surjective.

### Mistake 2: Inverse of Non-Bijective Functions
You cannot define a standard inverse if the function is not one-to-one (ambiguity) or not onto (undefined inputs).

---

## Summary

- **Functions** are deterministic mappings.
- **Injection/Surjection/Bijection** describe how the domain maps to the codomain.
- **Composition** chains functions together.
- **Inverse** reverses the process (only for bijections).`,
    quizIds: ['math101-quiz-5'],
    exerciseIds: ['math101-ex-5', 'math101-t5-ex02', 'math101-t5-ex03', 'math101-t5-ex04', 'math101-t5-ex05', 'math101-t5-ex06', 'math101-t5-ex07', 'math101-t5-ex08']
  }
];
