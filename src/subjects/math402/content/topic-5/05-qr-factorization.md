---
title: "QR Factorization"
description: "Comprehensive guide to qr factorization with theoretical foundations and Python implementations"
---

# QR Factorization

QR factorization (or QR decomposition) expresses any matrix $A$ as the product of an orthogonal matrix $Q$ and an upper triangular matrix $R$: $A = QR$. This decomposition is particularly valuable because orthogonal matrices have excellent numerical properties, making QR factorization more stable than LU decomposition for solving least squares problems and computing eigenvalues.

The power of QR factorization stems from the properties of orthogonal matrices. Since $Q^T Q = I$, orthogonal transformations preserve vector norms and angles, ensuring that rounding errors don't accumulate catastrophically. This stability makes QR factorization the method of choice for overdetermined systems and numerical rank determination.

## Orthogonal Matrices

A matrix $Q$ is **orthogonal** if its columns form an orthonormal set:
$$Q^T Q = I \quad \text{or equivalently} \quad Q^{-1} = Q^T$$

**Properties of orthogonal matrices:**
- Preserve norms: $\|Qx\| = \|x\|$ for all vectors $x$
- Preserve inner products: $(Qx)^T(Qy) = x^T y$
- Determinant is $\pm 1$
- Condition number is 1 (perfectly conditioned)

These properties make orthogonal transformations numerically stable: they can't amplify errors.

## The QR Factorization

For an $m \times n$ matrix $A$ with $m \geq n$ and full column rank, the QR factorization is:
$$A = QR$$

where:
- $Q$ is $m \times m$ and orthogonal ($Q^T Q = I$)
- $R$ is $m \times n$ and upper triangular

For practical purposes, we often use the **reduced** (or **thin**) QR factorization:
$$A = \hat{Q}\hat{R}$$

where $\hat{Q}$ is $m \times n$ with orthonormal columns and $\hat{R}$ is $n \times n$ upper triangular.

## Gram-Schmidt Orthogonalization

The classical Gram-Schmidt (CGS) algorithm constructs $Q$ and $R$ by orthogonalizing the columns of $A$.

### Classical Gram-Schmidt Algorithm

Let $a_1, a_2, \ldots, a_n$ be the columns of $A$. For $j = 1, 2, \ldots, n$:

1. Compute projection coefficients:
   $$r_{ij} = q_i^T a_j \quad \text{for } i = 1, \ldots, j-1$$

2. Orthogonalize:
   $$q_j = a_j - \sum_{i=1}^{j-1} r_{ij} q_i$$

3. Normalize:
   $$r_{jj} = \|q_j\|$$
   $$q_j = \frac{q_j}{r_{jj}}$$

The coefficients $r_{ij}$ become entries of $R$, and the vectors $q_j$ become columns of $Q$.

### Modified Gram-Schmidt

Modified Gram-Schmidt (MGS) is a numerically stable variant that performs the same operations in a different order:

For $j = 1, 2, \ldots, n$:
1. $q_j = a_j$
2. For $i = 1, \ldots, j-1$:
   - $r_{ij} = q_i^T q_j$
   - $q_j = q_j - r_{ij} q_i$ (update immediately)
3. $r_{jj} = \|q_j\|$
4. $q_j = q_j / r_{jj}$

MGS subtracts projections one at a time, ensuring each step works with the most current orthogonalized vector. This small change dramatically improves numerical stability.

## Worked Example: Modified Gram-Schmidt

Factor the matrix:
$$A = \begin{bmatrix} 1 & 1 & 0 \\ 1 & 0 & 1 \\ 0 & 1 & 1 \end{bmatrix}$$

**Column 1:**

$q_1 = a_1 = [1, 1, 0]^T$

$r_{11} = \|q_1\| = \sqrt{1^2 + 1^2 + 0^2} = \sqrt{2}$

$q_1 = \frac{1}{\sqrt{2}}[1, 1, 0]^T$

**Column 2:**

Start with $q_2 = a_2 = [1, 0, 1]^T$

$r_{12} = q_1^T q_2 = \frac{1}{\sqrt{2}}[1, 1, 0]^T [1, 0, 1]^T = \frac{1}{\sqrt{2}}$

$q_2 = [1, 0, 1]^T - \frac{1}{\sqrt{2}} \cdot \frac{1}{\sqrt{2}}[1, 1, 0]^T = [1, 0, 1]^T - \frac{1}{2}[1, 1, 0]^T = [\frac{1}{2}, -\frac{1}{2}, 1]^T$

$r_{22} = \|q_2\| = \sqrt{\frac{1}{4} + \frac{1}{4} + 1} = \sqrt{\frac{3}{2}} = \frac{\sqrt{6}}{2}$

$q_2 = \frac{2}{\sqrt{6}}[\frac{1}{2}, -\frac{1}{2}, 1]^T = \frac{1}{\sqrt{6}}[1, -1, 2]^T$

**Column 3:**

Start with $q_3 = a_3 = [0, 1, 1]^T$

$r_{13} = q_1^T q_3 = \frac{1}{\sqrt{2}}[1, 1, 0]^T [0, 1, 1]^T = \frac{1}{\sqrt{2}}$

$q_3 = [0, 1, 1]^T - \frac{1}{\sqrt{2}} \cdot \frac{1}{\sqrt{2}}[1, 1, 0]^T = [0, 1, 1]^T - \frac{1}{2}[1, 1, 0]^T = [-\frac{1}{2}, \frac{1}{2}, 1]^T$

$r_{23} = q_2^T q_3 = \frac{1}{\sqrt{6}}[1, -1, 2]^T [-\frac{1}{2}, \frac{1}{2}, 1]^T = \frac{1}{\sqrt{6}}(-\frac{1}{2} - \frac{1}{2} + 2) = \frac{1}{\sqrt{6}}$

$q_3 = [-\frac{1}{2}, \frac{1}{2}, 1]^T - \frac{1}{\sqrt{6}} \cdot \frac{1}{\sqrt{6}}[1, -1, 2]^T = [-\frac{1}{2}, \frac{1}{2}, 1]^T - \frac{1}{6}[1, -1, 2]^T = [-\frac{2}{3}, \frac{2}{3}, \frac{2}{3}]^T$

$r_{33} = \|q_3\| = \sqrt{\frac{4}{9} + \frac{4}{9} + \frac{4}{9}} = \frac{2\sqrt{3}}{3}$

$q_3 = \frac{3}{2\sqrt{3}}[-\frac{2}{3}, \frac{2}{3}, \frac{2}{3}]^T = \frac{1}{\sqrt{3}}[-1, 1, 1]^T$

**Result:**
$$Q = \begin{bmatrix} \frac{1}{\sqrt{2}} & \frac{1}{\sqrt{6}} & -\frac{1}{\sqrt{3}} \\ \frac{1}{\sqrt{2}} & -\frac{1}{\sqrt{6}} & \frac{1}{\sqrt{3}} \\ 0 & \frac{2}{\sqrt{6}} & \frac{1}{\sqrt{3}} \end{bmatrix}, \quad R = \begin{bmatrix} \sqrt{2} & \frac{1}{\sqrt{2}} & \frac{1}{\sqrt{2}} \\ 0 & \frac{\sqrt{6}}{2} & \frac{1}{\sqrt{6}} \\ 0 & 0 & \frac{2\sqrt{3}}{3} \end{bmatrix}$$

## Householder Reflections

Householder reflections provide a more stable alternative to Gram-Schmidt. A Householder reflection is a matrix of the form:
$$H = I - 2vv^T$$

where $v$ is a unit vector ($\|v\| = 1$). This matrix reflects vectors across the hyperplane perpendicular to $v$.

**Properties:**
- $H$ is symmetric and orthogonal: $H^T = H$ and $H^2 = I$
- $H$ can zero out all but the first entry of a vector

To factor $A = QR$, we apply a sequence of Householder reflections $H_1, H_2, \ldots, H_n$ to transform $A$ into upper triangular form:
$$H_n \cdots H_2 H_1 A = R$$

Then $Q = H_1 H_2 \cdots H_n$ (since each $H_i$ is its own inverse).

Householder QR is more stable than Gram-Schmidt and is the standard method in numerical libraries.

## Solving Linear Systems with QR

To solve $Ax = b$ using $A = QR$:

Since $Ax = QRx = b$, multiply both sides by $Q^T$:
$$Rx = Q^T b$$

This is an upper triangular system, solved by back substitution.

**Advantage over LU:** QR is more stable for ill-conditioned matrices because orthogonal transformations don't amplify errors.

## Least Squares Problems

QR factorization is ideal for solving overdetermined systems $Ax \approx b$ (more equations than unknowns) in the least squares sense.

The least squares solution minimizes $\|Ax - b\|^2$. Using $A = QR$:
$$\min_x \|Ax - b\|^2 = \min_x \|QRx - b\|^2 = \min_x \|Rx - Q^T b\|^2$$

(using $\|Qy\| = \|y\|$). The solution is:
$$Rx = Q^T b$$

Solve this upper triangular system by back substitution.

## Key Takeaways

- QR factorization expresses $A = QR$ where $Q$ is orthogonal and $R$ is upper triangular
- Orthogonal matrices have condition number 1, making QR factorization numerically stable
- Modified Gram-Schmidt is more stable than classical Gram-Schmidt due to reorthogonalization
- Householder reflections provide the most stable QR algorithm and are used in practice
- QR factorization is the preferred method for solving least squares problems and overdetermined systems
- The reduced QR factorization ($A = \hat{Q}\hat{R}$ with $\hat{Q}$ being $m \times n$) is more efficient when $m \gg n$
- Computational cost is approximately $2mn^2$ operations for an $m \times n$ matrix

## Common Mistakes

**Using classical Gram-Schmidt in practice:** Classical Gram-Schmidt can lose orthogonality due to rounding errors. Always use modified Gram-Schmidt or Householder reflections for numerical stability. In extreme cases, CGS can produce $Q$ with $\|Q^T Q - I\| \approx 1$, completely losing orthogonality.

**Forgetting to apply Q transpose when solving systems:** When solving $Ax = b$ with QR, you must compute $Q^T b$, not just $Qb$. The equation is $Rx = Q^T b$, and confusing this leads to wrong solutions.

**Not exploiting the reduced QR form:** For tall matrices ($m \gg n$), computing the full $m \times m$ matrix $Q$ wastes computation. Use the reduced form with $\hat{Q}$ being $m \times n$, which contains all the information needed and requires $2mn^2$ instead of $2mn^2 - \frac{2n^3}{3}$ operations.

**Assuming R is always invertible:** If $A$ doesn't have full column rank, the diagonal of $R$ will contain zeros, making it singular. Always check the diagonal entries of $R$ to determine the numerical rank of $A$.

**Computing Q explicitly when not needed:** For solving $Ax = b$, you can apply Householder reflections to both $A$ and $b$ without forming $Q$ explicitly. Forming $Q$ requires additional operations and storage, so avoid it unless you specifically need the matrix $Q$ itself.
