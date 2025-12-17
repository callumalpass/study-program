---
title: "Introduction to Permutations"
description: "Foundational concepts of permutations and their role in group theory"
---

# Introduction to Permutations

## Definition

A **permutation** of a set $A$ is a bijective function from $A$ to itself. Permutations capture the idea of rearrangements or reorderings.

**Notation**: For finite set $A = \{1, 2, \ldots, n\}$, a permutation $\sigma$ can be written as:
$$\sigma = \begin{pmatrix} 1 & 2 & 3 & \cdots & n \\ \sigma(1) & \sigma(2) & \sigma(3) & \cdots & \sigma(n) \end{pmatrix}$$

This shows where each element maps under $\sigma$.

### Example 1

Let $\sigma: \{1, 2, 3, 4\} \to \{1, 2, 3, 4\}$ with:
- $\sigma(1) = 3$
- $\sigma(2) = 1$
- $\sigma(3) = 4$
- $\sigma(4) = 2$

Two-row notation:
$$\sigma = \begin{pmatrix} 1 & 2 & 3 & 4 \\ 3 & 1 & 4 & 2 \end{pmatrix}$$

This permutation sends: $1 \to 3 \to 4 \to 2 \to 1$ (a cycle).

## Composition of Permutations

Since permutations are functions, we can compose them.

**Convention**: We use right-to-left composition: $(\sigma \tau)(x) = \sigma(\tau(x))$.

Apply $\tau$ first, then $\sigma$.

### Example 2

$$\sigma = \begin{pmatrix} 1 & 2 & 3 & 4 \\ 2 & 3 & 4 & 1 \end{pmatrix}, \quad \tau = \begin{pmatrix} 1 & 2 & 3 & 4 \\ 3 & 1 & 4 & 2 \end{pmatrix}$$

Compute $\sigma \tau$:
- $(\sigma \tau)(1) = \sigma(\tau(1)) = \sigma(3) = 4$
- $(\sigma \tau)(2) = \sigma(\tau(2)) = \sigma(1) = 2$
- $(\sigma \tau)(3) = \sigma(\tau(3)) = \sigma(4) = 1$
- $(\sigma \tau)(4) = \sigma(\tau(4)) = \sigma(2) = 3$

Result:
$$\sigma \tau = \begin{pmatrix} 1 & 2 & 3 & 4 \\ 4 & 2 & 1 & 3 \end{pmatrix}$$

**Important**: Composition is generally NOT commutative! $\sigma \tau \neq \tau \sigma$ in general.

Compute $\tau \sigma$:
- $(\tau \sigma)(1) = \tau(\sigma(1)) = \tau(2) = 1$
- $(\tau \sigma)(2) = \tau(\sigma(2)) = \tau(3) = 4$
- $(\tau \sigma)(3) = \tau(\sigma(3)) = \tau(4) = 2$
- $(\tau \sigma)(4) = \tau(\sigma(4)) = \tau(1) = 3$

$$\tau \sigma = \begin{pmatrix} 1 & 2 & 3 & 4 \\ 1 & 4 & 2 & 3 \end{pmatrix} \neq \sigma \tau$$

## The Symmetric Group

**Definition**: The **symmetric group** on $n$ elements, denoted $S_n$, is the set of all permutations of $\{1, 2, \ldots, n\}$ under composition.

**Properties**:
- **Operation**: Function composition
- **Identity**: The identity permutation $\text{id}(i) = i$ for all $i$
- **Inverses**: Each permutation has an inverse (reverse the mapping)
- **Order**: $|S_n| = n!$

$S_n$ is a group (proof in next section).

### Small Symmetric Groups

**$S_1$**: Only one permutation (identity). $|S_1| = 1$.

**$S_2$**: Two permutations:
- $\text{id} = \begin{pmatrix} 1 & 2 \\ 1 & 2 \end{pmatrix}$
- $(12) = \begin{pmatrix} 1 & 2 \\ 2 & 1 \end{pmatrix}$

$|S_2| = 2$. This group is isomorphic to $\mathbb{Z}_2$.

**$S_3$**: Six permutations ($3! = 6$):
- $\text{id} = \begin{pmatrix} 1 & 2 & 3 \\ 1 & 2 & 3 \end{pmatrix}$
- $(12) = \begin{pmatrix} 1 & 2 & 3 \\ 2 & 1 & 3 \end{pmatrix}$
- $(13) = \begin{pmatrix} 1 & 2 & 3 \\ 3 & 2 & 1 \end{pmatrix}$
- $(23) = \begin{pmatrix} 1 & 2 & 3 \\ 1 & 3 & 2 \end{pmatrix}$
- $(123) = \begin{pmatrix} 1 & 2 & 3 \\ 2 & 3 & 1 \end{pmatrix}$
- $(132) = \begin{pmatrix} 1 & 2 & 3 \\ 3 & 1 & 2 \end{pmatrix}$

$|S_3| = 6$. This group is non-abelian (the smallest non-abelian group).

## Identity and Inverses

**Identity**: The identity permutation leaves everything unchanged:
$$\text{id} = \begin{pmatrix} 1 & 2 & \cdots & n \\ 1 & 2 & \cdots & n \end{pmatrix}$$

**Inverse**: For permutation $\sigma$, the inverse $\sigma^{-1}$ satisfies $\sigma \sigma^{-1} = \sigma^{-1} \sigma = \text{id}$.

To find $\sigma^{-1}$: swap the rows and reorder.

### Example 3

$$\sigma = \begin{pmatrix} 1 & 2 & 3 & 4 \\ 3 & 1 & 4 & 2 \end{pmatrix}$$

Swap rows:
$$\begin{pmatrix} 3 & 1 & 4 & 2 \\ 1 & 2 & 3 & 4 \end{pmatrix}$$

Reorder by first row:
$$\sigma^{-1} = \begin{pmatrix} 1 & 2 & 3 & 4 \\ 2 & 4 & 1 & 3 \end{pmatrix}$$

**Verification**:
- $\sigma(1) = 3$ and $\sigma^{-1}(3) = 1$ ✓
- $\sigma(2) = 1$ and $\sigma^{-1}(1) = 2$ ✓
- $\sigma(3) = 4$ and $\sigma^{-1}(4) = 3$ ✓
- $\sigma(4) = 2$ and $\sigma^{-1}(2) = 4$ ✓

## Permutations as Rearrangements

We can think of permutations as rearranging objects.

### Example 4: Arranging Letters

Consider the word CAT. Permutations rearrange the letters:
- Identity: CAT
- $(12)$: ACT (swap positions 1 and 2)
- $(13)$: TAC (swap positions 1 and 3)
- $(23)$: CTA (swap positions 2 and 3)
- $(123)$: ATC (cycle 1→2→3→1)
- $(132)$: TCA (cycle 1→3→2→1)

All 6 arrangements of CAT correspond to elements of $S_3$.

## Counting Permutations

**Theorem**: The number of permutations of $n$ objects is $n!$.

**Proof**: Choose where 1 goes: $n$ choices. Choose where 2 goes: $n-1$ choices. Continue: $n \times (n-1) \times \cdots \times 2 \times 1 = n!$. $\square$

**Examples**:
- $|S_3| = 3! = 6$
- $|S_4| = 4! = 24$
- $|S_5| = 5! = 120$
- $|S_{10}| = 10! = 3,628,800$

## Properties of Permutation Composition

**Associativity**: $(\sigma \tau) \rho = \sigma (\tau \rho)$ (functions are associative).

**Non-commutativity** (for $n \geq 3$): Generally $\sigma \tau \neq \tau \sigma$.

### Example 5: Non-commutativity

In $S_3$:
$$\sigma = (12) = \begin{pmatrix} 1 & 2 & 3 \\ 2 & 1 & 3 \end{pmatrix}, \quad \tau = (23) = \begin{pmatrix} 1 & 2 & 3 \\ 1 & 3 & 2 \end{pmatrix}$$

$$\sigma \tau = \begin{pmatrix} 1 & 2 & 3 \\ 3 & 1 & 2 \end{pmatrix} = (132)$$

$$\tau \sigma = \begin{pmatrix} 1 & 2 & 3 \\ 2 & 3 & 1 \end{pmatrix} = (123)$$

Since $(132) \neq (123)$, we have $\sigma \tau \neq \tau \sigma$.

## One-Line Notation

Sometimes permutations are written in **one-line notation**: just the second row.

$$\sigma = \begin{pmatrix} 1 & 2 & 3 & 4 \\ 3 & 1 & 4 & 2 \end{pmatrix}$$

becomes $\sigma = [3, 1, 4, 2]$.

This is concise but requires remembering the implicit first row $[1, 2, 3, 4]$.

## Applications Preview

Permutations appear throughout mathematics:
- **Algebra**: Galois theory, group structure
- **Combinatorics**: Counting arrangements
- **Probability**: Random orderings
- **Computer Science**: Sorting algorithms, cryptography
- **Physics**: Particle statistics (fermions vs bosons)

## Order of a Permutation

The **order** of permutation $\sigma$ is the smallest positive integer $k$ such that $\sigma^k = \text{id}$.

### Example 6

$$\sigma = (123) = \begin{pmatrix} 1 & 2 & 3 \\ 2 & 3 & 1 \end{pmatrix}$$

- $\sigma^1 = (123)$
- $\sigma^2 = (123)(123) = (132)$
- $\sigma^3 = (123)(123)(123) = \text{id}$

So $|\sigma| = 3$.

Order relates to cycle structure (covered in later sections).

## Permutation Matrices

Permutations can be represented as matrices where each row and column has exactly one 1.

### Example 7

$$\sigma = \begin{pmatrix} 1 & 2 & 3 \\ 2 & 3 & 1 \end{pmatrix}$$

Permutation matrix:
$$P_\sigma = \begin{pmatrix} 0 & 1 & 0 \\ 0 & 0 & 1 \\ 1 & 0 & 0 \end{pmatrix}$$

Row $i$ has a 1 in column $\sigma(i)$.

Matrix multiplication of permutation matrices corresponds to permutation composition.

## Summary

Key concepts:
- Permutations are bijective functions
- $S_n$ is the symmetric group of order $n!$
- Composition is associative but not commutative
- Every permutation has an inverse
- Permutations can be written in two-row, one-line, or cycle notation

Permutations form the foundation for studying symmetric groups, one of the most important families of groups in abstract algebra.
