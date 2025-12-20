---
id: math201-t7-definition
title: "Transformation Definition"
order: 1
---

# Definition of Linear Transformations

## Introduction

Linear transformations are fundamental mappings between vector spaces that preserve the algebraic structure of those spaces. They form the bridge between abstract vector space theory and concrete matrix operations, making them one of the most important concepts in linear algebra.

## Definition

A **linear transformation** (or linear map) is a function $T: V \to W$ between two vector spaces $V$ and $W$ over the same field that satisfies two properties:

1. **Additivity**: $T(\mathbf{u} + \mathbf{v}) = T(\mathbf{u}) + T(\mathbf{v})$ for all $\mathbf{u}, \mathbf{v} \in V$
2. **Homogeneity**: $T(c\mathbf{u}) = cT(\mathbf{u})$ for all $\mathbf{u} \in V$ and all scalars $c$

These two properties can be combined into a single equivalent condition:

$$T(c_1\mathbf{u} + c_2\mathbf{v}) = c_1T(\mathbf{u}) + c_2T(\mathbf{v})$$

for all vectors $\mathbf{u}, \mathbf{v} \in V$ and all scalars $c_1, c_2$.

## Important Consequences

From the definition, we can immediately derive several important properties:

1. **Zero Vector Property**: $T(\mathbf{0}) = \mathbf{0}$

   *Proof*: $T(\mathbf{0}) = T(0 \cdot \mathbf{v}) = 0 \cdot T(\mathbf{v}) = \mathbf{0}$

2. **Preservation of Linear Combinations**: For any vectors $\mathbf{v}_1, \mathbf{v}_2, \ldots, \mathbf{v}_n$ and scalars $c_1, c_2, \ldots, c_n$:

   $$T(c_1\mathbf{v}_1 + c_2\mathbf{v}_2 + \cdots + c_n\mathbf{v}_n) = c_1T(\mathbf{v}_1) + c_2T(\mathbf{v}_2) + \cdots + c_nT(\mathbf{v}_n)$$

3. **Negation**: $T(-\mathbf{v}) = -T(\mathbf{v})$

## Examples of Linear Transformations

### Example 1: Scaling Transformation

Define $T: \mathbb{R}^2 \to \mathbb{R}^2$ by $T(x, y) = (3x, 3y)$.

**Verification**:
- Additivity: $T((x_1, y_1) + (x_2, y_2)) = T(x_1 + x_2, y_1 + y_2) = (3(x_1 + x_2), 3(y_1 + y_2)) = (3x_1 + 3x_2, 3y_1 + 3y_2) = (3x_1, 3y_1) + (3x_2, 3y_2) = T(x_1, y_1) + T(x_2, y_2)$ ✓

- Homogeneity: $T(c(x, y)) = T(cx, cy) = (3cx, 3cy) = c(3x, 3y) = cT(x, y)$ ✓

Therefore, $T$ is a linear transformation.

### Example 2: Projection onto the x-axis

Define $T: \mathbb{R}^2 \to \mathbb{R}^2$ by $T(x, y) = (x, 0)$.

**Verification**:
- $T((x_1, y_1) + (x_2, y_2)) = T(x_1 + x_2, y_1 + y_2) = (x_1 + x_2, 0) = (x_1, 0) + (x_2, 0) = T(x_1, y_1) + T(x_2, y_2)$ ✓

- $T(c(x, y)) = T(cx, cy) = (cx, 0) = c(x, 0) = cT(x, y)$ ✓

This transformation is linear.

### Example 3: Differentiation

Define $D: P_n \to P_{n-1}$ by $D(p(t)) = p'(t)$, where $P_n$ is the vector space of polynomials of degree at most $n$.

**Verification**:
- $D(p(t) + q(t)) = (p + q)'(t) = p'(t) + q'(t) = D(p(t)) + D(q(t))$ ✓

- $D(cp(t)) = (cp)'(t) = cp'(t) = cD(p(t))$ ✓

Differentiation is a linear transformation on polynomial spaces.

### Example 4: Matrix Multiplication

Define $T: \mathbb{R}^n \to \mathbb{R}^m$ by $T(\mathbf{x}) = A\mathbf{x}$, where $A$ is an $m \times n$ matrix.

**Verification**:
- $T(\mathbf{u} + \mathbf{v}) = A(\mathbf{u} + \mathbf{v}) = A\mathbf{u} + A\mathbf{v} = T(\mathbf{u}) + T(\mathbf{v})$ ✓

- $T(c\mathbf{u}) = A(c\mathbf{u}) = c(A\mathbf{u}) = cT(\mathbf{u})$ ✓

This is perhaps the most important example, as every linear transformation from $\mathbb{R}^n$ to $\mathbb{R}^m$ can be represented this way.

## Examples of Non-Linear Transformations

### Example 5: Translation

Define $T: \mathbb{R}^2 \to \mathbb{R}^2$ by $T(x, y) = (x + 1, y + 2)$.

**Check**: $T(\mathbf{0}) = T(0, 0) = (1, 2) \neq (0, 0)$

Since the zero vector is not mapped to the zero vector, $T$ is **not linear**.

### Example 6: Squaring Function

Define $T: \mathbb{R} \to \mathbb{R}$ by $T(x) = x^2$.

**Check**: $T(1 + 1) = T(2) = 4$, but $T(1) + T(1) = 1 + 1 = 2$.

Since $T(1 + 1) \neq T(1) + T(1)$, this transformation is **not linear**.

### Example 7: Norm Function

Define $T: \mathbb{R}^2 \to \mathbb{R}$ by $T(x, y) = \sqrt{x^2 + y^2}$.

**Check**: $T(2(1, 0)) = T(2, 0) = 2$, but $2T(1, 0) = 2(1) = 2$... wait, let's try another:

$T(-1, 0) = 1$, but $-T(1, 0) = -1 \neq 1$.

Since homogeneity fails, this is **not linear**.

## Verifying Linearity: Step-by-Step Process

To verify that a transformation $T: V \to W$ is linear:

**Step 1**: Check the zero vector property: Does $T(\mathbf{0}) = \mathbf{0}$?
- If no, the transformation is not linear.
- If yes, continue to Step 2.

**Step 2**: Verify additivity: For arbitrary vectors $\mathbf{u}, \mathbf{v} \in V$, does $T(\mathbf{u} + \mathbf{v}) = T(\mathbf{u}) + T(\mathbf{v})$?

**Step 3**: Verify homogeneity: For an arbitrary vector $\mathbf{u} \in V$ and scalar $c$, does $T(c\mathbf{u}) = cT(\mathbf{u})$?

If both properties hold, the transformation is linear.

## Worked Example: Complete Verification

**Problem**: Determine whether $T: \mathbb{R}^3 \to \mathbb{R}^2$ defined by $T(x, y, z) = (2x - y, 3z)$ is linear.

**Solution**:

*Step 1: Zero vector*
$$T(0, 0, 0) = (2(0) - 0, 3(0)) = (0, 0) = \mathbf{0}$$ ✓

*Step 2: Additivity*
Let $\mathbf{u} = (x_1, y_1, z_1)$ and $\mathbf{v} = (x_2, y_2, z_2)$.

$$T(\mathbf{u} + \mathbf{v}) = T(x_1 + x_2, y_1 + y_2, z_1 + z_2)$$
$$= (2(x_1 + x_2) - (y_1 + y_2), 3(z_1 + z_2))$$
$$= (2x_1 + 2x_2 - y_1 - y_2, 3z_1 + 3z_2)$$
$$= (2x_1 - y_1, 3z_1) + (2x_2 - y_2, 3z_2)$$
$$= T(\mathbf{u}) + T(\mathbf{v})$$ ✓

*Step 3: Homogeneity*
Let $\mathbf{u} = (x, y, z)$ and $c$ be a scalar.

$$T(c\mathbf{u}) = T(cx, cy, cz)$$
$$= (2(cx) - cy, 3(cz))$$
$$= (2cx - cy, 3cz)$$
$$= c(2x - y, 3z)$$
$$= cT(\mathbf{u})$$ ✓

**Conclusion**: Since all three conditions are satisfied, $T$ is a linear transformation.

## Summary

Linear transformations are characterized by two essential properties: additivity and homogeneity. These properties ensure that the transformation preserves the vector space structure, making linear transformations predictable and tractable. The ability to verify linearity is fundamental to working with transformations in linear algebra, and recognizing non-linear transformations helps avoid incorrect applications of linear algebra techniques.
