---
id: math201-t3-coordinates
title: "Coordinate Systems"
order: 7
---

# Coordinate Systems

Coordinate systems allow us to represent abstract vectors using familiar $\mathbb{R}^n$ coordinates. Just as we can describe locations on Earth using different coordinate systems (latitude/longitude, UTM, etc.), we can describe vectors in a vector space using different bases. This flexibility is crucial for simplifying calculations, solving differential equations, and understanding geometric transformations.

## The Idea of Coordinates

In $\mathbb{R}^2$, we typically use the standard basis $\{\mathbf{e}_1, \mathbf{e}_2\}$ where:

$$\mathbf{e}_1 = \begin{bmatrix} 1 \\ 0 \end{bmatrix}, \quad \mathbf{e}_2 = \begin{bmatrix} 0 \\ 1 \end{bmatrix}$$

A vector $\mathbf{v} = \begin{bmatrix} 3 \\ 5 \end{bmatrix}$ can be written as:

$$\mathbf{v} = 3\mathbf{e}_1 + 5\mathbf{e}_2$$

The coordinates $(3, 5)$ tell us how to combine the basis vectors to get $\mathbf{v}$.

**Key insight:** These coordinates are not intrinsic to $\mathbf{v}$—they depend on our choice of basis. If we choose a different basis, the same vector has different coordinates.

## Coordinates Relative to a Basis

### Definition

Let $\mathcal{B} = \{\mathbf{b}_1, \mathbf{b}_2, \ldots, \mathbf{b}_n\}$ be a **basis** for vector space $V$. For any vector $\mathbf{v} \in V$, there exist **unique** scalars $c_1, c_2, \ldots, c_n$ such that:

$$\mathbf{v} = c_1\mathbf{b}_1 + c_2\mathbf{b}_2 + \cdots + c_n\mathbf{b}_n$$

The **coordinate vector** of $\mathbf{v}$ relative to basis $\mathcal{B}$ is:

$$[\mathbf{v}]_\mathcal{B} = \begin{bmatrix} c_1 \\ c_2 \\ \vdots \\ c_n \end{bmatrix}$$

**Read as:** "The $\mathcal{B}$-coordinates of $\mathbf{v}$" or "the coordinate vector of $\mathbf{v}$ with respect to $\mathcal{B}$."

**Important:** The order of basis vectors matters! Different orderings give different coordinate vectors.

### Why Coordinates are Unique

A set of vectors $\{\mathbf{b}_1, \ldots, \mathbf{b}_n\}$ is a **basis** if:
1. It **spans** $V$ (every vector can be written as a linear combination)
2. It is **linearly independent** (no redundancy)

The linear independence guarantees uniqueness: if $c_1\mathbf{b}_1 + \cdots + c_n\mathbf{b}_n = d_1\mathbf{b}_1 + \cdots + d_n\mathbf{b}_n$, then subtracting gives:

$$(c_1 - d_1)\mathbf{b}_1 + \cdots + (c_n - d_n)\mathbf{b}_n = \mathbf{0}$$

Since the $\mathbf{b}_i$ are linearly independent, all coefficients must be zero: $c_i - d_i = 0$ for all $i$. Therefore $c_i = d_i$ for all $i$.

## Example 1: Coordinates in $\mathbb{R}^2$

Let $\mathcal{B} = \left\{\mathbf{b}_1 = \begin{bmatrix} 1 \\ 1 \end{bmatrix}, \mathbf{b}_2 = \begin{bmatrix} 1 \\ -1 \end{bmatrix}\right\}$.

Find $[\mathbf{v}]_\mathcal{B}$ where $\mathbf{v} = \begin{bmatrix} 3 \\ 1 \end{bmatrix}$.

**Solution:** We need to find $c_1, c_2$ such that:

$$c_1\begin{bmatrix} 1 \\ 1 \end{bmatrix} + c_2\begin{bmatrix} 1 \\ -1 \end{bmatrix} = \begin{bmatrix} 3 \\ 1 \end{bmatrix}$$

This gives the system:
$$\begin{align}
c_1 + c_2 &= 3 \\
c_1 - c_2 &= 1
\end{align}$$

Adding the equations: $2c_1 = 4 \Rightarrow c_1 = 2$.

Subtracting: $2c_2 = 2 \Rightarrow c_2 = 1$.

**Answer:**

$$[\mathbf{v}]_\mathcal{B} = \begin{bmatrix} 2 \\ 1 \end{bmatrix}$$

**Verification:** $2\begin{bmatrix} 1 \\ 1 \end{bmatrix} + 1\begin{bmatrix} 1 \\ -1 \end{bmatrix} = \begin{bmatrix} 2 \\ 2 \end{bmatrix} + \begin{bmatrix} 1 \\ -1 \end{bmatrix} = \begin{bmatrix} 3 \\ 1 \end{bmatrix}$. ✓

**Interpretation:** In standard coordinates, $\mathbf{v} = \begin{bmatrix} 3 \\ 1 \end{bmatrix}$. In $\mathcal{B}$-coordinates, the same vector is $\begin{bmatrix} 2 \\ 1 \end{bmatrix}_\mathcal{B}$.

## Example 2: Coordinates in $\mathbb{R}^3$

Let $\mathcal{B} = \left\{\begin{bmatrix} 1 \\ 0 \\ 1 \end{bmatrix}, \begin{bmatrix} 0 \\ 1 \\ 1 \end{bmatrix}, \begin{bmatrix} 1 \\ 1 \\ 0 \end{bmatrix}\right\}$.

Find $[\mathbf{v}]_\mathcal{B}$ where $\mathbf{v} = \begin{bmatrix} 2 \\ 3 \\ 1 \end{bmatrix}$.

**Solution:** Form the matrix equation $[P_\mathcal{B}][\mathbf{v}]_\mathcal{B} = \mathbf{v}$, where $P_\mathcal{B}$ has basis vectors as columns:

$$\begin{bmatrix} 1 & 0 & 1 \\ 0 & 1 & 1 \\ 1 & 1 & 0 \end{bmatrix}\begin{bmatrix} c_1 \\ c_2 \\ c_3 \end{bmatrix} = \begin{bmatrix} 2 \\ 3 \\ 1 \end{bmatrix}$$

Row reduce the augmented matrix:

$$\begin{bmatrix} 1 & 0 & 1 & | & 2 \\ 0 & 1 & 1 & | & 3 \\ 1 & 1 & 0 & | & 1 \end{bmatrix} \sim \begin{bmatrix} 1 & 0 & 1 & | & 2 \\ 0 & 1 & 1 & | & 3 \\ 0 & 1 & -1 & | & -1 \end{bmatrix}$$

$$\sim \begin{bmatrix} 1 & 0 & 1 & | & 2 \\ 0 & 1 & 1 & | & 3 \\ 0 & 0 & -2 & | & -4 \end{bmatrix} \sim \begin{bmatrix} 1 & 0 & 1 & | & 2 \\ 0 & 1 & 1 & | & 3 \\ 0 & 0 & 1 & | & 2 \end{bmatrix}$$

$$\sim \begin{bmatrix} 1 & 0 & 0 & | & 0 \\ 0 & 1 & 0 & | & 1 \\ 0 & 0 & 1 & | & 2 \end{bmatrix}$$

**Answer:**

$$[\mathbf{v}]_\mathcal{B} = \begin{bmatrix} 0 \\ 1 \\ 2 \end{bmatrix}$$

**Verification:** $0\begin{bmatrix} 1 \\ 0 \\ 1 \end{bmatrix} + 1\begin{bmatrix} 0 \\ 1 \\ 1 \end{bmatrix} + 2\begin{bmatrix} 1 \\ 1 \\ 0 \end{bmatrix} = \begin{bmatrix} 0 \\ 1 \\ 1 \end{bmatrix} + \begin{bmatrix} 2 \\ 2 \\ 0 \end{bmatrix} = \begin{bmatrix} 2 \\ 3 \\ 1 \end{bmatrix}$. ✓

## Matrix Method for Finding Coordinates

**General procedure:** To find $[\mathbf{v}]_\mathcal{B}$ where $\mathcal{B} = \{\mathbf{b}_1, \ldots, \mathbf{b}_n\}$:

1. Form the matrix $P_\mathcal{B} = [\mathbf{b}_1 \; \mathbf{b}_2 \; \cdots \; \mathbf{b}_n]$ (columns are basis vectors)
2. Solve the system $P_\mathcal{B}\mathbf{x} = \mathbf{v}$ for $\mathbf{x}$
3. The solution $\mathbf{x}$ is $[\mathbf{v}]_\mathcal{B}$

**Why this works:** The equation $P_\mathcal{B}\mathbf{x} = \mathbf{v}$ is exactly:

$$x_1\mathbf{b}_1 + x_2\mathbf{b}_2 + \cdots + x_n\mathbf{b}_n = \mathbf{v}$$

which defines the coordinates.

**Equivalently:** If $\mathcal{B}$ is a basis, then $P_\mathcal{B}$ is invertible, and:

$$[\mathbf{v}]_\mathcal{B} = P_\mathcal{B}^{-1}\mathbf{v}$$

The matrix $P_\mathcal{B}^{-1}$ is called the **change-of-coordinates matrix** from the standard basis to $\mathcal{B}$.

## Example 3: Using the Inverse Matrix

From Example 1, $\mathcal{B} = \left\{\begin{bmatrix} 1 \\ 1 \end{bmatrix}, \begin{bmatrix} 1 \\ -1 \end{bmatrix}\right\}$.

**Find:** $P_\mathcal{B}^{-1}$.

$$P_\mathcal{B} = \begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}$$

Using the inverse formula for $2 \times 2$ matrices:

$$P_\mathcal{B}^{-1} = \frac{1}{(1)(-1) - (1)(1)}\begin{bmatrix} -1 & -1 \\ -1 & 1 \end{bmatrix} = \frac{1}{-2}\begin{bmatrix} -1 & -1 \\ -1 & 1 \end{bmatrix} = \begin{bmatrix} 1/2 & 1/2 \\ 1/2 & -1/2 \end{bmatrix}$$

**Application:** For $\mathbf{v} = \begin{bmatrix} 3 \\ 1 \end{bmatrix}$:

$$[\mathbf{v}]_\mathcal{B} = P_\mathcal{B}^{-1}\mathbf{v} = \begin{bmatrix} 1/2 & 1/2 \\ 1/2 & -1/2 \end{bmatrix}\begin{bmatrix} 3 \\ 1 \end{bmatrix} = \begin{bmatrix} 3/2 + 1/2 \\ 3/2 - 1/2 \end{bmatrix} = \begin{bmatrix} 2 \\ 1 \end{bmatrix}$$

This matches our earlier result!

## Coordinates in Other Vector Spaces

### Polynomial Space $\mathcal{P}_2$

The standard basis for $\mathcal{P}_2$ is $\mathcal{E} = \{1, x, x^2\}$.

Consider the alternative basis $\mathcal{B} = \{1, 1+x, 1+x+x^2\}$.

**Find:** $[p]_\mathcal{B}$ where $p(x) = 4 + 3x - x^2$.

We need: $c_1(1) + c_2(1 + x) + c_3(1 + x + x^2) = 4 + 3x - x^2$.

Expanding the left side:
$$(c_1 + c_2 + c_3) + (c_2 + c_3)x + c_3x^2 = 4 + 3x - x^2$$

Matching coefficients:
- Constant: $c_1 + c_2 + c_3 = 4$
- $x$: $c_2 + c_3 = 3$
- $x^2$: $c_3 = -1$

From the third equation: $c_3 = -1$.

From the second: $c_2 = 3 - c_3 = 3 - (-1) = 4$.

From the first: $c_1 = 4 - c_2 - c_3 = 4 - 4 - (-1) = 1$.

**Answer:**

$$[p]_\mathcal{B} = \begin{bmatrix} 1 \\ 4 \\ -1 \end{bmatrix}$$

**Verification:** $1(1) + 4(1 + x) + (-1)(1 + x + x^2) = 1 + 4 + 4x - 1 - x - x^2 = 4 + 3x - x^2$. ✓

### Matrix Space $M_{2 \times 2}$

A standard basis for $M_{2 \times 2}$ is:

$$\mathcal{E} = \left\{\begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix}, \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix}, \begin{bmatrix} 0 & 0 \\ 1 & 0 \end{bmatrix}, \begin{bmatrix} 0 & 0 \\ 0 & 1 \end{bmatrix}\right\}$$

For $A = \begin{bmatrix} 3 & 5 \\ -2 & 7 \end{bmatrix}$, the $\mathcal{E}$-coordinates are simply the entries read in order:

$$[A]_\mathcal{E} = \begin{bmatrix} 3 \\ 5 \\ -2 \\ 7 \end{bmatrix}$$

This establishes an isomorphism between $M_{2 \times 2}$ and $\mathbb{R}^4$.

## Change of Coordinates Between Bases

Suppose we have two bases $\mathcal{B}$ and $\mathcal{C}$ for the same vector space $V$. Given $[\mathbf{v}]_\mathcal{B}$, how do we find $[\mathbf{v}]_\mathcal{C}$?

**Answer:** Use a **change-of-coordinates matrix** $\underset{\mathcal{C} \leftarrow \mathcal{B}}{P}$ (read as "change from $\mathcal{B}$ to $\mathcal{C}$"):

$$[\mathbf{v}]_\mathcal{C} = \underset{\mathcal{C} \leftarrow \mathcal{B}}{P} \, [\mathbf{v}]_\mathcal{B}$$

### Computing the Change-of-Coordinates Matrix

To find $\underset{\mathcal{C} \leftarrow \mathcal{B}}{P}$:

1. Find the $\mathcal{C}$-coordinates of each basis vector in $\mathcal{B}$
2. The $j$-th column of $\underset{\mathcal{C} \leftarrow \mathcal{B}}{P}$ is $[\mathbf{b}_j]_\mathcal{C}$

**Shortcut in $\mathbb{R}^n$:**

$$\underset{\mathcal{C} \leftarrow \mathcal{B}}{P} = P_\mathcal{C}^{-1} P_\mathcal{B}$$

where $P_\mathcal{B} = [\mathbf{b}_1 \; \cdots \; \mathbf{b}_n]$ and $P_\mathcal{C} = [\mathbf{c}_1 \; \cdots \; \mathbf{c}_n]$.

### Example 4: Change of Coordinates in $\mathbb{R}^2$

Let $\mathcal{B} = \left\{\begin{bmatrix} 1 \\ 1 \end{bmatrix}, \begin{bmatrix} 1 \\ -1 \end{bmatrix}\right\}$ and $\mathcal{C} = \left\{\begin{bmatrix} 2 \\ 1 \end{bmatrix}, \begin{bmatrix} 1 \\ 2 \end{bmatrix}\right\}$.

Find $\underset{\mathcal{C} \leftarrow \mathcal{B}}{P}$.

**Solution:**

$$P_\mathcal{B} = \begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}, \quad P_\mathcal{C} = \begin{bmatrix} 2 & 1 \\ 1 & 2 \end{bmatrix}$$

First, find $P_\mathcal{C}^{-1}$:

$$P_\mathcal{C}^{-1} = \frac{1}{(2)(2) - (1)(1)}\begin{bmatrix} 2 & -1 \\ -1 & 2 \end{bmatrix} = \frac{1}{3}\begin{bmatrix} 2 & -1 \\ -1 & 2 \end{bmatrix}$$

Then:

$$\underset{\mathcal{C} \leftarrow \mathcal{B}}{P} = P_\mathcal{C}^{-1} P_\mathcal{B} = \frac{1}{3}\begin{bmatrix} 2 & -1 \\ -1 & 2 \end{bmatrix}\begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix} = \frac{1}{3}\begin{bmatrix} 1 & 3 \\ 1 & -3 \end{bmatrix}$$

**Verification:** Take $\mathbf{v} = \begin{bmatrix} 3 \\ 1 \end{bmatrix}$. We found earlier that $[\mathbf{v}]_\mathcal{B} = \begin{bmatrix} 2 \\ 1 \end{bmatrix}$.

$$[\mathbf{v}]_\mathcal{C} = \frac{1}{3}\begin{bmatrix} 1 & 3 \\ 1 & -3 \end{bmatrix}\begin{bmatrix} 2 \\ 1 \end{bmatrix} = \frac{1}{3}\begin{bmatrix} 5 \\ -1 \end{bmatrix}$$

Check: Does $\frac{5}{3}\begin{bmatrix} 2 \\ 1 \end{bmatrix} - \frac{1}{3}\begin{bmatrix} 1 \\ 2 \end{bmatrix} = \begin{bmatrix} 3 \\ 1 \end{bmatrix}$?

$$\frac{1}{3}\begin{bmatrix} 10 \\ 5 \end{bmatrix} - \frac{1}{3}\begin{bmatrix} 1 \\ 2 \end{bmatrix} = \frac{1}{3}\begin{bmatrix} 9 \\ 3 \end{bmatrix} = \begin{bmatrix} 3 \\ 1 \end{bmatrix}$$ ✓

## Properties of Coordinate Mappings

The mapping $\mathbf{v} \mapsto [\mathbf{v}]_\mathcal{B}$ from $V$ to $\mathbb{R}^n$ is:
- **One-to-one:** Different vectors have different coordinate vectors
- **Onto:** Every vector in $\mathbb{R}^n$ is the coordinate vector of some vector in $V$
- **Linear:** $[c\mathbf{u} + d\mathbf{v}]_\mathcal{B} = c[\mathbf{u}]_\mathcal{B} + d[\mathbf{v}]_\mathcal{B}$

This makes it an **isomorphism**—a structure-preserving bijection. Every $n$-dimensional vector space is essentially the same as $\mathbb{R}^n$.

## Summary

- **Coordinate vector** $[\mathbf{v}]_\mathcal{B}$ represents $\mathbf{v}$ using basis $\mathcal{B}$
- Coordinates are **unique** because bases are linearly independent
- To find $[\mathbf{v}]_\mathcal{B}$: solve $P_\mathcal{B}\mathbf{x} = \mathbf{v}$ or compute $P_\mathcal{B}^{-1}\mathbf{v}$
- **Change-of-coordinates matrix** $\underset{\mathcal{C} \leftarrow \mathcal{B}}{P}$ converts $\mathcal{B}$-coordinates to $\mathcal{C}$-coordinates
- Coordinate mappings create isomorphisms between abstract vector spaces and $\mathbb{R}^n$
- Different bases provide different "perspectives" on the same geometric object
