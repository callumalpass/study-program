import { CodingExercise } from '../../../../core/types';

export const topic2Exercises: CodingExercise[] = [
  {
    id: 'math302-t2-ex01',
    subjectId: 'math302',
    topicId: 'math302-topic-2',
    title: 'Characteristic Equation - Distinct Real Roots',
    difficulty: 1,
    description: 'Find the roots of the characteristic equation r^2 - 5r + 6 = 0.',
    starterCode: `import numpy as np

def find_roots():
    """
    Solve r^2 - 5r + 6 = 0
    Return roots as sorted list
    """
    pass`,
    solution: `import numpy as np

def find_roots():
    """
    Solve r^2 - 5r + 6 = 0
    Roots: r = 2, r = 3
    """
    coeffs = [1, -5, 6]
    roots = np.roots(coeffs)
    return sorted(roots.real)`,
    testCases: [
      { input: '', expectedOutput: '[2.0, 3.0]', isHidden: false, description: 'Distinct real roots' },
      { input: '', expectedOutput: '[2.0, 3.0]', isHidden: false, description: 'Verify roots' }
    ],
    hints: ['Use the quadratic formula or np.roots()', 'Factor: (r-2)(r-3) = 0', 'Return sorted list of roots'],
    language: 'python'
  },
  {
    id: 'math302-t2-ex02',
    subjectId: 'math302',
    topicId: 'math302-topic-2',
    title: 'Solve Second-Order ODE - Distinct Roots',
    difficulty: 2,
    description: 'Solve y\'\' - 5y\' + 6y = 0 with y(0) = 1, y\'(0) = 4.',
    starterCode: `import numpy as np

def solve_second_order(x):
    """
    Solve y'' - 5y' + 6y = 0
    y(0) = 1, y'(0) = 4
    """
    pass`,
    solution: `import numpy as np

def solve_second_order(x):
    """
    Solve y'' - 5y' + 6y = 0
    Characteristic equation: r^2 - 5r + 6 = 0, roots r = 2, 3
    General solution: y = c1*e^(2x) + c2*e^(3x)
    With y(0) = 1, y'(0) = 4: c1 = 2, c2 = -1
    Solution: y = 2e^(2x) - e^(3x)
    """
    return 2*np.exp(2*x) - np.exp(3*x)`,
    testCases: [
      { input: '0', expectedOutput: '1.0', isHidden: false, description: 'Initial condition y(0)' },
      { input: '1', expectedOutput: '-5.0855', isHidden: false, description: 'x = 1' },
      { input: '0.5', expectedOutput: '1.0696', isHidden: false, description: 'Intermediate value' },
      { input: '-1', expectedOutput: '-0.0677', isHidden: true, description: 'Negative x' }
    ],
    hints: ['General solution: y = c1*e^(r1*x) + c2*e^(r2*x) where r1, r2 are roots', 'Apply y(0) = 1: c1 + c2 = 1', 'Apply y\'(0) = 4: 2*c1 + 3*c2 = 4'],
    language: 'python'
  },
  {
    id: 'math302-t2-ex03',
    subjectId: 'math302',
    topicId: 'math302-topic-2',
    title: 'Characteristic Equation - Repeated Roots',
    difficulty: 2,
    description: 'Find the roots of r^2 - 4r + 4 = 0 and determine if they are repeated.',
    starterCode: `import numpy as np

def check_repeated_roots():
    """
    Check if r^2 - 4r + 4 = 0 has repeated roots
    Return (roots, is_repeated)
    """
    pass`,
    solution: `import numpy as np

def check_repeated_roots():
    """
    r^2 - 4r + 4 = 0
    Discriminant: b^2 - 4ac = 16 - 16 = 0
    Repeated root: r = 2
    """
    coeffs = [1, -4, 4]
    roots = np.roots(coeffs)
    is_repeated = np.isclose(roots[0], roots[1])
    return (roots[0].real, is_repeated)`,
    testCases: [
      { input: '', expectedOutput: '(2.0, True)', isHidden: false, description: 'Repeated root r = 2' },
      { input: '', expectedOutput: '(2.0, True)', isHidden: false, description: 'Verify repeated root' }
    ],
    hints: ['Check discriminant: b^2 - 4ac', 'If discriminant = 0, roots are repeated', 'Factor: (r-2)^2 = 0'],
    language: 'python'
  },
  {
    id: 'math302-t2-ex04',
    subjectId: 'math302',
    topicId: 'math302-topic-2',
    title: 'Solve ODE - Repeated Roots',
    difficulty: 2,
    description: 'Solve y\'\' - 4y\' + 4y = 0 with y(0) = 1, y\'(0) = 1.',
    starterCode: `import numpy as np

def solve_repeated_roots(x):
    """
    Solve y'' - 4y' + 4y = 0
    y(0) = 1, y'(0) = 1
    """
    pass`,
    solution: `import numpy as np

def solve_repeated_roots(x):
    """
    Solve y'' - 4y' + 4y = 0
    Repeated root r = 2
    General solution: y = (c1 + c2*x)e^(2x)
    With y(0) = 1, y'(0) = 1: c1 = 1, c2 = -1
    Solution: y = (1 - x)e^(2x)
    """
    return (1 - x) * np.exp(2*x)`,
    testCases: [
      { input: '0', expectedOutput: '1.0', isHidden: false, description: 'Initial condition y(0)' },
      { input: '1', expectedOutput: '0.0', isHidden: false, description: 'Zero at x = 1' },
      { input: '0.5', expectedOutput: '1.3591', isHidden: false, description: 'Intermediate value' },
      { input: '2', expectedOutput: '-54.5982', isHidden: true, description: 'x = 2' }
    ],
    hints: ['For repeated root r, solution is y = (c1 + c2*x)e^(rx)', 'Apply y(0) = 1: c1 = 1', 'Apply y\'(0) = 1 to find c2'],
    language: 'python'
  },
  {
    id: 'math302-t2-ex05',
    subjectId: 'math302',
    topicId: 'math302-topic-2',
    title: 'Characteristic Equation - Complex Roots',
    difficulty: 2,
    description: 'Find the complex roots of r^2 + 4 = 0.',
    starterCode: `import numpy as np

def find_complex_roots():
    """
    Solve r^2 + 4 = 0
    Return roots as complex numbers
    """
    pass`,
    solution: `import numpy as np

def find_complex_roots():
    """
    Solve r^2 + 4 = 0
    Roots: r = ±2i
    """
    coeffs = [1, 0, 4]
    roots = np.roots(coeffs)
    return sorted(roots, key=lambda x: x.imag)`,
    testCases: [
      { input: '', expectedOutput: '[-2j, 2j]', isHidden: false, description: 'Pure imaginary roots' },
      { input: '', expectedOutput: '[-2j, 2j]', isHidden: false, description: 'Verify ±2i' }
    ],
    hints: ['r^2 = -4', 'Take square root: r = ±2i', 'Use np.roots() for complex roots'],
    language: 'python'
  },
  {
    id: 'math302-t2-ex06',
    subjectId: 'math302',
    topicId: 'math302-topic-2',
    title: 'Solve ODE - Pure Imaginary Roots',
    difficulty: 3,
    description: 'Solve y\'\' + 4y = 0 with y(0) = 1, y\'(0) = 0.',
    starterCode: `import numpy as np

def solve_complex_roots(x):
    """
    Solve y'' + 4y = 0
    y(0) = 1, y'(0) = 0
    """
    pass`,
    solution: `import numpy as np

def solve_complex_roots(x):
    """
    Solve y'' + 4y = 0
    Roots: r = ±2i (α = 0, β = 2)
    General solution: y = e^(αx)(c1*cos(βx) + c2*sin(βx))
    = c1*cos(2x) + c2*sin(2x)
    With y(0) = 1, y'(0) = 0: c1 = 1, c2 = 0
    Solution: y = cos(2x)
    """
    return np.cos(2*x)`,
    testCases: [
      { input: '0', expectedOutput: '1.0', isHidden: false, description: 'Initial condition' },
      { input: 'np.pi/4', expectedOutput: '0.0', isHidden: false, description: 'Zero at π/4' },
      { input: 'np.pi/2', expectedOutput: '-1.0', isHidden: false, description: 'Minimum at π/2' },
      { input: 'np.pi', expectedOutput: '1.0', isHidden: true, description: 'Period 2π/ω = π' }
    ],
    hints: ['For roots α ± βi, solution is y = e^(αx)(c1*cos(βx) + c2*sin(βx))', 'Here α = 0, β = 2', 'Apply initial conditions to find c1 and c2'],
    language: 'python'
  },
  {
    id: 'math302-t2-ex07',
    subjectId: 'math302',
    topicId: 'math302-topic-2',
    title: 'General Complex Roots',
    difficulty: 3,
    description: 'Solve y\'\' - 2y\' + 5y = 0 with y(0) = 1, y\'(0) = 0.',
    starterCode: `import numpy as np

def solve_general_complex(x):
    """
    Solve y'' - 2y' + 5y = 0
    y(0) = 1, y'(0) = 0
    """
    pass`,
    solution: `import numpy as np

def solve_general_complex(x):
    """
    Solve y'' - 2y' + 5y = 0
    Characteristic: r^2 - 2r + 5 = 0
    Roots: r = 1 ± 2i (α = 1, β = 2)
    General: y = e^x(c1*cos(2x) + c2*sin(2x))
    With y(0) = 1, y'(0) = 0: c1 = 1, c2 = -1/2
    Solution: y = e^x(cos(2x) - 0.5*sin(2x))
    """
    return np.exp(x) * (np.cos(2*x) - 0.5*np.sin(2*x))`,
    testCases: [
      { input: '0', expectedOutput: '1.0', isHidden: false, description: 'Initial condition' },
      { input: 'np.pi/2', expectedOutput: '-4.8105', isHidden: false, description: 'x = π/2' },
      { input: '1', expectedOutput: '-1.3108', isHidden: false, description: 'x = 1' },
      { input: 'np.pi', expectedOutput: '23.1407', isHidden: true, description: 'x = π' }
    ],
    hints: ['Find roots using quadratic formula', 'Roots are 1 ± 2i, so α = 1, β = 2', 'General solution: y = e^x(c1*cos(2x) + c2*sin(2x))'],
    language: 'python'
  },
  {
    id: 'math302-t2-ex08',
    subjectId: 'math302',
    topicId: 'math302-topic-2',
    title: 'Undetermined Coefficients - Polynomial',
    difficulty: 3,
    description: 'Solve y\'\' - 3y\' + 2y = 4x using undetermined coefficients.',
    starterCode: `import numpy as np

def solve_nonhomogeneous_poly(x):
    """
    Solve y'' - 3y' + 2y = 4x
    General solution with y(0) = 0, y'(0) = 0
    """
    pass`,
    solution: `import numpy as np

def solve_nonhomogeneous_poly(x):
    """
    Solve y'' - 3y' + 2y = 4x
    Homogeneous: yh = c1*e^x + c2*e^(2x)
    Particular: try yp = Ax + B
    yp'' = 0, yp' = A
    0 - 3A + 2(Ax + B) = 4x
    2Ax + (2B - 3A) = 4x
    2A = 4 => A = 2
    2B - 3A = 0 => B = 3
    yp = 2x + 3
    With y(0) = 0, y'(0) = 0: c1 = -5, c2 = 2
    Solution: y = -5e^x + 2e^(2x) + 2x + 3
    """
    return -5*np.exp(x) + 2*np.exp(2*x) + 2*x + 3`,
    testCases: [
      { input: '0', expectedOutput: '0.0', isHidden: false, description: 'Initial condition y(0)' },
      { input: '1', expectedOutput: '0.0', isHidden: false, description: 'x = 1' },
      { input: '2', expectedOutput: '14.6975', isHidden: false, description: 'x = 2' },
      { input: '0.5', expectedOutput: '-0.6065', isHidden: true, description: 'Intermediate value' }
    ],
    hints: ['Find homogeneous solution first', 'For f(x) = 4x, try particular solution yp = Ax + B', 'Substitute into ODE and match coefficients'],
    language: 'python'
  },
  {
    id: 'math302-t2-ex09',
    subjectId: 'math302',
    topicId: 'math302-topic-2',
    title: 'Undetermined Coefficients - Exponential',
    difficulty: 3,
    description: 'Solve y\'\' - y = 2e^x using undetermined coefficients.',
    starterCode: `import numpy as np

def solve_nonhomogeneous_exp(x):
    """
    Solve y'' - y = 2e^x
    With y(0) = 0, y'(0) = 0
    """
    pass`,
    solution: `import numpy as np

def solve_nonhomogeneous_exp(x):
    """
    Solve y'' - y = 2e^x
    Homogeneous: yh = c1*e^x + c2*e^(-x)
    e^x is part of homogeneous solution
    Try yp = Ax*e^x (modification rule)
    yp' = Ae^x + Axe^x
    yp'' = 2Ae^x + Axe^x
    (2Ae^x + Axe^x) - Axe^x = 2e^x
    2A = 2 => A = 1
    yp = xe^x
    With y(0) = 0, y'(0) = 0: c1 = 0, c2 = 0
    Solution: y = xe^x
    """
    return x * np.exp(x)`,
    testCases: [
      { input: '0', expectedOutput: '0.0', isHidden: false, description: 'Initial condition' },
      { input: '1', expectedOutput: '2.7183', isHidden: false, description: 'x = 1' },
      { input: '2', expectedOutput: '14.7781', isHidden: false, description: 'x = 2' },
      { input: '-1', expectedOutput: '-0.3679', isHidden: true, description: 'Negative x' }
    ],
    hints: ['Homogeneous solution includes e^x', 'Must multiply trial solution by x: yp = Axe^x', 'This is the modification rule for resonance'],
    language: 'python'
  },
  {
    id: 'math302-t2-ex10',
    subjectId: 'math302',
    topicId: 'math302-topic-2',
    title: 'Undetermined Coefficients - Sine/Cosine',
    difficulty: 4,
    description: 'Solve y\'\' + 4y = 8sin(2x) with y(0) = 0, y\'(0) = 0.',
    starterCode: `import numpy as np

def solve_nonhomogeneous_trig(x):
    """
    Solve y'' + 4y = 8sin(2x)
    y(0) = 0, y'(0) = 0
    """
    pass`,
    solution: `import numpy as np

def solve_nonhomogeneous_trig(x):
    """
    Solve y'' + 4y = 8sin(2x)
    Homogeneous: yh = c1*cos(2x) + c2*sin(2x)
    sin(2x) is part of homogeneous solution
    Try yp = x(A*cos(2x) + B*sin(2x)) (modification)
    After substitution: A = 0, B = -2
    yp = -2x*cos(2x)
    With y(0) = 0, y'(0) = 0: c1 = 0, c2 = 1
    Solution: y = sin(2x) - 2x*cos(2x)
    """
    return np.sin(2*x) - 2*x*np.cos(2*x)`,
    testCases: [
      { input: '0', expectedOutput: '0.0', isHidden: false, description: 'Initial condition' },
      { input: 'np.pi/4', expectedOutput: '1.0', isHidden: false, description: 'x = π/4' },
      { input: 'np.pi/2', expectedOutput: '-3.1416', isHidden: false, description: 'x = π/2' },
      { input: 'np.pi', expectedOutput: '6.2832', isHidden: true, description: 'x = π' }
    ],
    hints: ['Homogeneous solution contains sin(2x) and cos(2x)', 'Use modification rule: multiply by x', 'Try yp = x(A*cos(2x) + B*sin(2x))'],
    language: 'python'
  },
  {
    id: 'math302-t2-ex11',
    subjectId: 'math302',
    topicId: 'math302-topic-2',
    title: 'Simple Harmonic Motion',
    difficulty: 4,
    description: 'A mass-spring system: y\'\' + ω^2*y = 0 with ω = 3, y(0) = 2, y\'(0) = 0. Find position at t = π/6.',
    starterCode: `import numpy as np

def harmonic_motion(t, omega=3, y0=2, v0=0):
    """
    Solve y'' + ω^2*y = 0
    y(0) = y0, y'(0) = v0
    """
    pass`,
    solution: `import numpy as np

def harmonic_motion(t, omega=3, y0=2, v0=0):
    """
    Solve y'' + ω^2*y = 0
    Solution: y = c1*cos(ωt) + c2*sin(ωt)
    With y(0) = y0, y'(0) = v0:
    c1 = y0, c2 = v0/ω
    """
    c1 = y0
    c2 = v0 / omega
    return c1 * np.cos(omega * t) + c2 * np.sin(omega * t)`,
    testCases: [
      { input: '0, 3, 2, 0', expectedOutput: '2.0', isHidden: false, description: 'Initial position' },
      { input: 'np.pi/6, 3, 2, 0', expectedOutput: '1.0', isHidden: false, description: 't = π/6' },
      { input: 'np.pi/3, 3, 2, 0', expectedOutput: '-1.0', isHidden: false, description: 't = π/3' },
      { input: 'np.pi/2, 3, 2, 0', expectedOutput: '-2.0', isHidden: true, description: 't = π/2' }
    ],
    hints: ['This is undamped harmonic motion', 'General solution: y = c1*cos(ωt) + c2*sin(ωt)', 'Apply initial conditions for position and velocity'],
    language: 'python'
  },
  {
    id: 'math302-t2-ex12',
    subjectId: 'math302',
    topicId: 'math302-topic-2',
    title: 'Damped Harmonic Motion',
    difficulty: 4,
    description: 'Solve y\'\' + 2y\' + 5y = 0 (underdamped) with y(0) = 1, y\'(0) = -1.',
    starterCode: `import numpy as np

def damped_harmonic(t):
    """
    Solve y'' + 2y' + 5y = 0
    y(0) = 1, y'(0) = -1
    """
    pass`,
    solution: `import numpy as np

def damped_harmonic(t):
    """
    Solve y'' + 2y' + 5y = 0
    Roots: r = -1 ± 2i (α = -1, β = 2)
    General: y = e^(-t)(c1*cos(2t) + c2*sin(2t))
    With y(0) = 1, y'(0) = -1: c1 = 1, c2 = 0
    Solution: y = e^(-t)*cos(2t)
    """
    return np.exp(-t) * np.cos(2*t)`,
    testCases: [
      { input: '0', expectedOutput: '1.0', isHidden: false, description: 'Initial condition' },
      { input: 'np.pi/4', expectedOutput: '0.0', isHidden: false, description: 'First zero crossing' },
      { input: 'np.pi/2', expectedOutput: '-0.2079', isHidden: false, description: 't = π/2' },
      { input: 'np.pi', expectedOutput: '0.0432', isHidden: true, description: 't = π' }
    ],
    hints: ['This is underdamped motion (complex roots with negative real part)', 'Roots: -1 ± 2i', 'Solution decays exponentially while oscillating'],
    language: 'python'
  },
  {
    id: 'math302-t2-ex13',
    subjectId: 'math302',
    topicId: 'math302-topic-2',
    title: 'Critically Damped Motion',
    difficulty: 4,
    description: 'Solve y\'\' + 4y\' + 4y = 0 with y(0) = 1, y\'(0) = 0.',
    starterCode: `import numpy as np

def critically_damped(t):
    """
    Solve y'' + 4y' + 4y = 0 (critically damped)
    y(0) = 1, y'(0) = 0
    """
    pass`,
    solution: `import numpy as np

def critically_damped(t):
    """
    Solve y'' + 4y' + 4y = 0
    Repeated root: r = -2
    General: y = (c1 + c2*t)e^(-2t)
    With y(0) = 1, y'(0) = 0: c1 = 1, c2 = 2
    Solution: y = (1 + 2t)e^(-2t)
    """
    return (1 + 2*t) * np.exp(-2*t)`,
    testCases: [
      { input: '0', expectedOutput: '1.0', isHidden: false, description: 'Initial condition' },
      { input: '1', expectedOutput: '0.4060', isHidden: false, description: 't = 1' },
      { input: '2', expectedOutput: '0.0916', isHidden: false, description: 't = 2' },
      { input: '0.5', expectedOutput: '0.7358', isHidden: true, description: 'Intermediate value' }
    ],
    hints: ['Critical damping: discriminant = 0, repeated root', 'Root r = -2 (repeated)', 'General solution: y = (c1 + c2*t)e^(-2t)'],
    language: 'python'
  },
  {
    id: 'math302-t2-ex14',
    subjectId: 'math302',
    topicId: 'math302-topic-2',
    title: 'Variation of Parameters',
    difficulty: 5,
    description: 'Solve y\'\' - y = 1/(1+e^x) using variation of parameters.',
    starterCode: `import numpy as np
from scipy.integrate import odeint

def variation_of_parameters(x):
    """
    Solve y'' - y = 1/(1+e^x)
    y(0) = 0, y'(0) = 0
    """
    pass`,
    solution: `import numpy as np
from scipy.integrate import odeint

def variation_of_parameters(x):
    """
    Solve y'' - y = 1/(1+e^x)
    Numerical solution required
    """
    def system(Y, x):
        y, yp = Y
        return [yp, y + 1/(1 + np.exp(x))]

    Y0 = [0, 0]
    x_span = np.linspace(0, x, 100)
    sol = odeint(system, Y0, x_span)

    return sol[-1, 0]`,
    testCases: [
      { input: '0', expectedOutput: '0.0', isHidden: false, description: 'Initial condition' },
      { input: '1', expectedOutput: '0.2293', isHidden: false, description: 'x = 1' },
      { input: '2', expectedOutput: '0.5679', isHidden: false, description: 'x = 2' },
      { input: '-1', expectedOutput: '-0.3935', isHidden: true, description: 'Negative x' }
    ],
    hints: ['Variation of parameters for complex forcing functions', 'Convert to system: y1 = y, y2 = y\'', 'Use odeint for numerical solution'],
    language: 'python'
  },
  {
    id: 'math302-t2-ex15',
    subjectId: 'math302',
    topicId: 'math302-topic-2',
    title: 'Forced Vibration - Resonance',
    difficulty: 5,
    description: 'Solve y\'\' + ω^2*y = F*cos(ωt) with ω = 2, F = 4, y(0) = 0, y\'(0) = 0. This is resonance.',
    starterCode: `import numpy as np

def resonance(t, omega=2, F=4):
    """
    Solve y'' + ω^2*y = F*cos(ωt)
    y(0) = 0, y'(0) = 0
    """
    pass`,
    solution: `import numpy as np

def resonance(t, omega=2, F=4):
    """
    Solve y'' + ω^2*y = F*cos(ωt)
    Resonance case: forcing frequency = natural frequency
    Particular solution: yp = (F/(2ω))t*sin(ωt)
    With y(0) = 0, y'(0) = 0: yh = 0
    Solution: y = (F/(2ω))t*sin(ωt) = t*sin(2t)
    """
    return t * np.sin(omega * t)`,
    testCases: [
      { input: '0, 2, 4', expectedOutput: '0.0', isHidden: false, description: 'Initial condition' },
      { input: 'np.pi/4, 2, 4', expectedOutput: '0.7854', isHidden: false, description: 't = π/4' },
      { input: 'np.pi/2, 2, 4', expectedOutput: '1.5708', isHidden: false, description: 't = π/2' },
      { input: 'np.pi, 2, 4', expectedOutput: '0.0', isHidden: true, description: 't = π' }
    ],
    hints: ['Resonance occurs when forcing frequency equals natural frequency', 'Amplitude grows linearly with time', 'Particular solution has form yp = t*(A*cos(ωt) + B*sin(ωt))'],
    language: 'python'
  },
  {
    id: 'math302-t2-ex16',
    subjectId: 'math302',
    topicId: 'math302-topic-2',
    title: 'RLC Circuit Equation',
    difficulty: 5,
    description: 'RLC circuit: LQ\'\' + RQ\' + Q/C = E(t). Solve with L=1, R=2, C=0.2, E(t)=10, Q(0)=0, Q\'(0)=0. Find Q at t=1.',
    starterCode: `import numpy as np
from scipy.integrate import odeint

def rlc_circuit(t_final, L=1, R=2, C=0.2, E=10):
    """
    Solve LQ'' + RQ' + Q/C = E
    Q(0) = 0, Q'(0) = 0
    """
    pass`,
    solution: `import numpy as np
from scipy.integrate import odeint

def rlc_circuit(t_final, L=1, R=2, C=0.2, E=10):
    """
    Solve LQ'' + RQ' + Q/C = E
    Convert: Q'' + (R/L)Q' + 1/(LC)Q = E/L
    Q'' + 2Q' + 5Q = 10
    """
    def system(Y, t):
        Q, Qp = Y
        Qpp = E/L - (R/L)*Qp - Q/(L*C)
        return [Qp, Qpp]

    Y0 = [0, 0]
    t_span = np.linspace(0, t_final, 100)
    sol = odeint(system, Y0, t_span)

    return sol[-1, 0]`,
    testCases: [
      { input: '0, 1, 2, 0.2, 10', expectedOutput: '0.0', isHidden: false, description: 'Initial charge' },
      { input: '1, 1, 2, 0.2, 10', expectedOutput: '1.6487', isHidden: false, description: 't = 1' },
      { input: '2, 1, 2, 0.2, 10', expectedOutput: '1.9328', isHidden: false, description: 't = 2' },
      { input: '5, 1, 2, 0.2, 10', expectedOutput: '2.0', isHidden: true, description: 'Steady state' }
    ],
    hints: ['Standard form: Q\'\' + (R/L)Q\' + Q/(LC) = E/L', 'Convert to system of first-order ODEs', 'Charge approaches steady state Q = CE = 2'],
    language: 'python'
  }
];
