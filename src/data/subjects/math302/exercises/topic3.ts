import { CodingExercise } from '../../../../core/types';

export const topic3Exercises: CodingExercise[] = [
  {
    id: 'math302-t3-ex01',
    subjectId: 'math302',
    topicId: 'math302-topic-3',
    title: 'Third-Order Characteristic Equation',
    difficulty: 1,
    description: 'Find all roots of r^3 - 6r^2 + 11r - 6 = 0.',
    starterCode: `import numpy as np

def find_third_order_roots():
    """
    Solve r^3 - 6r^2 + 11r - 6 = 0
    Return sorted real roots
    """
    pass`,
    solution: `import numpy as np

def find_third_order_roots():
    """
    Solve r^3 - 6r^2 + 11r - 6 = 0
    Factors: (r-1)(r-2)(r-3) = 0
    Roots: r = 1, 2, 3
    """
    coeffs = [1, -6, 11, -6]
    roots = np.roots(coeffs)
    return sorted(roots.real)`,
    testCases: [
      { input: '', expectedOutput: '[1.0, 2.0, 3.0]', isHidden: false, description: 'Three distinct roots' },
      { input: '', expectedOutput: '[1.0, 2.0, 3.0]', isHidden: false, description: 'Verify roots' }
    ],
    hints: ['Use np.roots() for polynomial roots', 'Try factoring: look for rational roots first', 'Roots are 1, 2, and 3'],
    language: 'python'
  },
  {
    id: 'math302-t3-ex02',
    subjectId: 'math302',
    topicId: 'math302-topic-3',
    title: 'Solve Third-Order ODE',
    difficulty: 2,
    description: 'Solve y\'\'\' - 6y\'\' + 11y\' - 6y = 0 with y(0) = 0, y\'(0) = 0, y\'\'(0) = 2.',
    starterCode: `import numpy as np

def solve_third_order(x):
    """
    Solve y''' - 6y'' + 11y' - 6y = 0
    y(0) = 0, y'(0) = 0, y''(0) = 2
    """
    pass`,
    solution: `import numpy as np

def solve_third_order(x):
    """
    Solve y''' - 6y'' + 11y' - 6y = 0
    Roots: r = 1, 2, 3
    General: y = c1*e^x + c2*e^(2x) + c3*e^(3x)
    With conditions: c1 = 1, c2 = -2, c3 = 1
    Solution: y = e^x - 2e^(2x) + e^(3x)
    """
    return np.exp(x) - 2*np.exp(2*x) + np.exp(3*x)`,
    testCases: [
      { input: '0', expectedOutput: '0.0', isHidden: false, description: 'Initial condition y(0)' },
      { input: '1', expectedOutput: '7.1071', isHidden: false, description: 'x = 1' },
      { input: '0.5', expectedOutput: '0.4201', isHidden: false, description: 'Intermediate value' },
      { input: '-1', expectedOutput: '-0.0023', isHidden: true, description: 'Negative x' }
    ],
    hints: ['General solution: y = c1*e^(r1*x) + c2*e^(r2*x) + c3*e^(r3*x)', 'Apply three initial conditions to find c1, c2, c3', 'Solve the 3×3 linear system'],
    language: 'python'
  },
  {
    id: 'math302-t3-ex03',
    subjectId: 'math302',
    topicId: 'math302-topic-3',
    title: 'Fourth-Order Characteristic Equation',
    difficulty: 2,
    description: 'Find roots of r^4 - 5r^2 + 4 = 0.',
    starterCode: `import numpy as np

def find_fourth_order_roots():
    """
    Solve r^4 - 5r^2 + 4 = 0
    Return sorted real roots
    """
    pass`,
    solution: `import numpy as np

def find_fourth_order_roots():
    """
    Solve r^4 - 5r^2 + 4 = 0
    Let u = r^2: u^2 - 5u + 4 = 0
    (u-1)(u-4) = 0, u = 1, 4
    r^2 = 1 or r^2 = 4
    Roots: r = ±1, ±2
    """
    coeffs = [1, 0, -5, 0, 4]
    roots = np.roots(coeffs)
    real_roots = sorted([r.real for r in roots if np.isreal(r)])
    return real_roots`,
    testCases: [
      { input: '', expectedOutput: '[-2.0, -1.0, 1.0, 2.0]', isHidden: false, description: 'Four real roots' },
      { input: '', expectedOutput: '[-2.0, -1.0, 1.0, 2.0]', isHidden: false, description: 'Verify all roots' }
    ],
    hints: ['This is a biquadratic equation', 'Substitute u = r^2 to get quadratic', 'Then take square roots of each u value'],
    language: 'python'
  },
  {
    id: 'math302-t3-ex04',
    subjectId: 'math302',
    topicId: 'math302-topic-3',
    title: 'Solve Fourth-Order ODE',
    difficulty: 3,
    description: 'Solve y^(4) - 5y\'\' + 4y = 0 with y(0)=0, y\'(0)=2, y\'\'(0)=0, y\'\'\'(0)=0.',
    starterCode: `import numpy as np

def solve_fourth_order(x):
    """
    Solve y^(4) - 5y'' + 4y = 0
    Initial conditions: y(0)=0, y'(0)=2, y''(0)=0, y'''(0)=0
    """
    pass`,
    solution: `import numpy as np

def solve_fourth_order(x):
    """
    Solve y^(4) - 5y'' + 4y = 0
    Roots: ±1, ±2
    General: y = c1*e^x + c2*e^(-x) + c3*e^(2x) + c4*e^(-2x)
    With conditions: c1 = 2/3, c2 = -2/3, c3 = 1/3, c4 = -1/3
    Solution: y = (2/3)e^x - (2/3)e^(-x) + (1/3)e^(2x) - (1/3)e^(-2x)
    = (4/3)sinh(x) + (2/3)sinh(2x)
    """
    return (4/3)*np.sinh(x) + (2/3)*np.sinh(2*x)`,
    testCases: [
      { input: '0', expectedOutput: '0.0', isHidden: false, description: 'Initial condition y(0)' },
      { input: '1', expectedOutput: '3.9597', isHidden: false, description: 'x = 1' },
      { input: '0.5', expectedOutput: '0.9387', isHidden: false, description: 'Intermediate value' },
      { input: '-1', expectedOutput: '-3.9597', isHidden: true, description: 'Odd function' }
    ],
    hints: ['Four roots give four exponentials', 'Apply four initial conditions', 'Can express using sinh if roots come in ± pairs'],
    language: 'python'
  },
  {
    id: 'math302-t3-ex05',
    subjectId: 'math302',
    topicId: 'math302-topic-3',
    title: 'Higher-Order with Complex Roots',
    difficulty: 3,
    description: 'Find roots of r^3 + r = 0.',
    starterCode: `import numpy as np

def find_mixed_roots():
    """
    Solve r^3 + r = 0
    Return all roots (real and complex)
    """
    pass`,
    solution: `import numpy as np

def find_mixed_roots():
    """
    Solve r^3 + r = 0
    Factor: r(r^2 + 1) = 0
    Roots: r = 0, ±i
    """
    coeffs = [1, 0, 1, 0]
    roots = np.roots(coeffs)
    return sorted(roots, key=lambda x: (x.real, x.imag))`,
    testCases: [
      { input: '', expectedOutput: '[-1j, 0j, 1j]', isHidden: false, description: 'One real, two complex' },
      { input: '', expectedOutput: '[-1j, 0j, 1j]', isHidden: false, description: 'Verify roots' }
    ],
    hints: ['Factor out r first', 'r(r^2 + 1) = 0', 'One real root (0) and two pure imaginary (±i)'],
    language: 'python'
  },
  {
    id: 'math302-t3-ex06',
    subjectId: 'math302',
    topicId: 'math302-topic-3',
    title: 'Solve ODE with Mixed Roots',
    difficulty: 3,
    description: 'Solve y\'\'\' + y\' = 0 with y(0) = 1, y\'(0) = 0, y\'\'(0) = 0.',
    starterCode: `import numpy as np

def solve_mixed_roots(x):
    """
    Solve y''' + y' = 0
    y(0) = 1, y'(0) = 0, y''(0) = 0
    """
    pass`,
    solution: `import numpy as np

def solve_mixed_roots(x):
    """
    Solve y''' + y' = 0
    Roots: 0, ±i
    General: y = c1 + c2*cos(x) + c3*sin(x)
    With conditions: c1 = 1, c2 = 0, c3 = 0
    Solution: y = 1
    """
    # All conditions lead to y = 1 (constant solution)
    return np.ones_like(x) if isinstance(x, np.ndarray) else 1.0`,
    testCases: [
      { input: '0', expectedOutput: '1.0', isHidden: false, description: 'Initial condition' },
      { input: '1', expectedOutput: '1.0', isHidden: false, description: 'Constant solution' },
      { input: 'np.pi', expectedOutput: '1.0', isHidden: false, description: 'Still constant' },
      { input: '-5', expectedOutput: '1.0', isHidden: true, description: 'Always 1' }
    ],
    hints: ['Roots: 0 (constant), ±i (cos and sin)', 'General solution: c1 + c2*cos(x) + c3*sin(x)', 'Initial conditions give c1=1, c2=c3=0'],
    language: 'python'
  },
  {
    id: 'math302-t3-ex07',
    subjectId: 'math302',
    topicId: 'math302-topic-3',
    title: 'Cauchy-Euler Equation',
    difficulty: 3,
    description: 'Solve x^2*y\'\' + x*y\' - y = 0. Try solution y = x^r and find the characteristic equation.',
    starterCode: `import numpy as np

def cauchy_euler_roots():
    """
    For x^2*y'' + x*y' - y = 0
    Try y = x^r to get characteristic equation
    Return the roots
    """
    pass`,
    solution: `import numpy as np

def cauchy_euler_roots():
    """
    For x^2*y'' + x*y' - y = 0
    Substitute y = x^r:
    x^2*r(r-1)x^(r-2) + x*r*x^(r-1) - x^r = 0
    r(r-1) + r - 1 = 0
    r^2 - 1 = 0
    Roots: r = ±1
    """
    coeffs = [1, 0, -1]
    roots = np.roots(coeffs)
    return sorted(roots.real)`,
    testCases: [
      { input: '', expectedOutput: '[-1.0, 1.0]', isHidden: false, description: 'Roots ±1' },
      { input: '', expectedOutput: '[-1.0, 1.0]', isHidden: false, description: 'Verify roots' }
    ],
    hints: ['Substitute y = x^r into the equation', 'y\' = r*x^(r-1), y\'\' = r(r-1)*x^(r-2)', 'Simplify to get polynomial in r'],
    language: 'python'
  },
  {
    id: 'math302-t3-ex08',
    subjectId: 'math302',
    topicId: 'math302-topic-3',
    title: 'Solve Cauchy-Euler - Distinct Roots',
    difficulty: 4,
    description: 'Solve x^2*y\'\' + x*y\' - y = 0 with y(1) = 2, y\'(1) = 0 on x > 0.',
    starterCode: `import numpy as np

def solve_cauchy_euler_distinct(x):
    """
    Solve x^2*y'' + x*y' - y = 0
    y(1) = 2, y'(1) = 0, x > 0
    """
    pass`,
    solution: `import numpy as np

def solve_cauchy_euler_distinct(x):
    """
    Solve x^2*y'' + x*y' - y = 0
    Roots: r = 1, -1
    General solution: y = c1*x + c2*x^(-1)
    With y(1) = 2, y'(1) = 0: c1 = 1, c2 = 1
    Solution: y = x + 1/x
    """
    return x + 1/x`,
    testCases: [
      { input: '1', expectedOutput: '2.0', isHidden: false, description: 'Initial condition y(1)' },
      { input: '2', expectedOutput: '2.5', isHidden: false, description: 'x = 2' },
      { input: '0.5', expectedOutput: '2.5', isHidden: false, description: 'x = 0.5' },
      { input: '3', expectedOutput: '3.3333', isHidden: true, description: 'x = 3' }
    ],
    hints: ['For distinct roots r1, r2: y = c1*x^r1 + c2*x^r2', 'Roots are 1 and -1', 'Apply initial conditions at x = 1'],
    language: 'python'
  },
  {
    id: 'math302-t3-ex09',
    subjectId: 'math302',
    topicId: 'math302-topic-3',
    title: 'Cauchy-Euler - Repeated Roots',
    difficulty: 4,
    description: 'Solve x^2*y\'\' - 3x*y\' + 4y = 0 with y(1) = 1, y\'(1) = 0.',
    starterCode: `import numpy as np

def solve_cauchy_euler_repeated(x):
    """
    Solve x^2*y'' - 3x*y' + 4y = 0
    y(1) = 1, y'(1) = 0
    """
    pass`,
    solution: `import numpy as np

def solve_cauchy_euler_repeated(x):
    """
    Solve x^2*y'' - 3x*y' + 4y = 0
    Characteristic: r(r-1) - 3r + 4 = 0
    r^2 - 4r + 4 = 0
    Repeated root: r = 2
    General solution: y = (c1 + c2*ln(x))*x^2
    With y(1) = 1, y'(1) = 0: c1 = 1, c2 = -2
    Solution: y = (1 - 2*ln(x))*x^2
    """
    return (1 - 2*np.log(x)) * x**2`,
    testCases: [
      { input: '1', expectedOutput: '1.0', isHidden: false, description: 'Initial condition' },
      { input: 'np.e', expectedOutput: '-7.3891', isHidden: false, description: 'x = e' },
      { input: '2', expectedOutput: '-1.5452', isHidden: false, description: 'x = 2' },
      { input: 'np.sqrt(np.e)', expectedOutput: '0.0', isHidden: true, description: 'Zero crossing' }
    ],
    hints: ['For repeated root r: y = (c1 + c2*ln(x))*x^r', 'Find r from r(r-1) + ax*r + b = 0', 'Repeated root r = 2'],
    language: 'python'
  },
  {
    id: 'math302-t3-ex10',
    subjectId: 'math302',
    topicId: 'math302-topic-3',
    title: 'Cauchy-Euler - Complex Roots',
    difficulty: 4,
    description: 'Solve x^2*y\'\' + x*y\' + y = 0 with y(1) = 1, y\'(1) = 0.',
    starterCode: `import numpy as np

def solve_cauchy_euler_complex(x):
    """
    Solve x^2*y'' + x*y' + y = 0
    y(1) = 1, y'(1) = 0
    """
    pass`,
    solution: `import numpy as np

def solve_cauchy_euler_complex(x):
    """
    Solve x^2*y'' + x*y' + y = 0
    Characteristic: r(r-1) + r + 1 = 0
    r^2 + 1 = 0
    Roots: r = ±i
    General: y = c1*cos(ln(x)) + c2*sin(ln(x))
    With y(1) = 1, y'(1) = 0: c1 = 1, c2 = 0
    Solution: y = cos(ln(x))
    """
    return np.cos(np.log(x))`,
    testCases: [
      { input: '1', expectedOutput: '1.0', isHidden: false, description: 'Initial condition' },
      { input: 'np.e', expectedOutput: '0.5403', isHidden: false, description: 'x = e' },
      { input: 'np.exp(np.pi/2)', expectedOutput: '0.0', isHidden: false, description: 'First zero' },
      { input: 'np.exp(np.pi)', expectedOutput: '-1.0', isHidden: true, description: 'x = e^π' }
    ],
    hints: ['For complex roots α ± βi: y = x^α(c1*cos(β*ln(x)) + c2*sin(β*ln(x)))', 'Here α = 0, β = 1', 'Solution involves cos(ln(x)) and sin(ln(x))'],
    language: 'python'
  },
  {
    id: 'math302-t3-ex11',
    subjectId: 'math302',
    topicId: 'math302-topic-3',
    title: 'Higher-Order Nonhomogeneous',
    difficulty: 4,
    description: 'Solve y\'\'\' - y\' = 2x using undetermined coefficients.',
    starterCode: `import numpy as np

def solve_higher_nonhomogeneous(x):
    """
    Solve y''' - y' = 2x
    With y(0) = 0, y'(0) = 0, y''(0) = 0
    """
    pass`,
    solution: `import numpy as np

def solve_higher_nonhomogeneous(x):
    """
    Solve y''' - y' = 2x
    Homogeneous: roots 0, ±1
    yh = c1 + c2*e^x + c3*e^(-x)
    Particular: try yp = Ax^2 + Bx (multiply by x since 0 is root)
    yp''' = 0, yp' = 2Ax + B
    -2Ax - B = 2x
    A = -1, B = 0
    yp = -x^2
    With conditions: c1 = 0, c2 = -1, c3 = 1
    Solution: y = -e^x + e^(-x) - x^2 = -2*sinh(x) - x^2
    """
    return -2*np.sinh(x) - x**2`,
    testCases: [
      { input: '0', expectedOutput: '0.0', isHidden: false, description: 'Initial condition' },
      { input: '1', expectedOutput: '-3.3521', isHidden: false, description: 'x = 1' },
      { input: '2', expectedOutput: '-11.2677', isHidden: false, description: 'x = 2' },
      { input: '-1', expectedOutput: '1.3521', isHidden: true, description: 'Negative x' }
    ],
    hints: ['Find homogeneous solution first', 'For f(x) = 2x, try yp = Ax + B', 'Since 0 is a root, multiply by x: yp = Ax^2 + Bx'],
    language: 'python'
  },
  {
    id: 'math302-t3-ex12',
    subjectId: 'math302',
    topicId: 'math302-topic-3',
    title: 'Third-Order Cauchy-Euler',
    difficulty: 5,
    description: 'Solve x^3*y\'\'\' + 2x^2*y\'\' - x*y\' + y = 0 by finding characteristic equation roots.',
    starterCode: `import numpy as np

def third_order_cauchy_euler_roots():
    """
    For x^3*y''' + 2x^2*y'' - x*y' + y = 0
    Find characteristic equation roots
    """
    pass`,
    solution: `import numpy as np

def third_order_cauchy_euler_roots():
    """
    For x^3*y''' + 2x^2*y'' - x*y' + y = 0
    Substitute y = x^r:
    r(r-1)(r-2) + 2r(r-1) - r + 1 = 0
    r^3 - 3r^2 + 2r + 2r^2 - 2r - r + 1 = 0
    r^3 - r^2 - r + 1 = 0
    (r-1)(r^2-1) = (r-1)^2(r+1) = 0
    Roots: r = 1 (repeated), r = -1
    """
    # Characteristic equation: r^3 - r^2 - r + 1 = 0
    coeffs = [1, -1, -1, 1]
    roots = np.roots(coeffs)
    return sorted(roots.real)`,
    testCases: [
      { input: '', expectedOutput: '[-1.0, 1.0, 1.0]', isHidden: false, description: 'Root -1 and repeated root 1' },
      { input: '', expectedOutput: '[-1.0, 1.0, 1.0]', isHidden: false, description: 'Verify roots' }
    ],
    hints: ['Substitute y = x^r and its derivatives', 'y\'\'\' = r(r-1)(r-2)*x^(r-3)', 'Simplify to get cubic in r'],
    language: 'python'
  },
  {
    id: 'math302-t3-ex13',
    subjectId: 'math302',
    topicId: 'math302-topic-3',
    title: 'Operator Method - Factoring',
    difficulty: 5,
    description: 'Factor the differential operator D^3 - D where D = d/dx.',
    starterCode: `import numpy as np

def factor_operator():
    """
    Factor D^3 - D as product of linear operators
    Return roots of characteristic equation
    """
    pass`,
    solution: `import numpy as np

def factor_operator():
    """
    D^3 - D = D(D^2 - 1) = D(D-1)(D+1)
    Characteristic equation: r^3 - r = 0
    r(r-1)(r+1) = 0
    Roots: 0, 1, -1
    """
    return [-1.0, 0.0, 1.0]`,
    testCases: [
      { input: '', expectedOutput: '[-1.0, 0.0, 1.0]', isHidden: false, description: 'Factored roots' },
      { input: '', expectedOutput: '[-1.0, 0.0, 1.0]', isHidden: false, description: 'Verify D(D-1)(D+1)' }
    ],
    hints: ['Factor out D first', 'D^3 - D = D(D^2 - 1)', 'D^2 - 1 = (D-1)(D+1)'],
    language: 'python'
  },
  {
    id: 'math302-t3-ex14',
    subjectId: 'math302',
    topicId: 'math302-topic-3',
    title: 'Boundary Value Problem',
    difficulty: 5,
    description: 'Solve y\'\' + λy = 0 with boundary conditions y(0) = 0, y(π) = 0. Find the first three eigenvalues λ.',
    starterCode: `import numpy as np

def find_eigenvalues():
    """
    For y'' + λy = 0, y(0) = 0, y(π) = 0
    Find first three eigenvalues λ_n
    """
    pass`,
    solution: `import numpy as np

def find_eigenvalues():
    """
    For y'' + λy = 0, y(0) = 0, y(π) = 0
    Non-trivial solutions require λ > 0
    General: y = A*cos(√λ*x) + B*sin(√λ*x)
    y(0) = 0 => A = 0
    y(π) = 0 => B*sin(√λ*π) = 0
    Non-trivial: sin(√λ*π) = 0
    √λ*π = nπ, n = 1, 2, 3, ...
    λ_n = n^2
    First three: 1, 4, 9
    """
    return [1.0, 4.0, 9.0]`,
    testCases: [
      { input: '', expectedOutput: '[1.0, 4.0, 9.0]', isHidden: false, description: 'First three eigenvalues' },
      { input: '', expectedOutput: '[1.0, 4.0, 9.0]', isHidden: false, description: 'λ = n^2' }
    ],
    hints: ['Only λ > 0 gives non-trivial solutions', 'General solution: A*cos(√λ*x) + B*sin(√λ*x)', 'Boundary conditions force λ = n^2, n = 1,2,3,...'],
    language: 'python'
  },
  {
    id: 'math302-t3-ex15',
    subjectId: 'math302',
    topicId: 'math302-topic-3',
    title: 'Wronskian Test',
    difficulty: 5,
    description: 'Compute the Wronskian of {e^x, e^(2x), e^(3x)} at x = 0.',
    starterCode: `import numpy as np

def compute_wronskian():
    """
    Compute W(e^x, e^(2x), e^(3x)) at x = 0
    W = |y1   y2   y3  |
        |y1'  y2'  y3' |
        |y1'' y2'' y3''|
    """
    pass`,
    solution: `import numpy as np

def compute_wronskian():
    """
    At x = 0:
    y1 = e^0 = 1,  y1' = 1,  y1'' = 1
    y2 = e^0 = 1,  y2' = 2,  y2'' = 4
    y3 = e^0 = 1,  y3' = 3,  y3'' = 9
    W = |1  1  1|
        |1  2  3|
        |1  4  9|
    = 1(18-12) - 1(9-3) + 1(4-2)
    = 6 - 6 + 2 = 2
    """
    matrix = np.array([
        [1, 1, 1],
        [1, 2, 3],
        [1, 4, 9]
    ])
    return np.linalg.det(matrix)`,
    testCases: [
      { input: '', expectedOutput: '2.0', isHidden: false, description: 'Wronskian at x=0' },
      { input: '', expectedOutput: '2.0', isHidden: false, description: 'Functions are linearly independent' }
    ],
    hints: ['Wronskian is determinant of matrix with functions and derivatives', 'Evaluate each function and its derivatives at x = 0', 'Compute 3×3 determinant'],
    language: 'python'
  },
  {
    id: 'math302-t3-ex16',
    subjectId: 'math302',
    topicId: 'math302-topic-3',
    title: 'General Wronskian Formula',
    difficulty: 5,
    description: 'For y\'\' + p(x)y\' + q(x)y = 0, the Wronskian satisfies W\' = -p(x)W. Solve for W if p(x) = 2/x and W(1) = 3.',
    starterCode: `import numpy as np

def wronskian_solution(x):
    """
    Solve W' = -p(x)*W where p(x) = 2/x
    W(1) = 3
    """
    pass`,
    solution: `import numpy as np

def wronskian_solution(x):
    """
    Solve W' = -(2/x)*W
    dW/W = -2/x dx
    ln|W| = -2*ln|x| + C
    W = K/x^2
    W(1) = 3: K = 3
    W = 3/x^2
    """
    return 3 / x**2`,
    testCases: [
      { input: '1', expectedOutput: '3.0', isHidden: false, description: 'Initial condition' },
      { input: '2', expectedOutput: '0.75', isHidden: false, description: 'x = 2' },
      { input: '3', expectedOutput: '0.3333', isHidden: false, description: 'x = 3' },
      { input: '0.5', expectedOutput: '12.0', isHidden: true, description: 'x = 0.5' }
    ],
    hints: ['This is Abels formula for Wronskian', 'Solve the separable equation dW/W = -p(x)dx', 'W = K*exp(-∫p(x)dx)'],
    language: 'python'
  }
];
