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
  }
];
