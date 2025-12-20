---
id: math202-t1-sample-spaces
title: "Sample Spaces and Events"
order: 1
---

# Sample Spaces and Events

## Introduction

The foundation of probability theory rests on the concepts of sample spaces and events. Before we can assign probabilities to outcomes, we must first understand what those outcomes are and how they can be organized and manipulated. This subtopic introduces the fundamental building blocks of probability: the sample space, events, and the set operations that allow us to combine and analyze them.

## Sample Spaces

A **sample space** is the set of all possible outcomes of a random experiment. We typically denote the sample space by $S$ or $\Omega$.

### Types of Sample Spaces

**Finite Sample Spaces**: When the number of possible outcomes is finite.

**Example 1**: Rolling a standard six-sided die
$$S = \{1, 2, 3, 4, 5, 6\}$$

**Example 2**: Flipping a coin twice
$$S = \{HH, HT, TH, TT\}$$

**Countably Infinite Sample Spaces**: When outcomes can be listed in a sequence.

**Example 3**: Number of coin flips until the first heads appears
$$S = \{1, 2, 3, 4, \ldots\}$$

**Uncountably Infinite Sample Spaces**: When outcomes form a continuum.

**Example 4**: Measuring the exact time until a radioactive particle decays
$$S = [0, \infty)$$

## Events

An **event** is a subset of the sample space. Events are typically denoted by capital letters like $A$, $B$, $C$, etc.

### Types of Events

**Simple Event**: Contains exactly one outcome.
- Example: Rolling a 4 on a die: $A = \{4\}$

**Compound Event**: Contains more than one outcome.
- Example: Rolling an even number: $B = \{2, 4, 6\}$

**Certain Event**: The entire sample space $S$ (always occurs).

**Impossible Event**: The empty set $\emptyset$ (never occurs).

## Set Operations on Events

Since events are sets, we can use set operations to create new events from existing ones.

### Union

The **union** of events $A$ and $B$, denoted $A \cup B$, is the event that occurs when either $A$ or $B$ (or both) occurs.

$$A \cup B = \{x : x \in A \text{ or } x \in B\}$$

**Example**: For a die roll, let $A = \{2, 4, 6\}$ (even numbers) and $B = \{1, 2, 3\}$ (numbers ≤ 3).
$$A \cup B = \{1, 2, 3, 4, 6\}$$

This represents rolling a number that is either even or at most 3.

### Intersection

The **intersection** of events $A$ and $B$, denoted $A \cap B$, is the event that occurs when both $A$ and $B$ occur.

$$A \cap B = \{x : x \in A \text{ and } x \in B\}$$

**Example**: Using the same events as above:
$$A \cap B = \{2\}$$

This represents rolling a number that is both even and at most 3.

### Complement

The **complement** of event $A$, denoted $A^c$ or $\bar{A}$, is the event that $A$ does not occur.

$$A^c = \{x : x \in S \text{ and } x \notin A\}$$

**Example**: For $A = \{2, 4, 6\}$ (even numbers):
$$A^c = \{1, 3, 5\}$$

This represents rolling an odd number.

### Difference

The **difference** $A - B$ is the event that $A$ occurs but $B$ does not.

$$A - B = A \cap B^c = \{x : x \in A \text{ and } x \notin B\}$$

**Example**: Using $A = \{2, 4, 6\}$ and $B = \{1, 2, 3\}$:
$$A - B = \{4, 6\}$$

This represents rolling an even number that is greater than 3.

## Properties of Set Operations

### De Morgan's Laws

These fundamental laws relate complements, unions, and intersections:

$$(A \cup B)^c = A^c \cap B^c$$
$$(A \cap B)^c = A^c \cup B^c$$

**Interpretation**: The complement of "at least one event occurs" is "neither event occurs."

### Distributive Laws

$$A \cap (B \cup C) = (A \cap B) \cup (A \cap C)$$
$$A \cup (B \cap C) = (A \cup B) \cap (A \cup C)$$

### Associative Laws

$$A \cup (B \cup C) = (A \cup B) \cup C$$
$$A \cap (B \cap C) = (A \cap B) \cap C$$

### Commutative Laws

$$A \cup B = B \cup A$$
$$A \cap B = B \cap A$$

## Mutually Exclusive Events

Two events $A$ and $B$ are **mutually exclusive** (or disjoint) if they cannot both occur simultaneously:

$$A \cap B = \emptyset$$

**Example**: When rolling a die, the events $A = \{1, 3, 5\}$ (odd) and $B = \{2, 4, 6\}$ (even) are mutually exclusive.

A collection of events $A_1, A_2, \ldots, A_n$ is mutually exclusive if every pair is disjoint:
$$A_i \cap A_j = \emptyset \text{ for all } i \neq j$$

## Partitions

A collection of events $A_1, A_2, \ldots, A_n$ forms a **partition** of the sample space $S$ if:
1. The events are mutually exclusive: $A_i \cap A_j = \emptyset$ for $i \neq j$
2. The events are exhaustive: $A_1 \cup A_2 \cup \cdots \cup A_n = S$

**Example**: For a die roll, $A_1 = \{1, 2\}$, $A_2 = \{3, 4\}$, $A_3 = \{5, 6\}$ form a partition.

## Venn Diagrams

Venn diagrams provide a visual representation of events and set operations. The sample space is represented by a rectangle, and events are represented by circles or other shapes within it.

### Example: Two Events

Consider a deck of cards where:
- $A$ = drawing a heart (13 cards)
- $B$ = drawing a face card (12 cards: J, Q, K in each suit)
- $A \cap B$ = drawing a heart that is a face card (3 cards: J♥, Q♥, K♥)

In a Venn diagram:
- The region inside circle $A$ only: hearts that aren't face cards (10 cards)
- The region inside circle $B$ only: face cards that aren't hearts (9 cards)
- The overlapping region $A \cap B$: heart face cards (3 cards)
- The region outside both circles: cards that are neither hearts nor face cards (30 cards)

### Worked Example with Venn Diagram

**Problem**: In a survey of 100 students:
- 60 study mathematics ($M$)
- 50 study physics ($P$)
- 30 study both subjects

Find:
(a) How many study at least one subject?
(b) How many study exactly one subject?
(c) How many study neither subject?

**Solution**:

(a) $|M \cup P| = |M| + |P| - |M \cap P| = 60 + 50 - 30 = 80$ students

(b) Students studying exactly one subject:
$$|M - P| + |P - M| = (60 - 30) + (50 - 30) = 30 + 20 = 50 \text{ students}$$

(c) Students studying neither:
$$|(M \cup P)^c| = 100 - |M \cup P| = 100 - 80 = 20 \text{ students}$$

## Sigma-Algebras (Advanced)

For a rigorous treatment of probability, we need the concept of a **sigma-algebra** (or $\sigma$-algebra), which is a collection $\mathcal{F}$ of subsets of $S$ satisfying:

1. $S \in \mathcal{F}$
2. If $A \in \mathcal{F}$, then $A^c \in \mathcal{F}$
3. If $A_1, A_2, \ldots \in \mathcal{F}$, then $\bigcup_{i=1}^{\infty} A_i \in \mathcal{F}$

This ensures that we can always assign probabilities to complements and countable unions of events.

## Summary

Understanding sample spaces and events is crucial for probability theory. The sample space contains all possible outcomes, while events are subsets of the sample space. Set operations (union, intersection, complement) allow us to build complex events from simple ones, and Venn diagrams provide intuitive visualizations. These concepts form the foundation upon which we build the formal theory of probability in subsequent sections.
