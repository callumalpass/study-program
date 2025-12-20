---
title: "Basic Properties of Groups"
description: "Fundamental theorems and properties that follow from the group axioms"
---

# Basic Properties of Groups

## Properties Derived from the Axioms

While the group axioms may seem simple, they imply many important properties. In this section, we prove fundamental results that hold in every group.

## Uniqueness Properties

### Uniqueness of the Identity

**Theorem 1**: The identity element of a group is unique.

**Proof**: Suppose $e$ and $e'$ are both identity elements of a group $G$. Then:
- Since $e'$ is an identity: $e \ast e' = e$ (using the right identity property)
- Since $e$ is an identity: $e \ast e' = e'$ (using the left identity property)

Therefore, $e = e \ast e' = e'$, so the identity is unique. $\square$

### Uniqueness of Inverses

**Theorem 2**: Each element in a group has a unique inverse.

**Proof**: Let $a \in G$ and suppose $b$ and $c$ are both inverses of $a$. This means:
- $a \ast b = e$ and $b \ast a = e$
- $a \ast c = e$ and $c \ast a = e$

Now consider:
$$b = b \ast e = b \ast (a \ast c) = (b \ast a) \ast c = e \ast c = c$$

Therefore, $b = c$, so the inverse is unique. $\square$

**Consequence**: Since inverses are unique, we can unambiguously denote the inverse of $a$ as $a^{-1}$.

## Cancellation Laws

The cancellation laws are crucial tools for solving equations in groups.

### Left Cancellation Law

**Theorem 3**: If $a, b, c \in G$ and $a \ast b = a \ast c$, then $b = c$.

**Proof**: Suppose $a \ast b = a \ast c$. Multiply both sides on the left by $a^{-1}$:
$$a^{-1} \ast (a \ast b) = a^{-1} \ast (a \ast c)$$

By associativity:
$$(a^{-1} \ast a) \ast b = (a^{-1} \ast a) \ast c$$

Simplifying using the inverse property:
$$e \ast b = e \ast c$$

Using the identity property:
$$b = c$$

Therefore, left cancellation holds. $\square$

### Right Cancellation Law

**Theorem 4**: If $a, b, c \in G$ and $b \ast a = c \ast a$, then $b = c$.

**Proof**: Exercise (similar to left cancellation, multiply on the right by $a^{-1}$). $\square$

### Application: Solving Equations

The cancellation laws allow us to solve equations in groups.

**Example**: Solve for $x$ in the equation $a \ast x = b$ where $a, b \in G$.

**Solution**:
$$a \ast x = b$$
$$a^{-1} \ast (a \ast x) = a^{-1} \ast b$$
$$(a^{-1} \ast a) \ast x = a^{-1} \ast b$$
$$e \ast x = a^{-1} \ast b$$
$$x = a^{-1} \ast b$$

We can verify: $a \ast (a^{-1} \ast b) = (a \ast a^{-1}) \ast b = e \ast b = b$. ✓

## Inverse Properties

### Inverse of a Product

**Theorem 5**: For any $a, b \in G$, we have $(a \ast b)^{-1} = b^{-1} \ast a^{-1}$.

**Proof**: We need to show that $b^{-1} \ast a^{-1}$ is the inverse of $a \ast b$. By uniqueness of inverses, it suffices to show:
$$(a \ast b) \ast (b^{-1} \ast a^{-1}) = e$$

Computing:
$$(a \ast b) \ast (b^{-1} \ast a^{-1}) = a \ast (b \ast b^{-1}) \ast a^{-1}$$
$$= a \ast e \ast a^{-1} = a \ast a^{-1} = e$$

Similarly, $(b^{-1} \ast a^{-1}) \ast (a \ast b) = e$.

Therefore, $(a \ast b)^{-1} = b^{-1} \ast a^{-1}$. $\square$

**Mnemonic**: The inverse of a product is the product of inverses in reverse order, like taking off shoes then socks (the reverse of putting on socks then shoes).

**Generalization**: For any $a_1, a_2, \ldots, a_n \in G$:
$$(a_1 \ast a_2 \ast \cdots \ast a_n)^{-1} = a_n^{-1} \ast \cdots \ast a_2^{-1} \ast a_1^{-1}$$

### Inverse of an Inverse

**Theorem 6**: For any $a \in G$, we have $(a^{-1})^{-1} = a$.

**Proof**: By definition of inverse, $a \ast a^{-1} = e$. This means $a$ is the inverse of $a^{-1}$, so $(a^{-1})^{-1} = a$. $\square$

### Identity is Self-Inverse

**Theorem 7**: $e^{-1} = e$.

**Proof**: Since $e \ast e = e$, the element $e$ is its own inverse. $\square$

## Powers of Elements

For an element $a$ in a group $G$, we define powers:

**Definition**: For $a \in G$ and $n \in \mathbb{Z}$:
$$a^n = \begin{cases}
e & \text{if } n = 0 \\
\underbrace{a \ast a \ast \cdots \ast a}_{n \text{ times}} & \text{if } n > 0 \\
\underbrace{a^{-1} \ast a^{-1} \ast \cdots \ast a^{-1}}_{|n| \text{ times}} & \text{if } n < 0
\end{cases}$$

**Note**: In additive notation, we write $na$ instead of $a^n$.

### Laws of Exponents

**Theorem 8**: For any $a \in G$ and $m, n \in \mathbb{Z}$:

1. $a^m \ast a^n = a^{m+n}$
2. $(a^m)^n = a^{mn}$
3. $(a^n)^{-1} = a^{-n}$

**Proof of (1)**: We prove this for positive $m$ and $n$; other cases are similar.

$$a^m \ast a^n = \underbrace{(a \ast \cdots \ast a)}_{m} \ast \underbrace{(a \ast \cdots \ast a)}_{n} = \underbrace{a \ast \cdots \ast a}_{m+n} = a^{m+n}$$

$\square$

**Proof of (3)**:
$$a^n \ast a^{-n} = a^{n + (-n)} = a^0 = e$$

So $a^{-n}$ is the inverse of $a^n$. $\square$

**Warning**: In non-abelian groups, $(a \ast b)^n \neq a^n \ast b^n$ in general. This only holds when $a$ and $b$ commute.

## Properties in Abelian Groups

When a group is abelian, additional properties hold.

**Theorem 9**: If $G$ is abelian, then for all $a, b \in G$ and $n \in \mathbb{Z}$:
$$(a \ast b)^n = a^n \ast b^n$$

**Proof**: For $n > 0$:
$$(a \ast b)^n = \underbrace{(a \ast b) \ast (a \ast b) \ast \cdots \ast (a \ast b)}_{n}$$

Since the group is abelian, we can rearrange:
$$= \underbrace{(a \ast a \ast \cdots \ast a)}_{n} \ast \underbrace{(b \ast b \ast \cdots \ast b)}_{n} = a^n \ast b^n$$

$\square$

## One-Sided Identity and Inverse

An interesting result shows that we only need to check identity and inverse properties on one side.

**Theorem 10**: If $G$ is a group with operation $\ast$, and there exists $e \in G$ such that:
- $e \ast a = a$ for all $a \in G$ (left identity)
- For each $a \in G$, there exists $a' \in G$ with $a' \ast a = e$ (left inverse)

Then $e$ is also a right identity and $a'$ is also a right inverse.

**Proof**: Let $a \in G$ and let $a'$ be a left inverse of $a$. Let $(a')'$ be a left inverse of $a'$. Then:

$$a \ast a' = e \ast (a \ast a') = ((a')' \ast a') \ast (a \ast a')$$
$$= (a')' \ast (a' \ast a) \ast a' = (a')' \ast e \ast a' = (a')' \ast a' = e$$

So $a'$ is also a right inverse. Furthermore:
$$a \ast e = a \ast (a' \ast a) = (a \ast a') \ast a = e \ast a = a$$

So $e$ is also a right identity. $\square$

**Consequence**: When verifying the group axioms, it suffices to check identity and inverse properties on one side only.

## The Latin Square Property

**Theorem 11**: Let $G$ be a finite group with $n$ elements. The Cayley table (multiplication table) of $G$ is a **Latin square**: each element appears exactly once in each row and exactly once in each column.

**Proof**: Consider row $a$ of the table, which lists all products $a \ast g$ for $g \in G$.

Suppose $a \ast g_1 = a \ast g_2$ for some $g_1, g_2 \in G$. By left cancellation, $g_1 = g_2$. Therefore, all entries in row $a$ are distinct.

Since there are $n$ entries in the row and they are all distinct, each element of $G$ appears exactly once.

The same argument with right cancellation proves the column property. $\square$

**Example**: The Cayley table for $\mathbb{Z}_4 = \{0, 1, 2, 3\}$ under addition modulo 4:

$$\begin{array}{c|cccc}
+ & 0 & 1 & 2 & 3 \\
\hline
0 & 0 & 1 & 2 & 3 \\
1 & 1 & 2 & 3 & 0 \\
2 & 2 & 3 & 0 & 1 \\
3 & 3 & 0 & 1 & 2
\end{array}$$

Notice each element appears exactly once in each row and column.

## Summary

These basic properties—uniqueness of identities and inverses, cancellation laws, inverse properties, and exponent laws—are fundamental tools for working with groups. They follow directly from the group axioms but provide powerful techniques for proving theorems and solving problems in group theory.
