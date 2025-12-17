---
title: "Rings Definition"
description: "Introduction to rings and their fundamental properties"
---

# Rings Definition

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

## Basic Examples

### Example 1: $\mathbb{Z}$

The integers with usual $+$ and $\cdot$ form a ring.

### Example 2: $\mathbb{Q}, \mathbb{R}, \mathbb{C}$

Rationals, reals, and complex numbers are rings.

### Example 3: $\mathbb{Z}_n$

Integers modulo $n$ with addition and multiplication mod $n$.

### Example 4: Matrix Rings

$M_n(\mathbb{R})$ (all $n \times n$ matrices) with matrix addition and multiplication.

### Example 5: Polynomial Rings

$\mathbb{R}[x]$ (polynomials with real coefficients) with polynomial addition and multiplication.

## Properties

**Additive identity**: $0 \in R$ such that $0 + a = a$ for all $a$.

**Additive inverses**: For each $a \in R$, exists $-a$ such that $a + (-a) = 0$.

**Multiplication need not be commutative**: In general $ab \neq ba$.

## Commutative Rings

**Definition**: Ring $R$ is **commutative** if $ab = ba$ for all $a, b \in R$.

**Examples**: $\mathbb{Z}, \mathbb{Q}, \mathbb{R}, \mathbb{C}, \mathbb{Z}_n, \mathbb{R}[x]$ are commutative.

**Non-example**: $M_n(\mathbb{R})$ for $n \geq 2$ is non-commutative.

## Rings with Unity

**Definition**: Ring $R$ has **unity** (or **multiplicative identity**) if there exists $1 \in R$ such that $1 \cdot a = a \cdot 1 = a$ for all $a \in R$.

**Examples**: $\mathbb{Z}, \mathbb{Q}, \mathbb{R}$ have unity 1.

**Example without unity**: Even integers $2\mathbb{Z}$ form a ring without unity.

## Units

**Definition**: Element $a \in R$ is a **unit** if it has a multiplicative inverse: $\exists \, b \in R$ such that $ab = ba = 1$.

**Notation**: $U(R) = \{\text{units of } R\}$ or $R^*$ or $R^\times$.

**Theorem**: $(U(R), \cdot)$ forms a group under multiplication.

**Proof**:
- **Closure**: If $a, b \in U(R)$ with inverses $a^{-1}, b^{-1}$, then $(ab)(b^{-1}a^{-1}) = a(bb^{-1})a^{-1} = aa^{-1} = 1$, so $ab \in U(R)$.
- **Identity**: $1 \in U(R)$ since $1 \cdot 1 = 1$.
- **Inverses**: If $a \in U(R)$, then $a^{-1} \in U(R)$ with inverse $a$.
- **Associativity**: Inherited from $R$. $\square$

### Examples

- $U(\mathbb{Z}) = \{1, -1\}$ (only $\pm 1$ divide $1$)
- $U(\mathbb{Q}) = \mathbb{Q}^* = \mathbb{Q} \setminus \{0\}$ (every nonzero rational has inverse)
- $U(\mathbb{Z}_n) = \{k \in \mathbb{Z}_n : \gcd(k,n) = 1\}$ (Euler's totient)
- $U(M_n(\mathbb{R})) = GL_n(\mathbb{R})$ (invertible matrices, $\det(A) \neq 0$)

## Zero Divisors

**Definition**: Non-zero element $a \in R$ is a **zero divisor** if there exists non-zero $b \in R$ such that $ab = 0$ or $ba = 0$.

### Examples

In $\mathbb{Z}_6$: $2 \cdot 3 = 6 \equiv 0 \pmod 6$, so both 2 and 3 are zero divisors.

In $\mathbb{Z}$: No zero divisors (if $ab = 0$ then $a = 0$ or $b = 0$).

## Summary

- Ring: $(R, +, \cdot)$ with $(R,+)$ abelian group, associative multiplication, distributivity
- Commutative ring: $ab = ba$ for all $a, b$
- Unity: multiplicative identity 1
- Units: invertible elements, form group $U(R)$
- Zero divisors: non-zero elements with $ab = 0$

Rings generalize familiar number systems and provide algebraic framework for polynomials, matrices, and more.
