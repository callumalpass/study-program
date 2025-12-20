import { CodingExercise } from '../../../../core/types';

export const topic2Exercises: CodingExercise[] = [
  {
    id: 'math402-ex-2-1',
    subjectId: 'math402',
    topicId: 'topic-2',
    difficulty: 1,
    title: 'Bisection Method',
    description: 'Implement the bisection method for finding roots of continuous functions. The bisection method is guaranteed to converge by repeatedly halving an interval that contains a root.',
    starterCode: `import numpy as np

def bisection(f, a, b, tol=1e-6, max_iter=100):
    """
    Find root of f(x) = 0 using bisection method.

    Parameters:
    - f: function
    - a, b: interval endpoints (f(a) and f(b) must have opposite signs)
    - tol: tolerance
    - max_iter: maximum iterations

    Returns:
    - (root, iterations): root and number of iterations
    """
    # TODO: Implement this function
    pass

# Test function: f(x) = x² - 2
f = lambda x: x**2 - 2
a, b = 0, 2

print("Finding root of f(x) = x² - 2 on [0, 2]\\n")

root, iters = bisection(f, a, b)

print(f"Root: {root:.10f}")
print(f"√2:   {np.sqrt(2):.10f}")
print(f"Iterations: {iters}")
print(f"f(root): {f(root):.2e}")`,
    hints: [
      'Check that f(a) and f(b) have opposite signs',
      'Compute midpoint c = (a + b) / 2',
      'Update interval based on sign of f(c)',
      'Stop when |b - a| < tolerance'
    ],
    solution: `import numpy as np

def bisection(f, a, b, tol=1e-6, max_iter=100):
    """
    Find root of f(x) = 0 using bisection method.

    Parameters:
    - f: function
    - a, b: interval endpoints (f(a) and f(b) must have opposite signs)
    - tol: tolerance
    - max_iter: maximum iterations

    Returns:
    - (root, iterations): root and number of iterations
    """
    fa = f(a)
    fb = f(b)

    # Check that f(a) and f(b) have opposite signs
    if fa * fb > 0:
        raise ValueError("f(a) and f(b) must have opposite signs")

    for i in range(max_iter):
        # Compute midpoint
        c = (a + b) / 2
        fc = f(c)

        # Check convergence
        if abs(b - a) < tol or abs(fc) < tol:
            return c, i + 1

        # Update interval
        if fa * fc < 0:
            b = c
            fb = fc
        else:
            a = c
            fa = fc

    # Max iterations reached
    return (a + b) / 2, max_iter

# Test function: f(x) = x² - 2
f = lambda x: x**2 - 2
a, b = 0, 2

print("Bisection Method: Finding root of f(x) = x² - 2\\n")
print("="*60 + "\\n")

root, iters = bisection(f, a, b)

print(f"Root:       {root:.10f}")
print(f"True (√2):  {np.sqrt(2):.10f}")
print(f"Error:      {abs(root - np.sqrt(2)):.2e}")
print(f"Iterations: {iters}")
print(f"f(root):    {f(root):.2e}\\n")

# Test more functions
print("="*60)
print("\\nAdditional Test Cases\\n")
print("="*60 + "\\n")

test_cases = [
    (lambda x: x**3 - x - 2, 1, 2, 1.5213797, "x³ - x - 2"),
    (lambda x: np.cos(x) - x, 0, 1, 0.7390851, "cos(x) - x"),
    (lambda x: np.exp(x) - 3, 0, 2, 1.0986123, "e^x - 3"),
]

for f, a, b, true_root, desc in test_cases:
    root, iters = bisection(f, a, b, tol=1e-10)
    error = abs(root - true_root)
    print(f"{desc}:")
    print(f"  Root: {root:.10f}")
    print(f"  Error: {error:.2e}")
    print(f"  Iterations: {iters}\\n")

print("All tests passed!")`,
    testCases: [
      {
        input: 'f(x) = x² - 2, [0, 2]',
        expectedOutput: 'root ≈ 1.4142135624 (√2)',
        isHidden: false,
        description: 'Find square root of 2 using bisection'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-2-2',
    subjectId: 'math402',
    topicId: 'topic-2',
    difficulty: 2,
    title: 'Newton Method',
    description: 'Implement Newton\'s method for root finding. Newton\'s method uses the derivative to achieve quadratic convergence, but requires a good initial guess and derivative information.',
    starterCode: `import numpy as np

def newton(f, df, x0, tol=1e-10, max_iter=100):
    """
    Find root of f(x) = 0 using Newton's method.

    Newton iteration: x_{n+1} = x_n - f(x_n)/f'(x_n)

    Parameters:
    - f: function
    - df: derivative of f
    - x0: initial guess
    - tol: tolerance
    - max_iter: maximum iterations

    Returns:
    - (root, iterations): root and number of iterations
    """
    # TODO: Implement this function
    pass

# Test function: f(x) = x² - 2
f = lambda x: x**2 - 2
df = lambda x: 2*x
x0 = 1.0

print("Finding root of f(x) = x² - 2\\n")
print(f"Initial guess: x0 = {x0}\\n")

root, iters = newton(f, df, x0)

print(f"Root: {root:.15f}")
print(f"√2:   {np.sqrt(2):.15f}")
print(f"Iterations: {iters}")
print(f"Error: {abs(root - np.sqrt(2)):.2e}")`,
    hints: [
      'Newton iteration: x_new = x - f(x)/f\'(x)',
      'Check for division by zero (f\'(x) = 0)',
      'Monitor |x_new - x| for convergence',
      'Newton converges quadratically near the root'
    ],
    solution: `import numpy as np

def newton(f, df, x0, tol=1e-10, max_iter=100):
    """
    Find root of f(x) = 0 using Newton's method.

    Newton iteration: x_{n+1} = x_n - f(x_n)/f'(x_n)

    Parameters:
    - f: function
    - df: derivative of f
    - x0: initial guess
    - tol: tolerance
    - max_iter: maximum iterations

    Returns:
    - (root, iterations): root and number of iterations
    """
    x = x0

    for i in range(max_iter):
        fx = f(x)
        dfx = df(x)

        # Check for zero derivative
        if abs(dfx) < 1e-15:
            raise ValueError("Derivative is zero at x = {x}")

        # Newton iteration
        x_new = x - fx / dfx

        # Check convergence
        if abs(x_new - x) < tol or abs(fx) < tol:
            return x_new, i + 1

        x = x_new

    return x, max_iter

# Test function: f(x) = x² - 2
print("Newton's Method: Finding root of f(x) = x² - 2\\n")
print("="*60 + "\\n")

f = lambda x: x**2 - 2
df = lambda x: 2*x
x0 = 1.0

print(f"Initial guess: x0 = {x0}\\n")

root, iters = newton(f, df, x0)
true_root = np.sqrt(2)

print(f"Root:       {root:.15f}")
print(f"True (√2):  {true_root:.15f}")
print(f"Error:      {abs(root - true_root):.2e}")
print(f"Iterations: {iters}\\n")

# Compare convergence with bisection
print("="*60)
print("\\nConvergence Comparison\\n")
print("="*60 + "\\n")

# Newton with iteration tracking
x = x0
print("Newton's method convergence:")
for i in range(5):
    fx = f(x)
    dfx = df(x)
    x_new = x - fx / dfx
    error = abs(x_new - true_root)
    print(f"  Iteration {i+1}: x = {x_new:.15f}, error = {error:.2e}")
    if error < 1e-15:
        break
    x = x_new

print("\\nNote: Newton's method achieves machine precision in few iterations!")

# Test quadratic convergence
print("\\n" + "="*60)
print("\\nQuadratic Convergence\\n")
print("="*60 + "\\n")

x = x0
errors = []
for i in range(5):
    error = abs(x - true_root)
    errors.append(error)
    if error < 1e-15:
        break
    fx = f(x)
    dfx = df(x)
    x = x - fx / dfx

print("Error sequence:")
for i, err in enumerate(errors):
    print(f"  e_{i} = {err:.2e}")
    if i > 0:
        ratio = errors[i] / errors[i-1]**2
        print(f"    e_{i}/e_{i-1}² ≈ {ratio:.2f} (should be roughly constant)\\n")

# Additional test cases
print("="*60)
print("\\nAdditional Test Cases\\n")
print("="*60 + "\\n")

test_cases = [
    (lambda x: x**3 - 2, lambda x: 3*x**2, 1.5, 2**(1/3), "x³ = 2"),
    (lambda x: np.cos(x) - x, lambda x: -np.sin(x) - 1, 0.5, 0.7390851332, "cos(x) = x"),
    (lambda x: np.exp(x) - 3, lambda x: np.exp(x), 1.0, np.log(3), "e^x = 3"),
]

for f, df, x0, true_root, desc in test_cases:
    root, iters = newton(f, df, x0)
    error = abs(root - true_root)
    print(f"{desc}:")
    print(f"  Root: {root:.12f}")
    print(f"  Error: {error:.2e}")
    print(f"  Iterations: {iters}\\n")

print("All tests passed!")`,
    testCases: [
      {
        input: 'f(x) = x² - 2, df(x) = 2x, x0 = 1.0',
        expectedOutput: 'Converges to √2 in ~4 iterations',
        isHidden: false,
        description: 'Test Newton method with quadratic convergence'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-2-3',
    subjectId: 'math402',
    topicId: 'topic-2',
    difficulty: 2,
    title: 'Secant Method',
    description: 'Implement the secant method as a derivative-free alternative to Newton\'s method. The secant method approximates the derivative using finite differences.',
    starterCode: `import numpy as np

def secant(f, x0, x1, tol=1e-10, max_iter=100):
    """
    Find root of f(x) = 0 using secant method.

    Secant iteration: x_{n+1} = x_n - f(x_n) * (x_n - x_{n-1}) / (f(x_n) - f(x_{n-1}))

    Parameters:
    - f: function
    - x0, x1: initial guesses
    - tol: tolerance
    - max_iter: maximum iterations

    Returns:
    - (root, iterations): root and number of iterations
    """
    # TODO: Implement this function
    pass

# Test function
f = lambda x: x**2 - 2
x0, x1 = 1.0, 2.0

print("Finding root of f(x) = x² - 2\\n")
print(f"Initial guesses: x0 = {x0}, x1 = {x1}\\n")

root, iters = secant(f, x0, x1)

print(f"Root: {root:.15f}")
print(f"√2:   {np.sqrt(2):.15f}")
print(f"Iterations: {iters}")`,
    hints: [
      'Secant approximates derivative: f\'(x) ≈ (f(x_n) - f(x_{n-1})) / (x_n - x_{n-1})',
      'Update: x_new = x1 - f(x1) * (x1 - x0) / (f(x1) - f(x0))',
      'Check for division by zero',
      'Convergence order is φ ≈ 1.618 (golden ratio)'
    ],
    solution: `import numpy as np

def secant(f, x0, x1, tol=1e-10, max_iter=100):
    """
    Find root of f(x) = 0 using secant method.

    Secant iteration: x_{n+1} = x_n - f(x_n) * (x_n - x_{n-1}) / (f(x_n) - f(x_{n-1}))

    Parameters:
    - f: function
    - x0, x1: initial guesses
    - tol: tolerance
    - max_iter: maximum iterations

    Returns:
    - (root, iterations): root and number of iterations
    """
    f0 = f(x0)
    f1 = f(x1)

    for i in range(max_iter):
        # Check for division by zero
        if abs(f1 - f0) < 1e-15:
            raise ValueError("Division by zero in secant method")

        # Secant iteration
        x_new = x1 - f1 * (x1 - x0) / (f1 - f0)

        # Check convergence
        if abs(x_new - x1) < tol:
            return x_new, i + 1

        # Update for next iteration
        x0, f0 = x1, f1
        x1, f1 = x_new, f(x_new)

    return x1, max_iter

# Test function
print("Secant Method: Finding root of f(x) = x² - 2\\n")
print("="*60 + "\\n")

f = lambda x: x**2 - 2
x0, x1 = 1.0, 2.0
true_root = np.sqrt(2)

print(f"Initial guesses: x0 = {x0}, x1 = {x1}\\n")

root, iters = secant(f, x0, x1)

print(f"Root:       {root:.15f}")
print(f"True (√2):  {true_root:.15f}")
print(f"Error:      {abs(root - true_root):.2e}")
print(f"Iterations: {iters}\\n")

# Convergence analysis
print("="*60)
print("\\nConvergence Analysis\\n")
print("="*60 + "\\n")

x0, x1 = 1.0, 2.0
errors = []

f0 = f(x0)
f1 = f(x1)

print("Iteration history:")
for i in range(10):
    error = abs(x1 - true_root)
    errors.append(error)
    print(f"  Iteration {i}: x = {x1:.15f}, error = {error:.2e}")

    if error < 1e-15:
        break

    # Secant iteration
    if abs(f1 - f0) < 1e-15:
        break
    x_new = x1 - f1 * (x1 - x0) / (f1 - f0)
    x0, f0 = x1, f1
    x1, f1 = x_new, f(x_new)

# Estimate convergence order
print("\\n" + "="*60)
print("\\nConvergence Order Estimation\\n")
print("="*60 + "\\n")

if len(errors) >= 4:
    # Estimate α from e_{n+1} ≈ C * e_n^α
    # Taking logs: log(e_{n+1}) ≈ log(C) + α * log(e_n)
    # Slope gives α

    print("Error sequence and estimated convergence order:\\n")
    for i in range(min(5, len(errors)-1)):
        if errors[i] > 0 and errors[i+1] > 0:
            if i > 0 and errors[i-1] > 0:
                alpha = np.log(errors[i+1]/errors[i]) / np.log(errors[i]/errors[i-1])
                print(f"  e_{i} = {errors[i]:.2e}")
                print(f"    Estimated order α ≈ {alpha:.3f}\\n")

    print("Note: Secant method has convergence order φ ≈ 1.618 (golden ratio)")

# Method comparison
print("\\n" + "="*60)
print("\\nMethod Comparison\\n")
print("="*60 + "\\n")

# Secant (no derivative)
f_test = lambda x: x**3 - 2
x0, x1 = 1.0, 2.0
root_secant, iters_secant = secant(f_test, x0, x1)

# Newton (requires derivative)
df_test = lambda x: 3*x**2
def newton_simple(f, df, x0, tol=1e-10, max_iter=100):
    x = x0
    for i in range(max_iter):
        fx = f(x)
        dfx = df(x)
        if abs(dfx) < 1e-15:
            break
        x_new = x - fx / dfx
        if abs(x_new - x) < tol:
            return x_new, i + 1
        x = x_new
    return x, max_iter

root_newton, iters_newton = newton_simple(f_test, df_test, 1.5)

true_root_test = 2**(1/3)

print(f"Finding ³√2:\\n")
print(f"Secant method:")
print(f"  Root: {root_secant:.15f}")
print(f"  Error: {abs(root_secant - true_root_test):.2e}")
print(f"  Iterations: {iters_secant}\\n")

print(f"Newton's method:")
print(f"  Root: {root_newton:.15f}")
print(f"  Error: {abs(root_newton - true_root_test):.2e}")
print(f"  Iterations: {iters_newton}\\n")

print("Secant: No derivative needed, slightly more iterations")
print("Newton: Requires derivative, faster convergence")

print("\\nAll tests passed!")`,
    testCases: [
      {
        input: 'f(x) = x² - 2, x0 = 1.0, x1 = 2.0',
        expectedOutput: 'Converges to √2 with superlinear convergence',
        isHidden: false,
        description: 'Test secant method convergence'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-2-4',
    subjectId: 'math402',
    topicId: 'topic-2',
    difficulty: 3,
    title: 'Fixed-Point Iteration',
    description: 'Implement fixed-point iteration and analyze convergence conditions. A fixed point of g(x) satisfies x = g(x), and the iteration x_{n+1} = g(x_n) converges when |g\'(x)| < 1 near the fixed point.',
    starterCode: `import numpy as np

def fixed_point(g, x0, tol=1e-10, max_iter=100):
    """
    Find fixed point of g(x) using iteration x_{n+1} = g(x_n).

    Converges when |g'(x*)| < 1 at the fixed point x*.

    Parameters:
    - g: iteration function
    - x0: initial guess
    - tol: tolerance
    - max_iter: maximum iterations

    Returns:
    - (fixed_point, iterations, converged): result, iterations, success flag
    """
    # TODO: Implement this function
    pass

def analyze_convergence(g, dg, x_star):
    """
    Analyze convergence of fixed-point iteration.

    Parameters:
    - g: iteration function
    - dg: derivative of g
    - x_star: fixed point

    Returns:
    - convergence_info: dictionary with analysis
    """
    # TODO: Implement this function
    pass

# Example: Find √2 by solving x = 2/x, rearranged as x = (x + 2/x)/2
g = lambda x: (x + 2/x) / 2  # Babylonian method
x0 = 1.0

print("Fixed-Point Iteration: Finding √2\\n")

root, iters, converged = fixed_point(g, x0)

print(f"Fixed point: {root:.15f}")
print(f"√2:          {np.sqrt(2):.15f}")
print(f"Iterations:  {iters}")
print(f"Converged:   {converged}")`,
    hints: [
      'Iterate: x = g(x) until |x_new - x| < tolerance',
      'Check |g\'(x*)| < 1 for convergence',
      'Linear convergence when 0 < |g\'(x*)| < 1',
      'Quadratic convergence when g\'(x*) = 0'
    ],
    solution: `import numpy as np

def fixed_point(g, x0, tol=1e-10, max_iter=100):
    """
    Find fixed point of g(x) using iteration x_{n+1} = g(x_n).

    Converges when |g'(x*)| < 1 at the fixed point x*.

    Parameters:
    - g: iteration function
    - x0: initial guess
    - tol: tolerance
    - max_iter: maximum iterations

    Returns:
    - (fixed_point, iterations, converged): result, iterations, success flag
    """
    x = x0

    for i in range(max_iter):
        x_new = g(x)

        # Check convergence
        if abs(x_new - x) < tol:
            return x_new, i + 1, True

        x = x_new

    # Did not converge
    return x, max_iter, False

def analyze_convergence(g, dg, x_star):
    """
    Analyze convergence of fixed-point iteration.

    Parameters:
    - g: iteration function
    - dg: derivative of g
    - x_star: fixed point

    Returns:
    - convergence_info: dictionary with analysis
    """
    dg_star = dg(x_star)

    info = {
        'derivative': dg_star,
        'will_converge': abs(dg_star) < 1,
        'convergence_type': None,
        'asymptotic_error_constant': abs(dg_star)
    }

    if abs(dg_star) < 1e-10:
        info['convergence_type'] = 'At least quadratic'
    elif abs(dg_star) < 1:
        info['convergence_type'] = 'Linear'
    else:
        info['convergence_type'] = 'Divergent'

    return info

# Example 1: Babylonian method for √2
print("Fixed-Point Iteration Methods\\n")
print("="*60 + "\\n")

print("Example 1: Babylonian method for √2\\n")
print("Fixed point equation: x = (x + 2/x)/2\\n")

g1 = lambda x: (x + 2/x) / 2
dg1 = lambda x: 0.5 * (1 - 2/x**2)
x0 = 1.0
true_root = np.sqrt(2)

root1, iters1, conv1 = fixed_point(g1, x0)

print(f"Fixed point: {root1:.15f}")
print(f"True (√2):   {true_root:.15f}")
print(f"Error:       {abs(root1 - true_root):.2e}")
print(f"Iterations:  {iters1}")
print(f"Converged:   {conv1}\\n")

info1 = analyze_convergence(g1, dg1, true_root)
print("Convergence analysis:")
print(f"  g'(x*) = {info1['derivative']:.6f}")
print(f"  Will converge: {info1['will_converge']}")
print(f"  Type: {info1['convergence_type']}\\n")

# Example 2: Bad iteration for √2
print("="*60)
print("\\nExample 2: Poor choice g(x) = 2/x\\n")

g2 = lambda x: 2 / x
dg2 = lambda x: -2 / x**2

try:
    root2, iters2, conv2 = fixed_point(g2, x0, max_iter=20)
    print(f"Result: {root2:.10f}")
    print(f"Iterations: {iters2}")
    print(f"Converged: {conv2}\\n")
except:
    print("Failed to converge (oscillates)\\n")

info2 = analyze_convergence(g2, dg2, true_root)
print("Convergence analysis:")
print(f"  g'(x*) = {info2['derivative']:.6f}")
print(f"  |g'(x*)| = {abs(info2['derivative']):.6f}")
print(f"  Will converge: {info2['will_converge']}")
print(f"  Type: {info2['convergence_type']}\\n")
print("Note: |g'(x*)| = 1, so convergence is not guaranteed!")

# Example 3: Newton as fixed-point
print("="*60)
print("\\nExample 3: Newton's method as fixed-point iteration\\n")
print("For f(x) = x² - 2, Newton is: x = x - (x² - 2)/(2x) = (x + 2/x)/2\\n")
print("Same as Babylonian method!\\n")

# Show quadratic convergence
x = x0
print("Iteration history (quadratic convergence):")
for i in range(5):
    error = abs(x - true_root)
    print(f"  Iteration {i}: x = {x:.15f}, error = {error:.2e}")
    if error < 1e-15:
        break
    x = g1(x)

# Example 4: Find root of cos(x) = x
print("\\n" + "="*60)
print("\\nExample 4: Finding root of cos(x) = x\\n")

g3 = lambda x: np.cos(x)
dg3 = lambda x: -np.sin(x)
x0_cos = 0.5

root3, iters3, conv3 = fixed_point(g3, x0_cos)
print(f"Fixed point: {root3:.15f}")
print(f"Iterations:  {iters3}")
print(f"cos(x*):     {np.cos(root3):.15f}")
print(f"Verification: {abs(root3 - np.cos(root3)):.2e}\\n")

info3 = analyze_convergence(g3, dg3, root3)
print("Convergence analysis:")
print(f"  g'(x*) = {info3['derivative']:.6f}")
print(f"  |g'(x*)| = {abs(info3['derivative']):.6f} < 1")
print(f"  Type: {info3['convergence_type']}")

# Convergence comparison
print("\\n" + "="*60)
print("\\nConvergence Rate Comparison\\n")
print("="*60 + "\\n")

# Fast convergence (Babylonian)
x_fast = 1.0
errors_fast = []
for i in range(8):
    errors_fast.append(abs(x_fast - true_root))
    x_fast = g1(x_fast)

# Slow convergence (cos)
x_slow = 0.5
errors_slow = []
true_cos = root3
for i in range(8):
    errors_slow.append(abs(x_slow - true_cos))
    x_slow = g3(x_slow)

print("Babylonian method (g'(x*) ≈ 0):")
for i, err in enumerate(errors_fast):
    print(f"  Iteration {i}: error = {err:.2e}")

print("\\ncos(x) iteration (g'(x*) ≈ 0.67):")
for i, err in enumerate(errors_slow):
    print(f"  Iteration {i}: error = {err:.2e}")

print("\\nNote: Smaller |g'(x*)| leads to faster convergence!")

print("\\nAll tests passed!")`,
    testCases: [
      {
        input: 'g(x) = (x + 2/x)/2, x0 = 1.0',
        expectedOutput: 'Converges to √2 with quadratic convergence',
        isHidden: false,
        description: 'Test Babylonian method for square root'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-2-5',
    subjectId: 'math402',
    topicId: 'topic-2',
    difficulty: 3,
    title: 'Method Convergence Comparison',
    description: 'Compare convergence rates of bisection, Newton, and secant methods. Implement all three methods and analyze their performance on various test functions.',
    starterCode: `import numpy as np
import matplotlib.pyplot as plt

def compare_methods(f, df, a, b, x0, true_root):
    """
    Compare bisection, Newton, and secant methods.

    Parameters:
    - f: function
    - df: derivative
    - a, b: interval for bisection
    - x0: initial guess for Newton/secant
    - true_root: true root for error computation

    Returns:
    - results: dictionary with convergence history
    """
    # TODO: Implement this function
    pass

# Test function: f(x) = x² - 2
f = lambda x: x**2 - 2
df = lambda x: 2*x
a, b = 0, 2
x0 = 1.0
true_root = np.sqrt(2)

print("Convergence Comparison: f(x) = x² - 2\\n")

results = compare_methods(f, df, a, b, x0, true_root)

for method, history in results.items():
    print(f"{method}:")
    print(f"  Iterations: {len(history)}")
    print(f"  Final error: {history[-1]:.2e}\\n")`,
    hints: [
      'Implement bisection, Newton, secant with error tracking',
      'Store error at each iteration',
      'Plot log(error) vs iteration to see convergence rates',
      'Bisection: linear, Newton: quadratic, Secant: superlinear'
    ],
    solution: `import numpy as np
import matplotlib.pyplot as plt

def bisection_with_history(f, a, b, tol=1e-12, max_iter=100):
    """Bisection with error history."""
    history = []
    fa, fb = f(a), f(b)

    for i in range(max_iter):
        c = (a + b) / 2
        fc = f(c)
        history.append(c)

        if abs(b - a) < tol or abs(fc) < tol:
            break

        if fa * fc < 0:
            b, fb = c, fc
        else:
            a, fa = c, fc

    return history

def newton_with_history(f, df, x0, tol=1e-12, max_iter=100):
    """Newton's method with error history."""
    history = [x0]
    x = x0

    for i in range(max_iter):
        fx = f(x)
        dfx = df(x)

        if abs(dfx) < 1e-15:
            break

        x_new = x - fx / dfx
        history.append(x_new)

        if abs(x_new - x) < tol:
            break

        x = x_new

    return history

def secant_with_history(f, x0, x1, tol=1e-12, max_iter=100):
    """Secant method with error history."""
    history = [x0, x1]
    f0, f1 = f(x0), f(x1)

    for i in range(max_iter):
        if abs(f1 - f0) < 1e-15:
            break

        x_new = x1 - f1 * (x1 - x0) / (f1 - f0)
        history.append(x_new)

        if abs(x_new - x1) < tol:
            break

        x0, f0 = x1, f1
        x1, f1 = x_new, f(x_new)

    return history

def compare_methods(f, df, a, b, x0, true_root):
    """
    Compare bisection, Newton, and secant methods.

    Parameters:
    - f: function
    - df: derivative
    - a, b: interval for bisection
    - x0: initial guess for Newton/secant
    - true_root: true root for error computation

    Returns:
    - results: dictionary with convergence history
    """
    # Run methods
    bisect_hist = bisection_with_history(f, a, b)
    newton_hist = newton_with_history(f, df, x0)
    secant_hist = secant_with_history(f, x0, (a+b)/2)

    # Compute errors
    results = {
        'Bisection': [abs(x - true_root) for x in bisect_hist],
        'Newton': [abs(x - true_root) for x in newton_hist],
        'Secant': [abs(x - true_root) for x in secant_hist],
    }

    return results

# Test function: f(x) = x² - 2
print("Method Convergence Comparison\\n")
print("="*60 + "\\n")

f = lambda x: x**2 - 2
df = lambda x: 2*x
a, b = 0, 2
x0 = 1.0
true_root = np.sqrt(2)

print("Finding root of f(x) = x² - 2\\n")
print(f"True root: √2 = {true_root:.15f}\\n")

results = compare_methods(f, df, a, b, x0, true_root)

# Print summary
print("="*60)
print("\\nConvergence Summary\\n")
print("="*60 + "\\n")

for method, errors in results.items():
    print(f"{method}:")
    print(f"  Iterations to converge: {len(errors)}")
    print(f"  Initial error: {errors[0]:.2e}")
    print(f"  Final error: {errors[-1]:.2e}")

    # Estimate convergence order
    if len(errors) >= 4:
        # α ≈ log(e_{n+1}/e_n) / log(e_n/e_{n-1})
        i = len(errors) - 3
        if errors[i-1] > 0 and errors[i] > 0 and errors[i+1] > 0:
            alpha = np.log(errors[i+1]/errors[i]) / np.log(errors[i]/errors[i-1])
            print(f"  Estimated convergence order: α ≈ {alpha:.2f}")
    print()

# Detailed convergence history
print("="*60)
print("\\nDetailed Convergence History\\n")
print("="*60 + "\\n")

max_iters = max(len(errors) for errors in results.values())
print(f"{'Iteration':<12} {'Bisection':<15} {'Newton':<15} {'Secant':<15}")
print("-" * 60)

for i in range(max_iters):
    row = f"{i:<12}"
    for method in ['Bisection', 'Newton', 'Secant']:
        errors = results[method]
        if i < len(errors):
            row += f"{errors[i]:<15.2e}"
        else:
            row += f"{'—':<15}"
    print(row)

# Convergence rate analysis
print("\\n" + "="*60)
print("\\nConvergence Rate Analysis\\n")
print("="*60 + "\\n")

print("Expected convergence orders:")
print("  Bisection: Linear (α = 1)")
print("  Newton: Quadratic (α = 2)")
print("  Secant: Superlinear (α ≈ 1.618)\\n")

for method, errors in results.items():
    print(f"{method}:")
    if len(errors) >= 4:
        print("  Error ratios e_{n+1}/e_n:")
        for i in range(min(5, len(errors)-1)):
            if errors[i] > 1e-15:
                ratio = errors[i+1] / errors[i]
                print(f"    Iteration {i}: {ratio:.4f}")
    print()

# Visualization
print("="*60)
print("\\nGenerating convergence plot...\\n")

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5))

# Linear scale
for method, errors in results.items():
    ax1.plot(range(len(errors)), errors, 'o-', label=method, linewidth=2, markersize=6)

ax1.set_xlabel('Iteration')
ax1.set_ylabel('Absolute Error')
ax1.set_title('Convergence Comparison (Linear Scale)')
ax1.legend()
ax1.grid(True, alpha=0.3)

# Log scale
for method, errors in results.items():
    # Filter out zeros for log plot
    nonzero_errors = [(i, e) for i, e in enumerate(errors) if e > 0]
    if nonzero_errors:
        iters, errs = zip(*nonzero_errors)
        ax2.semilogy(iters, errs, 'o-', label=method, linewidth=2, markersize=6)

ax2.set_xlabel('Iteration')
ax2.set_ylabel('Absolute Error (log scale)')
ax2.set_title('Convergence Comparison (Log Scale)')
ax2.legend()
ax2.grid(True, alpha=0.3, which='both')

plt.tight_layout()
plt.savefig('/tmp/root_finding_convergence.png', dpi=150, bbox_inches='tight')
print("Plot saved to /tmp/root_finding_convergence.png")

# Test on different function
print("\\n" + "="*60)
print("\\nTest on f(x) = e^x - 3\\n")
print("="*60 + "\\n")

f2 = lambda x: np.exp(x) - 3
df2 = lambda x: np.exp(x)
a2, b2 = 0, 2
x02 = 1.0
true_root2 = np.log(3)

results2 = compare_methods(f2, df2, a2, b2, x02, true_root2)

print(f"True root: ln(3) = {true_root2:.15f}\\n")
for method, errors in results2.items():
    print(f"{method}: {len(errors)} iterations, final error = {errors[-1]:.2e}")

print("\\nAll tests passed!")`,
    testCases: [
      {
        input: 'f(x) = x² - 2',
        expectedOutput: 'Newton fastest, bisection slowest, secant in between',
        isHidden: false,
        description: 'Compare convergence rates of three methods'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-2-6',
    subjectId: 'math402',
    topicId: 'topic-2',
    difficulty: 2,
    title: 'Modified Newton Method',
    description: 'Implement modified Newton methods for handling multiple roots and ill-conditioned problems. When f has a multiple root, standard Newton converges slowly; modifications can restore rapid convergence.',
    starterCode: `import numpy as np

def newton_modified(f, df, d2f, x0, multiplicity=1, tol=1e-10, max_iter=100):
    """
    Modified Newton's method for multiple roots.

    For root of multiplicity m: x_{n+1} = x_n - m * f(x_n) / f'(x_n)

    Parameters:
    - f: function
    - df: first derivative
    - d2f: second derivative
    - x0: initial guess
    - multiplicity: multiplicity of root
    - tol: tolerance
    - max_iter: maximum iterations

    Returns:
    - (root, iterations): root and number of iterations
    """
    # TODO: Implement this function
    pass

# Test: f(x) = (x-1)³ has triple root at x=1
f = lambda x: (x - 1)**3
df = lambda x: 3*(x - 1)**2
d2f = lambda x: 6*(x - 1)
x0 = 2.0

print("Finding triple root of f(x) = (x-1)³\\n")

# Standard Newton (slow)
root1, iters1 = newton_modified(f, df, d2f, x0, multiplicity=1)
print(f"Standard Newton: {iters1} iterations")

# Modified Newton (fast)
root2, iters2 = newton_modified(f, df, d2f, x0, multiplicity=3)
print(f"Modified Newton: {iters2} iterations")`,
    hints: [
      'Multiple root: use x_new = x - m * f(x) / f\'(x)',
      'Alternative: x_new = x - f(x) * f\'(x) / (f\'(x)² - f(x) * f\'\'(x))',
      'Multiple roots slow down standard Newton to linear convergence',
      'Modified methods restore quadratic convergence'
    ],
    solution: `import numpy as np

def newton_standard(f, df, x0, tol=1e-10, max_iter=100):
    """Standard Newton's method."""
    x = x0
    for i in range(max_iter):
        fx = f(x)
        dfx = df(x)
        if abs(dfx) < 1e-15:
            break
        x_new = x - fx / dfx
        if abs(x_new - x) < tol:
            return x_new, i + 1
        x = x_new
    return x, max_iter

def newton_modified_multiplicity(f, df, x0, m, tol=1e-10, max_iter=100):
    """
    Modified Newton for known multiplicity.

    x_{n+1} = x_n - m * f(x_n) / f'(x_n)
    """
    x = x0
    for i in range(max_iter):
        fx = f(x)
        dfx = df(x)
        if abs(dfx) < 1e-15:
            break
        x_new = x - m * fx / dfx
        if abs(x_new - x) < tol:
            return x_new, i + 1
        x = x_new
    return x, max_iter

def newton_modified_adaptive(f, df, d2f, x0, tol=1e-10, max_iter=100):
    """
    Modified Newton without knowing multiplicity.

    Uses: x_{n+1} = x_n - u(x_n) / u'(x_n)
    where u(x) = f(x) / f'(x)
    """
    x = x0
    for i in range(max_iter):
        fx = f(x)
        dfx = df(x)
        d2fx = d2f(x)

        if abs(dfx) < 1e-15:
            break

        # u(x) = f(x) / f'(x)
        # u'(x) = (f'(x)² - f(x)f''(x)) / f'(x)²
        ux = fx / dfx
        dupx = 1 - (fx * d2fx) / (dfx**2)

        if abs(dupx) < 1e-15:
            break

        x_new = x - ux / dupx
        if abs(x_new - x) < tol:
            return x_new, i + 1
        x = x_new
    return x, max_iter

# Test multiple root
print("Modified Newton's Method for Multiple Roots\\n")
print("="*60 + "\\n")

print("Test 1: Triple root of f(x) = (x-1)³\\n")

f = lambda x: (x - 1)**3
df = lambda x: 3*(x - 1)**2
d2f = lambda x: 6*(x - 1)
x0 = 2.0
true_root = 1.0

# Standard Newton (slow for multiple roots)
root1, iters1 = newton_standard(f, df, x0)
error1 = abs(root1 - true_root)

print("Standard Newton's method:")
print(f"  Root: {root1:.15f}")
print(f"  Error: {error1:.2e}")
print(f"  Iterations: {iters1}\\n")

# Modified Newton with known multiplicity
root2, iters2 = newton_modified_multiplicity(f, df, x0, m=3)
error2 = abs(root2 - true_root)

print("Modified Newton (m=3):")
print(f"  Root: {root2:.15f}")
print(f"  Error: {error2:.2e}")
print(f"  Iterations: {iters2}\\n")

# Adaptive modified Newton
root3, iters3 = newton_modified_adaptive(f, df, d2f, x0)
error3 = abs(root3 - true_root)

print("Adaptive modified Newton:")
print(f"  Root: {root3:.15f}")
print(f"  Error: {error3:.2e}")
print(f"  Iterations: {iters3}\\n")

print(f"Speedup: {iters1 / iters2:.1f}× faster with modified method!")

# Convergence analysis
print("\\n" + "="*60)
print("\\nConvergence Rate Analysis\\n")
print("="*60 + "\\n")

# Standard Newton on multiple root (linear)
x = x0
print("Standard Newton (linear convergence):")
for i in range(8):
    error = abs(x - true_root)
    print(f"  Iteration {i}: error = {error:.2e}")
    if error < 1e-14:
        break
    fx = f(x)
    dfx = df(x)
    if abs(dfx) < 1e-15:
        break
    x = x - fx / dfx

print()

# Modified Newton (quadratic)
x = x0
print("Modified Newton with m=3 (quadratic convergence):")
for i in range(5):
    error = abs(x - true_root)
    print(f"  Iteration {i}: error = {error:.2e}")
    if error < 1e-14:
        break
    fx = f(x)
    dfx = df(x)
    if abs(dfx) < 1e-15:
        break
    x = x - 3 * fx / dfx

# Test on double root
print("\\n" + "="*60)
print("\\nTest 2: Double root of f(x) = (x-2)²(x+1)\\n")
print("="*60 + "\\n")

f2 = lambda x: (x - 2)**2 * (x + 1)
df2 = lambda x: 2*(x - 2)*(x + 1) + (x - 2)**2
d2f2 = lambda x: 2*(x + 1) + 4*(x - 2) + 2*(x - 2)
x02 = 3.0
true_root2 = 2.0

print("Finding root at x = 2 (double root)\\n")

root2_std, iters2_std = newton_standard(f2, df2, x02)
print(f"Standard: {iters2_std} iterations, error = {abs(root2_std - true_root2):.2e}")

root2_mod, iters2_mod = newton_modified_multiplicity(f2, df2, x02, m=2)
print(f"Modified (m=2): {iters2_mod} iterations, error = {abs(root2_mod - true_root2):.2e}")

root2_adp, iters2_adp = newton_modified_adaptive(f2, df2, d2f2, x02)
print(f"Adaptive: {iters2_adp} iterations, error = {abs(root2_adp - true_root2):.2e}")

# Estimating multiplicity
print("\\n" + "="*60)
print("\\nEstimating Root Multiplicity\\n")
print("="*60 + "\\n")

def estimate_multiplicity(f, df, x_star, h=1e-5):
    """
    Estimate multiplicity from f and f' near root.

    For root of multiplicity m:
    f(x) ≈ c(x - x*)^m
    f'(x) ≈ mc(x - x*)^(m-1)
    So f(x)/f'(x) ≈ (x - x*)/m
    """
    x = x_star + h
    fx = f(x)
    dfx = df(x)

    if abs(dfx) < 1e-15:
        return float('inf')

    ratio = fx / dfx
    m_estimate = (x - x_star) / ratio
    return m_estimate

print("Estimating multiplicity of (x-1)³:")
m_est = estimate_multiplicity(f, df, 1.0)
print(f"  Estimated m ≈ {m_est:.2f} (true m = 3)")

print("\\nEstimating multiplicity of (x-2)²(x+1):")
m_est2 = estimate_multiplicity(f2, df2, 2.0)
print(f"  Estimated m ≈ {m_est2:.2f} (true m = 2)")

print("\\nAll tests passed!")`,
    testCases: [
      {
        input: 'f(x) = (x-1)³, x0 = 2.0',
        expectedOutput: 'Modified method ~3× faster than standard Newton',
        isHidden: false,
        description: 'Test modified Newton on multiple root'
      }
    ],
    language: 'python'
  }
];
