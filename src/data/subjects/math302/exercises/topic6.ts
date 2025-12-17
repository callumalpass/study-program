import { CodingExercise } from '../../../../core/types';

export const topic6Exercises: CodingExercise[] = [
  {
    id: 'math302-t6-ex01',
    subjectId: 'math302',
    topicId: 'math302-topic-6',
    title: 'Power Series Coefficient',
    difficulty: 1,
    description: 'For a power series ∑aₙxⁿ, compute the coefficient aₙ for the expansion of 1/(1-x) = ∑xⁿ. The nth coefficient is 1.',
    starterCode: `def geometric_coefficient(n):
    """
    Return the nth coefficient of 1/(1-x) = ∑xⁿ.

    Args:
        n: Coefficient index

    Returns:
        The coefficient (always 1 for geometric series)
    """
    pass`,
    solution: `def geometric_coefficient(n):
    """
    Return the nth coefficient of 1/(1-x) = ∑xⁿ.

    Args:
        n: Coefficient index

    Returns:
        The coefficient (always 1 for geometric series)
    """
    # For 1/(1-x) = 1 + x + x² + x³ + ...
    # All coefficients are 1
    return 1`,
    testCases: [
      { input: '0', expectedOutput: '1', isHidden: false, description: 'Coefficient a₀' },
      { input: '1', expectedOutput: '1', isHidden: false, description: 'Coefficient a₁' },
      { input: '5', expectedOutput: '1', isHidden: false, description: 'Coefficient a₅' },
      { input: '10', expectedOutput: '1', isHidden: true, description: 'Coefficient a₁₀' },
      { input: '100', expectedOutput: '1', isHidden: true, description: 'Coefficient a₁₀₀' }
    ],
    hints: [
      '1/(1-x) is the geometric series',
      'The expansion is 1 + x + x² + x³ + ...',
      'Every coefficient equals 1'
    ],
    language: 'python'
  },
  {
    id: 'math302-t6-ex02',
    subjectId: 'math302',
    topicId: 'math302-topic-6',
    title: 'Exponential Series Coefficient',
    difficulty: 2,
    description: 'The exponential function has expansion e^x = ∑(xⁿ/n!). Compute the nth coefficient aₙ = 1/n!.',
    starterCode: `import math

def exponential_coefficient(n):
    """
    Return the nth coefficient of e^x = ∑(xⁿ/n!).

    Args:
        n: Coefficient index

    Returns:
        1/n!
    """
    pass`,
    solution: `import math

def exponential_coefficient(n):
    """
    Return the nth coefficient of e^x = ∑(xⁿ/n!).

    Args:
        n: Coefficient index

    Returns:
        1/n!
    """
    # e^x = 1 + x + x²/2! + x³/3! + ...
    # Coefficient aₙ = 1/n!
    return 1.0 / math.factorial(n)`,
    testCases: [
      { input: '0', expectedOutput: '1.0', isHidden: false, description: 'a₀ = 1/0!' },
      { input: '1', expectedOutput: '1.0', isHidden: false, description: 'a₁ = 1/1!' },
      { input: '2', expectedOutput: '0.5', isHidden: false, description: 'a₂ = 1/2!' },
      { input: '3', expectedOutput: '0.16666666666666666', isHidden: false, description: 'a₃ = 1/3!' },
      { input: '5', expectedOutput: '0.008333333333333333', isHidden: true, description: 'a₅ = 1/5!' }
    ],
    hints: [
      'e^x = ∑(xⁿ/n!) for n=0 to ∞',
      'The coefficient of xⁿ is 1/n!',
      'Use math.factorial(n)'
    ],
    language: 'python'
  },
  {
    id: 'math302-t6-ex03',
    subjectId: 'math302',
    topicId: 'math302-topic-6',
    title: 'Sine Series Coefficient',
    difficulty: 2,
    description: 'The sine function has expansion sin(x) = ∑((-1)ⁿx^(2n+1)/(2n+1)!). Compute the coefficient for the x^k term.',
    starterCode: `import math

def sine_coefficient(k):
    """
    Return coefficient of x^k in sin(x) expansion.
    Non-zero only for odd k.

    Args:
        k: Power of x

    Returns:
        Coefficient or 0 if k is even
    """
    pass`,
    solution: `import math

def sine_coefficient(k):
    """
    Return coefficient of x^k in sin(x) expansion.
    Non-zero only for odd k.

    Args:
        k: Power of x

    Returns:
        Coefficient or 0 if k is even
    """
    # sin(x) = x - x³/3! + x⁵/5! - x⁷/7! + ...
    # Only odd powers have non-zero coefficients
    if k % 2 == 0:
        return 0.0

    # For odd k, coefficient is (-1)^((k-1)/2) / k!
    n = (k - 1) // 2
    sign = (-1) ** n
    return sign / math.factorial(k)`,
    testCases: [
      { input: '0', expectedOutput: '0.0', isHidden: false, description: 'Even power, coefficient is 0' },
      { input: '1', expectedOutput: '1.0', isHidden: false, description: 'x term coefficient' },
      { input: '2', expectedOutput: '0.0', isHidden: false, description: 'Even power, coefficient is 0' },
      { input: '3', expectedOutput: '-0.16666666666666666', isHidden: false, description: 'x³ term coefficient' },
      { input: '5', expectedOutput: '0.008333333333333333', isHidden: true, description: 'x⁵ term coefficient' }
    ],
    hints: [
      'sin(x) only has odd powers of x',
      'Return 0 for even k',
      'For odd k: coefficient is (-1)^n/k! where n = (k-1)/2'
    ],
    language: 'python'
  },
  {
    id: 'math302-t6-ex04',
    subjectId: 'math302',
    topicId: 'math302-topic-6',
    title: 'Cosine Series Coefficient',
    difficulty: 2,
    description: 'The cosine function has expansion cos(x) = ∑((-1)ⁿx^(2n)/(2n)!). Compute the coefficient for the x^k term.',
    starterCode: `import math

def cosine_coefficient(k):
    """
    Return coefficient of x^k in cos(x) expansion.
    Non-zero only for even k.

    Args:
        k: Power of x

    Returns:
        Coefficient or 0 if k is odd
    """
    pass`,
    solution: `import math

def cosine_coefficient(k):
    """
    Return coefficient of x^k in cos(x) expansion.
    Non-zero only for even k.

    Args:
        k: Power of x

    Returns:
        Coefficient or 0 if k is odd
    """
    # cos(x) = 1 - x²/2! + x⁴/4! - x⁶/6! + ...
    # Only even powers have non-zero coefficients
    if k % 2 != 0:
        return 0.0

    # For even k, coefficient is (-1)^(k/2) / k!
    n = k // 2
    sign = (-1) ** n
    return sign / math.factorial(k)`,
    testCases: [
      { input: '0', expectedOutput: '1.0', isHidden: false, description: 'Constant term' },
      { input: '1', expectedOutput: '0.0', isHidden: false, description: 'Odd power, coefficient is 0' },
      { input: '2', expectedOutput: '-0.5', isHidden: false, description: 'x² term coefficient' },
      { input: '3', expectedOutput: '0.0', isHidden: false, description: 'Odd power, coefficient is 0' },
      { input: '4', expectedOutput: '0.041666666666666664', isHidden: true, description: 'x⁴ term coefficient' }
    ],
    hints: [
      'cos(x) only has even powers of x',
      'Return 0 for odd k',
      'For even k: coefficient is (-1)^(k/2)/k!'
    ],
    language: 'python'
  },
  {
    id: 'math302-t6-ex05',
    subjectId: 'math302',
    topicId: 'math302-topic-6',
    title: 'Recurrence Relation - Fibonacci',
    difficulty: 2,
    description: 'Solve the recurrence relation aₙ = aₙ₋₁ + aₙ₋₂ with a₀=0, a₁=1 (Fibonacci sequence). Implement using iteration.',
    starterCode: `def fibonacci_coefficient(n):
    """
    Compute nth Fibonacci number using recurrence aₙ = aₙ₋₁ + aₙ₋₂.

    Args:
        n: Index

    Returns:
        nth Fibonacci number
    """
    pass`,
    solution: `def fibonacci_coefficient(n):
    """
    Compute nth Fibonacci number using recurrence aₙ = aₙ₋₁ + aₙ₋₂.

    Args:
        n: Index

    Returns:
        nth Fibonacci number
    """
    if n == 0:
        return 0
    if n == 1:
        return 1

    # Use iteration to avoid recursion depth issues
    a_prev2 = 0
    a_prev1 = 1

    for i in range(2, n + 1):
        a_curr = a_prev1 + a_prev2
        a_prev2 = a_prev1
        a_prev1 = a_curr

    return a_prev1`,
    testCases: [
      { input: '0', expectedOutput: '0', isHidden: false, description: 'F₀ = 0' },
      { input: '1', expectedOutput: '1', isHidden: false, description: 'F₁ = 1' },
      { input: '5', expectedOutput: '5', isHidden: false, description: 'F₅ = 5' },
      { input: '10', expectedOutput: '55', isHidden: true, description: 'F₁₀ = 55' },
      { input: '15', expectedOutput: '610', isHidden: true, description: 'F₁₅ = 610' }
    ],
    hints: [
      'Base cases: a₀ = 0, a₁ = 1',
      'Use iteration: aₙ = aₙ₋₁ + aₙ₋₂',
      'Keep track of previous two values'
    ],
    language: 'python'
  },
  {
    id: 'math302-t6-ex06',
    subjectId: 'math302',
    topicId: 'math302-topic-6',
    title: 'Three-Term Recurrence',
    difficulty: 3,
    description: 'Solve the recurrence relation aₙ = 2aₙ₋₁ - aₙ₋₂ with a₀=1, a₁=3. This generates an arithmetic sequence.',
    starterCode: `def three_term_recurrence(n):
    """
    Compute nth term of aₙ = 2aₙ₋₁ - aₙ₋₂, a₀=1, a₁=3.

    Args:
        n: Index

    Returns:
        nth term
    """
    pass`,
    solution: `def three_term_recurrence(n):
    """
    Compute nth term of aₙ = 2aₙ₋₁ - aₙ₋₂, a₀=1, a₁=3.

    Args:
        n: Index

    Returns:
        nth term
    """
    if n == 0:
        return 1
    if n == 1:
        return 3

    # Iteration
    a_prev2 = 1
    a_prev1 = 3

    for i in range(2, n + 1):
        a_curr = 2 * a_prev1 - a_prev2
        a_prev2 = a_prev1
        a_prev1 = a_curr

    return a_prev1`,
    testCases: [
      { input: '0', expectedOutput: '1', isHidden: false, description: 'a₀ = 1' },
      { input: '1', expectedOutput: '3', isHidden: false, description: 'a₁ = 3' },
      { input: '2', expectedOutput: '5', isHidden: false, description: 'a₂ = 2(3) - 1 = 5' },
      { input: '5', expectedOutput: '11', isHidden: true, description: 'a₅ = 11' },
      { input: '10', expectedOutput: '21', isHidden: true, description: 'a₁₀ = 21' }
    ],
    hints: [
      'Base cases: a₀ = 1, a₁ = 3',
      'Use recurrence: aₙ = 2aₙ₋₁ - aₙ₋₂',
      'This generates the sequence 1, 3, 5, 7, 9, ... (odd numbers)'
    ],
    language: 'python'
  },
  {
    id: 'math302-t6-ex07',
    subjectId: 'math302',
    topicId: 'math302-topic-6',
    title: 'Power Series Solution Coefficient',
    difficulty: 3,
    description: 'For y\'\' + y = 0 with power series solution y = ∑aₙxⁿ, derive the recurrence: aₙ₊₂ = -aₙ/(n+2)(n+1). Compute coefficients.',
    starterCode: `def ode_series_coefficient(n, a0, a1):
    """
    Compute nth coefficient for y'' + y = 0 using recurrence.
    aₙ₊₂ = -aₙ/((n+2)(n+1))

    Args:
        n: Coefficient index
        a0: Initial coefficient a₀
        a1: Initial coefficient a₁

    Returns:
        nth coefficient
    """
    pass`,
    solution: `def ode_series_coefficient(n, a0, a1):
    """
    Compute nth coefficient for y'' + y = 0 using recurrence.
    aₙ₊₂ = -aₙ/((n+2)(n+1))

    Args:
        n: Coefficient index
        a0: Initial coefficient a₀
        a1: Initial coefficient a₁

    Returns:
        nth coefficient
    """
    # Build array of coefficients
    a = [0.0] * (n + 1)
    a[0] = a0
    if n >= 1:
        a[1] = a1

    # Apply recurrence: aₙ₊₂ = -aₙ/((n+2)(n+1))
    for i in range(2, n + 1):
        a[i] = -a[i - 2] / (i * (i - 1))

    return a[n]`,
    testCases: [
      { input: '0, 1, 0', expectedOutput: '1.0', isHidden: false, description: 'a₀ = 1' },
      { input: '1, 1, 0', expectedOutput: '0.0', isHidden: false, description: 'a₁ = 0' },
      { input: '2, 1, 0', expectedOutput: '-0.5', isHidden: false, description: 'a₂ = -a₀/2' },
      { input: '4, 1, 0', expectedOutput: '0.041666666666666664', isHidden: true, description: 'a₄ coefficient' },
      { input: '3, 0, 1', expectedOutput: '-0.16666666666666666', isHidden: true, description: 'Odd series a₃' }
    ],
    hints: [
      'Use the recurrence relation aₙ₊₂ = -aₙ/((n+2)(n+1))',
      'Start with a[0] = a0 and a[1] = a1',
      'Build up coefficients iteratively'
    ],
    language: 'python'
  },
  {
    id: 'math302-t6-ex08',
    subjectId: 'math302',
    topicId: 'math302-topic-6',
    title: 'Airy Equation Recurrence',
    difficulty: 4,
    description: 'The Airy equation y\'\' - xy = 0 has recurrence aₙ₊₂ = aₙ₋₁/(n+2)(n+1). Compute the power series coefficients.',
    starterCode: `def airy_coefficient(n, a0, a1):
    """
    Compute nth coefficient for Airy equation y'' - xy = 0.
    aₙ₊₂ = aₙ₋₁/((n+2)(n+1))

    Args:
        n: Coefficient index
        a0: Initial coefficient a₀
        a1: Initial coefficient a₁

    Returns:
        nth coefficient
    """
    pass`,
    solution: `def airy_coefficient(n, a0, a1):
    """
    Compute nth coefficient for Airy equation y'' - xy = 0.
    aₙ₊₂ = aₙ₋₁/((n+2)(n+1))

    Args:
        n: Coefficient index
        a0: Initial coefficient a₀
        a1: Initial coefficient a₁

    Returns:
        nth coefficient
    """
    # Build coefficient array
    a = [0.0] * (n + 1)
    a[0] = a0
    if n >= 1:
        a[1] = a1

    # Apply recurrence: aₙ₊₂ = aₙ₋₁/((n+2)(n+1))
    # Note: aₙ₊₂ depends on aₙ₋₁, not aₙ
    for i in range(2, n + 1):
        if i - 1 >= 0:
            a[i] = a[i - 1] / (i * (i - 1))
        else:
            a[i] = 0.0

    return a[n]`,
    testCases: [
      { input: '0, 1, 0', expectedOutput: '1.0', isHidden: false, description: 'a₀ = 1' },
      { input: '1, 1, 0', expectedOutput: '0.0', isHidden: false, description: 'a₁ = 0' },
      { input: '2, 1, 0', expectedOutput: '0.0', isHidden: false, description: 'a₂ from a₋₁ = 0' },
      { input: '3, 1, 1', expectedOutput: '0.16666666666666666', isHidden: true, description: 'a₃ from a₂' },
      { input: '4, 1, 0', expectedOutput: '0.0', isHidden: true, description: 'a₄ coefficient' }
    ],
    hints: [
      'Recurrence: aₙ₊₂ = aₙ₋₁/((n+2)(n+1))',
      'Each coefficient depends on the one THREE positions back',
      'Handle the case when index would be negative'
    ],
    language: 'python'
  },
  {
    id: 'math302-t6-ex09',
    subjectId: 'math302',
    topicId: 'math302-topic-6',
    title: 'Bessel Function J0 Coefficient',
    difficulty: 4,
    description: 'The Bessel function J₀(x) has series ∑((-1)ⁿx^(2n))/(2^(2n)(n!)²). Compute the coefficient of x^(2n).',
    starterCode: `import math

def bessel_j0_coefficient(n):
    """
    Compute coefficient of x^(2n) in J₀(x) series.
    Coefficient: (-1)^n / (2^(2n) * (n!)²)

    Args:
        n: Index (coefficient of x^(2n))

    Returns:
        Coefficient value
    """
    pass`,
    solution: `import math

def bessel_j0_coefficient(n):
    """
    Compute coefficient of x^(2n) in J₀(x) series.
    Coefficient: (-1)^n / (2^(2n) * (n!)²)

    Args:
        n: Index (coefficient of x^(2n))

    Returns:
        Coefficient value
    """
    # J₀(x) = ∑ (-1)^n * x^(2n) / (2^(2n) * (n!)²)
    sign = (-1) ** n
    power_of_2 = 2 ** (2 * n)
    factorial_squared = math.factorial(n) ** 2

    return sign / (power_of_2 * factorial_squared)`,
    testCases: [
      { input: '0', expectedOutput: '1.0', isHidden: false, description: 'n=0 coefficient' },
      { input: '1', expectedOutput: '-0.25', isHidden: false, description: 'n=1 coefficient' },
      { input: '2', expectedOutput: '0.015625', isHidden: false, description: 'n=2 coefficient' },
      { input: '3', expectedOutput: '-0.0004340277777777778', isHidden: true, description: 'n=3 coefficient' },
      { input: '4', expectedOutput: '0.000006781684027777778', isHidden: true, description: 'n=4 coefficient' }
    ],
    hints: [
      'J₀(x) = ∑(-1)ⁿx^(2n)/(2^(2n)(n!)²)',
      'Sign alternates: (-1)^n',
      'Denominator has 2^(2n) and (n!)²'
    ],
    language: 'python'
  },
  {
    id: 'math302-t6-ex10',
    subjectId: 'math302',
    topicId: 'math302-topic-6',
    title: 'Legendre Polynomial Coefficient',
    difficulty: 4,
    description: 'Legendre polynomials satisfy (n+1)Pₙ₊₁ = (2n+1)xPₙ - nPₙ₋₁. Compute Pₙ(x) evaluated at a specific x using this recurrence.',
    starterCode: `def legendre_polynomial(n, x):
    """
    Compute nth Legendre polynomial Pₙ(x) using recurrence.
    (n+1)Pₙ₊₁ = (2n+1)xPₙ - nPₙ₋₁

    Args:
        n: Polynomial degree
        x: Evaluation point

    Returns:
        Pₙ(x)
    """
    pass`,
    solution: `def legendre_polynomial(n, x):
    """
    Compute nth Legendre polynomial Pₙ(x) using recurrence.
    (n+1)Pₙ₊₁ = (2n+1)xPₙ - nPₙ₋₁

    Args:
        n: Polynomial degree
        x: Evaluation point

    Returns:
        Pₙ(x)
    """
    # Base cases
    if n == 0:
        return 1.0
    if n == 1:
        return x

    # Use recurrence: Pₙ₊₁ = ((2n+1)xPₙ - nPₙ₋₁)/(n+1)
    P_prev2 = 1.0  # P₀
    P_prev1 = x    # P₁

    for i in range(1, n):
        P_curr = ((2 * i + 1) * x * P_prev1 - i * P_prev2) / (i + 1)
        P_prev2 = P_prev1
        P_prev1 = P_curr

    return P_prev1`,
    testCases: [
      { input: '0, 0.5', expectedOutput: '1.0', isHidden: false, description: 'P₀(x) = 1' },
      { input: '1, 0.5', expectedOutput: '0.5', isHidden: false, description: 'P₁(x) = x' },
      { input: '2, 0.5', expectedOutput: '-0.125', isHidden: false, description: 'P₂(0.5)' },
      { input: '3, 1', expectedOutput: '1.0', isHidden: true, description: 'P₃(1) = 1' },
      { input: '4, 0', expectedOutput: '0.375', isHidden: true, description: 'P₄(0)' }
    ],
    hints: [
      'Base cases: P₀ = 1, P₁ = x',
      'Recurrence: Pₙ₊₁ = ((2n+1)xPₙ - nPₙ₋₁)/(n+1)',
      'Iterate from i=1 to n-1'
    ],
    language: 'python'
  },
  {
    id: 'math302-t6-ex11',
    subjectId: 'math302',
    topicId: 'math302-topic-6',
    title: 'Frobenius Method Indicial Equation',
    difficulty: 4,
    description: 'For the Frobenius method applied to x²y\'\' + xy\' + (x²-ν²)y = 0, the indicial equation is r² - ν² = 0. Find the roots r.',
    starterCode: `import math

def frobenius_indicial_roots(nu):
    """
    Find roots of indicial equation r² - ν² = 0.

    Args:
        nu: Parameter ν

    Returns:
        Tuple (r1, r2) where r1 >= r2
    """
    pass`,
    solution: `import math

def frobenius_indicial_roots(nu):
    """
    Find roots of indicial equation r² - ν² = 0.

    Args:
        nu: Parameter ν

    Returns:
        Tuple (r1, r2) where r1 >= r2
    """
    # r² - ν² = 0
    # r² = ν²
    # r = ±ν
    r1 = abs(nu)
    r2 = -abs(nu)

    # Return with r1 >= r2
    return (r1, r2)`,
    testCases: [
      { input: '0', expectedOutput: '(0.0, 0.0)', isHidden: false, description: 'ν=0 gives repeated root' },
      { input: '1', expectedOutput: '(1.0, -1.0)', isHidden: false, description: 'ν=1 gives ±1' },
      { input: '2', expectedOutput: '(2.0, -2.0)', isHidden: false, description: 'ν=2 gives ±2' },
      { input: '0.5', expectedOutput: '(0.5, -0.5)', isHidden: true, description: 'Fractional ν' },
      { input: '3', expectedOutput: '(3.0, -3.0)', isHidden: true, description: 'ν=3 gives ±3' }
    ],
    hints: [
      'Indicial equation: r² - ν² = 0',
      'Solve for r: r² = ν²',
      'Roots are r = ±ν'
    ],
    language: 'python'
  },
  {
    id: 'math302-t6-ex12',
    subjectId: 'math302',
    topicId: 'math302-topic-6',
    title: 'Series Radius of Convergence',
    difficulty: 3,
    description: 'For a power series ∑aₙxⁿ, the radius of convergence R is given by 1/R = lim|aₙ₊₁/aₙ|. Estimate R from coefficient ratios.',
    starterCode: `def radius_of_convergence(coefficients):
    """
    Estimate radius of convergence from coefficient ratios.
    R = lim(aₙ/aₙ₊₁)

    Args:
        coefficients: List of coefficients [a₀, a₁, ..., aₙ]

    Returns:
        Estimated radius
    """
    pass`,
    solution: `def radius_of_convergence(coefficients):
    """
    Estimate radius of convergence from coefficient ratios.
    R = lim(aₙ/aₙ₊₁)

    Args:
        coefficients: List of coefficients [a₀, a₁, ..., aₙ]

    Returns:
        Estimated radius
    """
    if len(coefficients) < 2:
        return float('inf')

    # Use the last ratio as estimate
    # 1/R = |aₙ₊₁/aₙ|, so R = |aₙ/aₙ₊₁|
    n = len(coefficients) - 1

    if abs(coefficients[n]) < 1e-10:
        return float('inf')

    ratio = abs(coefficients[n - 1] / coefficients[n])
    return ratio`,
    testCases: [
      { input: '[1, 1, 1, 1]', expectedOutput: '1.0', isHidden: false, description: 'Geometric series R=1' },
      { input: '[1, 1, 0.5, 0.16666666666666666]', expectedOutput: '3.0', isHidden: false, description: 'Exponential series' },
      { input: '[1, 0.5, 0.25, 0.125]', expectedOutput: '2.0', isHidden: false, description: 'Series with R=2' },
      { input: '[1, 2, 4, 8]', expectedOutput: '0.5', isHidden: true, description: 'Series with R=0.5' },
      { input: '[1, 0.1, 0.01, 0.001]', expectedOutput: '10.0', isHidden: true, description: 'Series with R=10' }
    ],
    hints: [
      'Radius R = lim|aₙ/aₙ₊₁| (ratio test)',
      'Use the last available ratio as an estimate',
      'Handle the case where aₙ₊₁ might be very small'
    ],
    language: 'python'
  },
  {
    id: 'math302-t6-ex13',
    subjectId: 'math302',
    topicId: 'math302-topic-6',
    title: 'Power Series Evaluation',
    difficulty: 3,
    description: 'Evaluate a power series ∑aₙxⁿ at a given point x using partial sums. Sum the first N terms.',
    starterCode: `def evaluate_series(coefficients, x):
    """
    Evaluate power series ∑aₙxⁿ at point x.

    Args:
        coefficients: List of coefficients [a₀, a₁, ..., aₙ]
        x: Evaluation point

    Returns:
        Partial sum
    """
    pass`,
    solution: `def evaluate_series(coefficients, x):
    """
    Evaluate power series ∑aₙxⁿ at point x.

    Args:
        coefficients: List of coefficients [a₀, a₁, ..., aₙ]
        x: Evaluation point

    Returns:
        Partial sum
    """
    result = 0.0
    x_power = 1.0  # x^0 = 1

    for a_n in coefficients:
        result += a_n * x_power
        x_power *= x

    return result`,
    testCases: [
      { input: '[1, 1, 1], 0.5', expectedOutput: '1.75', isHidden: false, description: '1 + 0.5 + 0.25' },
      { input: '[1, 1, 0.5, 0.16666666666666666], 1', expectedOutput: '2.666666666666667', isHidden: false, description: 'e^x partial sum at x=1' },
      { input: '[1, 0, -0.5], 2', expectedOutput: '-1.0', isHidden: false, description: '1 - x²/2 at x=2' },
      { input: '[1, 1, 1, 1, 1], 0.1', expectedOutput: '1.1111', isHidden: true, description: 'Geometric at x=0.1' },
      { input: '[1, -1, 1, -1], 0.5', expectedOutput: '0.75', isHidden: true, description: 'Alternating series' }
    ],
    hints: [
      'Sum the series: result = a₀ + a₁x + a₂x² + ...',
      'Use Horner\'s method or track powers of x',
      'Accumulate terms iteratively'
    ],
    language: 'python'
  },
  {
    id: 'math302-t6-ex14',
    subjectId: 'math302',
    topicId: 'math302-topic-6',
    title: 'Hermite Polynomial Recurrence',
    difficulty: 4,
    description: 'Hermite polynomials satisfy Hₙ₊₁ = 2xHₙ - 2nHₙ₋₁. Compute Hₙ(x) using this recurrence with H₀=1, H₁=2x.',
    starterCode: `def hermite_polynomial(n, x):
    """
    Compute nth Hermite polynomial Hₙ(x) using recurrence.
    Hₙ₊₁ = 2xHₙ - 2nHₙ₋₁

    Args:
        n: Polynomial degree
        x: Evaluation point

    Returns:
        Hₙ(x)
    """
    pass`,
    solution: `def hermite_polynomial(n, x):
    """
    Compute nth Hermite polynomial Hₙ(x) using recurrence.
    Hₙ₊₁ = 2xHₙ - 2nHₙ₋₁

    Args:
        n: Polynomial degree
        x: Evaluation point

    Returns:
        Hₙ(x)
    """
    # Base cases
    if n == 0:
        return 1.0
    if n == 1:
        return 2.0 * x

    # Use recurrence: Hₙ₊₁ = 2xHₙ - 2nHₙ₋₁
    H_prev2 = 1.0      # H₀
    H_prev1 = 2.0 * x  # H₁

    for i in range(1, n):
        H_curr = 2 * x * H_prev1 - 2 * i * H_prev2
        H_prev2 = H_prev1
        H_prev1 = H_curr

    return H_prev1`,
    testCases: [
      { input: '0, 1', expectedOutput: '1.0', isHidden: false, description: 'H₀(x) = 1' },
      { input: '1, 1', expectedOutput: '2.0', isHidden: false, description: 'H₁(1) = 2' },
      { input: '2, 1', expectedOutput: '2.0', isHidden: false, description: 'H₂(1) = 2(1)(2) - 2(1)(1) = 2' },
      { input: '3, 0.5', expectedOutput: '-2.0', isHidden: true, description: 'H₃(0.5)' },
      { input: '4, 1', expectedOutput: '-4.0', isHidden: true, description: 'H₄(1)' }
    ],
    hints: [
      'Base cases: H₀ = 1, H₁ = 2x',
      'Recurrence: Hₙ₊₁ = 2xHₙ - 2nHₙ₋₁',
      'Keep track of two previous values'
    ],
    language: 'python'
  },
  {
    id: 'math302-t6-ex15',
    subjectId: 'math302',
    topicId: 'math302-topic-6',
    title: 'Chebyshev Polynomial Recurrence',
    difficulty: 4,
    description: 'Chebyshev polynomials satisfy Tₙ₊₁ = 2xTₙ - Tₙ₋₁ with T₀=1, T₁=x. Compute Tₙ(x).',
    starterCode: `def chebyshev_polynomial(n, x):
    """
    Compute nth Chebyshev polynomial Tₙ(x) using recurrence.
    Tₙ₊₁ = 2xTₙ - Tₙ₋₁

    Args:
        n: Polynomial degree
        x: Evaluation point

    Returns:
        Tₙ(x)
    """
    pass`,
    solution: `def chebyshev_polynomial(n, x):
    """
    Compute nth Chebyshev polynomial Tₙ(x) using recurrence.
    Tₙ₊₁ = 2xTₙ - Tₙ₋₁

    Args:
        n: Polynomial degree
        x: Evaluation point

    Returns:
        Tₙ(x)
    """
    # Base cases
    if n == 0:
        return 1.0
    if n == 1:
        return x

    # Use recurrence: Tₙ₊₁ = 2xTₙ - Tₙ₋₁
    T_prev2 = 1.0  # T₀
    T_prev1 = x    # T₁

    for i in range(1, n):
        T_curr = 2 * x * T_prev1 - T_prev2
        T_prev2 = T_prev1
        T_prev1 = T_curr

    return T_prev1`,
    testCases: [
      { input: '0, 0.5', expectedOutput: '1.0', isHidden: false, description: 'T₀(x) = 1' },
      { input: '1, 0.5', expectedOutput: '0.5', isHidden: false, description: 'T₁(x) = x' },
      { input: '2, 0.5', expectedOutput: '-0.5', isHidden: false, description: 'T₂(0.5) = 2(0.5)² - 1' },
      { input: '3, 1', expectedOutput: '1.0', isHidden: true, description: 'T₃(1) = 1' },
      { input: '4, 0', expectedOutput: '1.0', isHidden: true, description: 'T₄(0)' }
    ],
    hints: [
      'Base cases: T₀ = 1, T₁ = x',
      'Recurrence: Tₙ₊₁ = 2xTₙ - Tₙ₋₁',
      'Similar to Legendre but simpler coefficients'
    ],
    language: 'python'
  },
  {
    id: 'math302-t6-ex16',
    subjectId: 'math302',
    topicId: 'math302-topic-6',
    title: 'Laguerre Polynomial Recurrence',
    difficulty: 5,
    description: 'Laguerre polynomials satisfy (n+1)Lₙ₊₁ = (2n+1-x)Lₙ - nLₙ₋₁ with L₀=1, L₁=1-x. Compute Lₙ(x).',
    starterCode: `def laguerre_polynomial(n, x):
    """
    Compute nth Laguerre polynomial Lₙ(x) using recurrence.
    (n+1)Lₙ₊₁ = (2n+1-x)Lₙ - nLₙ₋₁

    Args:
        n: Polynomial degree
        x: Evaluation point

    Returns:
        Lₙ(x)
    """
    pass`,
    solution: `def laguerre_polynomial(n, x):
    """
    Compute nth Laguerre polynomial Lₙ(x) using recurrence.
    (n+1)Lₙ₊₁ = (2n+1-x)Lₙ - nLₙ₋₁

    Args:
        n: Polynomial degree
        x: Evaluation point

    Returns:
        Lₙ(x)
    """
    # Base cases
    if n == 0:
        return 1.0
    if n == 1:
        return 1.0 - x

    # Use recurrence: Lₙ₊₁ = ((2n+1-x)Lₙ - nLₙ₋₁)/(n+1)
    L_prev2 = 1.0      # L₀
    L_prev1 = 1.0 - x  # L₁

    for i in range(1, n):
        L_curr = ((2 * i + 1 - x) * L_prev1 - i * L_prev2) / (i + 1)
        L_prev2 = L_prev1
        L_prev1 = L_curr

    return L_prev1`,
    testCases: [
      { input: '0, 0.5', expectedOutput: '1.0', isHidden: false, description: 'L₀(x) = 1' },
      { input: '1, 0.5', expectedOutput: '0.5', isHidden: false, description: 'L₁(0.5) = 1 - 0.5' },
      { input: '2, 1', expectedOutput: '0.5', isHidden: false, description: 'L₂(1)' },
      { input: '3, 0', expectedOutput: '1.0', isHidden: true, description: 'L₃(0)' },
      { input: '4, 2', expectedOutput: '0.041666666666666664', isHidden: true, description: 'L₄(2)' }
    ],
    hints: [
      'Base cases: L₀ = 1, L₁ = 1 - x',
      'Recurrence: Lₙ₊₁ = ((2n+1-x)Lₙ - nLₙ₋₁)/(n+1)',
      'Divide by (n+1) in each step'
    ],
    language: 'python'
  }
];
