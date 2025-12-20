---
id: math201-t6-finding
title: "Finding Eigenvectors"
order: 3
---

# Finding Eigenvectors and Eigenspaces

## From Eigenvalues to Eigenvectors

Once we've found the eigenvalues of a matrix, the next step is to find the corresponding eigenvectors. Remember: an eigenvector $\mathbf{v}$ for eigenvalue $\lambda$ satisfies:

$$(A - \lambda I)\mathbf{v} = \mathbf{0}$$

This is a homogeneous linear system. The eigenvectors are the non-zero solutions to this system, and the set of all solutions (including the zero vector) forms a subspace called the **eigenspace**.

---

## Step-by-Step: Computing Eigenvectors

### Example 1: Complete Process for a 2×2 Matrix

Find all eigenvalues and eigenvectors of:

$$A = \begin{bmatrix} 5 & 2 \\ 2 & 2 \end{bmatrix}$$

**Step 1: Find Eigenvalues**

From the previous section, we found the characteristic polynomial:

$$\det(A - \lambda I) = \lambda^2 - 7\lambda + 6 = (\lambda - 6)(\lambda - 1) = 0$$

Eigenvalues: $\lambda_1 = 6, \lambda_2 = 1$

**Step 2: Find Eigenvector for $\lambda_1 = 6$**

Solve $(A - 6I)\mathbf{v} = \mathbf{0}$:

$$A - 6I = \begin{bmatrix} 5-6 & 2 \\ 2 & 2-6 \end{bmatrix} = \begin{bmatrix} -1 & 2 \\ 2 & -4 \end{bmatrix}$$

Set up the system:
$$\begin{bmatrix} -1 & 2 \\ 2 & -4 \end{bmatrix}\begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \end{bmatrix}$$

Row reduce:
$$\begin{bmatrix} -1 & 2 & | & 0 \\ 2 & -4 & | & 0 \end{bmatrix} \sim \begin{bmatrix} 1 & -2 & | & 0 \\ 0 & 0 & | & 0 \end{bmatrix}$$

From the first row: $x - 2y = 0$, so $x = 2y$

Let $y = t$ (free variable):
$$\mathbf{v} = \begin{bmatrix} 2t \\ t \end{bmatrix} = t\begin{bmatrix} 2 \\ 1 \end{bmatrix}$$

Choose $t = 1$ to get the eigenvector: $\mathbf{v}_1 = \begin{bmatrix} 2 \\ 1 \end{bmatrix}$

**Verify:**
$$A\mathbf{v}_1 = \begin{bmatrix} 5 & 2 \\ 2 & 2 \end{bmatrix}\begin{bmatrix} 2 \\ 1 \end{bmatrix} = \begin{bmatrix} 12 \\ 6 \end{bmatrix} = 6\begin{bmatrix} 2 \\ 1 \end{bmatrix} = 6\mathbf{v}_1$$ ✓

**Step 3: Find Eigenvector for $\lambda_2 = 1$**

Solve $(A - I)\mathbf{v} = \mathbf{0}$:

$$A - I = \begin{bmatrix} 4 & 2 \\ 2 & 1 \end{bmatrix}$$

Row reduce:
$$\begin{bmatrix} 4 & 2 & | & 0 \\ 2 & 1 & | & 0 \end{bmatrix} \sim \begin{bmatrix} 2 & 1 & | & 0 \\ 0 & 0 & | & 0 \end{bmatrix}$$

From the first row: $2x + y = 0$, so $y = -2x$

Let $x = t$:
$$\mathbf{v} = \begin{bmatrix} t \\ -2t \end{bmatrix} = t\begin{bmatrix} 1 \\ -2 \end{bmatrix}$$

Eigenvector: $\mathbf{v}_2 = \begin{bmatrix} 1 \\ -2 \end{bmatrix}$

**Verify:**
$$A\mathbf{v}_2 = \begin{bmatrix} 5 & 2 \\ 2 & 2 \end{bmatrix}\begin{bmatrix} 1 \\ -2 \end{bmatrix} = \begin{bmatrix} 1 \\ -2 \end{bmatrix} = 1\mathbf{v}_2$$ ✓

---

## The Eigenspace

The **eigenspace** $E_\lambda$ corresponding to eigenvalue $\lambda$ is the set of all eigenvectors with that eigenvalue, plus the zero vector:

$$E_\lambda = \{\mathbf{v} : (A - \lambda I)\mathbf{v} = \mathbf{0}\} = \text{Null}(A - \lambda I)$$

The eigenspace is always a subspace. Its dimension is called the **geometric multiplicity** of $\lambda$.

In Example 1:
- $E_6 = \text{span}\left\{\begin{bmatrix} 2 \\ 1 \end{bmatrix}\right\}$ has dimension 1
- $E_1 = \text{span}\left\{\begin{bmatrix} 1 \\ -2 \end{bmatrix}\right\}$ has dimension 1

---

## Example 2: 3×3 Matrix with Repeated Eigenvalue

Find eigenvectors of:

$$A = \begin{bmatrix} 2 & 1 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 3 \end{bmatrix}$$

From before, eigenvalues are: $\lambda = 2$ (multiplicity 2) and $\lambda = 3$ (multiplicity 1)

**For $\lambda = 2$:**

$$A - 2I = \begin{bmatrix} 0 & 1 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & 1 \end{bmatrix}$$

Solve $(A - 2I)\mathbf{v} = \mathbf{0}$:

$$\begin{bmatrix} 0 & 1 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & 1 \end{bmatrix}\begin{bmatrix} x \\ y \\ z \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \\ 0 \end{bmatrix}$$

This gives: $y = 0$ and $z = 0$, while $x$ is free.

$$\mathbf{v} = \begin{bmatrix} t \\ 0 \\ 0 \end{bmatrix} = t\begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix}$$

Eigenspace: $E_2 = \text{span}\left\{\begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix}\right\}$

**Note:** Even though $\lambda = 2$ has algebraic multiplicity 2, the eigenspace has dimension 1 (geometric multiplicity 1). We found only one linearly independent eigenvector!

**For $\lambda = 3$:**

$$A - 3I = \begin{bmatrix} -1 & 1 & 0 \\ 0 & -1 & 0 \\ 0 & 0 & 0 \end{bmatrix}$$

Row reduce:
$$\begin{bmatrix} -1 & 1 & 0 \\ 0 & -1 & 0 \\ 0 & 0 & 0 \end{bmatrix} \sim \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 0 \end{bmatrix}$$

This gives $x = 0, y = 0$, and $z$ is free.

$$\mathbf{v} = \begin{bmatrix} 0 \\ 0 \\ t \end{bmatrix} = t\begin{bmatrix} 0 \\ 0 \\ 1 \end{bmatrix}$$

Eigenspace: $E_3 = \text{span}\left\{\begin{bmatrix} 0 \\ 0 \\ 1 \end{bmatrix}\right\}$

---

## Geometric vs Algebraic Multiplicity

For each eigenvalue $\lambda$:

- **Algebraic multiplicity:** number of times $\lambda$ appears as a root of the characteristic polynomial
- **Geometric multiplicity:** dimension of the eigenspace $E_\lambda$ = number of linearly independent eigenvectors

**Key Theorem:** For any eigenvalue $\lambda$:

$$1 \leq \text{geometric multiplicity} \leq \text{algebraic multiplicity}$$

In Example 2, for $\lambda = 2$:
- Algebraic multiplicity = 2
- Geometric multiplicity = 1

When geometric multiplicity < algebraic multiplicity, the matrix is **defective** (not enough eigenvectors to form a basis).

---

## Example 3: When Geometric = Algebraic

Find eigenvectors of:

$$A = \begin{bmatrix} 2 & 0 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 3 \end{bmatrix}$$

Eigenvalues: $\lambda = 2$ (multiplicity 2), $\lambda = 3$ (multiplicity 1)

**For $\lambda = 2$:**

$$A - 2I = \begin{bmatrix} 0 & 0 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & 1 \end{bmatrix}$$

This gives $z = 0$, while $x$ and $y$ are free:

$$\mathbf{v} = \begin{bmatrix} s \\ t \\ 0 \end{bmatrix} = s\begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix} + t\begin{bmatrix} 0 \\ 1 \\ 0 \end{bmatrix}$$

Eigenspace: $E_2 = \text{span}\left\{\begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix}, \begin{bmatrix} 0 \\ 1 \\ 0 \end{bmatrix}\right\}$

Geometric multiplicity = 2 = Algebraic multiplicity ✓

**For $\lambda = 3$:**

$$E_3 = \text{span}\left\{\begin{bmatrix} 0 \\ 0 \\ 1 \end{bmatrix}\right\}$$

This matrix has enough eigenvectors to form a basis of $\mathbb{R}^3$!

---

## Linear Independence of Eigenvectors

**Theorem:** Eigenvectors corresponding to distinct eigenvalues are linearly independent.

**Proof sketch for two eigenvalues:** Suppose $\mathbf{v}_1$ and $\mathbf{v}_2$ are eigenvectors with $\lambda_1 \neq \lambda_2$. If $c_1\mathbf{v}_1 + c_2\mathbf{v}_2 = \mathbf{0}$, apply $A$:

$$c_1A\mathbf{v}_1 + c_2A\mathbf{v}_2 = \mathbf{0}$$
$$c_1\lambda_1\mathbf{v}_1 + c_2\lambda_2\mathbf{v}_2 = \mathbf{0}$$

Multiply the original equation by $\lambda_1$ and subtract:

$$c_2(\lambda_2 - \lambda_1)\mathbf{v}_2 = \mathbf{0}$$

Since $\lambda_2 \neq \lambda_1$ and $\mathbf{v}_2 \neq \mathbf{0}$, we must have $c_2 = 0$. Similarly, $c_1 = 0$.

**Consequence:** An $n \times n$ matrix with $n$ distinct eigenvalues has $n$ linearly independent eigenvectors.

---

## Example 4: Finding a Basis of Eigenvectors

For $A = \begin{bmatrix} 5 & 2 \\ 2 & 2 \end{bmatrix}$ from Example 1:

We found:
- $\mathbf{v}_1 = \begin{bmatrix} 2 \\ 1 \end{bmatrix}$ for $\lambda_1 = 6$
- $\mathbf{v}_2 = \begin{bmatrix} 1 \\ -2 \end{bmatrix}$ for $\lambda_2 = 1$

Since $\lambda_1 \neq \lambda_2$, these vectors are linearly independent and form a basis of $\mathbb{R}^2$.

---

## Practical Tips for Finding Eigenvectors

### Tip 1: Check Your Work

Always verify: $A\mathbf{v} = \lambda\mathbf{v}$

### Tip 2: Choose Simple Representatives

Since any non-zero scalar multiple of an eigenvector is also an eigenvector, choose the simplest form:
- Clear fractions
- Make the first non-zero entry 1, or
- Use integer entries when possible

### Tip 3: For Repeated Eigenvalues

When an eigenvalue has algebraic multiplicity > 1, carefully find a basis for the eigenspace by solving the homogeneous system completely.

### Tip 4: Null Space Connection

Finding eigenvectors is the same as finding a basis for $\text{Null}(A - \lambda I)$. Use standard techniques: row reduction, parametric form, extract basis vectors.

---

## Example 5: Symmetric Matrix

For the symmetric matrix:

$$A = \begin{bmatrix} 3 & 1 \\ 1 & 3 \end{bmatrix}$$

Eigenvalues: $\lambda_1 = 4, \lambda_2 = 2$

**For $\lambda = 4$:**

$$A - 4I = \begin{bmatrix} -1 & 1 \\ 1 & -1 \end{bmatrix}$$

Row reduce: both rows give $-x + y = 0$, so $y = x$

$$\mathbf{v}_1 = \begin{bmatrix} 1 \\ 1 \end{bmatrix}$$

**For $\lambda = 2$:**

$$A - 2I = \begin{bmatrix} 1 & 1 \\ 1 & 1 \end{bmatrix}$$

Both rows give $x + y = 0$, so $y = -x$

$$\mathbf{v}_2 = \begin{bmatrix} 1 \\ -1 \end{bmatrix}$$

**Check orthogonality:**
$$\mathbf{v}_1 \cdot \mathbf{v}_2 = (1)(1) + (1)(-1) = 0$$

The eigenvectors are orthogonal! This is always true for symmetric matrices: **eigenvectors from distinct eigenvalues are orthogonal**.

---

## The Eigendecomposition Preview

When a matrix has $n$ linearly independent eigenvectors $\mathbf{v}_1, \ldots, \mathbf{v}_n$ with eigenvalues $\lambda_1, \ldots, \lambda_n$, we can write:

$$A = PDP^{-1}$$

where:
- $P = [\mathbf{v}_1 \; \mathbf{v}_2 \; \cdots \; \mathbf{v}_n]$ (eigenvectors as columns)
- $D = \text{diag}(\lambda_1, \lambda_2, \ldots, \lambda_n)$ (eigenvalues on diagonal)

This is called **diagonalization**, which we'll explore in detail next.

---

## Summary

**Finding Eigenvectors:**
1. Solve $(A - \lambda I)\mathbf{v} = \mathbf{0}$ for each eigenvalue $\lambda$
2. Find null space of $A - \lambda I$ by row reduction
3. Express solution in parametric form
4. Extract basis vectors for the eigenspace

**Eigenspace:**
- $E_\lambda = \text{Null}(A - \lambda I)$
- Contains all eigenvectors for $\lambda$, plus zero vector
- Dimension = geometric multiplicity

**Multiplicity:**
- Algebraic: how many times $\lambda$ appears in characteristic polynomial
- Geometric: dimension of eigenspace = number of independent eigenvectors
- Always: $1 \leq \text{geometric} \leq \text{algebraic}$

**Key Facts:**
- Eigenvectors from distinct eigenvalues are linearly independent
- Symmetric matrices have orthogonal eigenvectors
- $n \times n$ matrix with $n$ distinct eigenvalues has basis of eigenvectors
