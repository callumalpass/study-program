---
title: "Rings Definition"
description: "Introduction to rings and their fundamental properties"
---

# Rings Definition

## Introduction

Rings represent one of the most fundamental algebraic structures in modern mathematics, generalizing the arithmetic properties of integers, polynomials, and matrices under a unified framework. The concept emerged in the 19th century through the work of mathematicians studying algebraic number theory and polynomial equations. Today, rings form the foundation for diverse areas including algebraic geometry, cryptography, and theoretical computer science.

## Definition

**Definition**: A **ring** is a set $R$ with two binary operations $+$ (addition) and $\cdot$ (multiplication) such that:

1. $(R, +)$ is an abelian group:
   - Closed: $\forall a, b \in R, \, a + b \in R$
   - Associative: $\forall a, b, c \in R, \, (a + b) + c = a + (b + c)$
   - Identity: $\exists \, 0 \in R$ such that $a + 0 = 0 + a = a$ for all $a \in R$
   - Inverses: $\forall a \in R, \, \exists \, (-a) \in R$ such that $a + (-a) = 0$
   - Commutative: $\forall a, b \in R, \, a + b = b + a$

2. Multiplication is associative: $\forall a, b, c \in R, \, (ab)c = a(bc)$

3. Distributive laws hold:
   - Left distributivity: $a(b + c) = ab + ac$ for all $a, b, c \in R$
   - Right distributivity: $(a + b)c = ac + bc$ for all $a, b, c \in R$

**Key observation**: Unlike groups where we study a single operation, rings involve the interplay between two operations. The distributive laws create the essential connection between addition and multiplication, allowing us to develop a rich algebraic theory.

## Historical Context

The term "ring" (German: *Zahlring*) was introduced by David Hilbert in the late 1800s, though the underlying concepts emerged earlier in work by Dedekind and others on algebraic integers. The name reflects the cyclic nature of arithmetic in modular systems like $\mathbb{Z}_n$, where numbers "wrap around" in a ring-like fashion.

## Basic Examples

### Example 1: $\mathbb{Z}$

The integers with usual addition and multiplication form the prototypical ring. This example motivated much of ring theory, as mathematicians sought to generalize properties of integer arithmetic.

Verification:
- $({\mathbb{Z}}, +)$ is an abelian group (zero is identity, negatives are inverses)
- Multiplication is associative: $(ab)c = a(bc)$
- Distributivity holds from familiar arithmetic

### Example 2: $\mathbb{Q}, \mathbb{R}, \mathbb{C}$

Rationals, reals, and complex numbers are rings. These actually satisfy additional properties (they are fields), but every field is automatically a ring.

### Example 3: $\mathbb{Z}_n$

Integers modulo $n$ with addition and multiplication mod $n$ form a finite ring of order $n$.

For $\mathbb{Z}_6 = \{0, 1, 2, 3, 4, 5\}$:
- $3 + 5 = 8 \equiv 2 \pmod 6$
- $2 \cdot 4 = 8 \equiv 2 \pmod 6$

These rings are crucial in cryptography and coding theory.

### Example 4: Matrix Rings

$M_n(\mathbb{R})$ (all $n \times n$ real matrices) with matrix addition and multiplication forms a ring.

Important note: Matrix multiplication is NOT commutative for $n \geq 2$:
$$\begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix} \begin{pmatrix} 0 & 0 \\ 1 & 0 \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix} \neq \begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix}$$

### Example 5: Polynomial Rings

$\mathbb{R}[x]$ (polynomials with real coefficients) with polynomial addition and multiplication.

Example computation: $(2x + 1)(x^2 - 3) = 2x^3 + x^2 - 6x - 3$

Polynomial rings are fundamental in algebra, connecting to field theory and algebraic geometry.

### Example 6: Function Rings

The set $C[0,1]$ of continuous real-valued functions on $[0,1]$ forms a ring under pointwise addition and multiplication:
- $(f + g)(x) = f(x) + g(x)$
- $(f \cdot g)(x) = f(x) \cdot g(x)$

This example shows rings appear naturally in analysis, not just algebra.

## Properties

**Additive identity**: Every ring has a unique element $0 \in R$ such that $0 + a = a$ for all $a$.

**Additive inverses**: For each $a \in R$, there exists a unique element $-a$ such that $a + (-a) = 0$.

**Multiplication need not be commutative**: In general $ab \neq ba$. When multiplication is commutative, we have a special class of rings.

**No multiplicative inverse requirement**: Unlike fields, rings don't require elements to have multiplicative inverses. In $\mathbb{Z}$, only $\pm 1$ have multiplicative inverses.

## Commutative Rings

**Definition**: Ring $R$ is **commutative** if $ab = ba$ for all $a, b \in R$.

Commutativity dramatically simplifies ring theory. Most "naturally occurring" rings in number theory and algebraic geometry are commutative.

**Examples**: $\mathbb{Z}, \mathbb{Q}, \mathbb{R}, \mathbb{C}, \mathbb{Z}_n, \mathbb{R}[x]$ are all commutative.

**Non-example**: $M_n(\mathbb{R})$ for $n \geq 2$ is non-commutative (shown above).

## Rings with Unity

**Definition**: Ring $R$ has **unity** (or **multiplicative identity**) if there exists $1 \in R$ (with $1 \neq 0$) such that $1 \cdot a = a \cdot 1 = a$ for all $a \in R$.

The requirement $1 \neq 0$ excludes the trivial ring $\{0\}$ with one element.

**Examples**: $\mathbb{Z}, \mathbb{Q}, \mathbb{R}$ have unity 1. Matrix ring $M_n(\mathbb{R})$ has unity $I_n$ (identity matrix).

**Example without unity**: Even integers $2\mathbb{Z} = \{\ldots, -4, -2, 0, 2, 4, \ldots\}$ form a ring without unity. There is no element $e$ in $2\mathbb{Z}$ with $e \cdot (2n) = 2n$ for all $2n \in 2\mathbb{Z}$.

## Units

**Definition**: Element $a \in R$ (with unity) is a **unit** if it has a multiplicative inverse: $\exists \, b \in R$ such that $ab = ba = 1$.

**Notation**: The set of units is denoted $U(R)$, $R^*$, or $R^\times$.

**Theorem**: $(U(R), \cdot)$ forms a group under multiplication.

**Proof**:
- **Closure**: If $a, b \in U(R)$ with inverses $a^{-1}, b^{-1}$, then $(ab)(b^{-1}a^{-1}) = a(bb^{-1})a^{-1} = aa^{-1} = 1$, so $ab \in U(R)$ with inverse $b^{-1}a^{-1}$.
- **Identity**: $1 \in U(R)$ since $1 \cdot 1 = 1$.
- **Inverses**: If $a \in U(R)$ with inverse $a^{-1}$, then $a^{-1} \in U(R)$ with inverse $a$.
- **Associativity**: Inherited from $R$. $\square$

### Examples

- $U(\mathbb{Z}) = \{1, -1\}$ (only $\pm 1$ divide $1$ in integers)
- $U(\mathbb{Q}) = \mathbb{Q}^* = \mathbb{Q} \setminus \{0\}$ (every nonzero rational has inverse)
- $U(\mathbb{Z}_n) = \{k \in \mathbb{Z}_n : \gcd(k,n) = 1\}$ (units are coprime to $n$, giving Euler's totient)
- $U(M_n(\mathbb{R})) = GL_n(\mathbb{R})$ (invertible matrices with $\det(A) \neq 0$)

For $\mathbb{Z}_6$: $U(\mathbb{Z}_6) = \{1, 5\}$ since $\gcd(1,6) = \gcd(5,6) = 1$.

## Zero Divisors

**Definition**: Non-zero element $a \in R$ is a **zero divisor** if there exists non-zero $b \in R$ such that $ab = 0$ or $ba = 0$.

Zero divisors represent elements where multiplication "collapses" non-zero elements to zero, violating our intuition from integers.

### Examples

In $\mathbb{Z}_6$: $2 \cdot 3 = 6 \equiv 0 \pmod 6$, so both 2 and 3 are zero divisors.

In $\mathbb{Z}$: No zero divisors exist. If $ab = 0$ in $\mathbb{Z}$, then $a = 0$ or $b = 0$.

In $M_2(\mathbb{R})$:
$$\begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix} \begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} 0 & 0 \\ 0 & 0 \end{pmatrix}$$

Both matrices are non-zero but their product is zero.

**Important**: An element cannot be both a unit and a zero divisor. If $a$ is a unit with inverse $a^{-1}$ and $ab = 0$, then $b = a^{-1}(ab) = a^{-1} \cdot 0 = 0$, contradicting that $b \neq 0$.

## Summary

- **Ring**: $(R, +, \cdot)$ with $(R,+)$ abelian group, associative multiplication, and distributivity
- **Commutative ring**: $ab = ba$ for all $a, b$
- **Unity**: multiplicative identity 1
- **Units**: invertible elements, form group $U(R)$
- **Zero divisors**: non-zero elements with $ab = 0$

Rings generalize familiar number systems and provide an algebraic framework for studying polynomials, matrices, modular arithmetic, and much more. The theory developed here extends to integral domains, fields, and quotient rings, forming the foundation of modern abstract algebra.

## Key Takeaways

1. Rings have two operations (addition and multiplication) linked by distributivity
2. Addition forms an abelian group; multiplication need only be associative
3. Commutativity and unity are additional properties, not required in general
4. Units generalize the notion of "invertible elements"
5. Zero divisors are obstructions to cancellation laws
6. Examples include number systems ($\mathbb{Z}, \mathbb{Q}, \mathbb{R}$), modular arithmetic ($\mathbb{Z}_n$), polynomials ($R[x]$), and matrices ($M_n(R)$)
