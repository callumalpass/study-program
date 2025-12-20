import { CodingExercise } from '../../../../core/types';

export const topic6Exercises: CodingExercise[] = [
  {
    id: 'math402-ex-6-1',
    subjectId: 'math402',
    topicId: 'topic-6',
    difficulty: 1,
    title: 'Jacobi Iteration',
    description: 'Implement the Jacobi iterative method for solving linear systems. The Jacobi method splits A = D + R where D is diagonal, and iterates x^(k+1) = D^(-1)(b - Rx^(k)). This is the simplest stationary iterative method.',
    starterCode: `import numpy as np

def jacobi_iteration(A, b, x0=None, max_iter=100, tol=1e-6):
    """
    Solve Ax = b using Jacobi iteration.

    Parameters:
    - A: n×n coefficient matrix
    - b: n×1 right-hand side
    - x0: initial guess (default: zero vector)
    - max_iter: maximum iterations
    - tol: convergence tolerance

    Returns:
    - x: solution
    - iterations: number of iterations
    - residuals: list of residual norms
    """
    # TODO: Implement this function
    pass

# Test case: diagonally dominant system
A = np.array([
    [4.0, 1.0, 0.0],
    [1.0, 4.0, 1.0],
    [0.0, 1.0, 4.0]
], dtype=float)

b = np.array([6.0, 8.0, 6.0])

x, iters, residuals = jacobi_iteration(A, b)
print(f"Solution: {x}")
print(f"Iterations: {iters}")
print(f"Final residual: {residuals[-1]:.2e}")`,
    hints: [
      'Extract diagonal D and off-diagonal R where A = D + R',
      'Update: x^(k+1)[i] = (b[i] - sum(A[i,j]*x^(k)[j] for j≠i)) / A[i,i]',
      'Use all old values x^(k) to compute all new values x^(k+1)',
      'Check convergence: ||b - Ax|| < tol'
    ],
    solution: `import numpy as np

def jacobi_iteration(A, b, x0=None, max_iter=100, tol=1e-6):
    """
    Solve Ax = b using Jacobi iteration.

    Parameters:
    - A: n×n coefficient matrix
    - b: n×1 right-hand side
    - x0: initial guess (default: zero vector)
    - max_iter: maximum iterations
    - tol: convergence tolerance

    Returns:
    - x: solution
    - iterations: number of iterations
    - residuals: list of residual norms
    """
    n = len(b)

    # Initialize
    if x0 is None:
        x = np.zeros(n)
    else:
        x = x0.copy()

    residuals = []

    for k in range(max_iter):
        # Compute residual
        residual = b - A @ x
        res_norm = np.linalg.norm(residual)
        residuals.append(res_norm)

        # Check convergence
        if res_norm < tol:
            return x, k + 1, residuals

        # Jacobi update: x_new[i] = (b[i] - sum(A[i,j]*x[j] for j≠i)) / A[i,i]
        x_new = np.zeros(n)
        for i in range(n):
            sigma = sum(A[i, j] * x[j] for j in range(n) if j != i)
            x_new[i] = (b[i] - sigma) / A[i, i]

        x = x_new

    # Max iterations reached
    residual = b - A @ x
    residuals.append(np.linalg.norm(residual))

    return x, max_iter, residuals

# Test case: diagonally dominant system
A = np.array([
    [4.0, 1.0, 0.0],
    [1.0, 4.0, 1.0],
    [0.0, 1.0, 4.0]
], dtype=float)

b = np.array([6.0, 8.0, 6.0])

x, iters, residuals = jacobi_iteration(A, b)
print(f"Solution: {x}")
print(f"Iterations: {iters}")
print(f"Final residual: {residuals[-1]:.2e}")

# Verify
print(f"\\nVerification Ax: {A @ x}")
print(f"Original b: {b}")

# Compare with direct solve
x_exact = np.linalg.solve(A, b)
print(f"\\nDifference from exact: {np.linalg.norm(x - x_exact):.2e}")

# Plot convergence
import matplotlib.pyplot as plt
plt.semilogy(residuals)
plt.xlabel('Iteration')
plt.ylabel('Residual norm')
plt.title('Jacobi Convergence')
plt.grid(True)
plt.show()

print("\\nAll tests passed!")`,
    testCases: [
      {
        input: 'Diagonally dominant 3×3 system',
        expectedOutput: 'Converged solution in ~10-20 iterations',
        isHidden: false,
        description: 'Basic Jacobi iteration convergence'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-6-2',
    subjectId: 'math402',
    topicId: 'topic-6',
    difficulty: 2,
    title: 'Gauss-Seidel Method',
    description: 'Implement Gauss-Seidel iteration which uses updated values immediately. Gauss-Seidel often converges faster than Jacobi because it uses the most recent information. Update: x^(k+1)[i] uses already-computed x^(k+1)[j] for j < i.',
    starterCode: `import numpy as np

def gauss_seidel(A, b, x0=None, max_iter=100, tol=1e-6):
    """
    Solve Ax = b using Gauss-Seidel iteration.

    Parameters:
    - A: n×n coefficient matrix
    - b: n×1 right-hand side
    - x0: initial guess
    - max_iter: maximum iterations
    - tol: convergence tolerance

    Returns:
    - x: solution
    - iterations: number of iterations
    - residuals: list of residual norms
    """
    # TODO: Implement this function
    pass

# Test case
A = np.array([
    [4.0, 1.0, 0.0],
    [1.0, 4.0, 1.0],
    [0.0, 1.0, 4.0]
], dtype=float)

b = np.array([6.0, 8.0, 6.0])

x, iters, residuals = gauss_seidel(A, b)
print(f"Solution: {x}")
print(f"Iterations: {iters}")`,
    hints: [
      'Use updated values immediately in the same iteration',
      'x[i] = (b[i] - sum(A[i,j]*x[j] for j<i) - sum(A[i,j]*x[j] for j>i)) / A[i,i]',
      'First sum uses new x values, second sum uses old x values',
      'Typically converges faster than Jacobi'
    ],
    solution: `import numpy as np

def gauss_seidel(A, b, x0=None, max_iter=100, tol=1e-6):
    """
    Solve Ax = b using Gauss-Seidel iteration.

    Parameters:
    - A: n×n coefficient matrix
    - b: n×1 right-hand side
    - x0: initial guess
    - max_iter: maximum iterations
    - tol: convergence tolerance

    Returns:
    - x: solution
    - iterations: number of iterations
    - residuals: list of residual norms
    """
    n = len(b)

    if x0 is None:
        x = np.zeros(n)
    else:
        x = x0.copy()

    residuals = []

    for k in range(max_iter):
        # Compute residual
        residual = b - A @ x
        res_norm = np.linalg.norm(residual)
        residuals.append(res_norm)

        if res_norm < tol:
            return x, k + 1, residuals

        # Gauss-Seidel update (in-place)
        for i in range(n):
            sigma = sum(A[i, j] * x[j] for j in range(n) if j != i)
            x[i] = (b[i] - sigma) / A[i, i]

    residual = b - A @ x
    residuals.append(np.linalg.norm(residual))

    return x, max_iter, residuals

def compare_jacobi_gs(A, b):
    """Compare Jacobi and Gauss-Seidel convergence."""
    from math402_ex_6_1 import jacobi_iteration

    # Run both methods
    x_j, iters_j, res_j = jacobi_iteration(A, b)
    x_gs, iters_gs, res_gs = gauss_seidel(A, b)

    print("Jacobi:")
    print(f"  Iterations: {iters_j}")
    print(f"  Final residual: {res_j[-1]:.2e}")

    print("\\nGauss-Seidel:")
    print(f"  Iterations: {iters_gs}")
    print(f"  Final residual: {res_gs[-1]:.2e}")

    print(f"\\nSpeedup: {iters_j / iters_gs:.2f}x")

    # Plot comparison
    import matplotlib.pyplot as plt
    plt.semilogy(res_j, label='Jacobi', marker='o')
    plt.semilogy(res_gs, label='Gauss-Seidel', marker='s')
    plt.xlabel('Iteration')
    plt.ylabel('Residual norm')
    plt.title('Convergence Comparison')
    plt.legend()
    plt.grid(True)
    plt.show()

# Test case
A = np.array([
    [4.0, 1.0, 0.0],
    [1.0, 4.0, 1.0],
    [0.0, 1.0, 4.0]
], dtype=float)

b = np.array([6.0, 8.0, 6.0])

x, iters, residuals = gauss_seidel(A, b)
print(f"Solution: {x}")
print(f"Iterations: {iters}")
print(f"Final residual: {residuals[-1]:.2e}")

# Verify
print(f"\\nVerification Ax: {A @ x}")
print(f"Original b: {b}")

x_exact = np.linalg.solve(A, b)
print(f"Difference from exact: {np.linalg.norm(x - x_exact):.2e}")

print("\\nAll tests passed!")`,
    testCases: [
      {
        input: 'Same system as Jacobi',
        expectedOutput: 'Faster convergence than Jacobi',
        isHidden: false,
        description: 'Gauss-Seidel convergence comparison'
      }
    ],
    language: 'python'
  }
];
