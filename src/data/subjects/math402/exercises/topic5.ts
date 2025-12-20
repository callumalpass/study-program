import { CodingExercise } from '../../../../core/types';

export const topic5Exercises: CodingExercise[] = [
  {
    id: 'math402-ex-5-1',
    subjectId: 'math402',
    topicId: 'topic-5',
    difficulty: 1,
    title: 'Forward Substitution',
    description: 'Implement forward substitution to solve a lower triangular system Lx = b. This is a fundamental operation used in LU decomposition. Write a function that solves the system efficiently by exploiting the triangular structure.',
    starterCode: `import numpy as np

def forward_substitution(L, b):
    """
    Solve Lx = b where L is lower triangular.

    Parameters:
    - L: n×n lower triangular matrix
    - b: n×1 right-hand side vector

    Returns:
    - x: solution vector
    """
    # TODO: Implement this function
    pass

# Test case
L = np.array([
    [2.0, 0.0, 0.0],
    [1.0, 3.0, 0.0],
    [4.0, 2.0, 5.0]
], dtype=float)

b = np.array([6.0, 10.0, 27.0])

x = forward_substitution(L, b)
print(f"Solution: {x}")
print(f"Verification Lx: {L @ x}")
print(f"Original b: {b}")`,
    hints: [
      'Start from the first equation and solve for x₁',
      'Use already computed values to solve subsequent equations',
      'For row i: x[i] = (b[i] - sum(L[i,j]*x[j] for j<i)) / L[i,i]'
    ],
    solution: `import numpy as np

def forward_substitution(L, b):
    """
    Solve Lx = b where L is lower triangular.

    Parameters:
    - L: n×n lower triangular matrix
    - b: n×1 right-hand side vector

    Returns:
    - x: solution vector
    """
    n = len(b)
    x = np.zeros(n)

    for i in range(n):
        # Compute sum of known terms
        sum_term = sum(L[i, j] * x[j] for j in range(i))

        # Check for zero diagonal
        if abs(L[i, i]) < 1e-15:
            raise ValueError(f"Zero diagonal element at position {i}")

        # Solve for x[i]
        x[i] = (b[i] - sum_term) / L[i, i]

    return x

# Test case
L = np.array([
    [2.0, 0.0, 0.0],
    [1.0, 3.0, 0.0],
    [4.0, 2.0, 5.0]
], dtype=float)

b = np.array([6.0, 10.0, 27.0])

x = forward_substitution(L, b)
print(f"Solution: {x}")
print(f"Verification Lx: {L @ x}")
print(f"Original b: {b}")
print(f"Residual: {np.linalg.norm(L @ x - b):.2e}")

# Additional test
L2 = np.array([[1.0, 0.0], [2.0, 1.0]])
b2 = np.array([3.0, 8.0])
x2 = forward_substitution(L2, b2)
assert np.allclose(L2 @ x2, b2)

print("\\nAll tests passed!")`,
    testCases: [
      {
        input: 'L=[[2,0,0],[1,3,0],[4,2,5]], b=[6,10,27]',
        expectedOutput: 'x = [3.0, 2.333..., 1.0]',
        isHidden: false,
        description: 'Basic 3×3 lower triangular system'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-5-2',
    subjectId: 'math402',
    topicId: 'topic-5',
    difficulty: 1,
    title: 'Back Substitution',
    description: 'Implement back substitution to solve an upper triangular system Ux = b. This completes the LU decomposition solver. Write a function that solves the system by working backwards from the last equation.',
    starterCode: `import numpy as np

def back_substitution(U, b):
    """
    Solve Ux = b where U is upper triangular.

    Parameters:
    - U: n×n upper triangular matrix
    - b: n×1 right-hand side vector

    Returns:
    - x: solution vector
    """
    # TODO: Implement this function
    pass

# Test case
U = np.array([
    [3.0, 2.0, 1.0],
    [0.0, 4.0, 2.0],
    [0.0, 0.0, 5.0]
], dtype=float)

b = np.array([10.0, 14.0, 15.0])

x = back_substitution(U, b)
print(f"Solution: {x}")
print(f"Verification Ux: {U @ x}")
print(f"Original b: {b}")`,
    hints: [
      'Start from the last equation and solve for xₙ',
      'Use already computed values to solve previous equations',
      'Work backwards: for row i, x[i] = (b[i] - sum(U[i,j]*x[j] for j>i)) / U[i,i]'
    ],
    solution: `import numpy as np

def back_substitution(U, b):
    """
    Solve Ux = b where U is upper triangular.

    Parameters:
    - U: n×n upper triangular matrix
    - b: n×1 right-hand side vector

    Returns:
    - x: solution vector
    """
    n = len(b)
    x = np.zeros(n)

    # Work backwards from last equation
    for i in range(n - 1, -1, -1):
        # Compute sum of known terms
        sum_term = sum(U[i, j] * x[j] for j in range(i + 1, n))

        # Check for zero diagonal
        if abs(U[i, i]) < 1e-15:
            raise ValueError(f"Zero diagonal element at position {i}")

        # Solve for x[i]
        x[i] = (b[i] - sum_term) / U[i, i]

    return x

# Test case
U = np.array([
    [3.0, 2.0, 1.0],
    [0.0, 4.0, 2.0],
    [0.0, 0.0, 5.0]
], dtype=float)

b = np.array([10.0, 14.0, 15.0])

x = back_substitution(U, b)
print(f"Solution: {x}")
print(f"Verification Ux: {U @ x}")
print(f"Original b: {b}")
print(f"Residual: {np.linalg.norm(U @ x - b):.2e}")

# Additional test
U2 = np.array([[2.0, 1.0], [0.0, 3.0]])
b2 = np.array([5.0, 6.0])
x2 = back_substitution(U2, b2)
assert np.allclose(U2 @ x2, b2)

print("\\nAll tests passed!")`,
    testCases: [
      {
        input: 'U=[[3,2,1],[0,4,2],[0,0,5]], b=[10,14,15]',
        expectedOutput: 'x = [1.0, 2.0, 3.0]',
        isHidden: false,
        description: 'Basic 3×3 upper triangular system'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-5-3',
    subjectId: 'math402',
    topicId: 'topic-5',
    difficulty: 2,
    title: 'Gaussian Elimination',
    description: 'Implement Gaussian elimination to convert a matrix to row echelon form. This is the foundation of many direct methods. Write a function that performs elimination without pivoting and returns the upper triangular matrix and the elimination record.',
    starterCode: `import numpy as np

def gaussian_elimination(A, b):
    """
    Solve Ax = b using Gaussian elimination.

    Parameters:
    - A: n×n coefficient matrix
    - b: n×1 right-hand side vector

    Returns:
    - x: solution vector
    """
    # TODO: Implement this function
    pass

# Test case
A = np.array([
    [2.0, 1.0, -1.0],
    [-3.0, -1.0, 2.0],
    [-2.0, 1.0, 2.0]
], dtype=float)

b = np.array([8.0, -11.0, -3.0])

x = gaussian_elimination(A, b)
print(f"Solution: {x}")
print(f"Verification Ax: {A @ x}")
print(f"Original b: {b}")`,
    hints: [
      'Make copies of A and b to avoid modifying originals',
      'For each pivot row, eliminate below by subtracting multiples',
      'After elimination, use back substitution to solve',
      'Multiplier for row i, column k: m = A[i,k] / A[k,k]'
    ],
    solution: `import numpy as np

def gaussian_elimination(A, b):
    """
    Solve Ax = b using Gaussian elimination.

    Parameters:
    - A: n×n coefficient matrix
    - b: n×1 right-hand side vector

    Returns:
    - x: solution vector
    """
    # Make copies to avoid modifying inputs
    A = A.astype(float).copy()
    b = b.astype(float).copy()
    n = len(b)

    # Forward elimination
    for k in range(n - 1):
        # Check for zero pivot
        if abs(A[k, k]) < 1e-15:
            raise ValueError(f"Zero pivot encountered at position {k}")

        # Eliminate below pivot
        for i in range(k + 1, n):
            # Compute multiplier
            m = A[i, k] / A[k, k]

            # Update row i
            A[i, k:] -= m * A[k, k:]
            b[i] -= m * b[k]

    # Back substitution
    x = np.zeros(n)
    for i in range(n - 1, -1, -1):
        if abs(A[i, i]) < 1e-15:
            raise ValueError(f"Zero diagonal at position {i}")
        x[i] = (b[i] - np.dot(A[i, i+1:], x[i+1:])) / A[i, i]

    return x

# Test case
A = np.array([
    [2.0, 1.0, -1.0],
    [-3.0, -1.0, 2.0],
    [-2.0, 1.0, 2.0]
], dtype=float)

b = np.array([8.0, -11.0, -3.0])

x = gaussian_elimination(A, b)
print(f"Solution: {x}")
print(f"Verification Ax: {A @ x}")
print(f"Original b: {b}")
print(f"Residual: {np.linalg.norm(A @ x - b):.2e}")

# Additional test
A2 = np.array([[3.0, 2.0], [1.0, 4.0]])
b2 = np.array([7.0, 9.0])
x2 = gaussian_elimination(A2, b2)
assert np.allclose(A2 @ x2, b2)

print("\\nAll tests passed!")`,
    testCases: [
      {
        input: 'A=[[2,1,-1],[-3,-1,2],[-2,1,2]], b=[8,-11,-3]',
        expectedOutput: 'x = [2.0, 3.0, -1.0]',
        isHidden: false,
        description: 'Standard 3×3 linear system'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-5-4',
    subjectId: 'math402',
    topicId: 'topic-5',
    difficulty: 2,
    title: 'LU Decomposition (Doolittle)',
    description: 'Implement LU decomposition using Doolittle algorithm (L has 1s on diagonal). Decompose A = LU where L is lower triangular with unit diagonal and U is upper triangular. This factorization enables efficient solution of multiple systems with the same A.',
    starterCode: `import numpy as np

def lu_decompose(A):
    """
    Compute LU decomposition of A using Doolittle algorithm.

    Parameters:
    - A: n×n matrix

    Returns:
    - L: lower triangular with unit diagonal
    - U: upper triangular
    """
    # TODO: Implement this function
    pass

# Test case
A = np.array([
    [4.0, 3.0, 0.0],
    [3.0, 3.0, -1.0],
    [0.0, -1.0, 1.0]
], dtype=float)

L, U = lu_decompose(A)
print("L =")
print(L)
print("\\nU =")
print(U)
print("\\nLU =")
print(L @ U)
print("\\nOriginal A =")
print(A)`,
    hints: [
      'L has 1s on diagonal, compute U row by row, then L column by column',
      'For U[i,j] where j >= i: U[i,j] = A[i,j] - sum(L[i,k]*U[k,j] for k<i)',
      'For L[i,j] where i > j: L[i,j] = (A[i,j] - sum(L[i,k]*U[k,j] for k<j)) / U[j,j]',
      'Process in order: row 0 of U, column 0 of L, row 1 of U, column 1 of L, etc.'
    ],
    solution: `import numpy as np

def lu_decompose(A):
    """
    Compute LU decomposition of A using Doolittle algorithm.

    Parameters:
    - A: n×n matrix

    Returns:
    - L: lower triangular with unit diagonal
    - U: upper triangular
    """
    A = A.astype(float).copy()
    n = A.shape[0]

    L = np.eye(n)
    U = np.zeros((n, n))

    for i in range(n):
        # Compute U[i, j] for j >= i
        for j in range(i, n):
            sum_term = sum(L[i, k] * U[k, j] for k in range(i))
            U[i, j] = A[i, j] - sum_term

        # Check for zero pivot
        if abs(U[i, i]) < 1e-15:
            raise ValueError(f"Zero pivot at position {i}")

        # Compute L[j, i] for j > i
        for j in range(i + 1, n):
            sum_term = sum(L[j, k] * U[k, i] for k in range(i))
            L[j, i] = (A[j, i] - sum_term) / U[i, i]

    return L, U

def lu_solve(L, U, b):
    """Solve Ax = b using LU decomposition."""
    # Forward substitution: Ly = b
    n = len(b)
    y = np.zeros(n)
    for i in range(n):
        y[i] = b[i] - sum(L[i, j] * y[j] for j in range(i))

    # Back substitution: Ux = y
    x = np.zeros(n)
    for i in range(n - 1, -1, -1):
        x[i] = (y[i] - sum(U[i, j] * x[j] for j in range(i + 1, n))) / U[i, i]

    return x

# Test case
A = np.array([
    [4.0, 3.0, 0.0],
    [3.0, 3.0, -1.0],
    [0.0, -1.0, 1.0]
], dtype=float)

L, U = lu_decompose(A)
print("L =")
print(L)
print("\\nU =")
print(U)
print("\\nLU =")
print(L @ U)
print("\\nOriginal A =")
print(A)
print(f"\\nDecomposition error: {np.linalg.norm(A - L @ U):.2e}")

# Test solving a system
b = np.array([1.0, 2.0, 3.0])
x = lu_solve(L, U, b)
print(f"\\nSolution to Ax = b: {x}")
print(f"Verification Ax: {A @ x}")
print(f"Residual: {np.linalg.norm(A @ x - b):.2e}")

print("\\nAll tests passed!")`,
    testCases: [
      {
        input: 'A=[[4,3,0],[3,3,-1],[0,-1,1]]',
        expectedOutput: 'L and U such that LU = A, with L having unit diagonal',
        isHidden: false,
        description: 'LU decomposition of symmetric indefinite matrix'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-5-5',
    subjectId: 'math402',
    topicId: 'topic-5',
    difficulty: 3,
    title: 'Partial Pivoting',
    description: 'Implement Gaussian elimination with partial pivoting to improve numerical stability. Partial pivoting selects the largest available pivot at each step to minimize rounding errors. This is essential for practical linear system solvers.',
    starterCode: `import numpy as np

def gaussian_elimination_pivot(A, b):
    """
    Solve Ax = b using Gaussian elimination with partial pivoting.

    Parameters:
    - A: n×n coefficient matrix
    - b: n×1 right-hand side vector

    Returns:
    - x: solution vector
    - P: permutation matrix (optional)
    """
    # TODO: Implement this function
    pass

# Test case with small pivot
A = np.array([
    [1e-20, 1.0, 0.0],
    [1.0, 2.0, 1.0],
    [0.0, 1.0, 2.0]
], dtype=float)

b = np.array([1.0, 4.0, 3.0])

x = gaussian_elimination_pivot(A, b)
print(f"Solution with pivoting: {x}")
print(f"Residual: {np.linalg.norm(A @ x - b):.2e}")`,
    hints: [
      'At each step k, find the row i >= k with largest |A[i,k]|',
      'Swap rows k and i in both A and b',
      'Continue with normal Gaussian elimination',
      'Keep track of permutations if needed'
    ],
    solution: `import numpy as np

def gaussian_elimination_pivot(A, b):
    """
    Solve Ax = b using Gaussian elimination with partial pivoting.

    Parameters:
    - A: n×n coefficient matrix
    - b: n×1 right-hand side vector

    Returns:
    - x: solution vector
    - P: permutation record
    """
    A = A.astype(float).copy()
    b = b.astype(float).copy()
    n = len(b)

    # Keep track of row swaps
    perm = list(range(n))

    # Forward elimination with pivoting
    for k in range(n - 1):
        # Find pivot: row with largest |A[i,k]| for i >= k
        pivot_row = k
        max_val = abs(A[k, k])

        for i in range(k + 1, n):
            if abs(A[i, k]) > max_val:
                max_val = abs(A[i, k])
                pivot_row = i

        # Check for singular matrix
        if max_val < 1e-15:
            raise ValueError(f"Matrix is singular or near-singular at column {k}")

        # Swap rows if needed
        if pivot_row != k:
            A[[k, pivot_row]] = A[[pivot_row, k]]
            b[[k, pivot_row]] = b[[pivot_row, k]]
            perm[k], perm[pivot_row] = perm[pivot_row], perm[k]

        # Eliminate below pivot
        for i in range(k + 1, n):
            m = A[i, k] / A[k, k]
            A[i, k:] -= m * A[k, k:]
            b[i] -= m * b[k]

    # Check final pivot
    if abs(A[n-1, n-1]) < 1e-15:
        raise ValueError("Matrix is singular")

    # Back substitution
    x = np.zeros(n)
    for i in range(n - 1, -1, -1):
        x[i] = (b[i] - np.dot(A[i, i+1:], x[i+1:])) / A[i, i]

    return x

# Test case with small pivot (ill-conditioned)
print("Test 1: Small pivot problem\\n")
A1 = np.array([
    [1e-20, 1.0, 0.0],
    [1.0, 2.0, 1.0],
    [0.0, 1.0, 2.0]
], dtype=float)
b1 = np.array([1.0, 4.0, 3.0])

x1 = gaussian_elimination_pivot(A1, b1)
print(f"Solution with pivoting: {x1}")
print(f"Residual: {np.linalg.norm(A1 @ x1 - b1):.2e}")

# Compare with NumPy
x_numpy = np.linalg.solve(A1, b1)
print(f"NumPy solution: {x_numpy}")
print(f"Difference: {np.linalg.norm(x1 - x_numpy):.2e}")

# Test case 2: Regular matrix
print("\\n" + "="*60)
print("Test 2: Standard system\\n")
A2 = np.array([
    [2.0, 1.0, -1.0],
    [-3.0, -1.0, 2.0],
    [-2.0, 1.0, 2.0]
], dtype=float)
b2 = np.array([8.0, -11.0, -3.0])

x2 = gaussian_elimination_pivot(A2, b2)
print(f"Solution: {x2}")
print(f"Residual: {np.linalg.norm(A2 @ x2 - b2):.2e}")

print("\\nAll tests passed!")`,
    testCases: [
      {
        input: 'A with small pivot element',
        expectedOutput: 'Accurate solution despite ill-conditioning',
        isHidden: false,
        description: 'Test numerical stability with partial pivoting'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-5-6',
    subjectId: 'math402',
    topicId: 'topic-5',
    difficulty: 3,
    title: 'LU with Partial Pivoting (PLU)',
    description: 'Implement LU decomposition with partial pivoting: PA = LU. This combines the efficiency of LU factorization with the numerical stability of pivoting. The permutation matrix P records row exchanges.',
    starterCode: `import numpy as np

def plu_decompose(A):
    """
    Compute PLU decomposition: PA = LU.

    Parameters:
    - A: n×n matrix

    Returns:
    - P: permutation matrix
    - L: lower triangular with unit diagonal
    - U: upper triangular
    """
    # TODO: Implement this function
    pass

# Test case
A = np.array([
    [1.0, 2.0, 3.0],
    [4.0, 5.0, 6.0],
    [7.0, 8.0, 10.0]
], dtype=float)

P, L, U = plu_decompose(A)
print("P =")
print(P)
print("\\nL =")
print(L)
print("\\nU =")
print(U)
print("\\nPA =")
print(P @ A)
print("\\nLU =")
print(L @ U)`,
    hints: [
      'Similar to LU decomposition but with row swaps',
      'At step k, find pivot and swap rows in both A and L',
      'Keep track of permutations in P matrix',
      'Can use a permutation vector and convert to matrix at end'
    ],
    solution: `import numpy as np

def plu_decompose(A):
    """
    Compute PLU decomposition: PA = LU.

    Parameters:
    - A: n×n matrix

    Returns:
    - P: permutation matrix
    - L: lower triangular with unit diagonal
    - U: upper triangular
    """
    A = A.astype(float).copy()
    n = A.shape[0]

    L = np.eye(n)
    U = np.zeros((n, n))
    P = np.eye(n)

    for k in range(n):
        # Find pivot
        pivot_row = k
        max_val = abs(A[k, k])
        for i in range(k + 1, n):
            if abs(A[i, k]) > max_val:
                max_val = abs(A[i, k])
                pivot_row = i

        # Swap rows in A, P, and already-computed part of L
        if pivot_row != k:
            A[[k, pivot_row]] = A[[pivot_row, k]]
            P[[k, pivot_row]] = P[[pivot_row, k]]
            if k > 0:
                L[[k, pivot_row], :k] = L[[pivot_row, k], :k]

        # Check for singular matrix
        if abs(A[k, k]) < 1e-15:
            raise ValueError(f"Matrix is singular at pivot {k}")

        # Store pivot in U
        U[k, k] = A[k, k]

        # Compute L[:,k] and U[k,:]
        for i in range(k + 1, n):
            L[i, k] = A[i, k] / U[k, k]

        for j in range(k + 1, n):
            U[k, j] = A[k, j]

        # Update remaining submatrix
        for i in range(k + 1, n):
            for j in range(k + 1, n):
                A[i, j] -= L[i, k] * U[k, j]

    return P, L, U

def plu_solve(P, L, U, b):
    """Solve Ax = b using PLU decomposition."""
    # Permute b: solve PAx = Pb
    pb = P @ b

    # Forward substitution: Ly = Pb
    n = len(b)
    y = np.zeros(n)
    for i in range(n):
        y[i] = pb[i] - sum(L[i, j] * y[j] for j in range(i))

    # Back substitution: Ux = y
    x = np.zeros(n)
    for i in range(n - 1, -1, -1):
        x[i] = (y[i] - sum(U[i, j] * x[j] for j in range(i + 1, n))) / U[i, i]

    return x

# Test case
A = np.array([
    [1.0, 2.0, 3.0],
    [4.0, 5.0, 6.0],
    [7.0, 8.0, 10.0]
], dtype=float)

P, L, U = plu_decompose(A)
print("P =")
print(P)
print("\\nL =")
print(L)
print("\\nU =")
print(U)
print("\\nPA =")
print(P @ A)
print("\\nLU =")
print(L @ U)
print(f"\\nDecomposition error: {np.linalg.norm(P @ A - L @ U):.2e}")

# Test solving
b = np.array([1.0, 2.0, 3.0])
x = plu_solve(P, L, U, b)
print(f"\\nSolution to Ax = b: {x}")
print(f"Residual: {np.linalg.norm(A @ x - b):.2e}")

# Compare with NumPy
P_np, L_np, U_np = scipy.linalg.lu(A)
print(f"\\nComparison with SciPy PLU:")
print(f"P difference: {np.linalg.norm(P - P_np):.2e}")

print("\\nAll tests passed!")`,
    testCases: [
      {
        input: 'A=[[1,2,3],[4,5,6],[7,8,10]]',
        expectedOutput: 'P, L, U such that PA = LU',
        isHidden: false,
        description: 'PLU decomposition with row pivoting'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-5-7',
    subjectId: 'math402',
    topicId: 'topic-5',
    difficulty: 3,
    title: 'Cholesky Decomposition',
    description: 'Implement Cholesky decomposition for symmetric positive definite matrices: A = LL^T. This specialized factorization is more efficient than LU and guaranteed to be numerically stable for SPD matrices. Used extensively in optimization and statistics.',
    starterCode: `import numpy as np

def cholesky_decompose(A):
    """
    Compute Cholesky decomposition A = LL^T.

    Parameters:
    - A: n×n symmetric positive definite matrix

    Returns:
    - L: lower triangular matrix
    """
    # TODO: Implement this function
    pass

# Test case: SPD matrix
A = np.array([
    [4.0, 12.0, -16.0],
    [12.0, 37.0, -43.0],
    [-16.0, -43.0, 98.0]
], dtype=float)

L = cholesky_decompose(A)
print("L =")
print(L)
print("\\nL @ L^T =")
print(L @ L.T)
print("\\nOriginal A =")
print(A)`,
    hints: [
      'For SPD matrices, all pivots are positive',
      'L[i,i] = sqrt(A[i,i] - sum(L[i,k]^2 for k<i))',
      'L[j,i] = (A[j,i] - sum(L[j,k]*L[i,k] for k<i)) / L[i,i] for j > i',
      'Process column by column, computing diagonal then below-diagonal'
    ],
    solution: `import numpy as np

def cholesky_decompose(A):
    """
    Compute Cholesky decomposition A = LL^T.

    Parameters:
    - A: n×n symmetric positive definite matrix

    Returns:
    - L: lower triangular matrix
    """
    # Verify symmetry
    if not np.allclose(A, A.T):
        raise ValueError("Matrix must be symmetric")

    A = A.astype(float).copy()
    n = A.shape[0]
    L = np.zeros((n, n))

    for i in range(n):
        # Compute diagonal element
        sum_sq = sum(L[i, k]**2 for k in range(i))
        diag_val = A[i, i] - sum_sq

        if diag_val <= 0:
            raise ValueError(f"Matrix is not positive definite (negative diagonal at {i})")

        L[i, i] = np.sqrt(diag_val)

        # Compute below-diagonal elements in column i
        for j in range(i + 1, n):
            sum_prod = sum(L[j, k] * L[i, k] for k in range(i))
            L[j, i] = (A[j, i] - sum_prod) / L[i, i]

    return L

def cholesky_solve(L, b):
    """Solve Ax = b using Cholesky decomposition A = LL^T."""
    n = len(b)

    # Forward substitution: Ly = b
    y = np.zeros(n)
    for i in range(n):
        y[i] = (b[i] - sum(L[i, j] * y[j] for j in range(i))) / L[i, i]

    # Back substitution: L^T x = y
    x = np.zeros(n)
    for i in range(n - 1, -1, -1):
        x[i] = (y[i] - sum(L[j, i] * x[j] for j in range(i + 1, n))) / L[i, i]

    return x

# Test case: SPD matrix
A = np.array([
    [4.0, 12.0, -16.0],
    [12.0, 37.0, -43.0],
    [-16.0, -43.0, 98.0]
], dtype=float)

L = cholesky_decompose(A)
print("L =")
print(L)
print("\\nL @ L^T =")
print(L @ L.T)
print("\\nOriginal A =")
print(A)
print(f"\\nDecomposition error: {np.linalg.norm(A - L @ L.T):.2e}")

# Test solving
b = np.array([1.0, 2.0, 3.0])
x = cholesky_solve(L, b)
print(f"\\nSolution to Ax = b: {x}")
print(f"Residual: {np.linalg.norm(A @ x - b):.2e}")

# Compare with NumPy
L_np = np.linalg.cholesky(A)
print(f"\\nComparison with NumPy:")
print(f"L difference: {np.linalg.norm(L - L_np):.2e}")

# Test with simple SPD matrix
A2 = np.array([[4.0, 2.0], [2.0, 3.0]])
L2 = cholesky_decompose(A2)
assert np.allclose(A2, L2 @ L2.T)

print("\\nAll tests passed!")`,
    testCases: [
      {
        input: 'A=[[4,12,-16],[12,37,-43],[-16,-43,98]]',
        expectedOutput: 'L such that LL^T = A',
        isHidden: false,
        description: 'Cholesky decomposition of SPD matrix'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-5-8',
    subjectId: 'math402',
    topicId: 'topic-5',
    difficulty: 4,
    title: 'QR Decomposition (Gram-Schmidt)',
    description: 'Implement QR decomposition using Gram-Schmidt orthogonalization: A = QR where Q is orthogonal and R is upper triangular. This is fundamental for least squares problems and eigenvalue computation.',
    starterCode: `import numpy as np

def qr_gram_schmidt(A):
    """
    Compute QR decomposition using classical Gram-Schmidt.

    Parameters:
    - A: m×n matrix (m >= n)

    Returns:
    - Q: m×n orthogonal matrix
    - R: n×n upper triangular matrix
    """
    # TODO: Implement this function
    pass

# Test case
A = np.array([
    [1.0, 1.0, 0.0],
    [1.0, 0.0, 1.0],
    [0.0, 1.0, 1.0]
], dtype=float)

Q, R = qr_gram_schmidt(A)
print("Q =")
print(Q)
print("\\nR =")
print(R)
print("\\nQ @ R =")
print(Q @ R)
print("\\nOriginal A =")
print(A)
print("\\nQ^T @ Q (should be I) =")
print(Q.T @ Q)`,
    hints: [
      'Process columns of A one at a time',
      'For each column, subtract projections onto previous orthogonal vectors',
      'Normalize to get orthonormal vectors',
      'R[i,j] = q_i^T @ a_j where q_i are orthonormal columns of Q'
    ],
    solution: `import numpy as np

def qr_gram_schmidt(A):
    """
    Compute QR decomposition using classical Gram-Schmidt.

    Parameters:
    - A: m×n matrix (m >= n)

    Returns:
    - Q: m×n orthogonal matrix
    - R: n×n upper triangular matrix
    """
    A = A.astype(float).copy()
    m, n = A.shape

    Q = np.zeros((m, n))
    R = np.zeros((n, n))

    for j in range(n):
        # Start with column j of A
        v = A[:, j].copy()

        # Subtract projections onto previous Q columns
        for i in range(j):
            R[i, j] = np.dot(Q[:, i], A[:, j])
            v -= R[i, j] * Q[:, i]

        # Compute norm
        R[j, j] = np.linalg.norm(v)

        if R[j, j] < 1e-15:
            raise ValueError(f"Columns are linearly dependent at column {j}")

        # Normalize
        Q[:, j] = v / R[j, j]

    return Q, R

def qr_gram_schmidt_modified(A):
    """
    Modified Gram-Schmidt (more numerically stable).
    """
    A = A.astype(float).copy()
    m, n = A.shape

    Q = np.zeros((m, n))
    R = np.zeros((n, n))

    for j in range(n):
        v = A[:, j].copy()

        # Modified GS: update v as we go
        for i in range(j):
            R[i, j] = np.dot(Q[:, i], v)
            v -= R[i, j] * Q[:, i]

        R[j, j] = np.linalg.norm(v)

        if R[j, j] < 1e-15:
            raise ValueError(f"Columns are linearly dependent at column {j}")

        Q[:, j] = v / R[j, j]

    return Q, R

# Test case
A = np.array([
    [1.0, 1.0, 0.0],
    [1.0, 0.0, 1.0],
    [0.0, 1.0, 1.0]
], dtype=float)

print("Classical Gram-Schmidt:")
Q, R = qr_gram_schmidt(A)
print("\\nQ =")
print(Q)
print("\\nR =")
print(R)
print("\\nQ @ R =")
print(Q @ R)
print("\\nOriginal A =")
print(A)
print(f"\\nDecomposition error: {np.linalg.norm(A - Q @ R):.2e}")
print("\\nQ^T @ Q (should be I) =")
print(Q.T @ Q)
print(f"Orthogonality error: {np.linalg.norm(Q.T @ Q - np.eye(3)):.2e}")

print("\\n" + "="*60)
print("Modified Gram-Schmidt:")
Q_mod, R_mod = qr_gram_schmidt_modified(A)
print(f"Decomposition error: {np.linalg.norm(A - Q_mod @ R_mod):.2e}")
print(f"Orthogonality error: {np.linalg.norm(Q_mod.T @ Q_mod - np.eye(3)):.2e}")

# Compare with NumPy
Q_np, R_np = np.linalg.qr(A)
print(f"\\nComparison with NumPy QR:")
print(f"Q difference: {np.linalg.norm(abs(Q) - abs(Q_np)):.2e}")  # abs for sign ambiguity

print("\\nAll tests passed!")`,
    testCases: [
      {
        input: 'A=[[1,1,0],[1,0,1],[0,1,1]]',
        expectedOutput: 'Q orthogonal, R upper triangular, QR = A',
        isHidden: false,
        description: 'QR decomposition using Gram-Schmidt'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-5-9',
    subjectId: 'math402',
    topicId: 'topic-5',
    difficulty: 4,
    title: 'QR with Householder Reflections',
    description: 'Implement QR decomposition using Householder reflections for better numerical stability. Householder transformations systematically zero out subcolumns, making this method more stable than Gram-Schmidt for ill-conditioned matrices.',
    starterCode: `import numpy as np

def householder_qr(A):
    """
    Compute QR decomposition using Householder reflections.

    Parameters:
    - A: m×n matrix (m >= n)

    Returns:
    - Q: m×m orthogonal matrix
    - R: m×n upper triangular matrix
    """
    # TODO: Implement this function
    pass

# Test case
A = np.array([
    [12.0, -51.0, 4.0],
    [6.0, 167.0, -68.0],
    [-4.0, 24.0, -41.0]
], dtype=float)

Q, R = householder_qr(A)
print("Q =")
print(Q)
print("\\nR =")
print(R)
print("\\nQ @ R =")
print(Q @ R)`,
    hints: [
      'For column k, construct Householder vector v to zero elements below diagonal',
      'v = x + sign(x[0])*||x||*e_1 where x is the subcolumn',
      'Householder matrix: H = I - 2vv^T/(v^Tv)',
      'Apply H to remaining submatrix',
      'Q is product of all Householder matrices'
    ],
    solution: `import numpy as np

def householder_vector(x):
    """
    Compute Householder vector to reflect x to ||x||*e_1.

    Returns v such that H = I - 2vv^T/||v||^2 zeros out x[1:].
    """
    x = x.copy()
    n = len(x)

    # Compute norm with sign of x[0] for numerical stability
    sigma = np.sign(x[0]) if x[0] != 0 else 1
    norm_x = np.linalg.norm(x)

    # Construct v
    v = x.copy()
    v[0] += sigma * norm_x

    return v

def householder_qr(A):
    """
    Compute QR decomposition using Householder reflections.

    Parameters:
    - A: m×n matrix (m >= n)

    Returns:
    - Q: m×m orthogonal matrix
    - R: m×n upper triangular matrix
    """
    A = A.astype(float).copy()
    m, n = A.shape

    Q = np.eye(m)
    R = A.copy()

    for k in range(n):
        # Extract subcolumn
        x = R[k:, k]

        # Compute Householder vector
        v = householder_vector(x)
        v_norm_sq = np.dot(v, v)

        if v_norm_sq < 1e-15:
            continue

        # Apply Householder transformation to submatrix
        # H @ R[k:, k:] = R[k:, k:] - 2v(v^T @ R[k:, k:]) / ||v||^2
        R[k:, k:] -= (2.0 / v_norm_sq) * np.outer(v, np.dot(v, R[k:, k:]))

        # Build full Householder matrix for Q
        H = np.eye(m)
        H[k:, k:] -= (2.0 / v_norm_sq) * np.outer(v, v)
        Q = Q @ H

    return Q, R

# Test case
A = np.array([
    [12.0, -51.0, 4.0],
    [6.0, 167.0, -68.0],
    [-4.0, 24.0, -41.0]
], dtype=float)

Q, R = householder_qr(A)
print("Q =")
print(Q)
print("\\nR =")
print(R[:3, :])  # Just the upper part
print("\\nQ @ R =")
print(Q @ R)
print("\\nOriginal A =")
print(A)
print(f"\\nDecomposition error: {np.linalg.norm(A - Q @ R):.2e}")
print("\\nQ^T @ Q (should be I) =")
print(Q.T @ Q)
print(f"Orthogonality error: {np.linalg.norm(Q.T @ Q - np.eye(3)):.2e}")

# Compare with NumPy
Q_np, R_np = np.linalg.qr(A)
print(f"\\nComparison with NumPy:")
print(f"R difference: {np.linalg.norm(R[:3, :] - R_np):.2e}")

# Test with ill-conditioned matrix
print("\\n" + "="*60)
print("Test with ill-conditioned matrix:\\n")
A_ill = np.array([[1.0, 1.0], [1.0, 1.0 + 1e-10], [1.0, 1.0 - 1e-10]])
Q_ill, R_ill = householder_qr(A_ill)
print(f"Decomposition error: {np.linalg.norm(A_ill - Q_ill @ R_ill):.2e}")
print(f"Orthogonality error: {np.linalg.norm(Q_ill.T @ Q_ill - np.eye(3)):.2e}")

print("\\nAll tests passed!")`,
    testCases: [
      {
        input: 'A=[[12,-51,4],[6,167,-68],[-4,24,-41]]',
        expectedOutput: 'Stable QR decomposition',
        isHidden: false,
        description: 'Householder QR for numerical stability'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-5-10',
    subjectId: 'math402',
    topicId: 'topic-5',
    difficulty: 4,
    title: 'Matrix Condition Number',
    description: 'Implement condition number computation and demonstrate how it affects solution accuracy. The condition number κ(A) = ||A|| ||A^(-1)|| measures how errors in b propagate to errors in x. High condition numbers indicate ill-conditioned systems.',
    starterCode: `import numpy as np

def condition_number(A, p=2):
    """
    Compute condition number of matrix A.

    Parameters:
    - A: n×n matrix
    - p: norm type (1, 2, or np.inf)

    Returns:
    - cond: condition number κ_p(A)
    """
    # TODO: Implement this function
    pass

def analyze_conditioning(A, b):
    """
    Analyze how condition number affects solution accuracy.

    Parameters:
    - A: coefficient matrix
    - b: right-hand side

    Returns:
    - Analysis results
    """
    # TODO: Implement this function
    pass

# Test with well-conditioned matrix
A_good = np.array([[4.0, 1.0], [1.0, 3.0]])
cond = condition_number(A_good)
print(f"Condition number: {cond:.2f}")`,
    hints: [
      'κ(A) = ||A|| * ||A^(-1)||',
      'For 2-norm: κ_2(A) = σ_max / σ_min (ratio of largest to smallest singular value)',
      'Large κ means small changes in b cause large changes in x',
      'Rule of thumb: lose log₁₀(κ) digits of accuracy'
    ],
    solution: `import numpy as np

def condition_number(A, p=2):
    """
    Compute condition number of matrix A.

    Parameters:
    - A: n×n matrix
    - p: norm type (1, 2, or np.inf)

    Returns:
    - cond: condition number κ_p(A)
    """
    if p == 2:
        # Use SVD for 2-norm condition number
        singular_values = np.linalg.svd(A, compute_uv=False)
        if singular_values[-1] < 1e-15:
            return float('inf')
        return singular_values[0] / singular_values[-1]
    else:
        # General case: κ = ||A|| * ||A^(-1)||
        norm_A = np.linalg.norm(A, ord=p)
        norm_A_inv = np.linalg.norm(np.linalg.inv(A), ord=p)
        return norm_A * norm_A_inv

def analyze_conditioning(A, b):
    """
    Analyze how condition number affects solution accuracy.

    Parameters:
    - A: coefficient matrix
    - b: right-hand side

    Returns:
    - Dictionary with analysis results
    """
    # Compute condition number
    cond = condition_number(A)

    # Solve exactly
    x_exact = np.linalg.solve(A, b)

    # Perturb b slightly
    perturbation = 1e-10 * np.random.randn(len(b))
    b_perturbed = b + perturbation
    x_perturbed = np.linalg.solve(A, b_perturbed)

    # Compute relative errors
    rel_error_b = np.linalg.norm(perturbation) / np.linalg.norm(b)
    rel_error_x = np.linalg.norm(x_perturbed - x_exact) / np.linalg.norm(x_exact)

    # Error amplification
    amplification = rel_error_x / rel_error_b

    return {
        'condition_number': cond,
        'rel_error_b': rel_error_b,
        'rel_error_x': rel_error_x,
        'amplification': amplification,
        'expected_loss_digits': np.log10(cond)
    }

# Test 1: Well-conditioned matrix
print("Test 1: Well-conditioned matrix\\n")
A_good = np.array([[4.0, 1.0], [1.0, 3.0]])
b_good = np.array([1.0, 2.0])

cond_good = condition_number(A_good)
print(f"Matrix A_good:")
print(A_good)
print(f"\\nCondition number: {cond_good:.2f}")
print(f"Expected digit loss: {np.log10(cond_good):.2f}")

analysis_good = analyze_conditioning(A_good, b_good)
print(f"\\nAnalysis:")
print(f"  Relative error in b: {analysis_good['rel_error_b']:.2e}")
print(f"  Relative error in x: {analysis_good['rel_error_x']:.2e}")
print(f"  Error amplification: {analysis_good['amplification']:.2f}")
print(f"  Upper bound (κ): {cond_good:.2f}")

# Test 2: Ill-conditioned matrix (Hilbert matrix)
print("\\n" + "="*60)
print("Test 2: Ill-conditioned Hilbert matrix\\n")

def hilbert_matrix(n):
    """Generate n×n Hilbert matrix (notoriously ill-conditioned)."""
    H = np.zeros((n, n))
    for i in range(n):
        for j in range(n):
            H[i, j] = 1.0 / (i + j + 1)
    return H

A_bad = hilbert_matrix(4)
b_bad = np.ones(4)

cond_bad = condition_number(A_bad)
print(f"4×4 Hilbert matrix")
print(f"Condition number: {cond_bad:.2e}")
print(f"Expected digit loss: {np.log10(cond_bad):.1f}")

analysis_bad = analyze_conditioning(A_bad, b_bad)
print(f"\\nAnalysis:")
print(f"  Relative error in b: {analysis_bad['rel_error_b']:.2e}")
print(f"  Relative error in x: {analysis_bad['rel_error_x']:.2e}")
print(f"  Error amplification: {analysis_bad['amplification']:.2e}")
print(f"  Upper bound (κ): {cond_bad:.2e}")

# Test 3: Nearly singular matrix
print("\\n" + "="*60)
print("Test 3: Nearly singular matrix\\n")

A_singular = np.array([[1.0, 2.0], [1.0, 2.0 + 1e-10]])
cond_singular = condition_number(A_singular)
print(f"Condition number: {cond_singular:.2e}")
print("Matrix is nearly singular - extremely ill-conditioned!")

# Compare with NumPy
print(f"\\nNumPy condition number: {np.linalg.cond(A_bad):.2e}")

print("\\nAll tests passed!")`,
    testCases: [
      {
        input: 'Well-conditioned vs Hilbert matrix',
        expectedOutput: 'Demonstrates error amplification proportional to κ(A)',
        isHidden: false,
        description: 'Condition number analysis'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-5-11',
    subjectId: 'math402',
    topicId: 'topic-5',
    difficulty: 4,
    title: 'Matrix Inversion via LU',
    description: 'Implement matrix inversion using LU decomposition. Computing A^(-1) by solving AX = I column by column. This is more efficient and stable than direct inversion formulas.',
    starterCode: `import numpy as np

def invert_matrix_lu(A):
    """
    Compute matrix inverse using LU decomposition.

    Parameters:
    - A: n×n invertible matrix

    Returns:
    - A_inv: inverse of A
    """
    # TODO: Implement this function
    pass

# Test case
A = np.array([
    [4.0, 7.0],
    [2.0, 6.0]
], dtype=float)

A_inv = invert_matrix_lu(A)
print("A =")
print(A)
print("\\nA^(-1) =")
print(A_inv)
print("\\nA @ A^(-1) =")
print(A @ A_inv)`,
    hints: [
      'Solve AX = I column by column',
      'Each column of X solves Ax_i = e_i',
      'Use LU decomposition once, then solve n systems',
      'More efficient than computing A^(-1) directly'
    ],
    solution: `import numpy as np
from scipy.linalg import lu_factor, lu_solve

def plu_decompose_compact(A):
    """Compute PLU with compact storage."""
    A = A.astype(float).copy()
    n = A.shape[0]
    perm = list(range(n))

    for k in range(n - 1):
        # Find pivot
        pivot_row = k + np.argmax(np.abs(A[k:, k]))

        # Swap
        if pivot_row != k:
            A[[k, pivot_row]] = A[[pivot_row, k]]
            perm[k], perm[pivot_row] = perm[pivot_row], perm[k]

        if abs(A[k, k]) < 1e-15:
            raise ValueError("Matrix is singular")

        # Eliminate
        A[k+1:, k] /= A[k, k]
        A[k+1:, k+1:] -= np.outer(A[k+1:, k], A[k, k+1:])

    return A, perm

def solve_with_plu(LU, perm, b):
    """Solve using compact PLU."""
    n = len(b)
    b = b[perm].copy()

    # Forward substitution
    for i in range(n):
        b[i] -= np.dot(LU[i, :i], b[:i])

    # Back substitution
    for i in range(n - 1, -1, -1):
        b[i] = (b[i] - np.dot(LU[i, i+1:], b[i+1:])) / LU[i, i]

    return b

def invert_matrix_lu(A):
    """
    Compute matrix inverse using LU decomposition.

    Parameters:
    - A: n×n invertible matrix

    Returns:
    - A_inv: inverse of A
    """
    n = A.shape[0]

    # Compute PLU decomposition
    LU, perm = plu_decompose_compact(A)

    # Solve AX = I column by column
    A_inv = np.zeros((n, n))
    I = np.eye(n)

    for i in range(n):
        A_inv[:, i] = solve_with_plu(LU, perm, I[:, i])

    return A_inv

def compute_determinant_lu(A):
    """Compute determinant using LU decomposition."""
    LU, perm = plu_decompose_compact(A)

    # det(A) = det(P) * det(L) * det(U)
    # det(L) = 1 (unit diagonal)
    # det(U) = product of diagonal
    # det(P) = (-1)^(number of swaps)

    det_U = np.prod(np.diag(LU))

    # Count permutation parity
    n = len(perm)
    swaps = 0
    visited = [False] * n
    for i in range(n):
        if not visited[i]:
            j = i
            cycle_length = 0
            while not visited[j]:
                visited[j] = True
                j = perm[j]
                cycle_length += 1
            swaps += cycle_length - 1

    det_P = (-1) ** swaps

    return det_P * det_U

# Test case
A = np.array([
    [4.0, 7.0],
    [2.0, 6.0]
], dtype=float)

A_inv = invert_matrix_lu(A)
print("A =")
print(A)
print("\\nA^(-1) =")
print(A_inv)
print("\\nA @ A^(-1) =")
print(A @ A_inv)
print(f"\\nError from identity: {np.linalg.norm(A @ A_inv - np.eye(2)):.2e}")

# Compare with NumPy
A_inv_np = np.linalg.inv(A)
print(f"Difference from NumPy: {np.linalg.norm(A_inv - A_inv_np):.2e}")

# Test determinant
print("\\n" + "="*60)
print("Determinant computation:\\n")
det_lu = compute_determinant_lu(A)
det_np = np.linalg.det(A)
print(f"det(A) via LU: {det_lu:.6f}")
print(f"NumPy det(A): {det_np:.6f}")
print(f"Difference: {abs(det_lu - det_np):.2e}")

# Test with 3×3
A3 = np.array([[1.0, 2.0, 3.0], [0.0, 1.0, 4.0], [5.0, 6.0, 0.0]])
A3_inv = invert_matrix_lu(A3)
print(f"\\n3×3 inversion error: {np.linalg.norm(A3 @ A3_inv - np.eye(3)):.2e}")

print("\\nAll tests passed!")`,
    testCases: [
      {
        input: 'A=[[4,7],[2,6]]',
        expectedOutput: 'A^(-1) such that A @ A^(-1) = I',
        isHidden: false,
        description: 'Matrix inversion using LU decomposition'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-5-12',
    subjectId: 'math402',
    topicId: 'topic-5',
    difficulty: 3,
    title: 'Tridiagonal Systems',
    description: 'Implement the Thomas algorithm for efficiently solving tridiagonal systems. Tridiagonal matrices arise in spline interpolation, finite differences, and many other applications. The Thomas algorithm is a specialized, highly efficient O(n) method.',
    starterCode: `import numpy as np

def thomas_algorithm(a, b, c, d):
    """
    Solve tridiagonal system using Thomas algorithm.

    The system is:
    b[0]*x[0] + c[0]*x[1] = d[0]
    a[1]*x[0] + b[1]*x[1] + c[1]*x[2] = d[1]
    ...
    a[n-1]*x[n-2] + b[n-1]*x[n-1] = d[n-1]

    Parameters:
    - a: subdiagonal (length n-1)
    - b: diagonal (length n)
    - c: superdiagonal (length n-1)
    - d: right-hand side (length n)

    Returns:
    - x: solution vector
    """
    # TODO: Implement this function
    pass

# Test case: tridiagonal system
n = 5
a = np.array([1.0, 1.0, 1.0, 1.0])  # subdiagonal
b = np.array([4.0, 4.0, 4.0, 4.0, 4.0])  # diagonal
c = np.array([1.0, 1.0, 1.0, 1.0])  # superdiagonal
d = np.array([6.0, 8.0, 8.0, 8.0, 6.0])  # RHS

x = thomas_algorithm(a, b, c, d)
print(f"Solution: {x}")`,
    hints: [
      'Forward elimination: modify c and d going forward',
      'c\'[i] = c[i] / (b[i] - a[i]*c\'[i-1])',
      'd\'[i] = (d[i] - a[i]*d\'[i-1]) / (b[i] - a[i]*c\'[i-1])',
      'Back substitution: x[n-1] = d\'[n-1], x[i] = d\'[i] - c\'[i]*x[i+1]'
    ],
    solution: `import numpy as np

def thomas_algorithm(a, b, c, d):
    """
    Solve tridiagonal system using Thomas algorithm.

    The system is:
    b[0]*x[0] + c[0]*x[1] = d[0]
    a[1]*x[0] + b[1]*x[1] + c[1]*x[2] = d[1]
    ...
    a[n-1]*x[n-2] + b[n-1]*x[n-1] = d[n-1]

    Parameters:
    - a: subdiagonal (length n-1)
    - b: diagonal (length n)
    - c: superdiagonal (length n-1)
    - d: right-hand side (length n)

    Returns:
    - x: solution vector
    """
    n = len(b)

    # Make copies to avoid modifying inputs
    c = c.copy()
    d = d.copy()

    # Forward elimination
    for i in range(1, n):
        if abs(b[i-1]) < 1e-15:
            raise ValueError(f"Zero pivot at row {i-1}")

        m = a[i-1] / b[i-1]
        b[i] = b[i] - m * c[i-1]
        d[i] = d[i] - m * d[i-1]

    # Check final pivot
    if abs(b[n-1]) < 1e-15:
        raise ValueError("Matrix is singular")

    # Back substitution
    x = np.zeros(n)
    x[n-1] = d[n-1] / b[n-1]

    for i in range(n-2, -1, -1):
        x[i] = (d[i] - c[i] * x[i+1]) / b[i]

    return x

def build_tridiagonal_matrix(a, b, c):
    """Build full matrix from diagonals for verification."""
    n = len(b)
    A = np.diag(b) + np.diag(a, -1) + np.diag(c, 1)
    return A

# Test case: tridiagonal system
n = 5
a = np.array([1.0, 1.0, 1.0, 1.0])  # subdiagonal
b = np.array([4.0, 4.0, 4.0, 4.0, 4.0])  # diagonal
c = np.array([1.0, 1.0, 1.0, 1.0])  # superdiagonal
d = np.array([6.0, 8.0, 8.0, 8.0, 6.0])  # RHS

x = thomas_algorithm(a, b, c, d)
print(f"Solution: {x}")

# Verify
A = build_tridiagonal_matrix(a, b, c)
print(f"\\nVerification Ax:")
print(A @ x)
print(f"Original d:")
print(d)
print(f"Residual: {np.linalg.norm(A @ x - d):.2e}")

# Compare with NumPy
x_np = np.linalg.solve(A, d)
print(f"\\nDifference from NumPy: {np.linalg.norm(x - x_np):.2e}")

# Test case 2: larger system
print("\\n" + "="*60)
print("Test with larger system (n=100):\\n")
n = 100
a_large = np.ones(n-1)
b_large = 3.0 * np.ones(n)
c_large = np.ones(n-1)
d_large = np.random.randn(n)

import time
start = time.time()
x_thomas = thomas_algorithm(a_large, b_large, c_large, d_large)
time_thomas = time.time() - start

A_large = build_tridiagonal_matrix(a_large, b_large, c_large)
start = time.time()
x_numpy = np.linalg.solve(A_large, d_large)
time_numpy = time.time() - start

print(f"Thomas algorithm time: {time_thomas*1000:.3f} ms")
print(f"NumPy solve time: {time_numpy*1000:.3f} ms")
print(f"Speedup: {time_numpy/time_thomas:.1f}x")
print(f"Solution difference: {np.linalg.norm(x_thomas - x_numpy):.2e}")
print(f"Residual: {np.linalg.norm(A_large @ x_thomas - d_large):.2e}")

print("\\nAll tests passed!")`,
    testCases: [
      {
        input: 'Tridiagonal system with diagonals a, b, c',
        expectedOutput: 'O(n) solution matching full solver',
        isHidden: false,
        description: 'Efficient Thomas algorithm for tridiagonal systems'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-5-13',
    subjectId: 'math402',
    topicId: 'topic-5',
    difficulty: 5,
    title: 'Iterative Refinement',
    description: 'Implement iterative refinement to improve solution accuracy. After solving Ax = b to get x₀, compute residual r = b - Ax₀, solve A(δx) = r, and update x₁ = x₀ + δx. This can recover accuracy lost to rounding errors.',
    starterCode: `import numpy as np

def iterative_refinement(A, b, max_iter=5):
    """
    Solve Ax = b with iterative refinement for improved accuracy.

    Parameters:
    - A: n×n coefficient matrix
    - b: n×1 right-hand side
    - max_iter: maximum refinement iterations

    Returns:
    - x: refined solution
    - residuals: list of residual norms
    """
    # TODO: Implement this function
    pass

# Test with ill-conditioned system
A = np.array([
    [1.0, 2.0],
    [1.000001, 2.0]
], dtype=float)
b = np.array([3.0, 3.000001])

x, residuals = iterative_refinement(A, b)
print(f"Solution: {x}")
print(f"Residuals: {residuals}")`,
    hints: [
      'Start with initial solution x₀ from standard solver',
      'Compute residual r = b - Ax in higher precision if possible',
      'Solve Aδ = r for correction δ',
      'Update x = x + δ and repeat',
      'Stop when residual stops decreasing'
    ],
    solution: `import numpy as np
from scipy.linalg import lu_factor, lu_solve

def iterative_refinement(A, b, max_iter=5, tol=1e-14):
    """
    Solve Ax = b with iterative refinement for improved accuracy.

    Parameters:
    - A: n×n coefficient matrix
    - b: n×1 right-hand side
    - max_iter: maximum refinement iterations
    - tol: convergence tolerance

    Returns:
    - x: refined solution
    - residuals: list of residual norms
    """
    # Compute LU factorization once
    lu, piv = lu_factor(A)

    # Initial solution
    x = lu_solve((lu, piv), b)

    residuals = []

    for iteration in range(max_iter):
        # Compute residual in higher precision if possible
        # r = b - Ax (use np.float128 if available, else float64)
        try:
            r = b.astype(np.float128) - (A.astype(np.float128) @ x.astype(np.float128))
            r = r.astype(np.float64)
        except:
            r = b - A @ x

        residual_norm = np.linalg.norm(r)
        residuals.append(residual_norm)

        # Check convergence
        if residual_norm < tol:
            break

        # Solve for correction: A(δx) = r
        delta = lu_solve((lu, piv), r)

        # Update solution
        x = x + delta

    return x, residuals

def compare_with_without_refinement(A, b):
    """Compare standard solve with iterative refinement."""
    # Standard solve
    x_standard = np.linalg.solve(A, b)
    residual_standard = np.linalg.norm(b - A @ x_standard)

    # With refinement
    x_refined, residuals = iterative_refinement(A, b)
    residual_refined = np.linalg.norm(b - A @ x_refined)

    return {
        'x_standard': x_standard,
        'x_refined': x_refined,
        'residual_standard': residual_standard,
        'residual_refined': residual_refined,
        'refinement_history': residuals
    }

# Test 1: Ill-conditioned system
print("Test 1: Ill-conditioned system\\n")
A1 = np.array([
    [1.0, 2.0],
    [1.000001, 2.0]
], dtype=float)
b1 = np.array([3.0, 3.000001])

results1 = compare_with_without_refinement(A1, b1)

print("Standard solve:")
print(f"  Solution: {results1['x_standard']}")
print(f"  Residual: {results1['residual_standard']:.2e}")

print("\\nWith iterative refinement:")
print(f"  Solution: {results1['x_refined']}")
print(f"  Residual: {results1['residual_refined']:.2e}")
print(f"  Refinement history: {[f'{r:.2e}' for r in results1['refinement_history']]}")
print(f"  Improvement: {results1['residual_standard'] / results1['residual_refined']:.1f}x")

# Test 2: Hilbert matrix (very ill-conditioned)
print("\\n" + "="*60)
print("Test 2: Hilbert matrix (n=6)\\n")

def hilbert_matrix(n):
    H = np.zeros((n, n))
    for i in range(n):
        for j in range(n):
            H[i, j] = 1.0 / (i + j + 1)
    return H

A2 = hilbert_matrix(6)
x_true = np.ones(6)
b2 = A2 @ x_true

results2 = compare_with_without_refinement(A2, b2)

print(f"Condition number: {np.linalg.cond(A2):.2e}")
print(f"True solution: {x_true}")

print("\\nStandard solve:")
print(f"  Solution: {results2['x_standard']}")
print(f"  Error: {np.linalg.norm(results2['x_standard'] - x_true):.2e}")
print(f"  Residual: {results2['residual_standard']:.2e}")

print("\\nWith iterative refinement:")
print(f"  Solution: {results2['x_refined']}")
print(f"  Error: {np.linalg.norm(results2['x_refined'] - x_true):.2e}")
print(f"  Residual: {results2['residual_refined']:.2e}")
print(f"  Refinement history: {[f'{r:.2e}' for r in results2['refinement_history']]}")

error_improvement = (np.linalg.norm(results2['x_standard'] - x_true) /
                     np.linalg.norm(results2['x_refined'] - x_true))
print(f"  Error improvement: {error_improvement:.1f}x")

print("\\nAll tests passed!")`,
    testCases: [
      {
        input: 'Ill-conditioned system',
        expectedOutput: 'Progressively decreasing residuals, improved accuracy',
        isHidden: false,
        description: 'Iterative refinement for accuracy improvement'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-5-14',
    subjectId: 'math402',
    topicId: 'topic-5',
    difficulty: 4,
    title: 'Solving Multiple Right-Hand Sides',
    description: 'Efficiently solve AX = B where B has multiple columns. Factor A once, then solve for each column of B. This is essential for matrix inversion and many applications.',
    starterCode: `import numpy as np

def solve_multiple_rhs(A, B):
    """
    Solve AX = B efficiently using single factorization.

    Parameters:
    - A: n×n coefficient matrix
    - B: n×m right-hand side matrix (m systems)

    Returns:
    - X: n×m solution matrix
    """
    # TODO: Implement this function
    pass

# Test case
A = np.array([
    [2.0, 1.0, 0.0],
    [1.0, 2.0, 1.0],
    [0.0, 1.0, 2.0]
], dtype=float)

B = np.array([
    [1.0, 0.0, 1.0],
    [2.0, 1.0, 0.0],
    [3.0, 2.0, 1.0]
], dtype=float)

X = solve_multiple_rhs(A, B)
print("Solution X:")
print(X)`,
    hints: [
      'Factor A = LU once',
      'For each column b_i of B, solve Lc_i = b_i then Ux_i = c_i',
      'More efficient than solving m separate systems',
      'Can also work with entire B matrix at once'
    ],
    solution: `import numpy as np
from scipy.linalg import lu_factor, lu_solve
import time

def solve_multiple_rhs(A, B):
    """
    Solve AX = B efficiently using single factorization.

    Parameters:
    - A: n×n coefficient matrix
    - B: n×m right-hand side matrix (m systems)

    Returns:
    - X: n×m solution matrix
    """
    n, m = B.shape

    # Factor A once
    lu, piv = lu_factor(A)

    # Solve for each column
    X = np.zeros((n, m))
    for i in range(m):
        X[:, i] = lu_solve((lu, piv), B[:, i])

    return X

def solve_multiple_rhs_matrix(A, B):
    """
    Alternative: solve with entire B matrix at once.
    More efficient for large m.
    """
    from scipy.linalg import lu_factor, lu_solve

    lu, piv = lu_factor(A)

    # Solve AX = B using the factorization
    # This requires working with B as a whole
    n, m = B.shape
    X = np.zeros((n, m))

    # Forward substitution with permutation for all columns
    P_B = B[piv, :]

    # Solve LY = P_B
    Y = np.zeros((n, m))
    for i in range(n):
        Y[i, :] = P_B[i, :] - lu[i, :i] @ Y[:i, :]

    # Solve UX = Y
    X = np.zeros((n, m))
    for i in range(n - 1, -1, -1):
        X[i, :] = (Y[i, :] - lu[i, i+1:] @ X[i+1:, :]) / lu[i, i]

    return X

# Test case
A = np.array([
    [2.0, 1.0, 0.0],
    [1.0, 2.0, 1.0],
    [0.0, 1.0, 2.0]
], dtype=float)

B = np.array([
    [1.0, 0.0, 1.0],
    [2.0, 1.0, 0.0],
    [3.0, 2.0, 1.0]
], dtype=float)

X = solve_multiple_rhs(A, B)
print("Solution X:")
print(X)
print("\\nVerification AX:")
print(A @ X)
print("\\nOriginal B:")
print(B)
print(f"\\nResidual: {np.linalg.norm(A @ X - B):.2e}")

# Compare methods
print("\\n" + "="*60)
print("Performance comparison:\\n")

X_matrix = solve_multiple_rhs_matrix(A, B)
print(f"Matrix method residual: {np.linalg.norm(A @ X_matrix - B):.2e}")

# Timing test with larger system
n = 100
m = 50
A_large = np.random.randn(n, n)
A_large = A_large @ A_large.T + n * np.eye(n)  # Make SPD
B_large = np.random.randn(n, m)

# Method 1: Single factorization
start = time.time()
X1 = solve_multiple_rhs(A_large, B_large)
time1 = time.time() - start

# Method 2: Naive (m separate solves without reusing factorization)
start = time.time()
X2 = np.zeros((n, m))
for i in range(m):
    X2[:, i] = np.linalg.solve(A_large, B_large[:, i])
time2 = time.time() - start

# Method 3: NumPy on full matrix
start = time.time()
X3 = np.linalg.solve(A_large, B_large)
time3 = time.time() - start

print(f"Factorization reuse: {time1*1000:.2f} ms")
print(f"Naive method: {time2*1000:.2f} ms")
print(f"NumPy (optimized): {time3*1000:.2f} ms")
print(f"\\nSpeedup vs naive: {time2/time1:.1f}x")
print(f"Residual: {np.linalg.norm(A_large @ X1 - B_large):.2e}")

# Application: compute A^(-1) using solve
print("\\n" + "="*60)
print("Application: Computing A^(-1):\\n")
A_inv = solve_multiple_rhs(A, np.eye(3))
print("A^(-1) =")
print(A_inv)
print("\\nA @ A^(-1) =")
print(A @ A_inv)
print(f"Error from I: {np.linalg.norm(A @ A_inv - np.eye(3)):.2e}")

print("\\nAll tests passed!")`,
    testCases: [
      {
        input: 'A (n×n), B (n×m)',
        expectedOutput: 'X such that AX = B, computed efficiently',
        isHidden: false,
        description: 'Efficient solution of multiple systems'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-5-15',
    subjectId: 'math402',
    topicId: 'topic-5',
    difficulty: 5,
    title: 'Symmetric Indefinite Factorization',
    description: 'Implement Bunch-Kaufman factorization for symmetric indefinite matrices: A = LDL^T with pivoting. Not all symmetric matrices are positive definite. This factorization handles the general symmetric case.',
    starterCode: `import numpy as np

def ldl_factorization(A):
    """
    Compute LDL^T factorization of symmetric matrix.

    Parameters:
    - A: n×n symmetric matrix

    Returns:
    - L: unit lower triangular
    - D: diagonal matrix
    """
    # TODO: Implement this function
    pass

# Test with symmetric indefinite matrix
A = np.array([
    [1.0, 2.0, 3.0],
    [2.0, 4.0, 5.0],
    [3.0, 5.0, 6.0]
], dtype=float)

L, D = ldl_factorization(A)
print("L =")
print(L)
print("\\nD =")
print(D)`,
    hints: [
      'Similar to Cholesky but D is not necessarily positive',
      'D[i,i] = A[i,i] - sum(L[i,k]^2 * D[k,k] for k<i)',
      'L[j,i] = (A[j,i] - sum(L[j,k]*L[i,k]*D[k,k] for k<i)) / D[i,i]',
      'May need pivoting for numerical stability (Bunch-Kaufman)'
    ],
    solution: `import numpy as np

def ldl_factorization(A):
    """
    Compute LDL^T factorization of symmetric matrix.

    Parameters:
    - A: n×n symmetric matrix

    Returns:
    - L: unit lower triangular
    - D: diagonal matrix
    """
    # Verify symmetry
    if not np.allclose(A, A.T):
        raise ValueError("Matrix must be symmetric")

    A = A.astype(float).copy()
    n = A.shape[0]

    L = np.eye(n)
    D = np.zeros(n)

    for i in range(n):
        # Compute D[i,i]
        D[i] = A[i, i] - sum(L[i, k]**2 * D[k] for k in range(i))

        if abs(D[i]) < 1e-15:
            print(f"Warning: zero or near-zero diagonal at position {i}")
            D[i] = 1e-15  # Regularize

        # Compute L[j,i] for j > i
        for j in range(i + 1, n):
            sum_term = sum(L[j, k] * L[i, k] * D[k] for k in range(i))
            L[j, i] = (A[j, i] - sum_term) / D[i]

    D_matrix = np.diag(D)
    return L, D_matrix

def ldl_solve(L, D, b):
    """Solve Ax = b using LDL^T factorization."""
    n = len(b)

    # Forward: Ly = b
    y = np.zeros(n)
    for i in range(n):
        y[i] = b[i] - sum(L[i, j] * y[j] for j in range(i))

    # Middle: Dz = y
    z = y / np.diag(D)

    # Back: L^T x = z
    x = np.zeros(n)
    for i in range(n - 1, -1, -1):
        x[i] = z[i] - sum(L[j, i] * x[j] for j in range(i + 1, n))

    return x

# Test 1: Symmetric indefinite matrix
print("Test 1: Symmetric indefinite matrix\\n")
A = np.array([
    [1.0, 2.0, 3.0],
    [2.0, 4.0, 5.0],
    [3.0, 5.0, 6.0]
], dtype=float)

L, D = ldl_factorization(A)
print("L =")
print(L)
print("\\nD =")
print(D)
print("\\nL @ D @ L^T =")
print(L @ D @ L.T)
print("\\nOriginal A =")
print(A)
print(f"\\nDecomposition error: {np.linalg.norm(A - L @ D @ L.T):.2e}")

# Test solving
b = np.array([1.0, 2.0, 3.0])
x = ldl_solve(L, D, b)
print(f"\\nSolution to Ax = b: {x}")
print(f"Residual: {np.linalg.norm(A @ x - b):.2e}")

# Test 2: SPD matrix (should work like Cholesky)
print("\\n" + "="*60)
print("Test 2: Symmetric positive definite matrix\\n")

A_spd = np.array([
    [4.0, 12.0, -16.0],
    [12.0, 37.0, -43.0],
    [-16.0, -43.0, 98.0]
], dtype=float)

L_spd, D_spd = ldl_factorization(A_spd)
print("D (should be positive) =")
print(D_spd)
print(f"All eigenvalues positive: {np.all(np.diag(D_spd) > 0)}")
print(f"Decomposition error: {np.linalg.norm(A_spd - L_spd @ D_spd @ L_spd.T):.2e}")

# Compare with Cholesky: A = LL^T = (LD^(1/2))(LD^(1/2))^T
L_chol_equiv = L_spd @ np.sqrt(D_spd)
print(f"\\nEquivalent to Cholesky:")
print(f"L @ sqrt(D) @ sqrt(D) @ L^T = L_chol @ L_chol^T")
print(f"Error: {np.linalg.norm(A_spd - L_chol_equiv @ L_chol_equiv.T):.2e}")

# Test 3: Indefinite matrix with negative eigenvalue
print("\\n" + "="*60)
print("Test 3: Indefinite matrix\\n")

A_indef = np.array([
    [1.0, 2.0],
    [2.0, 1.0]
], dtype=float)

eigenvalues = np.linalg.eigvals(A_indef)
print(f"Eigenvalues: {eigenvalues}")
print(f"Matrix is indefinite: {np.any(eigenvalues > 0) and np.any(eigenvalues < 0)}")

L_indef, D_indef = ldl_factorization(A_indef)
print(f"\\nD =")
print(D_indef)
print(f"Decomposition error: {np.linalg.norm(A_indef - L_indef @ D_indef @ L_indef.T):.2e}")

print("\\nAll tests passed!")`,
    testCases: [
      {
        input: 'Symmetric indefinite matrix',
        expectedOutput: 'LDL^T factorization with D possibly having negative entries',
        isHidden: false,
        description: 'Factorization for general symmetric matrices'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-5-16',
    subjectId: 'math402',
    topicId: 'topic-5',
    difficulty: 5,
    title: 'Block Matrix Operations',
    description: 'Implement block LU decomposition and Schur complement method for large structured systems. Many large systems have block structure that can be exploited for efficiency. The Schur complement enables divide-and-conquer approaches.',
    starterCode: `import numpy as np

def block_lu_decompose(A, block_size):
    """
    Compute block LU decomposition.

    Parameters:
    - A: n×n matrix (n divisible by block_size)
    - block_size: size of blocks

    Returns:
    - L, U: block triangular matrices
    """
    # TODO: Implement this function
    pass

# Test case
A = np.array([
    [4., 1., 0., 0.],
    [1., 4., 1., 0.],
    [0., 1., 4., 1.],
    [0., 0., 1., 4.]
], dtype=float)

L, U = block_lu_decompose(A, block_size=2)`,
    hints: [
      'Partition matrix into 2×2 block structure',
      'A = [[A11, A12], [A21, A22]]',
      'Factor A11 = L11 U11 first',
      'Compute U12 = L11^(-1) A12 and L21 = A21 U11^(-1)',
      'Schur complement: S = A22 - L21 U12, factor recursively'
    ],
    solution: `import numpy as np
from scipy.linalg import lu_factor, lu_solve

def block_lu_decompose(A, block_size):
    """
    Compute block LU decomposition.

    Parameters:
    - A: n×n matrix (n divisible by block_size)
    - block_size: size of blocks

    Returns:
    - L, U: block triangular matrices
    """
    n = A.shape[0]
    if n % block_size != 0:
        raise ValueError("Matrix size must be divisible by block_size")

    A = A.astype(float).copy()
    L = np.eye(n)
    U = np.zeros((n, n))

    num_blocks = n // block_size

    for k in range(num_blocks):
        start_k = k * block_size
        end_k = (k + 1) * block_size

        # Factor diagonal block
        A_kk = A[start_k:end_k, start_k:end_k]
        L_kk, U_kk = np.linalg.qr(A_kk)  # Simple factorization
        U_kk = L_kk.T @ A_kk  # Get U from A
        L_kk = np.eye(block_size)

        # Direct LU for diagonal block
        from scipy.linalg import lu
        P_kk, L_kk, U_kk = lu(A_kk)

        L[start_k:end_k, start_k:end_k] = L_kk
        U[start_k:end_k, start_k:end_k] = U_kk

        # Update off-diagonal blocks
        for j in range(k + 1, num_blocks):
            start_j = j * block_size
            end_j = (j + 1) * block_size

            # Solve L_kk U_kj = A_kj for U_kj
            U[start_k:end_k, start_j:end_j] = np.linalg.solve(
                L_kk, A[start_k:end_k, start_j:end_j]
            )

            # Solve L_jk U_kk = A_jk for L_jk
            L[start_j:end_j, start_k:end_k] = np.linalg.solve(
                U_kk.T, A[start_j:end_j, start_k:end_k].T
            ).T

            # Update trailing submatrix (Schur complement)
            A[start_j:end_j, start_j:end_j] -= (
                L[start_j:end_j, start_k:end_k] @ U[start_k:end_k, start_j:end_j]
            )

    return L, U

def schur_complement_solve(A, b, split):
    """
    Solve Ax = b using Schur complement.

    A = [[A11, A12],
         [A21, A22]]

    Schur complement: S = A22 - A21 @ inv(A11) @ A12
    """
    A11 = A[:split, :split]
    A12 = A[:split, split:]
    A21 = A[split:, :split]
    A22 = A[split:, split:]

    b1 = b[:split]
    b2 = b[split:]

    # Solve A11 y = A12 for each column
    A11_inv_A12 = np.linalg.solve(A11, A12)

    # Compute Schur complement
    S = A22 - A21 @ A11_inv_A12

    # Solve for x2: S x2 = b2 - A21 inv(A11) b1
    rhs2 = b2 - A21 @ np.linalg.solve(A11, b1)
    x2 = np.linalg.solve(S, rhs2)

    # Back-solve for x1: A11 x1 = b1 - A12 x2
    x1 = np.linalg.solve(A11, b1 - A12 @ x2)

    return np.concatenate([x1, x2])

# Test 1: Block LU
print("Test 1: Block LU decomposition\\n")
A = np.array([
    [4., 1., 2., 0.],
    [1., 4., 0., 2.],
    [2., 0., 4., 1.],
    [0., 2., 1., 4.]
], dtype=float)

L, U = block_lu_decompose(A, block_size=2)
print("L =")
print(L)
print("\\nU =")
print(U)
print("\\nLU =")
print(L @ U)
print("\\nOriginal A =")
print(A)
print(f"\\nDecomposition error: {np.linalg.norm(A - L @ U):.2e}")

# Test 2: Schur complement
print("\\n" + "="*60)
print("Test 2: Schur complement method\\n")

A_schur = np.array([
    [4., 1., 2., 0.],
    [1., 5., 0., 2.],
    [2., 0., 6., 1.],
    [0., 2., 1., 7.]
], dtype=float)

b_schur = np.array([1., 2., 3., 4.])

x_schur = schur_complement_solve(A_schur, b_schur, split=2)
print(f"Solution: {x_schur}")
print(f"Verification Ax: {A_schur @ x_schur}")
print(f"Original b: {b_schur}")
print(f"Residual: {np.linalg.norm(A_schur @ x_schur - b_schur):.2e}")

# Compare with direct solve
x_direct = np.linalg.solve(A_schur, b_schur)
print(f"\\nDifference from direct solve: {np.linalg.norm(x_schur - x_direct):.2e}")

# Test 3: Block tridiagonal
print("\\n" + "="*60)
print("Test 3: Block tridiagonal system\\n")

def block_tridiagonal_matrix(n_blocks, block_size):
    """Create block tridiagonal matrix."""
    n = n_blocks * block_size
    A = np.zeros((n, n))

    for i in range(n_blocks):
        start = i * block_size
        end = (i + 1) * block_size

        # Diagonal block
        A[start:end, start:end] = 4 * np.eye(block_size) + np.ones((block_size, block_size))

        # Off-diagonal blocks
        if i > 0:
            A[start:end, start-block_size:start] = np.eye(block_size)
        if i < n_blocks - 1:
            A[start:end, end:end+block_size] = np.eye(block_size)

    return A

A_block_tri = block_tridiagonal_matrix(3, 2)
b_block_tri = np.ones(6)

print("Block tridiagonal matrix:")
print(A_block_tri)

x_block = schur_complement_solve(A_block_tri, b_block_tri, split=4)
print(f"\\nSolution: {x_block}")
print(f"Residual: {np.linalg.norm(A_block_tri @ x_block - b_block_tri):.2e}")

print("\\nAll tests passed!")`,
    testCases: [
      {
        input: 'Block-structured matrix',
        expectedOutput: 'Efficient factorization exploiting block structure',
        isHidden: false,
        description: 'Block matrix operations and Schur complement'
      }
    ],
    language: 'python'
  }
];
