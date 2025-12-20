---
title: "Examples of Groups"
description: "A comprehensive survey of important group examples from various mathematical contexts"
---

# Examples of Groups

## Introduction

Groups appear throughout mathematics in many different forms. Understanding a variety of examples is crucial for developing intuition about group theory. In this section, we explore important groups from number theory, linear algebra, geometry, and other areas.

## Number-Theoretic Groups

### The Integers Under Addition

**Group**: $(\mathbb{Z}, +)$

- **Elements**: $\{\ldots, -2, -1, 0, 1, 2, \ldots\}$
- **Operation**: Ordinary addition
- **Identity**: 0
- **Inverses**: The inverse of $n$ is $-n$
- **Abelian**: Yes
- **Order**: Infinite

This is one of the most fundamental groups in mathematics.

### Integers Modulo $n$

**Group**: $(\mathbb{Z}_n, +)$ where $\mathbb{Z}_n = \{0, 1, 2, \ldots, n-1\}$

- **Operation**: Addition modulo $n$
- **Identity**: 0
- **Inverses**: The inverse of $k$ is $n - k$ (or $-k \bmod n$)
- **Abelian**: Yes
- **Order**: $n$

**Example**: $\mathbb{Z}_6 = \{0, 1, 2, 3, 4, 5\}$ with addition modulo 6.

**Cayley Table for $\mathbb{Z}_4$**:
$$\begin{array}{c|cccc}
+ & 0 & 1 & 2 & 3 \\
\hline
0 & 0 & 1 & 2 & 3 \\
1 & 1 & 2 & 3 & 0 \\
2 & 2 & 3 & 0 & 1 \\
3 & 3 & 0 & 1 & 2
\end{array}$$

### Units Modulo $n$

**Group**: $(U(n), \cdot)$ where $U(n) = \{k \in \mathbb{Z}_n : \gcd(k, n) = 1\}$

- **Operation**: Multiplication modulo $n$
- **Identity**: 1
- **Inverses**: Each element has a multiplicative inverse modulo $n$
- **Abelian**: Yes
- **Order**: $\phi(n)$ (Euler's totient function)

**Examples**:
- $U(8) = \{1, 3, 5, 7\}$ with $|U(8)| = \phi(8) = 4$
- $U(10) = \{1, 3, 7, 9\}$ with $|U(10)| = \phi(10) = 4$
- $U(15) = \{1, 2, 4, 7, 8, 11, 13, 14\}$ with $|U(15)| = \phi(15) = 8$

**Cayley Table for $U(8)$**:
$$\begin{array}{c|cccc}
\cdot & 1 & 3 & 5 & 7 \\
\hline
1 & 1 & 3 & 5 & 7 \\
3 & 3 & 1 & 7 & 5 \\
5 & 5 & 7 & 1 & 3 \\
7 & 7 & 5 & 3 & 1
\end{array}$$

### Rational, Real, and Complex Numbers

**Groups**:
- $(\mathbb{Q}, +)$: Rationals under addition
- $(\mathbb{R}, +)$: Reals under addition
- $(\mathbb{C}, +)$: Complex numbers under addition
- $(\mathbb{Q}^*, \cdot)$: Nonzero rationals under multiplication
- $(\mathbb{R}^*, \cdot)$: Nonzero reals under multiplication
- $(\mathbb{C}^*, \cdot)$: Nonzero complex numbers under multiplication

All are abelian and infinite (except when restricted to finite subsets).

### Complex Roots of Unity

**Group**: $(\mu_n, \cdot)$ where $\mu_n = \{z \in \mathbb{C} : z^n = 1\}$

The $n$th roots of unity form a group under complex multiplication:
$$\mu_n = \{e^{2\pi i k/n} : k = 0, 1, \ldots, n-1\}$$

- **Abelian**: Yes
- **Order**: $n$

**Example**: For $n = 4$:
$$\mu_4 = \{1, i, -1, -i\}$$

These are the vertices of a regular $n$-gon inscribed in the unit circle.

## Matrix Groups

### General Linear Group

**Group**: $GL_n(\mathbb{R})$ or $GL_n(\mathbb{C})$

The set of all invertible $n \times n$ matrices over $\mathbb{R}$ (or $\mathbb{C}$) under matrix multiplication.

- **Operation**: Matrix multiplication
- **Identity**: $I_n$ (the identity matrix)
- **Inverses**: Matrix inverse
- **Abelian**: No (for $n \geq 2$)
- **Order**: Infinite

**Example**: For $n = 2$:
$$A = \begin{pmatrix} 1 & 2 \\ 0 & 1 \end{pmatrix}, \quad B = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$$

Both are in $GL_2(\mathbb{R})$, but $AB \neq BA$, showing non-commutativity.

### Special Linear Group

**Group**: $SL_n(\mathbb{R}) = \{A \in GL_n(\mathbb{R}) : \det(A) = 1\}$

Matrices with determinant 1.

- **Abelian**: No (for $n \geq 2$)
- **Order**: Infinite

**Example**:
$$\begin{pmatrix} 2 & 1 \\ 1 & 1 \end{pmatrix} \in SL_2(\mathbb{R}) \quad \text{since } \det = 2 - 1 = 1$$

### Orthogonal and Special Orthogonal Groups

**Group**: $O_n(\mathbb{R}) = \{A \in GL_n(\mathbb{R}) : AA^T = I\}$

Orthogonal matrices (preserving dot product and length).

**Group**: $SO_n(\mathbb{R}) = \{A \in O_n(\mathbb{R}) : \det(A) = 1\}$

Special orthogonal matrices (rotations in $n$ dimensions).

- **Abelian**: No (for $n \geq 2$)
- **Order**: Infinite

**Example**: Rotation by angle $\theta$ in $\mathbb{R}^2$:
$$R_\theta = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix} \in SO_2(\mathbb{R})$$

## Symmetry Groups

### Dihedral Groups

**Group**: $D_n$ (symmetries of a regular $n$-gon)

The dihedral group $D_n$ consists of:
- $n$ rotations: $\{r^0, r^1, r^2, \ldots, r^{n-1}\}$ where $r$ is rotation by $360°/n$
- $n$ reflections

- **Order**: $2n$
- **Abelian**: Only for $n = 1, 2$

**Example**: $D_3$ (symmetries of equilateral triangle)
- **Elements**: $\{e, r, r^2, f_1, f_2, f_3\}$
- **Relations**: $r^3 = e$, $f_i^2 = e$, $rf_i = f_{i+1}r^{-1}$

**Example**: $D_4$ (symmetries of square)
- **Elements**: 4 rotations + 4 reflections = 8 elements
- **Order**: 8

**Cayley Table for $D_3$** (partial):
$$\begin{array}{c|cccccc}
\circ & e & r & r^2 & f_1 & f_2 & f_3 \\
\hline
e & e & r & r^2 & f_1 & f_2 & f_3 \\
r & r & r^2 & e & f_2 & f_3 & f_1 \\
r^2 & r^2 & e & r & f_3 & f_1 & f_2 \\
f_1 & f_1 & f_3 & f_2 & e & r^2 & r
\end{array}$$

### Symmetric Group

**Group**: $S_n$ (permutations of $n$ elements)

The set of all bijective functions from $\{1, 2, \ldots, n\}$ to itself.

- **Operation**: Function composition
- **Identity**: Identity permutation
- **Order**: $n!$
- **Abelian**: Only for $n \leq 2$

**Example**: $S_3$ has 6 elements representing all ways to rearrange three objects.

**Example Permutation in $S_5$**:
$$\sigma = \begin{pmatrix} 1 & 2 & 3 & 4 & 5 \\ 3 & 1 & 5 & 4 & 2 \end{pmatrix}$$

This maps $1 \to 3$, $2 \to 1$, $3 \to 5$, $4 \to 4$, $5 \to 2$.

### Alternating Group

**Group**: $A_n$ (even permutations)

The subgroup of $S_n$ consisting of permutations that are products of an even number of transpositions.

- **Order**: $n!/2$
- **Abelian**: Only for $n \leq 3$

$A_n$ is extremely important in Galois theory and the unsolvability of the quintic equation.

## Geometric and Topological Groups

### Circle Group

**Group**: $S^1 = \{z \in \mathbb{C} : |z| = 1\}$

The unit circle in the complex plane under multiplication.

- **Abelian**: Yes
- **Order**: Infinite (uncountable)

Can be parametrized as $S^1 = \{e^{i\theta} : \theta \in [0, 2\pi)\}$.

### Quaternion Group

**Group**: $Q_8 = \{\pm 1, \pm i, \pm j, \pm k\}$

Where $i^2 = j^2 = k^2 = ijk = -1$.

- **Order**: 8
- **Abelian**: No

**Multiplication Rules**:
- $ij = k$, $jk = i$, $ki = j$
- $ji = -k$, $kj = -i$, $ik = -j$

This is the smallest non-abelian group with all elements of order at most 4.

## Function Groups

### Symmetric Functions

**Group**: Let $S$ be any nonempty set. The set $\text{Sym}(S)$ of all bijections from $S$ to $S$ forms a group under composition.

- **Operation**: Function composition
- **Identity**: Identity function $\text{id}_S$
- **Inverses**: Inverse functions

When $S = \{1, 2, \ldots, n\}$, we get $S_n$.

### Automorphism Groups

**Group**: $\text{Aut}(G)$ (automorphisms of group $G$)

The set of all isomorphisms from a group $G$ to itself.

- **Operation**: Function composition
- **Identity**: Identity automorphism

This group encodes the symmetries of the group structure itself.

## Klein Four-Group

**Group**: $V_4 = \{e, a, b, c\}$ with $a^2 = b^2 = c^2 = e$ and $ab = c$, $bc = a$, $ca = b$.

- **Order**: 4
- **Abelian**: Yes

**Cayley Table**:
$$\begin{array}{c|cccc}
\cdot & e & a & b & c \\
\hline
e & e & a & b & c \\
a & a & e & c & b \\
b & b & c & e & a \\
c & c & b & a & e
\end{array}$$

This can be realized as $\mathbb{Z}_2 \times \mathbb{Z}_2$ or as a subgroup of $D_4$.

## Direct Products

Given groups $G$ and $H$, the **direct product** $G \times H$ consists of ordered pairs $(g, h)$ with componentwise operation:
$$(g_1, h_1) \cdot (g_2, h_2) = (g_1g_2, h_1h_2)$$

**Examples**:
- $\mathbb{Z}_2 \times \mathbb{Z}_3 \cong \mathbb{Z}_6$
- $\mathbb{Z}_2 \times \mathbb{Z}_2$ (Klein four-group)
- $\mathbb{R}^2 = \mathbb{R} \times \mathbb{R}$ under addition

## Summary Table

| Group | Operation | Order | Abelian |
|-------|-----------|-------|---------|
| $\mathbb{Z}$ | Addition | $\infty$ | Yes |
| $\mathbb{Z}_n$ | Addition mod $n$ | $n$ | Yes |
| $U(n)$ | Multiplication mod $n$ | $\phi(n)$ | Yes |
| $GL_n(\mathbb{R})$ | Matrix multiplication | $\infty$ | No ($n \geq 2$) |
| $S_n$ | Composition | $n!$ | No ($n \geq 3$) |
| $A_n$ | Composition | $n!/2$ | No ($n \geq 4$) |
| $D_n$ | Composition | $2n$ | No ($n \geq 3$) |
| $Q_8$ | Quaternion mult. | 8 | No |
| $V_4$ | Special mult. | 4 | Yes |

These examples illustrate the diversity and ubiquity of group structures in mathematics.
