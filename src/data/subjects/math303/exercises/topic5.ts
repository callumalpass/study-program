import { CodingExercise } from '../../../../core/types';

export const topic5Exercises: CodingExercise[] = [
  {
    id: 'math303-t5-ex01',
    subjectId: 'math303',
    topicId: 'math303-topic-5',
    title: 'Derivative of Polynomial',
    difficulty: 1,
    description: 'Compute the derivative of f(x) = x³ at x = 2.',
    starterCode: `def derivative_polynomial(x):
    """
    Compute f'(x) for f(x) = x³
    Args:
        x: point to evaluate derivative
    Returns:
        float: f'(x)
    """
    pass`,
    solution: `def derivative_polynomial(x):
    """
    Compute f'(x) for f(x) = x³
    Args:
        x: point to evaluate derivative
    Returns:
        float: f'(x)
    """
    # f'(x) = 3x²
    return 3 * x**2`,
    testCases: [
      { input: '2', expectedOutput: '12', isHidden: false, description: 'Derivative at x=2' },
      { input: '1', expectedOutput: '3', isHidden: false, description: 'Derivative at x=1' },
      { input: '0', expectedOutput: '0', isHidden: true, description: 'Derivative at x=0' }
    ],
    hints: ['Use power rule: d/dx(x^n) = nx^(n-1)'],
    language: 'python'
  },
  {
    id: 'math303-t5-ex02',
    subjectId: 'math303',
    topicId: 'math303-topic-5',
    title: 'Derivative Using Limit Definition',
    difficulty: 2,
    description: 'Compute f\'(a) using limit definition: lim_{h→0} [f(a+h) - f(a)]/h for f(x) = x².',
    starterCode: `def derivative_limit_definition(a):
    """
    Compute f'(a) for f(x) = x² using limit definition
    Args:
        a: point to evaluate derivative
    Returns:
        float: f'(a)
    """
    pass`,
    solution: `def derivative_limit_definition(a):
    """
    Compute f'(a) for f(x) = x² using limit definition
    Args:
        a: point to evaluate derivative
    Returns:
        float: f'(a)
    """
    # lim_{h→0} [(a+h)² - a²]/h = lim_{h→0} [2ah + h²]/h = 2a
    return 2 * a`,
    testCases: [
      { input: '3', expectedOutput: '6', isHidden: false, description: 'Derivative at x=3' },
      { input: '5', expectedOutput: '10', isHidden: false, description: 'Derivative at x=5' },
      { input: '0', expectedOutput: '0', isHidden: true, description: 'Derivative at x=0' }
    ],
    hints: ['Expand (a+h)² and simplify', 'Cancel h from numerator and denominator'],
    language: 'python'
  },
  {
    id: 'math303-t5-ex03',
    subjectId: 'math303',
    topicId: 'math303-topic-5',
    title: 'Product Rule',
    difficulty: 2,
    description: 'Compute derivative of f(x) = x² · sin(x) using product rule.',
    starterCode: `import math

def derivative_product_rule(x):
    """
    Compute f'(x) for f(x) = x² · sin(x)
    Args:
        x: point to evaluate derivative
    Returns:
        float: f'(x)
    """
    pass`,
    solution: `import math

def derivative_product_rule(x):
    """
    Compute f'(x) for f(x) = x² · sin(x)
    Args:
        x: point to evaluate derivative
    Returns:
        float: f'(x)
    """
    # (uv)' = u'v + uv'
    # u = x², u' = 2x
    # v = sin(x), v' = cos(x)
    # f'(x) = 2x·sin(x) + x²·cos(x)
    return 2*x*math.sin(x) + x**2*math.cos(x)`,
    testCases: [
      { input: '0', expectedOutput: '0', isHidden: false, description: 'Derivative at x=0' },
      { input: 'math.pi/2', expectedOutput: 'math.pi', isHidden: false, description: 'Derivative at π/2' },
      { input: 'math.pi', expectedOutput: '-math.pi**2', isHidden: true, description: 'Derivative at π' }
    ],
    hints: ['Product rule: (uv)\' = u\'v + uv\'', 'd/dx(sin x) = cos x'],
    language: 'python'
  },
  {
    id: 'math303-t5-ex04',
    subjectId: 'math303',
    topicId: 'math303-topic-5',
    title: 'Quotient Rule',
    difficulty: 2,
    description: 'Compute derivative of f(x) = x/(x+1) using quotient rule.',
    starterCode: `def derivative_quotient_rule(x):
    """
    Compute f'(x) for f(x) = x/(x+1)
    Args:
        x: point to evaluate derivative
    Returns:
        float: f'(x)
    """
    pass`,
    solution: `def derivative_quotient_rule(x):
    """
    Compute f'(x) for f(x) = x/(x+1)
    Args:
        x: point to evaluate derivative
    Returns:
        float: f'(x)
    """
    # (u/v)' = (u'v - uv')/v²
    # u = x, u' = 1
    # v = x+1, v' = 1
    # f'(x) = (1·(x+1) - x·1)/(x+1)² = 1/(x+1)²
    return 1.0 / (x + 1)**2`,
    testCases: [
      { input: '0', expectedOutput: '1.0', isHidden: false, description: 'Derivative at x=0' },
      { input: '1', expectedOutput: '0.25', isHidden: false, description: 'Derivative at x=1' },
      { input: '2', expectedOutput: '0.1111111111111111', isHidden: true, description: 'Derivative at x=2' }
    ],
    hints: ['Quotient rule: (u/v)\' = (u\'v - uv\')/v²'],
    language: 'python'
  },
  {
    id: 'math303-t5-ex05',
    subjectId: 'math303',
    topicId: 'math303-topic-5',
    title: 'Chain Rule',
    difficulty: 2,
    description: 'Compute derivative of f(x) = sin(x²) using chain rule.',
    starterCode: `import math

def derivative_chain_rule(x):
    """
    Compute f'(x) for f(x) = sin(x²)
    Args:
        x: point to evaluate derivative
    Returns:
        float: f'(x)
    """
    pass`,
    solution: `import math

def derivative_chain_rule(x):
    """
    Compute f'(x) for f(x) = sin(x²)
    Args:
        x: point to evaluate derivative
    Returns:
        float: f'(x)
    """
    # Chain rule: (f(g(x)))' = f'(g(x))·g'(x)
    # f(u) = sin(u), f'(u) = cos(u)
    # g(x) = x², g'(x) = 2x
    # f'(x) = cos(x²)·2x = 2x·cos(x²)
    return 2*x*math.cos(x**2)`,
    testCases: [
      { input: '0', expectedOutput: '0', isHidden: false, description: 'Derivative at x=0' },
      { input: '1', expectedOutput: '2*math.cos(1)', isHidden: false, description: 'Derivative at x=1' },
      { input: '2', expectedOutput: '4*math.cos(4)', isHidden: true, description: 'Derivative at x=2' }
    ],
    hints: ['Chain rule: d/dx[f(g(x))] = f\'(g(x))·g\'(x)'],
    language: 'python'
  },
  {
    id: 'math303-t5-ex06',
    subjectId: 'math303',
    topicId: 'math303-topic-5',
    title: 'Mean Value Theorem Application',
    difficulty: 3,
    description: 'Find c in (a,b) where f\'(c) = [f(b)-f(a)]/(b-a) for f(x) = x².',
    starterCode: `import math

def mvt_find_c(a, b):
    """
    Find c where f'(c) = [f(b)-f(a)]/(b-a) for f(x) = x²
    Args:
        a: left endpoint
        b: right endpoint
    Returns:
        float: value of c
    """
    pass`,
    solution: `import math

def mvt_find_c(a, b):
    """
    Find c where f'(c) = [f(b)-f(a)]/(b-a) for f(x) = x²
    Args:
        a: left endpoint
        b: right endpoint
    Returns:
        float: value of c
    """
    # f(x) = x², f'(x) = 2x
    # [f(b)-f(a)]/(b-a) = [b²-a²]/(b-a) = b+a
    # f'(c) = 2c = b+a ⟹ c = (a+b)/2
    return (a + b) / 2.0`,
    testCases: [
      { input: '0, 2', expectedOutput: '1.0', isHidden: false, description: 'Interval [0,2]' },
      { input: '1, 3', expectedOutput: '2.0', isHidden: false, description: 'Interval [1,3]' },
      { input: '-1, 1', expectedOutput: '0.0', isHidden: true, description: 'Interval [-1,1]' }
    ],
    hints: ['MVT: f\'(c) = [f(b)-f(a)]/(b-a)', 'For f(x) = x², solve 2c = b+a'],
    language: 'python'
  },
  {
    id: 'math303-t5-ex07',
    subjectId: 'math303',
    topicId: 'math303-topic-5',
    title: 'Rolle\'s Theorem',
    difficulty: 3,
    description: 'Verify Rolle\'s theorem: if f(a) = f(b), then ∃c: f\'(c) = 0.',
    starterCode: `def rolles_theorem_applies(f_a, f_b, is_continuous, is_differentiable):
    """
    Check if Rolle's theorem applies
    Args:
        f_a: f(a)
        f_b: f(b)
        is_continuous: whether f continuous on [a,b]
        is_differentiable: whether f differentiable on (a,b)
    Returns:
        bool: True if Rolle's theorem guarantees critical point
    """
    pass`,
    solution: `def rolles_theorem_applies(f_a, f_b, is_continuous, is_differentiable):
    """
    Check if Rolle's theorem applies
    Args:
        f_a: f(a)
        f_b: f(b)
        is_continuous: whether f continuous on [a,b]
        is_differentiable: whether f differentiable on (a,b)
    Returns:
        bool: True if Rolle's theorem guarantees critical point
    """
    # Rolle's theorem requires: f(a) = f(b), continuous, differentiable
    return f_a == f_b and is_continuous and is_differentiable`,
    testCases: [
      { input: '5, 5, True, True', expectedOutput: 'True', isHidden: false, description: 'All conditions met' },
      { input: '3, 5, True, True', expectedOutput: 'False', isHidden: false, description: 'f(a) ≠ f(b)' },
      { input: '2, 2, False, True', expectedOutput: 'False', isHidden: true, description: 'Not continuous' }
    ],
    hints: ['Rolle requires f(a) = f(b), continuity, and differentiability'],
    language: 'python'
  },
  {
    id: 'math303-t5-ex08',
    subjectId: 'math303',
    topicId: 'math303-topic-5',
    title: 'Critical Points',
    difficulty: 3,
    description: 'Find critical points of f(x) = x³ - 3x + 1.',
    starterCode: `import math

def find_critical_points():
    """
    Find critical points of f(x) = x³ - 3x + 1
    Returns:
        list: critical points (sorted)
    """
    pass`,
    solution: `import math

def find_critical_points():
    """
    Find critical points of f(x) = x³ - 3x + 1
    Returns:
        list: critical points (sorted)
    """
    # f'(x) = 3x² - 3 = 0
    # 3x² = 3 ⟹ x² = 1 ⟹ x = ±1
    return [-1.0, 1.0]`,
    testCases: [
      { input: '', expectedOutput: '[-1.0, 1.0]', isHidden: false, description: 'Two critical points' },
      { input: '', expectedOutput: '[-1.0, 1.0]', isHidden: false, description: 'Where derivative is zero' },
      { input: '', expectedOutput: '[-1.0, 1.0]', isHidden: true, description: 'x = ±1' }
    ],
    hints: ['Critical points where f\'(x) = 0', 'Solve 3x² - 3 = 0'],
    language: 'python'
  },
  {
    id: 'math303-t5-ex09',
    subjectId: 'math303',
    topicId: 'math303-topic-5',
    title: 'Increasing/Decreasing Test',
    difficulty: 3,
    description: 'Determine where f(x) = x³ - 3x is increasing.',
    starterCode: `def where_increasing():
    """
    Find intervals where f(x) = x³ - 3x is increasing
    Returns:
        str: description of intervals
    """
    pass`,
    solution: `def where_increasing():
    """
    Find intervals where f(x) = x³ - 3x is increasing
    Returns:
        str: description of intervals
    """
    # f'(x) = 3x² - 3 = 3(x² - 1) = 3(x-1)(x+1)
    # f'(x) > 0 when x < -1 or x > 1
    return "(-∞, -1) ∪ (1, ∞)"`,
    testCases: [
      { input: '', expectedOutput: '"(-∞, -1) ∪ (1, ∞)"', isHidden: false, description: 'Increasing intervals' },
      { input: '', expectedOutput: '"(-∞, -1) ∪ (1, ∞)"', isHidden: false, description: 'Where derivative positive' },
      { input: '', expectedOutput: '"(-∞, -1) ∪ (1, ∞)"', isHidden: true, description: 'f\' > 0 regions' }
    ],
    hints: ['f increasing where f\' > 0', 'Solve 3x² - 3 > 0'],
    language: 'python'
  },
  {
    id: 'math303-t5-ex10',
    subjectId: 'math303',
    topicId: 'math303-topic-5',
    title: 'Second Derivative Test',
    difficulty: 4,
    description: 'Use second derivative test to classify critical point x = 0 for f(x) = x³.',
    starterCode: `def second_derivative_test():
    """
    Classify x = 0 for f(x) = x³ using second derivative test
    Returns:
        str: 'local max', 'local min', or 'inconclusive'
    """
    pass`,
    solution: `def second_derivative_test():
    """
    Classify x = 0 for f(x) = x³ using second derivative test
    Returns:
        str: 'local max', 'local min', or 'inconclusive'
    """
    # f'(x) = 3x², f''(x) = 6x
    # f'(0) = 0, f''(0) = 0
    # Second derivative test is inconclusive
    return 'inconclusive'`,
    testCases: [
      { input: '', expectedOutput: "'inconclusive'", isHidden: false, description: 'Inflection point' },
      { input: '', expectedOutput: "'inconclusive'", isHidden: false, description: 'f\'\'(0) = 0' },
      { input: '', expectedOutput: "'inconclusive'", isHidden: true, description: 'Not a local extremum' }
    ],
    hints: ['f\'\'(0) = 0 makes test inconclusive', 'x = 0 is actually an inflection point'],
    language: 'python'
  },
  {
    id: 'math303-t5-ex11',
    subjectId: 'math303',
    topicId: 'math303-topic-5',
    title: 'L\'Hopital\'s Rule',
    difficulty: 4,
    description: 'Evaluate lim_{x→0} sin(x)/x using L\'Hopital\'s rule.',
    starterCode: `def lhopital_sin_over_x():
    """
    Compute lim_{x→0} sin(x)/x using L'Hopital's rule
    Returns:
        float: limit value
    """
    pass`,
    solution: `def lhopital_sin_over_x():
    """
    Compute lim_{x→0} sin(x)/x using L'Hopital's rule
    Returns:
        float: limit value
    """
    # 0/0 form, apply L'Hopital
    # lim_{x→0} sin(x)/x = lim_{x→0} cos(x)/1 = 1
    return 1.0`,
    testCases: [
      { input: '', expectedOutput: '1.0', isHidden: false, description: 'Classic limit' },
      { input: '', expectedOutput: '1.0', isHidden: false, description: 'L\'Hopital application' },
      { input: '', expectedOutput: '1.0', isHidden: true, description: 'Limit equals 1' }
    ],
    hints: ['Both numerator and denominator approach 0', 'Apply L\'Hopital: lim f/g = lim f\'/g\''],
    language: 'python'
  },
  {
    id: 'math303-t5-ex12',
    subjectId: 'math303',
    topicId: 'math303-topic-5',
    title: 'Concavity Test',
    difficulty: 4,
    description: 'Determine where f(x) = x³ - 6x² is concave up.',
    starterCode: `def where_concave_up():
    """
    Find where f(x) = x³ - 6x² is concave up
    Returns:
        str: interval description
    """
    pass`,
    solution: `def where_concave_up():
    """
    Find where f(x) = x³ - 6x² is concave up
    Returns:
        str: interval description
    """
    # f'(x) = 3x² - 12x, f''(x) = 6x - 12 = 6(x - 2)
    # f''(x) > 0 when x > 2
    return "(2, ∞)"`,
    testCases: [
      { input: '', expectedOutput: '"(2, ∞)"', isHidden: false, description: 'Concave up region' },
      { input: '', expectedOutput: '"(2, ∞)"', isHidden: false, description: 'Where f\'\' > 0' },
      { input: '', expectedOutput: '"(2, ∞)"', isHidden: true, description: 'Right of inflection point' }
    ],
    hints: ['Concave up where f\'\' > 0', 'Solve 6x - 12 > 0'],
    language: 'python'
  },
  {
    id: 'math303-t5-ex13',
    subjectId: 'math303',
    topicId: 'math303-topic-5',
    title: 'Inflection Points',
    difficulty: 4,
    description: 'Find inflection points of f(x) = x³ - 3x².',
    starterCode: `def find_inflection_points():
    """
    Find inflection points of f(x) = x³ - 3x²
    Returns:
        list: x-coordinates of inflection points
    """
    pass`,
    solution: `def find_inflection_points():
    """
    Find inflection points of f(x) = x³ - 3x²
    Returns:
        list: x-coordinates of inflection points
    """
    # f''(x) = 6x - 6 = 0 ⟹ x = 1
    # f'' changes sign at x = 1, so it's an inflection point
    return [1.0]`,
    testCases: [
      { input: '', expectedOutput: '[1.0]', isHidden: false, description: 'One inflection point' },
      { input: '', expectedOutput: '[1.0]', isHidden: false, description: 'Concavity changes at x=1' },
      { input: '', expectedOutput: '[1.0]', isHidden: true, description: 'f\'\'(1) = 0 with sign change' }
    ],
    hints: ['Inflection points where f\'\' = 0 and changes sign', 'Solve 6x - 6 = 0'],
    language: 'python'
  },
  {
    id: 'math303-t5-ex14',
    subjectId: 'math303',
    topicId: 'math303-topic-5',
    title: 'Implicit Differentiation',
    difficulty: 5,
    description: 'Find dy/dx for x² + y² = 1 using implicit differentiation.',
    starterCode: `def implicit_derivative(x, y):
    """
    Find dy/dx at point (x,y) on circle x² + y² = 1
    Args:
        x: x-coordinate
        y: y-coordinate
    Returns:
        float: dy/dx
    """
    pass`,
    solution: `def implicit_derivative(x, y):
    """
    Find dy/dx at point (x,y) on circle x² + y² = 1
    Args:
        x: x-coordinate
        y: y-coordinate
    Returns:
        float: dy/dx
    """
    # Differentiate: 2x + 2y(dy/dx) = 0
    # dy/dx = -x/y
    if y == 0:
        return float('inf') if x != 0 else 0
    return -x / y`,
    testCases: [
      { input: '0, 1', expectedOutput: '0.0', isHidden: false, description: 'Top of circle' },
      { input: '1, 0', expectedOutput: 'float(\'inf\')', isHidden: false, description: 'Right of circle' },
      { input: '0.6, 0.8', expectedOutput: '-0.75', isHidden: true, description: 'General point' }
    ],
    hints: ['Differentiate both sides with respect to x', 'Treat y as function of x'],
    language: 'python'
  },
  {
    id: 'math303-t5-ex15',
    subjectId: 'math303',
    topicId: 'math303-topic-5',
    title: 'Related Rates',
    difficulty: 5,
    description: 'If radius of circle increases at 2 cm/s, how fast is area increasing when r = 5?',
    starterCode: `import math

def related_rates_circle(r, dr_dt):
    """
    Find dA/dt given dr/dt for A = πr²
    Args:
        r: radius
        dr_dt: rate of change of radius
    Returns:
        float: dA/dt
    """
    pass`,
    solution: `import math

def related_rates_circle(r, dr_dt):
    """
    Find dA/dt given dr/dt for A = πr²
    Args:
        r: radius
        dr_dt: rate of change of radius
    Returns:
        float: dA/dt
    """
    # A = πr²
    # dA/dt = 2πr · dr/dt
    return 2 * math.pi * r * dr_dt`,
    testCases: [
      { input: '5, 2', expectedOutput: '20*math.pi', isHidden: false, description: 'r=5, dr/dt=2' },
      { input: '3, 1', expectedOutput: '6*math.pi', isHidden: false, description: 'r=3, dr/dt=1' },
      { input: '10, 0.5', expectedOutput: '10*math.pi', isHidden: true, description: 'r=10, dr/dt=0.5' }
    ],
    hints: ['A = πr²', 'Differentiate with respect to t: dA/dt = 2πr(dr/dt)'],
    language: 'python'
  },
  {
    id: 'math303-t5-ex16',
    subjectId: 'math303',
    topicId: 'math303-topic-5',
    title: 'Taylor Polynomial Approximation',
    difficulty: 5,
    description: 'Find the second-order Taylor polynomial for f(x) = e^x centered at a = 0.',
    starterCode: `import math

def taylor_polynomial_exp(x):
    """
    Compute second-order Taylor polynomial for e^x at a=0
    Args:
        x: point to evaluate
    Returns:
        float: P_2(x) = 1 + x + x²/2
    """
    pass`,
    solution: `import math

def taylor_polynomial_exp(x):
    """
    Compute second-order Taylor polynomial for e^x at a=0
    Args:
        x: point to evaluate
    Returns:
        float: P_2(x) = 1 + x + x²/2
    """
    # f(x) = e^x, f'(x) = e^x, f''(x) = e^x
    # f(0) = 1, f'(0) = 1, f''(0) = 1
    # P_2(x) = 1 + x + x²/2
    return 1 + x + x**2/2`,
    testCases: [
      { input: '0', expectedOutput: '1.0', isHidden: false, description: 'At center' },
      { input: '1', expectedOutput: '2.5', isHidden: false, description: 'Approximate e' },
      { input: '0.5', expectedOutput: '1.625', isHidden: true, description: 'x = 0.5' }
    ],
    hints: ['P_n(x) = f(a) + f\'(a)(x-a) + f\'\'(a)(x-a)²/2! + ...', 'All derivatives of e^x equal e^x'],
    language: 'python'
  }
];
