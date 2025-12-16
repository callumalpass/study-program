import { CodingExercise } from '../../../../core/types';

export const topic3Exercises: CodingExercise[] = [
  {
    id: 'math301-t3-ex01',
    subjectId: 'math301',
    topicId: 'math301-topic-3',
    title: 'Gradient Vector - Basic',
    difficulty: 2,
    description: 'Compute the gradient vector ∇f of f(x,y) = x² + y² at a given point. The gradient is [∂f/∂x, ∂f/∂y]. Return as a tuple (gx, gy).',
    starterCode: `def gradient_basic(x, y):
    """
    Compute ∇f where f(x,y) = x² + y²

    Args:
        x, y: point at which to evaluate the gradient

    Returns:
        Tuple (gx, gy) representing the gradient vector
    """
    pass`,
    solution: `def gradient_basic(x, y):
    """
    Compute ∇f where f(x,y) = x² + y²

    Args:
        x, y: point at which to evaluate the gradient

    Returns:
        Tuple (gx, gy) representing the gradient vector
    """
    # Gradient components
    gx = 2*x
    gy = 2*y
    return (gx, gy)`,
    testCases: [
      { input: '1, 1', expectedOutput: '(2, 2)', isHidden: false, description: 'Point (1,1)' },
      { input: '0, 0', expectedOutput: '(0, 0)', isHidden: false, description: 'Origin' },
      { input: '3, 4', expectedOutput: '(6, 8)', isHidden: false, description: 'Point (3,4)' },
      { input: '2, 0', expectedOutput: '(4, 0)', isHidden: true, description: 'On x-axis' },
      { input: '0, 5', expectedOutput: '(0, 10)', isHidden: true, description: 'On y-axis' }
    ],
    hints: [
      'The gradient is the vector of partial derivatives',
      '∇f = [∂f/∂x, ∂f/∂y]',
      'For f = x² + y²: ∂f/∂x = 2x, ∂f/∂y = 2y'
    ],
    language: 'python'
  },
  {
    id: 'math301-t3-ex02',
    subjectId: 'math301',
    topicId: 'math301-topic-3',
    title: 'Gradient Magnitude',
    difficulty: 2,
    description: 'Compute the magnitude of the gradient vector |∇f| where f(x,y) = x² + 2xy + y² at a given point.',
    starterCode: `import math

def gradient_magnitude(x, y):
    """
    Compute |∇f| where f(x,y) = x² + 2xy + y²

    Args:
        x, y: point at which to evaluate

    Returns:
        The magnitude of the gradient
    """
    pass`,
    solution: `import math

def gradient_magnitude(x, y):
    """
    Compute |∇f| where f(x,y) = x² + 2xy + y²

    Args:
        x, y: point at which to evaluate

    Returns:
        The magnitude of the gradient
    """
    # Gradient components
    gx = 2*x + 2*y
    gy = 2*x + 2*y
    # Magnitude
    return math.sqrt(gx**2 + gy**2)`,
    testCases: [
      { input: '1, 1', expectedOutput: '5.657', isHidden: false, description: 'Point (1,1)' },
      { input: '0, 0', expectedOutput: '0.0', isHidden: false, description: 'Origin' },
      { input: '1, 0', expectedOutput: '2.828', isHidden: false, description: 'Point (1,0)' },
      { input: '2, 1', expectedOutput: '8.485', isHidden: true, description: 'Point (2,1)' },
      { input: '0, 1', expectedOutput: '2.828', isHidden: true, description: 'Point (0,1)' }
    ],
    hints: [
      'First compute the gradient components',
      'Then find the magnitude: |∇f| = sqrt(gx² + gy²)',
      '∂f/∂x = 2x + 2y, ∂f/∂y = 2x + 2y'
    ],
    language: 'python'
  },
  {
    id: 'math301-t3-ex03',
    subjectId: 'math301',
    topicId: 'math301-topic-3',
    title: 'Directional Derivative',
    difficulty: 3,
    description: 'Compute the directional derivative of f(x,y) = x² + y² at point (x,y) in the direction of unit vector (ux, uy). Use D_u f = ∇f · u.',
    starterCode: `def directional_derivative(x, y, ux, uy):
    """
    Compute the directional derivative of f(x,y) = x² + y² in direction (ux, uy)

    Args:
        x, y: point at which to evaluate
        ux, uy: unit direction vector

    Returns:
        The directional derivative
    """
    pass`,
    solution: `def directional_derivative(x, y, ux, uy):
    """
    Compute the directional derivative of f(x,y) = x² + y² in direction (ux, uy)

    Args:
        x, y: point at which to evaluate
        ux, uy: unit direction vector

    Returns:
        The directional derivative
    """
    # Gradient at (x, y)
    gx = 2*x
    gy = 2*y
    # Directional derivative = gradient · direction
    return gx * ux + gy * uy`,
    testCases: [
      { input: '1, 0, 1, 0', expectedOutput: '2.0', isHidden: false, description: 'Direction along x-axis' },
      { input: '0, 1, 0, 1', expectedOutput: '2.0', isHidden: false, description: 'Direction along y-axis' },
      { input: '1, 1, 0.707, 0.707', expectedOutput: '2.828', isHidden: false, description: 'Diagonal direction' },
      { input: '2, 3, 1, 0', expectedOutput: '4.0', isHidden: true, description: 'Point (2,3), x-direction' },
      { input: '3, 4, 0, 1', expectedOutput: '8.0', isHidden: true, description: 'Point (3,4), y-direction' }
    ],
    hints: [
      'Directional derivative = ∇f · u',
      'Compute the gradient first',
      'Then take the dot product with the direction vector'
    ],
    language: 'python'
  },
  {
    id: 'math301-t3-ex04',
    subjectId: 'math301',
    topicId: 'math301-topic-3',
    title: 'Maximum Directional Derivative',
    difficulty: 3,
    description: 'Find the maximum rate of change (maximum directional derivative) of f(x,y) = x² + y² at a given point. The maximum is |∇f|.',
    starterCode: `import math

def max_directional_derivative(x, y):
    """
    Compute the maximum directional derivative of f(x,y) = x² + y²

    Args:
        x, y: point at which to evaluate

    Returns:
        The maximum directional derivative
    """
    pass`,
    solution: `import math

def max_directional_derivative(x, y):
    """
    Compute the maximum directional derivative of f(x,y) = x² + y²

    Args:
        x, y: point at which to evaluate

    Returns:
        The maximum directional derivative
    """
    # Gradient components
    gx = 2*x
    gy = 2*y
    # Maximum directional derivative = |∇f|
    return math.sqrt(gx**2 + gy**2)`,
    testCases: [
      { input: '1, 0', expectedOutput: '2.0', isHidden: false, description: 'Point (1,0)' },
      { input: '0, 1', expectedOutput: '2.0', isHidden: false, description: 'Point (0,1)' },
      { input: '3, 4', expectedOutput: '10.0', isHidden: false, description: 'Point (3,4)' },
      { input: '1, 1', expectedOutput: '2.828', isHidden: true, description: 'Point (1,1)' },
      { input: '5, 12', expectedOutput: '26.0', isHidden: true, description: 'Point (5,12)' }
    ],
    hints: [
      'The maximum directional derivative occurs in the direction of the gradient',
      'Its value is the magnitude of the gradient',
      'max(D_u f) = |∇f|'
    ],
    language: 'python'
  },
  {
    id: 'math301-t3-ex05',
    subjectId: 'math301',
    topicId: 'math301-topic-3',
    title: 'Direction of Steepest Ascent',
    difficulty: 3,
    description: 'Find the unit vector in the direction of steepest ascent for f(x,y) = x²y at a given point. This is the normalized gradient. Return as tuple (ux, uy).',
    starterCode: `import math

def steepest_ascent_direction(x, y):
    """
    Find the unit vector in the direction of steepest ascent for f(x,y) = x²y

    Args:
        x, y: point at which to evaluate

    Returns:
        Tuple (ux, uy) representing the unit direction vector
    """
    pass`,
    solution: `import math

def steepest_ascent_direction(x, y):
    """
    Find the unit vector in the direction of steepest ascent for f(x,y) = x²y

    Args:
        x, y: point at which to evaluate

    Returns:
        Tuple (ux, uy) representing the unit direction vector
    """
    # Gradient components
    gx = 2*x*y
    gy = x**2
    # Magnitude
    mag = math.sqrt(gx**2 + gy**2)
    if mag == 0:
        return (0.0, 0.0)
    # Unit vector
    return (gx / mag, gy / mag)`,
    testCases: [
      { input: '1, 1', expectedOutput: '(0.894, 0.447)', isHidden: false, description: 'Point (1,1)' },
      { input: '2, 1', expectedOutput: '(0.894, 0.447)', isHidden: false, description: 'Point (2,1)' },
      { input: '1, 2', expectedOutput: '(0.970, 0.243)', isHidden: false, description: 'Point (1,2)' },
      { input: '0, 1', expectedOutput: '(0.0, 0.0)', isHidden: true, description: 'Zero gradient' },
      { input: '3, 1', expectedOutput: '(0.894, 0.447)', isHidden: true, description: 'Point (3,1)' }
    ],
    hints: [
      'The direction of steepest ascent is the gradient direction',
      'Normalize the gradient to get a unit vector',
      'unit_vector = ∇f / |∇f|'
    ],
    language: 'python'
  },
  {
    id: 'math301-t3-ex06',
    subjectId: 'math301',
    topicId: 'math301-topic-3',
    title: 'Tangent Plane Equation - Z coefficient',
    difficulty: 3,
    description: 'For the surface z = x² + y², find the z-intercept of the tangent plane at point (x0, y0, z0). The tangent plane is z - z0 = fx(x0,y0)(x - x0) + fy(x0,y0)(y - y0). Return the value of z when x=0 and y=0.',
    starterCode: `def tangent_plane_z_intercept(x0, y0):
    """
    Find the z-intercept of the tangent plane to z = x² + y² at (x0, y0, z0)

    Args:
        x0, y0: point of tangency

    Returns:
        The z-intercept of the tangent plane
    """
    pass`,
    solution: `def tangent_plane_z_intercept(x0, y0):
    """
    Find the z-intercept of the tangent plane to z = x² + y² at (x0, y0, z0)

    Args:
        x0, y0: point of tangency

    Returns:
        The z-intercept of the tangent plane
    """
    z0 = x0**2 + y0**2
    fx = 2*x0
    fy = 2*y0
    # Tangent plane: z = z0 + fx(x - x0) + fy(y - y0)
    # At x=0, y=0: z = z0 - fx*x0 - fy*y0
    return z0 - fx*x0 - fy*y0`,
    testCases: [
      { input: '1, 0', expectedOutput: '-1.0', isHidden: false, description: 'Point (1,0)' },
      { input: '0, 1', expectedOutput: '-1.0', isHidden: false, description: 'Point (0,1)' },
      { input: '1, 1', expectedOutput: '-2.0', isHidden: false, description: 'Point (1,1)' },
      { input: '2, 0', expectedOutput: '-4.0', isHidden: true, description: 'Point (2,0)' },
      { input: '1, 2', expectedOutput: '-5.0', isHidden: true, description: 'Point (1,2)' }
    ],
    hints: [
      'Tangent plane equation: z = z0 + fx(x - x0) + fy(y - y0)',
      'Substitute x=0, y=0 to find z-intercept',
      'z0 = x0² + y0², fx = 2x0, fy = 2y0'
    ],
    language: 'python'
  },
  {
    id: 'math301-t3-ex07',
    subjectId: 'math301',
    topicId: 'math301-topic-3',
    title: 'Linear Approximation',
    difficulty: 3,
    description: 'Use the linear approximation (tangent plane) to estimate f(x,y) = x² + y² at point (x,y) given the base point (x0,y0). L(x,y) = f(x0,y0) + fx(x0,y0)(x-x0) + fy(x0,y0)(y-y0).',
    starterCode: `def linear_approximation(x0, y0, x, y):
    """
    Compute the linear approximation of f(x,y) = x² + y² at (x,y) using base point (x0,y0)

    Args:
        x0, y0: base point for approximation
        x, y: point at which to approximate

    Returns:
        The linear approximation L(x,y)
    """
    pass`,
    solution: `def linear_approximation(x0, y0, x, y):
    """
    Compute the linear approximation of f(x,y) = x² + y² at (x,y) using base point (x0,y0)

    Args:
        x0, y0: base point for approximation
        x, y: point at which to approximate

    Returns:
        The linear approximation L(x,y)
    """
    f0 = x0**2 + y0**2
    fx = 2*x0
    fy = 2*y0
    return f0 + fx*(x - x0) + fy*(y - y0)`,
    testCases: [
      { input: '1, 1, 1.1, 1.1', expectedOutput: '2.4', isHidden: false, description: 'Near (1,1)' },
      { input: '2, 0, 2.1, 0', expectedOutput: '4.4', isHidden: false, description: 'Near (2,0)' },
      { input: '0, 3, 0, 3.1', expectedOutput: '9.6', isHidden: false, description: 'Near (0,3)' },
      { input: '1, 0, 1.5, 0', expectedOutput: '3.0', isHidden: true, description: 'Larger step from (1,0)' },
      { input: '0, 0, 0.1, 0.1', expectedOutput: '0.0', isHidden: true, description: 'From origin' }
    ],
    hints: [
      'Linear approximation uses the tangent plane',
      'L(x,y) = f(x0,y0) + fx(x-x0) + fy(y-y0)',
      'This is the first-order Taylor approximation'
    ],
    language: 'python'
  },
  {
    id: 'math301-t3-ex08',
    subjectId: 'math301',
    topicId: 'math301-topic-3',
    title: 'Gradient of Three Variables',
    difficulty: 2,
    description: 'Compute the gradient vector ∇f of f(x,y,z) = x² + y² + z² at a given point. Return as tuple (gx, gy, gz).',
    starterCode: `def gradient_3d(x, y, z):
    """
    Compute ∇f where f(x,y,z) = x² + y² + z²

    Args:
        x, y, z: point at which to evaluate the gradient

    Returns:
        Tuple (gx, gy, gz) representing the gradient vector
    """
    pass`,
    solution: `def gradient_3d(x, y, z):
    """
    Compute ∇f where f(x,y,z) = x² + y² + z²

    Args:
        x, y, z: point at which to evaluate the gradient

    Returns:
        Tuple (gx, gy, gz) representing the gradient vector
    """
    gx = 2*x
    gy = 2*y
    gz = 2*z
    return (gx, gy, gz)`,
    testCases: [
      { input: '1, 0, 0', expectedOutput: '(2, 0, 0)', isHidden: false, description: 'On x-axis' },
      { input: '1, 1, 1', expectedOutput: '(2, 2, 2)', isHidden: false, description: 'Point (1,1,1)' },
      { input: '0, 0, 0', expectedOutput: '(0, 0, 0)', isHidden: false, description: 'Origin' },
      { input: '3, 4, 0', expectedOutput: '(6, 8, 0)', isHidden: true, description: 'In xy-plane' },
      { input: '1, 2, 3', expectedOutput: '(2, 4, 6)', isHidden: true, description: 'General point' }
    ],
    hints: [
      'Extend the 2D gradient to 3D',
      '∇f = [∂f/∂x, ∂f/∂y, ∂f/∂z]',
      'For f = x² + y² + z²: each partial is 2 times that variable'
    ],
    language: 'python'
  },
  {
    id: 'math301-t3-ex09',
    subjectId: 'math301',
    topicId: 'math301-topic-3',
    title: 'Gradient Perpendicular to Level Curve',
    difficulty: 4,
    description: 'For f(x,y) = x² + y², verify that the gradient at a point is perpendicular to the level curve through that point. Given a point (x,y) and a tangent vector (tx,ty) to the level curve, compute ∇f · (tx,ty). It should be zero.',
    starterCode: `def gradient_level_curve_dot(x, y, tx, ty):
    """
    Compute ∇f · tangent_vector where f(x,y) = x² + y²

    Args:
        x, y: point on level curve
        tx, ty: tangent vector to level curve

    Returns:
        The dot product (should be 0 for valid tangent)
    """
    pass`,
    solution: `def gradient_level_curve_dot(x, y, tx, ty):
    """
    Compute ∇f · tangent_vector where f(x,y) = x² + y²

    Args:
        x, y: point on level curve
        tx, ty: tangent vector to level curve

    Returns:
        The dot product (should be 0 for valid tangent)
    """
    # Gradient at (x, y)
    gx = 2*x
    gy = 2*y
    # Dot product with tangent vector
    return gx * tx + gy * ty`,
    testCases: [
      { input: '1, 0, 0, 1', expectedOutput: '0.0', isHidden: false, description: 'Perpendicular vectors' },
      { input: '0, 1, 1, 0', expectedOutput: '0.0', isHidden: false, description: 'Also perpendicular' },
      { input: '1, 1, -1, 1', expectedOutput: '0.0', isHidden: false, description: 'Valid tangent at (1,1)' },
      { input: '3, 4, -4, 3', expectedOutput: '0.0', isHidden: true, description: 'Valid tangent at (3,4)' },
      { input: '2, 0, 0, 5', expectedOutput: '0.0', isHidden: true, description: 'Tangent along y-direction' }
    ],
    hints: [
      'The gradient is perpendicular to level curves',
      'If the tangent is valid, ∇f · tangent = 0',
      'For a circle, the tangent at (x,y) is perpendicular to the radius'
    ],
    language: 'python'
  },
  {
    id: 'math301-t3-ex10',
    subjectId: 'math301',
    topicId: 'math301-topic-3',
    title: 'Normal Vector to Surface',
    difficulty: 3,
    description: 'Find the normal vector to the surface z = x² + y² at point (x0, y0). Represent the surface as F(x,y,z) = x² + y² - z = 0. The normal is ∇F. Return as tuple (nx, ny, nz).',
    starterCode: `def normal_to_surface(x0, y0):
    """
    Find the normal vector to z = x² + y² at (x0, y0)

    Args:
        x0, y0: point on the surface

    Returns:
        Tuple (nx, ny, nz) representing the normal vector
    """
    pass`,
    solution: `def normal_to_surface(x0, y0):
    """
    Find the normal vector to z = x² + y² at (x0, y0)

    Args:
        x0, y0: point on the surface

    Returns:
        Tuple (nx, ny, nz) representing the normal vector
    """
    # F(x,y,z) = x² + y² - z
    # ∇F = [∂F/∂x, ∂F/∂y, ∂F/∂z]
    nx = 2*x0
    ny = 2*y0
    nz = -1
    return (nx, ny, nz)`,
    testCases: [
      { input: '0, 0', expectedOutput: '(0, 0, -1)', isHidden: false, description: 'At origin' },
      { input: '1, 0', expectedOutput: '(2, 0, -1)', isHidden: false, description: 'At (1,0)' },
      { input: '0, 1', expectedOutput: '(0, 2, -1)', isHidden: false, description: 'At (0,1)' },
      { input: '1, 1', expectedOutput: '(2, 2, -1)', isHidden: true, description: 'At (1,1)' },
      { input: '3, 4', expectedOutput: '(6, 8, -1)', isHidden: true, description: 'At (3,4)' }
    ],
    hints: [
      'Rewrite the surface as F(x,y,z) = x² + y² - z = 0',
      'The normal vector is ∇F',
      '∇F = [2x, 2y, -1]'
    ],
    language: 'python'
  },
  {
    id: 'math301-t3-ex11',
    subjectId: 'math301',
    topicId: 'math301-topic-3',
    title: 'Directional Derivative in 3D',
    difficulty: 3,
    description: 'Compute the directional derivative of f(x,y,z) = x² + y² + z² at point (x,y,z) in the direction of unit vector (ux, uy, uz).',
    starterCode: `def directional_derivative_3d(x, y, z, ux, uy, uz):
    """
    Compute D_u f where f(x,y,z) = x² + y² + z²

    Args:
        x, y, z: point at which to evaluate
        ux, uy, uz: unit direction vector

    Returns:
        The directional derivative
    """
    pass`,
    solution: `def directional_derivative_3d(x, y, z, ux, uy, uz):
    """
    Compute D_u f where f(x,y,z) = x² + y² + z²

    Args:
        x, y, z: point at which to evaluate
        ux, uy, uz: unit direction vector

    Returns:
        The directional derivative
    """
    # Gradient at (x, y, z)
    gx = 2*x
    gy = 2*y
    gz = 2*z
    # Directional derivative = gradient · direction
    return gx * ux + gy * uy + gz * uz`,
    testCases: [
      { input: '1, 0, 0, 1, 0, 0', expectedOutput: '2.0', isHidden: false, description: 'Along x-axis' },
      { input: '1, 1, 1, 0.577, 0.577, 0.577', expectedOutput: '3.464', isHidden: false, description: 'Diagonal direction' },
      { input: '2, 3, 0, 1, 0, 0', expectedOutput: '4.0', isHidden: false, description: 'At (2,3,0), x-direction' },
      { input: '1, 2, 3, 0, 1, 0', expectedOutput: '4.0', isHidden: true, description: 'Along y-axis' },
      { input: '3, 4, 5, 0, 0, 1', expectedOutput: '10.0', isHidden: true, description: 'Along z-axis' }
    ],
    hints: [
      'Use the same formula as 2D: D_u f = ∇f · u',
      'Compute the gradient in 3D first',
      'Then take dot product with direction vector'
    ],
    language: 'python'
  },
  {
    id: 'math301-t3-ex12',
    subjectId: 'math301',
    topicId: 'math301-topic-3',
    title: 'Gradient of Product',
    difficulty: 3,
    description: 'Compute the gradient of f(x,y) = xy² at a given point. Return as tuple (gx, gy).',
    starterCode: `def gradient_product(x, y):
    """
    Compute ∇f where f(x,y) = xy²

    Args:
        x, y: point at which to evaluate the gradient

    Returns:
        Tuple (gx, gy) representing the gradient vector
    """
    pass`,
    solution: `def gradient_product(x, y):
    """
    Compute ∇f where f(x,y) = xy²

    Args:
        x, y: point at which to evaluate the gradient

    Returns:
        Tuple (gx, gy) representing the gradient vector
    """
    gx = y**2
    gy = 2*x*y
    return (gx, gy)`,
    testCases: [
      { input: '1, 1', expectedOutput: '(1, 2)', isHidden: false, description: 'Point (1,1)' },
      { input: '2, 3', expectedOutput: '(9, 12)', isHidden: false, description: 'Point (2,3)' },
      { input: '0, 1', expectedOutput: '(1, 0)', isHidden: false, description: 'Point (0,1)' },
      { input: '1, 0', expectedOutput: '(0, 0)', isHidden: true, description: 'Point (1,0)' },
      { input: '3, 2', expectedOutput: '(4, 12)', isHidden: true, description: 'Point (3,2)' }
    ],
    hints: [
      'Compute each partial derivative separately',
      '∂f/∂x: treat y as constant',
      '∂f/∂y: treat x as constant and use power rule'
    ],
    language: 'python'
  },
  {
    id: 'math301-t3-ex13',
    subjectId: 'math301',
    topicId: 'math301-topic-3',
    title: 'Gradient of Exponential',
    difficulty: 3,
    description: 'Compute the gradient of f(x,y) = e^(x+y) at a given point. Return as tuple (gx, gy).',
    starterCode: `import math

def gradient_exponential(x, y):
    """
    Compute ∇f where f(x,y) = e^(x+y)

    Args:
        x, y: point at which to evaluate the gradient

    Returns:
        Tuple (gx, gy) representing the gradient vector
    """
    pass`,
    solution: `import math

def gradient_exponential(x, y):
    """
    Compute ∇f where f(x,y) = e^(x+y)

    Args:
        x, y: point at which to evaluate the gradient

    Returns:
        Tuple (gx, gy) representing the gradient vector
    """
    exp_val = math.exp(x + y)
    gx = exp_val
    gy = exp_val
    return (gx, gy)`,
    testCases: [
      { input: '0, 0', expectedOutput: '(1.0, 1.0)', isHidden: false, description: 'At origin' },
      { input: '1, 0', expectedOutput: '(2.718, 2.718)', isHidden: false, description: 'Point (1,0)' },
      { input: '0, 1', expectedOutput: '(2.718, 2.718)', isHidden: false, description: 'Point (0,1)' },
      { input: '1, 1', expectedOutput: '(7.389, 7.389)', isHidden: true, description: 'Point (1,1)' },
      { input: '2, 0', expectedOutput: '(7.389, 7.389)', isHidden: true, description: 'Point (2,0)' }
    ],
    hints: [
      'The derivative of e^u with respect to any variable is e^u times the derivative of u',
      'Since f = e^(x+y), both partials equal e^(x+y)',
      '∇f = [e^(x+y), e^(x+y)]'
    ],
    language: 'python'
  },
  {
    id: 'math301-t3-ex14',
    subjectId: 'math301',
    topicId: 'math301-topic-3',
    title: 'Tangent Plane at Point',
    difficulty: 4,
    description: 'For surface z = xy, evaluate the tangent plane equation at (x0,y0) and compute z at a nearby point (x,y). The tangent plane is z = z0 + fx(x0,y0)(x-x0) + fy(x0,y0)(y-y0).',
    starterCode: `def tangent_plane_value(x0, y0, x, y):
    """
    Evaluate the tangent plane to z = xy at (x0,y0), then compute z at (x,y)

    Args:
        x0, y0: point of tangency
        x, y: point at which to evaluate the plane

    Returns:
        The z-value on the tangent plane at (x,y)
    """
    pass`,
    solution: `def tangent_plane_value(x0, y0, x, y):
    """
    Evaluate the tangent plane to z = xy at (x0,y0), then compute z at (x,y)

    Args:
        x0, y0: point of tangency
        x, y: point at which to evaluate the plane

    Returns:
        The z-value on the tangent plane at (x,y)
    """
    z0 = x0 * y0
    fx = y0
    fy = x0
    return z0 + fx * (x - x0) + fy * (y - y0)`,
    testCases: [
      { input: '1, 1, 1.1, 1.1', expectedOutput: '1.2', isHidden: false, description: 'Near (1,1)' },
      { input: '2, 3, 2, 3', expectedOutput: '6.0', isHidden: false, description: 'At point of tangency' },
      { input: '1, 2, 1, 2.5', expectedOutput: '2.5', isHidden: false, description: 'Move in y-direction' },
      { input: '3, 2, 3.5, 2', expectedOutput: '7.0', isHidden: true, description: 'Move in x-direction' },
      { input: '0, 0, 1, 1', expectedOutput: '0.0', isHidden: true, description: 'Tangent at origin' }
    ],
    hints: [
      'For z = xy: ∂z/∂x = y and ∂z/∂y = x',
      'Tangent plane: z = z0 + fx(x-x0) + fy(y-y0)',
      'Evaluate at the new point (x,y)'
    ],
    language: 'python'
  },
  {
    id: 'math301-t3-ex15',
    subjectId: 'math301',
    topicId: 'math301-topic-3',
    title: 'Angle Between Gradient Vectors',
    difficulty: 4,
    description: 'For f(x,y) = x² and g(x,y) = y², compute the angle (in degrees) between ∇f and ∇g at a given point (x,y).',
    starterCode: `import math

def angle_between_gradients(x, y):
    """
    Compute the angle between ∇f and ∇g where f = x², g = y²

    Args:
        x, y: point at which to evaluate

    Returns:
        The angle in degrees between the gradient vectors
    """
    pass`,
    solution: `import math

def angle_between_gradients(x, y):
    """
    Compute the angle between ∇f and ∇g where f = x², g = y²

    Args:
        x, y: point at which to evaluate

    Returns:
        The angle in degrees between the gradient vectors
    """
    # Gradient of f = x²
    grad_f_x = 2*x
    grad_f_y = 0
    # Gradient of g = y²
    grad_g_x = 0
    grad_g_y = 2*y
    # Dot product
    dot = grad_f_x * grad_g_x + grad_f_y * grad_g_y
    # Magnitudes
    mag_f = math.sqrt(grad_f_x**2 + grad_f_y**2)
    mag_g = math.sqrt(grad_g_x**2 + grad_g_y**2)
    # Avoid division by zero
    if mag_f == 0 or mag_g == 0:
        return 0.0
    # Angle
    cos_theta = dot / (mag_f * mag_g)
    theta_rad = math.acos(cos_theta)
    return math.degrees(theta_rad)`,
    testCases: [
      { input: '1, 1', expectedOutput: '90.0', isHidden: false, description: 'Perpendicular gradients' },
      { input: '2, 2', expectedOutput: '90.0', isHidden: false, description: 'Still perpendicular' },
      { input: '1, 0', expectedOutput: '0.0', isHidden: false, description: 'Zero gradient for g' },
      { input: '3, 5', expectedOutput: '90.0', isHidden: true, description: 'Any non-zero point' },
      { input: '0, 1', expectedOutput: '0.0', isHidden: true, description: 'Zero gradient for f' }
    ],
    hints: [
      '∇f = [2x, 0] and ∇g = [0, 2y]',
      'These are always perpendicular (when both non-zero)',
      'Use the angle formula: cos(θ) = (u·v)/(|u||v|)'
    ],
    language: 'python'
  },
  {
    id: 'math301-t3-ex16',
    subjectId: 'math301',
    topicId: 'math301-topic-3',
    title: 'Level Curve Value',
    difficulty: 2,
    description: 'For f(x,y) = x² + y², find the value c of the level curve that passes through point (x0, y0). The level curve is defined by f(x,y) = c.',
    starterCode: `def level_curve_value(x0, y0):
    """
    Find the value c of the level curve f(x,y) = c passing through (x0, y0)
    where f(x,y) = x² + y²

    Args:
        x0, y0: point on the level curve

    Returns:
        The value c of the level curve
    """
    pass`,
    solution: `def level_curve_value(x0, y0):
    """
    Find the value c of the level curve f(x,y) = c passing through (x0, y0)
    where f(x,y) = x² + y²

    Args:
        x0, y0: point on the level curve

    Returns:
        The value c of the level curve
    """
    return x0**2 + y0**2`,
    testCases: [
      { input: '1, 0', expectedOutput: '1.0', isHidden: false, description: 'Point (1,0)' },
      { input: '0, 1', expectedOutput: '1.0', isHidden: false, description: 'Point (0,1)' },
      { input: '3, 4', expectedOutput: '25.0', isHidden: false, description: 'Point (3,4)' },
      { input: '1, 1', expectedOutput: '2.0', isHidden: true, description: 'Point (1,1)' },
      { input: '5, 12', expectedOutput: '169.0', isHidden: true, description: 'Point (5,12)' }
    ],
    hints: [
      'A level curve is defined by f(x,y) = c for some constant c',
      'To find c, simply evaluate f at the given point',
      'c = f(x0, y0) = x0² + y0²'
    ],
    language: 'python'
  }
];
