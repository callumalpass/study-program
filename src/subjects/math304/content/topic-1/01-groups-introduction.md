---
title: "Introduction to Groups"
description: "Exploring the fundamental algebraic structure of groups and their historical development"
---

# Introduction to Groups

## Historical Context

The concept of a group emerged in the early 19th century through the work of mathematicians studying polynomial equations and symmetry. Évariste Galois, working on the solvability of polynomial equations, developed the foundation of group theory before his untimely death at age 20. The term "group" was first used by Galois to describe collections of permutations that preserve certain properties.

Group theory has since become one of the most fundamental areas of abstract algebra, with applications spanning physics, chemistry, computer science, and cryptography.

## Motivation: Why Groups?

Groups capture the essence of symmetry and transformation. Consider the following examples:

**Symmetries of a Square**: A square can be rotated by 90°, 180°, 270°, or left unchanged (0°). It can also be reflected across various axes. These transformations can be combined, and this combination structure forms a group.

**Integer Addition**: The integers under addition form a group. You can add any two integers to get another integer, addition is associative, zero acts as an identity, and every integer has a negative.

**Modular Arithmetic**: The hours on a clock form a group under addition modulo 12. Adding hours wraps around after 12, creating a cyclic structure.

## Informal Definition

A group is a set equipped with an operation that combines any two elements to form a third element, satisfying certain axioms. The operation must be:
- **Closed**: The result is always in the set
- **Associative**: Grouping doesn't matter
- **Identity**: There's a "do nothing" element
- **Inverse**: Every element can be "undone"

## Binary Operations

Before formally defining groups, we need to understand binary operations.

**Definition**: A binary operation $\ast$ on a set $G$ is a function $\ast: G \times G \to G$ that assigns to each ordered pair $(a, b)$ of elements in $G$ an element $a \ast b$ in $G$.

### Examples of Binary Operations

1. **Addition on Integers**: The operation $+: \mathbb{Z} \times \mathbb{Z} \to \mathbb{Z}$ defined by $(a, b) \mapsto a + b$.

2. **Multiplication on Real Numbers**: The operation $\cdot: \mathbb{R} \times \mathbb{R} \to \mathbb{R}$ defined by $(a, b) \mapsto a \cdot b$.

3. **Composition of Functions**: If $S$ is a set and $F$ is the set of all functions from $S$ to $S$, composition $\circ$ is a binary operation on $F$.

4. **Matrix Multiplication**: For $n \times n$ matrices, matrix multiplication is a binary operation.

### Non-Examples

Not every rule for combining elements is a binary operation:

1. **Division on Integers**: Division is not a binary operation on $\mathbb{Z}$ because $3 \div 2 \notin \mathbb{Z}$. The operation is not closed.

2. **Subtraction on Natural Numbers**: Subtraction is not a binary operation on $\mathbb{N}$ because $2 - 5 \notin \mathbb{N}$.

## Properties of Binary Operations

### Associativity

An operation $\ast$ is **associative** if for all $a, b, c$ in the set:
$$(a \ast b) \ast c = a \ast (b \ast c)$$

**Example**: Addition is associative: $(2 + 3) + 4 = 2 + (3 + 4) = 9$.

**Non-Example**: Subtraction is not associative: $(5 - 3) - 1 = 1$ but $5 - (3 - 1) = 3$.

### Commutativity

An operation $\ast$ is **commutative** if for all $a, b$ in the set:
$$a \ast b = b \ast a$$

**Example**: Addition is commutative: $3 + 5 = 5 + 3 = 8$.

**Non-Example**: Matrix multiplication is generally not commutative. If
$$A = \begin{pmatrix} 1 & 2 \\ 0 & 1 \end{pmatrix}, \quad B = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$$
then $AB \neq BA$.

**Important Note**: Groups require associativity but NOT commutativity. Groups that are commutative are called **abelian groups**.

## Identity Elements

An element $e$ in a set $G$ with operation $\ast$ is an **identity element** if for all $a \in G$:
$$e \ast a = a \ast e = a$$

**Examples**:
- Zero is the identity for addition: $0 + a = a + 0 = a$
- One is the identity for multiplication: $1 \cdot a = a \cdot 1 = a$
- The identity matrix $I_n$ is the identity for matrix multiplication
- The identity function is the identity for function composition

## Inverse Elements

Given an operation $\ast$ with identity $e$, an element $b$ is an **inverse** of $a$ if:
$$a \ast b = b \ast a = e$$

We typically denote the inverse of $a$ as $a^{-1}$.

**Examples**:
- The additive inverse of $5$ is $-5$ because $5 + (-5) = 0$
- The multiplicative inverse of $3$ is $\frac{1}{3}$ because $3 \cdot \frac{1}{3} = 1$
- The inverse of a rotation by 90° is a rotation by 270° (or -90°)

## Preview: The Group Axioms

A group $(G, \ast)$ is a set $G$ together with a binary operation $\ast$ satisfying:

1. **Closure**: For all $a, b \in G$, we have $a \ast b \in G$
2. **Associativity**: For all $a, b, c \in G$, $(a \ast b) \ast c = a \ast (b \ast c)$
3. **Identity**: There exists $e \in G$ such that $e \ast a = a \ast e = a$ for all $a \in G$
4. **Inverses**: For each $a \in G$, there exists $a^{-1} \in G$ such that $a \ast a^{-1} = a^{-1} \ast a = e$

These four properties define the algebraic structure we call a group. In the next section, we will explore these axioms in detail and verify them for various examples.

## First Examples

### The Integers Under Addition

Consider $(\mathbb{Z}, +)$:
- **Closure**: The sum of any two integers is an integer
- **Associativity**: $(a + b) + c = a + (b + c)$ for all integers
- **Identity**: $0$ is the identity since $0 + a = a + 0 = a$
- **Inverses**: The inverse of $a$ is $-a$ since $a + (-a) = 0$

Therefore, $(\mathbb{Z}, +)$ is a group.

### The Positive Reals Under Multiplication

Consider $(\mathbb{R}^+, \cdot)$:
- **Closure**: The product of positive reals is positive
- **Associativity**: $(a \cdot b) \cdot c = a \cdot (b \cdot c)$
- **Identity**: $1$ is the identity
- **Inverses**: The inverse of $a$ is $\frac{1}{a}$

Therefore, $(\mathbb{R}^+, \cdot)$ is a group.

## Looking Ahead

In the following sections, we will:
- Formally state and prove properties from the group axioms
- Explore a rich variety of group examples
- Study subgroups and their properties
- Investigate the order of elements
- Develop techniques for understanding group structure

Group theory provides a unified framework for understanding symmetry, structure, and transformation across mathematics and its applications. The simple axioms lead to profound and beautiful results that we will explore throughout this course.
