---
id: math201-t6-definition
title: "Eigenvalue Definition"
order: 1
---

# Eigenvalues and Eigenvectors: Definition and Geometric Meaning

## What Are Eigenvalues and Eigenvectors?

An **eigenvector** of a square matrix is a special non-zero vector that, when the matrix is applied to it, only gets scaled by a constant factor. That constant factor is called the **eigenvalue**. This seemingly simple concept unlocks profound insights into how linear transformations behave.

**Formal Definition:** Let $A$ be an $n \times n$ matrix. A non-zero vector $\mathbf{v}$ is an **eigenvector** of $A$ if there exists a scalar $\lambda$ (called an **eigenvalue**) such that:

$$A\mathbf{v} = \lambda\mathbf{v}$$

The geometric intuition is powerful: while most vectors change both magnitude and direction when multiplied by $A$, eigenvectors only change in magnitude (they get stretched or shrunk by factor $\lambda$) but maintain their direction.

---

## Understanding Through Examples

### Example 1: A Simple 2×2 Matrix

Consider the matrix:

$$A = \begin{bmatrix} 2 & 0 \\ 0 & 3 \end{bmatrix}$$

Let's test if $\mathbf{v}_1 = \begin{bmatrix} 1 \\ 0 \end{bmatrix}$ is an eigenvector:

$$A\mathbf{v}_1 = \begin{bmatrix} 2 & 0 \\ 0 & 3 \end{bmatrix} \begin{bmatrix} 1 \\ 0 \end{bmatrix} = \begin{bmatrix} 2 \\ 0 \end{bmatrix} = 2 \begin{bmatrix} 1 \\ 0 \end{bmatrix} = 2\mathbf{v}_1$$

Yes! $\mathbf{v}_1$ is an eigenvector with eigenvalue $\lambda_1 = 2$.

Now test $\mathbf{v}_2 = \begin{bmatrix} 0 \\ 1 \end{bmatrix}$:

$$A\mathbf{v}_2 = \begin{bmatrix} 2 & 0 \\ 0 & 3 \end{bmatrix} \begin{bmatrix} 0 \\ 1 \end{bmatrix} = \begin{bmatrix} 0 \\ 3 \end{bmatrix} = 3 \begin{bmatrix} 0 \\ 1 \end{bmatrix} = 3\mathbf{v}_2$$

$\mathbf{v}_2$ is also an eigenvector with eigenvalue $\lambda_2 = 3$.

For diagonal matrices, the standard basis vectors are eigenvectors, and the diagonal entries are the eigenvalues!

### Example 2: A Non-Diagonal Matrix

Consider:

$$A = \begin{bmatrix} 4 & 1 \\ 2 & 3 \end{bmatrix}$$

Is $\mathbf{v} = \begin{bmatrix} 1 \\ 1 \end{bmatrix}$ an eigenvector?

$$A\mathbf{v} = \begin{bmatrix} 4 & 1 \\ 2 & 3 \end{bmatrix} \begin{bmatrix} 1 \\ 1 \end{bmatrix} = \begin{bmatrix} 5 \\ 5 \end{bmatrix} = 5 \begin{bmatrix} 1 \\ 1 \end{bmatrix} = 5\mathbf{v}$$

Yes! The vector $\begin{bmatrix} 1 \\ 1 \end{bmatrix}$ is an eigenvector with eigenvalue $\lambda = 5$.

---

## Geometric Interpretation

### Transformation View

Think of matrix multiplication as a geometric transformation. When you apply matrix $A$ to various vectors in the plane:

- Most vectors rotate and stretch
- Eigenvectors only stretch (or shrink, or flip if $\lambda < 0$)
- They point in "invariant directions" of the transformation

### Scaling Along Special Directions

For the matrix $A = \begin{bmatrix} 2 & 0 \\ 0 & 3 \end{bmatrix}$:

- Vectors along the x-axis (direction $\begin{bmatrix} 1 \\ 0 \end{bmatrix}$) get scaled by 2
- Vectors along the y-axis (direction $\begin{bmatrix} 0 \\ 1 \end{bmatrix}$) get scaled by 3
- Any other vector both rotates and scales

The eigenvectors represent the "natural axes" of the transformation.

### Rotation Matrices: No Real Eigenvectors

Consider a 90-degree rotation matrix:

$$R = \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}$$

This matrix has no real eigenvectors because rotation doesn't have any invariant directions in the plane—every vector changes direction! (It does have complex eigenvectors, which we'll explore later.)

---

## Key Properties

### Property 1: Eigenvectors Are Non-Zero

By definition, the zero vector cannot be an eigenvector, even though $A\mathbf{0} = \mathbf{0} = \lambda\mathbf{0}$ for any $\lambda$. Why? Because the zero vector doesn't define a direction, and eigenvectors are fundamentally about invariant directions.

### Property 2: Scalar Multiples of Eigenvectors

If $\mathbf{v}$ is an eigenvector with eigenvalue $\lambda$, then any non-zero scalar multiple $c\mathbf{v}$ (where $c \neq 0$) is also an eigenvector with the same eigenvalue:

$$A(c\mathbf{v}) = c(A\mathbf{v}) = c(\lambda\mathbf{v}) = \lambda(c\mathbf{v})$$

This means eigenvectors define directions (1-dimensional subspaces), not specific vectors. We often normalize eigenvectors to unit length for convenience.

### Property 3: Different Eigenvalues

A matrix can have multiple distinct eigenvalues. For an $n \times n$ matrix, there are at most $n$ distinct eigenvalues (counting multiplicities, which we'll discuss later).

### Property 4: Zero as an Eigenvalue

Zero can be an eigenvalue! If $\lambda = 0$ is an eigenvalue with eigenvector $\mathbf{v}$:

$$A\mathbf{v} = 0\mathbf{v} = \mathbf{0}$$

This means $\mathbf{v} \in \text{Null}(A)$, so $A$ is singular (non-invertible).

**Theorem:** For an $n \times n$ matrix $A$:
$$\lambda = 0 \text{ is an eigenvalue of } A \iff A \text{ is singular} \iff \det(A) = 0$$

Conversely, if $A$ is invertible (i.e., $\det(A) \neq 0$), then zero cannot be an eigenvalue.

---

## The Eigenvalue Equation

Starting from $A\mathbf{v} = \lambda\mathbf{v}$, we can rearrange:

$$A\mathbf{v} - \lambda\mathbf{v} = \mathbf{0}$$

$$A\mathbf{v} - \lambda I\mathbf{v} = \mathbf{0}$$

$$(A - \lambda I)\mathbf{v} = \mathbf{0}$$

This is a homogeneous system! For a non-trivial solution (non-zero $\mathbf{v}$) to exist, the matrix $(A - \lambda I)$ must be singular:

$$\det(A - \lambda I) = 0$$

This equation, called the **characteristic equation**, is the key to finding eigenvalues. We'll explore this in the next section.

### Complete Workflow for Finding Eigenvalues and Eigenvectors

```mermaid
flowchart TD
    Start([Given: n×n Matrix A]) --> CharEq[Form characteristic equation:<br/>det(A - λI) = 0]
    CharEq --> Expand[Expand determinant to get<br/>characteristic polynomial<br/>p(λ) = det(A - λI)]
    Expand --> Solve[Solve polynomial equation<br/>p(λ) = 0]
    Solve --> Eigenvals[Eigenvalues: λ₁, λ₂, ..., λₖ]

    Eigenvals --> ForEach[For each eigenvalue λᵢ:]
    ForEach --> FormSystem[Form homogeneous system:<br/>(A - λᵢI)v = 0]
    FormSystem --> RowReduce[Row reduce augmented matrix<br/>[A - λᵢI | 0] to RREF]
    RowReduce --> FindNull[Find null space:<br/>Identify free variables<br/>and basic variables]
    FindNull --> Eigenvec[Extract eigenvectors:<br/>Basis for Null(A - λᵢI)]
    Eigenvec --> Eigenspace[Eigenspace Eλᵢ =<br/>span of eigenvectors]

    Eigenspace --> MoreEigen{More<br/>eigenvalues?}
    MoreEigen -->|Yes| ForEach
    MoreEigen -->|No| Complete[Complete eigenvalue-eigenvector pairs:<br/>(λ₁, v₁), (λ₂, v₂), ..., (λₖ, vₖ)]

    Complete --> Verify[Verify: Avᵢ = λᵢvᵢ for each i]
    Verify --> Done([Ready for applications:<br/>diagonalization, powers, etc.])

    style Start fill:#e1f5e1
    style Eigenvals fill:#fff4e1
    style Eigenspace fill:#e1f5ff
    style Complete fill:#e1ffe1
    style Done fill:#e1f5e1
```

**Key Steps:**
1. **Find eigenvalues**: Solve $\det(A - \lambda I) = 0$
2. **Find eigenvectors**: For each $\lambda_i$, solve $(A - \lambda_i I)\mathbf{v} = \mathbf{0}$
3. **Verify**: Check that $A\mathbf{v}_i = \lambda_i\mathbf{v}_i$

---

## Special Cases and Examples

### Example 3: Identity Matrix

For $I = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}$:

$$I\mathbf{v} = \mathbf{v} = 1\cdot\mathbf{v}$$

Every non-zero vector is an eigenvector with eigenvalue $\lambda = 1$!

### Example 4: Zero Matrix

For $O = \begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix}$:

$$O\mathbf{v} = \mathbf{0} = 0\cdot\mathbf{v}$$

Every non-zero vector is an eigenvector with eigenvalue $\lambda = 0$.

### Example 5: Projection Matrix

Consider projection onto the x-axis:

$$P = \begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix}$$

- Vectors along x-axis: $P\begin{bmatrix} 1 \\ 0 \end{bmatrix} = \begin{bmatrix} 1 \\ 0 \end{bmatrix}$, so $\lambda_1 = 1$
- Vectors along y-axis: $P\begin{bmatrix} 0 \\ 1 \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \end{bmatrix}$, so $\lambda_2 = 0$

---

## Why Eigenvalues Matter

### Stability Analysis

In differential equations and dynamical systems, eigenvalues determine stability. If all eigenvalues have negative real parts, the system is stable. If any has a positive real part, the system is unstable.

### Principal Components

In data analysis, eigenvectors of the covariance matrix point in directions of maximum variance—the principal components used in dimensionality reduction.

### Google's PageRank

The PageRank algorithm finds the eigenvector of the web's link matrix corresponding to eigenvalue 1. This eigenvector ranks web pages by importance.

### Quantum Mechanics

In quantum mechanics, eigenvectors of operators represent physical states, and eigenvalues represent observable quantities like energy levels.

---

## Summary

**Eigenvalue-Eigenvector Definition:**
- $A\mathbf{v} = \lambda\mathbf{v}$ where $\mathbf{v} \neq \mathbf{0}$
- $\mathbf{v}$ is the eigenvector, $\lambda$ is the eigenvalue

**Geometric Meaning:**
- Eigenvectors are invariant directions of the transformation
- Eigenvalues are the scaling factors along those directions
- Most transformations stretch different directions by different amounts

**Key Properties:**
- Eigenvectors must be non-zero
- Scalar multiples of eigenvectors are also eigenvectors
- Zero can be an eigenvalue (means matrix is singular)
- Finding eigenvalues requires solving $\det(A - \lambda I) = 0$

**Applications:**
- Stability analysis in differential equations
- Principal component analysis in statistics
- PageRank algorithm for web search
- Quantum mechanics and many other fields
