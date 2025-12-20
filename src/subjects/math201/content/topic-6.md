## Introduction

Eigenvalues and eigenvectors are among the most important concepts in linear algebra, with profound applications across mathematics, science, and engineering. They reveal the fundamental "modes" or "directions" of a linear transformation, allowing us to understand complex systems through simple components.

An eigenvector of a matrix is a special non-zero vector that, when the matrix is applied to it, only gets scaled—it doesn't change direction. The scaling factor is called the eigenvalue. This seemingly simple property unlocks powerful techniques for analyzing dynamical systems, computing matrix powers, understanding stability, and extracting patterns from data.

**Learning Objectives:**
- Understand the definition and geometric meaning of eigenvalues and eigenvectors
- Compute eigenvalues using the characteristic equation
- Find eigenvectors and understand eigenspaces
- Diagonalize matrices when possible
- Use diagonalization to compute high powers of matrices efficiently
- Interpret complex eigenvalues as rotation and scaling
- Apply eigenvalue theory to real-world problems in ranking, population dynamics, differential equations, and data analysis

---

## Core Concepts

### Eigenvalue and Eigenvector Definition

For a square matrix $A$, a non-zero vector $\mathbf{v}$ is an **eigenvector** with **eigenvalue** $\lambda$ if:

$$A\mathbf{v} = \lambda\mathbf{v}$$

**Geometric interpretation:** Most vectors change both magnitude and direction when multiplied by $A$. Eigenvectors are special—they only change in magnitude (scaled by $\lambda$) while maintaining their direction.

**Example:**

$$A = \begin{bmatrix} 2 & 0 \\ 0 & 3 \end{bmatrix}, \quad \mathbf{v} = \begin{bmatrix} 1 \\ 0 \end{bmatrix}$$

$$A\mathbf{v} = \begin{bmatrix} 2 \\ 0 \end{bmatrix} = 2\mathbf{v}$$

So $\mathbf{v}$ is an eigenvector with eigenvalue $\lambda = 2$.

### Finding Eigenvalues: The Characteristic Equation

To find eigenvalues, rearrange the eigenvalue equation:

$$(A - \lambda I)\mathbf{v} = \mathbf{0}$$

For a non-trivial solution, $(A - \lambda I)$ must be singular:

$$\det(A - \lambda I) = 0$$

This is the **characteristic equation**. Expanding the determinant gives the **characteristic polynomial**.

**Example:** For $A = \begin{bmatrix} 5 & 2 \\ 2 & 2 \end{bmatrix}$:

$$\det(A - \lambda I) = \det\begin{bmatrix} 5-\lambda & 2 \\ 2 & 2-\lambda \end{bmatrix} = \lambda^2 - 7\lambda + 6 = 0$$

$$(\lambda - 6)(\lambda - 1) = 0$$

Eigenvalues: $\lambda_1 = 6, \lambda_2 = 1$

**For 2×2 matrices:** $\lambda^2 - \text{tr}(A)\lambda + \det(A) = 0$

### Finding Eigenvectors

For each eigenvalue $\lambda$, solve $(A - \lambda I)\mathbf{v} = \mathbf{0}$ to find eigenvectors.

**Example:** For $\lambda = 6$ in the matrix above:

$$A - 6I = \begin{bmatrix} -1 & 2 \\ 2 & -4 \end{bmatrix}$$

Row reduce to get $x = 2y$, so:

$$\mathbf{v}_1 = \begin{bmatrix} 2 \\ 1 \end{bmatrix}$$

### Eigenspaces and Multiplicity

The **eigenspace** $E_\lambda$ is the set of all eigenvectors for eigenvalue $\lambda$, plus the zero vector:

$$E_\lambda = \text{Null}(A - \lambda I)$$

**Algebraic multiplicity:** Number of times $\lambda$ appears as a root of the characteristic polynomial

**Geometric multiplicity:** Dimension of the eigenspace = number of linearly independent eigenvectors

**Key fact:** $1 \leq \text{geometric multiplicity} \leq \text{algebraic multiplicity}$

### Diagonalization

A matrix $A$ is **diagonalizable** if it can be written as:

$$A = PDP^{-1}$$

where $D$ is diagonal and $P$ is invertible.

**Condition:** $A$ is diagonalizable if and only if it has $n$ linearly independent eigenvectors.

**Construction:**
- $P = [\mathbf{v}_1 \; \mathbf{v}_2 \; \cdots \; \mathbf{v}_n]$ (eigenvectors as columns)
- $D = \text{diag}(\lambda_1, \lambda_2, \ldots, \lambda_n)$ (corresponding eigenvalues)

**Special case:** Symmetric matrices are always diagonalizable and can be orthogonally diagonalized: $A = QDQ^T$ where $Q$ is orthogonal.

### Computing Matrix Powers

If $A = PDP^{-1}$, then:

$$A^n = PD^nP^{-1}$$

Computing $D^n$ is trivial—just raise diagonal entries to power $n$:

$$D^n = \begin{bmatrix} \lambda_1^n & 0 & \cdots \\ 0 & \lambda_2^n & \cdots \\ \vdots & \vdots & \ddots \end{bmatrix}$$

**Example application:** Fibonacci numbers can be computed using matrix powers, leading to Binet's formula.

### Complex Eigenvalues

Real matrices can have complex eigenvalues, which always appear in conjugate pairs: $\lambda = a \pm bi$

**Geometric interpretation:**
- Real part $a$: determines growth/decay
- Imaginary part $b$: determines rotation
- Magnitude $r = \sqrt{a^2 + b^2}$: scaling factor
- Angle $\theta = \arctan(b/a)$: rotation angle

**Real canonical form:**

$$C = \begin{bmatrix} a & -b \\ b & a \end{bmatrix} = r\begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}$$

Complex eigenvalues indicate rotational behavior with no real invariant directions.

---

## Applications

### Google PageRank

The web is modeled as a graph with pages as nodes and links as edges. The **PageRank vector** is the eigenvector of the transition matrix corresponding to eigenvalue $\lambda = 1$:

$$M\mathbf{r} = \mathbf{r}$$

This represents the steady-state probability distribution of a random web surfer. Pages with higher PageRank values are considered more important.

**Power method:** Iterate $\mathbf{r}_{k+1} = M\mathbf{r}_k$ to find the dominant eigenvector.

### Population Dynamics

The **Leslie matrix** models age-structured populations:

$$\mathbf{x}_n = L^n\mathbf{x}_0$$

The dominant eigenvalue determines long-term growth rate:
- $\lambda > 1$: population grows
- $\lambda < 1$: population declines
- $\lambda = 1$: stable population

The dominant eigenvector gives the stable age distribution.

### Differential Equations

Systems of the form $\frac{d\mathbf{x}}{dt} = A\mathbf{x}$ have solutions:

$$\mathbf{x}(t) = \sum_{i=1}^n c_i e^{\lambda_i t}\mathbf{v}_i$$

Each term $e^{\lambda_i t}\mathbf{v}_i$ is an **eigenmode** that grows or decays exponentially.

**Stability:**
- All eigenvalues have negative real parts → stable
- Any eigenvalue has positive real part → unstable
- Complex eigenvalues → oscillations (spirals)

### Principal Component Analysis (PCA)

PCA finds the principal components (eigenvectors) of the covariance matrix:

- 1st principal component: direction of maximum variance (largest eigenvalue)
- 2nd principal component: direction of 2nd most variance (2nd largest eigenvalue)
- And so on...

**Dimensionality reduction:** Keep top $k$ eigenvectors to reduce from $d$ to $k$ dimensions while preserving most variance.

**Applications:** image compression, gene expression analysis, finance, visualization of high-dimensional data.

---

## Summary

Eigenvalues and eigenvectors are powerful tools that:

- **Reveal structure:** Show the "natural directions" and "natural frequencies" of a system
- **Simplify computation:** Transform matrix powers and exponentials into simple operations
- **Predict behavior:** Determine long-term dynamics, stability, and growth rates
- **Extract patterns:** Find directions of maximum variance and most important features in data

**Key theorems:**
- An $n \times n$ matrix has $n$ eigenvalues (counting multiplicities) in $\mathbb{C}$
- Eigenvectors from distinct eigenvalues are linearly independent
- A matrix is diagonalizable ⟺ it has $n$ linearly independent eigenvectors
- Symmetric matrices have real eigenvalues and orthogonal eigenvectors
- Complex eigenvalues of real matrices come in conjugate pairs

**Process for eigenvalue problems:**
1. Find eigenvalues: solve $\det(A - \lambda I) = 0$
2. For each eigenvalue: find eigenvectors by solving $(A - \lambda I)\mathbf{v} = \mathbf{0}$
3. If diagonalizable: construct $P$ and $D$ for $A = PDP^{-1}$
4. Apply to the problem: matrix powers, differential equations, data analysis, etc.

Whether you're ranking web pages, modeling populations, analyzing stability, or compressing images, eigenvalues and eigenvectors provide the mathematical foundation for understanding and solving these problems efficiently.
