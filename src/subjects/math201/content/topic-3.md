## Vector Spaces

Vector spaces are the fundamental algebraic structures in linear algebra. They abstract the essential properties of vectors in $\mathbb{R}^n$ to create a general framework that applies to polynomials, matrices, functions, and countless other mathematical objects. This abstraction reveals deep connections between seemingly different areas of mathematics and provides powerful tools for solving problems across science and engineering.

**Why This Matters:**
Vector spaces appear everywhere in mathematics, physics, computer science, and data science. Quantum mechanics uses infinite-dimensional vector spaces of wave functions. Computer graphics relies on transformations in $\mathbb{R}^3$. Machine learning algorithms work in high-dimensional feature spaces. Signal processing decomposes functions into basis components. Understanding vector spaces provides a unified language for all these applications.

**Learning Objectives:**
- Understand vectors in $\mathbb{R}^n$ and their geometric interpretation
- Master the 10 axioms that define a vector space
- Recognize diverse examples of vector spaces beyond $\mathbb{R}^n$
- Identify and verify subspaces using the subspace test
- Compute spans and determine spanning sets
- Find null spaces, column spaces, and row spaces of matrices
- Work with coordinate systems relative to different bases

---

## Core Concepts

### Vectors in $\mathbb{R}^n$

A **vector in $\mathbb{R}^n$** is an ordered list of $n$ real numbers:

$$\mathbf{v} = \begin{bmatrix} v_1 \\ v_2 \\ \vdots \\ v_n \end{bmatrix}$$

Vectors support two fundamental operations:
- **Vector addition:** $\mathbf{u} + \mathbf{v}$ combines corresponding components
- **Scalar multiplication:** $c\mathbf{v}$ scales each component by $c$

Geometrically in $\mathbb{R}^2$ and $\mathbb{R}^3$, vectors represent directed line segments from the origin. Addition follows the parallelogram rule, and scalar multiplication stretches or shrinks the vector.

### The Vector Space Axioms

A **vector space** is a set $V$ with operations of addition and scalar multiplication satisfying 10 axioms:

**Closure:**
1. If $\mathbf{u}, \mathbf{v} \in V$, then $\mathbf{u} + \mathbf{v} \in V$
2. If $\mathbf{v} \in V$ and $c \in \mathbb{R}$, then $c\mathbf{v} \in V$

**Addition Axioms:**
3. $\mathbf{u} + \mathbf{v} = \mathbf{v} + \mathbf{u}$ (commutativity)
4. $(\mathbf{u} + \mathbf{v}) + \mathbf{w} = \mathbf{u} + (\mathbf{v} + \mathbf{w})$ (associativity)
5. There exists $\mathbf{0} \in V$ such that $\mathbf{v} + \mathbf{0} = \mathbf{v}$ (zero vector)
6. For each $\mathbf{v} \in V$, there exists $-\mathbf{v} \in V$ such that $\mathbf{v} + (-\mathbf{v}) = \mathbf{0}$ (additive inverse)

**Scalar Multiplication Axioms:**
7. $c(\mathbf{u} + \mathbf{v}) = c\mathbf{u} + c\mathbf{v}$ (distributive over vector addition)
8. $(c + d)\mathbf{v} = c\mathbf{v} + d\mathbf{v}$ (distributive over scalar addition)
9. $c(d\mathbf{v}) = (cd)\mathbf{v}$ (associative)
10. $1\mathbf{v} = \mathbf{v}$ (identity)

These axioms capture the essential algebraic structure shared by all vector spaces.

### Subspaces

A **subspace** of a vector space $V$ is a subset $H \subseteq V$ that is itself a vector space (with the same operations).

**Subspace Test:** $H$ is a subspace of $V$ if and only if:
1. The zero vector $\mathbf{0} \in H$
2. $H$ is closed under addition: if $\mathbf{u}, \mathbf{v} \in H$, then $\mathbf{u} + \mathbf{v} \in H$
3. $H$ is closed under scalar multiplication: if $\mathbf{v} \in H$ and $c \in \mathbb{R}$, then $c\mathbf{v} \in H$

Common subspaces include lines and planes through the origin in $\mathbb{R}^3$.

### Span and Linear Combinations

A **linear combination** of vectors $\mathbf{v}_1, \mathbf{v}_2, \ldots, \mathbf{v}_p$ is any vector of the form:

$$c_1\mathbf{v}_1 + c_2\mathbf{v}_2 + \cdots + c_p\mathbf{v}_p$$

where $c_1, c_2, \ldots, c_p$ are scalars.

The **span** of $\{\mathbf{v}_1, \mathbf{v}_2, \ldots, \mathbf{v}_p\}$ is the set of all linear combinations:

$$\text{Span}\{\mathbf{v}_1, \mathbf{v}_2, \ldots, \mathbf{v}_p\} = \{c_1\mathbf{v}_1 + c_2\mathbf{v}_2 + \cdots + c_p\mathbf{v}_p : c_i \in \mathbb{R}\}$$

The span is always a subspace. If $\text{Span}\{\mathbf{v}_1, \ldots, \mathbf{v}_p\} = V$, we say the vectors **span** $V$.

### Matrix Subspaces

For any $m \times n$ matrix $A$:

**Null Space (Kernel):**
$$\text{Nul}(A) = \{\mathbf{x} \in \mathbb{R}^n : A\mathbf{x} = \mathbf{0}\}$$

The set of all solutions to the homogeneous equation $A\mathbf{x} = \mathbf{0}$.

**Column Space (Range):**
$$\text{Col}(A) = \text{Span}\{\mathbf{a}_1, \mathbf{a}_2, \ldots, \mathbf{a}_n\}$$

where $\mathbf{a}_i$ are the columns of $A$. This is the set of all possible outputs $A\mathbf{x}$.

**Row Space:**
$$\text{Row}(A) = \text{Col}(A^T)$$

The span of the rows of $A$ (equivalently, the column space of $A^T$).

All three are subspaces: Nul$(A)$ is a subspace of $\mathbb{R}^n$, while Col$(A)$ and Row$(A)$ are subspaces of $\mathbb{R}^m$ and $\mathbb{R}^n$ respectively.

### Coordinate Systems

Given a basis $\mathcal{B} = \{\mathbf{b}_1, \mathbf{b}_2, \ldots, \mathbf{b}_n\}$ for vector space $V$, every vector $\mathbf{v} \in V$ can be uniquely written as:

$$\mathbf{v} = c_1\mathbf{b}_1 + c_2\mathbf{b}_2 + \cdots + c_n\mathbf{b}_n$$

The **coordinate vector** of $\mathbf{v}$ relative to $\mathcal{B}$ is:

$$[\mathbf{v}]_\mathcal{B} = \begin{bmatrix} c_1 \\ c_2 \\ \vdots \\ c_n \end{bmatrix}$$

This creates an isomorphism between $V$ and $\mathbb{R}^n$, allowing us to work with coordinates instead of abstract vectors.

---

## Common Patterns and Techniques

### Verifying Vector Spaces
Check all 10 axioms systematically. Focus on closure first (many sets fail here), then zero vector and inverses, then the algebraic properties.

### Identifying Subspaces
Use the three-condition subspace test. The hardest part is usually verifying closure under addition and scalar multiplication.

### Computing Spans
To determine if $\mathbf{b}$ is in Span$\{\mathbf{v}_1, \ldots, \mathbf{v}_p\}$, ask: does the equation $x_1\mathbf{v}_1 + \cdots + x_p\mathbf{v}_p = \mathbf{b}$ have a solution? This is a linear system.

### Finding Null Spaces
Solve $A\mathbf{x} = \mathbf{0}$ using row reduction. Express the solution in parametric vector form to identify a spanning set for Nul$(A)$.

### Finding Column Spaces
Row reduce $A$ to identify pivot columns. The corresponding columns of the *original* matrix $A$ (not the reduced form) form a basis for Col$(A)$.

---

## Common Mistakes and Debugging

### Mistake 1: Confusing Span with Set
Span$\{\mathbf{v}_1, \mathbf{v}_2\}$ is not $\{\mathbf{v}_1, \mathbf{v}_2\}$. The span includes all linear combinations—infinitely many vectors for non-zero $\mathbf{v}_i$.

### Mistake 2: Forgetting Zero Vector Requirement
Subspaces must contain $\mathbf{0}$. A line not through the origin is NOT a subspace of $\mathbb{R}^2$.

### Mistake 3: Using Reduced Matrix for Basis
When finding a basis for Col$(A)$, use the pivot columns of the *original* $A$, not the row-reduced form.

### Mistake 4: Assuming All Sets Are Vector Spaces
Not every set with addition and scalar multiplication is a vector space. For example, the set of all vectors in $\mathbb{R}^2$ with positive components fails axiom 6 (no additive inverses).

---

## Best Practices

1. **Verify closure first** when checking vector space or subspace properties
2. **Use geometric intuition** in $\mathbb{R}^2$ and $\mathbb{R}^3$ to build understanding
3. **Write out parametric vector form** when describing null spaces and spans
4. **Check your basis vectors are linearly independent** and span the space
5. **Use consistent notation** for coordinate vectors: $[\mathbf{v}]_\mathcal{B}$
6. **Test with simple examples** before tackling complex problems
7. **Remember that subspaces must contain zero**

---

## Summary

- **Vector spaces** abstract the algebraic structure of $\mathbb{R}^n$ to diverse mathematical objects
- **10 axioms** define what it means to be a vector space
- **Subspaces** are subsets that are themselves vector spaces
- **Span** generates subspaces from sets of vectors
- **Null space, column space, and row space** are fundamental subspaces associated with matrices
- **Coordinate systems** allow us to represent abstract vectors using $\mathbb{R}^n$

---

## Further Exploration

- **Basis and Dimension:** Minimal spanning sets and measuring vector space size
- **Linear Independence:** When vectors don't contain redundant information
- **Fundamental Theorem of Linear Algebra:** Deep connections between matrix subspaces
- **Abstract Vector Spaces:** Function spaces, polynomial spaces, and beyond
- **Inner Product Spaces:** Adding geometry through dot products and norms
