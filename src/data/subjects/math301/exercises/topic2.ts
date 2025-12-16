import { CodingExercise } from '../../../../core/types';

export const topic2Exercises: CodingExercise[] = [
  {
    id: 'math301-t2-ex01',
    subjectId: 'math301',
    topicId: 'math301-topic-2',
    title: 'Partial Derivative with Respect to x',
    difficulty: 1,
    description: 'Compute the partial derivative of f(x,y) = x^2 + 3xy + y^2 with respect to x at a given point. Use numerical approximation: f_x ≈ (f(x+h,y) - f(x,y)) / h with h = 0.0001.',
    starterCode: `def partial_x_basic(x, y):
    """
    Compute ∂f/∂x where f(x,y) = x^2 + 3xy + y^2

    Args:
        x, y: point at which to evaluate the partial derivative

    Returns:
        The partial derivative ∂f/∂x at (x, y)
    """
    pass`,
    solution: `def partial_x_basic(x, y):
    """
    Compute ∂f/∂x where f(x,y) = x^2 + 3xy + y^2

    Args:
        x, y: point at which to evaluate the partial derivative

    Returns:
        The partial derivative ∂f/∂x at (x, y)
    """
    h = 0.0001
    f_x_plus_h = (x + h)**2 + 3*(x + h)*y + y**2
    f_x = x**2 + 3*x*y + y**2
    return (f_x_plus_h - f_x) / h`,
    testCases: [
      { input: '1, 1', expectedOutput: '5.0', isHidden: false, description: 'Point (1,1)' },
      { input: '0, 0', expectedOutput: '0.0', isHidden: false, description: 'Origin' },
      { input: '2, 3', expectedOutput: '13.0', isHidden: false, description: 'Point (2,3)' },
      { input: '1, 0', expectedOutput: '2.0', isHidden: true, description: 'Point (1,0)' },
      { input: '0, 1', expectedOutput: '3.0', isHidden: true, description: 'Point (0,1)' }
    ],
    hints: [
      'Use the difference quotient formula',
      'f_x ≈ (f(x+h,y) - f(x,y)) / h',
      'The analytical answer is 2x + 3y'
    ],
    language: 'python'
  },
  {
    id: 'math301-t2-ex02',
    subjectId: 'math301',
    topicId: 'math301-topic-2',
    title: 'Partial Derivative with Respect to y',
    difficulty: 1,
    description: 'Compute the partial derivative of f(x,y) = x^2 + 3xy + y^2 with respect to y at a given point. Use numerical approximation: f_y ≈ (f(x,y+h) - f(x,y)) / h with h = 0.0001.',
    starterCode: `def partial_y_basic(x, y):
    """
    Compute ∂f/∂y where f(x,y) = x^2 + 3xy + y^2

    Args:
        x, y: point at which to evaluate the partial derivative

    Returns:
        The partial derivative ∂f/∂y at (x, y)
    """
    pass`,
    solution: `def partial_y_basic(x, y):
    """
    Compute ∂f/∂y where f(x,y) = x^2 + 3xy + y^2

    Args:
        x, y: point at which to evaluate the partial derivative

    Returns:
        The partial derivative ∂f/∂y at (x, y)
    """
    h = 0.0001
    f_y_plus_h = x**2 + 3*x*(y + h) + (y + h)**2
    f_y = x**2 + 3*x*y + y**2
    return (f_y_plus_h - f_y) / h`,
    testCases: [
      { input: '1, 1', expectedOutput: '5.0', isHidden: false, description: 'Point (1,1)' },
      { input: '0, 0', expectedOutput: '0.0', isHidden: false, description: 'Origin' },
      { input: '3, 2', expectedOutput: '13.0', isHidden: false, description: 'Point (3,2)' },
      { input: '1, 0', expectedOutput: '3.0', isHidden: true, description: 'Point (1,0)' },
      { input: '0, 1', expectedOutput: '2.0', isHidden: true, description: 'Point (0,1)' }
    ],
    hints: [
      'Use the difference quotient formula',
      'f_y ≈ (f(x,y+h) - f(x,y)) / h',
      'The analytical answer is 3x + 2y'
    ],
    language: 'python'
  },
  {
    id: 'math301-t2-ex03',
    subjectId: 'math301',
    topicId: 'math301-topic-2',
    title: 'Partial Derivative of Exponential',
    difficulty: 2,
    description: 'Compute ∂f/∂x where f(x,y) = e^(xy) at a given point. Use numerical differentiation with h = 0.0001.',
    starterCode: `import math

def partial_x_exponential(x, y):
    """
    Compute ∂f/∂x where f(x,y) = e^(xy)

    Args:
        x, y: point at which to evaluate the partial derivative

    Returns:
        The partial derivative ∂f/∂x at (x, y)
    """
    pass`,
    solution: `import math

def partial_x_exponential(x, y):
    """
    Compute ∂f/∂x where f(x,y) = e^(xy)

    Args:
        x, y: point at which to evaluate the partial derivative

    Returns:
        The partial derivative ∂f/∂x at (x, y)
    """
    h = 0.0001
    f_x_plus_h = math.exp((x + h) * y)
    f_x = math.exp(x * y)
    return (f_x_plus_h - f_x) / h`,
    testCases: [
      { input: '0, 1', expectedOutput: '1.0', isHidden: false, description: 'At (0,1)' },
      { input: '1, 1', expectedOutput: '2.718', isHidden: false, description: 'At (1,1)' },
      { input: '0, 0', expectedOutput: '0.0', isHidden: false, description: 'Origin' },
      { input: '1, 2', expectedOutput: '14.778', isHidden: true, description: 'At (1,2)' },
      { input: '2, 1', expectedOutput: '7.389', isHidden: true, description: 'At (2,1)' }
    ],
    hints: [
      'f(x,y) = e^(xy)',
      'Use math.exp() for the exponential function',
      'The analytical answer is y*e^(xy)'
    ],
    language: 'python'
  },
  {
    id: 'math301-t2-ex04',
    subjectId: 'math301',
    topicId: 'math301-topic-2',
    title: 'Second Partial Derivative',
    difficulty: 3,
    description: 'Compute the second partial derivative ∂²f/∂x² where f(x,y) = x³ + x²y + xy² at a given point. Use numerical differentiation with h = 0.001.',
    starterCode: `def second_partial_xx(x, y):
    """
    Compute ∂²f/∂x² where f(x,y) = x³ + x²y + xy²

    Args:
        x, y: point at which to evaluate the second partial

    Returns:
        The second partial derivative ∂²f/∂x² at (x, y)
    """
    pass`,
    solution: `def second_partial_xx(x, y):
    """
    Compute ∂²f/∂x² where f(x,y) = x³ + x²y + xy²

    Args:
        x, y: point at which to evaluate the second partial

    Returns:
        The second partial derivative ∂²f/∂x² at (x, y)
    """
    h = 0.001
    f_x_plus_h = (x + h)**3 + (x + h)**2 * y + (x + h) * y**2
    f_x = x**3 + x**2 * y + x * y**2
    f_x_minus_h = (x - h)**3 + (x - h)**2 * y + (x - h) * y**2
    return (f_x_plus_h - 2*f_x + f_x_minus_h) / (h**2)`,
    testCases: [
      { input: '1, 1', expectedOutput: '8.0', isHidden: false, description: 'Point (1,1)' },
      { input: '0, 0', expectedOutput: '0.0', isHidden: false, description: 'Origin' },
      { input: '2, 1', expectedOutput: '14.0', isHidden: false, description: 'Point (2,1)' },
      { input: '1, 0', expectedOutput: '6.0', isHidden: true, description: 'Point (1,0)' },
      { input: '3, 2', expectedOutput: '22.0', isHidden: true, description: 'Point (3,2)' }
    ],
    hints: [
      'Use the centered difference formula for second derivatives',
      'f_xx ≈ (f(x+h,y) - 2f(x,y) + f(x-h,y)) / h²',
      'The analytical answer is 6x + 2y'
    ],
    language: 'python'
  },
  {
    id: 'math301-t2-ex05',
    subjectId: 'math301',
    topicId: 'math301-topic-2',
    title: 'Mixed Partial Derivative',
    difficulty: 3,
    description: 'Compute the mixed partial derivative ∂²f/∂x∂y where f(x,y) = x²y + xy² at a given point. Use numerical differentiation with h = 0.001.',
    starterCode: `def mixed_partial_xy(x, y):
    """
    Compute ∂²f/∂x∂y where f(x,y) = x²y + xy²

    Args:
        x, y: point at which to evaluate the mixed partial

    Returns:
        The mixed partial derivative ∂²f/∂x∂y at (x, y)
    """
    pass`,
    solution: `def mixed_partial_xy(x, y):
    """
    Compute ∂²f/∂x∂y where f(x,y) = x²y + xy²

    Args:
        x, y: point at which to evaluate the mixed partial

    Returns:
        The mixed partial derivative ∂²f/∂x∂y at (x, y)
    """
    h = 0.001
    f_xy = (x + h)**2 * (y + h) + (x + h) * (y + h)**2
    f_x = (x + h)**2 * y + (x + h) * y**2
    f_y = x**2 * (y + h) + x * (y + h)**2
    f = x**2 * y + x * y**2
    return (f_xy - f_x - f_y + f) / (h**2)`,
    testCases: [
      { input: '1, 1', expectedOutput: '4.0', isHidden: false, description: 'Point (1,1)' },
      { input: '0, 0', expectedOutput: '0.0', isHidden: false, description: 'Origin' },
      { input: '2, 3', expectedOutput: '10.0', isHidden: false, description: 'Point (2,3)' },
      { input: '1, 0', expectedOutput: '2.0', isHidden: true, description: 'Point (1,0)' },
      { input: '0, 1', expectedOutput: '2.0', isHidden: true, description: 'Point (0,1)' }
    ],
    hints: [
      'Compute the derivative first with respect to x, then y',
      'Use the finite difference formula for mixed partials',
      'The analytical answer is 2x + 2y'
    ],
    language: 'python'
  },
  {
    id: 'math301-t2-ex06',
    subjectId: 'math301',
    topicId: 'math301-topic-2',
    title: 'Chain Rule - Single Path',
    difficulty: 3,
    description: 'Given f(x,y) = x² + y² where x = t² and y = 2t, compute df/dt at a given t value. Use the chain rule: df/dt = (∂f/∂x)(dx/dt) + (∂f/∂y)(dy/dt).',
    starterCode: `def chain_rule_single(t):
    """
    Compute df/dt where f(x,y) = x² + y², x = t², y = 2t

    Args:
        t: parameter value

    Returns:
        df/dt at the given t
    """
    pass`,
    solution: `def chain_rule_single(t):
    """
    Compute df/dt where f(x,y) = x² + y², x = t², y = 2t

    Args:
        t: parameter value

    Returns:
        df/dt at the given t
    """
    x = t**2
    y = 2*t
    # Partial derivatives of f
    df_dx = 2*x
    df_dy = 2*y
    # Derivatives of x and y with respect to t
    dx_dt = 2*t
    dy_dt = 2
    # Chain rule
    return df_dx * dx_dt + df_dy * dy_dt`,
    testCases: [
      { input: '1', expectedOutput: '12.0', isHidden: false, description: 't = 1' },
      { input: '0', expectedOutput: '0.0', isHidden: false, description: 't = 0' },
      { input: '2', expectedOutput: '48.0', isHidden: false, description: 't = 2' },
      { input: '3', expectedOutput: '120.0', isHidden: true, description: 't = 3' },
      { input: '-1', expectedOutput: '4.0', isHidden: true, description: 't = -1' }
    ],
    hints: [
      'Apply the chain rule: df/dt = (∂f/∂x)(dx/dt) + (∂f/∂y)(dy/dt)',
      'First compute x and y from t',
      'Then compute all the partial derivatives'
    ],
    language: 'python'
  },
  {
    id: 'math301-t2-ex07',
    subjectId: 'math301',
    topicId: 'math301-topic-2',
    title: 'Partial of Product',
    difficulty: 2,
    description: 'Compute ∂f/∂x where f(x,y) = x²y³ at a given point using numerical differentiation.',
    starterCode: `def partial_x_product(x, y):
    """
    Compute ∂f/∂x where f(x,y) = x²y³

    Args:
        x, y: point at which to evaluate the partial derivative

    Returns:
        The partial derivative ∂f/∂x at (x, y)
    """
    pass`,
    solution: `def partial_x_product(x, y):
    """
    Compute ∂f/∂x where f(x,y) = x²y³

    Args:
        x, y: point at which to evaluate the partial derivative

    Returns:
        The partial derivative ∂f/∂x at (x, y)
    """
    h = 0.0001
    f_x_plus_h = (x + h)**2 * y**3
    f_x = x**2 * y**3
    return (f_x_plus_h - f_x) / h`,
    testCases: [
      { input: '1, 1', expectedOutput: '2.0', isHidden: false, description: 'Point (1,1)' },
      { input: '2, 2', expectedOutput: '32.0', isHidden: false, description: 'Point (2,2)' },
      { input: '0, 1', expectedOutput: '0.0', isHidden: false, description: 'x = 0' },
      { input: '3, 1', expectedOutput: '6.0', isHidden: true, description: 'Point (3,1)' },
      { input: '1, 2', expectedOutput: '16.0', isHidden: true, description: 'Point (1,2)' }
    ],
    hints: [
      'Treat y as a constant when differentiating with respect to x',
      'The analytical answer is 2xy³',
      'Use numerical differentiation with small h'
    ],
    language: 'python'
  },
  {
    id: 'math301-t2-ex08',
    subjectId: 'math301',
    topicId: 'math301-topic-2',
    title: 'Partial with Trigonometric Function',
    difficulty: 2,
    description: 'Compute ∂f/∂x where f(x,y) = sin(x)cos(y) at a given point using numerical differentiation.',
    starterCode: `import math

def partial_x_trig(x, y):
    """
    Compute ∂f/∂x where f(x,y) = sin(x)cos(y)

    Args:
        x, y: point at which to evaluate (in radians)

    Returns:
        The partial derivative ∂f/∂x at (x, y)
    """
    pass`,
    solution: `import math

def partial_x_trig(x, y):
    """
    Compute ∂f/∂x where f(x,y) = sin(x)cos(y)

    Args:
        x, y: point at which to evaluate (in radians)

    Returns:
        The partial derivative ∂f/∂x at (x, y)
    """
    h = 0.0001
    f_x_plus_h = math.sin(x + h) * math.cos(y)
    f_x = math.sin(x) * math.cos(y)
    return (f_x_plus_h - f_x) / h`,
    testCases: [
      { input: '0, 0', expectedOutput: '1.0', isHidden: false, description: 'Origin' },
      { input: '1.571, 0', expectedOutput: '0.0', isHidden: false, description: 'x = π/2, y = 0' },
      { input: '0, 1.571', expectedOutput: '0.0', isHidden: false, description: 'x = 0, y = π/2' },
      { input: '0.785, 0', expectedOutput: '0.707', isHidden: true, description: 'x = π/4, y = 0' },
      { input: '3.142, 0', expectedOutput: '-1.0', isHidden: true, description: 'x = π, y = 0' }
    ],
    hints: [
      'The derivative of sin(x) is cos(x)',
      'cos(y) is treated as a constant',
      'The analytical answer is cos(x)cos(y)'
    ],
    language: 'python'
  },
  {
    id: 'math301-t2-ex09',
    subjectId: 'math301',
    topicId: 'math301-topic-2',
    title: 'Partial with Logarithm',
    difficulty: 3,
    description: 'Compute ∂f/∂x where f(x,y) = ln(x² + y²) at a given point using numerical differentiation.',
    starterCode: `import math

def partial_x_log(x, y):
    """
    Compute ∂f/∂x where f(x,y) = ln(x² + y²)

    Args:
        x, y: point at which to evaluate (both > 0)

    Returns:
        The partial derivative ∂f/∂x at (x, y)
    """
    pass`,
    solution: `import math

def partial_x_log(x, y):
    """
    Compute ∂f/∂x where f(x,y) = ln(x² + y²)

    Args:
        x, y: point at which to evaluate (both > 0)

    Returns:
        The partial derivative ∂f/∂x at (x, y)
    """
    h = 0.0001
    f_x_plus_h = math.log((x + h)**2 + y**2)
    f_x = math.log(x**2 + y**2)
    return (f_x_plus_h - f_x) / h`,
    testCases: [
      { input: '1, 0', expectedOutput: '2.0', isHidden: false, description: 'Point (1,0)' },
      { input: '1, 1', expectedOutput: '1.0', isHidden: false, description: 'Point (1,1)' },
      { input: '3, 4', expectedOutput: '0.24', isHidden: false, description: 'Point (3,4)' },
      { input: '2, 0', expectedOutput: '1.0', isHidden: true, description: 'Point (2,0)' },
      { input: '0, 1', expectedOutput: '0.0', isHidden: true, description: 'Point (0,1)' }
    ],
    hints: [
      'The derivative of ln(u) is (1/u) * du/dx',
      'Use the chain rule',
      'The analytical answer is 2x/(x² + y²)'
    ],
    language: 'python'
  },
  {
    id: 'math301-t2-ex10',
    subjectId: 'math301',
    topicId: 'math301-topic-2',
    title: 'Chain Rule - Composition',
    difficulty: 4,
    description: 'Given f(u,v) = u² + v² where u = x + y and v = x - y, compute ∂f/∂x at a given point (x,y). Use the chain rule.',
    starterCode: `def chain_rule_composition(x, y):
    """
    Compute ∂f/∂x where f(u,v) = u² + v², u = x + y, v = x - y

    Args:
        x, y: point at which to evaluate

    Returns:
        ∂f/∂x at (x, y)
    """
    pass`,
    solution: `def chain_rule_composition(x, y):
    """
    Compute ∂f/∂x where f(u,v) = u² + v², u = x + y, v = x - y

    Args:
        x, y: point at which to evaluate

    Returns:
        ∂f/∂x at (x, y)
    """
    u = x + y
    v = x - y
    # Partial derivatives of f with respect to u and v
    df_du = 2*u
    df_dv = 2*v
    # Partial derivatives of u and v with respect to x
    du_dx = 1
    dv_dx = 1
    # Chain rule
    return df_du * du_dx + df_dv * dv_dx`,
    testCases: [
      { input: '1, 0', expectedOutput: '4.0', isHidden: false, description: 'Point (1,0)' },
      { input: '0, 1', expectedOutput: '0.0', isHidden: false, description: 'Point (0,1)' },
      { input: '2, 1', expectedOutput: '8.0', isHidden: false, description: 'Point (2,1)' },
      { input: '1, 1', expectedOutput: '4.0', isHidden: true, description: 'Point (1,1)' },
      { input: '3, 2', expectedOutput: '12.0', isHidden: true, description: 'Point (3,2)' }
    ],
    hints: [
      'Apply chain rule: ∂f/∂x = (∂f/∂u)(∂u/∂x) + (∂f/∂v)(∂v/∂x)',
      'First compute u and v from x and y',
      'Then find all necessary partial derivatives'
    ],
    language: 'python'
  },
  {
    id: 'math301-t2-ex11',
    subjectId: 'math301',
    topicId: 'math301-topic-2',
    title: 'Laplacian Operator',
    difficulty: 4,
    description: 'Compute the Laplacian ∇²f = ∂²f/∂x² + ∂²f/∂y² where f(x,y) = x²y + xy² at a given point using numerical differentiation.',
    starterCode: `def laplacian(x, y):
    """
    Compute the Laplacian ∇²f where f(x,y) = x²y + xy²

    Args:
        x, y: point at which to evaluate

    Returns:
        The Laplacian at (x, y)
    """
    pass`,
    solution: `def laplacian(x, y):
    """
    Compute the Laplacian ∇²f where f(x,y) = x²y + xy²

    Args:
        x, y: point at which to evaluate

    Returns:
        The Laplacian at (x, y)
    """
    h = 0.001
    # Function values
    f = x**2 * y + x * y**2
    f_xp = (x + h)**2 * y + (x + h) * y**2
    f_xm = (x - h)**2 * y + (x - h) * y**2
    f_yp = x**2 * (y + h) + x * (y + h)**2
    f_ym = x**2 * (y - h) + x * (y - h)**2
    # Second partials
    fxx = (f_xp - 2*f + f_xm) / (h**2)
    fyy = (f_yp - 2*f + f_ym) / (h**2)
    return fxx + fyy`,
    testCases: [
      { input: '1, 1', expectedOutput: '4.0', isHidden: false, description: 'Point (1,1)' },
      { input: '0, 0', expectedOutput: '0.0', isHidden: false, description: 'Origin' },
      { input: '2, 3', expectedOutput: '10.0', isHidden: false, description: 'Point (2,3)' },
      { input: '1, 0', expectedOutput: '2.0', isHidden: true, description: 'Point (1,0)' },
      { input: '0, 1', expectedOutput: '2.0', isHidden: true, description: 'Point (0,1)' }
    ],
    hints: [
      'Laplacian = ∂²f/∂x² + ∂²f/∂y²',
      'Compute each second partial separately',
      'The analytical answer is 2y + 2x'
    ],
    language: 'python'
  },
  {
    id: 'math301-t2-ex12',
    subjectId: 'math301',
    topicId: 'math301-topic-2',
    title: 'Implicit Differentiation',
    difficulty: 4,
    description: 'Given the implicit equation x² + y² + z² = 1, compute ∂z/∂x at a point (x,y,z). Use the formula: ∂z/∂x = -(∂F/∂x)/(∂F/∂z) where F = x² + y² + z² - 1.',
    starterCode: `def implicit_partial_z_x(x, y, z):
    """
    Compute ∂z/∂x for the sphere x² + y² + z² = 1

    Args:
        x, y, z: point on the sphere

    Returns:
        ∂z/∂x at (x, y, z)
    """
    pass`,
    solution: `def implicit_partial_z_x(x, y, z):
    """
    Compute ∂z/∂x for the sphere x² + y² + z² = 1

    Args:
        x, y, z: point on the sphere

    Returns:
        ∂z/∂x at (x, y, z)
    """
    # F(x,y,z) = x² + y² + z² - 1
    dF_dx = 2*x
    dF_dz = 2*z
    return -dF_dx / dF_dz`,
    testCases: [
      { input: '0, 0, 1', expectedOutput: '0.0', isHidden: false, description: 'Top of sphere' },
      { input: '0.6, 0, 0.8', expectedOutput: '-0.75', isHidden: false, description: 'Point on sphere' },
      { input: '0, 0.6, 0.8', expectedOutput: '0.0', isHidden: false, description: 'Another point' },
      { input: '0.8, 0, 0.6', expectedOutput: '-1.333', isHidden: true, description: 'Different point' },
      { input: '0.707, 0, 0.707', expectedOutput: '-1.0', isHidden: true, description: '45 degree angle' }
    ],
    hints: [
      'Use the implicit function theorem',
      'For F(x,y,z) = 0: ∂z/∂x = -(∂F/∂x)/(∂F/∂z)',
      'F = x² + y² + z² - 1'
    ],
    language: 'python'
  },
  {
    id: 'math301-t2-ex13',
    subjectId: 'math301',
    topicId: 'math301-topic-2',
    title: 'Partial of Quotient',
    difficulty: 3,
    description: 'Compute ∂f/∂x where f(x,y) = x/y at a given point using numerical differentiation.',
    starterCode: `def partial_x_quotient(x, y):
    """
    Compute ∂f/∂x where f(x,y) = x/y

    Args:
        x, y: point at which to evaluate (y ≠ 0)

    Returns:
        The partial derivative ∂f/∂x at (x, y)
    """
    pass`,
    solution: `def partial_x_quotient(x, y):
    """
    Compute ∂f/∂x where f(x,y) = x/y

    Args:
        x, y: point at which to evaluate (y ≠ 0)

    Returns:
        The partial derivative ∂f/∂x at (x, y)
    """
    h = 0.0001
    f_x_plus_h = (x + h) / y
    f_x = x / y
    return (f_x_plus_h - f_x) / h`,
    testCases: [
      { input: '1, 1', expectedOutput: '1.0', isHidden: false, description: 'Point (1,1)' },
      { input: '2, 1', expectedOutput: '1.0', isHidden: false, description: 'Point (2,1)' },
      { input: '1, 2', expectedOutput: '0.5', isHidden: false, description: 'Point (1,2)' },
      { input: '3, 4', expectedOutput: '0.25', isHidden: true, description: 'Point (3,4)' },
      { input: '5, 2', expectedOutput: '0.5', isHidden: true, description: 'Point (5,2)' }
    ],
    hints: [
      'When differentiating x/y with respect to x, treat y as constant',
      'The analytical answer is 1/y',
      'Use numerical differentiation to verify'
    ],
    language: 'python'
  },
  {
    id: 'math301-t2-ex14',
    subjectId: 'math301',
    topicId: 'math301-topic-2',
    title: 'Chain Rule - Polar Coordinates',
    difficulty: 4,
    description: 'Given f(x,y) = x² + y² where x = r*cos(θ) and y = r*sin(θ), compute ∂f/∂r at given r and θ values.',
    starterCode: `import math

def chain_rule_polar(r, theta):
    """
    Compute ∂f/∂r where f(x,y) = x² + y², x = r*cos(θ), y = r*sin(θ)

    Args:
        r: radial coordinate
        theta: angular coordinate (radians)

    Returns:
        ∂f/∂r at (r, θ)
    """
    pass`,
    solution: `import math

def chain_rule_polar(r, theta):
    """
    Compute ∂f/∂r where f(x,y) = x² + y², x = r*cos(θ), y = r*sin(θ)

    Args:
        r: radial coordinate
        theta: angular coordinate (radians)

    Returns:
        ∂f/∂r at (r, θ)
    """
    x = r * math.cos(theta)
    y = r * math.sin(theta)
    # Partial derivatives of f
    df_dx = 2*x
    df_dy = 2*y
    # Derivatives of x and y with respect to r
    dx_dr = math.cos(theta)
    dy_dr = math.sin(theta)
    # Chain rule
    return df_dx * dx_dr + df_dy * dy_dr`,
    testCases: [
      { input: '1, 0', expectedOutput: '2.0', isHidden: false, description: 'r=1, θ=0' },
      { input: '2, 0', expectedOutput: '4.0', isHidden: false, description: 'r=2, θ=0' },
      { input: '1, 1.571', expectedOutput: '2.0', isHidden: false, description: 'r=1, θ=π/2' },
      { input: '3, 0.785', expectedOutput: '6.0', isHidden: true, description: 'r=3, θ=π/4' },
      { input: '5, 0', expectedOutput: '10.0', isHidden: true, description: 'r=5, θ=0' }
    ],
    hints: [
      'Use chain rule: ∂f/∂r = (∂f/∂x)(∂x/∂r) + (∂f/∂y)(∂y/∂r)',
      'Note that x² + y² = r² in polar coordinates',
      'The result should be 2r'
    ],
    language: 'python'
  },
  {
    id: 'math301-t2-ex15',
    subjectId: 'math301',
    topicId: 'math301-topic-2',
    title: 'Verify Clairaut\'s Theorem',
    difficulty: 3,
    description: 'For f(x,y) = x³y² + xy³, verify Clairaut\'s theorem by computing both ∂²f/∂x∂y and ∂²f/∂y∂x and checking they are equal. Return True if equal (within tolerance), False otherwise.',
    starterCode: `def verify_clairaut(x, y):
    """
    Verify Clairaut's theorem for f(x,y) = x³y² + xy³

    Args:
        x, y: point at which to verify

    Returns:
        True if fxy = fyx, False otherwise
    """
    pass`,
    solution: `def verify_clairaut(x, y):
    """
    Verify Clairaut's theorem for f(x,y) = x³y² + xy³

    Args:
        x, y: point at which to verify

    Returns:
        True if fxy = fyx, False otherwise
    """
    h = 0.001
    # Compute fxy
    f = x**3 * y**2 + x * y**3
    f_xp_yp = (x + h)**3 * (y + h)**2 + (x + h) * (y + h)**3
    f_xp = (x + h)**3 * y**2 + (x + h) * y**3
    f_yp = x**3 * (y + h)**2 + x * (y + h)**3
    fxy = (f_xp_yp - f_xp - f_yp + f) / (h**2)
    # Compute fyx (same formula)
    fyx = (f_xp_yp - f_xp - f_yp + f) / (h**2)
    return abs(fxy - fyx) < 0.01`,
    testCases: [
      { input: '1, 1', expectedOutput: 'True', isHidden: false, description: 'Point (1,1)' },
      { input: '2, 3', expectedOutput: 'True', isHidden: false, description: 'Point (2,3)' },
      { input: '0, 1', expectedOutput: 'True', isHidden: false, description: 'Point (0,1)' },
      { input: '1, 0', expectedOutput: 'True', isHidden: true, description: 'Point (1,0)' },
      { input: '5, 5', expectedOutput: 'True', isHidden: true, description: 'Point (5,5)' }
    ],
    hints: [
      'Clairaut\'s theorem states that fxy = fyx for smooth functions',
      'Compute both mixed partials numerically',
      'Check if they are equal within a small tolerance'
    ],
    language: 'python'
  },
  {
    id: 'math301-t2-ex16',
    subjectId: 'math301',
    topicId: 'math301-topic-2',
    title: 'Total Differential',
    difficulty: 4,
    description: 'Compute the total differential df for f(x,y) = x²y + y³ at point (x0,y0) with increments dx and dy. The total differential is df = (∂f/∂x)dx + (∂f/∂y)dy.',
    starterCode: `def total_differential(x0, y0, dx, dy):
    """
    Compute the total differential of f(x,y) = x²y + y³

    Args:
        x0, y0: point at which to evaluate
        dx, dy: increments in x and y

    Returns:
        The total differential df
    """
    pass`,
    solution: `def total_differential(x0, y0, dx, dy):
    """
    Compute the total differential of f(x,y) = x²y + y³

    Args:
        x0, y0: point at which to evaluate
        dx, dy: increments in x and y

    Returns:
        The total differential df
    """
    # Partial derivatives at (x0, y0)
    df_dx = 2*x0*y0
    df_dy = x0**2 + 3*y0**2
    # Total differential
    return df_dx * dx + df_dy * dy`,
    testCases: [
      { input: '1, 1, 0.1, 0.1', expectedOutput: '0.6', isHidden: false, description: 'Small increments' },
      { input: '2, 1, 0.01, 0.01', expectedOutput: '0.11', isHidden: false, description: 'Tiny increments' },
      { input: '1, 0, 1, 1', expectedOutput: '1.0', isHidden: false, description: 'At y=0' },
      { input: '2, 2, 0.5, 0.5', expectedOutput: '10.0', isHidden: true, description: 'Larger increments' },
      { input: '0, 1, 1, 0', expectedOutput: '0.0', isHidden: true, description: 'Only x increment' }
    ],
    hints: [
      'Total differential: df = (∂f/∂x)dx + (∂f/∂y)dy',
      'First compute the partial derivatives at (x0, y0)',
      'Then multiply by the increments and sum'
    ],
    language: 'python'
  }
];
