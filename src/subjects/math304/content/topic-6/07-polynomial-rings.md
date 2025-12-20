---
title: "Polynomial Rings"
description: "Introduction to polynomial rings and their properties"
---

# Polynomial Rings

## Introduction

Polynomial rings stand among the most important constructions in algebra, connecting abstract ring theory to concrete computational mathematics. They appear throughout mathematics: in solving equations, studying symmetries, defining algebraic varieties in geometry, and constructing field extensions.

The polynomial ring $R[x]$ over a ring $R$ consists of all polynomials with coefficients from $R$, equipped with natural addition and multiplication operations. Despite their familiar appearance from elementary algebra, polynomial rings exhibit rich structural properties that generalize in surprising ways when the coefficient ring varies.

Understanding polynomial rings is essential for:
- **Field theory**: Constructing field extensions and studying Galois theory
- **Algebraic geometry**: Defining varieties as zero sets of polynomials
- **Coding theory**: Using polynomial methods for error correction
- **Number theory**: Studying algebraic integers and cyclotomic fields

## Definition

**Definition**: For ring $R$, the **polynomial ring** $R[x]$ consists of polynomials:
$$f(x) = a_n x^n + a_{n-1} x^{n-1} + \cdots + a_1 x + a_0$$
where $a_i \in R$ (coefficients) and $n \geq 0$.

**Formal definition**: A polynomial is a sequence $(a_0, a_1, a_2, \ldots)$ where $a_i \in R$ and only finitely many $a_i$ are non-zero. We write this as $\sum_{i=0}^n a_i x^i$ where $a_n \neq 0$ (or all coefficients are zero).

**Operations**:
- **Addition**: $(a_n x^n + \cdots + a_0) + (b_m x^m + \cdots + b_0) = \sum_{i=0}^{\max(n,m)} (a_i + b_i)x^i$
- **Multiplication**: $(\sum a_i x^i)(\sum b_j x^j) = \sum_{k} (\sum_{i+j=k} a_i b_j) x^k$

**Interpretation of $x$**: The symbol $x$ is an **indeterminate**, not a variable. It's a formal symbol used to build the polynomial structure, not a number to be substituted.

## Examples

### Example 1: $\mathbb{Z}[x]$

Polynomials with integer coefficients:
$$f(x) = 3x^4 - 2x^2 + 5x - 1$$

This is an integral domain (since $\mathbb{Z}$ is), but not a field (since $x$ has no multiplicative inverse).

### Example 2: $\mathbb{R}[x]$

Polynomials with real coefficients. This is the familiar setting from calculus and algebra courses.

Example: $f(x) = x^2 - 2$ factors as $(x-\sqrt{2})(x+\sqrt{2})$ in $\mathbb{R}[x]$.

### Example 3: $\mathbb{Z}_2[x]$

Polynomials with coefficients in $\mathbb{Z}_2 = \{0, 1\}$:
$$f(x) = x^3 + x + 1$$

Addition and multiplication use mod 2 arithmetic:
$$(x^2 + 1) + (x^2 + x) = 2x^2 + x + 1 = x + 1 \pmod 2$$

### Example 4: Multiple Variables

Can form $R[x, y] = (R[x])[y]$ (polynomials in $y$ with coefficients in $R[x]$).

Example in $\mathbb{R}[x,y]$:
$$f(x,y) = x^2 y + 3xy^2 - 5$$

This generalizes to $R[x_1, \ldots, x_n]$ for any number of indeterminates.

## Properties

### Theorem 1: Ring Structure

**Theorem**: If $R$ is a ring, then $R[x]$ is a ring.

**Proof sketch**: Verify ring axioms:
- **Abelian group under addition**: Straightforward from coefficient-wise addition
- **Associative multiplication**: Follows from associativity in $R$ and distributivity
- **Distributivity**: Follows from distributivity in $R$ $\square$

**Inherited properties**:

**Theorem**: If $R$ is commutative, so is $R[x]$.

**Theorem**: If $R$ has unity 1, then $R[x]$ has unity (the constant polynomial 1).

**Theorem**: If $R$ is an integral domain, so is $R[x]$.

**Proof of last theorem**: Suppose $f, g \in R[x]$ are non-zero with leading coefficients $a_n, b_m$.

The leading coefficient of $fg$ is $a_n b_m$. Since $R$ is an integral domain and $a_n, b_m \neq 0$, we have $a_n b_m \neq 0$.

Thus $fg \neq 0$, showing $R[x]$ has no zero divisors. $\square$

**Important**: $R[x]$ is NOT a field, even when $R$ is a field. The polynomial $x$ never has a multiplicative inverse.

### Theorem 2: Subring Embedding

**Theorem**: $R$ embeds naturally as a subring of $R[x]$ via constant polynomials:
$$r \mapsto r \cdot 1 = r$$

This allows us to view $R \subseteq R[x]$, treating ring elements as degree-0 polynomials.

## Degree

**Definition**: For non-zero polynomial $f(x) = a_n x^n + \cdots + a_0$ with $a_n \neq 0$:
$$\deg(f) = n$$

The **degree** is the highest power with non-zero coefficient.

**Conventions**:
- $\deg(0) = -\infty$ (or undefined)
- Constant non-zero polynomials have degree 0

### Properties of Degree

**Theorem**: For polynomials $f, g \in R[x]$:
1. $\deg(f + g) \leq \max(\deg f, \deg g)$ (equality holds if leading coefficients don't cancel)
2. If $R$ is integral domain: $\deg(fg) = \deg f + \deg g$
3. If $R$ has zero divisors, degree may not add properly

**Example of (2)**: In $\mathbb{R}[x]$:
$$\deg((x^2 + 1)(x^3 - 2)) = \deg(x^2 + 1) + \deg(x^3 - 2) = 2 + 3 = 5$$

**Example where (2) fails**: In $\mathbb{Z}_6[x]$:
$$(2x)(3x) = 6x^2 = 0$$
So $\deg((2x)(3x)) = -\infty \neq \deg(2x) + \deg(3x) = 1 + 1 = 2$.

This happens because 6 = 0 in $\mathbb{Z}_6$ (zero divisor in coefficient ring).

## Division Algorithm

When the coefficient ring is a field, polynomial division works just like integer division:

**Theorem (Division Algorithm)**: If $F$ is a field and $f, g \in F[x]$ with $g \neq 0$, there exist unique $q, r \in F[x]$ such that:
$$f = qg + r \quad \text{where } \deg r < \deg g \text{ or } r = 0$$

**Proof sketch**: Use long division algorithm, dividing leading terms successively. Uniqueness follows from degree considerations. $\square$

**Example**: Divide $f(x) = x^3 + 2x - 1$ by $g(x) = x - 1$ in $\mathbb{Q}[x]$:

$$x^3 + 2x - 1 = (x^2 + x + 3)(x - 1) + 2$$

So $q(x) = x^2 + x + 3$ and $r(x) = 2$.

**Important**: Division algorithm requires $F$ to be a field! It fails for $\mathbb{Z}[x]$ because we can't always divide coefficients.

**Consequence**: $F[x]$ behaves like the integers with respect to division, enabling:
- Euclidean algorithm for GCD
- Unique factorization (Principal Ideal Domain structure)
- Remainder theorem and factor theorem

## Evaluation Homomorphism

**Definition**: For $a \in R$, the **evaluation at $a$** map is:
$$\text{ev}_a: R[x] \to R, \quad \text{ev}_a(f) = f(a)$$

This substitutes $a$ for $x$ in the polynomial.

**Theorem**: $\text{ev}_a$ is a ring homomorphism.

**Proof**: Straightforward verification that $\text{ev}_a(f+g) = \text{ev}_a(f) + \text{ev}_a(g)$ and $\text{ev}_a(fg) = \text{ev}_a(f)\text{ev}_a(g)$. $\square$

**Kernel**: $\ker(\text{ev}_a) = \{f \in R[x] : f(a) = 0\}$ (polynomials vanishing at $a$).

**Remainder Theorem**: $f(a) = r$ where $r$ is the remainder when dividing $f$ by $(x-a)$.

**Factor Theorem**: $f(a) = 0$ if and only if $(x-a)$ divides $f(x)$ in $F[x]$.

## Irreducible Polynomials

**Definition**: Non-constant $f \in F[x]$ is **irreducible** over field $F$ if it cannot be factored into polynomials of lower degree over $F$.

Equivalently: If $f = gh$ in $F[x]$, then $g$ or $h$ is a unit (constant polynomial).

**Examples**:

1. **$x^2 + 1$ in $\mathbb{R}[x]$**: Irreducible (no real roots)
   - But factors in $\mathbb{C}[x]$: $x^2 + 1 = (x-i)(x+i)$

2. **$x^2 - 2$ in $\mathbb{Q}[x]$**: Irreducible
   - But factors in $\mathbb{R}[x]$: $x^2 - 2 = (x-\sqrt{2})(x+\sqrt{2})$

3. **$x^2 + x + 1$ in $\mathbb{Z}_2[x]$**: Irreducible
   - Check: No roots in $\mathbb{Z}_2$ (try $0$ and $1$)

4. **Linear polynomials**: Always irreducible (can't factor non-trivially)

**Dependence on field**: Irreducibility depends critically on the coefficient field!

### Irreducibility Tests

**Theorem (Degree 2 or 3)**: Over field $F$, polynomial of degree 2 or 3 is irreducible if and only if it has no roots in $F$.

**Eisenstein's Criterion**: Let $f(x) = a_n x^n + \cdots + a_0 \in \mathbb{Z}[x]$. If there exists prime $p$ such that:
1. $p \nmid a_n$ (doesn't divide leading coefficient)
2. $p \mid a_i$ for all $i < n$ (divides all other coefficients)
3. $p^2 \nmid a_0$ (doesn't divide constant term twice)

Then $f$ is irreducible over $\mathbb{Q}$.

**Example**: $f(x) = x^4 + 6x^3 + 12x + 3$ is irreducible over $\mathbb{Q}$ by Eisenstein with $p = 3$.

## Unique Factorization

**Theorem**: If $F$ is a field, then $F[x]$ is a Unique Factorization Domain (UFD).

Every non-zero polynomial can be written uniquely (up to units and order) as:
$$f(x) = c \cdot p_1(x)^{e_1} p_2(x)^{e_2} \cdots p_k(x)^{e_k}$$
where $c \in F$ is constant and $p_i$ are monic irreducible polynomials.

**Example**: Over $\mathbb{R}$:
$$x^4 - 1 = (x-1)(x+1)(x^2+1)$$

The factors $x-1, x+1, x^2+1$ are all irreducible over $\mathbb{R}$.

Over $\mathbb{C}$: $x^4 - 1 = (x-1)(x+1)(x-i)(x+i)$ (factoring $x^2+1$ further).

## Applications

### Constructing Field Extensions

Quotient rings $F[x]/\langle p(x) \rangle$ where $p$ is irreducible give field extensions:

**Example**: $\mathbb{R}[x]/\langle x^2+1 \rangle \cong \mathbb{C}$

This is how we rigorously construct $\mathbb{C}$ from $\mathbb{R}$.

### Algebraic Geometry

Varieties are defined as zero sets of polynomials:
$$V(I) = \{(a_1, \ldots, a_n) : f(a_1, \ldots, a_n) = 0 \text{ for all } f \in I\}$$

The ideal structure of $F[x_1, \ldots, x_n]$ corresponds to geometric properties.

### Coding Theory

**Cyclic codes** use ideals in $F[x]/\langle x^n-1 \rangle$ for error correction.

### Galois Theory

Study of polynomial roots and solvability by radicals uses field extensions generated by adjoining polynomial roots.

## Principal Ideal Domain

**Theorem**: If $F$ is a field, then $F[x]$ is a Principal Ideal Domain (PID).

Every ideal $I \subseteq F[x]$ has the form $I = \langle f(x) \rangle$ for some polynomial $f$.

**Proof**: Take $f$ to be non-zero polynomial of minimal degree in $I$. Division algorithm shows every element of $I$ is a multiple of $f$. $\square$

**Consequence**: $F[x]$ has GCD structure: any two polynomials have a greatest common divisor, computable via Euclidean algorithm.

**Example**: $\gcd(x^3-1, x^2-1)$ in $\mathbb{Q}[x]$:

Using Euclidean algorithm: $\gcd(x^3-1, x^2-1) = x-1$.

## Summary

- **$R[x]$**: polynomials with coefficients in $R$, standard addition/multiplication
- **Inherits properties**: If $R$ commutative/has unity/is integral domain, so is $R[x]$
- **Degree**: $\deg(fg) = \deg(f) + \deg(g)$ in integral domains
- **Division algorithm**: Works in $F[x]$ when $F$ is a field
- **Irreducible polynomials**: Cannot be factored over given field
- **Unique factorization**: $F[x]$ is UFD when $F$ is field
- **PID structure**: Every ideal in $F[x]$ is principal
- **Applications**: Field extensions, algebraic geometry, coding theory, Galois theory

Polynomial rings are fundamental structures connecting algebra to geometry and number theory, providing concrete realizations of abstract ring concepts.

## Key Takeaways

1. Polynomial rings $R[x]$ inherit many properties from coefficient ring $R$
2. The indeterminate $x$ is a formal symbol, not a variable to substitute
3. Division algorithm works over fields, making $F[x]$ similar to $\mathbb{Z}$
4. Degree function $\deg(fg) = \deg(f) + \deg(g)$ requires integral domain coefficients
5. Irreducibility depends on the coefficient field (context matters!)
6. $F[x]$ is a Principal Ideal Domain when $F$ is a field
7. Quotients by irreducible polynomials construct field extensions
8. Polynomial rings connect abstract algebra to geometry, analysis, and computation
9. Unique factorization in $F[x]$ parallels prime factorization in $\mathbb{Z}$
10. Evaluation homomorphisms link polynomial algebra to solving equations
