---
title: "Interior and Closure"
slug: "interior-closure"
description: "Detailed study of interior, closure, and their properties including the Kuratowski closure axioms"
order: 4
---

# Interior and Closure

## Introduction

Given a subset $A$ of a topological space, we often want to find the "largest open set contained in $A$" or the "smallest closed set containing $A$". These concepts are called the interior and closure, respectively. They are fundamental operations in topology that help us understand the structure of sets.

## Interior

### Definition and Basic Properties

**Definition 4.1 (Interior):** Let $(X, \mathcal{T})$ be a topological space and $A \subseteq X$. The **interior** of $A$, denoted $\text{int}(A)$ or $A^{\circ}$, is the union of all open sets contained in $A$:
$$\text{int}(A) = \bigcup\{U \in \mathcal{T} : U \subseteq A\}$$

Equivalently, $\text{int}(A)$ is the largest open set contained in $A$.

**Example 4.1:** In $\mathbb{R}$ with the standard topology:
- $\text{int}([0, 1]) = (0, 1)$
- $\text{int}((0, 1)) = (0, 1)$
- $\text{int}(\{0\}) = \emptyset$ (no open set is contained in a singleton)
- $\text{int}(\mathbb{Q}) = \emptyset$ (every non-empty open interval contains irrationals)
- $\text{int}([0, 1) \cup (1, 2]) = (0, 1) \cup (1, 2)$

**Theorem 4.1 (Properties of Interior):** Let $(X, \mathcal{T})$ be a topological space and $A, B \subseteq X$. Then:

1. $\text{int}(A) \subseteq A$
2. $\text{int}(A)$ is open
3. $A$ is open if and only if $A = \text{int}(A)$
4. $\text{int}(\text{int}(A)) = \text{int}(A)$ (idempotence)
5. If $A \subseteq B$, then $\text{int}(A) \subseteq \text{int}(B)$ (monotonicity)
6. $\text{int}(A \cap B) = \text{int}(A) \cap \text{int}(B)$
7. $\text{int}(A \cup B) \supseteq \text{int}(A) \cup \text{int}(B)$ (equality need not hold)

**Proof:**

1. By definition, $\text{int}(A)$ is a union of sets contained in $A$, so $\text{int}(A) \subseteq A$.

2. $\text{int}(A)$ is a union of open sets, hence open by axiom T2.

3. ($\Rightarrow$) If $A$ is open, then $A$ is one of the open sets contained in $A$, so $A \subseteq \text{int}(A)$. Combined with (1), we get $A = \text{int}(A)$.

   ($\Leftarrow$) If $A = \text{int}(A)$, then $A$ is open by (2).

4. By (2), $\text{int}(A)$ is open. By (3), $\text{int}(\text{int}(A)) = \text{int}(A)$.

5. If $A \subseteq B$ and $U \subseteq A$ is open, then $U \subseteq B$, so $U$ is one of the open sets in the union defining $\text{int}(B)$. Therefore $\text{int}(A) \subseteq \text{int}(B)$.

6. ($\subseteq$) Since $A \cap B \subseteq A$, we have $\text{int}(A \cap B) \subseteq \text{int}(A)$ by (5). Similarly, $\text{int}(A \cap B) \subseteq \text{int}(B)$. Therefore $\text{int}(A \cap B) \subseteq \text{int}(A) \cap \text{int}(B)$.

   ($\supseteq$) Both $\text{int}(A)$ and $\text{int}(B)$ are open sets. Their intersection $\text{int}(A) \cap \text{int}(B)$ is open and contained in both $A$ and $B$, hence in $A \cap B$. Therefore it's contained in the largest open set in $A \cap B$, which is $\text{int}(A \cap B)$.

7. Since $A \subseteq A \cup B$ and $B \subseteq A \cup B$, we have $\text{int}(A) \subseteq \text{int}(A \cup B)$ and $\text{int}(B) \subseteq \text{int}(A \cup B)$ by (5). Therefore $\text{int}(A) \cup \text{int}(B) \subseteq \text{int}(A \cup B)$.

   For a counterexample to equality, in $\mathbb{R}$, let $A = [0, 1)$ and $B = [1, 2]$. Then $\text{int}(A) = (0, 1)$, $\text{int}(B) = (1, 2)$, and $\text{int}(A \cup B) = (0, 2)$, while $\text{int}(A) \cup \text{int}(B) = (0, 1) \cup (1, 2) \neq (0, 2)$. $\square$

### Interior Points

**Definition 4.2 (Interior Point):** Let $(X, \mathcal{T})$ be a topological space and $A \subseteq X$. A point $x \in X$ is an **interior point** of $A$ if there exists an open set $U$ such that $x \in U \subseteq A$.

**Proposition 4.1:** $\text{int}(A)$ is the set of all interior points of $A$.

**Proof:**
If $x \in \text{int}(A)$, then $x$ is in an open set $U \subseteq A$ (namely $U = \text{int}(A)$ itself), so $x$ is an interior point.

Conversely, if $x$ is an interior point, then there exists open $U$ with $x \in U \subseteq A$. This $U$ is one of the sets in the union defining $\text{int}(A)$, so $x \in \text{int}(A)$. $\square$

## Closure

### Definition and Basic Properties

**Definition 4.3 (Closure):** Let $(X, \mathcal{T})$ be a topological space and $A \subseteq X$. The **closure** of $A$, denoted $\overline{A}$ or $\text{cl}(A)$, is the intersection of all closed sets containing $A$:
$$\overline{A} = \bigcap\{F : F \text{ is closed and } A \subseteq F\}$$

Equivalently, $\overline{A}$ is the smallest closed set containing $A$.

**Example 4.2:** In $\mathbb{R}$ with the standard topology:
- $\overline{(0, 1)} = [0, 1]$
- $\overline{[0, 1]} = [0, 1]$
- $\overline{\{0\}} = \{0\}$
- $\overline{\mathbb{Q}} = \mathbb{R}$ (rationals are dense in reals)
- $\overline{(0, 1) \cup (1, 2)} = [0, 2]$

**Theorem 4.2 (Properties of Closure):** Let $(X, \mathcal{T})$ be a topological space and $A, B \subseteq X$. Then:

1. $A \subseteq \overline{A}$
2. $\overline{A}$ is closed
3. $A$ is closed if and only if $A = \overline{A}$
4. $\overline{\overline{A}} = \overline{A}$ (idempotence)
5. If $A \subseteq B$, then $\overline{A} \subseteq \overline{B}$ (monotonicity)
6. $\overline{A \cup B} = \overline{A} \cup \overline{B}$
7. $\overline{A \cap B} \subseteq \overline{A} \cap \overline{B}$ (equality need not hold)

**Proof:**

1. Every closed set containing $A$ is in the intersection, and $A$ is contained in each of these sets.

2. $\overline{A}$ is an intersection of closed sets, hence closed by axiom F2.

3. ($\Rightarrow$) If $A$ is closed, then $A$ is one of the closed sets containing $A$, so $\overline{A} \subseteq A$. Combined with (1), we get $A = \overline{A}$.

   ($\Leftarrow$) If $A = \overline{A}$, then $A$ is closed by (2).

4. By (2), $\overline{A}$ is closed. By (3), $\overline{\overline{A}} = \overline{A}$.

5. If $A \subseteq B$ and $F$ is closed with $B \subseteq F$, then $A \subseteq F$, so $F$ is one of the closed sets in the intersection defining $\overline{A}$. Therefore $\overline{B} \subseteq F$ implies $\overline{A} \subseteq \overline{B}$.

6. ($\supseteq$) Since $A \subseteq A \cup B$ and $B \subseteq A \cup B$, we have $\overline{A} \subseteq \overline{A \cup B}$ and $\overline{B} \subseteq \overline{A \cup B}$ by (5). Therefore $\overline{A} \cup \overline{B} \subseteq \overline{A \cup B}$.

   ($\subseteq$) Both $\overline{A}$ and $\overline{B}$ are closed. Their union $\overline{A} \cup \overline{B}$ is closed (finite union of closed sets) and contains both $A$ and $B$, hence $A \cup B$. Therefore it contains the smallest closed set containing $A \cup B$, which is $\overline{A \cup B}$.

7. Since $A \cap B \subseteq A$ and $A \cap B \subseteq B$, we have $\overline{A \cap B} \subseteq \overline{A}$ and $\overline{A \cap B} \subseteq \overline{B}$ by (5). Therefore $\overline{A \cap B} \subseteq \overline{A} \cap \overline{B}$.

   For a counterexample to equality, in $\mathbb{R}$, let $A = (0, 1]$ and $B = [1, 2)$. Then $\overline{A} = [0, 1]$, $\overline{B} = [1, 2]$, and $\overline{A} \cap \overline{B} = \{1\}$. But $A \cap B = \{1\}$, so $\overline{A \cap B} = \{1\}$. Actually, this is equality!

   Better example: Let $A = (0, 1)$ and $B = (1, 2)$. Then $\overline{A} = [0, 1]$, $\overline{B} = [1, 2]$, and $\overline{A} \cap \overline{B} = \{1\}$. But $A \cap B = \emptyset$, so $\overline{A \cap B} = \emptyset \neq \{1\}$. $\square$

### Closure Points

**Definition 4.4 (Closure Point):** Let $(X, \mathcal{T})$ be a topological space and $A \subseteq X$. A point $x \in X$ is a **closure point** (or **adherent point**) of $A$ if every open set containing $x$ intersects $A$.

Equivalently, for every open set $U$ with $x \in U$, we have $U \cap A \neq \emptyset$.

**Theorem 4.3:** $\overline{A}$ is the set of all closure points of $A$.

**Proof:**
($\subseteq$) Let $x \in \overline{A}$. Suppose for contradiction that there exists an open set $U$ with $x \in U$ and $U \cap A = \emptyset$. Then $X \setminus U$ is closed and contains $A$ (since $A \subseteq X \setminus U$ is equivalent to $A \cap U = \emptyset$). Therefore $\overline{A} \subseteq X \setminus U$, meaning $x \notin U$, contradiction. Thus every open set containing $x$ intersects $A$.

($\supseteq$) Suppose every open set containing $x$ intersects $A$. Assume for contradiction that $x \notin \overline{A}$. Then $x \in X \setminus \overline{A}$, which is open (since $\overline{A}$ is closed). So $X \setminus \overline{A}$ is an open set containing $x$. By hypothesis, $(X \setminus \overline{A}) \cap A \neq \emptyset$, meaning there exists $y \in A$ with $y \notin \overline{A}$. But $A \subseteq \overline{A}$, contradiction. Therefore $x \in \overline{A}$. $\square$

**Example 4.3:** In $\mathbb{R}$ with the standard topology:
- Every point in $[0, 1]$ is a closure point of $(0, 1)$
- $0$ is a closure point of $(0, 1)$ because every interval $(0 - \epsilon, 0 + \epsilon) = (-\epsilon, \epsilon)$ intersects $(0, 1)$
- $2$ is not a closure point of $(0, 1)$ because $(1.5, 2.5)$ is an open set containing $2$ that doesn't intersect $(0, 1)$

## Relationship Between Interior and Closure

**Theorem 4.4 (Interior-Closure Duality):** Let $(X, \mathcal{T})$ be a topological space and $A \subseteq X$. Then:
$$X \setminus \overline{A} = \text{int}(X \setminus A)$$
$$X \setminus \text{int}(A) = \overline{X \setminus A}$$

**Proof:**
We prove the first equality; the second is similar.

Let $x \in X \setminus \overline{A}$. Then $x \notin \overline{A}$, so there exists an open set $U$ with $x \in U$ and $U \cap A = \emptyset$. Thus $U \subseteq X \setminus A$. Since $U$ is open and contained in $X \setminus A$, we have $U \subseteq \text{int}(X \setminus A)$. Therefore $x \in \text{int}(X \setminus A)$.

Conversely, let $x \in \text{int}(X \setminus A)$. Then there exists an open set $U$ with $x \in U \subseteq X \setminus A$. Thus $U \cap A = \emptyset$. By Theorem 4.3, this means $x$ is not a closure point of $A$, so $x \notin \overline{A}$. $\square$

**Corollary 4.1:**
$$\overline{A} = X \setminus \text{int}(X \setminus A)$$
$$\text{int}(A) = X \setminus \overline{X \setminus A}$$

This duality shows that interior and closure are "dual" operations related by complementation.

**Example 4.4:** In $\mathbb{R}$, for $A = (0, 1)$:
- $\overline{A} = [0, 1]$
- $X \setminus A = (-\infty, 0] \cup [1, \infty)$
- $\text{int}(X \setminus A) = (-\infty, 0) \cup (1, \infty)$
- $X \setminus \text{int}(X \setminus A) = [0, 1] = \overline{A}$ ✓

## Closure in Metric Spaces

For metric spaces, closure has a sequential characterization.

**Theorem 4.5 (Sequential Characterization of Closure):** Let $(X, d)$ be a metric space with the metric topology, and let $A \subseteq X$. Then $x \in \overline{A}$ if and only if there exists a sequence $(x_n)$ in $A$ converging to $x$.

**Proof:**
($\Rightarrow$) Suppose $x \in \overline{A}$. For each $n \in \mathbb{N}$, the open ball $B(x, 1/n)$ contains $x$, so by Theorem 4.3, $B(x, 1/n) \cap A \neq \emptyset$. Choose $x_n \in B(x, 1/n) \cap A$. Then $d(x_n, x) < 1/n \to 0$, so $x_n \to x$.

($\Leftarrow$) Suppose $(x_n)$ is a sequence in $A$ with $x_n \to x$. Let $U$ be any open set containing $x$. Since $U$ is open, there exists $\epsilon > 0$ such that $B(x, \epsilon) \subseteq U$. Since $x_n \to x$, there exists $N$ such that for all $n > N$, $d(x_n, x) < \epsilon$, meaning $x_n \in B(x, \epsilon) \subseteq U$. Thus $x_n \in U \cap A$, so $U \cap A \neq \emptyset$. By Theorem 4.3, $x \in \overline{A}$. $\square$

**Example 4.5:** In $\mathbb{R}$:
- $\overline{\mathbb{Q}} = \mathbb{R}$ because every real number is the limit of a sequence of rationals (e.g., decimal approximations)
- $\overline{(0, 1)} = [0, 1]$ because we can construct sequences approaching $0$ and $1$ (like $x_n = 1/n$ and $y_n = 1 - 1/n$)

## Kuratowski Closure Axioms

Remarkably, we can define a topology entirely in terms of a closure operation.

**Theorem 4.6 (Kuratowski Closure Axioms):** Let $X$ be a set and $\text{cl}: \mathcal{P}(X) \to \mathcal{P}(X)$ be a function satisfying:

1. $\text{cl}(\emptyset) = \emptyset$
2. $A \subseteq \text{cl}(A)$ for all $A \subseteq X$
3. $\text{cl}(\text{cl}(A)) = \text{cl}(A)$ for all $A \subseteq X$
4. $\text{cl}(A \cup B) = \text{cl}(A) \cup \text{cl}(B)$ for all $A, B \subseteq X$

Then there exists a unique topology $\mathcal{T}$ on $X$ such that $\text{cl}(A) = \overline{A}$ for all $A \subseteq X$.

**Proof (Sketch):** Define $\mathcal{T} = \{U \subseteq X : \text{cl}(X \setminus U) = X \setminus U\}$. One can verify that this is a topology and that the closure operation in this topology coincides with $\text{cl}$. The details are lengthy but straightforward. $\square$

This theorem shows that closure is as fundamental as open sets for defining topology.

## Dense Sets

**Definition 4.5 (Dense Set):** A subset $A$ of a topological space $X$ is **dense** if $\overline{A} = X$.

Equivalently, $A$ is dense if every non-empty open set intersects $A$.

**Example 4.6:**
- $\mathbb{Q}$ is dense in $\mathbb{R}$ (with standard topology)
- $\mathbb{R} \setminus \mathbb{Q}$ (irrationals) is also dense in $\mathbb{R}$
- In the discrete topology, the only dense set is $X$ itself
- In the indiscrete topology, every non-empty set is dense

**Proposition 4.2:** $A$ is dense in $X$ if and only if for every non-empty open set $U$, we have $U \cap A \neq \emptyset$.

**Proof:**
By definition, $\overline{A} = X$ means every point of $X$ is a closure point of $A$. By Theorem 4.3, this means every open set containing any point of $X$ intersects $A$. This is equivalent to every non-empty open set intersecting $A$. $\square$

## Nowhere Dense Sets

**Definition 4.6 (Nowhere Dense):** A subset $A$ of a topological space $X$ is **nowhere dense** if $\text{int}(\overline{A}) = \emptyset$.

Equivalently, $A$ is nowhere dense if its closure has empty interior.

**Example 4.7:**
- $\mathbb{Z}$ is nowhere dense in $\mathbb{R}$ because $\overline{\mathbb{Z}} = \mathbb{Z}$ and $\text{int}(\mathbb{Z}) = \emptyset$
- $\{0\}$ is nowhere dense in $\mathbb{R}$
- The Cantor set is nowhere dense in $\mathbb{R}$ (this is a classic example we'll explore later)
- $\mathbb{Q}$ is NOT nowhere dense in $\mathbb{R}$ because $\overline{\mathbb{Q}} = \mathbb{R}$ and $\text{int}(\mathbb{R}) = \mathbb{R} \neq \emptyset$

## Summary

Key concepts:

1. **Interior** $\text{int}(A)$ - largest open set in $A$
2. **Closure** $\overline{A}$ - smallest closed set containing $A$
3. **Duality** - interior and closure are related by complementation
4. **Sequential characterization** - in metric spaces, closure can be described via convergent sequences
5. **Kuratowski axioms** - closure can be axiomatized independently
6. **Dense sets** - sets whose closure is the whole space
7. **Nowhere dense sets** - sets whose closure has empty interior

These concepts are essential for understanding continuity, compactness, and connectedness in topology.
