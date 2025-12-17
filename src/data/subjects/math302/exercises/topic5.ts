import { CodingExercise } from '../../../../core/types';

export const topic5Exercises: CodingExercise[] = [
  {
    id: 'math302-t5-ex01',
    subjectId: 'math302',
    topicId: 'math302-topic-5',
    title: 'Basic Laplace Transform',
    difficulty: 1,
    description: 'Compute the Laplace transform of f(t) = t^n using the definition L{f(t)} = ∫₀^∞ e^(-st)f(t)dt. Implement a function that returns the Laplace transform for given n.',
    starterCode: `import math

def laplace_power(n):
    """
    Return the Laplace transform of t^n as a string representation.
    For t^n, L{t^n} = n!/s^(n+1)

    Args:
        n: Non-negative integer power

    Returns:
        Coefficient (n!) as a float
    """
    pass`,
    solution: `import math

def laplace_power(n):
    """
    Return the Laplace transform of t^n as a string representation.
    For t^n, L{t^n} = n!/s^(n+1)

    Args:
        n: Non-negative integer power

    Returns:
        Coefficient (n!) as a float
    """
    # The Laplace transform of t^n is n!/s^(n+1)
    return float(math.factorial(n))`,
    testCases: [
      { input: '0', expectedOutput: '1.0', isHidden: false, description: 'L{1} = 1/s' },
      { input: '1', expectedOutput: '1.0', isHidden: false, description: 'L{t} = 1/s²' },
      { input: '2', expectedOutput: '2.0', isHidden: false, description: 'L{t²} = 2/s³' },
      { input: '3', expectedOutput: '6.0', isHidden: false, description: 'L{t³} = 6/s⁴' },
      { input: '5', expectedOutput: '120.0', isHidden: true, description: 'L{t⁵} = 120/s⁶' }
    ],
    hints: [
      'The Laplace transform of t^n is n!/s^(n+1)',
      'Use math.factorial() to compute n!',
      'Return the coefficient (factorial) as a float'
    ],
    language: 'python'
  },
  {
    id: 'math302-t5-ex02',
    subjectId: 'math302',
    topicId: 'math302-topic-5',
    title: 'Laplace of Exponential',
    difficulty: 1,
    description: 'Compute the Laplace transform of f(t) = e^(at). Implement a function that returns the transform L{e^(at)} = 1/(s-a) evaluated at a given s value.',
    starterCode: `def laplace_exponential(a, s):
    """
    Compute L{e^(at)} = 1/(s-a) at given s.

    Args:
        a: Exponential coefficient
        s: Laplace variable value (must satisfy s > a)

    Returns:
        Value of 1/(s-a)
    """
    pass`,
    solution: `def laplace_exponential(a, s):
    """
    Compute L{e^(at)} = 1/(s-a) at given s.

    Args:
        a: Exponential coefficient
        s: Laplace variable value (must satisfy s > a)

    Returns:
        Value of 1/(s-a)
    """
    if s <= a:
        return None  # Transform doesn't exist
    return 1.0 / (s - a)`,
    testCases: [
      { input: '0, 1', expectedOutput: '1.0', isHidden: false, description: 'L{e^0} at s=1' },
      { input: '2, 5', expectedOutput: '0.3333333333333333', isHidden: false, description: 'L{e^(2t)} at s=5' },
      { input: '-1, 2', expectedOutput: '0.3333333333333333', isHidden: false, description: 'L{e^(-t)} at s=2' },
      { input: '3, 7', expectedOutput: '0.25', isHidden: true, description: 'L{e^(3t)} at s=7' },
      { input: '5, 6', expectedOutput: '1.0', isHidden: true, description: 'L{e^(5t)} at s=6' }
    ],
    hints: [
      'L{e^(at)} = 1/(s-a) for s > a',
      'Check that s > a before computing',
      'Return None if the transform doesn\'t exist'
    ],
    language: 'python'
  },
  {
    id: 'math302-t5-ex03',
    subjectId: 'math302',
    topicId: 'math302-topic-5',
    title: 'Laplace of Sine',
    difficulty: 2,
    description: 'Compute the Laplace transform of f(t) = sin(ωt). The transform is L{sin(ωt)} = ω/(s² + ω²). Return the numerator and denominator coefficients.',
    starterCode: `def laplace_sine(omega, s):
    """
    Compute L{sin(ωt)} = ω/(s² + ω²) at given s.

    Args:
        omega: Frequency parameter
        s: Laplace variable value

    Returns:
        Value of ω/(s² + ω²)
    """
    pass`,
    solution: `def laplace_sine(omega, s):
    """
    Compute L{sin(ωt)} = ω/(s² + ω²) at given s.

    Args:
        omega: Frequency parameter
        s: Laplace variable value

    Returns:
        Value of ω/(s² + ω²)
    """
    return omega / (s**2 + omega**2)`,
    testCases: [
      { input: '1, 1', expectedOutput: '0.5', isHidden: false, description: 'L{sin(t)} at s=1' },
      { input: '2, 3', expectedOutput: '0.15384615384615385', isHidden: false, description: 'L{sin(2t)} at s=3' },
      { input: '1, 2', expectedOutput: '0.2', isHidden: false, description: 'L{sin(t)} at s=2' },
      { input: '3, 4', expectedOutput: '0.12', isHidden: true, description: 'L{sin(3t)} at s=4' },
      { input: '5, 2', expectedOutput: '0.1724137931034483', isHidden: true, description: 'L{sin(5t)} at s=2' }
    ],
    hints: [
      'L{sin(ωt)} = ω/(s² + ω²)',
      'Compute the denominator as s² + ω²',
      'Divide omega by the denominator'
    ],
    language: 'python'
  },
  {
    id: 'math302-t5-ex04',
    subjectId: 'math302',
    topicId: 'math302-topic-5',
    title: 'Laplace of Cosine',
    difficulty: 2,
    description: 'Compute the Laplace transform of f(t) = cos(ωt). The transform is L{cos(ωt)} = s/(s² + ω²).',
    starterCode: `def laplace_cosine(omega, s):
    """
    Compute L{cos(ωt)} = s/(s² + ω²) at given s.

    Args:
        omega: Frequency parameter
        s: Laplace variable value

    Returns:
        Value of s/(s² + ω²)
    """
    pass`,
    solution: `def laplace_cosine(omega, s):
    """
    Compute L{cos(ωt)} = s/(s² + ω²) at given s.

    Args:
        omega: Frequency parameter
        s: Laplace variable value

    Returns:
        Value of s/(s² + ω²)
    """
    return s / (s**2 + omega**2)`,
    testCases: [
      { input: '1, 1', expectedOutput: '0.5', isHidden: false, description: 'L{cos(t)} at s=1' },
      { input: '2, 3', expectedOutput: '0.23076923076923078', isHidden: false, description: 'L{cos(2t)} at s=3' },
      { input: '1, 2', expectedOutput: '0.4', isHidden: false, description: 'L{cos(t)} at s=2' },
      { input: '3, 5', expectedOutput: '0.14705882352941177', isHidden: true, description: 'L{cos(3t)} at s=5' },
      { input: '4, 6', expectedOutput: '0.11538461538461539', isHidden: true, description: 'L{cos(4t)} at s=6' }
    ],
    hints: [
      'L{cos(ωt)} = s/(s² + ω²)',
      'The numerator is s, not ω',
      'Similar to sine but with s in the numerator'
    ],
    language: 'python'
  },
  {
    id: 'math302-t5-ex05',
    subjectId: 'math302',
    topicId: 'math302-topic-5',
    title: 'First Shifting Theorem',
    difficulty: 2,
    description: 'Apply the first shifting theorem: L{e^(at)f(t)} = F(s-a), where F(s) = L{f(t)}. Given the Laplace transform of f(t) and a shift parameter, compute the shifted transform.',
    starterCode: `def first_shift(F_s, a, s):
    """
    Apply first shifting theorem: L{e^(at)f(t)} = F(s-a).

    Args:
        F_s: Function that computes F(s) = L{f(t)}
        a: Shift parameter
        s: Laplace variable value

    Returns:
        F(s-a)
    """
    pass`,
    solution: `def first_shift(F_s, a, s):
    """
    Apply first shifting theorem: L{e^(at)f(t)} = F(s-a).

    Args:
        F_s: Function that computes F(s) = L{f(t)}
        a: Shift parameter
        s: Laplace variable value

    Returns:
        F(s-a)
    """
    # Simply evaluate F at (s-a)
    return F_s(s - a)`,
    testCases: [
      { input: 'lambda s: 1/s, 2, 5', expectedOutput: '0.3333333333333333', isHidden: false, description: 'Shift F(s)=1/s by a=2' },
      { input: 'lambda s: s/(s**2+1), 1, 3', expectedOutput: '0.4', isHidden: false, description: 'Shift cosine transform' },
      { input: 'lambda s: 1/(s**2+4), -1, 2', expectedOutput: '0.07692307692307693', isHidden: false, description: 'Negative shift' },
      { input: 'lambda s: 2/(s**2+4), 3, 7', expectedOutput: '0.1', isHidden: true, description: 'Shift with coefficient' },
      { input: 'lambda s: s/(s**2+9), 2, 6', expectedOutput: '0.16', isHidden: true, description: 'Another shift example' }
    ],
    hints: [
      'The first shifting theorem replaces s with (s-a)',
      'Simply evaluate F_s at the shifted value',
      'Return F_s(s - a)'
    ],
    language: 'python'
  },
  {
    id: 'math302-t5-ex06',
    subjectId: 'math302',
    topicId: 'math302-topic-5',
    title: 'Inverse Laplace - Partial Fractions',
    difficulty: 3,
    description: 'Find the inverse Laplace transform of F(s) = 1/(s(s-a)) using partial fraction decomposition. Express as A/s + B/(s-a) and find coefficients A and B.',
    starterCode: `def inverse_laplace_partial(a):
    """
    Find coefficients for partial fraction decomposition of 1/(s(s-a)).
    1/(s(s-a)) = A/s + B/(s-a)

    Args:
        a: Constant in denominator

    Returns:
        Tuple (A, B) of coefficients
    """
    pass`,
    solution: `def inverse_laplace_partial(a):
    """
    Find coefficients for partial fraction decomposition of 1/(s(s-a)).
    1/(s(s-a)) = A/s + B/(s-a)

    Args:
        a: Constant in denominator

    Returns:
        Tuple (A, B) of coefficients
    """
    # Using partial fractions: 1/(s(s-a)) = A/s + B/(s-a)
    # Multiply both sides by s(s-a): 1 = A(s-a) + Bs
    # At s=0: 1 = A(-a) => A = -1/a
    # At s=a: 1 = B(a) => B = 1/a
    A = -1.0 / a
    B = 1.0 / a
    return (A, B)`,
    testCases: [
      { input: '2', expectedOutput: '(-0.5, 0.5)', isHidden: false, description: 'Decompose 1/(s(s-2))' },
      { input: '3', expectedOutput: '(-0.3333333333333333, 0.3333333333333333)', isHidden: false, description: 'Decompose 1/(s(s-3))' },
      { input: '1', expectedOutput: '(-1.0, 1.0)', isHidden: false, description: 'Decompose 1/(s(s-1))' },
      { input: '4', expectedOutput: '(-0.25, 0.25)', isHidden: true, description: 'Decompose 1/(s(s-4))' },
      { input: '5', expectedOutput: '(-0.2, 0.2)', isHidden: true, description: 'Decompose 1/(s(s-5))' }
    ],
    hints: [
      'Use partial fraction decomposition: 1/(s(s-a)) = A/s + B/(s-a)',
      'Multiply both sides by s(s-a) to get: 1 = A(s-a) + Bs',
      'Solve for A by setting s=0, solve for B by setting s=a'
    ],
    language: 'python'
  },
  {
    id: 'math302-t5-ex07',
    subjectId: 'math302',
    topicId: 'math302-topic-5',
    title: 'Inverse Laplace of Rational Function',
    difficulty: 3,
    description: 'Find the inverse Laplace transform of F(s) = (s+a)/(s²+b²). This can be split into s/(s²+b²) + a/(s²+b²) which corresponds to cos(bt) and sin(bt) terms.',
    starterCode: `import math

def inverse_rational(a, b, t):
    """
    Compute inverse Laplace of (s+a)/(s²+b²).
    Result: cos(bt) + (a/b)sin(bt)

    Args:
        a: Numerator constant
        b: Denominator frequency parameter
        t: Time value

    Returns:
        Value at time t
    """
    pass`,
    solution: `import math

def inverse_rational(a, b, t):
    """
    Compute inverse Laplace of (s+a)/(s²+b²).
    Result: cos(bt) + (a/b)sin(bt)

    Args:
        a: Numerator constant
        b: Denominator frequency parameter
        t: Time value

    Returns:
        Value at time t
    """
    # (s+a)/(s²+b²) = s/(s²+b²) + a/(s²+b²)
    # L^(-1){s/(s²+b²)} = cos(bt)
    # L^(-1){a/(s²+b²)} = (a/b)sin(bt)
    return math.cos(b * t) + (a / b) * math.sin(b * t)`,
    testCases: [
      { input: '1, 1, 0', expectedOutput: '1.0', isHidden: false, description: 'Evaluate at t=0' },
      { input: '2, 1, 1.5707963267948966', expectedOutput: '2.0', isHidden: false, description: 'Evaluate at t=π/2' },
      { input: '3, 2, 0.7853981633974483', expectedOutput: '0.7071067811865476', isHidden: false, description: 'Mixed case' },
      { input: '1, 1, 3.141592653589793', expectedOutput: '-1.0', isHidden: true, description: 'Evaluate at t=π' },
      { input: '4, 2, 1.5707963267948966', expectedOutput: '2.0', isHidden: true, description: 'Another evaluation' }
    ],
    hints: [
      'Split (s+a)/(s²+b²) into s/(s²+b²) + a/(s²+b²)',
      'L^(-1){s/(s²+b²)} = cos(bt)',
      'L^(-1){a/(s²+b²)} = (a/b)sin(bt)'
    ],
    language: 'python'
  },
  {
    id: 'math302-t5-ex08',
    subjectId: 'math302',
    topicId: 'math302-topic-5',
    title: 'Unit Step Function',
    difficulty: 2,
    description: 'Implement the unit step function u(t-c) which equals 0 for t < c and 1 for t ≥ c. This is fundamental for modeling discontinuous forcing functions.',
    starterCode: `def unit_step(t, c):
    """
    Compute the unit step function u(t-c).

    Args:
        t: Time value
        c: Step location

    Returns:
        0 if t < c, 1 if t >= c
    """
    pass`,
    solution: `def unit_step(t, c):
    """
    Compute the unit step function u(t-c).

    Args:
        t: Time value
        c: Step location

    Returns:
        0 if t < c, 1 if t >= c
    """
    return 0 if t < c else 1`,
    testCases: [
      { input: '0, 1', expectedOutput: '0', isHidden: false, description: 'Before step' },
      { input: '1, 1', expectedOutput: '1', isHidden: false, description: 'At step' },
      { input: '2, 1', expectedOutput: '1', isHidden: false, description: 'After step' },
      { input: '5, 10', expectedOutput: '0', isHidden: true, description: 'Before step at t=10' },
      { input: '15, 10', expectedOutput: '1', isHidden: true, description: 'After step at t=10' }
    ],
    hints: [
      'The unit step function is 0 before the step and 1 after',
      'Check if t >= c',
      'Return 0 or 1 accordingly'
    ],
    language: 'python'
  },
  {
    id: 'math302-t5-ex09',
    subjectId: 'math302',
    topicId: 'math302-topic-5',
    title: 'Second Shifting Theorem',
    difficulty: 3,
    description: 'Apply the second shifting theorem: L{u(t-c)f(t-c)} = e^(-cs)F(s). Compute the Laplace transform of a time-shifted function with unit step.',
    starterCode: `import math

def second_shift(F_s, c, s):
    """
    Apply second shifting theorem: L{u(t-c)f(t-c)} = e^(-cs)F(s).

    Args:
        F_s: Function that computes F(s) = L{f(t)}
        c: Time shift
        s: Laplace variable value

    Returns:
        e^(-cs) * F(s)
    """
    pass`,
    solution: `import math

def second_shift(F_s, c, s):
    """
    Apply second shifting theorem: L{u(t-c)f(t-c)} = e^(-cs)F(s).

    Args:
        F_s: Function that computes F(s) = L{f(t)}
        c: Time shift
        s: Laplace variable value

    Returns:
        e^(-cs) * F(s)
    """
    # Second shifting theorem: multiply by e^(-cs)
    return math.exp(-c * s) * F_s(s)`,
    testCases: [
      { input: 'lambda s: 1/s, 1, 2', expectedOutput: '0.06766764161830635', isHidden: false, description: 'Shift step function' },
      { input: 'lambda s: 1/(s**2+1), 2, 1', expectedOutput: '0.06766764161830635', isHidden: false, description: 'Shift sine-type function' },
      { input: 'lambda s: s/(s**2+4), 1, 3', expectedOutput: '0.11145488415747415', isHidden: false, description: 'Shift cosine-type' },
      { input: 'lambda s: 1/s**2, 3, 2', expectedOutput: '0.0006131324019856577', isHidden: true, description: 'Shift ramp function' },
      { input: 'lambda s: 2/(s+1), 1, 1', expectedOutput: '0.27067056647322557', isHidden: true, description: 'Shift exponential' }
    ],
    hints: [
      'The second shifting theorem multiplies F(s) by e^(-cs)',
      'Use math.exp(-c * s)',
      'Evaluate F_s at s first, then multiply by the exponential'
    ],
    language: 'python'
  },
  {
    id: 'math302-t5-ex10',
    subjectId: 'math302',
    topicId: 'math302-topic-5',
    title: 'Laplace Transform of Derivative',
    difficulty: 3,
    description: 'Use the property L{f\'(t)} = sF(s) - f(0). Given F(s) and initial condition f(0), compute the transform of the derivative.',
    starterCode: `def laplace_derivative(F_s, f0, s):
    """
    Compute L{f'(t)} = sF(s) - f(0).

    Args:
        F_s: Function that computes F(s) = L{f(t)}
        f0: Initial value f(0)
        s: Laplace variable value

    Returns:
        sF(s) - f(0)
    """
    pass`,
    solution: `def laplace_derivative(F_s, f0, s):
    """
    Compute L{f'(t)} = sF(s) - f(0).

    Args:
        F_s: Function that computes F(s) = L{f(t)}
        f0: Initial value f(0)
        s: Laplace variable value

    Returns:
        sF(s) - f(0)
    """
    # Apply the derivative property
    return s * F_s(s) - f0`,
    testCases: [
      { input: 'lambda s: 1/(s**2+1), 0, 2', expectedOutput: '0.4', isHidden: false, description: 'Derivative of sine with f(0)=0' },
      { input: 'lambda s: s/(s**2+1), 1, 2', expectedOutput: '0.6', isHidden: false, description: 'Derivative of cosine with f(0)=1' },
      { input: 'lambda s: 1/s, 2, 3', expectedOutput: '-1.0', isHidden: false, description: 'Derivative with f(0)=2' },
      { input: 'lambda s: 1/(s-1), 3, 4', expectedOutput: '0.3333333333333333', isHidden: true, description: 'Exponential derivative' },
      { input: 'lambda s: 2/(s**2+4), 1, 1', expectedOutput: '-0.6', isHidden: true, description: 'Another derivative case' }
    ],
    hints: [
      'L{f\'(t)} = sF(s) - f(0)',
      'Multiply s by F_s(s)',
      'Subtract the initial value f0'
    ],
    language: 'python'
  },
  {
    id: 'math302-t5-ex11',
    subjectId: 'math302',
    topicId: 'math302-topic-5',
    title: 'Convolution Integral',
    difficulty: 4,
    description: 'Compute the convolution (f * g)(t) = ∫₀ᵗ f(τ)g(t-τ)dτ numerically using the trapezoidal rule. The convolution theorem states L{f*g} = F(s)G(s).',
    starterCode: `def convolution(f, g, t, n=100):
    """
    Compute convolution integral (f*g)(t) using trapezoidal rule.

    Args:
        f: First function
        g: Second function
        t: Upper limit of integration
        n: Number of integration steps

    Returns:
        Approximate value of convolution at t
    """
    pass`,
    solution: `def convolution(f, g, t, n=100):
    """
    Compute convolution integral (f*g)(t) using trapezoidal rule.

    Args:
        f: First function
        g: Second function
        t: Upper limit of integration
        n: Number of integration steps

    Returns:
        Approximate value of convolution at t
    """
    if t <= 0:
        return 0.0

    # Trapezoidal rule for ∫₀ᵗ f(τ)g(t-τ)dτ
    h = t / n
    result = 0.0

    # First and last terms (half weight)
    result += 0.5 * f(0) * g(t)
    result += 0.5 * f(t) * g(0)

    # Interior terms (full weight)
    for i in range(1, n):
        tau = i * h
        result += f(tau) * g(t - tau)

    return result * h`,
    testCases: [
      { input: 'lambda t: 1, lambda t: 1, 2, 100', expectedOutput: '2.0', isHidden: false, description: 'Convolution of constants' },
      { input: 'lambda t: t, lambda t: 1, 1, 100', expectedOutput: '0.5', isHidden: false, description: 'Convolution of t and 1' },
      { input: 'lambda t: 1, lambda t: t, 3, 100', expectedOutput: '4.5', isHidden: false, description: 'Symmetric convolution' },
      { input: 'lambda t: t, lambda t: t, 2, 100', expectedOutput: '1.3333333333333333', isHidden: true, description: 'Convolution of t with itself' },
      { input: 'lambda t: 1, lambda t: t**2, 1, 100', expectedOutput: '0.3333333333333333', isHidden: true, description: 'Convolution with quadratic' }
    ],
    hints: [
      'Use the trapezoidal rule: ∫₀ᵗ f(τ)g(t-τ)dτ',
      'Divide interval [0,t] into n steps of size h = t/n',
      'First and last terms have weight 0.5h, interior terms have weight h'
    ],
    language: 'python'
  },
  {
    id: 'math302-t5-ex12',
    subjectId: 'math302',
    topicId: 'math302-topic-5',
    title: 'Solve IVP with Laplace',
    difficulty: 4,
    description: 'Solve y\' + ay = 0, y(0) = y0 using Laplace transforms. Apply L{y\'} = sY(s) - y(0) and solve for Y(s), then find y(t).',
    starterCode: `import math

def solve_ivp_laplace(a, y0, t):
    """
    Solve y' + ay = 0, y(0) = y0 using Laplace method.
    Solution: y(t) = y0 * e^(-at)

    Args:
        a: Coefficient
        y0: Initial value
        t: Time value

    Returns:
        y(t)
    """
    pass`,
    solution: `import math

def solve_ivp_laplace(a, y0, t):
    """
    Solve y' + ay = 0, y(0) = y0 using Laplace method.
    Solution: y(t) = y0 * e^(-at)

    Args:
        a: Coefficient
        y0: Initial value
        t: Time value

    Returns:
        y(t)
    """
    # Taking Laplace: sY(s) - y0 + aY(s) = 0
    # Y(s)(s + a) = y0
    # Y(s) = y0/(s + a)
    # Taking inverse: y(t) = y0 * e^(-at)
    return y0 * math.exp(-a * t)`,
    testCases: [
      { input: '1, 1, 0', expectedOutput: '1.0', isHidden: false, description: 'At t=0' },
      { input: '1, 2, 1', expectedOutput: '0.7357588823428847', isHidden: false, description: 'Decay with a=1' },
      { input: '2, 3, 0.5', expectedOutput: '1.1036254644481906', isHidden: false, description: 'Faster decay' },
      { input: '0.5, 4, 2', expectedOutput: '1.4715177646857694', isHidden: true, description: 'Slower decay' },
      { input: '3, 1, 1', expectedOutput: '0.049787068367863944', isHidden: true, description: 'Rapid decay' }
    ],
    hints: [
      'Apply Laplace to y\' + ay = 0: sY(s) - y0 + aY(s) = 0',
      'Solve for Y(s): Y(s) = y0/(s + a)',
      'Inverse Laplace: y(t) = y0 * e^(-at)'
    ],
    language: 'python'
  },
  {
    id: 'math302-t5-ex13',
    subjectId: 'math302',
    topicId: 'math302-topic-5',
    title: 'Transform with Discontinuity',
    difficulty: 4,
    description: 'Compute the Laplace transform of a piecewise function: f(t) = a for 0≤t<c, b for t≥c. Express using unit step function.',
    starterCode: `import math

def laplace_piecewise(a, b, c, s):
    """
    Compute L{f(t)} where f(t) = a for t<c, b for t>=c.
    f(t) = a + (b-a)u(t-c)
    L{f(t)} = a/s + (b-a)e^(-cs)/s

    Args:
        a: Value before step
        b: Value after step
        c: Step location
        s: Laplace variable value

    Returns:
        Laplace transform value
    """
    pass`,
    solution: `import math

def laplace_piecewise(a, b, c, s):
    """
    Compute L{f(t)} where f(t) = a for t<c, b for t>=c.
    f(t) = a + (b-a)u(t-c)
    L{f(t)} = a/s + (b-a)e^(-cs)/s

    Args:
        a: Value before step
        b: Value after step
        c: Step location
        s: Laplace variable value

    Returns:
        Laplace transform value
    """
    # f(t) = a + (b-a)u(t-c)
    # L{f(t)} = L{a} + (b-a)L{u(t-c)}
    # = a/s + (b-a)e^(-cs)/s
    return a / s + (b - a) * math.exp(-c * s) / s`,
    testCases: [
      { input: '1, 2, 1, 1', expectedOutput: '1.3678794411714423', isHidden: false, description: 'Step from 1 to 2' },
      { input: '0, 1, 2, 1', expectedOutput: '0.1353352832366127', isHidden: false, description: 'Step from 0 to 1' },
      { input: '3, 1, 1, 2', expectedOutput: '1.1353352832366127', isHidden: false, description: 'Step down from 3 to 1' },
      { input: '2, 5, 3, 1', expectedOutput: '2.149361432823445', isHidden: true, description: 'Step from 2 to 5' },
      { input: '1, 0, 2, 2', expectedOutput: '0.4323323583816937', isHidden: true, description: 'Step down to 0' }
    ],
    hints: [
      'Express as f(t) = a + (b-a)u(t-c)',
      'L{a} = a/s',
      'L{(b-a)u(t-c)} = (b-a)e^(-cs)/s using second shifting theorem'
    ],
    language: 'python'
  },
  {
    id: 'math302-t5-ex14',
    subjectId: 'math302',
    topicId: 'math302-topic-5',
    title: 'Laplace of Periodic Function',
    difficulty: 5,
    description: 'For a periodic function with period T, L{f(t)} = (1/(1-e^(-sT))) * ∫₀ᵀ e^(-st)f(t)dt. Compute this for a square wave with period T.',
    starterCode: `import math

def laplace_square_wave(A, T, s, n=100):
    """
    Compute Laplace of square wave: f(t) = A for 0<=t<T/2, -A for T/2<=t<T.
    Using periodic function formula.

    Args:
        A: Amplitude
        T: Period
        s: Laplace variable value
        n: Integration steps

    Returns:
        Laplace transform value
    """
    pass`,
    solution: `import math

def laplace_square_wave(A, T, s, n=100):
    """
    Compute Laplace of square wave: f(t) = A for 0<=t<T/2, -A for T/2<=t<T.
    Using periodic function formula.

    Args:
        A: Amplitude
        T: Period
        s: Laplace variable value
        n: Integration steps

    Returns:
        Laplace transform value
    """
    # For square wave: f(t) = A[1 - 2u(t-T/2)] on [0,T]
    # ∫₀ᵀ e^(-st)f(t)dt = ∫₀^(T/2) Ae^(-st)dt + ∫_(T/2)^T (-A)e^(-st)dt
    # = A/s[1 - e^(-sT/2)] - A/s[e^(-sT/2) - e^(-sT)]
    # = A/s[1 - 2e^(-sT/2) + e^(-sT)]

    half_period = T / 2
    integral = (A / s) * (1 - 2 * math.exp(-s * half_period) + math.exp(-s * T))

    # Periodic formula: L{f} = integral / (1 - e^(-sT))
    periodic_factor = 1 / (1 - math.exp(-s * T))

    return integral * periodic_factor`,
    testCases: [
      { input: '1, 2, 1, 100', expectedOutput: '0.7615941559557649', isHidden: false, description: 'Unit amplitude, period 2' },
      { input: '2, 1, 2, 100', expectedOutput: '0.9270454231481707', isHidden: false, description: 'Amplitude 2, period 1' },
      { input: '1, 1, 1, 100', expectedOutput: '0.7615941559557649', isHidden: false, description: 'Unit square wave' },
      { input: '3, 4, 0.5, 100', expectedOutput: '4.287093613729948', isHidden: true, description: 'Large period' },
      { input: '1, 3, 2, 100', expectedOutput: '0.2470042894056058', isHidden: true, description: 'Period 3' }
    ],
    hints: [
      'Square wave: f(t) = A for 0≤t<T/2, -A for T/2≤t<T',
      'Compute ∫₀ᵀ e^(-st)f(t)dt in two parts',
      'Apply periodic formula: (1/(1-e^(-sT))) times the integral'
    ],
    language: 'python'
  },
  {
    id: 'math302-t5-ex15',
    subjectId: 'math302',
    topicId: 'math302-topic-5',
    title: 'Delta Function Sifting',
    difficulty: 4,
    description: 'The Dirac delta function δ(t-c) has the sifting property: ∫f(t)δ(t-c)dt = f(c). Implement this to extract a function value.',
    starterCode: `def delta_sifting(f, c, a, b):
    """
    Apply delta function sifting property.
    ∫ₐᵇ f(t)δ(t-c)dt = f(c) if a <= c <= b, else 0

    Args:
        f: Function to evaluate
        c: Delta function location
        a: Lower limit
        b: Upper limit

    Returns:
        f(c) if c in [a,b], else 0
    """
    pass`,
    solution: `def delta_sifting(f, c, a, b):
    """
    Apply delta function sifting property.
    ∫ₐᵇ f(t)δ(t-c)dt = f(c) if a <= c <= b, else 0

    Args:
        f: Function to evaluate
        c: Delta function location
        a: Lower limit
        b: Upper limit

    Returns:
        f(c) if c in [a,b], else 0
    """
    # Sifting property: integral equals f(c) if c is in [a,b]
    if a <= c <= b:
        return f(c)
    else:
        return 0.0`,
    testCases: [
      { input: 'lambda t: t**2, 2, 0, 5', expectedOutput: '4.0', isHidden: false, description: 'c inside interval' },
      { input: 'lambda t: t**2, 6, 0, 5', expectedOutput: '0.0', isHidden: false, description: 'c outside interval' },
      { input: 'lambda t: t + 1, 3, 1, 4', expectedOutput: '4.0', isHidden: false, description: 'Linear function' },
      { input: 'lambda t: 2*t**2 + 3*t, 1, 0, 2', expectedOutput: '5.0', isHidden: true, description: 'Quadratic at c=1' },
      { input: 'lambda t: t**3, 2, 3, 5', expectedOutput: '0.0', isHidden: true, description: 'c before interval' }
    ],
    hints: [
      'The sifting property: ∫f(t)δ(t-c)dt = f(c)',
      'Check if c is in the interval [a,b]',
      'Return f(c) if yes, 0 otherwise'
    ],
    language: 'python'
  },
  {
    id: 'math302-t5-ex16',
    subjectId: 'math302',
    topicId: 'math302-topic-5',
    title: 'Laplace of Delta Function',
    difficulty: 3,
    description: 'The Laplace transform of the Dirac delta function is L{δ(t-c)} = e^(-cs). Compute this for various shift values.',
    starterCode: `import math

def laplace_delta(c, s):
    """
    Compute L{δ(t-c)} = e^(-cs).

    Args:
        c: Delta function shift
        s: Laplace variable value

    Returns:
        e^(-cs)
    """
    pass`,
    solution: `import math

def laplace_delta(c, s):
    """
    Compute L{δ(t-c)} = e^(-cs).

    Args:
        c: Delta function shift
        s: Laplace variable value

    Returns:
        e^(-cs)
    """
    # L{δ(t-c)} = e^(-cs)
    return math.exp(-c * s)`,
    testCases: [
      { input: '0, 1', expectedOutput: '1.0', isHidden: false, description: 'Delta at origin' },
      { input: '1, 2', expectedOutput: '0.1353352832366127', isHidden: false, description: 'Shifted delta' },
      { input: '2, 1', expectedOutput: '0.1353352832366127', isHidden: false, description: 'Another shift' },
      { input: '3, 3', expectedOutput: '0.00012340980408667956', isHidden: true, description: 'Larger shift' },
      { input: '0.5, 4', expectedOutput: '0.1353352832366127', isHidden: true, description: 'Fractional shift' }
    ],
    hints: [
      'L{δ(t-c)} = e^(-cs) for c ≥ 0',
      'Use math.exp() function',
      'The result is independent of the form of delta, only depends on the shift'
    ],
    language: 'python'
  }
];
