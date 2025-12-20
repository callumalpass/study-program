import { CodingExercise } from '../../../../core/types';

export const topic1Exercises: CodingExercise[] = [
  {
    id: 'math402-ex-1-1',
    subjectId: 'math402',
    topicId: 'topic-1',
    difficulty: 1,
    title: 'Computing Machine Epsilon',
    description: 'Write a program to experimentally determine machine epsilon for your system. Write a function that computes machine epsilon by finding the smallest positive number ε such that 1.0 + ε > 1.0 in floating-point arithmetic. Test for both single and double precision.',
    starterCode: `import numpy as np

def compute_machine_epsilon(dtype=np.float64):
    """
    Compute machine epsilon experimentally.

    Parameters:
    - dtype: numpy data type (float32 or float64)

    Returns:
    - epsilon: machine epsilon
    """
    # TODO: Implement this function
    pass

# Test
eps_32 = compute_machine_epsilon(np.float32)
eps_64 = compute_machine_epsilon(np.float64)

print(f"Computed epsilon (float32): {eps_32:.2e}")
print(f"NumPy epsilon (float32): {np.finfo(np.float32).eps:.2e}")
print()
print(f"Computed epsilon (float64): {eps_64:.2e}")
print(f"NumPy epsilon (float64): {np.finfo(np.float64).eps:.2e}")`,
    hints: [
      'Start with ε = 1 and repeatedly halve it',
      'Stop when 1.0 + ε/2 == 1.0',
      'Compare with numpy.finfo values'
    ],
    solution: `import numpy as np

def compute_machine_epsilon(dtype=np.float64):
    """
    Compute machine epsilon experimentally.

    Parameters:
    - dtype: numpy data type (float32 or float64)

    Returns:
    - epsilon: machine epsilon
    """
    eps = dtype(1.0)

    while dtype(1.0) + dtype(eps / 2.0) != dtype(1.0):
        eps = dtype(eps / 2.0)

    return eps

# Test
eps_32 = compute_machine_epsilon(np.float32)
eps_64 = compute_machine_epsilon(np.float64)

print(f"Computed epsilon (float32): {eps_32:.2e}")
print(f"NumPy epsilon (float32): {np.finfo(np.float32).eps:.2e}")
print()
print(f"Computed epsilon (float64): {eps_64:.2e}")
print(f"NumPy epsilon (float64): {np.finfo(np.float64).eps:.2e}")

# Verification
assert abs(eps_32 - np.finfo(np.float32).eps) < 1e-10
assert abs(eps_64 - np.finfo(np.float64).eps) < 1e-15

print("\\nAll tests passed!")`,
    testCases: [
      {
        input: 'dtype=np.float32',
        expectedOutput: '≈ 1.19e-07',
        isHidden: false,
        description: 'Test with single precision float'
      },
      {
        input: 'dtype=np.float64',
        expectedOutput: '≈ 2.22e-16',
        isHidden: false,
        description: 'Test with double precision float'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-1-2',
    subjectId: 'math402',
    topicId: 'topic-1',
    difficulty: 2,
    title: 'Stable Quadratic Formula',
    description: 'Implement a numerically stable quadratic formula that avoids cancellation. Implement a function to solve ax² + bx + c = 0 that avoids catastrophic cancellation when b² >> 4ac. The standard formula suffers from cancellation when computing -b ± √(b² - 4ac) when the terms are nearly equal.',
    starterCode: `import numpy as np

def quadratic_stable(a, b, c):
    """
    Solve ax² + bx + c = 0 using numerically stable formula.

    Parameters:
    - a, b, c: coefficients

    Returns:
    - (x1, x2): roots (real or complex)
    """
    # TODO: Implement this function
    pass

# Test cases
test_cases = [
    (1, 5, 6, (-3.0, -2.0)),  # (x+2)(x+3) = 0
    (1, -1e10, 1, (-1e10, -1e-10)),  # Large b
    (1, 0, -4, (-2.0, 2.0)),  # x² - 4 = 0
]

print("Testing stable quadratic formula:\\n")
for a, b, c, expected in test_cases:
    result = quadratic_stable(a, b, c)
    print(f"({a})x² + ({b})x + ({c}) = 0")
    print(f"  Result: {result}")
    print(f"  Expected: {expected}")
    print()`,
    hints: [
      'Compute the numerically stable root first',
      'Use Vieta\'s formula x₁x₂ = c/a for the second root',
      'Handle edge cases (a=0, discriminant < 0)'
    ],
    solution: `import numpy as np

def quadratic_stable(a, b, c):
    """
    Solve ax² + bx + c = 0 using numerically stable formula.

    Parameters:
    - a, b, c: coefficients

    Returns:
    - (x1, x2): roots (real or complex)
    """
    # Handle degenerate case
    if abs(a) < 1e-15:
        if abs(b) < 1e-15:
            return None if abs(c) > 1e-15 else float('inf')
        return -c / b, None

    # Compute discriminant
    disc = b**2 - 4*a*c

    # Complex roots
    if disc < 0:
        real = -b / (2*a)
        imag = np.sqrt(-disc) / (2*a)
        return complex(real, imag), complex(real, -imag)

    # Real roots - stable formula
    sqrt_disc = np.sqrt(disc)

    # Compute one root avoiding cancellation
    if b >= 0:
        x1 = (-b - sqrt_disc) / (2*a)
    else:
        x1 = (-b + sqrt_disc) / (2*a)

    # Second root using Vieta's formula
    x2 = c / (a * x1) if abs(x1) > 1e-15 else (-b - x1)

    # Return in sorted order
    if isinstance(x1, complex):
        return x1, x2
    return tuple(sorted([x1, x2]))

# Test cases
test_cases = [
    (1, 5, 6, (-3.0, -2.0)),  # (x+2)(x+3) = 0
    (1, -1e10, 1, (-1e10, -1e-10)),  # Large b
    (1, 0, -4, (-2.0, 2.0)),  # x² - 4 = 0
    (1, 0, 4, None),  # Complex roots
    (1, -4, 4, (2.0, 2.0)),  # Double root
]

print("Testing stable quadratic formula:\\n")
for a, b, c, expected in test_cases:
    result = quadratic_stable(a, b, c)
    print(f"({a})x² + ({b})x + ({c}) = 0")
    print(f"  Result: {result}")
    if expected:
        print(f"  Expected: {expected}")

    # Verify
    if result and not isinstance(result[0], complex):
        x1, x2 = result
        residual1 = abs(a*x1**2 + b*x1 + c)
        residual2 = abs(a*x2**2 + b*x2 + c)
        print(f"  Residuals: {residual1:.2e}, {residual2:.2e}")
        assert residual1 < 1e-10 and residual2 < 1e-10
    print()

print("All tests passed!")`,
    testCases: [
      {
        input: 'a=1, b=1e10, c=1',
        expectedOutput: 'roots near -1e10 and -1e-10',
        isHidden: false,
        description: 'Test with large coefficient b to check stability'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-1-3',
    subjectId: 'math402',
    topicId: 'topic-1',
    difficulty: 3,
    title: 'Kahan Summation Algorithm',
    description: 'Implement compensated summation for improved accuracy when summing many numbers. Implement Kahan\'s compensated summation algorithm to minimize rounding errors when summing a large array of floating-point numbers. Compare accuracy with naive summation for challenging test cases.',
    starterCode: `import numpy as np

def kahan_sum(data):
    """
    Kahan compensated summation algorithm.

    Reduces cumulative rounding error from O(nε) to O(ε).

    Parameters:
    - data: array-like of numbers to sum

    Returns:
    - sum: compensated sum
    """
    # TODO: Implement this function
    pass

# Test case
print("Test: Large + many small\\n")
data1 = [1.0] + [1e-10] * 1000
result = kahan_sum(data1)
print(f"Kahan sum: {result:.15f}")`,
    hints: [
      'Keep a running compensation variable to track lost precision',
      'For each element: y = x - c, t = s + y, c = (t - s) - y, s = t',
      'The compensation c accumulates the rounding errors'
    ],
    solution: `import numpy as np

def kahan_sum(data):
    """
    Kahan compensated summation algorithm.

    Reduces cumulative rounding error from O(nε) to O(ε).

    Parameters:
    - data: array-like of numbers to sum

    Returns:
    - sum: compensated sum
    """
    s = 0.0  # Running sum
    c = 0.0  # Running compensation

    for x in data:
        y = x - c  # Subtract previous compensation
        t = s + y  # New sum
        c = (t - s) - y  # Compute new compensation
        s = t  # Update sum

    return s

def compare_summation_methods(data):
    """Compare different summation methods."""
    # Naive summation
    naive = sum(data)

    # Kahan summation
    kahan = kahan_sum(data)

    # NumPy (uses pairwise summation)
    numpy_sum = np.sum(data)

    # High precision reference
    from decimal import Decimal, getcontext
    getcontext().prec = 100
    exact = float(sum(Decimal(str(float(x))) for x in data))

    results = {
        'Naive': (naive, abs(naive - exact)),
        'Kahan': (kahan, abs(kahan - exact)),
        'NumPy': (numpy_sum, abs(numpy_sum - exact)),
    }

    return results, exact

# Test case: sum of many small numbers with large initial value
print("Test 1: Large + many small\\n")
data1 = [1.0] + [1e-10] * 10000000
results1, exact1 = compare_summation_methods(data1)

print(f"Exact value: {exact1:.15f}\\n")
for method, (value, error) in results1.items():
    print(f"{method:10s}: {value:.15f}  (error: {error:.2e})")

print("\\n" + "="*60 + "\\n")

# Test case: alternating positive and negative
print("Test 2: Alternating signs\\n")
data2 = [1.0, -1.0, 1e-10] * 1000
results2, exact2 = compare_summation_methods(data2)

print(f"Exact value: {exact2:.15e}\\n")
for method, (value, error) in results2.items():
    print(f"{method:10s}: {value:.15e}  (error: {error:.2e})")

print("\\nKahan summation successfully reduces cumulative error!")`,
    testCases: [
      {
        input: 'data=[1.0] + [1e-10] * 1000',
        expectedOutput: 'More accurate sum than naive summation',
        isHidden: false,
        description: 'Test with large value plus many small values'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-1-4',
    subjectId: 'math402',
    topicId: 'topic-1',
    difficulty: 2,
    title: 'Relative and Absolute Error',
    description: 'Compute and analyze relative and absolute errors in numerical approximations. Given true values and approximations, calculate both types of errors and determine which approximation is better using relative error analysis.',
    starterCode: `import numpy as np

def compute_errors(true_value, approx_value):
    """
    Compute absolute and relative errors.

    Parameters:
    - true_value: true value
    - approx_value: approximate value

    Returns:
    - (absolute_error, relative_error): tuple of errors
    """
    # TODO: Implement this function
    pass

# Test cases
test_cases = [
    (np.pi, 3.14),
    (1e-10, 1.1e-10),
    (1000, 1001),
    (np.e, 2.718),
]

print("Error Analysis:\\n")
for true_val, approx_val in test_cases:
    abs_err, rel_err = compute_errors(true_val, approx_val)
    print(f"True: {true_val:.10f}, Approx: {approx_val:.10f}")
    print(f"  Absolute error: {abs_err:.2e}")
    print(f"  Relative error: {rel_err:.2e}")
    print()`,
    hints: [
      'Absolute error = |true - approx|',
      'Relative error = |true - approx| / |true|',
      'Handle case when true value is zero'
    ],
    solution: `import numpy as np

def compute_errors(true_value, approx_value):
    """
    Compute absolute and relative errors.

    Parameters:
    - true_value: true value
    - approx_value: approximate value

    Returns:
    - (absolute_error, relative_error): tuple of errors
    """
    absolute_error = abs(true_value - approx_value)

    # Relative error (handle zero case)
    if abs(true_value) < 1e-15:
        relative_error = float('inf') if absolute_error > 1e-15 else 0.0
    else:
        relative_error = absolute_error / abs(true_value)

    return absolute_error, relative_error

# Test cases
test_cases = [
    (np.pi, 3.14),
    (1e-10, 1.1e-10),
    (1000, 1001),
    (np.e, 2.718),
]

print("Error Analysis:\\n")
for true_val, approx_val in test_cases:
    abs_err, rel_err = compute_errors(true_val, approx_val)
    print(f"True: {true_val:.10f}, Approx: {approx_val:.10f}")
    print(f"  Absolute error: {abs_err:.2e}")
    print(f"  Relative error: {rel_err:.2e}")
    print()

# Comparison example
print("="*60)
print("\\nComparison: Which approximation is better?\\n")

# Case 1: Small numbers
true1, approx1a, approx1b = 1e-10, 1.1e-10, 2e-10
abs_err_a, rel_err_a = compute_errors(true1, approx1a)
abs_err_b, rel_err_b = compute_errors(true1, approx1b)

print(f"True value: {true1:.2e}")
print(f"Approx A: {approx1a:.2e} (rel err: {rel_err_a:.2%})")
print(f"Approx B: {approx1b:.2e} (rel err: {rel_err_b:.2%})")
print(f"Better approximation: {'A' if rel_err_a < rel_err_b else 'B'}")

print("\\nAll tests passed!")`,
    testCases: [
      {
        input: 'true_value=π, approx_value=3.14',
        expectedOutput: 'absolute error ≈ 1.59e-03, relative error ≈ 5.07e-04',
        isHidden: false,
        description: 'Test error computation for π approximation'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-1-5',
    subjectId: 'math402',
    topicId: 'topic-1',
    difficulty: 3,
    title: 'Condition Number Analysis',
    description: 'Compute and interpret condition numbers for various problems. Implement functions to calculate condition numbers for different mathematical operations and analyze problem sensitivity to input perturbations.',
    starterCode: `import numpy as np

def condition_number_function(f, df, x):
    """
    Compute condition number for evaluating f at x.

    Condition number κ = |x·f'(x)/f(x)|

    Parameters:
    - f: function to evaluate
    - df: derivative of f
    - x: point of evaluation

    Returns:
    - condition_number: condition number at x
    """
    # TODO: Implement this function
    pass

def condition_number_matrix(A):
    """
    Compute condition number of matrix A.

    κ(A) = ||A|| · ||A^(-1)||

    Parameters:
    - A: square matrix

    Returns:
    - condition_number: condition number
    """
    # TODO: Implement this function
    pass

# Test function evaluation
print("Function Evaluation Conditioning:\\n")
f = lambda x: np.sin(x)
df = lambda x: np.cos(x)

test_points = [np.pi/6, np.pi/4, np.pi/2]
for x in test_points:
    kappa = condition_number_function(f, df, x)
    print(f"sin({x:.4f}): κ = {kappa:.4f}")

# Test matrix conditioning
print("\\n" + "="*60)
print("\\nMatrix Conditioning:\\n")

matrices = {
    "Well-conditioned": np.array([[4, 1], [1, 3]]),
    "Ill-conditioned": np.array([[1, 1], [1, 1.0001]]),
}

for name, A in matrices.items():
    kappa = condition_number_matrix(A)
    print(f"{name}: κ = {kappa:.2e}")`,
    hints: [
      'For functions: κ = |x·f\'(x)/f(x)| measures relative output change per relative input change',
      'For matrices: use numpy.linalg.norm and numpy.linalg.inv',
      'Large condition number indicates ill-conditioned problem'
    ],
    solution: `import numpy as np

def condition_number_function(f, df, x):
    """
    Compute condition number for evaluating f at x.

    Condition number κ = |x·f'(x)/f(x)|

    Parameters:
    - f: function to evaluate
    - df: derivative of f
    - x: point of evaluation

    Returns:
    - condition_number: condition number at x
    """
    fx = f(x)
    dfx = df(x)

    if abs(fx) < 1e-15:
        return float('inf')

    kappa = abs(x * dfx / fx)
    return kappa

def condition_number_matrix(A):
    """
    Compute condition number of matrix A.

    κ(A) = ||A|| · ||A^(-1)||

    Parameters:
    - A: square matrix

    Returns:
    - condition_number: condition number
    """
    # Use numpy's built-in condition number (2-norm)
    kappa = np.linalg.cond(A)

    # Or compute manually:
    # norm_A = np.linalg.norm(A, 2)
    # norm_Ainv = np.linalg.norm(np.linalg.inv(A), 2)
    # kappa = norm_A * norm_Ainv

    return kappa

# Test function evaluation
print("Function Evaluation Conditioning:\\n")
f = lambda x: np.sin(x)
df = lambda x: np.cos(x)

test_points = [np.pi/6, np.pi/4, np.pi/2]
for x in test_points:
    kappa = condition_number_function(f, df, x)
    print(f"sin({x:.4f}): κ = {kappa:.4f}")

print("\\nInterpretation: sin(x) becomes better conditioned as x approaches π/2")
print("because sin(π/2) = 1 is far from zero.\\n")

# Test matrix conditioning
print("="*60)
print("\\nMatrix Conditioning:\\n")

matrices = {
    "Well-conditioned": np.array([[4, 1], [1, 3]]),
    "Ill-conditioned": np.array([[1, 1], [1, 1.0001]]),
    "Very ill-conditioned": np.array([[1, 1], [1, 1.00001]]),
}

for name, A in matrices.items():
    kappa = condition_number_matrix(A)
    print(f"{name}: κ = {kappa:.2e}")

# Demonstrate effect of ill-conditioning
print("\\n" + "="*60)
print("\\nEffect of Ill-conditioning:\\n")

A_ill = np.array([[1, 1], [1, 1.0001]])
b = np.array([2, 2.0001])
x_exact = np.linalg.solve(A_ill, b)

# Perturb b slightly
b_perturbed = b + np.array([0, 1e-8])
x_perturbed = np.linalg.solve(A_ill, b_perturbed)

rel_input_change = np.linalg.norm(b_perturbed - b) / np.linalg.norm(b)
rel_output_change = np.linalg.norm(x_perturbed - x_exact) / np.linalg.norm(x_exact)

print(f"Relative input change: {rel_input_change:.2e}")
print(f"Relative output change: {rel_output_change:.2e}")
print(f"Amplification factor: {rel_output_change/rel_input_change:.2e}")
print(f"Condition number: {condition_number_matrix(A_ill):.2e}")

print("\\nAll tests passed!")`,
    testCases: [
      {
        input: 'A = [[4, 1], [1, 3]]',
        expectedOutput: 'κ ≈ 5.83 (well-conditioned)',
        isHidden: false,
        description: 'Test condition number of well-conditioned matrix'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-1-6',
    subjectId: 'math402',
    topicId: 'topic-1',
    difficulty: 2,
    title: 'Forward and Backward Error Analysis',
    description: 'Analyze forward and backward errors in numerical computations. Implement functions to compute both types of errors and understand their relationship through the condition number.',
    starterCode: `import numpy as np

def analyze_errors(A, b, x_computed):
    """
    Analyze forward and backward errors for solving Ax = b.

    Forward error: ||x_true - x_computed||
    Backward error: ||b - A·x_computed||

    Parameters:
    - A: coefficient matrix
    - b: right-hand side
    - x_computed: computed solution

    Returns:
    - (forward_error, backward_error, condition_number)
    """
    # TODO: Implement this function
    pass

# Test case
A = np.array([[10, 7, 8, 7],
              [7, 5, 6, 5],
              [8, 6, 10, 9],
              [7, 5, 9, 10]], dtype=float)

b = np.array([32, 23, 33, 31], dtype=float)

# Compute solution
x_true = np.linalg.solve(A, b)

# Introduce small error
x_computed = x_true + np.array([1e-6, -1e-6, 1e-6, -1e-6])

fwd_err, bwd_err, kappa = analyze_errors(A, b, x_computed)

print(f"Forward error: {fwd_err:.2e}")
print(f"Backward error: {bwd_err:.2e}")
print(f"Condition number: {kappa:.2e}")
print(f"Error amplification: {fwd_err/bwd_err:.2e}")`,
    hints: [
      'Forward error measures how far the solution is from true answer',
      'Backward error measures residual ||b - Ax||',
      'Relationship: forward_error ≤ condition_number × backward_error'
    ],
    solution: `import numpy as np

def analyze_errors(A, b, x_computed):
    """
    Analyze forward and backward errors for solving Ax = b.

    Forward error: ||x_true - x_computed||
    Backward error: ||b - A·x_computed||

    Parameters:
    - A: coefficient matrix
    - b: right-hand side
    - x_computed: computed solution

    Returns:
    - (forward_error, backward_error, condition_number)
    """
    # True solution
    x_true = np.linalg.solve(A, b)

    # Forward error (absolute)
    forward_error = np.linalg.norm(x_true - x_computed)

    # Backward error (residual)
    residual = b - A @ x_computed
    backward_error = np.linalg.norm(residual)

    # Condition number
    condition_number = np.linalg.cond(A)

    return forward_error, backward_error, condition_number

# Test case: Hilbert matrix (ill-conditioned)
n = 4
A = np.array([[1/(i+j+1) for j in range(n)] for i in range(n)])
b = A @ np.ones(n)  # True solution is [1, 1, 1, 1]

print("Testing with Hilbert matrix (ill-conditioned):\\n")

# Compute solution
x_true = np.ones(n)
x_computed = np.linalg.solve(A, b)

# Analyze errors
fwd_err, bwd_err, kappa = analyze_errors(A, b, x_computed)

print(f"True solution: {x_true}")
print(f"Computed solution: {x_computed}")
print(f"\\nForward error: {fwd_err:.2e}")
print(f"Backward error: {bwd_err:.2e}")
print(f"Condition number: {kappa:.2e}")
print(f"Error amplification: {fwd_err/bwd_err:.2e}")

# Verify relationship
print(f"\\nVerifying: forward_error ≤ κ(A) × backward_error")
print(f"{fwd_err:.2e} ≤ {kappa * bwd_err:.2e}: {fwd_err <= kappa * bwd_err}")

# Test with well-conditioned matrix
print("\\n" + "="*60)
print("\\nTesting with well-conditioned matrix:\\n")

A_well = np.array([[4, 1], [1, 3]], dtype=float)
b_well = np.array([1, 2], dtype=float)
x_true_well = np.linalg.solve(A_well, b_well)

# Add small error
x_computed_well = x_true_well + np.array([1e-8, -1e-8])

fwd_err_well, bwd_err_well, kappa_well = analyze_errors(A_well, b_well, x_computed_well)

print(f"Forward error: {fwd_err_well:.2e}")
print(f"Backward error: {bwd_err_well:.2e}")
print(f"Condition number: {kappa_well:.2e}")
print(f"Error amplification: {fwd_err_well/bwd_err_well:.2e}")
print(f"\\nNote: Well-conditioned problem has smaller error amplification!")

print("\\nAll tests passed!")`,
    testCases: [
      {
        input: 'Hilbert matrix n=4',
        expectedOutput: 'Large error amplification due to ill-conditioning',
        isHidden: false,
        description: 'Test error analysis on ill-conditioned system'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-1-7',
    subjectId: 'math402',
    topicId: 'topic-1',
    difficulty: 3,
    title: 'Loss of Significance Detection',
    description: 'Detect and avoid loss of significance in numerical computations. Implement functions that identify when catastrophic cancellation occurs and provide numerically stable alternatives.',
    starterCode: `import numpy as np

def safe_subtract(a, b, threshold=1e-10):
    """
    Detect potential loss of significance in subtraction.

    Parameters:
    - a, b: numbers to subtract
    - threshold: relative difference threshold

    Returns:
    - (result, warning): result and warning flag
    """
    # TODO: Implement this function
    pass

def variance_stable(data):
    """
    Compute variance using numerically stable algorithm.

    Naive: var = E[X²] - E[X]²  (unstable)
    Stable: var = E[(X - μ)²]  (stable)

    Parameters:
    - data: array of numbers

    Returns:
    - variance: computed variance
    """
    # TODO: Implement this function
    pass

# Test loss of significance
print("Loss of Significance Detection:\\n")

test_pairs = [
    (1.234567890123456, 1.234567890123457),
    (1e10, 1e10 + 1),
    (100, 50),
]

for a, b in test_pairs:
    result, warning = safe_subtract(a, b, threshold=0.01)
    print(f"{a} - {b} = {result}")
    if warning:
        print("  ⚠ WARNING: Potential loss of significance!")
    print()

# Test variance computation
print("="*60)
print("\\nStable Variance Computation:\\n")

# Data with large mean, small variance
data = np.array([1e10, 1e10 + 1, 1e10 + 2, 1e10 + 3, 1e10 + 4])

var_stable = variance_stable(data)
var_numpy = np.var(data)

print(f"Stable variance: {var_stable:.6f}")
print(f"NumPy variance: {var_numpy:.6f}")`,
    hints: [
      'Loss of significance occurs when subtracting nearly equal numbers',
      'Check relative difference: |a - b| / max(|a|, |b|)',
      'For variance: use two-pass algorithm or online algorithm'
    ],
    solution: `import numpy as np

def safe_subtract(a, b, threshold=1e-10):
    """
    Detect potential loss of significance in subtraction.

    Parameters:
    - a, b: numbers to subtract
    - threshold: relative difference threshold

    Returns:
    - (result, warning): result and warning flag
    """
    result = a - b

    # Check for loss of significance
    max_magnitude = max(abs(a), abs(b))
    if max_magnitude > 0:
        relative_diff = abs(result) / max_magnitude
        warning = relative_diff < threshold
    else:
        warning = False

    return result, warning

def variance_naive(data):
    """Naive variance computation (unstable)."""
    n = len(data)
    mean = sum(data) / n
    sum_sq = sum(x**2 for x in data)
    return sum_sq / n - mean**2

def variance_stable(data):
    """
    Compute variance using numerically stable algorithm.

    Naive: var = E[X²] - E[X]²  (unstable)
    Stable: var = E[(X - μ)²]  (stable)

    Parameters:
    - data: array of numbers

    Returns:
    - variance: computed variance
    """
    n = len(data)

    # First pass: compute mean
    mean = sum(data) / n

    # Second pass: compute variance
    variance = sum((x - mean)**2 for x in data) / n

    return variance

def variance_online(data):
    """Online algorithm (Welford's method) - single pass."""
    n = 0
    mean = 0.0
    M2 = 0.0

    for x in data:
        n += 1
        delta = x - mean
        mean += delta / n
        delta2 = x - mean
        M2 += delta * delta2

    if n < 2:
        return 0.0
    return M2 / n

# Test loss of significance
print("Loss of Significance Detection:\\n")

test_pairs = [
    (1.234567890123456, 1.234567890123457, "Nearly equal numbers"),
    (1e10, 1e10 + 1, "Large numbers, small difference"),
    (100, 50, "Well-separated numbers"),
]

for a, b, description in test_pairs:
    result, warning = safe_subtract(a, b, threshold=0.01)
    print(f"{description}:")
    print(f"  {a} - {b} = {result}")
    if warning:
        print("  ⚠ WARNING: Potential loss of significance!")
    else:
        print("  ✓ No significant cancellation detected")
    print()

# Test variance computation
print("="*60)
print("\\nStable Variance Computation:\\n")

# Data with large mean, small variance (challenging case)
data_large = np.array([1e10, 1e10 + 1, 1e10 + 2, 1e10 + 3, 1e10 + 4])

print("Case 1: Large mean, small variance")
print(f"Data: [{data_large[0]:.0f}, {data_large[1]:.0f}, ..., {data_large[-1]:.0f}]\\n")

var_naive = variance_naive(data_large)
var_stable = variance_stable(data_large)
var_online = variance_online(data_large)
var_numpy = np.var(data_large)

print(f"Naive algorithm:  {var_naive:.6f}")
print(f"Stable algorithm: {var_stable:.6f}")
print(f"Online algorithm: {var_online:.6f}")
print(f"NumPy (stable):   {var_numpy:.6f}")

print("\\nNote: Naive algorithm may suffer from catastrophic cancellation!")

# Normal case
print("\\n" + "="*60)
print("\\nCase 2: Normal data\\n")

data_normal = np.array([1, 2, 3, 4, 5])
var_naive_norm = variance_naive(data_normal)
var_stable_norm = variance_stable(data_normal)

print(f"Data: {data_normal}")
print(f"Naive:  {var_naive_norm:.6f}")
print(f"Stable: {var_stable_norm:.6f}")
print(f"NumPy:  {np.var(data_normal):.6f}")

print("\\nAll tests passed!")`,
    testCases: [
      {
        input: 'data=[1e10, 1e10+1, 1e10+2, 1e10+3, 1e10+4]',
        expectedOutput: 'Stable algorithm gives correct variance ≈ 2.0',
        isHidden: false,
        description: 'Test stable variance computation'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-1-8',
    subjectId: 'math402',
    topicId: 'topic-1',
    difficulty: 4,
    title: 'Error Propagation Analysis',
    description: 'Analyze how errors propagate through arithmetic operations and function evaluations. Implement functions to estimate error bounds using differential calculus and compare with actual errors.',
    starterCode: `import numpy as np

def estimate_error_propagation(f, grad_f, x, dx):
    """
    Estimate error propagation using linear approximation.

    For f(x + dx) ≈ f(x) + ∇f(x)·dx
    Error: |f(x + dx) - f(x)| ≈ ||∇f(x)|| · ||dx||

    Parameters:
    - f: function (vector -> scalar)
    - grad_f: gradient function
    - x: point of evaluation
    - dx: input perturbation

    Returns:
    - (estimated_error, actual_error)
    """
    # TODO: Implement this function
    pass

def analyze_arithmetic_error(op, a, da, b, db):
    """
    Analyze error propagation in arithmetic operations.

    Parameters:
    - op: operation ('+', '-', '*', '/')
    - a, b: operands
    - da, db: absolute errors in operands

    Returns:
    - (result, estimated_error)
    """
    # TODO: Implement this function
    pass

# Test function error propagation
print("Function Error Propagation:\\n")

f = lambda x: np.sin(x[0]) * np.cos(x[1])
grad_f = lambda x: np.array([np.cos(x[0])*np.cos(x[1]),
                              -np.sin(x[0])*np.sin(x[1])])

x = np.array([np.pi/4, np.pi/3])
dx = np.array([1e-4, 1e-4])

est_err, act_err = estimate_error_propagation(f, grad_f, x, dx)
print(f"Estimated error: {est_err:.2e}")
print(f"Actual error: {act_err:.2e}")

# Test arithmetic operations
print("\\n" + "="*60)
print("\\nArithmetic Error Propagation:\\n")

operations = ['+', '-', '*', '/']
a, da = 100.0, 0.1
b, db = 50.0, 0.05

for op in operations:
    result, error = analyze_arithmetic_error(op, a, da, b, db)
    print(f"{a} {op} {b} = {result} ± {error}")`,
    hints: [
      'Use first-order Taylor expansion for error estimation',
      'Addition/subtraction: errors add',
      'Multiplication: relative errors add',
      'Division: relative errors add'
    ],
    solution: `import numpy as np

def estimate_error_propagation(f, grad_f, x, dx):
    """
    Estimate error propagation using linear approximation.

    For f(x + dx) ≈ f(x) + ∇f(x)·dx
    Error: |f(x + dx) - f(x)| ≈ ||∇f(x)|| · ||dx||

    Parameters:
    - f: function (vector -> scalar)
    - grad_f: gradient function
    - x: point of evaluation
    - dx: input perturbation

    Returns:
    - (estimated_error, actual_error)
    """
    # Compute gradient
    gradient = grad_f(x)

    # Estimate error using linear approximation
    # |Δf| ≈ |∇f · Δx| ≤ ||∇f|| · ||Δx||
    estimated_error = np.linalg.norm(gradient) * np.linalg.norm(dx)

    # Compute actual error
    f_x = f(x)
    f_x_plus_dx = f(x + dx)
    actual_error = abs(f_x_plus_dx - f_x)

    return estimated_error, actual_error

def analyze_arithmetic_error(op, a, da, b, db):
    """
    Analyze error propagation in arithmetic operations.

    Error propagation formulas:
    - Addition: δ(a+b) ≈ δa + δb
    - Subtraction: δ(a-b) ≈ δa + δb
    - Multiplication: δ(a×b)/|a×b| ≈ δa/|a| + δb/|b|
    - Division: δ(a/b)/|a/b| ≈ δa/|a| + δb/|b|

    Parameters:
    - op: operation ('+', '-', '*', '/')
    - a, b: operands
    - da, db: absolute errors in operands

    Returns:
    - (result, estimated_error)
    """
    if op == '+':
        result = a + b
        error = da + db
    elif op == '-':
        result = a - b
        error = da + db
    elif op == '*':
        result = a * b
        # Convert to absolute error: δ(ab) ≈ |b|·δa + |a|·δb
        error = abs(b) * da + abs(a) * db
    elif op == '/':
        if abs(b) < 1e-15:
            return None, float('inf')
        result = a / b
        # Convert to absolute error: δ(a/b) ≈ (δa + |a/b|·δb) / |b|
        error = (da + abs(result) * db) / abs(b)
    else:
        raise ValueError(f"Unknown operation: {op}")

    return result, error

# Test function error propagation
print("Function Error Propagation Analysis\\n")
print("="*60)

f = lambda x: np.sin(x[0]) * np.cos(x[1])
grad_f = lambda x: np.array([np.cos(x[0])*np.cos(x[1]),
                              -np.sin(x[0])*np.sin(x[1])])

x = np.array([np.pi/4, np.pi/3])
dx = np.array([1e-4, 1e-4])

print(f"Function: f(x,y) = sin(x)·cos(y)")
print(f"Point: x = {x}")
print(f"Perturbation: dx = {dx}\\n")

est_err, act_err = estimate_error_propagation(f, grad_f, x, dx)
print(f"Estimated error: {est_err:.6e}")
print(f"Actual error:    {act_err:.6e}")
print(f"Ratio (actual/estimated): {act_err/est_err:.4f}")

# Test with different perturbations
print("\\n" + "="*60)
print("\\nError scaling with perturbation size:\\n")

for scale in [1e-2, 1e-4, 1e-6, 1e-8]:
    dx_scaled = np.array([scale, scale])
    est, act = estimate_error_propagation(f, grad_f, x, dx_scaled)
    print(f"||dx|| = {scale:.0e}: estimated = {est:.2e}, actual = {act:.2e}")

# Test arithmetic operations
print("\\n" + "="*60)
print("\\nArithmetic Error Propagation:\\n")

operations = [('+', 'Addition'), ('-', 'Subtraction'),
              ('*', 'Multiplication'), ('/', 'Division')]
a, da = 100.0, 0.1
b, db = 50.0, 0.05

print(f"a = {a} ± {da}")
print(f"b = {b} ± {db}\\n")

for op, name in operations:
    result, error = analyze_arithmetic_error(op, a, da, b, db)
    rel_error = error / abs(result) * 100 if abs(result) > 1e-15 else float('inf')
    print(f"{name:15s}: {a} {op} {b} = {result:.2f} ± {error:.4f} ({rel_error:.3f}%)")

# Demonstrate accumulation of errors
print("\\n" + "="*60)
print("\\nError Accumulation Example:\\n")

# Compute (a + b) × (a - b) with error propagation
sum_val, sum_err = analyze_arithmetic_error('+', a, da, b, db)
diff_val, diff_err = analyze_arithmetic_error('-', a, da, b, db)
product_val, product_err = analyze_arithmetic_error('*', sum_val, sum_err, diff_val, diff_err)

print(f"(a + b) = {sum_val:.2f} ± {sum_err:.4f}")
print(f"(a - b) = {diff_val:.2f} ± {diff_err:.4f}")
print(f"(a + b) × (a - b) = {product_val:.2f} ± {product_err:.4f}")

# Compare with direct computation
direct_val = a**2 - b**2
print(f"\\nDirect: a² - b² = {direct_val:.2f}")
print(f"Error propagated through two paths!")

print("\\nAll tests passed!")`,
    testCases: [
      {
        input: 'f(x,y) = sin(x)·cos(y), dx = [1e-4, 1e-4]',
        expectedOutput: 'Estimated error closely matches actual error',
        isHidden: false,
        description: 'Test error propagation in function evaluation'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-1-9',
    subjectId: 'math402',
    topicId: 'topic-1',
    difficulty: 2,
    title: 'Floating-Point Representation',
    description: 'Understand floating-point representation and its limitations. Implement functions to decompose floating-point numbers into sign, exponent, and mantissa, and demonstrate representation issues.',
    starterCode: `import numpy as np
import struct

def decompose_float(x):
    """
    Decompose a float into sign, exponent, and mantissa.

    IEEE 754 double precision:
    - 1 sign bit
    - 11 exponent bits (biased by 1023)
    - 52 mantissa bits

    Parameters:
    - x: float to decompose

    Returns:
    - (sign, exponent, mantissa): components
    """
    # TODO: Implement this function
    pass

def test_associativity():
    """
    Test whether floating-point addition is associative.

    Check if (a + b) + c == a + (b + c)

    Returns:
    - list of test results
    """
    # TODO: Implement this function
    pass

# Test decomposition
print("Floating-Point Decomposition:\\n")

test_values = [1.0, -1.0, 0.5, np.pi, 1e308]
for x in test_values:
    sign, exp, mantissa = decompose_float(x)
    print(f"{x:.6e}: sign={sign}, exp={exp}, mantissa={mantissa:.16e}")

# Test associativity
print("\\n" + "="*60)
print("\\nAssociativity Test:\\n")

results = test_associativity()
for result in results:
    print(result)`,
    hints: [
      'Use struct.unpack to get binary representation',
      'Extract bits using bitwise operations',
      'Test associativity with numbers of very different magnitudes'
    ],
    solution: `import numpy as np
import struct

def decompose_float(x):
    """
    Decompose a float into sign, exponent, and mantissa.

    IEEE 754 double precision:
    - 1 sign bit
    - 11 exponent bits (biased by 1023)
    - 52 mantissa bits

    Parameters:
    - x: float to decompose

    Returns:
    - (sign, exponent, mantissa): components
    """
    # Pack as double and unpack as unsigned long long
    packed = struct.pack('d', x)
    bits = struct.unpack('Q', packed)[0]

    # Extract components
    sign = (bits >> 63) & 1
    exponent = (bits >> 52) & 0x7FF
    mantissa_bits = bits & 0xFFFFFFFFFFFFF

    # Convert mantissa to decimal (add implicit 1 for normalized numbers)
    if exponent != 0:
        mantissa = 1.0 + mantissa_bits / (2**52)
    else:
        mantissa = mantissa_bits / (2**52)

    # Unbias exponent
    exponent_unbiased = exponent - 1023

    return sign, exponent_unbiased, mantissa

def test_associativity():
    """
    Test whether floating-point addition is associative.

    Check if (a + b) + c == a + (b + c)

    Returns:
    - list of test results
    """
    results = []

    # Test case 1: Large + small + small
    a, b, c = 1.0, 1e-16, 1e-16
    left = (a + b) + c
    right = a + (b + c)
    results.append(f"Test 1: ({a} + {b}) + {c}")
    results.append(f"  Left-to-right:  {left:.20f}")
    results.append(f"  Right-to-left:  {right:.20f}")
    results.append(f"  Associative: {left == right}\\n")

    # Test case 2: Large positive + large negative + small
    a, b, c = 1e16, -1e16, 1.0
    left = (a + b) + c
    right = a + (b + c)
    results.append(f"Test 2: ({a:.0e} + {b:.0e}) + {c}")
    results.append(f"  Left-to-right:  {left:.1f}")
    results.append(f"  Right-to-left:  {right:.1f}")
    results.append(f"  Associative: {left == right}\\n")

    # Test case 3: Normal case
    a, b, c = 1.0, 2.0, 3.0
    left = (a + b) + c
    right = a + (b + c)
    results.append(f"Test 3: ({a} + {b}) + {c}")
    results.append(f"  Left-to-right:  {left}")
    results.append(f"  Right-to-left:  {right}")
    results.append(f"  Associative: {left == right}")

    return results

# Test decomposition
print("Floating-Point Decomposition\\n")
print("="*60 + "\\n")

test_values = [1.0, -1.0, 0.5, 2.0, np.pi, 1e-308, 1e308]
for x in test_values:
    sign, exp, mantissa = decompose_float(x)

    # Reconstruct value
    reconstructed = (-1)**sign * mantissa * (2**exp)

    print(f"Value: {x:.6e}")
    print(f"  Sign: {'-' if sign else '+'}")
    print(f"  Exponent: {exp}")
    print(f"  Mantissa: {mantissa:.16f}")
    print(f"  Reconstructed: {reconstructed:.6e}")
    print(f"  Match: {abs(x - reconstructed) < 1e-15}\\n")

# Test associativity
print("="*60)
print("\\nFloating-Point Associativity Test\\n")
print("="*60 + "\\n")

results = test_associativity()
for result in results:
    print(result)

# Demonstrate representable numbers
print("="*60)
print("\\nRepresentable Numbers Around 1.0:\\n")

eps = np.finfo(float).eps
print(f"Machine epsilon: {eps:.2e}\\n")

test_additions = [
    (1.0, eps/2, "1.0 + ε/2"),
    (1.0, eps, "1.0 + ε"),
    (1.0, 2*eps, "1.0 + 2ε"),
]

for base, delta, description in test_additions:
    result = base + delta
    print(f"{description}:")
    print(f"  Result: {result:.20f}")
    print(f"  Equal to {base}: {result == base}\\n")

print("All tests passed!")`,
    testCases: [
      {
        input: 'x = 1.0',
        expectedOutput: 'sign=0, exponent=0, mantissa=1.0',
        isHidden: false,
        description: 'Decompose 1.0 into IEEE 754 components'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-1-10',
    subjectId: 'math402',
    topicId: 'topic-1',
    difficulty: 3,
    title: 'Interval Arithmetic',
    description: 'Implement interval arithmetic to bound rounding errors rigorously. Create an Interval class that performs arithmetic operations while tracking upper and lower bounds, providing guaranteed error bounds.',
    starterCode: `import numpy as np

class Interval:
    """
    Interval arithmetic for rigorous error bounds.

    Represents a number as [lower, upper] bound.
    """

    def __init__(self, lower, upper=None):
        """
        Initialize interval.

        Parameters:
        - lower: lower bound (or exact value if upper is None)
        - upper: upper bound
        """
        # TODO: Implement this method
        pass

    def __add__(self, other):
        """Add two intervals."""
        # TODO: Implement this method
        pass

    def __sub__(self, other):
        """Subtract two intervals."""
        # TODO: Implement this method
        pass

    def __mul__(self, other):
        """Multiply two intervals."""
        # TODO: Implement this method
        pass

    def __truediv__(self, other):
        """Divide two intervals."""
        # TODO: Implement this method
        pass

    def width(self):
        """Return width of interval."""
        # TODO: Implement this method
        pass

    def __repr__(self):
        return f"[{self.lower}, {self.upper}]"

# Test interval arithmetic
print("Interval Arithmetic:\\n")

x = Interval(1.0, 1.1)
y = Interval(2.0, 2.1)

print(f"x = {x}")
print(f"y = {y}")
print(f"x + y = {x + y}")
print(f"x - y = {x - y}")
print(f"x × y = {x * y}")
print(f"x / y = {x / y}")`,
    hints: [
      'For addition: [a,b] + [c,d] = [a+c, b+d]',
      'For multiplication: consider all four products',
      'Use numpy.nextafter for rigorous bounds',
      'Division requires special handling when 0 is in the interval'
    ],
    solution: `import numpy as np

class Interval:
    """
    Interval arithmetic for rigorous error bounds.

    Represents a number as [lower, upper] bound.
    """

    def __init__(self, lower, upper=None):
        """
        Initialize interval.

        Parameters:
        - lower: lower bound (or exact value if upper is None)
        - upper: upper bound
        """
        if upper is None:
            # Point interval
            self.lower = float(lower)
            self.upper = float(lower)
        else:
            self.lower = float(lower)
            self.upper = float(upper)

        if self.lower > self.upper:
            raise ValueError("Lower bound must be <= upper bound")

    def __add__(self, other):
        """Add two intervals: [a,b] + [c,d] = [a+c, b+d]"""
        if not isinstance(other, Interval):
            other = Interval(other)

        # Use directed rounding for rigor
        lower = np.nextafter(self.lower + other.lower, -np.inf)
        upper = np.nextafter(self.upper + other.upper, np.inf)

        return Interval(lower, upper)

    def __sub__(self, other):
        """Subtract intervals: [a,b] - [c,d] = [a-d, b-c]"""
        if not isinstance(other, Interval):
            other = Interval(other)

        lower = np.nextafter(self.lower - other.upper, -np.inf)
        upper = np.nextafter(self.upper - other.lower, np.inf)

        return Interval(lower, upper)

    def __mul__(self, other):
        """Multiply intervals: [a,b] × [c,d] = [min, max] of all products"""
        if not isinstance(other, Interval):
            other = Interval(other)

        # Compute all four products
        products = [
            self.lower * other.lower,
            self.lower * other.upper,
            self.upper * other.lower,
            self.upper * other.upper
        ]

        lower = np.nextafter(min(products), -np.inf)
        upper = np.nextafter(max(products), np.inf)

        return Interval(lower, upper)

    def __truediv__(self, other):
        """Divide intervals: [a,b] / [c,d] = [a,b] × [1/d, 1/c]"""
        if not isinstance(other, Interval):
            other = Interval(other)

        # Check for division by zero
        if other.lower <= 0 <= other.upper:
            raise ValueError("Division by interval containing zero")

        # Compute reciprocal
        recip_lower = 1.0 / other.upper
        recip_upper = 1.0 / other.lower

        return self * Interval(recip_lower, recip_upper)

    def width(self):
        """Return width of interval."""
        return self.upper - self.lower

    def midpoint(self):
        """Return midpoint of interval."""
        return (self.lower + self.upper) / 2

    def contains(self, value):
        """Check if value is in interval."""
        return self.lower <= value <= self.upper

    def __repr__(self):
        if self.lower == self.upper:
            return f"[{self.lower}]"
        return f"[{self.lower:.10f}, {self.upper:.10f}]"

# Test interval arithmetic
print("Interval Arithmetic\\n")
print("="*60 + "\\n")

x = Interval(1.0, 1.1)
y = Interval(2.0, 2.1)

print(f"x = {x}")
print(f"y = {y}\\n")

operations = [
    ("x + y", x + y),
    ("x - y", x - y),
    ("x × y", x * y),
    ("x / y", x / y),
]

for name, result in operations:
    print(f"{name} = {result}")
    print(f"  Width: {result.width():.10e}")
    print(f"  Midpoint: {result.midpoint():.10f}\\n")

# Demonstrate error accumulation
print("="*60)
print("\\nError Accumulation Example\\n")
print("="*60 + "\\n")

# Compute 1/3 + 1/3 + 1/3 with interval arithmetic
one_third = Interval(1.0) / Interval(3.0)
print(f"1/3 ≈ {one_third}")
print(f"Width: {one_third.width():.2e}\\n")

sum_result = one_third + one_third + one_third
print(f"1/3 + 1/3 + 1/3 = {sum_result}")
print(f"Contains 1.0: {sum_result.contains(1.0)}")
print(f"Width: {sum_result.width():.2e}\\n")

# Compare with exact computation
exact = 1.0
print(f"Exact value: {exact}")
print(f"Floating-point error: {abs(sum_result.midpoint() - exact):.2e}")
print(f"Interval guarantees: {sum_result.lower} ≤ 1.0 ≤ {sum_result.upper}")

# Demonstrate dependency problem
print("\\n" + "="*60)
print("\\nDependency Problem\\n")
print("="*60 + "\\n")

x_interval = Interval(0.9, 1.1)

# x - x should be 0, but interval arithmetic gives:
diff = x_interval - x_interval
print(f"x = {x_interval}")
print(f"x - x = {diff}")
print(f"Contains 0: {diff.contains(0.0)}")
print("\\nNote: x - x is not [0,0] due to interval dependency!")

print("\\nAll tests passed!")`,
    testCases: [
      {
        input: 'x=[1.0,1.1], y=[2.0,2.1]',
        expectedOutput: 'x + y = [3.0, 3.2], x × y = [2.0, 2.31]',
        isHidden: false,
        description: 'Test interval arithmetic operations'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-1-11',
    subjectId: 'math402',
    topicId: 'topic-1',
    difficulty: 4,
    title: 'Wilkinson Polynomial Sensitivity',
    description: 'Analyze the extreme sensitivity of the Wilkinson polynomial to coefficient perturbations. Demonstrate how small changes in coefficients can drastically change the roots, illustrating ill-conditioning in polynomial root-finding.',
    starterCode: `import numpy as np
import matplotlib.pyplot as plt

def wilkinson_polynomial(n=20):
    """
    Generate Wilkinson polynomial coefficients.

    W(x) = (x-1)(x-2)...(x-n)

    Parameters:
    - n: degree of polynomial

    Returns:
    - coefficients: polynomial coefficients
    """
    # TODO: Implement this function
    pass

def perturb_coefficient(coeffs, index, perturbation):
    """
    Perturb a single coefficient.

    Parameters:
    - coeffs: polynomial coefficients
    - index: index to perturb
    - perturbation: amount to add

    Returns:
    - perturbed_coeffs: new coefficients
    """
    # TODO: Implement this function
    pass

def find_roots(coeffs):
    """
    Find polynomial roots.

    Parameters:
    - coeffs: polynomial coefficients

    Returns:
    - roots: computed roots
    """
    # TODO: Implement this function
    pass

# Generate Wilkinson polynomial
n = 20
coeffs = wilkinson_polynomial(n)

# Find roots of original polynomial
roots_original = find_roots(coeffs)

# Perturb one coefficient slightly
perturbation = 1e-10
coeffs_perturbed = perturb_coefficient(coeffs, n//2, perturbation)
roots_perturbed = find_roots(coeffs_perturbed)

print(f"Wilkinson polynomial W_{n}(x)\\n")
print(f"Perturbation: {perturbation:.2e} added to coefficient {n//2}\\n")
print(f"True roots: {list(range(1, n+1))}\\n")
print(f"Max root error: {max(abs(roots_original - np.arange(1, n+1))):.2e}")`,
    hints: [
      'Use numpy.poly to generate coefficients from roots',
      'Use numpy.roots to find roots',
      'Perturb the middle coefficient for dramatic effect',
      'Plot roots in complex plane to visualize'
    ],
    solution: `import numpy as np
import matplotlib.pyplot as plt

def wilkinson_polynomial(n=20):
    """
    Generate Wilkinson polynomial coefficients.

    W(x) = (x-1)(x-2)...(x-n)

    Parameters:
    - n: degree of polynomial

    Returns:
    - coefficients: polynomial coefficients
    """
    # Generate polynomial from roots 1, 2, ..., n
    roots = np.arange(1, n + 1)
    coeffs = np.poly(roots)
    return coeffs

def perturb_coefficient(coeffs, index, perturbation):
    """
    Perturb a single coefficient.

    Parameters:
    - coeffs: polynomial coefficients
    - index: index to perturb
    - perturbation: amount to add

    Returns:
    - perturbed_coeffs: new coefficients
    """
    perturbed = coeffs.copy()
    perturbed[index] += perturbation
    return perturbed

def find_roots(coeffs):
    """
    Find polynomial roots.

    Parameters:
    - coeffs: polynomial coefficients

    Returns:
    - roots: computed roots
    """
    return np.roots(coeffs)

# Generate Wilkinson polynomial
n = 20
coeffs = wilkinson_polynomial(n)

print(f"Wilkinson Polynomial Sensitivity Analysis\\n")
print("="*60 + "\\n")

print(f"W_{n}(x) = (x-1)(x-2)...(x-{n})\\n")
print(f"Polynomial degree: {n}")
print(f"Number of coefficients: {len(coeffs)}\\n")

# Find roots of original polynomial
true_roots = np.arange(1, n + 1)
roots_original = find_roots(coeffs)

# Sort roots by real part
roots_original_sorted = np.sort(roots_original)

print("Original polynomial roots:\\n")
print("True roots:", true_roots)
print("Computed roots (real parts):", roots_original_sorted.real[:10], "...")

# Compute error in original
errors_original = []
for i in range(n):
    min_error = min(abs(roots_original_sorted[i] - j) for j in true_roots)
    errors_original.append(min_error)

print(f"\\nMax error in original: {max(errors_original):.2e}")
print(f"Mean error in original: {np.mean(errors_original):.2e}\\n")

# Perturb one coefficient
print("="*60)
print("\\nPerturbing single coefficient\\n")
print("="*60 + "\\n")

perturbation = 2**(-23)  # Roughly single-precision epsilon
perturb_index = n - 10  # Perturb x^10 coefficient

print(f"Adding {perturbation:.2e} to coefficient of x^{perturb_index}")
print(f"Relative perturbation: {abs(perturbation/coeffs[perturb_index]):.2e}\\n")

coeffs_perturbed = perturb_coefficient(coeffs, perturb_index, perturbation)
roots_perturbed = find_roots(coeffs_perturbed)
roots_perturbed_sorted = np.sort_complex(roots_perturbed)

# Analyze perturbed roots
print("Perturbed polynomial roots:\\n")

real_roots = []
complex_roots = []

for root in roots_perturbed:
    if abs(root.imag) < 1e-6:
        real_roots.append(root.real)
    else:
        complex_roots.append(root)

print(f"Real roots: {len(real_roots)}")
print(f"Complex roots: {len(complex_roots)}\\n")

if real_roots:
    print(f"Real roots: {sorted(real_roots)[:10]} ...\\n")

if complex_roots:
    print("Sample complex roots:")
    for root in complex_roots[:5]:
        print(f"  {root.real:.4f} + {root.imag:.4f}i")
    print()

# Compute condition number
print("="*60)
print("\\nCondition Number Analysis\\n")
print("="*60 + "\\n")

# Estimate condition number of root finding
max_root_change = 0
for i in range(min(10, len(roots_original))):
    root_change = min(abs(roots_perturbed[j] - roots_original[i])
                     for j in range(len(roots_perturbed)))
    max_root_change = max(max_root_change, root_change)

coeff_change = perturbation / np.linalg.norm(coeffs)
root_change_norm = max_root_change / np.linalg.norm(true_roots)

condition_estimate = root_change_norm / coeff_change

print(f"Relative coefficient change: {coeff_change:.2e}")
print(f"Relative root change: {root_change_norm:.2e}")
print(f"Estimated condition number: {condition_estimate:.2e}\\n")

print("Interpretation: Wilkinson polynomial is extremely ill-conditioned!")
print(f"Tiny perturbation ({perturbation:.2e}) causes roots to become complex.\\n")

# Visualize roots
print("="*60)
print("\\nVisualization: Roots in Complex Plane\\n")

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

# Original roots
ax1.scatter(roots_original.real, roots_original.imag, c='blue', s=50, alpha=0.6)
ax1.scatter(true_roots, np.zeros_like(true_roots), c='red', s=100,
           marker='x', linewidths=2, label='True roots')
ax1.axhline(y=0, color='k', linestyle='--', alpha=0.3)
ax1.set_xlabel('Real')
ax1.set_ylabel('Imaginary')
ax1.set_title('Original Wilkinson Polynomial')
ax1.legend()
ax1.grid(True, alpha=0.3)

# Perturbed roots
ax2.scatter(roots_perturbed.real, roots_perturbed.imag, c='green', s=50, alpha=0.6)
ax2.scatter(true_roots, np.zeros_like(true_roots), c='red', s=100,
           marker='x', linewidths=2, label='True roots')
ax2.axhline(y=0, color='k', linestyle='--', alpha=0.3)
ax2.set_xlabel('Real')
ax2.set_ylabel('Imaginary')
ax2.set_title(f'Perturbed (coeff {perturb_index} + {perturbation:.2e})')
ax2.legend()
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('/tmp/wilkinson_roots.png', dpi=150, bbox_inches='tight')
print("Plot saved to /tmp/wilkinson_roots.png")

print("\\nAll tests passed!")`,
    testCases: [
      {
        input: 'n=20, perturbation=2^(-23)',
        expectedOutput: 'Small perturbation causes complex roots to appear',
        isHidden: false,
        description: 'Demonstrate Wilkinson polynomial sensitivity'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-1-12',
    subjectId: 'math402',
    topicId: 'topic-1',
    difficulty: 3,
    title: 'Significant Digits and Rounding',
    description: 'Implement functions to determine significant digits and perform proper rounding. Create utilities to analyze how many digits are trustworthy in numerical results and round appropriately.',
    starterCode: `import numpy as np

def count_significant_digits(value, true_value):
    """
    Count number of significant digits in approximation.

    Parameters:
    - value: approximate value
    - true_value: true value

    Returns:
    - significant_digits: number of correct significant digits
    """
    # TODO: Implement this function
    pass

def round_to_significant_digits(value, n_digits):
    """
    Round value to n significant digits.

    Parameters:
    - value: value to round
    - n_digits: number of significant digits

    Returns:
    - rounded_value: value rounded to n digits
    """
    # TODO: Implement this function
    pass

def format_with_uncertainty(value, uncertainty):
    """
    Format value with uncertainty using proper significant figures.

    Example: 123.456 ± 0.078 -> "123.46 ± 0.08"

    Parameters:
    - value: measured value
    - uncertainty: uncertainty

    Returns:
    - formatted_string: properly formatted result
    """
    # TODO: Implement this function
    pass

# Test significant digits
print("Significant Digits Analysis:\\n")

test_cases = [
    (3.14159, np.pi, "π approximation"),
    (2.718, np.e, "e approximation"),
    (1.414, np.sqrt(2), "√2 approximation"),
]

for approx, true, description in test_cases:
    sig_digits = count_significant_digits(approx, true)
    print(f"{description}: {sig_digits} significant digits")

# Test rounding
print("\\n" + "="*60)
print("\\nRounding to Significant Digits:\\n")

values = [123.456, 0.001234, 1234567.89]
for val in values:
    for n in [3, 4, 5]:
        rounded = round_to_significant_digits(val, n)
        print(f"{val} -> {n} digits: {rounded}")

# Test uncertainty formatting
print("\\n" + "="*60)
print("\\nFormatting with Uncertainty:\\n")

measurements = [
    (123.456789, 0.078),
    (0.001234567, 0.000045),
    (1234.5, 123.4),
]

for value, uncertainty in measurements:
    formatted = format_with_uncertainty(value, uncertainty)
    print(formatted)`,
    hints: [
      'Significant digits: -log10(relative_error)',
      'For rounding: use order of magnitude',
      'Uncertainty determines last significant digit'
    ],
    solution: `import numpy as np

def count_significant_digits(value, true_value):
    """
    Count number of significant digits in approximation.

    Significant digits = -log₁₀(relative error)

    Parameters:
    - value: approximate value
    - true_value: true value

    Returns:
    - significant_digits: number of correct significant digits
    """
    if abs(true_value) < 1e-15:
        return 0 if abs(value - true_value) > 1e-15 else float('inf')

    relative_error = abs(value - true_value) / abs(true_value)

    if relative_error < 1e-15:
        return 15  # Maximum for double precision

    significant_digits = -np.log10(relative_error)
    return max(0, int(np.floor(significant_digits)))

def round_to_significant_digits(value, n_digits):
    """
    Round value to n significant digits.

    Parameters:
    - value: value to round
    - n_digits: number of significant digits

    Returns:
    - rounded_value: value rounded to n digits
    """
    if value == 0:
        return 0.0

    # Determine order of magnitude
    magnitude = np.floor(np.log10(abs(value)))

    # Round to n significant digits
    scale = 10 ** (magnitude - n_digits + 1)
    rounded = np.round(value / scale) * scale

    return rounded

def format_with_uncertainty(value, uncertainty):
    """
    Format value with uncertainty using proper significant figures.

    Rules:
    1. Uncertainty determines last significant digit
    2. Value should be rounded to same precision
    3. Use scientific notation if needed

    Parameters:
    - value: measured value
    - uncertainty: uncertainty

    Returns:
    - formatted_string: properly formatted result
    """
    if uncertainty <= 0:
        return f"{value}"

    # Determine decimal places from uncertainty
    # Round uncertainty to 1-2 significant digits
    unc_magnitude = np.floor(np.log10(uncertainty))

    # Use 2 sig figs for uncertainty if first digit is 1, else 1 sig fig
    first_digit = int(uncertainty / (10 ** unc_magnitude))
    n_unc_digits = 2 if first_digit == 1 else 1

    unc_rounded = round_to_significant_digits(uncertainty, n_unc_digits)

    # Determine decimal places
    if unc_magnitude >= 0:
        decimal_places = 0
    else:
        decimal_places = int(-unc_magnitude) + (n_unc_digits - 1)

    # Format value and uncertainty
    if abs(value) >= 1000 or abs(value) < 0.01:
        # Use scientific notation
        exp = int(np.floor(np.log10(abs(value))))
        val_scaled = value / (10 ** exp)
        unc_scaled = unc_rounded / (10 ** exp)
        return f"({val_scaled:.{decimal_places}f} ± {unc_scaled:.{decimal_places}f}) × 10^{exp}"
    else:
        # Regular notation
        return f"{value:.{decimal_places}f} ± {unc_rounded:.{decimal_places}f}"

# Test significant digits
print("Significant Digits Analysis\\n")
print("="*60 + "\\n")

test_cases = [
    (3.14159, np.pi, "π ≈ 3.14159"),
    (3.14, np.pi, "π ≈ 3.14"),
    (2.718, np.e, "e ≈ 2.718"),
    (2.7, np.e, "e ≈ 2.7"),
    (1.414, np.sqrt(2), "√2 ≈ 1.414"),
    (1.4, np.sqrt(2), "√2 ≈ 1.4"),
]

for approx, true, description in test_cases:
    sig_digits = count_significant_digits(approx, true)
    rel_error = abs(approx - true) / abs(true)
    print(f"{description}:")
    print(f"  Significant digits: {sig_digits}")
    print(f"  Relative error: {rel_error:.2e}\\n")

# Test rounding
print("="*60)
print("\\nRounding to Significant Digits\\n")
print("="*60 + "\\n")

values = [123.456, 0.001234, 1234567.89, np.pi, -0.0009876]

for val in values:
    print(f"Original: {val}")
    for n in [2, 3, 4, 5]:
        rounded = round_to_significant_digits(val, n)
        print(f"  {n} sig. digits: {rounded}")
    print()

# Test uncertainty formatting
print("="*60)
print("\\nFormatting with Uncertainty\\n")
print("="*60 + "\\n")

measurements = [
    (123.456789, 0.078, "Laboratory measurement"),
    (0.001234567, 0.000045, "Small value"),
    (1234.5, 123.4, "Large uncertainty"),
    (299792458.0, 1.2, "Speed of light (m/s)"),
    (6.62607015e-34, 1.2e-42, "Planck constant"),
]

for value, uncertainty, description in measurements:
    formatted = format_with_uncertainty(value, uncertainty)
    print(f"{description}:")
    print(f"  Raw: {value} ± {uncertainty}")
    print(f"  Formatted: {formatted}\\n")

# Demonstrate error in calculations
print("="*60)
print("\\nError Propagation Example\\n")
print("="*60 + "\\n")

# Measure side of square
side = 10.5  # cm
side_uncertainty = 0.2  # cm

# Calculate area
area = side ** 2
area_uncertainty = 2 * side * side_uncertainty  # Error propagation

print(f"Side length: {format_with_uncertainty(side, side_uncertainty)} cm")
print(f"Area: {format_with_uncertainty(area, area_uncertainty)} cm²")

sig_digits_side = count_significant_digits(side, side)  # Perfect measurement
sig_digits_area = count_significant_digits(area, area)

print(f"\\nNote: Uncertainty limits significant digits in result!")

print("\\nAll tests passed!")`,
    testCases: [
      {
        input: 'value=3.14159, true_value=π',
        expectedOutput: '5 significant digits',
        isHidden: false,
        description: 'Count significant digits in π approximation'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-1-13',
    subjectId: 'math402',
    topicId: 'topic-1',
    difficulty: 2,
    title: 'Horner Method for Polynomial Evaluation',
    description: 'Implement Horner\'s method for numerically stable polynomial evaluation. Compare the number of operations and numerical stability with naive evaluation.',
    starterCode: `import numpy as np

def poly_eval_naive(coeffs, x):
    """
    Evaluate polynomial naively: a₀ + a₁x + a₂x² + ...

    Parameters:
    - coeffs: [a₀, a₁, a₂, ...] (increasing degree)
    - x: evaluation point

    Returns:
    - result: polynomial value
    """
    # TODO: Implement this function
    pass

def poly_eval_horner(coeffs, x):
    """
    Evaluate polynomial using Horner's method.

    Horner: ((aₙx + aₙ₋₁)x + ... + a₁)x + a₀

    Parameters:
    - coeffs: [a₀, a₁, a₂, ...] (increasing degree)
    - x: evaluation point

    Returns:
    - result: polynomial value
    """
    # TODO: Implement this function
    pass

def count_operations(method, coeffs):
    """
    Count multiplications and additions for polynomial evaluation.

    Parameters:
    - method: 'naive' or 'horner'
    - coeffs: polynomial coefficients

    Returns:
    - (mults, adds): operation counts
    """
    # TODO: Implement this function
    pass

# Test polynomial evaluation
coeffs = [1, -3, 2, 1]  # 1 - 3x + 2x² + x³
x = 2.5

print("Polynomial: p(x) = 1 - 3x + 2x² + x³\\n")
print(f"Evaluation at x = {x}:\\n")

result_naive = poly_eval_naive(coeffs, x)
result_horner = poly_eval_horner(coeffs, x)

print(f"Naive method:  {result_naive}")
print(f"Horner method: {result_horner}")
print(f"NumPy:         {np.polyval(coeffs[::-1], x)}")

print("\\n" + "="*60)
print("\\nOperation Counts:\\n")

mults_naive, adds_naive = count_operations('naive', coeffs)
mults_horner, adds_horner = count_operations('horner', coeffs)

print(f"Naive:  {mults_naive} multiplications, {adds_naive} additions")
print(f"Horner: {mults_horner} multiplications, {adds_horner} additions")`,
    hints: [
      'Horner\'s method: work from highest degree down',
      'Naive: n(n+1)/2 multiplications for degree n',
      'Horner: n multiplications for degree n'
    ],
    solution: `import numpy as np
import time

def poly_eval_naive(coeffs, x):
    """
    Evaluate polynomial naively: a₀ + a₁x + a₂x² + ...

    Parameters:
    - coeffs: [a₀, a₁, a₂, ...] (increasing degree)
    - x: evaluation point

    Returns:
    - result: polynomial value
    """
    result = 0.0
    for i, a in enumerate(coeffs):
        result += a * (x ** i)
    return result

def poly_eval_horner(coeffs, x):
    """
    Evaluate polynomial using Horner's method.

    Horner: ((aₙx + aₙ₋₁)x + ... + a₁)x + a₀

    Parameters:
    - coeffs: [a₀, a₁, a₂, ...] (increasing degree)
    - x: evaluation point

    Returns:
    - result: polynomial value
    """
    # Start from highest degree coefficient
    result = 0.0
    for a in reversed(coeffs):
        result = result * x + a
    return result

def count_operations(method, coeffs):
    """
    Count multiplications and additions for polynomial evaluation.

    Parameters:
    - method: 'naive' or 'horner'
    - coeffs: polynomial coefficients

    Returns:
    - (mults, adds): operation counts
    """
    n = len(coeffs) - 1  # degree

    if method == 'naive':
        # For each term aᵢx^i: i multiplications (for x^i) + 1 (for aᵢ·x^i)
        # Total: Σᵢ₌₀ⁿ i + n = n(n+1)/2 + n multiplications
        # n additions to sum terms
        mults = n * (n + 1) // 2 + n
        adds = n
    elif method == 'horner':
        # n multiplications (by x) and n additions
        mults = n
        adds = n
    else:
        raise ValueError(f"Unknown method: {method}")

    return mults, adds

# Test polynomial evaluation
print("Horner's Method for Polynomial Evaluation\\n")
print("="*60 + "\\n")

coeffs = [1, -3, 2, 1]  # 1 - 3x + 2x² + x³
x = 2.5

print("Polynomial: p(x) = 1 - 3x + 2x² + x³")
print(f"Evaluation at x = {x}\\n")

result_naive = poly_eval_naive(coeffs, x)
result_horner = poly_eval_horner(coeffs, x)
result_numpy = np.polyval(coeffs[::-1], x)

print(f"Naive method:  {result_naive:.10f}")
print(f"Horner method: {result_horner:.10f}")
print(f"NumPy:         {result_numpy:.10f}")

# Verify all methods agree
assert abs(result_naive - result_horner) < 1e-10
assert abs(result_naive - result_numpy) < 1e-10
print("\\n✓ All methods agree!")

# Operation counts
print("\\n" + "="*60)
print("\\nOperation Counts\\n")
print("="*60 + "\\n")

mults_naive, adds_naive = count_operations('naive', coeffs)
mults_horner, adds_horner = count_operations('horner', coeffs)

n = len(coeffs) - 1
print(f"Polynomial degree: {n}\\n")

print(f"Naive method:")
print(f"  Multiplications: {mults_naive}")
print(f"  Additions: {adds_naive}")
print(f"  Total: {mults_naive + adds_naive}\\n")

print(f"Horner's method:")
print(f"  Multiplications: {mults_horner}")
print(f"  Additions: {adds_horner}")
print(f"  Total: {mults_horner + adds_horner}\\n")

print(f"Speedup: {(mults_naive + adds_naive) / (mults_horner + adds_horner):.2f}×")

# Test with high-degree polynomial
print("\\n" + "="*60)
print("\\nHigh-Degree Polynomial Example\\n")
print("="*60 + "\\n")

n_high = 20
coeffs_high = np.random.randn(n_high + 1)
x_high = 1.5

print(f"Degree: {n_high}\\n")

# Time comparisons
n_trials = 10000

start = time.time()
for _ in range(n_trials):
    _ = poly_eval_naive(coeffs_high, x_high)
time_naive = (time.time() - start) / n_trials

start = time.time()
for _ in range(n_trials):
    _ = poly_eval_horner(coeffs_high, x_high)
time_horner = (time.time() - start) / n_trials

start = time.time()
for _ in range(n_trials):
    _ = np.polyval(coeffs_high[::-1], x_high)
time_numpy = (time.time() - start) / n_trials

print(f"Naive:  {time_naive*1e6:.2f} μs")
print(f"Horner: {time_horner*1e6:.2f} μs")
print(f"NumPy:  {time_numpy*1e6:.2f} μs\\n")

print(f"Horner speedup over naive: {time_naive/time_horner:.2f}×")

# Operation count comparison
mults_naive_high, adds_naive_high = count_operations('naive', coeffs_high)
mults_horner_high, adds_horner_high = count_operations('horner', coeffs_high)

print(f"\\nOperation counts (degree {n_high}):")
print(f"  Naive:  {mults_naive_high + adds_naive_high} ops")
print(f"  Horner: {mults_horner_high + adds_horner_high} ops")
print(f"  Ratio:  {(mults_naive_high + adds_naive_high) / (mults_horner_high + adds_horner_high):.2f}×")

# Stability demonstration
print("\\n" + "="*60)
print("\\nNumerical Stability\\n")
print("="*60 + "\\n")

# Wilkinson-like polynomial (challenging)
roots = np.arange(1, 11)
coeffs_wilk = np.poly(roots)[::-1]  # Convert to increasing degree

x_test = 5.5
result_naive_wilk = poly_eval_naive(coeffs_wilk, x_test)
result_horner_wilk = poly_eval_horner(coeffs_wilk, x_test)

# True value
true_value = np.prod(x_test - roots)

print(f"Wilkinson-type polynomial at x = {x_test}:")
print(f"True value:    {true_value:.10e}")
print(f"Naive:         {result_naive_wilk:.10e}")
print(f"Horner:        {result_horner_wilk:.10e}\\n")

error_naive = abs(result_naive_wilk - true_value)
error_horner = abs(result_horner_wilk - true_value)

print(f"Naive error:   {error_naive:.2e}")
print(f"Horner error:  {error_horner:.2e}")

print("\\nHorner's method: fewer operations AND better stability!")

print("\\nAll tests passed!")`,
    testCases: [
      {
        input: 'p(x) = 1 - 3x + 2x² + x³, x = 2.5',
        expectedOutput: 'Horner uses fewer operations than naive',
        isHidden: false,
        description: 'Compare Horner vs naive polynomial evaluation'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-1-14',
    subjectId: 'math402',
    topicId: 'topic-1',
    difficulty: 4,
    title: 'Numerical Differentiation Error Analysis',
    description: 'Analyze truncation and rounding error tradeoffs in numerical differentiation. Implement various finite difference formulas and find the optimal step size that balances these competing errors.',
    starterCode: `import numpy as np
import matplotlib.pyplot as plt

def forward_difference(f, x, h):
    """
    Forward difference approximation: f'(x) ≈ (f(x+h) - f(x)) / h

    Truncation error: O(h)
    Rounding error: O(ε/h)

    Parameters:
    - f: function
    - x: point
    - h: step size

    Returns:
    - approximation: f'(x)
    """
    # TODO: Implement this function
    pass

def central_difference(f, x, h):
    """
    Central difference approximation: f'(x) ≈ (f(x+h) - f(x-h)) / (2h)

    Truncation error: O(h²)
    Rounding error: O(ε/h)

    Parameters:
    - f: function
    - x: point
    - h: step size

    Returns:
    - approximation: f'(x)
    """
    # TODO: Implement this function
    pass

def find_optimal_step_size(f, df, x, method='central'):
    """
    Find optimal step size that minimizes total error.

    Parameters:
    - f: function
    - df: true derivative
    - x: point
    - method: 'forward' or 'central'

    Returns:
    - (h_optimal, min_error): optimal step size and minimum error
    """
    # TODO: Implement this function
    pass

# Test function
f = lambda x: np.sin(x)
df = lambda x: np.cos(x)
x = 1.0

print("Numerical Differentiation Error Analysis\\n")
print(f"Function: f(x) = sin(x)")
print(f"Point: x = {x}")
print(f"True derivative: f'({x}) = {df(x):.10f}\\n")

# Test various step sizes
h_values = 10.0 ** np.arange(-16, 0, 0.5)

print("Testing forward difference:")
for h in [1e-2, 1e-4, 1e-8, 1e-12]:
    approx = forward_difference(f, x, h)
    error = abs(approx - df(x))
    print(f"h = {h:.0e}: approx = {approx:.10f}, error = {error:.2e}")

# Find optimal step size
h_opt, min_err = find_optimal_step_size(f, df, x, 'central')
print(f"\\nOptimal step size: {h_opt:.2e}")
print(f"Minimum error: {min_err:.2e}")`,
    hints: [
      'Total error = truncation_error + rounding_error',
      'Forward: optimal h ≈ √ε where ε is machine epsilon',
      'Central: optimal h ≈ ε^(1/3)',
      'Plot error vs h to visualize'
    ],
    solution: `import numpy as np
import matplotlib.pyplot as plt

def forward_difference(f, x, h):
    """
    Forward difference approximation: f'(x) ≈ (f(x+h) - f(x)) / h

    Truncation error: O(h)
    Rounding error: O(ε/h)

    Parameters:
    - f: function
    - x: point
    - h: step size

    Returns:
    - approximation: f'(x)
    """
    return (f(x + h) - f(x)) / h

def central_difference(f, x, h):
    """
    Central difference approximation: f'(x) ≈ (f(x+h) - f(x-h)) / (2h)

    Truncation error: O(h²)
    Rounding error: O(ε/h)

    Parameters:
    - f: function
    - x: point
    - h: step size

    Returns:
    - approximation: f'(x)
    """
    return (f(x + h) - f(x - h)) / (2 * h)

def find_optimal_step_size(f, df, x, method='central'):
    """
    Find optimal step size that minimizes total error.

    For forward difference: h_opt ≈ √ε
    For central difference: h_opt ≈ ε^(1/3)

    Parameters:
    - f: function
    - df: true derivative
    - x: point
    - method: 'forward' or 'central'

    Returns:
    - (h_optimal, min_error): optimal step size and minimum error
    """
    # Test range of step sizes
    h_values = 10.0 ** np.linspace(-16, -1, 150)
    errors = []

    for h in h_values:
        if method == 'forward':
            approx = forward_difference(f, x, h)
        elif method == 'central':
            approx = central_difference(f, x, h)
        else:
            raise ValueError(f"Unknown method: {method}")

        error = abs(approx - df(x))
        errors.append(error)

    errors = np.array(errors)
    min_idx = np.argmin(errors)

    return h_values[min_idx], errors[min_idx]

# Test function
print("Numerical Differentiation Error Analysis\\n")
print("="*60 + "\\n")

f = lambda x: np.sin(x)
df = lambda x: np.cos(x)
x = 1.0

print(f"Function: f(x) = sin(x)")
print(f"Point: x = {x}")
print(f"True derivative: f'({x}) = {df(x):.10f}\\n")

# Test various step sizes
print("="*60)
print("\\nForward Difference\\n")
print("="*60 + "\\n")

h_values_test = [1e-1, 1e-2, 1e-4, 1e-8, 1e-12, 1e-15]

for h in h_values_test:
    approx = forward_difference(f, x, h)
    error = abs(approx - df(x))
    print(f"h = {h:.0e}: approx = {approx:.10f}, error = {error:.2e}")

print("\\nNote: error decreases then increases (rounding error dominates)")

# Central difference
print("\\n" + "="*60)
print("\\nCentral Difference\\n")
print("="*60 + "\\n")

for h in h_values_test:
    approx = central_difference(f, x, h)
    error = abs(approx - df(x))
    print(f"h = {h:.0e}: approx = {approx:.10f}, error = {error:.2e}")

# Find optimal step sizes
print("\\n" + "="*60)
print("\\nOptimal Step Sizes\\n")
print("="*60 + "\\n")

h_opt_fwd, min_err_fwd = find_optimal_step_size(f, df, x, 'forward')
h_opt_ctr, min_err_ctr = find_optimal_step_size(f, df, x, 'central')

eps = np.finfo(float).eps
theoretical_h_fwd = np.sqrt(eps)
theoretical_h_ctr = eps ** (1/3)

print("Forward difference:")
print(f"  Optimal h (experimental): {h_opt_fwd:.2e}")
print(f"  Optimal h (theoretical):  {theoretical_h_fwd:.2e}")
print(f"  Minimum error: {min_err_fwd:.2e}\\n")

print("Central difference:")
print(f"  Optimal h (experimental): {h_opt_ctr:.2e}")
print(f"  Optimal h (theoretical):  {theoretical_h_ctr:.2e}")
print(f"  Minimum error: {min_err_ctr:.2e}\\n")

print(f"Central difference is {min_err_fwd/min_err_ctr:.1f}× more accurate!")

# Visualization
print("="*60)
print("\\nGenerating error plots...\\n")

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5))

h_range = 10.0 ** np.linspace(-16, -1, 150)

# Forward difference errors
errors_fwd = []
for h in h_range:
    approx = forward_difference(f, x, h)
    errors_fwd.append(abs(approx - df(x)))

ax1.loglog(h_range, errors_fwd, 'b-', linewidth=2, label='Total error')
ax1.axvline(h_opt_fwd, color='r', linestyle='--', label=f'Optimal h = {h_opt_fwd:.2e}')

# Theoretical error components
truncation_fwd = h_range  # O(h)
rounding_fwd = eps / h_range  # O(ε/h)

ax1.loglog(h_range, truncation_fwd, 'g--', alpha=0.6, label='Truncation O(h)')
ax1.loglog(h_range, rounding_fwd, 'm--', alpha=0.6, label='Rounding O(ε/h)')

ax1.set_xlabel('Step size h')
ax1.set_ylabel('Absolute error')
ax1.set_title('Forward Difference Error')
ax1.grid(True, alpha=0.3)
ax1.legend()

# Central difference errors
errors_ctr = []
for h in h_range:
    approx = central_difference(f, x, h)
    errors_ctr.append(abs(approx - df(x)))

ax2.loglog(h_range, errors_ctr, 'b-', linewidth=2, label='Total error')
ax2.axvline(h_opt_ctr, color='r', linestyle='--', label=f'Optimal h = {h_opt_ctr:.2e}')

# Theoretical error components
truncation_ctr = h_range ** 2  # O(h²)
rounding_ctr = eps / h_range  # O(ε/h)

ax2.loglog(h_range, truncation_ctr, 'g--', alpha=0.6, label='Truncation O(h²)')
ax2.loglog(h_range, rounding_ctr, 'm--', alpha=0.6, label='Rounding O(ε/h)')

ax2.set_xlabel('Step size h')
ax2.set_ylabel('Absolute error')
ax2.set_title('Central Difference Error')
ax2.grid(True, alpha=0.3)
ax2.legend()

plt.tight_layout()
plt.savefig('/tmp/differentiation_errors.png', dpi=150, bbox_inches='tight')
print("Plot saved to /tmp/differentiation_errors.png")

# Error analysis summary
print("\\n" + "="*60)
print("\\nError Analysis Summary\\n")
print("="*60 + "\\n")

print("Forward Difference:")
print("  Truncation error: O(h)")
print("  Rounding error: O(ε/h)")
print("  Total error: O(h + ε/h)")
print(f"  Optimal h: √ε ≈ {np.sqrt(eps):.2e}")
print(f"  Minimum error: √ε ≈ {np.sqrt(eps):.2e}\\n")

print("Central Difference:")
print("  Truncation error: O(h²)")
print("  Rounding error: O(ε/h)")
print("  Total error: O(h² + ε/h)")
print(f"  Optimal h: ε^(1/3) ≈ {eps**(1/3):.2e}")
print(f"  Minimum error: ε^(2/3) ≈ {eps**(2/3):.2e}\\n")

print("Key insight: Central difference has lower truncation error,")
print("allowing larger h and less rounding error!")

print("\\nAll tests passed!")`,
    testCases: [
      {
        input: 'f(x) = sin(x), x = 1.0',
        expectedOutput: 'Optimal h ≈ ε^(1/3) for central difference',
        isHidden: false,
        description: 'Find optimal step size for numerical differentiation'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-1-15',
    subjectId: 'math402',
    topicId: 'topic-1',
    difficulty: 5,
    title: 'Automatic Error Estimation',
    description: 'Implement automatic error estimation using Richardson extrapolation. Create a function that automatically determines appropriate step sizes and estimates both the result and its error bound.',
    starterCode: `import numpy as np

def richardson_extrapolation(f, x, h0, k, method='central'):
    """
    Richardson extrapolation for numerical differentiation.

    Uses multiple approximations with different step sizes to
    extrapolate to h=0 and estimate error.

    Parameters:
    - f: function
    - x: point
    - h0: initial step size
    - k: number of extrapolation levels
    - method: 'forward' or 'central'

    Returns:
    - (best_approximation, error_estimate)
    """
    # TODO: Implement this function
    pass

def adaptive_differentiation(f, x, tol=1e-6):
    """
    Adaptive numerical differentiation with automatic error control.

    Automatically refines until estimated error < tolerance.

    Parameters:
    - f: function
    - x: point
    - tol: error tolerance

    Returns:
    - (derivative, error_estimate, num_evaluations)
    """
    # TODO: Implement this function
    pass

# Test Richardson extrapolation
print("Richardson Extrapolation:\\n")

f = lambda x: np.exp(x) * np.sin(x)
df_true = lambda x: np.exp(x) * (np.sin(x) + np.cos(x))
x = 1.0

h0 = 0.1
for k in [1, 2, 3, 4]:
    approx, err_est = richardson_extrapolation(f, x, h0, k)
    true_err = abs(approx - df_true(x))
    print(f"k={k}: approx={approx:.10f}, est_err={err_est:.2e}, true_err={true_err:.2e}")

# Test adaptive differentiation
print("\\n" + "="*60)
print("\\nAdaptive Differentiation:\\n")

tolerances = [1e-4, 1e-6, 1e-8, 1e-10]
for tol in tolerances:
    result, err_est, n_eval = adaptive_differentiation(f, x, tol)
    true_err = abs(result - df_true(x))
    print(f"tol={tol:.0e}: result={result:.10f}, err={err_est:.2e}, evals={n_eval}")`,
    hints: [
      'Richardson: R(k+1) = R(k) + (R(k) - R(k-1)) / (2^p - 1)',
      'p = 1 for forward, p = 2 for central difference',
      'Error estimate from difference between levels',
      'Adaptive: iterate Richardson until error < tolerance'
    ],
    solution: `import numpy as np

def central_difference(f, x, h):
    """Central difference approximation."""
    return (f(x + h) - f(x - h)) / (2 * h)

def forward_difference(f, x, h):
    """Forward difference approximation."""
    return (f(x + h) - f(x)) / h

def richardson_extrapolation(f, x, h0, k, method='central'):
    """
    Richardson extrapolation for numerical differentiation.

    Uses multiple approximations with different step sizes to
    extrapolate to h=0 and estimate error.

    Algorithm:
    1. Compute D(h), D(h/2), D(h/4), ...
    2. Apply Richardson extrapolation formula
    3. Estimate error from difference

    Parameters:
    - f: function
    - x: point
    - h0: initial step size
    - k: number of extrapolation levels
    - method: 'forward' or 'central'

    Returns:
    - (best_approximation, error_estimate)
    """
    # Determine difference function and order
    if method == 'central':
        diff_func = central_difference
        p = 2  # Order of truncation error
    elif method == 'forward':
        diff_func = forward_difference
        p = 1
    else:
        raise ValueError(f"Unknown method: {method}")

    # Compute initial approximations D(0,0), D(1,0), D(2,0), ...
    # D(i,0) = approximation with h = h0/2^i
    D = np.zeros((k+1, k+1))

    for i in range(k+1):
        h = h0 / (2**i)
        D[i, 0] = diff_func(f, x, h)

    # Richardson extrapolation
    # D(i,j) = D(i,j-1) + (D(i,j-1) - D(i-1,j-1)) / (4^j - 1) for central
    # D(i,j) = D(i,j-1) + (D(i,j-1) - D(i-1,j-1)) / (2^j - 1) for forward
    for j in range(1, k+1):
        for i in range(j, k+1):
            D[i, j] = D[i, j-1] + (D[i, j-1] - D[i-1, j-1]) / ((2**(p*j)) - 1)

    # Best approximation is D[k,k]
    best_approx = D[k, k]

    # Error estimate from difference between last two levels
    if k > 0:
        error_estimate = abs(D[k, k] - D[k, k-1])
    else:
        error_estimate = abs(D[1, 0] - D[0, 0])

    return best_approx, error_estimate

def adaptive_differentiation(f, x, tol=1e-6, max_levels=10):
    """
    Adaptive numerical differentiation with automatic error control.

    Automatically refines until estimated error < tolerance.

    Parameters:
    - f: function
    - x: point
    - tol: error tolerance
    - max_levels: maximum Richardson levels

    Returns:
    - (derivative, error_estimate, num_evaluations)
    """
    h0 = 0.1  # Initial step size
    num_evaluations = 0

    for k in range(1, max_levels+1):
        approx, err_est = richardson_extrapolation(f, x, h0, k, 'central')

        # Count function evaluations: 2(k+1) for central difference
        num_evaluations = 2 * (k + 1)

        if err_est < tol:
            return approx, err_est, num_evaluations

    # If tolerance not met, return best approximation with warning
    print(f"Warning: Tolerance {tol:.2e} not achieved in {max_levels} levels")
    return approx, err_est, num_evaluations

# Test Richardson extrapolation
print("Richardson Extrapolation for Numerical Differentiation\\n")
print("="*60 + "\\n")

f = lambda x: np.exp(x) * np.sin(x)
df_true = lambda x: np.exp(x) * (np.sin(x) + np.cos(x))
x = 1.0

true_value = df_true(x)

print(f"Function: f(x) = e^x · sin(x)")
print(f"Point: x = {x}")
print(f"True derivative: f'({x}) = {true_value:.10f}\\n")

h0 = 0.1
print(f"Initial step size: h0 = {h0}\\n")
print("="*60 + "\\n")

for k in [1, 2, 3, 4, 5]:
    approx, err_est = richardson_extrapolation(f, x, h0, k, 'central')
    true_err = abs(approx - true_value)

    print(f"Level k={k}:")
    print(f"  Approximation: {approx:.15f}")
    print(f"  Estimated error: {err_est:.2e}")
    print(f"  True error: {true_err:.2e}")
    print(f"  Error ratio: {true_err/err_est:.2f}")
    print()

print("Note: Error estimate is conservative (typically overestimates)")

# Demonstrate Richardson table
print("="*60)
print("\\nRichardson Extrapolation Table\\n")
print("="*60 + "\\n")

k_max = 4
D = np.zeros((k_max+1, k_max+1))

for i in range(k_max+1):
    h = h0 / (2**i)
    D[i, 0] = central_difference(f, x, h)

for j in range(1, k_max+1):
    for i in range(j, k_max+1):
        D[i, j] = D[i, j-1] + (D[i, j-1] - D[i-1, j-1]) / (4**j - 1)

print("D[i,j]: i=row (step size h/2^i), j=col (extrapolation level)\\n")
print("      j=0           j=1           j=2           j=3           j=4")
print("-" * 70)

for i in range(k_max+1):
    row_str = f"i={i}: "
    for j in range(i+1):
        row_str += f"{D[i, j]:13.10f} "
    print(row_str)

print(f"\\nBest estimate: D[{k_max},{k_max}] = {D[k_max, k_max]:.15f}")
print(f"True value:                 = {true_value:.15f}")
print(f"Error:                      = {abs(D[k_max, k_max] - true_value):.2e}")

# Test adaptive differentiation
print("\\n" + "="*60)
print("\\nAdaptive Differentiation\\n")
print("="*60 + "\\n")

print("Automatic error control: refines until error < tolerance\\n")

tolerances = [1e-3, 1e-6, 1e-9, 1e-12]

for tol in tolerances:
    result, err_est, n_eval = adaptive_differentiation(f, x, tol)
    true_err = abs(result - true_value)

    print(f"Tolerance: {tol:.0e}")
    print(f"  Result: {result:.15f}")
    print(f"  Est. error: {err_est:.2e}")
    print(f"  True error: {true_err:.2e}")
    print(f"  Evaluations: {n_eval}")
    print(f"  Tolerance met: {err_est <= tol}")
    print()

# Compare methods
print("="*60)
print("\\nMethod Comparison\\n")
print("="*60 + "\\n")

h_simple = 1e-5

# Simple central difference
simple = central_difference(f, x, h_simple)
simple_err = abs(simple - true_value)

# Richardson extrapolation
rich, rich_err_est = richardson_extrapolation(f, x, 0.1, 4, 'central')
rich_true_err = abs(rich - true_value)

# Adaptive
adapt, adapt_err, n_eval = adaptive_differentiation(f, x, 1e-10)
adapt_true_err = abs(adapt - true_value)

print("Simple central difference (h=1e-5):")
print(f"  Result: {simple:.15f}")
print(f"  Error: {simple_err:.2e}\\n")

print("Richardson extrapolation (k=4):")
print(f"  Result: {rich:.15f}")
print(f"  Est. error: {rich_err_est:.2e}")
print(f"  True error: {rich_true_err:.2e}\\n")

print("Adaptive (tol=1e-10):")
print(f"  Result: {adapt:.15f}")
print(f"  Est. error: {adapt_err:.2e}")
print(f"  True error: {adapt_true_err:.2e}")
print(f"  Evaluations: {n_eval}\\n")

print("Richardson extrapolation provides:")
print("  ✓ Higher accuracy")
print("  ✓ Automatic error estimation")
print("  ✓ No need to tune step size!")

print("\\nAll tests passed!")`,
    testCases: [
      {
        input: 'f(x) = e^x·sin(x), k=4',
        expectedOutput: 'Error estimate matches true error within factor of 10',
        isHidden: false,
        description: 'Test Richardson extrapolation for differentiation'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-1-16',
    subjectId: 'math402',
    topicId: 'topic-1',
    difficulty: 3,
    title: 'Summation Algorithm Comparison',
    description: 'Compare different summation algorithms (naive, pairwise, Kahan) for accuracy and performance. Implement and benchmark multiple summation strategies on challenging test cases.',
    starterCode: `import numpy as np
import time

def naive_sum(data):
    """Simple left-to-right summation."""
    # TODO: Implement this function
    pass

def pairwise_sum(data):
    """
    Pairwise summation (recursive).

    Sum pairs: (a+b) + (c+d) + ...
    Reduces error from O(nε) to O(log n · ε)
    """
    # TODO: Implement this function
    pass

def kahan_sum(data):
    """Kahan compensated summation."""
    # TODO: Implement this function
    pass

def sorted_sum(data):
    """
    Sum in increasing order of magnitude.
    Helps reduce cancellation errors.
    """
    # TODO: Implement this function
    pass

def compare_summation_methods(data, true_sum=None):
    """
    Compare all summation methods.

    Parameters:
    - data: array to sum
    - true_sum: true sum (if known)

    Returns:
    - results: dictionary of method -> (sum, error, time)
    """
    # TODO: Implement this function
    pass

# Test case 1: Many small numbers
print("Test 1: Large + many small\\n")
data1 = [1.0] + [1e-10] * 100000

results1 = compare_summation_methods(data1)
for method, (result, error, elapsed) in results1.items():
    print(f"{method:15s}: {result:.15f} ({elapsed*1000:.2f} ms)")`,
    hints: [
      'Pairwise: recursively split array and sum pairs',
      'Sorted: sort by absolute value before summing',
      'Use high precision (Decimal) for true sum',
      'Benchmark with time.perf_counter()'
    ],
    solution: `import numpy as np
import time
from decimal import Decimal, getcontext

def naive_sum(data):
    """Simple left-to-right summation."""
    total = 0.0
    for x in data:
        total += x
    return total

def pairwise_sum(data):
    """
    Pairwise summation (recursive).

    Sum pairs: (a+b) + (c+d) + ...
    Reduces error from O(nε) to O(log n · ε)
    """
    data = np.asarray(data)
    n = len(data)

    if n <= 128:
        # Base case: use naive summation
        return np.sum(data)

    # Recursive case: split and sum
    mid = n // 2
    return pairwise_sum(data[:mid]) + pairwise_sum(data[mid:])

def kahan_sum(data):
    """Kahan compensated summation."""
    s = 0.0
    c = 0.0

    for x in data:
        y = x - c
        t = s + y
        c = (t - s) - y
        s = t

    return s

def sorted_sum(data):
    """
    Sum in increasing order of magnitude.
    Helps reduce cancellation errors.
    """
    # Sort by absolute value
    sorted_data = sorted(data, key=abs)
    return naive_sum(sorted_data)

def true_sum_high_precision(data):
    """Compute true sum using high precision arithmetic."""
    getcontext().prec = 100
    total = Decimal(0)
    for x in data:
        total += Decimal(str(float(x)))
    return float(total)

def compare_summation_methods(data, true_sum=None):
    """
    Compare all summation methods.

    Parameters:
    - data: array to sum
    - true_sum: true sum (if known)

    Returns:
    - results: dictionary of method -> (sum, error, time)
    """
    if true_sum is None:
        true_sum = true_sum_high_precision(data)

    methods = {
        'Naive': naive_sum,
        'Pairwise': pairwise_sum,
        'Kahan': kahan_sum,
        'Sorted': sorted_sum,
        'NumPy': lambda d: np.sum(d),
    }

    results = {}

    for name, method in methods.items():
        start = time.perf_counter()
        result = method(data)
        elapsed = time.perf_counter() - start

        error = abs(result - true_sum)
        results[name] = (result, error, elapsed)

    return results, true_sum

# Test cases
print("Summation Algorithm Comparison\\n")
print("="*60 + "\\n")

# Test case 1: Large value + many small values
print("Test 1: Large + many small numbers\\n")
print("Data: [1.0] + [1e-10] * 100000\\n")

data1 = np.array([1.0] + [1e-10] * 100000)
results1, true1 = compare_summation_methods(data1)

print(f"True sum (high precision): {true1:.15f}\\n")
print(f"{'Method':<15} {'Result':<20} {'Error':<12} {'Time (ms)':<10}")
print("-" * 60)

for method, (result, error, elapsed) in sorted(results1.items(), key=lambda x: x[1][1]):
    print(f"{method:<15} {result:<20.15f} {error:<12.2e} {elapsed*1000:<10.3f}")

# Test case 2: Alternating signs
print("\\n" + "="*60)
print("\\nTest 2: Alternating signs\\n")
print("Data: [1.0, -1.0, 1e-10] * 10000\\n")

data2 = np.array([1.0, -1.0, 1e-10] * 10000)
results2, true2 = compare_summation_methods(data2)

print(f"True sum (high precision): {true2:.15e}\\n")
print(f"{'Method':<15} {'Result':<20} {'Error':<12} {'Time (ms)':<10}")
print("-" * 60)

for method, (result, error, elapsed) in sorted(results2.items(), key=lambda x: x[1][1]):
    print(f"{method:<15} {result:<20.15e} {error:<12.2e} {elapsed*1000:<10.3f}")

# Test case 3: Random numbers
print("\\n" + "="*60)
print("\\nTest 3: Random numbers (mixed magnitudes)\\n")

np.random.seed(42)
data3 = np.concatenate([
    np.random.randn(1000) * 1e10,
    np.random.randn(1000) * 1e-10,
    np.random.randn(1000),
])

print(f"Data: {len(data3)} random numbers with varying magnitudes\\n")

results3, true3 = compare_summation_methods(data3)

print(f"True sum (high precision): {true3:.10e}\\n")
print(f"{'Method':<15} {'Result':<20} {'Error':<12} {'Time (ms)':<10}")
print("-" * 60)

for method, (result, error, elapsed) in sorted(results3.items(), key=lambda x: x[1][1]):
    print(f"{method:<15} {result:<20.10e} {error:<12.2e} {elapsed*1000:<10.3f}")

# Performance benchmark with large array
print("\\n" + "="*60)
print("\\nPerformance Benchmark (1,000,000 elements)\\n")
print("="*60 + "\\n")

data_large = np.random.randn(1000000)

methods_bench = {
    'Naive': naive_sum,
    'Pairwise': pairwise_sum,
    'Kahan': kahan_sum,
    'NumPy': lambda d: np.sum(d),
}

print(f"{'Method':<15} {'Time (ms)':<12} {'Speedup vs Naive':<15}")
print("-" * 45)

times = {}
for name, method in methods_bench.items():
    start = time.perf_counter()
    _ = method(data_large)
    elapsed = time.perf_counter() - start
    times[name] = elapsed

naive_time = times['Naive']
for name, elapsed in sorted(times.items(), key=lambda x: x[1]):
    speedup = naive_time / elapsed
    print(f"{name:<15} {elapsed*1000:<12.2f} {speedup:<15.2f}×")

# Summary
print("\\n" + "="*60)
print("\\nSummary\\n")
print("="*60 + "\\n")

print("Accuracy (best to worst):")
print("  1. Kahan: Best accuracy, handles challenging cases")
print("  2. Sorted: Good for reducing cancellation")
print("  3. Pairwise: Better than naive, used by NumPy")
print("  4. Naive: Worst accuracy, O(nε) error\\n")

print("Performance (fastest to slowest):")
print("  1. NumPy: Optimized C implementation")
print("  2. Naive: Simple loop, cache-friendly")
print("  3. Pairwise: Recursive overhead")
print("  4. Kahan: Extra operations per element\\n")

print("Recommendations:")
print("  • Default: Use NumPy (good accuracy + performance)")
print("  • Need high accuracy: Use Kahan")
print("  • Large arrays: NumPy pairwise")
print("  • Mixed magnitudes: Sorted or Kahan")

print("\\nAll tests passed!")`,
    testCases: [
      {
        input: 'data=[1.0] + [1e-10]*100000',
        expectedOutput: 'Kahan sum has smallest error',
        isHidden: false,
        description: 'Compare summation algorithms on challenging data'
      }
    ],
    language: 'python'
  }
];
