---
title: "Subgroup Tests"
description: "Efficient criteria for determining when a subset is a subgroup"
---

# Subgroup Tests

## Motivation

Verifying that a subset $H$ of a group $G$ is a subgroup requires checking closure, identity, and inverses. However, these conditions can often be combined into more efficient tests. In this section, we develop streamlined criteria for recognizing subgroups.

## The Two-Step Subgroup Test

**Theorem 1 (Two-Step Subgroup Test)**: Let $G$ be a group and $H$ a nonempty subset of $G$. Then $H$ is a subgroup of $G$ if and only if:
1. For all $a, b \in H$, we have $a \ast b \in H$ (closure)
2. For all $a \in H$, we have $a^{-1} \in H$ (inverses)

**Proof**:
($\Rightarrow$) If $H \leq G$, then $H$ satisfies all subgroup properties, including closure and inverses.

($\Leftarrow$) Assume conditions (1) and (2) hold. We need to verify that $H$ is a subgroup:

- **Associativity**: Inherited from $G$. ✓

- **Closure**: This is condition (1). ✓

- **Inverses**: This is condition (2). ✓

- **Identity**: Since $H$ is nonempty, let $a \in H$. By condition (2), $a^{-1} \in H$. By condition (1), $a \ast a^{-1} = e \in H$. ✓

Therefore, $H \leq G$. $\square$

**Advantage**: We only need to check two conditions instead of three (the identity is automatically present).

### Example 1: Verifying $SL_n(\mathbb{R}) \leq GL_n(\mathbb{R})$

Let $H = SL_n(\mathbb{R}) = \{A \in GL_n(\mathbb{R}) : \det(A) = 1\}$.

1. **Closure**: If $A, B \in H$, then $\det(AB) = \det(A)\det(B) = 1 \cdot 1 = 1$, so $AB \in H$. ✓

2. **Inverses**: If $A \in H$, then $\det(A^{-1}) = 1/\det(A) = 1/1 = 1$, so $A^{-1} \in H$. ✓

Therefore, $SL_n(\mathbb{R}) \leq GL_n(\mathbb{R})$. $\square$

## The One-Step Subgroup Test

We can combine the conditions even further.

**Theorem 2 (One-Step Subgroup Test)**: Let $G$ be a group and $H$ a nonempty subset of $G$. Then $H$ is a subgroup of $G$ if and only if:

$$\text{For all } a, b \in H, \text{ we have } a \ast b^{-1} \in H$$

**Proof**:
($\Rightarrow$) If $H \leq G$ and $a, b \in H$, then $b^{-1} \in H$ (by inverses) and $a \ast b^{-1} \in H$ (by closure).

($\Leftarrow$) Assume the condition holds. We verify the Two-Step Test:

- **Inverses**: Since $H \neq \emptyset$, let $a \in H$. Taking $b = a$, we have $a \ast a^{-1} = e \in H$. Now for any $a \in H$, taking $b = a$, we get $e \ast a^{-1} = a^{-1} \in H$. ✓

- **Closure**: Let $a, b \in H$. We've shown $b^{-1} \in H$. By the given condition with $b$ replaced by $b^{-1}$:
$$a \ast (b^{-1})^{-1} = a \ast b \in H$$
✓

Therefore, $H \leq G$ by the Two-Step Test. $\square$

### Example 2: Multiples of $n$

Let $H = n\mathbb{Z} = \{nk : k \in \mathbb{Z}\}$ in the group $(\mathbb{Z}, +)$.

For $a, b \in H$, we have $a = nm$ and $b = nk$ for some $m, k \in \mathbb{Z}$. Then:
$$a - b = nm - nk = n(m - k) \in n\mathbb{Z}$$

Therefore, $n\mathbb{Z} \leq \mathbb{Z}$ by the One-Step Test. $\square$

**Note**: In additive notation, the condition becomes: for all $a, b \in H$, we have $a - b \in H$.

## The Finite Subgroup Test

For finite subsets, we can simplify further.

**Theorem 3 (Finite Subgroup Test)**: Let $G$ be a group and $H$ a finite nonempty subset of $G$. Then $H$ is a subgroup of $G$ if and only if $H$ is closed under the group operation.

**Proof**:
($\Rightarrow$) If $H \leq G$, then closure holds by definition.

($\Leftarrow$) Assume $H$ is closed. We need to show inverses exist in $H$.

Let $a \in H$. Consider the sequence $a, a^2, a^3, a^4, \ldots$ Since $H$ is closed, all these elements are in $H$. Since $H$ is finite, these elements cannot all be distinct. Therefore, $a^i = a^j$ for some $i < j$.

Then $a^i \ast a^{j-i} = a^j = a^i$. By left cancellation, $a^{j-i} = e$. Let $m = j - i > 0$, so $a^m = e$.

If $m = 1$, then $a = e$ and $a^{-1} = a = e \in H$.

If $m > 1$, then:
$$a \ast a^{m-1} = a^m = e$$

So $a^{-1} = a^{m-1} \in H$ (since $H$ is closed and contains $a$).

Therefore, every element of $H$ has its inverse in $H$, and the identity $e = a \ast a^{-1} \in H$. By the Two-Step Test, $H \leq G$. $\square$

**Important**: This test only works for finite subsets. For infinite subsets, closure alone is insufficient.

**Counterexample**: The natural numbers $\mathbb{N} = \{0, 1, 2, 3, \ldots\}$ are closed under addition but not a subgroup of $(\mathbb{Z}, +)$ because inverses don't exist.

### Example 3: Verifying a Finite Subgroup

Consider $H = \{0, 3, 6, 9\}$ in $\mathbb{Z}_{12}$ under addition modulo 12.

We need only check closure:
- $3 + 3 = 6 \in H$ ✓
- $3 + 6 = 9 \in H$ ✓
- $3 + 9 = 0 \in H$ ✓
- $6 + 6 = 0 \in H$ ✓
- $6 + 9 = 3 \in H$ ✓
- $9 + 9 = 6 \in H$ ✓

Therefore, $H \leq \mathbb{Z}_{12}$ by the Finite Subgroup Test. $\square$

## Summary of Tests

| Test | Conditions | When to Use |
|------|-----------|-------------|
| **Two-Step** | Closure + Inverses | General case, clear structure |
| **One-Step** | $a \ast b^{-1} \in H$ | Quick verification, additive groups |
| **Finite** | Closure only | Finite subsets only |

## Additional Examples

### Example 4: Rotations in Dihedral Group

Let $D_4$ be the symmetry group of a square, and let $H$ be the set of rotations:
$$H = \{r_0, r_1, r_2, r_3\}$$
where $r_k$ denotes rotation by $90k$ degrees.

**Verification using Finite Test**:
$H$ is finite, so we check closure. The composition of any two rotations is a rotation:
- $r_i \circ r_j = r_{(i+j) \bmod 4} \in H$

Therefore, $H \leq D_4$. $\square$

### Example 5: Upper Triangular Matrices

Let $U_n(\mathbb{R})$ be the set of $n \times n$ upper triangular matrices with determinant 1. Is $U_n(\mathbb{R}) \leq SL_n(\mathbb{R})$?

**Verification using Two-Step Test**:

1. **Closure**: The product of upper triangular matrices is upper triangular, and if both have determinant 1, so does their product. ✓

2. **Inverses**: The inverse of an upper triangular matrix with determinant 1 is upper triangular with determinant 1. ✓

Therefore, $U_n(\mathbb{R}) \leq SL_n(\mathbb{R})$. $\square$

### Example 6: Rational Points on Unit Circle

Consider $G = \{(x, y) \in \mathbb{Q}^2 : x^2 + y^2 = 1\}$, the rational points on the unit circle.

Define multiplication as:
$$(x_1, y_1) \ast (x_2, y_2) = (x_1x_2 - y_1y_2, x_1y_2 + x_2y_1)$$

This corresponds to complex number multiplication. Is $H = \{(1, 0), (-1, 0), (0, 1), (0, -1)\}$ a subgroup?

**Verification using Finite Test**:
We can verify all products remain in $H$. For instance:
- $(0, 1) \ast (0, 1) = (-1, 0) \in H$
- $(0, 1) \ast (-1, 0) = (0, -1) \in H$

Full verification shows closure holds, so $H \leq G$. $\square$

## Common Mistakes

### Mistake 1: Using Finite Test on Infinite Sets
The positive real numbers $\mathbb{R}^+$ are closed under multiplication but are NOT a subgroup of $(\mathbb{R}^*, \cdot)$ because the inverse of 2 is $1/2$, which IS in $\mathbb{R}^+$... wait, they ARE a subgroup! The mistake would be assuming closure alone proves it for infinite sets without verifying inverses separately.

### Mistake 2: Forgetting Nonemptiness
All tests require $H \neq \emptyset$. The empty set satisfies closure vacuously but is not a subgroup.

### Mistake 3: Checking Only Some Products
When using the Finite Test, you must verify ALL pairwise products, not just a sample.

## Practical Strategy

When determining if $H \leq G$:

1. **Check if $H$ is nonempty** (often obvious or given)
2. **If $H$ is finite**, use the Finite Test (easiest)
3. **If $H$ is infinite**, use the One-Step Test in additive groups, or the Two-Step Test otherwise
4. **For complex conditions**, the One-Step Test often simplifies the algebra

These tests are powerful tools that streamline subgroup verification and will be used extensively throughout group theory.
