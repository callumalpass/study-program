---
title: "Condition Numbers"
description: "Comprehensive guide to condition numbers with theoretical foundations and Python implementations"
---

# Condition Numbers

## Introduction

When solving linear systems **Ax = b**, small changes in the input data (matrix **A** or vector **b**) can sometimes lead to dramatically different solutions. The **condition number** quantifies this sensitivity, measuring how much the solution can change relative to perturbations in the input. Understanding condition numbers is crucial for assessing the reliability of numerical solutions and detecting ill-conditioned problems that may produce unreliable results.

A matrix with a large condition number is called **ill-conditioned**, meaning the system is sensitive to small changes. Conversely, a matrix with a condition number close to 1 is **well-conditioned** and produces stable, reliable solutions. The condition number serves as a critical diagnostic tool in numerical linear algebra, warning us when computational results may be unreliable due to rounding errors or measurement uncertainties.

## Mathematical Formulation

### Definition

The **condition number** of a non-singular matrix **A** with respect to a matrix norm ||·|| is defined as:

**κ(A) = ||A|| ||A⁻¹||**

This definition captures how much the matrix **A** can amplify errors. The condition number is always greater than or equal to 1 for any consistent matrix norm, and κ(A) = ∞ for singular matrices (since **A⁻¹** doesn't exist).

### Matrix Norms

Different matrix norms lead to different condition numbers. The most commonly used norms include:

**1-norm (column-sum norm):**
||A||₁ = max_j Σᵢ |aᵢⱼ|

The maximum absolute column sum.

**2-norm (spectral norm):**
||A||₂ = √(λ_max(AᵀA))

The square root of the largest eigenvalue of **AᵀA**. For symmetric matrices, this equals the largest absolute eigenvalue.

**Infinity-norm (row-sum norm):**
||A||∞ = max_i Σⱼ |aᵢⱼ|

The maximum absolute row sum.

**Frobenius norm:**
||A||_F = √(Σᵢ Σⱼ aᵢⱼ²)

The square root of the sum of all squared elements.

The 2-norm condition number, κ₂(A), is most commonly used in theoretical analysis. For symmetric positive definite matrices, κ₂(A) = λ_max/λ_min, the ratio of the largest to smallest eigenvalues.

## Relationship to Solution Sensitivity

The condition number directly relates to how perturbations in **A** or **b** affect the solution **x**. Consider the perturbed system:

**(A + δA)(x + δx) = b + δb**

The relative error in the solution is bounded by:

**||δx||/||x|| ≤ κ(A) · (||δA||/||A|| + ||δb||/||b||)**

This fundamental inequality shows that:
- If κ(A) is small (≈ 1), small input errors lead to small output errors
- If κ(A) is large (≫ 1), small input errors can be amplified dramatically
- The condition number represents the worst-case amplification factor

For perturbations only in **b** (i.e., δA = 0):

**||δx||/||x|| ≤ κ(A) · ||δb||/||b||**

This means the relative error in the solution can be up to κ(A) times the relative error in the right-hand side.

## Computing Condition Numbers in Practice

### Direct Computation

The most straightforward approach computes κ(A) = ||A|| ||A⁻¹|| directly:

```python
import numpy as np

def condition_number_direct(A, norm_type=2):
    """
    Compute condition number by direct calculation.

    Parameters:
    -----------
    A : ndarray
        Input matrix
    norm_type : {1, 2, np.inf, 'fro'}
        Norm type to use

    Returns:
    --------
    float
        Condition number
    """
    if A.shape[0] != A.shape[1]:
        raise ValueError("Matrix must be square")

    try:
        A_inv = np.linalg.inv(A)
        norm_A = np.linalg.norm(A, ord=norm_type)
        norm_A_inv = np.linalg.norm(A_inv, ord=norm_type)
        return norm_A * norm_A_inv
    except np.linalg.LinAlgError:
        return np.inf  # Singular matrix
```

However, computing **A⁻¹** explicitly is expensive (O(n³)) and unnecessary. NumPy provides an efficient implementation:

```python
def condition_number_numpy(A, norm_type=None):
    """
    Compute condition number using NumPy's built-in function.

    Parameters:
    -----------
    A : ndarray
        Input matrix
    norm_type : {None, 1, -1, 2, -2, np.inf, -np.inf, 'fro'}
        Norm type (None defaults to 2-norm)

    Returns:
    --------
    float
        Condition number
    """
    return np.linalg.cond(A, p=norm_type)
```

### Estimation Methods

For large matrices, even computing the norm of **A⁻¹** efficiently can be challenging. Estimation algorithms (like LAPACK's RCOND) provide quick approximations without forming **A⁻¹**.

## Worked Examples

### Example 1: Well-Conditioned Matrix

```python
import numpy as np

# Identity matrix - perfectly conditioned
I = np.eye(3)
kappa_I = np.linalg.cond(I)
print(f"Condition number of identity matrix: {kappa_I:.2f}")
# Output: 1.00

# Diagonal matrix with similar eigenvalues
D = np.diag([2.0, 2.5, 3.0])
kappa_D = np.linalg.cond(D)
print(f"Condition number of diagonal matrix: {kappa_D:.2f}")
# Output: 1.50 (ratio of largest to smallest eigenvalue)
```

### Example 2: Ill-Conditioned Matrix

```python
# Hilbert matrix - famously ill-conditioned
def hilbert_matrix(n):
    """Generate n×n Hilbert matrix."""
    H = np.zeros((n, n))
    for i in range(n):
        for j in range(n):
            H[i, j] = 1.0 / (i + j + 1)
    return H

H4 = hilbert_matrix(4)
kappa_H4 = np.linalg.cond(H4)
print(f"Condition number of 4×4 Hilbert matrix: {kappa_H4:.2e}")
# Output: ~1.55e+04

H8 = hilbert_matrix(8)
kappa_H8 = np.linalg.cond(H8)
print(f"Condition number of 8×8 Hilbert matrix: {kappa_H8:.2e}")
# Output: ~1.53e+10 (condition number grows rapidly!)
```

### Example 3: Sensitivity Analysis

```python
# Demonstrate how condition number affects solution accuracy
A_good = np.array([[4.0, 1.0], [1.0, 3.0]])
A_bad = np.array([[1.0, 1.0], [1.0, 1.00001]])

b = np.array([5.0, 4.0])
db = np.array([0.001, 0.001])  # Small perturbation

# Well-conditioned case
x_good = np.linalg.solve(A_good, b)
x_good_perturbed = np.linalg.solve(A_good, b + db)
rel_error_good = np.linalg.norm(x_good_perturbed - x_good) / np.linalg.norm(x_good)
kappa_good = np.linalg.cond(A_good)

print(f"Well-conditioned matrix:")
print(f"  Condition number: {kappa_good:.2f}")
print(f"  Relative error: {rel_error_good:.6f}")

# Ill-conditioned case
x_bad = np.linalg.solve(A_bad, b)
x_bad_perturbed = np.linalg.solve(A_bad, b + db)
rel_error_bad = np.linalg.norm(x_bad_perturbed - x_bad) / np.linalg.norm(x_bad)
kappa_bad = np.linalg.cond(A_bad)

print(f"\nIll-conditioned matrix:")
print(f"  Condition number: {kappa_bad:.2f}")
print(f"  Relative error: {rel_error_bad:.6f}")
```

### Example 4: Condition Number with Different Norms

```python
# Compare condition numbers using different norms
A = np.array([[3.0, 2.0], [2.0, 6.0]])

kappa_1 = np.linalg.cond(A, p=1)
kappa_2 = np.linalg.cond(A, p=2)
kappa_inf = np.linalg.cond(A, p=np.inf)
kappa_fro = np.linalg.cond(A, p='fro')

print(f"1-norm condition number: {kappa_1:.4f}")
print(f"2-norm condition number: {kappa_2:.4f}")
print(f"∞-norm condition number: {kappa_inf:.4f}")
print(f"Frobenius condition number: {kappa_fro:.4f}")
```

## Error Bounds and Loss of Precision

The condition number predicts how many digits of precision may be lost during computation. If we work with machine precision ε ≈ 10⁻¹⁶ (double precision), and κ(A) ≈ 10^k, we can expect to lose approximately k digits of accuracy.

For example:
- κ(A) ≈ 10³: Lose ~3 digits, expect ~13 accurate digits
- κ(A) ≈ 10¹⁰: Lose ~10 digits, expect ~6 accurate digits
- κ(A) ≈ 10¹⁶: Lose all precision, results essentially meaningless

This provides a practical rule of thumb for assessing result reliability.

## Ill-Conditioning Detection and Handling

### Detection Strategies

```python
def check_conditioning(A, threshold=1e10):
    """
    Check if a matrix is ill-conditioned.

    Parameters:
    -----------
    A : ndarray
        Input matrix
    threshold : float
        Condition number threshold for ill-conditioning

    Returns:
    --------
    dict
        Dictionary with conditioning information
    """
    kappa = np.linalg.cond(A)

    if np.isinf(kappa):
        status = "singular"
        severity = "critical"
    elif kappa > threshold:
        status = "ill-conditioned"
        severity = "severe" if kappa > 1e12 else "moderate"
    else:
        status = "well-conditioned"
        severity = "none"

    # Estimate digits of precision loss
    if kappa > 1:
        precision_loss = np.log10(kappa)
    else:
        precision_loss = 0

    return {
        'condition_number': kappa,
        'status': status,
        'severity': severity,
        'estimated_precision_loss': precision_loss
    }

# Example usage
A_test = hilbert_matrix(6)
info = check_conditioning(A_test)
print(f"Status: {info['status']}")
print(f"Condition number: {info['condition_number']:.2e}")
print(f"Estimated precision loss: {info['estimated_precision_loss']:.1f} digits")
```

### Mitigation Strategies

When facing ill-conditioned systems:

1. **Reformulate the problem**: Sometimes the mathematical formulation can be changed to improve conditioning

2. **Use higher precision**: Switch from float64 to float128 or arbitrary precision arithmetic

3. **Regularization**: Add a small multiple of the identity matrix (Tikhonov regularization):
   **(A + λI)x = b**

4. **Preconditioning**: Transform the system to **P⁻¹Ax = P⁻¹b** where **P** is chosen to reduce the condition number

5. **Alternative methods**: Use iterative solvers or specialized algorithms designed for ill-conditioned problems

6. **Problem-specific techniques**: Exploit problem structure (e.g., orthogonalization for least squares)

## Key Takeaways

- The condition number κ(A) = ||A|| ||A⁻¹|| measures sensitivity to input perturbations
- Well-conditioned systems have κ(A) ≈ 1; ill-conditioned systems have κ(A) ≫ 1
- The relative error bound ||δx||/||x|| ≤ κ(A) ||δb||/||b|| shows worst-case error amplification
- Different matrix norms yield different condition numbers; the 2-norm is most common
- Condition number predicts precision loss: κ(A) ≈ 10^k means losing ~k digits
- NumPy's `np.linalg.cond()` efficiently computes condition numbers
- For symmetric positive definite matrices, κ₂(A) equals the ratio of largest to smallest eigenvalues
- Hilbert matrices are classic examples of extremely ill-conditioned matrices
- Always check conditioning before trusting numerical solutions
- Ill-conditioning can be mitigated through reformulation, regularization, or preconditioning

## Common Mistakes

- **Computing A⁻¹ explicitly**: Never actually invert the matrix just to compute the condition number; use `np.linalg.cond()` instead
- **Ignoring condition numbers**: Solving systems without checking κ(A) can lead to meaningless results
- **Confusing singularity and ill-conditioning**: A matrix can be invertible but still ill-conditioned
- **Using wrong norm**: Different norms give different condition numbers; be consistent in your analysis
- **Assuming small residuals mean accurate solutions**: For ill-conditioned systems, ||Ax - b|| can be small even when x is far from the true solution
- **Not considering problem scaling**: Poorly scaled matrices (mixing very large and very small entries) often have large condition numbers
- **Trusting all digits in output**: With κ(A) = 10^10 and double precision, only ~6 digits are reliable
- **Forgetting that κ(A) ≥ 1**: A condition number less than 1 indicates a calculation error
