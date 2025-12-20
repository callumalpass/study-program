# Matrix Multiplication Algorithms

Matrix multiplication lies at the heart of modern computing. Every neural network forward pass, every 3D graphics transformation, every scientific simulation involves multiplying matrices. The naive O(n³) algorithm—three nested loops—is simple but slow for large matrices. The quest to improve this bound reveals fascinating algorithmic territory where theory and practice diverge dramatically.

Strassen's 1969 breakthrough proved that O(n³) is not optimal: clever arithmetic reduces the exponent to about 2.807. This was revolutionary—not because it's practically faster (the constants are large), but because it proved improvement is possible. Subsequent theoretical work pushed the exponent toward 2.37, though these algorithms remain impractical. The true lower bound—can we do better than O(n²)?—remains one of computer science's great open problems.

In practice, cache-optimized O(n³) algorithms outperform Strassen for most matrix sizes. Modern libraries like BLAS and cuBLAS achieve near-theoretical peak performance through blocking, vectorization, and parallelism. Understanding both theoretical algorithms (Strassen) and practical optimizations (cache blocking) provides complete perspective on this fundamental computational problem.

## The Standard Algorithm

Multiply two n×n matrices A and B:

```python
def matrix_multiply_naive(A, B):
    n = len(A)
    C = [[0] * n for _ in range(n)]

    for i in range(n):
        for j in range(n):
            for k in range(n):
                C[i][j] += A[i][k] * B[k][j]

    return C
```

**Time**: O(n³)—three nested loops, each runs n times.

**Question**: Can we do better?

## Divide and Conquer Attempt

Partition matrices into quadrants:

```
A = | A11  A12 |    B = | B11  B12 |
    | A21  A22 |        | B21  B22 |

C = A × B = | C11  C12 |
            | C21  C22 |
```

Where:
- C11 = A11×B11 + A12×B21
- C12 = A11×B12 + A12×B22
- C21 = A21×B11 + A22×B21
- C22 = A21×B12 + A22×B22

### Analysis

**Recurrence**: T(n) = 8T(n/2) + O(n²)

- 8 recursive multiplications of (n/2)×(n/2) matrices
- O(n²) additions

**By Master Theorem**: T(n) = O(n^log₂8) = O(n³)

No improvement! Same as naive algorithm.

## Strassen's Algorithm

Key insight: Reduce 8 multiplications to 7 using clever algebra.

### The Seven Products

Define intermediate products:
```
M1 = (A11 + A22)(B11 + B22)
M2 = (A21 + A22)B11
M3 = A11(B12 - B22)
M4 = A22(B21 - B11)
M5 = (A11 + A12)B22
M6 = (A21 - A11)(B11 + B12)
M7 = (A12 - A22)(B21 + B22)
```

### Computing C

```
C11 = M1 + M4 - M5 + M7
C12 = M3 + M5
C21 = M2 + M4
C22 = M1 - M2 + M3 + M6
```

### Implementation

```python
def strassen(A, B):
    n = len(A)

    # Base case
    if n == 1:
        return [[A[0][0] * B[0][0]]]

    # Partition matrices
    mid = n // 2
    A11, A12, A21, A22 = split(A, mid)
    B11, B12, B21, B22 = split(B, mid)

    # Seven products
    M1 = strassen(add(A11, A22), add(B11, B22))
    M2 = strassen(add(A21, A22), B11)
    M3 = strassen(A11, sub(B12, B22))
    M4 = strassen(A22, sub(B21, B11))
    M5 = strassen(add(A11, A12), B22)
    M6 = strassen(sub(A21, A11), add(B11, B12))
    M7 = strassen(sub(A12, A22), add(B21, B22))

    # Combine results
    C11 = add(sub(add(M1, M4), M5), M7)
    C12 = add(M3, M5)
    C21 = add(M2, M4)
    C22 = add(sub(add(M1, M3), M2), M6)

    return combine(C11, C12, C21, C22)
```

### Analysis

**Recurrence**: T(n) = 7T(n/2) + O(n²)

**By Master Theorem**: T(n) = O(n^log₂7) ≈ O(n^2.807)

Asymptotically faster than O(n³)!

### Crossover Point

Strassen has larger constants. For small n, naive is faster.

Typical threshold: n ≈ 32-64

```python
def strassen_practical(A, B, threshold=64):
    if len(A) <= threshold:
        return matrix_multiply_naive(A, B)
    # ... Strassen recursion
```

## Theoretical Advances

### Coppersmith-Winograd and Beyond

| Year | Algorithm | Exponent |
|------|-----------|----------|
| 1969 | Strassen | 2.807 |
| 1978 | Pan | 2.796 |
| 1990 | Coppersmith-Winograd | 2.376 |
| 2014 | Le Gall | 2.3729 |
| 2020 | Recent work | ~2.37 |

**Lower bound**: Ω(n²) (must read all input)

**Gap**: 2.0 to 2.37—closing this gap is a major open problem!

### Why Not Used in Practice?

Theoretical algorithms have problems:
- Enormous hidden constants
- Galactic algorithms—only faster for impossibly large n
- Numerical instability

## Practical Matrix Multiplication

### Cache-Oblivious Algorithm

Block the computation to exploit cache:

```python
def blocked_multiply(A, B, block_size):
    n = len(A)
    C = [[0] * n for _ in range(n)]

    for i in range(0, n, block_size):
        for j in range(0, n, block_size):
            for k in range(0, n, block_size):
                # Multiply blocks
                for ii in range(i, min(i + block_size, n)):
                    for jj in range(j, min(j + block_size, n)):
                        for kk in range(k, min(k + block_size, n)):
                            C[ii][jj] += A[ii][kk] * B[kk][jj]

    return C
```

Same O(n³) operations, but much faster due to cache efficiency.

### BLAS and Libraries

Modern libraries like BLAS, LAPACK, and NumPy use:
- Blocking for cache efficiency
- SIMD vectorization
- Parallel execution
- Strassen for large matrices

```python
import numpy as np

# Highly optimized O(n³) with low constants
C = np.dot(A, B)
```

### GPU Acceleration

GPUs excel at matrix multiplication:
- Thousands of parallel cores
- Optimized memory access patterns
- cuBLAS achieves near-theoretical peak performance

## Applications

### Machine Learning

Neural network training is dominated by matrix operations:
- Forward pass: matrix-vector multiplication
- Backward pass: matrix-matrix multiplication
- Batch operations

### Graphics and Games

Transformations in 3D graphics:
```
point_new = M_projection × M_view × M_model × point
```

Each transformation is 4×4 matrix multiplication.

### Scientific Computing

- Solving linear systems
- Eigenvalue computation
- Signal processing

## Related Problems

### Matrix Chain Multiplication

Optimal order to multiply A₁ × A₂ × ... × Aₙ?

Different orderings have vastly different costs:
- (A × B) × C vs A × (B × C)

Dynamic programming solution: O(n³)

### Sparse Matrix Multiplication

When matrices are mostly zeros:
- CSR/CSC formats
- O(nnz) instead of O(n²) storage
- Faster multiplication for sparse matrices

## Summary

| Algorithm | Time | Practical? |
|-----------|------|------------|
| Naive | O(n³) | Yes |
| Strassen | O(n^2.81) | Large matrices |
| Coppersmith-Winograd | O(n^2.38) | No (constants) |
| Cache-Optimized | O(n³) | Yes, fastest |
| GPU-Accelerated | O(n³) | Yes, massive parallelism |

Matrix multiplication exemplifies the gap between theoretical and practical algorithms. While Strassen's breakthrough proved improvement possible, practical implementations focus on cache efficiency and parallelism rather than reducing the exponent.
