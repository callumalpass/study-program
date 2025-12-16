# Change of Basis and Similarity

## Introduction

A linear transformation can be represented by different matrices depending on the choice of bases for the domain and codomain. Understanding how these representations relate to each other through change of basis is crucial for simplifying computations and revealing the inherent properties of transformations.

## Coordinate Vectors and Bases

### Review: Coordinate Vectors

Given a basis $\mathcal{B} = \{\mathbf{b}_1, \mathbf{b}_2, \ldots, \mathbf{b}_n\}$ for a vector space $V$, every vector $\mathbf{v} \in V$ can be written uniquely as:

$$\mathbf{v} = c_1\mathbf{b}_1 + c_2\mathbf{b}_2 + \cdots + c_n\mathbf{b}_n$$

The **coordinate vector** of $\mathbf{v}$ with respect to $\mathcal{B}$ is:

$$[\mathbf{v}]_{\mathcal{B}} = \begin{bmatrix} c_1 \\ c_2 \\ \vdots \\ c_n \end{bmatrix}$$

### Example 1: Coordinate Vectors

Let $\mathcal{B} = \{(1, 1), (1, -1)\}$ be a basis for $\mathbb{R}^2$. Find $[\mathbf{v}]_{\mathcal{B}}$ where $\mathbf{v} = (3, -1)$.

**Solution**:

We need to find $c_1, c_2$ such that:
$$(3, -1) = c_1(1, 1) + c_2(1, -1)$$

This gives the system:
$$c_1 + c_2 = 3$$
$$c_1 - c_2 = -1$$

Adding: $2c_1 = 2$, so $c_1 = 1$.
Substituting: $1 + c_2 = 3$, so $c_2 = 2$.

Therefore:
$$[\mathbf{v}]_{\mathcal{B}} = \begin{bmatrix} 1 \\ 2 \end{bmatrix}$$

## Change of Basis Matrix

### Definition

Let $\mathcal{B} = \{\mathbf{b}_1, \ldots, \mathbf{b}_n\}$ and $\mathcal{C} = \{\mathbf{c}_1, \ldots, \mathbf{c}_n\}$ be two bases for a vector space $V$.

The **change of basis matrix** from $\mathcal{B}$ to $\mathcal{C}$, denoted $P_{\mathcal{B} \to \mathcal{C}}$ or $[I]_{\mathcal{B}}^{\mathcal{C}}$, is the matrix whose columns are the coordinate vectors of the $\mathcal{B}$-basis vectors with respect to $\mathcal{C}$:

$$P_{\mathcal{B} \to \mathcal{C}} = \begin{bmatrix} [\mathbf{b}_1]_{\mathcal{C}} & [\mathbf{b}_2]_{\mathcal{C}} & \cdots & [\mathbf{b}_n]_{\mathcal{C}} \end{bmatrix}$$

This matrix converts $\mathcal{B}$-coordinates to $\mathcal{C}$-coordinates:

$$[\mathbf{v}]_{\mathcal{C}} = P_{\mathcal{B} \to \mathcal{C}} [\mathbf{v}]_{\mathcal{B}}$$

### Change of Basis from Standard Basis

If $\mathcal{E} = \{\mathbf{e}_1, \ldots, \mathbf{e}_n\}$ is the standard basis for $\mathbb{R}^n$, then:

$$P_{\mathcal{B} \to \mathcal{E}} = \begin{bmatrix} \mathbf{b}_1 & \mathbf{b}_2 & \cdots & \mathbf{b}_n \end{bmatrix}$$

This is simply the matrix with the basis vectors as columns.

To go the other way:
$$P_{\mathcal{E} \to \mathcal{B}} = (P_{\mathcal{B} \to \mathcal{E}})^{-1}$$

### Example 2: Change of Basis Matrix

Let $\mathcal{B} = \{(1, 1), (1, -1)\}$ and $\mathcal{E}$ be the standard basis for $\mathbb{R}^2$. Find $P_{\mathcal{B} \to \mathcal{E}}$ and $P_{\mathcal{E} \to \mathcal{B}}$.

**Solution**:

**Finding $P_{\mathcal{B} \to \mathcal{E}}$**:

Since $\mathcal{E}$ is the standard basis, the columns are just the $\mathcal{B}$-basis vectors:
$$P_{\mathcal{B} \to \mathcal{E}} = \begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}$$

**Finding $P_{\mathcal{E} \to \mathcal{B}}$**:

$$P_{\mathcal{E} \to \mathcal{B}} = (P_{\mathcal{B} \to \mathcal{E}})^{-1} = \left(\begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}\right)^{-1}$$

$$\det = 1(-1) - 1(1) = -2$$

$$P_{\mathcal{E} \to \mathcal{B}} = \frac{1}{-2}\begin{bmatrix} -1 & -1 \\ -1 & 1 \end{bmatrix} = \begin{bmatrix} 1/2 & 1/2 \\ 1/2 & -1/2 \end{bmatrix}$$

**Verification**: Use the vector $(3, -1)$ from Example 1:
$$P_{\mathcal{E} \to \mathcal{B}} \begin{bmatrix} 3 \\ -1 \end{bmatrix} = \begin{bmatrix} 1/2 & 1/2 \\ 1/2 & -1/2 \end{bmatrix}\begin{bmatrix} 3 \\ -1 \end{bmatrix} = \begin{bmatrix} 3/2 - 1/2 \\ 3/2 + 1/2 \end{bmatrix} = \begin{bmatrix} 1 \\ 2 \end{bmatrix}$$ ✓

### Example 3: Converting Between Non-Standard Bases

Let $\mathcal{B} = \{(1, 1), (1, -1)\}$ and $\mathcal{C} = \{(2, 0), (1, 3)\}$ be bases for $\mathbb{R}^2$. Find $P_{\mathcal{B} \to \mathcal{C}}$.

**Solution**:

We need to express each $\mathcal{B}$-basis vector in $\mathcal{C}$-coordinates.

**For $\mathbf{b}_1 = (1, 1)$**: Find $c_1, c_2$ such that $(1, 1) = c_1(2, 0) + c_2(1, 3)$:
$$2c_1 + c_2 = 1$$
$$3c_2 = 1$$

So $c_2 = 1/3$ and $2c_1 + 1/3 = 1$, giving $c_1 = 1/3$.

Thus $[\mathbf{b}_1]_{\mathcal{C}} = \begin{bmatrix} 1/3 \\ 1/3 \end{bmatrix}$.

**For $\mathbf{b}_2 = (1, -1)$**: Find $c_1, c_2$ such that $(1, -1) = c_1(2, 0) + c_2(1, 3)$:
$$2c_1 + c_2 = 1$$
$$3c_2 = -1$$

So $c_2 = -1/3$ and $2c_1 - 1/3 = 1$, giving $c_1 = 2/3$.

Thus $[\mathbf{b}_2]_{\mathcal{C}} = \begin{bmatrix} 2/3 \\ -1/3 \end{bmatrix}$.

**Result**:
$$P_{\mathcal{B} \to \mathcal{C}} = \begin{bmatrix} 1/3 & 2/3 \\ 1/3 & -1/3 \end{bmatrix} = \frac{1}{3}\begin{bmatrix} 1 & 2 \\ 1 & -1 \end{bmatrix}$$

## Matrix Representation in Different Bases

### General Formula

Let $T: V \to V$ be a linear transformation, and let $\mathcal{B}$ and $\mathcal{C}$ be bases for $V$. If:
- $[T]_{\mathcal{B}}$ is the matrix of $T$ with respect to basis $\mathcal{B}$
- $[T]_{\mathcal{C}}$ is the matrix of $T$ with respect to basis $\mathcal{C}$
- $P = P_{\mathcal{B} \to \mathcal{C}}$ is the change of basis matrix

Then:
$$[T]_{\mathcal{C}} = P^{-1}[T]_{\mathcal{B}}P$$

This formula shows how to convert the matrix representation of a transformation from one basis to another.

### Example 4: Matrix in Different Basis

Let $T: \mathbb{R}^2 \to \mathbb{R}^2$ be defined by $T(x, y) = (2x + y, x + 2y)$. Find the matrix of $T$ with respect to the basis $\mathcal{B} = \{(1, 1), (1, -1)\}$.

**Solution**:

**Step 1**: Find the standard matrix (with respect to standard basis $\mathcal{E}$):
$$[T]_{\mathcal{E}} = A = \begin{bmatrix} 2 & 1 \\ 1 & 2 \end{bmatrix}$$

**Step 2**: Find the change of basis matrix (from Example 2):
$$P = P_{\mathcal{B} \to \mathcal{E}} = \begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}$$
$$P^{-1} = P_{\mathcal{E} \to \mathcal{B}} = \begin{bmatrix} 1/2 & 1/2 \\ 1/2 & -1/2 \end{bmatrix}$$

**Step 3**: Compute $[T]_{\mathcal{B}} = P^{-1}AP$:
$$[T]_{\mathcal{B}} = \begin{bmatrix} 1/2 & 1/2 \\ 1/2 & -1/2 \end{bmatrix}\begin{bmatrix} 2 & 1 \\ 1 & 2 \end{bmatrix}\begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}$$

First, $AP$:
$$AP = \begin{bmatrix} 2 & 1 \\ 1 & 2 \end{bmatrix}\begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix} = \begin{bmatrix} 3 & 1 \\ 3 & -1 \end{bmatrix}$$

Then, $P^{-1}(AP)$:
$$[T]_{\mathcal{B}} = \begin{bmatrix} 1/2 & 1/2 \\ 1/2 & -1/2 \end{bmatrix}\begin{bmatrix} 3 & 1 \\ 3 & -1 \end{bmatrix} = \begin{bmatrix} 3 & 0 \\ 0 & 1 \end{bmatrix}$$

This diagonal matrix is much simpler than the original!

**Verification**: Check with $\mathbf{v} = (1, 1) = \mathbf{b}_1$:
- In $\mathcal{B}$-coordinates: $[\mathbf{v}]_{\mathcal{B}} = \begin{bmatrix} 1 \\ 0 \end{bmatrix}$
- Apply $[T]_{\mathcal{B}}$: $\begin{bmatrix} 3 & 0 \\ 0 & 1 \end{bmatrix}\begin{bmatrix} 1 \\ 0 \end{bmatrix} = \begin{bmatrix} 3 \\ 0 \end{bmatrix}$
- Convert back: $T(\mathbf{v}) = 3(1, 1) + 0(1, -1) = (3, 3)$
- Direct computation: $T(1, 1) = (2 + 1, 1 + 2) = (3, 3)$ ✓

## Similarity of Matrices

### Definition

Two $n \times n$ matrices $A$ and $B$ are **similar** if there exists an invertible matrix $P$ such that:

$$B = P^{-1}AP$$

We write $A \sim B$.

### Interpretation

Two matrices are similar if they represent the same linear transformation with respect to different bases. Similar matrices have the same:
- Determinant
- Trace
- Rank
- Eigenvalues (including multiplicities)
- Characteristic polynomial

### Example 5: Showing Similarity

Show that $A = \begin{bmatrix} 2 & 1 \\ 1 & 2 \end{bmatrix}$ and $B = \begin{bmatrix} 3 & 0 \\ 0 & 1 \end{bmatrix}$ are similar.

**Solution**:

From Example 4, we found that with $P = \begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}$:

$$B = P^{-1}AP$$

Therefore, $A$ and $B$ are similar.

**Verification of invariants**:
- $\det(A) = 4 - 1 = 3$ and $\det(B) = 3 - 0 = 3$ ✓
- $\text{tr}(A) = 2 + 2 = 4$ and $\text{tr}(B) = 3 + 1 = 4$ ✓

## Diagonalization

A matrix $A$ is **diagonalizable** if it is similar to a diagonal matrix $D$:

$$D = P^{-1}AP$$

Finding such a $P$ (when it exists) is called **diagonalization**, which we'll study more deeply in the eigenvalue topic.

### Example 6: Why Diagonalization Matters

If $A = \begin{bmatrix} 2 & 1 \\ 1 & 2 \end{bmatrix}$ and $B = \begin{bmatrix} 3 & 0 \\ 0 & 1 \end{bmatrix}$ are similar via $P$, compute $A^{10}$.

**Solution**:

Since $B = P^{-1}AP$, we have $A = PBP^{-1}$.

Then:
$$A^{10} = (PBP^{-1})^{10} = PB^{10}P^{-1}$$

Computing $B^{10}$ is easy since $B$ is diagonal:
$$B^{10} = \begin{bmatrix} 3^{10} & 0 \\ 0 & 1^{10} \end{bmatrix} = \begin{bmatrix} 59049 & 0 \\ 0 & 1 \end{bmatrix}$$

Therefore:
$$A^{10} = \begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}\begin{bmatrix} 59049 & 0 \\ 0 & 1 \end{bmatrix}\begin{bmatrix} 1/2 & 1/2 \\ 1/2 & -1/2 \end{bmatrix}$$

$$= \begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}\begin{bmatrix} 29524.5 & 29524.5 \\ 0.5 & -0.5 \end{bmatrix} = \begin{bmatrix} 29525 & 29524 \\ 29524 & 29525 \end{bmatrix}$$

Computing $A^{10}$ directly would require multiplying $A$ by itself 10 times—much more work!

## Summary

Change of basis provides a powerful framework for understanding how linear transformations appear in different coordinate systems. The change of basis matrix converts coordinates from one basis to another, while similar matrices represent the same transformation in different bases. Choosing the right basis can dramatically simplify computations, as exemplified by diagonalization where a transformation becomes a simple scaling in each coordinate direction.
