import { CodingExercise } from '../../../../core/types';

export const topic1Exercises: CodingExercise[] = [
  {
    id: 'math302-t1-ex01',
    subjectId: 'math302',
    topicId: 'math302-topic-1',
    title: 'Solve Simple Separable ODE',
    difficulty: 1,
    description: 'Solve the separable ODE dy/dx = 2x with initial condition y(0) = 1. Implement a function that returns y at a given x value.',
    starterCode: `import numpy as np

def solve_separable_ode(x):
    """
    Solve dy/dx = 2x with y(0) = 1
    Return y at given x
    """
    pass`,
    solution: `import numpy as np

def solve_separable_ode(x):
    """
    Solve dy/dx = 2x with y(0) = 1
    Analytical solution: y = x^2 + 1
    """
    return x**2 + 1`,
    testCases: [
      { input: '0', expectedOutput: '1.0', isHidden: false, description: 'Initial condition' },
      { input: '1', expectedOutput: '2.0', isHidden: false, description: 'x = 1' },
      { input: '2', expectedOutput: '5.0', isHidden: false, description: 'x = 2' },
      { input: '-1', expectedOutput: '2.0', isHidden: true, description: 'Negative x' }
    ],
    hints: ['Separate variables: dy = 2x dx', 'Integrate both sides', 'Apply the initial condition to find the constant'],
    language: 'python'
  },
  {
    id: 'math302-t1-ex02',
    subjectId: 'math302',
    topicId: 'math302-topic-1',
    title: 'Exponential Growth ODE',
    difficulty: 1,
    description: 'Solve dy/dx = ky where k = 0.5 and y(0) = 2. Return y at given x.',
    starterCode: `import numpy as np

def exponential_growth(x, k=0.5):
    """
    Solve dy/dx = ky with y(0) = 2
    """
    pass`,
    solution: `import numpy as np

def exponential_growth(x, k=0.5):
    """
    Solve dy/dx = ky with y(0) = 2
    Solution: y = 2 * e^(kx)
    """
    return 2 * np.exp(k * x)`,
    testCases: [
      { input: '0, 0.5', expectedOutput: '2.0', isHidden: false, description: 'Initial condition' },
      { input: '1, 0.5', expectedOutput: '3.2974', isHidden: false, description: 'x = 1' },
      { input: '2, 0.5', expectedOutput: '5.4366', isHidden: false, description: 'x = 2' },
      { input: '1, 1.0', expectedOutput: '5.4366', isHidden: true, description: 'Different k' }
    ],
    hints: ['This is a separable equation', 'dy/y = k dx', 'The solution involves exponential function'],
    language: 'python'
  },
  {
    id: 'math302-t1-ex03',
    subjectId: 'math302',
    topicId: 'math302-topic-1',
    title: 'Numerical Solution with odeint',
    difficulty: 2,
    description: 'Use scipy.integrate.odeint to solve dy/dx = x - y with y(0) = 1. Return y at x = 2.',
    starterCode: `import numpy as np
from scipy.integrate import odeint

def solve_linear_ode():
    """
    Solve dy/dx = x - y with y(0) = 1
    Return y at x = 2
    """
    pass`,
    solution: `import numpy as np
from scipy.integrate import odeint

def solve_linear_ode():
    """
    Solve dy/dx = x - y with y(0) = 1
    Return y at x = 2
    """
    def dydt(y, x):
        return x - y

    y0 = 1
    x_span = np.linspace(0, 2, 100)
    sol = odeint(dydt, y0, x_span)

    return sol[-1, 0]`,
    testCases: [
      { input: '', expectedOutput: '1.5940', isHidden: false, description: 'Solution at x=2' },
      { input: '', expectedOutput: '1.5940', isHidden: false, description: 'Verify numerical solution' }
    ],
    hints: ['Define the derivative function dydt(y, x)', 'Use odeint with initial condition y(0) = 1', 'Evaluate the solution at x = 2'],
    language: 'python'
  },
  {
    id: 'math302-t1-ex04',
    subjectId: 'math302',
    topicId: 'math302-topic-1',
    title: 'Separable ODE with Product',
    difficulty: 2,
    description: 'Solve dy/dx = xy with y(0) = 1. Implement the analytical solution.',
    starterCode: `import numpy as np

def solve_xy_ode(x):
    """
    Solve dy/dx = xy with y(0) = 1
    """
    pass`,
    solution: `import numpy as np

def solve_xy_ode(x):
    """
    Solve dy/dx = xy with y(0) = 1
    Solution: y = e^(x^2/2)
    """
    return np.exp(x**2 / 2)`,
    testCases: [
      { input: '0', expectedOutput: '1.0', isHidden: false, description: 'Initial condition' },
      { input: '1', expectedOutput: '1.6487', isHidden: false, description: 'x = 1' },
      { input: '2', expectedOutput: '7.3891', isHidden: false, description: 'x = 2' },
      { input: '-1', expectedOutput: '1.6487', isHidden: true, description: 'Symmetry check' }
    ],
    hints: ['Separate: dy/y = x dx', 'Integrate both sides: ln|y| = x^2/2 + C', 'Use initial condition to find C = 0'],
    language: 'python'
  },
  {
    id: 'math302-t1-ex05',
    subjectId: 'math302',
    topicId: 'math302-topic-1',
    title: 'Linear First-Order ODE',
    difficulty: 2,
    description: 'Solve the linear ODE dy/dx + 2y = 4 with y(0) = 0 using the integrating factor method.',
    starterCode: `import numpy as np

def solve_linear_first_order(x):
    """
    Solve dy/dx + 2y = 4 with y(0) = 0
    """
    pass`,
    solution: `import numpy as np

def solve_linear_first_order(x):
    """
    Solve dy/dx + 2y = 4 with y(0) = 0
    Integrating factor: e^(2x)
    Solution: y = 2(1 - e^(-2x))
    """
    return 2 * (1 - np.exp(-2 * x))`,
    testCases: [
      { input: '0', expectedOutput: '0.0', isHidden: false, description: 'Initial condition' },
      { input: '1', expectedOutput: '1.7293', isHidden: false, description: 'x = 1' },
      { input: '5', expectedOutput: '1.9999', isHidden: false, description: 'Approaches 2' },
      { input: '0.5', expectedOutput: '1.2642', isHidden: true, description: 'Intermediate value' }
    ],
    hints: ['Standard form: dy/dx + P(x)y = Q(x) where P(x) = 2, Q(x) = 4', 'Integrating factor: μ(x) = e^(∫P(x)dx) = e^(2x)', 'Solution: y = (1/μ)∫μQ dx'],
    language: 'python'
  },
  {
    id: 'math302-t1-ex06',
    subjectId: 'math302',
    topicId: 'math302-topic-1',
    title: 'Logistic Growth Model',
    difficulty: 3,
    description: 'Solve the logistic equation dy/dt = ry(1 - y/K) with r = 0.5, K = 100, y(0) = 10. Return y at t = 5.',
    starterCode: `import numpy as np
from scipy.integrate import odeint

def logistic_growth(t_final, r=0.5, K=100, y0=10):
    """
    Solve logistic growth equation
    """
    pass`,
    solution: `import numpy as np
from scipy.integrate import odeint

def logistic_growth(t_final, r=0.5, K=100, y0=10):
    """
    Solve logistic growth equation
    dy/dt = ry(1 - y/K)
    """
    def dydt(y, t):
        return r * y * (1 - y / K)

    t_span = np.linspace(0, t_final, 100)
    sol = odeint(dydt, y0, t_span)

    return sol[-1, 0]`,
    testCases: [
      { input: '0, 0.5, 100, 10', expectedOutput: '10.0', isHidden: false, description: 'Initial condition' },
      { input: '5, 0.5, 100, 10', expectedOutput: '53.9741', isHidden: false, description: 't = 5' },
      { input: '10, 0.5, 100, 10', expectedOutput: '88.0797', isHidden: false, description: 't = 10' },
      { input: '20, 0.5, 100, 10', expectedOutput: '99.7527', isHidden: true, description: 'Approaches K' }
    ],
    hints: ['The logistic equation is separable but easier to solve numerically', 'Use odeint with dydt = r*y*(1 - y/K)', 'Population approaches carrying capacity K'],
    language: 'python'
  },
  {
    id: 'math302-t1-ex07',
    subjectId: 'math302',
    topicId: 'math302-topic-1',
    title: 'Linear ODE with Variable Coefficient',
    difficulty: 3,
    description: 'Solve dy/dx + (1/x)y = x with y(1) = 2 using integrating factor.',
    starterCode: `import numpy as np

def solve_variable_coeff(x):
    """
    Solve dy/dx + (1/x)y = x with y(1) = 2
    """
    pass`,
    solution: `import numpy as np

def solve_variable_coeff(x):
    """
    Solve dy/dx + (1/x)y = x with y(1) = 2
    Integrating factor: μ = e^(ln|x|) = x
    Solution: y = x^2/3 + 5/(3x)
    """
    return x**2 / 3 + 5 / (3 * x)`,
    testCases: [
      { input: '1', expectedOutput: '2.0', isHidden: false, description: 'Initial condition' },
      { input: '2', expectedOutput: '2.1667', isHidden: false, description: 'x = 2' },
      { input: '3', expectedOutput: '3.5556', isHidden: false, description: 'x = 3' },
      { input: '0.5', expectedOutput: '3.4167', isHidden: true, description: 'x < 1' }
    ],
    hints: ['P(x) = 1/x, integrating factor is e^(∫1/x dx) = e^(ln|x|) = x', 'Multiply through by integrating factor x', 'After solving, apply initial condition y(1) = 2'],
    language: 'python'
  },
  {
    id: 'math302-t1-ex08',
    subjectId: 'math302',
    topicId: 'math302-topic-1',
    title: 'Separable ODE with Trigonometric Function',
    difficulty: 3,
    description: 'Solve dy/dx = y*cos(x) with y(0) = 1.',
    starterCode: `import numpy as np

def solve_trig_ode(x):
    """
    Solve dy/dx = y*cos(x) with y(0) = 1
    """
    pass`,
    solution: `import numpy as np

def solve_trig_ode(x):
    """
    Solve dy/dx = y*cos(x) with y(0) = 1
    Solution: y = e^(sin(x))
    """
    return np.exp(np.sin(x))`,
    testCases: [
      { input: '0', expectedOutput: '1.0', isHidden: false, description: 'Initial condition' },
      { input: 'np.pi/2', expectedOutput: '2.7183', isHidden: false, description: 'x = π/2' },
      { input: 'np.pi', expectedOutput: '1.0', isHidden: false, description: 'x = π' },
      { input: '-np.pi/2', expectedOutput: '0.3679', isHidden: true, description: 'x = -π/2' }
    ],
    hints: ['Separate: dy/y = cos(x) dx', 'Integrate: ln|y| = sin(x) + C', 'Use y(0) = 1 to find C = 0'],
    language: 'python'
  },
  {
    id: 'math302-t1-ex09',
    subjectId: 'math302',
    topicId: 'math302-topic-1',
    title: 'Numerical Solution of Nonlinear ODE',
    difficulty: 3,
    description: 'Solve dy/dx = x^2 + y^2 with y(0) = 0 numerically. Return y at x = 1.',
    starterCode: `import numpy as np
from scipy.integrate import odeint

def solve_nonlinear_ode():
    """
    Solve dy/dx = x^2 + y^2 with y(0) = 0
    Return y at x = 1
    """
    pass`,
    solution: `import numpy as np
from scipy.integrate import odeint

def solve_nonlinear_ode():
    """
    Solve dy/dx = x^2 + y^2 with y(0) = 0
    Return y at x = 1
    """
    def dydt(y, x):
        return x**2 + y**2

    y0 = 0
    x_span = np.linspace(0, 1, 100)
    sol = odeint(dydt, y0, x_span)

    return sol[-1, 0]`,
    testCases: [
      { input: '', expectedOutput: '0.3502', isHidden: false, description: 'Solution at x=1' },
      { input: '', expectedOutput: '0.3502', isHidden: false, description: 'Verify solution' }
    ],
    hints: ['This is a nonlinear ODE - no analytical solution available', 'Use odeint with dydt = x^2 + y^2', 'The solution exists only on a finite interval'],
    language: 'python'
  },
  {
    id: 'math302-t1-ex10',
    subjectId: 'math302',
    topicId: 'math302-topic-1',
    title: 'Bernoulli Equation',
    difficulty: 4,
    description: 'Solve the Bernoulli equation dy/dx + y = xy^2 with y(0) = 1 by substitution v = y^(-1).',
    starterCode: `import numpy as np

def solve_bernoulli(x):
    """
    Solve dy/dx + y = xy^2 with y(0) = 1
    """
    pass`,
    solution: `import numpy as np

def solve_bernoulli(x):
    """
    Solve dy/dx + y = xy^2 with y(0) = 1
    Using v = 1/y substitution
    Solution: y = 1/(x + e^(-x))
    """
    return 1 / (x + np.exp(-x))`,
    testCases: [
      { input: '0', expectedOutput: '1.0', isHidden: false, description: 'Initial condition' },
      { input: '1', expectedOutput: '0.5820', isHidden: false, description: 'x = 1' },
      { input: '2', expectedOutput: '0.4615', isHidden: false, description: 'x = 2' },
      { input: '0.5', expectedOutput: '0.7561', isHidden: true, description: 'Intermediate value' }
    ],
    hints: ['Bernoulli form: dy/dx + P(x)y = Q(x)y^n where n = 2', 'Substitute v = y^(1-n) = y^(-1)', 'This transforms to a linear ODE in v'],
    language: 'python'
  },
  {
    id: 'math302-t1-ex11',
    subjectId: 'math302',
    topicId: 'math302-topic-1',
    title: 'Exact Equation Check',
    difficulty: 4,
    description: 'Implement a function to check if (2xy + 3)dx + (x^2 - 1)dy = 0 is exact.',
    starterCode: `import numpy as np

def is_exact(x, y):
    """
    Check if (2xy + 3)dx + (x^2 - 1)dy = 0 is exact
    Return True if exact, False otherwise
    M(x,y) = 2xy + 3
    N(x,y) = x^2 - 1
    """
    pass`,
    solution: `import numpy as np

def is_exact(x, y):
    """
    Check if (2xy + 3)dx + (x^2 - 1)dy = 0 is exact
    M(x,y) = 2xy + 3, dM/dy = 2x
    N(x,y) = x^2 - 1, dN/dx = 2x
    Since dM/dy = dN/dx, it is exact
    """
    # dM/dy = 2x
    dM_dy = 2 * x
    # dN/dx = 2x
    dN_dx = 2 * x

    return np.isclose(dM_dy, dN_dx)`,
    testCases: [
      { input: '1, 1', expectedOutput: 'True', isHidden: false, description: 'Point (1,1)' },
      { input: '2, 3', expectedOutput: 'True', isHidden: false, description: 'Point (2,3)' },
      { input: '0, 0', expectedOutput: 'True', isHidden: false, description: 'Origin' },
      { input: '-1, 5', expectedOutput: 'True', isHidden: true, description: 'Negative x' }
    ],
    hints: ['For M dx + N dy = 0 to be exact, need ∂M/∂y = ∂N/∂x', 'M = 2xy + 3, compute ∂M/∂y', 'N = x^2 - 1, compute ∂N/∂x'],
    language: 'python'
  },
  {
    id: 'math302-t1-ex12',
    subjectId: 'math302',
    topicId: 'math302-topic-1',
    title: 'Solve Exact Equation',
    difficulty: 4,
    description: 'Solve the exact equation (2xy + 3)dx + (x^2 - 1)dy = 0 with y(0) = 2.',
    starterCode: `import numpy as np

def solve_exact(x):
    """
    Solve (2xy + 3)dx + (x^2 - 1)dy = 0 with y(0) = 2
    """
    pass`,
    solution: `import numpy as np

def solve_exact(x):
    """
    Solve (2xy + 3)dx + (x^2 - 1)dy = 0 with y(0) = 2
    Solution: x^2*y + 3x - y = C
    With y(0) = 2: C = -2
    Solving for y: y = (2 - 3x)/(x^2 - 1)
    """
    # Avoid division by zero at x = ±1
    if np.isclose(x**2, 1):
        return np.inf
    return (2 - 3*x) / (x**2 - 1)`,
    testCases: [
      { input: '0', expectedOutput: '-2.0', isHidden: false, description: 'Initial condition' },
      { input: '2', expectedOutput: '-1.3333', isHidden: false, description: 'x = 2' },
      { input: '-2', expectedOutput: '-2.6667', isHidden: false, description: 'x = -2' },
      { input: '0.5', expectedOutput: '0.6667', isHidden: true, description: 'Intermediate value' }
    ],
    hints: ['Find potential function F where ∂F/∂x = M and ∂F/∂y = N', 'Integrate M with respect to x: F = x^2*y + 3x + g(y)', 'Use ∂F/∂y = N to find g(y)'],
    language: 'python'
  },
  {
    id: 'math302-t1-ex13',
    subjectId: 'math302',
    topicId: 'math302-topic-1',
    title: 'Homogeneous Equation',
    difficulty: 4,
    description: 'Solve the homogeneous ODE dy/dx = (x + y)/x with y(1) = 1 using substitution v = y/x.',
    starterCode: `import numpy as np

def solve_homogeneous(x):
    """
    Solve dy/dx = (x + y)/x with y(1) = 1
    """
    pass`,
    solution: `import numpy as np

def solve_homogeneous(x):
    """
    Solve dy/dx = (x + y)/x with y(1) = 1
    Using v = y/x substitution
    Solution: y = x(ln|x| + 1)
    """
    return x * (np.log(np.abs(x)) + 1)`,
    testCases: [
      { input: '1', expectedOutput: '1.0', isHidden: false, description: 'Initial condition' },
      { input: '2', expectedOutput: '3.3863', isHidden: false, description: 'x = 2' },
      { input: 'np.e', expectedOutput: '5.4366', isHidden: false, description: 'x = e' },
      { input: '0.5', expectedOutput: '-0.1534', isHidden: true, description: 'x < 1' }
    ],
    hints: ['This is homogeneous since dy/dx = (x+y)/x = 1 + y/x', 'Substitute v = y/x, so y = vx and dy/dx = v + x dv/dx', 'Equation becomes v + x dv/dx = 1 + v'],
    language: 'python'
  },
  {
    id: 'math302-t1-ex14',
    subjectId: 'math302',
    topicId: 'math302-topic-1',
    title: 'Cooling/Heating Problem',
    difficulty: 5,
    description: 'Newtons law of cooling: dT/dt = -k(T - T_env). Solve for T(t) given T(0) = 90°C, T_env = 20°C, k = 0.1. Return T at t = 10.',
    starterCode: `import numpy as np

def newtons_cooling(t, T0=90, T_env=20, k=0.1):
    """
    Solve Newton's law of cooling
    dT/dt = -k(T - T_env)
    """
    pass`,
    solution: `import numpy as np

def newtons_cooling(t, T0=90, T_env=20, k=0.1):
    """
    Solve Newton's law of cooling
    dT/dt = -k(T - T_env)
    Solution: T = T_env + (T0 - T_env)e^(-kt)
    """
    return T_env + (T0 - T_env) * np.exp(-k * t)`,
    testCases: [
      { input: '0, 90, 20, 0.1', expectedOutput: '90.0', isHidden: false, description: 'Initial temperature' },
      { input: '10, 90, 20, 0.1', expectedOutput: '45.7237', isHidden: false, description: 't = 10' },
      { input: '20, 90, 20, 0.1', expectedOutput: '29.4630', isHidden: false, description: 't = 20' },
      { input: '100, 90, 20, 0.1', expectedOutput: '20.0003', isHidden: true, description: 'Approaches environment' }
    ],
    hints: ['This is a separable equation: dT/(T - T_env) = -k dt', 'Integrate both sides: ln|T - T_env| = -kt + C', 'Use initial condition T(0) = T0 to find C'],
    language: 'python'
  },
  {
    id: 'math302-t1-ex15',
    subjectId: 'math302',
    topicId: 'math302-topic-1',
    title: 'Mixing Problem',
    difficulty: 5,
    description: 'A tank has 100L of water with 10kg salt. Water with 0.5 kg/L salt enters at 5 L/min, mixture leaves at 5 L/min. Solve for salt amount S(t) at t = 20 min.',
    starterCode: `import numpy as np
from scipy.integrate import odeint

def mixing_problem(t_final):
    """
    Solve mixing problem: dS/dt = rate_in - rate_out
    rate_in = 0.5 * 5 = 2.5 kg/min
    rate_out = S/100 * 5 = S/20 kg/min
    S(0) = 10 kg
    """
    pass`,
    solution: `import numpy as np
from scipy.integrate import odeint

def mixing_problem(t_final):
    """
    Solve mixing problem: dS/dt = 2.5 - S/20
    S(0) = 10 kg
    Analytical: S = 50 - 40e^(-t/20)
    """
    def dSdt(S, t):
        return 2.5 - S/20

    S0 = 10
    t_span = np.linspace(0, t_final, 100)
    sol = odeint(dSdt, S0, t_span)

    return sol[-1, 0]`,
    testCases: [
      { input: '0', expectedOutput: '10.0', isHidden: false, description: 'Initial amount' },
      { input: '20', expectedOutput: '24.2642', isHidden: false, description: 't = 20 min' },
      { input: '40', expectedOutput: '34.6009', isHidden: false, description: 't = 40 min' },
      { input: '100', expectedOutput: '49.0066', isHidden: true, description: 'Approaches equilibrium' }
    ],
    hints: ['dS/dt = (concentration_in × flow_in) - (concentration_out × flow_out)', 'concentration_in = 0.5 kg/L, flow_in = 5 L/min', 'concentration_out = S/100 kg/L, flow_out = 5 L/min'],
    language: 'python'
  },
  {
    id: 'math302-t1-ex16',
    subjectId: 'math302',
    topicId: 'math302-topic-1',
    title: 'Autonomous Equation - Equilibria',
    difficulty: 5,
    description: 'For dy/dt = y(1-y)(y-2), find all equilibrium points and return them as a sorted list.',
    starterCode: `import numpy as np

def find_equilibria():
    """
    Find equilibrium points where dy/dt = 0
    For dy/dt = y(1-y)(y-2)
    """
    pass`,
    solution: `import numpy as np

def find_equilibria():
    """
    Find equilibrium points where dy/dt = 0
    y(1-y)(y-2) = 0
    Solutions: y = 0, y = 1, y = 2
    """
    return [0.0, 1.0, 2.0]`,
    testCases: [
      { input: '', expectedOutput: '[0.0, 1.0, 2.0]', isHidden: false, description: 'All equilibrium points' },
      { input: '', expectedOutput: '[0.0, 1.0, 2.0]', isHidden: false, description: 'Verify equilibria' }
    ],
    hints: ['Equilibrium points occur where dy/dt = 0', 'Factor: y(1-y)(y-2) = 0', 'Solve each factor equals zero'],
    language: 'python'
  }
];
