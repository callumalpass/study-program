---
title: "Order of Elements"
description: "Understanding element order and its fundamental properties in group theory"
---

# Order of Elements

## Definition of Order

The order of an element captures how many times we must apply the group operation to return to the identity.

**Definition**: Let $G$ be a group and $a \in G$. The **order** of $a$, denoted $|a|$ or $o(a)$, is:
- The smallest positive integer $n$ such that $a^n = e$, if such an $n$ exists
- $\infty$ (infinity) if no such positive integer exists

**In additive notation**: The order of $a$ is the smallest positive $n$ such that $na = 0$.

### Examples

**Example 1**: In $(\mathbb{Z}, +)$:
- $|0| = 1$ (since $1 \cdot 0 = 0$)
- $|5| = \infty$ (no positive $n$ gives $n \cdot 5 = 0$)
- In fact, every nonzero integer has infinite order

**Example 2**: In $\mathbb{Z}_{12}$ under addition:
- $|0| = 1$
- $|3| = 4$ (since $4 \cdot 3 = 12 \equiv 0 \pmod{12}$)
- $|4| = 3$ (since $3 \cdot 4 = 12 \equiv 0 \pmod{12}$)
- $|6| = 2$ (since $2 \cdot 6 = 12 \equiv 0 \pmod{12}$)
- $|5| = 12$ (since $12 \cdot 5 = 60 \equiv 0 \pmod{12}$)

**Example 3**: In $U(8) = \{1, 3, 5, 7\}$ under multiplication modulo 8:
- $|1| = 1$ (since $1^1 = 1$)
- $|3| = 2$ (since $3^2 = 9 \equiv 1 \pmod{8}$)
- $|5| = 2$ (since $5^2 = 25 \equiv 1 \pmod{8}$)
- $|7| = 2$ (since $7^2 = 49 \equiv 1 \pmod{8}$)

**Example 4**: In $D_4$ (symmetries of square):
- $|e| = 1$ (identity always has order 1)
- $|r| = 4$ where $r$ is 90° rotation
- $|r^2| = 2$ (180° rotation)
- $|f| = 2$ for any reflection $f$

## Basic Properties

### Theorem 1: Identity Has Order 1

**Theorem**: The identity element $e$ is the only element of order 1.

**Proof**: If $|a| = 1$, then $a^1 = e$, so $a = e$. Conversely, $|e| = 1$ by definition. $\square$

### Theorem 2: Inverse Has Same Order

**Theorem**: For any $a \in G$, we have $|a| = |a^{-1}|$.

**Proof**: Suppose $|a| = n$. Then $a^n = e$, so:
$$(a^{-1})^n = (a^n)^{-1} = e^{-1} = e$$

This shows $|a^{-1}| \leq n$.

Similarly, if $(a^{-1})^m = e$, then $a^m = ((a^{-1})^m)^{-1} = e^{-1} = e$, showing $|a| \leq m$.

If $|a| = n$ is finite, then $|a^{-1}| \leq n$ and $|a| \leq |a^{-1}|$, so $|a^{-1}| = n$.

If $|a| = \infty$, then $|a^{-1}| = \infty$ by similar reasoning. $\square$

### Theorem 3: Powers and Divisibility

**Theorem**: Let $a \in G$ with $|a| = n < \infty$. Then $a^k = e$ if and only if $n | k$.

**Proof**:
($\Leftarrow$) If $k = nm$ for some integer $m$, then:
$$a^k = a^{nm} = (a^n)^m = e^m = e$$

($\Rightarrow$) Suppose $a^k = e$. By the division algorithm, write $k = qn + r$ where $0 \leq r < n$. Then:
$$e = a^k = a^{qn + r} = (a^n)^q \cdot a^r = e^q \cdot a^r = a^r$$

Since $|a| = n$ is the smallest positive integer with $a^n = e$, and $0 \leq r < n$, we must have $r = 0$. Therefore, $k = qn$, so $n | k$. $\square$

**Corollary**: If $|a| = n$, then $a^i = a^j$ if and only if $i \equiv j \pmod{n}$.

**Proof**: $a^i = a^j \Leftrightarrow a^{i-j} = e \Leftrightarrow n | (i-j) \Leftrightarrow i \equiv j \pmod{n}$. $\square$

## Order of Powers

### Theorem 4: Order of $a^k$

**Theorem**: Let $a \in G$ with $|a| = n < \infty$. Then:
$$|a^k| = \frac{n}{\gcd(n, k)}$$

**Proof**: Let $d = \gcd(n, k)$, and write $n = dm$ and $k = d\ell$ where $\gcd(m, \ell) = 1$.

We need to find the smallest positive integer $t$ such that $(a^k)^t = e$.

$(a^k)^t = e \Leftrightarrow a^{kt} = e \Leftrightarrow n | kt \Leftrightarrow dm | d\ell t \Leftrightarrow m | \ell t$

Since $\gcd(m, \ell) = 1$, we have $m | \ell t \Leftrightarrow m | t$.

The smallest positive $t$ satisfying this is $t = m = \frac{n}{d} = \frac{n}{\gcd(n,k)}$. $\square$

**Corollary**: $|a^k| = |a|$ if and only if $\gcd(k, |a|) = 1$.

### Examples

**Example 1**: In $\mathbb{Z}_{12}$, if $a = 3$ then $|a| = 4$. What is $|a^2|$?
$$|a^2| = \frac{4}{\gcd(4, 2)} = \frac{4}{2} = 2$$

Verification: $2 \cdot (2 \cdot 3) = 2 \cdot 6 = 12 \equiv 0 \pmod{12}$. ✓

**Example 2**: In $\mathbb{Z}_{20}$, if $a = 8$ then $|a| = \frac{20}{\gcd(20,8)} = \frac{20}{4} = 5$.

For $|a^3|$:
$$|a^3| = \frac{5}{\gcd(5, 3)} = \frac{5}{1} = 5$$

So $|a^3| = |a|$ since $\gcd(3, 5) = 1$.

## Relationship to Cyclic Subgroups

**Theorem 5**: If $|a| = n$, then $\langle a \rangle = \{e, a, a^2, \ldots, a^{n-1}\}$ and $|\langle a \rangle| = n$.

**Proof**: By Theorem 3, the elements $e, a, a^2, \ldots, a^{n-1}$ are all distinct (if $a^i = a^j$ with $0 \leq i < j < n$, then $a^{j-i} = e$ with $0 < j-i < n$, contradicting $|a| = n$).

For any $a^k \in \langle a \rangle$, write $k = qn + r$ with $0 \leq r < n$. Then $a^k = a^r \in \{e, a, \ldots, a^{n-1}\}$.

Therefore, $\langle a \rangle = \{e, a, a^2, \ldots, a^{n-1}\}$ has exactly $n$ elements. $\square$

**Consequence**: The order of an element equals the size of the cyclic subgroup it generates.

## Order in Finite Groups

In finite groups, all elements have finite order.

**Theorem 6**: Every element of a finite group has finite order.

**Proof**: Let $G$ be finite with $|G| = n$, and let $a \in G$. Consider the sequence:
$$a, a^2, a^3, \ldots, a^{n+1}$$

These are $n+1$ elements, but $G$ has only $n$ elements. By the pigeonhole principle, $a^i = a^j$ for some $1 \leq i < j \leq n+1$. Then $a^{j-i} = e$ with $1 \leq j - i \leq n$.

Therefore, $|a| \leq n < \infty$. $\square$

**Corollary**: In a finite group of order $n$, every element $a$ satisfies $a^n = e$ (though the order might be smaller).

## Computing Orders

### In $\mathbb{Z}_n$

**Theorem**: In $\mathbb{Z}_n$ under addition, the order of element $k$ is:
$$|k| = \frac{n}{\gcd(n, k)}$$

**Proof**: The smallest positive integer $m$ such that $mk \equiv 0 \pmod{n}$ is the smallest $m$ such that $n | mk$, which is $\frac{n}{\gcd(n,k)}$. $\square$

**Example**: In $\mathbb{Z}_{36}$:
- $|9| = \frac{36}{\gcd(36, 9)} = \frac{36}{9} = 4$
- $|10| = \frac{36}{\gcd(36, 10)} = \frac{36}{2} = 18$
- $|5| = \frac{36}{\gcd(36, 5)} = \frac{36}{1} = 36$

### In $U(n)$

Computing orders in $U(n)$ requires finding the multiplicative order modulo $n$.

**Example**: In $U(10) = \{1, 3, 7, 9\}$:
- $|1| = 1$
- $|3|$: $3^1 = 3$, $3^2 = 9$, $3^3 = 27 \equiv 7$, $3^4 = 81 \equiv 1$. So $|3| = 4$.
- $|7|$: $7^1 = 7$, $7^2 = 49 \equiv 9$, $7^3 \equiv 63 \equiv 3$, $7^4 \equiv 21 \equiv 1$. So $|7| = 4$.
- $|9|$: $9^1 = 9$, $9^2 = 81 \equiv 1$. So $|9| = 2$.

### In Matrix Groups

**Example**: In $GL_2(\mathbb{R})$, consider:
$$A = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$$

This is rotation by 90°. Computing powers:
$$A^2 = \begin{pmatrix} -1 & 0 \\ 0 & -1 \end{pmatrix}, \quad A^3 = \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}, \quad A^4 = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$$

So $|A| = 4$.

## Applications

### Generating Elements

An element $a$ **generates** group $G$ if $\langle a \rangle = G$, i.e., every element can be written as a power of $a$.

**Example**: In $\mathbb{Z}_{12}$:
- $\langle 1 \rangle = \mathbb{Z}_{12}$ (1 is a generator)
- $\langle 5 \rangle = \mathbb{Z}_{12}$ (5 is a generator since $\gcd(5, 12) = 1$)
- $\langle 4 \rangle = \{0, 4, 8\} \neq \mathbb{Z}_{12}$ (4 is not a generator)

**Theorem**: In $\mathbb{Z}_n$, element $k$ generates $\mathbb{Z}_n$ if and only if $\gcd(k, n) = 1$.

**Proof**: $\langle k \rangle = \mathbb{Z}_n \Leftrightarrow |k| = n \Leftrightarrow \frac{n}{\gcd(n,k)} = n \Leftrightarrow \gcd(n, k) = 1$. $\square$

### Counting Elements of Given Order

**Example**: In $\mathbb{Z}_{20}$, how many elements have order 4?

We need $|k| = 4$, so $\frac{20}{\gcd(20, k)} = 4$, giving $\gcd(20, k) = 5$.

The elements with $\gcd(20, k) = 5$ are $k = 5, 15$ (multiples of 5 less than 20).

Answer: 2 elements have order 4.

## Summary

Element order is a fundamental concept in group theory:
- The order of $a$ is the size of $\langle a \rangle$
- $|a| = n$ means $a^n = e$ and $n$ is minimal
- $|a^k| = \frac{|a|}{\gcd(|a|, k)}$
- In $\mathbb{Z}_n$: $|k| = \frac{n}{\gcd(n, k)}$

Understanding orders helps us analyze group structure and identify generators.
