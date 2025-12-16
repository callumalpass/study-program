# Matrix Diagonalization

## What Is Diagonalization?

A square matrix $A$ is **diagonalizable** if it can be written in the form:

$$A = PDP^{-1}$$

where:
- $D$ is a diagonal matrix (all entries off the main diagonal are zero)
- $P$ is an invertible matrix

This factorization transforms $A$ into a much simpler diagonal form through a change of basis. Diagonal matrices are easy to work with: powers, exponentials, and other functions become trivial to compute.

**Geometric Interpretation:** The columns of $P$ form a basis of eigenvectors. In this eigenvector basis, the linear transformation represented by $A$ simply scales each basis vector by its corresponding eigenvalue.

---

## The Diagonalization Theorem

**Theorem:** An $n \times n$ matrix $A$ is diagonalizable if and only if $A$ has $n$ linearly independent eigenvectors.

When $A$ is diagonalizable:
- $P = [\mathbf{v}_1 \; \mathbf{v}_2 \; \cdots \; \mathbf{v}_n]$ where $\mathbf{v}_i$ are linearly independent eigenvectors
- $D = \begin{bmatrix} \lambda_1 & 0 & \cdots & 0 \\ 0 & \lambda_2 & \cdots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \cdots & \lambda_n \end{bmatrix}$ where $\lambda_i$ is the eigenvalue for $\mathbf{v}_i$

**Why this works:** If $A\mathbf{v}_i = \lambda_i\mathbf{v}_i$ for each column of $P$, then:

$$AP = A[\mathbf{v}_1 \; \mathbf{v}_2 \; \cdots \; \mathbf{v}_n] = [A\mathbf{v}_1 \; A\mathbf{v}_2 \; \cdots \; A\mathbf{v}_n]$$

$$= [\lambda_1\mathbf{v}_1 \; \lambda_2\mathbf{v}_2 \; \cdots \; \lambda_n\mathbf{v}_n] = [\mathbf{v}_1 \; \mathbf{v}_2 \; \cdots \; \mathbf{v}_n]\begin{bmatrix} \lambda_1 & & \\ & \lambda_2 & \\ & & \ddots & \\ & & & \lambda_n \end{bmatrix}$$

$$= PD$$

Since $P$ is invertible (columns are linearly independent), multiply by $P^{-1}$:

$$A = PDP^{-1}$$

---

## Example 1: Diagonalizing a 2×2 Matrix

Diagonalize:

$$A = \begin{bmatrix} 5 & 2 \\ 2 & 2 \end{bmatrix}$$

**Step 1: Find eigenvalues**

Characteristic equation: $\lambda^2 - 7\lambda + 6 = 0$

Eigenvalues: $\lambda_1 = 6, \lambda_2 = 1$

**Step 2: Find eigenvectors**

For $\lambda_1 = 6$: $\mathbf{v}_1 = \begin{bmatrix} 2 \\ 1 \end{bmatrix}$

For $\lambda_2 = 1$: $\mathbf{v}_2 = \begin{bmatrix} 1 \\ -2 \end{bmatrix}$

**Step 3: Form matrices $P$ and $D$**

$$P = [\mathbf{v}_1 \; \mathbf{v}_2] = \begin{bmatrix} 2 & 1 \\ 1 & -2 \end{bmatrix}$$

$$D = \begin{bmatrix} 6 & 0 \\ 0 & 1 \end{bmatrix}$$

**Step 4: Compute $P^{-1}$**

Using the formula for 2×2 inverse:

$$P^{-1} = \frac{1}{\det(P)} \begin{bmatrix} -2 & -1 \\ -1 & 2 \end{bmatrix} = \frac{1}{-5} \begin{bmatrix} -2 & -1 \\ -1 & 2 \end{bmatrix} = \begin{bmatrix} 2/5 & 1/5 \\ 1/5 & -2/5 \end{bmatrix}$$

**Step 5: Verify**

$$PDP^{-1} = \begin{bmatrix} 2 & 1 \\ 1 & -2 \end{bmatrix}\begin{bmatrix} 6 & 0 \\ 0 & 1 \end{bmatrix}\begin{bmatrix} 2/5 & 1/5 \\ 1/5 & -2/5 \end{bmatrix}$$

$$= \begin{bmatrix} 12 & 1 \\ 6 & -2 \end{bmatrix}\begin{bmatrix} 2/5 & 1/5 \\ 1/5 & -2/5 \end{bmatrix}$$

$$= \begin{bmatrix} 24/5 + 1/5 & 12/5 - 2/5 \\ 12/5 - 2/5 & 6/5 + 4/5 \end{bmatrix} = \begin{bmatrix} 5 & 2 \\ 2 & 2 \end{bmatrix} = A$$ ✓

---

## Example 2: Diagonalizing a 3×3 Matrix

Diagonalize:

$$A = \begin{bmatrix} 1 & 1 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 3 \end{bmatrix}$$

**Step 1: Find eigenvalues**

Since $A$ is triangular, eigenvalues are diagonal entries: $\lambda_1 = 1, \lambda_2 = 2, \lambda_3 = 3$

**Step 2: Find eigenvectors**

For $\lambda_1 = 1$:
$$A - I = \begin{bmatrix} 0 & 1 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 2 \end{bmatrix} \implies \mathbf{v}_1 = \begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix}$$

For $\lambda_2 = 2$:
$$A - 2I = \begin{bmatrix} -1 & 1 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & 1 \end{bmatrix} \implies \mathbf{v}_2 = \begin{bmatrix} 1 \\ 1 \\ 0 \end{bmatrix}$$

For $\lambda_3 = 3$:
$$A - 3I = \begin{bmatrix} -2 & 1 & 0 \\ 0 & -1 & 0 \\ 0 & 0 & 0 \end{bmatrix} \implies \mathbf{v}_3 = \begin{bmatrix} 0 \\ 0 \\ 1 \end{bmatrix}$$

**Step 3: Form $P$ and $D$**

$$P = \begin{bmatrix} 1 & 1 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}, \quad D = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 3 \end{bmatrix}$$

$$P^{-1} = \begin{bmatrix} 1 & -1 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}$$

Therefore: $A = PDP^{-1}$

---

## When Is a Matrix Diagonalizable?

### Sufficient Condition: Distinct Eigenvalues

**Theorem:** If an $n \times n$ matrix has $n$ distinct eigenvalues, then it is diagonalizable.

**Proof:** Eigenvectors from distinct eigenvalues are linearly independent (proven earlier). With $n$ distinct eigenvalues, we get $n$ linearly independent eigenvectors.

### General Condition: Multiplicities

An $n \times n$ matrix is diagonalizable if and only if, for each eigenvalue $\lambda$:

$$\text{geometric multiplicity}(\lambda) = \text{algebraic multiplicity}(\lambda)$$

In other words, the number of linearly independent eigenvectors equals the multiplicity as a root of the characteristic polynomial.

---

## Example 3: A Non-Diagonalizable Matrix

Consider:

$$A = \begin{bmatrix} 2 & 1 \\ 0 & 2 \end{bmatrix}$$

**Eigenvalues:** $\lambda = 2$ (algebraic multiplicity 2)

**Eigenvectors:**
$$A - 2I = \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix}$$

This gives $y = 0$, so:
$$\mathbf{v} = \begin{bmatrix} t \\ 0 \end{bmatrix} = t\begin{bmatrix} 1 \\ 0 \end{bmatrix}$$

We have only ONE linearly independent eigenvector: $\mathbf{v}_1 = \begin{bmatrix} 1 \\ 0 \end{bmatrix}$

**Geometric multiplicity = 1 < 2 = Algebraic multiplicity**

This matrix is **not diagonalizable** (it's defective). We cannot form an invertible matrix $P$ with 2 linearly independent eigenvectors because we don't have enough eigenvectors.

---

## Example 4: Symmetric Matrix

Diagonalize:

$$A = \begin{bmatrix} 3 & 1 \\ 1 & 3 \end{bmatrix}$$

**Eigenvalues:** $\lambda_1 = 4, \lambda_2 = 2$

**Eigenvectors:**
- $\mathbf{v}_1 = \begin{bmatrix} 1 \\ 1 \end{bmatrix}$ for $\lambda_1 = 4$
- $\mathbf{v}_2 = \begin{bmatrix} 1 \\ -1 \end{bmatrix}$ for $\lambda_2 = 2$

Note: $\mathbf{v}_1 \perp \mathbf{v}_2$ (orthogonal)!

$$P = \begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}, \quad D = \begin{bmatrix} 4 & 0 \\ 0 & 2 \end{bmatrix}$$

For symmetric matrices, we can often construct an **orthogonal diagonalization** where $P^T = P^{-1}$.

---

## Special Case: Orthogonal Diagonalization

A symmetric matrix $A$ can always be orthogonally diagonalized:

$$A = QDQ^T$$

where $Q$ is an orthogonal matrix ($Q^T = Q^{-1}$) with orthonormal eigenvectors as columns.

**Spectral Theorem:** Every real symmetric matrix is orthogonally diagonalizable and has real eigenvalues.

To construct $Q$ from our eigenvectors:
1. Find eigenvectors (they're automatically orthogonal for distinct eigenvalues)
2. Normalize each eigenvector to unit length
3. Form $Q$ with these orthonormal vectors as columns

**Example:** For $A = \begin{bmatrix} 3 & 1 \\ 1 & 3 \end{bmatrix}$:

Normalize eigenvectors:
$$\mathbf{u}_1 = \frac{1}{\sqrt{2}}\begin{bmatrix} 1 \\ 1 \end{bmatrix}, \quad \mathbf{u}_2 = \frac{1}{\sqrt{2}}\begin{bmatrix} 1 \\ -1 \end{bmatrix}$$

$$Q = \frac{1}{\sqrt{2}}\begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}$$

Then: $A = QDQ^T$ with $D = \begin{bmatrix} 4 & 0 \\ 0 & 2 \end{bmatrix}$

---

## The Diagonalization Process: Summary

**To diagonalize matrix $A$:**

1. **Find eigenvalues:** Solve $\det(A - \lambda I) = 0$

2. **Find eigenvectors:** For each eigenvalue $\lambda_i$, solve $(A - \lambda_i I)\mathbf{v} = \mathbf{0}$

3. **Check diagonalizability:** Do you have $n$ linearly independent eigenvectors?
   - If YES: proceed
   - If NO: matrix is not diagonalizable

4. **Form $P$:** Use eigenvectors as columns: $P = [\mathbf{v}_1 \; \mathbf{v}_2 \; \cdots \; \mathbf{v}_n]$

5. **Form $D$:** Put eigenvalues on diagonal (matching order of eigenvectors in $P$):
   $$D = \text{diag}(\lambda_1, \lambda_2, \ldots, \lambda_n)$$

6. **Compute $P^{-1}$:** Use row reduction, formula, or other method

7. **Write result:** $A = PDP^{-1}$

---

## Applications Preview

Diagonalization is powerful because:

1. **Computing powers:** $A^n = PD^nP^{-1}$, and $D^n$ is trivial (raise diagonal entries to power $n$)

2. **Matrix exponential:** $e^{At} = Pe^{Dt}P^{-1}$, useful in differential equations

3. **Understanding transformations:** In eigenvector basis, transformation is just scaling

4. **Numerical stability:** Many algorithms work better with diagonal matrices

We'll explore these applications in the next section.

---

## Summary

**Diagonalization:**
- $A = PDP^{-1}$ where $D$ is diagonal
- $P$ has eigenvectors as columns
- $D$ has corresponding eigenvalues on diagonal

**Conditions:**
- Diagonalizable ⟺ $n$ linearly independent eigenvectors
- $n$ distinct eigenvalues ⟹ diagonalizable
- For each eigenvalue: geometric multiplicity = algebraic multiplicity

**Non-diagonalizable matrices:**
- Called "defective"
- Repeated eigenvalue without enough eigenvectors
- Cannot form invertible $P$

**Symmetric matrices:**
- Always diagonalizable with real eigenvalues
- Can be orthogonally diagonalized: $A = QDQ^T$
- Eigenvectors from distinct eigenvalues are orthogonal

**Process:**
1. Find eigenvalues and eigenvectors
2. Check for $n$ independent eigenvectors
3. Form $P$ (eigenvectors) and $D$ (eigenvalues)
4. Compute $P^{-1}$
5. Verify: $A = PDP^{-1}$
