# Linear Dependence

## Introduction

Linear dependence is the complementary concept to linear independence. While linear independence captures the idea of vectors being "essential" and non-redundant, linear dependence describes situations where at least one vector can be expressed in terms of the others. Understanding dependence relations is crucial for simplifying vector sets, understanding dimensions, and solving systems of equations.

## Definition

A set of vectors $\{\mathbf{v}_1, \mathbf{v}_2, \ldots, \mathbf{v}_n\}$ in a vector space $V$ is **linearly dependent** if there exist scalars $c_1, c_2, \ldots, c_n$, not all zero, such that

$$c_1\mathbf{v}_1 + c_2\mathbf{v}_2 + \cdots + c_n\mathbf{v}_n = \mathbf{0}$$

This equation is called a **dependence relation** or **linear dependence equation**.

### Equivalent Characterization

A set of vectors is linearly dependent if and only if at least one vector in the set can be written as a linear combination of the others. This provides a practical way to think about dependence: some vector is "redundant" because it can be built from the remaining vectors.

## Identifying Linear Dependence

### Immediate Cases

**Case 1: The Zero Vector**

Any set containing the zero vector is linearly dependent. For instance, if $\mathbf{v}_1 = \mathbf{0}$, then $1 \cdot \mathbf{v}_1 + 0 \cdot \mathbf{v}_2 + \cdots + 0 \cdot \mathbf{v}_n = \mathbf{0}$ is a non-trivial dependence relation.

**Case 2: Too Many Vectors**

If you have more vectors than the dimension of the space, they must be linearly dependent. For example, any 5 vectors in $\mathbb{R}^3$ are automatically dependent.

**Case 3: Repeated Vectors**

If a vector appears twice in the set, the set is dependent. For instance, $\{\mathbf{v}, \mathbf{v}, \mathbf{w}\}$ is dependent since $1 \cdot \mathbf{v} + (-1) \cdot \mathbf{v} + 0 \cdot \mathbf{w} = \mathbf{0}$.

## Finding Dependence Relations

### Method: Row Reduction

To find explicit dependence relations among vectors $\mathbf{v}_1, \ldots, \mathbf{v}_n$:

1. Form the matrix $A = [\mathbf{v}_1 \ \mathbf{v}_2 \ \cdots \ \mathbf{v}_n]$
2. Row reduce to reduced row echelon form (RREF)
3. Identify free variables (columns without pivots)
4. Express the corresponding vectors in terms of vectors in pivot columns

**Example 1**: Find a dependence relation among the vectors:

$$\mathbf{v}_1 = \begin{bmatrix} 1 \\ 2 \\ 1 \end{bmatrix}, \quad \mathbf{v}_2 = \begin{bmatrix} 2 \\ 1 \\ 3 \end{bmatrix}, \quad \mathbf{v}_3 = \begin{bmatrix} 3 \\ 3 \\ 4 \end{bmatrix}, \quad \mathbf{v}_4 = \begin{bmatrix} 1 \\ -1 \\ 2 \end{bmatrix}$$

**Solution**:

Form the augmented matrix and row reduce:

$$A = \begin{bmatrix} 1 & 2 & 3 & 1 \\ 2 & 1 & 3 & -1 \\ 1 & 3 & 4 & 2 \end{bmatrix}$$

Row reducing to RREF:

$$\begin{bmatrix} 1 & 2 & 3 & 1 \\ 2 & 1 & 3 & -1 \\ 1 & 3 & 4 & 2 \end{bmatrix} \xrightarrow{\text{RREF}} \begin{bmatrix} 1 & 0 & 1 & -1 \\ 0 & 1 & 1 & 1 \\ 0 & 0 & 0 & 0 \end{bmatrix}$$

Columns 1 and 2 have pivots; columns 3 and 4 are free. From the RREF:

- Column 3: $\mathbf{v}_3 = 1\mathbf{v}_1 + 1\mathbf{v}_2$
- Column 4: $\mathbf{v}_4 = -1\mathbf{v}_1 + 1\mathbf{v}_2$

We can verify: $\mathbf{v}_3 - \mathbf{v}_1 - \mathbf{v}_2 = \mathbf{0}$ or $\mathbf{v}_4 + \mathbf{v}_1 - \mathbf{v}_2 = \mathbf{0}$.

## Geometric Interpretation

### In $\mathbb{R}^2$

Two vectors in $\mathbb{R}^2$ are linearly dependent if and only if they are collinear (lie on the same line through the origin). One is a scalar multiple of the other.

**Example**: The vectors $\mathbf{v} = \begin{bmatrix} 3 \\ 6 \end{bmatrix}$ and $\mathbf{w} = \begin{bmatrix} -1 \\ -2 \end{bmatrix}$ are dependent since $\mathbf{v} = -3\mathbf{w}$.

### In $\mathbb{R}^3$

- Two vectors are dependent if they're collinear
- Three vectors are dependent if they're coplanar (lie in the same plane through the origin)

**Example**: The vectors $\begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix}$, $\begin{bmatrix} 0 \\ 1 \\ 0 \end{bmatrix}$, and $\begin{bmatrix} 1 \\ 1 \\ 0 \end{bmatrix}$ are linearly dependent because they all lie in the $xy$-plane (the plane $z = 0$).

## Working with Dependence Relations

### Example 2: Multiple Dependence Relations

Consider the vectors in $\mathbb{R}^3$:

$$\mathbf{v}_1 = \begin{bmatrix} 1 \\ 0 \\ 1 \end{bmatrix}, \quad \mathbf{v}_2 = \begin{bmatrix} 2 \\ 1 \\ 1 \end{bmatrix}, \quad \mathbf{v}_3 = \begin{bmatrix} 1 \\ 1 \\ 0 \end{bmatrix}, \quad \mathbf{v}_4 = \begin{bmatrix} 4 \\ 3 \\ 1 \end{bmatrix}$$

These vectors are linearly dependent (4 vectors in $\mathbb{R}^3$). Let's find all dependence relations.

Form the matrix and row reduce:

$$\begin{bmatrix} 1 & 2 & 1 & 4 \\ 0 & 1 & 1 & 3 \\ 1 & 1 & 0 & 1 \end{bmatrix} \xrightarrow{\text{RREF}} \begin{bmatrix} 1 & 0 & -1 & -2 \\ 0 & 1 & 1 & 3 \\ 0 & 0 & 0 & 0 \end{bmatrix}$$

Columns 3 and 4 are free. The general solution to $A\mathbf{x} = \mathbf{0}$ is:

$$\mathbf{x} = x_3\begin{bmatrix} 1 \\ -1 \\ 1 \\ 0 \end{bmatrix} + x_4\begin{bmatrix} 2 \\ -3 \\ 0 \\ 1 \end{bmatrix}$$

This gives us dependence relations:
- $\mathbf{v}_1 - \mathbf{v}_2 + \mathbf{v}_3 = \mathbf{0}$
- $2\mathbf{v}_1 - 3\mathbf{v}_2 + \mathbf{v}_4 = \mathbf{0}$

Or equivalently:
- $\mathbf{v}_3 = -\mathbf{v}_1 + \mathbf{v}_2$
- $\mathbf{v}_4 = -2\mathbf{v}_1 + 3\mathbf{v}_2$

## Removing Redundancy

When you have a linearly dependent set, you often want to find a maximal linearly independent subset. This is the largest subset that remains independent.

### Strategy

1. Identify pivot columns from the row reduced form
2. The vectors corresponding to pivot columns form a maximal linearly independent subset

**Example 3**: Find a maximal independent subset from Example 1.

From the RREF, columns 1 and 2 are pivot columns. Therefore, $\{\mathbf{v}_1, \mathbf{v}_2\}$ is a maximal linearly independent subset. We can remove $\mathbf{v}_3$ and $\mathbf{v}_4$ without losing any span, since:

$$\text{Span}\{\mathbf{v}_1, \mathbf{v}_2, \mathbf{v}_3, \mathbf{v}_4\} = \text{Span}\{\mathbf{v}_1, \mathbf{v}_2\}$$

## Important Theorems

### Theorem 1: Characterization of Dependence

A set $\{\mathbf{v}_1, \ldots, \mathbf{v}_n\}$ is linearly dependent if and only if at least one vector $\mathbf{v}_k$ (for $k > 1$) is a linear combination of the preceding vectors $\mathbf{v}_1, \ldots, \mathbf{v}_{k-1}$.

### Theorem 2: More Vectors Than Dimension

If the number of vectors exceeds the dimension of the space, the set is linearly dependent. Specifically, any set of $n+1$ or more vectors in $\mathbb{R}^n$ is linearly dependent.

### Theorem 3: Spanning and Dependence

If $\{\mathbf{v}_1, \ldots, \mathbf{v}_n\}$ spans a vector space $V$ and one vector is removed from the set, then:
- If the removed vector is in the span of the others, the remaining vectors still span $V$
- If the removed vector is not in the span of the others, the remaining vectors do not span $V$

## Step-by-Step Example

**Problem**: Given the vectors below, determine if they are linearly dependent. If so, find all dependence relations and a maximal independent subset.

$$\mathbf{v}_1 = \begin{bmatrix} 1 \\ 1 \\ 0 \\ 2 \end{bmatrix}, \quad \mathbf{v}_2 = \begin{bmatrix} 0 \\ 1 \\ 1 \\ 1 \end{bmatrix}, \quad \mathbf{v}_3 = \begin{bmatrix} 1 \\ 2 \\ 1 \\ 3 \end{bmatrix}$$

**Solution**:

**Step 1**: Form the matrix and check dimensions. We have 3 vectors in $\mathbb{R}^4$, so dependence is not guaranteed by counting.

$$A = \begin{bmatrix} 1 & 0 & 1 \\ 1 & 1 & 2 \\ 0 & 1 & 1 \\ 2 & 1 & 3 \end{bmatrix}$$

**Step 2**: Row reduce to RREF:

$$\begin{bmatrix} 1 & 0 & 1 \\ 1 & 1 & 2 \\ 0 & 1 & 1 \\ 2 & 1 & 3 \end{bmatrix} \xrightarrow{\text{RREF}} \begin{bmatrix} 1 & 0 & 1 \\ 0 & 1 & 1 \\ 0 & 0 & 0 \\ 0 & 0 & 0 \end{bmatrix}$$

**Step 3**: Identify free variables. Column 3 has no pivot, so $x_3$ is free.

**Step 4**: Write the dependence relation. Setting $x_3 = 1$:

$$\begin{cases} x_1 + x_3 = 0 \\ x_2 + x_3 = 0 \end{cases} \implies \begin{cases} x_1 = -1 \\ x_2 = -1 \\ x_3 = 1 \end{cases}$$

The dependence relation is: $-\mathbf{v}_1 - \mathbf{v}_2 + \mathbf{v}_3 = \mathbf{0}$

Or equivalently: $\mathbf{v}_3 = \mathbf{v}_1 + \mathbf{v}_2$

**Step 5**: Maximal independent subset. Columns 1 and 2 are pivot columns, so $\{\mathbf{v}_1, \mathbf{v}_2\}$ is a maximal linearly independent subset.

## Common Mistakes to Avoid

1. **Assuming dependence implies proportionality**: Not all dependent sets consist of proportional vectors; the dependence might involve three or more vectors
2. **Forgetting that dependence is about the whole set**: If you find one dependence relation, the entire set is dependent
3. **Not checking all vectors**: When expressing one vector in terms of others, make sure to check which specific vectors can be so expressed
4. **Confusing rows and columns**: When using matrices, vectors should be columns, not rows

## Practice Problems

1. Show that the vectors $\begin{bmatrix} 1 \\ 0 \\ 1 \end{bmatrix}$, $\begin{bmatrix} 0 \\ 1 \\ 1 \end{bmatrix}$, and $\begin{bmatrix} 1 \\ 1 \\ 2 \end{bmatrix}$ are linearly dependent and find the dependence relation.

2. For which value(s) of $a$ are the vectors $\begin{bmatrix} 1 \\ a \\ 0 \end{bmatrix}$, $\begin{bmatrix} a \\ 1 \\ 1 \end{bmatrix}$, and $\begin{bmatrix} 0 \\ 1 \\ a \end{bmatrix}$ linearly dependent?

3. If $\{\mathbf{v}_1, \mathbf{v}_2, \mathbf{v}_3\}$ is linearly dependent and $\mathbf{v}_3 \neq \mathbf{0}$, can we conclude that $\mathbf{v}_3$ is a linear combination of $\mathbf{v}_1$ and $\mathbf{v}_2$?

## Summary

Linear dependence occurs when at least one vector in a set can be expressed as a linear combination of the others. We can identify dependence by row reducing the matrix formed by the vectors and looking for columns without pivots. Dependence relations tell us exactly how vectors relate to each other, and we can use this information to remove redundant vectors and find maximal independent subsets. Understanding dependence is essential for working with bases and understanding the structure of vector spaces.
