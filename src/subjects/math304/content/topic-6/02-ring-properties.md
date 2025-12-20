---
title: "Ring Properties"
description: "Fundamental properties and theorems about rings"
---

# Ring Properties

## Introduction

While the definition of a ring specifies certain axioms that must hold, numerous additional properties emerge as logical consequences. These derived properties form the foundation for deeper ring-theoretic investigations. Understanding these fundamental results is essential for working with rings effectively and developing more advanced theory.

This section explores basic algebraic properties, cancellation laws, the concept of characteristic, subrings, homomorphisms, and direct products. Each concept extends our toolkit for analyzing ring structures.

## Basic Properties

**Theorem 1**: In any ring $R$:
1. $0 \cdot a = a \cdot 0 = 0$ for all $a \in R$
2. $(-a)b = a(-b) = -(ab)$ for all $a, b \in R$
3. $(-a)(-b) = ab$ for all $a, b \in R$
4. If $R$ has unity 1, then it is unique
5. $(-1)a = -a$ if $R$ has unity

**Proof of (1)**: We show $0 \cdot a = 0$. Using the additive identity property and distributivity:
$$0 \cdot a = (0+0) \cdot a = 0 \cdot a + 0 \cdot a$$
Subtracting $0 \cdot a$ from both sides (adding the additive inverse):
$$0 = 0 \cdot a$$
Similarly, $a \cdot 0 = 0$. $\square$

**Proof of (2)**: We need to show $(-a)b = -(ab)$. By definition, $-(ab)$ is the unique element that when added to $ab$ gives 0. We verify:
$$ab + (-a)b = (a + (-a))b = 0 \cdot b = 0$$
Thus $(-a)b = -(ab)$. Similarly, $a(-b) = -(ab)$. $\square$

**Proof of (3)**: Using property (2):
$$(-a)(-b) = -(a(-b)) = -(-(ab)) = ab$$
The last equality uses that the additive inverse is unique. $\square$

**Proof of (4)**: Suppose $1$ and $1'$ are both multiplicative identities. Then:
$$1 = 1 \cdot 1' = 1'$$
where the first equality uses $1'$ as identity and the second uses $1$ as identity. $\square$

**Interpretation**: These results show that multiplication by zero always yields zero (unlike in groups where we only had one operation). The behavior of negatives under multiplication follows familiar rules from arithmetic.

## Cancellation Laws

**Theorem 2**: If $a \in R$ is not a zero divisor and $ab = ac$, then $b = c$ (left cancellation). Similarly, if $ba = ca$ and $a$ is not a zero divisor, then $b = c$ (right cancellation).

**Proof**: Suppose $ab = ac$ where $a$ is not a zero divisor. Then:
$$ab - ac = 0 \Rightarrow a(b - c) = 0$$
Since $a$ is not a zero divisor and $a \neq 0$ (if $a = 0$, the hypothesis is vacuous), we must have $b - c = 0$, so $b = c$. $\square$

**Warning**: Cancellation fails with zero divisors!

**Example**: In $\mathbb{Z}_6$, we have $2 \cdot 1 = 2 \cdot 4 = 2$ but $1 \neq 4$. This happens because 2 is a zero divisor: $2 \cdot 3 = 0$ in $\mathbb{Z}_6$.

**Corollary**: In integral domains (rings without zero divisors), cancellation always works for non-zero elements.

This explains why equation solving in $\mathbb{Z}$ is straightforward but can be problematic in $\mathbb{Z}_n$ for composite $n$.

## Characteristic

**Definition**: The **characteristic** of ring $R$ with unity is the smallest positive integer $n$ such that $n \cdot 1 = \underbrace{1 + 1 + \cdots + 1}_{n \text{ times}} = 0$, or 0 if no such $n$ exists.

Notation: $\text{char}(R)$.

**Interpretation**: The characteristic measures how many times we must add the multiplicative identity to itself to obtain the additive identity. This captures whether the ring has "finite arithmetic" or "infinite arithmetic."

### Examples

- $\text{char}(\mathbb{Z}) = 0$ (no amount of adding 1 gives 0)
- $\text{char}(\mathbb{Q}) = 0$
- $\text{char}(\mathbb{R}) = 0$
- $\text{char}(\mathbb{Z}_n) = n$ (since $n \cdot 1 = n \equiv 0 \pmod n$)
- $\text{char}(\mathbb{Z}_p) = p$ for prime $p$
- $\text{char}(M_n(\mathbb{Z}_p)) = p$ (matrix ring inherits characteristic)

**Theorem 3**: If $R$ is a ring with unity and no zero divisors, then $\text{char}(R) = 0$ or $\text{char}(R)$ is prime.

**Proof**: Suppose $\text{char}(R) = n > 1$ is composite, say $n = ab$ where $1 < a, b < n$. Then:
$$(a \cdot 1)(b \cdot 1) = (ab) \cdot 1 = n \cdot 1 = 0$$
Since $R$ has no zero divisors and both $a \cdot 1 \neq 0$ and $b \cdot 1 \neq 0$ (by minimality of $n$), we have a contradiction. Thus $\text{char}(R)$ must be 0 or prime. $\square$

**Consequence**: Fields always have characteristic 0 or prime, since every field is an integral domain.

## Subrings

**Definition**: Subset $S \subseteq R$ is a **subring** if $S$ is itself a ring under the same operations as $R$.

**Subring Test**: $S \subseteq R$ is a subring if and only if:
1. $S \neq \emptyset$
2. $a - b \in S$ for all $a, b \in S$ (closed under subtraction)
3. $ab \in S$ for all $a, b \in S$ (closed under multiplication)

**Proof sketch**: Conditions (2) and (3) ensure $S$ inherits the ring structure. Condition (2) implies $S$ is a subgroup of $(R, +)$, and (3) ensures multiplicative closure. Associativity and distributivity are inherited from $R$. $\square$

### Examples

**Example 1**: $\mathbb{Z} \subseteq \mathbb{Q} \subseteq \mathbb{R} \subseteq \mathbb{C}$ forms a tower of subrings.

**Example 2**: $\mathbb{Z}[i] = \{a + bi : a, b \in \mathbb{Z}\}$ (Gaussian integers) is a subring of $\mathbb{C}$.

Verification: If $z_1 = a_1 + b_1 i$ and $z_2 = a_2 + b_2 i$, then:
- $z_1 - z_2 = (a_1 - a_2) + (b_1 - b_2)i \in \mathbb{Z}[i]$
- $z_1 z_2 = (a_1 a_2 - b_1 b_2) + (a_1 b_2 + a_2 b_1)i \in \mathbb{Z}[i]$

**Example 3**: $2\mathbb{Z} \subseteq \mathbb{Z}$ (even integers are a subring)

**Non-example**: $\mathbb{N} \subseteq \mathbb{Z}$ is NOT a subring (lacks additive inverses)

**Note**: A subring may not have the same unity as the parent ring. For instance, $2\mathbb{Z}$ has no unity at all, even though $\mathbb{Z}$ has unity 1.

## Ring Homomorphisms

**Definition**: Function $\phi: R \to S$ between rings is a **ring homomorphism** if:
1. $\phi(a + b) = \phi(a) + \phi(b)$ for all $a, b \in R$
2. $\phi(ab) = \phi(a)\phi(b)$ for all $a, b \in R$

Note: Unlike group homomorphisms (which preserve one operation), ring homomorphisms must preserve both operations!

**Properties**:
- $\phi(0_R) = 0_S$ (homomorphisms map zero to zero)
- $\phi(-a) = -\phi(a)$ (homomorphisms preserve additive inverses)
- If $R$ has unity $1_R$, then $\phi(1_R)$ is idempotent in $S$: $\phi(1_R)^2 = \phi(1_R)$
  - Warning: $\phi(1_R)$ may not equal $1_S$!

**Definition**: $\phi$ is an **isomorphism** if it is bijective. We write $R \cong S$ if there exists an isomorphism between them.

**Definition**:
- **Kernel**: $\ker(\phi) = \{r \in R : \phi(r) = 0_S\}$
- **Image**: $\text{Im}(\phi) = \{\phi(r) : r \in R\}$

**Theorem**: $\ker(\phi)$ is an ideal of $R$ and $\text{Im}(\phi)$ is a subring of $S$.

### Examples

**Example 1**: $\phi: \mathbb{Z} \to \mathbb{Z}_n$ defined by $\phi(k) = k \bmod n$ is a ring homomorphism (reduction modulo $n$).

Verification:
- $\phi(a + b) = (a+b) \bmod n = (a \bmod n) + (b \bmod n) = \phi(a) + \phi(b)$
- $\phi(ab) = (ab) \bmod n = (a \bmod n)(b \bmod n) = \phi(a)\phi(b)$

**Example 2**: Evaluation homomorphism $\phi: \mathbb{R}[x] \to \mathbb{R}$ given by $\phi(f) = f(c)$ for fixed $c \in \mathbb{R}$.

**Example 3**: The determinant $\det: M_n(\mathbb{R}) \to \mathbb{R}$ is NOT a ring homomorphism because $\det(A + B) \neq \det(A) + \det(B)$ in general.

## Direct Products

**Definition**: For rings $R$ and $S$, the **direct product** $R \times S$ consists of ordered pairs $(r, s)$ with:
- Addition: $(r_1, s_1) + (r_2, s_2) = (r_1 + r_2, s_1 + s_2)$
- Multiplication: $(r_1, s_1)(r_2, s_2) = (r_1r_2, s_1s_2)$

**Theorem**: $R \times S$ is a ring (operations defined componentwise).

**Properties**:
- Zero element: $(0_R, 0_S)$
- Unity (if $R$ and $S$ have unity): $(1_R, 1_S)$
- If $R$ and $S$ are commutative, so is $R \times S$

### Example

$\mathbb{Z}_2 \times \mathbb{Z}_3$ is a ring of order 6 with elements:
$$\{(0,0), (0,1), (0,2), (1,0), (1,1), (1,2)\}$$

Example computation: $(1,2)(1,2) = (1 \cdot 1, 2 \cdot 2) = (1, 1)$ in $\mathbb{Z}_2 \times \mathbb{Z}_3$.

**Chinese Remainder Theorem**: If $\gcd(m,n) = 1$, then
$$\mathbb{Z}_{mn} \cong \mathbb{Z}_m \times \mathbb{Z}_n$$

This isomorphism is given by $a \mapsto (a \bmod m, a \bmod n)$.

**Application**: $\mathbb{Z}_6 \cong \mathbb{Z}_2 \times \mathbb{Z}_3$ since $\gcd(2,3) = 1$.

This explains why $\mathbb{Z}_6$ has zero divisors: $(2,0)(0,3) = (0,0)$ in $\mathbb{Z}_2 \times \mathbb{Z}_3$, corresponding to $2 \cdot 3 = 0$ in $\mathbb{Z}_6$.

## Idempotents and Nilpotents

**Definition**: Element $e \in R$ is **idempotent** if $e^2 = e$.

Examples: 0 and 1 are always idempotent. In $\mathbb{Z}_6$, both 3 and 4 are idempotent: $3^2 = 9 \equiv 3$ and $4^2 = 16 \equiv 4$.

**Definition**: Element $a \in R$ is **nilpotent** if $a^n = 0$ for some positive integer $n$.

Example: In $\mathbb{Z}_9$, the element 3 is nilpotent: $3^2 = 9 \equiv 0 \pmod 9$.

## Summary

- Multiplication by 0 always gives 0; negatives behave as expected
- Cancellation holds for non-zero-divisors but fails for zero divisors
- Characteristic measures the "additive order" of 1 (zero or prime in integral domains)
- Subrings inherit ring structure from parent rings
- Ring homomorphisms preserve both ring operations
- Direct products combine rings componentwise
- The Chinese Remainder Theorem connects modular arithmetic to direct products

Ring properties extend and enrich concepts from group theory while introducing new phenomena specific to two-operation structures.

## Key Takeaways

1. Many familiar arithmetic properties (like $0 \cdot a = 0$) must be proved from ring axioms
2. Cancellation laws require the absence of zero divisors
3. Characteristic is always 0 or prime in integral domains
4. Ring homomorphisms must preserve both addition and multiplication
5. Subrings and quotient rings (next section) provide methods for constructing new rings
6. The Chinese Remainder Theorem reveals deep structure in modular arithmetic
7. Understanding when properties hold versus fail guides problem-solving in ring theory
